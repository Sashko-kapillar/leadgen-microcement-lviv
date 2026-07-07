type CouponRequestPayload = {
  name?: string
  contact?: string
  coupon?: {
    title?: string
    text?: string
    discount?: string
    target?: string
  }
}

type ApiRequest = {
  method?: string
  body?: CouponRequestPayload
  headers?: Record<string, string | string[] | undefined>
}

type ApiResponse = {
  status: (code: number) => {
    json: (body: unknown) => void
  }
}

const TELEGRAM_REQUEST_TIMEOUT_MS = 10000

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function getSafeText(value: unknown, fallback: string, maxLength = 80) {
  if (typeof value !== 'string') return fallback

  const trimmedValue = value.trim()

  if (!trimmedValue) return fallback

  return trimmedValue.slice(0, maxLength)
}

function generateCouponNumber() {
  const number = crypto.getRandomValues(new Uint32Array(1))[0] % 10000

  return `MC-${String(number).padStart(4, '0')}`
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}

function getClientIp(req: ApiRequest) {
  const forwardedFor = req.headers?.['x-forwarded-for']
  const realIp = req.headers?.['x-real-ip']

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(',')[0]?.trim() || 'unknown'
  }

  if (typeof realIp === 'string') {
    return realIp
  }

  if (Array.isArray(realIp)) {
    return realIp[0] || 'unknown'
  }

  return 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = rateLimitStore.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })

    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1

  return false
}

async function fetchWithTimeout(url: string, options: RequestInit) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

async function sendTelegramMessage(botToken: string, chatId: string, message: string) {
  return fetchWithTimeout(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: 'HTML',
      text: message,
    }),
  })
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  const clientIp = getClientIp(req)

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return res.status(500).json({
      success: false,
      message: 'Telegram environment variables are missing',
    })
  }

  const { name, contact, coupon } = req.body ?? {}

  const safeName = getSafeText(name, '', 40)
  const safeContact = getSafeText(contact, '', 60)

  if (!safeName || !safeContact) {
    return res.status(400).json({
      success: false,
      message: 'Required fields are missing',
    })
  }

  const couponNumber = generateCouponNumber()
  const couponDiscount = getSafeText(coupon?.discount, '-10%', 20)
  const couponTarget = getSafeText(coupon?.target, 'матеріал', 40)

  const submittedAt = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())

  const message = [
    '<b>Нова заявка з сайту</b>',
    '',
    `<b>Ім'я:</b> ${escapeHtml(safeName)}`,
    `<b>Телефон:</b> ${escapeHtml(safeContact)}`,
    '',
    `<b>Купон:</b> ${escapeHtml(couponNumber)}`,
    `<b>Знижка:</b> ${escapeHtml(couponDiscount)} на ${escapeHtml(couponTarget)}`,
    `<b>Дата заявки:</b> ${escapeHtml(submittedAt)}`,
  ].join('\n')

  try {
    const telegramResponse = await sendTelegramMessage(botToken, chatId, message)

    if (!telegramResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Telegram message request failed',
      })
    }

    return res.status(200).json({
      success: true,
      couponNumber,
    })
  } catch (error) {
    return res.status(isAbortError(error) ? 504 : 500).json({
      success: false,
      message: isAbortError(error) ? 'Telegram request timed out' : 'Telegram request failed',
    })
  }
}

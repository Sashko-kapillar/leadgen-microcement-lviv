import path from 'node:path'
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'

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

const COUPON_WIDTH = 1200
const COUPON_HEIGHT = 720

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeSvg(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
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

function createCouponTextOverlaySvg(couponNumber: string, discount: string) {
  const safeCouponNumber = escapeSvg(couponNumber)
  const safeDiscount = escapeSvg(discount)

  return `
    <svg width="${COUPON_WIDTH}" height="${COUPON_HEIGHT}" viewBox="0 0 ${COUPON_WIDTH} ${COUPON_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="600"
        y="235"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="50"
        font-weight="700"
        letter-spacing="7"
        fill="#b96843"
      >
        КУПОН НА МАТЕРІАЛ
      </text>

      <line x1="340" y1="280" x2="860" y2="280" stroke="#b96843" stroke-opacity="0.35" stroke-width="2"/>

      <text
        x="600"
        y="425"
        text-anchor="middle"
        font-family="Georgia, serif"
        font-size="150"
        font-weight="700"
        fill="#b96843"
      >
        ${safeDiscount}
      </text>

      <line x1="340" y1="480" x2="860" y2="480" stroke="#b96843" stroke-opacity="0.35" stroke-width="2"/>

      <text
        x="600"
        y="565"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="54"
        font-weight="700"
        letter-spacing="3"
        fill="#161616"
      >
        № ${safeCouponNumber}
      </text>
    </svg>
  `
}

async function createCouponPng(couponNumber: string, discount: string) {
  const templatePath = path.join(process.cwd(), 'public', 'images', 'popup-coupon.webp')
  const templateBuffer = await readFile(templatePath)
  const overlaySvg = createCouponTextOverlaySvg(couponNumber, discount)

  return sharp(templateBuffer)
    .resize(COUPON_WIDTH, COUPON_HEIGHT, {
      fit: 'contain',
      background: '#ffffff',
    })
    .composite([
      {
        input: Buffer.from(overlaySvg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer()
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

async function sendTelegramCouponDocument(
  botToken: string,
  chatId: string,
  couponNumber: string,
  imageBuffer: Buffer
) {
  const telegramFormData = new FormData()

  telegramFormData.append('chat_id', chatId)
  telegramFormData.append(
    'document',
    new Blob([new Uint8Array(imageBuffer)], { type: 'image/png' }),
    `coupon-${couponNumber}.png`
  )

  return fetchWithTimeout(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: telegramFormData,
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
    const couponImageBuffer = await createCouponPng(couponNumber, couponDiscount)

    const telegramMessageResponse = await sendTelegramMessage(botToken, chatId, message)

    if (!telegramMessageResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Telegram message request failed',
      })
    }

    const telegramCouponResponse = await sendTelegramCouponDocument(
      botToken,
      chatId,
      couponNumber,
      couponImageBuffer
    )

    if (!telegramCouponResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Telegram coupon document request failed',
      })
    }

    return res.status(200).json({
      success: true,
      couponNumber,
      couponImageDataUrl: `data:image/png;base64,${couponImageBuffer.toString('base64')}`,
    })
  } catch (error) {
    return res.status(isAbortError(error) ? 504 : 500).json({
      success: false,
      message: isAbortError(error) ? 'Telegram request timed out' : 'Coupon request failed',
    })
  }
}

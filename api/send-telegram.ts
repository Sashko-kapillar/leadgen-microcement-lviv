import { randomInt } from 'node:crypto'

const REQUEST_TYPES = {
  material: 'Хочу купити матеріал',
  master: 'Шукаю майстра',
  self: 'Хочу нанести самостійно',
} as const

const CITIES = {
  lviv: 'Львів',
  kyiv: 'Київ',
} as const

type RequestType = keyof typeof REQUEST_TYPES
type City = keyof typeof CITIES

type TelegramPayload = {
  name?: unknown
  contact?: unknown
  requestType?: unknown
  requestNumber?: unknown
  city?: unknown
}

type ApiRequest = {
  method?: string
  body?: TelegramPayload
}

type ApiResponse = {
  status: (code: number) => {
    json: (body: unknown) => void
  }
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function generateRequestNumber() {
  return `MC-${String(randomInt(0, 10000)).padStart(4, '0')}`
}

function isRequestType(value: unknown): value is RequestType {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(REQUEST_TYPES, value)
}

function isCity(value: unknown): value is City {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(CITIES, value)
}

function normalizeRequiredString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeRequestNumber(value: unknown) {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmedValue = value.trim()

  return /^MC-\d{4}$/.test(trimmedValue) ? trimmedValue : ''
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram configuration is missing')

    return res.status(500).json({
      success: false,
      message: 'Telegram config is missing',
    })
  }

  // Normalize incoming data
  const name = normalizeRequiredString(req.body?.name)
  const contact = normalizeRequiredString(req.body?.contact)
  const requestType = req.body?.requestType
  const city = req.body?.city

  // Required contact fields
  if (!name || !contact) {
    return res.status(400).json({
      success: false,
      message: 'Name and contact are required',
    })
  }

  // Request type validation
  if (!isRequestType(requestType)) {
    return res.status(400).json({
      success: false,
      message: 'Request type is required',
    })
  }

  // City validation
  if (!isCity(city)) {
    return res.status(400).json({
      success: false,
      message: 'City is required or invalid',
    })
  }

  // Request identification
  const requestNumber = normalizeRequestNumber(req.body?.requestNumber) || generateRequestNumber()

  const requestTypeLabel = REQUEST_TYPES[requestType]
  const cityLabel = CITIES[city]

  // Telegram message
  const message = [
    '<b>Нова заявка:</b>',
    '',
    `<b>Місто:</b> ${escapeHtml(cityLabel)}`,
    `<b>Тип звернення:</b> ${escapeHtml(requestTypeLabel)}`,
    `<b>Номер звернення:</b> ${escapeHtml(requestNumber)}`,
    `<b>Імʼя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
  ].join('\n')

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.json().catch(() => null)

      console.error('Telegram request failed:', telegramError)

      return res.status(502).json({
        success: false,
        message: 'Telegram request failed',
      })
    }

    return res.status(200).json({
      success: true,
      requestNumber,
      requestType,
      requestTypeLabel,
      city,
      cityLabel,
    })
  } catch (error) {
    console.error('Failed to send Telegram message:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    })
  }
}

type TelegramPayload = {
  name?: string
  contact?: string
  couponNumber?: string
  coupon?: {
    title?: string
    text?: string
    discount?: string
    target?: string
  }
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
}

function generateCouponNumber() {
  return `MC-${Math.floor(1000 + Math.random() * 9000)}`
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
    return res.status(500).json({
      success: false,
      message: 'Telegram config is missing',
    })
  }

  const { name, contact, coupon } = req.body ?? {}

  const couponNumber = req.body?.couponNumber ?? generateCouponNumber()

  if (!name || !contact) {
    return res.status(400).json({
      success: false,
      message: 'Name and contact are required',
    })
  }

  const message = [
    '<b>Нова заявка на купон</b>',
    '',
    `<b>Імʼя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    '',
    `<b>Купон:</b> ${escapeHtml(coupon?.title ?? 'КУПОН НА МАТЕРІАЛ')}`,
    `<b>Знижка:</b> ${escapeHtml(coupon?.discount ?? '-10%')}`,
    `<b>Номер:</b> ${escapeHtml(couponNumber)}`,
    '',
    coupon?.text ? `<b>Текст:</b> ${escapeHtml(coupon.text)}` : '',
    coupon?.target ? `<b>Для:</b> ${escapeHtml(coupon.target)}` : '',
  ]
    .filter(Boolean)
    .join('\n')

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
      return res.status(502).json({
        success: false,
        message: 'Telegram request failed',
      })
    }

    return res.status(200).json({
      success: true,
      couponNumber,
    })
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    })
  }
}

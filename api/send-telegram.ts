type TelegramPayload = {
  roomType?: string
  roomTypeLabel?: string
  area?: string
  areaLabel?: string
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
      message: 'Telegram environment variables are missing',
    })
  }

  const { roomTypeLabel, areaLabel, name, contact, coupon } = req.body ?? {}

  if (!name || !contact || !roomTypeLabel || !areaLabel) {
    return res.status(400).json({
      success: false,
      message: 'Required fields are missing',
    })
  }

  const message = [
    '<b>Нова заявка на консультацію і купон</b>',
    '',
    `<b>Ім'я:</b> ${escapeHtml(name)}`,
    `<b>Телефон або Telegram:</b> ${escapeHtml(contact)}`,
    `<b>Тип приміщення:</b> ${escapeHtml(roomTypeLabel)}`,
    `<b>Орієнтовна площа:</b> ${escapeHtml(areaLabel)}`,
    '',
    `<b>Купон:</b> ${escapeHtml(coupon?.title ?? 'Персональний купон -10% на матеріал')}`,
    `<b>Примітка:</b> клієнт хоче отримати купон для салону-партнера.`,
  ].join('\n')

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
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

  if (!telegramResponse.ok) {
    return res.status(502).json({
      success: false,
      message: 'Telegram request failed',
    })
  }

  return res.status(200).json({
    success: true,
  })
}

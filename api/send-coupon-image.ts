type CouponImagePayload = {
  couponNumber?: string
  couponImageDataUrl?: string
}

type ApiRequest = {
  method?: string
  body?: CouponImagePayload
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

  const { couponNumber, couponImageDataUrl } = req.body ?? {}

  if (!couponNumber || !couponImageDataUrl) {
    return res.status(400).json({
      success: false,
      message: 'Coupon number or image is missing',
    })
  }

  if (!couponImageDataUrl.startsWith('data:image/png;base64,')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coupon image format',
    })
  }

  try {
    const base64Image = couponImageDataUrl.replace('data:image/png;base64,', '')
    const imageBuffer = Buffer.from(base64Image, 'base64')

    const caption = [
      '<b>PNG купон для менеджера</b>',
      '',
      `<b>Купон:</b> ${escapeHtml(couponNumber)}`,
      '<b>Знижка:</b> -10% на матеріал',
    ].join('\n')

    const telegramFormData = new FormData()

    telegramFormData.append('chat_id', chatId)
    telegramFormData.append('caption', caption)
    telegramFormData.append('parse_mode', 'HTML')
    telegramFormData.append(
      'document',
      new Blob([imageBuffer], { type: 'image/png' }),
      `coupon-${couponNumber}.png`
    )

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: telegramFormData,
    })

    if (!telegramResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Telegram coupon image request failed',
      })
    }

    return res.status(200).json({
      success: true,
    })
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Failed to send coupon image',
    })
  }
}

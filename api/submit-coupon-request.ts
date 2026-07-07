import sharp from 'sharp'

type CouponRequestPayload = {
  name?: string
  contact?: string
  wantsCoupon?: boolean
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
}

type ApiResponse = {
  status: (code: number) => {
    json: (body: unknown) => void
  }
}

const COUPON_WIDTH = 1200
const COUPON_HEIGHT = 720

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

function createCouponSvg(couponNumber: string, discount = '-10%') {
  const safeCouponNumber = escapeHtml(couponNumber)
  const safeDiscount = escapeHtml(discount)

  return `
    <svg width="${COUPON_WIDTH}" height="${COUPON_HEIGHT}" viewBox="0 0 ${COUPON_WIDTH} ${COUPON_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#161616" flood-opacity="0.12"/>
        </filter>

        <linearGradient id="couponBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff8f1"/>
          <stop offset="100%" stop-color="#fff1e6"/>
        </linearGradient>

        <clipPath id="ticketClip">
          <path d="
            M 130 90
            Q 130 60 160 60
            H 1040
            Q 1070 60 1070 90
            V 240
            Q 1012 248 1012 310
            Q 1012 372 1070 380
            V 630
            Q 1070 660 1040 660
            H 160
            Q 130 660 130 630
            V 380
            Q 188 372 188 310
            Q 188 248 130 240
            Z
          "/>
        </clipPath>
      </defs>

      <rect width="1200" height="720" fill="#ffffff"/>

      <g filter="url(#shadow)">
        <path
          d="
            M 130 90
            Q 130 60 160 60
            H 1040
            Q 1070 60 1070 90
            V 240
            Q 1012 248 1012 310
            Q 1012 372 1070 380
            V 630
            Q 1070 660 1040 660
            H 160
            Q 130 660 130 630
            V 380
            Q 188 372 188 310
            Q 188 248 130 240
            Z
          "
          fill="url(#couponBg)"
          stroke="#f0ad8b"
          stroke-width="2"
        />

        <path
          d="
            M 155 120
            Q 155 95 180 95
            H 1020
            Q 1045 95 1045 120
            V 228
            Q 970 250 970 310
            Q 970 370 1045 392
            V 600
            Q 1045 625 1020 625
            H 180
            Q 155 625 155 600
            V 392
            Q 230 370 230 310
            Q 230 250 155 228
            Z
          "
          fill="none"
          stroke="#e9a27f"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="1 18"
          clip-path="url(#ticketClip)"
        />

        <text
          x="600"
          y="230"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="54"
          font-weight="700"
          letter-spacing="7"
          fill="#b96843"
        >
          КУПОН НА МАТЕРІАЛ
        </text>

        <line x1="330" y1="275" x2="870" y2="275" stroke="#b96843" stroke-opacity="0.35" stroke-width="2"/>

        <text
          x="600"
          y="420"
          text-anchor="middle"
          font-family="Georgia, serif"
          font-size="150"
          font-weight="700"
          fill="#b96843"
        >
          ${safeDiscount}
        </text>

        <line x1="330" y1="475" x2="870" y2="475" stroke="#b96843" stroke-opacity="0.35" stroke-width="2"/>

        <text
          x="600"
          y="560"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="58"
          font-weight="700"
          letter-spacing="3"
          fill="#161616"
        >
          № ${safeCouponNumber}
        </text>
      </g>
    </svg>
  `
}

async function createCouponPng(couponNumber: string, discount = '-10%') {
  const svg = createCouponSvg(couponNumber, discount)

  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function sendTelegramMessage(botToken: string, chatId: string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    throw new Error('Telegram message request failed')
  }
}

async function sendTelegramCouponDocument(
  botToken: string,
  chatId: string,
  couponNumber: string,
  imageBuffer: Buffer
) {
  const formData = new FormData()

  formData.append('chat_id', chatId)
  formData.append(
    'document',
    new Blob([imageBuffer], { type: 'image/png' }),
    `coupon-${couponNumber}.png`
  )

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Telegram document request failed')
  }
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

  const { name, contact, coupon, wantsCoupon = true } = req.body ?? {}

  if (!name || !contact) {
    return res.status(400).json({
      success: false,
      message: 'Name and contact are required',
    })
  }

  try {
    const couponNumber = wantsCoupon ? generateCouponNumber() : ''
    const discount = coupon?.discount ?? '-10%'
    const target = coupon?.target ?? 'матеріал'

    const message = [
      '<b>Заявка на купон:</b>',
      `<b>Імʼя:</b> ${escapeHtml(name)}`,
      `<b>Контакт:</b> ${escapeHtml(contact)}`,
      wantsCoupon ? `<b>Знижка:</b> ${escapeHtml(discount)} на ${escapeHtml(target)}` : '',
      wantsCoupon ? `<b>Номер:</b> ${escapeHtml(couponNumber)}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    let couponImageDataUrl = ''

    if (wantsCoupon) {
      const couponImageBuffer = await createCouponPng(couponNumber, discount)

      await sendTelegramMessage(botToken, chatId, message)
      await sendTelegramCouponDocument(botToken, chatId, couponNumber, couponImageBuffer)

      couponImageDataUrl = `data:image/png;base64,${couponImageBuffer.toString('base64')}`
    } else {
      await sendTelegramMessage(botToken, chatId, message)
    }

    return res.status(200).json({
      success: true,
      couponNumber,
      couponImageDataUrl,
    })
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit coupon request',
    })
  }
}

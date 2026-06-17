import { useState, type RefObject } from 'react'

type UseCouponPngParams = {
  couponRef: RefObject<HTMLElement | null>
  couponNumber: string
}

export function useCouponPng({ couponRef, couponNumber }: UseCouponPngParams) {
  const [isGeneratingCoupon, setIsGeneratingCoupon] = useState(false)

  async function downloadCouponPng() {
    if (!couponRef.current || isGeneratingCoupon) return

    try {
      setIsGeneratingCoupon(true)

      const { toPng } = await import('html-to-image')

      const dataUrl = await toPng(couponRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `coupon-${couponNumber}.png`
      link.click()
    } finally {
      setIsGeneratingCoupon(false)
    }
  }

  return {
    isGeneratingCoupon,
    downloadCouponPng,
  }
}

// src/utils/generateCouponNumber.ts

export function generateCouponNumber() {
  const number = Math.floor(Math.random() * 10000)
  const paddedNumber = String(number).padStart(4, '0')

  return `MC-${paddedNumber}`
}

export function decodePhone(codes: readonly number[]): string {
  return String.fromCharCode(...codes)
}

export function formatPhone(phone: string): string {
  return phone.replace(
    /^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    '$1 ($2) $3-$4-$5',
  )
}
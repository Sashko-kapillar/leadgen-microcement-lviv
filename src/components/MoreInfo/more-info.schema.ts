import { z } from 'zod'

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]{2,40}$/
const phoneRegex = /^(\+?38)?0\d{9}$/
const telegramRegex = /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, '')

const isValidPhoneOrTelegram = (value: string) => {
  const trimmedValue = value.trim()
  const normalizedPhone = normalizePhone(trimmedValue)

  return phoneRegex.test(normalizedPhone) || telegramRegex.test(trimmedValue)
}

export const moreInfoSchema = z.object({
  roomType: z.string().min(1, 'Оберіть тип приміщення'),
  area: z.string().min(1, 'Оберіть орієнтовну площу'),

  name: z
    .string()
    .trim()
    .min(2, 'Введіть ім’я')
    .max(40, 'Ім’я занадто довге')
    .regex(nameRegex, 'Ім’я може містити лише літери, пробіл, дефіс або апостроф'),

  contact: z
    .string()
    .trim()
    .min(1, 'Введіть телефон або Telegram')
    .max(40, 'Контакт занадто довгий')
    .refine(isValidPhoneOrTelegram, {
      message: 'Введіть коректний номер телефону або Telegram username',
    }),
})

export type MoreInfoFormValues = z.infer<typeof moreInfoSchema>

export type MoreInfoFormErrors = Partial<Record<keyof MoreInfoFormValues, string>>

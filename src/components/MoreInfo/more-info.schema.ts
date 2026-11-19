import { z } from 'zod'

export const requestTypeValues = ['material', 'master', 'self'] as const
export const cityValues = ['lviv', 'kyiv'] as const

export type RequestType = (typeof requestTypeValues)[number]
export type City = (typeof cityValues)[number]

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]{2,40}$/
const phoneRegex = /^(\+?38)?0\d{9}$/
const telegramRegex = /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, '')

const isValidPhoneOrTelegram = (value: string) => {
  const trimmedValue = value.trim()
  const normalizedPhone = normalizePhone(trimmedValue)

  return phoneRegex.test(normalizedPhone) || telegramRegex.test(trimmedValue)
}

const isRequestType = (value: unknown): value is RequestType => {
  return typeof value === 'string' && requestTypeValues.includes(value as RequestType)
}

const isCity = (value: unknown): value is City => {
  return typeof value === 'string' && cityValues.includes(value as City)
}

export const moreInfoSchema = z.object({
  requestType: z.custom<RequestType>(isRequestType, {
    message: 'Оберіть, що вас цікавить',
  }),

  city: z.custom<City>(isCity, {
    message: 'Оберіть місто',
  }),

  name: z
    .string()
    .trim()
    .min(2, 'Введіть ім’я')
    .max(40, 'Ім’я занадто довге')
    .regex(nameRegex, 'Ім’я може містити лише літери, пробіл, дефіс або апостроф'),

  contact: z
    .string()
    .trim()
    .min(1, 'Введіть номер телефону')
    .max(40, 'Контакт занадто довгий')
    .refine(isValidPhoneOrTelegram, {
      message: 'Введіть коректний номер телефону',
    }),
})

export type MoreInfoSubmitValues = z.infer<typeof moreInfoSchema>

export type MoreInfoFormValues = {
  requestType: RequestType | ''
  city: City | ''
  name: string
  contact: string
}

export type MoreInfoFormErrors = Partial<Record<keyof MoreInfoFormValues, string>>

import { z } from 'zod'

export const moreInfoSchema = z.object({
  roomType: z.string().min(1, 'Оберіть тип приміщення'),
  area: z.string().min(1, 'Оберіть орієнтовну площу'),
  name: z.string().trim().min(2, 'Введіть ім’я').max(40, 'Ім’я занадто довге'),
  contact: z
    .string()
    .trim()
    .min(5, 'Введіть телефон або Telegram')
    .max(40, 'Контакт занадто довгий'),
})

export type MoreInfoFormValues = z.infer<typeof moreInfoSchema>

export type MoreInfoFormErrors = Partial<Record<keyof MoreInfoFormValues, string>>

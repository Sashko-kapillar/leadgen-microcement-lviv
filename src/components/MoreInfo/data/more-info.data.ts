import type { RequestType } from '../more-info.schema'

export type RequestTypeOption = {
  value: RequestType
  label: string
  description: string
}

export const requestTypeOptions: RequestTypeOption[] = [
  {
    value: 'material',
    label: 'Хочу купити матеріал',
    description: 'Допоможемо підібрати матеріал і розрахувати необхідну кількість.',
  },
  {
    value: 'master',
    label: 'Шукаю майстра',
    description: 'Допоможемо знайти майстра для нанесення мікроцементу.',
  },
  {
    value: 'self',
    label: 'Хочу нанести самостійно',
    description: 'Підкажемо, які матеріали та інструкції потрібні для роботи.',
  },
]

export const moreInfoBenefits = [
  {
    icon: '#icon-chat',
    title: 'Безкоштовна консультація',
    text: 'Професійна порада без зобов’язань.',
  },
  {
    icon: '#icon-quality',
    title: 'Гарантія якості матеріалу',
    text: 'Працюємо лише з перевіреними та сертифікованими матеріалами.',
  },
  {
    icon: '#icon-roller',
    title: 'Допомога з вибором рішення',
    text: 'Підберемо матеріал, майстра або пояснимо процес самостійного нанесення.',
  },
] as const

export const moreInfoTrustLine = 'Відповімо протягом години у робочий час Пн–Пт 10:00–18:00'

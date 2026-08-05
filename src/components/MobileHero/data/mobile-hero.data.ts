import heroImage from '@/assets/images/hero/hero-mb.webp'

export type MobileHeroActionId = 'master' | 'self'

export type MobileHeroAction = {
  id: MobileHeroActionId
  label: string
}

export const mobileHeroData = {
  image: heroImage,

  title: 'Матеріал, майстри та підтримка',

  location: 'Львів та область',

  service: 'Підбір під ваше завдання',

  primaryAction: {
    label: 'Залишити заявку',
  },

  secondaryActions: [
    {
      id: 'master',
      label: 'Знайти майстра',
    },
    {
      id: 'self',
      label: 'Нанести самостійно',
    },
  ],
} as const satisfies {
  image: string
  title: string
  location: string
  service: string
  primaryAction: {
    label: string
  }
  secondaryActions: readonly MobileHeroAction[]
}

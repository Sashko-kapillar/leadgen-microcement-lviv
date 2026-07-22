import heroImage from '@/assets/images/hero/hero-mb.webp'

export type MobileHeroActionId = 'buy' | 'master' | 'self'

export type MobileHeroAction = {
  id: MobileHeroActionId
  label: string
  icon: 'material' | 'master' | 'self'
}

export const mobileHeroData = {
  image: heroImage,

  title: 'Матеріал, майстри та підтримка для нанесення у Львові',

  location: 'Львів та область',

  service: 'Підбір під ваше завдання',

  primaryAction: {
    label: 'Залишити заявку',
  },

  actionsTitle: 'Оберіть свій шлях',

  actions: [
    {
      id: 'buy',
      label: 'Купити матеріал',
      icon: 'material',
    },
    {
      id: 'master',
      label: 'Знайти майстра',
      icon: 'master',
    },
    {
      id: 'self',
      label: 'Нанести самостійно',
      icon: 'self',
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
  actionsTitle: string
  actions: readonly MobileHeroAction[]
}

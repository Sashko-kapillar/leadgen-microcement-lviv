export type MobileNavigationItem = {
  id: string
  number: string
  label: string
  targetId: string
}

export type MobileRequestType = 'buy' | 'master' | 'self'

export type MobileRequestItem = {
  id: MobileRequestType
  label: string
}

export const mobileHeaderData = {
  brand: 'Мікроцемент Львів',

  navigation: [
    {
      id: 'examples',
      number: '01',
      label: 'Приклади робіт',
      targetId: 'applications',
    },
    {
      id: 'how-it-works',
      number: '02',
      label: 'Як це працює',
      targetId: 'how-it-works',
    },
    {
      id: 'request',
      number: '03',
      label: 'Залишити заявку',
      targetId: 'more-info',
    },
  ],

  pathsTitle: 'Оберіть свій шлях',

  paths: [
    {
      id: 'buy',
      label: 'Купити матеріал',
    },
    {
      id: 'master',
      label: 'Знайти майстра',
    },
    {
      id: 'self',
      label: 'Нанести самостійно',
    },
  ],

  location: 'Львів та область',

  aria: {
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    menuTitle: 'Мобільна навігація',
  },
} as const satisfies {
  brand: string
  navigation: readonly MobileNavigationItem[]
  pathsTitle: string
  paths: readonly MobileRequestItem[]
  location: string
  aria: {
    openMenu: string
    closeMenu: string
    menuTitle: string
  }
}

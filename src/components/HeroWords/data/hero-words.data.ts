type HeroLetter = {
  id: string
  icon: string
  viewBox: string
  width: number
  scale?: number
}

export type HeroActionVariant = 'hero-material' | 'hero-master' | 'hero-self'

type HeroAction = {
  id: string
  href: string
  icon: string
  title: string
  text: string
  variant: HeroActionVariant
}

export const heroLetters: readonly HeroLetter[] = [
  {
    id: 'm-1',
    icon: '#icon-m',
    viewBox: '0 0 26 32',
    width: 26,
  },
  {
    id: 'i',
    icon: '#icon-i',
    viewBox: '0 0 6.4 32',
    width: 6.4,
  },
  {
    id: 'k',
    icon: '#icon-k',
    viewBox: '0 0 19 32',
    width: 19,
  },
  {
    id: 'p',
    icon: '#icon-p',
    viewBox: '0 0 18 32',
    width: 18,
  },
  {
    id: 'o',
    icon: '#icon-o',
    viewBox: '0 0 19 32',
    width: 19,
  },
  {
    id: 'ts',
    icon: '#icon-ts',
    viewBox: '0 0 18 32',
    width: 18,
    scale: 1.12,
  },
  {
    id: 'e-1',
    icon: '#icon-e',
    viewBox: '0 0 17 32',
    width: 17,
  },
  {
    id: 'm-2',
    icon: '#icon-m',
    viewBox: '0 0 26 32',
    width: 26,
  },
  {
    id: 'e-2',
    icon: '#icon-e',
    viewBox: '0 0 17 32',
    width: 17,
  },
  {
    id: 'h',
    icon: '#icon-h',
    viewBox: '0 0 18 32',
    width: 18,
  },
  {
    id: 't',
    icon: '#icon-t',
    viewBox: '0 0 20 32',
    width: 20,
  },
]

export const heroActions: readonly HeroAction[] = [
  {
    id: 'materials',
    href: '#more-info',
    icon: '#selection',
    title: 'Купити матеріал',
    text: 'Якісні декоративні матеріали європейських виробників',
    variant: 'hero-material',
  },
  {
    id: 'master',
    href: '#more-info',
    icon: '#user',
    title: 'Знайти майстра',
    text: 'Підберемо перевіреного майстра під обраний декор',
    variant: 'hero-master',
  },
  {
    id: 'self-application',
    href: '#more-info',
    icon: '#installation',
    title: 'Нанести самостійно',
    text: 'Покрокова інструкція для самостійного виконання робіт',
    variant: 'hero-self',
  },
]

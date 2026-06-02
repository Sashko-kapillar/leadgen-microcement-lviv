import bathroomImage from '@/assets/images/applications/hero-bath.webp'
import floorImage from '@/assets/images/applications/hero-bath.webp'
import wallsImage from '@/assets/images/applications/hero-bath.webp'
import kitchenImage from '@/assets/images/applications/hero-bath.webp'

export type ApplicationItem = {
  id: string
  title: string
  text: string
  image: string
  imageAlt: string
  href: string
  linkLabel: string
}

export type ApplicationsSectionData = {
  title: string
  subtitle: string
  items: ApplicationItem[]
  cta: {
    title: string
    text: string
    buttonLabel: string
    href: string
  }
}

export const applicationsSectionData: ApplicationsSectionData = {
  title: 'Приклади застосування мікроцементу',
  subtitle: 'Рішення для різних типів приміщень — оберіть сценарій, який підходить саме вам.',

  items: [
    {
      id: 'bathroom',
      title: 'Ванні кімнати',
      text: 'Вологостійке покриття для стін, підлоги та душових зон. Стильно та практично.',
      image: bathroomImage,
      imageAlt: 'Ванна кімната з мікроцементом',
      href: '#contacts',
      linkLabel: 'Дивитися приклади',
    },
    {
      id: 'floor',
      title: 'Підлога',
      text: 'Безшовна підлога без плитки та швів. Міцна, тепла на дотик і зносостійка.',
      image: floorImage,
      imageAlt: 'Підлога з мікроцементу',
      href: '#contacts',
      linkLabel: 'Дивитися приклади',
    },
    {
      id: 'walls',
      title: 'Стіни',
      text: 'Декоративне покриття для стін у житлових та комерційних інтер’єрах.',
      image: wallsImage,
      imageAlt: 'Стіна з мікроцементом',
      href: '#contacts',
      linkLabel: 'Дивитися приклади',
    },
    {
      id: 'kitchen',
      title: 'Кухні та комерційні простори',
      text: 'Гігієнічне, зносостійке рішення для кухонь, кафе, магазинів та офісів.',
      image: kitchenImage,
      imageAlt: 'Кухня з мікроцементом',
      href: '#contacts',
      linkLabel: 'Дивитися приклади',
    },
  ],

  cta: {
    title: 'Не певні, який варіант підійде?',
    text: 'Надішліть фото приміщення — ми підкажемо оптимальне рішення та порахуємо вартість.',
    buttonLabel: 'Отримати розрахунок',
    href: '#contacts',
  },
}

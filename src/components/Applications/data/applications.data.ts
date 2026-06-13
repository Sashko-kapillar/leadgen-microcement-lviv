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
  buttonLabel: string
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
  subtitle:
    'Подивіться, як мікроцемент виглядає у ванних, на підлозі, стінах і в комерційних просторах.',

  items: [
    {
      id: 'bathroom',
      title: 'Ванні кімнати',
      text: 'Вологостійке покриття для стін, підлоги та душових зон. Стильно та практично.',
      image: bathroomImage,
      imageAlt: 'Ванна кімната з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'floor',
      title: 'Підлога',
      text: 'Безшовна підлога без плитки та швів. Міцна, тепла на дотик і зносостійка.',
      image: floorImage,
      imageAlt: 'Підлога з мікроцементу',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'walls',
      title: 'Стіни',
      text: 'Декоративне покриття для стін у житлових та комерційних інтер’єрах.',
      image: wallsImage,
      imageAlt: 'Стіна з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'kitchen',
      title: 'Комерція',
      text: 'Гігієнічне, зносостійке рішення для кухонь, кафе, магазинів та офісів.',
      image: kitchenImage,
      imageAlt: 'Рецепшн з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
  ],

  cta: {
    title: 'Хочете побачити фактури наживо?',
    text: 'Залиште заявку — отримайте знижку на матеріал та перегляньте зразки в салоні',
    buttonLabel: 'Отримати знижку',
    href: '#more-info',
  },
}

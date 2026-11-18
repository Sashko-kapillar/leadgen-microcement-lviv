import bathroomImage from '@/assets/images/applications/bathroom.webp'
import floorImage from '@/assets/images/applications/floor.webp'
import wallsImage from '@/assets/images/applications/Oxi-NY.webp'
import kitchenImage from '@/assets/images/applications/office.webp'

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
  subtitle: 'Подивіться, як мікроцемент виглядає у ванних, на підлозі та стінах.',

  items: [
    {
      id: 'bathroom',
      title: 'Мікроцемент у ванній кімнаті',
      text: 'Мікроцемент для стін, підлоги та душових зон. Безшовне вологостійке покриття для сучасної ванної кімнати. Стильно та практично.',
      image: bathroomImage,
      imageAlt: 'Ванна кімната з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'floor',
      title: 'Мікроцемент для підлоги',
      text: 'Безшовне декоративне покриття для підлоги без плитки та швів. Практичне рішення для житлових і комерційних приміщень. Міцна, тепла на дотик і зносостійка.',
      image: floorImage,
      imageAlt: 'Підлога з мікроцементу',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'walls',
      title: 'Мікроцемент для стін',
      text: 'Декоративне покриття для стін із безшовною фактурою. Підходить для сучасних житлових і комерційних інтер’єрів. Міцне, зносостійке та гігієнічне рішення для стін.',
      image: wallsImage,
      imageAlt: 'Стіна з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
    {
      id: 'kitchen',
      title: 'Мікроцемент для комерції',
      text: 'Декоративне покриття для кафе, магазинів, офісів і студій. Безшовні поверхні для сучасних комерційних інтер’єрів.',
      image: kitchenImage,
      imageAlt: 'Рецепшн з мікроцементом',
      buttonLabel: 'Збільшити фото',
    },
  ],

  cta: {
    title: 'Не знаєте, з чого почати?',
    text: 'Допоможемо обрати матеріал, знайти майстра або розібратися з нанесенням.',
    buttonLabel: 'Дізнатися більше',
    href: '#more-info',
  },
}

export type BenefitItem = {
  id: string
  icon: string
  title: string
  text: string
}

export type BenefitsSectionData = {
  title: string
  subtitle: string
  items: BenefitItem[]
  cta: {
    title: string
    text: string
    buttonLabel: string
    href: string
  }
}

export const benefitsSectionData: BenefitsSectionData = {
  title: 'Переваги мікроцементу',
  subtitle:
    'Практичне декоративне покриття для ванних кімнат, підлоги, стін та комерційних просторів.',

  items: [
    {
      id: 'water-resistant',
      icon: '#icon-shield',
      title: 'Вологостійкий',
      text: 'Підходить для ванних кімнат, душових зон та кухонь за умови правильної системи захисту.',
    },
    {
      id: 'seamless',
      icon: '#icon-layers',
      title: 'Без швів',
      text: 'Створює цілісну поверхню без плиткових швів, у яких накопичується бруд.',
    },
    {
      id: 'durable',
      icon: '#icon-check',
      title: 'Міцний і довговічний',
      text: 'Стійкий до щоденного використання, стирання та побутового навантаження.',
    },
    {
      id: 'design',
      icon: '#icon-palette',
      title: 'Будь-який колір і текстура',
      text: 'Можна підібрати відтінок, фактуру та фініш під конкретний інтер’єр.',
    },
    {
      id: 'easy-care',
      icon: '#icon-sparkle',
      title: 'Легкий догляд',
      text: 'Поверхню легко прибирати без складного обслуговування.',
    },
  ],

  cta: {
    title: 'Хочете зрозуміти, чи підійде мікроцемент для вашого приміщення?',
    text: 'Надішліть фото або короткий опис — підкажемо оптимальне рішення та зорієнтуємо по вартості.',
    buttonLabel: 'Надіслати фото для розрахунку',
    href: '#contacts',
  },
}

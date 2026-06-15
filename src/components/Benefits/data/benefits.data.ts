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
  subtitle: 'Практичне декоративне покриття для будь-яких типів приміщень.',

  items: [
    {
      id: 'water-resistant',
      icon: '#waterproof',
      title: 'Вологостійкий',
      text: 'Підходить для: ванна, душ та кухня за умови правильного захисного покриття.',
    },
    {
      id: 'seamless',
      icon: '#seamless',
      title: 'Без швів',
      text: 'Створює цілісну поверхню без плиткових швів, у яких накопичується бруд.',
    },
    {
      id: 'design',
      icon: '#color',
      title: 'Колір і текстура',
      text: 'Можна підібрати відтінок, фактуру та фініш під конкретний інтер’єр.',
    },
    {
      id: 'easy-care',
      icon: '#easy-care',
      title: 'Легкий догляд',
      text: 'Поверхню легко прибирати без складного обслуговування.',
    },
  ],

  cta: {
    title: 'Хочете зрозуміти, чи підійде мікроцемент для вашого приміщення?',
    text: 'Відвідайте наш салон — підкажемо оптимальне рішення та зорієнтуємо по вартості.',
    buttonLabel: 'Отримати персональну пропозицію',
    href: '#more-info',
  },
}

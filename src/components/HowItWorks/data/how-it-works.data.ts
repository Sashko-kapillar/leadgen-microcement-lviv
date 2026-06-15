export type HowStepItem = {
  id: number
  icon: string
  title: string
  text: string
}

export const howItWorksData = {
  title: 'Як це працює',
  subtitle: 'Від фото приміщення до вибору матеріалу та монтажу під ключ.',
  steps: [
    {
      id: 1,
      icon: '#request',
      title: 'Залишаєте заявку',
      text: 'Через форму, Telegram або телефоном.',
    },
    {
      id: 2,
      icon: '#details',
      title: 'Уточнюємо деталі',
      text: 'Площа, стан поверхні та ваші побажання.',
    },
    {
      id: 3,
      icon: '#selection',
      title: 'Відвідуєте салон',
      text: 'Підбираємо матеріал, фактуру, колір.',
    },
    {
      id: 4,
      icon: '#installation',
      title: 'Монтаж під ключ',
      text: 'Погоджуємо дату та приступаємо до робіт.',
    },
  ],
} satisfies {
  title: string
  subtitle: string
  steps: HowStepItem[]
}

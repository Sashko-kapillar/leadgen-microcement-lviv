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
      icon: '#icon-file',
      title: 'Залишаєте заявку',
      text: 'Через форму, Telegram або телефоном.',
    },
    {
      id: 2,
      icon: '#icon-message',
      title: 'Уточнюємо деталі',
      text: 'Площа, стан поверхні та ваші побажання.',
    },
    {
      id: 3,
      icon: '#icon-calculator',
      title: 'Відвідуєте салон',
      text: 'Підбираємо матеріал, фактуру, колір.',
    },
    {
      id: 4,
      icon: '#icon-tool',
      title: 'Монтаж під ключ',
      text: 'Погоджуємо дату та приступаємо до робіт.',
    },
  ],
} satisfies {
  title: string
  subtitle: string
  steps: HowStepItem[]
}

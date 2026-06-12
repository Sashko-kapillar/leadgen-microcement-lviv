export const roomTypes = [
  {
    id: 'bathroom',
    label: 'Ванна',
    icon: '#icon-bath',
  },
  {
    id: 'kitchen',
    label: 'Кухня',
    icon: '#icon-kitchen',
  },
  {
    id: 'floor',
    label: 'Підлога',
    icon: '#icon-floor',
  },
  {
    id: 'walls',
    label: 'Стіни',
    icon: '#icon-wall',
  },
  {
    id: 'commercial',
    label: 'Комерція',
    icon: '#icon-building',
  },
] as const

export const areaOptions = [
  {
    id: 'up-to-5',
    label: 'до 5 м²',
  },
  {
    id: '5-15',
    label: '5–15 м²',
  },
  {
    id: '15-30',
    label: '15–30 м²',
  },
  {
    id: '30-plus',
    label: '30+ м²',
  },
] as const

export const moreInfoBenefits = [
  {
    icon: '#icon-chat',
    title: 'Безкоштовна консультація',
    text: 'Професійна порада без зобов’язань.',
  },
  {
    icon: '#icon-quality',
    title: 'Гарантія якості матеріалу',
    text: 'Працюємо лише з перевіреними та сертифікованими матеріалами.',
  },
  {
    icon: '#icon-roller',
    title: 'Підбір матеріалу під ваш інтер’єр',
    text: 'Рекомендації по кольору, фактурі та типу мікроцементу.',
  },
] as const

export const couponInfo = {
  title: 'Персональний купон -10% на матеріал',
  text: 'Надішлемо код купону після заявки.',
  discount: '-10%',
  target: 'матеріал',
} as const

export const moreInfoTrustLine = 'Відповімо протягом години у робочий час Пн - Пт 10:00 - 18:00'

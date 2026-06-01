export type BenefitItem = {
  id: string
  icon: string
  title: string
  text: string
}

export const benefits: BenefitItem[] = [
  {
    id: 'water-resistant',
    icon: '#icon-droplet',
    title: 'Вологостійкий',
    text: 'Не боїться води та пари. Підходить для ванних кімнат, душових зон і кухонь.',
  },
  {
    id: 'durable',
    icon: '#icon-shield',
    title: 'Міцний і довговічний',
    text: 'Стійкий до щоденного навантаження, стирання та дрібних механічних пошкоджень.',
  },
  {
    id: 'seamless',
    icon: '#icon-layers',
    title: 'Безшовна поверхня',
    text: 'Монолітне покриття без швів і стиків. Виглядає чисто, сучасно та мінімалістично.',
  },
  {
    id: 'custom-texture',
    icon: '#icon-palette',
    title: 'Будь-який колір і текстура',
    text: 'Можна підібрати відтінок, фактуру та характер поверхні під конкретний інтер’єр.',
  },
  {
    id: 'easy-care',
    icon: '#icon-sparkles',
    title: 'Легкий догляд',
    text: 'Поверхню легко очищати. Вона не потребує складного регулярного обслуговування.',
  },
]

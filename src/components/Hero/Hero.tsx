import SmartButton from '../ui/Button/SmartButton'
import heroImage from '@/assets/images/hero-bath-mb.webp'

const heroBadges = [
  {
    icon: '#icon-location',
    title: 'Львів та область',
    text: 'Працюємо локально',
  },
  {
    icon: '#icon-shield',
    title: 'Монтаж під ключ',
    text: 'Від підготовки до захисту',
  },
  {
    icon: '#icon-clock',
    title: 'Консультація в салоні',
    text: 'Швидко та зручно',
  },
]

const Hero = () => {
  return (
    <section className="bg-page relative mt-8 overflow-hidden lg:-mt-17">
      <div className="section-container relative z-10 flex flex-col items-center pb-0 lg:grid lg:min-h-[calc(100svh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:pt-0 lg:pb-16">
        <div className="relative z-10 flex flex-col items-center min-[680px]:w-[clamp(580px,calc(540.47px+5.81vw),620px)] lg:items-start">
          <h1 className="text-hero max-w-[clamp(480px,calc(240.2px+23.05vw),720px)] tracking-tight md:max-w-[540px] lg:mt-60 lg:max-w-[720px] lg:min-w-140 lg:text-start xl:max-w-200">
            Мікроцемент у Львові <br /> для ванних, підлог і стін
          </h1>

          <p className="text-hero-lead mt-6 max-w-110 lg:mt-8 lg:max-w-110 lg:min-w-100 lg:text-start">
            Підбір матеріалу, підготовка поверхні та монтаж під ключ. Надішліть фото приміщення —
            отримаєте кваліфіковану консультацію.
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row lg:mt-18">
            <SmartButton
              label="Отримати купон на знижку"
              href="#more-info"
              className="lg:hover:bg-accent/90 w-full"
              size="lg"
              icon={
                <svg className="size-5" aria-hidden="true">
                  <use href="/svg/icons.svg#icon-calculator" />
                </svg>
              }
            />

            <SmartButton
              label="Подивитися приклади"
              href="#applications"
              variant="outline"
              className="w-full"
              size="lg"
              icon={
                <svg className="size-5" aria-hidden="true">
                  <use href="/svg/icons.svg#icon-image" />
                </svg>
              }
            />
          </div>

          <ul className="mt-10 hidden w-full sm:grid-cols-3 md:grid lg:mt-18 lg:max-w-[620px] lg:gap-1">
            {heroBadges.map(badge => (
              <li key={badge.title} className="flex items-start gap-2">
                <span className="border-border-soft bg-surface/60 flex size-11 shrink-0 items-center justify-center rounded-full border lg:size-5">
                  <svg className="text-text-soft size-6 lg:size-3" aria-hidden="true">
                    <use href={`/svg/icons.svg${badge.icon}`} />
                  </svg>
                </span>

                <span>
                  <span className="text-body-medium block leading-none">{badge.title}</span>
                  <span className="text-caption mt-1 block">{badge.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-10 h-[clamp(360px,75vw,620px)] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-[clamp(-120px,calc(255.38px-22.85vw),-40px)] lg:mt-0 lg:h-full lg:w-[58vw] xl:right-[clamp(-240px,calc(45.71px-12.29vw),-120px)]">
        <img
          src={heroImage}
          alt="Ванна кімната з покриттям мікроцемент"
          className="h-full w-full object-cover object-center"
        />

        <div className="from-page/0 via-page/0 to-page/10 lg:from-page lg:via-page/20 pointer-events-none absolute inset-0 bg-linear-to-b lg:bg-linear-to-r lg:to-transparent" />
      </div>
    </section>
  )
}

export default Hero

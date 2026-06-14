import type { HowStepItem } from './data/how-it-works.data'

type HowStepCardProps = {
  step: HowStepItem
  isLast?: boolean
}

const HowStepCard = ({ step, isLast = false }: HowStepCardProps) => {
  const stepNumber = String(step.id).padStart(2, '0')

  return (
    <li className="relative flex min-w-[82%] snap-center flex-col items-center sm:min-w-[70%] md:min-w-[48%] lg:min-w-0 lg:flex-1 lg:snap-align-none">
      <article className="border-border-soft bg-bg-card shadow-soft flex h-full min-h-[280px] w-full flex-col items-center justify-between gap-6 rounded-2xl border px-6 py-8 text-center lg:min-h-[270px] lg:px-5 lg:py-9">
        <div className="bg-bg-card-soft flex size-18 items-center justify-center rounded-full">
          <svg className="text-accent size-8" aria-hidden="true">
            <use href={`/svg/icons.svg${step.icon}`} />
          </svg>
        </div>

        <span className="text-accent text-lg leading-none font-semibold">{stepNumber}</span>

        <h3 className="text-text-main leading-tight font-semibold lg:text-base xl:text-lg">
          {step.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed xl:text-base">{step.text}</p>
      </article>

      {!isLast && (
        <span
          className="bg-border-medium absolute top-1/2 left-full hidden h-px w-8 -translate-y-1/2 lg:block"
          aria-hidden="true"
        >
          <span className="bg-accent absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full" />
          <span className="bg-accent absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full" />
        </span>
      )}
    </li>
  )
}

export default HowStepCard

import { cn } from '@/lib/cn'
import type { HowStepItem } from './data/how-it-works.data'

type HowStepCardProps = {
  step: HowStepItem
  isLast?: boolean
  isSecond?: boolean
}

const HowStepCard = ({ step, isLast = false, isSecond = false }: HowStepCardProps) => {
  const stepNumber = String(step.id).padStart(2, '0')

  return (
    <li className="relative flex flex-col items-center lg:flex-1">
      <article className="border-border-soft bg-bg-card shadow-soft flex h-full min-h-[270px] w-full flex-col items-center justify-between rounded-2xl border px-6 py-8 text-center sm:max-w-none sm:gap-6 sm:max-lg:flex-row lg:flex-col lg:px-5 lg:py-9">
        <div className="bg-bg-card-soft flex size-18 items-center justify-center rounded-full">
          <svg className="text-accent size-8" aria-hidden="true">
            <use href={`/svg/icons.svg${step.icon}`} />
          </svg>
        </div>

        <span
          className={cn(
            'text-accent text-lg leading-none font-semibold',
            isSecond && '1xl:inline hidden'
          )}
        >
          {stepNumber}
        </span>

        <h3 className="text-text-main text-lg leading-tight font-semibold">{step.title}</h3>

        <p className="text-text-muted text-base leading-relaxed">{step.text}</p>
      </article>

      {!isLast && (
        <span
          className={cn(
            'bg-border-medium absolute top-1/2 left-full hidden h-px w-8 -translate-y-1/2',
            isSecond ? '1xl:block' : 'lg:block'
          )}
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

import type { BenefitItem } from './data/benefits.data'

type BenefitCardProps = {
  benefit: BenefitItem
}

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  return (
    <article className="border-border-soft bg-bg-card rounded-2xl border p-5 shadow-lg md:max-w-[calc(33%-0.6rem)] lg:flex-1">
      <div className="bg-accent-soft mb-8 flex size-14 items-center justify-center rounded-full">
        <svg className="text-text-main size-6" aria-hidden="true">
          <use href={`/svg/icons.svg${benefit.icon}`} />
        </svg>
      </div>

      <h3 className="text-card-title text-text-main">{benefit.title}</h3>

      <p className="text-card-text text-text-muted mt-3">{benefit.text}</p>
    </article>
  )
}

export default BenefitCard

import type { BenefitItem } from './data/benefits.data'

type BenefitsMobileWheelProps = {
  items: BenefitItem[]
}

const BenefitsMobileWheel = ({ items }: BenefitsMobileWheelProps) => {
  return (
    <div className="relative md:hidden">
      <div className="from-bg-main pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-linear-to-b to-transparent" />
      <div className="from-bg-main pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-t to-transparent" />

      <div className="max-h-[300px] snap-y snap-mandatory overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="py-8">
          {items.map(item => (
            <article
              key={item.id}
              className="bg-bg-card mb-4 snap-center rounded-2xl border border-neutral-300 p-5 shadow-lg last:mb-0"
            >
              <div className="bg-bg-muted mb-6 flex size-12 items-center justify-center rounded-full">
                <svg className="text-text-main size-5" aria-hidden="true">
                  <use href={`/svg/icons.svg${item.icon}`} />
                </svg>
              </div>

              <h3 className="text-card-title text-text-main">{item.title}</h3>

              <p className="text-card-text text-text-muted mt-3">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsMobileWheel

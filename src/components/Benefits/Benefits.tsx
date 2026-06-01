import BenefitCard from './BenefitCard'
import BenefitsCta from './BenefitsCta'
import BenefitsMobileWheel from './BenefitsMobileWheel'
import { benefits } from './data/benefits.data'

const Benefits = () => {
  return (
    <section id="benefits" className="bg-bg-main py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-2 w-full md:mb-10">
          <h2 className="text-section-title text-text-main mb-3">
            Чому мікроцемент — ідеальне рішення
          </h2>

          <p className="text-hero-lead text-text-muted max-w-xl text-start">
            Сучасне покриття, яке поєднує естетику, міцність та практичність.
          </p>
        </div>

        <BenefitsMobileWheel items={benefits} />

        <div className="hidden gap-4 md:flex md:flex-wrap md:justify-center lg:flex-nowrap">
          {benefits.map(benefit => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>

        <BenefitsCta />
      </div>
    </section>
  )
}

export default Benefits

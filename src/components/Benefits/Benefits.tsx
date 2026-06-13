import SmartButton from '@/components/ui/Button/SmartButton'
import BenefitCard from './BenefitCard'
import BenefitsMobileWheel from './BenefitsMobileWheel'
import { benefitsSectionData } from './data/benefits.data'

const Benefits = () => {
  const { title, subtitle, items, cta } = benefitsSectionData

  return (
    <section id="benefits" className="bg-bg-section py-16 md:py-24">
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">{title}</h2>

          <p className="section-subtitle">{subtitle}</p>
        </header>

        <div className="hidden gap-4 lg:flex lg:flex-nowrap lg:justify-center">
          {items.map(item => (
            <BenefitCard key={item.id} benefit={item} />
          ))}
        </div>

        <BenefitsMobileWheel items={items} />

        <div className="bg-bg-card mt-8 flex flex-col gap-5 rounded-xl p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-text-main text-lg font-semibold">{cta.title}</h3>

            <p className="text-text-muted mt-2 text-sm leading-6">{cta.text}</p>
          </div>

          <SmartButton label={cta.buttonLabel} href={cta.href} />
        </div>
      </div>
    </section>
  )
}

export default Benefits

import HowStepCard from './HowStepCard'
import { howItWorksData } from './data/how-it-works.data'

const HowItWorks = () => {
  const { title, subtitle, steps } = howItWorksData

  return (
    <section className="bg-bg-page-soft py-16 sm:py-20 lg:py-24" id="how-it-works">
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">{title}</h2>

          <p className="section-subtitle">{subtitle}</p>
        </header>

        <p className="text-text-muted mb-4 text-center text-sm lg:hidden">
          Гортайте, щоб побачити всі етапи
        </p>

        <ol className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {steps.map((step, index) => (
            <HowStepCard key={step.id} step={step} isLast={index === steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks

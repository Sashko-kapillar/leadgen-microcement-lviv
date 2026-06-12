import HowStepCard from './HowStepCard'
import { howItWorksData } from './data/how-it-works.data'

const HowItWorks = () => {
  const { title, subtitle, steps } = howItWorksData

  return (
    <section className="bg-bg-page-soft py-16 sm:py-20 lg:py-24" id="how-it-works">
      <div className="section-container">
        <header className="section-header mb-10 w-full sm:mb-12 lg:mb-14">
          <h2 className="section-title">{title}</h2>

          <p className="section-subtitle">{subtitle}</p>
        </header>

        <ol className="1xl:grid-cols-4 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <HowStepCard
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
              isSecond={index === 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks

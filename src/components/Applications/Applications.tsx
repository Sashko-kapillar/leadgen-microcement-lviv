import SmartButton from '@/components/ui/Button/SmartButton'
import ApplicationCard from './ApplicationCard'
import { applicationsSectionData } from './data/applications.data'

const Applications = () => {
  const { title, subtitle, items, cta } = applicationsSectionData

  return (
    <section id="applications" className="bg-dust-white section">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-text-main text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          <p className="text-text-muted mt-3 text-base leading-7">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-center lg:flex-nowrap">
          {items.map(item => (
            <ApplicationCard key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-bg-light mt-8 flex flex-col gap-5 rounded-xl p-6 shadow-sm md:flex-row md:items-center md:justify-between">
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

export default Applications

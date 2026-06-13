import { useState } from 'react'
import SmartButton from '@/components/ui/Button/SmartButton'
import ApplicationCard from './ApplicationCard'
import ApplicationLightbox from './ApplicationLightbox'
import { applicationsSectionData, type ApplicationItem } from './data/applications.data'

const Applications = () => {
  const { title, subtitle, items, cta } = applicationsSectionData
  const [activeItem, setActiveItem] = useState<ApplicationItem | null>(null)

  const handlePreviewOpen = (item: ApplicationItem) => {
    setActiveItem(item)
  }

  const handlePreviewClose = () => {
    setActiveItem(null)
  }

  return (
    <section id="applications" className="bg-dust-white section">
      <div className="section-container">
        <header className="section-header">
          <h2 className="text-text-main text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          <p className="text-text-muted mt-3 text-base leading-7">{subtitle}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(item => (
            <ApplicationCard key={item.id} item={item} onPreviewOpen={handlePreviewOpen} />
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

      <ApplicationLightbox item={activeItem} onClose={handlePreviewClose} />
    </section>
  )
}

export default Applications

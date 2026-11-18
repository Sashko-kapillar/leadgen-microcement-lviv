import type { ApplicationItem } from './data/applications.data'

type ApplicationCardProps = {
  item: ApplicationItem
  onPreviewOpen: (item: ApplicationItem) => void
}

const ApplicationCard = ({ item, onPreviewOpen }: ApplicationCardProps) => {
  return (
    <article className="application-card bg-bg-card relative isolate flex flex-col rounded-xl shadow-sm">
      {/* Animated border */}
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xl"
        aria-hidden="true"
      >
        <span className="application-card__border application-card__border--left" />
        <span className="application-card__border application-card__border--right" />
      </div>

      {/* Image preview */}
      <button
        type="button"
        className="focus-visible:outline-accent block w-full cursor-zoom-in overflow-hidden rounded-t-xl text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
        onClick={() => onPreviewOpen(item)}
        aria-label={`Збільшити фото: ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          className="block h-48 w-full object-cover md:h-52"
          loading="lazy"
          decoding="async"
        />
      </button>

      {/* Card content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-text-main text-lg font-semibold">{item.title}</h3>

          <p className="text-text-muted mt-3 text-sm leading-6">{item.text}</p>
        </div>

        {/* Open lightbox */}
        <button
          type="button"
          className="text-text-main hover:text-accent focus-visible:outline-accent mt-5 inline-flex w-fit cursor-pointer items-center text-sm font-medium transition-colors duration-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          onClick={() => onPreviewOpen(item)}
        >
          {item.buttonLabel}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </button>
      </div>
    </article>
  )
}

export default ApplicationCard

import type { ApplicationItem } from './data/applications.data'

type ApplicationCardProps = {
  item: ApplicationItem
  onPreviewOpen: (item: ApplicationItem) => void
}

const ApplicationCard = ({ item, onPreviewOpen }: ApplicationCardProps) => {
  return (
    <article className="bg-bg-light flex flex-col overflow-hidden rounded-xl shadow-sm">
      <button
        type="button"
        className="group block overflow-hidden text-left"
        onClick={() => onPreviewOpen(item)}
        aria-label={`Збільшити фото: ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-52"
          loading="lazy"
        />
      </button>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-text-main text-lg font-semibold">{item.title}</h3>
          <p className="text-text-muted mt-3 text-sm leading-6">{item.text}</p>
        </div>

        <button
          type="button"
          className="text-text-main mt-5 inline-flex w-fit text-sm font-medium transition-opacity duration-300 hover:opacity-70"
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

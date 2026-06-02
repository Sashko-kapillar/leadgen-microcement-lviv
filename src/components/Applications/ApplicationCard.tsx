import type { ApplicationItem } from './data/applications.data'

type ApplicationCardProps = {
  item: ApplicationItem
}

const ApplicationCard = ({ item }: ApplicationCardProps) => {
  return (
    <article className="bg-bg-light overflow-hidden rounded-xl shadow-sm">
      <img
        src={item.image}
        alt={item.imageAlt}
        className="h-48 w-full object-cover md:h-52"
        loading="lazy"
      />

      <div className="flex flex-col justify-between p-5">
        <div>
          <h3 className="text-text-main text-lg font-semibold">{item.title}</h3>
          <p className="text-text-muted mt-3 text-sm leading-6">{item.text}</p>
        </div>

        <a
          href={item.href}
          className="text-text-main mt-5 inline-flex text-sm font-medium transition-opacity duration-300 hover:opacity-70"
        >
          {item.linkLabel}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </a>
      </div>
    </article>
  )
}

export default ApplicationCard

import { useEffect } from 'react'
import type { ApplicationItem } from './data/applications.data'

type ApplicationLightboxProps = {
  item: ApplicationItem | null
  onClose: () => void
}

const ApplicationLightbox = ({ item, onClose }: ApplicationLightboxProps) => {
  useEffect(() => {
    if (!item) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Перегляд фото: ${item.title}`}
    >
      <div
        className="bg-bg-light relative w-fit max-w-5xl overflow-hidden rounded-2xl shadow-xl"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          className="text-text-main absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-xl leading-none shadow-sm transition-opacity duration-300 hover:opacity-80"
          onClick={onClose}
          aria-label="Закрити перегляд фото"
        >
          ×
        </button>

        <img src={item.image} alt={item.imageAlt} className="max-h-[78vh] w-full object-contain" />

        <div className="border-border-soft border-t px-5 py-4">
          <h3 className="text-text-inverse text-lg font-semibold">{item.title}</h3>
          <p className="text-text-inverse mt-1 text-sm leading-6">{item.text}</p>
        </div>
      </div>
    </div>
  )
}

export default ApplicationLightbox

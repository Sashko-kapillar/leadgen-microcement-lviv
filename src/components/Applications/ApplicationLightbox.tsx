import { useEffect, useRef } from 'react'
import type { ApplicationItem } from './data/applications.data'

type ApplicationLightboxProps = {
  item: ApplicationItem | null
  onClose: () => void
}

const ApplicationLightbox = ({ item, onClose }: ApplicationLightboxProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!item) return

    const previousBodyOverflow = document.body.style.overflow
    const dialogElement = dialogRef.current
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const getFocusableElements = () => {
      if (!dialogElement) return []

      return Array.from(
        dialogElement.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(element => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()

      if (!focusableElements.length) {
        event.preventDefault()
        dialogElement?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      const focusableElements = getFocusableElements()
      focusableElements[0]?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      previouslyFocusedElement?.focus()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-lightbox-title"
      tabIndex={-1}
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
          <h3 id="application-lightbox-title" className="text-text-inverse text-lg font-semibold">
            {item.title}
          </h3>
          <p className="text-text-inverse mt-1 text-sm leading-6">{item.text}</p>
        </div>
      </div>
    </div>
  )
}

export default ApplicationLightbox

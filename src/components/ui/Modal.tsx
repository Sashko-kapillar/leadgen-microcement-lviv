import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  labelledBy?: string
}

const Modal = ({ children, onClose, labelledBy }: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousBodyOverflow

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus({ preventScroll: true })
      }
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-4 backdrop-blur-[2px] sm:py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="border-border-soft bg-bg-card relative max-h-[90dvh] w-full max-w-[430px] overflow-y-auto overscroll-contain rounded-3xl border p-5 shadow-2xl sm:max-w-[760px] sm:p-8 lg:max-w-[860px] lg:p-10"
        onClick={event => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Закрити вікно"
          onClick={onClose}
          className="text-text-main hover:bg-bg-card-muted focus-visible:ring-accent absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 sm:top-5 sm:right-5"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal

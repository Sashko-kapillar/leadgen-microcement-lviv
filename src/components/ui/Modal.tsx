import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  labelledBy?: string
}

const Modal = ({ children, onClose, labelledBy }: ModalProps) => {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousBodyOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="border-border-soft bg-bg-card relative w-full max-w-[430px] rounded-3xl border px-6 py-9 shadow-2xl sm:px-9 sm:py-10"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрити вікно"
          className="text-text-main hover:bg-bg-card-muted focus-visible:ring-accent absolute top-5 right-5 flex size-8 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2"
          onClick={onClose}
        >
          <svg aria-hidden="true" className="size-5">
            <use href="/svg/icons.svg#icon-close" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal

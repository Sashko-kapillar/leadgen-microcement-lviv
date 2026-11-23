import PromoOffer from '../PromoOffer/PromoOffer'

type SuccessPopupProps = {
  requestNumber: string
  requestTypeLabel: string
  onClose: () => void
}

const SuccessPopup = ({ requestNumber, onClose }: SuccessPopupProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center md:gap-4">
      {/* Success heading */}
      <div className="flex w-full flex-col items-center text-center">
        {/* Heading */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="text-accent flex size-7 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="m8 12 2.5 2.5L16 9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2
            id="success-popup-title"
            className="font-primary text-text-main text-xl leading-[1.3] font-extrabold tracking-tight sm:text-2xl"
          >
            Дякуємо! Заявку прийнято
          </h2>
        </div>

        {/* Request number */}
        <div className="border-border-soft bg-bg-card-soft mt-5 w-full max-w-[370px] rounded-2xl border px-6 py-4">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Номер звернення</p>

          <p className="text-accent mt-1 text-xl font-bold">№ {requestNumber}</p>
        </div>

        {/* Manager message */}
        <p className="text-body text-accent mt-4">Ми скоро з вами зв’яжемося</p>
      </div>

      {/* Promotional offer */}
      <PromoOffer />
      <button
        type="button"
        onClick={onClose}
        className="text-button bg-accent text-cta-text hover:bg-accent-hover focus-visible:ring-accent min-h-12 w-full rounded-xl px-6 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Гаразд
      </button>
    </div>
  )
}

export default SuccessPopup

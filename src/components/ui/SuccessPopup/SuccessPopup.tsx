import PromoOffer from '../PromoOffer/PromoOffer'

type SuccessPopupProps = {
  requestNumber: string
  requestTypeLabel: string
  onClose: () => void
}

const SuccessPopup = ({
  requestNumber,
  requestTypeLabel: _requestTypeLabel,
  onClose,
}: SuccessPopupProps) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* Success confirmation */}
      <div className="flex w-full max-w-[560px] flex-col items-center">
        {/* Heading */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div
            className="text-accent flex size-7 shrink-0 items-center justify-center rounded-full sm:size-9"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6 sm:size-8">
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
            className="font-primary text-text-main text-[clamp(22px,3vw,32px)] leading-[1.25] font-extrabold tracking-[-0.035em]"
          >
            Дякуємо! Заявку прийнято
          </h2>
        </div>

        {/* Request number */}
        <div className="border-border-soft bg-bg-card-soft mt-5 w-full rounded-2xl border px-5 py-4 sm:mt-6">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Номер звернення</p>

          <p className="text-accent mt-1 text-xl font-bold sm:text-2xl">№ {requestNumber}</p>
        </div>

        {/* Manager message */}
        <p className="text-body text-text-soft mt-4">Ми скоро з вами зв’яжемося</p>
      </div>

      {/* Promotional offer */}
      <div className="w-full max-w-[560px]">
        <PromoOffer />
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="text-button bg-accent text-cta-text hover:bg-accent-hover focus-visible:ring-accent mt-5 min-h-12 w-full max-w-[560px] rounded-xl px-6 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Гаразд
      </button>
    </div>
  )
}

export default SuccessPopup

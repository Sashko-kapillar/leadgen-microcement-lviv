import PromoOffer from '../PromoOffer/PromoOffer'

type SuccessPopupProps = {
  requestNumber: string
  requestTypeLabel: string
  onClose: () => void
}

const SuccessPopup = ({ requestNumber, requestTypeLabel, onClose }: SuccessPopupProps) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* Success heading */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <div
          className="bg-accent/10 text-accent flex size-12 shrink-0 items-center justify-center rounded-full sm:size-16"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-6 sm:size-8">
            <path
              d="M5 12.5 9.25 17 19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          id="success-popup-title"
          className="font-second text-text-main text-2xl font-semibold sm:text-3xl"
        >
          Дякуємо!
        </h2>
      </div>

      <p className="text-body text-text-main mt-4">Вашу заявку успішно отримано</p>

      {/* Request information */}
      <div className="border-border-soft bg-bg-card-soft mt-6 w-full rounded-2xl border p-5 text-left">
        <div className="border-border-soft border-b pb-4 text-center">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Тип звернення</p>

          <p className="text-text-main mt-1 font-semibold">{requestTypeLabel}</p>
        </div>

        <div className="pt-4 text-center">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Номер звернення</p>

          <p className="text-accent mt-1 text-xl font-bold">№ {requestNumber}</p>
        </div>
      </div>

      {/* Manager message */}
      <p className="text-body text-text-soft mt-6 max-w-[520px]">
        Менеджер зв’яжеться з вами протягом години у робочий час та уточнить усі необхідні деталі.
      </p>

      {/* Promotional offer */}
      <PromoOffer requestNumber={requestNumber} />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="text-button bg-accent text-cta-text hover:bg-accent-hover focus-visible:ring-accent mt-6 min-h-12 w-full rounded-xl px-6 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Гаразд
      </button>
    </div>
  )
}

export default SuccessPopup

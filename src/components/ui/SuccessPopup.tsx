import iconsSprite from '../../assets/images/svg/icons.svg'

type SuccessPopupProps = {
  requestNumber: string
  requestTypeLabel: string
  onClose: () => void
}

const SuccessPopup = ({ requestNumber, requestTypeLabel, onClose }: SuccessPopupProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-accent mb-6 flex items-center justify-center">
        <svg aria-hidden="true" className="size-16">
          <use href={`${iconsSprite}#coupon-booked`} />
        </svg>
      </div>

      <h2 id="success-popup-title" className="section-title mb-2">
        Дякуємо!
      </h2>

      <p className="text-body text-text-main">Вашу заявку отримано</p>

      <div className="border-border-soft bg-bg-card-soft mt-6 w-full rounded-2xl border p-5">
        <div className="border-border-soft border-b pb-4">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Тип звернення</p>

          <p className="text-text-main mt-1 font-semibold">{requestTypeLabel}</p>
        </div>

        <div className="pt-4">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Номер звернення</p>

          <p className="text-accent mt-1 text-xl font-bold">№ {requestNumber}</p>
        </div>
      </div>

      <p className="text-body text-text-soft mt-6 max-w-[520px] text-center">
        Менеджер зв’яжеться з вами протягом години у робочий час, щоб уточнити деталі.
      </p>

      <button
        type="button"
        className="text-button bg-accent text-cta-text hover:bg-accent-hover focus-visible:ring-accent mt-8 min-h-12 w-full rounded-xl px-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        onClick={onClose}
      >
        Гаразд
      </button>
    </div>
  )
}

export default SuccessPopup

import iconsSprite from '../../assets/images/svg/icons.svg'

type SuccessPopupProps = {
  couponNumber: string
  couponImageDataUrl: string
  onClose: () => void
}

const SuccessPopup = ({ couponNumber, couponImageDataUrl, onClose }: SuccessPopupProps) => {
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

      <p className="text-body text-text-main mb-1">Купон на матеріал заброньовано</p>

      {couponImageDataUrl ? (
        <img
          src={couponImageDataUrl}
          alt={`Купон ${couponNumber}`}
          className="w-full max-w-90 select-none md:min-w-110"
        />
      ) : (
        <div className="border-border-soft bg-bg-card-soft flex aspect-3/2 w-full max-w-90 items-center justify-center rounded-2xl border p-6 md:min-w-110">
          <p className="text-text-main text-lg font-bold">№ {couponNumber}</p>
        </div>
      )}

      <p className="text-body text-text-soft max-w-[520px] text-center">
        Менеджер зв’яжеться з вами протягом години у робочий час, щоб підтвердити купон.
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

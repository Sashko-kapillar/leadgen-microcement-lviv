import iconsSprite from '../../assets/images/svg/icons.svg'
import coupon from '../../assets/images/moreInfo/popup-coupon.webp'

type SuccessPopupProps = {
  couponNumber: string
  onClose: () => void
}

const SuccessPopup = ({ couponNumber, onClose }: SuccessPopupProps) => {
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

      <div className="relative flex aspect-3/2 w-full max-w-90 justify-center md:min-w-110">
        <img
          src={coupon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-contain select-none"
        />

        <div className="relative z-10 flex size-full flex-col items-center justify-center px-8 text-center">
          <p className="text-accent text-[clamp(18px,3vw,28px)] font-bold tracking-wide uppercase">
            Купон на матеріал
          </p>

          <div className="bg-accent/35 my-1 h-px w-[62%]" />

          <p className="text-accent text-[clamp(28px,11vw,72px)] leading-none font-black tracking-tight">
            -10%
          </p>

          <div className="bg-accent/35 my-2 h-px w-[62%]" />

          <p className="text-text-main text-[clamp(18px,3vw,28px)] font-bold">№ {couponNumber}</p>
        </div>
      </div>

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

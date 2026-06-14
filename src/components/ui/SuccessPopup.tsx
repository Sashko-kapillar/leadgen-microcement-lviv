type SuccessPopupProps = {
  onClose: () => void
}

const SuccessPopup = ({ onClose }: SuccessPopupProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-accent-soft text-accent mb-7 flex size-20 items-center justify-center rounded-full">
        <svg aria-hidden="true" className="size-9">
          <use href="/svg/icons.svg#icon-check" />
        </svg>
      </div>

      <h2 id="success-popup-title" className="section-title">
        {' '}
        Дякуємо!{' '}
      </h2>
      <h3>Купон заброньовано</h3>

      <p className="text-body text-text-soft mt-6 max-w-[320px] text-center">
        Менеджер зв’яжеться з вами протягом години у робочий час.
      </p>

      <button
        type="button"
        className="text-button bg-accent text-cta-text hover:bg-accent-hover focus-visible:ring-accent mt-9 min-h-12 w-full rounded-xl px-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        onClick={onClose}
      >
        Гаразд
      </button>
    </div>
  )
}

export default SuccessPopup

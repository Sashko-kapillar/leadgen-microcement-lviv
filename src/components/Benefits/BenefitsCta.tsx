const BenefitsCta = () => {
  return (
    <div className="bg-bg-card mt-8 flex flex-col md:flex-row gap-4 rounded-2xl border border-neutral-300 p-5 md:mt-10 md:items-center md:justify-between lg:gap-8">
      <div className="md:max-w-[60%]">
        <h3 className="text-card-title text-text-main">Рішення саме для вашого приміщення</h3>

        <p className="text-card-text text-text-muted mt-2">
          Надішліть фото — і ми порадимо матеріал, фактуру та зробимо попередній розрахунок
          вартості.
        </p>
      </div>

      <a
        href="#contact"
        target="_blank"
        rel="noreferrer"
        className="bg-text-main text-text-light text-bg-main ml-auto inline-flex min-h-12 items-center justify-center rounded-xl px-6 transition-opacity duration-300 hover:opacity-85 md:mt-0"
      >
        Надіслати фото в Telegram
      </a>
    </div>
  )
}

export default BenefitsCta

interface FooterProps {
  onPolicyClick?: () => void
}

const Footer = ({ onPolicyClick }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="xs:pb-[7px] 4xl:pb-17 w-full pb-18.5 lg:pb-5 xl:pb-14.5">
      <div className="section">
        <div className="xs:pb-17 4xl:pb-6.5 pt-0 pb-0 lg:pb-5">
          <div className="xl:justify-none xs:mb-15 4xl:mb-15 mb-10.5 flex flex-row justify-between lg:mb-8">
            <div className="xs:gap-x-1.5 4xl:gap-x-3 flex flex-row items-start gap-x-[5px] lg:gap-x-2.5">
              <a href="/" className="flex gap-1.5">
                <span className="sr-only">Повернутись на головну</span>
                <svg className="xs:w-9 xs:h-[50px] 4xl:w-[68px] 4xl:h-24 fill-tangerine group-hover:fill-tangerine h-[42px] w-[30px] transition-colors duration-300 lg:h-[78px] lg:w-14">
                  <use href="/images/svg/icons.svg#icon-logo" />
                </svg>
                <div className="xs:pt-2 4xl:pt-5 flex flex-col pt-1.5 lg:pt-3">
                  <span className="xs:text-xl 4xl:text-[38px] text-tangerine font-second leading-[120%] font-semibold lg:text-[32px]">
                    MVK MASH
                  </span>
                  <span className="xs:text-sm 4xl:text-[26px] font-second text-[11px] leading-[120%] text-white lg:text-[22px]">
                    SMART LOCKERS
                  </span>
                </div>
              </a>
            </div>
            {/*Cоціальні мережі*/}
            <div className="xs:gap-x-4 4xl:gap-x-14 flex gap-x-3 lg:w-1/2 lg:gap-x-5 lg:pt-4">
              <a
                href="https://t.me/HUB_mvk_mash"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="group"
              >
                <svg className="xs:w-12 xs:h-12 4xl:w-20.5 4xl:h-20.5 fill-tangerine hover:fill-chilean-fire focus:fill-chilean-fire h-10.5 w-10.5 transition-colors duration-300 lg:h-14 lg:w-14">
                  <use href="/images/svg/icons.svg#icon-telegram" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/HUB_mvk_mash"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <svg className="xs:w-12 xs:h-12 4xl:w-20.5 4xl:h-20.5 fill-tangerine hover:fill-chilean-fire focus:fill-chilean-fire h-10.5 w-10.5 transition-colors duration-300 lg:h-14 lg:w-14">
                  <use href="/images/svg/icons.svg#icon-insta" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@hub.mvkmash"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tik-Tok"
                className="group"
              >
                <svg className="xs:w-12 xs:h-12 4xl:w-20.5 4xl:h-20.5 fill-tangerine hover:fill-chilean-fire focus:fill-chilean-fire h-10.5 w-10.5 transition-colors duration-300 lg:h-14 lg:w-14">
                  <use href="/images/svg/icons.svg#icon-Union" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col lg:order-2 lg:w-1/2 lg:self-end">
              <h3 className="4xl:text-xl/[120%] font-second xs:mb-4.5 4xl:mb-6 mb-6 self-start leading-[120%] font-medium">
                Надсилайте свої запитання та пропозиції
              </h3>

              <div className="xs:flex-row xs:mb-13 4xl:mb-0 mb-9 flex flex-col">
                <div className="xs:gap-y-[5px] xs:mb-0 3xl:flex-none 3xl:mr-34 4xl:mr-50 mb-3 flex flex-1 flex-col items-start gap-y-0.5">
                  <p className="4xl:text-xl/[120%] text-mountain-mist leading-[120%] font-medium">
                    Запитання:
                  </p>
                  <a
                    href="mailto:hub@smart-hubmvk.com"
                    className="4xl:text-lg/[111%] leading-[125%] font-semibold hover:underline"
                  >
                    hub@smart-hubmvk.com
                  </a>
                </div>

                <div className="flex flex-1 flex-col items-start gap-y-[5px]">
                  <p className="4xl:text-xl/[120%] text-mountain-mist leading-[120%] font-medium">
                    Контакти:
                  </p>
                  <p className="4xl:text-lg/[111%] leading-[125%] font-semibold">
                    м. Київ, вул. Солом’янська 3
                    <a href="tel:+380502138055" className="block hover:underline">
                      +38 (050) 213 80 55
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="4xl:flex-row flex flex-col lg:w-1/2">
              <div className="4xl:order-2 xs:mb-9.5 4xl:mb-0 mb-11 flex flex-row lg:mb-8 xl:whitespace-nowrap">
                <a
                  href="#"
                  className="text-mountain-mist hover:text-tangerine group-focus:tangerine text-lg/[126%] tracking-[-0.03em] underline transition-colors duration-300"
                  onClick={e => {
                    e.preventDefault()
                    onPolicyClick?.()
                  }}
                >
                  Політика конфіденційності
                </a>
              </div>

              <div className="4xl:mr-24 flex flex-col gap-4 lg:max-w-[296px] xl:max-w-[280px]">
                <p className="text-mountain-mist leading-[120%] font-medium">
                  © 2003–{currentYear} ТОВ «MBK МАШ»
                </p>
                <p className="text-mountain-mist leading-[120%] font-medium lg:text-left">
                  Всі права захищені. Використання матеріалів сайту можливе тільки з посиланням на
                  джерело.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

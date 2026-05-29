// import { useState } from 'react'
// import Modal from '../ui/Modal/Modal'
// import BookModal from '../BookModal/BookModal'
// import BurgerToggle from '../BurgerToggle/BurgerToggle'
import SmartButton from '../ui/Button/SmartButton'
// import HeaderNav from '../HeaderNav/HeaderNav'

type HeaderProps = {
  setActiveIndex?: (index: number) => void
  onShowHome: () => void
  isPrivacy?: boolean
}

const Header = ({ isPrivacy = false, onShowHome }: HeaderProps) => {
  //   const [openBookModal, setOpenBookModal] = useState(false)
  //   const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-cod-gray/60 3xl:mt-18 4xl:mt-17 relative z-100 w-full lg:mt-10 lg:bg-transparent">
        <div className="section 1xl:py-0 1xl:h-14 4xl:h-16 flex h-full max-h-17 items-center justify-between gap-4 py-3.5">
          <a href="/" className="w-1/3">
            <span className="sr-only">Повернутись на головну</span>
            <svg className="1xl:h-13 4xl:w-12 4xl:h-16.5 fill-tangerine h-12.5 w-9.5">
              <use href="/images/svg/icons.svg#icon-logo" />
            </svg>
          </a>

          {isPrivacy ? (
            // Якщо сторінка політики — лише кнопка "На головну"
            <SmartButton
              onClick={() => onShowHome?.()}
              className="flex"
              variant="primary"
              label="На головну"
              href="/"
            />
          ) : (
            <>
              {/* {setActiveIndex && (
                <HeaderNav setActiveIndex={setActiveIndex} className="mx-auto w-1/3" />
              )} */}

              <div className="flex items-center justify-between gap-5.5 lg:w-1/3 lg:justify-end-safe">
                {/* {!isBurgerMenuOpen && (
                  <SmartButton
                    type="button"
                    // onClick={() => setOpenBookModal(true)}
                    label="Отримати консультацію"
                    variant="primary"
                    className="xs:flex text-star-dust border-star-dust 1xl:text-[18px]/[1] 1xl:py-4.5 1xl:px-5 bg-woodsmoke-black/50 hidden px-3 py-[15px] text-base/[100%] font-semibold backdrop-blur-[5px]"
                  />
                )}*/}

                {/* {setActiveIndex && (
                  <BurgerToggle
                    isOpen={isBurgerMenuOpen}
                    setIsOpen={setIsBurgerMenuOpen}
                    setActiveIndex={setActiveIndex}
                  />
                )} */}
              </div>
            </>
          )}
        </div>
      </header>

      {/* <Modal isOpen={openBookModal} onClose={() => setOpenBookModal(false)}>
        <BookModal onClose={() => setOpenBookModal(false)} />
      </Modal> */}
    </>
  )
}

export default Header

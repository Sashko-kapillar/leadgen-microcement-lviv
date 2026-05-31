// import { useState } from 'react'
// import Modal from '../ui/Modal/Modal'
// import BookModal from '../BookModal/BookModal'
// import BurgerToggle from '../BurgerToggle/BurgerToggle'
import SmartButton from '../ui/Button/SmartButton'
import HeaderNav from '../HeaderNav/HeaderNav'

type HeaderProps = {
  onShowHome: () => void
  isPrivacy?: boolean
}

const Header = ({ isPrivacy = false, onShowHome }: HeaderProps) => {
  //   const [openBookModal, setOpenBookModal] = useState(false)
  //   const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  return (
    <>
      <header className="relative top-4 z-100 w-full bg-transparent">
        <div className="section 1xl:py-0 1xl:h-14 4xl:h-16 flex h-full min-h-17 items-center justify-between gap-4">
          <a href="/" className="disflex w-1/3 py-4">
            <span className="text- text-logo sr-only text-black md:not-sr-only">
              Мікроцемент ✔ Львів
            </span>
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
              <HeaderNav className="mx-auto w-1/2" />

              <div className="hidden items-center justify-between gap-5.5 lg:flex lg:w-1/3 lg:justify-end-safe">
                <SmartButton
                  type="button"
                  label="Отримати розрахунок"
                  variant="primary"
                  className="text-dust-white 1xl:text-[18px]/[1] 1xl:py-4.5 1xl:px-5 bg-cod-black hover:bg-accent hidden border-none px-8 py-3.5 text-base/[100%] font-semibold backdrop-blur-[5px] md:flex"
                />
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

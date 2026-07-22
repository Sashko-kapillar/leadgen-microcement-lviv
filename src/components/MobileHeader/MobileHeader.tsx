import { useEffect, useRef, useState, type MouseEvent } from 'react'

import { mobileHeaderData, type MobileRequestType } from './data/mobile-header.data'

const MENU_TRANSITION_DURATION = 300

type MobileHeaderProps = {
  onShowHome?: () => void
}

type RequestTypeEventDetail = {
  requestType: MobileRequestType
}

function MobileHeader({ onShowHome }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const burgerButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleBrandClick = () => {
    if (onShowHome) {
      onShowHome()
      return
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleMobileBrandClick = () => {
    closeMenu()

    window.setTimeout(() => {
      handleBrandClick()
    }, MENU_TRANSITION_DURATION)
  }

  const scrollToSection = (targetId: string) => {
    const targetElement = document.getElementById(targetId)

    if (!targetElement) {
      return
    }

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const closeMenuAndScroll = (targetId: string) => {
    closeMenu()

    window.setTimeout(() => {
      scrollToSection(targetId)
    }, MENU_TRANSITION_DURATION)
  }

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()

    closeMenuAndScroll(targetId)
  }

  const handlePathClick = (requestType: MobileRequestType) => {
    window.dispatchEvent(
      new CustomEvent<RequestTypeEventDetail>('select-request-type', {
        detail: {
          requestType,
        },
      })
    )

    closeMenuAndScroll('more-info')
  }

  /*
   * Блокировка прокрутки страницы.
   *
   * position: fixed работает стабильнее обычного overflow: hidden,
   * особенно на iOS.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    scrollPositionRef.current = window.scrollY

    const originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.left = originalStyles.left
      document.body.style.right = originalStyles.right
      document.body.style.width = originalStyles.width
      document.body.style.overflow = originalStyles.overflow

      window.scrollTo({
        top: scrollPositionRef.current,
        left: 0,
        behavior: 'instant',
      })
    }
  }, [isMenuOpen])

  /*
   * Фокус:
   * - после открытия переносим на кнопку закрытия;
   * - после закрытия возвращаем на burger.
   */
  useEffect(() => {
    if (isMenuOpen) {
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })

      return
    }

    burgerButtonRef.current?.focus()
  }, [isMenuOpen])

  /*
   * Закрытие по Escape.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  /*
   * Простой focus trap:
   * Tab не позволяет уйти на контент под overlay.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const menuElement = menuRef.current

    if (!menuElement) {
      return
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = menuElement.querySelectorAll<HTMLElement>(
        ['a[href]', 'button:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(',')
      )

      if (focusableElements.length === 0) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 px-[clamp(1rem,4.5vw,1.5rem)] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex min-h-14 items-center justify-between rounded-[1.75rem] border border-white/15 bg-[#332f2b]/45 px-5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-md">
          <button
            type="button"
            onClick={handleBrandClick}
            className="font-unbounded text-xs font-medium tracking-[-0.03em] text-[#f5f1e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f1e9]"
            aria-label={`${mobileHeaderData.brand} — на початок сторінки`}
          >
            {mobileHeaderData.brand}
          </button>

          <button
            ref={burgerButtonRef}
            type="button"
            onClick={openMenu}
            className="grid size-11 place-items-center rounded-full text-[#f5f1e9] transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1e9]"
            aria-label={mobileHeaderData.aria.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="relative block h-4 w-7" aria-hidden="true">
              <span className="absolute top-1 left-0 h-px w-7 bg-current" />

              <span className="absolute right-0 bottom-1 h-px w-5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-navigation-menu"
        className={[
          'fixed inset-0 z-50 md:hidden',
          'transition-[visibility,opacity] duration-300',
          isMenuOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={mobileHeaderData.aria.menuTitle}
        aria-hidden={!isMenuOpen}
      >
        <div className="absolute inset-0 bg-[#211e1a]/96 backdrop-blur-xl" aria-hidden="true" />

        <div
          className={[
            'relative flex min-h-svh flex-col',
            'px-[clamp(1.25rem,6vw,2rem)]',
            'pb-[max(1.5rem,env(safe-area-inset-bottom))]',
            'pt-[max(1.25rem,env(safe-area-inset-top))]',
            'transition-transform duration-300 ease-out',
            isMenuOpen ? 'translate-y-0' : '-translate-y-4',
          ].join(' ')}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleMobileBrandClick}
              className="font-unbounded text-sm font-medium tracking-[-0.03em] text-[#f5f1e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f1e9]"
            >
              {mobileHeaderData.brand}
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="relative grid size-12 place-items-center rounded-full border border-white/15 text-[#f5f1e9] transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1e9]"
              aria-label={mobileHeaderData.aria.closeMenu}
            >
              <span className="relative block size-5" aria-hidden="true">
                <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />

                <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="mt-[clamp(3rem,10vh,6rem)]" aria-label="Навігація сторінкою">
            <ul>
              {mobileHeaderData.navigation.map(item => (
                <li key={item.id} className="border-b border-white/12 first:border-t">
                  <a
                    href={`#${item.targetId}`}
                    onClick={event => handleNavigationClick(event, item.targetId)}
                    className="group flex min-h-19 items-center gap-5 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#dcb96f]"
                  >
                    <span className="font-unbounded w-7 shrink-0 text-[0.6875rem] text-[#dcb96f]">
                      {item.number}
                    </span>

                    <span className="font-unbounded flex-1 text-[clamp(1.125rem,5vw,1.5rem)] leading-tight font-medium tracking-[-0.04em] text-[#f5f1e9]">
                      {item.label}
                    </span>

                    <span
                      className="text-xl text-[#dcb96f] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section
            className="mt-[clamp(2rem,6vh,3.5rem)] border-t border-white/15 pt-6"
            aria-labelledby="mobile-paths-title"
          >
            <h2 id="mobile-paths-title" className="text-sm font-medium text-white/55">
              {mobileHeaderData.pathsTitle}
            </h2>

            <ul className="mt-4">
              {mobileHeaderData.paths.map(path => (
                <li key={path.id}>
                  <button
                    type="button"
                    onClick={() => handlePathClick(path.id)}
                    className="group flex min-h-12 w-full items-center justify-between py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dcb96f]"
                  >
                    <span className="text-base font-semibold text-[#f5f1e9]">{path.label}</span>

                    <span
                      className="text-xl text-[#dcb96f] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 text-sm text-[#dcb96f]">
              <span className="block size-1.5 rounded-full bg-current" aria-hidden="true" />

              <span>{mobileHeaderData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader

import { useEffect, useRef } from 'react'
import heroImage from '@/assets/images/hero/hero-bg-1.webp'
import iconsSprite from '../../assets/images/svg/icons.svg'
import { heroLetters, heroActions } from './data/hero-words.data'
import SmartButton from '../ui/Button/SmartButton'

function HeroWords() {
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      lettersRef.current.forEach(letter => {
        if (!letter) return

        letter.style.opacity = '1'
        letter.style.transform = 'none'
        letter.style.filter = 'none'
      })

      return
    }

    const animations = lettersRef.current.map((letter, index) => {
      if (!letter) return null

      return letter.animate(
        [
          {
            opacity: 0,
            transform: 'translate3d(0, 28px, 0) scale(0.94)',
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0)',
          },
        ],
        {
          duration: 850,
          delay: 100 + index * 70,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      )
    })

    return () => {
      animations.forEach(animation => animation?.cancel())
    }
  }, [])

  return (
    <section
      className="relative isolate -mt-20 min-h-svh overflow-hidden bg-[#d7d0c4]"
      aria-labelledby="hero-words-title"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img src={heroImage} alt="" className="h-full w-full object-cover object-center" />

        {/* Лёгкое затемнение для читаемости белых букв */}
        <div className="absolute inset-0 bg-black/8" />

        {/* Затемнение нижней части под текстом и кнопками */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-b from-transparent to-black/18" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 flex min-h-[calc(100svh-72px)] w-full flex-col xl:pt-30">
        <h1 id="hero-words-title" className="sr-only">
          Мікроцемент у Львові
        </h1>

        {/* SVG letters */}
        <div className="flex flex-1 flex-col items-center justify-center gap-10" aria-hidden="true">
          <div className="flex w-full items-end justify-between gap-[clamp(1px,0.38vw,7px)]">
            {heroLetters.map((letter, index) => (
              <span
                key={letter.id}
                ref={element => {
                  lettersRef.current[index] = element
                }}
                className="block min-w-0 shrink origin-bottom opacity-0 will-change-[transform,opacity,filter]"
                style={{
                  width: `calc(${letter.width} * clamp(1.05px, 0.46vw, 6.7px))`,
                }}
              >
                <svg
                  className={[
                    'block h-auto w-full overflow-visible',
                    letter.id === 'ts'
                      ? '[--letter-y:clamp(7px,calc(1.527vw+0.274px),14px)] md:[--letter-y:clamp(14px,calc(3.125vw-12px),24px)]'
                      : '[--letter-y:0px]',
                  ].join(' ')}
                  style={{
                    transform: `translateY(var(--letter-y)) scaleY(${letter.scale ?? 1})`,
                    transformOrigin: 'center bottom',
                  }}
                  viewBox={letter.viewBox}
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <use href={`${iconsSprite}${letter.icon}`} fill="#ffffff" />
                </svg>
              </span>
            ))}
          </div>
          <p className="hidden text-center text-2xl leading-relaxed text-white/90 drop-shadow-sm md:block lg:text-4xl">
            Безшовне декоративне покриття для ванних, підлоги та стін
          </p>
        </div>

        {/* Text and CTA */}
        <div className="relative mx-auto flex w-full flex-col items-center justify-center">
          <div className="grid w-full max-w-7xl gap-3 md:grid-cols-3 lg:mt-9 lg:gap-10">
            {heroActions.map(action => (
              <SmartButton
                key={action.id}
                href={action.href}
                label={action.title}
                description={<span className="hidden lg:block">{action.text}</span>}
                variant={action.variant}
                size="hero-card"
                icon={
                  <svg className="size-10" aria-hidden="true" focusable="false">
                    <use href={`${iconsSprite}${action.icon}`} />
                  </svg>
                }
                trailingIcon={<span aria-hidden="true">→</span>}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroWords

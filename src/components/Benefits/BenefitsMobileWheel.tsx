import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { BenefitItem } from './data/benefits.data'
import iconsSprite from '../../assets/images/svg/icons.svg'

type BenefitsMobileWheelProps = {
  items: BenefitItem[]
}

const BenefitsMobileWheel = ({ items }: BenefitsMobileWheelProps) => {
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.benefits-stack-card'))

    if (!cards.length) return

    let frameId = 0

    const updateHeight = () => {
      cancelAnimationFrame(frameId)

      frameId = requestAnimationFrame(() => {
        stack.style.removeProperty('--benefit-card-height')

        const maxHeight = Math.max(...cards.map(card => card.scrollHeight))

        stack.style.setProperty('--benefit-card-height', `${Math.ceil(maxHeight)}px`)
      })
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)

    cards.forEach(card => observer.observe(card))

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [items])

  return (
    <div className="lg:hidden">
      <div
        ref={stackRef}
        className="benefits-stack mb-12"
        style={
          {
            '--card-count': items.length,
          } as CSSProperties
        }
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="benefits-stack-card bg-bg-card rounded-2xl border border-neutral-300 p-5 shadow-lg"
            style={
              {
                '--card-index': index,
              } as CSSProperties
            }
          >
            <div className="mb-4">
              <svg className="text-accent-muted size-12" aria-hidden="true">
                <use href={`${iconsSprite}${item.icon}`} />
              </svg>
            </div>

            <h3 className="text-card-title text-text-main">{item.title}</h3>

            <p className="text-card-text text-text-muted mt-3">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BenefitsMobileWheel

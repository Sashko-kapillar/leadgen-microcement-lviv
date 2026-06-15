import type { CSSProperties } from 'react'
import type { BenefitItem } from './data/benefits.data'
import iconsSprite from '../../assets/images/svg/icons.svg'

type BenefitsMobileWheelProps = {
  items: BenefitItem[]
}

const BenefitsMobileWheel = ({ items }: BenefitsMobileWheelProps) => {
  return (
    <div className="lg:hidden">
      <div className="relative mb-12">
        {items.map((item, index) => {
          const cardStyle = {
            top: `${88 + index * 12}px`,
            zIndex: index + 1,
          } satisfies CSSProperties

          return (
            <article
              key={item.id}
              style={cardStyle}
              className="bg-bg-card sticky mb-6 rounded-2xl border border-neutral-300 p-5 shadow-lg"
            >
              <div className="mb-4">
                <svg className="text-accent-muted size-12" aria-hidden="true">
                  <use href={`${iconsSprite}${item.icon}`} />
                </svg>
              </div>

              <h3 className="text-card-title text-text-main">{item.title}</h3>

              <p className="text-card-text text-text-muted mt-3">{item.text}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default BenefitsMobileWheel

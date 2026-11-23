import { promoOfferData } from './data/promo-offer.data'
import promoImage from '@/assets/images/offer/offer.webp'

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[]
}

function trackPromoClick() {
  const analyticsWindow = window as AnalyticsWindow

  analyticsWindow.dataLayer?.push({
    event: 'promo_click',
    offer_id: promoOfferData.id,
    placement: 'success_popup',
  })
}

function PromoBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <svg
        className="text-accent size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-accent-hover text-xs font-extrabold tracking-[0.08em] uppercase md:text-base">
        {promoOfferData.badge}
      </span>
    </div>
  )
}

export default function PromoOffer() {
  return (
    <aside
      aria-label="Новий матеріал у салоні"
      className="border-border-soft bg-bg-card-muted w-full overflow-hidden rounded-2xl border"
    >
      {/* Image */}
      <div className="bg-bg-section-muted relative h-40 w-full overflow-hidden sm:h-45 lg:h-50">
        <img
          src={promoImage}
          alt="Новий матеріал у салоні"
          className="size-full object-cover object-[center_65%]"
          loading="lazy"
        />

        {/* Badge on image: tablet and desktop */}
        <PromoBadge className="absolute top-5 right-5 hidden rounded-xl bg-white/90 px-5 py-3 shadow-sm backdrop-blur-sm md:flex lg:top-6 lg:right-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 p-3 text-center md:gap-4 md:p-4">
        {/* Badge below image: mobile only */}
        <PromoBadge className="md:hidden" />

        <h3 className="font-primary text-text-main text-xl leading-[1.3] font-extrabold tracking-[-0.035em] lg:text-2xl lg:whitespace-nowrap">
          {promoOfferData.title.split(' за ціною фарби')[0]}
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          за ціною фарби
        </h3>

        <p className="text-text-soft max-w-[440px] text-sm leading-[1.6] sm:text-base">
          {promoOfferData.description}
        </p>

        <a
          href={promoOfferData.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackPromoClick}
          className="text-accent-hover hover:text-accent focus-visible:ring-accent inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-base font-extrabold transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
        >
          {promoOfferData.buttonLabel}

          <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M8 7h9v9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </aside>
  )
}

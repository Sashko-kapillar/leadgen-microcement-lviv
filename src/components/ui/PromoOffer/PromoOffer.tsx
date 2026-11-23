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

export default function PromoOffer() {
  return (
    <aside
      aria-label="Новий матеріал у салоні"
      className="border-border-soft bg-bg-card-muted mt-6 w-full overflow-hidden rounded-2xl border"
    >
      {/* Image placeholder */}
      <div
        aria-hidden="true"
        className="bg-bg-section-muted relative aspect-video w-full overflow-hidden sm:aspect-21/9"
      >
        Later:
        <img
          src={promoImage}
          alt="Фактура декоративної штукатурки"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="text-text-muted/35 size-10"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="m3 17 5-5 4 4 3-3 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-5 py-6 text-center sm:px-8">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="text-accent size-4 shrink-0"
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

          <span className="text-accent text-xs font-bold tracking-[0.08em] uppercase">
            {promoOfferData.badge}
          </span>
        </div>

        <h3 className="font-second text-text-main mt-4 max-w-[540px] text-lg leading-[1.4] font-medium sm:text-xl">
          {promoOfferData.title}
        </h3>

        <p className="text-text-muted mt-3 max-w-[440px] text-sm leading-[1.6] sm:text-base">
          {promoOfferData.description}
        </p>

        <a
          href={promoOfferData.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackPromoClick}
          className="text-accent hover:text-accent-hover focus-visible:ring-accent mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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

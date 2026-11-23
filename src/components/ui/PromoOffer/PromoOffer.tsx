import { useRef, useState } from 'react'
import { promoOfferData } from './data/promo-offer.data'

type PromoOfferProps = {
  requestNumber: string
}

type PromoStatus = 'idle' | 'loading' | 'success' | 'error'

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[]
}

const PROMO_TIMEOUT_MS = 10000

function trackPromoEvent(eventName: string) {
  const analyticsWindow = window as AnalyticsWindow

  analyticsWindow.dataLayer?.push({
    event: eventName,
    offer_id: promoOfferData.id,
    placement: 'success_popup',
  })
}

export default function PromoOffer({ requestNumber }: PromoOfferProps) {
  const [status, setStatus] = useState<PromoStatus>('idle')
  const isSendingRef = useRef(false)

  async function handlePromoClick() {
    if (isSendingRef.current || status === 'success') return

    isSendingRef.current = true

    trackPromoEvent('promo_click')
    setStatus('loading')

    const controller = new AbortController()

    const timeoutId = window.setTimeout(() => controller.abort(), PROMO_TIMEOUT_MS)

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'promo_interest',
          requestNumber,
          offerId: promoOfferData.id,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Promo request failed: ${response.status}`)
      }

      setStatus('success')
      trackPromoEvent('promo_lead')
    } catch (error) {
      console.error('Promo submit error:', error)
      setStatus('error')
    } finally {
      window.clearTimeout(timeoutId)
      isSendingRef.current = false
    }
  }

  return (
    <div className="bg-bg-hero-mb border-border-strong mt-6 flex w-full flex-col items-center rounded-2xl border p-5 text-center sm:p-6">
      <div className="flex items-center justify-center gap-2">
        <svg
          className="text-text-accent size-5 shrink-0"
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

        <p className="text-text-accent text-xs font-bold tracking-[0.08em] uppercase">
          {promoOfferData.badge}
        </p>
      </div>

      <h3 className="font-second text-text-inverse mt-4 max-w-[340px] text-lg leading-[1.4] font-medium sm:text-xl">
        {promoOfferData.title}
      </h3>

      <p className="text-text-inverse/80 mt-3 max-w-[320px] text-sm leading-[1.6]">
        {promoOfferData.description}
      </p>

      {status === 'success' ? (
        <div
          role="status"
          className="border-cta-gold-border bg-cta-gold/10 mt-5 flex w-full items-center justify-center gap-3 rounded-xl border p-4"
        >
          <svg
            className="text-cta-gold size-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12.5 9.25 17 19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-text-inverse text-sm font-semibold">{promoOfferData.successMessage}</p>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handlePromoClick}
            disabled={status === 'loading'}
            className="bg-cta-gold text-cta-gold-text hover:bg-cta-gold-hover focus-visible:ring-cta-gold-focus border-cta-gold-border focus-visible:ring-offset-bg-hero-mb mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading'
              ? promoOfferData.loadingLabel
              : status === 'error'
                ? promoOfferData.retryLabel
                : promoOfferData.buttonLabel}

            {status === 'idle' && (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {status === 'error' && (
            <p role="alert" className="mt-3 text-center text-sm text-red-300">
              {promoOfferData.errorMessage}
            </p>
          )}
        </>
      )}
    </div>
  )
}

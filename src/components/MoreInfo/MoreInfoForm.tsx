import { useState, type ChangeEvent, type FormEvent } from 'react'
import SmartButton from '../ui/Button/SmartButton'
import iconsSprite from '../../assets/images/svg/icons.svg'
import Modal from '../ui/Modal'
import SuccessPopup from '../ui/SuccessPopup'
import { cn } from '@/lib/cn'
import { couponInfo, moreInfoTrustLine } from './data/more-info.data'
import {
  moreInfoSchema,
  type MoreInfoFormErrors,
  type MoreInfoFormValues,
} from './more-info.schema'

const FORM_SUBMIT_TIMEOUT_MS = 10000

const initialFormState: MoreInfoFormValues = {
  name: '',
  contact: '',
}

function generateCouponNumber() {
  const number = Math.floor(Math.random() * 10000)
  const paddedNumber = String(number).padStart(4, '0')

  return `MC-${paddedNumber}`
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}

function getFieldErrors(
  fieldErrors: Partial<Record<keyof MoreInfoFormValues, string[] | undefined>>
): MoreInfoFormErrors {
  return Object.entries(fieldErrors).reduce<MoreInfoFormErrors>((acc, [key, value]) => {
    const message = value?.[0]

    if (message) {
      acc[key as keyof MoreInfoFormValues] = message
    }

    return acc
  }, {})
}

export default function MoreInfoForm() {
  const [form, setForm] = useState<MoreInfoFormValues>(initialFormState)
  const [errors, setErrors] = useState<MoreInfoFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [couponNumber, setCouponNumber] = useState('')

  function updateField<Key extends keyof MoreInfoFormValues>(
    field: Key,
    value: MoreInfoFormValues[Key]
  ) {
    setForm(currentForm => ({
      ...currentForm,
      [field]: value,
    }))

    setErrors(currentErrors => ({
      ...currentErrors,
      [field]: undefined,
    }))

    setSubmitStatus('idle')
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    updateField(name as keyof MoreInfoFormValues, value)
  }

  function handleCloseSuccessPopup() {
    setSubmitStatus('idle')
    setCouponNumber('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = moreInfoSchema.safeParse(form)

    if (!result.success) {
      setErrors(getFieldErrors(result.error.flatten().fieldErrors))
      setSubmitStatus('idle')
      return
    }

    const newCouponNumber = generateCouponNumber()

    const payload = {
      ...result.data,
      coupon: couponInfo,
      couponNumber: newCouponNumber,
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), FORM_SUBMIT_TIMEOUT_MS)

    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'coupon_submit',
        couponNumber: newCouponNumber,
      })

      setForm(initialFormState)
      setErrors({})
      setCouponNumber(newCouponNumber)
      setSubmitStatus('success')
    } catch (error) {
      if (isAbortError(error)) {
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('error')
    } finally {
      window.clearTimeout(timeoutId)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-bg-card mx-auto rounded-3xl p-5 shadow-[0_24px_80px_rgba(22,22,22,0.12)] min-[820px]:w-[92%] min-[900px]:w-[82%] sm:p-6 md:p-8 lg:p-10"
      >
        <div className="space-y-7">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="more-info-name"
                className="text-text-main mb-2 block text-base font-semibold"
              >
                Ваше ім’я
              </label>

              <div className="relative">
                <svg
                  className="text-text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <use href="/svg/icons.svg#icon-user" />
                </svg>

                <input
                  id="more-info-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleInputChange}
                  className={cn(
                    'text-text-main w-full rounded-xl border bg-white px-11 py-4 text-base transition-colors duration-300 outline-none',
                    'placeholder:text-text-muted',
                    'focus:border-accent',
                    errors.name ? 'border-red-500' : 'border-border-soft'
                  )}
                  placeholder="Введіть ваше ім’я"
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'more-info-name-error' : undefined}
                />
              </div>

              <p
                id="more-info-name-error"
                role={errors.name ? 'alert' : undefined}
                data-error={errors.name ?? ''}
                className={cn(
                  'mt-1 min-h-5 text-[12px] leading-5 text-red-600',
                  'before:block before:content-[attr(data-error)]',
                  errors.name ? 'before:opacity-100' : 'before:opacity-0'
                )}
              />
            </div>

            <div>
              <label
                htmlFor="more-info-contact"
                className="text-text-main mb-2 block text-base font-semibold"
              >
                Ваш телефон
              </label>

              <div className="relative">
                <svg
                  className="text-text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <use href={`${iconsSprite}#phone`} />
                </svg>

                <input
                  id="more-info-contact"
                  name="contact"
                  type="text"
                  value={form.contact}
                  onChange={handleInputChange}
                  className={cn(
                    'text-text-main w-full rounded-xl border bg-white px-11 py-4 text-base transition-colors duration-300 outline-none',
                    'placeholder:text-text-muted',
                    'focus:border-accent',
                    errors.contact ? 'border-red-500' : 'border-border-soft'
                  )}
                  placeholder="+38 (___) ___ __ __"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? 'more-info-contact-error' : undefined}
                />
              </div>

              <p
                id="more-info-contact-error"
                role={errors.contact ? 'alert' : undefined}
                data-error={errors.contact ?? ''}
                className={cn(
                  'mt-1 min-h-5 text-[12px] leading-5 text-red-600',
                  'before:block before:content-[attr(data-error)]',
                  errors.contact ? 'before:opacity-100' : 'before:opacity-0'
                )}
              />
            </div>
          </div>

          <div className="border-border-soft flex items-start gap-4 rounded-xl border bg-(--color-bg-page-soft) p-4">
            <div className="text-accent flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
              <svg className="size-16" aria-hidden="true">
                <use href={`${iconsSprite}#discount`} />
              </svg>
            </div>

            <div>
              <p className="text-accent font-semibold">{couponInfo.title}</p>
              <p className="text-text-soft mt-1 text-sm leading-[1.4]">{couponInfo.text}</p>
            </div>
          </div>

          <div>
            <SmartButton
              type="submit"
              label="Отримати знижку"
              loadingLabel="Відправляємо..."
              loading={isSubmitting}
              disabled={isSubmitting}
              size="lg"
              className="bg-accent hover:bg-accent-hover w-full text-white"
            />

            <p className="text-text-muted mt-4 flex items-start justify-center gap-2 text-center text-sm leading-[1.4]">
              <svg className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true">
                <use href={`${iconsSprite}#working-hours`} />
              </svg>

              <span className="max-w-70 text-start md:max-w-none">{moreInfoTrustLine}</span>
            </p>

            {submitStatus === 'error' && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                Не вдалося відправити заявку. Спробуйте ще раз або напишіть нам у Telegram.
              </p>
            )}
          </div>
        </div>
      </form>

      {submitStatus === 'success' && (
        <Modal onClose={handleCloseSuccessPopup} labelledBy="success-popup-title">
          <SuccessPopup couponNumber={couponNumber} onClose={handleCloseSuccessPopup} />
        </Modal>
      )}
    </>
  )
}

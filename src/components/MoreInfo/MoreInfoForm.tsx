import { useState, type ChangeEvent, type FormEvent } from 'react'
import SmartButton from '../ui/Button/SmartButton'
import { cn } from '@/lib/cn'
import { areaOptions, couponInfo, moreInfoTrustLine, roomTypes } from './data/more-info.data'
import {
  moreInfoSchema,
  type MoreInfoFormErrors,
  type MoreInfoFormValues,
} from './more-info.schema'

const initialFormState: MoreInfoFormValues = {
  roomType: roomTypes[0].id,
  area: areaOptions[1].id,
  name: '',
  contact: '',
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

function getSelectedLabel<T extends readonly { id: string; label: string }[]>(
  items: T,
  selectedId: string
) {
  return items.find(item => item.id === selectedId)?.label ?? selectedId
}

export default function MoreInfoForm() {
  const [form, setForm] = useState<MoreInfoFormValues>(initialFormState)
  const [errors, setErrors] = useState<MoreInfoFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = moreInfoSchema.safeParse(form)

    if (!result.success) {
      setErrors(getFieldErrors(result.error.flatten().fieldErrors))
      setSubmitStatus('idle')
      return
    }

    const payload = {
      ...result.data,
      roomTypeLabel: getSelectedLabel(roomTypes, result.data.roomType),
      areaLabel: getSelectedLabel(areaOptions, result.data.area),
      coupon: couponInfo,
    }

    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setForm(initialFormState)
      setErrors({})
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-(--color-bg-card) p-5 shadow-[0_24px_80px_rgba(22,22,22,0.12)] sm:p-6 md:p-8 lg:p-10"
    >
      <div className="space-y-7">
        <fieldset>
          <legend className="text-text-main mb-4 text-base font-semibold">Тип приміщення</legend>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {roomTypes.map(item => {
              const isActive = form.roomType === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('roomType', item.id)}
                  className={cn(
                    'flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-medium transition-colors duration-300',
                    'focus-visible:outline-accent focus-visible:outline focus-visible:outline-offset-2',
                    isActive
                      ? 'border-accent text-text-main bg-(--color-bg-page-soft)'
                      : 'border-border-soft text-text-soft hover:border-border-medium bg-white'
                  )}
                  aria-pressed={isActive}
                >
                  <svg className="text-accent size-7" aria-hidden="true">
                    <use href={`/svg/icons.svg${item.icon}`} />
                  </svg>

                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {errors.roomType && <p className="mt-2 text-sm text-red-600">{errors.roomType}</p>}
        </fieldset>

        <fieldset>
          <legend className="text-text-main mb-4 text-base font-semibold">
            Орієнтовна площа, м²
          </legend>

          <div className="flex flex-wrap gap-3">
            {areaOptions.map(item => {
              const isActive = form.area === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('area', item.id)}
                  className={cn(
                    'min-h-11 rounded-xl border px-5 text-sm font-medium transition-colors duration-300 sm:text-base',
                    'focus-visible:outline-accent focus-visible:outline focus-visible:outline-offset-2',
                    isActive
                      ? 'border-accent text-text-main bg-(--color-bg-page-soft)'
                      : 'border-border-soft text-text-soft hover:border-border-medium bg-white'
                  )}
                  aria-pressed={isActive}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {errors.area && <p className="mt-2 text-sm text-red-600">{errors.area}</p>}
        </fieldset>

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

            {errors.name && (
              <p id="more-info-name-error" role="alert" className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="more-info-contact"
              className="text-text-main mb-2 block text-base font-semibold"
            >
              Ваш телефон або Telegram
            </label>

            <div className="relative">
              <svg
                className="text-text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
                aria-hidden="true"
              >
                <use href="/svg/icons.svg#icon-phone" />
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
                placeholder="+38 (___) ___ __ __ або @username"
                autoComplete="tel"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? 'more-info-contact-error' : undefined}
              />
            </div>

            {errors.contact && (
              <p id="more-info-contact-error" role="alert" className="mt-2 text-sm text-red-600">
                {errors.contact}
              </p>
            )}
          </div>
        </div>

        <div className="border-border-soft flex items-start gap-4 rounded-xl border bg-(--color-bg-page-soft) p-4">
          <div className="text-accent flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
            <svg className="size-6" aria-hidden="true">
              <use href="/svg/icons.svg#icon-gift" />
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
            label="Отримати консультацію і купон"
            loadingLabel="Відправляємо..."
            loading={isSubmitting}
            disabled={isSubmitting}
            size="lg"
            className="bg-accent hover:bg-accent-hover w-full text-white"
          />

          <p className="text-text-muted mt-4 flex items-start justify-center gap-2 text-center text-sm leading-[1.4]">
            <svg className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true">
              <use href="/svg/icons.svg#icon-shield" />
            </svg>

            <span>{moreInfoTrustLine}</span>
          </p>

          {submitStatus === 'success' && (
            <p
              role="status"
              className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
            >
              Заявку відправлено. Ми зв’яжемося з вами протягом години та надішлемо купон.
            </p>
          )}

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
  )
}

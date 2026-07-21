import { useState, type ChangeEvent, type FormEvent } from 'react'
import SmartButton from '../ui/Button/SmartButton'
import iconsSprite from '../../assets/images/svg/icons.svg'
import Modal from '../ui/Modal'
import SuccessPopup from '../ui/SuccessPopup'
import { cn } from '@/lib/cn'
import { moreInfoTrustLine } from './data/more-info.data'
import {
  moreInfoSchema,
  type MoreInfoFormErrors,
  type MoreInfoFormValues,
  type RequestType,
} from './more-info.schema'

const FORM_SUBMIT_TIMEOUT_MS = 10000

const requestTypeOptions: Array<{
  value: RequestType
  label: string
  description: string
}> = [
  {
    value: 'material',
    label: 'Хочу купити матеріал',
    description: 'Допоможемо підібрати матеріал і розрахувати кількість.',
  },
  {
    value: 'master',
    label: 'Шукаю майстра',
    description: 'Підберемо майстра для нанесення мікроцементу.',
  },
  {
    value: 'self',
    label: 'Хочу нанести самостійно',
    description: 'Підкажемо, що потрібно для самостійного нанесення.',
  },
]

const initialFormState: MoreInfoFormValues = {
  requestType: '',
  name: '',
  contact: '',
}

type SubmitStatus = 'idle' | 'success' | 'error'

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
}

function generateRequestNumber() {
  const randomValues = new Uint32Array(1)

  crypto.getRandomValues(randomValues)

  const number = randomValues[0] % 10000

  return `MC-${String(number).padStart(4, '0')}`
}

function getRequestTypeLabel(requestType: RequestType) {
  return requestTypeOptions.find(option => option.value === requestType)?.label ?? requestType
}

function pushSubmitEvent(requestNumber: string, requestType: RequestType) {
  const dataLayerWindow = window as DataLayerWindow

  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || []

  dataLayerWindow.dataLayer.push({
    // Временно сохраняем старое имя события,
    // чтобы не сломать существующий триггер GTM.
    event: 'coupon_submit',
    requestNumber,
    requestType,
  })
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}

function getFieldErrors(
  fieldErrors: Partial<Record<keyof MoreInfoFormValues, string[] | undefined>>
): MoreInfoFormErrors {
  return Object.entries(fieldErrors).reduce<MoreInfoFormErrors>((accumulator, [key, value]) => {
    const message = value?.[0]

    if (message) {
      accumulator[key as keyof MoreInfoFormValues] = message
    }

    return accumulator
  }, {})
}

export default function MoreInfoForm() {
  const [form, setForm] = useState<MoreInfoFormValues>(initialFormState)

  const [errors, setErrors] = useState<MoreInfoFormErrors>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const [requestNumber, setRequestNumber] = useState('')
  const [submittedRequestTypeLabel, setSubmittedRequestTypeLabel] = useState('')

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

    updateField(
      name as keyof MoreInfoFormValues,
      value as MoreInfoFormValues[keyof MoreInfoFormValues]
    )
  }

  function handleCloseSuccessPopup() {
    setSubmitStatus('idle')
    setRequestNumber('')
    setSubmittedRequestTypeLabel('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = moreInfoSchema.safeParse(form)

    if (!result.success) {
      setErrors(getFieldErrors(result.error.flatten().fieldErrors))
      setSubmitStatus('idle')
      return
    }

    const newRequestNumber = generateRequestNumber()

    const requestTypeLabel = getRequestTypeLabel(result.data.requestType)

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
        body: JSON.stringify({
          ...result.data,
          requestTypeLabel,
          requestNumber: newRequestNumber,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Telegram request failed')
      }

      pushSubmitEvent(newRequestNumber, result.data.requestType)

      setForm(initialFormState)
      setErrors({})
      setRequestNumber(newRequestNumber)
      setSubmittedRequestTypeLabel(requestTypeLabel)
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
        className="bg-bg-card mx-auto rounded-3xl p-5 shadow-[0_24px_80px_rgba(22,22,22,0.12)] sm:p-6 md:w-max md:p-8 lg:p-10"
      >
        <div className="grid justify-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* Левая часть */}
          <fieldset className="max-w-150 min-w-0">
            <legend className="text-text-main mb-4 text-base font-semibold">
              Що вас цікавить?
            </legend>

            <div
              className="flex flex-col gap-4"
              aria-describedby="more-info-request-type-error"
              aria-invalid={Boolean(errors.requestType)}
            >
              {requestTypeOptions.map(option => {
                const isChecked = form.requestType === option.value

                return (
                  <label
                    key={option.value}
                    className={cn(
                      'group flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors duration-300',
                      isChecked
                        ? 'border-accent bg-page-soft)'
                        : 'border-border-soft hover:border-accent/50 bg-white',
                      errors.requestType && !form.requestType && 'border-red-500'
                    )}
                  >
                    <input
                      type="radio"
                      name="requestType"
                      value={option.value}
                      checked={isChecked}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />

                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300',
                        isChecked
                          ? 'border-accent'
                          : 'border-border-soft group-hover:border-accent/60'
                      )}
                    >
                      <span
                        className={cn(
                          'bg-accent size-2.5 rounded-full transition-transform duration-300',
                          isChecked ? 'scale-100' : 'scale-0'
                        )}
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="text-text-main block text-sm font-semibold sm:text-base">
                        {option.label}
                      </span>

                      <span className="text-text-soft mt-1 block text-xs leading-[1.4] sm:text-sm">
                        {option.description}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>

            <p
              id="more-info-request-type-error"
              role={errors.requestType ? 'alert' : undefined}
              data-error={errors.requestType ?? ''}
              className={cn(
                'mt-1 min-h-5 text-[12px] leading-5 text-red-600',
                'before:block before:content-[attr(data-error)]',
                errors.requestType ? 'before:opacity-100' : 'before:opacity-0'
              )}
            />
          </fieldset>

          {/* Правая часть */}
          <div className="max-w-150 min-w-0">
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
                    <use href={`${iconsSprite}#user`} />
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
                  Ваш номер телефону
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

            <div className="mt-7">
              <SmartButton
                type="submit"
                label="Надіслати заявку"
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

              <div className="mt-4 min-h-[68px]">
                {submitStatus === 'error' && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    Не вдалося відправити заявку. Спробуйте ще раз або напишіть нам у Telegram.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {submitStatus === 'success' && (
        <Modal onClose={handleCloseSuccessPopup} labelledBy="success-popup-title">
          <SuccessPopup
            requestNumber={requestNumber}
            requestTypeLabel={submittedRequestTypeLabel}
            onClose={handleCloseSuccessPopup}
          />
        </Modal>
      )}
    </>
  )
}

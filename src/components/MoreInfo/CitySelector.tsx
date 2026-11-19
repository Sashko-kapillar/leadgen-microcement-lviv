import type { ChangeEvent } from 'react'
import type { City } from './more-info.schema'
import { cn } from '@/lib/cn'

type CitySelectorProps = {
  value: City | ''
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const cityOptions: Array<{ value: City; label: string }> = [
  { value: 'lviv', label: 'Львів' },
  { value: 'kyiv', label: 'Київ' },
]

export default function CitySelector({ value, error, onChange }: CitySelectorProps) {
  return (
    <fieldset
      className="mb-auto min-w-0"
      aria-describedby={error ? 'more-info-city-error' : undefined}
    >
      <legend className="text-text-main mb-3 text-base font-semibold">
        Ваше місто{' '}
        <span aria-hidden="true" className="text-red-600">
          *
        </span>
      </legend>

      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {cityOptions.map(option => (
          <label key={option.value} className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="city"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="accent-accent size-5 cursor-pointer"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'more-info-city-error' : undefined}
              required
            />

            <span className="text-text-main text-sm font-medium sm:text-base">{option.label}</span>
          </label>
        ))}
      </div>

      <p
        id="more-info-city-error"
        role={error ? 'alert' : undefined}
        data-error={error ?? ''}
        className={cn(
          'mt-1 min-h-5 text-[12px] leading-5 text-red-600',
          'before:block before:content-[attr(data-error)]',
          error ? 'before:opacity-100' : 'before:opacity-0'
        )}
      />
    </fieldset>
  )
}

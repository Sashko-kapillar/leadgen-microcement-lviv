import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SmartButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'hero-material'
  | 'hero-master'
  | 'hero-self'

export type SmartButtonSize = 'sm' | 'md' | 'lg' | 'hero-card'

export type SmartButtonProps = {
  label: string
  description?: ReactNode
  loadingLabel?: string

  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: '_self' | '_blank'
  rel?: string

  variant?: SmartButtonVariant
  size?: SmartButtonSize

  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  trailingIcon?: ReactNode

  className?: string
  disabled?: boolean
  loading?: boolean

  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export default function SmartButton({
  label,
  description,
  loadingLabel = 'Loading...',

  type = 'button',
  href,
  target = '_self',
  rel,

  variant = 'primary',
  size = 'md',

  icon,
  iconPosition = 'left',
  trailingIcon,

  className,
  disabled = false,
  loading = false,

  onClick,
}: SmartButtonProps) {
  const blocked = disabled || loading
  const hasIcon = Boolean(icon)

  const variantClasses: Record<SmartButtonVariant, string> = {
    primary: 'bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:outline-neutral-950',

    secondary: 'bg-stone-100 text-neutral-950 hover:bg-stone-200 focus-visible:outline-stone-400',

    outline:
      'border border-neutral-300 bg-transparent text-neutral-950 hover:bg-stone-100 focus-visible:outline-neutral-400',

    ghost:
      'bg-transparent text-neutral-700 hover:bg-stone-100 hover:text-neutral-950 focus-visible:outline-neutral-300',

    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',

    'hero-material':
      'border border-button-hero-material-border bg-button-hero-material text-button-hero-material-text shadow-[0_14px_32px_rgba(67,50,34,0.16)] hover:bg-button-hero-material-hover focus-visible:outline-button-hero-material-border',

    'hero-master':
      'border border-button-hero-master-border bg-button-hero-master text-button-hero-material-text shadow-[0_16px_36px_rgba(25,22,19,0.24)] hover:bg-button-hero-master-hover focus-visible:outline-button-hero-master-border',

    'hero-self':
      'border border-button-hero-self-border bg-button-hero-self text-button-hero-self-text shadow-[0_14px_32px_rgba(57,59,43,0.16)] hover:bg-button-hero-self-hover focus-visible:outline-button-hero-self-border',
  }

  const sizeClasses: Record<SmartButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-4 text-base md:text-lg',

    'hero-card': 'min-h-20 lg:min-h-30 w-full items-center justify-start gap-2 lg:gap-4 rounded-2xl p-5 md:p-3 lg:p-5 text-left',
  }

  const finalClassName = cn(
    'group inline-flex w-fit items-center justify-center rounded-lg font-semibold leading-none tracking-[-0.02em]',
    'transition-[transform,background-color,box-shadow] duration-300',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
    variantClasses[variant],
    sizeClasses[size],
    {
      'gap-2': hasIcon && !loading && size !== 'hero-card',
      'cursor-not-allowed pointer-events-none opacity-50': blocked,
      'hover:-translate-y-1': size === 'hero-card' && !blocked,
    },
    className
  )

  const content = loading ? (
    <span>{loadingLabel}</span>
  ) : (
    <>
      {hasIcon && iconPosition === 'left' && (
        <span
          className={cn('inline-flex shrink-0 items-center', {
            'flex size-14 justify-center rounded-xl bg-transparent': size === 'hero-card',
          })}
        >
          {icon}
        </span>
      )}

      <span
        className={cn({
          'min-w-0 flex-1': size === 'hero-card',
          'shrink-0': size !== 'hero-card',
        })}
      >
        <span
          className={cn('block', {
            'text-xl leading-tight font-semibold': size === 'hero-card',
          })}
        >
          {label}
        </span>

        {description && (
          <span className={cn('lg:mt-2 block text-lg leading-snug font-normal text-current/70')}>
            {description}
          </span>
        )}
      </span>

      {hasIcon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0 items-center">{icon}</span>
      )}

      {trailingIcon && (
        <span className="inline-flex shrink-0 items-center text-xl transition-transform duration-300 group-hover:translate-x-1">
          {trailingIcon}
        </span>
      )}
    </>
  )

  function handleClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (blocked) {
      event.preventDefault()
      return
    }

    onClick?.(event)
  }

  if (href) {
    const safeRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel

    return (
      <a
        href={blocked ? undefined : href}
        target={target}
        rel={safeRel}
        className={finalClassName}
        onClick={handleClick}
        aria-disabled={blocked}
        aria-busy={loading}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={finalClassName}
      onClick={handleClick}
      disabled={blocked}
      aria-busy={loading}
    >
      {content}
    </button>
  )
}

import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SmartButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

export type SmartButtonSize = 'sm' | 'md' | 'lg'

export type SmartButtonProps = {
  label: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: '_self' | '_blank'
  rel?: string

  variant?: SmartButtonVariant
  size?: SmartButtonSize

  icon?: ReactNode
  iconPosition?: 'left' | 'right'

  className?: string
  disabled?: boolean
  loading?: boolean

  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export default function SmartButton({
  label,
  type = 'button',
  href,
  target = '_self',
  rel,

  variant = 'primary',
  size = 'md',

  icon,
  iconPosition = 'left',

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
      'bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-stone-100 focus-visible:outline-neutral-300',

    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',
  }

  const sizeClasses: Record<SmartButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-4 text-base md:text-lg',
  }

  const finalClassName = cn(
    'inline-flex w-fit items-center justify-center rounded-full font-semibold leading-none tracking-[-0.02em]',
    'transition-colors duration-300',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    {
      'gap-2': hasIcon,
      'opacity-50 cursor-not-allowed pointer-events-none': blocked,
    },
    className
  )

  const content = (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {hasIcon && iconPosition === 'left' && (
            <span className="inline-flex shrink-0 items-center">{icon}</span>
          )}

          <span className="shrink-0">{label}</span>

          {hasIcon && iconPosition === 'right' && (
            <span className="inline-flex shrink-0 items-center">{icon}</span>
          )}
        </>
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

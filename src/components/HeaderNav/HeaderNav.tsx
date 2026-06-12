import { cn } from '@/lib/cn'

type HeaderNavProps = {
  className?: string
}

const navItems = [
  {
    label: 'Приклади робіт',
    href: '#applications',
  },
  {
    label: 'Замовити',
    href: '#more-info',
  },
  {
    label: 'Як це працює',
    href: '#how-it-works',
  },
]

export default function HeaderNav({ className }: HeaderNavProps) {
  return (
    <nav
      className={cn('hidden items-center justify-end gap-8 lg:flex', className)}
      aria-label="Основна навігація"
    >
      {navItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className="text-nav text-text-main hover:text-accent w-fit py-2 transition-colors duration-300"
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

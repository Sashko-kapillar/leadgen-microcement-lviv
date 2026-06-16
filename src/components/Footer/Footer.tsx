import iconsSprite from '../../assets/images/svg/icons.svg'

import {
  footerBrand,
  footerContacts,
  footerCta,
  footerNavigation,
  footerServices,
} from './data/footer.data'

interface FooterProps {
  onPolicyClick?: () => void
}

const Footer = ({ onPolicyClick }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const copyrightYears = `2024–${currentYear}`

  return (
    <footer id="contacts" className="bg-cta text-text-inverse">
      <div className="section-container py-10 sm:py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1fr] lg:gap-12">
          <div>
            <a
              href="/"
              className="text-logo text-accent-soft hover:text-accent-muted inline-block max-w-64 text-balance transition-colors duration-300"
              aria-label="Мікроцемент Львів — перейти на початок сторінки"
            >
              {footerBrand.title}
            </a>

            <p className="text-body text-text-inverse/70 mt-5 max-w-80">{footerBrand.text}</p>

            <a
              href={footerCta.href}
              className="text-button bg-accent-soft text-cta hover:bg-accent-muted focus-visible:outline-accent-soft mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-6 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {footerCta.label}
            </a>
          </div>

          <nav aria-label="Навігація у футері">
            <h3 className="text-card-title text-accent-soft mb-4">Навігація</h3>

            <ul className="space-y-3">
              {footerNavigation.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-body text-text-inverse/70 hover:text-accent-soft inline-flex transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-card-title text-accent-soft mb-4">Послуги</h3>

            <ul className="space-y-3">
              {footerServices.map(service => (
                <li key={service} className="text-body text-text-inverse/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic">
            <h3 className="text-card-title text-accent-soft mb-4">Контакти</h3>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg aria-hidden="true" className="size-5">
                  <use href={`${iconsSprite}#phone`} />
                </svg>

                <a
                  href={footerContacts.phone.href}
                  className="text-body-medium text-text-inverse hover:text-accent-soft transition-colors duration-300"
                >
                  {footerContacts.phone.label}
                </a>
              </li>

              <li className="flex gap-3">
                <svg aria-hidden="true" className="size-5">
                  <use href={`${iconsSprite}#location`} />
                </svg>

                <span className="text-body text-text-inverse/70">{footerContacts.location}</span>
              </li>

              <li className="flex gap-3">
                <svg aria-hidden="true" className="size-5">
                  <use href={`${iconsSprite}#working-hours`} />
                </svg>

                <span className="text-body text-text-inverse/70">
                  {footerContacts.schedule.map(item => (
                    <span key={item} className="block">
                      {item}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </address>
        </div>

        <div className="border-border-soft/15 mt-10 border-t pt-6 sm:mt-12 lg:mt-14">
          <div className="text-caption text-text-inverse/50 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <span>© {copyrightYears} Мікроцемент Львів. Усі права захищені.</span>

            {onPolicyClick && (
              <button
                type="button"
                onClick={onPolicyClick}
                className="text-accent-soft hover:text-accent-muted focus-visible:outline-accent-soft w-fit text-left underline-offset-4 transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Політика конфіденційності
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

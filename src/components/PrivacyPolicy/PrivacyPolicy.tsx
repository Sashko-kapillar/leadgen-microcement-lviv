import SmartButton from '../ui/Button/SmartButton'
import { privacyPolicySections } from './data/privacy-policy.data'

type PrivacyPolicyProps = {
  onBackHome?: () => void
}

const PrivacyPolicy = ({ onBackHome }: PrivacyPolicyProps) => {
  return (
    <section className="bg-page-soft text-text-main min-h-screen">
      <div className="section-container py-8 sm:py-12 lg:py-16">
        <article className="border-border-soft bg-bg-card mx-auto max-w-4xl rounded-3xl border px-5 py-8 shadow-sm sm:px-8 lg:px-12 lg:py-12">
          <header className="border-border-soft mb-8 border-b pb-6">
            <p className="text-caption text-accent mb-3">Останнє оновлення: 2026</p>

            <h1 className="font-second text-[clamp(26px,4vw,42px)] leading-tight font-semibold tracking-tight">
              Політика конфіденційності
            </h1>

            <p className="text-section-lead mt-4">
              Ця Політика пояснює, які персональні дані ми можемо отримувати через сайт, з якою
              метою їх обробляємо та які права має користувач.
            </p>

            {onBackHome && (
              <div className="mt-6">
                <SmartButton label="На головну" variant="outline" size="md" onClick={onBackHome} />
              </div>
            )}
          </header>

          <div className="space-y-8">
            {privacyPolicySections.map(section => (
              <section key={section.title} className="space-y-4">
                <h2 className="font-second text-text-main text-xl leading-snug font-semibold">
                  {section.title}
                </h2>

                {section.paragraphs?.map(paragraph => (
                  <p key={paragraph} className="text-body text-text-soft">
                    {paragraph}
                  </p>
                ))}

                {section.items && (
                  <ul className="text-body text-text-soft list-disc space-y-2 pl-5">
                    {section.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {onBackHome && (
            <footer className="border-border-soft mt-10 border-t pt-6">
              <SmartButton
                label="Повернутися на головну"
                variant="primary"
                size="md"
                onClick={onBackHome}
              />
            </footer>
          )}
        </article>
      </div>
    </section>
  )
}

export default PrivacyPolicy

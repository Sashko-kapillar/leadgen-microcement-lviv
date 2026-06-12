import MoreInfoForm from './MoreInfoForm'
import { moreInfoBenefits } from './data/more-info.data'

export default function MoreInfo() {
  return (
    <section
      id="more-info"
      className="bg-page-soft relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div className="section-container relative z-10">
        {/* Місце під фонову картинку */}
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/images/more-info-bg.webp')] bg-cover bg-center opacity-100"
          aria-hidden="true"
        />

        {/* Світлий шар поверх фону для читабельності */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,244,0.94),rgba(250,248,244,0.78))]"
          aria-hidden="true"
        />
        <div className="relative z-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.92fr)] lg:gap-14 xl:gap-20">
          <div className="flex flex-col justify-center">
            <header className="section-header">
              <h2 className="section-title">Отримайте консультацію та купон на знижку</h2>

              <p className="section-subtitle max-w-100">
                Залиште заявку, і ми підкажемо рішення та надішлемо купон.
              </p>
            </header>

            <div className="hidden space-y-8 md:block lg:space-y-10">
              {moreInfoBenefits.map(item => (
                <article
                  key={item.title}
                  className="border-border-soft grid grid-cols-[4.5rem_minmax(0,1fr)] gap-5 border-b pb-8 last:border-b-0 lg:pb-10"
                >
                  <div className="text-accent flex size-16 items-center justify-center rounded-full bg-white/70 shadow-[0_12px_40px_rgba(22,22,22,0.06)]">
                    <svg className="size-7" aria-hidden="true">
                      <use href={`/svg/icons.svg${item.icon}`} />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-text-main text-lg font-semibold">{item.title}</h3>

                    <p className="text-text-soft mt-2 text-base leading-[1.45]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-text-soft mt-8 hidden max-w-xl items-start gap-4 rounded-xl bg-white/50 p-4 shadow-[0_12px_50px_rgba(22,22,22,0.04)] md:flex">
              <div className="border-border-medium text-text-muted flex size-9 shrink-0 items-center justify-center rounded-full border">
                <svg className="size-5" aria-hidden="true">
                  <use href="/svg/icons.svg#icon-info" />
                </svg>
              </div>

              <p className="text-sm leading-[1.45] md:text-base">
                Точна ціна залежить від стану поверхні та обсягу підготовчих робіт.
              </p>
            </div>
          </div>

          <MoreInfoForm />
        </div>
      </div>
    </section>
  )
}

import MoreInfoForm from './MoreInfoForm'
// import { moreInfoBenefits } from './data/more-info.data'

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
        <div className="relative z-20">
          <div className="flex flex-col justify-center">
            <header className="section-header">
              <h2 className="section-title">Отримайте знижку на матеріал</h2>

              <p className="section-subtitle max-w-100 sm:max-w-fit">
                Залиште контакт — надішлемо персональний купон на матеріал.
              </p>
            </header>
          </div>

          <MoreInfoForm />
        </div>
      </div>
    </section>
  )
}

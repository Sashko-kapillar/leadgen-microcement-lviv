import MoreInfoForm from './MoreInfoForm'
import bgInfo from '../../assets/images/moreInfo/bg-form.webp'
// import { moreInfoBenefits } from './data/more-info.data'

export default function MoreInfo() {
  return (
    <section
      id="more-info"
      className="bg-page-soft relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url(${bgInfo})` }}
        aria-hidden="true"
      />

      {/* Світлий шар поверх фону для читабельності */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,244,0.5),rgba(250,248,244,0.6))]"
        aria-hidden="true"
      />
      <div className="section-container relative z-10">
        {/* Місце під фонову картинку */}

        <div className="relative z-20">
          <div className="flex flex-col justify-center">
            <header className="section-header">
              <h2 className="section-title">Отримайте знижку на матеріал</h2>

              <p className="section-subtitle">
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

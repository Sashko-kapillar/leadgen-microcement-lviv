import { mobileHeroData, type MobileHeroActionId } from './data/mobile-hero.data'

const MORE_INFO_SECTION_ID = 'more-info'

function MobileHero() {
  const scrollToMoreInfo = (requestType?: MobileHeroActionId) => {
    const moreInfoSection = document.getElementById(MORE_INFO_SECTION_ID)

    if (!moreInfoSection) {
      return
    }

    moreInfoSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    if (!requestType) {
      return
    }

    window.dispatchEvent(
      new CustomEvent<{
        requestType: MobileHeroActionId
      }>('select-request-type', {
        detail: {
          requestType,
        },
      })
    )
  }

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-[#3e3933] text-[#f5f1e9]"
      aria-labelledby="mobile-hero-title"
    >
      <img
        src={mobileHeroData.image}
        alt=""
        className="absolute inset-0 -z-30 size-full object-cover object-[12%_center]"
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(24,21,18,0.03)_0%,rgba(24,21,18,0.06)_38%,rgba(24,21,18,0.44)_66%,rgba(24,21,18,0.92)_100%)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[48%] bg-[linear-gradient(to_bottom,transparent,rgba(25,22,19,0.72))]"
        aria-hidden="true"
      />

      <div className="section-container flex min-h-svh flex-col pt-20 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/*
          Основная надпись «МІКРОЦЕМЕНТ» является частью изображения.
          Пустая зона сохраняет её композицию и не перекрывает HTML-контентом.
        */}
        <div className="min-h-[47svh] flex-1" aria-hidden="true" />

        <div className="relative z-10">
          <h1
            id="mobile-hero-title"
            className="font-nunito max-w-84 text-[clamp(1.75rem,7.5vw,2.25rem)] leading-[1.16] font-medium tracking-[-0.04em] text-[#f5f1e9]"
          >
            {mobileHeroData.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-5 text-[#d8b77a]">
            <span>{mobileHeroData.location}</span>

            <span aria-hidden="true">•</span>

            <span>{mobileHeroData.service}</span>
          </div>

          <button
            type="button"
            onClick={() => scrollToMoreInfo()}
            className="mt-6 flex min-h-16 w-full items-center justify-between rounded-[1.25rem] border border-[#f0d8a9]/70 bg-[#dfb96f] px-6 text-left text-lg font-semibold text-[#29251f] shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-[background-color,transform] duration-200 hover:bg-[#e7c580] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1e9] active:translate-y-px"
          >
            <span>{mobileHeroData.primaryAction.label}</span>

            <span className="text-2xl leading-none font-light" aria-hidden="true">
              →
            </span>
          </button>

          <div id="mobile-hero-actions" className="mt-7 border-t border-white/20 pt-5">
            <p className="text-sm text-white/65">{mobileHeroData.actionsTitle}</p>

            <div className="mt-3 grid grid-cols-3">
              {mobileHeroData.actions.map((action, index) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => scrollToMoreInfo(action.id)}
                  className={[
                    'group min-w-0 py-2 text-left',
                    index === 0 ? 'pr-3' : 'px-3',
                    index === mobileHeroData.actions.length - 1 ? 'pr-0' : '',
                    index > 0 ? 'border-l border-white/20' : '',
                    'focus-visible:outline-2',
                    'focus-visible:outline-offset-2',
                    'focus-visible:outline-[#f5f1e9]',
                  ].join(' ')}
                  aria-label={`${action.label}. Перейти до форми`}
                >
                  <span className="block text-[0.8125rem] leading-[1.3] font-medium text-[#f5f1e9]">
                    {action.label}
                  </span>

                  <span
                    className="mt-2 block text-lg leading-none text-[#d8b77a] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileHero

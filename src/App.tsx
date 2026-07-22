import './App.css'
import { useState } from 'react'

import SEO from './components/SEO/SEO'
import Header from './components/Header/Header'
import HeroWords from './components/HeroWords/HeroWords'
import MobileHeader from './components/MobileHeader/MobileHeader'
import MobileHero from './components/MobileHero/MobileHero'
import MoreInfo from './components/MoreInfo/MoreInfo'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import Footer from './components/Footer/Footer'
import Benefits from './components/Benefits/Benefits'
import Applications from './components/Applications/Applications'
import HowItWorks from './components/HowItWorks/HowItWorks'

function App() {
  const [showPolicy, setShowPolicy] = useState(false)

  const openPolicy = () => {
    setShowPolicy(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const closePolicy = () => {
    setShowPolicy(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <SEO
        title="Мікроцемент Львів — декоративне покриття для ванних, підлоги та стін"
        description="Мікроцемент у Львові для ванних кімнат, підлоги, стін, кухонь і комерційних просторів. Допоможемо підібрати матеріал, знайти майстра або розібратися із самостійним нанесенням."
        path="/"
      />

      <div className="bg-page min-h-screen w-full">
        {showPolicy ? (
          <>
            <Header isPrivacy onShowHome={closePolicy} />

            <PrivacyPolicy />
          </>
        ) : (
          <>
            <div className="relative md:hidden">
              <MobileHeader onShowHome={closePolicy} />
              <MobileHero />
            </div>

            <div className="hidden md:block">
              <Header isPrivacy={false} onShowHome={closePolicy} />

              <HeroWords />
            </div>

            <main>
              <Benefits />
              <Applications />
              <HowItWorks />
              <MoreInfo />
            </main>
          </>
        )}

        <Footer onPolicyClick={openPolicy} />
      </div>
    </>
  )
}

export default App

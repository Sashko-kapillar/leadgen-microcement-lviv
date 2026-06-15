import './App.css'
import { useState } from 'react'

import SEO from './components/SEO/SEO'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import MoreInfo from './components/MoreInfo/MoreInfo'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import Footer from './components/Footer/Footer'
import Benefits from './components/Benefits/Benefits'
import Applications from './components/Applications/Applications'
import HowItWorks from './components/HowItWorks/HowItWorks'

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import ToastProvider from './components/Toast/ToastProvider';

function App() {
  const [showPolicy, setShowPolicy] = useState(false)

  const openPolicy = () => {
    setShowPolicy(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closePolicy = () => {
    setShowPolicy(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SEO
        title="Мікроцемент Львів — декоративне покриття для ванних, підлоги та стін"
        description="Мікроцемент у Львові для ванних кімнат, підлоги, стін, кухонь і комерційних просторів. Підбір фактур у салоні, матеріали для сучасних інтер’єрів та купон на знижку."
        path="/"
      />

      <div className="bg-page min-h-screen w-full">
        <Header isPrivacy={showPolicy} onShowHome={closePolicy} />

        {showPolicy ? (
          <PrivacyPolicy />
        ) : (
          <main>
            <Hero />
            <Benefits />
            <Applications />
            <HowItWorks />
            <MoreInfo />
          </main>
        )}

        <Footer onPolicyClick={openPolicy} />

        {/* <ToastProvider /> */}
      </div>
    </>
  )
}

export default App

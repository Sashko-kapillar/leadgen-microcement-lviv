import './App.css'
import { useState } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
// import Modules from './components/Modules/Modules'
import MoreInfo from './components/Form/MoreInfo'
// import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
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
      <div className="bg-page min-h-screen w-full">
        <Header isPrivacy={showPolicy} onShowHome={closePolicy} />
        {/* {showPolicy ? (
          <PrivacyPolicy />
        ) : ( */}
        <main>
          <Hero />
          <Benefits />
          <Applications />
          <HowItWorks />
          <MoreInfo />
        </main>
        {/* )} */}
        <Footer onPolicyClick={openPolicy} />
        {/* <ToastProvider /> */}
      </div>
    </>
  )
}

export default App

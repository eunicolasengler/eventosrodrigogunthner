import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Segments from './components/Segments'
import Differentials from './components/Differentials'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import SEO from './components/SEO'
import { useReveal } from './lib/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <SEO />
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Segments />
        <Differentials />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

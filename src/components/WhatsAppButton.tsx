import { useEffect, useState } from 'react'
import WhatsAppLink from './WhatsAppLink'
import { WhatsAppIcon } from './Icons'

/** Desktop: botão flutuante discreto. Celular: barra inferior com CTA. Ambos aparecem após a primeira dobra. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}>
        <WhatsAppLink place="barra_mobile" className="btn btn-gold w-full">Solicitar orçamento pelo WhatsApp</WhatsAppLink>
      </div>
      <div className={`fixed bottom-6 right-6 z-30 hidden transition-all duration-300 lg:block ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <WhatsAppLink place="flutuante" icon={false} className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-8px_rgba(201,164,92,.6)] transition-transform hover:scale-105">
          <WhatsAppIcon className="h-7 w-7" />
          <span className="sr-only">Falar no WhatsApp</span>
        </WhatsAppLink>
      </div>
    </>
  )
}

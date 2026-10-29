import { useEffect, useState } from 'react'
import { nav, site } from '../config/site'
import { Monogram, MenuIcon, CloseIcon } from './Icons'
import WhatsAppLink from './WhatsAppLink'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid || open ? 'bg-ink/90 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${site.name} - início`}>
          <Monogram className="h-9 w-9 text-gold md:h-10 md:w-10" />
          <span className="font-display whitespace-nowrap text-xl font-semibold tracking-wide">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-bone/80 transition-colors hover:text-gold-soft">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppLink place="header" icon={false} className="btn btn-gold !min-h-[42px] !px-5 !py-2 text-sm max-sm:hidden">
            Solicitar orçamento
          </WhatsAppLink>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-line bg-ink px-5 pb-6 pt-2 lg:hidden" aria-label="Menu mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-2xl">
              {n.label}
            </a>
          ))}
          <WhatsAppLink place="menu_mobile" className="btn btn-gold mt-6 w-full">
            Solicitar orçamento
          </WhatsAppLink>
        </nav>
      )}
    </header>
  )
}

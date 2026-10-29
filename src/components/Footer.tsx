import { nav, site } from '../config/site'
import { displayPhone, whatsappLink } from '../lib/whatsapp'
import { withUtm } from '../lib/utm'
import { Monogram, InstagramIcon, WhatsAppIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-28 pt-16 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Monogram className="h-11 w-11 text-gold" />
            <span className="font-display text-2xl">{site.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-mute">{site.tagline}.</p>
          <p className="mt-2 text-sm text-mute">{site.serviceArea}.</p>
        </div>

        <nav aria-label="Rodapé">
          <p className="eyebrow mb-4">Navegação</p>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="text-bone/80 hover:text-gold-soft">{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contato</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/80 hover:text-gold-soft">
                <WhatsAppIcon className="h-5 w-5" /> {displayPhone()}
              </a>
            </li>
            <li>
              <a href={withUtm(site.social.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/80 hover:text-gold-soft">
                <InstagramIcon className="h-5 w-5" /> {site.social.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-7xl px-5 text-xs text-mute md:px-8">
        © {new Date().getFullYear()} {site.name}. {site.legal}
      </p>
    </footer>
  )
}

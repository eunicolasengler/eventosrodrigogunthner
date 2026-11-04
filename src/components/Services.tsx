import { services } from '../config/site'
import WhatsAppLink from './WhatsAppLink'
import { ArrowIcon } from './Icons'

export default function Services() {
  return (
    <section id="solucoes" className="bg-ink py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow mb-4">Soluções</p>
          <h2 className="h-display text-4xl md:text-6xl">Toda a estrutura para o seu evento.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-6">
          {services.map((s, i) => (
            <article
              key={s.id}
              className={`reveal zoom group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-line md:min-h-[420px] ${
                i < 3 ? 'md:col-span-2' : 'md:col-span-3'
              }`}
            >
              <img src={s.image} alt="" loading="lazy" width={640} height={800} className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />
              <div className="p-6 md:p-7">
                <h3 className="font-display text-3xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/75">{s.text}</p>
                <WhatsAppLink
                  context={s.context}
                  place={`servico_${s.id}`}
                  icon={false}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft hover:text-gold"
                >
                  Pedir orçamento <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

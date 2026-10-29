import { segments } from '../config/site'
import WhatsAppLink from './WhatsAppLink'

export default function Segments() {
  return (
    <section className="bg-ink py-20 md:py-32" aria-labelledby="segmentos-titulo">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Segmentos</p>
          <h2 id="segmentos-titulo" className="h-display text-4xl md:text-6xl">Soluções para diferentes experiências.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {segments.map((s) => (
            <article key={s.id} className="reveal flex flex-col overflow-hidden rounded-2xl border border-line bg-graphite">
              <div className="zoom aspect-[4/3] overflow-hidden">
                <img src={s.image} alt="" loading="lazy" width={1080} height={810} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="font-display text-3xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/75">{s.text}</p>
                <WhatsAppLink context={s.context} place={`segmento_${s.id}`} className="btn btn-ghost mt-7 w-full">
                  Solicitar orçamento
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

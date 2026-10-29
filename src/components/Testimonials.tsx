import { testimonials } from '../config/site'

/** Só aparece quando houver depoimentos reais e autorizados em config/site.ts. */
export default function Testimonials() {
  if (!testimonials.length) return null
  return (
    <section className="bg-ink py-20 md:py-32" aria-labelledby="prova-titulo">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="prova-titulo" className="h-display reveal mb-12 max-w-2xl text-4xl md:text-6xl">Quem confia no nosso trabalho, recomenda.</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="reveal rounded-2xl border border-line bg-graphite p-7">
              <blockquote className="font-display text-2xl leading-snug">“{t.text}”</blockquote>
              <figcaption className="mt-5 text-sm text-mute">
                <span className="font-semibold text-bone">{t.name}</span>
                {t.role && <> · {t.role}</>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

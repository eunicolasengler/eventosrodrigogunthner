import { process } from '../config/site'

export default function Process() {
  return (
    <section className="bg-ink py-20 md:py-32" aria-labelledby="processo-titulo">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Como funciona</p>
          <h2 id="processo-titulo" className="h-display text-4xl md:text-6xl">Do planejamento à execução.</h2>
        </div>

        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {process.map((p, i) => (
            <li key={p.title} className="reveal relative border-t border-gold/50 pt-6">
              <span className="font-display text-5xl text-gold">{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-12 max-w-2xl text-sm text-mute">
          Cada proposta é elaborada de acordo com as características e as necessidades do seu evento.
        </p>
      </div>
    </section>
  )
}

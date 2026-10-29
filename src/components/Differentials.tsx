import { differentials, site } from '../config/site'

export default function Differentials() {
  const list = differentials.filter((d) => d.confirmed)
  if (!list.length) return null
  return (
    <section id="sobre" className="bg-graphite py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow mb-4">Sobre</p>
            <h2 className="h-display text-4xl md:text-6xl">Por trás de um grande evento, existe uma execução impecável.</h2>
          </div>
          <p className="max-w-lg text-bone/75 lg:justify-self-end">
            {site.name} atua com sonorização, iluminação e produção audiovisual para eventos, cuidando da parte técnica para que você aproveite o que importa.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <li key={d.title} className="reveal bg-graphite p-7 md:p-9">
              <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

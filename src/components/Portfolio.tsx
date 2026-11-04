import { useMemo, useState } from 'react'
import { categories, portfolio, type EventCategory } from '../config/site'
import Lightbox from './Lightbox'
import { PlayIcon } from './Icons'

type Filter = 'todos' | EventCategory

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [open, setOpen] = useState<number | null>(null)

  const items = useMemo(() => (filter === 'todos' ? portfolio : portfolio.filter((p) => p.category === filter)), [filter])
  const tabs: { id: Filter; label: string }[] = [{ id: 'todos', label: 'Todos' }, ...categories.filter((c) => portfolio.some((p) => p.category === c.id))]

  return (
    <section id="projetos" className="bg-graphite py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-10 max-w-3xl">
          <p className="eyebrow mb-4">Portfólio</p>
          <h2 className="h-display text-4xl md:text-6xl">Projetos que impressionam antes mesmo do primeiro acorde.</h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos por tipo de evento">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              aria-pressed={filter === t.id}
              className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition-colors ${
                filter === t.id ? 'border-gold bg-gold text-ink' : 'border-line text-bone/80 hover:border-gold/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5" aria-live="polite">
          {items.map((p, i) => (
            <li key={p.id}>
              <button onClick={() => setOpen(i)} className="zoom group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-line text-left" aria-label={`Ampliar: ${p.title}`}>
                <img src={p.thumb} alt={p.title} loading="lazy" width={640} height={800} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                {p.type === 'video' && (
                  <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-gold-soft backdrop-blur">
                    <PlayIcon className="h-4 w-4" />
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-snug md:p-5 md:text-base">{p.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </section>
  )
}

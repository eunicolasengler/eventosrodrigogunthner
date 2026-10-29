import { useEffect, useRef } from 'react'
import type { PortfolioItem } from '../config/site'
import { CloseIcon, ArrowIcon } from './Icons'

type Props = { items: PortfolioItem[]; index: number; onClose: () => void; onChange: (i: number) => void }

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const item = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const last = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      last?.focus()
    }
  }, [])

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button ref={closeRef} onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-ink/70">
        <CloseIcon className="h-5 w-5" />
      </button>
      {items.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Anterior" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Próximo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70">
            <ArrowIcon className="h-5 w-5" />
          </button>
        </>
      )}
      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video key={item.id} src={item.src} poster={item.thumb} controls autoPlay playsInline className="max-h-[80svh] max-w-[88vw] rounded-lg" />
        ) : (
          <img key={item.id} src={item.src} alt={item.title} width={item.width} height={item.height} className="max-h-[80svh] max-w-[88vw] rounded-lg object-contain" />
        )}
        <figcaption className="mt-4 text-center">
          <p className="font-display text-2xl">{item.title}</p>
          {item.credit && <p className="mt-1 text-xs text-mute">{item.credit}</p>}
        </figcaption>
      </figure>
    </div>
  )
}

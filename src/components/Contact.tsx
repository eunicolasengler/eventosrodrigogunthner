import { useState, type FormEvent } from 'react'
import { eventTypes, media, site } from '../config/site'
import { buildWhatsAppMessage, displayPhone, openWhatsApp } from '../lib/whatsapp'
import { trackLead } from '../lib/tracking'
import { getUtm } from '../lib/utm'
import WhatsAppLink from './WhatsAppLink'

type Values = { nome: string; tipo: string; data: string; cidade: string; telefone: string; descricao: string; website: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'whatsapp' | 'sent' | 'error'

const empty: Values = { nome: '', tipo: '', data: '', cidade: '', telefone: '', descricao: '', website: '' }

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (!v.tipo) e.tipo = 'Selecione o tipo de evento.'
  if (v.cidade.trim().length < 2) e.cidade = 'Informe a cidade do evento.'
  const digits = v.telefone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) e.telefone = 'Informe um WhatsApp válido com DDD.'
  if (v.data) {
    const today = new Date().toISOString().slice(0, 10)
    if (v.data < today) e.data = 'A data não pode estar no passado.'
  }
  if (v.descricao.length > 600) e.descricao = 'Use até 600 caracteres.'
  return e
}

function fmtDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function Contact() {
  const [v, setV] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const value = k === 'telefone' ? maskPhone(e.target.value) : e.target.value
    setV((o) => ({ ...o, [k]: value }))
    if (errors[k]) setErrors((o) => ({ ...o, [k]: undefined }))
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (v.website) return // honeypot
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }

    const lines = [
      buildWhatsAppMessage(),
      '',
      `Nome: ${v.nome.trim()}`,
      `Tipo de evento: ${v.tipo}`,
      v.data ? `Data prevista: ${fmtDate(v.data)}` : '',
      `Cidade: ${v.cidade.trim()}`,
      `WhatsApp: ${v.telefone}`,
      v.descricao.trim() ? `Detalhes: ${v.descricao.trim()}` : '',
    ].filter((l, i) => l !== '' || i === 1)
    const message = lines.join('\n')

    if (!site.formEndpoint) {
      // Destino funcional sem backend: encaminha os dados pelo WhatsApp do Rodrigo.
      openWhatsApp(message, 'formulario')
      setStatus('whatsapp')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...v, website: undefined, utm: getUtm(), origem: window.location.href }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackLead('form_submit', { place: 'formulario' })
      setStatus('sent')
      setV(empty)
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm text-[#f0a094]" role="alert">{errors[k]}</p>
    ) : null
  const a11y = (k: keyof Values) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined })

  return (
    <section id="contato" className="relative isolate overflow-hidden bg-ink py-20 md:py-32">
      <img src={media.ctaBg} alt="" loading="lazy" width={1080} height={1464} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="reveal">
          <p className="eyebrow mb-4">Contato</p>
          <h2 className="h-display text-4xl md:text-6xl">Vamos construir a estrutura do seu próximo evento?</h2>
          <p className="mt-6 max-w-md text-lg text-bone/80">Conte para nós o que você está planejando e receba um atendimento personalizado.</p>
          <WhatsAppLink place="cta_final" className="btn btn-gold mt-8 w-full sm:w-auto">Conversar pelo WhatsApp</WhatsAppLink>
          <p className="mt-5 text-sm text-mute">
            {displayPhone()} · {site.serviceArea}
          </p>
        </div>

        <form onSubmit={submit} noValidate className="reveal rounded-2xl border border-line bg-graphite/85 p-6 backdrop-blur md:p-9" aria-label="Solicitar orçamento">
          <h3 className="font-display text-3xl">Ou preencha os dados do evento</h3>
          <p className="mb-6 mt-1 text-sm text-mute">Leva menos de um minuto.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="f-nome" className="mb-1.5 block text-sm">Nome</label>
              <input id="f-nome" className="field" autoComplete="name" value={v.nome} onChange={set('nome')} {...a11y('nome')} />
              {err('nome')}
            </div>
            <div>
              <label htmlFor="f-tipo" className="mb-1.5 block text-sm">Tipo de evento</label>
              <select id="f-tipo" className="field" value={v.tipo} onChange={set('tipo')} {...a11y('tipo')}>
                <option value="">Selecione</option>
                {eventTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {err('tipo')}
            </div>
            <div>
              <label htmlFor="f-data" className="mb-1.5 block text-sm">Data prevista <span className="text-mute">(opcional)</span></label>
              <input id="f-data" type="date" className="field" value={v.data} onChange={set('data')} {...a11y('data')} />
              {err('data')}
            </div>
            <div>
              <label htmlFor="f-cidade" className="mb-1.5 block text-sm">Cidade</label>
              <input id="f-cidade" className="field" autoComplete="address-level2" value={v.cidade} onChange={set('cidade')} {...a11y('cidade')} />
              {err('cidade')}
            </div>
            <div>
              <label htmlFor="f-telefone" className="mb-1.5 block text-sm">WhatsApp</label>
              <input id="f-telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" className="field" value={v.telefone} onChange={set('telefone')} {...a11y('telefone')} />
              {err('telefone')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="f-descricao" className="mb-1.5 block text-sm">Descreva sua necessidade <span className="text-mute">(opcional)</span></label>
              <textarea id="f-descricao" rows={4} className="field" value={v.descricao} onChange={set('descricao')} {...a11y('descricao')} />
              {err('descricao')}
            </div>
            {/* honeypot anti-spam */}
            <div className="hidden" aria-hidden="true">
              <label>Não preencha<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} /></label>
            </div>
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn btn-gold mt-6 w-full disabled:opacity-60">
            {status === 'sending' ? 'Enviando…' : site.formEndpoint ? 'Enviar solicitação' : 'Enviar pelo WhatsApp'}
          </button>

          <div aria-live="polite" className="mt-4 text-sm">
            {status === 'whatsapp' && <p className="text-gold-soft">Abrimos o WhatsApp com os dados preenchidos. Basta enviar a mensagem para concluir. Se não abriu, use o botão “Conversar pelo WhatsApp”.</p>}
            {status === 'sent' && <p className="text-gold-soft">Solicitação enviada! Entraremos em contato em breve.</p>}
            {status === 'error' && <p className="text-[#f0a094]">Não foi possível enviar agora. Tente novamente ou fale direto pelo WhatsApp.</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

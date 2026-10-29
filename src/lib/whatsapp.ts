import { site } from '../config/site'
import { trackLead } from './tracking'
import { utmSummary } from './utm'

/** Mecanismo ÚNICO de WhatsApp: todos os botões do site passam por aqui. */

export function buildWhatsAppMessage(context?: string): string {
  const base = context
    ? `Olá! Conheci o trabalho do Rodrigo pelo site e gostaria de solicitar um orçamento para ${context}.`
    : site.whatsappDefaultMessage
  const origin = utmSummary()
  return origin ? `${base} ${origin}` : base
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function whatsappLink(context?: string): string {
  return whatsappUrl(buildWhatsAppMessage(context))
}

export function openWhatsApp(message: string, place: string) {
  trackLead('whatsapp_click', { place })
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}

/** "(51) 8598-6920" a partir do número internacional configurado. */
export function displayPhone(): string {
  const n = site.whatsappNumber.replace(/^55/, '')
  const ddd = n.slice(0, 2)
  const rest = n.slice(2)
  const cut = rest.length - 4
  return `(${ddd}) ${rest.slice(0, cut)}-${rest.slice(cut)}`
}

import { site } from '../config/site'

/**
 * Rastreamento preparado, mas INERTE até os IDs serem preenchidos em config/site.ts.
 * Nenhum evento é disparado artificialmente: track() só é chamado em ações reais
 * (clique no WhatsApp, envio do formulário).
 */
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const t = site.tracking
const addScript = (src: string) => {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function initTracking() {
  window.dataLayer = window.dataLayer || []

  if (t.gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    addScript(`https://www.googletagmanager.com/gtm.js?id=${t.gtmId}`)
  }

  // gtag direto (GA4 / Google Ads) — só se não houver GTM
  const gtagId = t.ga4Id || t.googleAdsId
  if (!t.gtmId && gtagId) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    if (t.ga4Id) window.gtag('config', t.ga4Id)
    if (t.googleAdsId) window.gtag('config', t.googleAdsId)
    addScript(`https://www.googletagmanager.com/gtag/js?id=${gtagId}`)
  }

  if (t.metaPixelId && !window.fbq) {
    const q: unknown[][] = []
    const fbq = (...a: unknown[]) => q.push(a)
    ;(fbq as unknown as { queue: unknown[][] }).queue = q
    window.fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', t.metaPixelId)
    window.fbq('track', 'PageView')
  }
}

type LeadSource = 'whatsapp_click' | 'form_submit'

/** Registra uma conversão REAL (lead). Seguro quando nada está configurado. */
export function trackLead(source: LeadSource, detail: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer || []
  const anyConfigured = t.gtmId || t.ga4Id || t.googleAdsId || t.metaPixelId
  if (!anyConfigured) return

  window.dataLayer.push({ event: source, ...detail })
  if (!t.gtmId) {
    window.gtag?.('event', source, detail)
    if (t.googleAdsId && t.googleAdsLeadLabel) {
      window.gtag?.('event', 'conversion', { send_to: `${t.googleAdsId}/${t.googleAdsLeadLabel}` })
    }
  }
  if (t.metaPixelId) window.fbq?.('track', 'Lead', detail)
}

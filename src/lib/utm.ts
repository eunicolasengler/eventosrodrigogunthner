/** Captura UTMs/click-ids da primeira visita e os preserva na sessão. */
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
const STORE = 'rg_utm'

export function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search)
    const found: Record<string, string> = {}
    KEYS.forEach((k) => {
      const v = p.get(k)
      if (v) found[k] = v
    })
    if (Object.keys(found).length) sessionStorage.setItem(STORE, JSON.stringify(found))
  } catch {
    /* storage indisponível: segue sem UTM */
  }
}

export function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || '{}')
  } catch {
    return {}
  }
}

/** Anexa os UTMs salvos a uma URL externa (use ao encaminhar para outros canais). */
export function withUtm(url: string): string {
  const utm = getUtm()
  if (!Object.keys(utm).length) return url
  const u = new URL(url)
  Object.entries(utm).forEach(([k, v]) => u.searchParams.set(k, v))
  return u.toString()
}

/** Texto curto de origem para anexar à mensagem de WhatsApp (só quando houver UTM). */
export function utmSummary(): string {
  const u = getUtm()
  const parts = [u.utm_source, u.utm_medium, u.utm_campaign].filter(Boolean)
  return parts.length ? `(origem: ${parts.join(' / ')})` : ''
}

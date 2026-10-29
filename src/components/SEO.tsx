import { useEffect } from 'react'
import { site } from '../config/site'

/** Dados estruturados (schema.org) gerados a partir da configuração central. */
export default function SEO() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: site.name,
      description: site.description,
      url: site.url,
      image: `${site.url}/og.jpg`,
      telephone: `+${site.whatsappNumber}`,
      areaServed: { '@type': 'Country', name: 'Brasil' },
      sameAs: [site.social.instagram],
      serviceType: ['Sonorização para eventos', 'Iluminação para eventos', 'Painéis de LED', 'Estruturas audiovisuais'],
    }
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.text = JSON.stringify(data)
    document.head.appendChild(s)
    return () => s.remove()
  }, [])
  return null
}

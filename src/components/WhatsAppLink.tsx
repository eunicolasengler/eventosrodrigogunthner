import type { ReactNode } from 'react'
import { whatsappLink } from '../lib/whatsapp'
import { trackLead } from '../lib/tracking'
import { WhatsAppIcon } from './Icons'

type Props = {
  /** Contexto da mensagem ("um casamento", "iluminação cênica"...). */
  context?: string
  /** Onde o botão está (para rastreamento). */
  place: string
  className?: string
  icon?: boolean
  children: ReactNode
}

/** Botão reutilizável: TODOS os CTAs de WhatsApp usam este componente. */
export default function WhatsAppLink({ context, place, className = 'btn btn-gold', icon = true, children }: Props) {
  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackLead('whatsapp_click', { place })}
    >
      {icon && <WhatsAppIcon className="h-5 w-5" />}
      {children}
    </a>
  )
}

/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ---------------------------------------------------------------
 * Tudo que o cliente pode precisar trocar fica neste arquivo:
 * telefone, redes, região, serviços, mídias, IDs de rastreamento.
 * Itens marcados com "CONFIRMAR" dependem de validação do Rodrigo.
 */

export type EventCategory = 'casamentos' | 'festas' | 'corporativo'

export const site = {
  /** URL final do site (usada em SEO/Open Graph). CONFIRMAR ao publicar. */
  url: 'https://www.SEU-DOMINIO.com.br',
  name: 'Rodrigo Gunthner',
  tagline: 'Sonorização, iluminação e produção audiovisual para eventos',
  description:
    'Sonorização, iluminação e soluções audiovisuais para casamentos, festas, formaturas e eventos corporativos. Atendimento em todo o Brasil. Solicite seu orçamento pelo WhatsApp.',

  /**
   * WHATSAPP — único lugar onde o número é definido.
   * Formato internacional, SOMENTE números: DDI 55 + DDD + número.
   * CONFIRMAR: o número informado foi (51) 8598-6920 (8 dígitos). Celulares
   * costumam ter 9 dígitos (ex.: 5551985986920). Se for celular, ajuste aqui.
   */
  whatsappNumber: '555185986920',
  whatsappDefaultMessage:
    'Olá! Conheci o trabalho do Rodrigo pelo site e gostaria de solicitar um orçamento para meu evento.',

  social: {
    instagram: 'https://www.instagram.com/rodrigogunthner/',
    instagramHandle: '@rodrigogunthner',
  },

  /** Região de atendimento (confirmada pelo cliente: todo o Brasil). */
  serviceArea: 'Atendemos eventos em todo o Brasil',

  /** Opcional: endpoint de formulário (Formspree, Web3Forms, API própria...).
   *  Se vazio, o formulário encaminha os dados pelo WhatsApp. */
  formEndpoint: '',

  /** Rastreamento: preencha apenas quando as contas existirem. Vazio = nada é carregado. */
  tracking: {
    gtmId: '', // ex.: 'GTM-XXXXXXX'
    ga4Id: '', // ex.: 'G-XXXXXXXXXX' (use se não for via GTM)
    googleAdsId: '', // ex.: 'AW-XXXXXXXXX'
    googleAdsLeadLabel: '', // rótulo da conversão "Lead", ex.: 'AbCdEf...'
    metaPixelId: '',
  },

  /** Textos legais do rodapé. CONFIRMAR razão social/CNPJ se desejarem exibir. */
  legal: 'Todos os direitos reservados. Imagens de eventos realizados, usadas com fins de portfólio.',
}

/** Ordem do menu. */
export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

const m = (f: string) => `media/${f}`

export const media = {
  hero: m('salao-lustres-1080.webp'),
  heroSmall: m('salao-lustres-640.webp'),
  heroVideo: m('casamento-bodega.mp4'),
  heroVideoPoster: m('casamento-bodega-poster.webp'),
  ctaBg: m('tenda-noite-1080.webp'),
}

export const categories: { id: EventCategory; label: string }[] = [
  { id: 'casamentos', label: 'Casamentos' },
  { id: 'festas', label: 'Festas e formaturas' },
  { id: 'corporativo', label: 'Eventos corporativos' },
]

export type PortfolioItem = {
  id: string
  type: 'image' | 'video'
  category: EventCategory
  title: string
  /** Crédito/parceria exibido discretamente (vem das marcações dos stories). */
  credit?: string
  /** imagem: src grande + src pequeno / vídeo: arquivo mp4 */
  src: string
  thumb: string
  width: number
  height: number
}

/**
 * PORTFÓLIO — apenas arquivos enviados pelo cliente.
 * CONFIRMAR a categoria de cada item e trocar/adicionar mídias quando houver mais.
 */
export const portfolio: PortfolioItem[] = [
  {
    id: 'tenda-noite',
    type: 'image',
    category: 'casamentos',
    title: 'Tenda cristal ao entardecer',
    credit: 'Com @robertapellineventos · Bodega Iribarrem',
    src: m('tenda-noite-1080.webp'),
    thumb: m('tenda-noite-640.webp'),
    width: 1080,
    height: 1464,
  },
  {
    id: 'casamento-rustico',
    type: 'video',
    category: 'casamentos',
    title: 'Casamento em salão rústico',
    src: m('casamento-rustico.mp4'),
    thumb: m('casamento-rustico-poster.webp'),
    width: 540,
    height: 960,
  },
  {
    id: 'festa-luzes',
    type: 'video',
    category: 'festas',
    title: 'Festa com iluminação cênica',
    src: m('festa-luzes.mp4'),
    thumb: m('festa-luzes-poster.webp'),
    width: 540,
    height: 960,
  },
  {
    id: 'salao-lustres',
    type: 'image',
    category: 'corporativo',
    title: 'Salão histórico com estrutura de palco e LED',
    credit: 'Com @shanazimmermann · @leopoldinajuvenil',
    src: m('salao-lustres-1080.webp'),
    thumb: m('salao-lustres-640.webp'),
    width: 1080,
    height: 1455,
  },
  {
    id: 'tenda-dia',
    type: 'image',
    category: 'casamentos',
    title: 'Recepção sob tenda transparente',
    credit: 'Com @robertapellineventos · Bodega Iribarrem',
    src: m('tenda-dia-1080.webp'),
    thumb: m('tenda-dia-640.webp'),
    width: 1080,
    height: 1325,
  },
  {
    id: 'casamento-bodega',
    type: 'video',
    category: 'casamentos',
    title: 'Jantar com vista para o vale',
    credit: 'Bodega Iribarrem',
    src: m('casamento-bodega.mp4'),
    thumb: m('casamento-bodega-poster.webp'),
    width: 540,
    height: 960,
  },
  {
    id: 'mesa-gastronomia',
    type: 'image',
    category: 'corporativo',
    title: 'Ambientação, gastronomia e iluminação',
    credit: 'Com @claudiosolanogastronomia · @atelierdasflores',
    src: m('mesa-gastronomia-1080.webp'),
    thumb: m('mesa-gastronomia-640.webp'),
    width: 1080,
    height: 1640,
  },
]

/** SOLUÇÕES — descrições genéricas, sem prometer itens não confirmados. */
export const services = [
  {
    id: 'sonorizacao',
    title: 'Sonorização profissional',
    text: 'Som dimensionado para o espaço e para o público do seu evento, com clareza do primeiro ao último convidado.',
    image: m('salao-lustres-640.webp'),
    context: 'sonorização profissional',
  },
  {
    id: 'iluminacao',
    title: 'Iluminação cênica',
    text: 'Projeto de luz que valoriza o ambiente, cria atmosfera e conduz cada momento da festa.',
    image: m('tenda-noite-640.webp'),
    context: 'iluminação cênica',
  },
  {
    id: 'led',
    title: 'Painéis de LED',
    text: 'Imagem e conteúdo em destaque para cerimônias, shows, apresentações e momentos especiais.',
    image: m('mesa-gastronomia-640.webp'),
    context: 'painéis de LED',
  },
  {
    id: 'estruturas',
    title: 'Estruturas audiovisuais',
    text: 'Montagem técnica de palco, tesouras e suporte para som, luz e imagem, com execução cuidadosa.',
    image: m('tenda-dia-640.webp'),
    context: 'estruturas audiovisuais para eventos',
  },
  {
    id: 'personalizados',
    title: 'Projetos personalizados',
    text: 'Cada evento é único. Montamos a solução de acordo com a sua necessidade, local e orçamento.',
    image: m('casamento-rustico-poster.webp'),
    context: 'um projeto personalizado',
  },
]

export const segments = [
  {
    id: 'casamentos',
    title: 'Casamentos e celebrações',
    text: 'Som limpo para a cerimônia e luz que transforma o espaço em cenário, para você viver cada momento sem preocupação técnica.',
    image: m('tenda-noite-1080.webp'),
    context: 'um casamento ou celebração',
    filter: 'casamentos' as EventCategory,
  },
  {
    id: 'festas',
    title: 'Festas e formaturas',
    text: 'Energia na pista e luz de impacto para criar a atmosfera da noite, com estrutura pensada para a sua festa funcionar do início ao fim.',
    image: m('festa-luzes-poster.webp'),
    context: 'uma festa ou formatura',
    filter: 'festas' as EventCategory,
  },
  {
    id: 'corporativo',
    title: 'Eventos empresariais e corporativos',
    text: 'Estrutura audiovisual profissional para convenções, premiações, lançamentos e confraternizações, com som claro e imagem de qualidade.',
    image: m('salao-lustres-1080.webp'),
    context: 'um evento corporativo',
    filter: 'corporativo' as EventCategory,
  },
]

/** DIFERENCIAIS — exibidos apenas com confirmed: true. CONFIRMAR cada um com o Rodrigo. */
export const differentials = [
  { title: 'Planejamento técnico', text: 'Entendemos o espaço e o formato do evento antes de propor a estrutura.', confirmed: true },
  { title: 'Equipamentos profissionais', text: 'Estrutura adequada ao porte e à exigência de cada projeto.', confirmed: true },
  { title: 'Iluminação sob medida', text: 'Projeto de luz adequado ao ambiente e à proposta do evento.', confirmed: true },
  { title: 'Som dimensionado', text: 'Sonorização pensada para o tamanho do local e do público.', confirmed: true },
  { title: 'Montagem e execução', text: 'Equipe preparada para montar, operar e entregar no horário.', confirmed: true },
  { title: 'Soluções personalizadas', text: 'Nada de pacote pronto: a proposta nasce da sua necessidade.', confirmed: true },
]

/** DEPOIMENTOS — só reais e autorizados. Enquanto vazio, a seção fica oculta. */
export type Testimonial = { name: string; role?: string; text: string }
export const testimonials: Testimonial[] = []

export const process = [
  { title: 'Conte-nos sobre seu evento', text: 'Tipo de evento, data, local e o que você imagina para ele.' },
  { title: 'Entendemos as necessidades técnicas', text: 'Avaliamos espaço, público e formato para definir o que é preciso.' },
  { title: 'Desenvolvemos uma proposta personalizada', text: 'Você recebe uma proposta alinhada às características do seu evento.' },
  { title: 'Planejamos e executamos', text: 'Cuidamos do planejamento e da montagem da estrutura contratada.' },
]

export const eventTypes = [
  'Casamento',
  'Festa ou formatura',
  'Evento corporativo',
  'Outro',
]

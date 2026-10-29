import { media, site } from '../config/site'
import WhatsAppLink from './WhatsAppLink'

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:items-center">
      <img
        src={media.hero}
        srcSet={`${media.heroSmall} 640w, ${media.hero} 1080w`}
        sizes="100vw"
        width={1080}
        height={1455}
        alt="Salão de evento com lustres, estrutura de iluminação e palco montado"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_35%]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30 lg:bg-gradient-to-r lg:from-ink lg:via-ink/80 lg:to-ink/20" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-14 pt-32 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Sonorização · Iluminação · Audiovisual</p>
          <h1 className="h-display text-[2.9rem] sm:text-6xl lg:text-7xl">
            Seu evento merece uma estrutura <em className="text-gold-soft">à altura.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">
            Sonorização, iluminação e soluções audiovisuais para transformar eventos em experiências memoráveis.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink place="hero" className="btn btn-gold">Solicitar orçamento</WhatsAppLink>
            <a href="#projetos" className="btn btn-ghost">Conhecer nossos projetos</a>
          </div>
          <p className="mt-6 text-sm text-mute">{site.serviceArea}</p>
        </div>

        <div className="hidden justify-self-end lg:block">
          <div className="relative w-[300px] overflow-hidden rounded-[28px] border border-gold/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]">
            <video
              src={media.heroVideo}
              poster={media.heroVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              width={540}
              height={960}
              className="aspect-[9/16] w-full object-cover"
              aria-label="Vídeo de evento realizado"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

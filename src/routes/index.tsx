import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useReducer, useRef, useState } from "react";
import { Menu } from "lucide-react";
import heroPortrait from "@/assets/isabela-hero.jpg";
import aboutDetail from "@/assets/isabela-portrait.jpg";
import { FaceDiagnostic } from "@/components/FaceDiagnostic";
import { ProtocolsList } from "@/components/ProtocolsList";
import { BookingModal, openBooking } from "@/components/BookingModal";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  component: Landing,
});


function Landing() {
  return (
    <main id="conteudo" className="bg-background text-foreground">
      {/* O React moderno injeta estas tags automaticamente no <head> do navegador, sem depender de nenhuma configuração do TanStack Router */}
      <title>Isabela Anselmo — Biomedicina Estética</title>
      <meta name="description" content="Rejuvenescimento natural e cuidado personalizado por Isabela Anselmo. Biomedicina estética com critério, sutileza e elegância." />
      <meta name="apple-mobile-web-app-title" content="Isa Anselmo" />
      
      <link rel="icon" type="image/png" href="/public/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
      <link rel="shortcut icon" href="/public/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
      <link rel="manifest" href="/public/site.webmanifest" />

      <Hero />
      <Philosophy />
      <FaceDiagnostic />
      <Protocols />
      <Experience />
      <Testimonial />
      <Contact />
      <Footer />
      <BookingModal />
    </main>
  );
}


function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: reduced
          ? "none"
          : `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { href: "#filosofia", label: "Filosofia" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#protocolos", label: "Protocolos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

function Nav() {
  const [openMenu, toggleMenu] = useReducer((s) => !s, false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 py-5 md:py-7 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="font-serif font-bold! text-2xl! md:text-3xl! tracking-wide text-foreground"
        >
          Isabela <span className="italic text-muted-foreground">Anselmo</span>
        </a>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-10 eyebrow">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => openBooking()}
          className="hidden md:inline-flex items-center eyebrow border-b border-foreground/40 pb-1 hover:border-foreground transition-colors text-foreground cursor-pointer bg-transparent"
        >
          Agendar
        </button>

        <Sheet open={openMenu} onOpenChange={toggleMenu}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={openMenu}
              aria-controls="menu-mobile"
              className="md:hidden inline-flex items-center justify-center rounded-md text-foreground tap-44 -mr-2"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            id="menu-mobile"
            side="right"
            className="bg-background border-l border-border w-[85%] sm:max-w-sm"
          >
            <SheetTitle className="font-serif text-2xl text-foreground">
              Menu
            </SheetTitle>
            <nav aria-label="Navegação principal mobile" className="mt-8 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => toggleMenu()}
                  className="font-serif text-xl text-foreground py-3 border-b border-border tap-44 flex items-center"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  toggleMenu();
                  openBooking();
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium tap-44"
              >
                Agendar avaliação
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-dvh bg-background overflow-hidden"
    >
      <Nav />
      {/* Trocamos items-end por md:items-center */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 pt-32 md:pt-44 pb-20 md:pb-24 grid md:grid-cols-12 gap-10 md:gap-12 md:items-center md:min-h-dvh">
        
        {/* Lado Esquerdo: Textos e Botão */}
        <div className="md:col-span-6 md:pb-16">
          <div className="animate-fade-in-slow">
            <span className="eyebrow">Biomedicina Estética</span>
            <span className="gold-rule ml-4 align-middle" aria-hidden="true" />
          </div>
          <h1
            id="hero-title"
            className="mt-6 md:mt-8 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground animate-fade-up"
          >
            O cuidado da<br />
            sua beleza natural.
          </h1>
          <p
            className="mt-6 md:mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Protocolos personalizados conduzidos com critério científico
            e sensibilidade estética. Beleza realçada com sutileza e elegância.
          </p>
          <div
            className="mt-10 md:mt-12 flex flex-wrap items-center gap-6 md:gap-8 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <button
              onClick={() => openBooking()}
              className="group relative inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 md:px-9 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground hover:shadow-[var(--shadow-elegant)] tap-44"
            >
              Agendar avaliação
              <span
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* Lado Direito: Foto Estática */}
        <div className="md:col-span-6 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            {/* Removemos a div com ref e o scale(1.04) */}
            <img
              src={heroPortrait}
              alt="Retrato editorial da biomédica Isabela Anselmo"
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 md:-bottom-6 md:-left-6">
            <div className="bg-background px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-[var(--shadow-soft)] border border-border">
              <span className="eyebrow block">CRBM · Especialista</span>
              <span className="font-serif italic text-base md:text-lg text-foreground">
                Estética Avançada
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



function Philosophy() {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-title"
      className="relative py-20 md:py-32 lg:py-44 bg-cream"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-16 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={aboutDetail}
              alt="Detalhe do atendimento de Isabela Anselmo"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            />
          </div>
        </Reveal>
        <Reveal delay={150} className="md:col-span-7 md:pl-8">
          <span className="eyebrow">Filosofia</span>
          <span className="gold-rule ml-4 align-middle" aria-hidden="true" />
          <h2
            id="filosofia-title"
            className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground"
          >
            Beleza que se revela <span className="italic">sem se anunciar.</span>
          </h2>
          <div className="mt-6 md:mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            <p>
              Acredito em uma estética que respeita a identidade de cada rosto. Em vez de
              transformar, devolvo o que o tempo marcou — com técnica, escuta e
              proporção.
            </p>
            <p>
              Cada protocolo é desenhado para você. Avaliação criteriosa, planejamento
              individualizado e resultados naturais que se integram à sua expressão.
            </p>
          </div>
          <dl className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl">
            {[
              "Avaliação Detalhada",
              "Acompanhamento Pós-Procedimento",
              "Transparência em Cada Etapa",
            ].map((label) => (
              <div key={label}>
                <span className="gold-rule" aria-hidden="true" />
                <dt className="sr-only">Pilar do cuidado</dt>
                <dd className="mt-3 font-serif text-lg leading-snug text-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Protocols() {
  return (
    <section
      id="protocolos"
      aria-labelledby="protocolos-title"
      className="py-20 md:py-32 lg:py-44 bg-background"
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Protocolos</span>
            <span className="gold-rule ml-4 align-middle" aria-hidden="true" />
            <h2
              id="protocolos-title"
              className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground"
            >
              Conduzidos com <span className="italic">delicadeza</span> e ciência.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Toque em cada procedimento para conhecer indicações, duração e tempo de recuperação.
            </p>
          </div>
        </Reveal>
        <ProtocolsList />
      </div>
    </section>
  );
}

function Experience() {
  const steps = [
    ["01", "Conversa inicial", "Escuta atenta para entender sua história, sua rotina e o que sente sobre o seu próprio rosto."],
    ["02", "Avaliação clínica", "Análise técnica e personalizada — sem pressa e sem protocolos pré-definidos."],
    ["03", "Planejamento", "Um plano de cuidado feito para você, com transparência sobre cada etapa."],
    ["04", "Acompanhamento", "Presença contínua, ajustes refinados e resultados que evoluem com naturalidade."],
  ];
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="py-20 md:py-32 lg:py-44 bg-cream"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">A Experiência</span>
            <div className="mt-4 flex justify-center">
              <span className="gold-rule" aria-hidden="true" />
            </div>
            <h2
              id="experiencia-title"
              className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground"
            >
              Um cuidado que começa <span className="italic">antes</span> do primeiro toque.
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 100}>
              <li className="relative list-none">
                <div className="font-serif text-5xl text-foreground/70 italic" aria-hidden="true">
                  {n}
                </div>
                <div className="mt-4 h-px w-10 bg-border" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-xl text-foreground">{t}</h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {d}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dados dos depoimentos (pode ser movido para um arquivo de constantes se preferir)
const TESTIMONIALS = [
  {
    id: 1,
    text: "A Isa é extremamente profissional, transmitindo confiança e segurança sobre todo o processo. O mais importante para mim é a garantia de que fica natural, na medida e isso ela sabe bem :) Acompanha o pós com orientações e cuidados. Além disso, ela tem mãos de fada, super cuidadosa e delicada. Super indico seu trabalho.",
    author: "Dani Amorim Cruz",
    info: "paciente desde 2023",
  },
  {
    id: 2,
    text: "Posso garantir que é uma ótima profissional, estudiosa, atualizada e ama o que faz. Agradeço por conhecê-la.",
    author: "sandra rams",
    info: "paciente desde 2021",
  },
  {
    id: 3,
    text: "O atendimento é excepcional, a dra. Isabela fez com que eu me sentisse muito confortável durante todo o procedimento. Fiz bioestimulador e botox com ela, estou amando o resultado! Recomendo e com certeza irei retornar.",
    author: "Su Kon",
    info: "paciente desde 2020",
  },
  {
    id: 4,
    text: "A Isa é uma profissional muito atenciosa e competente. Ela explica tudo nos mínimos detalhes sempre se preocupando com o paciente e em deixar o resultado de acordo com a expectativa (que no meu caso é mais naturalizada hahah) Amooo e recomendo!!",
    author: "Martina C. K.",
    info: "paciente desde 2025",
  },
  {
    id: 5,
    text: "Fiz uma rinomodelação com a Isabela e simplesmente amei! O atendimento foi impecável do início ao fim, a profissional super anteciosa e cuidadosa. O procedimento não doeu absolutamente nada, e o resultado ficou incrível, superou minhas expectativas! Recomendo de olhos fechados!",
    author: "Betina Coelho",
    info: "paciente desde 2025",
  },
  {
    id: 6,
    text: "A Isabela é uma profissional fora da curva. Extremamente educada, inteligente e preocupada com todas as condições de saúde inerentes aos procedimentos. Faço botox e preenchimento com ela e super recomendo.",
    author: "Paola Araujo Justo",
    info: "paciente desde 2024",
  },
];

function Testimonial() {
  // Inicializa o Embla com a opção de loop infinito
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Funções de navegação do carrossel
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section 
      aria-label="Depoimentos dos pacientes" 
      className="py-20 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-16 relative group">
        
        {/* Container Principal do Embla (Viewport) */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          {/* Container dos Slides */}
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="flex-[0_0_100%] min-w-0 text-center px-4"
              >
                <span className="text-foreground font-serif text-5xl leading-none" aria-hidden="true">
                  “
                </span>
                <blockquote className="mt-4 font-serif text-2xl md:text-[2rem] leading-[1.35] text-foreground italic max-w-3xl mx-auto">
                  {t.text}
                </blockquote>
                <div className="mt-8 eyebrow">
                  — {t.author}, <span className="text-muted-foreground">{t.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Navegação (Ficam discretos e aparecem no hover em telas maiores) */}
        <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Depoimento anterior"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors tap-44 cursor-pointer bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Próximo depoimento"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors tap-44 cursor-pointer bg-transparent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="py-20 md:py-32 lg:py-44 bg-foreground text-background"
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <span className="eyebrow" style={{ color: "rgba(248,243,237,0.8)" }}>
            Agendar
          </span>
          <h2
            id="contato-title"
            className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1]"
          >
            Sua avaliação <span className="italic text-[color:var(--color-gold)]">começa aqui.</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(248,243,237,0.92)" }}
          >
            Atendimento exclusivo, com hora marcada. Vagas limitadas para preservar a
            qualidade e a atenção que cada paciente merece.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="space-y-8">
            {/* Bloco de Endereço */}
            <div>
              <div className="eyebrow" style={{ color: "rgba(248,243,237,0.75)" }}>
                Endereço
              </div>
              <address className="mt-2 font-serif text-lg md:text-xl not-italic">
                <div>Centro Executivo Wilmar Henrique Becker</div>
                <div>Av. Rio Branco, 847 — sala 909 — Centro, Florianópolis/SC, 88015-200</div>
              </address>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-3">
              {/* Instagram */}
              <div>
                <a
                  href="https://instagram.com/dra.isabelaanselmo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 font-serif text-lg md:text-xl flex items-center gap-3 hover:opacity-70 transition-opacity tap-44"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                    alt="Ícone do Instagram"
                    className="w-7 h-7"
                  />                  
                  @dra.isabelaanselmo
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                 <button
                  onClick={() => openBooking()} /* Mesma ação do botão principal */
                  className="mt-2 font-serif text-lg md:text-xl flex items-center gap-3 hover:opacity-70 transition-opacity tap-44 text-left"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="Ícone do WhatsApp"
                    className="w-7 h-7" /* Um pouco maior para garantir reconhecimento */
                  />                  
                  +55 48 99183-7064
                </button>
              </div>

            </div>

            {/* Botão de Agendamento */}
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center justify-center rounded-full bg-background text-foreground px-7 md:px-9 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-[color:var(--color-gold)] hover:text-foreground hover:shadow-[var(--shadow-elegant)] tap-44"
            >
              Agendar avaliação
              <span className="ml-3" aria-hidden="true">→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="bg-foreground border-t border-background/15"
      //style={{ color: "rgba(248,243,237,1)" }}      
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 eyebrow">
        <div className="text-white/70! opacity-100! text-center md:text-left">© {new Date().getFullYear()} Isabela Anselmo <br /> Biomedicina Estética</div>
        <div className="text-white/70! opacity-100! text-center md:text-right">Responsável técnica: Isabela Anselmo <br /> CRBM-5 7526</div>
      </div>
    </footer>
  );
}

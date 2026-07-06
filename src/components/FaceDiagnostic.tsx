import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/face-diagnostic-portrait.png";
import { useIsMobile } from "@/hooks/use-mobile";

type Region = {
  id: string;
  name: string;
  complaint?: string;
  treatments: string[];
  result: string;
  x: number;
  y: number;
  rx: number;
  ry: number;
};

const REGIONS: Region[] = [
  {
    id: "bigode",
    name: "Bigode Chinês",
    complaint: "Sulcos nasogenianos",
    treatments: ["Bioestimulador", "Ultrassom microfocado", "Preenchimento estratégico"],
    result: "Mais sustentação facial e suavização natural.",
    x: 242, y: 495, rx: 50, ry: 50,
  },
  {
    id: "capilar",
    name: "Capilar",
    complaint: "Queda capilar, cabelos finos e ralos",
    treatments: ["Protocolo Lúmina"],
    result: "Fortalecimento e revitalização capilar.",
    x: 300, y: 115, rx: 50, ry: 50,
  },
  {
    id: "mandibula",
    name: "Contorno facial",
    complaint: "Perda de contorno, linha da marionete, bulldog e falta de projeção do queixo",
    treatments: ["Harmonização facial", "Perfiloplastia", "Ultrassom microfocado", "Bioestimulador de colágeno"],
    result: "Mais definição e equilíbrio facial.",
    x: 150, y: 585, rx: 50, ry: 50,
  },
  {
    id: "glabela",
    name: "Glabela",
    complaint: "Linha do bravo",
    treatments: ["Botox avançado", "CO₂ Fracionado", "Jato de plasma", "Fio Filler", "Descolamento"],
    result: "Expressão mais suave e descansada.",
    x: 300, y: 295, rx: 50, ry: 50,
  },
  {
    id: "labios",
    name: "Lábios",
    complaint: "Hidratação e contorno",
    treatments: ["Preenchimento labial", "Skinbooster labial"],
    result: "Contorno elegante e hidratação sofisticada.",
    x: 340, y: 548, rx: 50, ry: 50,
  },
  {
    id: "nariz",
    name: "Nariz",
    complaint: "Ponta caída ou pouco projetada, nariz aquilino (tucano)",
    treatments: ["Rinomodelação"],
    result: "Dorso alinhado, nariz delicado e elegante.",
    x: 325, y: 460, rx: 50, ry: 50,
  },
  {
    id: "olheiras",
    name: "Olheiras",
    complaint: "Cansaço sob os olhos",
    treatments: ["PDRN", "CO₂ Fracionado", "Preenchimento de olheira", "Preenchimento de malar", "Blefaroplastia sem corte"],
    result: "Aspecto mais saudável e descansado.",
    x: 390, y: 400, rx: 50, ry: 50,
  },
  {
    id: "olhos",
    name: "Pálpebra superior",
    complaint: "Olhar cansado e pés de galinha",
    treatments: ["Blefaroplastia sem corte"],
    result: "Olhar revitalizado e iluminado.",
    x: 218, y: 332, rx: 50, ry: 50,
  },
  {
    id: "papada",
    name: "Papada",
    complaint: "Flacidez submentoniana",
    treatments: ["Ultrassom microfocado", "Enzimas de gordura", "Preenchimento mentual"],
    result: "Mais firmeza e contorno facial.",
    x: 310, y: 728, rx: 50, ry: 50,
  },
  {
    id: "pele",
    name: "Pele",
    complaint: "Cicatriz de acne, poros dilatados, manchas e melasma, pele ressecada e opaca",
    treatments: ["CO₂ Fracionado", "Peeling ATA", "Peeling de ácido retinóico", "Microagulhamento com ativos", "Skinbooster", "PDRN"],
    result: "Pele uniforme, rejuvenescida, hidratada e com viço (luminosidade natural).",
    x: 470, y: 470, rx: 50, ry: 50,
  }, 
  {
    id: "pescoço",
    name: "Pescoço",
    complaint: "Pele com sinais do tempo",
    treatments: ["Bioestimulador", "CO₂ Fracionado", "Ultrassom microfocado"],
    result: "Pele mais firme e rejuvenescida.",
    x: 200, y: 728, rx: 50, ry: 50,
  },
  {
    id: "pesdegalinha",
    name: "Pés de galinha",
    complaint: "Rugas na lateral dos olhos",
    treatments: ["Botox", "Peeling ATA", "Bioestimulador de colágeno", "Blefaroplastia sem corte"],
    result: "Suavização das rugas e rejuvenescimento da região.",
    x: 500, y: 360, rx: 50, ry: 50,
  },
  {
    id: "testa",
    name: "Testa",
    complaint: "Linhas e marcas de expressão",
    treatments: ["Botox avançado", "Skinbooster", "Microagulhamento"],
    result: "Aspecto mais leve e rejuvenescido preservando naturalidade.",
    x: 350, y: 240, rx: 50, ry: 50,
  },
];

export function FaceDiagnostic() {
  const [activeId, setActiveId] = useState<string>("bigode");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileCardContainerRef = useRef<HTMLDivElement>(null); 
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setRevealed(true), io.disconnect()),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = REGIONS.find((r) => r.id === activeId)!;
  const focusId = hoveredId ?? activeId;

  const handleSelectRegion = (id: string) => {
    setActiveId(id);
    
    if (isMobile) {
      setTimeout(() => {
        mobileCardContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 80);
    }
  };

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-background overflow-hidden"
    >
      {/* Soft ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(closest-side, #F0E1C8 0%, rgba(240,225,200,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(closest-side, #D2BA94 0%, rgba(210,186,148,0) 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-8 md:px-16">
        <div
          className="text-center max-w-2xl mx-auto"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.1s ease-out, transform 1.1s ease-out",
          }}
        >
          <span className="eyebrow">Diagnóstico Facial</span>
          <div className="mt-4 flex justify-center">
            <span className="gold-rule" />
          </div>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl leading-[1.1] text-foreground">
            Sua beleza é única.<br />
            <span className="italic">Seu tratamento também.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Selecione a região que deseja melhorar e descubra os tratamentos
            mais indicados para você.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Face illustration */}
          <div
            className="md:col-span-7 relative mx-auto w-full max-w-[300px] md:max-w-[560px]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.4s ease-out 200ms, transform 1.4s ease-out 200ms",
            }}
          >
            <FaceSVG
              focusId={focusId}
              onHover={setHoveredId}
              onSelect={handleSelectRegion} 
              activeId={activeId}
              isMobile={isMobile}
            />
          </div>

          {/* Detail card + pills */}
          <div className="md:col-span-5">
            <div className="hidden md:block">
              <RegionCard region={active} revealed={revealed} />
            </div>

            {/* Region pills — visible on desktop for alternative navigation */}
            <div
              role="tablist"
              aria-label="Regiões do rosto"
              className="hidden md:flex flex-wrap gap-2 mt-8" 
            >
              {REGIONS.map((r) => {
                const isActive = r.id === activeId;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectRegion(r.id)}
                    onMouseEnter={() => setHoveredId(r.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`text-xs tracking-[0.22em] uppercase px-4 py-2 rounded-full border transition-colors duration-300 tap-44 ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-soft)]"
                        : "bg-background border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {r.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile View Card Container */}
            <div ref={mobileCardContainerRef} className="md:hidden mt-8 scroll-mt-6">
              <RegionCard region={active} revealed={revealed} />
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              Região selecionada: {active.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionCard({
  region,
  revealed,
}: {
  region: Region;
  revealed: boolean;
}) {
  return (
    <div
      key={region.id}
      className="relative rounded-2xl border border-border/70 p-8 md:p-10 overflow-hidden animate-fade-up focus:outline-none"
      style={{
        background: "linear-gradient(180deg, rgba(248,243,237,0.85) 0%, rgba(240,225,200,0.55) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -30px rgba(112,82,50,0.25)",
        opacity: revealed ? 1 : 0,
        transition: "opacity 1s ease-out 300ms",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50"
        style={{
          background: "radial-gradient(closest-side, rgba(210,186,148,0.55), transparent 70%)",
        }}
      />
      <div className="relative">
        <span className="eyebrow">Região</span>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl text-foreground">
          {region.name}
        </h3>

        {region.complaint && (
          <div className="mt-6">
            <div className="eyebrow text-[0.6rem]">Principal queixa</div>
            <p className="mt-2 text-foreground/85 font-serif italic text-lg">
              {region.complaint}
            </p>
          </div>
        )}

        <div className="mt-6">
          <div className="eyebrow text-[0.6rem]">Tratamentos indicados</div>
          <ul className="mt-3 space-y-2">
            {region.treatments.map((t, i) => (
              <li
                key={t}
                className="flex items-baseline gap-3 text-foreground/90 animate-fade-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "both",
                }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 translate-y-[-2px]" />
                <span className="text-[0.95rem]">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t border-border/70">
          <div className="eyebrow text-[0.6rem]">Resultado esperado</div>
          <p className="mt-2 text-muted-foreground leading-relaxed text-[0.95rem]">
            {region.result}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaceSVG({
  focusId,
  activeId,
  onHover,
  onSelect,
  isMobile,
}: {
  focusId: string;
  activeId: string;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  isMobile: boolean;
}) {
  const pinOuter = isMobile ? 10 : 14;
  const pinInner = isMobile ? 2.5 : 3.5;
  const pinInnerActive = isMobile ? 3.5 : 5;

  return (
    <svg
      viewBox="0 0 600 780"
      className="w-full h-auto block"
      role="img"
      aria-label="Ilustração facial interativa para diagnóstico estético"
    >
      <defs>
        <radialGradient id="faceGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#F0E1C8" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#F8F3ED" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F8F3ED" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hotspot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D2BA94" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#D2BA94" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#D2BA94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="portraitBackdrop" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#F0E1C8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F0E1C8" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#F8F3ED" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F8F3ED" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="portraitAccent" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#D2BA94" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#D2BA94" stopOpacity="0" />
        </radialGradient>
        <filter id="warmTone">
          <feColorMatrix
            type="matrix"
            values="0.96 0.04 0 0 0.015
                    0.03 0.94 0 0 0.015
                    0.02 0.04 0.86 0 0.012
                    0 0 0 1 0"
          />
        </filter>
      </defs>

      <ellipse cx="300" cy="380" rx="260" ry="320" fill="url(#faceGlow)" />
      <ellipse cx="300" cy="370" rx="230" ry="290" fill="url(#portraitBackdrop)" />
      <ellipse cx="220" cy="280" rx="180" ry="200" fill="url(#portraitAccent)" />

      <image
        href={portrait}
        x="-308"
        y="-35"
        width="1235"
        height="1008"
        preserveAspectRatio="xMidYMid meet"
        filter="url(#warmTone)"
        opacity="0.97"
      />

      {REGIONS.map((r) => {
        const isFocused = r.id === focusId;
        const isActive = r.id === activeId;
        return (
          <g
            key={r.id}
            role="button"
            tabIndex={0}
            aria-label={`Região ${r.name} — ver tratamentos indicados`}
            onMouseEnter={() => !isMobile && onHover(r.id)}
            onMouseLeave={() => !isMobile && onHover(null)}
            onFocus={() => !isMobile && onHover(r.id)}
            onBlur={() => !isMobile && onHover(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(r.id);
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onSelect(r.id);
            }}
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              e.stopPropagation();
              onSelect(r.id);
            }}
            style={{ cursor: "pointer", outline: "none" }}
            className="group focus-visible:[&>circle:first-of-type]:stroke-[var(--color-ring)]"
          >
            <ellipse
              cx={r.x}
              cy={r.y}
              rx={r.rx}
              ry={r.ry}
              fill="url(#hotspot)"
              style={{
                opacity: isFocused ? 1 : 0,
                transition: "opacity 600ms ease",
              }}
            />
            <g
              style={{
                transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
                transformOrigin: `${r.x}px ${r.y}px`,
                transform: isFocused ? "scale(1.15)" : "scale(1)",
              }}
            >
              <circle
                cx={r.x}
                cy={r.y}
                r={pinOuter}
                fill="#F8F3ED"
                stroke="#3D2A14"
                strokeWidth="1.5"
                opacity={isFocused ? 1 : 0.85}
              />
              <circle
                cx={r.x}
                cy={r.y}
                r={isActive ? pinInnerActive : pinInner}
                fill="#3D2A14"
                style={{ transition: "r 400ms ease" }}
              />
              {isFocused && (
                <circle
                  cx={r.x}
                  cy={r.y}
                  r={pinOuter + 12}
                  fill="none"
                  stroke="#3D2A14"
                  strokeWidth="1"
                  opacity="0.7"
                  className="motion-safe:opacity-70 motion-reduce:hidden"
                >
                  <animate
                    attributeName="r"
                    from={pinOuter}
                    to={pinOuter + 24}
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.7"
                    to="0"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
            <ellipse
              cx={r.x}
              cy={r.y}
              rx={Math.max(r.rx, isMobile ? 28 : 30)}
              ry={Math.max(r.ry, isMobile ? 28 : 30)}
              fill="transparent"
            />
            {isFocused && !isMobile && (
              <text
                x={r.x}
                y={r.y - 24}
                textAnchor="middle"
                fontSize="13"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
                fill="#3D2A14"
                letterSpacing="2"
                style={{ textTransform: "uppercase" }}
              >
                {r.name.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
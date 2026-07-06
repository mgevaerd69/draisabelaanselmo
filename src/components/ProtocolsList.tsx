import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Syringe,
  Wand2,
  Scan,
  UserRound,
  Dna,
  Eye,
  AudioWaveform,
  Leaf,
  Layers,
  Droplet,
  Atom,
  SunMedium,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Protocol = {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  indications: string[];
  duration: string;
  recovery: string;
};

const protocols: Protocol[] = [
  {
    id: "laser-co2",
    name: "Laser CO₂ Fracionado",
    category: "Renovação Profunda",
    icon: Sparkles,
    description:
      "Tecnologia de ouro para renovação celular. Estimula colágeno em profundidade, suaviza marcas do tempo, cicatrizes e devolve textura uniforme à pele.",
    indications: [
      "Linhas finas e flacidez",
      "Cicatrizes de acne e textura irregular",
      "Manchas e fotoenvelhecimento",
    ],
    duration: "60 a 90 minutos",
    recovery: "5 a 7 dias de descamação",
  },
  {
    id: "botox",
    name: "Botox Avançado",
    category: "Expressão Suave",
    icon: Syringe,
    description:
      "Aplicação para suavizar marcas dinâmicas preservando a naturalidade dos gestos. Resultado discreto, descansado e elegante.",
    indications: [
      "Linhas da testa, glabela e periorbitais (olhos)",
      "Elevação sutil do olhar e do sorriso",
      "Prevenção de marcas de expressão",
    ],
    duration: "30 minutos",
    recovery: "Imediata, retorno às atividades no mesmo dia",
  },
  {
    id: "harmonizacao",
    name: "Harmonização Facial",
    category: "Equilíbrio & Proporção",
    icon: Wand2,
    description:
      "Estudo individualizado de proporções para refinar contornos e devolver harmonia ao rosto. Conjunto de técnicas de preechimento com ácido hialurônico, botox e tratamento de pele. Sem exageros — apenas a melhor versão de você.",
    indications: [
      "Sinais gerais de envelhecimento",
      "Contornos não definidos",
      "Assimetrias suaves",
      "Linhas profundas",
      "Lábios finos e sem definição",
      "Falta de projeção de queixo",
      "Rosto com ar de cansado",
      ],
    duration: "60 a 90 minutos",
    recovery: "24 a 72 horas de leve edema",
  },
  {
    id: "rino",
    name: "Rinomodelação",
    category: "Refinamento",
    icon: Scan,
    description:
      "Pequenos ajustes não cirúrgicos realizados com preenchimento de ácido hialurônico que equilibram o perfil nasal com precisão e sutileza, preservando movimento e expressão.",
    indications: [
      "Ponta caída ou pouco projetada",
      "Pequenas irregularidades de dorso",
      "Nariz aquilino (de tucano)",
    ],
    duration: "30 a 45 minutos",
    recovery: "72 horas com curativo e repouso físico por 1+ semana",
  },
  {
    id: "perfiloplastia",
    name: "Perfiloplastia",
    category: "Contorno Editorial",
    icon: UserRound,
    description:
      "Desenho minucioso do perfil — nariz, mento, lábios e mandíbula — realizado com preechimento de ácido hialurônico para reorganizar a silhueta facial e devolver presença ao rosto.",
    indications: [
      "Desproporção entre queixo, nariz e lábios",
      "Queixo retraído",
      "Falta de contorno",
    ],
    duration: "60 a 90 minutos",
    recovery: "24 a 72 horas de leve edema",
  },
  {
    id: "bioestimulador",
    name: "Bioestimulador",
    category: "Colágeno & Firmeza",
    icon: Dna,
    description:
      "Estímulo profundo de colágeno e elastina para uma pele mais densa, firme e luminosa. Resultados que evoluem mês a mês com naturalidade.",
    indications: [
      "Flacidez inicial e perda de firmeza",
      "Reestruturação de terços médio e inferior",
      "Prevenção de envelhecimento",
    ],
    duration: "45 a 60 minutos",
    recovery: "24 a 48 horas de leve edema",
  },
  {
    id: "blefaro",
    name: "Blefaroplastia sem Corte",
    category: "Olhar Renovado",
    icon: Eye,
    description:
      "Técnica não cirúrgica que rejuvenesce a região dos olhos, suavizando pálpebras pesadas e devolvendo leveza ao olhar.",
    indications: [
      "Pálpebras superiores caídas",
      "Bolsas e flacidez palpebral leve",
      "Olhar cansado",
    ],
    duration: "60 minutos",
    recovery: "3 a 7 dias",
  },
  {
    id: "ultrassom",
    name: "Ultrassom Microfocado",
    category: "Lifting Não Invasivo",
    icon: AudioWaveform,
    description:
      "Energia precisa que atua nas camadas profundas da pele, promovendo lifting sutil e progressivo sem cortes nem afastamento.",
    indications: [
      "Flacidez de face e pescoço",
      "Definição de contorno facial",
      "Prevenção e manutenção",
      "Rosto arredondado",
      "Sobrancelhas caídas",
      "Papada (gordura e flacidez)",
    ],
    duration: "60 a 90 minutos",
    recovery: "Imediata",
  },
  {
    id: "vasinhos",
    name: "Secagem de Vasinhos",
    category: "Pele Uniforme",
    icon: Leaf,
    description:
      "Tratamento delicado para vasinhos, devolvendo uniformidade à pele das pernas com conforto e segurança.",
    indications: [
      "Vasinhos e microvarizes",
    ],
    duration: "30 a 45 minutos",
    recovery: "72 horas de repouso leve",
  },
  {
    id: "microagulhamento",
    name: "Microagulhamento",
    category: "Textura & Viço",
    icon: Layers,
    description:
      "Estímulo controlado que renova a pele de dentro para fora, melhorando textura, poros e qualidade do tecido.",
    indications: [
      "Poros dilatados e textura irregular",
      "Cicatrizes leves de acne",
      "Melhora geral da qualidade da pele",
    ],
    duration: "60 minutos",
    recovery: "2 a 3 dias de vermelhidão suave",
  },
  {
    id: "skinbooster",
    name: "Skinbooster",
    category: "Hidratação Profunda",
    icon: Droplet,
    description:
      "Hidratação injetável que devolve viço, elasticidade e aquele brilho de pele descansada. Sutil, natural e duradouro.",
    indications: [
      "Pele desidratada e sem brilho",
      "Pescoço, colo e mãos",
      "Preparo de pele para outros protocolos",
    ],
    duration: "30 a 45 minutos",
    recovery: "24 horas de microhematomas pontuais",
  },
  {
    id: "pdrn",
    name: "PDRN",
    category: "Regeneração",
    icon: Atom,
    description:
      "Ativo regenerativo de última geração que atua na reparação tecidual e regeneração celular. Promove estímulo de colágeno, melhora a espessura da pele, hidrata, clareia manchas e previne o envelhecimento.",
    indications: [
      "Pele fina ou com sinais de envelhecimento",
      "Olheiras (vasculares, pigmentadas e de flacidez)",
      "Recuperação e regeneração pós procedimentos",
      "Prevenção",
      "Manchas",
    ],
    duration: "30 a 45 minutos",
    recovery: "24 a 48 horas de leve edema e vermelhidão",
  },
  {
    id: "peeling",
    name: "Peeling ATA e Retinóico",
    category: "Renovação Suave",
    icon: SunMedium,
    description:
      "Renovação química personalizada que clareia manchas, uniformiza o tom e devolve frescor à pele com protocolo seguro e refinado.",
    indications: [
      "Manchas e melasma",
      "Pele opaca e cansada",
      "Renovação sazonal",
      "Cicatriz de acne",
      "Poros dilatados",
      "Linhas finas",
    ],
    duration: "45 minutos",
    recovery: "3 a 10 dias de descamação",
  },
  {
    id: "lumina",
    name: "Protocolo Lúmina",
    category: "Assinatura da Casa",
    icon: Flower2,
    description:
      "Tratamento capilar personalizado que investiga as causas da queda de cabelo e combina vitaminas, aplicações no couro cabeludo, massagens terapêuticas e técnicas de estimulação para fortalecer os fios, revitalizar o couro cabeludo e promover o crescimento saudável dos cabelos.",
    indications: [
      "Queda capilar",
      "Alopécia androgenética",
      "Cabelos ralos e finos",
      "Crescimento lento dos fios",
    ],
    duration: "90 minutos",
    recovery: "24 horas",
  },
];

export const protocolNames = protocols.map((p) => p.name);

export function ProtocolsList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = protocols.find((p) => p.id === selectedId) ?? null;

  return (
    <>
      <ul className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {protocols.map((p, i) => (
          <RevealItem key={p.id} delay={i * 40}>
            <li className="border-b border-gold/40">
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                aria-label={`Conhecer protocolo ${p.name}`}
                className="group w-full flex items-center gap-4 md:gap-6 py-4 md:py-6 text-left transition-all duration-300 hover:pl-2 tap-44"
              >
                <span className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center border bg-cream border-accent">
                  <p.icon
                    className="w-5 h-5 md:w-6 md:h-6 text-foreground"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
                <span className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="font-serif text-lg md:text-xl text-foreground leading-none py-0.5">
                    {p.name}
                  </span>
                </span>
                <span
                  className="flex-shrink-0 text-foreground opacity-60 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-xl"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </li>
          </RevealItem>
        ))}
      </ul>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent className="max-w-xl border-0 p-0 overflow-hidden bg-transparent shadow-none">
          {selected && (
            <div
              className="relative rounded-sm p-6 md:p-10 border bg-background"
              style={{
                borderColor: "var(--color-border)",
                boxShadow: "0 30px 80px -30px rgba(61,42,20,0.35)",
              }}
            >
              <div className="w-14 h-14 rounded-full grid place-items-center mb-6 border bg-cream border-accent">
                <selected.icon
                  className="w-6 h-6 text-foreground"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              <DialogHeader className="text-left space-y-2">
                <DialogTitle className="font-serif text-2xl md:text-3xl leading-tight text-foreground">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base leading-relaxed text-muted-foreground pt-2">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <h4 className="eyebrow mb-3 text-foreground">Indicações</h4>
                <ul className="space-y-2">
                  {selected.indications.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm md:text-base text-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div>
                  <dt className="eyebrow text-foreground">Duração</dt>
                  <dd className="mt-1 font-serif text-base text-foreground">{selected.duration}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-foreground">Recuperação</dt>
                  <dd className="mt-1 font-serif text-base text-foreground">{selected.recovery}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  import("@/components/BookingModal").then((m) =>
                    m.openBooking({ interest: selected.name }),
                  );
                }}
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground cursor-pointer tap-44"
              >
                Agendar avaliação
                <span className="ml-3" aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

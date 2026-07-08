import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect, useId, useCallback, useReducer } from "react";
import { X, Sparkles, Syringe, Wand2, Scan, UserRound, Dna, Eye, AudioWaveform, Leaf, Layers, Droplet, Atom, SunMedium, Flower2, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
const heroPortrait = "/assets/isabela-hero-Dqr07R6B.jpg";
const aboutDetail = "/assets/isabela-portrait-ZIcyA311.jpg";
const portrait = "/assets/face-diagnostic-portrait-cvNrKGQ-.png";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const REGIONS = [
  {
    id: "bigode",
    name: "Bigode Chinês",
    complaint: "Sulcos nasogenianos",
    treatments: ["Bioestimulador", "Ultrassom microfocado", "Preenchimento estratégico"],
    result: "Mais sustentação facial e suavização natural.",
    x: 242,
    y: 495,
    rx: 50,
    ry: 50
  },
  {
    id: "capilar",
    name: "Capilar",
    complaint: "Queda capilar, cabelos finos e ralos",
    treatments: ["Protocolo Lúmina"],
    result: "Fortalecimento e revitalização capilar.",
    x: 300,
    y: 115,
    rx: 50,
    ry: 50
  },
  {
    id: "mandibula",
    name: "Contorno facial",
    complaint: "Perda de contorno, linha da marionete, bulldog e falta de projeção do queixo",
    treatments: ["Harmonização facial", "Perfiloplastia", "Ultrassom microfocado", "Bioestimulador de colágeno"],
    result: "Mais definição e equilíbrio facial.",
    x: 150,
    y: 585,
    rx: 50,
    ry: 50
  },
  {
    id: "glabela",
    name: "Glabela",
    complaint: "Linha do bravo",
    treatments: ["Botox avançado", "CO₂ Fracionado", "Jato de plasma", "Fio Filler", "Descolamento"],
    result: "Expressão mais suave e descansada.",
    x: 300,
    y: 295,
    rx: 50,
    ry: 50
  },
  {
    id: "labios",
    name: "Lábios",
    complaint: "Hidratação e contorno",
    treatments: ["Preenchimento labial", "Skinbooster labial"],
    result: "Contorno elegante e hidratação sofisticada.",
    x: 340,
    y: 548,
    rx: 50,
    ry: 50
  },
  {
    id: "nariz",
    name: "Nariz",
    complaint: "Ponta caída ou pouco projetada, nariz aquilino (tucano)",
    treatments: ["Rinomodelação"],
    result: "Dorso alinhado, nariz delicado e elegante.",
    x: 325,
    y: 460,
    rx: 50,
    ry: 50
  },
  {
    id: "olheiras",
    name: "Olheiras",
    complaint: "Cansaço sob os olhos",
    treatments: ["PDRN", "CO₂ Fracionado", "Preenchimento de olheira", "Preenchimento de malar", "Blefaroplastia sem corte"],
    result: "Aspecto mais saudável e descansado.",
    x: 390,
    y: 400,
    rx: 50,
    ry: 50
  },
  {
    id: "olhos",
    name: "Pálpebra superior",
    complaint: "Olhar cansado e pés de galinha",
    treatments: ["Blefaroplastia sem corte"],
    result: "Olhar revitalizado e iluminado.",
    x: 218,
    y: 332,
    rx: 50,
    ry: 50
  },
  {
    id: "papada",
    name: "Papada",
    complaint: "Flacidez submentoniana",
    treatments: ["Ultrassom microfocado", "Enzimas de gordura", "Preenchimento mentual"],
    result: "Mais firmeza e contorno facial.",
    x: 310,
    y: 728,
    rx: 50,
    ry: 50
  },
  {
    id: "pele",
    name: "Pele",
    complaint: "Cicatriz de acne, poros dilatados, manchas e melasma, pele ressecada e opaca",
    treatments: ["CO₂ Fracionado", "Peeling ATA", "Peeling de ácido retinóico", "Microagulhamento com ativos", "Skinbooster", "PDRN"],
    result: "Pele uniforme, rejuvenescida, hidratada e com viço (luminosidade natural).",
    x: 470,
    y: 470,
    rx: 50,
    ry: 50
  },
  {
    id: "pescoço",
    name: "Pescoço",
    complaint: "Pele com sinais do tempo",
    treatments: ["Bioestimulador", "CO₂ Fracionado", "Ultrassom microfocado"],
    result: "Pele mais firme e rejuvenescida.",
    x: 200,
    y: 728,
    rx: 50,
    ry: 50
  },
  {
    id: "pesdegalinha",
    name: "Pés de galinha",
    complaint: "Rugas na lateral dos olhos",
    treatments: ["Botox", "Peeling ATA", "Bioestimulador de colágeno", "Blefaroplastia sem corte"],
    result: "Suavização das rugas e rejuvenescimento da região.",
    x: 500,
    y: 360,
    rx: 50,
    ry: 50
  },
  {
    id: "testa",
    name: "Testa",
    complaint: "Linhas e marcas de expressão",
    treatments: ["Botox avançado", "Skinbooster", "Microagulhamento"],
    result: "Aspecto mais leve e rejuvenescido preservando naturalidade.",
    x: 350,
    y: 240,
    rx: 50,
    ry: 50
  }
];
function FaceDiagnostic() {
  const [activeId, setActiveId] = useState("bigode");
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const mobileCardContainerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setRevealed(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const active = REGIONS.find((r) => r.id === activeId);
  const focusId = hoveredId ?? activeId;
  const handleSelectRegion = (id) => {
    setActiveId(id);
    if (isMobile) {
      setTimeout(() => {
        mobileCardContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 80);
    }
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "diagnostico",
      ref: sectionRef,
      className: "relative py-32 md:py-44 bg-background overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-60",
            style: {
              background: "radial-gradient(closest-side, #F0E1C8 0%, rgba(240,225,200,0) 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-50",
            style: {
              background: "radial-gradient(closest-side, #D2BA94 0%, rgba(210,186,148,0) 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative max-w-[1280px] mx-auto px-8 md:px-16", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "text-center max-w-2xl mx-auto",
              style: {
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1.1s ease-out, transform 1.1s ease-out"
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Diagnóstico Facial" }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "gold-rule" }) }),
                /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-serif text-4xl md:text-5xl leading-[1.1] text-foreground", children: [
                  "Sua beleza é única.",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "italic", children: "Seu tratamento também." })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: "Selecione a região que deseja melhorar e descubra os tratamentos mais indicados para você." })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-center", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "md:col-span-7 relative mx-auto w-full max-w-[300px] md:max-w-[560px]",
                style: {
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 1.4s ease-out 200ms, transform 1.4s ease-out 200ms"
                },
                children: /* @__PURE__ */ jsx(
                  FaceSVG,
                  {
                    focusId,
                    onHover: setHoveredId,
                    onSelect: handleSelectRegion,
                    activeId,
                    isMobile
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
              /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(RegionCard, { region: active, revealed }) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  role: "tablist",
                  "aria-label": "Regiões do rosto",
                  className: "hidden md:flex flex-wrap gap-2 mt-8",
                  children: REGIONS.map((r) => {
                    const isActive = r.id === activeId;
                    return /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        role: "tab",
                        "aria-selected": isActive,
                        onClick: () => handleSelectRegion(r.id),
                        onMouseEnter: () => setHoveredId(r.id),
                        onMouseLeave: () => setHoveredId(null),
                        className: `text-xs tracking-[0.22em] uppercase px-4 py-2 rounded-full border transition-colors duration-300 tap-44 ${isActive ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-soft)]" : "bg-background border-border text-foreground hover:border-foreground"}`,
                        children: r.name
                      },
                      r.id
                    );
                  })
                }
              ),
              /* @__PURE__ */ jsx("div", { ref: mobileCardContainerRef, className: "md:hidden mt-8 scroll-mt-6", children: /* @__PURE__ */ jsx(RegionCard, { region: active, revealed }) }),
              /* @__PURE__ */ jsxs("p", { className: "sr-only", role: "status", "aria-live": "polite", children: [
                "Região selecionada: ",
                active.name
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function RegionCard({
  region,
  revealed
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative rounded-2xl border border-border/70 p-8 md:p-10 overflow-hidden animate-fade-up focus:outline-none",
      style: {
        background: "linear-gradient(180deg, rgba(248,243,237,0.85) 0%, rgba(240,225,200,0.55) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -30px rgba(112,82,50,0.25)",
        opacity: revealed ? 1 : 0,
        transition: "opacity 1s ease-out 300ms"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50",
            style: {
              background: "radial-gradient(closest-side, rgba(210,186,148,0.55), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Região" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-3xl md:text-4xl text-foreground", children: region.name }),
          region.complaint && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("div", { className: "eyebrow text-[0.6rem]", children: "Principal queixa" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-foreground/85 font-serif italic text-lg", children: region.complaint })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("div", { className: "eyebrow text-[0.6rem]", children: "Tratamentos indicados" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: region.treatments.map((t, i) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "flex items-baseline gap-3 text-foreground/90 animate-fade-up",
                style: {
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "both"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 translate-y-[-2px]" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[0.95rem]", children: t })
                ]
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-border/70", children: [
            /* @__PURE__ */ jsx("div", { className: "eyebrow text-[0.6rem]", children: "Resultado esperado" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground leading-relaxed text-[0.95rem]", children: region.result })
          ] })
        ] })
      ]
    },
    region.id
  );
}
function FaceSVG({
  focusId,
  activeId,
  onHover,
  onSelect,
  isMobile
}) {
  const pinOuter = isMobile ? 10 : 14;
  const pinInner = isMobile ? 2.5 : 3.5;
  const pinInnerActive = isMobile ? 3.5 : 5;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 600 780",
      className: "w-full h-auto block",
      role: "img",
      "aria-label": "Ilustração facial interativa para diagnóstico estético",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("radialGradient", { id: "faceGlow", cx: "50%", cy: "45%", r: "55%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#F0E1C8", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsx("stop", { offset: "60%", stopColor: "#F8F3ED", stopOpacity: "0.4" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F8F3ED", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "hotspot", cx: "50%", cy: "50%", r: "50%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#D2BA94", stopOpacity: "0.55" }),
            /* @__PURE__ */ jsx("stop", { offset: "60%", stopColor: "#D2BA94", stopOpacity: "0.18" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#D2BA94", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "portraitBackdrop", cx: "50%", cy: "48%", r: "55%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#F0E1C8", stopOpacity: "0.95" }),
            /* @__PURE__ */ jsx("stop", { offset: "55%", stopColor: "#F0E1C8", stopOpacity: "0.55" }),
            /* @__PURE__ */ jsx("stop", { offset: "85%", stopColor: "#F8F3ED", stopOpacity: "0.2" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F8F3ED", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "portraitAccent", cx: "35%", cy: "35%", r: "60%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#D2BA94", stopOpacity: "0.35" }),
            /* @__PURE__ */ jsx("stop", { offset: "70%", stopColor: "#D2BA94", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsx("filter", { id: "warmTone", children: /* @__PURE__ */ jsx(
            "feColorMatrix",
            {
              type: "matrix",
              values: "0.96 0.04 0 0 0.015\r\n                    0.03 0.94 0 0 0.015\r\n                    0.02 0.04 0.86 0 0.012\r\n                    0 0 0 1 0"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("ellipse", { cx: "300", cy: "380", rx: "260", ry: "320", fill: "url(#faceGlow)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "300", cy: "370", rx: "230", ry: "290", fill: "url(#portraitBackdrop)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "220", cy: "280", rx: "180", ry: "200", fill: "url(#portraitAccent)" }),
        /* @__PURE__ */ jsx(
          "image",
          {
            href: portrait,
            x: "-308",
            y: "-35",
            width: "1235",
            height: "1008",
            preserveAspectRatio: "xMidYMid meet",
            filter: "url(#warmTone)",
            opacity: "0.97"
          }
        ),
        REGIONS.map((r) => {
          const isFocused = r.id === focusId;
          const isActive = r.id === activeId;
          return /* @__PURE__ */ jsxs(
            "g",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Região ${r.name} — ver tratamentos indicados`,
              onMouseEnter: () => !isMobile && onHover(r.id),
              onMouseLeave: () => !isMobile && onHover(null),
              onFocus: () => !isMobile && onHover(r.id),
              onBlur: () => !isMobile && onHover(null),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(r.id);
                }
              },
              onTouchEnd: (e) => {
                e.preventDefault();
                onSelect(r.id);
              },
              onClick: (e) => {
                if (isMobile) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                e.stopPropagation();
                onSelect(r.id);
              },
              style: { cursor: "pointer", outline: "none" },
              className: "group focus-visible:[&>circle:first-of-type]:stroke-[var(--color-ring)]",
              children: [
                /* @__PURE__ */ jsx(
                  "ellipse",
                  {
                    cx: r.x,
                    cy: r.y,
                    rx: r.rx,
                    ry: r.ry,
                    fill: "url(#hotspot)",
                    style: {
                      opacity: isFocused ? 1 : 0,
                      transition: "opacity 600ms ease"
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "g",
                  {
                    style: {
                      transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
                      transformOrigin: `${r.x}px ${r.y}px`,
                      transform: isFocused ? "scale(1.15)" : "scale(1)"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "circle",
                        {
                          cx: r.x,
                          cy: r.y,
                          r: pinOuter,
                          fill: "#F8F3ED",
                          stroke: "#3D2A14",
                          strokeWidth: "1.5",
                          opacity: isFocused ? 1 : 0.85
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "circle",
                        {
                          cx: r.x,
                          cy: r.y,
                          r: isActive ? pinInnerActive : pinInner,
                          fill: "#3D2A14",
                          style: { transition: "r 400ms ease" }
                        }
                      ),
                      isFocused && /* @__PURE__ */ jsxs(
                        "circle",
                        {
                          cx: r.x,
                          cy: r.y,
                          r: pinOuter + 12,
                          fill: "none",
                          stroke: "#3D2A14",
                          strokeWidth: "1",
                          opacity: "0.7",
                          className: "motion-safe:opacity-70 motion-reduce:hidden",
                          children: [
                            /* @__PURE__ */ jsx(
                              "animate",
                              {
                                attributeName: "r",
                                from: pinOuter,
                                to: pinOuter + 24,
                                dur: "1.6s",
                                repeatCount: "indefinite"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "animate",
                              {
                                attributeName: "opacity",
                                from: "0.7",
                                to: "0",
                                dur: "1.6s",
                                repeatCount: "indefinite"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "ellipse",
                  {
                    cx: r.x,
                    cy: r.y,
                    rx: Math.max(r.rx, isMobile ? 28 : 30),
                    ry: Math.max(r.ry, isMobile ? 28 : 30),
                    fill: "transparent"
                  }
                ),
                isFocused && !isMobile && /* @__PURE__ */ jsx(
                  "text",
                  {
                    x: r.x,
                    y: r.y - 24,
                    textAnchor: "middle",
                    fontSize: "13",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fill: "#3D2A14",
                    letterSpacing: "2",
                    style: { textTransform: "uppercase" },
                    children: r.name.toUpperCase()
                  }
                )
              ]
            },
            r.id
          );
        })
      ]
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const protocols = [
  {
    id: "laser-co2",
    name: "Laser CO₂ Fracionado",
    category: "Renovação Profunda",
    icon: Sparkles,
    description: "Tecnologia de ouro para renovação celular. Estimula colágeno em profundidade, suaviza marcas do tempo, cicatrizes e devolve textura uniforme à pele.",
    indications: [
      "Linhas finas e flacidez",
      "Cicatrizes de acne e textura irregular",
      "Manchas e fotoenvelhecimento"
    ],
    duration: "60 a 90 minutos",
    recovery: "5 a 7 dias de descamação"
  },
  {
    id: "botox",
    name: "Botox Avançado",
    category: "Expressão Suave",
    icon: Syringe,
    description: "Aplicação para suavizar marcas dinâmicas preservando a naturalidade dos gestos. Resultado discreto, descansado e elegante.",
    indications: [
      "Linhas da testa, glabela e periorbitais (olhos)",
      "Elevação sutil do olhar e do sorriso",
      "Prevenção de marcas de expressão"
    ],
    duration: "30 minutos",
    recovery: "Imediata, retorno às atividades no mesmo dia"
  },
  {
    id: "harmonizacao",
    name: "Harmonização Facial",
    category: "Equilíbrio & Proporção",
    icon: Wand2,
    description: "Estudo individualizado de proporções para refinar contornos e devolver harmonia ao rosto. Conjunto de técnicas de preechimento com ácido hialurônico, botox e tratamento de pele. Sem exageros — apenas a melhor versão de você.",
    indications: [
      "Sinais gerais de envelhecimento",
      "Contornos não definidos",
      "Assimetrias suaves",
      "Linhas profundas",
      "Lábios finos e sem definição",
      "Falta de projeção de queixo",
      "Rosto com ar de cansado"
    ],
    duration: "60 a 90 minutos",
    recovery: "24 a 72 horas de leve edema"
  },
  {
    id: "rino",
    name: "Rinomodelação",
    category: "Refinamento",
    icon: Scan,
    description: "Pequenos ajustes não cirúrgicos realizados com preenchimento de ácido hialurônico que equilibram o perfil nasal com precisão e sutileza, preservando movimento e expressão.",
    indications: [
      "Ponta caída ou pouco projetada",
      "Pequenas irregularidades de dorso",
      "Nariz aquilino (de tucano)"
    ],
    duration: "30 a 45 minutos",
    recovery: "72 horas com curativo e repouso físico por 1+ semana"
  },
  {
    id: "perfiloplastia",
    name: "Perfiloplastia",
    category: "Contorno Editorial",
    icon: UserRound,
    description: "Desenho minucioso do perfil — nariz, mento, lábios e mandíbula — realizado com preechimento de ácido hialurônico para reorganizar a silhueta facial e devolver presença ao rosto.",
    indications: [
      "Desproporção entre queixo, nariz e lábios",
      "Queixo retraído",
      "Falta de contorno"
    ],
    duration: "60 a 90 minutos",
    recovery: "24 a 72 horas de leve edema"
  },
  {
    id: "bioestimulador",
    name: "Bioestimulador",
    category: "Colágeno & Firmeza",
    icon: Dna,
    description: "Estímulo profundo de colágeno e elastina para uma pele mais densa, firme e luminosa. Resultados que evoluem mês a mês com naturalidade.",
    indications: [
      "Flacidez inicial e perda de firmeza",
      "Reestruturação de terços médio e inferior",
      "Prevenção de envelhecimento"
    ],
    duration: "45 a 60 minutos",
    recovery: "24 a 48 horas de leve edema"
  },
  {
    id: "blefaro",
    name: "Blefaroplastia sem Corte",
    category: "Olhar Renovado",
    icon: Eye,
    description: "Técnica não cirúrgica que rejuvenesce a região dos olhos, suavizando pálpebras pesadas e devolvendo leveza ao olhar.",
    indications: [
      "Pálpebras superiores caídas",
      "Bolsas e flacidez palpebral leve",
      "Olhar cansado"
    ],
    duration: "60 minutos",
    recovery: "3 a 7 dias"
  },
  {
    id: "ultrassom",
    name: "Ultrassom Microfocado",
    category: "Lifting Não Invasivo",
    icon: AudioWaveform,
    description: "Energia precisa que atua nas camadas profundas da pele, promovendo lifting sutil e progressivo sem cortes nem afastamento.",
    indications: [
      "Flacidez de face e pescoço",
      "Definição de contorno facial",
      "Prevenção e manutenção",
      "Rosto arredondado",
      "Sobrancelhas caídas",
      "Papada (gordura e flacidez)"
    ],
    duration: "60 a 90 minutos",
    recovery: "Imediata"
  },
  {
    id: "vasinhos",
    name: "Secagem de Vasinhos",
    category: "Pele Uniforme",
    icon: Leaf,
    description: "Tratamento delicado para vasinhos, devolvendo uniformidade à pele das pernas com conforto e segurança.",
    indications: [
      "Vasinhos e microvarizes"
    ],
    duration: "30 a 45 minutos",
    recovery: "72 horas de repouso leve"
  },
  {
    id: "microagulhamento",
    name: "Microagulhamento",
    category: "Textura & Viço",
    icon: Layers,
    description: "Estímulo controlado que renova a pele de dentro para fora, melhorando textura, poros e qualidade do tecido.",
    indications: [
      "Poros dilatados e textura irregular",
      "Cicatrizes leves de acne",
      "Melhora geral da qualidade da pele"
    ],
    duration: "60 minutos",
    recovery: "2 a 3 dias de vermelhidão suave"
  },
  {
    id: "skinbooster",
    name: "Skinbooster",
    category: "Hidratação Profunda",
    icon: Droplet,
    description: "Hidratação injetável que devolve viço, elasticidade e aquele brilho de pele descansada. Sutil, natural e duradouro.",
    indications: [
      "Pele desidratada e sem brilho",
      "Pescoço, colo e mãos",
      "Preparo de pele para outros protocolos"
    ],
    duration: "30 a 45 minutos",
    recovery: "24 horas de microhematomas pontuais"
  },
  {
    id: "pdrn",
    name: "PDRN",
    category: "Regeneração",
    icon: Atom,
    description: "Ativo regenerativo de última geração que atua na reparação tecidual e regeneração celular. Promove estímulo de colágeno, melhora a espessura da pele, hidrata, clareia manchas e previne o envelhecimento.",
    indications: [
      "Pele fina ou com sinais de envelhecimento",
      "Olheiras (vasculares, pigmentadas e de flacidez)",
      "Recuperação e regeneração pós procedimentos",
      "Prevenção",
      "Manchas"
    ],
    duration: "30 a 45 minutos",
    recovery: "24 a 48 horas de leve edema e vermelhidão"
  },
  {
    id: "peeling",
    name: "Peeling ATA e Retinóico",
    category: "Renovação Suave",
    icon: SunMedium,
    description: "Renovação química personalizada que clareia manchas, uniformiza o tom e devolve frescor à pele com protocolo seguro e refinado.",
    indications: [
      "Manchas e melasma",
      "Pele opaca e cansada",
      "Renovação sazonal",
      "Cicatriz de acne",
      "Poros dilatados",
      "Linhas finas"
    ],
    duration: "45 minutos",
    recovery: "3 a 10 dias de descamação"
  },
  {
    id: "lumina",
    name: "Protocolo Lúmina",
    category: "Assinatura da Casa",
    icon: Flower2,
    description: "Tratamento capilar personalizado que investiga as causas da queda de cabelo e combina vitaminas, aplicações no couro cabeludo, massagens terapêuticas e técnicas de estimulação para fortalecer os fios, revitalizar o couro cabeludo e promover o crescimento saudável dos cabelos.",
    indications: [
      "Queda capilar",
      "Alopécia androgenética",
      "Cabelos ralos e finos",
      "Crescimento lento dos fios"
    ],
    duration: "90 minutos",
    recovery: "24 horas"
  }
];
const protocolNames = protocols.map((p) => p.name);
function ProtocolsList() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = protocols.find((p) => p.id === selectedId) ?? null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ul", { className: "mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 md:gap-x-12", children: protocols.map((p, i) => /* @__PURE__ */ jsx(RevealItem, { delay: i * 40, children: /* @__PURE__ */ jsx("li", { className: "border-b border-gold/40", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setSelectedId(p.id),
        "aria-label": `Conhecer protocolo ${p.name}`,
        className: "group w-full flex items-center gap-4 md:gap-6 py-4 md:py-6 text-left transition-all duration-300 hover:pl-2 tap-44",
        children: [
          /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center border bg-cream border-accent", children: /* @__PURE__ */ jsx(
            p.icon,
            {
              className: "w-5 h-5 md:w-6 md:h-6 text-foreground",
              strokeWidth: 1.6,
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 flex flex-col justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-serif text-lg md:text-xl text-foreground leading-none py-0.5", children: p.name }) }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "flex-shrink-0 text-foreground opacity-60 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-xl",
              "aria-hidden": "true",
              children: "→"
            }
          )
        ]
      }
    ) }) }, p.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!selected, onOpenChange: (o) => !o && setSelectedId(null), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-xl border-0 p-0 overflow-hidden bg-transparent shadow-none", children: selected && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative rounded-sm p-6 md:p-10 border bg-background",
        style: {
          borderColor: "var(--color-border)",
          boxShadow: "0 30px 80px -30px rgba(61,42,20,0.35)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full grid place-items-center mb-6 border bg-cream border-accent", children: /* @__PURE__ */ jsx(
            selected.icon,
            {
              className: "w-6 h-6 text-foreground",
              strokeWidth: 1.6,
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxs(DialogHeader, { className: "text-left space-y-2", children: [
            /* @__PURE__ */ jsx(DialogTitle, { className: "font-serif text-2xl md:text-3xl leading-tight text-foreground", children: selected.name }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-sm md:text-base leading-relaxed text-muted-foreground pt-2", children: selected.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "eyebrow mb-3 text-foreground", children: "Indicações" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selected.indications.map((it) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm md:text-base text-foreground", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent", "aria-hidden": "true" }),
              it
            ] }, it)) })
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-border", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "eyebrow text-foreground", children: "Duração" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 font-serif text-base text-foreground", children: selected.duration })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "eyebrow text-foreground", children: "Recuperação" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 font-serif text-base text-foreground", children: selected.recovery })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedId(null);
                Promise.resolve().then(() => BookingModal$1).then(
                  (m) => m.openBooking({ interest: selected.name })
                );
              },
              className: "mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground cursor-pointer tap-44",
              children: [
                "Agendar avaliação",
                /* @__PURE__ */ jsx("span", { className: "ml-3", "aria-hidden": "true", children: "→" })
              ]
            }
          )
        ]
      }
    ) }) })
  ] });
}
function RevealItem({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
      },
      children
    }
  );
}
const WHATSAPP_NUMBER = "5548991837064";
const BOOKING_EVENT = "lumina:open-booking";
function openBooking(detail) {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail }));
}
const DEFAULT_INTEREST = "Ainda não sei, quero uma avaliação";
const interests = [DEFAULT_INTEREST, ...protocolNames];
function BookingModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [interest, setInterest] = useState(DEFAULT_INTEREST);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const nameId = useId();
  const interestId = useId();
  const notesId = useId();
  const statusId = useId();
  useEffect(() => {
    const handler = (e) => {
      const ce = e;
      if (ce.detail?.interest) setInterest(ce.detail.interest);
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const greeting = name.trim() ? `Olá, sou ${name.trim()}.` : "Olá!";
    const message = `${greeting}

Gostaria de agendar uma avaliação com a Dra. Isabela.

• Interesse: ${interest}` + (notes.trim() ? `
• Observações: ${notes.trim()}` : "") + `

Aguardo retorno, obrigado(a)!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setStatus("Abrindo conversa no WhatsApp…");
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setTimeout(() => setStatus(""), 1500);
  };
  const inputClass = "w-full bg-background border border-foreground/30 rounded-sm px-4 py-3 text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-colors tap-44";
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-lg border-0 p-0 overflow-hidden bg-transparent shadow-none", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative rounded-sm p-6 md:p-10 border bg-background",
      style: {
        borderColor: "var(--color-border)",
        boxShadow: "0 30px 80px -30px rgba(61,42,20,0.35)"
      },
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "text-left space-y-2", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow text-foreground", children: "Agendamento" }),
          /* @__PURE__ */ jsx(DialogTitle, { className: "font-serif text-2xl md:text-3xl leading-tight text-foreground", children: "Vamos conversar pelo WhatsApp" }),
          /* @__PURE__ */ jsx(DialogDescription, { className: "text-sm md:text-base leading-relaxed text-muted-foreground pt-1", children: "Leva só alguns segundos. Preencha os campos e clique para iniciar uma conversa no WhatsApp com a Dra. Isabela." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-7 space-y-5", noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: nameId, className: "eyebrow block mb-2 text-foreground", children: "Seu nome" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: nameId,
                name: "name",
                type: "text",
                autoComplete: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Como podemos te chamar?",
                className: inputClass,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: interestId, className: "eyebrow block mb-2 text-foreground", children: "Interesse principal" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: interestId,
                name: "interest",
                value: interest,
                onChange: (e) => setInterest(e.target.value),
                className: inputClass,
                children: [
                  !interests.includes(interest) && /* @__PURE__ */ jsx("option", { value: interest, children: interest }),
                  interests.map((it) => /* @__PURE__ */ jsx("option", { value: it, children: it }, it))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: notesId, className: "eyebrow block mb-2 text-foreground", children: "Algo a acrescentar? (opcional)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: notesId,
                name: "notes",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                rows: 3,
                placeholder: "Conte brevemente o que te traz aqui.",
                className: `${inputClass} resize-none`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground tap-44",
              children: [
                "Abrir conversa no WhatsApp",
                /* @__PURE__ */ jsx("span", { className: "ml-3", "aria-hidden": "true", children: "→" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              id: statusId,
              role: "status",
              "aria-live": "polite",
              className: "sr-only",
              children: status
            }
          )
        ] })
      ]
    }
  ) }) });
}
const BookingModal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BookingModal,
  openBooking
}, Symbol.toStringTag, { value: "Module" }));
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(DialogPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
function Landing() {
  return /* @__PURE__ */ jsxs("main", { id: "conteudo", className: "bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("title", { children: "Isabela Anselmo — Biomedicina Estética" }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: "Rejuvenescimento natural e cuidado personalizado por Isabela Anselmo. Biomedicina estética com critério, sutileza e elegância." }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-title", content: "Isa Anselmo" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", href: "/public/favicon-96x96.png", sizes: "96x96" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/svg+xml", href: "/public/favicon.svg" }),
    /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: "/public/favicon.ico" }),
    /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/public/apple-touch-icon.png" }),
    /* @__PURE__ */ jsx("link", { rel: "manifest", href: "/public/site.webmanifest" }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Philosophy, {}),
    /* @__PURE__ */ jsx(FaceDiagnostic, {}),
    /* @__PURE__ */ jsx(Protocols, {}),
    /* @__PURE__ */ jsx(Experience, {}),
    /* @__PURE__ */ jsx(Testimonial, {}),
    /* @__PURE__ */ jsx(Contact, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(BookingModal, {})
  ] });
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
  className = ""
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), {
      threshold: 0.18
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return /* @__PURE__ */ jsx("div", { ref, className, style: {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(24px)",
    transition: reduced ? "none" : `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
  }, children });
}
const NAV_LINKS = [{
  href: "#filosofia",
  label: "Filosofia"
}, {
  href: "#diagnostico",
  label: "Diagnóstico"
}, {
  href: "#protocolos",
  label: "Protocolos"
}, {
  href: "#experiencia",
  label: "Experiência"
}, {
  href: "#contato",
  label: "Contato"
}];
function Nav() {
  const [openMenu, toggleMenu] = useReducer((s) => !s, false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx("header", { className: `fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 py-5 md:py-7 flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("a", { href: "#top", className: "font-serif font-bold! text-2xl! md:text-3xl! tracking-wide text-foreground", children: [
      "Isabela ",
      /* @__PURE__ */ jsx("span", { className: "italic text-muted-foreground", children: "Anselmo" })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Navegação principal", className: "hidden md:flex items-center gap-10 eyebrow", children: NAV_LINKS.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, className: "hover:text-foreground transition-colors duration-300", children: l.label }, l.href)) }),
    /* @__PURE__ */ jsx("button", { onClick: () => openBooking(), className: "hidden md:inline-flex items-center eyebrow border-b border-foreground/40 pb-1 hover:border-foreground transition-colors text-foreground cursor-pointer bg-transparent", children: "Agendar" }),
    /* @__PURE__ */ jsxs(Sheet, { open: openMenu, onOpenChange: toggleMenu, children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Abrir menu", "aria-expanded": openMenu, "aria-controls": "menu-mobile", className: "md:hidden inline-flex items-center justify-center rounded-md text-foreground tap-44 -mr-2", children: /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6", "aria-hidden": "true" }) }) }),
      /* @__PURE__ */ jsxs(SheetContent, { id: "menu-mobile", side: "right", className: "bg-background border-l border-border w-[85%] sm:max-w-sm", children: [
        /* @__PURE__ */ jsx(SheetTitle, { className: "font-serif text-2xl text-foreground", children: "Menu" }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Navegação principal mobile", className: "mt-8 flex flex-col gap-2", children: [
          NAV_LINKS.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, onClick: () => toggleMenu(), className: "font-serif text-xl text-foreground py-3 border-b border-border tap-44 flex items-center", children: l.label }, l.href)),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            toggleMenu();
            openBooking();
          }, className: "mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium tap-44", children: "Agendar avaliação" })
        ] })
      ] })
    ] })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { id: "top", "aria-labelledby": "hero-title", className: "relative min-h-dvh bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 pt-32 md:pt-44 pb-20 md:pb-24 grid md:grid-cols-12 gap-10 md:gap-12 md:items-center md:min-h-dvh", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 md:pb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-slow", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Biomedicina Estética" }),
          /* @__PURE__ */ jsx("span", { className: "gold-rule ml-4 align-middle", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { id: "hero-title", className: "mt-6 md:mt-8 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground animate-fade-up", children: [
          "O cuidado",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "italic text-primary", children: "silencioso" }),
          " da",
          /* @__PURE__ */ jsx("br", {}),
          "sua beleza natural."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 md:mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground animate-fade-up", style: {
          animationDelay: "200ms"
        }, children: "Protocolos personalizados conduzidos com critério científico e sensibilidade estética. Beleza realçada com sutileza e elegância." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 md:mt-12 flex flex-wrap items-center gap-6 md:gap-8 animate-fade-up", style: {
          animationDelay: "400ms"
        }, children: /* @__PURE__ */ jsxs("button", { onClick: () => openBooking(), className: "group relative inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 md:px-9 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground hover:shadow-[var(--shadow-elegant)] tap-44", children: [
          "Agendar avaliação",
          /* @__PURE__ */ jsx("span", { className: "ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1", "aria-hidden": "true", children: "→" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-sm bg-sand", children: /* @__PURE__ */ jsx("img", { src: heroPortrait, alt: "Retrato editorial da biomédica Isabela Anselmo", width: 1024, height: 1280, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 left-4 md:-bottom-6 md:-left-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-background px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-[var(--shadow-soft)] border border-border", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow block", children: "CRBM · Especialista" }),
          /* @__PURE__ */ jsx("span", { className: "font-serif italic text-base md:text-lg text-foreground", children: "Estética Avançada" })
        ] }) })
      ] })
    ] })
  ] });
}
function Philosophy() {
  return /* @__PURE__ */ jsx("section", { id: "filosofia", "aria-labelledby": "filosofia-title", className: "relative py-20 md:py-32 lg:py-44 bg-cream", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-5 md:px-12 lg:px-16 grid md:grid-cols-12 gap-10 md:gap-16 items-center", children: [
    /* @__PURE__ */ jsx(Reveal, { className: "md:col-span-5", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-sm", children: /* @__PURE__ */ jsx("img", { src: aboutDetail, alt: "Detalhe do atendimento de Isabela Anselmo", width: 1024, height: 1280, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" }) }) }),
    /* @__PURE__ */ jsxs(Reveal, { delay: 150, className: "md:col-span-7 md:pl-8", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Filosofia" }),
      /* @__PURE__ */ jsx("span", { className: "gold-rule ml-4 align-middle", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("h2", { id: "filosofia-title", className: "mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground", children: [
        "Beleza que se revela ",
        /* @__PURE__ */ jsx("span", { className: "italic", children: "sem se anunciar." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 md:mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl", children: [
        /* @__PURE__ */ jsx("p", { children: "Acredito em uma estética que respeita a identidade de cada rosto. Em vez de transformar, devolvo o que o tempo marcou — com técnica, escuta e proporção." }),
        /* @__PURE__ */ jsx("p", { children: "Cada protocolo é desenhado para você. Avaliação criteriosa, planejamento individualizado e resultados naturais que se integram à sua expressão." })
      ] }),
      /* @__PURE__ */ jsx("dl", { className: "mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl", children: ["Avaliação Detalhada", "Acompanhamento Pós-Procedimento", "Transparência em Cada Etapa"].map((label) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "gold-rule", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Pilar do cuidado" }),
        /* @__PURE__ */ jsx("dd", { className: "mt-3 font-serif text-lg leading-snug text-foreground", children: label })
      ] }, label)) })
    ] })
  ] }) });
}
function Protocols() {
  return /* @__PURE__ */ jsx("section", { id: "protocolos", "aria-labelledby": "protocolos-title", className: "py-20 md:py-32 lg:py-44 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Protocolos" }),
      /* @__PURE__ */ jsx("span", { className: "gold-rule ml-4 align-middle", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("h2", { id: "protocolos-title", className: "mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground", children: [
        "Conduzidos com ",
        /* @__PURE__ */ jsx("span", { className: "italic", children: "delicadeza" }),
        " e ciência."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg", children: "Toque em cada procedimento para conhecer indicações, duração e tempo de recuperação." })
    ] }) }),
    /* @__PURE__ */ jsx(ProtocolsList, {})
  ] }) });
}
function Experience() {
  const steps = [["01", "Conversa inicial", "Escuta atenta para entender sua história, sua rotina e o que sente sobre o seu próprio rosto."], ["02", "Avaliação clínica", "Análise técnica e personalizada — sem pressa e sem protocolos pré-definidos."], ["03", "Planejamento", "Um plano de cuidado feito para você, com transparência sobre cada etapa."], ["04", "Acompanhamento", "Presença contínua, ajustes refinados e resultados que evoluem com naturalidade."]];
  return /* @__PURE__ */ jsx("section", { id: "experiencia", "aria-labelledby": "experiencia-title", className: "py-20 md:py-32 lg:py-44 bg-cream", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-5 md:px-12 lg:px-16", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "A Experiência" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "gold-rule", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxs("h2", { id: "experiencia-title", className: "mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground", children: [
        "Um cuidado que começa ",
        /* @__PURE__ */ jsx("span", { className: "italic", children: "antes" }),
        " do primeiro toque."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("ol", { className: "mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10", children: steps.map(([n, t, d], i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxs("li", { className: "relative list-none", children: [
      /* @__PURE__ */ jsx("div", { className: "font-serif text-5xl text-foreground/70 italic", "aria-hidden": "true", children: n }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-px w-10 bg-border", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 font-serif text-xl text-foreground", children: t }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm md:text-base text-muted-foreground leading-relaxed", children: d })
    ] }) }, n)) })
  ] }) });
}
const TESTIMONIALS = [{
  id: 1,
  text: "A Isa é extremamente profissional, transmitindo confiança e segurança sobre todo o processo. O mais importante para mim é a garantia de que fica natural, na medida e isso ela sabe bem :) Acompanha o pós com orientações e cuidados. Além disso, ela tem mãos de fada, super cuidadosa e delicada. Super indico seu trabalho.",
  author: "Dani Amorim Cruz",
  info: "paciente desde 2023"
}, {
  id: 2,
  text: "Posso garantir que é uma ótima profissional, estudiosa, atualizada e ama o que faz. Agradeço por conhecê-la.",
  author: "sandra rams",
  info: "paciente desde 2021"
}, {
  id: 3,
  text: "O atendimento é excepcional, a dra. Isabela fez com que eu me sentisse muito confortável durante todo o procedimento. Fiz bioestimulador e botox com ela, estou amando o resultado! Recomendo e com certeza irei retornar.",
  author: "Su Kon",
  info: "paciente desde 2020"
}, {
  id: 4,
  text: "A Isa é uma profissional muito atenciosa e competente. Ela explica tudo nos mínimos detalhes sempre se preocupando com o paciente e em deixar o resultado de acordo com a expectativa (que no meu caso é mais naturalizada hahah) Amooo e recomendo!!",
  author: "Martina C. K.",
  info: "paciente desde 2025"
}, {
  id: 5,
  text: "Fiz uma rinomodelação com a Isabela e simplesmente amei! O atendimento foi impecável do início ao fim, a profissional super anteciosa e cuidadosa. O procedimento não doeu absolutamente nada, e o resultado ficou incrível, superou minhas expectativas! Recomendo de olhos fechados!",
  author: "Betina Coelho",
  info: "paciente desde 2025"
}, {
  id: 6,
  text: "A Isabela é uma profissional fora da curva. Extremamente educada, inteligente e preocupada com todas as condições de saúde inerentes aos procedimentos. Faço botox e preenchimento com ela e super recomendo.",
  author: "Paola Araujo Justo",
  info: "paciente desde 2024"
}];
function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return /* @__PURE__ */ jsx("section", { "aria-label": "Depoimentos dos pacientes", className: "py-20 md:py-32 lg:py-40 bg-background overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-5 md:px-12 lg:px-16 relative group", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden cursor-grab active:cursor-grabbing", ref: emblaRef, children: /* @__PURE__ */ jsx("div", { className: "flex", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxs("div", { className: "flex-[0_0_100%] min-w-0 text-center px-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-foreground font-serif text-5xl leading-none", "aria-hidden": "true", children: "“" }),
      /* @__PURE__ */ jsx("blockquote", { className: "mt-4 font-serif text-2xl md:text-[2rem] leading-[1.35] text-foreground italic max-w-3xl mx-auto", children: t.text }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 eyebrow", children: [
        "— ",
        t.author,
        ", ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: t.info })
      ] })
    ] }, t.id)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-6 mt-8 md:mt-12", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: scrollPrev, "aria-label": "Depoimento anterior", className: "w-10 h-10 inline-flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors tap-44 cursor-pointer bg-transparent", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: scrollNext, "aria-label": "Próximo depoimento", className: "w-10 h-10 inline-flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors tap-44 cursor-pointer bg-transparent", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" }) })
    ] })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsx("section", { id: "contato", "aria-labelledby": "contato-title", className: "py-20 md:py-32 lg:py-44 bg-foreground text-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center", children: [
    /* @__PURE__ */ jsxs(Reveal, { children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", style: {
        color: "rgba(248,243,237,0.8)"
      }, children: "Agendar" }),
      /* @__PURE__ */ jsxs("h2", { id: "contato-title", className: "mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1]", children: [
        "Sua avaliação ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[color:var(--color-gold)]", children: "começa aqui." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-base md:text-lg leading-relaxed max-w-md", style: {
        color: "rgba(248,243,237,0.92)"
      }, children: "Atendimento exclusivo, com hora marcada. Vagas limitadas para preservar a qualidade e a atenção que cada paciente merece." })
    ] }),
    /* @__PURE__ */ jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "eyebrow", style: {
          color: "rgba(248,243,237,0.75)"
        }, children: "Endereço" }),
        /* @__PURE__ */ jsxs("address", { className: "mt-2 font-serif text-lg md:text-xl not-italic", children: [
          /* @__PURE__ */ jsx("div", { children: "Centro Executivo Wilmar Henrique Becker" }),
          /* @__PURE__ */ jsx("div", { children: "Av. Rio Branco, 847 — sala 909 — Centro, Florianópolis/SC, 88015-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-12 gap-y-3", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("a", { href: "https://instagram.com/dra.isabelaanselmo", target: "_blank", rel: "noopener noreferrer", className: "mt-2 font-serif text-lg md:text-xl flex items-center gap-3 hover:opacity-70 transition-opacity tap-44", children: [
          /* @__PURE__ */ jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", alt: "Ícone do Instagram", className: "w-7 h-7" }),
          "@dra.isabelaanselmo"
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("button", { onClick: () => openBooking(), className: "mt-2 font-serif text-lg md:text-xl flex items-center gap-3 hover:opacity-70 transition-opacity tap-44 text-left", children: [
          /* @__PURE__ */ jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", alt: "Ícone do WhatsApp", className: "w-7 h-7" }),
          "+55 48 99183-7064"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => openBooking(), className: "inline-flex items-center justify-center rounded-full bg-background text-foreground px-7 md:px-9 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-[color:var(--color-gold)] hover:text-foreground hover:shadow-[var(--shadow-elegant)] tap-44", children: [
        "Agendar avaliação",
        /* @__PURE__ */ jsx("span", { className: "ml-3", "aria-hidden": "true", children: "→" })
      ] })
    ] }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: "bg-foreground border-t border-background/15",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 eyebrow", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-white/70! opacity-100! text-center md:text-left", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Isabela Anselmo ",
          /* @__PURE__ */ jsx("br", {}),
          " Biomedicina Estética"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-white/70! opacity-100! text-center md:text-right", children: [
          "Responsável técnica: Isabela Anselmo ",
          /* @__PURE__ */ jsx("br", {}),
          " CRBM-5 7526"
        ] })
      ] })
    }
  );
}
export {
  Landing as component
};

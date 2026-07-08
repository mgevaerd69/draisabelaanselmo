# Revisão estrutural — WCAG AAA + Mobile-first

Objetivo: deixar o site conforme **WCAG 2.2 nível AAA** no que é tecnicamente viável (contraste, teclado, leitura, movimento, semântica) e reestruturar todo o layout em abordagem **mobile-first** real, sem perder a estética "quiet luxury".

> Observação importante sobre AAA: alguns critérios (ex.: 1.4.6 Contraste 7:1) exigirão **escurecer** a paleta marrom atual. Mantemos o look bege/dourado, mas o `--foreground` e o `--muted-foreground` ficam mais escuros para passar 7:1 sobre o creme. Isso é inevitável para AAA — se você preferir manter a paleta exata e ficar em AA, me avise antes de implementar.

---

## 1. Fundamentos globais (`src/styles.css`, `__root.tsx`)

- `lang="pt-BR"` no `<html>` (hoje está `en`) — critério 3.1.1.
- Adicionar **skip link** "Pular para o conteúdo" focável, escondido até receber foco (2.4.1 AAA).
- `body` peso 400 (hoje 300 — light em corpo de texto compromete legibilidade AAA).
- Token de foco visível global: anel `outline` 2px na cor `--ring` com `outline-offset: 2px` em todo elemento focável (2.4.7 + 2.4.11 AAA).
- Respeitar `prefers-reduced-motion`: desativar parallax do hero, animações de pin SVG, transições longas (>200 ms) e Reveal por IntersectionObserver (2.3.3 AAA).
- Tap target mínimo **44×44 px** como utilitário base (`min-h-11 min-w-11`) — 2.5.5 AAA.
- Paleta ajustada para AAA sobre `#F8F3ED`:
  - `--foreground`: escurecer de `#705232` para tom marrom ~`#3D2A14` (≥7:1).
  - `--muted-foreground`: de `#8a6d4a` para ~`#5A4324` (≥7:1 em texto normal).
  - `--gold` permanece como acento **decorativo** apenas (réguas, ícones grandes) — nunca para texto sobre creme.
  - `--primary` mantém marrom escuro com `--primary-foreground` creme (já passa AAA).
- Definir tamanhos mínimos: nenhum texto informativo abaixo de **14 px**. O utilitário `eyebrow` (hoje 0.7 rem ≈ 11 px) sobe para 0.75 rem (12 px) **e** ganha versão `eyebrow-lg` 14 px usada onde for único rótulo de um campo.

## 2. Reestruturação mobile-first

Toda a folha de estilo passa a assumir mobile como base e usar `md:` apenas para *enriquecer*:

- Padding lateral: `px-5` no mobile → `md:px-12` → `lg:px-16`. Hoje começa em `px-8` (32 px), apertado em telas de 360 px.
- Tipografia hero: começar em `text-4xl` (mobile) e escalar para `md:text-6xl lg:text-7xl`.
- Grids: todas as seções viram `grid-cols-1` por padrão, com `md:grid-cols-*` adicionando colunas.
- Espaçamento vertical: `py-20` mobile, `md:py-32`, `lg:py-44`.
- Imagens com `aspect-*` do Tailwind (em vez de altura calculada) e `loading="lazy"` confirmado.
- Substituir `min-h-screen` por `min-h-dvh` no hero (corrige barra de navegação móvel).

## 3. Navegação (`Nav` no `index.tsx`)

- Menu mobile real: botão hambúrguer (`size="icon"` + `aria-label`, `aria-expanded`, `aria-controls`) abrindo um `Sheet` do shadcn com os links e o CTA "Agendar".
- CTA "Agendar" visível também no mobile (hoje é `hidden md:inline-flex`).
- Links de âncora hoje (`#filosofia`, `#protocolos`, `#experiencia`, `#contato`) **continuam** como links de seção na home, mas adicionamos `aria-current` quando ativos e garantimos `scroll-margin-top` para não ficarem cobertos pelo header fixo.
- Header ganha fundo translúcido com blur quando o usuário rola, para garantir contraste do texto sobre qualquer fundo.

## 4. Hero, Filosofia, Protocolos, Experiência, Contato, Footer

Ajustes recorrentes em cada seção:

- Apenas **um `<h1>`** no documento (hero). Demais seções `<h2>` e respeitam ordem hierárquica (3 → 4) — sem pulos (1.3.1).
- Cada seção embrulhada em `<section aria-labelledby="...">` com `id` único e ligada ao seu título.
- `<main id="conteudo">` único no `Landing` (alvo do skip link).
- `ProtocolsList`: cada botão de protocolo recebe `aria-label` completo ("Conhecer protocolo {nome}"), altura mínima 44 px no mobile, seta `aria-hidden` (já está).
- Cards "Avaliação Detalhada / Acompanhamento / Transparência" passam a `<dl>`/`<dt>`/`<dd>` para semântica correta.
- Footer com contraste reforçado: `text-background/60` sobe para `text-background/85` (AAA sobre marrom escuro).
- Telefone do WhatsApp já é `<a href="https://wa.me/...">` — adicionar `aria-label` explícito.

## 5. Modal de agendamento (`BookingModal.tsx`)

- Cada `<label>` ganha `htmlFor` e cada input/select/textarea ganha `id` correspondente (1.3.1 + 3.3.2).
- Inputs: aumentar contraste do `placeholder` (de `muted-foreground/60` para `muted-foreground`), fundo `bg-background` em vez de `bg-white/60` (que pisca sobre o gradiente), borda `border-foreground/30` em vez de `gold/40` (gold não tem contraste suficiente para borda funcional).
- Foco visível claro no input/select/textarea/botão (anel marrom).
- `select` com `aria-label` redundante para leitores de tela; nome do interesse pré-selecionado anunciado.
- Botão de submit com altura ≥ 44 px (já está) e texto não-uppercase para leitura (`tracking` reduzido) — opcional, posso manter visual atual com `aria-label` legível.
- Mensagem de sucesso/erro em `aria-live="polite"` ao abrir o WhatsApp.

## 6. Diagnóstico facial (`FaceDiagnostic.tsx`) — maior débito de acessibilidade

Hoje os "pins" no SVG são `<g onClick>` sem teclado. Refatoração:

- Trocar os `<g>` interativos por `<g role="button" tabIndex={0}>` com handler `onKeyDown` (Enter/Espaço) **ou** sobrepor `<button>` HTML absolutamente posicionado sobre cada hotspot (preferível — mais robusto).
- Cada hotspot ganha `aria-label` ("Região: Lábios — ver tratamentos indicados").
- A lista de "pills" no desktop também aparece **no mobile** como navegação alternativa por teclado (hoje é `hidden md:block`), para quem não consegue usar o SVG.
- Animação `<animate>` do pin focado pausa quando `prefers-reduced-motion: reduce`.
- `RegionCard` anuncia a região ativa via `aria-live="polite"`.
- Texto `fontSize="11"` no SVG sobe para 13 e usa `--foreground` escurecido.

## 7. Componentes utilitários e tokens

- Criar variantes de botão coerentes com o design (em `button.tsx` via `cva`) — `premium`, `ghost-outline` — para padronizar foco/altura/contraste, em vez de classes ad-hoc.
- Substituir cores inline (`style={{ color: "#705232" }}`) pelos tokens semânticos (`text-foreground`) em todos os componentes, para que o ajuste de paleta AAA se propague de uma vez.

## 8. Verificação após implementação

- Conferir contraste com valores hex finais (objetivo: todo texto ≥ 7:1, texto grande ≥ 4.5:1).
- Navegar a página inteira **só com Tab/Shift+Tab/Enter/Espaço/Esc**: todo elemento interativo alcançável, foco visível, modais com trap correto (shadcn Dialog já trata).
- Reduzir viewport a 360×640 e validar que nada fica cortado, scroll horizontal não aparece, tap targets ≥ 44 px.
- Ativar "Reduce motion" no SO e confirmar que parallax/pulses/reveals param.
- Rodar o painel de SEO/A11y do projeto após o deploy do branch.

---

## Detalhes técnicos resumidos

```text
src/styles.css           tokens (foreground, muted-foreground, ring, focus), body 400,
                          @media (prefers-reduced-motion: reduce) global,
                          utilitário .skip-link, eyebrow legível, .tap-44
src/routes/__root.tsx    lang="pt-BR", skip link no shellComponent, <main id="conteudo">
src/routes/index.tsx     Nav com Sheet mobile, seções com aria-labelledby,
                          h1 único, paddings/grids mobile-first,
                          Reveal/parallax respeitando reduced-motion,
                          dl/dt/dd nos pilares
src/components/BookingModal.tsx     labels com htmlFor/id, contraste de inputs,
                                     foco visível, aria-live no submit
src/components/ProtocolsList.tsx     aria-label nos botões, min-h-11,
                                     tokens em vez de hex inline
src/components/FaceDiagnostic.tsx    hotspots focáveis via <button> sobreposto,
                                     pills visíveis no mobile, animate pausável,
                                     aria-live no card, texto SVG 13px tokenizado
src/components/ui/button.tsx         variante premium + foco padronizado (opcional)
```

Posso seguir e implementar tudo no mesmo passo, ou prefere fracionar (ex.: 1º paleta/tokens/skiplink, 2º Nav+mobile, 3º FaceDiagnostic)?

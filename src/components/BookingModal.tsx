import { useEffect, useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { protocolNames } from "@/components/ProtocolsList";

const WHATSAPP_NUMBER = "5548991837064";
const BOOKING_EVENT = "lumina:open-booking";

export function openBooking(detail?: { interest?: string }) {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail }));
}

const DEFAULT_INTEREST = "Ainda não sei, quero uma avaliação";
const interests = [DEFAULT_INTEREST, ...protocolNames];

export function BookingModal() {
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
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ interest?: string }>;
      if (ce.detail?.interest) setInterest(ce.detail.interest);
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting = name.trim() ? `Olá, sou ${name.trim()}.` : "Olá!";
    const message =
      `${greeting}\n\n` +
      `Gostaria de agendar uma avaliação com a Dra. Isabela.\n\n` +
      `• Interesse: ${interest}` +
      (notes.trim() ? `\n• Observações: ${notes.trim()}` : "") +
      `\n\nAguardo retorno, obrigado(a)!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setStatus("Abrindo conversa no WhatsApp…");
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setTimeout(() => setStatus(""), 1500);
  };

  const inputClass =
    "w-full bg-background border border-foreground/30 rounded-sm px-4 py-3 text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-colors tap-44";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg border-0 p-0 overflow-hidden bg-transparent shadow-none">
        <div
          className="relative rounded-sm p-6 md:p-10 border bg-background"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "0 30px 80px -30px rgba(61,42,20,0.35)",
          }}
        >
          <DialogHeader className="text-left space-y-2">
            <span className="eyebrow text-foreground">Agendamento</span>
            <DialogTitle className="font-serif text-2xl md:text-3xl leading-tight text-foreground">
              Vamos conversar pelo WhatsApp
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base leading-relaxed text-muted-foreground pt-1">
              Leva só alguns segundos. Preencha os campos e clique para iniciar uma conversa no WhatsApp com a 
              Dra. Isabela.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            <div>
              <label htmlFor={nameId} className="eyebrow block mb-2 text-foreground">
                Seu nome
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor={interestId} className="eyebrow block mb-2 text-foreground">
                Interesse principal
              </label>
              <select
                id={interestId}
                name="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className={inputClass}
              >
                {!interests.includes(interest) && (
                  <option value={interest}>{interest}</option>
                )}
                {interests.map((it) => (
                  <option key={it} value={it}>
                    {it}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={notesId} className="eyebrow block mb-2 text-foreground">
                Algo a acrescentar? (opcional)
              </label>
              <textarea
                id={notesId}
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Conte brevemente o que te traz aqui."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:bg-foreground tap-44"
            >
              Abrir conversa no WhatsApp
              <span className="ml-3" aria-hidden="true">→</span>
            </button>

            <p
              id={statusId}
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              {status}
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

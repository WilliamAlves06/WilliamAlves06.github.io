import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./components/Intro";
import WrappedStats from "./components/WrappedStats";
import Timeline from "./components/Timeline";
import MapJourney from "./components/MapJourney";
import TermoGame from "./components/TermoGame";
import Quiz from "./components/Quiz";
import Gallery from "./components/Gallery";
import FinalLetter from "./components/FinalLetter";
import AudioPlayer, { AudioPlayerHandle } from "./components/AudioPlayer";

/* ============================================================
   App.tsx — orquestra a experiência em "capítulos" (stories).
   - Barra de progresso no topo (estilo Instagram/Wrapped)
   - Navegação por setas e por toque nas bordas da tela
   - Player de áudio global e persistente entre capítulos
   ============================================================ */

const CHAPTERS = [
  "Início",
  "Wrapped",
  "Linha do tempo",
  "Mapa",
  "Termo",
  "Quiz",
  "Galeria",
  "Carta",
] as const;

export default function App() {
  const [chapter, setChapter] = useState(0);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<AudioPlayerHandle>(null);

  /** Inicia a experiência (chamado pelo botão da Intro) */
  const start = () => {
    setStarted(true);
    setChapter(1);
    // O clique do usuário é a "interação" que libera o autoplay do áudio
    audioRef.current?.play();
  };

  /** Volta tudo ao começo (botão "Rever nossa história") */
  const restart = () => {
    setStarted(false);
    setChapter(0);
  };

  const next = () => setChapter((c) => Math.min(c + 1, CHAPTERS.length - 1));
  const prev = () => setChapter((c) => Math.max(c - 1, started ? 1 : 0));

  return (
    <div className="phone-frame">
      {/* ---------- Barra de progresso estilo stories ---------- */}
      {started && (
        <div className="absolute left-0 right-0 top-0 z-40 flex gap-1 px-3 pt-3">
          {CHAPTERS.slice(1).map((label, i) => (
            <button
              key={label}
              aria-label={`Ir para ${label}`}
              onClick={() => setChapter(i + 1)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
            >
              <motion.div
                className="h-full bg-neon"
                initial={false}
                animate={{ width: chapter > i ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ---------- Capítulos com transição animada ---------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          className="h-full"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {chapter === 0 && <Intro onStart={start} />}
          {chapter === 1 && <WrappedStats />}
          {chapter === 2 && <Timeline />}
          {chapter === 3 && <MapJourney />}
          {chapter === 4 && <TermoGame />}
          {chapter === 5 && <Quiz />}
          {chapter === 6 && <Gallery />}
          {chapter === 7 && <FinalLetter onRestart={restart} />}
        </motion.div>
      </AnimatePresence>

      {/* ---------- Navegação entre capítulos ---------- */}
      {started && (
        <div className="absolute bottom-4 left-0 right-0 z-40 flex items-center justify-between px-5">
          <button
            onClick={prev}
            disabled={chapter <= 1}
            className="rounded-full border border-white/15 bg-black/50 px-5 py-2.5 text-sm font-semibold backdrop-blur disabled:opacity-30"
          >
            ← Voltar
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.25em] text-white/50">
            {CHAPTERS[chapter]}
          </span>
          <button
            onClick={next}
            disabled={chapter >= CHAPTERS.length - 1}
            className="rounded-full bg-neon px-5 py-2.5 text-sm font-bold text-ink shadow-neon disabled:opacity-30"
          >
            Próximo →
          </button>
        </div>
      )}

      {/* ---------- Player global persistente ---------- */}
      <AudioPlayer ref={audioRef} visible={started} />
    </div>
  );
}

import { motion } from "framer-motion";
import { couple } from "../data";

/* ============================================================
   Intro.tsx — tela inicial
   Fundo preto com "equalizador" de barras verticais neon,
   foto circular do casal, nomes e botão de início.
   ============================================================ */

interface Props {
  onStart: () => void;
}

/** Quantidade de barras do equalizador de fundo */
const BARS = 18;

export default function Intro({ onStart }: Props) {
  return (
    <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8 text-center">
      {/* ---------- Fundo: equalizador vertical neon ---------- */}
      <div className="absolute inset-0 flex items-end justify-between px-2 opacity-30">
        {Array.from({ length: BARS }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[3.5%] rounded-t-full bg-gradient-to-t from-neonDim to-neon"
            animate={{ height: ["12%", `${25 + ((i * 37) % 60)}%`, "18%", `${15 + ((i * 53) % 70)}%`, "12%"] }}
            transition={{
              duration: 2.2 + (i % 5) * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
      {/* Vinheta para dar profundidade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* ---------- Conteúdo ---------- */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Foto circular com anel neon pulsante */}
        <motion.div
          variants={{ hidden: { scale: 0, rotate: -20 }, show: { scale: 1, rotate: 0 } }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-neon/60"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <img
            src={couple.coverPhoto}
            alt={`${couple.name1} e ${couple.name2}`}
            className="h-40 w-40 rounded-full border-4 border-neon object-cover shadow-neon"
            onError={(e) => {
              // Fallback caso a foto não exista: gradiente com coração
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>

        {/* Eyebrow estilo Wrapped */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mb-3 font-display text-[10px] uppercase tracking-[0.4em] text-neon"
        >
          para sempre
        </motion.p>

        {/* Nomes do casal */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
          className="glow font-display text-4xl font-extrabold leading-tight"
        >
          {couple.name1}
          <span className="mx-2 text-neon">&amp;</span>
          {couple.name2}
        </motion.h1>

        {/* Subtítulo romântico */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-4 max-w-[260px] text-sm leading-relaxed text-white/70"
        >
          {couple.subtitle}
        </motion.p>

        {/* Botão de início — este clique também libera o áudio */}
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="btn-neon mt-10"
        >
          abra o presente 🎁
        </motion.button>
      </motion.div>
    </section>
  );
}

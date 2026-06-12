import { motion } from "framer-motion";
import { couple, wrappedStats } from "../data";

/* ============================================================
   WrappedStats.tsx — o "coração" do Wrapped
   Cards animados com data especial, dias juntos, estações,
   top 5 momentos, lugares, frases internas e músicas.
   A seção rola verticalmente (estilo feed de stories).
   ============================================================ */

/** Calcula o total de dias desde a data de início */
function daysTogether(): number {
  const start = new Date(couple.startDate + "T00:00:00");
  return Math.max(0, Math.floor((Date.now() - start.getTime()) / 86_400_000));
}

/** Estações do ano vividas juntos (~1 a cada 91 dias) */
function seasonsTogether(): number {
  return Math.max(1, Math.floor(daysTogether() / 91));
}

/** Variante padrão de entrada dos cards */
const cardIn = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

/** Card de lista "Top 5" reutilizável */
function TopList({
  title,
  emoji,
  items,
}: {
  title: string;
  emoji: string;
  items: string[];
}) {
  return (
    <motion.div
      variants={cardIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="wrapped-card"
      style={{ perspective: 600 }}
    >
      <p className="mb-4 font-display text-[10px] uppercase tracking-[0.3em] text-neon">
        {emoji} {title}
      </p>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 * i }}
            className="flex items-baseline gap-3"
          >
            <span className="font-display text-2xl font-extrabold text-neon">
              {i + 1}
            </span>
            <span className="text-sm leading-snug text-white/85">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

export default function WrappedStats() {
  const days = daysTogether();
  const seasons = seasonsTogether();

  return (
    <section className="no-scrollbar h-full overflow-y-auto px-5 pb-28 pt-16">
      {/* Título da seção */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow mb-6 text-center font-display text-2xl font-extrabold"
      >
        Nosso Wrapped 💚
      </motion.h2>

      <div className="space-y-5">
        {/* ---- Card: data especial ---- */}
        <motion.div
          variants={cardIn}
          initial="hidden"
          animate="show"
          className="wrapped-card border-neon/30 bg-gradient-to-br from-card to-neonDim/10 text-center"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-white/50">
            Tudo começou em
          </p>
          <p className="glow mt-2 font-display text-xl font-extrabold text-neon">
            {wrappedStats.specialDateLabel}
          </p>
        </motion.div>

        {/* ---- Card: dias juntos (número gigante, estilo Wrapped) ---- */}
        <motion.div
          variants={cardIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="wrapped-card overflow-hidden text-center"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-white/50">
            Dias juntos
          </p>
          <motion.p
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
            className="glow my-2 font-display text-7xl font-extrabold text-neon"
          >
            {days.toLocaleString("pt-BR")}
          </motion.p>
          <p className="text-xs text-white/60">
            …e cada um deles valeu a pena. ✨
          </p>
        </motion.div>

        {/* ---- Card: estações vividas ---- */}
        <motion.div
          variants={cardIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="wrapped-card flex items-center justify-between"
        >
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-white/50">
              Estações vividas
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold text-neon">
              {seasons}
            </p>
          </div>
          <div className="text-3xl">☀️</div>
        </motion.div>

        {/* ---- Tops ---- */}
        <TopList title="Top 5 momentos" emoji="🏆" items={wrappedStats.topMoments} />
        <TopList title="Top lugares" emoji="📍" items={wrappedStats.topPlaces} />
        
      </div>
    </section>
  );
}

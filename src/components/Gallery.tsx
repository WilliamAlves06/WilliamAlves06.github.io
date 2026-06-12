import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "../data";

/* ============================================================
   Gallery.tsx — galeria de fotos
   Carrossel com efeito polaroid, legendas personalizadas e
   "explosão" de corações sempre que a foto troca.
   ============================================================ */

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [burst, setBurst] = useState(0); // key para reiniciar os corações
  const photo = gallery[index];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + gallery.length) % gallery.length);
    setBurst((b) => b + 1); // dispara nova chuva de corações
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
      rotate: dir > 0 ? 12 : -12,
    }),
    center: { x: 0, opacity: 1, rotate: index % 2 === 0 ? -3 : 3 },
    exit: (dir: number) => ({
      x: dir > 0 ? -280 : 280,
      opacity: 0,
      rotate: dir > 0 ? -12 : 12,
    }),
  };

  return (
    <section className="relative flex h-full flex-col items-center px-6 pb-28 pt-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow text-center font-display text-2xl font-extrabold"
      >
        Nossa galeria 📸
      </motion.h2>
      <p className="mb-5 mt-1 text-center text-xs text-white/50">
        {index + 1} / {gallery.length}
      </p>

      {/* ---------- Corações ao trocar de foto ---------- */}
      <AnimatePresence>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={`${burst}-${i}`}
            className="pointer-events-none absolute z-20 select-none text-xl"
            style={{ left: `${15 + ((i * 31) % 70)}%`, top: "55%" }}
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              y: -140 - (i % 4) * 30,
              scale: 1,
              rotate: i % 2 ? 25 : -25,
            }}
            transition={{ duration: 1.6, delay: i * 0.07 }}
          >
            {i % 2 ? "💚" : "🤍"}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* ---------- Polaroid ---------- */}
      <div className="relative w-full max-w-[300px] flex-1" style={{ perspective: 900 }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.figure
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="absolute inset-x-0 top-2 mx-auto rounded-md bg-white p-3 pb-5 shadow-card"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="aspect-[6/7] w-full rounded-sm object-cover"
            />
            {/* Fita adesiva decorativa */}
            <span className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 rounded-sm bg-neon/70" />
            <figcaption className="mt-3 text-center font-body text-xs italic text-ink/80">
              “{photo.caption}”
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* ---------- Controles ---------- */}
      <div className="mt-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg"
        >
          ←
        </motion.button>
        <div className="flex gap-1.5">
          {gallery.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-neon" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => go(1)}
          aria-label="Próxima foto"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-lg text-ink shadow-neon"
        >
          →
        </motion.button>
      </div>
    </section>
  );
}

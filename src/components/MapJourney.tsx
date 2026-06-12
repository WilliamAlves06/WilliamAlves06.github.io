import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mapStops } from "../data";

/* ============================================================
   MapJourney.tsx — "Nossa Jornada no Mapa"
   ------------------------------------------------------------
   • Mapa estilizado do Brasil (SVG simplificado, traço neon)
   • Pontos marcantes do casal conectados por uma rota tracejada
   • FINAL CINEMATOGRÁFICO no Rio de Janeiro:
       - zoom suave no mapa (scale + translate até o ponto)
       - marcador em formato de coração pulsando
       - polaroid surgindo com a foto do casal
       - chuva de corações/partículas
       - texto romântico sobre o Rio
   ============================================================ */

/** Silhueta simplificada do Brasil (coordenadas em viewBox 0 0 100 100) */
const BRAZIL_PATH =
  "M38,8 L52,6 L60,12 L72,14 L80,24 L84,34 L80,44 L72,52 L70,62 L62,72 L56,84 L48,94 L42,86 L40,76 L34,70 L26,64 L20,54 L16,44 L20,34 L18,24 L26,18 L32,10 Z";

export default function MapJourney() {
  // Índice do destino atual (-1 = ainda não começou a viagem)
  const [step, setStep] = useState(-1);
  const finaleIndex = mapStops.findIndex((s) => s.isFinale);
  const current = step >= 0 ? mapStops[step] : null;
  const isFinale = !!current?.isFinale;

  /** Posições das partículas de coração do final (geradas uma vez) */
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: 8 + ((i * 53) % 84),
        delay: (i % 8) * 0.25,
        size: 14 + ((i * 7) % 18),
        duration: 3 + (i % 4) * 0.6,
      })),
    []
  );

  /** Zoom cinematográfico: ao chegar no destino final, escala o mapa
      e desloca a origem da transformação até o ponto do Rio. */
  const zoom = isFinale && current
    ? {
        scale: 2.6,
        x: `${(50 - current.x) * 2.6}%`,
        y: `${(50 - current.y) * 2.6}%`,
      }
    : { scale: 1, x: "0%", y: "0%" };

  return (
    <section className="relative flex h-full flex-col overflow-hidden px-5 pb-28 pt-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow mb-1 text-center font-display text-2xl font-extrabold"
      >
        Nossa jornada 🗺️
      </motion.h2>
      <p className="mb-3 text-center text-xs text-white/50">
        {step < 0
          ? "Cada ponto no mapa é um pedaço da nossa história."
          : current?.name}
      </p>

      {/* ---------- Mapa ---------- */}
      <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-coal shadow-card">
        {/* Grade de fundo, estilo radar */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#1DF27D 1px, transparent 1px), linear-gradient(90deg, #1DF27D 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Grupo com zoom animado */}
        <motion.div
          className="absolute inset-0"
          animate={zoom}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Silhueta do Brasil */}
            <motion.path
              d={BRAZIL_PATH}
              fill="rgba(29,242,125,0.06)"
              stroke="#1DF27D"
              strokeWidth="0.6"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Rota tracejada ligando os destinos já visitados */}
            {mapStops.slice(0, Math.max(step + 1, 1)).map((s, i) => {
              const prev = mapStops[i - 1];
              if (!prev || i > step) return null;
              return (
                <motion.line
                  key={s.name}
                  x1={prev.x}
                  y1={prev.y}
                  x2={s.x}
                  y2={s.y}
                  stroke="#1DF27D"
                  strokeWidth="0.5"
                  strokeDasharray="2 1.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1 }}
                />
              );
            })}

            {/* Pontos da jornada */}
            {mapStops.map((s, i) => {
              const visited = i <= step;
              const isHere = i === step;
              if (s.isFinale && isHere) {
                /* ---- Marcador de CORAÇÃO no destino final ---- */
                return (
                  <motion.g
                    key={s.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                  >
                    <motion.path
                      d={`M${s.x},${s.y + 2.4} C${s.x - 4},${s.y - 1.5} ${s.x - 2.2},${s.y - 4.2} ${s.x},${s.y - 1.8} C${s.x + 2.2},${s.y - 4.2} ${s.x + 4},${s.y - 1.5} ${s.x},${s.y + 2.4} Z`}
                      fill="#FF6FA5"
                      stroke="#fff"
                      strokeWidth="0.3"
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                    />
                  </motion.g>
                );
              }
              return (
                <g key={s.name}>
                  {isHere && (
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r="2"
                      fill="none"
                      stroke="#1DF27D"
                      strokeWidth="0.4"
                      animate={{ r: [2, 5], opacity: [0.9, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r="1.4"
                    fill={visited ? "#1DF27D" : "rgba(255,255,255,0.25)"}
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* ---------- Chuva de corações no final ---------- */}
        <AnimatePresence>
          {isFinale &&
            hearts.map((h, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute select-none"
                style={{ left: `${h.left}%`, fontSize: h.size }}
                initial={{ y: "110%", opacity: 0, rotate: -20 }}
                animate={{ y: "-20%", opacity: [0, 1, 1, 0], rotate: 20 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: h.duration,
                  delay: 1.4 + h.delay,
                  repeat: Infinity,
                }}
              >
                💚
              </motion.span>
            ))}
        </AnimatePresence>

        {/* ---------- Polaroid + texto romântico do destino ---------- */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.name}
              initial={{ y: 80, opacity: 0, rotate: isFinale ? -8 : 0 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: isFinale ? -3 : 0,
                transition: { delay: isFinale ? 1.8 : 0.2, type: "spring", stiffness: 120, damping: 14 },
              }}
              exit={{ y: 60, opacity: 0 }}
              className="absolute bottom-3 left-1/2 w-[78%] -translate-x-1/2 rounded-lg bg-white p-2 pb-3 shadow-card"
            >
              <img
                src={current.photo}
                alt={current.name}
                className="h-28 w-full rounded-sm object-cover"
              />
              <p className="mt-2 px-1 text-center font-display text-[10px] font-bold uppercase tracking-wider text-ink">
                {isFinale ? "❤️ " : "📍 "}
                {current.name}
              </p>
              <p className="px-1 text-center text-[11px] leading-snug text-ink/70">
                {current.caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Controle da viagem ---------- */}
      <div className="mt-4 flex justify-center">
        {step < mapStops.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="btn-neon px-6 py-3 text-xs"
          >
            {step < 0
              ? "Iniciar viagem ✈️"
              : step + 1 === finaleIndex
                ? "Destino final… 💚"
                : "Próximo destino →"}
          </button>
        ) : (
          <button
            onClick={() => setStep(-1)}
            className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold text-white/70"
          >
            Refazer a viagem 🔁
          </button>
        )}
      </div>
    </section>
  );
}

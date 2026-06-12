import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { music } from "../data";

/* ============================================================
   AudioPlayer.tsx — player global e persistente
   ------------------------------------------------------------
   • Vive fora dos capítulos (montado uma única vez no App),
     então a música NÃO reinicia ao trocar de seção.
   • Botão flutuante fixo de play/pause.
   • Suporta dois modos (configurados em data.ts):
       - "mp3": toca um <audio> local (/public/audio/...)
       - "spotify": renderiza o embed oficial do Spotify

   ⚠️ SOBRE O SPOTIFY E AUTOPLAY:
   O Spotify NÃO permite autoplay completo no embed. Por política
   da plataforma (e pelas regras de autoplay dos navegadores —
   Chrome/Safari bloqueiam áudio sem gesto do usuário), o iframe
   só toca depois que a pessoa clica no play DENTRO do player do
   Spotify, e contas free ouvem apenas um preview de 30s.
   O modo "mp3" contorna isso: como o play() é disparado pelo
   clique no botão "Começar nossa retrospectiva", o navegador
   entende como interação válida e o áudio toca normalmente.
   ============================================================ */

export interface AudioPlayerHandle {
  play: () => void;
  pause: () => void;
}

interface Props {
  visible: boolean;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, Props>(({ visible }, ref) => {
  const audioEl = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  /** Converte URL normal do Spotify em URL de embed */
  const spotifyEmbed = music.spotifyTrackUrl.replace(
    "open.spotify.com/",
    "open.spotify.com/embed/"
  );

  useImperativeHandle(ref, () => ({
    play: () => {
      if (music.mode === "mp3") {
        const el = audioEl.current;
        if (!el) return;
        el.volume = music.volume;
        // play() pode falhar se o arquivo não existir — tratamos em silêncio
        el.play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      } else {
        // Spotify: só podemos EXIBIR o player; o play é gesto do usuário
        setShowSpotify(true);
      }
    },
    pause: () => {
      audioEl.current?.pause();
      setPlaying(false);
    },
  }));

  const toggle = () => {
    if (music.mode === "spotify") {
      setShowSpotify((s) => !s);
      return;
    }
    const el = audioEl.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* Elemento de áudio invisível (modo mp3) */}
      {music.mode === "mp3" && (
        <audio ref={audioEl} src={music.mp3Src} loop preload="auto" />
      )}

      {/* Botão flutuante fixo de play/pause */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            whileTap={{ scale: 0.85 }}
            onClick={toggle}
            aria-label={playing ? "Pausar música" : "Tocar música"}
            className="absolute right-4 top-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-neon/40 bg-black/70 text-lg shadow-neon backdrop-blur"
          >
            {/* Equalizadorzinho animado quando tocando */}
            {playing ? (
              <span className="flex h-4 items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-neon"
                    animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </span>
            ) : (
              <span className="text-neon">▶</span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Embed do Spotify (modo spotify) */}
      <AnimatePresence>
        {music.mode === "spotify" && showSpotify && visible && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            className="absolute bottom-20 left-3 right-3 z-50 overflow-hidden rounded-2xl shadow-card"
          >
            <iframe
              title="Nossa música no Spotify"
              src={`${spotifyEmbed}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default AudioPlayer;

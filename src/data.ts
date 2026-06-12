/* ============================================================
   data.ts — TODOS os conteúdos editáveis do Wrapped do Casal
   ------------------------------------------------------------
   Edite este arquivo para personalizar o site inteiro:
   nomes, datas, fotos, lugares, perguntas, palavras do Termo,
   música, carta final etc. Nenhum outro arquivo precisa mudar.
   ============================================================ */

/** Foto placeholder: troque pelas suas fotos (URLs ou /public/...) */
const ph = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const couple = {
  name1: "William",
  name2: "Laura",
  /** Foto circular da tela inicial — troque por "/fotos/capa.jpg" por ex. */
  coverPhoto: "/fotos/intro capa.jpeg",
  subtitle: "feliz dia dos namorados meu amor! 💚",
  /** Data em que tudo começou (usada para calcular dias juntos) */
  startDate: "2026-03-14",
};

/* ---------------- MÚSICA DE FUNDO ----------------
   mode: "mp3"     → toca o arquivo em /public/audio/nossa-musica.mp3
   mode: "spotify" → mostra um embed do Spotify (veja AudioPlayer.tsx)

   ⚠️ IMPORTANTE: o Spotify NÃO permite autoplay completo via embed.
   O iframe só toca após o usuário interagir com o player do próprio
   Spotify (política da plataforma + bloqueio de autoplay dos browsers).
   Por isso o modo "mp3" dá a experiência mais fluida. */
export const music = {
  mode: "mp3" as "mp3" | "spotify",
  mp3Src: "/audio/nossa-musica.mp3",
  spotifyTrackUrl: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC",
  volume: 0.6,
};

/* ---------------- WRAPPED / ESTATÍSTICAS ---------------- */
export const wrappedStats = {
  specialDateLabel: "14 de março de 2026",
  topMoments: [
    "Nossos treinos ",
    "Nossos chamegos assistindo um filme aleatório",
    "Nossas saídas pra comer juntos 🍽️",
    "Noite da massinha de modelar",
    "Dia da pintura de quadros",
  ],
  topPlaces: [
    "No seu abraço",
    "Evento do Van Gogh",
    "Restaurante mexicano",
    "Rio de Janeiro",
  ],
  topQuotes: [
    "“Tá com fome? Eu também.”",
    "“Cinco minutinhos e eu levanto.”",
    "“Nosso filme favorito é qualquer um, juntos.”",
    "“Você é meu lugar preferido.”",
  ],
  topSongs: [
  
  ],
};

/* ---------------- LINHA DO TEMPO ---------------- */
export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  emotion: string; // emoji + palavra
  photo: string;
}

export const timeline: TimelineItem[] = [
  {
    date: "09/02/2026",
    title: "O começo de tudo",
    description:
      "primeiro dia que vc viu seu nego forte e musculoso",
    emotion: "🦋 I Love u",
    photo: "/fotos/primeiro treino.jpeg",
  },
  {
    date: "21/04/2026",
    title: "SP/RJ",
    description:
      "pesquei essa sereia na praia, e não larguei",
    emotion: "praieiros 🌊",
    photo: "/fotos/praia.jpeg",
  },
];

/* ---------------- MAPA DA JORNADA ----------------
   Coordenadas em % do SVG do mapa (x: 0–100, y: 0–100). */
export interface MapStop {
  name: string;
  x: number;
  y: number;
  caption: string;
  isFinale?: boolean; // destino especial (animação cinematográfica)
  photo: string;
}

export const mapStops: MapStop[] = [
  {
    name: "Rio de Janeiro",
    x: 62,
    y: 68,
    caption:
      "a viagem mais feliz da minha vida foi essa, vc deixando todas as paisagens mais bonitas",
    isFinale: true,
    photo: "/fotos/rio de janeiro.jpeg",
  },
];

/* ---------------- TERMO (mini Wordle) ----------------
   Palavras de 5 letras, sem acento, em MAIÚSCULAS. */
export const termo = {
  words: ["PRAIA"],
  maxTries: 6,
  winMessage:
    "Você acertou! 💚",
  loseMessage:
    "Não foi dessa vez… mas relaxa: o que importa a gente já ganhou — um ao outro. 😌💚",
};

/* ---------------- QUIZ DO CASAL ---------------- */
export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export const quiz: QuizQuestion[] = [
  {
    question: "Onde foi o nosso primeiro encontro?",
    options: ["na academia", "Na cafeteria", "No parque", "no japa"],
    answerIndex: 0,
  },
  {
    question: "Qual cidade ganhou nossa animação especial no mapa?",
    options: ["Floripa", "Rio de Janeiro", "Tocantins", "Salvador"],
    answerIndex: 1,
  },
  {
    question: "Primeiro alimento que comemos juntos?",
    options: ["Pipoca", "Açaí", "bolo", "sorvete"],
    answerIndex: 1,
  },
];

export const quizMessages = {
  perfect: "Gabaritou! ganhou quantos beijinhos quiser 💚🏆",
  good: "Errou mas mandou bem, vai ganhar beijinhos 😍",
  ok: "como assim vc errou?! Mas errou poucas..(me deve beijinhos)😉",
  low: "trate de me dar beijinhos agora😂❤️",
};

/* ---------------- GALERIA ---------------- */
export interface GalleryPhoto {
  src: string;
  caption: string;
}

export const gallery: GalleryPhoto[] = [
  { src: "/fotos/primeiro treino.jpeg", caption: "Primeiro treino juntos 💪" },
  { src: "/fotos/praia.jpeg", caption: "Praieiro e Praieira 🌊" },
  { src: "/fotos/pintura de quadros.jpeg", caption: "Nossos quadros, nossa arte 🎨" },
  { src: "/fotos/evento do vangogh.jpeg", caption: "Van Gogh ✨" },
  { src: "/fotos/evento do vangogh 2.jpeg", caption: "Deixamos o ambiente 2X mais lindo 🖼️" },
  { src: "/fotos/show_vidara_cultural.jpeg", caption: "Dia que vc fez eu virar fã da Marina Sena 🎶" },
  { src: "/fotos/foto no  shopping.jpeg", caption: "Filminho no shopping 🛍️" },
  { src: "/fotos/casamento.jpeg", caption: "como vc estava linda no casamento 💚" },
];

/* ---------------- CARTA FINAL ---------------- */
export const finalLetter = {
  title: "para o meu cristal",
  paragraphs: [
    "Você, pra mim, é matéria rara. O mundo lá fora é opaco, barulhento, cinza de concreto — e aí você entra no cômodo e tudo ganha brilho, como se a vida ligasse a claridade só pra te receber. Tem dia que eu tô quebrado, amargo, brigado com o espelho. Aí você olha pra mim e eu fico limpo. Não sei explicar a química disso. Só sei que ninguém mais faz.",
    
    "Feliz Dia dos Namorados, meu amor. Você é o sol. Eu sou só o cristal que aprendeu a brilhar porque você apontou luz pra ele. Inteiro seu, hoje e nas próximas vidas.",
  ],
  signature: "Com amor, para sempre — eu. 💚",
};

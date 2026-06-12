# 💚 Wrapped do Casal

Um site-presente romântico, mobile-first, inspirado nas retrospectivas musicais
modernas: tema escuro, neon verde, cards arredondados, navegação por capítulos
estilo *stories* e animações fluidas com Framer Motion.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Abra o endereço exibido (geralmente `http://localhost:5173`) — de preferência
no celular ou no modo responsivo do navegador.

## 🎵 Música de fundo

Edite `src/data.ts`:

- **Modo MP3 (recomendado)** — coloque seu arquivo em
  `public/audio/nossa-musica.mp3` e use `mode: "mp3"`. A música começa a tocar
  ao clicar em "Começar nossa retrospectiva" e persiste entre as seções.
- **Modo Spotify** — use `mode: "spotify"` e cole o link da faixa em
  `spotifyTrackUrl`. ⚠️ O Spotify **não permite autoplay completo** no embed:
  por política da plataforma e pelas regras de autoplay dos navegadores, o
  usuário precisa apertar o play dentro do player do Spotify (e contas free
  ouvem apenas 30s de preview).

## ✏️ Personalização

**Tudo** que é texto, data, foto, lugar, pergunta ou palavra fica em
`src/data.ts`: nomes do casal, data de início, estatísticas do Wrapped, linha
do tempo, paradas do mapa (com o destino especial no Rio de Janeiro 💚),
palavras do Termo, perguntas do quiz, fotos da galeria e a carta final.

As fotos usam placeholders (`picsum.photos`) — basta trocar pelas suas URLs ou
por arquivos em `public/` (ex.: `"/fotos/nos.jpg"`).

## 🗂️ Estrutura

```
src/
├── App.tsx                 # Orquestra os capítulos + navegação stories
├── data.ts                 # ✏️ TODOS os conteúdos editáveis
└── components/
    ├── Intro.tsx           # Tela inicial com equalizador neon
    ├── AudioPlayer.tsx     # Player global persistente (MP3/Spotify)
    ├── WrappedStats.tsx    # Cards de estatísticas animados
    ├── Timeline.tsx        # Linha do tempo com cards 3D
    ├── MapJourney.tsx      # Mapa estilizado + final cinematográfico no Rio
    ├── TermoGame.tsx       # Mini-game estilo Termo/Wordle
    ├── Quiz.tsx            # Quiz do casal com pontuação
    ├── Gallery.tsx         # Carrossel polaroid com corações
    └── FinalLetter.tsx     # Envelope animado + carta romântica
```

Feito com 💚 — React + Vite + TailwindCSS + Framer Motion.

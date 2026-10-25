# Simo-Magnus · Portfolio

Portfolio personale di Simo-Magnus: progetti, competenze e contatti.
React 19 + TypeScript + Vite + Tailwind CSS 4, React Router per le pagine dei progetti.
Nessun backend, nessun cookie, nessun tracciamento.

## Comandi

Richiede Node.js 20 o successivo (installato: Node 24 LTS).

```bash
npm install        # installa le dipendenze
npm run dev        # server di sviluppo su http://localhost:5173
npm run build      # controllo TypeScript + build di produzione in dist/ + pagine statiche
npm run preview    # serve la build di produzione su http://localhost:4173
npm run test       # test (Vitest + Testing Library)
npm run lint       # analisi statica (oxlint)
npm run check      # lint + test + build in un colpo solo
```

## Lingue

Il sito è in inglese alla radice (`/`) e nelle altre lingue con un prefisso (`/it/`, poi `/fr/` e `/es/`).
I testi stanno in `src/i18n/locales/<lingua>.ts`, tutti con la stessa forma (TypeScript e i test segnalano
le chiavi mancanti); le lingue si attivano in `src/i18n/config.ts`. Il selettore nel riquadro in alto a destra
porta alla stessa pagina nell'altra lingua, e il build genera per ogni lingua pagine statiche con `lang`,
titoli tradotti e collegamenti `hreflang`.

Per rivedere i testi: `npm run texts:export` crea `TESTI_PORTFOLIO.md` (italiano) con un codice per ogni testo.

## Dove modificare i contenuti

I testi stanno nei file delle lingue; `src/data/` contiene solo struttura e configurazione.

| File | Contenuto |
|---|---|
| `src/i18n/locales/*.ts` | Tutti i testi, una lingua per file |
| `src/data/site.ts` | URL, email, social, tema predefinito, blocchi di "Chi sono" da mostrare |
| `src/data/projects.ts` | Progetti senza testi: categorie, stato, tecnologie, colori, immagini, link |
| `src/data/skills.ts` | Competenze per categoria (id delle tecnologie) |
| `src/data/technologies.ts` | Catalogo di marchi e competenze (icona; i nomi non di marca si traducono) |
| `src/data/brandIcons.ts` | Icone dei marchi (da [Simple Icons](https://simpleicons.org), CC0) |

Regole utili:

- un social con `url: null` non viene mostrato;
- un blocco di "Chi sono" impostato a `false` in `site.ts` (formazione, località…) resta nascosto;
- una competenza con `visible: false` è nascosta; una categoria senza voci visibili sparisce;
- i commenti `[DA COMPLETARE]`, `[DA CONFERMARE]` e `[DA RIVEDERE]` segnano i dati da verificare;
- `showPlaceholders: true` mostra i riquadri "Da completare" e le cornici "Screenshot in arrivo".
  **Impostalo a `false` prima di pubblicare.**

### Aggiungere un progetto

1. Metti logo, copertina e screenshot in `src/assets/projects/<slug>/` (WebP o SVG, screenshot reali).
2. Aggiungi un oggetto a `projectData` in `src/data/projects.ts` (il tipo `ProjectData` in
   `src/types/content.ts` documenta ogni campo) e i suoi testi in `projects.<slug>` di ogni lingua.
   Ogni progetto ha un proprio `theme` di colori.
3. Le tecnologie citate devono esistere in `src/data/technologies.ts`.
4. `npm run check`: i test verificano slug, categorie, tecnologie e link.

## Struttura

```
src/
  components/   elementi riutilizzabili (header, footer, card, icone, pulsanti…)
  sections/     sezioni della home (Hero, Projects, About, Skills, Contact)
  pages/        HomePage, ProjectPage (/progetti/:slug), NotFoundPage
  data/         contenuti e configurazione
  hooks/        tema, sezione attiva, animazioni di comparsa, metadati della pagina
  lib/          logica pura (validazione e mailto del modulo contatti)
  styles/       design system (token colore, tema chiaro/scuro, componenti CSS)
  assets/       immagini del brand e dei progetti
  types/        tipi TypeScript dei contenuti
scripts/postbuild.mjs   pagine HTML per progetto, 404.html, sitemap.xml, robots.txt
public/                 favicon, icone, immagine Open Graph, manifest
```

## Design system

`src/styles/index.css` segue l'impianto di Design 3 (fondo a strati con grana, un unico materiale
per le card con filo di luce e faretto, filigrana dell'area al posto delle icone nei riquadri, barra di
navigazione in vetro), con colori e font del portfolio:

- **Blu elettrico** (`#2D8CF5 → #0A6FE8 → #0858BC`): solo l'azione dell'utente, una sola primaria per vista.
- **Ciano** (`#20D9F5`, su chiaro `#0E7490`): ciò che "fa la macchina": stati, voce attiva, filtri, filo di luce.
- **Viola** (`#8B7CFF`): tinta di supporto, mai per un'azione.
- **Navy / bianco ghiaccio / grigio freddo**: fondo e testi (tema scuro e "mattina limpida").
- **Font**: Inter (testi), Inter Tight (titoli), Geist Mono (etichette e dati), tutti in locale.
- **Scale**: testo 11 · 13 · 15 · 17 · 22 · 34 · 48 (`text-11` … `text-48`), pesi 300 · 400 · 600 · 700,
  raggi 10 · 14 · 22 · 28 · pillola.

Classi principali: `surface`, `surface-inner`, `glass`, `is-active`, `btn btn-primary`, `btn btn-secondary`,
`card-title`, `label`, `watermark`, `field`. La foto di Torino è di thapanee srisawat su Unsplash (licenza Unsplash).

## Modulo contatti

Il sito non ha un backend: alla conferma il modulo valida i campi e apre il programma di posta
dell'utente con un'email già compilata (`mailto:`), senza salvare né inviare dati.

Per un invio diretto in futuro si può collegare un servizio di form statici (es. Formspree, Web3Forms):
basta sostituire, in `src/sections/Contact.tsx`, la riga con `buildMailto` con una `fetch` verso
l'endpoint del servizio. L'endpoint è pubblico per natura: non inserire mai chiavi segrete nel frontend.

## Pubblicazione su GitHub Pages (quando sarà il momento)

Il sito è pensato per `https://simo-magnus.github.io` (repository `Simo-Magnus/Simo-Magnus.github.io`).
Il workflow `.github/workflows/deploy.yml` esegue test e build a ogni push su `main` e pubblica `dist/`.

1. `showPlaceholders: false` in `src/data/site.ts` e dati personali completati.
2. Crea il repository `Simo-Magnus.github.io` e caricaci il progetto.
3. Nelle impostazioni del repository: *Settings → Pages → Source: GitHub Actions*.

Le pagine dei progetti sono file HTML statici (`/progetti/<slug>/`) con titolo, descrizione e
anteprima social dedicati; gli indirizzi inesistenti mostrano la pagina 404 dell'app.
Se il repository avesse un altro nome (sito in `/<nome>/`), cambia `base` in `vite.config.ts` e `url`
in `src/data/site.ts`.

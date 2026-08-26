# Site audit — fixes from this run

Full review of all content (IT + EN), templates, config and built output.
`zola check` and `zola build` pass after every change. Nothing committed.

## 1. Translation errors

- **EN homepage had broken links.** `[who am i](/en/who-am-i/)` etc. rendered as
  root-absolute paths (`/en/who-am-i/`) without the `/portfolio` base path — they
  would 404 on GitHub Pages. Replaced with Zola internal links
  (`@/who-am-i/_index.en.md`, …) like the IT homepage uses; they now resolve to
  full URLs.
- **The lua-plugins project had no working language switch.** The IT file was
  `04-lua-plugins-nvim.md` and the EN file `04-lua-plugins.en.md`: Zola pairs
  translations by identical basename, so these two were never paired — the
  lang-switcher on both pages showed no link to the other language. Renamed the
  IT file to `04-lua-plugins.md`.
  ⚠️ Side effect: the IT page URL changed from
  `/projects/04-lua-plugins-nvim/` to `/projects/04-lua-plugins/`.
  Verified afterwards: every page on the site now has both IT and EN links in
  the switcher.
- **Italian experiences section had an English title** (`experiences`), which
  leaked into the browser tab title. Now `esperienze`.
- **English possessive on Italian pages**: the list-page `<title>` rendered
  "Mattia Marini's esperienze". Now "Mattia Marini — esperienze" (same pattern
  as the who-am-i pages, in both languages).
- **404 page was English-only** with the old header (unlocalized nav names, no
  lang-switcher). It now inherits the standard header and its body is in
  Italian (the site's default language).
- **Untranslated Italian in EN text**: "the Liceo Scientifico opzione Scienze
  Applicate Bertrand Russell" → "the **Bertrand Russell** Scientific High
  School (Applied Sciences track)".
- **EN subtitle mistranslation** (d.r.o.n.e): "Simulated drone network over TCP."
  dropped the "TCP-like" of the Italian → "Simulated drone network over
  TCP-like protocol".
- **Olympiad name inconsistent between pages**: who-am-i said "Italian Olympiad
  in Informatics", experiences said "Italian Informatics Olympiad". Unified to
  the latter (fewer occurrences to change).

## 2. Italian fixes

- "neuroscience" → "neuroscienze" (English word left in Italian text).
- "ipergrafi pesanti e non" → "pesati" (pesante = heavy, not weighted) — you
  fixed this one in your editor while I was auditing; included here for the record.
- "attività extracurriculari" → "extracurricolari".
- "ricerca in ambito di ipergrafi" → "ricerca sugli ipergrafi".
- "sincronizzazione seamless" → "sincronizzazione trasparente" (English word in
  Italian text).
- "utilità da terminale" → "strumenti da terminale" (calque of "utilities").
- "che copre calculus, algebra lineare" → "che copre analisi, algebra lineare".
- who-am-i: "ad un marcato interesse" → "a un marcato interesse"; added the
  missing full stop after "didattica individuale".
- who-am-i heading "Linguaggi" → "Linguaggi di programmazione" (parallel to the
  EN "Programming languages", no longer ambiguous next to "Lingue").
- who-am-i: "c1 — avanzato/advanced" → "C1 —" (CEFR levels are uppercase).
- Exam table (formazione accademica): grade "AP" normalized to "Approvato",
  consistent with the other pass entries ("Approvato", "Idoneo" — the latter is
  the proper term for idoneità exams, left as is).

## 3. English fixes

- "I have been attending the Bachelor's degree" → "pursuing a Bachelor's
  degree" (calque of "frequentare").
- "all curriculum exams" → "all curricular exams".
- "Interaction and meeting organization with champions…" → "Organizing and
  attending meetings with champions…".
- "potential publications in field journals" → "in journals in the field".
- "The tech stack used is broadly the following" → "The technology stack is the
  following".
- "notes for high school tutoring and bachelor students" → "notes for tutoring
  high school and university students".
- Exam table: grade "AP" normalized to "Pass" (consistent with the other rows).

## 4. Bugs

- **robots.txt pointed the sitemap to the original theme author's site**
  (`p0w3r.gitlab.io/sitemap.xml`). Now uses `{{ get_url(path="sitemap.xml") }}`
  → your actual sitemap.
- **who-am-i bronze-medal link pointed to the 2021 (XXI) edition** while the
  experiences page consistently says the medal was won at the XXII edition
  (2022). Updated the link to `olimpiadi-italiane-2022/` (verified it exists).
  ⚠️ Please double-check this against your actual result.

## 5. Highlighting added (code style, no overdoing)

- `Lua` and `LaTeX` in the lua-plugins page (both languages).
- `Thymeleaf`, `WebSocket`, `H2` in the matchweb page (both languages), next to
  the existing `Spring`/`Spring Boot`/`HTML`/`CSS`/`JavaScript`.
- `<code>Rust</code>` in the who-am-i intro (both languages).
- Consistency: removed trailing periods from all 12 project subtitles — the
  experiences subtitles are period-less fragments, now projects match.
- Left alone: tech anglicisms that are standard in Italian tech writing
  (*motif*, *problem solving*, *open-source*, "tool CLI", "protocollo custom").

## 6. Verified OK (no action needed)

- All `latex-workspace` GitHub links: the organization exists and contains
  every referenced repository (ripetizioni, analisi-1, calcolatori, oii,
  palestra-algoritmi, probabilita-statistica, …).
- `github.com/rhyperx` is a real organization (contains the Rust repo
  `rhx-python`) — but see open question below.
- All `@/` internal links and the olimpiadi-informatica.it links resolve
  (zola check validates internal links; external ones were fetched).

## 7. Open items — to discuss

1. **Feeds are effectively broken.** `generate_feeds = true` produces an
   atom.xml that is **empty** (no page has a `date` in its frontmatter, and
   Zola only feeds dated pages), no EN feed is generated at all (non-default
   languages don't inherit `generate_feeds`), the `<link rel="alternate">`
   autodiscovery tags in the `<head>` render nothing (the
   `config.generate_feeds` check doesn't pass in current Zola templates), and
   the footer "◦ subscribe" link points to that empty feed. Options:
   (a) drop feeds entirely (remove the footer link and `generate_feeds`), or
   (b) make them work: add `date` to every page + `[languages.en]
   generate_feeds = true` + fix the head block. Needs a decision on which
   dates to use (the `top-right` ranges like "2022 - 2026" are not dates).
2. **Footer "subscribe" is English on Italian pages** — tied to the feeds
   decision above (if feeds stay, it should be "iscriviti" on IT pages).
3. **Dead code from the original theme**: `templates/default.html` is never
   used (Zola's default page template is `page.html`; no content asks for
   `default.html`), and `#icecast` in the CSS refers to a feature you don't
   have. Both could be deleted.
4. **rhyperx project link** points to the org page (github.com/rhyperx) rather
   than a specific repository (rhx-python). Intentional, or should it link the
   repo directly?
5. **Minor typography**: date ranges use hyphens ("2025 - 2026"); en-dashes
   ("2025 – 2026") would be typographically nicer. Cosmetic, your call.
6. **who-am-i photo attributes**: `width="300" height="325"` on the `<img>`
   vs `300×355` in the CSS. Harmless (CSS wins, `object-fit: cover`), but the
   attributes could be updated to 300×355 to remove the layout-shift hint
   mismatch.

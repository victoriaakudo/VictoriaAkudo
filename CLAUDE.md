@AGENTS.md

# Victoria Akudo — Portfolio (project state)

Animation-heavy, content-driven designer portfolio for **Victoria Akudo**. Backend
is not ready, so **all content comes from local mock JSON through a swap-ready data
layer**. Must be polished and smooth on mobile.

## Working agreement (IMPORTANT — follow every time)
- **Explain / plan first, then wait for an explicit go-ahead** before changing code.
- **For data migrations: show the proposed JSON and WAIT** before writing.
- During a migration, touch **only the named project** — never other projects or
  components unless asked. **Reuse existing copy verbatim.**
- Verify after changes: `npx tsc --noEmit`, then
  `cd /Users/admin/Vicky-portfolio && npx eslint src --max-warnings=0`, then
  `npm run build`. (Shell cwd resets between Bash calls — always `cd` first for eslint.)

## Stack & conventions
- **Next.js 16.2.9 App Router**, React 19, TypeScript strict, **Tailwind v4**
  (tokens via `@theme` in `src/app/globals.css` — there is **no** tailwind config file).
- `@/*` alias → `./src/*`; `resolveJsonModule` enabled.
- Only these libs installed on purpose: `gsap`, `@gsap/react`, `lenis` (smooth scroll),
  plus `lucide-react` (icons) and Fontshare fonts (added later with approval).
- Project lives in `/Users/admin/Vicky-portfolio` (npm package name `vicky-portfolio`;
  the dir has capitals so the package was scaffolded lowercase then moved up). Not a git repo.

## Animations (GSAP — pass in progress)
- **Pattern (reuse for every page):** animated components are `"use client"` + `@gsap/react`
  `useGSAP(() => {…}, { scope: rootRef })`; wrap all tweens in
  `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", …)` so reduced-motion
  users get the final state (use `gsap.from`/`autoAlpha` — no FOUC since useGSAP runs in a
  layout effect). ScrollTrigger is already Lenis-wired (shared RAF + `lenis.on("scroll",
  ScrollTrigger.update)`); register it per component (`gsap.registerPlugin(ScrollTrigger)`).
  Card image frames use `aspect-[…]` so heights are reserved → ScrollTrigger positions stay
  put on image load.
  **Strict-Mode gotcha — use `fromTo` (explicit end state) for ALL reveals, not `from`.**
  Strict Mode (dev) double-invokes the effect; if a `from` gets interrupted mid-play, the
  re-run records the half-faded value as the "natural" end → the element stays hidden. It
  bit the Hero CTA (on-load) AND the testimonials "More about me" link (scroll-triggered,
  the later-staggered element got caught) — so scroll-triggered is NOT immune. All landing
  reveals now use `fromTo(from, {…explicit end…})`.
- **Case studies (`useCaseStudyMotion(rootRef)` hook, `case-study/`):** shared scroll
  motion via `data-*` hooks — **hero no longer pins/overlaps** (removed the `xl:sticky` +
  `xl:-mt-[280px]` straddle and the `[data-hero-sink]` drift — hero is plain `relative`, banner
  sits at its bottom via `pt-14 pb-16`; the `data-hero-sink` attr is now a harmless no-op),
  `[data-hero-in]` (on-load stagger), `[data-panel]` (curtain clip-reveal + drift
  parallax on image figures), `[data-reveal]` (text fade-up), `[data-count]` (metric
  count-up). Each bespoke component: `"use client"` + `root` ref + `useCaseStudyMotion(root)`
  + the attrs. **Also restructured the section bands**: `SECTION`/`GoalSECTION` are full-bleed
  (bg + py), `TEXT` = `mx-auto max-w-[1300px] px-6 md:px-8` (copy centered at 1300), `IMG` =
  `px-6 md:px-8` (panels run full-bleed, wider than text). **DONE on all 5** (LoanCaseStudy =
  the reference; design-system / events / quickly / spondit replicate the same restructure +
  hooks). Hero titles do NOT use `whitespace-nowrap` (it overflowed on long titles — up to 41
  chars — so they wrap when they can't fit). **All case-study images capped at `max-w-[1300px]`
  via each file's `IMG` constant; section backgrounds + the two showcase videos (loan demo,
  design-system walkthrough) stay full-bleed.** `[data-hero-banner]` = the hero image's gentle settle (`scale 1.16→1`, `-14%→0`,
  top origin, clipped by an `overflow-hidden rounded-[40px]` frame). Count-up reads its target
  from the React-owned `data-count="…"` attribute, NOT textContent — the tween mutates the text
  and Strict Mode re-runs the effect, so a text read would count 0→0.
- **Landing DONE** (`Hero`, `SelectedProjects`, `ProjectCard`, `Testimonials`,
  `TestimonialScroller` — all now client): Hero title "type-spreads" (animate SVG
  `textLength` 720→1240) then roles/intro/CTA stagger up (on load). SelectedProjects header
  slides in (heading from left, intro from right). Each `ProjectCard` = curtain clip-reveal
  (`clipPath inset(100%…)`) + label rise + scrubbed in-frame **parallax** (`imgWrap`
  scaled 1.15, `yPercent -7→7`). Testimonials header + cards stagger in (native scroll kept).

## Smooth scroll
- Lenis + GSAP ScrollTrigger driven by a **single shared RAF**.
- `src/components/SmoothScroll.tsx`: registers a GSAP ticker that reads
  `lenisRef.current?.lenis` **lazily inside the ticker callback** (reading it eagerly
  early-returned and broke trackpad scrolling). Keyboard scroll via `lenis.scrollTo`.
- **Stale-limit fix**: a `ResizeObserver` on `document.body` (+ `window "load"`) calls
  `lenis.resize()` on any height change. Without it, large case-study images loading in
  after Lenis' first measurement left the scroll limit too short → the page "stopped"
  just before the true bottom until a manual refresh.
- **Image CLS fix (done)**: `ImageRef` gained optional `width?/height?`; a script populated
  real pixel dims for all 62 case-study image refs in `projects.json` (from `sips`), and
  the `Panel`/gallery renderers use `image.width ?? …`. Images now reserve correct height
  up front — no load-time jump. (`ImageRef.width/height` is intrinsic px; not to be
  confused with the image *block's* `width:"inset"|"full"|"bleed"` hint.)

## Fonts & brand tokens
- Fonts: **Inter** (`--font-sans`, next/font/google), **Cabinet Grotesk**
  (`--font-cabinet` → `font-display`, self-hosted), **Satoshi** (`--font-satoshi`,
  self-hosted). Self-hosted woff2 + LICENSE files in `src/app/fonts/` (Fontshare, ITF Free).
- Brand colors (in `globals.css` `@theme`): background `#F5F8DE`, foreground `#000000`,
  muted `#888888`, brand `#5C3111`, accent `#C57B57`, footer `#331B17`.
- Accent contrast: derive text color from accent tint **in components** via
  `src/lib/accent.ts` `onAccent(hex)` — not in data.

## Data layer (the backend swap point)
- `src/lib/types.ts` — single source of truth for shapes (`Project`, `ProjectSections`,
  `Section`, `Metric`, `ImageRef`, `Interaction`, `Service`/`ProcessStep`, `Resume`,
  `Testimonial`, `About`, `SiteConfig`).
- `src/lib/data.ts` — async getters (`getProjects`, `getProject`, `getNextProject`,
  `getInteractions`, `getServices`, `getProcessSteps`, `getResume`, `getTestimonials`,
  `getAbout`, `getSiteConfig`). **Components read ONLY through these** — never import JSON
  directly. Swapping to a real API = change function bodies only.
- `src/lib/figma.ts` — `toFigmaEmbedUrl()` (proto link → embed.figma.com iframe src).
- `src/data/*.json` — 7 mock files: `projects.json`, `interactions.json`,
  `testimonials.json`, `services.json`, `resume.json`, `about.json`, `site.json`.

### ContentBlock model (case-study content)
`Section.blocks?: ContentBlock[]` (additive). Discriminated union on `kind`:
`text{heading?,paragraphs[]}`, `quote{text}`, `bullets{heading?,items[]}`,
`image{image,width?:"inset"|"full"|"bleed"}`,
`video{src,poster?,caption?,loop?,autoplay?,muted?}`, `audio{src?,caption?}`,
`gallery{images[],columns?,caption?}`,
`marquee{images[],pauseOnHover?,caption?}`, `metrics{metrics[]}`.
(`quote` = pull-quote; `gallery.caption` = shared caption under the grid — added for
Events. `audio` = added for Quickly; renders a muted-speaker + bars placeholder when
`src` is absent. `BlockRenderer` has `quote` + `audio` cases so the generic template
stays exhaustive.) **`ProjectSections` also gained `collaboration?` + `challenges?`**
optional keys for longer case studies (Quickly has 8 sections > the original 7 slots).

**Migration status: all 5 projects use `sections.*.blocks` exclusively** (no legacy
body/bullets/subsections/gallery/metrics left in projects.json).
- **Subsection headings use mechanism (a): the optional `heading?` on the `text` block**
  (already in the union; `BlockRenderer` renders it via `blockHeading`). This is the ONE
  reusable heading mechanism — reuse it for Events, Quickly, and any future project. Do
  NOT add a second heading mechanism.
- Loan App (`sycamore-loan-redesign`): overview text→video, problem text→bullets→gallery,
  process text→bullets→image, design text→bullets→gallery, impact text→metrics.
- **Events (`events-by-sycamore`) — DONE (Figma layout, bespoke `EventsCaseStudy`).**
  overview[text]; problem[text, quote, text]; goals[text, bullets];
  process[text(Research substitute), text(Mapping four-sided),
  gallery(cols2, caption "Competitive Analysis & System Map": competitive-analysis,
  four-sided-system)]; design[Attendee text + ticket-purchase + wallet-flows; Vendor text +
  payment-dashboard + sales-analytics; Staff text + event-staff-ui-shots; Organizer text +
  **marquee of 14 `scroll/` screens**; Acquisition text + landing-hero]; impact[text,
  metrics]; reflection[text]. Composite panels baked into the PNGs.
- **Design System (`sycamore-design-system`) — DONE.** Order:
  overview[text]; problem[text, bullets, image(before.png),
  gallery(columns:2, **images:[]** — intentionally empty, awaiting "Design
  Inconsistencies" screens; renders nothing until filled)]; goals[text, bullets];
  process[text, bullets, **image(screenshot.png)** as the LAST block →
  renders below process, above the "SOLUTION BUILT" section];
  design[text, bullets, video(walkthrough.mp4, poster:screenshot.png,
  caption:"Playing around with the design system", autoplay/loop/muted)];
  impact[text, bullets — no metrics]; reflection[text].
  Only 3 source assets: before.png, screenshot.png, walkthrough.mp4 (.mov→.mp4 via
  ffmpeg). Screenshot caption: "The unified component library and tokens."

## Assets
- Served from `public/images/projects/<slug>/` (bulk UI under `<slug>/ui/`); JSON holds
  URL strings (swap-ready). `next/image` with `width/height + h-auto w-full`.
- 66 referenced refs all verified present. Missing-source categories remain placeholders:
  interaction previews (10), about images (5), testimonial avatars (3), résumé PDF (1).
- Deleted byte-identical `* copy/` duplicates (703M→352M). ffmpeg installed via brew.

## Components & pages (built)
- `src/app/layout.tsx` — async; loads fonts; wraps Nav + `<main>` + Footer in SmoothScroll.
- `src/app/page.tsx` — Hero + SelectedProjects + Testimonials.
- `Nav.tsx` — always-visible sticky top bar + mobile-only floating icon dock
  (Home + 4 nav + Email).
- `Footer.tsx` — "LET'S WORK TOGETHER" CTA; 3 columns (brand+tagline / NAVIGATE
  [prepends "Product Design"→/] / SAY HELLO); inline `LinkedInIcon` SVG
  (lucide v1.21 dropped brand icons).
- `Hero.tsx` — title as full-width SVG `<text>` with `textLength` (never wraps);
  `RichText` for inline `**bold**`.
- `SelectedProjects.tsx` + `ProjectCard.tsx` — card image is the link to
  `/case-studies/<slug>`; hover/focus overlay `bg-black/50` + "View Case Study" pill;
  `rounded-[39px] border-[2.93px]`, aspect 1132/570.
- `Testimonials.tsx` + `TestimonialCard.tsx` + `TestimonialScroller.tsx` (client) —
  full-bleed horizontal scroller; **center when few cards fit, overflow + right-anchor
  when many**; `data-lenis-prevent` for native horizontal scroll.
- `blocks/BlockRenderer.tsx` — switch over all 7 kinds; marquee = two aria-managed copies +
  `animate-[marquee_60s_linear_infinite]`, pause-on-hover.
- `case-studies/[slug]/page.tsx` — SSG (`generateStaticParams`, `generateMetadata`,
  `notFound()`); hero (back link, titleLead, title, summary, meta grid, live button,
  thumbnail banner) → sections in fixed order overview→reflection → next-project card.
  **All 5 projects are now special-cased**: `page.tsx` branches on slug →
  `<LoanCaseStudy>` / `<DesignSystemCaseStudy>` / `<EventsCaseStudy>` /
  `<QuicklyCaseStudy>` / `<SponditCaseStudy>`. The generic block template is now only a
  fallback (no project currently uses it).
- `case-study/LoanCaseStudy.tsx` — bespoke loan layout, **hand-tuned by the user** (don't
  revert their styling). Reads loan data via block helpers; navy `#073042` hero (no longer
  pinned/overlapping — `relative`, banner sits at the hero bottom, hidden below md); two-column
  overview (`OverSECTION`/`OverINDENT`),
  pill eyebrows [overview=underline w/ `#BC7553`], alternating cream/`GoalSECTION`(white)
  bands, `INDENT` = `md:ml-35`, baked image panels, white metric cards. Per-section color
  map `C` drives pill fill + bullet dots. Max-width intentionally NOT per-container (user
  wants it in one place). `ScrollToTop.tsx` (client, `useLenis().scrollTo(0)`, past 500px).
- `case-study/DesignSystemCaseStudy.tsx` — mirrors LoanCaseStudy's styling verbatim
  (own file, loan untouched), adapted to design-system content: no overview demo band,
  DESIGN(`SOLUTION BUILT`) renders the walkthrough video, IMPACT has bullets + no metrics.
- `case-study/QuicklyCaseStudy.tsx` — same format, **dark-GREEN `#1A3020`** pinned hero
  (cream text). 8 ordered sections driven by a `PILLS` config (overview two-col +
  problem/process/design/collaboration/challenges/impact/reflection). Generic
  `SectionBlocks` iterator: text(+optional underlined `SubHeading`) indented, images/audio/
  metrics full-width. `AudioPlaceholder` = `#12542F` panel w/ muted-speaker (`VolumeX`) +
  static `BARS` when no src. Metric cards get a light border (impact sits on white).
  Band alternation matched to Figma. NOTE: hero title/tags come from data
  (`QUICKLY: A MOBILE GAME` / GAME DESIGN…) and differ from the Figma
  (`QUICKLY — A COMPETITIVE WORD GAME` / WEB GAME • INTERACTION DESIGN • GAMIFICATION) —
  offer to sync.
- `case-study/SponditCaseStudy.tsx` — same format, **RUST `#B94325`** pinned hero. 7
  standard sections; **no static images except the hero banner** — two `AutoScroll`
  marquees (pause-on-hover, `marquee.caption`): PROBLEM → grey-blue `#C2CCD4` "Outdated
  system UI" (5 `ui/scroll-one/old-*.png`, renamed from `scroll-0ne/`); DESIGNS → sage
  `#C3D0BF` "New and improved system UI" (existing 22-image marquee). DESIGNS uses **bold
  run-on sub-headings** (not underlined). Last project (`next:null`) → "WHAT NEXT? / CHECK
  OUT MY INTERACTION DESIGNS" band linking `/interaction-design`. RESEARCH & PROCESS
  (`process`) = a duplicate of DESIGN GOALS (`goals`) per the Figma. NOTE: hero title/tags
  come from data (`SMART TRAFFIC MANAGEMENT SYSTEM` / WEB APPLICATION…) and differ from the
  Figma (`SPONDIT — SMART TRAFFIC MANAGEMENT SYSTEM` / WEB APP • SAAS DESIGN) — offer to sync.
- `case-study/EventsCaseStudy.tsx` — same format, but **LIGHT** pinned hero (`#F4F4F4`,
  dark text), band alternation flipped (problem/process/impact = white, goals/design/
  reflection = cream), THE OPPORTUNITY renders `text·quote·text` (Quote = left accent
  border), PROCESS = run-in bold sub-heading texts + 2-up gallery w/ shared caption,
  DESIGN iterates blocks (muted uppercase `SubHeading` + baked panels) with an
  `AutoScroll` marquee (sage `#C3D0BF` container, `animate-marquee`, pause-on-hover) after
  the Organizer sub-heading. Marquee feeds from `events/scroll/` (14 files renamed to
  kebab-case). Events data restructured to match (problem text·quote·text; process 2-up
  gallery; design = per-subsection heading+panels + scroll marquee).
  PENDING (both): hero textures at `public/images/projects/<slug>/hero-pattern.png`
  (degrade to solid navy); captions render from data (loan differs from Figma copy — offer
  to sync); pill colors sampled.

## Interaction page (`/interaction-design`) — BUILT
- `src/app/interaction-design/page.tsx` (async, `getInteractions()`) + `InteractionCard.tsx`
  (exports `PrototypePlaceholder`). Cream hero (title + accent underline + intro + placeholder)
  → "INTERACTION WORK." intro/divider → **single-column** cards. Nav already links here;
  Spondit's "WHAT NEXT?" band points here too.
- **Previews = looping muted `<video>` (DONE for all 10).** Live Figma iframes were too slow +
  reloaded every visit, so the owner recorded each interaction; `InteractionCard` renders
  `<video src={it.previewVideo} autoPlay loop muted playsInline preload="metadata"
  className="… object-contain">` (accent letterbox bg), falling back to the accent
  `PrototypePlaceholder` (Play badge via `onAccent`) only if `previewVideo` is absent.
  `Interaction.previewVideo?` added. Videos live at `public/interactive/*.mp4` — **transcoded
  from the owner's `.mov`** via ffmpeg (`libx264 -crf 27 -an -movflags +faststart` + scale-to-fit
  1280×820); total ~1.7MB for all 10 (the 53MB clock → 0.52MB). The raw `.mov` sources (~213MB)
  are still in `public/interactive/` and can be deleted.
- Live-embed path retired from the card but `toFigmaEmbedUrl` + `isEmbeddableProto` stay in
  `lib/figma.ts` (airplane's real per-flow `prototypeUrl` is still in data) for a possible future
  "launch interactive prototype" button. `aspectRatio?` now only affects the placeholder fallback.

## About page (`/about`) — BUILT
- `src/app/about/page.tsx` (async, `getAbout()`+`getSiteConfig()`) — header + a **scrapbook
  collage**. Cards are the designer's **full exported images** (renamed in
  `public/images/projects/about/`: sitcoms/boardgames/profile/substack/note/mangoes/lagos
  all `.svg` now; the **social card uses `Envelope.svg`** (332×312, the SVG of the old
  social.png); the **belief banner uses `believer.svg`** (590×221, real Figma frame — no longer
  an HTML placeholder). `Sound.svg` kept as reference only. All SVGs use `next/image unoptimized`.
  (PNGs were blurry when scaled → swapped to SVGs.)
- `components/about/AboutBoard.tsx` (client) — fixed 920×1180 board (square border, no rounded
  corners/ring; bg/border are user-tuned). `ResizeObserver` **transform-scales it to FIT the
  container** — down on narrow screens AND **up to `MAX_W=1500`** on wide ones (scale =
  clientWidth/920, no longer capped at 1). About page container is `max-w-[1500px]`. Cards positioned
  absolutely in that design space via `FloatCard` (in page.tsx). **Infinite float DONE**:
  `@keyframes cardfloat` translateY on the outer wrapper, static rotate on the inner (so
  they compose), per-card duration/delay via `--fd`/`--fdl` CSS vars, `motion-reduce:
  animate-none` for a11y. Music card passes `float={false}`.
  **Tailwind v4 gotcha (bit us here):** v4 tree-shakes any `@keyframes` that no *scanned
  class* references. A React inline `animation:` is invisible to the scanner, so the
  keyframe gets dropped from the output CSS. Reference keyframes via a real class —
  `animate-[name_…]` or `[animation:name_var(--x)_…]` (use CSS vars for dynamic timing).
- `components/about/MusicCard.tsx` (client) — **HTML-built** music card (`#12542F` green,
  title + artist static from `about.json` spotify item, animated `@keyframes soundbar` wave).
  **Now AUTOPLAYS an owned/royalty-free audio file** (client wanted music on landing): hidden
  `<audio loop src={spotify.audioUrl}>` — **muted autoplay on mount** (bars animate → looks
  alive; browsers block AUDIBLE autoplay), then a one-time window `pointerdown/keydown/touchstart`
  listener **unmutes on the first interaction** → sound. Mute + play/pause buttons drive the
  `<audio>`. Spotify embed/modal REMOVED. **NEEDS the mp3 at `public/audio/current-shuffle.mp3`**
  (must be owned/royalty-free — can't host a copyrighted Spotify track; full-playlist autoplay for
  visitors is impossible anyway = needs Premium login via Web Playback SDK). `AboutItem` spotify
  variant gained `audioUrl?` (embedUrl now optional, unused by the card).
- Interactive images wired: social→Instagram, substack→url, note→`mailto:site.contact.email`.
- PENDING: **audio file** (`public/audio/current-shuffle.mp3`) + trackTitle/artist still the ABBA
  placeholder; real **Substack** (`url`) URL still `REPLACE`. (Belief banner + music mechanism DONE.)

## Pending / next
0. **Mobile responsiveness pass IN PROGRESS** (user: use judgment, scale type/spacing down for
   mobile). DONE: **landing** (fixed SelectedProjects fixed-width intro overflow; ProjectCard
   `rounded-[20px]`/title `17px` on mobile) + **case studies** (overview two-column now stacks
   `flex-col md:flex-row`; hero title 30px, content `items-start md:items-end`, banner
   `rounded-[24px]`, `SECTION`/`GoalSECTION` `py-12`, next-band 24px/`py-12`, marquees
   `h-[260px]`+`p-4` — all via bulk exact-string replace since the 5 files are byte-identical).
   **CS hero is now plain `relative`** — the `xl:sticky`+`xl:-mt-[280px]` pin/overlap and the
   `[data-hero-sink]` drift were REMOVED (user wanted no pin + banner sitting at the hero bottom,
   not straddling the next section); banner still `hidden md:block`. Mobile CS hero
   title `26px`, summary `16px`. Landing hero title stays the one-line SVG (user's choice).
   NEXT: services, resume, interaction, about, nav/footer.
1. Interaction previews DONE — all 10 now loop recorded mp4s (`previewVideo`); live Figma embeds
   dropped. (Optional future: "launch interactive prototype" button using the Figma links.)
2. About: real Spotify/Substack URLs; nudge card positions. (belief-banner export DONE.)
3. Add "Design Inconsistencies" screens to the empty design-system problem gallery.
4. Animation pass — landing + case studies + interaction (hero+cards) + services + **resume
   DONE**; next: about page.
5. **Services page (`/services`) — BUILT + animated.** `src/app/services/page.tsx` (async,
   `getServices`/`getProcessSteps`/`getServicesIntro` — added the intro getter) composes 3
   full-bleed bands at `max-w-[1300px]`: HERO (cream, `ServicesHero` on-load stagger + accent
   rule wipe), WHAT I OFFER (white, 2-col grid of `components/services/ServiceCard` — top accent
   bar wipes in + card rises, tinted icon chip via `${accent}14`, lucide icon map), HOW I WORK
   (cream, `ProcessStrip` — numbered circles + connector line `w-[calc(100%+1.5rem)]`, staggered).
   **services.json accentColors updated to the varied mockup palette** (navy #073042 / accent
   #C57B57 / green #2E5E44 / maroon #331B17 / navy #073042).
6. **Resume page (`/resume`) — BUILT + animated.** `src/app/resume/page.tsx` (async, `getResume`),
   all on cream at `max-w-[1300px]`: `ResumeHero` (MY BACKGROUND / RESUME. + badge pills +
   outlined-accent Download button → `resumeFileUrl`; on-load stagger + rule wipe), then a
   `lg:grid-cols-[1.6fr_1fr]` split — `components/resume/ExperienceTimeline` (border-l timeline,
   accent dots, `group` → "Other Roles" muted label+dot, arrow-marker bullets, staggered) +
   `SkillsPanel` (grouped outlined pills, staggered). Section heads = Briefcase/Sparkles + rust.
   **PENDING assets:** résumé PDF still missing (`public/files/victoria-akudo-resume.pdf` → button
   404s until provided). Split the Spondit "Other Roles" summary into 2 paragraphs (`\n\n`).
   **All nav pages now built** (interaction, services, resume, about); next animation target: about.
6. Provide missing assets (interaction previews, avatars, banner export, résumé PDF).

> Durable facts also live in the memory index at
> `/Users/admin/.claude/projects/-Users-admin-Vicky-portfolio/memory/MEMORY.md`.

# Della Feeder Sites, Build 01: personalinjuryansweringservice.com and virtualreceptionistforlawyers.com

## Purpose

Build two fast, mobile-first, static feeder sites that rank for the answering-service and intake searches US law firms make, get cited by AI search engines, and send every visitor to one action: hear Della on a live call, or hire her on calldella.com.

The feeders are part of the Call Della brand, not separate products. They follow `DELLA_BRAND.md` and fit around calldella.com's own SEO plan (`SEO_GEO_PLAN.md` in `Nipstar/call-della-site`). The plan's "Fit with calldella.com" section says which site owns which search.

The plan, keyword map and SPIN page structure are in the Claude Doc **"Della Feeder Sites: SEO, AI Search and SPIN Copy Plan"** (Plan tab). Full copy for A1, B1 and B2 is in its **Page copy** tab. Andy will export both tabs to `docs/` before you start (`docs/FEEDER_PLAN.md`, `docs/FEEDER_COPY.md`). They are the source of truth for page lists, keywords, titles, H1s and copy.

## Source-of-truth files

- `docs/FEEDER_PLAN.md`, `docs/FEEDER_COPY.md` (exported from the doc)
- `DELLA_BRAND.md`, `SEO_GEO_PLAN.md` and `public/llms.txt` from `Nipstar/call-della-site` (copy into `docs/`). Visual language, voice, naming, CTA wording, and the fixed description
- `Nipstar/call-della-site` source, read-only, for component styling to match: `globals.css` tokens, `Stamp`, `Rule`, `Typography`, `DossierMockup`, `PaperTexture`, `CTAButton`. Recreate them as lightweight Astro components, no React
- jobslocked.com README (Andy has it) for the proven static pattern: one CSS file, self-hosted fonts, llms.txt, `.htaccess`-style headers, Lighthouse 100
- `DEPLOY_00_COOLIFY.md` Part B from the Della launch pack, for the static-site Coolify pattern

## Hard rules

- **Static output only.** Astro in `output: "static"` mode. No client framework islands. Inline vanilla JS only where listed (calculator, copy button, sticky bar), 3 KB gzipped per page maximum.
- **One repo, two sites.** `Nipstar/della-feeders`, `sites/pi/` and `sites/vr/` configs, shared `src/components` and `src/layouts`. A third feeder later must be a new config and content folder, nothing else.
- **One config per site** (`sites/<id>/site.config.ts`): domain, display name, Plausible domain, CTA mode (`book` now, `start` once self-serve signup ships), calldella.com URLs, alert channels wording, Spanish status, criminal/immigration status, nav. **One shared config** (`shared/della.config.ts`): the fixed description (copied verbatim from calldella.com's `public/llms.txt`), plan names, prices, minutes, overage, setup-fee flag, ring count, links to calldella.com pages (compliance posts, missed-call calculator, PI intake form post, compare pages, criminal-defense, immigration). Pages read these only from here. Never type a price into a page.
- **Plans (confirmed by Andy, 25 Oct 2026):** Solo, $329 a month, 300 minutes, for solo lawyers; Practice, $598 a month, 600 minutes; Group, custom. Overage $0.50/min, month-to-month, no setup fee. Names are config (default Solo and Practice); never use "Starter", "Pro" or "Enterprise" (brand bible rule).
- **Every price on every page comes with what's included**, from one `includes` list in the shared config, rendered as the "What you get" table in the Page copy tab: Della answering in the firm's name nights, weekends and holidays; the Call Della dashboard (every call as a dossier with summary, urgency score, recording and transcript, searchable and exportable); urgent-call alerts to the attorney on call; the 7am morning brief; state recording disclosure; own Della number with forwarding and a test call. Items marked `[confirm]` in the copy (Slack and custom intake on Practice only) stay `TODO(andy):` until confirmed. Offer schema carries the same price and minutes.
- **No invented facts.** No statistics without a named source, year and link. No testimonials, ratings or review schema. No competitor price or feature that isn't from their own page, dated and linked. If a fact is missing, leave a visible `TODO(andy):` in a draft-only build and list it in BUILD_LOG.md; the production build fails if any `TODO(` remains.
- **Copy rules:** US English in the Call Della voice from `DELLA_BRAND.md`: sober, specific, trade-publication pacing. No em dashes. No exclamation marks. Banned words: leverage, seamless, robust, cutting-edge, revolutionary, solutions, game-changer, unlock, AI-powered, next-generation. Della is always "she", never "it" or "the AI", and an intake specialist, never a receptionist (the site B domain is the search term; the copy reframes it). Company name: Call Della. Della never gives legal advice and never claims to be human; copy must never imply otherwise.
- **Booking widget (all sites):** Book a demo opens the GHL booking widget `https://crm.antekautomation.com/widget/booking/4rCy7x8UfYzn4YktNNkF` (with `https://crm.antekautomation.com/js/form_embed.js` for auto-height) in a modal, same as calldella.com. Iframe and script load on first click only, never at page load. URL lives in `shared/della.config.ts` as `bookingUrl`. CSP must allow `crm.antekautomation.com` in `frame-src` and `script-src`.
- **CTA wording:** Book a demo (primary, the 30-minute demo on calldella.com), See the dossier (sample brief). Hire Della (sign-up) only once CTA mode is `start`. **No phone numbers anywhere on the sites:** no tap-to-call, no demo lines, no `tel:` links. Copy that invites the reader to hear Della points to the demo, where we run a live call for them. Morning output is "by dawn" or "by 7am".
- **Don't repeat live-site claims the product doesn't support yet:** Filevine/CASEpeer/Lead Docket/Litify/Clio/MyCase integrations, Spanish on PI or criminal, SOC 2 audit status, SMS alerts, unsourced voicemail percentages. Config flags switch them on when true.
- **Honest scope gates** (from the plan): A4 publishes as a guide until `massTortFlow: true`; Spanish is claimed for immigration only until `spanishPI` / `spanishCriminal` are true; B9/B10 are not built until their flags are true; there is no Call button.
- **Performance budgets** (Lighthouse mobile): LCP ≤ 1.8 s, CLS ≤ 0.05, INP ≤ 100 ms, HTML ≤ 30 KB gz per page, CSS ≤ 12 KB gz site-wide, fonts ≤ 60 KB total (Newsreader and JetBrains Mono per the brand bible, static weights only, Latin subset, one preloaded, `font-display: swap`), no third-party script at load (Plausible deferred). CI fails under 95 in any Lighthouse category.
- **Mobile first.** Designed at 375 px. 16 px gutters, 17 px body, 48 px tap targets, no horizontal scroll anywhere.
- **Stop. Report. Wait.** after every phase. Write progress to `BUILD_LOG.md`.

---

## Phase 0: Audit

1. Read both exported docs and `DELLA_BRAND.md` end to end. List every page per site (URL, primary, secondaries, title, H1) as a table in BUILD_LOG.md and flag anything ambiguous.
2. Read `call-della-site` and note the fonts, colour tokens (light and dark themes), spacing and the components that give the dossier look. Propose which to recreate (as lightweight Astro components, no React). List every calldella.com URL the feeders will link to and confirm each exists.
3. List every `[bracketed]` placeholder in the copy and map each to a config key.
4. List every statistic and external fact in the copy with its source. Fetch each source page and confirm the figure still reads the same. Record pass or fail.
5. Confirm Astro's current static output and sitemap integration versions. Record them.

**Stop. Report. Wait.**

## Phase 1: Template and shared components

- Repo scaffold, two site configs, shared config, `astro build --site <id>` (or a `SITE` env var) producing `dist/<id>/`.
- Layout: head (title, description, canonical, OG, Twitter, theme colour), skip link, header (logo text, nav, Book a demo button on desktop), footer ("Della is made by Antek Automation", privacy, terms, calldella.com link), sticky mobile Book a demo bar (appears after the hero leaves the viewport, IntersectionObserver, no layout shift).
- Components, matching the SPIN page order in the plan: `Hero`, `AnswerBlock` (enforces 40 to 60 words at build), `ProblemList`, `Statistic` (requires `source`, `year`, `url`), `Calculator` (four numeric inputs, no defaults, monthly result, `<noscript>` written formula), `NeedPayoff`, `ProblemFixTable` (max 5 rows, real `<table>`, restacks to cards under 640 px with CSS), `SampleBrief` (HTML/CSS, labelled "Sample"), `FAQ` (`<details>`, emits FAQPage JSON-LD from the same data), `ForwardBox` (copy button + `mailto:` with prefilled subject and body), `CTA` (reads CTA mode), `Breadcrumbs`, `UpdatedDate`.
- CTA links to calldella.com always carry `utm_source=<domain>&utm_medium=feeder&utm_campaign=<page-slug>&utm_content=<button-position>`. Book mode → calldella.com booking; start mode → `https://app.calldella.com/start?plan=<plan>&vertical=<vertical>` plus the UTMs.
- Book links fire a Plausible `demo_click` event with page and position; start links (when enabled) fire `signup_click`. A build test fails if any `tel:` link or phone number appears in the output.
- Fonts self-hosted per DELLA_BRAND.md, subset to Latin.

**Stop. Report. Wait.** Include a Lighthouse mobile run of a placeholder page.

## Phase 2: Schema, llms.txt, robots, sitemaps

- JSON-LD generated from page frontmatter and config, never hand-written:
  - Every page: `Organization` with `@id: https://calldella.com/#org`, name Call Della, url calldella.com, the fixed description, `parentOrganization` Antek Automation (antekautomation.com), `founder` Andy Norman, `sameAs` from config; `WebSite`; `BreadcrumbList`.
  - Service pages: `Service` with `serviceType`, `provider` → the org `@id`, `areaServed: US`, `audience` (law firms), `offers` for Solo and Practice from the shared config, `priceCurrency: USD`.
  - FAQ blocks: `FAQPage`, text identical to the visible answers (assert this in a test).
  - Guides: `Article` with author `Person` Andy Norman, `datePublished`, `dateModified`, `citation` per source.
  - Never `Review` or `AggregateRating`.
- `robots.txt` allowing GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, and `Sitemap:` line.
- `llms.txt` and `llms-full.txt` per site, generated at build: fixed description, page list with one-line summaries, key facts (practice areas live, hours, plans and prices from config, what Della won't do), contact. `llms-full.txt` holds the full text of every page.
- `sitemap.xml` with real `lastmod` from each page's `dateModified`. IndexNow key file and a post-deploy ping script.
- Validate every page's JSON-LD with a schema test; record results.

**Stop. Report. Wait.**

## Phase 3: Site B pages (virtualreceptionistforlawyers.com)

Build B1 to B8, B11 (About), privacy, terms, 404, in plan order. B1 and B2 use the full copy from `FEEDER_COPY.md` verbatim. B3 to B8 follow the SPIN page order and their rows in the plan (primary in title, H1, first 100 words and one H2; secondaries in H2s and body where they read naturally; no keyword stuffing).

- B7 and B8: fetch each competitor's own pricing/features page, record what it says and the date, link it. B8 states at the top that Della is ours and scores every service on the same criteria. Anything you can't verify from the source page is left out.
- Every page: visible "Last updated", one statistic minimum, answer block under the hero, internal links per the plan (home ↔ all; siblings; guide links later).

**Stop. Report. Wait.** Andy reviews B1, B2 and B8 copy in the browser at 375 px before you continue.

## Phase 4: Site A pages (personalinjuryansweringservice.com)

Build A1 to A7, privacy, terms, 404. A1 uses the full copy verbatim. A4 builds as a guide while `massTortFlow` is false (definition, how firms run mass tort intake, soft CTA) and switches template when the flag is true. A6 targets the template and PDF searches only (calldella.com's PI intake form post keeps the head term) and links to that post; the editable template is behind an email form that posts to `N8N_LEAD_WEBHOOK_URL` (production `/webhook/` path, never `/webhook-test/`), with a visible privacy note.

Cross-site links exactly as the plan's "Between the sites" table. No sitewide cross-links.

**Stop. Report. Wait.**

## Phase 5: Guides scaffold

- `src/content/guides/<site>/` Markdown collection with frontmatter (title, description, primary, secondaries, ownerPage, sources[], datePublished, dateModified).
- Guide layout with author box, sources list, "Updated" date, Article schema, one contextual link up to `ownerPage` (build fails if missing).
- G1, G3 and G6 are not feeder guides (G1 moves to calldella.com/operations/, G3 and G6 are dropped). Write G2 for site B (what is legal intake) using only sourced facts, each re-fetched and confirmed, linking to calldella.com's compliance and playbook posts where they cover a point. Leave the rest as stubs excluded from the build.

**Stop. Report. Wait.**

## Phase 6: QA and CI

- Lighthouse CI (mobile) on every page of both sites: fail under 95 in any category; record scores.
- axe: zero violations on every page.
- Playwright at 375 px and 1280 px: no horizontal scroll, sticky bar appears after the hero, every CTA href carries all four UTM parameters, no `tel:` links or phone numbers in any page, FAQ JSON-LD text equals visible text, calculator computes and shows the formula without JS.
- Link check: no broken internal or external links.
- Copy lint: fail on em dashes, exclamation marks, banned words, `TODO(` in production builds.
- GitHub Actions running all of the above on PRs.

**Stop. Report. Wait.**

## Phase 7: Deploy (Coolify, behind Cloudflare)

Follow `DEPLOY_00_COOLIFY.md` Part B for each site:

1. Coolify static app per site from `Nipstar/della-feeders`, build command `SITE=<id> npm run build`, publish directory `dist/<id>`.
2. Andy adds DNS: apex A record to the server, `www` CNAME. Grey cloud for the first deploy; orange once the certificate is issued.
3. Cloudflare per zone: `www` → apex 301; cache HTML at the edge with a short TTL, purge on deploy; long cache for hashed assets; security headers (HSTS, CSP allowing only Plausible, nosniff, referrer policy). **Check the AI crawler blocking setting and Bot Fight Mode are off** so the crawlers in robots.txt can reach the site; confirm by fetching with each bot's user agent.
4. Post-deploy script: IndexNow ping, sitemap submit reminders for Search Console and Bing Webmaster Tools (Andy verifies ownership).
5. Live checks: `curl -I` for headers, `/llms.txt` served as text/plain, 404 page, Lighthouse on the live URL.

**Stop. Report. Done.** Tag `feeders-v1`.

---

## Definition of done

1. Both sites live on HTTPS at the bare domains, every launch page from the plan published (with A4, B6, B9, B10 respecting their flags).
2. Lighthouse mobile ≥ 95 in all four categories on every page; budgets met; axe clean.
3. Every page has the answer block, a sourced statistic, the SPIN sections in order, FAQs with matching schema, the forward box and a single CTA path with full UTMs.
4. Prices, phone numbers, alert wording and scope flags come only from config.
5. Schema validates; llms.txt, llms-full.txt, robots.txt and sitemaps live; AI crawlers can fetch the pages.
6. CI enforces performance, accessibility, copy rules and UTMs on every PR.
7. BUILD_LOG.md lists every verified source with its check date, every competitor fact with its source and date, and any open `TODO(andy)` items.

## Out of scope

- B9 and B10 (criminal defense, immigration pages) until their flags are true.
- A Spanish-language version of either site.
- Paid ads, landing-page A/B testing, chat widgets.
- Changes to calldella.com (BUILD_SITE_04 covers the signup links there).

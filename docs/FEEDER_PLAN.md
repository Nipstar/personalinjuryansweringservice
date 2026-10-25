# Della Feeder Sites: SEO, AI Search and SPIN Copy Plan

Oct 25, 2026 · @Andy Norman

## Summary

Two Della-branded feeder sites rank for the searches US law firms make when they look for call answering and intake, then send every visitor to one action: hear Della on a live call, or hire her on calldella.com.

- **personalinjuryansweringservice.com** is the PI specialist: 6 launch pages, led by mass tort intake (600 searches a month, KD 0).
- **virtualreceptionistforlawyers.com** is the broad legal hub: 8 launch pages, led by "legal answering service" (1,400 a month, KD 18), the biggest prize in the data.
- Launch pages target about 10,200 US searches a month across primary and secondary terms, nearly all at KD 0 to 20. That is an upper bound on reach, not a traffic forecast.
- Every page is written in SPIN order: the reader's problem, what it costs them, what fixing it is worth, then Della. Capability comes last and only answers needs the page has already named.
- Built static with no framework JavaScript, like jobslocked.com (Lighthouse 100 on mobile), so the sites are fast on a phone.
- The quickest AI search win is a citation in Google's AI Overview, which already appears for "virtual receptionist for lawyers" and cites 11 vendor and listicle pages.

The decisions at the end need your answer before the build starts. The companion Claude Code prompt (BUILD\_FEEDER\_SITES.md) turns this plan into the sites. Full copy for the three most important pages is in the Page copy tab.

## Fit with calldella.com

Checked on 25 Oct 2026 against the call-della-site repo (last commit 17 May 2026): DELLA\_BRAND.md, SEO\_GEO\_PLAN.md and the live llms.txt. calldella.com has no US rankings in Ahrefs yet, so moving a topic between sites loses nothing. What matters is deciding once which site owns each search.

| Topic | calldella.com today | Feeder plan said | Now |
| --- | --- | --- | --- |
| "ai receptionist for law firms" | /how-it-works targets it (SEO plan section 6) | B5 | B5 keeps it. The brand bible says Della is a specialist, not a receptionist, so /how-it-works retargets to "after-hours legal intake" and links to B5 |
| PI intake form | /intake-playbook/what-should-be-on-a-pi-intake-form | A6 primary | calldella.com's post keeps "personal injury intake form". A6 becomes the downloadable template only (template 30, pdf 20) and links to the post |
| Missed-call data (G1) | Pillar B plans an original PI intake survey; has a missed-call cost calculator | G1 on site B | Moves to calldella.com/operations/. Original data should build the brand's authority; the feeders cite and link to it |
| Intake metrics (G3) | Pillar B owns intake KPIs | G3 on site B | Dropped from the feeders |
| Law firm intake form (G6) | Covered by the intake form post | G6 on site B | Dropped from the feeders |
| Cost (B7) and the calculator | /operations/missed-call-cost-calculator, /operations/after-hours-intake-comparison | B7 plus an inline calculator | B7 keeps "legal answering service cost", which calldella.com doesn't target. The inline calculator stays short and links to the full one |
| Comparisons (B8) | /compare/\[competitor\] planned, "X vs Call Della" | B8 best-of list | Both. B8 owns "best X" lists; calldella.com owns "X vs Call Della". B8 links to each compare page |
| Bar rules, privilege, HIPAA | /compliance/ pillar (ABA Formal Opinion 512, privilege, HIPAA at intake) | FAQ answers on the feeders | Feeder FAQs answer in two sentences and link to the compliance posts |
| States and case types | /states/, /case-types/ | Not planned | Unchanged. The feeders build no location or case-type pages |

**Brand bible rules now applied to the feeder copy**

- Della is "she", never "it" or "the AI". She's an intake specialist, not a receptionist. On site B that becomes the hook: firms search for a virtual receptionist, but what they need is intake.
- Company name in schema and footers: Call Della. Persona: Della. Your title: Founder.
- Buttons: Book a demo (30-minute demo on calldella.com), See the dossier (sample brief). No phone numbers on any site.
- An overnight specialist, not a 24/7 replacement: "Della takes the overnight calls. Your team takes the morning." Copy reassures the intake manager, who is the gatekeeper.
- Morning output: "on your desk by dawn" or "by 7am", not 8am. "Within two rings" comes from the brand bible but isn't claimed on the live site yet, so it's a config value.
- Voice: sober, trade-publication tone, editorial pacing. On the public sites this overrides the SPIN skill's clipped short sentences. Still no exclamation marks, no "unlock", no "AI-powered".
- The fixed description is taken word for word from calldella.com's live llms.txt, so all three sites describe Call Della identically.
- Visual: Newsreader and JetBrains Mono, the manila paper palette in light and dark themes, stamps, file tabs, no corners rounder than 2px.
- The brand bible's prices ($149, $249, $599) are out of date. The feeders use the live ones ($297, $547, Group custom).

**Live-site claims that run ahead of the product.** The launch-pack repo audit found these aren't built yet. The feeders won't repeat them until they're true, and calldella.com should change to match (BUILD\_SITE\_04 covers its copy alignment):

- Webhook integrations for Filevine, CASEpeer, Lead Docket, Litify, Clio and MyCase. Only the Group CRM webhook exists.
- Spanish optional on the PI and criminal flows.
- "SOC 2 Type II audit underway". Confirm before anything repeats it.
- SMS notifications on Practice. SMS is switched off in the launch prompts.
- "30 to 70% of after-hours calls hit voicemail" and "$250K+ lost per mid-size firm", with no source on the page. The feeders use the Clio and ABA figures instead.

## How the feeders work

Each feeder catches category searches calldella.com shouldn't chase, answers them better than the current results, and hands the reader to Della. calldella.com stays the brand, pricing and checkout, and doesn't add pages for the feeders' primary terms, so the three sites never compete for the same query.

| Site | Owns these searches | Hands off to |
| --- | --- | --- |
| personalinjuryansweringservice.com | PI answering, PI intake, mass tort intake, PI pricing, PI intake forms | A demo booked on calldella.com, vertical set to personal injury |
| virtualreceptionistforlawyers.com | Legal answering service, virtual receptionist, legal intake, AI receptionist, bilingual, cost, best-of | A demo booked on calldella.com, vertical picked on the page |
| calldella.com | Brand searches, its vertical landers, pricing, signup | Not a feeder |

**One action per page, the same everywhere**

1. **Book a demo.** Opens the GHL booking widget (crm.antekautomation.com, the same calendar as calldella.com) in a modal on the feeder page, loaded on click. Sticky at the bottom on mobile. In the demo we run a live Della call for the firm's practice area and walk through the dossier, so hearing her still happens, with us in the room. No live demo numbers on the sites.
2. **Hire Della (later).** When Phase 10 self-serve signup ships, a config value adds a link to calldella.com/start with plan and vertical set. Until then Book a demo is the only conversion.
3. **Forward this to your managing partner.** A short box with a prefilled email: the problem, the cost, the fix, the price, the link. In SPIN terms this arms the champion, because most firms decide when we're not in the room.
4. **Free PI intake form** (site A only). Email capture into n8n and GHL, then the nurture sequence from the launch plan.

**Attribution.** Every link to calldella.com carries utm\_source (the feeder domain), utm\_medium=feeder, utm\_campaign (the page) and utm\_content (which button). BUILD\_SITE\_04 already carries UTM tags into /start, and Phase 10 stores them on each signup, so a paying firm traces back to the feeder page that found it. Demo bookings are counted by a Plausible demo\_click event per page and by UTM on the booking.

## What the search data says

Both head terms are winnable on focus rather than links: the pages ranking 5 to 9 have almost no backlinks, and the AI Overview rewards pages that answer plainly. Data is Ahrefs US, pulled 25 Oct 2026.

**"personal injury answering service" (80 a month, KD 0)**

- Google shows a local pack of PI law firms first, so it partly reads the query as an injured person looking for a lawyer. Titles and H1s must say "for law firms" to win the business reading.
- MyCase's listicle (DR 81) is 2nd and answeringlegal.com (DR 58) 3rd. Positions 5 to 9 are DR 11 to 49 pages with 0 to 6 backlinks and single-digit traffic. A focused EMD page can reach the top 5.
- People Also Ask: "How much does it cost to hire an answering service?" and "What is the best answering service for law firms?" Both get a direct answer on the page.

**"virtual receptionist for lawyers" (300 a month, KD 0)**

- An AI Overview leads the page and cites 11 sources: AI receptionist vendors (Rosie, AgentZap, OnCallClerk, Voksha), listicles (Juryo, CaseGen) and guides (Vida, Posh).
- Organic 2 to 9 are DR 22 to 78 with 0 to 6 backlinks. Retell's own law-firm use-case page is 9th, which matters because you're a Certified Retell Partner (see Linking and off-site).

**The secondary keyword universe**

| Cluster | Biggest terms (US vol, KD) | Lands on |
| --- | --- | --- |
| Legal answering service | legal answering service 1,400 (18); law firm answering service 700 (19); answering service for lawyers 400 (12) | B2 |
| Legal intake service | legal intake services 300 (1); answering service with legal intake 300 (8); legal intake phone services 200 (1); outsource legal intake 200 (0) | B4 |
| Mass tort intake | mass tort intake 600 (0); mass tort intake services 250 (0); mass tort legal intake 200 (unscored) | A4 |
| AI and automation | ai receptionist for law firms 250 (9); legal intake automation 250 (6); automated legal intake 150 (8); ai legal intake 150 (5) | B5 |
| 24/7 and after hours | 24 hour legal answering service 200 (15); 24 7 answering service for lawyers 150 (0); 24/7 legal answering service 150 (11) | B3 |
| Best-of | best law firm answering service 150 (2); best attorney answering service 150 (12); best virtual receptionist for law firms 150 (12) | B8 |
| Bilingual | bilingual legal answering service 200 (4); bilingual law firm answering service 150 (unscored) | B6 |
| Cost | legal answering service cost 150 (1); cost of attorney answering service 100 (0) | B7 |
| PI intake | personal injury intake 150 (0); personal injury intake form 90 (0); personal injury law firm answering service 100 (unscored) | A1, A2, A6 |

**Left out on purpose**

- **Job seekers:** legal intake specialist (600), remote legal intake jobs (400), night shift intake jobs (250) and similar. Wrong buyer.
- **Software shoppers:** legal intake software (400), personal injury intake software (150, parent topic CASEpeer). They want a CRM. One explainer guide catches them instead (G8).
- **Too hard for now:** lawyer answering service (700, KD 45), attorney answering service (400, KD 45), phone answering service for lawyers (200, KD 47). They sit on B2 and B3 as stretch terms and should follow once the site has authority.
- **Other practice areas:** family, divorce, estate, employment, real estate. Not Della verticals.

Ahrefs CPCs on the core terms run $16 to $100. Google Ads' own figures from the 24 Oct pull were $167 to $793 a click, which is why these sites rank organically rather than buy the clicks.

## Site A: personalinjuryansweringservice.com

Six launch pages plus About, about 2,080 searches a month across their terms. Mass tort intake carries over half of that. Volumes are US monthly, KD in brackets, "n/s" means Ahrefs hasn't scored it.

| # | URL | Primary | Secondary | Searches |
| --- | --- | --- | --- | --- |
| A1 | / | personal injury answering service 80 (0) | personal injury law firm answering service 100 (n/s); personal injury attorney answering service 60 (n/s) | 240 |
| A2 | /personal-injury-intake/ | personal injury intake 150 (0) | personal injury intake specialist 80 (0); personal injury intake services 10 | 240 |
| A3 | /intake-automation/ | personal injury intake automation 60 (n/s) | law firm intake follow up automation 100 (0); how to automate personal injury intake 10; personal injury intake ai agent 10 | 180 |
| A4 | /mass-tort-intake/ | mass tort intake 600 (0) | mass tort intake services 250 (0); mass tort legal intake 200 (n/s); what is mass tort intake 100 (n/s); mass tort intake call center 70 (0) | 1,220 |
| A5 | /pricing/ | personal injury answering service pricing 30 (n/s) | personal injury intake service comparison 30 (n/s) | 60 |
| A6 | /intake-form/ | personal injury intake form 90 (0) | personal injury intake form template 30 (0); personal injury intake form pdf 20 (0) | 140 |
| A7 | /about/ | none | Who built Della and why. Supports trust for every page | none |

**Titles, H1s and angles**

| # | Title tag | H1 | Angle |
| --- | --- | --- | --- |
| A1 | Personal Injury Answering Service for Law Firms \| Della | Personal injury answering service for law firms | After-hours injury calls answered, qualified and on the attorney's desk by dawn. Full copy in the Page copy tab |
| A2 | Personal Injury Intake, Day and Night \| Della | Personal injury intake that doesn't stop at 6pm | What a complete first-call PI intake captures, and Della against hiring a night intake specialist |
| A3 | Personal Injury Intake Automation for Law Firms \| Della | Automate personal injury intake without losing the caller | What to automate (first call, qualifying, routing, follow-up) and what stays with people (advice, sign-up) |
| A4 | Mass Tort Intake: Screen Every Inbound Call \| Della | Mass tort intake: screen every inbound call against your criteria | Definition first, then campaign spikes, criteria screening and nights. See the gate below |
| A5 | Personal Injury Answering Service Pricing \| Della | What a personal injury answering service costs | Per-minute, per-call and flat pricing explained, then Della's plans and a plain comparison |
| A6 | Free Personal Injury Intake Form (PDF and Template) | Free personal injury intake form | The questions Della asks on every injury call, readable on the page, with an editable template for an email address |

**Two gates on this site**

- **A4 needs a mass tort flow.** Della's agents are built for PI and accident injury calls, not campaign screening against tort criteria. Until a screening flow exists, publish A4 as a guide (what mass tort intake is, how firms run it) with a soft CTA. Switch it to a product page when the flow is live. Don't claim it before then.
- **No Spanish page here.** The PI agent is English-only today (Phase 08 sets it to en-US). Spanish lives on site B's bilingual page, which links here when PI gets a Spanish locale.

**A6 changes after the calldella.com check.** calldella.com already has a post on what belongs on a PI intake form, so it keeps the head term. A6 targets the template and PDF searches (50 a month) and links to that post. Site A's total drops to about 1,990.

## Site B: virtualreceptionistforlawyers.com

Eight launch pages plus About, about 8,140 searches a month across their terms, and two vertical pages in phase 2. Each page owns one word family, so the home page (virtual receptionist) and B2 (answering service) never fight for the same query. Your electrician GSC data showed what two pages on one query does to rankings.

| # | URL | Primary | Secondary | Searches |
| --- | --- | --- | --- | --- |
| B1 | / | virtual receptionist for lawyers 300 (0) | live virtual receptionist for lawyers 150 (12); legal intake virtual receptionist 90 (n/s); virtual receptionist for law firms 70 (10) | 610 |
| B2 | /legal-answering-service/ | legal answering service 1,400 (18) | law firm answering service 700 (19); answering service for lawyers 400 (12); legal answering service for law firms 60; what is legal answering service 60. Stretch: lawyer answering service 700 (45), attorney answering service 400 (45) | 2,620 |
| B3 | /24-7-answering-service/ | 24 7 answering service for lawyers 150 (0) | 24 hour legal answering service 200 (15); 24/7 legal answering service 150 (11); after hours legal answering service 100 (n/s); best after hours answering service for lawyers 100 (13); 24/7 answering service for lawyers 100 (n/s) | 800 |
| B4 | /legal-intake-service/ | legal intake services 300 (1) | answering service with legal intake 300 (8); legal intake service 250 (1); legal intake phone services 200 (1); outsource legal intake 200 (0); legal intake companies 150 (2); law firm intake services 100 (2) | 1,500 |
| B5 | /ai-receptionist/ | ai receptionist for law firms 250 (9) | legal intake automation 250 (6); automated legal intake 150 (8); ai legal intake 150 (5); ai receptionist for lawyers 70 (5); ai answering service for lawyers 50 | 920 |
| B6 | /bilingual-answering-service/ | bilingual legal answering service 200 (4) | bilingual law firm answering service 150; spanish legal answering service 50; best multilingual ai receptionist for law firms 40; affordable bilingual legal answering service 30 | 470 |
| B7 | /cost/ | legal answering service cost 150 (1) | cost of attorney answering service 100 (0); 24 hour legal answering service cost 80; legal intake outsourcing cost guide 70; law firm answering service pricing 40; legal intake service pricing 40; attorney answering service rates 30 | 510 |
| B8 | /best-legal-answering-services/ | best law firm answering service 150 (2) | best attorney answering service 150 (12); best virtual receptionist for law firms 150 (12); best answering service for lawyers 150 (20); best virtual receptionist for lawyers 90; best ai receptionist for law firms 20 (3) | 710 |
| B9 | /immigration/ (phase 2) | immigration attorney answering service 100 | immigration law firm answering service 60 | 160 |
| B10 | /criminal-defense/ (phase 2) | criminal lawyer answering service 60 | 24/7 criminal defense answering service 60 | 120 |
| B11 | /about/ | none | Shared with site A's About in substance, written fresh | none |

**Titles, H1s and angles**

| # | Title tag | H1 | Angle |
| --- | --- | --- | --- |
| B1 | Virtual Receptionist for Lawyers \| Della | A virtual receptionist for lawyers that takes the intake, not a message | Full copy in the Page copy tab. Answers the "live receptionist" search honestly: Della is AI, and the page says what that means for the caller |
| B2 | Legal Answering Service for Law Firms \| Della | Legal answering service built for intake, not messages | Full copy in the Page copy tab. Defines the category, then shows where message-taking services fall short at night |
| B3 | 24/7 Answering Service for Lawyers \| Della | 24/7 answering service for lawyers: nights, weekends and holidays | The hours a firm actually covers against the 168 in a week; urgent calls reaching the on-call attorney |
| B4 | Legal Intake Services: Outsource the First Call \| Della | Legal intake services for the calls your team can't take | Answering service against intake service; what a qualified intake contains; what stays with the firm |
| B5 | AI Receptionist for Law Firms \| Della | AI receptionist for law firms, built only for legal intake | What an AI receptionist can and can't do on a legal call; no advice, recording disclosure, data handling |
| B6 | Bilingual Legal Answering Service, English and Spanish \| Della | Bilingual legal answering service, English and Spanish | Spanish callers at night. Honest scope: live on immigration intake today, PI and criminal when ready |
| B7 | Legal Answering Service Cost in 2026 \| Della | What a legal answering service costs in 2026 | Pricing models, published price ranges checked and dated at build, a missed-call cost sum the reader does, then Della's price |
| B8 | Best Legal Answering Services for Law Firms (2026) | Best legal answering services for law firms in 2026 | Disclosed comparison. Della is listed as ours, competitors judged on published facts only, dated |

**Rules for B7 and B8**

- Competitor prices and features come only from their own published pages, checked and dated during the build, each linked. Nothing from memory or third-party lists.
- B8 says at the top that Della is ours. The criteria table scores everyone the same way, and it names where a human service is the better fit (complex calls in many practice areas, firms that want a person every time).
- No star ratings, review scores or testimonials until real firms give them. That keeps the pages inside the FTC endorsement rules and your own no-fake-reviews line.

**B5 owns "ai receptionist for law firms".** calldella.com's SEO plan had /how-it-works on that term. It retargets to after-hours legal intake and links to B5, which fits the brand bible's line that Della is a specialist, not a receptionist.

## Guides and articles

One guide a week per site from week 3, each answering a question buyers ask before they shop, and each linking up to the service page that owns the money term. G1 now lives on calldella.com, where its citations build the brand, and the feeders link to it. G3 and G6 are dropped because calldella.com already covers them.

| # | Site | Guide | Target (vol, KD) | Links up to |
| --- | --- | --- | --- | --- |
| G1 | B | How many calls do law firms miss? Moves to calldella.com/operations/ | Citation magnet. No head term | B2, B3 |
| G2 | B | What is legal intake, and who should do it? | what is legal intake 70 (1); what is a legal intake specialist 80 (1) | B4 |
| G3 | B | Legal intake metrics to track (dropped: calldella.com Pillar B) | legal intake metrics to track 70 (n/s) | B4 |
| G4 | B | How to choose a legal intake provider | how to choose a legal intake provider 70 (n/s) | B8 |
| G5 | B | AI vs human answering service for lawyers | ai vs human answering service for lawyers 20 (2) | B5 |
| G6 | B | Free law firm intake form (dropped: overlaps calldella.com) | law firm intake form 100 (1); legal intake form 90 (1) | B4 |
| G7 | A | What happens when an injury caller reaches voicemail | Supports A1 | A1 |
| G8 | A | PI intake software vs an intake service: which do you need? | personal injury intake software 150 (0) | A3 |
| G9 | A | How fast should a PI firm call back a new lead? | Supports A1, A2 | A2 |
| G10 | A | What is mass tort intake? | what is mass tort intake 100 (n/s), if A4 becomes a product page | A4 |

**G1 sources (checked 25 Oct 2026, re-check before publishing)**

- Clio's 2024 Legal Trends Report secret-shopped 500 US firms: 40% answered the phone, down from 56% in 2019 ([ABA Law Practice Magazine](https://americanbar.org/groups/law_practice/resources/law-practice-magazine/2025/march-april-2025/laws-new-first-impression-transforming-client-intake)).
- The same study found 48% of firms unreachable by phone, even with the chance to return a message ([Oklahoma Bar Journal, Sept 2025](https://www.okbar.org/obj/2025/september/84)).
- An earlier ABA Law Practice Division study found under 10% of callers reached a lawyer and 32% went straight to voicemail ([Lawyers Mutual NC](https://www.lawyersmutualnc.com/blog/how-your-telephone-is-costing-you-clients)).
- Cite Clio's own report page as the primary source on the live site, and quote no statistic without a named source and year. Vendor blog stats ("62% sign with the first firm") stay out unless traced to the original study.

Guides run through your content machine if it can post to static sites; otherwise they're Markdown files in the repo, built on push.

## SPIN copy framework

A web page can't ask questions, so it lets the reader answer them. Every service page runs in the same order: name their problem, make them count its cost, let them picture the fix, then show Della meeting the needs they've just admitted to. Price and features come late, because features shown before the need is felt raise price sensitivity.

**Page order (every service page)**

1. **Hero.** H1 with the primary keyword. One subhead that answers the search. Call Della button. One trust line: built only for legal intake, never gives legal advice. No price, no feature list.
2. **Answer block.** 40 to 60 words that answer the page's question outright ("A legal answering service is..."). It's the paragraph AI engines lift, so it stands on its own.
3. **Problem (implied needs).** "Where your after-hours calls go now." Three short problems in the buyer's words: voicemail, a service that only takes a name and number, Spanish callers at night, staff on call at 11pm. Situation questions are skipped; the research already answers them.
4. **Implication.** The chain: missed call, caller rings the next firm on Google, the ad spend behind that call is wasted, the case goes elsewhere. One sourced statistic. Then a small calculator where the reader enters their own after-hours calls, share that are new cases, signing rate and average fee. We never supply their numbers; they do the sum.
5. **Need-payoff.** Two or three questions the reader answers in their head: "If every one of those calls was qualified and on your desk at 7am, how many would you sign?" "Whose evenings come back, yours or your team's?"
6. **How Della meets it.** A short two-column list, problem on the left, what Della does on the right. One row per problem named in step 3, five rows at most. These are benefits in the SPIN sense: each answers a need the page has already raised.
7. **Proof.** Ring the line yourself. A sample morning brief, clearly labelled as a sample with a test caller. No testimonials until real firms give them.
8. **Objections FAQ.** The five from the launch plan, answer first: we already have a service; callers want a person; bar rules and ethics; price; our case management software. Marked up as FAQPage.
9. **Commit.** One advance: call Della, then start or book. The forwardable box for the managing partner sits here.

**Writing rules**

- US English for these sites (the audience is American), in the Call Della voice from DELLA\_BRAND.md (editorial pacing, trade-publication tone), plus the SPIN skill's rules: no em dashes, no exclamation marks, no filler. Della is always "she".
- Della brand voice: plain, calm, specific. Banned: leverage, seamless, robust, cutting-edge, revolutionary, solutions, game-changer.
- Never overpromise. Della answers, qualifies and reports; the attorney decides and signs.
- No invented numbers. Every statistic has a named source and year, linked. No "firms recover X cases a month" until Della has real data.
- The reader's words, not ours: "the phone rings at 9pm and nobody picks up", not "after-hours coverage gaps".
- Price appears after value: in step 9 on the home pages, and on the cost and pricing pages. Never in a hero.

**Content units each page needs, for the build**

| Unit | Rule |
| --- | --- |
| Answer block | 40 to 60 words, starts with the term, no pronouns that need context |
| Statistic | One per page minimum, source and year inline, linked |
| Calculator | Four inputs, no defaults, result as a monthly figure, works without JavaScript as a written sum |
| Problem and fix list | Five rows at most, mirrors step 3 |
| FAQ | Four to six questions, answers 40 to 80 words, verbatim in the schema |
| Forwardable box | Five lines: problem, cost, fix, price, link. Copy and email buttons |
| Updated date | Visible "Last updated" date, matches dateModified in the schema |

## AI search (GEO) spec

The same five pillars Antek sells as GEO, applied to Della's own sites: citability, schema, crawler access, entity, monitoring. The aim is for ChatGPT, Perplexity, Claude and Google's AI Overview to name Della when a lawyer asks for an answering service.

**1. Citability**

- Every H2 is a question buyers actually ask, taken from People Also Ask and the keyword data ("How much does a legal answering service cost?").
- The first sentence under each H2 answers it. Detail follows.
- One fact per sentence. Comparisons in real HTML tables, not images.
- One fixed description of Della, word for word on all three sites, in llms.txt and in the schema: "Call Della is an after-hours intake specialist for law firms: personal injury, criminal defense and immigration. Della answers your firm's overnight phone, qualifies every caller, and delivers a triage-ready dossier by dawn. (calldella.com's own llms.txt wording)" Change it in one place, and the build copies it everywhere.
- Visible "Last updated" date on every page. AI engines favour recent pages on fast-moving topics.

**2. Schema (JSON-LD, generated from page data so it can't drift)**

| Page type | Types |
| --- | --- |
| Every page | Organization (one shared @id at calldella.com/#org, parentOrganization Antek Automation, sameAs links), WebSite, BreadcrumbList |
| Service pages | Service (serviceType, provider = the shared org, areaServed US, audience law firms) with Offers for Solo and Practice, priced from one config file |
| Pages with FAQs | FAQPage, text identical to the visible answers |
| Guides | Article with author Andy Norman (Person, sameAs LinkedIn), datePublished, dateModified, citation for each source |
| Never | Review, AggregateRating, or anything implying reviews Della hasn't got |

**3. Crawler access**

- robots.txt allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot.
- Cloudflare can block AI crawlers on new zones by default. Check the AI crawler setting and Bot Fight Mode on both zones, and confirm with a fetch as each bot after launch.
- llms.txt and llms-full.txt on each site, as on jobslocked.com: the fixed description, a page list with one line each, key facts (verticals, hours, plans and prices, what Della won't do), and contact.
- Sitemaps submitted to Google Search Console and Bing Webmaster Tools, with IndexNow pings on every deploy. ChatGPT's search leans on Bing's index, so Bing is not optional.

**4. Entity**

- The same name, description, founder and parent company everywhere Della appears.
- Off-site listings that AI engines read are in Linking and off-site.

**5. Monitoring**

- CiteFire, as calldella.com's SEO plan already specifies, with Ahrefs Brand Radar as a cross-check, monthly, on these prompts: best legal answering service; best AI receptionist for law firms; personal injury answering service; after hours answering service for lawyers; bilingual legal answering service. Track whether Della is mentioned and which page is cited.
- A manual check of the same five questions in ChatGPT, Perplexity and Gemini each month, logged in the KB note.

## Speed and mobile build spec

The sites ship plain HTML and one stylesheet, with almost no JavaScript, so they load in under two seconds on a mid-range phone. jobslocked.com proves the approach: Lighthouse 100 on all four scores on mobile.

**Stack (recommended)**

- One repo, `Nipstar/della-feeders`, building both sites with Astro in static mode. Astro ships zero JavaScript unless asked, and gives shared layouts, Markdown guides and schema generated from page data.
- Why not plain HTML like jobslocked: its README warns that the header, footer and FAQ are copied on every page and must be edited everywhere. That won't hold for 30 pages across two sites plus a guide a week.
- Per-site config holds the domain, colours, nav and the CTA mode (book or start), so a third feeder later is a new config, not a new codebase.

**Performance budgets (Lighthouse mobile, enforced in CI)**

| Measure | Budget |
| --- | --- |
| Largest Contentful Paint | 1.8 s or less |
| Cumulative Layout Shift | 0.05 or less |
| Interaction to Next Paint | 100 ms or less |
| HTML per page | 30 KB gzipped |
| CSS, whole site | 12 KB gzipped, one file |
| JavaScript per page | 3 KB gzipped (calculator, copy button, sticky bar) |
| Fonts | Newsreader and JetBrains Mono (brand bible), static weights, Latin subset, 60 KB total, one preloaded |
| Third-party scripts at load | None. Plausible loads deferred |
| Lighthouse scores | Build fails under 95 in any category |

**Mobile patterns**

- Designed at 375 px first, 16 px side gutter, body text 17 px, tap targets 48 px.
- A sticky bottom bar on phones with Call Della and Start, shown once the hero scrolls away. Desktop shows the same two in the header.
- Comparison tables stay real tables for AI engines, and restack into cards below 640 px with CSS alone. No sideways scrolling.
- FAQs use native details and summary, no script. Calculator fields use numeric keypads and labels above the inputs.
- The sample morning brief is built in HTML and CSS, not a screenshot: sharper, smaller, and readable by AI.
- Visual style follows DELLA\_BRAND.md (the dossier look) so the feeders read as Della. The build prompt references its components by name.

**Hosting**

- A Coolify static app per site on the Contabo VPS, behind Cloudflare. Grey cloud for the first deploy so the certificate issues, orange after (Infrastructure Playbook gotcha).
- HTML cached at the edge with a short life and purged on deploy; hashed assets cached for a year.
- Security headers (HSTS, CSP, nosniff, referrer policy), www redirected to the bare domain, one trailing-slash rule, a real 404 page.
- axe shows zero accessibility violations; lang is en-US.

## Linking and off-site

Inside each site, links tell Google which page owns which term. Between the sites, links stay few and contextual, so the three read as one honest brand rather than a link network. Off-site, the work is getting Della listed where AI engines look.

**Inside each site**

- Home links to every service page; each service page links back, to two or three siblings, and to its supporting guide.
- Guides link up to the page that owns the term, with a partial-match anchor ("outsourcing legal intake" pointing to B4). Exact-match anchors only from guides, one per guide.
- Breadcrumbs on every page, matching the BreadcrumbList schema.

**Between the sites**

| From | To | Where |
| --- | --- | --- |
| B1 home, "for personal injury firms" section | A1 | In body copy |
| A1, "criminal defense or immigration?" line | B10 and B9 once live, calldella.com until then | In body copy |
| B6 bilingual | A1 | Only once the PI agent speaks Spanish |
| Every page, footer | calldella.com | "Della is made by Antek Automation" line |

No sitewide cross-links between A and B, and no links to the UK Antek network sites: different country, different buyer.

**Off-site, in order**

1. **Retell.** You're a Certified Retell Partner. Ask for a partner directory listing or a Della customer story. Retell's own law-firm page already ranks 9th for "virtual receptionist for lawyers".
2. **Software directories.** Capterra, G2, GetApp, Software Advice, Lawyerist's vendor list, LawSites and the ABA Legal Technology Resource Center, under answering service and virtual receptionist categories. AI engines quote these for "best" questions. Profiles only list facts; reviews come later from real firms. These are Call Della's listings, done once for the brand, not per feeder.
3. **Clio App Directory**, once the Clio Grow Lead Inbox integration from the launch plan is built.
4. **Listicle inclusion.** Publishers ranking or cited for best-of terms: MyCase blog, LawRank, Lawyer Monthly. Ask to be considered, with the live line to try. Skip lists run by competing AI vendors (Juryo, CaseGen).
5. **Bar journals and practice advisors.** Offer the G1 missed-calls data as a guest piece. The Oklahoma Bar Journal ran exactly this topic in September 2025. Slow, but the strongest trust a legal site can earn.
6. **Founder entity.** Della on your LinkedIn and a Crunchbase entry, both matching the fixed description.

No bought links, no private blog networks, no reviews we wrote ourselves.

## Measurement

The number that matters is firms that start or book from a feeder page; everything else explains why that number moved. Targets below are goals to steer by, not forecasts.

| Measure | Where it's read | Target |
| --- | --- | --- |
| Launch pages indexed | Search Console, Bing Webmaster Tools | All, within 14 days of launch |
| KD 0 to 5 primaries in the top 10 | Ahrefs Rank Tracker project with every primary and secondary | By week 8 after launch |
| "legal answering service" (KD 18) in the top 20 | Ahrefs Rank Tracker | By week 16 |
| Della named in AI answers | Ahrefs Brand Radar, five prompts | At least one of five by week 12 |
| Demos booked from each site | Cal.com bookings by utm\_source | Logged weekly; target set after 4 weeks of baseline |
| Clicks through to calldella.com | Plausible, by utm\_source and utm\_campaign | Logged weekly |
| Starts and bookings from feeders | Phase 10 signup records (UTM fields); Cal.com bookings until then | The headline number |

A 15-minute weekly look at these, and a monthly line in the Della KB note with rankings, AI mentions and signups.

## Rollout and dependencies

Both sites go live at the end of week 2, before any firm can be onboarded, so they're indexed and ageing by the time Della is ready to sell. The buttons switch from booking to self-serve signup only after the week 7 pre-flight.

&#91;embedded content: feeder rollout · 13 weeks from 26 Oct 2026\]

Site B is built first because it carries four times the search volume. Within each site, the order is home, then the pages with the most volume.

**What each step waits on**

| Step | Waits on | Until then |
| --- | --- | --- |
| Live demo numbers | Not used. No phone numbers on any site; the demo is booked and run live on the call | n/a |
| Start buttons | Phase 10 self-serve signup and BUILD\_SITE\_04 on calldella.com | Book a 15-minute walkthrough |
| A4 as a product page | A mass tort screening flow in Retell | A4 publishes as a guide |
| Spanish claims beyond immigration | A Spanish locale on the PI and criminal agents | B6 says Spanish is live on immigration intake only |
| B9 and B10 | Criminal and immigration flows tested on real calls (launch plan week 10) | Not published |
| Prices on any page | Tier names (default Solo and Practice) and the Slack and custom-intake split between them; prices are set at $329 and $598 | Prices read from one config file, so a change is one edit |

## Decisions for Andy

Each has a default in the build prompt, so nothing blocks if you agree with it.

1. **Second domain.** Still assumed to be virtualreceptionistforlawyers.com. Confirm, or tell me it's lawyervirtualreceptionist.com and the page map moves across unchanged.
2. **Stack.** Default: one Astro repo building both sites, hosted as Coolify static apps behind Cloudflare. Alternative: plain HTML per site like jobslocked.com, quicker to start but harder to keep in step.
3. **Tracked numbers.** Default: two new Retell numbers, one per site, both on the PI demo agent. Alternative: one shared number, cheaper but no per-site call attribution.
4. **Mass tort.** Build a screening flow so A4 can sell (it's over half of site A's search volume), or keep A4 as a guide. Default: guide.
5. **Who the sites say is behind Della.** Default: About pages name you and Antek Automation as a UK company, which is true and matches the schema. With no US entity yet, some firms may want to know who they're contracting with, so the About page says it plainly rather than leaving it out.
6. **Alert wording.** The launch prompts switch SMS off and give Practice Slack alerts. Default copy says "email and Slack alerts for urgent calls". If you register A2P and keep SMS, the copy changes in one config line.

**Added after the calldella.com check and your reply on 25 Oct**

7. **New tiers.** You've set a tier for solo lawyers with 300 minutes and a second tier with 600 minutes, with Group staying custom. Prices confirmed 25 Oct: $329 a month for 300 minutes and $598 for 600. Every page that shows a price also says what's included: the Call Della dashboard, urgent-call alerts and the morning brief (Page copy tab, "What you get"). "Starter" breaks the brand bible's rule against SaaS tier names, so the default is Solo, Practice, Group. Overage stays $0.50 a minute unless you change it. The change reaches calldella.com's pricing page and llms.txt, the Stripe catalogue in Phase 09, the launch plan, and the feeders' shared config.
8. **Who the copy speaks to.** Solo lawyers are now in scope alongside the brand bible's 10 to 50 attorney firms. Default: feeder copy speaks to solos and small firms, and mentions an intake team only as "if you have one".
9. **Live-site claims.** Fix calldella.com's integrations, Spanish, SOC 2, SMS and unsourced statistics in BUILD\_SITE\_04 (default), or leave them until launch.

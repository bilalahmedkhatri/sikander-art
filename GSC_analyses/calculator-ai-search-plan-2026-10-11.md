# Calculator content and AI search plan

Reviewed 2026-10-11. Market: Karachi, Pakistan; English. Calculator changes below are proposed, not implemented in this batch.

## Keyword evidence

Ubersuggest keyword_overview calls for the resolved Karachi location (1011081):

| Keyword | Reported monthly volume | SEO difficulty | Monthly history May–August 2026 |
| --- | ---: | ---: | --- |
| painting cost calculator | 30 | 13 | 10 each month |
| paint labour rates in karachi | 10 | 6 | 10 each month |
| painter charges | 10 | 18 | 0 each month |

Prioritise calculator intent and relevance to existing GSC traffic, then local labour-rate questions. These are modest-volume estimates, not evidence of a rising trend. Overview and history disagree for two terms; do not infer growth or claim current October demand. Pakistan English autocomplete also returned cost per sq ft, per room and labour questions; autocomplete is topic evidence, not a volume or trend measure.

A fourth lookup (painting cost per square foot) failed because the free account's three-report daily quota was exhausted. No retry or invented metric. A paid plan raises the quota: https://app.neilpatel.com/en/pricing.

## Calculator updates in priority order

1. Correct estimate scope. The engine never uses serviceType or propertyType to change pricing. Restrict numeric estimates to supported room painting, or obtain verified formulas before quoting waterproofing, epoxy, wood polish or full-home packages. Owner validation is needed for rates and location multipliers; do not label them verified market rates or update prices merely for a new year.
2. Suggested title: `Painting Cost Calculator Karachi | Labour & Materials`. Description: `Estimate room painting costs in Karachi using dimensions, coats and paint quality. Compare labour and material costs, then request a site visit for a confirmed quote.` Remove unsupported `latest 2026` and `accurate` claims. Preserve the self-canonical.
3. Add visible measurement guidance: walls = 2 × (length + width) × height; optional ceiling = length × width. Explain floor area versus paintable area, current door/window deductions (21/12 sq ft), coats, location factor, putty, primer and extras. Example: 12 × 10 × 10 ft room gives 440 sq ft walls plus 120 sq ft ceiling, before deductions. Publish currency examples only from reviewed rates, labelled illustrative.
4. Answer customer questions: labour-only versus materials included; ceiling/primer/putty; why final quotes differ; one-room estimates; per-day versus per-area labour; specialist services needing inspection. The existing unconditional premium-material inclusion contradicts paintRequired=false; show only selected inclusions.
5. Fix result contrast (light text on almost-white), associate input labels, validate dimensions/negative inputs, and include chosen options in WhatsApp enquiries. Add relevant services/contact links.
6. Prerender/SSR useful content into initial HTML. Current build produces route-specific heads only; the body still depends on React. Keep one content source for visible pages and any machine-readable summaries.

## Changes completed locally

Updated existing public/llms.txt with Markdown links/descriptions, matching published contact details and actual calculator limitations. Removed unsupported reputation/project/client claims and added a describedby discovery link in the shared HTML template. Keywords appear naturally in relevant descriptions. No robot access rules changed.

## AI search priorities

- Crawlable, indexed service/calculator pages with useful content and correct canonicals.
- Accurate name, address, telephone and hours across the website and verified Google Business Profile.
- Genuine case studies with project scope, original photos, permissions and reviewed costs; never invent project evidence.
- Track search traffic, qualified enquiries and identifiable AI referrals over comparable periods after deployment. Citations and rankings are not guaranteed.

Google says it does not use llms.txt in Google Search, including generative features. It is optional supporting documentation for systems that choose to use it, not a ranking requirement.

Primary guidance checked:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://llmstxt.org/

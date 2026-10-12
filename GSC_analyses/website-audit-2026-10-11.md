# Sikander Arts website audit

Audit date: 11 October 2026 (Asia/Karachi). Scope: supplied PageSpeed reports, local GSC exports, source code, and rendered live homepage/services page. Website source was not changed.

## Main findings

Prioritize mobile loading, image delivery, canonical consistency, and the calculator's search/conversion journey. The reported indexing exclusions do not indicate a site-wide indexing failure. Desktop performance is already strong.

## Evidence and dates

- PageSpeed report: 11 October 2026, 01:26 GMT+5. Mobile: https://pagespeed.web.dev/analysis/https-sikanderart-com/latfyem2o5?form_factor=mobile . Desktop: https://pagespeed.web.dev/analysis/https-sikanderart-com/latfyem2o5?form_factor=desktop . Read through the report UI, including expanded diagnostics.
- `sikanderart.com-Coverage-2026-04-24.xlsx` is actually a Web Search performance export covering 7 July–6 October 2026, despite its filename. Use worksheet dates/Filters rather than filenames. It reports 94 clicks and 4,371 impressions, giving 2.15% overall CTR.
- Loose CSV files cover 2 March–22 April 2026. They are an older dataset, not the current totals. Devices sum to 8 Web clicks and 500 Web impressions. Do not add these totals to the newer export or interpret differently sized periods as a direct growth comparison.
- `indexed.xlsx` latest chart row, 4 October 2026: 7 indexed, 2 not indexed. `index pages.xlsx` lists seven indexed URL examples.
- `not index page.xlsx`: privacy policy, crawled currently not indexed. `redirect page 1.xlsx`: HTTP homepage, page with redirect.
- `performance 2.xlsx` is filtered to the query “how much does it cost to paint a house”; its 102 impressions/zero clicks are a subset of the Web export.
- `web_performance.xlsx` is filtered to Image Search, not Core Web Vitals: 687 image-search impressions and zero clicks. Chart totals are used; page/device tables can have different aggregation totals.
- `links.xlsx` contains only a header. It cannot establish that the website has zero backlinks.
- The ZIP contains the standard CSV export files; it is not an independent traffic source to add to the loose CSVs.
- The supplied sitemap screenshots show successful processing, 10 discovered pages, and a last read of 29 April 2026. Discovered does not mean indexed; screenshots do not establish current sitemap processing status.

## PageSpeed measurements

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 71 | 94 |
| Accessibility | 89 | 89 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 3.9 s | 0.8 s |
| LCP | 4.6 s | 1.1 s |
| TBT | 0 ms | 70 ms |
| CLS | 0 | 0.017 |
| Speed Index | 5.8 s | 1.8 s |

Both reports say real-user data is unavailable. These are lab results; they do not establish a Core Web Vitals field pass/fail or provide INP. The mobile LCP is poor against the 2.5-second good threshold. CLS and TBT are already healthy in these tests.

Mobile diagnostics:

- Total network payload: 10,768 KiB (~10.5 MiB).
- Image delivery estimated saving: 9,707 KiB (~9.5 MiB).
- Render-blocking estimated saving: 1,540 ms; main CSS takes 190 ms and Google Fonts stylesheet takes 750 ms in the diagnostic table.
- Unused JavaScript estimated saving: 134 KiB, comprising 66.7 KiB from first-party code and 67.1 KiB from Google tag.
- LCP diagnostic identifies the navbar text “PROFESSIONAL PAINTING CONTRACTORS”, with 2,320 ms element render delay. This diagnostic timing is not interchangeable with the simulated 4.6-second LCP metric.
- Cache-lifetime estimated saving is only 2 KiB: low priority.

Estimated savings overlap and must not be added into a promised speed improvement.

## Priority 1: Mobile loading and images

### Resize/compress oversized images and lazy-load lower sections

Confirmed by PageSpeed and source in `components/Gallery.tsx`, `components/Services.tsx`, `components/About.tsx`, and portfolio/gallery pages. Several Pexels URLs request original files. Representative homepage resources:

| Resource | Transfer size | Current dimensions | Reported display dimensions |
| --- | ---: | --- | --- |
| Gallery before image, Pexels 11384223 | 3,003.9 KiB | 4160 × 2756 | 660 × 990 |
| Gallery before image, Pexels 3562689 | 2,358.5 KiB | 6000 × 3968 | 660 × 440 |
| Interior painting, Pexels 35419462 | 1,342.6 KiB | 6366 × 4320 | 796 × 448 |
| Gallery after image, Pexels 2681639 | 1,161.2 KiB | 4000 × 2646 | 662 × 992 |

Updates: serve compressed WebP/AVIF or verified image-CDN transformations, supply responsive `srcset` and `sizes`, use explicit dimensions/aspect ratios, and add `loading="lazy"` plus asynchronous decoding to below-fold images. Keep above-fold/LCP assets eager when needed. Do not preload gallery images: the measured mobile LCP is text. Apply the same image policy to all routes.

Acceptance: verify responsive image selection and picture quality at mobile/desktop widths; confirm below-fold images are deferred; compare network payload before/after. Set a practical initial homepage budget around 1–2 MiB, then refine it against visual quality and real traffic.

### Remove deliberate first-paint delays

`App.tsx` hides the entire app behind a simulated 300 ms loading state. `components/Hero.tsx` starts its heading at opacity zero with 1.2 seconds delay and a long spring animation; subtitle waits 2 seconds and CTAs wait 2.4 seconds. Navbar/logo also use animation effects. This is verified delayed display; the exact contribution of each animation to measured LCP requires a follow-up trace.

Updates: render useful content immediately, show the primary heading/navbar/CTAs without entrance delays, limit mobile decoration, and support reduced-motion preferences. Preserve optional short effects outside the critical first render. Inspect the measured navbar LCP element after each change.

### Fonts and critical CSS

Self-host subsetted WOFF2 fonts where licensing permits. Select only weights actually used, preserve `font-display: swap`, and preload only critical font files. Current preconnect links already exist. Do not remove the main stylesheet blindly: it is only 11.2 KiB, and font loading is the larger blocking request in the table. Consider critical-CSS extraction only after measuring the simpler font changes.

## Priority 1: Canonicals and important service indexing

The site is a Vite/React client-rendered SPA. `index.html` sends the homepage canonical/title/description and an empty root. `components/SEO.tsx` later changes the canonical and metadata using `useEffect`. The initial and rendered canonical differ for inner routes.

Preferred update: prerender the small set of marketing routes with complete content, route-specific title/description and self-canonical in the initial response. SSR or an SSG migration is another option, but a full framework migration is not necessary for the first improvements. An interim option is to omit the incorrect shared initial canonical and inject one consistent route canonical, following Google's JavaScript guidance.

The seven indexed examples are home, contact, portfolio, gallery, view-projects, about, and calculate-cost. `/services` and `/terms-of-service` are present in the local ten-URL sitemap but absent from this list. Their actual Google indexing reason is unknown. Inspect `/services` first: verify live fetch, rendered content, indexing permission, declared canonical, Google-selected canonical, and discovery; then request indexing after material corrections. Treat terms as lower commercial priority.

`vercel.json` rewrites every path to the SPA and `App.tsx` has no catch-all not-found route. This creates a potential soft-404 risk. Add an accessible not-found page and correct HTTP 404 handling for nonexistent URLs. Also serve static discovery files with their correct content type. Actual production HTTP statuses could not be independently checked from the shell due network restrictions.

## Priority 2: Calculator and service content

Latest Web export, Pages worksheet:

| Page | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| calculate-cost | 54 | 2,896 | 1.86% | 6.67 |
| contact | 26 | 813 | 3.20% | 11.29 |
| home | 6 | 161 | 3.73% | 8.34 |
| gallery | 5 | 305 | 1.64% | 13.39 |
| view-projects | 2 | 152 | 1.32% | 16.74 |
| about | 1 | 41 | 2.44% | 15.73 |
| portfolio | 0 | 82 | 0% | 17.06 |

Calculator supplies about 57% of the property's clicks. Mobile supplies 67 of 94 clicks (~71%). Focus speed and lead tracking on calculator/contact as well as homepage.

The query “how much does it cost to paint a house” has 102 impressions, average position 7.08, and zero clicks. “paint labour rates in karachi” has 39 impressions, 3 clicks, average position 3.77. “paint services in karachi” has 40 impressions and average position 58.75. Low sample sizes constrain firm conclusions about CTR or query-level growth.

Updates:

- Improve calculator title and opening content to clearly describe Karachi/Pakistan painting costs. Suggested title: “Painting Cost Calculator Karachi | Labour & Material Rates 2026”. Google may rewrite titles; verify displayed snippets rather than promising exact presentation.
- Publish verified rate ranges, labour/material inclusions, wall-area versus floor-area explanation, number of coats, putty/primer assumptions, and worked room/home examples beside the calculator.
- Explain that `utils/Rates.ts` contains base rates, coat/ceiling adjustments, and location multipliers. Displayed estimates must explain these adjustments; do not label base numbers as final market quotes without validation.
- Add useful FAQs and keep the estimate-to-WhatsApp path clear. Track estimate completion, WhatsApp click, call click, and qualified leads as separate events. A click is not proof of a lead or sale.
- Give homepage/services clear painting-in-Karachi headings and practical language. Current homepage H1 is “MASTER THE ART OF LIVING”; services H1 is “CRAFTING PERFECTION”. Suggested homepage H1: “Professional Painting Services in Karachi”.
- Develop substantial pages for interior/exterior painting, waterproofing, texture, wood polish, and epoxy as appropriate. Include genuine project examples, process, validated prices, locations served and relevant internal links. Avoid thin duplicated area pages.

## Priority 2: Accessibility and functioning controls

PageSpeed confirms an unnamed footer newsletter button, poor contrast on “EXTERIOR”, “GET ESTIMATE”, testimonial location text and contact response text, and skipped heading levels for testimonial/contact/footer labels.

Updates: give icon controls accessible names; use sufficiently contrasting text/button colors; use semantic heading sequences; provide visible keyboard focus and reduced-motion behavior. Decorative duplicate logo letters should be hidden from assistive technology, with one clear brand label. Live accessibility output currently repeats each logo letter several times.

Separate functional findings from source/live UI:

- Homepage “Explore Finish” service buttons have no navigation/handler in `components/Services.tsx`. Make them real service links or working actions.
- Footer newsletter form only prevents submission, and social links point to `#`. Connect them to real destinations/workflows or remove the unfinished controls.
- Gallery click targets should be keyboard-accessible controls; check modal focus/close behavior.
- Plain contact labels such as “Call”, “Email” and “Address” would be clearer than “Quantum Line”, “Neural Link” and “Strategic Center”.

## Priority 2: Real portfolio and business schema

Project/team/testimonial images reference Pexels/Unsplash, while project captions describe named Karachi jobs. Verify which work/photos are authentic. Use genuine photographs and documented case studies; label inspiration imagery transparently when retaining it.

LocalBusiness JSON-LD appears in both static HTML and the dynamically injected SEO script. Consolidate the business entity with a stable `@id`; add appropriate page/breadcrumb/service entities as needed. Business schema email is `bilal_azeemlab@gmail.com`, whereas visible contact email is `bilal_azeemlab@gmail.com`. Verify and align official details. Verify physical location/coordinates, service areas, experience, project counts and review totals.

The hardcoded 4.9 rating/150 reviews requires substantiation. Google does not grant review stars for self-serving LocalBusiness reviews; do not promise stars by adding or adjusting aggregateRating. The LocalBusiness image/logo URLs and two favicon sizes referenced by HTML are absent from local `public/`; verify the deployed responses and add real assets if needed. Production broken-asset status was not established.

## Priority 3: JavaScript and lower-impact diagnostics

All routes are eagerly imported in `App.tsx`. Use route-level dynamic imports for the large calculator/portfolio/gallery code, and investigate smaller motion imports when measuring savings. Preserve instant primary content.

The 134 KiB unused-JS estimate includes Google's analytics bundle; it is not all removable first-party code. Review analytics loading after critical content while retaining useful visit/lead measurement. First-party estimated unused code is 66.7 KiB. Avoid deleting analytics merely to raise a score.

Inspect the one non-composited animation and three long tasks after high-impact improvements. Cache savings are only 2 KiB. Agentic Browsing 1/4, llms.txt recommendations, and ai-catalog.json validity are lower priorities for this local business than speed, usable controls and commercial search visibility.

## GSC exclusions: actions to avoid

- HTTP homepage redirect: likely desirable HTTPS consolidation. Keep it if it permanently redirects to the correct HTTPS canonical without a chain. Do not try to index HTTP or remove the redirect just to clear the report.
- Privacy policy crawled/not indexed: low commercial priority. Keep the page accessible; review content and canonical if necessary. Do not repeatedly request indexing as the main growth strategy.
- Sitemap success: preserve the sitemap and update it for genuine URL/content changes. `lastmod` should describe actual meaningful updates. Changing `<priority>` or `<changefreq>` is not a search-ranking fix.
- SEO 100 is a basic Lighthouse audit result, not proof of complete indexing or strong rankings. No CrUX data is unavailable measurement, not a failed field assessment.

## Rollout and verification

1. First batch: resize/lazy-load images, remove initial display delays, simplify critical fonts; repair obvious button/contrast issues alongside these changes.
2. Second batch: route-specific prerendered HTML/canonicals, important `/services` URL Inspection, real 404 behavior and static assets.
3. Third batch: calculator content/snippet improvements, verified case studies/business data, lead analytics and targeted service pages.
4. Repeat supplied mobile/desktop tests with comparable conditions, using multiple runs and median results. Also test calculator/contact/services individually; the supplied reports test homepage only.
5. Aim for mobile lab LCP at or below 2.5 seconds, minimal CLS, and maintained healthy TBT. Do not promise a score or ranking increase before measurement.
6. Verify canonical/metadata/content in initial and rendered HTML, status codes, sitemap XML and asset content types. Inspect Google-selected canonical in GSC after recrawl.
7. Review search clicks, CTR, impressions, country/device/query mix and qualified leads over comparable 28-day periods. Allow recrawl and sufficient data before attributing changes.

## Primary guidance

- Google JavaScript SEO/canonical guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google review snippet eligibility: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Core Web Vitals thresholds and field assessment: https://web.dev/articles/vitals

Limitations: no authenticated live GSC session, no standalone Chrome DevTools trace, no independent production header/status crawl. Source observations may differ from deployment. Live rendered homepage/services UI and supplied PageSpeed resource diagnostics were verified; other production asset/HTTP findings are explicitly verification tasks.

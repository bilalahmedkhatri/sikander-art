# Calculator review scenario — 12 October 2026

Status: review only. Production calculator, rates, SEO title/description, canonical, URL and visible content are not edited in this scenario. Earlier authorised performance/font/canonical/llms changes remain as they were. Approval of this scenario is required before integrating it into the actual calculator, as requested by the owner.

## Pricing rules proposed

All existing monetary base rates ×1.20. Percentage factors do not increase: location, coats, ±10% display band and roof 5% retain their existing meanings. Newly entered pack/scaffolding/minimum prices are the actual proposed inputs and receive no automatic extra 20%.

| Item | Current base | Proposed base |
| --- | ---: | ---: |
| Labour standard / sq ft | 35 | 42 |
| Labour good / sq ft | 40 | 48 |
| Labour premium / sq ft | 50 | 60 |
| Material standard / sq ft | 8 | 9.60 |
| Material good / sq ft | 14 | 16.80 |
| Material premium / sq ft | 22 | 26.40 |
| Putty / sq ft | 6 | 7.20 |
| Primer / sq ft | 4 | 4.80 |
| Door / piece | 800 | 960 |
| Window / piece | 500 | 600 |
| Texture / sq ft | 45 | 54 |

Room geometry, coat multiplier 1 / 1.6, ceiling's current full rate and texture's average-wall method stay the same for this review. Specialist services still need approved separate formulas. The scenario is one room for easy inspection; implementation must support all current rooms.

### Door/window rule

Woodwork ON: subtract 21 sq ft per door and 12 per window and add selected woodwork charges. Woodwork OFF: do not subtract either and do not charge woodwork, even if counts remain stored. This follows the owner's requested rule; actual opening measurements could later be separated from polish selection.

### Coverage, litres and wastage

Coverage input must be **sq ft per litre per coat**. If a manufacturer provides coverage for a complete two-coat system, it must be converted/labelled accordingly before use; do not multiply coats twice.

```
raw paint litres = net area × actual coat count / coverage
waste litres = raw litres × wastage percent / 100
required litres = raw litres + waste litres
packs = ceiling(required litres / pack size)
purchase litres = packs × pack size
```

Quantity here covers wall/ceiling finish paint only, not primer, putty, texture or wood products. Product-specific quantities require separate coverage inputs later.

Two mutually exclusive material-price modes:

- Area mode: current material rate ×1.20 × net area × location × coat multiplier. Wastage cost is a separate material percentage. Litres/whole packs are informative; pack price is not added.
- Pack mode: replace the old area material charge entirely with whole packs × entered pack price. Baseline packs and any additional packs caused by wastage are displayed separately. Coverage/coat count determine quantity; location and coat multipliers do not multiply the supplier pack price again. Wastage may increase litres without adding a whole pack, so the waste cost can be zero in this mode. Rounding surplus is not additional charged wastage.

Paint material OFF: paint litres, paint material cost and paint wastage cost zero. Other selected extras retain the current calculation pending a decision about labour/material splitting.

Sample coverage 100 sq ft/litre/coat, wastage 10%, pack size 4 L are editable illustration inputs, not verified product specifications. Pack price starts 0; pack mode will ask for a positive price rather than return a false zero-cost quotation.

### Roof, scaffolding and minimum

Roof is optional, 5% of the painting subtotal including paint wastage and selected prep/wood/texture costs. It is a surcharge, not a roof area/waterproofing model. Roof switch is ON in the review example so its effect is visible. Production default to confirm at review: proposed OFF until customer selects roof work.

Scaffolding is a separate fixed PKR allowance; default 0 because no verified rate was provided. It is not multiplied by location, roof or coats. Future day/height-based access pricing can replace this after approval.

```
painting subtotal = labour + material + wastage + selected extras
roof = selected ? painting subtotal ×0.05 : 0
before minimum = painting subtotal + roof + scaffolding
minimum top-up = max(0, minimum job amount − before minimum)
total = before minimum + minimum top-up
```

Minimum is a floor on the total, not an extra fee added to every job. Default minimum 0; owner input required. Proposed range, if retained, is ±10% around the pre-minimum total, with both ends floored at the minimum so the lower figure cannot contradict the minimum charge. The preview displays the total only; interval logic is an integration item.

## Review example

12 ×10 ×10 ft; ceiling, putty, primer, Good paint, two coats, Gulshan factor 1.60; no doors/windows/texture. Area 560 sq ft.

| Step | PKR |
| --- | ---: |
| Current default (no roof) | 86,374.40 |
| +20% monetary rates, no new charges | 103,649.28 |
| Roof 5%, wastage 0% | 108,831.744 |
| Sample wastage 10%, then roof 5% | 111,360.6144 |

With sample coverage: raw paint 11.20 L, waste 1.12 L, required 12.32 L, purchase 4 ×4 L packs =16 L. Area mode is selected so purchase-pack cost is not added again. Scaffolding/minimum both zero in this example.

## Protect traffic keywords

Latest supplied Web export (`sikanderart.com-Coverage-2026-04-24.xlsx`, actual Chart period July–October as documented in audit) has these named query rows with clicks:

| Query | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| paint labour rates in karachi | 3 | 39 | 3.77 |
| painter karachi | 1 | 44 | 9.09 |

Query totals need not equal page/property totals, so these are not all possible traffic phrases. Preserve existing painting cost calculator, painter charges and online wall-painting estimate relevance as well. Preserve `/calculate-cost`, canonical, calculator H1, internal links and existing metadata in this review. Record metadata/content baseline before any later implementation; do not delete a ranking phrase to insert price/year variants.

The previous suggestion to replace the title is superseded by the owner's preservation instruction. First implementation should be additive content and calculator usability. Any later title revision needs a separate comparison with the retained keywords and actual approved pricing claims.

## Additive SEO content draft

Suggested new heading: **Paint labour rates in Karachi and painter charges**.

Draft paragraph: “Use our painting cost calculator to plan wall painting costs in Karachi. Enter your room measurements, select coats and paint quality, and compare labour and material costs. The estimate can include ceiling painting, putty, primer, woodwork and selected extras. Final painter charges depend on your property, access and agreed scope.”

Suggested new heading: **Painting price estimate: what is included?**

Draft paragraph: “The breakdown shows labour, paint material, selected preparation, roof surcharge and any scaffolding allowance separately. Paint quantity depends on the selected product's coverage, coat count and wastage allowance. A minimum-job adjustment applies only when the calculated amount is below the agreed minimum.”

FAQ topics: one-room cost; labour without material; per sq ft versus floor area; coverage and litres; wastage versus leftover pack paint; roof/access charges; minimum job; updated 2026 business rates. Add a genuine 2027 advance-planning answer only as a forecast/provisional budget until rates are reviewed. Use a real rate-review date and the owner's approved rates; no fabricated future “latest verified” price claims.

## Google guide mapped to implementation

Reviewed the user-linked official Starter Guide using the clean URL (authuser query was inaccessible). This is practical guidance, not a certificate or ranking guarantee:

- Keep useful content readable and original; answer actual painting questions without repeated keyword lists.
- Ensure Google can access the same useful content/resources as users; inspect rendering in GSC. Initial HTML content/prerendering remains needed here.
- Preserve canonicals, relevant descriptive links and existing paths; add meaningful service/contact links.
- Keep snippets accurate; record existing titles rather than replace them casually.
- Use real project photos near supporting descriptions and descriptive alt text.
- Structured data must match visible facts; no invented review ratings or guaranteed FAQ appearance.
- Measure comparable GSC and enquiry periods after deployment; no promise that preserving text freezes rankings.

Google explicitly says meta keywords are not used and keyword stuffing violates spam policies. Keywords belong naturally in useful visible copy.

Source: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Acceptance checks completed / integration gates

Scenario calculation checks passed for rate uplift, roof, door/window toggle, paint OFF, coverage/pack rounding, no double charging, scaffolding, minimum and invalid inputs. Browser interactions confirm result changes. Separate review files are outside public/ and are not indexed or shipped by the site build.

Before production integration: owner reviews scenario, supplies coverage/pack prices, scaffolding/minimum values and agrees roof/default/material mode. Then implement multi-room calculation, consistent ranges, input labels/validation, updated selected inclusions, quantity details and complete WhatsApp summary, plus additive SEO/prerender content. Run current SEO tests and calculator regression tests before deployment. Production deployment requires its own explicit request.

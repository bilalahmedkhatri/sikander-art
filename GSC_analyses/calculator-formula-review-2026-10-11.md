# Sikander Arts calculator — current formula review

Roman Urdu review, 11 October 2026. Yeh current code ki explanation hai, market-rate verification nahi. Calculator ya us ke rates is review mein change nahi kiye gaye. Aap 2–4 din mein verified rates bhej sakte hain.

Sources: pages/CostCalculator.tsx (calculateCost), utils/Rates.ts, utils/CalculatorProperties.ts. Example results actual calculateCost function ko extract/transpile karke run kar ke verify kiye hain. Full inputs/results calculator-current-formula-examples.json mein hain.

## 1. Defaults

- Interior Painting; House / Bungalow.
- Ek Living Room: length 12 ft, width 10 ft, height 10 ft.
- Paint included, Good quality, 2 coats.
- Ceiling, putty, primer ON. Woodwork, texture, roof OFF.
- Doors/windows zero. Location Gulshan-e-Iqbal.

## 2. Paintable area

Har rectangular room ke liye:

```
perimeter = 2 × (length + width)
walls = perimeter × height
ceiling = length × width, agar ceiling ON ho; warna 0
gross area = tamam rooms ke walls + selected ceilings
door deduction = doors count × 21 sq ft
window deduction = windows count × 12 sq ft
A = max(0, gross area − door deduction − window deduction)
```

Har room ki ceiling global checkbox se control hoti hai. Door/window counts poore project ke hain, room-wise nahi. Floor area seedha painting area nahi: 12 × 10 room ka floor 120 sq ft, walls 440 sq ft aur walls + ceiling 560 sq ft hain.

## 3. Base rates from code

| Quality | Labour PKR/sq ft | Paint material PKR/sq ft |
| --- | ---: | ---: |
| Standard | 35 | 8 |
| Good | 40 | 14 |
| Premium | 50 | 22 |

| Extra | Configured base |
| --- | ---: |
| Putty | PKR 6/sq ft |
| Primer | PKR 4/sq ft |
| Door polish/woodwork | PKR 800/door |
| Window polish/woodwork | PKR 500/window |
| Texture/wall designing | PKR 45/sq ft of designing area |
| One coat | multiplier 1.0 |
| Two coats | multiplier 1.6 |
| Roof | 5% of subtotal, if enabled internally |
| Displayed range | total minus/plus 10% |

Yeh base rates hain; location aur coats ke baad actual effective rate badalta hai. Drum/gallon ki UI descriptions (4500/drum, 5500/gallon, 8000+/gallon) calculation mein use nahi hotin. Engine litres, coverage, pack size ya supplier price calculate nahi karta.

## 4. Exact cost formulas

L = location multiplier; C = coat multiplier; A = net paintable area.

```
labour = A × labour[quality] × L × C
material = A × material[quality] × L × C, paint ON; otherwise 0
putty = A × 6 × L, putty ON; otherwise 0
primer = A × 4 × L, primer ON; otherwise 0
doors = door count × 800 × L, woodwork ON; otherwise 0
windows = window count × 500 × L, woodwork ON; otherwise 0
woodwork = doors + windows
designing area per room = ((length + width) / 2) × height × selected designing walls
texture = sum(designing areas for enabled rooms) × 45 × L
subtotal = labour + material + putty + primer + woodwork + texture
roof = subtotal × 0.05, roof ON; otherwise 0
total = subtotal + roof
minimum = total × 0.9
maximum = total × 1.1
```

Coat multiplier sirf labour aur paint material par lagta hai. Location factor labour, material aur saare listed extras par lagta hai. Invalid/missing location ya coats par fallback 1.0 hai. Quality ke liye equivalent safety fallback nahi. UI one/two coats deti hai.

## 5. Exact default example

12 × 10 × 10 ft, ceiling ON, Good paint, 2 coats, Gulshan L=1.60, C=1.60, putty/primer ON, no openings/extras:

| Item | Calculation | PKR |
| --- | --- | ---: |
| Walls | 2 × (12+10) × 10 | 440 sq ft |
| Ceiling | 12 × 10 | 120 sq ft |
| Labour | 560 × 40 × 1.60 × 1.60 | 57,344.00 |
| Material | 560 × 14 × 1.60 × 1.60 | 20,070.40 |
| Putty | 560 × 6 × 1.60 | 5,376.00 |
| Primer | 560 × 4 × 1.60 | 3,584.00 |
| Total | Sum | 86,374.40 |
| Minimum | total × .9 | 77,736.96 |
| Maximum | total × 1.1 | 95,011.84 |

UI rounds individual displayed values to whole rupees. Total shown: Rs. 86,374; range Rs. 77,737–95,012. Effective combined default rate 154.24/sq ft; the printed labour base 40 is not the final labour rate (default effective labour = 102.40/sq ft).

Same default with one changed option at a time:

| Scenario | Area sq ft | Total PKR |
| --- | ---: | ---: |
| Labour-only toggle | 560 | 66,304.00 |
| Ceiling OFF | 440 | 67,865.60 |
| One coat | 560 | 57,344.00 |
| One door + one window, woodwork ON | 527 | 83,364.48 |
| One texture wall | 560 | 94,294.40 |
| Exterior selected, other defaults unchanged | 560 | 86,374.40 |

Texture example: average wall length 11 ft × 10 ft height = 110 sq ft; additional texture charge = 110 × 45 × 1.60 = 7,920. Basic paint remains charged over the same wall.

## 6. Decisions needed before changing formula

1. Service type and property type do not affect the formula. Room name does not affect it either. Exterior, waterproofing, epoxy, wood polish and full-home service choices currently use the same room-painting calculation.
2. `ceilingMultiplier: 0.4` is defined but unused. Ceiling currently receives full labour/material/putty/primer rates.
3. Roof +5% exists in calculation, but the checkbox JSX is commented out and default false. It is not a roof-area or waterproofing model.
4. Door/window inputs appear only when woodwork is ON. Their counts remain in state when OFF; opening deductions continue, although woodwork charges stop. Separate openings from polishing would be clearer.
5. Labour-only zeroes paint material only. Putty/primer/texture/woodwork remain if selected; their rates have no labour/material split. Need to define what each rate includes.
6. Paint quality controls hide on labour-only, but the last selected quality still affects labour. This creates different invisible labour rates for the same visible labour-only form.
7. Designing walls use average wall width, not selected actual wall dimensions. Texture openings are not deducted, and base paint stays charged there. Confirm whether texture is an add-on or replacement.
8. All configured location factors are at least 1.50. There is no configured 1.0 base-area option. Factors can almost double materials as well as labour; owner must confirm whether travel/access justifies this.
9. The ±10% interval is a fixed display band, not a measured confidence interval or verified minimum/maximum quotation.
10. No coverage/litres/wastage/pack rounding; no explicit fresh-versus-repaint, wall condition, scaffolding, repairs, transport, tax, markup or minimum-job calculation. These may be implicitly in rates but are not separately specified.
11. Measurements/counts accept invalid/negative values; only final A is clamped to zero. Need validation before accurate results can be claimed.
12. Material/putty/labour costs aren't independently verified. Unconditional premium-materials inclusion and accurate/latest-rate marketing should match the final approved formula and options.

## 7. Rates aap kis format mein bhejein

Har service/finish ke liye ek row; exact number na ho to min/max aur reason:

| Service / finish | Surface / fresh or repaint | Unit | Labour | Material | Coats | Included prep | Brand/pack/coverage | Valid date | Notes/source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Interior economy | Existing good walls | sq ft of walls | Fill | Fill | Fill | Fill | Fill | Fill | Fill |
| Interior standard | New plaster | sq ft of walls | Fill | Fill | Fill | Fill | Fill | Fill | Fill |
| Interior premium | Repaint | sq ft of walls | Fill | Fill | Fill | Fill | Fill | Fill | Fill |
| Exterior/weatherproof | Elevation | sq ft of surface | Fill | Fill | Fill | Fill | Fill | Fill | Height/access |
| Putty | Wall/ceiling | sq ft | Fill | Fill | Fill | Sanding? | Product/coverage | Fill | New/old walls |
| Primer | Wall/ceiling | sq ft | Fill | Fill | Fill | Fill | Product/coverage | Fill | Fill |
| Texture | Feature wall | sq ft | Fill | Fill | System | Base coat? | Product/design | Fill | Replacement/add-on |
| Wood polish | Door/window/furniture | piece or sq ft | Fill | Fill | System | Sanding/sealer? | Product | Fill | Size/sides |
| Metal paint | Gate/grill | piece or sq ft | Fill | Fill | Fill | Rust removal? | Product | Fill | Access |
| Waterproofing | Roof/bathroom | sq ft of treated surface | Fill | Fill | System/thickness | Repairs? | Product/coverage | Fill | Warranty conditions |
| Epoxy | Floor | sq ft of floor | Fill | Fill | Thickness/system | Grinding? | Product/coverage | Fill | Minimum job |

Saath confirm karein: base rates one coat hain ya complete two-coat job? Ceiling same/separate rate? Door/window actual measurements ya fixed deductions? Area ke hisaab se material bhi badalta hai ya sirf labour/transport? Minimum charge, scaffolding, travel, tax, overhead/profit already included? Suggested estimate range? Aap ke approved rate card, recent supplier quotation/receipt aur 2–3 real completed-job breakdowns best calibration evidence hain. Customer personal details zaroori nahi.

## 8. Year/price keywords and SEO additions

Suggested intent phrases, not measured trends: painting cost calculator Karachi 2026; paint labour rates in Karachi 2026; house painting price Karachi; wall painting rate per sq ft; one room paint cost; labour charges with/without material; rang karwane ka kharcha; ghar paint karwane ka rate.

2026 can describe the guide/calculator edition now, but rates should say provisional until reviewed. Suggested temporary title: `Painting Cost Calculator Karachi 2026 | Price Estimate`. Once rates are confirmed: `Painting Rates Karachi 2026 | Labour & Material Calculator`. Use a real `Rates checked on` date, clear scope and evidence. Keep /calculate-cost stable.

2027 belongs in a genuine advance-budget FAQ (`2027 mein painting ka budget kaise plan karein?`) with current-estimate caveats until 2027 rates are actually available. Do not publish 2027 prices as latest verified rates in October 2026. Maintain one useful guide; yearly near-duplicate URLs are not necessary.

Priority additions:

1. Prerender useful calculator/guide content; initial HTML currently has route heads only.
2. Reviewed rate table with unit, coat count, inclusions, effective date; room example and measurement diagram.
3. Fresh painting/repainting and separate specialist-service models after owner rate review.
4. Paint quantity/pack estimation after product coverage data arrives; cost per finished coat/system rather than ambiguous raw rates.
5. Actual project case studies, original before/after photos, dimensions and actual approved scope/cost ranges.
6. Useful service pages with relevant links, real served areas, FAQs, consistent contact details and verified Google Business Profile information. Avoid copied area pages or invented reviews.
7. Download/share itemised estimate, clear exclusions and WhatsApp enquiry capturing chosen scope. These are user/conversion improvements; rankings are not guaranteed.
8. Compare GSC and qualified leads over equal periods after deployment. Distinguish impressions, rankings and real growth.

## 9. Similar products checked

These are public-page observations, not verified upward traffic trends or proof of ranking causality. Existing Ubersuggest daily quota was exhausted; no historical competitor traffic/backlink measurements were obtained. BuildQty's page could not be fetched, so it is excluded from verified comparison.

| Product | Verified page observations | Useful adaptation for Sikander Arts |
| --- | --- | --- |
| Asian Paints budget calculator (India; product benchmark, not Karachi rate source) | Fresh/repaint, interior/exterior, surface/product selections; coverage assumptions; product-only estimate caveat; download and price guidance | Clear assumptions, product data, downloadable itemised estimate and useful supporting content |
| Tawakkal Paint House (Karachi) | Service rate table splits material/labour; exterior floor surcharge explained; printable rate card and contact link | Owner-approved dated rate card, transparent unit/inclusions/access charges |
| Mechanics4U Karachi painter page | Job-based ranges, labour-only caveats, FAQs, local areas and Roman Urdu wording | Real local questions, job examples and scope explanations, appropriate service links |

Inference: These features answer cost, scope and next-step questions well. They may support relevance, trust and enquiries, but observing them does not establish why a site ranks or trends. Competitor prices are their published claims, not independently verified rates for your business; do not copy them into this engine.

Sources:

- Asian Paints: https://www.asianpaints.com/resources/tools/paint-budget-calculator.html
- Tawakkal: https://www.tawakkalpainthouse.com/rates
- Mechanics4U: https://mechanics4u.com/services/painter/karachi/
- Google AI Search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## 10. Complete location multiplier appendix

Generated directly from utils/Rates.ts below. These are configured factors, not independently verified city rates.

Total configured locations: 149. Range: 1.50–1.99. Missing location fallback: 1.0.

| Location key | Multiplier |
| --- | ---: |
| ajmer_monia_cooperative_housing_society | 1.51 |
| akhtar_colony | 1.52 |
| akramabad | 1.50 |
| al_ghazi_villas | 1.53 |
| al_hamra_society | 1.60 |
| al_hilal_chs | 1.68 |
| al_khizra_society | 1.54 |
| al_muslim_society | 1.54 |
| al_noor_society | 1.55 |
| al_qaim_city | 1.51 |
| al_sadaf_colony | 1.51 |
| al_falah_society | 1.54 |
| al_muntazar_garden | 1.52 |
| bukhari_colony | 1.51 |
| bukhari_commercial_area | 1.95 |
| bunder_quarter | 1.53 |
| bundhani_colony | 1.50 |
| burmee_colony | 1.50 |
| burns_road | 1.55 |
| c_1_area | 1.50 |
| cp_and_berar_chs | 1.63 |
| capital_cooperative_housing_society | 1.54 |
| catholic_colony | 1.62 |
| cattle_colony | 1.50 |
| central_jacob_lines | 1.52 |
| chakiwara | 1.50 |
| chakra_goth | 1.50 |
| chandni_chowk | 1.51 |
| chanesar_goth | 1.50 |
| chapra_square | 1.54 |
| chishti_nagar | 1.51 |
| chittagong_colony | 1.50 |
| city_railway_colony | 1.52 |
| civil_lines | 1.85 |
| clifton | 1.96 |
| commercial_area | 1.58 |
| commissioner_society | 1.60 |
| cornish_society | 1.65 |
| dha | 1.98 |
| dha_city | 1.75 |
| drigh_colony | 1.51 |
| e_area | 1.50 |
| eidgah_colony | 1.50 |
| essa_nagri | 1.50 |
| f_b_area | 1.54 |
| fc_area | 1.53 |
| faisal_cantonment | 1.80 |
| faisal_colony | 1.52 |
| faizabad_society | 1.51 |
| falcon_complex | 1.90 |
| faqir_muhammad_goth | 1.50 |
| fareed_niazi_society | 1.51 |
| farid_colony | 1.50 |
| farooq_e_azam | 1.52 |
| fatima_jinnah_colony | 1.51 |
| fazaia_housing_scheme | 1.82 |
| firdous_colony | 1.53 |
| fowler_lines | 1.54 |
| frere_town | 1.83 |
| frontier_colony | 1.50 |
| gabo_pat | 1.50 |
| gadap | 1.50 |
| gandhara_society | 1.54 |
| garden | 1.60 |
| gari_khata | 1.54 |
| gazdarabad | 1.53 |
| ghabool_town | 1.50 |
| ghanchi_para | 1.51 |
| gharibabad | 1.50 |
| ghausia_colony | 1.50 |
| ghazi_town | 1.51 |
| gillani_railway_station | 1.55 |
| gulshan_e_benazir | 1.50 |
| gulshan_e_hadeed | 1.53 |
| gulshan_e_iqbal | 1.60 |
| gulshan_e_maymar | 1.57 |
| gulshan_e_roomi | 1.54 |
| gulshan_e_shamim | 1.55 |
| gulzar_colony | 1.51 |
| gulzar_e_hijri | 1.56 |
| intelligence_colony | 1.50 |
| iqbal_colony | 1.50 |
| islam_nagar | 1.50 |
| islamia_colony | 1.50 |
| ittehad_town | 1.50 |
| jackson_bazaar | 1.52 |
| jafar_e_tayyar | 1.52 |
| jahanabad | 1.50 |
| jahangir_road | 1.54 |
| jahangirabad | 1.51 |
| jamali_colony | 1.50 |
| jami_commercial_area | 1.90 |
| jamshed_quarters | 1.57 |
| jamshed_road | 1.57 |
| jamshed_town | 1.57 |
| kaechs | 1.65 |
| kda_scheme_1 | 1.88 |
| keamari | 1.51 |
| kharadar | 1.53 |
| korangi | 1.50 |
| landhi | 1.50 |
| liaquatabad | 1.50 |
| lines_area | 1.51 |
| lyari | 1.50 |
| machs | 1.86 |
| malir | 1.51 |
| manghopir | 1.50 |
| manzoor_colony | 1.51 |
| mauripur | 1.50 |
| mehmoodabad | 1.53 |
| memon_goth | 1.50 |
| metroville | 1.54 |
| model_colony | 1.55 |
| napier_quarter | 1.53 |
| naval_colony | 1.60 |
| nazimabad | 1.54 |
| new_karachi | 1.50 |
| north_karachi | 1.50 |
| north_nazimabad | 1.55 |
| old_city_area | 1.52 |
| orangi_town | 1.50 |
| pechs | 1.70 |
| pib_colony | 1.52 |
| paposh_nagar | 1.53 |
| patel_para | 1.51 |
| punjab_colony | 1.54 |
| qasimabad | 1.52 |
| qayyumabad | 1.54 |
| quaidabad | 1.51 |
| ranchore_line | 1.53 |
| rizvia_society | 1.54 |
| site_area | 1.55 |
| saddar | 1.58 |
| safoora_goth_chowrangi | 1.54 |
| shah_faisal_colony | 1.52 |
| shahra_e_faisal | 1.80 |
| shershah | 1.51 |
| shireen_jinnah_colony | 1.50 |
| soldier_bazaar | 1.55 |
| steel_town | 1.54 |
| surjani_town | 1.50 |
| tariq_road | 1.75 |
| timber_market | 1.55 |
| up_more | 1.51 |
| water_pump | 1.53 |
| yaseenabad | 1.54 |
| zamzama | 1.99 |
| out_of_karachi | 1.99 |
| other_area | 1.75 |

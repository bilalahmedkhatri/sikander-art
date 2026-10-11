# Approved calculator implementation

Implemented locally on 12 October 2026. Owner approved the review scenario with **10%, not 20%** uplift. The earlier 20% review remains a historical proposal.

- Monetary base rates increased 10%; coat/location factors unchanged.
- Multi-room calculation extracted into utils/CalculatePaintingCost.ts with numeric validation.
- Optional roof adds 5% of painting subtotal, default OFF.
- Woodwork OFF ignores retained door/window counts for deductions and charges.
- Example editable coverage 100 sq ft/L/coat, wastage 10%, pack size 4 L. These still need product verification.
- Area and whole-pack pricing are mutually exclusive. Pack mode requires a positive price and replaces area material pricing. Paint OFF removes finish-paint quantity/material/waste; other selected extras remain.
- Scaffolding and minimum default zero; enter agreed amounts. Minimum tops up the project total, and displayed ranges cannot fall below it.
- Selected inclusions, readable result panel, labelled inputs and WhatsApp estimate details updated.
- Existing calculator title, description, H1 and URL retained. New guide adds useful cost/measurement/quantity questions, preserving existing painting keyword relevance. Guide is available in initial HTML and after React renders from one shared JSON source. This is initial guide content, not full application SSR.
- llms.txt updated to match implemented behavior.

Default sample (12×10×10 ft, ceiling, Good paint, two coats, Gulshan, putty/primer): Rs. 95,011.84 with zero waste; Rs. 97,219.584 with sample 10% waste; Rs. 102,080.5632 when roof also selected. Scaffolding/minimum zero. Quantity estimate: 12.32 L, purchase four 4 L packs. Pack quantity in area mode is informative, not an additional bill.

Specialist service pricing and actual supplier coverage/prices remain provisional pending owner data. Service/property choices describe scope and do not alter the room-painting model. No production deployment, push or commit performed.

Validation: 8 calculator tests and 4 SEO tests; TypeScript; production build; browser checks for default/roof results, opening toggle, quantity pricing and responsive display.

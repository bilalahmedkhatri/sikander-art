<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ac2c0c44-9e87-4eb6-a725-6d33600e3eff

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
## Production build and SEO

Run `npm run build` to bundle the site and generate HTML files for all eleven
routes. The generator reads each page's existing static `<SEO>` props, so its
initial title, description, canonical and sharing tags stay aligned with the
client-side metadata. Sitemap URLs and app routes are checked during generation.
These files provide route-specific HTML heads; page body content still renders
with React in the browser.

Vercel uses `cleanUrls: true` to serve `/services.html` at `/services`, and the
catch-all homepage rewrite has been removed. Unknown URLs return a real 404;
`public/404.html` supplies the error page. Keep the configured `npm run build`
command so route files are always generated before deployment.

Fonts are served from bundled Fontsource assets with `font-display: swap`.
Only the Latin weights used by the site are imported. The two critical 900-weight
fonts are preloaded; their licenses are included under `public/font-licenses`.

Validation: `npm run lint`, `npm run test:seo`, `npm run build`.
Use `npm run preview` to test the generated HTML routes locally. After deployment,
inspect `/services` in Search Console to verify Google's selected canonical.
# Calculator update

The calculator uses the approved 10% monetary rate increase, optional roof surcharge,
coverage and pack estimates, separate scaffolding and a minimum-job floor. Product
coverage and new charge defaults are labelled examples pending business review.
Run `npm run build` before `npm run test:calculator`; the tests also verify built
calculator content and retained traffic metadata. The calculator guide is generated
inside the initial HTML root and replaced by React with the same guide data.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { extractMetadata, applyMetadata, escapeHtml } from './seo-pages.mjs';

const files = ['App.tsx', ...(await readdir('pages')).filter(file => file.endsWith('.tsx')).map(file => `pages/${file}`)];
const metadata = (await Promise.all(files.map(async file => extractMetadata(await readFile(file, 'utf8'), file)))).flat();
const paths = new Set();
for (const page of metadata) {
  if (paths.has(page.path)) throw new Error(`Duplicate SEO route: ${page.path}`);
  paths.add(page.path);
}

const sitemap = await readFile('public/sitemap.xml', 'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!metadata.some(page => page.url === match[1])) throw new Error(`Sitemap URL has no generated page: ${match[1]}`);
}
const app = await readFile('App.tsx', 'utf8');
for (const match of app.matchAll(/<Route path="([^"]+)"/g)) {
  if (match[1] !== '*' && !paths.has(match[1])) throw new Error(`App route has no SEO metadata: ${match[1]}`);
}

const template = await readFile('dist/index.html', 'utf8');
const calculatorGuide = JSON.parse(await readFile('utils/CalculatorGuide.json', 'utf8'));
for (const page of metadata) {
  const filename = page.path === '/' ? 'index' : page.path.slice(1);
  if (!/^[a-z-]+$/.test(filename)) throw new Error(`Unsupported output filename: ${filename}`);
  let html = applyMetadata(template, page);
  if (page.path === '/calculate-cost') {
    const content = calculatorGuide.map(section => `<section><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.text)}</p></section>`).join('');
    // React replaces this initial root with the calculator and the same guide data.
    html = html.replace('<div id="root"></div>', `<div id="root"><main><h1>Painting Cost Calculator</h1>${content}<a href="/services">Painting services in Karachi</a> <a href="/contact">Request a project quotation</a></main></div>`);
    if (!html.includes(content)) throw new Error('Calculator initial content was not generated.');
  }
  await writeFile(`dist/${filename}.html`, html);
}
console.log(`Generated ${metadata.length} route HTML heads with matching titles, descriptions and self-canonicals.`);

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { extractMetadata, applyMetadata } from '../scripts/seo-pages.mjs';

test('all sitemap pages have unique metadata matching their canonical URLs', async () => {
  const files = ['App.tsx', ...(await readdir('pages')).filter(file => file.endsWith('.tsx')).map(file => `pages/${file}`)];
  const entries = (await Promise.all(files.map(async file => extractMetadata(await readFile(file, 'utf8'), file)))).flat();
  assert.equal(new Set(entries.map(entry => entry.path)).size, entries.length);
  const sitemap = await readFile('public/sitemap.xml', 'utf8');
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    assert.ok(entries.some(entry => entry.url === url), `Missing ${url}`);
  }
  const template = await readFile('index.html', 'utf8');
  for (const entry of entries) {
    const html = applyMetadata(template, entry);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(html.includes(`href="${entry.url}"`));
    assert.ok(html.includes(`property="og:url" content="${entry.url}"`));
    assert.equal(html.includes('fonts.googleapis.com'), false);
    assert.equal((html.match(/data-seo-schema="true"/g) ?? []).length, 1);
  }
});

test('head values escape quotes and markup without corrupting literal replacements', async () => {
  const html = applyMetadata(await readFile('index.html', 'utf8'), {
    title: 'Painting & "Finishes" <Karachi> $&', description: "Karachi's > best", url: 'https://sikanderart.com/services',
  });
  assert.ok(html.includes('Painting &amp; &quot;Finishes&quot; &lt;Karachi&gt; $&'));
  assert.ok(html.includes('Karachi&#39;s &gt; best'));
});

test('dynamic metadata fails the build rather than publishing a wrong homepage canonical', () => {
  assert.throws(() => extractMetadata('<SEO title={title} description="Test" url="https://sikanderart.com/" />', 'test.tsx'), /static strings/);
});

test('deployment routing serves route files instead of rewriting everything to home', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.cleanUrls, true);
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(config.rewrites, undefined);
  const notFound = await readFile('public/404.html', 'utf8');
  assert.ok(notFound.includes('noindex, follow'));
  assert.ok(notFound.includes('Page not found'));
});

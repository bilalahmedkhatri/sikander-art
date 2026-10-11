import ts from 'typescript';

const SITE_URL = 'https://sikanderart.com';

// Read the actual SEO props rather than maintaining a second metadata registry.
// Dynamic metadata must gain an explicit build-time implementation before use.
export function extractMetadata(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const entries = [];
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(ast) === 'SEO') {
      const entry = {};
      for (const attribute of node.attributes.properties) {
        if (!ts.isJsxAttribute(attribute) || !attribute.initializer || !ts.isStringLiteral(attribute.initializer)) {
          throw new Error(`SEO props must be static strings in ${filename}`);
        }
        entry[attribute.name.getText(ast)] = attribute.initializer.text;
      }
      for (const key of ['title', 'description', 'url']) {
        if (!entry[key]) throw new Error(`Missing SEO ${key} in ${filename}`);
      }
      const url = new URL(entry.url);
      if (url.origin !== SITE_URL || url.search || url.hash || (url.pathname !== '/' && url.pathname.endsWith('/'))) {
        throw new Error(`Invalid canonical URL in ${filename}: ${entry.url}`);
      }
      entry.path = url.pathname;
      entries.push(entry);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return entries;
}

export function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function applyMetadata(template, metadata) {
  const update = (pattern, replacement) => {
    const matches = template.match(new RegExp(pattern, 'g'));
    if (matches?.length !== 1) throw new Error(`Expected exactly one matching head tag: ${pattern}`);
    template = template.replace(new RegExp(pattern), () => replacement);
  };
  update('<title>[^<]*</title>', `<title>${escapeHtml(metadata.title)}</title>`);
  const tags = {
    'name:description': metadata.description,
    'name:robots': metadata.robots ?? 'index, follow',
    'property:og:title': metadata.title,
    'property:og:description': metadata.description,
    'property:og:url': metadata.url,
    'name:twitter:title': metadata.title,
    'name:twitter:description': metadata.description,
  };
  if (metadata.keywords) tags['name:keywords'] = metadata.keywords;
  if (metadata.image) {
    tags['property:og:image'] = metadata.image;
    tags['name:twitter:image'] = metadata.image;
  }
  for (const [selector, value] of Object.entries(tags)) {
    const separator = selector.indexOf(':');
    const attribute = selector.slice(0, separator);
    const key = selector.slice(separator + 1);
    update(`<meta ${attribute}="${key}"[^>]*>`, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  update('<link rel="canonical"[^>]*>', `<link rel="canonical" href="${escapeHtml(metadata.url)}" />`);
  return template;
}

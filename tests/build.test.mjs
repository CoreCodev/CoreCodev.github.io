// Revisa el sitio ya generado en dist/. Se ejecuta con `npm test`.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const FULL_NAME = 'Sebastian Rodrigo Rabanal Francia';
// Cualquier celular peruano; no se escribe el número real porque este repositorio es público.
const PHONE = /(?<![\w.-])(?:\+?51[\s.-]*)?9\d{2}[\s.-]*\d{3}[\s.-]*\d{3}(?![\w.-])/;
const CV = 'dist/Sebastian-Rodrigo-Rabanal-Francia-CV.pdf';
const html = readFileSync('dist/index.html', 'utf8');
const css = readdirSync('dist/_astro')
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(join('dist/_astro', file), 'utf8'))
  .join('');

const textFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /\.(html|xml|txt|js|css)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));

test('el nombre completo está en el título, la descripción y el H1', () => {
  assert.match(html.match(/<title>(.*?)<\/title>/)[1], new RegExp(FULL_NAME));
  assert.match(html.match(/<meta name="description" content="(.*?)"/)[1], new RegExp(FULL_NAME));
  // Se quitan las etiquetas sin añadir espacios: así lo lee un buscador que no aplica estilos.
  const h1Text = html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(h1Text, FULL_NAME);
});

test('hay un solo H1 y una dirección oficial', () => {
  assert.equal(html.match(/<h1/g).length, 1);
  assert.match(html, /<link rel="canonical" href="https:\/\/corecodev618\.github\.io\/"/);
});

test('los datos estructurados son válidos y describen a la persona', () => {
  const raw = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
  const graph = JSON.parse(raw)['@graph'];
  const page = graph.find((node) => node['@type'] === 'ProfilePage');
  assert.equal(page.mainEntity['@type'], 'Person');
  assert.equal(page.mainEntity.name, FULL_NAME);
  assert.ok(page.mainEntity.sameAs.length >= 3);
  assert.equal(graph.find((node) => node['@type'] === 'WebSite').name, FULL_NAME);
});

test('el número de celular no aparece en la página', () => {
  for (const file of textFiles('dist')) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), PHONE, file);
  }
});

test('el CV en PDF no contiene el número de celular', () => {
  // Falla si pdftotext no está instalado: nunca se salta la revisión.
  const text = execFileSync('pdftotext', [CV, '-'], { encoding: 'utf8' });
  assert.match(text, /Rabanal/, 'no se pudo leer el texto del PDF');
  assert.doesNotMatch(text, PHONE);
});

test('cada proyecto del carrusel tiene portada y código', () => {
  const cards = [...html.matchAll(/<article.*?<\/article>/gs)].map((match) => match[0]);
  assert.ok(cards.length >= 6);
  for (const card of cards) {
    assert.match(card, /<img\b/);
    assert.match(card, /github\.com\/CoreCodev618\//);
  }
});

test('no hay enlaces vacíos', () => {
  assert.doesNotMatch(html, /href=["']#?["']/);
});

test('todos los enlaces internos apuntan a una sección que existe', () => {
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.match(html, new RegExp(`id="${id}"`), `falta #${id}`);
  }
});

test('toda imagen tiene texto alternativo', () => {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(tag, /\salt=/, tag);
  }
});

test('no quedan fechas vacías en la experiencia', () => {
  assert.doesNotMatch(html, /<p class="period"[^>]*><\/p>/);
});

test('el degradado del nombre funciona en navegadores antiguos', () => {
  assert.match(css, /-webkit-background-clip:text/);
});

test('la barra de progreso conserva su animación tras comprimir el CSS', () => {
  assert.match(css, /animation-timeline:scroll\(root\)/);
  // Chrome descarta la regla si la línea de tiempo queda dentro de la forma corta "animation:".
  assert.doesNotMatch(css, /animation:[^;}]*scroll\(/);
});

test('las animaciones no esconden contenido sin JavaScript ni con movimiento reducido', () => {
  assert.match(html, /data-reveal/);
  // Lo que parte oculto debe depender de .motion, que solo pone el script si se permite movimiento.
  const hidden = [...css.matchAll(/([^{}]*\[data-reveal\]:not\(\.is-visible\))\{[^}]*opacity:0/g)].map((match) => match[1]);
  assert.ok(hidden.length > 0, 'no se encontró la regla de aparición');
  for (const selector of hidden) assert.match(selector, /\.motion /, selector);
  assert.doesNotMatch(html, /class="[^"]*\bmotion\b/);
});

test('con movimiento reducido las transiciones son inmediatas', () => {
  assert.match(css, /prefers-reduced-motion:reduce\)\{[^{}]*\{transition-duration:\.01ms!important/);
});

test('el brillo del nombre no se anima para siempre', () => {
  assert.match(css, /\bflow\b/);
  assert.doesNotMatch(css, /\bflow\b[^,;}]*infinite|infinite[^,;}]*\bflow\b/);
});

test('las tarjetas detectan el cursor en su <li>, que no se mueve', () => {
  assert.doesNotMatch(css, /\.card[^{},]*:hover/);
  assert.match(html, /<li[^>]*data-pointer[^>]*>\s*<article/);
});

test('.motion se activa antes de pintar y solo si se permite movimiento', () => {
  const head = html.slice(0, html.indexOf('</head>'));
  assert.match(head, /prefers-reduced-motion: no-preference[^<]*classList\.add\('motion'\)/);
});

test('el brillo se enciende desde una sola regla compartida', () => {
  assert.match(css, /\[data-glow\]:hover:after\{opacity:1\}/);
});

test('las apariciones se repiten al subir y al bajar', () => {
  assert.doesNotMatch(html, /unobserve/);
  assert.match(css, /\[data-above\]:not\(\.is-visible\)/);
});

test('la consola de contacto funciona sin JavaScript y aclara quién responde', () => {
  const contact = html.slice(html.indexOf('id="contacto"'));
  const details = [...contact.matchAll(/<details\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(details.length >= 3);
  assert.ok(details.every((tag) => tag.includes('name="preguntas"')));
  assert.equal(details.filter((tag) => /\bopen\b/.test(tag)).length, 1);
  assert.match(contact, /aquí no contesta una IA/);
});

test('el texto dividido en palabras se sigue leyendo completo', () => {
  const plain = (fragment) => fragment.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  const about = html.slice(html.indexOf('id="sobre-mi"'), html.indexOf('id="tecnologias"'));
  assert.match(plain(about), /Aprendo construyendo\. Mis proyectos van desde un panel/);
  const contact = html.slice(html.indexOf('id="contacto"'));
  assert.match(plain(contact), /Sí\. Estoy disponible para proyectos freelance/);
});

test('el logo sigue leyéndose completo', () => {
  const logo = html.match(/<a[^>]*class="logo"[^>]*>(.*?)<\/a>/s)[1].replace(/<[^>]+>/g, '');
  assert.equal(logo, '&lt;Core_Codev&gt;');
});

test('existen robots.txt, mapa del sitio, imagen para compartir y CV', () => {
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/corecodev618\.github\.io\/sitemap-index\.xml/);
  assert.ok(existsSync('dist/sitemap-index.xml'));
  assert.ok(existsSync('dist/og-sebastian-rodrigo-rabanal-francia.jpg'));
  assert.ok(existsSync(CV));
});

test('el mapa del sitio solo lista la página principal', () => {
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]), ['https://corecodev618.github.io/']);
});

test('la dirección antigua redirige a la nueva', () => {
  const redirect = readFileSync('dist/personal-portafolio/index.html', 'utf8');
  assert.match(redirect, /http-equiv="refresh"/);
  assert.match(redirect, /url=\//);
});

const fs = require('node:fs');
const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const base = fs.readFileSync('.webprojekt/templates/csendes-base.html', 'utf8');
const stockPhotos = require('./stock-kepek.json');
const seoBasics = require('./seo-alapok.json');
const responsiveImages = require('./responsive-images.json');
const siteUrl = 'https://elizabeautysalon.netlify.app/';
const canonicalUrl = file => new URL(file === 'index.html' || file === 'koncepcio-1-csendes-szalon.html' ? '' : file.replace(/\.html$/, ''), siteUrl).href;
const md = fs.readFileSync('szovegek.md', 'utf8').replace(/\r/g, '');
let sections = [...base.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m => m[0]);
const blocks = md.split(/^## /m);
const page = name => blocks.find(b => b.startsWith(name + '\n')) || '';
const subsection = (s, name) => s.split(/^### /m).slice(1).find(b => b.startsWith(name + '\n')) || '';
const value = (s, label) => {
  const prefix = `- **${label}:** `;
  return (s.split('\n').find(l => l.startsWith(prefix)) || '').slice(prefix.length);
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const p = s => `<p>${esc(s)}</p>`;
const eyebrow = s => `<div class="eyebrow"><span class="leaf" aria-hidden="true"></span>${esc(s)}</div>`;
const button = (text, href = '#idopont', secondary = false) => `<a class="button${secondary ? ' secondary' : ''}" href="${href}">${text}</a>`;
const wrap = (html, cls = '', id = '') => `<section class="section ${cls}"${id ? ` id="${id}"` : ''}><div class="layout-container">${html}</div></section>`;
const intro = (title, body = '', kicker = '') => `<div class="section-head">${kicker ? eyebrow(kicker) : ''}<h2>${esc(title)}</h2>${body ? p(body) : ''}</div>`;
const photo = (src, alt, cls = '') => `<img class="${cls}" src="images/${src}.webp" alt="${esc(alt)}" width="1400" height="1000" loading="lazy">`;
const hero = (s, image, alt) => `<section class="hero subpage-hero"><div class="layout-container hero-grid"><div class="hero-copy">${eyebrow(value(s, 'Kicker'))}<h1>${esc(value(s, 'Cím (H1)'))}</h1>${p(value(s, 'Szöveg'))}<div class="actions">${button('Időpontot kérek')}${button('Megnézem a kezeléseket', 'kezelesek.html#kezelesek', true)}</div></div><figure class="hero-photo">${photo(image, alt)}</figure></div></section>`;
// A látható törzsszövegek közvetlenül a jóváhagyott szövegforrásból érkeznek.
const homeCopy = page('Főoldal');
const homePart = name => subsection(homeCopy, name);
sections[0] = sections[0].replace(/<p>[\s\S]*?<\/p>/, p(value(homePart('Hero'), 'Szöveg')));
sections[2] = sections[2].replace(/(<h2>[\s\S]*?<\/h2>)[\s\S]*?(<a class="button secondary")/, (_, heading, link) => heading + p(value(homePart('Bemutatkozás'), 'Szöveg')) + link)
  .replace('href="#kapcsolat">Ismerkedjünk meg személyesen', 'href="rolunk.html">Tovább olvasok');
const benefitCopy = homePart('Előnyök');
sections[3] = wrap(intro(value(benefitCopy, 'Cím'), value(benefitCopy, 'Szöveg')) + '<div class="benefits">' + ['Bőrtípushoz igazodok', 'Fájdalommentes kezelések', 'Elégedettségi garancia', 'Exkluzív környezet'].map(title => `<article class="benefit"><span class="leaf" aria-hidden="true"></span><div><h3>${esc(title)}</h3>${p(value(benefitCopy, title))}</div></article>`).join('') + '</div>');
const processCopy = homePart('Folyamat');
sections[4] = wrap(`<h2>${esc(value(processCopy, 'Cím'))}</h2><div class="process-grid">${['Időpont-egyeztetés', 'Diagnosztika és kezelési terv', 'Kozmetikai kezelés', 'Tanácsok otthonra'].map((title, i) => `<article><span class="step-number">0${i+1}</span><h3>${esc(title)}</h3>${p(value(processCopy, `${i+1}. ${title}`))}</article>`).join('')}</div>`, 'process');
sections[5] = sections[5].replace('Vendégeim mondták', esc(value(homePart('Vélemények'), 'Kicker'))).replace('<p>A minőség mércéje: a visszatérő vendégek.</p>', '');
sections[7] = sections[7].replace(/<p>[\s\S]*?<\/p>/, p(value(homePart('Hírlevél-feliratkozás'), 'Szöveg')));
const previewServices = subsection(page('Kezelések'), 'Kezelések');
let previewIndex = 0;
sections[1] = sections[1].replace(/(<article class="service">[\s\S]*?<h3>)[\s\S]*?<\/h3><p>[\s\S]*?<\/p>/g, (_, opening) => {
  const name = ['Belico arckezelések', 'Mesotica luxus kezelések', 'További kezelések'][previewIndex++];
  const body = previewServices.split(`**${name}**\n`)[1].split('\n')[0];
  return opening + esc(name) + '</h3>' + p(body);
});
let styles = [...base.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
styles += fs.readFileSync('.webprojekt/site-additions.css', 'utf8');
styles = fs.readFileSync('assets/fonts.css', 'utf8') + styles;
fs.writeFileSync('assets/site.css', styles);
const fonts = '<link rel="preload" href="assets/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="assets/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin><link rel="icon" href="logo/favicon.svg" type="image/svg+xml"><link rel="icon" href="logo/favicon.png" type="image/png">';
const inlineStyles = styles.replaceAll("url('fonts/", "url('assets/fonts/");

let header = base.match(/<header>[\s\S]*?<\/header>/)[0];
let footer = base.match(/<footer>[\s\S]*?<\/footer>/)[0];
footer = footer.replace(/<span class="leaf" aria-hidden="true"><\/span>/g, '');
const navLinks = s => s.replace(/href="#fooldal"/g, 'href="index.html"').replace(/href="#kezelesek"/g, 'href="kezelesek.html"').replace(/href="#rolunk"/g, 'href="rolunk.html"').replace(/href="#kapcsolat"/g, 'href="kapcsolat.html"');
header = navLinks(header).replace('href="kapcsolat.html">Időpontot kérek', 'href="kapcsolat.html#idopont">Időpontot kérek');
footer = navLinks(footer).replace('<p class="privacy-note">Adatkezelési tájékoztató: az élesítéshez készül.</p>', '<a href="adatkezeles.html">Adatkezelési tájékoztató</a>');
if (!footer.includes('href="adatkezeles.html"')) footer = footer.replace('Adatkezelési tájékoztató: az élesítéshez készül.', '<a href="adatkezeles.html">Adatkezelési tájékoztató</a>');
footer = `<footer class="site-footer"><div class="layout-container"><div class="footer-grid"><div class="footer-brand"><a class="wordmark" href="index.html">ELIZA<small>BEAUTY SALON</small></a><p>${esc(value(subsection(page('Közös elemek (minden oldalon)'), 'Lábléc'), 'Bemutatkozás'))}</p></div><div><div class="footer-title">Elérhetőség</div><ul class="footer-contact"><li><span aria-hidden="true">⌖</span><span>1092 Budapest, Ráday utca 1.</span></li><li><span aria-hidden="true">✉</span><a href="mailto:hello.elizabeauty@gmail.com">hello.elizabeauty@gmail.com</a></li><li><span aria-hidden="true">☎</span><a href="tel:+36203449272">+36 20 344 9272</a></li></ul><div class="footer-title footer-hours-title">Nyitvatartás</div><p class="footer-hours">H–P: 9:00–16:00<br>Szo–V: ZÁRVA</p></div><div><div class="footer-title">Oldalak</div><nav class="footer-links" aria-label="Lábléc navigáció"><a href="index.html">Főoldal</a><a href="kezelesek.html">Kezelések</a><a href="rolunk.html">Rólunk</a><a href="kapcsolat.html">Kapcsolat</a></nav></div><div><div class="footer-title">Kövess minket</div><div class="social-placeholders" aria-label="Közösségi oldalak: a linkek még előkészítés alatt"><span aria-label="Facebook">f</span><span aria-label="Instagram">◎</span><span aria-label="YouTube">▶</span></div><p class="social-note">Közösségi linkjeink hamarosan elérhetők.</p></div></div><div class="footer-bottom"><span>© Eliza Beauty Salon – Minden jog fenntartva!</span><a href="adatkezeles.html">Adatkezelési tájékoztató</a></div></div></footer>`;
const footerIcon = paths => `<svg class="footer-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
footer = footer.replace('⌖', footerIcon('<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>'))
  .replace('✉', footerIcon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'))
  .replace('☎', footerIcon('<path d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"/>'))
  .replace('<span aria-label="Facebook">f</span>', `<span role="img" aria-label="Facebook">${footerIcon('<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>')}</span>`)
  .replace('<span aria-label="Instagram">◎</span>', `<span role="img" aria-label="Instagram">${footerIcon('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>')}</span>`)
  .replace('<span aria-label="YouTube">▶</span>', `<span role="img" aria-label="YouTube">${footerIcon('<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3Z"/>')}</span>`)
  .replace('<p class="social-note">Közösségi linkjeink hamarosan elérhetők.</p>', '');
const brandLogo = '<img class="brand-logo" src="logo/logo.svg" alt="Eliza Beauty Salon" width="376" height="206" loading="eager" fetchpriority="high">';
header = header.replace('ELIZA<small>BEAUTY SALON</small>', brandLogo);
footer = footer.replace('ELIZA<small>BEAUTY SALON</small>', brandLogo.replace('loading="eager" fetchpriority="high"', 'loading="lazy"'));
const contact = sections[8].replace('id="kapcsolat"', 'id="idopont"');
const faq = sections[6];
const processSection = sections[4];
const testimonials = sections[5].split('<div class="guarantee">')[0] + '</div></section>';
const render = (filename, title, description, content) => {
  let photoIndex = 0;
  content = content.replace(/<img\b[^>]*>/g, tag => {
    const key = tag.match(/src="images\/([^"/]+)\.webp"/)?.[1];
    const item = stockPhotos[key];
    if (!item) return tag;
    const variants = responsiveImages[key] || [];
    const sizes = key.includes('vendeg') ? '64px' : key.startsWith('szalon-') ? '(max-width: 1000px) calc((100vw - 64px) / 2), 404px' : ['arcapolas','kezeles','arcmasszazs'].includes(key) ? '(max-width: 650px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 112px) / 3), 399px' : '(max-width: 900px) calc(100vw - 40px), (max-width: 1340px) calc((100vw - 144px) / 2), 598px';
    const srcset = variants.map(v => `${encodeURI(v.file)} ${v.width}w`).concat(`${encodeURI(item.file)} ${item.width}w`).join(', ');
    if (photoIndex++ === 0) tag = tag.replace(/ loading="[^"]*"| fetchpriority="[^"]*"/g, '') .replace('<img', '<img loading="eager" fetchpriority="high"');
    return tag.replace(/src="[^"]*"/, `src="${encodeURI(item.file)}" srcset="${srcset}" sizes="${sizes}"`)
      .replace(/alt="[^"]*"/, `alt="${tag.includes('class="guest-photo"') ? '' : esc(seoBasics.imageAlts[key] || item.alt)}"`)
      .replace(/width="\d+"/, `width="${item.width}"`).replace(/height="\d+"/, `height="${item.height}"`);
  });
  const topics = ['Időpontkérés', 'Belico arckezelések', 'Mesotica luxus kezelések', 'További egyedi kezelések', 'Anti-Age csomag', 'Anti-Age Plus csomag', 'Tini Anti-Akné csomag'];
  content = content.replace(/<article class="(?:service|treatment-detail|package)"[\s\S]*?<\/article>/g, article => {
    const title = article.match(/<h3>(.*?)<\/h3>/)?.[1];
    const topic = title === 'További kezelések' ? 'További egyedi kezelések' : title;
    if (!topics.includes(topic)) return article;
    return article.replace(/<a class="button([^"]*)" href="[^"]*"/g, `<a class="button$1" href="#idopont" data-contact-topic="${esc(topic)}"`);
  });
  content = content.replace('<div class="form-field"><label for="contact-message">', `<div class="form-field"><label for="contact-topic">Mivel kapcsolatban érdeklődsz?</label><select id="contact-topic" name="topic" required>${topics.map(topic => `<option value="${esc(topic)}">${esc(topic)}</option>`).join('')}</select></div><div class="form-field"><label for="contact-message">`);
  let formIndex = 0;
  content = content.replace(/<form\b[\s\S]*?<\/form>/g, form => {
    const id = `privacy-consent-${++formIndex}`;
    if (form.includes('id="contact-form"')) {
      form = form.replace('<form id="contact-form">', `<form id="contact-form" name="idopontkeres" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field"><input type="hidden" name="form-name" value="idopontkeres"><input type="hidden" name="page" value="${filename}"><p hidden><label>Hagyd üresen: <input name="bot-field" autocomplete="off" tabindex="-1"></label></p>`)
        .replace('<p class="note">Látványterv: az űrlap jelenleg nem küld üzenetet.</p>', '');
    }
    const unavailable = /<button[^>]*\bdisabled/.test(form);
    const consent = `<div class="privacy-consent"><label class="checkbox" for="${id}"><input type="checkbox" id="${id}" name="privacy_consent" value="accepted" required aria-describedby="${id}-error"${unavailable ? ' disabled' : ''}><span>Elolvastam és elfogadom az <a href="adatkezeles.html">adatvédelmi irányelveket</a>.</span></label><p class="consent-error" id="${id}-error" hidden>Az üzenet elküldéséhez kérjük, jelöld be, hogy elolvastad és elfogadod az adatvédelmi irányelveket.</p></div>`;
    form = form.replace(/<label class="checkbox">[\s\S]*?<\/label>/g, '');
    return form.replace(/<button\b/, consent + '<button');
  });
  if (content.includes('id="contact-form"')) content += '<dialog class="contact-success" id="contact-success" aria-labelledby="contact-success-title" aria-describedby="contact-success-description"><div class="contact-success-inner"><h2 id="contact-success-title">Köszönöm a megkeresésed!</h2><p id="contact-success-description">Üzeneted megérkezett. Hamarosan felveszem veled a kapcsolatot a megadott e-mail-címen. Az időpontot külön egyeztetjük.</p><button class="button" type="button" autofocus>Rendben</button></div></dialog>';
  const current = filename === 'koncepcio-1-csendes-szalon.html' ? 'index.html' : filename;
  if (seoBasics.pages[current]) {
    title = seoBasics.pages[current].title;
    description = seoBasics.pages[current].description;
  }
  const activeHeader = header.replace(new RegExp(`href="${current.replace('.', '\\.')}"`, 'g'), `href="${current}" aria-current="page"`);
  fs.writeFileSync(filename, `<!doctype html>\n<html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>${esc(title)} | Eliza Beauty Salon</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonicalUrl(filename)}">${fonts}<style>${inlineStyles}</style><script src="assets/site.js" defer></script></head><body data-typography="eliza"><a class="skip-link" href="#tartalom">Ugrás a tartalomhoz</a>${activeHeader}<main id="tartalom">${content}</main>${footer}</body></html>\n`);
};
let home = sections.map((section, index) => index === 5 ? testimonials : section).join('\n').replace('id="kapcsolat"', 'id="idopont"');
home = home.replace(/href="#kapcsolat"/g, 'href="#idopont"').replace('href="#kezelesek">Megnézem a kezeléseket', 'href="kezelesek.html">Megnézem a kezeléseket').replace('href="#idopont">Ismerkedjünk meg személyesen', 'href="rolunk.html">Ismerkedjünk meg személyesen');
home = home.replace(/href="#idopont">Érdekel a kezelés/g, 'href="kezelesek.html#kezelesek">Érdekel a kezelés');
const homeAppeal = homePart('Felhívás');
const homeAppealHtml = wrap(`<div class="callout"><h2>${esc(value(homeAppeal,'Cím'))}</h2>${p(value(homeAppeal,'Szöveg'))}${button('Időpontot kérek')}</div>`);
home = home.replace('<section class="section faq">', homeAppealHtml + '<section class="section faq">');

render('index.html', 'Személyre szabott kozmetikai kezelések Budapesten', 'Személyre szabott bőrápolás, bőrfiatalító és anti-akné kezelések Sipos Elizával Budapesten. Ismerd meg a kezeléseket, és kérj időpontot.', home);
render('koncepcio-1-csendes-szalon.html', 'Személyre szabott kozmetikai kezelések Budapesten', 'Az Eliza Beauty Salon Csendes szalon irányból továbbépített főoldala.', home);

// Kezelések: minden szolgáltatás egy gyűjtőoldalon.
const treatments = page('Kezelések');
const problem = subsection(treatments, 'Probléma');
const problemItems = problem.split('\n').filter(l => l.startsWith('- **') && !l.startsWith('- **Cím') && !l.startsWith('- **Szöveg')).map(l => {
  const m = l.match(/^- \*\*(.*?):\*\* (.*)$/); return `<article><h3>${esc(m[1])}</h3>${p(m[2])}</article>`;
}).join('');
const treatmentBody = subsection(treatments, 'Kezelések');
const serviceNames = ['Belico arckezelések', 'Mesotica luxus kezelések', 'További kezelések'];
const serviceImages = ['kezelesek-belico', 'kezelesek-mesotica', 'kezelesek-tovabbi'];
const serviceHtml = serviceNames.map((name, i) => {
  const txt = treatmentBody.split(`**${name}**\n`)[1].split(/\n\*\*/)[0].trim();
  const lines = txt.split('\n');
  return `<article class="treatment-detail" id="${['belico','mesotica','tovabbi'][i]}"><figure>${photo(serviceImages[i], `${name}, illusztratív kozmetikai kezelés`)}</figure><div><h3>${name}</h3>${p(lines.filter(l => !l.startsWith('- ') && l).join(' '))}<ul class="plain-list">${lines.filter(l => l.startsWith('- ')).map(l => `<li>${esc(l.slice(2))}</li>`).join('')}</ul>${button('Erről szeretnék egyeztetni', '#idopont', true)}</div></article>`;
}).join('');
const results = subsection(treatments, 'Eredmények');
const conciseResults = value(results, 'Lista').split(' · ');
const guarantee = subsection(treatments, 'Garancia');
const packages = subsection(treatments, 'Csomagok');
const table = packages.split('\n').filter(l => l.startsWith('|')).map(l => l.split('|').slice(1,-1).map(c => c.trim()));
const packageCards = [1,2,3].map(i => `<article class="package"><h3>${esc(table[0][i])}</h3><p class="price">${esc(table[2][i])}</p>${p(table[3][i])}<ul class="plain-list">${table[4][i].split(' · ').map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${button('Ezt választom', `#idopont`, i !== 2)}</article>`).join('');
render('kezelesek.html', 'Kezelések és kozmetikai csomagok', 'Belico, Mesotica, mezoterápia és anti-akné kezelések. Ismerd meg az Eliza Beauty Salon szolgáltatásait és kezelési csomagjait.',
  hero(subsection(treatments, 'Hero'), 'kezelesek-hero', 'Kíméletes professzionális arckezelés, stock illusztráció') +
  wrap(intro(value(problem, 'Cím'), value(problem, 'Szöveg')) + `<div class="feature-grid">${problemItems}</div>`, 'surface') +
  wrap(intro('Személyre szabott kezelések', 'A kezelés kiválasztásánál mindig a bőröd aktuális állapotából indulunk ki.') + serviceHtml, '', 'kezelesek') +
  wrap(intro(value(results, 'Cím'), '', value(results, 'Kicker')) + `<ul class="result-list">${conciseResults.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`, 'surface') +
  wrap(`<div class="callout"><h2>${esc(value(guarantee,'Cím'))}</h2>${p(value(guarantee,'Szöveg'))}</div>`, 'olive') +
  wrap(intro(value(packages,'Cím'),value(packages,'Szöveg'),value(packages,'Kicker')) + `<div class="packages">${packageCards}</div>`) +
  processSection + testimonials.replace('images/vendeg-fruzsi.webp','images/kezelesek-vendeg-fruzsi.webp').replace('images/vendeg-magdi.webp','images/kezelesek-vendeg-magdi.webp') + contact);

// Rólunk: szakmai történet, értékek és szalonhangulat.
const about = page('Rólunk');
const story = subsection(about, 'Történet');
const values = subsection(about, 'Értékek');
const valuesList = values.split('\n').filter(l=>/^  \d\./.test(l)).map(l=>l.replace(/^  \d\. /,''));
const valueNames = ['Minőség','Hitelesség','Természetesség','Fejlődés','Énidő'];
const salon = subsection(about,'A szalon');
const appeal = subsection(about,'Felhívás');
const aboutHero = subsection(about, 'Hero');
const salonGallery = wrap(`<div class="gallery-heading" id="szalongaleria"><div>${eyebrow(value(salon, 'Kicker'))}<h2>${esc(value(salon, 'Cím'))}</h2>${p(value(salon, 'Szöveg'))}</div>${button('Időpontot kérek','#idopont')}</div><div class="salon-photo-grid">${['Szalonbelső','Recepció','Szalonrészlet','Kozmetikai termékek','Kezelőhelyiség','Szalon berendezése'].map((alt,i)=>photo('szalon-'+(i+1),alt)).join('')}</div>`);
const personalStory = wrap(`<div class="personal-story"><figure>${photo('eliza-tortenet','Bemutatkozó portré, stockfotó')}</figure><div>${eyebrow(value(story,'Kicker'))}<h2>${esc(value(story,'Cím'))}</h2>${value(story,'Szöveg').replace(' 2018-ban', '\n\n2018-ban').replace(' Hiszem,', '\n\nHiszem,').split('\n\n').map(p).join('')}<ul class="plain-list">${value(story, 'Kiemelések').split(' · ').map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div></div>`, 'surface personal-story-section');
render('rolunk.html', 'Sipos Eliza és a szalon története', 'Ismerd meg Sipos Eliza mesterkozmetikust, szakmai történetét és a személyre szabott bőrápolás mögött álló értékeket.',
  wrap(`<div class="about-intro"><div>${eyebrow(value(aboutHero,'Kicker'))}<h1>${esc(value(aboutHero,'Cím (H1)'))}</h1>${p(value(aboutHero,'Szöveg'))}<div class="actions">${button('Időpontot foglalok','#idopont')}${button('Ismerd meg a szalont','#szalongaleria',true)}</div></div><figure>${photo('rolunk-hero','Kozmetikai kezelés, stock illusztráció')}</figure></div>`, 'about-opening') + personalStory +
  wrap(`<div class="about-expertise"><div class="expertise-heading"><h2>${esc(value(values,'Cím'))}</h2>${p(value(values,'Szöveg'))}</div><div class="expertise-grid">${valuesList.map((text,i)=>`<article><h3>${esc(valueNames[i])}</h3>${p(text)}</article>`).join('')}</div></div><div class="about-numbers" id="statisztikak" aria-label="Bizalmatok a legnagyobb elismerés">${[['14+','Év szakmai tapasztalat'],['1300+','Vendég'],['350+','Féle kozmetikum']].map(([number,label])=>`<div><span class="trust-number">${number}</span><p>${label}</p></div>`).join('')}</div>`, 'surface about-credentials') +
  salonGallery.replace('class="section ', 'class="section about-gallery ') +
  wrap(`<div class="callout"><h2>${esc(value(appeal,'Cím'))}</h2>${p(value(appeal,'Szöveg'))}${button('Időpontot kérek')}</div>`) + contact +
  `<dialog class="gallery-dialog" aria-label="Szalonfotó nagyítása"><div class="gallery-view"><button class="gallery-close" type="button" aria-label="Nagyítás bezárása">×</button><img class="gallery-large" alt=""><div class="gallery-controls"><button type="button" class="gallery-prev" aria-label="Előző kép">←</button><p class="gallery-caption" aria-live="polite"></p><button type="button" class="gallery-next" aria-label="Következő kép">→</button></div></div></dialog>`);

// Kapcsolat: egyetlen kapcsolati űrlap, mellette az elérhetőségek.
const contactSource = subsection(page('Kapcsolat'),'Hero és űrlap');
const contactPanel = contact;
render('kapcsolat.html', 'Kapcsolat és időpontkérés', 'Vedd fel a kapcsolatot az Eliza Beauty Salonnal. Elérhetőségek, nyitvatartás és időpontkérő űrlap egy helyen.',
  wrap(`<div class="contact-hero"><div>${eyebrow('Szeretettel várlak')}<h1>${esc(value(contactSource,'Cím (H1)'))}</h1>${p(value(contactSource,'Szöveg'))}</div><figure>${photo('kapcsolat-hero','Szalon recepció, stock illusztráció')}</figure></div>`) +
  contactPanel + wrap(`<div class="location-layout"><div><h2>Így találsz meg</h2><p>1092 Budapest, Ráday u. 1.</p><p>Hétfőtől péntekig 9:00 és 16:00 között, kizárólag előre egyeztetett időpontban fogadlak. Szombaton és vasárnap zárva.</p>${button('Megnyitom a térképet','https://www.google.com/maps/search/?api=1&query=1092+Budapest+R%C3%A1day+utca+1',true)}</div><div class="location-map"><iframe title="Google-térkép: 1092 Budapest, Ráday utca 1." src="https://maps.google.com/maps?q=1092%20Budapest%2C%20R%C3%A1day%20utca%201&amp;z=16&amp;output=embed" width="600" height="400" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div>`) + faq);
render('adatkezeles.html', 'Adatkezelési tájékoztató', 'Az Eliza Beauty Salon weboldalának adatkezelési tájékoztatója: kapcsolatfelvétel, időpontkérés és az érintettek jogai.', wrap(`<article class="privacy-policy">${require('./render-privacy.cjs')()}</article>`));
console.log('Elkészült: index.html, kezelesek.html, rolunk.html, kapcsolat.html, adatkezeles.html és a főoldali hivatkozás.');

const sitemapPages = ['index.html','kezelesek.html','rolunk.html','kapcsolat.html','adatkezeles.html'];
fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemapPages.map(file => '  <url><loc>' + canonicalUrl(file) + '</loc></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + siteUrl + 'sitemap.xml\n');

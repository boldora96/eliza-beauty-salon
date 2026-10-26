const fs = require('node:fs');
const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const base = fs.readFileSync('.webprojekt/templates/csendes-base.html', 'utf8');
const md = fs.readFileSync('szovegek.md', 'utf8').replace(/\r/g, '');
const sections = [...base.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m => m[0]);
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
let styles = [...base.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
styles += fs.readFileSync('.webprojekt/site-additions.css', 'utf8');
fs.writeFileSync('assets/site.css', styles);
const fonts = base.match(/<link href="https:\/\/fonts.googleapis.com[^>]+>/)[0];
let header = base.match(/<header>[\s\S]*?<\/header>/)[0];
let footer = base.match(/<footer>[\s\S]*?<\/footer>/)[0];
footer = footer.replace(/<span class="leaf" aria-hidden="true"><\/span>/g, '');
const navLinks = s => s.replace(/href="#fooldal"/g, 'href="index.html"').replace(/href="#kezelesek"/g, 'href="kezelesek.html"').replace(/href="#rolunk"/g, 'href="rolunk.html"').replace(/href="#kapcsolat"/g, 'href="kapcsolat.html"');
header = navLinks(header).replace('href="kapcsolat.html">Időpontot kérek', 'href="kapcsolat.html#idopont">Időpontot kérek');
footer = navLinks(footer).replace('<p class="privacy-note">Adatkezelési tájékoztató: az élesítéshez készül.</p>', '<a href="adatkezeles.html">Adatkezelési tájékoztató</a>');
if (!footer.includes('href="adatkezeles.html"')) footer = footer.replace('Adatkezelési tájékoztató: az élesítéshez készül.', '<a href="adatkezeles.html">Adatkezelési tájékoztató</a>');
footer = `<footer class="site-footer"><div class="layout-container"><div class="footer-grid"><div class="footer-brand"><a class="wordmark" href="index.html">ELIZA<small>BEAUTY SALON</small></a><p>Az Eliza Beauty Salonban a szépség és a tudatos bőrápolás találkozik. Modern bőrfiatalító és személyre szabott kozmetikai kezeléseinkkel segítünk, hogy újra magabiztosan ragyoghass.</p></div><div><div class="footer-title">Elérhetőség</div><ul class="footer-contact"><li><span aria-hidden="true">⌖</span><span>1092 Budapest, Ráday utca 1.</span></li><li><span aria-hidden="true">✉</span><a href="mailto:hello.elizabeauty@gmail.com">hello.elizabeauty@gmail.com</a></li><li><span aria-hidden="true">☎</span><a href="tel:+36203449272">+36 20 344 9272</a></li></ul><div class="footer-title footer-hours-title">Nyitvatartás</div><p class="footer-hours">H–P: 9:00–16:00<br>Szo–V: ZÁRVA</p></div><div><div class="footer-title">Oldalak</div><nav class="footer-links" aria-label="Lábléc navigáció"><a href="index.html">Főoldal</a><a href="kezelesek.html">Kezelések</a><a href="rolunk.html">Rólunk</a><a href="kapcsolat.html">Kapcsolat</a></nav></div><div><div class="footer-title">Kövess minket</div><div class="social-placeholders" aria-label="Közösségi oldalak: a linkek még előkészítés alatt"><span aria-label="Facebook">f</span><span aria-label="Instagram">◎</span><span aria-label="YouTube">▶</span></div><p class="social-note">Közösségi linkjeink hamarosan elérhetők.</p></div></div><div class="footer-bottom"><span>© Eliza Beauty Salon – Minden jog fenntartva!</span><a href="adatkezeles.html">Adatkezelési tájékoztató</a></div></div></footer>`;
const contact = sections[8].replace('id="kapcsolat"', 'id="idopont"');
const faq = sections[6];
const processSection = sections[4];
const testimonials = sections[5].split('<div class="guarantee">')[0] + '</div></section>';
const render = (filename, title, description, content) => {
  let formIndex = 0;
  content = content.replace(/<form\b[\s\S]*?<\/form>/g, form => {
    const id = `privacy-consent-${++formIndex}`;
    const unavailable = /<button[^>]*\bdisabled/.test(form);
    const consent = `<div class="privacy-consent"><label class="checkbox" for="${id}"><input type="checkbox" id="${id}" name="privacy_consent" value="accepted" required aria-describedby="${id}-error"${unavailable ? ' disabled' : ''}><span>Elolvastam és elfogadom az <a href="adatkezeles.html">adatvédelmi irányelveket</a>.</span></label><p class="consent-error" id="${id}-error" hidden>Az üzenet elküldéséhez kérjük, jelöld be, hogy elolvastad és elfogadod az adatvédelmi irányelveket.</p></div>`;
    form = form.replace(/<label class="checkbox">[\s\S]*?<\/label>/g, '');
    return form.replace(/<button\b/, consent + '<button');
  });
  const current = filename === 'koncepcio-1-csendes-szalon.html' ? 'index.html' : filename;
  const activeHeader = header.replace(new RegExp(`href="${current.replace('.', '\\.')}"`, 'g'), `href="${current}" aria-current="page"`);
  fs.writeFileSync(filename, `<!doctype html>\n<html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} | Eliza Beauty Salon</title><meta name="description" content="${esc(description)}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${fonts}<link rel="stylesheet" href="assets/site.css"><script src="assets/site.js" defer></script></head><body data-typography="eliza"><a class="skip-link" href="#tartalom">Ugrás a tartalomhoz</a>${activeHeader}<main id="tartalom">${content}</main>${footer}</body></html>\n`);
};
let home = sections.map((section, index) => index === 5 ? testimonials : section).join('\n').replace('id="kapcsolat"', 'id="idopont"');
home = home.replace(/href="#kapcsolat"/g, 'href="#idopont"').replace('href="#kezelesek">Megnézem a kezeléseket', 'href="kezelesek.html">Megnézem a kezeléseket').replace('href="#idopont">Ismerkedjünk meg személyesen', 'href="rolunk.html">Ismerkedjünk meg személyesen');
home = home.replace(/href="#idopont">Érdekel a kezelés/g, 'href="kezelesek.html#kezelesek">Érdekel a kezelés');
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
const serviceImages = ['arcapolas', 'kezeles', 'arcmasszazs'];
const serviceHtml = serviceNames.map((name, i) => {
  const txt = treatmentBody.split(`**${name}**\n`)[1].split(/\n\*\*/)[0].trim();
  const lines = txt.split('\n');
  return `<article class="treatment-detail" id="${['belico','mesotica','tovabbi'][i]}"><figure>${photo(serviceImages[i], `${name}, illusztratív kozmetikai kezelés`)}</figure><div><h3>${name}</h3>${p(lines.filter(l => !l.startsWith('- ') && l).join(' '))}<ul class="plain-list">${lines.filter(l => l.startsWith('- ')).map(l => `<li>${esc(l.slice(2))}</li>`).join('')}</ul>${button('Erről szeretnék egyeztetni', '#idopont', true)}</div></article>`;
}).join('');
const results = subsection(treatments, 'Eredmények');
const conciseResults = ['Fiatalosabb, rugalmasabb és hidratáltabb bőr', 'Egészségesebb, ellenállóbb bőr', 'Egyenletesebb bőrkép és ragyogás', 'Természetes hatás, drasztikus beavatkozás nélkül', 'Gyorsabb regeneráció és hosszú távú eredmények', 'Magabiztosság, amit a bőröd állapota is tükröz'];
const guarantee = subsection(treatments, 'Garancia');
const packages = subsection(treatments, 'Csomagok');
const table = packages.split('\n').filter(l => l.startsWith('|')).map(l => l.split('|').slice(1,-1).map(c => c.trim()));
const packageCards = [1,2,3].map(i => `<article class="package"><h3>${esc(table[0][i])}</h3><p class="price">${esc(table[2][i])}</p>${p(table[3][i])}<ul class="plain-list">${table[4][i].split(' · ').map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${button('Ezt választom', `#idopont`, i !== 2)}</article>`).join('');
render('kezelesek.html', 'Kezelések és kozmetikai csomagok', 'Belico, Mesotica, mezoterápia és anti-akné kezelések. Ismerd meg az Eliza Beauty Salon szolgáltatásait és kezelési csomagjait.',
  hero(subsection(treatments, 'Hero'), 'kezeles', 'Kíméletes professzionális arckezelés, stock illusztráció') +
  wrap(intro(value(problem, 'Cím'), value(problem, 'Szöveg')) + `<div class="feature-grid">${problemItems}</div>`, 'surface') +
  wrap(intro('Személyre szabott kezelések', 'A kezelés kiválasztásánál mindig a bőröd aktuális állapotából indulunk ki.') + serviceHtml, '', 'kezelesek') +
  wrap(intro(value(results, 'Cím'), '', value(results, 'Kicker')) + `<ul class="result-list">${conciseResults.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`, 'surface') +
  wrap(`<div class="callout"><h2>${esc(value(guarantee,'Cím'))}</h2>${p(value(guarantee,'Szöveg'))}</div>`, 'olive') +
  wrap(intro(value(packages,'Cím'),value(packages,'Szöveg'),value(packages,'Kicker')) + `<div class="packages">${packageCards}</div>`) +
  processSection + testimonials + contact);

// Rólunk: szakmai történet, értékek és szalonhangulat.
const about = page('Rólunk');
const story = subsection(about, 'Történet');
const values = subsection(about, 'Értékek');
const valuesList = values.split('\n').filter(l=>/^  \d\./.test(l)).map(l=>l.replace(/^  \d\. /,''));
const valueNames = ['Minőség','Hitelesség','Természetesség','Fejlődés','Énidő'];
const salon = subsection(about,'A szalon');
const appeal = subsection(about,'Felhívás');
const storyText = value(story,'Szöveg').replace('Szia, Eliza vagyok, a leendő kozmetikusod! ', '').replace(' 2018-ban', '\n\n2018-ban').replace(' Hiszem,', '\n\nHiszem,');
const milestone = `<ol class="milestones"><li><span class="year">2011</span><h3>Saját szalon</h3><p>Az Eliza Beauty Salon megnyitása.</p></li><li><span class="year">2018</span><h3>Tréner és oktató</h3><p>A Beauty Academy szakmai trénere és oktatója.</p></li><li><span class="year">2019</span><h3>Mesterkozmetikus</h3><p>Mesterkozmetikusi cím megszerzése.</p></li></ol>`;
const expertise = [
  ['Az Eliza Beauty Salon alapítása – 2011','Kozmetikus végzettségem megszerzése után megnyitottam az Eliza Beauty Salont, ahol azóta is vendégeim bőrének ápolásával foglalkozom.'],
  ['Beauty Academy képesítés – 2018','Szakmai tréneri és oktatói képesítést szereztem, tovább bővítve kozmetikai ismereteimet és szakmai felkészültségemet.'],
  ['Kozmetikusmester képesítés – 2019','Sikeres mestervizsgát tettem, amellyel tovább mélyítettem szakmai tudásomat és gyakorlati tapasztalataimat.'],
  ['Folyamatos szakmai fejlődés','Rendszeresen fejlesztem tudásomat, és új bőrfiatalító technológiákat, hatóanyagokat és kezelési módszereket ismerek meg.']
];
const credentials = wrap(`<h2 id="szakmai-hatter">A tudás, ami a kezeléseim mögött áll</h2><div class="expertise-layout"><div class="expertise-grid">${expertise.map(([title,text])=>`<article><h3>${esc(title)}</h3>${p(text)}</article>`).join('')}</div><figure>${photo('szakmai-kep','Kozmetikai termékek és szakmai oklevelek a Figma-terv fotóján')}</figure></div>`);
const trustCards = wrap(intro('Bizalmatok a legnagyobb elismerés','Több mint egy évtizede segítek vendégeimnek megtalálni a bőrük számára legmegfelelőbb ápolást. Számomra az elégedett mosoly a legnagyobb elismerés.') + `<div class="trust-cards">${[['14+','Év szakmai tapasztalat'],['1300+','Vendég'],['350+','Féle kozmetikum']].map(([number,label])=>`<div class="trust-card"><span class="trust-number">${number}</span><p>${label}</p></div>`).join('')}</div>`, 'surface trust-section');
const salonGallery = wrap(`<div class="gallery-heading" id="szalongaleria"><div>${eyebrow('Pillanatok a szalonból')}<h2>Ismerd meg az Eliza Beauty Salon világát!</h2><p>Tekints be a szalon hangulatába, és fedezd fel azt a környezetet, ahol minden kezelés Rólad és a bőröd igényeiről szól.</p></div>${button('Időpontot kérek','#idopont')}</div><div class="salon-photo-grid">${['Világos szalonbelső kozmetikai termékpolcokkal','Napfényes recepció és várótér','Kávésarok növényekkel és boltíves tükörrel','Kozmetikai termékek a szalon polcain','Kezelőágy olívazöld textíliákkal','Kezelőkocsi és tiszta törölközők'].map((alt,i)=>photo('szalon-'+(i+1),alt)).join('')}</div>`);
const personalStory = wrap(`<div class="personal-story"><figure>${photo('eliza-tortenet','A Figma-terv ideiglenes bemutatkozó portréja')}</figure><div><div class="eyebrow story-eyebrow">Az én történetem</div><h2>Egy szenvedélyből született</h2><p>Gyerekkorom óta szenvedélyesen érdekel a szépségápolás világa. Mindig is az motivált, hogy szakértelmemmel segíthessek másoknak egészségesebb, szebb bőrt és nagyobb önbizalmat elérni.</p><p>2011-ben megnyitottam az Eliza Beauty Salont, ahol azóta is elkötelezetten dolgozom vendégeim bőrének megújulásáért. Folyamatosan fejlesztem szakmai tudásomat, és a korszerű bőrfiatalító technológiákat gondosan megválasztott kozmetikai kezelésekkel ötvözöm.</p><p>Hiszem, hogy a látványos eredmények alapja az alapos bőrdiagnosztika és a személyre szabott ápolás. Célom, hogy minden vendégem számára olyan kezelést nyújtsak, amely valóban a bőre igényeire épül, és segít elérni a látható, pozitív változást.</p></div></div>`, 'surface personal-story-section');
render('rolunk.html', 'Sipos Eliza és a szalon története', 'Ismerd meg Sipos Eliza mesterkozmetikust, szakmai történetét és a személyre szabott bőrápolás mögött álló értékeket.',
  wrap(`<div class="about-intro"><div>${eyebrow('Sipos Eliza · mesterkozmetikus')}<h1>A bőröd egészsége az én küldetésem</h1><p>Szia, Eliza vagyok, a leendő kozmetikusod!</p>${p('A szépség mindig is az életem része volt, így nem volt kérdés, hogy a kozmetika lesz a hivatásom. Az Eliza Beauty Salonban azon dolgozom, hogy vendégeim bőre ne csak szebb, hanem egészségesebb is legyen.')}${p(storyText.split('\n\n')[2])}<div class="actions">${button('Ismerd meg a szalont','#szalongaleria',true)}</div></div><figure>${photo('torodes','Bőrápolási hangulatkép, ideiglenes illusztráció')}<figcaption>A végleges portrét később választjuk ki.</figcaption></figure></div>`, 'about-opening') + personalStory +
  wrap(`<div class="about-expertise"><div class="expertise-heading"><h2>A tudás, ami a kezeléseim mögött áll</h2><p>A személyes figyelem mögött biztos szakmai alapok és folyamatos tanulás áll.</p></div><div class="expertise-grid">${expertise.map(([title,text])=>`<article><h3>${esc(title)}</h3>${p(text)}</article>`).join('')}</div></div><div class="about-numbers" id="statisztikak" aria-label="Bizalmatok a legnagyobb elismerés">${[['14+','Év szakmai tapasztalat'],['1300+','Vendég'],['350+','Féle kozmetikum']].map(([number,label])=>`<div><span class="trust-number">${number}</span><p>${label}</p></div>`).join('')}</div>`, 'surface about-credentials') +
  salonGallery.replace('class="section ', 'class="section about-gallery ') + contact +
  `<dialog class="gallery-dialog" aria-label="Szalonfotó nagyítása"><div class="gallery-view"><button class="gallery-close" type="button" aria-label="Nagyítás bezárása">×</button><img class="gallery-large" alt=""><div class="gallery-controls"><button type="button" class="gallery-prev" aria-label="Előző kép">←</button><p class="gallery-caption" aria-live="polite"></p><button type="button" class="gallery-next" aria-label="Következő kép">→</button></div></div></dialog>`);

// Kapcsolat: egyetlen kapcsolati űrlap, mellette az elérhetőségek.
const contactSource = subsection(page('Kapcsolat'),'Hero és űrlap');
let contactPanel = contact.replace('<h2>Foglalj időpontot,<br>és induljon a változás!</h2>', '<h2>Egyeztessünk időpontot!</h2>');
render('kapcsolat.html', 'Kapcsolat és időpontkérés', 'Vedd fel a kapcsolatot az Eliza Beauty Salonnal. Elérhetőségek, nyitvatartás és időpontkérő űrlap egy helyen.',
  wrap(`<div class="contact-hero"><div>${eyebrow('Szeretettel várlak')}<h1>${esc(value(contactSource,'Cím (H1)'))}</h1>${p('Kérdésed van a kezelésekről, vagy időpontot szeretnél egyeztetni? Írj az alábbi űrlapon, vagy keress közvetlenül. Segítek megtalálni a bőrödnek megfelelő törődést.')}</div><figure>${photo('kezeles','Személyes figyelem kozmetikai kezelés közben, illusztráció')}</figure></div>`) +
  contactPanel + wrap(`<div class="location-layout"><div><h2>Így találsz meg</h2><p>1092 Budapest, Ráday u. 1.</p><p>Hétfőtől péntekig 9:00 és 16:00 között, kizárólag előre egyeztetett időpontban fogadlak. Szombaton és vasárnap zárva.</p>${button('Megnyitom a térképet','https://www.google.com/maps/search/?api=1&query=1092+Budapest+R%C3%A1day+utca+1',true)}</div><div class="location-map"><iframe title="Google-térkép: 1092 Budapest, Ráday utca 1." src="https://maps.google.com/maps?q=1092%20Budapest%2C%20R%C3%A1day%20utca%201&amp;z=16&amp;output=embed" width="600" height="400" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div>`) + faq);
render('adatkezeles.html','Adatkezelési tájékoztató előkészítés alatt','Az adatkezelési tájékoztató elkészítésének állapota.',wrap(`<div class="legal-draft"><h1>Adatkezelési tájékoztató</h1><p>A végleges adatkezelési tájékoztató még előkészítés alatt áll. A kurzus sablonjából, a tényleges űrlapszolgáltatás és adatkezelési adatok alapján készül el.</p><p>Jelenleg az űrlapok nem továbbítanak adatot. A kitöltés és a küldés kipróbálható, de valódi üzenet nem kerül elküldésre. A hírlevél-feliratkozás és a kisokos letöltése még nem működik.</p><p>Ez az oldal az előkészítés állapotát jelzi, nem a végleges adatkezelési dokumentum.</p>${button('Vissza a főoldalra','index.html',true)}</div>`));
console.log('Elkészült: index.html, kezelesek.html, rolunk.html, kapcsolat.html, adatkezeles.html és a főoldali hivatkozás.');

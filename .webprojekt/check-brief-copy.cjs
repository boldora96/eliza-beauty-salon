const fs = require('node:fs');
const assert = require('node:assert/strict');
const md = fs.readFileSync('szovegek.md', 'utf8').replace(/\r/g, '');
const block = name => md.split(/^## /m).find(s => s.startsWith(name+'\n'));
const part = (page, name) => block(page).split(/^### /m).find(s => s.startsWith(name+'\n'));
const normalize = text => text.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
let checked=0;
for (const [page,file,names] of [
 ['Főoldal','index.html',['Hero','Bemutatkozás','Előnyök','Folyamat','Vélemények','Felhívás','Hírlevél-feliratkozás']],
 ['Kezelések','kezelesek.html',['Hero','Probléma','Garancia','Csomagok']],
 ['Rólunk','rolunk.html',['Hero','Történet','Értékek','A szalon','Felhívás']],
 ['Kapcsolat','kapcsolat.html',['Hero és űrlap']]
]) {
 const html=normalize(fs.readFileSync(file,'utf8'));
 for (const name of names) for(const match of part(page,name).matchAll(/^- \*\*(?:Szöveg|Cím(?: \(H1\))?|Kicker|Fruzsi|Magdi|[1-4]\. [^:]+):\*\* (.+)$/gm)) {
  assert(html.includes(normalize(match[1])),`${file}: ${name}: ${match[1]}`); checked++;
 }
 assert(html.includes(normalize(part('Közös elemek (minden oldalon)','Lábléc').match(/Bemutatkozás:\*\* (.+)/)[1])),file+': footer');
 assert(!html.includes('Beauty Academy képesítés'),file+': invented credential');
}
assert(fs.readFileSync('index.html','utf8').includes('Fektess bőröd szépségébe'));
console.log(`A brief ${checked} címe és teljes szövege egyezik. A főoldali felhívás is szerepel.`);

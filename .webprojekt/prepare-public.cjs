const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const destination = path.join(root, 'public');
const pages = ['index.html', 'kezelesek.html', 'rolunk.html', 'kapcsolat.html', 'adatkezeles.html'];
const selected = new Set();
const queue = [...pages, 'sitemap.xml', 'robots.txt', ...fs.readdirSync(path.join(root,'assets/fonts')).filter(f=>f.endsWith('-OFL.txt')).map(f=>'assets/fonts/'+f)];
function enqueue(reference, owner) {
  reference = reference.replace(/&amp;/g, '&');
  if (!reference || /^(?:https?:|data:|mailto:|tel:|#|\/\/)/i.test(reference)) return;
  const relative = decodeURIComponent(reference.split(/[?#]/)[0]);
  const absolute = path.resolve(path.dirname(path.join(root, owner)), relative);
  if (!absolute.startsWith(root + path.sep)) throw Error('Külső helyi útvonal: ' + reference);
  const file = path.relative(root, absolute).split(path.sep).join('/');
  if (file.endsWith('.html') && !pages.includes(file)) throw Error('Nem publikálható oldallink: ' + file);
  queue.push(file);
}
while (queue.length) {
  const file = queue.shift();
  if (selected.has(file)) continue;
  if (!fs.statSync(path.join(root, file)).isFile()) throw Error('Hiányzó fájl: ' + file);
  selected.add(file);
  if (/\.(?:html|css|svg)$/.test(file)) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (const match of source.matchAll(/(?:src|href)="([^"]+)"/g)) enqueue(match[1], file);
    for (const match of source.matchAll(/srcset="([^"]+)"/g)) for (const candidate of match[1].split(',')) enqueue(candidate.trim().split(/\s+/)[0], file);
    for (const match of source.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)) enqueue(match[1].trim(), file);
  }
}
function list(folder) {
  return fs.existsSync(folder) ? fs.readdirSync(folder, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? list(path.join(folder,entry.name)) : [path.relative(destination,path.join(folder,entry.name)).split(path.sep).join('/')]) : [];
}
// The CSS is embedded in the HTML, so its separate published copy is unused.
const obsoleteCss = path.resolve(destination, 'assets/site.css');
if (!selected.has('assets/site.css') && obsoleteCss.startsWith(destination + path.sep) && fs.existsSync(obsoleteCss)) fs.unlinkSync(obsoleteCss);
const unexpected = list(destination).filter(file=>!selected.has(file));
if (unexpected.length) throw Error('Nem várt fájl a public mappában: '+unexpected.join(', '));
for (const file of selected) {
  const target = path.join(destination, file);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.copyFileSync(path.join(root,file), target);
}
const manifest = [...selected].sort();
if (manifest.some(f=>/\.md$|koncepcio|Korábbi|\.webprojekt/.test(f))) throw Error('Munkaanyag a publikálásban');
fs.writeFileSync(path.join(__dirname,'public-manifest.json'), JSON.stringify(manifest,null,2)+'\n');
console.log(`Publikálható mappa: public; ${pages.length} oldal, ${manifest.length} fájl. Munkaanyag: 0.`);

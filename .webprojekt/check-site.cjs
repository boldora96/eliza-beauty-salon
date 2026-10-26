const fs = require('node:fs');
const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const files = ['index.html','kezelesek.html','rolunk.html','kapcsolat.html','adatkezeles.html'];
const result = files.map(file=>{
  const html=fs.readFileSync(file,'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const duplicates=ids.filter((id,i)=>ids.indexOf(id)!==i);
  const missing=[];
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const link=match[1];
    if(/^(https?:|mailto:|tel:|data:)/.test(link))continue;
    const [targetFile,hash]=link.split('#');
    const target=decodeURIComponent(targetFile||file);
    if(!fs.existsSync(target)){missing.push(link);continue;}
    if(hash && !fs.readFileSync(target,'utf8').includes(`id="${hash}"`))missing.push(link);
  }
  return {file,h1:(html.match(/<h1\b/g)||[]).length,forms:(html.match(/id="contact-form"/g)||[]).length,duplicates,missing};
});
const treatment=fs.readFileSync('kezelesek.html','utf8');
const prices=['79 000 Ft','99 000 Ft','59 000 Ft'].every(p=>treatment.includes(p));
const about=fs.readFileSync('rolunk.html','utf8');
const values=['A tudás, ami a kezeléseim mögött áll','Bizalmatok a legnagyobb elismerés','Pillanatok a szalonból'].every(p=>about.includes(p)) && (about.match(/class="salon-photo-grid">([\s\S]*?)<\/div>/)?.[1].match(/<img /g)||[]).length===6;
const crypto = require('node:crypto');
const photoHashes = files.filter(f=>f!=='adatkezeles.html').flatMap(file=>[...fs.readFileSync(file,'utf8').matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m=>crypto.createHash('sha256').update(fs.readFileSync(decodeURIComponent(m[1]))).digest('hex')));
const uniquePhotos = new Set(photoHashes).size === photoHashes.length;
console.log(JSON.stringify({pages:result,packagePricesCorrect:prices,figmaSectionsAndSixPhotos:values,photoCount:photoHashes.length,noRepeatedPhotos:uniquePhotos},null,2));
if(result.some(r=>r.h1!==1||r.missing.length||r.duplicates.length)||!prices||!values||!uniquePhotos)process.exitCode=1;

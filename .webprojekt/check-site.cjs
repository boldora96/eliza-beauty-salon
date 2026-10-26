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
    const target=targetFile||file;
    if(!fs.existsSync(target)){missing.push(link);continue;}
    if(hash && !fs.readFileSync(target,'utf8').includes(`id="${hash}"`))missing.push(link);
  }
  return {file,h1:(html.match(/<h1\b/g)||[]).length,forms:(html.match(/id="contact-form"/g)||[]).length,duplicates,missing};
});
const treatment=fs.readFileSync('kezelesek.html','utf8');
const prices=['79 000 Ft','99 000 Ft','59 000 Ft'].every(p=>treatment.includes(p));
const about=fs.readFileSync('rolunk.html','utf8');
const values=['A tudás, ami a kezeléseim mögött áll','Bizalmatok a legnagyobb elismerés','Pillanatok a szalonból'].every(p=>about.includes(p)) && (about.match(/images\/szalon-[1-6]\.webp/g)||[]).length===6;
console.log(JSON.stringify({pages:result,packagePricesCorrect:prices,figmaSectionsAndSixPhotos:values},null,2));
if(result.some(r=>r.h1!==1||r.missing.length||r.duplicates.length)||!prices||!values)process.exitCode=1;

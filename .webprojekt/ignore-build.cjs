const {execFileSync}=require('node:child_process');
const relevant=file=>/^(?:public\/|assets\/|logo\/|downloads\/|netlify\/|Eliza-anyagok\/Eliza képek\/|Adatvédelmi nyilatkozat\/Eliza Beauty Salon - adatkezelesi tajekoztato\.md$|szovegek\.md$|netlify\.toml$|(?:index|kezelesek|rolunk|kapcsolat|adatkezeles)\.html$|robots\.txt$|sitemap\.xml$|package(?:-lock)?\.json$|\.webprojekt\/(?:build-site\.cjs|prepare-public\.cjs|render-privacy\.cjs|ignore-build\.cjs|site-additions\.css|stock-kepek\.json|seo-alapok\.json|responsive-images\.json|templates\/))/.test(file);
module.exports={relevant};
if(require.main===module){
 const before=process.env.CACHED_COMMIT_REF,after=process.env.COMMIT_REF;
 if(!before||!after){console.log('Első vagy kézi publikálás: build szükséges.');process.exitCode=1;}
 else try{
  const files=execFileSync('git',['diff','--name-only','-z',before,after],{encoding:'utf8'}).split('\0').filter(Boolean);
  const needed=files.some(relevant);
  console.log(needed?'Publikálható tartalom változott: build szükséges.':'Csak munkaanyag, dokumentáció vagy teszt változott: publikálás kihagyva.');
  // Netlify ignore command: 0 means skip, 1 means build.
  process.exitCode=needed?1:0;
 }catch{console.log('A változások nem állapíthatók meg: biztonságos teljes build.');process.exitCode=1;}
}

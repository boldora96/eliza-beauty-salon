const assert=require('node:assert/strict');
const {relevant}=require('./ignore-build.cjs');
for(const file of ['README.md','.webprojekt/kisokos-email.md','.webprojekt/check-site.cjs','.webprojekt/qa/email.png','brief.md'])assert.equal(relevant(file),false,file);
for(const file of ['index.html','assets/site.js','assets/fonts/lora.woff2','netlify/email.mjs','netlify/functions/submission-created.mjs','.webprojekt/build-site.cjs','.webprojekt/templates/csendes-base.html','.webprojekt/ignore-build.cjs','szovegek.md','netlify.toml','public/kapcsolat.html','Eliza-anyagok/Eliza képek/Szalon recepció.webp','Adatvédelmi nyilatkozat/Eliza Beauty Salon - adatkezelesi tajekoztato.md'])assert.equal(relevant(file),true,file);
console.log('OK: dokumentáció/teszt kihagyható; weboldal, űrlapfüggvény, képek és adatvédelem új buildet indít.');

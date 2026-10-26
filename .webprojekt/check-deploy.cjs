const fs = require('node:fs');
const base = process.argv[2] || 'https://elizabeautysalon.netlify.app/';
(async()=>{
  const files = require('./public-manifest.json');
  const results = [];
  for (const file of files) results.push({file,status:(await fetch(new URL(encodeURI(file),base))).status});
  const excludedFiles = [];
  for (const file of ['eliza-jegyzet.md','design-system.md','koncepcio-1-csendes-szalon.html','.webprojekt/build-site.cjs','Eliza-anyagok/Eliza képek/Képforrások.md']) excludedFiles.push({file,status:(await fetch(new URL(encodeURI(file),base))).status});
  const failed = results.filter(x=>x.status!==200);
  const report = {url:base,checked:files.length,failed,excludedFiles};
  fs.writeFileSync(require('node:path').join(__dirname,'netlify-ellenorzes.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  if(failed.length || excludedFiles.some(x=>x.status!==404))process.exitCode=1;
})().catch(error=>{console.error(error.message);process.exitCode=1;});

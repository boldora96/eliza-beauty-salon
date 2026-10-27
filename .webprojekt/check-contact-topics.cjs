const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const topics=['Időpontkérés','Belico arckezelések','Mesotica luxus kezelések','További egyedi kezelések','Anti-Age csomag','Anti-Age Plus csomag','Tini Anti-Akné csomag'];
for(const file of ['index.html','kezelesek.html','rolunk.html','kapcsolat.html']){
 const html=fs.readFileSync(file,'utf8');assert(html.includes('select id="contact-topic" name="topic" required'));for(const t of topics)assert(html.includes(`<option value="${t}">`));
}
for(const [file,cls,count] of [['index.html','service',3],['kezelesek.html','treatment-detail',3],['kezelesek.html','package',3]]){
 const cards=[...fs.readFileSync(file,'utf8').matchAll(new RegExp(`<article class="${cls}"[\\s\\S]*?<\\/article>`,'g'))];assert.equal(cards.length,count);for(const [card] of cards)assert(/href="#idopont" data-contact-topic="[^"]+"/.test(card));
}
const code=fs.readFileSync('assets/site.js','utf8').slice(fs.readFileSync('assets/site.js','utf8').indexOf('const contactTopic ='));
function setup(href,links){const select={value:'',options:topics.map(value=>({value})),dispatchEvent(){}};const anchors=links.map(([url,topic])=>({dataset:{contactTopic:topic},getAttribute(){return url},addEventListener(_,fn){this.click=fn}}));vm.runInNewContext(code,{document:{querySelector:()=>select,querySelectorAll:()=>anchors},window:{location:new URL(href)},URL,URLSearchParams,Event:class{}});return {select,anchors};}
for(const topic of topics){const {select,anchors}=setup('https://example.com/kezelesek',[['#idopont',topic]]);anchors[0].click();assert.equal(select.value,topic);}
const cross=setup('https://example.com/rolunk',[['kapcsolat.html#idopont',undefined]]);assert.equal(new URL(cross.anchors[0].href).searchParams.get('tema'),'Időpontkérés');
const landing=setup('https://example.com/kapcsolat?tema=Mesotica%20luxus%20kezel%C3%A9sek#idopont',[]);assert.equal(landing.select.value,'Mesotica luxus kezelések');
console.log('OK: 4 űrlap, 9 célzott CTA, 7 témaválasztás, oldalváltás és érkező témaválasztás.');


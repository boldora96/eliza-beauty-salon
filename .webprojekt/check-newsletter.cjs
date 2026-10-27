const fs=require('fs'),assert=require('node:assert/strict'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');const form=html.match(/<form id="newsletter-form"[\s\S]*?<\/form>/)[0];
for(const part of ['name="arcapolasi-kisokos"','data-netlify="true"','name="email"','name="name"','name="newsletter_consent"','name="privacy_consent"','name="submitted_at"','name="consent_version"','netlify-honeypot="bot-field"'])assert(form.includes(part),part);
const code=fs.readFileSync('assets/site.js','utf8').split("document.querySelectorAll('#contact-form, #newsletter-form')")[1].split('// A galéria')[0];
(async()=>{
 for(const ok of [true,false]){let handler,reset=0,opened=0,body;
 const button={textContent:'Kérem az ingyenes kisokost',disabled:false,focus(){}};
 const status={textContent:'',classList:{remove(){},add(){}}};
 const f={id:'newsletter-form',elements:{submitted_at:{value:''}},querySelector:q=>q.includes('button')?button:status,addEventListener:(_,fn)=>handler=fn,checkValidity:()=>true,reset(){reset++},setAttribute(){},removeAttribute(){}};
 const dialog={querySelector:()=>({addEventListener(){}}),addEventListener(){},showModal(){opened++}};
 const ctx={document:{querySelector:()=>dialog},Date,URLSearchParams,FormData:class{constructor(){return new URLSearchParams({'form-name':'arcapolasi-kisokos',name:'Teszt',email:'teszt@example.com',newsletter_consent:'accepted',privacy_consent:'accepted',submitted_at:f.elements.submitted_at.value})}},fetch:async(_,opts)=>{body=opts.body;return {ok}}};
 vm.runInNewContext('[form]'+code,{...ctx,form:f});await handler({preventDefault(){}});
 assert(body.includes('form-name=arcapolasi-kisokos'));assert(body.includes('submitted_at='));assert.equal(reset,ok?1:0);assert.equal(opened,ok?1:0);assert.equal(button.disabled,false);
 }console.log('OK: Netlify form fields, separate subscription payload, successful popup and failure without data loss.');
})();


import assert from 'node:assert/strict';
import {handler} from '../netlify/functions/submission-created.mjs';
import {handler as unsubscribe} from '../netlify/functions/newsletter-unsubscribe.mjs';
import {unsubscribeToken,tokenEmail} from '../netlify/email.mjs';
process.env.BREVO_API_KEY='test-not-a-real-key';process.env.BREVO_SENDER_EMAIL='sender@example.com';process.env.OWNER_NOTIFICATION_EMAIL='owner@example.com';process.env.BREVO_NEWSLETTER_LIST_ID='7';
let calls=[],blocked=false,exists=false;
const realFetch=globalThis.fetch;
globalThis.fetch=async(url,options)=>{
 const data=options.body?JSON.parse(options.body):null;calls.push({url,method:options.method,data});
 if(url.includes('/contacts/')&&options.method==='GET')return {ok:exists,status:exists?200:404,json:async()=>({emailBlacklisted:blocked,attributes:{FIRSTNAME:'Teszt'}})};
 if(url.includes('/contacts/')&&options.method==='PUT')blocked=data.emailBlacklisted;
 if(url.endsWith('/contacts')&&options.method==='POST')exists=true;
 return {ok:true,status:201,json:async()=>({id:1})};
};
try{
 const request=form=>({body:JSON.stringify({payload:{form_name:form,created_at:'2026-10-29T08:00:00Z',data:{name:'Teszt <script>',email:'test@example.com',privacy_consent:'accepted',newsletter_consent:'accepted',topic:'Belico',message:'Első sor\n<script>'}}})});
 await handler(request('arcapolasi-kisokos'));
 let emails=calls.filter(c=>c.url.endsWith('/smtp/email')).map(c=>c.data);assert.equal(emails.length,2);assert(emails.find(m=>m.attachment).htmlContent.includes('Leiratkozom'));assert(emails.every(m=>m.htmlContent.includes('SZAKÉRTELEM. NYUGALOM. TÖRŐDÉS.')));
 const token=unsubscribeToken('test@example.com');assert.equal(tokenEmail(token),'test@example.com');assert(!token.includes('test'));assert.equal(tokenEmail(token.slice(0,-8)+'tampered'),null);
 calls=[];let response=await unsubscribe({httpMethod:'GET',queryStringParameters:{token}});assert.equal(response.statusCode,200);assert.equal(calls.length,0);assert(response.body.includes('type="submit"'));
 response=await unsubscribe({httpMethod:'POST',body:new URLSearchParams({token}).toString()});assert.equal(response.statusCode,200);assert(blocked);assert(response.body.includes('Sikeresen leiratkoztál'));assert(calls.some(c=>c.data?.unlinkListIds?.[0]===7));assert(calls.some(c=>c.data?.subject?.includes('Hírlevél-leiratkozás')));
 calls=[];await handler(request('arcapolasi-kisokos'));assert(!calls.some(c=>c.data?.attachment));assert(!calls.some(c=>c.url.endsWith('/contacts')&&c.method==='POST'));
 calls=[];await handler(request('idopontkeres'));emails=calls.filter(c=>c.url.endsWith('/smtp/email')).map(c=>c.data);assert.equal(emails.length,2);assert(emails.some(m=>m.subject.includes('Megkaptuk')));assert(emails.every(m=>!m.htmlContent.includes('<script>')));assert(!calls.some(c=>c.url.includes('/contacts')));
 calls=[];response=await unsubscribe({httpMethod:'POST',body:'token=bad'});assert.equal(response.statusCode,400);assert.equal(calls.length,0);
 globalThis.fetch=async()=>({ok:false,status:503});response=await unsubscribe({httpMethod:'POST',body:new URLSearchParams({token}).toString()});assert.equal(response.statusCode,503);assert(!response.body.includes('Sikeresen leiratkoztál'));
 console.log('OK: 4 egységes levél, titkosított/tamperbiztos leiratkozás, GET nem módosít, Brevo opt-out és listaeltávolítás, tulajdonosi értesítés, nincs automatikus újrafeliratkoztatás, a kapcsolatfelvétel nem tiltott.');
}finally{globalThis.fetch=realFetch;}

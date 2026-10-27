import assert from 'node:assert/strict';
import {handler,GUIDE_URL} from '../netlify/functions/submission-created.mjs';
const request=(changes={},form='arcapolasi-kisokos')=>({body:JSON.stringify({payload:{form_name:form,created_at:'2026-10-27T21:00:00Z',data:{name:'Teszt <script>',email:'test@example.com',privacy_consent:'accepted',newsletter_consent:'accepted',message:'Első sor\n<script>alert(1)</script>',topic:'Belico arckezelések',...changes}}})});
const previous={key:process.env.BREVO_API_KEY,sender:process.env.BREVO_SENDER_EMAIL,owner:process.env.OWNER_NOTIFICATION_EMAIL,fetch:globalThis.fetch};
try{
 delete process.env.BREVO_API_KEY;delete process.env.BREVO_SENDER_EMAIL;
 assert.equal((await handler(request())).body,'email-not-configured');
 process.env.BREVO_API_KEY='fake-test-key';process.env.BREVO_SENDER_EMAIL='sender@example.com';process.env.OWNER_NOTIFICATION_EMAIL='owner@example.com';
 let messages=[];
 globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.brevo.com/v3/smtp/email');messages.push(JSON.parse(options.body));return {ok:true,status:201};};
 for(const form of ['unknown'])assert.equal((await handler(request({},form))).body,'ignored');
 for(const changes of [{newsletter_consent:''},{email:'invalid'},{privacy_consent:''}])assert.equal((await handler(request(changes))).body,'invalid-consent-or-address');
 assert.equal(messages.length,0);
 assert.equal((await handler(request())).body,'sent');assert.equal(messages.length,2);
 const owner=messages.find(m=>m.to[0].email==='owner@example.com');const customer=messages.find(m=>m.to[0].email==='test@example.com');
 assert(owner.htmlContent.includes('Teszt &lt;script&gt;'));assert(owner.htmlContent.includes('2026. október 27. 22:00'));assert.equal(owner.replyTo.email,'test@example.com');assert(!owner.attachment);
 assert.equal(customer.attachment[0].url,GUIDE_URL);
 messages=[];assert.equal((await handler(request({newsletter_consent:''},'idopontkeres'))).body,'sent');assert.equal(messages.length,1);assert.equal(messages[0].to[0].email,'owner@example.com');assert(messages[0].htmlContent.includes('Belico arckezelések'));assert(messages[0].htmlContent.includes('Első sor<br>&lt;script&gt;'));assert(!messages[0].htmlContent.includes('<script>'));
 let attempted=0;globalThis.fetch=async()=>{attempted++;return {ok:false,status:503}};await assert.rejects(()=>handler(request()),/delivery failed/);assert.equal(attempted,2);
 assert.equal((await handler({body:'not-json'})).statusCode,400);
 console.log('OK: branded owner notification for both forms, separate customer PDF, reply-to, Budapest time, escaped content and independent send attempts.');
}finally{globalThis.fetch=previous.fetch;for(const [key,value] of [['BREVO_API_KEY',previous.key],['BREVO_SENDER_EMAIL',previous.sender],['OWNER_NOTIFICATION_EMAIL',previous.owner]])if(value===undefined)delete process.env[key];else process.env[key]=value;}

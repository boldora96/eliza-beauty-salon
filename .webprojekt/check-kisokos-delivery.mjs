import assert from 'node:assert/strict';
import {handler,createEmail,GUIDE_URL} from '../netlify/functions/submission-created.mjs';
const request=(changes={},form='arcapolasi-kisokos')=>({body:JSON.stringify({payload:{form_name:form,data:{name:'Teszt <script>',email:'test@example.com',privacy_consent:'accepted',newsletter_consent:'accepted',...changes}}})});
const oldKey=process.env.BREVO_API_KEY,oldSender=process.env.BREVO_SENDER_EMAIL;
const originalFetch=globalThis.fetch;
try{
 delete process.env.BREVO_API_KEY;delete process.env.BREVO_SENDER_EMAIL;
 assert.equal((await handler(request())).body,'email-not-configured');
 process.env.BREVO_API_KEY='fake-test-key';process.env.BREVO_SENDER_EMAIL='sender@example.com';
 let calls=0,payload;
 globalThis.fetch=async(url,options)=>{calls++;assert.equal(url,'https://api.brevo.com/v3/smtp/email');payload=JSON.parse(options.body);return {ok:true,status:201};};
 assert.equal((await handler(request({},'idopontkeres'))).body,'ignored');
 assert.equal((await handler(request({newsletter_consent:''}))).body,'invalid-consent-or-address');
 assert.equal((await handler(request({email:'invalid'}))).body,'invalid-consent-or-address');
 assert.equal(calls,0);
 assert.equal((await handler(request())).body,'sent');assert.equal(calls,1);
 assert.equal(payload.attachment[0].url,GUIDE_URL);assert(payload.htmlContent.includes('Teszt &lt;script&gt;'));assert.equal(payload.to[0].email,'test@example.com');
 globalThis.fetch=async()=>({ok:false,status:503});await assert.rejects(()=>handler(request()),/delivery failed/);
 assert.equal((await handler({body:'not-json'})).statusCode,400);
 console.log('OK: newsletter-only delivery, required consents, safe name, PDF attachment, inactive configuration and provider error. No real e-mail sent by these tests.');
}finally{
 globalThis.fetch=originalFetch;
 if(oldKey===undefined)delete process.env.BREVO_API_KEY;else process.env.BREVO_API_KEY=oldKey;
 if(oldSender===undefined)delete process.env.BREVO_SENDER_EMAIL;else process.env.BREVO_SENDER_EMAIL=oldSender;
}

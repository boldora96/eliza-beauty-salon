import {createCipheriv,createDecipheriv,createHash,randomBytes} from 'node:crypto';
export const SITE='https://elizabeautysalon.netlify.app';
export const newsletterListId=()=>Number(process.env.BREVO_NEWSLETTER_LIST_ID||3);
export const GUIDE_URL=SITE+'/downloads/eliza-arcapolasi-kisokos.pdf';
export const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||''));
const tokenKey=()=>createHash('sha256').update('eliza-unsubscribe-v1:'+process.env.BREVO_API_KEY).digest();
export function unsubscribeToken(email){
 if(!process.env.BREVO_API_KEY)throw Error('Missing token key');
 const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',tokenKey(),iv);
 return Buffer.concat([iv,cipher.update(JSON.stringify({email:email.toLowerCase(),purpose:'newsletter'})),cipher.final(),cipher.getAuthTag()]).toString('base64url');
}
export function tokenEmail(token){
 try{
 if(!process.env.BREVO_API_KEY||!token||token.length>1024)return null;
 const bytes=Buffer.from(token,'base64url');if(bytes.length<30)return null;
 const cipher=createDecipheriv('aes-256-gcm',tokenKey(),bytes.subarray(0,12));cipher.setAuthTag(bytes.subarray(-16));
 const data=JSON.parse(Buffer.concat([cipher.update(bytes.subarray(12,-16)),cipher.final()]).toString());
 return data.purpose==='newsletter'&&validEmail(data.email)?data.email:null;
 }catch{return null;}
}
export const unsubscribeURL=email=>SITE+'/.netlify/functions/newsletter-unsubscribe?token='+unsubscribeToken(email);
export function layout(title,body,footer='Automatikus levél az Eliza Beauty Salon weboldaláról.'){
 return `<!doctype html><html lang="hu"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#F8F5F0;color:#40302B;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="580" cellpadding="0" cellspacing="0" style="width:100%;max-width:580px;background:#FBF9F6;border:1px solid #dce0d7;border-radius:12px"><tr><td style="padding:24px;border-bottom:1px solid #dce0d7"><p style="font-family:Georgia,serif;font-size:28px;line-height:1.3;color:#4F6045;margin:0">Eliza Beauty Salon</p><p style="margin:8px 0 0;font-size:11px;letter-spacing:2px;color:#4F6045">SZAKÉRTELEM. NYUGALOM. TÖRŐDÉS.</p></td></tr><tr><td style="padding:24px;font-size:15px;line-height:1.7"><h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.3;font-weight:normal;color:#4F6045;margin:0 0 20px">${safe(title)}</h1>${body}</td></tr><tr><td style="padding:20px 24px;border-top:1px solid #dce0d7;font-size:12px;line-height:1.6">${footer}<br><a href="${SITE}/adatkezeles" style="color:#4F6045">Adatkezelési tájékoztató</a></td></tr></table></td></tr></table></body></html>`;
}
export const button=(label,url)=>`<p style="margin:24px 0"><a href="${safe(url)}" style="display:inline-block;padding:12px 20px;border-radius:4px;background:#4F6045;color:#FBF9F6;text-decoration:none;font-family:Georgia,serif;font-size:15px">${safe(label)}</a></p>`;
export const messageBox=message=>`<div style="padding:18px;margin:20px 0;background:#F8F5F0;border-left:2px solid #4F6045;overflow-wrap:anywhere">${safe(message).replace(/\r?\n/g,'<br>')}</div>`;
export function details(payload){
 const d=payload.data||{},date=new Date(payload.created_at||d.submitted_at||Date.now());
 const time=new Intl.DateTimeFormat('hu-HU',{timeZone:'Europe/Budapest',dateStyle:'long',timeStyle:'short'}).format(Number.isFinite(date.getTime())?date:new Date());
 const rows=[['Név',d.name||'Nincs megadva'],['E-mail',d.email],['Téma',payload.form_name==='arcapolasi-kisokos'?'Arcápolási Kisokos':d.topic||'Időpontkérés'],['Beküldve',time]];
 return {time,html:`<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(([k,v])=>`<tr><td style="width:90px;padding:8px 12px 8px 0;vertical-align:top;font-size:13px;color:#4F6045">${k}</td><td style="padding:8px 0;overflow-wrap:anywhere">${safe(v)}</td></tr>`).join('')}</table>`,text:rows.map(([k,v])=>k+': '+v).join('\n')};
}
export async function brevo(path,{method='GET',body,contacts=false}={}){
 const key=contacts?(process.env.BREVO_CONTACTS_API_KEY||process.env.BREVO_API_KEY):process.env.BREVO_API_KEY;
 const response=await fetch('https://api.brevo.com/v3'+path,{method,headers:{'api-key':key,'Content-Type':'application/json',accept:'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('Brevo HTTP '+response.status);
 return response.status===204?null:response.json();
}
export async function sendEmail(message){await brevo('/smtp/email',{method:'POST',body:message});}
export const sender=()=>({name:'Eliza Beauty Salon',email:process.env.BREVO_SENDER_EMAIL});
export const owner=()=>process.env.OWNER_NOTIFICATION_EMAIL||'boldora96@gmail.com';
export async function subscribe(data){
 // Never silently reactivate an address that has previously unsubscribed.
 let contact;
 try{contact=await brevo('/contacts/'+encodeURIComponent(data.email),{contacts:true});}catch(e){if(e.message!=='Brevo HTTP 404')throw e;}
 if(contact?.emailBlacklisted)return false;
 await brevo('/contacts',{method:'POST',contacts:true,body:{email:data.email,updateEnabled:true,attributes:{FIRSTNAME:String(data.name||'').slice(0,160)},listIds:[newsletterListId()]}});
 return true;
}

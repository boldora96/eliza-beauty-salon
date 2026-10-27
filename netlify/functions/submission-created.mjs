const SITE='https://elizabeautysalon.netlify.app';
export const GUIDE_URL=SITE+'/downloads/eliza-arcapolasi-kisokos.pdf';
const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createEmail(data,senderEmail){
 const name=String(data.name||'').trim().slice(0,160);
 return {
  sender:{name:'Eliza Beauty Salon',email:senderEmail},
  to:[{email:String(data.email).trim(),name}],
  subject:'Megérkezett az Arcápolási Kisokosod | Eliza Beauty Salon',
  htmlContent:`<!doctype html><html lang="hu"><body style="margin:0;background:#F8F5F0;color:#40302B;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="560" style="width:100%;max-width:560px;background:#FBF9F6;border:1px solid #dce0d7;border-radius:16px" cellpadding="32"><tr><td><p style="font-family:Georgia,serif;color:#4F6045;font-size:32px;margin:0 0 24px">Eliza Beauty Salon</p><h1 style="font-family:Georgia,serif;font-weight:normal;color:#4F6045;font-size:28px;line-height:1.3">Szia ${safe(name||'Kedves Olvasó')}!</h1><p style="font-size:16px;line-height:1.6">Köszönöm az érdeklődésed! Mellékelten megtalálod a háromoldalas Arcápolási Kisokost, amely a kíméletes tisztítás, a hidratálás és a fényvédelem alapjaiban segít eligazodni.</p><p style="font-size:16px;line-height:1.6">Ha a mellékletet később újra szeretnéd elérni, innen is letöltheted:</p><p style="margin:24px 0"><a href="${GUIDE_URL}" style="display:inline-block;background:#4F6045;color:#FBF9F6;padding:16px 24px;border-radius:4px;text-decoration:none;font-family:Georgia,serif">LETÖLTÖM A KISOKOST</a></p><p style="font-size:16px;line-height:1.6">Szeretettel,<br>Eliza Beauty Salon</p><p style="font-size:12px;line-height:1.6">Ezt a levelet az Arcápolási Kisokos feliratkozó űrlapján leadott kérésedre küldtük.</p></td></tr></table></td></tr></table></body></html>`,
  textContent:`Szia ${name||'Kedves Olvasó'}!\n\nKöszönöm az érdeklődésed! Mellékelten küldöm az Arcápolási Kisokost. Letöltés: ${GUIDE_URL}\n\nSzeretettel,\nEliza Beauty Salon`,
  attachment:[{url:GUIDE_URL,name:'Eliza-Arcapolasi-Kisokos.pdf'}]
 };
}
// Kizárólag Netlify által hitelesített, új űrlapbeküldés indíthatja ezt az eseményfüggvényt.
export async function handler(event){
 let payload;
 try{payload=JSON.parse(event.body||'{}').payload;}catch{return {statusCode:400};}
 if(!payload)return {statusCode:400};
 const data=payload.data||{};
 const form=payload.form_name||data['form-name'];
 if(form!=='arcapolasi-kisokos')return {statusCode:200,body:'ignored'};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email||''))||data.privacy_consent!=='accepted'||data.newsletter_consent!=='accepted')return {statusCode:200,body:'invalid-consent-or-address'};
 const key=process.env.BREVO_API_KEY;
 const sender=process.env.BREVO_SENDER_EMAIL;
 if(!key||!sender){console.warn('Kisokos e-mail nem aktív: BREVO_API_KEY és BREVO_SENDER_EMAIL szükséges. A feliratkozás a Netlify Formsban megmarad.');return {statusCode:200,body:'email-not-configured'};}
 const response=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':key,'Content-Type':'application/json',accept:'application/json'},body:JSON.stringify(createEmail(data,sender)),signal:AbortSignal.timeout(15000)});
 if(!response.ok){console.error('Brevo kézbesítési kérés sikertelen, HTTP',response.status);throw new Error('Kisokos delivery failed');}
 console.info('Kisokos e-mail-kézbesítési kérés elfogadva.');
 return {statusCode:200,body:'sent'};
}

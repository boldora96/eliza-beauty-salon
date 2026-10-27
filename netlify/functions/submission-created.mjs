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
const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||''));
export function createOwnerEmail(payload,senderEmail,ownerEmail){
 const data=payload.data||{};
 const newsletter=(payload.form_name||data['form-name'])==='arcapolasi-kisokos';
 const title=newsletter?'Új Kisokos-feliratkozás':'Új megkeresés érkezett';
 const name=String(data.name||'Nincs megadva').trim().slice(0,160);
 const email=String(data.email||'').trim();
 const topic=newsletter?'Arcápolási Kisokos':String(data.topic||'Időpontkérés').slice(0,180);
 const rawDate=payload.created_at||data.submitted_at;
 const date=rawDate?new Date(rawDate):new Date();
 const dateLabel=new Intl.DateTimeFormat('hu-HU',{timeZone:'Europe/Budapest',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(Number.isFinite(date.getTime())?date:new Date());
 const field=(label,value)=>`<tr><td style="padding:10px 16px 10px 0;width:105px;vertical-align:top;color:#4F6045;font-size:13px;line-height:1.6">${label}</td><td style="padding:10px 0;vertical-align:top;font-size:15px;line-height:1.6;word-break:break-word">${value}</td></tr>`;
 const message=newsletter?'A látogató feliratkozott az Arcápolási Kisokosra. A PDF kézbesítését a rendszer külön e-mailben indítja.':String(data.message||'').slice(0,20000);
 const content=`<!doctype html><html lang="hu"><body style="margin:0;background:#F8F5F0;color:#40302B;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 16px"><table role="presentation" width="580" cellpadding="0" cellspacing="0" style="width:100%;max-width:580px;background:#FBF9F6;border:1px solid #dce0d7;border-radius:16px"><tr><td style="padding:28px 28px 24px;border-bottom:1px solid #dce0d7"><p style="font-family:Georgia,serif;font-size:26px;line-height:1.3;color:#4F6045;margin:0">Eliza Beauty Salon</p><p style="margin:10px 0 0;font-size:12px;color:#4F6045;letter-spacing:1px">ÉRTESÍTÉS A WEBOLDALADRÓL</p></td></tr><tr><td style="padding:28px"><h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.3;font-weight:normal;color:#4F6045;margin:0 0 20px">${title}</h1><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${field('Név',safe(name))}${field('E-mail',`<a href="mailto:${safe(email)}" style="color:#40302B;text-decoration:none">${safe(email)}</a>`)}${field('Téma',safe(topic))}${field('Beküldve',safe(dateLabel))}${newsletter?field('Hozzájárulás','Adatvédelem és e-mail-fogadás elfogadva'):''}</table><div style="margin:20px 0 24px;padding:20px;background:#F8F5F0;border-left:2px solid #4F6045;border-radius:4px"><p style="font-size:12px;letter-spacing:1px;color:#4F6045;margin:0 0 12px">${newsletter?'FELIRATKOZÁS':'ÜZENET'}</p><p style="font-size:15px;line-height:1.7;margin:0;word-break:break-word">${safe(message).replace(/\r?\n/g,'<br>')}</p></div><p style="margin:0 0 16px"><a href="mailto:${safe(email)}" style="display:inline-block;padding:14px 22px;border-radius:4px;background:#4F6045;color:#FBF9F6;text-decoration:none;font-family:Georgia,serif;font-size:15px">Válaszolok a beküldőnek</a></p><a href="https://app.netlify.com/projects/elizabeautysalon/forms" style="color:#4F6045;text-decoration:none;font-size:13px">Megnyitom a Netlify Formsban</a></td></tr><tr><td style="padding:20px 28px;border-top:1px solid #dce0d7;font-size:12px;line-height:1.6;color:#40302B">Automatikus értesítés az Eliza Beauty Salon weboldaláról.<br>A levélre válaszolva közvetlenül a beküldőt éred el.</td></tr></table></td></tr></table></body></html>`;
 return {sender:{name:'Eliza Beauty Salon – értesítés',email:senderEmail},to:[{email:ownerEmail}],replyTo:{email,name},subject:`${newsletter?'Új Kisokos-feliratkozás':'Új megkeresés'} | Eliza Beauty Salon`,htmlContent:content,textContent:`${title}\n\nNév: ${name}\nE-mail: ${email}\nTéma: ${topic}\nBeküldve: ${dateLabel}\n\n${message}\n\nNetlify Forms: https://app.netlify.com/projects/elizabeautysalon/forms`};
}
// Csak a Netlify által hitelesített, új űrlapbeküldések indítják az értesítést.
export async function handler(event){
 let payload;
 try{payload=JSON.parse(event.body||'{}').payload;}catch{return {statusCode:400};}
 if(!payload)return {statusCode:400};
 const data=payload.data||{};
 const form=payload.form_name||data['form-name'];
 if(!['arcapolasi-kisokos','idopontkeres'].includes(form))return {statusCode:200,body:'ignored'};
 if(!validEmail(data.email)||data.privacy_consent!=='accepted'||(form==='arcapolasi-kisokos'&&data.newsletter_consent!=='accepted'))return {statusCode:200,body:'invalid-consent-or-address'};
 const key=process.env.BREVO_API_KEY;
 const sender=process.env.BREVO_SENDER_EMAIL;
 const owner=process.env.OWNER_NOTIFICATION_EMAIL||'boldora96@gmail.com';
 if(!key||!sender){console.warn('E-mail-küldés nem aktív: Brevo-konfiguráció szükséges.');return {statusCode:200,body:'email-not-configured'};}
 if(!validEmail(owner))throw new Error('Invalid owner notification address');
 const messages=[createOwnerEmail(payload,sender,owner)];
 if(form==='arcapolasi-kisokos')messages.push(createEmail(data,sender));
 const results=await Promise.allSettled(messages.map(async message=>{
  const response=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':key,'Content-Type':'application/json',accept:'application/json'},body:JSON.stringify(message),signal:AbortSignal.timeout(15000)});
  if(!response.ok){console.error('Brevo küldési hiba, HTTP',response.status);throw new Error('Email delivery failed');}
 }));
 if(results.some(result=>result.status==='rejected'))throw new Error('Email delivery failed');
 console.info('Arculati értesítés és kért PDF-kézbesítés elfogadva.');
 return {statusCode:200,body:'sent'};
}

import {SITE,safe,tokenEmail,brevo,sendEmail,sender,owner,layout,details} from '../email.mjs';
const page=(title,text,form='')=>`<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${safe(title)} | Eliza Beauty Salon</title><style>body{margin:0;background:#F8F5F0;color:#40302B;font:16px/1.7 Arial,sans-serif}main{max-width:540px;margin:10vh auto;padding:32px 24px;background:#FBF9F6;border:1px solid #dce0d7;border-radius:12px}h1,.brand{font-family:Georgia,serif;font-weight:400;color:#4F6045}h1{font-size:32px;line-height:1.3}.brand{font-size:24px}button{border:0;border-radius:4px;background:#4F6045;color:#FBF9F6;font:16px Georgia,serif;padding:14px 22px;cursor:pointer}a{color:#4F6045}</style></head><body><main><p class="brand">Eliza Beauty Salon</p><h1>${safe(title)}</h1><p>${safe(text)}</p>${form}<p><a href="${SITE}">Vissza a főoldalra</a></p></main></body></html>`;
const result=(statusCode,body)=>({statusCode,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"},body});
export async function handler(event){
 if(!['GET','POST'].includes(event.httpMethod))return result(405,page('Ez a kérés nem támogatott.','Kérjük, használd a levélben található leiratkozási hivatkozást.'));
 const token=event.httpMethod==='GET'?event.queryStringParameters?.token:new URLSearchParams(event.body||'').get('token');
 const email=tokenEmail(token);
 if(!email)return result(400,page('A hivatkozás nem érvényes.','Nyisd meg a legutóbbi Kisokos-levél leiratkozási hivatkozását.'));
 if(event.httpMethod==='GET')return result(200,page('Leiratkozol a hírlevélről?','A megerősítés után nem küldünk több hírlevelet. A külön kért kapcsolatfelvételi visszaigazolásokra ez nem vonatkozik.',`<form method="post"><input type="hidden" name="token" value="${safe(token)}"><button type="submit">Leiratkozom</button></form>`));
 try{
  const contact=await brevo('/contacts/'+encodeURIComponent(email),{contacts:true});
  // Persist the marketing opt-out first; never alter transactional suppression settings.
  if(!contact.emailBlacklisted){
   await brevo('/contacts/'+encodeURIComponent(email),{method:'PUT',contacts:true,body:{emailBlacklisted:true,...(process.env.BREVO_NEWSLETTER_LIST_ID?{unlinkListIds:[Number(process.env.BREVO_NEWSLETTER_LIST_ID)]}:{})}});
  }
   const info=details({created_at:new Date().toISOString(),data:{name:contact.attributes?.FIRSTNAME||'Nincs megadva',email,topic:'Hírlevél-leiratkozás'}});
   try{await sendEmail({sender:sender(),to:[{email:owner()}],subject:'Hírlevél-leiratkozás | Eliza Beauty Salon',htmlContent:layout('Hírlevél-leiratkozás',info.html+'<p>A leiratkozást a Brevo rögzítette. A címzett kikerült az aktív hírlevél-feliratkozók közül.</p>'),textContent:'Hírlevél-leiratkozás\n'+info.text});}catch{console.error('Leiratkozás mentve; tulajdonosi értesítés sikertelen.');return result(503,page('A leiratkozásodat rögzítettük.','A tulajdonosi értesítés továbbítása átmenetileg nem sikerült. Hírlevelet már nem küldünk.'));}
  return result(200,page('Sikeresen leiratkoztál.','A hírlevél-feliratkozásodat megszüntettük. Köszönjük, hogy eddig velünk tartottál!'));
 }catch{console.error('Leiratkozás: Brevo-művelet sikertelen.');return result(503,page('A leiratkozás most nem sikerült.','Kérjük, próbáld újra később a levélben található hivatkozással.'));}
}

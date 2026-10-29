import {GUIDE_URL,SITE,safe,validEmail,layout,button,messageBox,details,unsubscribeURL,sendEmail,sender,owner,subscribe} from '../email.mjs';
export {GUIDE_URL};
export function createEmail(data,senderEmail){
 const name=String(data.name||'').trim().slice(0,160),url=unsubscribeURL(data.email);
 const footer=`Ezt a levelet a Kisokos-feliratkozásod alapján küldtük.<br><a href="${safe(url)}" style="color:#4F6045">Leiratkozom a hírlevélről</a>`;
 return {sender:{name:'Eliza Beauty Salon',email:senderEmail},to:[{email:data.email,name}],subject:'Megérkezett az Arcápolási Kisokosod | Eliza Beauty Salon',htmlContent:layout('Megérkezett a Kisokosod',`<p>Szia ${safe(name||'Kedves Olvasó')}!</p><p>Köszönöm az érdeklődésed! A mellékelt háromoldalas Arcápolási Kisokos a kíméletes tisztítás, a hidratálás és a fényvédelem alapjaiban segít eligazodni.</p>${button('Letöltöm a Kisokost',GUIDE_URL)}<p>Szeretettel,<br>Eliza</p>`,footer),textContent:`Szia ${name}!\n\nArcápolási Kisokos: ${GUIDE_URL}\n\nLeiratkozás: ${url}`,attachment:[{url:GUIDE_URL,name:'Eliza-Arcapolasi-Kisokos.pdf'}]};
}
export function createContactEmail(payload,senderEmail){
 const d=payload.data,info=details(payload);
 return {sender:{name:'Eliza Beauty Salon',email:senderEmail},to:[{email:d.email,name:String(d.name||'').slice(0,160)}],subject:'Megkaptuk a megkeresésed | Eliza Beauty Salon',htmlContent:layout('Megkaptuk a megkeresésed',`<p>Szia ${safe(d.name)}!</p><p>Köszönöm, hogy írtál! Az üzeneted megérkezett, hamarosan felveszem veled a kapcsolatot. Az időpont véglegesítését személyesen egyeztetjük.</p>${info.html}${messageBox(d.message||'')}<p>Szeretettel,<br>Eliza</p>`,'Ezt a visszaigazolást a kapcsolatfelvételi űrlap kitöltése miatt kaptad. Ez nem hírlevél-feliratkozás.'),textContent:`Szia ${d.name}!\n\nMegkaptuk az üzeneted, hamarosan felveszem veled a kapcsolatot.\n\n${info.text}\n\n${d.message||''}\n\nEliza`};
}
export function createOwnerEmail(payload,senderEmail,ownerEmail){
 const d=payload.data,n=payload.form_name==='arcapolasi-kisokos',info=details(payload),title=n?'Új Kisokos-feliratkozás':'Új megkeresés érkezett';
 return {sender:{name:'Eliza Beauty Salon',email:senderEmail},to:[{email:ownerEmail}],replyTo:{email:d.email,name:String(d.name||'').slice(0,160)},subject:`${n?'Új Kisokos-feliratkozás':'Új megkeresés'} | Eliza Beauty Salon`,htmlContent:layout(title,info.html+messageBox(n?'A látogató elfogadta az adatvédelmi tájékoztatót és hozzájárult a Kisokos, valamint a hírlevelek fogadásához.':d.message||'')+button('Válaszolok a beküldőnek','mailto:'+d.email)+`<a href="https://app.netlify.com/projects/elizabeautysalon/forms" style="color:#4F6045">Megnyitom a Netlify Formsban</a>`,'A levélre válaszolva közvetlenül a beküldőt éred el.'),textContent:title+'\n\n'+info.text+'\n\n'+(d.message||'')};
}
export async function handler(event){
 let payload;try{payload=JSON.parse(event.body||'{}').payload;}catch{return {statusCode:400};}
 if(!payload)return {statusCode:400};
 const d=payload.data||{},form=payload.form_name||d['form-name'];payload.form_name=form;
 if(!['arcapolasi-kisokos','idopontkeres'].includes(form))return {statusCode:200,body:'ignored'};
 if(!validEmail(d.email)||d.privacy_consent!=='accepted'||(form==='arcapolasi-kisokos'&&d.newsletter_consent!=='accepted'))return {statusCode:200,body:'invalid-consent-or-address'};
 d.email=String(d.email).trim().toLowerCase();
 if(!process.env.BREVO_API_KEY||!process.env.BREVO_SENDER_EMAIL)return {statusCode:200,body:'email-not-configured'};
 if(!validEmail(owner()))throw Error('Invalid owner notification address');
 const s=sender().email;
 const messages=[createOwnerEmail(payload,s,owner())];
 if(form==='arcapolasi-kisokos'){
  if(await subscribe(d))messages.push(createEmail(d,s));
 }else messages.push(createContactEmail(payload,s));
 const results=await Promise.allSettled(messages.map(sendEmail));
 if(results.some(r=>r.status==='rejected'))throw Error('Email delivery failed');
 console.info('Arculati értesítések elfogadva.');
 return {statusCode:200,body:'sent'};
}

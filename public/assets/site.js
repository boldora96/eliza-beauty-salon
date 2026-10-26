const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menü';}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Bezárás':'Menü';});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menuButton.focus();}});
document.querySelectorAll('#contact-form').forEach(form=>{
  const dialog=document.querySelector('#contact-success');
  const button=form.querySelector('button[type="submit"]');
  const status=form.querySelector('.form-status');
  let sending=false;
  dialog?.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('close',()=>button.focus());
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(sending || !form.checkValidity())return;
    sending=true;
    const originalText=button.textContent;
    button.disabled=true;button.textContent='Küldés…';form.setAttribute('aria-busy','true');
    status.textContent='Az üzeneted küldése folyamatban…';status.classList.remove('submission-error');
    try {
      const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});
      if(!response.ok)throw new Error('submission-failed');
      form.reset();status.textContent='Üzeneted megérkezett. Hamarosan felveszem veled a kapcsolatot.';
      if(dialog)dialog.showModal();
    } catch {
      status.classList.add('submission-error');
      status.textContent='Nem sikerült megerősíteni az üzenet elküldését. A kitöltött adatokat megőriztük; kérjük, ellenőrizd az internetkapcsolatodat, és próbáld újra.';
    } finally {
      sending=false;button.disabled=false;button.textContent=originalText;form.removeAttribute('aria-busy');
    }
  });
});

// A galéria natív dialógusa: billentyűzettel és egérrel egyaránt használható.
const galleryDialog = document.querySelector('.gallery-dialog');
const galleryImages = [...document.querySelectorAll('.salon-photo-grid img')];
if(galleryDialog && galleryImages.length){
  let activeIndex=0;
  const large=galleryDialog.querySelector('.gallery-large');
  const caption=galleryDialog.querySelector('.gallery-caption');
  function showPhoto(index){activeIndex=(index+galleryImages.length)%galleryImages.length;const source=galleryImages[activeIndex];large.src=source.src;large.alt=source.alt;caption.textContent=`${activeIndex+1} / ${galleryImages.length} · ${source.alt}`;}
  galleryImages.forEach((img,index)=>{const trigger=document.createElement('button');trigger.type='button';trigger.setAttribute('aria-label',`${img.alt} – kép nagyítása`);trigger.setAttribute('aria-haspopup','dialog');img.replaceWith(trigger);trigger.append(img);const hint=document.createElement('span');hint.className='gallery-hint';hint.textContent='+';hint.setAttribute('aria-hidden','true');trigger.append(hint);trigger.addEventListener('click',()=>{showPhoto(index);galleryDialog.showModal();document.body.classList.add('gallery-open');});});
  galleryDialog.querySelector('.gallery-close').addEventListener('click',()=>galleryDialog.close());
  galleryDialog.querySelector('.gallery-prev').addEventListener('click',()=>showPhoto(activeIndex-1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click',()=>showPhoto(activeIndex+1));
  galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(activeIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(activeIndex+1);}});
  galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog){const box=galleryDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)galleryDialog.close();}});
  galleryDialog.addEventListener('close',()=>{document.body.classList.remove('gallery-open');});
}

// A statisztikák csak az első megjelenéskor számolnak fel.
const statisticNumbers = [...document.querySelectorAll('.about-numbers .trust-number, .stats strong')];
if(statisticNumbers.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
  const statisticObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      statisticObserver.unobserve(entry.target);
      const el=entry.target;
      const finalText=el.textContent;
      const target=Number(finalText.replace(/[^0-9]/g,''));
      if(!Number.isFinite(target)||target<=0)return;
      el.setAttribute('aria-label',finalText);
      const visual=document.createElement('span');
      visual.setAttribute('aria-hidden','true');
      visual.textContent='0+';
      el.replaceChildren(visual);
      const started=performance.now();
      function tick(now){
        if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){visual.textContent=finalText;return;}
        const progress=Math.min((now-started)/1400,1);
        const eased=1-Math.pow(1-progress,3);
        visual.textContent=progress===1?finalText:Math.floor(target*eased)+'+';
        if(progress<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  },{threshold:0.6});
  statisticNumbers.forEach(el=>statisticObserver.observe(el));
}

// Egységes, mezőhöz kötött hibaüzenetek minden űrlapon.
document.querySelectorAll('form').forEach((form,formIndex)=>{
  form.noValidate=true;
  const fields=[...form.querySelectorAll('input,textarea,select')].filter(field=>!field.disabled && field.type!=='hidden');
  const errors=new Map();
  fields.forEach((field,index)=>{
    let error=field.name==='privacy_consent'?form.querySelector('.consent-error'):null;
    if(!error){error=document.createElement('p');error.className='field-error';error.hidden=true;field.after(error);}
    error.classList.add('validation-message');
    if(!error.id)error.id=`form-${formIndex+1}-field-${index+1}-error`;
    error.setAttribute('aria-live','polite');
    const describedBy=new Set((field.getAttribute('aria-describedby')||'').split(' ').filter(Boolean));describedBy.add(error.id);field.setAttribute('aria-describedby',[...describedBy].join(' '));
    errors.set(field,error);
    field.addEventListener('invalid',event=>event.preventDefault());
    ['input','change'].forEach(eventName=>field.addEventListener(eventName,()=>{if(!error.hidden)showError(field);}));
  });
  function messageFor(field){
    if(field.name==='privacy_consent'&&!field.checked)return 'Az üzenet elküldéséhez kérjük, jelöld be, hogy elolvastad és elfogadod az adatvédelmi irányelveket.';
    if(field.required && (field.type==='checkbox'?!field.checked:!field.value.trim())){
      if(field.type==='email')return 'Kérjük, add meg az e-mail-címedet, hogy válaszolni tudjunk.';
      if(field.tagName==='TEXTAREA')return 'Kérjük, írd meg, miben segíthetünk.';
      if(field.name==='name')return 'Kérjük, add meg a teljes nevedet.';
      return 'Kérjük, töltsd ki ezt a mezőt.';
    }
    if(field.validity.typeMismatch && field.type==='email')return 'Kérjük, adj meg egy érvényes e-mail-címet, például: nev@pelda.hu.';
    if(field.validity.tooShort)return `Kérjük, legalább ${field.minLength} karaktert írj ebbe a mezőbe.`;
    if(field.validity.patternMismatch)return 'Kérjük, ellenőrizd a mezőben megadott adat formátumát.';
    if(!field.validity.valid)return 'Kérjük, ellenőrizd a mezőben megadott adatot.';
    return '';
  }
  function showError(field){const message=messageFor(field);const error=errors.get(field);error.textContent=message;error.hidden=!message;if(message)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');return !!message;}
  form.addEventListener('submit',event=>{
    const invalid=fields.filter(field=>showError(field));
    if(invalid.length){event.preventDefault();event.stopImmediatePropagation();const status=form.querySelector('.form-status');if(status)status.textContent='';invalid[0].focus();invalid[0].scrollIntoView({block:'nearest',behavior:'auto'});}
  },true);
});

// A kisokos űrlapja kipróbálható, valódi feliratkozás nélkül.
document.querySelectorAll('.newsletter form').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();form.querySelector('.form-status').textContent='A feliratkozás még nincs bekötve; az adataidat nem továbbítottuk, és a kisokos letöltése még nem elérhető.';}));

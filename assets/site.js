const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menü';}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Bezárás':'Menü';});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menuButton.focus();}});
document.querySelectorAll('#contact-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.querySelector('.form-status').textContent='Az űrlap még nincs bekötve, az üzenet nem lett elküldve.';}));

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
const statisticNumbers = [...document.querySelectorAll('.about-numbers .trust-number')];
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

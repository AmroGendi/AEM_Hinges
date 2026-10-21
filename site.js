(function(){
 const groups=window.PRODUCT_GROUPS||[], catalog=document.getElementById('productCatalog'), search=document.getElementById('productSearch'), filters=document.getElementById('filterRow'), count=document.getElementById('resultCount');
 let active='all', lang=(function(){try{return sessionStorage.getItem('amh-lang')==='en'?'en':'ar'}catch(e){return 'ar'}})();
 {const _h=(location.hash||'').replace('#','');if(groups.some(g=>g.key===_h))active=_h;}
 window.addEventListener('hashchange',()=>{const h=(location.hash||'').replace('#','');if(groups.some(g=>g.key===h)){active=h;renderFilters();renderCatalog()}});
 const translations={'كتالوج أبناء أحمد منصور':'Ahmed Mansour Sons Catalog','اقرأ قصتنا　←':'Read Our Story　→','صفحة التواصل　←':'Contact Page　→','⌖　ميت غمر، الدقهلية　↗':'⌖　Mit Ghamr, Dakahlia　↗',
 'الرئيسية':'Home','المنتجات':'Products','من نحن':'About Us','تواصل معنا':'Contact','اتصل بنا　↗':'Call Us　↗','أبناء أحمد منصور · ميت غمر، الدقهلية':'Ahmed Mansour Sons · Mit Ghamr, Dakahlia','أبناء أحمد منصور':'Ahmed Mansour Sons','Ahmed Mansour Sons · Hardware Accessories':'Hardware Accessories Manufacturer','أبناء أحمد منصور · Ahmed Mansour Sons':'Ahmed Mansour Sons','اكتشف مجموعة المفصلات وإكسسوارات الأثاث ومستلزمات التثبيت في كتالوج منظم، بصور واضحة وأسماء ومقاسات تساعدك في الوصول للصنف المطلوب.':'Explore our hinges, furniture accessories and fixing products in an organized catalog with clear images, names and sizes.','تصفح كل المنتجات　←':'Browse All Products　→','اتصل للاستفسار':'Call for Inquiries','أنواع متنوعة':'Wide Product Range','مفصلات وإكسسوارات للأثاث':'Hinges and furniture accessories','صور المنتجات الفعلية':'Actual Product Photos','كل صنف مرتبط بصورته المخصصة':'Each item is matched with its own photo','كتالوج واضح':'Easy-to-Browse Catalog','ابحث بالاسم أو تصفح حسب القسم':'Search by name or browse by category','تصفح حسب الفئة':'Browse by Category','تصفح كل المنتجات':'Browse All Products','من أين تحب أن تبدأ؟':'تصفح كل المنتجات','انتقل مباشرة إلى مجموعة المنتجات التي تبحث عنها.':'Go directly to the product category you need.','كل المنتجات في صفحة مستقلة　←':'Browse All Products　→','المفصلات':'Hinges','أرو، بحلية، سكينة وبؤجة':'Arrow, H, Knife and Butt Hinges','استكشف المفصلات　←':'Explore Hinges　→','الترابيس':'Barrel Bolts','مقاسات مختلفة وترباس بسلسلة':'Different sizes and a chain bolt','استكشف الترابيس　←':'Explore Barrel Bolts　→','عجلات':'Casters','مقاسات وخيارات بفرامل أو بدون':'Different sizes with or without brakes','استكشف العجلات　←':'Explore Casters　→','كتالوج المنتجات':'Product Catalog','تصفح كل المنتجات':'Browse All Products','جميع المنتجات':'All Products','جميع الحقوق محفوظة © 2026':'All rights reserved © 2026','جميع الحقوق محفوظة © 2026 أبناء أحمد منصور':'All rights reserved © 2026','من نحن':'About Us','نعرض مجموعة من المفصلات وإكسسوارات الأثاث ومستلزمات التثبيت، مع تنظيم المنتجات حسب الفئة والمقاس لتسهيل الوصول إلى الصنف المطلوب.':'We offer hinges, furniture accessories and fixing products, organized by category and size for easy browsing.','افتح صفحة المنتجات　←':'View Product Catalog　→','تبحث عن صنف محدد؟':'Looking for a Specific Item?','اتصل بنا للاستفسار عن المنتج والمقاس والتوافر.':'Contact us to ask about products, sizes and availability.','جميع الحقوق محفوظة © 2026':'All rights reserved © 2026','جميع الحقوق محفوظة © 2026 أبناء أحمد منصور':'All rights reserved © 2026','ميت غمر، الدقهلية':'Mit Ghamr, Dakahlia','كل الأقسام':'All Categories','منتج':'products','لا توجد نتائج مطابقة. جرّب اسمًا آخر بالإنجليزية.':'No matching results. Try another product name.','صورة المنتج غير متاحة':'Product image unavailable','هل تحتاج إلى مساعدة في اختيار الصنف؟':'Need Help Choosing a Product?','تواصل معنا للاستفسار عن المقاس والتوافر.':'Contact us for size and availability information.','← العودة للرئيسية':'← Back to Home','المنتجات بالصور والمقاسات':'Products with Photos and Sizes','تصفح الأصناف حسب القسم أو ابحث بالاسم الإنجليزي. اضغط على أي صورة لعرضها بحجم أكبر.':'Browse by category or search product names. Click any image to view it larger.','كل الأصناف':'All Items','الموقع مخصص للعرض فقط؛ للاستفسار عن الأسعار والتوافر اتصل بنا.':'Display catalog only. Contact us for prices and availability.'};
 function localizeDigits(){
  const toAr='٠١٢٣٤٥٦٧٨٩', toEn='0123456789';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;return p&&['SCRIPT','STYLE'].includes(p.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  let node;while(node=walker.nextNode()){node.nodeValue=node.nodeValue.replace(/[٠-٩]/g,d=>toEn['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]).replace(/[0-9]/g,d=>lang==='ar'?toAr[Number(d)]:d)}
 }
 function applyLanguage(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.body.classList.toggle('english',lang==='en');
 document.querySelectorAll('#langToggle').forEach(b=>b.textContent=lang==='ar'?'English':'العربية');
 document.querySelectorAll('.brand strong,.brand small,.navlinks a,#mobileNav a,.nav-cta,.eyebrow,.hero h1,.hero p,.hero-actions a,.hero-footnote b,.hero-footnote span,.trust-card strong,.trust-card span,.section-kicker,.section-head h2,.section-head p,.text-link,.feature-copy h3,.feature-copy p,.feature-copy span,.about-copy h2,.about-copy p,.about-copy a,.contact-section h2,.contact-section p,.contact-pill,.footer-inner span').forEach(el=>{if(!el.dataset.arOriginal)el.dataset.arOriginal=el.textContent.trim();const original=el.dataset.arOriginal;el.textContent=lang==='en'?(translations[original]||original):original;});
 {const pt=document.getElementById('pageTitle');if(pt)pt.textContent=lang==='ar'?'أبناء أحمد منصور — مفصلات وإكسسوارات أثاث':'Ahmed Mansour Sons — Hinges and Furniture Accessories';}
 if(search)search.placeholder=lang==='ar'?'ابحث باسم المنتج بالعربية...':'Search product names in English...';
 renderFilters();renderCatalog();localizeDigits();
 }
 function renderFilters(){if(!filters)return;filters.innerHTML='';[['all',lang==='ar'?'كل الأقسام':'All Categories'],...groups.map(g=>[g.key,lang==='ar'?g.ar:g.en])].forEach(([key,label])=>{const b=document.createElement('button');b.type='button';b.className='filter-btn'+(active===key?' active':'');b.textContent=label;b.onclick=()=>{active=key;renderFilters();renderCatalog()};filters.appendChild(b)});}
 function openImage(src,name){const m=document.getElementById('imageModal');document.getElementById('modalImage').src=src;document.getElementById('modalImage').alt=name;document.getElementById('modalCaption').textContent='';m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
 function closeImage(){const m=document.getElementById('imageModal');m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
 function renderCatalog(){if(!catalog)return;const q=(search?.value||'').trim().toLowerCase();catalog.innerHTML='';let total=0;groups.forEach(g=>{if(active!=='all'&&active!==g.key)return;const items=g.items.filter(i=>((lang==='ar'?(i.ar||i.name):i.name)+' '+(lang==='ar'?g.ar:g.en)).toLowerCase().includes(q));if(!items.length)return;total+=items.length;const sec=document.createElement('section');sec.className='group-section';sec.id='group-'+g.key;const h=document.createElement('h3');h.className='group-title';const ar=document.createElement('span');ar.textContent=lang==='ar'?g.ar:g.en;h.append(ar);sec.append(h);const grid=document.createElement('div');grid.className='product-grid';items.forEach(i=>{const card=document.createElement('article');card.className='product-card';const iw=document.createElement('div');iw.className='product-image';iw.tabIndex=0;iw.setAttribute('role','button');iw.setAttribute('aria-label','View larger image: '+i.name);const img=document.createElement('img');img.src=i.image;img.alt=i.name;img.loading='lazy';img.decoding='async';iw.append(img);const enlarge=()=>openImage(i.image,i.name);iw.onclick=enlarge;iw.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enlarge()}};const info=document.createElement('div');info.className='product-info';const name=document.createElement('h4');name.className='product-name';name.textContent=lang==='ar'?(i.ar||i.name):i.name;info.append(name);card.append(iw,info);grid.append(card)});sec.append(grid);catalog.append(sec);if(catalog.children.length%2===0)sec.classList.add('band')});if(count)count.textContent=total+(lang==='ar'?' صنف':' items');if(!total)catalog.innerHTML='<div class="empty-state">'+(lang==='ar'?'لا توجد نتائج مطابقة. جرّب اسمًا آخر.':'No matching results. Try another search.')+'</div>';localizeDigits()}
 if(search)search.addEventListener('input',renderCatalog);document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',()=>{active=a.dataset.jump;renderFilters();renderCatalog()}));const modal=document.getElementById('imageModal');if(modal){document.getElementById('modalClose').onclick=closeImage;modal.onclick=e=>{if(e.target===modal)closeImage()};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImage()})}document.querySelectorAll('#langToggle').forEach(b=>b.onclick=()=>{lang=lang==='ar'?'en':'ar';try{sessionStorage.setItem('amh-lang',lang)}catch(e){}applyLanguage()});applyLanguage();
})();

// Full-screen hero slideshow: fixed copy, changing photo every 2.5 seconds.
(function(){
 const hero=document.getElementById('homeHero'); if(!hero) return;
 const slides=[...hero.querySelectorAll('.hero-slide')];
 const dots=[...hero.querySelectorAll('.hero-dot')];
 const caps=[...hero.querySelectorAll('.hero-caption')];
 let current=0, timer;
 function showSlide(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('active',i===current));caps.forEach((c,i)=>c.classList.toggle('active',i===current));dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-pressed',i===current?'true':'false')});}
 function start(){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),5000)}
 dots.forEach((dot)=>dot.addEventListener('click',()=>{showSlide(Number(dot.dataset.slide));start()}));
 hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',start);
 showSlide(0);start();
})();


// Light / dark theme toggle (remembered between pages; default is always light)
(function(){
 const root=document.documentElement, btn=document.getElementById('themeToggle'), meta=document.querySelector('meta[name="theme-color"]');
 let timer;
 function apply(dark,animate){
  if(animate){root.classList.add('theme-anim');clearTimeout(timer);timer=setTimeout(()=>root.classList.remove('theme-anim'),800)}
  if(dark)root.setAttribute('data-theme','dark');else root.removeAttribute('data-theme');
  if(btn)btn.setAttribute('aria-checked',dark?'true':'false');
  if(meta)meta.setAttribute('content',dark?'#0d1620':'#102b43');
  try{localStorage.setItem('amh-theme',dark?'dark':'light')}catch(e){}
 }
 apply(root.getAttribute('data-theme')==='dark',false);
 if(btn)btn.addEventListener('click',()=>apply(root.getAttribute('data-theme')!=='dark',true));
})();


// Back-to-top button: appears once the visitor passes the middle of the page
(function(){
 const b=document.createElement('button');b.type='button';b.className='to-top';
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6M6 11.5l6-6 6 6"/></svg>';
 const label=()=>{const t=document.documentElement.lang==='en'?'Back to top':'العودة للأعلى';b.setAttribute('aria-label',t);b.title=t};
 label();new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 document.body.appendChild(b);
 let busy=false;
 const update=()=>{busy=false;const max=document.documentElement.scrollHeight-window.innerHeight;b.classList.toggle('show',max>0&&window.scrollY>max/2)};
 window.addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(update)}},{passive:true});
 window.addEventListener('resize',update);
 if('ResizeObserver' in window)new ResizeObserver(update).observe(document.body);
 b.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 update();
})();


// Page title follows the language; contact map follows the language
(function(){
 const root=document.documentElement,T=window.PAGE_TITLES,f=document.getElementById('mapFrame');
 const sync=()=>{const l=root.lang==='en'?'en':'ar';
  if(T)document.title=T[l];
  if(f){const u=f.dataset.src.replace('{lang}',l);if(f.getAttribute('src')!==u)f.setAttribute('src',u)}};
 sync();new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['lang']});
})();


// Mobile menu: burger -> X, dropdown list, scrim
(function(){
 const bar=document.querySelector('.topbar'),btn=document.getElementById('menuToggle'),nav=document.getElementById('mobileNav');
 if(!bar||!btn||!nav)return;
 const scrim=document.createElement('div');scrim.className='menu-scrim';document.body.appendChild(scrim);
 const lbl=open=>document.documentElement.lang==='en'?(open?'Close menu':'Open menu'):(open?'إغلاق القائمة':'فتح القائمة');
 function set(open){
  bar.classList.toggle('menu-open',open);document.body.classList.toggle('menu-lock',open);
  btn.setAttribute('aria-expanded',open?'true':'false');btn.setAttribute('aria-label',lbl(open));
  nav.setAttribute('aria-hidden',open?'false':'true');nav.querySelectorAll('a').forEach(a=>{a.tabIndex=open?0:-1});
 }
 btn.addEventListener('click',()=>set(!bar.classList.contains('menu-open')));
 scrim.addEventListener('click',()=>set(false));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
 window.matchMedia('(min-width:1021px)').addEventListener('change',e=>{if(e.matches)set(false)});
 new MutationObserver(()=>set(bar.classList.contains('menu-open'))).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 set(false);
})();

// Card carousel hero: active card + peeking neighbours, drag with momentum, motion blur,
// background colour follows the active photo, stretching cursor ring
(function(){
 const hero=document.getElementById('crHero');if(!hero)return;
 const root=document.documentElement,stage=hero.querySelector('.cr-stage'),cards=[...hero.querySelectorAll('.cr-card')],N=cards.length;
 const segs=[...hero.querySelectorAll('.pc-seg')],cur=hero.querySelector('.pc-cur'),ring=hero.querySelector('.cr-ring');
 const BG=['#5b2c3a','#6b4a2a','#245f73','#8a3a2c','#6b4420'];
 const AUTO=5500,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 hero.style.setProperty('--pc-dur',AUTO+'ms');if(reduce)hero.classList.add('no-auto');
 const mod=(a,n)=>((a%n)+n)%n,dig=s=>root.lang==='en'?s:s.replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
 let pos=0,target=0,vel=0,raf=0,shown=0,timer=0,drag=null,press=null,hover=false,focused=false,suppress=false;
 let rtl=root.dir==='rtl',SW=1200,Cw=470,Ch=440,gap=22,off=20,X=[],SC=[];
 const sc=k=>Math.max(.6,1-.14*Math.abs(k));

 function metrics(){
  SW=stage.clientWidth||1200;rtl=root.dir==='rtl';
  if(SW<700){ // small screens: square cards, a sliver of both neighbours
   gap=10;const s=Math.max(18,Math.round(SW*.06));Cw=Math.round(SW-2*(s+gap));Ch=Cw;
  }else{      // wide screens: landscape cards (16:9) centred, a small part of each neighbour visible
   gap=22;const sliver=Math.max(56,Math.min(110,SW*.07));
   const hh=(document.querySelector('.topbar')||{offsetHeight:82}).offsetHeight,th=(hero.querySelector('.cr-top')||{offsetHeight:90}).offsetHeight+16,availH=window.innerHeight-hh-th-22-40-24;
   Ch=Math.round(Math.min((SW-2*(sliver+gap))/1.78,Math.max(availH,380),760));Cw=Math.round(Ch*1.78);
  }
  off=SW/2-Cw/2;
  hero.style.setProperty('--cw',Cw+'px');hero.style.setProperty('--ch',Ch+'px');
  {const hb=hero.getBoundingClientRect().bottom,st=stage.getBoundingClientRect().top;hero.style.setProperty('--nbot',Math.max(16,Math.round(hb-(st+20+Ch)+20))+'px')}
  X=[];SC=[];const w=k=>Cw*sc(k);
  for(let k=-3;k<=3;k++){SC[k+3]=sc(k)}
  X[3]=SW/2;
  for(let k=1;k<=3;k++)X[3+k]=X[3+k-1]+w(k-1)/2+gap+w(k)/2;
  for(let k=-1;k>=-3;k--)X[3+k]=X[3+k+1]-w(k+1)/2-gap-w(k)/2;
 }
 function layout(){
  const blur=Math.min(6,Math.abs(drag?drag.v:vel)*110);
  for(let i=0;i<N;i++){
   const rel=mod(i-pos+N/2,N)-N/2,k=Math.floor(rel),t=rel-k;
   const x0=X[k+3],x1=X[k+4],s0=SC[k+3],s1=SC[k+4];
   let x=x0+(x1-x0)*t;const s=s0+(s1-s0)*t;if(rtl)x=SW-x;
   const a=Math.abs(rel),el=cards[i];
   el.style.transform='translate3d('+(x-Cw/2).toFixed(1)+'px,0,0) scale('+s.toFixed(4)+')';
   el.style.opacity=a<=2?1:Math.max(0,1-(a-2)*2);
   el.style.zIndex=String(100-Math.round(a*10));
   el.style.filter=blur>.35?'blur('+blur.toFixed(2)+'px)':'none';
   el.style.visibility=a>2.5?'hidden':'visible';
  }
  const moving=!!drag||Math.abs(vel)>.012;ring&&ring.classList.toggle('stretch',moving);
 }
 function tick(){
  if(!drag){const d=target-pos;vel=(vel+d*.07)*.82;pos+=vel;
   if(Math.abs(d)<.0008&&Math.abs(vel)<.0008){pos=target;vel=0;raf=0;layout();return}}
  layout();raf=requestAnimationFrame(tick);
 }
 const kick=()=>{if(!raf)raf=requestAnimationFrame(tick)};

 function progress(idx){
  segs.forEach((g,i)=>{g.classList.remove('on');g.classList.toggle('done',i<idx);g.setAttribute('aria-current',i===idx?'true':'false')});
  void hero.offsetWidth;segs[idx].classList.add('on');
 }
 function show(idx){
  if(idx===shown)return;shown=idx;
  hero.style.setProperty('--cr-bg',BG[idx%BG.length]);
  cards.forEach((c,i)=>{const l=c.querySelector('.cr-more');if(l)l.tabIndex=i===idx?0:-1;c.setAttribute('aria-hidden',i===idx?'false':'true')});
  progress(idx);if(cur)cur.textContent=dig(String(idx+1).padStart(2,'0'));
 }
 function go(t){target=t;show(mod(Math.round(t),N));if(reduce){pos=target;vel=0;layout()}else kick()}
 const step=d=>{go(Math.round(target)+d);schedule()};
 function goTo(i){const b=Math.round(target);let d=mod(i-b,N);if(d>N/2)d-=N;go(b+d);schedule()}
 const paused=()=>hover||focused||document.hidden||!!drag;
 function schedule(){clearTimeout(timer);if(reduce||paused())return;timer=setTimeout(()=>step(1),AUTO)}
 function refresh(){if(paused()){clearTimeout(timer);hero.classList.add('is-paused')}else{hero.classList.remove('is-paused');progress(shown);schedule()}}

 hero.querySelector('.pc-prev').addEventListener('click',()=>step(-1));
 hero.querySelector('.pc-next').addEventListener('click',()=>step(1));
 segs.forEach((g,i)=>g.addEventListener('click',()=>goTo(i)));
 hero.addEventListener('keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;step(((e.key==='ArrowRight')!==rtl)?1:-1);e.preventDefault()});
 hero.addEventListener('mouseenter',()=>{hover=true;refresh()});
 hero.addEventListener('mouseleave',()=>{hover=false;refresh()});
 hero.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible')){focused=true;refresh()}});
 hero.addEventListener('focusout',()=>{focused=false;refresh()});
 document.addEventListener('visibilitychange',refresh);

 // drag (starts after a few pixels so links stay clickable)
 stage.addEventListener('pointerdown',e=>{if(e.button>0)return;press={x:e.clientX,id:e.pointerId,start:pos}});
 stage.addEventListener('pointermove',e=>{
  if(!press)return;
  const dx=e.clientX-press.x;
  if(!drag&&Math.abs(dx)>6){drag={x:press.x,start:press.start,lx:e.clientX,lt:performance.now(),v:0,round:Math.round(pos)};stage.setPointerCapture(press.id);stage.classList.add('dragging');vel=0;refresh();kick()}
  if(!drag)return;
  const now=performance.now(),dt=now-drag.lt,s=rtl?-1:1;
  pos=drag.start-s*(e.clientX-drag.x)/(Cw*.9);
  if(dt>0)drag.v=.75*drag.v+.25*((-s*(e.clientX-drag.lx))/(Cw*.9)/dt*16.7);
  drag.lx=e.clientX;drag.lt=now;
  const r=Math.round(pos);if(r!==drag.round){drag.round=r;target=r;show(mod(r,N))}
  layout();
 });
 function release(){
  if(drag){const b=Math.round(drag.start);let t=Math.round(pos+drag.v*12);t=Math.max(b-1,Math.min(b+1,t));drag=null;stage.classList.remove('dragging');suppress=true;setTimeout(()=>{suppress=false},60);go(t);refresh();schedule()}
  press=null;
 }
 stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);
 stage.addEventListener('click',e=>{
  if(suppress){e.preventDefault();e.stopPropagation();return}
  if(e.target.closest('a'))return;
  const c=e.target.closest('.cr-card');if(c){const i=cards.indexOf(c);if(i!==shown)goTo(i)}
 },true);

 // cursor ring
 if(ring&&window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){
  let rx=0,ry=0,tx=0,ty=0,rr=0;
  const loop=()=>{rx+=(tx-rx)*.22;ry+=(ty-ry)*.22;ring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)';
   rr=ring.classList.contains('show')||Math.abs(tx-rx)>.5||Math.abs(ty-ry)>.5?requestAnimationFrame(loop):0};
  const wake=()=>{if(!rr)rr=requestAnimationFrame(loop)};
  stage.addEventListener('pointermove',e=>{if(e.pointerType&&e.pointerType!=='mouse')return;tx=e.clientX;ty=e.clientY;if(!ring.classList.contains('show')){rx=tx;ry=ty}ring.classList.add('show');
   ring.classList.toggle('small',!!e.target.closest('a,button'));wake()});
  stage.addEventListener('pointerleave',()=>ring.classList.remove('show'));
 }

 if('ResizeObserver' in window){const ro=new ResizeObserver(()=>{metrics();layout()});ro.observe(stage);const tp=hero.querySelector('.cr-top');if(tp)ro.observe(tp)}
 window.addEventListener('resize',()=>{metrics();layout()});
 new MutationObserver(()=>{metrics();layout()}).observe(root,{attributes:true,attributeFilter:['dir','lang']});
 metrics();layout();progress(0);cards.forEach((c,i)=>c.setAttribute('aria-hidden',i===0?'false':'true'));schedule();
})();


// Interactive layer: scroll progress, spring reveals, counters, magnetic buttons, cursor spotlight
(function(){
 const root=document.documentElement;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
 const dig=v=>{const t=String(v);return root.lang==='en'?t:t.replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d])};

 // scroll progress + header shadow
 const sp=document.createElement('div');sp.className='scroll-progress';sp.setAttribute('aria-hidden','true');document.body.appendChild(sp);
 const bar=document.querySelector('.topbar');let busy=false;
 const upd=()=>{busy=false;const max=root.scrollHeight-window.innerHeight;sp.style.setProperty('--p',max>0?Math.min(1,window.scrollY/max).toFixed(4):0);if(bar)bar.classList.toggle('scrolled',window.scrollY>8)};
 window.addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(upd)}},{passive:true});upd();

 // counters (years follow the current year)
 const counters=[...document.querySelectorAll('[data-count],[data-years]')];
 counters.forEach(el=>{
  el._to=el.dataset.years?new Date().getFullYear()-parseInt(el.dataset.years,10):parseInt(el.dataset.count,10);
  el._from=parseInt(el.dataset.from||'0',10);el._val=el._to;el.textContent=dig(el._to);
 });
 new MutationObserver(()=>counters.forEach(el=>{el.textContent=dig(Math.round(el._val))})).observe(root,{attributes:true,attributeFilter:['lang']});
 function run(el){
  const t0=performance.now(),D=1700,a=el._from,b=el._to;
  (function f(now){
   const p=Math.min(1,(now-t0)/D),e=1-Math.pow(1-p,4);
   el._val=a+(b-a)*e;el.textContent=dig(Math.round(el._val));
   if(p<1)requestAnimationFrame(f);else{el._val=b;el.textContent=dig(b)}
  })(t0);
 }
 if('IntersectionObserver' in window&&!reduce){
  const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){co.unobserve(e.target);run(e.target)}}),{threshold:.6});
  counters.forEach(el=>{el._val=el._from;el.textContent=dig(el._from);co.observe(el)});
 }

 // spring reveal
 if(!reduce&&'IntersectionObserver' in window){
  const SEL='.trust-card,.feature-card,.section-head,.about-visual,.about-copy,.ab-stat,.ab-cat,.ab-why,.ct-card,.ct-info,.map-frame,.ab-emblem,.ab-text,.ab-cta,.pg-head,.group-title,.product-card,.mq,.contact-section .wrap>*';
  const io=new IntersectionObserver(es=>es.forEach(e=>{
   if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add('fx-in');
   el.addEventListener('animationend',ev=>{if(ev.target===el&&ev.animationName==='fxPop'){el.classList.remove('fx','fx-in');el.style.removeProperty('--fx-d')}});
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  const arm=el=>{
   if(el.dataset.fx)return;el.dataset.fx='1';el.classList.add('fx');
   const i=el.parentElement?[...el.parentElement.children].indexOf(el):0;
   el.style.setProperty('--fx-d',(Math.max(0,i)%6)*85+'ms');io.observe(el);
  };
  document.querySelectorAll(SEL).forEach(arm);
  const cat=document.getElementById('productCatalog');
  if(cat)new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{
   if(n.nodeType!==1)return;if(n.matches(SEL))arm(n);n.querySelectorAll(SEL).forEach(arm);
  }))).observe(cat,{childList:true});
 }

 // magnetic buttons + cursor spotlight (mouse only)
 if(fine&&!reduce){
  const MAG='.btn,.nav-cta,.pc-arrow';
  const SPOT='.product-card,.ab-cat,.ab-why,.ct-card,.ab-stat,.trust-card,.feature-card';
  let last=null,raf=0,pe=null;
  const reset=el=>{el.style.setProperty('--mx','0px');el.style.setProperty('--my','0px')};
  document.addEventListener('pointermove',e=>{
   if(e.pointerType!=='mouse')return;pe=e;
   if(raf)return;
   raf=requestAnimationFrame(()=>{
    raf=0;const ev=pe;
    const m=ev.target.closest&&ev.target.closest(MAG);
    if(last&&last!==m){reset(last);last=null}
    if(m){const r=m.getBoundingClientRect();
     const dx=((ev.clientX-r.left)/r.width-.5)*2,dy=((ev.clientY-r.top)/r.height-.5)*2;
     m.style.setProperty('--mx',(dx*7).toFixed(1)+'px');m.style.setProperty('--my',(dy*6).toFixed(1)+'px');last=m}
    const c=ev.target.closest&&ev.target.closest(SPOT);
    if(c){const r=c.getBoundingClientRect();c.style.setProperty('--gx',(ev.clientX-r.left)+'px');c.style.setProperty('--gy',(ev.clientY-r.top)+'px')}
   });
  },{passive:true});
  document.addEventListener('pointerleave',()=>{if(last){reset(last);last=null}},true);
 }
})();

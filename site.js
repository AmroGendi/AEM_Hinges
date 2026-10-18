(function(){
 const groups=window.PRODUCT_GROUPS||[], catalog=document.getElementById('productCatalog'), search=document.getElementById('productSearch'), filters=document.getElementById('filterRow'), count=document.getElementById('resultCount');
 let active='all', lang=(function(){try{return localStorage.getItem('amh-lang')==='en'?'en':'ar'}catch(e){return 'ar'}})();
 const translations={
 'الرئيسية':'Home','المنتجات':'Products','من نحن':'About Us','تواصل معنا':'Contact','اتصل بنا　↗':'Call Us　↗','أبناء أحمد منصور · ميت غمر، الدقهلية':'Ahmed Mansour Sons · Mit Ghamr, Dakahlia','أبناء أحمد منصور':'Ahmed Mansour Sons','Ahmed Mansour Sons · Hardware Accessories':'Hardware Accessories Manufacturer','أبناء أحمد منصور · Ahmed Mansour Sons':'Ahmed Mansour Sons','اكتشف مجموعة المفصلات وإكسسوارات الأثاث ومستلزمات التثبيت في كتالوج منظم، بصور واضحة وأسماء ومقاسات تساعدك في الوصول للصنف المطلوب.':'Explore our hinges, furniture accessories and fixing products in an organized catalog with clear images, names and sizes.','تصفح كل المنتجات　←':'Browse All Products　→','اتصل للاستفسار':'Call for Inquiries','أنواع متنوعة':'Wide Product Range','مفصلات وإكسسوارات للأثاث':'Hinges and furniture accessories','صور المنتجات الفعلية':'Actual Product Photos','كل صنف مرتبط بصورته المخصصة':'Each item is matched with its own photo','كتالوج واضح':'Easy-to-Browse Catalog','ابحث بالاسم أو تصفح حسب القسم':'Search by name or browse by category','تصفح حسب الفئة':'Browse by Category','تصفح كل المنتجات':'Browse All Products','من أين تحب أن تبدأ؟':'تصفح كل المنتجات','انتقل مباشرة إلى مجموعة المنتجات التي تبحث عنها.':'Go directly to the product category you need.','كل المنتجات في صفحة مستقلة　←':'Browse All Products　→','المفصلات':'Hinges','أرو، بحلية، سكينة وبؤجة':'Arrow, H, Knife and Butt Hinges','استكشف المفصلات　←':'Explore Hinges　→','الترابيس':'Barrel Bolts','مقاسات مختلفة وسلسلة إغلاق':'Different sizes and locking chain','استكشف الترابيس　←':'Explore Barrel Bolts　→','عجلات كاستر':'Caster Wheels','مقاسات وخيارات بفرامل أو بدون':'Different sizes with or without brakes','استكشف العجلات　←':'Explore Wheels　→','كتالوج المنتجات':'Product Catalog','تصفح كل المنتجات':'Browse All Products','جميع المنتجات':'All Products','جميع الحقوق محفوظة © 2026':'All rights reserved © 2026','جميع الحقوق محفوظة © 2026 أبناء أحمد منصور':'All rights reserved © 2026','من نحن':'About Us','نعرض مجموعة من المفصلات وإكسسوارات الأثاث ومستلزمات التثبيت، مع تنظيم المنتجات حسب الفئة والمقاس لتسهيل الوصول إلى الصنف المطلوب.':'We offer hinges, furniture accessories and fixing products, organized by category and size for easy browsing.','افتح صفحة المنتجات　←':'View Product Catalog　→','تبحث عن صنف محدد؟':'Looking for a Specific Item?','اتصل بنا للاستفسار عن المنتج والمقاس والتوافر.':'Contact us to ask about products, sizes and availability.','جميع الحقوق محفوظة © 2026':'All rights reserved © 2026','جميع الحقوق محفوظة © 2026 أبناء أحمد منصور':'All rights reserved © 2026','ميت غمر، الدقهلية':'Mit Ghamr, Dakahlia','كل الأقسام':'All Categories','منتج':'products','لا توجد نتائج مطابقة. جرّب اسمًا آخر بالإنجليزية.':'No matching results. Try another product name.','صورة المنتج غير متاحة':'Product image unavailable','هل تحتاج إلى مساعدة في اختيار الصنف؟':'Need Help Choosing a Product?','تواصل معنا للاستفسار عن المقاس والتوافر.':'Contact us for size and availability information.','← العودة للرئيسية':'← Back to Home','المنتجات بالصور والمقاسات':'Products with Photos and Sizes','تصفح الأصناف حسب القسم أو ابحث بالاسم الإنجليزي. اضغط على أي صورة لعرضها بحجم أكبر.':'Browse by category or search product names. Click any image to view it larger.','كل الأصناف':'All Items','الموقع مخصص للعرض فقط؛ للاستفسار عن الأسعار والتوافر اتصل بنا.':'Display catalog only. Contact us for prices and availability.'};
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
 function renderCatalog(){if(!catalog)return;const q=(search?.value||'').trim().toLowerCase();catalog.innerHTML='';let total=0;groups.forEach(g=>{if(active!=='all'&&active!==g.key)return;const items=g.items.filter(i=>((lang==='ar'?(i.ar||i.name):i.name)+' '+(lang==='ar'?g.ar:g.en)).toLowerCase().includes(q));if(!items.length)return;total+=items.length;const sec=document.createElement('section');sec.className='group-section';sec.id='group-'+g.key;const h=document.createElement('h3');h.className='group-title';const ar=document.createElement('span');ar.textContent=lang==='ar'?g.ar:g.en;h.append(ar);sec.append(h);const grid=document.createElement('div');grid.className='product-grid';items.forEach(i=>{const card=document.createElement('article');card.className='product-card';const iw=document.createElement('div');iw.className='product-image';iw.tabIndex=0;iw.setAttribute('role','button');iw.setAttribute('aria-label','View larger image: '+i.name);const img=document.createElement('img');img.src=i.image;img.alt=i.name;img.loading='lazy';img.decoding='async';iw.append(img);const enlarge=()=>openImage(i.image,i.name);iw.onclick=enlarge;iw.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enlarge()}};const info=document.createElement('div');info.className='product-info';const name=document.createElement('h4');name.className='product-name';name.textContent=lang==='ar'?(i.ar||i.name):i.name;info.append(name);card.append(iw,info);grid.append(card)});sec.append(grid);catalog.append(sec)});if(count)count.textContent=total+(lang==='ar'?' صنف':' items');if(!total)catalog.innerHTML='<div class="empty-state">'+(lang==='ar'?'لا توجد نتائج مطابقة. جرّب اسمًا آخر.':'No matching results. Try another search.')+'</div>';localizeDigits()}
 if(search)search.addEventListener('input',renderCatalog);document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',()=>{active=a.dataset.jump;renderFilters();renderCatalog()}));const modal=document.getElementById('imageModal');if(modal){document.getElementById('modalClose').onclick=closeImage;modal.onclick=e=>{if(e.target===modal)closeImage()};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImage()})}const menu=document.getElementById('menuToggle');if(menu)menu.onclick=()=>{const n=document.getElementById('mobileNav');n.style.display=n.style.display==='flex'?'none':'flex'};document.querySelectorAll('#langToggle').forEach(b=>b.onclick=()=>{lang=lang==='ar'?'en':'ar';try{localStorage.setItem('amh-lang',lang)}catch(e){}applyLanguage()});applyLanguage();
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
 // close the mobile menu after choosing a link
 const nav=document.getElementById('mobileNav');
 if(nav)nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.style.display='none'}));
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

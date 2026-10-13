const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const norm=s=>String(s).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/ي/g,'ی').replace(/ك/g,'ک').toLowerCase();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const referenceKeys=[...new Set(articles.flatMap(a=>a.blocks.flatMap(b=>b.refs||[])))];
const search=document.getElementById('search');
function render(){const q=norm(search.value.trim());const visible=articles.filter(a=>!q||(/^\d+$/.test(q)?a.id===Number(q):norm(a.title+' '+a.blocks.map(b=>(b.label||'')+' '+b.text).join(' ')).includes(q)));
document.getElementById('list').innerHTML=visible.map(a=>'<article class="article" id="item-'+a.id+'"><span class="number" aria-hidden="true">'+fa(a.id)+'</span><div><h2>'+esc(a.title)+'</h2>'+a.blocks.map(b=>'<p'+(b.effect?' class="effect"':'')+'>'+(b.label?'<strong>'+esc(b.label)+' — </strong>':'')+esc(b.text)+(b.refs||[]).map(k=>{const n=referenceKeys.indexOf(k)+1;return '<a class="cite" href="#ref-'+n+'" aria-label="منبع '+fa(n)+': '+esc(sources[k][0])+'">['+fa(n)+']</a>';}).join('')+'</p>').join('')+'</div></article>').join('');
document.getElementById('result-count').textContent=q?fa(visible.length)+' از '+fa(articles.length)+' موضوع':fa(articles.length)+' موضوع';document.getElementById('empty').hidden=visible.length>0;}
document.getElementById('references').innerHTML=referenceKeys.map((k,i)=>'<li id="ref-'+(i+1)+'" data-number="'+fa(i+1)+'"><a href="'+esc(sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+esc(sources[k][0])+' ↗</a></li>').join('');
search.addEventListener('input',render);document.getElementById('print').addEventListener('click',()=>window.print());render();
if(/^#(?:item|ref)-\d+$/.test(location.hash))document.getElementById(location.hash.slice(1))?.scrollIntoView();
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const norm=s=>String(s).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/ي/g,'ی').replace(/ك/g,'ک').toLowerCase();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const search=document.getElementById('search');
function render(){
 const q=norm(search.value.trim());
 const visible=rows.filter(r=>!q||(/^\d+$/.test(q)?r.id===Number(q):norm([r.title,r.description,r.category,r.confirmation].join(' ')).includes(q)));
 document.getElementById('list').innerHTML=visible.map(r=>'<tr id="item-'+r.id+'"><td class="number">'+fa(r.id)+'</td><td class="content"><h2>'+esc(r.title)+'</h2><p>'+r.description.split('\n').map(esc).join('</p><p>')+'</p></td><td class="source"><span class="status '+(r.evidence==='دارد'?'has-source':r.evidence==='ناقص'?'partial':'missing')+'">'+esc(r.evidence)+'</span><div class="source-links">'+r.sources.map(k=>'<a href="'+esc(sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+esc(sources[k][0])+'</a>').join('')+'</div></td><td class="confirmation">'+esc(r.confirmation)+'</td></tr>').join('');
 document.getElementById('result-count').textContent=q?fa(visible.length)+' از '+fa(rows.length)+' مورد':fa(rows.length)+' مورد';
 document.getElementById('empty').hidden=visible.length>0;
}
search.addEventListener('input',render);render();
if(/^#item-\d+$/.test(location.hash))document.getElementById(location.hash.slice(1))?.scrollIntoView();

const receipts = [
  {name:'Costco Wholesale', detail:'Oct 8, 2026 · Home & Kitchen', price:'$284.16', logo:'C', cls:'costco'},
  {name:'Northstar Electronics', detail:'Oct 4, 2026 · Electronics', price:'$1,299.00', logo:'⌂', cls:'northstar'},
  {name:'IKEA', detail:'Sep 28, 2026 · Furniture', price:'$468.72', logo:'I', cls:'ikea'}
];
const warranties = [
  {icon:'⌂', name:'Dyson V15 Detect', detail:'Expires October 22, 2026', days:'12 days left', tone:'red'},
  {icon:'◉', name:'Apple AirPods Pro', detail:'Expires November 8, 2026', days:'29 days left', tone:'amber'},
  {icon:'⌨', name:'MacBook Air 15-inch', detail:'Expires October 10, 2027', days:'1 year left', tone:'green'}
];
const recentList = document.querySelector('#recentList');
const warrantyList = document.querySelector('#warrantyList');
function renderLists(){
 recentList.innerHTML=receipts.map(r=>`<div class="receipt-row"><div class="shop-logo ${r.cls}">${r.logo}</div><div><b>${r.name}</b><p>${r.detail}</p></div><div class="receipt-price"><b>${r.price}</b><small>Receipt saved</small></div></div>`).join('');
 warrantyList.innerHTML=warranties.map(w=>`<div class="warranty-row"><div class="warranty-icon">${w.icon}</div><div><b>${w.name}</b><p>${w.detail}</p></div><span class="warranty-days ${w.tone}">${w.days}</span></div>`).join('');
}
renderLists();
const backdrop=document.querySelector('#modalBackdrop'), uploadStep=document.querySelector('#uploadStep'), scanningStep=document.querySelector('#scanningStep'), resultStep=document.querySelector('#resultStep');
function openModal(){backdrop.classList.add('show'); uploadStep.classList.remove('hidden');scanningStep.classList.add('hidden');resultStep.classList.add('hidden')}
function closeModal(){backdrop.classList.remove('show')}
function scan(){uploadStep.classList.add('hidden');scanningStep.classList.remove('hidden');setTimeout(()=>{scanningStep.classList.add('hidden');resultStep.classList.remove('hidden')},1700)}
document.querySelectorAll('#openUpload,#heroUpload').forEach(b=>b.addEventListener('click',openModal));
document.querySelector('#closeUpload').addEventListener('click',closeModal);document.querySelector('#demoScan').addEventListener('click',scan);document.querySelector('#receiptFile').addEventListener('change',scan);
document.querySelector('#doneUpload').addEventListener('click',()=>{closeModal();document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3200)});
backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal()});
const dashboardView = document.querySelector('#dashboardView');
const workspaceView = document.querySelector('#workspaceView');
const pageTitle = document.querySelector('.greeting h1');

document.head.insertAdjacentHTML('beforeend', `<style>
.workspace-view{animation:fadein .18s ease}.view-heading{display:flex;justify-content:space-between;align-items:flex-end;margin:6px 0 24px}.view-heading h2{font:600 31px Fraunces;margin:0;letter-spacing:-.6px}.view-heading p{color:#827c89;font-size:13px;margin:7px 0 0}.search-input{width:240px;border:1px solid var(--line);border-radius:8px;padding:10px 12px;background:#fff;color:var(--ink);font:12px 'DM Sans';outline-color:#9387c9}.archive-panel{padding:0 22px}.archive-toolbar{display:flex;justify-content:space-between;align-items:center;padding:17px 0;border-bottom:1px solid var(--line)}.archive-toolbar span{font-size:12px;color:#827c89}.filter-button{background:#f5f3f0;border-radius:7px;padding:8px 11px;font-size:12px;color:#595362}.archive-row{display:grid;grid-template-columns:46px 1fr 120px 110px 100px;gap:12px;align-items:center;padding:14px 0;border-bottom:1px solid #efede9}.archive-row:last-child{border:0}.archive-row p{font-size:11px;color:#938e99;margin:3px 0 0}.archive-row b{font-size:13px}.archive-row>span{font-size:12px;color:#6d6674}.tag{font-size:10px!important;background:#f1eef9;border-radius:12px;padding:5px 8px;justify-self:start;color:#625693!important}.view-grid{display:grid;grid-template-columns:1.3fr .8fr;gap:18px}.warranty-board{padding:9px 22px}.warranty-board .warranty-row{padding:16px 0}.coverage-card{background:#4b4079;color:#fff;border-radius:13px;padding:25px;overflow:hidden;position:relative;min-height:220px}.coverage-card:after{content:'✦';position:absolute;right:-8px;bottom:-37px;font-size:160px;color:#ffffff17}.coverage-card h3{font:600 22px Fraunces;margin:8px 0}.coverage-card p{font-size:12px;line-height:1.5;color:#ded9ef;max-width:220px}.coverage-card b{display:block;font:600 38px Fraunces;margin-top:25px}.insight-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.insight-card{padding:23px}.insight-card h3{font:600 19px Fraunces;margin:0 0 12px}.insight-card p{font-size:13px;color:#817b87;line-height:1.5}.bar-chart{height:105px;display:flex;align-items:flex-end;gap:11px;margin-top:22px}.bar-chart i{display:block;flex:1;background:#d6d0ed;border-radius:5px 5px 0 0}.bar-chart i:nth-child(2){height:72%;background:#887bc4}.bar-chart i:nth-child(3){height:48%}.bar-chart i:nth-child(4){height:88%;background:#eea16b}.bar-chart i:nth-child(5){height:61%}@keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@media(max-width:700px){.view-heading{display:block}.search-input{width:100%;margin-top:15px}.view-grid,.insight-cards{grid-template-columns:1fr}.archive-row{grid-template-columns:42px 1fr auto}.archive-row>span:not(.tag),.archive-row .tag{display:none}}
</style>`);

function receiptRows(list = receipts) {
 return list.map(r => `<div class="archive-row"><div class="shop-logo ${r.cls}">${r.logo}</div><div><b>${r.name}</b><p>${r.detail}</p></div><span class="tag">${r.detail.split(' · ')[1]}</span><span>${r.price}</span><button class="filter-button receipt-open">View</button></div>`).join('');
}
function warrantyRows(){return warranties.map(w=>`<div class="warranty-row"><div class="warranty-icon">${w.icon}</div><div><b>${w.name}</b><p>${w.detail}</p></div><span class="warranty-days ${w.tone}">${w.days}</span></div>`).join('')}
function renderView(view){
 document.querySelectorAll('.nav-item[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
 if(view==='dashboard'){dashboardView.classList.remove('hidden');workspaceView.classList.add('hidden');pageTitle.innerHTML='Good morning, Alex <span>✦</span>';return}
 dashboardView.classList.add('hidden');workspaceView.classList.remove('hidden');
 if(view==='receipts'){
   pageTitle.textContent='My receipts';
   workspaceView.innerHTML=`<div class="view-heading"><div><h2>My receipts</h2><p>All your purchase records, safely stored and searchable.</p></div><input class="search-input" id="receiptSearch" placeholder="Search merchant or item"></div><div class="panel archive-panel"><div class="archive-toolbar"><span><b>${receipts.length}</b> receipts in your vault</span><button class="filter-button">⌄ All categories</button></div><div id="archiveRows">${receiptRows()}</div></div>`;
   document.querySelector('#receiptSearch').addEventListener('input', e=>{const term=e.target.value.toLowerCase();document.querySelector('#archiveRows').innerHTML=receiptRows(receipts.filter(r=>(r.name+r.detail).toLowerCase().includes(term)))});
 } else if(view==='warranties'){
   pageTitle.textContent='Warranty watch';
   workspaceView.innerHTML=`<div class="view-heading"><div><h2>Warranty watch</h2><p>Coverage dates and reminders for the things you own.</p></div><button class="add-button" id="addWarranty">＋ Add warranty</button></div><div class="view-grid"><div class="panel warranty-board">${warrantyRows()}</div><aside class="coverage-card"><div class="eyebrow" style="color:#d4ccec">COVERAGE OVERVIEW</div><h3>You’re well covered.</h3><p>Three items have coverage ending in the next 30 days. We’ll notify you before they expire.</p><b>87% <small style="font:12px DM Sans">protected</small></b></aside></div>`;
   document.querySelector('#addWarranty').addEventListener('click',openModal);
 } else {
   pageTitle.textContent='Spending insights';
   workspaceView.innerHTML=`<div class="view-heading"><div><h2>Insights</h2><p>A calmer, clearer view of the things you buy and keep.</p></div></div><div class="insight-cards"><article class="panel insight-card"><h3>$2,052</h3><p>Your October spending across 7 saved receipts.</p><div class="bar-chart"><i style="height:35%"></i><i></i><i></i><i></i><i></i></div></article><article class="panel insight-card"><h3>Electronics</h3><p>Your most valuable category at $3,728 across 4 purchases.</p><div class="stat-icon lilac" style="margin-top:25px">⌁</div></article><article class="panel insight-card"><h3>Protection score</h3><p>18 of your 21 registered items have an active receipt or warranty.</p><div class="stat-icon yellow" style="margin-top:25px">✦</div></article></div>`;
 }
}
document.querySelectorAll('.nav-item[data-view]').forEach(button=>button.addEventListener('click',()=>renderView(button.dataset.view)));
document.querySelectorAll('[data-view-target]').forEach(button=>button.addEventListener('click',()=>renderView(button.dataset.viewTarget)));

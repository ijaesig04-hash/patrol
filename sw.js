// 출동차량 구역 조회 — 항상 최신 화면을 먼저 받고, 끊기면 저장본으로 열기
const C="patrol-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","manifest.json","icon-192.png"]).catch(()=>{})));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; const u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin) return;
  e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{ if(res.ok){const cp=res.clone(); caches.open(C).then(c=>c.put(r.mode==="navigate"?"./":r,cp));} return res; })
    .catch(()=>caches.match(r.mode==="navigate"?"./":r,{ignoreSearch:true})));
});

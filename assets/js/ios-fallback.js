/* iOS(아이폰·아이패드) 대응: 사파리는 알파 WebM 재생 불가 → 캡처 이미지로 대체 (모션 없음) */
(function(){
  var ua=navigator.userAgent;
  var isIOS=/iP(hone|od|ad)/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(!isIOS)return;
  document.documentElement.classList.add('is-ios');
  var art=document.querySelector('.kv .kvart'),bg=document.querySelector('.kv .kvbg');
  if(art){
    var v=art.querySelector('video'),c=art.querySelector('canvas');
    if(v){v.removeAttribute('src');v.load();v.remove();}
    if(c)c.remove();
    var n=new Image();n.className='kvimg';n.src='assets/images/kv/kv_n.webp';n.alt='';n.setAttribute('aria-hidden','true');
    art.insertBefore(n,art.firstChild);
  }
  if(bg){
    var bv=bg.querySelector('video');
    if(bv){
      var b=new Image();b.src='assets/images/kv/kv_bg.webp';b.alt='';
      bv.removeAttribute('src');bv.load();bg.replaceChild(b,bv);
    }
  }
})();

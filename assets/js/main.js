function group(sel,cb){
  const btns=[...document.querySelectorAll(sel)];
  btns.forEach(b=>b.addEventListener('click',()=>{btns.forEach(x=>x.classList.toggle('on',x===b));cb&&cb(b)}));
}
// 시즌 버튼은 서버가 내려준 상태(is-active / is-disabled)를 그대로 표시 — 클릭으로 바꾸지 않음
group('.r-game button');

const NAME={LOL:'리그 오브 레전드',PUBG:'배틀그라운드',VALORANT:'발로란트'};
const SHORT={LOL:'롤',PUBG:'배그',VALORANT:'발로'};
const JOIN={
  pc:g=>[
    [`STEP 1 · 바탕화면 ${g} 버튼 캡처`,`PC방 바탕화면 상단 ${g} 버튼 클릭`,''],
    ['STEP 2 · 랭킹전 메뉴 캡처',`${SHORT[g]} 랭킹전 메뉴에서 랭킹전 참가하기 클릭`,''],
    ['STEP 3 · 게임 아트',`${NAME[g]} 플레이하기`,'']
  ],
  home:g=>[
    ['STEP 1 · CBL 설치 화면 캡처','크래프트박스(CBL) 설치 및 로그인',''],
    ['STEP 2 · 랭킹전 메뉴 캡처',`${SHORT[g]} 랭킹전 메뉴에서 랭킹전 참가하기 클릭`,''],
    ['STEP 3 · 게임 아트',`${NAME[g]} 플레이하기`,'']
  ]
};
let jg='LOL',jm='pc';
window.JOIN_TEXTS=()=>{const o=[];['pc','home'].forEach(m=>['LOL','PUBG','VALORANT'].forEach(g=>JOIN[m](g).forEach(x=>o.push(x[1]))));return o};
function renderJoin(){
  const IMG3={LOL:'assets/images/join/step03_lol.webp',PUBG:'assets/images/join/step03_pubg.webp',VALORANT:'assets/images/join/step03_valorant.webp'};
  // STEP 01 캡처 이미지 (있는 조합만, 나머지는 자리표시)
  const IMG1={pc:{LOL:'assets/images/join/step01_pc_lol.webp',PUBG:'assets/images/join/step01_pc_pubg.webp',VALORANT:'assets/images/join/step01_pc_valorant.webp'},home:{LOL:'assets/images/join/step01_home.webp',PUBG:'assets/images/join/step01_home.webp',VALORANT:'assets/images/join/step01_home.webp'}};
  const img1=(IMG1[jm]||{})[jg];
  document.getElementById('jcards').innerHTML=JOIN[jm](jg).map((st,i)=>
    `<div class="g-card"><div class="g-bar"><span>STEP 0${i+1}</span><span>/ ${jm==='pc'?'PC방':'개인PC'}</span></div>${i===1?`<div class="g-ph g-img g-img-fit"><img src="assets/images/join/step02.webp" alt="랭킹전 메뉴에서 랭킹전 참가하기 화면" style="object-fit:contain"></div>`:i===0&&img1?`<div class="g-ph g-img"><img src="${img1}" alt="${jm==='pc'?'PC방 바탕화면 상단 '+jg+' 버튼 화면':'크래프트박스(CBL) 설치 및 로그인 화면'}"></div>`:i===2?`<div class="g-ph g-img"><img src="${IMG3[jg]}" alt="${NAME[jg]} 게임 이미지"${jg==='LOL'?' style="object-position:right center"':''}></div>`:`<div class="g-ph">${st[0]}</div>`}<h3 class="g-h3">${st[1]}</h3>${st[2]?`<p class="g-sub">${st[2]}</p>`:''}</div>`).join('');
  document.getElementById('jnote').innerHTML=`<span class="jn-li">※ ${SHORT[jg]} 랭킹전 메뉴 접속이 불가한 경우, 매장 사장님께 크래프트박스(피카) 최신 버전 업데이트를 요청해 주세요.</span><span class="jn-li">※ 크래프트박스 실행 시 게임 데이터가 자동 집계됩니다.</span>${jg==='PUBG'?`<span class="jn-li">※ PUBG: 배틀그라운드 랭킹전 연동 상세 방법은 공식 블로그 참고 부탁드립니다. <a class="jn-link" href="https://blog.naver.com/playcraftbox/224105065552" target="_blank" rel="noopener noreferrer">자세히 보기<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.95,21q-2.05,0-3.5-1.45T3,16.05q0-1 0.38-1.9t1.08-1.6L7.8,9.23l1.4,1.4L5.85,13.98Q5.43,14.4 5.21,14.94T5,16.05q0,1.22 0.86,2.09T7.95,19q0.58,0 1.13-0.21t0.97-0.64l3.32-3.35l1.43,1.43l-3.35,3.32q-0.7,0.7-1.6,1.07T7.95,21Zm1.98-5.5L8.5,14.08L14.08,8.5L15.5,9.92L9.93,15.5Zm6.27-0.7l-1.4-1.42l3.35-3.33q0.42-0.42 0.63-0.95T18.98,8q0-1.25-0.85-2.13Q17.28,5 16.03,5q-0.58,0-1.11,0.21q-0.54,0.21-0.96,0.64L10.63,9.2L9.2,7.8l3.35-3.35q0.7-0.7 1.6-1.07T16.05,3q2.05,0 3.49,1.45t1.44,3.52q0,0.98-0.36,1.88t-1.06,1.6L16.2,14.8Z"/></svg></a></span>`:''}`; /* TODO: 공식 블로그 URL로 href 교체 */
  window.fitH3&&fitH3();window.gsecFit&&gsecFit();
}
group('#jgame button',b=>{jg=b.dataset.g;window.slideJoin?slideJoin():renderJoin()});
group('#jmode button',b=>{jm=b.dataset.m;window.slideJoin?slideJoin():renderJoin()});
renderJoin();


const links=[...document.querySelectorAll('.tnav a')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-40% 0px -55% 0px'});
['rank','subev','dbl','ev3','npc','notice'].forEach(id=>io.observe(document.getElementById(id)));
// 페이지 내 #링크(랭킹전 참여 신청 버튼·네비 등): 해시 이동 대신 스크립트로 부드럽게 스크롤 (아티팩트/iframe 환경에서도 동작)
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href');if(id.length<2)return;const t=document.querySelector(id);if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});});
// KV가 보이는 동안 오른쪽 네비 숨김
const tnav=document.querySelector('.tnav');
new IntersectionObserver(([e])=>tnav.classList.toggle('kv-on',e.isIntersecting),{threshold:0.05}).observe(document.querySelector('.kv'));
// 하단 고정 CTA: KV 버튼이 화면에서 사라진 뒤에만 노출
const mcta=document.querySelector('.mcta');
new IntersectionObserver(([e])=>mcta.classList.toggle('show',!e.isIntersecting&&e.boundingClientRect.top<0)).observe(document.querySelector('.kv .btns'));

// KV N: 입체 프리즘 — WebGL. 영상의 하이라이트·외곽(림)에만 분광 빛이 맺힘
(function(){
  const box=document.querySelector('.kvart'),v=box.querySelector('video'),c=box.querySelector('canvas');
  if(!v||!c)return; // iOS: 이미지 대체 시 프리즘 효과 생략
  const gl=c.getContext('webgl',{premultipliedAlpha:true,alpha:true});
  if(!gl)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vs='attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}';
  const fs=`precision mediump float;varying vec2 uv;uniform sampler2D t;uniform vec2 px;uniform float pos,amt;uniform vec2 L;
  vec3 spec(float h){return clamp(.5+.5*cos(6.2832*(h+vec3(0.,.33,.67))),0.,1.);}
  float A(vec2 o){return texture2D(t,uv+o*px).a;}
  void main(){
    vec4 b=texture2D(t,uv);
    if(b.a<.003){gl_FragColor=vec4(0.);return;}
    vec3 c=b.rgb/b.a;
    float lum=dot(c,vec3(.299,.587,.114));
    // 알파 기울기로 표면 법선 근사 → 빛 방향과의 각도로 림/반사 계산
    vec2 g=vec2(A(vec2(6.,0.))-A(vec2(-6.,0.)),A(vec2(0.,6.))-A(vec2(0.,-6.)));
    float rim=clamp(length(g)*1.4,0.,1.);
    vec2 n=length(g)>.001?normalize(-g):vec2(0.);
    float facing=clamp(dot(n,normalize(L))*.5+.5,0.,1.);
    float hi=smoothstep(.5,.95,lum);
    // 대각선으로 지나가는 분광 띠
    float d=(uv.x*.75+uv.y*.65)-pos;
    float band=exp(-d*d/.018);
    vec3 rb=spec(d*2.2+lum*.35+uv.y*.25);
    // 하이라이트에서 색 분리(프리즘) — R/B를 살짝 어긋나게 샘플
    vec2 sh=normalize(L)*px*5.*band*hi;
    float r=texture2D(t,uv+sh).r,bl=texture2D(t,uv-sh).b;
    vec3 split=vec3(r,b.g,bl)/max(b.a,.001)-c;
    vec3 add=rb*band*(hi*.85+rim*facing*.9)*amt + split*.6*amt
            + spec(uv.x*.8-uv.y*.5+pos*.3)*rim*facing*.10;   // 상시 은은한 외곽 무지개
    gl_FragColor=vec4((c+add)*b.a,b.a);
  }`;
  function sh(type,src){const o=gl.createShader(type);gl.shaderSource(o,src);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o}
  let pr;
  try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr)}catch(e){return}
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
  const U=n=>gl.getUniformLocation(pr,n),uPx=U('px'),uPos=U('pos'),uAmt=U('amt'),uL=U('L');
  const cx=0,cy=0;
  const base=getComputedStyle(c).transform==='none'?'':getComputedStyle(c).transform;
  const PERIOD=5200,SWEEP=2200,t0=performance.now();let ok=false;
  let dead=false;
  function frame(now){
    if(dead)return;
    requestAnimationFrame(frame);
    if(v.readyState<2)return;
    const w=v.videoWidth,h=v.videoHeight;
    if(c.width!==w){c.width=w;c.height=h;gl.viewport(0,0,w,h)}
    try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,v)}catch(e){dead=true;box.classList.remove('fx');return}
    let pos=-1,amt=0;
    if(!reduce){const p=((now-t0)%PERIOD)/SWEEP;if(p<1){const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;pos=-.3+2.0*e;amt=.55*Math.sin(Math.PI*p)}}
    gl.uniform2f(uPx,1/w,1/h);gl.uniform1f(uPos,pos);gl.uniform1f(uAmt,amt);gl.uniform2f(uL,-.6-cx*.6,-.8-cy*.6);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!ok){ok=true;box.classList.add('fx')}
  }
  requestAnimationFrame(frame);
})();


// 1~3등 카드: 포인터 위치에 따라 기울기만 (손 떼면 원위치)
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.querySelectorAll('.r-top .holo').forEach(card=>{
    if(matchMedia('(max-width:768px)').matches)return; // 모바일은 기울기 없음
  function move(e){
    if(innerWidth<=768)return;
    const r=card.getBoundingClientRect();
    const px=Math.abs(Math.floor(100/r.width*(e.clientX-r.left))-100),py=Math.abs(Math.floor(100/r.height*(e.clientY-r.top))-100);
    const lp=50+(px-50)/1.5,tp=50+(py-50)/1.5;
    card.classList.add('active');
    const k=.5; // 기울기 세기 (1 = 원본)
    card.style.transform=`rotateX(${((tp-50)/2)*-1*k}deg) rotateY(${((lp-50)/1.5)*.5*k}deg)`;
  }
  function out(){card.classList.remove('active');card.style.transform=''}
  card.addEventListener('pointermove',move);
  card.addEventListener('pointerleave',out);
  card.addEventListener('pointercancel',out);
  card.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')out()});
  });
})();

// .gsec 섹션: 각 블록 높이에 맞춰 그리드 칸 수(span)를 자동 계산 → 가로선이 글자를 지나지 않게
(function(){
  function fit(){
    const rk=document.getElementById('rank'),mob=innerWidth<=768;
    // 모바일: 그리드 칸 맞춤을 쓰지 않고 일정한 간격으로 쌓음 (빈 칸 생기지 않게)
    if(mob){document.querySelectorAll('section.gsec>.wrap>*,#rank>.wrap>*').forEach(el=>{el.style.gridRow='';el.style.gridColumn='';el.style.alignSelf='';el.style.marginTop=''});return}
    if(rk&&!mob)[...rk.querySelector(':scope>.wrap').children].forEach(el=>{el.style.gridRow='';el.style.gridColumn=''});
    const list=[...document.querySelectorAll('section.gsec')];if(rk&&mob)list.push(rk);
    list.forEach(sec=>{
      if(sec.id==='ev3'){[...sec.querySelector(':scope>.wrap').children].forEach(el=>{el.style.gridRow='';el.style.alignSelf='';el.style.marginTop=''});return}
      const wrap=sec.querySelector(':scope>.wrap');
      const col=parseFloat(getComputedStyle(wrap).gridAutoRows);if(!col)return;
      [...wrap.children].forEach(el=>{
        el.style.gridRow='';el.style.alignSelf='';el.style.marginTop='';
        const h=el.offsetHeight;let span=Math.max(1,Math.ceil((h+16)/col));
        // 타이틀 블록이 두 칸 이상이면, 칸 경계선이 제목과 설명 사이 빈 공간을 지나도록 위치 보정
        if(span>1&&el.classList.contains('g-top')){
          const lead=el.querySelector('.g-lead'),title=el.querySelector('.g-title');
          const top=el.getBoundingClientRect().top;
          const tb=title.getBoundingClientRect().bottom-top,lt=lead.getBoundingClientRect().top-top;
          const m=Math.max(0,col-(tb+lt)/2);
          el.style.alignSelf='start';el.style.marginTop=m+'px';
          span=Math.max(1,Math.ceil((m+h+8)/col));
        }
        el.style.gridRow='span '+span;if(sec.id==='rank')el.style.gridColumn='1';
      });
    });
  }
  window.gsecFit=fit;
  fit();addEventListener('load',fit);document.fonts&&document.fonts.ready.then(fit);
  let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(fit,100)});
})();

// KV 타이틀 타이핑 인트로: 한글 자모 단위로 조합되며 타자 치듯 입력 (ㄱ → 그 → 겨 …), 커서는 입력 중엔 고정, 끝나면 깜빡임
(function(){
  const h=document.querySelector('.kv h1');if(!h)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const caret=h.querySelector('.caret');
  const lines=['Npay와 함께하는','CBL: 겨울방학 랭킹전'];
  const CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  // 글자 하나를 타자 순서대로 쪼갠 단계 목록
  function steps(ch){
    const c=ch.charCodeAt(0)-0xAC00;
    if(c<0||c>11171)return [ch];
    const cho=Math.floor(c/588),jung=Math.floor((c%588)/28),jong=c%28;
    const out=[CHO[cho],String.fromCharCode(0xAC00+cho*588+jung*28)];
    if(jong)out.push(ch);
    return out;
  }
  // 윗줄 'Npay와 함께하는'을 다 친 뒤 아랫줄 'CBL: 겨울방학 랭킹전' 입력 (아랫줄은 .l2로 작게)
  const seq=lines.map(l=>{const st=[];let acc='';[...l].forEach(ch=>{steps(ch).forEach(x=>st.push(acc+x));acc+=ch});return st});
  const frames=[];
  seq[0].forEach(x=>frames.push([x,'']));
  seq[1].forEach(x=>frames.push([lines[0],x]));
  h.setAttribute('aria-label',lines.join(' '));
  const two=(a,b)=>a+'<br><span class="l2">'+b+'</span>';
  h.innerHTML=`<span class="ty-ghost" aria-hidden="true">${two(lines[0],lines[1])}</span><span class="ty-live" aria-hidden="true"></span>`;
  const live=h.querySelector('.ty-live');
  const cur2='<span class="caret typing"></span>';
  const START=150,TOTAL=1500,per=(TOTAL-START)/frames.length; // 전체 약 1.5초
  let i=0;
  function render(f){live.innerHTML=f[1]?f[0]+'<br><span class="l2">'+f[1]+cur2+'</span>':f[0]+cur2}
  function tick(){
    if(i>=frames.length){
      h.innerHTML=two(lines[0],lines[1]);if(caret){caret.classList.remove('typing');caret.style.setProperty('--cd','0s');h.querySelector('.l2').appendChild(caret)}
      return;
    }
    render(frames[i]);i++;
    setTimeout(tick,per*(.7+Math.random()*.6));
  }
  render(['','']);setTimeout(tick,START);
})();

// EVENT 01 모핑 도형: 랜덤 별/다각형 사이를 부드럽게 변형 (animejs svg.morphTo 데모 동작을 순수 JS로 구현)
(function(){
  const polys=[...document.querySelectorAll('.rk-morph polygon')];if(!polys.length)return;
  const N=96,C=56,R2=56,rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  // 꼭짓점 n개 별 모양을 N개 점으로 균일 샘플링 (점 개수를 맞춰야 모핑 가능)
  function shape(){
    let total=rnd(4,64);if(total%2)total++;
    const r1=rnd(4,56),v=[];
    for(let i=0;i<total;i++){const r=i%2?r1:R2,a=2*Math.PI*i/total-Math.PI/2;v.push([C+r*Math.cos(a),C+r*Math.sin(a)])}
    const out=[];
    for(let k=0;k<N;k++){const f=k/N*total,i=Math.floor(f),t=f-i,p=v[i],q=v[(i+1)%total];out.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t])}
    return out;
  }
  const ease=t=>t<.5?(1-Math.sqrt(1-4*t*t))/2:(Math.sqrt(1-Math.pow(-2*t+2,2))+1)/2; // inOutCirc
  const str=pts=>pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  polys.forEach((poly,idx)=>{
    let cur=shape();poly.setAttribute('points',str(cur));
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const DUR=1600;
    function next(){
      const to=shape(),from=cur,t0=performance.now()+400+idx*500;
      function step(now){
        const t=Math.min(1,Math.max(0,(now-t0)/DUR)),e=ease(t);
        cur=from.map((p,i)=>[p[0]+(to[i][0]-p[0])*e,p[1]+(to[i][1]-p[1])*e]);
        poly.setAttribute('points',str(cur));
        if(t<1)requestAnimationFrame(step);else{cur=to;next()}
      }
      requestAnimationFrame(step);
    }
    next();
  });
})();

// 그리드 반짝임 (양 사이드 전용): 콘텐츠 영역 바깥에서만, 가로선 위·콘텐츠 경계 교차점에 얇은 빛이 랜덤하게 켜졌다 꺼짐
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  ['join','dbl'].forEach(id=>{
    const sec=document.getElementById(id);if(!sec)return;
    const cv=document.createElement('canvas');cv.className='gridfx';cv.setAttribute('aria-hidden','true');
    sec.insertBefore(cv,sec.firstChild);
    const ctx=cv.getContext('2d');let W,H,col,cl,cr,pts=[],raf;
    const DUR=1400,rnd=(a,b)=>a+Math.random()*(b-a);
    function placeX(p){ // 사이드 여백 안에서 위치 다시 뽑기
      if(p.edge)return;
      p.x=p.side<0?rnd(16,Math.max(17,cl-40)):rnd(Math.min(W-17,cr+40),W-16);
    }
    function layout(){
      const r=sec.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);
      W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      const wr=sec.querySelector(':scope>.wrap'),w=wr.getBoundingClientRect(),pad=parseFloat(getComputedStyle(wr).paddingLeft)||0;
      col=parseFloat(getComputedStyle(wr).gridAutoRows)||200;
      cl=w.left-r.left+pad;cr=w.right-r.left-pad; // 콘텐츠 영역 좌우 끝
      const now=performance.now();pts=[];
      if(cl<60)return; // 사이드 여백이 거의 없는 좁은 화면(모바일)에서는 표시 안 함
      // 세로 그리드선 x 위치 (CSS 그리드와 동일 계산)
      const x0=((W/2-40*col)%col+col)%col,xs=[];for(let x=x0;x<W+1;x+=col)xs.push(x);
      const pt=parseFloat(getComputedStyle(sec).paddingTop)||col/2;
      // 콘텐츠 바깥(양 사이드)과 콘텐츠 경계선 위의 교차점만 사용
      for(let y=pt;y<H+1;y+=col)xs.forEach(x=>{
        if(x<=cl+1)pts.push({x,y,edge:x>=cl-1,side:-1});
        else if(x>=cr-1)pts.push({x,y,edge:x<=cr+1,side:1});
      });
      pts.forEach(p=>{p.start=now+rnd(0,8000)});
    }
    function arm(x,y,dx,dy,L,a){
      const g=ctx.createLinearGradient(x,y,x+dx*L,y+dy*L);
      g.addColorStop(0,`rgba(3,199,90,${a})`);g.addColorStop(1,'rgba(3,199,90,0)');
      ctx.strokeStyle=g;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx*L,y+dy*L);ctx.stroke();
    }
    function frame(now){
      raf=requestAnimationFrame(frame);
      ctx.clearRect(0,0,W,H);ctx.lineWidth=.6;
      let active=0;
      for(const p of pts){
        const t=(now-p.start)/DUR;
        if(t>=1){p.start=now+rnd(4000,12000);continue}
        if(t<=0)continue;
        if(active>=3&&t<.02){p.start=now+rnd(1500,5000);continue} // 동시에 최대 3개
        active++;
        const s=t<.4?1.25*Math.sin(t/.4*Math.PI/2):1.25*Math.cos((t-.4)/.6*Math.PI/2);
        const a=Math.min(1,s)*.28,L=col*.18*s,x=Math.round(p.x)+.5,y=Math.round(p.y)+.5;
        if(p.edge){arm(x,y,p.side,0,L,a);arm(x,y,0,1,L,a);arm(x,y,0,-1,L,a)} // 경계: 바깥쪽 가로 + 경계선 따라 위아래 (콘텐츠 쪽으로는 안 뻗음)
        else{arm(x,y,1,0,L,a);arm(x,y,-1,0,L,a);arm(x,y,0,1,L,a);arm(x,y,0,-1,L,a)} // 교차점 중심 십자
        const g=ctx.createRadialGradient(x,y,0,x,y,4*s);g.addColorStop(0,`rgba(3,199,90,${Math.min(1,s)*.4})`);g.addColorStop(1,'rgba(3,199,90,0)');
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,4*s,0,Math.PI*2);ctx.fill();
      }
    }
    new IntersectionObserver(([e])=>{cancelAnimationFrame(raf);if(e.isIntersecting)raf=requestAnimationFrame(frame)}).observe(sec);
    let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(layout,150)});
    layout();addEventListener('load',layout);
  });
})();

// 모바일 미리보기 (350px 폭)
document.addEventListener('DOMContentLoaded',function(){
  const btn=document.getElementById('mpvBtn'),dlg=document.getElementById('mpv'),fr=document.getElementById('mpvFrame'),cl=document.getElementById('mpvClose');
  if(!btn||!dlg)return;
  if(window.name==='mpv-frame'){btn.remove();dlg.remove();return} // 미리보기 안에서는 버튼 숨김
  const W=350,H=760;
  function size(){fr.width=W;fr.style.height=Math.min(H,innerHeight-140)+'px'}
  function open(){dlg.hidden=false;document.body.style.overflow='hidden';if(!fr.src)fr.src=location.href.split('#')[0];size();cl.focus()}
  function close(){dlg.hidden=true;document.body.style.overflow='';btn.focus()}
  btn.addEventListener('click',open);cl.addEventListener('click',close);
  dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!dlg.hidden)close()});
  addEventListener('resize',()=>{if(!dlg.hidden)size()});
});

// 모핑 도형 스크롤 패럴랙스: 섹션 위치에 따라 도형마다 다른 속도로 위아래 이동
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const items=[['.rk-morph-l',-.35],['.rk-morph-r',.28],['.npc-morph',-.3]]
    .map(([q,k])=>[document.querySelector(q),k]).filter(x=>x[0]);
  if(!items.length)return;
  let tick=false;
  function update(){
    tick=false;const vh=innerHeight;
    items.forEach(([el,k])=>{
      const sec=el.closest('section');const r=sec.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200)return;
      const off=(r.top+r.height/2)-vh/2; // 섹션 중심이 화면 중앙일 때 0
      el.style.transform=`translate3d(0,${(off*k).toFixed(1)}px,0)`;
    });
  }
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',update);update();
})();

// STEP 카드 제목 한 줄 맞춤: 탭을 바꿔도 크기가 변하지 않도록, 나올 수 있는 모든 문구 중 가장 긴 것 기준으로 같은 크기 적용 (PC 최대 17px·최소 13px, MO 15px)
(function(){
  function texts(q){
    if(q==='#join'&&window.JOIN_TEXTS)return JOIN_TEXTS();
    return [...document.querySelectorAll(q+' .g-h3')].map(h=>h.textContent);
  }
  function fitH3(){
    ['#join','#npc'].forEach(q=>{
      const hs=[...document.querySelectorAll(q+' .g-h3')];if(!hs.length)return;
      const base=innerWidth<=768?15:17,h0=hs[0],card=h0.parentElement,cs=getComputedStyle(card);
      const w=card.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
      const m=h0.cloneNode();m.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font-size:'+base+'px';card.appendChild(m);
      let mx=0;texts(q).forEach(t=>{m.textContent=t;mx=Math.max(mx,m.scrollWidth)});m.remove();
      const fs=Math.min(base,Math.floor(base*w/mx*10)/10);
      hs.forEach(h=>{h.style.fontSize=fs+'px';h.style.whiteSpace='nowrap'});
    });
  }
  window.fitH3=fitH3;fitH3();addEventListener('load',fitH3);document.fonts&&document.fonts.ready.then(fitH3);
  let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(fitH3,100)});
})();

// 참여 방법 STEP 카드 슬라이드 효과 (jQuery)
// - 섹션이 처음 화면에 들어올 때: 카드가 오른쪽에서 왼쪽으로 차례로 슬라이드 인
// - 탭(참여 방식/게임) 변경 시: 기존 카드는 왼쪽으로 빠지고, 새 카드가 오른쪽에서 차례로 들어옴
(function($){
  if(!$||matchMedia('(prefers-reduced-motion: reduce)').matches||innerWidth<=768)return; // 모바일 제외
  const $wrap=$('#jcards').addClass('sl'),STAGGER=120,OUT=280;
  let shown=false,busy=null;
  function slideIn(){
    $wrap.children('.g-card').each(function(i){const $c=$(this);setTimeout(()=>$c.addClass('in'),i*STAGGER)});
  }
  window.slideJoin=function(){
    clearTimeout(busy);
    if(!shown){renderJoin();return}
    $wrap.children('.g-card').each(function(i){const $c=$(this);setTimeout(()=>$c.removeClass('in').addClass('out'),i*60)});
    busy=setTimeout(()=>{renderJoin();requestAnimationFrame(()=>requestAnimationFrame(slideIn))},OUT+120);
  };
  function check(){
    if(shown)return;
    const r=$wrap[0].getBoundingClientRect();
    if(r.top<innerHeight*.85&&r.bottom>0){shown=true;slideIn();$(window).off('scroll.join resize.join')}
  }
  $(window).on('scroll.join resize.join',check);check();
})(window.jQuery);

// 스크롤 등장 슬라이드: 각 섹션의 타이틀·설명·버튼·카드가 화면에 들어올 때 순서대로 슬라이드 인 (유의사항 제외)
(function($){
  if(!$||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)||innerWidth<=768)return; // 모바일 제외
  const TEXT='.r-head .eyebrow,.r-title,.r-lead,.r-season button,.r-game button,.r-rest,.r-note,.discord,.g-top>*,.g-tabs button,.g-note,.g-more';
  const CARD='.r-top>li,.g-cards3:not(#jcards)>.g-card,.g-wide';
  const $items=$('#rank,#join,#dbl,#ev3,#npc').find(TEXT+','+CARD);
  // 원래 투명도(EVENT 0X 등 흐린 글자)를 기억해 등장 시 그 값까지만 → 진하게 번쩍였다 흐려지는 현상 방지
  $items.each(function(){const o=getComputedStyle(this).opacity;if(o!=='1')this.style.setProperty('--rv-o',o)});
  $items.addClass('rv');$items.filter(CARD).addClass('rv-x');
  const STAGGER=90;let queue=[],timer=null;
  function flush(){
    queue.sort((a,b)=>a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1);
    queue.forEach((el,i)=>{setTimeout(()=>{
      $(el).addClass('in');
      setTimeout(()=>$(el).removeClass('rv rv-x in'),900); // 끝나면 클래스 제거 → 원래 호버·기울기 효과 복구
    },i*STAGGER)});
    queue=[];timer=null;
  }
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);queue.push(e.target)}});
    if(queue.length&&!timer)timer=setTimeout(flush,30);
  },{rootMargin:'0px 0px -12% 0px'});
  $items.each(function(){io.observe(this)});
})(window.jQuery);

// STEP 이미지 미리 불러오기 (탭 전환 시 바로 보이게)
['step01_pc_lol','step01_pc_pubg','step01_pc_valorant','step01_home','step02','step03_lol','step03_pubg','step03_valorant'].forEach(n=>{const i=new Image();i.src='assets/images/join/'+n+'.webp'});

// 참여 방법 ~ 더블 미션 눈 효과: 두 섹션을 하나의 영역으로 보고 이어서 내림 (섹션마다 캔버스를 두고 같은 눈을 나눠 그려서 콘텐츠 뒤에 깔림)
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const secs=['join','dbl','ev3'].map(id=>document.getElementById(id)).filter(Boolean);if(!secs.length)return;
  const MAX_A=.32,DENSITY=9000,CAP=380,MV=20; // 최대 오퍼시티 / 눈 1개당 면적(px²) / 최대 개수
  const views=secs.map(sec=>{
    const cv=document.createElement('canvas');cv.className='snowfx';cv.setAttribute('aria-hidden','true');
    sec.insertBefore(cv,sec.firstChild);
    return {sec,cv,ctx:cv.getContext('2d'),top:0,h:0,vis:false};
  });
  let W=0,H=0,flakes=[],raf=0;
  // 눈송이 하나를 미리 그려 두고 재사용 (매 프레임 그라데이션 생성 방지)
  const spr=document.createElement('canvas');spr.width=spr.height=64;
  (function(){const s=spr.getContext('2d'),g=s.createRadialGradient(32,32,0,32,32,32);
    g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');
    s.fillStyle=g;s.fillRect(0,0,64,64)})();
  function make(f){
    f.x=Math.random()*W;f.y=Math.random()*(H+50);
    f.t=Math.random()*Math.PI*2;
    f.sz=(100/(10+Math.random()*100))*1.3;
    f.sp=Math.max(1,Math.pow(f.sz*.8,2)*.15)*.6;
    f.a=MAX_A*(.4+Math.random()*.6);
    return f;
  }
  function layout(){
    const dpr=Math.min(2,devicePixelRatio||1),y0=views[0].sec.getBoundingClientRect().top;
    W=0;H=0;
    views.forEach(v=>{
      const r=v.sec.getBoundingClientRect();
      v.top=r.top-y0;v.h=r.height;W=Math.max(W,r.width);H=Math.max(H,v.top+r.height);
      v.cv.width=r.width*dpr;v.cv.height=r.height*dpr;v.ctx.setTransform(dpr,0,0,dpr,0,0);
    });
    const n=Math.min(CAP,Math.round(W*H/DENSITY));
    while(flakes.length<n)flakes.push(make({}));
    flakes.length=n;
  }
  function frame(){
    raf=requestAnimationFrame(frame);
    for(const f of flakes){
      f.t+=.05;if(f.t>=Math.PI*2)f.t=0;
      f.y+=f.sp;f.x+=Math.sin(f.t)*(f.sz*.3);
      if(f.y>H+50){f.y=-10-Math.random()*MV;f.x=Math.random()*W}
      if(f.x>W+MV)f.x=-MV;if(f.x<-MV)f.x=W+MV;
    }
    views.forEach(v=>{
      if(!v.vis)return;
      const c=v.ctx;c.clearRect(0,0,W,v.h);
      for(const f of flakes){
        const y=f.y-v.top;if(y<-f.sz||y>v.h+f.sz)continue;
        c.globalAlpha=f.a;c.drawImage(spr,f.x-f.sz,y-f.sz,f.sz*2,f.sz*2);
      }
      c.globalAlpha=1;
    });
  }
  layout();
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{const v=views.find(v=>v.sec===e.target);if(v)v.vis=e.isIntersecting});
    const any=views.some(v=>v.vis);
    if(any&&!raf)raf=requestAnimationFrame(frame);
    if(!any&&raf){cancelAnimationFrame(raf);raf=0}
  });
  const ro=new ResizeObserver(layout);
  views.forEach(v=>{io.observe(v.sec);ro.observe(v.sec)});
})();

// Npay 커넥트 STEP 슬라이드 (좌우 버튼 + 스와이프)
(function(){
  const sl=document.getElementById('npcSl');if(!sl)return;
  const vp=sl.querySelector('.npc-vp'),track=sl.querySelector('.npc-track'),cards=[...track.children];
  const prev=sl.querySelector('.prev'),next=sl.querySelector('.next');
  let idx=0;
  function step(){const g=parseFloat(getComputedStyle(track).columnGap)||0;return cards[0].getBoundingClientRect().width+g}
  function maxIdx(){return Math.max(0,cards.length-Math.round((vp.clientWidth+(parseFloat(getComputedStyle(track).columnGap)||0))/step()))}
  function go(i){
    idx=Math.max(0,Math.min(maxIdx(),i));
    track.style.transform=`translateX(${-idx*step()}px)`;
    prev.disabled=idx===0;next.disabled=idx>=maxIdx();
  }
  prev.addEventListener('click',()=>go(idx-1));
  next.addEventListener('click',()=>go(idx+1));
  let sx=null,sy=0;
  vp.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY});
  vp.addEventListener('pointerup',e=>{
    if(sx===null)return;const dx=e.clientX-sx,dy=e.clientY-sy;sx=null;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))go(idx+(dx<0?1:-1));
  });
  vp.addEventListener('pointercancel',()=>{sx=null});
  new ResizeObserver(()=>go(idx)).observe(vp);
  go(0);
})();



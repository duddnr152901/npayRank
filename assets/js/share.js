// 상단 안내 바(PC방 토글) + 공유하기 모달 + 모바일 플로팅(공유/TOP) — 스탈존 이벤트 모듈 이식
(function () {
// ── PC방 토글 이미지 상태 (백엔드 연동용) ──
function setPcRoomToggleState(isPcRoom) {
  var toggleBtn = document.getElementById('pcRoomToggle');
  if (!toggleBtn) { return; }
  var toggleImg = toggleBtn.querySelector('.toggle-btn__img');
  if (!toggleImg) { return; }
  var isOn = Boolean(isPcRoom);
  toggleBtn.dataset.state = isOn ? 'on' : 'off';
  toggleImg.src = isOn ? 'assets/images/header/pcroom_on.webp' : 'assets/images/header/pcroom_off.webp';
  toggleImg.alt = isOn ? 'PC방 모드 ON' : 'PC방 모드 OFF';
}

window.setPcRoomToggleState = setPcRoomToggleState; // 백엔드에서 전역 호출용

// 기본값 OFF (백엔드에서 접속 상태 확인 후 setPcRoomToggleState 호출)
setPcRoomToggleState(false);

// ── 공유하기: 설정 / 토스트 / 모달 / SNS 핸들러 ──
// [BACKEND] 배포 시 아래 값만 실제 이벤트 값으로 교체하세요.
var SHARE_CONFIG = {
  title: '크래프트박스 x Npay 겨울방학 랭킹전 참가하기',
  description: 'LOL · PUBG · VALORANT 랭킹전 참여하고 마일리지 & 그래픽카드 받자! 2026.12.07 – 2027.02.28',
  kakaoKey: 'd1c0c39f4dbac0062bf36527a3021357',
  ogImage: 'https://ics.mediaweb.co.kr/_event/20261207_npayranking/assets/Thumbnail_1200x630.jpg'
};

var copyToast = document.getElementById('copyToast');
var copyToastTimer = null;
var DEFAULT_TOAST_MSG = '클립보드에 복사되었습니다.';
function showCopyToast(msg) {
  if (!copyToast) { return; }
  copyToast.textContent = msg || DEFAULT_TOAST_MSG;
  copyToast.classList.add('is-visible');
  if (copyToastTimer) { clearTimeout(copyToastTimer); }
  copyToastTimer = setTimeout(function () {
    copyToast.classList.remove('is-visible');
  }, 2200);
}
function fallbackCopyText(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  var copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (e) { }
  document.body.removeChild(textarea);
  return copied;
}
function copyUrlWithToast(url, toastMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(function () {
      showCopyToast(toastMsg);
    }).catch(function () {
      if (fallbackCopyText(url)) { showCopyToast(toastMsg); }
    });
  } else if (fallbackCopyText(url)) {
    showCopyToast(toastMsg);
  }
}

// Kakao SDK 초기화
(function initKakao() {
  if (!window.Kakao || !SHARE_CONFIG.kakaoKey) { return; }
  if (Kakao.isInitialized && Kakao.isInitialized()) { return; }
  try { Kakao.init(SHARE_CONFIG.kakaoKey); } catch (e) { }
})();

// 공유 모달 열기/닫기
var shareModal = document.getElementById('shareModal');
var shareModalClose = document.getElementById('shareModalClose');
var lastShareTrigger = null;
function openShareModal(trigger) {
  if (!shareModal) { return; }
  lastShareTrigger = trigger || null;
  shareModal.classList.add('is-open');
  shareModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (shareModalClose) { shareModalClose.focus(); }
}
function closeShareModal() {
  if (!shareModal) { return; }
  shareModal.classList.remove('is-open');
  shareModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastShareTrigger && lastShareTrigger.focus) { lastShareTrigger.focus(); }
}
if (shareModal) {
  shareModal.addEventListener('click', function (e) {
    if (e.target === shareModal) { closeShareModal(); }
  });
}
if (shareModalClose) {
  shareModalClose.addEventListener('click', closeShareModal);
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && shareModal && shareModal.classList.contains('is-open')) {
    closeShareModal();
  }
});

// SNS별 공유 동작
function openPopup(url) {
  var w = 600, h = 600;
  var left = (window.screen.width - w) / 2;
  var top = (window.screen.height - h) / 2;
  window.open(url, '_blank', 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',noopener');
}
function shareFacebook() {
  var u = encodeURIComponent(window.location.href);
  openPopup('https://www.facebook.com/sharer/sharer.php?u=' + u);
}
function shareTwitter() {
  var u = encodeURIComponent(window.location.href);
  var t = encodeURIComponent(SHARE_CONFIG.title);
  openPopup('https://twitter.com/intent/tweet?url=' + u + '&text=' + t);
}
function shareNaver() {
  var u = encodeURIComponent(window.location.href);
  var t = encodeURIComponent(SHARE_CONFIG.title);
  openPopup('https://share.naver.com/web/shareView?url=' + u + '&title=' + t);
}
function shareKakao() {
  if (!window.Kakao || !Kakao.Share) { return; }
  if (!Kakao.isInitialized || !Kakao.isInitialized()) { return; }
  try {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: SHARE_CONFIG.title,
        description: SHARE_CONFIG.description,
        imageUrl: SHARE_CONFIG.ogImage,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href
        }
      },
      buttons: [{
        title: '자세히 보기',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href
        }
      }]
    });
  } catch (e) { }
}
function shareInstagram() {
  // 인스타그램은 웹 URL 공유 API를 제공하지 않으므로 URL 복사 + 안내
  copyUrlWithToast(window.location.href, 'URL이 복사되었습니다. 인스타그램에 붙여넣어 주세요.');
}
function shareCopy() {
  copyUrlWithToast(window.location.href, '클립보드에 복사되었습니다.');
}
var SHARE_HANDLERS = {
  kakao: shareKakao,
  facebook: shareFacebook,
  twitter: shareTwitter,
  naver: shareNaver,
  instagram: shareInstagram,
  copy: shareCopy
};
if (shareModal) {
  shareModal.addEventListener('click', function (e) {
    var target = e.target.closest ? e.target.closest('[data-share]') : null;
    if (!target) { return; }
    var type = target.getAttribute('data-share');
    var handler = SHARE_HANDLERS[type];
    if (typeof handler === 'function') {
      handler();
      // 카카오톡은 자체 팝업이 뜨므로 모달은 닫고, 나머지는 약간의 시각적 피드백 후 닫기
      closeShareModal();
    }
  });
}

var btnShare = document.getElementById('btnShare');
if (btnShare) {
  btnShare.addEventListener('click', function () { openShareModal(btnShare); });
}
var btnShareFloating = document.getElementById('btnShareFloating');
if (btnShareFloating) {
  btnShareFloating.addEventListener('click', function () { openShareModal(btnShareFloating); });
}
var btnScrollTop = document.getElementById('btnScrollTop');
if (btnScrollTop) {
  btnScrollTop.addEventListener('click', function (e) {
    e.preventDefault();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var behavior = reduce ? 'auto' : 'smooth';
    // sticky 헤더(#top)에 scrollIntoView 하면 이미 보이는 요소로 판단해 스크롤이 안 올라가는 경우가 있음
    try {
      window.scrollTo({ top: 0, left: 0, behavior: behavior });
    } catch (err) {
      (document.scrollingElement || document.documentElement).scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
}
})();

// 상단 안내 바 높이를 CSS 변수(--cbbar-h)로 넘겨 KV가 "화면 높이 - 바 높이"만 차지하게 함
(function () {
  var bar = document.getElementById('top');
  if (!bar) { return; }
  function setBarH() { document.documentElement.style.setProperty('--cbbar-h', bar.offsetHeight + 'px'); }
  setBarH();
  window.addEventListener('resize', setBarH);
  if (window.ResizeObserver) { new ResizeObserver(setBarH).observe(bar); }
})();

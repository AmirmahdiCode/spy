(function(global) {
  'use strict';

  var API_URL = 'https://script.google.com/macros/s/AKfycbzTGlLotDw3GB3RDQ1jbZ4qnHkUqsuZI5j5cYONoBuHfQvJHyeZQ2DOn3g9GN06FyQXNw/exec';

  var SETTINGS_KEY = 'mafiaSettings';

  var DEFAULT_SETTINGS = {
    theme: 'light',
    specialTheme: 'none',
    animation: true,
    haptic: true,
    font: 'Samim',
    language: 'fa'
  };

  var VALID_THEMES = ['light', 'dark'];
  var VALID_SPECIAL_THEMES = ['none', 'crime'];
  var VALID_FONTS = ['Samim', 'Sahel', 'Vazirmatn', 'Estedad', 'Gandom'];
  var VALID_LANGS = ['fa', 'ar', 'en'];

  var FONT_MAP = {
    'Samim': "'Samim', Tahoma, sans-serif",
    'Sahel': "'Sahel', Tahoma, sans-serif",
    'Vazirmatn': "'Vazirmatn', Tahoma, sans-serif",
    'Estedad': "'Estedad', Tahoma, sans-serif",
    'Gandom': "'Gandom', Tahoma, sans-serif"
  };

  var ICON_AVATARS = {
    'icon_game': 'fa-gamepad',
    'icon_trophy': 'fa-trophy',
    'icon_star': 'fa-star',
    'icon_bolt': 'fa-bolt',
    'icon_fire': 'fa-fire',
    'icon_crown': 'fa-crown',
    'icon_medal': 'fa-medal',
    'icon_ghost': 'fa-ghost',
    'icon_hat': 'fa-hat-wizard',
    'icon_shield': 'fa-shield-halved'
  };

  var AVATAR_URLS = {
    'pack1_1': 'https://cdn.imgurl.ir/uploads/w54346_lIQr-ezB9TyDFznBX3EieIvKLKM-CdpmSV-OSA2l26jhWCDcIA.png',
    'pack1_2': 'https://cdn.imgurl.ir/uploads/d045472_45mp0V0r9zSquRAopHTdR59Od_o-L60GmINsTj2gUswx-2AmsQ.png',
    'pack1_3': 'https://cdn.imgurl.ir/uploads/d114583_ftWUHkzgH4A2JymrtJgRp63obmk-8-j-mwqcSiacnVXLLkp0hA.png',
    'pack1_4': 'https://cdn.imgurl.ir/uploads/w41443_xNi0R1rJosqzhzhbLnQzYQHn2fw-XhSRfdtbSTe4-1WdpJFA2w.png',
    'pack1_5': 'https://cdn.imgurl.ir/uploads/n160157_D0pfZYH_Qyviui_DHs7nz-Ov8ok-9QNBVHKnRPi3pACDH8ybJw.png',
    'pack1_6': 'https://cdn.imgurl.ir/uploads/z506541_xNi0R1rJosqzhzhbLnQzYQHn2fw-XhSRfdtbSTe4-1WdpJFA2w.png',
    'pack1_7': 'https://cdn.imgurl.ir/uploads/o90527_iXRzLE_NMWaY3YWS7NVyWsLAnKc-5FHSha4aSI-iAd9SZcXZuA.png',
    'pack1_8': 'https://cdn.imgurl.ir/uploads/x98720_ip7QxGUh5btN7O3bJEWpsCVMFcc-ior1jq1JT4yr8KBbjEEGNw.png',
    'pack1_9': 'https://cdn.imgurl.ir/uploads/m835437_pGirYQXoRTm0dS72qKE41Rzrhwc-OrCH6A2LS7eVKdUmFciPEA.png',
    'pack1_10': 'https://cdn.imgurl.ir/uploads/n589870_n1TPqxlnhdfs8om-ovlEjYGgBIM-LwT9XNfyQQSttH7PhHi5iQ.png'
  };

  var ROLE_NAMES = {
    'citizen': 'role_citizen',
    'detective': 'role_detective',
    'judge': 'role_judge',
    'sheriff': 'role_sheriff',
    'doctor': 'role_doctor',
    'spy': 'role_spy',
    'infiltrator': 'role_infiltrator',
    'bait': 'role_bait',
    'silencer': 'role_silencer',
    'gunner': 'role_gunner',
    'killer': 'role_killer',
    'psycho': 'role_psycho'
  };

  var ROLE_GROUPS = {
    'citizen': 'city',
    'detective': 'city',
    'judge': 'city',
    'sheriff': 'city',
    'doctor': 'city',
    'spy': 'mafia',
    'infiltrator': 'mafia',
    'silencer': 'mafia',
    'bait': 'mafia',
    'gunner': 'mafia',
    'killer': 'free',
    'psycho': 'free'
  };

  var ROLE_IMAGES = {
    'citizen': 'https://cdn.imgurl.ir/uploads/k79593_InShot_20260908_173316870.png',
    'detective': 'https://cdn.imgurl.ir/uploads/w921252_InShot_20260908_173559430.png',
    'judge': 'https://cdn.imgurl.ir/uploads/e372004_InShot_20260908_180057525.png',
    'sheriff': 'https://cdn.imgurl.ir/uploads/i242516_InShot_20260917_162620222.png',
    'doctor': 'https://cdn.imgurl.ir/uploads/v31967_InShot_20260917_162742245.png',
    'spy': 'https://cdn.imgurl.ir/uploads/j86520_InShot_20260908_180252663.png',
    'infiltrator': 'https://cdn.imgurl.ir/uploads/g373296_InShot_20260908_180342640.png',
    'bait': 'https://cdn.imgurl.ir/uploads/n732962_InShot_20260917_162331789.png',
    'silencer': 'https://cdn.imgurl.ir/uploads/g192531_InShot_20260917_162213256.png',
    'gunner': 'https://cdn.imgurl.ir/uploads/p68300_InShot_20260917_162503506.png',
    'killer': 'https://cdn.imgurl.ir/uploads/x9199_InShot_20260917_162856320.png',
    'psycho': 'https://cdn.imgurl.ir/uploads/u753353_InShot_20260917_162952379.png'
  };

  var BADGE_IMAGES = {
    'official': 'https://cdn.imgurl.ir/uploads/h95014_InShot_20260909_113952033.png',
    'developer': 'https://uploadkon.ir/uploads/b27b13_26laptop-iconbase.svg',
    'premium': 'https://uploadkon.ir/uploads/40e113_26premium-service-iconbase.svg'
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) { return escapeHtml(str); }

  function safeGetLocalStorage(key) {
    try { return localStorage.getItem(key); }
    catch(e) { return null; }
  }

  function safeSetLocalStorage(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch(e) { return false; }
  }

  function safeRemoveLocalStorage(key) {
    try { localStorage.removeItem(key); return true; }
    catch(e) { return false; }
  }

  function safeParseJSON(str, fallback) {
    try {
      var parsed = JSON.parse(str);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch(e) { return fallback; }
  }

  function getSettings() {
    var raw = safeGetLocalStorage(SETTINGS_KEY);
    if (!raw) return Object.assign({}, DEFAULT_SETTINGS);
    var p = safeParseJSON(raw, null);
    if (!p || typeof p !== 'object') return Object.assign({}, DEFAULT_SETTINGS);
    var out = Object.assign({}, DEFAULT_SETTINGS);
    if (VALID_THEMES.indexOf(p.theme) !== -1) out.theme = p.theme;
    if (VALID_SPECIAL_THEMES.indexOf(p.specialTheme) !== -1) out.specialTheme = p.specialTheme;
    if (VALID_FONTS.indexOf(p.font) !== -1) out.font = p.font;
    if (VALID_LANGS.indexOf(p.language) !== -1) out.language = p.language;
    if (typeof p.animation === 'boolean') out.animation = p.animation;
    if (typeof p.haptic === 'boolean') out.haptic = p.haptic;
    return out;
  }

  function saveSettings(s) {
    return safeSetLocalStorage(SETTINGS_KEY, JSON.stringify(s));
  }

  function getEitaaUser() {
    var webApp = global.Eitaa && global.Eitaa.WebApp;
    return webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user ? webApp.initDataUnsafe.user : null;
  }

  function getUserId() {
    var u = getEitaaUser();
    if (!u || u.id === undefined || u.id === null) return '';
    return String(u.id);
  }

  function getWebApp() {
    return (global.Eitaa && global.Eitaa.WebApp) ? global.Eitaa.WebApp : null;
  }

  function isAnimationEnabled() {
    var s = getSettings();
    if (s.animation === false) return false;
    if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  }

  function triggerHaptic(style) {
    var s = getSettings();
    if (s.haptic === false) return;
    var webApp = getWebApp();
    if (webApp && webApp.HapticFeedback && webApp.HapticFeedback.impactOccurred) {
      try { webApp.HapticFeedback.impactOccurred(style || 'light'); } catch(e) {}
    }
  }

  function applyTheme(container) {
    var s = getSettings();
    var root = container || document.documentElement;
    root.setAttribute('data-theme', s.theme);
    root.setAttribute('data-special-theme', s.specialTheme);
    if (s.animation === false) {
      root.setAttribute('data-animation', 'off');
    } else {
      root.removeAttribute('data-animation');
    }
    var fontFamily = FONT_MAP[s.font] || FONT_MAP['Samim'];
    root.style.setProperty('--font', fontFamily);
    if (document.body) document.body.style.fontFamily = fontFamily;
    var lang = s.language || 'fa';
    if (lang === 'en') {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    } else if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
    } else {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'fa');
    }
    return s;
  }

  function getLanguage() {
    return getSettings().language || 'fa';
  }

  function updateHeaderTitle(lang) {
    var titleEl = document.getElementById('headerTitle');
    if (!titleEl) return;
    var l = lang || getLanguage();
    titleEl.textContent = l === 'en' ? 'Mafia Spy' : 'جاسوس مافیایی';
  }

  function applyI18n(translations, lang) {
    var l = lang || getLanguage();
    var t = translations && translations[l] ? translations[l] : (translations && translations.fa ? translations.fa : {});
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var k = el.getAttribute('data-i18n');
      if (t[k] !== undefined) el.textContent = t[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var k = el.getAttribute('data-i18n-placeholder');
      if (t[k] !== undefined) el.placeholder = t[k];
    });
    updateHeaderTitle(l);
    return l;
  }

  function toPersianDigits(n) {
    var s = String(n);
    if (getLanguage() === 'en') return s;
    var digits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return s.replace(/\d/g, function(d) { return digits[parseInt(d, 10)]; });
  }

  function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    var mm = m < 10 ? '0' + m : '' + m;
    var ss = s < 10 ? '0' + s : '' + s;
    return toPersianDigits(mm) + ':' + toPersianDigits(ss);
  }

  function showToast(message, type, duration) {
    duration = duration || 4000;
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    var icon = 'bi-exclamation-triangle-fill';
    if (type === 'success') icon = 'bi-check-circle-fill';
    else if (type === 'info') icon = 'bi-info-circle-fill';
    toast.innerHTML = '<i class="bi ' + icon + '" aria-hidden="true"></i><span class="toast-text">' + escapeHtml(message) + '</span>';
    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('hiding');
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, duration);
  }

  function showLoading() {
    var el = document.getElementById('loadingOverlay');
    if (el) el.classList.add('show');
  }

  function hideLoading() {
    var el = document.getElementById('loadingOverlay');
    if (el) el.classList.remove('show');
  }

  function spawnParticles() {
    if (!isAnimationEnabled()) return;
    var container = document.getElementById('particlesContainer');
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < 15; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (10 + Math.random() * 15) + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      var size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      container.appendChild(p);
    }
  }

  function spawnConfetti(count) {
    if (!isAnimationEnabled()) return;
    var container = document.getElementById('confettiContainer');
    if (!container) return;
    var colors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'];
    var n = count || 25;
    for (var i = 0; i < n; i++) {
      var c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + '%';
      c.style.top = '-20px';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      c.style.animationDuration = (1.5 + Math.random() * 1) + 's';
      c.style.animationDelay = Math.random() * 0.4 + 's';
      container.appendChild(c);
      (function(el) {
        setTimeout(function() {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 3000);
      })(c);
    }
  }

  function getAvatarHtml(avatarId) {
    if (!avatarId || avatarId === 'default') return '<i class="fa-solid fa-user" aria-hidden="true"></i>';
    if (ICON_AVATARS[avatarId]) return '<i class="fa-solid ' + escapeAttr(ICON_AVATARS[avatarId]) + '" aria-hidden="true"></i>';
    if (AVATAR_URLS[avatarId]) return '<img src="' + escapeAttr(AVATAR_URLS[avatarId]) + '" alt="" draggable="false" oncontextmenu="return false;" ondragstart="return false;">';
    return '<i class="fa-solid fa-user" aria-hidden="true"></i>';
  }

  function getUserTypeBadge(userType) {
    var t = String(userType || '').trim();
    if (!t) return '';
    var parts = t.split(',').map(function(s) { return s.trim(); });
    var html = '';
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p === 'رسمی' || p === 'سازنده') {
        html += '<span class="badge-icon"><img src="' + BADGE_IMAGES.official + '" alt="رسمی" draggable="false" oncontextmenu="return false;" ondragstart="return false;"></span>';
      } else if (p === 'توسعه دهنده') {
        html += '<span class="badge-icon"><img src="' + BADGE_IMAGES.developer + '" alt="توسعه دهنده" draggable="false" oncontextmenu="return false;" ondragstart="return false;"></span>';
      } else if (p === 'پرومیوم') {
        html += '<span class="badge-icon"><img src="' + BADGE_IMAGES.premium + '" alt="پرومیوم" draggable="false" oncontextmenu="return false;" ondragstart="return false;"></span>';
      }
    }
    return html;
  }

  function isBlockedUser(userType) {
    var t = String(userType || '').trim();
    if (!t) return false;
    var parts = t.split(',').map(function(s) { return s.trim(); });
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === 'متخلف') return true;
    }
    return false;
  }

  function isNightPhase(status) {
    return status === 'n1' || status === 'n2' || status === 'n3';
  }

  function isDayPhase(status) {
    return status === 'd1' || status === 'd2' || status === 'd3';
  }

  function isVotePhase(status) {
    return status === 'v1' || status === 'v2' || status === 'v3';
  }

  function getPhaseNumber(status) {
    if (status === 'n1' || status === 'd1' || status === 'v1') return 1;
    if (status === 'n2' || status === 'd2' || status === 'v2') return 2;
    if (status === 'n3' || status === 'd3' || status === 'v3') return 3;
    return 0;
  }

  function getRoleGroup(role) {
    return ROLE_GROUPS[role] || '';
  }

  function getRoleImage(role) {
    return ROLE_IMAGES[role] || '';
  }

  function getRoleNameKey(role) {
    return ROLE_NAMES[role] || 'role_citizen';
  }

  async function fetchData(action, params, retryCount) {
    retryCount = retryCount || 0;
    var payload = { action: action, username: getUserId() };
    if (params && typeof params === 'object') {
      for (var k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k)) {
          payload[k] = params[k];
        }
      }
    }
    try {
      var controller = new AbortController();
      var timeoutId = setTimeout(function() { controller.abort(); }, 15000);
      var r = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!r.ok) throw new Error('http_' + r.status);
      var ct = r.headers.get('content-type') || '';
      if (ct.indexOf('application/json') === -1) throw new Error('invalid_content_type');
      var data = await r.json();
      if (!data || typeof data !== 'object') throw new Error('invalid_payload');
      return data;
    } catch(err) {
      var isRetryable = err && (
        err.name === 'AbortError' ||
        err.message === 'Failed to fetch' ||
        err.message === 'NetworkError when attempting to fetch resource.' ||
        err.message === 'invalid_content_type' ||
        /^http_5/.test(err.message || '')
      );
      if (retryCount < 2 && isRetryable) {
        await new Promise(function(res) { setTimeout(res, 1000 * (retryCount + 1)); });
        return fetchData(action, params, retryCount + 1);
      }
      return { ok: false, error: 'network' };
    }
  }

  function setupEitaa() {
    var webApp = getWebApp();
    if (!webApp) return;
    try {
      if (webApp.ready) webApp.ready();
      if (webApp.expand) webApp.expand();
      if (webApp.BackButton && webApp.BackButton.hide) webApp.BackButton.hide();
    } catch(e) {}
  }

  function setupBackButton(url) {
    var webApp = getWebApp();
    if (!webApp || !webApp.BackButton) return;
    try {
      if (webApp.BackButton.show) {
        webApp.BackButton.show();
        if (webApp.BackButton.onClick) {
          webApp.BackButton.onClick(function() { window.location.href = url; });
        }
      }
    } catch(e) {}
  }

  function setupNavItems() {
    document.querySelectorAll('.nav-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var href = el.getAttribute('data-href');
        if (href) window.location.href = href;
      });
    });
  }

  function openSupportLink() {
    var notif = document.getElementById('supportNotification');
    if (notif) notif.style.display = 'none';
    var webApp = getWebApp();
    var url = 'https://eitaa.com/Amirmahdi_code';
    if (webApp && webApp.openEitaaLink) {
      try { webApp.openEitaaLink(url); return; } catch(e) {}
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function openEitaaLink(url) {
    var webApp = getWebApp();
    if (webApp && webApp.openEitaaLink) {
      try { webApp.openEitaaLink(url); return; } catch(e) {}
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function setupSupportNotification() {
    var notif = document.getElementById('supportNotification');
    if (!notif) return;
    notif.addEventListener('click', openSupportLink);
    setTimeout(function() {
      if (notif) notif.style.display = 'none';
    }, 5000);
  }

  function disableContextMenu() {
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('dragstart', function(e) { e.preventDefault(); });
    document.addEventListener('copy', function(e) { e.preventDefault(); });
    document.addEventListener('cut', function(e) { e.preventDefault(); });
  }

  function loadFont(fontName) {
    var fontUrls = {
      'Vazirmatn': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
      'Sahel': 'https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v1.0.0/dist/font-face.css',
      'Estedad': 'https://cdn.jsdelivr.net/gh/rastikerdar/estedad-font@v1.0.0/dist/font-face.css',
      'Gandom': 'https://cdn.jsdelivr.net/gh/rastikerdar/gandom-font@v1.0.0/dist/font-face.css'
    };
    if (!fontName || fontName === 'Samim') return;
    if (!fontUrls[fontName]) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrls[fontName];
    document.head.appendChild(link);
  }

  function navigateTo(url) {
    try {
      document.body.classList.add('page-leaving');
    } catch(e) {}
    setTimeout(function() { window.location.href = url; }, 200);
  }

  global.MafiaApp = {
    API_URL: API_URL,
    SETTINGS_KEY: SETTINGS_KEY,
    DEFAULT_SETTINGS: DEFAULT_SETTINGS,
    FONT_MAP: FONT_MAP,
    ICON_AVATARS: ICON_AVATARS,
    AVATAR_URLS: AVATAR_URLS,
    ROLE_NAMES: ROLE_NAMES,
    ROLE_GROUPS: ROLE_GROUPS,
    ROLE_IMAGES: ROLE_IMAGES,
    BADGE_IMAGES: BADGE_IMAGES,

    escapeHtml: escapeHtml,
    escapeAttr: escapeAttr,
    safeGetLocalStorage: safeGetLocalStorage,
    safeSetLocalStorage: safeSetLocalStorage,
    safeRemoveLocalStorage: safeRemoveLocalStorage,
    safeParseJSON: safeParseJSON,

    getSettings: getSettings,
    saveSettings: saveSettings,
    getLanguage: getLanguage,
    applyTheme: applyTheme,
    applyI18n: applyI18n,
    updateHeaderTitle: updateHeaderTitle,
    loadFont: loadFont,

    getEitaaUser: getEitaaUser,
    getUserId: getUserId,
    getWebApp: getWebApp,

    isAnimationEnabled: isAnimationEnabled,
    triggerHaptic: triggerHaptic,

    showToast: showToast,
    showLoading: showLoading,
    hideLoading: hideLoading,

    spawnParticles: spawnParticles,
    spawnConfetti: spawnConfetti,

    getAvatarHtml: getAvatarHtml,
    getUserTypeBadge: getUserTypeBadge,
    isBlockedUser: isBlockedUser,

    toPersianDigits: toPersianDigits,
    formatTime: formatTime,

    isNightPhase: isNightPhase,
    isDayPhase: isDayPhase,
    isVotePhase: isVotePhase,
    getPhaseNumber: getPhaseNumber,
    getRoleGroup: getRoleGroup,
    getRoleImage: getRoleImage,
    getRoleNameKey: getRoleNameKey,

    fetchData: fetchData,

    setupEitaa: setupEitaa,
    setupBackButton: setupBackButton,
    setupNavItems: setupNavItems,
    setupSupportNotification: setupSupportNotification,
    openSupportLink: openSupportLink,
    openEitaaLink: openEitaaLink,
    disableContextMenu: disableContextMenu,

    navigateTo: navigateTo
  };

})(window);

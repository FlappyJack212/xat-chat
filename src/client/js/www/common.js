"use strict";

let Direct;
let Home;
let soltodo;
let mDirect;
let n;
let ReleaseMode = 0;
let xConfig = {};
let GET = getGET();
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let dir = "../src/";
let json = document.getElementById("xjson");
var _JSON$parse;
json &&= JSON.parse(json.innerHTML);
if (json && (json.dir && (dir = json.dir), dir == "/" && (dir = ""), json.Direct && isMobile && ((_JSON$parse = JSON.parse(localStorage.getItem("Settings"))) == null ? undefined : _JSON$parse.classic) != "enable")) {
  let e = window.location.href.match(/\/\/.*?\/([a-zA-Z0-9_]*)/);
  if (e && e[1]) {
    document.body.innerHTML = "";
    let a = document.createElement("iframe");
    if (GET.params.n) {
      e[1] = GET.params.n;
    }
    a.src = dir + "box/embed.html#!&app=1&n=" + e[1];
    a.style.cssText = "position:fixed;top:0;left:0;bottom:0;right:0;width:100%;height:100%;border:none;margin:0;padding:0;overflow:hidden;z-index:999999;";
    document.body.appendChild(a);
    mDirect = 1;
  }
}
$("body").removeClass("d-none");
let scriptCont = $("#scriptCont");
if (scriptCont) {
  scriptCont.removeClass("d-none");
}
let lBackground = "#00004424";
const logoEvents = [{
  month: [12, 1],
  date: [28, 3],
  logos: ["oo", "ph", "firework", "party", "balloon", "firecracker", "newyear", "nyclock", "sparkler"]
}, {
  month: 2,
  date: [11, 15],
  logos: ["ilu2", "ring2", "valentine", "rose", "u", "beat", "lips", "l"]
}, {
  month: 9,
  date: 17,
  logos: ["ceballoon", "cecake", "cechampagne", "ceconfetti", "party", "ph"]
}, {
  month: 10,
  date: [20, 31],
  logos: ["hwcat", "hwcauld", "hweye", "zhand", "halloween", "scaryeye", "cobweb", "tomb2", "pknburning", "candy", "treat", "spkn", "zmask", "sskul", "boo", "boorip", "boosat", "booskull", "gghost", "gpump", "gwitch", "gzom"]
}, {
  month: 12,
  date: [1, 27],
  logos: ["house", "ornament2", "snowman2", "tree", "chimney", "xhat", "xb4", "gift2", "snowing", "snow", "icecube", "sball", "wreath", "sman", "globe", "cdy", "b4", "claus", "dhat", "dhead", "rein2"]
}];
function initConfig() {
  (xConfig = {
    lang: "en",
    name: "direct",
    origin: "https://rxat.ro"
  }).dir = dir;
  if (!(xConfig.cookies & 2)) {
    xConfig.lang = GetWeb().lang;
    xConfig.lang ||= getCookie("lang");
  }
  if (!xConfig.lang || xConfig.lang == "default") {
    xConfig.lang = getFirstBrowserLanguage();
  }
  let e = GET.params.lang;
  if (e) {
    xConfig.lang = e;
  }
  xConfig.lang ||= "en";
  xConfig.lang = xConfig.lang.toLowerCase();
}
const debounce = e => {
  let a;
  return (...t) => {
    if (a) {
      cancelAnimationFrame(a);
    }
    a = requestAnimationFrame(() => {
      e(...t);
    });
  };
};
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
};
function startAnalytics() {
  try {
    if (!(xConfig.cookies & 2)) {
      e = window;
      a = document;
      "script";
      "ga";
      e.GoogleAnalyticsObject = "ga";
      e.ga = e.ga || function () {
        (e.ga.q = e.ga.q || []).push(arguments);
      };
      e.ga.l = new Date() * 1;
      t = a.createElement("script");
      n = a.getElementsByTagName("script")[0];
      t.async = 1;
      t.src = "https://www.google-analytics.com/analytics.js";
      n.parentNode.insertBefore(t, n);
      ga("create", "UA-190362464-1", "auto");
      ga("send", "pageview");
    }
  } catch (e) {}
  var e;
  var a;
  var t;
  var n;
}
function setUser() {
  if (xConfig.username) {
    document.querySelector("#navUsernameId").innerHTML = "\n      <div class=\"media m-0 ml-2\">\n        <img class=\"mr-0 ml-1\" src=\"" + xConfig.avatar + "\" width=\"33\" height=\"33\" alt=\"avatar\">\n        <div class=\"media-body\">\n          <p class=\"m-0\">" + xConfig.username + "<br>" + xConfig.id + "</p>\n        </div>\n      </div>\n    ";
  }
  if (Home && xConfig.username !== undefined && xConfig.username.length > 0) {
    let e = "<span data-localize=index.welcomereg>Find a ixat group that shares your interests. Make your own ixat group. Get and trade Powers. Play a multiplayer game. Design your own animated avatar character. Send stickers with custom text.</span>";
    let a = document.querySelector("#newtoxat");
    let t = document.querySelector("#newtodesc");
    if (a != null) {
      a.removeAttribute("data-localize");
    }
    a.innerHTML = "<h4><span data-localize=index.hello>Hello</span>, " + xConfig.username + "!</h4>";
    if (t != null) {
      t.removeAttribute("data-localize");
    }
    t.innerHTML = e;
    localize(["index"]);
  }
  let e = document.querySelector("#navAccountBadge");
  xConfig.accountBadge ||= 0;
  if (e) {
    e.innerText = xConfig.accountBadge || 0;
    if (xConfig.accountBadge == 0 || ReleaseMode) {
      e.classList.add("d-none");
    }
  }
}
function setLoggedin() {
  if (xConfig.username) {
    document.getElementById("navLogin").addEventListener("click", function () {
      directConfig("login");
    });
    directConfig("login");
  } else {
    let e = document.getElementById("navLogin");
    if (e) {
      e.href = "/login";
      e.removeAttribute("data-toggle");
      e.removeAttribute("data-target");
      e.addEventListener("click", function () {
        window.location.href = "https://rxat.ro/login";
      });
    }
  }
}
function readUser() {
  try {
    xConfig.cookies = localStorage.getItem("cookies");
  } catch (e) {
    return;
  }
  let e = localStorage.getItem("todo");
  e &&= JSON.parse(e);
  if (e && e.w_userno) {
    xConfig.id = e.w_userno;
    xConfig.k2 = e.w_k2;
    xConfig.username = e.w_registered ? e.w_registered : "";
    xConfig.avatar = "";
    if (e.w_avatar) {
      xConfig.avatar = e.w_avatar.split("#");
      xConfig.avatar = xConfig.avatar[0];
    }
    xConfig.avatar = xConfig.avatar && xConfig.avatar.substr(0, 4) == "http" ? "https://rxat.ro/web_gear/chat/GetImage7.php?s&W=30&H=30&U=" + xConfig.avatar : parseInt(xConfig.avatar) > 0 ? "https://rxat.ro/web_gear/chat/av/" + parseInt(xConfig.avatar) + ".png" : xConfig.dir + "img/42.png";
  }
  if (xConfig.cookies != null && xConfig.cookies >= 0) {
    xConfig.cookies = xInt(xConfig.cookies) & -2;
    setPrivacy(xConfig.cookies);
  }
}
function fetchPromo(e) {
  return new Promise((a, t) => {
    let n = {
      date: new Date()
    };
    n.cb60 = parseInt((n.date.getTime() + 30000) / 60000);
    n.lang = xConfig.lang;
    n.xcb_l = "996Vc";
    fetch("https://rxat.ro/json/promo.php?c=" + n.cb60).then(function (e) {
      return e.json();
    }).then(function (t) {
      let o = n.lang ? n.lang.substr(0, 2) : "en";
      xConfig.xpromo = o = t[o];
      if (!o) {
        xConfig.xpromo = o = t.n0;
      }
      if (!$("#GroupsList").length) {
        $("#navGroupsItems").prepend("<div id=\"GroupsList\"></div>");
      }
      let r = $("#GroupsList");
      if (e) {
        r.html("");
      }
      xConfig.xpromo = o = Array.from(new Set(o.map(e => e.n))).map(e => o.find(a => a.n === e));
      let i = "";
      for (let e in o) {
        i += "<a class=\"dropdown-item\" href=\"https://rxat.ro/" + o[e].n + "\"><img class=\"mr-2\" src=\"" + xConfig.dir + "img/navbar/promoted.svg\" alt=\"promoted\">" + o[e].n + "</a>";
      }
      if (i !== "") {
        i += "<div class=\"dropdown-divider\"></div>";
        r.append(i);
        r.prepend("<h6 class=\"dropdown-header text-center\" data-localize=\"web.promgroups\">Promoted Groups</h6>");
      }
      if (!Direct) {
        a(o[Math.floor(Math.random() * o.length)]);
      }
    });
    if (Direct) {
      a();
    }
  });
}
function Sanitize(e, a) {
  a ||= /[^0-9a-zA-Z_\-]/g;
  return e.replace(a);
}
function getFirstBrowserLanguage() {
  var e;
  var a;
  var t = window.navigator;
  var n = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
  if (Array.isArray(t.languages)) {
    for (e = 0; e < t.languages.length; e++) {
      if ((a = t.languages[e]) && a.length) {
        return a;
      }
    }
  }
  for (e = 0; e < n.length; e++) {
    if ((a = t[n[e]]) && a.length) {
      return a;
    }
  }
  return null;
}
function xInt(e) {
  e = parseInt(e);
  if (isNaN(e)) {
    return 0;
  } else {
    return e;
  }
}
function Reset() {
  $(".HideDiv").addClass("d-none");
  $(".ClrDiv").html("");
  $(document.body).css({
    cursor: "default"
  });
  allErrsOff();
}
function allErrsOff() {
  $(".is-invalid").removeClass("is-invalid");
  $(".ClrErr").html("");
  $(".ClrErr").addClass("d-none");
}
function PassReveal(e) {
  let a = e.parent().prev();
  if (a.prop("type") == "text") {
    a.prop("type", "password");
  } else {
    a.prop("type", "text");
  }
}
function commonPost() {
  let e;
  try {
    e = localStorage.getItem("todo");
  } catch (e) {}
  e &&= JSON.parse(e);
  e ||= {};
  let a = {
    DeviceId: e.DeviceId,
    PassHash: e.PassHash,
    YourEmail: $("#username").val(),
    password: $("#password").val(),
    agree: $("#agreeterms").prop("checked") ? "ON" : 0
  };
  if (GET.params.f) {
    a.f = Sanitize(GET.params.f);
  }
  if (GET.params.test) {
    a.test = Sanitize(GET.params.test);
  }
  soltodo = e;
  return a;
}
function DoErrs(e, a) {
  let t;
  $(".invalid-feedback").html("");
  if (e.Err) {
    for (let a in e.Err) {
      if (t = $("#" + a + "err")) {
        t.html(e.Err[a]);
        t.removeClass("d-none");
        if ((t = $("#" + a)) && (t.hasClass("form-control") || t.hasClass("custom-control-input"))) {
          t.addClass("is-invalid");
        }
      }
    }
  }
}
function SetNewTodo(e) {
  if (e) {
    let a;
    try {
      a = JSON.parse(localStorage.getItem("todo"));
    } catch (e) {}
    if (!a || typeof a != "object") {
      a = {};
    }
    a.MobNo = e.MobNo;
    a.DeviceId = e.DeviceId;
    a.PassHash = e.PassHash;
    a.w_userno = e.w_userno;
    a.w_registered = e.w_registered;
    a.mtime = e.mtime;
    try {
      localStorage.setItem("todo", JSON.stringify(a));
    } catch (e) {}
  }
}
function AddCap(e) {
  $("#" + e).html("<div class=\"g-recaptcha\" data-sitekey=\"6LfAu68ZAAAAANuwcpX-vFoI3NCMy8QFdX2cHz__\" data-size=\"compact\"></div>\n  <script type=\"text/javascript\" src=\"https://www.google.com/recaptcha/api.js\"></script>");
}
function urlPost(e, a) {
  return new Promise((t, n) => {
    let o = {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    };
    if (a) {
      o.method = "POST";
      o.body = $.param(a);
    }
    fetch(e, o).then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return response.text().then(text => {
          console.warn('Non-JSON response received:', text.substring(0, 100));
          try {
            return JSON.parse(text);
          } catch (e) {
            throw new Error('Invalid JSON response: ' + text.substring(0, 50));
          }
        });
      }
    }).then(function (e) {
      t(e);
    }).catch(e => {
      console.error('urlPost error:', e);
      n(e);
    });
  });
}
function makeElement(e, a, t, n) {
  var o = document.createElement(a);
  if (t) {
    o.className = t;
  }
  if (n) {
    o.id = n;
  }
  if (e) {
    e.appendChild(o);
  }
  return o;
}
function addText(e, a) {
  if (Array.isArray(a)) {
    if (Array.isArray(a[0])) {
      for (var t in a) {
        addText(e, a[t]);
      }
      return "";
    }
    if (a[0]) {
      (e = makeElement(e, "span")).setAttribute("data-localize", a[0]);
      var n = GetTranslation(a[0]);
      a = a[1];
      if (n) {
        a = n;
      }
    } else {
      a = a[1];
    }
  }
  var o = document.createTextNode(a);
  if (e) {
    e.appendChild(o);
  }
  return o;
}
function GetTranslation(e) {
  var a = e.split(".");
  return !!LangFiles && !!LangFiles[a[0]] && !!LangFiles[a[0]][a[1]] && LangFiles[a[0]][a[1]];
}
let lf;
function localize(e) {
  if (xConfig.lang && xConfig.lang.substr(0, 2) != "en") {
    let a = xConfig.lang;
    if (!lf) {
      lf = ["web"];
      if (!Direct) {
        lf = lf.concat(["index", "groups", "main"]);
      }
      if (e) {
        lf = lf.concat(e);
      }
    }
    xConfig.localizeDue = lf.length;
    for (let e in lf) {
      const t = "//rxat.ro/json/translate";
      const n = "php";
      $("[data-localize]").localize(lf[e], {
        language: a,
        pathPrefix: t,
        fileExtension: n,
        failCallback: localizeFail,
        callback: localizeSuccess
      });
    }
  }
}
function localizeSuccess(e, a) {
  xConfig.localizeDue--;
  a(e);
  if (xConfig.localizeDue == 0) {
    localizeDone();
  }
}
function localizeFail() {
  xConfig.localizeDue--;
  if (xConfig.localizeDue == 0) {
    localizeDone();
  }
}
function localizeDone() {
  if (Home) {
    $("#searchBox").attr("placeholder", $("#findout").text());
  }
  if ($("#search")) {
    $("#search").attr("placeholder", $("#searchTrans").text());
  }
  $("[data-localize]").show();
}
function privacyClose() {
  let e = 0;
  if ($("#privacyNecessary")) {
    e |= $("#privacyNecessary").is(":checked") ? 0 : 1;
    e |= $("#privacyPerformance").is(":checked") ? 0 : 2;
    if ((e |= $("#privacyGroups").is(":checked") ? 4 : 0) & 1) {
      localStorage.clear();
      clearCookies();
      location.reload();
    } else {
      localStorage.setItem("cookies", e);
    }
    xConfig.cookies = e;
    if (e & 4) {
      privacyOpenTab();
    }
  }
  privacyClose2();
}
function clearCookies() {
  let e = document.cookie.split("; ");
  for (let a = 0; a < e.length; a++) {
    let t = window.location.hostname.split(".");
    while (t.length > 0) {
      let n = encodeURIComponent(e[a].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + t.join(".") + " ;path=";
      let o = location.pathname.split("/");
      for (document.cookie = n + "/"; o.length > 0;) {
        document.cookie = n + o.join("/");
        o.pop();
      }
      t.shift();
    }
  }
}
function privacyClose2() {
  $("#privacyModal").modal("hide");
  $("#privacyGroupFrame").addClass("d-none");
  $("#privacyGroupUrl").text("");
}
function setPrivacy(e) {
  e = xInt(e);
  $("#privacyNecessary").prop("checked", !(e & 1));
  $("#privacyPerformance").prop("checked", !(e & 2));
  $("#privacyGroups").prop("checked", e & 4);
}
function privacyOpenTab() {
  let e = $("#privacyGroupUrl").text();
  if (e) {
    tabPress(0, e);
  }
  privacyClose2();
}
function loadDialogs() {
  loadModalDialog("embed", "embedDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("sendMessage", "sendMessageDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("inapp", "inappDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("terms", "termsDialog", {});
  loadModalDialog("privacy", "privacyDialog", {});
  loadModalDialog("language", "languageDialog", {});
}
function loadModalDialog(e, a, t) {
  if (xConfig.debugCompileHandlebars === true) {
    return fetch(xConfig.dir + "dialog/_" + e + ".html").then(function (e) {
      return e.text();
    }).then(function (e) {
      let n = Handlebars.compile(e);
      document.getElementById(a).innerHTML = n(t);
    });
  }
  new Promise(function (a, t) {
    let n = document.createElement("script");
    document.body.appendChild(n);
    n.onload = a;
    n.onerror = t;
    n.async = true;
    n.src = xConfig.dir + "dialog/" + e + ".js";
  }).then(function () {
    let n = Handlebars.templates[e + ".html"];
    document.getElementById(a).innerHTML = n(t);
  });
}
function legacyLinks() {
  let e;
  if (document.querySelector("#navTop")) {
    (e = document.getElementById("navCreate")).href = "https://rxat.ro/chats#!creategroup";
    e.target = "_blank";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsFeatured")).href = "https://rxat.ro/#featured";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsPopular")).href = "https://rxat.ro/#popular";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsSupported")).href = "https://rxat.ro/#supported";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsGames")).href = "https://rxat.ro/#games";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsSearch")).href = "https://rxat.ro/search";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsHelp")).href = "https://rxat.ro/_help";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navGroupsTrade")).href = "https://rxat.ro/_trade";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStoreBuyXats")).href = "https://rxat.ro/buy";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStorePowers")).href = "https://rxat.ro/powers";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStoreShortName")).href = "https://rxat.ro/ShortName";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStoreAuctions")).href = "https://rxat.ro/Auction";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStorePromotion")).href = "https://rxat.ro/promotion";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStoreAds")).href = "https://rxat.ro/ad";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navStoreBuyGroup")).href = "https://rxat.ro/buygroup";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navxatTerms")).href = "https://rxat.ro/terms";
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    if (xConfig.gid && xConfig.gn) {
      (e = document.getElementById("navGroupEvents")).href = "https://rxat.ro/chats#!events&roomid=" + xConfig.gid + "&GroupName=" + xConfig.gn;
      e.target = "_blank";
      e.removeAttribute("data-toggle");
      e.removeAttribute("data-target");
      (e = document.getElementById("navCustomize")).href = "https://rxat.ro/chats#!editgroup&roomid=" + xConfig.gid + "&GroupName=" + xConfig.gn;
      e.target = "_blank";
      e.removeAttribute("data-toggle");
      e.removeAttribute("data-target");
    }
    if (xConfig.gn) {
      (e = document.getElementById("navInapp")).href = "https://rxat.ro/report#!group&GroupName=" + xConfig.gn;
      e.removeAttribute("data-toggle");
      e.removeAttribute("data-target");
      e.target = "_blank";
    }
    (e = document.getElementById("navAccountedit")).href = "https://rxat.ro/editme#" + xConfig.username;
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navAccountxatme")).href = "https://me.rxat.ro/" + xConfig.username;
    e.removeAttribute("data-toggle");
    e.removeAttribute("data-target");
    (e = document.getElementById("navLogout")).href = "https://rxat.ro/logout";
    (e = document.getElementById("navSettings")).href = "https://rxat.ro/login";
  }
}
// Stub function for startSide - will be overridden by direct.js
function startSide(app, t, n, o) {
  console.log("startSide called with:", app, t, n, o);
  // This will be overridden when direct.js loads
}

function navClickHandlers() {
  const privacyClose = document.getElementById("privacyClose");
  if (privacyClose) {
    privacyClose.addEventListener("click", function () {
      privacyClose();
    });
  }
  
  const openPolicy = document.getElementById("openPolicy");
  if (openPolicy) {
    openPolicy.addEventListener("click", function () {
      window.open("https://rxat.ro/privacy", "_blank");
    });
  }
  
  const privacyGroupButton = document.getElementById("privacyGroupButton");
  if (privacyGroupButton) {
    privacyGroupButton.addEventListener("click", function () {
      privacyOpenTab();
    });
  }
  
  const navxatApps = document.getElementById("navxatApps");
  if (navxatApps) {
    navxatApps.addEventListener("click", function () {
      startSide("apps");
    });
  }
}
function directConfig(e) {
  if (e === "portrait") {
    let frame = document.getElementById("embedframe");
    if (frame) {
      frame.width = "375";
      frame.height = "667";
    }
  }
  if (e === "landscape") {
    let frame = document.getElementById("embedframe");
    if (frame) {
      if (Home) {
        frame.width = "650";
        frame.height = "400";
      }
      if (Direct) {
        frame.width = "728";
        frame.height = "486";
      }
    }
  } else if (e == "ad") {
    document.getElementById("adframe").src = xConfig.dir + "apps/ad/ad2.html";
  } else if (e == "background") {
    if (document.body) {
      document.body.style.backgroundImage = "url('')";
    }
  } else if (e == "login") {
    $("#accountdrop").removeClass("d-none").addClass("d-block");
    $("#navLogin").removeClass("d-block").addClass("d-none");
    $("#navRegister").removeClass("d-block").addClass("d-none");
  } else if (e == "mainowner") {
    $("#rankdrop").removeClass("d-block").addClass("d-none");
    $("#admindrop").removeClass("d-none").addClass("d-block");
  }
}
function cookieBar() {
  var e = document.getElementById("cookiePopup");
  var a = document.getElementById("cookieAgree");
  var t = document.getElementById("cookieSettings");
  if (!e) return;
  e.offsetHeight;
  if (!Number.isInteger(xConfig.cookies)) {
    e.classList.add("show");
  }
  a.addEventListener("click", function () {
    e.classList.remove("show");
    privacyClose();
  });
  t.addEventListener("click", function () {
    e.classList.remove("show");
    $("#privacyModal").modal("show");
  });
}
function shuffleArray(e) {
  let a;
  let t;
  let n;
  for (n = e.length - 1; n > 0; n--) {
    a = Math.floor(Math.random() * (n + 1));
    t = e[n];
    e[n] = e[a];
    e[a] = t;
  }
  return e;
}
function initAuser3() {
  let e = "//rxat.ro/login?mode=1&";
  let a = localStorage.getItem("todo");
  let t = document.getElementById("navRegister");
  a &&= JSON.parse(a);
  if (a && a.w_userno) {
    e += "UserId=" + a.w_userno + "&k2=" + a.w_k2;
    t.addEventListener("click", () => {
      window.location.href = e;
    });
  } else {
    fetch("//rxat.ro/web_gear/chat/auser3.php").then(function (e) {
      return e.text();
    }).then(function (a) {
      const _0x515b52 = a.split("&UserId=")[1].split("&")[0];
      const _0xb200b7 = a.split("&k2=")[1];
      e += "UserId=" + _0x515b52 + "&k2=" + _0xb200b7;
      if (t) {
        t.addEventListener("click", () => {
          window.location.href = e;
        });
      }
    });
  }
}
function initLanguage() {
  fetch("//rxat.ro/json/lang/languages.php").then(function (e) {
    return e.json();
  }).then(function (e) {
    var a = document.getElementById("langdropdownitems");
    for (const t in e) {
      if (e[t].i) {
        const n = document.createElement("a");
        n.href = "#";
        n.className = "dropdown-item";
        n.setAttribute("data-lang", e[t].c);
        n.setAttribute("data-lange", e[t].f + " (" + e[t].e + ")");
        if (a) {
          a.appendChild(n);
        }
        const o = document.createElement("span");
        o.innerHTML = e[t].f;
        n.appendChild(o);
        const r = document.createElement("small");
        r.innerHTML = " (" + e[t].e + ")";
        o.parentNode.insertBefore(r, o.nextSibling);
        if (xConfig.lang && xConfig.lang.toLowerCase() === e[t].c) {
          n.style.background = lBackground;
          doToolTips(e[t].f + " (" + e[t].e + ")");
        }
      }
    }
    document.querySelectorAll("[data-lang]").forEach(e => e.addEventListener("click", onLang));
  });
}
function doToolTips(e) {
  var a = document.getElementById("navLang");
  if (a) {
    if (a.dataset.placement == null) {
      a.setAttribute("data-toggle-second", "tooltip");
      a.setAttribute("data-placement", "top");
      a.setAttribute("title", e);
    } else {
      $("[data-toggle-second=\"tooltip\"]").tooltip("hide").attr("data-original-title", e);
    }
    $("[data-toggle-second=\"tooltip\"]").tooltip({
      placement: "right",
      trigger: "hover"
    });
  }
}
function GetWeb() {
  let e;
  try {
    e = JSON.parse(localStorage.getItem("Web"));
  } catch (e) {}
  if (!e || typeof e != "object") {
    e = {};
  }
  return e;
}
function SetWeb(e, a) {
  let t = GetWeb();
  t[e] = a;
  try {
    localStorage.setItem("Web", JSON.stringify(t));
  } catch (e) {}
}
function onLang(e) {
  let a;
  let t;
  a = e.target.dataset.lang === undefined ? e.target.parentNode.dataset.lang : e.target.dataset.lang;
  t = e.target.dataset.lange === undefined ? e.target.parentNode.dataset.lange : e.target.dataset.lange;
  e.preventDefault();
  if (a.length && a.length == 2) {
    let e = xConfig.lang;
    if (e) {
      let a = document.querySelector("[data-lang=\"" + e + "\"]");
      if (a) {
        a.style.background = "";
      }
    }
    if (!(xConfig.cookies & 2)) {
      setCookie("lang", a);
      SetWeb("lang", a);
    }
    if (a == "en") {
      window.location.href = "//rxat.ro";
      return true;
    }
    let n = document.querySelector("[data-lang=\"" + a + "\"]");
    if (n) {
      n.style.background = lBackground;
    }
    xConfig.lang = a;
    localize();
    fetchPromo(true);
    if (Home) {
      clist(document.getElementById("xfeatured"), "p1", "xfeatured");
    }
    doToolTips(t);
  }
}
function setCookie(e, a, t) {
  let n = "";
  if (t) {
    const e = new Date();
    e.setTime(e.getTime() + t * 24 * 60 * 60 * 1000);
    n = "; expires=" + e.toUTCString();
  }
  document.cookie = e + "=" + (a || "") + n + "; path=/";
}
function getCookie(e) {
  var _0x1a1fe4 = e + "=";
  var _0x1cb9e9 = document.cookie.split(";");
  for (let e = 0; e < _0x1cb9e9.length; e++) {
    let a = _0x1cb9e9[e];
    while (a.charAt(0) == " ") {
      a = a.substring(1, a.length);
    }
    if (a.indexOf(_0x1a1fe4) == 0) {
      return a.substring(_0x1a1fe4.length, a.length);
    }
  }
  return null;
}
function getGET() {
  let e = window.location.href;
  let a = e;
  let t = "";
  let n = {};
  let o = "";
  let r = [];
  if (e.indexOf("#") > 0) {
    o = e.substr(e.indexOf("#") + 1);
    a = e = e.substr(0, e.indexOf("#"));
  }
  if (e.indexOf("?") > 0) {
    a = e.substr(0, e.indexOf("?"));
    r = (t = e.substr(e.indexOf("?") + 1)).split("&");
  }
  let i = o.split("&");
  o = i.shift();
  r = r.concat(i);
  for (let e = 0; e < r.length; e++) {
    let a = r[e].split("=");
    n[decodeURIComponent(a[0])] = decodeURIComponent(a[1]).replace(/[^0-9a-zA-Z_\-]/g, "");
  }
  let s = /\/\/([\w.-]*)/.exec(a);
  let l = s != null && s.length > 1 ? s[1] : "";
  return {
    hash: o,
    params: n,
    path: a = (s = /\/\/[\w.-]*(?:\/([^?]*))/.exec(a)) != null && s.length > 1 ? s[1] : "",
    host: l
  };
}
function setLogo() {
  let e = [];
  const a = new Date();
  const t = a.getDate();
  const n = a.getMonth() + 1;
  const o = a.getFullYear();
  const r = logoEvents.find(e => Array.isArray(e.month) ? e.month.includes(n) && t >= e.date[0] : e.month == n);
  if (r) {
    if (Array.isArray(r.date)) {
      if (Array.isArray(r.month)) {
        const a = new Date(o, r.month[0], r.date[0]).getTime();
        const i = new Date(o, n, t).getTime();
        const s = new Date(r.month[0] > r.month[1] ? o + 1 : o, r.month[1], r.date[1]).getTime();
        if (i >= a && i <= s) {
          e = r.logos;
        }
      } else {
        e = t >= r.date[0] && t <= r.date[1] ? r.logos : [];
      }
    } else {
      e = r.date == t ? r.logos : [];
    }
    if (e.length) {
      const a = "https://rxat.ro/images/logo/" + e[Math.floor(Math.random() * e.length)] + ".gif";
      let t = document.getElementById("navLogo");
      if (t) {
        t.src = a;
        t.style.paddingRight = "10px";
      }
    }
  }
}
function filter(e, a) {
  var t = a ? "[\\<>]" : "['\"<>&]";
  if (Array.isArray(e) || typeof e == "object") {
    for (let n in e) {
      if (typeof e != "object" && isNaN(e[n]) && e[n] && e[n] !== undefined) {
        if (a) {
          e[n] = decodeEntities(e[n]);
        }
        e[n] = e[n].replace(new RegExp(t, "gi"), "").replace(/\\/gi, "");
      }
    }
  } else if (isNaN(e) && e !== undefined) {
    if (a) {
      e = decodeEntities(e);
    }
    e = e.replace(new RegExp(t, "gi"), "").replace(/\\/gi, "");
  }
  return e;
}
function doSuccessMsg(e, a, t, n) {
  if (!e) {
    return false;
  }
  if (t == null) {
    t = true;
  }
  if (n == null) {
    n = "chats";
  }
  e.hide();
  e.html("");
  e.addClass("alert-success alertsuc");
  e.addClass("alert-dismissible");
  if (!e.hasClass("alert")) {
    e.addClass("alert");
  }
  e.removeClass("alert-danger alerterr");
  if (t) {
    let t = "<button class=\"close closesuc\" type=\"button\" data-hide=\"true\">×</button>";
    t += a;
    e.html(t);
  } else {
    let t = a;
    e.html(t);
  }
  e.show(100, function (a) {
    if (e.hasClass("d-none")) {
      e.removeClass("d-none");
    }
  });
  $("[data-hide]").off("click").on("click", function (e) {
    e.preventDefault();
    $(this).parent().addClass("d-none");
  });
  let o = ["buy"];
  if (n) {
    if (Array.isArray(n)) {
      for (let e in n) {
        o.push(n[e]);
      }
    } else {
      o.push(n);
    }
  }
  localize(n);
}
function doErrorMsg(e, a, t, n) {
  if (!e) {
    return false;
  }
  if (t == null) {
    t = true;
  }
  if (n == null) {
    n = "chats";
  }
  e.hide();
  e.html("");
  e.addClass("alert-danger alerterr");
  e.addClass("alert-dismissible");
  if (!e.hasClass("alert")) {
    e.addClass("alert");
  }
  e.removeClass("alert-success alertsuc");
  if (t) {
    let t = "<button class=\"close closeerr\" type=\"button\" data-hide=\"true\">×</button>";
    t += a;
    e.html(t);
  } else {
    let t = a;
    e.html(t);
  }
  e.show(100, function (a) {
    if (e.hasClass("d-none")) {
      e.removeClass("d-none");
    }
  });
  $("[data-hide]").off("click").on("click", function (e) {
    e.preventDefault();
    $(this).parent().addClass("d-none");
  });
  let o = ["buy"];
  if (n) {
    if (Array.isArray(n)) {
      for (let e in n) {
        o.push(n[e]);
      }
    } else {
      o.push(n);
    }
  }
  localize(n);
}
function calculateProp(e, a) {
  let t = 0;
  if (e < 600 || e >= 600) {
    t = a ? e + 164 : e - 164;
  }
  return t;
}
function getEmbed(e, a, t, n, o, r) {
  let i = "<iframe src=\"https://rxat.ro/embed/chat.php#id=%CHAT_ID%&gn=%CHAT_NAME%\" width=\"%CHAT_WIDTH%\" height=\"%CHAT_HEIGHT%\" frameborder=\"0\" scrolling=\"no\"></iframe>";
  i += "<br><small><a target=\"_BLANK\" href=\"https://rxat.ro/web_gear/chat/embed.php?id=%CHAT_ID%&GroupName=%CHAT_NAME%\">Get %CHAT_NAME% chat group</a> | ";
  i = (i += "<a target=\"_BLANK\" href=\"https://rxat.ro/%CHAT_NAME%\"> Goto %CHAT_NAME% website</a></small><br>").replace(/%CHAT_NAME%/gi, e).replace(/%CHAT_ID%/gi, a).replace(/%CHAT_WIDTH%/gi, t).replace(/%CHAT_HEIGHT%/gi, n);
  if (o) {
    document.getElementById("embedpreview").innerHTML = i;
  }
  if (r) {
    document.getElementById("embedpreview").innerHTML = "<span data-localize='chats.nopreview' class='prevbig'>Chat size too big to preview</span>";
    setTimeout(function () {
      document.getElementById("embedpreview").innerHTML = "";
    }, 3000);
  }
  localize(["chats"]);
  return i;
}
function getRealHash() {
  let e = location.hash;
  if (e) {
    if ((e = e.substr(2)).indexOf("&") >= 0) {
      if ((e = (e = e.split("&"))[0]) && e.indexOf("=") >= 0) {
        return (e = e.split("="))[0];
      } else {
        return e;
      }
    } else {
      return e;
    }
  } else {
    return "";
  }
}
function doRealHash(e, a) {
  let t = a;
  if (e.indexOf("&") >= 0) {
    delete (e = e.split("&"))[0];
    t += e = e.join("&");
  }
  return t;
}
function decodeEntities(e) {
  return e.replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
document.addEventListener("scroll", debounce(storeScroll));
storeScroll();
let staticnav = "<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\"><ul class=\"navbar-nav ml-auto mobpad\"><li class=\"nav-item\"><a id=\"newStf\" target=\"_blank\" class=\"nav-link d-none\" href=\"https://util.rxat.ro/wiki/news\"><img class=\"newstfic\" src=\"" + dir + "/img/navbar/pointing.svg\" alt=\"pointing\" width=\"35\"><button type=\"button\" class=\"btn btn-primary btn-sm newstfbut\"><span data-localize=\"web.newstf\">new stuff!</span><span id=\"newV\"></span></button></a></li><li class=\"nav-item\"><a id=\"meView\" class=\"nav-link dropdown-toggle d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/xatme.svg\" alt=\"edit\" width=\"16\"><span>me.rxat.ro</span></a></li><li class=\"nav-item\"><a id=\"meEdit\" class=\"nav-link dropdown-toggle d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/pencil.svg\" alt=\"edit\" width=\"16\"><span data-localize=\"chats.edit\">edit</span></a></li><li class=\"nav-item\"><a id=\"meInapp\" class=\"nav-link dropdown-toggle d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\" width=\"17\"><span data-localize=\"web.inappropriate\">inappropriate</span></a></li><li class=\"nav-item dropdown\"><a id=\"navGroups\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/groups.svg\" alt=\"groups\"><span data-localize=\"web.groups\">groups</span></a><div id=\"navGroupsItems\" class=\"dropdown-menu\" aria-labelledby=\"navGroups\"><!--<a id=\"navGroupsFavorites\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/favorites.svg\" alt=\"favorites\"><span data-localize=\"web.favorites\">favorites</span></a>--><a id=\"navCreate\" class=\"dropdown-item\" href=\"//rxat.ro/create\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/community.svg\" alt=\"creategroup\"><span data-localize=\"web.create\">create</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsFeatured\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/featured.svg\" alt=\"featured\"><span data-localize=\"web.featured\">featured</span></a><a id=\"navGroupsPopular\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/popular.svg\" alt=\"popular\"><span data-localize=\"web.popular\">popular</span></a><!--<a id=\"navGroupsSites\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/sites.svg\" alt=\"sites\"><span data-localize=\"web.sites\">sites</span></a>--><a id=\"navGroupsSupported\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/supported.svg\" alt=\"supported\"><span data-localize=\"web.supported\">supported</span></a><a id=\"navGroupsGames\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/games.svg\" alt=\"groups\"><span data-localize=\"web.games\">games</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsSearch\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/search.svg\" alt=\"search\"><span data-localize=\"web.search\">search</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsHelp\" class=\"dropdown-item\" href=\"https://rxat.ro/web_gear/chat/chats.php?v=yHv2&type=help\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/help.svg\" alt=\"help\"><span data-localize=\"web.help\">help</span></a><a id=\"navGroupsTrade\" class=\"dropdown-item\" href=\"https://rxat.ro/web_gear/chat/chats.php?v=yHv2&type=trade\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/trade.svg\" alt=\"trade\"><span data-localize=\"web.trade\">trade</span></a></div></li><li class=\"nav-item dropdown\"><a id=\"navStore\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/store.svg\" alt=\"store\"><span data-localize=\"web.store\">store</span></a><div class=\"dropdown-menu showxsbef\" aria-labelledby=\"navStore\"><a id=\"navStoreBuyXats\" class=\"dropdown-item\" href=\"../src/store.html#buy\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/buyxats.svg\" alt=\"buyxats\"><span data-localize=\"web.buyxats\">buy xats &amp; days</span></a><div class=\"dropdown-divider\"></div><a id=\"navStorePowers\" class=\"dropdown-item\" href=\"../src/store.html#powers\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/powers.svg\" alt=\"powers\"><span data-localize=\"web.powers\">powers</span></a><a id=\"navStoreShortName\" class=\"dropdown-item\" href=\"../src/store.html#shortname\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/shortname.svg\" alt=\"shortname\"><span data-localize=\"web.shortname\">short name</span></a><a id=\"navStoreAuctions\" class=\"dropdown-item\" href=\"../src/store.html#auctions\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/auctions.svg\" alt=\"auctions\"><span data-localize=\"web.auctions\">auctions</span></a><a id=\"navStorePromotion\" class=\"dropdown-item\" href=\"../src/store.html#promotion\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/promotion.svg\" alt=\"promotion\"><span data-localize=\"web.promotion\">promotion</span></a><a id=\"navStoreAds\" class=\"dropdown-item\" href=\"../src/store.html#ads\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/ads.svg\" alt=\"ads\"><span data-localize=\"web.ads\">ads</span></a><a id=\"navStoreBuyGroup\" class=\"dropdown-item\" href=\"../src/store.html#groups\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/buygroup.svg\" alt=\"group\"><span data-localize=\"web.buygroup\">groups</span></a></div></li><li class=\"nav-item dropdown\"><a id=\"navxat\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0\" src=\"" + dir + "/img/xatplanet.svg\" alt=\"ixat\"><span data-localize=\"web.xat\">ixat</span></a><div class=\"dropdown-menu showxslast\" aria-labelledby=\"navxat\"><a id=\"navxatApps\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/apps.svg\" alt=\"wiki\"><span data-localize=\"web.apps\">apps</span></a><a id=\"navxatWiki\" class=\"dropdown-item\" href=\"//rxat.ro/wiki\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/wiki.svg\" alt=\"wiki\"><span data-localize=\"web.wiki\">wiki</span></a><a id=\"navxatForum\" class=\"dropdown-item\" href=\"//rxat.ro/forum\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/popular.svg\" alt=\"forum &amp; forum\"><span data-localize=\"web.forum\">forum</span></a><a id=\"navxatSupport\" class=\"dropdown-item\" href=\"//rxat.ro/support\"><img class=\"mr-2 grlsupport\" src=\"" + dir + "/img/navbar/support.svg\" alt=\"support\"><span data-localize=\"web.support\">support</span></a><a id=\"navxatTicket\" class=\"dropdown-item\" href=\"//rxat.ro/ticket\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/ticket.svg\" alt=\"open ticket\"><span data-localize=\"web.ticket\">ticket</span></a><a id=\"navxatTwitter\" class=\"dropdown-item\" href=\"//rxat.ro/twitter\" rel=\"noopener\" target=\"_blank\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/twitter.svg\" alt=\"ixat twitter\"><span data-localize=\"web.twitter\">twitter</span></a><a id=\"navxatFacebook\" class=\"dropdown-item\" href=\"//rxat.ro/facebook\" rel=\"noopener\" target=\"_blank\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/facebook.svg\" alt=\"ixat facebook\" width=\"20\"><span data-localize=\"web.facebook\">facebook</span></a><a id=\"navxatInstagram\" class=\"dropdown-item\" href=\"//rxat.ro/instagram\" rel=\"noopener\" target=\"_blank\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/instagram.svg\" alt=\"ixat instagram\" width=\"19\"><span>instagram</span></a><a id=\"navxatHtml5\" class=\"dropdown-item h5logs\" href=\"https://util.rxat.ro/wiki/HTML5\"><img class=\"mr-2\" width=\"25\" src=\"" + dir + "/img/navbar/html5.svg\" alt=\"changelogs\"><span data-localize=\"web.changelogs\" class=\"h5logsicon\">changelogs</span></a><div class=\"dropdown-divider\"></div><a id=\"navxatPrivacy\" class=\"dropdown-item showxs\" href=\"#\" data-toggle=\"modal\" data-target=\"#privacyModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/privacy.svg\" alt=\"privacy\"><span data-localize=\"web.privacy\">privacy/cookies</span></a><a id=\"navxatTerms\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#termsModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/terms.svg\" alt=\"terms\"><span data-localize=\"web.terms\">terms of service</span></a><a id=\"navxatSafety\" class=\"dropdown-item\" href=\"//rxat.ro/safety\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/safety.svg\" alt=\"safety\"><span data-localize=\"web.safety\">safety</span></a><span class=\"d-none\" id=\"date\"></span><!--<div class=\"dropdown-divider\"></div><a id=\"navGroupFlashback\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/flashback.svg\" alt=\"flashback\"><span data-localize=\"web.flashback\">flashback</span></a>--></div></li><li id=\"rankdrop\" class=\"nav-item dropdown\"><a id=\"navGroup\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/group.svg\" alt=\"group\"><span data-localize=\"web.group\">group</span></a><div class=\"dropdown-menu\" aria-labelledby=\"navGroup\"><!--<a id=\"navGroupTimeline\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/timeline.svg\" alt=\"timeline\"><span data-localize=\"web.timeline\">timeline</span></a>--><!--<div class=\"dropdown-divider\"></div>--><a id=\"navEmbedGrp\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#embedmodal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/embed2.svg\" alt=\"embed\" width=\"19\"><span data-localize=\"web.embed\">embed</span></a><a id=\"navGroupEvents\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/events.svg\" alt=\"events\"><span data-localize=\"web.events\">events</span></a><a id=\"navCustomize\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/customize.svg\" alt=\"customize\"><span data-localize=\"web.customize\">customize</span></a><a id=\"navSendMessage\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#msgModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/message.svg\" alt=\"message\"><span data-localize=\"web.message\">send message</span></a><a id=\"navInapp\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#inappModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\"><span data-localize=\"web.inappropriate\">inappropriate</span></a><a id=\"navIframe\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#iframeModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/xatframe.svg\" alt=\"ixatframe\" width=\"21\"><span class=\"h5logs\">ixatframe</span></a></div></li><li id=\"admindrop\" class=\"nav-item dropdown d-none\"><a id=\"navGroup2\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/group.svg\" alt=\"group\"><span data-localize=\"web.group\">group</span></a><div class=\"dropdown-menu\" aria-labelledby=\"navGroup2\"><h6 class=\"dropdown-header text-center p-0\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\">Main Owner</h6><div class=\"dropdown-divider\"></div><!--<a id=\"navGroupTimeline2\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/timeline.svg\" alt=\"timeline\"><span data-localize=\"web.timeline\">timeline</span></a>--><!--<div class=\"dropdown-divider\"></div> +--><!-- <a class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/customize.svg\" alt=\"customize\"><span data-localize=\"web.customize\">customize</span></a><a id=\"navGroupEvents\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/events.svg\" alt=\"events\"><span data-localize=\"web.events\">events</span></a> (MOVED UNDER \"GROUP\" for now)--><!--<a id=\"navGroupAffiliate\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/affiliate.svg\" alt=\"affiliate\"><span data-localize=\"web.affiliate\">affiliate</span></a>--><div class=\"dropdown-divider\"></div><a id=\"navGroupEmbed\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#embedModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/embed.svg\" alt=\"embed\"><span data-localize=\"web.embed\">embed</span></a><!--<a id=\"navGroupMessage\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#sendModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/message.svg\" alt=\"message\"><span data-localize=\"web.message\">send message</span></a>--><a id=\"navGroupInappropriate\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#inappModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\"><span data-localize=\"web.inappropriate\">inappropriate</span></a></div></li><li id=\"accountdrop\" class=\"nav-item dropdown d-none\"><a id=\"navAccount\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.account\">account</span><span id=\"navAccountBadge\" class=\"badge badge-pill badge-primary align-text-top ml-1 mr-1\"></span></a><div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navAccount\"><h6 id=\"navUsernameId\" class=\"dropdown-header text-center p-0\"></h6><div class=\"dropdown-divider\"></div><!--<a id=\"navAccountStream\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/stream.svg\" alt=\"stream\"><span data-localize=\"web.stream\">stream</span><span id=\"navStreamBadge\" class=\"badge badge-pill badge-primary align-text-top ml-1\">0</span></a>--><a id=\"navAccountxatme\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/xatme.svg\" alt=\"ixat me\">me.rxat.ro</a><a id=\"navAccountedit\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2 xsme\" src=\"" + dir + "/img/navbar/pencil2.svg\" alt=\"edit\"><span data-localize=\"web.edit\">edit</span></a><a id=\"navSettings\" class=\"dropdown-item\" href=\"../src/login.html#settings\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/settings.svg\" alt=\"settings\"><span data-localize=\"web.settings\">settings</span></a><div class=\"dropdown-divider\"></div><a id=\"navLogout\" class=\"dropdown-item\" href=\"../src/login.html#logout\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/logout.svg\" alt=\"logout\"><span data-localize=\"web.logout\">logout</span></a></div></li><li class=\"nav-item showxs\"><button id=\"navLogin\" class=\"btn btn-outline-primary btn-sm my-2 my-sm-0 mr-1\" type=\"button\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.login\">login</span></button><button id=\"navRegister\" class=\"btn btn-primary btn-sm my-2 my-sm-0 mr-1\" type=\"button\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.register\">register</span></button></li><li class=\"nav-item dropdown showxs\"><a id=\"navLang\" class=\"nav-link dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0 globe\" src=\"" + dir + "/img/navbar/globe.svg\" width=\"18\" alt=\"globe\"></a><div id=\"langdropdownitems\" class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navLang\"><!--<a class=\"dropdown-item\" href=\"#\">English <small>(English)</small></a>--></div></li></ul></div>";
let statnav = document.getElementById("statnav");
function addRemoveClass(e, a, t) {
  if (!e) {
    return;
  }
  let n = document.querySelector(e);
  if (n) {
    if (t) {
      return n.classList.remove(a);
    } else {
      return n.classList.add(a);
    }
  } else {
    return undefined;
  }
}
function createElement(e, a, t) {
  let n = document.createElement(a);
  n.id = t;
  e.appendChild(n);
  return n;
}
if (statnav) {
  statnav.innerHTML = staticnav;
}
var Trusted;
var didQuery = false;
function handlePopover() {
  $("[data-toggle=\"popover\"]").popover({
    trigger: "focus",
    html: true
  });
  if (!didQuery) {
    let a = document.querySelectorAll("[data-toggle=\"popover\"]");
    if (a.length > 0) {
      var e = [];
      a.forEach(function (a) {
        e.push(setTranslateDiv(a, "popover"));
      });
      if (e.length > 0 && xConfig.lang !== "en") {
        localize(["chats"]);
        updateNodeTranslate(e);
      }
    }
    didQuery = true;
  }
}
function initToolTip(e) {
  var a = [];
  if (e) {
    e.tooltip();
    a.push(setTranslateDiv(e[0] || e, "tooltips"));
  } else {
    $("[data-toggle=\"tooltip\"]").tooltip({
      trigger: "hover"
    });
    let e = document.querySelectorAll("[data-toggle=\"tooltip\"]");
    if (e.length > 0) {
      e.forEach(function (e) {
        a.push(setTranslateDiv(e, "tooltips"));
      });
    }
  }
  if (a.length > 0 && xConfig.lang !== "en") {
    localize(["chats"]);
    updateNodeTranslate(a);
  }
}
function setTranslateDiv(e, a) {
  let t;
  let n;
  let o = e.dataset;
  if (o && !e.contains(document.getElementById(a))) {
    let r = document.createElement("div");
    e.appendChild(r);
    if (o.content) {
      (t = createElement(r, "div", "content")).innerHTML = o.content;
    }
    if (o.originalTitle) {
      (n = createElement(r, "div", "originalTitle")).innerHTML = o.originalTitle;
    }
    r.id = a;
    r.className = "d-none";
    return [e, t, n];
  }
}
function updateNodeTranslate(e) {
  if (!e) {
    return false;
  }
  for (let a in e) {
    if (e[a][1]) {
      e[a][0].setAttribute("data-content", e[a][1].innerHTML);
    }
    if (e[a][2]) {
      e[a][0].setAttribute("data-original-title", e[a][2].innerHTML);
    }
  }
}
function SafeImage(e, a, t, n) {
  if (e.length == 0) {
    return "";
  }
  var o = parse_url(e);
  if (!o && !(o = parse_url(e = e.charAt(0) == "/" ? "https:" + e : "https://" + e))) {
    return "";
  }
  if (!o.host) {
    return "";
  }
  if (o.host.indexOf("rxat.ro") >= 0 && (o.path.indexOf("GetImage") > 0 || o.path.indexOf("/chat/av/") >= 0)) {
    return e;
  }
  if (a > 0 && t > 0 && a == t && !n) {
    a = t = calcAvSize(a);
  }
  let r = "s&U=" + e;
  if (a > 0) {
    r += "&W=" + a;
  }
  if (t > 0) {
    r += "&H=" + t;
  }
  if (n) {
    r += "&g";
  }
  return "https://rxat.ro/web_gear/chat/GetImage7.php?" + r;
}
function parse_url(e, a) {
  var t = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var n = {};
  var o = n["phpjs.parse_url.mode"] && n["phpjs.parse_url.mode"].local_value || "php";
  var r = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var i = r[o].exec(e);
  var s = {};
  for (var l = 14; l--;) {
    if (i[l]) {
      s[t[l]] = i[l];
    }
  }
  if (a) {
    return s[a.replace("PHP_URL_", "").toLowerCase()];
  }
  if (o !== "php") {
    var d = n["phpjs.parse_url.queryKey"] && n["phpjs.parse_url.queryKey"].local_value || "queryKey";
    r = /(?:^|&)([^&=]*)=?([^&]*)/g;
    s[d] = {};
    (s[t[12]] || "").replace(r, function (e, a, t) {
      if (a) {
        s[d][a] = t;
      }
    });
  }
  delete s.source;
  return s;
}
function isColorLight(e) {
  let a;
  let t;
  let n;
  let o;
  return !!e && (e.match(/^rgb/) ? (a = (e = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], t = e[2], n = e[3]) : (a = (e = +("0x" + e.slice(1).replace(e.length < 5 && /./g, "$&$&"))) >> 16, t = e >> 8 & 255, n = e & 255), (o = Math.sqrt(a * a * 0.299 + t * t * 0.587 + n * n * 0.114)) > 127.5);
}
function calcAvSize(e) {
  if (e <= 30) {
    return 30;
  } else if (e <= 35) {
    return 35;
  } else if (e <= 80) {
    return 80;
  } else if (e == 100) {
    return 100;
  } else if (e <= 160) {
    return 160;
  } else if (e <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function GetTimeToGo(e, a) {
  if (e == 0) {
    return "";
  }
  let t = Math.floor((new Date() - e) / 1000);
  if ((t = parseInt(t)) <= 0) {
    return ["tools.justnow", "just now"];
  } else if (t < 60) {
    return ["tools.secsago", "$1 secs ago", t];
  } else if (t < 120) {
    return ["tools.minago", "$1 min ago", 1];
  } else if (t < 3600) {
    return ["tools.minsago", "$1 mins ago", parseInt(t / 60)];
  } else if (t < 86400) {
    return ["tools.hoursago", "$1 hours ago", parseInt(t / 3600)];
  } else if (a) {
    return new Date(e).toUTCString();
  } else {
    return ["tools.daysago", "$1 days ago", parseInt(t / 86400)];
  }
}
function bodyCursor(e) {
  return document.body.style.cursor = e;
}
function updateFileName(e, a, t) {
  var n = a ? "" : e.val().split("\\").pop();
  n = filter(n);
  let o = e.siblings(".custom-file-label").html();
  if (a) {
    n = e.data("html") || "";
  } else {
    e.attr("data-html", o);
  }
  e.siblings(".custom-file-label").addClass("selected").html(n);
}
function doDownload(e, a) {
  let t = document.createElement("a");
  t.href = "data:text/plain;charset=utf-8," + e;
  t.setAttribute("download", a);
  t.style.display = "none";
  document.body.appendChild(t);
  t.click();
  document.body.removeChild(t);
}
function uploadFile(e, a) {
  let t = new FileReader();
  t.onload = function (e) {
    a(e.target.result);
  };
  t.readAsText(e);
}
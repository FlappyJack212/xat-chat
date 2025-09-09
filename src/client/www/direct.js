"use strict";

let LastApp;
let sideFrame;
let lcFrame;
let sbe;
let directListener = [];
let boxdir = "box";
let captcha = false;
let iframeStorage = "iframe_v2";
// Use global variables
var directDefaultwidth = window.directDefaultwidth || 650;
var directDefaultheight = window.directDefaultheight || 486;
let directUpdate = null;
let cn = Math.floor(Math.random() * Math.floor(2147483647));
let trace = console.log;
let shimFrame = document.getElementById("shim");
let appID = 0;
n = GET.params.n;
n ||= GET.path;
n ||= "xat_test";
switch (json?.type) {
  case "home":
    Home = 1;
    break;
  default:
    Direct = 1;
}
function newstuff(e) {
  var _0x4dcd30 = new Date(2021, 5, 16, 0, 0, 0, 0);
  var _0x16ab0e = new Date(2021, 5, 29, 0, 0, 0, 0);
  let t = document.querySelector("#newStf");
  let n = document.querySelector("#newV");
  var o;
  var a;
  if (_0x4dcd30 <= e && e <= _0x16ab0e) {
    if (t != null && (o = t.classList) != null) {
      o.remove("d-none");
    }
    n.innerHTML += " <small>(v1.55)</small>";
  } else if (t != null && (a = t.classList) != null) {
    a.add("d-none");
  }
}
function loadHash(e) {
  if (!Home) {
    return;
  }
  let t = e || location.hash;
  if (t && ["featured", "popular", "supported", "games"].indexOf(t) >= 0 && location.hash.length > 0) {
    let e = document.querySelector("#groups");
    if (e) {
      e.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
function DoSendMessage(e) {
  e.preventDefault();
  let t = $("#sendmsgerr");
  let n = document.querySelector("#sendmsg");
  let o = document.querySelector("#createcap");
  let a = xConfig.gn;
  let i = {};
  let l = document.querySelector("#sndemail");
  let r = document.querySelector("#sndfeedback");
  t.addClass("d-none");
  i.GroupName = filter(a);
  i.email = filter(l == null ? undefined : l.value);
  i.feedback = filter(r == null ? undefined : r.value);
  i.submit = "Send";
  if (captcha) {
    i["g-recaptcha-response"] = grecaptcha.getResponse();
  }
  bodyCursor("wait");
  urlPost("https://rxat.ro/web_gear/chat/ownerfeedback2.php", filter(i)).then(function (e) {
    var a;
    var i;
    var l;
    var r;
    bodyCursor("default");
    allErrsOff();
    if (o != null && (a = o.classList) != null) {
      a.remove("d-none");
    }
    if (e.Err.captcha) {
      captcha = true;
      AddCap("createcap");
      if (o != null && (l = o.classList) != null) {
        l.add("capspace");
      }
      return;
    }
    if (e.Err.ownerfeedback) {
      n.reset();
      doSuccessMsg(t, "<span data-localize=\"web.msgsent\">Your message has been sent.</span>", true);
      if (o != null && (r = o.classList) != null) {
        r.add("d-none");
      }
    } else {
      DoErrs(e);
    }
    captcha = false;
    if (o != null && (i = o.classList) != null) {
      i.remove("capspace");
    }
    localize(["chat", "web", "chats"]);
  });
}
function doEmbed() {
  if (directListener.embed) {
    return;
  }
  $("#embedmodal").modal();
  let e = document.querySelector("#embed_width");
  let t = document.querySelector("#embed_height");
  let n = document.querySelector("#embed_code");
  let o = $("#copy");
  let a = 0;
  let i = 0;
  let l = xConfig.gn;
  let r = xConfig.gid;
  let s = document.querySelector("#notrecomW");
  let d = document.querySelector("#notrecomH");
  let c = document.querySelector("#embFooter");
  let u = document.querySelector("#preview");
  t.value = directDefaultheight;
  e.value = directDefaultwidth;
  n.innerHTML = getEmbed(l, r, directDefaultwidth, directDefaultheight);
  [e, t].forEach(o => {
    if (o != null) {
      o.addEventListener("keydown", () => {
        clearTimeout(directUpdate);
      });
    }
    if (o != null) {
      o.addEventListener("keyup", u => {
        if (c != null) {
          c.classList.add("d-none");
        }
        clearTimeout(directUpdate);
        directUpdate = setTimeout(function () {
          _0x5cedf0 = o.id;
          let g = _0x5cedf0 == "embed_width" ? 600 : 465;
          let m = u.target.value;
          if (isNaN(m) || m > 2000 || m < g) {
            m = _0x5cedf0 == "embed_width" ? directDefaultwidth : directDefaultheight;
            if (_0x5cedf0 == "embed_width") {
              if (s != null) {
                s.classList.remove("d-none");
              }
              if (e != null) {
                e.classList.add("inpshake");
              }
              setTimeout(function () {
                if (e != null) {
                  e.classList.remove("inpshake");
                }
              }, 1000);
              setTimeout(function () {
                if (s != null) {
                  s.classList.add("d-none");
                }
              }, 3000);
            } else {
              if (d != null) {
                d.classList.remove("d-none");
              }
              if (t != null) {
                t.classList.add("inpshake");
              }
              setTimeout(function () {
                if (t != null) {
                  t.classList.remove("inpshake");
                }
              }, 1000);
              setTimeout(function () {
                if (d != null) {
                  d.classList.add("d-none");
                }
              }, 3000);
            }
          }
          if (c != null) {
            c.classList.remove("d-none");
          }
          m = parseInt(m);
          a = _0x5cedf0 == "embed_width" ? m : calculateProp(m, false);
          i = _0x5cedf0 == "embed_height" ? m : calculateProp(m, false);
          e.value = a;
          t.value = i;
          n.innerHTML = _0x5cedf0 == "embed_width" ? getEmbed(l, r, m, i == 0 ? t.value : i) : getEmbed(l, r, a == 0 ? e.value : a, m);
        }, 1000);
      });
    }
  });
  o.tooltip({
    trigger: "click",
    placetop: "top"
  });
  o.off("click").on("click", function (e) {
    e.preventDefault();
    const t = document.getElementById("embed_code");
    t.select();
    t.setSelectionRange(0, 99999);
    document.execCommand("copy");
    o.tooltip("show");
    setTimeout(function () {
      o.tooltip("hide");
    }, 1000);
    localize(["chats"]);
  });
  if (u != null) {
    u.addEventListener("click", n => {
      a = a || e.value;
      i = i || t.value;
      if (a <= 650) {
        getEmbed(l, r, a, i, true);
      }
      if (a > 650) {
        getEmbed(l, r, a, i, false, true);
      }
    });
  }
  directListener.embed = true;
}
function main() {
  if (Direct) {
    var e;
    const closeColLeft = document.getElementById("closeColLeft");
    if (closeColLeft) {
      closeColLeft.classList.remove("d-none");
    }
    sideBut();
    if (document.body) {
      document.body.style.backgroundColor = "black";
    }
    handleSideBars();
    if ((e = document.querySelector("#navxatApps")) != null) {
      e.classList.add("d-none");
    }
  } else {
    if (document.body) {
      document.body.style.backgroundColor = "white";
    }
    document.getElementById("navLogo").src = "/www/svg/xatsat.svg";
    let e = document.querySelector("#rankdrop");
    if (e != null) {
      e.classList.remove("d-block");
    }
    if (e != null) {
      e.classList.add("d-none");
    }
  }
  newstuff(new Date());
  setupConsoleLogging();
  initLanguage();
  initAuser3();
  setLogo();
  if (xConfig.debugMainTemplate) {
    let e = "";
    let t = document.createElement("style");
    t.appendChild(document.createTextNode(e));
    document.head.insertBefore(t, null);
    let n = "";
    document.body.innerHTML = n;
  }
  readUser();
  fetchPromo().then(function (e) {
    if (!Direct && e) {
      xConfig.gn = e.n;
      xConfig.debugBox = "box/embed.html?n=" + e.n;
      if (Home) {
        doHome(e);
      }
    }
    fetchGroupData().then(function () {
      localize();
      lookupForEmbed();
    });
  });
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
  if (xConfig.debugMainOwner) {
    directConfig("mainowner");
  }
  if (Direct) {
    directConfig("background");
  }
  directConfig("landscape");
  navClickHandlers();
  window.addEventListener("message", onMessage, false);
  if (xConfig.debugWorkbox && "serviceWorker" in navigator) {
    window.addEventListener(" load ", () => {
      navigator.serviceWorker.register(" / sw.js ");
    });
  }
  try {
    if (!(xConfig.cookies & 2)) {
      t = window;
      n = document;
      " script ";
      " ga ";
      t.GoogleAnalyticsObject = " ga ";
      t.ga = t.ga || function () {
        (t.ga.q = t.ga.q || []).push(arguments);
      };
      t.ga.l = new Date() * 1;
      o = n.createElement(" script ");
      a = n.getElementsByTagName(" script ")[0];
      o.async = 1;
      o.src = " https: //www.google-analytics.com/analytics.js";
      a.parentNode.insertBefore(o, a);
      ga("create", "UA-165559524", "auto");
      ga("send", "pageview");
    }
  } catch (e) {}
  var t;
  var n;
  var o;
  var a;
  let i = {
    30008: "trade",
    20010: "fourinrow",
    60002: "canvas",
    10001: "media",
    20047: "xavi"
  };
  var l;
  var r;
  window.setTimeout(() => {
    let e = new URLSearchParams(window.location.search).get("open");
    if (e && i.hasOwnProperty(e)) {
      startSide(i[e]);
    }
  }, 1500);
  if (window.innerWidth < 450) {
    if ((l = document.querySelector("#promoframe")) != null && (r = l.classList) != null) {
      r.remove("d-none");
    }
  }
  let s = document.getElementById("copyrightyear");
  if (s) {
    s.appendChild(document.createTextNode(new Date().getFullYear()));
  }
  let d = document.getElementById("navEmbedGrp");
  if (d) {
    d.addEventListener("click", doEmbed);
  }
  let c = document.getElementById("navEmbedBottom");
  if (c) {
    c.addEventListener("click", doEmbed);
  }
  let u = document.getElementById("sendmsg");
  if (u) {
    u.addEventListener("submit", DoSendMessage);
  }
  let g = document.querySelector("#navIframe");
  if (g) {
    g.addEventListener("click", doIframeModal);
  }
  localize(["chat", "web", "chats"]);
}
function lookupForEmbed() {
  let e = getGET();
  if (e.hash) {
    return e.hash == "!embed" && doEmbed();
  }
}
function handleSideBars() {
  let e = document.querySelector(".sidebar");
  let t = document.querySelectorAll("[data-app]");
  if (t.length > 0) {
    t.forEach(t => {
      t.addEventListener("click", t => {
        if (t.target.nodeName == "IMG") {
          t = t.target.parentElement || t.target.parentNode;
        }
        let n = t.target.dataset || t.dataset;
        if (n &&= n.app) {
          switch (n) {
            case "media":
              startSide("media", null, null, null);
              break;
            case "xavi":
            case "snakerace":
              startSide(n, 0, 600);
              break;
            default:
              startSide(n, 0);
              if (n == "apps") {
                e.classList.add("d-none");
              }
          }
        }
      });
    });
  }
}
function fetchGroupData() {
  return new Promise((e, t) => {
    if (xConfig.debugJsonGroup) {
      const e = JSON.parse(document.getElementById("xjson").innerHTML);
      if (e.id !== undefined && e.g !== undefined && e.d !== undefined && e.a !== undefined) {
        xConfig.gid = e.id;
        xConfig.gn = e.g == null ? "xat" : e.g;
        xConfig.gd = e.d.replace(/\\u00A0/g, "");
        xConfig.type = e.t;
        xConfig.background = e.gb;
        xConfig.tabs = e.tabs;
        if (e.g == null) {
          xConfig.groupNoName = true;
        }
        updatePage();
      } else {
        console.error("invalid embedded json");
      }
    } else {
      if (xConfig.debugFetchGroup) {
        let t;
        let n = "https://rxat.ro/web_gear/chat/roomid.php?d=" + xConfig.gn;
        if (t = GET.params.cb) {
          n += "&cb=" + t;
        }
        fetch(n).then(function (e) {
          return e.json();
        }).then(function (t) {
          if (t.id !== undefined && t.g !== undefined && t.d !== undefined && t.a !== undefined) {
            xConfig.gid = t.id;
            xConfig.gn = t.g == null ? "xat" : t.g;
            xConfig.gd = t.d.replace(/\\u00A0/g, "");
            xConfig.type = t.t;
            xConfig.background = t.gb;
            xConfig.if = t.if || false;
            if (t.g == null) {
              xConfig.groupNoName = true;
            }
            let e = guessIfXatFrame();
            if (t.if && e) {
              let e = document.querySelector("#groupBackgroundFrame");
              if (e) {
                e.src = t.if;
              }
              displayXatFrameAlert();
            } else {
              xConfig.background = t.gb;
            }
            xConfig.tabs = t.tabs;
            if (GET.params.x && Direct && t.a) {
              let e = t.a.split(";=");
              xConfig.chatBg = e[0] || "";
            }
            let n = t.a ? t.a.split(";=") : [];
            let o = n[8];
            let a = n[9];
            let i = n[10];
            let l = n[11];
            let r = n[12];
            let s = t[636] ? t[636] : "";
            if (!Home) {
              if (s && s >= 1) {
                let e = document.getElementById("setflag");
                if (o && e) {
                  e.classList.remove("d-none");
                  e.src = o == "ixat" ? "https://rxat.ro/images/smw/flag.png" : "https://rxat.ro/images/smw/flag/" + o + ".png";
                  if (a) {
                    e.title = a;
                  }
                }
                let t = document.getElementById("navTop").style;
                let n = document.getElementById("navBottom").style;
                if (i == "navdefault") {
                  t.cssText = "background: linear-gradient(#040404, #191919)";
                  n.cssText = "background: linear-gradient(#040404, #191919) !important";
                } else if (i == "navplanet") {
                  t.cssText = "background: linear-gradient(#006279, #02a9d2)";
                  n.cssText = "background: linear-gradient(#007a97, #02a9d2) !important";
                } else if (i == "navspace") {
                  t.cssText = "background: linear-gradient(#000011, #053d5c)";
                  n.cssText = "background: linear-gradient(#000011, #053d5c) !important";
                }
              }
              if (s && s >= 2 && l) {
                document.getElementById("groupName").style.fontFamily = l;
                document.getElementById("groupDescription").style.fontFamily = l;
              }
              if (s && s >= 3 && r) {
                document.getElementById("groupName").style.textShadow = "1px 1px 5px" + r + ", 1px 1px 5px" + r;
                document.getElementById("groupDescription").style.textShadow = "1px 1px 5px" + r + ", 1px 1px 5px" + r;
              }
            }
            updatePage();
          } else {
            console.error("invalid fetched json");
          }
          e();
        });
        return;
      }
      xConfig.gid = 42;
      xConfig.gn = "phoenix";
      xConfig.gd = "arising from the ashes of its predecessor";
      xConfig.background = "http://i47.tinypic.com/34hdvrn.png";
    }
    e();
  });
}
function displayXatFrameAlert() {
  let e = localStorage.getItem("xatframe_declined");
  if (e && e == "1" || isMobile) {
    return;
  }
  let t = document.querySelector("#xatFrameSet");
  let n = document.querySelector("#xatframeAlert");
  let o = document.querySelector("#xatframe_alert_close");
  if (n != null) {
    n.classList.remove("d-none");
  }
  if (o) {
    o.addEventListener("click", e => {
      localStorage.setItem("xatframe_declined", "1");
    });
  }
  if (t) {
    t.addEventListener("click", doIframeModal);
  }
}
function guessIfXatFrame(e) {
  let t = getIndividualiFrames();
  let n = e || xConfig.gn;
  t.list ||= [];
  t.disabled ||= [];
  return t.list.indexOf(n) >= 0 || !(t.disabled.indexOf(n) >= 0) && (!!t.global || t.list.indexOf(n) != -1 && t.disabled.indexOf(n) != -1);
}
function updatePage() {
  document.documentElement.setAttribute("lang", xConfig.lang);
  if (Direct) {
    document.title = xConfig.gn;
    document.querySelector("meta[name=\"description\"]").setAttribute("content", xConfig.gd);
    if (xConfig.background) {
      if (xConfig.background.charAt(0) == "#") {
        document.body.style.background = xConfig.background;
      } else {
        document.body.style.backgroundImage = "url('" + SafeImage(xConfig.background) + "')";
      }
    }
    if (document.getElementById("groupName")) {
      document.getElementById("groupName").appendChild(document.createTextNode(xConfig.gn));
    }
    if (document.getElementById("groupDescription")) {
      document.getElementById("groupDescription").appendChild(document.createTextNode(xConfig.gd));
    }
  }
  if (Home) {
    document.querySelector("meta[name=\"description\"]").setAttribute("content", "rxat.ro is a fun social networking site, join a group, make friends, create your own ixat group");
    document.title = "ixat";
  }
  let e = document.getElementById("embedframe");
  if (e) {
    if (xConfig.chatBg && xConfig.chatBg.charAt(0) !== "#") {
      let t = document.createElement("img");
      t.width = 728;
      t.height = 486;
      t.src = xConfig.chatBg;
      e.classList.add("d-none");
      e.parentNode.insertBefore(t, e);
    } else {
      e.src = dir + "box/embed.html?n=" + xConfig.gn;
    }
  }
  if (Direct && document.getElementById("bottomNavGroupName")) {
    document.getElementById("bottomNavGroupName").appendChild(document.createTextNode(xConfig.gn));
  }
  readUser();
  setUser();
  if (Direct) {
    let e = document.querySelector("#navBottomTabs");
    let t = document.querySelector("#navBottom");
    e.innerHTML = "";
    if (xConfig.groupNoName || !xConfig.tabs || xConfig.tabs.length == 0 || xConfig.tabs.length == 1 && xConfig.tabs[0].label == "Comments") {
      if (t != null) {
        t.classList.add("d-none");
      }
    } else {
      let t;
      let n;
      if (xConfig.tabs !== undefined && xConfig.tabs.length > 0) {
        let o = xConfig.tabs;
        for (let a = 0; a < o.length; a++) {
          if (o[a].label == "Comments") {
            continue;
          }
          let i = String(o[a].url);
          if (i.search(/^http:\/\/[\.a-z]*rxat.ro\//) != -1) {
            i = i.replace("http:", "https:");
          }
          if ((i = i.replace("http://rxat.ro", "https://rxat.ro")) > 0) {
            i = "https://rxat.ro/web_gear/chat/media.php?d=" + xConfig.gn + "&p=" + (i - 1) + "&id=" + xConfig.gid;
          }
          if (n = GET.params.cb) {
            i += "&cb=" + n;
          }
          createTab({
            navBottom: e,
            index: a,
            url: i,
            json: o[a]
          });
          if (localStorage.getItem("TabsClosed") == 0 && a == 0) {
            t = tabPress(0, i, 1);
          }
        }
      }
      createTab({
        navBottom: e,
        url: "close",
        json: {
          label: "close"
        },
        close: t
      });
    }
  }
  if (xConfig.debugTooltips) {
    $(function () {
      $("[data-toggle=\"tooltip\"]").tooltip({
        trigger: "hover"
      });
    });
  }
  legacyLinks();
  cookieBar();
}
function createTab(e) {
  let t = makeElement(e.navBottom, "li", "nav-item");
  let n = makeElement(t, "a");
  n.className = "nav-link" + (e.url == "close" ? e.close ? "" : " d-none" : "");
  n.id = e.url == "close" ? "navClose" : "navTab" + e.index;
  n.href = "#/";
  n.dataset.url = e.url;
  n.addEventListener("click", tabPress);
  let o = makeElement(n, "img", "mr-1");
  o.src = xConfig.dir + "img/navbar/" + (e.url == "close" ? "close" : "userframe") + ".svg";
  o.alt = "userframe";
  n.innerHTML += e.json.label;
}
function tabPress(e, t, n) {
  var o;
  var a;
  var i;
  var l;
  t ||= e.target.dataset.url;
  if (!t) {
    return 0;
  }
  let r = document.querySelector("#navBottom");
  let s = document.querySelector("#navClose");
  let d = document.querySelector("#navBottomTabs");
  let c = document.querySelector("#groupUserFrame");
  let u = document.querySelector("#privacyGroupUrl");
  let g = document.querySelector("#privacyGroupFrame");
  localStorage.setItem("TabsClosed", "0");
  if (t == "close") {
    var m;
    var f;
    var p;
    localStorage.setItem("TabsClosed", "1");
    if (document.getElementById("groupUserFrame")) {
      document.getElementById("groupUserFrame").src = "";
    }
    if (r != null && (m = r.classList) != null) {
      m.add("fixed-bottom");
    }
    if (s != null && (f = s.classList) != null) {
      f.add("d-none");
    }
    let e = d.querySelectorAll("[id^=\"navTab\"]");
    if (e.length) {
      e.forEach(e => {
        var t;
        if (e != null && (t = e.classList) != null) {
          t.remove("active");
        }
      });
    }
    if (c != null && (p = c.classList) != null) {
      p.add("d-none");
    }
    return 0;
  }
  let x = 0;
  var h;
  x = xConfig.cookies & 4;
  if (n && xConfig.type & 256) {
    x = 1;
  }
  x ||= t.search(/^https:\/\/rxat.ro\//) != -1;
  x ||= t.search(/^https:\/\/[a-z]*\.rxat.ro\//) != -1;
  x ||= t.search(/^https:\/\/rxat.ro\//) != -1;
  x ||= t.search(/^https:\/\/util.rxat.ro\//) != -1;
  x ||= t.search(/^https:\/\/[a-z]*\.util.rxat.ro\//) != -1;
  if (!n && !e) {
    x = 1;
  }
  if (e && !x) {
    u.innerText = t;
    if (g != null && (h = g.classList) != null) {
      h.remove("d-none");
    }
    $("#privacyModal").modal("show");
    return 0;
  } else if (x) {
    if (n || t.substr(0, 5) != "http:") {
      if (document.getElementById("groupUserFrame")) {
        document.getElementById("groupUserFrame").src = t;
      }
      if (r != null && (o = r.classList) != null) {
        o.remove("fixed-bottom");
      }
      if (s != null && (a = s.classList) != null) {
        a.remove("d-none");
      }
      if ((i = e.target) != null) {
        i.classList.add("active");
      }
      if (c != null && (l = c.classList) != null) {
        l.remove("d-none");
      }
      return 1;
    } else {
      window.open(t, "_blank");
      return 0;
    }
  } else {
    return 0;
  }
}
function sideBut(e) {
  const _0x9ef897 = document.getElementById("closeApp");
  let t = document.querySelector(".sidebar");
  if (_0x9ef897) {
    _0x9ef897.style.display = e ? "block" : "none";
  }
  if (_0x9ef897 && _0x9ef897.style.display == "none" && t) {
    t.classList.remove("d-none");
  }
  if (!sbe && _0x9ef897) {
    _0x9ef897.addEventListener("click", function () {
      startSide("");
    });
  }
  sbe = 1;
}
function startSide(e, t, n, o) {
  n ||= 425;
  if (shimFrame) {
    shimFrame.style.display = "none";
  }
  let a = xConfig.dir + "apps/" + e + "/" + e + ".html";
  if (o && e == "media") {
    a += "?link=" + o;
  } else if (o) {
    a += "#" + o;
  }
  if (e == "shim") {
    lcFrame = shimFrame;
    shimFrame.style.width = n + 16 + "px";
    shimFrame.style.display = "block";
    shimFrame.src = a;
    sideBut(1);
    return;
  }
  shimFrame.style.width = "16px";
  shimFrame.src = "";
  if (e === "") {
    if (sideFrame) {
      sideFrame.style.display = "none";
      sideFrame.src = "";
    }
    lcFrame = null;
    sideBut(0);
    appID = 0;
    return;
  }
  sideFrame = document.getElementById(t ? "rightsideframe" : "sideframe");
  lcFrame = sideFrame;
  if (sideFrame) {
    sideFrame.style.width = n + "px";
    sideFrame.style.display = "block";
    sideFrame.style.height = e == "media" ? "576px" : "600px";
    if (e === "fshim") {
      if (sideFrame.src == a) {
        sideFrame.contentWindow.postMessage(JSON.stringify({
          OpenByN: LastApp,
          cn: cn
        }), xConfig.origin);
      } else {
        sideFrame.src = a;
      }
    } else {
      let e = sideFrame.src.split("#");
      let t = a.split("#");
      sideFrame.src = a;
      if (e[1] == t[0]) {
        sideFrame.contentDocument.location.reload(true);
      }
    }
    sideBut(1);
  }
}
function onMessage(e) {
  if (e.origin !== xConfig.origin) {
    return;
  }
  let t = JSON.parse(e.data);
  if (t.action != "sideload") {
    if (t.tobox) {
      if (lcFrame && t.channel == 13) {
        lcFrame.style.width = (t.msg == 600 ? 600 : 425) + "px";
        return;
      } else {
        window.box.postMessage(e.data, xConfig.origin);
        return;
      }
    } else if (t.channel != "4" || lcFrame && appID == 20034 && t.msg.charAt(t.msg.length - 1) != "]") {
      if (lcFrame) {
        lcFrame.contentWindow.postMessage(e.data, xConfig.origin);
      }
      return;
    } else {
      t.channel = 10;
      t.msg = "";
      window.box.postMessage(JSON.stringify(t), xConfig.origin);
      return;
    }
  }
  if (t.o) {
    if (sideFrame) {
      sideFrame.src = "";
      sideFrame.style.display = "none";
    }
    let e = 425;
    if (t.i & 1) {
      e = 600;
    }
    appID = t.i;
    startSide("shim", 0, e);
    shimFrame.onload = function (e) {
      let n = t.i;
      if (t.f) {
        n = t.f;
      }
      if (shimFrame.parentElement) {
        shimFrame.parentElement.classList.remove("d-none");
      }
      shimFrame.contentWindow.postMessage(JSON.stringify({
        channel: "startUp",
        id: n,
        cn: cn
      }), xConfig.origin);
    };
    return;
  }
  if (t.n == "media") {
    startSide(t.n, null, null, t.l);
  } else if (t.n == "xavi" || t.i.toString().substr(0, 2) == "60") {
    startSide(t.n, 0, 600);
  } else {
    startSide(t.n, 0);
  }
}
function setupConsoleLogging() {
  console.log.bind(console);
  xConfig.name;
  xConfig.debugLogIgnore;
  console.log = function () {
    xConfig.debugNoLogs;
  };
  trace = console.log;
}
function SelectAll(e) {
  document.getElementById(e).focus();
  document.getElementById(e).select();
}
function xInt(e) {
  e = parseInt(e);
  if (isNaN(e)) {
    return 0;
  } else {
    return e;
  }
}
function xpromo(e, t) {
  let n = "\n    <a href=\"//rxat.ro/" + e + "\">" + e + "</a> \n        <small>(<span data-localize=\"index.notrun\">Note: this chat is not run by ixat</span>)</small><br>\n        <span data-localize=\"index.promotedgroups\">Promoted groups</span>: \n    ";
  for (let e in xConfig.xpromo) {
    n += "<a href=\"//rxat.ro/" + xConfig.xpromo[e].n + "\">" + xConfig.xpromo[e].n + "</a> | ";
  }
  let o = "\n\t\t<div class=\"col-12 mb-2\" id=\"mobpromo\">\n\t\t\t<div class=\"card h-100 border mb-2\">\n\t\t\t\t<a class=\"overlayLink\" href=\"https://rxat.ro/" + e + "\"></a>\n\t\t\t\t<div class=\"card-body p-2\">\n\t\t\t\t\t<img class=\"card-img-top img-fluid promoImg\" loading=\"lazy\" src=\"" + GetImageToNl(t) + "\" alt=\"" + e + "\">\n\t\t\t\t\t<div class=\"centered\"><img class=\"mb-1 mr-1 promostar\" width=\"19\" src=\"" + xConfig.dir + "img/navbar/star.svg\" alt=\"star\">" + e + "</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t";
  if (window.matchMedia("(max-width: 540px)").matches && isMobile) {
    document.querySelector(".hmemb").remove();
  }
  n += "<a href=\"//rxat.ro/promotion\"><span data-localize=\"index.promomine\">Promote my group</span></a>";
  document.querySelector("#promo").innerHTML = o + n;
}
function pmain() {
  let e = document.querySelector("#groups");
  let t = ["featured", "popular", "supported", "games"];
  let n = ["p1", "p2", "p3", "p4", "p5", "pp1", "pp2", "pp3", "pp4", "pp5"];
  let o = ["prev", "xprev", "next", "xnext"];
  for (let e in t) {
    let n = document.querySelector("#x" + t[e]);
    if (n != null) {
      n.addEventListener("click", e => {
        e.preventDefault();
        clist(e.currentTarget, "p1", e.currentTarget.id);
        location.hash = "#" + e.currentTarget.id.substr(1);
        return false;
      });
    }
  }
  for (let t in n) {
    let o = document.querySelector("#" + n[t]);
    if (o != null) {
      o.addEventListener("click", t => {
        t.preventDefault();
        clist(this, t.target.id);
        if (e != null) {
          e.scrollIntoView({
            behavior: "smooth"
          });
        }
        return false;
      });
    }
  }
  for (let t in o) {
    let n = document.querySelector("#" + o[t]);
    if (n != null) {
      n.addEventListener("click", t => {
        t.preventDefault();
        clist(this, t.currentTarget.id);
        if (e != null) {
          e.scrollIntoView({
            behavior: "smooth"
          });
        }
        return false;
      });
    }
  }
}
function prender() {
  if (xConfig.xlist) {
    xlist("#thumbs", xConfig.xlist);
  }
}
function pupdate() {
  if (xConfig.lang && xConfig.loadlist) {
    let e = "https://rxat.ro/json/lists/";
    if (xConfig.list == "games") {
      e += xConfig.list;
    } else {
      e += parseInt(xConfig.page) + "_" + (xConfig.loadlistfail ? "en" : xConfig.lang.substr(0, 2)) + "_" + xConfig.list;
    }
    e += ".php";
    fetch(e).then(function (e) {
      if (e.status === 200) {
        e.json().then(function (e) {
          xConfig.loadlist = false;
          xConfig.loadlistfail = false;
          xConfig.xlist = e;
          prender();
        });
      } else if (!xConfig.loadlistfail && xConfig.lang.substr(0, 2) != "en") {
        throw Error(e.status);
      }
    }).catch(function (e) {
      if (!xConfig.loadlistfail && xConfig.lang.substr(0, 2) != "en") {
        xConfig.loadlistfail = true;
        xConfig.loadlist = true;
        pupdate();
      }
    });
  }
}
function clist(e, t, n) {
  var o;
  var a;
  const i = {
    p1: 0,
    p2: 1,
    p3: 2,
    p4: 3,
    p5: 4,
    prev: "-",
    xprev: "-",
    next: "+",
    xnext: "+"
  };
  var l;
  var r;
  if (n != null) {
    if ((l = document.querySelector("#x" + xConfig.list)) != null && (r = l.classList) != null) {
      r.remove("active");
    }
    xConfig.list = n.substr(1);
    xConfig.page = 0;
  }
  if (t.substr(0, 2) == "pp") {
    t = t.substr(1);
  }
  if (i[t] == "+") {
    xConfig.page++;
  } else if (i[t] == "-") {
    xConfig.page--;
  } else {
    xConfig.page = i[t];
  }
  if (xConfig.page < 0) {
    xConfig.page = xConfig.numPages - 1;
  } else if (xConfig.page > xConfig.numPages - 1) {
    xConfig.page = 0;
  }
  if (e && e[0]) {
    e = e[0];
  }
  if ((o = e) != null && (a = o.classList) != null) {
    a.add("active");
  }
  $("#p" + (xConfig.page + 1)).parent().addClass("active").siblings().removeClass("active");
  $("#pp" + (xConfig.page + 1)).parent().addClass("active").siblings().removeClass("active");
  xConfig.loadlist = true;
  pupdate();
}
function GetImageToNl(e) {
  if (!e) {
    return xConfig.dir + "img/bluebox.png";
  }
  let t = e.split("&U=");
  if (t[1]) {
    if (t[1].charAt(0) == "#") {
      return xConfig.dir + "img/bluebox.png";
    }
    e = t[1];
  }
  return "https://images.weserv.nl/?output=jpg&w=200&h=134&q=80&t=absolute&url=" + encodeURIComponent(e) + "&default=" + xConfig.origin + xConfig.dir + "img/bluebox.png";
}
function xlist(e, t) {
  let n = "<div class=\"container-fluid p-0\"><div class=\"row ml-0 mr-0\">";
  let o = "groups";
  if (xConfig.list == "supported") {
    o = "supported";
  }
  if (["supported", "popular"].indexOf(xConfig.list) >= 0) {
    t = t.sort(function (e, t) {
      return t.n - e.n;
    });
  }
  if (t.length > 0) {
    for (let e in t) {
      if (t[e].l == null) {
        t[e].g = t[e].g.replace(/\s/g, "");
        n += "\n          <div class=\"col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4\">\n            <div class=\"card h-100\">\n              <a class=\"overlayLink\" href=\"/" + t[e].g + "\"></a>\n                            <div class=\"card-header text-center font-weight-bold text-truncate p-2\">" + t[e].g + "</div>\n              <div class=\"card-body p-2\">\n                <img class=\"card-img-top img-fluid mb-2\" loading=\"lazy\" src=\"" + GetImageToNl(t[e].a) + "\" alt=\"" + t[e].g + "\">\n                <p class=\"card-text\">" + t[e].d + (t[e].t != null ? "<br><b>(" + t[e].t + ")</b>" : "") + "</p>\n              </div>\n              <div class=\"card-footer bg-transparent p-2\">\n                <p class=\"card-text text-muted float-right\">" + t[e].n + "\n                  <img class=\"ml-1\" src=\"" + xConfig.dir + "img/navbar/" + o + ".svg\" alt=\"\">\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                ";
      } else {
        xConfig.numPages = t[e].l;
        for (let e = 1; e <= 5; e++) {
          let t = document.querySelector("#p" + e);
          let n = document.querySelector("#pp" + e);
          if (e > xConfig.numPages) {
            if (t != null) {
              t.classList.add("d-none");
            }
            if (n != null) {
              n.classList.add("d-none");
            }
          } else {
            if (t != null) {
              t.classList.remove("d-none");
            }
            if (n != null) {
              n.classList.remove("d-none");
            }
          }
        }
      }
    }
  }
  n += "</div></div>";
  document.querySelector(e).innerHTML = n;
  if (xConfig.list) {
    loadHash(xConfig.list);
  }
}
function doHome(e) {
  xpromo(e.n, e.a);
  xConfig.page = 0;
  let t = "featured";
  switch (GET.hash) {
    case "popular":
    case "promoted":
    case "supported":
    case "games":
      t = GET.hash;
  }
  t = "x" + t;
  clist(document.querySelector("#" + t), "p1", t);
  pmain();
}
function doIframeModal() {
  let e = xConfig.gn;
  let t = getIndividualiFrames();
  let n = document.querySelector("#groupsList");
  let o = document.querySelector("#groupListSpan");
  let a = document.querySelector("#iframeSave");
  let i = document.querySelector("#globalIframe");
  let l = document.querySelector("#IndividualIframe");
  t.disabled ||= [];
  t.list ||= [];
  i.checked = t.global;
  l.checked = guessIfXatFrame(e);
  if (t.list && t.list.length > 0) {
    n.classList.remove("d-none");
    o.innerHTML = t.list.join(", ");
  } else {
    n.classList.add("d-none");
  }
  a.addEventListener("click", n => {
    n.preventDefault();
    t.global = i.checked;
    if (t.list) {
      let n = t.list.indexOf(e);
      if (l.checked) {
        if (n == -1) {
          t.list.push(e);
          if (t.disabled && t.disabled.indexOf(e) >= 0) {
            t.disabled.splice(t.disabled.indexOf(e), 1);
          }
        }
      } else {
        if (t.list.indexOf(e) >= 0 && n !== -1) {
          t.list.splice(n, 1);
        }
        if (t.disabled && t.disabled.indexOf(e) == -1) {
          t.disabled.push(e);
        }
      }
    }
    localStorage.setItem(iframeStorage, JSON.stringify(t));
    updateIframe();
  });
  localize(["web", "chats"]);
}
function updateIframe() {
  let e = guessIfXatFrame();
  let t = document.querySelector("#groupBackgroundFrame");
  if (e) {
    if (xConfig.if && t) {
      t.setAttribute("src", xConfig.if);
    }
  } else {
    if (t) {
      t.removeAttribute("src");
    }
    if (xConfig.background) {
      if (xConfig.background.charAt(0) == "#") {
        document.body.style.background = xConfig.background;
      } else {
        document.body.style.backgroundImage = "url('" + xConfig.background + "')";
      }
    }
  }
}
function getIndividualiFrames() {
  let e = {
    global: true,
    list: [xConfig.gn],
    disabled: []
  };
  try {
    let t = localStorage.getItem(iframeStorage);
    if (t == null) {
      return e;
    } else {
      return t = JSON.parse(t);
    }
  } catch (t) {
    return e;
  }
  localize(["web", "chats"]);
}
if (!mDirect) {
  initConfig();
  main();
}
xConfig.debugBox = "box/embed.html?n=" + n;
xConfig.gn = n;
xConfig.debugNoLogs = true;
xConfig.debugFetchGroup = true;
xConfig.debugTooltips = true;
var prevSpos = window.pageYOffset;
window.onscroll = function () {
  var e = window.pageYOffset;
  let t = document.getElementById("navTop");
  if (window.matchMedia("(max-width: 992px)").matches) {
    t.style.top = prevSpos > e ? "0" : "-75px";
  }
  prevSpos = e;
};
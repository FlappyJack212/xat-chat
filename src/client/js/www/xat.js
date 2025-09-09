'use strict';

var DoneHiddenDivs;
var Language;
var isWEB;
var sendFunc;
var Classic;
var defconfig = {
  fake: 0,
  xtrace: 1,
  trace: 0,
  xatback: "XatBackground.jpg"
};
var config = defconfig;
var uniqueid = 1;
var ImageHash = {};
var iidLine = 1;
var LineVisible = 0;
var ImageMemory = 0;
var Seconds = 0;
var ThisPage = "";
var HiddenDivs = {};
var Animated = "s";
var Fac72 = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  6: 1,
  8: 1,
  9: 1,
  12: 1,
  18: 1,
  24: 1,
  36: 1,
  72: 1
};
var ToCq = [];
var ToCqS = [];
var HugKissDebug = false;
var Marks = null;
var Player = null;
var Playlist = false;
var pssaSet = false;
var PMMODE = false;
var reloadPowers = false;
var userFlags = 0;
var ISGRP = null;
var PSSA = null;
var TOPSH = null;
var SUPERPAWNS = null;
var SUPERPOWERS = null;
var STICKERS = null;
var REACTIONS = null;
var POWERS = null;
var MAXPOWER = null;
var MASKED = null;
var w_Powers = null;
var w_PowerO = null;
var w_Mask = null;
var PhoneTypes = {
  IPHONE: 1,
  DROIDPHONE: 5,
  WEB: 3,
  WINPHONE: 4
};
var CurrentPhoneType = null;
var xatdomain = "https://rxat.ro";
var chatUrl = xatdomain + "/web_gear/chat/";
var IDLE_ROOM = 3;
var xrRoot = {};
xrRoot = this;
try {
  var _parent;
  var _parent2;
  var _parent2$parent;
  if ((_parent = parent) == null ? undefined : _parent.Activity) {
    xrRoot = parent;
  } else if ((_parent2 = parent) == null || (_parent2$parent = _parent2.parent) == null ? undefined : _parent2$parent.Activity) {
    xrRoot = parent.parent;
  }
} catch (_0x47ed18) {}
const StatusfxId = 623;
const StatusEffects = [{
  set: 1,
  key: "scrollleft",
  name: "Scroll Left"
}, {
  set: 1,
  key: "scrollright",
  name: "Scroll Right"
}, {
  set: 1,
  key: "scrollup",
  name: "Scroll Up"
}, {
  set: 1,
  key: "scrolldown",
  name: "Scroll Down"
}, {
  set: 2,
  key: "bounce",
  name: "Bounce"
}, {
  set: 2,
  key: "fadeout",
  name: "Fade-Out"
}, {
  set: 2,
  key: "shake",
  name: "Shake"
}, {
  set: 2,
  key: "translucent",
  name: "Translucent"
}, {
  set: 3,
  key: "flip",
  name: "Flip"
}, {
  set: 3,
  key: "slidedown",
  name: "Slide Down"
}, {
  set: 3,
  key: "slideright",
  name: "Slide Right"
}, {
  set: 3,
  key: "typing",
  name: "Typing"
}, {
  set: 4,
  key: "wave",
  name: "Wave"
}];
function Tick12(_0x5af7b2) {
  if (ToCq.length) {
    if (this.DoPageClick) {
      DoPageClick(ToCq.shift());
    } else if (parent.DoPageClick) {
      parent.DoPageClick(ToCq.shift());
    } else {
      let _0x2da1fd = ToCq.shift();
      parent.parent.DoPageClick(_0x2da1fd);
    }
  } else if (ToCqS.length) {
    window.location = "app://" + encodeURIComponent(JSON.stringify(ToCqS));
    ToCqS = [];
  }
}
setInterval(Tick12, 83);
let appFromUrl = null;
function xatMain(_0x2cfb57) {
  var _0x42e2bd;
  var _0x476d3a;
  var _0x2767ad;
  var _0x2d6aaf = JSON.parse(_0x2cfb57);
  config = defconfig;
  setdarkmode();
  setHoverAnim();
  for (var _0x5a044f in _0x2d6aaf) {
    config[_0x5a044f] = _0x2d6aaf[_0x5a044f];
  }
  if (_0x2d6aaf.MyId !== undefined && xrRoot) {
    xrRoot.MyId = xInt(_0x2d6aaf.MyId);
  }
  Animated = "s";
  if (Settings && Settings.animation && Settings.animation !== "enable") {
    Animated = "S";
  }
  if (!xrRoot.Classic && config.MyId && parent) {
    parent.MyObj = config;
  }
  try {
    xrRoot.Smilies = new Smilies(Animated != "S");
  } catch (_0x406f92) {}
  config.PhoneType = xInt(config.PhoneType);
  config.GroupName ||= parent.ClassicGroup || "";
  xatdomain = config.dom;
  ThisPage = _0x2d6aaf.page;
  if (config.PhoneType == PhoneTypes.IPHONE || config.PhoneType == PhoneTypes.DROIDPHONE) {
    document.documentElement.style.fontSize = config.fontsize.toString() + "pt";
  }
  if (config.chatid) {
    setEventsLink(config.chatid);
  }
  let _0x101231 = (_0x42e2bd = Macros) == null || (_0x476d3a = _0x42e2bd.sline) == null ? undefined : _0x476d3a.split(",");
  _0x101231 &&= _0x101231.filter(_0x4b5070 => _0x4b5070);
  if (((_0x2767ad = _0x101231) == null ? undefined : _0x2767ad.length) && config.pFlags & NamePowers.sline) {
    addSmileyBar(Macros.sline, config.Flags & NamePowers.NoSmilieLine);
  } else if (gconfig && gconfig.g74) {
    addSmileyBar(gconfig.g74, config.Flags & NamePowers.NoSmilieLine);
  } else {
    addSmileyBar(null, config.Flags & NamePowers.NoSmilieLine);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      document.body.classList.remove("noAnimations");
    } else {
      document.body.classList.add("noAnimations");
    }
  });
  window.addEventListener("pagehide", _0x55e09c => {
    if (_0x55e09c.persisted) {
      document.body.classList.add("noAnimations");
    }
  }, false);
  if (Browser == "SF") {
    const _0x2ccba2 = makeElement(document.body, "iframe", "zoomFrame");
    _0x2ccba2.style.cssText = "width: 1px;height: 1px;top: 10000px;left: 10000px;position: fixed;visibility: hidden;";
    _0x2ccba2.contentWindow.onresize = () => {
      window.onzoom.call();
    };
    window.onzoom = () => {
      const _0x34265f = document.querySelectorAll("[data-sm]");
      for (let _0x52aaba = 0; _0x52aaba < _0x34265f.length; _0x52aaba++) {
        let _0xbef97 = _0x34265f[_0x52aaba].querySelector("span");
        if (!_0xbef97) {
          continue;
        }
        const _0x1abcae = (_0xbef97 = _0xbef97.querySelector("span")).style.animation;
        _0xbef97.style.animation = "none";
        _0xbef97.offsetHeight;
        _0xbef97.style.animation = _0x1abcae;
      }
    };
  }
  if (!appFromUrl && (appFromUrl = new URLSearchParams(parent.parent.location.search).get("open")) && appFromUrl.indexOf(".") != -1) {
    const _0x15877f = appFromUrl.split(".")[0].toLowerCase();
    const _0x41d5bf = capitalize(appFromUrl.split(".")[1].toLowerCase());
    let _0x585988;
    try {
      _0x585988 = appFromUrl.split(".")[2].toLowerCase();
    } catch (_0x1dbd49) {}
    classicSetDialog(_0x15877f, {
      Type: _0x41d5bf,
      Pack: _0x585988,
      Config: config
    });
  }
  if (reloadPowers) {
    SetPow();
    reloadPowers = false;
    pssaSet = true;
  }
  isWEB = config.PhoneType == PhoneTypes.WEB;
  CurrentPhoneType = config.PhoneType;
  if (!(Language = config.lang.substr(0, 2).toLowerCase())) {
    Language = "en";
  }
  if (_0x2d6aaf.roomid) {
    xrRoot.currentChat = _0x2d6aaf.roomid;
  }
  if (_0x2d6aaf.pFlags) {
    userFlags = _0x2d6aaf.pFlags;
  }
}
function SetPow() {
  var _0x45830b;
  if ((PSSA || ((_0x45830b = parent) == null ? undefined : _0x45830b.PSSA)) && !pssaSet) {
    if (localStorage.getItem("w_Powers") && localStorage.getItem("todo")) {
      var _0x1ddd3a;
      MAXPOWER = (PSSA || ((_0x1ddd3a = parent) == null ? undefined : _0x1ddd3a.PSSA)).length - 1;
      w_Powers = [];
      let _0x17bfc6 = JSON.parse(localStorage.getItem("w_Powers"));
      for (let _0xc3e78e in _0x17bfc6) {
        w_Powers[xInt(_0xc3e78e)] = xInt(_0x17bfc6[_0xc3e78e]);
      }
      w_PowerO = JSON.parse(localStorage.getItem("todo")).w_PowerO;
      if (w_Powers.length > 0) {
        setUserBank();
      }
    }
    if (localStorage.getItem("w_Mask") && (w_Mask = JSON.parse(localStorage.getItem("w_Mask")))) {
      setDisabledPowers();
    }
    pssaSet = true;
  }
}
function debug(_0x21c875) {
  return config[_0x21c875];
}
function xtrace(_0x2b92c6) {
  if (debug("xtrace")) {
    ToC({
      Type: "xtrace",
      msg: _0x2b92c6
    }, true);
  }
}
function FromObjC(_0xf27a33) {
  switch (_0xf27a33) {
    case "webViewDidFinishLoad":
    case "viewWillAppear":
    case "MessageUpdate":
    case "MessageUpdateAll":
    case "FriendsUpdate":
    case "ChatsUpdate":
    case "VisitorsUpdate":
      break;
    case "MemoryWarning":
      DumpMemory(0);
      return;
    default:
      return;
  }
  if (ThisPage) {
    ToC({
      Type: _0xf27a33,
      Page: ThisPage
    });
  }
}
let commandRegex = /\/(\w+)(?: (\w+))?/;
function ToC(_0x58506f, _0x269b41) {
  _0x58506f.Type ||= _0x58506f.Command;
  _0x58506f.Command ||= _0x58506f.Type;
  _0x58506f.Page ||= ThisPage;
  if (_0x58506f.Command == "LoadClassicDialog") {
    window.parent.currentChatC = null;
  }
  if (_0x58506f.ChatId && _0x58506f.Page && _0x58506f.Page == "chats") {
    if (_0x58506f.ChatId.indexOf("_") >= 0) {
      window.parent.currentChatC = null;
    } else if (_0x58506f.ChatId > 0) {
      window.parent.currentChatC = _0x58506f.ChatId;
    }
  }
  if (Classic && _0x58506f.Next == "pop") {
    _0x58506f.Next = "";
  }
  if (!!_0x58506f.Message && (_0x58506f.Message.substr(0, 2) == "/+" || _0x58506f.Message.substr(0, 2) == "/-")) {
    reloadPowers = true;
    pssaSet = false;
    messages.setTypingOff();
  }
  if (!Classic && typeof messages != "undefined") {
    if (_0x58506f.Command && ["swipeleft", "swiperight"].indexOf(_0x58506f.Command) >= 0 || _0x58506f.Next && _0x58506f.Next == "visitors") {
      messages.setTypingOff();
    }
  }
  if (_0x58506f.Type == "Send" && _0x58506f.Message[0] == "/") {
    let _0x531112 = commandRegex.exec(_0x58506f.Message);
    _0x531112 &&= _0x531112[1];
    if (_0x531112) {
      switch (_0x531112.toLowerCase()) {
        case "rtl":
        case "ltr":
          saveSetting("direction", _0x531112);
          document.getElementById("textEntryEditable").style.direction = _0x531112;
          break;
        case "away":
          messages.setTypingOff();
          break;
        case "gameban":
          GameBan(_0x58506f.Message.split(" ")[1], Date.now() + 10000000);
          break;
        case "bump":
          document.body.classList.add("bump");
          setTimeout(() => {
            document.body.classList.remove("bump");
          }, 1300);
          doSound("laserfire3");
      }
    }
  }
  if (parent.ToCq) {
    parent.ToCq.push(_0x58506f);
  } else {
    ToCq.push(_0x58506f);
  }
}
function GetXconst(_0x52a474, _0x74f012) {
  _0x74f012 = JSON.parse(_0x74f012);
  xrRoot.xConsts[_0x52a474] = _0x74f012;
  switch (_0x52a474) {
    case "isgrp":
      ISGRP = _0x74f012;
      break;
    case "pssa":
      PSSA = _0x74f012;
      SetPow();
      pssaSet = true;
      break;
    case "topsh":
      TOPSH = _0x74f012;
      break;
    case "SuperPowers":
      SUPERPOWERS = _0x74f012;
      break;
    case "SuperPawns":
      SUPERPAWNS = _0x74f012;
      break;
    case "Stickers":
      STICKERS = _0x74f012;
      break;
    case "reactions":
      REACTIONS = _0x74f012;
      if (!messages.reactionsInit) {
        messages.reactionsInit = true;
        messages.setUpReactionsSelector();
      }
  }
}
function GetXconsts(_0x27a245, _0x2517fb, _0x13bec3) {
  _0x2517fb ||= ["pssa", "topsh", "SuperPowers", "SuperPawns", "isgrp", "Stickers", "reactions"];
  if (_0x13bec3) {
    let _0x276de4 = [];
    for (let _0x2e6741 in _0x2517fb) {
      let _0x2bdc2b = _0x2517fb[_0x2e6741];
      if (!_0x13bec3[_0x2bdc2b] || _0x2bdc2b == "end" || _0x2bdc2b == "MainObj") {
        _0x276de4.push(_0x2bdc2b);
      }
    }
    _0x2517fb = _0x276de4;
  }
  if (xrRoot.xConsts) {
    delete xrRoot.xConsts.reactions;
    delete xrRoot.xConsts.pssa;
    delete xrRoot.xConsts.topsh;
  }
  for (let _0x2faf67 in _0x2517fb) {
    if (_0x27a245 === "selector" || !xrRoot.xConsts[_0x2517fb[_0x2faf67]]) {
      ToC({
        Command: "GetXconst",
        js: _0x27a245,
        obj: _0x2517fb[_0x2faf67]
      });
    }
  }
}
function loadXavi(_0xa7ea94, _0xb72f8b, _0x35f656, _0x40b9e0, _0x5684d2, _0x1ea6a0, _0x5759f4) {
  let _0x393999 = makeElement(_0xa7ea94, "div", "avatarholder");
  let _0x550794 = makeElement(_0x393999, "iframe", "xaviFrame");
  _0x550794.scrolling = "no";
  _0x550794.loading = "lazy";
  _0x550794.src = "../../xavi/xavi.html#chat&" + _0xb72f8b + "&" + encodeURIComponent(_0x35f656) + "&" + _0x40b9e0 + "&" + _0x1ea6a0 + "&" + _0x5759f4 + "&" + encodeURIComponent(PSSA);
  _0x393999.style.position = "relative";
  return _0x393999;
}
function GameBan(_0x26bbb9, _0x23b774) {
  let _0x429450 = document.querySelector("#gamesContainer");
  if (_0x26bbb9 == 0 || _0x429450.childNodes.length == 0) {
    if (_0x26bbb9 != 0) {
      if (_0x429450) {
        _0x429450.innerHTML = "";
        _0x429450.style.display = "block";
      }
      let _0x36a0aa = makeElement(_0x429450, "iframe", "gameFrame");
      switch (xInt(_0x26bbb9)) {
        case 162:
          _0x36a0aa.src = "../gameban/codeban/index.html#" + _0x23b774;
          break;
        case 134:
          _0x36a0aa.src = "../gameban/snakeban/index.html#" + _0x23b774;
          break;
        case 136:
          _0x36a0aa.src = "../gameban/spaceban/index.html#" + _0x23b774;
          break;
        default:
          _0x429450.innerHTML = "";
          _0x429450.style.display = "none";
      }
    } else {
      closeGameBan();
    }
  }
}
function closeGameBan() {
  let _0x455584 = document.querySelector("#gamesContainer") || parent.document.querySelector("#gamesContainer");
  if (_0x455584) {
    _0x455584.innerHTML = "";
    _0x455584.style.display = "none";
  }
}
function openInNewTab(_0x281830, _0x597f50) {
  _0x597f50 ||= "_blank";
  if (_0x597f50 = window.open(_0x281830, _0x597f50)) {
    _0x597f50.focus();
  }
}
function HitWeb(_0xa48ee, _0x110a8f) {
  if (!(_0xa48ee.search(/app:/i) >= 0)) {
    if (_0xa48ee.search("://") < 0) {
      _0xa48ee = "https://" + _0xa48ee;
    }
    openInNewTab(_0xa48ee);
  }
}
function HitWiki(_0x42f9e8, _0x29fc42) {
  HitWeb("https://util.rxat.ro/wiki/index.php?title=" + _0x42f9e8, _0x29fc42);
}
function LinkValidator(_0x400f90, _0x1dcb4a, _0x4c3f2b) {
  _0x1dcb4a = _0x1dcb4a.replace(/＆/g, "&");
  if (_0x400f90) {
    _0x400f90.stopPropagation();
  }
  if (Settings && Settings.linkvalidator == "disable" && ["^", "@", "%"].indexOf(_0x1dcb4a.charAt(0)) == -1 || _0x1dcb4a.substr(0, 16) == "https://rxat.ro/" || _0x1dcb4a.substr(0, 8) == "rxat.ro/") {
    if (_0x4c3f2b) {
      return _0x1dcb4a;
    } else {
      HitWeb(_0x1dcb4a);
      return;
    }
  }
  var _0x200b9a;
  var _0x1d42ca = _0x1dcb4a.charAt(0);
  if (_0x1d42ca != "^") {
    if (_0x1d42ca == "@") {
      _0x200b9a = "https://me.rxat.ro/" + _0x1dcb4a.substr(1);
      if (_0x4c3f2b) {
        return _0x200b9a;
      } else {
        HitWeb(_0x200b9a);
        return;
      }
    }
    if (_0x1d42ca == "%") {
      _0x200b9a = xatdomain + "/" + _0x1dcb4a.substr(1);
      if (_0x4c3f2b) {
        return _0x200b9a;
      } else if (isWEB) {
        HitWeb(_0x200b9a);
        return;
      } else {
        ToC({
          Command: "StartGroup",
          Group: _0x1dcb4a.substr(1)
        });
        return;
      }
    }
    var _0x14c157;
    var _0x426ba0 = new Array(64);
    for (_0x14c157 = 0; _0x14c157 < 26; _0x14c157++) {
      _0x426ba0[_0x14c157] = String.fromCharCode(_0x14c157 + 65);
    }
    for (_0x14c157 = 26; _0x14c157 < 52; _0x14c157++) {
      _0x426ba0[_0x14c157] = String.fromCharCode(_0x14c157 + 71);
    }
    for (_0x14c157 = 52; _0x14c157 < 62; _0x14c157++) {
      _0x426ba0[_0x14c157] = String.fromCharCode(_0x14c157 - 4);
    }
    _0x426ba0[62] = "+";
    _0x426ba0[63] = "/";
    var _0xac5cfd = new Array();
    var _0x2bebe0 = new Array();
    for (_0x14c157 = 0; _0x14c157 < _0x1dcb4a.length; _0x14c157++) {
      _0xac5cfd[_0x14c157] = _0x1dcb4a.charCodeAt(_0x14c157);
    }
    for (_0x14c157 = 0; _0x14c157 < _0xac5cfd.length; _0x14c157++) {
      switch (_0x14c157 % 3) {
        case 0:
          _0x2bebe0.push(_0x426ba0[(_0xac5cfd[_0x14c157] & 252) >> 2]);
          break;
        case 1:
          _0x2bebe0.push(_0x426ba0[(_0xac5cfd[_0x14c157 - 1] & 3) << 4 | (_0xac5cfd[_0x14c157] & 240) >> 4]);
          break;
        case 2:
          _0x2bebe0.push(_0x426ba0[(_0xac5cfd[_0x14c157 - 1] & 15) << 2 | (_0xac5cfd[_0x14c157] & 192) >> 6]);
          _0x2bebe0.push(_0x426ba0[_0xac5cfd[_0x14c157] & 63]);
      }
    }
    if (_0x14c157 % 3 == 1) {
      _0x2bebe0.push(_0x426ba0[(_0xac5cfd[_0x14c157 - 1] & 3) << 4]);
    } else if (_0x14c157 % 3 == 2) {
      _0x2bebe0.push(_0x426ba0[(_0xac5cfd[_0x14c157 - 1] & 15) << 2]);
    }
    _0x14c157 = _0x2bebe0.length;
    for (; _0x14c157 % 4 != 0; _0x14c157++) {
      _0x2bebe0.push("=");
    }
    var _0x2ab064 = "m=1&";
    if (isWEB) {
      _0x2ab064 = "";
    }
    var _0x5a56af = "https://linkvalidator.rxat.ro/warn.php?" + _0x2ab064 + "p=";
    for (_0x14c157 = 0; _0x14c157 < _0x2bebe0.length; _0x14c157++) {
      _0x5a56af += _0x2bebe0[_0x14c157];
    }
    if (_0x4c3f2b) {
      return _0x5a56af;
    }
    HitWeb(_0x5a56af);
  } else {
    ToC({
      Command: "StartApp",
      n: "canvas",
      a1: _0x1dcb4a.substr(1)
    });
  }
}
var gconfig;
var Macros;
var Settings;
function setGconfig(_0x307455) {
  for (var _0x5016fe in gconfig = JSON.parse(_0x307455)) {
    if (gconfig[_0x5016fe].charAt(0) == "{") {
      if (gconfig[_0x5016fe].charAt(1) == "`") {
        gconfig[_0x5016fe] = gconfig[_0x5016fe].replace(/`/g, "\"");
      }
      gconfig[_0x5016fe] = JSON.parse(gconfig[_0x5016fe]);
    }
  }
  if (gconfig.g100) {
    var _0x2f7254 = gconfig.g100.split(",");
    gconfig.g100 = {};
    for (var _0x488c01 = 0; _0x488c01 + 1 < _0x2f7254.length; _0x488c01 += 2) {
      gconfig.g100[_0x2f7254[_0x488c01]] = _0x2f7254[_0x488c01 + 1];
    }
  }
  xrRoot.gconfig = gconfig;
}
function setMacros(_0x507b85) {
  Macros = JSON.parse(_0x507b85);
}
function setSettings(_0x48b13b) {
  Settings = xrRoot.Settings = JSON.parse(_0x48b13b);
}
function setAppIcon(_0x4282cb) {
  let _0x585c9d = {
    channel: _0x4282cb,
    user: 0,
    msg: "",
    tobox: 1
  };
  parent.parent.parent.postMessage(JSON.stringify(_0x585c9d), "https://rxat.ro");
}
let prevSmilies = null;
let smTimeoutId = null;
let gotSmConfig = false;
let debugFlag = 0;
function addSmileyBar(_0x19ab98, _0x2e0b9c) {
  if (!_0x19ab98 || _0x19ab98.replace(/ /g, "").length == 0) {
    _0x19ab98 = "smile,biggrin,wink,eek,tongue,cool,mad,confused,redface,frown,crying,sleepy";
  }
  let _0x1325ac = document.querySelector("#smileyBar");
  if (prevSmilies != _0x19ab98 || debugFlag != (config.Flags & NamePowers.ChatIsDebug)) {
    gotSmConfig = false;
  }
  if (gotSmConfig || !_0x1325ac || window.innerHeight <= 300) {
    return;
  }
  if (gconfig && gconfig.hasOwnProperty("g74")) {
    gotSmConfig = true;
  }
  prevSmilies = _0x19ab98;
  _0x19ab98 = _0x19ab98.split(",");
  let _0x54bc50 = ["smile", "biggrin", "wink", "eek", "tongue", "cool", "mad", "confused", "redface", "frown", "crying", "sleepy"];
  _0x1325ac.innerHTML = "";
  for (let _0x1b766e = 0; _0x1b766e < _0x19ab98.length; _0x1b766e++) {
    if (_0x19ab98[_0x1b766e]) {
      _0x54bc50[_0x1b766e] = _0x19ab98[_0x1b766e];
    }
  }
  let _0x53dd96 = 13;
  let _0x466629 = 12;
  if (window.innerWidth <= 500) {
    14;
    _0x466629 = 8;
  }
  _0x54bc50.length = _0x466629;
  _0x54bc50.forEach((_0x1b8841, _0x536c20) => {
    let _0x55039c = _0x2e0b9c && _0x536c20 == 0 ? "smiley smToggle" : _0x2e0b9c ? "smiley smToggle2 smOff" : "smiley";
    const _0x1e58e2 = xrRoot.Smilies.MakeSmiley(makeElement(_0x1325ac, "div", _0x55039c), _0x1b8841, {
      size: 30,
      tooltipPosition: "low",
      showAd: false,
      align: true,
      addGback: true,
      callback: () => {
        smiliePressed("(" + _0x1b8841 + ")");
      }
    });
    if (_0x2e0b9c && !_0x536c20) {
      _0x1e58e2.addEventListener("mouseenter", _0x85039a => {
        window.clearTimeout(smTimeoutId);
        smTimeoutId = window.setTimeout(() => {
          document.querySelectorAll(".smOff").forEach(_0x3cd71e => {
            _0x3cd71e.classList.remove("smOff");
          });
          document.querySelectorAll(".smBarCell").forEach(_0x1c8ed7 => {
            _0x1c8ed7.addEventListener("mouseleave", _0x5ad70f => {
              window.clearTimeout(smTimeoutId);
              smTimeoutId = window.setTimeout(() => {
                document.querySelectorAll(".smToggle2").forEach(_0x1bb6bb => {
                  _0x1bb6bb.classList.add("smOff");
                });
              }, 500);
            });
          });
        }, 500);
      });
    }
  });
  const _0x18ad68 = makeElement(_0x1325ac, "div", "cell svgBack smline sideApp shake");
  _0x18ad68.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/8ball" + (config.Flags & NamePowers.ChatIsDebug ? "b" : "") + ".svg')";
  _0x18ad68.onclick = getStuffPressed;
  const _0x326529 = makeElement(_0x1325ac, "div", "cell svgBack smline sideApp");
  _0x326529.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/getx.svg')";
  _0x326529.onclick = buyPressed;
  const _0xb2e5ce = makeElement(_0x1325ac, "div", "cell svgBack smline sideApp", "spkBut");
  _0xb2e5ce.style.cssText = "width: 6%; height: 30px; right: 0;";
  _0xb2e5ce.onclick = spkPressed;
  addToolTip(_0x18ad68, ["box.139", "Get Stuff"], {
    position: "low"
  });
  addToolTip(_0x326529, ["box.207", "Click to buy"], {
    position: "low"
  });
  addToolTip(_0xb2e5ce, "Manage sounds", {
    position: "low"
  });
  debugFlag = config.Flags & NamePowers.ChatIsDebug;
}
var keywords = {
  xavi: 9,
  wiki: "wiki",
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  search: "search",
  power: "power",
  powers: "power",
  store: "store",
  promote: "promotion",
  promotion: "promotion",
  shortname: "shortname",
  auction: "auction",
  audies: "audies",
  trade: 9,
  smilie: 3,
  smilies: 3,
  smiley: 3,
  register: 5,
  login: 6,
  buy: 7,
  coin: 7,
  coins: 7,
  xats: 7,
  subscriber: 7,
  gift: 8,
  snakerace: 9,
  chess: 9,
  fourinarow: 9,
  canvas: 9,
  media: 10001,
  translator: 11,
  translate: 11
};
function openApp(_0x1b7030) {
  if (!_0x1b7030) {
    return;
  }
  const _0x4e9d2a = {
    trade: 30008,
    doodle: "doodle",
    grid: 30004,
    live: 40000,
    spacewar: 60201,
    matchrace: 60193,
    doodlerace: 60189,
    snakerace: 60195,
    switch: 60239,
    hearts: 60225,
    darts: 60247,
    zwhack: 60257,
    stick: 20038,
    music: 20042,
    chess: 20002,
    fourinarow: 20010,
    canvas: 60002,
    pool: 20006,
    media: 10001,
    xavi: 20047
  };
  let _0x10180d = {};
  if (_0x1b7030.type && _0x1b7030.type == "media") {
    _0x10180d = {
      n: _0x1b7030.type,
      i: _0x4e9d2a.media,
      l: _0x1b7030.link,
      action: "sideload"
    };
  } else if (_0x1b7030.toLowerCase() == "translator" || _0x1b7030.toLowerCase() == "translate") {
    let _0x1de354 = {
      UserNo: config.MyId,
      tab: "translator"
    };
    classicSetDialog("actions", config.MyId);
    classicSetDialog("settings", _0x1de354);
  } else {
    _0x10180d = {
      n: _0x1b7030,
      i: _0x4e9d2a[_0x1b7030],
      action: "sideload"
    };
  }
  if (parent) {
    parent.postMessage(JSON.stringify(_0x10180d), "https://rxat.ro");
  }
}
function WordIsLink(_0x14b395, _0x50e132, _0x6672f0) {
  if (!_0x14b395.match(/['"<>,;`]/)) {
    var _0x10993a;
    var _0x183100 = _0x14b395.toLowerCase();
    if (_0x14b395.match(/^[@%][a-zA-Z0-9_]+$/)) {
      return _0x183100;
    }
    if (_0x10993a = _0x14b395.match(/^(play\.|app\.)([a-zA-Z0-9_]+)$/)) {
      return "^" + _0x10993a[2];
    }
    if (keywords[_0x183100] && !_0x6672f0) {
      switch (_0x2a20d3 = xInt(_0x10993a = keywords[_0x183100])) {
        case 9:
        case 11:
          return {
            l: ">",
            c: "#000000",
            callBack: () => {
              openApp(_0x183100);
            }
          };
        case 10001:
          return {
            l: ">",
            c: "#000000",
            callBack: () => {
              openApp({
                type: "media",
                link: null
              });
            }
          };
        case 5:
          if (isWEB) {
            return "https://rxat.ro/login?mode=1";
          }
        case 6:
          if (isWEB) {
            return "https://rxat.ro/login";
          }
        case 7:
          if (isWEB) {
            return "https://rxat.ro/buy";
          }
        default:
          if (_0x2a20d3 < 1) {
            return "https://rxat.ro/" + _0x10993a;
          }
      }
    }
    if (gconfig && (_0x10993a = gconfig.g100) && (_0x10993a = _0x10993a[_0x183100])) {
      return {
        l: "//bit.ly/" + _0x10993a,
        c: "#000080"
      };
    }
    if (!_0x50e132 && !(_0x14b395.indexOf(".") < 0) && !(_0x183100.indexOf("app:") >= 0)) {
      if (_0x183100.indexOf("http") >= 0) {
        return _0x14b395;
      }
      var _0x13fb69 = false;
      var _0x59eb12 = 2;
      if (_0x183100.indexOf("www.") >= 0) {
        _0x13fb69 = true;
      }
      var _0x16798b;
      var _0x32bf3e = _0x183100.indexOf("/");
      if (_0x32bf3e == -1) {
        _0x32bf3e = _0x183100.length;
      }
      for (var _0x2a20d3 = 0; _0x2a20d3 < _0x32bf3e; _0x2a20d3++) {
        if (((_0x16798b = _0x183100.charCodeAt(_0x2a20d3)) < 48 || _0x16798b > 57) && _0x16798b != 46) {
          _0x59eb12 = 0;
          break;
        }
      }
      if (_0x183100.charAt(_0x32bf3e - 1) == ".") {
        _0x59eb12 = 2;
      }
      if (_0x183100.charAt(_0x32bf3e - 2) == ".") {
        _0x59eb12 = 2;
      }
      if (_0x183100.charAt(_0x32bf3e - 3) == ".") {
        _0x59eb12++;
      }
      if (_0x183100.charAt(_0x32bf3e - 4) == ".") {
        _0x59eb12++;
      }
      if (_0x183100.charAt(_0x32bf3e - 5) == ".") {
        _0x59eb12++;
      }
      if (_0x59eb12 == 1) {
        _0x13fb69 = true;
      }
      if (_0x13fb69) {
        return "https://" + _0x14b395;
      } else {
        return undefined;
      }
    }
  }
}
function setEventsLink(_0x1cadc4) {
  if (keywords && _0x1cadc4) {
    keywords.events = "chats#!events&roomid=" + _0x1cadc4 + "&GroupName=" + config.GroupName;
  }
}
const lut15 = [128, 180, 222, 249, 254, 238, 203, 154, 102, 53, 18, 2, 7, 34, 76];
const usefA = {
  1: 1,
  3: 2,
  4: 4
};
const RepeatA = {
  2: 50,
  3: 33.3
};
function toColor(_0x145da8) {
  return "#" + (16777216 + ((_0x145da8 >>>= 0) & 255 | (_0x145da8 & 65280) >>> 8 << 8 | (_0x145da8 & 16711680) >>> 16 << 16)).toString(16).slice(1);
}
function MakeGrad(_0x335aee, _0x1dc9ad) {
  let _0x246ed8;
  let _0x43aa0c;
  let _0x1aaf7d;
  let _0x185e11;
  let _0x48b482 = 0;
  let _0x40df14 = 0;
  let _0x300d38 = [];
  _0x335aee.reverse();
  if (_0x335aee.length <= 1) {
    _0x335aee = [..._0x335aee, 6359443, 2951035, 40440, 48184, 16578129, 16736060, 16711680];
  }
  _0x43aa0c = 0;
  for (; _0x43aa0c < _0x335aee.length; _0x43aa0c++) {
    let _0x1da27c = _0x335aee[_0x43aa0c];
    if (!_0x1da27c) {
      continue;
    }
    if ((_0x1da27c = _0x1da27c.toString()) == "NW") {
      if (_0x246ed8 === undefined) {
        _0x246ed8 = true;
      }
      continue;
    }
    let _0x29488e;
    let _0x3286ce = _0x1da27c.charAt(0);
    _0x29488e = xInt(_0x1da27c.substr(1));
    if (_0x3286ce != "r") {
      if (_0x3286ce != "s") {
        if (_0x3286ce != "f") {
          if (_0x3286ce != "o") {
            if (!(_0x1da27c = xInt(_0x1da27c))) {
              break;
            }
            _0x300d38.push(toColor(_0x1da27c));
          } else {
            if (_0x29488e == 0) {
              _0x246ed8 = false;
              continue;
            }
            _0x246ed8 = true;
            _0x185e11 = RepeatA[_0x29488e];
          }
        } else {
          _0x246ed8 = true;
          _0x48b482 = usefA[_0x29488e];
        }
      } else {
        _0x40df14 = _0x29488e;
      }
    } else {
      _0x1aaf7d = _0x29488e;
    }
  }
  if (_0x300d38.length > 15) {
    _0x300d38.length = 15;
  }
  if (_0x300d38.length < 2) {
    for (let _0x6bea13 = 0; _0x6bea13 < 15; _0x6bea13++) {
      let _0x1e62b6 = lut15[(_0x6bea13 + _0x40df14) % 15];
      let _0x3eacc7 = lut15[(_0x6bea13 + _0x40df14 + 10) % 15];
      let _0xd76333 = lut15[(_0x6bea13 + _0x40df14 + 5) % 15];
      _0x300d38[_0x6bea13] = (_0x1e62b6 << 16) + (_0x3eacc7 << 8) + _0xd76333;
    }
  }
  if (_0x1aaf7d === undefined) {
    _0x1aaf7d = 45;
  }
  if (_0x246ed8) {
    if (_0x1aaf7d > 45) {
      _0x1aaf7d = 45;
    } else if (_0x1aaf7d < -45) {
      _0x1aaf7d = -45;
    }
    _0x48b482 ||= usefA[4];
    _0x1aaf7d = _0x1aaf7d > 0 ? 90 - _0x1aaf7d : -90 - _0x1aaf7d;
    if (_0x300d38[0] != _0x300d38[_0x300d38.length - 1]) {
      _0x300d38.push(_0x300d38[0]);
    }
  }
  _0x1aaf7d = -_0x1aaf7d;
  if (_0x185e11 || _0x246ed8) {
    if (!_0x185e11 && _0x246ed8) {
      _0x185e11 ||= 100;
    }
  } else {
    _0x185e11 ||= 200;
  }
  let _0xbeba7a = (90 - Math.abs(_0x1aaf7d)) / 15 * _0x185e11 / 100;
  _0x185e11 = (_0x185e11 / 2 - _0xbeba7a) / (_0x300d38.length - 1);
  let _0x2557f1 = (Animated == "S" ? "" : "repeating-") + "linear-gradient(" + _0x1aaf7d + "deg";
  for (let _0xf1d260 = 0; _0xf1d260 < _0x300d38.length; _0xf1d260++) {
    _0x2557f1 += "," + _0x300d38[_0xf1d260];
    _0x2557f1 += _0x246ed8 ? " " + (_0xbeba7a + _0x185e11 * _0xf1d260) + "%" : " " + _0xf1d260 * 100 / (_0x300d38.length - 1) + "%";
  }
  return [_0x48b482, _0x2557f1 += ")"];
}
function nameFlag(_0x661a9a, _0x2faa70, _0xc0f8f, _0x447e99) {
  const _0x4c5292 = {
    1: 12,
    3: 72
  };
  const _0x3e303c = {
    1: 0,
    3: 0.2,
    4: 0.3
  };
  let _0x369a59;
  let _0x3e6622 = 4;
  let _0x1b973 = 0.25;
  let _0x2d007f = 36;
  let _0x2991da = 1;
  let _0x4b306b = -1;
  let _0x5f7a63 = _0x661a9a[0] == "jewel";
  let _0x171dac = 2 / 3;
  let _0x41a18e = 36;
  let _0x25528d = _0x447e99 & NamePowers.everypower;
  if (_0x5f7a63) {
    _0x369a59 = _0x25528d ? "10A012" : "DC143C";
  }
  if (_0x661a9a.length) {
    if (_0x5f7a63 && _0x661a9a[1] && _0x661a9a[1].length == 6) {
      let _0x54613f = getJewelCol(_0x661a9a[1], _0x25528d);
      if (_0x54613f) {
        _0x369a59 = _0x54613f;
      }
    }
    for (let _0x5867cf = 1; _0x5867cf < _0x661a9a.length; _0x5867cf++) {
      if (!_0x661a9a[_0x5867cf]) {
        continue;
      }
      let _0x3c94a6 = _0x661a9a[_0x5867cf].charAt(0);
      let _0x1dc277 = parseInt(_0x661a9a[_0x5867cf].substr(1));
      switch (_0x3c94a6) {
        case "r":
          _0x3e6622 = 2;
          break;
        case "e":
          _0x3e6622 = 3;
          break;
        case "u":
          _0x3e6622 = 5;
          break;
        case "f":
          switch (_0x1dc277) {
            case 1:
              _0x41a18e = 72;
              break;
            case 2:
              _0x41a18e = 48;
              break;
            case 3:
              _0x41a18e = 36;
              break;
            case 4:
              _0x41a18e = 18;
          }
          break;
        case "c":
          if (!(_0x2d007f = _0x4c5292[_0x1dc277])) {
            _0x2d007f = 36;
          }
          break;
        case "g":
          if (!(_0x1b973 = _0x3e303c[_0x1dc277])) {
            _0x1b973 = 0.1;
          }
          break;
        case "d":
          _0x4b306b = -_0x4b306b;
      }
    }
  }
  let _0x4ab6a5 = _0x41a18e / 12;
  if (_0x3e6622 == 5) {
    let _0x3659bb = document.createElement("canvas");
    _0x3659bb.width = Math.ceil(_0x2faa70.offsetWidth);
    _0x3659bb.height = Math.round(_0x3659bb.width * (_0xc0f8f.naturalHeight / _0xc0f8f.naturalWidth));
    let _0x445c0a = _0x3659bb.getContext("2d");
    if (_0x5f7a63) {
      _0x445c0a.fillStyle = "#" + _0x369a59;
      _0x445c0a.fillRect(0, 0, _0x3659bb.width, _0x3659bb.height);
    }
    _0x445c0a.drawImage(_0xc0f8f, 0, 0, _0x3659bb.width, _0x3659bb.height);
    _0x2faa70.style.backgroundImage = "url(\"" + _0x3659bb.toDataURL() + "\")";
    _0x2faa70.style.animation = "nameFlag " + _0x4ab6a5 + "s ease-in-out infinite alternate";
    addClass("nameFlag", 0, _0x2faa70);
    return;
  }
  if (!_0x2faa70) {
    return false;
  }
  if (_0x5f7a63) {
    _0x171dac = 1;
  }
  let _0x2b7c66 = Math.ceil(_0x2faa70.offsetWidth);
  let _0x5a0d0f = Math.ceil(_0x2faa70.offsetHeight);
  if (!_0x5a0d0f) {
    return;
  }
  let _0x1e55f9 = document.createElement("canvas");
  _0x1e55f9.width = _0x2b7c66;
  _0x1e55f9.height = _0x5a0d0f * _0x41a18e;
  let _0xdb9131 = _0x1e55f9.getContext("2d");
  let _0x121b43 = document.createElement("canvas");
  _0x121b43.width = _0x2b7c66;
  _0x121b43.height = _0x5a0d0f;
  let _0x28eca1 = _0x121b43.getContext("2d");
  let _0x175170 = _0xc0f8f.naturalWidth;
  let _0x2b6d6a = _0xc0f8f.naturalHeight;
  let _0xcc9108 = _0x2b7c66 / _0x175170;
  let _0x5a4c2f = _0x175170 * _0xcc9108 * _0x171dac;
  let _0xa18a17 = _0x2b6d6a * _0xcc9108;
  if (_0x5f7a63) {
    _0xdb9131.fillStyle = "#" + _0x369a59;
    _0xdb9131.fillRect(0, 0, _0x2b7c66, _0x5a0d0f * _0x41a18e);
  }
  let _0x37bcb8 = new Array();
  let _0x2ff8f1 = new Array();
  if (_0x3e6622 == 2 || _0x3e6622 == 3 || _0x3e6622 == 4) {
    let _0x1b4794 = _0x175170 / _0x2b6d6a;
    if (_0x1b4794 > _0x2991da) {
      _0x2991da = _0x1b4794;
    }
  }
  if (_0x3e6622 == 3 || _0x3e6622 == 4) {
    for (var _0x33fd88 = 0; _0x33fd88 < _0x2d007f; _0x33fd88++) {
      if (_0x3e6622 == 3 || _0x3e6622 == 4) {
        _0x37bcb8[_0x33fd88] = Math.sin(Math.PI * 2 * (_0x33fd88 / _0x2d007f));
      }
      if (_0x3e6622 == 4) {
        _0x2ff8f1[_0x33fd88] = Math.cos(Math.PI * 2 * (_0x33fd88 / _0x2d007f));
      }
    }
  }
  for (let _0x25a7f0 = 0; _0x25a7f0 < _0x41a18e; _0x25a7f0++) {
    let _0x3e1677 = _0x2b7c66 / 2;
    let _0x528390 = _0x5a0d0f / 2;
    let _0x5ef6a1 = 0;
    let _0x22f060 = 1;
    switch (_0x3e6622) {
      case 2:
        _0x5ef6a1 = -360 / _0x41a18e * _0x25a7f0 * _0x4b306b;
        _0x3e1677 = _0x2b7c66 / 2;
        _0x528390 = _0x5a0d0f / 2;
        _0x22f060 = _0x2991da;
        break;
      case 3:
        _0x5ef6a1 = -360 / _0x41a18e * _0x25a7f0 * _0x4b306b;
        _0x3e1677 = _0x2b7c66 / 2;
        _0x528390 = _0x5a0d0f / 2;
        _0x22f060 = _0x2991da + _0x2991da * _0x1b973 + _0x2991da * _0x1b973 * _0x37bcb8[_0x25a7f0 % _0x2d007f];
        break;
      case 4:
        _0x5ef6a1 = -360 / _0x41a18e * _0x25a7f0 * _0x4b306b;
        _0x3e1677 = _0x2b7c66 / 2 + _0x2b7c66 * _0x1b973 * _0x2ff8f1[_0x25a7f0 % _0x2d007f];
        _0x528390 = _0x5a0d0f / 2 + _0x5a0d0f * _0x1b973 * _0x37bcb8[_0x25a7f0 % _0x2d007f];
        _0x22f060 = _0x2991da + _0x2991da * _0x1b973 * 2;
    }
    _0x28eca1.clearRect(0, 0, _0x2b7c66, _0x5a0d0f);
    _0x28eca1.save();
    _0x28eca1.translate(_0x3e1677, _0x528390);
    _0x28eca1.rotate(_0x5ef6a1 * Math.PI / 180);
    _0x28eca1.scale(_0x22f060, _0x22f060);
    _0x28eca1.translate(-_0x2b7c66 / 2, -_0x5a0d0f / 2);
    _0x28eca1.drawImage(_0xc0f8f, _0x2b7c66 / 2 - _0x5a4c2f / 2, _0x5a0d0f / 2 - _0xa18a17 / 2, _0x5a4c2f, _0xa18a17);
    _0x28eca1.restore();
    _0xdb9131.drawImage(_0x121b43, 0, _0x5a0d0f * _0x25a7f0, _0x2b7c66, _0x5a0d0f);
  }
  _0x2faa70.style.backgroundImage = "url(\"" + _0x1e55f9.toDataURL() + "\")";
  addClass("nameStrip", 0, _0x2faa70);
  if (Animated == "s") {
    _0x2faa70.style.animation = "nameStrip" + _0x41a18e + " " + _0x4ab6a5 + "s steps(" + _0x41a18e + ") infinite normal";
    _0x2faa70.style.backgroundSize = "100% " + _0x41a18e + "00%";
  }
}
function getJewelCol(_0x39dfbf, _0x25894b) {
  if (!_0x39dfbf) {
    return false;
  }
  if (!_0x25894b) {
    let _0x38eecb = parseInt(_0x39dfbf, 16);
    if (isNaN(_0x38eecb)) {
      _0x38eecb = 1;
    }
    let _0x4f01e4 = _0x38eecb >> 16 & 255;
    let _0x166db2 = _0x38eecb >> 8 & 255;
    let _0x2e2e07 = _0x38eecb & 255;
    if (_0x166db2 > _0x4f01e4) {
      _0x166db2 = _0x4f01e4;
    }
    if (_0x166db2 > _0x2e2e07) {
      _0x166db2 = _0x2e2e07;
    }
    _0x39dfbf = toHex6(_0x38eecb = (_0x4f01e4 << 16) + (_0x166db2 << 8) + _0x2e2e07);
  }
  return _0x39dfbf;
}
function makeNameContainer(_0x53aa84, _0x5c5746, _0x24637a, _0x403dbe) {
  let _0x576dff;
  let _0x31fc18;
  let _0x5a9fb8 = makeElement(0, "div");
  let _0x3e081d = _0x24637a & 1;
  let _0x202305 = makeElement(_0x5a9fb8, "div", "");
  if (_0x3e081d) {
    _0x31fc18 = makeElement(_0x5a9fb8, "div", _0x3e081d && _0x24637a & 2 ? "posrelmsg" : "");
  }
  let _0x50a60a = makeElement(_0x202305, "div", "nameContainer");
  let _0x1b4f80 = makeElement(_0x50a60a, "div", _0x53aa84 + " clip");
  _0x1b4f80.appendChild(_0x5c5746);
  if (_0x3e081d) {
    let _0x3f5c59 = makeElement(_0x31fc18, "div", "nameContainer");
    _0x576dff = makeElement(_0x3f5c59, "div", _0x403dbe ? "glowtext" : "glowTextNoPawn");
    if (!(_0x24637a & 2)) {
      _0x50a60a.parentNode.style.position = "absolute";
    }
  }
  return [_0x5a9fb8, _0x1b4f80, _0x576dff];
}
function addGlow(_0x32ab80, _0x3de310, _0x39fe67) {
  let _0x5d743b = _0x3de310.glow;
  if (_0x5d743b == null) {
    return;
  }
  let _0x44eb8f = _0x32ab80[2];
  let _0x3daa2f = _0x39fe67.innerHTML;
  _0x3daa2f = (_0x3daa2f = (_0x3daa2f = _0x3daa2f.replace(/<span data-animation.*?\/span>/g, "")).replace(/<span style="transform:.*?\/span>/g, "")).replace(/data\-sm/g, "data-zz");
  _0x44eb8f.innerHTML = _0x3daa2f;
  _0x44eb8f.style["text-shadow"] = MakeGlow(_0x5d743b);
}
function createSmText2(_0x899a1a, _0x114306, _0x167d09, _0x249ac2, _0x18a4f3) {
  let _0x11fdcd = _0x899a1a.name;
  let _0x235ee4 = _0x899a1a.glow !== undefined ? 1 : 0;
  if (!_0x114306) {
    _0x235ee4 |= 2;
  }
  let _0x13a5e7 = createSmText(_0x11fdcd, _0x114306, _0x167d09, _0x249ac2, _0x18a4f3, true);
  let _0x32c0a9 = _0x899a1a.name.substr(0, 3) == "(p1";
  if (_0x899a1a.grad) {
    let _0x12ce89 = MakeGrad(_0x899a1a.grad, _0x11fdcd.length);
    let _0x189efd = makeNameContainer(_0x12ce89[0] && Animated == "s" ? "nameWave " : "", _0x13a5e7, _0x235ee4, _0x32c0a9);
    _0x189efd[1].style.backgroundImage = _0x12ce89[1];
    if (_0x899a1a.grad.includes("o3") || _0x899a1a.grad.includes("O3")) {
      _0x189efd[1].style.backgroundSize = "220% 100%";
    }
    if (_0x12ce89[0]) {
      _0x189efd[1].style.animationDuration = _0x12ce89[0] + "s";
    }
    addGlow(_0x189efd, _0x899a1a, _0x13a5e7);
    return _0x189efd[0];
  }
  if (_0x899a1a.flag) {
    let _0x5e88c3 = _0x899a1a.flag[0] || "x";
    let _0x48b8a4 = "svg";
    if (_0x5e88c3 == "jewel") {
      _0x48b8a4 = "png";
    }
    let _0x40b64c = makeNameContainer("", _0x13a5e7, _0x235ee4, _0x32c0a9);
    let _0x47df07 = new Image();
    _0x47df07.src = "/images/js/flag/" + _0x5e88c3 + "." + _0x48b8a4;
    _0x47df07.onload = _0x5643aa => {
      nameFlag(_0x899a1a.flag, _0x40b64c[1], _0x5643aa.target, _0x18a4f3);
    };
    addGlow(_0x40b64c, _0x899a1a, _0x13a5e7);
    return _0x40b64c[0];
  }
  if (_0x899a1a.glow !== undefined) {
    _0x13a5e7.style["text-shadow"] = MakeGlow(_0x899a1a.glow);
  }
  if (_0x899a1a.col !== undefined) {
    _0x13a5e7.style.color = "#" + toHex6(_0x899a1a.col);
  }
  return _0x13a5e7;
}
let resizeBtn = null;
let minimized = false;
let playerToolBar = null;
let playerContainer = null;
function createSmText(_0x50c829, _0x34be3a, _0x4b2fab, _0x145d20, _0x2dcdfa, _0x565591, _0x4310d9, _0x47b5c1, _0x49bed9) {
  if (_0x50c829 == null) {
    _0x50c829 = "";
  }
  if (_0x34be3a == null) {
    _0x34be3a = "message";
  }
  if (_0x4b2fab == null) {
    _0x4b2fab = "holder";
  }
  if (_0x145d20 == null) {
    _0x145d20 = "20";
  }
  var _0x54492c = document.createElement("span");
  _0x54492c.setAttribute("class", _0x34be3a);
  var _0x3eb8e3 = false;
  var _0x4bd258 = 10;
  var _0x14ac5f = false;
  if (_0x2dcdfa & 134217728 || _0x50c829.search("<inf8>") == 0) {
    _0x54492c.style.fontStyle = "italic";
  }
  if (_0x2dcdfa & 536870912) {
    _0x14ac5f = true;
  }
  if (_0x50c829.match(/&.*;/)) {
    _0x50c829 = (_0x50c829 = (_0x50c829 = (_0x50c829 = (_0x50c829 = (_0x50c829 = _0x50c829.replace(/&apos;/g, "'")).replace(/&quot;/g, "\"")).replace(/&amp;/g, "＆")).replace(/&slsh;/g, "\\")).replace(/&gt;/g, "〉")).replace(/&lt;/g, "〈");
  }
  let _0x675e51 = _0x50c829.split(/(\([a-zA-Z0-9].*?\)|<.*?>|[ \t]+)/);
  _0x675e51 = _0x675e51.filter(_0x342b18 => _0x342b18.length);
  if (_0x2dcdfa & 1 && _0x675e51.length == 1 && _0x675e51[0].charAt(0) == "(") {
    _0x145d20 = 40;
  }
  let _0x23f5ff = [];
  const _0x172e4a = /❯\[(.+?)\]+/g;
  const _0x5c0a72 = /~([^~ \s].*?)~/g;
  const _0x418cb3 = /\*([^\* \s].*?)\*/g;
  const _0xbb5ca7 = /\*\*([^\*\* \s].*?)\*\*/g;
  const _0x2e55ae = /❯#([a-zA-Z0-9]+)\[(.+?)\]+/g;
  const _0x5b4015 = /(❯(?:#[0-9]+)?\[(?:.*?)?)<span class="holder".{0,}>.*?<\/span>?((?:.*?)?\]+)/g;
  const _0x35fbfa = /\[([^\]]+)\]\(﻿(?:https?:\/\/)?([^)]+\.(?:[a-zA-Z]){1,6}\b(?:[-a-zA-Z0-9()@:%\+.~#?&//=]*))\)/;
  const _0x50c848 = /\[([^\]]+)\]\(﻿(?:https?:\/\/)?([^)]+\.(?:[a-zA-Z]){1,6}\b(?:[-a-zA-Z0-9()@:%\+.~#?&//=]*))\)/g;
  const _0x4ccc8d = /(＼)([*|＼]|~])/g;
  const _0x2dfc33 = /❯\[(.+?[^＼])\]+/;
  const _0x41d19f = /~([^~ \s].*?[^＼])~/g;
  const _0x12620e = /\*([^\* \s].*?[^＼])\*/g;
  const _0xbe36ba = /\*\*([^\*\* \s].*?[^＼])\*\*/g;
  const _0x3d27ea = /❯#([a-zA-Z0-9]+)\[(.+?[^＼])\]+/;
  let _0x545fc7 = Settings && Settings.inappwords;
  _0x545fc7 ||= "enable";
  for (var _0x3e88f9 = 0; _0x3e88f9 < _0x675e51.length; _0x3e88f9++) {
    var _0x24f67d = _0x675e51[_0x3e88f9];
    _0xec4e3e: while (_0x24f67d.length != 0) {
      if (_0x24f67d.length > 2) {
        if (_0x24f67d.charAt(0) == "(" && _0x24f67d.charAt(_0x24f67d.length - 1) == ")") {
          if (_0x24f67d.charAt(1) == "﻿") {
            addText(_0x54492c, "(" + _0x24f67d.substring(2) + " ");
            break;
          }
          if (_0x4bd258-- <= 0) {
            break;
          }
          if (_0x24f67d.search(" ") < 0) {
            var _0x969aac = -1;
            if (_0x14ac5f) {
              _0x969aac = -4;
            }
            _0x54492c.appendChild(createSm(_0x24f67d, _0x4b2fab, _0x145d20, _0x969aac, _0x565591, undefined, undefined, _0x49bed9, _0x4310d9));
            _0x14ac5f = false;
            addText(_0x54492c, " ");
            break;
          }
        }
        if (_0x24f67d.charAt(0) == "#") {
          let _0x3e8022 = makeElement(_0x54492c, "span");
          let _0x5e4155 = makeElement(_0x3e8022, "img", "speaker");
          _0x5e4155.src = "svg/spk.svg";
          _0x5e4155.setAttribute("data-sound", _0x24f67d.substr(1));
          addText(_0x54492c, " ");
          break;
        }
        if (_0x24f67d.charAt(0) == "<") {
          if (_0x24f67d.charAt(1) == "s") {
            var _0x5c5c52 = _0x24f67d.charAt(2);
            _0x24f67d = _0x24f67d.substr(3, _0x24f67d.length - 5);
            var _0x72ef04 = makeElement(_0x54492c, "span", _0x5c5c52 == 4 ? "" : _0x545fc7 && _0x545fc7 == "enable" ? "swear" + _0x5c5c52 : "");
            if (_0x5c5c52 != 4) {
              _0x72ef04.addEventListener("click", _0x1a3e91 => {
                onSwear(_0x1a3e91);
              });
            }
            addText(_0x72ef04, _0x24f67d);
            addText(_0x54492c, " ");
            break;
          }
          if (_0x24f67d.charAt(_0x24f67d.length - 1) != ">") {
            break;
          }
          _0x54492c.appendChild(createSm(_0x24f67d, _0x4b2fab, _0x145d20, null, _0x565591, undefined, undefined, _0x49bed9, _0x4310d9));
          break;
        }
        {
          if (Settings && Settings.marks) {
            Marks = (Marks = Settings.marks.replace(/”/g, "\"")).indexOf("\"") == -1 ? JSON.parse(Marks.replace(/\?/g, "\"")) : JSON.parse(Marks);
          }
          let _0x6055cd = !(_0x2dcdfa & NamePowers.nolinks) && WordIsLink(_0x24f67d);
          if (config.pFlags2 & NamePowers.mark && _0x47b5c1 && Marks && Marks.length > 0 && (_0x2dcdfa & NamePowers.nolinks || !WordIsLink(_0x24f67d.substr(1)))) {
            _0x31ea14: for (let _0x308ccf = 0; _0x308ccf < Marks.length; _0x308ccf++) {
              if (Marks[_0x308ccf].name.length > 2 && _0x24f67d.toLowerCase().indexOf(Marks[_0x308ccf].name.toLowerCase()) != -1 && !_0x6055cd) {
                if (_0x172e4a.test(_0x50c829)) {
                  let _0x2b9b10 = _0x50c829.match(_0x172e4a);
                  for (let _0x776e2d = 0; _0x776e2d < _0x2b9b10.length; _0x776e2d++) {
                    if (_0x2b9b10[_0x776e2d].toLowerCase().indexOf(Marks[_0x308ccf].name.toLowerCase())) {
                      continue _0x31ea14;
                    }
                  }
                }
                if (_0x35fbfa.test(_0x50c829) && _0x50c829.match(_0x35fbfa)[0].toLowerCase().indexOf(Marks[_0x308ccf].name.toLowerCase())) {
                  continue _0x31ea14;
                }
                let _0x3ffafd = makeElement(_0x54492c, "span", "highlight");
                _0x3ffafd.style.color = isColorLight(Marks[_0x308ccf].color) ? "#000" : "#FFF";
                _0x3ffafd.style.background = Marks[_0x308ccf].color;
                addText(_0x3ffafd, _0x24f67d);
                addText(_0x54492c, " ");
                break _0xec4e3e;
              }
            }
          }
          if (_0x6055cd) {
            let _0x53478c = true;
            let _0x34c050 = _0x50c829.match(_0x50c848);
            if (_0x34c050) {
              for (let _0x5ba2cb = 0; _0x5ba2cb < _0x34c050.length; _0x5ba2cb++) {
                if (_0x34c050[_0x5ba2cb].indexOf(_0x24f67d)) {
                  _0x53478c = false;
                }
              }
            }
            if (_0x53478c) {
              let _0x1d930c = {
                id: Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)
              };
              let _0x9ecd82 = {};
              if (typeof _0x6055cd == "object") {
                _0x6055cd = (_0x9ecd82 = _0x6055cd).l;
              }
              if (_0x9ecd82.callBack) {
                _0x1d930c.isApp = true;
                _0x1d930c.callBack = _0x9ecd82.callBack;
              }
              _0x1d930c.link = _0x6055cd;
              _0x23f5ff.push(_0x1d930c);
              let _0x56971a = _0x9ecd82.c ? "data-dark=\"true\"" : "";
              _0x24f67d = "<a class=\"msgLink\" id=\"" + _0x1d930c.id + "\" " + _0x56971a + " " + (_0x9ecd82.c ? "style=\"color: " + _0x9ecd82.c + "\"" : "") + ">" + _0x24f67d.trim() + "</a>";
            }
          }
        }
      }
      if (_0x24f67d.substring(0, 18) == "<a class=\"msgLink\"") {
        addText(_0x54492c, _0x24f67d + " ", true);
      } else {
        addText(_0x54492c, _0x24f67d + " ");
      }
      if (_0x24f67d.charAt(0) != " " && _0x24f67d.charAt(0) != "﻿") {
        _0x3eb8e3 = false;
      }
      break;
    }
  }
  if (_0x49bed9) {
    let _0x3f77d1 = _0x54492c.innerHTML;
    if (_0xbb5ca7.test(_0x3f77d1)) {
      _0x3f77d1 = _0x3f77d1.replace(_0xbe36ba, "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">$1</strong>");
    }
    if (_0x172e4a.test(_0x3f77d1)) {
      let _0x14f8dd = _0x3f77d1.match(_0x172e4a);
      for (let _0x302697 = 0; _0x302697 <= _0x14f8dd.length; _0x302697++) {
        if (_0x14f8dd[_0x302697] && /\[(.*?)\]/.exec(_0x14f8dd[_0x302697])[1].replace(_0x5b4015, "$1$2").replace(/ /g, "").length >= 3 && _0x302697 < 3) {
          _0x3f77d1 = _0x3f77d1.replace(_0x5b4015, "$1$2").replace(_0x2dfc33, "<p class=\"blockquote\"><span class=\"pill\"></span>$1</p>");
        }
      }
    }
    let _0x218274 = [];
    if (_0x2e55ae.test(_0x3f77d1)) {
      const _0x3b777b = _0x3f77d1.match(_0x2e55ae);
      for (let _0x2a6c84 = 0; _0x2a6c84 <= _0x3b777b.length; _0x2a6c84++) {
        if (_0x3b777b[_0x2a6c84] && /\[(.*?)\]/.exec(_0x3b777b[_0x2a6c84])[1].replace(_0x5b4015, "$1$2").replace(/ /g, "").length >= 3) {
          _0x218274.push(/#([a-zA-Z0-9]+)\[/.exec(_0x3b777b[_0x2a6c84])[1]);
          if (_0x2a6c84 < 3) {
            _0x3f77d1 = _0x3f77d1.replace(_0x5b4015, "$1$2").replace(_0x3d27ea, "<p class=\"blockquote\" data-block=\"$1\"><span class=\"pill\"></span>$2</p>");
          }
        }
      }
    }
    if (_0x50c848.test(_0x3f77d1)) {
      const _0x568412 = _0x3f77d1.match(_0x50c848);
      if (_0x568412.length > 0) {
        for (let _0xc11682 = 0; _0xc11682 < _0x568412.length; _0xc11682++) {
          const _0x5e1a93 = {
            isMarkdown: true
          };
          _0x5e1a93.id = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
          _0x5e1a93.link = _0x35fbfa.exec(_0x568412[_0xc11682])[2];
          _0x5e1a93.name = _0x35fbfa.exec(_0x568412[_0xc11682])[1].replace(_0x5b4015, "$1$2").split("<")[0].trim();
          if (!(_0x5e1a93.name.replace(/ /g, "").length < 3) && !WordIsLink(_0x5e1a93.name)) {
            _0x23f5ff.push(_0x5e1a93);
            _0x3f77d1 = _0x3f77d1.replace(_0x35fbfa, "<a class=\"msgLink\" id=\"" + _0x5e1a93.id + "\" style=\"color: #190046;\">" + _0x5e1a93.name + "</a>");
          }
        }
      }
    }
    if (_0x418cb3.test(_0x3f77d1)) {
      _0x3f77d1 = _0x3f77d1.replace(_0x12620e, "<em style='user-select: auto;'>$1</em>");
    }
    if (_0x5c0a72.test(_0x3f77d1)) {
      _0x3f77d1 = _0x3f77d1.replace(_0x41d19f, "<del style='user-select: auto;'>$1</del>");
    }
    _0x3f77d1 = _0x3f77d1.replace(_0x4ccc8d, "$2");
    _0x54492c.innerHTML = _0x3f77d1;
    addSmiliesEvent(_0x54492c);
    setTimeout(() => {
      for (let _0x38aebe = 0; _0x38aebe < _0x23f5ff.length; _0x38aebe++) {
        const _0x519be1 = _0x23f5ff[_0x38aebe];
        if (_0x519be1.link && _0x519be1.link.indexOf("]") != -1) {
          continue;
        }
        let _0x5d16df = document.getElementById(_0x519be1.id);
        try {
          _0x5d16df.addEventListener("mousedown", _0x396223 => {
            _0x396223.preventDefault();
            if (_0x396223.which == 2) {
              handleLink(_0x396223, _0x519be1, _0x4310d9);
            }
          });
          _0x5d16df.addEventListener("click", _0x53e967 => {
            handleLink(_0x53e967, _0x519be1, _0x4310d9);
          });
        } catch (_0x1ed6a4) {}
        if (_0x519be1.isMarkdown) {
          addToolTip(_0x5d16df, _0x519be1.link, {
            select: true,
            position: "low",
            shortTime: true
          });
        }
      }
      _0x218274.forEach(_0x8cd911 => {
        let _0x3fc1f9 = document.querySelector("[data-msgid=\"" + _0x8cd911 + "\"]");
        let _0x34b2b9 = document.querySelectorAll("[data-block=\"" + _0x8cd911 + "\"]");
        if (_0x3fc1f9 && _0x34b2b9) {
          _0x34b2b9.forEach(_0x42e3a5 => {
            addToolTip(_0x42e3a5, ["mob2.originalmsg", "Go to original message"], {
              position: "low"
            });
            _0x42e3a5.addEventListener("click", () => {
              _0x3fc1f9.scrollIntoView({
                behavior: "smooth",
                block: "end"
              });
            });
          });
        }
      });
      document.querySelectorAll("[class^=swear]").forEach(_0x2ad9d5 => {
        _0x2ad9d5.addEventListener("click", _0x1b7d0e => {
          onSwear(_0x1b7d0e);
        });
      });
      document.querySelectorAll("[data-sound]").forEach(_0x1f32cf => {
        if (!_0x1f32cf.dataset.init && _0x1f32cf.dataset.sound) {
          addToolTip(_0x1f32cf, "#" + _0x1f32cf.dataset.sound, {
            select: true,
            position: "low",
            shortTime: true
          });
          _0x1f32cf.addEventListener("click", doAudies);
          _0x1f32cf.dataset.init = "1";
        }
      });
    }, 500);
  }
  if (_0x3eb8e3) {
    addText(_0x54492c, "\xA0");
  }
  return _0x54492c;
}
function createStatusfx(_0x2cd3a3, _0x44deee, _0x452814, _0x3ff93f, _0x1dc1e0) {
  var _0x397d5a;
  let {
    effect: _0x363f33,
    status2: _0x46a1df = "",
    speed: _0x4ce090 = 2,
    waveFrequency: _0x3df144 = 4
  } = _0x44deee;
  const _0x5602e8 = _0x452814 === "new" ? document.querySelector("#statusNew") : document.querySelector("#statusText" + _0x452814);
  const _0x1f1135 = _0x5602e8.parentNode;
  _0x5602e8.innerText = _0x2cd3a3;
  if (((_0x397d5a = Settings) == null ? undefined : _0x397d5a.statusfxAnim) == "disable") {
    return;
  }
  _0x46a1df = (_0x46a1df = _0x46a1df.trim()).replace(new RegExp("['\"<>&=]", "gi"), "");
  _0x4ce090 = Math.max(1, Math.min(6, _0x4ce090));
  _0x3df144 = Math.max(1, Math.min(6, _0x3df144));
  const _0x17b68f = Math.SQRT1_2 + 1;
  let _0xb84ae2 = _0x5602e8.offsetWidth;
  let _0x423233 = Math.ceil(_0x5602e8.offsetHeight * _0x17b68f);
  const _0x11bd12 = _0x17b68f ** _0x4ce090 + 1;
  let _0x564c39;
  let _0x59951b;
  let _0x1209f6;
  let _0x2ad04e = false;
  for (let _0x20c3b0 = 0; _0x20c3b0 < StatusEffects.length; _0x20c3b0++) {
    const _0x5a17ed = StatusEffects[_0x20c3b0];
    if (_0x3ff93f >= _0x5a17ed.set && _0x363f33 == _0x5a17ed.key) {
      _0x2ad04e = true;
      break;
    }
  }
  if (_0x363f33 && _0x2ad04e) {
    switch (_0x363f33) {
      case "scrollleft":
        _0x564c39 = Math.round(_0xb84ae2 / _0x11bd12) * 1000;
        _0x59951b = Math.round(-_0xb84ae2);
        _0x5602e8.animate([{
          transform: "translateX(" + -_0x59951b + "px)"
        }, {
          transform: "translateX(" + _0x59951b + "px)"
        }], {
          duration: _0x564c39,
          iterations: "Infinity"
        });
        break;
      case "scrollright":
        _0x564c39 = Math.round(_0xb84ae2 / _0x11bd12) * 1000;
        _0x59951b = Math.round(-_0xb84ae2);
        _0x5602e8.animate([{
          transform: "translateX(" + _0x59951b + "px)"
        }, {
          transform: "translateX(" + -_0x59951b + "px)"
        }], {
          duration: _0x564c39,
          iterations: "Infinity"
        });
        break;
      case "scrollup":
        _0x5602e8.parentNode.style.overflow = "hidden";
        _0x5602e8.parentNode.style.position = "relative";
        if (_0x46a1df) {
          _0x423233 = (_0x423233 / _0x17b68f + _0x11bd12) * 2;
          _0x564c39 = Math.round(_0x423233 / _0x11bd12) * 1000;
          _0x1209f6 = Math.round(-_0x423233);
          _0x5602e8.animate([{
            transform: "translateY(" + -_0x1209f6 + "px)"
          }, {
            transform: "translateY(" + _0x1209f6 + "px)"
          }], {
            duration: _0x564c39,
            iterations: "Infinity"
          });
          const _0x5d174b = makeElement(_0x5602e8, "p");
          _0x5d174b.style.cssText = "position: absolute; top: " + _0x423233 * (_0x17b68f - 1) + "px;";
          _0x5d174b.innerHTML = _0x46a1df;
        } else {
          _0x564c39 = Math.round(_0x423233 / _0x11bd12) * 1000;
          _0x1209f6 = Math.round(-_0x423233);
          _0x5602e8.animate([{
            transform: "translateY(" + -_0x1209f6 + "px)"
          }, {
            transform: "translateY(" + _0x1209f6 + "px)"
          }], {
            duration: _0x564c39,
            iterations: "Infinity"
          });
        }
        break;
      case "scrolldown":
        _0x5602e8.parentNode.style.overflow = "hidden";
        _0x5602e8.parentNode.style.position = "relative";
        if (_0x46a1df) {
          _0x423233 = (_0x423233 / _0x17b68f + _0x11bd12) * 2;
          _0x564c39 = Math.round(_0x423233 / _0x11bd12) * 1000;
          _0x1209f6 = Math.round(-_0x423233);
          _0x5602e8.animate([{
            transform: "translateY(" + _0x1209f6 + "px)"
          }, {
            transform: "translateY(" + -_0x1209f6 + "px)"
          }], {
            duration: _0x564c39,
            iterations: "Infinity"
          });
          const _0xe4725f = makeElement(_0x5602e8, "p");
          _0xe4725f.style.cssText = "position: absolute; top: -" + _0x423233 * (_0x17b68f - 1) + "px;";
          _0xe4725f.innerHTML = _0x46a1df;
        } else {
          _0x564c39 = Math.round(_0x423233 / _0x11bd12) * 1000;
          _0x1209f6 = Math.round(-_0x423233);
          _0x5602e8.animate([{
            transform: "translateY(" + _0x1209f6 + "px)"
          }, {
            transform: "translateY(" + -_0x1209f6 + "px)"
          }], {
            duration: _0x564c39,
            iterations: "Infinity"
          });
        }
        break;
      case "fadeout":
        const _0x2222b7 = 500;
        const _0x53e4c4 = 3500;
        const _0x4bac45 = _0x53e4c4 - _0x4ce090 * _0x2222b7;
        const _0x5ec8c7 = _0x53e4c4 - _0x2222b7 * _0x4ce090;
        _0x5602e8.parentNode.style.position = "relative";
        if (_0x46a1df) {
          _0x5602e8.animate([{
            opacity: 1,
            offset: 0
          }, {
            opacity: 0,
            offset: _0x4bac45 / (_0x4bac45 + _0x5ec8c7)
          }, {
            opacity: 0,
            offset: 1
          }], {
            duration: _0x4bac45 + _0x5ec8c7,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x5ec8c7
          });
          const _0x485311 = makeElement(_0x5602e8.parentNode, "p");
          _0x485311.style.cssText = "position: absolute; top: 0; opacity: 0";
          _0x485311.innerHTML = _0x46a1df;
          _0x485311.animate([{
            opacity: 0,
            offset: 0
          }, {
            opacity: 0,
            offset: 1 - _0x4bac45 / (_0x4bac45 + _0x5ec8c7)
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: _0x4bac45 + _0x5ec8c7,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x5ec8c7
          });
        } else {
          _0x5602e8.animate([{
            opacity: 1
          }, {
            opacity: 0
          }], {
            duration: _0x4bac45,
            iterations: "Infinity",
            direction: "alternate"
          });
        }
        break;
      case "translucent":
        _0x564c39 = Math.round(_0xb84ae2 / _0x11bd12) * 350;
        const _0x51249b = _0x5602e8.parentNode.style.color ? _0x5602e8.parentNode.style.color : document.body.classList.contains("dark") ? "rgb(207, 207, 207)" : "rgb(0, 0, 0)";
        const _0x5022e6 = _0x51249b.replace(/rgb/, "rgba").replace(")", ", 0)");
        const _0x5a1a87 = MakeStatusGlow(_0x1dc1e0);
        _0x5602e8.parentNode.style.filter = "drop-shadow(" + _0x5a1a87 + ") drop-shadow(" + _0x5a1a87 + ")";
        _0x5602e8.parentNode.style.textShadow = "";
        _0x5602e8.style.cssText = "\n                    color: transparent;\n                    background: linear-gradient(90deg, " + _0x51249b + " 0%, " + _0x5022e6 + " 30%, " + _0x5022e6 + " 70%, " + _0x51249b + " 100%);\n                    background-size: 200%;\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                ";
        _0x5602e8.animate([{
          backgroundPosition: "200%"
        }, {
          backgroundPosition: "0%"
        }], {
          duration: _0x564c39,
          iterations: "Infinity"
        });
        break;
      case "bounce":
        const _0x36778e = 15;
        _0xb84ae2 = getTextWidth(_0x2cd3a3, "bold 0.66rem");
        let _0x113d17 = _0x5602e8.parentNode.offsetWidth - _0x36778e;
        const _0x57947d = (_0x113d17 = _0x113d17 < _0xb84ae2 ? _0x113d17 + _0x36778e : _0x113d17) - _0xb84ae2;
        if (_0x57947d >= 25) {
          _0x564c39 = _0x57947d + 3500 / _0x4ce090;
          _0x5602e8.animate([{
            transform: "translateX(0px)"
          }, {
            transform: "translateX(" + _0x57947d + "px)"
          }], {
            duration: _0x564c39,
            iterations: "Infinity",
            direction: "alternate",
            easing: "ease-in-out"
          });
        }
        break;
      case "shake":
        const _0x3e3fe4 = 350;
        _0x564c39 = _0x3e3fe4 * 7 - _0x4ce090 * _0x3e3fe4 + _0x3e3fe4;
        const _0x322b3c = _0x3e3fe4 * 1.7;
        _0x5602e8.animate([{
          transform: "translate(1px, 1px)"
        }, {
          transform: "translate(-1px, -2px)"
        }, {
          transform: "translate(-3px, 0px)"
        }, {
          transform: "translate(3px, 2px)"
        }, {
          transform: "translate(1px, -1px)"
        }, {
          transform: "translate(-1px, 2px)"
        }, {
          transform: "translate(-3px, 1px)"
        }, {
          transform: "translate(3px, 1px)"
        }, {
          transform: "translate(-1px, -1px)"
        }, {
          transform: "translate(1px, 2px)"
        }, {
          transform: "translate(1px, -2px)"
        }, {
          transform: "translate(0px)",
          offset: _0x564c39 / (_0x564c39 + _0x322b3c)
        }], {
          duration: _0x564c39 + _0x322b3c,
          iterations: "Infinity",
          direction: "alternate",
          easing: "ease-in-out"
        });
        break;
      case "wave":
        const _0x4277d2 = 3;
        const _0x489778 = 10;
        const _0xa5bd48 = _0x489778 * 6 - (_0x3df144 - 1) * _0x489778;
        _0x564c39 = (_0x4277d2 * 6 - _0x4ce090 * _0x4277d2 + _0x4277d2) / 12;
        _0x5602e8.innerHTML = "";
        _0x5602e8.style.transform = "translateY(" + _0x4277d2 / 2 + "px)";
        for (let _0xc8bbbf = 0; _0xc8bbbf < _0x2cd3a3.length; _0xc8bbbf++) {
          const _0x1e6a99 = document.createElement("span");
          if (_0x2cd3a3[_0xc8bbbf] === " ") {
            _0x1e6a99.innerHTML = "&nbsp;";
          } else {
            _0x1e6a99.innerText = _0x2cd3a3[_0xc8bbbf];
          }
          _0x1e6a99.style.cssText = "display: inline-block;animation-duration: " + _0x564c39 + "s;animation-name: wave-" + _0x452814 + ";animation-iteration-count: infinite;animation-direction: alternate;";
          _0x5602e8.appendChild(_0x1e6a99);
        }
        document.styleSheets[0].insertRule("@keyframes wave-" + _0x452814 + " {from { transform : translateY(0); color: white; }to   { transform : translateY(-" + _0x4277d2 + "px); }}", 0);
        for (let _0x4209da = 0; _0x4209da <= _0xa5bd48; _0x4209da++) {
          document.styleSheets[0].insertRule("\n                        #statusText" + _0x452814 + " :nth-child( " + _0xa5bd48 + "n + " + _0x4209da + ") {animation-delay : -" + (_0xa5bd48 - _0x4209da) * 2 * _0x564c39 / _0xa5bd48 + "s;}", 0);
        }
        break;
      case "typing":
        const _0x320107 = 350 - _0x4ce090 * 50;
        _0x5602e8.innerHTML = "";
        typeWrite(_0x5602e8, [..._0x2cd3a3], [..._0x46a1df], _0x320107);
        makeElement(_0x1f1135, "div", "caret");
        _0x1f1135.style.marginTop = "-7px";
        _0x5602e8.style.display = "inline-block";
        break;
      case "slideright":
        _0x564c39 = (3500 - _0x4ce090 * 500 + 500) * 2;
        _0x5602e8.innerHTML = "";
        for (let _0x1b7f1a = 0; _0x1b7f1a < _0x2cd3a3.length; _0x1b7f1a++) {
          const _0x521063 = makeElement(_0x5602e8, "span");
          if (_0x2cd3a3[_0x1b7f1a] === " ") {
            _0x521063.innerHTML = "&nbsp;";
          } else {
            _0x521063.innerText = _0x2cd3a3[_0x1b7f1a];
          }
          _0x521063.style.cssText = "opacity: 0;display: inline-block;transform: translateX(-50px);";
          _0x521063.animate([{
            opacity: 0
          }, {
            opacity: 0.2
          }, {
            opacity: 0.5,
            transform: "scaleX(1.33)"
          }, {
            opacity: 1,
            transform: "scaleX(1)"
          }, {
            opacity: 1,
            transform: "translate(0px)",
            offset: 0.45
          }, {
            opacity: 1,
            transform: "translate(0px)",
            offset: 0.75
          }, {
            opacity: 1,
            transform: "scaleX(1)"
          }, {
            opacity: 0,
            transform: "translateX(75px) scaleX(1.33)"
          }], {
            delay: (_0x2cd3a3.length - _0x1b7f1a) * 100,
            endDelay: (_0x2cd3a3.length - _0x1b7f1a) * 100,
            duration: _0x564c39,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "slidedown":
        _0x564c39 = (3500 - _0x4ce090 * 500 + 500) * 2;
        _0x5602e8.innerHTML = "";
        for (let _0x2ca053 = 0; _0x2ca053 < _0x2cd3a3.length; _0x2ca053++) {
          const _0x2bae60 = makeElement(_0x5602e8, "span");
          if (_0x2cd3a3[_0x2ca053] === " ") {
            _0x2bae60.innerHTML = "&nbsp;";
          } else {
            _0x2bae60.innerText = _0x2cd3a3[_0x2ca053];
          }
          _0x2bae60.style.cssText = "opacity: 0;display: inline-block;transform: translateY(-50px);";
          _0x2bae60.animate([{
            opacity: 0
          }, {
            opacity: 0.2
          }, {
            opacity: 0.5,
            transform: "scaleY(1.33)"
          }, {
            opacity: 1,
            transform: "scaleY(1)"
          }, {
            opacity: 1,
            transform: "translateY(0px)",
            offset: 0.45
          }, {
            opacity: 1,
            transform: "translateY(0px)",
            offset: 0.75
          }, {
            opacity: 1,
            transform: "scaleY(1)"
          }, {
            opacity: 0,
            transform: "translateY(75px) scaleY(1.33)"
          }], {
            delay: _0x2ca053 * 100,
            endDelay: (_0x2cd3a3.length - _0x2ca053) * 100,
            duration: _0x564c39,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "flip":
        _0x564c39 = (3500 - _0x4ce090 * 500 + 500) * 2;
        _0x5602e8.innerHTML = "";
        for (let _0x20586c = 0; _0x20586c < _0x2cd3a3.length; _0x20586c++) {
          const _0x16aadb = makeElement(_0x5602e8, "span");
          if (_0x2cd3a3[_0x20586c] === " ") {
            _0x16aadb.innerHTML = "&nbsp;";
          } else {
            _0x16aadb.innerText = _0x2cd3a3[_0x20586c];
          }
          _0x16aadb.style.cssText = "display: inline-block;transform-origin: bottom;transform: rotateY(-90deg);";
          _0x16aadb.animate([{
            transform: "rotateY(-90deg)"
          }, {
            transform: "rotateY(0deg)",
            offset: 0.15
          }, {
            transform: "rotateY(0deg)",
            offset: 0.85
          }, {
            transform: "rotateY(-90deg)"
          }], {
            delay: _0x20586c * 100,
            endDelay: (_0x2cd3a3.length - _0x20586c) * 100,
            duration: _0x564c39,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
    }
  }
  return _0x5602e8;
}
function typeWrite(_0x2b597c, _0x514669, _0x52ec5b, _0x2b9a4f, _0x233f92 = 0, _0xa94548 = 1) {
  if (document.body.contains(_0x2b597c)) {
    if (_0xa94548 == 1) {
      if (_0x233f92 < _0x514669.length) {
        if (_0x514669[_0x233f92] === " ") {
          _0x2b597c.innerHTML += "&nbsp;";
        } else {
          _0x2b597c.innerText += _0x514669[_0x233f92];
        }
        setTimeout(() => typeWrite(_0x2b597c, _0x514669, _0x52ec5b, _0x2b9a4f, _0x233f92 + 1, 1), _0x2b9a4f);
      } else {
        setTimeout(() => typeWrite(_0x2b597c, _0x514669, _0x52ec5b, _0x2b9a4f, 0, -1), _0x2b9a4f + 500);
      }
    } else if (_0x233f92 <= _0x514669.length) {
      const _0x3b178b = _0x514669.slice(0, _0x514669.length - _0x233f92).join("");
      _0x2b597c.innerText = _0x3b178b;
      setTimeout(() => typeWrite(_0x2b597c, _0x514669, _0x52ec5b, _0x2b9a4f, _0x233f92 + 1, -1), _0x2b9a4f);
    } else {
      setTimeout(() => typeWrite(_0x2b597c, _0x52ec5b, _0x514669, _0x2b9a4f, 0, 1), _0x2b9a4f + 500);
    }
  }
}
function getTextWidth(_0x2adcb2, _0x137336) {
  const _0x3e05ab = (getTextWidth.canvas ||= document.createElement("canvas")).getContext("2d");
  _0x3e05ab.font = _0x137336;
  return _0x3e05ab.measureText(_0x2adcb2).width;
}
function doAudies(_0xcf767a) {
  if (_0xcf767a && _0xcf767a.target.dataset.sound) {
    doSound(_0xcf767a.target.dataset.sound, true);
  }
}
function zapShake(_0x258e89, _0x442f6b) {
  document.body.classList.add("bump");
  setTimeout(() => {
    document.body.classList.remove("bump");
  }, 1300);
  doSound(_0x258e89 ? "laserfire3" : _0x442f6b || "raspberry");
}
function handleLink(_0x34d1cb, _0x379294, _0x36cc36) {
  if (_0x379294.isApp) {
    _0x379294.callBack();
  } else {
    _0x34d1cb.preventDefault();
    if (_0x379294.link.indexOf("youtu.be/") != -1 || _0x379294.link.indexOf("youtube.com/watch?") != -1 && _0x379294.link.indexOf("v=") != -1 && !_0x34d1cb.ctrlKey) {
      displayVideo(_0x379294.link, _0x36cc36);
    } else {
      LinkValidator(_0x34d1cb, _0x379294.link);
    }
  }
}
function displayVideo(_0x539e2e, _0x29ab0a) {
  if (Settings.youtube == "app") {
    openApp({
      type: "media",
      link: _0x539e2e.replace(/＆/g, "&")
    });
  } else {
    let _0x457195 = null;
    let _0x4edd36 = 0;
    let _0x4414e1 = null;
    let _0x4695c5 = 0;
    setAppIcon(10001);
    _0x457195 = _0x539e2e.indexOf("youtu.be/") != -1 ? _0x539e2e.split(".be/")[1].split("?")[0] : _0x539e2e.split("v=")[1].split("＆")[0].split("&")[0];
    if (_0x539e2e.indexOf("t=") != -1) {
      _0x4edd36 = xInt(_0x539e2e.split("t=")[1].split("＆")[0].split("&")[0]);
    }
    if (_0x539e2e.indexOf("list=") != -1) {
      _0x4414e1 = _0x539e2e.split("list=")[1].split("＆")[0].split("&")[0];
      if (_0x539e2e.indexOf("index=") != -1) {
        _0x4695c5 = _0x539e2e.split("index=")[1].split("＆")[0].split("&")[0] - 1;
      }
    }
    resizeBtn = document.querySelector("#playerResize");
    playerToolBar = document.querySelector("#playerToolBar");
    playerContainer = document.querySelector("#playerContainer");
    let _0x3b39b0 = parent.w_sound & 8 ? parent.w_Vol[3] : 0;
    if (Player) {
      let _0x721115 = document.querySelector("#playerTitle");
      let _0x4aaf03 = GetTranslation("mob2.sentby", [_0x29ab0a]);
      _0x4aaf03 ||= "Sent by " + _0x29ab0a;
      _0x721115.innerHTML = _0x4aaf03;
      playerContainer.style.display = "block";
      if (_0x4414e1) {
        Playlist = true;
        Player.loadPlaylist({
          list: _0x4414e1,
          listType: "playlist",
          index: _0x4695c5,
          startSeconds: _0x4edd36
        });
      } else {
        Playlist = false;
        Player.loadVideoById(_0x457195, _0x4edd36);
      }
      Player.setVolume(_0x3b39b0);
    } else {
      let _0x4e420c = document.createElement("script");
      _0x4e420c.src = "https://www.youtube.com/iframe_api";
      let _0x15f19d = document.getElementsByTagName("script")[0];
      _0x15f19d.parentNode.insertBefore(_0x4e420c, _0x15f19d);
      addToolTip(playerToolBar, ["mob2.minimize", "Double-click to minimize"], {
        position: "low"
      });
      window.onYouTubeIframeAPIReady = () => {
        Player = new YT.Player("player", {
          width: "260",
          height: "146",
          playerVars: {
            playsinline: 1
          },
          events: {
            onStateChange: _0x30eb61 => {
              if (_0x30eb61.data == YT.PlayerState.ENDED && !Playlist) {
                setAppIcon(0);
                playerContainer.style.display = "none";
                Player.stopVideo();
              }
            },
            onError: _0x38f9b1 => {
              if (Playlist && _0x457195) {
                Playlist = false;
                Player.loadVideoById(_0x457195, _0x4edd36);
              }
            },
            onReady: _0x503fa3 => {
              playerContainer.style.display = "block";
              if (_0x4414e1) {
                Playlist = true;
                Player.loadPlaylist({
                  list: _0x4414e1,
                  listType: "playlist",
                  index: _0x4695c5,
                  startSeconds: _0x4edd36
                });
              } else {
                Playlist = false;
                Player.loadVideoById(_0x457195, _0x4edd36);
              }
              Player.setVolume(_0x3b39b0);
            }
          }
        });
      };
      let _0x4ced0c = document.querySelector("#playerTitle");
      let _0x319aef = GetTranslation("mob2.sentby", [_0x29ab0a]);
      _0x319aef ||= "Sent by " + _0x29ab0a;
      if (_0x4ced0c) {
        _0x4ced0c.innerHTML = _0x319aef;
      }
      if (!Classic) {
        playerToolBar.style.top = "0px";
        playerToolBar.style.opacity = "1";
      }
      addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
        position: "low"
      });
      if (Classic) {
        playerToolBar.addEventListener("dblclick", () => {
          if (minimized) {
            minimized = false;
            playerContainer.className = "";
            resizeBtn.style.display = "block";
            playerContainer.style.top = (document.body.clientHeight - playerContainer.clientHeight) / 2 + "px";
            playerContainer.style.left = (document.body.clientWidth - playerContainer.clientWidth) / 2 + "px";
            addToolTip(playerToolBar, ["mob2.minimize", "Double-click to minimize"], {
              position: "low"
            });
            positionPlayer();
          } else {
            minimized = true;
            resizeBtn.style.display = "none";
            playerContainer.style.left = "0px";
            playerContainer.className = "min";
            playerContainer.style.top = document.body.clientHeight - 20 + "px";
            addToolTip(playerToolBar, ["mob2.maximize", "Double-click to maximize"], {
              position: "low"
            });
          }
        });
      }
      let _0x7405e9 = document.querySelector("#playerClose");
      addToolTip(_0x7405e9, ["mob1.close", "Close"], {
        position: "low"
      });
      let _0x5de912 = document.querySelector("#playerSet");
      if (_0x5de912) {
        addToolTip(_0x5de912, ["mob1.settings", "Settings"], {
          position: "low"
        });
        _0x5de912.addEventListener("click", () => {
          classicSetDialog("actions", config.MyId);
          classicSetDialog("settings", {
            tab: "appearance",
            UserNo: config.MyId
          });
        });
      }
      let _0x5d80e3 = document.querySelector("#playerSwitch");
      if (_0x5d80e3) {
        addToolTip(_0x5d80e3, ["mob1.switch", "Switch to media app"], {
          position: "low"
        });
        _0x5d80e3.addEventListener("click", () => {
          let _0x9c6690 = Player.getVideoUrl().replace(/＆/g, "&");
          playerContainer.style.display = "none";
          Player.stopVideo();
          openApp({
            type: "media",
            link: _0x9c6690
          });
        });
      }
      _0x7405e9.addEventListener("click", () => {
        setAppIcon(0);
        playerContainer.style.display = "none";
        Player.stopVideo();
      });
      window.addEventListener("touchstart", playerDragStart, false);
      window.addEventListener("touchend", playerDragEnd, false);
      window.addEventListener("touchmove", playerDrag, false);
      window.addEventListener("mousedown", playerDragStart, false);
      window.addEventListener("mouseup", playerDragEnd, false);
      window.addEventListener("mousemove", playerDrag, false);
      window.addEventListener("resize", () => {
        positionPlayer();
      });
      positionPlayer((document.body.clientWidth - 260) / 2, (document.body.clientHeight - 146) / 2);
    }
  }
}
function ColorTitle() {
  var _0x49a42c;
  config.ButColW = config.ButColW ? config.ButColW : parent.config ? parent.config.ButColW : "";
  config.ButCol = config.ButCol ? config.ButCol : parent.config ? parent.config.ButCol : "";
  var _0x4074a3 = ["dialogTitleBar"];
  _0x49a42c = hasDarkMode() ? "color:#969696; background-color: #313131; background-image: linear-gradient(rgba(255, 255, 255, 5%), rgba(0, 0, 0, 5%));" : "color:#" + toHex6(config.ButColW) + "; background-color: #" + toHex6(config.ButCol);
  if (config.ButColW && config.ButCol) {
    let _0x342cad = document.getElementsByClassName("dialogTitle");
    for (let _0x1e6d23 = 0; _0x1e6d23 < _0x342cad.length; _0x1e6d23++) {
      _0x342cad[_0x1e6d23].style.cssText = "color:#" + (hasDarkMode() ? "969696" : toHex6(config.ButColW));
    }
    for (var _0x24d331 in _0x4074a3) {
      var _0x1544a1;
      var _0x5bb09d = document.getElementsByClassName(_0x4074a3[_0x24d331]);
      for (_0x1544a1 = 0; _0x1544a1 < _0x5bb09d.length; _0x1544a1++) {
        _0x5bb09d[_0x1544a1].style.cssText = _0x49a42c;
      }
    }
  }
}
function powerAd(_0x372732, _0x57d899) {
  var _0x3ce915;
  var _0x4d66dd;
  var _0x2a72d8;
  var _0x5d8b52;
  var _0x3678cd;
  var _0x304ab8;
  var _0x1c39ef;
  var _0x1d398b;
  let _0x4ca630 = TOPSH || ((_0x3ce915 = xrRoot) == null || (_0x4d66dd = _0x3ce915.xConsts) == null ? undefined : _0x4d66dd.topsh);
  if (!_0x4ca630 || _0x372732.toLowerCase() == "tickle") {
    return;
  }
  if (((_0x2a72d8 = xrRoot) == null || (_0x5d8b52 = _0x2a72d8.xConsts) == null ? undefined : _0x5d8b52.Stickers[_0x57d899]) || STICKERS && STICKERS[_0x57d899]) {
    classicSetDialog("selector", {
      Type: "Stickers",
      Pack: _0x372732,
      Config: config
    });
    return;
  }
  let _0x279c08 = [_0x372732];
  for (let _0x2e2988 in _0x4ca630) {
    if (_0x4ca630[_0x2e2988] == _0x57d899) {
      _0x279c08.push(_0x2e2988);
    }
  }
  if (_0x279c08.length > 12) {
    _0x279c08 = _0x279c08.splice(0, 12);
  }
  const _0x93e655 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  let _0x561afa = makeElement(null, "img");
  _0x561afa.src = _0x93e655;
  _0x561afa.width = "16";
  _0x561afa.alt = "close";
  let _0x1e925c = makeElement(null, "div");
  let _0xd81614 = makeElement(_0x1e925c, "div", "modalDialogContentClassic");
  let _0x29b7e4 = makeElement(_0xd81614, "div", "dialogTitleBar");
  let _0x157341 = makeElement(_0x29b7e4, "span", "dialogTitle link", "openLink");
  makeElement(_0x29b7e4, "span", "dialogTitleAction", "id_ModalClose").appendChild(_0x561afa);
  let _0x45108a = makeElement(_0xd81614, "div", "dialogBody");
  let _0x55fea4 = makeElement(_0x45108a, "div", "dialogPadding");
  let _0x427bdc = makeElement(_0x55fea4, "div", "wrapper powerAd", "wrapper");
  let _0xf76b07 = makeElement(_0x45108a, "div", "dialogActions");
  let _0x3a5051 = makeElement(_0xf76b07, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "actionButton"));
  _0x157341.appendChild(document.createTextNode(_0x372732.charAt(0).toUpperCase() + _0x372732.slice(1)));
  _0xd81614.dataset.w = 0.6;
  let _0x27dd43 = [];
  let _0x4029ee = [];
  let _0x344f17 = SUPERPOWERS || ((_0x3678cd = xrRoot) == null || (_0x304ab8 = _0x3678cd.xConsts) == null ? undefined : _0x304ab8.SuperPowers);
  if (SUPERPOWERS && SUPERPOWERS[_0x57d899] || ((_0x1c39ef = xrRoot) == null || (_0x1d398b = _0x1c39ef.xConsts) == null ? undefined : _0x1d398b.SuperPowers[_0x57d899])) {
    var _0x2bb415;
    var _0x6485c2;
    _0x3a5051.appendChild(document.createTextNode("Required Powers"));
    let _0x3913c8 = SUPERPAWNS || ((_0x2bb415 = xrRoot) == null || (_0x6485c2 = _0x2bb415.xConsts) == null ? undefined : _0x6485c2.SuperPawns);
    for (let _0x23b0f1 in _0x3913c8) {
      if (_0x3913c8.hasOwnProperty(_0x23b0f1) && _0x3913c8[_0x23b0f1] == _0x57d899) {
        _0x4029ee.push(_0x23b0f1);
      }
    }
    if (_0x4029ee.length > 24) {
      _0x4029ee = _0x4029ee.splice(0, 24);
    }
    for (let _0xa6ceec in _0x344f17) {
      if (_0x344f17.hasOwnProperty(_0xa6ceec) && _0xa6ceec == _0x57d899) {
        for (var _0x238ca4 = 0; _0x238ca4 < _0x344f17[_0xa6ceec].length; _0x238ca4++) {
          _0x27dd43.push(PSSA[_0x344f17[_0xa6ceec][_0x238ca4] + 1]);
        }
      }
    }
    let _0x2d13aa = makeElement(_0x427bdc, "div", "superPowers");
    addText(makeElement(_0x2d13aa, "span", "spTitle"), "Available Pawns:");
    _0x4029ee.forEach((_0x14e64e, _0x572c30) => {
      let _0x49997c = makeElement(_0x2d13aa, "div", "smCell");
      makeElement(_0x49997c, "div", "box", "boxSP" + _0x572c30);
    });
  } else {
    var _0x552193;
    var _0x5f4ef9;
    if (ISGRP && ISGRP[_0x57d899] || ((_0x552193 = xrRoot) == null || (_0x5f4ef9 = _0x552193.xConsts) == null ? undefined : _0x5f4ef9.isgrp[_0x57d899])) {
      _0x157341.innerHTML = "";
      addText(_0x157341, ["box.238", "Assign or Unassign $1 to this chat group."]);
      _0x157341.innerHTML = _0x157341.innerHTML.replace("$1", _0x372732.charAt(0).toUpperCase() + _0x372732.slice(1));
      addText(_0x3a5051, ["mob2.assign", "Assign"]);
      _0x3a5051.parentNode.classList.remove("centered");
      _0x3a5051.parentNode.classList.add("aligned");
      addText(makeElement(_0xf76b07, "div", "butcontainer previewBut aligned").appendChild(makeElement(null, "div", "butlayout", "actionButton2")), ["mob2.unassign", "Unassign"]);
    } else {
      _0x3a5051.appendChild(document.createTextNode("Buy Now"));
    }
    let _0x4f39d6 = makeElement(_0x427bdc, "div");
    _0x279c08.forEach((_0x5badcd, _0x2a646b) => {
      let _0x38a535 = makeElement(_0x4f39d6, "div", "smCell");
      makeElement(_0x38a535, "div", "box", "box" + _0x2a646b);
    });
  }
  HiddenDivs.AlertDialog = _0x1e925c.innerHTML;
  doModal("AlertDialog");
  ColorTitle();
  setButCols(config.ButCol, config.ButColW);
  if (_0x4029ee.length > 0) {
    document.getElementById("openLink").innerHTML += " - COLLECTION";
    _0x4029ee.forEach((_0x1e8874, _0x1d7b2b) => {
      document.querySelector("#boxSP" + _0x1d7b2b).appendChild(createSm("(p1" + _0x1e8874 + "#)", "smilieHolder", 40, -5, null, null, "(hat#h#" + _0x1e8874 + ")"));
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      document.querySelector("#actionButton").innerHTML = "";
      document.querySelector("#actionButton").appendChild(document.createTextNode("Buy Now"));
      document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
        if (Classic) {
          window.open("https://rxat.ro/store", "_blank");
        } else {
          ToC({
            Command: "StartStore",
            Power: _0x57d899
          });
        }
      });
      (_0x427bdc = document.querySelector("#wrapper")).innerHTML = "";
      let _0x4aed8a = makeElement(_0x427bdc, "div");
      _0x279c08.forEach((_0x2181b5, _0x3d2f29) => {
        let _0x246e4c = makeElement(_0x4aed8a, "div", "smCell");
        makeElement(_0x246e4c, "div", "box", "box" + _0x3d2f29);
      });
      _0x279c08.forEach((_0x466b87, _0x100eb6) => {
        let _0x1f8da4 = document.querySelector("#box" + _0x100eb6);
        _0x1f8da4.appendChild(createSm("(" + _0x466b87 + "#)", "smilieHolder", 40, -5, true));
        _0x1f8da4.addEventListener("click", () => {
          smiliePressed("(" + _0x466b87 + ")");
        });
      });
      let _0x3608c9 = makeElement(_0x427bdc, "div", "superPowers");
      addText(makeElement(_0x3608c9, "span", "spTitle"), "Required Powers:");
      _0x27dd43.forEach((_0x35233d, _0x31067f) => {
        let _0x182b24 = makeElement(_0x3608c9, "div", "smCell");
        makeElement(_0x182b24, "div", "box", "boxSP" + _0x31067f);
      });
      _0x27dd43.forEach((_0x346a7f, _0x30451a) => {
        document.querySelector("#boxSP" + _0x30451a).appendChild(createSm("(" + _0x346a7f + "#)", "smilieHolder", 40, -5));
      });
    });
  } else {
    _0x279c08.forEach((_0x861d9d, _0x235e15) => {
      let _0x2a833d = document.querySelector("#box" + _0x235e15);
      _0x2a833d.appendChild(createSm("(" + _0x861d9d + "#)", "smilieHolder", 40, -5, true));
      _0x2a833d.addEventListener("click", () => {
        smiliePressed("(" + _0x861d9d + ")");
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      var _0x4f621f;
      var _0x5e4ac3;
      if (ISGRP && ISGRP[_0x57d899] || ((_0x4f621f = xrRoot) == null || (_0x5e4ac3 = _0x4f621f.xConsts) == null ? undefined : _0x5e4ac3.isgrp[_0x57d899])) {
        ToC({
          Type: "Assign",
          p: _0x57d899,
          a: 1
        });
      } else if (Classic) {
        window.open("https://rxat.ro/store", "_blank");
      } else {
        ToC({
          Command: "StartStore",
          Power: _0x57d899
        });
      }
    });
    if (document.querySelector("#actionButton2")) {
      document.querySelector("#actionButton2").parentNode.addEventListener("click", () => {
        ToC({
          Type: "Assign",
          p: _0x57d899,
          a: 0
        });
      });
    }
  }
  document.querySelector("#openLink").addEventListener("click", () => {
    HitWiki(_0x372732);
  });
  document.querySelector("#id_ModalClose").addEventListener("click", () => {
    modalClose();
  });
}
function doSound(_0x247aea, _0x47484f) {
  let _0x219c25 = _0x47484f ? "https://rxat.ro/content/sounds/audies/" + _0x247aea + ".webm" : "https://rxat.ro/web_gear/chat/snd/" + _0x247aea + ".mp3";
  new parent.Howl({
    src: [_0x219c25],
    volume: _0x247aea == "laserfire3" ? 1 : parent.w_Vol[1] / 100
  }).play();
}
let posX = 0;
let posY = 0;
let tolerance = 50;
let active = false;
let active2 = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = null;
let yOffset = null;
function playerDrag(_0x94db46) {
  if (active) {
    _0x94db46.preventDefault();
    hideTooltip();
    let _0x5b6005 = document.body.clientWidth;
    let _0x6fe89e = document.body.clientHeight;
    let _0x565f76 = 0;
    let _0x2bca04 = 0;
    if (_0x94db46.type === "touchmove") {
      _0x565f76 = _0x94db46.touches[0].clientX - initialX;
      _0x2bca04 = _0x94db46.touches[0].clientY - initialY;
      currentX = Math.min(_0x5b6005 + tolerance, Math.max(-tolerance, _0x565f76));
      currentY = Math.min(_0x6fe89e + tolerance, Math.max(-tolerance, _0x2bca04));
    } else {
      _0x565f76 = _0x94db46.clientX - initialX;
      _0x2bca04 = _0x94db46.clientY - initialY;
      currentX = Math.min(_0x5b6005 + tolerance, Math.max(-tolerance, _0x565f76));
      currentY = Math.min(_0x6fe89e + tolerance, Math.max(-tolerance, _0x2bca04));
      if (_0x94db46.clientX < -tolerance || _0x94db46.clientY < -tolerance || _0x94db46.clientX > _0x5b6005 + tolerance || _0x94db46.clientY > _0x6fe89e + tolerance) {
        posX = 0;
        posY = 0;
        active = false;
        active2 = false;
        positionPlayer();
        return false;
      }
    }
    xOffset = currentX;
    yOffset = currentY;
    positionPlayer(currentX, currentY);
  } else if (active2) {
    hideTooltip();
    let _0x63da24 = 0;
    let _0x14705c = 0;
    if (_0x94db46.type === "touchmove") {
      _0x63da24 = posX - _0x94db46.touches[0].clientX;
      posX = _0x94db46.touches[0].clientX;
      _0x14705c = posY - _0x94db46.touches[0].clientY;
      posY = _0x94db46.touches[0].clientY;
    } else {
      _0x63da24 = posX - _0x94db46.clientX;
      posX = _0x94db46.clientX;
      _0x14705c = posY - _0x94db46.clientY;
      posY = _0x94db46.clientY;
    }
    let _0x36cf9b = 200;
    let _0xc1f2b4 = 500;
    let _0x41ffa0 = parseInt(getComputedStyle(Player.getIframe(), "").width) + _0x63da24;
    let _0x336368 = parseInt(getComputedStyle(Player.getIframe(), "").height) + _0x14705c;
    if (_0x41ffa0 > _0xc1f2b4 || _0x41ffa0 < _0x36cf9b) {
      _0x63da24 = 0;
      _0x41ffa0 = parseInt(getComputedStyle(Player.getIframe(), "").width);
    }
    if (_0x336368 > 281 || _0x336368 < 112) {
      _0x14705c = 0;
      _0x336368 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    if (_0x41ffa0 > _0xc1f2b4 && _0x336368 > 281 || _0x41ffa0 < _0x36cf9b && _0x336368 < 112) {
      _0x63da24 = 0;
      _0x41ffa0 = parseInt(getComputedStyle(Player.getIframe(), "").width);
      _0x14705c = 0;
      _0x336368 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    Player.getIframe().style.width = _0x41ffa0 + "px";
    playerContainer.style.left = parseInt(playerContainer.style.left) - _0x63da24 + "px";
    Player.getIframe().style.height = _0x336368 + "px";
    playerContainer.style.top = parseInt(playerContainer.style.top) - _0x14705c + "px";
  }
}
function playerDragEnd(_0x304bd8) {
  posX = 0;
  posY = 0;
  active = false;
  active2 = false;
  positionPlayer();
  initialX = currentX;
  initialY = currentY;
  if (_0x304bd8.target === playerToolBar) {
    addToolTip(playerToolBar, minimized ? ["mob2.minimize", "Double-click to minimize"] : ["mob2.maximize", "Double-click to maximize"], {
      position: "low"
    });
  }
  if (_0x304bd8.target === resizeBtn) {
    addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
      position: "low"
    });
  }
}
function playerDragStart(_0x6266c) {
  xOffset = playerContainer.offsetLeft;
  yOffset = playerContainer.offsetTop;
  if (_0x6266c.type === "touchstart") {
    initialX = _0x6266c.touches[0].clientX - xOffset;
    initialY = _0x6266c.touches[0].clientY - yOffset;
    posX = _0x6266c.touches[0].clientX;
    posY = _0x6266c.touches[0].clientY;
  } else {
    initialX = _0x6266c.clientX - xOffset;
    initialY = _0x6266c.clientY - yOffset;
    posX = _0x6266c.clientX;
    posY = _0x6266c.clientY;
  }
  if (_0x6266c.target === playerToolBar) {
    active = true;
    active2 = false;
  }
  if (_0x6266c.target === resizeBtn) {
    active2 = true;
    active = false;
  }
}
function positionPlayer(_0x321f10, _0x7b1e3) {
  let _0x26e3a4 = playerContainer.clientWidth;
  let _0x42097c = playerContainer.clientHeight;
  let _0x5b2c83 = document.body.clientWidth;
  let _0x1e3b43 = document.body.clientHeight;
  let _0x23c4de = 0;
  let _0x9e3f1a = 0;
  if (_0x321f10 && _0x7b1e3) {
    _0x23c4de = Math.min(_0x5b2c83 - _0x26e3a4, Math.max(0, _0x321f10));
    _0x9e3f1a = Math.min(_0x1e3b43 - _0x42097c, Math.max(0, _0x7b1e3));
  } else {
    _0x23c4de = Math.min(_0x5b2c83 - _0x26e3a4, Math.max(0, parseInt(getComputedStyle(playerContainer, "").left)));
    _0x9e3f1a = Math.min(_0x1e3b43 - _0x42097c, Math.max(0, parseInt(getComputedStyle(playerContainer, "").top)));
  }
  if (!minimized) {
    playerContainer.style.top = _0x9e3f1a + "px";
  }
  playerContainer.style.left = _0x23c4de + "px";
}
function setButCols(_0x16083c, _0x129f45) {
  _0x16083c ||= 80;
  _0x129f45 ||= 16777215;
  var _0x34c038 = "color:#" + toHex6(_0x129f45) + "; background-color: #" + toHex6(_0x16083c);
  var _0x2938c2 = ["butcontainer"];
  for (var _0xc44499 in _0x2938c2) {
    var _0x4e6bdc;
    var _0x1ffaf0 = document.getElementsByClassName(_0x2938c2[_0xc44499]);
    for (_0x4e6bdc = 0; _0x4e6bdc < _0x1ffaf0.length; _0x4e6bdc++) {
      _0x1ffaf0[_0x4e6bdc].style.cssText = _0x34c038;
    }
  }
}
function getTooltipInfo(_0x473a18) {
  if (_0x473a18.id == config.MyId || _0x473a18.id == "2") {
    return ["box.18", "Change your name, avatar and home page"];
  }
  if (xInt(_0x473a18.id) != 0) {
    let _0x5699cc = _0x473a18.id;
    if (_0x5699cc.substr(-9, 9) == "000000000") {
      _0x5699cc = _0x5699cc.substr(0, _0x5699cc.length - 9) + "B";
    } else if (_0x5699cc.substr(-6, 6) == "000000") {
      _0x5699cc = _0x5699cc.substr(0, _0x5699cc.length - 6) + "M";
    }
    let _0x39b411 = _0x473a18.registered || _0x473a18.regname;
    _0x39b411 ||= _0x5699cc;
    if (_0x473a18.status && _0x473a18.status.length > 0 && _0x473a18.pFlags & NamePowers.status) {
      if (_0x473a18.status.indexOf("#") != -1) {
        _0x39b411 += "<br>" + _0x473a18.status.split("#")[0];
      } else {
        _0x39b411 += "<br>" + _0x473a18.status;
      }
    }
    if (xInt(_0x473a18.id) < 100) {
      _0x39b411 += "<br>(xat staff)";
    } else {
      _0x39b411 += "<br>(NOT xat staff)";
    }
    return ["box.16", "Interact with $1", _0x39b411];
  }
}
let tooltip = null;
let timeoutId = null;
let showRapid = false;
function addToolTip(_0x189968, _0x9b8ac0, _0x3508bd = {}) {
  let {
    select: _0x5c2fef,
    position: _0x46c5c6,
    maxWidth: _0x163678,
    Rect: _0x2cae21,
    showRapid: _0x542ad5,
    shortTime: _0x59961e,
    dom: _0xbf61ca,
    timestamp: _0x4b490a,
    instant: _0x3f5e3f
  } = _0x3508bd;
  if (!_0x189968 || _0x9b8ac0.length == 0) {
    return;
  }
  if (_0x46c5c6 != "pointer") {
    _0x189968.style.cursor = "pointer";
  }
  _0x189968.style["pointer-events"] = "auto";
  _0xbf61ca ||= document;
  let _0x259826 = _0x3f5e3f ? 1 : _0x59961e ? 500 : 1000;
  if (_0x4b490a && !_0x189968.dataset.timestamp) {
    _0x189968.dataset.timestamp = _0x4b490a;
  }
  _0x189968.addEventListener(xrRoot.xrClassic ? "mouseenter" : "mousedown", _0x15d661 => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      if (!_0x189968.dataset.key || !!document.querySelector("[data-key=\"" + _0x189968.dataset.key + "\"]")) {
        hideTooltip();
        if (_0x189968.dataset.timestamp && !_0x542ad5) {
          _0x9b8ac0 = GetTimeToGo(_0x189968.dataset.timestamp);
        }
        tooltip = (_0x15d661.ctrlKey || _0x15d661.metaKey) && _0x542ad5 ? addHintText(_0x15d661, "Rapid: " + Macros.rapid, _0x46c5c6, _0x163678, _0x2cae21, _0xbf61ca) : addHintText(_0x15d661, _0x9b8ac0, _0x46c5c6, _0x163678, _0x2cae21, _0xbf61ca);
        if (_0x5c2fef) {
          tooltip.addEventListener("mouseenter", () => {
            window.clearTimeout(timeoutId);
          });
        }
        if (_0x542ad5) {
          _0xbf61ca.onkeydown = _0x16d442 => {
            if (_0x16d442.ctrlKey || _0x16d442.key == "Control") {
              let _0x4f1e96 = _0xbf61ca.querySelector("#tooltips");
              if (_0x4f1e96) {
                _0x4f1e96.parentNode.removeChild(_0x4f1e96);
              }
              tooltip = addHintText(_0x15d661, "Rapid: " + Macros.rapid, _0x46c5c6, _0x163678, _0x2cae21, _0xbf61ca);
            }
          };
          _0xbf61ca.onkeyup = _0x138a26 => {
            if (!_0x138a26.ctrlKey && _0x138a26.key == "Control") {
              let _0x237ee3 = _0xbf61ca.querySelector("#tooltips");
              if (_0x237ee3) {
                _0x237ee3.parentNode.removeChild(_0x237ee3);
              }
              tooltip = addHintText(_0x15d661, _0x9b8ac0, _0x46c5c6, _0x163678, _0x2cae21, _0xbf61ca);
            }
          };
        }
        _0xbf61ca.addEventListener("click", _0x35a38a => {
          if (_0x35a38a.target != tooltip) {
            hideTooltip();
          }
        });
        tooltip.addEventListener("mouseleave", () => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            let _0x294fc3 = _0xbf61ca.querySelector("#tooltips");
            if (_0x294fc3) {
              _0x294fc3.parentNode.removeChild(_0x294fc3);
            }
            tooltip = null;
          }, 100);
        });
        if (_0x5c2fef) {
          tooltip.addEventListener("click", () => {
            if (_0xbf61ca.body.createTextRange) {
              const _0x1587b5 = _0xbf61ca.body.createTextRange();
              _0x1587b5.moveToElementText(tooltip);
              _0x1587b5.select();
            } else if (window.getSelection) {
              const _0x15b880 = window.getSelection();
              const _0x5669f5 = _0xbf61ca.createRange();
              _0x5669f5.selectNodeContents(tooltip);
              _0x15b880.removeAllRanges();
              _0x15b880.addRange(_0x5669f5);
            }
          });
        }
      }
    }, tooltip ? 0 : _0x259826);
  });
  _0x189968.addEventListener("mouseleave", () => {
    window.clearTimeout(timeoutId);
    if (_0x542ad5) {
      _0xbf61ca.onkeyup = null;
      _0xbf61ca.onkeydown = null;
    }
    timeoutId = window.setTimeout(() => {
      let _0x11177a = _0xbf61ca.querySelector("#tooltips");
      if (_0x11177a) {
        _0x11177a.parentNode.removeChild(_0x11177a);
      }
      tooltip = null;
    }, 500);
  });
}
function hideTooltip() {
  tooltip = null;
  let _0x5c1a9e = document.querySelector("#tooltips");
  if (_0x5c1a9e) {
    _0x5c1a9e.parentNode.removeChild(_0x5c1a9e);
  }
}
function createSm(_0x590cda, _0x172f83, _0x567b2c, _0x2b37c6, _0x4b286d, _0x5d5ff5, _0x1f06f4, _0x27818f, _0x12908b, _0xef7a9d) {
  var _0x510896;
  var _0x42672b;
  _0x2b37c6 ||= -1;
  if ((_0x590cda = _0x590cda.replace(" ", "")).toLowerCase().indexOf("num#num") == -1) {
    _0x590cda = _0x590cda.toLowerCase();
  }
  const _0x4e4036 = document.createElement("span");
  if (_0x2b37c6 == -4) {
    makeElement(_0x4e4036, "br");
    _0x2b37c6 = -1;
  }
  if (_0x1f06f4) {
    _0x4e4036.dataset.superPawn = _0x1f06f4;
  }
  if (_0x4b286d) {
    _0x4e4036.dataset.noAd = true;
  }
  if (_0x590cda.substr(0, 6) == "(gifts") {
    if (_0x27818f) {
      _0x4e4036.dataset.userID = _0x27818f;
    }
    if (_0x12908b) {
      _0x4e4036.dataset.userName = _0x12908b;
    }
  }
  if (_0x590cda.substr(0, 6) == "(gifts") {
    _0x4e4036.addEventListener("click", () => {
      setAppIcon(20044);
      openGift({
        id: _0x27818f,
        regname: _0x12908b
      });
    });
  }
  let _0x443aae = _0x590cda.match(/\((.*?)(?:#|\))/);
  _0x443aae = _0x443aae ? _0x443aae[1] : _0x590cda;
  let _0x4115ed = PSSA || ((_0x510896 = xrRoot) == null || (_0x42672b = _0x510896.xConsts) == null ? undefined : _0x42672b.pssa);
  if (_0x4115ed && !_0x4b286d) {
    for (let _0x240f21 in _0x4115ed) {
      if (_0x443aae == _0x4115ed[_0x240f21]) {
        _0x4e4036.addEventListener("click", () => {
          if (_0x590cda.substr(0, 14) == "(radio#http://" || _0x590cda.substr(0, 15) == "(radio#https://") {
            let _0x3a6404 = _0x590cda.match(/\(radio#(.*?)(?:#.*?)?\)/)[1];
            if (parent.radio) {
              parent.radio.unload(true);
              parent.radio._src = [_0x3a6404];
              parent.radio.load();
              parent.radio.play();
            } else {
              parent.radio = new parent.Howl({
                src: [_0x3a6404],
                html5: true,
                volume: parent.w_Vol[1] / 100
              });
              parent.radio.play();
            }
          } else if (_0x443aae == "xavi") {
            openApp("xavi");
          } else {
            powerAd(_0x4115ed[_0x240f21], xInt(_0x240f21) - 1);
          }
        });
      }
    }
  }
  let _0xc68e4a = _0x590cda;
  if (_0x443aae.substr(0, 2) == "p1" || _0xc68e4a.substr(0, 1) == "<" || _0xef7a9d) {
    if (_0x1f06f4 && !_0xef7a9d) {
      addToolTip(_0x4e4036, _0x1f06f4, true);
    }
  } else {
    addToolTip(_0x4e4036, _0xc68e4a, true);
  }
  if (gconfig && /\(.*?\)/g.test(_0x590cda) && _0x590cda.indexOf("p1") == -1 && _0x590cda.indexOf("#") == -1 && Settings.gback != "disable") {
    if (gconfig.g130 !== undefined && gconfig.g130 != "") {
      _0x590cda = _0x590cda.split(")")[0] + "#" + gconfig.g130 + ")";
    }
    if (gconfig.g106 !== undefined && gconfig.g106 != "" && gconfig.g106 != "-1") {
      if (gconfig.g106.indexOf("#") != -1) {
        gconfig.g106 = gconfig.g106.split("#");
        gconfig.g106 = gconfig.g106[0] != "-1" ? gconfig.g106[0] : gconfig.g106[1];
        _0x590cda = _0x590cda.split(")")[0] + "#" + toHex6(gconfig.g106).toLowerCase() + ")";
      } else {
        _0x590cda = _0x590cda.split(")")[0] + "#" + toHex6(gconfig.g106).toLowerCase() + ")";
      }
    }
  }
  _0x172f83 += checkMirrorInvert(_0x590cda);
  _0x4e4036.setAttribute("class", _0x172f83);
  if (_0x590cda.charAt(0) == "<") {
    _0x590cda = IconToLib(_0x590cda, _0x567b2c);
  } else {
    if (_0x590cda.charAt(0) != "(") {
      _0x590cda = "(" + _0x590cda + ")";
    }
    _0x590cda = Animated + "_" + _0x590cda + "_" + _0x567b2c;
  }
  loadImage(_0x4e4036, _0x590cda, _0x2b37c6, 0, 0, _0x5d5ff5);
  return _0x4e4036;
}
function checkMirrorInvert(_0x1bb88c) {
  if (!_0x1bb88c) {
    return "";
  }
  var _0x1b3926 = _0x1bb88c.split("#");
  var _0x2da71d = false;
  var _0x87ded6 = false;
  if (_0x1b3926.length > 0) {
    for (let _0x2360f6 in _0x1b3926) {
      var _0x2ab7dc = _0x1b3926[_0x2360f6].toLowerCase().replace(")", "");
      if (_0x2ab7dc == "m") {
        _0x2da71d = true;
      }
      if (_0x2ab7dc == "i") {
        _0x87ded6 = true;
      }
      if (_0x2ab7dc == "mi" || _0x2ab7dc == "im") {
        _0x87ded6 = true;
        _0x2da71d = true;
      }
    }
  }
  let _0x399463 = "";
  if (_0x2da71d && _0x87ded6) {
    _0x399463 += " mirrorInvert";
  } else {
    if (_0x2da71d) {
      _0x399463 += " mirror";
    }
    if (_0x87ded6) {
      _0x399463 += " invert";
    }
  }
  return _0x399463;
}
function addSmiliesEvent(_0x283fcd) {
  _0x283fcd.querySelectorAll("[data-sm]").forEach(_0x480dfd => {
    var _0x4ab5c5;
    var _0x4540e0;
    if (_0x480dfd.dataset.sm[0] != "s" && _0x480dfd.dataset.sm[0] != "S") {
      return;
    }
    const _0x381cbe = _0x480dfd.dataset.sm.match(/(\(.+?\))/)[0];
    const _0xcbbcc = _0x381cbe.match(/\((.*?)(?:#|\))/)[1];
    const _0x134a60 = !!_0x480dfd.dataset.noAd;
    const _0x3677d3 = _0x480dfd.dataset.userID;
    const _0x44a402 = _0x480dfd.dataset.userName;
    if (_0xcbbcc == "gifts") {
      _0x480dfd.addEventListener("click", () => {
        setAppIcon(20044);
        openGift({
          id: _0x3677d3,
          regname: _0x44a402
        });
      });
    }
    let _0x19c6b9 = PSSA || ((_0x4ab5c5 = xrRoot) == null || (_0x4540e0 = _0x4ab5c5.xConsts) == null ? undefined : _0x4540e0.pssa);
    if (_0x19c6b9 && !_0x134a60) {
      for (let _0x517834 in _0x19c6b9) {
        if (_0xcbbcc == _0x19c6b9[_0x517834]) {
          _0x480dfd.addEventListener("click", () => {
            if (_0x381cbe.substr(0, 14) == "(radio#http://" || _0x381cbe.substr(0, 15) == "(radio#https://") {
              let _0x3c3831 = _0x381cbe.match(/\(radio#(.*?)(?:#.*?)?\)/)[1];
              if (parent.radio) {
                parent.radio.unload(true);
                parent.radio._src = [_0x3c3831];
                parent.radio.load();
                parent.radio.play();
              } else {
                parent.radio = new parent.Howl({
                  src: [_0x3c3831],
                  html5: true,
                  volume: parent.w_Vol[1] / 100
                });
                parent.radio.play();
              }
            } else if (_0xcbbcc == "xavi") {
              openApp("xavi");
            } else {
              powerAd(_0x19c6b9[_0x517834], xInt(_0x517834) - 1);
            }
          });
        }
      }
    }
    const _0x9a7ff4 = _0x381cbe;
    if (_0xcbbcc.substr(0, 2) != "p1" && _0x9a7ff4.substr(0, 1) != "<") {
      addToolTip(_0x480dfd, _0x9a7ff4, true);
    } else if (superPawn) {
      addToolTip(_0x480dfd, superPawn, true);
    }
  });
}
function openGift(_0x1dd692) {
  if (_0x1dd692) {
    classicSetDialog("selector", {
      Type: "Gifts",
      UserNo: _0x1dd692
    });
  }
}
function SmileyToHttp(_0x3b007a, _0x5edb1e) {
  if (_0x5edb1e == -3) {
    _0x5edb1e = 30;
  }
  _0x3b007a = _0x3b007a.trim();
  return encodeGetStrip(Animated + "_" + _0x3b007a + "_" + _0x5edb1e);
}
function encodeGetStrip(_0x363a4a) {
  if ((_0x363a4a = _0x363a4a.replace(/#/g, "*")).search(/[^0-9a-zA-Z_\*\(\)]/) >= 0) {
    let _0x1e2f45 = _0x363a4a.split("*");
    for (let _0x134d45 in _0x1e2f45) {
      if (!(_0x1e2f45[_0x134d45].search(/[^0-9a-zA-Z_\*\(\)]/) < 0)) {
        if (_0x1e2f45[_0x134d45].search(/\)/) >= 0) {
          let _0x1fba1f = _0x1e2f45[_0x134d45].split(")");
          _0x1e2f45[_0x134d45] = "!" + Base64EncodeUrl(_0x1fba1f[0]) + ")" + _0x1fba1f[1];
        } else {
          _0x1e2f45[_0x134d45] = "!" + Base64EncodeUrl(_0x1e2f45[_0x134d45]);
        }
      }
    }
    _0x363a4a = _0x1e2f45.join("*");
  }
  return "https://gs.rxat.ro/" + _0x363a4a;
}
function Base64EncodeUrl(_0x1fc23f) {
  let _0xa5c015 = encodeURIComponent(_0x1fc23f).replace(/%([0-9A-F]{2})/g, function (_0x50edb4, _0x45475e) {
    return String.fromCharCode("0x" + _0x45475e);
  });
  return (_0xa5c015 = btoa(_0xa5c015)).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
}
function IconToLib(_0x4d0a0b, _0x4fadf7) {
  var _0x56f92a;
  var _0x499767 = 0;
  var _0x57673f = 0;
  switch (_0x4d0a0b = _0x4d0a0b.substr(1, _0x4d0a0b.length - 2)) {
    case "del":
      _0x56f92a = "xdelete";
      _0x499767 = 1;
      break;
    case "o":
      _0x56f92a = "chatter2";
      _0x499767 = 2;
      break;
    case "priv":
      _0x56f92a = "lock";
      _0x4fadf7 = 12;
      break;
    case "i":
      _0x56f92a = "HelpIcon";
      _0x499767 = 1;
      break;
    case "inf8":
      _0x57673f = 39168;
    case "in":
      _0x56f92a = "HelpIcon";
      _0x499767 = 2;
      if (_0x4fadf7 == 20) {
        _0x4fadf7 = 18;
      }
      break;
    case "ho":
      _0x56f92a = "ho";
      _0x499767 = 1;
      break;
    default:
      return "";
  }
  return "g_" + _0x56f92a + "_" + _0x4fadf7 + "_" + _0x4fadf7 + "_" + _0x57673f + "_" + _0x499767;
}
function LoadBackground(_0x1e4929) {
  let _0xec5463;
  let _0x3d548a;
  let _0xe41c87 = _0x1e4929.split(";=");
  _0x1e4929 = config.xatback;
  let _0x101402 = config.page;
  _0x101402 ||= xrRoot.Page;
  switch (_0x101402) {
    case "visitors":
    case "messages":
    case "classic":
      if (_0xe41c87[1] && _0xe41c87[2]) {
        _0x1e4929 = _0xe41c87[2];
      } else if (!xrRoot.xrLandscape && !Classic && _0xe41c87[9].length > 0) {
        _0x1e4929 = _0xe41c87[9];
        _0xec5463 = 1;
      } else if (xrRoot.xrLandscape && !Classic && _0xe41c87[10].length > 0) {
        _0x1e4929 = _0xe41c87[10];
        _0x3d548a = 1;
      } else {
        _0x1e4929 = _0xe41c87[3];
      }
  }
  if (_0x1e4929.charAt(0) == "h") {
    _0x1e4929 = _0xec5463 ? SafeImage(_0x1e4929, 1136, 640) : SafeImage(_0x1e4929, 640, 1136);
  } else if (_0x1e4929.charAt(0) == "#" && _0x1e4929.length == 7) {
    document.body.style.background = _0x1e4929;
    return;
  }
  document.body.style.background = "url(\"" + _0x1e4929 + "\") no-repeat 0 0 / cover fixed";
  if (!Classic) {
    document.body.style.backgroundPosition = "left";
  }
}
function LoadImage(_0x403b8d, _0x181069, _0x2fc2c5, _0x41586d, _0x4e95bd, _0x499d68, _0x279bbe) {
  if (!_0x403b8d) {
    console.warn('LoadImage: _0x403b8d is null');
    return null;
  }
  var _0x3ef510;
  var _0x938674 = 30;
  var _0x5e7154 = 30;
  if (_0x41586d > 0) {
    _0x938674 = _0x5e7154 = _0x41586d;
  }
  if (_0x4e95bd) {
    if (_0x4e95bd.Width) {
      _0x5e7154 = _0x4e95bd.Width;
    }
    if (_0x4e95bd.Height) {
      _0x938674 = _0x4e95bd.Height;
    }
    xInt(_0x4e95bd.GreyCnt);
  } else {
    _0x4e95bd = {};
  }
  _0x41586d ||= _0x5e7154;
  var _0xb8cf37 = "";
  if (_0x41586d == 160) {
    _0xb8cf37 = "160";
  }
  if (parseInt(_0x181069) > 0) {
    _0x3ef510 = "https://rxat.ro/web_gear/chat/av/" + parseInt(_0x181069) + ".png";
  }
  _0x3ef510 ||= _0x181069;
  if (_0x3ef510.charAt(0) == "<") {
    if (_0x41586d <= 0) {
      _0x41586d = _0x938674;
    }
    _0x3ef510 = IconToLib(_0x3ef510, _0x41586d);
    _0x41586d = -3;
  }
  let _0x2980b2 = " " + checkMirrorInvert(_0x3ef510);
  let _0x343a0e = "avatarholder " + _0x2fc2c5;
  if (_0x3ef510.charAt(0) == ">") {
    _0x41586d = 20;
    _0x343a0e = Classic ? "appIconHolder" : "appIconHolder mobAppIcon";
    _0x3ef510 = "(" + _0x181069.substring(1) + "_" + _0x41586d + ")";
    _0x41586d = -3;
  }
  _0x403b8d.holder = createImage(_0x403b8d, _0x343a0e + _0xb8cf37 + _0x2980b2, _0x3ef510, _0x41586d, _0x499d68, _0x279bbe);
  return _0x403b8d.holder;
}
function createImage(_0x27660b, _0x13f03c, _0xfde100, _0x1bf5a5, _0x1309f4, _0x5cece1) {
  var _0x1d2892 = makeElement(_0x27660b, "span", _0x13f03c);
  loadImage(_0x1d2892, _0xfde100, _0x1bf5a5, 0, 0, _0x1309f4, _0x5cece1);
  return _0x1d2892;
}
var imgh = [];
var SmFudge = 14;
var SmFudgeSize = 19;
function Visible(_0x5ef475) {
  var _0x1c8719 = _0x5ef475.getBoundingClientRect();
  var _0x985cd2 = (_0x1c8719.top >= 0 && _0x1c8719.left >= 0 && _0x1c8719.top) <= (window.innerHeight || document.documentElement.clientHeight);
  if (_0x1c8719.bottom >= 0 && _0x985cd2) {
    return 1;
  } else {
    return 0;
  }
}
function loadImage(_0x2c4a38, _0x299158, _0x43b142, _0x9b989c, _0x30b545, _0x29477c, _0x1c53ad) {
  if (_0x299158 != "") {
    _0x29477c ||= 1;
    var _0x316c57 = _0x299158 ? _0x299158.charAt(0) : "";
    if (!(_0x43b142 > 0) || _0x316c57 == "h" || _0x316c57 == "(" || _0x316c57 == "/") {
      if (_0x316c57 == "(") {
        let _0x314823 = _0x299158.indexOf(")");
        if (_0x314823 < 0) {
          return;
        }
        _0x299158 = _0x299158.substr(0, _0x314823 + 1);
      }
      if (!_0x2c4a38 || (_0x299158 ? (_0x2c4a38.setAttribute("data-sm", _0x299158), _0x2c4a38.setAttribute("data-size", _0x43b142), _0x2c4a38.setAttribute("data-scale", _0x29477c)) : (_0x299158 = _0x2c4a38.getAttribute("data-sm"), _0x43b142 = _0x2c4a38.getAttribute("data-size"), _0x29477c = _0x2c4a38.getAttribute("data-scale")), LineVisible)) {
        var _0x23ca83;
        var _0x4f95d9 = _0x299158.hashCode();
        _0x9b989c ||= 6;
        _0x30b545 ||= 1;
        if ((_0x23ca83 = ImageHash[_0x4f95d9]) && _0x2c4a38) {
          for (var _0x1e3407 = _0x23ca83.length, _0x30e5f1 = 0; _0x30e5f1 < _0x1e3407; _0x30e5f1++) {
            var _0x1ad6da = _0x23ca83[_0x30e5f1];
            if (!_0x1ad6da[0] && _0x1ad6da[1]) {
              _0x2c4a38.appendChild(_0x1ad6da[1]);
              _0x1ad6da[0] = _0x2c4a38;
              ImageHash[_0x4f95d9].push(_0x1ad6da);
              ImageHash[_0x4f95d9].splice(_0x30e5f1, 1);
              return;
            }
          }
        }
        _0x23ca83 ||= ImageHash[_0x4f95d9] = [];
        _0x23ca83.push([_0x2c4a38, null]);
        if (!imgh[_0x4f95d9]) {
          imgh[_0x4f95d9] = new Image();
          imgh[_0x4f95d9].sm = _0x299158;
          imgh[_0x4f95d9].smer = _0x4f95d9;
          imgh[_0x4f95d9].size = _0x43b142;
          imgh[_0x4f95d9].scale = _0x29477c;
          imgh[_0x4f95d9].retries = _0x9b989c;
          imgh[_0x4f95d9].wait = imgh[_0x4f95d9].waitc = _0x30b545;
          imgh[_0x4f95d9].failed = false;
          if (_0x1c53ad) {
            imgh[_0x4f95d9].noPosition = true;
          }
          imgh[_0x4f95d9].onload = imageLoaded;
          imgh[_0x4f95d9].onerror = imageError;
          if (_0x23ca83[0][3]) {
            imgh[_0x4f95d9].src = _0x23ca83[0][3];
            imgh[_0x4f95d9].pRatio = _0x23ca83[0][4];
            if (_0x2c4a38 && _0x2c4a38.parentNode && imgh[_0x4f95d9].src.indexOf("gs.rxat.ro") == -1) {
              imgh[_0x4f95d9].pFlags = _0x2c4a38.parentNode.pFlags;
            }
            return;
          }
          var _0x59f879 = "";
          if (_0x299158 == "<i>") {
            _0x59f879 = iMux("GetStrip6.php?c=g_HelpIcon_" + _0x43b142 + "_" + _0x43b142 + "_0_1", "s");
          } else if (_0x299158.charAt(0) == "(" && (_0x43b142 == -3 || _0x43b142 > 0)) {
            _0x59f879 = SmileyToHttp(_0x299158, _0x43b142);
          } else if (parseInt(_0x299158) > 0) {
            _0x59f879 = "https://www.rxat.ro/web_gear/chat/av/" + parseInt(_0x299158) + ".png";
          }
          if (_0x43b142 < 0 && !_0x59f879 && _0x299158.charAt(0) != "h") {
            _0x59f879 = encodeGetStrip(_0x299158 = _0x299158.replace(/#w_\d*/g, "#_"));
          } else if (!_0x59f879) {
            if ((_0x299158 = (_0x299158 = _0x299158.split("#"))[0]).indexOf("Get") >= 0) {
              if (_0x299158.indexOf("gs.rxat.ro") >= 0) {
                _0x299158 = "";
              }
              if (_0x299158.indexOf("GetStrip") >= 0) {
                _0x299158 = "";
              }
              if (_0x299158.indexOf("GetImage") >= 0) {
                _0x299158 = (_0x299158 = _0x299158.split("U=")).length > 1 ? _0x299158[1] : "";
              }
            }
            _0x59f879 = SafeImage(_0x299158, _0x43b142, _0x43b142);
            if (_0x2c4a38 && _0x2c4a38.parentNode) {
              imgh[_0x4f95d9].pFlags = _0x2c4a38.parentNode.pFlags;
            }
          }
          imgh[_0x4f95d9].src = _0x59f879;
        }
      }
    }
  }
}
var HeightFramesH = {};
function imageLoaded(_0x549983) {
  var _0x459575 = _0x549983.target.smer;
  var _0x371e2c = imgh[_0x459575];
  if (_0x371e2c.width > 1 && _0x371e2c.height > 1) {
    var _0x27f157;
    var _0x1fdef1 = Math.round(_0x371e2c.width / _0x371e2c.height);
    var _0x2fd206 = _0x371e2c.width >= _0x371e2c.height * 3 && _0x371e2c.width % _0x371e2c.height == 0;
    if (_0x371e2c.pFlags != null && !(_0x371e2c.pFlags & 2048)) {
      _0x2fd206 = false;
    }
    if (_0x2fd206 && (_0x27f157 = _0x371e2c.height * _0x1fdef1, !HeightFramesH[_0x27f157])) {
      HeightFramesH[_0x27f157] = true;
      let _0x418ead = "";
      _0x418ead = Browser !== undefined && Browser == "FF" ? "@-webkit-keyframes sm_" + _0x27f157 + " { from { left: 0px; } to { left:-" + _0x27f157 + "px; } }" : "@-webkit-keyframes sm_" + _0x27f157 + " { from { transform: translate(0px); } to { transform: translate(-" + _0x27f157 + "px); } }";
      document.styleSheets[0].insertRule(_0x418ead, 0);
    }
    var _0x16f7e4 = ImageHash[_0x459575];
    if (!_0x16f7e4) {
      return;
    }
    var _0x29acf4 = ImageHash[_0x459575].length;
    var _0x1dede7 = 0.75;
    for (_0x371e2c.size == -3 ? _0x1dede7 = 1 : _0x371e2c.pRatio && (_0x1dede7 /= _0x371e2c.pRatio); --_0x29acf4 >= 0;) {
      if (!_0x16f7e4[_0x29acf4][1]) {
        var _0x4c9713 = document.createElement("span");
        if (_0x371e2c.size < 0) {
          let _0x5630a5 = "scale(" + _0x1dede7 + "," + _0x1dede7 + ")";
          if (Browser && Browser == "FF") {
            _0x5630a5 += " rotate(0.02deg)";
            _0x4c9713.style["image-rendering"] = "optimizequality";
          }
          _0x4c9713.style["-webkit-transform"] = _0x5630a5;
        } else {
          var _0x272587 = _0x371e2c.size / _0x371e2c.height * _0x371e2c.scale;
          let _0xd4703a = "scale(" + _0x272587 + "," + _0x272587 + ")";
          if (Browser && Browser == "FF") {
            _0xd4703a += " rotate(0.02deg)";
            _0x4c9713.style["image-rendering"] = "optimizequality";
          }
          _0x4c9713.style["-webkit-transform"] = _0xd4703a;
        }
        _0x4c9713.style.display = "block";
        _0x4c9713.style.width = _0x371e2c.height + "px";
        _0x4c9713.style.height = _0x371e2c.height + "px";
        _0x4c9713.style.overflow = "hidden";
        if (!_0x549983.target.noPosition) {
          _0x4c9713.style.position = "absolute";
        }
        if (_0x371e2c.size == -1) {
          var _0x1e95c5 = -(_0x371e2c.height - SmFudgeSize) / 2;
          _0x4c9713.style["margin-top"] = _0x1e95c5 - SmFudge + "px";
          _0x4c9713.style["margin-left"] = _0x1e95c5 + "px";
        } else {
          _0x1e95c5 = _0x371e2c.size == -2 ? -(_0x371e2c.height - 42) / 2 : _0x371e2c.size == -3 ? -(_0x371e2c.height - 30) / 2 : -(_0x371e2c.height - _0x371e2c.size * _0x371e2c.scale) / 2;
          _0x4c9713.style["margin-top"] = _0x1e95c5 + "px";
          _0x4c9713.style["margin-left"] = _0x1e95c5 + "px";
        }
        var _0x212131 = document.createElement("span");
        _0x212131.style.position = "absolute";
        _0x212131.style.top = "0px";
        _0x212131.style.left = "0px";
        _0x212131.style.width = (_0x2fd206 ? _0x371e2c.height * _0x1fdef1 : _0x371e2c.height) + "px";
        _0x212131.style.height = _0x371e2c.height + "px";
        var _0x260efd = _0x16f7e4[_0x29acf4][0];
        if (_0x2fd206) {
          _0x212131.style["-webkit-animation"] = "sm_" + _0x27f157 + " " + _0x1fdef1 * (1 / 12) + "s steps(" + _0x1fdef1 + ") infinite";
          _0x212131.setAttribute("data-animation", _0x212131.style["-webkit-animation"]);
        }
        _0x212131.style.background = "url(\"" + _0x371e2c.src + "\")no-repeat";
        _0x4c9713.appendChild(_0x212131);
        _0x16f7e4[_0x29acf4][1] = _0x4c9713;
        _0x16f7e4[_0x29acf4][2] = _0x371e2c.width * _0x371e2c.height;
        ImageMemory += _0x16f7e4[_0x29acf4][2];
        if (_0x260efd) {
          _0x260efd.appendChild(_0x4c9713);
        }
      }
    }
    _0x16f7e4[0][3] = imgh[_0x459575].src;
    _0x16f7e4[0][4] = imgh[_0x459575].pRatio;
    delete imgh[_0x459575];
  }
}
function imageError(_0x2c6b85) {
  if (_0x2c6b85.target.retries == -1) {
    var _0x2469f4 = _0x2c6b85.target.smer;
    delete imgh[_0x2469f4];
  } else {
    _0x2469f4 = _0x2c6b85.target.smer;
    imgh[_0x2469f4];
    if (imgh[_0x2469f4].retries > 0) {
      imgh[_0x2469f4].failed = true;
    } else {
      delete imgh[_0x2469f4];
    }
  }
}
function calcAvSize(_0x37bc0b) {
  if (_0x37bc0b <= 30) {
    return 30;
  } else if (_0x37bc0b <= 35) {
    return 35;
  } else if (_0x37bc0b <= 80) {
    return 80;
  } else if (_0x37bc0b == 100) {
    return 100;
  } else if (_0x37bc0b <= 160) {
    return 160;
  } else if (_0x37bc0b <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function calcStripSize(_0x20449b) {
  if (_0x20449b <= 20) {
    return 20;
  } else if (_0x20449b <= 30) {
    return 30;
  } else if (_0x20449b <= 35) {
    return 35;
  } else if (_0x20449b <= 40) {
    return 40;
  } else if (_0x20449b <= 80) {
    return 80;
  } else {
    return 160;
  }
}
var zapTimeout = null;
var manScrollTimeOut = -1;
var justScrolled = false;
function onUsersScrollEventHandler(_0x2a0fe9) {
  hideTooltip();
  if (!zapTimeout) {
    doZap(30);
  }
}
function onMessagesScrollEventHandler(_0x23db27) {
  let _0x1351bf = document.querySelector("#tooltips");
  if (_0x1351bf) {
    _0x1351bf.parentNode.removeChild(_0x1351bf);
  }
  if (justScrolled) {
    justScrolled = false;
  } else {
    manScrollTimeOut = 5;
    if (!zapTimeout) {
      doZap(30);
    }
  }
}
function onScrollEventHandler(_0x5b1403) {
  manScrollTimeOut = 5;
  if (!zapTimeout) {
    doZap(30);
  }
}
function doZap(_0x29af1f) {
  if (_0x29af1f) {
    zapTimeout = setTimeout(doZap, _0x29af1f);
  } else {
    zapTimeout = null;
    var _0x2a31db = document.querySelectorAll("[data-line]");
    for (var _0x42690a = _0x2a31db.length, _0x280e9c = [], _0x40a3fe = [], _0x5d7385 = 0; _0x5d7385 < _0x42690a; ++_0x5d7385) {
      var _0x42014d = _0x2a31db[_0x5d7385];
      var _0x2353e1 = _0x42014d.getAttribute("data-visible");
      var _0x5e2b51 = Visible(_0x42014d);
      if (_0x2353e1 != _0x5e2b51) {
        if (_0x5e2b51) {
          _0x280e9c.push(_0x42014d);
        } else {
          _0x40a3fe.push(_0x42014d);
        }
        _0x42014d.setAttribute("data-visible", _0x5e2b51);
      }
    }
    while (_0x40a3fe.length) {
      removeImages(_0x40a3fe.shift());
    }
    while (_0x280e9c.length) {
      reloadImages(_0x280e9c.shift());
    }
  }
}
function removeImages(_0x59eeaa) {
  var _0x14bc4e = _0x59eeaa.querySelectorAll("[data-sm]");
  for (var _0x40d073 = _0x14bc4e.length, _0x3c5adc = 0; _0x3c5adc < _0x40d073; ++_0x3c5adc) {
    var _0x1e087d = _0x14bc4e[_0x3c5adc];
    var _0x13133c = _0x1e087d.getAttribute("data-sm");
    var _0x1b68f3 = ImageHash[_0x13133c.hashCode()];
    if (!_0x1b68f3) {
      return;
    }
    for (var _0x289801 in _0x1b68f3) {
      var _0x55caa6 = _0x1b68f3[_0x289801];
      if (_0x1e087d == _0x55caa6[0]) {
        _0x55caa6[0] = null;
        var _0x114ff3 = _0x55caa6[1];
        if (!_0x114ff3) {
          break;
        }
        if (!_0x114ff3.parentNode) {
          break;
        }
        _0x114ff3.parentNode.removeChild(_0x114ff3);
        break;
      }
    }
  }
}
function reloadImages(_0x241b23) {
  var _0x21e45c = _0x241b23.querySelectorAll("[data-sm]");
  var _0x411cf2 = _0x21e45c.length;
  LineVisible = 1;
  for (var _0x13849e = 0; _0x13849e < _0x411cf2; ++_0x13849e) {
    loadImage(_0x21e45c[_0x13849e]);
  }
}
function DumpMemory(_0x270a20) {
  if (!(ImageMemory <= _0x270a20)) {
    var _0x54d361;
    var _0x1329cd;
    ImageMemory = 0;
    for (var _0x4576af in ImageHash) {
      for (var _0x3a4f57 = (_0x54d361 = ImageHash[_0x4576af]).length - 1; _0x3a4f57 >= 0; _0x3a4f57--) {
        var _0x2953fb = _0x54d361[_0x3a4f57];
        if (_0x270a20 != 0) {
          if (!_0x2953fb[0] || _0x2953fb[1] && !_0x2953fb[1].parentNode) {
            _0x54d361.splice(_0x3a4f57, 1);
          } else if (_0x2953fb[2]) {
            ImageMemory += parseInt(_0x2953fb[2]);
          }
        } else {
          if (!(_0x1329cd = _0x2953fb[1]) || !_0x1329cd.parentNode) {
            continue;
          }
          _0x1329cd.parentNode.removeChild(_0x1329cd);
        }
      }
      if (_0x54d361.length == 0) {
        delete ImageHash[_0x4576af];
      }
    }
    if (_0x270a20 == 0) {
      ImageHash = {};
    }
  }
}
function addHintText(_0x52e807, _0x30c1fe, _0x28e5ce, _0x43560c, _0x5e8d97, _0x85b5e7) {
  if (_0x30c1fe && _0x30c1fe.length == 0) {
    return;
  }
  let _0x6669b0 = _0x85b5e7.querySelector("#tooltips");
  if (_0x6669b0) {
    _0x6669b0.parentNode.removeChild(_0x6669b0);
  }
  _0x6669b0 = makeElement(null, "div", "", "tooltips");
  _0x85b5e7.body.prepend(_0x6669b0);
  let _0x9c1107 = makeElement(_0x6669b0, "div", "tooltip");
  if (_0x43560c) {
    _0x9c1107.style["max-width"] = "50%";
  }
  addText(_0x9c1107, _0x30c1fe, true);
  var _0x3adc1c = _0x5e8d97 ? _0x5e8d97.getBoundingClientRect() : _0x52e807.target.getBoundingClientRect();
  switch (_0x28e5ce) {
    case "left":
      _0x9c1107.style.top = _0x3adc1c.top + "px";
      _0x9c1107.style.left = Math.min(_0x3adc1c.left) - _0x9c1107.clientWidth - 10 + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "right":
      _0x9c1107.style.top = _0x3adc1c.top + "px";
      _0x9c1107.style.left = _0x3adc1c.width - (_0x9c1107.clientWidth - 5) + "px";
      if (_0x9c1107.getBoundingClientRect().right < 15) {
        _0x9c1107.style.right = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.right = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "low":
      _0x9c1107.style.top = _0x3adc1c.top - 30 + "px";
      _0x9c1107.style.left = _0x3adc1c.left + Math.abs(_0x3adc1c.left - _0x3adc1c.right) / 2 - _0x9c1107.clientWidth / 2 + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "bottom":
      _0x9c1107.style.top = "58px";
      _0x9c1107.style.left = _0x3adc1c.left + Math.abs(_0x3adc1c.left - _0x3adc1c.right) / 2 - _0x9c1107.clientWidth / 2 + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 25 + "px";
      }
      break;
    case "pointer":
      _0x9c1107.style.top = _0x3adc1c.top - 30 + "px";
      _0x9c1107.style.left = _0x52e807.clientX + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "top-tall":
      _0x9c1107.style.top = _0x3adc1c.top - _0x9c1107.getBoundingClientRect().height - 10 + "px";
      _0x9c1107.style.left = _0x3adc1c.left + Math.abs(_0x3adc1c.left - _0x3adc1c.right) / 2 - _0x9c1107.clientWidth / 2 + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - (_0x9c1107.getBoundingClientRect().width - 15) * 2 + "px";
      }
      if (xInt(_0x9c1107.style.left) <= 0) {
        _0x9c1107.style.left = "15px";
      }
      break;
    default:
      _0x9c1107.style.top = _0x3adc1c.top - 50 + "px";
      _0x9c1107.style.left = _0x3adc1c.left + Math.abs(_0x3adc1c.left - _0x3adc1c.right) / 2 - _0x9c1107.clientWidth / 2 + "px";
      if (_0x9c1107.getBoundingClientRect().left < 15) {
        _0x9c1107.style.left = "15px";
      } else if (_0x9c1107.getBoundingClientRect().right >= window.innerWidth) {
        _0x9c1107.style.left = window.innerWidth - _0x9c1107.getBoundingClientRect().width - 15 + "px";
      }
      if (xInt(_0x9c1107.style.left) <= 0) {
        _0x9c1107.style.left = "15px";
      }
  }
  if (_0x9c1107.getBoundingClientRect().top < 0) {
    _0x9c1107.style.top = "5px";
  }
  return _0x9c1107;
}
function smtick() {
  LineVisible = 1;
  for (var _0x223a5e in imgh) {
    if (imgh[_0x223a5e].failed == 1) {
      if (imgh[_0x223a5e].waitc-- > 1) {
        continue;
      }
      var _0x27a982 = imgh[_0x223a5e].retries - 1;
      var _0x1961d4 = imgh[_0x223a5e].wait * 2;
      var _0x51fa17 = imgh[_0x223a5e].sm;
      var _0x3cc09d = imgh[_0x223a5e].size;
      delete imgh[_0x223a5e];
      loadImage(null, _0x51fa17, _0x3cc09d, _0x27a982, _0x1961d4);
    }
  }
  DumpMemory(10000000);
  Seconds++;
}
function LimitMessages(_0x551f12, _0x43d22d) {
  try {
    var _0x343aab = document.getElementById(_0x551f12);
    var _0x2cea8d = _0x343aab.childNodes;
    var _0x5f0bd0 = _0x2cea8d.length - _0x43d22d;
    if (_0x5f0bd0 > 0) {
      for (var _0x236903 = _0x5f0bd0 - 1; _0x236903 > 0; _0x236903--) {
        _0x343aab.removeChild(_0x2cea8d[_0x236903]);
      }
    }
  } catch (_0x52b282) {}
}
setInterval(function () {
  smtick();
}, 1000);
var LangFiles = xrRoot.xrLangFiles;
function TranslateNodes(_0x34529d, _0x34d702) {
  var _0x5011eb;
  if (!_0x34d702) {
    return;
  }
  var _0x3253b2 = false;
  for (var _0x2b5b09 in LangFiles) {
    if (LangFiles[_0x2b5b09]) {
      _0x3253b2 = true;
      break;
    }
  }
  let _0x153f41;
  if (_0x34d702 == "box" && ((_0x5011eb = xrRoot) == null ? undefined : _0x5011eb.cust_lang)) {
    _0x153f41 = xrRoot.cust_lang;
    _0x3253b2 = true;
  }
  if (_0x3253b2) {
    var _0x1675d0;
    var _0x34b7b2;
    var _0x5eb09e;
    var _0x5d7770 = _0x34529d.querySelectorAll("[data-localize]");
    var _0x385eac = _0x5d7770.length;
    for (_0x2b5b09 = 0; _0x2b5b09 < _0x385eac; ++_0x2b5b09) {
      if (_0x34d702 == (_0x5eb09e = (_0x34b7b2 = _0x5d7770[_0x2b5b09]).getAttribute("data-localize").split("."))[0]) {
        _0x1675d0 = LangFiles[_0x5eb09e[0]][_0x5eb09e[1]];
        if (_0x153f41 && _0x153f41[_0x5eb09e[1]]) {
          _0x1675d0 = _0x153f41[_0x5eb09e[1]];
        }
        if (_0x1675d0) {
          changeText(_0x34b7b2, _0x1675d0);
        }
      }
    }
  }
}
function GotLang(_0x529d74) {
  for (var _0xf154dc in _0x529d74) {
    if (_0x529d74[_0xf154dc]) {
      LangFiles[_0xf154dc] = _0x529d74[_0xf154dc];
    }
  }
  Translate(_0x529d74);
  let _0x4582a6 = document.getElementById("appframe").contentWindow;
  if (_0x4582a6.Translate) {
    _0x4582a6.Translate(_0x529d74);
  }
}
const AllLangs = {
  box: 0,
  mob2: 0,
  mob1: 0
};
function LoadLangAll() {
  LoadLang(AllLangs);
}
function TranslateAll() {
  Translate(AllLangs);
}
function Translate(_0x2a6930) {
  if (!LangFiles) return;
  for (let _0x4bd26c in _0x2a6930) {
    if (LangFiles[_0x4bd26c]) {
      TranslateNodes(document, _0x4bd26c);
    }
  }
}
function LoadLang(_0x284051, _0x537ea5) {
  if (_0x537ea5) {
    Language = _0x537ea5;
    xrRoot.xrLangFiles = {};
    LangFiles = {};
  }
  for (let _0x305432 in _0x284051) {
    loadJSON(xatdomain + "/json/lang/getlang2.php?f=" + _0x305432 + "&l=" + Language, GotLang);
  }
}
function makeElement(_0x399aee, _0x1c91b4, _0x1eaa89, _0x4da567, _0x1c9931) {
  var _0x15f472 = document.createElement(_0x1c91b4);
  if (_0x1eaa89) {
    _0x15f472.className = _0x1eaa89;
  }
  if (_0x4da567) {
    _0x15f472.id = _0x4da567;
  }
  if (_0x399aee) {
    _0x399aee.appendChild(_0x15f472);
  }
  if (_0x1c9931) {
    _0x1c9931.prepend(_0x15f472);
  }
  return _0x15f472;
}
function addEditBox(_0x1c459a, _0x321c1c, _0x334cc0, _0xf2249a, _0x28a5ac, _0x42eaca) {
  var _0x4d3b11 = makeElement(_0x1c459a, "div");
  var _0x114f31 = makeElement(_0x4d3b11, "span", "edittitle");
  if (_0x28a5ac) {
    _0x114f31.style.fontWeight = "bold";
  }
  addText(_0x114f31, _0x334cc0);
  if (_0xf2249a === undefined) {
    _0xf2249a = "";
  }
  if (_0xf2249a !== "noedit") {
    var _0x211eac = makeElement(_0x4d3b11, "input");
    if (_0x42eaca == "password") {
      _0x211eac.type = "password";
    } else {
      _0x211eac.type = "text";
      _0x211eac.value = _0xf2249a;
    }
    _0x211eac.id = _0x321c1c;
  }
}
function GetTranslation(_0x4a2869, _0x3ec2c2) {
  var _0x354dfa;
  var _0x3e2a64 = _0x4a2869.split(".");
  let _0x3294c7;
  if (_0x3e2a64[0] == "box" && ((_0x354dfa = xrRoot) == null ? undefined : _0x354dfa.cust_lang) && (_0x3294c7 = xrRoot.cust_lang[_0x3e2a64[1]])) {
    return _0x3294c7;
  }
  if (LangFiles && LangFiles[_0x3e2a64[0]] && LangFiles[_0x3e2a64[0]][_0x3e2a64[1]]) {
    let _0x1b10e1 = LangFiles[_0x3e2a64[0]][_0x3e2a64[1]];
    if (_0x3ec2c2) {
      _0x3ec2c2.forEach((_0x3946ed, _0x775e09) => {
        const _0x24b05f = new RegExp("\\$" + (_0x775e09 + 1), "g");
        _0x1b10e1 = _0x1b10e1.replace(_0x24b05f, _0x3946ed);
      });
    }
    return _0x1b10e1;
  }
  return false;
}
function TransText(_0x1f88ae, _0x47a303) {
  return GetTranslation(_0x1f88ae) || _0x47a303;
}
function addText(_0x348969, _0x30e753, _0x21bbff) {
  if (!_0x30e753) {
    return;
  }
  var _0x16fafe;
  if (typeof _0x30e753 == "string" && _0x30e753.charAt(0) == "[" && _0x30e753.search(/\[mob/) >= 0) {
    for (var _0x348929 in _0x30e753 = _0x30e753.split(/\[mob|\]/)) {
      if ((_0x16fafe = _0x30e753[_0x348929]).charAt(0) > 0 && _0x16fafe.charAt(1) == ".") {
        _0x30e753[_0x348929] = _0x16fafe.split(",");
        _0x30e753[_0x348929][0] = "mob" + _0x30e753[_0x348929][0];
      }
    }
  }
  if (Array.isArray(_0x30e753)) {
    if (Array.isArray(_0x30e753[0]) || _0x30e753[1] && Array.isArray(_0x30e753[1])) {
      for (var _0x348929 in _0x30e753) {
        addText(_0x348969, _0x30e753[_0x348929]);
      }
      return "";
    }
    if (_0x30e753[0]) {
      _0x348969.setAttribute("data-localize", _0x30e753[0]);
      let _0x12feba = null;
      if (_0x30e753.length > 2) {
        const _0x12ce5d = _0x30e753.slice(2, _0x30e753.length);
        _0x12feba = GetTranslation(_0x30e753[0], _0x12ce5d);
        _0x30e753 = _0x30e753[1];
        _0x12ce5d.forEach((_0x193488, _0x516845) => {
          const _0x55cbf4 = new RegExp("\\$" + (_0x516845 + 1), "g");
          _0x30e753 = _0x30e753.replace(_0x55cbf4, _0x193488);
          _0x12feba &&= _0x12feba.replace(_0x55cbf4, _0x193488);
        });
      } else {
        _0x12feba = GetTranslation(_0x30e753[0]);
        _0x30e753 = _0x30e753[1];
      }
      if (_0x12feba) {
        _0x30e753 = _0x12feba;
      }
    } else {
      _0x30e753 = _0x30e753[1];
    }
  }
  let _0x2b01fd = null;
  if (_0x21bbff) {
    if (_0x348969) {
      _0x348969.innerHTML += _0x30e753;
    }
  } else {
    _0x2b01fd = document.createTextNode(_0x30e753);
    if (_0x348969) {
      _0x348969.appendChild(_0x2b01fd);
    }
  }
  return _0x2b01fd;
}
function changeText(_0x3bae63, _0x80ff02) {
  while (_0x3bae63.firstChild) {
    _0x3bae63.removeChild(_0x3bae63.firstChild);
  }
  if (_0x3bae63.tagName.toLowerCase() == "input") {
    _0x3bae63.placeholder = _0x80ff02;
  } else {
    addText(_0x3bae63, _0x80ff02);
  }
}
function setValue(_0x2178c2, _0x2f3cbb) {
  var _0x3788c3 = document.getElementById(_0x2178c2);
  if (_0x3788c3) {
    _0x2f3cbb ||= "";
    _0x3788c3.value = _0x2f3cbb;
  }
}
function setTextNode(_0x69344f, _0x582f09, _0x5269c4) {
  var _0x39f15c = document.getElementById(_0x69344f);
  if (_0x39f15c) {
    while (_0x39f15c.firstChild) {
      _0x39f15c.removeChild(_0x39f15c.firstChild);
    }
    if (_0x582f09) {
      _0x39f15c.appendChild(document.createTextNode(_0x582f09));
    }
    if (_0x5269c4) {
      _0x39f15c.appendChild(_0x5269c4);
    }
  }
}
function addTextNode(_0x4898a8, _0x1fd81c) {
  var _0x49aed4 = document.getElementById(_0x4898a8);
  if (_0x49aed4 && _0x1fd81c) {
    _0x49aed4.appendChild(document.createTextNode(_0x1fd81c));
  }
}
const capitalize = _0x5a0ad3 => typeof _0x5a0ad3 != "string" ? "" : _0x5a0ad3.charAt(0).toUpperCase() + _0x5a0ad3.slice(1);
function clearDiv(_0x6fc6c5, _0x5c7c24) {
  _0x5c7c24 ||= document.getElementById(_0x6fc6c5);
  if (_0x5c7c24) {
    while (_0x5c7c24.firstChild) {
      _0x5c7c24.removeChild(_0x5c7c24.firstChild);
    }
  }
  return _0x5c7c24;
}
function setDNone(_0x5e0659, _0x1fdafa, _0x581fdc) {
  if (_0x5e0659) {
    removeClass("d-none", _0x1fdafa, _0x581fdc);
  } else {
    addClass("d-none", _0x1fdafa, _0x581fdc);
  }
}
function addClass(_0x23357a, _0x55d769, _0x27d55e) {
  if (_0x55d769) {
    _0x27d55e = document.getElementById(_0x55d769);
  }
  if (_0x27d55e) {
    _0x27d55e.classList.add(_0x23357a);
  }
  return _0x27d55e;
}
function removeClass(_0x14e371, _0x448f11, _0x1187de) {
  if (_0x448f11) {
    _0x1187de = document.getElementById(_0x448f11);
  }
  if (_0x1187de) {
    _0x1187de.classList.remove(_0x14e371);
  }
  return _0x1187de;
}
function removeById(_0x256257, _0x1f0696) {
  var _0x27cd3e = document.getElementById(_0x256257);
  for (; _0x1f0696;) {
    _0x27cd3e &&= _0x27cd3e.parentNode;
    _0x1f0696--;
  }
  if (_0x27cd3e != null) {
    _0x27cd3e.parentNode.removeChild(_0x27cd3e);
  }
}
function getById(_0x2eff95) {
  return document.getElementById(_0x2eff95);
}
function insertAfter(_0x5a6062, _0x23bbb2) {
  if (_0x23bbb2) {
    var _0x85d13c = _0x23bbb2.parentNode;
    if (_0x85d13c.lastchild == _0x23bbb2) {
      _0x85d13c.appendChild(_0x5a6062);
    } else {
      _0x85d13c.insertBefore(_0x5a6062, _0x23bbb2.nextSibling);
    }
  }
}
function animateTo(_0x9799fe, _0xfdb02f, _0x26eaba, _0x3efef2) {
  const _0x47883e = _0x9799fe.animate(_0xfdb02f, {
    ..._0x26eaba,
    fill: "both"
  });
  _0x47883e.addEventListener("finish", () => {
    if (_0x3efef2) {
      _0x3efef2();
    }
  });
  return _0x47883e;
}
function animateFrom(_0x3cf05b, _0x342d21, _0xc053a, _0x354a33) {
  const _0x33af24 = _0x3cf05b.animate({
    ..._0x342d21,
    offset: 0
  }, {
    ..._0xc053a,
    fill: "backwards"
  });
  _0x33af24.addEventListener("finish", () => {
    if (_0x354a33) {
      _0x354a33();
    }
  });
  return _0x33af24;
}
function restrictCharacters(_0x1dc7b2, _0xfdfa1e) {
  var _0x5a25e0;
  if (_0x1dc7b2.keyCode) {
    _0x5a25e0 = _0x1dc7b2.keyCode;
  } else if (_0x1dc7b2.which) {
    _0x5a25e0 = _0x1dc7b2.which;
  }
  return !!String.fromCharCode(_0x5a25e0).match(_0xfdfa1e);
}
function isColorLight(_0x392be5) {
  let _0x4bfc94;
  let _0x12dd8f;
  let _0x44e3c6;
  let _0x5a31fb;
  return !!_0x392be5 && (_0x392be5.match(/^rgb/) ? (_0x4bfc94 = (_0x392be5 = _0x392be5.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], _0x12dd8f = _0x392be5[2], _0x44e3c6 = _0x392be5[3]) : (_0x4bfc94 = (_0x392be5 = +("0x" + _0x392be5.slice(1).replace(_0x392be5.length < 5 && /./g, "$&$&"))) >> 16, _0x12dd8f = _0x392be5 >> 8 & 255, _0x44e3c6 = _0x392be5 & 255), (_0x5a31fb = Math.sqrt(_0x4bfc94 * _0x4bfc94 * 0.299 + _0x12dd8f * _0x12dd8f * 0.587 + _0x44e3c6 * _0x44e3c6 * 0.114)) > 127.5);
}
function restrictCharacters2(_0x53dacb, _0x3b3d46) {
  _0x53dacb.target.value = _0x53dacb.target.value.replace(_0x3b3d46, "");
  return false;
}
function setTitleBarNum(_0x5a1787) {
  var _0x488a2f = document.getElementById("titleBar");
  if (_0x488a2f && _0x488a2f.count) {
    if (_0x5a1787 > 0) {
      _0x488a2f.count.innerHTML = _0x5a1787;
      _0x488a2f.count.style.visibility = "visible";
    } else {
      _0x488a2f.count.style.visibility = "hidden";
    }
  }
}
function addTitleBar(_0x4ada22, _0x150125, _0x27cfd9, _0x1d95a4, _0xf39a28) {
  if (config.PhoneType != PhoneTypes.IPHONE) {
    var _0x792ca3 = clearDiv("titleBar");
    var _0x2758ac = makeElement(_0x792ca3, "div", "table htmlTitleBarButtons");
    var _0x56d773 = makeElement(_0x2758ac, "div", "row");
    var _0xcf8bc0 = makeElement(_0x56d773, "div", "cell htmlTitleButton");
    _0xcf8bc0.addEventListener("click", _0x27cfd9);
    addText(makeElement(_0xcf8bc0, "span", ""), _0x150125);
    makeElement(_0x56d773, "div", "cell cellWide");
    var _0x711529 = makeElement(_0x56d773, "div", "cell cellRight htmlTitleButton");
    _0x711529.addEventListener("click", _0xf39a28);
    var _0x5119a8 = makeElement(_0x711529, "span", "", "TitleBarRight");
    if (typeof _0x1d95a4 == "boolean") {
      const _0x3bcf95 = "svg/removew.svg";
      let _0x52f5b3 = makeElement(_0x5119a8, "img");
      _0x52f5b3.src = _0x3bcf95;
      _0x52f5b3.width = "18";
      _0x52f5b3.style.marginTop = "3px";
    } else {
      addText(_0x5119a8, _0x1d95a4);
    }
    var _0x2000cc = makeElement(_0x792ca3, "div", "table htmlTitleBar cellWide");
    var _0x1770f5 = makeElement(_0x2000cc, "div", "row");
    var _0xa00518 = makeElement(_0x1770f5, "div", "cell cellWide dialogCellCenter htmlTitleTitle");
    var _0x26d94a = makeElement(_0xa00518, "span", "", "TitleBarTitle");
    if (_0x4ada22.length > 0) {
      addText(_0x26d94a, _0x4ada22);
    }
  }
}
function AddSections(_0xb9ff33, _0x5d9bd9, _0x231021) {
  clearDiv("topSelector");
  var _0xc0baad = makeElement(document.getElementById("topSelector"), "div", "listTable");
  var _0xbc8d20 = makeElement(_0xc0baad, "div", "dialogRow");
  for (var _0xa3d062 in _0xb9ff33) {
    var _0x4eb0db = _0xb9ff33[_0xa3d062];
    var _0xd4e1b7 = makeElement(_0xbc8d20, "div", "dialogCell");
    if (_0x5d9bd9) {
      _0xd4e1b7.Click = _0x5d9bd9 + _0x4eb0db + "')";
      _0xd4e1b7.addEventListener("click", function (_0x8b856d) {
        let _0x381f58 = this.Click.match(/(\w*).*?'(\w*)'/);
        switch (_0x381f58[1]) {
          case "configurePage":
            configurePage(0, _0x381f58[2]);
            break;
          case "configureStorePage":
            configureStorePage(_0x381f58[2]);
        }
      });
    }
    var _0x12c618 = makeElement(_0xd4e1b7, "div", "listTable tabTable");
    var _0xee5eb1 = makeElement(_0x12c618, "div", "dialogRow");
    var _0x4b8ecb = makeElement(_0xee5eb1, "div", "dialogCell dialogCellCenter tabLabelCell", "Label" + _0x4eb0db);
    var _0x193c0c = makeElement(_0x4b8ecb, "img", "selector");
    _0x193c0c.height = 16;
    _0x193c0c.width = 16;
    _0x193c0c.src = _0x231021 ? "svg/" + _0x231021[_0xa3d062] + ".svg" : "svg/sel" + _0x4eb0db + ".svg";
    addText(makeElement(_0x4b8ecb, "span", "selector"), ["mob1." + _0x4eb0db.toLowerCase(), _0x4eb0db]);
    var _0x37b0d5 = makeElement(_0x12c618, "div", "dialogRow");
    makeElement(_0x37b0d5, "div", "dialogCell tabIndicatorCell", "Indicator" + _0x4eb0db);
  }
}
function SetSection(_0x1daf28) {
  var _0x3f0895;
  var _0x2dfbeb;
  _0x3f0895 = document.getElementsByClassName("tabLabelCellSelected");
  _0x2dfbeb = 0;
  for (; _0x2dfbeb < _0x3f0895.length; _0x2dfbeb++) {
    _0x3f0895[_0x2dfbeb].className = "dialogCell dialogCellCenter tabLabelCell";
  }
  _0x3f0895 = document.getElementsByClassName("tabIndicatorCellSelected");
  _0x2dfbeb = 0;
  for (; _0x2dfbeb < _0x3f0895.length; _0x2dfbeb++) {
    _0x3f0895[_0x2dfbeb].className = "dialogCell tabIndicatorCell";
  }
  if (_0x3f0895 = document.getElementById("Label" + _0x1daf28)) {
    _0x3f0895.className += " tabLabelCellSelected";
  }
  if (_0x3f0895 = document.getElementById("Indicator" + _0x1daf28)) {
    _0x3f0895.className += " tabIndicatorCellSelected";
  }
  CurrentSec = _0x1daf28;
}
function FillInAll(_0x1a243c, _0x5d76c6, _0x1a9d97) {
  for (var _0x32a38e in _0x5d76c6) {
    if (!_0x1a243c[_0x5d76c6[_0x32a38e]]) {
      if (_0x1a9d97) {
        addText(_0x1a9d97, "Please fill in all boxes");
      } else {
        AlertMessage("Please fill in all boxes");
      }
      return false;
    }
  }
  return true;
}
function DoBanDialog(_0x4b6cf3, _0x521268, _0x5fb50e) {
  let _0x3ccf41 = (_0x521268 - Date.now() / 1000) / 3600;
  if ((_0x3ccf41 = Math.round(_0x3ccf41 * 100) / 100) < 0) {
    _0x3ccf41 = 0;
  }
  const _0x41bd73 = new Date().toLocaleString();
  _0x5fb50e = _0x5fb50e.substr(0, 500);
  const _0x2ecf06 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  HiddenDivs.BanDialog = "<div class=\"modalDialogContentClassic\" data-w=\"0.65\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/actBan.svg\" alt=\"completed\" class=\"transcomp\" data-localize=\"mob2.banned\">Banned!</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x2ecf06 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.by\">By</div><div data-localize=\"mob2.duration\">Duration</div><div data-localize=\"mob2.reason\">Reason</div></div><div class=\"column\"><div>" + _0x41bd73 + "</div><div>" + _0x4b6cf3 + "</div><div>" + (_0x3ccf41 == 0 ? "<span data-localize=\"mob2.forever\">Forever</span>" : _0x3ccf41 + " <span data-localize=\"mob2.hours\">Hours</span> ") + "</div>" + (_0x5fb50e.trim().length == 0 ? "<div style=\"overflow-y: auto; max-height: 70px;\" data-localize=\"mob2.noreason\">No reason given</div>" : "<div style=\"overflow-y: auto; max-height: 70px; word-break: break-word;\">" + _0x5fb50e + "</div>") + "</div></div><div class=\"banbuttons\" style=\"margin-top: 1rem;\"><a href=\"https://rxat.ro/report#!group&GroupName=" + config.GroupName + "\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/inappropriate.svg\" alt=\"report\" style=\"width: 12px\" class=\"inappIc\"><span data-localize=\"mob2.unfair\">Report unfair ban</span></button></a><a id=\"modalClose\"><button class=\"bButton\"><img src=\"svg/return2.svg\" alt=\"return\" class=\"inappIc\"><span data-localize=\"mob2.return\">Return to chat</span></button></a><a href=\"https://rxat.ro/groups\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/groups.svg\" alt=\"groups\" class=\"inappIc\"><span data-localize=\"mob2.findgroups\">Find other groups</span></button></a></div></div></div></div></div>";
  doModal("BanDialog");
  ColorTitle();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
  document.getElementById("modalClose").addEventListener("click", function () {
    modalClose();
  });
}
function DoTransfer(_0x4495ec, _0x1fb8c4, _0x36157a, _0x2b9671, _0x23f392) {
  _0x4495ec = _0x4495ec.substr(0, 500);
  const _0x55167a = new Date().toLocaleString();
  const _0xc0ae5 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  HiddenDivs.AlertDialog = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/capyes.svg\" alt=\"completed\" class=\"transcomp\" data-localize=\"mob2.transfer\">Transfer</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0xc0ae5 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.amount\">Amount</div><div data-localize=\"mob2.from\">From</div><div data-localize=\"mob2.to\">To</div>" + (_0x4495ec.trim().length == 0 ? "" : "<div data-localize=\"mob2.message\">Message</div>") + "</div><div class=\"column\"><div class=\"transimp\">" + _0x55167a + "</div><div class=\"transimp\">" + _0x2b9671 + " xats & " + _0x23f392 + " days</div><div class=\"transimp\">" + _0x1fb8c4 + "</div><div class=\"transimp\">" + _0x36157a + "</div>" + (_0x4495ec.trim().length == 0 ? "" : "<div style=\"overflow-y: auto; max-height: 70px; color: inherit; word-break: break-word;\">" + _0x4495ec + "</div>") + "</div></div></div></div></div></div>";
  doModal("AlertDialog");
  ColorTitle();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
}
function AlertMessage(_0x3c934a, _0x34751c, _0x4ead21) {
  var _0x25f643 = clearAlertMessage();
  const _0x3d40a4 = Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg";
  if (!_0x25f643) {
    HiddenDivs.AlertDialog = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span data-localize=mob1.message class=\"dialogTitle\">Message</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x3d40a4 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"AlertMessage\"></div></div></div></div>";
    doModal("AlertDialog");
    document.getElementById("id_ModalClose").addEventListener("click", function () {
      modalClose();
      if (xrRoot && xrRoot.LoginBodge) {
        removeClass("d-none", 0, xrRoot.getById("Overlays"));
        xrRoot.LoginBodge = false;
      }
    });
    _0x25f643 = clearAlertMessage();
    ColorTitle();
  }
  var _0x50a360;
  if (_0x34751c) {
    _0x3c934a = _0x3c934a.replace(/<p>/g, "ZZZZ");
  }
  if (_0x4ead21) {
    _0x3c934a = _0x3c934a.replace(/<br>/g, "LLLLL");
  }
  _0x3c934a = (_0x3c934a = _0x3c934a.replace(/<.*?>/g, " ")).replace(/<.*/g, "");
  if (_0x34751c) {
    _0x3c934a = _0x3c934a.replace(/ZZZZ/g, "<p>");
  }
  if (_0x4ead21) {
    _0x3c934a = _0x3c934a.replace(/LLLLL/g, "<br>");
  }
  _0x3c934a = _0x3c934a.replace(/\[link (.*?)\]/g, function (_0x12ff43, _0x55984c) {
    _0x50a360 = _0x55984c;
    return "";
  });
  if (_0x34751c) {
    _0x25f643.innerHTML = _0x3c934a;
  } else {
    _0x25f643.textContent = _0x3c934a;
  }
  if (_0x50a360) {
    var _0x4d7060 = makeElement(_0x25f643, "a");
    _0x4d7060.href = "https://" + _0x50a360;
    _0x4d7060.target = "_blank";
    addText(_0x4d7060, _0x50a360);
  }
  _0x25f643.style.color = "#F00";
  _0x25f643.style.fontWeight = "bold";
  if (_0x25f643 = document.getElementById("openModal")) {
    _0x25f643.style.visibility = "visible";
  }
}
function clearAlertMessage() {
  ConnectingClose();
  let _0x2164c6 = document.getElementById("openModal");
  _0x2164c6 &&= _0x2164c6.getElementsByClassName("AlertMessage");
  if (_0x2164c6 && _0x2164c6.length > 0) {
    _0x2164c6[0].textContent = "";
    return _0x2164c6[0];
  } else if (_0x2164c6 = document.getElementById("AlertMessage")) {
    _0x2164c6.textContent = "";
    return _0x2164c6;
  } else {
    return null;
  }
}
function BuildDialog(_0x3cd310, _0x4ef207) {
  var _0x5ec372;
  var _0x25aa8a = _0x3cd310 = makeElement(_0x3cd310, "div", "modalDialogContentClassic");
  var _0x4eeae4 = _0x3cd310;
  var _0x38c3a9 = _0x3cd310;
  for (var _0x45fb94 in _0x4ef207) {
    var _0x2162f0 = _0x4ef207[_0x45fb94];
    switch (_0x2162f0.type) {
      case "click":
        _0x5ec372 = addEditBox2(_0x25aa8a, 0, "dialogClick", _0x2162f0.name, "noedit");
        _0x2162f0.icon = _0x2162f0.name;
        _0x5ec372.Part = _0x2162f0;
        _0x5ec372.addEventListener("click", function (_0x53b1f6) {
          actions.sendApp(_0x53b1f6, this.Part);
        });
        break;
      case "title":
        addEditBox2(_0x3cd310, 0, "dialogTitleBar", _0x2162f0.name, "noedit", "bold");
        _0x38c3a9 = _0x4eeae4 = _0x25aa8a = makeElement(_0x3cd310, "div", "dialogBody");
        _0x25aa8a = makeElement(_0x25aa8a, "div", "dialogPadding");
        makeElement(_0x25aa8a, "div", "AlertMessage");
        _0x4eeae4 = makeElement(_0x25aa8a, "div", "dialogBody");
        _0x4eeae4 = makeElement(_0x4eeae4, "div", "dialogTable");
        ColorTitle();
        break;
      case "mw":
        _0x3cd310.dataset.mw = _0x2162f0.mw;
        break;
      case "password":
        addEditBox2(_0x4eeae4, _0x2162f0.id, "dialogRow", _0x2162f0.name, 0, 0, "password");
        break;
      case "dialog":
        addEditBox2(_0x4eeae4, _0x2162f0.id, "dialogRow", _0x2162f0.name);
        break;
      case "text":
        addEditBox2(_0x25aa8a, 0, "", _0x2162f0.name, "noedit");
        break;
      default:
        addEditBox2(_0x38c3a9, 0, "dialogActions", _0x2162f0);
    }
  }
}
function addEditBox2(_0x4cfe64, _0x19922f, _0x1cb217, _0x449a07, _0x499a0a, _0x531f07, _0x48508a) {
  var _0x288b5c = makeElement(_0x4cfe64, "div", _0x1cb217);
  const _0x198041 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  switch (_0x1cb217) {
    case "dialogTitleBar":
      addText(_0x415dc8 = makeElement(_0x288b5c, "span", "dialogTitle"), _0x449a07 + "\xA0");
      (_0x38c4e7 = makeElement(_0x288b5c, "span", "dialogTitleAction")).id = "modalCancel";
      break;
    case "dialogRow":
      addText(_0x38c4e7 = makeElement(_0x288b5c, "div", "dialogCell"), _0x449a07 + "\xA0");
      if (_0x499a0a === undefined) {
        _0x499a0a = "";
      }
      if (_0x499a0a === "noedit") {
        break;
      }
      var _0x38c4e7 = makeElement(_0x288b5c, "div", "dialogCell cellWide");
      var _0x3a7190 = makeElement(_0x38c4e7, "input", "dialogInput");
      _0x3a7190.setAttribute("autocomplete", _0x48508a == "password" ? "new-password" : "off");
      if (_0x48508a == "password") {
        _0x3a7190.type = "password";
      } else {
        _0x3a7190.type = "text";
        _0x3a7190.value = _0x499a0a;
      }
      _0x3a7190.id = _0x19922f;
      break;
    case "dialogClick":
    case "":
      addText(_0x288b5c, _0x449a07 + "\xA0");
      break;
    case "dialogActions":
      if (_0x449a07.action == "Cancel") {
        let _0x47c4ca = makeElement(_0x38c4e7 = document.getElementById("modalCancel"), "img");
        _0x47c4ca.src = xrRoot.xrClassic ? _0x198041 : "svg/removew.svg";
        _0x47c4ca.width = "16";
        _0x47c4ca.alt = "close";
        _0x38c4e7.addEventListener("click", function () {
          modalClose();
        });
        _0x4cfe64.removeChild(_0x288b5c);
        break;
      }
      var _0x415dc8;
      var _0x2feb7c;
      addText(_0x288b5c, "\xA0");
      addText(_0x415dc8 = makeElement(_0x288b5c, "span", "dialogActionRight"), _0x449a07.label);
      if (_0x449a07.flags & 1) {
        _0x415dc8.style.opacity = "0.5";
        _0x415dc8.addEventListener("click", function () {
          modalClose();
        });
      } else {
        if (typeof sendApp == "function") {
          _0x2feb7c = sendApp;
        }
        if (!_0x2feb7c && sendFunc) {
          _0x2feb7c = sendFunc;
        }
        _0x415dc8.addEventListener("click", function (_0x46528e) {
          clearAlertMessage();
          _0x2feb7c(_0x46528e, _0x449a07.action, _0x449a07.Power);
        });
      }
  }
  return _0x288b5c;
}
function doModal(_0x1ad997, _0x424e3d, _0x1cdbf9) {
  modalClose();
  var _0x35dd28 = makeElement(document.body, "div", "modalDialog");
  _0x35dd28.setAttribute("id", "openModal");
  var _0x24e6d7;
  var _0x4c459f = makeElement(_0x35dd28, "div");
  var _0x210522 = "";
  if (typeof _0x1ad997 == "string") {
    _0x210522 = _0x1ad997.charAt(0);
  }
  if (_0x210522 == "{" || _0x210522 == "[") {
    _0x1ad997 = JSON.parse(_0x1ad997);
  }
  if (_0x1ad997 !== null && typeof _0x1ad997 == "object") {
    BuildDialog(_0x4c459f, _0x1ad997);
    _0x24e6d7 = _0x4c459f;
    _0x4c459f.PushUp = true;
  } else if (_0x1ad997.charAt(0) == "h") {
    var _0x23542e = makeElement(_0x4c459f, "iframe");
    _0x23542e.setAttribute("src", _0x1ad997);
    _0x23542e.setAttribute("width", 300);
    _0x23542e.setAttribute("height", 500);
    _0x24e6d7 = _0x23542e;
  } else {
    _0x24e6d7 = makeElement(_0x4c459f, "div");
    CacheHiddenDivs();
    _0x24e6d7.innerHTML = HiddenDivs[_0x1ad997];
    TranslateNodes(_0x24e6d7);
    if (typeof messages != "undefined" && typeof messages.openSmiliesDialog == "function") {
      messages.openSmiliesDialog();
    }
  }
  _0x35dd28.style.opacity = 1;
  _0x35dd28.style.pointerEvents = "auto";
  _0x24e6d7.addEventListener("click", function (_0x4e0b65) {
    _0x4e0b65.stopPropagation();
  });
  if (_0x1cdbf9) {
    posModal(_0x24e6d7, _0x424e3d, true);
  } else {
    posModal(_0x24e6d7, _0x424e3d);
  }
  return _0x24e6d7;
}
function posModal(_0x497cf0, _0x3c501f, _0x5e03ca) {
  var _0x1aa6b1;
  var _0x142a08;
  if (_0x497cf0) {
    _0x3c501f ||= {};
    var _0x2fa43a = _0x497cf0.firstElementChild;
    if ((_0x1aa6b1 = selector) == null ? undefined : _0x1aa6b1.isCaptchaPage()) {
      _0x3c501f.mw = 100;
    }
    var _0x554414 = _0x2fa43a.dataset.w;
    if (_0x3c501f.w) {
      _0x554414 = _0x3c501f.w;
    }
    _0x554414 ||= 0.4;
    var _0x439b21 = 0;
    if (_0x497cf0.offsetParent) {
      _0x439b21 = _0x497cf0.offsetParent.offsetWidth;
    }
    _0x439b21 ||= _0x497cf0.parentNode.offsetWidth;
    var _0x32c633 = xInt(_0x2fa43a.dataset.mw);
    if (_0x3c501f.mw) {
      _0x32c633 = _0x3c501f.mw;
    }
    if (_0x32c633 < 10) {
      _0x32c633 = 270;
    }
    var _0x4eab10 = _0x3c501f.h;
    _0x4eab10 ||= _0x2fa43a.dataset.h;
    var _0x10b74b = xInt(_0x2fa43a.dataset.mh);
    if (_0x3c501f.mh) {
      _0x10b74b = _0x3c501f.mh;
    }
    if (_0x10b74b < 10) {
      _0x10b74b = 30;
    }
    if (_0x439b21 * _0x554414 < _0x32c633 && (_0x554414 = _0x32c633 / _0x439b21) > 0.95) {
      _0x554414 = 0.95;
    }
    var _0x1930c4 = (1 - _0x554414) / 2;
    var _0x2fe45a = _0x2fa43a.offsetHeight;
    var _0x19d021 = 0;
    if (_0x497cf0.offsetParent) {
      _0x19d021 = _0x497cf0.offsetParent.offsetHeight;
    }
    _0x19d021 ||= _0x497cf0.parentNode.offsetHeight;
    if (_0x2fe45a < _0x10b74b) {
      _0x2fe45a = _0x10b74b;
    }
    if (_0x4eab10 && _0x2fe45a < _0x19d021 * _0x4eab10) {
      _0x2fe45a = _0x19d021 * _0x4eab10;
    }
    if (_0x2fe45a > _0x19d021 - 40) {
      _0x2fe45a = _0x19d021 - 40;
    }
    _0x10b74b = xInt(_0x2fe45a);
    var _0x5f209b = _0x5e03ca ? (_0x19d021 - _0x2fe45a) / 3.8 : (_0x19d021 - _0x2fe45a) / 2;
    if (config.PhoneType == PhoneTypes.DROIDPHONE || config.PhoneType == PhoneTypes.WEB || _0x2fa43a.dataset.pu) {
      _0x497cf0.PushUp = _0x497cf0.PushUp || _0x2fa43a.dataset.pu || document.getElementById("PushUp");
    } else {
      _0x497cf0.PushUp = false;
    }
    if (_0x497cf0.PushUp) {
      _0x5f209b = (_0x19d021 - _0x2fe45a - 250) / 2;
    }
    if (_0x5f209b < 10) {
      _0x5f209b = 10;
    }
    _0x5f209b = xInt(_0x5f209b);
    var _0x3e5223;
    var _0x18450c = xInt(_0x439b21 * _0x1930c4);
    _0x439b21 -= _0x18450c * 2;
    if (Classic && ((_0x142a08 = _0x3c501f) == null ? undefined : _0x142a08.customHeight)) {
      _0x2fe45a = ((_0x3e5223 = _0x3c501f) == null ? undefined : _0x3e5223.customHeight) + 30;
    }
    var _0x5bdf4e = "";
    if (_0x10b74b > 30) {
      _0x5bdf4e = "height:" + _0x2fe45a + "px;";
    }
    _0x2fa43a.style.cssText = "width:" + _0x439b21 + "px; left:" + _0x18450c + "px; top: " + _0x5f209b + "px;" + _0x5bdf4e;
  }
}
function modalClose(_0x27997b) {
  removeById("openModal");
}
function heightModal(_0x123a6a) {
  var _0x522d45;
  var _0x2defd;
  if (!_0x123a6a) {
    return;
  }
  let _0x43abc1 = (_0x522d45 = window) == null || (_0x2defd = _0x522d45.parent) == null ? undefined : _0x2defd.document;
  if (!_0x43abc1) {
    return;
  }
  let _0x3efeb2 = _0x43abc1 == null ? undefined : _0x43abc1.querySelector(".modalDialogContentClassic");
  if (_0x3efeb2) {
    _0x3efeb2.style.height = _0x123a6a + 30 + "px";
  }
}
function CacheHiddenDivs() {
  if (!DoneHiddenDivs) {
    DoneHiddenDivs = true;
    var _0x1ac040;
    var _0x4d2351;
    var _0x36a884 = document.getElementsByClassName("dialog");
    for (_0x1ac040 = 0; _0x1ac040 < _0x36a884.length; _0x1ac040++) {
      _0x4d2351 = _0x36a884[_0x1ac040];
      if (!Classic || _0x4d2351.id != "LoginForm") {
        HiddenDivs[_0x4d2351.id] = _0x4d2351.innerHTML;
        _0x4d2351.innerHTML = "";
      }
    }
  }
}
function AddHammer(_0x20a660, _0x270641, _0x27a83f) {
  var _0x8c1fb2;
  switch (_0x270641) {
    case Hammer.DIRECTION_LEFT:
      _0x8c1fb2 = "swipeleft";
      break;
    case Hammer.DIRECTION_RIGHT:
      _0x8c1fb2 = "swiperight";
      break;
    default:
      _0x8c1fb2 = "swipeleft swiperight";
      _0x270641 = Hammer.DIRECTION_HORIZONTAL;
  }
  var _0x5d4e71 = new Hammer(_0x20a660, {
    preventDefault: true,
    recognizers: [[Hammer.Swipe, {
      direction: _0x270641
    }]],
    cssProps: {
      userselect: false
    }
  });
  _0x5d4e71.on(_0x8c1fb2, function (_0xdc2f6) {
    var _0x3c974a = {
      Type: _0xdc2f6.type
    };
    if (_0xdc2f6.target.id) {
      _0x3c974a.id = _0xdc2f6.target.id;
    } else if (_0xdc2f6.target.parentNode.id) {
      _0x3c974a.id = _0xdc2f6.target.parentNode.id;
    }
    _0x27a83f(0, _0x3c974a);
  });
  return _0x5d4e71;
}
function SetTotalUnRead(_0x4aabe8) {
  var _0x47baeb = document.getElementById("titleBar");
  if (_0x47baeb && _0x47baeb.count) {
    if (_0x4aabe8 == 0) {
      _0x47baeb.count.style.visibility = "hidden";
    } else {
      if (_0x4aabe8 > 9) {
        _0x4aabe8 = "9+";
      }
      _0x47baeb.count.innerHTML = _0x4aabe8;
      _0x47baeb.count.style.visibility = "visible";
    }
  }
}
function getXats() {
  modalClose();
  HitWeb("https://rxat.ro/buy");
}
function ShowCaptcha(_0x49056a) {
  xrRoot.selector.CapJson = _0x49056a;
  xrRoot.selector.DoLoginEtc("AreYouABot");
}
function saveSetting(_0x292def, _0x39eecf, _0x52930b) {
  if (_0x52930b) {
    return ToC({
      Type: "Macro",
      Command: "Macro",
      Name: _0x292def,
      Value: _0x39eecf
    });
  }
  ToC({
    Page: "settings",
    Type: "Setting",
    Command: "Setting",
    Name: _0x292def,
    Value: _0x39eecf
  });
}
function NOP() {}
function isEmpty(_0x3eebc0) {
  for (var _0x4c32d2 in _0x3eebc0) {
    if (_0x3eebc0.hasOwnProperty(_0x4c32d2)) {
      return false;
    }
  }
  return true;
}
function setPmMode(_0x169d4e, _0x5b257f, _0x15485a, _0x2bb729) {
  _0x2bb729 ||= parent.document;
  const _0x111f26 = _0x2bb729.getElementById("textEntryEditable");
  const _0x1e5b27 = _0x2bb729.getElementById("pmWrapper");
  _0x1e5b27.innerHTML = "";
  _0x1e5b27.style.display = "block";
  if (!_0x169d4e) {
    _0x1e5b27.style.pointerEvents = "none";
    _0x1e5b27.style.display = "none";
    _0x111f26.classList.remove("sided");
    PMMODE = false;
    return;
  }
  PMMODE = true;
  _0x111f26.classList.add("sided");
  _0x1e5b27.dataset.userno = _0x5b257f;
  _0x1e5b27.dataset.regname = _0x15485a;
  addToolTip(makeElement(_0x1e5b27, "div", "pmLock"), ["mob2.sendingto", "Sending to: $1", _0x15485a], {
    position: "low",
    dom: _0x2bb729
  });
  const _0x3620f5 = makeElement(_0x1e5b27, "div", "pmDel");
  addToolTip(_0x3620f5, ["box.66", "Cancel"], {
    dom: _0x2bb729
  });
  _0x3620f5.addEventListener("click", () => {
    setPmMode(false);
  });
  _0x3620f5.innerHTML = String.raw`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40">
        <defs>
            <g id="_App_Icons_cancel_0_Layer0_0_FILL">
                <path fill="#19191b" stroke="none" d="
                M 12.2 3.85
                Q 11.6 3.85 11.2 4.25
                L 8.9 6.6 6.55 4.25
                Q 6.35 4.05 6.15 4 5.9 3.85 5.6 3.85 5 3.85 4.55 4.3 4.1 4.75 4.1 5.3 4.1 5.9 4.55 6.3
                L 6.85 8.6 4.5 11
                Q 4.05 11.4 4.05 12 4.05 12.55 4.5 13 4.95 13.45 5.5 13.45 6.1 13.45 6.5 13
                L 8.9 10.65 10.3 12.05 10.35 12.05 10.35 12.1 11.25 13
                Q 11.7 13.45 12.25 13.45 12.85 13.45 13.3 13 13.7 12.55 13.7 12 13.7 11.4 13.3 11
                L 10.9 8.6 13.25 6.3
                Q 13.65 5.9 13.65 5.3 13.65 4.75 13.2 4.3 12.75 3.85 12.2 3.85 Z"/>
            </g>

            <path id="_App_Icons_cancel_0_Layer0_0_1_STROKES" stroke="#19191b" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" fill="none" d="
            M 17.6 8.8
            Q 17.6 12.45 15 15 12.45 17.6 8.8 17.6 5.15 17.6 2.55 15 0 12.45 0 8.8 0 5.15 2.55 2.55 5.15 0 8.8 0 12.45 0 15 2.55 17.6 5.15 17.6 8.8 Z"/>
        </defs>

        <g transform="matrix( 1.76702880859375, 0, 0, 1.76702880859375, 4.5,4.4) ">
            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <use xlink:href="#_App_Icons_cancel_0_Layer0_0_FILL"/>

                <use xlink:href="#_App_Icons_cancel_0_Layer0_0_1_STROKES"/>
            </g>
        </g>
    </svg>`;
}
function sendPm(_0x478ddc, _0x573224) {
  if (_0x573224.length !== 0) {
    ToC({
      Command: "Action",
      Message: _0x573224,
      Next: "messages",
      Page: "actions",
      Type: "Action",
      UserNo: _0x478ddc,
      name: "PrivateMessage"
    });
  }
}
function MakeHelpMessage(_0x2a9791, _0x3d7261, _0xd256d9) {
  LineVisible = 1;
  _0x3d7261 ||= "";
  var _0x4cc798 = makeElement(0, "li", "message", _0x3d7261);
  var _0x5b4b0e = makeElement(_0x4cc798, "div", "listTable");
  var _0x42113c = makeElement(_0x5b4b0e, "div", "dialogRow");
  var _0x259904 = makeElement(_0x42113c, "div", "dialogCell cellWide noPointer");
  var _0x4f670e = makeElement(_0x259904, "div", "noftxt");
  if (!Classic) {
    _0x4f670e.style.width = "100%";
  }
  _0x4f670e.innerHTML = "";
  var _0x19de73 = makeElement(_0x4f670e, "p");
  _0x19de73.className = "chatsMessage";
  if (!Classic) {
    _0x19de73.style.cssText = "white-space: normal; margin-left: 3px";
  }
  var _0x444c1e = createSmText(_0x2a9791);
  _0x19de73.appendChild(_0x444c1e);
  if (_0xd256d9) {
    _0xd256d9.p = _0x19de73;
    _0xd256d9.msg = _0x4f670e;
  }
  return _0x4cc798;
}
function InitPage(_0x4ece10) {
  if (_0x4ece10.length > 1) {
    ConnectingOpen(_0x4ece10);
  } else {
    ConnectingClose();
  }
}
var connType;
var connTimeout = null;
function ConnectingClose() {
  if (connTimeout) {
    clearTimeout(connTimeout);
  }
  connTimeout = null;
  removeById("Connecting");
}
function ConnectingOpen(_0x3dc5e6) {
  if (_0x3dc5e6 && document.getElementById("Connecting")) {
    var _0x25b076 = document.getElementById("loading");
    if (_0x25b076) {
      _0x25b076.innerHTML = _0x3dc5e6 + "&nbsp;<span>.</span><span>.</span><span>.</span></div>";
      return;
    }
  }
  if (_0x3dc5e6) {
    connType = _0x3dc5e6;
    if (connTimeout) {
      clearTimeout(connTimeout);
    }
    connTimeout = setTimeout(ConnectingOpen, 500);
    return;
  }
  ConnectingClose();
  var _0x41d527 = makeElement(document.body, "div", "connectingDialog");
  _0x41d527.setAttribute("id", "Connecting");
  var _0x2aa069 = makeElement(_0x41d527, "div");
  _0x2aa069.innerHTML = "<!DOCTYPE html><html lang=\"en\"><body><div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"/><img id=\"rocket\" src=\"svg/ss.svg\" /><div id=\"loading\" class=\"txt\"><span id=\"ConMsgId\"></span>&nbsp;<span>.</span><span>.</span><span>.</span></div></div></div></body></html>";
  addText(document.getElementById("ConMsgId"), ["mod1." + connType.toLowerCase(), connType]);
  _0x2aa069.style.top = xInt((_0x41d527.clientHeight - _0x2aa069.clientHeight) / 2) + "px";
  _0x41d527.style.opacity = 1;
  _0x41d527.style.pointerEvents = "auto";
  document.getElementById("xatLoader").addEventListener("click", function () {
    ConnectingClose();
  });
}
function onSwear(_0x1769ac) {
  var _0x3fddf2 = _0x1769ac.target;
  _0x3fddf2.className = "";
  _0x3fddf2.onclick = null;
  _0x1769ac.preventDefault();
}
function ST2(_0x4bde65, _0x5a4ea5, _0x1b76ff, _0x2dcca2, _0xa60a3b) {
  if (_0x5a4ea5 != null) {
    _0x4bde65 = _0x4bde65.slice(0, _0x4bde65.indexOf("$1")) + _0x5a4ea5 + _0x4bde65.slice(_0x4bde65.indexOf("$1") + 2);
  }
  if (_0x1b76ff != null) {
    _0x4bde65 = _0x4bde65.slice(0, _0x4bde65.indexOf("$2")) + _0x1b76ff + _0x4bde65.slice(_0x4bde65.indexOf("$2") + 2);
  }
  if (_0x2dcca2 != null) {
    _0x4bde65 = _0x4bde65.slice(0, _0x4bde65.indexOf("$3")) + _0x2dcca2 + _0x4bde65.slice(_0x4bde65.indexOf("$3") + 2);
  }
  if (_0xa60a3b != null) {
    _0x4bde65 = _0x4bde65.slice(0, _0x4bde65.indexOf("$4")) + _0xa60a3b + _0x4bde65.slice(_0x4bde65.indexOf("$4") + 2);
  }
  return _0x4bde65;
}
function GetAsMB(_0x2154b5) {
  let _0x18ca22 = _0x2154b5.toString();
  if (_0x18ca22.substr(-9, 9) == "000000000") {
    _0x18ca22 = _0x18ca22.substr(0, _0x18ca22.length - 9) + "B";
  }
  if (_0x18ca22.substr(-6, 6) == "000000") {
    _0x18ca22 = _0x18ca22.substr(0, _0x18ca22.length - 6) + "M";
  }
  return _0x18ca22;
}
function xInt(_0x1d9075) {
  _0x1d9075 = parseInt(_0x1d9075);
  if (isNaN(_0x1d9075)) {
    return 0;
  } else {
    return _0x1d9075;
  }
}
function microtime(_0x1295d1) {
  var _0x586723 = new Date().getTime() / 1000;
  var _0x2fa15c = parseInt(_0x586723, 10);
  if (_0x1295d1) {
    return _0x586723;
  } else {
    return Math.round((_0x586723 - _0x2fa15c) * 1000) / 1000 + " " + _0x2fa15c;
  }
}
function urldecode(_0x5dec40) {
  return decodeURIComponent((_0x5dec40 + "").replace(/\+/g, "%20"));
}
function ObjToQuery(_0x4fe4de) {
  return Object.keys(_0x4fe4de).map(function (_0x533eb4) {
    return _0x533eb4 + "=" + _0x4fe4de[_0x533eb4];
  }).join("&");
}
function objToXatJson(_0x467771) {
  if (_0x467771) {
    return Object.keys(_0x467771).map(_0x361ca2 => _0x361ca2 + "/" + _0x467771[_0x361ca2]).join("//");
  } else {
    return "";
  }
}
function xatJsonToObj(_0x33d91e) {
  if (!_0x33d91e.length) {
    return {};
  }
  const _0x463fc2 = {};
  _0x33d91e.split("//").forEach(_0x3c5d2e => {
    _0x3c5d2e = _0x3c5d2e.split("/");
    _0x463fc2[_0x3c5d2e[0]] = _0x3c5d2e[1];
  });
  return _0x463fc2;
}
function loadJSON(_0x3bcfdc, _0x337df3, _0x405ffa, _0x20b958) {
  var _0x370098 = new XMLHttpRequest();
  _0x370098.onreadystatechange = function () {
    if (_0x370098.readyState === 4) {
      if (_0x370098.status === 200) {
        if (_0x337df3) {
          var _0x368e95;
          try {
            _0x368e95 = JSON.parse(_0x370098.responseText);
          } catch (_0x5d32ab) {
            if (_0x405ffa) {
              _0x405ffa(_0x5d32ab);
            }
          }
          if (_0x368e95) {
            _0x337df3(_0x368e95);
          }
        }
      } else if (_0x405ffa) {
        _0x405ffa(_0x370098);
      }
    }
  };
  if (_0x20b958) {
    _0x370098.open("POST", _0x3bcfdc, true);
    _0x370098.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x370098.send(ObjToQuery(_0x20b958));
  } else {
    _0x370098.open("GET", _0x3bcfdc, true);
    _0x370098.send();
  }
}
function loadHTML(_0xf62410, _0x36c4f1, _0x4d3a90, _0x5ba3f5) {
  var _0x37d269 = new XMLHttpRequest();
  _0x37d269.onreadystatechange = function () {
    if (_0x37d269.readyState === 4) {
      if (_0x37d269.status === 200) {
        if (_0x36c4f1) {
          _0x36c4f1(_0x37d269.responseText);
        }
      } else if (_0x4d3a90) {
        _0x4d3a90(_0x37d269);
      }
    }
  };
  if (_0x5ba3f5) {
    _0x37d269.open("POST", _0xf62410, true);
    _0x37d269.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x37d269.send(ObjToQuery(_0x5ba3f5));
  } else {
    _0x37d269.open("GET", _0xf62410, true);
    _0x37d269.send();
  }
}
const NamePowers = {
  statusglow: 16,
  statuscol: 32,
  glow: 4,
  col: 8,
  status: 2,
  hat: 1,
  red: 64,
  green: 128,
  blue: 256,
  light: 512,
  nospace: 1024,
  jewel: 4096,
  flag: 8192,
  wave: 16384,
  grad: 32768,
  valid: 65536,
  everypower: 131072,
  bump: 262144,
  mirror: 524288,
  invert: 1048576,
  typing: 2097152,
  away: 4194304,
  hasdays: 8388608,
  invisible: 16777216,
  sline: 33554432,
  category: 67108864,
  nolinks: 268435456,
  hasprofile: 1073741824,
  istickle: 1,
  mark: 2,
  xavi: 4,
  isBot: 8,
  zoom: 16,
  reghide: 32,
  subhide: 64,
  verified: 17,
  Transparent: 65536,
  ChatIsDebug: 128,
  NoSmilieLine: 2048
};
function DecodeColor(_0x489a54, _0x6a4978) {
  if (_0x489a54 != null) {
    if (_0x6a4978 & NamePowers.valid) {
      while ((_0x489a54.length != 6 || _0x489a54.replace(/[^0-9a-fA-F]/g, "").length != 6) && _0x489a54.length != _0x489a54.replace(/[^rgb\-\+]/g, "").length) {
        return _0x489a54;
      }
    }
    var _0x4ff1e5 = (_0x6a4978 & NamePowers.red) > 0;
    var _0x2b9af1 = (_0x6a4978 & NamePowers.green) > 0;
    var _0x524973 = (_0x6a4978 & NamePowers.blue) > 0;
    var _0x14e143 = (_0x6a4978 & NamePowers.light) > 0;
    if (_0x4ff1e5 != 0 || _0x2b9af1 != 0 || _0x524973 != 0 || _0x14e143 != 0) {
      var _0x53a32a = (_0x489a54 = _0x489a54.toLowerCase()).split("r").length - 1;
      var _0x5924d2 = _0x489a54.split("g").length - 1;
      var _0x247874 = _0x489a54.split("b").length - 1;
      var _0x50b2b8 = _0x489a54.split("+").length - 1;
      var _0x56c4a8 = _0x489a54.split("-").length - 1;
      var _0x285d8f = 0.5;
      if (_0x53a32a == 0 && _0x5924d2 == 0 && _0x50b2b8 == 0 && _0x56c4a8 == 0) {
        var _0x5ac1bb = 0;
        for (var _0x1edd13 = 0; _0x1edd13 < _0x489a54.length; _0x1edd13++) {
          var _0x19ab6f = _0x489a54.charAt(_0x1edd13);
          if ((_0x5ac1bb = _0x19ab6f >= "0" && _0x19ab6f <= "9" || _0x19ab6f >= "a" && _0x19ab6f <= "f" ? _0x5ac1bb + 1 : 0) == 6) {
            var _0x5c3aa9 = parseInt(_0x489a54.substr(_0x1edd13 - _0x5ac1bb + 1, 6), 16);
            if (_0x4ff1e5 != 0 && _0x2b9af1 != 0 && _0x524973 != 0 && _0x14e143 != 0) {
              return _0x5c3aa9;
            }
            _0x247874 = _0x5c3aa9 & 255;
            _0x5924d2 = _0x5c3aa9 >> 8 & 255;
            _0x53a32a = _0x5c3aa9 >> 16 & 255;
            _0x50b2b8 = _0x56c4a8 = 0;
            if (_0x14e143 != 0) {
              _0x285d8f = (Math.min(_0x53a32a, Math.min(_0x5924d2, _0x247874)) + Math.max(_0x53a32a, Math.max(_0x5924d2, _0x247874))) / 512;
            }
            break;
          }
        }
      }
      if (_0x53a32a != 0 || _0x5924d2 != 0 || _0x247874 != 0 || _0x50b2b8 != 0 || _0x56c4a8 != 0) {
        if (_0x4ff1e5 == 0) {
          _0x53a32a = 0;
        }
        if (_0x2b9af1 == 0) {
          _0x5924d2 = 0;
        }
        if (_0x524973 == 0) {
          _0x247874 = 0;
        }
        if (_0x14e143 == 0) {
          _0x50b2b8 = _0x56c4a8 = 0;
        }
        if (_0x53a32a == 0 && _0x5924d2 == 0 && _0x247874 == 0) {
          _0x53a32a = _0x5924d2 = _0x247874 = 1;
        }
        var _0x316319;
        var _0x510b22;
        var _0x1ec367;
        var _0x2e2190;
        var _0x403433;
        var _0xd6d93;
        var _0x326c89 = _0x53a32a / (_0x53a32a + _0x5924d2 + _0x247874);
        var _0x204e17 = _0x5924d2 / (_0x53a32a + _0x5924d2 + _0x247874);
        var _0x440c83 = _0x247874 / (_0x53a32a + _0x5924d2 + _0x247874);
        var _0x5cfc3c = Math.min(_0x326c89, Math.min(_0x204e17, _0x440c83));
        var _0x543f15 = Math.max(_0x326c89, Math.max(_0x204e17, _0x440c83));
        var _0x27f9c5 = _0x543f15 - _0x5cfc3c;
        _0xd6d93 = (_0x543f15 + _0x5cfc3c) / 2;
        if (_0x27f9c5 == 0) {
          _0x2e2190 = _0x403433 = 0;
        } else {
          _0x403433 = _0xd6d93 < 0.5 ? _0x27f9c5 / (_0x543f15 + _0x5cfc3c) : _0x27f9c5 / (2 - _0x543f15 - _0x5cfc3c);
          var _0x4a7b4c = ((_0x543f15 - _0x326c89) / 6 + _0x27f9c5 / 2) / _0x27f9c5;
          var _0x1a05c7 = ((_0x543f15 - _0x204e17) / 6 + _0x27f9c5 / 2) / _0x27f9c5;
          var _0x368cb0 = ((_0x543f15 - _0x440c83) / 6 + _0x27f9c5 / 2) / _0x27f9c5;
          if (_0x326c89 == _0x543f15) {
            _0x2e2190 = _0x368cb0 - _0x1a05c7;
          } else if (_0x204e17 == _0x543f15) {
            _0x2e2190 = 1 / 3 + _0x4a7b4c - _0x368cb0;
          } else if (_0x440c83 == _0x543f15) {
            _0x2e2190 = 2 / 3 + _0x1a05c7 - _0x4a7b4c;
          }
          if (_0x2e2190 < 0) {
            _0x2e2190 += 1;
          }
          if (_0x2e2190 > 1) {
            _0x2e2190 -= 1;
          }
        }
        if ((_0xd6d93 = _0x285d8f + _0x50b2b8 * 0.0625 - _0x56c4a8 * 0.0625) < 0) {
          _0xd6d93 = 0;
        }
        if (_0xd6d93 > 1) {
          _0xd6d93 = 1;
        }
        if (_0x403433 == 0) {
          _0x316319 = _0x510b22 = _0x1ec367 = _0xd6d93;
        } else {
          var _0x3ca754 = _0xd6d93 * 2 - (_0x1edd13 = _0xd6d93 < 0.5 ? _0xd6d93 * (1 + _0x403433) : _0xd6d93 + _0x403433 - _0x403433 * _0xd6d93);
          _0x316319 = _0x37a686(_0x3ca754, _0x1edd13, _0x2e2190 + 1 / 3);
          _0x510b22 = _0x37a686(_0x3ca754, _0x1edd13, _0x2e2190);
          _0x1ec367 = _0x37a686(_0x3ca754, _0x1edd13, _0x2e2190 - 1 / 3);
        }
        return ((_0x316319 = Math.round(_0x316319 * 255)) << 16) + ((_0x510b22 = Math.round(_0x510b22 * 255)) << 8) + Math.round(_0x1ec367 * 255);
      }
    }
  }
  function _0x37a686(_0x32c2b7, _0x1364b7, _0x59cc4e) {
    if (_0x59cc4e < 0) {
      _0x59cc4e += 1;
    }
    if (_0x59cc4e > 1) {
      _0x59cc4e -= 1;
    }
    if (_0x59cc4e * 6 < 1) {
      return _0x32c2b7 + (_0x1364b7 - _0x32c2b7) * 6 * _0x59cc4e;
    } else if (_0x59cc4e * 2 < 1) {
      return _0x1364b7;
    } else if (_0x59cc4e * 3 < 2) {
      return _0x32c2b7 + (_0x1364b7 - _0x32c2b7) * (2 / 3 - _0x59cc4e) * 6;
    } else {
      return _0x32c2b7;
    }
  }
}
function toHex6(_0x47a8d6) {
  return ("00000" + Number(_0x47a8d6).toString(16)).slice(-6).toUpperCase();
}
function MakeGlow(_0x4f41f0) {
  var _0x417d62 = "0 0 0.2rem #" + toHex6(_0x4f41f0);
  return _0x417d62 + "," + _0x417d62 + "," + _0x417d62;
}
function MakeStatusGlow(_0x1aaa53) {
  return "0 0 0.134rem #" + toHex6(_0x1aaa53);
}
function rgbtohsv(_0xfcc42e) {
  var _0x3ed94c = (_0xfcc42e >> 16 & 255) / 255;
  var _0x4d180 = (_0xfcc42e >> 8 & 255) / 255;
  var _0x52f5b1 = (_0xfcc42e & 255) / 255;
  var _0x2be28a = Math.min(_0x3ed94c, _0x4d180, _0x52f5b1);
  var _0x24a2ac = Math.max(_0x3ed94c, _0x4d180, _0x52f5b1);
  return new Array(_0x2be28a == _0x24a2ac ? 0 : _0x24a2ac == _0x3ed94c ? ((_0x4d180 - _0x52f5b1) * 60 / (_0x24a2ac - _0x2be28a) + 360) % 360 : _0x24a2ac == _0x4d180 ? (_0x52f5b1 - _0x3ed94c) * 60 / (_0x24a2ac - _0x2be28a) + 120 : (_0x3ed94c - _0x4d180) * 60 / (_0x24a2ac - _0x2be28a) + 240, _0x24a2ac == 0 ? 0 : (_0x24a2ac - _0x2be28a) / _0x24a2ac, _0x24a2ac);
}
function hsvtorgb(_0x3c5fe3, _0x34ec60, _0x79cc73) {
  var _0x5a780d;
  var _0x580b5c;
  var _0x109b5f;
  var _0x40fc5f;
  var _0x4322ec;
  var _0x4046cf;
  var _0x16a121;
  var _0x57f5cf;
  _0x3c5fe3 %= 360;
  if (_0x79cc73 == 0) {
    return 0;
  }
  _0x4046cf = _0x79cc73 * (1 - _0x34ec60);
  _0x16a121 = _0x79cc73 * (1 - _0x34ec60 * (_0x4322ec = (_0x3c5fe3 /= 60) - (_0x40fc5f = Math.floor(_0x3c5fe3))));
  _0x57f5cf = _0x79cc73 * (1 - _0x34ec60 * (1 - _0x4322ec));
  switch (_0x40fc5f) {
    case 0:
      _0x5a780d = _0x79cc73;
      _0x580b5c = _0x57f5cf;
      _0x109b5f = _0x4046cf;
      break;
    case 1:
      _0x5a780d = _0x16a121;
      _0x580b5c = _0x79cc73;
      _0x109b5f = _0x4046cf;
      break;
    case 2:
      _0x5a780d = _0x4046cf;
      _0x580b5c = _0x79cc73;
      _0x109b5f = _0x57f5cf;
      break;
    case 3:
      _0x5a780d = _0x4046cf;
      _0x580b5c = _0x16a121;
      _0x109b5f = _0x79cc73;
      break;
    case 4:
      _0x5a780d = _0x57f5cf;
      _0x580b5c = _0x4046cf;
      _0x109b5f = _0x79cc73;
      break;
    case 5:
      _0x5a780d = _0x79cc73;
      _0x580b5c = _0x4046cf;
      _0x109b5f = _0x16a121;
  }
  return Math.floor(_0x5a780d * 255) << 16 | Math.floor(_0x580b5c * 255) << 8 | Math.floor(_0x109b5f * 255);
}
function ProcessName(_0x319e64, _0x5bf9a4, _0x421317) {
  if (_0x319e64 == null) {
    _0x319e64 = "";
  }
  if (_0x319e64.charAt(0) == "$") {
    _0x319e64 = _0x319e64.substr(1);
  }
  if (_0x5bf9a4 == null) {
    _0x5bf9a4 = "";
  }
  if (_0x421317 == null) {
    _0x421317 = 65535;
  }
  var _0x1bab95;
  var _0x5f3807;
  var _0x468476;
  var _0x1427b4;
  var _0x32f17d;
  var _0x1a160b = {
    status: ""
  };
  if (hasDarkMode()) {
    _0x1a160b.statuscol = "#969696";
  } else {
    _0x1a160b.statuscol = 0;
  }
  if (_0x5bf9a4.length > 0) {
    _0x468476 = _0x5bf9a4.split("#");
    if (_0x421317 & NamePowers.status) {
      _0x1a160b.status = _0x468476[0];
    }
    if (_0x421317 & NamePowers.statusglow) {
      _0x1a160b.statusglow = DecodeColor(_0x468476[1], _0x421317);
      if (_0x421317 & NamePowers.statuscol) {
        _0x1a160b.statuscol = DecodeColor(_0x468476[2], _0x421317);
      }
    }
  }
  _0x32f17d = _0x1427b4 = _0x319e64;
  _0x319e64 = (_0x319e64 = (_0x319e64 = _0x319e64.replace(/\s*\(\uFEFF?hat#.*?\)\s*/gi, " ")).replace(/\s*\(\uFEFF?glow#.*?\)\s*/gi, " ")).replace(/[\s_]*$/gi, "");
  if (_0x421317 & NamePowers.nospace) {
    _0x319e64 = _0x319e64.replace(/_/g, " ");
  }
  _0x1a160b.name = _0x319e64 + "﻿";
  if ((_0x1bab95 = _0x1427b4.replace(/.*\((glow#.*?)\).*/i, "$1")) !== _0x1427b4) {
    if ((_0x1bab95 = _0x1bab95.split("#")).length) {
      _0x1bab95 = _0x1bab95.filter(_0x68b005 => _0x68b005 && !_0x68b005.match(/^[^a-zA-Z0-9-\s+\\]+$/));
    }
    if (_0x421317 & NamePowers.glow && _0x1bab95[0]) {
      _0x1a160b.glow = 65280;
    }
    if (_0x421317 & NamePowers.glow && _0x1bab95[1]) {
      _0x1a160b.glow = DecodeColor(_0x1bab95[1], _0x421317);
    }
    if (_0x1bab95[2] === "grad" && _0x421317 & NamePowers.grad) {
      _0x1a160b.grad = [];
      let _0x12dd28 = 0;
      _0x421317 |= NamePowers.valid;
      for (let _0x1b0b85 = 3; _0x1b0b85 < _0x1bab95.length; _0x1b0b85++) {
        let _0x2b5769 = _0x1bab95[_0x1b0b85].charAt(0);
        if (_0x2b5769 != "o" && (_0x2b5769 != "f" || _0x1bab95[_0x1b0b85].length == 6) || _0x421317 & NamePowers.wave) {
          _0x1a160b.grad[_0x12dd28++] = DecodeColor(_0x1bab95[_0x1b0b85], _0x421317);
        }
      }
      if (_0x421317 & NamePowers.wave) {
        _0x1a160b.grad[_0x12dd28++] = "NW";
      }
    } else if (_0x1bab95[2] === "jewel" && _0x421317 & NamePowers.jewel) {
      _0x1a160b.flag = [];
      for (let _0x1835f1 = 2; _0x1835f1 < _0x1bab95.length; _0x1835f1++) {
        _0x1a160b.flag[_0x1835f1 - 2] = _0x1bab95[_0x1835f1];
      }
    } else if (_0x1bab95[2] === "flag" && _0x421317 & NamePowers.flag) {
      _0x1a160b.flag = [];
      for (let _0x5165ac = 3; _0x5165ac < _0x1bab95.length; _0x5165ac++) {
        _0x1a160b.flag[_0x5165ac - 3] = _0x1bab95[_0x5165ac];
      }
    } else if (_0x421317 & NamePowers.col && _0x1bab95[2]) {
      _0x1a160b.col = DecodeColor(_0x1bab95[2], _0x421317);
    }
  }
  if ((_0x5f3807 = _0x32f17d.replace(/.*\((hat.*?)\).*/i, "$1")) !== _0x32f17d) {
    _0x5f3807 = _0x5f3807.split("#");
    if (_0x421317 & NamePowers.hat && _0x5f3807[0]) {
      _0x1a160b.hat = "h";
    }
    if (_0x421317 & NamePowers.hat && _0x5f3807[1]) {
      _0x1a160b.hat = _0x5f3807[1];
    }
    if (_0x421317 & NamePowers.hat && _0x5f3807[2]) {
      _0x1a160b.hatcol = DecodeColor(_0x5f3807[2], _0x421317);
    }
  }
  return _0x1a160b;
}
function Getms() {
  return Date.Now();
}
function GetTimeToGo(_0x1927ee, _0x44e0cc) {
  if (_0x1927ee == 0) {
    return "";
  }
  let _0x15345c = Math.floor((new Date() - _0x1927ee) / 1000);
  if ((_0x15345c = parseInt(_0x15345c)) <= 0) {
    return ["mob1.justnow", "just now"];
  } else if (_0x15345c < 60) {
    return ["mob1.secsago", "$1 secs ago", _0x15345c];
  } else if (_0x15345c < 120) {
    return ["mob1.minago", "$1 min ago", 1];
  } else if (_0x15345c < 3600) {
    return ["mob1.minsago", "$1 mins ago", parseInt(_0x15345c / 60)];
  } else if (_0x15345c < 86400) {
    return ["mob1.hoursago", "$1 hours ago", parseInt(_0x15345c / 3600)];
  } else if (_0x44e0cc) {
    return new Date(_0x1927ee).toUTCString();
  } else {
    return ["mob1.daysago", "$1 days ago", parseInt(_0x15345c / 86400)];
  }
}
function setUserBank() {
  if (w_Powers === null) {
    return;
  }
  if (POWERS === null) {
    POWERS = [];
  }
  POWERS = [];
  for (let _0x469286 = 1; _0x469286 < MAXPOWER; _0x469286++) {
    if (_0x469286 == 81 || _0x469286 % 32 == 31) {
      continue;
    }
    let _0x11fbc6 = _0x469286 % 32;
    let _0x5919ac = xInt(_0x469286 / 32);
    if (w_Powers[_0x5919ac] & 1 << _0x11fbc6) {
      POWERS[_0x469286] = 1;
    }
  }
  let _0x221961 = PowDecode(w_PowerO);
  if (_0x221961 !== null) {
    for (let _0x21134 = 1; _0x21134 < MAXPOWER; _0x21134++) {
      if (_0x21134 != 81 && _0x21134 % 32 != 31 && _0x221961[_0x21134]) {
        POWERS[_0x21134] = xInt(POWERS[_0x21134]) + _0x221961[_0x21134];
      }
    }
  }
}
function setDisabledPowers() {
  var _0x5bb31f;
  if (w_Mask != null && (MASKED = [], PSSA || ((_0x5bb31f = parent) == null ? undefined : _0x5bb31f.PSSA))) {
    for (let _0x1eef44 in PSSA || ((_0x3a381f = parent) == null ? undefined : _0x3a381f.PSSA)) {
      var _0x3a381f;
      let _0x566b57 = _0x1eef44 >> 5;
      let _0x24f98a = Math.pow(2, _0x1eef44 % 32);
      if (w_Mask[_0x566b57] && w_Mask[_0x566b57] & _0x24f98a) {
        MASKED[_0x1eef44] = 0;
      }
    }
  }
}
function PowDecode(_0x31031a) {
  if (_0x31031a == null || _0x31031a.length == 0) {
    return null;
  }
  let _0x44e165 = [];
  let _0x3f0698 = (_0x31031a = _0x31031a.toString()).split("|");
  for (let _0x306ab7 = 0; _0x306ab7 < _0x3f0698.length; _0x306ab7++) {
    let _0x50bea5 = _0x3f0698[_0x306ab7].split("=");
    let _0x5ab9f4 = xInt(_0x50bea5[1]);
    if (_0x5ab9f4 <= 0) {
      _0x5ab9f4 = 1;
    }
    if (_0x5ab9f4 > 10000) {
      _0x5ab9f4 = 1;
    }
    _0x44e165[_0x50bea5[0]] = _0x5ab9f4;
  }
  return _0x44e165;
}
function hasPower(_0x3e31c1) {
  if (!POWERS || POWERS.length == 0) {
    return 0;
  }
  let _0x20698a = false;
  for (let _0x34aee1 in POWERS) {
    if (POWERS.hasOwnProperty(_0x34aee1) && _0x3e31c1 == _0x34aee1) {
      _0x20698a = POWERS[_0x34aee1];
    }
  }
  if (MASKED) {
    for (let _0x1a485a in MASKED) {
      if (MASKED.hasOwnProperty(_0x1a485a) && _0x3e31c1 == _0x1a485a) {
        _0x20698a = false;
      }
    }
  }
  return _0x20698a;
}
function iMux(_0x3fd604, _0xc1e6d8) {
  _0xc1e6d8 ||= "i";
  var _0x3b75f2 = _0x3fd604.substr(-10);
  var _0x57c1c6 = 0;
  for (var _0x58b406 = 0; _0x58b406 < 10; _0x58b406++) {
    _0x57c1c6 += _0x3b75f2.charCodeAt(_0x58b406);
  }
  return "https://" + _0xc1e6d8 + (_0x57c1c6 & 1) + ".rxat.ro/web_gear/chat/" + _0x3fd604;
}
var Trusted;
var syel;
var soth;
var spowhave;
var spow;
var stop;
var scount;
var Browser;
var dialogFrame;
var actions;
var settings;
var settingsWindow;
var selector;
var butsFrame;
var MyObj;
function SafeImage(_0x191f14, _0x6b0cd7, _0x33bd, _0x3bbae7) {
  if (_0x191f14.length == 0) {
    return "";
  }
  var _0x223c90 = parse_url(_0x191f14);
  if (!_0x223c90 && !(_0x223c90 = parse_url(_0x191f14 = _0x191f14.charAt(0) == "/" ? "https:" + _0x191f14 : "https://" + _0x191f14))) {
    return "";
  }
  if (!_0x223c90.host) {
    return "";
  }
  if (_0x223c90.host.indexOf("rxat.ro") >= 0 && (_0x223c90.path.indexOf("GetImage") > 0 || _0x223c90.path.indexOf("/chat/av/") >= 0)) {
    return _0x191f14;
  }
  if (_0x6b0cd7 == _0x33bd && !_0x3bbae7) {
    _0x6b0cd7 = _0x33bd = calcAvSize(_0x6b0cd7);
  }
  let _0x352120 = Animated + "&W=" + _0x6b0cd7 + "&H=" + _0x33bd + "&U=" + _0x191f14;
  if (_0x3bbae7) {
    _0x352120 += "&g";
  }
  return "https://rxat.ro/web_gear/chat/GetImage7.php?" + _0x352120;
}
function parse_url(_0x259e3b, _0x334f77) {
  var _0x13209b = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var _0x527eaf = {};
  var _0x20061f = _0x527eaf["phpjs.parse_url.mode"] && _0x527eaf["phpjs.parse_url.mode"].local_value || "php";
  var _0x53b237 = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var _0x7064de = _0x53b237[_0x20061f].exec(_0x259e3b);
  var _0x453956 = {};
  for (var _0x2d922a = 14; _0x2d922a--;) {
    if (_0x7064de[_0x2d922a]) {
      _0x453956[_0x13209b[_0x2d922a]] = _0x7064de[_0x2d922a];
    }
  }
  if (_0x334f77) {
    return _0x453956[_0x334f77.replace("PHP_URL_", "").toLowerCase()];
  }
  if (_0x20061f !== "php") {
    var _0x4a254b = _0x527eaf["phpjs.parse_url.queryKey"] && _0x527eaf["phpjs.parse_url.queryKey"].local_value || "queryKey";
    _0x53b237 = /(?:^|&)([^&=]*)=?([^&]*)/g;
    _0x453956[_0x4a254b] = {};
    (_0x453956[_0x13209b[12]] || "").replace(_0x53b237, function (_0x396104, _0x45f7fc, _0x564369) {
      if (_0x45f7fc) {
        _0x453956[_0x4a254b][_0x45f7fc] = _0x564369;
      }
    });
  }
  delete _0x453956.source;
  return _0x453956;
}
function xEscape(_0x4e89e9) {
  return "%" + _0x4e89e9.charCodeAt(0).toString(16).toUpperCase();
}
function rfc3986EncodeURIComponent(_0x2fe380) {
  return encodeURIComponent(_0x2fe380).replace(/[!'()*~]/g, xEscape);
}
function addSmilies(_0x7d78d6, _0x157c4c, _0x2586c8, _0x3c0191, _0xde6949) {
  if (!syel) {
    syel = JSON.parse(_0x7d78d6);
    soth = JSON.parse(_0x157c4c);
    spow = JSON.parse(_0x2586c8);
    spowhave = JSON.parse(_0x3c0191);
    stop = JSON.parse(_0xde6949);
  }
}
function detectIE() {
  var _0x318be8 = window.navigator.userAgent;
  var _0x142cc3 = _0x318be8.indexOf("MSIE ");
  if (_0x142cc3 > 0) {
    Browser = "MS";
    return parseInt(_0x318be8.substring(_0x142cc3 + 5, _0x318be8.indexOf(".", _0x142cc3)), 10);
  }
  if (_0x318be8.indexOf("Trident/") > 0) {
    Browser = "MS";
    var _0x54187a = _0x318be8.indexOf("rv:");
    return parseInt(_0x318be8.substring(_0x54187a + 3, _0x318be8.indexOf(".", _0x54187a)), 10);
  }
  var _0x2554aa = _0x318be8.indexOf("Edge/");
  if (_0x2554aa > 0) {
    Browser = "MS";
    return parseInt(_0x318be8.substring(_0x2554aa + 5, _0x318be8.indexOf(".", _0x2554aa)), 10);
  } else {
    if (_0x318be8.toLowerCase().indexOf("firefox") > -1) {
      Browser = "FF";
    } else if (_0x318be8.indexOf("Chrome") > -1) {
      Browser = "CR";
    } else if (_0x318be8.indexOf("Safari") > -1) {
      Browser = "SF";
    }
    return false;
  }
}
function setTextBoxEditable(_0x5a676f, _0x46673e) {
  var _0x26169b = document.getElementById(_0x5a676f);
  if (_0x26169b) {
    _0x26169b.setAttribute("contenteditable", _0x46673e);
    if (_0x46673e) {
      _0x26169b.classList.add("textBox", "textBoxEdit");
    } else {
      _0x26169b.classList.remove("textBox", "textBoxEdit");
    }
  }
  return _0x26169b;
}
function isString(_0x23b5ef) {
  return Object.prototype.toString.call(_0x23b5ef) === "[object String]";
}
function isConnected() {
  return parent.isOpen;
}
function resizeSearchBar(_0x24367f) {
  if (_0x24367f) {
    _0x24367f.style.width = window.innerWidth - 20 + "px";
    window.addEventListener("resize", () => {
      _0x24367f.style.width = window.innerWidth - 20 + "px";
    });
  }
}
function setFrameVis(_0x2fda18) {
  var _0x4d7bc3;
  if (!((_0x4d7bc3 = settings) == null ? undefined : _0x4d7bc3.toSave)) {
    for (var _0x1ecbb0 in {
      selector: 1,
      settings: 1,
      actions: 1
    }) {
      var _0xb9c7e = document.getElementById(_0x1ecbb0 + "Frame");
      if (_0x1ecbb0 == _0x2fda18) {
        _0xb9c7e.classList.remove("d-none");
      } else {
        _0xb9c7e.classList.add("d-none");
      }
    }
    var _0x1b77ea;
    var _0x205038 = document.getElementById("FrameDialog");
    var _0x5bbaaa = document.getElementById("FrameBack");
    butsFrame = _0x205038;
    if (_0x2fda18) {
      removeClass("d-none", "Overlays");
      removeClass("d-none", "OverlaysClassic");
    } else {
      addClass("d-none", "Overlays");
      addClass("d-none", "OverlaysClassic");
      if (_0x205038) {
        _0x205038.classList.add("d-none");
      }
      if (_0x5bbaaa) {
        _0x5bbaaa.classList.add("d-none");
      }
      if (actions) {
        actions.clearall();
        actions.Visible = false;
        if (actions.ReLogin) {
          actions.ReLogin = false;
          ToC({
            Command: "CheckRestartAfterMePage"
          });
        }
      }
      if (selector) {
        if (selector.ReLogin) {
          selector.ReLogin = false;
          pssaSet = false;
          SetPow();
          ToC({
            Command: "CheckRestartAfterMePage"
          });
        }
        selector.clear();
      }
      if ((_0x1b77ea = settings) == null ? undefined : _0x1b77ea.doReload) {
        settings.doReload = false;
        if (Classic) {
          reloadSidebarStuff();
        }
        ToC({
          Command: "DoReload"
        });
      }
    }
    ColorTitle();
  }
}
function doSelector(_0x4ee045) {
  selector.initLang(Language);
  posModal(butsFrame, {
    mw: 900
  });
  selector.UserNo = _0x4ee045.UserNo;
  selector.MyObj = MyObj ? config : _0x4ee045.Config;
  switch (_0x4ee045.Type) {
    case "Powers":
      selector.Powers = _0x4ee045.Powers;
      selector.MainObj = _0x4ee045.MainObj;
      selector.Go = true;
      selector.hideWallet();
      selector.startPowers();
      break;
    case "Kiss":
      selector.doKisses();
      break;
    case "Smilies":
      selector.startSmilies();
      break;
    case "Stickers":
      selector.stickers(_0x4ee045.Pack);
      break;
    case "Gifts":
      let _0x1a9258 = _0x4ee045.MainObj ? _0x4ee045.MainObj.user[0] : _0x4ee045.UserNo;
      selector.gifts(_0x1a9258);
      break;
    case "Marry":
    case "Divorce":
      selector.id = _0x4ee045.MainObj.id;
      selector.regname = _0x4ee045.MainObj.regname;
      selector.doKisses(_0x4ee045.Type);
  }
}
String.prototype.hashCode = function () {
  var _0x25c616 = 0;
  if (this.length == 0) {
    return _0x25c616;
  }
  for (var _0xe69511 = 0; _0xe69511 < this.length; _0xe69511++) {
    _0x25c616 = (_0x25c616 << 5) - _0x25c616 + this.charCodeAt(_0xe69511);
    _0x25c616 &= _0x25c616;
  }
  return _0x25c616;
};
detectIE();
let copyright = document.getElementById("copyrightyear");
function classicSetDialog(_0x59e940, _0x575d27) {
  let _0x13af2c = document.getElementById("Overlays");
  _0x13af2c ||= document.getElementById("OverlaysClassic");
  if (!_0x13af2c) {
    // Prevent infinite recursion by checking if we're already in a parent context
    if (parent && parent !== window && parent.classicSetDialog && !window._classicSetDialogRecursion) {
      window._classicSetDialogRecursion = true;
      try {
        parent.classicSetDialog(_0x59e940, _0x575d27);
      } finally {
        window._classicSetDialogRecursion = false;
      }
    }
    return;
  }
  let _0x3eedc0 = xInt(_0x575d27);
  var _0xc237ad;
  if (!_0x3eedc0 && _0x575d27.MainObj && _0x575d27.MainObj.user) {
    _0x3eedc0 = xInt(_0x575d27.MainObj.user[0].id);
  }
  if (!_0x3eedc0 && MyObj) {
    _0x3eedc0 = xInt(MyObj.MyId);
  }
  switch (_0x59e940) {
    case "selector":
      _0xc237ad = "selector";
      break;
    case "settings":
      _0xc237ad = _0x59e940;
      break;
    default:
      _0xc237ad = "actions";
  }
  setFrameVis(_0xc237ad);
  if (_0x13af2c = document.getElementById("FrameDialogCloseBut")) {
    _0x13af2c.onclick = function () {
      setFrameVis();
    };
  }
  if (_0x13af2c = document.getElementById("FrameBack")) {
    _0x13af2c.onclick = function () {
      setFrameVis();
    };
  }
  const _0x52e8c1 = document.getElementById(_0xc237ad + "Frame").contentWindow;
  switch (_0x59e940) {
    case "settings":
      settingsWindow = _0x52e8c1;
      settings = _0x52e8c1.settings;
      if (_0x575d27.tab) {
        _0x3eedc0 = _0x575d27.UserNo;
        setTimeout(() => {
          settings.doTab(_0x575d27.tab);
        }, 250);
      }
      break;
    case "selector":
      removeClass("d-none", "FrameDialog");
      removeClass("d-none", "FrameBack");
      selector = _0x52e8c1.selector;
      doSelector(_0x575d27);
      _0x3eedc0 = _0x575d27.UserNo;
      break;
    default:
      (actions = _0x52e8c1.actions).clearall();
      actions.Visible = true;
  }
  let _0x5e66f5 = document.getElementById("appframe");
  if (_0x5e66f5) {
    (_0x5e66f5 = _0x5e66f5.contentWindow).actions = actions;
    _0x5e66f5.selector = selector;
    _0x5e66f5.settings = settings;
  }
  ToC({
    Command: "LoadClassicDialog",
    Type: _0x59e940,
    UserNo: _0x3eedc0
  });
}
function getHash(_0x2122cf) {
  let _0x52f40e = 0;
  let _0x612b27 = _0x2122cf.length;
  for (var _0x272125 = 0; _0x272125 < _0x612b27; _0x272125++) {
    _0x52f40e = (_0x52f40e << 5) - _0x52f40e + _0x2122cf.charCodeAt(_0x272125);
    _0x52f40e |= 0;
  }
  return _0x52f40e;
}
function hasDarkMode() {
  var _0x1edbe9;
  let _0x39ca66 = (_0x1edbe9 = JSON.parse(localStorage.getItem("Settings"))) == null ? undefined : _0x1edbe9.darkmode;
  return _0x39ca66 && _0x39ca66 == "enable";
}
function setdarkmode(_0x1e0add) {
  let _0x321a88 = _0x1e0add || hasDarkMode();
  if (_0x321a88 && _0x321a88 != "disable") {
    if (_0x321a88 && xrRoot.xrClassic) {
      document.body.classList.add("dark");
    } else if (_0x321a88 && !xrRoot.xrClassic) {
      document.body.classList.add("dark");
      document.body.classList.add("darkMobile");
      if (parent && parent.document) {
        const dropdownContent = parent.document.getElementById("dropdown-content");
        if (dropdownContent) {
          dropdownContent.classList.add("darkMenu");
        }
      }
    }
  } else {
    if (document.body) {
      document.body.classList.remove("dark");
    }
  }
}
function hasHideUserlist() {
  var _0x536287;
  return ((_0x536287 = JSON.parse(localStorage.getItem("Settings"))) == null ? undefined : _0x536287.hideuserlist) || "enable";
}
function hasHoverAnim() {
  var _0x1926e0;
  let _0x51de0d = (_0x1926e0 = JSON.parse(localStorage.getItem("Settings"))) == null ? undefined : _0x1926e0.hoverAnim;
  return !!_0x51de0d && _0x51de0d == "enable";
}
function hasStealthMode() {
  var _0x58d796;
  let _0x3b2a74 = (_0x58d796 = JSON.parse(localStorage.getItem("Macros"))) == null ? undefined : _0x58d796.Stealth;
  return _0x3b2a74 && _0x3b2a74 == "enable";
}
function setHoverAnim() {
  if (hasHoverAnim()) {
    document.body.classList.add("animHovOn");
  } else {
    document.body.classList.remove("animHovOn");
  }
}
function getFavoriteGroups() {
  var _0x50414f;
  let _0x3d4174 = (_0x50414f = JSON.parse(localStorage.getItem("Settings"))) == null ? undefined : _0x50414f.favorites;
  if (_0x3d4174) {
    return JSON.parse(_0x3d4174.replace(/”/g, "\""));
  } else {
    return {};
  }
}
function hasGroupInFavorite() {
  let _0x1f4e88 = config.GroupName;
  if (!_0x1f4e88) {
    return;
  }
  let _0x2cfd68 = getFavoriteGroups();
  _0x2cfd68 ||= {};
  if (!Object.keys(_0x2cfd68).length) {
    return false;
  }
  for (let _0x1c5b03 in _0x2cfd68) {
    if (_0x2cfd68[_0x1c5b03].g && _0x2cfd68[_0x1c5b03].g.toLowerCase() == _0x1f4e88.toLowerCase()) {
      return true;
    }
  }
  return false;
}
function addRemoveFavorites(_0x5d1a04, _0x354697) {
  let _0x1cab5e = getFavoriteGroups();
  let _0x402b77 = _0x354697 || config.GroupName;
  let _0x3515a9 = _0x5d1a04 || config.roomid;
  if (_0x1cab5e[_0x402b77 = _0x402b77.toLowerCase()]) {
    delete _0x1cab5e[_0x402b77];
  } else {
    _0x1cab5e[_0x402b77] = {
      id: _0x3515a9,
      g: _0x402b77
    };
  }
  return saveSetting("favorites", JSON.stringify(_0x1cab5e));
}
function getIgnoredUsers() {
  return JSON.parse(localStorage.getItem("w_ignorelist2")) || {};
}
function unignoreUser(_0x19e3e8) {
  if (!_0x19e3e8) {
    return;
  }
  let _0x35969d = {
    name: "Unignore"
  };
  _0x35969d.UserNo = _0x19e3e8;
  _0x35969d.Page = "actions";
  _0x35969d.Command = "Action";
  _0x35969d.Type = "Action";
  return ToC(_0x35969d);
}
function StripSmilies(_0x3380be) {
  var _0x5d37d1;
  var _0xb5913c;
  for (_0x3380be = Replace(_0x3380be, [":)", ":-)", ":d", ";)", ";-)", ":o", ":-o", ":p", ":@", ":s", ":$", ":(", ":-(", ":'(", "|-)", "8-)", ":|", ":-|", ":-*", ":[", ":-["]); _0x3380be.indexOf("<") != -1;) {
    _0x5d37d1 = _0x3380be.indexOf("<");
    _0xb5913c = _0x3380be.indexOf(">", _0x5d37d1);
    _0x3380be = _0xb5913c != -1 ? _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0xb5913c + 1) : _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0x5d37d1 + 1);
  }
  while (_0x3380be.indexOf("(") != -1) {
    _0x5d37d1 = _0x3380be.indexOf("(");
    _0xb5913c = _0x3380be.indexOf(")", _0x5d37d1);
    _0x3380be = _0xb5913c != -1 ? _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0xb5913c + 1) : _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0x5d37d1 + 1);
  }
  while (_0x3380be.indexOf("[") != -1) {
    _0x5d37d1 = _0x3380be.indexOf("[");
    _0xb5913c = _0x3380be.indexOf("]", _0x5d37d1);
    _0x3380be = _0xb5913c != -1 ? _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0xb5913c + 1) : _0x3380be.substr(0, _0x5d37d1) + _0x3380be.substr(_0x5d37d1 + 1);
  }
  return _0x3380be;
}
function Replace(_0x4b7c51, _0x4d611d) {
  for (let _0x5170ba = 0; _0x5170ba < _0x4d611d.length; _0x5170ba += 2) {
    while (_0x4b7c51.indexOf(_0x4d611d[_0x5170ba]) != -1) {
      let _0x37b66b = _0x4b7c51.indexOf(_0x4d611d[_0x5170ba]);
      _0x4b7c51 = _0x4b7c51.substr(0, _0x37b66b) + _0x4d611d[_0x5170ba + 1] + _0x4b7c51.substr(_0x37b66b + _0x4d611d[_0x5170ba].length);
    }
  }
  return _0x4b7c51;
}
function reloadChat() {
  ToC({
    Command: "DoReload"
  });
}
if (copyright) {
  copyright.appendChild(document.createTextNode(new Date().getFullYear()));
}
class Snackbar {
  constructor(_0x19b50e) {
    this.text = _0x19b50e;
    if (Array.isArray(this.text)) {
      this.id = Math.abs(getHash(this.text[0]));
    } else {
      this.id = Math.abs(getHash(this.text));
    }
    this.snackbars = document.querySelector("#snackbars");
    if (!this.snackbars) {
      this.snackbars = makeElement(null, "div", "snackbars", "snackbars");
      document.body.prepend(this.snackbars);
    }
    this.snackbar = document.getElementById(this.id) ?? makeElement(this.snackbars, "div", "snackbar", this.id);
  }
  show(_0x3de868, _0x163dea) {
    if (_0x163dea && Array.isArray(this.text)) {
      this.text.push(_0x163dea);
    }
    this.snackbar.innerHTML = "";
    addText(this.snackbar, this.text);
    this.snackbar.classList.remove("hide");
    this.snackbar.classList.add("show");
    setTimeout(() => {
      this.hide();
    }, _0x3de868 || 2000);
  }
  hide() {
    this.snackbar.classList.remove("show");
    this.snackbar.classList.add("hide");
  }
}
function signInButtonPressed(_0x426798) {
  var _0x442088;
  _0x442088 = {
    Command: "signInButtonPressed"
  };
  if (_0x426798 !== undefined) {
    _0x442088.DoSignIn = _0x426798;
  }
  ToC(_0x442088);
}
let xAreaMob = document.querySelectorAll(".xAreaMob");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && xAreaMob) {
  for (var i = 0; i < xAreaMob.length; i++) {
    xAreaMob[i].classList.add("xAreaMobAct");
  }
}
function customModalWithMsg(_0x58cb04, _0x54f3d8, _0x36ba0e, _0x4b7444, _0x4709ee) {
  var _0x1654db;
  let _0x86179b = makeElement(null, "div");
  let _0x12fe0f = makeElement(_0x86179b, "div", "modalDialogContentClassic");
  let _0x195f33 = makeElement(_0x12fe0f, "div", "dialogTitleBar NewTitleBar");
  let _0x68526e = makeElement(_0x195f33, "span", "dialogTitle link NewDialogTitle", "openLink");
  let _0x26b1d0 = makeElement(_0x12fe0f, "div", "dialogBody NewdialogBody");
  let _0x2751eb = makeElement(_0x26b1d0, "div", "dialogPadding");
  let _0x1f4374 = makeElement(_0x2751eb, "div", "wrapper", "wrapper");
  if (_0x36ba0e) {
    const _0x10d642 = _0x4709ee ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removeb.svg";
    let _0x261325 = makeElement(null, "img");
    _0x261325.src = _0x10d642;
    _0x261325.alt = "close";
    _0x261325.width = "16";
    makeElement(_0x195f33, "span", "dialogTitleAction", "id_ModalClose_custom").appendChild(_0x261325);
  }
  addText(_0x68526e, _0x58cb04);
  _0x12fe0f.dataset.w = 0.6;
  addText(_0x1f4374, _0x4b7444 ? atob(_0x54f3d8) : _0x54f3d8, !!_0x4b7444);
  HiddenDivs.AlertDialog = _0x86179b.innerHTML;
  doModal("AlertDialog", {}, true);
  if ((_0x1654db = document.querySelector("#id_ModalClose_custom")) != null) {
    _0x1654db.addEventListener("click", () => {
      modalClose();
      if (_0x4b7444) {
        updateAnnounceStorage(_0x54f3d8);
      }
    });
  }
}
function setAnnounce(_0x16e0f9) {
  let _0x232769 = localStorage.getItem("announce_message");
  return (!_0x232769 || !!_0x232769 && _0x232769 !== _0x16e0f9) && customModalWithMsg("Announcement", _0x16e0f9, true, true);
}
function updateAnnounceStorage(_0x26f454) {
  return localStorage.setItem("announce_message", _0x26f454);
}
function replaceBrakets(_0x35ff4e) {
  if (!_0x35ff4e) {
    return "";
  }
  if (_0x35ff4e.indexOf("[") >= 0 && _0x35ff4e.indexOf("❯") >= 0) {
    let _0x28b06d = /❯.*\[.*?\]/g;
    let _0x1e434c = /\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/;
    let _0x5511e8 = _0x35ff4e.split(_0x1e434c);
    if (_0x5511e8.length > 0) {
      for (let _0x984a41 in _0x5511e8) {
        if (_0x5511e8[_0x984a41].match(_0x28b06d)) {
          _0x5511e8[_0x984a41] = _0x5511e8[_0x984a41].replace(_0x28b06d, "");
        }
      }
    }
    return _0x5511e8.join(" ").replace(/\[/gi, "{").replace(/\]/gi, "}");
  }
  return _0x35ff4e.replace(/\[/gi, "{").replace(/\]/gi, "}");
}
function assignUnassign(_0x2e0c21, _0x17f265) {
  if (!_0x2e0c21 || ["Assign", "Unassign"].indexOf(_0x17f265) == -1) {
    return;
  }
  let _0x51a809 = _0x2e0c21.value;
  if (_0x51a809) {
    return ToC({
      Type: "Assign",
      p: _0x51a809,
      a: _0x17f265 == "Assign" ? 1 : 0
    });
  } else {
    return undefined;
  }
}
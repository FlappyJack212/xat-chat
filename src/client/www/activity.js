"use strict";

var PageJson;
var websocket;
var appframeLoaded;
var OfflinePushToken;
var radio;
var TickGo;
var xrLandscape;
var xrNarrow;
var xrAndroidApp;
var xrIOSApp;
var currentChat;
var currentChatC;
var cust_lang;
var Page = "";
var LastActionHero = "";
var SavedId = "";
var MyId = 0;
var https = "https:";
var ConsoleOff = false;
var w_Vol = [35, 35, 35, 100];
var w_sound = 5;
var activityactivityReleaseMode = window.activityReleaseMode || 0;
var activityVar = 1;
var xrDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var xrWeb = true;
var xrClassic = true;
var LoginBodge = false;
var xrLangFiles = {};
// Use global activityWw if available, otherwise set local
var activityWw = window.activityWw || window;
var a0_1x10870 = {
  name: "box",
  origin: "https://rxat.ro",
  debugLogIgnore: [],
  debugNoLogs: true
};
var xConsts = {};
var activityXConfig = a0_1x10870;
activityXConfig.origin = "https://rxat.ro";
const _d = String.fromCharCode(160);
console.log.bind(console);
activityXConfig.name;
activityXConfig.debugLogIgnore;
console.log = function () {};
var activityTrace = console.log;
var xrPWA;
function xrPWAinstall() {
  var _0x32fe48;
  var _0x298310;
  return !!((_0x32fe48 = xrPWA) == null ? undefined : _0x32fe48.deferredPrompt) || !!/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) && !((_0x298310 = window.navigator) == null ? undefined : _0x298310.standalone);
}
function activityMain() {
  if (parent) {
    if (!parent.deferredPrompt) {
      parent.sendStuff = sendStuff;
    }
  }
  sendStuff(-999);
  var _0x133091 = activityToC("xatInit", "", "");
  if (_0x133091 != -999) {
    activityMain2(_0x133091);
  }
}
xrPWA = parent;
function sendStuff(_0x2c098c) {
  var _0x17aef9;
  let _0x3f83b8 = {};
  let _0x49e359 = 0;
  xrLandscape = window.innerHeight <= window.innerWidth;
  switch (_0x2c098c) {
    case 0:
    case 180:
      xrLandscape = false;
  }
  xrNarrow = window.innerWidth < 200;
  if (xrDevice) {
    _0x49e359 = _0x49e359 | 1;
  }
  if (xrWeb) {
    _0x49e359 = _0x49e359 | 2;
  }
  if (xrClassic) {
    _0x49e359 = _0x49e359 | 4;
  }
  if (xrLandscape) {
    _0x49e359 = _0x49e359 | 8;
  }
  if (xrNarrow) {
    _0x49e359 = _0x49e359 | 16;
  }
  if (xrAndroidApp) {
    _0x49e359 = _0x49e359 | 32;
  }
  if (xrIOSApp) {
    _0x49e359 = _0x49e359 | 64;
  }
  if ((_0x17aef9 = parent) == null ? undefined : _0x17aef9.isPWA) {
    _0x49e359 = _0x49e359 | 128;
  }
  _0x3f83b8.Flags = _0x49e359;
  _0x3f83b8.origin = activityXConfig.origin;
  if (_0x2c098c >= 0) {
    _0x3f83b8.Rotation = _0x2c098c;
  }
  activityToC("sendStuff", JSON.stringify(_0x3f83b8), "");
}
function activityMain2(_0x4e63dc) {
  MyId = xInt(_0x4e63dc);
  setPage(xrClassic ? "classic" : ClassicGroup ? "messages" : _0x4e63dc == 0 ? "groups" : "chats");
  activityToC("setContacts", "", "");
  activityToC("xatMain", "", "");
  activityToC("leaveBackground", "", ClassicGroup);
  ConsoleOff = activityToC("ConsoleOff", "", "") > 0;
  activityToC("SetPhoneFontSize", "", "1.0");
  activityToC("setLang", "", window.navigator.userLanguage || window.navigator.language);
  setInterval(function () {
    if (TickGo) {
      TimerMethod();
    } else {
      var _0x5cb118 = 3;
      if (xrClassic) {
        _0x5cb118 = 0;
      } else {
        var _0x58226d;
        var _0x26ccea = {
          actions: 1,
          settings: 1,
          selector: 1
        };
        var _0x13671a = _0x26ccea;
        for (_0x58226d in _0x13671a) {
          if ((_0x13671a = document.getElementById(_0x58226d + "Frame")) && _0x13671a.contentWindow[_0x58226d]) {
            _0x5cb118--;
          }
        }
      }
      if (_0x5cb118 == 0) {
        TickGo = 1;
        activityToC("xatCommand", "", JSON.stringify({
          Command: "EnableTick"
        }));
        if (!xrClassic && !MyId && !ClassicGroup && (!!xrIOSApp || !!xrAndroidApp)) {
          selector.DoLoginEtc("SignUp");
        }
      }
    }
  }, 100);
  if (xrClassic) {} else {
    var _0x243a40;
    var _0x3c8855 = ["home", "profile", "friends", "chats", "groups", "settings", "store", "buy", "help", "visitors", "classic", "logout", "login", "install"];
    for (_0x243a40 in _0x3c8855) {
      var _0x12ab33 = document.getElementById("sp_" + _0x3c8855[_0x243a40]);
      if (_0x12ab33) {
        _0x12ab33.sp = _0x3c8855[_0x243a40];
        _0x12ab33.addEventListener("click", function (_0x1d5a80) {
          actSetPage(_0x1d5a80.currentTarget.sp);
        });
      }
    }
    addClass("d-none", "sp_classic");
    if (xrIOSApp) {
      addClass("d-none", "sp_buy");
    }
    setDNone(xrPWAinstall(), "sp_install");
  }
  GetXconsts(xrClassic ? "messages" : "parent");
  activityToC("xatCommand", "", JSON.stringify({
    Command: "EnableTick"
  }));
  let _0x1aa8bf = activityToC("getStuff", "", "");
  if (_0x1aa8bf != -999) {
    getStuff2(_0x1aa8bf);
  }
}
function getStuff2(_0x276d5e) {
  _0x276d5e = JSON.parse(_0x276d5e);
  Language = _0x276d5e.lang;
  LangFiles = xrRoot.xrLangFiles;
  LoadLangAll();
}
var Pop;
function setPage(_0x3a8e40) {
  Pop = false;
  if (_0x3a8e40) {
    if (_0x3a8e40 == "pop" && Page == "classic") {
      Pop = true;
      _0x3a8e40 = Page;
    }
    if ((_0x3a8e40 = activityToC("SetPage", "", _0x3a8e40)) != -999) {
      setPage2(_0x3a8e40);
    }
  }
}
function setPage2(_0x58f1b4) {
  if (Pop || _0x58f1b4 != Page) {
    Page = _0x58f1b4;
    if (_0x58f1b4 == "profile") {
      _0x58f1b4 = "actions";
    }
    activityToC("viewWillDisappear", "", "");
    switch (_0x58f1b4) {
      case "captcha":
        var _0x2b7b54 = JSON.stringify(PageJson);
        (_0x45928a = document.getElementById("appframe")).src = "/web_gear/chat/AreYouaHuman.php?m=3&j=" + _0x2b7b54;
        addClass("d-none", "Overlays");
        break;
      case "classic":
      default:
        var _0x45928a;
        (_0x45928a = document.getElementById("appframe")).onload = function (_0x24387e) {
          appframeLoaded = true;
          activityToC("webViewDidFinishLoad", "", "");
          activityToC("xatCommand", "", JSON.stringify({
            Command: "webViewDidFinishLoad"
          }));
        };
        _0x45928a.src = "activityWww/" + _0x58f1b4 + ".html";
    }
  }
}
function DoPageClick(_0x3e3aae) {
  if (typeof _0x3e3aae == "string") {
    _0x3e3aae = decodeURIComponent((_0x3e3aae + "").replace(/\+/g, "%20"));
    _0x3e3aae = JSON.parse(_0x3e3aae);
  }
  if ((PageJson = _0x3e3aae).Type != "xactivityTrace") {
    var _0x4820df = PageJson.LastActionHero;
    if (!_0x4820df) {
      _0x4820df = "";
    }
    var _0x471fda = PageJson.SavedId;
    if (!_0x471fda) {
      _0x471fda = "";
    }
    if (LastActionHero != _0x4820df || SavedId != _0x471fda) {
      activityToC("LastActionHero", LastActionHero = _0x4820df, SavedId = _0x471fda);
    }
    var _0x8ff923 = PageJson.Next;
    switch (PageJson.Command) {
      case "":
      case "NOP":
      case "HitWeb":
        break;
      case "Action":
        switch (PageJson.name) {
          case "BuyXats":
          case "MakePurchase":
            return;
        }
      default:
        activityToC("xatCommand", "", JSON.stringify(PageJson));
    }
    if (!xrClassic || _0x8ff923 == "captcha" || _0x8ff923 == "pop") {
      if (_0x8ff923 == "actions" && _0x3e3aae.UserNo) {
        classicSetDialog(_0x8ff923, _0x3e3aae.UserNo);
      } else {
        setPage(_0x8ff923);
      }
    }
  }
}
var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64ArrayBuffer(_0x5385e8) {
  var _0x3a3ce2;
  var _0x3cd060;
  var _0x28d59b;
  var _0x24f0d1;
  var _0x16bc8d = "";
  var _0x37eaf6 = new Uint8Array(_0x5385e8);
  var _0x5549fb = _0x37eaf6.byteLength;
  var _0x403efe = _0x5549fb % 3;
  var _0x6b68cb = _0x5549fb - _0x403efe;
  var _0x2fcb10 = 0;
  for (; _0x2fcb10 < _0x6b68cb; _0x2fcb10 = _0x2fcb10 + 3) {
    _0x3a3ce2 = ((_0x24f0d1 = _0x37eaf6[_0x2fcb10] << 16 | _0x37eaf6[_0x2fcb10 + 1] << 8 | _0x37eaf6[_0x2fcb10 + 2]) & 258048) >> 12;
    _0x3cd060 = (_0x24f0d1 & 4032) >> 6;
    _0x28d59b = _0x24f0d1 & 63;
    _0x16bc8d = _0x16bc8d + (encodings[(_0x24f0d1 & 16515072) >> 18] + encodings[_0x3a3ce2] + encodings[_0x3cd060] + encodings[_0x28d59b]);
  }
  if (_0x403efe == 1) {
    _0x3a3ce2 = ((_0x24f0d1 = _0x37eaf6[_0x6b68cb]) & 3) << 4;
    _0x16bc8d = _0x16bc8d + (encodings[(_0x24f0d1 & 252) >> 2] + encodings[_0x3a3ce2] + "==");
  } else if (_0x403efe == 2) {
    _0x3a3ce2 = ((_0x24f0d1 = _0x37eaf6[_0x6b68cb] << 8 | _0x37eaf6[_0x6b68cb + 1]) & 1008) >> 4;
    _0x3cd060 = (_0x24f0d1 & 15) << 2;
    _0x16bc8d = _0x16bc8d + (encodings[(_0x24f0d1 & 64512) >> 10] + encodings[_0x3a3ce2] + encodings[_0x3cd060] + "=");
  }
  return _0x16bc8d;
}
function toUTF8ArrayBuf(_0x59563e) {
  var _0x3fad09 = [];
  var _0x52f463 = 0;
  for (; _0x52f463 < _0x59563e.length; _0x52f463++) {
    var _0x2579ea = _0x59563e.charCodeAt(_0x52f463);
    if (_0x2579ea < 128) {
      _0x3fad09.push(_0x2579ea);
    } else if (_0x2579ea < 2048) {
      _0x3fad09.push(_0x2579ea >> 6 | 192, _0x2579ea & 63 | 128);
    } else if (_0x2579ea < 55296 || _0x2579ea >= 57344) {
      _0x3fad09.push(_0x2579ea >> 12 | 224, _0x2579ea >> 6 & 63 | 128, _0x2579ea & 63 | 128);
    } else {
      _0x52f463++;
      _0x2579ea = 65536 + ((_0x2579ea & 1023) << 10 | _0x59563e.charCodeAt(_0x52f463) & 1023);
      _0x3fad09.push(_0x2579ea >> 18 | 240, _0x2579ea >> 12 & 63 | 128, _0x2579ea >> 6 & 63 | 128, _0x2579ea & 63 | 128);
    }
  }
  var _0x1a794f = _0x3fad09.length;
  var _0x3d1915 = new ArrayBuffer(_0x1a794f);
  var _0x1a5437 = new Uint8Array(_0x3d1915);
  _0x52f463 = 0;
  for (; _0x52f463 < _0x1a794f; _0x52f463++) {
    _0x1a5437[_0x52f463] = _0x3fad09[_0x52f463];
  }
  return _0x3d1915;
}
function xatSend(_0x6838e7, _0x362d3f) {
  if (websocket) {
    var _0x471e38 = toUTF8ArrayBuf(_0x362d3f);
    websocket.send(_0x471e38);
  }
}
function xatClose() {
  isOpen = false;
  if (websocket) {
    xatSend(0, "<C />");
    websocket.close();
    websocket = null;
    cust_lang = null;
  }
}
function StartRadio(_0x33f56a) {
  if (xrClassic) {
    if (radio) {
      radio.play();
    }
    window.removeEventListener("mousedown", StartRadio);
    document.removeEventListener("mousedown", StartRadio);
    document.removeEventListener("touchmove", StartRadio);
  }
}
let doneRadio;
function DoFifoNotification(_0x3e0cdd) {
  var _0x53d974;
  var _0x2ab3bf = JSON.parse(_0x3e0cdd);
  var _0x3a2513 = document.getElementById("appframe").contentWindow;
  var _0x3c1656 = 0;
  for (; _0x3c1656 < _0x2ab3bf.length; _0x3c1656++) {
    if (_0x2ab3bf[_0x3c1656].charAt(0) == "{") {
      switch ((_0x53d974 = JSON.parse(_0x2ab3bf[_0x3c1656])).Command) {
        case "CustLang":
          var _0x4d4704 = {
            box: 0
          };
          cust_lang = _0x53d974;
          GotLang(_0x4d4704);
          break;
        case "SendSound":
          w_Vol = [xInt(_0x53d974[1]), xInt(_0x53d974[2]), xInt(_0x53d974[3]), xInt(_0x53d974[4])];
          w_sound = xInt(_0x53d974.w_sound);
          if (_0x3a2513.SetSpkIcon) {
            _0x3a2513.SetSpkIcon(w_sound, _0x53d974.HasRadio);
          }
          break;
        case "PlayRadio":
          if (!xrClassic) {
            break;
          }
          if (radio) {
            radio.unload();
            radio = null;
          }
          if (!_0x53d974.Radio || w_Vol[1] == 0 || (w_sound & 2) == 0) {
            break;
          }
          (radio = new Howl({
            src: [_0x53d974.Radio],
            html5: true,
            volume: w_Vol[1] / 100
          })).play();
          if (!doneRadio) {
            window.addEventListener("mousedown", StartRadio);
            document.addEventListener("mousedown", StartRadio);
            document.addEventListener("touchmove", StartRadio);
          }
          doneRadio = 1;
          break;
        case "PlaySound":
          if (_0x53d974.isGooodfriend < 1 && (w_Vol[0] == 0 || (w_sound & 1) == 0)) {
            break;
          }
          var _0x3bb5ec = "https://rxat.ro/content/sounds/" + _0x53d974.Sound;
          try {
            new Howl({
              src: [_0x3bb5ec + ".webm", _0x3bb5ec + ".mp3"],
              volume: w_Vol[0] / 100
            }).play();
          } catch (_0x35ff36) {}
          break;
        case "ToSideapp":
          if (parent) {
            parent.postMessage(JSON.stringify(_0x53d974), activityXConfig.origin);
          }
          break;
        case "setCount":
          if (setCount) {
            setCount(_0x53d974.setCount);
          }
          break;
        case "LocalNotify":
          if (!LocalNotify) {
            break;
          }
          if (!document[hidden]) {
            break;
          }
          notify.show(_0x53d974.n, _0x53d974.t);
      }
    } else {
      try {
        _0x3a2513.eval(_0x2ab3bf[_0x3c1656].toString());
      } catch (_0xdf6f96) {
        _0x2ab3bf[_0x3c1656].toString().match(/^([a-z]*)\./);
      }
    }
  }
}
var Fifo2 = [];
function DoNotify(_0x165d56, _0x44e946) {
  switch (_0x165d56) {
    case "FifoNotification":
      if (!appframeLoaded) {
        Fifo2.unshift(_0x44e946);
        return;
      }
      while (Fifo2.length) {
        DoFifoNotification(Fifo2.pop());
      }
      DoFifoNotification(_0x44e946);
      return;
    case "SetURL":
      if (!xrAndroidApp && !xrIOSApp) {
        let _0x352a9a = JSON.parse(_0x44e946);
        if (_0x352a9a && _0x352a9a[0].indexOf(activityXConfig.origin) >= 0) {
          _0x352a9a[0] += "?classic=1";
        }
        window.open(_0x352a9a[0], "_self");
      }
      return;
    case "SetGroupsPage":
      setPage("groups");
      return;
    case "SetChatsPage":
      setPage("chats");
      return;
    case "SetMePage":
      setPage("profile");
      return;
    case "SetBackPage":
      setPage("pop");
      return;
    case "SetVisitors":
      document.getElementById("appframe").contentWindow.openList(0, "visitors", 0);
      return;
  }
}
const xd = document;
function DoAlert(_0x36bcd8) {
  alert(_0x36bcd8);
}
function DoLangs(_0x41351f, _0x1d6e94) {}
const hmm = xd.body;
var LOADURL = 1;
var SEND = 2;
var CLOSE = 3;
var CONNECT = 4;
var NOTIFY = 5;
var ALERT = 6;
var HTTP = 7;
const xD = window;
var LANGS = 8;
var FINISHTRANSACTION = 9;
var LOG = 10;
var SAVESOL = 11;
var LOADSOL = 12;
var DEBUG = 13;
var ConnectIp;
var ConnectPort;
var isOpen = false;
const power = xD.location;
function FromC(_0x462999, _0x211924, _0x31ce49) {
  console.log(".FromC", _0x31ce49);
  switch (xInt(_0x462999)) {
    case DEBUG:
      break;
    case SAVESOL:
      if (typeof Storage == "undefined") {
        break;
      }
      localStorage.setItem(_0x211924, _0x31ce49);
      break;
    case LOADSOL:
      if (typeof Storage == "undefined") {
        break;
      }
      localStorage.getItem(_0x211924);
      localStorage.setItem(_0x211924, _0x31ce49);
      break;
    case LOG:
      break;
    case LOADURL:
      var _0xa26b6b = new XMLHttpRequest();
      var _0x4330f5 = _0x211924.replace("xat.com", "rxat.ro");
      _0xa26b6b.onreadystatechange = function () {
        if (_0xa26b6b.readyState === 4) {
          if (_0xa26b6b.status === 200) {
            activityToC("xatURL", _0xa26b6b.responseURL, _0xa26b6b.responseText.replaceAll("aws.rxat.ro", "fwdelb01-1365137239.us-east-1.elb.amazonaws.com").replaceAll("s.rxat.ro", "s.xat.com"));
          } else {
            console.log("LOADURL Err:" + _0xa26b6b.status);
          }
        }
      };
      if (_0x31ce49) {
        _0xa26b6b.open("POST", _0x4330f5, true);
        _0xa26b6b.setRequestHeader("Content-type", "application/x-activityWww-form-urlencoded");
        _0xa26b6b.send("json=" + _0x31ce49);
      } else {
        _0xa26b6b.open("GET", _0x4330f5, true);
        _0xa26b6b.send();
      }
      break;
    case SEND:
      xatSend(_0x211924, _0x31ce49);
      break;
    case CLOSE:
      xatClose();
      break;
    case CONNECT:
      _0x211924 = "wss://wss.rxat.ro";
      ConnectPort = xInt(_0x31ce49 = 443) + "/v2";
      xatClose();
      (websocket = new WebSocket((ConnectIp = _0x211924) + ":" + ConnectPort)).binaryType = "arraybuffer";
      websocket.onopen = function (_0x271b0c) {
        isOpen = true;
        activityToC("xatMessageReceived", "#CONNECT_OK", "");
        activityToC("xatMessageOK", "#CONNECT_CHECK", btoa(window.location.host.replace("rxat.ro", "xat.com")));
      };
      websocket.onclose = function (_0x168ac5) {
        if (_0x168ac5.code != 1000) {
          console.log("WebSocket CLOSE ERROR:" + _0x168ac5.code);
        }
        activityToC("xatMessageReceived", "#CONNECT_CLOSE", "");
        isOpen = false;
      };
      websocket.onmessage = function (_0x382640) {
        activityToC("xatMessageReceived", "#MESSAGE", base64ArrayBuffer(_0x382640.data));
      };
      websocket.onerror = function (_0x4215c3) {
        console.log("WebSocket ERROR");
      };
      break;
    case NOTIFY:
      DoNotify(_0x211924, _0x31ce49);
      break;
    case ALERT:
      DoAlert(_0x211924);
      break;
    case HTTP:
      https = "http:";
      break;
    case LANGS:
      DoLangs(_0x211924, _0x31ce49);
  }
}
function TimerMethod() {
  let _0x4f7b05 = activityToC("xatTick", "", "");
  if (_0x4f7b05 != -999) {
    while (_0x4f7b05) {
      gotJSONfromC(_0x4f7b05);
      _0x4f7b05 = activityToC("ReadToJavaFifo", "", "");
    }
  }
  if (OfflinePushToken) {
    activityToC("setToken", "", OfflinePushToken);
    OfflinePushToken = "";
  }
}
function gotJSONfromC(_0x1a5d80) {
  if (!_0x1a5d80) {
    return;
  }
  let _0x35aadc = JSON.parse(_0x1a5d80);
  var _0x336d26;
  var _0x57e6a5;
  var _0x40b17c;
  var _0x1ced57;
  if (_0x35aadc) {
    if ((_0x35aadc.Type == "1" || _0x35aadc.Type == "5" || _0x35aadc.Type == "10") && ((_0x336d26 = xrRoot) == null || (_0x57e6a5 = _0x336d26.settings) == null ? undefined : _0x57e6a5.toSave) && (_0x40b17c = xrRoot) != null && (_0x1ced57 = _0x40b17c.settings) != null) {
      _0x1ced57.doSave();
    }
    FromC(_0x35aadc.Type, _0x35aadc.Cmd, _0x35aadc.Data);
  }
}
const vby = power.host.replace("rxat.ro", "xat.com");
function xLog(_0x1ad9a2) {
  console.log(_0x1ad9a2);
}
function onBackPressed() {
  console.log("onBackPressed");
  setPage("pop");
}
function xInt(_0x5224e7) {
  _0x5224e7 = parseInt(_0x5224e7);
  if (isNaN(_0x5224e7)) {
    return 0;
  } else {
    return _0x5224e7;
  }
}
function activityToC(_0x5c8457, _0x56653e, _0x36e474) {
  // Check if Module is available and properly initialized
  if (typeof Module === "undefined" || !Module._malloc) {
    console.warn("WASM Module not available, returning fallback response");
    return _0x5c8457; // Return the first parameter as fallback
  }
  try {
    var _0x3d04c9 = (_0x5c8457.length * 2 + 1) * 2;
    var _0x4f5c5b = Module._malloc(_0x3d04c9);
    Module.stringToUTF8(_0x5c8457, _0x4f5c5b, _0x3d04c9);
    var _0x2510d3 = (_0x56653e.length * 2 + 1) * 2;
    var _0xd6b747 = Module._malloc(_0x2510d3);
    Module.stringToUTF8(_0x56653e.replaceAll("rxat.ro", "xat.com"), _0xd6b747, _0x2510d3);
    var _0x31dfcd = (_0x36e474.length * 2 + 1) * 2;
    var _0x2af5eb = Module._malloc(_0x31dfcd);
    Module.stringToUTF8(_0x36e474, _0x2af5eb, _0x31dfcd);
    var _0x15605b = Module.ccall("cToC", null, ["number", "number", "number"], [_0x4f5c5b, _0xd6b747, _0x2af5eb]);
    var _0x2e2960 = UTF8ToString(_0x15605b);
    Module._free(_0x15605b);
    return _0x2e2960;
  } catch (error) {
    console.error("WASM activityToC error:", error);
    return _0x5c8457; // Return the first parameter as fallback
  }
}
var ClassicGroup;
var LocalNotify;
function setCount(_0x4978e6) {
  var _0x1cfe52 = document.getElementById("idactcount");
  if (_0x4978e6 > 0) {
    if (_0x4978e6 > 9) {
      _0x4978e6 = "9+";
    }
    _0x1cfe52.innerText = _0x4978e6;
    _0x1cfe52.style.visibility = "visible";
  } else {
    _0x1cfe52.style.visibility = "hidden";
  }
}
function onMore(_0x2dfe65) {
  let _0x2cf2d0 = document.querySelector("#dropdown-content");
  if (_0x2cf2d0) {
    let _0x4a3411 = _0x2cf2d0.style.display == "none" || _0x2cf2d0.style.display == "";
    _0x2cf2d0.style.display = _0x4a3411 ? "block" : "none";
    if (_0x4a3411) {
      if (MyId) {
        removeClass("d-none", "sp_logout");
        removeClass("d-none", "sp_buy");
        removeClass("d-none", "sp_store");
        addClass("d-none", "sp_login");
      } else {
        addClass("d-none", "sp_logout");
        addClass("d-none", "sp_buy");
        addClass("d-none", "sp_store");
        removeClass("d-none", "sp_login");
      }
      if (currentChat == "3") {
        addClass("d-none", "sp_visitors");
      } else {
        removeClass("d-none", "sp_visitors");
      }
    }
  }
}
function anyClick(_0x46743f) {
  if (_0x46743f && _0x46743f.target.classList.contains("menuOpen")) {
    return;
  }
  let _0x3799d3 = document.querySelector("#dropdown-content");
  if (_0x3799d3 && _0x3799d3.style.display == "block") {
    _0x3799d3.style.display = "none";
  }
}
function SetClassicMode(_0x542ab2) {
  if (_0x542ab2) {
    clearDiv("Overlays");
    var _0x46f05c = document.getElementById("actionbar");
    _0x46f05c.style.height = "0%";
    _0x46f05c.style.display = "none";
    document.getElementById("app").style.height = "100%";
  }
}
function actSetPage(_0x541fc9) {
  var _0x464872;
  switch (_0x541fc9) {
    case "buy":
      window.open("/buy", "_blank");
      return;
    case "home":
      return;
    case "classic":
      if (xrAndroidApp || xrIOSApp) {
        SetClassicMode(true);
        document.getElementById("appframe").src = "activityWww/classic.html";
        setPage(_0x541fc9);
        return;
      } else {
        activityToC("xatCommand", "", JSON.stringify({
          Command: "GoWebChat"
        }));
        return;
      }
    case "profile":
      classicSetDialog("actions", 0);
      return;
    case "settings":
      classicSetDialog("settings", 0);
      return;
    case "logout":
      xrRoot.selector.DoLoginEtc("LogoutOK");
      return;
    case "login":
      xrRoot.selector.DoLoginEtc("LoginForm");
      return;
    case "install":
      if ((_0x464872 = xrPWA) != null) {
        _0x464872.PWAinstall();
      }
      return;
  }
  setFrameVis();
  setPage(_0x541fc9);
}
var hidden;
var visibilityChange;
document.addEventListener("click", anyClick, true);
var userbrowser;
var Module = {
  preRun: [],
  postRun: [jsMain],
  print: function (_0x3270cf) {
    if (arguments.length > 1) {
      _0x3270cf = Array.prototype.slice.call(arguments).join(" ");
    }
    _0x3270cf = String(_0x3270cf).replace(/\/n/g, "\n");
  },
  printErr: function (_0x19cb1c) {
    if (arguments.length > 1) {
      _0x19cb1c = Array.prototype.slice.call(arguments).join(" ");
    }
    console.error("!printErr=" + _0x19cb1c);
  },
  canvas: [],
  setStatus: function (_0x3c10c2) {
    if (arguments.length > 1) {
      _0x3c10c2 = Array.prototype.slice.call(arguments).join(" ");
    }
  },
  totalDependencies: 0,
  monitorRunDependencies: function (_0x158590) {
    this.totalDependencies = Math.max(this.totalDependencies, _0x158590);
    Module.setStatus(_0x158590 ? "Preparing... (" + (this.totalDependencies - _0x158590) + "/" + this.totalDependencies + ")" : "All downloads complete.");
  }
};
function jsMain() {
  if (parent) {
    if (!(ClassicGroup = getParameterByName("gn", parent.window.location.href))) {
      if (ClassicGroup = getParameterByName("id", parent.window.location.href)) {
        ClassicGroup = "xat" + ClassicGroup;
      }
    }
  }
  if (!ClassicGroup) {
    ClassicGroup = getParameterByName("n");
  }
  ClassicGroup = ClassicGroup ? ClassicGroup.replace(/[^0-9a-zA-Z_]/g, "") : "";
  let _0x2318a9 = getParameterByName("app", parent.window.location.href + "&" + document.location.href);
  if (_0x2318a9 & _0x2318a9 !== "0") {
    xrClassic = false;
    switch (_0x2318a9) {
      case "2":
        xrIOSApp = true;
        xrWeb = false;
        xrDevice = true;
        break;
      case "3":
        xrAndroidApp = true;
        xrWeb = false;
        xrDevice = true;
    }
  }
  if (xrClassic) {
    SetClassicMode(true);
  } else {
    document.getElementById("actionbar").style.display = "block";
    document.getElementById("Overlays").innerHTML = "<div class=\"table\" style=\"height:100%; width:100%;background-color:#F9F9F9;\">\n  <div class=\"row\" style=\"height:100%; width:100%\">\n    <div class=\"cell\" style=\"height:100%; width:100%\">\n      <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"selectorFrame\" align=\"top\" frameborder=\"0\"\n        src=\"activityWww/selector.html\"></iframe>\n      <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"actionsFrame\" align=\"top\" frameborder=\"0\"\n        src=\"activityWww/actions.html\"></iframe>\n      <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"settingsFrame\" align=\"top\" frameborder=\"0\"\n        src=\"activityWww/settings.html\"></iframe>\n    </div>\n  </div>\n</div>";
  }
  if (notify.compatible()) {
    notify.authorize();
  }
  activityMain();
}
function getParameterByName(_0x1cd697, _0x16e132) {
  try {
    var _0x5236e7;
    _0x16e132 ||= window.location.href;
    _0x1cd697 = _0x1cd697.replace(/[\[\]]/g, "$&");
    if (_0x5236e7 = new RegExp("[?&]" + _0x1cd697 + "(=([^&#]*)|&|#|$)").exec(_0x16e132)) {
      if (_0x5236e7[2]) {
        return decodeURIComponent(_0x5236e7[2].replace(/\+/g, " "));
      } else {
        return "";
      }
    } else {
      return null;
    }
  } catch (_0x4cbd6e) {
    return "";
  }
}
function a0_1x274c(_0x4f8ff0, _0x2924bf) {
  _0x4f8ff0 = _0x4f8ff0 - 147;
  var _0x4fcfea = a0_1x23ad[_0x4f8ff0];
  if (a0_1x274c.QnDPKP === undefined) {
    a0_1x274c.WkbExX = function (_0x5ae69c, _0x5aee26) {
      var _0x98a9ed;
      var _0x4eaca2;
      var _0x268b92 = [];
      var _0xb9e21b = 0;
      var _0x3edd2d = "";
      var _0x296bff = "";
      var _0x560b3f = 0;
      var _0x56171 = (_0x5ae69c = function (_0x4f80ed) {
        var _0x182a0d;
        var _0xe482f7;
        var _0x511967 = "";
        var _0x7c06cb = 0;
        var _0x3a30c2 = 0;
        for (; _0xe482f7 = _0x4f80ed.charAt(_0x3a30c2++); ~_0xe482f7 && (_0x182a0d = _0x7c06cb % 4 ? _0x182a0d * 64 + _0xe482f7 : _0xe482f7, _0x7c06cb++ % 4) ? _0x511967 = _0x511967 + String.fromCharCode(_0x182a0d >> (_0x7c06cb * -2 & 6) & 255) : 0) {
          _0xe482f7 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(_0xe482f7);
        }
        return _0x511967;
      }(_0x5ae69c)).length;
      for (; _0x560b3f < _0x56171; _0x560b3f++) {
        _0x296bff = _0x296bff + "%" + ("00" + _0x5ae69c.charCodeAt(_0x560b3f).toString(16)).slice(-2);
      }
      _0x5ae69c = decodeURIComponent(_0x296bff);
      _0x4eaca2 = 0;
      for (; _0x4eaca2 < 256; _0x4eaca2++) {
        _0x268b92[_0x4eaca2] = _0x4eaca2;
      }
      _0x4eaca2 = 0;
      for (; _0x4eaca2 < 256; _0x4eaca2++) {
        _0xb9e21b = (_0xb9e21b + _0x268b92[_0x4eaca2] + _0x5aee26.charCodeAt(_0x4eaca2 % _0x5aee26.length)) % 256;
        _0x98a9ed = _0x268b92[_0x4eaca2];
        _0x268b92[_0x4eaca2] = _0x268b92[_0xb9e21b];
        _0x268b92[_0xb9e21b] = _0x98a9ed;
      }
      _0x4eaca2 = 0;
      _0xb9e21b = 0;
      var _0x4da949 = 0;
      for (; _0x4da949 < _0x5ae69c.length; _0x4da949++) {
        _0xb9e21b = (_0xb9e21b + _0x268b92[_0x4eaca2 = (_0x4eaca2 + 1) % 256]) % 256;
        _0x98a9ed = _0x268b92[_0x4eaca2];
        _0x268b92[_0x4eaca2] = _0x268b92[_0xb9e21b];
        _0x268b92[_0xb9e21b] = _0x98a9ed;
        _0x3edd2d = _0x3edd2d + String.fromCharCode(_0x5ae69c.charCodeAt(_0x4da949) ^ _0x268b92[(_0x268b92[_0x4eaca2] + _0x268b92[_0xb9e21b]) % 256]);
      }
      return _0x3edd2d;
    };
    a0_1x274c.wkrVhu = {};
    a0_1x274c.QnDPKP = true;
  }
  var _0x31f320 = _0x4f8ff0 + a0_1x23ad[0];
  var _0x590f43 = a0_1x274c.wkrVhu[_0x31f320];
  if (_0x590f43 === undefined) {
    if (a0_1x274c.HVappu === undefined) {
      a0_1x274c.HVappu = true;
    }
    _0x4fcfea = a0_1x274c.WkbExX(_0x4fcfea, _0x2924bf);
    a0_1x274c.wkrVhu[_0x31f320] = _0x4fcfea;
  } else {
    _0x4fcfea = _0x590f43;
  }
  return _0x4fcfea;
}
function getAnchor(_0x29ec47) {
  return _0x29ec47.substring(_0x29ec47.indexOf("#") + 1);
}
function onMessage(_0x319395) {
  if (_0x319395.origin === activityXConfig.origin) {
    var _0x12adb2 = JSON.parse(_0x319395.data.replaceAll("rxat.ro", "xat.com"));
    if (_0x12adb2.action != "sideload") {
      if (_0x12adb2.action != "kissDone" && _0x12adb2.action != "kissClick") {
        if (_0x12adb2.Command != "ToSideapp") {
          activityToC("xatCommand", "", JSON.stringify({
            Command: "lcAppToChat",
            channel: _0x12adb2.channel,
            user: _0x12adb2.user,
            msg: _0x12adb2.msg
          }));
        }
      } else {
        clearDiv("kissContainer").style.display = "none";
      }
    } else if (parent) {
      parent.postMessage(_0x319395.data, activityXConfig.origin);
    }
  } else {
    activityTrace("onMessage Bad Origin=", _0x319395.origin, _0x319395);
  }
}
function handleVisibilityFocusChange() {}
function loadJsModule(_0x280b4d, _0x1c705d) {
  return new Promise(function (_0x4f8728, _0x4e28b0) {
    var _0x53aa34 = document.createElement("script");
    _0x53aa34.src = _0x280b4d;
    _0x53aa34.async = true;
    _0x53aa34.onload = function () {
      return _0x4f8728();
    };
    _0x53aa34.onerror = function () {
      var _0x121651 = "file not found: " + _0x280b4d;
      if (!_0x1c705d) {
        throw _0x121651;
      }
      _0x4e28b0(_0x121651);
    };
    document.head.appendChild(_0x53aa34);
  });
}
window.onerror = function () {
  Module.setStatus("Exception thrown, see JavaScript console");
  Module.setStatus = function (_0x2924fc) {
    if (_0x2924fc) {
      Module.printErr("[post-exception status] " + _0x2924fc);
    }
  };
};
window.onbeforeunload = function () {
  xatClose();
};
window.addEventListener("message", onMessage, false);
if (document.hidden !== undefined) {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (document.msHidden !== undefined) {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (document.webkitHidden !== undefined) {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
if (document.addEventListener === undefined || document.hidden === undefined) {
  console.log("error: no support for Page Visibility API.");
} else {
  document.addEventListener(visibilityChange, handleVisibilityFocusChange, false);
}
window.addEventListener("focus", handleVisibilityFocusChange);
window.addEventListener("blur", handleVisibilityFocusChange);
window.notify = {
  list: [],
  id: 0,
  compatible: function () {
    return typeof Notification != "undefined" || (console.error("FBM:Notifications are not available for your browser."), false);
  },
  authorize: function () {
    if (notify.compatible()) {
      Notification.requestPermission(function (_0x3797f0) {
        LocalNotify = _0x3797f0 == "granted";
      });
    }
  },
  show: function (_0x2c1251, _0x4c8a29) {
    if (LocalNotify) {
      notify.id++;
      var _0x23702 = notify.id;
      notify.list[_0x23702] = new Notification(_0x2c1251, {
        body: _0x4c8a29,
        tag: _0x23702,
        icon: "https://rxat.ro/images/planet.svg",
        lang: "",
        dir: "auto"
      });
      notify.logEvent("Notification #" + _0x23702 + " queued for display");
      notify.list[_0x23702].onclick = function () {
        notify.logEvent(_0x23702, "clicked");
      };
      notify.list[_0x23702].onshow = function () {
        notify.logEvent(_0x23702, "showed");
      };
      notify.list[_0x23702].onerror = function () {
        notify.logEvent(_0x23702, "errored");
      };
      notify.list[_0x23702].onclose = function () {
        notify.logEvent(_0x23702, "closed");
      };
    }
  },
  logEvent: function (_0x44aae9, _0x3e8006) {}
};
var browsers = ["Chrome", "Edge", "Firefox", "Safari", "OPR", "MSIE", "Trident"];
var useragent = navigator.userAgent;
var i = 0;
for (; i < browsers.length; i++) {
  if (useragent.indexOf(browsers[i]) > -1) {
    userbrowser = browsers[i];
    break;
  }
}
switch (userbrowser) {
  case "Chrome":
  case "Firefox":
  case "OPR":
    loadJsModule("activityWww/firebase.js");
}
loadJsModule("activityWww/howler.js");
window.addEventListener("orientationchange", function (_0x3fd005) {
  sendStuff(_0x3fd005.target.screen.orientation ? _0x3fd005.target.screen.orientation.angle : window.orientation);
  activityToC("xatCommand", "", JSON.stringify({
    Command: "Refresh"
  }));
});
if (window.WebAssembly) {
  loadJsModule("xatcorewasm.js", 1).then(function (_0x2f115c) {}, function (_0x15a9f7) {
    loadJsModule("xatcore.js");
  });
} else {
  loadJsModule("xatcore.js");
}
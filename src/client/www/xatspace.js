'use strict';

// Use global page variable
window.page = window.page || 'xatspace';
if (document.body) {
  document[String.raw`body`][String.raw`style`][String.raw`backgroundColor`] = String.raw`white`;
  document[String.raw`body`][String.raw`classList`][String.raw`remove`](String.raw`invisible`);
}
String[String.raw`prototype`][String.raw`hashCode`] = function () {
  var _0x1eff27 = 0;
  if (this[String.raw`length`] == 0) {
    return _0x1eff27;
  }
  for (var _0x251bb2 = 0; _0x251bb2 < this[String.raw`length`]; _0x251bb2++) {
    _0x1eff27 = (_0x1eff27 << 5) - _0x1eff27 + this[String.raw`charCodeAt`](_0x251bb2);
    _0x1eff27 &= _0x1eff27;
  }
  return _0x1eff27;
};
const _Avatars = new Avatars();
$(String.raw`#navGroup,#navxatApps`)[String.raw`addClass`](String.raw`d-none`);
Reset();
initConfig();
readUser();
setUser();
initLanguage();
initAuser3();
navClickHandlers();
startAnalytics();
setLoggedin();
legacyLinks();
localize([String.raw`chats`, String.raw`buy`]);
fetchPromo();
setLogo();
document[String.raw`addEventListener`](String.raw`DOMContentLoaded`, function () {
  initStuff();
});
var xatspacePickersList = [];
$(String.raw`#CommonDiv`)[String.raw`html`]("");
if (GET[String.raw`hash`] && GET[String.raw`params`][String.raw`length`] == 0) {
  location[String.raw`hash`] = "#" + GET[String.raw`hash`];
}
// Define xatspaceGetGET as alias to getGET from common.js
const xatspaceGetGET = getGET;
let xatspaceGet = xatspaceGetGET();
let user = xatspaceGet[String.raw`params`][String.raw`user`];
let id = xatspaceGet[String.raw`params`].id;
function DoTask(_0x14d2a6) {
  switch (_0x14d2a6) {
    case String.raw`show`:
      DoMeShow(_0x14d2a6);
      document[String.raw`title`] = function (_0x4b8354, _0x35997e) {
        return _0x4b8354 || _0x35997e;
      }(user, id) + String.raw` ixat space `;
      break;
    case String.raw`edit`:
      DoMeEditLogin(_0x14d2a6);
      $(String.raw`#outerback`)[String.raw`css`](String.raw`background`, String.raw`#fff`);
      $(String.raw`#meFrame`)[String.raw`addClass`](String.raw`d-none`);
      $(String.raw`#loading`)[String.raw`addClass`](String.raw`d-none`);
      break;
    default:
      _0x14d2a6 = String.raw`show`;
  }
  page = _0x14d2a6;
  $(String.raw`.NavTabs`)[String.raw`removeClass`](String.raw`active`);
  $(String.raw`#tab` + _0x14d2a6)[String.raw`addClass`](String.raw`active`);
}
DoTask(getRealHash());
if (String.raw`rxat.ro` == GET[String.raw`host`]) {
  DoMeEditLogin(n);
  $(String.raw`#outerback`)[String.raw`css`](String.raw`background`, String.raw`#fff`);
  $(String.raw`#meFrame`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#loading`)[String.raw`addClass`](String.raw`d-none`);
}
if (String.raw`me.rxat.ro` == GET[String.raw`host`] || GET[String.raw`path`][String.raw`includes`](String.raw`z0z`)) {
  DoMeShow(n);
}
const _instagram = {
  [String.raw`name`]: String.raw`instagram`,
  [String.raw`link`]: String.raw`https://instagram.com/`
};
const _facebook = {
  [String.raw`name`]: String.raw`facebook`,
  [String.raw`link`]: String.raw`https://facebook.com/`
};
const _twitter = {
  [String.raw`name`]: String.raw`twitter`,
  [String.raw`link`]: String.raw`https://twitter.com/`
};
const _youtube = {
  [String.raw`name`]: String.raw`youtube`,
  [String.raw`link`]: String.raw`https://youtube.com/channel/`
};
const _snapchat = {
  [String.raw`name`]: String.raw`snapchat`,
  [String.raw`link`]: String.raw`https://snapchat.com/add/`
};
const _steam = {
  [String.raw`name`]: String.raw`steam`,
  [String.raw`link`]: String.raw`https://steamcommunity.com/id/`
};
const _twitch = {
  [String.raw`name`]: String.raw`twitch`,
  [String.raw`link`]: String.raw`https://twitch.tv/`
};
const _spotify = {
  [String.raw`name`]: String.raw`spotify`,
  [String.raw`link`]: String.raw`https://open.spotify.com/user/`
};
const _pinterest = {
  [String.raw`name`]: String.raw`pinterest`,
  [String.raw`link`]: String.raw`https://pinterest.com/`
};
const _forum = {
  [String.raw`name`]: String.raw`forum`,
  [String.raw`link`]: String.raw`https://forum.rxat.ro/profile/`
};
const _group = {
  [String.raw`name`]: String.raw`group`,
  [String.raw`link`]: String.raw`https://rxat.ro/`
};
const a0_1x3098ed = {
  "0": _instagram,
  "1": _facebook,
  "2": _twitter,
  "3": _youtube,
  "4": _snapchat,
  "5": _steam,
  "6": _twitch,
  "7": _spotify,
  "8": _pinterest,
  "9": _forum,
  "10": _group
};
let socialArray = a0_1x3098ed;
function DoMeShow() {
  Reset();
  let _0x8c8a97 = $(String.raw`#show`);
  $(String.raw`.showxs`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`.showxslast`)[String.raw`addClass`](String.raw`showxslast2`);
  $(String.raw`.showxsbef`)[String.raw`addClass`](String.raw`showxsbef2`);
  $(String.raw`#outerback`)[String.raw`addClass`](String.raw`xsscroll`);
  $(String.raw`:root`)[String.raw`css`](String.raw`scrollbar-color`, String.raw`#404040 #c4c4c4`);
  $(String.raw`:root`)[String.raw`css`](String.raw`scrollbar-width`, String.raw`thin`);
  let _0x36e429;
  let _0x5b8d28;
  let _0x49b7a9 = xatspaceGetGET();
  if (GET[String.raw`path`][String.raw`includes`](String.raw`z0z`)) {
    _0x36e429 = GET[String.raw`path`][String.raw`substr`](3);
    _0x5b8d28 = GET[String.raw`path`][String.raw`substr`](3);
  } else {
    _0x36e429 = GET[String.raw`path`];
    _0x5b8d28 = GET[String.raw`path`];
  }
  document[String.raw`title`] = function (_0x18eb8f, _0x12ff5a) {
    return _0x18eb8f || _0x12ff5a;
  }(_0x36e429, _0x5b8d28) + String.raw` ixat space `;
  $(String.raw`#xsName`)[String.raw`html`](function (_0x318392, _0x1c8a1b) {
    return _0x318392 || _0x1c8a1b;
  }(_0x36e429, _0x5b8d28));
  let _0x4e3649;
  let _0x3ace69 = String.raw`https://rxat.ro/web_gear/chat/profile2.php?` + (/^\d+$/[String.raw`test`](_0x36e429) ? "i=" + _0x5b8d28 : "n=" + _0x36e429);
  if (_0x4e3649 = _0x49b7a9[String.raw`params`].cb) {
    _0x3ace69 += String.raw`&cb=` + _0x4e3649;
  }
  $[String.raw`xatspaceGetJSON`](_0x3ace69, function (_0x45cd61) {
    if (_0x45cd61[String.raw`Err`][String.raw`Bad`]) {
      location[String.raw`href`] = String.raw`https://rxat.ro`;
    }
    let _0x4fec96 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`avatar`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`avatar`][String.raw`split`]("#") : "";
    let _0x5bdf91 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`nick`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`nick`] : "";
    let _0xcc6173 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Name`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Name`] : "";
    let _0x4a3c6a = _0x45cd61[String.raw`Err`][String.raw`Media`].id ? _0x45cd61[String.raw`Err`][String.raw`Media`].id : "";
    let _0x1a4fe6 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`home`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`home`] : "";
    let _0x159175 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`aboutnew`] ? imageToWeServ(_0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`aboutnew`]) : "";
    let _0x3aaa41 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`medianew`] ? imageToWeServ(_0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`medianew`]) : "";
    let _0x1bb2e1 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Back2`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Back2`] : "";
    let _0x59104a = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Back3`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Back3`][String.raw`split`]("~") : "";
    let _0x2b7634 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`avatar2`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`avatar2`] : "";
    let _0x29d4f3 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`txtcolor`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`txtcolor`][String.raw`split`]("~") : "";
    let _0x930739 = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`xatframe`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`xatframe`][String.raw`split`]("~") : "";
    let _0x5806bf = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`custom`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`custom`][String.raw`split`]("~") : "";
    let _0x29c68f = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`social`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`social`][String.raw`split`]("~") : "";
    let _0x15baeb = document[String.raw`querySelector`](String.raw`#forumLink`);
    let _0x5b6d09 = document[String.raw`querySelector`](String.raw`#forumInner`);
    let _0x2b466f = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Married`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Married`] : "";
    let _0x56a61c = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Bff`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Bff`] : "";
    let _0x34a00c = _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Verified`] ? _0x45cd61[String.raw`Err`][String.raw`Media`][String.raw`Verified`] : "";
    let _0x4224e6 = $(String.raw`#loading`);
    let _0x1e9ee5 = _0x45cd61[String.raw`Err`][String.raw`Media`].me;
    if (function (_0x25f2bd, _0x566604) {
      return _0x25f2bd && _0x566604;
    }(!_0xcc6173, !_0x4a3c6a) || function (_0x17a89b, _0x7f869a) {
      return _0x17a89b && _0x7f869a;
    }(!_0xcc6173, _0x4a3c6a) && !_0x5bdf91) {
      _0x8c8a97[String.raw`addClass`](String.raw`d-none`);
      setTimeout(function () {
        $(String.raw`#noUser`)[String.raw`removeClass`](String.raw`d-none`);
        _0x4224e6[String.raw`addClass`](String.raw`d-none`);
      }, 1000);
    } else if (function (_0x58153b, _0x4cabae) {
      return _0x58153b && _0x4cabae;
    }(!_0xcc6173, _0x4a3c6a) && _0x5bdf91) {
      setTimeout(function () {
        _0x4224e6[String.raw`addClass`](String.raw`d-none`);
        _0x8c8a97[String.raw`removeClass`](String.raw`d-none`);
      }, 1000);
    } else if (_0x45cd61[String.raw`Err`][String.raw`Media`]) {
      setTimeout(function () {
        _0x4224e6[String.raw`addClass`](String.raw`d-none`);
        if (_0x930739 && _0x930739[1] && _0x930739[1] == 1) {
          _0x8c8a97[String.raw`addClass`](String.raw`d-none`);
        } else {
          _0x8c8a97[String.raw`removeClass`](String.raw`d-none`);
        }
      }, 1000);
    }
    _0x5bdf91 = _0x5bdf91[String.raw`replace`](/ *\([^)]*\) */g, "")[String.raw`replace`](/\((.+)$/, "")[String.raw`replace`](/[`~!@#$§%^&*()’_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ");
    if (_0x5bdf91 == "") {
      _0x5bdf91 = _0x36e429 || _0x4a3c6a[String.raw`toFixed`]();
    }
    $(String.raw`.navMe`)[String.raw`addClass`](String.raw`show`);
    if (_0x1e9ee5 == "") {
      $(String.raw`.navMe`)[String.raw`removeClass`](String.raw`show`);
      navHover();
      if (_0x930739 && _0x930739[0]) {
        $(String.raw`#meFrame`)[String.raw`attr`](String.raw`src`, _0x930739[0]);
      }
      if (_0x5806bf[0]) {
        _0x5bdf91 = _0x5806bf[0];
      }
      if (_0x5806bf[13]) {
        $(String.raw`#nickName`)[String.raw`css`](String.raw`text-shadow`, String.raw`1px 1px 10px` + _0x5806bf[13] + String.raw`, 1px 1px 10px` + _0x5806bf[13]);
      }
    }
    for (let _0x385a4e in socialArray) {
      if (_0x29c68f[_0x385a4e]) {
        let _0x25ce77 = document[String.raw`querySelector`]("#" + socialArray[_0x385a4e][String.raw`name`] + String.raw`Link`);
        if (!_0x25ce77) {
          continue;
        }
        _0x25ce77[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
        if (_0x385a4e == 5 && /^\d+$/[String.raw`test`]("" + filter(_0x29c68f[5]))) {
          socialArray[_0x385a4e][String.raw`link`] = String.raw`https://steamcommunity.com/profiles/`;
        }
        _0x25ce77[String.raw`href`] = "" + socialArray[_0x385a4e][String.raw`link`] + filter(_0x29c68f[_0x385a4e]);
        _0x25ce77[String.raw`title`] = ("" + socialArray[_0x385a4e][String.raw`name`])[String.raw`charAt`](0)[String.raw`toUpperCase`]() + ("" + socialArray[_0x385a4e][String.raw`name`])[String.raw`slice`](1);
        $(String.raw`#viewsocial`)[String.raw`removeClass`](String.raw`d-none`);
        if (_0x15baeb) {
          $(String.raw`#forumPar`)[String.raw`removeClass`](String.raw`d-none`);
          _0x5b6d09[String.raw`innerHTML`] = String.raw`ixat forum`;
          _0x15baeb[String.raw`classList`][String.raw`add`](String.raw`textcolor`);
          _0x15baeb[String.raw`title`] = "";
        }
        if (_0x385a4e == 10) {
          let _0x252e5d = "" + filter(_0x29c68f[_0x385a4e]);
          _0x25ce77[String.raw`title`] = _0x252e5d[String.raw`toLowerCase`]()[String.raw`includes`](String.raw`ixat`) ? _0x252e5d[String.raw`toLowerCase`]() : _0x252e5d[String.raw`substr`](0, 1)[String.raw`toUpperCase`]() + _0x252e5d[String.raw`substr`](1);
        }
      }
    }
    if (_0x5806bf[6] && String.raw`null` != _0x5806bf[6]) {
      $(String.raw`#setflag`)[String.raw`attr`](String.raw`src`, String.raw`https://rxat.ro/images/smw/flag/` + _0x5806bf[6] + String.raw`.png`);
      $(String.raw`#setflag`)[String.raw`removeClass`](String.raw`d-none`);
      if (_0x5806bf[15]) {
        $(String.raw`#setflag`)[String.raw`prop`](String.raw`title`, _0x5806bf[15]);
      }
    }
    _0x4fec96 = _0x2b7634 || (_0x4fec96[0] == "(" ? xConfig[String.raw`dir`] + String.raw`img/xatspace/default.png` : _0x4fec96[0]);
    try {
      new URL(_0x4fec96);
    } catch (_0x28c5ad) {
      _0x4fec96 = xConfig[String.raw`dir`] + String.raw`img/xatspace/default.png`;
    }
    const _0x2175e4 = $(String.raw`#gobig`);
    const _0x883e45 = {
      [String.raw`showTooltip`]: false,
      [String.raw`size`]: 240,
      [String.raw`hasAnimate`]: true,
      [String.raw`isXatme`]: true,
      [String.raw`isGif`]: !!_0x2b7634,
      [String.raw`className`]: String.raw`rounded-circle nosel imgcolor avamax avamob`
    };
    _0x883e45[String.raw`callback`] = _0x17bc1c => {
      const _0x2c0a3e = {
        [String.raw`backdrop`]: false
      };
      $(String.raw`.previewimg`)[String.raw`attr`](String.raw`src`, _0x17bc1c[String.raw`url`]);
      $(String.raw`#imgmodal`)[String.raw`modal`](String.raw`show`);
      $(String.raw`.modal-body`)[String.raw`css`](String.raw`padding`, "0");
      $(String.raw`#imgmodal`)[String.raw`modal`](_0x2c0a3e);
    };
    _0x2175e4[String.raw`html`]("");
    _Avatars[String.raw`MakeAvatar`](_0x2175e4[0], _0x4fec96, _0x883e45);
    if (_0x5806bf[2] && String.raw`null` !== _0x5806bf[2]) {
      $(String.raw`.textcolor`)[String.raw`css`](String.raw`font-family`, _0x5806bf[2]);
    }
    if (_0x5806bf[5] == 1) {
      $(String.raw`#about`)[String.raw`css`](String.raw`font-family`, _0x5806bf[2]);
      $(String.raw`#media`)[String.raw`css`](String.raw`font-family`, _0x5806bf[2]);
    }
    let _0x188af9 = $(String.raw`#married`);
    if (_0x2b466f) {
      _0x188af9[String.raw`removeClass`](String.raw`d-none`);
      _0x188af9[String.raw`prop`](String.raw`title`, _0x188af9[String.raw`attr`](String.raw`title`) + " " + _0x2b466f);
      $(String.raw`#marrieda`)[String.raw`prop`](String.raw`href`, String.raw`https://me.rxat.ro/` + _0x2b466f);
      if (_0x5806bf[7]) {
        _0x188af9[String.raw`css`](String.raw`background-color`, _0x5806bf[7]);
      }
    }
    let _0x1907b5 = $(String.raw`#bff`);
    if (_0x56a61c) {
      _0x1907b5[String.raw`removeClass`](String.raw`d-none`);
      _0x1907b5[String.raw`prop`](String.raw`title`, _0x1907b5[String.raw`attr`](String.raw`title`) + " " + _0x56a61c);
      $(String.raw`#bffa`)[String.raw`prop`](String.raw`href`, String.raw`https://me.rxat.ro/` + _0x56a61c);
      if (_0x5806bf[7]) {
        _0x1907b5[String.raw`css`](String.raw`background-color`, _0x5806bf[7]);
      }
    }
    if (_0x5806bf[3] == 1) {
      _0x188af9[String.raw`addClass`](String.raw`d-none`);
      _0x1907b5[String.raw`addClass`](String.raw`d-none`);
    }
    let _0x3d565d = $(String.raw`#home`);
    if (_0x1a4fe6) {
      _0x3d565d[String.raw`removeClass`](String.raw`d-none`);
      _0x3d565d[String.raw`prop`](String.raw`title`, _0x1a4fe6);
      $(String.raw`#homea`)[String.raw`prop`](String.raw`href`, _0x1a4fe6[String.raw`indexOf`](String.raw`http`) !== -1 ? _0x1a4fe6 : String.raw`https://` + _0x1a4fe6);
      if (_0x5806bf[11]) {
        _0x3d565d[String.raw`css`](String.raw`background-color`, _0x5806bf[11]);
      }
    }
    if (_0x5806bf[12] == 1) {
      _0x3d565d[String.raw`addClass`](String.raw`d-none`);
    }
    let _0x3e15bf = $(String.raw`#verified`);
    if (String.raw`Sky` == _0x34a00c) {
      _0x3e15bf[String.raw`removeClass`](String.raw`d-none`);
      $(String.raw`#verifieda`)[String.raw`prop`](String.raw`href`, String.raw`https://util.rxat.ro/verified`);
      if (_0x5806bf[9]) {
        _0x3e15bf[String.raw`css`](String.raw`background-color`, _0x5806bf[9]);
      }
    }
    let _0x2b3347 = $(String.raw`#celebrity`);
    if (String.raw`Cyan` == _0x34a00c) {
      _0x2b3347[String.raw`removeClass`](String.raw`d-none`);
      $(String.raw`#celebritya`)[String.raw`prop`](String.raw`href`, String.raw`https://util.rxat.ro/celebrity`);
      if (_0x5806bf[9]) {
        _0x2b3347[String.raw`css`](String.raw`background-color`, _0x5806bf[9]);
      }
    }
    if (_0x5806bf[8] == 1) {
      _0x3e15bf[String.raw`addClass`](String.raw`d-none`);
      _0x2b3347[String.raw`addClass`](String.raw`d-none`);
    }
    $(String.raw`#nickName`)[String.raw`html`](_0x5bdf91[String.raw`substr`](0, 30));
    $(String.raw`#idReg`)[String.raw`html`]((_0xcc6173 || function (_0x1210bc, _0x5ebbce) {
      return _0x1210bc || _0x5ebbce;
    }(_0x36e429, "")) + " (" + _0x4a3c6a + ")");
    $(String.raw`#about`)[String.raw`html`](_0x159175[String.raw`replace`](/&nbsp;/, " "));
    $(String.raw`#media`)[String.raw`html`](_0x3aaa41[String.raw`replace`](/&nbsp;/, " "));
    if (_0x1bb2e1 && _0x1bb2e1[String.raw`includes`](String.raw`http`)) {
      $(String.raw`#outerback`)[String.raw`css`](String.raw`background-image`, String.raw`url(` + SafeImage(_0x1bb2e1, null, null, true) + ")");
    } else if (_0x1bb2e1) {
      $(String.raw`#outerback`)[String.raw`css`](String.raw`background`, String.raw`transparent`);
      $(String.raw`#outerback`)[String.raw`css`](String.raw`background-color`, _0x1bb2e1);
    } else {
      $(String.raw`#outerback`)[String.raw`css`](String.raw`background`, String.raw`linear-gradient(185deg,#053d5c,#000011) fixed`);
    }
    if (_0x59104a && _0x59104a[0][String.raw`includes`](String.raw`http`)) {
      _0x8c8a97[String.raw`css`](String.raw`background-image`, String.raw`url(` + SafeImage(_0x59104a[0], null, null, true) + ")");
      _0x8c8a97[String.raw`css`](String.raw`background-repeat`, String.raw`no-repeat`);
      _0x8c8a97[String.raw`css`](String.raw`background-position`, String.raw`center`);
      _0x8c8a97[String.raw`css`](String.raw`background-size`, String.raw`cover`);
    } else {
      _0x8c8a97[String.raw`css`](String.raw`background-color`, _0x59104a[0]);
    }
    if (_0x59104a[1] && _0x59104a[1] == 1) {
      _0x8c8a97[String.raw`css`](String.raw`background-image`, String.raw`none`);
      _0x8c8a97[String.raw`css`](String.raw`background-color`, "");
    }
    if (_0x59104a[2]) {
      _0x8c8a97[String.raw`css`](String.raw`box-shadow`, String.raw`0px 0px 20px 5px` + _0x59104a[2]);
    }
    if (_0x59104a[3]) {
      $(String.raw`#avaShow`)[String.raw`css`](String.raw`box-shadow`, String.raw`0px 0px 20px 5px` + _0x59104a[3]);
    }
    $(String.raw`.textcolor`)[String.raw`css`](String.raw`color`, _0x29d4f3[0]);
    if (_0x29d4f3[2]) {
      $(String.raw`.bordercolor`)[String.raw`css`](String.raw`border`, String.raw`1px solid` + _0x29d4f3[2]);
    }
    if (_0x29d4f3[2]) {
      $(String.raw`.imgcolor`)[String.raw`css`](String.raw`border`, String.raw`2px solid` + _0x29d4f3[2]);
    }
    if (_0x29d4f3[2]) {
      $(String.raw`.hrcol`)[String.raw`css`](String.raw`border`, String.raw`1px solid` + _0x29d4f3[2]);
    }
    $(String.raw`.socials a`)[String.raw`css`](String.raw`background-color`, _0x5806bf[10]);
    $(String.raw`.xsbuttons`)[String.raw`css`](String.raw`background-color`, _0x29d4f3[6]);
    $(String.raw`.xsbuttons`)[String.raw`css`](String.raw`color`, _0x29d4f3[7]);
    if (_0x29d4f3[3] == 1) {
      $(String.raw`#about`)[String.raw`find`]("*")[String.raw`attr`](String.raw`style`, String.raw`color: ` + _0x29d4f3[0] + String.raw`!important`);
      $(String.raw`#media`)[String.raw`find`]("*")[String.raw`attr`](String.raw`style`, String.raw`color: ` + _0x29d4f3[0] + String.raw`!important`);
    }
    if (_0x29d4f3[1] && _0x29d4f3[1] == 1) {
      $(String.raw`.bordercolor`)[String.raw`css`](String.raw`border`, String.raw`none`);
    }
    if (_0x29d4f3[4] == 1) {
      $(String.raw`.xsrocket`)[String.raw`addClass`](String.raw`d-none`);
    }
    if (_0x29d4f3[5] == 1) {
      $(String.raw`.xsbuttons`)[String.raw`removeClass`](String.raw`xsbuttons`);
      $(String.raw`.butx`)[String.raw`css`](String.raw`background-color`, "");
    }
    let _0x284afc = !_0x159175 || _0x159175[String.raw`indexOf`](String.raw`<p><br></p>`) == 0 || _0x159175[String.raw`indexOf`](String.raw`<br>`) == 0;
    let _0x34692b = !_0x3aaa41 || _0x3aaa41[String.raw`indexOf`](String.raw`<p><br></p>`) == 0 || _0x3aaa41[String.raw`indexOf`](String.raw`<br>`) == 0;
    if (_0x284afc) {
      $(String.raw`#aboutParent`)[String.raw`addClass`](String.raw`d-none`);
    }
    if (_0x34692b) {
      $(String.raw`#mediaParent`)[String.raw`addClass`](String.raw`d-none`);
    }
    if (function (_0x58554a, _0x59d285) {
      return _0x58554a && _0x59d285;
    }(_0x284afc, _0x34692b) && _0x5806bf[1] != 1) {
      $(String.raw`#noInfo`)[String.raw`removeClass`](String.raw`d-none`);
    }
    if (function (_0x57e9ef, _0x2e09b0) {
      return _0x57e9ef && _0x2e09b0;
    }(_0x284afc, _0x34692b) && _0x5806bf[1] != 1) {
      $(String.raw`#noInfo`)[String.raw`removeClass`](String.raw`d-none`);
    }
    let _0x13334d = isColorLight(_0x8c8a97[String.raw`css`](String.raw`background-color`));
    $(String.raw`#noInfo`)[String.raw`css`]({
      color: _0x13334d ? String.raw`#000` : String.raw`#FFF`
    });
    if (_0x5806bf[4] == 1) {
      $(String.raw`#aboutheading`)[String.raw`addClass`](String.raw`d-none`);
    }
    if (_0x5806bf[14] == 1) {
      $(String.raw`#mediaParent`)[String.raw`addClass`](String.raw`d-none`);
    }
    let _0x292e55 = $(String.raw`.random` + new Date()[String.raw`xatspaceGetTime`]() % 4);
    if (_0x292e55) {
      _0x292e55[String.raw`removeClass`](String.raw`d-none`);
    } else {
      _0x292e55[String.raw`addClass`](String.raw`d-none`);
    }
    let _0xba5dc3 = $(String.raw`#meInapp`);
    if (_0x5bdf91) {
      _0xba5dc3[String.raw`removeClass`](String.raw`d-none`);
      _0xba5dc3[String.raw`prop`](String.raw`href`, String.raw`https://rxat.ro/report#!user&` + (_0x36e429 ? String.raw`UserName=` + _0x36e429 : String.raw`id=` + _0x5b8d28));
      _0xba5dc3[String.raw`removeAttr`](String.raw`data-toggle`);
      _0xba5dc3[String.raw`removeAttr`](String.raw`data-tarxatspaceGet`);
    }
    if (_0x36e429) {
      $(String.raw`#meEdit`)[String.raw`removeClass`](String.raw`d-none`);
      $(String.raw`#meEdit`)[String.raw`prop`](String.raw`href`, String.raw`https://rxat.ro/editme`);
    }
    $(String.raw`#aboutParent img, #aboutParent img`)[String.raw`addClass`](String.raw`img-fluid`);
    $(String.raw`iframe`)[String.raw`addClass`](String.raw`iframe-fluid`);
    if (_0x3aaa41[String.raw`includes`](String.raw`<table`)) {
      $(String.raw`#media`)[String.raw`css`](String.raw`overflow`, String.raw`auto`);
      $(String.raw`#media`)[String.raw`addClass`](String.raw`xsscroll`);
    }
    if (_0x159175[String.raw`includes`](String.raw`<table`)) {
      $(String.raw`#about`)[String.raw`css`](String.raw`overflow`, String.raw`auto`);
      $(String.raw`#about`)[String.raw`addClass`](String.raw`xsscroll`);
    }
    initToolTip();
  });
}
const a0_1x53d93b = {
  [String.raw`select`]: String.raw`#font`,
  [String.raw`showSearch`]: false,
  [String.raw`closeOnSelect`]: true
};
const a0_1x12a224 = {
  [String.raw`select`]: String.raw`#flag`,
  [String.raw`showSearch`]: true,
  [String.raw`closeOnSelect`]: true
};
var xatspaceFontSelect = null;
if (document.querySelector("#font")) {
  xatspaceFontSelect = window.xatspaceFontSelect || new SlimSelect(a0_1x53d93b);
}
let xatspaceFlagSelect = null;
if (document.querySelector("#flag")) {
  xatspaceFlagSelect = new SlimSelect(a0_1x12a224);
}
function DoMeEditLogin() {
  Reset();
  cookieBar();
  document[String.raw`title`] = String.raw`edit ixat space`;
  $(String.raw`#edit`)[String.raw`removeClass`](String.raw`d-none`);
  $(String.raw`#meLogo`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`.navMe`)[String.raw`addClass`](String.raw`show`);
  xatspaceGetGET();
  let _0x33fc1b = String.raw`https://rxat.ro/web_gear/chat/editprofile2.php`;
  let _0x201640 = $(String.raw`#meFormLogin`);
  let _0xc83bbf = $(String.raw`#loginErr`);
  let _0x4b3181 = GET[String.raw`hash`];
  let _0x281847 = $(String.raw`#meUsername`);
  if (/^\d+$/[String.raw`test`](_0x4b3181) || !_0x4b3181) {
    _0x281847[String.raw`removeClass`](String.raw`d-none`);
  } else {
    _0x281847[String.raw`addClass`](String.raw`d-none`);
    $(String.raw`.usernamecol #usernameSet`)[String.raw`html`](filter(_0x4b3181));
  }
  if (_0x4b3181 || xConfig[String.raw`username`]) {
    $(String.raw`#meView`)[String.raw`removeClass`](String.raw`d-none`);
    $(String.raw`#meView`)[String.raw`prop`](String.raw`href`, String.raw`https://me.rxat.ro/` + (xConfig[String.raw`username`] ? xConfig[String.raw`username`] : _0x4b3181));
  }
  _0x201640[String.raw`off`](String.raw`submit`)[String.raw`submit`](function (_0x3addb2) {
    _0x3addb2[String.raw`preventDefault`]();
    let _0x38ce92 = {};
    let _0x1863d6 = $(String.raw`#meUsername`)[String.raw`val`]();
    let _0x16417e = $(String.raw`#mePassword`)[String.raw`val`]();
    let _0x577dc9 = function (_0x32b10e, _0xe75e03) {
      return _0x32b10e || _0xe75e03;
    }(_0x4b3181, _0x1863d6);
    _0xc83bbf[String.raw`addClass`](String.raw`d-none`);
    _0x38ce92[String.raw`email`] = filter(_0x577dc9);
    _0x38ce92[String.raw`password`] = filter(_0x16417e);
    _0x38ce92[String.raw`SubmitPass`] = 1;
    $(document[String.raw`body`])[String.raw`css`]({
      cursor: String.raw`wait`
    });
    urlPost(_0x33fc1b, filter(_0x38ce92))[String.raw`then`](function (_0xd0b99f) {
      $(document[String.raw`body`])[String.raw`css`]({
        cursor: String.raw`default`
      });
      if (_0xd0b99f[String.raw`Err`].id) {
        let _0x108de8 = $(String.raw`#editerr`);
        let _0x18b176 = $(String.raw`#meback`);
        let _0x223479 = $(String.raw`#xatframe`);
        let _0x4d554b = $(String.raw`#meback2`);
        let _0x451589 = $(String.raw`#innershad`);
        let _0x2b3f07 = $(String.raw`#avashad`);
        let _0x26616c = $(String.raw`#txtcolor`);
        let _0x18dac6 = $(String.raw`#bordercolor`);
        let _0x521ad9 = $(String.raw`#butcolback`);
        let _0x24621d = $(String.raw`#butcoltext`);
        let _0x3b06f5 = $(String.raw`#customAvatar`);
        let _0x3d55c6 = $(String.raw`#customNick`);
        let _0x55393f = $(String.raw`#summernote`);
        let _0x38f6cd = $(String.raw`#summernote2`);
        let _0xa5db5e = $(String.raw`#TabsSubmit`);
        let _0x2b039d = $(String.raw`#noEditInfo`);
        let _0xdfdbc3 = $(String.raw`#font`);
        let _0x44561f = $(String.raw`#flag`);
        let _0x165a17 = $(String.raw`#backcolor`);
        let _0x2090e6 = $(String.raw`#backcolor2`);
        let _0x595d19 = $(String.raw`#backcolor3`);
        let _0x49e9ab = $(String.raw`#backcolor4`);
        let _0x226656 = $(String.raw`#nameglow`);
        $(String.raw`#edit`)[String.raw`addClass`](String.raw`d-none`);
        $(String.raw`#meedit`)[String.raw`removeClass`](String.raw`d-none`);
        $(String.raw`#mainNav`)[String.raw`addClass`](String.raw`d-none`);
        $(String.raw`#secondNav`)[String.raw`addClass`](String.raw`d-none`);
        enablePreview();
        let _0x47578c = _0xd0b99f[String.raw`Err`][String.raw`xatframe`] ? _0xd0b99f[String.raw`Err`][String.raw`xatframe`][String.raw`split`]("~") : "";
        let _0x5b5405 = _0xd0b99f[String.raw`Err`][String.raw`Back3`] ? _0xd0b99f[String.raw`Err`][String.raw`Back3`][String.raw`split`]("~") : "";
        let _0x8452f8 = _0xd0b99f[String.raw`Err`][String.raw`txtcolor`] ? _0xd0b99f[String.raw`Err`][String.raw`txtcolor`][String.raw`split`]("~") : "";
        let _0x309ca9 = _0xd0b99f[String.raw`Err`][String.raw`custom`] ? _0xd0b99f[String.raw`Err`][String.raw`custom`][String.raw`split`]("~") : "";
        let _0x35888a = _0xd0b99f[String.raw`Err`][String.raw`social`] ? _0xd0b99f[String.raw`Err`][String.raw`social`] : "";
        let _0x4196c3 = _0xd0b99f[String.raw`Err`][String.raw`aboutnew`] ? _0xd0b99f[String.raw`Err`][String.raw`aboutnew`] : "";
        let _0x2646a6 = _0xd0b99f[String.raw`Err`][String.raw`medianew`] ? _0xd0b99f[String.raw`Err`][String.raw`medianew`] : "";
        let _0x59f00d = _0xd0b99f[String.raw`Err`][String.raw`hasme`];
        $(String.raw`.note-editable`).on(String.raw`paste`, function (_0x2eb58b) {
          _0x2eb58b[String.raw`preventDefault`]();
          var _0x1ed298 = "";
          if (_0x2eb58b[String.raw`clipboardData`] || _0x2eb58b[String.raw`originalEvent`][String.raw`clipboardData`]) {
            _0x1ed298 = (_0x2eb58b[String.raw`originalEvent`] || _0x2eb58b)[String.raw`clipboardData`][String.raw`xatspaceGetData`](String.raw`text/plain`);
          } else if (window[String.raw`clipboardData`]) {
            _0x1ed298 = window[String.raw`clipboardData`][String.raw`xatspaceGetData`](String.raw`Text`);
          }
          _0x1ed298 = _0x1ed298[String.raw`replace`](/<[^>]*>?/gm, "");
          if (document[String.raw`queryCommandSupported`](String.raw`insertText`)) {
            document[String.raw`execCommand`](String.raw`insertText`, false, _0x1ed298);
          } else {
            document[String.raw`execCommand`](String.raw`paste`, false, _0x1ed298);
          }
          $(this)[String.raw`html`]($(this)[String.raw`html`]()[String.raw`replace`](/<div>/gi, String.raw`<br>`)[String.raw`replace`](/<\/div>/gi, ""));
        });
        if (_0x59f00d === true) {
          $(String.raw`.hasMe`)[String.raw`removeClass`](String.raw`d-none`);
          $(String.raw`#buyMe`)[String.raw`addClass`](String.raw`d-none`);
        }
        if (_0x4b3181 || xConfig[String.raw`username`]) {
          $(String.raw`#meView`)[String.raw`removeClass`](String.raw`d-none`);
          $(String.raw`#meView`)[String.raw`prop`](String.raw`href`, String.raw`https://me.rxat.ro/` + (xConfig[String.raw`username`] ? xConfig[String.raw`username`] : _0x4b3181));
        }
        if (_0x18b176) {
          _0x18b176[String.raw`val`](_0xd0b99f[String.raw`Err`][String.raw`Back2`]);
        }
        if (_0x223479) {
          _0x223479[String.raw`val`](_0x47578c[0]);
        }
        if (_0x4d554b) {
          _0x4d554b[String.raw`val`](_0x5b5405[0]);
        }
        if (_0x451589) {
          _0x451589[String.raw`val`](_0x5b5405[2]);
        }
        if (_0x2b3f07) {
          _0x2b3f07[String.raw`val`](_0x5b5405[3]);
        }
        if (_0x26616c) {
          _0x26616c[String.raw`val`](_0x8452f8[0]);
        }
        if (_0x18dac6) {
          _0x18dac6[String.raw`val`](_0x8452f8[2]);
        }
        if (_0x521ad9) {
          _0x521ad9[String.raw`val`](_0x8452f8[6]);
        }
        if (_0x24621d) {
          _0x24621d[String.raw`val`](_0x8452f8[7]);
        }
        if (_0x165a17) {
          _0x165a17[String.raw`val`](_0x309ca9[7]);
        }
        if (_0x2090e6) {
          _0x2090e6[String.raw`val`](_0x309ca9[9]);
        }
        if (_0x595d19) {
          _0x595d19[String.raw`val`](_0x309ca9[10]);
        }
        if (_0x49e9ab) {
          _0x49e9ab[String.raw`val`](_0x309ca9[11]);
        }
        if (_0x226656) {
          _0x226656[String.raw`val`](_0x309ca9[13]);
        }
        if (_0x3b06f5) {
          _0x3b06f5[String.raw`val`](_0xd0b99f[String.raw`Err`][String.raw`avatar2`]);
        }
        if (_0x3d55c6) {
          _0x3d55c6[String.raw`val`](_0x309ca9[0]);
        }
        if (_0xdfdbc3) {
          xatspaceFontSelect[String.raw`set`](_0x309ca9[2]);
        }
        if (_0x44561f) {
          xatspaceFlagSelect[String.raw`set`](_0x309ca9[6]);
        }
        if (_0x55393f) {
          _0x55393f[String.raw`summernote`](String.raw`code`, _0x4196c3[String.raw`replace`](/&nbsp;/, " ")[String.raw`replace`](/&amp;/g, "&"));
        }
        if (_0x38f6cd) {
          _0x38f6cd[String.raw`summernote`](String.raw`code`, _0x2646a6[String.raw`replace`](/&nbsp;/, " ")[String.raw`replace`](/&amp;/g, "&"));
        }
        let _0x211b62 = document[String.raw`xatspaceGetElementById`](String.raw`onlyxf`);
        let _0x2b4772 = document[String.raw`xatspaceGetElementById`](String.raw`noinner`);
        let _0x34a8c3 = document[String.raw`xatspaceGetElementById`](String.raw`noborder`);
        let _0x38e8d1 = document[String.raw`xatspaceGetElementById`](String.raw`hideDefault`);
        let _0x2ed3a8 = document[String.raw`xatspaceGetElementById`](String.raw`nomarried`);
        let _0x458fdf = document[String.raw`xatspaceGetElementById`](String.raw`hideHeading`);
        let _0x24c812 = document[String.raw`xatspaceGetElementById`](String.raw`fontall`);
        let _0x3b3f21 = document[String.raw`xatspaceGetElementById`](String.raw`colorall`);
        let _0x1eeddb = document[String.raw`xatspaceGetElementById`](String.raw`nobut`);
        let _0x1c23b7 = document[String.raw`xatspaceGetElementById`](String.raw`nobutton`);
        let _0x4b0a22 = document[String.raw`xatspaceGetElementById`](String.raw`noverified`);
        let _0x4ed078 = document[String.raw`xatspaceGetElementById`](String.raw`nohompage`);
        let _0x10fc2c = document[String.raw`xatspaceGetElementById`](String.raw`invisible`);
        if (xatspacePickersList[String.raw`length`] === 0) {
          initColorsPickers();
        }
        if (_0x47578c[1] == 1) {
          _0x211b62[String.raw`checked`] = true;
        }
        if (_0x5b5405[1] == 1) {
          _0x2b4772[String.raw`checked`] = true;
        }
        if (_0x8452f8[1] == 1) {
          _0x34a8c3[String.raw`checked`] = true;
        }
        if (_0x8452f8[3] == 1) {
          _0x3b3f21[String.raw`checked`] = true;
        }
        if (_0x8452f8[4] == 1) {
          _0x1eeddb[String.raw`checked`] = true;
        }
        if (_0x8452f8[5] == 1) {
          _0x1c23b7[String.raw`checked`] = true;
        }
        if (_0x309ca9[1] == 1) {
          _0x38e8d1[String.raw`checked`] = true;
        }
        if (_0x309ca9[3] == 1) {
          _0x2ed3a8[String.raw`checked`] = true;
        }
        if (_0x309ca9[4] == 1) {
          _0x458fdf[String.raw`checked`] = true;
        }
        if (_0x309ca9[5] == 1) {
          _0x24c812[String.raw`checked`] = true;
        }
        if (_0x309ca9[8] == 1) {
          _0x4b0a22[String.raw`checked`] = true;
        }
        if (_0x309ca9[12] == 1) {
          _0x4ed078[String.raw`checked`] = true;
        }
        if (_0x309ca9[14] == 1) {
          _0x10fc2c[String.raw`checked`] = true;
        }
        _0x35888a = _0x35888a[String.raw`split`]("~");
        _0x35888a ||= [];
        if (_0x35888a[String.raw`length`]) {
          for (let _0x41f7cb in socialArray) {
            if (_0x35888a[_0x41f7cb]) {
              let _0x40c101 = document[String.raw`querySelector`]("#" + socialArray[_0x41f7cb][String.raw`name`] + String.raw`Inp`);
              if (!_0x40c101) {
                continue;
              }
              _0x40c101[String.raw`value`] = _0x35888a[_0x41f7cb];
            }
          }
        }
        $(String.raw`#socialSave`)[String.raw`off`](String.raw`click`)[String.raw`click`](function (_0x12005a) {
          _0x12005a[String.raw`preventDefault`]();
          let _0xf57e52 = 0;
          for (let _0x252feb in socialArray) {
            let _0x4c7157 = document[String.raw`querySelector`]("#" + socialArray[_0x252feb][String.raw`name`] + String.raw`Inp`);
            if (_0x4c7157) {
              _0x35888a[_0x252feb] = filter(_0x4c7157[String.raw`value`]);
              if (_0x35888a[_0x252feb][String.raw`includes`](String.raw`http`)) {
                _0xf57e52++;
              }
            }
          }
          if (_0xf57e52 > 0) {
            doErrorMsg($(String.raw`#socialmediaerr`), String.raw`<span data-localize="chats.nourl">Please only add your username or ID, do not put the full https URL</span>`);
            $(String.raw`#socialSave`)[String.raw`removeAttr`](String.raw`data-dismiss`);
          } else {
            $(String.raw`#socialSave`)[String.raw`attr`](String.raw`data-dismiss`, String.raw`modal`);
            $(String.raw`#socialmediaerr`)[String.raw`addClass`](String.raw`d-none`);
          }
        });
        if ((_0x38f6cd[String.raw`summernote`](String.raw`code`)[String.raw`indexOf`](String.raw`<p><br></p>`) !== -1 || _0x38f6cd[String.raw`summernote`](String.raw`code`) == "") && (_0x55393f[String.raw`summernote`](String.raw`code`)[String.raw`indexOf`](String.raw`<p><br></p>`) !== -1 || _0x55393f[String.raw`summernote`](String.raw`code`) == "")) {
          _0x2b039d[String.raw`removeClass`](String.raw`d-none`);
        }
        if (_0xd0b99f[String.raw`Err`][String.raw`bff`] || _0xd0b99f[String.raw`Err`][String.raw`married`]) {
          $(String.raw`#noHideMarried`)[String.raw`removeClass`](String.raw`d-none`);
        }
        if (_0xd0b99f[String.raw`Err`][String.raw`Verified`]) {
          $(String.raw`#noVerified`)[String.raw`removeClass`](String.raw`d-none`);
        }
        initToolTip();
        let _0x4e1693 = $(String.raw`#xsimperr`);
        $(String.raw`#exportModal`);
        let _0x3ef1a9 = [String.raw`noinner`, String.raw`onlyxf`, String.raw`onlyxf`, String.raw`noborder`, String.raw`colorall`, String.raw`fontall`, String.raw`nomarried`, String.raw`noverified`, String.raw`nohompage`, String.raw`hideHeading`, String.raw`hideDefault`, String.raw`nobut`, String.raw`nobutton`, String.raw`invisible`];
        let _0x4f23e5 = $(String.raw`#filename`);
        $(String.raw`#exportok`)[String.raw`off`](String.raw`click`).on(String.raw`click`, _0x3bff5d => {
          _0x3bff5d[String.raw`preventDefault`]();
          var _0x59edce = $(String.raw`#editform input, #editform select, #iconModal input, #iconModal select, #hideHeading, #hideDefault, #invisible`)[String.raw`not`](String.raw`[type="search"]`);
          var _0x5c665e = {};
          _0x59edce[String.raw`each`](function () {
            _0x5c665e[this.id] = _0x3ef1a9[String.raw`indexOf`](this.id) >= 0 ? this[String.raw`checked`] : this[String.raw`value`];
          });
          _0x5c665e[String.raw`summernote`] = _0x55393f[String.raw`summernote`](String.raw`code`)[String.raw`replace`](/&amp;/g, "&");
          _0x5c665e[String.raw`summernote2`] = _0x38f6cd[String.raw`summernote`](String.raw`code`)[String.raw`replace`](/&amp;/g, "&");
          doDownload(encodeURIComponent(JSON[String.raw`stringify`](_0x5c665e)), (_0x4f23e5[String.raw`val`]() ? _0x4f23e5[String.raw`val`]() : xConfig[String.raw`username`]) + String.raw`.xatme`);
          doSuccessMsg(_0x4e1693, String.raw`<span data-localize="chats.expsuc">Your ixat space has been exported</span>`);
        });
        $(String.raw`#import`)[String.raw`off`](String.raw`change`).on(String.raw`change`, function (_0x3d44e0) {
          _0x3d44e0[String.raw`preventDefault`]();
          let _0x5ebce6 = $(this);
          updateFileName(_0x5ebce6);
          let _0x1ca6eb = _0x3d44e0[String.raw`tarxatspaceGet`][String.raw`files`];
          $(String.raw`#importok`)[String.raw`off`](String.raw`click`).on(String.raw`click`, function (_0x15a0d4) {
            _0x15a0d4[String.raw`preventDefault`]();
            if (_0x1ca6eb) {
              uploadFile(_0x1ca6eb[0], function (_0xf9f3e5) {
                try {
                  _0xf9f3e5 = JSON[String.raw`parse`](_0xf9f3e5);
                  for (let _0x153dc8 in _0xf9f3e5) {
                    if ([String.raw`summernote`, String.raw`summernote2`][String.raw`indexOf`](_0x153dc8) >= 0) {
                      $("#" + _0x153dc8)[String.raw`summernote`](String.raw`code`, _0xf9f3e5[_0x153dc8]);
                    } else if ([String.raw`font`, String.raw`flag`][String.raw`indexOf`](_0x153dc8) >= 0) {
                      if (String.raw`flag` == _0x153dc8) {
                        xatspaceFlagSelect[String.raw`set`](_0xf9f3e5[_0x153dc8]);
                      } else {
                        xatspaceFontSelect[String.raw`set`](_0xf9f3e5[_0x153dc8]);
                      }
                    } else if (_0x3ef1a9[String.raw`indexOf`](_0x153dc8) >= 0) {
                      $("#" + _0x153dc8)[String.raw`prop`](String.raw`checked`, _0xf9f3e5[_0x153dc8]);
                    } else {
                      $("#" + _0x153dc8)[String.raw`val`](_0xf9f3e5[_0x153dc8]);
                      $("#" + _0x153dc8)[String.raw`css`](String.raw`background-color`, String.raw`transparent`);
                      $("#" + _0x153dc8)[String.raw`css`](String.raw`color`, String.raw`inherit`);
                    }
                  }
                  doSuccessMsg(_0x4e1693, String.raw`<span data-localize="chats.impsuc">Your ixat space has been imported</span>`);
                  initColorsPickers();
                } catch (_0x4fc8fc) {
                  doErrorMsg(_0x4e1693, String.raw`<span data-localize="chats.gpimpemp">Selected file is empty or invalid</span>`);
                }
              });
            }
            updateFileName(_0x5ebce6, true);
          });
        });
        _0xa5db5e[String.raw`off`](String.raw`click`).on(String.raw`click`, _0x26d388 => {
          _0x26d388[String.raw`preventDefault`]();
          $(document[String.raw`body`])[String.raw`css`]({
            cursor: String.raw`default`
          });
          let _0x1acd3a = {};
          let _0x1ea883 = _0x18b176[String.raw`val`]();
          let _0x1b386c = _0x223479[String.raw`val`]();
          let _0x74fbf2 = _0x4d554b[String.raw`val`]();
          let _0x354d8a = _0x451589[String.raw`val`]();
          let _0x5d2328 = _0x2b3f07[String.raw`val`]();
          let _0x56dda0 = _0x26616c[String.raw`val`]();
          let _0x40b934 = _0x3b06f5[String.raw`val`]();
          let _0x17bb5a = _0x3d55c6[String.raw`val`]();
          let _0x204208 = _0xdfdbc3[String.raw`val`]();
          let _0x367224 = _0x44561f[String.raw`val`]();
          let _0x23c462 = $(String.raw`#flag :selected`)[String.raw`text`]();
          let _0x2ba474 = _0x18dac6[String.raw`val`]();
          let _0x17f36f = _0x521ad9[String.raw`val`]();
          let _0x37e1fe = _0x24621d[String.raw`val`]();
          let _0x4d5b5d = _0x165a17[String.raw`val`]();
          let _0x2b0faa = _0x2090e6[String.raw`val`]();
          let _0x57b925 = _0x595d19[String.raw`val`]();
          let _0x483a79 = _0x49e9ab[String.raw`val`]();
          let _0x2dbd14 = _0x226656[String.raw`val`]();
          let _0x17e010 = _0x55393f[String.raw`summernote`](String.raw`code`)[String.raw`replace`](/&amp;/g, "&");
          let _0xf43eb4 = _0x38f6cd[String.raw`summernote`](String.raw`code`)[String.raw`replace`](/&amp;/g, "&");
          _0x1b386c += "~" + (_0x211b62[String.raw`checked`] ? "1" : "0");
          _0x74fbf2 += "~" + (_0x2b4772[String.raw`checked`] ? "1" : "0");
          _0x74fbf2 += "~" + _0x354d8a;
          _0x74fbf2 += "~" + _0x5d2328;
          _0x56dda0 += "~" + (_0x34a8c3[String.raw`checked`] ? "1" : "0");
          _0x56dda0 += "~" + _0x2ba474;
          _0x56dda0 += "~" + (_0x3b3f21[String.raw`checked`] ? "1" : "0");
          _0x56dda0 += "~" + (_0x1eeddb[String.raw`checked`] ? "1" : "0");
          _0x56dda0 += "~" + (_0x1c23b7[String.raw`checked`] ? "1" : "0");
          _0x56dda0 += "~" + _0x17f36f;
          _0x56dda0 += "~" + _0x37e1fe;
          _0x17bb5a += "~" + (hideDefault[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + _0x204208;
          _0x17bb5a += "~" + (_0x2ed3a8[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + (_0x458fdf[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + (_0x24c812[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + _0x367224;
          _0x17bb5a += "~" + _0x4d5b5d;
          _0x17bb5a += "~" + (_0x4b0a22[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + _0x2b0faa;
          _0x17bb5a += "~" + _0x57b925;
          _0x17bb5a += "~" + _0x483a79;
          _0x17bb5a += "~" + (_0x4ed078[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + _0x2dbd14;
          _0x17bb5a += "~" + (_0x10fc2c[String.raw`checked`] ? "1" : "0");
          _0x17bb5a += "~" + _0x23c462;
          if (!_0x40b934[String.raw`includes`](String.raw`http`) && _0x40b934[String.raw`length`]) {
            doErrorMsg(_0x108de8, String.raw`<span data-localize="chats.useurl">Custom avatar must be an image url</span>`);
            document[String.raw`body`][String.raw`scrollIntoView`]({
              behavior: String.raw`smooth`,
              block: String.raw`start`
            });
            return;
          }
          _0x1acd3a.id = _0xd0b99f[String.raw`Err`].id;
          _0x1acd3a[String.raw`name`] = _0xd0b99f[String.raw`Err`][String.raw`name`];
          _0x1acd3a[String.raw`Token`] = _0xd0b99f[String.raw`Err`][String.raw`Token`];
          _0x1acd3a[String.raw`Back2`] = filter(_0x1ea883);
          _0x1acd3a[String.raw`xatframe`] = filter(_0x1b386c);
          _0x1acd3a[String.raw`Back3`] = filter(_0x74fbf2);
          _0x1acd3a[String.raw`txtcolor`] = filter(_0x56dda0);
          _0x1acd3a[String.raw`social`] = _0x35888a[String.raw`join`]("~");
          _0x1acd3a[String.raw`avatar2`] = filter(_0x40b934);
          _0x1acd3a[String.raw`custom`] = filter(_0x17bb5a);
          _0x1acd3a[String.raw`aboutnew`] = _0x17e010;
          _0x1acd3a[String.raw`medianew`] = _0xf43eb4;
          _0x1acd3a[String.raw`submit1`] = 1;
          urlPost(_0x33fc1b, _0x1acd3a)[String.raw`then`](function (_0x1305f9) {
            $(document[String.raw`body`])[String.raw`css`]({
              cursor: String.raw`default`
            });
            if (String.raw`SaveOK` == _0x1305f9[String.raw`Err`][String.raw`editprofile2`]) {
              doSuccessMsg(_0x108de8, String.raw`<span data-localize="chats.xsupdated">Your ixat space has been updated.</span>`);
            } else {
              doErrorMsg(_0x108de8, _0x1305f9[String.raw`Err`][String.raw`editprofile2`]);
            }
            document[String.raw`body`][String.raw`scrollIntoView`]({
              behavior: String.raw`smooth`,
              block: String.raw`start`
            });
          });
        });
      } else {
        doErrorMsg(_0xc83bbf, _0xd0b99f[String.raw`Err`][String.raw`editprofile2`]);
      }
    });
  });
}
function initColorsPickers() {
  const _0x2571e5 = {
    [String.raw`save`]: true,
    [String.raw`input`]: true
  };
  const _0x5c118f = {
    [String.raw`palette`]: true,
    [String.raw`preview`]: true,
    [String.raw`opacity`]: true,
    [String.raw`hue`]: true,
    [String.raw`interaction`]: _0x2571e5
  };
  const _0x18a3ef = {
    [String.raw`theme`]: String.raw`nano`,
    [String.raw`useAsButton`]: true,
    [String.raw`closeOnScroll`]: false,
    [String.raw`swatches`]: null,
    [String.raw`lockOpacity`]: false,
    [String.raw`components`]: _0x5c118f
  };
  let _0x54adbb = _0x18a3ef;
  for (let _0x4d955a = 0; _0x4d955a <= 20; _0x4d955a++) {
    _0x54adbb.el = String.raw`#button` + _0x4d955a;
    if ($(String.raw`#button` + _0x4d955a)[String.raw`length`]) {
      xatspacePickersList[_0x4d955a] = Pickr[String.raw`create`](_0x54adbb);
      xatspacePickersList[_0x4d955a].id = String.raw`button` + _0x4d955a;
      let _0x23775c = xatspaceGetIDFromButton(xatspacePickersList[_0x4d955a].id);
      if (_0x23775c) {
        let _0x28f760 = $("#" + _0x23775c);
        if (_0x28f760) {
          let _0x497658 = _0x28f760[String.raw`val`]();
          if (_0x497658[String.raw`charAt`](0) == "#" && _0x497658[String.raw`length`] == 7) {
            let _0x378161 = isColorLight(_0x497658);
            const _0x4d7e6b = {
              [String.raw`background-color`]: _0x497658,
              [String.raw`color`]: _0x378161 ? String.raw`#000` : String.raw`#FFF`
            };
            _0x28f760[String.raw`css`](_0x4d7e6b);
          }
          _0x28f760[String.raw`off`](String.raw`keyup`).on(String.raw`keyup`, function () {
            let _0x2fe9c0 = $(this)[String.raw`val`]();
            if (_0x2fe9c0[String.raw`charAt`](0) !== "#" || _0x2fe9c0[String.raw`charAt`](0) == "#" && _0x2fe9c0[String.raw`length`] !== 7) {
              _0x28f760[String.raw`css`]({
                "background-color": "",
                color: String.raw`#001`
              });
            } else {
              let _0xf3bb67 = isColorLight(_0x2fe9c0);
              const _0x5b7afd = {
                [String.raw`background-color`]: _0x2fe9c0,
                [String.raw`color`]: _0xf3bb67 ? String.raw`#000` : String.raw`#FFF`
              };
              _0x28f760[String.raw`css`](_0x5b7afd);
            }
          });
        }
      }
      xatspacePickersList[_0x4d955a].on(String.raw`save`, (_0xd499bb, _0x2a27b6) => {
        if (_0x23775c) {
          let _0x5cee2e = $("#" + _0x23775c);
          let _0x320d7a = _0xd499bb[String.raw`toHEXA`]()[String.raw`toString`]();
          let _0x4f85c2 = isColorLight(_0x320d7a);
          const _0x3a6d74 = {
            [String.raw`background-color`]: _0x320d7a,
            [String.raw`color`]: _0x4f85c2 ? String.raw`#000` : String.raw`#FFF`
          };
          _0x5cee2e[String.raw`css`](_0x3a6d74);
          _0x5cee2e[String.raw`val`](_0x320d7a);
        }
      });
      xatspacePickersList[_0x4d955a].on(String.raw`show`, (_0x2b77c8, _0x42ffb8) => {
        if (_0x23775c) {
          let _0x4733c9 = $("#" + _0x23775c);
          if (_0x4733c9[String.raw`prop`](String.raw`disabled`)) {
            xatspacePickersList[_0x4d955a][String.raw`hide`]();
            return;
          }
          xatspacePickersList[_0x4d955a][String.raw`setColor`](_0x4733c9[String.raw`val`]());
        }
      });
    }
  }
}
function xatspaceGetIDFromButton(_0x17baa6) {
  if (!_0x17baa6) {
    return false;
  }
  switch (_0x17baa6) {
    case String.raw`button0`:
      return String.raw`meback`;
    case String.raw`button1`:
      return String.raw`meback2`;
    case String.raw`button2`:
      return String.raw`txtcolor`;
    case String.raw`button3`:
      return String.raw`bordercolor`;
    case String.raw`button4`:
      return String.raw`backcolor`;
    case String.raw`button5`:
      return String.raw`backcolor2`;
    case String.raw`button6`:
      return String.raw`backcolor3`;
    case String.raw`button7`:
      return String.raw`butcolback`;
    case String.raw`button8`:
      return String.raw`butcoltext`;
    case String.raw`button9`:
      return String.raw`backcolor4`;
    case String.raw`button10`:
      return String.raw`innershad`;
    case String.raw`button11`:
      return String.raw`avashad`;
    case String.raw`button12`:
      return String.raw`nameglow`;
  }
}
function initStuff() {
  $(String.raw`a.btn`).on(String.raw`click`, function (_0x1dfa30) {
    _0x1dfa30[String.raw`preventDefault`]();
  });
  document[String.raw`querySelectorAll`](String.raw`.PassReveal`)[String.raw`forEach`](_0x7b1c17 => {
    _0x7b1c17[String.raw`addEventListener`](String.raw`click`, _0x3f1141 => {
      PassReveal($(_0x3f1141[String.raw`tarxatspaceGet`]));
    });
  });
  handlePopover();
}
const a0_1x617ac5 = {
  [String.raw`height`]: 200,
  [String.raw`minHeight`]: 100,
  [String.raw`maxHeight`]: 700,
  [String.raw`disableDragAndDrop`]: true,
  [String.raw`toolbar`]: [[String.raw`font`, [String.raw`bold`, String.raw`underline`, String.raw`italic`, String.raw`clear`]], [String.raw`fontname`, [String.raw`fontname`, String.raw`fontsize`]], [String.raw`color`, [String.raw`color`]], [String.raw`para`, ["ul", "ol", String.raw`paragraph`]], [String.raw`insert`, [String.raw`link`, String.raw`picture`]], [String.raw`view`, [String.raw`codeview`]]]
};
const a0_1x423899 = {
  [String.raw`height`]: 200,
  [String.raw`minHeight`]: 100,
  [String.raw`maxHeight`]: 700,
  [String.raw`disableDragAndDrop`]: true,
  [String.raw`toolbar`]: [[String.raw`font`, [String.raw`bold`, String.raw`underline`, String.raw`italic`, String.raw`clear`]], [String.raw`fontname`, [String.raw`fontname`, String.raw`fontsize`]], [String.raw`color`, [String.raw`color`]], [String.raw`para`, ["ul", "ol", String.raw`paragraph`]], [String.raw`insert`, [String.raw`link`, String.raw`picture`]], [String.raw`view`, [String.raw`codeview`]]]
};
$(String.raw`#summernote`)[String.raw`summernote`](a0_1x617ac5);
$(String.raw`#summernote2`)[String.raw`summernote`](a0_1x423899);
var imageUploadDiv = $(String.raw`div.note-group-select-from-files`);
if (imageUploadDiv[String.raw`length`]) {
  imageUploadDiv[String.raw`remove`]();
}
var imageUrlDiv = $(String.raw`div.note-group-image-url`);
function navHover() {
  $(String.raw`#meLogo`)[String.raw`hover`](function () {
    $(String.raw`.navMe`)[String.raw`fadeIn`]();
  });
  $(String.raw`.navMe`)[String.raw`hover`](function () {
    $(this)[String.raw`addClass`](String.raw`show`);
    if (isMobile) {
      setTimeout(function () {
        $(String.raw`.navbar-brand`)[String.raw`attr`](String.raw`href`, String.raw`https://rxat.ro`);
      }, 2000);
    } else {
      $(String.raw`.navbar-brand`)[String.raw`attr`](String.raw`href`, String.raw`https://rxat.ro`);
    }
  }, function () {
    $(this)[String.raw`removeClass`](String.raw`show`)[String.raw`fadeOut`]();
    $(String.raw`.navbar-brand`)[String.raw`removeAttr`](String.raw`href`);
  });
}
function enablePreview() {
  $(String.raw`#TabsPreview`)[String.raw`off`](String.raw`click`).on(String.raw`click`, function (_0x37d3eb) {
    _0x37d3eb[String.raw`preventDefault`]();
    window[String.raw`open`](String.raw`https://me.rxat.ro/` + (xConfig[String.raw`username`] ? xConfig[String.raw`username`] : GET[String.raw`hash`]) + String.raw`?&preview=true&cb=` + Math[String.raw`floor`](Date[String.raw`now`]() / 1000), String.raw`preview`, String.raw`toolbar=1,resizable=1,scrollbars=1`);
  });
}
function imageToWeServ(_0x379a2b) {
  return _0x379a2b[String.raw`replace`](/(<img[^]+?src=")(?!http:\/\/)(.*?)"/gi, String.raw`$1https://rxat.ro/web_gear/chat/GetImage7.php?s&g&U=$2"`);
}
if (imageUrlDiv[String.raw`length`]) {
  imageUrlDiv[String.raw`append`](String.raw`<div class='mt-2'><a href='https://util.rxat.ro/Images' tarxatspaceGet='_blank' class='nodeco'><span data-localize='chats.permittedimg'>See permitted image providers</span>.</a></div>`);
}
$(String.raw`.note-color button.dropdown-toggle`)[String.raw`html`](String.raw`<i class="note-icon-caret"></i>`);
$(String.raw`.note-editable.card-block`)[String.raw`css`](String.raw`background-color`, String.raw`#999999`);
$(String.raw`.noread`)[String.raw`attr`](String.raw`readonly`, true);
$(String.raw`.noread`)[String.raw`css`](String.raw`background-color`, String.raw`white`);
$(String.raw`.noread`)[String.raw`click`](function () {
  $(String.raw`.noread`)[String.raw`attr`](String.raw`readonly`, false);
});
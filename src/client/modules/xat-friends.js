'use strict';

let menuState = 0;
let textRange = null;
let textSelection = null;
const mkTools = document.querySelector("#mkTools");
const textEntry = document.getElementById("textEntryEditable");
var _Activity;
function addMarkDown(_0x4c9c5f, _0x741087, _0x3373bf) {
  let _0x221d8b = textEntry.innerText;
  switch (_0x4c9c5f) {
    case "b":
      _0x221d8b = _0x741087.slice(0, 2) == "*" && _0x741087.slice(-2) == "*" ? _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), _0x741087.slice(2, _0x741087.length - 2)) : _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), "*" + _0x741087 + "*");
      textEntry.innerText = _0x221d8b.replace(/nbsp;/gi, " ");
      break;
    case "i":
      _0x221d8b = _0x741087.slice(0, 1) == "_" && _0x741087.slice(-1) == "_" ? _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), _0x741087.slice(1, _0x741087.length - 1)) : _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), "_" + _0x741087 + "_");
      textEntry.innerText = _0x221d8b.replace(/nbsp;/gi, " ");
      break;
    case "u":
      _0x221d8b = _0x741087.slice(0, 1) == "~" && _0x741087.slice(-1) == "~" ? _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), _0x741087.slice(1, _0x741087.length - 1)) : _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), "~" + _0x741087 + "~");
      textEntry.innerText = _0x221d8b.replace(/nbsp;/gi, " ");
      break;
    case "q":
      _0x221d8b = _0x741087.slice(0, 2) == ">[" && _0x741087.slice(-1) == "]" ? _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset + 4), _0x741087.slice(2, _0x741087.length - 1)) : _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), ">[" + _0x741087 + "]");
      textEntry.innerText = cleanXatTagsIcons(_0x221d8b.replace(/nbsp;/gi, " "));
      break;
    case "link":
      _0x221d8b = _0x221d8b.replace(_0x221d8b.slice(_0x3373bf.startOffset, _0x3373bf.endOffset), "[" + _0x741087 + "]()");
      textEntry.innerHTML = _0x221d8b.replace(/nbsp;/gi, " ");
  }
}
function toggleMenu(_0xe1509b) {
  if (menuState !== 1 && _0xe1509b) {
    menuState = 1;
    mkTools.classList.add("active");
  } else if (menuState !== 0 && !_0xe1509b) {
    menuState = 0;
    mkTools.classList.remove("active");
  }
}
function positionMenu(_0x51cada) {
  const _0xa8afd2 = getPosition(_0x51cada);
  const _0x308b9a = mkTools.offsetWidth;
  const _0x1ffbff = mkTools.offsetHeight;
  const _0x39afc8 = Math.max(_0xa8afd2.x - _0x308b9a / 2, 10);
  const _0x35be22 = textEntry.offsetTop - _0x1ffbff - 5;
  const _0x1c8ca6 = window.innerWidth;
  const _0x2337dc = window.innerHeight;
  mkTools.style.left = _0x1c8ca6 - _0x39afc8 < _0x308b9a ? _0x1c8ca6 - _0x308b9a + "px" : _0x39afc8 + "px";
  mkTools.style.top = _0x2337dc - _0x35be22 < _0x1ffbff ? _0x2337dc - _0x1ffbff + "px" : _0x35be22 + "px";
}
function getPosition(_0xbd25cf) {
  let _0xb1bd17 = 0;
  let _0x4b08a2 = 0;
  _0xbd25cf ||= window.event;
  if (_0xbd25cf.pageX || _0xbd25cf.pageY) {
    _0xb1bd17 = _0xbd25cf.pageX;
    _0x4b08a2 = _0xbd25cf.pageY;
  } else if (_0xbd25cf.clientX || _0xbd25cf.clientY) {
    _0xb1bd17 = _0xbd25cf.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    _0x4b08a2 = _0xbd25cf.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return {
    x: _0xb1bd17,
    y: _0x4b08a2
  };
}
setStuffAndListener();
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : {};
}
const mkButtons = document.querySelectorAll("[data-mk]");
mkButtons.forEach(_0x16963e => {
  switch (_0x16963e.dataset.mk) {
    case "b":
      addToolTip(_0x16963e, ["mob2.bold", "Bold"], {
        position: "low"
      });
      break;
    case "i":
      addToolTip(_0x16963e, ["mob2.italic", "Italic"], {
        position: "low"
      });
      break;
    case "u":
      addToolTip(_0x16963e, ["mob2.strike", "Strikethrough"], {
        position: "low"
      });
      break;
    case "q":
      addToolTip(_0x16963e, ["mob2.quote", "Quote"], {
        position: "low"
      });
      break;
    case "link":
      addToolTip(_0x16963e, ["mob2.link", "Link"], {
        position: "low"
      });
  }
  _0x16963e.addEventListener("click", () => {
    if (textRange && textSelection) {
      addMarkDown(_0x16963e.dataset.mk, textSelection, textRange);
    }
  });
});
let pressed = !1;
function addToTextEntry(_0x3334d3, _0x33762b = false) {
  if (typeof messages != "undefined" && messages.activeEditMessageNode) {
    const _0x1d18f7 = messages.activeEditMessageNode;
    if (_0x33762b) {
      placeCaretAtEnd(_0x1d18f7);
    } else {
      _0x1d18f7.focus();
      placeCaretAt(textEntryCaretPos, _0x1d18f7.childNodes[0]);
    }
    pasteHtmlAtCaret(_0x3334d3);
    textEntryCaretPos = getCaretWithin(_0x1d18f7.childNodes[0]);
    return;
  }
  pasteHtmlAtCaret(_0x3334d3);
  textEntryCaretPos = getCaretWithin(textEntry);
}
var totTabWidth;
var TabHeight;
var MainOwner;
var lastGroup;
var lastCurrentChat;
var BuddyOff;
var gotClearChats;
function classicSetHeight(_0x2a46c4) {
  if (butsFrame) {
    var _0x15e7d6 = {
      mh: _0x2a46c4 + 300
    };
    if (actions.getMe()) {
      _0x15e7d6.mw = 900;
    }
    _0x15e7d6.customHeight = actions.checkIfButtons();
    posModal(butsFrame, _0x15e7d6);
    butsFrame.style.visibility = "visible";
  }
}
function resizeTabs(_0x50f9f5) {
  _0x50f9f5 ||= document.getElementById("chattabs");
  removeById("PadCell");
  var _0x1ca56a;
  var _0x1565c1;
  for (var _0x43c433 = _0x50f9f5.childNodes, _0x992bc = [], _0x34e38f = 0, _0x386477 = 0, _0x417875 = 0, _0x5f1d4a = 0; _0x43c433[_0x34e38f];) {
    if (_0x43c433[_0x34e38f].but && _0x43c433[_0x34e38f].but.active && _0x386477 < 1) {
      _0x386477++;
      _0x992bc[_0x34e38f] = 1;
    }
    if (_0x43c433[_0x34e38f].but.id == 10) {
      _0x992bc[_0x34e38f] = 2;
    }
    _0x34e38f++;
  }
  var _0x31c8da = totTabWidth;
  if (_0x31c8da > 130) {
    _0x31c8da = 130;
  }
  var _0x20c833 = xInt((totTabWidth - _0x31c8da) / (_0x34e38f > 1 ? _0x34e38f - 1 : 1));
  if (_0x20c833 > _0x31c8da) {
    _0x20c833 = _0x31c8da;
  }
  _0x417875 = 0;
  for (; _0x417875 < _0x34e38f; _0x417875++) {
    _0x1ca56a = _0x20c833;
    if (_0x992bc[_0x417875] == 1) {
      _0x1ca56a = _0x31c8da;
    }
    if (_0x992bc[_0x417875] == 2) {
      _0x1ca56a = 27;
    }
    _0x1ca56a = xInt(_0x1ca56a);
    _0x1565c1 = "height:" + Math.max(TabHeight, 24) + "px; width:" + _0x1ca56a + "px";
    if (typeof _0x43c433[_0x417875] == "object") {
      try {
        _0x43c433[_0x417875].style.cssText = _0x1565c1;
      } catch (_0x49c928) {}
      _0x43c433[_0x417875].but.style.cssText = _0x1565c1;
      _0x5f1d4a += _0x1ca56a;
    }
  }
  if (_0x5f1d4a < totTabWidth && totTabWidth - _0x5f1d4a > 1) {
    (_0x417875 = makeElement(_0x50f9f5, "div", "cell", "PadCell")).style.cssText = "width:" + (totTabWidth - _0x5f1d4a) + "px";
  }
}
function addChatTab(_0x5f57ad, _0x5a1569, _0x2b1786, _0x42d9ce, _0x184f5a, _0x4c35b7, _0x5b03fa, _0x417a1c, _0x4585cd) {
  var _0x3cc445;
  var _0x519d2f = document.getElementById("chattabs");
  var _0x1143f2 = _0x417a1c;
  let _0x598c55 = _0x2b1786 == "10";
  let _0x15d71b = _0x42d9ce;
  if (!_0x4585cd && !_0x598c55) {
    _0x15d71b = _0x15d71b.substr(0, 10);
  }
  if (!_0x1143f2) {
    removeById("PadCell");
    if (_0x519d2f.childElementCount >= 11) {
      if (!_0x184f5a) {
        resizeTabs(_0x519d2f);
        return;
      }
      _0x519d2f.removeChild(_0x519d2f.lastChild);
    }
    (_0x4061e6 = makeElement(_0x519d2f, "div", "cell")).style.cssText = "width:0px";
    _0x3cc445 = makeElement(_0x4061e6, "div", "chatdel");
    _0x1143f2 = makeElement(_0x4061e6, "button");
    _0x4061e6.DelDiv = _0x3cc445;
    _0x4061e6.but = _0x1143f2;
    _0x1143f2.style.cssText = "width:0px";
    _0x1143f2.active = _0x184f5a;
    _0x1143f2.id = _0x2b1786;
  }
  while (_0x1143f2.firstChild) {
    _0x1143f2.removeChild(_0x1143f2.firstChild);
  }
  _0x1143f2.id = _0x2b1786;
  _0x1143f2.lit = _0x4c35b7;
  _0x1143f2.active = _0x184f5a;
  _0x1143f2.del = _0x5b03fa;
  if (_0x15d71b || _0x1143f2.chatName == null) {
    _0x1143f2.chatName = _0x15d71b;
  }
  if (_0x5a1569) {
    _0x1143f2.chatid = _0x5a1569;
  }
  _0x1143f2.className = "chatlinks";
  if (_0x184f5a) {
    _0x1143f2.className += " active";
  }
  _0x1143f2.onclick = function (_0x229f8b) {
    messages.toggleMsgMenu(!1);
    sendApp(_0x229f8b, _0x2b1786, _0x1143f2.chatid, 0, _0x1143f2.chatName);
    lightChat(_0x2b1786, !0, !1);
    if (_0x1143f2.chatid == 10) {
      _Activity.instance.clickedTickleTab = true;
      clearDiv("idvisitors");
    } else {
      _Activity.instance.clickedTickleTab = false;
    }
  };
  resizeTabs(_0x519d2f);
  var _0x134531 = makeElement(_0x1143f2, "div");
  var _0x49ad28 = makeElement(_0x134531, "div");
  var _0x381da2 = makeElement(_0x49ad28, "div");
  var _0x6568ad = makeElement(_0x381da2, "div", "svgBack");
  _0x49ad28.style.cssText = "display: flex; align-items: center; justify-content: flex-start;";
  let _0x3a32b3 = "bubble";
  if (_0x598c55) {
    _0x3a32b3 = "notif";
  }
  if (!_0x4c35b7) {
    _0x3a32b3 += 2;
  }
  let _0x2e1843 = Browser && Browser == "MS" ? "width:1.3rem;height:1.2rem" : "width:1.4rem;height:1.4rem";
  _0x6568ad.style.cssText = "text-align:center; " + _0x2e1843 + "; background-image: url(svg/" + _0x3a32b3 + ".svg)";
  _0x1143f2.count = makeElement(_0x6568ad, "span");
  let _0x3a6ce3 = _0x598c55 ? 1.1 : 1.3;
  if (hasDarkMode()) {
    _0x1143f2.count.style.cssText = "font-size:0.7rem; color:#000; line-height: " + _0x3a6ce3 + "rem;";
  } else {
    _0x1143f2.count.style.cssText = "font-size:0.7rem; line-height: " + _0x3a6ce3 + "rem;";
  }
  if (_0x4c35b7) {
    changeText(_0x1143f2.count, 1);
  }
  var _0x3023dd = makeElement(_0x49ad28, "div");
  _0x3023dd.style.cssText = "padding-left: 0.2rem;";
  if (_0x5b03fa && _0x3cc445) {
    _0x42d9ce = _0x42d9ce.replace(/_/g, " ");
    _0x15d71b = _0x15d71b.replace(/_/g, " ");
  }
  addToolTip(_0x1143f2, _0x42d9ce, {
    position: "low"
  });
  addText(_0x3023dd, " " + _0x15d71b + " ");
  if (_0x5b03fa && _0x3cc445 && !_0x598c55) {
    let _0x5801ba = hasDarkMode() ? " darkDel" : "";
    makeElement(_0x3cc445, "div", "svgBack" + _0x5801ba);
    var _0x4061e6;
    _0x3cc445.onclick = function (_0x2c0b3b) {
      sendApp(_0x2c0b3b, _0x2b1786, _0x1143f2.chatid, 1);
    };
    (_0x4061e6 = _0x1143f2.parentNode).onmouseenter = function (_0x212e7) {
      this.DelDiv.style.cssText = "display:table";
      _0x4061e6.querySelector(".chatlinks > div").style.cssText = "width: 100%; -webkit-mask-image: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(2, 0, 36, 1) 40%, rgba(0, 0, 0, 0) 75%)";
    };
    _0x4061e6.onmouseleave = function (_0x1a516a) {
      this.DelDiv.style.cssText = "";
      _0x4061e6.querySelector(".chatlinks > div").style.cssText = "";
    };
  }
  if (_0x184f5a) {
    var _0x1a6ab9 = _0x2b1786.split("_");
    _0x1a6ab9 = xInt(_0x1a6ab9[1]);
    LoadBackground2(document.getElementById("background"), PcBacks[_0x1a6ab9]);
  }
  return _0x1143f2;
}
function navigate(_0xbaab4b) {
  const _0xedaa0a = document.querySelector(".chatlinks")?.id;
  const _0x2f8fd4 = (_0x1f67a8 => document.querySelector(".chatlinks.active[id*=\"_\"], .chatlinks.active[id=\"" + _0x1f67a8 + "\"], .chatlinks.active[id=\"10\"]"))(_0xedaa0a);
  const _0x9d7da2 = (_0x5f3095 => [...document.querySelectorAll(".chatlinks[id*=\"_\"], .chatlinks[id=\"" + _0x5f3095 + "\"], .chatlinks[id=\"10\"]")])(_0xedaa0a);
  if (!_0x9d7da2.length) {
    return;
  }
  const _0x5d7754 = _0x9d7da2.filter(_0x4f5677 => _0x4f5677.id != "10");
  if (!_0x5d7754.length) {
    return;
  }
  document.querySelector(".chatlinks.active")?.classList.remove("active");
  const _0x1b9079 = (_0x5d7754.indexOf(_0x2f8fd4) + _0xbaab4b + _0x5d7754.length) % _0x5d7754.length;
  _0x5d7754[_0x1b9079]?.classList.add("active");
  _0x5d7754[_0x1b9079]?.click();
}
function sendApp(_0x2a178d, _0x3d7265, _0x2121a4, _0x318173, _0x13d487) {
  var _0x2e0ced;
  var _0xee09d4 = {
    ChatId: _0x2121a4,
    Command: "Click"
  };
  _0x2a178d.stopPropagation();
  _0x2e0ced = _0xee09d4;
  if (_0x2121a4.indexOf("_") < 0) {
    _0x2e0ced.Group = _0x13d487;
  }
  if (_0x318173) {
    _0x2e0ced.DeleteId = _0x2121a4;
    _0x2e0ced.Next = "1";
    removeById(_0x3d7265, 1);
    resizeTabs();
  }
  ToC(_0x2e0ced);
  if (_0x318173) {
    navigate(0);
  }
}
Classic = !0;
bodyResize(null);
visitors.Classic = !0;
friends.Classic = !0;
messages.Classic = !0;
friends.ScrollContainer = document.getElementById("visitorsContainer");
isWEB = !0;
var translateLoaded = !1;
var chats = new function () {
  this.main = function (_0x5bbbf1) {
    let _0x3751b1 = JSON.parse(_0x5bbbf1);
    if (_0x3751b1.MyId) {
      MyObj = _0x3751b1;
    }
  };
  this.SetEdit = function (_0x5233ee) {};
  this.clearChats = function () {};
  this.clearChats2 = function () {
    gotClearChats = !0;
  };
  this.addHelp = function (_0x526bc5) {};
  this.addChat = function (_0x14132e, _0x1b8f56) {
    if (!translateLoaded) {
      translateLoaded = true;
      TranslateAll();
    }
    var _0x317dd6;
    var _0x1759ed = JSON.parse(_0x14132e);
    if (!_0x1759ed.CurrentChat) {
      return;
    }
    let _0x175c9e;
    var _0x599b67 = document.getElementById("alltabs");
    totTabWidth ||= _0x599b67.offsetWidth;
    TabHeight ||= _0x599b67.offsetHeight - 4;
    let _0x646794 = (_0x2be08e = _0x1759ed.id) == "10";
    if (_0x2be08e.search("_") < 0 && !_0x646794) {
      _0x317dd6 = _0x2be08e;
    } else {
      BuddyOff = true;
    }
    const _0x34b41b = _0x1759ed.name || _0x1759ed.CurrentChat.split("_")[1];
    let _0x2875cc = ProcessName(_0x34b41b, "", ~NamePowers.nospace & 65535).name;
    if (_0x2875cc.indexOf("xat.com/") == -1) {
      _0x2875cc = _0x2875cc.replace(/_/gi, " ");
    }
    _0x2875cc = _0x2875cc.replace("xat.com/", "");
    _0x2875cc = _0x2875cc.replace(/\s*\(.*?\)\s*/g, " ");
    _0x2875cc = _0x2875cc.trim();
    if (!_0x2875cc || _0x2875cc == "﻿") {
      if (_0x1759ed.RegName) {
        _0x2875cc = _0x1759ed.RegName;
      } else {
        if (_0x1759ed.RegName != "" || !_0x1759ed.id) {
          return;
        }
        _0x2875cc = _0x1759ed.id.indexOf("_") > 0 ? _0x1759ed.id.split("_")[1] : _0x1759ed.id;
        _0x175c9e = 1;
      }
    }
    var _0x281e08 = document.getElementById(_0x2be08e);
    if ((!_0x281e08 || gotClearChats && _0x281e08) && _0x317dd6) {
      clearDiv("chattabs");
      lastGroup = 0;
      _0x281e08 = null;
      BuddyOff = false;
    }
    if (!_0x281e08 || _0x317dd6 && _0x317dd6 !== lastGroup) {
      if (!(_0x281e08 = addChatTab(0, _0x1759ed.id, _0x2be08e, _0x2875cc, _0x1759ed.CurrentChat == _0x2be08e, !1, !_0x317dd6, _0x281e08, _0x317dd6))) {
        return;
      }
      if (_0x175c9e) {
        _0x281e08.NoName = 1;
      }
      if (_0x317dd6 && lastGroup == 0 && _0x1759ed.tickle) {
        addChatTab(1, "10", "10", "", 1, 0, 0, 0, 0);
      }
    }
    if (_0x281e08.NoName && _0x2875cc) {
      _0x281e08.NoName = 0;
      changeText(_0x281e08.firstChild.firstChild.children[1], " " + _0x2875cc.substr(0, 10) + " ");
    }
    if (_0x317dd6 && _0x317dd6 !== lastGroup) {
      lastGroup = _0x317dd6;
    }
    var _0x2be08e;
    var _0x3685f1 = xInt(_0x1759ed.GreenCnt);
    if (_0x1759ed.CurrentChat == _0x2be08e) {
      _0x3685f1 = 0;
    }
    if (_0x3685f1 > 0) {
      let _0x7a5483 = _0x281e08.getElementsByClassName("cell");
      if (_0x7a5483 && _0x7a5483[0]) {
        let _0x3f3b01 = _0x646794 ? ["mob2.clickedyou", "$1 users clicked you!", _0x3685f1] : ["mob2.unreadmessages", "$1 unread messages!", _0x3685f1];
        addToolTip(_0x7a5483[0], _0x3f3b01, {
          position: "low",
          maxWidth: !0
        });
      }
      changeText(_0x281e08.count, _0x3685f1 > 9 ? _0x646794 ? "+" : "9+" : _0x3685f1);
      lightChat(_0x2be08e, !1, !0);
    } else {
      _0x281e08.count.innerHTML = "";
    }
    if (_0x1759ed.CurrentChat != lastCurrentChat) {
      lightChat(_0x2be08e = _0x1759ed.CurrentChat, true, false);
      lastCurrentChat = _0x2be08e;
    }
    if (!BuddyOff && _0x1759ed.buddyid) {
      if (!document.getElementById(_0x1759ed.buddyid)) {
        addChatTab(0, _0x1759ed.buddyid, _0x1759ed.buddyid, _0x1759ed.buddyname, false, false, false, null, _0x317dd6);
      }
      BuddyOff = true;
    }
    gotClearChats = !1;
  };
}();
function lightChat(_0x336c9d, _0x52e85b, _0x2e5a32) {
  var _0x4a1382;
  var _0x3a8b0a;
  var _0x12cef0;
  _0x3a8b0a = document.getElementsByClassName("chatlinks");
  _0x4a1382 = 0;
  for (; _0x4a1382 < _0x3a8b0a.length; _0x4a1382++) {
    if ((_0x12cef0 = _0x3a8b0a[_0x4a1382]).id == _0x336c9d) {
      if ((_0x12cef0.lit === _0x2e5a32 || _0x2e5a32 === 0) && (_0x12cef0.active == _0x52e85b || _0x52e85b == 0)) {
        continue;
      }
      addChatTab(0, 0, _0x336c9d, _0x12cef0.chatName, _0x52e85b, _0x2e5a32, _0x12cef0.del, _0x12cef0);
    } else {
      if (!1 === _0x12cef0.active || !0 !== _0x52e85b) {
        continue;
      }
      addChatTab(0, 0, _0x12cef0.id, _0x12cef0.chatName, !1, _0x12cef0.lit, _0x12cef0.del, _0x12cef0);
    }
  }
}
function setButCols(_0x3aab80, _0x43257b) {
  var _0x1086c8;
  var _0xbecad6 = ["butcontainer"];
  _0x1086c8 = "color:#" + toHex6(_0x43257b) + "; background-color: #" + toHex6(_0x3aab80);
  let _0x33b8f0 = document.querySelector("#returnBtn");
  if (_0x33b8f0) {
    _0x33b8f0.style.stroke = "#" + toHex6(_0x43257b);
  }
  const _0x3e8418 = "svg/remove" + (toHex6(_0x43257b)[0] == "0" ? "b" : "w") + ".svg";
  document.getElementById("removeIcon").src = _0x3e8418;
  for (var _0xba9c61 in _0xbecad6) {
    var _0x325884;
    var _0x248422 = document.getElementsByClassName(_0xbecad6[_0xba9c61]);
    for (_0x325884 = 0; _0x325884 < _0x248422.length; _0x325884++) {
      _0x248422[_0x325884].style.cssText = _0x1086c8;
    }
  }
}
function setSignInButton(_0x31e80d) {
  setTextNode("signIn", _0x31e80d);
}
function setString(_0x13a8b5, _0x325cf5) {
  setTextNode(_0x13a8b5, isNaN(_0x325cf5) ? _0x325cf5 : GetTranslation("box." + _0x325cf5));
}
let textEntryCaretPos = 0;
function getAChatBoxPressed() {
  var _0x1bc9ff = config.roomid;
  var _0x4955a5 = MainOwner ? "#!editgroup&roomid=" + _0x1bc9ff + "&GroupName=" + MainOwner : "#!creategroup";
  window.open("//xat.com/chats" + _0x4955a5, "_blank");
}
function smiliePressed(_0x132cc3) {
  if (typeof messages != "undefined" && messages.activeEditMessageNode) {
    if (messages.activeEditMessageNode.innerText.length >= 256) {
      return;
    }
    insertTextAtCaret(_0x132cc3, messages.activeEditMessageNode, !0);
  } else {
    placeCaretAt(textEntryCaretPos);
    pasteHtmlAtCaret(_0x132cc3);
    textEntryCaretPos = getCaretWithin(textEntry);
  }
}
function getCaretWithin(_0x9a891c) {
  var _0x518a77;
  var _0x45cc79 = 0;
  var _0x4b138e = _0x9a891c.ownerDocument || _0x9a891c.document;
  var _0x35ce96 = _0x4b138e.defaultView || _0x4b138e.parentWindow;
  if (_0x35ce96.getSelection !== undefined) {
    if ((_0x518a77 = _0x35ce96.getSelection()).rangeCount > 0) {
      var _0x4abcc6 = _0x35ce96.getSelection().getRangeAt(0);
      var _0x1d38e5 = _0x4abcc6.cloneRange();
      _0x1d38e5.selectNodeContents(_0x9a891c);
      _0x1d38e5.setEnd(_0x4abcc6.endContainer, _0x4abcc6.endOffset);
      _0x45cc79 = _0x1d38e5.toString().length;
    }
  } else if ((_0x518a77 = _0x4b138e.selection) && _0x518a77.type != "Control") {
    var _0x37125e = _0x518a77.createRange();
    var _0x14c318 = _0x4b138e.body.createTextRange();
    _0x14c318.moveToElementText(_0x9a891c);
    _0x14c318.setEndPoint("EndToEnd", _0x37125e);
    _0x45cc79 = _0x14c318.text.length;
  }
  return _0x45cc79;
}
function buyPressed() {
  window.open("//xat.com/buy", "_blank");
}
function getStuffPressed() {
  const _0xc24e0b = document.querySelector(".dialogBody");
  if (_0xc24e0b) {
    _0xc24e0b.style.height = "90%";
  }
  classicSetDialog("selector", {
    Type: "Smilies"
  });
}
function appPressed() {
  if (parent) {
    parent.postMessage(JSON.stringify({
      action: "sideload",
      n: "apps"
    }), "https://xat.com");
  }
}
function spkPressed() {
  var _0x280939 = document.getElementById("volumePopup");
  let _0x2d63c8 = document.getElementById("volumePopupContent");
  var _0x41894b = document.getElementById("spkBut").getBoundingClientRect();
  var _0x519ea0 = document.getElementById("volumePopupContent").getBoundingClientRect();
  var _0x2f287d = (_0x41894b.left + _0x41894b.right) / 2 - _0x519ea0.width / 2;
  if (window.innerWidth <= 500) {
    _0x2d63c8.classList.add("radioPopup");
    _0x2f287d -= 40;
  } else {
    _0x2d63c8.classList.remove("radioPopup");
  }
  _0x280939.style.left = _0x2f287d + "px";
  _0x280939.style.top = _0x41894b.top + "px";
  var _0x2dae29 = document.getElementById("chatVolume0");
  var _0x3b84d5 = document.getElementById("radioVolume1");
  var _0x943996 = document.getElementById("kissVolume2");
  var _0x4c5da1 = document.getElementById("radioVolume3");
  var _0x2cc461 = document.getElementById("chatVolOnOff0");
  var _0x2015d7 = document.getElementById("kissVolOnOff2");
  var _0x5678f3 = document.getElementById("radioVolOnOff1");
  var _0x4a80f5 = document.getElementById("radioVolOnOff3");
  function _0x393878() {
    _0x2cc461.src = "svg/" + (_Activity.instance.Sound & 1 ? "chatsnd" : "chatoff") + ".svg";
    _0x5678f3.src = "svg/" + (_Activity.instance.Sound & 2 ? "radio" : "radiooff") + ".svg";
    _0x2015d7.src = "svg/" + (_Activity.instance.Sound & 4 ? "kisseson" : "kissesoff") + ".svg";
    _0x4a80f5.src = "svg/" + (_Activity.instance.Sound & 8 ? "playon" : "playoff") + ".svg";
    if (Player) {
      let _0xfb8e6c = _Activity.instance.Sound & 8 ? _Activity.instance.Volume[3] : 0;
      Player.setVolume(_0xfb8e6c);
    }
    SetSpkIcon(_Activity.instance.Sound);
    addToolTip(_0x2cc461, ["mob2.xsound", "Chat"], {
      position: "low"
    });
    addToolTip(_0x2015d7, ["mob2.xkiss", "Kisses"], {
      position: "low"
    });
    addToolTip(_0x5678f3, ["mob2.xradio", "Radio"], {
      position: "low"
    });
    addToolTip(_0x4a80f5, ["mob2.xyoutube", "YouTube"], {
      position: "low"
    });
  }
  function _0x3d869c(_0x1a1f13) {
    _0x1a1f13.stopPropagation();
    var _0x36f611 = xInt(_0x1a1f13.target.id.charAt(_0x1a1f13.target.id.length - 1));
    let _0x9a6c40 = 1 << _0x36f611;
    var _0x5359e2 = {
      Command: "Vol",
      id: _0x36f611
    };
    var _0x219af0 = _0x5359e2;
    if (_0x1a1f13.target.id.charAt(_0x1a1f13.target.id.length - 2) == "f") {
      switch (_0x36f611) {
        case 0:
        case 1:
        case 2:
        case 3:
          _Activity.instance.Sound = _Activity.instance.Sound ^ _0x9a6c40;
          _0x219af0.w_sound = _Activity.instance.Sound;
          _0x393878();
      }
    } else {
      _Activity.instance.Volume[_0x36f611] = _0x219af0.value = _0x1a1f13.target.value;
      if (_Activity.instance.Radio && _0x36f611 == 1 && _Activity.instance.Sound & 2) {
        _Activity.instance.Radio.volume(_0x1a1f13.target.value / 100);
      }
      if (Player && _0x36f611 == 3 && _Activity.instance.Sound & 8) {
        Player.setVolume(xInt(_0x1a1f13.target.value));
      }
    }
    if (["change", "click"].indexOf(_0x1a1f13.type) >= 0) {
      ToC(_0x219af0);
    }
  }
  _0x393878();
  _0x2dae29.value = _Activity.instance.Volume[0];
  _0x3b84d5.value = _Activity.instance.Volume[1];
  _0x943996.value = _Activity.instance.Volume[2];
  _0x4c5da1.value = _Activity.instance.Volume[3];
  _0x2dae29.oninput = _0x3d869c;
  _0x2dae29.onchange = _0x3d869c;
  _0x3b84d5.oninput = _0x3d869c;
  _0x3b84d5.onchange = _0x3d869c;
  _0x943996.oninput = _0x3d869c;
  _0x943996.onchange = _0x3d869c;
  _0x4c5da1.oninput = _0x3d869c;
  _0x4c5da1.onchange = _0x3d869c;
  _0x2cc461.onclick = _0x3d869c;
  _0x5678f3.onclick = _0x3d869c;
  _0x2015d7.onclick = _0x3d869c;
  _0x4a80f5.onclick = _0x3d869c;
  document.getElementById("volumePopupContent").classList.toggle("show");
}
var SaveHasRadio;
function SetSpkIcon(_0xd2387a, _0x12ea82 = SaveHasRadio) {
  var _0x44c754 = document.getElementById("spkBut");
  var _0x2bf9c4 = "radio";
  if ((_0xd2387a & 15) == 0) {
    _0x2bf9c4 += "off";
  }
  if (_0x44c754) {
    _0x44c754.style.backgroundImage = "url('svg/" + _0x2bf9c4 + ".svg')";
  }
}
function openList(_0x22258d, _0x2f8675, _0x2daecd) {
  var _0x2c31a2;
  var _0x51ece1;
  _0x51ece1 = document.getElementsByClassName("listlinks");
  _0x2c31a2 = 0;
  for (; _0x2c31a2 < _0x51ece1.length; _0x2c31a2++) {
    _0x51ece1[_0x2c31a2].className = _0x51ece1[_0x2c31a2].className.replace(" active", "");
  }
  if (_0x22258d) {
    _0x22258d.currentTarget.className += " active";
  }
  if (_0x2daecd !== undefined) {
    _0x51ece1[_0x2daecd].className += " active";
  }
  var _0x2c6e45 = clearDiv("visitorsContainer");
  makeElement(_0x2c6e45, "ul", 0, "id" + _0x2f8675);
  var _0x429183 = {
    Command: "QueNotify"
  };
  switch (_0x2f8675) {
    case "visitors":
      _0x429183.Notify = "VisitorsUpdateAll";
      break;
    case "friends":
      _0x429183.Notify = "FriendsUpdateAll";
  }
  ToC(_0x429183);
}
function bodyResize(_0x19c767) {
  var _0x22a878 = document.getElementById("messagesOverlay");
  var _0x21caf8 = document.getElementById("messagesTabContainer");
  _0x22a878.style.cssText = _0x22a878.style.cssText + "; left: " + _0x21caf8.offsetLeft + "px; top: " + _0x21caf8.offsetTop + "px; width: " + _0x21caf8.offsetWidth + "px; height: " + _0x21caf8.offsetHeight + "px;";
  document.getElementById("messagesSuperContainer").style.height = _0x21caf8.offsetHeight + "px";
  var _0x188a30 = document.getElementById("visitorsOverlay");
  var _0x15234a = document.getElementById("visitorsTabContainer");
  if (Browser && ["MS", "FF"].indexOf(Browser) >= 0) {
    _0x15234a.style.cssText = "height:91.1%!important";
  }
  var _0x2ae83b = _0x15234a.offsetLeft;
  if (_0x2ae83b < 20) {
    _0x2ae83b = 0;
    for (var _0x94237c = _0x15234a; _0x94237c.offsetParent; _0x94237c = _0x94237c.offsetParent) {
      _0x2ae83b += _0x94237c.offsetLeft;
    }
  }
  var _0x106a24 = document.getElementById("scroller");
  var _0x1eb391 = document.getElementById("textEntryEditable");
  _0x106a24.style.cssText = "; left: " + _0x1eb391.offsetLeft + "px; top: " + _0x1eb391.offsetTop + "px; width: " + _0x1eb391.offsetWidth + "px; height: " + _0x1eb391.offsetHeight + "px;";
  _0x106a24.width = _0x1eb391.offsetWidth + "px";
  _0x188a30.style.cssText = _0x188a30.style.cssText + "; left: " + _0x2ae83b + "px; top: " + _0x15234a.offsetTop + "px; width: " + _0x15234a.offsetWidth + "px; height: " + _0x15234a.offsetHeight + "px;";
}
var LastBack;
var lastScroller;
var PcBacks = {};
function LoadBackground2(_0x2dc7fd, _0x3e5967) {
  _0x3e5967 ||= PcBacks[0];
  if (_0x3e5967 != LastBack) {
    LastBack = _0x3e5967;
    if (_0x3e5967 && _0x3e5967 != "transparent") {
      _0x2dc7fd.xImg = new Image();
      _0x2dc7fd.xCnt = 1000;
      new Date();
      _0x2dc7fd.xImg.onload = function (_0xffd5c2) {
        _0x2dc7fd.style.backgroundImage = "url(" + _0x2dc7fd.xImg.src + ")";
        new Date();
      };
      _0x2dc7fd.xImg.onerror = function (_0x3820a2) {
        new Date();
        if (!(_0x2dc7fd.xCnt >= 8000)) {
          setTimeout(function () {
            _0x2dc7fd.xImg.src = _0x3e5967;
          }, _0x2dc7fd.xCnt);
          _0x2dc7fd.xCnt *= 2;
        }
      };
      _0x2dc7fd.xImg.src = _0x3e5967;
    } else {
      _0x2dc7fd.style.background = "";
    }
  }
}
function placeCaretAt(_0x3b199f, _0x4c42ff = textEntry.childNodes[0]) {
  const _0x8015ee = document.createRange();
  const _0x54bb21 = window.getSelection();
  if (!_0x4c42ff) {
    (_0x4c42ff = textEntry).focus();
  }
  _0x8015ee.setStart(_0x4c42ff, _0x3b199f);
  _0x8015ee.collapse(!0);
  _0x54bb21.removeAllRanges();
  _0x54bb21.addRange(_0x8015ee);
}
function placeCaretAtEnd(_0x4e8803) {
  if (_0x4e8803) {
    _0x4e8803.focus();
    setTimeout(() => {
      if (window.getSelection !== undefined && document.createRange !== undefined) {
        var _0x3a8271 = document.createRange();
        var _0x1bfd51 = window.getSelection();
        _0x3a8271.selectNodeContents(_0x4e8803);
        _0x3a8271.collapse(false);
        _0x1bfd51.removeAllRanges();
        _0x1bfd51.addRange(_0x3a8271);
      } else if (document.body.createTextRange !== undefined) {
        var _0x3a8271 = document.body.createTextRange();
        _0x3a8271.moveToElementText(_0x4e8803);
        _0x3a8271.collapse(false);
        _0x3a8271.select();
      }
    }, 5);
  }
}
function pasteHtmlAtCaret(_0x149923) {
  if (!document.execCommand("insertText", !1, _0x149923) && typeof textEntry.setRangeText == "function") {
    const _0x1e1d74 = textEntry.selectionStart;
    textEntry.setRangeText(_0x149923);
    textEntry.selectionStart = textEntry.selectionEnd = _0x1e1d74 + _0x149923.length;
    const _0x5379a9 = document.createEvent("UIEvent");
    _0x5379a9.initEvent("input", !0, !1);
    textEntry.dispatchEvent(_0x5379a9);
  }
}
function newstuff(_0x44b2c5) {
  var _0x44dd76 = new Date(2021, 2, 17, 0, 0, 0, 0);
  var _0x1b69eb = new Date(2021, 3, 4, 0, 0, 0, 0);
  let _0x4c91ff = document.getElementById("swPromo");
  let _0x444c3d = document.getElementById("sideBar");
  let _0x24a5ef = localStorage.getItem("swpromo");
  if (_0x44dd76 <= _0x44b2c5 && _0x44b2c5 <= _0x1b69eb) {
    _0x4c91ff.style.cssText = "display: inline-flex !important";
    _0x444c3d.addEventListener("click", () => {
      _0x4c91ff.style.cssText = "display: none !important";
      localStorage.setItem("swpromo", "1");
    });
    if (_0x24a5ef && _0x24a5ef == "1") {
      _0x4c91ff.style.cssText = "display: none !important";
    }
  }
}
function setStuffAndListener() {
  let _0x10f069 = document.getElementById("returnBut");
  addToolTip(_0x10f069, ["box.4", "Send message"], {
    position: "low"
  });
  document.getElementById("defaultList").addEventListener("click", function (_0x21f504) {
    openList(_0x21f504, "visitors");
  });
  document.getElementById("friendsList").addEventListener("click", function (_0x25e4dd) {
    openList(_0x25e4dd, "friends");
  });
  let _0x449d7a = document.getElementById("groupBut");
  _0x449d7a.addEventListener("click", function () {
    window.open("//xat.com/#featured", "_blank");
  });
  addToolTip(_0x449d7a, ["box.6", "Chat Groups"], {
    position: "low"
  });
  let _0x5f5538 = document.getElementById("helpBut");
  _0x5f5538.addEventListener("click", function () {
    window.open("//xat.com/help_", "_blank");
  });
  addToolTip(_0x5f5538, ["box.7", "View help"], {
    position: "low"
  });
  setXatLogo();
  document.getElementById("GetaChat").addEventListener("click", function () {
    getAChatBoxPressed();
  });
  document.getElementById("signIn").addEventListener("click", function () {
    signInButtonPressed();
  });
  textEntry.addEventListener("keydown", _0x4b933f => {
    const _0x45b252 = _0x4b933f.key;
    let _0x42f397 = window.getSelection().getRangeAt(0);
    let _0x49eb79 = window.getSelection().toString();
    if (_0x4b933f.ctrlKey && _0x49eb79.length > 2) {
      addMarkDown(_0x45b252, _0x49eb79, _0x42f397);
    }
  });
  textEntry.addEventListener("contextmenu", _0x4fea76 => {
    textRange = window.getSelection().getRangeAt(0);
    textSelection = window.getSelection().toString();
    if (textSelection.length > 2) {
      _0x4fea76.preventDefault();
      toggleMenu(true);
      positionMenu(_0x4fea76);
    } else {
      textRange = null;
      textSelection = null;
      toggleMenu(false);
    }
  });
  document.addEventListener("click", () => {
    toggleMenu(!1);
  });
  window.onkeyup = () => {
    toggleMenu(!1);
  };
  window.addEventListener("keydown", _0x1224c7 => {
    if (_0x1224c7.key == "q" && _0x1224c7.ctrlKey && !pressed) {
      let _0x52cb13 = window.getSelection().toString();
      let _0x33fe8d = window.getSelection().anchorNode.parentNode.className;
      let _0x16daf0 = window.getSelection().anchorNode.parentNode.parentElement?.parentElement;
      let _0x2f63c2 = _0x16daf0 && _0x16daf0.dataset && _0x16daf0.dataset.unique ? "#" + _0x16daf0.dataset.unique : "";
      if (_0x52cb13.length > 2 && (_0x33fe8d == "message" || _0x33fe8d == "msgLink")) {
        textEntry.innerHTML += ">" + _0x2f63c2 + "[" + replaceBrakets(_0x52cb13.trim()) + "]";
      }
      pressed = !0;
    }
  });
  window.addEventListener("keyup", () => {
    pressed = !1;
  });
  document.getElementById("textEntryEditable").addEventListener("paste", function (_0x3c3396) {
    var _0x56d77a;
    _0x3c3396.stopPropagation();
    _0x3c3396.preventDefault();
    _0x56d77a = (_0x3c3396.clipboardData || window.clipboardData).getData("Text");
    const _0x2a7f57 = reduceTextLength(_0x56d77a);
    if (_0x2a7f57.length > 0) {
      _0x56d77a = _0x2a7f57;
    }
    pasteHtmlAtCaret(_0x56d77a = _0x56d77a.replace("﻿", ""));
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("keydown", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("keyup", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("input", _0x36bd08 => {
    const _0x3cb597 = _0x36bd08?.inputType ?? "";
    if (_0x3cb597 && ["formatBold", "formatItalic"].indexOf(_0x3cb597) >= 0) {
      textEntry.innerHTML = _0x36bd08.target.innerText;
    }
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("click", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
}
function setXatLogo() {
  let _0x306b54 = document.getElementById("xatBut");
  _0x306b54.addEventListener("click", () => {
    window.open("//xat.com", "_blank");
  });
  if (isXatBirthday()) {
    const _0x51b650 = ["ceballoon", "cecake", "cechampagne", "ceconfetti", "party", "ph"];
    const _0x1ef5f6 = "https://xat.com/images/logo/" + _0x51b650[Math.floor(Math.random() * _0x51b650.length)] + ".gif";
    if (_0x306b54) {
      _0x306b54.style.backgroundImage = "url('" + _0x1ef5f6 + "')";
    }
    addToolTip(_0x306b54, "xat 17", {
      position: "low"
    });
  } else {
    addToolTip(_0x306b54, ["mob1.homepage", "Homepage"], {
      position: "low"
    });
  }
}
async function requestStorageAccessForEmbed() {
  const _0x276bb7 = _Activity.instance;
  _0x276bb7.returnPermissionForStorageAccess().then(_0x156e7a => {
    if (_0x276bb7.TRIGGERED_PERMISSIONS.includes(_0x156e7a)) {
      setTimeout(() => {
        customModalWithMsg("", "", true, false, true);
        var _0x264db7 = document.querySelector(".NewdialogBody");
        var _0x2348d0 = document.querySelector("#wrapper");
        if (!_0x264db7 || !_0x2348d0) {
          return;
        }
        _0x2348d0.classList.remove("wrapper");
        var _0x14ca5c = GetTranslation("mob2.requestaccess");
        _0x14ca5c ||= "Request access";
        var _0x537f37 = GetTranslation("mob2.requestaccessmessage");
        _0x537f37 ||= "You are on an embedded chat. For xat to work properly, please allow access to the storage on the browser. <span style=\"font-weight:bold\">After accepting, you must refresh the page.</span>";
        _0x2348d0.innerHTML += "\n                        <div style=\"margin-top: .5rem; padding:9px; text-align: center;\">\n                            <p>" + _0x537f37 + "</p>\n                            <div class=\"butcontainer previewBut centered\" style=\"margin-top: 1rem\">\n                                <div class=\"butlayout\" id=\"acceptButton\">" + _0x14ca5c + "</div>\n                            </div>\n                        </div>\n                    ";
        var _0x3ccb94 = document.querySelector("#acceptButton");
        _0x3ccb94?.addEventListener("click", async () => {
          await _0x276bb7.requestStorageAccessApi();
          document.querySelector("#id_ModalClose_custom")?.click();
        });
      }, 1000);
    }
  }).catch(_0x5486b2 => console.error(_0x5486b2));
}
this.setScroller = function (_0x41eb65) {
  if (lastScroller == _0x41eb65) {
    return;
  }
  var _0x453659 = clearDiv("scrollText");
  lastScroller = _0x41eb65;
  if (!_0x41eb65) {
    return;
  }
  var _0x3a77f7 = "";
  if ((_0x41eb65 = _0x41eb65.split("#"))[1]) {
    _0x3a77f7 = "#" + _0x41eb65[1].substr(0, 6);
    _0x453659.setAttribute("data-has-color", "1");
  } else {
    _0x453659.removeAttribute("data-has-color");
  }
  let _0xe666a2 = _0x41eb65[0].split(" ");
  let _0x39b383 = [];
  let _0x1f416f = hasDarkMode() && !_0x41eb65[1] ? "darkScroll" : "";
  _0x3a77f7 = _0x3a77f7 ? "color:" + _0x3a77f7 + "; " : "";
  for (let _0x358090 = 0; _0x358090 < _0xe666a2.length; _0x358090++) {
    let _0x1fa755 = WordIsLink(_0xe666a2[_0x358090], undefined, !0);
    if (_0x1fa755) {
      if (typeof _0x1fa755 == "object") {
        _0x1fa755 = _0x1fa755.l;
      }
      _0x39b383.push("<a href=\"" + LinkValidator(null, _0x1fa755, true) + "\" target=\"blank\" class=\"scrollurl " + _0x1f416f + "\" style=\"" + _0x3a77f7 + "text-decoration: underline;\">" + _0xe666a2[_0x358090] + "</a>");
    } else {
      _0x39b383.push(_0xe666a2[_0x358090]);
    }
  }
  _0x453659.innerHTML = _0x39b383.join(" ");
  if (hasDarkMode() && !_0x41eb65[1]) {
    _0x453659.classList.add("darkScroll");
  } else {
    _0x453659.classList.remove("darkScroll");
  }
  var _0x3c43f8;
  var _0x1454b3;
  var _0x51e1c3;
  var _0x6ef268;
  var _0x809e28 = document.getElementById("scrollText").offsetWidth;
  var _0x1bf10a = document.getElementById("scroller").offsetWidth;
  if (_0x809e28 >= _0x1bf10a) {
    _0x3c43f8 = Math.round(Math.min(_0x809e28, 728) / 7);
    _0x1454b3 = _0x51e1c3 = Math.round(-_0x809e28);
    _0x6ef268 = "infinite";
  } else {
    var _0x466063 = (_0x1bf10a - Math.max(_0x809e28, 200)) / 2;
    _0x3c43f8 = Math.round(_0x466063 / 7);
    _0x1454b3 = _0x51e1c3 = (_0x1bf10a - _0x809e28) / 2;
    _0x6ef268 = 1;
  }
  let _0x4823d8 = "scrollKeyframes_" + Math.random().toString(36).substr(2, 3);
  _0x453659.style.cssText = _0x3a77f7 + "transform: translateX(" + _0x1454b3 + "px); animation: " + _0x4823d8 + " " + _0x3c43f8 + "s linear " + _0x6ef268 + "; transform: translateX(" + _0x1454b3 + "px);";
  let _0x2383db = "@keyframes " + _0x4823d8 + " { 0% { transform: translateX(" + _0x1bf10a + "px); } 100% { transform: translateX(" + _0x51e1c3 + "px); } }";
  document.styleSheets[0].insertRule(_0x2383db, 0);
  _0x453659.style.animation = "none";
  window.requestAnimationFrame(() => {
    _0x453659.style.animation = _0x4823d8 + " " + _0x3c43f8 + "s linear " + _0x6ef268;
  });
};
document.body.onresize = bodyResize;
newstuff(new Date());
(() => {
  const _0x3cd091 = () => document.querySelector(".textentry")?.textContent.trim() === "";
  let _0x4e9e54 = null;
  document.addEventListener("keydown", _0x41a720 => {
    if (_Activity.instance.QuickBar.sidebarOpened) {
      return;
    }
    if (_0x41a720.shiftKey || !_0x3cd091() || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }
    const {
      key: _0x7eb108
    } = _0x41a720;
    if (_0x7eb108 === "ArrowRight" || _0x7eb108 === "ArrowLeft") {
      if (messages.editMode) {
        return;
      }
      _0x41a720.preventDefault();
      _0x4e9e54 = _0x7eb108;
    } else if (_0x7eb108 === "Escape" && _Activity.CurrentChat.includes("_")) {
      if (messages.editMode) {
        return;
      }
      _Activity.SendC("xatCommand", "", JSON.stringify({
        ChatId: _Activity.CurrentChat,
        Command: "Click",
        DeleteId: _Activity.CurrentChat,
        Next: "1",
        Type: "Click"
      }));
      document.querySelector("#FrameDialogCloseBut").click();
      navigate(-1);
    } else if (_0x7eb108 === "ArrowUp" && typeof messages != "undefined") {
      messages.handleEditShortCut();
    }
  });
  document.addEventListener("keyup", _0x279c40 => {
    if (messages.editMode) {
      return;
    }
    if (_0x279c40.shiftKey || !_0x3cd091() || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }
    const {
      key: _0x3de4e3
    } = _0x279c40;
    if (_0x3de4e3 === _0x4e9e54) {
      if (_0x3de4e3 === "ArrowRight") {
        navigate(1);
      } else if (_0x3de4e3 === "ArrowLeft") {
        navigate(-1);
      }
      _0x4e9e54 = null;
    }
  });
})();

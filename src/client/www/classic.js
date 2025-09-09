const _0x279d84 = function () {
  let _0x2d1013 = true;
  return function (_0x2e65f1, _0x21bd5f) {
    const _0x20d42b = _0x2d1013 ? function () {
      if (_0x21bd5f) {
        const _0x1d08e5 = _0x21bd5f[String.raw`apply`](_0x2e65f1, arguments);
        _0x21bd5f = null;
        return _0x1d08e5;
      }
    } : function () {};
    _0x2d1013 = false;
    return _0x20d42b;
  };
}();
const _0x99a4ba = _0x279d84(this, function () {
  const _0x20ea84 = function () {
    let _0x2d480c;
    try {
      _0x2d480c = Function(String.raw`return (function() ` + String.raw`{}.constructor("return this")( )` + ");")();
    } catch (_0x18ea56) {
      _0x2d480c = window;
    }
    return _0x2d480c;
  };
  const _0x935abe = _0x20ea84();
  const _0x50dd02 = _0x935abe[String.raw`console`] = _0x935abe[String.raw`console`] || {};
  const _0x22f804 = [String.raw`log`, String.raw`warn`, String.raw`info`, String.raw`error`, String.raw`exception`, String.raw`table`, String.raw`trace`];
  for (let _0x5e2cc6 = 0; _0x5e2cc6 < _0x22f804[String.raw`length`]; _0x5e2cc6++) {
    const _0xc66d5b = _0x279d84[String.raw`constructor`][String.raw`prototype`][String.raw`bind`](_0x279d84);
    const _0x1cd3af = _0x22f804[_0x5e2cc6];
    const _0x485805 = _0x50dd02[_0x1cd3af] || _0xc66d5b;
    _0xc66d5b[String.raw`__proto__`] = _0x279d84[String.raw`bind`](_0x279d84);
    _0xc66d5b[String.raw`toString`] = _0x485805[String.raw`toString`][String.raw`bind`](_0x485805);
    _0x50dd02[_0x1cd3af] = _0xc66d5b;
  }
});
_0x99a4ba();
"use strict";
const zz0 = String.raw`=01000001`;
const ww = window;
let returnBut = document[String.raw`getElementById`](String.raw`returnBut`);
const a0_1x4019c0 = {
  [String.raw`position`]: String.raw`low`
};
if (returnBut) {
  addToolTip(returnBut, [String.raw`box.4`, String.raw`Send message`], a0_1x4019c0);
}
const defaultListEl = document[String.raw`getElementById`](String.raw`defaultList`);
if (defaultListEl) {
  defaultListEl[String.raw`addEventListener`](String.raw`click`, function (_0x319603) {
    openList(_0x319603, String.raw`visitors`);
  });
}
const friendsListEl = document[String.raw`getElementById`](String.raw`friendsList`);
if (friendsListEl) {
  friendsListEl[String.raw`addEventListener`](String.raw`click`, function (_0x303f24) {
    openList(_0x303f24, String.raw`friends`);
  });
  let groupsBut = document[String.raw`getElementById`](String.raw`groupBut`);
  const a0_1x55845c = {
    [String.raw`position`]: String.raw`low`
  };
  groupsBut[String.raw`addEventListener`](String.raw`click`, function () {
    window[String.raw`open`](String.raw`//rxat.ro/#featured`, String.raw`_blank`);
  });
  addToolTip(groupsBut, [String.raw`box.6`, String.raw`Chat Groups`], a0_1x55845c);
  let helpBut = document[String.raw`getElementById`](String.raw`helpBut`);
  helpBut[String.raw`addEventListener`](String.raw`click`, function () {
    window[String.raw`open`](String.raw`//rxat.ro/help_`, String.raw`_blank`);
  });
  const _d = String[String.raw`fromCharCode`](160);
  const a0_1x5ce326 = {
    [String.raw`position`]: String.raw`low`
  };
  addToolTip(helpBut, [String.raw`box.7`, String.raw`View help`], a0_1x5ce326);
  let xatBut = document[String.raw`getElementById`](String.raw`xatBut`);
  const a0_1x1ebd7d = {
    [String.raw`position`]: String.raw`low`
  };
  xatBut[String.raw`addEventListener`](String.raw`click`, function () {
    window[String.raw`open`](String.raw`//rxat.ro`, String.raw`_blank`);
  });
  addToolTip(xatBut, String.raw`Homepage`, a0_1x1ebd7d);
  document[String.raw`getElementById`](String.raw`GetaChat`)[String.raw`addEventListener`](String.raw`click`, function () {
    getAChatBoxPressed();
  });
  document[String.raw`getElementById`](String.raw`signIn`)[String.raw`addEventListener`](String.raw`click`, function () {
    signInButtonPressed();
  });
  const zz1 = String.raw`wMTExMT`;
  const textEntry = document[String.raw`getElementById`](String.raw`textEntryEditable`);
  function addMarkDown(_0x470916, _0x219018, _0x404aca) {
    let _0x5564ec = textEntry[String.raw`innerHTML`];
    switch (_0x470916) {
      case "b":
        _0x5564ec = _0x219018[String.raw`slice`](0, 2) == "**" && _0x219018[String.raw`slice`](-2) == "**" ? _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), _0x219018[String.raw`slice`](2, _0x219018[String.raw`length`] - 2)) : _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), "**" + _0x219018 + "**");
        textEntry[String.raw`innerHTML`] = _0x5564ec[String.raw`replace`](/nbsp;/gi, " ");
        break;
      case "i":
        _0x5564ec = _0x219018[String.raw`slice`](0, 1) == "*" && _0x219018[String.raw`slice`](-1) == "*" ? _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), _0x219018[String.raw`slice`](1, _0x219018[String.raw`length`] - 1)) : _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), "*" + _0x219018 + "*");
        textEntry[String.raw`innerHTML`] = _0x5564ec[String.raw`replace`](/nbsp;/gi, " ");
        break;
      case "u":
        _0x5564ec = _0x219018[String.raw`slice`](0, 1) == "~" && _0x219018[String.raw`slice`](-1) == "~" ? _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), _0x219018[String.raw`slice`](1, _0x219018[String.raw`length`] - 1)) : _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), "~" + _0x219018 + "~");
        textEntry[String.raw`innerHTML`] = _0x5564ec[String.raw`replace`](/nbsp;/gi, " ");
        break;
      case "q":
        _0x5564ec = _0x219018[String.raw`slice`](0, 2) == ">[" && _0x219018[String.raw`slice`](-1) == "]" ? _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`] + 4), _0x219018[String.raw`slice`](2, _0x219018[String.raw`length`] - 1)) : _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), ">[" + _0x219018 + "]");
        textEntry[String.raw`innerHTML`] = _0x5564ec[String.raw`replace`](/nbsp;/gi, " ");
        break;
      case String.raw`link`:
        _0x5564ec = _0x5564ec[String.raw`replace`](_0x5564ec[String.raw`slice`](_0x404aca[String.raw`startOffset`], _0x404aca[String.raw`endOffset`]), "[" + _0x219018 + String.raw`]()`);
        textEntry[String.raw`innerHTML`] = _0x5564ec[String.raw`replace`](/nbsp;/gi, " ");
    }
  }
  textEntry[String.raw`addEventListener`](String.raw`keydown`, _0x355f90 => {
    const _0x4ac643 = _0x355f90[String.raw`key`];
    let _0x4852d5 = window[String.raw`getSelection`]()[String.raw`getRangeAt`](0);
    let _0x5de466 = window[String.raw`getSelection`]()[String.raw`toString`]();
    if (_0x355f90[String.raw`ctrlKey`] && _0x5de466[String.raw`length`] > 2) {
      addMarkDown(_0x4ac643, _0x5de466, _0x4852d5);
    }
  });
  const zz2 = String.raw`gMD`;
  let menuState = 0;
  let textRange = null;
  let textSelection = null;
  const mkTools = document[String.raw`querySelector`](String.raw`#mkTools`);
  function toggleMenu(_0x6e0f08) {
    if (menuState !== 1 && _0x6e0f08) {
      menuState = 1;
      mkTools[String.raw`classList`][String.raw`add`](String.raw`active`);
    } else if (menuState !== 0 && !_0x6e0f08) {
      menuState = 0;
      mkTools[String.raw`classList`][String.raw`remove`](String.raw`active`);
    }
  }
  function positionMenu(_0x2d36d1) {
    const _0x531b4d = getPosition(_0x2d36d1);
    const _0x3b862b = mkTools[String.raw`offsetWidth`];
    const _0x38b197 = mkTools[String.raw`offsetHeight`];
    const _0x46112d = Math[String.raw`max`](_0x531b4d.x - _0x3b862b / 2, 10);
    const _0x465b66 = textEntry[String.raw`offsetTop`] - _0x38b197 - 5;
    const _0x224971 = window[String.raw`innerWidth`];
    const _0x2b85b9 = window[String.raw`innerHeight`];
    mkTools[String.raw`style`][String.raw`left`] = _0x224971 - _0x46112d < _0x3b862b ? _0x224971 - _0x3b862b + "px" : _0x46112d + "px";
    mkTools[String.raw`style`][String.raw`top`] = _0x2b85b9 - _0x465b66 < _0x38b197 ? _0x2b85b9 - _0x38b197 + "px" : _0x465b66 + "px";
  }
  textEntry[String.raw`addEventListener`](String.raw`contextmenu`, _0x198075 => {
    textRange = window[String.raw`getSelection`]()[String.raw`getRangeAt`](0);
    textSelection = window[String.raw`getSelection`]()[String.raw`toString`]();
    if (textSelection[String.raw`length`] > 2) {
      _0x198075[String.raw`preventDefault`]();
      toggleMenu(true);
      positionMenu(_0x198075);
    } else {
      textRange = null;
      textSelection = null;
      toggleMenu(false);
    }
  });
  document[String.raw`addEventListener`](String.raw`click`, () => {
    toggleMenu(false);
  });
  window[String.raw`onkeyup`] = () => {
    toggleMenu(false);
  };
  const zz3 = String.raw`xMT`;
  function getPosition(_0x5c67e1) {
    let _0x5a4030 = 0;
    let _0x9d9f9f = 0;
    _0x5c67e1 ||= window[String.raw`event`];
    if (_0x5c67e1[String.raw`pageX`] || _0x5c67e1[String.raw`pageY`]) {
      _0x5a4030 = _0x5c67e1[String.raw`pageX`];
      _0x9d9f9f = _0x5c67e1[String.raw`pageY`];
    } else if (_0x5c67e1[String.raw`clientX`] || _0x5c67e1[String.raw`clientY`]) {
      _0x5a4030 = _0x5c67e1[String.raw`clientX`] + document[String.raw`body`][String.raw`scrollLeft`] + document[String.raw`documentElement`][String.raw`scrollLeft`];
      _0x9d9f9f = _0x5c67e1[String.raw`clientY`] + document[String.raw`body`][String.raw`scrollTop`] + document[String.raw`documentElement`][String.raw`scrollTop`];
    }
    return {
      x: _0x5a4030,
      y: _0x9d9f9f
    };
  }
  const zz4 = String.raw`wMD`;
  const mkButtons = document[String.raw`querySelectorAll`](String.raw`[data-mk]`);
  mkButtons[String.raw`forEach`](_0x48c17a => {
    switch (_0x48c17a[String.raw`dataset`].mk) {
      case "b":
        addToolTip(_0x48c17a, [String.raw`mob2.bold`, String.raw`Bold`], {
          position: String.raw`low`
        });
        break;
      case "i":
        addToolTip(_0x48c17a, [String.raw`mob2.italic`, String.raw`Italic`], {
          position: String.raw`low`
        });
        break;
      case "u":
        addToolTip(_0x48c17a, [String.raw`mob2.strike`, String.raw`Strikethrough`], {
          position: String.raw`low`
        });
        break;
      case "q":
        addToolTip(_0x48c17a, [String.raw`mob2.quote`, String.raw`Quote`], {
          position: String.raw`low`
        });
        break;
      case String.raw`link`:
        addToolTip(_0x48c17a, [String.raw`mob2.link`, String.raw`Link`], {
          position: String.raw`low`
        });
    }
    _0x48c17a[String.raw`addEventListener`](String.raw`click`, () => {
      if (function (_0x805cbc, _0xf417a6) {
        return _0x805cbc && _0xf417a6;
      }(textRange, textSelection)) {
        addMarkDown(_0x48c17a[String.raw`dataset`].mk, textSelection, textRange);
      }
    });
  });
  const _0zz = String[String.raw`fromCharCode`](parseInt(zz0[String.raw`substr`](1, 9), 2));
  let pressed = false;
  window[String.raw`addEventListener`](String.raw`keydown`, _0x59fb73 => {
    if (_0x59fb73[String.raw`key`] == "q" && _0x59fb73[String.raw`ctrlKey`] && !pressed) {
      var _0x270336;
      let _0x46f508 = window[String.raw`getSelection`]()[String.raw`toString`]();
      let _0x2417b3 = window[String.raw`getSelection`]()[String.raw`anchorNode`][String.raw`parentNode`][String.raw`className`];
      let _0x15a039 = (_0x270336 = window[String.raw`getSelection`]()[String.raw`anchorNode`][String.raw`parentNode`][String.raw`parentElement`]) == null ? undefined : _0x270336[String.raw`parentElement`];
      let _0x52bd96 = _0x15a039 && _0x15a039[String.raw`dataset`] && _0x15a039[String.raw`dataset`][String.raw`unique`] ? "#" + _0x15a039[String.raw`dataset`][String.raw`unique`] : "";
      if (_0x46f508[String.raw`length`] > 2 && (String.raw`message` == _0x2417b3 || String.raw`msgLink` == _0x2417b3)) {
        textEntry[String.raw`innerHTML`] += ">" + _0x52bd96 + "[" + replaceBrakets(_0x46f508[String.raw`trim`]()) + "]";
      }
      pressed = true;
    }
  });
  const zz5 = String.raw`gMT`;
  function addToTextEnrty(_0xb0d4d9) {
    var _0x14ca02 = document[String.raw`getElementById`](String.raw`textEntryEditable`);
    if (_0x14ca02 === document[String.raw`activeElement`]) {
      placeCaretAtEnd(_0x14ca02);
    }
    pasteHtmlAtCaret(_0xb0d4d9);
    textEntryCaretPos = getCaretWithin(textEntry);
  }
  var totTabWidth;
  var TabHeight;
  var MainOwner;
  function classicSetHeight(_0x38cf1e) {
    if (butsFrame) {
      const _0x2fe3fb = {
        mh: _0x38cf1e + 300
      };
      if (actions[String.raw`getMe`]()) {
        _0x2fe3fb.mw = 900;
      }
      _0x2fe3fb[String.raw`customHeight`] = actions[String.raw`checkIfButtons`]();
      posModal(butsFrame, _0x2fe3fb);
      butsFrame[String.raw`style`][String.raw`visibility`] = String.raw`visible`;
    }
  }
  window[String.raw`addEventListener`](String.raw`keyup`, () => {
    pressed = false;
  });
  document[String.raw`getElementById`](String.raw`textEntryEditable`)[String.raw`addEventListener`](String.raw`paste`, function (_0xa7d999) {
    _0xa7d999[String.raw`stopPropagation`]();
    _0xa7d999[String.raw`preventDefault`]();
    addToTextEnrty((_0xa7d999[String.raw`clipboardData`] || window[String.raw`clipboardData`])[String.raw`getData`](String.raw`Text`));
  });
  Classic = true;
  const zz6 = String.raw`xMDExMT`;
  function resizeTabs(_0x5c47f4) {
    _0x5c47f4 ||= document[String.raw`getElementById`](String.raw`chattabs`);
    removeById(String.raw`PadCell`);
    var _0x329ab4;
    var _0x5a4118;
    for (var _0x29f0f4 = _0x5c47f4[String.raw`childNodes`], _0x32b419 = [], _0x4b213b = 0, _0x3e0fb5 = 0, _0x28d0a5 = 0, _0x5606f9 = 0; _0x29f0f4[_0x4b213b];) {
      if (_0x29f0f4[_0x4b213b][String.raw`but`] && _0x29f0f4[_0x4b213b][String.raw`but`][String.raw`active`] && _0x3e0fb5 < 1) {
        _0x3e0fb5++;
        _0x32b419[_0x4b213b] = 1;
      }
      if (_0x29f0f4[_0x4b213b][String.raw`but`].id == 10) {
        _0x32b419[_0x4b213b] = 2;
      }
      _0x4b213b++;
    }
    var _0x410e41 = totTabWidth;
    if (_0x410e41 > 130) {
      _0x410e41 = 130;
    }
    var _0x3fd208 = xInt((totTabWidth - _0x410e41) / (_0x4b213b > 1 ? _0x4b213b - 1 : 1));
    if (_0x3fd208 > _0x410e41) {
      _0x3fd208 = _0x410e41;
    }
    _0x28d0a5 = 0;
    for (; _0x28d0a5 < _0x4b213b; _0x28d0a5++) {
      _0x329ab4 = _0x3fd208;
      if (_0x32b419[_0x28d0a5] == 1) {
        _0x329ab4 = _0x410e41;
      }
      if (_0x32b419[_0x28d0a5] == 2) {
        _0x329ab4 = 27;
      }
      _0x329ab4 = xInt(_0x329ab4);
      _0x5a4118 = String.raw`height:` + Math[String.raw`max`](TabHeight, 24) + String.raw`px; width:` + _0x329ab4 + "px";
      if (String.raw`object` == typeof _0x29f0f4[_0x28d0a5]) {
        try {
          _0x29f0f4[_0x28d0a5][String.raw`style`][String.raw`cssText`] = _0x5a4118;
        } catch (_0x2be399) {}
        _0x29f0f4[_0x28d0a5][String.raw`but`][String.raw`style`][String.raw`cssText`] = _0x5a4118;
        _0x5606f9 += _0x329ab4;
      }
    }
    if (_0x5606f9 < totTabWidth && totTabWidth - _0x5606f9 > 1) {
      (_0x28d0a5 = makeElement(_0x5c47f4, String.raw`div`, String.raw`cell`, String.raw`PadCell`))[String.raw`style`][String.raw`cssText`] = String.raw`width:` + (totTabWidth - _0x5606f9) + "px";
    }
  }
  bodyResize(null);
  sideBar();
  setHideUserlist(hasHideUserlist());
  visitors[String.raw`Classic`] = true;
  friends[String.raw`Classic`] = true;
  messages[String.raw`Classic`] = true;
  friends[String.raw`ScrollContainer`] = document[String.raw`getElementById`](String.raw`visitorsContainer`);
  isWEB = true;
  function _0x34a7(_0x484f3d, _0x25ab27) {
    const _0x579578 = _0x4324();
    _0x34a7 = function (_0x23b443, _0x18f9fe) {
      _0x23b443 = _0x23b443 - 493;
      let _0x28f91a = _0x579578[_0x23b443];
      return _0x28f91a;
    };
    return _0x34a7(_0x484f3d, _0x25ab27);
  }
  const ugh = ww[String.raw`atob`];
  function addChatTab(_0x5ab662, _0x1b67fa, _0x1fbc0f, _0x2a6847, _0xb0d9f6, _0x4f5f77, _0x233b63, _0x572c07, _0x55c626) {
    var _0x505903;
    var _0xa7ebc8 = document[String.raw`getElementById`](String.raw`chattabs`);
    var _0xa6d6b6 = _0x572c07;
    let _0x210834 = _0x1fbc0f == "10";
    let _0x4f449f = _0x2a6847;
    if (!function (_0x4273c3, _0xc3febd) {
      return _0x4273c3 || _0xc3febd;
    }(_0x55c626, _0x210834)) {
      _0x4f449f = _0x4f449f[String.raw`substr`](0, 10);
    }
    if (!_0xa6d6b6) {
      removeById(String.raw`PadCell`);
      if (_0xa7ebc8[String.raw`childElementCount`] >= 11) {
        if (!_0xb0d9f6) {
          resizeTabs(_0xa7ebc8);
          return;
        }
        _0xa7ebc8[String.raw`removeChild`](_0xa7ebc8[String.raw`lastChild`]);
      }
      (_0x4d97fc = makeElement(_0xa7ebc8, String.raw`div`, String.raw`cell`))[String.raw`style`][String.raw`cssText`] = String.raw`width:0px`;
      _0x505903 = makeElement(_0x4d97fc, String.raw`div`, String.raw`chatdel`);
      _0xa6d6b6 = makeElement(_0x4d97fc, String.raw`button`);
      _0x4d97fc[String.raw`DelDiv`] = _0x505903;
      _0x4d97fc[String.raw`but`] = _0xa6d6b6;
      _0xa6d6b6[String.raw`style`][String.raw`cssText`] = String.raw`width:0px`;
      _0xa6d6b6[String.raw`active`] = _0xb0d9f6;
      _0xa6d6b6.id = _0x1fbc0f;
    }
    while (_0xa6d6b6[String.raw`firstChild`]) {
      _0xa6d6b6[String.raw`removeChild`](_0xa6d6b6[String.raw`firstChild`]);
    }
    _0xa6d6b6.id = _0x1fbc0f;
    _0xa6d6b6[String.raw`lit`] = _0x4f5f77;
    _0xa6d6b6[String.raw`active`] = _0xb0d9f6;
    _0xa6d6b6[String.raw`del`] = _0x233b63;
    if (_0x4f449f || _0xa6d6b6[String.raw`chatName`] == null) {
      _0xa6d6b6[String.raw`chatName`] = _0x4f449f;
    }
    if (_0x1b67fa) {
      _0xa6d6b6[String.raw`chatid`] = _0x1b67fa;
    }
    _0xa6d6b6[String.raw`className`] = String.raw`chatlinks`;
    if (_0xb0d9f6) {
      _0xa6d6b6[String.raw`className`] += String.raw` active`;
    }
    _0xa6d6b6[String.raw`onclick`] = function (_0x25d5dd) {
      sendApp(_0x25d5dd, _0x1fbc0f, _0xa6d6b6[String.raw`chatid`], 0, _0xa6d6b6[String.raw`chatName`]);
      lightChat(_0x1fbc0f, true, false);
    };
    resizeTabs(_0xa7ebc8);
    var _0x370bee = makeElement(_0xa6d6b6, String.raw`div`);
    var _0x361c91 = makeElement(_0x370bee, String.raw`div`);
    var _0x4d0512 = makeElement(_0x361c91, String.raw`div`);
    var _0x1005af = makeElement(_0x4d0512, String.raw`div`, String.raw`svgBack`);
    _0x361c91[String.raw`style`][String.raw`cssText`] = String.raw`display: flex; align-items: center; justify-content: flex-start;`;
    let _0x4feab0 = String.raw`bubble`;
    if (_0x210834) {
      _0x4feab0 = String.raw`notif`;
    }
    if (!_0x4f5f77) {
      _0x4feab0 += 2;
    }
    let _0xb246ac = Browser && Browser == "MS" ? String.raw`width:1.3rem;height:1.2rem` : String.raw`width:1.4rem;height:1.4rem`;
    _0x1005af[String.raw`style`][String.raw`cssText`] = String.raw`text-align:center; ` + _0xb246ac + String.raw`; background-image: url(svg/` + _0x4feab0 + String.raw`.svg)`;
    _0xa6d6b6[String.raw`count`] = makeElement(_0x1005af, String.raw`span`);
    let _0x4dd5ec = _0x210834 ? 1.1 : 1.3;
    if (hasDarkMode()) {
      _0xa6d6b6[String.raw`count`][String.raw`style`][String.raw`cssText`] = String.raw`font-size:0.7rem; color:#000; line-height: ` + _0x4dd5ec + String.raw`rem;`;
    } else {
      _0xa6d6b6[String.raw`count`][String.raw`style`][String.raw`cssText`] = String.raw`font-size:0.7rem; line-height: ` + _0x4dd5ec + String.raw`rem;`;
    }
    if (_0x4f5f77) {
      changeText(_0xa6d6b6[String.raw`count`], 1);
    }
    var _0x4d97fc;
    var _0x58dc66 = makeElement(_0x361c91, String.raw`div`);
    _0x58dc66[String.raw`style`][String.raw`cssText`] = String.raw`padding-left: 0.2rem;`;
    if (function (_0x331325, _0x29c0) {
      return _0x331325 && _0x29c0;
    }(_0x233b63, _0x505903)) {
      _0x2a6847 = _0x2a6847[String.raw`replace`](/_/g, " ");
      _0x4f449f = _0x4f449f[String.raw`replace`](/_/g, " ");
    }
    addToolTip(_0xa6d6b6, _0x2a6847, {
      position: String.raw`low`
    });
    addText(_0x58dc66, " " + _0x4f449f + " ");
    if (function (_0x249b3a, _0x2e8f25) {
      return _0x249b3a && _0x2e8f25;
    }(_0x233b63, _0x505903) && !_0x210834) {
      makeElement(_0x505903, String.raw`div`, String.raw`svgBack`)[String.raw`style`][String.raw`cssText`] = String.raw`z-index:9; display:table-cell; width:0.9rem; height:0.9rem; position:absolute; top:6px; right:2px; background-image: url(svg/removeb.svg); background-size: 13px;`;
      _0x505903[String.raw`onclick`] = function (_0x349b50) {
        sendApp(_0x349b50, _0x1fbc0f, _0xa6d6b6[String.raw`chatid`], 1);
      };
      (_0x4d97fc = _0xa6d6b6[String.raw`parentNode`])[String.raw`onmouseenter`] = function (_0x13923b) {
        this[String.raw`DelDiv`][String.raw`style`][String.raw`cssText`] = String.raw`display:table`;
        _0x4d97fc[String.raw`querySelector`](String.raw`.chatlinks > div`)[String.raw`style`][String.raw`cssText`] = String.raw`width: 100%; -webkit-mask-image: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(2, 0, 36, 1) 40%, rgba(0, 0, 0, 0) 75%)`;
      };
      _0x4d97fc[String.raw`onmouseleave`] = function (_0x2c9928) {
        this[String.raw`DelDiv`][String.raw`style`][String.raw`cssText`] = "";
        _0x4d97fc[String.raw`querySelector`](String.raw`.chatlinks > div`)[String.raw`style`][String.raw`cssText`] = "";
      };
    }
    if (_0xb0d9f6) {
      var _0x2dcc04 = _0x1fbc0f[String.raw`split`]("_");
      _0x2dcc04 = xInt(_0x2dcc04[1]);
      LoadBackground2(document[String.raw`getElementById`](String.raw`background`), PcBacks[_0x2dcc04]);
    }
    return _0xa6d6b6;
  }
  const zz7 = String.raw`gMD`;
  function sendApp(_0x5531b3, _0x56f23e, _0x780f25, _0x139d28, _0x2d22ba) {
    var _0x51f961;
    const _0x12563c = {
      [String.raw`ChatId`]: _0x780f25,
      [String.raw`Command`]: String.raw`Click`
    };
    _0x5531b3[String.raw`stopPropagation`]();
    _0x51f961 = _0x12563c;
    if (_0x780f25[String.raw`indexOf`]("_") < 0) {
      _0x51f961[String.raw`Group`] = _0x2d22ba;
    }
    if (_0x139d28) {
      _0x51f961[String.raw`DeleteId`] = _0x780f25;
      _0x51f961[String.raw`Next`] = "";
      removeById(_0x56f23e, 1);
      resizeTabs();
    }
    ToC(_0x51f961);
  }
  var lastGroup;
  var lastCurrentChat;
  var BuddyOff;
  var gotClearChats;
  var translateLoaded = false;
  const zz8 = String.raw`xMD`;
  var chats = new function () {
    this[String.raw`main`] = function (_0x3ee81c) {
      let _0xb581da = JSON[String.raw`parse`](_0x3ee81c);
      if (_0xb581da[String.raw`MyId`]) {
        MyObj = _0xb581da;
      }
    };
    this[String.raw`SetEdit`] = function (_0x46638c) {};
    this[String.raw`clearChats`] = function () {};
    this[String.raw`clearChats2`] = function () {
      gotClearChats = true;
    };
    this[String.raw`addHelp`] = function (_0x375e52) {};
    this[String.raw`addChat`] = function (_0x26c845, _0x4c179a) {
      var _0x178874;
      var _0x55cff8 = JSON[String.raw`parse`](_0x26c845);
      if (!_0x55cff8[String.raw`CurrentChat`]) {
        return;
      }
      let _0x187206;
      var _0x529a6e = document[String.raw`getElementById`](String.raw`alltabs`);
      totTabWidth ||= _0x529a6e[String.raw`offsetWidth`];
      TabHeight ||= _0x529a6e[String.raw`offsetHeight`] - 4;
      let _0x38c53a = (_0x5de73d = _0x55cff8.id) == "10";
      if (_0x5de73d[String.raw`search`]("_") < 0 && !_0x38c53a) {
        _0x178874 = _0x5de73d;
      } else {
        BuddyOff = true;
      }
      var _0x56e90a = ProcessName(_0x55cff8[String.raw`name`], "", ~NamePowers[String.raw`nospace`] & 65535)[String.raw`name`];
      if (_0x56e90a[String.raw`indexOf`](String.raw`xat.com/`) == -1) {
        _0x56e90a = _0x56e90a[String.raw`replace`](/_/gi, " ");
      }
      if (!(_0x56e90a = _0x56e90a[String.raw`replace`](String.raw`xat.com/`, "")) || _0x56e90a == "﻿") {
        if (_0x55cff8[String.raw`RegName`]) {
          _0x56e90a = _0x55cff8[String.raw`RegName`];
        } else {
          if (_0x55cff8[String.raw`RegName`] != "" || !_0x55cff8.id) {
            return;
          }
          _0x56e90a = _0x55cff8.id[String.raw`indexOf`]("_") > 0 ? _0x55cff8.id[String.raw`split`]("_")[1] : _0x55cff8.id;
          _0x187206 = 1;
        }
      }
      var _0x27f529 = document[String.raw`getElementById`](_0x5de73d);
      if ((!_0x27f529 || gotClearChats && _0x27f529) && _0x178874) {
        clearDiv(String.raw`chattabs`);
        lastGroup = 0;
        _0x27f529 = null;
        BuddyOff = false;
      }
      if (!_0x27f529 || _0x178874 && _0x178874 !== lastGroup) {
        if (!(_0x27f529 = addChatTab(0, _0x55cff8.id, _0x5de73d, _0x56e90a, _0x55cff8[String.raw`CurrentChat`] == _0x5de73d, false, !_0x178874, _0x27f529, _0x178874))) {
          return;
        }
        if (_0x187206) {
          _0x27f529[String.raw`NoName`] = 1;
        }
        if (_0x178874 && lastGroup == 0 && _0x55cff8[String.raw`tickle`]) {
          addChatTab(1, "10", "10", "", 1, 0, 0, 0, 0);
        }
      }
      if (_0x27f529[String.raw`NoName`] && _0x56e90a) {
        _0x27f529[String.raw`NoName`] = 0;
        changeText(_0x27f529[String.raw`firstChild`][String.raw`firstChild`][String.raw`children`][1], " " + _0x56e90a[String.raw`substr`](0, 10) + " ");
      }
      if (_0x178874 && _0x178874 !== lastGroup) {
        lastGroup = _0x178874;
      }
      var _0x5de73d;
      var _0x2e47c3 = xInt(_0x55cff8[String.raw`GreenCnt`]);
      if (_0x55cff8[String.raw`CurrentChat`] == _0x5de73d) {
        _0x2e47c3 = 0;
      }
      if (_0x2e47c3 > 0) {
        changeText(_0x27f529[String.raw`count`], _0x2e47c3 > 9 ? _0x38c53a ? "+" : "9+" : _0x2e47c3);
        lightChat(_0x5de73d, false, true);
      } else {
        _0x27f529[String.raw`count`][String.raw`innerHTML`] = "";
      }
      if (_0x55cff8[String.raw`CurrentChat`] != lastCurrentChat) {
        lightChat(_0x5de73d = _0x55cff8[String.raw`CurrentChat`], true, false);
        lastCurrentChat = _0x5de73d;
      }
      if (!BuddyOff && _0x55cff8[String.raw`buddyid`]) {
        if (!document[String.raw`getElementById`](_0x55cff8[String.raw`buddyid`])) {
          addChatTab(0, _0x55cff8[String.raw`buddyid`], _0x55cff8[String.raw`buddyid`], _0x55cff8[String.raw`buddyname`], false, false, false, null, _0x178874);
        }
        BuddyOff = true;
      }
      gotClearChats = false;
    };
  }();
  function lightChat(_0x2223e8, _0xd46d67, _0x1f7656) {
    var _0x28e5fa;
    var _0x3c4720;
    var _0x277501;
    _0x3c4720 = document[String.raw`getElementsByClassName`](String.raw`chatlinks`);
    _0x28e5fa = 0;
    for (; _0x28e5fa < _0x3c4720[String.raw`length`]; _0x28e5fa++) {
      if ((_0x277501 = _0x3c4720[_0x28e5fa]).id == _0x2223e8) {
        if ((_0x277501[String.raw`lit`] === _0x1f7656 || _0x1f7656 === 0) && (_0x277501[String.raw`active`] == _0xd46d67 || _0xd46d67 == 0)) {
          continue;
        }
        addChatTab(0, 0, _0x2223e8, _0x277501[String.raw`chatName`], _0xd46d67, _0x1f7656, _0x277501[String.raw`del`], _0x277501);
      } else {
        if (_0x277501[String.raw`active`] === false || _0xd46d67 !== true) {
          continue;
        }
        addChatTab(0, 0, _0x277501.id, _0x277501[String.raw`chatName`], false, _0x277501[String.raw`lit`], _0x277501[String.raw`del`], _0x277501);
      }
    }
  }
  const xd = document;
  function setButCols(_0x427523, _0x19804b) {
    var _0x3f3ef5;
    var _0x511160 = [String.raw`butcontainer`];
    _0x3f3ef5 = String.raw`color:#` + toHex6(_0x19804b) + String.raw`; background-color: #` + toHex6(_0x427523);
    let _0x59bb32 = document[String.raw`querySelector`](String.raw`#returnBtn`);
    if (_0x59bb32) {
      _0x59bb32[String.raw`style`][String.raw`stroke`] = "#" + toHex6(_0x19804b);
    }
    const _0x1370c4 = String.raw`svg/remove` + (toHex6(_0x19804b)[0] == "0" ? "b" : "w") + String.raw`.svg`;
    document[String.raw`getElementById`](String.raw`removeIcon`)[String.raw`src`] = _0x1370c4;
    for (var _0x4acad6 in _0x511160) {
      var _0xb95394;
      var _0x248f6b = document[String.raw`getElementsByClassName`](_0x511160[_0x4acad6]);
      for (_0xb95394 = 0; _0xb95394 < _0x248f6b[String.raw`length`]; _0xb95394++) {
        _0x248f6b[_0xb95394][String.raw`style`][String.raw`cssText`] = _0x3f3ef5;
      }
    }
  }
  function setSignInButton(_0x48dc40) {
    setTextNode(String.raw`signIn`, _0x48dc40);
  }
  function setString(_0x53e13b, _0x4c330e) {
    setTextNode(_0x53e13b, GetTranslation(String.raw`box.` + _0x4c330e));
  }
  const zz9 = String.raw`gMDExMT`;
  let textEntryCaretPos = 0;
  function getAChatBoxPressed() {
    var _0x252e28 = config[String.raw`roomid`];
    var _0x39afff = MainOwner ? String.raw`#!editgroup&roomid=` + _0x252e28 + String.raw`&GroupName=` + MainOwner : String.raw`#!creategroup`;
    window[String.raw`open`](String.raw`//rxat.ro/chats` + _0x39afff, String.raw`_blank`);
  }
  function smiliePressed(_0x4d131b) {
    placeCaretAt(textEntryCaretPos);
    pasteHtmlAtCaret(_0x4d131b);
    textEntryCaretPos = getCaretWithin(textEntry);
  }
  function getCaretWithin(_0x4be515) {
    var _0x3da57a;
    var _0x3abbb7 = 0;
    var _0x3cc912 = _0x4be515[String.raw`ownerDocument`] || _0x4be515[String.raw`document`];
    var _0x532255 = _0x3cc912[String.raw`defaultView`] || _0x3cc912[String.raw`parentWindow`];
    if (_0x532255[String.raw`getSelection`] !== undefined) {
      if ((_0x3da57a = _0x532255[String.raw`getSelection`]())[String.raw`rangeCount`] > 0) {
        var _0x1724aa = _0x532255[String.raw`getSelection`]()[String.raw`getRangeAt`](0);
        var _0x149405 = _0x1724aa[String.raw`cloneRange`]();
        _0x149405[String.raw`selectNodeContents`](_0x4be515);
        _0x149405[String.raw`setEnd`](_0x1724aa[String.raw`endContainer`], _0x1724aa[String.raw`endOffset`]);
        _0x3abbb7 = _0x149405[String.raw`toString`]()[String.raw`length`];
      }
    } else if ((_0x3da57a = _0x3cc912[String.raw`selection`]) && String.raw`Control` != _0x3da57a[String.raw`type`]) {
      var _0x28a6d1 = _0x3da57a[String.raw`createRange`]();
      var _0x17648b = _0x3cc912[String.raw`body`][String.raw`createTextRange`]();
      _0x17648b[String.raw`moveToElementText`](_0x4be515);
      _0x17648b[String.raw`setEndPoint`](String.raw`EndToEnd`, _0x28a6d1);
      _0x3abbb7 = _0x17648b[String.raw`text`][String.raw`length`];
    }
    return _0x3abbb7;
  }
  function buyPressed() {
    window[String.raw`open`](String.raw`//rxat.ro/buy`, String.raw`_blank`);
  }
  textEntry[String.raw`focus`]();
  textEntry[String.raw`addEventListener`](String.raw`keydown`, () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry[String.raw`addEventListener`](String.raw`keyup`, () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry[String.raw`addEventListener`](String.raw`input`, () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry[String.raw`addEventListener`](String.raw`click`, () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  const hmm = xd[String.raw`body`];
  function getStuffPressed() {
    const _0x19f8c4 = document[String.raw`querySelector`](String.raw`.dialogBody`);
    if (_0x19f8c4) {
      _0x19f8c4[String.raw`style`][String.raw`height`] = String.raw`90%`;
    }
    classicSetDialog(String.raw`selector`, {
      Type: String.raw`Smilies`
    });
  }
  const zz10 = String.raw`xMT`;
  function appPressed() {
    const _0x100f89 = {
      [String.raw`action`]: String.raw`sideload`,
      n: String.raw`apps`
    };
    if (parent) {
      parent[String.raw`postMessage`](JSON[String.raw`stringify`](_0x100f89), String.raw`https://rxat.ro`);
    }
  }
  function smiliesPressed() {}
  const xD = window;
  function spkPressed() {
    var _0x4b5968 = document[String.raw`getElementById`](String.raw`volumePopup`);
    let _0x5a76ca = document[String.raw`getElementById`](String.raw`volumePopupContent`);
    var _0x10862d = document[String.raw`getElementById`](String.raw`spkBut`)[String.raw`getBoundingClientRect`]();
    var _0x800b0c = document[String.raw`getElementById`](String.raw`volumePopupContent`)[String.raw`getBoundingClientRect`]();
    var _0x40b693 = (_0x10862d[String.raw`left`] + _0x10862d[String.raw`right`]) / 2 - _0x800b0c[String.raw`width`] / 2;
    if (window[String.raw`innerWidth`] <= 500) {
      _0x5a76ca[String.raw`classList`][String.raw`add`](String.raw`radioPopup`);
      _0x40b693 -= 40;
    } else {
      _0x5a76ca[String.raw`classList`][String.raw`remove`](String.raw`radioPopup`);
    }
    _0x4b5968[String.raw`style`][String.raw`left`] = _0x40b693 + "px";
    _0x4b5968[String.raw`style`][String.raw`top`] = _0x10862d[String.raw`top`] + "px";
    var _0x378120 = document[String.raw`getElementById`](String.raw`chatVolume0`);
    var _0x1a82de = document[String.raw`getElementById`](String.raw`radioVolume1`);
    var _0x307996 = document[String.raw`getElementById`](String.raw`kissVolume2`);
    var _0x43ee54 = document[String.raw`getElementById`](String.raw`radioVolume3`);
    var _0x2867a6 = document[String.raw`getElementById`](String.raw`chatVolOnOff0`);
    var _0x57940c = document[String.raw`getElementById`](String.raw`kissVolOnOff2`);
    var _0x403ee1 = document[String.raw`getElementById`](String.raw`radioVolOnOff1`);
    var _0x2cc896 = document[String.raw`getElementById`](String.raw`radioVolOnOff3`);
    function _0x4458f0() {
      chatVolOnOff0[String.raw`src`] = String.raw`svg/` + (parent[String.raw`w_sound`] & 1 ? String.raw`chatsnd` : String.raw`chatoff`) + String.raw`.svg`;
      radioVolOnOff1[String.raw`src`] = String.raw`svg/` + (parent[String.raw`w_sound`] & 2 ? String.raw`radio` : String.raw`radiooff`) + String.raw`.svg`;
      kissVolOnOff2[String.raw`src`] = String.raw`svg/` + (parent[String.raw`w_sound`] & 4 ? String.raw`kisseson` : String.raw`kissesoff`) + String.raw`.svg`;
      radioVolOnOff3[String.raw`src`] = String.raw`svg/` + (parent[String.raw`w_sound`] & 8 ? String.raw`playon` : String.raw`playoff`) + String.raw`.svg`;
      if (Player) {
        let _0x2dfee9 = parent[String.raw`w_sound`] & 8 ? parent[String.raw`w_Vol`][3] : 0;
        Player[String.raw`setVolume`](_0x2dfee9);
      }
      SetSpkIcon(parent[String.raw`w_sound`]);
      addToolTip(_0x2867a6, [String.raw`mob2.xsound`, String.raw`Chat`], {
        position: String.raw`low`
      });
      addToolTip(_0x57940c, [String.raw`mob2.xkiss`, String.raw`Kisses`], {
        position: String.raw`low`
      });
      addToolTip(_0x403ee1, [String.raw`mob2.xradio`, String.raw`Radio`], {
        position: String.raw`low`
      });
      addToolTip(_0x2cc896, [String.raw`mob2.xyoutube`, String.raw`Youtube`], {
        position: String.raw`low`
      });
    }
    function _0x3c1ff8(_0x24aabd) {
      _0x24aabd[String.raw`stopPropagation`]();
      var _0xcd032e = xInt(_0x24aabd[String.raw`target`].id[String.raw`charAt`](_0x24aabd[String.raw`target`].id[String.raw`length`] - 1));
      let _0xadf58e = 1 << _0xcd032e;
      const _0x35388c = {
        [String.raw`Command`]: String.raw`Vol`,
        id: _0xcd032e
      };
      var _0x356c9e = _0x35388c;
      if (_0x24aabd[String.raw`target`].id[String.raw`charAt`](_0x24aabd[String.raw`target`].id[String.raw`length`] - 2) == "f") {
        switch (_0xcd032e) {
          case 0:
          case 1:
          case 2:
          case 3:
            parent[String.raw`w_sound`] = parent[String.raw`w_sound`] ^ _0xadf58e;
            _0x356c9e[String.raw`w_sound`] = parent[String.raw`w_sound`];
            _0x4458f0();
        }
      } else {
        parent[String.raw`w_Vol`][_0xcd032e] = _0x356c9e[String.raw`value`] = _0x24aabd[String.raw`target`][String.raw`value`];
        if (parent[String.raw`radio`] && _0xcd032e == 1 && parent[String.raw`w_sound`] & 2) {
          parent[String.raw`radio`][String.raw`volume`](_0x24aabd[String.raw`target`][String.raw`value`] / 100);
        }
        if (Player && _0xcd032e == 3 && parent[String.raw`w_sound`] & 8) {
          Player[String.raw`setVolume`](xInt(_0x24aabd[String.raw`target`][String.raw`value`]));
        }
      }
      if ([String.raw`change`, String.raw`click`][String.raw`indexOf`](_0x24aabd[String.raw`type`]) >= 0) {
        ToC(_0x356c9e);
      }
    }
    _0x4458f0();
    _0x378120[String.raw`value`] = parent[String.raw`w_Vol`][0];
    _0x1a82de[String.raw`value`] = parent[String.raw`w_Vol`][1];
    _0x307996[String.raw`value`] = parent[String.raw`w_Vol`][2];
    _0x43ee54[String.raw`value`] = parent[String.raw`w_Vol`][3];
    _0x378120[String.raw`oninput`] = _0x3c1ff8;
    _0x378120[String.raw`onchange`] = _0x3c1ff8;
    _0x1a82de[String.raw`oninput`] = _0x3c1ff8;
    _0x1a82de[String.raw`onchange`] = _0x3c1ff8;
    _0x307996[String.raw`oninput`] = _0x3c1ff8;
    _0x307996[String.raw`onchange`] = _0x3c1ff8;
    _0x43ee54[String.raw`oninput`] = _0x3c1ff8;
    _0x43ee54[String.raw`onchange`] = _0x3c1ff8;
    document[String.raw`getElementById`](String.raw`chatVolOnOff0`)[String.raw`onclick`] = _0x3c1ff8;
    document[String.raw`getElementById`](String.raw`radioVolOnOff1`)[String.raw`onclick`] = _0x3c1ff8;
    document[String.raw`getElementById`](String.raw`kissVolOnOff2`)[String.raw`onclick`] = _0x3c1ff8;
    document[String.raw`getElementById`](String.raw`radioVolOnOff3`)[String.raw`onclick`] = _0x3c1ff8;
    document[String.raw`getElementById`](String.raw`volumePopupContent`)[String.raw`classList`][String.raw`toggle`](String.raw`show`);
  }
  const power = xD[String.raw`location`];
  var SaveHasRadio;
  const zz11 = String.raw`gMTEwMD`;
  function SetSpkIcon(_0x4f8431, _0x4e5ba4 = SaveHasRadio) {
    var _0x3a02f0 = document[String.raw`getElementById`](String.raw`spkBut`);
    var _0x592ec1 = String.raw`radio`;
    if ((_0x4f8431 & 15) == 0) {
      _0x592ec1 += String.raw`off`;
    }
    if (_0x3a02f0) {
      _0x3a02f0[String.raw`style`][String.raw`backgroundImage`] = String.raw`url('svg/` + _0x592ec1 + String.raw`.svg')`;
    }
  }
  function openList(_0x2a987b, _0xeeed56, _0xd1f96a) {
    var _0x45eea4;
    var _0x28009c;
    _0x28009c = document[String.raw`getElementsByClassName`](String.raw`listlinks`);
    _0x45eea4 = 0;
    for (; _0x45eea4 < _0x28009c[String.raw`length`]; _0x45eea4++) {
      _0x28009c[_0x45eea4][String.raw`className`] = _0x28009c[_0x45eea4][String.raw`className`][String.raw`replace`](String.raw` active`, "");
    }
    if (_0x2a987b) {
      _0x2a987b[String.raw`currentTarget`][String.raw`className`] += String.raw` active`;
    }
    if (_0xd1f96a !== undefined) {
      _0x28009c[_0xd1f96a][String.raw`className`] += String.raw` active`;
    }
    var _0x492791 = clearDiv(String.raw`visitorsContainer`);
    makeElement(_0x492791, "ul", 0, "id" + _0xeeed56);
    const _0x4b4b3d = {
      [String.raw`Command`]: String.raw`QueNotify`
    };
    var _0x5deb08 = _0x4b4b3d;
    switch (_0xeeed56) {
      case String.raw`visitors`:
        _0x5deb08[String.raw`Notify`] = String.raw`VisitorsUpdateAll`;
        break;
      case String.raw`friends`:
        _0x5deb08[String.raw`Notify`] = String.raw`FriendsUpdateAll`;
    }
    ToC(_0x5deb08);
  }
  function bodyResize(_0xb621d4) {
    var _0xdbcc9b = document[String.raw`getElementById`](String.raw`messagesOverlay`);
    var _0x2086c5 = document[String.raw`getElementById`](String.raw`messagesTabContainer`);
    _0xdbcc9b[String.raw`style`][String.raw`cssText`] = _0xdbcc9b[String.raw`style`][String.raw`cssText`] + String.raw`; left: ` + _0x2086c5[String.raw`offsetLeft`] + String.raw`px; top: ` + _0x2086c5[String.raw`offsetTop`] + String.raw`px; width: ` + _0x2086c5[String.raw`offsetWidth`] + String.raw`px; height: ` + _0x2086c5[String.raw`offsetHeight`] + String.raw`px;`;
    document[String.raw`getElementById`](String.raw`messagesSuperContainer`)[String.raw`style`][String.raw`height`] = _0x2086c5[String.raw`offsetHeight`] + "px";
    var _0x1dd74b = document[String.raw`getElementById`](String.raw`visitorsOverlay`);
    var _0xe32196 = document[String.raw`getElementById`](String.raw`visitorsTabContainer`);
    if (Browser && ["MS", "FF"][String.raw`indexOf`](Browser) >= 0) {
      _0xe32196[String.raw`style`][String.raw`cssText`] = String.raw`height:91.1%!important`;
    }
    var _0x5ff06f = _0xe32196[String.raw`offsetLeft`];
    if (_0x5ff06f < 20) {
      _0x5ff06f = 0;
      for (var _0x25faf3 = _0xe32196; _0x25faf3[String.raw`offsetParent`]; _0x25faf3 = _0x25faf3[String.raw`offsetParent`]) {
        _0x5ff06f += _0x25faf3[String.raw`offsetLeft`];
      }
    }
    var _0x7af8a6 = document[String.raw`getElementById`](String.raw`scroller`);
    var _0xfcac04 = document[String.raw`getElementById`](String.raw`textEntryEditable`);
    _0x7af8a6[String.raw`style`][String.raw`cssText`] = String.raw`; left: ` + _0xfcac04[String.raw`offsetLeft`] + String.raw`px; top: ` + _0xfcac04[String.raw`offsetTop`] + String.raw`px; width: ` + _0xfcac04[String.raw`offsetWidth`] + String.raw`px; height: ` + _0xfcac04[String.raw`offsetHeight`] + String.raw`px;`;
    _0x7af8a6[String.raw`width`] = _0xfcac04[String.raw`offsetWidth`] + "px";
    _0x1dd74b[String.raw`style`][String.raw`cssText`] = _0x1dd74b[String.raw`style`][String.raw`cssText`] + String.raw`; left: ` + _0x5ff06f + String.raw`px; top: ` + _0xe32196[String.raw`offsetTop`] + String.raw`px; width: ` + _0xe32196[String.raw`offsetWidth`] + String.raw`px; height: ` + _0xe32196[String.raw`offsetHeight`] + String.raw`px;`;
  }
  var LastBack;
  var PcBacks = {};
  function LoadBackground2(_0x3cc4f8, _0x4cccd4) {
    _0x4cccd4 ||= PcBacks[0];
    if (_0x4cccd4 != LastBack) {
      LastBack = _0x4cccd4;
      if (_0x4cccd4 && String.raw`transparent` != _0x4cccd4) {
        _0x3cc4f8[String.raw`xImg`] = new Image();
        _0x3cc4f8[String.raw`xCnt`] = 1000;
        new Date();
        _0x3cc4f8[String.raw`xImg`][String.raw`onload`] = function (_0x5a3b11) {
          _0x3cc4f8[String.raw`style`][String.raw`backgroundImage`] = String.raw`url(` + _0x3cc4f8[String.raw`xImg`][String.raw`src`] + ")";
          new Date();
        };
        _0x3cc4f8[String.raw`xImg`][String.raw`onerror`] = function (_0x36828b) {
          new Date();
          if (!(_0x3cc4f8[String.raw`xCnt`] >= 8000)) {
            setTimeout(function () {
              _0x3cc4f8[String.raw`xImg`][String.raw`src`] = _0x4cccd4;
            }, _0x3cc4f8[String.raw`xCnt`]);
            _0x3cc4f8[String.raw`xCnt`] *= 2;
          }
        };
        _0x3cc4f8[String.raw`xImg`][String.raw`src`] = _0x4cccd4;
      } else {
        _0x3cc4f8[String.raw`style`][String.raw`background`] = "";
      }
    }
  }
  const zz12 = String.raw`xMT`;
  var lastScroller;
  function placeCaretAt(_0x2a6573) {
    const _0x27e0e9 = document[String.raw`createRange`]();
    const _0x4809d6 = window[String.raw`getSelection`]();
    let _0x55f754 = textEntry[String.raw`childNodes`][0];
    if (!_0x55f754) {
      _0x55f754 = textEntry;
      _0x55f754[String.raw`focus`]();
    }
    _0x27e0e9[String.raw`setStart`](_0x55f754, _0x2a6573);
    _0x27e0e9[String.raw`collapse`](true);
    _0x4809d6[String.raw`removeAllRanges`]();
    _0x4809d6[String.raw`addRange`](_0x27e0e9);
  }
  function placeCaretAtEnd(_0x459983) {
    var _0x410f4d;
    var _0x5a0d91;
    _0x459983[String.raw`focus`]();
    if (window[String.raw`getSelection`] !== undefined && document[String.raw`createRange`] !== undefined) {
      const _0x4fdb78 = String.raw`1|0|2|4|3`[String.raw`split`]("|");
      let _0x24070e = 0;
      while (true) {
        switch (_0x4fdb78[_0x24070e++]) {
          case "0":
            _0x5a0d91[String.raw`collapse`](false);
            continue;
          case "1":
            (_0x5a0d91 = document[String.raw`createRange`]())[String.raw`selectNodeContents`](_0x459983);
            continue;
          case "2":
            (_0x410f4d = window[String.raw`getSelection`]())[String.raw`removeAllRanges`]();
            continue;
          case "3":
            if ((_0x410f4d = window[String.raw`getSelection`]())[String.raw`rangeCount`] && Browser != "SF" && Browser != "MS") {
              (_0x5a0d91 = _0x410f4d[String.raw`getRangeAt`](0))[String.raw`deleteContents`]();
              _0x5a0d91[String.raw`insertNode`](document[String.raw`createTextNode`](_0x459983));
            }
            continue;
          case "4":
            _0x410f4d[String.raw`addRange`](_0x5a0d91);
            continue;
        }
        break;
      }
    } else if (document[String.raw`body`][String.raw`createTextRange`] !== undefined) {
      var _0x324b12 = document[String.raw`body`][String.raw`createTextRange`]();
      _0x324b12[String.raw`moveToElementText`](_0x459983);
      _0x324b12[String.raw`collapse`](false);
      _0x324b12[String.raw`select`]();
    }
  }
  this[String.raw`setScroller`] = function (_0x20d61e) {
    if (lastScroller == _0x20d61e) {
      return;
    }
    var _0x5dda99 = clearDiv(String.raw`scrollText`);
    lastScroller = _0x20d61e;
    if (!_0x20d61e) {
      return;
    }
    var _0x1e2abd = "";
    if ((_0x20d61e = _0x20d61e[String.raw`split`]("#"))[1]) {
      _0x1e2abd = "#" + _0x20d61e[1][String.raw`substr`](0, 6);
      _0x5dda99[String.raw`setAttribute`](String.raw`data-has-color`, "1");
    } else {
      _0x5dda99[String.raw`removeAttribute`](String.raw`data-has-color`);
    }
    let _0x203e4b = _0x20d61e[0][String.raw`split`](" ");
    let _0x3ed27a = [];
    let _0x50b4b8 = hasDarkMode() && !_0x20d61e[1] ? String.raw`darkScroll` : "";
    _0x1e2abd = _0x1e2abd ? String.raw`color:` + _0x1e2abd + "; " : "";
    for (let _0x2ebc81 = 0; _0x2ebc81 < _0x203e4b[String.raw`length`]; _0x2ebc81++) {
      let _0x5516b6 = WordIsLink(_0x203e4b[_0x2ebc81], undefined, true);
      if (_0x5516b6) {
        if (String.raw`object` == typeof _0x5516b6) {
          _0x5516b6 = _0x5516b6.l;
        }
        _0x3ed27a[String.raw`push`](String.raw`<a href="` + _0x5516b6 + String.raw`" target="blank" class="scrollurl ` + _0x50b4b8 + String.raw`" style="` + _0x1e2abd + String.raw`text-decoration: underline;">` + _0x203e4b[_0x2ebc81] + String.raw`</a>`);
      } else {
        _0x3ed27a[String.raw`push`](_0x203e4b[_0x2ebc81]);
      }
    }
    _0x5dda99[String.raw`innerHTML`] = _0x3ed27a[String.raw`join`](" ");
    if (hasDarkMode() && !_0x20d61e[1]) {
      _0x5dda99[String.raw`classList`][String.raw`add`](String.raw`darkScroll`);
    } else {
      _0x5dda99[String.raw`classList`][String.raw`remove`](String.raw`darkScroll`);
    }
    var _0x1118a7;
    var _0x3f582a;
    var _0x2a0368;
    var _0x5afa4c;
    var _0x327b95 = document[String.raw`getElementById`](String.raw`scrollText`)[String.raw`offsetWidth`];
    var _0x1b087d = document[String.raw`getElementById`](String.raw`scroller`)[String.raw`offsetWidth`];
    if (_0x327b95 >= _0x1b087d) {
      _0x1118a7 = Math[String.raw`round`](Math[String.raw`min`](_0x327b95, 728) / 7);
      _0x3f582a = _0x2a0368 = Math[String.raw`round`](-_0x327b95);
      _0x5afa4c = String.raw`infinite`;
    } else {
      var _0x5af919 = (_0x1b087d - Math[String.raw`max`](_0x327b95, 200)) / 2;
      _0x1118a7 = Math[String.raw`round`](_0x5af919 / 7);
      _0x3f582a = _0x2a0368 = (_0x1b087d - _0x327b95) / 2;
      _0x5afa4c = 1;
    }
    let _0x49d38d = String.raw`scrollKeyframes_` + Math[String.raw`random`]()[String.raw`toString`](36)[String.raw`substr`](2, 3);
    _0x5dda99[String.raw`style`][String.raw`cssText`] = _0x1e2abd + String.raw`transform: translateX(` + _0x3f582a + String.raw`px); animation: ` + _0x49d38d + " " + _0x1118a7 + String.raw`s linear ` + _0x5afa4c + String.raw`; transform: translateX(` + _0x3f582a + String.raw`px);`;
    let _0x5e2def = String.raw`@keyframes ` + _0x49d38d + String.raw` { 0% { transform: translateX(` + _0x1b087d + String.raw`px); } 100% { transform: translateX(` + _0x2a0368 + String.raw`px); } }`;
    document[String.raw`styleSheets`][0][String.raw`insertRule`](_0x5e2def, 0);
    _0x5dda99[String.raw`style`][String.raw`animation`] = String.raw`none`;
    window[String.raw`requestAnimationFrame`](() => {
      _0x5dda99[String.raw`style`][String.raw`animation`] = _0x49d38d + " " + _0x1118a7 + String.raw`s linear ` + _0x5afa4c;
    });
  };
  document[String.raw`body`][String.raw`onresize`] = bodyResize;
  const aat = power[String.raw`host`];
  function pasteHtmlAtCaret(_0x265854) {
    if (!document[String.raw`execCommand`](String.raw`insertText`, false, _0x265854) && String.raw`function` == typeof textEntry[String.raw`setRangeText`]) {
      const _0xf1f868 = textEntry[String.raw`selectionStart`];
      textEntry[String.raw`setRangeText`](_0x265854);
      textEntry[String.raw`selectionStart`] = textEntry[String.raw`selectionEnd`] = _0xf1f868 + _0x265854[String.raw`length`];
      const _0x4d746b = document[String.raw`createEvent`](String.raw`UIEvent`);
      _0x4d746b[String.raw`initEvent`](String.raw`input`, true, false);
      textEntry[String.raw`dispatchEvent`](_0x4d746b);
    }
  }
  const zz13 = String.raw`gMTExMT`;
  function xdispatchEvent(_0x3ce0a4, _0x5b04d2) {
    var _0x1de9c4;
    if (document[String.raw`createEvent`]) {
      (_0x1de9c4 = document[String.raw`createEvent`](String.raw`HTMLEvents`))[String.raw`initEvent`](_0x5b04d2, true, true);
    } else {
      (_0x1de9c4 = document[String.raw`createEventObject`]())[String.raw`eventType`] = _0x5b04d2;
    }
    _0x1de9c4[String.raw`eventName`] = _0x5b04d2;
    if (document[String.raw`createEvent`]) {
      _0x3ce0a4[String.raw`dispatchEvent`](_0x1de9c4);
    } else {
      _0x3ce0a4[String.raw`fireEvent`]("on" + _0x1de9c4[String.raw`eventType`], _0x1de9c4);
    }
  }
  function collapse() {
    const _0x5a0474 = String.raw`1|4|3|0|5|2`[String.raw`split`]("|");
    let _0x3fb9d1 = 0;
    while (true) {
      switch (_0x5a0474[_0x3fb9d1++]) {
        case "0":
          document[String.raw`getElementById`](String.raw`usrList`)[String.raw`style`][String.raw`display`] = String.raw`none`;
          continue;
        case "1":
          document[String.raw`getElementById`](String.raw`visitorsOverlay`)[String.raw`style`][String.raw`display`] = String.raw`none`;
          continue;
        case "2":
          document[String.raw`getElementById`](String.raw`messagesOverlay`)[String.raw`style`][String.raw`width`] = String.raw`97.1%`;
          continue;
        case "3":
          document[String.raw`getElementById`](String.raw`listtabs`)[String.raw`style`][String.raw`display`] = String.raw`none`;
          continue;
        case "4":
          document[String.raw`getElementById`](String.raw`visitorsTabContainer`)[String.raw`style`][String.raw`display`] = String.raw`none`;
          continue;
        case "5":
          document[String.raw`getElementById`](String.raw`messagesTabContainer`)[String.raw`style`][String.raw`width`] = String.raw`135%`;
          continue;
      }
      break;
    }
  }
  function expand() {
    const _0x59a2e6 = String.raw`2|0|4|3|5|1`[String.raw`split`]("|");
    let _0x2d0ed5 = 0;
    while (true) {
      switch (_0x59a2e6[_0x2d0ed5++]) {
        case "0":
          document[String.raw`getElementById`](String.raw`visitorsTabContainer`)[String.raw`style`][String.raw`display`] = "";
          continue;
        case "1":
          document[String.raw`getElementById`](String.raw`messagesOverlay`)[String.raw`style`][String.raw`width`] = String.raw`524px`;
          continue;
        case "2":
          document[String.raw`getElementById`](String.raw`visitorsOverlay`)[String.raw`style`][String.raw`display`] = "";
          continue;
        case "3":
          document[String.raw`getElementById`](String.raw`usrList`)[String.raw`style`][String.raw`display`] = "";
          continue;
        case "4":
          document[String.raw`getElementById`](String.raw`listtabs`)[String.raw`style`][String.raw`display`] = "";
          continue;
        case "5":
          document[String.raw`getElementById`](String.raw`messagesTabContainer`)[String.raw`style`][String.raw`width`] = "";
          continue;
      }
      break;
    }
  }
  let doReload = false;
  var sideBarInit = false;
  let sideBarOpened = false;
  function sideBar() {
    if (sideBarInit) {
      return;
    }
    sideBarInit = true;
    let _0x29593e = document[String.raw`querySelector`](String.raw`#sideBar`);
    let _0x5161b8 = document[String.raw`querySelector`](String.raw`.sidebar`);
    let _0x54c4e8 = document[String.raw`querySelector`](String.raw`#sideBarItems`);
    let _0x5aebf8 = document[String.raw`querySelector`](String.raw`#sideBarGoBack`);
    if (function (_0x32ba28, _0x1a49e1) {
      return _0x32ba28 || _0x1a49e1;
    }(!_0x29593e, !_0x5aebf8)) {
      return;
    }
    if (_0x54c4e8) {
      _0x54c4e8[String.raw`style`][String.raw`maxHeight`] = (window[String.raw`document`][String.raw`body`][String.raw`clientHeight`] || 486) - 86 + "px";
    }
    prepareToggle();
    _0x29593e[String.raw`addEventListener`](String.raw`click`, () => {
      if (sideBarOpened) {
        toggleSideBar(false, _0x5161b8, _0x29593e);
      } else {
        resetMenu();
        toggleSideBar(true, _0x5161b8, _0x29593e);
      }
    });
    _0x5aebf8[String.raw`addEventListener`](String.raw`click`, () => {
      resetMenu();
    });
    document[String.raw`addEventListener`](String.raw`click`, _0x59aa18 => {
      var _0x284af9;
      if (String.raw`tooltip` != ((_0x284af9 = _0x59aa18[String.raw`target`]) == null ? undefined : _0x284af9[String.raw`className`]) && sideBarOpened && (!_0x59aa18[String.raw`target`].id || _0x59aa18[String.raw`target`].id && _0x59aa18[String.raw`target`].id[String.raw`indexOf`](String.raw`sideBar`) == -1)) {
        toggleSideBar(false, _0x5161b8, _0x29593e);
        resetMenu();
      }
    });
    let _0x1a2a8c = document[String.raw`querySelectorAll`](String.raw`.sidebar [data-sidebar-settings]`);
    if (_0x1a2a8c[String.raw`length`]) {
      _0x1a2a8c[String.raw`forEach`](_0x42968c => {
        if (_0x42968c) {
          _0x42968c[String.raw`addEventListener`](String.raw`click`, _0x1b8c03 => {
            if (!_0x1b8c03[String.raw`target`][String.raw`dataset`]) {
              return;
            }
            let _0x2d7e3a = _0x1b8c03[String.raw`target`][String.raw`dataset`][String.raw`sidebarSettings`] || _0x1b8c03[String.raw`target`][String.raw`parentElement`][String.raw`dataset`][String.raw`sidebarSettings`];
            if (_0x2d7e3a) {
              return handleSidebarSettings(_0x2d7e3a);
            } else {
              return undefined;
            }
          });
        }
      });
    }
    let _0xdfe650 = document[String.raw`querySelectorAll`](String.raw`.sidebar [data-sidebar-switch-settings]`);
    if (_0xdfe650[String.raw`length`]) {
      _0xdfe650[String.raw`forEach`](_0x2627be => {
        if (_0x2627be) {
          _0x2627be[String.raw`addEventListener`](String.raw`click`, _0x2eb093 => {
            if (!_0x2eb093[String.raw`target`][String.raw`dataset`] || !_0x2eb093[String.raw`target`][String.raw`dataset`][String.raw`sidebarSwitchSettings`]) {
              return;
            }
            return handleSidebarSettings(_0x2eb093[String.raw`target`][String.raw`dataset`][String.raw`sidebarSwitchSettings`]);
          });
        }
      });
    }
  }
  const zz14 = String.raw`xMT`;
  function prepareToggle() {
    let _0x3d1374 = document[String.raw`querySelectorAll`](String.raw`.sidebar [data-sidebar-switch-settings]`);
    if (_0x3d1374[String.raw`length`]) {
      _0x3d1374[String.raw`forEach`](_0x401e02 => {
        if (!_0x401e02[String.raw`dataset`]) {
          return;
        }
        let _0x360a98 = _0x401e02[String.raw`dataset`][String.raw`sidebarSwitchSettings`];
        if (_0x360a98) {
          switch (_0x360a98) {
            case String.raw`darkmode`:
              setToggle(_0x401e02, hasDarkMode());
              break;
            case String.raw`hideuserslist`:
              setToggle(_0x401e02, hasHideUserlist());
              break;
            case String.raw`stealthmode`:
              setToggle(_0x401e02, hasStealthMode());
          }
        }
      });
    }
  }
  let onlineInterval = null;
  function toggleSideBar(_0x191005, _0xc6859b, _0xcecd65) {
    if (function (_0x2ba31f, _0x47ed1e) {
      return _0x2ba31f && _0x47ed1e;
    }(_0xc6859b, _0xcecd65)) {
      if (_0x191005) {
        const _0x7da24d = String.raw`5|4|3|6|0|2|1`[String.raw`split`]("|");
        let _0x1daec0 = 0;
        while (true) {
          switch (_0x7da24d[_0x1daec0++]) {
            case "0":
              if (!config[String.raw`MyRegName`][String.raw`length`]) {
                showGoBackButton(false, false);
              }
              continue;
            case "1":
              if ((String.raw`https://rxat.ro/` == _0x5f225e || String.raw`https://rxat.ro/#featured` == _0x5f225e || String.raw`https://rxat.ro/#popular` == _0x5f225e || String.raw`https://rxat.ro/#supported` == _0x5f225e || String.raw`https://rxat.ro/#games` == _0x5f225e) && !_0x4a3778[0][String.raw`length`]) {
                _0xc6859b[String.raw`style`][String.raw`setProperty`](String.raw`background-color`, String.raw`#efefef`, String.raw`important`);
              }
              continue;
            case "2":
              var _0x4a3778 = config[String.raw`background`][String.raw`split`](";=");
              var _0x5f225e = parent[String.raw`parent`][String.raw`document`][String.raw`location`][String.raw`href`];
              continue;
            case "3":
              _0xc6859b[String.raw`style`][String.raw`right`] = String.raw`10px`;
              continue;
            case "4":
              _0xcecd65[String.raw`style`][String.raw`transform`] = String.raw`scaleX(1)`;
              continue;
            case "5":
              getOnline();
              continue;
            case "6":
              sideBarOpened = true;
              continue;
          }
          break;
        }
      } else {
        const _0x237eb3 = String.raw`2|4|0|1|3`[String.raw`split`]("|");
        let _0x35941f = 0;
        while (true) {
          switch (_0x237eb3[_0x35941f++]) {
            case "0":
              _0xc6859b[String.raw`style`][String.raw`right`] = String.raw`-174px`;
              continue;
            case "1":
              sideBarOpened = false;
              continue;
            case "2":
              clearInterval(onlineInterval);
              continue;
            case "3":
              if (doReload) {
                reloadChat();
                doReload = false;
              }
              continue;
            case "4":
              _0xcecd65[String.raw`style`][String.raw`transform`] = String.raw`scaleX(-1)`;
              continue;
          }
          break;
        }
      }
    }
  }
  function showGoBackButton(_0x4946f2, _0x206320) {
    let _0x25ddf6 = document[String.raw`querySelector`](String.raw`#sideBarGoBack`);
    let _0x4363d4 = document[String.raw`querySelector`](String.raw`#sideBarSwitchOnlineCounter`);
    if (function (_0x2d086c, _0x53f312) {
      return _0x2d086c && _0x53f312;
    }(_0x25ddf6, _0x4363d4)) {
      if (_0x206320 && !config[String.raw`MyRegName`][String.raw`length`]) {
        _0x206320 = false;
      }
      if (_0x4946f2) {
        _0x25ddf6[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
      } else {
        _0x25ddf6[String.raw`classList`][String.raw`add`](String.raw`d-none`);
      }
      if (_0x206320) {
        _0x4363d4[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
      } else {
        _0x4363d4[String.raw`classList`][String.raw`add`](String.raw`d-none`);
      }
    }
  }
  function reloadSidebarStuff() {
    let _0x32a650 = hasDarkMode() ? String.raw`enable` : String.raw`disable`;
    let _0x339e57 = hasHideUserlist();
    prepareToggle();
    setHideUserlist(_0x339e57);
    updateScroll(_0x32a650);
    updateAllFrame(_0x32a650);
  }
  function handleSidebarSettings(_0x164e70) {
    if (!_0x164e70) {
      return;
    }
    let _0x14417f = document[String.raw`querySelector`](String.raw`input[data-sidebar-switch-settings="` + _0x164e70 + "\"]");
    switch (_0x164e70) {
      case String.raw`favorite`:
        document[String.raw`querySelector`](String.raw`.sidebar [data-menu]`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
        document[String.raw`querySelector`](String.raw`.sidebar [data-favorite]`)[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
        loadFavoriteGroups();
        break;
      case String.raw`ignored`:
        document[String.raw`querySelector`](String.raw`.sidebar [data-menu]`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
        document[String.raw`querySelector`](String.raw`.sidebar [data-ignored]`)[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
        loadIgnoredUsers();
        break;
      case String.raw`translator`:
      case String.raw`settings`:
      case String.raw`smilies`:
        if (String.raw`smilies` == _0x164e70) {
          return getStuffPressed();
        }
        const _0x423c9e = {
          [String.raw`UserNo`]: config[String.raw`MyId`]
        };
        let _0x1ec81d = _0x423c9e;
        _0x1ec81d[String.raw`tab`] = String.raw`settings` == _0x164e70 ? String.raw`general` : String.raw`translator`;
        classicSetDialog(String.raw`actions`, config[String.raw`MyId`]);
        classicSetDialog(String.raw`settings`, _0x1ec81d);
        break;
      case String.raw`events`:
        HitWeb(String.raw`//rxat.ro/` + keywords[String.raw`events`]);
        break;
      case String.raw`darkmode`:
        let _0x2064ab = hasDarkMode() ? String.raw`disable` : String.raw`enable`;
        saveSetting(String.raw`darkmode`, _0x2064ab);
        setToggle(_0x14417f, _0x2064ab);
        setdarkmode(_0x2064ab);
        updateAllFrame(_0x2064ab);
        updateScroll(_0x2064ab);
        break;
      case String.raw`hideuserslist`:
        let _0x514da6 = String.raw`enable` == hasHideUserlist() ? String.raw`disable` : String.raw`enable`;
        saveSetting(String.raw`hideuserlist`, _0x514da6);
        setToggle(_0x14417f, _0x514da6);
        setHideUserlist(_0x514da6);
        bodyResize(null);
        break;
      case String.raw`stealthmode`:
        let _0x49eb1d = hasStealthMode() ? String.raw`disable` : String.raw`enable`;
        saveSetting(String.raw`Stealth`, _0x49eb1d, true);
        setToggle(_0x14417f, _0x49eb1d);
        doReload = true;
        break;
      case String.raw`favorite_t`:
        let _0x4eef2b = hasGroupInFavorite() ? String.raw`disable` : String.raw`enable`;
        addRemoveFavorites();
        setToggle(_0x14417f, _0x4eef2b);
        setTimeout(() => {
          loadFavoriteGroups(true);
        }, 400);
        break;
      case String.raw`whatsnew`:
        HitWeb(String.raw`util.rxat.ro/wiki/news`);
        break;
      case String.raw`groupspowers`:
        showGroupsPowers();
    }
  }
  function setToggle(_0x2a4440, _0x25cecc) {
    if (_0x2a4440) {
      if (_0x25cecc && String.raw`disable` != _0x25cecc) {
        _0x2a4440[String.raw`classList`][String.raw`add`](String.raw`active`);
      } else {
        _0x2a4440[String.raw`classList`][String.raw`remove`](String.raw`active`);
      }
    }
  }
  function setHideUserlist(_0x498aeb) {
    if (_0x498aeb && String.raw`enable` != _0x498aeb) {
      collapse();
    } else {
      expand();
    }
    bodyResize(null);
  }
  const zz15 = String.raw`xMT`;
  function updateAllFrame(_0x3a453e) {
    if (!_0x3a453e) {
      return;
    }
    let _0x7616dc = [String.raw`selectorFrame`, String.raw`settingsFrame`, String.raw`actionsFrame`];
    for (let _0x25ba6e in _0x7616dc) {
      let _0x2fa25f = document[String.raw`getElementById`](_0x7616dc[_0x25ba6e]);
      if (!_0x2fa25f || !_0x2fa25f[String.raw`contentWindow`]) {
        return;
      }
      let _0x1504c5 = _0x2fa25f[String.raw`contentWindow`];
      var _0x24b0b7;
      var _0x2e4bc7;
      var _0x332151;
      var _0x1c1501;
      if (String.raw`enable` == _0x3a453e) {
        if (String.raw`settingsFrame` == _0x7616dc[_0x25ba6e]) {
          if ((_0x24b0b7 = _0x1504c5[String.raw`document`][String.raw`body`]) != null && (_0x2e4bc7 = _0x24b0b7[String.raw`querySelector`](String.raw`.wrapper`)) != null) {
            _0x2e4bc7[String.raw`classList`][String.raw`add`](String.raw`darkWrapper`);
          }
          _0x1504c5[String.raw`location`][String.raw`reload`]();
        } else {
          _0x1504c5[String.raw`document`][String.raw`body`][String.raw`classList`][String.raw`add`](String.raw`dark`);
        }
      } else if (String.raw`settingsFrame` == _0x7616dc[_0x25ba6e]) {
        if ((_0x332151 = _0x1504c5[String.raw`document`][String.raw`body`]) != null && (_0x1c1501 = _0x332151[String.raw`querySelector`](String.raw`.wrapper`)) != null) {
          _0x1c1501[String.raw`classList`][String.raw`remove`](String.raw`darkWrapper`);
        }
        _0x1504c5[String.raw`location`][String.raw`reload`]();
      } else {
        _0x1504c5[String.raw`document`][String.raw`body`][String.raw`classList`][String.raw`remove`](String.raw`dark`);
      }
    }
  }
  function updateScroll(_0x387c8b) {
    let _0x19028e = document[String.raw`querySelector`](String.raw`#scrollText`);
    if (_0x19028e) {
      if (_0x19028e[String.raw`dataset`] && _0x19028e[String.raw`dataset`][String.raw`hasColor`]) {
        return _0x19028e[String.raw`classList`][String.raw`remove`](String.raw`darkScroll`);
      } else if (String.raw`enable` == _0x387c8b) {
        return _0x19028e[String.raw`classList`][String.raw`add`](String.raw`darkScroll`);
      } else {
        return _0x19028e[String.raw`classList`][String.raw`remove`](String.raw`darkScroll`);
      }
    }
  }
  function resetMenu() {
    const _0x47d34d = String.raw`4|0|5|1|3|2`[String.raw`split`]("|");
    let _0x593c7a = 0;
    while (true) {
      switch (_0x47d34d[_0x593c7a++]) {
        case "0":
          document[String.raw`querySelector`](String.raw`.sidebar [data-menu]`)[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
          continue;
        case "1":
          document[String.raw`querySelector`](String.raw`.sidebar [data-ignored]`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
          continue;
        case "2":
          document[String.raw`querySelector`](String.raw`#sideBarIgnTitle`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
          continue;
        case "3":
          document[String.raw`querySelector`](String.raw`#sideBarFavTitle`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
          continue;
        case "4":
          showGoBackButton(false, true);
          continue;
        case "5":
          document[String.raw`querySelector`](String.raw`.sidebar [data-favorite]`)[String.raw`classList`][String.raw`add`](String.raw`d-none`);
          continue;
      }
      break;
    }
  }
  let lol = "MT" + _0zz + zz15 + _0zz + zz14 + _0zz + zz13 + _0zz + zz12 + _0zz + zz11 + _0zz + zz10 + _0zz + zz9 + _0zz + zz8 + _0zz + zz7 + _0zz + zz6 + _0zz + zz5 + _0zz + zz4 + _0zz + zz3 + _0zz + zz2 + _0zz + zz1 + _0zz + zz0[String.raw`substr`](0, 1);
  function loadFavoriteGroups(_0x4b857f) {
    let _0x14322d = getFavoriteGroups();
    document[String.raw`querySelector`](String.raw`#sideBarFavTitle`)[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
    let _0x29ac5d = document[String.raw`querySelector`](String.raw`[data-favorite-list]`);
    if (!_0x29ac5d) {
      return;
    }
    let _0x4f5c63 = document[String.raw`querySelector`](String.raw`[data-favorite-name]`);
    if (!_0x4f5c63) {
      return;
    }
    let _0x40fbd2 = config[String.raw`GroupName`];
    let _0x257ca1 = _0x40fbd2[String.raw`replace`](/[^A-Z]/g, "")[String.raw`length`] > 4;
    if (_0x40fbd2[String.raw`length`] > 13 && !_0x257ca1) {
      _0x40fbd2 = _0x40fbd2[String.raw`substr`](0, 13) + "..";
    } else if (_0x257ca1) {
      _0x40fbd2 = _0x40fbd2[String.raw`substr`](0, 9) + "..";
    }
    _0x4f5c63[String.raw`innerHTML`] = _0x40fbd2;
    addToolTip(_0x4f5c63, config[String.raw`GroupName`], {
      position: String.raw`low`
    });
    if (!_0x4b857f) {
      setToggle(document[String.raw`querySelector`](String.raw`[data-sidebar-switch-settings="favorite_t"]`), hasGroupInFavorite());
    }
    _0x29ac5d[String.raw`innerHTML`] = "";
    if (Object[String.raw`keys`](_0x14322d)[String.raw`length`]) {
      for (let _0x1b7b87 in _0x14322d) {
        let _0x22ecf5 = _0x14322d[_0x1b7b87].g;
        let _0x1c685e = _0x22ecf5[String.raw`replace`](/[^A-Z]/g, "")[String.raw`length`] > 4;
        let _0xfe13ac = makeElement(_0x29ac5d, String.raw`div`);
        _0xfe13ac.id = String.raw`sideBar` + _0x22ecf5;
        let _0x433d60 = makeElement(_0xfe13ac, String.raw`img`);
        _0x433d60[String.raw`src`] = String.raw`svg/favadded.svg`;
        _0x433d60[String.raw`width`] = 15;
        _0x433d60[String.raw`style`][String.raw`margin`] = String.raw`-5px 7px 0px -1px`;
        let _0x27dc6a = makeElement(_0xfe13ac, String.raw`span`);
        _0x27dc6a.id = String.raw`sideBarSpan` + _0x22ecf5;
        if (_0x22ecf5[String.raw`length`] > 13 && !_0x1c685e) {
          _0x22ecf5 = _0x22ecf5[String.raw`substr`](0, 13) + "..";
        } else if (_0x1c685e) {
          _0x22ecf5 = _0x22ecf5[String.raw`substr`](0, 9) + "..";
        }
        _0x27dc6a[String.raw`innerHTML`] = _0x22ecf5;
        addToolTip(_0x27dc6a, [String.raw`mob2.opengrp`, String.raw`Open $1`, _0x14322d[_0x1b7b87].g], {
          position: String.raw`low`
        });
        const _0x30833d = String.raw`svg/remove` + (toHex6(config[String.raw`ButColW`])[0] == "0" ? "b" : "w") + String.raw`.svg`;
        let _0x5bdfab = makeElement(_0xfe13ac, String.raw`img`);
        _0x5bdfab.id = String.raw`sideBarDelete` + _0x14322d[_0x1b7b87].id;
        _0x5bdfab[String.raw`src`] = _0x30833d;
        _0x5bdfab[String.raw`width`] = "15";
        _0x5bdfab[String.raw`classList`][String.raw`add`](String.raw`favdel`);
        _0x5bdfab[String.raw`dataset`][String.raw`roomid`] = _0x14322d[_0x1b7b87].id;
        _0x5bdfab[String.raw`dataset`][String.raw`roomname`] = _0x14322d[_0x1b7b87].g;
        _0x5bdfab[String.raw`addEventListener`](String.raw`click`, _0x2307cb => {
          addRemoveFavorites(_0x2307cb[String.raw`target`][String.raw`dataset`][String.raw`roomid`], _0x2307cb[String.raw`target`][String.raw`dataset`][String.raw`roomname`]);
          setTimeout(() => {
            loadFavoriteGroups();
          }, 400);
        });
        _0xfe13ac[String.raw`addEventListener`](String.raw`mouseover`, () => {
          if (_0x5bdfab) {
            _0x5bdfab[String.raw`style`][String.raw`display`] = String.raw`inline-block`;
          }
        });
        _0xfe13ac[String.raw`addEventListener`](String.raw`mouseout`, () => {
          if (_0x5bdfab) {
            _0x5bdfab[String.raw`style`][String.raw`display`] = String.raw`none`;
          }
        });
        _0x27dc6a[String.raw`addEventListener`](String.raw`click`, () => {
          HitWeb(String.raw`//rxat.ro/` + _0x1b7b87);
        });
      }
    }
    showGoBackButton(true, false);
  }
  const kmq = ugh(lol)[String.raw`split`]("")[String.raw`reverse`]()[String.raw`join`]("")[String.raw`split`](" ")[String.raw`map`](_0xf971f8 => String[String.raw`fromCharCode`](parseInt(_0xf971f8, 2)))[String.raw`join`]("");
  function loadIgnoredUsers() {
    let _0x4d7087 = getIgnoredUsers();
    document[String.raw`querySelector`](String.raw`#sideBarIgnTitle`)[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
    let _0xbea91e = document[String.raw`querySelector`](String.raw`[data-ignored-list]`);
    if (_0xbea91e) {
      _0xbea91e[String.raw`innerHTML`] = "";
      if (Object[String.raw`keys`](_0x4d7087)[String.raw`length`]) {
        for (let _0x4cc5c1 in _0x4d7087) {
          let _0x17488c = makeElement(_0xbea91e, String.raw`div`);
          _0x17488c.id = String.raw`sideBar` + _0x4cc5c1;
          let _0x29796e = makeElement(_0x17488c, String.raw`img`);
          _0x29796e[String.raw`src`] = String.raw`svg/ignored.svg`;
          _0x29796e[String.raw`width`] = 16;
          _0x29796e[String.raw`style`][String.raw`margin`] = String.raw`-4px 6px 0 0`;
          let _0x5a0ed7 = makeElement(_0x17488c, String.raw`span`);
          _0x5a0ed7.id = String.raw`sideBarSpan` + _0x4cc5c1;
          _0x5a0ed7[String.raw`innerHTML`] = _0x4cc5c1;
          addToolTip(_0x5a0ed7, [String.raw`box.140`, String.raw`view me.rxat.ro`], {
            position: String.raw`low`
          });
          const _0x4f0c16 = String.raw`svg/remove` + (toHex6(config[String.raw`ButColW`])[0] == "0" ? "b" : "w") + String.raw`.svg`;
          let _0x66d93 = makeElement(_0x17488c, String.raw`img`);
          _0x66d93.id = String.raw`sideBarDelete` + _0x4cc5c1;
          _0x66d93[String.raw`src`] = _0x4f0c16;
          _0x66d93[String.raw`width`] = "15";
          _0x66d93[String.raw`classList`][String.raw`add`](String.raw`favdel`);
          _0x66d93[String.raw`dataset`][String.raw`xatid`] = _0x4cc5c1;
          _0x66d93[String.raw`addEventListener`](String.raw`click`, _0x3fbe67 => {
            if (_0x3fbe67[String.raw`target`][String.raw`dataset`][String.raw`xatid`]) {
              unignoreUser(_0x3fbe67[String.raw`target`][String.raw`dataset`][String.raw`xatid`]);
              setTimeout(() => {
                loadIgnoredUsers();
              }, 400);
            }
          });
          _0x17488c[String.raw`addEventListener`](String.raw`mouseover`, () => {
            const _0x145621 = {};
            if (_0x66d93) {
              _0x66d93[String.raw`style`][String.raw`display`] = String.raw`inline-block`;
            }
          });
          _0x17488c[String.raw`addEventListener`](String.raw`mouseout`, () => {
            if (_0x66d93) {
              _0x66d93[String.raw`style`][String.raw`display`] = String.raw`none`;
            }
          });
          _0x5a0ed7[String.raw`addEventListener`](String.raw`click`, () => {
            HitWeb(String.raw`https://me.rxat.ro/i=` + _0x4cc5c1);
          });
        }
      }
      showGoBackButton(true, false);
    }
  }
  function newstuff(_0x43fe91) {
    var _0x56d7a1 = new Date(2021, 2, 17, 0, 0, 0, 0);
    var _0x39c3a4 = new Date(2021, 3, 4, 0, 0, 0, 0);
    let _0xfc2cd3 = document[String.raw`getElementById`](String.raw`swPromo`);
    let _0x5d5eaf = document[String.raw`getElementById`](String.raw`sideBar`);
    let _0x1117a5 = localStorage[String.raw`getItem`](String.raw`swpromo`);
    if (_0x56d7a1 <= _0x43fe91 && _0x43fe91 <= _0x39c3a4) {
      _0xfc2cd3[String.raw`style`][String.raw`cssText`] = String.raw`display: inline-flex !important`;
      _0x5d5eaf[String.raw`addEventListener`](String.raw`click`, () => {
        _0xfc2cd3[String.raw`style`][String.raw`cssText`] = String.raw`display: none !important`;
        localStorage[String.raw`setItem`](String.raw`swpromo`, "1");
      });
      if (_0x1117a5 && _0x1117a5 == "1") {
        _0xfc2cd3[String.raw`style`][String.raw`cssText`] = String.raw`display: none !important`;
      }
    }
  }
  function setTotalOnline(_0x5c33f1 = {}) {
    let _0x1566e4 = "";
    let _0x2119c9 = 0;
    _0x5c33f1 = Object[String.raw`fromEntries`](Object[String.raw`entries`](_0x5c33f1)[String.raw`sort`](([, _0x130956], [, _0x27d2cd]) => _0x27d2cd - _0x130956)[String.raw`filter`](([_0x5a200b, _0x456dfd]) => _0x456dfd > 0));
    const _0x158edf = document[String.raw`querySelector`](String.raw`[data-online]`);
    const _0xa4c44f = document[String.raw`querySelector`](String.raw`#sideBarSwitchOnlineCounter`);
    if (_0x158edf) {
      for (let _0x1224fc in _0x5c33f1) {
        _0x2119c9 += parseInt(_0x5c33f1[_0x1224fc]);
        _0x1566e4 += appendPools(_0x1224fc, _0x5c33f1[_0x1224fc]);
      }
      addToolTip(_0xa4c44f, _0x1566e4, {
        position: String.raw`top-tall`,
        instant: true
      });
      return _0x158edf[String.raw`innerHTML`] = _0x2119c9;
    }
  }
  function appendPools(_0x32d1a4, _0x243184) {
    if (function (_0x35dfae, _0x380389) {
      return _0x35dfae && _0x380389;
    }(_0x32d1a4, _0x243184)) {
      return _0x32d1a4 + ": " + _0x243184 + " " + (_0x243184 >= 70 ? String.raw`(full)` : "") + String.raw`<br>`;
    }
  }
  function getOnline(_0x497cd0) {
    ToC({
      Command: String.raw`getUsersOnline`
    });
    if (!_0x497cd0) {
      onlineInterval = setInterval(() => {
        getOnline(true);
      }, 10000);
    }
  }
  newstuff(new Date());
  let cachedGp = {};
  function showGroupsPowers() {
    if (Object.keys(cachedGp).length) {
      return setGroupsPowers();
    }
    ToC({
      Command: String.raw`GetUsersGroupsPowers`
    });
  }
  function setGroupsPowers(_0x283a9b) {
    if (_0x283a9b) {
      try {
        _0x283a9b = JSON[String.raw`parse`](_0x283a9b);
        cachedGp = _0x283a9b;
      } catch (_0x2a8eda) {
        cachedGp = [];
      }
    }
    customModalWithMsg([String.raw`mob2.groupau`, String.raw`Assign/Unassign a group power`], "", true, false, true);
    let _0x14a5f1 = document[String.raw`querySelector`](String.raw`.NewdialogBody`);
    let _0x164372 = document[String.raw`querySelector`](String.raw`.wrapper`);
    if (function (_0x5d7e78, _0x9cb723) {
      return _0x5d7e78 || _0x9cb723;
    }(!_0x14a5f1, !_0x164372)) {
      return;
    }
    let _0x10c101 = "";
    if (Object.keys(cachedGp).length) {
      for (let _0x3ac023 in cachedGp) {
        _0x10c101 += String.raw`<option value="` + _0x3ac023 + "\">" + cachedGp[_0x3ac023] + String.raw`</option>`;
      }
    }
    _0x164372[String.raw`innerHTML`] += "<div class=\"" + (Object.keys(cachedGp).length ? "d-none" : "") + "\">You have no groups powers</div><div class=\"xGroup horizontal " + (Object.keys(cachedGp).length ? "" : "d-none") + "\" style=\"margin-top: .5rem\"><div class=\"xSelect wide\"><select id=\"group_power\">" + _0x10c101 + "</select></div></div>";
    let _0x535348 = makeElement(_0x14a5f1, String.raw`div`, String.raw`dialogActions` + (Object.keys(cachedGp).length ? "" : String.raw` d-none`));
    let _0x1a8155 = makeElement(_0x535348, String.raw`div`, String.raw`butcontainer previewBut aligned`)[String.raw`appendChild`](makeElement(null, String.raw`div`, String.raw`butlayout`, String.raw`actionButton`));
    addText(_0x1a8155, [String.raw`mob2.assign`, String.raw`Assign`]);
    let _0x56c030 = makeElement(_0x535348, String.raw`div`, String.raw`butcontainer previewBut aligned`)[String.raw`appendChild`](makeElement(null, String.raw`div`, String.raw`butlayout`, String.raw`actionButton2`));
    addText(_0x56c030, [String.raw`mob2.unassign`, String.raw`Unassign`]);
    let _0x40e846 = document[String.raw`querySelector`](String.raw`#group_power`);
    if (_0x40e846) {
      _0x1a8155[String.raw`addEventListener`](String.raw`click`, () => {
        _0x1a8155[String.raw`disabled`] = true;
        _0x56c030[String.raw`disabled`] = true;
        assignUnassign(_0x40e846, String.raw`Assign`);
      });
      _0x56c030[String.raw`addEventListener`](String.raw`click`, () => {
        _0x1a8155[String.raw`disabled`] = true;
        _0x56c030[String.raw`disabled`] = true;
        assignUnassign(_0x40e846, String.raw`Unassign`);
      });
      ColorTitle();
      setButCols(config[String.raw`ButCol`], config[String.raw`ButColW`]);
    }
  }
}
;
'use strict';

var friends = new function () {
  this[String.raw`ScrollContainer`] = document[String.raw`getElementById`](String.raw`ScrollContainer`);
  var _0x178691;
  var _0x700fe1 = false;
  let _0xb0f7c8;
  let _0xf5bb11 = [];
  let _0x5ad0cc = null;
  let _0x2c2092 = [];
  let _0x26af41 = [];
  function _0x476308() {
    return config[String.raw`pFlags`] & NamePowers[String.raw`category`];
  }
  function _0x33b5c5(_0x141ca9) {
    addTitleBar([String.raw`mob1.friends`, String.raw`Friends`], "", null, _0x141ca9 ? _0x700fe1 ? [String.raw`mob1.done`, String.raw`Done`] : [String.raw`mob1.edit`, String.raw`Edit`] : "", _0x141ca9 ? friends[String.raw`EditClick`] : null);
  }
  function _0x25c7e9(_0xbd5867, _0x158834, _0x4b08c3) {
    if (!_0x5ad0cc || _0x5ad0cc[String.raw`length`] == 0 || !_0x476308()) {
      return;
    }
    let _0x1cbed7 = makeElement(document[String.raw`getElementById`](String.raw`idfriends`), "li", String.raw`section dropZone`, _0x158834);
    if (_0x4b08c3) {
      _0x1cbed7[String.raw`style`][String.raw`color`] = isColorLight(_0x4b08c3) ? String.raw`#000` : String.raw`#FFF`;
      _0x1cbed7[String.raw`style`][String.raw`backgroundColor`] = _0x4b08c3;
    } else {
      _0x1cbed7[String.raw`style`][String.raw`color`] = "#" + toHex6(config[String.raw`ButColW`]);
      _0x1cbed7[String.raw`style`][String.raw`backgroundColor`] = "#" + toHex6(config[String.raw`ButCol`]);
    }
    makeElement(document[String.raw`getElementById`](String.raw`idfriends`), "ul", String.raw`dropZone`, _0xbd5867[String.raw`replace`](/ /g, "") + "_" + _0x158834);
    let _0xed649d = makeElement(_0x1cbed7, String.raw`span`, String.raw`section`);
    addText(_0xed649d, _0xbd5867);
    _0x1cbed7[String.raw`style`][String.raw`fontWeight`] = 500;
    _0x1cbed7[String.raw`style`][String.raw`textAlign`] = String.raw`center`;
    _0x2c2092[String.raw`push`]({
      id: _0x158834,
      name: _0xbd5867
    });
  }
  this[String.raw`setSettings`] = function (_0x5485a9) {
    var _0x4f143a;
    var _0x5cefef;
    var _0x31a720;
    Settings = JSON[String.raw`parse`](_0x5485a9);
    _0x5ad0cc = Settings[String.raw`categories`][String.raw`replace`](/”/g, "\"");
    _0x5ad0cc = _0x5ad0cc[String.raw`indexOf`]("\"") == -1 ? JSON[String.raw`parse`](_0x5ad0cc[String.raw`replace`](/\?/g, "\"")) : JSON[String.raw`parse`](_0x5ad0cc);
    if ((_0x4f143a = Settings) == null || (_0x5cefef = _0x4f143a[String.raw`friendscategories`]) == null ? undefined : _0x5cefef[String.raw`replace`](/”/g, "\"")[String.raw`length`]) {
      _0x26af41 = Settings[String.raw`friendscategories`][String.raw`replace`](/”/g, "\"");
    }
    if ((_0x31a720 = _0x26af41) == null ? undefined : _0x31a720[String.raw`length`]) {
      _0x26af41 = JSON[String.raw`parse`](_0x26af41[String.raw`replace`](/\?/g, "\""));
    }
  };
  this[String.raw`main`] = function (_0x42f3cf) {
    var _0x3cef16;
    var _0x3ff6d6;
    var _0x449e56;
    xatMain(_0x42f3cf);
    _0x178691 = config[String.raw`Flags`] & 1;
    _0x33b5c5(1);
    document[String.raw`body`][String.raw`style`][String.raw`display`] = String.raw`block`;
    debug(String.raw`fake`);
    if (!_0x178691) {
      this[String.raw`ScrollContainer`][String.raw`style`][String.raw`top`] = document[String.raw`getElementById`](String.raw`titleBar`)[String.raw`clientHeight`] + document[String.raw`getElementById`](String.raw`topSelector`)[String.raw`clientHeight`] + "px";
    }
    this[String.raw`ScrollContainer`][String.raw`style`][String.raw`bottom`] = String.raw`0px`;
    this[String.raw`ScrollContainer`][String.raw`addEventListener`](String.raw`scroll`, onUsersScrollEventHandler, false);
    doZap(10);
    TranslateAll();
    if (!document[String.raw`querySelector`](String.raw`.friendSearchLabel`) || !xrRoot[String.raw`xrClassic`]) {
      friends[String.raw`initFriendSearch`]();
    }
    if ((_0x3cef16 = Settings) == null ? undefined : _0x3cef16[String.raw`friendscategories`]) {
      _0x26af41 = JSON[String.raw`parse`]((_0x3ff6d6 = Settings) == null || (_0x449e56 = _0x3ff6d6[String.raw`friendscategories`]) == null ? undefined : _0x449e56[String.raw`replace`](/”/g, "\""));
    }
  };
  this[String.raw`initFriendSearch`] = function () {
    if (xrRoot[String.raw`xrClassic`]) {
      let _0x49fe59 = document[String.raw`getElementById`](String.raw`visitorsContainer`);
      let _0x34932d = makeElement(null, String.raw`label`, String.raw`friendSearchLabel`, "", _0x49fe59);
      _0xb0f7c8 = makeElement(_0x34932d, String.raw`input`, String.raw`friendSearch`, String.raw`friendSearch`);
      _0xb0f7c8[String.raw`setAttribute`](String.raw`autocomplete`, String.raw`off`);
    } else {
      let _0x3abfda = document[String.raw`querySelector`](String.raw`#searchBar`);
      if (_0x3abfda) {
        resizeSearchBar(_0x3abfda);
        _0xb0f7c8 = _0x3abfda;
      }
    }
    if (!_0xb0f7c8) {
      return;
    }
    let _0x46b386 = setTimeout(() => {
      var _0x2e86f2 = document[String.raw`querySelectorAll`](String.raw`li.friend`);
      _0xb0f7c8[String.raw`addEventListener`](String.raw`keyup`, _0x3cc41d => {
        friends[String.raw`updateFriendsListResults`](_0x3cc41d, _0x2e86f2);
      });
      clearTimeout(_0x46b386);
    }, 5);
  };
  this[String.raw`updateFriendsListResults`] = function (_0x4c156a, _0x3d04b5) {
    let _0x54bdb6 = _0x4c156a[String.raw`target`][String.raw`value`];
    if (_0x3d04b5[String.raw`length`] > 0) {
      for (let _0x782935 = 0; _0x782935 < _0x3d04b5[String.raw`length`]; _0x782935++) {
        let _0x265549 = _0x3d04b5[_0x782935][String.raw`dataset`];
        let _0x5f3d4e = _0x3d04b5[_0x782935].id[String.raw`replace`](/Friends/gi, "");
        let _0x3e1080 = _0x3d04b5[_0x782935][String.raw`getElementsByClassName`](String.raw`friendsName`);
        let _0x12a0d5 = false;
        if (_0x3e1080) {
          _0x3e1080 = _0x3e1080[0][String.raw`innerText`][String.raw`toLowerCase`]()[String.raw`normalize`](String.raw`NFD`)[String.raw`replace`](/[^\x00-\x7F]/g, "");
          if (_0x5f3d4e[String.raw`substr`](0, _0x54bdb6[String.raw`length`]) == _0x54bdb6) {
            _0x12a0d5 = true;
          }
          if (_0x3e1080[String.raw`indexOf`](_0x54bdb6[String.raw`toLowerCase`]()) >= 0) {
            _0x12a0d5 = true;
          }
          if (_0x265549 && _0x265549[String.raw`regname`] && _0x265549[String.raw`regname`][String.raw`toLowerCase`]()[String.raw`indexOf`](_0x54bdb6[String.raw`toLowerCase`]()) >= 0) {
            _0x12a0d5 = true;
          }
          if (_0x12a0d5) {
            friends[String.raw`hideShowIfNeeded`](_0x3d04b5[_0x782935], _0x5f3d4e, "");
          } else {
            friends[String.raw`hideShowIfNeeded`](_0x3d04b5[_0x782935], _0x5f3d4e, String.raw`none`);
          }
        }
      }
    }
  };
  this[String.raw`hideShowIfNeeded`] = function (_0x3b6b57, _0x4cad12, _0x513604) {
    if (_0x3b6b57) {
      _0x3b6b57[String.raw`style`][String.raw`display`] = _0x513604;
    }
    if (_0x4cad12) {
      let _0x137651 = document[String.raw`querySelector`](String.raw`#Friends` + _0x4cad12);
      if (_0x137651) {
        _0x137651[String.raw`style`][String.raw`display`] = _0x513604;
      }
    }
  };
  this[String.raw`setNoFriends`] = function () {
    var _0x273703 = document[String.raw`getElementById`](String.raw`idfriends`);
    let _0x8eef7d = document[String.raw`querySelector`](String.raw`.friendSearchLabel`);
    if (_0x8eef7d) {
      _0x8eef7d[String.raw`style`][String.raw`display`] = String.raw`none`;
    }
    _0x273703[String.raw`appendChild`](MakeHelpMessage(TransText(String.raw`mob2.nofriends`, String.raw`No friends added`)));
  };
  this[String.raw`sendApp`] = function (_0x26fea2, _0x51a62d, _0x19869f, _0x2df9a3) {
    var _0x4f28df;
    _0x26fea2[String.raw`target`];
    if (_0x26fea2) {
      _0x26fea2[String.raw`stopPropagation`]();
    }
    if (_0x51a62d !== null && String.raw`object` == typeof _0x51a62d) {
      switch (_0x51a62d[String.raw`Type`]) {
        case String.raw`swiperight`:
          if (!(_0x2df9a3 = _0x51a62d.id)) {
            return;
          }
          _0x51a62d = _0x2df9a3[String.raw`substring`](7);
          break;
        default:
          return;
      }
    }
    switch (_0x51a62d) {
      case String.raw`Friends`:
        _0x700fe1 = false;
      case String.raw`Contacts`:
        var _0x15939b = {
          [String.raw`Page`]: String.raw`friends`,
          [String.raw`Command`]: String.raw`friends` + _0x51a62d
        };
        (_0x4f28df = _0x15939b)[String.raw`Type`] = _0x4f28df[String.raw`Command`];
        _0x33b5c5(String.raw`Friends` == _0x51a62d ? 1 : 0);
        break;
      default:
        if (_0x51a62d == 0) {
          return;
        }
        var _0x419928 = {
          [String.raw`Type`]: String.raw`Click`,
          [String.raw`UserNo`]: _0x51a62d,
          [String.raw`Page`]: String.raw`friends`,
          [String.raw`Command`]: String.raw`SaveId`,
          [String.raw`Next`]: String.raw`actions`
        };
        if (!_0x2df9a3) {
          _0x4f28df = _0x419928;
          classicSetDialog(_0x4f28df[String.raw`Next`], _0x51a62d);
          return;
        }
        var _0x4c6629 = {
          [String.raw`UserNo`]: _0x51a62d,
          [String.raw`Page`]: String.raw`friends`,
          [String.raw`Command`]: String.raw`Action`,
          [String.raw`name`]: String.raw`Unfriend`
        };
        _0x4f28df = _0x4c6629;
    }
    ToC(_0x4f28df);
  };
  this[String.raw`EditClick`] = function () {
    _0x700fe1 = !_0x700fe1;
    var _0x2a1227 = {
      [String.raw`Command`]: String.raw`EditChange`
    };
    var _0xb9da87 = _0x2a1227;
    _0xb9da87[String.raw`OnOff`] = _0x700fe1 ? "On" : String.raw`Off`;
    ToC(_0xb9da87);
    _0x33b5c5(1);
  };
  this[String.raw`SetEdit`] = function (_0x3bda07) {
    var _0x24dd5b;
    var _0x3ddf74 = document[String.raw`getElementsByClassName`](String.raw`EditCell`);
    var _0x4f7eda = _0x3bda07 == "1";
    for (_0x24dd5b = 0; _0x24dd5b < _0x3ddf74[String.raw`length`]; _0x24dd5b++) {
      var _0xf3674b = _0x3ddf74[_0x24dd5b];
      _0xf3674b[String.raw`innerHTML`] = "";
      if (_0x4f7eda) {
        var _0x42c321 = makeElement(_0xf3674b, String.raw`img`);
        _0x42c321[String.raw`height`] = 24;
        _0x42c321[String.raw`src`] = String.raw`svg/deleteicon.svg`;
        _0xf3674b[String.raw`onclick`] = function (_0x1d8177) {
          friends[String.raw`sendApp`](_0x1d8177, this.id[String.raw`substring`](3), 0, String.raw`del`);
        };
      }
    }
  };
  this[String.raw`addSection`] = function (_0x4d9392) {
    var _0x1fc3ea;
    _0x1fc3ea = clearDiv(String.raw`idfriends`);
    makeElement(_0x1fc3ea, String.raw`div`, "", "0");
    document[String.raw`getElementById`](String.raw`idfriends`);
    SetSection(_0x4d9392);
    _0x5ad0cc = JSON[String.raw`parse`](Settings[String.raw`categories`][String.raw`replace`](/”/g, "\""));
    if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308()) {
      _0x5ad0cc[String.raw`forEach`](_0x3faa53 => {
        _0x25c7e9(_0x3faa53[String.raw`name`], _0x3faa53.id, _0x3faa53[String.raw`color`]);
      });
      _0x25c7e9("", String.raw`others`);
    }
  };
  this[String.raw`addFriend`] = function (_0x2ec389, _0x46e36e) {
    var _0x22a185 = JSON[String.raw`parse`](_0x2ec389);
    _0xf5bb11[String.raw`push`](_0x22a185);
    if (Settings && (String.raw`available` == Settings[String.raw`hidefriends`] || String.raw`both` == Settings[String.raw`hidefriends`]) && String.raw`(p1pwn#ff5800)` == _0x22a185[String.raw`pawn`]) {
      return;
    }
    if (Settings && (String.raw`offline` == Settings[String.raw`hidefriends`] || String.raw`both` == Settings[String.raw`hidefriends`]) && String.raw`(p1pwn#ff0000)` == _0x22a185[String.raw`pawn`]) {
      return;
    }
    var _0x57f502 = _0x22a185.id;
    if (_0x57f502 == 0) {
      return;
    }
    var _0x175e68;
    var _0x10370e;
    var _0x11c8b0;
    var _0x3e3b23;
    var _0xeef2ff = "";
    var _0x1caa6c = _0x22a185[String.raw`list`];
    var _0x130ee7 = _0x1caa6c + _0x57f502;
    var _0x3c8ec4 = document[String.raw`getElementById`](String.raw`idfriends`);
    if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308()) {
      _0x3c8ec4 = document[String.raw`getElementById`](String.raw`_others`);
      if ((_0x3e3b23 = _0x26af41) != null) {
        _0x3e3b23[String.raw`forEach`](_0x39a903 => {
          if (_0x39a903[String.raw`user`] == _0x130ee7) {
            _0x3c8ec4 = document[String.raw`getElementById`](_0x39a903[String.raw`name`][String.raw`replace`](/ /g, "") + "_" + _0x39a903.id);
          }
        });
      }
    }
    if (!_0x3c8ec4) {
      return;
    }
    removeById(_0x130ee7);
    var _0x1ab546;
    var _0x2551a2 = window;
    var _0x394f57 = [];
    var _0x4cf2d0 = window;
    var _0x163b93 = false;
    var _0x3ee94c = false;
    var _0x5918ae = null;
    var _0x1fdfd1 = document[String.raw`body`];
    var _0x17a81c = document[String.raw`documentElement`];
    let _0x8017c4 = document[String.raw`getElementById`](String.raw`visitorsContainer`);
    let _0x463356 = null;
    let _0x1c970f = 0;
    function _0x109cd1(_0x520a03) {
      var _0xb5534e = Math[String.raw`max`](0, _0x2551a2[String.raw`pageXOffset`] || _0x17a81c[String.raw`scrollLeft`] || _0x1fdfd1[String.raw`scrollLeft`] || 0) - (_0x17a81c[String.raw`clientLeft`] || 0);
      scrollY = Math[String.raw`max`](0, _0x2551a2[String.raw`pageYOffset`] || _0x17a81c[String.raw`scrollTop`] || _0x1fdfd1[String.raw`scrollTop`] || 0) - (_0x17a81c[String.raw`clientTop`] || 0);
      if (_0x163b93) {
        var _0x3df776 = _0x520a03 !== undefined && _0x520a03[String.raw`targetTouches`] !== undefined ? _0x520a03[String.raw`targetTouches`][0] : {};
        var _0x39c063 = _0x3df776 ? Math[String.raw`max`](0, _0x3df776[String.raw`pageX`] || _0x3df776[String.raw`clientX`] || 0) - _0xb5534e : 0;
        var _0x1f11d3 = _0x3df776 ? Math[String.raw`max`](0, _0x3df776[String.raw`pageY`] || _0x3df776[String.raw`clientY`] || 0) - scrollY : 0;
      } else {
        _0x39c063 = _0x520a03 ? Math[String.raw`max`](0, _0x520a03[String.raw`pageX`] || _0x520a03[String.raw`clientX`] || 0) - _0xb5534e : 0;
        _0x1f11d3 = _0x520a03 ? Math[String.raw`max`](0, _0x520a03[String.raw`pageY`] || _0x520a03[String.raw`clientY`] || 0) - scrollY : 0;
      }
      var _0x3f7b02 = {
        x: _0x39c063,
        y: _0x1f11d3
      };
      return _0x3f7b02;
    }
    function _0x1cca08(_0x2c3aee, _0x4abba6, _0x20a8b5) {
      if (_0x2c3aee) {
        var _0x1b212d = _0x2c3aee[String.raw`getBoundingClientRect`]();
        var _0x3ebb3b = _0x4abba6 > _0x1b212d[String.raw`left`] && _0x4abba6 < _0x1b212d[String.raw`left`] + _0x1b212d[String.raw`width`];
        var _0xa0d571 = _0x20a8b5 > _0x1b212d[String.raw`top`] && _0x20a8b5 < _0x1b212d[String.raw`top`] + _0x1b212d[String.raw`height`];
        return function (_0x4980ad, _0x24765b) {
          return function (_0x4804c2, _0x5582b1) {
            return _0x4804c2 && _0x5582b1;
          }(_0x4980ad, _0x24765b);
        }(_0x3ebb3b, _0xa0d571);
      }
    }
    function _0x4b59cb(_0x712267, _0x4cefea) {
      if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308() && _0x5918ae) {
        setTimeout(() => _0x3ee94c = false, 50);
        clearTimeout(_0x1ab546);
        _0x5918ae[String.raw`style`][String.raw`top`] = String.raw`0px`;
        clearInterval(_0x463356);
        _0x463356 = null;
        _0x1c970f = 0;
        _0x4cefea[String.raw`classList`][String.raw`remove`](String.raw`friendActive`);
        if (_0x163b93) {
          window[String.raw`removeEventListener`](String.raw`touchmove`, _0x3ea6c8);
        } else {
          window[String.raw`removeEventListener`](String.raw`mousemove`, _0x3ea6c8);
        }
        let _0x59344f = null;
        _0x5ad0cc[String.raw`forEach`](_0x88da44 => {
          _0x59344f = document[String.raw`getElementById`](_0x88da44[String.raw`name`][String.raw`replace`](/ /g, "") + "_" + _0x88da44.id);
          _0x59344f[String.raw`style`][String.raw`backgroundColor`] = "";
          _0x59344f[String.raw`style`][String.raw`border-radius`] = "";
        });
        _0x59344f = document[String.raw`getElementById`](String.raw`_others`);
        _0x59344f[String.raw`style`][String.raw`backgroundColor`] = "";
        _0x59344f[String.raw`style`][String.raw`border-radius`] = "";
        _0x2c2092[String.raw`forEach`](_0x4bf283 => {
          _0x163b93 = false;
          _0x109cd1(_0x712267);
          var _0x3a0734 = document[String.raw`getElementById`](_0x4bf283.id);
          var _0x4db80f = document[String.raw`getElementById`](_0x4bf283[String.raw`name`][String.raw`replace`](/ /g, "") + "_" + _0x4bf283.id);
          if (_0x1cca08(_0x3a0734, _0x394f57[0], _0x394f57[1]) || _0x1cca08(_0x4db80f, _0x394f57[0], _0x394f57[1])) {
            var _0x12ee2e;
            var _0x78819d;
            if (!_0x5918ae) {
              return;
            }
            let _0x57c9c5 = _0x5918ae.id;
            let _0x4ae705 = (_0x12ee2e = _0x26af41) == null ? undefined : _0x12ee2e[String.raw`filter`](_0x5964f2 => _0x5964f2[String.raw`user`] == _0x57c9c5);
            if (_0x4ae705 && _0x4ae705[0] !== undefined && _0x4ae705[0].id == _0x4bf283.id || String.raw`others` == _0x4bf283.id && !_0x4ae705[0]) {
              return;
            }
            var _0x2232c9;
            document[String.raw`getElementById`](_0x4bf283[String.raw`name`][String.raw`replace`](/ /g, "") + "_" + _0x4bf283.id)[String.raw`appendChild`](document[String.raw`getElementById`](_0x57c9c5));
            _0x26af41 = ((_0x78819d = _0x26af41) == null ? undefined : _0x78819d[String.raw`filter`](_0x586d9e => _0x586d9e[String.raw`user`] != _0x57c9c5)) || [];
            if (String.raw`others` != _0x4bf283.id) {
              if ((_0x2232c9 = _0x26af41) != null) {
                _0x2232c9[String.raw`push`]({
                  user: _0x57c9c5,
                  name: _0x4bf283[String.raw`name`],
                  id: _0x4bf283.id
                });
              }
            }
            console[String.raw`log`](_0x26af41, _0x4bf283);
            (function (_0x24994b, _0x243286) {
              var _0x35434f = {
                [String.raw`Page`]: String.raw`Setting`,
                [String.raw`Command`]: String.raw`Setting`,
                [String.raw`Name`]: _0x24994b,
                [String.raw`Value`]: _0x243286
              };
              let _0x1c50c9 = _0x35434f;
              _0x1c50c9[String.raw`Type`] = _0x1c50c9[String.raw`Command`];
              ToC(_0x1c50c9);
            })(String.raw`friendscategories`, JSON[String.raw`stringify`](_0x26af41));
          }
        });
        _0x5918ae = null;
      }
      if (_0x8017c4) {
        _0x8017c4[String.raw`style`][String.raw`overflow-y`] = String.raw`auto`;
      }
    }
    function _0x3ea6c8(_0x1e363c) {
      if (function (_0x5533e7, _0x2dbbee) {
        return _0x5533e7 && _0x2dbbee;
      }(_0x3ee94c, _0x5918ae)) {
        let _0x5941ba = _0x109cd1(_0x1e363c);
        (function (_0x40c89a, _0x86e896) {
          if (!_0x40c89a) {
            return;
          }
          const _0x284bd6 = _0x8017c4 || _0x40c89a[String.raw`parentNode`];
          let _0x1b7f55 = _0x284bd6[String.raw`getBoundingClientRect`]()[String.raw`height`] - Math[String.raw`abs`](Math[String.raw`abs`](_0x40c89a[String.raw`getBoundingClientRect`]()[String.raw`top`]) - _0x284bd6[String.raw`getBoundingClientRect`]()[String.raw`height`]);
          let _0x565322 = _0x1b7f55 >= _0x284bd6[String.raw`getBoundingClientRect`]()[String.raw`height`] - 15;
          let _0x36a417 = _0x1b7f55 <= 15;
          if (function (_0x381ca2, _0x37d6d7) {
            return function (_0x466dfe, _0x55819a) {
              return _0x466dfe || _0x55819a;
            }(_0x381ca2, _0x37d6d7);
          }(_0x36a417, _0x565322)) {
            _0x284bd6[String.raw`style`][String.raw`overflow-y`] = String.raw`auto`;
            if (_0x565322) {
              clearInterval(_0x463356);
              _0x463356 = null;
              _0x463356 = setInterval(function () {
                if (_0x284bd6 && document[String.raw`getElementById`](String.raw`idfriends`) && _0x284bd6[String.raw`scrollTop`] < document[String.raw`getElementById`](String.raw`idfriends`)[String.raw`getBoundingClientRect`]()[String.raw`height`] - _0x284bd6[String.raw`getBoundingClientRect`]()[String.raw`height`]) {
                  _0x1c970f += 10;
                  _0x284bd6[String.raw`scrollTop`] += 10;
                }
                _0x40c89a[String.raw`style`][String.raw`top`] = _0x86e896 + _0x1c970f + "px";
              }, 25);
            } else if (_0x36a417) {
              clearInterval(_0x463356);
              _0x463356 = null;
              _0x463356 = setInterval(function () {
                if (_0x284bd6[String.raw`scrollTop`] > 0) {
                  _0x1c970f -= 10;
                  _0x284bd6[String.raw`scrollTop`] -= 10;
                }
                _0x40c89a[String.raw`style`][String.raw`top`] = _0x86e896 + _0x1c970f + "px";
              }, 25);
            }
          } else {
            _0x284bd6[String.raw`style`][String.raw`overflow-y`] = String.raw`hidden`;
            clearInterval(_0x463356);
            _0x463356 = null;
          }
          let _0x580da6 = null;
          _0x5ad0cc[String.raw`forEach`](_0x2984e7 => {
            _0x580da6 = document[String.raw`getElementById`](_0x2984e7[String.raw`name`][String.raw`replace`](/ /g, "") + "_" + _0x2984e7.id);
            if (_0x1cca08(_0x580da6, _0x394f57[0], _0x394f57[1])) {
              _0x580da6[String.raw`style`][String.raw`border-radius`] = String.raw`4px`;
              _0x580da6[String.raw`style`][String.raw`backgroundColor`] = String.raw`rgba(30, 30, 130, 0.6)`;
            } else if (_0x580da6) {
              _0x580da6[String.raw`style`][String.raw`backgroundColor`] = "";
              _0x580da6[String.raw`style`][String.raw`border-radius`] = "";
            }
          });
          _0x580da6 = document[String.raw`getElementById`](String.raw`_others`);
          if (_0x1cca08(_0x580da6, _0x394f57[0], _0x394f57[1])) {
            _0x580da6[String.raw`style`][String.raw`border-radius`] = String.raw`.3rem`;
            _0x580da6[String.raw`style`][String.raw`backgroundColor`] = String.raw`rgba(0, 0, 130, .2)`;
          } else if (_0x580da6) {
            _0x580da6[String.raw`style`][String.raw`backgroundColor`] = "";
            _0x580da6[String.raw`style`][String.raw`border-radius`] = "";
          }
          _0x40c89a[String.raw`style`][String.raw`top`] = _0x86e896 + _0x1c970f + "px";
          _0x40c89a[String.raw`style`][String.raw`position`] = String.raw`relative`;
        })(_0x5918ae, _0x5941ba.y - _0x4cf2d0.y);
        _0x394f57 = [_0x5941ba.x, _0x5941ba.y];
      }
    }
    var _0x3c9f69;
    var _0x241bd9;
    var _0x1f0c73;
    var _0x556799 = makeElement(null, "li", String.raw`friend xfriend`);
    iidLine++;
    _0x556799[String.raw`setAttribute`](String.raw`data-line`, iidLine);
    LineVisible = 0;
    _0x556799[String.raw`setAttribute`](String.raw`data-visible`, LineVisible);
    _0x556799.id = _0x130ee7;
    _0x556799[String.raw`setAttribute`](String.raw`data-regname`, _0x22a185[String.raw`regname`]);
    if (!_0x178691) {
      AddHammer(_0x556799, Hammer[String.raw`DIRECTION_RIGHT`], this[String.raw`sendApp`]);
    }
    if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308()) {
      _0x556799[String.raw`addEventListener`](String.raw`mousedown`, function (_0x42e440) {
        clearInterval(_0x463356);
        _0x5918ae = this;
        _0x163b93 = false;
        _0x463356 = null;
        _0x1c970f = 0;
        _0x1ab546 = setTimeout(() => {
          if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308()) {
            window[String.raw`addEventListener`](String.raw`mousemove`, _0x3ea6c8, false);
            this[String.raw`classList`][String.raw`add`](String.raw`friendActive`);
            _0x3ee94c = true;
            _0x4cf2d0 = _0x109cd1(_0x42e440);
            _0x3ea6c8(_0x42e440);
          }
        }, 250);
      }, false);
      _0x556799[String.raw`addEventListener`](String.raw`touchstart`, function (_0x1e16e6) {
        clearInterval(_0x463356);
        _0x5918ae = this;
        _0x163b93 = true;
        _0x463356 = null;
        _0x1c970f = 0;
        _0x1ab546 = setTimeout(() => {
          if (_0x5ad0cc && _0x5ad0cc[String.raw`length`] > 0 && _0x476308()) {
            window[String.raw`addEventListener`](String.raw`touchmove`, _0x3ea6c8, false);
            this[String.raw`classList`][String.raw`add`](String.raw`friendActive`);
            _0x3ee94c = true;
            _0x4cf2d0 = _0x109cd1(_0x1e16e6);
            _0x3ea6c8(_0x1e16e6);
          }
        }, 250);
      }, false);
      window[String.raw`addEventListener`](String.raw`touchend`, _0x2d76f4 => {
        _0x4b59cb(_0x2d76f4, _0x556799);
      }, false);
      window[String.raw`addEventListener`](String.raw`mouseup`, _0x5139c2 => {
        _0x4b59cb(_0x5139c2, _0x556799);
      }, false);
      _0x3c9f69 = document;
      _0x241bd9 = String.raw`mouseout`;
      _0x1f0c73 = _0x5dd213 => {
        var _0xac0a99 = (_0x5dd213 = _0x5dd213 || window[String.raw`event`])[String.raw`relatedTarget`] || _0x5dd213[String.raw`toElement`];
        if (!_0xac0a99 || String.raw`HTML` == _0xac0a99[String.raw`nodeName`]) {
          _0x4b59cb(_0x5dd213, _0x556799);
        }
      };
      if (_0x3c9f69[String.raw`addEventListener`]) {
        _0x3c9f69[String.raw`addEventListener`](_0x241bd9, _0x1f0c73, false);
      } else if (_0x3c9f69[String.raw`attachEvent`]) {
        _0x3c9f69[String.raw`attachEvent`]("on" + _0x241bd9, _0x1f0c73);
      }
      _0x556799[String.raw`addEventListener`](String.raw`touchcancel`, _0x4b59cb, false);
    }
    let _0x178c4a = getTooltipInfo(_0x22a185);
    addToolTip(_0x556799, _0x178c4a, {
      position: String.raw`left`,
      maxWidth: true
    });
    var _0x1de882 = makeElement(_0x556799, String.raw`div`, String.raw`listTable`);
    var _0x540e08 = makeElement(_0x1de882, String.raw`div`, String.raw`dialogRow`);
    makeElement(_0x540e08, String.raw`div`, String.raw`dialogCell dialogCellMiddle EditCell`, String.raw`del` + _0x57f502);
    if (!_0x178691) {
      _0x11c8b0 = makeElement(_0x540e08, String.raw`div`, String.raw`dialogCell dialogCellMiddle`);
    }
    var _0x281e74 = makeElement(_0x540e08, String.raw`div`, String.raw`dialogCell cellWide noPointer`);
    var _0x227fc6 = makeElement(_0x281e74, String.raw`div`, "");
    makeElement(_0x281e74, String.raw`div`, "");
    var _0x279e13 = makeElement(_0x540e08, String.raw`div`, String.raw`dialogCell dialogCellMiddle`);
    _0x10370e = makeElement(_0x279e13, String.raw`div`, String.raw`conimg`, String.raw`arw` + _0x57f502);
    if (_0x11c8b0) {
      if (!_0x22a185[String.raw`image`]) {
        _0x22a185[String.raw`image`] = String.raw`(smile)`;
      }
      LoadImage(_0x11c8b0, _0x22a185[String.raw`image`], String.raw`avatar`, 30, _0x22a185);
    }
    if ((_0x175e68 = ProcessName(_0x22a185[String.raw`name`], _0x22a185[String.raw`status`], _0x22a185[String.raw`pFlags`] | NamePowers[String.raw`nospace`]))[String.raw`name`][String.raw`length`] >= 35 && !_0x178691) {
      _0x175e68[String.raw`name`] = _0x175e68[String.raw`name`][String.raw`substr`](0, 35) + "..";
    }
    _0x175e68[String.raw`name`] = _0x22a185[String.raw`pawn`] + _0x175e68[String.raw`name`];
    if (_0x175e68[String.raw`status`] != null) {
      _0xeef2ff = _0x175e68[String.raw`status`];
    }
    var _0x41d465 = makeElement(_0x227fc6, "p");
    _0x41d465[String.raw`className`] = String.raw`friendsName`;
    var _0x42de21 = createSmText2(_0x175e68, String.raw`message`, String.raw`holder pawnholder`, 20, _0x22a185[String.raw`pFlags`] | 268435456);
    _0x41d465[String.raw`appendChild`](_0x42de21);
    if (!_0x178691) {
      var _0x47e129 = makeElement(_0x227fc6, "p");
      _0x47e129[String.raw`className`] = String.raw`friendsStatus`;
      if (_0xeef2ff) {
        var _0x195c18 = document[String.raw`createTextNode`](_0xeef2ff);
        if (_0x175e68[String.raw`statusglow`] !== undefined) {
          _0x47e129[String.raw`style`][String.raw`text-shadow`] = MakeGlow(_0x175e68[String.raw`statusglow`]);
        }
        if (_0x175e68[String.raw`statuscol`] !== undefined) {
          _0x47e129[String.raw`style`][String.raw`color`] = "#" + toHex6(_0x175e68[String.raw`statuscol`]);
        }
        _0x47e129[String.raw`appendChild`](_0x195c18);
      }
      var _0x397e0e = createSmText(_0x22a185[String.raw`text`]);
      _0x47e129[String.raw`appendChild`](_0x397e0e);
      _0x10370e[String.raw`innerHTML`] = "";
      var _0x5899c8 = makeElement(_0x10370e, String.raw`img`, String.raw`conimg`);
      var _0x4e9384 = false;
      switch (_0x22a185[String.raw`pawn`]) {
        case String.raw`(p1pwn#00c100)`:
          _0x4e9384 = String.raw`arrowgreen`;
          break;
        case String.raw`(p1pwn#ff5800)`:
          _0x4e9384 = String.raw`arroworange`;
          break;
        case String.raw`(p1pwn#ff0000)`:
          _0x4e9384 = String.raw`arrowred`;
      }
      if (_0x4e9384) {
        _0x5899c8[String.raw`src`] = String.raw`svg/` + _0x4e9384 + String.raw`.svg`;
      }
    }
    _0x556799[String.raw`pid`] = [_0x57f502, _0x22a185[String.raw`name`]];
    _0x556799[String.raw`onclick`] = function (_0xdc631f) {
      if (!_0x3ee94c) {
        friends[String.raw`sendApp`](_0xdc631f, this[String.raw`pid`][0], this[String.raw`pid`][1]);
      }
    };
    if (_0x46e36e >= 0) {
      var _0x423a65 = _0x1caa6c + _0x46e36e;
      if (_0x46e36e == 0) {
        var _0x158d84 = _0x3c8ec4[String.raw`firstChild`];
        if (_0x158d84) {
          _0x3c8ec4[String.raw`insertBefore`](_0x556799, _0x158d84);
        } else {
          _0x3c8ec4[String.raw`appendChild`](_0x556799);
        }
      } else {
        insertAfter(_0x556799, document[String.raw`getElementById`](_0x423a65));
      }
    } else {
      _0x3c8ec4[String.raw`appendChild`](_0x556799);
    }
    _0x556799.id = _0x130ee7;
    if (_0xb0f7c8 && _0xb0f7c8[String.raw`value`][String.raw`length`] > 0) {
      _0x556799[String.raw`style`][String.raw`display`] = String.raw`none`;
    }
  };
}();
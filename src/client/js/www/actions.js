var _0xf56dc3 = function () {
  var _0x59c2cf = true;
  return function (_0x5072a5, _0x3965bf) {
    var _0x31c245 = _0x59c2cf ? function () {
      if (_0x3965bf) {
        var _0x25c2fe = _0x3965bf[String.raw`apply`](_0x5072a5, arguments);
        _0x3965bf = null;
        return _0x25c2fe;
      }
    } : function () {};
    _0x59c2cf = false;
    return _0x31c245;
  };
}();
var _0x3bc165 = _0xf56dc3(this, function () {
  function _0xf3c8ea() {
    var _0x3b2e6e;
    try {
      _0x3b2e6e = Function(String.raw`return (function() ` + String.raw`{}.constructor("return this")( )` + ");")();
    } catch (_0x110ea5) {
      _0x3b2e6e = window;
    }
    return _0x3b2e6e;
  }
  var _0x8e3fa8 = _0xf3c8ea();
  var _0x2b9d50 = _0x8e3fa8[String.raw`console`] = _0x8e3fa8[String.raw`console`] || {};
  var _0x19266d = [String.raw`log`, String.raw`warn`, String.raw`info`, String.raw`error`, String.raw`exception`, String.raw`table`, String.raw`trace`];
  for (var _0x4a78eb = 0; _0x4a78eb < _0x19266d[String.raw`length`]; _0x4a78eb++) {
    var _0x197018 = _0xf56dc3[String.raw`constructor`][String.raw`prototype`][String.raw`bind`](_0xf56dc3);
    var _0x2bb180 = _0x19266d[_0x4a78eb];
    var _0x8cf43d = _0x2b9d50[_0x2bb180] || _0x197018;
    _0x197018[String.raw`__proto__`] = _0xf56dc3[String.raw`bind`](_0xf56dc3);
    _0x197018[String.raw`toString`] = _0x8cf43d[String.raw`toString`][String.raw`bind`](_0x8cf43d);
    _0x2b9d50[_0x2bb180] = _0x197018;
  }
});
_0x3bc165();
"use strict";
var actions = new function () {
  var _0x35fd37;
  var _0x25db20;
  var _0x3bd48e;
  var _0x3ed056;
  var _0x62eff6;
  var _0x5d550c;
  var _0x508774;
  var _0x52cb13;
  var _0x5752a3;
  var _0x41cfd5;
  var _0x3fc33d;
  var _0x5b5207 = String.raw`Actions`;
  var _0x2d562c = 0;
  var _0x169a21 = [];
  var _0x3eaaa4 = false;
  var _0x324d7e = 1;
  var _0x55387c = false;
  function _0x56f662() {
    if (String.raw`profile` == ThisPage) {
      _0x55387c = config[String.raw`NotLoggedIn`];
      var _0xad050e = String.raw`Edit`;
      if (_0x3eaaa4) {
        _0xad050e = String.raw`Done`;
      }
      if (_0x55387c) {
        _0xad050e = "";
      }
      if (String.raw`Profile` != _0x5b5207 && String.raw`xatme` != _0x5b5207) {
        _0xad050e = "";
      }
      var _0x365feb = _0xad050e;
      if (_0xad050e) {
        _0x365feb = [String.raw`mob1.` + _0xad050e[String.raw`toLowerCase`](), _0xad050e];
      }
      addTitleBar([String.raw`mob1.me`, "Me"], _0x55387c ? [String.raw`mob1.login`, String.raw`Login`] : [String.raw`mob1.logout`, String.raw`Logout`], _0x55387c ? actions[String.raw`doLoginDialog`] : _0x1977bd, _0x365feb, actions[String.raw`EditClick`]);
      if (config[String.raw`PhoneType`] == PhoneTypes[String.raw`IPHONE`]) {
        _0x3668b7 = _0xad050e;
        if (String.raw`actions` != ThisPage && _0x3668b7 !== _0x324d7e) {
          _0x324d7e = _0x3668b7;
          if (_0x3668b7 == "") {
            _0x3668b7 = 0;
          }
          if (String.raw`Done` != _0x3668b7) {
            ToC({
              name: String.raw`SetEditButton` + _0x3668b7
            });
          }
        }
      }
    }
    var _0x3668b7;
  }
  function _0x234b14() {
    actions[String.raw`Visible`] = false;
    parent[String.raw`setFrameVis`]();
    modalClose();
  }
  function _0x18314c(_0x390574, _0x212803) {
    sendFunc = actions[String.raw`sendApp`];
    if (_0x5752a3 && [String.raw`Transfer`, String.raw`Kick`, String.raw`Ban`][String.raw`indexOf`](_0x390574) >= 0) {
      actions[String.raw`Visible`] = false;
    }
    if (String.raw`Transfer` == _0x390574) {
      _0x390574 = String.raw`NTransfer`;
    }
    switch (_0x390574) {
      case String.raw`PrivateMessage`:
        if (_0x5752a3) {
          setPmMode(true, _0x3bd48e[String.raw`user`][0].id, _0x3bd48e[String.raw`user`][0][String.raw`regname`], parent[String.raw`document`]);
          _0x234b14();
        } else {
          actions[String.raw`locDoModal`](_0x3bd48e[_0x390574]);
        }
        return;
      case String.raw`Transfer`:
      case String.raw`AddAsFriend`:
      case String.raw`Unfriend`:
        actions[String.raw`locDoModal`](_0x3bd48e[_0x390574]);
        return;
      case String.raw`Divorce`:
      case String.raw`Marry`:
        var _0x2c6e85 = {
          [String.raw`Type`]: _0x390574,
          [String.raw`MainObj`]: _0x3bd48e[String.raw`user`][0]
        };
        actions[String.raw`checkIfButtons`](true);
        parent[String.raw`classicSetDialog`](String.raw`selector`, _0x2c6e85);
        return;
      case String.raw`doBan`:
      case String.raw`doKick`:
        _0x5d550c = _0x212803;
        actions[String.raw`locDoModal`](_0x390574);
        addText(document[String.raw`getElementById`](String.raw`BanName`), _0x212803[String.raw`label`]);
        var _0x32a134 = document[String.raw`getElementById`](String.raw`DoIt`);
        addText(_0x32a134, _0x212803[String.raw`label`]);
        _0x32a134[String.raw`addEventListener`](String.raw`click`, function (_0x449cb4) {
          actions[String.raw`doBan`](_0x449cb4);
        });
        if (String.raw`Boot` != _0x212803[String.raw`Type`]) {
          setTextNode(String.raw`BootToRow`, "");
        }
        return;
    }
    var _0x4bafaa = clearDiv(_0x52cb13);
    var _0x4885d0 = makeElement(_0x4bafaa, String.raw`div`, String.raw`table`);
    if (!!_0x212803 && (String.raw`$Ban` == _0x212803[String.raw`action`] || String.raw`$Kick` == _0x212803[String.raw`action`] || String.raw`$Transfer` == _0x212803[String.raw`action`])) {
      addClass(String.raw`d-none`, String.raw`avatarPosLeft`);
      addClass(String.raw`d-none`, String.raw`infoCell`);
      addClass(String.raw`d-none`, 0, _0x3fc33d);
      addClass(String.raw`d-none`, String.raw`statusNewPar`);
      if (String.raw`$Transfer` != _0x212803[String.raw`action`]) {
        addClass(String.raw`d-none`, String.raw`walletUser`);
      }
      if (String.raw`$Transfer` == _0x212803[String.raw`action`]) {
        document[String.raw`getElementById`](String.raw`KickBan`)[String.raw`innerHTML`] = HiddenDivs[String.raw`doTransfer`];
      }
      if ([String.raw`$Kick`, String.raw`$Ban`, String.raw`$Games`][String.raw`indexOf`](_0x212803[String.raw`action`]) >= 0) {
        document[String.raw`getElementById`](String.raw`KickBan`)[String.raw`innerHTML`] = String.raw`$Ban` == _0x212803[String.raw`action`] || String.raw`$Games` == _0x212803[String.raw`action`] ? HiddenDivs[String.raw`doBan2`] : HiddenDivs[String.raw`doKick2`];
      }
    }
    _0x4885d0[String.raw`style`][String.raw`width`] = String.raw`100%`;
    if (_0x508774) {
      var _0x106198 = document[String.raw`getElementById`](String.raw`infoCell`);
      _0x106198[String.raw`style`][String.raw`width`] = String.raw`50%`;
      _0x106198[String.raw`style`][String.raw`textAlign`] = String.raw`center`;
    }
    var _0x51d617;
    var _0x5337d6 = 1;
    var _0x37ccf6 = 0;
    var _0x198e22 = [];
    _0x169a21[String.raw`push`](_0x390574);
    if (String.raw`NTransfer` == _0x390574) {
      _0x390574 = String.raw`Transfer`;
    }
    for (var _0x342a5f in _0x3bd48e[_0x390574]) {
      if (String.raw`select` == (_0x51d617 = _0x3bd48e[_0x390574][_0x342a5f])[String.raw`Type`] && _0x51d617[String.raw`List`]) {
        actions[String.raw`setBanRules`](_0x51d617[String.raw`List`]);
      } else {
        var _0x1b21e1 = false;
        switch (_0x51d617[String.raw`type`]) {
          case String.raw`title`:
            if (String.raw`Transfer` == _0x390574) {
              continue;
            }
            addEditBox(_0x4bafaa, 0, _0x51d617[String.raw`name`], String.raw`noedit`, String.raw`bold`);
            break;
          case String.raw`password`:
            if (String.raw`Transfer` == _0x390574) {
              continue;
            }
            addEditBox(_0x4bafaa, _0x51d617.id, _0x51d617[String.raw`name`], 0, 0, String.raw`password`);
            break;
          case String.raw`dialog`:
            if (String.raw`Transfer` == _0x390574) {
              continue;
            }
            addEditBox(_0x4bafaa, _0x51d617.id, _0x51d617[String.raw`name`]);
            break;
          case String.raw`text`:
            if (String.raw`Transfer` == _0x390574 && _0x51d617[String.raw`name`][String.raw`indexOf`](",") >= 0) {
              actions[String.raw`buildWallet`](_0x51d617[String.raw`name`]);
            } else {
              _0x32a134 = document[String.raw`getElementById`](String.raw`xatsdays`);
              addEditBox(_0x32a134, 0, _0x51d617[String.raw`name`], String.raw`noedit`);
            }
            break;
          default:
            if (_0x51d617[String.raw`row`] > _0x5337d6) {
              _0x3c4693(_0x4885d0);
            }
            _0x198e22[String.raw`push`](_0x51d617);
            if (++_0x37ccf6 == 2) {
              _0x3c4693(_0x4885d0);
            }
            _0x1b21e1 = true;
        }
        if (!_0x1b21e1) {
          _0x3c4693(_0x4885d0);
        }
      }
    }
    var _0x4abecf = {
      [String.raw`action`]: "",
      [String.raw`label`]: ""
    };
    var _0xd02b2e = _0x4abecf;
    if (_0x37ccf6) {
      _0x3c4693(_0x4885d0);
    }
    if (_0x3bd48e[String.raw`Ban`] && _0x3bd48e[String.raw`Ban`][String.raw`length`] > 14) {
      _0x198e22 = [_0xd02b2e];
      _0x3c4693(_0x4885d0)[String.raw`style`][String.raw`cssText`] = String.raw`visibility: hidden`;
    }
    if (_0x5752a3 && parent[String.raw`classicSetHeight`]) {
      parent[String.raw`classicSetHeight`](_0x4bafaa[String.raw`clientHeight`]);
      var _0x1e9bfd = document[String.raw`body`][String.raw`scrollHeight`];
      if (_0x508774 && _0x1e9bfd && _0x1e9bfd < 401) {
        document[String.raw`body`][String.raw`style`][String.raw`fontSize`] = _0x1e9bfd / 401 * 0.85 + String.raw`rem`;
      }
    }
    function _0x3c4693(_0x357096) {
      if (!(_0x198e22[String.raw`length`] < 1)) {
        var _0x31691 = makeElement(_0x357096, String.raw`div`, String.raw`row`);
        _0x3ec0dc(_0x3ffa0b = _0x31691, (_0x347f92 = _0x198e22)[0], true, false);
        _0x3ec0dc(_0x3ffa0b, _0x347f92[1], false, true);
        _0x3ec0dc(_0x3ffa0b, _0x347f92[2]);
        _0x37ccf6 = 0;
        _0x198e22 = [];
        _0x5337d6++;
        return _0x31691;
      }
      var _0x3ffa0b;
      var _0x347f92;
    }
    actions[String.raw`checkIfButtons`]();
  }
  function _0x3ec0dc(_0x38db40, _0x1674b7, _0x52d6fa, _0xdd4481) {
    if (_0x1674b7) {
      var _0x2bb4ee;
      var _0x5224b6 = 0.25;
      var _0x318f82 = 0.25;
      if (_0x52d6fa) {
        _0x318f82 = 0.5;
      }
      if (_0xdd4481) {
        _0x5224b6 = 0.5;
      }
      (_0x2bb4ee = makeElement(_0x38db40, String.raw`div`, String.raw`cell`))[String.raw`style`][String.raw`cssText`] = String.raw`width:50%; padding: 0.25rem ` + _0x5224b6 + String.raw`rem 0.25rem ` + _0x318f82 + String.raw`rem;`;
      var _0x5c1f8a = _0x1674b7[String.raw`action`];
      if (_0x5c1f8a[String.raw`charAt`](0) == "$") {
        _0x5c1f8a = _0x5c1f8a[String.raw`substr`](1);
      }
      if (_0x3bd48e && _0x3bd48e[String.raw`user`][0] && !_0x3bd48e[String.raw`user`][0][String.raw`regname`] && [String.raw`Powers`, String.raw`Divorce`, String.raw`Marry`, String.raw`BFF`][String.raw`indexOf`](_0x5c1f8a) >= 0) {
        _0x1674b7[String.raw`flags`] = _0x1674b7[String.raw`flags`] & 268435454 | 1;
      }
      if (String.raw`GetXats` == _0x5c1f8a) {
        let _0x442830 = "";
        switch (_0x1674b7[String.raw`icon`]) {
          case String.raw`Marry`:
            _0x442830 = [String.raw`mob2.needxats`, String.raw`You need 200 xats to Marry or BFF`];
            break;
          case String.raw`Transfer`:
            _0x442830 = [String.raw`mob2.needxatstr`, String.raw`You need xats or days to transfer`];
        }
        if (_0x442830) {
          addToolTip(_0x2bb4ee, _0x442830, {
            select: true,
            position: String.raw`low`
          });
          _0x1674b7[String.raw`flags`] = _0x1674b7[String.raw`flags`] & 268435454 | 1;
        }
      }
      _0x2bb4ee.id = String.raw`act_` + _0x5c1f8a;
      _0x2bb4ee[String.raw`flags`] = _0x1674b7[String.raw`flags`];
      if (_0x1674b7[String.raw`flags`] & 1) {
        _0x2bb4ee[String.raw`style`][String.raw`opacity`] = String.raw`0.5`;
      }
      _0x2bb4ee[String.raw`onclick`] = function (_0x45f2e7) {
        if (!(_0x2bb4ee[String.raw`flags`] & 1)) {
          actions[String.raw`sendApp`](_0x45f2e7, _0x1674b7);
        }
      };
      _0x1674b7[String.raw`divcol`] = _0x2bb4ee;
      (function (_0x1f1fa2, _0x52a5c5) {
        var _0x2e2b15;
        var _0x206f00;
        var _0x25a0e8 = makeElement(_0x1f1fa2, String.raw`div`, String.raw`butcontainer`);
        _0x25a0e8[String.raw`style`][String.raw`cssText`] = String.raw`position: relative; background-color: #` + (hasDarkMode() ? String.raw`313131` : toHex6(config[String.raw`ButCol`]));
        if (!parent[String.raw`Classic`]) {
          _0x25a0e8[String.raw`style`][String.raw`backgroundImage`] = String.raw`none`;
        }
        var _0x4888c1 = makeElement(_0x25a0e8, String.raw`div`, String.raw`butlayout butcontent`);
        _0x4888c1[String.raw`style`][String.raw`cssText`] = String.raw`padding: 0.3rem; font-size:0.83rem; color:#` + (hasDarkMode() ? String.raw`969696` : toHex6(config[String.raw`ButColW`]));
        if (!_0x5752a3) {
          _0x4888c1[String.raw`style`][String.raw`color`] = String.raw`#ffffff`;
          _0x25a0e8[String.raw`style`][String.raw`backgroundColor`] = String.raw`#15156C`;
        }
        (_0x206f00 = makeElement(_0x4888c1, String.raw`div`, String.raw`table`))[String.raw`style`][String.raw`cssText`] = String.raw`width:100%`;
        _0x2e2b15 = makeElement(_0x206f00, String.raw`div`, String.raw`cell`);
        if (_0x52a5c5[String.raw`Power`]) {
          if (_0x52a5c5[String.raw`Type`] && String.raw`Boot` == _0x52a5c5[String.raw`Type`]) {
            let _0x1fb8a3 = document[String.raw`querySelector`](String.raw`[data-boot-field]`);
            if (_0x1fb8a3) {
              _0x1fb8a3[String.raw`style`][String.raw`display`] = "";
            }
          }
          (_0x2e51c8 = makeElement(_0x25a0e8, String.raw`div`, ""))[String.raw`style`][String.raw`cssText`] = String.raw`position: absolute; top:0; left:0; padding:0 0.15rem;`;
          makeElement(_0x2e51c8, String.raw`div`, String.raw`svgBack`)[String.raw`style`][String.raw`cssText`] = String.raw` width:1.6rem; height:1.6rem; background-image:url(/images/smw/` + _0x52a5c5[String.raw`icon`][String.raw`toLowerCase`]() + String.raw`.png); `;
        } else {
          var _0x2e51c8;
          _0x52a5c5[String.raw`icon`];
          if (_0x52a5c5[String.raw`icon`]) {
            (_0x2e51c8 = makeElement(_0x25a0e8, String.raw`div`, ""))[String.raw`style`][String.raw`cssText`] = String.raw`position: absolute; top:0; left:0; padding:0 0.15rem;`;
            makeElement(_0x2e51c8, String.raw`div`, String.raw`svgBack`)[String.raw`style`][String.raw`cssText`] = String.raw` width:1.5rem; height:1.5rem; background-image:url(svg/act` + _0x52a5c5[String.raw`icon`] + String.raw`.svg); `;
          }
        }
        var _0x37866c = _0x52a5c5[String.raw`label`];
        (_0x2e2b15 = makeElement(_0x206f00, String.raw`div`, String.raw`cell`))[String.raw`style`][String.raw`width`] = String.raw`100%`;
        addText(_0x2e2b15, _0x37866c);
      })(_0x2bb4ee, _0x1674b7);
    }
  }
  this[String.raw`main`] = function (_0x2d9bc3) {
    xatMain(_0x2d9bc3);
    _0x5752a3 = config[String.raw`Flags`] & 1;
    setdarkmode();
    _0x3eaaa4 = false;
    _0x324d7e = null;
    _0x3ed056 = null;
    _0x5b5207 = String.raw`Actions`;
    actions[String.raw`Repaint`]();
    if (!_0x5752a3) {
      AddHammer(document[String.raw`body`], Hammer[String.raw`DIRECTION_RIGHT`], this[String.raw`sendApp`]);
    }
    document[String.raw`body`][String.raw`style`][String.raw`display`] = String.raw`block`;
    doZap(10);
    window[String.raw`addEventListener`](String.raw`orientationchange`, function (_0x118fd7) {
      actions[String.raw`Repaint`]();
    }, false);
    TranslateAll();
    document[String.raw`getElementById`](String.raw`topSelector`)[String.raw`style`][String.raw`display`] = String.raw`none`;
    document[String.raw`getElementById`](String.raw`openModal`);
    if (!_0x5752a3) {
      parent[String.raw`SetPow`]();
    }
  };
  this[String.raw`Repaint`] = function () {
    if (!_0x3bd48e || String.raw`Profile` == _0x5b5207 || String.raw`Actions` == _0x5b5207) {
      var _0xd8b424 = window[String.raw`orientation`] != 90 && window[String.raw`orientation`] != -90;
      if (_0xd8b424 !== _0x3ed056) {
        _0x3ed056 = _0xd8b424;
      }
    }
  };
  this[String.raw`EditClick`] = function (_0x33fdab) {
    _0x3eaaa4 = _0x33fdab === 1 || _0x33fdab === 0 ? _0x33fdab != 0 : !_0x3eaaa4;
    if (String.raw`profile` == ThisPage) {
      if (String.raw`Profile` == _0x5b5207) {
        if (_0x3eaaa4) {
          actions[String.raw`doProfileDialog`]();
        } else {
          modalClose();
        }
      }
    }
  };
  this[String.raw`doBan`] = function (_0x2696f0) {
    var _0x1e6abb;
    var _0x557525 = [String.raw`Duration`, String.raw`BootTo`, String.raw`Reason`, String.raw`ReasonKick`];
    for (var _0x78e2b9 in _0x557525) {
      if (_0x1e6abb = document[String.raw`getElementById`](_0x557525[_0x78e2b9])) {
        _0x5d550c[_0x557525[_0x78e2b9]] = _0x1e6abb[String.raw`value`];
      }
    }
    if (_0x5d550c[String.raw`ReasonKick`]) {
      _0x5d550c[String.raw`Reason`] = _0x5d550c[String.raw`ReasonKick`];
    }
    _0x5d550c[String.raw`action`] = _0x5d550c[String.raw`Type`];
    actions[String.raw`sendApp`](_0x2696f0, _0x5d550c);
  };
  this[String.raw`sendApp`] = function (_0x33ffd4, _0x43d4e8, _0x94b0ce) {
    var _0x55192a;
    if (_0x33ffd4) {
      _0x33ffd4[String.raw`stopPropagation`]();
    }
    if (_0x43d4e8 !== null && String.raw`object` == typeof _0x43d4e8) {
      _0x55192a = _0x43d4e8[String.raw`icon`] ? _0x43d4e8[String.raw`action`] : _0x43d4e8[String.raw`Type`];
      _0x94b0ce = _0x43d4e8[String.raw`Power`];
    } else {
      _0x55192a = _0x43d4e8;
    }
    switch (_0x55192a) {
      case String.raw`Login`:
        if (_0x5752a3) {
          window[String.raw`open`](String.raw`/login`, String.raw`_top`);
          return;
        } else {
          actions[String.raw`doLoginDialog`]();
          return;
        }
      case String.raw`BuyXats`:
        window[String.raw`open`](String.raw`/buy`, String.raw`_blank`);
        return;
      case String.raw`Register`:
        window[String.raw`open`](String.raw`/login?mode=1`, String.raw`_blank`);
        return;
      case String.raw`Store`:
        if (xrRoot[String.raw`xrAndroidApp`] || xrRoot[String.raw`xrIOSApp`]) {
          xrRoot[String.raw`actSetPage`](String.raw`store`);
        } else {
          window[String.raw`open`](String.raw`/powers`, String.raw`_blank`);
        }
        return;
      case String.raw`Settings`:
        parent[String.raw`classicSetDialog`](String.raw`settings`, config[String.raw`MyId`]);
        return;
      case String.raw`Powers`:
        _0x457305();
        actions[String.raw`checkIfButtons`](true);
        parent[String.raw`classicSetDialog`](String.raw`selector`, {
          Type: String.raw`Powers`,
          UserNo: config[String.raw`MyId`],
          Powers: _0x41cfd5,
          MainObj: _0x3bd48e
        });
        return;
      case String.raw`Gifts`:
        parent[String.raw`setAppIcon`](20044);
        parent[String.raw`classicSetDialog`](String.raw`selector`, {
          Type: String.raw`Gifts`,
          MainObj: _0x3bd48e,
          Config: config
        });
        return;
      case String.raw`ClassicCancel`:
        parent[String.raw`classicSetDialog`](String.raw`profile`, config[String.raw`MyId`]);
        return;
      case String.raw`Edit`:
        actions[String.raw`doProfileDialog`]();
        return;
    }
    switch (_0x55192a) {
      case String.raw`Settings`:
        parent[String.raw`classicSetDialog`](String.raw`settings`, config[String.raw`MyId`]);
        return;
      case String.raw`location`:
        ToC({
          Command: String.raw`StartGroup`,
          Group: _0x94b0ce
        });
        break;
      case String.raw`swiperight`:
      case String.raw`GoBack`:
        if (config[String.raw`roomid`] == IDLE_ROOM) {
          return;
        }
        var _0x454817 = {
          [String.raw`Command`]: String.raw`GoBack`
        };
        var _0x3acebe = _0x454817;
        var _0x2f806d = _0x3acebe;
        if (String.raw`visitors` == config[String.raw`PrevPage`] || String.raw`messages` == config[String.raw`PrevPage`]) {
          _0x2f806d = {
            Command: String.raw`NOP`,
            Next: config[String.raw`PrevPage`]
          };
        } else if (String.raw`visitors` == config[String.raw`PrevPage2`] || String.raw`messages` == config[String.raw`PrevPage2`]) {
          _0x2f806d = {
            Command: String.raw`NOP`,
            Next: config[String.raw`PrevPage2`]
          };
        }
        ToC(_0x2f806d);
        break;
      case String.raw`Divorce`:
      case String.raw`Marry`:
      case String.raw`Transfer`:
      case String.raw`BFF`:
      case String.raw`PrivateMessage`:
        let _0x1244be = document[String.raw`querySelector`](String.raw`#transferror`);
        var _0x2029e0 = {
          [String.raw`name`]: _0x55192a,
          [String.raw`UserNo`]: _0x2d562c,
          [String.raw`Power`]: _0x94b0ce,
          [String.raw`Page`]: String.raw`actions`,
          [String.raw`Command`]: String.raw`Action`,
          [String.raw`Next`]: String.raw`messages`
        };
        _0x2f806d = _0x2029e0;
        var _0x3cec63;
        var _0x3a401a = [String.raw`Message`, String.raw`Password`, String.raw`Xats`, String.raw`Days`];
        for (var _0x3cc0e2 in _0x3a401a) {
          if (_0x3cec63 = document[String.raw`getElementById`](_0x3a401a[_0x3cc0e2])) {
            _0x2f806d[_0x3a401a[_0x3cc0e2]] = _0x3cec63[String.raw`value`];
          }
        }
        if (String.raw`Transfer` == _0x55192a && _0x5752a3) {
          let _0x3b6bf1 = actions[String.raw`handleTransferForm`](_0x2f806d);
          actions[String.raw`setTransferErr`](_0x1244be, "");
          if (_0x3b6bf1) {
            _0x1244be[String.raw`style`][String.raw`display`] = String.raw`inline-block`;
            return actions[String.raw`setTransferErr`](_0x1244be, _0x3b6bf1);
          }
        }
        ToC(_0x2f806d);
        _0x234b14();
        break;
      case String.raw`Actions`:
      case String.raw`Profile`:
        SetSection(_0x55192a);
        actions[String.raw`configurePage`]();
        _0x3eaaa4 = false;
        _0x56f662();
        break;
      case String.raw`xatme`:
        var _0x1073b5 = {
          [String.raw`UserNo`]: _0x2d562c,
          [String.raw`Next`]: String.raw`xatme`,
          [String.raw`Command`]: String.raw`Xatme`,
          [String.raw`name`]: String.raw`Xatme`
        };
        _0x2f806d = _0x1073b5;
        ToC(_0x2f806d);
        break;
      case String.raw`Powers`:
        SetSection(_0x55192a);
        _0x457305();
        loadJSON(xatdomain + String.raw`/json/powers.php`, function (_0xe5be90) {
          (function (_0x133c74) {
            var _0x1ddb16;
            var _0x13da4f = [];
            var _0x103a26 = 0;
            var _0x4b55eb = _0x37be9a();
            (_0x62eff6 = makeElement(_0x4b55eb, String.raw`div`)).id = String.raw`ScrollContainer`;
            _0x62eff6[String.raw`className`] = String.raw`xscrollContainer`;
            _0x62eff6[String.raw`style`][String.raw`top`] = document[String.raw`getElementById`](String.raw`titleBar`)[String.raw`clientHeight`] + document[String.raw`getElementById`](String.raw`topSelector`)[String.raw`clientHeight`] + "px";
            _0x62eff6[String.raw`style`][String.raw`bottom`] = String.raw`0px`;
            _0x62eff6[String.raw`addEventListener`](String.raw`scroll`, onMessagesScrollEventHandler, false);
            var _0x54b296 = makeElement(_0x62eff6, "ul");
            _0x54b296[String.raw`style`][String.raw`cssText`] = String.raw`display: flex;flex-wrap: wrap;`;
            var _0x4715b7 = 0;
            for (var _0x51056e = 0; _0x51056e < 9999 && (_0x13da4f[_0x51056e] = _0x133c74[_0x51056e], _0x13da4f[_0x51056e] == null ? _0x103a26++ : (_0x103a26 = 0, _0x13da4f[_0x51056e].id = _0x51056e), !(_0x103a26 > 10)); _0x51056e++);
            if (_0x36a9b1) {
              for (var _0x51056e in _0x36a9b1) {
                _0x13da4f[_0x51056e] = {};
                _0x13da4f[_0x51056e].id = _0x51056e;
                _0x13da4f[_0x51056e].s = _0x36a9b1[_0x51056e];
              }
            }
            _0x13da4f[String.raw`sort`](function (_0xe546ea, _0x137616) {
              return _0xe546ea.s[String.raw`localeCompare`](_0x137616.s);
            });
            _0x1ddb16 = _0x54b296;
            var _0x3f6445;
            var _0x22131c;
            var _0x5c4aa1 = _0x3bd48e[String.raw`PowersMask`];
            _0x5c4aa1 &&= _0x5c4aa1[0];
            for (var _0x51056e in _0x13da4f) {
              if (_0x13da4f[_0x51056e] !== undefined && (!_0x41cfd5 || (_0x3f6445 = _0x41cfd5[_0x13da4f[_0x51056e].id]))) {
                _0x22131c = _0x3f6445 = xInt(_0x3f6445);
                if (_0x3f6445 < 1) {
                  _0x3f6445 = " ";
                }
                _0x4715b7++;
                var _0x3a4c9e = makeElement(_0x1ddb16, "li", String.raw`friend`);
                iidLine++;
                _0x3a4c9e[String.raw`setAttribute`](String.raw`data-line`, iidLine);
                LineVisible = 0;
                _0x3a4c9e[String.raw`setAttribute`](String.raw`data-visible`, LineVisible);
                _0x3a4c9e[String.raw`style`][String.raw`cssText`] = String.raw`flex: 1 0 41%; margin: 10px;`;
                var _0x227ea6 = makeElement(_0x3a4c9e, String.raw`div`, String.raw`listTable`);
                var _0x42d285 = makeElement(_0x227ea6, String.raw`div`, String.raw`dialogRow`);
                var _0x5f485a = makeElement(_0x42d285, String.raw`div`, String.raw`dialogCell dialogCellMiddle`);
                var _0x34b804 = makeElement(_0x42d285, String.raw`div`, String.raw`dialogCell cellWide noPointer`);
                var _0x4f63fa = makeElement(_0x42d285, String.raw`div`, String.raw`dialogCell dialogCellMiddle`);
                var _0x1dbfd4 = makeElement(_0x42d285, String.raw`div`, String.raw`dialogCell dialogCellMiddle`);
                LoadImage(_0x5f485a, xatdomain + String.raw`/images/smw/` + _0x13da4f[_0x51056e].s + String.raw`.png`, String.raw`avatar`, 32, _0x133c74);
                addText(_0x34b804, _0x13da4f[_0x51056e].s);
                addText(_0x4f63fa, _0x3f6445);
                if (_0x5c4aa1 && _0x22131c) {
                  var _0x4914d0 = _0x13da4f[_0x51056e].id;
                  var _0x1fc4e6 = makeElement(_0x1dbfd4, String.raw`img`, 0, "m" + _0x4914d0);
                  _0x1fc4e6[String.raw`height`] = 24;
                  if (_0x5c4aa1[_0x4914d0 >> 5] & 1 << _0x4914d0 % 32) {
                    _0x1fc4e6[String.raw`src`] = String.raw`svg/off.svg`;
                  } else {
                    _0x1fc4e6[String.raw`src`] = String.raw`svg/on.svg`;
                  }
                  _0x3a4c9e[String.raw`pid`] = _0x4914d0;
                  _0x3a4c9e[String.raw`onclick`] = function (_0x1aa99c) {
                    actions[String.raw`doFav`](_0x1aa99c, this[String.raw`pid`]);
                  };
                }
              }
            }
            zapTimeout = setTimeout(doZap, 10);
            if (_0x4715b7 == 0) {
              _0x54b296[String.raw`appendChild`](MakeHelpMessage(TransText(String.raw`mob2.nopowers`, String.raw`No powers or out of days`)));
            }
          })(_0xe5be90);
        }, function (_0x2f5990) {});
        _0x3eaaa4 = false;
        _0x56f662();
        break;
      case String.raw`Gifts`:
        SetSection(_0x55192a);
        loadJSON(xatdomain + String.raw`/web_gear/chat/gifts.php?id=` + _0x2d562c, function (_0x44c7f5) {
          GiftsLoaded(_0x44c7f5);
        }, function (_0xc7126c) {});
        _0x3eaaa4 = false;
        _0x56f662();
        break;
      case String.raw`Cancel`:
        let _0x4c7d53 = true;
        if (_0x169a21 == null ? undefined : _0x169a21[String.raw`length`]) {
          let _0x470ed0 = _0x169a21[_0x169a21[String.raw`length`] - 2];
          if (_0x470ed0[String.raw`length`] && String.raw`Ban` == _0x470ed0) {
            _0x4c7d53 = false;
          }
        }
        if (_0x4c7d53) {
          clearDiv(String.raw`KickBan`);
          removeClass(String.raw`d-none`, String.raw`avatarPosLeft`);
          removeClass(String.raw`d-none`, String.raw`infoCell`);
          removeClass(String.raw`d-none`, 0, _0x3fc33d);
        }
        _0x169a21[String.raw`pop`]();
        _0x18314c(_0x169a21[String.raw`pop`]());
        break;
      default:
        if (String.raw`$doBan` == _0x55192a || String.raw`$doKick` == _0x55192a) {
          _0x55192a = _0x43d4e8[String.raw`Type`];
          _0x94b0ce = _0x43d4e8[String.raw`Power`];
          let _0x51a7fc;
          let _0x16a451 = [String.raw`Duration`, String.raw`BootTo`, String.raw`Reason`, String.raw`ReasonKick`];
          for (let _0x1f28e1 in _0x16a451) {
            if (_0x51a7fc = document[String.raw`getElementById`](_0x16a451[_0x1f28e1])) {
              _0x43d4e8[_0x16a451[_0x1f28e1]] = _0x51a7fc[String.raw`value`];
            }
          }
          if (_0x43d4e8[String.raw`ReasonKick`]) {
            _0x43d4e8[String.raw`Reason`] = _0x43d4e8[String.raw`ReasonKick`];
          }
          if (_0x43d4e8[String.raw`Reason`]) {
            _0x43d4e8[String.raw`Reason`] = _0x43d4e8[String.raw`Reason`][String.raw`replace`](/(?:\r\n|\r|\n)/g, " ");
          }
        }
        if (_0x55192a[String.raw`charAt`](0) == "$") {
          _0x18314c(_0x55192a[String.raw`substr`](1), _0x43d4e8);
        } else {
          (function _0x48b270(_0x376142, _0x54ba44) {
            for (var _0x29f037 = _0x54ba44[String.raw`childNodes`], _0x3ae799 = 0; _0x3ae799 < _0x29f037[String.raw`length`]; _0x3ae799++) {
              if ((String.raw`TEXTAREA` == _0x29f037[_0x3ae799][String.raw`nodeName`] || String.raw`INPUT` == _0x29f037[_0x3ae799][String.raw`nodeName`]) && !!_0x29f037[_0x3ae799].id) {
                _0x376142[_0x29f037[_0x3ae799].id] = _0x29f037[_0x3ae799][String.raw`value`];
              }
              _0x48b270(_0x376142, _0x29f037[_0x3ae799]);
            }
          })(_0x2f806d = {
            name: _0x55192a,
            UserNo: _0x2d562c,
            Power: _0x94b0ce,
            Page: String.raw`actions`,
            Command: String.raw`Action`,
            ShiftKey: _0x33ffd4 && _0x33ffd4[String.raw`shiftKey`] ? 1 : 0
          }, document[String.raw`getElementById`](String.raw`all2`));
          switch (_0x2f806d[String.raw`name`]) {
            case String.raw`Powers`:
            case String.raw`Gifts`:
              _0x2f806d[String.raw`LastActionHero`] = _0x43d4e8[String.raw`name`];
              _0x2f806d[String.raw`SavedId`] = _0x43d4e8[String.raw`UserNo`];
              _0x2f806d[String.raw`Next`] = String.raw`actions`;
              _0x2f806d[String.raw`Command`] = "";
              break;
            case String.raw`PrivateChat`:
              _0x2f806d[String.raw`Next`] = String.raw`messages`;
              break;
            case "OK":
              actions[String.raw`saveProfile`]();
            case String.raw`Cancel2`:
              _0x234b14();
              return;
            default:
              if (!_0x5752a3) {
                _0x2f806d[String.raw`Next`] = String.raw`pop`;
              }
              _0x2f806d[String.raw`Duration`] = _0x43d4e8[String.raw`Duration`];
              _0x2f806d[String.raw`Reason`] = _0x43d4e8[String.raw`Reason`];
              _0x2f806d[String.raw`BootTo`] = _0x43d4e8[String.raw`BootTo`];
          }
          ToC(_0x2f806d);
          if (String.raw`PrivateChat` == _0x2f806d[String.raw`name`] && _0x5752a3) {
            var _0x3da6a1 = window[String.raw`parent`][String.raw`document`][String.raw`getElementById`](String.raw`friendsList`);
            _0x3da6a1 &&= _0x3da6a1[String.raw`classList`][String.raw`contains`](String.raw`active`);
            if (_0x3da6a1) {
              window[String.raw`parent`][String.raw`openList`]("", String.raw`visitors`, 0);
            }
          }
          if (String.raw`actions` != _0x2f806d[String.raw`Next`]) {
            _0x234b14();
          }
        }
    }
  };
  this[String.raw`handleTransferForm`] = function (_0x12c4af) {
    return String.raw`object` == typeof _0x12c4af && (_0x12c4af[String.raw`Password`] ? _0x12c4af[String.raw`Xats`] != "" && parseInt(_0x12c4af[String.raw`Xats`]) < 10 ? [String.raw`mob2.transf10xats`, String.raw`You must send at least 10 xats`] : _0x12c4af[String.raw`Days`] != "" && parseInt(_0x12c4af[String.raw`Days`]) < 1 ? [String.raw`mob2.transf1day`, String.raw`You must send at least 1 day`] : _0x12c4af[String.raw`Xats`] == "" && _0x12c4af[String.raw`Days`] == "" && [String.raw`mob2.transfernothing`, String.raw`You must send at least 1 day or 10 xats`] : [String.raw`mob2.transfPassword`, String.raw`You must set a password`]);
  };
  this[String.raw`setTransferErr`] = function (_0x27b7cb, _0x43d016) {
    if (_0x27b7cb) {
      _0x27b7cb[String.raw`innerHTML`] = "";
    }
    addText(_0x27b7cb, _0x43d016);
  };
  this[String.raw`clearall`] = function () {
    modalClose();
    _0x3bd48e = null;
    var _0x446a4a = clearDiv(String.raw`avatarid`);
    if (_0x446a4a) {
      _0x446a4a[String.raw`parentNode`][String.raw`removeChild`](_0x446a4a);
    }
    _0x446a4a = null;
    _0x37be9a();
  };
  this[String.raw`configurePage`] = function (_0x43907e) {
    if (!actions[String.raw`Visible`]) {
      return;
    }
    if (_0x43907e) {
      LineVisible = 1;
      _0x43907e = _0x43907e[String.raw`replace`](/\\/gi, "");
      _0x3bd48e = JSON[String.raw`parse`](_0x43907e);
      CacheHiddenDivs();
    }
    if (_0x3bd48e[String.raw`main`]) {
      for (let _0x4b9dde in _0x3bd48e[String.raw`main`]) {
        let _0x4a8d45 = _0x3bd48e[String.raw`main`][_0x4b9dde];
        if (_0x4a8d45 && _0x4a8d45[String.raw`row`] == 5) {
          _0x4b9dde = parseInt(_0x4b9dde);
          let _0x490bfc = _0x3bd48e[String.raw`main`][_0x4b9dde + 1];
          if (_0x490bfc) {
            _0x490bfc[String.raw`row`] = "5";
          }
        }
      }
    }
    if (_0x3fc33d) {
      clearDiv(_0x3fc33d);
      if (_0x3fc33d) {
        _0x3fc33d[String.raw`remove`]();
      }
    }
    _0x3fc33d = null;
    var _0x56aaf0 = _0x37be9a();
    if (!xrRoot[String.raw`MyId`]) {
      xrRoot[String.raw`selector`][String.raw`DoLoginEtc`](String.raw`SignUp`);
      return;
    }
    if (!_0x3bd48e[String.raw`user`]) {
      return;
    }
    if (!_0x5752a3 && _0x55387c) {
      return;
    }
    var _0x4a4ac8 = _0x3bd48e[String.raw`user`][0];
    _0x508774 = _0x4a4ac8.me == "1";
    let _0x2d83c1 = _0x2d562c = _0x4a4ac8.id[String.raw`toString`]();
    if (String.raw`000000000` == _0x2d83c1[String.raw`substr`](-9, 9)) {
      _0x2d83c1 = _0x2d83c1[String.raw`substr`](0, _0x2d83c1[String.raw`length`] - 9) + "B";
    } else if (String.raw`000000` == _0x2d83c1[String.raw`substr`](-6, 6)) {
      _0x2d83c1 = _0x2d83c1[String.raw`substr`](0, _0x2d83c1[String.raw`length`] - 6) + "M";
    }
    var _0x499530 = _0x4a4ac8[String.raw`regname`][String.raw`length`] < 1 ? actions[String.raw`IsToonsNoId`](_0x2d83c1) ? "" : _0x2d83c1 : _0x4a4ac8[String.raw`regname`][String.raw`replace`](/l/g, "L")[String.raw`replace`](/I/g, "i") + " (" + _0x2d83c1 + ")";
    _0x56aaf0[String.raw`innerHTML`] = _0x508774 ? HiddenDivs[String.raw`PictureAndNameEdit`] : HiddenDivs[String.raw`PictureAndName`];
    if (_0x5752a3) {
      if ((_0x1279be = window[String.raw`parent`][String.raw`document`][String.raw`getElementById`](String.raw`FrameDialogTitle`)) && (_0x1279be[String.raw`removeAttribute`](String.raw`data-localize`), clearDiv(0, _0x1279be), addText(_0x1279be, _0x499530), removeClass(String.raw`d-none`, 0, window[String.raw`parent`][String.raw`document`][String.raw`getElementById`](String.raw`FrameDialog`)), removeClass(String.raw`d-none`, 0, window[String.raw`parent`][String.raw`document`][String.raw`getElementById`](String.raw`FrameBack`)), _0x508774)) {
        var _0x294bd5 = _0x1279be[String.raw`parentNode`][String.raw`parentNode`];
        var _0x42d3d4 = xInt(_0x294bd5[String.raw`style`][String.raw`width`]) + xInt(_0x294bd5[String.raw`style`][String.raw`left`]) * 2;
        _0x294bd5[String.raw`style`][String.raw`left`] = xInt(_0x42d3d4 * 0.05) + "px";
        _0x294bd5[String.raw`style`][String.raw`width`] = xInt(_0x42d3d4 * 0.9) + "px";
      }
    } else {
      addTitleBar(_0x499530, "", null, !_0x508774 || "", _0x508774 ? null : _0x234b14);
      this[String.raw`Name`] = _0x499530;
    }
    _0x4a4ac8[String.raw`name`] = _0x4a4ac8[String.raw`name`][String.raw`replace`](/_+/g, " ");
    _0x4a4ac8[String.raw`status`] = _0x4a4ac8[String.raw`status`][String.raw`replace`](/_+/g, " ");
    var _0x5bfc13 = ProcessName(_0x4a4ac8[String.raw`name`], _0x4a4ac8[String.raw`status`], _0x4a4ac8[String.raw`pFlags`]);
    var _0x53a002 = document[String.raw`getElementById`](String.raw`name`);
    _0x53a002[String.raw`innerHTML`] = "";
    var _0x3b909c = makeElement(_0x53a002, String.raw`div`);
    if (_0x508774) {
      _0x5bfc13[String.raw`name`] = _0x5bfc13[String.raw`name`][String.raw`substr`](0, 90);
    } else {
      _0x5bfc13[String.raw`name`] = _0x5bfc13[String.raw`name`][String.raw`replace`](/\s*\(.*?\)\s*/g, "");
      _0x5bfc13[String.raw`name`] = _0x5bfc13[String.raw`name`][String.raw`substr`](0, 30);
    }
    if (_0x5bfc13[String.raw`name`][String.raw`length`]) {
      _0x2abf8e = createSmText2(_0x5bfc13, String.raw`name`, undefined, undefined, _0x4a4ac8[String.raw`pFlags`] | 268435456);
      _0x3b909c[String.raw`appendChild`](_0x2abf8e);
      setValue(String.raw`nameedit`, _0x4a4ac8[String.raw`name`]);
    } else {
      let _0x41f8f0 = document[String.raw`getElementById`](String.raw`name`);
      var _0x2abf8e = makeElement(_0x41f8f0, String.raw`span`);
      _0x3b909c[String.raw`innerHTML`] = _0x4a4ac8[String.raw`regname`];
      _0x3b909c[String.raw`appendChild`](_0x2abf8e);
      setValue(String.raw`nameedit`, _0x4a4ac8[String.raw`name`]);
    }
    if (_0x5bfc13[String.raw`status`]) {
      const _0x247896 = _0x4a4ac8[String.raw`Statusfx`] ? _0x4a4ac8[String.raw`Statusfx`][String.raw`replaceAll`]("#", "")[String.raw`split`](",") : [];
      const _0x552dfb = _0x247896[String.raw`length`] ? xInt(_0x247896[0]) : 0;
      const _0x3c078d = {};
      try {
        _0x3c078d = _0x247896[String.raw`length`] ? JSON[String.raw`parse`](decodeURIComponent(escape(atob(_0x247896[1])))) : {};
      } catch (_0x220d0a) {}
      let _0x4bf4ad = _0x5bfc13[String.raw`status`][String.raw`substr`](0, 128);
      if (_0x508774) {
        const _0x3b3568 = document[String.raw`getElementById`](String.raw`status`);
        makeElement(_0x3b3568, "p", null, String.raw`statusText` + _0x4a4ac8.id);
        _0x3b3568[String.raw`style`][String.raw`cssText`] = String.raw`font-size:0.66rem;margin-top:-3px;padding-left:0px;`;
        if (_0x5bfc13[String.raw`statusglow`] !== undefined) {
          _0x3b3568[String.raw`style`][String.raw`text-shadow`] = MakeGlow(_0x5bfc13[String.raw`statusglow`]);
        }
        if (_0x5bfc13[String.raw`statuscol`] !== undefined) {
          _0x3b3568[String.raw`style`][String.raw`color`] = "#" + toHex6(_0x5bfc13[String.raw`statuscol`]);
        }
        createStatusfx(_0x4bf4ad, _0x3c078d, _0x4a4ac8.id, _0x552dfb, String.raw`translucent` == _0x3c078d[String.raw`effect`] ? _0x5bfc13[String.raw`statusglow`] : null);
        if (_0x552dfb) {
          _0x3b3568[String.raw`style`][String.raw`width`] = String.raw`115%`;
          _0x3b3568[String.raw`style`][String.raw`display`] = String.raw`block`;
          _0x3b3568[String.raw`style`][String.raw`overflow`] = String.raw`hidden`;
          _0x3b3568[String.raw`style`][String.raw`position`] = String.raw`relative`;
        }
      } else if (_0x508774) {
        let _0x75530a = document[String.raw`getElementById`](String.raw`status`);
        addText(_0x75530a, _0x4bf4ad);
        _0x75530a[String.raw`className`] = String.raw`mobStatus`;
      } else {
        document[String.raw`getElementById`](String.raw`statusNewPar`)[String.raw`className`] = String.raw`statuspar`;
        let _0x3833a9 = document[String.raw`getElementById`](String.raw`statusNew`);
        _0x3833a9[String.raw`className`] = String.raw`statuschild`;
        _0x3833a9[String.raw`innerHTML`] = _0x4bf4ad;
      }
    }
    if (_0x508774) {
      var _0x58c231 = _0x5bfc13[String.raw`status`][String.raw`substr`](0, 120);
      if (!_0x58c231 && !_0x58c231[String.raw`length`]) {
        document[String.raw`getElementById`](String.raw`name`)[String.raw`style`][String.raw`paddingTop`] = String.raw`1rem`;
      }
    }
    setValue(String.raw`statusedit`, _0x4a4ac8[String.raw`status`]);
    if (!_0x508774 && !actions[String.raw`IsToonsNoId`](_0x4a4ac8.id) && _0x4a4ac8[String.raw`regname`][String.raw`length`] && String.raw`function` == typeof parent[String.raw`isConnected`] && parent[String.raw`isConnected`]()) {
      setTimeout(() => {
        var _0xab8c9b = document[String.raw`getElementById`](String.raw`act_Powers`);
        if (_0xab8c9b && _0xab8c9b[String.raw`flags`] && _0xab8c9b[String.raw`flags`] & 1) {
          _0xab8c9b[String.raw`flags`] = _0xab8c9b[String.raw`flags`] & 268435454 | 0;
          _0xab8c9b[String.raw`style`][String.raw`opacity`] = 1;
        }
      }, 60000);
    }
    var _0x5a0c5c = _0x4a4ac8.on;
    let _0x5ad9cb = _0x4a4ac8[String.raw`on2`][String.raw`replace`](/`/gi, "\"");
    try {
      _0x5ad9cb = JSON[String.raw`parse`](_0x5ad9cb);
    } catch (_0x309eb2) {
      _0x5ad9cb = false;
    }
    if (_0x508774) ;else {
      var _0x5d06fc = "";
      if (_0x5ad9cb) {
        _0x5a0c5c = "";
        let _0x33d733 = _0x5ad9cb[String.raw`friend`] ? _0x5ad9cb[String.raw`friend`][String.raw`split`](";=") : [];
        let _0x4686fd = _0x33d733[0] || false;
        let _0x3ae29e = _0x33d733[1] || false;
        if (_0x3ae29e && _0x4686fd) {
          _0x5a0c5c += _0x4686fd + " ";
        }
        if (_0x5ad9cb[String.raw`online`]) {
          _0x5a0c5c += _0x5ad9cb[String.raw`online`] + " ";
        }
        if (_0x5ad9cb[String.raw`rank`]) {
          _0x5a0c5c += _0x5ad9cb[String.raw`rank`] + " ";
        }
        if (_0x5ad9cb[String.raw`other`]) {
          _0x5a0c5c += _0x5ad9cb[String.raw`other`] + " ";
        }
        if (!_0x5ad9cb[String.raw`Locating`] && !actions[String.raw`IsToonsNoId`](_0x4a4ac8.id)) {
          if (_0x3ae29e) {
            _0x5a0c5c += _0x3ae29e + " ";
          }
          if (!_0x3ae29e && _0x4686fd) {
            _0x5a0c5c += _0x4686fd + " ";
          }
        }
      }
      if (_0x4a4ac8[String.raw`location`]) {
        var _0x37c2f1 = _0x4a4ac8[String.raw`location`][String.raw`substr`](1);
        if (_0x4a4ac8[String.raw`location`][String.raw`charAt`](0) !== "@") {
          _0x5a0c5c += " " + _0x4a4ac8[String.raw`location`];
        } else {
          let _0x5351e5 = parent[String.raw`defconfig`];
          if (!_0x5351e5[String.raw`GroupName`]) {
            _0x5351e5[String.raw`GroupName`] = "";
          }
          if (_0x37c2f1[String.raw`toLowerCase`]() != _0x5351e5[String.raw`GroupName`][String.raw`toLowerCase`]()) {
            _0x5d06fc = makeElement(0, "a");
            var _0xf5f9c = _0x4a4ac8[String.raw`location`][String.raw`replace`](/[^a-zA-Z0-9_@ ]/g, "");
            _0x5d06fc[String.raw`href`] = "/" + _0xf5f9c[String.raw`substr`](1);
            _0x5d06fc[String.raw`target`] = String.raw`_blank`;
            addText(_0x5d06fc, _0xf5f9c);
          }
        }
      }
      setTextNode("on", _0x5a0c5c + " ", _0x5d06fc);
      document[String.raw`getElementById`]("on")[String.raw`style`][String.raw`cssText`] = String.raw`font-size: 12px; color: #5f5f5f;`;
      document[String.raw`getElementById`](String.raw`labelname`)[String.raw`style`][String.raw`display`] = String.raw`none`;
      document[String.raw`getElementById`](String.raw`labelon`)[String.raw`style`][String.raw`display`] = String.raw`none`;
    }
    var _0x2ba685 = _0x3bd48e[String.raw`main`][0];
    _0x2ba685 &&= _0x2ba685[String.raw`name`];
    if (_0x2ba685) {
      actions[String.raw`buildWallet`](_0x2ba685);
    }
    let _0x90a848 = document[String.raw`getElementById`](String.raw`profileIcons`);
    _0x90a848[String.raw`style`][String.raw`marginTop`] = String.raw`5px`;
    _0x90a848[String.raw`style`][String.raw`display`] = _0x508774 ? String.raw`inline` : String.raw`grid`;
    let _0x4cab96 = makeElement(_0x90a848, String.raw`span`);
    function _0x4bb635() {
      if (_0x5ad9cb) {
        if (_0x5ad9cb[String.raw`reg`]) {
          let _0x68e365 = makeElement(_0x4cab96, "a");
          _0x68e365[String.raw`style`][String.raw`marginLeft`] = String.raw`-1px`;
          makeElement(_0x68e365, String.raw`img`)[String.raw`src`] = String.raw`svg/registered.svg`;
          addToolTip(_0x68e365, [String.raw`mob2.reg`, String.raw`Registered`], {
            select: true,
            position: _0x508774 ? String.raw`left` : String.raw`low`
          });
        }
        if (_0x5ad9cb[String.raw`sub`]) {
          let _0x253ccc = makeElement(_0x4cab96, "a");
          _0x253ccc[String.raw`style`][String.raw`marginLeft`] = String.raw`-1px`;
          makeElement(_0x253ccc, String.raw`img`)[String.raw`src`] = String.raw`svg/subscriber.svg`;
          addToolTip(_0x253ccc, [String.raw`mob2.sub`, String.raw`Subscriber`], {
            select: true,
            position: _0x508774 ? String.raw`left` : String.raw`low`
          });
        }
        if (_0x5ad9cb[String.raw`married`]) {
          let _0xbfda56 = _0x5ad9cb[String.raw`married`][String.raw`split`](",");
          let _0x409f35 = _0xbfda56[1] || "";
          let _0x3c8ca4 = _0xbfda56[2] || "";
          _0x3c8ca4 = parseInt(_0x3c8ca4);
          let _0x4a6bd7 = makeElement(_0x4cab96, "a");
          _0x4a6bd7[String.raw`style`][String.raw`marginLeft`] = _0x508774 ? String.raw`2px` : String.raw`-1px`;
          makeElement(_0x4a6bd7, String.raw`img`)[String.raw`src`] = String.raw`svg/heart2.svg`;
          let _0x314ec0 = !isNaN(_0x3c8ca4) && new Date(_0x3c8ca4 * 1000)[String.raw`toISOString`]()[String.raw`substr`](0, 10);
          if (_0x409f35) {
            _0x4a6bd7[String.raw`addEventListener`](String.raw`click`, () => {
              var _0x49d70f = {};
              ;
              ;
              parent[String.raw`openInNewTab`](String.raw`https://me.rxat.ro/` + _0x409f35);
            });
          }
          addToolTip(_0x4a6bd7, _0x314ec0 ? [String.raw`mob2.marriedtosince`, String.raw`Married to: $1, Since: $2`, _0x409f35, _0x314ec0] : [String.raw`mob2.marriedto`, String.raw`Married to: $1`, _0x409f35], {
            select: true,
            position: _0x508774 ? String.raw`left` : String.raw`low`
          });
        }
        if (_0x5ad9cb[String.raw`bff`]) {
          let _0x5501df = _0x5ad9cb[String.raw`bff`][String.raw`split`](",");
          let _0x238262 = _0x5501df[1] || "";
          let _0x489b39 = _0x5501df[2] || "";
          _0x489b39 = parseInt(_0x489b39);
          let _0xe5e426 = makeElement(_0x4cab96, "a");
          _0xe5e426[String.raw`style`][String.raw`marginLeft`] = _0x508774 ? String.raw`2px` : String.raw`-1px`;
          let _0x2d08ba = makeElement(_0xe5e426, String.raw`img`);
          _0x2d08ba[String.raw`src`] = String.raw`svg/bff.svg`;
          _0x2d08ba[String.raw`style`][String.raw`width`] = String.raw`17px`;
          let _0x3d8d88 = !isNaN(_0x489b39) && new Date(_0x489b39 * 1000)[String.raw`toISOString`]()[String.raw`substr`](0, 10);
          if (_0x238262) {
            _0xe5e426[String.raw`addEventListener`](String.raw`click`, () => {
              parent[String.raw`openInNewTab`](String.raw`https://me.rxat.ro/` + _0x238262);
            });
          }
          addToolTip(_0xe5e426, _0x3d8d88 ? [String.raw`mob2.bfftosince`, String.raw`BFF to: $1, Since: $2`, _0x238262, _0x3d8d88] : [String.raw`mob2.bffto`, String.raw`BFF to: $1`, _0x238262], {
            select: true,
            position: _0x508774 ? String.raw`left` : String.raw`low`
          });
        }
        let _0x1d366d = function (_0xd3a263) {
          if (!_0xd3a263) {
            return false;
          }
          let _0x2a4b24 = _0xd3a263[String.raw`married`] ? _0xd3a263[String.raw`married`] : _0xd3a263[String.raw`bff`];
          if (_0x2a4b24) {
            let _0x37f7d7 = _0x2a4b24[String.raw`split`](",");
            if (!_0x37f7d7[2]) {
              return false;
            }
            _0x37f7d7[2] = parseInt(_0x37f7d7[2]);
            if (isNaN(_0x37f7d7[2])) {
              return;
            }
            let _0x4456c7 = new Date();
            let _0x5915e9 = new Date(_0x37f7d7[2] * 1000);
            if (_0x4456c7[String.raw`getMonth`]() == _0x5915e9[String.raw`getMonth`]() && _0x4456c7[String.raw`getDate`]() == _0x5915e9[String.raw`getDate`]() && _0x4456c7[String.raw`getFullYear`]() != _0x5915e9[String.raw`getFullYear`]()) {
              return _0x4456c7[String.raw`getFullYear`]() - _0x5915e9[String.raw`getFullYear`]();
            }
          }
          return false;
        }(_0x5ad9cb);
        if (_0x1d366d) {
          let _0x21fafc = makeElement(_0x4cab96, String.raw`span`);
          addText(_0x21fafc, [String.raw`mob2.anniversary`, String.raw`Happy $1 Anniversary!`, _0x1d366d]);
          _0x21fafc[String.raw`className`] = String.raw`anBlink`;
          if (!_0x508774) {
            _0x21fafc[String.raw`style`][String.raw`cssText`] = String.raw`float: none; vertical-align: middle;`;
          }
        }
      }
      if (_0x4a4ac8[String.raw`homepage`]) {
        setValue(String.raw`homepageedit`, _0x4a4ac8[String.raw`homepage`]);
        let _0x27478e = parent[String.raw`WordIsLink`](_0x4a4ac8[String.raw`homepage`]);
        if (_0x27478e) {
          let _0x7cdcc8 = makeElement(_0x4cab96, "a");
          _0x7cdcc8[String.raw`style`][String.raw`marginLeft`] = _0x508774 ? String.raw`2px` : String.raw`-1px`;
          let _0x14d93e = makeElement(_0x7cdcc8, String.raw`img`);
          _0x14d93e[String.raw`src`] = String.raw`svg/home.svg`;
          _0x14d93e[String.raw`style`][String.raw`width`] = String.raw`22px`;
          addToolTip(_0x7cdcc8, _0x4a4ac8[String.raw`homepage`], {
            select: true,
            position: _0x508774 ? String.raw`left` : String.raw`low`
          });
          _0x7cdcc8[String.raw`addEventListener`](String.raw`click`, _0x46fe37 => {
            parent[String.raw`LinkValidator`](_0x46fe37, _0x27478e);
          });
        }
      }
      if (!_0x508774 && _0x3bd48e[String.raw`user`][0][String.raw`regname`]) {
        let _0x1d418e = makeElement(_0x4cab96, "a");
        let _0x3b241a = makeElement(_0x1d418e, String.raw`img`);
        _0x3b241a[String.raw`src`] = String.raw`svg/gifts2.svg`;
        _0x3b241a[String.raw`style`][String.raw`marginTop`] = String.raw`1px`;
        addToolTip(_0x1d418e, [String.raw`box.257`, String.raw`Gifts`], {
          select: true,
          position: String.raw`low`
        });
        _0x1d418e[String.raw`addEventListener`](String.raw`click`, () => {
          parent[String.raw`setAppIcon`](20044);
          parent[String.raw`classicSetDialog`](String.raw`selector`, {
            Type: String.raw`Gifts`,
            MainObj: _0x3bd48e
          });
        });
      }
    }
    _0x4cab96[String.raw`className`] = String.raw`profileIc`;
    if (!_0x5ad9cb[String.raw`Locating`] && !_0x508774) {
      _0x4bb635();
    }
    if (_0x508774) {
      _0x4bb635();
    }
    setValue(String.raw`avataredit`, _0x4a4ac8[String.raw`avatar`]);
    _0x52cb13 = String.raw`buttonsBot`;
    document[String.raw`getElementById`](String.raw`butLeft`)[String.raw`style`][String.raw`cssText`] = String.raw`width: 100%;`;
    document[String.raw`getElementById`](String.raw`infoCell`)[String.raw`style`][String.raw`cssText`] = String.raw`width: 100%;`;
    document[String.raw`getElementById`](String.raw`infoCell`)[String.raw`className`] = String.raw`cell profileInfo shadTxtClassic`;
    _0x18314c(String.raw`main`);
    var _0x459ed3;
    var _0x9affb6;
    var _0x35b893;
    var _0x1082c1 = _0x4a4ac8[String.raw`avatar`];
    var _0x416e17 = document[String.raw`getElementById`](String.raw`avatarPosLeft`);
    var _0x4a8a6e = makeElement(_0x416e17, String.raw`div`);
    if (_0x508774) {
      _0x459ed3 = _0x35b893 = 30;
      var _0x5c913a = {
        [String.raw`save`]: true,
        [String.raw`copy`]: true,
        [String.raw`input`]: true
      };
      var _0x11cea3 = {
        [String.raw`palette`]: true,
        [String.raw`preview`]: true,
        [String.raw`opacity`]: true,
        [String.raw`hue`]: true
      };
      var _0x352520 = _0x5c913a;
      var _0x262dc1 = _0x11cea3;
      _0x262dc1[String.raw`interaction`] = _0x352520;
      var _0x36231c = {
        el: String.raw`#nameColor`,
        [String.raw`theme`]: String.raw`nano`,
        [String.raw`preview`]: true,
        [String.raw`useAsButton`]: true,
        [String.raw`closeOnScroll`]: false,
        [String.raw`lockOpacity`]: true
      };
      var _0x36f361 = _0x36231c;
      _0x36f361[String.raw`components`] = _0x262dc1;
      let _0x981f56 = Pickr[String.raw`create`](_0x36f361).on(String.raw`save`, _0x3aa59c => {
        let _0x46ad0c = document[String.raw`createElement`](String.raw`textarea`);
        _0x46ad0c[String.raw`value`] = _0x3aa59c[String.raw`toHEXA`]()[String.raw`toString`]();
        document[String.raw`body`][String.raw`appendChild`](_0x46ad0c);
        _0x46ad0c[String.raw`select`]();
        document[String.raw`execCommand`](String.raw`copy`);
        document[String.raw`body`][String.raw`removeChild`](_0x46ad0c);
        _0x981f56[String.raw`hide`]();
      }).on(String.raw`show`, () => {
        var _0x1e236e = {};
        ;
        let _0x5a0ce9 = GetTranslation(String.raw`mob2.copycolor`);
        _0x5a0ce9 ||= String.raw`copy color`;
        const _0x2f173e = document[String.raw`querySelectorAll`](String.raw`.pcr-save`);
        _0x2f173e[_0x2f173e[String.raw`length`] - 1][String.raw`value`] = _0x5a0ce9;
      });
      parent[String.raw`addEventListener`](String.raw`click`, () => {
        _0x981f56[String.raw`hide`]();
      }, false);
      let _0x18646e = document[String.raw`getElementById`](String.raw`colorWheel`);
      if (!parent[String.raw`Classic`]) {
        _0x18646e[String.raw`style`][String.raw`marginTop`] = String.raw`-1px`;
      }
      addToolTip(_0x18646e, [String.raw`mob2.colorpicker`, String.raw`Color Picker`], {
        select: true,
        position: String.raw`left`
      });
    } else if (_0x508774) {
      _0x416e17[String.raw`style`][String.raw`cssText`] = String.raw`height: 100%; padding: 0.4rem;`;
      _0x4a8a6e[String.raw`style`][String.raw`cssText`] = String.raw`height: 100%;`;
      _0x459ed3 = _0x4a8a6e[String.raw`clientHeight`] - 12;
      _0x35b893 = xInt((document[String.raw`body`][String.raw`clientWidth`] - 24) * 0.5 * 1);
    } else {
      _0x459ed3 = _0x35b893 = 75;
    }
    if (_0x459ed3 > _0x35b893) {
      _0x459ed3 = _0x35b893;
    }
    _0x9affb6 = _0x459ed3;
    if (_0x1082c1[String.raw`charAt`](0) == "(") {
      _0x9affb6 = calcStripSize(_0x459ed3);
    } else {
      _0x9affb6 = calcAvSize(_0x459ed3);
      if (_0x1082c1 > 0 && _0x9affb6 > 30) {
        _0x9affb6 = 30;
      }
    }
    var _0x323a1e = document[String.raw`getElementById`](String.raw`avatarPosLeft`);
    let _0x1a83f7 = makeElement(_0x323a1e, String.raw`div`, String.raw`buttonimg`);
    _0x416e17[String.raw`style`][String.raw`cssText`] = _0x508774 ? String.raw`padding: 0 5px 0 0;` : String.raw`padding: 0.5rem; padding-bottom: 3.5rem;`;
    _0x4a8a6e[String.raw`style`][String.raw`cssText`] = String.raw`width:` + _0x459ed3 + "px";
    document[String.raw`getElementById`](String.raw`botPad`)[String.raw`style`][String.raw`cssText`] = String.raw`height: 100%;`;
    document[String.raw`getElementById`](String.raw`tgreen`)[String.raw`style`][String.raw`height`] = String.raw`auto`;
    document[String.raw`getElementById`](String.raw`tgreen`)[String.raw`parentNode`][String.raw`style`][String.raw`height`] = String.raw`auto`;
    _0x3fc33d = makeElement(document[String.raw`body`], String.raw`div`, String.raw`profileAvatar`, String.raw`avatarid`);
    makeElement(_0x3fc33d, String.raw`div`, String.raw`buttonimg`)[String.raw`pFlags`] = _0x4a4ac8[String.raw`pFlags`];
    _0x1a83f7[String.raw`pFlags`] = _0x4a4ac8[String.raw`pFlags`];
    _0x416e17[String.raw`offsetLeft`];
    var _0x32a1e4 = {
      [String.raw`name`]: 1,
      [String.raw`avatar`]: 1,
      [String.raw`status`]: 1,
      [String.raw`homepage`]: 1
    };
    var _0x7ac60b;
    var _0x1279be;
    var _0x7b3682 = _0x416e17[String.raw`offsetTop`] + 6 + "px";
    var _0x52b255 = _0x32a1e4;
    _0x3fc33d[String.raw`style`][String.raw`cssText`] = String.raw`position: absolute; left: 4.5px; top: ` + _0x7b3682 + String.raw`; width: ` + _0x459ed3 + String.raw`; height: ` + _0x459ed3 + String.raw`; z-index: -1;`;
    LoadImage(_0x1a83f7, _0x1082c1, String.raw`buttonimg`, xInt(_0x9affb6), 0, _0x459ed3 / _0x9affb6, true);
    _0x1a83f7[String.raw`style`][String.raw`cursor`] = String.raw`pointer`;
    if (_0x3bd48e[String.raw`user`][0][String.raw`regname`]) {
      _0x1a83f7[String.raw`holder`][String.raw`onclick`] = function (_0x3b3ca6) {
        HitWeb(String.raw`https://me.rxat.ro/` + _0x3bd48e[String.raw`user`][0][String.raw`regname`]);
      };
    }
    if (_0x508774) {
      for (_0x7ac60b in _0x52b255) {
        if (_0x1279be = document[String.raw`getElementById`](_0x7ac60b + String.raw`edit`)) {
          _0x1279be[String.raw`onblur`] = function (_0x2a88a2) {
            actions[String.raw`DoBlur`](_0x2a88a2);
          };
        }
      }
    }
    actions[String.raw`checkIfButtons`]();
  };
  this[String.raw`DoBlur`] = function (_0x3c9159) {
    var _0x3f6050 = _0x3bd48e[String.raw`user`][0];
    if ((_0x3c9159 = _0x3c9159[String.raw`currentTarget`]).id) {
      _0x3c9159.id[String.raw`substr`](_0x3c9159.id[String.raw`length`] - 4);
      _0x3f6050[_0x3c9159.id[String.raw`substr`](0, _0x3c9159.id[String.raw`length`] - 4)] = _0x3c9159[String.raw`value`];
      actions[String.raw`configurePage`]();
    }
  };
  this[String.raw`updatePC`] = function (_0x1c1bd5) {
    var _0x409841 = [String.raw`PrivateChat`, String.raw`PrivateMessage`];
    var _0x134ea6 = _0x1c1bd5 ? 0 : 1;
    for (var _0x1531e3 in _0x409841) {
      var _0x2f052 = document[String.raw`getElementById`](String.raw`act_` + _0x409841[_0x1531e3]);
      if (_0x2f052) {
        _0x2f052[String.raw`flags`] = _0x2f052[String.raw`flags`] & 268435454 | _0x134ea6;
        _0x2f052[String.raw`style`][String.raw`opacity`] = _0x134ea6 ? String.raw`0.5` : "1";
      }
    }
  };
  this[String.raw`doBuyXats`] = function (_0x2c188d) {
    ToC({
      Command: String.raw`Action`,
      name: String.raw`MakePurchase`,
      N: _0x2c188d
    });
    _0x234b14();
  };
  this[String.raw`BuyXatsDialog`] = function (_0x16af83) {
    var _0x2aac83 = JSON[String.raw`parse`](_0x16af83);
    actions[String.raw`locDoModal`](String.raw`BuyXatsDialog`);
    var _0x266554;
    var _0x289055;
    var _0x531893;
    var _0x22fc21;
    var _0x1608e2 = [];
    var _0x10de81 = [];
    var _0x180550 = document[String.raw`getElementById`](String.raw`BuyTable`);
    for (var _0x56b7b6 in _0x2aac83) {
      if (_0x56b7b6[String.raw`charAt`](0) == "i" && _0x56b7b6[String.raw`charAt`](1) == "N") {
        _0x289055 = xInt(_0x56b7b6[String.raw`substr`](2));
        _0x266554 = _0x2aac83[_0x56b7b6];
        _0x1608e2[_0x289055] = _0x2aac83["iD" + _0x289055];
        _0x10de81[_0x289055] = _0x266554;
      }
    }
    for (_0x289055 in _0x1608e2) {
      (_0x22fc21 = makeElement(_0x180550, String.raw`div`, String.raw`dialogRow`))[String.raw`xats`] = _0x10de81[_0x289055];
      _0x22fc21[String.raw`onclick`] = function (_0x58b8eb) {
        actions[String.raw`doBuyXats`](this[String.raw`xats`]);
      };
      (_0x531893 = makeElement(_0x22fc21, String.raw`div`, String.raw`dialogCell cellWide`))[String.raw`setAttribute`](String.raw`style`, String.raw`text-align:center`);
      makeElement(_0x531893, String.raw`span`);
      _0x531893[String.raw`setAttribute`](String.raw`style`, String.raw`color:#02a9d2`);
      _0x531893[String.raw`innerHTML`] = _0x1608e2[_0x289055];
    }
  };
  this[String.raw`LoginCancel`] = function () {
    modalClose();
    if (_0x55387c) {
      actions[String.raw`doLoginDialog`]();
    }
  };
  this[String.raw`Logout`] = function () {
    var _0x586e61 = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`name`]: String.raw`Logout`,
      [String.raw`Command`]: String.raw`Action`,
      [String.raw`Next`]: String.raw`profile`
    };
    var _0x43030c = _0x586e61;
    ToC(_0x43030c);
    return false;
  };
  this[String.raw`Login`] = function () {
    var _0x44168e = document[String.raw`getElementById`](String.raw`openModal`);
    if (_0x44168e) {
      _0x44168e[String.raw`style`][String.raw`visibility`] = String.raw`hidden`;
    }
    var _0x128f32 = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`Login`
    };
    var _0x11cc8d = _0x128f32;
    var _0x4cc48c = _0x11cc8d;
    _0x4cc48c[String.raw`Username`] = document[String.raw`getElementById`](String.raw`lusername`)[String.raw`value`];
    _0x4cc48c[String.raw`Password`] = document[String.raw`getElementById`](String.raw`lpassword`)[String.raw`value`];
    if (FillInAll(_0x4cc48c, [String.raw`Username`, String.raw`Password`])) {
      ToC(_0x4cc48c);
    }
    return false;
  };
  var _0x36a9b1;
  var _0x864f6b = /[^0-9A-Za-z]/g;
  var _0x29c15a = /[^0-9A-Za-z\.\-@_]/g;
  function _0x1977bd() {
    actions[String.raw`locDoModal`](String.raw`LogoutOK`);
  }
  function _0x457305() {
    _0x41cfd5 = [];
    _0x36a9b1 = [];
    var _0x376fbc = _0x3bd48e[String.raw`AllPowers`][0];
    for (var _0x37d96b in _0x376fbc) {
      var _0x10fbfe = _0x37d96b * 32;
      for (var _0x2eb77d = 0; _0x2eb77d < 32; _0x2eb77d++) {
        if (_0x376fbc[_0x37d96b] & 1 << _0x2eb77d) {
          _0x41cfd5[_0x10fbfe + _0x2eb77d] = 1;
        }
      }
    }
    if (_0x3bd48e[String.raw`Collections`]) {
      _0x36a9b1 = _0x3bd48e[String.raw`Collections`][0];
    }
    if (_0x36a9b1) {
      for (var _0x37d96b in _0x36a9b1) {
        _0x41cfd5[_0x37d96b] = _0x36a9b1[_0x37d96b];
      }
    }
    var _0x559e4a = _0x3bd48e[String.raw`PowersOflo`];
    _0x559e4a &&= _0x559e4a[0];
    _0x559e4a &&= _0x559e4a[0];
    if (_0x559e4a) {
      var _0x16a0d0 = _0x559e4a[String.raw`split`]("|");
      for (_0x2eb77d = 0; _0x2eb77d < _0x16a0d0[String.raw`length`]; _0x2eb77d++) {
        var _0x37a4d2 = _0x16a0d0[_0x2eb77d][String.raw`split`]("=");
        var _0x2012b1 = xInt(_0x37a4d2[1]);
        if (_0x2012b1 == 0) {
          _0x2012b1 = 1;
        }
        _0x41cfd5[_0x37a4d2[0]] = 1 + _0x2012b1;
      }
    }
  }
  function _0x37be9a() {
    var _0xb6db79 = clearDiv(String.raw`all2`);
    DumpMemory(0);
    return _0xb6db79;
  }
  this[String.raw`Register`] = function () {
    ;
    ;
    var _0x1462d9 = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`Register`
    };
    var _0x21ea76 = _0x1462d9;
    var _0x356d03 = _0x21ea76;
    _0x356d03[String.raw`Username`] = document[String.raw`getElementById`](String.raw`rusername`)[String.raw`value`];
    _0x25db20 = _0x356d03[String.raw`Password1`] = document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`value`];
    _0x35fd37 = _0x356d03[String.raw`Email`] = document[String.raw`getElementById`](String.raw`remail`)[String.raw`value`];
    if (FillInAll(_0x356d03, [String.raw`Username`, String.raw`Password1`, String.raw`Email`])) {
      ToC(_0x356d03);
    }
    return false;
  };
  this[String.raw`forgotPass`] = function (_0x49bd25) {
    var _0x3f0a95;
    var _0x2bf1eb = document[String.raw`getElementById`](String.raw`lusername`);
    _0x2bf1eb ||= document[String.raw`getElementById`](String.raw`lemail`);
    _0x2bf1eb &&= _0x2bf1eb[String.raw`value`][String.raw`toLowerCase`]();
    if (_0x49bd25) {
      _0x3f0a95 = _0x49bd25;
    }
    if (_0x49bd25 && _0x49bd25[String.raw`charAt`](0) == "{") {
      var _0x57cf26 = JSON[String.raw`parse`](_0x49bd25);
      if (_0x57cf26[String.raw`html`]) {
        actions[String.raw`doLoginDialog`]();
        AlertMessage(_0x57cf26[String.raw`html`], 1);
        if (_0x2bf1eb) {
          document[String.raw`getElementById`](String.raw`lusername`)[String.raw`value`] = _0x2bf1eb;
        }
        return;
      }
      _0x3f0a95 = "";
    }
    actions[String.raw`locDoModal`](String.raw`ResetPassword`);
    if (_0x3f0a95) {
      AlertMessage(_0x3f0a95, 1);
    }
    if (_0x2bf1eb) {
      document[String.raw`getElementById`](String.raw`lemail`)[String.raw`value`] = _0x2bf1eb;
    }
  };
  this[String.raw`ResetPassword`] = function () {
    var _0x14fd9a = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`ResetPassword`
    };
    var _0x5e9e6b = _0x14fd9a;
    var _0x3001ad = _0x5e9e6b;
    _0x35fd37 = _0x3001ad[String.raw`Email`] = document[String.raw`getElementById`](String.raw`lemail`)[String.raw`value`][String.raw`toLowerCase`]();
    if (FillInAll(_0x3001ad, [String.raw`Email`])) {
      ToC(_0x3001ad);
    }
    return false;
  };
  this[String.raw`RegisterError`] = function (_0x321ddf) {
    if (_0x321ddf[String.raw`charAt`](0) == "{") {
      actions[String.raw`locDoModal`](String.raw`RegisterOK`);
      var _0x2508ef = JSON[String.raw`parse`](_0x321ddf);
      _0x321ddf = _0x2508ef[String.raw`html`];
      _0x2508ef[String.raw`html`] = "";
      _0x2508ef[String.raw`Page`] = String.raw`profile`;
      _0x2508ef[String.raw`Command`] = String.raw`SetUserId`;
      ToC(_0x2508ef);
    }
    document[String.raw`getElementById`](String.raw`RegErr`)[String.raw`innerHTML`] = _0x321ddf;
  };
  this[String.raw`doRegisterDialog`] = function (_0xb3f9f5) {
    actions[String.raw`locDoModal`](String.raw`RegisterDialog`);
    if (_0xb3f9f5) {
      if ((_0xb3f9f5 = JSON[String.raw`parse`](_0xb3f9f5))[String.raw`RegisterName`]) {
        document[String.raw`getElementById`](String.raw`rusername`)[String.raw`value`] = _0xb3f9f5[String.raw`RegisterName`];
      }
      if (_0xb3f9f5[String.raw`RegisterPass`]) {
        document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`value`] = _0xb3f9f5[String.raw`RegisterPass`];
      }
      if (_0xb3f9f5[String.raw`RegisterEmail`]) {
        document[String.raw`getElementById`](String.raw`remail`)[String.raw`value`] = _0xb3f9f5[String.raw`RegisterEmail`];
      }
    }
    document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`onkeyup`] = function (_0x4a359f) {
      return restrictCharacters2(_0x4a359f, _0x864f6b);
    };
    document[String.raw`getElementById`](String.raw`remail`)[String.raw`onkeyup`] = function (_0x4fe25b) {
      return restrictCharacters2(_0x4fe25b, _0x29c15a);
    };
  };
  this[String.raw`LoginSetName`] = function () {
    if (_0x35fd37 && _0x35fd37[String.raw`length`] > 0) {
      document[String.raw`getElementById`](String.raw`lusername`)[String.raw`value`] = _0x35fd37;
    }
    if (_0x25db20 && _0x25db20[String.raw`length`] > 0) {
      document[String.raw`getElementById`](String.raw`lpassword`)[String.raw`value`] = _0x25db20;
    }
  };
  this[String.raw`doProfileDialog`] = function () {
    actions[String.raw`locDoModal`](String.raw`EditProfileDialog`);
    var _0x5d46d6 = _0x3bd48e[String.raw`user`][0];
    document[String.raw`getElementById`](String.raw`iname`)[String.raw`value`] = _0x5d46d6[String.raw`name`];
    document[String.raw`getElementById`](String.raw`iavatar`)[String.raw`value`] = _0x5d46d6[String.raw`avatar`];
    document[String.raw`getElementById`](String.raw`istatus`)[String.raw`value`] = _0x5d46d6[String.raw`status`];
    document[String.raw`getElementById`](String.raw`ihomepage`)[String.raw`value`] = _0x5d46d6[String.raw`homepage`];
  };
  this[String.raw`doLoginDialog`] = function (_0x20bbf3) {
    xrRoot[String.raw`selector`][String.raw`DoLoginEtc`](String.raw`LoginForm`);
  };
  this[String.raw`quitEdit`] = function () {
    var _0x10efb0 = {
      [String.raw`name`]: String.raw`SetEditButtonEdit`
    };
    var _0x299f5b = _0x10efb0;
    ToC(_0x299f5b);
    modalClose();
  };
  this[String.raw`saveProfile`] = function () {
    var _0x4e566e = {
      [String.raw`Page`]: String.raw`profile`
    };
    var _0x5bb123 = _0x4e566e;
    var _0x55b4a0 = _0x5bb123;
    _0x55b4a0[String.raw`name`] = _0x55b4a0[String.raw`Type`] = _0x55b4a0[String.raw`Command`] = String.raw`SaveXatspace`;
    _0x55b4a0[String.raw`Name`] = document[String.raw`getElementById`](String.raw`nameedit`)[String.raw`value`];
    _0x55b4a0[String.raw`Avatar`] = document[String.raw`getElementById`](String.raw`avataredit`)[String.raw`value`];
    _0x55b4a0[String.raw`status`] = document[String.raw`getElementById`](String.raw`statusedit`)[String.raw`value`];
    _0x55b4a0[String.raw`HomePage`] = document[String.raw`getElementById`](String.raw`homepageedit`)[String.raw`value`];
    ToC(_0x55b4a0);
    return false;
  };
  this[String.raw`termsOfService`] = function () {
    HitWeb(String.raw`/terms?m=1`);
  };
  this[String.raw`doFav`] = function (_0x542bb2, _0x46bd85) {
    var _0x386b09 = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`SetPower`
    };
    var _0x406114 = _0x386b09;
    var _0x44bff1 = _0x406114;
    var _0x456617 = _0x3bd48e[String.raw`PowersMask`][0];
    var _0x2a1ec6 = document[String.raw`getElementById`]("m" + _0x46bd85);
    if (_0x542bb2) {
      _0x542bb2[String.raw`stopPropagation`]();
    }
    var _0x11da47 = 0;
    if (_0x2a1ec6[String.raw`src`][String.raw`search`](String.raw`svg/off.svg`) >= 0) {
      _0x2a1ec6[String.raw`src`] = String.raw`svg/on.svg`;
    } else {
      _0x2a1ec6[String.raw`src`] = String.raw`svg/off.svg`;
      _0x11da47 = 1;
    }
    _0x456617[_0x46bd85 >> 5] = _0x456617[_0x46bd85 >> 5] & ~(1 << _0x46bd85 % 32) | _0x11da47 * (1 << _0x46bd85 % 32);
    _0x44bff1[String.raw`Value`] = _0x11da47;
    _0x44bff1.Id = _0x46bd85;
    this[String.raw`ReLogin`] = true;
    ToC(_0x44bff1);
  };
  this[String.raw`getMe`] = function () {
    return _0x508774;
  };
  this[String.raw`IsToonsNoId`] = function (_0x5a40ed) {
    return (_0x5a40ed = parseInt(_0x5a40ed)) >= 1900000000;
  };
  this[String.raw`checkIfButtons`] = function (_0x5314f7) {
    var _0x599dc;
    var _0x3bccf0;
    if (!_0x5752a3) {
      return false;
    }
    let _0x279b61 = document[String.raw`querySelector`](String.raw`#tgreen`);
    let _0x3b48c7 = (_0x599dc = window) == null || (_0x3bccf0 = _0x599dc[String.raw`parent`]) == null ? undefined : _0x3bccf0[String.raw`document`];
    let _0x4d61b4 = _0x3b48c7 == null ? undefined : _0x3b48c7[String.raw`getElementsByClassName`](String.raw`dialogBody`);
    if (!_0x4d61b4) {
      return false;
    }
    _0x4d61b4[0][String.raw`style`][String.raw`height`] = String.raw`90%`;
    if (_0x508774 || !_0x279b61 || _0x5314f7) {
      return false;
    }
    let _0xddbe45 = _0x279b61[String.raw`offsetHeight`] + 30;
    _0x4d61b4[0][String.raw`style`][String.raw`height`] = _0xddbe45 + "px";
    heightModal(_0xddbe45);
    return _0xddbe45;
  };
  this[String.raw`buildWallet`] = function (_0x1e0d5a) {
    if (!_0x1e0d5a) {
      return;
    }
    let _0x1b83f6 = _0x1e0d5a[String.raw`split`](", ");
    let _0x5ad53d = _0x508774 ? document[String.raw`getElementById`]("on") : document[String.raw`getElementById`](String.raw`walletUser`);
    if (!_0x508774) {
      _0x5ad53d[String.raw`innerHTML`] = "";
    }
    if (!_0x5752a3 && !_0x508774 && !!_0x5ad53d) {
      _0x5ad53d[String.raw`classList`][String.raw`add`](String.raw`walletUserMobile`);
    }
    let _0x4850e7 = makeElement(_0x5ad53d, String.raw`span`);
    if (!_0x508774) {
      _0x4850e7[String.raw`style`][String.raw`cssText`] = String.raw`position: relative; left: 7px; bottom: 10px; font-size: 14px;`;
    }
    let _0x5ec1d3 = makeElement(_0x4850e7, String.raw`img`);
    _0x5ec1d3[String.raw`src`] = String.raw`svg/actBuyXats.svg`;
    _0x5ec1d3[String.raw`width`] = "18";
    _0x5ec1d3[String.raw`style`][String.raw`margin`] = String.raw`0 3px 0 -2px`;
    let _0x101775 = makeElement(_0x4850e7, String.raw`span`);
    _0x101775[String.raw`innerHTML`] = _0x1b83f6[0][String.raw`replace`](String.raw`xat`, String.raw`xat`);
    _0x101775[String.raw`className`] = String.raw`meWallet`;
    let _0xd3483a = makeElement(_0x5ad53d, String.raw`span`);
    if (_0x508774) {
      _0xd3483a[String.raw`style`][String.raw`marginLeft`] = String.raw`10px`;
    } else {
      _0xd3483a[String.raw`style`][String.raw`cssText`] = String.raw`position: relative; right: 10px; bottom: 10px; float: right; font-size: 14px;`;
    }
    let _0x117c44 = makeElement(_0xd3483a, String.raw`img`);
    _0x117c44[String.raw`src`] = String.raw`svg/star.svg`;
    _0x117c44[String.raw`width`] = "18";
    _0x117c44[String.raw`style`][String.raw`margin`] = String.raw`-4px 3px 0 0`;
    let _0x423d61 = makeElement(_0xd3483a, String.raw`span`);
    _0x423d61[String.raw`innerHTML`] = _0x1b83f6[1];
    _0x423d61[String.raw`className`] = String.raw`meWallet`;
  };
  this[String.raw`setBanRules`] = function (_0x3305f7) {
    if (!_0x3305f7 || document[String.raw`querySelector`](String.raw`#customBanField`)) {
      return;
    }
    let _0x3f0464 = document[String.raw`querySelector`](String.raw`#KickBan tbody`);
    let _0x56cf19 = document[String.raw`querySelector`](String.raw`#KickBan #Reason`);
    let _0x36c4a7 = document[String.raw`querySelector`](String.raw`#KickBan #Duration`);
    let _0x46e00c = _0x3305f7[String.raw`split`]("~");
    if (_0x46e00c[String.raw`length`] && _0x46e00c[0] != "") {
      let _0x59365d = makeElement(_0x3f0464, "tr");
      let _0xbbec56 = makeElement(_0x59365d, "td", String.raw`text-nowrap`);
      addText(_0xbbec56, [String.raw`mob1.or`, "Or"]);
      let _0x1adfb2 = makeElement(_0x59365d, "td");
      let _0x24d5cc = makeElement(_0x1adfb2, String.raw`div`, String.raw`xSelect wide`);
      _0x24d5cc[String.raw`style`][String.raw`maxWidth`] = String.raw`200px`;
      _0x24d5cc[String.raw`style`][String.raw`fontSize`] = String.raw`16px`;
      let _0x290c3c = makeElement(_0x24d5cc, String.raw`select`, undefined, String.raw`customBanField`);
      let _0x54bd50 = makeElement(_0x290c3c, String.raw`option`);
      _0x54bd50[String.raw`value`] = String.raw`null`;
      addText(_0x54bd50, [String.raw`mob1.choosecustomrule`, String.raw`Custom ban`]);
      for (let _0xe81e12 in _0x46e00c) {
        var _0x505486;
        var _0x4ebdc7;
        var _0x194f5e;
        let _0x3e5af7 = _0x46e00c[_0xe81e12][String.raw`split`](",");
        let _0x3fa143 = makeElement(_0x290c3c, String.raw`option`);
        _0x3fa143[String.raw`value`] = parseInt(_0x3e5af7[1]);
        _0x3fa143[String.raw`dataset`][String.raw`reason`] = (_0x505486 = _0x3e5af7[0]) == null ? undefined : _0x505486[String.raw`replace`](/["<>';=\\]/gi, "");
        let _0x3e322b = (_0x3e5af7[0] + String.raw` - ` + ((_0x4ebdc7 = _0x3e5af7[1]) == null) ? undefined : _0x4ebdc7[String.raw`replace`](/h/gi, "")) + "h";
        _0x3fa143[String.raw`appendChild`](document[String.raw`createTextNode`](("" + _0x3e5af7[0])[String.raw`length`] > 20 ? (("" + _0x3e5af7[0])[String.raw`substr`](0, 20) + String.raw`.. - ` + ((_0x194f5e = _0x3e5af7[1]) == null) ? undefined : _0x194f5e[String.raw`replace`](/h/gi, "")) + "h" : _0x3e322b));
        _0x3fa143[String.raw`title`] = "" + _0x3e5af7[0];
      }
      _0x290c3c[String.raw`addEventListener`](String.raw`change`, _0x3e9136 => {
        if (_0x56cf19) {
          _0x56cf19[String.raw`innerHTML`] = "";
        }
        if (_0x36c4a7) {
          _0x36c4a7[String.raw`innerHTML`] = "";
        }
        let _0x453d96 = _0x3e9136[String.raw`target`][String.raw`selectedIndex`];
        let _0x27e0fd = _0x3e9136[String.raw`target`][String.raw`options`][_0x3e9136[String.raw`target`][String.raw`selectedIndex`]][String.raw`dataset`][String.raw`reason`] || "";
        let _0x35ba84 = _0x3e9136[String.raw`target`][String.raw`value`];
        if (_0x453d96 === 0) {
          _0x27e0fd = "";
          _0x35ba84 = 1;
        }
        if (_0x56cf19 != null) {
          _0x56cf19[String.raw`appendChild`](document[String.raw`createTextNode`](_0x27e0fd));
        }
        if (_0x36c4a7 != null) {
          _0x36c4a7[String.raw`appendChild`](document[String.raw`createTextNode`](_0x35ba84));
        }
      });
    }
  };
  var _0x4ed6b4 = {
    LoginCancel: function () {
      ;
      actions[String.raw`LoginCancel`]();
    },
    forgotPass: function () {
      actions[String.raw`forgotPass`]();
    },
    doRegisterDialog: function () {
      actions[String.raw`doRegisterDialog`]();
    },
    Logout: function () {
      actions[String.raw`Logout`]();
    },
    termsOfService: function () {
      ;
      actions[String.raw`termsOfService`]();
    },
    doLoginDialog: function () {
      actions[String.raw`doLoginDialog`]();
    },
    Register: function () {
      actions[String.raw`Register`]();
    },
    getXats: function () {
      getXats();
    },
    quitEdit: function () {
      actions[String.raw`quitEdit`]();
    },
    saveProfile: function () {
      actions[String.raw`saveProfile`]();
    },
    clearLogin: function () {
      clearAlertMessage();
      actions[String.raw`Login`]();
    },
    LoginAndSetName: function () {
      actions[String.raw`doLoginDialog`]();
      actions[String.raw`LoginSetName`]();
    },
    clearResetPassword: function () {
      clearAlertMessage();
      actions[String.raw`ResetPassword`]();
    },
    modalClose: function () {
      modalClose();
    }
  };
  var _0x36f23e = _0x4ed6b4;
  this[String.raw`locDoModal`] = function (_0x49a159) {
    var _0x461c8b;
    var _0x1fef43;
    doModal(_0x49a159);
    for (_0x461c8b in _0x36f23e) {
      if (_0x1fef43 = document[String.raw`getElementById`](_0x461c8b)) {
        _0x1fef43[String.raw`addEventListener`](String.raw`click`, _0x36f23e[_0x461c8b]);
      }
    }
  };
  this[String.raw`BuyXats`] = function () {
    ToC({
      name: String.raw`BuyXats`,
      UserNo: _0x2d562c,
      Page: String.raw`actions`,
      Command: String.raw`Action`,
      Next: String.raw`pop`,
      Type: String.raw`Action`
    });
  };
}();
var _mystage;
var cjso = {};
var cjsn = "";
function main() {
  window[String.raw`addEventListener`](String.raw`message`, onMessage, false);
  try {
    document[String.raw`addEventListener`](String.raw`click`, onClick, false);
  } catch (_0x1b64fb) {}
}
function onMessage(_0x50d35a) {
  var _0xe9edd3 = JSON[String.raw`parse`](_0x50d35a[String.raw`data`]);
  switch (_0xe9edd3[String.raw`action`]) {
    case String.raw`kiss`:
      loadJs("ks", _0xe9edd3[String.raw`name`], function () {
        createJsLoaded(_0xe9edd3);
      }, _0xe9edd3[String.raw`Bust`]);
  }
}
function onClick(_0x1c9f46) {
  var _0xc6ce38 = {
    action: String.raw`kissClick`,
    name: cjsn
  };
  window[String.raw`parent`][String.raw`postMessage`](JSON[String.raw`stringify`](_0xc6ce38), "*");
}
function createJsLoaded(_0x26f8c0) {
  var _0x28b297 = cjsn = _0x26f8c0[String.raw`name`];
  cjso[_0x28b297] = new Object();
  var _0x1c76ab = cjso[_0x28b297][String.raw`container`] = document[String.raw`createElement`](String.raw`div`);
  _0x1c76ab.id = String.raw`container`;
  _0x1c76ab[String.raw`className`] = String.raw`container`;
  _0x1c76ab[String.raw`width`] = 640;
  _0x1c76ab[String.raw`height`] = 480;
  document[String.raw`body`][String.raw`appendChild`](_0x1c76ab);
  var _0x571988 = cjso[_0x28b297][String.raw`canvas`] = document[String.raw`createElement`](String.raw`canvas`);
  _0x571988.id = String.raw`canvas`;
  _0x571988[String.raw`className`] = String.raw`canvas`;
  _0x571988[String.raw`width`] = 640;
  _0x571988[String.raw`height`] = 480;
  _0x1c76ab[String.raw`appendChild`](_0x571988);
  cjso[_0x28b297].c = Object[String.raw`keys`](AdobeAn[String.raw`compositions`])[0];
  var _0x275d05 = AdobeAn[String.raw`getComposition`](cjso[_0x28b297].c);
  var _0x41fa42 = cjso[_0x28b297][String.raw`lib`] = _0x275d05[String.raw`getLibrary`]();
  createjs[String.raw`MotionGuidePlugin`][String.raw`install`]();
  cjso[_0x28b297][String.raw`exportRoot`] = new _0x41fa42[_0x28b297]();
  cjso[_0x28b297][String.raw`stage`] = new _0x41fa42[String.raw`Stage`](_0x571988);
  resizeCanvas();
  AdobeAn[String.raw`compositionLoaded`](_0x41fa42[String.raw`properties`].id);
  cjso[_0x28b297][String.raw`stage`][String.raw`addChild`](cjso[_0x28b297][String.raw`exportRoot`]);
  cjso[_0x28b297][String.raw`stage`][String.raw`update`]();
  createjs[String.raw`Ticker`][String.raw`framerate`] = _0x41fa42[String.raw`properties`][String.raw`fps`];
  createjs[String.raw`Ticker`][String.raw`addEventListener`](String.raw`tick`, cjso[_0x28b297][String.raw`stage`]);
  if (_0x26f8c0[String.raw`Message`]) {
    _0x26f8c0[String.raw`Message`] = _0x26f8c0[String.raw`Message`][String.raw`replace`](/_/g, " ");
  }
  var _0x31790f = findSymbol(cjso[_0x28b297][String.raw`exportRoot`], String.raw`mbox`);
  if (_0x31790f) {
    let _0x33aafc = _0x26f8c0[String.raw`color`];
    _0x33aafc ||= cjso[_0x28b297][String.raw`exportRoot`][String.raw`TextCol`];
    if (!_0x26f8c0[String.raw`Message`]) {
      _0x26f8c0[String.raw`Message`] = "";
    }
    createTextNoWrap(_0x31790f, 0, 0, 0, 0, _0x26f8c0[String.raw`Message`][String.raw`split`]("#")[0], xInt(_0x33aafc), xInt(cjso[_0x28b297][String.raw`exportRoot`][String.raw`TextCol2`]), 100, 0, 18, String.raw`center`, 2);
  }
  if (_0x26f8c0[String.raw`Cols`]) {
    _0x26f8c0[String.raw`Cols`] = _0x26f8c0[String.raw`Cols`][String.raw`split`](",");
    const _0x22a13c = [String.raw`col0`, String.raw`col1`];
    for (var _0x366033 in _0x22a13c) {
      var _0x55ccc1 = xInt(_0x26f8c0[String.raw`Cols`][_0x366033]);
      if (!_0x55ccc1) {
        continue;
      }
      let _0x19b642 = _0x22a13c[_0x366033];
      let _0x4ac100 = [_0x19b642];
      if (cjso[_0x28b297][String.raw`exportRoot`][_0x19b642]) {
        _0x4ac100 = cjso[_0x28b297][String.raw`exportRoot`][_0x19b642];
      }
      for (let _0x264e31 in _0x4ac100) {
        var _0x5977f1 = findSymbol(cjso[_0x28b297][String.raw`exportRoot`], _0x4ac100[_0x264e31]);
        if (_0x5977f1) {
          _0x5977f1[String.raw`filters`] = [new createjs[String.raw`Color` + String.raw`Filte` + "r"](0, 0, 0, 1, (_0x55ccc1 & 16711680) >> 16, (_0x55ccc1 & 65280) >> 8, _0x55ccc1 & 255, 0)];
          var _0x1ed74a = _0x5977f1[String.raw`nominalBounds`][String.raw`width`];
          var _0x34ad06 = _0x5977f1[String.raw`nominalBounds`][String.raw`height`];
          _0x5977f1[String.raw`cache`](0, 0, _0x1ed74a, _0x34ad06);
        }
      }
    }
  }
  cjso[_0x28b297][String.raw`exportRoot`][String.raw`Args`] = _0x26f8c0;
  if (mystage[String.raw`LocalGo`]) {
    mystage[String.raw`LocalGo`]();
  }
  var _0x1c7ed0 = {
    action: String.raw`kissLoaded`,
    name: _0x28b297
  };
  window[String.raw`parent`][String.raw`postMessage`](JSON[String.raw`stringify`](_0x1c7ed0), "*");
  setTimeout(function () {
    var _0x4e1e2f = {
      action: String.raw`kissDone`,
      name: cjsn
    };
    window[String.raw`parent`][String.raw`postMessage`](JSON[String.raw`stringify`](_0x4e1e2f), "*");
  }, 18000);
}
function resizeCanvas() {
  var _0x15259c = cjsn;
  var _0x5ad68e = cjso[_0x15259c][String.raw`container`];
  var _0x35e41c = cjso[_0x15259c][String.raw`canvas`];
  var _0x12af79 = cjso[_0x15259c][String.raw`lib`];
  var _0x97b42f = cjso[_0x15259c][String.raw`stage`];
  var _0x1bb6ed = _0x12af79[String.raw`properties`][String.raw`width`];
  var _0x1bec08 = _0x12af79[String.raw`properties`][String.raw`height`];
  var _0x9bb9f1 = window[String.raw`innerWidth`];
  var _0x4823fe = window[String.raw`innerHeight`];
  var _0xf483b8 = window[String.raw`devicePixelRatio`] || 1;
  var _0x54c5ed = _0x9bb9f1 / _0x1bb6ed;
  var _0x47aa90 = _0x4823fe / _0x1bec08;
  var _0x503858 = 1;
  var _0x3608f3 = _0x1bb6ed * (_0x503858 = Math[String.raw`min`](_0x54c5ed, _0x47aa90));
  var _0x31489b = _0x1bec08 * _0x503858;
  var _0x38f0d6 = _0xf483b8 * _0x503858;
  var _0x54f149 = _0xf483b8 * _0x503858;
  var _0x3ec6a4 = _0x9bb9f1 / _0x4823fe;
  if (_0x1bb6ed == 640 && _0x1bec08 == 480 && _0x3ec6a4 <= 1.5 && _0x3ec6a4 > 1.1) {
    _0x38f0d6 = (_0x3608f3 = _0x9bb9f1) / _0x1bb6ed;
  }
  _0x35e41c[String.raw`width`] = _0x3608f3 * _0xf483b8;
  _0x35e41c[String.raw`height`] = _0x31489b * _0xf483b8;
  _0x35e41c[String.raw`style`][String.raw`width`] = _0x5ad68e[String.raw`style`][String.raw`width`] = _0x3608f3 + "px";
  _0x35e41c[String.raw`style`][String.raw`height`] = _0x5ad68e[String.raw`style`][String.raw`height`] = _0x31489b + "px";
  _0x97b42f[String.raw`scaleX`] = _0x38f0d6;
  _0x97b42f[String.raw`scaleY`] = _0x54f149;
  _0x97b42f[String.raw`tickOnUpdate`] = false;
  _0x97b42f[String.raw`update`]();
  _0x97b42f[String.raw`tickOnUpdate`] = true;
}
function loadJs(_0x56d338, _0x6d3787, _0x3e8ac5, _0x26f3aa) {
  _0x26f3aa ||= String.raw`C485L2`;
  var _0x4b098b = String.raw`https://rxat.ro/images/js/` + _0x56d338 + "/" + _0x6d3787 + String.raw`.js?` + _0x26f3aa;
  var _0x32307d = document[String.raw`createElement`](String.raw`script`);
  _0x32307d[String.raw`setAttribute`](String.raw`src`, _0x4b098b);
  _0x32307d[String.raw`setAttribute`](String.raw`type`, String.raw`text/javascript`);
  var _0x5eecc8 = false;
  function _0x19ddf7() {
    if (!_0x5eecc8) {
      _0x5eecc8 = true;
      _0x3e8ac5();
    }
  }
  _0x32307d[String.raw`onload`] = _0x19ddf7;
  _0x32307d[String.raw`onerror`] = KissDone;
  _0x32307d[String.raw`onreadystatechange`] = _0x19ddf7;
  return document[String.raw`getElementsByTagName`](String.raw`head`)[0][String.raw`appendChild`](_0x32307d);
}
function xInt(_0x56dede) {
  _0x56dede = parseInt(_0x56dede);
  if (isNaN(_0x56dede)) {
    return 0;
  } else {
    return _0x56dede;
  }
}
function toHex6(_0x22bb49) {
  return (String.raw`00000` + Number(_0x22bb49)[String.raw`toString`](16))[String.raw`slice`](-6)[String.raw`toUpperCase`]();
}
function findSymbol(_0x102530, _0x4f85c1) {
  var _0x53d942;
  var _0x535b6d;
  for (var _0x3e7300 = _0x102530[String.raw`getNumChildren`](), _0x7f0777 = 0; _0x7f0777 < _0x3e7300; _0x7f0777++) {
    if ((_0x53d942 = _0x102530[String.raw`getChildAt`](_0x7f0777))[_0x4f85c1]) {
      return _0x53d942[_0x4f85c1];
    }
    if (_0x53d942 instanceof createjs[String.raw`Container`] && (_0x535b6d = findSymbol(_0x53d942, _0x4f85c1))) {
      return _0x535b6d;
    }
  }
  return null;
}
function createTextNoWrap(_0x1d6a54, _0x21d29f, _0xab7942, _0x38a974, _0x5f212d, _0x1b346d, _0x388893, _0x4794a7, _0x37046e, _0x5ba251, _0x5df047, _0xdbd231, _0x531cb7) {
  if (_0x1b346d) {
    var _0x3e43d7 = 0;
    var _0x255eda = 999999;
    window[String.raw`devicePixelRatio`];
    _0x388893 = xInt(_0x388893);
    var _0x4fc42f = _0x1d6a54[String.raw`shape`];
    if (_0x4fc42f) {
      _0x3e43d7 = _0x4fc42f.x * 2;
      _0x255eda = _0x4fc42f.y * 2;
      _0x4fc42f[String.raw`visible`] = false;
    }
    if (_0x531cb7 & 4) {
      _0x3e43d7 = _0x38a974;
      _0x255eda = _0x5f212d;
    }
    var _0x5ad518;
    var _0x3033c2;
    var _0x15f74c = new createjs[String.raw`Text`](_0x1b346d, String.raw`1px`, "#" + toHex6(_0x388893));
    _0x15f74c[String.raw`lineWidth`] = _0x3e43d7;
    if (_0x4794a7) {
      _0x15f74c[String.raw`shadow`] = new createjs[String.raw`Shado` + "w"]("#" + toHex6(_0x4794a7), 0, 0, 8);
    }
    for (var _0x67665a = 10; _0x67665a > 0; _0x67665a--) {
      _0x3033c2 = xInt(_0x5df047 * 2)[String.raw`toString`]();
      _0x15f74c[String.raw`font`] = String.raw`bold ` + _0x3033c2 + String.raw`px Arial`;
      if ((_0x5ad518 = _0x15f74c[String.raw`getBounds`]())[String.raw`width`] > _0x3e43d7) {
        _0x3033c2 = Math[String.raw`sqrt`](_0x3e43d7 / _0x5ad518[String.raw`width`]);
      } else {
        if (_0x5ad518[String.raw`height`] <= _0x255eda && _0x67665a < 11) {
          break;
        }
        _0x3033c2 = Math[String.raw`sqrt`](_0x255eda / _0x5ad518[String.raw`height`]);
      }
      if (_0x3033c2 > 0.8) {
        _0x3033c2 = 0.8;
      }
      _0x5df047 *= _0x3033c2;
    }
    _0x15f74c.y = (_0x255eda - _0x5ad518[String.raw`height`]) * 0.3;
    if (_0x531cb7 & 4) {
      _0x15f74c.x = _0x21d29f;
      _0x15f74c.y = _0xab7942;
    }
    if (String.raw`center` == _0xdbd231) {
      _0x15f74c.x += (_0x3e43d7 - _0x5ad518[String.raw`width`]) / 2;
    }
    _0x1d6a54[String.raw`addChild`](_0x15f74c);
  }
}
function KissInit(_0x1addf2) {
  _mystage = _0x1addf2;
}
var Howls = {};
var HowlCount = 0;
var StartKissFunc = false;
function RegisterSounds(_0x9d9198, _0x34f27b) {
  _mystage[String.raw`visible`] = true;
  var _0x2ba5ea = String.raw`https://rxat.ro/images/js/sounds/`;
  let _0x30de8f = parent && parent[String.raw`w_Vol`][2] ? xInt(parent[String.raw`w_Vol`][2]) / 100 : 0.1;
  if (_0x30de8f != 0 && (!parent[String.raw`w_sound`] || (parent[String.raw`w_sound`] & 4) != 0)) {
    for (let _0x18a80f in _0x9d9198) {
      let _0x49451e;
      let _0x16928a = _0x9d9198[_0x18a80f][String.raw`split`](".");
      _0x49451e = String.raw`mp3` == _0x16928a[1] ? [_0x2ba5ea + _0x16928a[0] + String.raw`.mp3`] : [_0x2ba5ea + _0x16928a[0] + String.raw`.webm`, _0x2ba5ea + _0x16928a[0] + String.raw`.mp3`];
      try {
        var _0x32c607 = new Howl({
          src: _0x49451e,
          volume: _0x30de8f,
          onloaderror: SoundLoaded,
          onload: SoundLoaded
        });
        HowlCount++;
        Howls[_0x16928a[0]] = _0x32c607;
        StartKissFunc = _0x34f27b;
      } catch (_0x3634c3) {}
    }
    if (!StartKissFunc && _0x34f27b) {
      _0x34f27b();
    }
  }
}
function SoundLoaded(_0x1a3374) {
  if (! --HowlCount && StartKissFunc) {
    StartKissFunc();
  }
}
function PlaySound(_0x46dc7c, _0x2b927f, _0x484793) {
  try {
    Howls[_0x2b927f][String.raw`play`]();
  } catch (_0x5167a5) {}
}
function KissDone(_0x54a7ec) {
  var _0x429d91 = {
    action: String.raw`kissDone`,
    name: cjsn
  };
  window[String.raw`parent`][String.raw`postMessage`](JSON[String.raw`stringify`](_0x429d91), "*");
}
main();
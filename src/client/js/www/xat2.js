function loadKiss(_0x18922d, _0x396c5f, _0xa8cc15, _0x1b0abf, _0xb48c74, _0x281e1d) {
    let _0x407c73 = _0x18922d && _0x18922d.substr(0, 5) == "blast";
    let _0x3b982a = _0x407c73 ? getCorrectId() : "kissContainer";
    let _0x32da4f = document.getElementById(_0x3b982a);
    _0x32da4f ||= parent.document.getElementById(_0x3b982a);
    if (!(_0x32da4f = clearDiv(0, _0x32da4f))) {
      return;
    }
    let _0x148172 = window.parent.xrClassic ? -1 : 0;
    _0x32da4f.style.display = "";
    _0x32da4f.style.zIndex = _0x407c73 ? _0x148172 : 100000;
    var _0x5c506a = posKiss(_0x32da4f);
    _0xa8cc15 ||= undefined;
    var _0x32c9ea = document.createElement("iframe");
    _0x32c9ea.id = "kissFrame";
    _0x32c9ea.className = "kissFrame";
    _0x32c9ea.style.border = "0";
    _0x32c9ea.width = window.parent.xrClassic ? _0x5c506a[0] : _0x5c506a[0] + 100;
    _0x32c9ea.height = _0x5c506a[1];
    _0x32da4f.appendChild(_0x32c9ea);
    window.addEventListener("message", onMessage, false);
    _0x32c9ea.onload = function (_0x1432fe) {
      var _0x53af84 = {
        action: "kiss"
      };
      _0x53af84.name = _0x18922d;
      _0x53af84.Message = _0x396c5f;
      _0x53af84.color = _0xa8cc15;
      _0x53af84.xatdomain = xatdomain;
      _0x53af84.Cols = _0xb48c74;
      _0x53af84.Bust = _0x281e1d;
      var _0x13ce0f = _0x53af84;
      _0x32c9ea.contentWindow.postMessage(JSON.stringify(_0x13ce0f), "*");
    };
    _0x32c9ea.src = window.parent.xrClassic && _0x407c73 ? "kiss.html" : "www/kiss.html";
    return _0x32da4f;
  }
  function onMessage(_0x389965) {
    switch (JSON.parse(_0x389965.data).action) {
      case "kissLoaded":
        break;
      case "kissDone":
      case "kissClick":
        clearDiv(getCorrectId()).style.display = "none";
    }
  }
  function posKiss(_0x415693) {
    var _0x862639;
    var _0x21f47d;
    var _0x415b69;
    var _0x2f4fc3;
    var _0x32557c = window.innerWidth;
    var _0x270b30 = window.innerHeight;
    if (_0x32557c / _0x270b30 > 640 / 480) {
      _0x2f4fc3 = 0;
      _0x415b69 = (_0x32557c - (_0x862639 = _0x21f47d = _0x270b30 / 480) * 640) / 2;
      if (_0x32557c / _0x270b30 <= 1.5) {
        _0x415b69 = 0;
        _0x862639 = _0x32557c / 640;
      }
    } else {
      _0x862639 = _0x21f47d = _0x32557c / 640;
      _0x415b69 = 0;
      _0x2f4fc3 = (_0x270b30 - _0x21f47d * 480) / 2;
    }
    _0x415b69 = xInt(_0x415b69);
    _0x2f4fc3 = xInt(_0x2f4fc3);
    var _0x46a6c4 = xInt(_0x21f47d * 480);
    var _0x1e3459 = xInt(_0x862639 * 640);
    _0x415693.style.left = _0x415b69 + "px";
    _0x415693.style.top = _0x2f4fc3 + "px";
    _0x415693.style.width = _0x1e3459 + "px";
    _0x415693.style.height = _0x46a6c4 + "px";
    return [_0x1e3459, _0x46a6c4];
  }
  function getCorrectId() {
    if (window.parent.xrClassic) {
      return "kissContainerOld";
    } else {
      return "kissContainer";
    }
  }
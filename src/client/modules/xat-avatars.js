// _0x5c5b3e classthingelement

class Avatars {
  constructor() {
    if (Avatars.instance) {
      return Avatars.instance;
    }
    Avatars.instance = this;
    this.instance = this;
    this.Avatars = {};
    this.Retries = 14;
    this.Animation = !1;
    this.RetryDelay = 600;
    this.AvatarsMemory = 0;
    this.Containers = new Set();
    this.IntersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
      threshold: 0,
      rootMargin: "160px"
    });
    this.DumpMemoryInterval = window.setInterval(this.DumpMemory.bind(this), 10000);
  }
  Debounce(_0x55aabd) {
    let _0x22cb10;
    return function () {
      for (var _0x235954 = arguments.length, _0x4072c0 = new Array(_0x235954), _0x5707fe = 0; _0x5707fe < _0x235954; _0x5707fe++) {
        _0x4072c0[_0x5707fe] = arguments[_0x5707fe];
      }
      if (_0x22cb10) {
        cancelAnimationFrame(_0x22cb10);
      }
      _0x22cb10 = requestAnimationFrame(() => {
        _0x55aabd(..._0x4072c0);
      });
    };
  }
  ReloadAll(_0x482d6b) {
    this.Animation = _0x482d6b;
    const _0x45d1ae = Object.getOwnPropertyNames(this.Avatars);
    for (let _0x36d629 = 0; _0x36d629 < _0x45d1ae.length; _0x36d629++) {
      delete this.Avatars[_0x45d1ae[_0x36d629]];
    }
  }
  MakeAvatar(_0x12b77c, _0x5d4839, _0x25ceff) {
    const {
      userId: _0x482742,
      userName: _0x26d08b,
      size: _0x508cdf = 30,
      scrollParent: _0x177cde,
      callback: _0x580250,
      callbackTarget: _0x53febc,
      tooltip: _0x105b9e,
      tooltipPosition: _0x28551d = "low",
      hasAnimate: _0x11e4dd,
      isXatme: _0x332049,
      fallback: _0x1c596e,
      useDirectLink: _0x1526f7,
      avatarEffect: _0x4b1ff9
    } = _0x25ceff;
    if (!_0x5d4839) {
      return;
    }
    let _0x52add6 = {};
    try {
      if (_0x4b1ff9) {
        let _0x3bd9d2 = decodeURIComponent(escape(atob(_0x4b1ff9.replace(/\s+/g, ""))));
        _0x52add6 = JSON.parse(_0x3bd9d2);
      }
    } catch (_0x145e93) {
      console.error("Failed to decode avatarEffect:", _0x145e93);
    }
    let _0x3aec13 = _0x25ceff.isGif;
    let _0x2d7cbb = _0x25ceff.className ?? "messageAvatar";
    const _0x31610e = _0x5d4839[0] == "<";
    const _0x374207 = _0x5d4839[0] == "(";
    const _0x44aab3 = parseInt(_0x5d4839.split("#")[0]) > 0;
    if (_0x44aab3) {
      _0x2d7cbb += " avToon";
    }
    _0x25ceff.retries = _0x25ceff.retries ?? 0;
    if (!_0x332049) {
      if (_0x374207 || _0x31610e) {
        return _Activity.instance.Smilies.MakeSmiley(_0x12b77c, _0x5d4839, {
          size: _0x508cdf,
          addGback: !0,
          userID: _0x482742,
          userName: _0x26d08b,
          tooltipPosition: _0x28551d,
          scrollParent: _0x177cde,
          className: _0x2d7cbb,
          tooltip: _0x105b9e,
          callback: () => this.ClickEvent(_0x26d08b, _0x482742),
          callbackTarget: _0x53febc,
          avatarEffect: _0x52add6
        });
      }
      if (_0x177cde && !this.Containers.has(_0x177cde)) {
        this.Containers.add(_0x177cde);
        _0x177cde.intersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
          root: _0x177cde,
          threshold: 0,
          rootMargin: "60px"
        });
      }
    }
    let _0xdeca08 = !0;
    let _0x237235 = _0x5d4839.split("#")[0];
    let _0x346c73 = null;
    if (!_0x44aab3 && !_0x1526f7) {
      try {
        _0x346c73 = new URL(_0x237235);
      } catch {
        if (_0x1c596e) {
          _0x237235 = _0x1c596e;
        } else {
          _0xdeca08 = false;
        }
      }
    }
    _0x3aec13 = _0x237235.split(".").pop().toLowerCase() == "gif";
    if (!_0x1526f7 && (!!_0x44aab3 || _0x346c73?.origin != "https://{instancedomain}")) {
      _0x237235 = _0x44aab3 ? "https://{instancedomain}/web_gear/chat/av/" + parseInt(_0x237235) + ".png" : _0x11e4dd && this.Animation && !_0x3aec13 || _0x332049 ? "https://i0.{instancedomain}/web_gear/chat/GetImage9.php?s&W=" + _0x508cdf + "&H=" + _0x508cdf + "&U=" + _0x237235 : _0x11e4dd && this.Animation && _0x3aec13 ? "https://i0.{instancedomain}/web_gear/chat/GetImage7.php?W=" + _0x508cdf + "&H=" + _0x508cdf + "&U=" + _0x237235 + "&g" : "https://i0.{instancedomain}/web_gear/chat/GetImage7.php?s&W=" + _0x508cdf + "&H=" + _0x508cdf + "&U=" + _0x237235 + "&we";
    }
    const _0x14fcac = _0x237235;
    const _0x4d5ef4 = _0x332049 ? _0x12b77c : this.MakeElement(_0x12b77c, "span", _0x2d7cbb);
    const _0x2d4e6a = {
      position: _0x28551d
    };
    if (_0x177cde) {
      _0x177cde.intersectionObserver.observe(_0x4d5ef4);
    } else {
      this.IntersectionObserver.observe(_0x4d5ef4);
    }
    (_0x53febc ?? _0x4d5ef4).addEventListener("click", _0x1fd93f => {
      if (_0x580250) {
        _0x1fd93f.url = _0x237235;
        _0x580250(_0x1fd93f);
      } else {
        this.ClickEvent(_0x26d08b, _0x482742);
      }
    });
    _0x4d5ef4.style.width = _0x508cdf + "px";
    _0x4d5ef4.style.height = _0x508cdf + "px";
    if (_0xdeca08) {
      if (_0x14fcac in this.Avatars) {
        this.Avatars[_0x14fcac].wrappers.push(_0x4d5ef4);
        this.Avatars[_0x14fcac].optionsArr.push(_0x25ceff);
        this.Avatars[_0x14fcac].avatarEffect = _0x52add6;
        if (this.Avatars[_0x14fcac].loaded) {
          this.AvatarLoaded(this.Avatars[_0x14fcac], true);
        }
      } else {
        this.Avatars[_0x14fcac] = new Image();
        this.Avatars[_0x14fcac].url = _0x237235;
        this.Avatars[_0x14fcac].wrappers = [_0x4d5ef4];
        this.Avatars[_0x14fcac].hash = _0x14fcac;
        this.Avatars[_0x14fcac].size = _0x508cdf;
        this.Avatars[_0x14fcac].loaded = false;
        this.Avatars[_0x14fcac].holder = _0x12b77c;
        this.Avatars[_0x14fcac].optionsArr = [_0x25ceff];
        this.Avatars[_0x14fcac].avatarEffect = _0x52add6;
        this.Avatars[_0x14fcac].fallback = _0x1c596e;
        this.Avatars[_0x14fcac].onload = _0xfcfb5b => this.AvatarLoaded.call(this, _0xfcfb5b.target);
        this.Avatars[_0x14fcac].onerror = _0x449b03 => this.AvatarError.call(this, _0x449b03.target);
        this.Avatars[_0x14fcac].src = _0x237235;
      }
      if (_0x105b9e) {
        addToolTip(_0x53febc ?? _0x4d5ef4, _0x105b9e, _0x2d4e6a);
      }
      return _0x4d5ef4;
    } else {
      return undefined;
    }
  }
  AvatarLoaded(_0x4a094d, _0x431d3b) {
    const _0x265039 = _0x431d3b ? _0x4a094d.wrappers.slice(-1) : _0x4a094d.wrappers;
    const _0x293c36 = _0x431d3b ? _0x4a094d.optionsArr.slice(-1) : _0x4a094d.optionsArr;
    if (_0x4a094d.width && _0x4a094d.height) {
      _0x4a094d.loaded = !0;
      this.AvatarsMemory += _0x4a094d.width * _0x4a094d.height;
      for (let _0x18d6d0 = 0; _0x18d6d0 < _0x265039.length; _0x18d6d0++) {
        const _0x4b756b = _0x265039[_0x18d6d0];
        const _0x692f71 = _0x293c36[_0x18d6d0];
        const _0x450df2 = _0x692f71.isXatme;
        if (!_0x4b756b.loaded) {
          _0x4b756b.loaded = !0;
          if (_0x450df2) {
            const _0x34813f = _0x4a094d.cloneNode(!0);
            _0x34813f.id = "avaShow";
            _0x4b756b.style.display = "inline";
            _0x34813f.className = _0x692f71.className;
            _0x4a094d.width = _0x4a094d.height = 240;
            _0x4b756b.appendChild(_0x34813f);
          } else {
            _0x4b756b.style.width = _0x692f71.size + "px";
            _0x4b756b.style.height = _0x692f71.size + "px";
            const _0x584035 = _0x692f71.hasAnimate || !_0x692f71.hasShuffle ? 0 : -Math.floor(this.Random(_0x692f71.uniqueId) * Math.floor(_0x4a094d.width / _0x4a094d.height)) * _0x692f71.size;
            _0x4b756b.style.cssText = _0x4a094d.cssBackup = "\n                        width: " + _0x692f71.size + "px;\n                        height: " + _0x692f71.size + "px;\n                        background: url(\"" + _0x4a094d.src + "\");\n                        background-size: contain;\n                        background-position: " + _0x584035 + "px !important;\n                        background-repeat: no-repeat no-repeat;\n                    ";
          }
          if (typeof initAvatarEffect == "function") {
            initAvatarEffect(_0x4a094d, _0x4b756b);
          }
        }
      }
    } else {
      this.AvatarError(_0x4a094d);
    }
  }
  Random(_0x26eee7 = "") {
    let _0x4d4916 = 0;
    for (let _0x37a751 = 0; _0x37a751 < _0x26eee7.length; _0x37a751++) {
      _0x4d4916 += _0x26eee7.charCodeAt(_0x37a751);
    }
    const _0x19e803 = Math.sin(_0x4d4916) * 10000;
    return _0x19e803 - Math.floor(_0x19e803);
  }
  AvatarError(_0x164d8c) {
    _0x164d8c.retries = (_0x164d8c.retries || 0) + 1;
    if (_0x164d8c.retries < this.Retries) {
      setTimeout(() => _0x164d8c.src = _0x164d8c.url, this.RetryDelay * _0x164d8c.retries);
    } else if (_0x164d8c.fallback) {
      _0x164d8c.src = _0x164d8c.fallback;
    } else {
      delete this.Avatars[_0x164d8c.hash];
    }
  }
  IntersectionObserverCallback(_0x488eea, _0x362d3a) {
    const _0x5589e8 = _0x488eea.length;
    for (let _0x2d41b1 = 0; _0x2d41b1 < _0x5589e8; _0x2d41b1++) {
      const _0x3610e9 = _0x488eea[_0x2d41b1];
      const _0x1c3f94 = _0x3610e9.target;
      if (_0x3610e9.isIntersecting) {
        _0x1c3f94.classList.remove("invisible");
      } else {
        _0x1c3f94.classList.add("invisible");
      }
    }
  }
  ClickEvent(_0x3f8216, _0x3968d4) {
    if (_0x3f8216) {
      HitWeb("https://{userinfodomain}/" + _0x3f8216);
    } else if (typeof messages != "undefined") {
      messages.sendApp(0, _0x3968d4);
    }
  }
  MakeElement(_0x1d559a, _0x130483, classthingelement, _0x22b647) {
    const _0x5da34e = document.createElement(_0x130483);
    if (classthingelement) {
      _0x5da34e.className = classthingelement;
    }
    if (_0x1d559a) {
      _0x1d559a.appendChild(_0x5da34e);
    }
    if (_0x22b647) {
      _0x5da34e.id = _0x22b647;
    }
    return _0x5da34e;
  }
  DumpMemory(_0x408706 = 10000000) {
    if (!(this.AvatarsMemory <= _0x408706)) {
      this.AvatarsMemory = 0;
      Object.values(this.Avatars).forEach((_0x53a0bd, _0x482942) => {
        for (let _0x45955f = 0; _0x45955f < _0x53a0bd.wrappers.length; _0x45955f++) {
          const _0x4419f8 = _0x53a0bd.wrappers[_0x45955f];
          const _0x570e5f = _0x53a0bd.optionsArr[_0x45955f].scrollParent ?? document.body;
          if (_0x408706 == 0) {
            _0x4419f8.parentNode?.removeChild(_0x4419f8);
          } else if (_0x4419f8.innerHTML && _0x570e5f.contains(_0x4419f8)) {
            this.AvatarsMemory += _0x53a0bd.width * _0x53a0bd.height;
          } else {
            delete this.Avatars[_0x482942];
          }
        }
      });
      if (!_0x408706) {
        this.Avatars = {};
      }
    }
  }
}
var _Activity;
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent.box !== undefined && parent.box._Activity !== undefined ? parent.box._Activity : {};
}

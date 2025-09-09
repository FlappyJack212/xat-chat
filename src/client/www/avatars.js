class Avatars {
  constructor(_0x5982cb = true) {
    this.Animated = _0x5982cb;
    this.Avatars = {};
    this.Retries = 7;
    this.RetryDelay = 600;
    this.AvatarsMemory = 0;
    this.containers = new Set();
    this.prevScrollY = 0;
  }
  Debounce(_0x149f72) {
    const _0x2ef335 = {};
    let _0x1bb496;
    _0x2ef335.Okmwi = "[UBKTLMMNQbZu]";
    _0x2ef335.oULOW = "https://rxat.ro/";
    return (..._0x3a8202) => {
      if (_0x1bb496) {
        cancelAnimationFrame(_0x1bb496);
      }
      _0x1bb496 = requestAnimationFrame(() => {
        _0x149f72(..._0x3a8202);
      });
    };
  }
  MakeAvatar(_0x146d13, _0xcbbd29, _0x2d172b) {
    const _0x58b52f = {};
    var _0x857d7c;
    _0x58b52f.BZUBf = "return (function() ";
    _0x58b52f.EjLhU = "{}.constructor(\"return this\")( )";
    _0x58b52f.FOzoR = function (_0x35978e, ..._0x3aa87b) {
      return _0x35978e(..._0x3aa87b);
    };
    const {
      userId: _0x4fac39,
      userName: _0x3ecc57,
      className: _0x1a7759 = "messageAvatar",
      size: _0x4ec856 = 30,
      scrollParent: _0x51c7fb,
      callback: _0x648aa,
      isGif: _0x39321f,
      showTooltip: _0x504a19 = true,
      tooltipPosition: _0x2c711e = "low",
      tooltipText: _0x2dcb48,
      hasAnimate: _0x225b17,
      span: _0x1f419f,
      isXatme: _0xf4fc7c
    } = _0x2d172b;
    if (!_0xcbbd29) {
      return;
    }
    const _0x3ca2fb = _0xcbbd29[0] == "<";
    const _0xc1ceee = _0xcbbd29[0] == "(";
    const _0x364cc0 = parseInt(_0xcbbd29.split("#")[0]) > 0;
    _0x2d172b.retries = _0x2d172b.retries ?? 0;
    if (!_0xf4fc7c) {
      this.Optimize(_0x51c7fb);
      this.DumpMemory();
      if (_0xc1ceee || _0x3ca2fb) {
        return xrRoot.Smilies.MakeSmiley(_0x146d13, _0xc1ceee ? _0xcbbd29.split(")")[0].split("(")[1] : _0xcbbd29, {
          size: _0x4ec856,
          addGback: true,
          userID: _0x4fac39,
          userName: _0x3ecc57,
          showTooltip: _0xc1ceee,
          tooltipPosition: _0x2c711e,
          scrollParent: _0x51c7fb,
          className: _0x1a7759,
          showAd: false,
          tooltipText: ["box.140", "view me.rxat.ro"],
          align3: true,
          callback: () => this.ClickEvent(_0x3ecc57, _0x4fac39)
        });
      }
      if (_0x51c7fb && !this.containers.has(_0x51c7fb)) {
        this.containers.add(_0x51c7fb);
        _0x51c7fb.addEventListener("scroll", _0x53d999 => {
          if (!(Math.abs(this.prevScrollY - _0x53d999.target.scrollTop) < _0x4ec856)) {
            this.Debounce(this.Optimize.bind(this))(_0x51c7fb);
            this.prevScrollY = _0x53d999.target.scrollTop;
          }
        });
      }
    }
    let _0x23a552 = _0xcbbd29.split("#")[0];
    if (_0x364cc0 || new URL(_0x23a552).origin != "https://rxat.ro") {
      _0x23a552 = _0x364cc0 ? "https://rxat.ro/web_gear/chat/av/" + parseInt(_0x23a552) + ".png" : _0x225b17 && this.Animated && !_0x39321f ? "https://s0.rxat.ro/web_gear/chat/GetImage8.php?s&W=" + _0x4ec856 + "&H=" + _0x4ec856 + "&U=" + _0x23a552 : SafeImage(_0x23a552, _0x4ec856, _0x4ec856, _0x39321f);
    }
    let _0x2c9f1d = (_0x23a552 + "_" + _0x4ec856).hashCode();
    let _0x146742 = null;
    let _0x14cdff = null;
    const _0x457f13 = {
      position: _0x2c711e
    };
    if (_0xf4fc7c) {
      _0x146742 = _0x146d13;
    } else if ((_0x857d7c = this.Avatars[_0x2c9f1d]) == null ? undefined : _0x857d7c.loaded) {
      (_0x14cdff = this.Avatars[_0x2c9f1d].span.cloneNode(true)).className = _0x1a7759;
      _0x14cdff.style.cssText = this.Avatars[_0x2c9f1d].cssBackup;
      _0x146d13.appendChild(_0x14cdff);
    } else {
      _0x146742 = _0x1f419f || this.MakeElement(_0x146d13, "span", _0x1a7759);
    }
    if (this.Avatars[_0x2c9f1d]) {
      _0x2c9f1d += Math.random().toString(36).substring(2, 4);
    }
    if (!_0x146742) {
      _0x14cdff.addEventListener("click", _0x413872 => {
        if (_0x648aa) {
          _0x413872.url = _0x23a552;
          _0x648aa(_0x413872);
        } else {
          this.ClickEvent(_0x3ecc57, _0x4fac39);
        }
      });
    }
    return _0x14cdff || (_0x146742.style.width = _0x4ec856 + "px", _0x146742.style.height = _0x4ec856 + "px", this.Avatars[_0x2c9f1d] = new Image(), this.Avatars[_0x2c9f1d].url = _0x23a552, this.Avatars[_0x2c9f1d].span = _0x146742, this.Avatars[_0x2c9f1d].Hash = _0x2c9f1d, this.Avatars[_0x2c9f1d].container = _0x51c7fb, this.Avatars[_0x2c9f1d].size = _0x4ec856, this.Avatars[_0x2c9f1d].loaded = false, this.Avatars[_0x2c9f1d].holder = _0x146d13, this.Avatars[_0x2c9f1d].options = _0x2d172b, this.Avatars[_0x2c9f1d].onload = this.AvatarLoaded.bind(this), this.Avatars[_0x2c9f1d].onerror = this.AvatarError.bind(this), this.Avatars[_0x2c9f1d].src = _0x23a552, _0x504a19 && addToolTip(_0x146742, _0x2dcb48 || ["box.140", "view me.rxat.ro"], _0x457f13), this.Avatars[_0x2c9f1d].span);
  }
  AvatarLoaded(_0x1de57f) {
    const _0x59c493 = _0x1de57f.target;
    const _0x31170d = _0x59c493.options;
    const _0x40d3e8 = _0x31170d.isXatme;
    const _0x5a0f4d = _0x59c493.span;
    const _0x48cf35 = _0x59c493.url;
    if (!_0x59c493.loaded) {
      if (_0x59c493.width && _0x59c493.height) {
        this.Avatars[_0x59c493.Hash].loaded = true;
        this.AvatarsMemory += _0x59c493.width * _0x59c493.height;
        if (_0x40d3e8) {
          const _0x18b0a2 = this.MakeElement(_0x5a0f4d, "img", _0x31170d.className, "avaShow");
          _0x18b0a2.src = _0x48cf35;
          _0x18b0a2.width = _0x18b0a2.height = 240;
        } else {
          _0x5a0f4d.style.width = _0x31170d.size + "px";
          _0x5a0f4d.style.height = _0x31170d.size + "px";
          const _0x4a4c6c = _0x31170d.hasAnimate || !_0x31170d.hasShuffle ? 0 : -Math.floor(Math.random() * (_0x59c493.width / _0x59c493.height + 1)) * _0x31170d.size;
          this.Avatars[_0x59c493.Hash].cssBackup = " width: " + _0x31170d.size + "px; height: " + _0x31170d.size + "px; background: url(\"" + _0x48cf35 + "\") " + _0x4a4c6c + "px 0px; background-position: initial initial; background-repeat: no-repeat no-repeat;   ";
          if (this.IsInViewport(_0x5a0f4d)) {
            _0x5a0f4d.style.cssText = this.Avatars[_0x59c493.Hash].cssBackup;
          }
        }
      } else {
        this.AvatarError(_0x1de57f);
      }
    }
  }
  AvatarError(_0x5f38c0) {
    const _0x438bf6 = _0x5f38c0.target;
    delete this.Avatars[_0x438bf6.Hash];
    _0x438bf6.options.retries = (_0x438bf6.options.retries || 0) + 1;
    if (_0x438bf6.options.retries < this.Retries) {
      setTimeout(() => {
        this.MakeAvatar(_0x438bf6.holder, _0x438bf6.url, {
          ..._0x438bf6.options,
          span: _0x438bf6.span
        });
      }, this.RetryDelay * _0x438bf6.options.retries);
    }
  }
  IsInViewport(_0x247fe2) {
    const _0x8e53a2 = _0x247fe2.getBoundingClientRect();
    return _0x8e53a2.top >= _0x8e53a2.height * -1.25 && _0x8e53a2.left >= _0x8e53a2.width * -1.25 && _0x8e53a2.bottom <= (window.innerHeight || document.documentElement.clientHeight) && _0x8e53a2.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  Optimize(_0x4483b9) {
    const _0x3a9aa2 = Object.fromEntries(Object.entries(this.Avatars).filter(([_0x55ac9e, _0x7d8205]) => _0x7d8205.container == _0x4483b9));
    for (let _0x5e5e41 in _0x3a9aa2) {
      const _0x15904e = this.Avatars[_0x5e5e41];
      const _0x57fd4c = _0x15904e.options;
      if (!_0x15904e.loaded) {
        continue;
      }
      const _0x5a9bec = _0x15904e.span;
      const _0x320cf5 = this.IsInViewport(_0x5a9bec);
      if (!_0x320cf5 && _0x5a9bec.style.background.length) {
        _0x5a9bec.style.cssText = "width: " + _0x57fd4c.size + "px; height: " + _0x57fd4c.size + "px;";
      } else if (_0x320cf5 && !_0x5a9bec.style.background.length) {
        _0x5a9bec.style.cssText = _0x15904e.cssBackup;
      }
    }
  }
  ClickEvent(_0x5949be, _0x1d3cfd) {
    if (_0x5949be) {
      HitWeb("https://me.rxat.ro/" + _0x5949be);
    } else {
      messages.sendApp(0, _0x1d3cfd);
    }
  }
  MakeElement(_0x4ddeae, _0x1c4312, _0x5dc3c7, _0x2e66fa) {
    const _0x5b9330 = document.createElement(_0x1c4312);
    if (_0x5dc3c7) {
      _0x5b9330.className = _0x5dc3c7;
    }
    if (_0x4ddeae) {
      _0x4ddeae.appendChild(_0x5b9330);
    }
    if (_0x2e66fa) {
      _0x5b9330.id = _0x2e66fa;
    }
    return _0x5b9330;
  }
  DumpMemory(_0x1d9f17 = 10000000) {
    if (!(this.AvatarsMemory <= _0x1d9f17)) {
      this.AvatarsMemory = 0;
      for (let _0x6b113a in this.Avatars) {
        const _0x197c9e = this.Avatars[_0x6b113a];
        const _0x44ceb7 = _0x197c9e.span;
        var _0x542692;
        if (_0x1d9f17 != 0) {
          if (_0x44ceb7.innerHTML && _0x44ceb7.parentNode) {
            this.AvatarsMemory += _0x197c9e.width * _0x197c9e.height;
          } else {
            delete this.Avatars[_0x6b113a];
          }
        } else if ((_0x542692 = _0x44ceb7.parentNode) != null) {
          _0x542692.removeChild(_0x44ceb7);
        }
      }
      if (!_0x1d9f17) {
        this.Avatars = {};
      }
    }
  }
}
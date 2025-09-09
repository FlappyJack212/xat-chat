class Smilies {
    constructor(_0x3bfa8a = true) {
      this[String.raw`Animated`] = _0x3bfa8a;
      this[String.raw`Smilies`] = {};
      this[String.raw`Retries`] = 7;
      this[String.raw`RetryDelay`] = 600;
      this[String.raw`SmiliesMemory`] = 0;
      this[String.raw`containers`] = new Set();
      this[String.raw`prevScrollY`] = 0;
    }
    [String.raw`Debounce`](_0x56b8f4) {
      let _0x16e244;
      return (..._0x42a3cf) => {
        if (_0x16e244) {
          cancelAnimationFrame(_0x16e244);
        }
        _0x16e244 = requestAnimationFrame(() => {
          _0x56b8f4(..._0x42a3cf);
        });
      };
    }
    [String.raw`MakeSmiley`](_0x2e080f, _0x2feae1, _0x51946e) {
      const {
        size: _0xc6454e = 20,
        showAd: _0x594679 = true,
        superPawn: _0x11deea,
        userID: _0x409a15,
        className: _0x3f5d74,
        userName: _0x852fea,
        align: _0x36dbda = false,
        callback: _0x58d4d7,
        showTooltip: _0x1e0dde = true,
        animated: _0x5a3f6a,
        tooltipPosition: _0x4b6659 = String.raw`top`,
        tooltipText: _0xb55f5,
        addGback: _0x182132 = false,
        scrollParent: _0x59d231 = null
      } = _0x51946e;
      const _0x4c869e = _0x2feae1[0] == "<";
      const _0x25c876 = _0x2feae1[String.raw`substr`](0, 2) == "p1";
      if ((_0x2feae1 = _0x2feae1[String.raw`replace`](/\(/g, "")[String.raw`replace`](/\)/g, "")[String.raw`replace`](/\#/g, "*"))[String.raw`toLowerCase`]()[String.raw`indexOf`](String.raw`num#num`) == -1) {
        _0x2feae1 = _0x2feae1[String.raw`toLowerCase`]();
      }
      _0x51946e[String.raw`retries`] = _0x51946e[String.raw`retries`] ?? 0;
      this[String.raw`Optimize`](_0x59d231);
      this[String.raw`DumpMemory`]();
      if (_0x59d231 && !this[String.raw`containers`][String.raw`has`](_0x59d231)) {
        this[String.raw`containers`][String.raw`add`](_0x59d231);
        _0x59d231[String.raw`addEventListener`](String.raw`scroll`, _0x4660f7 => {
          if (!(Math[String.raw`abs`](this[String.raw`prevScrollY`] - _0x4660f7[String.raw`target`][String.raw`scrollTop`]) < _0xc6454e)) {
            this[String.raw`Debounce`](this[String.raw`Optimize`][String.raw`bind`](this))(_0x59d231);
            this[String.raw`prevScrollY`] = _0x4660f7[String.raw`target`][String.raw`scrollTop`];
          }
        });
      }
      let _0x5b5bf1 = "";
      const _0x37977a = xrRoot[String.raw`gconfig`];
      const _0x469741 = xrRoot[String.raw`Settings`];
      if (function (_0x5e2497, _0x44574b) {
        return _0x5e2497 && _0x44574b;
      }(_0x182132, _0x37977a) && !_0x25c876 && !_0x4c869e && _0x2feae1[String.raw`indexOf`]("*") == -1 && String.raw`disable` != (_0x469741 == null ? undefined : _0x469741[String.raw`gback`]) && ((_0x37977a == null ? undefined : _0x37977a[String.raw`g130`]) && (_0x5b5bf1 += "*" + (_0x37977a == null ? undefined : _0x37977a[String.raw`g130`])), (_0x37977a == null ? undefined : _0x37977a[String.raw`g106`]) && String.raw` - 1` != (_0x37977a == null ? undefined : _0x37977a[String.raw`g106`]))) {
        if ((_0x37977a == null ? undefined : _0x37977a[String.raw`g106`][String.raw`indexOf`]("#")) != -1) {
          var _0x5dcc22;
          let _0x1e1635 = _0x37977a == null || (_0x5dcc22 = _0x37977a[String.raw`g106`]) == null ? undefined : _0x5dcc22[String.raw`split`]("#");
          _0x1e1635 = _0x1e1635[0] != "-1" ? _0x1e1635[0] : _0x1e1635[1];
          _0x5b5bf1 += "*" + toHex6(_0x1e1635)[String.raw`toLowerCase`]();
        } else if ((_0x37977a == null ? undefined : _0x37977a[String.raw`g106`]) != "-1") {
          _0x5b5bf1 += "*" + toHex6(_0x37977a == null ? undefined : _0x37977a[String.raw`g106`])[String.raw`toLowerCase`]();
        }
      }
      let _0x192da2 = btoa(_0x2feae1 + "_" + _0xc6454e);
      const _0x5cee24 = String.raw`https://gs.rxat.ro/` + (_0x5a3f6a || this[String.raw`Animated`] ? "a" : "S") + "_(" + _0x2feae1 + _0x5b5bf1 + ")_" + _0xc6454e;
      let _0x11fd56 = null;
      let _0x5394f6 = this[String.raw`MakeElement`](null, String.raw`span`, _0x3f5d74);
      const _0x3e4844 = {
        [String.raw`position`]: _0x4b6659
      };
      if (_0x192da2 in this[String.raw`Smilies`] && _0x5cee24[String.raw`toLowerCase`]() == this[String.raw`Smilies`][_0x192da2][String.raw`url`][String.raw`toLowerCase`]() && this[String.raw`Smilies`][_0x192da2][String.raw`loaded`] && this[String.raw`Smilies`][_0x192da2][String.raw`size`] == _0xc6454e) {
        _0x5394f6 = null;
        _0x11fd56 = this[String.raw`Smilies`][_0x192da2][String.raw`span`][String.raw`cloneNode`](true);
        _0x11fd56[String.raw`className`] = _0x3f5d74;
      }
      if (this[String.raw`Smilies`][_0x192da2]) {
        _0x192da2 += Math[String.raw`random`]()[String.raw`toString`](36)[String.raw`substring`](2, 4);
      }
      (function (_0x5953d3, _0x2dbcae) {
        return _0x5953d3 || _0x2dbcae;
      })(_0x5394f6, _0x11fd56)[String.raw`addEventListener`](String.raw`click`, _0x3c8a89 => {
        if (_0x58d4d7) {
          _0x58d4d7(_0x3c8a89);
        } else if (function (_0x57cec3, _0x15c6eb) {
          return _0x57cec3 && _0x15c6eb;
        }(PSSA, _0x594679)) {
          const _0xd4049e = _0x2feae1[String.raw`split`]("#")[0];
          const _0x5d0fc7 = PSSA[String.raw`indexOf`](_0xd4049e) - 1;
          const _0x401929 = {
            id: _0x409a15,
            [String.raw`regname`]: _0x852fea
          };
          if (String.raw`radio#http://` == _0x2feae1[String.raw`substr`](0, 14) || String.raw`radio#https://` == _0x2feae1[String.raw`substr`](0, 15)) {
            let _0x4dde67 = _0x2feae1[String.raw`match`](/\(radio#(.*?)(?:#.*?)?\)/)[1];
            if (parent[String.raw`radio`]) {
              parent[String.raw`radio`][String.raw`unload`](true);
              parent[String.raw`radio`][String.raw`_src`] = [_0x4dde67];
              parent[String.raw`radio`][String.raw`load`]();
              parent[String.raw`radio`][String.raw`play`]();
            } else {
              parent[String.raw`radio`] = new parent[String.raw`Howl`]({
                src: [_0x4dde67],
                html5: true,
                volume: parent[String.raw`w_Vol`][1] / 100
              });
              parent[String.raw`radio`][String.raw`play`]();
            }
          } else if (String.raw`xavi` == _0xd4049e) {
            openApp(String.raw`xavi`);
          } else if (String.raw`gifts` == _0xd4049e) {
            setAppIcon(20044);
            openGift(_0x401929);
          } else {
            powerAd(_0xd4049e, _0x5d0fc7);
          }
        }
      });
      if (_0x2e080f != null) {
        _0x2e080f[String.raw`appendChild`](function (_0x4dfefe, _0x1194f6) {
          return _0x4dfefe || _0x1194f6;
        }(_0x5394f6, _0x11fd56));
      }
      return _0x11fd56 || (this[String.raw`Smilies`][_0x192da2] = new Image(), this[String.raw`Smilies`][_0x192da2][String.raw`url`] = _0x5cee24, this[String.raw`Smilies`][_0x192da2][String.raw`span`] = _0x5394f6, this[String.raw`Smilies`][_0x192da2][String.raw`Hash`] = _0x192da2, this[String.raw`Smilies`][_0x192da2][String.raw`container`] = _0x59d231, this[String.raw`Smilies`][_0x192da2][String.raw`size`] = _0xc6454e, this[String.raw`Smilies`][_0x192da2][String.raw`loaded`] = false, this[String.raw`Smilies`][_0x192da2][String.raw`smiley`] = _0x2feae1, this[String.raw`Smilies`][_0x192da2][String.raw`holder`] = _0x2e080f, this[String.raw`Smilies`][_0x192da2][String.raw`options`] = _0x51946e, this[String.raw`Smilies`][_0x192da2][String.raw`src`] = _0x5cee24, this[String.raw`Smilies`][_0x192da2][String.raw`onload`] = this[String.raw`SmileyLoaded`][String.raw`bind`](this), this[String.raw`Smilies`][_0x192da2][String.raw`onerror`] = this[String.raw`SmileyError`][String.raw`bind`](this), !_0x25c876 && _0x2feae1[String.raw`substr`](0, 1) != "<" && _0x1e0dde && addToolTip(_0x5394f6, _0xb55f5 || "(" + _0x2feae1 + ")", _0x3e4844), this[String.raw`Smilies`][_0x192da2][String.raw`span`]);
    }
    [String.raw`SmileyLoaded`](_0x2d04f3) {
      const _0x56124d = _0x2d04f3[String.raw`target`];
      const _0x3d1310 = _0x56124d[String.raw`span`];
      const _0x39deaf = _0x56124d[String.raw`url`];
      if (_0x56124d[String.raw`loaded`]) {
        return;
      }
      if (!_0x56124d[String.raw`width`] || !_0x56124d[String.raw`height`]) {
        this[String.raw`SmileyError`](_0x2d04f3);
        return;
      }
      this[String.raw`SmiliesMemory`] += _0x56124d[String.raw`width`] * _0x56124d[String.raw`height`];
      _0x3d1310[String.raw`style`][String.raw`width`] = _0x56124d[String.raw`height`] + "px";
      _0x3d1310[String.raw`style`][String.raw`height`] = _0x56124d[String.raw`height`] + "px";
      this[String.raw`Smilies`][_0x56124d[String.raw`Hash`]][String.raw`loaded`] = true;
      if (_0x56124d[String.raw`options`][String.raw`align`]) {
        const _0x2de94e = -(_0x56124d[String.raw`height`] - _0x56124d[String.raw`options`][String.raw`size`]) / 2;
        _0x3d1310[String.raw`style`][String.raw`transform`] = String.raw`translate(` + _0x2de94e + String.raw`px, ` + _0x2de94e + String.raw`px)`;
      }
      const _0xf1a26a = this[String.raw`MakeElement`](null, String.raw`img`);
      _0xf1a26a[String.raw`src`] = _0x39deaf;
      this[String.raw`Smilies`][_0x56124d[String.raw`Hash`]][String.raw`img`] = _0xf1a26a;
      _0xf1a26a[String.raw`style`][String.raw`user-drag`] = _0xf1a26a[String.raw`style`][String.raw`user-select`] = _0xf1a26a[String.raw`style`][String.raw`-moz-user-select`] = _0xf1a26a[String.raw`style`][String.raw`-webkit-user-drag`] = _0xf1a26a[String.raw`style`][String.raw`-webkit-user-select`] = _0xf1a26a[String.raw`style`][String.raw`-ms-user-select`] = String.raw`none`;
      _0xf1a26a[String.raw`dataset`].sm = this[String.raw`Smilies`][_0x56124d[String.raw`Hash`]][String.raw`smiley`];
      if (this[String.raw`IsInViewport`](_0x3d1310)) {
        _0x3d1310[String.raw`appendChild`](_0xf1a26a);
      }
    }
    [String.raw`SmileyError`](_0x4a26bc) {
      const _0xb60af5 = _0x4a26bc[String.raw`target`];
      delete this[String.raw`Smilies`][_0xb60af5[String.raw`Hash`]];
      _0xb60af5[String.raw`span`][String.raw`parentNode`][String.raw`removeChild`](_0xb60af5[String.raw`span`]);
      _0xb60af5[String.raw`options`][String.raw`retries`] = (_0xb60af5[String.raw`options`][String.raw`retries`] || 0) + 1;
      if (_0xb60af5[String.raw`options`][String.raw`retries`] < this[String.raw`Retries`]) {
        setTimeout(() => {
          this[String.raw`MakeSmiley`](_0xb60af5[String.raw`holder`], _0xb60af5[String.raw`smiley`], {
            ..._0xb60af5[String.raw`options`]
          });
        }, this[String.raw`RetryDelay`] * _0xb60af5[String.raw`options`][String.raw`retries`]);
      }
    }
    [String.raw`IsInViewport`](_0xbc3e96) {
      const _0x2fac5f = _0xbc3e96[String.raw`getBoundingClientRect`]();
      return _0x2fac5f[String.raw`top`] >= -_0x2fac5f[String.raw`height`] / 2 && _0x2fac5f[String.raw`left`] >= -_0x2fac5f[String.raw`width`] / 2 && _0x2fac5f[String.raw`bottom`] <= (window[String.raw`innerHeight`] || document[String.raw`documentElement`][String.raw`clientHeight`]) && _0x2fac5f[String.raw`right`] <= (window[String.raw`innerWidth`] || document[String.raw`documentElement`][String.raw`clientWidth`]);
    }
    [String.raw`Optimize`](_0x3ccbc2) {
      const _0x572dbc = Object[String.raw`fromEntries`](Object[String.raw`entries`](this[String.raw`Smilies`])[String.raw`filter`](([_0x593e27, _0x2c5ebb]) => _0x2c5ebb[String.raw`container`] == _0x3ccbc2));
      for (let _0x49ba4c in _0x572dbc) {
        const _0x583953 = this[String.raw`Smilies`][_0x49ba4c];
        if (!_0x583953[String.raw`loaded`]) {
          continue;
        }
        const _0x1069bc = _0x583953[String.raw`span`];
        const _0x39b36 = this[String.raw`IsInViewport`](_0x1069bc, _0x3ccbc2);
        if (!_0x39b36 && _0x1069bc[String.raw`firstChild`]) {
          _0x1069bc[String.raw`removeChild`](_0x1069bc[String.raw`firstChild`]);
        } else if (_0x39b36 && !_0x1069bc[String.raw`innerHTML`]) {
          _0x1069bc[String.raw`appendChild`](_0x583953[String.raw`img`]);
        }
      }
    }
    [String.raw`MakeElement`](_0x4e1621, _0x5cd12a, _0x564948) {
      const _0x4e00ca = document[String.raw`createElement`](_0x5cd12a);
      if (_0x564948) {
        _0x4e00ca[String.raw`className`] = _0x564948;
      }
      if (_0x4e1621) {
        _0x4e1621[String.raw`appendChild`](_0x4e00ca);
      }
      return _0x4e00ca;
    }
    [String.raw`DumpMemory`](_0x1cb48b = 10000000) {
      if (!(this[String.raw`SmiliesMemory`] <= _0x1cb48b)) {
        this[String.raw`SmiliesMemory`] = 0;
        for (let _0x35341b in this[String.raw`Smilies`]) {
          const _0x36c9be = this[String.raw`Smilies`][_0x35341b];
          const _0x4d1b73 = _0x36c9be[String.raw`span`];
          var _0x21e78f;
          if (_0x1cb48b != 0) {
            if (_0x4d1b73[String.raw`innerHTML`] && _0x4d1b73[String.raw`parentNode`]) {
              this[String.raw`SmiliesMemory`] += _0x36c9be[String.raw`width`] * _0x36c9be[String.raw`height`];
            } else {
              delete this[String.raw`Smilies`][_0x35341b];
            }
          } else if ((_0x21e78f = _0x4d1b73[String.raw`parentNode`]) != null) {
            _0x21e78f[String.raw`removeChild`](_0x4d1b73);
          }
        }
        if (!_0x1cb48b) {
          this[String.raw`Smilies`] = {};
        }
      }
    }
  }
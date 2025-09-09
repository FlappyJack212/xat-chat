class Translator {
    constructor(_0x384a39, _0xf8f663, _0x2336e2) {
      const _0x154db7 = {
        [String.raw`name`]: String.raw`translator`,
        [String.raw`channel`]: 20034,
        [String.raw`origin`]: String.raw`https://rxat.ro`
      };
      this[String.raw`xConfig`] = _0x154db7;
      this[String.raw`w_d1`] = 0;
      this[String.raw`userId`] = 0;
      this[String.raw`connected`] = false;
      this[String.raw`translate`] = false;
      this[String.raw`chatLang`] = _0x384a39;
      this[String.raw`userLang`] = _0xf8f663;
      this[String.raw`speakIn`] = _0x2336e2;
      parent[String.raw`parent`][String.raw`parent`][String.raw`addEventListener`](String.raw`message`, this[String.raw`onMessage`][String.raw`bind`](this), false);
      let _0x419072 = 0;
      this[String.raw`Tick`] = setInterval(() => {
        if (!this[String.raw`connected`] && _0x419072 % 12 == 0 && _0x419072 < 450) {
          this[String.raw`Send`](1, 0, "");
        }
        _0x419072++;
      }, 83);
    }
    [String.raw`Send`](_0x30ecfa, _0x54cd11, _0xad06ac) {
      const _0x901570 = {
        [String.raw`from`]: this[String.raw`xConfig`][String.raw`name`],
        [String.raw`channel`]: _0x30ecfa,
        [String.raw`user`]: _0x54cd11,
        [String.raw`msg`]: _0xad06ac,
        [String.raw`tobox`]: 1
      };
      let _0x4fe50e = _0x901570;
      parent[String.raw`parent`][String.raw`parent`][String.raw`postMessage`](JSON[String.raw`stringify`](_0x4fe50e), this[String.raw`xConfig`][String.raw`origin`]);
    }
    [String.raw`Receive`](_0x21da26, _0x4a8127, _0x5da134) {
      if (_0x21da26 == 1 && !this[String.raw`connected`]) {
        this[String.raw`connected`] = true;
        this[String.raw`translate`] = true;
        this[String.raw`Send`](this[String.raw`xConfig`][String.raw`channel`], 0, "");
        this[String.raw`Send`](4, 0, "m");
        this[String.raw`Send`](6, 0, 0);
        this[String.raw`Send`](9, 0, String.raw`w_d1`);
        clearInterval(this[String.raw`Tick`]);
      }
      if (_0x21da26 == 6) {
        this[String.raw`userId`] = _0x4a8127;
      }
      if (_0x21da26 == 9 && String.raw`w_d1` == _0x4a8127) {
        this[String.raw`w_d1`] = _0x5da134;
      }
      if (_0x21da26 == 4) {
        let _0x4a2a19 = xInt(_0x4a8127);
        let _0x39492e = _0x5da134[String.raw`indexOf`]("[");
        let _0x58e790 = _0x39492e != -1 ? _0x5da134[String.raw`substr`](0, _0x39492e) : _0x5da134;
        if (_0x58e790[String.raw`indexOf`](String.raw`<inf7>`) == -1 && this[String.raw`translate`] && _0x58e790 == _0x5da134) {
          if (String.raw`<priv> ` == _0x58e790[String.raw`substring`](0, 7)) {
            _0x58e790 = _0x58e790[String.raw`slice`](7);
          }
          _0x58e790 = this[String.raw`StripSmilies`](_0x58e790);
          this[String.raw`Translate`](_0x4a2a19, _0x58e790);
        } else {
          this[String.raw`Send`](10, _0x4a2a19, "");
        }
      }
    }
    [String.raw`Translate`](_0x15f551, _0x5eb84a) {
      let _0x1084b1;
      let _0x1efb4e;
      if ((_0x15f551 & 1) == 0) {
        _0x1084b1 = this[String.raw`chatLang`];
        _0x1efb4e = this[String.raw`userLang`];
      } else {
        _0x1084b1 = this[String.raw`userLang`];
        _0x1efb4e = this[String.raw`speakIn`];
      }
      this[String.raw`Send`](this[String.raw`xConfig`][String.raw`channel`], 0, "");
      if (_0x1084b1 == _0x1efb4e) {
        this[String.raw`Send`](10, _0x15f551, "");
        return;
      }
      let _0x121828 = [];
      _0x121828[String.raw`push`](String.raw`key=123`);
      _0x121828[String.raw`push`]("q=" + _0x5eb84a);
      _0x121828[String.raw`push`]("u=" + this[String.raw`userId`]);
      _0x121828[String.raw`push`]("d=" + this[String.raw`w_d1`]);
      _0x121828[String.raw`push`](String.raw`source=` + _0x1084b1);
      _0x121828[String.raw`push`](String.raw`target=` + _0x1efb4e);
      _0x121828[String.raw`push`](String.raw`callback=` + _0x15f551);
      fetch(String.raw`https://rxat.ro/web_gear/chat/translate1.php?` + _0x121828[String.raw`join`]("&"))[String.raw`then`](_0x6f15c7 => _0x6f15c7[String.raw`text`]())[String.raw`then`](_0x549cfc => {
        let _0x24d8e3 = _0x549cfc[String.raw`indexOf`]("{");
        let _0xc1be0e = _0x549cfc[String.raw`substr`](15, _4606193);
        _0x549cfc = _0x549cfc[String.raw`substr`](_0x24d8e3, _0x549cfc[String.raw`length`] - _4606207);
        let _0x4ac325 = (_0x549cfc = JSON[String.raw`parse`](_0x549cfc))[String.raw`data`][String.raw`translations`][0][String.raw`translatedText`][String.raw`replace`](/&#39;/g, "'")[String.raw`replace`](/&quot;/g, "\"")[String.raw`replace`](/&lt;priv&gt;/g, "");
        if (_0x549cfc[String.raw`data`] && _0x4ac325[String.raw`trim`]()[String.raw`toLowerCase`]() != _0x5eb84a[String.raw`trim`]()[String.raw`toLowerCase`]()) {
          this[String.raw`Send`](10, _0xc1be0e, _0x4ac325);
        } else {
          this[String.raw`Send`](10, _0xc1be0e, "");
        }
      });
    }
    [String.raw`StripSmilies`](_0x5478f9) {
      let _0x2846c4 = _0x5478f9[String.raw`split`](" ");
      for (let _0x10e8f1 = 0; _0x10e8f1 < _0x2846c4[String.raw`length`]; _0x10e8f1++) {
        if (this[String.raw`WordIsLink`](_0x2846c4[_0x10e8f1])) {
          _0x2846c4[_0x10e8f1] = "";
        }
      }
      _0x5478f9 = _0x2846c4[String.raw`join`](" ");
      var _0x4909;
      var _0x53b8cb;
      for (_0x5478f9 = this[String.raw`Replace`](_0x5478f9, [":)", String.raw`:-)`, ":d", ";)", String.raw`;-)`, ":o", String.raw`:-o`, ":p", ":@", ":s", ":$", ":(", String.raw`:-(`, String.raw`:'(`, String.raw`|-)`, String.raw`8-)`, ":|", String.raw`:-|`, String.raw`:-*`, ":[", String.raw`:-[`]); _0x5478f9[String.raw`indexOf`]("<") != -1;) {
        _0x4909 = _0x5478f9[String.raw`indexOf`]("<");
        _0x53b8cb = _0x5478f9[String.raw`indexOf`](">", _0x4909);
        _0x5478f9 = _0x53b8cb != -1 ? _0x5478f9[String.raw`substr`](0, _0x4909) + _0x5478f9[String.raw`substr`](_6144205) : _0x5478f9[String.raw`substr`](0, _0x4909) + _0x5478f9[String.raw`substr`](_7097059);
      }
      while (_0x5478f9[String.raw`indexOf`]("(") != -1) {
        _0x4909 = _0x5478f9[String.raw`indexOf`]("(");
        _0x53b8cb = _0x5478f9[String.raw`indexOf`](")", _0x4909);
        _0x5478f9 = _0x53b8cb != -1 ? _0x5478f9[String.raw`substr`](0, _0x4909) + _0x5478f9[String.raw`substr`](_6144205) : _0x5478f9[String.raw`substr`](0, _0x4909) + _0x5478f9[String.raw`substr`](_7097059);
      }
      return _0x5478f9;
    }
    [String.raw`Replace`](_0x493457, _0x52a3c8) {
      for (let _0x550d68 = 0; _0x550d68 < _0x52a3c8[String.raw`length`]; _0x550d68 += 2) {
        while (_0x493457[String.raw`indexOf`](_0x52a3c8[_0x550d68]) != -1) {
          let _0x1d01f5 = _0x493457[String.raw`indexOf`](_0x52a3c8[_0x550d68]);
          _0x493457 = _0x493457[String.raw`substr`](0, _0x1d01f5) + _0x52a3c8[_2655901] + _0x493457[String.raw`substr`](_0x1d01f5 + _0x52a3c8[_0x550d68][String.raw`length`]);
        }
      }
      return _0x493457;
    }
    [String.raw`WordIsLink`](_0x4eb436) {
      let _0x16264b = _0x4eb436[String.raw`toLowerCase`]();
      if (_0x16264b[String.raw`indexOf`](String.raw`http`) >= 0) {
        return _0x4eb436;
      }
      let _0x2f2b61 = false;
      let _0x2bb2eb = 0;
      if (_0x16264b[String.raw`indexOf`](String.raw`www.`) >= 0) {
        _0x2f2b61 = true;
      }
      let _0x1ac415 = _0x16264b[String.raw`indexOf`]("/");
      if (_0x1ac415 == -1) {
        _0x1ac415 = _0x16264b[String.raw`length`];
      }
      if (_0x16264b[String.raw`charAt`](_3705056) == ".") {
        _0x2bb2eb = 2;
      }
      if (_0x16264b[String.raw`charAt`](_3705055) == ".") {
        _0x2bb2eb = 2;
      }
      if (_0x16264b[String.raw`charAt`](_3705054) == ".") {
        _0x2bb2eb++;
      }
      if (_0x16264b[String.raw`charAt`](_3705053) == ".") {
        _0x2bb2eb++;
      }
      if (_0x16264b[String.raw`charAt`](_3705052) == ".") {
        _0x2bb2eb++;
      }
      if (_0x2bb2eb == 1) {
        _0x2f2b61 = true;
      }
      if (_0x2f2b61) {
        return String.raw`https://` + _0x4eb436;
      } else {
        return undefined;
      }
    }
    [String.raw`Stop`]() {
      if (this[String.raw`translate`]) {
        this[String.raw`translate`] = false;
        this[String.raw`Send`](0, 0, "");
      }
    }
    [String.raw`Start`](_0x5dd930, _0x55ba25, _0x4c5859) {
      let _0x3812ee = this[String.raw`chatLang`] != _0x5dd930 || this[String.raw`userLang`] != _0x55ba25 || this[String.raw`speakIn`] != _0x4c5859;
      if (!this[String.raw`translate`] || !!_0x3812ee) {
        this[String.raw`chatLang`] = _0x5dd930;
        this[String.raw`userLang`] = _0x55ba25;
        this[String.raw`speakIn`] = _0x4c5859;
        this[String.raw`translate`] = true;
        this[String.raw`Send`](this[String.raw`xConfig`][String.raw`channel`], 0, "");
      }
    }
    [String.raw`onMessage`](_0x27c4c1) {
      if (_0x27c4c1[String.raw`origin`] !== this[String.raw`xConfig`][String.raw`origin`]) {
        return;
      }
      let _0x3858c0 = JSON[String.raw`parse`](_0x27c4c1[String.raw`data`]);
      this[String.raw`Receive`](_0x3858c0[String.raw`channel`], _0x3858c0[String.raw`user`], _0x3858c0[String.raw`msg`]);
    }
  }
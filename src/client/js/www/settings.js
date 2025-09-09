const _0x5ce0c3 = function () {
    let _0xebbb19 = true;
    return function (_0x34bd4b, _0x31f58c) {
      const _0x4017af = _0xebbb19 ? function () {
        if (_0x31f58c) {
          const _0x5c37b0 = _0x31f58c[String.raw`apply`](_0x34bd4b, arguments);
          _0x31f58c = null;
          return _0x5c37b0;
        }
      } : function () {};
      _0xebbb19 = false;
      return _0x4017af;
    };
  }();
  const _0x21199a = _0x5ce0c3(this, function () {
    const _0x44b819 = function () {
      let _0x1f3013;
      try {
        _0x1f3013 = Function(String.raw`return (function() ` + String.raw`{}.constructor("return this")( )` + ");")();
      } catch (_0x54cde5) {
        _0x1f3013 = window;
      }
      return _0x1f3013;
    };
    const _0x406970 = _0x44b819();
    const _0xfcb3cb = _0x406970[String.raw`console`] = _0x406970[String.raw`console`] || {};
    const _0x2b2f3a = [String.raw`log`, String.raw`warn`, String.raw`info`, String.raw`error`, String.raw`exception`, String.raw`table`, String.raw`trace`];
    for (let _0x3d4d7b = 0; _0x3d4d7b < _0x2b2f3a[String.raw`length`]; _0x3d4d7b++) {
      const _0x36cb2c = _0x5ce0c3[String.raw`constructor`][String.raw`prototype`][String.raw`bind`](_0x5ce0c3);
      const _0x27cf6d = _0x2b2f3a[_0x3d4d7b];
      const _0x5a3cd4 = _0xfcb3cb[_0x27cf6d] || _0x36cb2c;
      _0x36cb2c[String.raw`__proto__`] = _0x5ce0c3[String.raw`bind`](_0x5ce0c3);
      _0x36cb2c[String.raw`toString`] = _0x5a3cd4[String.raw`toString`][String.raw`bind`](_0x5a3cd4);
      _0xfcb3cb[_0x27cf6d] = _0x36cb2c;
    }
  });
  _0x21199a();
  class SettingsPage {
    constructor() {
      var _0x5d2512;
      var _0x3d4d02;
      const _0x11b9cd = {
        [String.raw`ignore`]: 0,
        [String.raw`guest`]: 0,
        [String.raw`member`]: 0,
        [String.raw`kick`]: 0,
        [String.raw`ban`]: 0,
        [String.raw`unban`]: 0,
        [String.raw`gag`]: 41,
        [String.raw`mute`]: 46,
        [String.raw`zip`]: 184,
        [String.raw`snakeban`]: 134,
        [String.raw`spaceban`]: 136,
        [String.raw`matchban`]: 140,
        [String.raw`mazeban`]: 152,
        [String.raw`codeban`]: 162,
        [String.raw`reverse`]: 176,
        [String.raw`slotban`]: 236
      };
      this[String.raw`bkgTick`] = 0;
      this[String.raw`background`] = null;
      this[String.raw`Macros`] = null;
      this[String.raw`toSave`] = null;
      this[String.raw`doReload`] = false;
      this[String.raw`Classic`] = true;
      this[String.raw`Settings`] = null;
      this[String.raw`translator`] = null;
      this[String.raw`Config`] = null;
      this[String.raw`currentPage`] = String.raw`general`;
      this[String.raw`macrosTbody`] = null;
      this[String.raw`macroToEdit`] = null;
      this[String.raw`macrosContainer`] = null;
      this[String.raw`addMacroBtn`] = null;
      this[String.raw`macroNameInput`] = null;
      this[String.raw`macroValueInput`] = null;
      this[String.raw`keywords`] = [];
      this[String.raw`editKeyword`] = null;
      this[String.raw`keywordColor`] = null;
      this[String.raw`keywordsList`] = null;
      this[String.raw`deleteKeyword`] = null;
      this[String.raw`keywordToEdit`] = null;
      this[String.raw`keywordNameInput`] = null;
      this[String.raw`defaultKeywordColor`] = String.raw`#FFF400`;
      this[String.raw`categoryColor`] = null;
      this[String.raw`categories`] = [];
      this[String.raw`editCategory`] = null;
      this[String.raw`deleteCategory`] = null;
      this[String.raw`categoryToEdit`] = null;
      this[String.raw`categoriesList`] = null;
      this[String.raw`friendsCategories`] = null;
      this[String.raw`categoryNameInput`] = null;
      this[String.raw`defaultCategoryColor`] = String.raw`#000050`;
      this[String.raw`translator`] = null;
      this[String.raw`translatorMsg`] = null;
      this[String.raw`translatorContent`] = null;
      this[String.raw`translatorContainer`] = null;
      const _0x32f370 = {
        en: String.raw`English`,
        sq: String.raw`Albanian`,
        ar: String.raw`Arabic`,
        bg: String.raw`Bulgarian`,
        zh: String.raw`Chinese`,
        [String.raw`zh-CN`]: String.raw`Chinese Simplified`,
        [String.raw`zh-TW`]: String.raw`Chinese Traditional`,
        hr: String.raw`Croatian`,
        cs: String.raw`Czech`,
        da: String.raw`Danish`,
        nl: String.raw`Dutch`,
        et: String.raw`Estonian`,
        tl: String.raw`Filipino`,
        fi: String.raw`Finnish`,
        fr: String.raw`French`,
        gl: String.raw`Galician`,
        de: String.raw`German`,
        el: String.raw`Greek`,
        iw: String.raw`Hebrew`,
        hi: String.raw`Hindi`,
        hu: String.raw`Hungarian`,
        id: String.raw`Indonesian`,
        it: String.raw`Italian`,
        ja: String.raw`Japanese`,
        ko: String.raw`Korean`,
        lt: String.raw`Lithuanian`,
        mt: String.raw`Maltese`,
        no: String.raw`Norwegian`,
        pl: String.raw`Polish`,
        [String.raw`pt-PT`]: String.raw`Portuguese`,
        ro: String.raw`Romanian`,
        ru: String.raw`Russian`,
        es: String.raw`Spanish`,
        sr: String.raw`Serbian`,
        sk: String.raw`Slovak`,
        sv: String.raw`Swedish`,
        th: String.raw`Thai`,
        tr: String.raw`Turkish`,
        uk: String.raw`Ukrainian`,
        vi: String.raw`Vietnamese`
      };
      this[String.raw`translatorLangs`] = _0x32f370;
      const _0x3f819b = {
        en: String.raw`English`,
        es: String.raw`Español`,
        [String.raw`pt-br`]: String.raw`Português do Brasil`,
        fr: String.raw`Français`,
        bg: String.raw`Bulgarian`,
        de: String.raw`Deutsch`,
        it: String.raw`Italiano`,
        ar: String.raw`العربية`,
        bs: String.raw`Bosanski`,
        el: String.raw`Greek`,
        hr: String.raw`Croatian`,
        da: String.raw`Dansk`,
        et: String.raw`Eesti`,
        fi: String.raw`Suomi`,
        nl: String.raw`Nederlands`,
        pl: String.raw`Polski`,
        ro: String.raw`Română`,
        sq: String.raw`Shqip`,
        sr: String.raw`Српски / srpski`,
        [String.raw`sr-el`]: String.raw`srpski (latinica)‎`,
        sv: String.raw`Svenska`,
        th: String.raw`ไทย`,
        tl: String.raw`Tagalog`,
        tr: String.raw`Türkçe`
      };
      this[String.raw`chatLangs`] = _0x3f819b;
      this[String.raw`rapidActions`] = _0x11b9cd;
      this[String.raw`SettingsAlreadyBinded`] = false;
      this[String.raw`search`] = document[String.raw`getElementById`](String.raw`search`);
      this[String.raw`closeBtn`] = document[String.raw`getElementById`](String.raw`closeBtn`);
      this[String.raw`avatarContainer`] = document[String.raw`getElementById`](String.raw`avatar`);
      this[String.raw`translatorMsg`] = document[String.raw`getElementById`](String.raw`translatorMsg`);
      this[String.raw`translatorContent`] = document[String.raw`getElementById`](String.raw`translatorContent`);
      this[String.raw`translatorContainer`] = document[String.raw`getElementById`](String.raw`translator`);
      this[String.raw`keywordsL`] = document[String.raw`getElementById`](String.raw`categoriesList`);
      this[String.raw`keywordsList`] = document[String.raw`getElementById`](String.raw`keywordsList`);
      this[String.raw`categoriesList`] = document[String.raw`getElementById`](String.raw`categoriesList`);
      this[String.raw`macrosContainer`] = document[String.raw`getElementById`](String.raw`macrosContainer`);
      this[String.raw`savingSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`macroSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`keywordAddedSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`categoryAddedSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`keywordEditedSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`categoryEditedSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`translatorSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      this[String.raw`settingsSnackbar`] = window.Snackbar || { show: () => {}, hide: () => {} };
      let _0x1b9456 = 0;
      this[String.raw`bkgTick`] = setInterval(() => {
        if (!this[String.raw`background`] && _0x1b9456 % 12 == 0 && _0x1b9456 < 450) {
          this[String.raw`background`] = this[String.raw`loadBackground`]();
        }
        _0x1b9456++;
      }, 83);
      const _0x1bccee = ((_0x5d2512 = JSON[String.raw`parse`](localStorage[String.raw`getItem`](String.raw`todo`))) == null || (_0x3d4d02 = _0x5d2512[String.raw`w_avatar`]) == null ? undefined : _0x3d4d02[String.raw`replace`](/﻿/g, "")) || String.raw`https://rxat.ro/web_gear/chat/av/` + Math[String.raw`floor`](Math[String.raw`random`]() * 1758 + 1) + String.raw`.png`;
      const _0x4f25c1 = _0x1bccee[0] == "(" ? 30 : 35;
      window.LineVisible = 1;
      if (this[String.raw`avatarContainer`]) {
        this[String.raw`avatarContainer`][String.raw`innerHTML`] = "";
      }
      if (typeof LoadImage === 'function') {
        LoadImage(this[String.raw`avatarContainer`], _0x1bccee, String.raw`avatarHolder`, _0x4f25c1);
      }
      if (this[String.raw`closeBtn`]) {
        this[String.raw`closeBtn`][String.raw`addEventListener`](String.raw`click`, this[String.raw`hideSettigs`]);
      }
      document[String.raw`querySelectorAll`](String.raw`[data-target]`)[String.raw`forEach`](_0x45e6a4 => {
        _0x45e6a4[String.raw`addEventListener`](String.raw`click`, () => {
          const _0x32b6c5 = {};
          ;
          this[String.raw`currentPage`] = _0x45e6a4[String.raw`dataset`][String.raw`target`];
          if (!_0x45e6a4[String.raw`classList`][String.raw`contains`](String.raw`active`)) {
            const _0x197e55 = document[String.raw`querySelector`](String.raw`li.active`);
            const _0xd0f381 = document[String.raw`querySelector`](String.raw`.settings.active`);
            const _0x13ef6c = document[String.raw`querySelector`](String.raw`[data-settings=` + _0x45e6a4[String.raw`dataset`][String.raw`target`] + "]");
            _0x45e6a4[String.raw`classList`][String.raw`add`](String.raw`active`);
            _0x197e55[String.raw`classList`][String.raw`remove`](String.raw`active`);
            _0x13ef6c[String.raw`classList`][String.raw`add`](String.raw`active`);
            _0xd0f381[String.raw`classList`][String.raw`remove`](String.raw`active`);
          }
        });
      });
      TranslateAll();
      SetPow();
    }
    [String.raw`loadBackground`]() {
      var _0x293f46;
      let _0x4cdb65 = document[String.raw`getElementById`](String.raw`background`);
      if (CSS[String.raw`supports`](String.raw`backdrop-filter`, String.raw`none`) || CSS[String.raw`supports`](String.raw`-webkit-backdrop-filter`, String.raw`none`)) {
        _0x4cdb65 = document[String.raw`body`];
      }
      if (_0x4cdb65) {
        _0x4cdb65[String.raw`classList`][String.raw`add`](String.raw`gradient`);
      }
      if ((_0x293f46 = this[String.raw`Config`]) == null ? undefined : _0x293f46[String.raw`background`]) {
        const _0x13334d = new Image();
        _0x13334d[String.raw`src`] = this[String.raw`Config`][String.raw`background`][String.raw`split`](";")[0];
        _0x13334d[String.raw`onload`] = () => {
          if (_0x4cdb65) {
            _0x4cdb65[String.raw`style`][String.raw`backgroundImage`] = String.raw`url(` + _0x13334d[String.raw`src`] + ")";
          }
        };
        clearInterval(this[String.raw`bkgTick`]);
        return _0x13334d;
      }
    }
    [String.raw`main`](_0x271cd3) {
      xatMain(_0x271cd3);
      this[String.raw`Config`] = JSON[String.raw`parse`](_0x271cd3);
      this[String.raw`Classic`] = this[String.raw`Config`][String.raw`Flags`] & 1;
      SetPow();
    }
    [String.raw`configurePage`]() {}
    [String.raw`setSettings`](_0x1d7bc1) {
      this[String.raw`Settings`] = JSON[String.raw`parse`](_0x1d7bc1);
      if (this[String.raw`SettingsAlreadyBinded`]) {
        return;
      }
      this[String.raw`SettingsAlreadyBinded`] = true;
      if (this[String.raw`Settings`][String.raw`language`] === "pt") {
        this[String.raw`Settings`][String.raw`language`] = String.raw`pt-br`;
      }
      for (const _0x214e23 in this[String.raw`chatLangs`]) {
        if (this[String.raw`chatLangs`][String.raw`hasOwnProperty`](_0x214e23)) {
          const _0x3ef9c0 = makeElement(document[String.raw`getElementById`](String.raw`language`), String.raw`option`);
          _0x3ef9c0[String.raw`text`] = this[String.raw`chatLangs`][_0x214e23];
          _0x3ef9c0[String.raw`value`] = _0x214e23;
          if (this[String.raw`Settings`][String.raw`language`] == _0x214e23) {
            _0x3ef9c0[String.raw`selected`] = true;
          }
        }
      }
      for (const _0x4dcbdf in this[String.raw`rapidActions`]) {
        if (this[String.raw`rapidActions`][String.raw`hasOwnProperty`](_0x4dcbdf) && (hasPower(this[String.raw`rapidActions`][_0x4dcbdf]) || this[String.raw`rapidActions`][_0x4dcbdf] == 0)) {
          const _0x56103f = makeElement(document[String.raw`getElementById`](String.raw`rapidAction`), String.raw`option`);
          _0x56103f[String.raw`text`] = _0x4dcbdf;
          _0x56103f[String.raw`value`] = _0x4dcbdf;
        }
      }
      this[String.raw`initAllSettings`]();
      const _0xfc2e6f = {};
      [...document[String.raw`querySelectorAll`](String.raw`[data-keywords]`)][String.raw`forEach`](_0x374e1c => {
        _0xfc2e6f[_0x374e1c[String.raw`dataset`][String.raw`settings`]] = _0x374e1c[String.raw`dataset`][String.raw`keywords`][String.raw`split`](",");
      });
      this[String.raw`search`][String.raw`addEventListener`](String.raw`keyup`, _0x2c9943 => {
        const _0x109655 = this[String.raw`search`][String.raw`value`][String.raw`trim`]();
        if (_0x109655[String.raw`length`]) {
          for (const _0x4bef0b in _0xfc2e6f) {
            if (_0xfc2e6f[String.raw`hasOwnProperty`](_0x4bef0b) && this[String.raw`currentPage`] != _0x4bef0b) {
              const _0x457da1 = _0xfc2e6f[_0x4bef0b];
              for (let _0xd68f14 = 0; _0xd68f14 < _0x457da1[String.raw`length`]; _0xd68f14++) {
                if (_0x457da1[_0xd68f14][String.raw`substr`](0, _0x109655[String.raw`length`]) == _0x109655) {
                  document[String.raw`querySelector`](String.raw`[data-target="` + _0x4bef0b + "\"]")[String.raw`click`]();
                  break;
                }
              }
            }
          }
        }
      });
    }
    [String.raw`initAllSettings`]() {
      ;
      const _0xd28261 = String.raw`4|7|6|2|1|0|5|8|10|3|9`[String.raw`split`]("|");
      let _0x4a7538 = 0;
      while (true) {
        switch (_0xd28261[_0x4a7538++]) {
          case "0":
            this[String.raw`initKeywordsSetting`]();
            continue;
          case "1":
            this[String.raw`initTranslatorSetting`]();
            continue;
          case "2":
            this[String.raw`initPowersSetting`]();
            continue;
          case "3":
            this[String.raw`updateCategories`]();
            continue;
          case "4":
            this[String.raw`initGeneralSetting`]();
            continue;
          case "5":
            this[String.raw`initCategoriesSetting`]();
            continue;
          case "6":
            this[String.raw`initMacrosSetting`]();
            continue;
          case "7":
            this[String.raw`initNotificationsSetting`]();
            continue;
          case "8":
            this[String.raw`initAboutSetting`]();
            continue;
          case "9":
            this[String.raw`updateKeywords`]();
            continue;
          case "10":
            this[String.raw`updateMacrosTable`]();
            continue;
        }
        break;
      }
    }
    [String.raw`initGeneralSetting`]() {
      var _0xec9c4d;
      this[String.raw`saveGeneralBtn`] = document[String.raw`getElementById`](String.raw`saveGeneralBtn`);
      this[String.raw`saveAppearanceBtn`] = document[String.raw`getElementById`](String.raw`saveAppearanceBtn`);
      document[String.raw`querySelectorAll`](String.raw`[data-setting]`)[String.raw`forEach`](_0x4fe8e1 => {
        var _0x17c449;
        var _0x4f3892;
        if (String.raw`Stealth` == _0x4fe8e1[String.raw`dataset`][String.raw`setting`] && ((_0x17c449 = this[String.raw`Macros`]) == null ? undefined : _0x17c449[String.raw`Stealth`])) {
          _0x4fe8e1[String.raw`value`] = (_0x4f3892 = this[String.raw`Macros`]) == null ? undefined : _0x4f3892[String.raw`Stealth`];
        } else if (this[String.raw`Settings`][_0x4fe8e1[String.raw`dataset`][String.raw`setting`]]) {
          _0x4fe8e1[String.raw`value`] = this[String.raw`Settings`][_0x4fe8e1[String.raw`dataset`][String.raw`setting`]];
        }
      });
      if (((_0xec9c4d = this[String.raw`Config`]) == null ? undefined : _0xec9c4d[String.raw`pFlags`]) & NamePowers[String.raw`verified`]) {
        document[String.raw`getElementById`](String.raw`showVerified`)[String.raw`classList`][String.raw`remove`](String.raw`hidden`);
      }
      this[String.raw`saveGeneralBtn`][String.raw`addEventListener`](String.raw`click`, this[String.raw`saveGeneralEvent`][String.raw`bind`](this));
      this[String.raw`saveAppearanceBtn`][String.raw`addEventListener`](String.raw`click`, this[String.raw`saveGeneralEvent`][String.raw`bind`](this));
    }
    [String.raw`saveGeneralEvent`](_0x298bba) {
      document[String.raw`querySelectorAll`](String.raw`[data-setting]`)[String.raw`forEach`](_0x1ccc1a => {
        if (String.raw`Stealth` == _0x1ccc1a[String.raw`dataset`][String.raw`setting`]) {
          this[String.raw`addMacro`](_0x1ccc1a[String.raw`dataset`][String.raw`setting`], _0x1ccc1a[String.raw`value`]);
        } else {
          this[String.raw`saveSetting`](_0x1ccc1a[String.raw`dataset`][String.raw`setting`], _0x1ccc1a[String.raw`value`]);
        }
        const _0x2c9c7f = parent[String.raw`document`][String.raw`getElementById`](String.raw`textEntryEditable`);
        if (String.raw`direction` == _0x1ccc1a[String.raw`dataset`][String.raw`setting`] && _0x2c9c7f) {
          _0x2c9c7f[String.raw`style`][String.raw`direction`] = _0x1ccc1a[String.raw`value`];
        }
        this[String.raw`toSave`] = this[String.raw`settingsSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
        this[String.raw`doReload`] = true;
      });
    }
    [String.raw`initNotificationsSetting`]() {
      var _0x21882b;
      var _0x3558ca;
      var _0x5c8009;
      this[String.raw`mainChat`] = document[String.raw`getElementById`](String.raw`mainchat`);
      this[String.raw`mentions`] = document[String.raw`getElementById`](String.raw`mentions`);
      this[String.raw`notifications`] = document[String.raw`getElementById`](String.raw`notifications`);
      this[String.raw`saveNotificationsBtn`] = document[String.raw`getElementById`](String.raw`saveNotificationsBtn`);
      this[String.raw`testNotif`] = document[String.raw`getElementById`](String.raw`testNotif`);
      this[String.raw`mainChat`][String.raw`value`] = ((_0x21882b = this[String.raw`Macros`]) == null ? undefined : _0x21882b[String.raw`notify`]) ?? "";
      this[String.raw`mentions`][String.raw`value`] = ((_0x3558ca = this[String.raw`Macros`]) == null ? undefined : _0x3558ca[String.raw`mentions`]) ?? "";
      this[String.raw`notifications`][String.raw`value`] = ((_0x5c8009 = this[String.raw`Settings`]) == null ? undefined : _0x5c8009[String.raw`notifications`]) || String.raw`enable`;
      this[String.raw`saveNotificationsBtn`][String.raw`addEventListener`](String.raw`click`, () => {
        var _0x12d154;
        var _0x2b5e29;
        var _0x4d0995;
        const _0x31ee08 = ((_0x12d154 = this[String.raw`Macros`]) == null ? undefined : _0x12d154[String.raw`notify`]) ?? "";
        const _0x363fd4 = ((_0x2b5e29 = this[String.raw`Macros`]) == null ? undefined : _0x2b5e29[String.raw`mentions`]) ?? "";
        if ((((_0x4d0995 = this[String.raw`Settings`]) == null ? undefined : _0x4d0995[String.raw`notifications`]) || String.raw`enable`) != this[String.raw`notifications`][String.raw`value`]) {
          this[String.raw`saveSetting`](String.raw`notifications`, this[String.raw`notifications`][String.raw`value`]);
        }
        if (_0x31ee08 != this[String.raw`mainChat`][String.raw`value`]) {
          this[String.raw`addMacro`](String.raw`notify`, this[String.raw`mainChat`][String.raw`value`]);
        }
        if (_0x363fd4 != this[String.raw`mentions`][String.raw`value`]) {
          this[String.raw`addMacro`](String.raw`mentions`, this[String.raw`RemoveHtmlEntities`](this[String.raw`mentions`][String.raw`value`])[String.raw`replace`](/ /g, ""));
        }
        this[String.raw`toSave`] = this[String.raw`settingsSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
        this[String.raw`doReload`] = true;
      });
      this[String.raw`testNotif`][String.raw`addEventListener`](String.raw`click`, settings[String.raw`sendTestNotification`]);
    }
    [String.raw`initMacrosSetting`]() {
      this[String.raw`addMacroBtn`] = document[String.raw`getElementById`](String.raw`addMacroBtn`);
      this[String.raw`macroNameInput`] = document[String.raw`getElementById`](String.raw`macroName`);
      this[String.raw`macroValueInput`] = document[String.raw`getElementById`](String.raw`macroValue`);
      [this[String.raw`macroNameInput`], this[String.raw`macroValueInput`]][String.raw`forEach`](_0x1c8503 => {
        _0x1c8503[String.raw`addEventListener`](String.raw`keyup`, () => {
          if (this[String.raw`macroNameInput`][String.raw`value`][String.raw`length`] && this[String.raw`macroValueInput`][String.raw`value`][String.raw`length`]) {
            this[String.raw`addMacroBtn`][String.raw`disabled`] = false;
          } else {
            this[String.raw`addMacroBtn`][String.raw`disabled`] = true;
          }
        });
      });
      this[String.raw`addMacroBtn`][String.raw`addEventListener`](String.raw`click`, () => {
        const _0x5bd646 = this[String.raw`RemoveHtmlEntities`](this[String.raw`macroNameInput`][String.raw`value`])[String.raw`replace`](/ /g, "");
        const _0x10a2f9 = this[String.raw`RemoveHtmlEntities`](this[String.raw`macroValueInput`][String.raw`value`]);
        if (_0x5bd646[String.raw`length`] && _0x10a2f9[String.raw`length`]) {
          const _0x343de6 = String.raw`4|6|1|7|0|8|3|9|5|2`[String.raw`split`]("|");
          let _0x5c3199 = 0;
          while (true) {
            switch (_0x343de6[_0x5c3199++]) {
              case "0":
                this[String.raw`Macros`][_0x5bd646] = _0x10a2f9;
                continue;
              case "1":
                if (!((_0x783a92 = Object[String.raw`keys`](this[String.raw`cleanMacrosObj`](this[String.raw`Macros`]))) == null ? undefined : _0x783a92[String.raw`length`])) {
                  this[String.raw`macrosContainer`][String.raw`innerHTML`] = "";
                }
                continue;
              case "2":
                this[String.raw`savingSnackbar`][String.raw`show`]();
                continue;
              case "3":
                this[String.raw`addMacroRow`](_0x5bd646, _0x10a2f9, this[String.raw`macroToEdit`]);
                continue;
              case "4":
                var _0x783a92;
                continue;
              case "5":
                this[String.raw`toSave`] = this[String.raw`macroSnackbar`];
                continue;
              case "6":
                this[String.raw`macroNameInput`][String.raw`value`] = "";
                this[String.raw`macroValueInput`][String.raw`value`] = "";
                if ([String.raw`Statusfx`, String.raw`Stealth`][String.raw`includes`](_0x5bd646)) {
                  return;
                }
                continue;
              case "7":
                this[String.raw`addMacro`](_0x5bd646, _0x10a2f9);
                continue;
              case "8":
                if (this[String.raw`macroToEdit`] != null) {
                  this[String.raw`removeMacro`](this[String.raw`macroToEdit`]);
                  this[String.raw`addMacroBtn`][String.raw`innerText`] = "";
                  addText(this[String.raw`addMacroBtn`], [String.raw`mob2.add`, String.raw`Add`]);
                }
                continue;
              case "9":
                this[String.raw`macroToEdit`] = null;
                continue;
            }
            break;
          }
        }
      });
    }
    [String.raw`setMacros`](_0x125c8f) {
      this[String.raw`Macros`] = JSON[String.raw`parse`](_0x125c8f);
    }
    [String.raw`addMacro`](_0x1d6a28, _0x4996be) {
      ;
      if (_0x1d6a28 == "zz") {
        _0x1d6a28 = _0x4996be = "";
      }
      const _0x1dc067 = {
        [String.raw`Type`]: String.raw`Macro`,
        [String.raw`Command`]: String.raw`Macro`,
        [String.raw`Name`]: _0x1d6a28,
        [String.raw`Value`]: _0x4996be
      };
      this[String.raw`sendApp`](_0x1dc067);
    }
    [String.raw`addMacroRow`](_0xb5c19f, _0x168a75, _0x534723 = false) {
      var _0x5aad76;
      var _0x28c526;
      var _0x548684;
      if (!this[String.raw`macrosTbody`] || !((_0x5aad76 = this[String.raw`macrosContainer`]) == null ? undefined : _0x5aad76[String.raw`innerHTML`])) {
        this[String.raw`addMacrosTable`]();
      }
      if ([String.raw`Statusfx`, String.raw`Stealth`][String.raw`includes`](_0xb5c19f)) {
        return;
      }
      const _0x4920fa = _0x534723 ? (_0x28c526 = this[String.raw`macrosTbody`]) == null ? undefined : _0x28c526[String.raw`querySelector`](String.raw`[data-id="` + _0x534723 + "\"]") : (_0x548684 = this[String.raw`macrosTbody`]) == null ? undefined : _0x548684[String.raw`querySelector`](String.raw`[data-id="` + _0xb5c19f + "\"]");
      if (_0x4920fa) {
        _0x4920fa[String.raw`querySelector`](String.raw`.macroName`)[String.raw`innerText`] = _0xb5c19f;
        _0x4920fa[String.raw`querySelector`](String.raw`.macroValue`)[String.raw`innerText`] = _0x168a75;
      } else {
        const _0x33bcf5 = makeElement(this[String.raw`macrosTbody`], "tr");
        _0x33bcf5[String.raw`setAttribute`](String.raw`data-id`, _0xb5c19f);
        animateFrom(_0x33bcf5, {
          opacity: 0,
          transform: String.raw`translateY(1rem)`,
          offset: 0
        }, {
          duration: 250,
          easing: String.raw`ease-in`
        });
        addText(makeElement(_0x33bcf5, "td", String.raw`macroName`), _0xb5c19f);
        addText(makeElement(_0x33bcf5, "td", String.raw`macroValue`), _0x168a75);
        const _0x5e77e2 = makeElement(makeElement(_0x33bcf5, "td"), String.raw`div`, String.raw`macroTools`);
        const _0x3f3a20 = makeElement(_0x5e77e2, String.raw`span`);
        _0x3f3a20[String.raw`setAttribute`](String.raw`data-edit`, _0xb5c19f);
        makeElement(_0x3f3a20, String.raw`img`)[String.raw`setAttribute`](String.raw`src`, String.raw`svg/pencil.svg`);
        const _0x280469 = makeElement(_0x5e77e2, String.raw`span`);
        _0x280469[String.raw`setAttribute`](String.raw`data-delete`, _0xb5c19f);
        makeElement(_0x280469, String.raw`img`)[String.raw`setAttribute`](String.raw`src`, String.raw`svg/xdelete.svg`);
        addToolTip(_0x3f3a20, [String.raw`mob2.editmacro`, String.raw`Edit Macro`]);
        addToolTip(_0x280469, [String.raw`mob2.deletemacro`, String.raw`Delete Macro`]);
        _0x280469[String.raw`addEventListener`](String.raw`click`, () => {
          animateTo(_0x33bcf5, [{
            opacity: 1,
            transform: String.raw`translateX(0rem)`
          }, {
            opacity: 0,
            transform: String.raw`translateX(10rem)`
          }], {
            duration: 300,
            easing: String.raw`ease-out`
          }, () => {
            var _0x206f88;
            if ((_0x206f88 = Object[String.raw`keys`](this[String.raw`cleanMacrosObj`](this[String.raw`Macros`]))) == null ? undefined : _0x206f88[String.raw`length`]) {
              _0x33bcf5[String.raw`remove`]();
            } else {
              this[String.raw`macrosContainer`][String.raw`innerHTML`] = "";
              this[String.raw`addAnimatedText`](makeElement(this[String.raw`macrosContainer`], "p"), [String.raw`mob2.nomacros`, String.raw`You haven't added any macro yet.`]);
            }
          });
          this[String.raw`removeMacro`](_0xb5c19f);
        });
        _0x3f3a20[String.raw`addEventListener`](String.raw`click`, () => {
          const _0x4e2ef1 = String.raw`1|0|3|2|4`[String.raw`split`]("|");
          let _0x58e804 = 0;
          while (true) {
            switch (_0x4e2ef1[_0x58e804++]) {
              case "0":
                addText(this[String.raw`addMacroBtn`], [String.raw`mob2.edit`, String.raw`Edit`]);
                continue;
              case "1":
                this[String.raw`addMacroBtn`][String.raw`innerText`] = "";
                continue;
              case "2":
                this[String.raw`macroNameInput`][String.raw`value`] = _0xb5c19f;
                continue;
              case "3":
                this[String.raw`macroToEdit`] = _0xb5c19f;
                continue;
              case "4":
                this[String.raw`macroValueInput`][String.raw`value`] = _0x168a75;
                continue;
            }
            break;
          }
        });
      }
      this[String.raw`macrosContainer`][String.raw`scrollTop`] = this[String.raw`macrosContainer`][String.raw`scrollHeight`];
    }
    [String.raw`removeMacro`](_0x45112f) {
      ;
      delete this[String.raw`Macros`][_0x45112f];
      const _0x3760c0 = {
        [String.raw`Type`]: String.raw`Macro`,
        [String.raw`Command`]: String.raw`Macro`,
        [String.raw`Name`]: _0x45112f,
        [String.raw`Value`]: ""
      };
      this[String.raw`sendApp`](_0x3760c0);
    }
    [String.raw`cleanMacrosObj`](_0x144a16) {
      ;
      ;
      ;
      const _0x3ce1bb = {
        ..._0x144a16
      };
      const _0x107886 = _0x3ce1bb;
      const _0x7aff5e = _0x107886;
      for (let _0x5603ae in _0x7aff5e) {
        if (!_0x7aff5e[_0x5603ae] || !![String.raw`sline`, String.raw`away`, String.raw`rapid`, String.raw`status`, String.raw`mentions`, String.raw`notify`, String.raw`Statusfx`, String.raw`Stealth`][String.raw`includes`](_0x5603ae)) {
          delete _0x7aff5e[_0x5603ae];
        }
      }
      return _0x7aff5e;
    }
    [String.raw`addMacrosTable`]() {
      const _0x29f31a = makeElement(this[String.raw`macrosContainer`], String.raw`table`);
      _0x29f31a[String.raw`setAttribute`](String.raw`class`, String.raw`xTable centered`);
      const _0x528a3c = makeElement(makeElement(_0x29f31a, String.raw`thead`), "tr");
      addText(makeElement(_0x528a3c, "th"), [String.raw`mob2.name`, String.raw`Name`]);
      addText(makeElement(_0x528a3c, "th"), [String.raw`mob2.value`, String.raw`Value`]);
      addText(makeElement(_0x528a3c, "th"), String.raw`&nbsp;`, true);
      this[String.raw`macrosTbody`] = makeElement(_0x29f31a, String.raw`tbody`);
    }
    [String.raw`updateMacrosTable`](_0x23ba15) {
      var _0x286602;
      _0x23ba15 ||= this[String.raw`Macros`];
      this[String.raw`macrosContainer`][String.raw`innerHTML`] = "";
      _0x23ba15 = this[String.raw`cleanMacrosObj`](_0x23ba15);
      if ((_0x286602 = Object[String.raw`keys`](_0x23ba15)) == null ? undefined : _0x286602[String.raw`length`]) {
        const _0x461a77 = Object[String.raw`keys`](_0x23ba15);
        for (let _0x95877d of _0x461a77) {
          this[String.raw`addMacroRow`](_0x95877d, _0x23ba15[_0x95877d]);
        }
      } else {
        this[String.raw`addAnimatedText`](makeElement(this[String.raw`macrosContainer`], "p"), [String.raw`mob2.nomacros`, String.raw`You haven't added any macro yet.`]);
      }
    }
    [String.raw`initPowersSetting`]() {
      var _0x2ef5f9;
      var _0xdef0c2;
      var _0x3e72a6;
      var _0x1c77b0;
      var _0x583475;
      var _0x31aa92;
      var _0x5d957d;
      var _0x288818;
      var _0x43494f;
      this[String.raw`away`] = document[String.raw`getElementById`](String.raw`away`);
      this[String.raw`statusfx`] = document[String.raw`getElementById`](String.raw`statusfx`);
      this[String.raw`statusSpeed`] = document[String.raw`getElementById`](String.raw`statusSpeed`);
      this[String.raw`status2`] = document[String.raw`getElementById`](String.raw`status2`);
      this[String.raw`waveFrequency`] = document[String.raw`getElementById`](String.raw`waveFrequency`);
      this[String.raw`gback`] = document[String.raw`getElementById`](String.raw`gback`);
      this[String.raw`stickers`] = document[String.raw`getElementById`](String.raw`stickers`);
      this[String.raw`xavi`] = document[String.raw`getElementById`](String.raw`xavi`);
      this[String.raw`rapidAction`] = document[String.raw`getElementById`](String.raw`rapidAction`);
      this[String.raw`rapidTime`] = document[String.raw`getElementById`](String.raw`rapidTime`);
      this[String.raw`rapidReason`] = document[String.raw`getElementById`](String.raw`rapidReason`);
      this[String.raw`sline`] = document[String.raw`getElementById`](String.raw`sline`);
      this[String.raw`goodfriend_all`] = document[String.raw`getElementById`](String.raw`goodfriend_all`);
      this[String.raw`goodfriend_list`] = document[String.raw`getElementById`](String.raw`goodfriend_list`);
      this[String.raw`savePowers`] = document[String.raw`getElementById`](String.raw`savePowers`);
      document[String.raw`querySelectorAll`](String.raw`[data-power]`)[String.raw`forEach`](_0x161bf4 => {
        const _0x185933 = _0x161bf4[String.raw`dataset`][String.raw`power`];
        if (!hasPower(_0x185933)) {
          _0x161bf4[String.raw`classList`][String.raw`add`](String.raw`disabled`);
        }
      });
      const _0x5ed3fb = hasPower(StatusfxId);
      StatusEffects[String.raw`forEach`](_0xf33f24 => {
        if (_0xf33f24[String.raw`set`] <= _0x5ed3fb) {
          const _0x20f9df = makeElement(this[String.raw`statusfx`], String.raw`option`);
          _0x20f9df[String.raw`value`] = _0xf33f24[String.raw`key`];
          _0x20f9df[String.raw`innerText`] = _0xf33f24[String.raw`name`];
        }
      });
      if ((_0x2ef5f9 = this[String.raw`Macros`]) == null ? undefined : _0x2ef5f9[String.raw`away`]) {
        away[String.raw`value`] = this[String.raw`Macros`][String.raw`away`];
      }
      if ((_0xdef0c2 = this[String.raw`Macros`]) == null ? undefined : _0xdef0c2[String.raw`sline`]) {
        sline[String.raw`value`] = this[String.raw`Macros`][String.raw`sline`][String.raw`replace`](/ /g, "");
      }
      if ((_0x3e72a6 = this[String.raw`Settings`]) == null ? undefined : _0x3e72a6[String.raw`xavi`]) {
        xavi[String.raw`value`] = this[String.raw`Settings`][String.raw`xavi`];
      }
      if ((_0x1c77b0 = this[String.raw`Settings`]) == null ? undefined : _0x1c77b0[String.raw`gback`]) {
        gback[String.raw`value`] = this[String.raw`Settings`][String.raw`gback`];
      }
      if ((_0x583475 = this[String.raw`Settings`]) == null ? undefined : _0x583475[String.raw`sticker`]) {
        sticker[String.raw`value`] = this[String.raw`Settings`][String.raw`sticker`];
      }
      if ((_0x31aa92 = this[String.raw`Settings`]) == null ? undefined : _0x31aa92[String.raw`goodfriends`]) {
        this[String.raw`goodfriend_list`][String.raw`value`] = this[String.raw`Settings`][String.raw`goodfriends`];
      }
      if ((_0x5d957d = this[String.raw`Settings`]) == null ? undefined : _0x5d957d[String.raw`goodfriends_all`]) {
        this[String.raw`goodfriend_all`][String.raw`value`] = this[String.raw`Settings`][String.raw`goodfriends_all`];
      }
      const _0x888bfc = () => {
        ;
        ;
        if ([String.raw`fadeout`, String.raw`scrollup`, String.raw`scrolldown`, String.raw`typing`][String.raw`includes`](this[String.raw`statusfx`][String.raw`value`])) {
          this[String.raw`status2`][String.raw`classList`][String.raw`remove`](String.raw`hidden`);
        } else {
          this[String.raw`status2`][String.raw`classList`][String.raw`add`](String.raw`hidden`);
        }
        if (String.raw`wave` == this[String.raw`statusfx`][String.raw`value`]) {
          this[String.raw`waveFrequency`][String.raw`classList`][String.raw`remove`](String.raw`hidden`);
        } else {
          this[String.raw`waveFrequency`][String.raw`classList`][String.raw`add`](String.raw`hidden`);
        }
      };
      const _0x2adf03 = makeElement(this[String.raw`statusfx`], String.raw`option`);
      _0x2adf03[String.raw`value`] = String.raw`noeffect`;
      _0x2adf03[String.raw`innerText`] = String.raw`No Effect`;
      this[String.raw`statusfx`][String.raw`value`] = String.raw`noeffect`;
      try {
        var _0x2ef1ef;
        if ((_0x2ef1ef = this[String.raw`Macros`]) == null ? undefined : _0x2ef1ef[String.raw`Statusfx`]) {
          let _0x271de1 = JSON[String.raw`parse`](decodeURIComponent(escape(atob(this[String.raw`Macros`][String.raw`Statusfx`][String.raw`replace`](/\s+/g, "")))));
          this[String.raw`status2`][String.raw`value`] = (_0x271de1 == null ? undefined : _0x271de1[String.raw`status2`]) || "";
          this[String.raw`statusfx`][String.raw`value`] = (_0x271de1 == null ? undefined : _0x271de1[String.raw`effect`]) || String.raw`noeffect`;
          this[String.raw`statusSpeed`][String.raw`value`] = Math[String.raw`max`](1, Math[String.raw`min`](6, (_0x271de1 == null ? undefined : _0x271de1[String.raw`speed`]) || 3));
          this[String.raw`waveFrequency`][String.raw`value`] = Math[String.raw`max`](1, Math[String.raw`min`](6, (_0x271de1 == null ? undefined : _0x271de1[String.raw`waveFrequency`]) || 3));
          _0x888bfc[String.raw`bind`](this)();
        }
      } catch (_0x449d02) {}
      addToolTip(this[String.raw`statusfx`], [String.raw`mob2.effect`, String.raw`Effect`]);
      addToolTip(this[String.raw`status2`], [String.raw`mob2.status2`, String.raw`Second Status`]);
      addToolTip(this[String.raw`statusSpeed`], [String.raw`mob2.statusspeed`, String.raw`Status Speed`]);
      addToolTip(this[String.raw`waveFrequency`], [String.raw`mob2.wavefrequency`, String.raw`Wave Frequency`]);
      this[String.raw`statusfx`][String.raw`addEventListener`](String.raw`change`, _0x888bfc[String.raw`bind`](this));
      if (hasPower(441)) {
        this[String.raw`rapidReason`][String.raw`disabled`] = false;
      }
      const _0x4b70d7 = (_0x288818 = this[String.raw`Macros`]) == null || (_0x43494f = _0x288818[String.raw`rapid`]) == null ? undefined : _0x43494f[String.raw`split`](",");
      var _0x4c839f;
      if (_0x4b70d7) {
        this[String.raw`rapidAction`][String.raw`value`] = _0x4b70d7[0];
        this[String.raw`rapidTime`][String.raw`value`] = _0x4b70d7[1] || 0;
        this[String.raw`rapidReason`][String.raw`value`] = ((_0x4c839f = _0x4b70d7[2]) == null ? undefined : _0x4c839f[String.raw`trim`]()) ?? "";
      }
      this[String.raw`savePowers`][String.raw`addEventListener`](String.raw`click`, _0x4ea388 => {
        var _0x8549b1;
        var _0x4d5ecf;
        var _0x4e3c62;
        var _0x1ea5a3;
        var _0x60c294;
        var _0x183f6c;
        if (xInt(this[String.raw`away`][String.raw`value`]) < 60) {
          this[String.raw`away`][String.raw`value`] = 60;
        } else if (xInt(this[String.raw`away`][String.raw`value`]) > 3600) {
          this[String.raw`away`][String.raw`value`] = 3600;
        }
        const _0x4ae1fa = this[String.raw`Macros`][String.raw`away`];
        const _0x4d951a = this[String.raw`away`][String.raw`value`];
        if (_0x4d951a != _0x4ae1fa && hasPower(144)) {
          this[String.raw`addMacro`](String.raw`away`, _0x4d951a);
        }
        const _0x1365b3 = {
          [String.raw`effect`]: this[String.raw`statusfx`][String.raw`value`]
        };
        _0x1365b3[String.raw`speed`] = Math[String.raw`max`](1, Math[String.raw`min`](6, this[String.raw`statusSpeed`][String.raw`value`]));
        _0x1365b3[String.raw`status2`] = this[String.raw`status2`][String.raw`value`] || "";
        _0x1365b3[String.raw`waveFrequency`] = Math[String.raw`max`](1, Math[String.raw`min`](6, this[String.raw`waveFrequency`][String.raw`value`]));
        const _0x32c61e = _0x1365b3;
        const _0x6b4d95 = btoa(unescape(encodeURIComponent(JSON[String.raw`stringify`](_0x32c61e))))[String.raw`replace`](/\s+/g, "");
        this[String.raw`addMacro`](String.raw`Statusfx`, _0x6b4d95);
        let _0x3bb7c4 = [];
        const _0x1c75eb = this[String.raw`Macros`][String.raw`rapid`];
        _0x3bb7c4[String.raw`push`](this[String.raw`rapidAction`][String.raw`value`] ?? "");
        _0x3bb7c4[String.raw`push`](this[String.raw`rapidTime`][String.raw`value`] || 0);
        if (hasPower(441)) {
          _0x3bb7c4[String.raw`push`](this[String.raw`rapidReason`][String.raw`value`][String.raw`replace`](/,/g, "")[String.raw`trim`]() ?? "");
        }
        _0x3bb7c4 = _0x3bb7c4[String.raw`join`](",");
        if (_0x3bb7c4 != _0x1c75eb && hasPower(91)) {
          this[String.raw`addMacro`](String.raw`rapid`, _0x3bb7c4);
        }
        const _0x173148 = (_0x8549b1 = Macros) == null ? undefined : _0x8549b1[String.raw`sline`];
        if (hasPower(452) && this[String.raw`sline`][String.raw`value`] != _0x173148) {
          this[String.raw`addMacro`](String.raw`sline`, sline[String.raw`value`][String.raw`replace`](/ /g, ""));
        }
        if (((_0x4d5ecf = Settings) == null ? undefined : _0x4d5ecf[String.raw`gback`]) != gback[String.raw`value`]) {
          saveSetting(String.raw`gback`, gback[String.raw`value`]);
        }
        if (((_0x4e3c62 = Settings) == null ? undefined : _0x4e3c62[String.raw`stickers`]) != stickers[String.raw`value`]) {
          saveSetting(String.raw`stickers`, stickers[String.raw`value`]);
        }
        if (((_0x1ea5a3 = Settings) == null ? undefined : _0x1ea5a3[String.raw`xavi`]) != xavi[String.raw`value`]) {
          saveSetting(String.raw`xavi`, xavi[String.raw`value`]);
        }
        if (((_0x60c294 = Settings) == null ? undefined : _0x60c294[String.raw`goodfriends_all`]) != this[String.raw`goodfriend_all`][String.raw`value`]) {
          saveSetting(String.raw`goodfriends_all`, this[String.raw`goodfriend_all`][String.raw`value`]);
        }
        if (((_0x183f6c = Settings) == null ? undefined : _0x183f6c[String.raw`goodfriends`]) != this[String.raw`goodfriend_list`][String.raw`value`]) {
          saveSetting(String.raw`goodfriends`, this[String.raw`goodfriend_list`][String.raw`value`]);
        }
        this[String.raw`toSave`] = this[String.raw`settingsSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
        this[String.raw`doReload`] = true;
      });
    }
    [String.raw`initTranslatorSetting`]() {
      var _0x4bf970;
      var _0xf3e72d;
      var _0x488fd6;
      this[String.raw`translatorMsg`][String.raw`style`][String.raw`display`] = String.raw`none`;
      this[String.raw`translatorContent`][String.raw`style`][String.raw`display`] = String.raw`block`;
      if (!this[String.raw`hasDays`]()) {
        this[String.raw`translatorMsg`][String.raw`innerHTML`] = "";
        this[String.raw`translatorMsg`][String.raw`style`][String.raw`display`] = String.raw`block`;
        this[String.raw`translatorContent`][String.raw`style`][String.raw`display`] = String.raw`none`;
        this[String.raw`addAnimatedText`](makeElement(this[String.raw`translatorMsg`], String.raw`span`, String.raw`noDays`), [String.raw`mob2.nodays`, String.raw`You need to have subscriber days to use this feature.`]);
        return;
      }
      this[String.raw`yourLang`] = document[String.raw`getElementById`](String.raw`yourLang`);
      this[String.raw`translateTo`] = document[String.raw`getElementById`](String.raw`translateTo`);
      this[String.raw`enableOnChat`] = document[String.raw`getElementById`](String.raw`enableOnChat`);
      this[String.raw`saveTranslator`] = document[String.raw`getElementById`](String.raw`saveTranslator`);
      this[String.raw`showTranslation`] = document[String.raw`getElementById`](String.raw`showTranslation`);
      this[String.raw`includeOriginalMsg`] = document[String.raw`getElementById`](String.raw`includeOriginalMsg`);
      for (const _0x4b1312 in this[String.raw`translatorLangs`]) {
        if (this[String.raw`translatorLangs`][String.raw`hasOwnProperty`](_0x4b1312)) {
          [this[String.raw`yourLang`], this[String.raw`translateTo`]][String.raw`forEach`](_0xf99cb3 => {
            const _0x1bf5b1 = makeElement(_0xf99cb3, String.raw`option`);
            _0x1bf5b1[String.raw`text`] = this[String.raw`translatorLangs`][_0x4b1312];
            _0x1bf5b1[String.raw`value`] = _0x4b1312;
          });
        }
      }
      const _0x3b867a = (_0x4bf970 = this[String.raw`Config`]) == null ? undefined : _0x4bf970[String.raw`chatid`];
      let _0xee94d1 = ((_0xf3e72d = this[String.raw`Settings`]) == null || (_0x488fd6 = _0xf3e72d[String.raw`translatorChats`]) == null ? undefined : _0x488fd6[String.raw`split`](",")) ?? [];
      this[String.raw`enableOnChat`][String.raw`checked`] = _0xee94d1[String.raw`includes`](_0x3b867a);
      this[String.raw`translateTo`][String.raw`value`] = this[String.raw`Settings`][String.raw`speakin`] ?? "";
      this[String.raw`yourLang`][String.raw`value`] = this[String.raw`Settings`][String.raw`yourlang`] ?? "";
      this[String.raw`showTranslation`][String.raw`value`] = this[String.raw`Settings`][String.raw`showTranslation`] || String.raw`both`;
      this[String.raw`includeOriginalMsg`][String.raw`checked`] = String.raw`off` != this[String.raw`Settings`][String.raw`includeOriginalMsg`];
      this[String.raw`saveTranslator`][String.raw`addEventListener`](String.raw`click`, _0x5c48a8 => {
        const _0x5ef9af = String.raw`1|5|0|4|2|3|6|7`[String.raw`split`]("|");
        let _0x4e0f2b = 0;
        while (true) {
          switch (_0x5ef9af[_0x4e0f2b++]) {
            case "0":
              saveSetting(String.raw`showTranslation`, this[String.raw`showTranslation`][String.raw`value`]);
              continue;
            case "1":
              saveSetting(String.raw`speakin`, this[String.raw`translateTo`][String.raw`value`]);
              continue;
            case "2":
              if (!this[String.raw`enableOnChat`][String.raw`checked`] && _0xee94d1[String.raw`includes`](_0x3b867a)) {
                _0xee94d1 = _0xee94d1[String.raw`filter`](_0x489617 => _0x489617 != _0x3b867a);
              } else if (this[String.raw`enableOnChat`][String.raw`checked`] && !_0xee94d1[String.raw`includes`](_0x3b867a)) {
                _0xee94d1[String.raw`push`](_0x3b867a);
              }
              continue;
            case "3":
              saveSetting(String.raw`translatorChats`, _0xee94d1[String.raw`join`](","));
              continue;
            case "4":
              saveSetting(String.raw`includeOriginalMsg`, this[String.raw`includeOriginalMsg`][String.raw`checked`] ? "on" : String.raw`off`);
              continue;
            case "5":
              saveSetting(String.raw`yourlang`, this[String.raw`yourLang`][String.raw`value`]);
              continue;
            case "6":
              this[String.raw`toSave`] = this[String.raw`translatorSnackbar`];
              continue;
            case "7":
              this[String.raw`savingSnackbar`][String.raw`show`]();
              continue;
          }
          break;
        }
      });
    }
    [String.raw`initKeywordsSetting`]() {
      this[String.raw`keywordsList`][String.raw`innerHTML`] = "";
      if (this[String.raw`hasMarkPower`]()) {
        const _0x4712df = {
          [String.raw`palette`]: true,
          [String.raw`preview`]: true,
          [String.raw`opacity`]: true,
          [String.raw`hue`]: true
        };
        parent[String.raw`keywordSortable`] = true;
        new Sortable(this[String.raw`keywordsList`], null, _0x3d0922 => {
          if (this[String.raw`deleteKeyword`][String.raw`classList`][String.raw`contains`](String.raw`active`)) {
            this[String.raw`keywords`] = this[String.raw`keywords`][String.raw`filter`](_0x75b526 => _0x75b526.id != _0x3d0922.id);
            this[String.raw`saveSetting`](String.raw`marks`, JSON[String.raw`stringify`](this[String.raw`keywords`]));
            animateTo(_0x3d0922, {
              opacity: 0,
              transform: String.raw`translateY(10rem)`,
              fill: String.raw`forwards`
            }, {
              duration: 400,
              easing: String.raw`ease-out`
            }, () => {
              var _0x2af07a;
              _0x3d0922[String.raw`remove`]();
              if (!((_0x2af07a = this[String.raw`keywords`]) == null ? undefined : _0x2af07a[String.raw`length`])) {
                this[String.raw`addAnimatedText`](this[String.raw`keywordsList`], [String.raw`mob2.nokeywords`, String.raw`You haven't added any keyword yet.`]);
              }
            });
            this[String.raw`keywordToEdit`] = null;
          } else if (this[String.raw`editKeyword`][String.raw`classList`][String.raw`contains`](String.raw`active`) && _0x3d0922) {
            const _0x3d7e96 = this[String.raw`keywords`][String.raw`filter`](_0x1537ea => _0x1537ea.id == _0x3d0922.id)[0];
            const _0x5f1127 = _0x3d7e96[String.raw`color`] || this[String.raw`defaultKeywordColor`];
            this[String.raw`keywordColor`][String.raw`setColor`](_0x5f1127);
            this[String.raw`addKeywordBtn`][String.raw`disabled`] = false;
            this[String.raw`keywordNameInput`][String.raw`value`] = _0x3d7e96[String.raw`name`];
            this[String.raw`keywordNameInput`][String.raw`focus`]();
            this[String.raw`keywordNameInput`][String.raw`style`][String.raw`background`] = _0x5f1127;
            this[String.raw`keywordNameInput`][String.raw`style`][String.raw`color`] = isColorLight(_0x5f1127) ? String.raw`#000` : String.raw`#FFF`;
            this[String.raw`keywordToEdit`] = _0x3d7e96.id;
          }
        }, this[String.raw`editKeyword`], this[String.raw`deleteKeyword`]);
      } else {
        this[String.raw`addAnimatedText`](this[String.raw`keywordsList`], [String.raw`mob2.needpower`, String.raw`You need $1 power to use this feature.`, String.raw`Mark`]);
      }
    }
    [String.raw`addKeywordEvent`]() {
      var _0x1b66f3;
      var _0x1ced74;
      const _0x3cd00f = Math[String.raw`random`]()[String.raw`toString`](36)[String.raw`substr`](2, 9);
      const _0x562c7c = ((_0x1b66f3 = this[String.raw`keywordColor`]) == null ? undefined : _0x1b66f3[String.raw`getColor`]()[String.raw`toHEXA`]()[String.raw`toString`]()) || this[String.raw`defaultCategoryColor`];
      const _0x2cec10 = this[String.raw`RemoveHtmlEntities`]((_0x1ced74 = this[String.raw`keywordNameInput`]) == null ? undefined : _0x1ced74[String.raw`value`])[String.raw`substr`](0, 20)[String.raw`replace`](/\"/g, "")[String.raw`replace`](/ /g, "");
      if (this[String.raw`keywordToEdit`]) {
        var _0xcc8c0d;
        var _0x4248d2;
        if (!_0x2cec10) {
          return;
        }
        const _0x4b56c2 = this[String.raw`keywords`][String.raw`filter`](_0x410a79 => _0x410a79.id == this[String.raw`keywordToEdit`])[0];
        _0x4b56c2[String.raw`name`] = _0x2cec10;
        _0x4b56c2[String.raw`color`] = _0x562c7c;
        this[String.raw`keywordNameInput`][String.raw`value`] = "";
        this[String.raw`keywordNameInput`][String.raw`style`][String.raw`color`] = String.raw`#000`;
        this[String.raw`keywordNameInput`][String.raw`style`][String.raw`background`] = String.raw`#FFF`;
        this[String.raw`friendsCategories`] = null;
        if (this[String.raw`Settings`][String.raw`friendskeywords`]) {
          this[String.raw`friendsCategories`] = JSON[String.raw`parse`](this[String.raw`Settings`][String.raw`friendskeywords`][String.raw`replace`](/”/g, "\""));
        }
        const _0x30034e = (_0xcc8c0d = this[String.raw`friendsCategories`]) == null ? undefined : _0xcc8c0d[String.raw`filter`](_0x69a62c => _0x69a62c.id == this[String.raw`keywordToEdit`]);
        this[String.raw`friendsCategories`] = (_0x4248d2 = this[String.raw`friendsCategories`]) == null ? undefined : _0x4248d2[String.raw`filter`](_0x505f8f => _0x505f8f.id != this[String.raw`keywordToEdit`]);
        if (_0x30034e != null) {
          _0x30034e[String.raw`forEach`](_0xab446b => {
            this[String.raw`friendsCategories`][String.raw`push`]({
              user: _0xab446b[String.raw`user`],
              name: _0x2cec10,
              id: this[String.raw`keywordToEdit`]
            });
          });
        }
        const _0x2fa991 = document[String.raw`getElementById`](this[String.raw`keywordToEdit`]);
        _0x2fa991[String.raw`classList`][String.raw`remove`](String.raw`editActive`);
        _0x2fa991[String.raw`innerText`] = _0x2cec10;
        _0x2fa991[String.raw`style`][String.raw`backgroundColor`] = _0x562c7c;
        _0x2fa991[String.raw`style`][String.raw`color`] = isColorLight(_0x562c7c) ? String.raw`#000` : String.raw`#FFF`;
        this[String.raw`keywordToEdit`] = null;
        saveSetting(String.raw`marks`, JSON[String.raw`stringify`](this[String.raw`keywords`]));
        this[String.raw`toSave`] = this[String.raw`keywordEditedSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
      } else if (_0x2cec10[String.raw`length`]) {
        this[String.raw`addKeywordBtn`][String.raw`disabled`] = false;
        this[String.raw`keywordNameInput`][String.raw`value`] = "";
        this[String.raw`keywordNameInput`][String.raw`style`][String.raw`color`] = String.raw`#000`;
        this[String.raw`keywordNameInput`][String.raw`style`][String.raw`background`] = String.raw`#FFF`;
        this[String.raw`addKeywordItem`](_0x3cd00f, _0x2cec10, _0x562c7c);
        const _0x1b7412 = {
          [String.raw`name`]: _0x2cec10,
          id: _0x3cd00f,
          [String.raw`color`]: _0x562c7c
        };
        this[String.raw`keywords`][String.raw`push`](_0x1b7412);
        this[String.raw`saveSetting`](String.raw`marks`, JSON[String.raw`stringify`](this[String.raw`keywords`]));
        this[String.raw`toSave`] = this[String.raw`keywordAddedSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
      }
    }
    [String.raw`updateKeywords`]() {
      ;
      var _0x45b0ea;
      var _0x2b8fad;
      if (!((_0x45b0ea = this[String.raw`keywordsList`]) == null ? undefined : _0x45b0ea[String.raw`innerHTML`])) {
        if (this[String.raw`hasMarkPower`]()) {
          if (this[String.raw`Settings`][String.raw`marks`]) {
            this[String.raw`keywords`] = JSON[String.raw`parse`](this[String.raw`Settings`][String.raw`marks`][String.raw`replace`](/”/g, "\""));
          }
          if ((_0x2b8fad = this[String.raw`keywords`]) == null ? undefined : _0x2b8fad[String.raw`length`]) {
            this[String.raw`keywords`][String.raw`forEach`](_0x3cef21 => this[String.raw`addKeywordItem`](_0x3cef21.id, _0x3cef21[String.raw`name`], _0x3cef21[String.raw`color`]));
          } else {
            this[String.raw`addAnimatedText`](this[String.raw`keywordsList`], [String.raw`mob2.nokeywords`, String.raw`You haven't added any keyword yet.`]);
          }
        } else {
          this[String.raw`addAnimatedText`](this[String.raw`keywordsList`], [String.raw`mob2.needpower`, String.raw`You need $1 power to use this feature.`, String.raw`Mark`]);
        }
      }
    }
    [String.raw`hasMarkPower`]() {
      return hasPower(462);
    }
    [String.raw`addKeywordItem`](_0x59e7d0, _0x4c97e4, _0x5857dd) {
      var _0x25a3f1;
      if (!((_0x25a3f1 = this[String.raw`keywords`]) == null ? undefined : _0x25a3f1[String.raw`length`])) {
        this[String.raw`keywordsList`][String.raw`innerHTML`] = "";
      }
      const _0x330e74 = makeElement(this[String.raw`keywordsList`], "li", String.raw`keyword`, _0x59e7d0);
      animateFrom(_0x330e74, {
        opacity: 0,
        transform: String.raw`translateX(10rem)`
      }, {
        duration: 400,
        easing: String.raw`ease-in`
      });
      _0x330e74[String.raw`style`][String.raw`backgroundColor`] = _0x5857dd;
      _0x330e74[String.raw`style`][String.raw`color`] = isColorLight(_0x5857dd) ? String.raw`#000` : String.raw`#FFF`;
      _0x330e74[String.raw`innerHTML`] = _0x4c97e4;
      return _0x330e74;
    }
    [String.raw`initCategoriesSetting`]() {
      var _0x349c97;
      this[String.raw`categoriesList`][String.raw`innerHTML`] = "";
      if (this[String.raw`hasCategoryPower`]()) {
        const _0x58d3b2 = {
          [String.raw`palette`]: true,
          [String.raw`preview`]: true,
          [String.raw`opacity`]: true,
          [String.raw`hue`]: true
        };
        this[String.raw`addCategoryBtn`] = document[String.raw`getElementById`](String.raw`addCategory`);
        this[String.raw`categoryNameInput`] = document[String.raw`getElementById`](String.raw`categoryName`);
        this[String.raw`editCategory`] = document[String.raw`getElementById`](String.raw`editCategory`);
        this[String.raw`deleteCategory`] = document[String.raw`getElementById`](String.raw`deleteCategory`);
        this[String.raw`categoryNameInput`][String.raw`addEventListener`](String.raw`keyup`, () => {
          const _0x4acdd7 = {};
          ;
          if (this[String.raw`categoryNameInput`][String.raw`value`][String.raw`length`]) {
            this[String.raw`addCategoryBtn`][String.raw`disabled`] = false;
          } else {
            this[String.raw`addCategoryBtn`][String.raw`disabled`] = true;
          }
        });
        this[String.raw`categoryColor`] = Pickr[String.raw`create`]({
          el: String.raw`#categoryColor`,
          default: this[String.raw`defaultCategoryColor`],
          preview: true,
          useAsButton: true,
          closeOnScroll: true,
          lockOpacity: true,
          components: _0x58d3b2
        });
        this[String.raw`categoryColor`].on(String.raw`change`, _0x491042 => {
          const _0x19446e = _0x491042[String.raw`toHEXA`]()[String.raw`toString`]();
          this[String.raw`categoryNameInput`][String.raw`style`][String.raw`background`] = _0x19446e;
          this[String.raw`categoryNameInput`][String.raw`style`][String.raw`color`] = isColorLight(_0x19446e) ? String.raw`#000` : String.raw`#FFF`;
        });
        this[String.raw`addCategoryBtn`][String.raw`addEventListener`](String.raw`click`, this[String.raw`addCategoryEvent`][String.raw`bind`](this));
        if (!((_0x349c97 = parent) == null ? undefined : _0x349c97[String.raw`categorySortable`])) {
          parent[String.raw`categorySortable`] = true;
          new Sortable(this[String.raw`categoriesList`], this[String.raw`updateCategories`][String.raw`bind`](this), _0x2c58bc => {
            if (this[String.raw`deleteCategory`][String.raw`classList`][String.raw`contains`](String.raw`active`)) {
              var _0x1ca57f;
              var _0x2d4e31;
              this[String.raw`categories`] = this[String.raw`categories`][String.raw`filter`](_0x525948 => _0x525948.id != _0x2c58bc.id);
              if (this[String.raw`friendsCategories`]) {
                this[String.raw`friendsCategories`] = JSON[String.raw`parse`]((_0x1ca57f = this[String.raw`Settings`]) == null || (_0x2d4e31 = _0x1ca57f[String.raw`friendscategories`]) == null ? undefined : _0x2d4e31[String.raw`replace`](/”/g, "\""));
                this[String.raw`friendsCategories`] = this[String.raw`friendsCategories`][String.raw`filter`](_0x1dbf4f => _0x1dbf4f.id != _0x2c58bc.id);
              }
              this[String.raw`saveSetting`](String.raw`categories`, JSON[String.raw`stringify`](this[String.raw`categories`]));
              this[String.raw`saveSetting`](String.raw`friendscategories`, JSON[String.raw`stringify`](this[String.raw`friendsCategories`]));
              animateTo(_0x2c58bc, {
                opacity: 0,
                transform: String.raw`translateY(10rem)`,
                fill: String.raw`forwards`
              }, {
                duration: 400,
                easing: String.raw`ease-out`
              }, () => {
                var _0x5bcc19;
                _0x2c58bc[String.raw`remove`]();
                if (!((_0x5bcc19 = this[String.raw`categories`]) == null ? undefined : _0x5bcc19[String.raw`length`])) {
                  this[String.raw`addAnimatedText`](this[String.raw`categoriesList`], [String.raw`mob2.nocategories`, String.raw`You haven't added any category yet.`]);
                }
              });
              this[String.raw`categoryToEdit`] = null;
            } else if (this[String.raw`editCategory`][String.raw`classList`][String.raw`contains`](String.raw`active`) && _0x2c58bc) {
              const _0x232490 = this[String.raw`categories`][String.raw`filter`](_0x40eec5 => _0x40eec5.id == _0x2c58bc.id)[0];
              const _0x355075 = _0x232490[String.raw`color`] || this[String.raw`defaultCategoryColor`];
              this[String.raw`categoryColor`][String.raw`setColor`](_0x355075);
              this[String.raw`addCategoryBtn`][String.raw`disabled`] = false;
              this[String.raw`categoryNameInput`][String.raw`value`] = _0x232490[String.raw`name`];
              this[String.raw`categoryNameInput`][String.raw`focus`]();
              this[String.raw`categoryNameInput`][String.raw`style`][String.raw`background`] = _0x355075;
              this[String.raw`categoryNameInput`][String.raw`style`][String.raw`color`] = isColorLight(_0x355075) ? String.raw`#000` : String.raw`#FFF`;
              this[String.raw`categoryToEdit`] = _0x232490.id;
            }
          }, this[String.raw`editCategory`], this[String.raw`deleteCategory`]);
        }
      } else {
        this[String.raw`addAnimatedText`](this[String.raw`categoriesList`], [String.raw`mob2.needpower`, String.raw`You need $1 power to use this feature.`, String.raw`Category`]);
      }
    }
    [String.raw`addCategoryEvent`]() {
      var _0x2cb596;
      var _0x340436;
      const _0x4d0871 = Math[String.raw`random`]()[String.raw`toString`](36)[String.raw`substr`](2, 9);
      const _0x460228 = ((_0x2cb596 = this[String.raw`categoryColor`]) == null ? undefined : _0x2cb596[String.raw`getColor`]()[String.raw`toHEXA`]()[String.raw`toString`]()) || this[String.raw`defaultCategoryColor`];
      const _0x2ff038 = this[String.raw`RemoveHtmlEntities`]((_0x340436 = this[String.raw`categoryNameInput`]) == null ? undefined : _0x340436[String.raw`value`]);
      if (this[String.raw`categoryToEdit`]) {
        var _0x7c7eae;
        var _0x1520e8;
        if (!_0x2ff038) {
          return;
        }
        const _0x2feb7a = this[String.raw`categories`][String.raw`filter`](_0x34a863 => _0x34a863.id == this[String.raw`categoryToEdit`])[0];
        _0x2feb7a[String.raw`name`] = _0x2ff038;
        _0x2feb7a[String.raw`color`] = _0x460228;
        this[String.raw`categoryNameInput`][String.raw`value`] = "";
        this[String.raw`categoryNameInput`][String.raw`style`][String.raw`color`] = String.raw`#000`;
        this[String.raw`categoryNameInput`][String.raw`style`][String.raw`background`] = String.raw`#FFF`;
        this[String.raw`friendsCategories`] = null;
        if (this[String.raw`Settings`][String.raw`friendscategories`]) {
          this[String.raw`friendsCategories`] = JSON[String.raw`parse`](this[String.raw`Settings`][String.raw`friendscategories`][String.raw`replace`](/”/g, "\""));
        }
        const _0x3ce4c0 = (_0x7c7eae = this[String.raw`friendsCategories`]) == null ? undefined : _0x7c7eae[String.raw`filter`](_0x5d7433 => _0x5d7433.id == this[String.raw`categoryToEdit`]);
        this[String.raw`friendsCategories`] = (_0x1520e8 = this[String.raw`friendsCategories`]) == null ? undefined : _0x1520e8[String.raw`filter`](_0x5a63be => _0x5a63be.id != this[String.raw`categoryToEdit`]);
        if (_0x3ce4c0 != null) {
          _0x3ce4c0[String.raw`forEach`](_0x169973 => {
            this[String.raw`friendsCategories`][String.raw`push`]({
              user: _0x169973[String.raw`user`],
              name: _0x2ff038,
              id: this[String.raw`categoryToEdit`]
            });
          });
        }
        const _0x3e6983 = document[String.raw`getElementById`](this[String.raw`categoryToEdit`]);
        _0x3e6983[String.raw`classList`][String.raw`remove`](String.raw`editActive`);
        _0x3e6983[String.raw`innerText`] = _0x2ff038;
        _0x3e6983[String.raw`style`][String.raw`backgroundColor`] = _0x460228;
        _0x3e6983[String.raw`style`][String.raw`color`] = isColorLight(_0x460228) ? String.raw`#000` : String.raw`#FFF`;
        this[String.raw`categoryToEdit`] = null;
        saveSetting(String.raw`categories`, JSON[String.raw`stringify`](this[String.raw`categories`]));
        saveSetting(String.raw`friendscategories`, JSON[String.raw`stringify`](this[String.raw`friendsCategories`]));
        this[String.raw`toSave`] = this[String.raw`categoryEditedSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
      } else if (_0x2ff038[String.raw`length`]) {
        this[String.raw`addCategoryBtn`][String.raw`disabled`] = false;
        this[String.raw`categoryNameInput`][String.raw`value`] = "";
        this[String.raw`categoryNameInput`][String.raw`style`][String.raw`color`] = String.raw`#000`;
        this[String.raw`categoryNameInput`][String.raw`style`][String.raw`background`] = String.raw`#FFF`;
        this[String.raw`addCategoryItem`](_0x4d0871, _0x2ff038, _0x460228);
        const _0x3f958d = {
          [String.raw`name`]: _0x2ff038,
          id: _0x4d0871,
          [String.raw`color`]: _0x460228
        };
        this[String.raw`categories`][String.raw`push`](_0x3f958d);
        this[String.raw`saveSetting`](String.raw`categories`, JSON[String.raw`stringify`](this[String.raw`categories`]));
        this[String.raw`toSave`] = this[String.raw`categoryAddedSnackbar`];
        this[String.raw`savingSnackbar`][String.raw`show`]();
      }
    }
    [String.raw`updateCategories`](_0xf5fc44) {
      var _0x23935a;
      var _0x9868e0;
      if (!((_0x23935a = this[String.raw`categoriesList`]) == null ? undefined : _0x23935a[String.raw`innerHTML`])) {
        if (this[String.raw`hasCategoryPower`]()) {
          if ((_0x9868e0 = _0xf5fc44) == null ? undefined : _0x9868e0[String.raw`length`]) {
            _0xf5fc44 = _0xf5fc44[String.raw`split`](":");
            this[String.raw`categories`][String.raw`sort`]((_0x3c723e, _0x2579dc) => _0xf5fc44[String.raw`indexOf`](_0x3c723e.id) - _0xf5fc44[String.raw`indexOf`](_0x2579dc.id));
            saveSetting(String.raw`categories`, JSON[String.raw`stringify`](this[String.raw`categories`]));
          } else {
            var _0x355657;
            if (this[String.raw`Settings`][String.raw`categories`]) {
              this[String.raw`categories`] = JSON[String.raw`parse`](this[String.raw`Settings`][String.raw`categories`][String.raw`replace`](/”/g, "\""));
            }
            if ((_0x355657 = this[String.raw`categories`]) == null ? undefined : _0x355657[String.raw`length`]) {
              this[String.raw`categories`][String.raw`forEach`](_0x29334a => this[String.raw`addCategoryItem`](_0x29334a.id, _0x29334a[String.raw`name`], _0x29334a[String.raw`color`]));
            } else {
              this[String.raw`addAnimatedText`](this[String.raw`categoriesList`], [String.raw`mob2.nocategories`, String.raw`You haven't added any category yet.`]);
            }
          }
        } else {
          this[String.raw`addAnimatedText`](this[String.raw`categoriesList`], [String.raw`mob2.needpower`, String.raw`You need $1 power to use this feature.`, String.raw`Category`]);
        }
      }
    }
    [String.raw`hasCategoryPower`]() {
      ;
      var _0x10dd00;
      return ((_0x10dd00 = this[String.raw`Config`]) == null ? undefined : _0x10dd00[String.raw`pFlags`]) & NamePowers[String.raw`category`];
    }
    [String.raw`addCategoryItem`](_0x3115af, _0x93a252, _0x5eb0df) {
      var _0x2c3874;
      if (!((_0x2c3874 = this[String.raw`categories`]) == null ? undefined : _0x2c3874[String.raw`length`])) {
        this[String.raw`categoriesList`][String.raw`innerHTML`] = "";
      }
      const _0x4cf00b = makeElement(this[String.raw`categoriesList`], "li", String.raw`category`, _0x3115af);
      animateFrom(_0x4cf00b, {
        opacity: 0,
        transform: String.raw`translateX(10rem)`
      }, {
        duration: 400,
        easing: String.raw`ease-in`
      });
      _0x4cf00b[String.raw`style`][String.raw`backgroundColor`] = _0x5eb0df;
      _0x4cf00b[String.raw`style`][String.raw`color`] = isColorLight(_0x5eb0df) ? String.raw`#000` : String.raw`#FFF`;
      _0x4cf00b[String.raw`innerHTML`] = _0x93a252;
      return _0x4cf00b;
    }
    [String.raw`initAboutSetting`]() {
      ;
      var _0x243ae1;
      document[String.raw`getElementById`](String.raw`versionNumber`)[String.raw`innerText`] = (_0x243ae1 = this[String.raw`Config`]) == null ? undefined : _0x243ae1[String.raw`Version`];
    }
    [String.raw`hasDays`]() {
      ;
      var _0x4a1dae;
      return !!(((_0x4a1dae = this[String.raw`Config`]) == null ? undefined : _0x4a1dae[String.raw`pFlags`]) & NamePowers[String.raw`hasdays`]);
    }
    [String.raw`addAnimatedText`](_0x2c8c9c, _0x27a6ff) {
      const _0x16f456 = makeElement(_0x2c8c9c, String.raw`span`);
      const _0x64f6bb = {
        [String.raw`opacity`]: 0
      };
      addText(_0x16f456, _0x27a6ff);
      animateFrom(_0x16f456, _0x64f6bb, {
        duration: 250,
        easing: String.raw`ease-in-out`
      });
      return _0x16f456;
    }
    [String.raw`saveSetting`](_0x22a94b, _0x4ffc3a) {
      ;
      const _0x1b13e6 = {
        [String.raw`Type`]: String.raw`Setting`,
        [String.raw`Command`]: String.raw`Setting`,
        [String.raw`Name`]: _0x22a94b,
        [String.raw`Value`]: _0x4ffc3a
      };
      this[String.raw`sendApp`](_0x1b13e6);
    }
    [String.raw`sendApp`](_0x41b59a) {
      _0x41b59a[String.raw`Page`] = String.raw`settings`;
      ToC(_0x41b59a);
    }
    [String.raw`refresh`]() {
      parent[String.raw`parent`][String.raw`location`][String.raw`href`] = parent[String.raw`parent`][String.raw`location`][String.raw`href`];
    }
    [String.raw`RemoveHtmlEntities`](_0x254d08) {
      return String(_0x254d08)[String.raw`replace`](/&/g, String.raw`&amp;`)[String.raw`replace`](/</g, String.raw`&lt;`)[String.raw`replace`](/>/g, String.raw`&gt;`)[String.raw`replace`](/"/g, String.raw`&quot;`);
    }
    [String.raw`hideSettigs`]() {
      window[String.raw`parent`][String.raw`setFrameVis`]();
    }
    [String.raw`doTab`](_0x26862d) {
      ;
      ;
      ;
      var _0x214b3a;
      if ((_0x214b3a = document[String.raw`querySelector`](String.raw`[data-target="` + _0x26862d + "\"]")) != null) {
        _0x214b3a[String.raw`click`]();
      }
    }
    [String.raw`doSave`]() {
      setTimeout(() => {
        ;
        var _0x1a0fe3;
        this[String.raw`savingSnackbar`][String.raw`hide`]();
        if ((_0x1a0fe3 = this[String.raw`toSave`]) != null) {
          _0x1a0fe3[String.raw`show`]();
        }
        this[String.raw`toSave`] = null;
      }, 2500);
    }
    [String.raw`sendTestNotification`]() {
      ;
      ;
      if (xrRoot[String.raw`notify`][String.raw`compatible`]()) {
        xrRoot[String.raw`notify`][String.raw`authorize`]();
      }
      xrRoot[String.raw`notify`][String.raw`show`](String.raw`Hello from ixat`, String.raw`This is a test notification for you and Sam`);
    }
  }
  var settings = xrRoot[String.raw`settings`] = new SettingsPage();
  class Sortable {
    constructor(_0x3c5c60, _0x559565, _0x4df658, _0x293794, _0x35ab71) {
      ;
      ;
      ;
      const _0x28758b = String.raw`1|6|13|11|22|9|0|19|12|20|16|10|7|17|18|5|8|4|15|3|2|21|14`[String.raw`split`]("|");
      let _0x23114f = 0;
      while (true) {
        switch (_0x28758b[_0x23114f++]) {
          case "0":
            this[String.raw`_isTouch`] = false;
            continue;
          case "1":
            this[String.raw`_container`] = _0x3c5c60;
            continue;
          case "2":
            window[String.raw`addEventListener`](String.raw`touchstart`, this[String.raw`_onPressTouch`][String.raw`bind`](this), false);
            continue;
          case "3":
            window[String.raw`addEventListener`](String.raw`mousemove`, this[String.raw`_onMove`][String.raw`bind`](this), true);
            continue;
          case "4":
            window[String.raw`addEventListener`](String.raw`mousedown`, this[String.raw`_onPress`][String.raw`bind`](this), true);
            continue;
          case "5":
            this[String.raw`editBtn`] = _0x293794;
            continue;
          case "6":
            this[String.raw`_clickItem`] = null;
            continue;
          case "7":
            this[String.raw`_touchduration`] = 500;
            continue;
          case "8":
            this[String.raw`deleteBtn`] = _0x35ab71;
            continue;
          case "9":
            this[String.raw`_click`] = {};
            continue;
          case "10":
            this[String.raw`_timer`];
            continue;
          case "11":
            this[String.raw`_hovItem`] = null;
            continue;
          case "12":
            this[String.raw`_onSwap`] = _0x559565;
            continue;
          case "13":
            this[String.raw`_dragItem`] = null;
            continue;
          case "14":
            window[String.raw`addEventListener`](String.raw`touchend`, this[String.raw`_onRelease`][String.raw`bind`](this), false);
            continue;
          case "15":
            window[String.raw`addEventListener`](String.raw`mouseup`, this[String.raw`_onRelease`][String.raw`bind`](this), true);
            continue;
          case "16":
            this[String.raw`serialized`] = "";
            continue;
          case "17":
            this[String.raw`_container`][String.raw`setAttribute`](String.raw`data-is-sortable`, 1);
            continue;
          case "18":
            this[String.raw`_container`][String.raw`style`][String.raw`position`] = String.raw`static`;
            continue;
          case "19":
            this[String.raw`_dragging`] = false;
            continue;
          case "20":
            this[String.raw`_onReleaseUp`] = _0x4df658;
            continue;
          case "21":
            window[String.raw`addEventListener`](String.raw`touchmove`, this[String.raw`_onMove`][String.raw`bind`](this), false);
            continue;
          case "22":
            this[String.raw`_sortLists`] = [];
            continue;
        }
        break;
      }
    }
    [String.raw`getPoint`](_0xfb3496) {
      ;
      ;
      ;
      let _0x51d99e = null;
      let _0x56b032 = null;
      const _0x435909 = Math[String.raw`max`](0, window[String.raw`pageXOffset`] || document[String.raw`documentElement`][String.raw`scrollLeft`] || document[String.raw`body`][String.raw`scrollLeft`] || 0) - (document[String.raw`documentElement`][String.raw`clientLeft`] || 0);
      const _0x4d68f2 = Math[String.raw`max`](0, window[String.raw`pageYOffset`] || document[String.raw`documentElement`][String.raw`scrollTop`] || document[String.raw`body`][String.raw`scrollTop`] || 0) - (document[String.raw`documentElement`][String.raw`clientTop`] || 0);
      if (this[String.raw`_isTouch`]) {
        const _0x2d3512 = _0xfb3496 !== undefined && _0xfb3496[String.raw`targetTouches`] !== undefined ? _0xfb3496[String.raw`targetTouches`][0] : {};
        _0x51d99e = _0x2d3512 ? Math[String.raw`max`](0, _0x2d3512[String.raw`pageX`] || _0x2d3512[String.raw`clientX`] || 0) - _0x435909 : 0;
        _0x56b032 = _0x2d3512 ? Math[String.raw`max`](0, _0x2d3512[String.raw`pageY`] || _0x2d3512[String.raw`clientY`] || 0) - _0x4d68f2 : 0;
      } else {
        _0x51d99e = _0xfb3496 ? Math[String.raw`max`](0, _0xfb3496[String.raw`pageX`] || _0xfb3496[String.raw`clientX`] || 0) - _0x435909 : 0;
        _0x56b032 = _0xfb3496 ? Math[String.raw`max`](0, _0xfb3496[String.raw`pageY`] || _0xfb3496[String.raw`clientY`] || 0) - _0x4d68f2 : 0;
      }
      const _0x5d7482 = {
        x: _0x51d99e,
        y: _0x56b032
      };
      return _0x5d7482;
    }
    [String.raw`toArray`](_0x1aeb9a) {
      _0x1aeb9a = _0x1aeb9a ?? "id";
      const _0x49e200 = [];
      let _0x12174a = null;
      let _0xd5bd9d = "";
      for (let _0x2ca998 = 0; _0x2ca998 < this[String.raw`_container`][String.raw`children`][String.raw`length`]; ++_0x2ca998) {
        _0x12174a = this[String.raw`_container`][String.raw`children`][_0x2ca998];
        _0xd5bd9d = _0x12174a[String.raw`getAttribute`](_0x1aeb9a) || "";
        _0x49e200[String.raw`push`](_0xd5bd9d);
      }
      return _0x49e200;
    }
    [String.raw`toString`](_0x2fe14e, _0x17d30c) {
      ;
      _0x17d30c = _0x17d30c ?? ":";
      return this[String.raw`toArray`](_0x2fe14e)[String.raw`join`](_0x17d30c);
    }
    [String.raw`_isOnTop`](_0x5643cc, _0x553fa3, _0xd3430b) {
      ;
      ;
      ;
      const _0x9a0ca0 = _0x5643cc[String.raw`getBoundingClientRect`]();
      const _0x489ed8 = _0x553fa3 > _0x9a0ca0[String.raw`left`] && _0x553fa3 < _0x9a0ca0[String.raw`left`] + _0x9a0ca0[String.raw`width`];
      const _0x56ec46 = _0xd3430b > _0x9a0ca0[String.raw`top`] && _0xd3430b < _0x9a0ca0[String.raw`top`] + _0x9a0ca0[String.raw`height`];
      return function (_0x50efaa, _0x11be43) {
        return _0x50efaa && _0x11be43;
      }(_0x489ed8, _0x56ec46);
    }
    [String.raw`_itemClass`](_0x14670c, _0x2fdfdf, _0xb80a55) {
      ;
      ;
      const _0x306263 = _0x14670c[String.raw`className`][String.raw`split`](/\s+/);
      const _0xebfcfe = _0x306263[String.raw`indexOf`](_0xb80a55);
      if (String.raw`add` === _0x2fdfdf && _0xebfcfe == -1) {
        _0x306263[String.raw`push`](_0xb80a55);
        _0x14670c[String.raw`className`] = _0x306263[String.raw`join`](" ");
      } else if (String.raw`remove` === _0x2fdfdf && _0xebfcfe != -1) {
        _0x306263[String.raw`splice`](_0xebfcfe, 1);
        _0x14670c[String.raw`className`] = _0x306263[String.raw`join`](" ");
      }
    }
    [String.raw`_swapItems`](_0x49a9ea, _0x440772) {
      const _0xdeaef6 = _0x49a9ea[String.raw`parentNode`];
      const _0x3857a4 = _0x440772[String.raw`parentNode`];
      if (_0xdeaef6 !== _0x3857a4) {
        _0x3857a4[String.raw`insertBefore`](_0x49a9ea, _0x440772);
      } else {
        const _0x47575e = document[String.raw`createElement`](String.raw`div`);
        _0xdeaef6[String.raw`insertBefore`](_0x47575e, _0x49a9ea);
        _0x3857a4[String.raw`insertBefore`](_0x49a9ea, _0x440772);
        _0xdeaef6[String.raw`insertBefore`](_0x440772, _0x47575e);
        _0xdeaef6[String.raw`removeChild`](_0x47575e);
      }
    }
    [String.raw`_moveItem`](_0x49dbf6, _0xbdda50, _0x4a7ce3) {
      ;
      ;
      ;
      _0x49dbf6[String.raw`style`][String.raw`-webkit-transform`] = String.raw`translateX( ` + _0xbdda50 + String.raw`px ) translateY( ` + _0x4a7ce3 + String.raw`px )`;
      _0x49dbf6[String.raw`style`][String.raw`-moz-transform`] = String.raw`translateX( ` + _0xbdda50 + String.raw`px ) translateY( ` + _0x4a7ce3 + String.raw`px )`;
      _0x49dbf6[String.raw`style`][String.raw`-ms-transform`] = String.raw`translateX( ` + _0xbdda50 + String.raw`px ) translateY( ` + _0x4a7ce3 + String.raw`px )`;
      _0x49dbf6[String.raw`style`][String.raw`transform`] = String.raw`translateX( ` + _0xbdda50 + String.raw`px ) translateY( ` + _0x4a7ce3 + String.raw`px )`;
    }
    [String.raw`_makeDragItem`](_0xb0edc5) {
      ;
      ;
      ;
      ;
      const _0x14fd12 = String.raw`7|10|0|2|13|11|1|3|6|4|8|9|5|12`[String.raw`split`]("|");
      let _0x224f21 = 0;
      while (true) {
        switch (_0x14fd12[_0x224f21++]) {
          case "0":
            this[String.raw`_clickItem`] = _0xb0edc5;
            continue;
          case "1":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`color`] = this[String.raw`_clickItem`][String.raw`style`][String.raw`color`];
            continue;
          case "2":
            this[String.raw`_itemClass`](this[String.raw`_clickItem`], String.raw`add`, String.raw`dragActive`);
            continue;
          case "3":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`backgroundColor`] = this[String.raw`_clickItem`][String.raw`style`][String.raw`backgroundColor`];
            continue;
          case "4":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`position`] = String.raw`absolute`;
            continue;
          case "5":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`top`] = (_0xb0edc5[String.raw`offsetTop`] || 0) + "px";
            continue;
          case "6":
            this[String.raw`_dragItem`][String.raw`innerHTML`] = _0xb0edc5[String.raw`innerHTML`];
            continue;
          case "7":
            this[String.raw`_trashDragItem`]();
            continue;
          case "8":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`z-index`] = String.raw`999`;
            continue;
          case "9":
            this[String.raw`_dragItem`][String.raw`style`][String.raw`left`] = (_0xb0edc5[String.raw`offsetLeft`] || 0) + "px";
            continue;
          case "10":
            this[String.raw`_sortLists`] = document[String.raw`querySelectorAll`](String.raw`[data-is-sortable]`);
            continue;
          case "11":
            this[String.raw`_dragItem`][String.raw`className`] += this[String.raw`_clickItem`][String.raw`className`] + String.raw` dragging`;
            continue;
          case "12":
            this[String.raw`_container`][String.raw`appendChild`](this[String.raw`_dragItem`]);
            continue;
          case "13":
            this[String.raw`_dragItem`] = document[String.raw`createElement`](_0xb0edc5[String.raw`tagName`]);
            continue;
        }
        break;
      }
    }
    [String.raw`_trashDragItem`]() {
      ;
      ;
      ;
      if (this[String.raw`_dragItem`] && this[String.raw`_clickItem`]) {
        this[String.raw`_itemClass`](this[String.raw`_clickItem`], String.raw`remove`, String.raw`dragActive`);
        this[String.raw`_itemClass`](this[String.raw`_clickItem`], String.raw`remove`, String.raw`dragRemove`);
        this[String.raw`_clickItem`] = null;
        this[String.raw`_dragItem`][String.raw`remove`]();
        this[String.raw`_dragItem`] = null;
        this[String.raw`editBtn`][String.raw`parentNode`][String.raw`classList`][String.raw`add`](String.raw`hidden`);
      }
    }
    [String.raw`_onPress`](_0x878fb6) {
      ;
      ;
      var _0x2f62b9;
      if ((_0x878fb6 == null || (_0x2f62b9 = _0x878fb6[String.raw`target`]) == null ? undefined : _0x2f62b9[String.raw`parentNode`]) === this[String.raw`_container`]) {
        _0x878fb6[String.raw`preventDefault`]();
        this[String.raw`_dragging`] = true;
        this[String.raw`_isTouch`] = false;
        this[String.raw`_click`] = this[String.raw`getPoint`](_0x878fb6);
        this[String.raw`_makeDragItem`](_0x878fb6[String.raw`target`]);
        this[String.raw`_onMove`](_0x878fb6);
      }
    }
    [String.raw`_onPressTouch`](_0x3b65e6) {
      var _0xad5770;
      if ((_0x3b65e6 == null || (_0xad5770 = _0x3b65e6[String.raw`target`]) == null ? undefined : _0xad5770[String.raw`parentNode`]) === this[String.raw`_container`]) {
        if (!this[String.raw`_timer`]) {
          this[String.raw`_timer`] = setTimeout(() => {
            const _0xc7a264 = String.raw`4|1|2|3|5|6|0`[String.raw`split`]("|");
            let _0xccd3f7 = 0;
            while (true) {
              switch (_0xc7a264[_0xccd3f7++]) {
                case "0":
                  _0x3b65e6[String.raw`preventDefault`]();
                  continue;
                case "1":
                  this[String.raw`_dragging`] = true;
                  continue;
                case "2":
                  this[String.raw`_isTouch`] = true;
                  continue;
                case "3":
                  this[String.raw`_click`] = this[String.raw`getPoint`](_0x3b65e6);
                  continue;
                case "4":
                  this[String.raw`_imer`] = null;
                  continue;
                case "5":
                  this[String.raw`_makeDragItem`](_0x3b65e6[String.raw`targetTouches`][0][String.raw`target`]);
                  continue;
                case "6":
                  this[String.raw`_onMove`](_0x3b65e6);
                  continue;
              }
              break;
            }
          }, this[String.raw`_touchduration`]);
        }
      }
    }
    [String.raw`_onRelease`](_0x4d56cc) {
      if (this[String.raw`_dragging`]) {
        this[String.raw`_dragging`] = false;
        this[String.raw`_onReleaseUp`](this[String.raw`_clickItem`]);
        this[String.raw`_trashDragItem`]();
        if (this[String.raw`serialized`][String.raw`length`]) {
          if (this[String.raw`serialized`] != this[String.raw`toString`]()) {
            this[String.raw`serialized`] = this[String.raw`toString`]();
            if (this[String.raw`_onSwap`]) {
              this[String.raw`_onSwap`](this[String.raw`serialized`]);
            }
          }
        } else {
          this[String.raw`serialized`] = this[String.raw`toString`]();
        }
        if (this[String.raw`_timer`]) {
          clearTimeout(this[String.raw`_timer`]);
          this[String.raw`_timer`] = null;
        }
      }
    }
    [String.raw`_onMove`](_0x3cb300) {
      if (this[String.raw`_timer`]) {
        clearTimeout(this[String.raw`_timer`]);
        this[String.raw`_timer`] = null;
      }
      if (this[String.raw`_dragItem`] && this[String.raw`_dragging`]) {
        const _0x227179 = this[String.raw`getPoint`](_0x3cb300);
        let _0x24c3f5 = this[String.raw`_container`];
        this[String.raw`editBtn`][String.raw`parentNode`][String.raw`classList`][String.raw`remove`](String.raw`hidden`);
        this[String.raw`_moveItem`](this[String.raw`_dragItem`], _0x227179.x - this[String.raw`_click`].x, _0x227179.y - this[String.raw`_click`].y);
        for (let _0x2c56c4 = 0; _0x2c56c4 < this[String.raw`_sortLists`][String.raw`length`]; ++_0x2c56c4) {
          const _0x368d8f = this[String.raw`_sortLists`][_0x2c56c4];
          if (this[String.raw`_isOnTop`](_0x368d8f, _0x227179.x, _0x227179.y)) {
            _0x24c3f5 = _0x368d8f;
          }
        }
        if (this[String.raw`_isOnTop`](_0x24c3f5, _0x227179.x, _0x227179.y) && _0x24c3f5[String.raw`children`][String.raw`length`] === 0) {
          _0x24c3f5[String.raw`appendChild`](this[String.raw`_clickItem`]);
          return;
        }
        for (let _0x253df1 = 0; _0x253df1 < _0x24c3f5[String.raw`children`][String.raw`length`]; ++_0x253df1) {
          let _0x10d77a = _0x24c3f5[String.raw`children`][_0x253df1];
          if (_0x10d77a !== this[String.raw`_clickItem`] && _0x10d77a !== this[String.raw`_dragItem`] && this[String.raw`_isOnTop`](_0x10d77a, _0x227179.x, _0x227179.y)) {
            this[String.raw`_hovItem`] = _0x10d77a;
            if (this[String.raw`_onSwap`]) {
              this[String.raw`_swapItems`](this[String.raw`_clickItem`], _0x10d77a);
            }
          }
        }
        if (this[String.raw`_isOnTop`](this[String.raw`deleteBtn`], _0x227179.x, _0x227179.y)) {
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`add`](String.raw`deleteActive`);
          this[String.raw`deleteBtn`][String.raw`classList`][String.raw`add`](String.raw`active`);
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`remove`](String.raw`editActive`);
          this[String.raw`editBtn`][String.raw`classList`][String.raw`remove`](String.raw`active`);
        } else if (this[String.raw`_isOnTop`](this[String.raw`editBtn`], _0x227179.x, _0x227179.y)) {
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`add`](String.raw`editActive`);
          this[String.raw`editBtn`][String.raw`classList`][String.raw`add`](String.raw`active`);
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`remove`](String.raw`deleteActive`);
          this[String.raw`deleteBtn`][String.raw`classList`][String.raw`remove`](String.raw`active`);
        } else {
          this[String.raw`editBtn`][String.raw`classList`][String.raw`remove`](String.raw`active`);
          this[String.raw`deleteBtn`][String.raw`classList`][String.raw`remove`](String.raw`active`);
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`remove`](String.raw`editActive`);
          this[String.raw`_clickItem`][String.raw`classList`][String.raw`remove`](String.raw`deleteActive`);
        }
      }
    }
  }
  function _0x11e2(_0x2a1f47, _0x23ba54) {
    const _0x21e7de = _0x67aa();
    _0x11e2 = function (_0x4f7e3d, _0x97b8e5) {
      _0x4f7e3d = _0x4f7e3d - 318;
      let _0x41f420 = _0x21e7de[_0x4f7e3d];
      if (_0x11e2.jwNlCp === undefined) {
        function _0x4148a2(_0x261b75) {
          const _0xd57ab7 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
          let _0x5a8852 = "";
          let _0x341fc6 = "";
          let _0x105e84 = _0x5a8852 + _0x4148a2;
          for (let _0x3fbc4c = 0, _0x7b9ca3, _0x4a5cbf, _0x385141 = 0; _0x4a5cbf = _0x261b75.charAt(_0x385141++); ~_0x4a5cbf && (_0x7b9ca3 = _0x3fbc4c % 4 ? _0x7b9ca3 * 64 + _0x4a5cbf : _0x4a5cbf, _0x3fbc4c++ % 4) ? _0x5a8852 += _0x105e84.charCodeAt(_0x385141 + 10) - 10 !== 0 ? String.fromCharCode(_0x7b9ca3 >> (_0x3fbc4c * -2 & 6) & 255) : _0x3fbc4c : 0) {
            _0x4a5cbf = _0xd57ab7.indexOf(_0x4a5cbf);
          }
          for (let _0x4f52b2 = 0, _0xb74f88 = _0x5a8852.length; _0x4f52b2 < _0xb74f88; _0x4f52b2++) {
            _0x341fc6 += "%" + ("00" + _0x5a8852.charCodeAt(_0x4f52b2).toString(16)).slice(-2);
          }
          return decodeURIComponent(_0x341fc6);
        }
        const _0x773d19 = function (_0x526a52, _0xaf894d) {
          let _0x22f77f = [];
          let _0x2fc1db = 0;
          let _0x16e66c;
          let _0x58e96c = "";
          _0x526a52 = _0x4148a2(_0x526a52);
          let _0x28bc23;
          for (_0x28bc23 = 0; _0x28bc23 < 256; _0x28bc23++) {
            _0x22f77f[_0x28bc23] = _0x28bc23;
          }
          for (_0x28bc23 = 0; _0x28bc23 < 256; _0x28bc23++) {
            _0x2fc1db = (_0x2fc1db + _0x22f77f[_0x28bc23] + _0xaf894d.charCodeAt(_0x28bc23 % _0xaf894d.length)) % 256;
            _0x16e66c = _0x22f77f[_0x28bc23];
            _0x22f77f[_0x28bc23] = _0x22f77f[_0x2fc1db];
            _0x22f77f[_0x2fc1db] = _0x16e66c;
          }
          _0x28bc23 = 0;
          _0x2fc1db = 0;
          for (let _0x5d91c3 = 0; _0x5d91c3 < _0x526a52.length; _0x5d91c3++) {
            _0x28bc23 = (_0x28bc23 + 1) % 256;
            _0x2fc1db = (_0x2fc1db + _0x22f77f[_0x28bc23]) % 256;
            _0x16e66c = _0x22f77f[_0x28bc23];
            _0x22f77f[_0x28bc23] = _0x22f77f[_0x2fc1db];
            _0x22f77f[_0x2fc1db] = _0x16e66c;
            _0x58e96c += String.fromCharCode(_0x526a52.charCodeAt(_0x5d91c3) ^ _0x22f77f[(_0x22f77f[_0x28bc23] + _0x22f77f[_0x2fc1db]) % 256]);
          }
          return _0x58e96c;
        };
        _0x11e2.YSVcTI = _0x773d19;
        _0x2a1f47 = arguments;
        _0x11e2.jwNlCp = true;
      }
      const _0x41b8cb = _0x21e7de[0];
      const _0x479e46 = _0x4f7e3d + _0x41b8cb;
      const _0x56941b = _0x2a1f47[_0x479e46];
      if (!_0x56941b) {
        if (_0x11e2.bOIpad === undefined) {
          const _0x4955dc = function (_0x1c0d4c) {
            this.jszJZq = _0x1c0d4c;
            this.CQzgMV = [1, 0, 0];
            this.BnuEnD = function () {
              return "newState";
            };
            this.JLonWN = "\\w+ *\\(\\) *{\\w+ *";
            this.Wmuycj = "['|\"].+['|\"];? *}";
          };
          _0x4955dc.prototype.tWpKsF = function () {
            const _0x3dbbeb = new RegExp(this.JLonWN + this.Wmuycj);
            const _0x23dcf8 = _0x3dbbeb.test(this.BnuEnD.toString()) ? --this.CQzgMV[1] : --this.CQzgMV[0];
            return this.OpReUn(_0x23dcf8);
          };
          _0x4955dc.prototype.OpReUn = function (_0x4791ca) {
            if (!Boolean(~_0x4791ca)) {
              return _0x4791ca;
            }
            return this.SnRUJC(this.jszJZq);
          };
          _0x4955dc.prototype.SnRUJC = function (_0x4a50db) {
            for (let _0x344f69 = 0, _0x9e728f = this.CQzgMV.length; _0x344f69 < _0x9e728f; _0x344f69++) {
              this.CQzgMV.push(Math.round(Math.random()));
              _0x9e728f = this.CQzgMV.length;
            }
            return _0x4a50db(this.CQzgMV[0]);
          };
          new _0x4955dc(_0x11e2).tWpKsF();
          _0x11e2.bOIpad = true;
        }
        _0x41f420 = _0x11e2.YSVcTI(_0x41f420, _0x97b8e5);
        _0x2a1f47[_0x479e46] = _0x41f420;
      } else {
        _0x41f420 = _0x56941b;
      }
      return _0x41f420;
    };
    return _0x11e2(_0x2a1f47, _0x23ba54);
  }
  if (hasDarkMode()) {
    document[String.raw`querySelector`](String.raw`.wrapper`)[String.raw`classList`][String.raw`add`](String.raw`darkWrapper`);
  }
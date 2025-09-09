'use strict';

isWEB = true;
var selector = new function () {
  if (!xrRoot[String.raw`xrClassic`]) {
    const powersScroll = document[String.raw`querySelector`](String.raw`.powersScroll`);
    if (powersScroll) {
      powersScroll[String.raw`style`][String.raw`height`] = String.raw`78%`;
    }
  }
  const _0x3ac778 = {
    [String.raw`rrh`]: ["wa", "wb", "ww", "wt", "wh", "ws", "wg", "wm"]
  };
  const _0x1e09d1 = {
    [String.raw`vthrow`]: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"],
    [String.raw`vkiss`]: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"],
    [String.raw`vrain`]: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"]
  };
  const _0x2c87ae = {
    [String.raw`candyfx`]: ["wc", "ws", "we", "wb", "wd", "wg", "wx", "ww"]
  };
  const _0x896045 = {
    [String.raw`lovespring`]: ["wb", "wu", "wf", "wr", "ws", "wx"]
  };
  const _0x85b662 = {};
  const _0x5214fd = {};
  _0x85b662[String.raw`gesture`] = "wb";
  _0x85b662[String.raw`glasses`] = "w1";
  _0x85b662[String.raw`samba`] = "w1";
  _0x85b662[String.raw`acting`] = _0x3ac778;
  _0x85b662[String.raw`easterland`] = _0x5214fd;
  _0x85b662[String.raw`valfx`] = _0x1e09d1;
  _0x85b662[String.raw`allhallows`] = _0x2c87ae;
  _0x85b662[String.raw`lovespring`] = _0x896045;
  let _0x345588 = 0;
  let _0x43782e = null;
  let _0x45c84f = String.raw`Powers`;
  let _0x4c2dce = _0x85b662;
  ThisPage = String.raw`selector`;
  const _0x3f16ff = document[String.raw`querySelector`](String.raw`#goBack`);
  setdarkmode();
  if (!parent[String.raw`Classic`] && _0x3f16ff) {
    _0x3f16ff[String.raw`className`] = String.raw`gobackMob`;
  }
  let _0x122f47 = false;
  var _0x1fc003;
  var _0x242350;
  this[String.raw`DoLoginEtc`] = function (_0x809a00) {
    const _0x436adb = {
      [String.raw`LoginRegEtc`]: 1
    };
    let _0x35bce3 = _0x436adb;
    _0x35bce3[_0x809a00] = 1;
    selector[String.raw`clear`](_0x35bce3);
    xrRoot[String.raw`LoginBodge`] = false;
    parent[String.raw`removeClass`](String.raw`d-none`, String.raw`selectorFrame`);
    _0x59b3a3(getById(_0x809a00)[String.raw`childNodes`][1][String.raw`innerText`]);
    if (!_0x122f47) {
      selector[String.raw`addLoginListerners`]();
      _0x122f47 = true;
    }
    if (String.raw`AreYouABot` == _0x809a00) {
      addClass(String.raw`d-none`, String.raw`captchaErr`);
      _0x172df9(true, String.raw`loader`);
      if (xrRoot[String.raw`xrClassic`]) {
        selector[String.raw`isCaptcha`] = true;
        parent[String.raw`classicSetDialog`](String.raw`selector`, 0);
        let _0x3b1123 = parent[String.raw`document`][String.raw`querySelector`](String.raw`.dialogBody`);
        if (_0x3b1123) {
          _0x3b1123[String.raw`style`][String.raw`cssText`] = String.raw`height: 40%;`;
        }
        let _0x3077ae = parent[String.raw`document`][String.raw`querySelector`](String.raw`.modalDialogContentClassic`);
        if (_0x3077ae) {
          _0x3077ae[String.raw`style`][String.raw`top`] = String.raw`85px`;
        }
        parent[String.raw`ConnectingClose`]();
      }
      selector[String.raw`loadCaptcha`]();
      setTimeout(selector[String.raw`sendCaptcha`], 1000);
    }
    if (String.raw`LoginForm` == _0x809a00 && xrRoot[String.raw`xrPWAinstall`]()) {
      removeClass(String.raw`d-none`, String.raw`installpwa`);
    }
    TranslateAll();
  };
  this[String.raw`DoLoginMessage`] = function (_0xf46b05) {
    let _0x264ec2 = clearDiv(String.raw`loginErr`);
    addText(_0x264ec2, _0xf46b05);
    xrRoot[String.raw`removeClass`](String.raw`d-none`, String.raw`Overlays`);
  };
  this[String.raw`LoginCancel`] = function () {
    modalClose();
    if (NotLoggedIn) {
      selector[String.raw`doLoginDialog`]();
    }
  };
  this[String.raw`Logout`] = function () {
    localStorage[String.raw`clear`]();
    let _0x3a9a73 = parent;
    if (_0x3a9a73[String.raw`parent`]) {
      _0x3a9a73 = _0x3a9a73[String.raw`parent`];
    }
    _0x3a9a73[String.raw`location`][String.raw`reload`]();
  };
  this[String.raw`Login`] = function () {
    var _0x3741f2 = document[String.raw`getElementById`](String.raw`openModal`);
    if (_0x3741f2) {
      _0x3741f2[String.raw`style`][String.raw`visibility`] = String.raw`hidden`;
    }
    let _0x414e22 = document[String.raw`querySelector`](String.raw`#loginErr`);
    if (_0x414e22) {
      _0x414e22[String.raw`innerHTML`] = "";
    }
    const _0x3eb55b = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`Login`
    };
    var _0x48e9ec = _0x3eb55b;
    _0x48e9ec[String.raw`Username`] = document[String.raw`getElementById`](String.raw`lusername`)[String.raw`value`];
    _0x48e9ec[String.raw`Password`] = document[String.raw`getElementById`](String.raw`lpassword`)[String.raw`value`];
    if (FillInAll(_0x48e9ec, [String.raw`Username`, String.raw`Password`], _0x414e22)) {
      ToC(_0x48e9ec);
      xrRoot[String.raw`LoginBodge`] = true;
      let _0x1c7f3e = xrRoot[String.raw`getById`](String.raw`Overlays`);
      addClass(String.raw`d-none`, 0, _0x1c7f3e);
    }
    return false;
  };
  var _0x56b5e6 = /[^0-9A-Za-z]/g;
  var _0x19e88a = /[^0-9A-Za-z\.\-@_]/g;
  this[String.raw`Register`] = function () {
    let _0x85800d = document[String.raw`querySelector`](String.raw`#registerErr`);
    if (_0x85800d) {
      _0x85800d[String.raw`innerHTML`] = "";
    }
    const _0x46798e = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`Register`
    };
    var _0x2c8e6d = _0x46798e;
    _0x2c8e6d[String.raw`Username`] = document[String.raw`getElementById`](String.raw`rusername`)[String.raw`value`];
    _0x1fc003 = _0x2c8e6d[String.raw`Password1`] = document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`value`];
    _0x242350 = _0x2c8e6d[String.raw`Email`] = document[String.raw`getElementById`](String.raw`remail`)[String.raw`value`];
    if (FillInAll(_0x2c8e6d, [String.raw`Username`, String.raw`Password1`, String.raw`Email`], _0x85800d)) {
      _0x2c8e6d[String.raw`g-recaptcha-response`] = selector[String.raw`getCaptchaResponse`]();
      ToC(_0x2c8e6d);
    }
    return false;
  };
  this[String.raw`forgotPass`] = function (_0x1b68ec) {
    let _0x20c19e;
    let _0x32fb8b = document[String.raw`querySelector`](String.raw`#lostErr`);
    if (_0x32fb8b) {
      _0x32fb8b[String.raw`innerHTML`] = "";
      _0x32fb8b[String.raw`style`][String.raw`color`] = String.raw`red`;
    }
    selector[String.raw`loadCaptcha`]();
    let _0x1e67b9 = document[String.raw`getElementById`](String.raw`lusername`);
    _0x1e67b9 ||= document[String.raw`getElementById`](String.raw`lemail`);
    _0x1e67b9 &&= _0x1e67b9[String.raw`value`][String.raw`toLowerCase`]();
    if (_0x1b68ec) {
      _0x20c19e = _0x1b68ec;
    }
    xrRoot[String.raw`removeClass`](String.raw`d-none`, String.raw`Overlays`);
    if (_0x1b68ec && _0x1b68ec[String.raw`charAt`](0) == "{") {
      let _0x3b1897 = JSON[String.raw`parse`](_0x1b68ec);
      if (_0x3b1897[String.raw`html`]) {
        if (_0x32fb8b) {
          _0x32fb8b[String.raw`style`][String.raw`color`] = String.raw`green`;
        }
        addText(_0x32fb8b, _0x3b1897[String.raw`html`], true);
        return;
      }
      _0x20c19e = "";
    }
    selector[String.raw`DoLoginEtc`](String.raw`ResetPassword`);
    if (_0x20c19e) {
      addText(_0x32fb8b, _0x20c19e, true);
    }
    if (_0x1e67b9) {
      document[String.raw`getElementById`](String.raw`lemail`)[String.raw`value`] = _0x1e67b9;
    }
  };
  this[String.raw`ResetPassword`] = function () {
    let _0x5a9955 = document[String.raw`querySelector`](String.raw`#lostErr`);
    if (_0x5a9955) {
      _0x5a9955[String.raw`innerHTML`] = "";
    }
    selector[String.raw`loadCaptcha`]();
    const _0x49db7c = {
      [String.raw`Page`]: String.raw`profile`,
      [String.raw`Command`]: String.raw`ResetPassword`
    };
    var _0x4d7576 = _0x49db7c;
    _0x242350 = _0x4d7576[String.raw`Email`] = document[String.raw`getElementById`](String.raw`lemail`)[String.raw`value`][String.raw`toLowerCase`]();
    if (FillInAll(_0x4d7576, [String.raw`Email`], _0x5a9955)) {
      _0x4d7576[String.raw`g-recaptcha-response`] = selector[String.raw`getCaptchaResponse`]();
      ToC(_0x4d7576);
    }
    return false;
  };
  this[String.raw`RegisterError`] = function (_0x5ebeb) {
    let _0x1e6d9e = document[String.raw`querySelector`](String.raw`#registerErr`);
    if (_0x1e6d9e) {
      _0x1e6d9e[String.raw`innerHTML`] = "";
      _0x1e6d9e[String.raw`style`][String.raw`color`] = String.raw`red`;
    }
    selector[String.raw`loadCaptcha`]();
    xrRoot[String.raw`removeClass`](String.raw`d-none`, String.raw`Overlays`);
    if (_0x5ebeb[String.raw`charAt`](0) == "{") {
      let _0x1ff237 = JSON[String.raw`parse`](_0x5ebeb);
      if (_0x1e6d9e) {
        addText(_0x1e6d9e, _0x1ff237[String.raw`html`], true);
        _0x1e6d9e[String.raw`style`][String.raw`color`] = String.raw`green`;
      }
      _0x1ff237[String.raw`html`] = "";
      _0x1ff237[String.raw`Page`] = String.raw`profile`;
      _0x1ff237[String.raw`Command`] = String.raw`SetUserId`;
      ToC(_0x1ff237);
    } else {
      addText(_0x1e6d9e, _0x5ebeb, true);
    }
  };
  this[String.raw`doRegisterDialog`] = function (_0x57357f) {
    selector[String.raw`DoLoginEtc`](String.raw`RegisterDialog`);
    selector[String.raw`loadCaptcha`]();
    if (_0x57357f) {
      if ((_0x57357f = JSON[String.raw`parse`](_0x57357f))[String.raw`RegisterName`]) {
        document[String.raw`getElementById`](String.raw`rusername`)[String.raw`value`] = _0x57357f[String.raw`RegisterName`];
      }
      if (_0x57357f[String.raw`RegisterPass`]) {
        document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`value`] = _0x57357f[String.raw`RegisterPass`];
      }
      if (_0x57357f[String.raw`RegisterEmail`]) {
        document[String.raw`getElementById`](String.raw`remail`)[String.raw`value`] = _0x57357f[String.raw`RegisterEmail`];
      }
    }
    document[String.raw`getElementById`](String.raw`rpassword1`)[String.raw`onkeyup`] = function (_0x3f81b7) {
      return restrictCharacters2(_0x3f81b7, _0x56b5e6);
    };
    document[String.raw`getElementById`](String.raw`remail`)[String.raw`onkeyup`] = function (_0x518952) {
      return restrictCharacters2(_0x518952, _0x19e88a);
    };
  };
  this[String.raw`loadCaptcha`] = function () {
    if (String.raw`object` == typeof grecaptcha) {
      grecaptcha[String.raw`ready`](function () {
        grecaptcha[String.raw`execute`](String.raw`6Ldy32QaAAAAAOXL7cpX_A5cWWO6ve7M9OW-SOWV`, {
          action: String.raw`register`
        })[String.raw`then`](function (_0x23b5f9) {
          let _0x54abb0 = document[String.raw`querySelector`](String.raw`#g-recaptcha-response`);
          if (_0x54abb0) {
            _0x54abb0[String.raw`value`] = _0x23b5f9;
          }
        });
      });
    }
  };
  this[String.raw`getCaptchaResponse`] = function () {
    let _0x20c59c = document[String.raw`querySelector`](String.raw`#g-recaptcha-response`);
    if (_0x20c59c) {
      return _0x20c59c[String.raw`value`];
    } else {
      return "";
    }
  };
  this[String.raw`sendCaptcha`] = function () {
    const _0x227d76 = {
      m: 3,
      j: selector[String.raw`CapJson`]
    };
    _0x227d76[String.raw`g-recaptcha-response`] = selector[String.raw`getCaptchaResponse`]();
    let _0x16979a = _0x227d76;
    loadJSON(String.raw`/web_gear/chat/AreYouaHuman.php`, selector[String.raw`GotCap`], selector[String.raw`GotCapFailed`], _0x16979a);
  };
  this[String.raw`GotCap`] = function (_0x53667b) {
    if (_0x53667b[String.raw`error`]) {
      return selector[String.raw`GotCapFailed`](_0x53667b);
    }
    _0x172df9(false, String.raw`loader`);
    addClass(String.raw`d-none`, String.raw`verification`);
    removeClass(String.raw`d-none`, String.raw`captchaOk`);
    removeClass(String.raw`d-none`, String.raw`capYes`);
    addClass(String.raw`d-none`, String.raw`captchaErr`);
    addClass(String.raw`d-none`, String.raw`capNo`);
    setTimeout(() => {
      ToC(_0x53667b);
      xrRoot[String.raw`setFrameVis`]();
    }, 3000);
  };
  this[String.raw`GotCapFailed`] = function (_0x21e2a6) {
    _0x172df9(false, String.raw`loader`);
    addClass(String.raw`d-none`, String.raw`verification`);
    removeClass(String.raw`d-none`, String.raw`captchaErr`);
    removeClass(String.raw`d-none`, String.raw`capNo`);
    addClass(String.raw`d-none`, String.raw`captchaOk`);
    addClass(String.raw`d-none`, String.raw`capYes`);
  };
  this[String.raw`isCaptchaPage`] = function () {
    let _0x24b8ce = document[String.raw`querySelector`](String.raw`#AreYouABot`);
    return !!_0x24b8ce && !_0x24b8ce[String.raw`classList`][String.raw`contains`](String.raw`d-none`);
  };
  this[String.raw`LoginSetName`] = function () {
    if (_0x242350 && _0x242350[String.raw`length`] > 0) {
      document[String.raw`getElementById`](String.raw`lusername`)[String.raw`value`] = _0x242350;
    }
    if (_0x1fc003 && _0x1fc003[String.raw`length`] > 0) {
      document[String.raw`getElementById`](String.raw`lpassword`)[String.raw`value`] = _0x1fc003;
    }
  };
  this[String.raw`doProfileDialog`] = function () {
    selector[String.raw`DoLoginEtc`](String.raw`EditProfileDialog`);
    var _0x1b3598 = MainObj[String.raw`user`][0];
    document[String.raw`getElementById`](String.raw`iname`)[String.raw`value`] = _0x1b3598[String.raw`name`];
    document[String.raw`getElementById`](String.raw`iavatar`)[String.raw`value`] = _0x1b3598[String.raw`avatar`];
    document[String.raw`getElementById`](String.raw`istatus`)[String.raw`value`] = _0x1b3598[String.raw`status`];
    document[String.raw`getElementById`](String.raw`ihomepage`)[String.raw`value`] = _0x1b3598[String.raw`homepage`];
  };
  this[String.raw`doLoginDialog`] = function (_0x397879) {
    xrRoot[String.raw`selector`][String.raw`DoLoginEtc`](String.raw`LoginForm`);
  };
  this[String.raw`termsOfService`] = function () {
    const _0x1acf9d = {
      [String.raw`Next`]: String.raw`help`
    };
    var _0x59186b = _0x1acf9d;
    parent[String.raw`setFrameVis`]();
    modalClose();
    ToC(_0x59186b);
  };
  this[String.raw`doChat`] = function () {
    ToC({
      Command: String.raw`MakeId`,
      Next: String.raw`chats`
    });
  };
  this[String.raw`PwaInstall`] = function () {
    var _0x4d1130;
    if ((_0x4d1130 = xrRoot[String.raw`xrPWA`]) != null) {
      _0x4d1130[String.raw`PWAinstall`]();
    }
  };
  const _0x1a1668 = {};
  _0x1a1668[String.raw`pwaInstall`] = function () {
    selector[String.raw`PwaInstall`]();
  };
  _0x1a1668[String.raw`LoginCancel`] = function () {
    selector[String.raw`LoginCancel`]();
  };
  _0x1a1668[String.raw`forgotPass`] = function () {
    selector[String.raw`forgotPass`]();
  };
  _0x1a1668[String.raw`doRegisterDialog`] = function () {
    selector[String.raw`doRegisterDialog`]();
  };
  _0x1a1668[String.raw`Logout`] = function () {
    selector[String.raw`Logout`]();
  };
  _0x1a1668[String.raw`termsOfService`] = function () {
    selector[String.raw`termsOfService`]();
  };
  _0x1a1668[String.raw`doLoginDialog`] = function () {
    selector[String.raw`doLoginDialog`]();
  };
  _0x1a1668[String.raw`Register`] = function () {
    selector[String.raw`Register`]();
  };
  _0x1a1668[String.raw`getXats`] = function () {
    getXats();
  };
  _0x1a1668[String.raw`quitEdit`] = function () {
    selector[String.raw`quitEdit`]();
  };
  _0x1a1668[String.raw`saveProfile`] = function () {
    selector[String.raw`saveProfile`]();
  };
  _0x1a1668[String.raw`clearLogin`] = function () {
    clearAlertMessage();
    selector[String.raw`Login`]();
  };
  _0x1a1668[String.raw`LoginAndSetName`] = function () {
    selector[String.raw`doLoginDialog`]();
    selector[String.raw`LoginSetName`]();
  };
  _0x1a1668[String.raw`clearResetPassword`] = function () {
    clearAlertMessage();
    selector[String.raw`ResetPassword`]();
  };
  _0x1a1668[String.raw`modalClose`] = function () {
    modalClose();
  };
  _0x1a1668[String.raw`doSignup`] = function () {
    selector[String.raw`doRegisterDialog`]();
  };
  _0x1a1668[String.raw`doLogin`] = function () {
    selector[String.raw`DoLoginEtc`](String.raw`LoginForm`);
  };
  _0x1a1668[String.raw`doHelp`] = function () {
    xrRoot[String.raw`setFrameVis`]();
    xrRoot[String.raw`setPage`](String.raw`help`);
  };
  _0x1a1668[String.raw`doChatNow`] = function () {
    xrRoot[String.raw`setFrameVis`]();
    selector[String.raw`doChat`]();
  };
  var _0x5c7c65 = _0x1a1668;
  this[String.raw`addLoginListerners`] = function () {
    var _0xb6be47;
    var _0x452ab1;
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    for (_0xb6be47 in _0x5c7c65) {
      if (_0x452ab1 = document[String.raw`getElementById`](_0xb6be47)) {
        _0x452ab1[String.raw`addEventListener`](String.raw`click`, _0x5c7c65[_0xb6be47]);
      }
    }
  };
  function _0x877a0e(_0x4e5498) {
    let _0x3d6896;
    let _0x4f9245 = clearDiv(String.raw`stiff`);
    let _0x3692b5 = makeElement(_0x4f9245, String.raw`div`);
    let _0x47ce34 = makeElement(_0x3692b5, "ul", String.raw`nav nav-tabs buytab`);
    for (let _0x3d3171 in _0x4e5498[String.raw`catagory`]) {
      let _0x5ff9bd = _0x4e5498[String.raw`catagory`][_0x3d3171][0];
      if (_0x5ff9bd[String.raw`charAt`](0) != "@") {
        continue;
      }
      let _0x5aca71 = makeElement(_0x47ce34, "li", String.raw`nav nav-tabs buytab`);
      _0x5ff9bd = _0x5ff9bd[String.raw`substr`](1);
      addText(_0x5aca71, _0x5ff9bd[String.raw`toLowerCase`]());
      _0x5aca71[String.raw`Catagory`] = _0x5ff9bd;
      if (!_0x3d6896) {
        _0x3d6896 = _0x5ff9bd;
        addClass(String.raw`active`, 0, _0x5aca71);
      }
      _0x5aca71[String.raw`addEventListener`](String.raw`click`, _0xe6f760);
    }
    makeElement(_0x4f9245, String.raw`div`, 0, String.raw`ToBuy`);
    _0x4f9245[String.raw`Obj`] = _0x4e5498;
    _0xe6f760(_0x3d6896);
    if (parent[String.raw`Classic`]) {
      _0x47ffe9();
    }
  }
  function _0xe6f760(_0x3edee1) {
    if (String.raw`string` != typeof _0x3edee1) {
      let _0x6a329 = document[String.raw`getElementsByClassName`](String.raw`active`);
      while (_0x6a329[String.raw`length`]) {
        removeClass(String.raw`active`, 0, _0x6a329[0]);
      }
      addClass(String.raw`active`, 0, _0x3edee1[String.raw`currentTarget`]);
      _0x3edee1 = _0x3edee1[String.raw`currentTarget`][String.raw`Catagory`];
    }
    let _0xa9bf19 = getById(String.raw`stiff`);
    let _0x34fc1e = clearDiv(String.raw`ToBuy`);
    let _0x80f45f = _0xa9bf19[String.raw`Obj`];
    let _0x22ba48 = makeElement(_0x34fc1e, String.raw`div`, String.raw`box buygiftlist`);
    let _0x2e72e7 = document[String.raw`querySelector`](String.raw`#front`)[String.raw`value`];
    let _0x5452f3 = document[String.raw`querySelector`](String.raw`#message`)[String.raw`value`];
    let _0x208858 = xInt(microtime(true));
    for (let _0x37e110 in _0x80f45f[String.raw`catagory`]) {
      let _0x1115af = _0x80f45f[String.raw`catagory`][_0x37e110];
      if (_0x3edee1 == _0x1115af[0] || _0x3edee1 == _0x1115af[0][String.raw`substr`](1)) {
        for (let _0x210104 = 1; _0x210104 < 3; _0x210104++) {
          let _0x507701 = _0x1115af[_0x210104];
          if (!_0x507701) {
            break;
          }
          _0x507701 = _0x507701[String.raw`split`](",");
          let _0x1300f1 = _0x507701[1];
          let _0x3dd8e6 = String.raw`category` == _0x507701[0];
          let _0x3604ea = 2;
          while (true) {
            let _0x4bcf2e = _0x507701[_0x3604ea];
            if (!_0x4bcf2e) {
              break;
            }
            if (_0x3dd8e6) {
              _0x3dd8e6 = _0x4bcf2e = _0x4bcf2e[String.raw`substr`](1);
              for (let _0x18c96c in _0x80f45f[String.raw`catagory`]) {
                if (_0x4bcf2e == _0x80f45f[String.raw`catagory`][_0x18c96c][0]) {
                  _0x4bcf2e = _0x80f45f[String.raw`catagory`][_0x18c96c][1];
                  _0x4bcf2e = _0x4bcf2e[String.raw`split`](",");
                  _0x4bcf2e = _0x4bcf2e[2];
                  break;
                }
              }
            }
            let _0x51789a = makeElement(_0x22ba48, String.raw`div`, String.raw`box2`);
            let _0x2d2028 = _0xa9bf19[String.raw`Obj`][String.raw`params`][_0x4bcf2e[String.raw`toLowerCase`]()];
            _0x2d2028 ||= {};
            _0x2d2028.n = selector[String.raw`MyRegName`];
            _0x2d2028.id = selector[String.raw`MyObj`][String.raw`MyId`];
            _0x2d2028.m = _0x5452f3;
            _0x2d2028.g = _0x4bcf2e;
            _0x2d2028.c = _0x1300f1;
            _0x2d2028.f = _0x1300f1 == 100 ? 4 : 0;
            _0x2d2028[String.raw`Time`] = _0x208858;
            let _0x44c56a = _0x1b439e(_0x51789a, _0x2d2028, (_0x3dd8e6 ? 4 : 0) | 2);
            _0x44c56a[String.raw`Scene`][String.raw`CardObj`] = _0x2d2028;
            let _0x1d2b2e = _0x4bcf2e;
            if (_0x1300f1 > 0) {
              _0x1d2b2e += ", " + _0x1300f1 + String.raw` xats`;
            }
            addToolTip(_0x44c56a, _0x1d2b2e, {
              select: true,
              position: String.raw`low`,
              shortTime: true
            });
            if (_0x3dd8e6) {
              makeElement(_0x51789a, "br");
              let _0x53859d = makeElement(_0x51789a, String.raw`div`, "", String.raw`giftuname`);
              addText(_0x53859d, _0x3dd8e6);
              _0x44c56a[String.raw`Scene`][String.raw`Catagory`] = _0x3dd8e6;
            } else {
              _0x2d2028.s = _0x2e72e7;
            }
            _0x3604ea++;
          }
        }
        break;
      }
    }
  }
  function _0x675e62(_0x1f6f53) {
    clearAlertMessage();
    if (_0x1f6f53 == "OK") {
      document[String.raw`querySelector`](String.raw`#front`)[String.raw`value`] = "";
      document[String.raw`querySelector`](String.raw`#message`)[String.raw`value`] = "";
      document[String.raw`querySelector`](String.raw`#password`)[String.raw`value`] = "";
      document[String.raw`querySelector`](String.raw`#pm`)[String.raw`checked`] = false;
      _0x29956d();
      selector[String.raw`clear`]();
      return;
    }
    AlertMessage(_0x1f6f53);
  }
  this[String.raw`BuyGifts`] = function () {
    if (!_0x52a4ae(String.raw`BuyGifts`)) {
      selector[String.raw`clear`]({
        stiff: 1
      });
      removeClass(String.raw`d-none`, String.raw`messageBlock`);
      removeClass(String.raw`d-none`, String.raw`FrontId`);
      _0x59b3a3([[String.raw`box.312`, String.raw`Send a gift to`], " " + selector[String.raw`Name`] + " (" + selector[String.raw`UserNo`] + ")"]);
      GetXconsts(String.raw`selector`, [String.raw`Auth`, String.raw`MainObj`, String.raw`end`]);
    }
  };
  let _0x5d58ea;
  let _0x21c2b7;
  let _0x319e8b = String.raw`all`;
  let _0x5224dd = [];
  this[String.raw`gifts`] = function (_0x13ca80) {
    const _0x5e5e54 = {
      [String.raw`Tabs`]: 1,
      [String.raw`stiff`]: 1
    };
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    if (!_0x52a4ae(String.raw`Gifts`)) {
      selector[String.raw`clear`](_0x5e5e54);
      addClass(String.raw`active`, String.raw`GiftsBut`);
      if (_0x13ca80) {
        if (_0x13ca80.id) {
          selector[String.raw`UserNo`] = _0x13ca80.id;
        }
        if (_0x13ca80[String.raw`regname`]) {
          selector[String.raw`Name`] = _0x13ca80[String.raw`regname`];
        }
        if (_0x13ca80.cb) {
          selector.cb = _0x13ca80.cb;
        }
      }
      if (!selector[String.raw`MyObj`] || selector[String.raw`UserNo`] && selector[String.raw`UserNo`] != selector[String.raw`MyObj`][String.raw`MyId`]) {
        selector[String.raw`gotGifts1`]();
      } else {
        selector[String.raw`UserNo`] = selector[String.raw`MyObj`][String.raw`MyId`];
        if (!selector[String.raw`UserNo`]) {
          selector[String.raw`MyObj`] = parent[String.raw`MyObj`];
          selector[String.raw`UserNo`] = selector[String.raw`MyObj`][String.raw`MyId`];
        }
        selector[String.raw`Name`] = selector[String.raw`MyObj`][String.raw`MyRegName`];
        selector.cb = selector[String.raw`MyObj`].cb;
        GetXconsts(String.raw`selector`, [String.raw`Auth`, String.raw`end`]);
      }
    }
  };
  this[String.raw`gotGifts1`] = function () {
    let _0x4155c4;
    let _0x39c72b = String.raw`https://rxat.ro/web_gear/chat/gifts22.php`;
    if (selector[String.raw`MyObj`] && selector[String.raw`UserNo`] == selector[String.raw`MyObj`][String.raw`MyId`]) {
      selector[String.raw`Name`] = selector[String.raw`Auth`][String.raw`RegName`];
    }
    _0x59b3a3([[String.raw`box.257`, String.raw`Gifts`], "" + selector[String.raw`Name`] == String.raw`undefined` ? String.raw` - ` + selector[String.raw`UserNo`] : String.raw` - ` + selector[String.raw`Name`] + " (" + selector[String.raw`UserNo`] + ")"]);
    if (selector[String.raw`UserNo`] == selector[String.raw`MyObj`][String.raw`MyId`]) {
      _0x4155c4 = {};
      _0x4155c4[String.raw`PassHash`] = selector[String.raw`Auth`][String.raw`PassHash`];
      _0x4155c4[String.raw`DeviceId`] = selector[String.raw`Auth`][String.raw`DeviceId`];
      _0x4155c4.id = selector[String.raw`MyObj`][String.raw`MyId`];
      _0x4155c4.k = _0x5d58ea || _0x5224dd[1];
      if (_0x4155c4.k && !_0x5224dd[0]) {
        _0x4155c4[String.raw`old`] = 1;
      }
      if (_0x5224dd[1]) {
        _0x4155c4[String.raw`flags`] = _0x5224dd[0];
      }
      _0x4155c4[String.raw`del`] = _0x21c2b7;
      _0x21c2b7 = 0;
      _0x5224dd = [];
    } else {
      _0x39c72b += String.raw`?id=` + selector[String.raw`UserNo`] + String.raw`&cb=` + selector.cb;
    }
    _0x319e8b = String.raw`all`;
    _0x172df9(true);
    loadJSON(_0x39c72b, _0xc3c90, _0xe6adf, _0x4155c4);
  };
  function _0xc3c90(_0x2f6900) {
    if (String.raw`Gifts` !== _0x45c84f) {
      return;
    }
    if (_0x2f6900.cb) {
      ToC({
        Page: String.raw`selector`,
        Command: String.raw`CacheBust`
      });
      delete _0x2f6900.cb;
    }
    let _0x362895 = clearDiv(String.raw`stiff`);
    _0x5a97c6(_0x2f6900);
    let _0xd26e02 = makeElement(_0x362895, String.raw`div`, String.raw`box`);
    let _0x435643 = Object[String.raw`keys`](_0x2f6900)[String.raw`sort`]()[String.raw`reverse`]();
    for (let _0x26d595 in _0x435643) {
      let _0x34d374 = _0x435643[_0x26d595];
      _0x2f6900[_0x34d374][String.raw`Time`] = _0x34d374;
      let _0x2ff9fb = makeElement(_0xd26e02, String.raw`div`, String.raw`box2`);
      let _0x2c1938 = _0x2f6900[_0x34d374].f == null || (parseInt(_0x2f6900[_0x34d374].f) & 1) == 0;
      _0x2ff9fb[String.raw`setAttribute`](String.raw`data-gFlag`, _0x2f6900[_0x34d374].f);
      _0x1b439e(_0x2ff9fb, _0x2f6900[_0x34d374]);
      makeElement(_0x2ff9fb, "br");
      let _0x41730a = _0x2f6900[_0x34d374].n;
      let _0x58e444 = makeElement(_0x2ff9fb, String.raw`div`, "", String.raw`giftuname`);
      addText(_0x58e444, _0x41730a);
      if (_0x41730a[String.raw`length`] > 6) {
        _0x58e444[String.raw`style`][String.raw`fontSize`] = String.raw`12px`;
        _0x58e444[String.raw`style`][String.raw`marginTop`] = String.raw`5px`;
      }
      if (_0x41730a[String.raw`length`] > 9) {
        _0x58e444[String.raw`style`][String.raw`fontSize`] = String.raw`10px`;
        _0x58e444[String.raw`style`][String.raw`marginTop`] = String.raw`5px`;
      }
      if (_0x41730a[String.raw`length`] > 14) {
        _0x58e444[String.raw`style`][String.raw`fontSize`] = String.raw`8px`;
        _0x58e444[String.raw`style`][String.raw`marginTop`] = String.raw`5px`;
      }
      if (_0x2c1938) {
        let _0x4c9fb5 = makeElement(_0x2ff9fb, String.raw`img`, String.raw`privateGift`);
        _0x4c9fb5[String.raw`src`] = String.raw`svg/lock.svg`;
        _0x4c9fb5[String.raw`width`] = "25";
      }
    }
    _0x172df9(false);
  }
  function _0x5a97c6(_0x43a19a) {
    let _0x289657 = document[String.raw`querySelector`](String.raw`#stiff`);
    let _0x374997 = makeElement(_0x289657, String.raw`div`, String.raw`totalbut`, String.raw`total`);
    let _0x5964f2 = makeElement(_0x289657, String.raw`div`, String.raw`sendgiftbut`, String.raw`total`);
    let _0x561e47 = selector[String.raw`MyObj`][String.raw`MyId`] == selector[String.raw`UserNo`];
    let _0x25d6b8 = makeElement(_0x5964f2, String.raw`div`, _0x561e47 ? String.raw`sendinv` : "", String.raw`giftTotal`);
    if (selector[String.raw`MyObj`][String.raw`MyId`] !== selector[String.raw`UserNo`]) {
      let _0x24a6c6 = makeElement(_0x25d6b8, String.raw`img`);
      addText(_0x25d6b8, [String.raw`box.311`, String.raw`send gift`]);
      _0x24a6c6[String.raw`src`] = String.raw`svg/giftssend.svg`;
      _0x24a6c6[String.raw`width`] = "19";
      _0x24a6c6[String.raw`addClass`] = String.raw`sendgifticon`;
      _0x25d6b8[String.raw`addEventListener`](String.raw`click`, selector[String.raw`BuyGifts`]);
    }
    let _0xf563e4 = Object[String.raw`keys`](_0x43a19a)[String.raw`length`] || "0";
    let _0x484088 = makeElement(_0x374997, String.raw`div`, "", String.raw`giftTotal`);
    let _0x12bc8e = makeElement(_0x484088, String.raw`img`);
    _0x12bc8e[String.raw`src`] = String.raw`svg/actGifts.svg`;
    _0x484088[String.raw`classList`][String.raw`add`](String.raw`giftActiveFilter`);
    _0x12bc8e[String.raw`setAttribute`](String.raw`data-filter`, String.raw`all`);
    _0x484088[String.raw`setAttribute`](String.raw`data-filter`, String.raw`all`);
    addText(_0x484088, _0xf563e4);
    _0x484088[String.raw`addEventListener`](String.raw`click`, _0x423485 => {
      if (_0xf563e4 != 0) {
        _0x1b0b4b(_0x423485);
      }
    });
    let _0x250091 = makeElement(_0x374997, String.raw`div`, "", String.raw`giftTotal`);
    let _0x3823d2 = makeElement(_0x250091, String.raw`img`);
    var _0x5bc9a1 = Object[String.raw`keys`](_0x43a19a)[String.raw`filter`]((_0x67149d, _0x5353e4) => _0x43a19a[_0x67149d].f == null || (parseInt(_0x43a19a[_0x67149d].f) & 1) == 0);
    _0x3823d2[String.raw`src`] = String.raw`svg/giftslock.svg`;
    _0x3823d2[String.raw`setAttribute`](String.raw`data-filter`, String.raw`public`);
    _0x250091[String.raw`setAttribute`](String.raw`data-filter`, String.raw`public`);
    addText(_0x250091, Object[String.raw`keys`](_0x5bc9a1)[String.raw`length`] || "0");
    _0x250091[String.raw`addEventListener`](String.raw`click`, _0x37762e => {
      if (_0x5bc9a1[String.raw`length`] != 0) {
        _0x1b0b4b(_0x37762e);
      }
    });
    let _0x2759ce = makeElement(_0x374997, String.raw`div`, "", String.raw`giftTotal`);
    let _0x3d3985 = makeElement(_0x2759ce, String.raw`img`);
    var _0x29bb2c = Object[String.raw`keys`](_0x43a19a)[String.raw`filter`]((_0x405c57, _0x472ee6) => parseInt(_0x43a19a[_0x405c57].f) & 1);
    _0x3d3985[String.raw`src`] = String.raw`svg/giftsunlock.svg`;
    _0x3d3985[String.raw`setAttribute`](String.raw`data-filter`, String.raw`private`);
    _0x2759ce[String.raw`setAttribute`](String.raw`data-filter`, String.raw`private`);
    addText(_0x2759ce, Object[String.raw`keys`](_0x29bb2c)[String.raw`length`] || "0");
    _0x2759ce[String.raw`addEventListener`](String.raw`click`, _0x3bc600 => {
      if (_0x29bb2c[String.raw`length`] != 0) {
        _0x1b0b4b(_0x3bc600);
      }
    });
  }
  function _0xe6adf(_0x266954) {
    let _0x20260d = clearDiv(String.raw`stiff`);
    let _0x4e0c01 = selector[String.raw`UserNo`] == selector[String.raw`MyObj`][String.raw`MyId`] ? [String.raw`box.313`, String.raw`You have no gifts.`] : [String.raw`box.314`, String.raw`User has no gifts.`];
    _0x5a97c6({});
    _0x172df9(false);
    let _0x38545a = makeElement(_0x20260d, String.raw`span`, String.raw`text-center nogift`);
    addText(_0x38545a, _0x4e0c01);
  }
  function _0x1b0b4b(_0x87bce6) {
    let _0x15ed2b = _0x87bce6[String.raw`target`][String.raw`dataset`];
    if (!_0x15ed2b || !_0x15ed2b[String.raw`filter`]) {
      return;
    }
    if (String.raw`IMG` == _0x87bce6[String.raw`target`][String.raw`nodeName`]) {
      _0x87bce6[String.raw`target`][String.raw`parentNode`][String.raw`classList`][String.raw`add`](String.raw`giftActiveFilter`);
    } else {
      _0x87bce6[String.raw`target`][String.raw`classList`][String.raw`add`](String.raw`giftActiveFilter`);
    }
    let _0x9ae6bd = _0x15ed2b[String.raw`filter`];
    if (_0x9ae6bd !== _0x319e8b) {
      let _0x37e9dd = document[String.raw`querySelector`](String.raw`[data-filter="` + _0x319e8b + "\"]");
      if (_0x37e9dd) {
        _0x37e9dd[String.raw`classList`][String.raw`remove`](String.raw`giftActiveFilter`);
      }
      let _0xd55f2a = document[String.raw`querySelectorAll`](String.raw`.box2`);
      if (_0xd55f2a[String.raw`length`] > 0) {
        for (let _0x358310 = 0; _0x358310 < _0xd55f2a[String.raw`length`]; _0x358310++) {
          let _0x592405 = _0xd55f2a[_0x358310][String.raw`dataset`];
          let _0x341a10 = parseInt(_0x592405[String.raw`gflag`]);
          switch (_0x9ae6bd) {
            case String.raw`all`:
              _0xd55f2a[_0x358310][String.raw`style`][String.raw`display`] = String.raw`inline-block`;
              break;
            case String.raw`public`:
              _0xd55f2a[_0x358310][String.raw`style`][String.raw`display`] = _0x341a10 & 1 ? String.raw`none` : String.raw`inline-block`;
              break;
            case String.raw`private`:
              _0xd55f2a[_0x358310][String.raw`style`][String.raw`display`] = _0x341a10 == null || (_0x341a10 & 1) == 0 ? String.raw`none` : String.raw`inline-block`;
          }
        }
      }
      _0x319e8b = _0x9ae6bd;
    }
  }
  function _0x259394(_0x3edfa4) {
    _0x5d58ea = _0x3edfa4[String.raw`currentTarget`][String.raw`Time`];
    selector[String.raw`gifts`]();
  }
  function _0x1944ed(_0x50dc85) {
    _0x5224dd = [_0x50dc85[String.raw`currentTarget`][String.raw`Flags`], _0x50dc85[String.raw`currentTarget`][String.raw`Time`]];
    selector[String.raw`gifts`]();
  }
  function _0x872dfa() {
    let _0x2019cd = clearDiv(String.raw`BigCard`);
    _0x2019cd[String.raw`removeEventListener`](String.raw`click`, _0x5dba43);
    addClass(String.raw`d-none`, 0, _0x2019cd);
    return _0x2019cd;
  }
  function _0x5dba43(_0x50e982) {
    if (isNaN(_0x50e982)) {
      _0x50e982 = 0;
    }
    setTimeout(function () {
      getById(String.raw`BigCard`)[String.raw`Small`][String.raw`style`][String.raw`visibility`] = String.raw`visible`;
      _0x872dfa();
    }, _0x50e982);
  }
  function _0x1b439e(_0x34640b, _0x37db46, _0x4ab203) {
    _0x4ab203 ||= 0;
    let _0x2d06e6 = 224;
    let _0x16566a = 284;
    let _0x434c35 = selector[String.raw`UserNo`] == selector[String.raw`MyObj`][String.raw`MyId`];
    let _0xa217e0 = makeElement(_0x34640b, String.raw`div`, String.raw`hold`);
    let _0x52a5ba = _0xa217e0[String.raw`Scene`] = makeElement(_0xa217e0, String.raw`div`, String.raw`scene` + (_0x4ab203 & 1 ? String.raw`-big` : ""), "tt" + _0x37db46[String.raw`Time`]);
    let _0x16af89 = makeElement(_0x52a5ba, String.raw`div`, String.raw`gift`);
    let _0x4a0f26 = makeElement(_0x16af89, String.raw`div`, String.raw`giftFace giftFaceFront`);
    let _0x1d8ca4 = SVG()[String.raw`addTo`](_0x4a0f26)[String.raw`viewbox`](0, 0, _0x16566a, 320);
    let _0x52a6b4 = _0x37db46.f == null || (parseInt(_0x37db46.f) & 1) == 0;
    let _0x362ab5 = _0x37db46.g[String.raw`replace`](/[^0-9a-zA-Z]/g, "_")[String.raw`toLowerCase`]();
    if (_0x37db46.f & 2) {
      _0x362ab5 = _0x37db46.f & 4 ? String.raw`unopenedgift` : String.raw`unreadcard`;
    }
    let _0x41cee1 = _0x1d8ca4[String.raw`image`](String.raw`https://rxat.ro/images/js/gift/` + _0x362ab5 + String.raw`.svg?z1`);
    if (_0x37db46.f & 2) {
      if (_0x434c35) {
        _0x52a5ba[String.raw`Time`] = _0x37db46[String.raw`Time`];
        _0x52a5ba[String.raw`addEventListener`](String.raw`click`, _0x259394);
        return;
      } else {
        addToolTip(_0xa217e0, [String.raw`box.309`, String.raw`User must read gift first`]);
        _0xa217e0[String.raw`style`][String.raw`opacity`] = String.raw`0.4`;
        return;
      }
    }
    _0x41cee1[String.raw`scale`](0.9);
    _0x41cee1[String.raw`translate`](15, 20);
    if (_0x4ab203 & 2 && !_0x434c35) {
      let _0x4dd42c = document[String.raw`querySelector`](String.raw`#message`);
      let _0x3f96ae = document[String.raw`querySelector`](String.raw`#front`);
      if (_0x4dd42c && _0x4dd42c[String.raw`value`][String.raw`length`]) {
        _0x37db46.m = _0x4dd42c[String.raw`value`];
      }
      if (_0x3f96ae && _0x3f96ae[String.raw`value`][String.raw`length`]) {
        _0x37db46.s = _0x3f96ae[String.raw`value`];
      }
      _0x37db46.n = selector[String.raw`Auth`][String.raw`RegName`] || "";
      _0x37db46.id = selector[String.raw`MyObj`][String.raw`MyId`];
    }
    _0x37db46.s ||= "\u2003";
    {
      let _0x1434fa = String.raw`M30,96 C77,25 192,25 254,96`;
      let _0x572497 = _0x37db46.f & 8;
      if (_0x572497) {
        _0x2d06e6 = _0x16566a;
        if (_0x37db46.s != "\u2003") {
          let _0x2d0ab6 = String.raw`0,46 284,1 284,48 0,93`;
          const _0x53e327 = {
            [String.raw`color`]: String.raw`#000`,
            [String.raw`opacity`]: 0.3
          };
          const _0x2d4d1b = {
            [String.raw`translateY`]: 6
          };
          _0x1d8ca4[String.raw`polygon`](_0x2d0ab6)[String.raw`fill`](_0x53e327)[String.raw`transform`](_0x2d4d1b);
          _0x1d8ca4[String.raw`polygon`](_0x2d0ab6)[String.raw`fill`]("#" + toHex6(_0x37db46[String.raw`FrontColBkg`]));
        }
        _0x1434fa = String.raw`M10,83 C100,65 183,52 274,38`;
      }
      let _0x422bfe = _0x37db46[String.raw`FrontColText`];
      if (!Array[String.raw`isArray`](_0x422bfe)) {
        _0x422bfe = [_0x422bfe, _0x422bfe];
      }
      if (String.raw`number` == typeof _0x422bfe[0]) {
        _0x422bfe[0] = "#" + toHex6(_0x422bfe[0]);
        _0x422bfe[1] = "#" + toHex6(_0x422bfe[1]);
      }
      let _0x4492f3 = _0x1d8ca4[String.raw`text`](function (_0x27c2eb) {
        _0x27c2eb[String.raw`tspan`](_0x37db46.s);
      });
      _0x4492f3[String.raw`path`](_0x1434fa);
      let _0x8c58e1 = 5;
      let _0x2eaf5c = _0x422bfe[0];
      if (_0x422bfe[0] != _0x422bfe[1] && !_0x572497) {
        _0x2eaf5c = _0x1d8ca4[String.raw`gradient`](String.raw`radial`, function (_0x109809) {
          _0x109809[String.raw`stop`](0.45, _0x422bfe[1]);
          _0x109809[String.raw`stop`](1, _0x422bfe[0]);
        });
        _0x2eaf5c[String.raw`attr`]({
          cx: 0.5,
          cy: 0.73
        });
      }
      _0x4492f3[String.raw`font`]({
        fill: _0x2eaf5c,
        size: _0x8c58e1,
        family: String.raw`Arial, Helvetica, sans-serif`
      });
      let _0xeeb2e3 = 0;
      while (_0xeeb2e3++ < 10 && _0x4492f3[String.raw`length`]() < _0x2d06e6 / 2) {
        _0x8c58e1 *= 1.2;
        _0x4492f3[String.raw`font`](String.raw`size`, _0x8c58e1);
      }
      _0x8c58e1 = _0x8c58e1 * 2 / 1.1;
      if (_0x8c58e1 > 40) {
        _0x8c58e1 = 40;
      }
      _0x4492f3[String.raw`font`](String.raw`size`, _0x8c58e1);
      _0x4492f3[String.raw`textPath`]()[String.raw`attr`](String.raw`startOffset`, Math[String.raw`round`]((142 - _0x4492f3[String.raw`bbox`]().cx) * 100 / _0x16566a) + "%");
    }
    if (_0x4ab203 & 1) {
      let _0x588bdc = makeElement(_0x16af89, String.raw`div`, String.raw`giftFace giftFaceBack`);
      let _0x93f239 = makeElement(_0x588bdc, String.raw`div`, String.raw`giftTitle`);
      let _0x478fcd = makeElement(_0x588bdc, String.raw`div`, String.raw`giftMessage`);
      let _0x54a02a = makeElement(_0x588bdc, String.raw`div`, String.raw`giftAcc`);
      var _0xd31f2c = GetTimeToGo(_0x37db46[String.raw`Time`] * 1000, true);
      let _0x25aa1c = makeElement(_0x588bdc, String.raw`div`, String.raw`giftFooter`);
      addText(_0x93f239, _0xd31f2c);
      makeElement(_0x93f239, "br");
      if (!(_0x4ab203 & 2)) {
        if (_0x52a6b4) {
          if (!_0x434c35) {
            _0x37db46.m = [String.raw`box.305`, String.raw`Message is private`];
            _0x478fcd[String.raw`style`][String.raw`opacity`] = String.raw`0.4`;
          }
        }
        if (_0x37db46.m === "" || _0x37db46[String.raw`noMessage`]) {
          _0x37db46.m = [String.raw`box.304`, String.raw`No message included`];
          _0x478fcd[String.raw`style`][String.raw`opacity`] = String.raw`0.4`;
          _0x37db46[String.raw`noMessage`] = true;
        }
      }
      if (_0x37db46.m[String.raw`length`] > 80 || _0x37db46[String.raw`topgap`]) {
        _0x478fcd[String.raw`style`][String.raw`top`] = String.raw`36%`;
        _0x37db46[String.raw`topgap`] = true;
      }
      if (_0x37db46.m[String.raw`length`] > 170 || _0x37db46[String.raw`bigtext`]) {
        _0x478fcd[String.raw`style`][String.raw`fontSize`] = String.raw`17px`;
        _0x37db46[String.raw`bigtext`] = true;
      }
      if (_0x37db46.m[String.raw`length`] < 80 || _0x37db46[String.raw`topgaporg`]) {
        _0x478fcd[String.raw`style`][String.raw`top`] = String.raw`40% !important`;
        _0x37db46[String.raw`topgaporg`] = true;
      }
      if (_0x37db46.m[String.raw`length`] < 170 || _0x37db46[String.raw`bigtextorg`]) {
        _0x478fcd[String.raw`style`][String.raw`fontSize`] = String.raw`22px !important`;
        _0x37db46[String.raw`bigtextorg`] = true;
      }
      addText(_0x478fcd, _0x37db46.m);
      makeElement(_0x478fcd, "br");
      addText(_0x54a02a, _0x37db46.n + " (" + _0x37db46.id + ")");
      if (_0x434c35 && !(_0x4ab203 & 2)) {
        let _0x52d187 = makeElement(_0x25aa1c, String.raw`button`, String.raw`giftDelete GiftMake`);
        let _0x16c60c = makeElement(_0x52d187, String.raw`img`);
        _0x16c60c[String.raw`src`] = String.raw`svg/giftsdelete.svg`;
        _0x16c60c[String.raw`width`] = "22";
        _0x52d187[String.raw`Time`] = _0x37db46[String.raw`Time`];
        _0x52d187[String.raw`addEventListener`](String.raw`click`, _0x48c984 => {
          setTimeout(() => {
            (function (_0x28d37f) {
              let _0x157d9e = makeElement(null, String.raw`img`);
              _0x157d9e[String.raw`src`] = String.raw`svg/xdelete.svg`;
              _0x157d9e[String.raw`alt`] = String.raw`close`;
              let _0x1b65c5 = makeElement(null, String.raw`div`);
              let _0x45256a = makeElement(_0x1b65c5, String.raw`div`, String.raw`modalDialogContentClassic`);
              let _0x1e1ae4 = makeElement(_0x45256a, String.raw`div`, String.raw`dialogTitleBar`);
              let _0x575578 = makeElement(_0x1e1ae4, String.raw`span`, String.raw`dialogTitle link`, String.raw`openLink`);
              makeElement(_0x1e1ae4, String.raw`span`, String.raw`dialogTitleAction`, String.raw`id_ModalClose`)[String.raw`appendChild`](_0x157d9e);
              let _0x5c62d4 = makeElement(_0x45256a, String.raw`div`, String.raw`dialogBody`);
              let _0x4abf09 = makeElement(_0x5c62d4, String.raw`div`, String.raw`dialogPadding`);
              let _0x33d1e9 = makeElement(_0x4abf09, String.raw`div`, String.raw`wrapper`, String.raw`wrapper`);
              let _0x14491b = makeElement(_0x5c62d4, String.raw`div`, String.raw`dialogActions`);
              let _0x9374b8 = makeElement(_0x14491b, String.raw`div`, String.raw`butcontainer previewBut centered`)[String.raw`appendChild`](makeElement(null, String.raw`div`, String.raw`butlayout`, String.raw`actionButton`));
              addText(_0x575578, [String.raw`box.306`, String.raw`Confirm deletion`]);
              _0x45256a[String.raw`dataset`].w = 0.6;
              addText(_0x33d1e9, [String.raw`box.307`, String.raw`Delete this gift?`]);
              _0x9374b8[String.raw`innerHTML`] = "";
              addText(_0x9374b8, [String.raw`box.308`, String.raw`Delete`]);
              HiddenDivs[String.raw`AlertDialog`] = _0x1b65c5[String.raw`innerHTML`];
              doModal(String.raw`AlertDialog`);
              ColorTitle();
              setButCols(parent[String.raw`config`][String.raw`ButCol`], parent[String.raw`config`][String.raw`ButColW`]);
              let _0x1c54b6 = _0x28d37f;
              document[String.raw`querySelector`](String.raw`#actionButton`)[String.raw`addEventListener`](String.raw`click`, () => {
                _0x21c2b7 = _0x1c54b6[String.raw`target`][String.raw`Time`];
                if (_0x21c2b7 == null) {
                  _0x21c2b7 = _0x1c54b6[String.raw`target`][String.raw`parentElement`][String.raw`Time`];
                }
                modalClose();
                selector[String.raw`gifts`]();
              });
              document[String.raw`querySelector`](String.raw`#id_ModalClose`)[String.raw`addEventListener`](String.raw`click`, () => {
                modalClose();
              });
            })(_0x48c984);
          }, 1250);
        });
        let _0x241ed8 = makeElement(_0x25aa1c, String.raw`button`, String.raw`GiftMake`);
        addText(_0x241ed8, _0x52a6b4 ? [String.raw`box.302`, String.raw`Make public`] : [String.raw`box.303`, String.raw`Make private`]);
        _0x241ed8[String.raw`Time`] = _0x37db46[String.raw`Time`];
        _0x241ed8[String.raw`Flags`] = _0x52a6b4 ? "1" : "0";
        _0x241ed8[String.raw`addEventListener`](String.raw`click`, _0x1944ed);
      }
    }
    function _0xcaf34a(_0x5777e0) {
      if (_0x5777e0) {
        _0x5777e0[String.raw`stopPropagation`]();
      }
      if (_0x4ab203 & 4) {
        _0xe6f760(_0x5777e0[String.raw`currentTarget`][String.raw`Catagory`]);
        return;
      }
      if (_0x4ab203 & 2 && document[String.raw`getElementById`](String.raw`password`)[String.raw`value`][String.raw`length`] > 1) {
        (function (_0x2e5d53) {
          let _0x4b734e = _0x2e5d53[String.raw`currentTarget`][String.raw`CardObj`];
          let _0xdae092 = selector[String.raw`Auth`];
          _0x4b734e.b = selector[String.raw`UserNo`];
          _0x4b734e.u = _0xdae092[String.raw`UserNo`];
          _0x4b734e.r = _0xdae092[String.raw`RoomId`];
          _0x4b734e.w = ST2(TransText(String.raw`box.254`, String.raw`$1 has bought $2  a $3`), GetAsMB(_0xdae092[String.raw`RegName`]), GetAsMB(selector[String.raw`Name`]), _0x4b734e.f & 4 ? String.raw`gift ` : String.raw`card`);
          _0x4b734e.t = _0xdae092.dt;
          _0x4b734e.p = getById(String.raw`password`)[String.raw`value`];
          _0x4b734e.s = getById(String.raw`front`)[String.raw`value`];
          _0x4b734e.m = getById(String.raw`message`)[String.raw`value`];
          _0x4b734e.f = 1;
          if (document[String.raw`getElementById`]("pm")[String.raw`checked`]) {
            _0x4b734e.f &= -2;
          }
          customModalWithMsg([String.raw`box1.sending`, String.raw`Sending...`], [String.raw`box1.pleasewait`, String.raw`Please wait`]);
          loadHTML(chatUrl + String.raw`buygifts.php`, _0x675e62, 0, _0x4b734e);
        })(_0x5777e0);
        return;
      }
      let _0x4b0e56 = _0x872dfa();
      removeClass(String.raw`d-none`, 0, _0x4b0e56);
      let _0x5a141d = _0x4b0e56[String.raw`Rect`] = _0xa217e0[String.raw`getBoundingClientRect`]();
      let _0x15ce34 = _0x1b439e(_0x4b0e56, _0x37db46, _0x4ab203 | 1);
      _0x4b0e56[String.raw`Big`] = _0x15ce34;
      _0x4b0e56[String.raw`Small`] = _0xa217e0;
      _0x15ce34[String.raw`style`][String.raw`left`] = _0x5a141d[String.raw`left`] - 10 + "px";
      _0x15ce34[String.raw`style`][String.raw`top`] = _0x5a141d[String.raw`top`] - 10 + "px";
      _0xa217e0[String.raw`style`][String.raw`visibility`] = String.raw`hidden`;
      _0x4b0e56[String.raw`addEventListener`](String.raw`click`, _0x5dba43);
    }
    if (_0x4ab203 & 1) {
      _0x52a5ba[String.raw`Big`] = 1;
      let _0x9ee8e = document[String.raw`getElementById`](String.raw`BigCard`);
      _0x52a5ba[String.raw`addEventListener`](String.raw`click`, function (_0x4db3cb) {
        if (_0x4db3cb) {
          _0x4db3cb[String.raw`stopPropagation`]();
        }
        let _0x17775e = document[String.raw`getElementById`](String.raw`BigCard`)[String.raw`Big`][String.raw`Scene`];
        if (_0x17775e[String.raw`Big`] != 0) {
          if (_0x17775e[String.raw`classList`][String.raw`contains`](String.raw`is-zoomed`)) {
            if (_0x16af89[String.raw`classList`][String.raw`contains`](String.raw`is-flipped`)) {
              _0x17775e[String.raw`style`][String.raw`transform`] = "";
              _0x17775e[String.raw`classList`][String.raw`toggle`](String.raw`is-zoomed`);
              _0x16af89[String.raw`classList`][String.raw`toggle`](String.raw`is-flipped`);
              _0x5dba43(1250);
            } else {
              _0x16af89[String.raw`classList`][String.raw`toggle`](String.raw`is-flipped`);
            }
          } else {
            _0x17775e[String.raw`classList`][String.raw`toggle`](String.raw`is-zoomed`);
          }
        }
      });
      _0x52a5ba[String.raw`classList`][String.raw`toggle`](String.raw`is-zoomed`);
      let _0x139376 = _0x9ee8e[String.raw`offsetWidth`] / -33;
      _0x52a5ba[String.raw`style`][String.raw`transform`] = String.raw`translate(` + (_0x139376 - _0x9ee8e[String.raw`Rect`][String.raw`left`]) + String.raw`px,` + (180 - _0x9ee8e[String.raw`Rect`][String.raw`top`]) + String.raw`px) scale(0.85) rotate(360deg)`;
    } else {
      _0x52a5ba[String.raw`Big`] = 0;
      _0x52a5ba[String.raw`addEventListener`](String.raw`click`, _0xcaf34a);
      if (_0x5d58ea == _0x37db46[String.raw`Time`]) {
        _0x5d58ea = 0;
        _0xcaf34a();
      }
    }
    return _0xa217e0;
  }
  function _0x47f7da(_0x275f5b, _0x29dc96, _0x5a6bd1) {
    let _0x3cefd6 = makeElement(_0x275f5b, String.raw`div`, String.raw`stickercell`);
    _0x3cefd6[String.raw`style`][String.raw`float`] = String.raw`left`;
    let _0x4d34ba = makeElement(_0x3cefd6, String.raw`img`);
    _0x4d34ba[String.raw`border`] = 0;
    _0x4d34ba[String.raw`width`] = 100;
    _0x4d34ba[String.raw`height`] = 100;
    _0x4d34ba[String.raw`draggable`] = false;
    let _0xa44a73 = _0x29dc96[0][String.raw`replace`](/[^0-9a-zA-Z]/g, "_")[String.raw`toLowerCase`]();
    _0x4d34ba[String.raw`src`] = String.raw`https://gs.rxat.ro/h_s_` + _0xa44a73 + "_" + (_0x29dc96[1] ? encodeURIComponent(_0x29dc96[1]) : "") + String.raw`.png`;
    new Image()[String.raw`src`] = _0x4d34ba[String.raw`src`];
    _0x3cefd6[String.raw`addEventListener`](String.raw`click`, _0x5a6bd1);
    return _0x3cefd6;
  }
  this[String.raw`stickers`] = _0x201b7d => {
    const _0x4f17ac = {
      [String.raw`Tabs`]: 1
    };
    selector[String.raw`hideWallet`]();
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    if (!_0x52a4ae(String.raw`Sticker`)) {
      _0x43782e = String.raw`string` == typeof _0x201b7d ? _0x201b7d : null;
      selector[String.raw`clear`](_0x4f17ac);
      _0x172df9(true);
      addClass(String.raw`active`, String.raw`StickBut`);
      GetXconsts(String.raw`selector`, [String.raw`Stickers`, String.raw`w_Powers`, String.raw`pssa`, String.raw`end`]);
    }
  };
  let _0x1e174d = null;
  let _0x588c50 = null;
  function _0x3e00a4(_0x170250) {
    selector[String.raw`hideWallet`]();
    let _0x584cbc = selector;
    let _0x305acf = {};
    let _0x1a5356 = {};
    _0x584cbc[String.raw`AllStickers`] = _0x170250;
    document[String.raw`querySelector`](String.raw`#stickMessage`)[String.raw`value`] = "";
    _0x59b3a3([String.raw`box.295`, String.raw`Send a sticker`]);
    const _0x361967 = parent[String.raw`document`][String.raw`getElementById`](String.raw`textEntryEditable`);
    if (_0x361967) {
      _0x361967[String.raw`focus`]();
    }
    addToolTip(document[String.raw`querySelector`](String.raw`#stickColor1`), [String.raw`box.315`, String.raw`Add inner color`], {
      select: true,
      position: String.raw`low`
    });
    addToolTip(document[String.raw`querySelector`](String.raw`#stickColor2`), [String.raw`box.316`, String.raw`Add outer color`], {
      select: true,
      position: String.raw`left`
    });
    [String.raw`#stickColor1`, String.raw`#stickColor2`][String.raw`forEach`](_0x29d3fb => {
      const _0x2a15c8 = {
        [String.raw`save`]: true,
        [String.raw`input`]: true
      };
      const _0x419f14 = {
        [String.raw`palette`]: true,
        [String.raw`preview`]: true,
        [String.raw`opacity`]: true,
        [String.raw`hue`]: true,
        [String.raw`interaction`]: _0x2a15c8
      };
      const _0x11d6c7 = {
        el: _0x29d3fb,
        [String.raw`theme`]: String.raw`nano`,
        [String.raw`preview`]: true,
        [String.raw`useAsButton`]: true,
        [String.raw`closeOnScroll`]: false,
        [String.raw`lockOpacity`]: true,
        [String.raw`components`]: _0x419f14
      };
      let _0x1c61f5 = Pickr[String.raw`create`](_0x11d6c7).on(String.raw`change`, (_0x1c85fd, _0x1d36eb) => {
        if (String.raw`#stickColor1` == _0x29d3fb) {
          _0x1e174d = _0x1c85fd[String.raw`toHEXA`]()[String.raw`toString`]();
          document[String.raw`querySelector`](String.raw`#stickMessage`)[String.raw`style`][String.raw`color`] = _0x1e174d;
        } else {
          _0x588c50 = _0x1c85fd[String.raw`toHEXA`]()[String.raw`toString`]();
          document[String.raw`querySelector`](String.raw`#stickMessage`)[String.raw`style`][String.raw`background`] = _0x588c50;
        }
      }).on(String.raw`save`, (_0x3dfbd6, _0x448b49) => {
        _0x1c61f5[String.raw`hide`]();
      });
    });
    for (let _0x128541 in _0x584cbc[String.raw`Stickers`]) {
      let _0x4ce44e = _0x584cbc[String.raw`pssa`][xInt(_0x128541) + 1];
      let _0x342b76 = _0x170250[_0x4ce44e];
      if (_0x1e1f13(_0x128541)) {
        _0x305acf[_0x4ce44e] = _0x342b76;
      } else {
        _0x1a5356[_0x4ce44e] = _0x342b76;
      }
    }
    let _0x10b346 = document[String.raw`getElementById`](String.raw`stiff`);
    function _0x49cae4(_0x36eb00) {
      let _0x1a5c40 = document[String.raw`querySelector`](String.raw`#stickMessage`)[String.raw`value`];
      if (_0x1e174d == _0x588c50) {
        _0x1e174d = _0x588c50 = "";
      }
      selector[String.raw`clear`]();
      const _0x45b1ec = {
        [String.raw`Page`]: String.raw`messages`,
        [String.raw`Command`]: String.raw`Paste`
      };
      let _0x390b89 = _0x45b1ec;
      _0x390b89[String.raw`Paste`] = "(" + _0x36eb00[String.raw`target`][String.raw`parentNode`][String.raw`name`] + "#" + _0x1a5c40[String.raw`replace`](/'/gi, "’") + _0x1e174d + _0x588c50 + ")";
      ToC(_0x390b89);
      _0x29956d();
    }
    function _0x3f9dd7(_0x13c380) {
      clearDiv(String.raw`stiff`);
      removeClass(String.raw`d-none`, String.raw`stickMessageBlock`);
      if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
        document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`94%`;
      }
      for (let _0x4196fb in _0x584cbc[String.raw`AllStickers`][_0x13c380]) {
        const _0x2bda82 = _0x13c380 + "." + _0x584cbc[String.raw`AllStickers`][_0x13c380][_0x4196fb];
        const _0x3193b3 = _0x47f7da(_0x10b346, [_0x2bda82, ""], _0x49cae4);
        addToolTip(_0x3193b3, "(" + _0x2bda82 + ")", {
          select: true,
          position: String.raw`low`
        });
        _0x3193b3[String.raw`name`] = _0x2bda82;
      }
    }
    function _0x5e30bb(_0x1a7267, _0xf7b79b, _0x59eee2) {
      if (_0x43782e) {
        _0x3f9dd7(_0x43782e);
      } else {
        for (let _0x356aa6 in _0xf7b79b) {
          if (_0xf7b79b[_0x356aa6]) {
            const _0x3a88ef = _0x47f7da(_0x1a7267, [_0x356aa6 + "." + _0xf7b79b[_0x356aa6][Math[String.raw`floor`](Math[String.raw`random`]() * _0xf7b79b[_0x356aa6][String.raw`length`])], _0x356aa6], () => {
              _0x3f9dd7(_0x356aa6);
            });
            if (_0x59eee2) {
              _0x3a88ef[String.raw`style`][String.raw`opacity`] = String.raw`0.6`;
              addToolTip(_0x3a88ef, [String.raw`mob2.nostickers`, String.raw`You need $1 power to use these stickers.`, capitalize(_0x356aa6)], {
                select: true,
                position: String.raw`low`
              });
            } else {
              addToolTip(_0x3a88ef, [String.raw`box.301`, String.raw`View stickers`], {
                select: true,
                position: String.raw`low`
              });
            }
          }
        }
      }
    }
    removeClass(String.raw`d-none`, String.raw`stiff`);
    let _0x2d585f = makeElement(_0x10b346, String.raw`div`);
    _0x5e30bb(_0x2d585f, _0x305acf);
    _0x2d585f = makeElement(_0x10b346, String.raw`div`);
    _0x5e30bb(_0x2d585f, _0x1a5356, 1);
    _0x172df9(false);
  }
  const _0x170469 = {
    [String.raw`Snow`]: 56,
    [String.raw`Animal`]: -116,
    [String.raw`WildHorses`]: 124,
    [String.raw`SteamTrain`]: 124,
    [String.raw`Rocket`]: 133,
    [String.raw`Stoneage`]: 135
  };
  const _0x200cc3 = _0x170469;
  function _0x572edf(_0x217956) {
    var _0x59bf01;
    var _0x27159f;
    selector[String.raw`clear`]();
    const _0x4099fc = {
      [String.raw`Page`]: String.raw`messages`,
      [String.raw`Command`]: String.raw`Paste`
    };
    let _0x42acc8 = _0x4099fc;
    let _0x1f5e2d = (_0x59bf01 = _0x217956[String.raw`target`]) == null || (_0x27159f = _0x59bf01[String.raw`dataset`]) == null ? undefined : _0x27159f.sm;
    _0x1f5e2d = _0x1f5e2d[String.raw`replace`](/\*/gi, "#");
    _0x42acc8[String.raw`Paste`] = "(" + (_0x1f5e2d[String.raw`indexOf`]("#") >= 0 ? _0x1f5e2d : _0x1f5e2d + "#") + ")";
    ToC(_0x42acc8);
    _0x29956d();
  }
  function _0x1a3622(_0x3175d8, _0x2fdf60, _0x31ffa5) {
    let _0x4bd991 = selector[String.raw`pssa`] && selector[String.raw`pssa`][String.raw`indexOf`](_0x2fdf60) >= 0;
    const _0x4e9127 = xrRoot[String.raw`Smilies`][String.raw`MakeSmiley`](_0x3175d8, _0x2fdf60, {
      size: 30,
      tooltipPosition: String.raw`low`,
      className: String.raw`smSpan`,
      callback: _0x10544a => {},
      scrollParent: document[String.raw`querySelector`](String.raw`.powersScroll`)
    });
    _0x4e9127[String.raw`name`] = _0x2fdf60;
    if (function (_0x48ef40, _0x65a6c5) {
      return _0x48ef40 && _0x65a6c5;
    }(_0x4bd991, _0x4a0486)) {
      _0x4e9127[String.raw`classList`][String.raw`add`](String.raw`mainPower`, String.raw`powind`);
    }
    if (function (_0x1183b8, _0x386d17) {
      return _0x1183b8 && _0x386d17;
    }(_0x4bd991, _0x4a0486)) {
      _0x4e9127[String.raw`addEventListener`](String.raw`click`, _0x11d024 => {
        _0x4a0486 = false;
        _0x11d024[String.raw`target`][String.raw`dataset`][String.raw`smw`] = _0x2fdf60;
        _0x53b94f(_0x11d024);
      });
    } else {
      _0x4e9127[String.raw`addEventListener`](String.raw`click`, _0x104799 => {
        _0x4a0486 = false;
        _0x31ffa5(_0x104799);
      });
    }
    return _0x4e9127;
  }
  function _0x53b94f(_0xe14ece) {
    let _0x14df88 = document[String.raw`getElementById`](String.raw`stiff`);
    const _0x19083b = {
      [String.raw`Tabs`]: 1,
      [String.raw`stiff`]: 1
    };
    selector[String.raw`clear`](_0x19083b);
    addClass(String.raw`active`, String.raw`SmBut`);
    let _0x20b240;
    let _0x2b8399 = _0xe14ece[String.raw`target`][String.raw`dataset`][String.raw`smw`];
    switch (_0x2b8399) {
      case String.raw`yellows`:
        _0x20b240 = selector[String.raw`syel`];
        document[String.raw`querySelector`](String.raw`#stiff`)[String.raw`style`][String.raw`height`] = "";
        if (Classic) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = "";
        }
        if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`29%`;
        }
      case String.raw`others`:
        _0x20b240 ||= selector[String.raw`soth`];
        _0x20b240 = _0x20b240[String.raw`split`](",");
        document[String.raw`querySelector`](String.raw`#stiff`)[String.raw`style`][String.raw`height`] = "";
        if (Classic) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = "";
        }
        if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`26%`;
        }
        break;
      default:
        let _0x3b221d;
        for (let _0x4c91a2 in selector[String.raw`pssa`]) {
          if (_0x2b8399 == selector[String.raw`pssa`][_0x4c91a2]) {
            _0x3b221d = xInt(_0x4c91a2) - 1;
            break;
          }
        }
        if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`88%`;
        }
        _0x20b240 = [_0x2b8399];
        for (let _0x55c736 in selector[String.raw`topsh`]) {
          if (_0x3b221d == selector[String.raw`topsh`][_0x55c736]) {
            _0x20b240[String.raw`push`](_0x55c736);
          }
        }
    }
    for (let _0x1aae05 in _0x20b240) {
      _0x1a3622(_0x14df88, _0x20b240[_0x1aae05], _0x572edf);
    }
    if (_0x4c2dce[_0x2b8399]) {
      let _0x35e6b3 = makeElement(_0x14df88, String.raw`div`);
      let _0x2ab637 = Object[String.raw`prototype`][String.raw`toString`][String.raw`call`](_0x4c2dce[_0x2b8399]);
      if (String.raw`[object Object]` == _0x2ab637) {
        let _0x14607d = _0x4c2dce[_0x2b8399];
        for (let _0x5a3474 in _0x14607d) {
          for (let _0x119876 in _0x14607d[_0x5a3474]) {
            _0x1a3622(_0x35e6b3, _0x5a3474 + "#" + _0x14607d[_0x5a3474][_0x119876], _0x572edf);
          }
        }
      } else {
        for (let _0x1d7f53 in _0x20b240) {
          if (String.raw`[object Array]` == _0x2ab637) {
            for (let _0x5be700 in _0x4c2dce[_0x2b8399]) {
              _0x1a3622(_0x35e6b3, _0x20b240[_0x1d7f53] + "#" + _0x4c2dce[_0x2b8399][_0x5be700], _0x572edf);
            }
          } else {
            _0x1a3622(_0x35e6b3, _0x20b240[_0x1d7f53] + "#" + _0x4c2dce[_0x2b8399], _0x572edf);
          }
        }
      }
    }
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
      _0x3f16ff[String.raw`addEventListener`](String.raw`click`, () => {
        selector[String.raw`startSmilies`]();
        setTimeout(() => {
          let _0x29b5bb = document[String.raw`getElementById`](_0x2b8399 + String.raw`Container`);
          if (_0x29b5bb) {
            const _0x52120b = {
              [String.raw`behavior`]: String.raw`smooth`
            };
            let _0x1d0594 = _0x52120b;
            if (Browser && Browser === "FF") {
              _0x1d0594[String.raw`block`] = String.raw`center`;
            }
            _0x29b5bb[String.raw`scrollIntoView`](_0x1d0594);
          }
        }, 700);
      });
    }
  }
  this[String.raw`clicKiss`] = function (_0x3487a7) {
    let _0x414406 = document[String.raw`getElementById`](String.raw`password`)[String.raw`value`];
    let _0x249519 = document[String.raw`getElementById`](String.raw`message`)[String.raw`value`];
    let _0x5d7e2c = {
      Page: String.raw`selector`,
      Command: String.raw`TestKiss`,
      Name: _0x3487a7[String.raw`target`][String.raw`name`],
      Message: _0x249519
    };
    if (_0x414406) {
      _0x5d7e2c[String.raw`Command`] = String.raw`SendKiss`;
      _0x5d7e2c[String.raw`Password`] = _0x414406;
      if (_0x3487a7[String.raw`target`][String.raw`Type`]) {
        _0x5d7e2c[String.raw`Command`] = String.raw`Action`;
        _0x5d7e2c.n = _0x3487a7[String.raw`target`][String.raw`name`];
        _0x5d7e2c[String.raw`name`] = _0x3487a7[String.raw`target`][String.raw`Type`];
        switch (selector[String.raw`MarryType`]) {
          case String.raw`Divorce`:
            _0x5d7e2c[String.raw`UserNo`] = 1;
            break;
          case String.raw`Marry`:
            _0x5d7e2c[String.raw`UserNo`] = selector.id;
        }
      }
      document[String.raw`getElementById`](String.raw`password`)[String.raw`value`] = "";
      document[String.raw`getElementById`](String.raw`message`)[String.raw`value`] = "";
      _0x29956d();
    }
    ToC(_0x5d7e2c);
  };
  this[String.raw`doKisses`] = function (_0x1cee68) {
    this[String.raw`MarryType`] = _0x1cee68;
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    if (_0x52a4ae(String.raw`Kiss`)) {
      return;
    }
    const _0x496451 = {
      [String.raw`Tabs`]: 1
    };
    selector[String.raw`clear`](_0x496451);
    addClass(String.raw`active`, String.raw`KissBut`);
    let _0xfd74e3 = [String.raw`box.224`, String.raw`Send a kiss`];
    switch (_0x1cee68) {
      case String.raw`Divorce`:
        _0xfd74e3 = [String.raw`box.222`, String.raw`Get Divorced`];
        break;
      case String.raw`Marry`:
        _0xfd74e3 = [String.raw`box.221`, String.raw`Get Married`];
    }
    _0x59b3a3(_0x1cee68 ? [_0xfd74e3, String.raw` - ` + selector[String.raw`regname`] + " (" + selector.id + ")"] : [_0xfd74e3]);
    _0x172df9(true);
    _0xfd74e3 = [String.raw`w_Powers`, String.raw`w_GroupPowers`, String.raw`MainObj`, String.raw`end`];
    if (_0x1cee68) {
      _0xfd74e3[String.raw`unshift`](String.raw`Marry`);
    }
    GetXconsts(String.raw`selector`, _0xfd74e3);
  };
  this[String.raw`doKisses2`] = function () {
    let _0x10e9e = document[String.raw`getElementById`](String.raw`stiff`);
    function _0x3cf79d(_0x23c0ad, _0x39799a, _0x4a1dda) {
      let _0x21c30f = makeElement(_0x10e9e, String.raw`img`, String.raw`kisscell`);
      _0x21c30f[String.raw`border`] = 0;
      _0x21c30f[String.raw`width`] = 83;
      _0x21c30f[String.raw`height`] = 60;
      _0x21c30f[String.raw`src`] = String.raw`https://gs.rxat.ro/f_ks-t` + _0x23c0ad + String.raw`_166_120_2_.png`;
      new Image()[String.raw`src`] = _0x21c30f[String.raw`src`];
      _0x21c30f[String.raw`Cost`] = _0x39799a;
      _0x21c30f[String.raw`Type`] = _0x4a1dda;
      _0x21c30f[String.raw`name`] = _0x23c0ad;
      _0x21c30f[String.raw`draggable`] = false;
      addToolTip(_0x21c30f, _0x23c0ad + ", " + _0x39799a + String.raw` xats`, {
        select: true,
        position: String.raw`low`,
        shortTime: true
      });
      _0x21c30f[String.raw`addEventListener`](String.raw`click`, selector[String.raw`clicKiss`]);
    }
    function _0x125a87(_0x2c17eb) {
      (_0x2c17eb = _0x2c17eb[String.raw`split`](","))[String.raw`shift`]();
      let _0xacf9b0 = _0x2c17eb[String.raw`shift`]();
      for (let _0x2e041a in _0x2c17eb) {
        let _0x5c4623 = _0x2c17eb[_0x2e041a];
        if (!_0x5c4623) {
          continue;
        }
        let _0x468f63 = _0x200cc3[_0x5c4623];
        if (!_0x468f63 || !!_0x1e1f13(_0x468f63)) {
          _0x3cf79d(_0x5c4623, _0xacf9b0);
        }
      }
      _0x172df9(false);
    }
    removeClass(String.raw`d-none`, String.raw`messageBlock`);
    removeClass(String.raw`d-none`, String.raw`stiff`);
    if (this[String.raw`MarryType`]) {
      let _0x59af73;
      _0x59af73 = String.raw`Marry` == this[String.raw`MarryType`] ? [String.raw`Marry`, String.raw`BFF`] : [String.raw`Divorce`];
      for (let _0x173043 in _0x59af73) {
        let _0x16dd09 = makeElement(_0x10e9e, String.raw`div`, String.raw`marBff`);
        if (String.raw`Marry` == _0x59af73[_0x173043]) {
          addText(_0x16dd09, [String.raw`mob2.marry`, String.raw`Marry`]);
        } else if (String.raw`BFF` == _0x59af73[_0x173043]) {
          addText(_0x16dd09, [String.raw`box.160`, String.raw`BFF`]);
        } else if (String.raw`Divorce` == _0x59af73[_0x173043]) {
          addText(_0x16dd09, [String.raw`box.150`, String.raw`Divorce`]);
        }
        _0x16dd09 = this[String.raw`Marry`][_0x59af73[_0x173043]][String.raw`split`](",");
        for (let _0x3b661f in _0x16dd09) {
          _0x3cf79d(_0x16dd09[_0x3b661f], String.raw`Divorce` != _0x59af73[_0x173043] ? 200 : 0, _0x59af73[_0x173043]);
        }
      }
      _0x172df9(false);
    } else {
      loadJSON(String.raw`https://rxat.ro/web_gear/chat/kiss.php`, function (_0x5849e4) {
        for (let _0x328f50 in _0x5849e4) {
          _0x125a87(_0x5849e4[_0x328f50][1]);
          _0x125a87(_0x5849e4[_0x328f50][2]);
        }
      });
    }
    if (parent[String.raw`Classic`]) {
      _0x47ffe9();
    }
  };
  this[String.raw`startSmilies`] = function () {
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    if (_0x52a4ae(String.raw`Smilies`)) {
      return;
    }
    const _0x208a9b = {
      [String.raw`Tabs`]: 1,
      [String.raw`searchBlock`]: 1
    };
    selector[String.raw`clear`](_0x208a9b);
    addClass(String.raw`active`, String.raw`SmBut`);
    addClass(String.raw`d-none`, String.raw`s__mem`);
    GetXconsts(String.raw`selector`, [String.raw`SuperPowers`, String.raw`Types`, String.raw`MainObj`, String.raw`w_Powers`, String.raw`topsh`, String.raw`syel`, String.raw`soth`, String.raw`pssa`, String.raw`end`], selector);
    _0x59b3a3([String.raw`box.296`, String.raw`Select a smiley`]);
    const _0x151cad = parent[String.raw`document`][String.raw`getElementById`](String.raw`textEntryEditable`);
    if (_0x151cad) {
      _0x151cad[String.raw`focus`]();
    }
    hideTooltip();
    document[String.raw`querySelector`](String.raw`.dropdown-content`)[String.raw`style`][String.raw`top`] = String.raw`100px`;
  };
  this[String.raw`doSmilies`] = function (_0x3ea2b3) {
    selector[String.raw`hideWallet`]();
    let _0x10eb97 = this[String.raw`MainObj`] && this[String.raw`MainObj`][String.raw`AllPowers`] ? this[String.raw`MainObj`][String.raw`AllPowers`][0] : {};
    this[String.raw`Powers`] = function (_0x5bfd44) {
      let _0x515750 = [];
      for (var _0x2e2f6a in _0x5bfd44) {
        var _0x558465 = _0x2e2f6a * 32;
        for (var _0x488c9d = 0; _0x488c9d < 32; _0x488c9d++) {
          if (_0x5bfd44[_0x2e2f6a] & 1 << _0x488c9d) {
            _0x515750[_0x558465 + _0x488c9d] = 1;
          }
        }
      }
      return _0x515750;
    }(_0x10eb97);
    _0x3ea2b3 = this[String.raw`initPowers`]();
    let _0x50dd12 = _0x4242d9();
    _0x3ea2b3 ||= "";
    let _0x581b3a = _0x3ea2b3;
    _0x581b3a = _0x581b3a[String.raw`replace`](/\./g, ":");
    let _0x9f3b84 = _0x563f85(_0x581b3a, _0x50dd12);
    if (!_0x9f3b84[String.raw`sort`]) {
      _0x4d9196(0, 0, _0x9f3b84);
    }
    for (let _0x23b254 in _0x50dd12) {
      let _0x568e71;
      if (_0x9f3b84[_0x568e71 = _0x50dd12[_0x23b254][0]] && _0x9f3b84[_0x568e71] == _0x50dd12[_0x23b254][1] || _0x9f3b84[_0x568e71 = _0x50dd12[_0x23b254][1]]) {
        _0x4d9196(_0x568e71, _0x9f3b84[_0x568e71], _0x9f3b84);
      }
    }
    _0x4d9196("s", _0x9f3b84.s, _0x9f3b84);
  };
  this[String.raw`initPowers`] = function () {
    if (this[String.raw`MainObj`] && this[String.raw`MainObj`][String.raw`PowersMask`]) {
      this[String.raw`Mask`] = this[String.raw`MainObj`][String.raw`PowersMask`][0];
    } else {
      this[String.raw`Mask`] = null;
    }
    let _0x123e3a = document[String.raw`getElementById`](String.raw`search`);
    if (!_0x123e3a[String.raw`value`][String.raw`includes`](String.raw`:mem`)) {
      _0x123e3a[String.raw`value`] = "";
    }
    let _0x55a9fe = _0x4242d9();
    const _0x2bea49 = {
      [String.raw`epic`]: 1,
      [String.raw`function`]: 1,
      [String.raw`collection`]: 1,
      [String.raw`smiley`]: 1,
      [String.raw`other`]: 1
    };
    const _0x4b01ba = {
      [String.raw`standard`]: 1,
      [String.raw`smiley`]: 1,
      [String.raw`collection`]: 1,
      [String.raw`other`]: 1,
      [String.raw`epic`]: 1,
      [String.raw`function`]: 1
    };
    _0x123e3a[String.raw`value`] = _0x23cb95(_0x563f85(_0x123e3a[String.raw`value`], _0x55a9fe), _0x55a9fe);
    _0x123e3a[String.raw`oninput`] = _0x3e23f4;
    _0x123e3a[String.raw`onfocus`] = _0x5bb34f;
    removeClass(String.raw`d-none`, String.raw`searchBlock`);
    if (this[String.raw`Mask`]) {
      removeClass(String.raw`d-none`, String.raw`s__miss`);
      removeClass(String.raw`d-none`, String.raw`s__off`);
    } else {
      addClass(String.raw`d-none`, String.raw`s__miss`);
      addClass(String.raw`d-none`, String.raw`s__off`);
      _0x123e3a[String.raw`value`] = _0x123e3a[String.raw`value`][String.raw`replace`](String.raw`:miss`, "");
      _0x123e3a[String.raw`value`] = _0x123e3a[String.raw`value`][String.raw`replace`](String.raw`:off`, "");
    }
    this[String.raw`order`] = _0x2bea49;
    if (String.raw`Smilies` == _0x45c84f) {
      this[String.raw`order`] = _0x4b01ba;
      this[String.raw`Types`][String.raw`standard`] = String.raw`0,1,standard,10001,10002`;
      this[String.raw`Powers`][10001] = 1;
      this[String.raw`Powers`][10002] = 1;
      this[String.raw`pssa`][10002] = String.raw`yellows`;
      this[String.raw`pssa`][10003] = String.raw`others`;
    }
    this[String.raw`categories`] = {};
    for (let _0x704967 in this[String.raw`Types`]) {
      if (String.raw`standard` == _0x704967 && String.raw`Smilies` !== _0x45c84f) {
        continue;
      }
      let _0x1b1929 = this[String.raw`Types`][_0x704967][String.raw`split`](",");
      {
        let _0x5b94cc = _0x1b1929[2];
        if (!this[String.raw`categories`][_0x5b94cc]) {
          this[String.raw`categories`][_0x5b94cc] = {};
        }
        this[String.raw`categories`][_0x5b94cc][_0x704967] = _0x1b1929;
        if (!this[String.raw`order`][_0x5b94cc]) {
          this[String.raw`order`][_0x5b94cc] = 1;
        }
      }
    }
    this[String.raw`categories`][String.raw`epic`][String.raw`epic`][0] = 0;
    this[String.raw`Powers`][127] = 0;
    let _0x2ed705 = this[String.raw`categories`][String.raw`collection`];
    if (_0x2ed705) {
      let _0x16b974 = _0x2ed705[String.raw`supers`];
      delete _0x2ed705[String.raw`supers`];
      _0x2ed705[String.raw`supers`] = _0x16b974;
    }
    document[String.raw`getElementById`](String.raw`morebut`)[String.raw`onclick`] = _0x5485cf;
    window[String.raw`onclick`] = _0x5dcc8f => {
      if (String.raw`morebut` != _0x5dcc8f[String.raw`target`].id) {
        let _0x482caf = document[String.raw`getElementById`](String.raw`searchopts`);
        if (String.raw`block` == _0x482caf[String.raw`style`][String.raw`display`]) {
          _0x482caf[String.raw`style`][String.raw`display`] = String.raw`none`;
        }
      }
    };
    _0x5bb34f();
    let _0x28c2c3 = document[String.raw`querySelectorAll`](String.raw`.searchopt`);
    for (let _0x3832f5 = 0; _0x3832f5 < _0x28c2c3[String.raw`length`]; ++_0x3832f5) {
      _0x28c2c3[_0x3832f5][String.raw`onclick`] = _0x158a14;
    }
    this.Go = false;
    return _0x123e3a[String.raw`value`];
  };
  this[String.raw`startPowers`] = function () {
    if (!_0x52a4ae(String.raw`Powers`)) {
      removeClass(String.raw`d-none`, String.raw`s__mem`);
      GetXconsts(String.raw`selector`, [String.raw`SuperPowers`, String.raw`Types`, String.raw`pssa`, String.raw`end`], selector);
      document[String.raw`querySelector`](String.raw`.dropdown-content`)[String.raw`style`][String.raw`top`] = String.raw`calc(2.25rem + 2px)`;
      if (parent[String.raw`actions`][String.raw`Name`]) {
        _0x59b3a3(parent[String.raw`actions`][String.raw`Name`]);
      }
    }
  };
  let _0x416680 = false;
  let _0x48ffac = "";
  function _0xa01436(_0x9989fd, _0x2129e3) {
    let _0x111a30 = document[String.raw`getElementById`](_0x9989fd);
    if (_0x111a30) {
      _0x111a30[String.raw`innerHTML`] += _0x2129e3;
    }
  }
  function _0x4d9196(_0x2f99c4, _0x3e5f9f, _0x29411e, _0x531606) {
    let _0x37dadf = "";
    let _0x4c41a7 = selector[String.raw`pssa`][String.raw`length`];
    let _0x318f53 = [];
    let _0xd65361 = 0;
    let _0x4212ce = String.raw`Powers` == _0x45c84f;
    {
      let _0x17387e;
      let _0x4c832d;
      let _0x5ab4a8;
      let _0x4c3067 = 0;
      let _0x163ff4 = 1;
      switch (_0x2f99c4 + ":" + _0x3e5f9f) {
        case String.raw`sort:91`:
          _0x163ff4 = -1;
          _0x4c3067 = selector[String.raw`Powers`][String.raw`length`] - 1;
        case String.raw`sort:19`:
          for (_0x5ab4a8 = _0x4c3067; _0x17387e = selector[String.raw`Powers`][_0x5ab4a8], _0x4c832d = selector[String.raw`pssa`][1 + _0x5ab4a8], _0x17387e && _0xd65361++, _0x4c832d && (_0x37dadf += _0x8cc60(_0x5ab4a8, _0x4c832d, _0x17387e, _0x4212ce), _0x318f53[String.raw`push`](_0x4c832d)), _0x5ab4a8 += _0x163ff4, !(_0x5ab4a8 > _0x4c41a7) && !(_0x5ab4a8 <= 0););
          break;
        case String.raw`sort:za`:
          _0x163ff4 = 0;
        case String.raw`sort:az`:
          let _0x80c8c3 = [];
          for (_0x5ab4a8 = _0x4c3067; _0x17387e = selector[String.raw`Powers`][_0x5ab4a8], _0x4c832d = selector[String.raw`pssa`][1 + _0x5ab4a8], _0x17387e && _0xd65361++, _0x4c832d && (_0x80c8c3[String.raw`push`]([_0x4c832d, _0x8cc60(_0x5ab4a8, _0x4c832d, _0x17387e, _0x4212ce)]), _0x318f53[String.raw`push`](_0x4c832d)), _0x5ab4a8++, !(_0x5ab4a8 > _0x4c41a7););
          _0x80c8c3[String.raw`sort`](_0x163ff4 ? _0x29713b : _0x5c0df1);
          for (let _0x3cb44b in _0x80c8c3) {
            _0x37dadf += _0x80c8c3[_0x3cb44b][1];
          }
          break;
        case String.raw`:all`:
        case String.raw`on:true`:
        case String.raw`off:true`:
        case String.raw`miss:true`:
          return;
        default:
          if (_0x2f99c4 == "s") {
            _0x3e5f9f ||= "";
            let _0x19a53e;
            let _0x31c12a = _0x3e5f9f;
            _0x31c12a[String.raw`charAt`](0);
            let _0x59797e = _0x31c12a[String.raw`length`] <= 1;
            _0x31c12a = _0x31c12a[String.raw`toLowerCase`]();
            let _0x518c8a = 0;
            Object[String.raw`values`](document[String.raw`querySelectorAll`](String.raw`[data-sm]`))[String.raw`forEach`](_0xa80e9 => {
              let _0x1d0017 = _0xa80e9[String.raw`dataset`].sm;
              _0x19a53e = true;
              let _0x43c3ad = _0xa80e9[String.raw`dataset`].pn;
              while ((!_0x3e5f9f || (_0x19a53e = _0x59797e ? _0x1d0017[String.raw`startsWith`](_0x31c12a) : _0x1d0017[String.raw`indexOf`](_0x31c12a) >= 0, _0x19a53e)) && (!_0x29411e[String.raw`off`] || (_0x19a53e = selector[String.raw`Mask`][_0x43c3ad >> 5] & 1 << _0x43c3ad % 32, _0x19a53e))) {
                let _0x1f344e = !!selector[String.raw`Powers`][_0x43c3ad];
                if (_0x29411e[String.raw`miss`]) {
                  _0x19a53e = !_0x1f344e;
                  if (_0x43c3ad == _0x1d0017) {
                    _0x19a53e = false;
                  }
                  break;
                }
                if (_0x29411e[String.raw`all`]) {
                  break;
                }
                _0x19a53e = _0x1f344e;
                break;
              }
              if (!_0x19a53e) {
                _0x518c8a++;
              }
              _0xa80e9[String.raw`style`][String.raw`display`] = _0x19a53e ? null : String.raw`none`;
              if (!_0x19a53e && _0xa80e9[String.raw`parentNode`] && _0xa80e9[String.raw`parentNode`][String.raw`classList`][String.raw`contains`](String.raw`mainPower`)) {
                _0xa80e9[String.raw`parentNode`][String.raw`style`][String.raw`display`] = String.raw`none`;
              }
            });
            _0x18e311(_0x518c8a);
            _0x73ed3e();
            return;
          }
      }
    }
    if (!_0x531606) {
      if (_0x37dadf) {
        document[String.raw`getElementById`](String.raw`flexy`)[String.raw`innerHTML`] = String.raw`<div class="selectorContainer">` + _0x37dadf + String.raw`</div>`;
      } else {
        let _0xd62913 = !!selector[String.raw`Mask`];
        let _0x33ad60 = document[String.raw`getElementById`](String.raw`flexy`);
        _0x33ad60[String.raw`innerHTML`] = "";
        let _0x10e2e1 = _0x4212ce ? "" : String.raw`d-none`;
        for (let _0x4fcd5e in selector[String.raw`order`]) {
          let _0x1d8481 = 0;
          let _0x276544 = 0;
          _0x33ad60[String.raw`innerHTML`] += String.raw`<div id="` + _0x4fcd5e + String.raw`Container" class="selectorContainer sectionText ` + _0x10e2e1 + String.raw`" data-sub="` + _0x4fcd5e + "\">" + _0x4fcd5e + String.raw`</div>
            <div id="` + _0x4fcd5e + String.raw`Category" class="selectorContainer"></div>`;
          for (let _0x4305b2 in selector[String.raw`categories`][_0x4fcd5e]) {
            let _0x3fd222 = 0;
            let _0x38b19f = 0;
            document[String.raw`getElementById`](_0x4fcd5e + String.raw`Category`)[String.raw`innerHTML`] += String.raw`<div id="` + _0x4305b2 + String.raw`ScContainer" class="selectorContainer subSectionText" data-sub="` + _0x4305b2 + "\">" + _0x4305b2 + String.raw`</div>
              <div id="` + _0x4305b2 + String.raw`ScCategory" class="selectorContainer"></div>`;
            _0x37dadf = "";
            for (let _0x1c0a02 = 3;; _0x1c0a02++) {
              let _0x8a0c01 = parseInt(selector[String.raw`categories`][_0x4fcd5e][_0x4305b2][_0x1c0a02]);
              if (!_0x8a0c01 & _0x8a0c01 !== 0) {
                break;
              }
              let _0xecc7bf = selector[String.raw`Powers`][_0x8a0c01];
              _0x276544++;
              _0x38b19f++;
              if (_0xecc7bf) {
                _0x1d8481++;
                _0x3fd222++;
                _0xd65361++;
              }
              let _0xa37344 = selector[String.raw`pssa`][1 + _0x8a0c01];
              _0x37dadf += _0x8cc60(_0x8a0c01, _0xa37344, _0xecc7bf, _0x4212ce);
              _0x318f53[String.raw`push`](_0xa37344);
              let _0x4fd127 = String.raw`Smilies` == _0x45c84f ? 140 : 229;
              let _0x4216c4 = selector[String.raw`categories`][_0x4fcd5e][_0x4305b2][String.raw`length`] - 3;
              let _0x28d207 = Math[String.raw`round`](document[String.raw`body`][String.raw`clientWidth`] / _0x4fd127);
              if (_0x3fd222 == _0x4216c4 && _0x4216c4 % _0x28d207 > 0) {
                while (_0x4216c4 % _0x28d207 > 0) {
                  _0x37dadf += String.raw`<div class='selectorPow' style='width: ` + (String.raw`Smilies` == _0x45c84f ? 130 : parent[String.raw`Classic`] ? 200 : 160) + String.raw`px; margin: 0 auto;'></div>`;
                  _0x4216c4++;
                }
              }
            }
            _0xa01436(_0x4305b2 + String.raw`ScCategory`, _0x37dadf);
            if (_0xd62913) {
              _0xa01436(_0x4305b2 + String.raw`ScContainer`, " [" + _0x3fd222 + "/" + _0x38b19f + "]");
            }
          }
          if (_0xd62913) {
            _0xa01436(_0x4fcd5e + String.raw`Container`, " [" + _0x1d8481 + "/" + _0x276544 + "]");
          }
        }
      }
      if (!_0xd65361) {
        addClass(String.raw`d-none`, String.raw`flexy`);
        removeClass(String.raw`d-none`, String.raw`nopowers`);
        addClass(String.raw`d-none`, String.raw`searchBlock`);
        addClass(String.raw`d-none`, String.raw`nopowersfound`);
        addClass(String.raw`d-none`, String.raw`nopowersmissing`);
        return;
      }
      _0x73ed3e();
      _0x18e311();
      removeClass(String.raw`d-none`, String.raw`flexy`);
      addClass(String.raw`d-none`, String.raw`nopowers`);
      (function () {
        let _0x4c40b2 = xatdomain + String.raw`/images/smw/all/spritesheet.`;
        function _0x41317f(_0x233afa) {
          let _0x47f249 = document[String.raw`createElement`](String.raw`img`);
          _0x47f249[String.raw`src`] = _0x4c40b2 + String.raw`png?cb=` + _0x233afa[String.raw`cachebust`];
          _0x47f249[String.raw`Obj`] = _0x233afa;
          _0x47f249[String.raw`onload`] = function (_0x73455e) {
            let _0x8d1825 = _0x73455e[String.raw`target`][String.raw`Obj`];
            let _0x213cef = document[String.raw`querySelectorAll`](String.raw`.smwImage`);
            for (let _0x3608c6 = 0; _0x3608c6 < _0x213cef[String.raw`length`]; ++_0x3608c6) {
              let _0x12d190 = _0x213cef[_0x3608c6][String.raw`dataset`][String.raw`smw`];
              if (_0x8d1825[_0x12d190]) {
                _0x213cef[_0x3608c6][String.raw`style`][String.raw`background`] = String.raw`url(` + _0x47f249[String.raw`src`] + String.raw`) -` + _0x8d1825[_0x12d190][0] + String.raw`px -` + _0x8d1825[_0x12d190][1] + "px";
              } else {
                _0x12d190 = String.raw`url('https://rxat.ro/images/smw/` + _0x12d190 + String.raw`.png')`;
                _0x213cef[_0x3608c6][String.raw`style`][String.raw`background`] = _0x12d190;
              }
            }
          };
        }
        function _0x5af339(_0x553981) {}
        loadJSON(_0x4c40b2 + String.raw`php`, _0x41317f, _0x5af339);
      })();
      Object[String.raw`values`](_0x318f53)[String.raw`forEach`](_0x40ac7f => {
        let _0x4f8ac2 = document[String.raw`getElementById`](_0x40ac7f + String.raw`Image`);
        if (_0x4f8ac2) {
          _0x4f8ac2[String.raw`addEventListener`](String.raw`click`, _0x54f68c);
        }
        if (_0x4212ce) {
          _0x4f8ac2 = document[String.raw`getElementById`](_0x40ac7f + String.raw`Switch`);
          if (_0x4f8ac2) {
            _0x4f8ac2[String.raw`addEventListener`](String.raw`click`, selector[String.raw`clickSwitch`]);
          }
        } else {
          _0x4f8ac2 = document[String.raw`getElementById`](_0x40ac7f + String.raw`Text`);
          if (_0x4f8ac2) {
            _0x4f8ac2[String.raw`addEventListener`](String.raw`click`, _0x53b94f);
          }
        }
      });
      document[String.raw`querySelectorAll`](String.raw`.selectorPowText`)[String.raw`forEach`](_0x429454 => {
        if (_0x429454 && _0x429454[String.raw`dataset`] && _0x429454[String.raw`dataset`][String.raw`smw`]) {
          addToolTip(_0x429454, _0x429454[String.raw`dataset`][String.raw`smw`], {
            select: true,
            position: String.raw`low`
          });
        }
      });
    }
  }
  function _0x18e311(_0x2f3229) {
    if (!_0x2f3229) {
      return;
    }
    addClass(String.raw`d-none`, String.raw`nopowersmissing`);
    addClass(String.raw`d-none`, String.raw`nopowersfound`);
    let _0x37ee14 = document[String.raw`querySelector`](String.raw`#search`);
    let _0x132e4c = _0x37ee14 && String.raw`:miss` == _0x37ee14[String.raw`value`][String.raw`trim`]();
    let _0x58c362 = document[String.raw`querySelectorAll`](String.raw`[data-sm]`);
    let _0x4d5364 = document[String.raw`querySelector`](String.raw`#nopowers`);
    if (!_0x4d5364 || !!_0x4d5364[String.raw`classList`][String.raw`contains`](String.raw`d-none`)) {
      if (_0x58c362 && _0x58c362[String.raw`length`] == _0x2f3229) {
        removeClass(String.raw`d-none`, _0x132e4c ? String.raw`nopowersmissing` : String.raw`nopowersfound`);
      } else {
        addClass(String.raw`d-none`, _0x132e4c ? String.raw`nopowersmissing` : String.raw`nopowersfound`);
      }
    }
  }
  function _0x5485cf(_0x4f12f8) {
    let _0x566757 = document[String.raw`getElementById`](String.raw`searchopts`);
    _0x566757[String.raw`style`][String.raw`display`] = String.raw`none` == _0x566757[String.raw`style`][String.raw`display`] ? String.raw`block` : String.raw`none`;
  }
  function _0x5bb34f(_0x155334) {
    document[String.raw`getElementById`](String.raw`searchopts`)[String.raw`style`][String.raw`display`] = String.raw`none`;
  }
  function _0x158a14(_0x745b06) {
    if (_0x745b06) {
      _0x745b06[String.raw`stopPropagation`]();
    }
    let _0x3311d0 = document[String.raw`getElementById`](String.raw`search`)[String.raw`value`];
    _0x3311d0 = _0x3311d0[String.raw`replace`](/\./g, ":");
    let _0x894af7 = _0x4242d9();
    let _0x1b4a6c = _0x563f85(_0x3311d0, _0x894af7);
    let _0x47d3bf = _0x745b06[String.raw`currentTarget`].id;
    if (String.raw`s_clear` == _0x47d3bf) {
      _0x1b4a6c = {};
    } else {
      _0x47d3bf = _0x47d3bf[String.raw`split`]("_");
      if (_0x47d3bf[1]) {
        _0x1b4a6c[_0x47d3bf[1]] = _0x47d3bf[2];
      } else {
        _0x1b4a6c[_0x47d3bf[2]] = !_0x1b4a6c[_0x47d3bf[2]];
      }
    }
    _0x3311d0 = _0x23cb95(_0x1b4a6c, _0x894af7);
    document[String.raw`getElementById`](String.raw`search`)[String.raw`value`] = _0x3311d0;
    _0x5bb34f();
    selector[String.raw`doPowers`](_0x3311d0);
  }
  function _0x4242d9() {
    if (!selector[String.raw`keys`]) {
      let _0x12eb57 = [];
      let _0x1d55a5 = document[String.raw`querySelectorAll`](String.raw`.searchopt`);
      for (let _0x58571d = 0; _0x58571d < _0x1d55a5[String.raw`length`]; ++_0x58571d) {
        let _0x64e1b4 = _0x1d55a5[_0x58571d].id;
        _0x64e1b4 = _0x64e1b4[String.raw`split`]("_");
        if (_0x64e1b4[2]) {
          _0x12eb57[String.raw`push`]([_0x64e1b4[1], _0x64e1b4[2]]);
        }
      }
      selector[String.raw`keys`] = _0x12eb57;
    }
    return selector[String.raw`keys`];
  }
  function _0x563f85(_0x4e1b82, _0x389bb7) {
    let _0x38e58d = {};
    _0x4e1b82 = _0x4e1b82[String.raw`split`](" ");
    for (let _0x5b6a4a in _0x389bb7) {
      for (let _0x54cc9c in _0x4e1b82) {
        if (_0x4e1b82[_0x54cc9c][String.raw`includes`](":")) {
          let _0x1b9f75 = _0x4e1b82[_0x54cc9c][String.raw`toLowerCase`]()[String.raw`split`](":");
          if (_0x389bb7[_0x5b6a4a][0][String.raw`startsWith`](_0x1b9f75[0]) && _0x389bb7[_0x5b6a4a][1][String.raw`startsWith`](_0x1b9f75[1])) {
            if (_0x389bb7[_0x5b6a4a][0]) {
              _0x38e58d[_0x389bb7[_0x5b6a4a][0]] = _0x389bb7[_0x5b6a4a][1];
            } else {
              _0x38e58d[_0x389bb7[_0x5b6a4a][1]] = true;
            }
            break;
          }
        } else {
          _0x38e58d.s = _0x4e1b82[_0x54cc9c];
        }
      }
    }
    return _0x38e58d;
  }
  function _0x23cb95(_0x335605, _0x2356f6) {
    let _0x4ba223 = "";
    for (let _0x431185 in _0x2356f6) {
      let _0x1fd3ef = _0x2356f6[_0x431185][0];
      _0x1fd3ef ||= _0x2356f6[_0x431185][1];
      if (String.raw`string` == typeof _0x335605[_0x1fd3ef]) {
        if (_0x335605[_0x1fd3ef] == _0x2356f6[_0x431185][1]) {
          _0x4ba223 += _0x1fd3ef + ":" + _0x335605[_0x1fd3ef] + " ";
        }
      } else if (_0x335605[_0x1fd3ef]) {
        _0x4ba223 += ":" + _0x1fd3ef + " ";
      }
    }
    if (_0x335605.s) {
      _0x4ba223 += _0x335605.s;
    }
    return _0x4ba223;
  }
  function _0x8cc60(_0x20e614, _0x1cd94f, _0x3ab6c0, _0x185a22) {
    if (_0x1cd94f === undefined) {
      return "";
    }
    let _0xe2b9d3 = _0x1cd94f;
    let _0x481c8d = !selector[String.raw`Mask`] || !(selector[String.raw`Mask`][_0x20e614 >> 5] & 1 << _0x20e614 % 32);
    let _0x1345b7 = parent[String.raw`Classic`] ? 200 : 160;
    if (!_0x185a22) {
      if (!_0x481c8d) {
        return "";
      }
      _0x3ab6c0 = 1;
      _0x1345b7 = 130;
    }
    if (_0xe2b9d3[String.raw`length`] > 7 && _0x3ab6c0 > 1) {
      _0xe2b9d3 = _0xe2b9d3[String.raw`substr`](0, 7) + String.raw`...`;
    }
    if (_0x3ab6c0 > 1) {
      _0xe2b9d3 += " [" + _0x3ab6c0 + "]";
    }
    let _0x4ca779 = String.raw`<div id="` + _0x1cd94f + String.raw`Container" class="selectorPow ` + (_0x3ab6c0 ? "" : String.raw`grayout`) + String.raw`" data-sm="` + _0x1cd94f + String.raw`" data-pn="` + _0x20e614 + String.raw`" style="width: ` + _0x1345b7 + String.raw`px;">
<div id="` + _0x1cd94f + String.raw`Image" class="selectorPowImage smwImage" data-smw="` + _0x1cd94f + String.raw`" style="width: 30px; height: 30px;"></div>
<div id="` + _0x1cd94f + String.raw`Text" class="selectorPowText ` + (_0x3ab6c0 ? "" : String.raw`grayout`) + String.raw`" data-smw="` + _0x1cd94f + "\">" + _0xe2b9d3 + String.raw`</div>`;
    if (selector[String.raw`Mask`] && _0x3ab6c0 && _0x185a22) {
      _0x4ca779 += String.raw`<div id="` + _0x1cd94f + String.raw`Switch" class="svgBack ` + (_0x481c8d ? String.raw`poweron` : String.raw`poweroff`) + String.raw`" data-pn="` + _0x20e614 + String.raw`"></div>`;
    }
    _0x4ca779 += String.raw`</div>`;
    return _0x4ca779;
  }
  this[String.raw`doPowers`] = function (_0x1232a2) {
    if (_0x3f16ff) {
      _0x3f16ff[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
    if (this.Go) {
      _0x416680 = false;
      _0x1232a2 = this[String.raw`initPowers`]();
    }
    let _0x3f4370 = _0x4242d9();
    _0x1232a2 ||= "";
    let _0x5b1a37 = _0x1232a2;
    _0x5b1a37 = _0x5b1a37[String.raw`replace`](/\./g, ":");
    let _0x5a3f99 = _0x563f85(_0x5b1a37, _0x3f4370);
    if (String.raw`Smilies` == _0x45c84f && _0x5a3f99.s[String.raw`length`] < 1) {
      _0x416680 = false;
    }
    if (_0x5a3f99.s[String.raw`length`] > 2 && String.raw`Smilies` == _0x45c84f) {
      (function (_0x2cb742) {
        let _0x53e033;
        let _0x1a2e66 = [];
        const _0x468543 = {
          [String.raw`Tabs`]: 1,
          [String.raw`stiff`]: 1,
          [String.raw`searchBlock`]: 1
        };
        selector[String.raw`clear`](_0x468543);
        for (let _0x5ba3f0 in selector[String.raw`topsh`]) {
          if (_0x5ba3f0[String.raw`search`](_0x2cb742) < 0) {
            continue;
          }
          if (_0x1e1f13(selector[String.raw`topsh`][_0x5ba3f0])) {
            _0x1a2e66[String.raw`push`](_0x5ba3f0);
          }
        }
        _0x53e033 = selector[String.raw`syel`] + "," + selector[String.raw`soth`];
        _0x53e033 = _0x53e033[String.raw`split`](",");
        for (let _0x5dc02d in _0x53e033) {
          if (!(_0x53e033[_0x5dc02d][String.raw`search`](_0x2cb742) < 0)) {
            _0x1a2e66[String.raw`push`](_0x53e033[_0x5dc02d]);
          }
        }
        for (let _0x2fd26b in selector[String.raw`pssa`]) {
          if (selector[String.raw`pssa`][_0x2fd26b][String.raw`toString`]()[String.raw`search`](_0x2cb742) < 0) {
            continue;
          }
          if (_0x1e1f13(xInt(_0x2fd26b) - 1)) {
            _0x1a2e66[String.raw`push`](selector[String.raw`pssa`][_0x2fd26b]);
          }
        }
        clearDiv(String.raw`flexy`);
        let _0x4ca2a5 = clearDiv(String.raw`stiff`);
        for (let _0x2ececd in _0x1a2e66) {
          _0x1a3622(_0x4ca2a5, _0x1a2e66[_0x2ececd], _0x572edf);
        }
      })(_0x5a3f99.s);
    } else {
      if (_0x48ffac !== "" && !_0x5a3f99[String.raw`sort`]) {
        _0x416680 = false;
        _0x48ffac = "";
      }
      if (!_0x5a3f99[String.raw`sort`]) {
        _0x4d9196(0, 0, _0x5a3f99, _0x416680);
        if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
          document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`59%`;
        }
      }
      for (let _0x1bb102 in _0x3f4370) {
        let _0x50b73d;
        if (_0x5a3f99[_0x50b73d = _0x3f4370[_0x1bb102][0]] && _0x5a3f99[_0x50b73d] == _0x3f4370[_0x1bb102][1] || _0x5a3f99[_0x50b73d = _0x3f4370[_0x1bb102][1]]) {
          _0x4d9196(_0x50b73d, _0x5a3f99[_0x50b73d], _0x5a3f99);
        }
      }
      _0x4d9196("s", _0x5a3f99.s, _0x5a3f99);
      _0x416680 ||= true;
      _0x48ffac = _0x5a3f99[String.raw`sort`] || "";
    }
  };
  let _0x4a0486 = false;
  function _0x3e23f4(_0x2fa434) {
    _0x4a0486 = true;
    let _0x53e6d5 = _0x2fa434[String.raw`target`][String.raw`value`][String.raw`toLowerCase`]();
    selector[String.raw`doPowers`](_0x53e6d5);
  }
  function _0x73ed3e() {
    let _0x4276ec;
    let _0x1e327c;
    let _0x18bae4;
    for (let _0x2bd226 in selector[String.raw`categories`]) {
      _0x1e327c = 0;
      for (let _0x57b357 in selector[String.raw`categories`][_0x2bd226]) {
        _0x4276ec = 0;
        _0x18bae4 = document[String.raw`getElementById`](_0x57b357 + String.raw`ScCategory`);
        if (_0x18bae4) {
          _0x18bae4[String.raw`childNodes`][String.raw`forEach`](function (_0xa3ae50) {
            if (String.raw`none` !== _0xa3ae50[String.raw`style`][String.raw`display`] && _0xa3ae50[String.raw`dataset`].pn) {
              _0x4276ec++;
            }
          });
          _0x18bae4 = document[String.raw`getElementById`](_0x57b357 + String.raw`ScContainer`);
          if (String.raw`standard` == _0x2bd226) {
            _0x4276ec = 1;
          }
          if (_0x18bae4) {
            _0x18bae4[String.raw`style`][String.raw`display`] = _0x4276ec > 0 ? null : String.raw`none`;
          }
          _0x1e327c += _0x4276ec;
        }
      }
      _0x18bae4 = document[String.raw`getElementById`](_0x2bd226 + String.raw`Container`);
      if (_0x18bae4) {
        _0x18bae4[String.raw`style`][String.raw`display`] = _0x1e327c > 0 ? null : String.raw`none`;
      }
    }
  }
  function _0x29713b(_0x1ce359, _0x570e36) {
    if (_0x1ce359[0] < _0x570e36[0]) {
      return -1;
    } else if (_0x1ce359[0] > _0x570e36[0]) {
      return 1;
    } else {
      return 0;
    }
  }
  function _0x5c0df1(_0x75e280, _0x3f7aad) {
    if (_0x75e280[0] > _0x3f7aad[0]) {
      return -1;
    } else if (_0x75e280[0] < _0x3f7aad[0]) {
      return 1;
    } else {
      return 0;
    }
  }
  function _0x54f68c(_0x23c7ee) {
    if (String.raw`Smilies` != _0x45c84f) {
      HitWiki(_0x23c7ee[String.raw`target`][String.raw`dataset`][String.raw`smw`]);
    } else {
      _0x53b94f(_0x23c7ee);
    }
  }
  function _0x52a4ae(_0x180178) {
    let _0x37e831 = new Date()[String.raw`getTime`]();
    if (_0x180178 != _0x45c84f) {
      _0x345588 = -1000000;
    }
    _0x45c84f = _0x180178;
    return _0x37e831 - _0x345588 < 500 || (_0x345588 = _0x37e831, false);
  }
  function _0x1e1f13(_0x137d3e) {
    let _0x10c67e = 0;
    if (_0x137d3e < 0) {
      _0x10c67e = 1;
      _0x137d3e = -_0x137d3e;
    }
    let _0x2f75ea = _0x137d3e >> 5;
    if (_0x137d3e < 0) {
      _0x2f75ea = -1;
    }
    let _0x33ec55;
    let _0x12b374 = _0x137d3e % 32;
    _0x33ec55 = _0x10c67e ? xInt(selector[String.raw`w_GroupPowers`][_0x2f75ea]) : xInt(selector[String.raw`w_Powers`][_0x2f75ea]);
    return (_0x33ec55 & 1 << _0x12b374) != 0;
  }
  this[String.raw`clickSwitch`] = function (_0x25a4ba) {
    if (!selector[String.raw`Mask`]) {
      return;
    }
    let _0x1fecd4 = _0x25a4ba[String.raw`target`][String.raw`classList`][String.raw`contains`](String.raw`poweron`);
    _0x25a4ba[String.raw`target`][String.raw`classList`] = _0x1fecd4 ? String.raw`poweroff` : String.raw`poweron`;
    const _0x3e7727 = {
      [String.raw`Page`]: String.raw`selector`,
      [String.raw`Command`]: String.raw`SetPower`
    };
    var _0x1296fb = _0x3e7727;
    let _0x4e9dc0 = _0x25a4ba[String.raw`target`][String.raw`dataset`].pn;
    selector[String.raw`Mask`][_0x4e9dc0 >> 5] = selector[String.raw`Mask`][_0x4e9dc0 >> 5] & ~(1 << _0x4e9dc0 % 32) | (_0x1fecd4 ? 1 : 0) * (1 << _0x4e9dc0 % 32);
    _0x1296fb[String.raw`Value`] = _0x1fecd4 ? 1 : 0;
    _0x1296fb.Id = _0x25a4ba[String.raw`target`][String.raw`dataset`].pn;
    selector[String.raw`ReLogin`] = true;
    ToC(_0x1296fb);
  };
  let _0x298431 = document[String.raw`getElementById`](String.raw`SmBut`);
  if (_0x298431) {
    _0x298431[String.raw`addEventListener`](String.raw`click`, this[String.raw`startSmilies`]);
  }
  let _0x35d00e = document[String.raw`getElementById`](String.raw`StickBut`);
  if (_0x35d00e) {
    _0x35d00e[String.raw`addEventListener`](String.raw`click`, this[String.raw`stickers`]);
  }
  let _0x6110c9 = document[String.raw`getElementById`](String.raw`KissBut`);
  if (_0x6110c9) {
    _0x6110c9[String.raw`addEventListener`](String.raw`click`, () => {
      const _0x56569d = {
        [String.raw`Tabs`]: 1
      };
      selector[String.raw`clear`](_0x56569d);
      this[String.raw`doKisses`]();
    });
  }
  let _0x4a7fd8 = document[String.raw`getElementById`](String.raw`GiftsBut`);
  function _0x29956d() {
    window[String.raw`parent`][String.raw`setFrameVis`]();
  }
  function _0x59b3a3(_0x1ab4c7) {
    let _0x5786ce = window[String.raw`parent`][String.raw`document`][String.raw`getElementById`](String.raw`FrameDialogTitle`);
    if (_0x5786ce) {
      window[String.raw`parent`][String.raw`clearDiv`](0, _0x5786ce);
      window[String.raw`parent`][String.raw`addText`](_0x5786ce, _0x1ab4c7);
    } else {
      addTitleBar(_0x1ab4c7, "", null, true, _0x29956d);
    }
  }
  function _0x172df9(_0x18b3a3, _0x52c69e) {
    let _0x3c44bf = document[String.raw`querySelector`](_0x52c69e ? "#" + _0x52c69e : String.raw`#loading`);
    if (_0x3c44bf) {
      if (_0x18b3a3) {
        _0x3c44bf[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
        _0x3c44bf[String.raw`innerHTML`] = String.raw`<div id="xatLoader"><div id="xatLoaderInner"><img id="planet" src="svg/x.svg"><img id="rocket" src="svg/ss.svg"></div></div>`;
      } else {
        _0x3c44bf[String.raw`classList`][String.raw`add`](String.raw`d-none`);
        _0x3c44bf[String.raw`innerHTML`] = "";
      }
    }
  }
  function _0x47ffe9() {
    let _0x31b87b = document[String.raw`querySelector`](String.raw`.walletInfos`);
    let _0x217e64 = document[String.raw`querySelector`](String.raw`#wallet_days`);
    let _0x257e24 = document[String.raw`querySelector`](String.raw`#wallet_xats`);
    if (function (_0x172100, _0x1e2463) {
      return _0x172100 && _0x1e2463;
    }(_0x31b87b, _0x217e64) && _0x257e24) {
      let _0x1942d7 = selector[String.raw`MainObj`];
      if (!_0x1942d7) {
        return;
      }
      _0x1942d7 = _0x1942d7[String.raw`main`];
      if (_0x1942d7[String.raw`length`]) {
        let _0x128376 = null;
        for (let _0x320e35 in _0x1942d7) {
          if (_0x1942d7[_0x320e35][String.raw`name`] && _0x1942d7[_0x320e35][String.raw`name`][String.raw`match`](/\d+/g)) {
            _0x128376 = _0x1942d7[_0x320e35][String.raw`name`];
          }
        }
        if (_0x128376) {
          _0x128376 = _0x128376[String.raw`split`](", ");
          _0x257e24[String.raw`innerHTML`] = "";
          _0x217e64[String.raw`innerHTML`] = "";
          let _0x155879 = makeElement(_0x257e24, String.raw`img`);
          _0x155879[String.raw`src`] = String.raw`svg/actBuyXats.svg`;
          _0x155879[String.raw`style`][String.raw`width`] = String.raw`30px`;
          makeElement(_0x257e24, String.raw`span`)[String.raw`innerHTML`] = _0x128376[0][String.raw`replace`](String.raw`xat`, String.raw`xat`);
          let _0x11cad1 = makeElement(_0x217e64, String.raw`img`);
          _0x11cad1[String.raw`src`] = String.raw`svg/star.svg`;
          _0x11cad1[String.raw`style`][String.raw`cssText`] = String.raw`width:30px;vertical-align:-8px!important`;
          makeElement(_0x217e64, String.raw`span`)[String.raw`innerHTML`] = _0x128376[1];
          _0x31b87b[String.raw`classList`][String.raw`remove`](String.raw`d-none`);
        }
      }
    }
  }
  if (_0x4a7fd8) {
    _0x4a7fd8[String.raw`addEventListener`](String.raw`click`, () => {
      this[String.raw`gifts`]();
    });
  }
  this[String.raw`clear`] = function (_0x1bb7f5) {
    _0x1bb7f5 ||= {};
    clearDiv(String.raw`flexy`);
    clearDiv(String.raw`stiff`);
    const _0x40b32b = [String.raw`AreYouABot`, String.raw`SignUp`, String.raw`LoginRegEtc`, String.raw`LoginForm`, String.raw`ResetPassword`, String.raw`RegisterOK`, String.raw`LogoutOK`, String.raw`RegisterDialog`, String.raw`stiff`, String.raw`flexy`, String.raw`nopowers`, String.raw`nopowersfound`, String.raw`nopowersmissing`, String.raw`messageBlock`, String.raw`Tabs`, String.raw`searchBlock`, String.raw`stickMessageBlock`, String.raw`FrontId`];
    for (let _0x2d6316 in _0x40b32b) {
      let _0x4e3bf8 = _0x40b32b[_0x2d6316];
      if (_0x1bb7f5[_0x4e3bf8]) {
        removeClass(String.raw`d-none`, _0x4e3bf8);
        parent[String.raw`removeClass`](String.raw`d-none`, String.raw`Overlays`);
      } else {
        addClass(String.raw`d-none`, _0x4e3bf8);
      }
    }
    removeClass(String.raw`active`, String.raw`SmBut`);
    removeClass(String.raw`active`, String.raw`KissBut`);
    removeClass(String.raw`active`, String.raw`StickBut`);
    removeClass(String.raw`active`, String.raw`GiftsBut`);
    modalClose();
    _0x872dfa();
  };
  this[String.raw`GetXconst`] = function (_0x30ca4b, _0x2ea4a6) {
    let _0x2a20d5;
    try {
      _0x2a20d5 = JSON[String.raw`parse`](_0x2ea4a6);
    } catch (_0x2bef00) {
      _0x2a20d5 = _0x2ea4a6;
    }
    this[_0x30ca4b] = _0x2a20d5;
    if (String.raw`end` == _0x30ca4b) {
      switch (_0x45c84f) {
        case String.raw`Smilies`:
          selector[String.raw`doSmilies`]();
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0 && xrRoot[String.raw`xrClassic`]) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`3.3%`;
          }
          if (!xrRoot[String.raw`xrClassic`]) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`72%`;
          }
          break;
        case String.raw`Powers`:
          selector[String.raw`doPowers`]();
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0 && xrRoot[String.raw`xrClassic`]) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`3.3%`;
          }
          break;
        case String.raw`Sticker`:
          _0x172df9(true);
          loadJSON(chatUrl + String.raw`sticker.php?a=1`, _0x3e00a4);
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`53%`;
          }
          break;
        case String.raw`Kiss`:
          selector[String.raw`doKisses2`]();
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`25%`;
          }
          break;
        case String.raw`Gifts`:
          selector[String.raw`gotGifts1`]();
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`88%`;
          }
          break;
        case String.raw`BuyGifts`:
          loadJSON(String.raw`https://rxat.ro/web_gear/chat/gift2.php?v2=1`, _0x877a0e);
          if (navigator[String.raw`userAgent`][String.raw`indexOf`](String.raw`Firefox`) > 0) {
            document[String.raw`querySelector`](String.raw`.powersScroll`)[String.raw`style`][String.raw`height`] = String.raw`88%`;
          }
      }
    }
  };
  this[String.raw`hideWallet`] = function () {
    let _0x1fe2a4 = document[String.raw`querySelector`](String.raw`.walletInfos`);
    if (_0x1fe2a4) {
      _0x1fe2a4[String.raw`classList`][String.raw`add`](String.raw`d-none`);
    }
  };
  this[String.raw`initLang`] = function (_0x2c0eb5) {};
}();
xrRoot[String.raw`selector`] = selector;
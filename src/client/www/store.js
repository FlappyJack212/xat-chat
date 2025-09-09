'use strict';

// Use global variables to avoid conflicts
window.page = window.page || 'store';
let tab;
let tempFeature = [];

// Only run if not already initialized and DOM is ready
if (!window.storeInitialized && document.body) {
    document.body.style.backgroundColor = "white";
    document.body.classList.remove("invisible");
    if (typeof $ !== 'undefined') {
        $("#navGroup,#navxatApps").addClass("d-none");
    }
    if (typeof Reset === 'function') {
        Reset();
    }
    if (typeof initConfig === 'function') {
        initConfig();
    }
    window.storeInitialized = true;
}
readUser();
setUser();
initLanguage();
initAuser3();
navClickHandlers();
startAnalytics();
setLoggedin();
legacyLinks();
cookieBar();
localize(["buy"]);
fetchPromo();
setLogo();
let storeCommom = $("#CommonDiv").html();
function DoTask(_0x5e9ad3) {
  switch (_0x5e9ad3) {
    case "promotion":
    case "ads":
      DoPromo(_0x5e9ad3);
      break;
    case "group":
      DoBuyGroup();
      break;
    case "shortname":
      DoShortName();
      break;
    case "buyxats":
      DoBuyXats();
      break;
    case "auction":
      DoAuction();
      break;
    case "days2xats":
      doDx();
      break;
    case "xats2days":
      doX2d();
      break;
    case "powers":
    default:
      _0x5e9ad3 = "powers";
      DoBuyPowers();
      updateTotalPrice();
      doLoadCollections();
  }
  page = _0x5e9ad3;
  $(".NavTabs").removeClass("active");
  $("#tab" + _0x5e9ad3).addClass("active");
}
function DoRelogin(_0x1f71f9) {
  let _0x13f7d8 = $("#username").val();
  let _0x28c080 = $("#password").val();
  Reset();
  _0x1f71f9.Finished;
  for (let _0x5b897c in _0x1f71f9) {
    if (_0x5b897c != "ReLogin" && _0x5b897c != "Finished") {
      _0x1f71f9 = _0x1f71f9[_0x5b897c];
      break;
    }
  }
  $("#relogin").removeClass("d-none");
  $("#reloginerr").html(_0x1f71f9);
  localize();
  let _0x29e419 = commonPost();
  _0x29e419.NameEmail = _0x13f7d8;
  _0x29e419.password = _0x28c080;
  _0x29e419.Login = 1;
  $(document.body).css({
    cursor: "wait"
  });
  urlPost("https://rxat.ro/web_gear/chat/register4.php", _0x29e419).then(function (_0x553359) {
    $(document.body).css({
      cursor: "default"
    });
    if (_0x553359.Err.todo) {
      localStorage.setItem("todo", "{}");
    }
    SetNewTodo(_0x553359.Err.todo);
    $("#LoginResult").html("");
  });
}
function DoAuction() {
  Reset();
  $("#auction").removeClass("d-none");
  if (!$("#auctionextra").html()) {
    $("#auctionextra").html(storeCommom);
  }
  $("#auctionbut").off("click").click(function (_0x52e364) {
    _0x52e364.preventDefault();
    let _0x355f65 = commonPost();
    if (!soltodo.w_registered) {
      $("#bid").css("display", "none");
      DoErrs({
        Err: {
          auction: "<span data-localize=buy.sorryyou>Sorry you must be a registered user to use auction</span>."
        }
      });
      localize();
      return;
    }
    $("#username").val(soltodo.w_registered);
    $("#username").attr("disabled", true);
    _0x355f65.DesiredID = $("#DesiredID").val();
    if (_0x355f65.DesiredID) {
      _0x355f65.EnterBid = 1;
    }
    _0x355f65.StartingBid = $("#StartingBid").val();
    _0x355f65.YourEmail = soltodo.w_registered;
    if (GET.params.old) {
      _0x355f65.old = 1;
    }
    if ($("#Transfer")) {
      _0x355f65.Transfer = $("#Transfer").val();
    }
    urlPost("https://rxat.ro/web_gear/chat/Auction2.php", _0x355f65).then(function (_0x46fc62) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      DoErrs(_0x46fc62, "auction");
      if (_0x46fc62.Err.TransferOpts) {
        var _0x1f9a44 = document.getElementById("TransferOptserr");
        var _0x23917a = document.getElementById("Transfer");
        if (_0x23917a) {
          _0x23917a.classList += " form-control mt-3";
        }
        if (_0x1f9a44) {
          _0x1f9a44.innerHTML = _0x1f9a44.innerHTML.replace(/<br>/gi, " ");
        }
      }
      let _0x162e5e;
      if (_0x46fc62.Err.auctiontable) {
        $(".bid").click(BidClicked);
      }
      if (_0x46fc62.Err.auctionchoose) {
        _0x162e5e = "#auctionchooseerr";
      }
      if (_0x162e5e) {
        $("html, body").animate({
          scrollTop: $(_0x162e5e).offset().top
        });
      }
      localize();
    });
  }).trigger("click");
}
function BidClicked(_0x4d7d36) {
  let _0x1b6ae0 = $(_0x4d7d36.target).data();
  $("#StartingBid").val(_0x1b6ae0.bid);
  $("#DesiredID").val(_0x1b6ae0.id);
}
function DoBuyXats() {
  Reset();
  $("#buyxats").removeClass("d-none");
  if (GET.params.c) {
    $("#buythanks").removeClass("d-none");
    return;
  }
  if ($("#buyform").html()) {
    return;
  }
  let _0x16e6f7 = commonPost();
  if (!soltodo.w_registered) {
    DoErrs({
      Err: {
        buyxats: "<span data-localize=buy.sorryyouBuy>Sorry you must be a registered user to buy xats and days</span>."
      }
    });
    localize();
    return;
  }
  _0x16e6f7.UserId = soltodo.w_userno;
  urlPost("https://rxat.ro/web_gear/chat/buy2.php", _0x16e6f7).then(function (_0x30d14d) {
    $(document.body).css({
      cursor: "default"
    });
    allErrsOff();
    if (_0x30d14d.Err.buytable) {
      $("#buyform").html(_0x30d14d.Err.buytable);
      $("#abouttobuy").removeClass("d-none");
      $("#buyuser").text(soltodo.w_registered + " (" + soltodo.w_userno + ")");
    }
    DoErrs(_0x30d14d, "buyxats");
    localize();
  });
}
var Sections3;
function DoBuyPowers() {
  Reset();
  Sections3 = ["Standard", "Rare", "Epic", "Group", "Games", "Collection", "All"];
  tab = "All";
  $("#powers").removeClass("d-none");
  $(".PowTabs").removeClass("active");
  $("#bpAll").addClass("active");
  $("#buypowersextra").html(storeCommom || "");
  preSetUsername();
  let _0x45c662 = "/api/proxy/web_gear/chat/GetPowers2.php";
  $("#buypowersbut").off("click").click(function (_0x425b2a) {
    _0x425b2a.preventDefault();
    let _0x457d6f = commonPost();
    $("input[name^=pnum]").each(function (_0x1e648e) {
      if ($(this).val()) {
        _0x457d6f[$(this).prop("name")] = $(this).val();
      }
    });
    $("input[name^=pchk]").each(function (_0x3ab9f4) {
      let _0x26cfec = "pnum" + $(this).prop("name").substr(4);
      if ($(this).prop("checked") && _0x457d6f[_0x26cfec] < 1) {
        _0x457d6f[_0x26cfec] = 1;
      }
    });
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(_0x45c662, _0x457d6f).then(function (_0x483d85) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0x483d85.Err.ReLogin) {
        DoRelogin(_0x483d85.Err);
      } else {
        DoErrs(_0x483d85, "buypowers");
        if (tab !== "Collection") {
          configureStorePage(tab, 0, _0x483d85.Err.remaining);
        }
        localize();
      }
    });
  });
  urlPost("/api/proxy/json/powers.php?cb=" + getStoreCache()).then(function (_0x4ab194) {
    const _0x1957b4 = {
      update: 1
    };
    urlPost(_0x45c662, _0x1957b4).then(function (_0x3eff65) {
      configureStorePage(tab, _0x4ab194, _0x3eff65.Err.remaining);
    });
  });
  let _0x28d3a3 = "";
  for (let _0x3e2480 in Sections3) {
    _0x28d3a3 = _0x28d3a3 + ",#bp" + Sections3[_0x3e2480];
  }
  $(_0x28d3a3.substr(1)).off("click").click(function (_0x191838) {
    if ((tab = _0x191838.currentTarget.id.substr(2)) !== "Collection") {
      $(".PowTabs").removeClass("active");
      $("#bp" + tab).addClass("active");
      configureStorePage(tab);
    }
  });
  $("#morebut").off("click").click(() => {
    let _0x19339b = document.getElementById("searchopts");
    if (_0x19339b) {
      _0x19339b.style.display = _0x19339b.style.display == "none" || _0x19339b.style.display == "" ? "block" : "none";
    }
    getFilter();
  });
  $(window).off("click").click(_0x8b1fcc => {
    if (!_0x8b1fcc.target.matches("#morebut")) {
      let _0x397a51 = document.getElementById("searchopts");
      if (_0x397a51 && _0x397a51.style.display == "block") {
        _0x397a51.style.display = "none";
      }
    }
  });
  document.querySelectorAll("[data-option='true']").forEach(_0x13d5d6 => {
    _0x13d5d6.addEventListener("click", () => {
      let _0x2faf75 = [];
      Sorting = _0x13d5d6.id;
      if (_0x13d5d6.id == "clear") {
        $("#search").val("");
      }
      if (typeof PowerObj == "object") {
        _0x2faf75 = $.map(PowerObj, function (_0xef341b, _0x4ec221) {
          let _0x177c48 = _0xef341b;
          _0x177c48.id = _0x4ec221;
          return _0x177c48;
        });
        if ($("input[name=\"save_filter\"]").is(":checked")) {
          setFilter(Sorting);
        }
        sortPowers(_0x2faf75 = Object.keys(tempFeature).length > 0 && tab == "Featured" ? tempFeature : _0x2faf75);
        addPowers(_0x2faf75);
      }
    });
  });
  $("input[name=\"save_filter\"]").on("change", function () {
    if ($(this).is(":checked")) {
      setFilter(Sorting);
    } else {
      setFilter("");
      $(this).prop("checked", false);
    }
  });
  $(document).on("keyup click", "input[name^=pnum]", function (_0x5484f9) {
    var _0x235683 = parseInt(_0x5484f9.target.name.replace("pnum", ""));
    var _0x359aae = _0x5484f9.target.value;
    $.each(Powers, function (_0x41056d, _0x4bc211) {
      if (_0x4bc211 != null && _0x4bc211.id == _0x235683) {
        _0x4bc211.quantityStore = _0x359aae == 0 && $("input[name=pchk" + _0x235683 + "]").is(":checked") ? 1 : _0x359aae;
        updateTotalPrice();
      }
    });
  });
  $(document).on("click", "input[name^=pchk]", function () {
    var _0x517418 = parseInt($(this)[0].name.replace("pchk", ""));
    var _0x6c083a = !!$(this).is(":checked");
    var _0x1e30c0 = $("input[name=\"pnum" + _0x517418 + "\"]").val();
    $.each(Powers, function (_0x2c494e, _0x2c38ad) {
      if (_0x2c38ad != null && _0x2c38ad.id == _0x517418) {
        _0x2c38ad.s;
        _0x2c38ad.checked = _0x6c083a;
        _0x2c38ad.quantityStore = _0x6c083a && _0x1e30c0 == 0 ? 1 : _0x1e30c0;
        updateTotalPrice();
      }
    });
  });
  $("#search").keyup(() => {
    let _0x459f76 = [];
    let _0x7a2906 = $("#search").val().toLowerCase();
    for (let _0x210c6d in PowerObj) {
      if (PowerObj.hasOwnProperty(_0x210c6d) && (PowerObj[_0x210c6d].s.substring(0, _0x7a2906.length) == _0x7a2906 || PowerObj[_0x210c6d].s.indexOf(_0x7a2906) > 0)) {
        if (tab == "Featured") {
          if (PowerObj[_0x210c6d].r != 1 || PowerObj[_0x210c6d].f & 4096) {
            _0x459f76.push(PowerObj[_0x210c6d]);
          }
        } else {
          _0x459f76.push(PowerObj[_0x210c6d]);
        }
      }
    }
    if (_0x459f76.length > 0 && _0x7a2906.length > 0) {
      addPowers(_0x459f76);
    } else if (_0x7a2906.length > 0) {
      var _0x13027d = document.getElementById("powerslist");
      _0x13027d.innerHTML = "";
      let _0x17e31c = makeElement(_0x13027d, "span", "textInfo");
      addText(_0x17e31c, ["buy.nopowers", "No powers found."]);
    } else {
      configureStorePage(tab);
    }
  });
}
function a0_1x5ef0(_0x361c7f, _0x5aabf2) {
  _0x361c7f = _0x361c7f - 141;
  let _0x53b470 = a0_1x410f[_0x361c7f];
  if (a0_1x5ef0.ygbhMY === undefined) {
    const _0x118247 = function (_0x1d3037, _0xe4bf6a) {
      let _0x48876b;
      let _0x57d05e;
      let _0x4c72b0 = [];
      let _0x4c3e96 = 0;
      let _0x50fdee = "";
      let _0x33e3db = "";
      for (let _0x5c23c5 = 0, _0x52b48c = (_0x1d3037 = function (_0x53ffda) {
          let _0x43161f = "";
          for (let _0x4d74e3, _0x8cd117, _0x55d873 = 0, _0x2989d4 = 0; _0x8cd117 = _0x53ffda.charAt(_0x2989d4++); ~_0x8cd117 && (_0x4d74e3 = _0x55d873 % 4 ? _0x4d74e3 * 64 + _0x8cd117 : _0x8cd117, _0x55d873++ % 4) ? _0x43161f = _0x43161f + String.fromCharCode(_0x4d74e3 >> (_0x55d873 * -2 & 6) & 255) : 0) {
            _0x8cd117 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(_0x8cd117);
          }
          return _0x43161f;
        }(_0x1d3037)).length; _0x5c23c5 < _0x52b48c; _0x5c23c5++) {
        _0x33e3db = _0x33e3db + "%" + ("00" + _0x1d3037.charCodeAt(_0x5c23c5).toString(16)).slice(-2);
      }
      _0x1d3037 = decodeURIComponent(_0x33e3db);
      _0x57d05e = 0;
      for (; _0x57d05e < 256; _0x57d05e++) {
        _0x4c72b0[_0x57d05e] = _0x57d05e;
      }
      for (_0x57d05e = 0; _0x57d05e < 256; _0x57d05e++) {
        _0x4c3e96 = (_0x4c3e96 + _0x4c72b0[_0x57d05e] + _0xe4bf6a.charCodeAt(_0x57d05e % _0xe4bf6a.length)) % 256;
        _0x48876b = _0x4c72b0[_0x57d05e];
        _0x4c72b0[_0x57d05e] = _0x4c72b0[_0x4c3e96];
        _0x4c72b0[_0x4c3e96] = _0x48876b;
      }
      _0x57d05e = 0;
      _0x4c3e96 = 0;
      for (let _0x2d26e0 = 0; _0x2d26e0 < _0x1d3037.length; _0x2d26e0++) {
        _0x4c3e96 = (_0x4c3e96 + _0x4c72b0[_0x57d05e = (_0x57d05e + 1) % 256]) % 256;
        _0x48876b = _0x4c72b0[_0x57d05e];
        _0x4c72b0[_0x57d05e] = _0x4c72b0[_0x4c3e96];
        _0x4c72b0[_0x4c3e96] = _0x48876b;
        _0x50fdee = _0x50fdee + String.fromCharCode(_0x1d3037.charCodeAt(_0x2d26e0) ^ _0x4c72b0[(_0x4c72b0[_0x57d05e] + _0x4c72b0[_0x4c3e96]) % 256]);
      }
      return _0x50fdee;
    };
    a0_1x5ef0.oVWeuQ = _0x118247;
    a0_1x5ef0.wmLWOx = {};
    a0_1x5ef0.ygbhMY = true;
  }
  const _0x57d6f2 = _0x361c7f + a0_1x410f[0];
  const _0x4fd8a0 = a0_1x5ef0.wmLWOx[_0x57d6f2];
  if (_0x4fd8a0 === undefined) {
    if (a0_1x5ef0.izXfqJ === undefined) {
      a0_1x5ef0.izXfqJ = true;
    }
    _0x53b470 = a0_1x5ef0.oVWeuQ(_0x53b470, _0x5aabf2);
    a0_1x5ef0.wmLWOx[_0x57d6f2] = _0x53b470;
  } else {
    _0x53b470 = _0x4fd8a0;
  }
  return _0x53b470;
}
$("#CommonDiv").html("");
if (GET.hash && GET.params.length == 0) {
  location.hash = "#" + GET.hash;
}
$("#tabshortname,#tabpromotion,#tabads,#tabpowers,#tabgroup,#tabbuyxats,#tabauction,#tabdays2xats,#tabxats2days").click(function (_0x283a13) {
  let _0x45b002 = _0x283a13.currentTarget.id.substr(3);
  DoTask(_0x45b002);
  location.hash = "#!" + doRealHash(location.hash, _0x45b002);
  return false;
});
DoTask(getRealHash());
storeAnn(new Date());
if ($(window).width() < 992) {
  $(".showrules").addClass("collapse multi-collapse");
  $(".showtrigger").removeClass("d-none");
}
let Sorting = "sort_91";
function sortPowers(_0x2d11c0) {
  switch ((Sorting = Sorting == "" && tab != "All" ? getFilter() : Sorting).toLowerCase()) {
    case "sort_az":
      _0x2d11c0.sort((_0x59b259, _0x5452aa) => {
        if (_0x59b259.s > _0x5452aa.s) {
          return 1;
        } else if (_0x5452aa.s > _0x59b259.s) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "sort_za":
      _0x2d11c0.sort((_0xef3961, _0x36ba81) => {
        if (_0xef3961.s > _0x36ba81.s) {
          return -1;
        } else if (_0x36ba81.s > _0xef3961.s) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "sort_19":
      _0x2d11c0.sort((_0x5328a6, _0x3f87dc) => {
        if (xInt(_0x5328a6.id) > xInt(_0x3f87dc.id)) {
          return 1;
        } else if (xInt(_0x3f87dc.id) > xInt(_0x5328a6.id)) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "sort_91":
      _0x2d11c0.sort((_0x4c4ca5, _0x4188cb) => {
        if (xInt(_0x4c4ca5.id) > xInt(_0x4188cb.id)) {
          return -1;
        } else if (xInt(_0x4188cb.id) > xInt(_0x4c4ca5.id)) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "sort_price_asc":
      _0x2d11c0.sort((_0x588811, _0x205ad6) => {
        let _0x4d97e3 = _0x588811.x ? xInt(_0x588811.x) : xInt(_0x588811.d) * 13.5;
        let _0x274ea9 = _0x205ad6.x ? xInt(_0x205ad6.x) : xInt(_0x205ad6.d) * 13.5;
        if (_0x4d97e3 > _0x274ea9) {
          return 1;
        } else if (_0x274ea9 > _0x4d97e3) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "sort_price_desc":
      _0x2d11c0.sort((_0x169dcf, _0x3c368a) => {
        let _0x2ac52c = _0x169dcf.x ? xInt(_0x169dcf.x) : xInt(_0x169dcf.d) * 13.5;
        let _0x15b536 = _0x3c368a.x ? xInt(_0x3c368a.x) : xInt(_0x3c368a.d) * 13.5;
        if (_0x2ac52c > _0x15b536) {
          return -1;
        } else if (_0x15b536 > _0x2ac52c) {
          return 1;
        } else {
          return 0;
        }
      });
  }
}
function DoRemaing(_0x1ce601) {
  _0x1ce601.Err.remaining;
}
let Lang = "";
function DoPromo(_0x135709) {
  Reset();
  if (_0x135709 == "ads") {
    $(".AdDiv").removeClass("d-none");
  } else {
    $(".PromoDiv").removeClass("d-none");
  }
  $("#promoextra").html(storeCommom);
  preSetUsername();
  $("#promohoursdiv").removeClass("d-none");
  $("#adcostbut,#promobut,#authbut,#adbut").off("click").click(function (_0x3b0c93) {
    _0x3b0c93.preventDefault();
    let _0x28fad3 = commonPost();
    _0x28fad3.GroupName = $("#promoname").val();
    _0x28fad3.XatsDays = $("input[name=XatsDays]:checked").val();
    _0x28fad3.Hours = Math.max($("#promohours").val(), 0.5);
    _0x28fad3.Xats = $("#promoxats").text();
    _0x28fad3.Days = $("#promodays").text();
    _0x28fad3.AdImg = $("#adimage").val();
    _0x28fad3.Lang = Lang;
    switch (_0x3b0c93.currentTarget.id) {
      case "adcostbut":
        if (page == "ads") {
          _0x28fad3.Quote2 = 1;
        } else {
          _0x28fad3.Quote = 1;
        }
        break;
      case "promobut":
        _0x28fad3.Promote = 1;
        break;
      case "authbut":
        _0x28fad3.Authorize = 1;
        break;
      case "adbut":
        _0x28fad3.Advertise = 1;
    }
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/promotion2.php", _0x28fad3).then(function (_0x214514) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0x214514.Err.Finished) {
        DoRelogin(_0x214514.Err);
      } else {
        DoErrs(_0x214514, "promotion");
        $("#promohours").val(_0x214514.Hours);
        $("#promolangdiv").addClass("d-none");
        $("#promobutdiv").addClass("d-none");
        $("#promoname").val(_0x214514.promoname);
        $("#promoextra").addClass("d-none");
        $("#promocostdiv")[0].scrollIntoView();
        if (_0x214514.Xats) {
          $("#promocostdiv").removeClass("d-none");
          let _0x1038d6 = 0;
          if (!_0x214514.Err.adimage && !_0x214514.Err.promoname) {
            $("#promoextra").removeClass("d-none");
            _0x1038d6 = 1;
          }
          if ((Lang = _0x214514.Lang) && _0x214514.Language) {
            $("#promolangdiv").removeClass("d-none");
            $("#promolang").text(_0x214514.Language);
          }
          if (page == "ads") {
            if (_0x214514.NeedApproval) {
              $("#promocostdiv").addClass("d-none");
              $("#adauth").removeClass("d-none");
              $("#authbut")[0].scrollIntoView();
            } else {
              $("#adauth").addClass("d-none");
              if (_0x1038d6) {
                $("#adbutdiv").removeClass("d-none");
                $("#adbutdiv")[0].scrollIntoView();
              }
            }
          } else if (_0x1038d6) {
            $("#promobutdiv").removeClass("d-none");
            $("#promobutdiv")[0].scrollIntoView();
          }
          $("#promoxats").text(_0x214514.Xats);
          $("#promodays").text(_0x214514.Days);
        }
        localize();
      }
    });
  });
}
function DoBuyGroup() {
  Reset();
  $("#group").removeClass("d-none");
  $("#buygroupextra2").html(storeCommom);
  preSetUsername();
  $("#getcost,#butbuygroup").off("click").click(function (_0x1820d2) {
    _0x1820d2.preventDefault();
    let _0x59b16c = commonPost();
    _0x59b16c.GroupName = $("#wantedgroup").val();
    _0x59b16c.Xats = $("#groupxats").text();
    if (_0x1820d2.currentTarget.id === "butbuygroup") {
      _0x59b16c.Promote = 1;
    } else {
      _0x59b16c.Quote = 1;
    }
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/TransferGroup2.php", _0x59b16c).then(function (_0x27ad42) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      let _0x3e45e3 = $("#buygrouperr");
      if (_0x27ad42.Err.ReLogin) {
        DoRelogin(_0x27ad42.Err);
      } else {
        if (_0x27ad42.Err.buygroup && _0x27ad42.Err.Finished) {
          doSuccessMsg(_0x3e45e3, _0x27ad42.Err.buygroup);
        } else {
          DoErrs(_0x27ad42, "buygroup");
        }
        $("#groupxats").text(_0x27ad42.Xats);
        $("#buygroupname").text(_0x27ad42.wantedgroup);
        $("#wantedgroup").val(_0x27ad42.wantedgroup);
        if (_0x27ad42.Xats) {
          $("#buygroupextra").removeClass("d-none");
          $("#butbuygroup")[0].scrollIntoView();
        } else {
          $("#buygroupextra").addClass("d-none");
        }
        localize();
      }
    });
  });
  $("#wantedname").keypress(function (_0x1cf56a) {
    if (_0x1cf56a.which == 13) {
      $("#getcost").off("click").click();
      return false;
    }
  });
}
function DoShortName() {
  Reset();
  $("#shortname").removeClass("d-none");
  $("#shortnameextra2").html(storeCommom);
  preSetUsername();
  $("#getcost,#buyshortname").off("click").click(function (_0x4623fb) {
    _0x4623fb.preventDefault();
    let _0x462fdc = commonPost();
    _0x462fdc.GroupName = $("#wantedname").val();
    _0x462fdc.CheckAny = GET.params && GET.params.CheckAny || 0;
    _0x462fdc.Xats = $("#shortxats").text();
    if (_0x4623fb.currentTarget.id === "buyshortname") {
      _0x462fdc.Promote = 1;
    } else {
      _0x462fdc.Quote = 1;
    }
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/BuyShortName2.php", _0x462fdc).then(function (_0x4abf13) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0x4abf13.Err.ReLogin) {
        DoRelogin(_0x4abf13.Err);
      } else {
        DoErrs(_0x4abf13, "buyshortname");
        $("#shortxats").text(_0x4abf13.Xats);
        $("#buygroupname").text(_0x4abf13.wantedname);
        $("#wantedname").text(_0x4abf13.wantedname);
        if (_0x4abf13.Err.blackfriday) {
          $("#blackf").text(_0x4abf13.Err.blackfriday);
          $("#blackf").removeClass("d-none");
        }
        if (_0x4abf13.Xats) {
          $("#shortnameextra").removeClass("d-none");
          $("#buyshortname")[0].scrollIntoView();
        } else {
          $("#shortnameextra").addClass("d-none");
        }
        localize();
      }
    });
  });
  $("#wantedname").keypress(function (_0x5ef184) {
    if (_0x5ef184.which == 13) {
      $("#getcost").off("click").click();
      return false;
    }
  });
}
const a0_1x171027 = {};
var NonMobs;
var LangFiles;
var PowersHead;
var PowerObj;
var LatestPower;
var tmpPowers;
a0_1x171027.New = 1000000;
a0_1x171027.Standard = 0;
a0_1x171027.Rare = -400000;
a0_1x171027.Epic = -600000;
var Powers = [];
var Sections = a0_1x171027;
var Sections2 = ["New", "Standard", "Rare", "Epic"];
var CurrentSec = "New";
var LineVisible = 0;
function configureStorePage(_0x19701c, _0x486ec4, _0x2a85ce) {
  if (_0x19701c != "Collection" && _0x486ec4) {
    tmpPowers = _0x486ec4;
  }
  if (_0x486ec4) {
    PowerObj = _0x486ec4;
  } else {
    _0x486ec4 = tmpPowers;
  }
  if (_0x2a85ce) {
    for (let _0x125ce8 in _0x2a85ce) {
      if (_0x486ec4[_0x2a85ce[_0x125ce8].id]) {
        _0x486ec4[_0x2a85ce[_0x125ce8].id].r = _0x2a85ce[_0x125ce8].remaining;
      }
    }
  }
  LatestPower = 0;
  if (typeof _0x486ec4 == "object") {
    Powers = $.map(_0x486ec4, function (_0x5254bf, _0x3f83e9) {
      let _0x420434 = _0x5254bf;
      _0x420434.id = _0x3f83e9;
      return _0x420434;
    });
    switch (_0x19701c) {
      case "All":
        Powers.sort(function (_0x552582, _0x26e31d) {
          return _0x26e31d.a - _0x552582.a;
        });
        break;
      case "Featured":
        Powers.sort(function (_0x9c1a17, _0x58eb29) {
          return _0x58eb29.id - _0x9c1a17.id;
        });
        break;
      default:
        Powers.sort(function (_0x1b4fc3, _0x391e05) {
          return StorePoints(_0x391e05) - StorePoints(_0x1b4fc3);
        });
    }
  }
  sortPowers(Powers);
  addPowers(Powers);
}
function addPowers(_0x2f4d72) {
  let _0x4b6749 = {};
  tempFeature = [];
  $("input[name^=pnum]").each(function (_0x254973) {
    if ($(this).val() > 0) {
      _0x4b6749[$(this).prop("name").substr(4)] = $(this).val();
    }
  });
  $("input[name^=pchk]").each(function (_0x387461) {
    if ($(this).prop("checked")) {
      _0x4b6749[$(this).prop("name").substr(4)] = 1;
    }
  });
  var _0x62dfb2 = document.getElementById("powerslist");
  if (!PowersHead) {
    PowersHead = $("#powerslist2").html();
  }
  _0x62dfb2.innerHTML = "";
  _0x62dfb2.classList.remove("d-none");
  let _0x432772 = makeElement(_0x62dfb2, "table", "table table-bordered table-sm table-responsive d-block d-md-table");
  let _0xaa3258 = makeElement(_0x432772, "thead");
  var _0x374640;
  makeElement(_0xaa3258, "tr").innerHTML = PowersHead;
  var _0x54615f;
  var _0xae2a54 = 0;
  for (_0x54615f in _0x2f4d72) {
    if (_0x2f4d72[_0x54615f] === undefined) {
      continue;
    }
    _0x374640 = _0x2f4d72[_0x54615f].id;
    if (NonMobs && NonMobs[_0x374640 >> 5] & 1 << _0x374640 % 32) {
      continue;
    }
    if (!_0x4b6749[_0x374640]) {
      if (tab == "Featured") {
        if (_0x2f4d72[_0x54615f].r == 1 && !(_0x2f4d72[_0x54615f].f & 4096)) {
          continue;
        }
        if (_0xae2a54++ > 12) {
          continue;
        }
        tempFeature.push(_0x2f4d72[_0x54615f]);
      } else if (_0x2f4d72[_0x54615f].sec && !_0x2f4d72[_0x54615f].sec[tab] && tab != "All") {
        continue;
      }
    }
    let _0xe5400e = makeElement(_0x432772, "tbody");
    let _0xc22b5a = makeElement(_0xe5400e, "tr");
    if (_0x2f4d72[_0x54615f].r > 0) {
      _0xc22b5a.style.cssText = "background-color:#f8f9fa";
    }
    let _0x42be1a = makeElement(_0xc22b5a, "td");
    let _0x49d355 = _0x2f4d72[_0x54615f].d1;
    if (_0x2f4d72[_0x54615f].r == 1) {
      _0x49d355 = _0x49d355 + "<br><span class=\"unavailable\" data-localize=\"buy.trytrading\">Unavailable, try <a href=\"//rxat.ro/web_gear/chat/chats.php?type=trade\">trading</a></span>";
    } else if (_0x2f4d72[_0x54615f].r > 1) {
      _0x49d355 = (_0x49d355 = "<a title=\"" + _0x2f4d72[_0x54615f].s + " <span data-localize=buy.unavailable>will be temporarily unavailable when sold out</span>\">" + _0x49d355 + "</a>") + "<b><BR><font color=\"#ff0000\">" + (_0x2f4d72[_0x54615f].r - 1) + " <span data-localize=buy.remaining>remaining!</span></font></b>";
      if (_0x2f4d72[_0x54615f].f & 64) {
        _0x49d355 = _0x49d355 + "<b><BR><font color=\"#ff0000\"> <span data-localize=buy.willdrop>PRICE WILL DROP!</span></font></b>";
      }
    }
    _0x42be1a.innerHTML = _0x49d355;
    if (tab == "All") {
      let _0x3a712d = makeElement(_0xc22b5a, "td");
      if (_0x2f4d72[_0x54615f].f & 4096) {
        _0x3a712d.innerHTML = "<img src=\"" + xConfig.dir + "img/navbar/new.svg\" width=\"50\" class=\"newimg\" alt=\"new\"/>";
      }
      _0x3a712d.style.textAlign = "center";
    } else {
      let _0x2d1023 = document.querySelector("#newCol");
      if (_0x2d1023) {
        _0x2d1023.parentNode.removeChild(_0x2d1023);
      }
    }
    let _0x5f5d9b = makeElement(_0xc22b5a, "td");
    _0x5f5d9b.style.textAlign = "center";
    let _0x544f91 = makeElement(_0x5f5d9b, "img");
    _0x544f91.src = "https://rxat.ro/images/smw/" + _0x2f4d72[_0x54615f].s + ".png";
    _0x544f91.alt = "" + _0x2f4d72[_0x54615f].s;
    _0x544f91.style.display = "block";
    _0x544f91.style.margin = "0 auto";
    _0x544f91.style.cursor = "pointer";
    let _0x3cc419 = "https://util.rxat.ro/" + _0x2f4d72[_0x54615f].s;
    _0x544f91.addEventListener("click", function () {
      window.open(_0x3cc419, "_blank");
    });
    addText(_0x5f5d9b, "(" + _0x2f4d72[_0x54615f].s + ")");
    let _0x4b89b6 = makeElement(_0xc22b5a, "td");
    _0x4b89b6.style.textAlign = "center";
    let _0x46a971 = makeElement(_0xc22b5a, "td");
    _0x46a971.style.textAlign = "center";
    let _0x249590 = makeElement(_0xc22b5a, "td");
    _0x249590.style.textAlign = "center";
    let _0x3a48e0 = "";
    if (_0x2f4d72[_0x54615f].r != 1) {
      _0x3a48e0 = (_0x3a48e0 = _0x2f4d72[_0x54615f].x) > 1 ? [["", _0x3a48e0 + " "], ["mob1.xats", "xats"]] : [["", _0x2f4d72[_0x54615f].d + " "], ["mob1.days", "days"]];
      _0x2f4d72[_0x54615f].cost = _0x3a48e0;
      addText(_0x4b89b6, _0x3a48e0);
      let _0x457b1c = _0x4b6749[_0x2f4d72[_0x54615f].id];
      let _0x1de63c = makeElement(_0x46a971, "input");
      _0x1de63c.name = "pnum" + _0x2f4d72[_0x54615f].id;
      _0x1de63c.type = "number";
      _0x1de63c.size = 3;
      _0x1de63c.min = 0;
      _0x1de63c.value = _0x457b1c > 1 ? _0x457b1c : 0;
      _0x1de63c.className = "xInput num";
      let _0x4bd59a = makeElement(_0x249590, "input");
      _0x4bd59a.name = "pchk" + _0x2f4d72[_0x54615f].id;
      _0x4bd59a.type = "checkbox";
      _0x4bd59a.value = "ON";
      _0x4bd59a.checked = _0x457b1c == 1;
    }
    let _0x444b78 = makeElement(_0xc22b5a, "td");
    let _0x437419 = makeElement(_0xc22b5a, "td");
    let _0x351212 = _0x2f4d72[_0x54615f].d2;
    let _0x519e89 = _0x351212.replace(_0x351212, "$WIKIP");
    _0x519e89 = _0x519e89.replace("$WIKIP", "See <a target=\"_blank\" rel=\"noopener\" href=\"https://util.rxat.ro/" + _0x2f4d72[_0x54615f].s + "\">wiki for details.</a>");
    _0x351212 = (_0x351212 = (_0x351212 = (_0x351212 = _0x351212.replace("$WIKIP", "See <a target=\"_blank\" rel=\"noopener\" href=\"https://util.rxat.ro/" + _0x2f4d72[_0x54615f].s + "\">wiki for details</a>")).replace("$WIKI", "See <a target=\"_blank\" rel=\"noopener\" href=\"https://util.rxat.ro/" + _0x2f4d72[_0x54615f].s + "\">wiki for details</a>")).replace("<a href=\"https://util.rxat.ro/Powers\">", "<a target=\"_blank\" rel=\"noopener\" href=\"https://util.rxat.ro/" + _0x2f4d72[_0x54615f].s + "\">")).replace("http:", "https:");
    _0x444b78.innerHTML = _0x351212;
    _0x444b78.classList.add("smallst");
    _0x437419.innerHTML = _0x519e89;
    _0x437419.classList.add("bigst");
  }
  localize(["buy"]);
}
function StoreSection(_0x4059db, _0x56351e) {
  var _0x18fb6a = document.createElement("div");
  _0x18fb6a.setAttribute("id", _0x56351e);
  _0x4059db.appendChild(_0x18fb6a);
  return _0x18fb6a;
}
function StorePoints(_0x4301b4) {
  if (_0x4301b4 == null) {
    return -1000000000;
  }
  if (_0x4301b4.sec && _0x4301b4.sec[tab]) {
    return _0x4301b4.sec[tab];
  }
  let _0x5a5962 = AlphaValue(_0x4301b4.s);
  var _0x135d66 = parseInt(_0x4301b4.f);
  _0x4301b4.sec = {};
  let _0x15cd1e = true;
  if (_0x4301b4.id > LatestPower - 10) {
    _0x4301b4.sec.Featured = _0x4301b4.id + Sections.New;
  }
  if (_0x135d66 & 8) {
    _0x4301b4.sec.Epic = parseInt(_0x4301b4.x);
    _0x15cd1e = false;
  }
  if (_0x135d66 & 128) {
    _0x4301b4.sec.Games = _0x5a5962;
    _0x15cd1e = false;
  }
  if (_0x135d66 & 2048) {
    _0x4301b4.sec.Group = _0x5a5962;
    _0x15cd1e = false;
  }
  if (_0x135d66 & 8192) {
    _0x4301b4.sec.Rare = _0x5a5962;
    _0x15cd1e = false;
  }
  if (_0x15cd1e) {
    _0x4301b4.sec.Standard = _0x5a5962;
  }
  if (_0x4301b4.c) {
    _0x4301b4.sec.Collection = _0x5a5962;
  }
  _0x4301b4.a = _0x5a5962;
  if (_0x4301b4.sec[tab]) {
    return _0x4301b4.sec[tab];
  } else {
    return 0;
  }
}
function AlphaValue(_0x3d09a7) {
  var _0x9e4b68;
  var _0x3673b2 = 0;
  var _0x4926fd = 0;
  for (; _0x4926fd < 3; _0x4926fd++) {
    _0x3673b2 = _0x3673b2 * 256;
    if (_0x9e4b68 = _0x3d09a7.charCodeAt(_0x4926fd)) {
      _0x3673b2 = _0x3673b2 + _0x9e4b68;
    }
  }
  return -_0x3673b2;
}
function getFilter() {
  let _0x46fe78;
  try {
    _0x46fe78 = localStorage.getItem("store_filter");
  } catch (_0x9a11df) {}
  if ((_0x46fe78 = _0x46fe78 ? JSON.parse(_0x46fe78) : "") != 0) {
    if (_0x46fe78.store_value) {
      _0x46fe78 = _0x46fe78.store_value;
      $("#save_filter").prop("checked", true);
    } else {
      _0x46fe78 = "";
    }
  }
  updateFilterColor(_0x46fe78, "");
  return _0x46fe78;
}
function setFilter(_0xc4e128) {
  const _0x3720df = {
    store_value: _0xc4e128
  };
  var _0x25e83c = _0x3720df;
  var _0x560539 = getFilter();
  localStorage.setItem("store_filter", JSON.stringify(_0x25e83c));
  updateFilterColor(_0xc4e128 == "clear" ? "" : _0xc4e128, _0x560539);
}
function updateFilterColor(_0x5a3047, _0x221ee6) {
  if (_0x5a3047 != "") {
    $("#" + _0x5a3047).css("background-color", "#007bff14");
  }
  if (_0x221ee6 != "") {
    $("#" + _0x221ee6).css("background-color", "");
  }
}
function updateTotalPrice() {
  var _0x3bce90 = 0;
  var _0x42ec95 = 0;
  var _0x4b9350 = {};
  $.each(Powers, function (_0x26cb14, _0x2d6318) {
    if (_0x2d6318 != null && (_0x2d6318.checked != null && _0x2d6318.checked == 1 || _0x2d6318.quantityStore != null && _0x2d6318.quantityStore >= 1)) {
      if (_0x2d6318.x) {
        _0x3bce90 = _0x3bce90 + parseInt(_0x2d6318.x) * _0x2d6318.quantityStore;
      } else {
        _0x42ec95 = _0x42ec95 + parseInt(_0x2d6318.d) * _0x2d6318.quantityStore;
      }
    }
  });
  if (_0x3bce90 > 0 || _0x42ec95 > 0) {
    _0x4b9350 = {
      Err: {
        powersTotal: "<span data-localize=\"web.totalprice\">Total price: </span> " + [_0x3bce90.toLocaleString() + " xats", _0x42ec95.toLocaleString() + " days"].join(", ")
      }
    };
  }
  if (Object.keys(_0x4b9350).length > 0) {
    DoErrs(_0x4b9350, "buypowers");
    localize();
  } else {
    allErrsOff();
  }
}
function doDx() {
  Reset();
  $("#days2xats").removeClass("d-none");
  $("#days2xatsextra2").html(storeCommom);
  preSetUsername();
  $("#days2xatsbut").off("click").click(function (_0x2c32f9) {
    _0x2c32f9.preventDefault();
    let _0x4bb081 = commonPost();
    let _0x1c8b50 = $("#NoOfDays").val();
    _0x4bb081.NoOfDays = _0x1c8b50;
    _0x4bb081.Convert = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/DaysToXats2.php", _0x4bb081).then(function (_0xa9b2f0) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0xa9b2f0.Err.ReLogin) {
        DoRelogin(_0xa9b2f0.Err);
      } else {
        DoErrs(_0xa9b2f0, "days2xats");
      }
    });
  });
}
function doX2d() {
  Reset();
  $("#xats2days").removeClass("d-none");
  $("#xats2daysextra2").html(storeCommom);
  preSetUsername();
  $("#xats2daysbut").off("click").click(function (_0x13d37e) {
    _0x13d37e.preventDefault();
    let _0xf979bc = commonPost();
    let _0x2cc55b = $("#NoOfXats").val();
    _0xf979bc.NoOfXats = _0x2cc55b;
    _0xf979bc.Convert = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/XatsToDays2.php", _0xf979bc).then(function (_0x10499b) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0x10499b.Err.ReLogin) {
        DoRelogin(_0x10499b.Err);
      } else {
        DoErrs(_0x10499b, "xats2days");
      }
    });
  });
}
function preSetUsername() {
  if (xConfig === undefined || xConfig.username === undefined || !xConfig.username.length) {
    return false;
  }
  let _0x23cffb = document.getElementById("username");
  if (_0x23cffb) {
    _0x23cffb.value = xConfig.username;
    _0x23cffb.disabled = true;
  }
}
function doLoadCollections() {
  urlPost("/web_gear/chat/pow2.php").then(function (_0x270fa6) {
    const _0x5a5b87 = {
      s: "allpowers",
      d1: "AllPowers",
      d2: "Exclusive abilities. To qualify for allpowers you need to buy the 170 required powers. $WIKI",
      x: 0,
      r: 1,
      f: 12290,
      c: 1
    };
    const _0x5bf3df = {
      s: "everypower",
      d1: "EveryPower",
      d2: "Sparkling Emerald pawn. To qualify for everypower you need every single xat power. $WIKI",
      x: 0,
      r: 1,
      f: 12290,
      c: 1
    };
    const _0x1e7fcc = {
      0: _0x5a5b87,
      127: _0x5bf3df
    };
    let _0x587273 = _0x270fa6[10][1];
    let _0x183caa = _0x1e7fcc;
    for (let _0x50db92 in _0x587273) {
      let _0x45a6a4 = _0x587273[_0x50db92].s.split(",");
      let _0x435b73 = _0x587273[_0x50db92].n.split(",");
      const _0x536048 = {
        s: _0x45a6a4[0]
      };
      _0x536048.d1 = ucfirst(_0x45a6a4[0].replace("super", "")) + " Collection";
      _0x536048.d2 = ucfirst(_0x45a6a4[0].replace("super", "")) + " themed collection. Requires " + _0x435b73.length + " powers. $WIKI";
      _0x536048.x = 0;
      _0x536048.r = 1;
      _0x536048.f = 12290;
      _0x536048.c = 1;
      _0x183caa[_0x50db92] = _0x536048;
    }
    $("#bpCollection").click(() => {
      $(".PowTabs").removeClass("active");
      $("#bpCollection").addClass("active");
      configureStorePage("Collection", _0x183caa);
    });
  });
}
function ucfirst(_0x25263e) {
  return _0x25263e.charAt(0).toUpperCase() + _0x25263e.slice(1);
}
function getStoreCache() {
  let _0x4f31b7 = Math.floor(Date.now() / 1000);
  let _0x478a34 = localStorage.getItem("localCache");
  if (!_0x478a34 || GET.params && GET.params.cb) {
    _0x478a34 = 0;
  }
  if (!(_0x478a34 > _0x4f31b7)) {
    _0x478a34 = _0x4f31b7 + 120;
    localStorage.setItem("localCache", _0x478a34);
  }
  return _0x478a34;
}
function storeAnn(_0x57e47b) {
  const _0x21337c = new Date(2021, 10, 26, 0, 0, 0, 0);
  const _0x205f38 = new Date(2021, 10, 29, 23, 59, 0, 0);
  let _0x5c880c = document.querySelector("#storeann");
  var _0x1fdfde;
  var _0x26fe49;
  if (_0x21337c <= _0x57e47b && _0x57e47b <= _0x205f38) {
    if (_0x5c880c != null && (_0x1fdfde = _0x5c880c.classList) != null) {
      _0x1fdfde.remove("d-none");
    }
  } else if (_0x5c880c != null && (_0x26fe49 = _0x5c880c.classList) != null) {
    _0x26fe49.add("d-none");
  }
}
$(".noread1, .noread2, .noread3, .noread4, .noread5, .noread6").attr("readonly", true);
$(".noread1, .noread2, .noread3, .noread4, .noread5, .noread6").css("background-color", "white");
$(".noread1, .noread2, .noread3, .noread4, .noread5, .noread6").click(function () {
  $(this).attr("readonly", false);
});
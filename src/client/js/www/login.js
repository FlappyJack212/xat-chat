// Use global page variable
window.page = window.page || 'login';
let todo;
let Pin;
let GotLogin;
let DoneQuiz;
// Use global loginUrl if available, otherwise set local
var loginUrl = window.loginUrl || String.raw`https://rxat.ro/web_gear/chat/register4.php`;
if (document.body) {
  document[String.raw`body`][String.raw`style`][String.raw`backgroundColor`] = String.raw`white`;
  document[String.raw`body`][String.raw`classList`][String.raw`remove`](String.raw`invisible`);
}
$(String.raw`#navGroup,#navxatApps`)[String.raw`addClass`](String.raw`d-none`);
Reset();
initConfig();
readUser();
setUser();
initLanguage();
initAuser3();
navClickHandlers();
startAnalytics();
setLoggedin();
legacyLinks();
cookieBar();
localize([String.raw`web`, String.raw`buy`, String.raw`login`, String.raw`mob1`, String.raw`mob2`, String.raw`quiz`]);
fetchPromo();
setLogo();
if (location[String.raw`hash`][String.raw`includes`](String.raw`app=`)) {
  $(String.raw`#promoframe`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`.nav-tabs,.navbar-toggler,.pb-3`)[String.raw`addClass`](String.raw`d-none`);
  $("h1")[String.raw`addClass`](String.raw`d-none`);
}
let Common = $(String.raw`#CommonDiv`)[String.raw`html`]();
$(String.raw`#CommonDiv`)[String.raw`html`]("");
$(String.raw`#tablogin,#tablost,#tabchangename,#tabdelete,#tabgroup,#tabchangepass,#tablogout,#tabquiz`)[String.raw`click`](function (_0x334295) {
  let _0x98d06d = _0x334295[String.raw`currentTarget`].id[String.raw`substr`](3);
  DoTask(_0x98d06d);
  location[String.raw`hash`] = "#!" + _0x98d06d;
  return false;
});
AddClicks();
Pin = xInt(GET[String.raw`params`][String.raw`Pin`]);
let CheckReg;
let UserId = xInt(GET[String.raw`params`][String.raw`UserId`]);
let k2 = xInt(GET[String.raw`params`].k2);
let mode = xInt(GET[String.raw`params`][String.raw`mode`]);
function DoTask(_0x278ddf) {
  switch (_0x278ddf) {
    case String.raw`quiz`:
      if (todo) {
        doQuiz();
        break;
      }
    case String.raw`lost`:
      DoLost();
      break;
    case String.raw`logout`:
      DoLogout();
      break;
    case String.raw`changepass`:
      if (todo || GET[String.raw`params`][String.raw`key`]) {
        DoChangePass();
        break;
      }
    case String.raw`changename`:
      if (todo) {
        DoChangeName();
        break;
      }
    case String.raw`delete`:
      if (todo) {
        DoDelete();
        break;
      }
    case String.raw`group`:
      if (todo) {
        ShowDialog(_0x278ddf);
        break;
      }
    case String.raw`confirm`:
      DoConfirm();
      break;
    case String.raw`login`:
    default:
      _0x278ddf = String.raw`login`;
      DoLogin();
  }
  SetTab(_0x278ddf);
}
function SetTab(_0x5dbf18) {
  if (_0x5dbf18) {
    page = _0x5dbf18;
  }
  $(String.raw`.NavTabs`)[String.raw`removeClass`](String.raw`active`);
  $(String.raw`#tab` + page)[String.raw`addClass`](String.raw`active`);
  $(String.raw`#lostemail`)[String.raw`empty`]();
  if (GotLogin) {
    $(String.raw`#loginlab`)[String.raw`addClass`](String.raw`d-none`);
    $(String.raw`#settingslab`)[String.raw`removeClass`](String.raw`d-none`);
  } else {
    $(String.raw`#loginlab`)[String.raw`removeClass`](String.raw`d-none`);
    $(String.raw`#settingslab`)[String.raw`addClass`](String.raw`d-none`);
  }
}
function ShowDialog(_0x37c05a) {
  $(String.raw`.Dialog`)[String.raw`addClass`](String.raw`d-none`);
  $("#" + _0x37c05a)[String.raw`removeClass`](String.raw`d-none`);
}
function doQuiz() {
  ShowDialog(String.raw`quiz`);
}
function DoLogout() {
  $(String.raw`#login`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#logout,#tablogout`)[String.raw`removeClass`](String.raw`d-none`);
}
function DoConfirm() {
  Reset();
  let _0x35b03c = getGET();
  let _0x481e25 = $(String.raw`#confirmerr`);
  let _0x596be8 = _0x35b03c[String.raw`params`].id;
  let _0x48c25c = _0x35b03c[String.raw`params`].tk;
  $(String.raw`#login`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#panel`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`.newnav`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#confirm`)[String.raw`removeClass`](String.raw`d-none`);
  let _0x54cf0e = String.raw`https://rxat.ro/web_gear/chat/mlogin2.php?id=` + _0x596be8 + String.raw`&tk=` + _0x48c25c + String.raw`&api=1`;
  $[String.raw`getJSON`](_0x54cf0e, function (_0x3d49c7) {
    if (_0x3d49c7[String.raw`Err`][String.raw`loginok`]) {
      doSuccessMsg(_0x481e25, _0x3d49c7[String.raw`Err`][String.raw`loginok`], false);
    } else if (_0x3d49c7[String.raw`Err`][String.raw`loginfail`]) {
      doErrorMsg(_0x481e25, _0x3d49c7[String.raw`Err`][String.raw`loginfail`], false);
    } else {
      doErrorMsg(_0x481e25, String.raw`<span>Please re-login from the mobile app</span>`, false);
    }
  });
}
function _0x407b() {
  const _0x10b049 = ["WRNdTfK", "CxJcQSonBa", "W70vWOmZWQK", "fCoeaZaU", "vg1pzSkI", "f23dGW", "WRlcRhVdPZ0", "WP7dN1XGWQi", "dSoWWOqHW4a", "iwdcQSkCjG", "cmo0WOS9WPO", "agHvu8oU", "iuldS8oMWQO", "xSkKCCogW78", "kKZdPq", "WP7dPvvH", "CSkyESkAba", "bbyHW5NcLq", "W650W5/cGw8", "WOWuWO/dHCoi", "bILfFmoJ", "W4vCaW", "oYLlf8kX", "W5pdHmkGWOe", "WPiOWReaW58", "DwJdV8k6", "pwbkqH4", "jIhdLmkubW", "W7ddQCogBG", "p8kGCmoOWRO", "WPKOWQ9nWQ0", "psldOWm", "mmkfAa", "BHpdTqCI", "g8oWA1LU", "gmosB8oV", "g8oTaZ83", "W7uiiIei", "wNiTW5qs", "W5blW6JdHSoo", "l0tdS8k4W7S", "ms3dLCki", "WQZdR0u", "gMDj", "cL0aWOrU", "rKFdICk0W5m", "hrqX", "hhDu", "lchdTuSm", "WOFdOur5", "WRbhW74tWRZdGNZdPW", "W7BcTmkH", "W5pdKgfrW4q", "W546WRmaW5W", "WRhcSwW", "iahdNCkgbW", "W4JdGSkKWPpdKa", "prXjemoG", "WO0oWRJcJmko", "WO7dUfNcN8k8", "mJFdNW", "hmkLCSoGaW", "kSoCEmoLbq", "WPaLoCoyW5C", "wSo8WOKWWOu", "DddcRCotpa", "WO4ciCoCWPO", "WRdcRM3dVsO", "ktpdN3ddQq", "W604fq/cGW", "adddGW", "jSkxCSkyeq", "rMddNmk2W5K", "mghcSCosDW", "hSkqzCo5iW", "bCkKB8oQaq", "qIVcVmoZWPq", "tKldH3bg", "k2blsbW", "zspdN8oheq", "hba/", "W4RdV0lcISkY", "W7mNW5JcHxS", "W4/dNSkGWOK", "W5tdHxWlWPK", "WOFcLtnfW4O", "dLW9W5FcJW", "sti8W5xcJa", "oCkcDSka", "W47dM3ajWP8", "qLBcL2vB", "WO0cjCoCWOu", "W7ecjInl", "ggHvy8o1", "W7ZdGwOvWO8", "WRmjW5Wf", "tZtcQSop", "wXhcSuup", "W7hdUmk/qcm", "cSouzSkJWQK", "W4u+WQ8", "W4XWsZSg", "tXJcReXodYdcSCoAECouW65r", "W6HMca", "oG1jdmkJ", "e8kfrW", "DmoAgtC8", "W7OaWOj8WQq", "W59RWRjsWR4", "CJhdVaOC", "hSk8WOG9WOi", "WOxcIXLfW4O", "pGXpf8k2", "WPJdHCkGWPpdJq", "aLVcL8oQwq", "WPukW6JdKCod", "WODHwwGx", "bCkewmoMvW", "lc/dKmkaeq", "pmo0wSoMwG", "W7uynCoJW4O", "W7r3W4FcJwK", "rJhcVCoKoq", "pLKuW4pdLq", "WPr8WQ9o", "WQxdHMS", "kSoJWOKMWOK", "gK7dQq0t", "fmoqBSo4oq", "lmoZaSkG", "rg4lW5D+", "bx8vW4O", "W45Bf3RdPG", "aX83W53cMq", "mdZdLtxdTq", "cmoAymkGW7i", "W5dcP8kJ", "jdhdGSoAvG", "iXzzemkN", "cSo1fq", "W7fMW4C", "WPtdP8oS", "bhddNW", "EtlcKCkdfq", "W4tdMN0dWOm", "W48FiSokWPi", "kMFdUSolWOe", "of4oW4O", "Bv3dT8o2WR8", "W5FdH3Wv", "WQOMW4SSWQm", "WPfntrK", "W4TaahRcQq", "WPNdTuC", "WQvzW7/dHSoU", "WO/dSeXMWRG", "W4zhcwJdSq", "WRRcOSk0tri", "z8oVe8oTfG", "WQHmxbpcPW", "mmkco8kjeq", "W4WqWRNdJW", "xCo9D086", "W6OCW48XWQe", "oIxdVWui", "fCoqbsSP", "dwRdTbSz", "WQ8uW54hfG", "fSkBFCk2W6O", "WONdReH0WRK", "ohzv", "WOOuWQBdJa", "c8omsCoTwq", "emoAymkqW6K", "oeSqW6xdIW", "vdfQWO1e", "C14cW4tdIW", "vN49W5G", "zZBdKmkfvG", "W69MW5JcP3e", "qgJdOG", "W5njW7BdM8ou", "WOeiWQ7dG8of", "qIxcUmoujG", "WO/dG0f0WRG", "wSoKWPzYWPG", "EwfhuWS", "v8kYBSoXhG", "WPu/WRNdHCoj", "fSkIFmof", "gCovymkKW6a", "WQNcRhRdTW", "W4eKWQ7dJmoJ", "w8o0zv41", "W4JcOfT0WQC", "wSohlJCT", "qSo5oqH2", "WRRdTvJcICkd", "W4zehW", "WQ3cSdxcStG", "lctdOW", "WR4+W50isa", "jdhdGG", "eSk/ESocWQS", "W7tcSCk4qg8", "W755hGtcIG", "W40DomoEWPW", "WOnzW7FdKCou", "W6jeW4FcHw4", "z3BcU8oxWP8", "WQOWW4SZWOS", "W4NdJejYWQi", "gSoEdZWe", "wmoiaZj7", "W7aikW", "pwBcQmktEW", "wuVdUa0D", "WQjpW6ZdKCog", "WPnDvhBdUG", "keJdV8o4", "WPbxrHO", "W4iFWQ/cHmkxxmk4vJ3dM8oxlmou", "WOOjWQ/dHq", "uCkebde1", "j08kW4hdJW", "WRRdUSk/v3K", "t8odDK99", "p8oMcCo6hq", "w8opCSkXW6i", "WPddL8oZceG", "WOhdTfpcMW", "BhtdPCk+gG", "bHGPW53dNa", "dwldN8kBW5O", "yJBcSa", "umoAgt88", "W4X0sYO", "BtZcSmowWPa", "W7RcT8kI", "hmosymkYW6C", "pgHwuXm", "W4XSrtSb", "ibRcPCorWRO", "W6TOW4ZcJxm", "jI7dMmkehW", "g8kXESol", "iw/dN8kigG", "fSo+WPuMWOm", "kbXlfSoT", "pa5ffSkM", "W7DMW5NcHxa", "WPyeWQtdL8oa", "sSo5oSoJaa", "g3Xey8o2", "W7L0cqhcGa", "WOXOtYSE", "CYNcUSoi", "wKBdNMnb", "WROckcOd", "WOP3qYy", "nmk1D8kndW", "W595WRDlWQu", "oYJcSCo1WOHZWPC", "przFcSkM", "o0ddRa", "WPL5fNRdTq", "zJBdKmkfea", "i8oOamkTuG", "fCktD8kHeW", "WQP2fW/cNG", "WPtdSmo7kLC", "W69ZW4BcIa", "a8k0za", "iSoMdSkO", "WPLwrWi", "c3TfWOv+", "WPHEW7FdMa", "EJFdNdldQa", "W57dKCkSWPtdJq", "pNhdPCoFAa", "W4BdM3qaWOq", "f8o4WOGNWPG", "mwldKSklfq", "gCo5WOmXWOC", "f8oxD8kJW6q", "ghiPW5mf", "xuldHwve", "amkWk8o8hW", "W5niW6/dGmol", "h8k0FCoGWRm", "oxJdOSoQ", "eCk8z8o5ha", "jcddLmklva", "g8opDSk3", "gmk+zCoXba", "sra9W4VcLG", "W4pdKga", "kcpdMmklbW", "itJdTWqA", "gmk8jby1", "dCkKFmorWRe", "WOHjWRjlWPq", "ltBdNmkl", "k8kJFmorWPy", "p3ldId/dUa", "W4y6WQ8gW5q", "W4euWQRdGSoj", "jbXt", "i8ktFmkfdW", "iMBcQSoo", "WOXPWRbdWRi", "WPbyBCksWOq", "W4qlwMVdRq", "dhSiWPS", "fCouyCk2W6W", "vmondH03", "mvKq", "DatcOmolWPq", "W4FdRej2WQO", "whK4W5md", "vSoAgq", "qa7dLgXm", "W7jAh23dNq", "h8oUcq", "Exvhqa8", "g8o8WOnGW4a", "W73dUSoq", "gmo+WP59WOK", "umkusc8A", "WPfzW6K", "W4rqwXFcUW", "cmoyzSo5oW", "rSksEmoMla", "WP9krvJcSa", "qKtdMhfD", "wCoVDW", "WOLNfwVdMa", "fNBdJSkRW4i", "W4rbg3hdSW", "f8kWDSoKhW", "WRddVSolA8oF", "W5/cM8kRWOJdLW", "W6P5gHpcNG", "smo9AHq", "d8otESkNW6a", "W5ldMxirWOm", "WOxdTe3cM8oS", "WOXIwX/cNG", "AdVdQSoqya", "qCobdZa", "AYNcSmoE", "WONdPurJWQ4", "h8oJW4rSWRG", "aq3dH2ye", "WPpdU8oXhry", "xmkXAKv0", "axCrWOv6", "EMLjvb4", "gKHvy8oR", "CSkADmkFca", "zwlcKCohva", "hSoOBXC", "xSomba", "W5nyW7/dK8oo", "W6pdSSonECou", "c2vpC8oP", "CZRcUmoAWP4", "W4SRWQasW4i", "aCknu8o2sW", "WROoW4i", "huBdR0C", "mxZcOmoDCW", "b8k9B8oZfq", "gCopz8kH", "gfZdQG", "bMm4W5Kn", "W5xdVCo7vbK", "WROxnYC", "b8kiwCogua", "lhRdOG4C", "rCkcxmoZEW", "pf3dQW", "W7WaW4O6WQO", "W6/dStNcOgOiWPa4W6ZcReDV", "imoGdSkQ", "W4NdTeX3WRK", "d8ojoG", "fSo0WPi3WQi", "t2mGWP0f", "cmoAyCkYW6G", "W7vIW4ZcINi", "f38eWPKL", "tmoppCk6W6S", "kSopzmoIka", "WOJdSfi", "cCkzuCoHha", "W482WQq", "WOSEcrdcUG", "WP9yW77cHG", "pSo+WOG3WR0", "W7tdUmox", "WO0uW6VdKSol", "W6lcOxRcRq", "k1rec8kS", "dWiG", "W4BdM2asWO8", "W5nnfwJdUG", "wKZdSrGs", "sxq0W5is", "W49Df3m", "WOrkcNNdUW", "hCo0WQGZWOe", "ieSqW5xcLq", "WPTwwqtcSa", "nt3dKJhdUq", "W7icpa", "W4WKWQldGCoc", "rCoigs13", "jXHzj8kU", "WP9zW64", "aSkftSoKxG", "g0ddVqa", "WOldTeb5", "CLNcTSo3WRq", "iSo1aCobwG", "WOfcW7xdOCon", "fmo2WPu", "wCoLWOCWWOa", "WOfHrY0", "W58eomoh", "khJdV8kMgW", "bMldNmkSW5K", "WO5crW", "jSoOcq", "W6bIW4xcHxa", "WRzcrHpcKa", "W58eomohWOy", "jM7dSCkOha", "exVcQCorAG", "oCoMcW", "gHaHW5NcJa", "WPvEW67dNCoj", "WPnpW7pdGSoc", "iv8kW5W", "W4ddUmoxFSoy", "WPRdSKjHWQ4", "v8oCdCk1bb9OpGTAW7CT", "W6SPWRm", "WOJdUvpcVCk9", "pZldTWiC", "WQKyW5Wgtq", "emo8Amo/hG", "W7/dVmoxB8kE", "W49PrcOA", "WPqhW7tdM8oj", "jCktvCkneq", "ESkGaSoSwq", "l8oZh8oY", "i8kEtW", "WRHeWP5VW77cGL/dUCkGvqfc", "cmkXDq", "ifGgW5ddGG", "gCoCE8oIiG", "lrXgrSoI", "CxJdOXSo", "W6bGW4FcGw8", "WPngrq", "w8osDW", "n3JcOmokFq", "W45hhwZdUa", "gCorySo1jG", "rd7dTmolna", "W4RdG8kSWP0", "WQCAW4SOWQG", "hgZdTrGp", "x8o1AGrP", "wuldLwbm", "EsuggWy", "W6BcSmkLwYq", "ldNcRG", "W4Xma2/dPG", "WPfoW77dT8ol", "WQRcQMFdVqe", "WOSmWQ7cGmox", "WRmCW4iQvW", "vmkTW4KIW5i", "W48fjCop", "ztVdNSksbG", "WPLHrG", "jHze", "WPuCW5WmFG", "jdNdOb4B", "sriJW4JcGa", "fwldN8kRW4e", "c8oEm8kHW6a", "W5njW7ldLCoj", "W6rVW4RcINO", "WOSTrcCB", "vZtcQ8ogoa", "f2BdI8kXW4u", "pwJdUq9s", "cCkzsq", "W4tdLgmrWOu", "WOTwsbxcSa", "fMOiWPHT", "W7FdMCkIWOJdJa", "h8kJAG", "W7ZdUSokzmkF", "dSoyEq", "W5ldHCkXWOldIW", "W73cOhJdVt8", "fComvmoRxW", "W73dMCk3WORcMq", "WP/dTae2WR8", "ks3dGSkt", "WPebWQZdHq", "WOxdP0r7W6C", "WOmuWQRcJCoc", "WQZdRCoMg3ZdLXe5kZGHzfy", "WOCfWQxcGmoD", "W7ddTCoczmow", "W4tdMxOgWOe", "zCoaba", "fCoAySo4", "WOtdTNWiWOC", "kSoUamkSsa", "WPJdPub6WR0", "jSo0e8kHtG", "gmk+DCoKeW", "W4NdP8oVcfu", "hs4MW4VcHa", "WPVdLCkPWOBdIG", "gSo0aSk2Dq", "sr08W5/cIa", "WORdTHxdGmoB", "WP3cSrtcISkW", "e2axWPm", "sb3cQePiaNFcHmorumo0W44", "teddG21F", "WQ7dPufyWQq", "yfNdVmkRda", "W4ldTN8eWPK", "WPvMWRjxWQS", "BJVdVXGB", "gCooEa", "W5/dK8kPWPtdJa", "W6XNv0pcMq", "WOZdSfBcL8k9", "wSoBbW", "ntldKmkubW", "W4WgW5W", "W7VdP8o/xYu", "C0qgW5hdIq", "f8k5y8oZgW", "j0FdSCoNWRq", "WOfNwq", "nwKpW4FdLa", "W6D6dedcJW", "FCovECkzca", "ltFdIsq", "W77cSmkO", "WRxcPMy", "umoOAuy", "WRddO27dOte", "WQ3cS2FdVs0", "dmk1DmomWQK", "WOBdU0xcN8k8", "WOFdU8oQgrC", "pchcKstdOG", "WOHTWRecWQS", "WQL3W4pcLa", "tfddHa", "W6G0WRmm", "WOtdL2yrWPS", "WO1Hssms", "sxxdS8kHgG", "WOPvws0h", "W7BcVCkWqsO", "m0fdW4NdIq", "WOXSqYSE", "WOzUxceg", "WOjsjCoCWPu", "acilWPH1", "WQZcRh3dOW", "x3FdP8oUga", "eSojzSo6", "W7BdPCoxEmoq", "WONdRer2WQa", "hehdRvTc", "peZdU8o7WQ4", "WPvNWQW", "W5zFBCksWOC", "W6POW4NdLq", "itldTa", "obzyaa", "ESoVla", "gCkWB8o8ua", "WPRdOv90WQy", "lfZdVaS1", "lgaBbq", "zh7dTmkjeW", "cCooESkP", "W7OllcSn", "WPX0uYqq", "iJddUqu", "fCk1ySotha", "WOFdKxirWOS", "mmkuD8kddW", "W77dOYJcS34", "W4Plh3VcUG", "whK8W54p", "W4emWQtdH8oh", "W5nmnh7dUq", "o8kIAW", "nCoIh8oXqa", "WOFdHMmeWOC", "W4zAcq", "v8ofbtKY", "iCkzDCkFgq", "q3JcT8oioW", "zHJcUCozWOi", "nu5dW5ldIa", "WRBcSCk0qYG", "dKhdGNbk", "Bmo1aSkJuG", "WOBdOmo6g1G", "jeToW4RdIa", "vmolbJe8", "fNFdNSkXW5G", "oCkxDCklgq", "WRtdUSk/dby", "n3fYrHG", "g8ooEa", "WRGvW5qkua", "gCk4AmoLba", "W4hdUmoqB8of", "WOJdRXRcISk+", "WOTxWRbhWRG", "rCkyxmoNtq", "pMXicrK", "CSk6Dmklfq", "b8k/BmkdWRC", "WO3cVupcN8k6", "W6z0W5G", "eCkZEmopWRy", "irzD", "hI1BWRr0", "WP9iW6K", "WPL8WQCoW7W", "qSoIWOiFWPxdM8kL", "c8opDSkH", "W7GunNO", "v8kDACo3gq", "fmoAEmkK", "W4ldM3iiWO8", "WPXpW74", "uCoYyKu", "aSkjF8k4Cq", "hCoxlCozWQu", "b8kFtG", "W5ddSCorqSoq", "W6mQW4xcI3m", "pJVdUqGk", "dNhdKNDm", "W4PCp8osWPK", "WRrmtbNcOa", "smkIDSoXhG", "tSo9Aa", "W73dU8om", "WPDrt0q", "g3u2WP0k", "kbDhaCkS", "WOxdSLdcL8k/", "W64gW4eQWRy", "ldNdOXWk", "pSooiW", "WPhcUCoXbLu", "W4ScjCosW5u", "oIhdGGtdQa", "vdddUCoqna", "W6xcTmkJtIa", "e8opzG", "c2fhFSoL", "W5NdMCkPWOpcMW", "CSkLaCkRtG", "WPRdQu7cKSk0", "sHbZW5BcHa", "bdhcVmolma", "amobiq", "AhVdUCkM", "zmo3amoXuq", "vZBdVmkvW5RcTCoimW", "ihhcQmorBG", "pSkrCSkcua", "bM/dHCk7W50", "ohDprKC", "EHJcRSkGW64vW4XFb3pcSudcOq", "WORdSKlcKmkL", "peuqW5i", "mSkEFSkpfW", "v8kICSoXaG", "W7LNfba", "iY/cVCoDW5e", "W60ZWQapW5y", "gCoiya", "xCkWj25/", "k8oIc8kHsa", "cSkfu8oUha", "g8kKBCokWRe", "AMJdTa", "WPJdTCo2brS", "W7tcSCk1Bce", "W73cTNVdTIW", "yJ/cSCo7WP0", "WRBcMCk+scq", "gmo0WOm8W4W", "F3JcQSozCq", "CfOmW5xdJG", "WPLxAGBcPq", "W7rZW47cLMK", "cu7dQGOl", "WQRcPMZcSYO", "CGTlamkR", "c2tdNW", "WOmtWRJcNCkm", "r3SeWPvP", "W5xdPmkGWPtdJa", "hxPdyG", "W74PWQ4vW5q", "WO7cRun6WQu", "CSkeFSklgG", "W5VcTmk8sGG", "rCkauSoIvq", "WObZxG", "Bd1pcmkN", "WPHlW6NdT8ol", "W7ZdR8orB8os", "WPrmtb/cUW", "dYruDCoH", "pJFdGthdVG", "WOtdLMmeWPK", "ygRdSCk5da", "D3JcVWux", "sq7dMwTh", "W7pcR2FdSd8", "hx0u", "oM1hsq0", "WOjVshO", "geVdVtOq", "WRBcPCkJqca", "ochdGG", "dtqeFmoT", "yZdcTCoQoG", "kctdOW", "W4XIxZWg", "W7GjzsWh", "W59RWQ1xWRe", "W5xdL8kOWOlcLq", "WQuunsKi", "zmoRhCo5wq", "W4ngdxe", "WPNdH8kWWO7dGW", "khbpxrS", "WOWQWRqiW4S", "WRVcPZtcVc0", "kZFdNd/dUW", "W59TWQ9aWRO", "W5znsGddUa", "CbxdPCoKWRK", "m0ykW4xdJa", "Cg7dOSkVga", "dYbHWOLsw2hcICkTxSoRW4BcGa", "egOgWOnY", "sWpdJMTC", "W6hdSSowEG", "oxhcQW", "vgiTWPfh", "oMpdOSkmW4aCW7zSW5S8ACkYoG", "WOaSWRmoW58", "W5qaxXFcTW", "nmkjwSoStW", "W4RdR1lcMCk4", "fSo0Ea", "gCk0kSkZeG", "W7e7r0/cNq", "WOpdTCoZ", "W74cmqi1", "wLVdUbSq", "WRFcTw3cVwi", "WQRcPNddPW", "W4RdJvJcICk0", "W7VcUCkWtq", "W6VdNgar", "W6LBAJSw", "fSoBdZKR", "b3xdUCkhDq", "qCoabtae", "AxqQW5Gq", "FaKbW5pdKW", "CmoBga", "W59lWQPdWRe", "W6zAcxBdSW", "mSk/ESoiWRO", "W70qW4eOWQG", "vmoZy0n0", "WOxcT3hdOZS", "CCowo8omxa", "icpdKSkp", "W6LMW4BcGte", "BXbebSkT", "W45hhha", "W5WupmosWOe", "WOtcSftcLSk0", "WPTlsGldUG", "W5vprbxcTa", "hrK6W5VcIq", "W5RdP8oVcfu", "WPHgzmkiW4xdKSoNW7fbdrddTvy", "aX80W4S", "pgresW8", "fSoXzun0", "Ewresb8", "f8oCySo6", "W5bjW7xdGCol", "lsNcSmoCWPG", "p8opEq", "W7GjW5alwa", "WOPgrHNcOW", "jXHzda", "nCktD8kFcq", "WPqbWQC", "WQDJW4RcKhW", "WP1GrXFcPG", "WRlcPNZdTNi", "evVdTbu", "dHGGW5NcGW", "WP1MWRfvWRO", "W50OW61cW5i", "WO7dUeFcN8kI", "W7ZdQmkdECoz", "iCkIy8oIoq", "WOemWQRdK8oD", "WOLhg2NdTG", "WQrPW47cK3m", "b8kcaW", "awrhD8oN", "iXzzemkT", "WQXhWPb2WP4", "WP7cRKr7W6q", "g8oOzuH2", "mwXvbWm", "hqldTXys", "WOldOunYWQ4", "CSkuBSkyea", "WOznWQxdJ8oa", "s8o0A10", "nvGoW5u", "CLTmc8kW", "W741cWhcNG", "uhqGW40w", "EIhdLctdUq", "fh0kWOC", "o8kPr8kuua", "WOddQrFcICk5", "WPLqwa", "W5BdPSo6dLi", "CdpcUSop", "WQCsWRK", "W4iEnSouWPK", "cgacWP51", "m3dcOCo9Da", "mgTfsX8", "icNcSmoFWPG", "i8kQhmoXwa", "fmk/Cmon", "f3Xx", "WPdcTmo8bvi", "jdRdSqWk", "ihhcTSon", "WOLVwhvx", "mmksF8kVea", "W77dMMyxWQ8", "lZpdNq", "v8oYCaDT", "WRddVSomF8oF", "hLWXW5FcJq", "iXzndCkS", "W7C1idSt", "aIijW7eEfJdcMq", "vmoXjSkWua", "W4NdOLHHWQC", "d3Okm8oG", "vxxdP8kVdq", "A308W5Wx", "W4yfjConWOq", "ytFdVSkLeq", "fCk2Dmo1fq", "W4BdHMa", "WP7dPv92WQO", "W5tdM8k1WOVdNa", "W7q2WOFdH34", "umk+FmogWRS", "b24jWP5H", "C1GgW4hdLW", "peueW4/dIq", "mxxcTCokDW", "sCklimoQWRdcMwn4xcXsdbW", "WR/cShS", "WOJdSWK", "kMLpra8", "WQOyW4e4WQK", "idldKmkubW", "m2FcTG", "WR3cQ2NdVtK", "teFdK0Df", "cfRdSam", "mIpdMmkt", "gf/dQuq", "W4RdUfRcNmk0", "W5tdKgCrWOm", "lZVdLcFdRW", "ggaSW5Gx", "iSkdECkFca", "jdNdTa4x", "W77dVmokzG", "WOpdRuXYWQ4", "eSouB8oZ", "kxDjvW", "W6fOW5NcIq", "W6CtW50", "W5DqwXFcUW", "W7SrW54ZWQC", "k3NdT8oNWQS", "wuldLwDb", "W5xdK8k9WPpdIW", "jhxcQq", "ah3cRmk0WPe", "wComdG", "W7SzW55jvq", "lbHgdCk4", "cCoMh8o7", "gCovASo4kG", "W50+WRuvW5G", "W57dMmkKWORdNa", "jNBdV8k5cW", "f3OhWOrV", "umo9D2L2", "bSk0A8o/bG", "W6aoWO9/WP8", "mhddICkQW5G", "xCoDbZi", "iY/cTmotWPq", "iwhcP8onBa", "wxpcJmk7W5O", "WO3cSfNcKCk/", "puxdV8o3WR0", "k2Ptsq4", "WPNdVfRcNmk+", "dsLnFSoT", "wh4SW5ea", "pK0q", "W4tdRuX8WQu", "ptlcRuKD", "phJcPmoC", "W4CcjCoyWOu", "uMiT", "h8oLWP9YWOm", "BfJdO8o9WQi", "WRuYW7VcQxfQbmkH", "Bs/dUmopWPq", "auWjWPzO", "jcBdLCkKga", "nYFdGCklfq", "eCovm8kNW60", "W6BdHxOUWO8", "WPNdSXW", "W5VcQmkWgKS", "wuldHwnm", "utddT8kBEG", "a8oObmkVwq", "gCoiEW", "fSoLbtK0", "W4uuka", "W6tcOmk4vwa", "FCoUDG", "zIddHmktga", "w8oWBuLX", "WODHwqSz", "nspdG8kggq", "C8kOa8kTsG", "W4RdMxWcWOm", "WPz7WQ1mW7a", "CSkhBSkjdW", "WPJdHSkKWONdNa", "WOhdQvRcKG", "W6jQW5VcKgq", "jSoQfW", "xCo7BvLU", "shxcQSociq", "BmoLeSkWtW", "hJldPb8g", "t8oGkSkAW6OwagadDmkfa8om", "sr82W4/cJW", "dLddKNbD", "W7n1W4RcIM4", "hCkICSo1aG", "dw1dbW8", "WPNcLSkRWOBdLa", "W5rzfNBdOa", "d07dTqWz", "WRuYWP7dLc0XrSk+f3TOW4O1", "umoOAuyL", "W4pcMh0kWOq", "WPGLWQXnWRe", "bCkavmoMvW", "W5WvnW", "WOD0rYq", "yIVcPCkfW4i", "ks3dLSkogG", "WRvyW6G", "WOxdPSoWgq", "Ac7dNSkefq", "idBdUqDd", "W6OupCoyWOm", "p8kWESkfea", "fuddVHyj", "ax8eWOrO", "gCk1BCoXWRO", "kuJdV8o6W7y", "W644nY0b", "W5FdMCk2WPm", "W4XNcq", "Cx/dQmk+", "gmk/D8oxW7i", "sr82W4dcLq", "WPfhW7/cMmke", "dSkIDSot", "mr3dGmkshq", "kKddPmoXWRS", "pJFdKclcOG", "wCoHWOCHWP8", "WQvzW7/dHSoj", "W6ddMmkKWORdNa", "W4ddKgC3WO8", "g8o4WOPYWPG", "W6BcPCk9rJK", "W5xcSLVcN8kZ", "as7dGSk3W5G", "Amo1AG", "W4mefhddUG", "W7HknY0v", "W63dT8oVzGa", "W7ZcU8kHwJK", "bmoVDeT0", "ogfczay", "vSo1CSkLW5e", "kbxdPr8", "WOjVtI0", "psHisaq", "WRddR8ogBCou", "wha1W5qE", "ghiPW40f", "W6X7d07dJq", "w8oyFmk9W6m", "W7dcUmkWrIe", "dSoAFW", "W790fW", "WPvLWQnfWRO", "W50cjSosWOu", "W45lfNO", "iK8oW4NdKq", "bmkdwCo8", "jCkzo8oFta", "WO3cVXFcMSkW", "eSkzBSkcca", "hmoWWO8+", "pXHzfW", "WR5+WQdcLmoU", "W7qglcrg", "W5nPrdGa", "fKhcVIrg", "zG7dNSkagW", "e8oigJDM", "W4P2WQ8oW58", "hKBdT1Cr", "ydRdPCk6xW", "W6XLgHpcNG", "fCoZWPu", "o08A", "BbPAaSkT", "WOrLra", "jXWkfCk3", "gWq6W4i", "WO/dP0rMWR8", "WOXSsZSg", "FetcPmonAW", "W5Opjcyb", "WPPPua", "mSk+Dmo3hW", "WOxdSLdcKCkK", "ef3dVbOi", "DZRcP8oFWPq", "kspdN8ka", "l03dSSoxWRq", "W6zLW5G", "WQrKW4tcKxm", "p1ZdV8oU", "W5jVWRbdWQS", "e8otBCo5", "WPVdTurVWRO", "ptFdLZhdUa", "bhpdMmk7W54", "ldpdTcGd", "cs3dLSkogG", "W4ZdN8kHWPpdKq", "awDcDCo6", "Bq5pbSoS", "WOemWQldG8of", "W5FdLgeeWOC", "W6zQW44", "e8o2WO4MW4e", "WRBcPSkLtJ8", "xCk8DSoqWQS", "WROzW5uQvW", "bx8rWPrZ", "mKuhW58", "BuxdUCoZWRe", "ACo3amoX", "pezkrHK", "W5/cLmoLWOpdMa", "hfJdSbC", "zMBdT8ouWP4", "otBdOGWk", "W60cnW", "dcriF8oS", "WP7dOqb5WQq", "W7FcSmonzCoF", "WQRdRMRdVdi", "g8oXz8oIaG", "odBdLrpdOq", "p8oJWPq", "d8kctCoWsa", "jKJdPCoxWRq", "WPnMWOzlWQK", "W5RdHCk2", "WRmCW58oxG", "sdpcVW", "gMXwFmoJ", "lgXkxCoT", "kgRcSGCa", "ic/dKmkoga", "kmkQfCkHxW"];
  _0x407b = function () {
    return _0x10b049;
  };
  return _0x407b();
}
function DoDelete() {
  $(String.raw`.Dialog`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#delete`)[String.raw`removeClass`](String.raw`d-none`);
  $(String.raw`#DeleteName,#DeleteName2,#DeleteNameBut`)[String.raw`text`](todo[String.raw`w_registered`]);
}
function DoChangeName() {
  ShowDialog(String.raw`changename`);
  $(String.raw`#ChangeName`)[String.raw`text`](todo[String.raw`w_registered`]);
}
function DoChangePass() {
  allErrsOff();
  ShowDialog(String.raw`changepass`);
  if (todo) {
    $(String.raw`#cpname`)[String.raw`val`](todo[String.raw`w_registered`]);
  }
  $(String.raw`#cppass,#cppass1`)[String.raw`val`]("");
  $(String.raw`#cpform`)[String.raw`removeClass`](String.raw`d-none`);
}
function LoggedIn(_0x609101) {
  if (String.raw`logout` != page) {
    if (_0x609101) {
      $(String.raw`#LoginResult`)[String.raw`html`]($(String.raw`#LoginOk`)[String.raw`html`]());
    } else {
      $(String.raw`#LoginResult`)[String.raw`html`]($(String.raw`#LoginFailed`)[String.raw`html`]());
    }
  } else {
    $(String.raw`#LoginResult`)[String.raw`html`]("");
  }
}
function DoSettings(_0x390574) {
  let _0x44aa06 = _0x390574[String.raw`Err`];
  todo = _0x44aa06[String.raw`todo`];
  SetNewTodo(todo);
  if (location[String.raw`href`][String.raw`includes`](String.raw`app=`)) {
    let _0x3cf161 = window[String.raw`location`][String.raw`href`];
    _0x3cf161 = _0x3cf161[String.raw`split`](String.raw`direct`);
    window[String.raw`location`] = _0x3cf161[0] + String.raw`box/embed.html?app=3`;
    return;
  }
  if (_0x44aa06[String.raw`Pin`]) {
    Pin = xInt(_0x44aa06[String.raw`Pin`]);
  }
  $(String.raw`#regname`)[String.raw`text`](todo[String.raw`w_registered`] + " (" + todo[String.raw`w_userno`] + ")");
  if (window[String.raw`location`][String.raw`href`][String.raw`indexOf`](String.raw`?flash`) > -1) {
    $(String.raw`#embed`)[String.raw`html`](_0x44aa06[String.raw`Settings`]);
  } else {
    $(String.raw`#embed`)[String.raw`html`](_0x44aa06[String.raw`Settings2`]);
  }
  $(String.raw`#pro` + _0x44aa06[String.raw`protect`])[String.raw`prop`](String.raw`checked`, true);
  $(String.raw`#ApiKey`)[String.raw`text`](_0x44aa06[String.raw`ApiKey`]);
  $(String.raw`#PowerAssignments`)[String.raw`html`](_0x44aa06[String.raw`PowerAssignments`]);
  if (_0x44aa06[String.raw`PowerAssignments`]) {
    $(String.raw`#tabgroup`)[String.raw`removeClass`](String.raw`d-none`);
  } else {
    $(String.raw`#tabgroup`)[String.raw`addClass`](String.raw`d-none`);
  }
  $(String.raw`#closewin`)[String.raw`html`]($(String.raw`#closewin`)[String.raw`html`]()[String.raw`replace`]("%s", String.raw`<br>`));
  $(String.raw`#tabchangename,#tabdelete,#tabchangepass`)[String.raw`removeClass`](String.raw`d-none`);
  $(String.raw`#tablost`)[String.raw`addClass`](String.raw`d-none`);
  GotLogin = 1;
  ShowDialog(String.raw`settings`);
  SetTab();
  if (_0x44aa06[String.raw`settings`] && _0x44aa06[String.raw`settings`][String.raw`indexOf`](String.raw`.needk2`) >= 0) {
    _0x390574[String.raw`Err`][String.raw`delsuccess`] = String.raw`<span data-localize="web.delsuc">Account has been deleted</span>!`;
    $(String.raw`#embed`)[String.raw`addClass`](String.raw`d-none`);
  }
  DoErrs(_0x390574);
  localize([String.raw`web`]);
}
function DoLogin() {
  $(String.raw`#embed`)[String.raw`empty`]();
  $(String.raw`#tabregister`)[String.raw`addClass`](String.raw`d-none`);
  if (GotLogin) {
    ShowDialog(String.raw`settings`);
  } else {
    ShowDialog(String.raw`login`);
    let _0x399b8c = $(String.raw`#loginextra2`);
    if (!_0x399b8c[String.raw`html`]()) {
      _0x399b8c[String.raw`html`](Common);
      $(String.raw`#username,#password`)[String.raw`keypress`](function (_0x148b25) {
        return DoReturn(_0x148b25);
      });
      $(String.raw`#passviewbut`)[String.raw`off`](String.raw`click`)[String.raw`click`](function (_0x373b22) {
        PassReveal($(_0x373b22[String.raw`target`]));
      });
    }
  }
}
function DoReturn(_0x4ee7e1) {
  return _0x4ee7e1[String.raw`which`] != 13 || ($(String.raw`#lost`)[String.raw`hasClass`](String.raw`d-none`) ? $(String.raw`#login`)[String.raw`hasClass`](String.raw`d-none`) ? $(String.raw`#changename`)[String.raw`hasClass`](String.raw`d-none`) ? $(String.raw`#changepass`)[String.raw`hasClass`](String.raw`d-none`) || $(String.raw`#butchangepass`)[String.raw`click`]() : $(String.raw`#butchangename`)[String.raw`click`]() : $(String.raw`#butlogin`)[String.raw`click`]() : $(String.raw`#butlost`)[String.raw`click`](), false);
}
function AddClicks() {
  $(String.raw`#newname,#lostemail,#cpass1,#cpass2`)[String.raw`keypress`](function (_0x314166) {
    return DoReturn(_0x314166);
  });
  $(String.raw`.PassReveal`)[String.raw`click`](function (_0x1c3bdb) {
    PassReveal($(_0x1c3bdb[String.raw`target`]));
  });
  $(String.raw`#butquiz`)[String.raw`click`](function (_0x2171ed) {
    $(String.raw`#tabquiz`)[String.raw`removeClass`](String.raw`d-none`);
    DoTask(String.raw`quiz`);
    loadQuiz();
  });
  $(String.raw`#butlogin,#butsettings,#butchangename,#butdelete,#butlost,#butregister,#butchangepass,#butlogout`)[String.raw`click`](function (_0x325dab) {
    _0x325dab[String.raw`preventDefault`]();
    let _0x3a4508 = commonPost();
    _0x3a4508[String.raw`NameEmail`] = _0x3a4508[String.raw`YourEmail`];
    if (Pin) {
      _0x3a4508[String.raw`Pin`] = Pin;
    }
    if (todo) {
      _0x3a4508[String.raw`UserId`] = todo[String.raw`w_userno`];
    }
    if (DoneQuiz) {
      _0x3a4508[String.raw`DoneQuiz`] = 1;
    }
    if (!$(String.raw`#settings`)[String.raw`hasClass`](String.raw`d-none`)) {
      switch ($(String.raw`input[name='protection']:checked`)[String.raw`val`]()) {
        case "1":
          _0x3a4508[String.raw`Protected`] = String.raw`OFF`;
          _0x3a4508[String.raw`Locked`] = String.raw`OFF`;
          break;
        case "2":
          _0x3a4508[String.raw`Protected`] = "ON";
          _0x3a4508[String.raw`Locked`] = String.raw`OFF`;
          break;
        case "3":
          _0x3a4508[String.raw`Protected`] = "ON";
          _0x3a4508[String.raw`Locked`] = "ON";
      }
      if ($(String.raw`#ResetApiKey`)[String.raw`prop`](String.raw`checked`)) {
        _0x3a4508[String.raw`ResetApiKey`] = String.raw`ResetApiKey`;
      }
      if ($(String.raw`#DelMobs`)[String.raw`prop`](String.raw`checked`)) {
        _0x3a4508[String.raw`DelMobs`] = String.raw`DelMobs`;
      }
    }
    if ($(String.raw`#changepass`)[String.raw`hasClass`](String.raw`d-none`)) {
      if ($(String.raw`#changename`)[String.raw`hasClass`](String.raw`d-none`)) {
        if ($(String.raw`#delete`)[String.raw`hasClass`](String.raw`d-none`)) {
          if ($(String.raw`#logout`)[String.raw`hasClass`](String.raw`d-none`)) {
            if ($(String.raw`#lost`)[String.raw`hasClass`](String.raw`d-none`)) {
              if (CheckReg) {
                CheckReg = 0;
                _0x3a4508[String.raw`UserId`] = UserId;
                _0x3a4508.k2 = k2;
                _0x3a4508[String.raw`mode`] = 1;
                if (GET[String.raw`params`].ac) {
                  _0x3a4508.ac = GET[String.raw`params`].ac;
                }
              } else if ($(String.raw`#register`)[String.raw`hasClass`](String.raw`d-none`)) {
                _0x3a4508[String.raw`Login`] = 1;
              } else {
                _0x3a4508[String.raw`Register`] = 1;
                _0x3a4508[String.raw`UserId`] = UserId;
                _0x3a4508.k2 = k2;
                _0x3a4508[String.raw`Username`] = $(String.raw`#registername`)[String.raw`val`]();
                _0x3a4508[String.raw`g-recaptcha-response`] = grecaptcha[String.raw`getResponse`]();
                _0x3a4508[String.raw`agree`] = $(String.raw`#registerterms`)[String.raw`prop`](String.raw`checked`) ? "ON" : 0;
                _0x3a4508[String.raw`password`] = $(String.raw`#regpass`)[String.raw`val`]();
                _0x3a4508[String.raw`password2`] = $(String.raw`#regpass2`)[String.raw`val`]();
                _0x3a4508[String.raw`email`] = $(String.raw`#regemail`)[String.raw`val`]();
                if (xConfig[String.raw`captoken`]) {
                  _0x3a4508[String.raw`captoken`] = xConfig[String.raw`captoken`];
                }
              }
            } else {
              _0x3a4508[String.raw`ForgotPassword`] = 1;
              _0x3a4508[String.raw`NameEmail`] = $(String.raw`#lostemail`)[String.raw`val`]();
              _0x3a4508[String.raw`g-recaptcha-response`] = grecaptcha[String.raw`getResponse`]();
            }
          } else {
            _0x3a4508[String.raw`Logout`] = 1;
          }
        } else {
          _0x3a4508[String.raw`Delete`] = 1;
          _0x3a4508[String.raw`Username`] = $(String.raw`#newname`)[String.raw`val`]();
          if ($(String.raw`#DelMobs`)[String.raw`prop`](String.raw`checked`)) {
            _0x3a4508[String.raw`DelMobs`] = String.raw`DelMobs`;
          }
        }
      } else {
        _0x3a4508[String.raw`ChangeUserName`] = 1;
        _0x3a4508[String.raw`Username`] = $(String.raw`#newname`)[String.raw`val`]();
      }
    } else {
      _0x3a4508[String.raw`ChangePassword`] = 1;
      _0x3a4508[String.raw`oldpassword`] = $(String.raw`#cppass`)[String.raw`val`]();
      _0x3a4508[String.raw`NameEmail`] = $(String.raw`#cpname`)[String.raw`val`]();
      _0x3a4508[String.raw`password`] = $(String.raw`#cppass1`)[String.raw`val`]();
      _0x3a4508[String.raw`password2`] = $(String.raw`#cppass2`)[String.raw`val`]();
      if (GET[String.raw`params`][String.raw`key`]) {
        _0x3a4508[String.raw`key`] = GET[String.raw`params`][String.raw`key`];
      }
      _0x3a4508[String.raw`UserId`] = GET[String.raw`params`][String.raw`UserId`];
    }
    $(document[String.raw`body`])[String.raw`css`]({
      cursor: String.raw`wait`
    });
    loginUrlPost(loginUrl, _0x3a4508)[String.raw`then`](function (_0x4de956) {
      $(document[String.raw`body`])[String.raw`css`]({
        cursor: String.raw`default`
      });
      allErrsOff();
      $(String.raw`#ResetApiKey`)[String.raw`prop`](String.raw`checked`, false);
      $(String.raw`#DelMobs`)[String.raw`prop`](String.raw`checked`, false);
      if (_0x4de956[String.raw`Err`][String.raw`Settings`]) {
        DoSettings(_0x4de956);
      } else {
        if (_0x4de956[String.raw`Err`][String.raw`login`]) {
          if (_0x4de956[String.raw`Err`][String.raw`ClrHash`] && todo) {
            todo[String.raw`PassHash`] = "1";
            SetNewTodo(todo);
          }
          GotLogin = 0;
          SetTab(String.raw`login`);
          $(String.raw`.NotLogin`)[String.raw`addClass`](String.raw`d-none`);
          DoLogin();
        } else if (_0x4de956[String.raw`Err`][String.raw`LogoutEmbed`]) {
          $(String.raw`#Logout1`)[String.raw`addClass`](String.raw`d-none`);
          $(String.raw`#Logout2`)[String.raw`removeClass`](String.raw`d-none`);
          localStorage[String.raw`clear`]();
          clearCookies();
        } else {
          if (_0x4de956[String.raw`Err`][String.raw`lostok`]) {
            String.raw`<p class="font-weight-bold" data-localize="login.spambox">IMPORTANT: If you do not receive an email check your spam inbox.</p>`;
            String.raw`<span class="font-weight-bold">(<span data-localize="login.minutesto">The email could take up to 30 minutes to arrive.</span>)</span>`;
            $(String.raw`#lostextra`)[String.raw`addClass`](String.raw`d-none`);
            $(String.raw`#lostcap`)[String.raw`html`]("");
            doSuccessMsg($(String.raw`#lostokerr`), String.raw`<p data-localize="login.emailsent">An e-mail has been sent. Please click on the link in that email to set a new password.</p><p class="font-weight-bold" data-localize="login.spambox">IMPORTANT: If you do not receive an email check your spam inbox.</p><span class="font-weight-bold">(<span data-localize="login.minutesto">The email could take up to 30 minutes to arrive.</span>)</span>`, false);
            return;
          }
          if (_0x4de956[String.raw`Err`][String.raw`ShowRegister`]) {
            $(String.raw`#id`)[String.raw`val`](UserId);
            SetTab(String.raw`register`);
            ShowDialog(page);
            $(String.raw`[id^="tab"]`)[String.raw`addClass`](String.raw`d-none`);
            $(String.raw`#tabregister,#tablost,#tablogin`)[String.raw`removeClass`](String.raw`d-none`);
            if (_0x4de956[String.raw`Err`][String.raw`captoken`]) {
              xConfig[String.raw`captoken`] = _0x4de956[String.raw`Err`][String.raw`captoken`];
              $(String.raw`#registercap`)[String.raw`addClass`](String.raw`d-none`);
            } else {
              AddCap(String.raw`registercap`);
              xConfig[String.raw`captoken`] = "";
            }
            if (_0x4de956[String.raw`Err`][String.raw`regnoform`]) {
              $(String.raw`#regform`)[String.raw`addClass`](String.raw`d-none`);
            }
          }
        }
        switch (page) {
          case String.raw`lost`:
            if (!_0x4de956[String.raw`Err`][String.raw`lostok`]) {
              AddCap(String.raw`lostcap`);
            }
            break;
          case String.raw`changepass`:
            if (_0x4de956[String.raw`Err`][String.raw`changepassok`]) {
              GotLogin = 0;
              SetTab();
              $(String.raw`#cpform`)[String.raw`addClass`](String.raw`d-none`);
            }
        }
        DoErrs(_0x4de956);
      }
      localize();
    });
  });
}
function DoLost() {
  Reset();
  ShowDialog(String.raw`lost`);
  AddCap(String.raw`lostcap`);
  $(String.raw`#lostextra`)[String.raw`removeClass`](String.raw`d-none`);
}
function loadQuiz(_0x563975 = null) {
  _0x563975 = _0x563975 == null ? xConfig[String.raw`lang`] : _0x563975;
  loginUrlPost(String.raw`//rxat.ro/json/translate/quiz-` + _0x563975 + String.raw`.php`)[String.raw`then`](function (_0x1ad134) {
    if (_0x1ad134[String.raw`quiz`] == null) {
      return loadQuiz("en");
    }
    var _0x137d5f = _0x1ad134[String.raw`quiz`];
    var _0x19c1cf = null;
    var _0x361d26 = [];
    var _0x3f00ea = 0;
    $[String.raw`each`](_0x137d5f, function (_0x67e57f, _0x4941be) {
      if (isNaN(_0x67e57f[String.raw`slice`](-1)) || String.raw`quizq` != _0x67e57f[String.raw`substr`](0, 5) || _0x67e57f[String.raw`indexOf`]("a") != -1) {
        if (String.raw`quizq` == _0x67e57f[String.raw`substr`](0, 5) && _0x67e57f[String.raw`indexOf`]("a") > -1 && String.raw`image` !== _0x67e57f[String.raw`slice`](-5)) {
          _0x361d26[_0x19c1cf][String.raw`answer`][String.raw`push`]([_0x67e57f, _0x4941be][String.raw`join`](";"));
        } else if (String.raw`quizq` == _0x67e57f[String.raw`substr`](0, 5) && String.raw`info` == _0x67e57f[String.raw`slice`](-4)) {
          _0x361d26[_0x19c1cf][String.raw`info`] = _0x4941be;
        } else if (String.raw`quizq` == _0x67e57f[String.raw`substr`](0, 5) && String.raw`image` == _0x67e57f[String.raw`slice`](-5)) {
          _0x361d26[_0x19c1cf][String.raw`image`] = _0x4941be;
        }
      } else {
        _0x19c1cf = _0x67e57f[String.raw`replace`](/quizq/i, "");
        _0x3f00ea++;
        _0x361d26[_0x19c1cf] = {
          qID: parseInt(_0x19c1cf),
          question: _0x4941be,
          answer: [],
          info: "",
          image: ""
        };
      }
    });
    $(String.raw`#start_quiz`)[String.raw`click`](() => {
      $(String.raw`#start_quiz`)[String.raw`hide`]();
      $(String.raw`.pro`)[String.raw`removeClass`](String.raw`d-none`);
      loadQuestions(_0x361d26, 1, _0x3f00ea);
    });
  });
}
function loadQuestions(_0x2373a1, _0x398f58, _0x561025) {
  const _0x4583fa = {
    [String.raw`Err`]: {}
  };
  var _0x330c8f = _0x2373a1[_0x398f58];
  var _0x200c16 = $(String.raw`#quizForm`);
  var _0x3bdaa6 = $(String.raw`#question_string`);
  var _0x5aa70b = $(String.raw`#answers_list`);
  var _0x1cc953 = $(String.raw`#question_image`);
  var _0x2915d2 = $(String.raw`#next`);
  var _0xfb218 = _0x4583fa;
  var _0xf429a6 = false;
  var _0x444a7f = 10;
  var _0x392d11 = $(String.raw`.mainCountdown`);
  var _0x5586a8 = false;
  const _0x553aaa = {
    [String.raw`Err`]: {}
  };
  if (_0x398f58 > _0x561025) {
    updateProgress(_0x398f58, _0x561025);
    _0x5586a8 = true;
    _0xf429a6 = true;
    _0x200c16[String.raw`hide`]();
    _0xfb218[String.raw`Err`][String.raw`successmessage`] = String.raw`<span data-localize="quiz.gratz">Congratulations, you have completed the quiz! You should now be more knowledgeable about safety on ixat.</span>`;
    _0xfb218[String.raw`Err`][String.raw`waitmessage`] = String.raw`<span data-localize="quiz.redirect">Please wait while you are redirected to the login page.</span>`;
    DoErrs(_0xfb218);
    localize([String.raw`quiz`]);
    _0xfb218 = _0x553aaa;
    setTimeout(() => {
      DoneQuiz = true;
      SetTab(String.raw`login`);
      $(String.raw`#butsettings`)[String.raw`click`]();
      resetQuiz(_0x561025, _0x200c16);
    }, 5000);
  } else {
    _0x3bdaa6[String.raw`html`](_0x330c8f[String.raw`question`]);
    if (_0x330c8f[String.raw`image`] != "") {
      _0x1cc953[String.raw`html`](_0x330c8f[String.raw`image`][String.raw`replace`](String.raw`<br `, "<"));
    }
    var _0x442495 = "";
    _0x330c8f[String.raw`answer`] = shuffleArray(_0x330c8f[String.raw`answer`]);
    for (var _0x226e2c in _0x330c8f[String.raw`answer`]) {
      var _0x31bd46 = _0x330c8f[String.raw`answer`][_0x226e2c][String.raw`split`](";");
      _0x442495 += String.raw`<div class="form-check">
               <input class="form-check-input position-static" type="radio" id="` + _0x31bd46[0] + String.raw`" name="qAnswer_` + _0x330c8f[String.raw`qID`] + String.raw`" value="` + _0x31bd46[0] + String.raw`">
               <label class="form-check-label" for="` + _0x31bd46[0] + "\">" + _0x31bd46[1] + String.raw`</label>
         </div>`;
    }
    _0x442495 += String.raw`</div>`;
    _0x5aa70b[String.raw`html`](_0x442495);
    if (_0x200c16[String.raw`hasClass`](String.raw`d-none`)) {
      _0x200c16[String.raw`removeClass`](String.raw`d-none`);
    } else {
      _0x200c16[String.raw`show`]();
    }
    $(String.raw`input[type=radio]`)[String.raw`change`](_0x1ac818 => {
      if (_0xf429a6 == 0 && _0x5586a8 == 0) {
        allErrsOff();
        var _0xb8bffd = _0x1ac818[String.raw`target`].id;
        var _0x2efbcd = parseInt(_0xb8bffd[String.raw`split`]("a")[1]);
        if (_0x2efbcd % _0x561025 < 1 || _0x2efbcd % _0x561025 > 1) {
          _0xfb218[String.raw`Err`][String.raw`wronganswer`] = String.raw`<span data-localize="quiz.wronganswer">This is incorrect. Please try again.</span>`;
        } else {
          disableAnswers();
          if (_0x330c8f[String.raw`info`] != "") {
            _0xfb218[String.raw`Err`][String.raw`moreinfo`] = String.raw`<span>` + _0x330c8f[String.raw`info`] + String.raw`</span>`;
          }
          $(String.raw`#countdown`)[String.raw`html`](_0x444a7f);
          var _0x54464e = setInterval(() => {
            if (_0x444a7f == 10) {
              _0x392d11[String.raw`removeClass`](String.raw`d-none`);
            } else if (_0x444a7f == 0) {
              clearInterval(_0x54464e);
              _0x398f58++;
              _0xf429a6 = true;
              _0x392d11[String.raw`addClass`](String.raw`d-none`);
              $(String.raw`#countdown`)[String.raw`html`](10);
              _0x2915d2[String.raw`removeClass`](String.raw`d-none`);
              _0x2915d2[String.raw`prop`](String.raw`disabled`, false);
            } else {
              $(String.raw`#countdown`)[String.raw`html`]("" + _0x444a7f);
            }
            _0x444a7f--;
          }, 1000);
        }
        const _0x158fad = {
          [String.raw`Err`]: {}
        };
        DoErrs(_0xfb218);
        localize([String.raw`quiz`]);
        _0xfb218 = _0x158fad;
      }
    });
    _0x2915d2[String.raw`click`](() => {
      allErrsOff();
      if (_0xf429a6 != 0) {
        loadQuestions(_0x2373a1, _0x398f58, _0x561025);
        updateProgress(_0x398f58 - 1, _0x561025);
        _0xf429a6 = false;
        _0x2915d2[String.raw`addClass`](String.raw`d-none`);
        _0x2915d2[String.raw`prop`](String.raw`disabled`, true);
      }
    });
  }
}
function updateProgress(_0x5754ae, _0x3c8477) {
  var _0x22f572 = $(String.raw`#progress`);
  var _0x48dedc = Math[String.raw`round`](_0x5754ae / _0x3c8477 * 100);
  _0x22f572[0][String.raw`style`][String.raw`cssText`] = String.raw`width: ` + _0x48dedc + "%";
  _0x22f572[String.raw`html`](_0x48dedc + "%");
  _0x22f572[String.raw`attr`](String.raw`aria-valuenow`, _0x48dedc);
}
function disableAnswers() {
  $(String.raw`.mainForm input[type=radio]`)[String.raw`each`](function () {
    $(this)[String.raw`attr`](String.raw`disabled`, true);
  });
}
function resetQuiz(_0x29c91e, _0x52bc6e) {
  updateProgress(0, _0x29c91e);
  _0x52bc6e[String.raw`hide`]();
  $(String.raw`.pro`)[String.raw`addClass`](String.raw`d-none`);
  $(String.raw`#start_quiz`)[String.raw`show`]();
}
if (mode == 1) {
  UserId ||= xConfig.id;
  k2 ||= xConfig.k2;
}
if (UserId && k2 && GET[String.raw`params`][String.raw`key`]) {
  DoTask(String.raw`changepass`);
  $(String.raw`#cpnouser`)[String.raw`addClass`](String.raw`d-none`);
} else if (UserId && k2 && (mode == 1 || GET[String.raw`params`].ac)) {
  CheckReg = 1;
  $(String.raw`#butlogin`)[String.raw`click`]();
} else {
  DoTask(getRealHash());
}
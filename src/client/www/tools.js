'use strict';

// Use global page variable
window.page = window.page || 'tools';
var toolsTab;
var toolsTempFeature = window.toolsTempFeature || [];
if (document.body) {
  document.body.style.backgroundColor = "white";
  document.body.classList.remove("invisible");
}
$("#navGroup,#navxatApps").addClass("d-none");
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
localize(["tools"]);
fetchPromo();
setLogo();
const a0_1x3fe99d = {
  search: false,
  animation: false
};
var listener = a0_1x3fe99d;
let toolstoolsCommom = $("#CommonDiv").html();
$("#CommonDiv").html("");
location.hash = "#" + GET.hash;
$("#toolsTabsearch,#toolsTabanimation,#toolsTabshuffle").click(function (_0x1281d4) {
  let _0xcd104f = _0x1281d4.currentTarget.id.substr(3);
  DoTask(_0xcd104f);
  location.hash = "#!" + _0xcd104f;
  return false;
});
let get = getGET();
let path = get.path;
function DoTask(_0x1404be) {
  switch (_0x1404be) {
    case "search":
      DoSearch(_0x1404be);
      break;
    case "animation":
      DoAnimation(_0x1404be);
      break;
    case "shuffle":
      DoShuffle(_0x1404be);
      break;
    case "maintenance":
      DoMaintenance(_0x1404be);
      break;
    case "terms":
      DoTerms(_0x1404be);
      break;
    case "privacy":
      DoPrivacy(_0x1404be);
      break;
    default:
      _0x1404be = "search";
      DoSearch();
  }
  page = _0x1404be;
  addRemoveClass(".NavTabs", "active", true);
  addRemoveClass("#toolsTab" + _0x1404be, "active", false);
}
function DoSearch() {
  Reset();
  handleSearch();
  addRemoveClass("#search", "d-none", true);
}
function DoAnimation() {
  Reset();
  handleAnimation();
  addRemoveClass("#animation", "d-none", true);
}
function DoShuffle() {
  const _0x1b204a = {
    XsPRi: "<label for=\"",
    VJyaw: "\" class=\"custom-file-input\" id=\""
  };
  _0x1b204a.yHsgH = "\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <div class=\"clearfix\">\n                        <img src=\"";
  _0x1b204a.NGMlY = "</a>\n                </div>\n            </div>\n            <br>\n      ";
  _0x1b204a.GdWHs = "{}.constructor(\"return this\")( )";
  Reset();
  handleShuffle();
  addRemoveClass("#shuffle", "d-none", true);
}
function DoMaintenance() {
  Reset();
  addRemoveClass("#maintenance", "d-none", true);
  addRemoveClass("#checktools", "d-none", false);
  addRemoveClass("#pdtools", "d-none", false);
  addRemoveClass("#toolsbody", "toolsbody", false);
  addRemoveClass(".rhistory" + (new Date().getTime() % 3 + 1), "d-none", true);
}
function DoTerms() {
  Reset();
  addRemoveClass("#terms", "d-none", true);
  addRemoveClass("#checktools", "d-none", false);
  addRemoveClass("#pdtools", "d-none", false);
}
function DoPrivacy() {
  Reset();
  addRemoveClass("#privacy", "d-none", true);
  addRemoveClass("#checktools", "d-none", false);
  addRemoveClass("#pdtools", "d-none", false);
}
if (["privacy", "privacy2"].indexOf(path) >= 0) {
  DoPrivacy(n);
}
if (["terms", "terms2"].indexOf(path) >= 0) {
  DoTerms(n);
}
if (["maintenance", "maintenance2"].indexOf(path) >= 0) {
  DoMaintenance(n);
}
if (["search"].indexOf(path) >= 0) {
  DoSearch(n);
}
if (["convertanimation"].indexOf(path) >= 0) {
  DoAnimation(n);
}
if (["convertshuffle"].indexOf(path) >= 0) {
  DoShuffle(n);
}
$(".custom-file-input").on("change", function () {
  var _0x51f7d9 = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(_0x51f7d9);
});
let countBox = 3;
const boxTitle = 3;
const boxName = 3;
let last = 0;
let didEvents = false;
function addInput() {
  if (countBox == 8) {
    showAddField("none");
  }
  if (countBox <= 8) {
    var _0x2b054b = "inputGroupFile" + countBox;
    var _0x5b58aa = "<div class=\"mb-3\" id=\"field_" + countBox + "\">";
    _0x5b58aa = (_0x5b58aa = (_0x5b58aa = _0x5b58aa + "<label for=\"imgname" + countBox + "\" data-localize=tools.image>image (" + countBox + "):</label>") + "<div class=\"custom-file\"><input type=\"file\" name=\"file" + countBox + "\" class=\"custom-file-input\" id=\"" + _0x2b054b + "\"/>") + "<label class=\"custom-file-label\" for=\"" + _0x2b054b + "\" data-localize=tools.selectimg>Select image</label></div></div>";
    document.getElementById("addfield").innerHTML += _0x5b58aa;
    localize();
  }
  last = countBox == 3 ? countBox : countBox - 1;
  countBox = countBox + 1;
  updateBin();
}
function updateBin() {
  var _0x50852b = countBox - 1;
  var _0x14b7fa = document.getElementById("field_" + _0x50852b);
  var _0x4db72e = document.getElementById("field_" + last);
  if (_0x4db72e) {
    var _0xc6cd2d;
    var _0x90ab4c = document.getElementById("bin_" + last);
    (_0xc6cd2d = _0x4db72e.children)[1].classList.remove("customWidth");
    if (_0x90ab4c) {
      _0x90ab4c.remove();
    }
  }
  if (_0x14b7fa) {
    (_0xc6cd2d = _0x14b7fa.children[1]).classList += " customWidth";
    _0xc6cd2d.innerHTML += "<a id=\"bin_" + _0x50852b + "\" class=\"bin\" onclick=\"removeField(" + _0x50852b + ")\"><img src=\"../src/img/navbar/remove.svg\"></a>";
  }
}
function removeField(_0x37fcbe) {
  var _0x278e9c = document.getElementById("field_" + _0x37fcbe);
  if (_0x278e9c) {
    _0x278e9c.remove();
    last = countBox = countBox - 1;
    updateBin();
    if (countBox <= 8) {
      showAddField("");
    }
  }
}
function showAddField(_0x2b742d) {
  document.getElementById("add_field").style.display = _0x2b742d;
}
let uri = "https://rxat.ro/web_gear/chat/search2.php?cb=" + Math.random();
let previousTime = 0;
let previousValue = null;
function handleSearch() {
  resetSearch();
  if (listener.search) {
    return;
  }
  let _0x477cd5 = document.getElementById("searchValue");
  let _0x427c7f = document.getElementById("searchSubmit");
  let _0x132929 = document.getElementById("butpreviousresults");
  if (_0x427c7f != null) {
    _0x427c7f.addEventListener("submit", _0x1610fa => {
      _0x1610fa.preventDefault();
      if (_0x477cd5.value) {
        sendSearchParams(filter(_0x477cd5.value), true);
      }
    });
  }
  if (_0x132929 != null) {
    _0x132929.addEventListener("click", _0x41173e => {
      _0x41173e.preventDefault();
      if (_0x477cd5.value) {
        sendSearchParams(filter(previousValue), false);
      }
    });
  }
  listener.search = true;
}
function resetSearch() {
  previousTime = 0;
  previousValue = null;
  let _0x7f3e8e = document.getElementById("searchValue");
  const searchResults = document.querySelector("[data-search-results] div");
  if (searchResults) {
    searchResults.innerHTML = "";
  }
  if (_0x7f3e8e) {
    _0x7f3e8e.value = "";
  }
  addRemoveClass("[data-search-results]", "d-none", false);
  addRemoveClass("#butpreviousresults", "d-none", false);
  addRemoveClass("[data-no-result-div]", "d-none", false);
  addRemoveClass("#searcherror", "d-none", false);
  addRemoveClass("#searchloading", "d-none", false);
}
function sendSearchParams(_0x46f9fe, _0x1813fa) {
  if (!_0x46f9fe) {
    return;
  }
  let _0x1887e1 = uri + "&search=" + _0x46f9fe;
  if (previousTime > 0 && _0x46f9fe == previousValue && !_0x1813fa) {
    _0x1887e1 = _0x1887e1 + "&from=" + (previousTime + 1);
  }
  addRemoveClass("#searchloading", "d-none", true);
  addRemoveClass("[data-no-result-div]", "d-none", false);
  fetch(_0x1887e1).then(function (_0x38f72f) {
    return _0x38f72f.json();
  }).then(function (_0x526ccb) {
    setTimeout(function () {
      handleSearchResults(_0x526ccb.Err);
      addRemoveClass("#searchloading", "d-none", false);
    }, 1000);
  }).catch(_0x21612c => {
    addRemoveClass("#searcherror", "d-none", true);
    addRemoveClass("#searchloading", "d-none", false);
  });
  previousValue = _0x46f9fe;
}
function handleSearchResults(_0x50d346) {
  var _0xa3fa68;
  var _0x52ce28;
  if (!_0x50d346) {
    return;
  }
  let _0x58605b = _0x50d346.results || [];
  let _0x73fd99 = document.querySelector("[data-search-results] div");
  _0x73fd99.innerHTML = "";
  addRemoveClass("[data-search-results]", "d-none", !_0x50d346.nores && !(_0x50d346 == null || (_0xa3fa68 = _0x50d346.Err) == null ? undefined : _0xa3fa68.search2));
  addRemoveClass("#butpreviousresults", "d-none", !_0x58605b || !(_0x58605b.length < 5));
  addRemoveClass("[data-no-result-div]", "d-none", !!_0x50d346.nores);
  if (_0x50d346 == null || (_0x52ce28 = _0x50d346.Err) == null ? undefined : _0x52ce28.search2) {
    addRemoveClass("#searcherror", "d-none", true);
  } else if (!_0x50d346.nores) {
    for (let _0x221244 = 0; _0x221244 < _0x58605b.length; _0x221244++) {
      var _0x27f785;
      const _0x300cda = _0x58605b[_0x221244].split(",");
      let _0xa00acf = _0x300cda[6].split("##");
      let _0x21c97c = _0x300cda[5].split("##")[0];
      _0x21c97c &&= _0x21c97c.replace(/ *\([^)]*\) */g, "").replace(/\((.+)$/, "");
      let _0x44e3da = GetTimeToGo(_0x300cda[1] * 1000);
      let _0x4a2f30 = (_0x27f785 = _0x300cda[4]) == null ? undefined : _0x27f785.split(";");
      let _0x2a4eb0 = _0x4a2f30[1] > 0 ? " (" + _0x4a2f30[1] + ")" : "";
      let _0x516244 = "https://images.weserv.nl/?q=100&url=" + encodeURIComponent(_0xa00acf) + "&default=" + xConfig.origin + xConfig.dir + "img/xatspace/default.png";
      if (_0xa00acf[0] > 0 && _0xa00acf[0] <= 1758) {
        _0x516244 = "https://rxat.ro/web_gear/chat/av/" + _0xa00acf[0] + ".png";
      }
      if (_0xa00acf[0] && _0xa00acf[0].charAt(0) == "(") {
        _0x516244 = xConfig.dir + "img/xatspace/default.png";
      }
      _0x73fd99.innerHTML += "\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <div class=\"clearfix\">\n                        <img src=\"" + _0x516244 + "\" width=\"30\" height=\"30\" class=\"pull-left img-responsive mr-2\">\n                        <span>" + filter(_0x21c97c.length > 0 ? _0x21c97c : _0x4a2f30[0]) + " <small>[" + _0x4a2f30[0] + _0x2a4eb0 + "]</small></span>\n                    </div>\n                </div>\n                <div class=\"card-block px-2\">\n                    <p class=\"card-text mt-2 mb-2\">" + filter(_0x300cda[7]) + "</p>\n                </div>\n                <div class=\"w-100\"></div>\n                <div class=\"card-footer w-100 text-muted\">\n                   <span data-localize=\"" + _0x44e3da[0] + "\">" + _0x44e3da[1].replace("$1", _0x44e3da[2]) + "</span> @ <a href=\"" + xConfig.origin + "/" + _0x300cda[2] + "\" target=\"_blank\">" + xConfig.origin.replace("https://", "") + "/" + _0x300cda[2] + "</a>\n                </div>\n            </div>\n            <br>\n        ";
      if (_0x221244 + 1 == _0x58605b.length) {
        previousTime = parseInt(_0x300cda[1]);
      }
    }
    document.querySelector("#searchSubmit").scrollIntoView({
      behavior: "smooth"
    });
  }
}
function handleAnimation() {
  if (listener.animation) {
    return;
  }
  let _0x27f55e = document.querySelector("#animation #convert");
  let _0x529204 = document.querySelector("#animateName");
  let _0x1ef06c = document.querySelector("#animateFile");
  let _0x347755 = false;
  if (_0x1ef06c != null) {
    _0x1ef06c.addEventListener("change", _0x27057a => {
      var _0x28b609;
      _0x347755 = false;
      addRemoveClass("#animation_error", "d-none", false);
      let _0x2fd6c4 = _0x27057a == null || (_0x28b609 = _0x27057a.target) == null ? undefined : _0x28b609.files;
      if (_0x2fd6c4.length) {
        if (_0x2fd6c4[0].type && _0x2fd6c4[0].type !== "image/gif") {
          addRemoveClass("#animation_error", "d-none", true);
        } else {
          const _0x435aea = new FileReader();
          _0x2fd6c4[0];
          _0x435aea.onload = _0x342b1d => {
            _0x347755 = _0x342b1d.target;
          };
          _0x435aea.readAsDataURL(_0x2fd6c4[0]);
        }
      }
    });
  }
  if (_0x27f55e != null) {
    _0x27f55e.addEventListener("click", _0xaf7b9a => {
      ({
        ySmdC: "\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <div class=\"clearfix\">\n                        <img src=\""
      }).iwzuW = "</a>\n                </div>\n            </div>\n            <br>\n        ";
      _0xaf7b9a.preventDefault();
      if (!_0x347755) {
        return;
      }
      let _0x43844d = _0x347755.result.split(",");
      const _0x3b961a = {
        gif: _0x43844d[1]
      };
      addRemoveClass("#animationloading", "d-none", true);
      addRemoveClass("#animationreqerror", "d-none", false);
      urlPost("https://rxat.ro/web_gear/chat/ConvertAnimation2.php", _0x3b961a).then(function (_0x164185) {
        addRemoveClass("#animationloading", "d-none", false);
        if (_0x164185.Err.Error) {
          return doErrorMsg($("#animationerror"), _0x164185.Err.Error);
        }
        if (_0x164185.Err.data) {
          _0x43844d[1] = _0x164185.Err.data;
          let _0x10c6d9 = document.createElement("a");
          _0x10c6d9.href = _0x43844d.join(",");
          _0x10c6d9.download = _0x529204.value.length > 0 ? filter(_0x529204.value) : "My Avatar";
          _0x10c6d9.click();
        }
      }).catch(function (_0x1d653b) {
        addRemoveClass("#animationloading", "d-none", false);
        addRemoveClass("#animationreqerror", "d-none", true);
      });
    });
  }
  listener.animation = true;
}
function handleShuffle() {
  initInputEvents();
}
function initInputEvents() {
  if (!didEvents) {
    document.getElementById("add_field").addEventListener("click", function (_0xedbfcd) {
      _0xedbfcd.preventDefault();
      addInput();
    });
    didEvents = true;
  }
}
DoTask(location.hash.substr(2));
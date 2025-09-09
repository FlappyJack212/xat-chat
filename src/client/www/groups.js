"use strict";
var Favorites;
var FavHash;
var Search;
var Promos;
var PromoTime;
var PagesLoaded;
var PageAskedFor;
var MaxPages;
var PageDiv;
var Sections = ["Favorites", "Featured", "Popular", "Supported"];
var CurrentSec = "Favorites";
var ScrollContainer = document.getElementById("ScrollContainer");
var Dups = {};
var Empty = true;
let clickedSearch = false;
let time = null;
function initSearchBar() {
  let _0x415a17 = document.querySelector("#searchBar");
  if (_0x415a17) {
    resizeSearchBar(_0x415a17);
    _0x415a17.addEventListener("keyup", _0x36fb88 => {
      clearTimeout(time);
      time = setTimeout(() => {
        if (true) {
          DoSearch(_0x36fb88.target.value);
        } else {
          return _0x59e1cb.appendChild(_0x387250(_0x2b031e("mob2.failedtoload", "Failed to load groups list for this section")));
        }
      }, 500);
    });
  }
}
function main(_0x4b75cc) {
  xatMain(_0x4b75cc);
  loadPromo();
  LoadBackground("");
  addTitleBar(["mob1.groups", "Groups"], "", null, "🔍", SearchClick);
  AddSections(Sections, "configurePage(0, '");
  SetSection("Favorites");
  InitPage(0);
  document.body.style.display = "block";
  document.getElementById("titleBar").clientHeight;
  document.getElementById("topSelector").clientHeight;
  ScrollContainer.style.top = document.getElementById("titleBar").clientHeight + document.getElementById("topSelector").clientHeight - 10 + "px";
  ScrollContainer.style.bottom = "0px";
  ScrollContainer.addEventListener("scroll", myOnScrollEventHandler, false);
  doZap(10);
  initSearchBar();
  TranslateAll();
}
function sendApp(_0x24b170) {
  ToC({
    Group: _0x24b170,
    Page: "groups",
    Command: "StartGroup",
    Next: "chats"
  });
}
function SearchClick() {
  let _0x2ac952 = document.querySelector("#searchBar");
  if (_0x2ac952) {
    _0x2ac952.style.display = clickedSearch ? "none" : "";
    clickedSearch = !clickedSearch;
    _0x2ac952.value = "";
    updateGroupsOpacity(clickedSearch ? 0.5 : 1);
  }
}
function updateGroupsOpacity(_0x3e62b3) {
  let _0x1911f4 = document.querySelector("#messages");
  if (_0x1911f4) {
    _0x1911f4.style.opacity = _0x3e62b3;
  }
}
function configurePage(_0x159bb4, _0x30e62a) {
  if (_0x159bb4) {
    if (typeof _0x159bb4 == "string" && _0x159bb4.charAt(0) == "[") {
      _0x159bb4 = JSON.parse(_0x159bb4);
    }
    if (_0x30e62a == "Favorites") {
      Favorites = _0x159bb4;
      _0x30e62a = undefined;
    } else {
      Search = _0x159bb4;
    }
  }
  var _0x4a173b = document.getElementById("messages");
  _0x4a173b.innerHTML = "";
  if (_0x30e62a != null) {
    CurrentSec = _0x30e62a;
  }
  Section(_0x4a173b, CurrentSec);
  if (_0x30e62a) {
    SetSection(_0x30e62a);
  }
  if (CurrentSec == "Favorites" && isEmpty(FavHash)) {
    _0x4a173b.appendChild(MakeHelpMessage(TransText("mob2.addfav", "To add favorite chat groups, click on the grey star next to a xat group")));
  }
}
function Section(_0x302e95, _0x2e8c7d) {
  Dups = {};
  _0x2e8c7d.toLowerCase();
  var _0xf5f825 = PageDiv = makeElement(_0x302e95, "div");
  _0xf5f825.setAttribute("id", _0x2e8c7d);
  loadPromo();
  if (_0x2e8c7d == "Search") {
    if (Search) {
      addGroups(_0xf5f825, 999, Search);
    }
    Search = 0;
  } else if (_0x2e8c7d == "Favorites") {
    addGroups(_0xf5f825, 999, Favorites);
  } else {
    loadStuff(0);
  }
}
function myOnScrollEventHandler(_0x210773) {
  var _0x2dcc19 = ScrollContainer.scrollHeight - ScrollContainer.clientHeight - ScrollContainer.scrollTop;
  onScrollEventHandler(_0x210773);
  if (_0x2dcc19 < 50) {
    if (PagesLoaded <= PageAskedFor) {
      return;
    }
    if (PagesLoaded >= MaxPages) {
      return;
    }
    if (CurrentSec == "Favorites") {
      return;
    }
    loadStuff(PageAskedFor + 1);
  }
}
function loadStuff(_0x106fd8) {
  loadJSON("https://rxat.ro/json/lists/" + _0x106fd8 + "_" + Language + "_" + CurrentSec.toLowerCase() + ".php", function (_0x14598b) {
    addGroups(PageDiv, 999, _0x14598b);
  }, function (_0x11fe4b) {
    return PageDiv.appendChild(MakeHelpMessage(TransText("mob2.failedtoload", "Failed to load groups list for this section")));
  });
  PageAskedFor = PagesLoaded = _0x106fd8;
}
function loadPromo() {
  var _0x383118 = microtime(true) / 1000;
  if (!Promos || !(_0x383118 < PromoTime)) {
    PromoTime = _0x383118 + 60;
    var _0x166a29 = "https://rxat.ro/json/promo.php";
    loadJSON(_0x166a29, function (_0x54121d) {
      ({
        VCDyB: "[MYfrLZnJddOybfgzqkkkgUDYRuqOlXOEYkEXk]"
      }).duVDc = "https://rxat.ro";
      gotPromos(_0x54121d);
    }, function (_0x326a74) {
      var _0x3c94e6 = {};
      console.error(_0x326a74);
    });
  }
}
function gotPromos(_0x55bae9) {
  var _0x4b8182;
  for (var _0xc384d7 in Promos = _0x55bae9) {
    for (var _0x8a6d7 in Promos[_0xc384d7]) {
      (_0x4b8182 = Promos[_0xc384d7][_0x8a6d7]).g = _0x4b8182.n;
      _0x4b8182.promo = ["mob2.promoted", "Promoted"];
      if (_0xc384d7.length == 3 && _0xc384d7.charAt(0) == "h") {
        _0x4b8182.promo = ["mob1.help", "Help"];
      }
    }
  }
}
function addGroups(_0x12ca3b, _0x384d2b, _0x1101f0) {
  var _0x2e0e81;
  var _0x22e749;
  var _0x2e9d90;
  var _0x539f8a;
  var _0x535eb9;
  LineVisible = 0;
  if (!_0x1101f0.length) {
    return _0x12ca3b.appendChild(MakeHelpMessage(TransText("mob2.nogroupfound", "No groups were found for this search")));
  }
  if (_0x1101f0 == Favorites) {
    _0x1101f0 = Favorites.slice();
  }
  if ((_0x2e9d90 = _0x1101f0[0]).l) {
    MaxPages = _0x2e9d90.l;
  }
  if (Promos && Empty) {
    _0x539f8a = "h" + Language;
    if (!Promos[_0x539f8a]) {
      _0x539f8a = "hn0";
    }
    if (!Promos[_0x539f8a]) {
      _0x539f8a = "hen";
    }
    if (Promos[_0x539f8a] && typeof _0x1101f0 == "object") {
      _0x1101f0.unshift(Promos[_0x539f8a][0]);
    }
  }
  if (Promos && (_0x539f8a = Promos[Language]) && _0x2e9d90.p == 0) {
    if (_0x1101f0[0].Pro) {
      _0x1101f0.shift();
    }
    (_0x539f8a = _0x539f8a[Math.floor(Math.random() * _0x539f8a.length)]).Pro = 1;
    if (typeof _0x1101f0 == "object") {
      _0x1101f0.unshift(_0x539f8a);
    }
  }
  for (var _0x447330 in _0x1101f0) {
    if ((_0x2e9d90 = _0x1101f0[_0x447330]).g && (_0x539f8a = _0x2e9d90.g.toLowerCase(), !Dups[_0x539f8a])) {
      Dups[_0x539f8a] = true;
      _0x535eb9 = makeElement(_0x12ca3b, "li", "group");
      iidLine++;
      _0x535eb9.setAttribute("data-line", iidLine);
      LineVisible = 0;
      _0x535eb9.setAttribute("data-visible", LineVisible);
      var _0x2ca6b3 = makeElement(_0x535eb9, "div", "listTable");
      var _0x1a1151 = makeElement(_0x2ca6b3, "div", "dialogRow");
      _0x22e749 = makeElement(_0x1a1151, "div", "dialogCell dialogCellMiddle");
      var _0x139142 = makeElement(_0x1a1151, "div", "dialogCell cellWide noPointer");
      _0x139142.style.cssText = "padding-left:0.25rem";
      var _0x39488f = makeElement(_0x139142, "div", "");
      _0x2e0e81 = makeElement(_0x139142, "div", "");
      makeElement(_0x139142, "div", "");
      var _0x491e3d = makeElement(_0x1a1151, "div", "dialogCell dialogCellMiddle");
      LoadImage(_0x22e749, _0x2e9d90.a, "group", 32, _0x2e9d90);
      var _0x39a3f3 = makeElement(_0x39488f, "div", "listTable");
      var _0x3cbf02 = makeElement(_0x39a3f3, "div", "dialogRow");
      var _0x5468f9 = makeElement(_0x3cbf02, "div", "dialogCell cellWide");
      var _0x4b0a22 = makeElement(_0x3cbf02, "div", "dialogCell");
      var _0x1633e4 = makeElement(_0x5468f9, "p");
      _0x1633e4.className = "groupsName";
      addText(_0x1633e4, _0x2e9d90.g);
      _0x2e9d90.g = _0x2e9d90.g.replace(" ", "");
      if (_0x2e9d90.promo) {
        var _0x356115 = makeElement(_0x4b0a22, "p");
        _0x356115.className = "groupsNumber";
        addText(_0x356115, _0x2e9d90.promo);
      }
      if (_0x2e9d90.n && !isNaN(_0x2e9d90.n) && _0x2e9d90.i != _0x2e9d90.n) {
        var _0xf9c17f = makeElement(_0x4b0a22, "p");
        _0xf9c17f.className = "groupNumber";
        addText(_0xf9c17f, _0x2e9d90.n);
      }
      var _0x416e81 = makeElement(_0x491e3d, "img");
      _0x416e81.height = 28;
      if (FavHash[_0x2e9d90.g.toLowerCase()]) {
        _0x416e81.src = "svg/favorite.svg";
      } else {
        _0x416e81.src = "svg/notfavorite.svg";
      }
      _0x491e3d.Obj = _0x2e9d90;
      if (_0x491e3d.Obj.i) {
        _0x491e3d.Obj.n = _0x491e3d.Obj.i;
      }
      _0x491e3d.onclick = function (_0x32eb96) {
        var _0x4fc13e = {};
        doFav(_0x32eb96, this.Obj);
      };
      var _0x5e8eac = makeElement(_0x2e0e81, "p");
      _0x5e8eac.className = "groupsDescription";
      if (_0x2e9d90.d != null) {
        addText(_0x5e8eac, _0x2e9d90.d);
      }
      _0x535eb9.setAttribute("onClick", "sendApp(\"" + _0x2e9d90.g + "\")");
      if (--_0x384d2b == 0) {
        break;
      }
    }
  }
  doZap(10);
  PagesLoaded++;
}
function setFavorites(_0x3a432b, _0x6a8eae) {
  FavHash = JSON.parse(_0x3a432b);
  var _0x3c9c99;
  var _0x377635 = {};
  if (_0x6a8eae) {
    _0x377635 = JSON.parse(_0x6a8eae);
  }
  for (var _0x33c617 in _0x377635) {
    if (FavHash[_0x33c617]) {
      if (!_0x377635[_0x33c617].d && !FavHash[_0x33c617].d) {
        FavHash[_0x33c617].d = _0x377635[_0x33c617].d;
      }
    }
  }
  Favorites = [{
    p: 0,
    l: 5
  }];
  for (var _0x33c617 in FavHash) {
    (_0x3c9c99 = {}).g = FavHash[_0x33c617].g;
    _0x3c9c99.a = FavHash[_0x33c617].a;
    _0x3c9c99.d = FavHash[_0x33c617].d;
    Favorites.push(_0x3c9c99);
    Empty = false;
  }
  for (var _0x33c617 in _0x377635) {
    if (!FavHash[_0x33c617]) {
      (_0x3c9c99 = {}).g = _0x377635[_0x33c617].g;
      _0x3c9c99.a = _0x377635[_0x33c617].a;
      _0x3c9c99.d = _0x377635[_0x33c617].d;
      Favorites.push(_0x3c9c99);
    }
  }
  configurePage(Favorites, Empty ? "Popular" : "Favorites");
  doZap(10);
}
function doFav(_0x4ef77f, _0x56e85e) {
  var _0x3c60bc = {
    ChatId: _0x56e85e.n,
    Page: "groups",
    Command: "Favourite"
  };
  var _0x538982 = _0x3c60bc;
  _0x538982.a = _0x56e85e.a;
  var _0x19c858 = _0x538982.g = _0x56e85e.g;
  _0x538982.d = _0x56e85e.d;
  var _0x50ff17 = _0x4ef77f.target;
  if (_0x4ef77f) {
    _0x4ef77f.stopPropagation();
  }
  if (_0x50ff17.src.search("svg/notfavorite.svg") >= 0) {
    _0x50ff17.src = "svg/favorite.svg";
    var _0x4c335d = false;
    var _0x5acfc0 = _0x19c858.toLowerCase();
    for (var _0x4ca239 in Favorites) {
      var _0x2604e8 = Favorites[_0x4ca239].g;
      if (_0x2604e8 && _0x2604e8.toLowerCase() == _0x5acfc0) {
        _0x4c335d = true;
        break;
      }
    }
    if (!_0x4c335d) {
      Favorites.push(_0x538982);
    }
    FavHash[_0x5acfc0] = _0x538982;
  } else {
    _0x50ff17.src = "svg/notfavorite.svg";
    delete FavHash[_0x19c858.toLowerCase()];
  }
  ToC(_0x538982);
}
function DoSearch(_0x2d1fe0) {
  if (_0x2d1fe0) {
    updateGroupsOpacity(0.5);
    loadJSON("https://rxat.ro/json/GroupSearch.php?s=" + _0x2d1fe0, function (_0x5db86b) {
      updateGroupsOpacity(1);
      configurePage(_0x5db86b, "Search");
    }, function (_0x56ff6a) {
      updateGroupsOpacity(1);
      console.error(_0x56ff6a);
    });
    modalClose();
  }
}
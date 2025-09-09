const kNumRows = 2;
const kGifTileFudge = 2;
const kGifTileSize = 100;

// Utility function to find elements
function findNodeInWindowOrParent(selector) {
    let element = document.querySelector(selector);
    if (!element && window.parent && window.parent !== window && window.parent.document) {
        element = window.parent.document.querySelector(selector);
    }
    return element;
}

class Quickbar {
  constructor() {
    this.currentPage = "main";
    this.originalWidthQb = "171px";
    this.cachedGroupsPowers = [];
    this.cachedGifsData = [];
    this.done = !1;
    this.doneGif = !1;
    this.sidebarOpened = !1;
    this.onlineInterval = null;
    this.onlineIntervalTimer = 10000;
    this.powerNameForAssign = null;
    this.gifOffset = 0;
    this.gifLimit = 14;
    this.gifValue = null;
    this.giphyKey = "kjRjc6jW9tEpi9KmGvOcR56yPyKSLSYQ";
    this.giphyDomain = "https://api.giphy.com/v1/";
    this.giphyTypingTimer = null;
    this.giphyTypingInterval = 500;
    this.giphyType = null;
    this.gifUtility = new GifUtility();
    this.sideBardiv = findNodeInWindowOrParent("#sideBardiv");
    this.sideBarItems = findNodeInWindowOrParent(".sideBarItems");
    this.dataMenu = findNodeInWindowOrParent("[data-menu]");
    this.dataFavoris = findNodeInWindowOrParent(".sidebar [data-favorite]");
    this.dataIgnored = findNodeInWindowOrParent(".sidebar [data-ignored]");
    this.dataBlocked = findNodeInWindowOrParent(".sidebar [data-blocked]");
    this.sideBarIcon = findNodeInWindowOrParent("#sideBar");
    this.sideBarIconImg = findNodeInWindowOrParent("#sideBarMobId");
    this.sidebarGoBack = findNodeInWindowOrParent("#sideBarGoBack");
    this.sideBarClass = findNodeInWindowOrParent(".sidebar");
    this.sideBarFavTitle = findNodeInWindowOrParent("#sideBarFavTitle");
    this.sideBarIgnTitle = findNodeInWindowOrParent("#sideBarIgnTitle");
    this.sideBarblkTitle = findNodeInWindowOrParent("#sideBarblkTitle");
    this.sideBarSwitchOnlineCounter = findNodeInWindowOrParent("#sideBarSwitchOnlineCounter");
    this.quickhr = findNodeInWindowOrParent(".quickhr");
    this.favoriteList = findNodeInWindowOrParent("[data-favorite-list]");
    this.favoriteName = findNodeInWindowOrParent("[data-favorite-name]");
    this.favNoGifs = findNodeInWindowOrParent("[no-fav-gifs]");
    this.ignoredList = findNodeInWindowOrParent("[data-ignored-list]");
    this.blockedList = findNodeInWindowOrParent("[data-blocked-list]");
    this.favoriteT = findNodeInWindowOrParent("[data-sidebar-switch-settings=\"favorite_t\"]");
    this.usersOnline = findNodeInWindowOrParent("[data-online]");
    this.dataGifs = findNodeInWindowOrParent(".sidebar [data-gifs]");
    this.sideBarGifsTitle = findNodeInWindowOrParent("#sideBarGifsTitle");
    this.gifList = findNodeInWindowOrParent("[data-gifs-list]");
    this.gifFavoritesList = findNodeInWindowOrParent("[data-gifs-favorite-list]");
    this.poweredby = findNodeInWindowOrParent("#poweredby");
    this.gifsType = findNodeInWindowOrParent("#gifsType");
    this.noResults = findNodeInWindowOrParent("#noResults");
    this.giphySearchBar = findNodeInWindowOrParent("#doSearch");
    this.gifSearchLabel = findNodeInWindowOrParent(".gifSearchLabel");
    this.sidebarGifsSearch = findNodeInWindowOrParent("#sidebarGifsSearch");
    this.timeOut = null;
    this.items = {
      favorites: {
        function: "doFavorite",
        name: "Favorites",
        pageName: "favorites",
        translation: "mob2.favs",
        svg: "star",
        goBack: !0,
        hideOnMobile: !0
      },
      gifs: {
        function: "doGifs",
        name: "GIFs",
        pageName: "gifs",
        translation: "mob2.gifs",
        svg: "giphy",
        mustBeRegistered: !0
      },
      stealthmode: {
        function: "doStealthMode",
        name: "Stealth",
        translation: "mob2.stealth",
        svg: "stealth",
        switchIcon: !0,
        function_preset: "hasStealthMode",
        mustHaveCookieEnabled: !0
      },
      hideuserslist: {
        function: "doHideUserslist",
        name: "Visitors",
        translation: "mob2.visitors",
        svg: "visitors",
        switchIcon: !0,
        function_preset: "hasHideUserlist",
        hideOnMobile: !0
      },
      darkmode: {
        function: "doDarkMode",
        name: "Night",
        translation: "mob2.nightmode",
        svg: "dark1",
        switchIcon: !0,
        function_preset: "hasDarkMode",
        mustHaveCookieEnabled: !0
      },
      smilies: {
        function: "getStuffPressed",
        name: "Smilies",
        translation: "mob2.smilies",
        svg: "8bsmilies"
      },
      ignored: {
        function: "doIgnored",
        name: "Ignored",
        pageName: "ignored",
        translation: "mob2.ignored",
        svg: "ignored",
        children: !0,
        goBack: !0
      },
      blocked: {
        function: "doBlocked",
        name: "Blocked",
        pageName: "blocked",
        translation: "mob2.blocked",
        svg: "report2",
        children: !0,
        goBack: !0
      },
      translator: {
        function: "doClassicDialog",
        name: "Translator",
        translation: "mob2.translator",
        svg: "translator",
        args: "translator"
      },
      groupspowers: {
        function: "doGroupsPowers",
        name: "Group powers",
        translation: "mob2.grouppowers",
        svg: "Powers",
        args: "false"
      },
      vote: {
        function: "initVote",
        name: "Vote",
        pageName: "vote",
        translation: "mob2.vote",
        svg: "vote",
        goBack: !0
      },
      settings: {
        function: "doClassicDialog",
        name: "Settings",
        translation: "mob2.settings",
        svg: "actSettings",
        args: "settings"
      },
      events: {
        function: "doHitEvents",
        name: "Events",
        translation: "mob2.events",
        svg: "events",
        children: !0
      },
      more: {
        name: "More",
        pageName: "more",
        translation: "mob2.more",
        svg: "moreqb",
        childrens: ["blocked", "ignored", "events", "moderation"],
        goBack: !0
      },
      whatsnew: {
        function: "doHitWiki",
        name: "What's new?",
        translation: "mob2.whatsnew",
        svg: "x",
        args: "xat.wiki/news"
      },
      moderation: {
        function: "doModeration",
        name: "Moderation",
        translation: "mob2.moderation",
        svg: "shield",
        mustBeModerator: true,
        children: true,
        goBack: true
      },
      kick: {
        function: "doKickUser",
        name: "Kick User",
        translation: "mob2.kick",
        svg: "kick",
        mustBeModerator: true
      },
      ban: {
        function: "doBanUser",
        name: "Ban User",
        translation: "mob2.ban",
        svg: "ban",
        mustBeModerator: true
      },
      warn: {
        function: "doWarnUser",
        name: "Warn User",
        translation: "mob2.warn",
        svg: "warning",
        mustBeModerator: true
      }
    };
    this.voteComponent = new VoteComponent(this);
  }
  init(force) {
    if (!this.done || force) {
      this.registerItems();
      this.registerEvents();
      this.done = true;
    }
  }
  registerItems() {
    if (this.dataMenu) {
      this.dataMenu.innerHTML = "";
    }
    for (let _0x24c588 in this.items) {
      let _0x4a9136 = makeElement(this.dataMenu, "div", "", "sideBarItem" + _0x24c588);
      _0x4a9136.dataset.sidebarSettings = _0x24c588;
      if (this.items[_0x24c588]?.mustBeRegistered && !(window.config?.MyRegName?.length)) {
        _0x4a9136.style.display = "none";
      }
      if (!window._Activity?.isClassicMode() && this.items[_0x24c588]?.mustHaveCookieEnabled && localStorage.getItem("mobCookies") != 1) {
        _0x4a9136.style.display = "none";
      }
      if (this.items[_0x24c588]?.children) {
        _0x4a9136.classList.add("d-none");
      }
      if (this.items[_0x24c588]?.hideOnMobile && !window._Activity?.isClassicMode()) {
        _0x4a9136.classList.add("notMobile");
      }
      _0x4a9136.dataset.isChildren = this.items[_0x24c588]?.children || !1;
      if (this.items[_0x24c588]?.svg) {
        let _0x17f1ff = makeElement(_0x4a9136, "img");
        _0x17f1ff.src = (window._Activity?.isClassicMode() ? "" : "www/") + "svg/" + this.items[_0x24c588]?.svg + ".svg";
        _0x17f1ff.alt = _0x24c588;
        _0x17f1ff.width = 13;
        _0x17f1ff.style.margin = "0 3px 2px 0";
      }
      let _0x43ba5c = makeElement(_0x4a9136, "span", "", "sideBarSpan" + _0x24c588);
      _0x43ba5c.innerText = this.items[_0x24c588]?.name;
      _0x43ba5c.dataset.localize = this.items[_0x24c588]?.translation;
      if (this.items[_0x24c588]?.switchIcon) {
        let _0x42a4a5 = makeElement(_0x4a9136, "span", null, "sideBarSwitch" + _0x24c588);
        let _0x5df3fa = makeElement(_0x42a4a5, "label", (window._Activity?.instance?.IsClassic) ? "switch" : "switch switchMob");
        let _0x5e12b2 = makeElement(_0x5df3fa, "input", null, "sideBarSwitchSet" + _0x24c588);
        _0x5e12b2.type = "checkbox";
        _0x5e12b2.dataset.sideBarSwitchSettings = _0x24c588;
        makeElement(_0x5df3fa, "span", "slider", "sideBarSwitchSetSlider" + _0x24c588);
        if (this.items[_0x24c588]?.function_preset && typeof window[this.items[_0x24c588]?.function_preset] == "function") {
          let _0x388491 = window[this.items[_0x24c588]?.function_preset]();
          if (_0x388491 && _0x388491 != "disable") {
            _0x5e12b2.classList.add("active");
          } else {
            _0x5e12b2.classList.remove("active");
          }
        }
        _0x5e12b2.addEventListener("click", _0x266da9 => {
          _0x266da9.preventDefault();
          if (typeof window[this.items[_0x24c588]?.function] == "function") {
            window[this.items[_0x24c588]?.function](_0x266da9, true);
          }
        });
      }
      _0x4a9136.addEventListener("click", _0x585cdd => {
        _0x585cdd.preventDefault();
        this.currentPage = this.items[_0x24c588]?.pageName ?? "main";
        this.clearOnlineInterval();
        if (typeof this[this.items[_0x24c588]?.function] == "function") {
          let _0x3321f4 = this.items[_0x24c588]?.args || _0x585cdd;
          this[this.items[_0x24c588]?.function](_0x3321f4);
        }
        if (this.items[_0x24c588]?.childrens) {
          this.handleChildrensFromItems(this.items[_0x24c588].childrens);
        }
        if (this.items[_0x24c588]?.goBack) {
          this.toggleGoBackButton(true, false);
        }
      });
    }
    TranslateAll();
  }
  // ============================================================================
  // CORE QUICKBAR METHODS
  // ============================================================================
  
  registerEvents() {
    this.sideBarIcon?.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      if (!this.sidebarOpened) {
        this.resetMenu();
      }
      this.toggleSideBar(!this.sidebarOpened);
    }, true);
    
    this.sidebarGoBack?.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      this.hasPreviousPage();
    }, true);
    
    document?.addEventListener("click", (e) => {
      this.shouldCloseQuickBar(e);
    }, true);
    
    parent?.document?.addEventListener("click", (e) => {
      this.shouldCloseQuickBar(e);
    }, true);
  }
  
  shouldCloseQuickBar(e) {
    if (e?.target?.className == "tooltip" || document?.activeElement == this.giphySearchBar) {
      return;
    }
    let shouldClose = !this?.sideBardiv.contains(e.target) && e?.target?.id != "sideBar";
    if (this?.sidebarOpened && shouldClose) {
      this?.toggleSideBar(false);
    }
  }
  
  toggleSideBar(open) {
    if (!this.sideBarIcon || !this.sideBarClass) {
      return;
    }
    let iconElement = this.sideBarIcon;
    this.resetMenu();
    if (open) {
      iconElement.style.transform = "scaleX(1)";
      this.sideBarClass.style.right = "10px";
      this.sidebarOpened = true;
      if (window.config?.MyRegName?.length) {
        this.getOnline();
      } else {
        this.toggleGoBackButton(false, false);
      }
    } else {
      iconElement.style.transform = "scaleX(-1)";
      this.sideBarClass.style.right = "-174px";
      this.clearOnlineInterval();
      this.sidebarOpened = false;
    }
  }
  
  toggleGoBackButton(show, showOnline) {
    if (showOnline && !(window.config?.MyRegName?.length)) {
      showOnline = false;
    }
    if (show) {
      this?.sidebarGoBack?.classList?.remove("d-none");
    } else {
      this?.sidebarGoBack?.classList?.add("d-none");
    }
    if (showOnline) {
      this?.sideBarSwitchOnlineCounter?.classList?.remove("d-none");
      this?.quickhr?.classList?.remove("d-none");
    } else {
      this?.sideBarSwitchOnlineCounter?.classList?.add("d-none");
      this?.quickhr?.classList?.add("d-none");
    }
  }
  
  clearOnlineInterval() {
    clearInterval(this.onlineInterval);
    this.onlineInterval = undefined;
  }
  
  getOnline(refresh) {
    if (this.sidebarOpened) {
      // Send command to get online users
      if (typeof ToC === 'function') {
        ToC({
          Command: "getUsersOnline"
        });
      }
      if (!refresh) {
        this.onlineInterval = setInterval(() => {
          this.getOnline(true);
        }, this.onlineIntervalTimer);
      }
    } else {
      this.clearOnlineInterval();
    }
  }
  
  resetMenu() {
    this?.toggleGoBackButton(false, true);
    this.resetIgnoredBlockedSection();
    this.resetTitle();
    this.resetDataMenu();
    this?.dataFavoris?.classList?.add("d-none");
    this?.dataGifs?.classList?.add("d-none");
    this?.sideBarFavTitle?.classList?.add("d-none");
    this?.sideBarGifsTitle?.classList?.add("d-none");
    this?.sidebarGifsSearch?.classList?.add("d-none");
    this?.poweredby?.classList?.add("d-none");
    this.hideAllNonChildrens(false, true);
    this.gifOffset = 0;
    this.currentPage = "main";
    this.sideBarClass.style.display = "flex";
  }
  
  resetDataMenu() {
    this?.dataMenu?.classList?.remove("d-none");
  }
  
  resetIgnoredBlockedSection() {
    this?.dataIgnored?.classList.add("d-none");
    this?.dataBlocked?.classList.add("d-none");
  }
  
  resetTitle() {
    this?.sideBarIgnTitle?.classList?.add("d-none");
    this?.sideBarblkTitle?.classList?.add("d-none");
  }
  
  hideAllNonChildrens(hide, show) {
    let elements = document.querySelectorAll("[data-is-children=\"" + !hide + "\"]");
    if (elements.length) {
      elements.forEach(el => el.classList.add("d-none"));
    }
    if (show) {
      let showElements = document.querySelectorAll("[data-is-children=\"false\"]");
      if (showElements.length) {
        showElements.forEach(el => el.classList.remove("d-none"));
      }
    }
  }
  
  hasPreviousPage() {
    if (this.currentPage == "main") {
      return this.resetMenu();
    }
    switch (this.currentPage) {
      case "favoritesgifs":
        this.currentPage = this.items.gifs.pageName;
        return this.doGifs();
      case "blocked":
      case "ignored":
        this.currentPage = this.items.more.pageName;
        return this.resetMoreSection();
    }
    return this.resetMenu();
  }
  
  resetMoreSection() {
    this.resetDataMenu();
    this.resetIgnoredBlockedSection();
    this.resetTitle();
    this.handleChildrensFromItems(this.items.more.childrens);
    this?.toggleGoBackButton(true, false);
  }
  
  handleChildrensFromItems(children = []) {
    for (let child in children) {
      let element = findNodeInWindowOrParent("[data-sidebar-settings=\"" + children[child] + "\"]");
      if (element) {
        element?.classList?.remove("d-none");
      }
    }
    this.hideAllNonChildrens(true);
  }
  
  // ============================================================================
  // FAVORITES SYSTEM
  // ============================================================================
  
  doFavorite() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataFavoris?.classList?.remove("d-none");
    this?.favoriteT?.addEventListener("click", (e) => {
      e.preventDefault();
      let state = this.hasGroupInFavorite() ? "disable" : "enable";
      this.setToggle(this.favoriteT, state);
      this.addRemoveFavorites();
      setTimeout(() => {
        this.doLoadFavorite(true);
      }, 400);
    });
    this.doLoadFavorite();
  }
  
  doLoadFavorite(refresh) {
    let favorites = this.getFavoriteGroups();
    this?.sideBarFavTitle?.classList?.remove("d-none");
    let groupName = window.config?.GroupName;
    groupName = this.isNameTooLong(groupName);
    if (this.favoriteName) {
      this.favoriteName.innerText = groupName;
    }
    if (!refresh) {
      this.setToggle(this.favoriteT, this.hasGroupInFavorite());
    }
    if (this.favoriteList && (this.favoriteList.innerHTML = "", Object.keys(favorites).length)) {
      for (let fav in favorites) {
        let groupName = favorites[fav]?.g;
        let favElement = this.makeElement(this.favoriteList, "div");
        favElement.id = "sideBar" + groupName;
        let favIcon = this.makeElement(favElement, "img");
        favIcon.src = "svg/favadded.svg";
        favIcon.width = 15;
        favIcon.style.margin = "-5px 7px 0px -1px";
        let favSpan = this.makeElement(favElement, "span");
        favSpan.id = "sideBarSpan" + groupName;
        favSpan.innerHTML = this.isNameTooLong(groupName);
        let deleteIcon = this.makeElement(favElement, "img");
        deleteIcon.src = "svg/removew.svg";
        deleteIcon.width = "15";
        deleteIcon.classList.add("favdel");
        deleteIcon.dataset.roomid = favorites[fav]?.id;
        deleteIcon.dataset.roomname = favorites[fav]?.g;
        deleteIcon.addEventListener("click", (e) => {
          this.addRemoveFavorites(favorites[fav]?.id, favorites[fav]?.g);
          setTimeout(() => {
            this.doLoadFavorite();
          }, 400);
        });
        favElement.addEventListener("mouseover", () => {
          deleteIcon.style.display = "inline-block";
        });
        favElement.addEventListener("mouseout", () => {
          deleteIcon.style.display = "none";
        });
        favSpan.addEventListener("click", () => {
          window.open("https://xat.com/" + fav, "_blank");
        });
      }
    }
    this.toggleGoBackButton(true, false);
  }
  
  isNameTooLong(name) {
    let hasCaps = name?.replace(/[^A-Z]/g, "")?.length > 4;
    if (name?.length > 13 && !hasCaps) {
      name = name?.substr(0, 13) + "..";
    } else if (hasCaps) {
      name = name?.substr(0, 9) + "..";
    }
    return name;
  }
  
  getFavoriteGroups() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.favorites || {};
    } catch (e) {
      return {};
    }
  }
  
  hasGroupInFavorite() {
    let favorites = this.getFavoriteGroups();
    return favorites[window.config?.GroupName] ? true : false;
  }
  
  addRemoveFavorites(roomId, roomName) {
    let favorites = this.getFavoriteGroups();
    if (roomId && roomName) {
      if (favorites[roomName]) {
        delete favorites[roomName];
      } else {
        favorites[roomName] = { id: roomId, g: roomName };
      }
    } else {
      // Toggle current group
      if (favorites[window.config?.GroupName]) {
        delete favorites[window.config?.GroupName];
      } else {
        favorites[window.config?.GroupName] = { id: window.config?.chatid, g: window.config?.GroupName };
      }
    }
    this.saveSetting("favorites", JSON.stringify(favorites));
  }
  
  // ============================================================================
  // GIF SYSTEM
  // ============================================================================
  
  doGifs() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataGifs?.classList?.remove("d-none");
    this?.favNoGifs?.classList?.add("d-none");
    this?.sideBarSwitchOnlineCounter?.classList?.add("d-none");
    this?.quickhr?.classList?.add("d-none");
    const maxHeight = this.sideBarClass.scrollHeight - 150;
    this.gifList.style.maxHeight = maxHeight + "px";
    this.gifList.style.marginLeft = "10px";
    this.gifLimit = Math.round(maxHeight / 100) * 2 + 2;
    this.sideBarClass.style.display = "block";
    this.resetGifContainer(true);
    this.doLoadGifs();
  }
  
  doLoadGifs() {
    this?.sideBarGifsTitle?.classList?.remove("d-none");
    this?.sidebarGifsSearch?.classList?.remove("d-none");
    this?.poweredby?.classList?.remove("d-none");
    this.toggleGoBackButton(true, false);
    this.gifOffset = 0;
    this.doGiphy({
      type: "trending",
      inputText: false
    });
    if (this.doneGif) {
      return;
    }
    this.doneGif = true;
    this?.giphySearchBar?.addEventListener("keyup", (e) => {
      e.preventDefault();
      clearTimeout(this.giphyTypingTimer);
      if (this?.giphySearchBar?.value) {
        this.giphyTypingTimer = setTimeout(() => {
          this.gifValue = this?.giphySearchBar?.value;
          this.gifOffset = 0;
          this.doGiphy({
            type: "search",
            inputText: this?.giphySearchBar
          });
        }, this.giphyTypingInterval);
      } else {
        this.gifOffset = 0;
        this.gifValue = null;
        this.doGiphy({
          type: "trending",
          inputText: false
        });
      }
    });
  }
  
  doGiphy(options = {}) {
    if (!this.sidebarOpened) {
      return;
    }
    if (options.noClear && options.type != "trending" && !this.gifValue) {
      return;
    }
    if (!options.noClear) {
      this.resetGifContainer();
    }
    this.giphyType = options.type;
    this.sideBarClass.style.width = "240px";
    let searchTerm = this.gifValue ? this.gifValue : options.inputText?.value;
    let apiUrl = this.giphyDomain + "gifs/" + options.type + "?api_key=" + this.giphyKey + "&rating=pg&limit=" + this.gifLimit + "&offset=" + this.gifOffset;
    if (options.type != "trending") {
      let cleanTerm = searchTerm.replace(new RegExp("['\"<>]", "gi"), "").replace(/\\/gi, "");
      apiUrl += "&q=" + cleanTerm.replace(/\s+/g, "+");
      if (searchTerm.length >= 20) {
        this.gifsType.innerText = cleanTerm.substr(0, 20) + "..";
      } else {
        this.gifsType.innerText = cleanTerm;
      }
    } else {
      this.gifsType.innerHTML = "<span>Trending</span>";
    }
    fetch(apiUrl).then(response => response.json()).then(data => {
      this.loadGifsInList(data);
      if (options.inputText && data.data == "" && !options.noClear) {
        this.noResults?.classList?.remove("d-none");
      }
      this.gifOffset += this.gifLimit;
    }).catch(error => console.log("Giphy Error: ", error));
  }
  
  loadGifsInList(data) {
    if (data) {
      for (let i = 0; i < data?.data?.length; i++) {
        let imageKey = this.getGiphyImageKey(true);
        let imageData = data?.data[i]?.images?.[imageKey];
        this.appendToGifList({
          width: imageData.width,
          height: imageData.height,
          id: data?.data[i]?.id,
          url: imageData.url?.split("?")[0]
        }, false, this.gifList);
      }
    }
  }
  
  appendToGifList(gifData, clear = false, container = null) {
    if (clear && container) {
      container.innerHTML = "";
    }
    if (!gifData.url) {
      return;
    }
    let gifElement = this.makeElement(null, "span", "imgHolderGif");
    gifElement.style.position = "relative";
    gifElement.style.display = "inline-block";
    let img = new Image(gifData?.width, gifData?.height);
    img.src = gifData?.url;
    img.loading = "lazy";
    img.className = "gifqbImage skeleton";
    gifElement.appendChild(img);
    img.onload = () => {
      img.classList.remove("skeleton");
      this.addStarToImage(gifElement, gifData);
    };
    gifElement.addEventListener("click", () => {
      this.sendGifAsMainOrPM(gifData.url);
    });
    container?.append(gifElement);
  }
  
  addStarToImage(container = null, gifData = {}) {
    if (!container || !gifData.id) {
      return;
    }
    if (container.querySelector("[data-gif-id=\"" + gifData.id + "\"]")) {
      return;
    }
    let starIcon = this.makeElement(container, "img", "gifFav", "sideBarFavGif");
    starIcon.src = "svg/star.svg";
    starIcon.width = 16;
    starIcon.dataset.gifId = gifData?.id;
    this.setClassOnStarFavorite(starIcon, this.isAddedAsGifFavorite(gifData?.id));
    starIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.setClassOnStarFavorite(starIcon, this.addRemoveGifFromFavorite(gifData?.id, gifData?.url, gifData?.width, gifData?.height));
    });
  }
  
  addRemoveGifFromFavorite(gifId, url = null, width = 100, height = 100) {
    let favorites = this.getFavoritesGifs();
    favorites ||= {};
    let isAdded = false;
    if (favorites[gifId]) {
      delete favorites[gifId];
    } else {
      favorites[gifId] = url + "|" + width + "|" + height;
      isAdded = true;
    }
    this.saveSetting("favoritesGifs", JSON.stringify(favorites));
    return isAdded;
  }
  
  getFavoritesGifs() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      if (settings?.favoritesGifs) {
        return JSON.parse(settings.favoritesGifs.replace(/"/g, "\""));
      } else {
        return {};
      }
    } catch (e) {
      return {};
    }
  }
  
  isAddedAsGifFavorite(gifId) {
    if (!gifId) {
      return false;
    }
    let favorites = this.getFavoritesGifs();
    return favorites && favorites[gifId];
  }
  
  setClassOnStarFavorite(element, isActive) {
    if (!element) {
      return false;
    }
    if (isActive) {
      element.classList.add("gifActive");
    } else {
      element.classList.remove("gifActive");
    }
  }
  
  resetGifContainer(clear) {
    this.gifList.innerHTML = "";
    this.giphyType = null;
    this.noResults?.classList?.add("d-none");
    this.dataGifs.scrollTop = 0;
    this.sideBarClass.style.width = this.originalWidthQb;
    this?.gifList?.classList?.remove("d-none");
    this?.gifFavoritesList?.classList?.add("d-none");
    if (clear) {
      this.giphySearchBar.value = "";
      this.gifValue = null;
      this.currentPage = this.items.gifs.pageName;
    }
    if (this.giphySearchBar) {
      this.giphySearchBar.disabled = false;
      this.giphySearchBar.style.opacity = "1";
      this.gifSearchLabel.classList?.remove("gifSearchLabelDis");
    }
  }
  
  sendGifAsMainOrPM(url) {
    this.toggleSideBar(false);
    if (typeof messages?.sendMessage === 'function') {
      return messages.sendMessage(url);
    }
  }
  
  getGiphyImageKey(forMessage) {
    if (forMessage) {
      return "fixed_width_small";
    } else {
      return "fixed_height_small_still";
    }
  }
  
  // ============================================================================
  // USER LISTS SYSTEM
  // ============================================================================
  
  doIgnored() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataIgnored?.classList?.remove("d-none");
    this.doListFromObj({
      list: this.getIgnoredUsers(),
      classNode: this?.sideBarIgnTitle,
      htmlNode: this.ignoredList,
      type: "ignore",
      icon: "ignored"
    });
  }
  
  doBlocked() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataBlocked?.classList?.remove("d-none");
    this.doListFromObj({
      list: this.getBlockedUsers(),
      classNode: this?.sideBarblkTitle,
      htmlNode: this.blockedList,
      type: "block",
      icon: "ignored"
    });
  }
  
  doListFromObj(options) {
    let list = options.list || {};
    if (options.refreshList) {
      switch (options.type) {
        case "ignore":
          list = this.getIgnoredUsers();
          break;
        case "block":
          list = this.getBlockedUsers();
      }
    }
    if (options.classNode) {
      options.classNode?.classList?.remove("d-none");
    }
    if (options.htmlNode && (options.htmlNode.innerHTML = "", Object.keys(list).length > 0)) {
      for (let user in list) {
        let userElement = this.makeElement(options.htmlNode, "div");
        userElement.id = "sideBar" + user;
        let userIcon = this.makeElement(userElement, "img");
        userIcon.src = "svg/" + (options.icon ? options.icon : "ignored") + ".svg";
        userIcon.width = 16;
        userIcon.style.margin = "-4px 6px 0 0";
        let userSpan = this.makeElement(userElement, "span");
        userSpan.id = "sideBarSpan" + user;
        userSpan.innerHTML = options.type == "block" ? list[user] : user;
        let deleteIcon = this.makeElement(userElement, "img");
        deleteIcon.src = "svg/removew.svg";
        deleteIcon.width = "15";
        deleteIcon.classList.add("favdel");
        deleteIcon.dataset.xatid = user;
        deleteIcon.addEventListener("click", (e) => {
          if (e.target.dataset.xatid) {
            if (options.type && options.type == "ignore") {
              this.unignoreUser(user);
            } else {
              this.unblockUser(user);
            }
            setTimeout(() => {
              options.refreshList = true;
              this.doListFromObj(options);
            }, 400);
          }
        });
        userElement.addEventListener("mouseover", () => {
          if (deleteIcon) {
            deleteIcon.style.display = "inline-block";
          }
        });
        userElement.addEventListener("mouseout", () => {
          if (deleteIcon) {
            deleteIcon.style.display = "none";
          }
        });
        userSpan.addEventListener("click", () => {
          window.open("https://xat.me/" + user, "_blank");
        });
      }
    }
  }
  
  getIgnoredUsers() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.ignored || {};
    } catch (e) {
      return {};
    }
  }
  
  getBlockedUsers() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.blocked || {};
    } catch (e) {
      return {};
    }
  }
  
  unignoreUser(userId) {
    let ignored = this.getIgnoredUsers();
    delete ignored[userId];
    this.saveSetting("ignored", JSON.stringify(ignored));
  }
  
  unblockUser(userId) {
    let blocked = this.getBlockedUsers();
    delete blocked[userId];
    this.saveSetting("blocked", JSON.stringify(blocked));
  }
  
  // ============================================================================
  // SETTINGS SYSTEM
  // ============================================================================
  
  doDarkMode(event, isSwitch, state) {
    let currentState = this.hasDarkMode();
    let newState = state || (currentState ? "disable" : "enable");
    if (!state) {
      this.saveSetting("darkmode", newState);
    }
    if (!isSwitch || !event) {
      event = findNodeInWindowOrParent("#sideBarSwitchSetdarkmode");
    }
    this.setToggle(event, newState);
    this.setDarkMode(newState);
  }
  
  doStealthMode(event, isSwitch, state) {
    let currentState = this.hasStealthMode();
    let newState = state || (currentState ? "disable" : "enable");
    if (!state) {
      this.saveSetting("Stealth", newState, true);
    }
    if (!isSwitch || !event) {
      event = findNodeInWindowOrParent("#sideBarSwitchSetstealthmode");
    }
    this.setToggle(event, newState);
  }
  
  doHideUserslist(event, isSwitch, state) {
    let currentState = this.hasHideUserlist();
    let newState = state || (currentState == "enable" ? "disable" : "enable");
    if (!state) {
      this.saveSetting("hideuserlist", newState);
    }
    if (!isSwitch || !event) {
      event = findNodeInWindowOrParent("#sideBarSwitchSethideuserslist");
    }
    this.setToggle(event, newState);
    this.setHideUserlist(newState);
  }
  
  hasDarkMode() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.darkmode === "enable";
    } catch (e) {
      return false;
    }
  }
  
  hasStealthMode() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.Stealth === "enable";
    } catch (e) {
      return false;
    }
  }
  
  hasHideUserlist() {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings"));
      return settings?.hideuserlist === "enable";
    } catch (e) {
      return false;
    }
  }
  
  setDarkMode(state) {
    if (state === "enable") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
  
  setHideUserlist(state) {
    // Implementation for hiding user list
    console.log("Hide user list:", state);
  }
  
  setToggle(element, state) {
    if (element) {
      if (state && state != "disable") {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
  }
  
  // ============================================================================
  // UTILITY METHODS
  // ============================================================================
  
  makeElement(parent, tag, className, id) {
    let element = document.createElement(tag);
    if (className) element.className = className;
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    return element;
  }
  
  saveSetting(key, value, isCookie = false) {
    try {
      let settings = JSON.parse(localStorage.getItem("Settings") || "{}");
      settings[key] = value;
      localStorage.setItem("Settings", JSON.stringify(settings));
      if (isCookie) {
        // Handle cookie setting if needed
      }
    } catch (e) {
      console.error("Error saving setting:", e);
    }
  }
  
  // ============================================================================
  // MODERATION METHODS
  // ============================================================================
  
  doModeration() {
    console.log('🔧 [QUICKBAR] Opening moderation panel...');
    this.showModerationPanel();
  }
  
  doKickUser() {
    console.log('👢 [QUICKBAR] Kick user function...');
    const username = prompt('Enter username to kick:');
    if (username) {
      this.kickUser(username);
    }
  }
  
  doBanUser() {
    console.log('🚫 [QUICKBAR] Ban user function...');
    const username = prompt('Enter username to ban:');
    if (username) {
      this.banUser(username);
    }
  }
  
  doWarnUser() {
    console.log('⚠️ [QUICKBAR] Warn user function...');
    const username = prompt('Enter username to warn:');
    if (username) {
      this.warnUser(username);
    }
  }
  
  showModerationPanel() {
    const panel = document.createElement('div');
    panel.id = 'moderationPanel';
    panel.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      min-width: 400px;
    `;
    
    panel.innerHTML = `
      <h3 style="margin-bottom: 1rem; color: #374151;">Moderation Panel</h3>
      <div style="display: grid; gap: 1rem;">
        <button onclick="quickbar.kickUser()" style="padding: 0.5rem; background: #f59e0b; color: white; border: none; border-radius: 4px;">👢 Kick User</button>
        <button onclick="quickbar.banUser()" style="padding: 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px;">🚫 Ban User</button>
        <button onclick="quickbar.warnUser()" style="padding: 0.5rem; background: #f59e0b; color: white; border: none; border-radius: 4px;">⚠️ Warn User</button>
        <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.5rem; background: #6b7280; color: white; border: none; border-radius: 4px;">Close</button>
      </div>
    `;
    
    document.body.appendChild(panel);
  }
  
  async kickUser(username) {
    try {
      const response = await fetch('/api/users/kick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ username })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`User ${username} has been kicked.`);
      } else {
        alert(`Failed to kick user: ${result.message}`);
      }
    } catch (error) {
      console.error('Error kicking user:', error);
      alert('Error kicking user');
    }
  }
  
  async banUser(username) {
    try {
      const response = await fetch('/api/moderation/ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ username, reason: 'Banned by moderator' })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`User ${username} has been banned.`);
      } else {
        alert(`Failed to ban user: ${result.message}`);
      }
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error banning user');
    }
  }
  
  async warnUser(username) {
    try {
      const response = await fetch('/api/moderation/warn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ username, reason: 'Warned by moderator' })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`User ${username} has been warned.`);
      } else {
        alert(`Failed to warn user: ${result.message}`);
      }
    } catch (error) {
      console.error('Error warning user:', error);
      alert('Error warning user');
    }
  }
  
  // ============================================================================
  // ADDITIONAL QUICKBAR METHODS
  // ============================================================================
  
  doClassicDialog(dialogType) {
    console.log('Opening classic dialog:', dialogType);
    // Implementation for classic dialogs
    if (typeof classicSetDialog === 'function') {
      classicSetDialog(dialogType, window.config?.MyId);
    }
  }
  
  doHitWiki(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }
  
  doHitEvents() {
    this.doHitWiki('https://xat.com/events');
  }
  
  getStuffPressed() {
    console.log('Opening smilies selector');
    // Implementation for smilies selector
    if (typeof classicSetDialog === 'function') {
      classicSetDialog("selector", { Type: "Smilies" });
    }
  }
  
  initVote() {
    console.log('Initializing vote system');
    if (this.voteComponent) {
      return this.voteComponent.loadVoteData();
    }
  }
  
  doGroupsPowers(powerName) {
    console.log('Opening group powers manager for:', powerName);
    // Implementation for group powers
    if (typeof customModalWithMsg === 'function') {
      customModalWithMsg(["Group powers manager"], "", true, false, true);
    }
  }
}

class GifUtility {
  constructor() {
    this.gifs = {};
    this.gifsMemory = 0;
    this.containers = new Set();
    this.prevScrollY = 0;
  }
  // ... rest of the GifUtility methods would be here
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Quickbar, GifUtility };
}

"use strict";

// Use global page variable
window.page = window.page || 'me';
var meTab;
var meTempFeature = window.meTempFeature || [];
if (document.body) {
  document.body.style.backgroundColor = "white";
  document.body.classList.remove("invisible");
}
$("#navGroup,#navxatApps").addClass("d-none");
Reset();
initConfig();
readUser();
setUser();
navClickHandlers();
startAnalytics();
setLoggedin();
legacyLinks();
cookieBar();
localize(["chats", "buy"]);
fetchPromo();
setLogo();
document.addEventListener("DOMContentLoaded", function () {
  initStuff();
  initToolTip();
});
let mePickersList = [];
let memeCommom = $("#CommonDiv").html();
function DoTask(e) {
  switch (e) {
    case "meshow":
      DoMeShow(e);
      break;
    case "melogin":
      DoMeEditLogin(e);
      break;
    default:
      e = "meshow";
      DoMeShow();
  }
  page = e;
  $(".NavTabs").removeClass("active");
  $("#meTab" + e).addClass("active");
}
function DoMeShow() {
  Reset();
  $("#meshow").removeClass("d-none");
  $("#avaShow").attr("src", xConfig.avatar);
  $("#userShow").html(xConfig.username);
  $("#idShow").html(xConfig.id);
}
function DoMeEditLogin() {
  Reset();
  $("#melogin").removeClass("d-none");
  $("#mePassword").focus();
  getGET();
  let e = "https://rxat.ro/web_gear/chat/editprofile2.php";
  let t = $("#meFormLogin");
  let o = $("#loginErr");
  t.off("submit").submit(function (t) {
    t.preventDefault();
    let n = {};
    let a = $("#meUsername").val();
    let r = $("#mePassword").val();
    o.addClass("d-none");
    n.email = filter(a);
    n.password = filter(r);
    n.SubmitPass = 1;
    xConfig.me = {};
    xConfig.me.username = a;
    xConfig.me.password = r;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(e, filter(n)).then(function (t) {
      $(document.body).css({
        cursor: "default"
      });
      if (t.Err.back) {
        let o = t.Err.media.split(";=");
        let n = $("#meback");
        let a = $("#summernote");
        let r = $("#summernote2");
        let i = $("#TabsSubmit");
        $("#melogin").addClass("d-none");
        $("#meedit").removeClass("d-none");
        $("#mainNav").addClass("d-none");
        $("#secondNav").addClass("d-none");
        if (mePickersList.length === 0) {
          initColorsPickers();
        }
        if (n) {
          n.val(t.Err.back);
        }
        if (a && o[0]) {
          a.summernote("code", o[0]);
        }
        if (r && o[1]) {
          r.summernote("code", o[1]);
        }
        i.off("click").on("click", () => {
          $(document.body).css({
            cursor: "default"
          });
          let t = {};
          let o = n.val();
          let i = r.summernote("code");
          let s = a.summernote("code");
          if (o && o.indexOf("{") == -1) {
            o = filter(o);
          }
          t.username = xConfig.me.username || "";
          t.password = xConfig.me.password || "";
          t.back = o;
          t.media0 = filter(i);
          t.media1 = filter(s);
          t.submit1 = 1;
          urlPost(e, filter(t)).then(function (e) {
            console.info(e);
          });
        });
      } else {
        doErrorMsg(o, t.Err.editprofile2);
      }
    });
  });
}
function DoTask2(e) {
  switch (e) {
    case "meedit":
      DoEditFirst();
      break;
    default:
      e = "meedit";
      DoEditFirst();
  }
  page = e;
  $(".NavTabs").removeClass("active");
  $("#meTab" + e).addClass("active");
}
function DoEditFirst() {
  Reset();
  $("#meedit").removeClass("d-none");
  $("#meback");
}
function initColorsPickers() {
  let e = {
    theme: "nano",
    useAsButton: true,
    closeOnScroll: true,
    swatches: null,
    lockOpacity: true,
    components: {
      palette: true,
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        save: true,
        input: true
      }
    }
  };
  for (let t = 0; t <= 4; t++) {
    e.el = "#button" + t;
    if ($("#button" + t).length) {
      mePickersList[t] = Pickr.create(e);
      mePickersList[t].id = "button" + t;
      let o = getIDFromButton(mePickersList[t].id);
      if (o) {
        let e = $("#" + o);
        if (e) {
          let t = e.val();
          if (t.charAt(0) == "#" && t.length == 7) {
            let o = isColorLight(t);
            e.css({
              "background-color": t,
              color: o ? "#000" : "#FFF"
            });
          }
          e.off("keyup").on("keyup", function () {
            let t = $(this).val();
            if (t.charAt(0) !== "#" || t.charAt(0) == "#" && t.length !== 7) {
              e.css({
                "background-color": "",
                color: "#001"
              });
            } else {
              let o = isColorLight(t);
              e.css({
                "background-color": t,
                color: o ? "#000" : "#FFF"
              });
            }
          });
        }
      }
      mePickersList[t].on("save", (e, t) => {
        if (o) {
          let t = $("#" + o);
          let n = e.toHEXA().toString();
          let a = isColorLight(n);
          t.css({
            "background-color": n,
            color: a ? "#000" : "#FFF"
          });
          t.val(n);
        }
      });
      mePickersList[t].on("show", (e, n) => {
        if (o) {
          let e = $("#" + o);
          if (e.prop("disabled")) {
            mePickersList[t].hide();
            return;
          }
          mePickersList[t].setColor(e.val());
        }
      });
    }
  }
}
function getIDFromButton(e) {
  if (!e) {
    return false;
  }
  switch (e) {
    case "button0":
      return "meback";
  }
}
function isColorLight(e) {
  var t;
  var o;
  var n;
  return !!e && (e.match(/^rgb/) ? (t = (e = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], o = e[2], n = e[3]) : (t = (e = +("0x" + e.slice(1).replace(e.length < 5 && /./g, "$&$&"))) >> 16, o = e >> 8 & 255, n = e & 255), Math.sqrt(t * t * 0.299 + o * o * 0.587 + n * n * 0.114) > 127.5);
}
function initStuff() {
  $("a.btn").on("click", function (e) {
    e.preventDefault();
  });
  document.querySelectorAll(".PassReveal").forEach(e => {
    e.addEventListener("click", e => {
      PassReveal($(e.target));
    });
  });
  handlePopover();
}
$("#CommonDiv").html("");
if (GET.hash && GET.params.length == 0) {
  location.hash = "#" + GET.hash;
}
$("#meTabmeshow,#meTabmelogin").click(function (e) {
  let t = e.currentTarget.id.substr(3);
  DoTask(t);
  location.hash = "#!" + doRealHash(location.hash, t);
  return false;
});
DoTask(getRealHash());
$("#meTabmeedit").click(function (e) {
  let t = e.currentTarget.id.substr(3);
  DoTask2(t);
  location.hash = "#!" + doRealHash(location.hash, t);
  return false;
});
var didQuery = false;
function handlePopover() {
  $("[data-toggle=\"popover\"]").popover({
    trigger: "focus",
    html: true
  });
  if (!didQuery) {
    let t = document.querySelectorAll("[data-toggle=\"popover\"]");
    if (t.length > 0) {
      var e = [];
      t.forEach(function (t) {
        e.push(setTranslateDiv(t, "popover"));
      });
      if (e.length > 0 && xConfig.lang !== "en") {
        localize(["chats"]);
        updateNodeTranslate(e);
      }
    }
    didQuery = true;
  }
}
function initToolTip(e) {
  var t = [];
  if (e) {
    e.tooltip();
    t.push(setTranslateDiv(e[0] || e, "tooltips"));
  } else {
    $("[data-toggle=\"tooltip\"]").tooltip({
      trigger: "hover"
    });
    let e = document.querySelectorAll("[data-toggle=\"tooltip\"]");
    if (e.length > 0) {
      e.forEach(function (e) {
        t.push(setTranslateDiv(e, "tooltips"));
      });
    }
  }
  if (t.length > 0 && xConfig.lang !== "en") {
    localize(["chats"]);
    updateNodeTranslate(t);
  }
}
function setTranslateDiv(e, t) {
  let o;
  let n;
  let a = e.dataset;
  if (a && !e.contains(document.getElementById(t))) {
    let r = document.createElement("div");
    e.appendChild(r);
    if (a.content) {
      o = createElement(r, "div", "content");
      o.innerHTML = a.content;
    }
    if (a.originalTitle) {
      n = createElement(r, "div", "originalTitle");
      n.innerHTML = a.originalTitle;
    }
    r.id = t;
    r.className = "d-none";
    return [e, o, n];
  }
}
function updateNodeTranslate(e) {
  if (!e) {
    return false;
  }
  for (let t in e) {
    if (e[t][1]) {
      e[t][0].setAttribute("data-content", e[t][1].innerHTML);
    }
    if (e[t][2]) {
      e[t][0].setAttribute("data-original-title", e[t][2].innerHTML);
    }
  }
}
function SafeImage(e) {
  if (e.length == 0) {
    return "";
  }
  var t = parse_url(e);
  if ((t ||= parse_url(e = e.charAt(0) == "/" ? "https:" + e : "https://" + e)) && t.host) {
    if (t.host.indexOf("rxat.ro") >= 0 && t.path.indexOf("GetImage") > 0) {
      return e;
    } else {
      return "/web_gear/chat/GetImage7.php?U=" + e;
    }
  } else {
    return "";
  }
}
function parse_url(e, t) {
  var o = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var n = {};
  var a = n["phpjs.parse_url.mode"] && n["phpjs.parse_url.mode"].local_value || "php";
  var r = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var i = r[a].exec(e);
  var s = {};
  for (var l = 14; l--;) {
    if (i[l]) {
      s[o[l]] = i[l];
    }
  }
  if (t) {
    return s[t.replace("PHP_URL_", "").toLowerCase()];
  }
  if (a !== "php") {
    var c = n["phpjs.parse_url.queryKey"] && n["phpjs.parse_url.queryKey"].local_value || "queryKey";
    r = /(?:^|&)([^&=]*)=?([^&]*)/g;
    s[c] = {};
    (s[o[12]] || "").replace(r, function (e, t, o) {
      if (t) {
        s[c][t] = o;
      }
    });
  }
  delete s.source;
  return s;
}
$("#summernote").summernote({
  height: 200,
  minHeight: 100,
  maxHeight: 700,
  disableDragAndDrop: true,
  toolbar: [["font", ["bold", "underline", "italic", "clear"]], ["fontname", ["fontname", "fontsize"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["insert", ["link"]]],
  callbacks: {
    onImageLinkInsert: function (e) {
      if (!e.length) {
        return;
      }
      let t = SafeImage(e);
      $(this).summernote("insertImage", t);
    }
  }
});
$("#summernote2").summernote({
  height: 200,
  minHeight: 100,
  maxHeight: 700,
  disableDragAndDrop: true,
  toolbar: [["font", ["bold", "underline", "italic", "clear"]], ["fontname", ["fontname", "fontsize"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["insert", ["link", "picture"]], ["view", ["codeview"]]],
  callbacks: {
    onImageLinkInsert: function (e) {
      if (!e.length) {
        return;
      }
      let t = SafeImage(e);
      $(this).summernote("insertImage", t);
    }
  }
});
var imageUploadDiv = $("div.note-group-select-from-files");
if (imageUploadDiv.length) {
  imageUploadDiv.remove();
}
$(".note-color button.dropdown-toggle").html("<i class=\"note-icon-caret\"></i>");
$(".noread").attr("readonly", true);
$(".noread").css("background-color", "white");
$(".noread").click(function () {
  $(".noread").attr("readonly", false);
});
$("#meLogo").hover(function () {
  $(".navMe").fadeIn();
});
$(".navMe").hover(function () {
  $(this).addClass("show");
}, function () {
  $(this).removeClass("show").fadeOut();
});
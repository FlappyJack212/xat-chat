"use strict";

// Use global page variable
window.page = window.page || "chats";

// Only run if DOM is ready and not already initialized
if (document.body && !window.chatsInitialized) {
  document.body.style.backgroundColor = "white";
  document.body.classList.remove("invisible");
  if (typeof $ !== "undefined") {
    $("#navGroup,#navxatApps").addClass("d-none");
  }
  if (typeof Reset === "function") {
    Reset();
  }
  if (typeof initConfig === "function") {
    initConfig();
  }
  window.chatsInitialized = true;
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
localize(["chats", "buy"]);
fetchPromo();
setLogo();
document.addEventListener("DOMContentLoaded", function () {
  initStuff();
  initToolTip();
});
let pickersList = [];
let slimList = [];
function DoTask(_0x55f137) {
  switch (_0x55f137) {
    case "lostpass":
      DoEditGroup();
      $("#lostpwmodal").modal();
      break;
    case "creategroup":
      DoCreateGroup(_0x55f137);
      break;
    case "editgroup":
      DoEditGroup(_0x55f137);
      break;
    case "events":
      DoEvents(_0x55f137);
      break;
    case "library":
      DoLibrary(_0x55f137);
      break;
    default:
      _0x55f137 = "creategroup";
      DoCreateGroup();
  }
  page = _0x55f137;
  $(".NavTabs").removeClass("active");
  $("#tab" + _0x55f137).addClass("active");
}
function DoCreateGroup() {
  Reset();
  let _0x1a3c8a = $("#creategrouperr");
  $("#creategroup").removeClass("d-none");
  $("#YourName").focus();
  let _0x521113 = getGET();
  let _0x207107 = false;
  let _0x573aff = _0x521113.params.activate || getRealHash() === "activate";
  let _0x16ae15 = _0x521113.params.id;
  let _0x664389 = _0x521113.params.gn;
  if (function (_0x57853a, _0x3c009a) {
    return _0x57853a && _0x3c009a;
  }(_0x573aff, _0x16ae15) && _0x664389) {
    return doActivateGroup(_0x16ae15, _0x664389);
  }
  let _0x2a1c11 = _0x521113.params.Token;
  let _0x32290f = _0x521113.params.GroupName;
  if (function (_0x21f593, _0x2e1eff) {
    return _0x21f593 && _0x2e1eff;
  }(_0x32290f, _0x2a1c11)) {
    return doConfirmDelete(_0x32290f, _0x2a1c11);
  }
  $("#createyes").off("submit").submit(function (_0x2fb87d) {
    _0x2fb87d.preventDefault();
    let _0x1ed0fc = {};
    let _0x55a5a0 = $("#YourName").val();
    let _0xf27a4a = $("#GroupName").val();
    let _0x1b205c = $("#GroupDescription").val();
    let _0x5b62ab = $("#Tags").val();
    let _0x66eee9 = $("#password").val();
    let _0x55f3c6 = $("#email").val();
    let _0x9bbcc1 = $("#Agree").is(":checked");
    $(".noread").attr("readonly", true);
    $("html, body").animate({
      scrollTop: $(document).height()
    }, "slow");
    _0x1a3c8a.addClass("d-none");
    _0x1ed0fc.YourName = filter(_0x55a5a0);
    _0x1ed0fc.GroupName = filter(_0xf27a4a);
    _0x1ed0fc.GroupDescription = filter(_0x1b205c);
    _0x1ed0fc.Tags = filter(_0x5b62ab);
    _0x1ed0fc.password = filter(_0x66eee9);
    _0x1ed0fc.email = filter(_0x55f3c6);
    _0x1ed0fc.submit = filter(1);
    _0x1ed0fc.agree = filter(_0x9bbcc1 ? "agree" : "");
    if (_0x207107) {
      _0x1ed0fc["g-recaptcha-response"] = grecaptcha.getResponse();
    }
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/creategroup2.php", filter(_0x1ed0fc)).then(function (_0x1d9df7) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      if (_0x1d9df7.Err.captchasuccess) {
        "<p>";
        "<span data-localize=\"chats.groupmail\">A confirmation email has been sent.</span> ";
        "<span data-localize=\"chats.groupclick\">You now need to click on the link in that email to activate your group.</span>";
        "</p>";
        "<p data-localize=\"chats.groupspam\" class=\"font-weight-bold\">Note: If you do not receive an email, check your spam inbox.</p>";
        "<p class=\"font-weight-bold\">(<span data-localize=\"chats.groupdelay\">The email could take up to 30 minutes to arrive.</span>)</p>";
        "<p class=\"mb-0\">";
        "<span data-localize=\"chats.groupcant\">If you still cannot find your email, you may need to reapply using an email provider that works.</span> ";
        "<span data-localize=\"chats.groupgm\">Try an email provider such as:</span>";
        " <a class=\"nodeco\" target=\"_blank\" href=\"https://gmail.com\">Gmail</a>. ";
        "<span data-localize=\"chats.groupoper\">If your email provider does not deliver our emails, you will not be able to operate your chat.</span>";
        "</p>";
        doSuccessMsg($("#creategrouphtml"), "<p data-localize=\"chats.groupthanks\">Thank you. Your group application has been processed.</p><p><span data-localize=\"chats.groupmail\">A confirmation email has been sent.</span> <span data-localize=\"chats.groupclick\">You now need to click on the link in that email to activate your group.</span></p><p data-localize=\"chats.groupspam\" class=\"font-weight-bold\">Note: If you do not receive an email, check your spam inbox.</p><p class=\"font-weight-bold\">(<span data-localize=\"chats.groupdelay\">The email could take up to 30 minutes to arrive.</span>)</p><p class=\"mb-0\"><span data-localize=\"chats.groupcant\">If you still cannot find your email, you may need to reapply using an email provider that works.</span> <span data-localize=\"chats.groupgm\">Try an email provider such as:</span> <a class=\"nodeco\" target=\"_blank\" href=\"https://gmail.com\">Gmail</a>. <span data-localize=\"chats.groupoper\">If your email provider does not deliver our emails, you will not be able to operate your chat.</span></p>", false);
        return;
      }
      if (_0x1d9df7.Err.grpnameerr) {
        _0x1a3c8a.addClass("d-none");
        doErrorMsg(_0x1a3c8a, "<span data-localize=\"chats.notallowed\">Group name contains invalid characters.</span>");
      }
      if (_0x1d9df7.Err.captcha) {
        _0x207107 = true;
        AddCap("createcap");
        $("#createcap").addClass("capspace");
        return;
      }
      _0x207107 = false;
      $("#createcap").removeClass("capspace");
      DoErrs(_0x1d9df7, "creategroup");
      localize(["chats"]);
    });
  });
}
$("#CommonDiv").html("");
if (GET.hash && GET.params.length == 0) {
  location.hash = "#" + GET.hash;
}
$("#tabcreategroup,#tabeditgroup,#tabevents,#tablibrary").click(function (_0x1084e9) {
  let _0x89cab0 = _0x1084e9.currentTarget.id.substr(3);
  DoTask(_0x89cab0);
  location.hash = "#!" + doRealHash(location.hash, _0x89cab0);
  return false;
});
DoTask(getRealHash());
let url = "https://rxat.ro/web_gear/chat/editgroup3.php";
function DoEditGroup() {
  Reset();
  $("#editgroup").removeClass("d-none");
  $("#Edpassword").focus();
  $(".groupnamecol #GroupName").html("");
  let _0x1cbad4 = getGET();
  let _0x4a3d2b = $("#GroupNameI");
  let _0x117cb5 = _0x1cbad4.params.GroupName;
  _0x117cb5 = window.location.search.indexOf("GroupName=") === -1 && window.location.href.indexOf("GroupName=") === -1 ? "" : _0x117cb5;
  if (_0x117cb5) {
    _0x4a3d2b.addClass("d-none");
    $(".groupnamecol #GroupName").html(filter(_0x117cb5));
  } else {
    _0x4a3d2b.removeClass("d-none");
  }
  $(".grouploginform").off("submit").submit(function (_0x19ca70) {
    _0x19ca70.preventDefault();
    let _0x5ebd9d = _0x117cb5 || _0x4a3d2b.val();
    let _0x17c820 = $("#Edpassword").val();
    let _0x4e09a3 = getTodo();
    _0x4e09a3 &&= JSON.parse(_0x4e09a3);
    let _0x1a6af8 = {};
    let _0x599403 = $("#editgrouperr");
    if (!_0x5ebd9d.length) {
      doErrorMsg(_0x599403, "<span data-localize=\"chats.grpempty\">Group name cannot be empty</span>");
      return false;
    }
    _0x599403.addClass("d-none");
    _0x1a6af8.name = filter(_0x5ebd9d);
    _0x1a6af8.password = filter(_0x17c820);
    _0x1a6af8.MainOwner = getUserId();
    _0x1a6af8.DeviceId = _0x4e09a3 && _0x4e09a3.DeviceId || "";
    _0x1a6af8.PassHash = _0x4e09a3 && _0x4e09a3.PassHash || "";
    _0x1a6af8.SubmitPass = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, filter(_0x1a6af8)).then(function (_0x450a6e) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x450a6e.Err.name) {
        _0x450a6e.GroupName = _0x450a6e.Err.name;
        _0x450a6e.password = _0x17c820;
        _0x450a6e.TokenKey = _0x450a6e.Err.TokenKey;
        xConfig.obj = _0x450a6e;
        xConfig.obj.Err.mainsList = undefined;
        xConfig.obj.arrPow = filterPowers(_0x450a6e.Err.Powers);
        if (_0x450a6e.Err.FullMain !== 1) {
          updateTabs();
        }
        enablePreview();
        $("#editgroup").addClass("d-none");
        $("#editgroup_edit").removeClass("d-none");
        $("#mainNav").addClass("d-none");
        $("#tabappearance,#tabtabs,#tabsettings,#tabgrouppowers,#tabmainowners,#tabmiscellaneous,#tabreturn,#tabembed").off("click").click(function (_0x20fcca) {
          let _0x16e59d = _0x20fcca.currentTarget.id.substr(3);
          if (_0x16e59d == "return") {
            _0x16e59d = "editgroup";
            DoReturn();
            DoTask(_0x16e59d);
            return false;
          } else if (_0x16e59d == "embed") {
            return doEmbed();
          } else {
            DoTask2(_0x16e59d);
            location.hash = "#!" + doRealHash(location.hash, _0x16e59d);
            return false;
          }
        });
        DoTask2(getRealHash());
      } else {
        doErrorMsg(_0x599403, _0x450a6e.Err.editgroup);
      }
    });
  });
  $(document).on("click", "#lostpw", function (_0x526e95) {
    doForgotPassword();
  });
}
initSlimSeletect(["eventstype", "eventspower", "statstype"]);
var urlE = "https://rxat.ro/web_gear/chat/events2.php";
function getByGroupName(_0x26362c, _0x538c53) {
  if (_0x26362c) {
    fetch("https://rxat.ro/api/roomid.php?d=" + filter(_0x26362c)).then(function (_0x226082) {
      return _0x226082.json();
    }).then(function (_0x5d286f) {
      _0x538c53(_0x5d286f);
    }).catch(function (_0x558190) {
      _0x538c53(false);
    });
  }
}
function DoEvents(_0x172cad) {
  Reset();
  $("#events").removeClass("d-none");
  let _0x7c00c6 = getGET();
  let _0x3ab35a = $("#eventserr");
  $("#Stats");
  $("#Search");
  let _0x4b5e55 = $("#olderres");
  let _0x5f1dfb = $("#eventstats");
  let _0x158be6 = $("#eventsresult");
  let _0xd2a28a = $("#EventsGrp");
  let _0x42f596 = _0x7c00c6.params.roomid || _0x172cad;
  let _0x4944d8 = _0x7c00c6.params.GroupName;
  _0x42f596 = window.location.search.indexOf("roomid=") === -1 && window.location.href.indexOf("roomid=") === -1 ? "" : _0x42f596;
  if (function (_0x48b051, _0x1f5204) {
    return _0x48b051 && _0x1f5204;
  }(_0x4944d8, !_0x42f596)) {
    getByGroupName(_0x4944d8, _0x5c13bb => {
      if (_0x5c13bb) {
        location.hash = "#!events&GroupName=" + _0x5c13bb.g + "&roomid=" + _0x5c13bb.id;
        return DoEvents();
      }
    });
  } else if (_0x42f596) {
    $("#events #GroupName").html(filter(_0x4944d8));
  }
  let _0x461d7f = null;
  if (_0xd2a28a) {
    _0xd2a28a.off("keyup").on("keyup", function (_0x308c35) {
      let _0x2ceab5 = $(this).val();
      clearTimeout(_0x461d7f);
      _0x461d7f = setTimeout(function () {
        if (_0x2ceab5) {
          getByGroupName(_0x2ceab5, _0x4aeea4 => {
            if (_0x4aeea4) {
              location.hash = "#!events&GroupName=" + _0x4aeea4.g + "&roomid=" + _0x4aeea4.id;
              $("#events #GroupName").removeClass("d-none");
              $("#eventsNoGrp").addClass("d-none");
              return DoEvents();
            }
            location.hash = "#!events";
            _0x4944d8 = _0x42f596 = undefined;
            $("#events #GroupName").addClass("d-none");
            $("#eventsNoGrp").removeClass("d-none");
          });
        }
      }, 500);
    });
  }
  if (!xConfig.events) {
    $(document.body).css({
      cursor: "wait"
    });
    urlPost("https://rxat.ro/web_gear/chat/events2.php?j=1", {}).then(function (_0x10ac6e) {
      $(document.body).css({
        cursor: "default"
      });
      xConfig.events = _0x10ac6e;
      loadEventsModes();
    });
  }
  google.charts.load("current", {
    packages: ["corechart", "table"]
  });
  xConfig.get = _0x7c00c6;
  $("#eventsyes").off("submit").submit(function (_0x444494) {
    _0x444494.preventDefault();
    let _0x5f2bb6 = getEventsParams();
    _0x5f2bb6.roomid = _0x42f596;
    _0x5f2bb6.GroupName = _0x4944d8;
    let _0x3b7f30 = $("#eventspower").val();
    let _0x1d8352 = $("#eventsuserid").val();
    let _0xdeb29 = $("#eventstype").val();
    _0x3ab35a.addClass("d-none");
    _0x5f2bb6.search = filter(_0x1d8352) || "";
    _0x5f2bb6.Type = filter(_0xdeb29) || "";
    _0x5f2bb6.Power = filter(_0x3b7f30) || "";
    _0x5f2bb6.Search = 1;
    _0x5f1dfb.addClass("invisible");
    _0x5f1dfb.addClass("statsvi");
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(urlE, filter(_0x5f2bb6)).then(function (_0xeca622) {
      $(document.body).css({
        cursor: "default"
      });
      return loadEventsResults(_0xeca622.Err);
    });
  });
  _0x4b5e55.off("click").on("click", function (_0x367410) {
    _0x367410.preventDefault();
    let _0x109e2b = $("#eventspower").val();
    let _0x282686 = $("#eventsuserid").val();
    let _0x3ae7a6 = $("#eventstype").val();
    let _0xc6cb35 = xConfig.eventsRes;
    if (_0xc6cb35) {
      let _0x5b3061 = getEventsParams();
      _0x5b3061.roomid = _0x42f596;
      _0x5b3061.GroupName = _0x4944d8;
      _0x5b3061.from = _0xc6cb35.count;
      _0x5b3061.from1 = _0xc6cb35.nextfrom;
      _0x5b3061.search = filter(_0x282686) || "";
      _0x5b3061.Type = filter(_0x3ae7a6) || "";
      _0x5b3061.Power = filter(_0x109e2b) || "";
      _0x5b3061.Search = 1;
      $(document.body).css({
        cursor: "wait"
      });
      urlPost(urlE, filter(_0x5b3061)).then(function (_0x1b8c59) {
        $(document.body).css({
          cursor: "default"
        });
        return loadEventsResults(_0x1b8c59.Err);
      });
    }
  });
  $("#statsyes").off("submit").submit(function (_0x2363a9) {
    _0x2363a9.preventDefault();
    let _0x5b4cea = getEventsParams();
    _0x5b4cea.roomid = _0x42f596;
    _0x5b4cea.GroupName = _0x4944d8;
    let _0x1f6823 = $("#statsuserid").val();
    let _0x1d7d19 = $("#staysdays").val();
    let _0xed6b41 = $("#statstype").val();
    _0x3ab35a.addClass("d-none");
    _0x5b4cea.userid = filter(_0x1f6823) || "";
    _0x5b4cea.Type = filter(_0xed6b41) || "";
    _0x5b4cea.days = filter(_0x1d7d19 && _0x1d7d19 <= 14 ? _0x1d7d19 : 7);
    _0x5b4cea.Stats = 1;
    _0x158be6.addClass("d-none");
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(urlE, filter(_0x5b4cea)).then(function (_0x389859) {
      $(document.body).css({
        cursor: "default"
      });
      return loadEventsStats(_0x389859.Err);
    });
  });
  localize(["buy"]);
}
function loadEventsModes() {
  if (!xConfig.events) {
    return false;
  }
  let _0x353d73 = xConfig.events;
  let _0xec0ad8 = $("#eventstype");
  let _0x553470 = $("#statstype");
  let _0x1aa476 = $("#eventspower");
  let _0x2c86b0 = _0x353d73.Modes;
  let _0x452320 = _0x353d73.Powers;
  let _0x5e538a = "<option value=\"\" data-localize=\"chats.all\">All</option>";
  for (let _0x20effd in _0x2c86b0) {
    _0x5e538a += "<option value=\"" + _0x20effd + "\">" + _0x2c86b0[_0x20effd] + "</option>";
  }
  _0xec0ad8.html(_0x5e538a);
  _0x553470.html(_0x5e538a);
  let _0x37aa96 = "<option value=\"\" data-localize=\"chats.all\">All</option>";
  for (let _0x5cc98c in _0x452320) {
    _0x37aa96 += "<option value=\"" + _0x5cc98c + "\">" + _0x452320[_0x5cc98c] + "</option>";
  }
  _0x1aa476.html(_0x37aa96);
  localize(["chats"]);
}
function loadEventsStats(_0x577d69) {
  let _0x53f303 = $("#eventstats");
  let _0x34f818 = $("#eventserr");
  let _0x1faa3f = $("#errnoresult");
  if (_0x577d69.stats) {
    google.charts.setOnLoadCallback(drawChart(_0x577d69.stats));
    _0x53f303.removeClass("invisible");
    _0x53f303.removeClass("statsvi");
    _0x34f818.addClass("d-none");
  } else if (_0x577d69.events && typeof _0x577d69.events == "string" || _0x577d69.notfound) {
    _0x53f303.addClass("invisible");
    _0x34f818.removeClass("d-none");
    _0x53f303.addClass("statsvi");
    doErrorMsg(_0x34f818, _0x577d69.events || _0x577d69.notfound.replace(/<[^>]*>?/gm, ""));
  }
  _0x1faa3f.addClass("d-none");
  document.getElementById("eventstats").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
function drawChart(_0x353259) {
  var _0x4ef41b = google.visualization.arrayToDataTable(_0x353259.datakp);
  var _0x2033f6 = google.visualization.arrayToDataTable(_0x353259.datakb);
  var _0x25faa0 = google.visualization.arrayToDataTable(_0x353259.Who);
  var _0x460107 = google.visualization.arrayToDataTable(_0x353259.Table);
  var _0x4248bf = {
    width: 700,
    is3D: true,
    backgroundColor: {
      fill: "transparent"
    },
    chartArea: {
      width: "95%",
      height: "95%"
    }
  };
  var _0x107f17 = {
    width: 800,
    height: 600,
    legend: {
      position: "right",
      maxLines: 3
    },
    backgroundColor: {
      fill: "transparent"
    },
    bar: {
      groupWidth: "75%"
    },
    chartArea: {
      width: "45%",
      height: "80%"
    },
    isStacked: true
  };
  new google.visualization.PieChart(document.getElementById("piechart_3d_k")).draw(_0x4ef41b, _0x4248bf);
  new google.visualization.ColumnChart(document.getElementById("barchart_k")).draw(_0x2033f6, _0x107f17);
  new google.visualization.ColumnChart(document.getElementById("barchart_who")).draw(_0x25faa0, _0x107f17);
  new google.visualization.Table(document.getElementById("datatable")).draw(_0x460107, _0x4248bf);
}
function loadEventsResults(_0x2dddef) {
  let _0x588980 = $("#eventsresult");
  let _0x141789 = $("#eventserr");
  let _0x2618bc = $("#eventsList");
  let _0x49bc22 = $("#evresultcon");
  let _0x3248b7 = $("#errnoresult");
  let _0x5d1872 = "";
  let _0x4a7469 = false;
  if (_0x2dddef.events) {
    _0x49bc22.removeClass("d-none");
    _0x3248b7.addClass("d-none");
    if (typeof _0x2dddef.events == "string") {
      _0x3248b7.addClass("d-none");
      _0x588980.addClass("d-none");
      doErrorMsg(_0x141789, _0x2dddef.events);
    } else {
      for (let _0x50222f in _0x2dddef.events) {
        let _0x15d896 = _0x2dddef.events[_0x50222f][1];
        let _0x1cf62c = _0x2dddef.events[_0x50222f][3];
        let _0x1ff6b0 = getClassIfNeeded(_0x1cf62c);
        _0x1cf62c = _0x1cf62c.replace("demote to member", "demote to mem");
        if (_0x15d896 !== null) {
          _0x15d896 = _0x15d896.replace(/<[^>]*>?/gm, "");
          _0x15d896 = "<a href=\"\" id=\"unmodm\" data-toggle=\"modal\" data-id=\"" + _0x15d896 + "\" data-target=\"#demotemodmodal\" class=\"nodeco\">" + _0x15d896 + "</a>";
        } else {
          _0x15d896 = "";
        }
        _0x5d1872 += "<tr>";
        _0x5d1872 += "<th scope=\"row\">" + _0x50222f + "</th>";
        _0x5d1872 += "<td>" + _0x2dddef.events[_0x50222f][0] + "</td>";
        _0x5d1872 += "<td>" + _0x15d896 + "</td>";
        _0x5d1872 += "<td>" + (_0x2dddef.events[_0x50222f][2] == null ? "" : _0x2dddef.events[_0x50222f][2]) + "</td>";
        _0x5d1872 += "<td><img src=\"" + getEventsImage(_0x1cf62c) + "\" class=\"" + _0x1ff6b0 + " iconbr\" width=\"22\"> " + _0x1cf62c + "</td>";
        _0x5d1872 += "<td>" + (_0x2dddef.events[_0x50222f][4] == null ? "" : _0x2dddef.events[_0x50222f][4]) + "</td>";
        _0x5d1872 += "<td>" + (_0x2dddef.events[_0x50222f][5] == null ? "" : _0x2dddef.events[_0x50222f][5]) + "</td>";
        _0x5d1872 += "<td>" + (_0x2dddef.events[_0x50222f][6] == null ? "" : _0x2dddef.events[_0x50222f][6]) + "</td>";
        _0x5d1872 += "<td>" + (_0x2dddef.events[_0x50222f][7] == null ? "" : filter(_0x2dddef.events[_0x50222f][7], true)) + "</td>";
        _0x5d1872 += "</tr>";
      }
      xConfig.eventsRes = _0x2dddef;
      _0x4a7469 = true;
      _0x141789.addClass("d-none");
      _0x588980.removeClass("d-none");
    }
  } else {
    _0x49bc22.addClass("d-none");
    _0x3248b7.removeClass("d-none");
  }
  _0x2618bc.html(_0x5d1872);
  document.getElementById("eventsresult").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  if (_0x4a7469) {
    document.querySelectorAll("#unmodm").forEach(_0xe4a272 => {
      _0xe4a272.addEventListener("click", function (_0x16cd8c) {
        _0x16cd8c.preventDefault();
        let _0x47f21d = _0x16cd8c.target.dataset.id;
        let _0x6e9a59 = $("#demotemodmodal");
        if (!_0x47f21d) {
          return false;
        }
        _0x6e9a59.modal();
        $("#unmod").off("click").on("click", function (_0x26a3bb) {
          _0x6e9a59.modal("hide");
          _0x26a3bb.preventDefault();
          let _0xb8eb06 = getEventsParams();
          _0x141789.addClass("d-none");
          _0xb8eb06.MainOwner = xConfig.id || 0;
          _0xb8eb06.id = xConfig.get.params.roomid || 5;
          _0xb8eb06.UnMod = _0x47f21d;
          $(document.body).css({
            cursor: "wait"
          });
          urlPost(urlE, _0xb8eb06).then(function (_0x2e4498) {
            $(document.body).css({
              cursor: "default"
            });
            if (_0x2e4498.Err.UnMod) {
              let _0xbfc92 = _0x2e4498.Err.UnMod;
              if (_0xbfc92.indexOf("done") >= 0) {
                doSuccessMsg(_0x141789, "<span data-localize=\"chats.demsuc\">User has been demoted</span>");
                $("body,html").animate({
                  scrollTop: 0
                }, 800);
              } else if (_0xbfc92.indexOf("Not enough rank") >= 0) {
                doErrorMsg(_0x141789, "<span data-localize=\"chats.demfail\">Your rank is not high enough</span>");
                $("body,html").animate({
                  scrollTop: 0
                }, 800);
              } else {
                doErrorMsg(_0x141789, "<span data-localize=\"chats.demfailoth\">User could not be demoted</span>");
                $("body,html").animate({
                  scrollTop: 0
                }, 800);
              }
            }
          });
        });
      });
    });
  }
}
function getEventsParams() {
  let _0x1cb984 = {};
  let _0x44a457 = getTodo();
  _0x44a457 &&= JSON.parse(_0x44a457);
  _0x1cb984.DeviceId = _0x44a457 && _0x44a457.DeviceId || "";
  _0x1cb984.PassHash = _0x44a457 && _0x44a457.PassHash || "";
  _0x1cb984.Id = _0x44a457 && _0x44a457.w_userno || 0;
  return _0x1cb984;
}
function getClassIfNeeded(_0x21564f) {
  let _0x496499 = "";
  if (_0x21564f.indexOf("un-") >= 0 || _0x21564f.indexOf("UnBan") >= 0) {
    _0x496499 = "unevicon";
  } else {
    switch (_0x21564f.replace(/ /gi, "")) {
      case "protectoff":
        _0x496499 = "protevicon";
        break;
      case "demotetoguest":
      case "demotetomember":
        _0x496499 = "demguestic";
        break;
      case "demotetomod":
        _0x496499 = "demguestic demmodin";
        break;
      case "kick":
        _0x496499 = "kickic";
        break;
      case "yellowcard":
      case "badge":
      case "kickall":
      case "redcard":
        _0x496499 = "yellowic";
        break;
      case "un-yellowcard":
      case "un-redcard":
      case "un-badge":
        _0x496499 = "unevicon yellowic";
      case "restore":
        _0x496499 = "restoreic";
        break;
      case "promotion":
        _0x496499 = "promoic";
    }
  }
  return _0x496499;
}
function getEventsImage(_0x18ce1d) {
  _0x18ce1d = (_0x18ce1d = (_0x18ce1d = (_0x18ce1d = (_0x18ce1d = (_0x18ce1d = _0x18ce1d.replace(/ /gi, "")).replace("un-", "")).replace(/naughty/gi, "naughtystep")).replace(/muted/gi, "mute")).replace(/tempmember/gi, "tempmem")).toLowerCase();
  if (["mazeunban", "spaceunban", "codeunban", "matchunban", "snakeunban", "slotunban"].indexOf(_0x18ce1d) >= 0) {
    _0x18ce1d = _0x18ce1d.replace(/unban/gi, "ban");
  }
  if (_0x18ce1d == "redcardself") {
    _0x18ce1d = "redcard";
  }
  let _0x2a211d = {
    ban: "actBan",
    protecton: "actCancel",
    protectoff: "actCancel",
    kick: "actKick",
    makeguest: "actMakeGuest",
    makemember: "actMakeMember",
    makemod: "actMakeModerator",
    makeowner: "actMakeOwner",
    unban: "actUnban",
    demotetoguest: "demoteguest",
    demotetomem: "demotemember",
    demotetomod: "demotemod",
    restore: "download",
    promotion: "promotion",
    setscroller: "setscroll"
  };
  let _0x2ee0c2 = ["badge", "dunce", "gag", "guestself", "hush", "kickall", "mute", "naughtystep", "ranklock", "redcard", "sinbin", "tempmem", "yellowcard", "snakeban", "spaceban", "matchban", "codeban", "mazeban", "zip", "reverse", "slotban", "flipban"];
  if (_0x2a211d[_0x18ce1d]) {
    return "https://rxat.ro/content/img/events/" + _0x2a211d[_0x18ce1d] + ".svg";
  } else if (_0x2ee0c2.indexOf(_0x18ce1d) >= 0) {
    return "https://rxat.ro/images/smw/" + _0x2ee0c2[_0x2ee0c2.indexOf(_0x18ce1d)] + ".png";
  } else {
    return "";
  }
}
function DoLibrary() {
  Reset();
  $("#library").removeClass("d-none");
  doLibraryList();
}
let other = false;
function doLibraryList() {
  $.ajax("https://util.rxat.ro/api.php?action=parse&page=Area51:Xatframe-entries&prop=wikitext&formatversion=2&format=json&origin=*", {
    success: function (_0x2aa7d0) {
      var _0x1c3168 = shuffle($.csv.toArrays(_0x2aa7d0.parse.wikitext));
      showEntrants($.csv.toArrays(_0x2aa7d0.parse.wikitext));
      showList(_0x1c3168);
      $("#num").off("click").on("click", function () {
        $("#onclickInfo").addClass("d-none");
        showList(_0x1c3168 = sortnew(_0x1c3168, other));
        if (other) {
          other = false;
          $("#num").html("9-1");
        } else {
          other = true;
          $("#num").html("1-9");
        }
      });
      $("#all").off("click").on("click", function () {
        $("[data-clickable=\"true\"]").show();
        $("[data-clickable=\"false\"]").show();
        $("#onclickInfo").addClass("d-none");
        $(".libtop").removeClass("d-none");
      });
      $("#clickable").off("click").on("click", function () {
        const _0x36e45f = {};
        const _0x50478c = "2|1|3|4|0".split("|");
        let _0x33e70e = 0;
        while (true) {
          switch (_0x50478c[_0x33e70e++]) {
            case "0":
              $(".libtop").addClass("d-none");
              continue;
            case "1":
              $("[data-clickable=\"false\"]").hide();
              continue;
            case "2":
              $("#all").removeClass("d-none");
              continue;
            case "3":
              $("[data-clickable=\"true\"]").show();
              continue;
            case "4":
              $("#onclickInfo").removeClass("d-none");
              continue;
          }
          break;
        }
      });
    }
  });
}
function showList(_0x35333c) {
  if (_0x35333c.length) {
    $("#out").html("");
    for (var _0x4ae304 of _0x35333c) {
      $("#out").append("<div class='col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3' data-clickable='" + (_0x4ae304[5] == "clickable" ? "true" : "false") + "'><div class='text-center xfcard'><p class='xfname'><span>" + _0x4ae304[3] + "</span></p><img class='mt-1' width='240' height='135' src='" + _0x4ae304[1] + "'><p class='xfbut nosel'><span><a class='btn btn-outline-primary btn-sm xfbutpa' target='_blank' href='" + _0x4ae304[2] + "' data-localize='chats.preview'>preview</a></span><span> <a id='libcopy' href='#' class='libcopy btn btn-outline-primary btn-sm ml-2 xfbutpa' data-url='" + _0x4ae304[2] + "' data-toggle-sec='tooltip' data-placement='top' data-html='true' title='<span data-localize=chats.copied>Copied</span>!'><span data-localize='chats.copy'>copy</span></a></span></p>" + (_0x4ae304[4] == "transparent" ? "<p class='xftransbut'><a class='transreq nosel' href='https://util.rxat.ro/wiki/Html5:Owners_Guide#Additional_options' target='_blank' data-localize='chats.transuit'>Suitable for transparent chat</a></p>" : "") + "</div></div>");
    }
    framecopy();
    localize(["chats"]);
  }
}
function showEntrants(_0x2f525e) {
  $("#topFive").html("");
  let _0x2af49c = {};
  for (var _0xdd85fc of _0x2f525e) {
    let _0x3c0a29 = _0xdd85fc[3].replace(/[^a-z]/gi, "");
    if (_0x3c0a29) {
      _0x2af49c[_0x3c0a29] ||= 0;
      _0x2af49c[_0x3c0a29]++;
    }
  }
  let _0x2de1d9 = [];
  if (_0x2af49c) {
    for (let _0x401b9d in _0x2af49c) {
      if (_0x2af49c.hasOwnProperty(_0x401b9d) && _0x2af49c[_0x401b9d] > 1) {
        _0x2de1d9.push([_0x401b9d, _0x2af49c[_0x401b9d]]);
      }
    }
    _0x2de1d9 = shuffle(_0x2de1d9);
    _0x2de1d9.sort((_0x554130, _0x1f7777) => _0x1f7777[1] - _0x554130[1]);
    _0x2de1d9 = _0x2de1d9.slice(0, 5);
    for (let _0x1cab34 in _0x2de1d9) {
      $("#topFive").append("<span>" + _0x2de1d9[_0x1cab34][0] + " (" + _0x2de1d9[_0x1cab34][1] + ") </span>");
    }
  }
}
function framecopy() {
  let _0x4e6cb6 = document.querySelectorAll("#libcopy");
  $(".libcopy").tooltip({
    trigger: "click",
    placetop: "top"
  });
  if (_0x4e6cb6.length > 0) {
    for (let _0x22ac5c in _0x4e6cb6) {
      if (typeof _0x4e6cb6[_0x22ac5c] == "object") {
        _0x4e6cb6[_0x22ac5c].addEventListener("click", _0x113da4 => {
          _0x113da4.preventDefault();
          let _0x208476 = _0x113da4.target.nodeName;
          let _0x283cd5 = _0x113da4.target.dataset;
          if (_0x208476 !== "A") {
            _0x283cd5 = _0x113da4.target.parentNode.dataset;
          }
          if (_0x283cd5 !== undefined && _0x283cd5.url) {
            var _0x843d22 = document.createElement("textarea");
            _0x843d22.value = _0x283cd5.url;
            _0x843d22.style.top = "0";
            _0x843d22.style.left = "0";
            _0x843d22.style.position = "fixed";
            document.body.appendChild(_0x843d22);
            _0x843d22.focus();
            _0x843d22.select();
            document.execCommand("copy");
            setTimeout(function () {
              $(".libcopy").tooltip("hide");
            }, 1000);
            localize(["chats"]);
          }
        });
      }
    }
  }
}
function shuffle(_0x19eee5) {
  let _0x922ac = _0x19eee5.length;
  while (_0x922ac > 0) {
    let _0x3cfef6 = Math.floor(Math.random() * _0x922ac);
    _0x922ac--;
    let _0x4cf655 = _0x19eee5[_0x922ac];
    _0x19eee5[_0x922ac] = _0x19eee5[_0x3cfef6];
    _0x19eee5[_0x3cfef6] = _0x4cf655;
  }
  return _0x19eee5;
}
function sortnew(_0x444443, _0x580934) {
  _0x444443.sort((_0x442a11, _0x2c4d69) => _0x580934 ? _0x442a11[0] - _0x2c4d69[0] : _0x2c4d69[0] - _0x442a11[0]);
  return _0x444443;
}
function DoTask2(_0x777a4a) {
  switch (_0x777a4a) {
    case "appearance":
      DoAppearance();
      break;
    case "tabs":
      DoTabs();
      break;
    case "settings":
      DoSettings();
      break;
    case "grouppowers":
      DoGroupPowers();
      break;
    case "mainowners":
      DoMainOwners();
      break;
    case "miscellaneous":
      DoMisc();
      break;
    case "return":
      DoReturn();
      break;
    default:
      _0x777a4a = "appearance";
      DoAppearance();
  }
  page = _0x777a4a;
  $("#editgroup_edit").removeClass("d-none");
  $(".NavTabs").removeClass("active");
  $("#tab" + _0x777a4a).addClass("active");
}
function DoAppearance() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#appearance").removeClass("d-none");
  handleAppearanceTab();
}
function DoMisc() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#miscellaneous").removeClass("d-none");
  let _0x162753 = xConfig.obj;
  let _0x34fad3 = _0x162753.Err;
  let _0x47c896 = $("#BackupUsers");
  let _0x5a2b43 = $("#chatbackupselect");
  let _0x46232c = $("#RestoreUsers");
  let _0x1bdbf3 = $("#backupusers");
  let _0x16e44f = hasPower(310);
  let _0x11840b = $("#miscsuccess");
  let _0x5c0dd1 = $("#GetMainOk");
  let _0x49ecc8 = $("#getmain");
  $(document).on("click", "#changepw", function (_0x3b8c37) {
    _0x3b8c37.preventDefault();
    doChangePassword();
  });
  $(document).on("click", "#resetchat", function (_0x1775b2) {
    _0x1775b2.preventDefault();
    doResetChat();
  });
  $(document).on("click", "#deletegroup", function (_0x4e809f) {
    _0x4e809f.preventDefault();
    doDeleteGroup(_0x162753);
  });
  if (_0x16e44f) {
    _0x1bdbf3.attr("disabled", false);
    _0x1bdbf3.removeClass("plusic");
    _0x1bdbf3.removeClass("nohov");
  } else {
    _0x1bdbf3.attr("disabled", true);
    _0x1bdbf3.addClass("plusic");
    _0x1bdbf3.addClass("nohov");
  }
  _0x1bdbf3.off("click").on("click", function (_0x3620e0) {
    _0x3620e0.preventDefault();
    if (!_0x16e44f) {
      return false;
    }
    $("#backupusersmodal").modal();
  });
  _0x47c896.off("click").on("click", function (_0x25c720) {
    $("#backupusersmodal").modal("hide");
    let _0x506fc2 = getPostParam();
    _0x506fc2.BackupUsers = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x506fc2).then(function (_0x20e3bd) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x20e3bd.Err.xatu) {
        doSuccessMsg(_0x11840b, "<span data-localize=\"chats.downlsuc\">Backup file has been downloaded</span>");
        return doDownload(atob(_0x20e3bd.Err.xatu), _0x162753.GroupName + ".xatu");
      }
      DoErrs(_0x20e3bd, "backupusers");
    });
  });
  _0x5a2b43.off("change").on("change", function (_0x3f12d0) {
    let _0x492969 = $(this);
    updateFileName(_0x492969);
    _0x46232c.removeClass("d-none");
    _0x46232c.off("click").on("click", function (_0x3fdebe) {
      $("#backupusersmodal").modal("hide");
      if (_0x3f12d0.target.files) {
        let _0x497732 = _0x3f12d0.target.files[0];
        uploadFile(_0x497732, function (_0x30d7c8) {
          let _0x554af2 = getPostParam();
          _0x554af2.RestoreUsers = btoa(_0x30d7c8);
          $(document.body).css({
            cursor: "wait"
          });
          urlPost(url, _0x554af2).then(function (_0x6eb811) {
            $(document.body).css({
              cursor: "default"
            });
            updateFileName(_0x492969, true, _0x46232c);
            $("#backupuserserr");
            if (_0x6eb811.Err.retoreusersok) {
              doSuccessMsg(_0x11840b, "<span data-localize=\"chats.urestored\">" + _0x6eb811.Err.retoreusersok + "</span>");
            } else {
              doErrorMsg(_0x11840b, _0x6eb811.Err.editgroup);
            }
          });
        });
        _0x492969.val("");
      }
    });
  });
  _0x5c0dd1.off("click").on("click", function (_0x3500fe) {
    _0x49ecc8.modal("hide");
    if (xConfig.id == null) {
      doErrorMsg(_0x11840b, "<span data-localize=\"chats.needlogin\">Please <a href=\"//rxat.ro/login\">log in</a> to use this page.</span>");
      $("body,html").animate({
        scrollTop: 0
      }, 800);
      return;
    }
    let _0x42d4ba = {};
    if (_0x34fad3.mains !== undefined) {
      _0x42d4ba = JSON.parse(_0x34fad3.mains);
    }
    let _0x4acbd8 = getPostParam();
    let _0x311408 = 0;
    for (let _0x6621b0 in permissions) {
      _0x311408 |= _0x6621b0;
    }
    _0x42d4ba[xConfig.id] = _0x311408;
    _0x11840b.addClass("d-none");
    _0x4acbd8.SetMains = JSON.stringify(_0x42d4ba);
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x4acbd8).then(function (_0x528c71) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x528c71.Err.mains) {
        xConfig.obj.Err.mainsList = undefined;
        doSuccessMsg(_0x11840b, "<span data-localize=\"chats.getmainok\">Your main owner chat rank has been restored</span>");
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      }
      if (_0x528c71.Err.Save) {
        doErrorMsg(_0x11840b, _0x528c71.Err.Save);
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      }
    });
  });
}
function doChangePassword() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  $("#pwmodal").modal();
  $("#changeyes").off("submit").submit(function (_0xa5fd45) {
    _0xa5fd45.preventDefault();
    let _0x3c147b = $("#changepasserr");
    let _0x570bdc = xConfig.obj;
    let _0x17d866 = $("#oldpassword").val();
    let _0x4e54c0 = $("#newpassword").val();
    let _0x93f2e = $("#confirmpassword").val();
    let _0x391285 = {};
    _0x3c147b.addClass("d-none");
    _0x391285.name = _0x570bdc.GroupName;
    _0x391285.password0 = filter(_0x17d866);
    _0x391285.password1 = filter(_0x4e54c0);
    _0x391285.password2 = filter(_0x93f2e);
    _0x391285.MainOwner = filter(getUserId());
    _0x391285.TokenKey = filter(_0x570bdc.TokenKey);
    _0x391285.NewPass = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, filter(_0x391285)).then(function (_0x7dac56) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x7dac56.Err) {
        if (_0x7dac56.Err.changepassok) {
          doSuccessMsg(_0x3c147b, "<div class=\"cplogout\"><span>" + _0x7dac56.Err.changepassok + "</span>&nbsp;<span><span data-localize\"chats.cplogout\">You will be logged out now</span>..</span></div>");
          setTimeout(() => {
            window.location.reload(true);
          }, 4000);
        } else {
          doErrorMsg(_0x3c147b, _0x7dac56.Err.changepass);
        }
      }
    });
  });
}
function doResetChat() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  $("#resetmodal").modal();
  $("#ResetChat").off("click").click(function (_0x1fa953) {
    $("#resetmodal").modal("hide");
    xConfig.obj;
    let _0x5bd0f2 = getPostParam();
    _0x5bd0f2.ResetChat = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x5bd0f2).then(function (_0x2bc000) {
      $(document.body).css({
        cursor: "default"
      });
      $("#resetchaterr");
      let _0x169d10 = $("#miscsuccess");
      if (_0x2bc000.Err.ChatPass) {
        doSuccessMsg(_0x169d10, "<span data-localize=\"chats.resetok\">Your chat has been reset</span>");
        xConfig.obj.TokenKey = refreshToken(_0x2bc000.Err.ChatPass);
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      } else if (_0x2bc000.Err.editgroup) {
        doErrorMsg(_0x169d10, "<span data-localize=\"buy.relogin\">Security check failed (3). Click <a href=http://rxat.ro/login>here to re-login to ixat chat</a></span>");
        $("body,html").animate({
          scrollTop: 0
        }, 800);
        localize(["buy"]);
      } else {
        doErrorMsg(_0x169d10, _0x2bc000.Err.ChatPass);
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      }
    });
  });
  localize(["buy"]);
}
function doDeleteGroup() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  $("#deletemodal").modal();
  $("#delyes").off("submit").submit(function (_0x4b5c77) {
    _0x4b5c77.preventDefault();
    allErrsOff();
    let _0x35e8ac = false;
    let _0x3876da = xConfig.obj;
    let _0x39871b = {};
    let _0x59d277 = _0x3876da.GroupName;
    let _0xf559d5 = $("#deletemodal #grpemail").val();
    let _0x596a0a = $("#deletemodal #grppassword").val();
    let _0x2788f4 = $("#confirmdelete").is(":checked");
    let _0x6c5e61 = $("#deletegrouperr");
    let _0x56e62e = $("#miscsuccess");
    _0x6c5e61.addClass("d-none");
    if (!_0x2788f4) {
      doErrorMsg(_0x6c5e61, {
        Err: {
          deletegroup: "<span data-localize=\"chats.notconf\">You must confirm that you want to proceed</span>"
        }
      }.Err.deletegroup);
      return false;
    }
    _0x6c5e61.addClass("d-none");
    _0x39871b.name = _0x59d277;
    _0x39871b.email = filter(_0xf559d5);
    _0x39871b.password = filter(_0x596a0a);
    _0x39871b.MainOwner = getUserId();
    _0x39871b.TokenKey = _0x3876da.TokenKey;
    _0x39871b.DeleteGroup = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, filter(_0x39871b)).then(function (_0x1a6e9c) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x1a6e9c.Err) {
        if (_0x1a6e9c.Err.deletegroupok) {
          _0x35e8ac = true;
          $("#deletemodal").modal("hide");
          $("#deletemodal").off("hidden.bs.modal").on("hidden.bs.modal", function () {
            if (_0x35e8ac) {
              doSuccessMsg(_0x56e62e, _0x1a6e9c.Err.deletegroupok);
              $(this).find("form").trigger("reset");
              $("body,html").animate({
                scrollTop: 0
              }, 800);
              _0x35e8ac = false;
            }
          });
        } else {
          doErrorMsg(_0x6c5e61, _0x1a6e9c.Err.deletegroup);
        }
      }
    });
  });
}
function DoTabs() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#tabs").removeClass("d-none");
  xConfig.obj;
  let _0x517069 = getPostParam();
  _0x517069.GetMedia = 1;
  $(document.body).css({
    cursor: "wait"
  });
  urlPost(url, filter(_0x517069)).then(function (_0x5dcb8b) {
    $(document.body).css({
      cursor: "default"
    });
    if (_0x5dcb8b.Err.Media) {
      return loadTab(_0x5dcb8b.Err.Media);
    } else {
      return $("#tabreturn").click();
    }
  });
}
function loadTab(_0x586af1) {
  if (_0x586af1.indexOf(";=") == -1) {
    return false;
  }
  let _0x5831bc = xConfig.obj;
  _0x586af1 = _0x586af1.split(";=");
  let _0x2e449c = $("#selecttab");
  let _0x290070 = $("#remtab");
  let _0x1bd6f9 = $("#removetab");
  let _0x40178d = $("#ordertab");
  $("#backuptab");
  let _0x519c21 = $("#newtab");
  let _0x11b1ea = {};
  let _0xaf0881 = 0;
  let _0x2e0042 = "button0";
  let _0x3076f1 = $("#tabname");
  let _0x3b2f1f = $("#summernote");
  let _0x2ed60d = $("#TabsSubmit");
  let _0x1051f9 = $("#BackupTab");
  let _0x3e682c = $("#tabbackupselect");
  let _0x5a356 = $("#RestoreTab");
  let _0x29b285 = $("#tabserr");
  let _0x37aea9 = $("#backuptabmodal");
  let _0x3a4c7b = $(".tabmodaldownl");
  let _0x414150 = $("#plusicon");
  for (let _0x4f7b41 in _0x586af1) {
    let _0x1771cc = parseInt(_0x4f7b41) + 1;
    if (_0x4f7b41 % 2 && _0x586af1[_0x4f7b41] !== "") {
      _0x11b1ea["button" + _0xaf0881] = {
        tabName: filter(_0x586af1[_0x4f7b41]),
        tabContent: _0x586af1[_0x1771cc]
      };
      _0xaf0881++;
    }
  }
  if (Object.keys(_0x11b1ea).length == 0) {
    setTab(_0x11b1ea, "selecttab");
    EnabledisableCleanFields(_0x2e449c, _0x3076f1, _0x3b2f1f, _0x1bd6f9, _0x40178d, _0x3a4c7b, true);
    _0x414150.addClass("blink");
  } else {
    setTab(_0x11b1ea, "selecttab");
    setDefaultTab(_0x11b1ea[_0x2e0042]);
  }
  if (Object.keys(_0x11b1ea).length == 6) {
    _0x414150.addClass("plusic");
  }
  _0x3076f1.off("keyup").on("keyup", function () {
    _0x11b1ea[_0x2e0042].tabName = filter($(this).val(), "");
    setTab(_0x11b1ea, "selecttab");
    _0x2e449c.val(_0x2e0042);
  });
  _0x3b2f1f.off("summernote.change").on("summernote.change", function (_0x585123) {
    let _0x50b7e2 = _0x2e449c.val();
    if (_0x11b1ea[_0x50b7e2] !== undefined) {
      _0x11b1ea[_0x50b7e2].tabContent = $("#summernote").summernote("code");
      setTab(_0x11b1ea);
    }
  });
  $(".note-codeview-keep").click(function () {
    if ($(this).hasClass("active")) {
      doErrorMsg(_0x29b285, "<span data-localize=\"chats.nosave\">Note: You are in Code View mode. Editing is still possible, but to save, you must turn it off first.</span>");
      $("#TabsSubmit").addClass("d-none");
    } else {
      _0x29b285.addClass("d-none");
      $("#TabsSubmit").removeClass("d-none");
    }
  });
  $(".note-editable").on("paste", function (_0x3f468d) {
    _0x3f468d.preventDefault();
    var _0x3a6e2c = "";
    if (_0x3f468d.clipboardData || _0x3f468d.originalEvent.clipboardData) {
      _0x3a6e2c = (_0x3f468d.originalEvent || _0x3f468d).clipboardData.getData("text/plain");
    } else if (window.clipboardData) {
      _0x3a6e2c = window.clipboardData.getData("Text");
    }
    _0x3a6e2c = _0x3a6e2c.replace(/<[^>]*>?/gm, "");
    if (document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, _0x3a6e2c);
    } else {
      document.execCommand("paste", false, _0x3a6e2c);
    }
    $(this).html($(this).html().replace(/<div>/gi, "<br>").replace(/<\/div>/gi, ""));
  });
  _0x519c21.off("click").on("click", function () {
    let _0x4fff98 = $("#selecttab option");
    let _0x13c05f = _0x4fff98.last();
    _0x13c05f = _0x13c05f.length ? _0x13c05f.data().id : null;
    let _0x4ded8d = _0x13c05f == null ? 0 : _0x13c05f + 1;
    if (_0x4fff98.length < 6) {
      _0x11b1ea["button" + _0x4ded8d] = {
        tabName: "New tab",
        tabContent: "\n"
      };
      EnabledisableCleanFields(_0x2e449c, _0x3076f1, _0x3b2f1f, _0x1bd6f9, _0x40178d, _0x3a4c7b, false);
      setTab(_0x11b1ea, "selecttab");
      setDefaultTab(_0x11b1ea["button" + _0x4ded8d]);
      _0x2e449c.val("button" + _0x4ded8d);
      _0x2e0042 = _0x2e449c.val();
      doSuccessMsg(_0x29b285, "<span data-localize=\"chats.tabadded\">New tab has been added</span> <span class=\"alerttab\">(<span data-localize=\"chats.saveneeded\">changes only take effect after clicking the save button</span>)</span>");
      if (Object.keys(_0x11b1ea).length == 6) {
        _0x414150.addClass("plusic");
      }
    } else {
      _0x414150.addClass("plusic");
      doErrorMsg(_0x29b285, "<span data-localize=\"chats.tabsnomore\">You cannot add more than 6 tabs</span>");
    }
  });
  _0x1051f9.off("click").on("click", function (_0x27cf07) {
    _0x37aea9.modal("hide");
    let _0x494c46 = [];
    _0x494c46[0] = _0x586af1[0];
    for (let _0x3daba5 in _0x11b1ea) {
      if (_0x11b1ea[_0x3daba5] && _0x11b1ea[_0x3daba5].deleted == null) {
        _0x494c46.push(_0x11b1ea[_0x3daba5].tabName);
        _0x494c46.push(_0x11b1ea[_0x3daba5].tabContent);
      }
    }
    doSuccessMsg(_0x29b285, "<span data-localize=\"chats.downlsuc\">Backup file has been downloaded</span>");
    return doDownload(_0x494c46.join(";="), _0x5831bc.GroupName + "_Tabs.xatg");
  });
  _0x3e682c.off("change").on("change", function (_0x49b957) {
    let _0x1d2f56 = $(this);
    updateFileName(_0x1d2f56);
    _0x5a356.removeClass("d-none");
    _0x5a356.off("click").on("click", function () {
      let _0x49e5c5 = _0x49b957.target.files;
      if (_0x49e5c5.length) {
        _0x49e5c5 = _0x49e5c5[0];
        uploadFile(_0x49e5c5, function (_0x290de4) {
          updateFileName(_0x1d2f56, true);
          _0x5a356.addClass("d-none");
          _0x37aea9.modal("hide");
          doSuccessMsg(_0x29b285, "<span data-localize=\"chats.tabsimpsuc\">Tabs have been imported</span> <span class=\"alerttab\">(<span data-localize=\"chats.saveneeded\">changes only take effect after clicking the save button</span>)</span>");
          EnabledisableCleanFields(_0x2e449c, _0x3076f1, _0x3b2f1f, _0x1bd6f9, _0x40178d, _0x3a4c7b, false);
          return loadTab(_0x290de4);
        });
      }
      _0x3e682c.val("");
    });
  });
  _0x2ed60d.off("click").on("click", function (_0x3ebe8a) {
    _0x3ebe8a.preventDefault();
    let _0x8955b = getPostParam();
    let _0x34515a = $("#tabserr");
    for (let _0x239d17 in _0x11b1ea) {
      if (_0x11b1ea[_0x239d17].deleted !== undefined) {
        _0x11b1ea[_0x239d17].tabName = "";
        _0x11b1ea[_0x239d17].tabContent = "";
      }
      if (_0x11b1ea[_0x239d17].tabContent.includes("&lt;embed src=")) {
        _0x11b1ea[_0x239d17].tabContent = _0x11b1ea[_0x239d17].tabContent.replace(/&lt;embed src=/gi, "notanymore");
      }
      _0x8955b[_0x239d17] = filter(_0x11b1ea[_0x239d17].tabName);
      _0x8955b[_0x239d17.replace(/button/, "media")] = _0x11b1ea[_0x239d17].tabContent.replace(/script/gi, "").replace(/&amp;/g, "&");
    }
    for (let _0x4edc6b in _0x5831bc.Err) {
      if (["Powers", "mains", "mainsList"].indexOf(_0x4edc6b) == -1) {
        _0x8955b[_0x4edc6b] = _0x5831bc.Err[_0x4edc6b];
      }
    }
    if (Object.keys(_0x11b1ea).length == 0) {
      doErrorMsg(_0x34515a, "<span data-localize=\"chats.tabscant\">You cannot save without any tabs</span>");
      $("body,html").animate({
        scrollTop: 0
      }, 800);
    }
    _0x29b285.addClass("d-none");
    _0x8955b.submit1 = 1;
    _0x8955b.SetTabs = Object.keys(_0x11b1ea).length;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x8955b).then(function (_0x118130) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x118130.Err.Save) {
        doErrorMsg(_0x34515a, _0x118130.Err.Save);
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      }
      if (_0x118130.Err.SaveTabsOk) {
        doSuccessMsg(_0x34515a, "<span data-localize=\"chats.tabsaved\">Your tabs have been updated</span>");
        $("body,html").animate({
          scrollTop: 0
        }, 800);
      }
      if (_0x118130.Err.editgroup) {
        doLogout(_0x118130.Err.editgroup);
      }
    });
  });
  _0x2e449c.on("change", function (_0x48556c) {
    _0x2e0042 = this.value;
    setDefaultTab(_0x11b1ea[_0x2e0042]);
  });
  _0x290070.off("click").on("click", function (_0x7223fd) {
    _0x7223fd.preventDefault();
    $("#removetabmodal").modal("hide");
    if (_0x11b1ea[_0x2e0042] !== undefined) {
      _0x11b1ea[_0x2e0042].deleted = true;
      setTab(_0x11b1ea, "selecttab");
      _0x2e0042 = _0x2e449c.val();
      setDefaultTab(_0x11b1ea[_0x2e0042]);
      _0x414150.removeClass("plusic");
      doSuccessMsg(_0x29b285, "<span data-localize=\"chats.tabsgone\">Tab has been removed</span> <span class=\"alerttab\">(<span data-localize=\"chats.saveneeded\">changes only take effect after clicking the save button</span>)</span>");
      if ($("#selecttab option").length == 0) {
        EnabledisableCleanFields(_0x2e449c, _0x3076f1, _0x3b2f1f, _0x1bd6f9, _0x40178d, _0x3a4c7b, true);
        _0x414150.addClass("blink");
      }
    } else {
      EnabledisableCleanFields(_0x2e449c, _0x3076f1, _0x3b2f1f, _0x1bd6f9, _0x40178d, _0x3a4c7b, true);
    }
  });
  _0x40178d.off("click").on("click", function (_0x20d4fa) {
    _0x20d4fa.preventDefault();
    setTab(_0x11b1ea, "tabposition");
    $("button[data-option]").off("click").on("click", function () {
      var _0x3253a4 = $("#tabposition option:selected");
      var _0x2e56f7 = $(this).data("option");
      if (_0x3253a4.length && _0x2e56f7.length) {
        let _0x22d5a5 = _0x3253a4.first().prev();
        let _0x56550b = _0x22d5a5.val();
        let _0x263952 = _0x3253a4.first().next();
        let _0x3654dc = _0x263952.val();
        let _0xc4e30c = _0x3253a4.val();
        let _0x490151 = _0x11b1ea[_0x56550b];
        let _0x1922a9 = _0x11b1ea[_0xc4e30c];
        let _0x449cfe = _0x11b1ea[_0x3654dc];
        if (_0x2e56f7 == "up") {
          if (_0x56550b !== undefined) {
            _0x11b1ea[_0x56550b] = _0x1922a9;
            _0x11b1ea[_0xc4e30c] = _0x490151;
            _0x3253a4.val(_0x56550b);
            _0x22d5a5.val(_0xc4e30c);
            _0x2e449c.val(_0x56550b);
            _0x3253a4.first().prev().before(_0x3253a4);
          }
        } else if (_0x3654dc !== undefined) {
          _0x11b1ea[_0x3654dc] = _0x1922a9;
          _0x11b1ea[_0xc4e30c] = _0x449cfe;
          _0x3253a4.val(_0x3654dc);
          _0x263952.val(_0xc4e30c);
          _0x2e449c.val(_0x3654dc);
          _0x3253a4.last().next().after(_0x3253a4);
        }
        setTab(_0x11b1ea, "selecttab");
        setDefaultTab(_0x11b1ea[_0x2e449c.val()]);
      }
    });
  });
}
function EnabledisableCleanFields(_0x1684bb, _0x55a7c0, _0x865ffb, _0x44a4de, _0xbcae8f, _0x5f2655, _0x21dfe3) {
  if (function (_0x4a5478, _0x46809e) {
    return _0x4a5478 || _0x46809e;
  }(!_0x55a7c0, !_0x865ffb)) {
    return false;
  }
  let _0x11d5a8 = $("#plusicon");
  if (_0x21dfe3) {
    _0x55a7c0.val("");
    _0x55a7c0.prop("disabled", true);
    _0x1684bb.prop("disabled", true);
    _0x865ffb.summernote("code", "");
    _0x865ffb.next().find(".note-editable").attr("contenteditable", false);
    _0x44a4de.css("display", "none");
    _0xbcae8f.css("display", "none");
    _0x5f2655.css("display", "none");
  } else {
    _0x55a7c0.removeAttr("disabled");
    _0x1684bb.removeAttr("disabled");
    _0x865ffb.next().find(".note-editable").attr("contenteditable", true);
    _0x44a4de.css("display", "");
    _0xbcae8f.css("display", "");
    _0x5f2655.css("display", "");
    _0x11d5a8.removeClass("blink");
  }
}
function setTab(_0x27c759, _0x57b9ac) {
  if (!_0x27c759) {
    return false;
  }
  let _0x16c430 = "";
  let _0x31f612 = $("#" + _0x57b9ac);
  for (let _0x15996d in _0x27c759) {
    if (_0x27c759[_0x15996d] !== undefined && _0x27c759[_0x15996d].deleted == null) {
      _0x16c430 += "<option value=\"" + _0x15996d + "\" data-id=\"" + _0x15996d.replace(/button/, "") + "\">" + _0x27c759[_0x15996d].tabName + "</option>";
    }
  }
  _0x31f612.html(_0x16c430);
}
function setDefaultTab(_0x21189d) {
  if (!_0x21189d) {
    return false;
  }
  let _0x95d14f = $("#tabname");
  let _0x596985 = $(".note-editable");
  _0x95d14f.val(_0x21189d.tabName);
  _0x596985.html(_0x21189d.tabContent);
}
function DoSettings() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#settings").removeClass("d-none");
  handleSettingsTab();
}
function doActivateGroup(_0x566a01, _0x2dc5df) {
  if (function (_0x10b25a, _0x207e54) {
    return _0x10b25a || _0x207e54;
  }(!_0x566a01, !_0x2dc5df)) {
    return false;
  }
  let _0x5a6531 = {};
  var _0x4fd909 = getTodo();
  _0x4fd909 &&= JSON.parse(_0x4fd909);
  _0x5a6531.gn = _0x2dc5df;
  _0x5a6531.id = _0x566a01;
  _0x5a6531.MainOwner = getUserId();
  _0x5a6531.DeviceId = _0x4fd909 && _0x4fd909.DeviceId || "";
  _0x5a6531.PassHash = _0x4fd909 && _0x4fd909.PassHash || "";
  _0x5a6531.activate = 1;
  $("#creategrouphtml");
  var _0x22d747 = "<p>";
  _0x22d747 += "<span data-localize=\"chats.groupthanks2\">Thank you. Your group has been activated.</span>";
  _0x22d747 += " <span data.localize=chats.seemail>See email for details.</span>";
  _0x22d747 += "</p>";
  _0x22d747 += "<p class=\"mb-0\">";
  _0x22d747 += "<span data-localize=\"chats.yourgroup\">The address of your group is</span>:";
  _0x22d747 += " <a class=\"nodeco\" href=https://rxat.ro/" + _0x2dc5df + ">https://rxat.ro/" + _0x2dc5df + "</a>";
  _0x22d747 += "</p>";
  $(document.body).css({
    cursor: "wait"
  });
  urlPost("https://rxat.ro/web_gear/chat/activategroup2.php", filter(_0x5a6531)).then(function (_0x73c969) {
    $(document.body).css({
      cursor: "default"
    });
    let _0x347e63 = $("#creategrouphtml");
    if (_0x73c969.Err.activategroupfail) {
      doErrorMsg(_0x347e63, _0x73c969.Err.activategroupfail, false);
    } else {
      doSuccessMsg(_0x347e63, _0x22d747, false);
    }
  });
}
function doConfirmDelete(_0x11d6d5, _0x38402d) {
  if (function (_0x4bf625, _0x2295ff) {
    return _0x4bf625 || _0x2295ff;
  }(!_0x11d6d5, !_0x38402d)) {
    return false;
  }
  let _0x2dd936 = $("#creategrouphtml");
  let _0x39ba9b = {
    name: _0x11d6d5,
    delgrp: _0x38402d
  };
  _0x39ba9b.MainOwner = getUserId();
  _0x39ba9b.DeleteGroup = 1;
  $(document.body).css({
    cursor: "wait"
  });
  urlPost("https://rxat.ro/web_gear/chat/editgroup3.php", filter(_0x39ba9b)).then(function (_0x67a104) {
    $(document.body).css({
      cursor: "default"
    });
    if (_0x67a104.Err.deletegroupok) {
      doSuccessMsg(_0x2dd936, "<span data-localize=\"chats.deldone\">Group information has been deleted</span>.", false);
    } else {
      doErrorMsg(_0x2dd936, "<span data-localize=\"chats.delalr\">Group information has already been deleted</span>.", false);
    }
  });
}
function DoGroupPowers() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#grouppowers").removeClass("d-none");
  let _0x548518 = $("#powfilter");
  let _0x3a4860 = $("#nopowers");
  let _0x90ceaa = $("#gpSearch");
  let _0x3ae5a6 = $("#PowersSubmit");
  let _0x2d406c = xConfig.obj;
  let _0x3c05cc = getPostParam();
  _0x3c05cc.GetPowers = 1;
  _0x3c05cc.Definitions = 1;
  let _0x657175 = null;
  if (document.querySelector("#powfilter")) {
    _0x657175 = new SlimSelect({
      select: "#powfilter",
      showSearch: false,
      closeOnSelect: true,
      placeholder: " "
    });
  }
  _0x3a4860.addClass("d-none");
  _0x90ceaa.val("");
  if (_0x657175) {
    _0x657175.set("asg_una");
  }
  _0x3ae5a6.removeClass("d-none");
  $(document.body).css({
    cursor: "wait"
  });
  urlPost(url, _0x3c05cc).then(function (_0x5468a8) {
    $(document.body).css({
      cursor: "default"
    });
    if (_0x5468a8.Err.Powers) {
      let _0x513430;
      let _0x43a8b9 = $("#groups_powers");
      let _0x5cf8d1 = _0x5468a8.Err.Powers.Powers;
      let _0x5975dc = _0x5468a8.Err.Powers.GroupPowers;
      let _0x204e3d = _0x5468a8.Err.Powers.Definitions;
      let _0x177f1d = getUnassignedPowers(_0x5cf8d1, _0x5975dc);
      let _0x2c60ff = $("#gpexport");
      $("#gpimport");
      let _0x142971 = $("#importgpfile");
      let _0x7977dc = $("#gp_list_import");
      let _0x4203a1 = $("#gp_list");
      let _0x3d9ffd = $("#importgpok");
      let _0x1efd63 = $("#gpexperr");
      let _0x1d8bf6 = $("#gpsuccess");
      let _0x1e5852 = handlePowers(Object.assign({}, _0x5cf8d1, _0x177f1d), _0x5975dc, _0x204e3d);
      _0x43a8b9.html(_0x1e5852);
      localize(["chats"]);
      initPopover();
      updateCheckBoxState();
      updateProgress(getTotalAssigned(_0x5cf8d1), Object.keys(_0x5975dc).length);
      document.querySelectorAll("#gp_modalB").forEach(_0x32fce8 => {
        _0x32fce8.addEventListener("click", _0x4db0b2 => {
          _0x4db0b2.preventDefault();
          var _0x2fbc23 = _0x4db0b2.target.parentNode.dataset.id;
          loadModal(_0x2fbc23 = _0x2fbc23 == null ? _0x4db0b2.srcElement.dataset.id : _0x2fbc23, _0x5975dc[_0x2fbc23].s);
        });
      });
      let _0x544e2f = document.querySelector("#gp_linkmodal");
      if (_0x544e2f) {
        _0x544e2f.addEventListener("click", openLinkModal);
      }
      let _0x7e1ab8 = document.querySelector("#gp_banrulesmodal");
      if (_0x7e1ab8 != null) {
        _0x7e1ab8.addEventListener("click", openBanRulesModal);
      }
      let _0x43092e = document.querySelector("#gp_whitelistmodal");
      if (_0x43092e != null) {
        _0x43092e.addEventListener("click", openWhitelistModal);
      }
      _0x2c60ff.off("click").on("click", function (_0x3e4884) {
        _0x3e4884.preventDefault();
        if (getTotalAssigned(_0x5cf8d1) == 0) {
          doErrorMsg(_0x1d8bf6, "<span data-localize=\"chats.gpexpassig\">You must have at least one assigned power in order to export</span>");
          return false;
        }
        if (_0x513430 = buildGpList(_0x5cf8d1, _0x5975dc, true)) {
          $("#exportmodal").modal();
          let _0x42d074 = "<div class=\"row\">";
          _0x42d074 += _0x513430;
          _0x42d074 += "</div>";
          _0x4203a1.html(_0x42d074);
          let _0x4a3ae9 = $("#exportgpok");
          let _0x10a07e = $("#exportmodal");
          _0x4a3ae9.off("click").on("click", function (_0x202621) {
            _0x202621.preventDefault();
            let _0x43af1b = $("#gp_list input[type=\"checkbox\"]:checked");
            if (_0x43af1b.length == 0) {
              doErrorMsg(_0x1efd63, "<span data-localize=\"chats.gpexpsel\">You must select at least one power in order to export</span>");
              return false;
            }
            let _0x18cc81 = {};
            for (let _0x54dd25 in _0x43af1b) {
              let _0x58fce0 = _0x43af1b[_0x54dd25].id;
              let _0xf51529 = document.getElementById("gi_" + _0x58fce0);
              if (_0xf51529 !== null && _0xf51529.value) {
                _0x18cc81[_0x58fce0] = _0xf51529.value;
              }
            }
            doDownload(encodeURIComponent(JSON.stringify(_0x18cc81)), [_0x2d406c.GroupName, "powers"].join("_") + ".xatp");
            _0x10a07e.modal("hide");
            doSuccessMsg(_0x1d8bf6, "<span data-localize=\"chats.gpexpsuc\">Selected group powers have been exported</span>");
          });
        } else {
          doErrorMsg(_0x1d8bf6, "<span data-localize=\"chats.gpexpassedit\">You must have edited at least one assigned group power in order to export</span>");
        }
      });
      $("#exportmodal, #importmodal").off("hide.bs.modal").on("hide.bs.modal", function (_0x240d3e) {
        let _0x2b6740 = $("#xatpselect");
        _0x7977dc.html("");
        _0x4203a1.html("");
        _0x3d9ffd.addClass("d-none");
        _0x2b6740.removeClass("xpspace");
      });
      _0x142971.off("change").on("change", function (_0x45368a) {
        let _0x5a175e = $(this);
        updateFileName(_0x5a175e);
        let _0x56a7cd = _0x45368a.target.files;
        let _0x33c730 = $("#gpimperr");
        _0x7977dc.html("");
        if (_0x56a7cd) {
          uploadFile(_0x56a7cd[0], function (_0x500c6f) {
            try {
              proceedImport(_0x500c6f = JSON.parse(_0x500c6f), _0x5975dc, _0x5a175e);
            } catch (_0x3c01d1) {
              doErrorMsg(_0x33c730, "<span data-localize=\"chats.gpimpemp\">Selected file is empty or invalid</span>");
            }
          });
        }
        $(this).val("");
      });
      $("#PowersSubmit").off("click").click(function (_0x4633ba) {
        _0x4633ba.preventDefault();
        if (typeof _0x5cf8d1 == null) {
          return false;
        }
        for (let _0x14fa80 in _0x5cf8d1) {
          let _0x39246d = _0x5cf8d1[_0x14fa80].split("|");
          let _0x12e8a0 = _0x204e3d[_0x14fa80];
          let _0x10d486 = $("#gp_" + _0x14fa80).is(":checked");
          let _0x750cf4 = $("#gi_" + _0x14fa80).val();
          _0x39246d[1] = _0x10d486 ? 1 : 0;
          if ([206, 220].indexOf(parseInt(_0x14fa80)) == -1) {
            if (_0x12e8a0 && _0x12e8a0[2]) {
              _0x39246d[2] = _0x12e8a0[2] && _0x750cf4 ? _0x750cf4.replace(new RegExp(_0x12e8a0[2], "gi"), "") : _0x750cf4;
              if (_0x14fa80 == 106 && _0x39246d[2]) {
                _0x39246d[2] = _0x39246d[2].replace(new RegExp("[<>=;]", "gi"), "");
                if (!_0x39246d[2].includes("#")) {
                  _0x39246d[2] = "#" + _0x39246d[2];
                }
              }
            }
          } else {
            _0x39246d[2] = "";
          }
          _0x5cf8d1[_0x14fa80] = _0x39246d.join("|");
        }
        let _0x29322e = getPostParam();
        _0x1d8bf6.addClass("d-none");
        _0x29322e.SetPowers = JSON.stringify(_0x5cf8d1);
        _0x29322e.submit1 = 1;
        $(document.body).css({
          cursor: "wait"
        });
        urlPost(url, _0x29322e).then(function (_0x52afa6) {
          $(document.body).css({
            cursor: "default"
          });
          if (_0x52afa6.Err.Save) {
            doErrorMsg(_0x1d8bf6, _0x52afa6.Err.Save);
          }
          if (_0x52afa6.Err.SetPowers) {
            xConfig.obj.arrPow = filterPowers(_0x52afa6.Err);
            doSuccessMsg(_0x1d8bf6, "<span data-localize=\"chats.grpsaved\">Your groups powers have been updated</span>");
            refreshChat();
          }
          if (_0x52afa6.Err.editgroup) {
            doLogout(_0x52afa6.Err.editgroup);
          }
          document.body.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      let _0x48c7ea = $("#checkalldiv");
      if (_0x90ceaa) {
        _0x90ceaa.on("keyup", _0x1e9f65 => {
          let _0x110b26 = _0x1e9f65.target.value.toLowerCase();
          return getTotalPowFilter(_0x548518.val(), _0x110b26);
        });
      }
      if (_0x548518) {
        _0x548518.on("change", function (_0x5b5246) {
          let _0x2bcd69 = _0x5b5246.target.value;
          _0x90ceaa.val("");
          _0x3a4860.addClass("d-none");
          _0x48c7ea.css("display", "");
          _0x3ae5a6.removeClass("d-none");
          let _0x30cdf8 = 0;
          let _0x31b9b8 = 0;
          let _0x1ed72f = 0;
          document.querySelectorAll(".dataSearch").forEach(_0x3aff34 => {
            let _0x41541a = _0x3aff34.dataset.notassigned;
            switch (_0x2bcd69) {
              case "asg_una":
                _0x30cdf8++;
                _0x3aff34.classList.remove("d-none");
                _0x48c7ea.css("display", "");
                break;
              case "asg":
                _0x48c7ea.css("display", "");
                if (_0x41541a == "true") {
                  _0x3aff34.classList.add("d-none");
                  _0x31b9b8++;
                } else {
                  _0x3aff34.classList.remove("d-none");
                  _0x30cdf8++;
                }
                break;
              case "una":
                _0x48c7ea.css("display", "none");
                if (_0x41541a == "false") {
                  _0x3aff34.classList.add("d-none");
                  _0x31b9b8++;
                } else {
                  _0x3aff34.classList.remove("d-none");
                  _0x30cdf8++;
                }
            }
            _0x1ed72f++;
          });
          if (_0x30cdf8 == 0) {
            _0x3a4860.removeClass("d-none");
            _0x48c7ea.css("display", "none");
            _0x3ae5a6.addClass("d-none");
          }
          if (_0x31b9b8 + 1 == _0x1ed72f) {
            _0x48c7ea.css("display", "none");
          }
          updateCheckAll();
        });
      }
    } else {
      $("#tabreturn").click();
    }
  });
}
function updateProgress(_0x56c2ac, _0x556204) {
  let _0x37f328 = $("#progress");
  let _0x2e3c60 = Math.round(_0x56c2ac / _0x556204 * 100);
  _0x37f328[0].style.cssText = "width: " + (_0x56c2ac == 0 ? _0x2e3c60 : _0x2e3c60 + 2) + "%";
  _0x37f328.html(_0x56c2ac + "/" + _0x556204);
  _0x37f328.attr("aria-valuenow", _0x2e3c60);
  if (_0x56c2ac > 0) {
    _0x37f328.removeClass("progcol");
  } else {
    _0x37f328.addClass("progcol");
  }
  if (_0x56c2ac > 10 || _0x56c2ac == 0) {
    _0x37f328.removeClass("progtest");
  } else {
    _0x37f328.addClass("progtest");
  }
}
function proceedImport(_0x33108c, _0x3a762a, _0x3801ae) {
  if (!_0x33108c) {
    return false;
  }
  let _0x3cd5ce;
  let _0x505afc = $("#gp_list_import");
  let _0x4c0391 = $("#importgpok");
  let _0x150bac = $("#gpsuccess");
  let _0x1fb918 = $("#importmodal");
  let _0x1c037f = $("#gpimperr");
  if (_0x3cd5ce = buildGpList(_0x33108c, _0x3a762a, false)) {
    let _0x10b35c = "<div class=\"row\">";
    _0x10b35c += _0x3cd5ce;
    _0x10b35c += "</div>";
    _0x505afc.html(_0x10b35c);
    _0x4c0391.removeClass("d-none");
    _0x4c0391.off("click").on("click", function (_0x55a936) {
      _0x55a936.preventDefault();
      updateFileName(_0x3801ae, true);
      let _0xfd6066 = $("#gp_list_import input[type=\"checkbox\"]:checked");
      if (_0xfd6066.length == 0) {
        doErrorMsg(_0x1c037f, "<span data-localize=\"chats.gpimpsel\">You must select at least one power in order to import</span>");
        return false;
      }
      for (let _0x3db550 in _0xfd6066) {
        let _0x35b480 = _0xfd6066[_0x3db550].id;
        let _0x42dfb1 = document.getElementById("gi_" + _0x35b480);
        if (_0x35b480 == 206) {
          saveLang(_0x33108c[206]);
        } else if (_0x42dfb1) {
          _0x42dfb1.value = _0x33108c[_0x35b480];
        }
      }
      _0x1fb918.modal("hide");
      doSuccessMsg(_0x150bac, "<span data-localize=\"chats.gpimpsuc\">Selected group powers have been imported</span>");
    });
  } else {
    _0x1fb918.modal("hide");
    doErrorMsg(_0x150bac, "<span data-localize=\"chats.gpimpassig\">Your group must have assigned at least one power that is included in your import file</span>");
  }
}
function buildGpList(_0x2521a7, _0x13df5f, _0x14d93d) {
  if (Object.keys(_0x2521a7).length == 0) {
    return false;
  }
  let _0x301a36 = "";
  for (let _0x297b59 in _0x2521a7) {
    if (_0x13df5f[_0x297b59] !== undefined) {
      let _0x2da6b0 = document.getElementById("gi_" + _0x297b59);
      let _0x5cbe12 = $("#xatpselect");
      if (_0x2da6b0 !== null) {
        if (_0x14d93d && _0x2da6b0.value.length == 0) {
          continue;
        }
        _0x5cbe12.addClass("xpspace");
        _0x301a36 += "<div class=\"col-md-4 rngembedpos\">";
        _0x301a36 += "<div class=\"custom-control custom-checkbox\">";
        _0x301a36 += "<input type=\"checkbox\" class=\"custom-control-input\" id=\"" + _0x297b59 + "\" name=\"" + _0x297b59 + "\" checked=\"\">";
        _0x301a36 += "<label class=\"custom-control-label gpcheckafter\" for=\"" + _0x297b59 + "\">";
        _0x301a36 += _0x13df5f[_0x297b59].s;
        _0x301a36 += "</label></div></div>";
      }
    }
  }
  return _0x301a36;
}
function getTotalPowFilter(_0x21bc13, _0x4e93c5) {
  let _0x424ea0 = 0;
  let _0x2a0f7e = 0;
  let _0x26c678 = 0;
  let _0x2bcb01 = 0;
  let _0x5e225b = {};
  let _0x35e662 = $("#nopowers");
  let _0xdecaab = $("#checkalldiv");
  let _0x287119 = $("#PowersSubmit");
  document.querySelectorAll(".dataSearch").forEach(_0x1a690e => {
    let _0x278f04 = _0x1a690e.dataset.notassigned;
    let _0x360c7b = _0x1a690e.dataset.name;
    let _0x42b832 = _0x1a690e.dataset.id;
    switch (_0x21bc13) {
      case "asg_una":
        _0x5e225b[_0x42b832] = [_0x360c7b, _0x278f04];
        _0x424ea0++;
        break;
      case "asg":
        if (_0x278f04 == "false") {
          _0x5e225b[_0x42b832] = [_0x360c7b, _0x278f04];
          _0x424ea0++;
        }
        break;
      case "una":
        if (_0x278f04 == "true") {
          _0x5e225b[_0x42b832] = [_0x360c7b, _0x278f04];
          _0x424ea0++;
        }
    }
  });
  if (Object.keys(_0x5e225b).length > 0) {
    for (let _0x4bf432 in _0x5e225b) {
      if (_0x4bf432.substr(0, _0x4e93c5.length) == _0x4e93c5 || _0x5e225b[_0x4bf432][0].substr(0, _0x4e93c5.length) == _0x4e93c5) {
        $("[data-id=\"" + _0x4bf432 + "\"]").removeClass("d-none");
        if (_0x2a0f7e >= 0) {
          _0x2a0f7e--;
        }
        if (_0x5e225b[_0x4bf432][1] == "true") {
          _0x26c678++;
        } else {
          _0x2bcb01++;
        }
      } else {
        _0x2a0f7e++;
        $("[data-id=\"" + _0x4bf432 + "\"]").addClass("d-none");
      }
      if (_0x2a0f7e == _0x424ea0) {
        _0x35e662.removeClass("d-none");
        _0xdecaab.css("display", "none");
        _0x287119.addClass("d-none");
      } else {
        _0x35e662.addClass("d-none");
        _0xdecaab.css("display", "");
        _0x287119.removeClass("d-none");
      }
    }
    if (_0x2a0f7e + 2 == _0x424ea0) {
      _0xdecaab.css("display", "none");
    }
    if (_0x26c678 > 0 && _0x2bcb01 == 0) {
      _0xdecaab.css("display", "none");
    }
  }
  updateCheckAll();
  return true;
}
function getUnassignedPowers(_0x407cf2, _0x5011ba) {
  let _0x4c289f = {};
  for (let _0x24bf41 in _0x5011ba) {
    if (_0x407cf2 === undefined || _0x407cf2[_0x24bf41] == null) {
      _0x4c289f[_0x24bf41] = _0x5011ba[_0x24bf41];
      _0x4c289f[_0x24bf41].unassigned = true;
    }
  }
  return _0x4c289f;
}
function getPowerBase(_0x3ec5d3, _0x391c0b, _0xa55d12, _0x21d0d8, _0x2344ec, _0x38fb61) {
  let _0x3dc67a = "";
  _0x3dc67a += "<div class=\"row form-group customBg " + (_0x38fb61 ? "unassigrow " : "") + "dataSearch\" data-id=\"" + _0x391c0b + "\" data-name=\"" + _0x3ec5d3 + "\" data-notassigned=\"" + _0x38fb61 + "\">";
  _0x3dc67a += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-2\">";
  _0x3dc67a += "<div class=\"custom-control custom-checkbox\">";
  _0x3dc67a += "<input type=\"checkbox\" class=\"custom-control-input\" id=\"gp_" + _0x391c0b + "\" name=\"gp_" + _0x391c0b + "\" " + (_0x38fb61 ? _0xa55d12 : function (_0x1ded1b, _0xaf702e) {
    return _0x1ded1b || _0xaf702e;
  }(_0xa55d12, _0x21d0d8)) + ">";
  _0x3dc67a += "<label class=\"custom-control-label " + (_0x38fb61 ? "noallow " : "") + "gpcheckafter\" for=\"gp_" + _0x391c0b + "\">";
  _0x3dc67a += "&nbsp;<img class=\"gpimage " + (_0x391c0b == 478 ? "gpsuperblastkick" : "") + (_0x391c0b == 200 ? "gpspacewar" : "") + " \" src=\"https://rxat.ro/images/smw/" + _0x3ec5d3 + ".png\" />";
  _0x3dc67a += "<span class=\"font-weight-bold" + (_0x3ec5d3.length >= 12 ? " longpow" : "") + " \">" + _0x3ec5d3 + " </span>";
  _0x3dc67a += "</label></div>";
  _0x3dc67a += "</div>";
  return _0x3dc67a;
}
if (document.querySelector("#selecttab")) {
  new SlimSelect({
    select: "#selecttab",
    showSearch: false,
    closeOnSelect: true,
    placeholder: " "
  });
}
let banRulesId = 630;
let whitelistId = 634;
function handlePowers(_0x3475f8, _0x494da6, _0x1fd0f1) {
  let _0x3fccc3 = "";
  for (let _0x50f1bc in _0x3475f8) {
    if (typeof _0x3475f8[_0x50f1bc] == "object") {
      let _0x45ed0b = _0x494da6[_0x50f1bc];
      let _0x12b374 = "disabled";
      let _0x3c0612 = _0x45ed0b ? _0x45ed0b.s : _0x50f1bc;
      _0x3fccc3 += getPowerBase(_0x3c0612, _0x50f1bc, _0x12b374, "", _0x45ed0b, true);
      _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8\">";
      _0x3fccc3 += "<span class=\"align-middle\"> " + (_0x45ed0b ? _0x45ed0b.d1 + " (<a target=\"_blank\" class=\"nodeco\" href=\"https://util.rxat.ro/wiki/" + _0x3c0612 + "\">wiki</a>)" : "");
      _0x3fccc3 += "</span></div>";
      _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-2\">";
      _0x3fccc3 += "<a href=\"https://rxat.ro/powers\" target=\"_blank\" class=\"btn btn-outline-primary btn-sm py-0 getpowmid\"><span data-localize=\"chats.getpwr\">Get Power</span></a>";
      _0x3fccc3 += "</div>";
      _0x3fccc3 += "</div>";
    } else {
      let _0x4576ec = _0x3475f8[_0x50f1bc].split("|");
      let _0x45e8c6 = _0x1fd0f1[_0x50f1bc] || [];
      let _0xff346c = _0x494da6[_0x50f1bc];
      let _0x2542c3 = _0x4576ec[0].length == 0 ? "disabled" : "";
      let _0x275599 = _0x4576ec[1] ? _0x4576ec[1] == "0" ? "" : "checked" : "";
      let _0x1b1cbf = _0xff346c ? _0xff346c.s : _0x50f1bc;
      _0x3fccc3 += getPowerBase(_0x1b1cbf, _0x50f1bc, _0x2542c3, _0x275599, _0xff346c, _0x4576ec[0].length == 0);
      _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-" + (_0x2542c3 != "" ? 8 : 3) + "\">";
      _0x3fccc3 += "<span class=\"align-middle\"> " + (_0xff346c ? _0xff346c.d1 + " (<a target=\"_blank\" class=\"nodeco\" href=\"https://util.rxat.ro/wiki/" + _0x1b1cbf + "\">wiki</a>)" : "");
      _0x3fccc3 += "</span></div>";
      if (_0x2542c3 == "") {
        let _0x3f6bf0 = _0x4576ec[2] || "";
        if (_0x45e8c6.length >= 3) {
          _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5\">";
          if (_0x45e8c6[4] == null) {
            if ([whitelistId, banRulesId, 100].indexOf(parseInt(_0x50f1bc)) >= 0) {
              let _0x37caca = _0x50f1bc == 100 ? "link" : "banrules";
              _0x37caca = _0x50f1bc == whitelistId ? "whitelist" : _0x37caca;
              _0x3fccc3 += "<a id=\"gp_" + _0x37caca + "modal\" href=\"#\" class=\"btn btn-primary btn-sm py-0 editmid\" data-id=\"" + _0x50f1bc + "\"><img class=\"mr-2 editcen\" src=\"" + xConfig.dir + "img/navbar/pencil.svg\" alt=\"edit\"><span data-localize=\"chats.edit\">edit</span></a>";
              _0x3fccc3 += "<input type=\"hidden\" name=\"go_" + _0x50f1bc + "\" class=\"form-control form-control-sm\" id=\"gi_" + _0x50f1bc + "\" length=\"" + _0x45e8c6[3] + "\" value=\"" + _0x3f6bf0 + "\">";
            } else {
              _0x3fccc3 += "<input type=\"text\" name=\"go_" + _0x50f1bc + "\" class=\"form-control form-control-sm\" id=\"gi_" + _0x50f1bc + "\" length=\"" + _0x45e8c6[3] + "\" value=\"" + _0x3f6bf0 + "\">";
            }
          } else {
            _0x3fccc3 += "<a id=\"gp_modalB\" href=\"#\" class=\"btn btn-primary btn-sm py-0 editmid\" data-id=\"" + _0x50f1bc + "\"><img class=\"mr-2 editcen\" src=\"" + xConfig.dir + "img/navbar/pencil.svg\" alt=\"edit\"><span data-localize=\"chats.edit\">edit</span></a>";
            _0x3fccc3 += "<input type=\"hidden\" style=\"width:30%\" name=\"go_" + _0x50f1bc + "\" id=\"gi_" + _0x50f1bc + "\" width=\"50%\" length=\"" + _0x45e8c6[3] + "\" value=\"" + escapeHTML(_0x3f6bf0.replace(/&quot;/g, "'")) + "\">";
          }
          _0x3fccc3 += "</div>";
        } else {
          _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5\">";
          _0x3fccc3 += "<input type=\"hidden\" style=\"width:30%\" name=\"go_" + _0x50f1bc + "\" id=\"gi_" + _0x50f1bc + "\" width=\"50%\" length=\"256\">";
          _0x3fccc3 += "</div>";
        }
      }
      if (_0x4576ec[0] !== "") {
        _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-2\">";
        _0x3fccc3 += "<a tabindex=\"0\" data-toggle=\"popover\" class=\"vermid\" data-placement=\"top\" data-content=\"" + _0x4576ec[0] + "\"><span class=\"nosel\" data-localize=\"chats.assignedby\" data-toggle=\"tooltip\" data-placement=\"right\" data-html=\"true\" id=\"copy\" title=\"<span data-localize='chats.copy'>copy</span>!\">Assigned by</span></a>";
        _0x3fccc3 += "</div>";
      } else {
        _0x3fccc3 += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-2\">";
        _0x3fccc3 += "<a href=\"https://rxat.ro/powers\" target=\"_blank\" class=\"btn btn-outline-primary btn-sm py-0 getpowmid\"><span data-localize=\"chats.getpwr\">Get Power</span></a>";
        _0x3fccc3 += "</div>";
      }
      _0x3fccc3 += "</div>";
    }
  }
  return _0x3fccc3;
}
function getTotalAssigned(_0x31088e) {
  if (!_0x31088e) {
    return 0;
  }
  let _0x3419e8 = 0;
  for (let _0x1ece42 in _0x31088e) {
    if (_0x31088e[_0x1ece42].split("|")[0].length > 0) {
      _0x3419e8++;
    }
  }
  return _0x3419e8;
}
let il = 0;
let y = 0;
let wl = 0;
let whitelistOptions = {
  "1": "all",
  "2": "registered"
};
let didListener = {
  "100": false
};
function openLinkModal(_0x57cce2) {
  _0x57cce2.preventDefault();
  $("#linkModal").modal();
  initModalStuff(100);
}
function openBanRulesModal(_0x32643f) {
  _0x32643f.preventDefault();
  $("#banRulesModal").modal();
  initModalStuff(banRulesId);
}
function openWhitelistModal(_0x2a092e) {
  _0x2a092e.preventDefault();
  $("#whitelistModal").modal();
  initModalStuff(whitelistId);
}
function initModalStuff(_0x23f930) {
  if (!_0x23f930) {
    return;
  }
  let _0x14ffdf = _0x23f930 == banRulesId ? "br" : "link";
  _0x14ffdf = _0x23f930 == whitelistId ? "wl" : _0x14ffdf;
  let _0x201437 = document.querySelector("#" + _0x14ffdf + "Save");
  let _0x59dbbe = document.querySelector("#errno" + _0x14ffdf);
  let _0x3b3017 = document.querySelector("#gi_" + _0x23f930);
  let _0x797c75 = document.querySelector("#" + _0x14ffdf + "_list");
  let _0x168e0b = document.querySelector("#" + _0x14ffdf + "Add");
  if (!_0x3b3017) {
    return;
  }
  let _0x2f17d3 = _0x3b3017.value.split(_0x23f930 == banRulesId ? "~" : _0x23f930 == whitelistId ? ":" : ",");
  _0x797c75.innerHTML = "";
  if (_0x2f17d3.length > 0 && _0x2f17d3[0] !== "") {
    _0x59dbbe.classList.add("d-none");
    if (_0x23f930 == banRulesId || _0x23f930 == whitelistId) {
      if (_0x23f930 == banRulesId) {
        for (y = 0; y < _0x2f17d3.length; y++) {
          let _0x197259 = _0x2f17d3[y].split(",");
          _0x797c75.appendChild(createLinkField(y, _0x197259[0], _0x197259[1], _0x23f930));
        }
      } else {
        for (wl = 0; wl < _0x2f17d3.length; wl++) {
          let _0x3bc9ca = _0x2f17d3[wl].split(",");
          _0x797c75.appendChild(createLinkField(wl, _0x3bc9ca[0], _0x3bc9ca[1], _0x23f930));
        }
      }
    } else {
      for (il = 0; il + 1 < _0x2f17d3.length; il += 2) {
        _0x797c75.appendChild(createLinkField(il, _0x2f17d3[il], _0x2f17d3[il + 1], _0x23f930));
      }
    }
  } else {
    _0x59dbbe.classList.remove("d-none");
  }
  if (!didListener[_0x23f930]) {
    _0x168e0b.addEventListener("click", _0x48c87d => {
      addNewField(_0x48c87d, _0x23f930);
    });
    _0x201437.addEventListener("click", () => {
      saveLink(_0x23f930);
    });
    didListener[_0x23f930] = true;
  }
}
function saveLink(_0x447e5b) {
  if (!_0x447e5b) {
    return;
  }
  let _0x1aabb5 = [];
  let _0x355a06 = _0x447e5b == banRulesId ? "banRulesModal" : "linkModal";
  _0x355a06 = _0x447e5b == whitelistId ? "whitelistModal" : _0x355a06;
  let _0x22860c = document.querySelector("#gi_" + _0x447e5b);
  let _0x1e8be8 = document.querySelectorAll("#" + _0x355a06 + " [data-row]");
  if (_0x1e8be8.length > 0) {
    _0x1e8be8.forEach(function (_0x4052aa) {
      let _0x1ea9c6 = _0x4052aa.dataset;
      let _0x6ac900 = document.getElementById("name_" + _0x1ea9c6.rid + "_" + _0x447e5b).value;
      let _0x4ba72b = document.getElementById("value_" + _0x1ea9c6.rid + "_" + _0x447e5b).value;
      if (_0x447e5b == banRulesId && !_0x4ba72b) {
        _0x4ba72b = "1";
      }
      if (_0x447e5b == whitelistId) {
        _0x6ac900 = checkUrl(_0x6ac900);
      }
      if (_0x6ac900.length && _0x4ba72b.length) {
        _0x6ac900 = _0x6ac900.replace(/[~,|]/gi, "");
        if (_0x447e5b == banRulesId || _0x447e5b == whitelistId) {
          _0x4ba72b = parseInt(_0x4ba72b);
          _0x1aabb5.push(_0x6ac900 + "," + _0x4ba72b);
        } else {
          _0x1aabb5.push(_0x6ac900);
          _0x1aabb5.push(_0x4ba72b);
        }
      }
    });
  }
  _0x22860c.value = _0x1aabb5.join(_0x447e5b == banRulesId ? "~" : _0x447e5b == whitelistId ? ":" : ",");
}
function addNewField(_0x266025, _0x4a2540) {
  let _0x9397a6 = _0x4a2540 == banRulesId ? "br" : "link";
  _0x9397a6 = _0x4a2540 == whitelistId ? "wl" : _0x9397a6;
  let _0x2b088c = document.querySelector("#" + _0x9397a6 + "_list");
  let _0x25a79e = document.querySelector("#errno" + _0x9397a6);
  _0x266025.preventDefault();
  if (_0x4a2540 == 100) {
    il += 1;
  }
  if (_0x4a2540 == banRulesId) {
    y += 1;
  }
  if (_0x4a2540 == whitelistId) {
    wl += 1;
  }
  _0x2b088c.appendChild(createLinkField(_0x4a2540 == banRulesId ? y : _0x4a2540 == whitelistId ? wl : il, "", "", _0x4a2540));
  _0x25a79e.classList.add("d-none");
}
function createLinkField(_0x59f2a6, _0x507cfd, _0x9d3731, _0x5be9f5) {
  let _0x105232 = _0x5be9f5 == banRulesId ? "br" : "link";
  _0x105232 = _0x5be9f5 == whitelistId ? "wl" : _0x105232;
  let _0x5218ec = _0x5be9f5 == banRulesId ? "banRulesModal" : "linkModal";
  _0x5218ec = _0x5be9f5 == whitelistId ? "whitelistModal" : _0x5218ec;
  let _0x1a4845 = document.querySelector("#errno" + _0x105232);
  let _0x1a177f = document.createElement("div");
  _0x1a177f.className = "row mb-4";
  _0x1a177f.setAttribute("data-rid", _0x59f2a6);
  _0x1a177f.setAttribute("data-row", "");
  let _0xcbf33a = document.createElement("div");
  _0xcbf33a.className = "col-md-5";
  _0x1a177f.appendChild(_0xcbf33a);
  let _0x7a3210 = document.createElement("input");
  _0x7a3210.type = "text";
  _0x7a3210.id = "name_" + _0x59f2a6 + "_" + _0x5be9f5;
  _0x7a3210.className = "form-control";
  _0x7a3210.value = _0x507cfd;
  _0x7a3210.placeholder = _0x5be9f5 == banRulesId ? "rule" : _0x5be9f5 == whitelistId ? "url" : "word";
  _0xcbf33a.appendChild(_0x7a3210);
  let _0x1a7d3f;
  let _0xc1a1c1 = document.createElement("div");
  _0xc1a1c1.className = "col-md-5";
  _0x1a177f.appendChild(_0xc1a1c1);
  if ([banRulesId, 100].indexOf(parseInt(_0x5be9f5)) >= 0) {
    _0x1a7d3f = document.createElement("input");
    _0x1a7d3f.type = _0x5be9f5 == banRulesId ? "number" : "text";
    _0x1a7d3f.id = "value_" + _0x59f2a6 + "_" + _0x5be9f5;
    _0x1a7d3f.className = "form-control";
    _0x1a7d3f.value = _0x9d3731 || _0x5be9f5 != banRulesId ? _0x9d3731 : 1;
    _0x1a7d3f.placeholder = _0x5be9f5 == banRulesId ? "duration" : "bitly link ID";
  } else {
    _0x1a7d3f = document.createElement("select");
    _0x1a7d3f.id = "value_" + _0x59f2a6 + "_" + _0x5be9f5;
    _0x1a7d3f.className = "form-control";
    for (let _0x11c271 in whitelistOptions) {
      let _0x4a4359 = document.createElement("option");
      _0x4a4359.value = _0x11c271;
      _0x4a4359.innerText = whitelistOptions[_0x11c271];
      if (_0x9d3731 && parseInt(_0x11c271) == parseInt(_0x9d3731)) {
        _0x4a4359.selected = true;
      }
      _0x1a7d3f.appendChild(_0x4a4359);
    }
  }
  _0xc1a1c1.appendChild(_0x1a7d3f);
  let _0x3f5733 = document.createElement("div");
  _0x3f5733.className = "col-md-2";
  _0x1a177f.appendChild(_0x3f5733);
  let _0x514cb0 = document.createElement("div");
  _0x514cb0.setAttribute("data-id", _0x59f2a6);
  _0x514cb0.className = "imglink";
  _0x514cb0.style.background = "url('" + xConfig.dir + "img/navbar/remove.svg')";
  _0x3f5733.appendChild(_0x514cb0);
  _0x514cb0.addEventListener("click", _0x28f037 => {
    let _0xec0c80 = document.querySelector("#" + _0x5218ec + " [data-rid=\"" + _0x59f2a6 + "\"]");
    if (_0xec0c80) {
      _0xec0c80.remove();
    }
    if (linkCount(_0x5be9f5) == 0) {
      _0x1a4845.classList.remove("d-none");
    }
  });
  return _0x1a177f;
}
function linkCount(_0x477404) {
  if (!_0x477404) {
    return;
  }
  let _0x447f3b = _0x477404 == banRulesId ? "banRulesModal" : "linkModal";
  _0x447f3b = _0x477404 == whitelistId ? "whitelistModal" : _0x447f3b;
  return document.querySelectorAll("#" + _0x447f3b + " [data-rid]").length;
}
function checkUrl(_0x332352) {
  if (!_0x332352) {
    return "";
  }
  if (_0x332352.substr(0, 4) != "http") {
    _0x332352 = "https://" + _0x332352;
  }
  try {
    let _0xac96cb = new URL(_0x332352);
    if (_0xac96cb && _0xac96cb.hostname) {
      return _0xac96cb.hostname;
    } else {
      return "";
    }
  } catch (_0x3c813e) {
    return "";
  }
}
didListener[banRulesId] = false;
didListener[whitelistId] = false;
let flagsList = {
  NoList: 512,
  members: 128,
  registered: 1048576,
  subscribers: 1048576,
  NoStore: 256,
  FussyBan: 4194304,
  NoSmilieLine: 2048,
  DefNoSound: 131072,
  Transparent: 65536,
  UseHtml5: 67108864
};
function handleAppearanceTab() {
  $("#landscape").parent().parent().removeClass("d-none");
  let _0x33fb17 = xConfig.obj;
  let _0x35b690 = _0x33fb17.Err;
  let _0x5cd0b8 = $("#appearance #AppearanceSubmit");
  let _0x35d019 = _0x35b690.background === undefined ? [] : _0x35b690.background.split(";=");
  let _0x5c347b = _0x35b690.www === undefined ? [] : _0x35b690.www.split(";=");
  let _0x4873d5 = formatAppearanceAndApply(_0x33fb17)[0];
  $("#gbackground");
  $("#button0");
  let _0x59805a = $("#cbackground");
  let _0x5188f6 = $("#button1");
  const _0x50d1d1 = ["neoxat", "html5", "trade", "ajuda"];
  if (_0x35b690.flags & flagsList.Transparent) {
    _0x59805a.attr("disabled", true);
    _0x5188f6.attr("disabled", "disabled");
    _0x5188f6.children().css("opacity", "0.2");
    _0x5188f6.tooltip("dispose");
    _0x5188f6.removeClass("transButton");
    createTooltips(_0x59805a.parent(), "<span data-localize=\"chats.transblock\">This field cannot be used while the transparent option is enabled in settings</span>");
  } else {
    _0x59805a.parent().tooltip("dispose");
    _0x59805a.removeAttr("disabled");
    _0x5188f6.children().css("opacity", "1");
    _0x5188f6.addClass("transButton");
    _0x5188f6.tooltip();
  }
  if (pickersList.length === 0) {
    initColorsPickers();
  }
  getPostParam();
  let _0x4d8eb2 = $("#apperr");
  _0x5cd0b8.off("click").on("click", function (_0x4d09d6) {
    _0x4d09d6.preventDefault();
    let _0x264b0f = getPostParam();
    let _0x10428e = $("#flag :selected").text();
    for (let _0x1d7721 in _0x4873d5) {
      let _0x68fd3d = $("#appearance #" + _0x1d7721);
      if (_0x68fd3d) {
        _0x4873d5[_0x1d7721] = _0x68fd3d.val();
        switch (_0x1d7721) {
          case "css":
          case "gbackground":
          case "iframe":
            if (_0x4873d5.css && _0x4873d5.css.length > 1) {
              _0x5c347b[1] = _0x4873d5.css;
            } else if (_0x4873d5.gbackground.charAt(0) === "#") {
              _0x5c347b[1] = filter(_0x4873d5.gbackground);
            } else {
              _0x5c347b[1] = _0x4873d5.gbackground;
            }
            _0x5c347b[2] = filter(_0x4873d5.iframe) || "";
            _0x264b0f.www = _0x5c347b.join(";=");
            break;
          case "portrait":
          case "landscape":
          case "buttoncolor":
          case "flag":
          case "flagName":
          case "grad":
          case "font":
          case "glow":
          case "cbackground":
            if (_0x1d7721 === "cbackground") {
              _0x35d019[0] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "portrait" && _0x4873d5[_0x1d7721].length > 0) {
              _0x35d019[6] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "portrait" && _0x4873d5[_0x1d7721].length == 0) {
              _0x35d019[6] = "";
            }
            if (_0x1d7721 === "landscape" && _0x4873d5[_0x1d7721].length > 0) {
              _0x35d019[7] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "landscape" && _0x4873d5[_0x1d7721].length == 0) {
              _0x35d019[7] = "";
            }
            if (_0x1d7721 === "buttoncolor") {
              _0x35d019[5] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "flag") {
              _0x35d019[8] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "flagName") {
              _0x35d019[9] = filter(_0x10428e);
            }
            if (_0x1d7721 === "grad") {
              _0x35d019[10] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "font") {
              _0x35d019[11] = filter(_0x4873d5[_0x1d7721]);
            }
            if (_0x1d7721 === "glow") {
              _0x35d019[12] = filter(_0x4873d5[_0x1d7721]);
            }
            _0x264b0f.background = _0x35d019.join(";=");
        }
      }
    }
    if (_0x4873d5.iframe.length > 0 && !_0x4873d5.gbackground.length) {
      let _0x3e9be1 = "<span data-localize='chats.bgififrame'>You must also set an outer group background when adding a ixatframe</span>";
      _0x3e9be1 += "<span class='alerttab text-secondary'><span data-localize='chats.note'>NOTE</span>: <span data-localize='chats.remcss'>If you use custom CSS, you must remove it first to edit the outer background field.</span></span>";
      doErrorMsg(_0x4d8eb2, _0x3e9be1);
      document.body.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else if (_0x50d1d1.includes(_0x35b690.name.toLowerCase()) || _0x35d019[9] != "neoxat") {
      _0x4d8eb2.addClass("d-none");
      _0x264b0f.tags = _0x35b690.tags;
      _0x264b0f.descrip = filter(_0x35b690.descrip);
      _0x264b0f.Lang = _0x35b690.Lang;
      _0x264b0f.submit1 = 1;
      $(document.body).css({
        cursor: "wait"
      });
      urlPost(url, _0x264b0f).then(function (_0xcbd894) {
        $(document.body).css({
          cursor: "default"
        });
        if (_0xcbd894.Err.Save) {
          doErrorMsg(_0x4d8eb2, _0xcbd894.Err.Save);
        }
        if (_0xcbd894.Err.SaveAppearanceOk) {
          let _0x12c912 = "<span data-localize=\"chats.appsaved\">Your appearance settings have been updated</span>";
          if (formatAppearanceAndApply(_0xcbd894, true)[1] >= 1) {
            _0x12c912 += "<span class=\"alerttab text-danger\"><span data-localize=\"chats.note\">NOTE</span>: <span data-localize=\"chats.blockedlinks\">Some of your links have been blocked by ixat.</span> ";
            _0x12c912 += "<a target=\"_blank\" href=\"https://util.rxat.ro/wiki/Images\">";
            _0x12c912 += "<span data-localize=\"chats.permittedimg\">See permitted image providers</span>.</a></span>";
          }
          doSuccessMsg(_0x4d8eb2, _0x12c912);
          refreshChat();
        }
        if (_0xcbd894.Err.editgroup) {
          doLogout(_0xcbd894.Err.editgroup);
        }
        xConfig.obj.Err = updateConfigObj(Object.assign({}, _0x264b0f, _0xcbd894.Err));
        document.body.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    } else {
      doErrorMsg(_0x4d8eb2, "<span data-localize=\"chats.onlyxat\">Only official chats can use the ixat flag</span>");
    }
  });
}
let flagSelect = null;
if (document.querySelector("#flag")) {
  flagSelect = new SlimSelect({
    select: "#flag",
    showSearch: true,
    closeOnSelect: true
  });
}
let gradSelect = null;
if (document.querySelector("#grad")) {
  gradSelect = new SlimSelect({
    select: "#grad",
    showSearch: false,
    closeOnSelect: true
  });
}
let fontSelect = null;
if (document.querySelector("#font")) {
  fontSelect = new SlimSelect({
    select: "#font",
    showSearch: false,
    closeOnSelect: true
  });
}
function formatAppearanceAndApply(_0x5756b9, _0x2bcede) {
  if (!_0x5756b9.Err) {
    return {};
  }
  let _0x24867d = _0x5756b9.Err;
  let _0x355a7d = $("#gbackground");
  let _0x1c5cf2 = $("#button0");
  let _0x3d2612 = $("#css");
  $("#glow");
  $("#flag");
  $("#grad");
  $("#font");
  let _0x1e32ed = _0x24867d.background === undefined ? [] : _0x24867d.background.split(";=");
  let _0x446937 = _0x24867d.www === undefined ? [] : _0x24867d.www.split(";=");
  let _0x22cea5 = {
    buttoncolor: _0x1e32ed[5],
    cbackground: _0x1e32ed[0],
    portrait: _0x1e32ed[6],
    landscape: _0x1e32ed[7],
    css: "",
    gbackground: "",
    iframe: "",
    flag: _0x1e32ed[8],
    flagName: _0x1e32ed[9],
    grad: _0x1e32ed[10],
    font: _0x1e32ed[11],
    glow: _0x1e32ed[12]
  };
  let _0x1b5119 = hasPower(636);
  if (_0x1b5119) {
    $("#gstyle").removeClass("d-none");
    $("#buyGstyle").addClass("d-none");
  } else {
    $("#gstyle").addClass("d-none");
    $("#buyGstyle").removeClass("d-none");
  }
  if (_0x1b5119 < 2) {
    $("#gFont").addClass("d-none");
  } else {
    $("#gFont").removeClass("d-none");
  }
  if (_0x1b5119 < 3) {
    $("#gGlow").addClass("d-none");
  } else {
    $("#gGlow").removeClass("d-none");
  }
  if (_0x446937[1]) {
    if (_0x446937[1].substr(0, 4) === "http" || _0x446937[1] === "" || _0x446937[1].charAt(0) === "#") {
      _0x22cea5.gbackground = _0x446937[1].replace(/=/gi, "");
      if (_0x22cea5.gbackground.indexOf("GetImage7") >= 0) {
        let _0xdb29f4 = _0x22cea5.gbackground.split("?U")[1];
        _0x22cea5.gbackground = _0xdb29f4;
      }
    } else {
      _0x22cea5.css = _0x446937[1];
    }
  }
  if (_0x446937[2]) {
    _0x22cea5.iframe = _0x446937[2];
  }
  if (_0x22cea5.flag) {
    flagSelect.set(_0x22cea5.flag);
  }
  if (_0x22cea5.grad) {
    gradSelect.set(_0x22cea5.grad);
  }
  if (_0x22cea5.font) {
    fontSelect.set(_0x22cea5.font);
  }
  let _0xe427ed = 0;
  for (let _0xc8040 in _0x22cea5) {
    let _0x4684c8 = document.querySelector("#appearance #" + _0xc8040);
    if (_0x2bcede && _0x22cea5[_0xc8040] && _0x22cea5[_0xc8040].indexOf("//BlockedDomain") >= 0) {
      _0xe427ed++;
    }
    if (_0x4684c8) {
      if (_0xc8040 === "buttoncolor") {
        _0x4684c8.value = _0x22cea5[_0xc8040];
      }
      if (_0xc8040 === "css" && _0x22cea5.css.length >= 1) {
        _0x3d2612.val(_0x22cea5[_0xc8040]);
        _0x355a7d.attr("disabled", true);
        _0x1c5cf2.attr("disabled", "disabled");
        _0x1c5cf2.children().css("opacity", "0.2");
        _0x1c5cf2.tooltip("dispose");
        _0x1c5cf2.removeClass("transButton");
        createTooltips(_0x355a7d.parent());
        updateCharCount(_0x22cea5[_0xc8040].length);
        _0x355a7d.value = "";
      } else {
        _0x4684c8.value = _0x22cea5[_0xc8040] || "";
      }
    }
  }
  return [_0x22cea5, _0xe427ed];
}
function createTooltips(_0x241b83, _0x2787e8) {
  _0x2787e8 ||= "<span data-localize=\"chats.disabled\">Remove content in custom CSS to use this field</span>";
  if (_0x241b83) {
    _0x241b83.attr("data-toggle", "tooltip");
    _0x241b83.attr("data-placement", "top");
    _0x241b83.attr("data-html", true);
    _0x241b83.attr("title", _0x2787e8);
    initToolTip(_0x241b83);
  }
}
let selectSettings = null;
if (document.querySelector("#chatlang")) {
  selectSettings = new SlimSelect({
    select: "#chatlang",
    showSearch: true,
    closeOnSelect: true,
    searchFocus: false
  });
}
function handleSettingsTab() {
  let _0x178419 = xConfig.obj;
  let _0x38b579 = _0x178419.Err;
  let _0x2b5744 = _0x38b579.background === undefined ? [] : _0x38b579.background.split(";=");
  let _0x4c5095 = $("#SettingsSubmit");
  let _0x5d8af0 = $("#setsuccess");
  let _0x448056 = formatSettingsAndApply(_0x178419)[0];
  let _0x392177 = flagsList.members | flagsList.subscribers;
  let _0x2c11dd = false;
  if ((_0x38b579.flags & _0x392177) == _0x392177) {
    $("input[name=\"subscribers\"]").prop("checked", true);
    _0x2c11dd = true;
  }
  for (let _0x15d3e3 in flagsList) {
    if (_0x15d3e3 != "subscribers") {
      if (["members", "registered"].indexOf(_0x15d3e3) >= 0 && !_0x2c11dd && _0x38b579.flags & flagsList[_0x15d3e3]) {
        $("input[name=\"" + _0x15d3e3 + "\"]").prop("checked", true);
      }
      if (["members", "registered"].indexOf(_0x15d3e3) == -1 && _0x38b579.flags & flagsList[_0x15d3e3]) {
        $("input[name=\"" + _0x15d3e3 + "\"]").prop("checked", true);
      }
    }
  }
  _0x4c5095.off("click").on("click", function (_0x47bf86) {
    _0x47bf86.preventDefault();
    let _0x5eb3e5 = getPostParam();
    let _0x2e0ba8 = {};
    let _0xc39fba = 66;
    let _0x286534 = $("input[name=\"subscribers\"]").is(":checked");
    if (_0x286534) {
      _0xc39fba |= _0x392177;
    }
    for (let _0x31c418 in flagsList) {
      if (_0x31c418 !== "subscribers") {
        let _0xb47ecd = $("input[name=\"" + _0x31c418 + "\"]").is(":checked");
        if (["members", "registered"].indexOf(_0x31c418) >= 0) {
          if (function (_0x52195c, _0x353437) {
            return _0x52195c && _0x353437;
          }(_0x286534, _0xb47ecd)) {
            $("input[name=\"" + _0x31c418 + "\"]").prop("checked", false);
          }
          if (_0x31c418 == "registered" && _0xb47ecd) {
            if ($("input[name=\"members\"]").is(":checked")) {
              $("input[name=\"members\"]").prop("checked", false);
            }
          }
          if (function (_0x325218, _0x35f9f2) {
            return _0x325218 && _0x35f9f2;
          }(!_0x286534, _0xb47ecd)) {
            _0xc39fba |= flagsList[_0x31c418];
          }
        }
        if (["members", "registered"].indexOf(_0x31c418) == -1 && _0xb47ecd) {
          _0xc39fba |= flagsList[_0x31c418];
        }
      }
    }
    for (let _0x1113aa in _0x448056) {
      let _0x7402be = $("#settings " + (_0x1113aa != "Lang" ? "input[name=\"" + _0x1113aa + "\"]" : "select[name=\"" + _0x1113aa + "\"]"));
      if (_0x7402be) {
        _0x448056[_0x1113aa] = _0x7402be.val();
        switch (_0x1113aa) {
          case "Tags":
            let _0x35356c = _0x448056.Vars.split(";=");
            let _0x47ebec = $("#settings #chatlang option:selected").val();
            _0x35356c[0] = _0x47ebec;
            _0x448056.Vars = _0x35356c.join(";=");
            _0x2e0ba8.tags = [filter(_0x448056.Tags), _0x448056.Vars].join(";=");
            _0x2e0ba8.Lang = _0x47ebec;
            break;
          case "GroupName":
            _0x5eb3e5.name = filter(_0x448056.GroupName);
            break;
          case "GroupDescription":
            _0x2e0ba8.descrip = filter(_0x448056.GroupDescription);
        }
      }
    }
    if (_0xc39fba & flagsList.Transparent) {
      _0x2b5744[0] = "";
    }
    let _0xec85b4 = filter(_0x448056.Buddy);
    _0x2b5744[3] = $("#settings #chatlang option:selected").text().split(" /")[0];
    _0x2b5744[4] = filter(_0x448056.Radio);
    _0x2e0ba8.background = _0x2b5744.join(";=");
    _0x5d8af0.addClass("d-none");
    _0x5eb3e5.background = _0x2e0ba8.background;
    _0x5eb3e5.tags = _0x2e0ba8.tags;
    _0x5eb3e5.descrip = _0x2e0ba8.descrip;
    _0x5eb3e5.Lang = _0x2e0ba8.Lang;
    _0x5eb3e5.www = _0x38b579.www;
    _0x5eb3e5.SetFlags = _0xc39fba;
    _0x5eb3e5.SetBuddy = _0xec85b4;
    _0x5eb3e5.submit1 = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x5eb3e5).then(function (_0x486748) {
      $(document.body).css({
        cursor: "default"
      });
      let _0x38e0c2 = $("#setsuccess");
      if (_0x486748.Err.Save) {
        doErrorMsg(_0x38e0c2, _0x486748.Err.Save);
      }
      if (_0x486748.Err.SaveSettingsOk) {
        let _0x28db18 = "<span data-localize=\"chats.appsaved\">Your settings have been updated</span>";
        if (formatSettingsAndApply(_0x486748, true)[1] >= 1) {
          _0x28db18 += "<span class=\"alerttab text-danger\"><span data-localize=\"chats.note\">NOTE</span>: <span data-localize=\"chats.blockedlinks\">Some of your links have been blocked by ixat.</span> ";
          _0x28db18 += "<a target=\"_blank\" href=\"https://util.rxat.ro/wiki/Images\">";
          _0x28db18 += "<span data-localize=\"chats.permittedimg\">See permitted image providers</span>.</a></span>";
        }
        doSuccessMsg(_0x38e0c2, _0x28db18);
        refreshChat();
      }
      if (_0x486748.Err.editgroup) {
        if (isValidGroup(_0x448056.GroupName)) {
          doLogout(_0x486748.Err.editgroup);
        } else {
          doErrorMsg(_0x38e0c2, "<span data-localize=chats.nonewgrp>Cannot change group name. Reverted to original name.</span> <span data-localize=chats.caseonly>You can change case only</span>.");
          $("#settings #gname").val(xConfig.obj.GroupName);
        }
      }
      xConfig.obj.Err = updateConfigObj(Object.assign({}, _0x5eb3e5, _0x486748.Err));
      document.body.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}
function isValidGroup(_0x509478) {
  if (!_0x509478) {
    return false;
  }
  let _0x473342 = xConfig.obj.GroupName;
  return !!_0x473342 && _0x473342.toLowerCase() == _0x509478.toLowerCase();
}
function formatSettingsAndApply(_0x8df4d5, _0x1aed21) {
  if (!_0x8df4d5.Err) {
    return {};
  }
  let _0x215844 = _0x8df4d5.Err;
  let _0x20e007 = _0x215844.tags === undefined ? [] : _0x215844.tags.split(";=");
  let _0x4d4488 = _0x215844.background === undefined ? [] : _0x215844.background.split(";=");
  let _0x4ab07c = {
    Tags: _0x20e007[0],
    GroupName: _0x215844.name,
    GroupDescription: _0x215844.descrip,
    Vars: [_0x20e007[1], _0x20e007[2]].join(";="),
    Lang: _0x20e007[1],
    Radio: _0x4d4488[4],
    Buddy: _0x4d4488[1] || ""
  };
  let _0x20acf8 = 0;
  for (let _0x26445a in _0x4ab07c) {
    let _0xc16e7b = _0x26445a !== "Lang" ? "input[name=\"" + _0x26445a + "\"]" : "select[name=\"" + _0x26445a + "\"]";
    let _0x30c4a2 = document.querySelector("#settings " + _0xc16e7b);
    if (_0x1aed21 && _0x4ab07c[_0x26445a] && _0x4ab07c[_0x26445a].indexOf("//BlockedDomain") >= 0) {
      _0x20acf8++;
    }
    if (_0x30c4a2) {
      if (_0x26445a === "Lang") {
        selectSettings.set(_0x4ab07c.Lang);
      } else {
        _0x30c4a2.value = _0x4ab07c[_0x26445a] || "";
      }
    }
  }
  return [_0x4ab07c, _0x20acf8];
}
let mainSelect = null;
if (document.querySelector("#multiple")) {
  mainSelect = new SlimSelect({
    select: "#multiple",
    showSearch: false,
    closeOnSelect: false,
    placeholder: " ",
    searchPlaceholder: " ",
    searchFocus: false
  });
}
function DoMainOwners() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  Reset();
  $("#mainowners").removeClass("d-none");
  xConfig.obj;
  let _0x58cdf9 = getPostParam();
  if (hasPower(598)) {
    mainSelect.enable();
  } else {
    mainSelect.disable();
  }
  _0x58cdf9.GetMains = 1;
  if (xConfig.obj.Err.mainsList !== undefined) {
    return loadMainOwners();
  }
  $(document.body).css({
    cursor: "wait"
  });
  urlPost(url, _0x58cdf9).then(function (_0x498d21) {
    $(document.body).css({
      cursor: "default"
    });
    if (_0x498d21.Err.mains) {
      xConfig.obj.Err.mainsList = _0x498d21.Err.mains;
    }
    return loadMainOwners();
  });
}
let permissions = {
  "1": "appearance",
  "2": "tabs",
  "4": "settings",
  "8": "group_powers"
};
function loadMainOwners(_0xe94a87) {
  let _0x3b3f57 = xConfig.obj;
  let _0x3ae5af = _0x3b3f57.Err.mainsList == null ? {} : clearBadUser(_0x3b3f57.Err.mainsList[0]);
  $("#mainowners #add");
  let _0x30293f = $("#mainOwnersList");
  $("#mainOwnersList #remove");
  let _0x19921f = $("#mainerr");
  let _0x31f0da = $(".mainownerstable");
  let _0xfa56b0 = $("#errnomain");
  let _0x5a77ff = "";
  let _0x3f35d5 = 1;
  if (Object.keys(_0x3ae5af).length > 0) {
    for (let _0x21e3ac in _0x3ae5af) {
      _0x5a77ff += "<tr>";
      _0x5a77ff += "<th scope=\"row\">" + _0x3f35d5 + "</th>";
      _0x5a77ff += "<td>" + _0x3ae5af[_0x21e3ac][1].toLowerCase() + "</td>";
      _0x5a77ff += "<td>";
      if (_0x3ae5af[_0x21e3ac][0] == -1) {
        _0x5a77ff += getPermTranslate("appearance, tabs, settings, group powers").slice(0, -1);
      } else {
        let _0x1c5380 = "";
        for (let _0xb6c76f in permissions) {
          if (_0x3ae5af[_0x21e3ac][0] & _0xb6c76f) {
            _0x1c5380 += getPermTranslate(permissions[_0xb6c76f]) + ", ";
          }
        }
        _0x5a77ff += _0x1c5380.slice(0, -2);
      }
      _0x5a77ff += "</td>";
      _0x5a77ff += "<td><a id=\"remove\" data-id=\"" + _0x21e3ac + "\" href=\"#\"><img class=\"remsvg nosel\" data-id=\"" + _0x21e3ac + "\" src=\"" + xConfig.dir + "img/navbar/remove.svg\" alt=\"remove\"></a></td>";
      _0x5a77ff += "</tr>";
      _0x3f35d5++;
    }
    _0xfa56b0.html("");
    _0xfa56b0.addClass("d-none");
    _0x31f0da.removeClass("d-none");
  } else {
    _0xfa56b0.html("<span data-localize=\"chats.mainzero\">You do not have any main owners currently</span>");
    _0xfa56b0.removeClass("d-none");
    _0xfa56b0.addClass("proglab");
    _0x31f0da.addClass("d-none");
  }
  _0x30293f.html(_0x5a77ff);
  localize(["chats"]);
  document.querySelectorAll("#remove").forEach(function (_0x1abbf6) {
    _0x1abbf6.addEventListener("click", function (_0x5b9ba5) {
      _0x5b9ba5.preventDefault();
      let _0x1ba9d7 = $("#remmainmodal");
      let _0x251248 = $("#mainbye");
      let _0x54e3ce = _0x5b9ba5.target.dataset.id;
      if (!_0x54e3ce) {
        return false;
      }
      _0x1ba9d7.modal();
      _0x251248.off("click").on("click", function (_0x1b8da2) {
        _0x1b8da2.preventDefault();
        let _0xa2bed3 = findInList(_0x3ae5af, _0x54e3ce);
        if (_0xa2bed3) {
          delete _0x3ae5af[_0x54e3ce];
          let _0x14b728 = getPostParam();
          let _0x449046 = $("#mainerr");
          _0x3ae5af = returnTrueMains(_0x3ae5af);
          _0x449046.addClass("d-none");
          _0x14b728.SetMains = JSON.stringify(_0x3ae5af);
          xConfig.obj.Err.mains = JSON.stringify(_0x3ae5af);
          $(document.body).css({
            cursor: "wait"
          });
          urlPost(url, _0x14b728).then(function (_0x5e37fc) {
            $(document.body).css({
              cursor: "default"
            });
            _0x1ba9d7.modal("hide");
            if (!_0x5e37fc.Err.editgroup) {
              xConfig.obj.Err.mainsList = _0x5e37fc.Err.mains;
              let _0x1c9ae9 = _0xa2bed3[1].toLowerCase() || _0x54e3ce;
              doSuccessMsg(_0x449046, "<span class=\"font-weight-bold\">" + _0x1c9ae9 + "</span> <span data-localize=\"chats.mainremsuc\">has been removed</span>");
              return loadMainOwners(true);
            }
            doErrorMsg(_0x449046, _0x5e37fc.Err.editgroup);
          });
        } else {
          doErrorMsg(_0x19921f, "<span data-localize=\"chats.mainnofound\">User has not been found in the list</span>");
        }
      });
    });
  });
  $("#mainyes").off("submit").submit(function (_0x4d7a3d) {
    _0x4d7a3d.preventDefault();
    let _0x40acb3 = $("#mainuserid");
    $("select[name=\"permissions\"]");
    let _0x295878 = $("select[name=\"permissions\"] option:selected");
    let _0x55c9f3 = -1;
    if (_0x295878.length > 0) {
      _0x55c9f3 = 0;
      for (let _0x4d2d8b in _0x295878) {
        let _0x20bcbc = _0x295878[_0x4d2d8b].value;
        if (_0x20bcbc != null && permissions[_0x20bcbc] != null) {
          _0x55c9f3 |= _0x20bcbc;
        }
      }
    }
    let _0x5b76b0 = false;
    let _0x375f1d = filter(_0x40acb3.val());
    if (_0x375f1d.length == 0) {
      doErrorMsg(_0x19921f, "<span data-localize=\"chats.mainusid\">You must add a username/id</span>");
      return;
    }
    _0x5b76b0 = findInList(_0x3ae5af, _0x375f1d);
    if (_0x5b76b0) {
      if (_0x5b76b0[0] == -1 && _0x55c9f3 == -1) {
        doErrorMsg(_0x19921f, "<span data-localize=\"chats.mainallsame\">You cannot add the same user again</span>");
        return false;
      }
      if (_0x5b76b0[0] == _0x55c9f3) {
        doErrorMsg(_0x19921f, "<span data-localize=\"chats.mainpersame\">You cannot add the same user with same permissions</span>");
        return false;
      }
    }
    if (isNaN(_0x375f1d)) {
      _0x375f1d = _0x375f1d.toLowerCase();
    }
    _0x3ae5af[_0x375f1d] = _0x55c9f3 == 0 ? -1 : _0x55c9f3;
    _0x3ae5af = returnTrueMains(_0x3ae5af);
    let _0x27d017 = getPostParam();
    _0x19921f.addClass("d-none");
    _0x27d017.SetMains = JSON.stringify(_0x3ae5af);
    xConfig.obj.Err.mains = JSON.stringify(_0x3ae5af);
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, _0x27d017).then(function (_0x348163) {
      $(document.body).css({
        cursor: "default"
      });
      if (_0x348163.Err.mains) {
        let _0x292957 = _0x348163.Err.mains;
        _0x40acb3.val("");
        mainSelect.set([]);
        xConfig.obj.Err.mainsList = _0x348163.Err.mains;
        let _0x18cb60 = _0x375f1d;
        if (!isNaN(_0x375f1d)) {
          let _0x580ba1 = findInList(_0x348163.Err.mains[0] || {}, _0x375f1d);
          _0x18cb60 = _0x580ba1 && _0x580ba1[1].length > 0 ? _0x580ba1[1] : _0x375f1d;
        }
        if (_0x292957[1]) {
          doErrorMsg(_0x19921f, "<span data-localize=\"chats.mainnomain\">This user does not exist</span>");
        } else if (_0x5b76b0) {
          if (_0x3ae5af[_0x375f1d] == -1) {
            doSuccessMsg(_0x19921f, "<p data-localize=\"chats.mainallupd\">Main owner has been updated with all permissions</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x18cb60 + "</span>");
          } else {
            doSuccessMsg(_0x19921f, "<p data-localize=\"chats.mainperupd\">Main owner has been updated with new permissions</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x18cb60 + "</span>");
          }
        } else {
          doSuccessMsg(_0x19921f, "<p data-localize=\"chats.mainadded\">New main owner has been added</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x18cb60 + "</span>");
        }
        return loadMainOwners();
      }
      {
        let _0x447889 = _0x348163.Err.Save || "<span data-localize=\"chats.maintoomany\">You have too many main owners</span>";
        _0x447889 = _0x348163.Err.editgroup || _0x447889;
        doErrorMsg(_0x19921f, _0x447889);
      }
    });
  });
}
function clearBadUser(_0x1a6fa6) {
  if (Object.keys(_0x1a6fa6).length == 0) {
    return {};
  }
  for (let _0x936b6a in _0x1a6fa6) {
    if (!Array.isArray(_0x1a6fa6[_0x936b6a])) {
      delete _0x1a6fa6[_0x936b6a];
    }
  }
  return _0x1a6fa6;
}
function getPermTranslate(_0x133e22) {
  if (!_0x133e22) {
    return "";
  }
  let _0x2cab46 = "";
  if (_0x133e22.indexOf(", ") >= 0) {
    _0x133e22 = _0x133e22.split(", ");
    for (let _0x32fe6b in _0x133e22) {
      _0x2cab46 = _0x2cab46 + (getPermTranslate(_0x133e22[_0x32fe6b]) + (parseInt(_0x32fe6b) + 1 == _0x133e22.length ? "" : ", "));
    }
    return _0x2cab46;
  }
  return "<span data-localize=\"chats." + _0x133e22.replace("_", "").replace(" ", "") + "\">" + (_0x133e22 = _0x133e22.replace("_", " ")) + "</span>";
}
function findInList(_0x4e6561, _0x428618) {
  if (!_0x4e6561) {
    return false;
  }
  for (let _0xc4aef7 in _0x4e6561) {
    if (_0xc4aef7 == _0x428618) {
      return _0x4e6561[_0xc4aef7];
    }
    if (Array.isArray(_0x4e6561[_0xc4aef7]) && _0x4e6561[_0xc4aef7][1].toLowerCase() == _0x428618.toLowerCase()) {
      return _0x4e6561[_0xc4aef7];
    }
  }
  return false;
}
function returnTrueMains(_0x1a579c) {
  if (!_0x1a579c) {
    return false;
  }
  let _0x1ea7c6 = {};
  for (let _0x20da44 in _0x1a579c) {
    if (Array.isArray(_0x1a579c[_0x20da44])) {
      _0x1ea7c6[_0x20da44] = _0x1a579c[_0x20da44][0];
    } else {
      _0x1ea7c6[_0x20da44] = _0x1a579c[_0x20da44];
    }
  }
  return _0x1ea7c6;
}
function DoReturn(_0x2cae4b) {
  Reset();
  $("#editgroup").addClass("d-none");
  $("#editgroup_edit").addClass("d-none");
  $("#mainNav").removeClass("d-none");
  $("#tabreturn").removeClass("active");
  let _0x20b5e0 = function (_0x1dacc3, _0x254e9b) {
    return _0x1dacc3 || _0x254e9b;
  }(_0x2cae4b, "editgroup");
  location.hash = "#!" + doRealHash(location.hash, _0x20b5e0);
  if (!_0x2cae4b) {
    window.location.reload(true);
  }
}
function doForgotPassword() {
  $("#lostpwmodal").modal();
  $("#SubmitLost").off("click").click(function (_0x2853d4) {
    _0x2853d4.preventDefault();
    allErrsOff();
    let _0x39817a = $("#lostpwmodal #emailLP").val();
    let _0x33ed1f = {};
    let _0x4ad499 = getGET().params.GroupName || $("#GroupNameI").val();
    _0x33ed1f.name = filter(_0x4ad499);
    _0x33ed1f.email = filter(_0x39817a);
    _0x33ed1f.SubmitLost = 1;
    $(document.body).css({
      cursor: "wait"
    });
    urlPost(url, filter(_0x33ed1f)).then(function (_0x228c90) {
      $(document.body).css({
        cursor: "default"
      });
      allErrsOff();
      let _0x35404e = $("#editgrouperr");
      let _0x4f8e02 = $("#forgotpasserr");
      if (_0x228c90.Err.forgotpassok) {
        $("#lostpwmodal").modal("hide");
        $("#lostpwmodal").off("hidden.bs.modal").on("hidden.bs.modal", function () {
          doSuccessMsg(_0x35404e, _0x228c90.Err.forgotpassok);
          $(this).find("form").trigger("reset");
        });
        return;
      }
      if (_0x228c90.Err.editgroup) {
        doErrorMsg(_0x4f8e02, _0x228c90.Err.editgroup);
      } else {
        doErrorMsg(_0x4f8e02, _0x228c90.Err.forgotpass);
      }
    });
  });
}
let defaultwidth = 650;
let defaultheight = 486;
let update = null;
function doEmbed() {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  $("#embedmodal").modal();
  let _0x549da1 = xConfig.obj;
  let _0x10304d = $("#embed_width");
  let _0x78c1c9 = $("#embed_height");
  let _0x14db05 = $("#embed_code");
  $(".rngembed");
  let _0x32b6c7 = $("#copy");
  $(".toembed button");
  let _0x365328 = 0;
  let _0x1d3e8b = 0;
  let _0x5596e5 = $("#notrecomW");
  let _0xb51b4c = $("#notrecomH");
  _0x78c1c9.val(defaultheight);
  _0x10304d.val(defaultwidth);
  _0x14db05.html(getEmbed(_0x549da1.GroupName, _0x549da1.Err.roomid, _0x549da1.Err.width, _0x549da1.Err.height));
  _0x10304d.off("keyup").on("keyup", function (_0x34c91b) {
    $("#embFooter").addClass("d-none");
    clearTimeout(update);
    update = setTimeout(function () {
      if (false) {
        let _0x279146 = _0xd6c0a(_0x2247ac) + 1;
        if (_0xcda3e8 % 2 && _0x101fb4[_0x57c4f8] !== "") {
          _0x103813["button" + _0x279315] = {
            tabName: _0x5c8d0e(_0x2ac1bb[_0x151126]),
            tabContent: _0x5e2656[_0x279146]
          };
          _0x319f6a++;
        }
      } else {
        let _0x1d98df = _0x34c91b.target.value;
        if (isNaN(_0x1d98df) || _0x1d98df > 2000 || _0x1d98df < 600) {
          _0x1d98df = defaultwidth;
          _0x10304d.addClass("inpshake");
          _0x5596e5.removeClass("d-none");
          setTimeout(function () {
            if (true) {
              _0x10304d.removeClass("inpshake");
            } else if (_0x18bbe9(this).is(":checked")) {
              _0x2bfd23("#grouppowers .custom-control-input").each(function () {
                let _0x304cf6 = _0x56479d(this).closest(".dataSearch");
                if (_0x2ffa84(this).is(":disabled") == 0 && !_0x304cf6.hasClass("d-none")) {
                  _0x2d45e0(this).prop("checked", true);
                }
              });
            } else {
              _0x5eb5bd("#grouppowers .custom-control-input").each(function () {
                let _0x55547f = _0x147fec(this).closest(".dataSearch");
                if (_0x33b560(this).is(":disabled") == 0 && !_0x55547f.hasClass("d-none")) {
                  _0xb5420f(this).prop("checked", false);
                }
              });
            }
          }, 1000);
          setTimeout(function () {
            if (true) {
              _0x5596e5.addClass("d-none");
            } else {
              _0x2fc295(_0x58c3f3.body).css({
                cursor: "default"
              });
              if (_0x3f157d.Err.mains) {
                let _0x109a6e = _0x308806.Err.mains;
                _0x324f70.val("");
                _0x55c315.set([]);
                _0x2aec00.obj.Err.mainsList = _0x289614.Err.mains;
                let _0x5bce1f = _0x4a2088;
                if (!_0x1db453(_0x5b7fc8)) {
                  let _0x4d7c1c = _0x19294a(_0x23afa1.Err.mains[0] || {}, _0x3930db);
                  _0x5bce1f = _0x4d7c1c && _0x4d7c1c[1].length > 0 ? _0x4d7c1c[1] : _0x22689c;
                }
                if (_0x109a6e[1]) {
                  _0x4f8fb9(_0xe72c77, "<span data-localize=\"chats.mainnomain\">This user does not exist</span>");
                } else if (_0x32852e) {
                  if (_0x513a25[_0x5499f6] == -1) {
                    _0x491bf5(_0x2b2ac2, "<p data-localize=\"chats.mainallupd\">Main owner has been updated with all permissions</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x5bce1f + "</span>");
                  } else {
                    _0x2932ab(_0x32ac4f, "<p data-localize=\"chats.mainperupd\">Main owner has been updated with new permissions</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x5bce1f + "</span>");
                  }
                } else {
                  _0x5a7890(_0xae80ae, "<p data-localize=\"chats.mainadded\">New main owner has been added</p><span data-localize=\"chats.capuser\">Username</span>: <span class=\"font-weight-bold\"> " + _0x5bce1f + "</span>");
                }
                return _0x505670();
              }
              {
                let _0x5ab664 = _0x302dee.Err.Save || "<span data-localize=\"chats.maintoomany\">You have too many main owners</span>";
                _0x5ab664 = _0x4a812c.Err.editgroup || _0x5ab664;
                _0x106d92(_0x2ac629, _0x5ab664);
              }
            }
          }, 3000);
        }
        $("#embFooter").removeClass("d-none");
        _0x1d98df = parseInt(_0x1d98df);
        _0x365328 = _0x1d98df;
        _0x1d3e8b = calculateProp(_0x1d98df, false);
        _0x10304d.val(_0x365328);
        _0x78c1c9.val(_0x1d3e8b);
        _0x14db05.html(getEmbed(_0x549da1.GroupName, _0x549da1.Err.roomid, _0x1d98df, _0x1d3e8b == 0 ? _0x78c1c9.val() : _0x1d3e8b));
      }
    }, 1000);
  });
  _0x78c1c9.off("keyup").on("keyup", function (_0x57c4ad) {
    $("#embFooter").addClass("d-none");
    clearTimeout(update);
    update = setTimeout(function () {
      let _0x465d79 = _0x57c4ad.target.value;
      if (isNaN(_0x465d79) || _0x465d79 > 2000 || _0x465d79 < 465) {
        _0x465d79 = defaultheight;
        _0x78c1c9.addClass("inpshake");
        _0xb51b4c.removeClass("d-none");
        setTimeout(function () {
          _0x78c1c9.removeClass("inpshake");
        }, 1000);
        setTimeout(function () {
          _0xb51b4c.addClass("d-none");
        }, 3000);
      }
      $("#embFooter").removeClass("d-none");
      _0x465d79 = parseInt(_0x465d79);
      _0x1d3e8b = _0x465d79;
      _0x365328 = calculateProp(_0x465d79, true);
      _0x78c1c9.val(_0x1d3e8b);
      _0x10304d.val(_0x365328);
      _0x14db05.html(getEmbed(_0x549da1.GroupName, _0x549da1.Err.roomid, _0x365328 == 0 ? _0x10304d.val() : _0x365328, _0x465d79));
    }, 1000);
  });
  _0x10304d.off("keydown").on("keydown", function (_0x4f196a) {
    clearTimeout(update);
  });
  _0x78c1c9.off("keydown").on("keydown", function (_0x4d677f) {
    clearTimeout(update);
  });
  _0x32b6c7.tooltip({
    trigger: "click",
    placetop: "top"
  });
  _0x32b6c7.off("click").on("click", function (_0x175524) {
    _0x175524.preventDefault();
    var _0x44cf93 = document.getElementById("embed_code");
    _0x44cf93.select();
    _0x44cf93.setSelectionRange(0, 99999);
    document.execCommand("copy");
    _0x32b6c7.tooltip("show");
    setTimeout(function () {
      _0x32b6c7.tooltip("hide");
    }, 1000);
    localize(["chats"]);
  });
  $("#preview").off("click").on("click", function (_0x2518a5) {
    _0x365328 = _0x365328 || _0x10304d.val();
    _0x1d3e8b = _0x1d3e8b || _0x78c1c9.val();
    let _0x2b096d = _0x549da1.GroupName;
    let _0x1a62da = _0x549da1.Err.roomid;
    if (_0x365328 <= 650) {
      getEmbed(_0x2b096d, _0x1a62da, _0x365328, _0x1d3e8b, true);
    }
    if (_0x365328 > 650) {
      getEmbed(_0x2b096d, _0x1a62da, _0x365328, _0x1d3e8b, false, true);
    }
  });
}
function loadModal(_0x253b53, _0x4aba2c) {
  if (!_0x253b53) {
    return false;
  }
  xConfig.obj;
  fetch("https://rxat.ro/web_gear/chat/GroupOptionEdit2.php?j=2&id=" + _0x253b53).then(function (_0x98752f) {
    return _0x98752f.json();
  }).then(function (_0x3ad561) {
    var _0x3b9ca4 = _0x3ad561.Options[_0x253b53];
    let _0x279019 = "";
    for (let _0x1fbfcc in _0x3b9ca4) {
      _0x279019 += "<div class=\"row editrspace\">";
      _0x279019 += "<div class=\"col-md-6\"><label class=\"col-form-label form-control-sm laleft\">" + _0x3b9ca4[_0x1fbfcc][0] + "</label></div>";
      _0x279019 += "<div class=\"col-md-6 edcol checkspfix\">";
      if (Array.isArray(_0x3b9ca4[_0x1fbfcc][2])) {
        if (_0x3b9ca4[_0x1fbfcc][3] != null) {
          for (let _0x2c02a0 = 0; _0x2c02a0 < _0x3b9ca4[_0x1fbfcc][2].length; _0x2c02a0++) {
            let _0x410f66 = "";
            if (_0x3b9ca4[_0x1fbfcc][1] & 1 << _0x2c02a0) {
              _0x410f66 = "checked";
            }
            _0x279019 += "<div class=\"row editrspace\">";
            _0x279019 += "<div class=\"col-lg-2\">";
            _0x279019 += "<div class=\"custom-control custom-checkbox\">";
            _0x279019 += "<input type=\"checkbox\" class=\"custom-control-input\" id=\"" + ["idc", _0x1fbfcc, _0x2c02a0].join("_") + "\" " + _0x410f66 + " />";
            _0x279019 += "<label class=\"custom-control-label cursoric wifix\" for=\"" + ["idc", _0x1fbfcc, _0x2c02a0].join("_") + "\">" + (_0x3b9ca4[_0x1fbfcc][2][_0x2c02a0] || "") + "</label>";
            _0x279019 += "</div>";
            _0x279019 += "</div>";
            _0x279019 += "</div>";
          }
        } else {
          _0x279019 += "<select class=\"form-control form-control-sm\" id=\"" + ["ids", _0x1fbfcc].join("_") + "\">";
          for (let _0x56451a = 0; _0x56451a < _0x3b9ca4[_0x1fbfcc][2].length; _0x56451a++) {
            let _0x24b3a8 = _0x3b9ca4[_0x1fbfcc][2][_0x56451a];
            _0x279019 += "<option value=\"" + _0x56451a + "\" " + (_0x56451a == _0x3b9ca4[_0x1fbfcc][1] ? " selected" : "") + ">" + _0x24b3a8 + "</option>";
          }
          _0x279019 += "</select>";
        }
      } else if (_0x3b9ca4[_0x1fbfcc][2] != null) {
        _0x279019 += "<input maxlength=\"" + (_0x253b53 == 114 ? "19" : "") + "\" type=\"text\" class=\"form-control form-control-sm\" value=\"" + (_0x3b9ca4[_0x1fbfcc][1] || "") + "\" id=\"" + ["idt", _0x1fbfcc].join("_") + "\">";
      } else {
        _0x279019 += "<select class=\"form-control form-control-sm\" id=\"" + ["ids", _0x1fbfcc].join("_") + "\">";
        for (let _0x2aeee6 in _0x3ad561.Status) {
          let _0x4529e8 = _0x3ad561.Status[_0x2aeee6] == _0x3b9ca4[_0x1fbfcc][1] ? " selected" : "";
          _0x279019 += "<option value=\"" + _0x3ad561.Status[_0x2aeee6] + "\" " + _0x4529e8 + ">" + _0x2aeee6 + "</option>";
        }
        _0x279019 += "</select>";
      }
      _0x279019 += "</div></div>";
    }
    let _0x23cbc9 = {};
    let _0x28e326 = {};
    let _0x2f780d = {};
    for (let _0x54af57 in _0x3b9ca4) {
      _0x2f780d[_0x54af57] = _0x3b9ca4[_0x54af57][1];
      if (_0x3b9ca4[_0x54af57][2] != null || _0x253b53 == 206) {
        _0x23cbc9[_0x54af57] = _0x3b9ca4[_0x54af57][2];
      }
      if (_0x3b9ca4[_0x54af57][3] != null) {
        _0x28e326[_0x54af57] = _0x3b9ca4[_0x54af57][3];
      }
    }
    if (_0x253b53 == 206 || _0x253b53 == 220) {
      _0x2f780d = {};
      for (let _0x120eeb in _0x3b9ca4) {
        let _0x200b1a = "";
        if (_0x253b53 == 220) {
          if (_0x120eeb == "cv") {
            _0x200b1a = 3;
          }
          if (_0x120eeb == "rgd") {
            _0x200b1a = 3;
          }
        }
        _0x2f780d[_0x120eeb] = _0x253b53 == 206 ? "" : _0x200b1a;
      }
    }
    let _0x32824a = $("#gp_content");
    let _0x2ad393 = $("#modalGp");
    let _0x42ac1c = $("#gp_title");
    _0x32824a.html(_0x279019);
    _0x42ac1c.html("<span data-localize='chats.edit'>edit</span> " + _0x4aba2c);
    if (_0x253b53 == 206) {
      let _0xc0b2c2 = getPostParam();
      _0xc0b2c2.GetLang = 1;
      $(document.body).css({
        cursor: "wait"
      });
      urlPost(url, _0xc0b2c2).then(function (_0x3e6866) {
        $(document.body).css({
          cursor: "default"
        });
        let _0x4641fd = "{}";
        if (_0x3e6866.Err.Lang) {
          _0x4641fd = JSON.stringify(_0x3e6866.Err.Lang);
        }
        document.getElementById("gi_206").value = _0x4641fd;
        Load(_0x253b53, _0x2f780d, _0x23cbc9, _0x28e326);
        _0x2ad393.modal();
      });
    } else {
      Load(_0x253b53, _0x2f780d, _0x23cbc9, _0x28e326);
      _0x2ad393.modal();
    }
    $("#gp_ok").off("click").click(function (_0x31f086) {
      _0x31f086.preventDefault();
      changeParent(_0x253b53, _0x2f780d, _0x23cbc9, _0x28e326);
      if (_0x253b53 == 206) {
        saveLang();
      }
      _0x2ad393.modal("hide");
    });
    $("#gp_default").off("click").click(function (_0x114bbf) {
      _0x114bbf.preventDefault();
      setDefault(_0x2f780d);
    });
    localize(["chats"]);
  });
}
function saveLang(_0x4f402a) {
  if (!xConfig.obj || xConfig.obj.password == null || xConfig.obj.TokenKey == null) {
    return $("#tabreturn").click();
  }
  xConfig.obj;
  let _0x1f7d88 = getPostParam();
  if (_0x4f402a) {
    _0x1f7d88.SetLang = _0x4f402a;
  } else {
    let _0x44ad94 = document.getElementById("gi_206");
    _0x1f7d88.SetLang = _0x44ad94.value || "{}";
  }
  $(document.body).css({
    cursor: "wait"
  });
  urlPost(url, filter(_0x1f7d88)).then(function (_0x36e8f1) {
    $(document.body).css({
      cursor: "default"
    });
  });
}
function changeParent(_0x495375, _0x2dae3d, _0x3fd1c5, _0x300da8) {
  var _0x1407c0;
  var _0x4985de;
  var _0x43e829;
  var _0x2b32e4 = 0;
  var _0xe6fcf = 0;
  for (_0x1407c0 in _0x2dae3d) {
    for (_0x43e829 = 0; _0x43e829 < 8 && (_0x4985de = document.getElementById("idc_" + _0x1407c0 + "_" + _0x43e829)); _0x43e829++) {
      _0x2b32e4 = 1;
      if (_0x4985de.checked) {
        _0xe6fcf |= 1 << _0x43e829;
      }
    }
    if (_0x2b32e4) {
      if ((_0xe6fcf &= _0x300da8[_0x1407c0]) == _0x2dae3d[_0x1407c0]) {
        delete _0x2dae3d[_0x1407c0];
      } else {
        _0x2dae3d[_0x1407c0] = filter(_0xe6fcf);
      }
      _0x2b32e4 = 0;
    }
    if (_0x4985de = document.getElementById("idt_" + _0x1407c0)) {
      if (_0x4985de.value == _0x2dae3d[_0x1407c0]) {
        delete _0x2dae3d[_0x1407c0];
      } else if (_0x300da8[_0x1407c0]) {
        _0x2dae3d[_0x1407c0] = filter(parseFloat(_0x4985de.value));
        if (isNaN(_0x4985de.value)) {
          delete _0x2dae3d[_0x1407c0];
        } else if (_0x300da8[_0x1407c0]) {
          if (_0x2dae3d[_0x1407c0] > parseFloat(_0x300da8[_0x1407c0])) {
            _0x2dae3d[_0x1407c0] = _0x300da8[_0x1407c0];
          }
          if (_0x2dae3d[_0x1407c0] < parseFloat(_0x3fd1c5[_0x1407c0])) {
            _0x2dae3d[_0x1407c0] = _0x3fd1c5[_0x1407c0];
          }
        }
      } else {
        _0x2dae3d[_0x1407c0] = filter(_0x4985de.value);
      }
    }
    if (_0x4985de = document.getElementById("ids_" + _0x1407c0)) {
      if (_0x4985de[_0x4985de.selectedIndex].value == _0x2dae3d[_0x1407c0]) {
        delete _0x2dae3d[_0x1407c0];
      } else {
        _0x2dae3d[_0x1407c0] = _0x4985de[_0x4985de.selectedIndex].value;
      }
    }
  }
  document.getElementById("gi_" + _0x495375).value = JSON.stringify(_0x2dae3d);
}
function escapeHTML(_0x2882cb) {
  if (_0x2882cb == null) {
    return "";
  } else {
    return _0x2882cb.replace(/"/g, "&quot;");
  }
}
function Load(_0x540d32, _0x3a8f86, _0x36026c, _0x1146d5) {
  var _0x170f27;
  var _0x5795e0;
  var _0x196d21;
  var _0x414d37 = document.getElementById("gi_" + _0x540d32);
  try {
    var _0x1609f7 = JSON.parse(_0x414d37.value);
  } catch (_0x2e4953) {
    _0x1609f7 = {};
  }
  for (_0x170f27 in _0x3a8f86) {
    if (_0x1609f7[_0x170f27] == null) {
      _0x1609f7[_0x170f27] = _0x3a8f86[_0x170f27];
    }
    _0x196d21 = 0;
    for (; _0x196d21 < 8 && (_0x5795e0 = document.getElementById("idc_" + _0x170f27 + "_" + _0x196d21)); _0x196d21++) {
      _0x5795e0.checked = _0x1609f7[_0x170f27] & 1 << _0x196d21;
    }
    if (_0x5795e0 = document.getElementById("idt_" + _0x170f27)) {
      _0x5795e0.value = _0x1609f7[_0x170f27];
    }
    if (_0x5795e0 = document.getElementById("ids_" + _0x170f27)) {
      for (var _0x1afe65 = 0; _0x1afe65 < _0x5795e0.length; _0x1afe65++) {
        if (_0x5795e0[_0x1afe65].value == _0x1609f7[_0x170f27]) {
          _0x5795e0.selectedIndex = _0x1afe65;
        }
      }
    }
  }
}
function setDefault(_0x554342) {
  var _0x3ad174;
  var _0x36f078;
  var _0x381b1e;
  for (_0x3ad174 in _0x554342) {
    for (_0x381b1e = 0; _0x381b1e < 8 && (_0x36f078 = document.getElementById("idc_" + _0x3ad174 + "_" + _0x381b1e)); _0x381b1e++) {
      _0x36f078.checked = _0x554342[_0x3ad174] & 1 << _0x381b1e;
    }
    if (_0x36f078 = document.getElementById("idt_" + _0x3ad174)) {
      _0x36f078.value = _0x554342[_0x3ad174] == "undefined" ? "" : _0x554342[_0x3ad174];
    }
    if (_0x36f078 = document.getElementById("ids_" + _0x3ad174)) {
      for (var _0x83751e = 0; _0x83751e < _0x36f078.length; _0x83751e++) {
        if (_0x36f078[_0x83751e].value == _0x554342[_0x3ad174]) {
          _0x36f078.selectedIndex = _0x83751e;
        }
      }
    }
  }
}
function updateConfigObj(_0xfbccf0) {
  let _0x2710ac = xConfig.obj.Err;
  _0x2710ac.background = _0xfbccf0.background;
  if (_0xfbccf0.Lang !== undefined) {
    _0x2710ac.Lang = _0xfbccf0.Lang;
  }
  _0x2710ac.www = _0xfbccf0.www;
  _0x2710ac.tags = _0xfbccf0.tags;
  _0x2710ac.descrip = _0xfbccf0.descrip;
  if (_0xfbccf0.flags !== undefined) {
    _0x2710ac.flags = _0xfbccf0.flags;
  }
  if (_0xfbccf0.SetFlags !== undefined) {
    _0x2710ac.flags = _0xfbccf0.SetFlags;
  }
  if (_0xfbccf0.SetBuddy !== undefined) {
    let _0x34db70 = _0xfbccf0.background.split(";=");
    _0x34db70[1] = _0xfbccf0.SetBuddy;
    _0x2710ac.background = _0x34db70.join(";=");
  }
  return _0x2710ac;
}
function refreshToken(_0x5dbe73) {
  let _0x2384dd = xConfig.obj;
  let _0x3a45e4 = _0x2384dd.TokenKey.split(".");
  _0x3a45e4[2] &&= _0x5dbe73;
  _0x2384dd.TokenKey = _0x3a45e4.join(".");
  return _0x2384dd.TokenKey;
}
function getUserId() {
  if (xConfig.id) {
    return xConfig.id;
  } else {
    return 0;
  }
}
function getPostParam() {
  let _0x43cb33 = xConfig.obj;
  let _0x2607b8 = getTodo();
  _0x2607b8 &&= JSON.parse(_0x2607b8);
  let _0x5ec64e = {
    name: _0x43cb33.GroupName,
    password: _0x43cb33.password,
    TokenKey: _0x43cb33.TokenKey
  };
  _0x5ec64e.MainOwner = getUserId();
  _0x5ec64e.DeviceId = _0x2607b8 && _0x2607b8.DeviceId || "";
  _0x5ec64e.PassHash = _0x2607b8 && _0x2607b8.PassHash || "";
  return filter(_0x5ec64e);
}
function refreshChat() {
  let _0x133852 = getPostParam();
  _0x133852.RefreshChat = 1;
  $(document.body).css({
    cursor: "wait"
  });
  urlPost(url, _0x133852).then(function (_0x1ceabc) {
    $(document.body).css({
      cursor: "default"
    });
  });
}
function initColorsPickers() {
  let _0x5b6698 = {
    theme: "nano",
    useAsButton: true,
    closeOnScroll: false,
    swatches: null,
    lockOpacity: false,
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
  for (let _0x2730fd = 0; _0x2730fd <= 9; _0x2730fd++) {
    _0x5b6698.el = "#button" + _0x2730fd;
    if ($("#button" + _0x2730fd).length) {
      pickersList[_0x2730fd] = Pickr.create(_0x5b6698);
      pickersList[_0x2730fd].id = "button" + _0x2730fd;
      let _0x4e9244 = getIDFromButton(pickersList[_0x2730fd].id);
      if (_0x4e9244) {
        let _0x3eca0a = $("#" + _0x4e9244);
        if (_0x3eca0a) {
          let _0xae17ee = _0x3eca0a.val();
          if (_0xae17ee.charAt(0) == "#" && _0xae17ee.length == 7) {
            let _0x5746ad = isColorLight(_0xae17ee);
            const _0x5be92a = {
              "background-color": _0xae17ee,
              color: _0x5746ad ? "#000" : "#FFF"
            };
            _0x3eca0a.css(_0x5be92a);
          }
          _0x3eca0a.off("keyup").on("keyup", function () {
            const _0x9c93d8 = {};
            let _0x440ba2 = $(this).val();
            if (_0x440ba2.charAt(0) !== "#" || _0x440ba2.charAt(0) == "#" && _0x440ba2.length !== 7) {
              _0x3eca0a.css({
                "background-color": "",
                color: "#001"
              });
            } else {
              let _0x27603d = isColorLight(_0x440ba2);
              const _0xa842db = {
                "background-color": _0x440ba2,
                color: _0x27603d ? "#000" : "#FFF"
              };
              _0x3eca0a.css(_0xa842db);
            }
          });
        }
      }
      pickersList[_0x2730fd].on("save", (_0x54032d, _0x114ce2) => {
        if (_0x4e9244) {
          let _0x4f4b5f = $("#" + _0x4e9244);
          let _0xe81007 = _0x54032d.toHEXA().toString();
          let _0x3d32e6 = isColorLight(_0xe81007);
          const _0x4544e7 = {
            "background-color": _0xe81007,
            color: _0x3d32e6 ? "#000" : "#FFF"
          };
          _0x4f4b5f.css(_0x4544e7);
          _0x4f4b5f.val(_0xe81007);
        }
      });
      pickersList[_0x2730fd].on("show", (_0x1b7dda, _0x534a45) => {
        if (_0x4e9244) {
          let _0xa3287d = $("#" + _0x4e9244);
          if (_0xa3287d.prop("disabled")) {
            pickersList[_0x2730fd].hide();
            return;
          }
          pickersList[_0x2730fd].setColor(_0xa3287d.val());
        }
      });
    }
  }
}
function getIDFromButton(_0x3b1090) {
  if (!_0x3b1090) {
    return false;
  }
  switch (_0x3b1090) {
    case "button0":
      return "gbackground";
    case "button1":
      return "cbackground";
    case "button2":
      return "buttoncolor";
    case "button3":
      return "portrait";
    case "button4":
      return "landscape";
    case "button5":
      return "glow";
  }
}
function filterPowers(_0x587420) {
  if (!_0x587420) {
    return [];
  }
  let _0x67b53e = {};
  let _0x45f81f = _0x587420.Powers || _0x587420.SetPowers;
  if (!_0x45f81f) {
    return [];
  }
  for (let _0x270a82 in _0x45f81f) {
    let _0x28be11 = _0x45f81f[_0x270a82].split("|");
    if (_0x28be11[0].length > 0 && _0x28be11[1] == 1) {
      _0x67b53e[_0x270a82] = 0;
      let _0x2b06fa = _0x28be11[0].split(":");
      if (_0x2b06fa.length >= 1) {
        for (let _0x2e5889 in _0x2b06fa) {
          if (!_0x2b06fa[_0x2e5889]) {
            continue;
          }
          let _0x54dba8 = _0x2b06fa[_0x2e5889].split("=");
          if (_0x54dba8[0]) {
            _0x54dba8[1] ||= 1;
            _0x67b53e[_0x270a82] += parseInt(_0x54dba8[1]);
          }
        }
      }
    }
  }
  return _0x67b53e;
}
function hasPower(_0x3eeefb) {
  if (!_0x3eeefb) {
    return false;
  }
  let _0x47f530 = xConfig.obj.arrPow;
  return !!_0x47f530 && _0x47f530[_0x3eeefb] != null && _0x47f530[_0x3eeefb];
}
function updateTabs() {
  let _0x491b7c = xConfig.obj.Err.mains;
  let _0x621881 = xConfig.id;
  if (function (_0x1f9a57, _0xa4e0a9) {
    return _0x1f9a57 || _0xa4e0a9;
  }(!_0x491b7c, !_0x621881)) {
    return;
  }
  _0x491b7c = JSON.parse(_0x491b7c);
  if (_0x491b7c[_0x621881] == null) {
    return;
  }
  let _0x5265bc = _0x491b7c[_0x621881];
  let _0x131696 = [];
  let _0x718e7c = true;
  if (_0x5265bc !== -1) {
    for (let _0x5c8832 in permissions) {
      let _0x43f4ad = permissions[_0x5c8832].replace(/_/gi, "");
      if ((_0x5265bc & _0x5c8832) == 0) {
        if (_0x43f4ad == "appearance") {
          _0x718e7c = false;
        }
        $("#tab" + _0x43f4ad).hide();
        $("#" + _0x43f4ad).remove();
      } else {
        _0x131696.push("tab" + _0x43f4ad);
      }
    }
  }
  $("#tabmainowners").hide();
  $("#mainowners").remove();
  $("#tabmiscellaneous").hide();
  $("#miscellaneous").remove();
  if (!_0x718e7c) {
    if (_0x131696.length > 0) {
      setTimeout(() => {
        $("#" + _0x131696[0]).click();
      }, 0);
    }
  }
}
function getTodo() {
  return localStorage.getItem("todo");
}
function enablePreview() {
  if (xConfig.obj.GroupName == null) {
    return false;
  }
  $("#SettingsPreview, #AppearancePreview, #TabsPreview").off("click").on("click", function (_0x256fa9) {
    _0x256fa9.preventDefault();
    window.open("//rxat.ro/" + xConfig.obj.GroupName + "?&preview=true&cb=" + Math.floor(Date.now() / 1000), "preview", "toolbar=1,resizable=1,scrollbars=1");
  });
}
function doLogout(_0x139df6) {
  DoReturn("editgroup");
  DoTask("editgroup");
  doErrorMsg($("#editgrouperr"), _0x139df6);
}
function initSlimSeletect(_0x1f84fa) {
  if (!_0x1f84fa || typeof _0x1f84fa !== "object") {
    console.warn("SlimSelect: Invalid configuration object");
    return;
  }
  for (let _0x3e3ec9 in _0x1f84fa) {
    const elementId = _0x1f84fa[_0x3e3ec9];
    const selectElement = document.getElementById(elementId);
    if (!selectElement) {
      console.warn("SlimSelect: Select element not found:", elementId);
      continue;
    }
    try {
      if (typeof SlimSelect === "undefined") {
        console.warn("SlimSelect: Library not loaded");
        continue;
      }
      slimList[elementId] = new SlimSelect({
        select: "#" + elementId,
        showSearch: true,
        closeOnSelect: true,
        placeholder: " ",
        searchPlaceholder: " ",
        searchFocus: false
      });
    } catch (error) {
      console.warn("SlimSelect: Error initializing", elementId, error);
    }
  }
}
function initToolTip(_0x4fbc2e) {
  var _0x216f99 = [];
  if (_0x4fbc2e) {
    _0x4fbc2e.tooltip();
    _0x216f99.push(setTranslateDiv(_0x4fbc2e[0] || _0x4fbc2e, "tooltips"));
  } else {
    $("[data-toggle=\"tooltip\"]").tooltip({
      trigger: "hover"
    });
    let _0x242fea = document.querySelectorAll("[data-toggle=\"tooltip\"]");
    if (_0x242fea.length > 0) {
      _0x242fea.forEach(function (_0x15abc8) {
        _0x216f99.push(setTranslateDiv(_0x15abc8, "tooltips"));
      });
    }
  }
  if (_0x216f99.length > 0 && xConfig.lang !== "en") {
    localize(["chats"]);
    updateNodeTranslate(_0x216f99);
  }
}
function initPopover() {
  let _0x15d342 = $(".vermid");
  _0x15d342.popover({
    trigger: "hover"
  });
  _0x15d342.off("click").on("click", function (_0x392d1d) {
    _0x392d1d.preventDefault();
    let _0x5cdae0 = _0x392d1d.target.dataset;
    if (!_0x5cdae0.content && (_0x5cdae0 = _0x392d1d.target.parentNode.dataset, !_0x5cdae0.content)) {
      return;
    }
    let _0x1b2eb8 = _0x5cdae0.content.replace(/:/g, " ");
    var _0x54fa3d = document.createElement("textarea");
    _0x54fa3d.value = _0x1b2eb8;
    _0x54fa3d.style.top = "0";
    _0x54fa3d.style.left = "0";
    _0x54fa3d.style.position = "fixed";
    document.body.appendChild(_0x54fa3d);
    _0x54fa3d.focus();
    _0x54fa3d.select();
    document.execCommand("copy");
    document.body.removeChild(_0x54fa3d);
  });
  $(".nosel").tooltip();
  localize(["chats"]);
}
function initStuff() {
  $("a.btn").on("click", function (_0x3a0150) {
    _0x3a0150.preventDefault();
  });
  handlePopover();
  $("#checkall").off("click").on("click", function () {
    if ($(this).is(":checked")) {
      $("#grouppowers .custom-control-input").each(function () {
        let _0x359c15 = $(this).closest(".dataSearch");
        if ($(this).is(":disabled") == 0 && !_0x359c15.hasClass("d-none")) {
          $(this).prop("checked", true);
        }
      });
    } else {
      $("#grouppowers .custom-control-input").each(function () {
        let _0xd2948c = $(this).closest(".dataSearch");
        if ($(this).is(":disabled") == 0 && !_0xd2948c.hasClass("d-none")) {
          $(this).prop("checked", false);
        }
      });
    }
  });
  $("textarea").keyup(function () {
    updateCharCount($(this).val().length);
  });
  document.querySelectorAll(".PassReveal").forEach(_0x694722 => {
    _0x694722.addEventListener("click", _0x3bfb44 => {
      PassReveal($(_0x3bfb44.target));
    });
  });
  $("a[data-toggle=\"tab\"]").on("shown.bs.tab", function (_0x3e9661) {
    var _0x271ee5 = _0x3e9661.target.attributes.href.value;
    $(_0x271ee5 + " input").focus();
  });
  $(".gpsearch, .holder").on("focus", function (_0x3990e0) {
    $(".holder").hide();
  });
  $(".gpsearch, .holder").on("blur", function (_0x146912) {
    if ($(this).val().length == 0) {
      $(".holder").show();
    }
  });
}
function updateCheckBoxState() {
  updateCheckAll();
  $("#grouppowers .dataSearch .custom-control-input").off("click").on("click", function (_0x44cd1b) {
    updateCheckAll();
  });
}
function updateCheckAll() {
  $("#grouppowers .dataSearch .custom-control-input:checked").length;
  if ($("#grouppowers .dataSearch .custom-control-input").not(":checked, :disabled").length == 0) {
    $("#checkall").prop("checked", true);
  } else {
    $("#checkall").prop("checked", false);
  }
}
function updateCharCount(_0x23140e) {
  var _0x43c02e = _0x23140e;
  var _0x3541f1 = $("#current");
  $("#maximum");
  $("#the-count");
  _0x3541f1.text(_0x43c02e);
}
$("#summernote").summernote({
  height: 200,
  minHeight: 100,
  maxHeight: 700,
  disableDragAndDrop: true,
  toolbar: [["font", ["bold", "underline", "italic", "clear"]], ["fontname", ["fontname", "fontsize"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["insert", ["link", "picture"]], ["view", ["codeview"]]],
  callbacks: {
    onImageLinkInsert: function (_0x539fb0) {
      if (_0x539fb0.length) {
        $(this).summernote("insertImage", _0x539fb0);
      }
    }
  }
});
var imageUploadDiv = $("div.note-group-select-from-files");
if (imageUploadDiv.length) {
  imageUploadDiv.remove();
}
var imageUrlDiv = $("div.note-group-image-url");
if (imageUrlDiv.length) {
  imageUrlDiv.append("<div class='mt-2'><a href='https://util.rxat.ro/wiki/Images' target='_blank' class='nodeco'><span data-localize='chats.permittedimg'>See permitted image providers</span>.</a></div>");
}
$(".note-color button.dropdown-toggle").html("<i class=\"note-icon-caret\"></i>");
$(".noread").attr("readonly", true);
$(".noread").css("background-color", "white");
$(".noread").click(function () {
  $(".noread").attr("readonly", false);
});
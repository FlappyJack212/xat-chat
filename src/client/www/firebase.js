'use strict';

var FIREBASE_VERSION = "8.0.1";
loadJsModule("https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/firebase-app.js").then(function () {
  return loadJsModule("https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/firebase-messaging.js");
}).then(function () {
  firebase.initializeApp({
    apiKey: "AIzaSyDKiqEYI8X0MwZnuy3Hz5Fmvb-zzxeMZ6M",
    authDomain: "xat-chat-af183.firebaseapp.com",
    projectId: "xat-chat-af183",
    storageBucket: "xat-chat-af183.firebasestorage.app",
    messagingSenderId: "247597970840",
    appId: "1:247597970840:web:1cd13042807c4d406e27ed",
    measurementId: "G-1S1LT6J1NL"
  });
}).then(function () {
  var _0x663e7a = firebase.messaging();
  function _0x5c287b() {
    _0x663e7a.getToken().then(function (_0x479840) {
      if (_0x479840) {
        (function (_0x2a50cf) {
          OfflinePushToken = "g:" + _0x2a50cf;
        })(_0x479840);
      } else {
        console.log("FBM:No Instance ID token available. Request permission to generate one.");
      }
    }).catch(function (_0x3d03d) {
      console.error("FBM:An error occurred while retrieving token. ", _0x3d03d);
    });
  }
  _0x663e7a.onTokenRefresh(function () {
    _0x663e7a.getToken().then(function (_0x473357) {
      console.log("FBM:Token refreshed.");
      _0x5c287b();
    }).catch(function (_0x41dc69) {
      console.error("FBM:Unable to retrieve refreshed token ", _0x41dc69);
    });
  });
  _0x663e7a.onMessage(function (_0x5f414d) {
    console.log("FBM:Message received. ", _0x5f414d);
    var _0x137c1f = _0x5f414d.notification.title;
    if (_0x137c1f.substring(0, 6) != "CONF;=") {
      if (LocalNotify) {
        notify.show(_0x137c1f, _0x5f414d.notification.body);
      }
    } else {
      activityToC("PushRecieved", "", _0x137c1f);
    }
  });
  _0x5c287b();
}).catch(function (_0x4fcee6) {
  console.error("FBM:", _0x4fcee6);
});
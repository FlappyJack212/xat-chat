(function () {
    "use strict";
  
    function e() {
      this.init();
    }
    e.prototype = {
      init: function () {
        var e = this || n;
        e._counter = 1000;
        e._codecs = {};
        e._howls = [];
        e._muted = false;
        e._volume = 1;
        e._canPlayEvent = "canplaythrough";
        e._navigator = typeof window != "undefined" && window.navigator ? window.navigator : null;
        e.masterGain = null;
        e.noAudio = false;
        e.usingWebAudio = true;
        e.autoSuspend = true;
        e.ctx = null;
        e.mobileAutoEnable = true;
        e._setup();
        return e;
      },
      volume: function (e) {
        var t = this || n;
        e = parseFloat(e);
        if (!t.ctx) {
          _();
        }
        if (e !== undefined && e >= 0 && e <= 1) {
          t._volume = e;
          if (t._muted) {
            return t;
          }
          if (t.usingWebAudio) {
            t.masterGain.gain.setValueAtTime(e, n.ctx.currentTime);
          }
          for (var o = 0; o < t._howls.length; o++) {
            if (!t._howls[o]._webAudio) {
              for (var r = t._howls[o]._getSoundIds(), a = 0; a < r.length; a++) {
                var i = t._howls[o]._soundById(r[a]);
                if (i && i._node) {
                  i._node.volume = i._volume * e;
                }
              }
            }
          }
          return t;
        }
        return t._volume;
      },
      mute: function (e) {
        var t = this || n;
        if (!t.ctx) {
          _();
        }
        t._muted = e;
        if (t.usingWebAudio) {
          t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, n.ctx.currentTime);
        }
        for (var o = 0; o < t._howls.length; o++) {
          if (!t._howls[o]._webAudio) {
            for (var r = t._howls[o]._getSoundIds(), a = 0; a < r.length; a++) {
              var i = t._howls[o]._soundById(r[a]);
              if (i && i._node) {
                i._node.muted = !!e || i._muted;
              }
            }
          }
        }
        return t;
      },
      unload: function () {
        var e = this || n;
        for (var t = e._howls.length - 1; t >= 0; t--) {
          e._howls[t].unload();
        }
        if (e.usingWebAudio && e.ctx && e.ctx.close !== undefined) {
          e.ctx.close();
          e.ctx = null;
          _();
        }
        return e;
      },
      codecs: function (e) {
        return (this || n)._codecs[e.replace(/^x-/, "")];
      },
      _setup: function () {
        var e = this || n;
        e.state = e.ctx && e.ctx.state || "running";
        e._autoSuspend();
        if (!e.usingWebAudio) {
          if (typeof Audio != "undefined") {
            try {
              if (new Audio().oncanplaythrough === undefined) {
                e._canPlayEvent = "canplay";
              }
            } catch (n) {
              e.noAudio = true;
            }
          } else {
            e.noAudio = true;
          }
        }
        try {
          if (new Audio().muted) {
            e.noAudio = true;
          }
        } catch (e) {}
        if (!e.noAudio) {
          e._setupCodecs();
        }
        return e;
      },
      _setupCodecs: function () {
        var e = this || n;
        var t = null;
        try {
          t = typeof Audio != "undefined" ? new Audio() : null;
        } catch (n) {
          return e;
        }
        if (!t || typeof t.canPlayType != "function") {
          return e;
        }
        var o = t.canPlayType("audio/mpeg;").replace(/^no$/, "");
        var r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g);
        var a = r && parseInt(r[0].split("/")[1], 10) < 33;
        e._codecs = {
          mp3: !a && (!!o || !!t.canPlayType("audio/mp3;").replace(/^no$/, "")),
          mpeg: !!o,
          opus: !!t.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, ""),
          ogg: !!t.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
          oga: !!t.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
          wav: !!t.canPlayType("audio/wav; codecs=\"1\"").replace(/^no$/, ""),
          aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
          caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
          m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
          mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
          weba: !!t.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, ""),
          webm: !!t.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, ""),
          dolby: !!t.canPlayType("audio/mp4; codecs=\"ec-3\"").replace(/^no$/, ""),
          flac: !!(t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")).replace(/^no$/, "")
        };
        return e;
      },
      _enableMobileAudio: function () {
        var e = this || n;
        var t = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent);
        var o = !!("ontouchend" in window) || !!e._navigator && !!(e._navigator.maxTouchPoints > 0) || !!e._navigator && !!(e._navigator.msMaxTouchPoints > 0);
        if (!e._mobileEnabled && e.ctx && (t || o)) {
          e._mobileEnabled = false;
          if (!e._mobileUnloaded && e.ctx.sampleRate !== 44100) {
            e._mobileUnloaded = true;
            e.unload();
          }
          e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
          var r = function t() {
            n._autoResume();
            var o = e.ctx.createBufferSource();
            o.buffer = e._scratchBuffer;
            o.connect(e.ctx.destination);
            if (o.start === undefined) {
              o.noteOn(0);
            } else {
              o.start(0);
            }
            if (typeof e.ctx.resume == "function") {
              e.ctx.resume();
            }
            o.onended = function () {
              o.disconnect(0);
              e._mobileEnabled = true;
              e.mobileAutoEnable = false;
              document.removeEventListener("touchstart", t, true);
              document.removeEventListener("touchend", t, true);
            };
          };
          document.addEventListener("touchstart", r, true);
          document.addEventListener("touchend", r, true);
          return e;
        }
      },
      _autoSuspend: function () {
        var e = this;
        if (e.autoSuspend && e.ctx && e.ctx.suspend !== undefined && n.usingWebAudio) {
          for (var t = 0; t < e._howls.length; t++) {
            if (e._howls[t]._webAudio) {
              for (var o = 0; o < e._howls[t]._sounds.length; o++) {
                if (!e._howls[t]._sounds[o]._paused) {
                  return e;
                }
              }
            }
          }
          if (e._suspendTimer) {
            clearTimeout(e._suspendTimer);
          }
          e._suspendTimer = setTimeout(function () {
            if (e.autoSuspend) {
              e._suspendTimer = null;
              e.state = "suspending";
              e.ctx.suspend().then(function () {
                e.state = "suspended";
                if (e._resumeAfterSuspend) {
                  delete e._resumeAfterSuspend;
                  e._autoResume();
                }
              });
            }
          }, 30000);
          return e;
        }
      },
      _autoResume: function () {
        var e = this;
        if (e.ctx && e.ctx.resume !== undefined && n.usingWebAudio) {
          if (e.state === "running" && e._suspendTimer) {
            clearTimeout(e._suspendTimer);
            e._suspendTimer = null;
          } else if (e.state === "suspended") {
            e.ctx.resume().then(function () {
              e.state = "running";
              for (var n = 0; n < e._howls.length; n++) {
                e._howls[n]._emit("resume");
              }
            });
            if (e._suspendTimer) {
              clearTimeout(e._suspendTimer);
              e._suspendTimer = null;
            }
          } else if (e.state === "suspending") {
            e._resumeAfterSuspend = true;
          }
          return e;
        }
      }
    };
    var n = new e();
    function t(e) {
      if (e.src && e.src.length !== 0) {
        this.init(e);
      } else {
        console.error("An array of source files must be passed with any new Howl.");
      }
    }
    t.prototype = {
      init: function (e) {
        var t = this;
        if (!n.ctx) {
          _();
        }
        t._autoplay = e.autoplay || false;
        t._format = typeof e.format != "string" ? e.format : [e.format];
        t._html5 = e.html5 || false;
        t._muted = e.mute || false;
        t._loop = e.loop || false;
        t._pool = e.pool || 5;
        t._preload = typeof e.preload != "boolean" || e.preload;
        t._rate = e.rate || 1;
        t._sprite = e.sprite || {};
        t._src = typeof e.src != "string" ? e.src : [e.src];
        t._volume = e.volume !== undefined ? e.volume : 1;
        t._xhrWithCredentials = e.xhrWithCredentials || false;
        t._duration = 0;
        t._state = "unloaded";
        t._sounds = [];
        t._endTimers = {};
        t._queue = [];
        t._playLock = false;
        t._onend = e.onend ? [{
          fn: e.onend
        }] : [];
        t._onfade = e.onfade ? [{
          fn: e.onfade
        }] : [];
        t._onload = e.onload ? [{
          fn: e.onload
        }] : [];
        t._onloaderror = e.onloaderror ? [{
          fn: e.onloaderror
        }] : [];
        t._onplayerror = e.onplayerror ? [{
          fn: e.onplayerror
        }] : [];
        t._onpause = e.onpause ? [{
          fn: e.onpause
        }] : [];
        t._onplay = e.onplay ? [{
          fn: e.onplay
        }] : [];
        t._onstop = e.onstop ? [{
          fn: e.onstop
        }] : [];
        t._onmute = e.onmute ? [{
          fn: e.onmute
        }] : [];
        t._onvolume = e.onvolume ? [{
          fn: e.onvolume
        }] : [];
        t._onrate = e.onrate ? [{
          fn: e.onrate
        }] : [];
        t._onseek = e.onseek ? [{
          fn: e.onseek
        }] : [];
        t._onresume = [];
        t._webAudio = n.usingWebAudio && !t._html5;
        if (n.ctx !== undefined && n.ctx && n.mobileAutoEnable) {
          n._enableMobileAudio();
        }
        n._howls.push(t);
        if (t._autoplay) {
          t._queue.push({
            event: "play",
            action: function () {
              t.play();
            }
          });
        }
        if (t._preload) {
          t.load();
        }
        return t;
      },
      load: function () {
        var e = this;
        var t = null;
        if (n.noAudio) {
          e._emit("loaderror", null, "No audio support.");
        } else {
          if (typeof e._src == "string") {
            e._src = [e._src];
          }
          for (var r = 0; r < e._src.length; r++) {
            var i;
            var u;
            if (e._format && e._format[r]) {
              i = e._format[r];
            } else {
              if (typeof (u = e._src[r]) != "string") {
                e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              if (!(i = /^data:audio\/([^;,]+);/i.exec(u))) {
                i = /\.([^.]+)$/.exec(u.split("?", 1)[0]);
              }
              i &&= i[1].toLowerCase();
            }
            if (!i) {
              console.warn("No file extension was found. Consider using the \"format\" property or specify an extension.");
            }
            if (i && n.codecs(i)) {
              t = e._src[r];
              break;
            }
          }
          if (t) {
            e._src = t;
            e._state = "loading";
            if (window.location.protocol === "https:" && t.slice(0, 5) === "http:") {
              e._html5 = true;
              e._webAudio = false;
            }
            new o(e);
            if (e._webAudio) {
              a(e);
            }
            return e;
          }
          e._emit("loaderror", null, "No codec support for selected audio sources.");
        }
      },
      play: function (e, t) {
        var o = this;
        var r = null;
        if (typeof e == "number") {
          r = e;
          e = null;
        } else {
          if (typeof e == "string" && o._state === "loaded" && !o._sprite[e]) {
            return null;
          }
          if (e === undefined) {
            e = "__default";
            var a = 0;
            for (var i = 0; i < o._sounds.length; i++) {
              if (o._sounds[i]._paused && !o._sounds[i]._ended) {
                a++;
                r = o._sounds[i]._id;
              }
            }
            if (a === 1) {
              e = null;
            } else {
              r = null;
            }
          }
        }
        var u = r ? o._soundById(r) : o._inactiveSound();
        if (!u) {
          return null;
        }
        if (r && !e) {
          e = u._sprite || "__default";
        }
        if (o._state !== "loaded") {
          u._sprite = e;
          u._ended = false;
          var d = u._id;
          o._queue.push({
            event: "play",
            action: function () {
              o.play(d);
            }
          });
          return d;
        }
        if (r && !u._paused) {
          if (!t) {
            o._loadQueue("play");
          }
          return u._id;
        }
        if (o._webAudio) {
          n._autoResume();
        }
        var _ = Math.max(0, u._seek > 0 ? u._seek : o._sprite[e][0] / 1000);
        var s = Math.max(0, (o._sprite[e][0] + o._sprite[e][1]) / 1000 - _);
        var l = s * 1000 / Math.abs(u._rate);
        u._paused = false;
        u._ended = false;
        u._sprite = e;
        u._seek = _;
        u._start = o._sprite[e][0] / 1000;
        u._stop = (o._sprite[e][0] + o._sprite[e][1]) / 1000;
        u._loop = !!u._loop || !!o._sprite[e][2];
        var c = u._node;
        if (o._webAudio) {
          function p() {
            o._refreshBuffer(u);
            var e = u._muted || o._muted ? 0 : u._volume;
            c.gain.setValueAtTime(e, n.ctx.currentTime);
            u._playStart = n.ctx.currentTime;
            if (c.bufferSource.start === undefined) {
              if (u._loop) {
                c.bufferSource.noteGrainOn(0, _, 86400);
              } else {
                c.bufferSource.noteGrainOn(0, _, s);
              }
            } else if (u._loop) {
              c.bufferSource.start(0, _, 86400);
            } else {
              c.bufferSource.start(0, _, s);
            }
            if (l !== Infinity) {
              o._endTimers[u._id] = setTimeout(o._ended.bind(o, u), l);
            }
            if (!t) {
              setTimeout(function () {
                o._emit("play", u._id);
              }, 0);
            }
          }
          if (n.state === "running") {
            p();
          } else {
            o.once("resume", p);
            o._clearTimer(u._id);
          }
        } else {
          function f() {
            c.currentTime = _;
            c.muted = u._muted || o._muted || n._muted || c.muted;
            c.volume = u._volume * n.volume();
            c.playbackRate = u._rate;
            try {
              var r = c.play();
              if (typeof Promise != "undefined" && r instanceof Promise) {
                o._playLock = true;
                function a() {
                  o._playLock = false;
                  if (!t) {
                    o._emit("play", u._id);
                  }
                }
                r.then(a, a);
              } else if (!t) {
                o._emit("play", u._id);
              }
              if (c.paused) {
                o._emit("playerror", u._id, "Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");
                return;
              }
              if (e !== "__default") {
                o._endTimers[u._id] = setTimeout(o._ended.bind(o, u), l);
              } else {
                o._endTimers[u._id] = function () {
                  o._ended(u);
                  c.removeEventListener("ended", o._endTimers[u._id], false);
                };
                c.addEventListener("ended", o._endTimers[u._id], false);
              }
            } catch (e) {
              o._emit("playerror", u._id, e);
            }
          }
          var m = window && window.ejecta || !c.readyState && n._navigator.isCocoonJS;
          if (c.readyState >= 3 || m) {
            f();
          } else {
            c.addEventListener(n._canPlayEvent, function e() {
              f();
              c.removeEventListener(n._canPlayEvent, e, false);
            }, false);
            o._clearTimer(u._id);
          }
        }
        return u._id;
      },
      pause: function (e) {
        var n = this;
        if (n._state !== "loaded" || n._playLock) {
          n._queue.push({
            event: "pause",
            action: function () {
              n.pause(e);
            }
          });
          return n;
        }
        for (var t = n._getSoundIds(e), o = 0; o < t.length; o++) {
          n._clearTimer(t[o]);
          var r = n._soundById(t[o]);
          if (r && !r._paused && (r._seek = n.seek(t[o]), r._rateSeek = 0, r._paused = true, n._stopFade(t[o]), r._node)) {
            if (n._webAudio) {
              if (!r._node.bufferSource) {
                continue;
              }
              if (r._node.bufferSource.stop === undefined) {
                r._node.bufferSource.noteOff(0);
              } else {
                r._node.bufferSource.stop(0);
              }
              n._cleanBuffer(r._node);
            } else if (!isNaN(r._node.duration) || r._node.duration === Infinity) {
              r._node.pause();
            }
          }
          if (!arguments[1]) {
            n._emit("pause", r ? r._id : null);
          }
        }
        return n;
      },
      stop: function (e, n) {
        var t = this;
        if (t._state !== "loaded") {
          t._queue.push({
            event: "stop",
            action: function () {
              t.stop(e);
            }
          });
          return t;
        }
        for (var o = t._getSoundIds(e), r = 0; r < o.length; r++) {
          t._clearTimer(o[r]);
          var a = t._soundById(o[r]);
          if (a) {
            a._seek = a._start || 0;
            a._rateSeek = 0;
            a._paused = true;
            a._ended = true;
            t._stopFade(o[r]);
            if (a._node) {
              if (t._webAudio) {
                if (a._node.bufferSource) {
                  if (a._node.bufferSource.stop === undefined) {
                    a._node.bufferSource.noteOff(0);
                  } else {
                    a._node.bufferSource.stop(0);
                  }
                  t._cleanBuffer(a._node);
                }
              } else if (!isNaN(a._node.duration) || a._node.duration === Infinity) {
                a._node.currentTime = a._start || 0;
                a._node.pause();
              }
            }
            if (!n) {
              t._emit("stop", a._id);
            }
          }
        }
        return t;
      },
      mute: function (e, t) {
        var o = this;
        if (o._state !== "loaded") {
          o._queue.push({
            event: "mute",
            action: function () {
              o.mute(e, t);
            }
          });
          return o;
        }
        if (t === undefined) {
          if (typeof e != "boolean") {
            return o._muted;
          }
          o._muted = e;
        }
        for (var r = o._getSoundIds(t), a = 0; a < r.length; a++) {
          var i = o._soundById(r[a]);
          if (i) {
            i._muted = e;
            if (i._interval) {
              o._stopFade(i._id);
            }
            if (o._webAudio && i._node) {
              i._node.gain.setValueAtTime(e ? 0 : i._volume, n.ctx.currentTime);
            } else if (i._node) {
              i._node.muted = !!n._muted || e;
            }
            o._emit("mute", i._id);
          }
        }
        return o;
      },
      volume: function () {
        var e;
        var t;
        var o;
        var r = this;
        var a = arguments;
        if (a.length === 0) {
          return r._volume;
        }
        if (a.length === 1 || a.length === 2 && a[1] === undefined) {
          var i = r._getSoundIds();
          var u = i.indexOf(a[0]);
          if (u >= 0) {
            t = parseInt(a[0], 10);
          } else {
            e = parseFloat(a[0]);
          }
        } else if (a.length >= 2) {
          e = parseFloat(a[0]);
          t = parseInt(a[1], 10);
        }
        if (e === undefined || !(e >= 0) || !(e <= 1)) {
          if (o = t ? r._soundById(t) : r._sounds[0]) {
            return o._volume;
          } else {
            return 0;
          }
        }
        if (r._state !== "loaded") {
          r._queue.push({
            event: "volume",
            action: function () {
              r.volume.apply(r, a);
            }
          });
          return r;
        }
        if (t === undefined) {
          r._volume = e;
        }
        t = r._getSoundIds(t);
        for (var d = 0; d < t.length; d++) {
          if (o = r._soundById(t[d])) {
            o._volume = e;
            if (!a[2]) {
              r._stopFade(t[d]);
            }
            if (r._webAudio && o._node && !o._muted) {
              o._node.gain.setValueAtTime(e, n.ctx.currentTime);
            } else if (o._node && !o._muted) {
              o._node.volume = e * n.volume();
            }
            r._emit("volume", o._id);
          }
        }
        return r;
      },
      fade: function (e, t, o, r) {
        var a = this;
        if (a._state !== "loaded") {
          a._queue.push({
            event: "fade",
            action: function () {
              a.fade(e, t, o, r);
            }
          });
          return a;
        }
        a.volume(e, r);
        for (var i = a._getSoundIds(r), u = 0; u < i.length; u++) {
          var d = a._soundById(i[u]);
          if (d) {
            if (!r) {
              a._stopFade(i[u]);
            }
            if (a._webAudio && !d._muted) {
              var _ = n.ctx.currentTime;
              var s = _ + o / 1000;
              d._volume = e;
              d._node.gain.setValueAtTime(e, _);
              d._node.gain.linearRampToValueAtTime(t, s);
            }
            a._startFadeInterval(d, e, t, o, i[u], r === undefined);
          }
        }
        return a;
      },
      _startFadeInterval: function (e, n, t, o, r, a) {
        var i = this;
        var u = n;
        var d = t - n;
        var _ = Math.abs(d / 0.01);
        var s = Math.max(4, _ > 0 ? o / _ : o);
        var l = Date.now();
        e._fadeTo = t;
        e._interval = setInterval(function () {
          var r = (Date.now() - l) / o;
          l = Date.now();
          u += d * r;
          u = Math.max(0, u);
          u = Math.min(1, u);
          u = Math.round(u * 100) / 100;
          if (i._webAudio) {
            e._volume = u;
          } else {
            i.volume(u, e._id, true);
          }
          if (a) {
            i._volume = u;
          }
          if (t < n && u <= t || t > n && u >= t) {
            clearInterval(e._interval);
            e._interval = null;
            e._fadeTo = null;
            i.volume(t, e._id);
            i._emit("fade", e._id);
          }
        }, s);
      },
      _stopFade: function (e) {
        var t = this;
        var o = t._soundById(e);
        if (o && o._interval) {
          if (t._webAudio) {
            o._node.gain.cancelScheduledValues(n.ctx.currentTime);
          }
          clearInterval(o._interval);
          o._interval = null;
          t.volume(o._fadeTo, e);
          o._fadeTo = null;
          t._emit("fade", e);
        }
        return t;
      },
      loop: function () {
        var e;
        var n;
        var t;
        var o = this;
        var r = arguments;
        if (r.length === 0) {
          return o._loop;
        }
        if (r.length === 1) {
          if (typeof r[0] != "boolean") {
            return !!(t = o._soundById(parseInt(r[0], 10))) && t._loop;
          }
          e = r[0];
          o._loop = e;
        } else if (r.length === 2) {
          e = r[0];
          n = parseInt(r[1], 10);
        }
        for (var a = o._getSoundIds(n), i = 0; i < a.length; i++) {
          if (t = o._soundById(a[i])) {
            t._loop = e;
            if (o._webAudio && t._node && t._node.bufferSource) {
              t._node.bufferSource.loop = e;
              if (e) {
                t._node.bufferSource.loopStart = t._start || 0;
                t._node.bufferSource.loopEnd = t._stop;
              }
            }
          }
        }
        return o;
      },
      rate: function () {
        var e;
        var t;
        var o;
        var r = this;
        var a = arguments;
        if (a.length === 0) {
          t = r._sounds[0]._id;
        } else if (a.length === 1) {
          var i = r._getSoundIds();
          var u = i.indexOf(a[0]);
          if (u >= 0) {
            t = parseInt(a[0], 10);
          } else {
            e = parseFloat(a[0]);
          }
        } else if (a.length === 2) {
          e = parseFloat(a[0]);
          t = parseInt(a[1], 10);
        }
        if (typeof e != "number") {
          if (o = r._soundById(t)) {
            return o._rate;
          } else {
            return r._rate;
          }
        }
        if (r._state !== "loaded") {
          r._queue.push({
            event: "rate",
            action: function () {
              r.rate.apply(r, a);
            }
          });
          return r;
        }
        if (t === undefined) {
          r._rate = e;
        }
        t = r._getSoundIds(t);
        for (var d = 0; d < t.length; d++) {
          if (o = r._soundById(t[d])) {
            o._rateSeek = r.seek(t[d]);
            o._playStart = r._webAudio ? n.ctx.currentTime : o._playStart;
            o._rate = e;
            if (r._webAudio && o._node && o._node.bufferSource) {
              o._node.bufferSource.playbackRate.setValueAtTime(e, n.ctx.currentTime);
            } else if (o._node) {
              o._node.playbackRate = e;
            }
            var _ = r.seek(t[d]);
            var s = (r._sprite[o._sprite][0] + r._sprite[o._sprite][1]) / 1000 - _;
            var l = s * 1000 / Math.abs(o._rate);
            if (!!r._endTimers[t[d]] || !o._paused) {
              r._clearTimer(t[d]);
              r._endTimers[t[d]] = setTimeout(r._ended.bind(r, o), l);
            }
            r._emit("rate", o._id);
          }
        }
        return r;
      },
      seek: function () {
        var e;
        var t;
        var o = this;
        var r = arguments;
        if (r.length === 0) {
          t = o._sounds[0]._id;
        } else if (r.length === 1) {
          var a = o._getSoundIds();
          var i = a.indexOf(r[0]);
          if (i >= 0) {
            t = parseInt(r[0], 10);
          } else if (o._sounds.length) {
            t = o._sounds[0]._id;
            e = parseFloat(r[0]);
          }
        } else if (r.length === 2) {
          e = parseFloat(r[0]);
          t = parseInt(r[1], 10);
        }
        if (t === undefined) {
          return o;
        }
        if (o._state !== "loaded") {
          o._queue.push({
            event: "seek",
            action: function () {
              o.seek.apply(o, r);
            }
          });
          return o;
        }
        var u = o._soundById(t);
        if (u) {
          if (typeof e != "number" || !(e >= 0)) {
            if (o._webAudio) {
              var d = o.playing(t) ? n.ctx.currentTime - u._playStart : 0;
              var _ = u._rateSeek ? u._rateSeek - u._seek : 0;
              return u._seek + (_ + d * Math.abs(u._rate));
            }
            return u._node.currentTime;
          }
          var s = o.playing(t);
          if (s) {
            o.pause(t, true);
          }
          u._seek = e;
          u._ended = false;
          o._clearTimer(t);
          if (s) {
            o.play(t, true);
          }
          if (!o._webAudio && u._node) {
            u._node.currentTime = e;
          }
          if (s && !o._webAudio) {
            var l = function e() {
              if (o._playLock) {
                setTimeout(e, 0);
              } else {
                o._emit("seek", t);
              }
            };
            setTimeout(l, 0);
          } else {
            o._emit("seek", t);
          }
        }
        return o;
      },
      playing: function (e) {
        var n = this;
        if (typeof e == "number") {
          var t = n._soundById(e);
          return !!t && !t._paused;
        }
        for (var o = 0; o < n._sounds.length; o++) {
          if (!n._sounds[o]._paused) {
            return true;
          }
        }
        return false;
      },
      duration: function (e) {
        var n = this;
        var t = n._duration;
        var o = n._soundById(e);
        if (o) {
          t = n._sprite[o._sprite][1] / 1000;
        }
        return t;
      },
      state: function () {
        return this._state;
      },
      unload: function () {
        var e = this;
        for (var t = e._sounds, o = 0; o < t.length; o++) {
          if (!t[o]._paused) {
            e.stop(t[o]._id);
          }
          if (!e._webAudio) {
            if (!/MSIE |Trident\//.test(n._navigator && n._navigator.userAgent)) {
              t[o]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
            t[o]._node.removeEventListener("error", t[o]._errorFn, false);
            t[o]._node.removeEventListener(n._canPlayEvent, t[o]._loadFn, false);
          }
          delete t[o]._node;
          e._clearTimer(t[o]._id);
          var a = n._howls.indexOf(e);
          if (a >= 0) {
            n._howls.splice(a, 1);
          }
        }
        var i = true;
        for (o = 0; o < n._howls.length; o++) {
          if (n._howls[o]._src === e._src) {
            i = false;
            break;
          }
        }
        if (r && i) {
          delete r[e._src];
        }
        n.noAudio = false;
        e._state = "unloaded";
        e._sounds = [];
        e = null;
        return null;
      },
      on: function (e, n, t, o) {
        var r = this["_on" + e];
        if (typeof n == "function") {
          r.push(o ? {
            id: t,
            fn: n,
            once: o
          } : {
            id: t,
            fn: n
          });
        }
        return this;
      },
      off: function (e, n, t) {
        var o = this;
        var r = o["_on" + e];
        var a = 0;
        if (typeof n == "number") {
          t = n;
          n = null;
        }
        if (n || t) {
          for (a = 0; a < r.length; a++) {
            var i = t === r[a].id;
            if (n === r[a].fn && i || !n && i) {
              r.splice(a, 1);
              break;
            }
          }
        } else if (e) {
          o["_on" + e] = [];
        } else {
          var u = Object.keys(o);
          for (a = 0; a < u.length; a++) {
            if (u[a].indexOf("_on") === 0 && Array.isArray(o[u[a]])) {
              o[u[a]] = [];
            }
          }
        }
        return o;
      },
      once: function (e, n, t) {
        this.on(e, n, t, 1);
        return this;
      },
      _emit: function (e, n, t) {
        var o = this;
        var r = o["_on" + e];
        for (var a = r.length - 1; a >= 0; a--) {
          if (!r[a].id || r[a].id === n || e === "load") {
            setTimeout(function (e) {
              e.call(this, n, t);
            }.bind(o, r[a].fn), 0);
            if (r[a].once) {
              o.off(e, r[a].fn, r[a].id);
            }
          }
        }
        o._loadQueue(e);
        return o;
      },
      _loadQueue: function (e) {
        var n = this;
        if (n._queue.length > 0) {
          var t = n._queue[0];
          if (t.event === e) {
            n._queue.shift();
            n._loadQueue();
          }
          if (!e) {
            t.action();
          }
        }
        return n;
      },
      _ended: function (e) {
        var t = this;
        var o = e._sprite;
        if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) {
          setTimeout(t._ended.bind(t, e), 100);
          return t;
        }
        var r = !!e._loop || !!t._sprite[o][2];
        t._emit("end", e._id);
        if (!t._webAudio && r) {
          t.stop(e._id, true).play(e._id);
        }
        if (t._webAudio && r) {
          t._emit("play", e._id);
          e._seek = e._start || 0;
          e._rateSeek = 0;
          e._playStart = n.ctx.currentTime;
          var a = (e._stop - e._start) * 1000 / Math.abs(e._rate);
          t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), a);
        }
        if (t._webAudio && !r) {
          e._paused = true;
          e._ended = true;
          e._seek = e._start || 0;
          e._rateSeek = 0;
          t._clearTimer(e._id);
          t._cleanBuffer(e._node);
          n._autoSuspend();
        }
        if (!t._webAudio && !r) {
          t.stop(e._id);
        }
        return t;
      },
      _clearTimer: function (e) {
        var n = this;
        if (n._endTimers[e]) {
          if (typeof n._endTimers[e] != "function") {
            clearTimeout(n._endTimers[e]);
          } else {
            var t = n._soundById(e);
            if (t && t._node) {
              t._node.removeEventListener("ended", n._endTimers[e], false);
            }
          }
          delete n._endTimers[e];
        }
        return n;
      },
      _soundById: function (e) {
        for (var n = this, t = 0; t < n._sounds.length; t++) {
          if (e === n._sounds[t]._id) {
            return n._sounds[t];
          }
        }
        return null;
      },
      _inactiveSound: function () {
        var e = this;
        e._drain();
        for (var n = 0; n < e._sounds.length; n++) {
          if (e._sounds[n]._ended) {
            return e._sounds[n].reset();
          }
        }
        return new o(e);
      },
      _drain: function () {
        var e = this;
        var n = e._pool;
        var t = 0;
        var o = 0;
        if (!(e._sounds.length < n)) {
          for (o = 0; o < e._sounds.length; o++) {
            if (e._sounds[o]._ended) {
              t++;
            }
          }
          for (o = e._sounds.length - 1; o >= 0; o--) {
            if (t <= n) {
              return;
            }
            if (e._sounds[o]._ended) {
              if (e._webAudio && e._sounds[o]._node) {
                e._sounds[o]._node.disconnect(0);
              }
              e._sounds.splice(o, 1);
              t--;
            }
          }
        }
      },
      _getSoundIds: function (e) {
        if (e === undefined) {
          var n = [];
          for (var t = 0; t < this._sounds.length; t++) {
            n.push(this._sounds[t]._id);
          }
          return n;
        }
        return [e];
      },
      _refreshBuffer: function (e) {
        e._node.bufferSource = n.ctx.createBufferSource();
        e._node.bufferSource.buffer = r[this._src];
        if (e._panner) {
          e._node.bufferSource.connect(e._panner);
        } else {
          e._node.bufferSource.connect(e._node);
        }
        e._node.bufferSource.loop = e._loop;
        if (e._loop) {
          e._node.bufferSource.loopStart = e._start || 0;
          e._node.bufferSource.loopEnd = e._stop;
        }
        e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime);
        return this;
      },
      _cleanBuffer: function (e) {
        if (n._scratchBuffer) {
          e.bufferSource.onended = null;
          e.bufferSource.disconnect(0);
          try {
            e.bufferSource.buffer = n._scratchBuffer;
          } catch (e) {}
        }
        e.bufferSource = null;
        return this;
      }
    };
    function o(e) {
      this._parent = e;
      this.init();
    }
    o.prototype = {
      init: function () {
        var e = this;
        var t = e._parent;
        e._muted = t._muted;
        e._loop = t._loop;
        e._volume = t._volume;
        e._rate = t._rate;
        e._seek = 0;
        e._paused = true;
        e._ended = true;
        e._sprite = "__default";
        e._id = ++n._counter;
        t._sounds.push(e);
        e.create();
        return e;
      },
      create: function () {
        var e = this;
        var t = e._parent;
        var o = n._muted || e._muted || e._parent._muted ? 0 : e._volume;
        if (t._webAudio) {
          e._node = n.ctx.createGain === undefined ? n.ctx.createGainNode() : n.ctx.createGain();
          e._node.gain.setValueAtTime(o, n.ctx.currentTime);
          e._node.paused = true;
          e._node.connect(n.masterGain);
        } else {
          e._node = new Audio();
          e._errorFn = e._errorListener.bind(e);
          e._node.addEventListener("error", e._errorFn, false);
          e._loadFn = e._loadListener.bind(e);
          e._node.addEventListener(n._canPlayEvent, e._loadFn, false);
          e._node.src = t._src;
          e._node.preload = "auto";
          e._node.volume = o * n.volume();
          e._node.load();
        }
        return e;
      },
      reset: function () {
        var e = this;
        var t = e._parent;
        e._muted = t._muted;
        e._loop = t._loop;
        e._volume = t._volume;
        e._rate = t._rate;
        e._seek = 0;
        e._rateSeek = 0;
        e._paused = true;
        e._ended = true;
        e._sprite = "__default";
        e._id = ++n._counter;
        return e;
      },
      _errorListener: function () {
        var e = this;
        e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0);
        e._node.removeEventListener("error", e._errorFn, false);
      },
      _loadListener: function () {
        var e = this;
        var t = e._parent;
        t._duration = Math.ceil(e._node.duration * 10) / 10;
        if (Object.keys(t._sprite).length === 0) {
          t._sprite = {
            __default: [0, t._duration * 1000]
          };
        }
        if (t._state !== "loaded") {
          t._state = "loaded";
          t._emit("load");
          t._loadQueue();
        }
        e._node.removeEventListener(n._canPlayEvent, e._loadFn, false);
      }
    };
    var r = {};
    function a(e) {
      var n = e._src;
      if (r[n]) {
        e._duration = r[n].duration;
        d(e);
        return;
      }
      if (/^data:[^;]+;base64,/.test(n)) {
        for (var t = atob(n.split(",")[1]), o = new Uint8Array(t.length), a = 0; a < t.length; ++a) {
          o[a] = t.charCodeAt(a);
        }
        u(o.buffer, e);
      } else {
        var _ = new XMLHttpRequest();
        _.open("GET", n, true);
        _.withCredentials = e._xhrWithCredentials;
        _.responseType = "arraybuffer";
        _.onload = function () {
          var n = (_.status + "")[0];
          if (n === "0" || n === "2" || n === "3") {
            u(_.response, e);
          } else {
            e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + ".");
          }
        };
        _.onerror = function () {
          if (e._webAudio) {
            e._html5 = true;
            e._webAudio = false;
            e._sounds = [];
            delete r[n];
            e.load();
          }
        };
        i(_);
      }
    }
    function i(e) {
      try {
        e.send();
      } catch (n) {
        e.onerror();
      }
    }
    function u(e, t) {
      n.ctx.decodeAudioData(e, function (e) {
        if (e && t._sounds.length > 0) {
          r[t._src] = e;
          d(t, e);
        }
      }, function () {
        t._emit("loaderror", null, "Decoding audio data failed.");
      });
    }
    function d(e, n) {
      if (n && !e._duration) {
        e._duration = n.duration;
      }
      if (Object.keys(e._sprite).length === 0) {
        e._sprite = {
          __default: [0, e._duration * 1000]
        };
      }
      if (e._state !== "loaded") {
        e._state = "loaded";
        e._emit("load");
        e._loadQueue();
      }
    }
    function _() {
      try {
        if (typeof AudioContext != "undefined") {
          n.ctx = new AudioContext();
        } else if (typeof webkitAudioContext != "undefined") {
          n.ctx = new webkitAudioContext();
        } else {
          n.usingWebAudio = false;
        }
      } catch (e) {
        n.usingWebAudio = false;
      }
      var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform);
      var t = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      var o = t ? parseInt(t[1], 10) : null;
      if (e && o && o < 9) {
        var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
        if (n._navigator && n._navigator.standalone && !r || n._navigator && !n._navigator.standalone && !r) {
          n.usingWebAudio = false;
        }
      }
      if (n.usingWebAudio) {
        n.masterGain = n.ctx.createGain === undefined ? n.ctx.createGainNode() : n.ctx.createGain();
        n.masterGain.gain.setValueAtTime(n._muted ? 0 : 1, n.ctx.currentTime);
        n.masterGain.connect(n.ctx.destination);
      }
      n._setup();
    }
    if (typeof define == "function" && define.amd) {
      define([], function () {
        return {
          Howler: n,
          Howl: t
        };
      });
    }
    if (typeof exports != "undefined") {
      exports.Howler = n;
      exports.Howl = t;
    }
    if (typeof window != "undefined") {
      window.HowlerGlobal = e;
      window.Howler = n;
      window.Howl = t;
      window.Sound = o;
    } else if (typeof global != "undefined") {
      global.HowlerGlobal = e;
      global.Howler = n;
      global.Howl = t;
      global.Sound = o;
    }
  })();
  (function () {
    "use strict";
  
    var e;
    HowlerGlobal.prototype._pos = [0, 0, 0];
    HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
    HowlerGlobal.prototype.stereo = function (e) {
      var n = this;
      if (!n.ctx || !n.ctx.listener) {
        return n;
      }
      for (var t = n._howls.length - 1; t >= 0; t--) {
        n._howls[t].stereo(e);
      }
      return n;
    };
    HowlerGlobal.prototype.pos = function (e, n, t) {
      var o = this;
      if (o.ctx && o.ctx.listener) {
        n = typeof n != "number" ? o._pos[1] : n;
        t = typeof t != "number" ? o._pos[2] : t;
        if (typeof e != "number") {
          return o._pos;
        } else {
          o._pos = [e, n, t];
          o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]);
          return o;
        }
      } else {
        return o;
      }
    };
    HowlerGlobal.prototype.orientation = function (e, n, t, o, r, a) {
      var i = this;
      if (!i.ctx || !i.ctx.listener) {
        return i;
      }
      var u = i._orientation;
      n = typeof n != "number" ? u[1] : n;
      t = typeof t != "number" ? u[2] : t;
      o = typeof o != "number" ? u[3] : o;
      r = typeof r != "number" ? u[4] : r;
      a = typeof a != "number" ? u[5] : a;
      if (typeof e != "number") {
        return u;
      } else {
        i._orientation = [e, n, t, o, r, a];
        i.ctx.listener.setOrientation(e, n, t, o, r, a);
        return i;
      }
    };
    Howl.prototype.init = (e = Howl.prototype.init, function (n) {
      var t = this;
      t._orientation = n.orientation || [1, 0, 0];
      t._stereo = n.stereo || null;
      t._pos = n.pos || null;
      t._pannerAttr = {
        coneInnerAngle: n.coneInnerAngle !== undefined ? n.coneInnerAngle : 360,
        coneOuterAngle: n.coneOuterAngle !== undefined ? n.coneOuterAngle : 360,
        coneOuterGain: n.coneOuterGain !== undefined ? n.coneOuterGain : 0,
        distanceModel: n.distanceModel !== undefined ? n.distanceModel : "inverse",
        maxDistance: n.maxDistance !== undefined ? n.maxDistance : 10000,
        panningModel: n.panningModel !== undefined ? n.panningModel : "HRTF",
        refDistance: n.refDistance !== undefined ? n.refDistance : 1,
        rolloffFactor: n.rolloffFactor !== undefined ? n.rolloffFactor : 1
      };
      t._onstereo = n.onstereo ? [{
        fn: n.onstereo
      }] : [];
      t._onpos = n.onpos ? [{
        fn: n.onpos
      }] : [];
      t._onorientation = n.onorientation ? [{
        fn: n.onorientation
      }] : [];
      return e.call(this, n);
    });
    Howl.prototype.stereo = function (e, t) {
      var o = this;
      if (!o._webAudio) {
        return o;
      }
      if (o._state !== "loaded") {
        o._queue.push({
          event: "stereo",
          action: function () {
            o.stereo(e, t);
          }
        });
        return o;
      }
      var r = Howler.ctx.createStereoPanner === undefined ? "spatial" : "stereo";
      if (t === undefined) {
        if (typeof e != "number") {
          return o._stereo;
        }
        o._stereo = e;
        o._pos = [e, 0, 0];
      }
      for (var a = o._getSoundIds(t), i = 0; i < a.length; i++) {
        var u = o._soundById(a[i]);
        if (u) {
          if (typeof e != "number") {
            return u._stereo;
          }
          u._stereo = e;
          u._pos = [e, 0, 0];
          if (u._node) {
            u._pannerAttr.panningModel = "equalpower";
            if (!u._panner || !u._panner.pan) {
              n(u, r);
            }
            if (r === "spatial") {
              u._panner.setPosition(e, 0, 0);
            } else {
              u._panner.pan.setValueAtTime(e, Howler.ctx.currentTime);
            }
          }
          o._emit("stereo", u._id);
        }
      }
      return o;
    };
    Howl.prototype.pos = function (e, t, o, r) {
      var a = this;
      if (!a._webAudio) {
        return a;
      }
      if (a._state !== "loaded") {
        a._queue.push({
          event: "pos",
          action: function () {
            a.pos(e, t, o, r);
          }
        });
        return a;
      }
      t = typeof t != "number" ? 0 : t;
      o = typeof o != "number" ? -0.5 : o;
      if (r === undefined) {
        if (typeof e != "number") {
          return a._pos;
        }
        a._pos = [e, t, o];
      }
      for (var i = a._getSoundIds(r), u = 0; u < i.length; u++) {
        var d = a._soundById(i[u]);
        if (d) {
          if (typeof e != "number") {
            return d._pos;
          }
          d._pos = [e, t, o];
          if (d._node) {
            if (!d._panner || !!d._panner.pan) {
              n(d, "spatial");
            }
            d._panner.setPosition(e, t, o);
          }
          a._emit("pos", d._id);
        }
      }
      return a;
    };
    Howl.prototype.orientation = function (e, t, o, r) {
      var a = this;
      if (!a._webAudio) {
        return a;
      }
      if (a._state !== "loaded") {
        a._queue.push({
          event: "orientation",
          action: function () {
            a.orientation(e, t, o, r);
          }
        });
        return a;
      }
      t = typeof t != "number" ? a._orientation[1] : t;
      o = typeof o != "number" ? a._orientation[2] : o;
      if (r === undefined) {
        if (typeof e != "number") {
          return a._orientation;
        }
        a._orientation = [e, t, o];
      }
      for (var i = a._getSoundIds(r), u = 0; u < i.length; u++) {
        var d = a._soundById(i[u]);
        if (d) {
          if (typeof e != "number") {
            return d._orientation;
          }
          d._orientation = [e, t, o];
          if (d._node) {
            if (!d._panner) {
              d._pos ||= a._pos || [0, 0, -0.5];
              n(d, "spatial");
            }
            d._panner.setOrientation(e, t, o);
          }
          a._emit("orientation", d._id);
        }
      }
      return a;
    };
    Howl.prototype.pannerAttr = function () {
      var e;
      var t;
      var o;
      var r = this;
      var a = arguments;
      if (!r._webAudio) {
        return r;
      }
      if (a.length === 0) {
        return r._pannerAttr;
      }
      if (a.length === 1) {
        if (typeof a[0] != "object") {
          if (o = r._soundById(parseInt(a[0], 10))) {
            return o._pannerAttr;
          } else {
            return r._pannerAttr;
          }
        }
        e = a[0];
        if (t === undefined) {
          e.pannerAttr ||= {
            coneInnerAngle: e.coneInnerAngle,
            coneOuterAngle: e.coneOuterAngle,
            coneOuterGain: e.coneOuterGain,
            distanceModel: e.distanceModel,
            maxDistance: e.maxDistance,
            refDistance: e.refDistance,
            rolloffFactor: e.rolloffFactor,
            panningModel: e.panningModel
          };
          r._pannerAttr = {
            coneInnerAngle: e.pannerAttr.coneInnerAngle !== undefined ? e.pannerAttr.coneInnerAngle : r._coneInnerAngle,
            coneOuterAngle: e.pannerAttr.coneOuterAngle !== undefined ? e.pannerAttr.coneOuterAngle : r._coneOuterAngle,
            coneOuterGain: e.pannerAttr.coneOuterGain !== undefined ? e.pannerAttr.coneOuterGain : r._coneOuterGain,
            distanceModel: e.pannerAttr.distanceModel !== undefined ? e.pannerAttr.distanceModel : r._distanceModel,
            maxDistance: e.pannerAttr.maxDistance !== undefined ? e.pannerAttr.maxDistance : r._maxDistance,
            refDistance: e.pannerAttr.refDistance !== undefined ? e.pannerAttr.refDistance : r._refDistance,
            rolloffFactor: e.pannerAttr.rolloffFactor !== undefined ? e.pannerAttr.rolloffFactor : r._rolloffFactor,
            panningModel: e.pannerAttr.panningModel !== undefined ? e.pannerAttr.panningModel : r._panningModel
          };
        }
      } else if (a.length === 2) {
        e = a[0];
        t = parseInt(a[1], 10);
      }
      for (var i = r._getSoundIds(t), u = 0; u < i.length; u++) {
        if (o = r._soundById(i[u])) {
          var d = o._pannerAttr;
          d = {
            coneInnerAngle: e.coneInnerAngle !== undefined ? e.coneInnerAngle : d.coneInnerAngle,
            coneOuterAngle: e.coneOuterAngle !== undefined ? e.coneOuterAngle : d.coneOuterAngle,
            coneOuterGain: e.coneOuterGain !== undefined ? e.coneOuterGain : d.coneOuterGain,
            distanceModel: e.distanceModel !== undefined ? e.distanceModel : d.distanceModel,
            maxDistance: e.maxDistance !== undefined ? e.maxDistance : d.maxDistance,
            refDistance: e.refDistance !== undefined ? e.refDistance : d.refDistance,
            rolloffFactor: e.rolloffFactor !== undefined ? e.rolloffFactor : d.rolloffFactor,
            panningModel: e.panningModel !== undefined ? e.panningModel : d.panningModel
          };
          var _ = o._panner;
          if (_) {
            _.coneInnerAngle = d.coneInnerAngle;
            _.coneOuterAngle = d.coneOuterAngle;
            _.coneOuterGain = d.coneOuterGain;
            _.distanceModel = d.distanceModel;
            _.maxDistance = d.maxDistance;
            _.refDistance = d.refDistance;
            _.rolloffFactor = d.rolloffFactor;
            _.panningModel = d.panningModel;
          } else {
            o._pos ||= r._pos || [0, 0, -0.5];
            n(o, "spatial");
          }
        }
      }
      return r;
    };
    Sound.prototype.init = function (e) {
      return function () {
        var n = this;
        var t = n._parent;
        n._orientation = t._orientation;
        n._stereo = t._stereo;
        n._pos = t._pos;
        n._pannerAttr = t._pannerAttr;
        e.call(this);
        if (n._stereo) {
          t.stereo(n._stereo);
        } else if (n._pos) {
          t.pos(n._pos[0], n._pos[1], n._pos[2], n._id);
        }
      };
    }(Sound.prototype.init);
    Sound.prototype.reset = function (e) {
      return function () {
        var n = this;
        var t = n._parent;
        n._orientation = t._orientation;
        n._pos = t._pos;
        n._pannerAttr = t._pannerAttr;
        return e.call(this);
      };
    }(Sound.prototype.reset);
    function n(e, n) {
      if ((n = n || "spatial") === "spatial") {
        e._panner = Howler.ctx.createPanner();
        e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle;
        e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle;
        e._panner.coneOuterGain = e._pannerAttr.coneOuterGain;
        e._panner.distanceModel = e._pannerAttr.distanceModel;
        e._panner.maxDistance = e._pannerAttr.maxDistance;
        e._panner.refDistance = e._pannerAttr.refDistance;
        e._panner.rolloffFactor = e._pannerAttr.rolloffFactor;
        e._panner.panningModel = e._pannerAttr.panningModel;
        e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]);
        e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2]);
      } else {
        e._panner = Howler.ctx.createStereoPanner();
        e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime);
      }
      e._panner.connect(e._node);
      if (!e._paused) {
        e._parent.pause(e._id, true).play(e._id, true);
      }
    }
  })();
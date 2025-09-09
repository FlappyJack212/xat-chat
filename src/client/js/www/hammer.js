(function (t, e, i, n) {
    "use strict";
  
    var r;
    var s = ["", "webkit", "Moz", "MS", "ms", "o"];
    var o = e.createElement("div");
    var a = Math.round;
    var h = Math.abs;
    var u = Date.now;
    function c(t, e, i) {
      return setTimeout(g(t, i), e);
    }
    function l(t, e, i) {
      return !!Array.isArray(t) && (p(t, i[e], i), true);
    }
    function p(t, e, i) {
      var r;
      if (t) {
        if (t.forEach) {
          t.forEach(e, i);
        } else if (t.length !== n) {
          for (r = 0; r < t.length;) {
            e.call(i, t[r], r, t);
            r++;
          }
        } else {
          for (r in t) {
            if (t.hasOwnProperty(r)) {
              e.call(i, t[r], r, t);
            }
          }
        }
      }
    }
    function f(e, i, n) {
      var r = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
      return function () {
        var i = new Error("get-stack-trace");
        var n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace";
        var s = t.console && (t.console.warn || t.console.log);
        if (s) {
          s.call(t.console, r, n);
        }
        return e.apply(this, arguments);
      };
    }
    r = typeof Object.assign != "function" ? function (t) {
      if (t === n || t === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var e = Object(t);
      for (var i = 1; i < arguments.length; i++) {
        var r = arguments[i];
        if (r !== n && r !== null) {
          for (var s in r) {
            if (r.hasOwnProperty(s)) {
              e[s] = r[s];
            }
          }
        }
      }
      return e;
    } : Object.assign;
    var d = f(function (t, e, i) {
      for (var r = Object.keys(e), s = 0; s < r.length;) {
        if (!i || i && t[r[s]] === n) {
          t[r[s]] = e[r[s]];
        }
        s++;
      }
      return t;
    }, "extend", "Use `assign`.");
    var v = f(function (t, e) {
      return d(t, e, true);
    }, "merge", "Use `assign`.");
    function m(t, e, i) {
      var n;
      var s = e.prototype;
      (n = t.prototype = Object.create(s)).constructor = t;
      n._super = s;
      if (i) {
        r(n, i);
      }
    }
    function g(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }
    function T(t, e) {
      if (typeof t == "function") {
        return t.apply(e && e[0] || n, e);
      } else {
        return t;
      }
    }
    function y(t, e) {
      if (t === n) {
        return e;
      } else {
        return t;
      }
    }
    function E(t, e, i) {
      p(C(e), function (e) {
        t.addEventListener(e, i, false);
      });
    }
    function I(t, e, i) {
      p(C(e), function (e) {
        t.removeEventListener(e, i, false);
      });
    }
    function A(t, e) {
      while (t) {
        if (t == e) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    }
    function _(t, e) {
      return t.indexOf(e) > -1;
    }
    function C(t) {
      return t.trim().split(/\s+/g);
    }
    function S(t, e, i) {
      if (t.indexOf && !i) {
        return t.indexOf(e);
      }
      for (var n = 0; n < t.length;) {
        if (i && t[n][i] == e || !i && t[n] === e) {
          return n;
        }
        n++;
      }
      return -1;
    }
    function b(t) {
      return Array.prototype.slice.call(t, 0);
    }
    function P(t, e, i) {
      var n = [];
      var r = [];
      for (var s = 0; s < t.length;) {
        var o = e ? t[s][e] : t[s];
        if (S(r, o) < 0) {
          n.push(t[s]);
        }
        r[s] = o;
        s++;
      }
      if (i) {
        n = e ? n.sort(function (t, i) {
          return t[e] > i[e];
        }) : n.sort();
      }
      return n;
    }
    function D(t, e) {
      var i;
      var r;
      var o = e[0].toUpperCase() + e.slice(1);
      for (var a = 0; a < s.length;) {
        if ((r = (i = s[a]) ? i + o : e) in t) {
          return r;
        }
        a++;
      }
      return n;
    }
    var x = 1;
    function w(e) {
      var i = e.ownerDocument || e;
      return i.defaultView || i.parentWindow || t;
    }
    var O = "ontouchstart" in t;
    var R = D(t, "PointerEvent") !== n;
    var M = O && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);
    var z = "touch";
    var N = "mouse";
    var X = 24;
    var Y = ["x", "y"];
    var F = ["clientX", "clientY"];
    function W(t, e) {
      var i = this;
      this.manager = t;
      this.callback = e;
      this.element = t.element;
      this.target = t.options.inputTarget;
      this.domHandler = function (e) {
        if (T(t.options.enable, [t])) {
          i.handler(e);
        }
      };
      this.init();
    }
    function q(t, e, i) {
      var r = i.pointers.length;
      var s = i.changedPointers.length;
      var o = e & 1 && r - s == 0;
      var a = e & 12 && r - s == 0;
      i.isFirst = !!o;
      i.isFinal = !!a;
      if (o) {
        t.session = {};
      }
      i.eventType = e;
      (function (t, e) {
        var i = t.session;
        var r = e.pointers;
        var s = r.length;
        i.firstInput ||= k(e);
        if (s > 1 && !i.firstMultiple) {
          i.firstMultiple = k(e);
        } else if (s === 1) {
          i.firstMultiple = false;
        }
        var o = i.firstInput;
        var a = i.firstMultiple;
        var c = a ? a.center : o.center;
        var l = e.center = H(r);
        e.timeStamp = u();
        e.deltaTime = e.timeStamp - o.timeStamp;
        e.angle = j(c, l);
        e.distance = V(c, l);
        (function (t, e) {
          var i = e.center;
          var n = t.offsetDelta || {};
          var r = t.prevDelta || {};
          var s = t.prevInput || {};
          if (e.eventType === 1 || s.eventType === 4) {
            r = t.prevDelta = {
              x: s.deltaX || 0,
              y: s.deltaY || 0
            };
            n = t.offsetDelta = {
              x: i.x,
              y: i.y
            };
          }
          e.deltaX = r.x + (i.x - n.x);
          e.deltaY = r.y + (i.y - n.y);
        })(i, e);
        e.offsetDirection = U(e.deltaX, e.deltaY);
        var p = L(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = p.x;
        e.overallVelocityY = p.y;
        e.overallVelocity = h(p.x) > h(p.y) ? p.x : p.y;
        e.scale = a ? (f = a.pointers, d = r, V(d[0], d[1], F) / V(f[0], f[1], F)) : 1;
        e.rotation = a ? function (t, e) {
          return j(e[1], e[0], F) + j(t[1], t[0], F);
        }(a.pointers, r) : 0;
        e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length;
        (function (t, e) {
          var i;
          var r;
          var s;
          var o;
          var a = t.lastInterval || e;
          var u = e.timeStamp - a.timeStamp;
          if (e.eventType != 8 && (u > 25 || a.velocity === n)) {
            var c = e.deltaX - a.deltaX;
            var l = e.deltaY - a.deltaY;
            var p = L(u, c, l);
            r = p.x;
            s = p.y;
            i = h(p.x) > h(p.y) ? p.x : p.y;
            o = U(c, l);
            t.lastInterval = e;
          } else {
            i = a.velocity;
            r = a.velocityX;
            s = a.velocityY;
            o = a.direction;
          }
          e.velocity = i;
          e.velocityX = r;
          e.velocityY = s;
          e.direction = o;
        })(i, e);
        var f;
        var d;
        var v = t.element;
        if (A(e.srcEvent.target, v)) {
          v = e.srcEvent.target;
        }
        e.target = v;
      })(t, i);
      t.emit("hammer.input", i);
      t.recognize(i);
      t.session.prevInput = i;
    }
    function k(t) {
      var e = [];
      for (var i = 0; i < t.pointers.length;) {
        e[i] = {
          clientX: a(t.pointers[i].clientX),
          clientY: a(t.pointers[i].clientY)
        };
        i++;
      }
      return {
        timeStamp: u(),
        pointers: e,
        center: H(e),
        deltaX: t.deltaX,
        deltaY: t.deltaY
      };
    }
    function H(t) {
      var e = t.length;
      if (e === 1) {
        return {
          x: a(t[0].clientX),
          y: a(t[0].clientY)
        };
      }
      var i = 0;
      var n = 0;
      for (var r = 0; r < e;) {
        i += t[r].clientX;
        n += t[r].clientY;
        r++;
      }
      return {
        x: a(i / e),
        y: a(n / e)
      };
    }
    function L(t, e, i) {
      return {
        x: e / t || 0,
        y: i / t || 0
      };
    }
    function U(t, e) {
      if (t === e) {
        return 1;
      } else if (h(t) >= h(e)) {
        if (t < 0) {
          return 2;
        } else {
          return 4;
        }
      } else if (e < 0) {
        return 8;
      } else {
        return 16;
      }
    }
    function V(t, e, i) {
      i ||= Y;
      var n = e[i[0]] - t[i[0]];
      var r = e[i[1]] - t[i[1]];
      return Math.sqrt(n * n + r * r);
    }
    function j(t, e, i) {
      i ||= Y;
      var n = e[i[0]] - t[i[0]];
      var r = e[i[1]] - t[i[1]];
      return Math.atan2(r, n) * 180 / Math.PI;
    }
    W.prototype = {
      handler: function () {},
      init: function () {
        if (this.evEl) {
          E(this.element, this.evEl, this.domHandler);
        }
        if (this.evTarget) {
          E(this.target, this.evTarget, this.domHandler);
        }
        if (this.evWin) {
          E(w(this.element), this.evWin, this.domHandler);
        }
      },
      destroy: function () {
        if (this.evEl) {
          I(this.element, this.evEl, this.domHandler);
        }
        if (this.evTarget) {
          I(this.target, this.evTarget, this.domHandler);
        }
        if (this.evWin) {
          I(w(this.element), this.evWin, this.domHandler);
        }
      }
    };
    var G = {
      mousedown: 1,
      mousemove: 2,
      mouseup: 4
    };
    var Z = "mousedown";
    var B = "mousemove mouseup";
    function $() {
      this.evEl = Z;
      this.evWin = B;
      this.pressed = false;
      W.apply(this, arguments);
    }
    m($, W, {
      handler: function (t) {
        var e = G[t.type];
        if (e & 1 && t.button === 0) {
          this.pressed = true;
        }
        if (e & 2 && t.which !== 1) {
          e = 4;
        }
        if (this.pressed) {
          if (e & 4) {
            this.pressed = false;
          }
          this.callback(this.manager, e, {
            pointers: [t],
            changedPointers: [t],
            pointerType: N,
            srcEvent: t
          });
        }
      }
    });
    var J = {
      pointerdown: 1,
      pointermove: 2,
      pointerup: 4,
      pointercancel: 8,
      pointerout: 8
    };
    var K = {
      2: z,
      3: "pen",
      4: N,
      5: "kinect"
    };
    var Q = "pointerdown";
    var tt = "pointermove pointerup pointercancel";
    function et() {
      this.evEl = Q;
      this.evWin = tt;
      W.apply(this, arguments);
      this.store = this.manager.session.pointerEvents = [];
    }
    if (t.MSPointerEvent && !t.PointerEvent) {
      Q = "MSPointerDown";
      tt = "MSPointerMove MSPointerUp MSPointerCancel";
    }
    m(et, W, {
      handler: function (t) {
        var e = this.store;
        var i = false;
        var n = t.type.toLowerCase().replace("ms", "");
        var r = J[n];
        var s = K[t.pointerType] || t.pointerType;
        var o = s == z;
        var a = S(e, t.pointerId, "pointerId");
        if (r & 1 && (t.button === 0 || o)) {
          if (a < 0) {
            e.push(t);
            a = e.length - 1;
          }
        } else if (r & 12) {
          i = true;
        }
        if (!(a < 0)) {
          e[a] = t;
          this.callback(this.manager, r, {
            pointers: e,
            changedPointers: [t],
            pointerType: s,
            srcEvent: t
          });
          if (i) {
            e.splice(a, 1);
          }
        }
      }
    });
    var it = {
      touchstart: 1,
      touchmove: 2,
      touchend: 4,
      touchcancel: 8
    };
    var nt = "touchstart";
    var rt = "touchstart touchmove touchend touchcancel";
    function st() {
      this.evTarget = nt;
      this.evWin = rt;
      this.started = false;
      W.apply(this, arguments);
    }
    function ot(t, e) {
      var i = b(t.touches);
      var n = b(t.changedTouches);
      if (e & 12) {
        i = P(i.concat(n), "identifier", true);
      }
      return [i, n];
    }
    m(st, W, {
      handler: function (t) {
        var e = it[t.type];
        if (e === 1) {
          this.started = true;
        }
        if (this.started) {
          var i = ot.call(this, t, e);
          if (e & 12 && i[0].length - i[1].length == 0) {
            this.started = false;
          }
          this.callback(this.manager, e, {
            pointers: i[0],
            changedPointers: i[1],
            pointerType: z,
            srcEvent: t
          });
        }
      }
    });
    var at = {
      touchstart: 1,
      touchmove: 2,
      touchend: 4,
      touchcancel: 8
    };
    var ht = "touchstart touchmove touchend touchcancel";
    function ut() {
      this.evTarget = ht;
      this.targetIds = {};
      W.apply(this, arguments);
    }
    function ct(t, e) {
      var i = b(t.touches);
      var n = this.targetIds;
      if (e & 3 && i.length === 1) {
        n[i[0].identifier] = true;
        return [i, i];
      }
      var r;
      var s;
      var o = b(t.changedTouches);
      var a = [];
      var h = this.target;
      s = i.filter(function (t) {
        return A(t.target, h);
      });
      if (e === 1) {
        for (r = 0; r < s.length;) {
          n[s[r].identifier] = true;
          r++;
        }
      }
      for (r = 0; r < o.length;) {
        if (n[o[r].identifier]) {
          a.push(o[r]);
        }
        if (e & 12) {
          delete n[o[r].identifier];
        }
        r++;
      }
      if (a.length) {
        return [P(s.concat(a), "identifier", true), a];
      } else {
        return undefined;
      }
    }
    m(ut, W, {
      handler: function (t) {
        var e = at[t.type];
        var i = ct.call(this, t, e);
        if (i) {
          this.callback(this.manager, e, {
            pointers: i[0],
            changedPointers: i[1],
            pointerType: z,
            srcEvent: t
          });
        }
      }
    });
    function lt() {
      W.apply(this, arguments);
      var t = g(this.handler, this);
      this.touch = new ut(this.manager, t);
      this.mouse = new $(this.manager, t);
      this.primaryTouch = null;
      this.lastTouches = [];
    }
    function pt(t, e) {
      if (t & 1) {
        this.primaryTouch = e.changedPointers[0].identifier;
        ft.call(this, e);
      } else if (t & 12) {
        ft.call(this, e);
      }
    }
    function ft(t) {
      var e = t.changedPointers[0];
      if (e.identifier === this.primaryTouch) {
        var i = {
          x: e.clientX,
          y: e.clientY
        };
        this.lastTouches.push(i);
        var n = this.lastTouches;
        setTimeout(function () {
          var t = n.indexOf(i);
          if (t > -1) {
            n.splice(t, 1);
          }
        }, 2500);
      }
    }
    function dt(t) {
      var e = t.srcEvent.clientX;
      var i = t.srcEvent.clientY;
      for (var n = 0; n < this.lastTouches.length; n++) {
        var r = this.lastTouches[n];
        var s = Math.abs(e - r.x);
        var o = Math.abs(i - r.y);
        if (s <= 25 && o <= 25) {
          return true;
        }
      }
      return false;
    }
    m(lt, W, {
      handler: function (t, e, i) {
        var n = i.pointerType == z;
        var r = i.pointerType == N;
        if (!r || !i.sourceCapabilities || !i.sourceCapabilities.firesTouchEvents) {
          if (n) {
            pt.call(this, e, i);
          } else if (r && dt.call(this, i)) {
            return;
          }
          this.callback(t, e, i);
        }
      },
      destroy: function () {
        this.touch.destroy();
        this.mouse.destroy();
      }
    });
    var vt = D(o.style, "touchAction");
    var mt = vt !== n;
    var gt = "compute";
    var Tt = "auto";
    var yt = "manipulation";
    var Et = "none";
    var It = "pan-x";
    var At = "pan-y";
    var _t = function () {
      if (!mt) {
        return false;
      }
      var e = {};
      var i = t.CSS && t.CSS.supports;
      ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (n) {
        e[n] = !i || t.CSS.supports("touch-action", n);
      });
      return e;
    }();
    function Ct(t, e) {
      this.manager = t;
      this.set(e);
    }
    Ct.prototype = {
      set: function (t) {
        if (t == gt) {
          t = this.compute();
        }
        if (mt && this.manager.element.style && _t[t]) {
          this.manager.element.style[vt] = t;
        }
        this.actions = t.toLowerCase().trim();
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var t = [];
        p(this.manager.recognizers, function (e) {
          if (T(e.options.enable, [e])) {
            t = t.concat(e.getTouchAction());
          }
        });
        return function (t) {
          if (_(t, Et)) {
            return Et;
          }
          var e = _(t, It);
          var i = _(t, At);
          if (e && i) {
            return Et;
          }
          if (e || i) {
            if (e) {
              return It;
            } else {
              return At;
            }
          }
          if (_(t, yt)) {
            return yt;
          }
          return Tt;
        }(t.join(" "));
      },
      preventDefaults: function (t) {
        var e = t.srcEvent;
        var i = t.offsetDirection;
        if (this.manager.session.prevented) {
          e.preventDefault();
        } else {
          var n = this.actions;
          var r = _(n, Et) && !_t.none;
          var s = _(n, At) && !_t["pan-y"];
          var o = _(n, It) && !_t["pan-x"];
          if (r) {
            var a = t.pointers.length === 1;
            var h = t.distance < 2;
            var u = t.deltaTime < 250;
            if (a && h && u) {
              return;
            }
          }
          if (!o || !s) {
            if (r || s && i & 6 || o && i & X) {
              return this.preventSrc(e);
            } else {
              return undefined;
            }
          }
        }
      },
      preventSrc: function (t) {
        this.manager.session.prevented = true;
        t.preventDefault();
      }
    };
    var St = 32;
    function bt(t) {
      this.options = r({}, this.defaults, t || {});
      this.id = x++;
      this.manager = null;
      this.options.enable = y(this.options.enable, true);
      this.state = 1;
      this.simultaneous = {};
      this.requireFail = [];
    }
    function Pt(t) {
      if (t & 16) {
        return "cancel";
      } else if (t & 8) {
        return "end";
      } else if (t & 4) {
        return "move";
      } else if (t & 2) {
        return "start";
      } else {
        return "";
      }
    }
    function Dt(t) {
      if (t == 16) {
        return "down";
      } else if (t == 8) {
        return "up";
      } else if (t == 2) {
        return "left";
      } else if (t == 4) {
        return "right";
      } else {
        return "";
      }
    }
    function xt(t, e) {
      var i = e.manager;
      if (i) {
        return i.get(t);
      } else {
        return t;
      }
    }
    function wt() {
      bt.apply(this, arguments);
    }
    function Ot() {
      wt.apply(this, arguments);
      this.pX = null;
      this.pY = null;
    }
    function Rt() {
      wt.apply(this, arguments);
    }
    function Mt() {
      bt.apply(this, arguments);
      this._timer = null;
      this._input = null;
    }
    function zt() {
      wt.apply(this, arguments);
    }
    function Nt() {
      wt.apply(this, arguments);
    }
    function Xt() {
      bt.apply(this, arguments);
      this.pTime = false;
      this.pCenter = false;
      this._timer = null;
      this._input = null;
      this.count = 0;
    }
    function Yt(t, e) {
      (e = e || {}).recognizers = y(e.recognizers, Yt.defaults.preset);
      return new Ft(t, e);
    }
    bt.prototype = {
      defaults: {},
      set: function (t) {
        r(this.options, t);
        if (this.manager) {
          this.manager.touchAction.update();
        }
        return this;
      },
      recognizeWith: function (t) {
        if (l(t, "recognizeWith", this)) {
          return this;
        }
        var e = this.simultaneous;
        if (!e[(t = xt(t, this)).id]) {
          e[t.id] = t;
          t.recognizeWith(this);
        }
        return this;
      },
      dropRecognizeWith: function (t) {
        if (!l(t, "dropRecognizeWith", this)) {
          t = xt(t, this);
          delete this.simultaneous[t.id];
        }
        return this;
      },
      requireFailure: function (t) {
        if (l(t, "requireFailure", this)) {
          return this;
        }
        var e = this.requireFail;
        if (S(e, t = xt(t, this)) === -1) {
          e.push(t);
          t.requireFailure(this);
        }
        return this;
      },
      dropRequireFailure: function (t) {
        if (l(t, "dropRequireFailure", this)) {
          return this;
        }
        t = xt(t, this);
        var e = S(this.requireFail, t);
        if (e > -1) {
          this.requireFail.splice(e, 1);
        }
        return this;
      },
      hasRequireFailures: function () {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function (t) {
        return !!this.simultaneous[t.id];
      },
      emit: function (t) {
        var e = this;
        var i = this.state;
        function n(i) {
          e.manager.emit(i, t);
        }
        if (i < 8) {
          n(e.options.event + Pt(i));
        }
        n(e.options.event);
        if (t.additionalEvent) {
          n(t.additionalEvent);
        }
        if (i >= 8) {
          n(e.options.event + Pt(i));
        }
      },
      tryEmit: function (t) {
        if (this.canEmit()) {
          return this.emit(t);
        }
        this.state = St;
      },
      canEmit: function () {
        for (var t = 0; t < this.requireFail.length;) {
          if (!(this.requireFail[t].state & 33)) {
            return false;
          }
          t++;
        }
        return true;
      },
      recognize: function (t) {
        var e = r({}, t);
        if (!T(this.options.enable, [this, e])) {
          this.reset();
          this.state = St;
          return;
        }
        if (this.state & 56) {
          this.state = 1;
        }
        this.state = this.process(e);
        if (this.state & 30) {
          this.tryEmit(e);
        }
      },
      process: function (t) {},
      getTouchAction: function () {},
      reset: function () {}
    };
    m(wt, bt, {
      defaults: {
        pointers: 1
      },
      attrTest: function (t) {
        var e = this.options.pointers;
        return e === 0 || t.pointers.length === e;
      },
      process: function (t) {
        var e = this.state;
        var i = t.eventType;
        var n = e & 6;
        var r = this.attrTest(t);
        if (n && (i & 8 || !r)) {
          return e | 16;
        } else if (n || r) {
          if (i & 4) {
            return e | 8;
          } else if (e & 2) {
            return e | 4;
          } else {
            return 2;
          }
        } else {
          return St;
        }
      }
    });
    m(Ot, wt, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: 30
      },
      getTouchAction: function () {
        var t = this.options.direction;
        var e = [];
        if (t & 6) {
          e.push(At);
        }
        if (t & X) {
          e.push(It);
        }
        return e;
      },
      directionTest: function (t) {
        var e = this.options;
        var i = true;
        var n = t.distance;
        var r = t.direction;
        var s = t.deltaX;
        var o = t.deltaY;
        if (!(r & e.direction)) {
          if (e.direction & 6) {
            r = s === 0 ? 1 : s < 0 ? 2 : 4;
            i = s != this.pX;
            n = Math.abs(t.deltaX);
          } else {
            r = o === 0 ? 1 : o < 0 ? 8 : 16;
            i = o != this.pY;
            n = Math.abs(t.deltaY);
          }
        }
        t.direction = r;
        return i && n > e.threshold && r & e.direction;
      },
      attrTest: function (t) {
        return wt.prototype.attrTest.call(this, t) && (this.state & 2 || !(this.state & 2) && this.directionTest(t));
      },
      emit: function (t) {
        this.pX = t.deltaX;
        this.pY = t.deltaY;
        var e = Dt(t.direction);
        if (e) {
          t.additionalEvent = this.options.event + e;
        }
        this._super.emit.call(this, t);
      }
    });
    m(Rt, wt, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Et];
      },
      attrTest: function (t) {
        return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & 2);
      },
      emit: function (t) {
        if (t.scale !== 1) {
          var e = t.scale < 1 ? "in" : "out";
          t.additionalEvent = this.options.event + e;
        }
        this._super.emit.call(this, t);
      }
    });
    m(Mt, bt, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function () {
        return [Tt];
      },
      process: function (t) {
        var e = this.options;
        var i = t.pointers.length === e.pointers;
        var n = t.distance < e.threshold;
        var r = t.deltaTime > e.time;
        this._input = t;
        if (!n || !i || t.eventType & 12 && !r) {
          this.reset();
        } else if (t.eventType & 1) {
          this.reset();
          this._timer = c(function () {
            this.state = 8;
            this.tryEmit();
          }, e.time, this);
        } else if (t.eventType & 4) {
          return 8;
        }
        return St;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function (t) {
        if (this.state === 8) {
          if (t && t.eventType & 4) {
            this.manager.emit(this.options.event + "up", t);
          } else {
            this._input.timeStamp = u();
            this.manager.emit(this.options.event, this._input);
          }
        }
      }
    });
    m(zt, wt, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Et];
      },
      attrTest: function (t) {
        return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & 2);
      }
    });
    m(Nt, wt, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: 30,
        pointers: 1
      },
      getTouchAction: function () {
        return Ot.prototype.getTouchAction.call(this);
      },
      attrTest: function (t) {
        var e;
        var i = this.options.direction;
        if (i & 30) {
          e = t.overallVelocity;
        } else if (i & 6) {
          e = t.overallVelocityX;
        } else if (i & X) {
          e = t.overallVelocityY;
        }
        return this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && h(e) > this.options.velocity && t.eventType & 4;
      },
      emit: function (t) {
        var e = Dt(t.offsetDirection);
        if (e) {
          this.manager.emit(this.options.event + e, t);
        }
        this.manager.emit(this.options.event, t);
      }
    });
    m(Xt, bt, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      },
      getTouchAction: function () {
        return [yt];
      },
      process: function (t) {
        var e = this.options;
        var i = t.pointers.length === e.pointers;
        var n = t.distance < e.threshold;
        var r = t.deltaTime < e.time;
        this.reset();
        if (t.eventType & 1 && this.count === 0) {
          return this.failTimeout();
        }
        if (n && r && i) {
          if (t.eventType != 4) {
            return this.failTimeout();
          }
          var s = !this.pTime || t.timeStamp - this.pTime < e.interval;
          var o = !this.pCenter || V(this.pCenter, t.center) < e.posThreshold;
          this.pTime = t.timeStamp;
          this.pCenter = t.center;
          if (o && s) {
            this.count += 1;
          } else {
            this.count = 1;
          }
          this._input = t;
          if (this.count % e.taps === 0) {
            if (this.hasRequireFailures()) {
              this._timer = c(function () {
                this.state = 8;
                this.tryEmit();
              }, e.interval, this);
              return 2;
            } else {
              return 8;
            }
          }
        }
        return St;
      },
      failTimeout: function () {
        this._timer = c(function () {
          this.state = St;
        }, this.options.interval, this);
        return St;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function () {
        if (this.state == 8) {
          this._input.tapCount = this.count;
          this.manager.emit(this.options.event, this._input);
        }
      }
    });
    Yt.VERSION = "2.0.8";
    Yt.defaults = {
      domEvents: true,
      touchAction: gt,
      enable: true,
      inputTarget: null,
      inputClass: null,
      preset: [[zt, {
        enable: false
      }], [Rt, {
        enable: false
      }, ["rotate"]], [Nt, {
        direction: 6
      }], [Ot, {
        direction: 6
      }, ["swipe"]], [Xt], [Xt, {
        event: "doubletap",
        taps: 2
      }, ["tap"]], [Mt]],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    function Ft(t, e) {
      var i;
      this.options = r({}, Yt.defaults, e || {});
      this.options.inputTarget = this.options.inputTarget || t;
      this.handlers = {};
      this.session = {};
      this.recognizers = [];
      this.oldCssProps = {};
      this.element = t;
      this.input = new ((i = this).options.inputClass || (R ? et : M ? ut : O ? lt : $))(i, q);
      this.touchAction = new Ct(this, this.options.touchAction);
      Wt(this, true);
      p(this.options.recognizers, function (t) {
        var e = this.add(new t[0](t[1]));
        if (t[2]) {
          e.recognizeWith(t[2]);
        }
        if (t[3]) {
          e.requireFailure(t[3]);
        }
      }, this);
    }
    function Wt(t, e) {
      var i;
      var n = t.element;
      if (n.style) {
        p(t.options.cssProps, function (r, s) {
          i = D(n.style, s);
          if (e) {
            t.oldCssProps[i] = n.style[i];
            n.style[i] = r;
          } else {
            n.style[i] = t.oldCssProps[i] || "";
          }
        });
        if (!e) {
          t.oldCssProps = {};
        }
      }
    }
    Ft.prototype = {
      set: function (t) {
        r(this.options, t);
        if (t.touchAction) {
          this.touchAction.update();
        }
        if (t.inputTarget) {
          this.input.destroy();
          this.input.target = t.inputTarget;
          this.input.init();
        }
        return this;
      },
      stop: function (t) {
        this.session.stopped = t ? 2 : 1;
      },
      recognize: function (t) {
        var e = this.session;
        if (!e.stopped) {
          var i;
          this.touchAction.preventDefaults(t);
          var n = this.recognizers;
          var r = e.curRecognizer;
          if (!r || r && r.state & 8) {
            r = e.curRecognizer = null;
          }
          for (var s = 0; s < n.length;) {
            i = n[s];
            if (e.stopped === 2 || r && i != r && !i.canRecognizeWith(r)) {
              i.reset();
            } else {
              i.recognize(t);
            }
            if (!r && i.state & 14) {
              r = e.curRecognizer = i;
            }
            s++;
          }
        }
      },
      get: function (t) {
        if (t instanceof bt) {
          return t;
        }
        for (var e = this.recognizers, i = 0; i < e.length; i++) {
          if (e[i].options.event == t) {
            return e[i];
          }
        }
        return null;
      },
      add: function (t) {
        if (l(t, "add", this)) {
          return this;
        }
        var e = this.get(t.options.event);
        if (e) {
          this.remove(e);
        }
        this.recognizers.push(t);
        t.manager = this;
        this.touchAction.update();
        return t;
      },
      remove: function (t) {
        if (l(t, "remove", this)) {
          return this;
        }
        if (t = this.get(t)) {
          var e = this.recognizers;
          var i = S(e, t);
          if (i !== -1) {
            e.splice(i, 1);
            this.touchAction.update();
          }
        }
        return this;
      },
      on: function (t, e) {
        if (t !== n && e !== n) {
          var i = this.handlers;
          p(C(t), function (t) {
            i[t] = i[t] || [];
            i[t].push(e);
          });
          return this;
        }
      },
      off: function (t, e) {
        if (t !== n) {
          var i = this.handlers;
          p(C(t), function (t) {
            if (e) {
              if (i[t]) {
                i[t].splice(S(i[t], e), 1);
              }
            } else {
              delete i[t];
            }
          });
          return this;
        }
      },
      emit: function (t, i) {
        if (this.options.domEvents) {
          (function (t, i) {
            var n = e.createEvent("Event");
            n.initEvent(t, true, true);
            n.gesture = i;
            i.target.dispatchEvent(n);
          })(t, i);
        }
        var n = this.handlers[t] && this.handlers[t].slice();
        if (n && n.length) {
          i.type = t;
          i.preventDefault = function () {
            i.srcEvent.preventDefault();
          };
          for (var r = 0; r < n.length;) {
            n[r](i);
            r++;
          }
        }
      },
      destroy: function () {
        if (this.element) {
          Wt(this, false);
        }
        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
      }
    };
    r(Yt, {
      INPUT_START: 1,
      INPUT_MOVE: 2,
      INPUT_END: 4,
      INPUT_CANCEL: 8,
      STATE_POSSIBLE: 1,
      STATE_BEGAN: 2,
      STATE_CHANGED: 4,
      STATE_ENDED: 8,
      STATE_RECOGNIZED: 8,
      STATE_CANCELLED: 16,
      STATE_FAILED: St,
      DIRECTION_NONE: 1,
      DIRECTION_LEFT: 2,
      DIRECTION_RIGHT: 4,
      DIRECTION_UP: 8,
      DIRECTION_DOWN: 16,
      DIRECTION_HORIZONTAL: 6,
      DIRECTION_VERTICAL: X,
      DIRECTION_ALL: 30,
      Manager: Ft,
      Input: W,
      TouchAction: Ct,
      TouchInput: ut,
      MouseInput: $,
      PointerEventInput: et,
      TouchMouseInput: lt,
      SingleTouchInput: st,
      Recognizer: bt,
      AttrRecognizer: wt,
      Tap: Xt,
      Pan: Ot,
      Swipe: Nt,
      Pinch: Rt,
      Rotate: zt,
      Press: Mt,
      on: E,
      off: I,
      each: p,
      merge: v,
      extend: d,
      assign: r,
      inherit: m,
      bindFn: g,
      prefixed: D
    });
    (t !== undefined ? t : typeof self != "undefined" ? self : {}).Hammer = Yt;
    if (typeof define == "function" && define.amd) {
      define(function () {
        return Yt;
      });
    } else if (typeof module != "undefined" && module.exports) {
      module.exports = Yt;
    } else {
      t.Hammer = Yt;
    }
  })(window, document);
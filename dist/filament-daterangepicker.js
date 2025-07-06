var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date()) return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2) return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1) return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2)) return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2) return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// node_modules/dayjs/plugin/utc.js
var require_utc = __commonJS({
  "node_modules/dayjs/plugin/utc.js"(exports, module) {
    !function(t, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
    }(exports, function() {
      "use strict";
      var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f, n) {
        var u = f.prototype;
        n.utc = function(t2) {
          var i2 = { date: t2, utc: true, args: arguments };
          return new f(i2);
        }, u.utc = function(i2) {
          var e2 = n(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e2.add(this.utcOffset(), t) : e2;
        }, u.local = function() {
          return n(this.toDate(), { locale: this.$L, utc: false });
        };
        var o = u.parse;
        u.parse = function(t2) {
          t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), o.call(this, t2);
        };
        var r = u.init;
        u.init = function() {
          if (this.$u) {
            var t2 = this.$d;
            this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
          } else r.call(this);
        };
        var a = u.utcOffset;
        u.utcOffset = function(s2, f2) {
          var n2 = this.$utils().u;
          if (n2(s2)) return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = function(t2) {
            void 0 === t2 && (t2 = "");
            var s3 = t2.match(i);
            if (!s3) return null;
            var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
            return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
          }(s2), null === s2)) return this;
          var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2, o2 = this;
          if (f2) return o2.$offset = u2, o2.$u = 0 === s2, o2;
          if (0 !== s2) {
            var r2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (o2 = this.local().add(u2 + r2, t)).$offset = u2, o2.$x.$localOffset = r2;
          } else o2 = this.utc();
          return o2;
        };
        var h = u.format;
        u.format = function(t2) {
          var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u.valueOf = function() {
          var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t2;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u.toDate;
        u.toDate = function(t2) {
          return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c = u.diff;
        u.diff = function(t2, i2, e2) {
          if (t2 && this.$u === t2.$u) return c.call(this, t2, i2, e2);
          var s2 = this.local(), f2 = n(t2).local();
          return c.call(s2, f2, i2, e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/timezone.js
var require_timezone = __commonJS({
  "node_modules/dayjs/plugin/timezone.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_timezone = e();
    }(exports, function() {
      "use strict";
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
      return function(n, i, o) {
        var r, a = function(t2, n2, i2) {
          void 0 === i2 && (i2 = {});
          var o2 = new Date(t2), r2 = function(t3, n3) {
            void 0 === n3 && (n3 = {});
            var i3 = n3.timeZoneName || "short", o3 = t3 + "|" + i3, r3 = e[o3];
            return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e[o3] = r3), r3;
          }(n2, i2);
          return r2.formatToParts(o2);
        }, u = function(e2, n2) {
          for (var i2 = a(e2, n2), r2 = [], u2 = 0; u2 < i2.length; u2 += 1) {
            var f2 = i2[u2], s2 = f2.type, m = f2.value, c = t[s2];
            c >= 0 && (r2[c] = parseInt(m, 10));
          }
          var d = r2[3], l = 24 === d ? 0 : d, h = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l + ":" + r2[4] + ":" + r2[5] + ":000", v = +e2;
          return (o.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
        }, f = i.prototype;
        f.tz = function(t2, e2) {
          void 0 === t2 && (t2 = r);
          var n2, i2 = this.utcOffset(), a2 = this.toDate(), u2 = a2.toLocaleString("en-US", { timeZone: t2 }), f2 = Math.round((a2 - new Date(u2)) / 1e3 / 60), s2 = 15 * -Math.round(a2.getTimezoneOffset() / 15) - f2;
          if (!Number(s2)) n2 = this.utcOffset(0, e2);
          else if (n2 = o(u2, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(s2, true), e2) {
            var m = n2.utcOffset();
            n2 = n2.add(i2 - m, "minute");
          }
          return n2.$x.$timezone = t2, n2;
        }, f.offsetName = function(t2) {
          var e2 = this.$x.$timezone || o.tz.guess(), n2 = a(this.valueOf(), e2, { timeZoneName: t2 }).find(function(t3) {
            return "timezonename" === t3.type.toLowerCase();
          });
          return n2 && n2.value;
        };
        var s = f.startOf;
        f.startOf = function(t2, e2) {
          if (!this.$x || !this.$x.$timezone) return s.call(this, t2, e2);
          var n2 = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return s.call(n2, t2, e2).tz(this.$x.$timezone, true);
        }, o.tz = function(t2, e2, n2) {
          var i2 = n2 && e2, a2 = n2 || e2 || r, f2 = u(+o(), a2);
          if ("string" != typeof t2) return o(t2).tz(a2);
          var s2 = function(t3, e3, n3) {
            var i3 = t3 - 60 * e3 * 1e3, o2 = u(i3, n3);
            if (e3 === o2) return [i3, e3];
            var r2 = u(i3 -= 60 * (o2 - e3) * 1e3, n3);
            return o2 === r2 ? [i3, o2] : [t3 - 60 * Math.min(o2, r2) * 1e3, Math.max(o2, r2)];
          }(o.utc(t2, i2).valueOf(), f2, a2), m = s2[0], c = s2[1], d = o(m).utcOffset(c);
          return d.$x.$timezone = a2, d;
        }, o.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o.tz.setDefault = function(t2) {
          r = t2;
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = __commonJS({
  "node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
    }(exports, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e2) {
        return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
      };
      var f = function(e2) {
        return function(t2) {
          this[e2] = +t2;
        };
      }, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
        (this.zone || (this.zone = {})).offset = function(e3) {
          if (!e3) return 0;
          if ("Z" === e3) return 0;
          var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
          return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
        }(e2);
      }], u = function(e2) {
        var t2 = s[e2];
        return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
      }, d = function(e2, t2) {
        var n2, r2 = s.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1) if (e2.indexOf(r2(i2, 0, t2)) > -1) {
            n2 = i2 > 12;
            break;
          }
        } else n2 = e2 === (t2 ? "pm" : "PM");
        return n2;
      }, c = { A: [o, function(e2) {
        this.afternoon = d(e2, false);
      }], a: [o, function(e2) {
        this.afternoon = d(e2, true);
      }], Q: [n, function(e2) {
        this.month = 3 * (e2 - 1) + 1;
      }], S: [n, function(e2) {
        this.milliseconds = 100 * +e2;
      }], SS: [r, function(e2) {
        this.milliseconds = 10 * +e2;
      }], SSS: [/\d{3}/, function(e2) {
        this.milliseconds = +e2;
      }], s: [i, f("seconds")], ss: [i, f("seconds")], m: [i, f("minutes")], mm: [i, f("minutes")], H: [i, f("hours")], h: [i, f("hours")], HH: [i, f("hours")], hh: [i, f("hours")], D: [i, f("day")], DD: [r, f("day")], Do: [o, function(e2) {
        var t2 = s.ordinal, n2 = e2.match(/\d+/);
        if (this.day = n2[0], t2) for (var r2 = 1; r2 <= 31; r2 += 1) t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
      }], w: [i, f("week")], ww: [r, f("week")], M: [i, f("month")], MM: [r, f("month")], MMM: [o, function(e2) {
        var t2 = u("months"), n2 = (u("monthsShort") || t2.map(function(e3) {
          return e3.slice(0, 3);
        })).indexOf(e2) + 1;
        if (n2 < 1) throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [o, function(e2) {
        var t2 = u("months").indexOf(e2) + 1;
        if (t2 < 1) throw new Error();
        this.month = t2 % 12 || t2;
      }], Y: [/[+-]?\d+/, f("year")], YY: [r, function(e2) {
        this.year = a(e2);
      }], YYYY: [/\d{4}/, f("year")], Z: h, ZZ: h };
      function l(n2) {
        var r2, i2;
        r2 = n2, i2 = s && s.formats;
        for (var o2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
          var o3 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || e[r3] || i2[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
            return t3 || n4.slice(1);
          });
        })).match(t), a2 = o2.length, f2 = 0; f2 < a2; f2 += 1) {
          var h2 = o2[f2], u2 = c[h2], d2 = u2 && u2[0], l2 = u2 && u2[1];
          o2[f2] = l2 ? { regex: d2, parser: l2 } : h2.replace(/^\[|\]$/g, "");
        }
        return function(e2) {
          for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = o2[n3];
            if ("string" == typeof i3) r3 += i3.length;
            else {
              var s2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = s2.exec(h3)[0];
              f3.call(t2, u3), e2 = e2.replace(u3, "");
            }
          }
          return function(e3) {
            var t3 = e3.afternoon;
            if (void 0 !== t3) {
              var n4 = e3.hours;
              t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
            }
          }(t2), t2;
        };
      }
      return function(e2, t2, n2) {
        n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (a = e2.parseTwoDigitYear);
        var r2 = t2.prototype, i2 = r2.parse;
        r2.parse = function(e3) {
          var t3 = e3.date, r3 = e3.utc, o2 = e3.args;
          this.$u = r3;
          var a2 = o2[1];
          if ("string" == typeof a2) {
            var f2 = true === o2[2], h2 = true === o2[3], u2 = f2 || h2, d2 = o2[2];
            h2 && (d2 = o2[2]), s = this.$locale(), !f2 && d2 && (s = n2.Ls[d2]), this.$d = function(e4, t4, n3, r4) {
              try {
                if (["x", "X"].indexOf(t4) > -1) return new Date(("X" === t4 ? 1e3 : 1) * e4);
                var i3 = l(t4)(e4), o3 = i3.year, s2 = i3.month, a3 = i3.day, f3 = i3.hours, h3 = i3.minutes, u3 = i3.seconds, d3 = i3.milliseconds, c3 = i3.zone, m2 = i3.week, M2 = /* @__PURE__ */ new Date(), Y = a3 || (o3 || s2 ? 1 : M2.getDate()), p = o3 || M2.getFullYear(), v = 0;
                o3 && !s2 || (v = s2 > 0 ? s2 - 1 : M2.getMonth());
                var D, w = f3 || 0, g = h3 || 0, y = u3 || 0, L = d3 || 0;
                return c3 ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c3.offset * 1e3)) : n3 ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m2 && (D = r4(D).week(m2).toDate()), D);
              } catch (e5) {
                return /* @__PURE__ */ new Date("");
              }
            }(t3, a2, r3, n2), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
          } else if (a2 instanceof Array) for (var c2 = a2.length, m = 1; m <= c2; m += 1) {
            o2[1] = a2[m - 1];
            var M = n2.apply(this, o2);
            if (M.isValid()) {
              this.$d = M.$d, this.$L = M.$L, this.init();
              break;
            }
            m === c2 && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else i2.call(this, e3);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = __commonJS({
  "node_modules/dayjs/plugin/isSameOrAfter.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
    }(exports, function() {
      "use strict";
      return function(e, t) {
        t.prototype.isSameOrAfter = function(e2, t2) {
          return this.isSame(e2, t2) || this.isAfter(e2, t2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isSameOrBefore.js
var require_isSameOrBefore = __commonJS({
  "node_modules/dayjs/plugin/isSameOrBefore.js"(exports, module) {
    !function(e, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrBefore = i();
    }(exports, function() {
      "use strict";
      return function(e, i) {
        i.prototype.isSameOrBefore = function(e2, i2) {
          return this.isSame(e2, i2) || this.isBefore(e2, i2);
        };
      };
    });
  }
});

// node_modules/moment/moment.js
var require_moment = __commonJS({
  "node_modules/moment/moment.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory();
    })(exports, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback) {
        hookCallback = callback;
      }
      function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
      }
      function isObject(input) {
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (hasOwnProp(obj, k)) {
              return false;
            }
          }
          return true;
        }
      }
      function isUndefined(input) {
        return input === void 0;
      }
      function isNumber(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
      }
      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
      }
      function map(arr, fn) {
        var res = [], i, arrLen = arr.length;
        for (i = 0; i < arrLen; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }
      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }
        if (hasOwnProp(b, "toString")) {
          a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
          a.valueOf = b.valueOf;
        }
        return a;
      }
      function createUTC(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }
      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function(fun) {
          var t = Object(this), len = t.length >>> 0, i;
          for (i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
              return true;
            }
          }
          return false;
        };
      }
      function isValid(m) {
        var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
        if (isNowValid) {
          flags = getParsingFlags(m);
          parsedParts = some.call(flags.parsedDateParts, function(i) {
            return i != null;
          });
          isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
          }
        }
        if (Object.isFrozen == null || !Object.isFrozen(m)) {
          m._isValid = isNowValid;
        } else {
          return isNowValid;
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to2, from2) {
        var i, prop, val, momentPropertiesLen = momentProperties.length;
        if (!isUndefined(from2._isAMomentObject)) {
          to2._isAMomentObject = from2._isAMomentObject;
        }
        if (!isUndefined(from2._i)) {
          to2._i = from2._i;
        }
        if (!isUndefined(from2._f)) {
          to2._f = from2._f;
        }
        if (!isUndefined(from2._l)) {
          to2._l = from2._l;
        }
        if (!isUndefined(from2._strict)) {
          to2._strict = from2._strict;
        }
        if (!isUndefined(from2._tzm)) {
          to2._tzm = from2._tzm;
        }
        if (!isUndefined(from2._isUTC)) {
          to2._isUTC = from2._isUTC;
        }
        if (!isUndefined(from2._offset)) {
          to2._offset = from2._offset;
        }
        if (!isUndefined(from2._pf)) {
          to2._pf = getParsingFlags(from2);
        }
        if (!isUndefined(from2._locale)) {
          to2._locale = from2._locale;
        }
        if (momentPropertiesLen > 0) {
          for (i = 0; i < momentPropertiesLen; i++) {
            prop = momentProperties[i];
            val = from2[prop];
            if (!isUndefined(val)) {
              to2[prop] = val;
            }
          }
        }
        return to2;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = /* @__PURE__ */ new Date(NaN);
        }
        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }
      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
          console.warn("Deprecation warning: " + msg);
        }
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [], arg, i, key, argLen = arguments.length;
            for (i = 0; i < argLen; i++) {
              arg = "";
              if (typeof arguments[i] === "object") {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) {
                  if (hasOwnProp(arguments[0], key)) {
                    arg += key + ": " + arguments[0][key] + ", ";
                  }
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(
              msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
            );
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
      }
      function set(config) {
        var prop, i;
        for (i in config) {
          if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) {
              this[i] = prop;
            } else {
              this["_" + i] = prop;
            }
          }
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
        );
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }
      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }
      var keys;
      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function(obj) {
          var i, res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now2) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now2) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
        return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token2, padded, ordinal2, callback) {
        var func = callback;
        if (typeof callback === "string") {
          func = function() {
            return this[callback]();
          };
        }
        if (token2) {
          formatTokenFunctions[token2] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal2) {
          formatTokenFunctions[ordinal2] = function() {
            return this.localeData().ordinal(
              func.apply(this, arguments),
              token2
            );
          };
        }
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format2) {
        var array = format2.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }
        return function(mom) {
          var output = "", i2;
          for (i2 = 0; i2 < length; i2++) {
            output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
          }
          return output;
        };
      }
      function formatMoment(m, format2) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }
        format2 = expandFormat(format2, m.localeData());
        formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
        return formatFunctions[format2](m);
      }
      function expandFormat(format2, locale2) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale2.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format2)) {
          format2 = format2.replace(
            localFormattingTokens,
            replaceLongDateFormatTokens
          );
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format2;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format2 || !formatUpper) {
          return format2;
        }
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
            return tok.slice(1);
          }
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff2, output) {
        var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
        return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
      }
      var aliases = {
        D: "date",
        dates: "date",
        date: "date",
        d: "day",
        days: "day",
        day: "day",
        e: "weekday",
        weekdays: "weekday",
        weekday: "weekday",
        E: "isoWeekday",
        isoweekdays: "isoWeekday",
        isoweekday: "isoWeekday",
        DDD: "dayOfYear",
        dayofyears: "dayOfYear",
        dayofyear: "dayOfYear",
        h: "hour",
        hours: "hour",
        hour: "hour",
        ms: "millisecond",
        milliseconds: "millisecond",
        millisecond: "millisecond",
        m: "minute",
        minutes: "minute",
        minute: "minute",
        M: "month",
        months: "month",
        month: "month",
        Q: "quarter",
        quarters: "quarter",
        quarter: "quarter",
        s: "second",
        seconds: "second",
        second: "second",
        gg: "weekYear",
        weekyears: "weekYear",
        weekyear: "weekYear",
        GG: "isoWeekYear",
        isoweekyears: "isoWeekYear",
        isoweekyear: "isoWeekYear",
        w: "week",
        weeks: "week",
        week: "week",
        W: "isoWeek",
        isoweeks: "isoWeek",
        isoweek: "isoWeek",
        y: "year",
        years: "year",
        year: "year"
      };
      function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }
        return normalizedInput;
      }
      var priorities = {
        date: 9,
        day: 11,
        weekday: 11,
        isoWeekday: 11,
        dayOfYear: 4,
        hour: 13,
        millisecond: 16,
        minute: 14,
        month: 8,
        quarter: 7,
        second: 15,
        weekYear: 1,
        isoWeekYear: 1,
        week: 5,
        isoWeek: 5,
        year: 1
      };
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
            units.push({ unit: u, priority: priorities[u] });
          }
        }
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
      regexes = {};
      function addRegexToken(token2, regex, strictRegex) {
        regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token2, config) {
        if (!hasOwnProp(regexes, token2)) {
          return new RegExp(unescapeFormat(token2));
        }
        return regexes[token2](config._strict, config._locale);
      }
      function unescapeFormat(s) {
        return regexEscape(
          s.replace("\\", "").replace(
            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
            function(matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
            }
          )
        );
      }
      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }
        return value;
      }
      var tokens = {};
      function addParseToken(token2, callback) {
        var i, func = callback, tokenLen;
        if (typeof token2 === "string") {
          token2 = [token2];
        }
        if (isNumber(callback)) {
          func = function(input, array) {
            array[callback] = toInt(input);
          };
        }
        tokenLen = token2.length;
        for (i = 0; i < tokenLen; i++) {
          tokens[token2[i]] = func;
        }
      }
      function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token3) {
          config._w = config._w || {};
          callback(input, config._w, config, token3);
        });
      }
      function addTimeToArrayFromToken(token2, input, config) {
        if (input != null && hasOwnProp(tokens, token2)) {
          tokens[token2](input, config._a, config, token2);
        }
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, ["YYYY", 4], 0, "year");
      addFormatToken(0, ["YYYYY", 5], 0, "year");
      addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken(["YYYYY", "YYYYYY"], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }
      function get(mom, unit) {
        if (!mom.isValid()) {
          return NaN;
        }
        var d = mom._d, isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
          case "Seconds":
            return isUTC ? d.getUTCSeconds() : d.getSeconds();
          case "Minutes":
            return isUTC ? d.getUTCMinutes() : d.getMinutes();
          case "Hours":
            return isUTC ? d.getUTCHours() : d.getHours();
          case "Date":
            return isUTC ? d.getUTCDate() : d.getDate();
          case "Day":
            return isUTC ? d.getUTCDay() : d.getDay();
          case "Month":
            return isUTC ? d.getUTCMonth() : d.getMonth();
          case "FullYear":
            return isUTC ? d.getUTCFullYear() : d.getFullYear();
          default:
            return NaN;
        }
      }
      function set$1(mom, unit, value) {
        var d, isUTC, year, month, date;
        if (!mom.isValid() || isNaN(value)) {
          return;
        }
        d = mom._d;
        isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
          case "Seconds":
            return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
          case "Minutes":
            return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
          case "Hours":
            return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
          case "Date":
            return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
          // case 'Day': // Not real
          //    return void (isUTC ? d.setUTCDay(value) : d.setDay(value));
          // case 'Month': // Not used because we need to pass two variables
          //     return void (isUTC ? d.setUTCMonth(value) : d.setMonth(value));
          case "FullYear":
            break;
          // See below ...
          default:
            return;
        }
        year = value;
        month = mom.month();
        date = mom.date();
        date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
        void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units]();
        }
        return this;
      }
      function stringSet(units, value) {
        if (typeof units === "object") {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
          for (i = 0; i < prioritizedLen; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format2) {
        return this.localeData().monthsShort(this, format2);
      });
      addFormatToken("MMMM", 0, 0, function(format2) {
        return this.localeData().months(this, format2);
      });
      addRegexToken("M", match1to2, match1to2NoLeadingZero);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale2) {
        return locale2.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale2) {
        return locale2.monthsRegex(isStrict);
      });
      addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
        var month = config._locale.monthsParse(input, token2, config._strict);
        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format2) {
        if (!m) {
          return isArray(this._months) ? this._months : this._months["standalone"];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format2) {
        if (!m) {
          return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format2, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2e3, i]);
            this._shortMonthsParse[i] = this.monthsShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeMonthsParse(monthName, format2, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format2, strict);
        }
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp(
              "^" + this.months(mom, "").replace(".", "") + "$",
              "i"
            );
            this._shortMonthsParse[i] = new RegExp(
              "^" + this.monthsShort(mom, "").replace(".", "") + "$",
              "i"
            );
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
      function setMonth(mom, value) {
        if (!mom.isValid()) {
          return mom;
        }
        if (typeof value === "string") {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);
            if (!isNumber(value)) {
              return mom;
            }
          }
        }
        var month = value, date = mom.date();
        date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
        void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
        return mom;
      }
      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, "Month");
        }
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsShortRegex")) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsRegex")) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          shortP = regexEscape(this.monthsShort(mom, ""));
          longP = regexEscape(this.months(mom, ""));
          shortPieces.push(shortP);
          longPieces.push(longP);
          mixedPieces.push(longP);
          mixedPieces.push(shortP);
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._monthsShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
      }
      function createDate(y, m, d, h, M, s, ms) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d, h, M, s, ms);
          if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
        } else {
          date = new Date(y, m, d, h, M, s, ms);
        }
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
        } else {
          date = new Date(Date.UTC.apply(null, arguments));
        }
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", ["ww", 2], "wo", "week");
      addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
      addRegexToken("w", match1to2, match1to2NoLeadingZero);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2, match1to2NoLeadingZero);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken(
        ["w", "ww", "W", "WW"],
        function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        }
      );
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        // Sunday is the first day of the week.
        doy: 6
        // The week that contains Jan 6th is the first week of the year.
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format2) {
        return this.localeData().weekdaysMin(this, format2);
      });
      addFormatToken("ddd", 0, 0, function(format2) {
        return this.localeData().weekdaysShort(this, format2);
      });
      addFormatToken("dddd", 0, 0, function(format2) {
        return this.localeData().weekdays(this, format2);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale2) {
        return locale2.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale2) {
        return locale2.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale2) {
        return locale2.weekdaysRegex(isStrict);
      });
      addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(input, token2, config._strict);
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });
      addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
        week[token2] = toInt(input);
      });
      function parseWeekday(input, locale2) {
        if (typeof input !== "string") {
          return input;
        }
        if (!isNaN(input)) {
          return parseInt(input, 10);
        }
        input = locale2.weekdaysParse(input);
        if (typeof input === "number") {
          return input;
        }
        return null;
      }
      function parseIsoWeekday(input, locale2) {
        if (typeof input === "string") {
          return locale2.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format2) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format2, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([2e3, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(
              mom,
              ""
            ).toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeWeekdaysParse(weekdayName, format2, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format2, strict);
        }
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp(
              "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._shortWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._minWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = get(this, "Day");
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        } else {
          return day;
        }
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysShortRegex")) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysMinRegex")) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._weekdaysShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
        this._weekdaysMinStrictRegex = new RegExp(
          "^(" + minPieces.join("|") + ")",
          "i"
        );
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", ["HH", 2], 0, "hour");
      addFormatToken("h", ["hh", 2], 0, hFormat);
      addFormatToken("k", ["kk", 2], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token2, lowercase) {
        addFormatToken(token2, 0, 0, function() {
          return this.localeData().meridiem(
            this.hours(),
            this.minutes(),
            lowercase
          );
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      function matchMeridiem(isStrict, locale2) {
        return locale2._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2, match1to2HasZero);
      addRegexToken("h", match1to2, match1to2NoLeadingZero);
      addRegexToken("k", match1to2, match1to2NoLeadingZero);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken(["H", "HH"], HOUR);
      addParseToken(["k", "kk"], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return (input + "").toLowerCase().charAt(0) === "p";
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours2, minutes2, isLower) {
        if (hours2 > 11) {
          return isLower ? "pm" : "PM";
        } else {
          return isLower ? "am" : "AM";
        }
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
            return i;
          }
        }
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names) {
        var i = 0, j, next, locale2, split;
        while (i < names.length) {
          split = normalizeLocale(names[i]).split("-");
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale2 = loadLocale(split.slice(0, j).join("-"));
            if (locale2) {
              return locale2;
            }
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function isLocaleNameSane(name) {
        return !!(name && name.match("^[^/\\\\]*$"));
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
          try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = __require;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {
            locales[name] = null;
          }
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }
          if (data) {
            globalLocale = data;
          } else {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(
                "Locale " + key + " not found. Did you forget to load it?"
              );
            }
          }
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (config !== null) {
          var locale2, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            );
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              locale2 = loadLocale(config.parentLocale);
              if (locale2 != null) {
                parentConfig = locale2._config;
              } else {
                if (!localeFamilies[config.parentLocale]) {
                  localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                  name,
                  config
                });
                return null;
              }
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function(x) {
              defineLocale(x.name, x.config);
            });
          }
          getSetGlobalLocale(name);
          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }
      function updateLocale(name, config) {
        if (config != null) {
          var locale2, tmpLocale, parentConfig = baseConfig;
          if (locales[name] != null && locales[name].parentLocale != null) {
            locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            if (tmpLocale == null) {
              config.abbr = name;
            }
            locale2 = new Locale(config);
            locale2.parentLocale = locales[name];
            locales[name] = locale2;
          }
          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
              if (name === getSetGlobalLocale()) {
                getSetGlobalLocale(name);
              }
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }
      function getLocale(key) {
        var locale2;
        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }
        if (!key) {
          return globalLocale;
        }
        if (!isArray(key)) {
          locale2 = loadLocale(key);
          if (locale2) {
            return locale2;
          }
          key = [key];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false]
      ], isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
      ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDatesLen; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimesLen; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || " ") + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = "Z";
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
        ];
        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2e3 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }
      function preprocessRFC2822(s) {
        return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2]
          ).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
          return h * 60 + m;
        }
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(
            match[4],
            match[3],
            match[2],
            match[5],
            match[6],
            match[7]
          );
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
          config._d = /* @__PURE__ */ new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        if (config._strict) {
          config._isValid = false;
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      hooks.createFromInputFallback = deprecate(
        "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
        function(config) {
          config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
        }
      );
      function defaults(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
          ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) {
          return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(
          null,
          input
        );
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
          config._a[HOUR] = 24;
        }
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;
          weekYear = defaults(
            w.GG,
            config._a[YEAR],
            weekOfYear(createLocal(), 1, 4).year
          );
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
          week = defaults(w.w, curWeek.week);
          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {
      };
      hooks.RFC_2822 = function() {
      };
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
        tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens2.length;
        for (i = 0; i < tokenLen; i++) {
          token2 = tokens2[i];
          parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(
              string.indexOf(parsedInput) + parsedInput.length
            );
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token2]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token2);
            }
            addTimeToArrayFromToken(token2, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token2);
          }
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = void 0;
        }
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(
          config._locale,
          config._a[HOUR],
          config._meridiem
        );
        era = getParsingFlags(config).era;
        if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale2, hour, meridiem2) {
        var isPm;
        if (meridiem2 == null) {
          return hour;
        }
        if (locale2.meridiemHour != null) {
          return locale2.meridiemHour(hour, meridiem2);
        } else if (locale2.isPM != null) {
          isPm = locale2.isPM(meridiem2);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
        if (configfLen === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = /* @__PURE__ */ new Date(NaN);
          return;
        }
        for (i = 0; i < configfLen; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          if (isValid(tempConfig)) {
            validFormatFound = true;
          }
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
          getParsingFlags(tempConfig).score = currentScore;
          if (!bestFormatIsValid) {
            if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
              if (validFormatFound) {
                bestFormatIsValid = true;
              }
            }
          } else {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) {
          return;
        }
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
        config._a = map(
          [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
          function(obj) {
            return obj && parseInt(obj, 10);
          }
        );
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format2 = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format2 === void 0 && input === "") {
          return createInvalid({ nullInput: true });
        }
        if (typeof input === "string") {
          config._i = input = config._locale.preparse(input);
        }
        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray(format2)) {
          configFromStringAndArray(config);
        } else if (format2) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }
        if (!isValid(config)) {
          config._d = null;
        }
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === "string") {
          configFromString(config);
        } else if (isArray(input)) {
          config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject(input)) {
          configFromObject(config);
        } else if (isNumber(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
        var c = {};
        if (format2 === true || format2 === false) {
          strict = format2;
          format2 = void 0;
        }
        if (locale2 === true || locale2 === false) {
          strict = locale2;
          locale2 = void 0;
        }
        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
          input = void 0;
        }
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale2;
        c._i = input;
        c._f = format2;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, false);
      }
      var prototypeMin = deprecate(
        "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }
      ), prototypeMax = deprecate(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        }
      );
      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      };
      var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond"
      ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i, orderLen = ordering.length;
        for (key in m) {
          if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }
        for (i = 0; i < orderLen; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
        minutes2 * 6e4 + // 1000 * 60
        hours2 * 1e3 * 60 * 60;
        this._days = +days2 + weeks2 * 7;
        this._months = +months2 + quarters * 3 + years2 * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }
      function offset(token2, separator) {
        addFormatToken(token2, 0, 0, function() {
          var offset2 = this.utcOffset(), sign2 = "+";
          if (offset2 < 0) {
            offset2 = -offset2;
            sign2 = "-";
          }
          return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes2;
        if (matches === null) {
          return null;
        }
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
        minutes2 = +(parts[1] * 60) + toInt(parts[2]);
        return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
      }
      function cloneWithOffset(input, model) {
        var res, diff2;
        if (model._isUTC) {
          res = model.clone();
          diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff2);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {
      };
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset2 = this._offset || 0, localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === "string") {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, "m");
          }
          if (offset2 !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(
                this,
                createDuration(input - offset2, "m"),
                1,
                false
              );
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset2 : getDateOffset(this);
        }
      }
      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== "string") {
            input = -input;
          }
          this.utcOffset(input, keepLocalTime);
          return this;
        } else {
          return -this.utcOffset();
        }
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          if (keepLocalTime) {
            this.subtract(getDateOffset(this), "m");
          }
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === "string") {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }
        return this._isDSTShifted;
      }
      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }
      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }
      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign2, ret, diffRes;
        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
            duration[key] = +input;
          } else {
            duration.milliseconds = +input;
          }
        } else if (match = aspNetRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign2,
            h: toInt(match[HOUR]) * sign2,
            m: toInt(match[MINUTE]) * sign2,
            s: toInt(match[SECOND]) * sign2,
            ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
            // the millisecond decimal point is included in the match
          };
        } else if (match = isoRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign2),
            M: parseIso(match[3], sign2),
            w: parseIso(match[4], sign2),
            d: parseIso(match[5], sign2),
            h: parseIso(match[6], sign2),
            m: parseIso(match[7], sign2),
            s: parseIso(match[8], sign2)
          };
        } else if (duration == null) {
          duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(
            createLocal(duration.from),
            createLocal(duration.to)
          );
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) {
          ret._locale = input._locale;
        }
        if (isDuration(input) && hasOwnProp(input, "_isValid")) {
          ret._isValid = input._isValid;
        }
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign2) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign2;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
          --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
        }
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (period !== null && !isNaN(+period)) {
            deprecateSimple(
              name,
              "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
            );
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
        if (!mom.isValid()) {
          return;
        }
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months2) {
          setMonth(mom, get(mom, "Month") + months2 * isAdding);
        }
        if (days2) {
          set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
        }
        if (milliseconds2) {
          mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days2 || months2);
        }
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return typeof input === "string" || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms"
        ], i, property, propertyLen = properties.length;
        for (i = 0; i < propertyLen; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) {
          dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
          }).length === 0;
        }
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now2) {
        var diff2 = myMoment.diff(now2, "days", true);
        return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (arguments.length === 1) {
          if (!arguments[0]) {
            time = void 0;
            formats = void 0;
          } else if (isMomentInput(arguments[0])) {
            time = arguments[0];
            formats = void 0;
          } else if (isCalendarSpec(arguments[0])) {
            formats = arguments[0];
            time = void 0;
          }
        }
        var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
        return this.format(
          output || this.localeData().calendar(format2, this, createLocal(now2))
        );
      }
      function clone() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }
      function isBetween(from2, to2, units, inclusivity) {
        var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
        }
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }
      function isSameOrAfter2(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore2(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) {
          return NaN;
        }
        that = cloneWithOffset(input, this);
        if (!that.isValid()) {
          return NaN;
        }
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch (units) {
          case "year":
            output = monthDiff(this, that) / 12;
            break;
          case "month":
            output = monthDiff(this, that);
            break;
          case "quarter":
            output = monthDiff(this, that) / 3;
            break;
          case "second":
            output = (this - that) / 1e3;
            break;
          // 1000
          case "minute":
            output = (this - that) / 6e4;
            break;
          // 1000 * 60
          case "hour":
            output = (this - that) / 36e5;
            break;
          // 1000 * 60 * 60
          case "day":
            output = (this - that - zoneDelta) / 864e5;
            break;
          // 1000 * 60 * 60 * 24, negate dst
          case "week":
            output = (this - that - zoneDelta) / 6048e5;
            break;
          // 1000 * 60 * 60 * 24 * 7, negate dst
          default:
            output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) {
          return -monthDiff(b, a);
        }
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) {
          return null;
        }
        var utc2 = keepOffset !== true, m = utc2 ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(
            m,
            utc2 ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        if (isFunction(Date.prototype.toISOString)) {
          if (utc2) {
            return this.toDate().toISOString();
          } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
          }
        }
        return formatMoment(
          m,
          utc2 ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      function inspect() {
        if (!this.isValid()) {
          return "moment.invalid(/* " + this._i + " */)";
        }
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale(key) {
        var newLocaleData;
        if (key === void 0) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }
      var lang = deprecate(
        "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
        function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        }
      );
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return new Date(y, m, d).valueOf();
        }
      }
      function utcStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return Date.UTC(y, m, d);
        }
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year(), 0, 1);
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3,
              1
            );
            break;
          case "month":
            time = startOfDate(this.year(), this.month(), 1);
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday()
            );
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1)
            );
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date());
            break;
          case "hour":
            time = this._d.valueOf();
            time -= mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            );
            break;
          case "minute":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_MINUTE);
            break;
          case "second":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_SECOND);
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3 + 3,
              1
            ) - 1;
            break;
          case "month":
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7
            ) - 1;
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            ) - 1;
            break;
          case "minute":
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
            break;
          case "second":
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond()
        ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", ["y", 1], "yo", "eraYear");
      addFormatToken("y", ["yy", 2], 0, "eraYear");
      addFormatToken("y", ["yyy", 3], 0, "eraYear");
      addFormatToken("y", ["yyyy", 4], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken(
        ["N", "NN", "NNN", "NNNN", "NNNNN"],
        function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        }
      );
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
      addParseToken(["yo"], function(input, array, config, token2) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
        }
        if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
          array[YEAR] = parseInt(input, 10);
        }
      });
      function localeEras(m, format2) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
            case "string":
              date = hooks(eras[i].since).startOf("day");
              eras[i].since = date.valueOf();
              break;
          }
          switch (typeof eras[i].until) {
            case "undefined":
              eras[i].until = Infinity;
              break;
            case "string":
              date = hooks(eras[i].until).startOf("day").valueOf();
              eras[i].until = date.valueOf();
              break;
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format2, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) {
            switch (format2) {
              case "N":
              case "NN":
              case "NNN":
                if (abbr === eraName) {
                  return eras[i];
                }
                break;
              case "NNNN":
                if (name === eraName) {
                  return eras[i];
                }
                break;
              case "NNNNN":
                if (narrow === eraName) {
                  return eras[i];
                }
                break;
            }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
            return eras[i];
          }
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === void 0) {
          return hooks(era.since).year();
        } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
        }
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
          }
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
          }
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
          }
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
            return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
          }
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale2) {
        return locale2.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale2) {
        return locale2.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale2) {
        return locale2.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale2) {
        return locale2._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          erasName = regexEscape(eras[i].name);
          erasAbbr = regexEscape(eras[i].abbr);
          erasNarrow = regexEscape(eras[i].narrow);
          namePieces.push(erasName);
          abbrPieces.push(erasAbbr);
          narrowPieces.push(erasNarrow);
          mixedPieces.push(erasName);
          mixedPieces.push(erasAbbr);
          mixedPieces.push(erasNarrow);
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp(
          "^(" + narrowPieces.join("|") + ")",
          "i"
        );
      }
      addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token2, getter) {
        addFormatToken(0, [token2, token2.length], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken(
        ["gggg", "ggggg", "GGGG", "GGGGG"],
        function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        }
      );
      addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
        week[token2] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.week(),
          this.weekday() + this.localeData()._week.dow,
          this.localeData()._week.dow,
          this.localeData()._week.doy
        );
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.isoWeek(),
          this.isoWeekday(),
          1,
          4
        );
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });
      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }
      addFormatToken("D", ["DD", 2], "Do", "date");
      addRegexToken("D", match1to2, match1to2NoLeadingZero);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale2) {
        return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
      });
      addParseToken(["D", "DD"], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", ["mm", 2], 0, "minute");
      addRegexToken("m", match1to2, match1to2HasZero);
      addRegexToken("mm", match1to2, match2);
      addParseToken(["m", "mm"], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", ["ss", 2], 0, "second");
      addRegexToken("s", match1to2, match1to2HasZero);
      addRegexToken("ss", match1to2, match2);
      addParseToken(["s", "ss"], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, ["SSS", 3], 0, "millisecond");
      addFormatToken(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      });
      addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      });
      addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      });
      addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      });
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") {
        addRegexToken(token, matchUnsigned);
      }
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1e3);
      }
      for (token = "S"; token.length <= 9; token += "S") {
        addParseToken(token, parseMs);
      }
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter2;
      proto.isSameOrBefore = isSameOrBefore2;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== "undefined" && Symbol.for != null) {
        proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
          return "Moment<" + this.format() + ">";
        };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
        "dates accessor is deprecated. Use date instead.",
        getSetDayOfMonth
      );
      proto.months = deprecate(
        "months accessor is deprecated. Use month instead",
        getSetMonth
      );
      proto.years = deprecate(
        "years accessor is deprecated. Use year instead",
        getSetYear
      );
      proto.zone = deprecate(
        "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
        getSetZone
      );
      proto.isDSTShifted = deprecate(
        "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
        isDaylightSavingTimeShifted
      );
      function createUnix(input) {
        return createLocal(input * 1e3);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format2, index, field, setter) {
        var locale2 = getLocale(), utc2 = createUTC().set(setter, index);
        return locale2[field](utc2, format2);
      }
      function listMonthsImpl(format2, index, field) {
        if (isNumber(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
        if (index != null) {
          return get$1(format2, index, field, "month");
        }
        var i, out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format2, i, field, "month");
        }
        return out;
      }
      function listWeekdaysImpl(localeSorted, format2, index, field) {
        if (typeof localeSorted === "boolean") {
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        } else {
          format2 = localeSorted;
          index = format2;
          localeSorted = false;
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        }
        var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
        if (index != null) {
          return get$1(format2, (index + shift) % 7, field, "day");
        }
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format2, (i + shift) % 7, field, "day");
        }
        return out;
      }
      function listMonths(format2, index) {
        return listMonthsImpl(format2, index, "months");
      }
      function listMonthsShort(format2, index) {
        return listMonthsImpl(format2, index, "monthsShort");
      }
      function listWeekdays(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [
          {
            since: "0001-01-01",
            until: Infinity,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
          },
          {
            since: "0000-12-31",
            until: -Infinity,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
          }
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        getSetGlobalLocale
      );
      hooks.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        getLocale
      );
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }
      function bubble() {
        var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
        if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
          milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
          days2 = 0;
          months2 = 0;
        }
        data.milliseconds = milliseconds2 % 1e3;
        seconds2 = absFloor(milliseconds2 / 1e3);
        data.seconds = seconds2 % 60;
        minutes2 = absFloor(seconds2 / 60);
        data.minutes = minutes2 % 60;
        hours2 = absFloor(minutes2 / 60);
        data.hours = hours2 % 24;
        days2 += absFloor(hours2 / 24);
        monthsFromDays = absFloor(daysToMonths(days2));
        months2 += monthsFromDays;
        days2 -= absCeil(monthsToDays(monthsFromDays));
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        data.days = days2;
        data.months = months2;
        data.years = years2;
        return this;
      }
      function daysToMonths(days2) {
        return days2 * 4800 / 146097;
      }
      function monthsToDays(months2) {
        return months2 * 146097 / 4800;
      }
      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days2, months2, milliseconds2 = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
          days2 = this._days + milliseconds2 / 864e5;
          months2 = this._months + daysToMonths(days2);
          switch (units) {
            case "month":
              return months2;
            case "quarter":
              return months2 / 3;
            case "year":
              return months2 / 12;
          }
        } else {
          days2 = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case "week":
              return days2 / 7 + milliseconds2 / 6048e5;
            case "day":
              return days2 + milliseconds2 / 864e5;
            case "hour":
              return days2 * 24 + milliseconds2 / 36e5;
            case "minute":
              return days2 * 1440 + milliseconds2 / 6e4;
            case "second":
              return days2 * 86400 + milliseconds2 / 1e3;
            // Math.floor prevents floating point math errors here
            case "millisecond":
              return Math.floor(days2 * 864e5) + milliseconds2;
            default:
              throw new Error("Unknown unit " + units);
          }
        }
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round = Math.round, thresholds = {
        ss: 44,
        // a few seconds to seconds
        s: 45,
        // seconds to minute
        m: 45,
        // minutes to hour
        h: 22,
        // hours to day
        d: 26,
        // days to month/week
        w: null,
        // weeks to month
        M: 11
        // months to year
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
        return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
        var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
        if (thresholds2.w != null) {
          a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
        }
        a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale2;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === void 0) {
          return round;
        }
        if (typeof roundingFunction === "function") {
          round = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === void 0) {
          return false;
        }
        if (limit === void 0) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === "s") {
          thresholds.ss = limit - 1;
        }
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var withSuffix = false, th = thresholds, locale2, output;
        if (typeof argWithSuffix === "object") {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") {
          withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === "object") {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
            th.ss = argThresholds.s - 1;
          }
        }
        locale2 = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale2);
        if (withSuffix) {
          output = locale2.pastFuture(+this, output);
        }
        return locale2.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) {
          return "P0D";
        }
        minutes2 = absFloor(seconds2 / 60);
        hours2 = absFloor(minutes2 / 60);
        seconds2 %= 60;
        minutes2 %= 60;
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign(this._months) !== sign(total) ? "-" : "";
        daysSign = sign(this._days) !== sign(total) ? "-" : "";
        hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
        return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate(
        "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
        toISOString$1
      );
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1e3);
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.30.1";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        // <input type="datetime-local" step="0.001" />
        DATE: "YYYY-MM-DD",
        // <input type="date" />
        TIME: "HH:mm",
        // <input type="time" />
        TIME_SECONDS: "HH:mm:ss",
        // <input type="time" step="1" />
        TIME_MS: "HH:mm:ss.SSS",
        // <input type="time" step="0.001" />
        WEEK: "GGGG-[W]WW",
        // <input type="week" />
        MONTH: "YYYY-MM"
        // <input type="month" />
      };
      return hooks;
    });
  }
});

// resources/js/filament-daterangepicker.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_utc = __toESM(require_utc(), 1);
var import_timezone = __toESM(require_timezone(), 1);
var import_customParseFormat = __toESM(require_customParseFormat(), 1);
var import_isSameOrAfter = __toESM(require_isSameOrAfter(), 1);
var import_isSameOrBefore = __toESM(require_isSameOrBefore(), 1);

// resources/js/plugin.cjs
var import_moment = __toESM(require_moment());
var DateRangePicker = class {
  constructor(element, options, cb) {
    this.parentEl = document.body;
    if (typeof element === "string")
      this.element = document.getElementById(element);
    else
      this.element = element;
    this.startDate = (0, import_moment.default)().startOf("day");
    this.endDate = (0, import_moment.default)().endOf("day");
    this.minDate = false;
    this.maxDate = false;
    this.maxSpan = false;
    this.autoApply = false;
    this.singleDatePicker = false;
    this.showDropdowns = false;
    this.minYear = (0, import_moment.default)().subtract(100, "year").format("YYYY");
    this.maxYear = (0, import_moment.default)().add(100, "year").format("YYYY");
    this.showWeekNumbers = false;
    this.showISOWeekNumbers = false;
    this.showCustomRangeLabel = true;
    this.timePicker = false;
    this.timePicker24Hour = false;
    this.timePickerIncrement = 1;
    this.timePickerSeconds = false;
    this.linkedCalendars = true;
    this.autoUpdateInput = true;
    this.alwaysShowCalendars = false;
    this.ranges = {};
    this.opens = "right";
    if (this.element.classList.contains("pull-right"))
      this.opens = "left";
    this.drops = "down";
    if (this.element.classList.contains("dropup"))
      this.drops = "up";
    this.buttonClasses = "btn btn-sm";
    this.applyButtonClasses = "btn-primary";
    this.cancelButtonClasses = "btn-default";
    this.locale = {
      direction: "ltr",
      format: import_moment.default.localeData().longDateFormat("L"),
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      weekLabel: "W",
      customRangeLabel: "Custom Range",
      daysOfWeek: import_moment.default.weekdaysMin(),
      monthNames: import_moment.default.monthsShort(),
      firstDay: import_moment.default.localeData().firstDayOfWeek()
    };
    this.callback = function() {
    };
    this.isShowing = false;
    this.leftCalendar = {};
    this.rightCalendar = {};
    if (typeof options !== "object" || options === null)
      options = {};
    options = Object.assign(Object.assign({}, this.element.dataset), options);
    if (typeof options.template !== "string")
      options.template = '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>';
    this.parentEl = options.parentEl ? options.parentEl : this.parentEl;
    let templateWrapEl = document.createElement("div");
    templateWrapEl.innerHTML = options.template.trim();
    this.container = templateWrapEl.firstElementChild;
    this.parentEl.insertAdjacentElement("beforeEnd", this.container);
    if (typeof options.locale === "object") {
      if (typeof options.locale.direction === "string")
        this.locale.direction = options.locale.direction;
      if (typeof options.locale.format === "string")
        this.locale.format = options.locale.format;
      if (typeof options.locale.separator === "string")
        this.locale.separator = options.locale.separator;
      if (typeof options.locale.daysOfWeek === "object")
        this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
      if (typeof options.locale.monthNames === "object")
        this.locale.monthNames = options.locale.monthNames.slice();
      if (typeof options.locale.firstDay === "number")
        this.locale.firstDay = options.locale.firstDay;
      if (typeof options.locale.applyLabel === "string")
        this.locale.applyLabel = options.locale.applyLabel;
      if (typeof options.locale.cancelLabel === "string")
        this.locale.cancelLabel = options.locale.cancelLabel;
      if (typeof options.locale.weekLabel === "string")
        this.locale.weekLabel = options.locale.weekLabel;
      if (typeof options.locale.customRangeLabel === "string") {
        let elem = document.createElement("textarea");
        elem.innerHTML = options.locale.customRangeLabel;
        this.locale.customRangeLabel = elem.value;
      }
    }
    this.container.classList.add(this.locale.direction);
    if (typeof options.startDate === "string")
      this.startDate = (0, import_moment.default)(options.startDate, this.locale.format);
    if (typeof options.endDate === "string")
      this.endDate = (0, import_moment.default)(options.endDate, this.locale.format);
    if (typeof options.minDate === "string")
      this.minDate = (0, import_moment.default)(options.minDate, this.locale.format);
    if (typeof options.maxDate === "string")
      this.maxDate = (0, import_moment.default)(options.maxDate, this.locale.format);
    if (typeof options.startDate === "object")
      this.startDate = (0, import_moment.default)(options.startDate);
    if (typeof options.endDate === "object")
      this.endDate = (0, import_moment.default)(options.endDate);
    if (typeof options.minDate === "object")
      this.minDate = (0, import_moment.default)(options.minDate);
    if (typeof options.maxDate === "object")
      this.maxDate = (0, import_moment.default)(options.maxDate);
    if (this.minDate && this.startDate.isBefore(this.minDate))
      this.startDate = this.minDate.clone();
    if (this.maxDate && this.endDate.isAfter(this.maxDate))
      this.endDate = this.maxDate.clone();
    if (typeof options.applyButtonClasses === "string")
      this.applyButtonClasses = options.applyButtonClasses;
    if (typeof options.applyClass === "string")
      this.applyButtonClasses = options.applyClass;
    if (typeof options.cancelButtonClasses === "string")
      this.cancelButtonClasses = options.cancelButtonClasses;
    if (typeof options.cancelClass === "string")
      this.cancelButtonClasses = options.cancelClass;
    if (typeof options.maxSpan === "object")
      this.maxSpan = options.maxSpan;
    if (typeof options.dateLimit === "object")
      this.maxSpan = options.dateLimit;
    if (typeof options.opens === "string")
      this.opens = options.opens;
    if (typeof options.drops === "string")
      this.drops = options.drops;
    if (typeof options.showWeekNumbers === "boolean")
      this.showWeekNumbers = options.showWeekNumbers;
    if (typeof options.showISOWeekNumbers === "boolean")
      this.showISOWeekNumbers = options.showISOWeekNumbers;
    if (typeof options.buttonClasses === "string")
      this.buttonClasses = options.buttonClasses;
    if (typeof options.buttonClasses === "object")
      this.buttonClasses = options.buttonClasses.join(" ");
    if (typeof options.showDropdowns === "boolean")
      this.showDropdowns = options.showDropdowns;
    if (typeof options.minYear === "number")
      this.minYear = options.minYear;
    if (typeof options.maxYear === "number")
      this.maxYear = options.maxYear;
    if (typeof options.showCustomRangeLabel === "boolean")
      this.showCustomRangeLabel = options.showCustomRangeLabel;
    if (typeof options.singleDatePicker === "boolean") {
      this.singleDatePicker = options.singleDatePicker;
      if (this.singleDatePicker)
        this.endDate = this.startDate.clone();
    }
    if (typeof options.timePicker === "boolean")
      this.timePicker = options.timePicker;
    if (typeof options.timePickerSeconds === "boolean")
      this.timePickerSeconds = options.timePickerSeconds;
    if (typeof options.timePickerIncrement === "number")
      this.timePickerIncrement = options.timePickerIncrement;
    if (typeof options.timePicker24Hour === "boolean")
      this.timePicker24Hour = options.timePicker24Hour;
    if (typeof options.autoApply === "boolean")
      this.autoApply = options.autoApply;
    if (typeof options.autoUpdateInput === "boolean")
      this.autoUpdateInput = options.autoUpdateInput;
    if (typeof options.linkedCalendars === "boolean")
      this.linkedCalendars = options.linkedCalendars;
    if (typeof options.isInvalidDate === "function")
      this.isInvalidDate = options.isInvalidDate;
    if (typeof options.isCustomDate === "function")
      this.isCustomDate = options.isCustomDate;
    if (typeof options.alwaysShowCalendars === "boolean")
      this.alwaysShowCalendars = options.alwaysShowCalendars;
    if (this.locale.firstDay !== 0) {
      let iterator = this.locale.firstDay;
      while (iterator > 0) {
        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
        iterator--;
      }
    }
    let start, end, range;
    if (typeof options.startDate === "undefined" && typeof options.endDate === "undefined") {
      if (this.element.tagName === "INPUT" && this.element.type === "text") {
        let val = this.element.value, split = val.split(this.locale.separator);
        start = end = null;
        if (split.length === 2) {
          start = (0, import_moment.default)(split[0], this.locale.format);
          end = (0, import_moment.default)(split[1], this.locale.format);
        } else if (this.singleDatePicker && val !== "") {
          start = (0, import_moment.default)(val, this.locale.format);
          end = (0, import_moment.default)(val, this.locale.format);
        }
        if (start !== null && end !== null) {
          this.setStartDate(start);
          this.setEndDate(end);
        }
      }
    }
    if (typeof options.ranges === "object") {
      let rangesKeys = Object.keys(options.ranges);
      for (let i = 0; i < rangesKeys.length; ++i) {
        let range2 = rangesKeys[i];
        if (typeof options.ranges[range2][0] === "string")
          start = (0, import_moment.default)(options.ranges[range2][0], this.locale.format);
        else
          start = (0, import_moment.default)(options.ranges[range2][0]);
        if (typeof options.ranges[range2][1] === "string")
          end = (0, import_moment.default)(options.ranges[range2][1], this.locale.format);
        else
          end = (0, import_moment.default)(options.ranges[range2][1]);
        if (this.minDate && start.isBefore(this.minDate))
          start = this.minDate.clone();
        let maxDate = this.maxDate;
        if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
          maxDate = start.clone().add(this.maxSpan);
        if (maxDate && end.isAfter(maxDate))
          end = maxDate.clone();
        if (this.minDate && end.isBefore(this.minDate, this.timepicker ? "minute" : "day") || maxDate && start.isAfter(maxDate, this.timepicker ? "minute" : "day"))
          continue;
        let elem = document.createElement("textarea");
        elem.innerHTML = range2;
        let rangeHtml = elem.value;
        this.ranges[rangeHtml] = [start, end];
      }
      let list = "<ul>";
      for (range in this.ranges) {
        list += '<li data-range-key="' + range + '">' + range + "</li>";
      }
      if (this.showCustomRangeLabel) {
        list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>";
      }
      list += "</ul>";
      this.container.querySelector(".ranges").insertAdjacentHTML("afterbegin", list);
    }
    if (typeof cb === "function") {
      this.callback = cb;
    }
    if (!this.timePicker) {
      this.startDate = this.startDate.startOf("day");
      this.endDate = this.endDate.endOf("day");
      this.container.style.display = "none";
      this.container.querySelector(".calendar-time").display;
    }
    if (this.timePicker && this.autoApply)
      this.autoApply = false;
    if (this.autoApply) {
      this.container.classList.add("auto-apply");
    }
    if (typeof options.ranges === "object")
      this.container.classList.add("show-ranges");
    if (this.singleDatePicker) {
      this.container.classList.add("single");
      this.container.querySelector(".drp-calendar.left").classList.add("single");
      this.container.querySelector(".drp-calendar.left").style.display = "block";
      this.container.querySelector(".drp-calendar.right").style.display = "none";
      if (!this.timePicker && this.autoApply) {
        this.container.classList.add("auto-apply");
      }
    }
    if (typeof options.ranges === "undefined" && !this.singleDatePicker || this.alwaysShowCalendars) {
      this.container.classList.add("show-calendar");
    }
    this.container.classList.add("opens" + this.opens);
    let applyBtnEl = this.container.querySelector(".applyBtn");
    let cancelBtnEl = this.container.querySelector(".cancelBtn");
    jq.addClass(applyBtnEl, this.buttonClasses);
    jq.addClass(cancelBtnEl, this.buttonClasses);
    if (this.applyButtonClasses.length)
      jq.addClass(applyBtnEl, this.applyButtonClasses);
    if (this.cancelButtonClasses.length)
      jq.addClass(cancelBtnEl, this.cancelButtonClasses);
    jq.html(applyBtnEl, this.locale.applyLabel);
    jq.html(cancelBtnEl, this.locale.cancelLabel);
    this.clickRangeProxy = function(e) {
      this.clickRange(e);
    }.bind(this);
    jq.on(this.container.querySelector(".ranges"), "click", "li", this.clickRangeProxy);
    let drpButtonsEl = this.container.querySelector(".drp-buttons");
    this.clickApplyProxy = function(e) {
      this.clickApply(e);
    }.bind(this);
    jq.on(drpButtonsEl, "click", "button.applyBtn", this.clickApplyProxy);
    this.clickCancelProxy = function(e) {
      this.clickCancel(e);
    }.bind(this);
    jq.on(drpButtonsEl, "click", "button.cancelBtn", this.clickCancelProxy);
    if (this.element.tagName === "INPUT" || this.element.tagName === "BUTTON") {
      this.showProxy = function(e) {
        this.show(e);
      }.bind(this);
      jq.on(this.element, "click", this.showProxy);
      jq.on(this.element, "focus", this.showProxy);
      this.elementChangedProxy = function(e) {
        this.elementChanged(e);
      }.bind(this);
      jq.on(this.element, "keyup", this.elementChangedProxy);
      this.keydownProxy = function(e) {
        this.keydown(e);
      }.bind(this);
      jq.on(this.element, "keydown", this.keydownProxy);
    } else {
      this.toggleProxy = function(e) {
        this.toggle(e);
      }.bind(this);
      jq.on(this.element, "click", this.toggleProxy);
      jq.on(this.element, "keydown", this.toggleProxy);
    }
    this.updateElement();
  }
  setStartDate(startDate) {
    if (typeof startDate === "string")
      this.startDate = (0, import_moment.default)(startDate, this.locale.format);
    if (typeof startDate === "object")
      this.startDate = (0, import_moment.default)(startDate);
    if (!this.timePicker)
      this.startDate = this.startDate.startOf("day");
    if (this.timePicker && this.timePickerIncrement)
      this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    if (this.minDate && this.startDate.isBefore(this.minDate)) {
      this.startDate = this.minDate.clone();
      if (this.timePicker && this.timePickerIncrement)
        this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    }
    if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
      this.startDate = this.maxDate.clone();
      if (this.timePicker && this.timePickerIncrement)
        this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    }
    if (!this.isShowing)
      this.updateElement();
    this.updateMonthsInView();
  }
  setEndDate(endDate) {
    if (typeof endDate === "string")
      this.endDate = (0, import_moment.default)(endDate, this.locale.format);
    if (typeof endDate === "object")
      this.endDate = (0, import_moment.default)(endDate);
    if (!this.timePicker)
      this.endDate = this.endDate.endOf("day");
    if (this.timePicker && this.timePickerIncrement)
      this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    if (this.endDate.isBefore(this.startDate))
      this.endDate = this.startDate.clone();
    if (this.maxDate && this.endDate.isAfter(this.maxDate))
      this.endDate = this.maxDate.clone();
    if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate))
      this.endDate = this.startDate.clone().add(this.maxSpan);
    this.previousRightTime = this.endDate.clone();
    jq.html(this.container.querySelector(".drp-selected"), this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
    if (!this.isShowing)
      this.updateElement();
    this.updateMonthsInView();
  }
  isInvalidDate() {
    return false;
  }
  isCustomDate() {
    return false;
  }
  updateView() {
    if (this.timePicker) {
      this.renderTimePicker("left");
      this.renderTimePicker("right");
      let selectElList = this.container.querySelectorAll(".right .calendar-time select");
      if (!this.endDate) {
        for (let i = 0; i < selectElList.length; ++i) {
          selectElList[i].disabled = true;
          selectElList[i].classList.add("disabled");
        }
      } else {
        for (let i = 0; i < selectElList.length; ++i) {
          selectElList[i].disabled = false;
          selectElList[i].classList.remove("disabled");
        }
      }
    }
    if (this.endDate)
      jq.html(this.container.querySelector(".drp-selected"), this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
    this.updateMonthsInView();
    this.updateCalendars();
    this.updateFormInputs();
  }
  updateMonthsInView() {
    if (this.endDate) {
      if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM"))) {
        return;
      }
      this.leftCalendar.month = this.startDate.clone().date(2);
      if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() || this.endDate.year() !== this.startDate.year())) {
        this.rightCalendar.month = this.endDate.clone().date(2);
      } else {
        this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month");
      }
    } else {
      if (this.leftCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM")) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month");
      }
    }
    if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
      this.rightCalendar.month = this.maxDate.clone().date(2);
      this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month");
    }
  }
  updateCalendars() {
    if (!this.clickPrevProxy)
      this.clickPrevProxy = function(e) {
        this.clickPrev(e);
      }.bind(this);
    if (!this.clickNextProxy)
      this.clickNextProxy = function(e) {
        this.clickNext(e);
      }.bind(this);
    if (!this.clickDateProxy)
      this.clickDateProxy = function(e) {
        this.clickDate(e);
      }.bind(this);
    if (!this.hoverDateProxy)
      this.hoverDateProxy = function(e) {
        this.hoverDate(e);
      }.bind(this);
    if (!this.monthOrYearChangedProxy)
      this.monthOrYearChangedProxy = function(e) {
        this.monthOrYearChanged(e);
      }.bind(this);
    if (!this.timeChangedProxy)
      this.timeChangedProxy = function(e) {
        this.timeChanged(e);
      }.bind(this);
    let drpCalendarElList = this.container.querySelectorAll(".drp-calendar");
    jq.off(drpCalendarElList, "click", ".prev", this.clickPrevProxy);
    jq.off(drpCalendarElList, "click", ".next", this.clickNextProxy);
    jq.off(drpCalendarElList, "mousedown", "td.available", this.clickDateProxy);
    jq.off(drpCalendarElList, "mouseenter", "td.available", this.hoverDateProxy);
    jq.off(drpCalendarElList, "change", "select.yearselect", this.monthOrYearChangedProxy);
    jq.off(drpCalendarElList, "change", "select.monthselect", this.monthOrYearChangedProxy);
    jq.off(drpCalendarElList, "change", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", this.timeChangedProxy);
    if (this.timePicker) {
      let hour, minute, second;
      if (this.endDate) {
        hour = parseInt(this.container.querySelector(".left .hourselect").value, 10);
        minute = parseInt(this.container.querySelector(".left .minuteselect").value, 10);
        if (isNaN(minute)) {
          minute = parseInt(jq.findLast(this.container.querySelector(".left .minuteselect")).value, 10);
        }
        second = this.timePickerSeconds ? parseInt(this.container.querySelector(".left .secondselect").value, 10) : 0;
        if (!this.timePicker24Hour) {
          let ampm = this.container.querySelector(".left .ampmselect").value;
          if (ampm === "PM" && hour < 12)
            hour += 12;
          if (ampm === "AM" && hour === 12)
            hour = 0;
        }
      } else {
        hour = parseInt(this.container.querySelector(".right .hourselect").value, 10);
        minute = parseInt(this.container.querySelector(".right .minuteselect").value, 10);
        if (isNaN(minute)) {
          minute = parseInt(jq.findLast(this.container.querySelector(".right .minuteselect")).value, 10);
        }
        second = this.timePickerSeconds ? parseInt(this.container.querySelector(".right .secondselect").value, 10) : 0;
        if (!this.timePicker24Hour) {
          let ampm = this.container.querySelector(".right .ampmselect").value;
          if (ampm === "PM" && hour < 12)
            hour += 12;
          if (ampm === "AM" && hour === 12)
            hour = 0;
        }
      }
      this.leftCalendar.month.hour(hour).minute(minute).second(second);
      this.rightCalendar.month.hour(hour).minute(minute).second(second);
    }
    this.renderCalendar("left");
    this.renderCalendar("right");
    let rangesLiElList = this.container.querySelectorAll(".ranges li");
    for (let i = 0; i < rangesLiElList.length; ++i)
      rangesLiElList[i].classList.remove("active");
    if (this.endDate !== null)
      this.calculateChosenLabel();
    jq.on(drpCalendarElList, "click", ".prev", this.clickPrevProxy);
    jq.on(drpCalendarElList, "click", ".next", this.clickNextProxy);
    jq.on(drpCalendarElList, "mousedown", "td.available", this.clickDateProxy);
    jq.on(drpCalendarElList, "mouseenter", "td.available", this.hoverDateProxy);
    jq.on(drpCalendarElList, "change", "select.yearselect", this.monthOrYearChangedProxy);
    jq.on(drpCalendarElList, "change", "select.monthselect", this.monthOrYearChangedProxy);
    jq.on(drpCalendarElList, "change", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", this.timeChangedProxy);
  }
  renderCalendar(side) {
    let calendarObj = side === "left" ? this.leftCalendar : this.rightCalendar;
    let month = calendarObj.month.month();
    let year = calendarObj.month.year();
    let hour = calendarObj.month.hour();
    let minute = calendarObj.month.minute();
    let second = calendarObj.month.second();
    let daysInMonth = (0, import_moment.default)([year, month]).daysInMonth();
    let firstDay = (0, import_moment.default)([year, month, 1]);
    let lastDay = (0, import_moment.default)([year, month, daysInMonth]);
    let lastMonth = (0, import_moment.default)(firstDay).subtract(1, "month").month();
    let lastYear = (0, import_moment.default)(firstDay).subtract(1, "month").year();
    let daysInLastMonth = (0, import_moment.default)([lastYear, lastMonth]).daysInMonth();
    let dayOfWeek = firstDay.day();
    let calendarMatrix = [];
    calendarMatrix.firstDay = firstDay;
    calendarMatrix.lastDay = lastDay;
    for (let i = 0; i < 6; i++) {
      calendarMatrix[i] = [];
    }
    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth)
      startDay -= 7;
    if (dayOfWeek === this.locale.firstDay)
      startDay = daysInLastMonth - 6;
    let curDate = (0, import_moment.default)([lastYear, lastMonth, startDay, 12, minute, second]);
    let col, row;
    for (let i = 0, col2 = 0, row2 = 0; i < 42; i++, col2++, curDate = (0, import_moment.default)(curDate).add(24, "hour")) {
      if (i > 0 && col2 % 7 === 0) {
        col2 = 0;
        row2++;
      }
      calendarMatrix[row2][col2] = curDate.clone().hour(hour).minute(minute).second(second);
      curDate.hour(12);
      if (this.minDate && calendarMatrix[row2][col2].format("YYYY-MM-DD") === this.minDate.format("YYYY-MM-DD") && calendarMatrix[row2][col2].isBefore(this.minDate) && side === "left") {
        calendarMatrix[row2][col2] = this.minDate.clone();
      }
      if (this.maxDate && calendarMatrix[row2][col2].format("YYYY-MM-DD") === this.maxDate.format("YYYY-MM-DD") && calendarMatrix[row2][col2].isAfter(this.maxDate) && side === "right") {
        calendarMatrix[row2][col2] = this.maxDate.clone();
      }
    }
    if (side === "left") {
      this.leftCalendar.calendar = calendarMatrix;
    } else {
      this.rightCalendar.calendar = calendarMatrix;
    }
    let minDate = side === "left" ? this.minDate : this.startDate;
    let maxDate = this.maxDate;
    let selected = side === "left" ? this.startDate : this.endDate;
    let arrow = this.locale.direction === "ltr" ? { left: "chevron-left", right: "chevron-right" } : { left: "chevron-right", right: "chevron-left" };
    let html = '<table class="table-condensed">';
    html += "<thead>";
    html += "<tr>";
    if (this.showWeekNumbers || this.showISOWeekNumbers)
      html += "<th></th>";
    if ((!minDate || minDate.isBefore(calendarMatrix.firstDay)) && (!this.linkedCalendars || side === "left")) {
      html += '<th class="prev available"><span></span></th>';
    } else {
      html += "<th></th>";
    }
    let dateHtml = this.locale.monthNames[calendarMatrix[1][1].month()] + calendarMatrix[1][1].format(" YYYY");
    if (this.showDropdowns) {
      let currentMonth = calendarMatrix[1][1].month();
      let currentYear = calendarMatrix[1][1].year();
      let maxYear = maxDate && maxDate.year() || this.maxYear;
      let minYear = minDate && minDate.year() || this.minYear;
      let inMinYear = currentYear === minYear;
      let inMaxYear = currentYear === maxYear;
      let monthHtml = '<select class="monthselect">';
      for (let m = 0; m < 12; m++) {
        if ((!inMinYear || minDate && m >= minDate.month()) && (!inMaxYear || maxDate && m <= maxDate.month())) {
          monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + ">" + this.locale.monthNames[m] + "</option>";
        } else {
          monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
        }
      }
      monthHtml += "</select>";
      let yearHtml = '<select class="yearselect">';
      for (let y = minYear; y <= maxYear; y++) {
        yearHtml += '<option value="' + y + '"' + (y === currentYear ? ' selected="selected"' : "") + ">" + y + "</option>";
      }
      yearHtml += "</select>";
      dateHtml = monthHtml + yearHtml;
    }
    html += '<th colspan="5" class="month">' + dateHtml + "</th>";
    if ((!maxDate || maxDate.isAfter(calendarMatrix.lastDay)) && (!this.linkedCalendars || side === "right" || this.singleDatePicker)) {
      html += '<th class="next available"><span></span></th>';
    } else {
      html += "<th></th>";
    }
    html += "</tr>";
    html += "<tr>";
    if (this.showWeekNumbers || this.showISOWeekNumbers)
      html += '<th class="week">' + this.locale.weekLabel + "</th>";
    for (let i = 0; i < this.locale.daysOfWeek.length; ++i) {
      html += "<th>" + this.locale.daysOfWeek[i] + "</th>";
    }
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    if (this.endDate === null && this.maxSpan) {
      let maxLimit = this.startDate.clone().add(this.maxSpan).endOf("day");
      if (!maxDate || maxLimit.isBefore(maxDate)) {
        maxDate = maxLimit;
      }
    }
    for (let row2 = 0; row2 < 6; row2++) {
      html += "<tr>";
      if (this.showWeekNumbers)
        html += '<td class="week">' + calendarMatrix[row2][0].week() + "</td>";
      else if (this.showISOWeekNumbers)
        html += '<td class="week">' + calendarMatrix[row2][0].isoWeek() + "</td>";
      for (let col2 = 0; col2 < 7; col2++) {
        let classes = [];
        if (calendarMatrix[row2][col2].isSame(/* @__PURE__ */ new Date(), "day"))
          classes.push("today");
        if (calendarMatrix[row2][col2].isoWeekday() > 5)
          classes.push("weekend");
        if (calendarMatrix[row2][col2].month() !== calendarMatrix[1][1].month())
          classes.push("off", "ends");
        if (this.minDate && calendarMatrix[row2][col2].isBefore(this.minDate, "day"))
          classes.push("off", "disabled");
        if (maxDate && calendarMatrix[row2][col2].isAfter(maxDate, "day"))
          classes.push("off", "disabled");
        if (this.isInvalidDate(calendarMatrix[row2][col2]))
          classes.push("off", "disabled");
        if (calendarMatrix[row2][col2].format("YYYY-MM-DD") === this.startDate.format("YYYY-MM-DD"))
          classes.push("active", "start-date");
        if (this.endDate !== null && calendarMatrix[row2][col2].format("YYYY-MM-DD") === this.endDate.format("YYYY-MM-DD"))
          classes.push("active", "end-date");
        if (this.endDate !== null && calendarMatrix[row2][col2] > this.startDate && calendarMatrix[row2][col2] < this.endDate)
          classes.push("in-range");
        let isCustom = this.isCustomDate(calendarMatrix[row2][col2]);
        if (isCustom !== false) {
          if (typeof isCustom === "string")
            classes.push(isCustom);
          else
            Array.prototype.push.apply(classes, isCustom);
        }
        let cname = "", disabled = false;
        for (let i = 0; i < classes.length; i++) {
          cname += classes[i] + " ";
          if (classes[i] === "disabled")
            disabled = true;
        }
        if (!disabled)
          cname += "available";
        html += '<td class="' + cname.replace(/^\s+|\s+$/g, "") + '" data-title="r' + row2 + "c" + col2 + '">' + calendarMatrix[row2][col2].date() + "</td>";
      }
      html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    jq.html(this.container.querySelector(".drp-calendar." + side + " .calendar-table"), html);
  }
  renderTimePicker(side) {
    if (side === "right" && !this.endDate) return;
    let html, selected, minDate, maxDate = this.maxDate;
    if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)))
      maxDate = this.startDate.clone().add(this.maxSpan);
    if (side === "left") {
      selected = this.startDate.clone();
      minDate = this.minDate;
    } else if (side === "right") {
      selected = this.endDate.clone();
      minDate = this.startDate;
      let timeSelector = this.container.querySelector(".drp-calendar.right .calendar-time");
      if (timeSelector.innerHTML !== "") {
        selected.hour(!isNaN(selected.hour()) ? selected.hour() : jq.findSelectedOption(timeSelector.querySelector(".hourselect")).value);
        selected.minute(!isNaN(selected.minute()) ? selected.minute() : jq.findSelectedOption(timeSelector.querySelector(".minuteselect")).value);
        selected.second(!isNaN(selected.second()) ? selected.second() : jq.findSelectedOption(timeSelector.querySelector(".secondselect")).value);
        if (!this.timePicker24Hour) {
          let ampm = jq.findSelectedOption(timeSelector.querySelector(".ampmselect")).value;
          if (ampm === "PM" && selected.hour() < 12)
            selected.hour(selected.hour() + 12);
          if (ampm === "AM" && selected.hour() === 12)
            selected.hour(0);
        }
      }
      if (selected.isBefore(this.startDate))
        selected = this.startDate.clone();
      if (maxDate && selected.isAfter(maxDate))
        selected = maxDate.clone();
    }
    html = '<select class="hourselect">';
    let start = this.timePicker24Hour ? 0 : 1;
    let end = this.timePicker24Hour ? 23 : 12;
    for (let i = start; i <= end; i++) {
      let i_in_24 = i;
      if (!this.timePicker24Hour)
        i_in_24 = selected.hour() >= 12 ? i === 12 ? 12 : i + 12 : i === 12 ? 0 : i;
      let time = selected.clone().hour(i_in_24);
      let disabled = false;
      if (minDate && time.minute(59).isBefore(minDate))
        disabled = true;
      if (maxDate && time.minute(0).isAfter(maxDate))
        disabled = true;
      if (i_in_24 === selected.hour() && !disabled) {
        html += '<option value="' + i + '" selected="selected">' + i + "</option>";
      } else if (disabled) {
        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + "</option>";
      } else {
        html += '<option value="' + i + '">' + i + "</option>";
      }
    }
    html += "</select> ";
    html += ': <select class="minuteselect">';
    for (let i = 0; i < 60; i += this.timePickerIncrement) {
      let padded = i < 10 ? "0" + i : i;
      let time = selected.clone().minute(i);
      let disabled = false;
      if (minDate && time.second(59).isBefore(minDate))
        disabled = true;
      if (maxDate && time.second(0).isAfter(maxDate))
        disabled = true;
      if (selected.minute() === i && !disabled) {
        html += '<option value="' + i + '" selected="selected">' + padded + "</option>";
      } else if (disabled) {
        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + "</option>";
      } else {
        html += '<option value="' + i + '">' + padded + "</option>";
      }
    }
    html += "</select> ";
    if (this.timePickerSeconds) {
      html += ': <select class="secondselect">';
      for (let i = 0; i < 60; i++) {
        let padded = i < 10 ? "0" + i : i;
        let time = selected.clone().second(i);
        let disabled = false;
        if (minDate && time.isBefore(minDate))
          disabled = true;
        if (maxDate && time.isAfter(maxDate))
          disabled = true;
        if (selected.second() === i && !disabled) {
          html += '<option value="' + i + '" selected="selected">' + padded + "</option>";
        } else if (disabled) {
          html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + "</option>";
        } else {
          html += '<option value="' + i + '">' + padded + "</option>";
        }
      }
      html += "</select> ";
    }
    if (!this.timePicker24Hour) {
      html += '<select class="ampmselect">';
      let am_html = "";
      let pm_html = "";
      if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
        am_html = ' disabled="disabled" class="disabled"';
      if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
        pm_html = ' disabled="disabled" class="disabled"';
      if (selected.hour() >= 12) {
        html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + ">PM</option>";
      } else {
        html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + ">PM</option>";
      }
      html += "</select>";
    }
    jq.html(this.container.querySelector(".drp-calendar." + side + " .calendar-time"), html);
  }
  updateFormInputs() {
    if (this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate))) {
      this.container.querySelector("button.applyBtn").disabled = false;
    } else {
      this.container.querySelector("button.applyBtn").disabled = true;
    }
  }
  move() {
    let parentOffset = { top: 0, left: 0 }, containerTop, drops = this.drops;
    let parentRightEdge = window.innerWidth;
    if (!(this.parentEl.tagName === "BODY")) {
      let parentElOffset = jq.offset(this.parentEl);
      parentOffset = {
        top: parentElOffset.top - this.parentEl.scrollTop,
        left: parentElOffset.left - this.parentEl.scrollLeft
      };
      parentRightEdge = this.parentEl.clientWidth + parentElOffset.left;
    }
    let elementOffset = jq.offset(this.element);
    switch (drops) {
      case "auto":
        containerTop = elementOffset.top + this.element.offsetHeight - parentOffset.top;
        if (containerTop + this.container.offsetHeight >= this.parentEl.scrollHeight) {
          containerTop = elementOffset.top - this.container.offsetHeight - parentOffset.top;
          drops = "up";
        }
        break;
      case "up":
        containerTop = elementOffset.top - this.container.offsetHeight - parentOffset.top;
        break;
      default:
        containerTop = elementOffset.top + this.element.offsetHeight - parentOffset.top;
        break;
    }
    this.container.style.top = "0";
    this.container.style.left = "0";
    this.container.style.right = "auto";
    let containerWidth = this.container.offsetWidth;
    if (drops === "up")
      this.container.classList.add("drop-up");
    else
      this.container.classList.remove("drop-up");
    if (this.opens === "left") {
      let containerRight = parentRightEdge - elementOffset.left - this.element.offsetWidth;
      if (containerWidth + containerRight > window.innerWidth) {
        this.container.style.top = containerTop + "px";
        this.container.style.right = "auto";
        this.container.style.left = "9px";
      } else {
        this.container.style.top = containerTop + "px";
        this.container.style.right = containerRight + "px";
        this.container.style.left = "auto";
      }
    } else if (this.opens === "center") {
      let containerLeft = elementOffset.left - parentOffset.left + this.element.offsetWidth / 2 - containerWidth / 2;
      if (containerLeft < 0) {
        this.container.style.top = containerTop + "px";
        this.container.style.right = "auto";
        this.container.style.left = "9px";
      } else if (containerLeft + containerWidth > window.innerWidth) {
        this.container.style.top = containerTop + "px";
        this.container.style.left = "auto";
        this.container.style.right = "0";
      } else {
        this.container.style.top = containerTop + "px";
        this.container.style.left = containerLeft + "px";
        this.container.style.right = "auto";
      }
    } else {
      let containerLeft = elementOffset.left - parentOffset.left;
      if (containerLeft + containerWidth > window.innerWidth) {
        this.container.style.top = containerTop + "px";
        this.container.style.left = "auto";
        this.container.style.right = "0";
      } else {
        this.container.style.top = containerTop + "px";
        this.container.style.left = containerLeft + "px";
        this.container.style.right = "auto";
      }
    }
  }
  show(e) {
    if (this.isShowing) return;
    if (!this._outsideClickProxy)
      this._outsideClickProxy = function(e2) {
        this.outsideClick(e2);
      }.bind(this);
    document.addEventListener("mousedown", this._outsideClickProxy);
    document.addEventListener("touchend", this._outsideClickProxy);
    jq.on(document, "click", "[data-toggle=dropdown]", this._outsideClickProxy);
    document.addEventListener("focusin", this._outsideClickProxy);
    if (!this.moveProxy)
      this.moveProxy = function(e2) {
        this.move(e2);
      }.bind(this);
    window.addEventListener("resize", this.moveProxy);
    this.oldStartDate = this.startDate.clone();
    this.oldEndDate = this.endDate.clone();
    this.previousRightTime = this.endDate.clone();
    this.updateView();
    this.container.style.display = "block";
    this.move();
    this.element.dispatchEvent(new CustomEvent("show.daterangepicker", { bubbles: true, detail: this }));
    this.isShowing = true;
  }
  hide(e) {
    if (!this.isShowing) return;
    if (!this.endDate) {
      this.startDate = this.oldStartDate.clone();
      this.endDate = this.oldEndDate.clone();
    }
    if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
      this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);
    this.updateElement();
    if (this._outsideClickProxy) {
      document.removeEventListener("mousedown", this._outsideClickProxy);
      document.removeEventListener("touchend", this._outsideClickProxy);
      jq.off(document, "click", "[data-toggle=dropdown]", this._outsideClickProxy);
      document.removeEventListener("focusin", this._outsideClickProxy);
    }
    if (this.moveProxy)
      window.removeEventListener("resize", this.moveProxy);
    this.container.style.display = "none";
    this.element.dispatchEvent(new CustomEvent("hide.daterangepicker", { bubbles: true, detail: this }));
    this.isShowing = false;
  }
  toggle(e) {
    if (this.isShowing) {
      this.hide();
    } else {
      this.show();
    }
  }
  outsideClick(e) {
    let target = e.target;
    if (
      // ie modal dialog fix
      e.type === "focusin" || target.closest(jq.getSelectorFromElement(this.element)) || target.closest(jq.getSelectorFromElement(this.container)) || target.closest(".calendar-table")
    ) return;
    this.hide();
    this.element.dispatchEvent(new CustomEvent("outsideClick.daterangepicker", { bubbles: true, detail: this }));
  }
  showCalendars() {
    this.container.classList.add("show-calendar");
    this.move();
    this.element.dispatchEvent(new CustomEvent("showCalendar.daterangepicker", { bubbles: true, detail: this }));
  }
  hideCalendars() {
    this.container.classList.remove("show-calendar");
    this.element.dispatchEvent(new CustomEvent("hideCalendar.daterangepicker", { bubbles: true, detail: this }));
  }
  clickRange(e) {
    let label = e.target.dataset.rangeKey;
    this.chosenLabel = label;
    if (label === this.locale.customRangeLabel) {
      this.showCalendars();
    } else {
      let dates = this.ranges[label];
      this.startDate = dates[0];
      this.endDate = dates[1];
      if (!this.timePicker) {
        this.startDate.startOf("day");
        this.endDate.endOf("day");
      }
      if (!this.alwaysShowCalendars)
        this.hideCalendars();
      this.clickApply(e);
    }
  }
  clickPrev(e) {
    let cal = e.target.closest(".drp-calendar");
    if (cal.classList.contains("left")) {
      this.leftCalendar.month.subtract(1, "month");
      if (this.linkedCalendars)
        this.rightCalendar.month.subtract(1, "month");
    } else {
      this.rightCalendar.month.subtract(1, "month");
    }
    this.updateCalendars();
  }
  clickNext(e) {
    let cal = e.target.closest(".drp-calendar");
    if (cal.classList.contains("left")) {
      this.leftCalendar.month.add(1, "month");
    } else {
      this.rightCalendar.month.add(1, "month");
      if (this.linkedCalendars)
        this.leftCalendar.month.add(1, "month");
    }
    this.updateCalendars();
  }
  hoverDate(e) {
    if (!e.target.classList.contains("available")) return;
    let title = e.target.dataset.title;
    let row = title.substr(1, 1);
    let col = title.substr(3, 1);
    let cal = e.target.closest(".drp-calendar");
    let date = cal.classList.contains("left") ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    let leftCalendar = this.leftCalendar;
    let rightCalendar = this.rightCalendar;
    let startDate = this.startDate;
    if (!this.endDate) {
      let tdElList = this.container.querySelectorAll(".drp-calendar tbody td");
      for (let i = 0; i < tdElList.length; ++i) {
        if (tdElList[i].classList.contains("week")) return;
        let title2 = tdElList[i].dataset.title;
        let row2 = title2.substr(1, 1);
        let col2 = title2.substr(3, 1);
        let cal2 = tdElList[i].closest(".drp-calendar");
        let dt = cal2.classList.contains("left") ? leftCalendar.calendar[row2][col2] : rightCalendar.calendar[row2][col2];
        if (dt.isAfter(startDate) && dt.isBefore(date) || dt.isSame(date, "day")) {
          tdElList[i].classList.add("in-range");
        } else {
          tdElList[i].classList.remove("in-range");
        }
      }
    }
  }
  clickDate(e) {
    if (!e.target.classList.contains("available")) return;
    let title = e.target.dataset.title;
    let row = title.substr(1, 1);
    let col = title.substr(3, 1);
    let cal = e.target.closest(".drp-calendar");
    let date = cal.classList.contains("left") ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    if (this.endDate || date.isBefore(this.startDate, "day")) {
      if (this.timePicker) {
        let hour = parseInt(this.container.querySelector(".left .hourselect").value, 10);
        if (!this.timePicker24Hour) {
          let ampm = this.container.querySelector(".left .ampmselect").value;
          if (ampm === "PM" && hour < 12)
            hour += 12;
          if (ampm === "AM" && hour === 12)
            hour = 0;
        }
        let minute = parseInt(this.container.querySelector(".left .minuteselect").value, 10);
        if (isNaN(minute)) {
          minute = parseInt(this.container.querySelector(".left .minuteselect option:last-child").value, 10);
        }
        let second = this.timePickerSeconds ? parseInt(this.container.querySelector(".left .secondselect").value, 10) : 0;
        date = date.clone().hour(hour).minute(minute).second(second);
      }
      this.endDate = null;
      this.setStartDate(date.clone());
    } else if (!this.endDate && date.isBefore(this.startDate)) {
      this.setEndDate(this.startDate.clone());
    } else {
      if (this.timePicker) {
        let hour = parseInt(this.container.querySelector(".right .hourselect").value, 10);
        if (!this.timePicker24Hour) {
          let ampm = this.container.querySelector(".right .ampmselect").value;
          if (ampm === "PM" && hour < 12)
            hour += 12;
          if (ampm === "AM" && hour === 12)
            hour = 0;
        }
        let minute = parseInt(this.container.querySelector(".right .minuteselect").value, 10);
        if (isNaN(minute)) {
          minute = parseInt(this.container.querySelector(".right .minuteselect option:last-child").value, 10);
        }
        let second = this.timePickerSeconds ? parseInt(this.container.querySelector(".right .secondselect").value, 10) : 0;
        date = date.clone().hour(hour).minute(minute).second(second);
      }
      this.setEndDate(date.clone());
      if (this.autoApply) {
        this.calculateChosenLabel();
        this.clickApply(e);
      }
    }
    if (this.singleDatePicker) {
      this.setEndDate(this.startDate);
      if (!this.timePicker && this.autoApply)
        this.clickApply(e);
    }
    this.updateView();
    e.stopPropagation();
  }
  calculateChosenLabel() {
    let customRange = true;
    let rangesKey = Object.keys(this.ranges);
    for (let i = 0; i < rangesKey.length; ++i) {
      let range = this.ranges[rangesKey[i]];
      if (this.timePicker) {
        let format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
        if (this.startDate.format(format) === range[0].format(format) && this.endDate.format(format) === range[1].format(format)) {
          customRange = false;
          let rangesLiList = this.container.querySelectorAll(".ranges li");
          rangesLiList[i].classList.add("active");
          this.chosenLabel = rangesLiList[i].dataset.rangeKey;
          break;
        }
      } else {
        if (this.startDate.format("YYYY-MM-DD") === range[0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") === range[1].format("YYYY-MM-DD")) {
          customRange = false;
          let rangesLiList = this.container.querySelectorAll(".ranges li");
          rangesLiList[i].classList.add("active");
          this.chosenLabel = rangesLiList[i].dataset.rangeKey;
          break;
        }
      }
    }
    if (customRange) {
      if (this.showCustomRangeLabel) {
        let rangesLiLastEl = jq.findLast(this.container.querySelectorAll(".ranges li"));
        if (rangesLiLastEl) {
          rangesLiLastEl.classList.add("active");
          this.chosenLabel = rangesLiLastEl.dataset.rangeKey;
        } else {
          this.chosenLabel = null;
        }
      } else {
        this.chosenLabel = null;
      }
      this.showCalendars();
    }
  }
  clickApply(e) {
    this.hide();
    e.target.dispatchEvent(new CustomEvent("apply.daterangepicker", { bubbles: true, detail: { picker: this } }));
  }
  clickCancel(e) {
    this.startDate = this.oldStartDate;
    this.endDate = this.oldEndDate;
    this.hide();
    e.target.dispatchEvent(new CustomEvent("cancel.daterangepicker", { bubbles: true, detail: this }));
  }
  monthOrYearChanged(e) {
    let isLeft = e.target.closest(".drp-calendar").classList.contains("left"), leftOrRight = isLeft ? "left" : "right", cal = this.container.querySelector(".drp-calendar." + leftOrRight);
    let month = parseInt(cal.querySelector(".monthselect").value, 10);
    let year = cal.querySelector(".yearselect").value;
    if (!isLeft) {
      if (year < this.startDate.year() || year === this.startDate.year() && month < this.startDate.month()) {
        month = this.startDate.month();
        year = this.startDate.year();
      }
    }
    if (this.minDate) {
      if (year < this.minDate.year() || year === this.minDate.year() && month < this.minDate.month()) {
        month = this.minDate.month();
        year = this.minDate.year();
      }
    }
    if (this.maxDate) {
      if (year > this.maxDate.year() || year === this.maxDate.year() && month > this.maxDate.month()) {
        month = this.maxDate.month();
        year = this.maxDate.year();
      }
    }
    if (isLeft) {
      this.leftCalendar.month.month(month).year(year);
      if (this.linkedCalendars)
        this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month");
    } else {
      this.rightCalendar.month.month(month).year(year);
      if (this.linkedCalendars)
        this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month");
    }
    this.updateCalendars();
  }
  timeChanged(e) {
    let cal = e.target.closest(".drp-calendar"), isLeft = cal.classList.contains("left");
    let hour = parseInt(cal.querySelector(".hourselect").value, 10);
    let minute = parseInt(cal.querySelector(".minuteselect").value, 10);
    if (isNaN(minute)) {
      minute = parseInt(jq.findLast(cal.querySelectorAll(".minuteselect option")).value, 10);
    }
    let second = this.timePickerSeconds ? parseInt(cal.querySelector(".secondselect").value, 10) : 0;
    if (!this.timePicker24Hour) {
      let ampm = cal.querySelector(".ampmselect").value;
      if (ampm === "PM" && hour < 12)
        hour += 12;
      if (ampm === "AM" && hour === 12)
        hour = 0;
    }
    if (isLeft) {
      let start = this.startDate.clone();
      start.hour(hour);
      start.minute(minute);
      start.second(second);
      this.setStartDate(start);
      if (this.singleDatePicker) {
        this.endDate = this.startDate.clone();
      } else if (this.endDate && this.endDate.format("YYYY-MM-DD") === start.format("YYYY-MM-DD") && this.endDate.isBefore(start)) {
        this.setEndDate(start.clone());
      }
    } else if (this.endDate) {
      let end = this.endDate.clone();
      end.hour(hour);
      end.minute(minute);
      end.second(second);
      this.setEndDate(end);
    }
    this.updateCalendars();
    this.updateFormInputs();
    let drpCalendarElList = this.container.querySelectorAll(".drp-calendar");
    jq.off(drpCalendarElList, "change", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", this.timeChangedProxy);
    this.renderTimePicker("left");
    this.renderTimePicker("right");
    jq.on(drpCalendarElList, "change", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", this.timeChangedProxy);
  }
  elementChanged() {
    if (!(this.element.tagName === "INPUT")) return;
    if (!this.element.value || !this.element.value.length) return;
    let dateString = this.element.value.split(this.locale.separator), start = null, end = null;
    if (dateString.length === 2) {
      start = (0, import_moment.default)(dateString[0], this.locale.format);
      end = (0, import_moment.default)(dateString[1], this.locale.format);
    }
    if (this.singleDatePicker || start === null || end === null) {
      start = (0, import_moment.default)(this.element.value, this.locale.format);
      end = start;
    }
    if (!start.isValid() || !end.isValid()) return;
    this.setStartDate(start);
    this.setEndDate(end);
    this.updateView();
  }
  keydown(e) {
    if (e.keyCode === 9 || e.keyCode === 13) {
      this.hide();
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      this.hide();
    }
  }
  updateElement() {
    if (this.element.tagName === "INPUT" && this.autoUpdateInput) {
      let newValue = this.startDate.format(this.locale.format);
      if (!this.singleDatePicker) {
        newValue += this.locale.separator + this.endDate.format(this.locale.format);
      }
      if (newValue !== this.element.value) {
        this.element.value = newValue;
      }
    }
  }
  remove() {
    if (this._outsideClickProxy) {
      document.removeEventListener("mousedown", this._outsideClickProxy);
      document.removeEventListener("touchend", this._outsideClickProxy);
      jq.off(document, "click", "[data-toggle=dropdown]", this._outsideClickProxy);
      document.removeEventListener("focusin", this._outsideClickProxy);
      delete this._outsideClickProxy;
    }
    if (this.moveProxy) {
      window.addEventListener("resize", this.moveProxy);
      delete this.moveProxy;
    }
    if (this.clickRangeProxy) {
      jq.off(this.container.querySelector(".ranges"), "click", "li", this.clickRangeProxy);
      delete this.clickRangeProxy;
    }
    let drpButtonsEl = this.container.querySelector(".drp-buttons");
    if (this.clickApplyProxy) {
      jq.off(drpButtonsEl, "click", "button.applyBtn", this.clickApplyProxy);
      delete this.clickApplyProxy;
    }
    if (this.clickCancelProxy) {
      jq.off(drpButtonsEl, "click", "button.cancelBtn", this.clickCancelProxy);
      delete this.clickCancelProxy;
    }
    if (this.element.tagName === "INPUT" || this.element.tagName === "BUTTON") {
      if (this.showProxy) {
        jq.off(this.element, "click", this.showProxy);
        jq.off(this.element, "focus", this.showProxy);
        delete this.showProxy;
      }
      if (this.elementChangedProxy) {
        jq.off(this.element, "keyup", this.elementChangedProxy);
        delete this.elementChangedProxy;
      }
      ;
      if (this.keydownProxy) {
        jq.off(this.element, "keydown", this.keydownProxy);
        delete this.keydownProxy;
      }
    } else {
      if (this.toggleProxy) {
        jq.off(this.element, "click", this.toggleProxy);
        jq.off(this.element, "keydown", this.toggleProxy);
        delete this.toggleProxy;
      }
      ;
    }
    let drpCalendarElList = this.container.querySelectorAll(".drp-calendar");
    if (this.clickPrevProxy) {
      jq.off(drpCalendarElList, "click", ".prev", this.clickPrevProxy);
      delete this.clickPrevProxy;
    }
    if (this.clickNextProxy) {
      jq.off(drpCalendarElList, "click", ".next", this.clickNextProxy);
      delete this.clickNextProxy;
    }
    if (this.clickDateProxy) {
      jq.off(drpCalendarElList, "mousedown", "td.available", this.clickDateProxy);
      delete this.clickDateProxy;
    }
    if (this.hoverDateProxy) {
      jq.off(drpCalendarElList, "mouseenter", "td.available", this.hoverDateProxy);
      delete this.hoverDateProxy;
    }
    if (this.monthOrYearChangedProxy) {
      jq.off(drpCalendarElList, "change", "select.yearselect", this.monthOrYearChangedProxy);
      jq.off(drpCalendarElList, "change", "select.monthselect", this.monthOrYearChangedProxy);
      delete this.monthOrYearChangedProxy;
    }
    if (this.timeChangedProxy) {
      jq.off(drpCalendarElList, "change", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", this.timeChangedProxy);
      delete this.timeChangedProxy;
    }
    delete this.container;
    delete this.element.dataset;
  }
  updateRanges(newRanges) {
    if (typeof newRanges === "object") {
      jq.off(this.container.querySelector(".ranges"), "click", "li", this.clickRangeProxy);
      this.ranges = [];
      let rangesKeys = Object.keys(newRanges);
      for (let i = 0; i < rangesKeys.length; ++i) {
        let range = rangesKeys[i];
        let start, end = null;
        if (typeof newRanges[range][0] === "string")
          start = (0, import_moment.default)(newRanges[range][0], this.locale.format);
        else
          start = (0, import_moment.default)(newRanges[range][0]);
        if (typeof newRanges[range][1] === "string")
          end = (0, import_moment.default)(newRanges[range][1], this.locale.format);
        else
          end = (0, import_moment.default)(newRanges[range][1]);
        if (this.minDate && start.isBefore(this.minDate))
          start = this.minDate.clone();
        let maxDate = this.maxDate;
        if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
          maxDate = start.clone().add(this.maxSpan);
        if (maxDate && end.isAfter(maxDate))
          end = maxDate.clone();
        if (this.minDate && end.isBefore(this.minDate, this.timepicker ? "minute" : "day") || maxDate && start.isAfter(maxDate, this.timepicker ? "minute" : "day"))
          continue;
        let elem = document.createElement("textarea");
        elem.innerHTML = range;
        let rangeHtml = elem.value;
        this.ranges[rangeHtml] = [start, end];
      }
      let list = "<ul>";
      for (let range in this.ranges) {
        list += '<li data-range-key="' + range + '">' + range + "</li>";
      }
      if (this.showCustomRangeLabel) {
        list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>";
      }
      list += "</ul>";
      let rangeNode = this.container.querySelector(".ranges");
      rangeNode.removeChild(rangeNode.firstChild);
      rangeNode.insertAdjacentHTML("afterbegin", list);
    }
    this.clickRangeProxy = function(e) {
      this.clickRange(e);
    }.bind(this);
    jq.on(this.container.querySelector(".ranges"), "click", "li", this.clickRangeProxy);
  }
};
var jq = {
  addClassSub: function(el, classes) {
    let classList = classes.split(" ");
    for (let i = 0; i < classList.length; ++i) {
      el.classList.add(classList[i].trim());
    }
  },
  addClass: function(el, classes) {
    if (!el)
      return;
    if (typeof el.length === "number")
      for (let i = 0; i < el.length; ++i)
        jq.addClassSub(el[i], classes);
    else
      jq.addClassSub(el, classes);
  },
  findLast(el) {
    if (!el)
      return null;
    if (typeof el.length === "number")
      if (el.length > 0)
        return el[el.length - 1];
      else
        return null;
    else
      return el;
  },
  findSelectedOption(el) {
    if (!el || !el.options || !el.options.length)
      return null;
    for (let i = 0; i < el.options.length; ++i) {
      if (el.options[i].selected)
        return el.options[i];
    }
    return null;
  },
  getSelectorFromElement: function(el) {
    if (!el || !(el instanceof Element))
      return null;
    let selector = el.nodeName.toLowerCase();
    if (el.id)
      return selector + "#" + el.id;
    for (let i = 0; i < el.classList.length; ++i) {
      selector += "." + el.classList[i];
    }
    return selector;
  },
  html: function(el, html) {
    if (el)
      el.innerHTML = html;
  },
  offset: function(el) {
    if (!el)
      return { top: 0, left: 0 };
    if (!el.getClientRects().length)
      return { top: 0, left: 0 };
    let rect = el.getBoundingClientRect();
    let win = el.ownerDocument.defaultView;
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  },
  offSub: function(el, event, listener) {
    if (typeof el.length === "number")
      for (let i = 0; i < el.length; ++i)
        el[i].removeEventListener(event, listener);
    else
      el.removeEventListener(event, listener);
  },
  off: function(el, event, param1, param2) {
    if (!el)
      return;
    if (typeof param1 === "function") {
      jq.offSub(el, event, param1);
    } else {
      if (typeof el.length === "number")
        for (let i = 0; i < el.length; ++i)
          jq.offSub(el[i].querySelectorAll(param1), event, param2);
      else
        jq.offSub(el.querySelectorAll(param1), event, param2);
    }
  },
  onSub: function(el, event, listener) {
    if (typeof el.length === "number")
      for (let i = 0; i < el.length; ++i)
        el[i].addEventListener(event, listener);
    else
      el.addEventListener(event, listener);
  },
  on: function(el, event, param1, param2) {
    if (!el)
      return;
    if (typeof param1 === "function") {
      jq.onSub(el, event, param1);
    } else {
      if (typeof el.length === "number")
        for (let i = 0; i < el.length; ++i)
          jq.onSub(el[i].querySelectorAll(param1), event, param2);
      else
        jq.onSub(el.querySelectorAll(param1), event, param2);
    }
  }
};

// resources/js/filament-daterangepicker.js
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
import_dayjs.default.extend(import_customParseFormat.default);
import_dayjs.default.extend(import_isSameOrAfter.default);
import_dayjs.default.extend(import_isSameOrBefore.default);
window.DateRangePicker = DateRangePicker;
function dateRangeComponent({
  name,
  state,
  alwaysShowCalendars,
  autoApply,
  linkedCalendars,
  singleCalendar,
  startDate,
  endDate,
  maxDate,
  minDate,
  timePicker,
  timePicker24,
  timePickerSecond,
  timePickerIncrement,
  displayFormat,
  applyLabel,
  cancelLabel,
  fromLabel,
  toLabel,
  customRangeLabel,
  disableCustomRange,
  disabledDates,
  drops,
  opens,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  january,
  february,
  march,
  april,
  may,
  june,
  july,
  august,
  september,
  october,
  november,
  december,
  firstDay,
  ranges,
  maxSpan,
  disableRange,
  separator,
  useRangeLabels,
  handleValueChangeUsing,
  showWeekNumbers,
  showISOWeekNumbers,
  weekLabel,
  showDropdowns,
  minYear,
  maxYear,
  timezone: timezone2
}) {
  var dayjsRanges = {};
  for (var key in ranges) {
    var dateRange = ranges[key];
    dayjsRanges[key] = dateRange.map((dateString) => (0, import_dayjs.default)(dateString, displayFormat));
  }
  return {
    dateRangePicker: null,
    state,
    getRangeLabel: function(state2) {
      if (!state2 || !useRangeLabels) {
        return state2;
      }
      const [from, to] = state2.split(separator);
      const fromDate = (0, import_dayjs.default)(from, displayFormat);
      const toDate = (0, import_dayjs.default)(to, displayFormat);
      for (const [label, [rangeFrom, rangeTo]] of Object.entries(dayjsRanges)) {
        if (fromDate.isSame(rangeFrom) && toDate.isSame(rangeTo)) {
          return label;
        }
      }
      return state2;
    },
    init: function() {
      if (timezone2) {
        import_dayjs.default.tz.setDefault(timezone2);
      }
      let dayjsDatesArray = [];
      if (disabledDates !== void 0 && disabledDates.length > 0) {
        dayjsDatesArray = disabledDates.map((dateString) => (0, import_dayjs.default)(dateString, displayFormat));
      }
      this.dateRangePicker = new DateRangePicker(
        this.$refs.daterange,
        {
          // ...other options...
          startDate: startDate != null ? (0, import_dayjs.default)(startDate, displayFormat) : void 0,
          endDate: endDate != null ? (0, import_dayjs.default)(endDate, displayFormat) : void 0,
          maxDate: maxDate != null ? (0, import_dayjs.default)(maxDate, displayFormat) : void 0,
          minDate: minDate != null ? (0, import_dayjs.default)(minDate, displayFormat) : void 0,
          // ...other options...
          ranges: disableRange ? void 0 : dayjsRanges,
          isInvalidDate: (date) => {
            if (dayjsDatesArray != null && dayjsDatesArray.length > 0) {
              return dayjsDatesArray.some(
                (disabledDate) => disabledDate.utc().startOf("day").isSame(date.utc().startOf("day"), "day")
              );
            } else {
              return false;
            }
          }
        }
      );
      window.addEventListener("apply.daterangepicker", function(ev) {
        const picker = ev.detail.picker;
        if (singleCalendar) {
          handleValueChangeUsing(picker.startDate.format(displayFormat), name);
        } else {
          handleValueChangeUsing(
            picker.startDate.format(displayFormat) + separator + picker.endDate.format(displayFormat),
            name
          );
        }
      });
      this.dateFromState(this.dateRangePicker, this.state);
      let parent = this;
      setTimeout(function() {
        parent.$refs.daterange.value = parent.getRangeLabel(parent.state);
      }, 20);
      this.$watch("state", function(value) {
        if (value == null) {
          value = "";
          parent.clear(parent.dateRangePicker);
        } else {
          parent.dateFromState(parent.dateRangePicker, value);
        }
        parent.$refs.daterange.value = parent.getRangeLabel(value);
      });
    },
    clear: function(dateRangePicker) {
      if (dateRangePicker == null) {
        return;
      }
      dateRangePicker.setStartDate((0, import_dayjs.default)());
      dateRangePicker.setEndDate((0, import_dayjs.default)());
    },
    dateFromState: function(dateRangePicker, state2) {
      if (state2 == null) {
        this.clear(dateRangePicker);
        return;
      }
      const dates = state2.split(separator);
      if (dates.length === 2 && dateRangePicker != null) {
        dateRangePicker.setStartDate((0, import_dayjs.default)(dates[0], displayFormat));
        dateRangePicker.setEndDate((0, import_dayjs.default)(dates[1], displayFormat));
      } else {
        this.clear(dateRangePicker);
      }
    }
  };
}
export {
  dateRangeComponent as default
};
/**
 * @author: Alumuko https://github.com/alumuko/alumuko
 * @copyright: Copyright (c) 2021 Alumuko. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: https://github.com/alumuko/vanilla-datetimerange-picker
 *
 * Special thanks to Dan Grossman.
 * This program is base on Dan Grossman's bootstrap-daterangepicker (version 3.1)
 * I just changed the code a bit to not need jquery.
 */
/*! Bundled license information:

moment/moment.js:
  (*! moment.js *)
  (*! version : 2.30.1 *)
  (*! authors : Tim Wood, Iskren Chernev, Moment.js contributors *)
  (*! license : MIT *)
  (*! momentjs.com *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2RheWpzL2RheWpzLm1pbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3V0Yy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3RpbWV6b25lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vY3VzdG9tUGFyc2VGb3JtYXQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vaXNTYW1lT3JCZWZvcmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQuanMiLCAiLi4vcmVzb3VyY2VzL2pzL2ZpbGFtZW50LWRhdGVyYW5nZXBpY2tlci5qcyIsICIuLi9yZXNvdXJjZXMvanMvcGx1Z2luLmNqcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqcz1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9MWUzLGU9NmU0LG49MzZlNSxyPVwibWlsbGlzZWNvbmRcIixpPVwic2Vjb25kXCIscz1cIm1pbnV0ZVwiLHU9XCJob3VyXCIsYT1cImRheVwiLG89XCJ3ZWVrXCIsYz1cIm1vbnRoXCIsZj1cInF1YXJ0ZXJcIixoPVwieWVhclwiLGQ9XCJkYXRlXCIsbD1cIkludmFsaWQgRGF0ZVwiLCQ9L14oXFxkezR9KVstL10/KFxcZHsxLDJ9KT9bLS9dPyhcXGR7MCwyfSlbVHRcXHNdKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT9bLjpdPyhcXGQrKT8kLyx5PS9cXFsoW15cXF1dKyldfFl7MSw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxNPXtuYW1lOlwiZW5cIix3ZWVrZGF5czpcIlN1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5XCIuc3BsaXQoXCJfXCIpLG1vbnRoczpcIkphbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXJcIi5zcGxpdChcIl9cIiksb3JkaW5hbDpmdW5jdGlvbih0KXt2YXIgZT1bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXSxuPXQlMTAwO3JldHVyblwiW1wiK3QrKGVbKG4tMjApJTEwXXx8ZVtuXXx8ZVswXSkrXCJdXCJ9fSxtPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1lP3Q6XCJcIitBcnJheShlKzEtci5sZW5ndGgpLmpvaW4obikrdH0sdj17czptLHo6ZnVuY3Rpb24odCl7dmFyIGU9LXQudXRjT2Zmc2V0KCksbj1NYXRoLmFicyhlKSxyPU1hdGguZmxvb3Iobi82MCksaT1uJTYwO3JldHVybihlPD0wP1wiK1wiOlwiLVwiKSttKHIsMixcIjBcIikrXCI6XCIrbShpLDIsXCIwXCIpfSxtOmZ1bmN0aW9uIHQoZSxuKXtpZihlLmRhdGUoKTxuLmRhdGUoKSlyZXR1cm4tdChuLGUpO3ZhciByPTEyKihuLnllYXIoKS1lLnllYXIoKSkrKG4ubW9udGgoKS1lLm1vbnRoKCkpLGk9ZS5jbG9uZSgpLmFkZChyLGMpLHM9bi1pPDAsdT1lLmNsb25lKCkuYWRkKHIrKHM/LTE6MSksYyk7cmV0dXJuKygtKHIrKG4taSkvKHM/aS11OnUtaSkpfHwwKX0sYTpmdW5jdGlvbih0KXtyZXR1cm4gdDwwP01hdGguY2VpbCh0KXx8MDpNYXRoLmZsb29yKHQpfSxwOmZ1bmN0aW9uKHQpe3JldHVybntNOmMseTpoLHc6byxkOmEsRDpkLGg6dSxtOnMsczppLG1zOnIsUTpmfVt0XXx8U3RyaW5nKHR8fFwiXCIpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvcyQvLFwiXCIpfSx1OmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sZz1cImVuXCIsRD17fTtEW2ddPU07dmFyIHA9XCIkaXNEYXlqc09iamVjdFwiLFM9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBffHwhKCF0fHwhdFtwXSl9LHc9ZnVuY3Rpb24gdChlLG4scil7dmFyIGk7aWYoIWUpcmV0dXJuIGc7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe3ZhciBzPWUudG9Mb3dlckNhc2UoKTtEW3NdJiYoaT1zKSxuJiYoRFtzXT1uLGk9cyk7dmFyIHU9ZS5zcGxpdChcIi1cIik7aWYoIWkmJnUubGVuZ3RoPjEpcmV0dXJuIHQodVswXSl9ZWxzZXt2YXIgYT1lLm5hbWU7RFthXT1lLGk9YX1yZXR1cm4hciYmaSYmKGc9aSksaXx8IXImJmd9LE89ZnVuY3Rpb24odCxlKXtpZihTKHQpKXJldHVybiB0LmNsb25lKCk7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIGU/ZTp7fTtyZXR1cm4gbi5kYXRlPXQsbi5hcmdzPWFyZ3VtZW50cyxuZXcgXyhuKX0sYj12O2IubD13LGIuaT1TLGIudz1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQse2xvY2FsZTplLiRMLHV0YzplLiR1LHg6ZS4keCwkb2Zmc2V0OmUuJG9mZnNldH0pfTt2YXIgXz1mdW5jdGlvbigpe2Z1bmN0aW9uIE0odCl7dGhpcy4kTD13KHQubG9jYWxlLG51bGwsITApLHRoaXMucGFyc2UodCksdGhpcy4keD10aGlzLiR4fHx0Lnh8fHt9LHRoaXNbcF09ITB9dmFyIG09TS5wcm90b3R5cGU7cmV0dXJuIG0ucGFyc2U9ZnVuY3Rpb24odCl7dGhpcy4kZD1mdW5jdGlvbih0KXt2YXIgZT10LmRhdGUsbj10LnV0YztpZihudWxsPT09ZSlyZXR1cm4gbmV3IERhdGUoTmFOKTtpZihiLnUoZSkpcmV0dXJuIG5ldyBEYXRlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBuZXcgRGF0ZShlKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmIS9aJC9pLnRlc3QoZSkpe3ZhciByPWUubWF0Y2goJCk7aWYocil7dmFyIGk9clsyXS0xfHwwLHM9KHJbN118fFwiMFwiKS5zdWJzdHJpbmcoMCwzKTtyZXR1cm4gbj9uZXcgRGF0ZShEYXRlLlVUQyhyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKSk6bmV3IERhdGUoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscyl9fXJldHVybiBuZXcgRGF0ZShlKX0odCksdGhpcy5pbml0KCl9LG0uaW5pdD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuJGQ7dGhpcy4keT10LmdldEZ1bGxZZWFyKCksdGhpcy4kTT10LmdldE1vbnRoKCksdGhpcy4kRD10LmdldERhdGUoKSx0aGlzLiRXPXQuZ2V0RGF5KCksdGhpcy4kSD10LmdldEhvdXJzKCksdGhpcy4kbT10LmdldE1pbnV0ZXMoKSx0aGlzLiRzPXQuZ2V0U2Vjb25kcygpLHRoaXMuJG1zPXQuZ2V0TWlsbGlzZWNvbmRzKCl9LG0uJHV0aWxzPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9LG0uaXNWYWxpZD1mdW5jdGlvbigpe3JldHVybiEodGhpcy4kZC50b1N0cmluZygpPT09bCl9LG0uaXNTYW1lPWZ1bmN0aW9uKHQsZSl7dmFyIG49Tyh0KTtyZXR1cm4gdGhpcy5zdGFydE9mKGUpPD1uJiZuPD10aGlzLmVuZE9mKGUpfSxtLmlzQWZ0ZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTyh0KTx0aGlzLnN0YXJ0T2YoZSl9LG0uaXNCZWZvcmU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5lbmRPZihlKTxPKHQpfSxtLiRnPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gYi51KHQpP3RoaXNbZV06dGhpcy5zZXQobix0KX0sbS51bml4PWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkvMWUzKX0sbS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQuZ2V0VGltZSgpfSxtLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLHI9ISFiLnUoZSl8fGUsZj1iLnAodCksbD1mdW5jdGlvbih0LGUpe3ZhciBpPWIudyhuLiR1P0RhdGUuVVRDKG4uJHksZSx0KTpuZXcgRGF0ZShuLiR5LGUsdCksbik7cmV0dXJuIHI/aTppLmVuZE9mKGEpfSwkPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGIudyhuLnRvRGF0ZSgpW3RdLmFwcGx5KG4udG9EYXRlKFwic1wiKSwocj9bMCwwLDAsMF06WzIzLDU5LDU5LDk5OV0pLnNsaWNlKGUpKSxuKX0seT10aGlzLiRXLE09dGhpcy4kTSxtPXRoaXMuJEQsdj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIik7c3dpdGNoKGYpe2Nhc2UgaDpyZXR1cm4gcj9sKDEsMCk6bCgzMSwxMSk7Y2FzZSBjOnJldHVybiByP2woMSxNKTpsKDAsTSsxKTtjYXNlIG86dmFyIGc9dGhpcy4kbG9jYWxlKCkud2Vla1N0YXJ0fHwwLEQ9KHk8Zz95Kzc6eSktZztyZXR1cm4gbChyP20tRDptKyg2LUQpLE0pO2Nhc2UgYTpjYXNlIGQ6cmV0dXJuICQoditcIkhvdXJzXCIsMCk7Y2FzZSB1OnJldHVybiAkKHYrXCJNaW51dGVzXCIsMSk7Y2FzZSBzOnJldHVybiAkKHYrXCJTZWNvbmRzXCIsMik7Y2FzZSBpOnJldHVybiAkKHYrXCJNaWxsaXNlY29uZHNcIiwzKTtkZWZhdWx0OnJldHVybiB0aGlzLmNsb25lKCl9fSxtLmVuZE9mPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnN0YXJ0T2YodCwhMSl9LG0uJHNldD1mdW5jdGlvbih0LGUpe3ZhciBuLG89Yi5wKHQpLGY9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpLGw9KG49e30sblthXT1mK1wiRGF0ZVwiLG5bZF09ZitcIkRhdGVcIixuW2NdPWYrXCJNb250aFwiLG5baF09ZitcIkZ1bGxZZWFyXCIsblt1XT1mK1wiSG91cnNcIixuW3NdPWYrXCJNaW51dGVzXCIsbltpXT1mK1wiU2Vjb25kc1wiLG5bcl09ZitcIk1pbGxpc2Vjb25kc1wiLG4pW29dLCQ9bz09PWE/dGhpcy4kRCsoZS10aGlzLiRXKTplO2lmKG89PT1jfHxvPT09aCl7dmFyIHk9dGhpcy5jbG9uZSgpLnNldChkLDEpO3kuJGRbbF0oJCkseS5pbml0KCksdGhpcy4kZD15LnNldChkLE1hdGgubWluKHRoaXMuJEQseS5kYXlzSW5Nb250aCgpKSkuJGR9ZWxzZSBsJiZ0aGlzLiRkW2xdKCQpO3JldHVybiB0aGlzLmluaXQoKSx0aGlzfSxtLnNldD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmNsb25lKCkuJHNldCh0LGUpfSxtLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1tiLnAodCldKCl9LG0uYWRkPWZ1bmN0aW9uKHIsZil7dmFyIGQsbD10aGlzO3I9TnVtYmVyKHIpO3ZhciAkPWIucChmKSx5PWZ1bmN0aW9uKHQpe3ZhciBlPU8obCk7cmV0dXJuIGIudyhlLmRhdGUoZS5kYXRlKCkrTWF0aC5yb3VuZCh0KnIpKSxsKX07aWYoJD09PWMpcmV0dXJuIHRoaXMuc2V0KGMsdGhpcy4kTStyKTtpZigkPT09aClyZXR1cm4gdGhpcy5zZXQoaCx0aGlzLiR5K3IpO2lmKCQ9PT1hKXJldHVybiB5KDEpO2lmKCQ9PT1vKXJldHVybiB5KDcpO3ZhciBNPShkPXt9LGRbc109ZSxkW3VdPW4sZFtpXT10LGQpWyRdfHwxLG09dGhpcy4kZC5nZXRUaW1lKCkrcipNO3JldHVybiBiLncobSx0aGlzKX0sbS5zdWJ0cmFjdD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmFkZCgtMSp0LGUpfSxtLmZvcm1hdD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy4kbG9jYWxlKCk7aWYoIXRoaXMuaXNWYWxpZCgpKXJldHVybiBuLmludmFsaWREYXRlfHxsO3ZhciByPXR8fFwiWVlZWS1NTS1ERFRISDptbTpzc1pcIixpPWIueih0aGlzKSxzPXRoaXMuJEgsdT10aGlzLiRtLGE9dGhpcy4kTSxvPW4ud2Vla2RheXMsYz1uLm1vbnRocyxmPW4ubWVyaWRpZW0saD1mdW5jdGlvbih0LG4saSxzKXtyZXR1cm4gdCYmKHRbbl18fHQoZSxyKSl8fGlbbl0uc2xpY2UoMCxzKX0sZD1mdW5jdGlvbih0KXtyZXR1cm4gYi5zKHMlMTJ8fDEyLHQsXCIwXCIpfSwkPWZ8fGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10PDEyP1wiQU1cIjpcIlBNXCI7cmV0dXJuIG4/ci50b0xvd2VyQ2FzZSgpOnJ9O3JldHVybiByLnJlcGxhY2UoeSwoZnVuY3Rpb24odCxyKXtyZXR1cm4gcnx8ZnVuY3Rpb24odCl7c3dpdGNoKHQpe2Nhc2VcIllZXCI6cmV0dXJuIFN0cmluZyhlLiR5KS5zbGljZSgtMik7Y2FzZVwiWVlZWVwiOnJldHVybiBiLnMoZS4keSw0LFwiMFwiKTtjYXNlXCJNXCI6cmV0dXJuIGErMTtjYXNlXCJNTVwiOnJldHVybiBiLnMoYSsxLDIsXCIwXCIpO2Nhc2VcIk1NTVwiOnJldHVybiBoKG4ubW9udGhzU2hvcnQsYSxjLDMpO2Nhc2VcIk1NTU1cIjpyZXR1cm4gaChjLGEpO2Nhc2VcIkRcIjpyZXR1cm4gZS4kRDtjYXNlXCJERFwiOnJldHVybiBiLnMoZS4kRCwyLFwiMFwiKTtjYXNlXCJkXCI6cmV0dXJuIFN0cmluZyhlLiRXKTtjYXNlXCJkZFwiOnJldHVybiBoKG4ud2Vla2RheXNNaW4sZS4kVyxvLDIpO2Nhc2VcImRkZFwiOnJldHVybiBoKG4ud2Vla2RheXNTaG9ydCxlLiRXLG8sMyk7Y2FzZVwiZGRkZFwiOnJldHVybiBvW2UuJFddO2Nhc2VcIkhcIjpyZXR1cm4gU3RyaW5nKHMpO2Nhc2VcIkhIXCI6cmV0dXJuIGIucyhzLDIsXCIwXCIpO2Nhc2VcImhcIjpyZXR1cm4gZCgxKTtjYXNlXCJoaFwiOnJldHVybiBkKDIpO2Nhc2VcImFcIjpyZXR1cm4gJChzLHUsITApO2Nhc2VcIkFcIjpyZXR1cm4gJChzLHUsITEpO2Nhc2VcIm1cIjpyZXR1cm4gU3RyaW5nKHUpO2Nhc2VcIm1tXCI6cmV0dXJuIGIucyh1LDIsXCIwXCIpO2Nhc2VcInNcIjpyZXR1cm4gU3RyaW5nKGUuJHMpO2Nhc2VcInNzXCI6cmV0dXJuIGIucyhlLiRzLDIsXCIwXCIpO2Nhc2VcIlNTU1wiOnJldHVybiBiLnMoZS4kbXMsMyxcIjBcIik7Y2FzZVwiWlwiOnJldHVybiBpfXJldHVybiBudWxsfSh0KXx8aS5yZXBsYWNlKFwiOlwiLFwiXCIpfSkpfSxtLnV0Y09mZnNldD1mdW5jdGlvbigpe3JldHVybiAxNSotTWF0aC5yb3VuZCh0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpfSxtLmRpZmY9ZnVuY3Rpb24ocixkLGwpe3ZhciAkLHk9dGhpcyxNPWIucChkKSxtPU8ociksdj0obS51dGNPZmZzZXQoKS10aGlzLnV0Y09mZnNldCgpKSplLGc9dGhpcy1tLEQ9ZnVuY3Rpb24oKXtyZXR1cm4gYi5tKHksbSl9O3N3aXRjaChNKXtjYXNlIGg6JD1EKCkvMTI7YnJlYWs7Y2FzZSBjOiQ9RCgpO2JyZWFrO2Nhc2UgZjokPUQoKS8zO2JyZWFrO2Nhc2UgbzokPShnLXYpLzYwNDhlNTticmVhaztjYXNlIGE6JD0oZy12KS84NjRlNTticmVhaztjYXNlIHU6JD1nL247YnJlYWs7Y2FzZSBzOiQ9Zy9lO2JyZWFrO2Nhc2UgaTokPWcvdDticmVhaztkZWZhdWx0OiQ9Z31yZXR1cm4gbD8kOmIuYSgkKX0sbS5kYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuZE9mKGMpLiREfSxtLiRsb2NhbGU9ZnVuY3Rpb24oKXtyZXR1cm4gRFt0aGlzLiRMXX0sbS5sb2NhbGU9ZnVuY3Rpb24odCxlKXtpZighdClyZXR1cm4gdGhpcy4kTDt2YXIgbj10aGlzLmNsb25lKCkscj13KHQsZSwhMCk7cmV0dXJuIHImJihuLiRMPXIpLG59LG0uY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gYi53KHRoaXMuJGQsdGhpcyl9LG0udG9EYXRlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKX0sbS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc1ZhbGlkKCk/dGhpcy50b0lTT1N0cmluZygpOm51bGx9LG0udG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b0lTT1N0cmluZygpfSxtLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9VVENTdHJpbmcoKX0sTX0oKSxrPV8ucHJvdG90eXBlO3JldHVybiBPLnByb3RvdHlwZT1rLFtbXCIkbXNcIixyXSxbXCIkc1wiLGldLFtcIiRtXCIsc10sW1wiJEhcIix1XSxbXCIkV1wiLGFdLFtcIiRNXCIsY10sW1wiJHlcIixoXSxbXCIkRFwiLGRdXS5mb3JFYWNoKChmdW5jdGlvbih0KXtrW3RbMV1dPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLiRnKGUsdFswXSx0WzFdKX19KSksTy5leHRlbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC4kaXx8KHQoZSxfLE8pLHQuJGk9ITApLE99LE8ubG9jYWxlPXcsTy5pc0RheWpzPVMsTy51bml4PWZ1bmN0aW9uKHQpe3JldHVybiBPKDFlMyp0KX0sTy5lbj1EW2ddLE8uTHM9RCxPLnA9e30sT30pKTsiLCAiIWZ1bmN0aW9uKHQsaSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9aSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoaSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqc19wbHVnaW5fdXRjPWkoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1cIm1pbnV0ZVwiLGk9L1srLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2csZT0vKFsrLV18XFxkXFxkKS9nO3JldHVybiBmdW5jdGlvbihzLGYsbil7dmFyIHU9Zi5wcm90b3R5cGU7bi51dGM9ZnVuY3Rpb24odCl7dmFyIGk9e2RhdGU6dCx1dGM6ITAsYXJnczphcmd1bWVudHN9O3JldHVybiBuZXcgZihpKX0sdS51dGM9ZnVuY3Rpb24oaSl7dmFyIGU9bih0aGlzLnRvRGF0ZSgpLHtsb2NhbGU6dGhpcy4kTCx1dGM6ITB9KTtyZXR1cm4gaT9lLmFkZCh0aGlzLnV0Y09mZnNldCgpLHQpOmV9LHUubG9jYWw9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzLnRvRGF0ZSgpLHtsb2NhbGU6dGhpcy4kTCx1dGM6ITF9KX07dmFyIG89dS5wYXJzZTt1LnBhcnNlPWZ1bmN0aW9uKHQpe3QudXRjJiYodGhpcy4kdT0hMCksdGhpcy4kdXRpbHMoKS51KHQuJG9mZnNldCl8fCh0aGlzLiRvZmZzZXQ9dC4kb2Zmc2V0KSxvLmNhbGwodGhpcyx0KX07dmFyIHI9dS5pbml0O3UuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuJHUpe3ZhciB0PXRoaXMuJGQ7dGhpcy4keT10LmdldFVUQ0Z1bGxZZWFyKCksdGhpcy4kTT10LmdldFVUQ01vbnRoKCksdGhpcy4kRD10LmdldFVUQ0RhdGUoKSx0aGlzLiRXPXQuZ2V0VVRDRGF5KCksdGhpcy4kSD10LmdldFVUQ0hvdXJzKCksdGhpcy4kbT10LmdldFVUQ01pbnV0ZXMoKSx0aGlzLiRzPXQuZ2V0VVRDU2Vjb25kcygpLHRoaXMuJG1zPXQuZ2V0VVRDTWlsbGlzZWNvbmRzKCl9ZWxzZSByLmNhbGwodGhpcyl9O3ZhciBhPXUudXRjT2Zmc2V0O3UudXRjT2Zmc2V0PWZ1bmN0aW9uKHMsZil7dmFyIG49dGhpcy4kdXRpbHMoKS51O2lmKG4ocykpcmV0dXJuIHRoaXMuJHU/MDpuKHRoaXMuJG9mZnNldCk/YS5jYWxsKHRoaXMpOnRoaXMuJG9mZnNldDtpZihcInN0cmluZ1wiPT10eXBlb2YgcyYmKHM9ZnVuY3Rpb24odCl7dm9pZCAwPT09dCYmKHQ9XCJcIik7dmFyIHM9dC5tYXRjaChpKTtpZighcylyZXR1cm4gbnVsbDt2YXIgZj0oXCJcIitzWzBdKS5tYXRjaChlKXx8W1wiLVwiLDAsMF0sbj1mWzBdLHU9NjAqK2ZbMV0rICtmWzJdO3JldHVybiAwPT09dT8wOlwiK1wiPT09bj91Oi11fShzKSxudWxsPT09cykpcmV0dXJuIHRoaXM7dmFyIHU9TWF0aC5hYnMocyk8PTE2PzYwKnM6cyxvPXRoaXM7aWYoZilyZXR1cm4gby4kb2Zmc2V0PXUsby4kdT0wPT09cyxvO2lmKDAhPT1zKXt2YXIgcj10aGlzLiR1P3RoaXMudG9EYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTotMSp0aGlzLnV0Y09mZnNldCgpOyhvPXRoaXMubG9jYWwoKS5hZGQodStyLHQpKS4kb2Zmc2V0PXUsby4keC4kbG9jYWxPZmZzZXQ9cn1lbHNlIG89dGhpcy51dGMoKTtyZXR1cm4gb307dmFyIGg9dS5mb3JtYXQ7dS5mb3JtYXQ9ZnVuY3Rpb24odCl7dmFyIGk9dHx8KHRoaXMuJHU/XCJZWVlZLU1NLUREVEhIOm1tOnNzW1pdXCI6XCJcIik7cmV0dXJuIGguY2FsbCh0aGlzLGkpfSx1LnZhbHVlT2Y9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiR1dGlscygpLnUodGhpcy4kb2Zmc2V0KT8wOnRoaXMuJG9mZnNldCsodGhpcy4keC4kbG9jYWxPZmZzZXR8fHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKSk7cmV0dXJuIHRoaXMuJGQudmFsdWVPZigpLTZlNCp0fSx1LmlzVVRDPWZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLiR1fSx1LnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKX0sdS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3ZhciBsPXUudG9EYXRlO3UudG9EYXRlPWZ1bmN0aW9uKHQpe3JldHVyblwic1wiPT09dCYmdGhpcy4kb2Zmc2V0P24odGhpcy5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzOlNTU1wiKSkudG9EYXRlKCk6bC5jYWxsKHRoaXMpfTt2YXIgYz11LmRpZmY7dS5kaWZmPWZ1bmN0aW9uKHQsaSxlKXtpZih0JiZ0aGlzLiR1PT09dC4kdSlyZXR1cm4gYy5jYWxsKHRoaXMsdCxpLGUpO3ZhciBzPXRoaXMubG9jYWwoKSxmPW4odCkubG9jYWwoKTtyZXR1cm4gYy5jYWxsKHMsZixpLGUpfX19KSk7IiwgIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3RpbWV6b25lPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD17eWVhcjowLG1vbnRoOjEsZGF5OjIsaG91cjozLG1pbnV0ZTo0LHNlY29uZDo1fSxlPXt9O3JldHVybiBmdW5jdGlvbihuLGksbyl7dmFyIHIsYT1mdW5jdGlvbih0LG4saSl7dm9pZCAwPT09aSYmKGk9e30pO3ZhciBvPW5ldyBEYXRlKHQpLHI9ZnVuY3Rpb24odCxuKXt2b2lkIDA9PT1uJiYobj17fSk7dmFyIGk9bi50aW1lWm9uZU5hbWV8fFwic2hvcnRcIixvPXQrXCJ8XCIraSxyPWVbb107cmV0dXJuIHJ8fChyPW5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIix7aG91cjEyOiExLHRpbWVab25lOnQseWVhcjpcIm51bWVyaWNcIixtb250aDpcIjItZGlnaXRcIixkYXk6XCIyLWRpZ2l0XCIsaG91cjpcIjItZGlnaXRcIixtaW51dGU6XCIyLWRpZ2l0XCIsc2Vjb25kOlwiMi1kaWdpdFwiLHRpbWVab25lTmFtZTppfSksZVtvXT1yKSxyfShuLGkpO3JldHVybiByLmZvcm1hdFRvUGFydHMobyl9LHU9ZnVuY3Rpb24oZSxuKXtmb3IodmFyIGk9YShlLG4pLHI9W10sdT0wO3U8aS5sZW5ndGg7dSs9MSl7dmFyIGY9aVt1XSxzPWYudHlwZSxtPWYudmFsdWUsYz10W3NdO2M+PTAmJihyW2NdPXBhcnNlSW50KG0sMTApKX12YXIgZD1yWzNdLGw9MjQ9PT1kPzA6ZCxoPXJbMF0rXCItXCIrclsxXStcIi1cIityWzJdK1wiIFwiK2wrXCI6XCIrcls0XStcIjpcIityWzVdK1wiOjAwMFwiLHY9K2U7cmV0dXJuKG8udXRjKGgpLnZhbHVlT2YoKS0odi09diUxZTMpKS82ZTR9LGY9aS5wcm90b3R5cGU7Zi50ej1mdW5jdGlvbih0LGUpe3ZvaWQgMD09PXQmJih0PXIpO3ZhciBuLGk9dGhpcy51dGNPZmZzZXQoKSxhPXRoaXMudG9EYXRlKCksdT1hLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIix7dGltZVpvbmU6dH0pLGY9TWF0aC5yb3VuZCgoYS1uZXcgRGF0ZSh1KSkvMWUzLzYwKSxzPTE1Ki1NYXRoLnJvdW5kKGEuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSktZjtpZighTnVtYmVyKHMpKW49dGhpcy51dGNPZmZzZXQoMCxlKTtlbHNlIGlmKG49byh1LHtsb2NhbGU6dGhpcy4kTH0pLiRzZXQoXCJtaWxsaXNlY29uZFwiLHRoaXMuJG1zKS51dGNPZmZzZXQocywhMCksZSl7dmFyIG09bi51dGNPZmZzZXQoKTtuPW4uYWRkKGktbSxcIm1pbnV0ZVwiKX1yZXR1cm4gbi4keC4kdGltZXpvbmU9dCxufSxmLm9mZnNldE5hbWU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy4keC4kdGltZXpvbmV8fG8udHouZ3Vlc3MoKSxuPWEodGhpcy52YWx1ZU9mKCksZSx7dGltZVpvbmVOYW1lOnR9KS5maW5kKChmdW5jdGlvbih0KXtyZXR1cm5cInRpbWV6b25lbmFtZVwiPT09dC50eXBlLnRvTG93ZXJDYXNlKCl9KSk7cmV0dXJuIG4mJm4udmFsdWV9O3ZhciBzPWYuc3RhcnRPZjtmLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXtpZighdGhpcy4keHx8IXRoaXMuJHguJHRpbWV6b25lKXJldHVybiBzLmNhbGwodGhpcyx0LGUpO3ZhciBuPW8odGhpcy5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzOlNTU1wiKSx7bG9jYWxlOnRoaXMuJEx9KTtyZXR1cm4gcy5jYWxsKG4sdCxlKS50eih0aGlzLiR4LiR0aW1lem9uZSwhMCl9LG8udHo9ZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4mJmUsYT1ufHxlfHxyLGY9dSgrbygpLGEpO2lmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXJldHVybiBvKHQpLnR6KGEpO3ZhciBzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgaT10LTYwKmUqMWUzLG89dShpLG4pO2lmKGU9PT1vKXJldHVybltpLGVdO3ZhciByPXUoaS09NjAqKG8tZSkqMWUzLG4pO3JldHVybiBvPT09cj9baSxvXTpbdC02MCpNYXRoLm1pbihvLHIpKjFlMyxNYXRoLm1heChvLHIpXX0oby51dGModCxpKS52YWx1ZU9mKCksZixhKSxtPXNbMF0sYz1zWzFdLGQ9byhtKS51dGNPZmZzZXQoYyk7cmV0dXJuIGQuJHguJHRpbWV6b25lPWEsZH0sby50ei5ndWVzcz1mdW5jdGlvbigpe3JldHVybiBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmV9LG8udHouc2V0RGVmYXVsdD1mdW5jdGlvbih0KXtyPXR9fX0pKTsiLCAiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5fY3VzdG9tUGFyc2VGb3JtYXQ9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPXtMVFM6XCJoOm1tOnNzIEFcIixMVDpcImg6bW0gQVwiLEw6XCJNTS9ERC9ZWVlZXCIsTEw6XCJNTU1NIEQsIFlZWVlcIixMTEw6XCJNTU1NIEQsIFlZWVkgaDptbSBBXCIsTExMTDpcImRkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEFcIn0sdD0vKFxcW1teW10qXFxdKXwoWy1fOi8uLCgpXFxzXSspfChBfGF8UXxZWVlZfFlZP3x3dz98TU0/TT9NP3xEb3xERD98aGg/fEhIP3xtbT98c3M/fFN7MSwzfXx6fFpaPykvZyxuPS9cXGQvLHI9L1xcZFxcZC8saT0vXFxkXFxkPy8sbz0vXFxkKlteLV86LywoKVxcc1xcZF0rLyxzPXt9LGE9ZnVuY3Rpb24oZSl7cmV0dXJuKGU9K2UpKyhlPjY4PzE5MDA6MmUzKX07dmFyIGY9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3RoaXNbZV09K3R9fSxoPVsvWystXVxcZFxcZDo/KFxcZFxcZCk/fFovLGZ1bmN0aW9uKGUpeyh0aGlzLnpvbmV8fCh0aGlzLnpvbmU9e30pKS5vZmZzZXQ9ZnVuY3Rpb24oZSl7aWYoIWUpcmV0dXJuIDA7aWYoXCJaXCI9PT1lKXJldHVybiAwO3ZhciB0PWUubWF0Y2goLyhbKy1dfFxcZFxcZCkvZyksbj02MCp0WzFdKygrdFsyXXx8MCk7cmV0dXJuIDA9PT1uPzA6XCIrXCI9PT10WzBdPy1uOm59KGUpfV0sdT1mdW5jdGlvbihlKXt2YXIgdD1zW2VdO3JldHVybiB0JiYodC5pbmRleE9mP3Q6dC5zLmNvbmNhdCh0LmYpKX0sZD1mdW5jdGlvbihlLHQpe3ZhciBuLHI9cy5tZXJpZGllbTtpZihyKXtmb3IodmFyIGk9MTtpPD0yNDtpKz0xKWlmKGUuaW5kZXhPZihyKGksMCx0KSk+LTEpe249aT4xMjticmVha319ZWxzZSBuPWU9PT0odD9cInBtXCI6XCJQTVwiKTtyZXR1cm4gbn0sYz17QTpbbyxmdW5jdGlvbihlKXt0aGlzLmFmdGVybm9vbj1kKGUsITEpfV0sYTpbbyxmdW5jdGlvbihlKXt0aGlzLmFmdGVybm9vbj1kKGUsITApfV0sUTpbbixmdW5jdGlvbihlKXt0aGlzLm1vbnRoPTMqKGUtMSkrMX1dLFM6W24sZnVuY3Rpb24oZSl7dGhpcy5taWxsaXNlY29uZHM9MTAwKitlfV0sU1M6W3IsZnVuY3Rpb24oZSl7dGhpcy5taWxsaXNlY29uZHM9MTAqK2V9XSxTU1M6Wy9cXGR7M30vLGZ1bmN0aW9uKGUpe3RoaXMubWlsbGlzZWNvbmRzPStlfV0sczpbaSxmKFwic2Vjb25kc1wiKV0sc3M6W2ksZihcInNlY29uZHNcIildLG06W2ksZihcIm1pbnV0ZXNcIildLG1tOltpLGYoXCJtaW51dGVzXCIpXSxIOltpLGYoXCJob3Vyc1wiKV0saDpbaSxmKFwiaG91cnNcIildLEhIOltpLGYoXCJob3Vyc1wiKV0saGg6W2ksZihcImhvdXJzXCIpXSxEOltpLGYoXCJkYXlcIildLEREOltyLGYoXCJkYXlcIildLERvOltvLGZ1bmN0aW9uKGUpe3ZhciB0PXMub3JkaW5hbCxuPWUubWF0Y2goL1xcZCsvKTtpZih0aGlzLmRheT1uWzBdLHQpZm9yKHZhciByPTE7cjw9MzE7cis9MSl0KHIpLnJlcGxhY2UoL1xcW3xcXF0vZyxcIlwiKT09PWUmJih0aGlzLmRheT1yKX1dLHc6W2ksZihcIndlZWtcIildLHd3OltyLGYoXCJ3ZWVrXCIpXSxNOltpLGYoXCJtb250aFwiKV0sTU06W3IsZihcIm1vbnRoXCIpXSxNTU06W28sZnVuY3Rpb24oZSl7dmFyIHQ9dShcIm1vbnRoc1wiKSxuPSh1KFwibW9udGhzU2hvcnRcIil8fHQubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS5zbGljZSgwLDMpfSkpKS5pbmRleE9mKGUpKzE7aWYobjwxKXRocm93IG5ldyBFcnJvcjt0aGlzLm1vbnRoPW4lMTJ8fG59XSxNTU1NOltvLGZ1bmN0aW9uKGUpe3ZhciB0PXUoXCJtb250aHNcIikuaW5kZXhPZihlKSsxO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3I7dGhpcy5tb250aD10JTEyfHx0fV0sWTpbL1srLV0/XFxkKy8sZihcInllYXJcIildLFlZOltyLGZ1bmN0aW9uKGUpe3RoaXMueWVhcj1hKGUpfV0sWVlZWTpbL1xcZHs0fS8sZihcInllYXJcIildLFo6aCxaWjpofTtmdW5jdGlvbiBsKG4pe3ZhciByLGk7cj1uLGk9cyYmcy5mb3JtYXRzO2Zvcih2YXIgbz0obj1yLnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywoZnVuY3Rpb24odCxuLHIpe3ZhciBvPXImJnIudG9VcHBlckNhc2UoKTtyZXR1cm4gbnx8aVtyXXx8ZVtyXXx8aVtvXS5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdHx8bi5zbGljZSgxKX0pKX0pKSkubWF0Y2godCksYT1vLmxlbmd0aCxmPTA7ZjxhO2YrPTEpe3ZhciBoPW9bZl0sdT1jW2hdLGQ9dSYmdVswXSxsPXUmJnVbMV07b1tmXT1sP3tyZWdleDpkLHBhcnNlcjpsfTpoLnJlcGxhY2UoL15cXFt8XFxdJC9nLFwiXCIpfXJldHVybiBmdW5jdGlvbihlKXtmb3IodmFyIHQ9e30sbj0wLHI9MDtuPGE7bis9MSl7dmFyIGk9b1tuXTtpZihcInN0cmluZ1wiPT10eXBlb2YgaSlyKz1pLmxlbmd0aDtlbHNle3ZhciBzPWkucmVnZXgsZj1pLnBhcnNlcixoPWUuc2xpY2UociksdT1zLmV4ZWMoaClbMF07Zi5jYWxsKHQsdSksZT1lLnJlcGxhY2UodSxcIlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PWUuYWZ0ZXJub29uO2lmKHZvaWQgMCE9PXQpe3ZhciBuPWUuaG91cnM7dD9uPDEyJiYoZS5ob3Vycys9MTIpOjEyPT09biYmKGUuaG91cnM9MCksZGVsZXRlIGUuYWZ0ZXJub29ufX0odCksdH19cmV0dXJuIGZ1bmN0aW9uKGUsdCxuKXtuLnAuY3VzdG9tUGFyc2VGb3JtYXQ9ITAsZSYmZS5wYXJzZVR3b0RpZ2l0WWVhciYmKGE9ZS5wYXJzZVR3b0RpZ2l0WWVhcik7dmFyIHI9dC5wcm90b3R5cGUsaT1yLnBhcnNlO3IucGFyc2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRlLHI9ZS51dGMsbz1lLmFyZ3M7dGhpcy4kdT1yO3ZhciBhPW9bMV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEpe3ZhciBmPSEwPT09b1syXSxoPSEwPT09b1szXSx1PWZ8fGgsZD1vWzJdO2gmJihkPW9bMl0pLHM9dGhpcy4kbG9jYWxlKCksIWYmJmQmJihzPW4uTHNbZF0pLHRoaXMuJGQ9ZnVuY3Rpb24oZSx0LG4scil7dHJ5e2lmKFtcInhcIixcIlhcIl0uaW5kZXhPZih0KT4tMSlyZXR1cm4gbmV3IERhdGUoKFwiWFwiPT09dD8xZTM6MSkqZSk7dmFyIGk9bCh0KShlKSxvPWkueWVhcixzPWkubW9udGgsYT1pLmRheSxmPWkuaG91cnMsaD1pLm1pbnV0ZXMsdT1pLnNlY29uZHMsZD1pLm1pbGxpc2Vjb25kcyxjPWkuem9uZSxtPWkud2VlayxNPW5ldyBEYXRlLFk9YXx8KG98fHM/MTpNLmdldERhdGUoKSkscD1vfHxNLmdldEZ1bGxZZWFyKCksdj0wO28mJiFzfHwodj1zPjA/cy0xOk0uZ2V0TW9udGgoKSk7dmFyIEQsdz1mfHwwLGc9aHx8MCx5PXV8fDAsTD1kfHwwO3JldHVybiBjP25ldyBEYXRlKERhdGUuVVRDKHAsdixZLHcsZyx5LEwrNjAqYy5vZmZzZXQqMWUzKSk6bj9uZXcgRGF0ZShEYXRlLlVUQyhwLHYsWSx3LGcseSxMKSk6KEQ9bmV3IERhdGUocCx2LFksdyxnLHksTCksbSYmKEQ9cihEKS53ZWVrKG0pLnRvRGF0ZSgpKSxEKX1jYXRjaChlKXtyZXR1cm4gbmV3IERhdGUoXCJcIil9fSh0LGEscixuKSx0aGlzLmluaXQoKSxkJiYhMCE9PWQmJih0aGlzLiRMPXRoaXMubG9jYWxlKGQpLiRMKSx1JiZ0IT10aGlzLmZvcm1hdChhKSYmKHRoaXMuJGQ9bmV3IERhdGUoXCJcIikpLHM9e319ZWxzZSBpZihhIGluc3RhbmNlb2YgQXJyYXkpZm9yKHZhciBjPWEubGVuZ3RoLG09MTttPD1jO20rPTEpe29bMV09YVttLTFdO3ZhciBNPW4uYXBwbHkodGhpcyxvKTtpZihNLmlzVmFsaWQoKSl7dGhpcy4kZD1NLiRkLHRoaXMuJEw9TS4kTCx0aGlzLmluaXQoKTticmVha31tPT09YyYmKHRoaXMuJGQ9bmV3IERhdGUoXCJcIikpfWVsc2UgaS5jYWxsKHRoaXMsZSl9fX0pKTsiLCAiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5faXNTYW1lT3JBZnRlcj10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7dC5wcm90b3R5cGUuaXNTYW1lT3JBZnRlcj1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmlzU2FtZShlLHQpfHx0aGlzLmlzQWZ0ZXIoZSx0KX19fSkpOyIsICIhZnVuY3Rpb24oZSxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckJlZm9yZT1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7aS5wcm90b3R5cGUuaXNTYW1lT3JCZWZvcmU9ZnVuY3Rpb24oZSxpKXtyZXR1cm4gdGhpcy5pc1NhbWUoZSxpKXx8dGhpcy5pc0JlZm9yZShlLGkpfX19KSk7IiwgIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4zMC4xXG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gaG9va3MoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IHdpbGwgdHJlYXQgdW5kZWZpbmVkIGFuZCBudWxsIGFzIG9iamVjdCBpZiBpdCB3YXNuJ3QgZm9yXG4gICAgICAgIC8vIGlucHV0ICE9IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlucHV0ICE9IG51bGwgJiZcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3RFbXB0eShvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggPT09IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgIGZvciAoayBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBOdW1iZXJdJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyckxlbjsgKytpKSB7XG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHk6IGZhbHNlLFxuICAgICAgICAgICAgdW51c2VkVG9rZW5zOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0OiBbXSxcbiAgICAgICAgICAgIG92ZXJmbG93OiAtMixcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXI6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQ6IGZhbHNlLFxuICAgICAgICAgICAgaW52YWxpZEVyYTogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRNb250aDogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQ6IGZhbHNlLFxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbzogZmFsc2UsXG4gICAgICAgICAgICBwYXJzZWREYXRlUGFydHM6IFtdLFxuICAgICAgICAgICAgZXJhOiBudWxsLFxuICAgICAgICAgICAgbWVyaWRpZW06IG51bGwsXG4gICAgICAgICAgICByZmMyODIyOiBmYWxzZSxcbiAgICAgICAgICAgIHdlZWtkYXlNaXNtYXRjaDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9wZjtcbiAgICB9XG5cbiAgICB2YXIgc29tZTtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLnNvbWUpIHtcbiAgICAgICAgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbWUgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgICAgICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsZW4gPSB0Lmxlbmd0aCA+Pj4gMCxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgICAgICB2YXIgZmxhZ3MgPSBudWxsLFxuICAgICAgICAgICAgcGFyc2VkUGFydHMgPSBmYWxzZSxcbiAgICAgICAgICAgIGlzTm93VmFsaWQgPSBtLl9kICYmICFpc05hTihtLl9kLmdldFRpbWUoKSk7XG4gICAgICAgIGlmIChpc05vd1ZhbGlkKSB7XG4gICAgICAgICAgICBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcbiAgICAgICAgICAgIHBhcnNlZFBhcnRzID0gc29tZS5jYWxsKGZsYWdzLnBhcnNlZERhdGVQYXJ0cywgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc05vd1ZhbGlkID1cbiAgICAgICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEVyYSAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkTW9udGggJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3Mud2Vla2RheU1pc21hdGNoICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLm51bGxJbnB1dCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgICAgICghZmxhZ3MubWVyaWRpZW0gfHwgKGZsYWdzLm1lcmlkaWVtICYmIHBhcnNlZFBhcnRzKSk7XG4gICAgICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgaXNOb3dWYWxpZCA9XG4gICAgICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmJpZ0hvdXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmlzRnJvemVuID09IG51bGwgfHwgIU9iamVjdC5pc0Zyb3plbihtKSkge1xuICAgICAgICAgICAgbS5faXNWYWxpZCA9IGlzTm93VmFsaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNOb3dWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5faXNWYWxpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkKGZsYWdzKSB7XG4gICAgICAgIHZhciBtID0gY3JlYXRlVVRDKE5hTik7XG4gICAgICAgIGlmIChmbGFncyAhPSBudWxsKSB7XG4gICAgICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIC8vIFBsdWdpbnMgdGhhdCBhZGQgcHJvcGVydGllcyBzaG91bGQgYWxzbyBhZGQgdGhlIGtleSBoZXJlIChudWxsIHZhbHVlKSxcbiAgICAvLyBzbyB3ZSBjYW4gcHJvcGVybHkgY2xvbmUgb3Vyc2VsdmVzLlxuICAgIHZhciBtb21lbnRQcm9wZXJ0aWVzID0gKGhvb2tzLm1vbWVudFByb3BlcnRpZXMgPSBbXSksXG4gICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGNvcHlDb25maWcodG8sIGZyb20pIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBwcm9wLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgbW9tZW50UHJvcGVydGllc0xlbiA9IG1vbWVudFByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNBTW9tZW50T2JqZWN0KSkge1xuICAgICAgICAgICAgdG8uX2lzQU1vbWVudE9iamVjdCA9IGZyb20uX2lzQU1vbWVudE9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2kpKSB7XG4gICAgICAgICAgICB0by5faSA9IGZyb20uX2k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9mKSkge1xuICAgICAgICAgICAgdG8uX2YgPSBmcm9tLl9mO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbCkpIHtcbiAgICAgICAgICAgIHRvLl9sID0gZnJvbS5fbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3N0cmljdCkpIHtcbiAgICAgICAgICAgIHRvLl9zdHJpY3QgPSBmcm9tLl9zdHJpY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl90em0pKSB7XG4gICAgICAgICAgICB0by5fdHptID0gZnJvbS5fdHptO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNVVEMpKSB7XG4gICAgICAgICAgICB0by5faXNVVEMgPSBmcm9tLl9pc1VUQztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX29mZnNldCkpIHtcbiAgICAgICAgICAgIHRvLl9vZmZzZXQgPSBmcm9tLl9vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9wZikpIHtcbiAgICAgICAgICAgIHRvLl9wZiA9IGdldFBhcnNpbmdGbGFncyhmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2xvY2FsZSkpIHtcbiAgICAgICAgICAgIHRvLl9sb2NhbGUgPSBmcm9tLl9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9tZW50UHJvcGVydGllc0xlbiA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb21lbnRQcm9wZXJ0aWVzTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gbW9tZW50UHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICB2YWwgPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG87XG4gICAgfVxuXG4gICAgLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnKSB7XG4gICAgICAgIGNvcHlDb25maWcodGhpcywgY29uZmlnKTtcbiAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5fZCAhPSBudWxsID8gY29uZmlnLl9kLmdldFRpbWUoKSA6IE5hTik7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHVwZGF0ZU9mZnNldCBjcmVhdGVzIG5ldyBtb21lbnRcbiAgICAgICAgLy8gb2JqZWN0cy5cbiAgICAgICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTW9tZW50KG9iaikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGhvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgY29uc29sZS53YXJuXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nOiAnICsgbXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZShtc2csIGZuKSB7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG51bGwsIG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXJnLFxuICAgICAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGFyZ0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyArPSAnXFxuWycgKyBpICsgJ10gJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIGFyZ3VtZW50c1swXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGFyZ3VtZW50c1swXSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmcgKz0ga2V5ICsgJzogJyArIGFyZ3VtZW50c1swXVtrZXldICsgJywgJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoMCwgLTIpOyAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICAgICAgIG1zZyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxuQXJndW1lbnRzOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcigpLnN0YWNrXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBmbik7XG4gICAgfVxuXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xuICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihuYW1lLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgICAgICBkZXByZWNhdGlvbnNbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XG4gICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICh0eXBlb2YgRnVuY3Rpb24gIT09ICd1bmRlZmluZWQnICYmIGlucHV0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KGNvbmZpZykge1xuICAgICAgICB2YXIgcHJvcCwgaTtcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoY29uZmlnLCBpKSkge1xuICAgICAgICAgICAgICAgIHByb3AgPSBjb25maWdbaV07XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX2RheU9mTW9udGhPcmRpbmFsUGFyc2UuXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBcIm9yZGluYWxQYXJzZVwiIGZhbGxiYWNrIGluIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICAgICAgdGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgKHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2Uuc291cmNlIHx8IHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UpICtcbiAgICAgICAgICAgICAgICAnfCcgK1xuICAgICAgICAgICAgICAgIC9cXGR7MSwyfS8uc291cmNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY2hpbGRDb25maWcpIHtcbiAgICAgICAgdmFyIHJlcyA9IGV4dGVuZCh7fSwgcGFyZW50Q29uZmlnKSxcbiAgICAgICAgICAgIHByb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBjaGlsZENvbmZpZykge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoY2hpbGRDb25maWcsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkgJiYgaXNPYmplY3QoY2hpbGRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBwYXJlbnRDb25maWdbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBjaGlsZENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZENvbmZpZ1twcm9wXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IGNoaWxkQ29uZmlnW3Byb3BdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXNbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAocHJvcCBpbiBwYXJlbnRDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBoYXNPd25Qcm9wKHBhcmVudENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICAhaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICBpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgY2hhbmdlcyB0byBwcm9wZXJ0aWVzIGRvbid0IG1vZGlmeSBwYXJlbnQgY29uZmlnXG4gICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gZXh0ZW5kKHt9LCByZXNbcHJvcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5cztcblxuICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIHJlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKG9iaiwgaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdENhbGVuZGFyID0ge1xuICAgICAgICBzYW1lRGF5OiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgICAgIG5leHREYXk6ICdbVG9tb3Jyb3cgYXRdIExUJyxcbiAgICAgICAgbmV4dFdlZWs6ICdkZGRkIFthdF0gTFQnLFxuICAgICAgICBsYXN0RGF5OiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgICAgICBsYXN0V2VlazogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxuICAgICAgICBzYW1lRWxzZTogJ0wnLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjYWxlbmRhcihrZXksIG1vbSwgbm93KSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9jYWxlbmRhcltrZXldIHx8IHRoaXMuX2NhbGVuZGFyWydzYW1lRWxzZSddO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihvdXRwdXQpID8gb3V0cHV0LmNhbGwobW9tLCBub3cpIDogb3V0cHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcbiAgICAgICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgICAgIHplcm9zVG9GaWxsID0gdGFyZ2V0TGVuZ3RoIC0gYWJzTnVtYmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xuICAgICAgICAgICAgTWF0aC5wb3coMTAsIE1hdGgubWF4KDAsIHplcm9zVG9GaWxsKSkudG9TdHJpbmcoKS5zdWJzdHIoMSkgK1xuICAgICAgICAgICAgYWJzTnVtYmVyXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdHRpbmdUb2tlbnMgPVxuICAgICAgICAgICAgLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xOezEsNX18WVlZWVlZfFlZWVlZfFlZWVl8WVl8eXsyLDR9fHlvP3xnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xraz98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZyxcbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZyxcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zID0ge30sXG4gICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XG5cbiAgICAvLyB0b2tlbjogICAgJ00nXG4gICAgLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxuICAgIC8vIG9yZGluYWw6ICAnTW8nXG4gICAgLy8gY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgdGhpcy5tb250aCgpICsgMSB9XG4gICAgZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4odG9rZW4sIHBhZGRlZCwgb3JkaW5hbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6ZXJvRmlsbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHBhZGRlZFsxXSwgcGFkZGVkWzJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGluYWwpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKFxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgICAgIHRva2VuXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgICAgICBpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGlzRnVuY3Rpb24oYXJyYXlbaV0pXG4gICAgICAgICAgICAgICAgICAgID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdClcbiAgICAgICAgICAgICAgICAgICAgOiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPVxuICAgICAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gfHwgbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xuICAgICAgICB2YXIgaSA9IDU7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2VucyxcbiAgICAgICAgICAgICAgICByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcbiAgICAgICAgTFRTOiAnaDptbTpzcyBBJyxcbiAgICAgICAgTFQ6ICdoOm1tIEEnLFxuICAgICAgICBMOiAnTU0vREQvWVlZWScsXG4gICAgICAgIExMOiAnTU1NTSBELCBZWVlZJyxcbiAgICAgICAgTExMOiAnTU1NTSBELCBZWVlZIGg6bW0gQScsXG4gICAgICAgIExMTEw6ICdkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9uZ0RhdGVGb3JtYXQoa2V5KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldLFxuICAgICAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXJcbiAgICAgICAgICAgIC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAodG9rKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0b2sgPT09ICdNTU1NJyB8fFxuICAgICAgICAgICAgICAgICAgICB0b2sgPT09ICdNTScgfHxcbiAgICAgICAgICAgICAgICAgICAgdG9rID09PSAnREQnIHx8XG4gICAgICAgICAgICAgICAgICAgIHRvayA9PT0gJ2RkZGQnXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2suc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0b2s7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0SW52YWxpZERhdGUgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIGZ1bmN0aW9uIGludmFsaWREYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJyxcbiAgICAgICAgZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xuXG4gICAgZnVuY3Rpb24gb3JkaW5hbChudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0UmVsYXRpdmVUaW1lID0ge1xuICAgICAgICBmdXR1cmU6ICdpbiAlcycsXG4gICAgICAgIHBhc3Q6ICclcyBhZ28nLFxuICAgICAgICBzOiAnYSBmZXcgc2Vjb25kcycsXG4gICAgICAgIHNzOiAnJWQgc2Vjb25kcycsXG4gICAgICAgIG06ICdhIG1pbnV0ZScsXG4gICAgICAgIG1tOiAnJWQgbWludXRlcycsXG4gICAgICAgIGg6ICdhbiBob3VyJyxcbiAgICAgICAgaGg6ICclZCBob3VycycsXG4gICAgICAgIGQ6ICdhIGRheScsXG4gICAgICAgIGRkOiAnJWQgZGF5cycsXG4gICAgICAgIHc6ICdhIHdlZWsnLFxuICAgICAgICB3dzogJyVkIHdlZWtzJyxcbiAgICAgICAgTTogJ2EgbW9udGgnLFxuICAgICAgICBNTTogJyVkIG1vbnRocycsXG4gICAgICAgIHk6ICdhIHllYXInLFxuICAgICAgICB5eTogJyVkIHllYXJzJyxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVsYXRpdmVUaW1lKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW3N0cmluZ107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dClcbiAgICAgICAgICAgID8gb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSlcbiAgICAgICAgICAgIDogb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZShkaWZmLCBvdXRwdXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX3JlbGF0aXZlVGltZVtkaWZmID4gMCA/ICdmdXR1cmUnIDogJ3Bhc3QnXTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG4gICAgfVxuXG4gICAgdmFyIGFsaWFzZXMgPSB7XG4gICAgICAgIEQ6ICdkYXRlJyxcbiAgICAgICAgZGF0ZXM6ICdkYXRlJyxcbiAgICAgICAgZGF0ZTogJ2RhdGUnLFxuICAgICAgICBkOiAnZGF5JyxcbiAgICAgICAgZGF5czogJ2RheScsXG4gICAgICAgIGRheTogJ2RheScsXG4gICAgICAgIGU6ICd3ZWVrZGF5JyxcbiAgICAgICAgd2Vla2RheXM6ICd3ZWVrZGF5JyxcbiAgICAgICAgd2Vla2RheTogJ3dlZWtkYXknLFxuICAgICAgICBFOiAnaXNvV2Vla2RheScsXG4gICAgICAgIGlzb3dlZWtkYXlzOiAnaXNvV2Vla2RheScsXG4gICAgICAgIGlzb3dlZWtkYXk6ICdpc29XZWVrZGF5JyxcbiAgICAgICAgREREOiAnZGF5T2ZZZWFyJyxcbiAgICAgICAgZGF5b2Z5ZWFyczogJ2RheU9mWWVhcicsXG4gICAgICAgIGRheW9meWVhcjogJ2RheU9mWWVhcicsXG4gICAgICAgIGg6ICdob3VyJyxcbiAgICAgICAgaG91cnM6ICdob3VyJyxcbiAgICAgICAgaG91cjogJ2hvdXInLFxuICAgICAgICBtczogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmQnLFxuICAgICAgICBtaWxsaXNlY29uZDogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgbTogJ21pbnV0ZScsXG4gICAgICAgIG1pbnV0ZXM6ICdtaW51dGUnLFxuICAgICAgICBtaW51dGU6ICdtaW51dGUnLFxuICAgICAgICBNOiAnbW9udGgnLFxuICAgICAgICBtb250aHM6ICdtb250aCcsXG4gICAgICAgIG1vbnRoOiAnbW9udGgnLFxuICAgICAgICBROiAncXVhcnRlcicsXG4gICAgICAgIHF1YXJ0ZXJzOiAncXVhcnRlcicsXG4gICAgICAgIHF1YXJ0ZXI6ICdxdWFydGVyJyxcbiAgICAgICAgczogJ3NlY29uZCcsXG4gICAgICAgIHNlY29uZHM6ICdzZWNvbmQnLFxuICAgICAgICBzZWNvbmQ6ICdzZWNvbmQnLFxuICAgICAgICBnZzogJ3dlZWtZZWFyJyxcbiAgICAgICAgd2Vla3llYXJzOiAnd2Vla1llYXInLFxuICAgICAgICB3ZWVreWVhcjogJ3dlZWtZZWFyJyxcbiAgICAgICAgR0c6ICdpc29XZWVrWWVhcicsXG4gICAgICAgIGlzb3dlZWt5ZWFyczogJ2lzb1dlZWtZZWFyJyxcbiAgICAgICAgaXNvd2Vla3llYXI6ICdpc29XZWVrWWVhcicsXG4gICAgICAgIHc6ICd3ZWVrJyxcbiAgICAgICAgd2Vla3M6ICd3ZWVrJyxcbiAgICAgICAgd2VlazogJ3dlZWsnLFxuICAgICAgICBXOiAnaXNvV2VlaycsXG4gICAgICAgIGlzb3dlZWtzOiAnaXNvV2VlaycsXG4gICAgICAgIGlzb3dlZWs6ICdpc29XZWVrJyxcbiAgICAgICAgeTogJ3llYXInLFxuICAgICAgICB5ZWFyczogJ3llYXInLFxuICAgICAgICB5ZWFyOiAneWVhcicsXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIHZhciBwcmlvcml0aWVzID0ge1xuICAgICAgICBkYXRlOiA5LFxuICAgICAgICBkYXk6IDExLFxuICAgICAgICB3ZWVrZGF5OiAxMSxcbiAgICAgICAgaXNvV2Vla2RheTogMTEsXG4gICAgICAgIGRheU9mWWVhcjogNCxcbiAgICAgICAgaG91cjogMTMsXG4gICAgICAgIG1pbGxpc2Vjb25kOiAxNixcbiAgICAgICAgbWludXRlOiAxNCxcbiAgICAgICAgbW9udGg6IDgsXG4gICAgICAgIHF1YXJ0ZXI6IDcsXG4gICAgICAgIHNlY29uZDogMTUsXG4gICAgICAgIHdlZWtZZWFyOiAxLFxuICAgICAgICBpc29XZWVrWWVhcjogMSxcbiAgICAgICAgd2VlazogNSxcbiAgICAgICAgaXNvV2VlazogNSxcbiAgICAgICAgeWVhcjogMSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0c09iaikge1xuICAgICAgICB2YXIgdW5pdHMgPSBbXSxcbiAgICAgICAgICAgIHU7XG4gICAgICAgIGZvciAodSBpbiB1bml0c09iaikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AodW5pdHNPYmosIHUpKSB7XG4gICAgICAgICAgICAgICAgdW5pdHMucHVzaCh7IHVuaXQ6IHUsIHByaW9yaXR5OiBwcmlvcml0aWVzW3VdIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHVuaXRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1bml0cztcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2gxID0gL1xcZC8sIC8vICAgICAgIDAgLSA5XG4gICAgICAgIG1hdGNoMiA9IC9cXGRcXGQvLCAvLyAgICAgIDAwIC0gOTlcbiAgICAgICAgbWF0Y2gzID0gL1xcZHszfS8sIC8vICAgICAwMDAgLSA5OTlcbiAgICAgICAgbWF0Y2g0ID0gL1xcZHs0fS8sIC8vICAgIDAwMDAgLSA5OTk5XG4gICAgICAgIG1hdGNoNiA9IC9bKy1dP1xcZHs2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8yID0gL1xcZFxcZD8vLCAvLyAgICAgICAwIC0gOTlcbiAgICAgICAgbWF0Y2gzdG80ID0gL1xcZFxcZFxcZFxcZD8vLCAvLyAgICAgOTk5IC0gOTk5OVxuICAgICAgICBtYXRjaDV0bzYgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy8sIC8vICAgOTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8zID0gL1xcZHsxLDN9LywgLy8gICAgICAgMCAtIDk5OVxuICAgICAgICBtYXRjaDF0bzQgPSAvXFxkezEsNH0vLCAvLyAgICAgICAwIC0gOTk5OVxuICAgICAgICBtYXRjaDF0bzYgPSAvWystXT9cXGR7MSw2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2hVbnNpZ25lZCA9IC9cXGQrLywgLy8gICAgICAgMCAtIGluZlxuICAgICAgICBtYXRjaFNpZ25lZCA9IC9bKy1dP1xcZCsvLCAvLyAgICAtaW5mIC0gaW5mXG4gICAgICAgIG1hdGNoT2Zmc2V0ID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpLCAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcbiAgICAgICAgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpLCAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgICAgICBtYXRjaFRpbWVzdGFtcCA9IC9bKy1dP1xcZCsoXFwuXFxkezEsM30pPy8sIC8vIDEyMzQ1Njc4OSAxMjM0NTY3ODkuMTIzXG4gICAgICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgICAgICAvLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXG4gICAgICAgIG1hdGNoV29yZCA9XG4gICAgICAgICAgICAvWzAtOV17MCwyNTZ9WydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGMDdcXHVGRjEwLVxcdUZGRUZdezEsMjU2fXxbXFx1MDYwMC1cXHUwNkZGXFwvXXsxLDI1Nn0oXFxzKj9bXFx1MDYwMC1cXHUwNkZGXXsxLDI1Nn0pezEsMn0vaSxcbiAgICAgICAgbWF0Y2gxdG8yTm9MZWFkaW5nWmVybyA9IC9eWzEtOV1cXGQ/LywgLy8gICAgICAgICAxLTk5XG4gICAgICAgIG1hdGNoMXRvMkhhc1plcm8gPSAvXihbMS05XVxcZHxcXGQpLywgLy8gICAgICAgICAgIDAtOTlcbiAgICAgICAgcmVnZXhlcztcblxuICAgIHJlZ2V4ZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4odG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xuICAgICAgICByZWdleGVzW3Rva2VuXSA9IGlzRnVuY3Rpb24ocmVnZXgpXG4gICAgICAgICAgICA/IHJlZ2V4XG4gICAgICAgICAgICA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4ID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICAgICAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKFxuICAgICAgICAgICAgc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdcXFxcJywgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzRmxvb3IobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICAvLyAtMCAtPiAwXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcikgfHwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XG4gICAgICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgIT09IDAgJiYgaXNGaW5pdGUoY29lcmNlZE51bWJlcikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gYWJzRmxvb3IoY29lcmNlZE51bWJlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbih0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBmdW5jID0gY2FsbGJhY2ssXG4gICAgICAgICAgICB0b2tlbkxlbjtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5MZW4gPSB0b2tlbi5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbkxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfVxuXG4gICAgdmFyIFlFQVIgPSAwLFxuICAgICAgICBNT05USCA9IDEsXG4gICAgICAgIERBVEUgPSAyLFxuICAgICAgICBIT1VSID0gMyxcbiAgICAgICAgTUlOVVRFID0gNCxcbiAgICAgICAgU0VDT05EID0gNSxcbiAgICAgICAgTUlMTElTRUNPTkQgPSA2LFxuICAgICAgICBXRUVLID0gNyxcbiAgICAgICAgV0VFS0RBWSA9IDg7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnllYXIoKTtcbiAgICAgICAgcmV0dXJuIHkgPD0gOTk5OSA/IHplcm9GaWxsKHksIDQpIDogJysnICsgeTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCA0XSwgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZJywgNV0sIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWVknLCA2LCB0cnVlXSwgMCwgJ3llYXInKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1knLCBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWVknLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWScsIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID1cbiAgICAgICAgICAgIGlucHV0Lmxlbmd0aCA9PT0gMiA/IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHllYXIpID8gMzY2IDogMzY1O1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICBob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xuICAgIH07XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgdHJ1ZSk7XG5cbiAgICBmdW5jdGlvbiBnZXRJc0xlYXBZZWFyKCkge1xuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih0aGlzLnllYXIoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldFNldCh1bml0LCBrZWVwVGltZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNldCQxKHRoaXMsIHVuaXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KHRoaXMsIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldChtb20sIHVuaXQpIHtcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGQgPSBtb20uX2QsXG4gICAgICAgICAgICBpc1VUQyA9IG1vbS5faXNVVEM7XG5cbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdNaWxsaXNlY29uZHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc1VUQyA/IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgOiBkLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgY2FzZSAnU2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVVRDID8gZC5nZXRVVENTZWNvbmRzKCkgOiBkLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgIGNhc2UgJ01pbnV0ZXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc1VUQyA/IGQuZ2V0VVRDTWludXRlcygpIDogZC5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICBjYXNlICdIb3Vycyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVVRDID8gZC5nZXRVVENIb3VycygpIDogZC5nZXRIb3VycygpO1xuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVVRDID8gZC5nZXRVVENEYXRlKCkgOiBkLmdldERhdGUoKTtcbiAgICAgICAgICAgIGNhc2UgJ0RheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVVRDID8gZC5nZXRVVENEYXkoKSA6IGQuZ2V0RGF5KCk7XG4gICAgICAgICAgICBjYXNlICdNb250aCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVVRDID8gZC5nZXRVVENNb250aCgpIDogZC5nZXRNb250aCgpO1xuICAgICAgICAgICAgY2FzZSAnRnVsbFllYXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc1VUQyA/IGQuZ2V0VVRDRnVsbFllYXIoKSA6IGQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTjsgLy8gSnVzdCBpbiBjYXNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQkMShtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgICAgIHZhciBkLCBpc1VUQywgeWVhciwgbW9udGgsIGRhdGU7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpIHx8IGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZCA9IG1vbS5fZDtcbiAgICAgICAgaXNVVEMgPSBtb20uX2lzVVRDO1xuXG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAnTWlsbGlzZWNvbmRzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAoaXNVVENcbiAgICAgICAgICAgICAgICAgICAgPyBkLnNldFVUQ01pbGxpc2Vjb25kcyh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgOiBkLnNldE1pbGxpc2Vjb25kcyh2YWx1ZSkpO1xuICAgICAgICAgICAgY2FzZSAnU2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKGlzVVRDID8gZC5zZXRVVENTZWNvbmRzKHZhbHVlKSA6IGQuc2V0U2Vjb25kcyh2YWx1ZSkpO1xuICAgICAgICAgICAgY2FzZSAnTWludXRlcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKGlzVVRDID8gZC5zZXRVVENNaW51dGVzKHZhbHVlKSA6IGQuc2V0TWludXRlcyh2YWx1ZSkpO1xuICAgICAgICAgICAgY2FzZSAnSG91cnMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIChpc1VUQyA/IGQuc2V0VVRDSG91cnModmFsdWUpIDogZC5zZXRIb3Vycyh2YWx1ZSkpO1xuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKGlzVVRDID8gZC5zZXRVVENEYXRlKHZhbHVlKSA6IGQuc2V0RGF0ZSh2YWx1ZSkpO1xuICAgICAgICAgICAgLy8gY2FzZSAnRGF5JzogLy8gTm90IHJlYWxcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB2b2lkIChpc1VUQyA/IGQuc2V0VVRDRGF5KHZhbHVlKSA6IGQuc2V0RGF5KHZhbHVlKSk7XG4gICAgICAgICAgICAvLyBjYXNlICdNb250aCc6IC8vIE5vdCB1c2VkIGJlY2F1c2Ugd2UgbmVlZCB0byBwYXNzIHR3byB2YXJpYWJsZXNcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdm9pZCAoaXNVVEMgPyBkLnNldFVUQ01vbnRoKHZhbHVlKSA6IGQuc2V0TW9udGgodmFsdWUpKTtcbiAgICAgICAgICAgIGNhc2UgJ0Z1bGxZZWFyJzpcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gU2VlIGJlbG93IC4uLlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIEp1c3QgaW4gY2FzZVxuICAgICAgICB9XG5cbiAgICAgICAgeWVhciA9IHZhbHVlO1xuICAgICAgICBtb250aCA9IG1vbS5tb250aCgpO1xuICAgICAgICBkYXRlID0gbW9tLmRhdGUoKTtcbiAgICAgICAgZGF0ZSA9IGRhdGUgPT09IDI5ICYmIG1vbnRoID09PSAxICYmICFpc0xlYXBZZWFyKHllYXIpID8gMjggOiBkYXRlO1xuICAgICAgICB2b2lkIChpc1VUQ1xuICAgICAgICAgICAgPyBkLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXRlKVxuICAgICAgICAgICAgOiBkLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXRlKSk7XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gc3RyaW5nR2V0KHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1NldCh1bml0cywgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplT2JqZWN0VW5pdHModW5pdHMpO1xuICAgICAgICAgICAgdmFyIHByaW9yaXRpemVkID0gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0cyksXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICBwcmlvcml0aXplZExlbiA9IHByaW9yaXRpemVkLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcmlvcml0aXplZExlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcmlvcml0aXplZFtpXS51bml0XSh1bml0c1twcmlvcml0aXplZFtpXS51bml0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9kKG4sIHgpIHtcbiAgICAgICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xuICAgIH1cblxuICAgIHZhciBpbmRleE9mO1xuXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIC8vIEkga25vd1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xuICAgICAgICB5ZWFyICs9IChtb250aCAtIG1vZE1vbnRoKSAvIDEyO1xuICAgICAgICByZXR1cm4gbW9kTW9udGggPT09IDFcbiAgICAgICAgICAgID8gaXNMZWFwWWVhcih5ZWFyKVxuICAgICAgICAgICAgICAgID8gMjlcbiAgICAgICAgICAgICAgICA6IDI4XG4gICAgICAgICAgICA6IDMxIC0gKChtb2RNb250aCAlIDcpICUgMik7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdNJywgbWF0Y2gxdG8yLCBtYXRjaDF0bzJOb0xlYWRpbmdaZXJvKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID1cbiAgICAgICAgICAgICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdChcbiAgICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9XG4gICAgICAgICAgICAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyksXG4gICAgICAgIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKStNTU1NPy8sXG4gICAgICAgIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkLFxuICAgICAgICBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKVxuICAgICAgICAgICAgICAgID8gdGhpcy5fbW9udGhzXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNbJ3N0YW5kYWxvbmUnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpXG4gICAgICAgICAgICA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1tcbiAgICAgICAgICAgICAgICAgICh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgICAgPyAnZm9ybWF0J1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3N0YW5kYWxvbmUnXG4gICAgICAgICAgICAgIF1bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydChtLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHNTaG9ydClcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1Nob3J0XG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNTaG9ydFsnc3RhbmRhbG9uZSddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KVxuICAgICAgICAgICAgPyB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1Nob3J0W1xuICAgICAgICAgICAgICAgICAgTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RyaWN0UGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgbW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgICAgIC8vIHNlZSBzb3J0aW5nIGluIGNvbXB1dGVNb250aHNQYXJzZVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NTScgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1vbnRoID0gdmFsdWUsXG4gICAgICAgICAgICBkYXRlID0gbW9tLmRhdGUoKTtcblxuICAgICAgICBkYXRlID0gZGF0ZSA8IDI5ID8gZGF0ZSA6IE1hdGgubWluKGRhdGUsIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIG1vbnRoKSk7XG4gICAgICAgIHZvaWQgKG1vbS5faXNVVENcbiAgICAgICAgICAgID8gbW9tLl9kLnNldFVUQ01vbnRoKG1vbnRoLCBkYXRlKVxuICAgICAgICAgICAgOiBtb20uX2Quc2V0TW9udGgobW9udGgsIGRhdGUpKTtcbiAgICAgICAgcmV0dXJuIG1vbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRNb250aCh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0TW9udGgodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0KHRoaXMsICdNb250aCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoKSB7XG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNTaG9ydFJlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdFxuICAgICAgICAgICAgICAgID8gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleFxuICAgICAgICAgICAgICAgIDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoc1JlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IGRlZmF1bHRNb250aHNSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdFxuICAgICAgICAgICAgICAgID8gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlKCkge1xuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIGxvbmdQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgc2hvcnRQLFxuICAgICAgICAgICAgbG9uZ1A7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgc2hvcnRQID0gcmVnZXhFc2NhcGUodGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgICAgICAgICBsb25nUCA9IHJlZ2V4RXNjYXBlKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRQKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaChsb25nUCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGxvbmdQKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRQKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuXG4gICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsXG4gICAgICAgICAgICAnaSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vIGNhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTgxMzQ4XG4gICAgICAgIHZhciBkYXRlO1xuICAgICAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHkgKyA0MDAsIG0sIGQsIGgsIE0sIHMsIG1zKTtcbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlKHkpIHtcbiAgICAgICAgdmFyIGRhdGUsIGFyZ3M7XG4gICAgICAgIC8vIHRoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICBhcmdzWzBdID0geSArIDQwMDtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmdzKSk7XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcbiAgICAgICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcbiAgICAgICAgICAgIHJlc1llYXIsXG4gICAgICAgICAgICByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXG4gICAgICAgICAgICByZXNXZWVrLFxuICAgICAgICAgICAgcmVzWWVhcjtcblxuICAgICAgICBpZiAod2VlayA8IDEpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrOiByZXNXZWVrLFxuICAgICAgICAgICAgeWVhcjogcmVzWWVhcixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3cnLCBtYXRjaDF0bzIsIG1hdGNoMXRvMk5vTGVhZGluZ1plcm8pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1cnLCBtYXRjaDF0bzIsIG1hdGNoMXRvMk5vTGVhZGluZ1plcm8pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1dXJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oXG4gICAgICAgIFsndycsICd3dycsICdXJywgJ1dXJ10sXG4gICAgICAgIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMSldID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsobW9tKSB7XG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbSwgdGhpcy5fd2Vlay5kb3csIHRoaXMuX3dlZWsuZG95KS53ZWVrO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2VlayA9IHtcbiAgICAgICAgZG93OiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgZG95OiA2LCAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA2dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZlllYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWsgPSB3ZWVrT2ZZZWFyKHRoaXMsIDEsIDQpLndlZWs7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5cyh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2UnLCAwLCAwLCAnd2Vla2RheScpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c01pblJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG4gICAgYWRkUmVnZXhUb2tlbignZGRkZCcsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KSAlIDcgfHwgNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNOYU4oaW5wdXQpID8gbnVsbCA6IGlucHV0O1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcbiAgICBmdW5jdGlvbiBzaGlmdFdlZWtkYXlzKHdzLCBuKSB7XG4gICAgICAgIHJldHVybiB3cy5zbGljZShuLCA3KS5jb25jYXQod3Muc2xpY2UoMCwgbikpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPVxuICAgICAgICAgICAgJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpLFxuICAgICAgICBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKSxcbiAgICAgICAgZGVmYXVsdFdlZWtkYXlzUmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMobSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciB3ZWVrZGF5cyA9IGlzQXJyYXkodGhpcy5fd2Vla2RheXMpXG4gICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzXG4gICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzW1xuICAgICAgICAgICAgICAgICAgbSAmJiBtICE9PSB0cnVlICYmIHRoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2Zvcm1hdCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzaGlmdFdlZWtkYXlzKHdlZWtkYXlzLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgICA/IHdlZWtkYXlzW20uZGF5KCldXG4gICAgICAgICAgICAgIDogd2Vla2RheXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNTaG9ydChtKSB7XG4gICAgICAgIHJldHVybiBtID09PSB0cnVlXG4gICAgICAgICAgICA/IHNoaWZ0V2Vla2RheXModGhpcy5fd2Vla2RheXNTaG9ydCwgdGhpcy5fd2Vlay5kb3cpXG4gICAgICAgICAgICA6IG1cbiAgICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldXG4gICAgICAgICAgICAgIDogdGhpcy5fd2Vla2RheXNTaG9ydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbihtKSB7XG4gICAgICAgIHJldHVybiBtID09PSB0cnVlXG4gICAgICAgICAgICA/IHNoaWZ0V2Vla2RheXModGhpcy5fd2Vla2RheXNNaW4sIHRoaXMuX3dlZWsuZG93KVxuICAgICAgICAgICAgOiBtXG4gICAgICAgICAgICAgID8gdGhpcy5fd2Vla2RheXNNaW5bbS5kYXkoKV1cbiAgICAgICAgICAgICAgOiB0aGlzLl93ZWVrZGF5c01pbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTdHJpY3RQYXJzZSQxKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7ICsraSkge1xuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihcbiAgICAgICAgICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2Uod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZSQxLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArXG4gICAgICAgICAgICAgICAgICAgICd8XicgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICAnfF4nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdHJpY3QgJiZcbiAgICAgICAgICAgICAgICBmb3JtYXQgPT09ICdkZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHN0cmljdCAmJlxuICAgICAgICAgICAgICAgIGZvcm1hdCA9PT0gJ2RkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF5ID0gZ2V0KHRoaXMsICdEYXknKTtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJlaGF2ZXMgdGhlIHNhbWUgYXMgbW9tZW50I2RheSBleGNlcHRcbiAgICAgICAgLy8gYXMgYSBnZXR0ZXIsIHJldHVybnMgNyBpbnN0ZWFkIG9mIDAgKDEtNyByYW5nZSBpbnN0ZWFkIG9mIDAtNilcbiAgICAgICAgLy8gYXMgYSBzZXR0ZXIsIHN1bmRheSBzaG91bGQgYmVsb25nIHRvIHRoZSBwcmV2aW91cyB3ZWVrLlxuXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IHBhcnNlSXNvV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF5KHRoaXMuZGF5KCkgJSA3ID8gd2Vla2RheSA6IHdlZWtkYXkgLSA3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRheSgpIHx8IDc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1JlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdFxuICAgICAgICAgICAgICAgID8gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleFxuICAgICAgICAgICAgICAgIDogdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleFxuICAgICAgICAgICAgICAgIDogdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla2RheXNNaW5SZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNNaW5SZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlV2Vla2RheXNQYXJzZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pblBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgc2hvcnRQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIGxvbmdQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbWlucCxcbiAgICAgICAgICAgIHNob3J0cCxcbiAgICAgICAgICAgIGxvbmdwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIG1pbnAgPSByZWdleEVzY2FwZSh0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpKTtcbiAgICAgICAgICAgIHNob3J0cCA9IHJlZ2V4RXNjYXBlKHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSk7XG4gICAgICAgICAgICBsb25ncCA9IHJlZ2V4RXNjYXBlKHRoaXMud2Vla2RheXMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWluUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChtaW5wKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgICAgIG1pblBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcblxuICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcblxuICAgICAgICB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBtaW5QaWVjZXMuam9pbignfCcpICsgJyknLFxuICAgICAgICAgICAgJ2knXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gaEZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSAlIDEyIHx8IDEyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGtGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgfHwgMjQ7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0gnLCBbJ0hIJywgMl0sIDAsICdob3VyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGhGb3JtYXQpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdrJywgWydraycsIDJdLCAwLCBrRm9ybWF0KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdobW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignaG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAnJyArXG4gICAgICAgICAgICBoRm9ybWF0LmFwcGx5KHRoaXMpICtcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMilcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICcnICtcbiAgICAgICAgICAgIHRoaXMuaG91cnMoKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbSh0b2tlbiwgbG93ZXJjYXNlKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0oXG4gICAgICAgICAgICAgICAgdGhpcy5ob3VycygpLFxuICAgICAgICAgICAgICAgIHRoaXMubWludXRlcygpLFxuICAgICAgICAgICAgICAgIGxvd2VyY2FzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWVyaWRpZW0oJ2EnLCB0cnVlKTtcbiAgICBtZXJpZGllbSgnQScsIGZhbHNlKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGZ1bmN0aW9uIG1hdGNoTWVyaWRpZW0oaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xuICAgIH1cblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2EnLCBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdBJywgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignSCcsIG1hdGNoMXRvMiwgbWF0Y2gxdG8ySGFzWmVybyk7XG4gICAgYWRkUmVnZXhUb2tlbignaCcsIG1hdGNoMXRvMiwgbWF0Y2gxdG8yTm9MZWFkaW5nWmVybyk7XG4gICAgYWRkUmVnZXhUb2tlbignaycsIG1hdGNoMXRvMiwgbWF0Y2gxdG8yTm9MZWFkaW5nWmVybyk7XG4gICAgYWRkUmVnZXhUb2tlbignSEgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignaGgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbigna2snLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRSZWdleFRva2VuKCdobW0nLCBtYXRjaDN0bzQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbXNzJywgbWF0Y2g1dG82KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW0nLCBtYXRjaDN0bzQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbXNzJywgbWF0Y2g1dG82KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydIJywgJ0hIJ10sIEhPVVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydrJywgJ2trJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIga0lucHV0ID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICBhcnJheVtIT1VSXSA9IGtJbnB1dCA9PT0gMjQgPyAwIDoga0lucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5faXNQbSA9IGNvbmZpZy5fbG9jYWxlLmlzUE0oaW5wdXQpO1xuICAgICAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ2gnLCAnaGgnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdobW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdobW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQsXG4gICAgICAgICAgICBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcbiAgICAgICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignSG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0LFxuICAgICAgICAgICAgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgIH0pO1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlSXNQTShpbnB1dCkge1xuICAgICAgICAvLyBJRTggUXVpcmtzIE1vZGUgJiBJRTcgU3RhbmRhcmRzIE1vZGUgZG8gbm90IGFsbG93IGFjY2Vzc2luZyBzdHJpbmdzIGxpa2UgYXJyYXlzXG4gICAgICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxuICAgICAgICByZXR1cm4gKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCc7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlID0gL1thcF1cXC4/bT9cXC4/L2ksXG4gICAgICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuICAgICAgICAvLyBzcGVjaWZpZWQgd2hpY2ggaG91ciB0aGV5IHdhbnQuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxuICAgICAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcbiAgICAgICAgLy8gdGhpcyBydWxlLlxuICAgICAgICBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgICAgIGlmIChob3VycyA+IDExKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdwbScgOiAnUE0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBiYXNlQ29uZmlnID0ge1xuICAgICAgICBjYWxlbmRhcjogZGVmYXVsdENhbGVuZGFyLFxuICAgICAgICBsb25nRGF0ZUZvcm1hdDogZGVmYXVsdExvbmdEYXRlRm9ybWF0LFxuICAgICAgICBpbnZhbGlkRGF0ZTogZGVmYXVsdEludmFsaWREYXRlLFxuICAgICAgICBvcmRpbmFsOiBkZWZhdWx0T3JkaW5hbCxcbiAgICAgICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UsXG4gICAgICAgIHJlbGF0aXZlVGltZTogZGVmYXVsdFJlbGF0aXZlVGltZSxcblxuICAgICAgICBtb250aHM6IGRlZmF1bHRMb2NhbGVNb250aHMsXG4gICAgICAgIG1vbnRoc1Nob3J0OiBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQsXG5cbiAgICAgICAgd2VlazogZGVmYXVsdExvY2FsZVdlZWssXG5cbiAgICAgICAgd2Vla2RheXM6IGRlZmF1bHRMb2NhbGVXZWVrZGF5cyxcbiAgICAgICAgd2Vla2RheXNNaW46IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbixcbiAgICAgICAgd2Vla2RheXNTaG9ydDogZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQsXG5cbiAgICAgICAgbWVyaWRpZW1QYXJzZTogZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2UsXG4gICAgfTtcblxuICAgIC8vIGludGVybmFsIHN0b3JhZ2UgZm9yIGxvY2FsZSBjb25maWcgZmlsZXNcbiAgICB2YXIgbG9jYWxlcyA9IHt9LFxuICAgICAgICBsb2NhbGVGYW1pbGllcyA9IHt9LFxuICAgICAgICBnbG9iYWxMb2NhbGU7XG5cbiAgICBmdW5jdGlvbiBjb21tb25QcmVmaXgoYXJyMSwgYXJyMikge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG1pbmwgPSBNYXRoLm1pbihhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbWlubDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5sO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xuICAgIH1cblxuICAgIC8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxuICAgIGZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xuICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIHNwbGl0O1xuXG4gICAgICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG5leHQgJiZcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5sZW5ndGggPj0gaiAmJlxuICAgICAgICAgICAgICAgICAgICBjb21tb25QcmVmaXgoc3BsaXQsIG5leHQpID49IGogLSAxXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTG9jYWxlTmFtZVNhbmUobmFtZSkge1xuICAgICAgICAvLyBQcmV2ZW50IG5hbWVzIHRoYXQgbG9vayBsaWtlIGZpbGVzeXN0ZW0gcGF0aHMsIGkuZSBjb250YWluICcvJyBvciAnXFwnXG4gICAgICAgIC8vIEVuc3VyZSBuYW1lIGlzIGF2YWlsYWJsZSBhbmQgZnVuY3Rpb24gcmV0dXJucyBib29sZWFuXG4gICAgICAgIHJldHVybiAhIShuYW1lICYmIG5hbWUubWF0Y2goJ15bXi9cXFxcXFxcXF0qJCcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGwsXG4gICAgICAgICAgICBhbGlhc2VkUmVxdWlyZTtcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgbW9kdWxlICYmXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyAmJlxuICAgICAgICAgICAgaXNMb2NhbGVOYW1lU2FuZShuYW1lKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIGFsaWFzZWRSZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgbm90IGZvdW5kIHRvIGF2b2lkIHJlcGVhdGluZyBleHBlbnNpdmUgZmlsZSByZXF1aXJlIGNhbGwgY2F1c2luZyBoaWdoIENQVVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGZpbmQgZW4tVVMsIGVuX1VTLCBlbi11cyBmb3IgZXZlcnkgZm9ybWF0IGNhbGxcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbnVsbDsgLy8gbnVsbCBtZWFucyBub3QgZm91bmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy93YXJuIHVzZXIgaWYgYXJndW1lbnRzIGFyZSBwYXNzZWQgYnV0IHRoZSBsb2NhbGUgY291bGQgbm90IGJlIHNldFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAnTG9jYWxlICcgKyBrZXkgKyAnIG5vdCBmb3VuZC4gRGlkIHlvdSBmb3JnZXQgdG8gbG9hZCBpdD8nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGUsXG4gICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoXG4gICAgICAgICAgICAgICAgICAgICdkZWZpbmVMb2NhbGVPdmVycmlkZScsXG4gICAgICAgICAgICAgICAgICAgICd1c2UgbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGVOYW1lLCBjb25maWcpIHRvIGNoYW5nZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvZGVmaW5lLWxvY2FsZS8gZm9yIG1vcmUgaW5mby4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoY29uZmlnLnBhcmVudExvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlLl9jb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbY29uZmlnLnBhcmVudExvY2FsZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUobWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY29uZmlnKSk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbGVGYW1pbGllc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lTG9jYWxlKHgubmFtZSwgeC5jb25maWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cbiAgICAgICAgICAgIC8vIGNyZWF0ZWQsIHNvIHdlIHdvbid0IGVuZCB1cCB3aXRoIHRoZSBjaGlsZCBsb2NhbGUgc2V0LlxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsZShuYW1lLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlLFxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSxcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsICYmIGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgY2hpbGQgbG9jYWxlIGluLXBsYWNlIHRvIGF2b2lkIG1lbW9yeS1sZWFrc1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KG1lcmdlQ29uZmlncyhsb2NhbGVzW25hbWVdLl9jb25maWcsIGNvbmZpZykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNRVJHRVxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbmZpZyA9IHRtcExvY2FsZS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGlmICh0bXBMb2NhbGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGVMb2NhbGUgaXMgY2FsbGVkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGFiYnIgc28gaXQgd2lsbCBoYXZlIGEgbmFtZSAoZ2V0dGVycyByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIG90aGVyd2lzZSkuXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbmV3IExvY2FsZShjb25maWcpO1xuICAgICAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBnZXRTZXRHbG9iYWxMb2NhbGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBnZXRMb2NhbGUoa2V5KSB7XG4gICAgICAgIHZhciBsb2NhbGU7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RMb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93KG0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93LFxuICAgICAgICAgICAgYSA9IG0uX2E7XG5cbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIGFbTU9OVEhdIDwgMCB8fCBhW01PTlRIXSA+IDExXG4gICAgICAgICAgICAgICAgICAgID8gTU9OVEhcbiAgICAgICAgICAgICAgICAgICAgOiBhW0RBVEVdIDwgMSB8fCBhW0RBVEVdID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pXG4gICAgICAgICAgICAgICAgICAgICAgPyBEQVRFXG4gICAgICAgICAgICAgICAgICAgICAgOiBhW0hPVVJdIDwgMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhW0hPVVJdID4gMjQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGFbSE9VUl0gPT09IDI0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYVtNSU5VVEVdICE9PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtTRUNPTkRdICE9PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gIT09IDApKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBIT1VSXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGFbTUlOVVRFXSA8IDAgfHwgYVtNSU5VVEVdID4gNTlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBNSU5VVEVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhW1NFQ09ORF0gPCAwIHx8IGFbU0VDT05EXSA+IDU5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBTRUNPTkRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBNSUxMSVNFQ09ORFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAtMTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiZcbiAgICAgICAgICAgICAgICAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla3MgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrZGF5ICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFS0RBWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICAvLyBpc28gODYwMSByZWdleFxuICAgIC8vIDAwMDAtMDAtMDAgMDAwMC1XMDAgb3IgMDAwMC1XMDAtMCArIFQgKyAwMCBvciAwMDowMCBvciAwMDowMDowMCBvciAwMDowMDowMC4wMDAgKyArMDA6MDAgb3IgKzAwMDAgb3IgKzAwKVxuICAgIHZhciBleHRlbmRlZElzb1JlZ2V4ID1cbiAgICAgICAgICAgIC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvLFxuICAgICAgICBiYXNpY0lzb1JlZ2V4ID1cbiAgICAgICAgICAgIC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSkoPzpcXGRcXGRcXGRcXGR8V1xcZFxcZFxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGR8KSkoPzooVHwgKShcXGRcXGQoPzpcXGRcXGQoPzpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoWystXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/JC8sXG4gICAgICAgIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy8sXG4gICAgICAgIGlzb0RhdGVzID0gW1xuICAgICAgICAgICAgWydZWVlZWVktTU0tREQnLCAvWystXVxcZHs2fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICAgICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkXFxkLVxcZC9dLFxuICAgICAgICAgICAgWydHR0dHLVtXXVdXJywgL1xcZHs0fS1XXFxkXFxkLywgZmFsc2VdLFxuICAgICAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXG4gICAgICAgICAgICBbJ1lZWVktTU0nLCAvXFxkezR9LVxcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWVlZTU1ERCcsIC9bKy1dXFxkezEwfS9dLFxuICAgICAgICAgICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcbiAgICAgICAgICAgIFsnR0dHR1tXXVdXRScsIC9cXGR7NH1XXFxkezN9L10sXG4gICAgICAgICAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxuICAgICAgICAgICAgWydZWVlZREREJywgL1xcZHs3fS9dLFxuICAgICAgICAgICAgWydZWVlZTU0nLCAvXFxkezZ9LywgZmFsc2VdLFxuICAgICAgICAgICAgWydZWVlZJywgL1xcZHs0fS8sIGZhbHNlXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xuICAgICAgICBpc29UaW1lcyA9IFtcbiAgICAgICAgICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgICAgIFsnSEg6bW06c3MsU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZCxcXGQrL10sXG4gICAgICAgICAgICBbJ0hIOm1tOnNzJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgICAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcbiAgICAgICAgICAgIFsnSEhtbXNzLlNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkXFwuXFxkKy9dLFxuICAgICAgICAgICAgWydISG1tc3MsU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGQsXFxkKy9dLFxuICAgICAgICAgICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXG4gICAgICAgICAgICBbJ0hIbW0nLCAvXFxkXFxkXFxkXFxkL10sXG4gICAgICAgICAgICBbJ0hIJywgL1xcZFxcZC9dLFxuICAgICAgICBdLFxuICAgICAgICBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKC0/XFxkKykvaSxcbiAgICAgICAgLy8gUkZDIDI4MjIgcmVnZXg6IEZvciBkZXRhaWxzIHNlZSBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjgyMiNzZWN0aW9uLTMuM1xuICAgICAgICByZmMyODIyID1cbiAgICAgICAgICAgIC9eKD86KE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksP1xccyk/KFxcZHsxLDJ9KVxccyhKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYylcXHMoXFxkezIsNH0pXFxzKFxcZFxcZCk6KFxcZFxcZCkoPzo6KFxcZFxcZCkpP1xccyg/OihVVHxHTVR8W0VDTVBdW1NEXVQpfChbWnpdKXwoWystXVxcZHs0fSkpJC8sXG4gICAgICAgIG9ic09mZnNldHMgPSB7XG4gICAgICAgICAgICBVVDogMCxcbiAgICAgICAgICAgIEdNVDogMCxcbiAgICAgICAgICAgIEVEVDogLTQgKiA2MCxcbiAgICAgICAgICAgIEVTVDogLTUgKiA2MCxcbiAgICAgICAgICAgIENEVDogLTUgKiA2MCxcbiAgICAgICAgICAgIENTVDogLTYgKiA2MCxcbiAgICAgICAgICAgIE1EVDogLTYgKiA2MCxcbiAgICAgICAgICAgIE1TVDogLTcgKiA2MCxcbiAgICAgICAgICAgIFBEVDogLTcgKiA2MCxcbiAgICAgICAgICAgIFBTVDogLTggKiA2MCxcbiAgICAgICAgfTtcblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgbWF0Y2ggPSBleHRlbmRlZElzb1JlZ2V4LmV4ZWMoc3RyaW5nKSB8fCBiYXNpY0lzb1JlZ2V4LmV4ZWMoc3RyaW5nKSxcbiAgICAgICAgICAgIGFsbG93VGltZSxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgICAgICB0aW1lRm9ybWF0LFxuICAgICAgICAgICAgdHpGb3JtYXQsXG4gICAgICAgICAgICBpc29EYXRlc0xlbiA9IGlzb0RhdGVzLmxlbmd0aCxcbiAgICAgICAgICAgIGlzb1RpbWVzTGVuID0gaXNvVGltZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlc0xlbjsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gaXNvRGF0ZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lc0xlbjsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhtYXRjaFszXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzJdIHNob3VsZCBiZSAnVCcgb3Igc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVGb3JtYXQgPSAobWF0Y2hbMl0gfHwgJyAnKSArIGlzb1RpbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWxsb3dUaW1lICYmIHRpbWVGb3JtYXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgICAgIGlmICh0elJlZ2V4LmV4ZWMobWF0Y2hbNF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHR6Rm9ybWF0ID0gJ1onO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlnLl9mID0gZGF0ZUZvcm1hdCArICh0aW1lRm9ybWF0IHx8ICcnKSArICh0ekZvcm1hdCB8fCAnJyk7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RGcm9tUkZDMjgyMlN0cmluZ3MoXG4gICAgICAgIHllYXJTdHIsXG4gICAgICAgIG1vbnRoU3RyLFxuICAgICAgICBkYXlTdHIsXG4gICAgICAgIGhvdXJTdHIsXG4gICAgICAgIG1pbnV0ZVN0cixcbiAgICAgICAgc2Vjb25kU3RyXG4gICAgKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICB1bnRydW5jYXRlWWVhcih5ZWFyU3RyKSxcbiAgICAgICAgICAgIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydC5pbmRleE9mKG1vbnRoU3RyKSxcbiAgICAgICAgICAgIHBhcnNlSW50KGRheVN0ciwgMTApLFxuICAgICAgICAgICAgcGFyc2VJbnQoaG91clN0ciwgMTApLFxuICAgICAgICAgICAgcGFyc2VJbnQobWludXRlU3RyLCAxMCksXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKHNlY29uZFN0cikge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocGFyc2VJbnQoc2Vjb25kU3RyLCAxMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnRydW5jYXRlWWVhcih5ZWFyU3RyKSB7XG4gICAgICAgIHZhciB5ZWFyID0gcGFyc2VJbnQoeWVhclN0ciwgMTApO1xuICAgICAgICBpZiAoeWVhciA8PSA0OSkge1xuICAgICAgICAgICAgcmV0dXJuIDIwMDAgKyB5ZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKHllYXIgPD0gOTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gMTkwMCArIHllYXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHllYXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcHJvY2Vzc1JGQzI4MjIocykge1xuICAgICAgICAvLyBSZW1vdmUgY29tbWVudHMgYW5kIGZvbGRpbmcgd2hpdGVzcGFjZSBhbmQgcmVwbGFjZSBtdWx0aXBsZS1zcGFjZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuICAgICAgICByZXR1cm4gc1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKFteKCldKlxcKXxbXFxuXFx0XS9nLCAnICcpXG4gICAgICAgICAgICAucmVwbGFjZSgvKFxcc1xccyspL2csICcgJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzXFxzKi8sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcc1xccyokLywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV2Vla2RheSh3ZWVrZGF5U3RyLCBwYXJzZWRJbnB1dCwgY29uZmlnKSB7XG4gICAgICAgIGlmICh3ZWVrZGF5U3RyKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHRoZSB2YW5pbGxhIEpTIERhdGUgb2JqZWN0IHdpdGggYW4gaW5kZXBlbmRlbnQgZGF5LW9mLXdlZWsgY2hlY2suXG4gICAgICAgICAgICB2YXIgd2Vla2RheVByb3ZpZGVkID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQuaW5kZXhPZih3ZWVrZGF5U3RyKSxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5QWN0dWFsID0gbmV3IERhdGUoXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZElucHV0WzBdLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRJbnB1dFsxXSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkSW5wdXRbMl1cbiAgICAgICAgICAgICAgICApLmdldERheSgpO1xuICAgICAgICAgICAgaWYgKHdlZWtkYXlQcm92aWRlZCAhPT0gd2Vla2RheUFjdHVhbCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLndlZWtkYXlNaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZU9mZnNldChvYnNPZmZzZXQsIG1pbGl0YXJ5T2Zmc2V0LCBudW1PZmZzZXQpIHtcbiAgICAgICAgaWYgKG9ic09mZnNldCkge1xuICAgICAgICAgICAgcmV0dXJuIG9ic09mZnNldHNbb2JzT2Zmc2V0XTtcbiAgICAgICAgfSBlbHNlIGlmIChtaWxpdGFyeU9mZnNldCkge1xuICAgICAgICAgICAgLy8gdGhlIG9ubHkgYWxsb3dlZCBtaWxpdGFyeSB0eiBpcyBaXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBobSA9IHBhcnNlSW50KG51bU9mZnNldCwgMTApLFxuICAgICAgICAgICAgICAgIG0gPSBobSAlIDEwMCxcbiAgICAgICAgICAgICAgICBoID0gKGhtIC0gbSkgLyAxMDA7XG4gICAgICAgICAgICByZXR1cm4gaCAqIDYwICsgbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgYW5kIHRpbWUgZnJvbSByZWYgMjgyMiBmb3JtYXRcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tUkZDMjgyMihjb25maWcpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gcmZjMjgyMi5leGVjKHByZXByb2Nlc3NSRkMyODIyKGNvbmZpZy5faSkpLFxuICAgICAgICAgICAgcGFyc2VkQXJyYXk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcGFyc2VkQXJyYXkgPSBleHRyYWN0RnJvbVJGQzI4MjJTdHJpbmdzKFxuICAgICAgICAgICAgICAgIG1hdGNoWzRdLFxuICAgICAgICAgICAgICAgIG1hdGNoWzNdLFxuICAgICAgICAgICAgICAgIG1hdGNoWzJdLFxuICAgICAgICAgICAgICAgIG1hdGNoWzVdLFxuICAgICAgICAgICAgICAgIG1hdGNoWzZdLFxuICAgICAgICAgICAgICAgIG1hdGNoWzddXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFjaGVja1dlZWtkYXkobWF0Y2hbMV0sIHBhcnNlZEFycmF5LCBjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25maWcuX2EgPSBwYXJzZWRBcnJheTtcbiAgICAgICAgICAgIGNvbmZpZy5fdHptID0gY2FsY3VsYXRlT2Zmc2V0KG1hdGNoWzhdLCBtYXRjaFs5XSwgbWF0Y2hbMTBdKTtcblxuICAgICAgICAgICAgY29uZmlnLl9kID0gY3JlYXRlVVRDRGF0ZS5hcHBseShudWxsLCBjb25maWcuX2EpO1xuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykucmZjMjgyMiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSAxKSBBU1AuTkVULCAyKSBJU08sIDMpIFJGQyAyODIyIGZvcm1hdHMsIG9yIDQpIG9wdGlvbmFsIGZhbGxiYWNrIGlmIHBhcnNpbmcgaXNuJ3Qgc3RyaWN0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBhc3BOZXRKc29uUmVnZXguZXhlYyhjb25maWcuX2kpO1xuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fc3RyaWN0KSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZpbmFsIGF0dGVtcHQsIHVzZSBJbnB1dCBGYWxsYmFja1xuICAgICAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxuICAgICAgICAndmFsdWUgcHJvdmlkZWQgaXMgbm90IGluIGEgcmVjb2duaXplZCBSRkMyODIyIG9yIElTTyBmb3JtYXQuIG1vbWVudCBjb25zdHJ1Y3Rpb24gZmFsbHMgYmFjayB0byBqcyBEYXRlKCksICcgK1xuICAgICAgICAgICAgJ3doaWNoIGlzIG5vdCByZWxpYWJsZSBhY3Jvc3MgYWxsIGJyb3dzZXJzIGFuZCB2ZXJzaW9ucy4gTm9uIFJGQzI4MjIvSVNPIGRhdGUgZm9ybWF0cyBhcmUgJyArXG4gICAgICAgICAgICAnZGlzY291cmFnZWQuIFBsZWFzZSByZWZlciB0byBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2pzLWRhdGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuXG4gICAgZnVuY3Rpb24gZGVmYXVsdHMoYSwgYiwgYykge1xuICAgICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZykge1xuICAgICAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxuICAgICAgICB2YXIgbm93VmFsdWUgPSBuZXcgRGF0ZShob29rcy5ub3coKSk7XG4gICAgICAgIGlmIChjb25maWcuX3VzZVVUQykge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIG5vd1ZhbHVlLmdldFVUQ01vbnRoKCksXG4gICAgICAgICAgICAgICAgbm93VmFsdWUuZ2V0VVRDRGF0ZSgpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXG4gICAgLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbiAgICAvLyBub3RlOiBhbGwgdmFsdWVzIHBhc3QgdGhlIHllYXIgYXJlIG9wdGlvbmFsIGFuZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGlucHV0ID0gW10sXG4gICAgICAgICAgICBjdXJyZW50RGF0ZSxcbiAgICAgICAgICAgIGV4cGVjdGVkV2Vla2RheSxcbiAgICAgICAgICAgIHllYXJUb1VzZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSB8fFxuICAgICAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID09PSAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9XG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW2ldID09IG51bGwgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW01JTlVURV0gPT09IDAgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkoXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgaW5wdXRcbiAgICAgICAgKTtcbiAgICAgICAgZXhwZWN0ZWRXZWVrZGF5ID0gY29uZmlnLl91c2VVVENcbiAgICAgICAgICAgID8gY29uZmlnLl9kLmdldFVUQ0RheSgpXG4gICAgICAgICAgICA6IGNvbmZpZy5fZC5nZXREYXkoKTtcblxuICAgICAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXG4gICAgICAgIGlmIChjb25maWcuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbmV4dERheSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgbWlzbWF0Y2hpbmcgZGF5IG9mIHdlZWtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZmlnLl93ICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnLl93LmQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBjb25maWcuX3cuZCAhPT0gZXhwZWN0ZWRXZWVrZGF5XG4gICAgICAgICkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93LCBjdXJXZWVrO1xuXG4gICAgICAgIHcgPSBjb25maWcuX3c7XG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRvdyA9IDE7XG4gICAgICAgICAgICBkb3kgPSA0O1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cbiAgICAgICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm93KS5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMoXG4gICAgICAgICAgICAgICAgdy5HRyxcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbWUVBUl0sXG4gICAgICAgICAgICAgICAgd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCAxLCA0KS55ZWFyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XG4gICAgICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XG5cbiAgICAgICAgICAgIGN1cldlZWsgPSB3ZWVrT2ZZZWFyKGNyZWF0ZUxvY2FsKCksIGRvdywgZG95KTtcblxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIGN1cldlZWsueWVhcik7XG5cbiAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCB3ZWVrLlxuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcudywgY3VyV2Vlay53ZWVrKTtcblxuICAgICAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gd2Vla2RheSAtLSBsb3cgZGF5IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgbmV4dCB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZDtcbiAgICAgICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgd2Vla2RheSAtLSBjb3VudGluZyBzdGFydHMgZnJvbSBiZWdpbm5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XG4gICAgICAgICAgICAgICAgaWYgKHcuZSA8IDAgfHwgdy5lID4gNikge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbm5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSBkb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdlZWsgPCAxIHx8IHdlZWsgPiB3ZWVrc0luWWVhcih3ZWVrWWVhciwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtkYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xuICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0ZW1wLmRheU9mWWVhcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBJU08gc3RhbmRhcmRcbiAgICBob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIFJGQyAyODIyIGZvcm1cbiAgICBob29rcy5SRkNfMjgyMiA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGNyZWF0aW9uIGZsb3cgdG8gcHJldmVudCBjaXJjdWxhciBkZXBzXG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLklTT184NjAxKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5fZiA9PT0gaG9va3MuUkZDXzI4MjIpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnLl9hID0gW107XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcblxuICAgICAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgcGFyc2VkSW5wdXQsXG4gICAgICAgICAgICB0b2tlbnMsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIHNraXBwZWQsXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDAsXG4gICAgICAgICAgICBlcmEsXG4gICAgICAgICAgICB0b2tlbkxlbjtcblxuICAgICAgICB0b2tlbnMgPVxuICAgICAgICAgICAgZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xuICAgICAgICB0b2tlbkxlbiA9IHRva2Vucy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbkxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHBhcnNlZElucHV0ID0gKHN0cmluZy5tYXRjaChnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpIHx8XG4gICAgICAgICAgICAgICAgW10pWzBdO1xuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgc2tpcHBlZCA9IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoICs9IHBhcnNlZElucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9zdHJpY3QgJiYgIXBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5jaGFyc0xlZnRPdmVyID1cbiAgICAgICAgICAgIHN0cmluZ0xlbmd0aCAtIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGg7XG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPiAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykubWVyaWRpZW0gPSBjb25maWcuX21lcmlkaWVtO1xuICAgICAgICAvLyBoYW5kbGUgbWVyaWRpZW1cbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKFxuICAgICAgICAgICAgY29uZmlnLl9sb2NhbGUsXG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0sXG4gICAgICAgICAgICBjb25maWcuX21lcmlkaWVtXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gaGFuZGxlIGVyYVxuICAgICAgICBlcmEgPSBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lcmE7XG4gICAgICAgIGlmIChlcmEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IGNvbmZpZy5fbG9jYWxlLmVyYXNDb252ZXJ0WWVhcihlcmEsIGNvbmZpZy5fYVtZRUFSXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcChsb2NhbGUsIGhvdXIsIG1lcmlkaWVtKSB7XG4gICAgICAgIHZhciBpc1BtO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpIHtcbiAgICAgICAgdmFyIHRlbXBDb25maWcsXG4gICAgICAgICAgICBiZXN0TW9tZW50LFxuICAgICAgICAgICAgc2NvcmVUb0JlYXQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgY3VycmVudFNjb3JlLFxuICAgICAgICAgICAgdmFsaWRGb3JtYXRGb3VuZCxcbiAgICAgICAgICAgIGJlc3RGb3JtYXRJc1ZhbGlkID0gZmFsc2UsXG4gICAgICAgICAgICBjb25maWdmTGVuID0gY29uZmlnLl9mLmxlbmd0aDtcblxuICAgICAgICBpZiAoY29uZmlnZkxlbiA9PT0gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZ2ZMZW47IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgICAgICAgIHZhbGlkRm9ybWF0Rm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRlbXBDb25maWcgPSBjb3B5Q29uZmlnKHt9LCBjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoaXNWYWxpZCh0ZW1wQ29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkRm9ybWF0Rm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbnkgaW5wdXQgdGhhdCB3YXMgbm90IHBhcnNlZCBhZGQgYSBwZW5hbHR5IGZvciB0aGF0IGZvcm1hdFxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5jaGFyc0xlZnRPdmVyO1xuXG4gICAgICAgICAgICAvL29yIHRva2Vuc1xuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS51bnVzZWRUb2tlbnMubGVuZ3RoICogMTA7XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5zY29yZSA9IGN1cnJlbnRTY29yZTtcblxuICAgICAgICAgICAgaWYgKCFiZXN0Rm9ybWF0SXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCB8fFxuICAgICAgICAgICAgICAgICAgICB2YWxpZEZvcm1hdEZvdW5kXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0TW9tZW50ID0gdGVtcENvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkRm9ybWF0Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RGb3JtYXRJc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0TW9tZW50ID0gdGVtcENvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKSxcbiAgICAgICAgICAgIGRheU9yRGF0ZSA9IGkuZGF5ID09PSB1bmRlZmluZWQgPyBpLmRhdGUgOiBpLmRheTtcbiAgICAgICAgY29uZmlnLl9hID0gbWFwKFxuICAgICAgICAgICAgW2kueWVhciwgaS5tb250aCwgZGF5T3JEYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF0sXG4gICAgICAgICAgICBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnKGNvbmZpZykge1xuICAgICAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xuICAgICAgICBpZiAocmVzLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICAvLyBBZGRpbmcgaXMgc21hcnQgZW5vdWdoIGFyb3VuZCBEU1RcbiAgICAgICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcbiAgICAgICAgICAgIHJlcy5fbmV4dERheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCh7IG51bGxJbnB1dDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWcuX2kgPSBpbnB1dCA9IGNvbmZpZy5fbG9jYWxlLnByZXBhcnNlKGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01vbWVudChpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3coaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBpbnB1dDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCkge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzVmFsaWQoY29uZmlnKSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlucHV0KGNvbmZpZykge1xuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2k7XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkpIHtcbiAgICAgICAgICAgIC8vIGZyb20gbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBpZiAoZm9ybWF0ID09PSB0cnVlIHx8IGZvcm1hdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbGUgPT09IHRydWUgfHwgbG9jYWxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGlzT2JqZWN0KGlucHV0KSAmJiBpc09iamVjdEVtcHR5KGlucHV0KSkgfHxcbiAgICAgICAgICAgIChpc0FycmF5KGlucHV0KSAmJiBpbnB1dC5sZW5ndGggPT09IDApXG4gICAgICAgICkge1xuICAgICAgICAgICAgaW5wdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDIzXG4gICAgICAgIGMuX2lzQU1vbWVudE9iamVjdCA9IHRydWU7XG4gICAgICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XG4gICAgICAgIGMuX2wgPSBsb2NhbGU7XG4gICAgICAgIGMuX2kgPSBpbnB1dDtcbiAgICAgICAgYy5fZiA9IGZvcm1hdDtcbiAgICAgICAgYy5fc3RyaWN0ID0gc3RyaWN0O1xuXG4gICAgICAgIHJldHVybiBjcmVhdGVGcm9tQ29uZmlnKGMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICdtb21lbnQoKS5taW4gaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5tYXggaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9taW4tbWF4LycsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA8IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIHByb3RvdHlwZU1heCA9IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9taW4tbWF4LycsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA+IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxuICAgIC8vIG90aGVyLiBUaGlzIHJlbGllcyBvbiB0aGUgZnVuY3Rpb24gZm4gdG8gYmUgdHJhbnNpdGl2ZS5cbiAgICAvL1xuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzLlxuICAgIGZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgICAgICB2YXIgcmVzLCBpO1xuICAgICAgICBpZiAobW9tZW50cy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShtb21lbnRzWzBdKSkge1xuICAgICAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtb21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gbW9tZW50c1swXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IG1vbWVudHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgW10uc29ydCBpbnN0ZWFkP1xuICAgIGZ1bmN0aW9uIG1pbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXgoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcbiAgICB9XG5cbiAgICB2YXIgbm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogK25ldyBEYXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBvcmRlcmluZyA9IFtcbiAgICAgICAgJ3llYXInLFxuICAgICAgICAncXVhcnRlcicsXG4gICAgICAgICdtb250aCcsXG4gICAgICAgICd3ZWVrJyxcbiAgICAgICAgJ2RheScsXG4gICAgICAgICdob3VyJyxcbiAgICAgICAgJ21pbnV0ZScsXG4gICAgICAgICdzZWNvbmQnLFxuICAgICAgICAnbWlsbGlzZWNvbmQnLFxuICAgIF07XG5cbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uVmFsaWQobSkge1xuICAgICAgICB2YXIga2V5LFxuICAgICAgICAgICAgdW5pdEhhc0RlY2ltYWwgPSBmYWxzZSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBvcmRlckxlbiA9IG9yZGVyaW5nLmxlbmd0aDtcbiAgICAgICAgZm9yIChrZXkgaW4gbSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhc093blByb3AobSwga2V5KSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2YuY2FsbChvcmRlcmluZywga2V5KSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgKG1ba2V5XSA9PSBudWxsIHx8ICFpc05hTihtW2tleV0pKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcmRlckxlbjsgKytpKSB7XG4gICAgICAgICAgICBpZiAobVtvcmRlcmluZ1tpXV0pIHtcbiAgICAgICAgICAgICAgICBpZiAodW5pdEhhc0RlY2ltYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBvbmx5IGFsbG93IG5vbi1pbnRlZ2VycyBmb3Igc21hbGxlc3QgdW5pdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChtW29yZGVyaW5nW2ldXSkgIT09IHRvSW50KG1bb3JkZXJpbmdbaV1dKSkge1xuICAgICAgICAgICAgICAgICAgICB1bml0SGFzRGVjaW1hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZCQxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNWYWxpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkJDEoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbihOYU4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIER1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXG4gICAgICAgICAgICB5ZWFycyA9IG5vcm1hbGl6ZWRJbnB1dC55ZWFyIHx8IDAsXG4gICAgICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcbiAgICAgICAgICAgIHdlZWtzID0gbm9ybWFsaXplZElucHV0LndlZWsgfHwgbm9ybWFsaXplZElucHV0Lmlzb1dlZWsgfHwgMCxcbiAgICAgICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXG4gICAgICAgICAgICBtaW51dGVzID0gbm9ybWFsaXplZElucHV0Lm1pbnV0ZSB8fCAwLFxuICAgICAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xuXG4gICAgICAgIHRoaXMuX2lzVmFsaWQgPSBpc0R1cmF0aW9uVmFsaWQobm9ybWFsaXplZElucHV0KTtcblxuICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPVxuICAgICAgICAgICAgK21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgaG91cnMgKiAxMDAwICogNjAgKiA2MDsgLy91c2luZyAxMDAwICogNjAgKiA2MCBpbnN0ZWFkIG9mIDM2ZTUgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yOTc4XG4gICAgICAgIC8vIEJlY2F1c2Ugb2YgZGF0ZUFkZFJlbW92ZSB0cmVhdHMgMjQgaG91cnMgYXMgZGlmZmVyZW50IGZyb20gYVxuICAgICAgICAvLyBkYXkgd2hlbiB3b3JraW5nIGFyb3VuZCBEU1QsIHdlIG5lZWQgdG8gc3RvcmUgdGhlbSBzZXBhcmF0ZWx5XG4gICAgICAgIHRoaXMuX2RheXMgPSArZGF5cyArIHdlZWtzICogNztcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0byB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArIHF1YXJ0ZXJzICogMyArIHllYXJzICogMTI7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IGdldExvY2FsZSgpO1xuXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEdXJhdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNSb3VuZChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKC0xICogbnVtYmVyKSAqIC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbXBhcmUgdHdvIGFycmF5cywgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXNcbiAgICBmdW5jdGlvbiBjb21wYXJlQXJyYXlzKGFycmF5MSwgYXJyYXkyLCBkb250Q29udmVydCkge1xuICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBsZW5ndGhEaWZmID0gTWF0aC5hYnMoYXJyYXkxLmxlbmd0aCAtIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgZGlmZnMgPSAwLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKGRvbnRDb252ZXJ0ICYmIGFycmF5MVtpXSAhPT0gYXJyYXkyW2ldKSB8fFxuICAgICAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBvZmZzZXQodG9rZW4sIHNlcGFyYXRvcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMudXRjT2Zmc2V0KCksXG4gICAgICAgICAgICAgICAgc2lnbiA9ICcrJztcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgICAgICAgICBzaWduID0gJy0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBzaWduICtcbiAgICAgICAgICAgICAgICB6ZXJvRmlsbCh+fihvZmZzZXQgLyA2MCksIDIpICtcbiAgICAgICAgICAgICAgICBzZXBhcmF0b3IgK1xuICAgICAgICAgICAgICAgIHplcm9GaWxsKH5+b2Zmc2V0ICUgNjAsIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvZmZzZXQoJ1onLCAnOicpO1xuICAgIG9mZnNldCgnWlonLCAnJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdaJywgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl91c2VVVEMgPSB0cnVlO1xuICAgICAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gdGltZXpvbmUgY2h1bmtlclxuICAgIC8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxuICAgIHZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKHN0cmluZyB8fCAnJykubWF0Y2gobWF0Y2hlciksXG4gICAgICAgICAgICBjaHVuayxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgbWludXRlcztcblxuICAgICAgICBpZiAobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjaHVuayA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXSB8fCBbXTtcbiAgICAgICAgcGFydHMgPSAoY2h1bmsgKyAnJykubWF0Y2goY2h1bmtPZmZzZXQpIHx8IFsnLScsIDAsIDBdO1xuICAgICAgICBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgICAgICByZXR1cm4gbWludXRlcyA9PT0gMCA/IDAgOiBwYXJ0c1swXSA9PT0gJysnID8gbWludXRlcyA6IC1taW51dGVzO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXG4gICAgZnVuY3Rpb24gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCBtb2RlbCkge1xuICAgICAgICB2YXIgcmVzLCBkaWZmO1xuICAgICAgICBpZiAobW9kZWwuX2lzVVRDKSB7XG4gICAgICAgICAgICByZXMgPSBtb2RlbC5jbG9uZSgpO1xuICAgICAgICAgICAgZGlmZiA9XG4gICAgICAgICAgICAgICAgKGlzTW9tZW50KGlucHV0KSB8fCBpc0RhdGUoaW5wdXQpXG4gICAgICAgICAgICAgICAgICAgID8gaW5wdXQudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgICAgIDogY3JlYXRlTG9jYWwoaW5wdXQpLnZhbHVlT2YoKSkgLSByZXMudmFsdWVPZigpO1xuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICAgICAgcmVzLl9kLnNldFRpbWUocmVzLl9kLnZhbHVlT2YoKSArIGRpZmYpO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHJlcywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVMb2NhbChpbnB1dCkubG9jYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVPZmZzZXQobSkge1xuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cbiAgICAvLyBJdCBpcyBpbnRlbmRlZCB0byBrZWVwIHRoZSBvZmZzZXQgaW4gc3luYyB3aXRoIHRoZSB0aW1lem9uZS5cbiAgICBob29rcy51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuICAgIC8vIGFmZmVjdGluZyB0aGUgbG9jYWwgaG91ci4gU28gNTozMToyNiArMDMwMCAtLVt1dGNPZmZzZXQoMiwgdHJ1ZSldLS0+XG4gICAgLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbiAgICAvL1xuICAgIC8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuICAgIC8vIGEgc2Vjb25kIHRpbWUuIEluIGNhc2UgaXQgd2FudHMgdXMgdG8gY2hhbmdlIHRoZSBvZmZzZXQgYWdhaW5cbiAgICAvLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2VcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuICAgIGZ1bmN0aW9uIGdldFNldE9mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSwga2VlcE1pbnV0ZXMpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX29mZnNldCB8fCAwLFxuICAgICAgICAgICAgbG9jYWxBZGp1c3Q7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2ICYmICFrZWVwTWludXRlcykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKiA2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIGxvY2FsQWRqdXN0ID0gZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkU3VidHJhY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRHVyYXRpb24oaW5wdXQgLSBvZmZzZXQsICdtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gb2Zmc2V0IDogZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFpvbmUoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAtaW5wdXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyhrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVVRDKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHRab25lID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaE9mZnNldCwgdGhpcy5faSk7XG4gICAgICAgICAgICBpZiAodFpvbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRab25lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0ID0gaW5wdXQgPyBjcmVhdGVMb2NhbChpbnB1dCkudXRjT2Zmc2V0KCkgOiAwO1xuXG4gICAgICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCg1KS51dGNPZmZzZXQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCgpIHtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9pc0RTVFNoaWZ0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSB7fSxcbiAgICAgICAgICAgIG90aGVyO1xuXG4gICAgICAgIGNvcHlDb25maWcoYywgdGhpcyk7XG4gICAgICAgIGMgPSBwcmVwYXJlQ29uZmlnKGMpO1xuXG4gICAgICAgIGlmIChjLl9hKSB7XG4gICAgICAgICAgICBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlVVRDKGMuX2EpIDogY3JlYXRlTG9jYWwoYy5fYSk7XG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPVxuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIGNvbXBhcmVBcnJheXMoYy5fYSwgb3RoZXIudG9BcnJheSgpKSA+IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMb2NhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gIXRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGNPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMCA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFTUC5ORVQganNvbiBkYXRlIGZvcm1hdCByZWdleFxuICAgIHZhciBhc3BOZXRSZWdleCA9IC9eKC18XFwrKT8oPzooXFxkKilbLiBdKT8oXFxkKyk6KFxcZCspKD86OihcXGQrKShcXC5cXGQqKT8pPyQvLFxuICAgICAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuICAgICAgICAvLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXG4gICAgICAgIC8vIGFuZCBmdXJ0aGVyIG1vZGlmaWVkIHRvIGFsbG93IGZvciBzdHJpbmdzIGNvbnRhaW5pbmcgYm90aCB3ZWVrIGFuZCBkYXlcbiAgICAgICAgaXNvUmVnZXggPVxuICAgICAgICAgICAgL14oLXxcXCspP1AoPzooWy0rXT9bMC05LC5dKilZKT8oPzooWy0rXT9bMC05LC5dKilNKT8oPzooWy0rXT9bMC05LC5dKilXKT8oPzooWy0rXT9bMC05LC5dKilEKT8oPzpUKD86KFstK10/WzAtOSwuXSopSCk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopUyk/KT8kLztcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uKGlucHV0LCBrZXkpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXG4gICAgICAgICAgICAvLyBtYXRjaGluZyBhZ2FpbnN0IHJlZ2V4cCBpcyBleHBlbnNpdmUsIGRvIGl0IG9uIGRlbWFuZFxuICAgICAgICAgICAgbWF0Y2ggPSBudWxsLFxuICAgICAgICAgICAgc2lnbixcbiAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgIGRpZmZSZXM7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBtczogaW5wdXQuX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgICAgICBkOiBpbnB1dC5fZGF5cyxcbiAgICAgICAgICAgICAgICBNOiBpbnB1dC5fbW9udGhzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkgfHwgIWlzTmFOKCtpbnB1dCkpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9ICtpbnB1dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24ubWlsbGlzZWNvbmRzID0gK2lucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKChtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IG1hdGNoWzFdID09PSAnLScgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIGQ6IHRvSW50KG1hdGNoW0RBVEVdKSAqIHNpZ24sXG4gICAgICAgICAgICAgICAgaDogdG9JbnQobWF0Y2hbSE9VUl0pICogc2lnbixcbiAgICAgICAgICAgICAgICBtOiB0b0ludChtYXRjaFtNSU5VVEVdKSAqIHNpZ24sXG4gICAgICAgICAgICAgICAgczogdG9JbnQobWF0Y2hbU0VDT05EXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIG1zOiB0b0ludChhYnNSb3VuZChtYXRjaFtNSUxMSVNFQ09ORF0gKiAxMDAwKSkgKiBzaWduLCAvLyB0aGUgbWlsbGlzZWNvbmQgZGVjaW1hbCBwb2ludCBpcyBpbmNsdWRlZCBpbiB0aGUgbWF0Y2hcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gbWF0Y2hbMV0gPT09ICctJyA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHk6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBNOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgdzogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGQ6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBoOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgbTogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHM6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UoXG4gICAgICAgICAgICAgICAgY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksXG4gICAgICAgICAgICAgICAgY3JlYXRlTG9jYWwoZHVyYXRpb24udG8pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIGR1cmF0aW9uLk0gPSBkaWZmUmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpICYmIGhhc093blByb3AoaW5wdXQsICdfbG9jYWxlJykpIHtcbiAgICAgICAgICAgIHJldC5fbG9jYWxlID0gaW5wdXQuX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2lzVmFsaWQnKSkge1xuICAgICAgICAgICAgcmV0Ll9pc1ZhbGlkID0gaW5wdXQuX2lzVmFsaWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGNyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xuICAgIGNyZWF0ZUR1cmF0aW9uLmludmFsaWQgPSBjcmVhdGVJbnZhbGlkJDE7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzbyhpbnAsIHNpZ24pIHtcbiAgICAgICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cbiAgICAgICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXG4gICAgICAgIC8vIGlucCBtYXkgYmUgdW5kZWZpbmVkLCBzbyBjYXJlZnVsIGNhbGxpbmcgcmVwbGFjZSBvbiBpdC5cbiAgICAgICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcbiAgICAgICAgcmV0dXJuIChpc05hTihyZXMpID8gMCA6IHJlcykgKiBzaWduO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgICAgIHJlcy5tb250aHMgPVxuICAgICAgICAgICAgb3RoZXIubW9udGgoKSAtIGJhc2UubW9udGgoKSArIChvdGhlci55ZWFyKCkgLSBiYXNlLnllYXIoKSkgKiAxMjtcbiAgICAgICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xuICAgICAgICAgICAgLS1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICtiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXIgPSBjbG9uZVdpdGhPZmZzZXQob3RoZXIsIGJhc2UpO1xuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICByZXMubW9udGhzID0gLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIHBlcmlvZCkge1xuICAgICAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSBudWxsICYmICFpc05hTigrcGVyaW9kKSkge1xuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ21vbWVudCgpLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKHBlcmlvZCwgbnVtYmVyKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1vbWVudCgpLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKG51bWJlciwgcGVyaW9kKS4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvYWRkLWludmVydGVkLXBhcmFtLyBmb3IgbW9yZSBpbmZvLidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRtcCA9IHZhbDtcbiAgICAgICAgICAgICAgICB2YWwgPSBwZXJpb2Q7XG4gICAgICAgICAgICAgICAgcGVyaW9kID0gdG1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgICAgICBhZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdChtb20sIGR1cmF0aW9uLCBpc0FkZGluZywgdXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZGF5cyA9IGFic1JvdW5kKGR1cmF0aW9uLl9kYXlzKSxcbiAgICAgICAgICAgIG1vbnRocyA9IGFic1JvdW5kKGR1cmF0aW9uLl9tb250aHMpO1xuXG4gICAgICAgIGlmICghbW9tLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcblxuICAgICAgICBpZiAobW9udGhzKSB7XG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICBzZXQkMShtb20sICdEYXRlJywgZ2V0KG1vbSwgJ0RhdGUnKSArIGRheXMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUobW9tLl9kLnZhbHVlT2YoKSArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYWRkID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpLFxuICAgICAgICBzdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8IGlucHV0IGluc3RhbmNlb2YgU3RyaW5nO1xuICAgIH1cblxuICAgIC8vIHR5cGUgTW9tZW50SW5wdXQgPSBNb21lbnQgfCBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgKG51bWJlciB8IHN0cmluZylbXSB8IE1vbWVudElucHV0T2JqZWN0IHwgdm9pZDsgLy8gbnVsbCB8IHVuZGVmaW5lZFxuICAgIGZ1bmN0aW9uIGlzTW9tZW50SW5wdXQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlzTW9tZW50KGlucHV0KSB8fFxuICAgICAgICAgICAgaXNEYXRlKGlucHV0KSB8fFxuICAgICAgICAgICAgaXNTdHJpbmcoaW5wdXQpIHx8XG4gICAgICAgICAgICBpc051bWJlcihpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzTnVtYmVyT3JTdHJpbmdBcnJheShpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzTW9tZW50SW5wdXRPYmplY3QoaW5wdXQpIHx8XG4gICAgICAgICAgICBpbnB1dCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgaW5wdXQgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTW9tZW50SW5wdXRPYmplY3QoaW5wdXQpIHtcbiAgICAgICAgdmFyIG9iamVjdFRlc3QgPSBpc09iamVjdChpbnB1dCkgJiYgIWlzT2JqZWN0RW1wdHkoaW5wdXQpLFxuICAgICAgICAgICAgcHJvcGVydHlUZXN0ID0gZmFsc2UsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICd5ZWFycycsXG4gICAgICAgICAgICAgICAgJ3llYXInLFxuICAgICAgICAgICAgICAgICd5JyxcbiAgICAgICAgICAgICAgICAnbW9udGhzJyxcbiAgICAgICAgICAgICAgICAnbW9udGgnLFxuICAgICAgICAgICAgICAgICdNJyxcbiAgICAgICAgICAgICAgICAnZGF5cycsXG4gICAgICAgICAgICAgICAgJ2RheScsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdkYXRlcycsXG4gICAgICAgICAgICAgICAgJ2RhdGUnLFxuICAgICAgICAgICAgICAgICdEJyxcbiAgICAgICAgICAgICAgICAnaG91cnMnLFxuICAgICAgICAgICAgICAgICdob3VyJyxcbiAgICAgICAgICAgICAgICAnaCcsXG4gICAgICAgICAgICAgICAgJ21pbnV0ZXMnLFxuICAgICAgICAgICAgICAgICdtaW51dGUnLFxuICAgICAgICAgICAgICAgICdtJyxcbiAgICAgICAgICAgICAgICAnc2Vjb25kcycsXG4gICAgICAgICAgICAgICAgJ3NlY29uZCcsXG4gICAgICAgICAgICAgICAgJ3MnLFxuICAgICAgICAgICAgICAgICdtaWxsaXNlY29uZHMnLFxuICAgICAgICAgICAgICAgICdtaWxsaXNlY29uZCcsXG4gICAgICAgICAgICAgICAgJ21zJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICBwcm9wZXJ0eUxlbiA9IHByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm9wZXJ0eUxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICBwcm9wZXJ0eVRlc3QgPSBwcm9wZXJ0eVRlc3QgfHwgaGFzT3duUHJvcChpbnB1dCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdFRlc3QgJiYgcHJvcGVydHlUZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyT3JTdHJpbmdBcnJheShpbnB1dCkge1xuICAgICAgICB2YXIgYXJyYXlUZXN0ID0gaXNBcnJheShpbnB1dCksXG4gICAgICAgICAgICBkYXRhVHlwZVRlc3QgPSBmYWxzZTtcbiAgICAgICAgaWYgKGFycmF5VGVzdCkge1xuICAgICAgICAgICAgZGF0YVR5cGVUZXN0ID1cbiAgICAgICAgICAgICAgICBpbnB1dC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc051bWJlcihpdGVtKSAmJiBpc1N0cmluZyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVRlc3QgJiYgZGF0YVR5cGVUZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQ2FsZW5kYXJTcGVjKGlucHV0KSB7XG4gICAgICAgIHZhciBvYmplY3RUZXN0ID0gaXNPYmplY3QoaW5wdXQpICYmICFpc09iamVjdEVtcHR5KGlucHV0KSxcbiAgICAgICAgICAgIHByb3BlcnR5VGVzdCA9IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAnc2FtZURheScsXG4gICAgICAgICAgICAgICAgJ25leHREYXknLFxuICAgICAgICAgICAgICAgICdsYXN0RGF5JyxcbiAgICAgICAgICAgICAgICAnbmV4dFdlZWsnLFxuICAgICAgICAgICAgICAgICdsYXN0V2VlaycsXG4gICAgICAgICAgICAgICAgJ3NhbWVFbHNlJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgcHJvcGVydHk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgIHByb3BlcnR5VGVzdCA9IHByb3BlcnR5VGVzdCB8fCBoYXNPd25Qcm9wKGlucHV0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0VGVzdCAmJiBwcm9wZXJ0eVRlc3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q2FsZW5kYXJGb3JtYXQobXlNb21lbnQsIG5vdykge1xuICAgICAgICB2YXIgZGlmZiA9IG15TW9tZW50LmRpZmYobm93LCAnZGF5cycsIHRydWUpO1xuICAgICAgICByZXR1cm4gZGlmZiA8IC02XG4gICAgICAgICAgICA/ICdzYW1lRWxzZSdcbiAgICAgICAgICAgIDogZGlmZiA8IC0xXG4gICAgICAgICAgICAgID8gJ2xhc3RXZWVrJ1xuICAgICAgICAgICAgICA6IGRpZmYgPCAwXG4gICAgICAgICAgICAgICAgPyAnbGFzdERheSdcbiAgICAgICAgICAgICAgICA6IGRpZmYgPCAxXG4gICAgICAgICAgICAgICAgICA/ICdzYW1lRGF5J1xuICAgICAgICAgICAgICAgICAgOiBkaWZmIDwgMlxuICAgICAgICAgICAgICAgICAgICA/ICduZXh0RGF5J1xuICAgICAgICAgICAgICAgICAgICA6IGRpZmYgPCA3XG4gICAgICAgICAgICAgICAgICAgICAgPyAnbmV4dFdlZWsnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnc2FtZUVsc2UnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyJDEodGltZSwgZm9ybWF0cykge1xuICAgICAgICAvLyBTdXBwb3J0IGZvciBzaW5nbGUgcGFyYW1ldGVyLCBmb3JtYXRzIG9ubHkgb3ZlcmxvYWQgdG8gdGhlIGNhbGVuZGFyIGZ1bmN0aW9uXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICAgICAgICAgIHRpbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNNb21lbnRJbnB1dChhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICBmb3JtYXRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0NhbGVuZGFyU3BlYyhhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0cyA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB0aW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXG4gICAgICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxuICAgICAgICB2YXIgbm93ID0gdGltZSB8fCBjcmVhdGVMb2NhbCgpLFxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXG4gICAgICAgICAgICBmb3JtYXQgPSBob29rcy5jYWxlbmRhckZvcm1hdCh0aGlzLCBzb2QpIHx8ICdzYW1lRWxzZScsXG4gICAgICAgICAgICBvdXRwdXQgPVxuICAgICAgICAgICAgICAgIGZvcm1hdHMgJiZcbiAgICAgICAgICAgICAgICAoaXNGdW5jdGlvbihmb3JtYXRzW2Zvcm1hdF0pXG4gICAgICAgICAgICAgICAgICAgID8gZm9ybWF0c1tmb3JtYXRdLmNhbGwodGhpcywgbm93KVxuICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdHNbZm9ybWF0XSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KFxuICAgICAgICAgICAgb3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgY3JlYXRlTG9jYWwobm93KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBZnRlcihpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGNyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cykgfHwgJ21pbGxpc2Vjb25kJztcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPiBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbElucHV0LnZhbHVlT2YoKSA8IHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JlZm9yZShpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGNyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cykgfHwgJ21pbGxpc2Vjb25kJztcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZXR3ZWVuKGZyb20sIHRvLCB1bml0cywgaW5jbHVzaXZpdHkpIHtcbiAgICAgICAgdmFyIGxvY2FsRnJvbSA9IGlzTW9tZW50KGZyb20pID8gZnJvbSA6IGNyZWF0ZUxvY2FsKGZyb20pLFxuICAgICAgICAgICAgbG9jYWxUbyA9IGlzTW9tZW50KHRvKSA/IHRvIDogY3JlYXRlTG9jYWwodG8pO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbEZyb20uaXNWYWxpZCgpICYmIGxvY2FsVG8uaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHkgfHwgJygpJztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChpbmNsdXNpdml0eVswXSA9PT0gJygnXG4gICAgICAgICAgICAgICAgPyB0aGlzLmlzQWZ0ZXIobG9jYWxGcm9tLCB1bml0cylcbiAgICAgICAgICAgICAgICA6ICF0aGlzLmlzQmVmb3JlKGxvY2FsRnJvbSwgdW5pdHMpKSAmJlxuICAgICAgICAgICAgKGluY2x1c2l2aXR5WzFdID09PSAnKSdcbiAgICAgICAgICAgICAgICA/IHRoaXMuaXNCZWZvcmUobG9jYWxUbywgdW5pdHMpXG4gICAgICAgICAgICAgICAgOiAhdGhpcy5pc0FmdGVyKGxvY2FsVG8sIHVuaXRzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWUoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCksXG4gICAgICAgICAgICBpbnB1dE1zO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB8fCAnbWlsbGlzZWNvbmQnO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dE1zID0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCkgPD0gaW5wdXRNcyAmJlxuICAgICAgICAgICAgICAgIGlucHV0TXMgPD0gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWVPckFmdGVyKGlucHV0LCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZShpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0JlZm9yZShpbnB1dCwgdW5pdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpZmYoaW5wdXQsIHVuaXRzLCBhc0Zsb2F0KSB7XG4gICAgICAgIHZhciB0aGF0LCB6b25lRGVsdGEsIG91dHB1dDtcblxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdCA9IGNsb25lV2l0aE9mZnNldChpbnB1dCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKCF0aGF0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHpvbmVEZWx0YSA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQ7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDFlMztcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gMTAwMFxuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQpIC8gNmU0O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyAzNmU1O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gODY0ZTU7XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vIDEwMDAgKiA2MCAqIDYwICogMjQsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0aGlzIC0gdGhhdCAtIHpvbmVEZWx0YSkgLyA2MDQ4ZTU7XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IHRoaXMgLSB0aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoRGlmZihhLCBiKSB7XG4gICAgICAgIGlmIChhLmRhdGUoKSA8IGIuZGF0ZSgpKSB7XG4gICAgICAgICAgICAvLyBlbmQtb2YtbW9udGggY2FsY3VsYXRpb25zIHdvcmsgY29ycmVjdCB3aGVuIHRoZSBzdGFydCBtb250aCBoYXMgbW9yZVxuICAgICAgICAgICAgLy8gZGF5cyB0aGFuIHRoZSBlbmQgbW9udGguXG4gICAgICAgICAgICByZXR1cm4gLW1vbnRoRGlmZihiLCBhKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMiArIChiLm1vbnRoKCkgLSBhLm1vbnRoKCkpLFxuICAgICAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcbiAgICAgICAgICAgIGFuY2hvcjIsXG4gICAgICAgICAgICBhZGp1c3Q7XG5cbiAgICAgICAgaWYgKGIgLSBhbmNob3IgPCAwKSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiAtIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yIC0gYW5jaG9yMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yMiAtIGFuY2hvcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NoZWNrIGZvciBuZWdhdGl2ZSB6ZXJvLCByZXR1cm4gemVybyBpZiBuZWdhdGl2ZSB6ZXJvXG4gICAgICAgIHJldHVybiAtKHdob2xlTW9udGhEaWZmICsgYWRqdXN0KSB8fCAwO1xuICAgIH1cblxuICAgIGhvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xuICAgIGhvb2tzLmRlZmF1bHRGb3JtYXRVdGMgPSAnWVlZWS1NTS1ERFRISDptbTpzc1taXSc7XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSVNPU3RyaW5nKGtlZXBPZmZzZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHV0YyA9IGtlZXBPZmZzZXQgIT09IHRydWUsXG4gICAgICAgICAgICBtID0gdXRjID8gdGhpcy5jbG9uZSgpLnV0YygpIDogdGhpcztcbiAgICAgICAgaWYgKG0ueWVhcigpIDwgMCB8fCBtLnllYXIoKSA+IDk5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQoXG4gICAgICAgICAgICAgICAgbSxcbiAgICAgICAgICAgICAgICB1dGNcbiAgICAgICAgICAgICAgICAgICAgPyAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJ1xuICAgICAgICAgICAgICAgICAgICA6ICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNGdW5jdGlvbihEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykpIHtcbiAgICAgICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICAgICAgICBpZiAodXRjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpICsgdGhpcy51dGNPZmZzZXQoKSAqIDYwICogMTAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ1onLCBmb3JtYXRNb21lbnQobSwgJ1onKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChcbiAgICAgICAgICAgIG0sXG4gICAgICAgICAgICB1dGMgPyAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScgOiAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1onXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgaHVtYW4gcmVhZGFibGUgcmVwcmVzZW50YXRpb24gb2YgYSBtb21lbnQgdGhhdCBjYW5cbiAgICAgKiBhbHNvIGJlIGV2YWx1YXRlZCB0byBnZXQgYSBuZXcgbW9tZW50IHdoaWNoIGlzIHRoZSBzYW1lXG4gICAgICpcbiAgICAgKiBAbGluayBodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QvZG9jcy9hcGkvdXRpbC5odG1sI3V0aWxfY3VzdG9tX2luc3BlY3RfZnVuY3Rpb25fb25fb2JqZWN0c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbW9tZW50LmludmFsaWQoLyogJyArIHRoaXMuX2kgKyAnICovKSc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZ1bmMgPSAnbW9tZW50JyxcbiAgICAgICAgICAgIHpvbmUgPSAnJyxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICBkYXRldGltZSxcbiAgICAgICAgICAgIHN1ZmZpeDtcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9jYWwoKSkge1xuICAgICAgICAgICAgZnVuYyA9IHRoaXMudXRjT2Zmc2V0KCkgPT09IDAgPyAnbW9tZW50LnV0YycgOiAnbW9tZW50LnBhcnNlWm9uZSc7XG4gICAgICAgICAgICB6b25lID0gJ1onO1xuICAgICAgICB9XG4gICAgICAgIHByZWZpeCA9ICdbJyArIGZ1bmMgKyAnKFwiXSc7XG4gICAgICAgIHllYXIgPSAwIDw9IHRoaXMueWVhcigpICYmIHRoaXMueWVhcigpIDw9IDk5OTkgPyAnWVlZWScgOiAnWVlZWVlZJztcbiAgICAgICAgZGF0ZXRpbWUgPSAnLU1NLUREW1RdSEg6bW06c3MuU1NTJztcbiAgICAgICAgc3VmZml4ID0gem9uZSArICdbXCIpXSc7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHByZWZpeCArIHllYXIgKyBkYXRldGltZSArIHN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0KGlucHV0U3RyaW5nKSB7XG4gICAgICAgIGlmICghaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIGlucHV0U3RyaW5nID0gdGhpcy5pc1V0YygpXG4gICAgICAgICAgICAgICAgPyBob29rcy5kZWZhdWx0Rm9ybWF0VXRjXG4gICAgICAgICAgICAgICAgOiBob29rcy5kZWZhdWx0Rm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb20odGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHwgY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7IHRvOiB0aGlzLCBmcm9tOiB0aW1lIH0pXG4gICAgICAgICAgICAgICAgLmxvY2FsZSh0aGlzLmxvY2FsZSgpKVxuICAgICAgICAgICAgICAgIC5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21Ob3cod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcm9tKGNyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8IGNyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oeyBmcm9tOiB0aGlzLCB0bzogdGltZSB9KVxuICAgICAgICAgICAgICAgIC5sb2NhbGUodGhpcy5sb2NhbGUoKSlcbiAgICAgICAgICAgICAgICAuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b05vdyh3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGNyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIC8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcbiAgICAvLyBpbnN0YW5jZS4gIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIGxvY2FsZSBjb25maWd1cmF0aW9uXG4gICAgLy8gdmFyaWFibGVzIGZvciB0aGlzIGluc3RhbmNlLlxuICAgIGZ1bmN0aW9uIGxvY2FsZShrZXkpIHtcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGdldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgdmFyIE1TX1BFUl9TRUNPTkQgPSAxMDAwLFxuICAgICAgICBNU19QRVJfTUlOVVRFID0gNjAgKiBNU19QRVJfU0VDT05ELFxuICAgICAgICBNU19QRVJfSE9VUiA9IDYwICogTVNfUEVSX01JTlVURSxcbiAgICAgICAgTVNfUEVSXzQwMF9ZRUFSUyA9ICgzNjUgKiA0MDAgKyA5NykgKiAyNCAqIE1TX1BFUl9IT1VSO1xuXG4gICAgLy8gYWN0dWFsIG1vZHVsbyAtIGhhbmRsZXMgbmVnYXRpdmUgbnVtYmVycyAoZm9yIGRhdGVzIGJlZm9yZSAxOTcwKTpcbiAgICBmdW5jdGlvbiBtb2QkMShkaXZpZGVuZCwgZGl2aXNvcikge1xuICAgICAgICByZXR1cm4gKChkaXZpZGVuZCAlIGRpdmlzb3IpICsgZGl2aXNvcikgJSBkaXZpc29yO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsU3RhcnRPZkRhdGUoeSwgbSwgZCkge1xuICAgICAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHkgKyA0MDAsIG0sIGQpIC0gTVNfUEVSXzQwMF9ZRUFSUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtLCBkKS52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1dGNTdGFydE9mRGF0ZSh5LCBtLCBkKSB7XG4gICAgICAgIC8vIERhdGUuVVRDIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDApIHtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5VVEMoeSArIDQwMCwgbSwgZCkgLSBNU19QRVJfNDAwX1lFQVJTO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIERhdGUuVVRDKHksIG0sIGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRPZih1bml0cykge1xuICAgICAgICB2YXIgdGltZSwgc3RhcnRPZkRhdGU7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJyB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRPZkRhdGUgPSB0aGlzLl9pc1VUQyA/IHV0Y1N0YXJ0T2ZEYXRlIDogbG9jYWxTdGFydE9mRGF0ZTtcblxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIDAsIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpIC0gKHRoaXMubW9udGgoKSAlIDMpLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWVhcigpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSgpIC0gdGhpcy53ZWVrZGF5KClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUoKSAtICh0aGlzLmlzb1dlZWtkYXkoKSAtIDEpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgdGhpcy5kYXRlKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHRoaXMuX2QudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIHRpbWUgLT0gbW9kJDEoXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgKyAodGhpcy5faXNVVEMgPyAwIDogdGhpcy51dGNPZmZzZXQoKSAqIE1TX1BFUl9NSU5VVEUpLFxuICAgICAgICAgICAgICAgICAgICBNU19QRVJfSE9VUlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC09IG1vZCQxKHRpbWUsIE1TX1BFUl9NSU5VVEUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSAtPSBtb2QkMSh0aW1lLCBNU19QRVJfU0VDT05EKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Quc2V0VGltZSh0aW1lKTtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRPZih1bml0cykge1xuICAgICAgICB2YXIgdGltZSwgc3RhcnRPZkRhdGU7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJyB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRPZkRhdGUgPSB0aGlzLl9pc1VUQyA/IHV0Y1N0YXJ0T2ZEYXRlIDogbG9jYWxTdGFydE9mRGF0ZTtcblxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCkgKyAxLCAwLCAxKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgICAgICAgICB0aW1lID1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZkRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSAtICh0aGlzLm1vbnRoKCkgJSAzKSArIDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZSh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpICsgMSwgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgdGltZSA9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUoKSAtIHRoaXMud2Vla2RheSgpICsgN1xuICAgICAgICAgICAgICAgICAgICApIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxuICAgICAgICAgICAgICAgIHRpbWUgPVxuICAgICAgICAgICAgICAgICAgICBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWVhcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlKCkgLSAodGhpcy5pc29XZWVrZGF5KCkgLSAxKSArIDdcbiAgICAgICAgICAgICAgICAgICAgKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpICsgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHRoaXMuX2QudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIHRpbWUgKz1cbiAgICAgICAgICAgICAgICAgICAgTVNfUEVSX0hPVVIgLVxuICAgICAgICAgICAgICAgICAgICBtb2QkMShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgKyAodGhpcy5faXNVVEMgPyAwIDogdGhpcy51dGNPZmZzZXQoKSAqIE1TX1BFUl9NSU5VVEUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTVNfUEVSX0hPVVJcbiAgICAgICAgICAgICAgICAgICAgKSAtXG4gICAgICAgICAgICAgICAgICAgIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lICs9IE1TX1BFUl9NSU5VVEUgLSBtb2QkMSh0aW1lLCBNU19QRVJfTUlOVVRFKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lICs9IE1TX1BFUl9TRUNPTkQgLSBtb2QkMSh0aW1lLCBNU19QRVJfU0VDT05EKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kLnNldFRpbWUodGltZSk7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsdWVPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2QudmFsdWVPZigpIC0gKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaXgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9EYXRlKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcztcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG0ueWVhcigpLFxuICAgICAgICAgICAgbS5tb250aCgpLFxuICAgICAgICAgICAgbS5kYXRlKCksXG4gICAgICAgICAgICBtLmhvdXIoKSxcbiAgICAgICAgICAgIG0ubWludXRlKCksXG4gICAgICAgICAgICBtLnNlY29uZCgpLFxuICAgICAgICAgICAgbS5taWxsaXNlY29uZCgpLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvT2JqZWN0KCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyczogbS55ZWFyKCksXG4gICAgICAgICAgICBtb250aHM6IG0ubW9udGgoKSxcbiAgICAgICAgICAgIGRhdGU6IG0uZGF0ZSgpLFxuICAgICAgICAgICAgaG91cnM6IG0uaG91cnMoKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IG0ubWludXRlcygpLFxuICAgICAgICAgICAgc2Vjb25kczogbS5zZWNvbmRzKCksXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IG0ubWlsbGlzZWNvbmRzKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICAvLyBuZXcgRGF0ZShOYU4pLnRvSlNPTigpID09PSBudWxsXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMudG9JU09TdHJpbmcoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZCQyKCkge1xuICAgICAgICByZXR1cm4gaXNWYWxpZCh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzaW5nRmxhZ3MoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52YWxpZEF0KCkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0aW9uRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLl9pLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLl9mLFxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXG4gICAgICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXG4gICAgICAgICAgICBzdHJpY3Q6IHRoaXMuX3N0cmljdCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTicsIDAsIDAsICdlcmFBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OJywgMCwgMCwgJ2VyYUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignTk5OJywgMCwgMCwgJ2VyYUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignTk5OTicsIDAsIDAsICdlcmFOYW1lJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OTk5OJywgMCwgMCwgJ2VyYU5hcnJvdycpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3knLCAxXSwgJ3lvJywgJ2VyYVllYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigneScsIFsneXknLCAyXSwgMCwgJ2VyYVllYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigneScsIFsneXl5JywgM10sIDAsICdlcmFZZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3l5eXknLCA0XSwgMCwgJ2VyYVllYXInKTtcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ04nLCBtYXRjaEVyYUFiYnIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ05OJywgbWF0Y2hFcmFBYmJyKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTk4nLCBtYXRjaEVyYUFiYnIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ05OTk4nLCBtYXRjaEVyYU5hbWUpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ05OTk5OJywgbWF0Y2hFcmFOYXJyb3cpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihcbiAgICAgICAgWydOJywgJ05OJywgJ05OTicsICdOTk5OJywgJ05OTk5OJ10sXG4gICAgICAgIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBlcmEgPSBjb25maWcuX2xvY2FsZS5lcmFzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgICAgICBpZiAoZXJhKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZXJhID0gZXJhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkRXJhID0gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgYWRkUmVnZXhUb2tlbigneScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3l5JywgbWF0Y2hVbnNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbigneXl5JywgbWF0Y2hVbnNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbigneXl5eScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3lvJywgbWF0Y2hFcmFZZWFyT3JkaW5hbCk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsneScsICd5eScsICd5eXknLCAneXl5eSddLCBZRUFSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsneW8nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmIChjb25maWcuX2xvY2FsZS5fZXJhWWVhck9yZGluYWxSZWdleCkge1xuICAgICAgICAgICAgbWF0Y2ggPSBpbnB1dC5tYXRjaChjb25maWcuX2xvY2FsZS5fZXJhWWVhck9yZGluYWxSZWdleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLl9sb2NhbGUuZXJhWWVhck9yZGluYWxQYXJzZSkge1xuICAgICAgICAgICAgYXJyYXlbWUVBUl0gPSBjb25maWcuX2xvY2FsZS5lcmFZZWFyT3JkaW5hbFBhcnNlKGlucHV0LCBtYXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUVyYXMobSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5fZXJhcyB8fCBnZXRMb2NhbGUoJ2VuJykuX2VyYXM7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBlcmFzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZXJhc1tpXS5zaW5jZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGhvb2tzKGVyYXNbaV0uc2luY2UpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgICAgICAgICAgICAgICBlcmFzW2ldLnNpbmNlID0gZGF0ZS52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBlcmFzW2ldLnVudGlsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS51bnRpbCA9ICtJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJ1bmNhdGUgdGltZVxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gaG9va3MoZXJhc1tpXS51bnRpbCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICBlcmFzW2ldLnVudGlsID0gZGF0ZS52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcmFzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZUVyYXNQYXJzZShlcmFOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5lcmFzKCksXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgYWJicixcbiAgICAgICAgICAgIG5hcnJvdztcbiAgICAgICAgZXJhTmFtZSA9IGVyYU5hbWUudG9VcHBlckNhc2UoKTtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIG5hbWUgPSBlcmFzW2ldLm5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGFiYnIgPSBlcmFzW2ldLmFiYnIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIG5hcnJvdyA9IGVyYXNbaV0ubmFycm93LnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTk4nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdOTk4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFiYnIgPT09IGVyYU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ05OTk4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IGVyYU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ05OTk5OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXJyb3cgPT09IGVyYU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoW25hbWUsIGFiYnIsIG5hcnJvd10uaW5kZXhPZihlcmFOYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVFcmFzQ29udmVydFllYXIoZXJhLCB5ZWFyKSB7XG4gICAgICAgIHZhciBkaXIgPSBlcmEuc2luY2UgPD0gZXJhLnVudGlsID8gKzEgOiAtMTtcbiAgICAgICAgaWYgKHllYXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGhvb2tzKGVyYS5zaW5jZSkueWVhcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhvb2tzKGVyYS5zaW5jZSkueWVhcigpICsgKHllYXIgLSBlcmEub2Zmc2V0KSAqIGRpcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVyYU5hbWUoKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgIGVyYXMgPSB0aGlzLmxvY2FsZURhdGEoKS5lcmFzKCk7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBlcmFzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgLy8gdHJ1bmNhdGUgdGltZVxuICAgICAgICAgICAgdmFsID0gdGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpLnZhbHVlT2YoKTtcblxuICAgICAgICAgICAgaWYgKGVyYXNbaV0uc2luY2UgPD0gdmFsICYmIHZhbCA8PSBlcmFzW2ldLnVudGlsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnVudGlsIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS5zaW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJhTmFycm93KCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnNpbmNlIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLm5hcnJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnVudGlsIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS5zaW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLm5hcnJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcmFBYmJyKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnNpbmNlIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLmFiYnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5hYmJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVyYVllYXIoKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgIGVyYXMgPSB0aGlzLmxvY2FsZURhdGEoKS5lcmFzKCk7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBlcmFzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgZGlyID0gZXJhc1tpXS5zaW5jZSA8PSBlcmFzW2ldLnVudGlsID8gKzEgOiAtMTtcblxuICAgICAgICAgICAgLy8gdHJ1bmNhdGUgdGltZVxuICAgICAgICAgICAgdmFsID0gdGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpLnZhbHVlT2YoKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChlcmFzW2ldLnNpbmNlIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS51bnRpbCkgfHxcbiAgICAgICAgICAgICAgICAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy55ZWFyKCkgLSBob29rcyhlcmFzW2ldLnNpbmNlKS55ZWFyKCkpICogZGlyICtcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS5vZmZzZXRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVyYXNOYW1lUmVnZXgoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfZXJhc05hbWVSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlRXJhc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gdGhpcy5fZXJhc05hbWVSZWdleCA6IHRoaXMuX2VyYXNSZWdleDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcmFzQWJiclJlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX2VyYXNBYmJyUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZUVyYXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IHRoaXMuX2VyYXNBYmJyUmVnZXggOiB0aGlzLl9lcmFzUmVnZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJhc05hcnJvd1JlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX2VyYXNOYXJyb3dSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlRXJhc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gdGhpcy5fZXJhc05hcnJvd1JlZ2V4IDogdGhpcy5fZXJhc1JlZ2V4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoRXJhQWJicihpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZXJhc0FiYnJSZWdleChpc1N0cmljdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hFcmFOYW1lKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5lcmFzTmFtZVJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaEVyYU5hcnJvdyhpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZXJhc05hcnJvd1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaEVyYVllYXJPcmRpbmFsKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fZXJhWWVhck9yZGluYWxSZWdleCB8fCBtYXRjaFVuc2lnbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVFcmFzUGFyc2UoKSB7XG4gICAgICAgIHZhciBhYmJyUGllY2VzID0gW10sXG4gICAgICAgICAgICBuYW1lUGllY2VzID0gW10sXG4gICAgICAgICAgICBuYXJyb3dQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIGVyYXNOYW1lLFxuICAgICAgICAgICAgZXJhc0FiYnIsXG4gICAgICAgICAgICBlcmFzTmFycm93LFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMuZXJhcygpO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBlcmFzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgZXJhc05hbWUgPSByZWdleEVzY2FwZShlcmFzW2ldLm5hbWUpO1xuICAgICAgICAgICAgZXJhc0FiYnIgPSByZWdleEVzY2FwZShlcmFzW2ldLmFiYnIpO1xuICAgICAgICAgICAgZXJhc05hcnJvdyA9IHJlZ2V4RXNjYXBlKGVyYXNbaV0ubmFycm93KTtcblxuICAgICAgICAgICAgbmFtZVBpZWNlcy5wdXNoKGVyYXNOYW1lKTtcbiAgICAgICAgICAgIGFiYnJQaWVjZXMucHVzaChlcmFzQWJicik7XG4gICAgICAgICAgICBuYXJyb3dQaWVjZXMucHVzaChlcmFzTmFycm93KTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goZXJhc05hbWUpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChlcmFzQWJicik7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGVyYXNOYXJyb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZXJhc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9lcmFzTmFtZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbmFtZVBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX2VyYXNBYmJyUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBhYmJyUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fZXJhc05hcnJvd1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBuYXJyb3dQaWVjZXMuam9pbignfCcpICsgJyknLFxuICAgICAgICAgICAgJ2knXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydnZycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ0dHJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2Vla1llYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4odG9rZW4sIGdldHRlcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XG4gICAgfVxuXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgJ3dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICdpc29XZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0dHJywgJ2lzb1dlZWtZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdHJywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2cnLCBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignZ2cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignR0dHRycsIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnJywgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oXG4gICAgICAgIFsnZ2dnZycsICdnZ2dnZycsICdHR0dHJywgJ0dHR0dHJ10sXG4gICAgICAgIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2cnLCAnR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW5dID0gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICB0aGlzLndlZWsoKSxcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgpICsgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG95XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICB0aGlzLmlzb1dlZWsoKSxcbiAgICAgICAgICAgIHRoaXMuaXNvV2Vla2RheSgpLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhcigpIHtcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luSVNPV2Vla1llYXIoKSB7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLmlzb1dlZWtZZWFyKCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyKCkge1xuICAgICAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2Vla3NJbldlZWtZZWFyKCkge1xuICAgICAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMud2Vla1llYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFySGVscGVyKGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla3NUYXJnZXQ7XG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gd2Vla09mWWVhcih0aGlzLCBkb3csIGRveSkueWVhcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcbiAgICAgICAgICAgIGlmICh3ZWVrID4gd2Vla3NUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICB3ZWVrID0gd2Vla3NUYXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2V0V2Vla0FsbC5jYWxsKHRoaXMsIGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXZWVrQWxsKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoZGF5T2ZZZWFyRGF0YS55ZWFyLCAwLCBkYXlPZlllYXJEYXRhLmRheU9mWWVhcik7XG5cbiAgICAgICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XG4gICAgICAgIHRoaXMubW9udGgoZGF0ZS5nZXRVVENNb250aCgpKTtcbiAgICAgICAgdGhpcy5kYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAnUW8nLCAncXVhcnRlcicpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUScsIG1hdGNoMSk7XG4gICAgYWRkUGFyc2VUb2tlbignUScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gKHRvSW50KGlucHV0KSAtIDEpICogMztcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFF1YXJ0ZXIoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGxcbiAgICAgICAgICAgID8gTWF0aC5jZWlsKCh0aGlzLm1vbnRoKCkgKyAxKSAvIDMpXG4gICAgICAgICAgICA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgKHRoaXMubW9udGgoKSAlIDMpKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignRCcsIFsnREQnLCAyXSwgJ0RvJywgJ2RhdGUnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0QnLCBtYXRjaDF0bzIsIG1hdGNoMXRvMk5vTGVhZGluZ1plcm8pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgICAgICByZXR1cm4gaXNTdHJpY3RcbiAgICAgICAgICAgID8gbG9jYWxlLl9kYXlPZk1vbnRoT3JkaW5hbFBhcnNlIHx8IGxvY2FsZS5fb3JkaW5hbFBhcnNlXG4gICAgICAgICAgICA6IGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdKTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXREYXlPZk1vbnRoID0gbWFrZUdldFNldCgnRGF0ZScsIHRydWUpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhcihpbnB1dCkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyID1cbiAgICAgICAgICAgIE1hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTVcbiAgICAgICAgICAgICkgKyAxO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKGlucHV0IC0gZGF5T2ZZZWFyLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdtJywgbWF0Y2gxdG8yLCBtYXRjaDF0bzJIYXNaZXJvKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsIG1hdGNoMXRvMiwgbWF0Y2gxdG8ySGFzWmVybyk7XG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTUycsIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcbiAgICB9KTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1MnLCBtYXRjaDF0bzMsIG1hdGNoMSk7XG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCBtYXRjaDF0bzMsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignU1NTJywgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG4gICAgdmFyIHRva2VuLCBnZXRTZXRNaWxsaXNlY29uZDtcbiAgICBmb3IgKHRva2VuID0gJ1NTU1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFJlZ2V4VG9rZW4odG9rZW4sIG1hdGNoVW5zaWduZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01JTExJU0VDT05EXSA9IHRvSW50KCgnMC4nICsgaW5wdXQpICogMTAwMCk7XG4gICAgfVxuXG4gICAgZm9yICh0b2tlbiA9ICdTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBwYXJzZU1zKTtcbiAgICB9XG5cbiAgICBnZXRTZXRNaWxsaXNlY29uZCA9IG1ha2VHZXRTZXQoJ01pbGxpc2Vjb25kcycsIGZhbHNlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCd6JywgMCwgMCwgJ3pvbmVBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3p6JywgMCwgMCwgJ3pvbmVOYW1lJyk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRab25lQWJicigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ0Nvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lJyA6ICcnO1xuICAgIH1cblxuICAgIHZhciBwcm90byA9IE1vbWVudC5wcm90b3R5cGU7XG5cbiAgICBwcm90by5hZGQgPSBhZGQ7XG4gICAgcHJvdG8uY2FsZW5kYXIgPSBjYWxlbmRhciQxO1xuICAgIHByb3RvLmNsb25lID0gY2xvbmU7XG4gICAgcHJvdG8uZGlmZiA9IGRpZmY7XG4gICAgcHJvdG8uZW5kT2YgPSBlbmRPZjtcbiAgICBwcm90by5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgcHJvdG8uZnJvbSA9IGZyb207XG4gICAgcHJvdG8uZnJvbU5vdyA9IGZyb21Ob3c7XG4gICAgcHJvdG8udG8gPSB0bztcbiAgICBwcm90by50b05vdyA9IHRvTm93O1xuICAgIHByb3RvLmdldCA9IHN0cmluZ0dldDtcbiAgICBwcm90by5pbnZhbGlkQXQgPSBpbnZhbGlkQXQ7XG4gICAgcHJvdG8uaXNBZnRlciA9IGlzQWZ0ZXI7XG4gICAgcHJvdG8uaXNCZWZvcmUgPSBpc0JlZm9yZTtcbiAgICBwcm90by5pc0JldHdlZW4gPSBpc0JldHdlZW47XG4gICAgcHJvdG8uaXNTYW1lID0gaXNTYW1lO1xuICAgIHByb3RvLmlzU2FtZU9yQWZ0ZXIgPSBpc1NhbWVPckFmdGVyO1xuICAgIHByb3RvLmlzU2FtZU9yQmVmb3JlID0gaXNTYW1lT3JCZWZvcmU7XG4gICAgcHJvdG8uaXNWYWxpZCA9IGlzVmFsaWQkMjtcbiAgICBwcm90by5sYW5nID0gbGFuZztcbiAgICBwcm90by5sb2NhbGUgPSBsb2NhbGU7XG4gICAgcHJvdG8ubG9jYWxlRGF0YSA9IGxvY2FsZURhdGE7XG4gICAgcHJvdG8ubWF4ID0gcHJvdG90eXBlTWF4O1xuICAgIHByb3RvLm1pbiA9IHByb3RvdHlwZU1pbjtcbiAgICBwcm90by5wYXJzaW5nRmxhZ3MgPSBwYXJzaW5nRmxhZ3M7XG4gICAgcHJvdG8uc2V0ID0gc3RyaW5nU2V0O1xuICAgIHByb3RvLnN0YXJ0T2YgPSBzdGFydE9mO1xuICAgIHByb3RvLnN1YnRyYWN0ID0gc3VidHJhY3Q7XG4gICAgcHJvdG8udG9BcnJheSA9IHRvQXJyYXk7XG4gICAgcHJvdG8udG9PYmplY3QgPSB0b09iamVjdDtcbiAgICBwcm90by50b0RhdGUgPSB0b0RhdGU7XG4gICAgcHJvdG8udG9JU09TdHJpbmcgPSB0b0lTT1N0cmluZztcbiAgICBwcm90by5pbnNwZWN0ID0gaW5zcGVjdDtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLmZvciAhPSBudWxsKSB7XG4gICAgICAgIHByb3RvW1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICdNb21lbnQ8JyArIHRoaXMuZm9ybWF0KCkgKyAnPic7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHByb3RvLnRvSlNPTiA9IHRvSlNPTjtcbiAgICBwcm90by50b1N0cmluZyA9IHRvU3RyaW5nO1xuICAgIHByb3RvLnVuaXggPSB1bml4O1xuICAgIHByb3RvLnZhbHVlT2YgPSB2YWx1ZU9mO1xuICAgIHByb3RvLmNyZWF0aW9uRGF0YSA9IGNyZWF0aW9uRGF0YTtcbiAgICBwcm90by5lcmFOYW1lID0gZ2V0RXJhTmFtZTtcbiAgICBwcm90by5lcmFOYXJyb3cgPSBnZXRFcmFOYXJyb3c7XG4gICAgcHJvdG8uZXJhQWJiciA9IGdldEVyYUFiYnI7XG4gICAgcHJvdG8uZXJhWWVhciA9IGdldEVyYVllYXI7XG4gICAgcHJvdG8ueWVhciA9IGdldFNldFllYXI7XG4gICAgcHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XG4gICAgcHJvdG8ud2Vla1llYXIgPSBnZXRTZXRXZWVrWWVhcjtcbiAgICBwcm90by5pc29XZWVrWWVhciA9IGdldFNldElTT1dlZWtZZWFyO1xuICAgIHByb3RvLnF1YXJ0ZXIgPSBwcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG4gICAgcHJvdG8ubW9udGggPSBnZXRTZXRNb250aDtcbiAgICBwcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xuICAgIHByb3RvLndlZWsgPSBwcm90by53ZWVrcyA9IGdldFNldFdlZWs7XG4gICAgcHJvdG8uaXNvV2VlayA9IHByb3RvLmlzb1dlZWtzID0gZ2V0U2V0SVNPV2VlaztcbiAgICBwcm90by53ZWVrc0luWWVhciA9IGdldFdlZWtzSW5ZZWFyO1xuICAgIHByb3RvLndlZWtzSW5XZWVrWWVhciA9IGdldFdlZWtzSW5XZWVrWWVhcjtcbiAgICBwcm90by5pc29XZWVrc0luWWVhciA9IGdldElTT1dlZWtzSW5ZZWFyO1xuICAgIHByb3RvLmlzb1dlZWtzSW5JU09XZWVrWWVhciA9IGdldElTT1dlZWtzSW5JU09XZWVrWWVhcjtcbiAgICBwcm90by5kYXRlID0gZ2V0U2V0RGF5T2ZNb250aDtcbiAgICBwcm90by5kYXkgPSBwcm90by5kYXlzID0gZ2V0U2V0RGF5T2ZXZWVrO1xuICAgIHByb3RvLndlZWtkYXkgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG4gICAgcHJvdG8uaXNvV2Vla2RheSA9IGdldFNldElTT0RheU9mV2VlaztcbiAgICBwcm90by5kYXlPZlllYXIgPSBnZXRTZXREYXlPZlllYXI7XG4gICAgcHJvdG8uaG91ciA9IHByb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcbiAgICBwcm90by5taW51dGUgPSBwcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xuICAgIHByb3RvLnNlY29uZCA9IHByb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XG4gICAgcHJvdG8ubWlsbGlzZWNvbmQgPSBwcm90by5taWxsaXNlY29uZHMgPSBnZXRTZXRNaWxsaXNlY29uZDtcbiAgICBwcm90by51dGNPZmZzZXQgPSBnZXRTZXRPZmZzZXQ7XG4gICAgcHJvdG8udXRjID0gc2V0T2Zmc2V0VG9VVEM7XG4gICAgcHJvdG8ubG9jYWwgPSBzZXRPZmZzZXRUb0xvY2FsO1xuICAgIHByb3RvLnBhcnNlWm9uZSA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xuICAgIHByb3RvLmhhc0FsaWduZWRIb3VyT2Zmc2V0ID0gaGFzQWxpZ25lZEhvdXJPZmZzZXQ7XG4gICAgcHJvdG8uaXNEU1QgPSBpc0RheWxpZ2h0U2F2aW5nVGltZTtcbiAgICBwcm90by5pc0xvY2FsID0gaXNMb2NhbDtcbiAgICBwcm90by5pc1V0Y09mZnNldCA9IGlzVXRjT2Zmc2V0O1xuICAgIHByb3RvLmlzVXRjID0gaXNVdGM7XG4gICAgcHJvdG8uaXNVVEMgPSBpc1V0YztcbiAgICBwcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xuICAgIHByb3RvLnpvbmVOYW1lID0gZ2V0Wm9uZU5hbWU7XG4gICAgcHJvdG8uZGF0ZXMgPSBkZXByZWNhdGUoXG4gICAgICAgICdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsXG4gICAgICAgIGdldFNldERheU9mTW9udGhcbiAgICApO1xuICAgIHByb3RvLm1vbnRocyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbnRocyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgbW9udGggaW5zdGVhZCcsXG4gICAgICAgIGdldFNldE1vbnRoXG4gICAgKTtcbiAgICBwcm90by55ZWFycyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLFxuICAgICAgICBnZXRTZXRZZWFyXG4gICAgKTtcbiAgICBwcm90by56b25lID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3Mvem9uZS8nLFxuICAgICAgICBnZXRTZXRab25lXG4gICAgKTtcbiAgICBwcm90by5pc0RTVFNoaWZ0ZWQgPSBkZXByZWNhdGUoXG4gICAgICAgICdpc0RTVFNoaWZ0ZWQgaXMgZGVwcmVjYXRlZC4gU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvZHN0LXNoaWZ0ZWQvIGZvciBtb3JlIGluZm9ybWF0aW9uJyxcbiAgICAgICAgaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkXG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVuaXgoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW5ab25lKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvJDEgPSBMb2NhbGUucHJvdG90eXBlO1xuXG4gICAgcHJvdG8kMS5jYWxlbmRhciA9IGNhbGVuZGFyO1xuICAgIHByb3RvJDEubG9uZ0RhdGVGb3JtYXQgPSBsb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90byQxLmludmFsaWREYXRlID0gaW52YWxpZERhdGU7XG4gICAgcHJvdG8kMS5vcmRpbmFsID0gb3JkaW5hbDtcbiAgICBwcm90byQxLnByZXBhcnNlID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvJDEucG9zdGZvcm1hdCA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90byQxLnJlbGF0aXZlVGltZSA9IHJlbGF0aXZlVGltZTtcbiAgICBwcm90byQxLnBhc3RGdXR1cmUgPSBwYXN0RnV0dXJlO1xuICAgIHByb3RvJDEuc2V0ID0gc2V0O1xuICAgIHByb3RvJDEuZXJhcyA9IGxvY2FsZUVyYXM7XG4gICAgcHJvdG8kMS5lcmFzUGFyc2UgPSBsb2NhbGVFcmFzUGFyc2U7XG4gICAgcHJvdG8kMS5lcmFzQ29udmVydFllYXIgPSBsb2NhbGVFcmFzQ29udmVydFllYXI7XG4gICAgcHJvdG8kMS5lcmFzQWJiclJlZ2V4ID0gZXJhc0FiYnJSZWdleDtcbiAgICBwcm90byQxLmVyYXNOYW1lUmVnZXggPSBlcmFzTmFtZVJlZ2V4O1xuICAgIHByb3RvJDEuZXJhc05hcnJvd1JlZ2V4ID0gZXJhc05hcnJvd1JlZ2V4O1xuXG4gICAgcHJvdG8kMS5tb250aHMgPSBsb2NhbGVNb250aHM7XG4gICAgcHJvdG8kMS5tb250aHNTaG9ydCA9IGxvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvJDEubW9udGhzUGFyc2UgPSBsb2NhbGVNb250aHNQYXJzZTtcbiAgICBwcm90byQxLm1vbnRoc1JlZ2V4ID0gbW9udGhzUmVnZXg7XG4gICAgcHJvdG8kMS5tb250aHNTaG9ydFJlZ2V4ID0gbW9udGhzU2hvcnRSZWdleDtcbiAgICBwcm90byQxLndlZWsgPSBsb2NhbGVXZWVrO1xuICAgIHByb3RvJDEuZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcbiAgICBwcm90byQxLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XG5cbiAgICBwcm90byQxLndlZWtkYXlzID0gbG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG8kMS53ZWVrZGF5c01pbiA9IGxvY2FsZVdlZWtkYXlzTWluO1xuICAgIHByb3RvJDEud2Vla2RheXNTaG9ydCA9IGxvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG8kMS53ZWVrZGF5c1BhcnNlID0gbG9jYWxlV2Vla2RheXNQYXJzZTtcblxuICAgIHByb3RvJDEud2Vla2RheXNSZWdleCA9IHdlZWtkYXlzUmVnZXg7XG4gICAgcHJvdG8kMS53ZWVrZGF5c1Nob3J0UmVnZXggPSB3ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgcHJvdG8kMS53ZWVrZGF5c01pblJlZ2V4ID0gd2Vla2RheXNNaW5SZWdleDtcblxuICAgIHByb3RvJDEuaXNQTSA9IGxvY2FsZUlzUE07XG4gICAgcHJvdG8kMS5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xuXG4gICAgZnVuY3Rpb24gZ2V0JDEoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xuICAgICAgICB2YXIgbG9jYWxlID0gZ2V0TG9jYWxlKCksXG4gICAgICAgICAgICB1dGMgPSBjcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCBmaWVsZCkge1xuICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXQkMShmb3JtYXQsIGluZGV4LCBmaWVsZCwgJ21vbnRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgb3V0W2ldID0gZ2V0JDEoZm9ybWF0LCBpLCBmaWVsZCwgJ21vbnRoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvLyAoKVxuICAgIC8vICg1KVxuICAgIC8vIChmbXQsIDUpXG4gICAgLy8gKGZtdClcbiAgICAvLyAodHJ1ZSlcbiAgICAvLyAodHJ1ZSwgNSlcbiAgICAvLyAodHJ1ZSwgZm10LCA1KVxuICAgIC8vICh0cnVlLCBmbXQpXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxlU29ydGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGxvY2FsZVNvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpLFxuICAgICAgICAgICAgc2hpZnQgPSBsb2NhbGVTb3J0ZWQgPyBsb2NhbGUuX3dlZWsuZG93IDogMCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBvdXQgPSBbXTtcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgKGkgKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRocyhmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRoc1Nob3J0KGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHNTaG9ydCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5cyhsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNTaG9ydChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5c01pbihsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNNaW4nKTtcbiAgICB9XG5cbiAgICBnZXRTZXRHbG9iYWxMb2NhbGUoJ2VuJywge1xuICAgICAgICBlcmFzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2luY2U6ICcwMDAxLTAxLTAxJyxcbiAgICAgICAgICAgICAgICB1bnRpbDogK0luZmluaXR5LFxuICAgICAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnQW5ubyBEb21pbmknLFxuICAgICAgICAgICAgICAgIG5hcnJvdzogJ0FEJyxcbiAgICAgICAgICAgICAgICBhYmJyOiAnQUQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5jZTogJzAwMDAtMTItMzEnLFxuICAgICAgICAgICAgICAgIHVudGlsOiAtSW5maW5pdHksXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdCZWZvcmUgQ2hyaXN0JyxcbiAgICAgICAgICAgICAgICBuYXJyb3c6ICdCQycsXG4gICAgICAgICAgICAgICAgYWJicjogJ0JDJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxuICAgICAgICBvcmRpbmFsOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwLFxuICAgICAgICAgICAgICAgIG91dHB1dCA9XG4gICAgICAgICAgICAgICAgICAgIHRvSW50KChudW1iZXIgJSAxMDApIC8gMTApID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICd0aCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYiA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBiID09PSAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBiID09PSAzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdyZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RoJztcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cbiAgICBob29rcy5sYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLFxuICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGVcbiAgICApO1xuICAgIGhvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsXG4gICAgICAgIGdldExvY2FsZVxuICAgICk7XG5cbiAgICB2YXIgbWF0aEFicyA9IE1hdGguYWJzO1xuXG4gICAgZnVuY3Rpb24gYWJzKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xuICAgICAgICB0aGlzLl9kYXlzID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcbiAgICAgICAgdGhpcy5fbW9udGhzID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XG4gICAgICAgIGRhdGEuc2Vjb25kcyA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcbiAgICAgICAgZGF0YS5taW51dGVzID0gbWF0aEFicyhkYXRhLm1pbnV0ZXMpO1xuICAgICAgICBkYXRhLmhvdXJzID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcbiAgICAgICAgZGF0YS5tb250aHMgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcbiAgICAgICAgZGF0YS55ZWFycyA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3VidHJhY3QkMShkdXJhdGlvbiwgaW5wdXQsIHZhbHVlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcblxuICAgICAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XG4gICAgICAgIGR1cmF0aW9uLl9kYXlzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XG5cbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gYWRkJDEoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgMSk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdCQxKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYWRkU3VidHJhY3QkMSh0aGlzLCBpbnB1dCwgdmFsdWUsIC0xKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNDZWlsKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1YmJsZSgpIHtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzLFxuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzLFxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuX2RhdGEsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgeWVhcnMsXG4gICAgICAgICAgICBtb250aHNGcm9tRGF5cztcblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XG4gICAgICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPj0gMCAmJiBkYXlzID49IDAgJiYgbW9udGhzID49IDApIHx8XG4gICAgICAgICAgICAgICAgKG1pbGxpc2Vjb25kcyA8PSAwICYmIGRheXMgPD0gMCAmJiBtb250aHMgPD0gMClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgKz0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzKSArIGRheXMpICogODY0ZTU7XG4gICAgICAgICAgICBkYXlzID0gMDtcbiAgICAgICAgICAgIG1vbnRocyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgYnViYmxlcyB1cCB2YWx1ZXMsIHNlZSB0aGUgdGVzdHMgZm9yXG4gICAgICAgIC8vIGV4YW1wbGVzIG9mIHdoYXQgdGhhdCBtZWFucy5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xuXG4gICAgICAgIHNlY29uZHMgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzID0gc2Vjb25kcyAlIDYwO1xuXG4gICAgICAgIG1pbnV0ZXMgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgPSBtaW51dGVzICUgNjA7XG5cbiAgICAgICAgaG91cnMgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xuICAgICAgICBkYXRhLmhvdXJzID0gaG91cnMgJSAyNDtcblxuICAgICAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcbiAgICAgICAgbW9udGhzRnJvbURheXMgPSBhYnNGbG9vcihkYXlzVG9Nb250aHMoZGF5cykpO1xuICAgICAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XG4gICAgICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgICAgICBtb250aHMgJT0gMTI7XG5cbiAgICAgICAgZGF0YS5kYXlzID0gZGF5cztcbiAgICAgICAgZGF0YS5tb250aHMgPSBtb250aHM7XG4gICAgICAgIGRhdGEueWVhcnMgPSB5ZWFycztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzVG9Nb250aHMoZGF5cykge1xuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDEyIG1vbnRocyA9PT0gNDgwMFxuICAgICAgICByZXR1cm4gKGRheXMgKiA0ODAwKSAvIDE0NjA5NztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aHNUb0RheXMobW9udGhzKSB7XG4gICAgICAgIC8vIHRoZSByZXZlcnNlIG9mIGRheXNUb01vbnRoc1xuICAgICAgICByZXR1cm4gKG1vbnRocyAqIDE0NjA5NykgLyA0ODAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzKHVuaXRzKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRheXMsXG4gICAgICAgICAgICBtb250aHMsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgaWYgKHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAncXVhcnRlcicgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyArIGRheXNUb01vbnRocyhkYXlzKTtcbiAgICAgICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aHM7XG4gICAgICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aHMgLyAzO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhzIC8gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIE1hdGgucm91bmQobW9udGhzVG9EYXlzKHRoaXMuX21vbnRocykpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyAvIDcgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheXMgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheXMgKiAyNCArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheXMgKiAxNDQwICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUFzKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpLFxuICAgICAgICBhc1NlY29uZHMgPSBtYWtlQXMoJ3MnKSxcbiAgICAgICAgYXNNaW51dGVzID0gbWFrZUFzKCdtJyksXG4gICAgICAgIGFzSG91cnMgPSBtYWtlQXMoJ2gnKSxcbiAgICAgICAgYXNEYXlzID0gbWFrZUFzKCdkJyksXG4gICAgICAgIGFzV2Vla3MgPSBtYWtlQXMoJ3cnKSxcbiAgICAgICAgYXNNb250aHMgPSBtYWtlQXMoJ00nKSxcbiAgICAgICAgYXNRdWFydGVycyA9IG1ha2VBcygnUScpLFxuICAgICAgICBhc1llYXJzID0gbWFrZUFzKCd5JyksXG4gICAgICAgIHZhbHVlT2YkMSA9IGFzTWlsbGlzZWNvbmRzO1xuXG4gICAgZnVuY3Rpb24gY2xvbmUkMSgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCQyKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzW3VuaXRzICsgJ3MnXSgpIDogTmFOO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VHZXR0ZXIobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5fZGF0YVtuYW1lXSA6IE5hTjtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gbWFrZUdldHRlcignbWlsbGlzZWNvbmRzJyksXG4gICAgICAgIHNlY29uZHMgPSBtYWtlR2V0dGVyKCdzZWNvbmRzJyksXG4gICAgICAgIG1pbnV0ZXMgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyksXG4gICAgICAgIGhvdXJzID0gbWFrZUdldHRlcignaG91cnMnKSxcbiAgICAgICAgZGF5cyA9IG1ha2VHZXR0ZXIoJ2RheXMnKSxcbiAgICAgICAgbW9udGhzID0gbWFrZUdldHRlcignbW9udGhzJyksXG4gICAgICAgIHllYXJzID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuICAgIGZ1bmN0aW9uIHdlZWtzKCkge1xuICAgICAgICByZXR1cm4gYWJzRmxvb3IodGhpcy5kYXlzKCkgLyA3KTtcbiAgICB9XG5cbiAgICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kLFxuICAgICAgICB0aHJlc2hvbGRzID0ge1xuICAgICAgICAgICAgc3M6IDQ0LCAvLyBhIGZldyBzZWNvbmRzIHRvIHNlY29uZHNcbiAgICAgICAgICAgIHM6IDQ1LCAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgICAgICAgICAgbTogNDUsIC8vIG1pbnV0ZXMgdG8gaG91clxuICAgICAgICAgICAgaDogMjIsIC8vIGhvdXJzIHRvIGRheVxuICAgICAgICAgICAgZDogMjYsIC8vIGRheXMgdG8gbW9udGgvd2Vla1xuICAgICAgICAgICAgdzogbnVsbCwgLy8gd2Vla3MgdG8gbW9udGhcbiAgICAgICAgICAgIE06IDExLCAvLyBtb250aHMgdG8geWVhclxuICAgICAgICB9O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLnJlbGF0aXZlVGltZShudW1iZXIgfHwgMSwgISF3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZVRpbWUkMShwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgdGhyZXNob2xkcywgbG9jYWxlKSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKSxcbiAgICAgICAgICAgIHNlY29uZHMgPSByb3VuZChkdXJhdGlvbi5hcygncycpKSxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKSxcbiAgICAgICAgICAgIGhvdXJzID0gcm91bmQoZHVyYXRpb24uYXMoJ2gnKSksXG4gICAgICAgICAgICBkYXlzID0gcm91bmQoZHVyYXRpb24uYXMoJ2QnKSksXG4gICAgICAgICAgICBtb250aHMgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKSxcbiAgICAgICAgICAgIHdlZWtzID0gcm91bmQoZHVyYXRpb24uYXMoJ3cnKSksXG4gICAgICAgICAgICB5ZWFycyA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpLFxuICAgICAgICAgICAgYSA9XG4gICAgICAgICAgICAgICAgKHNlY29uZHMgPD0gdGhyZXNob2xkcy5zcyAmJiBbJ3MnLCBzZWNvbmRzXSkgfHxcbiAgICAgICAgICAgICAgICAoc2Vjb25kcyA8IHRocmVzaG9sZHMucyAmJiBbJ3NzJywgc2Vjb25kc10pIHx8XG4gICAgICAgICAgICAgICAgKG1pbnV0ZXMgPD0gMSAmJiBbJ20nXSkgfHxcbiAgICAgICAgICAgICAgICAobWludXRlcyA8IHRocmVzaG9sZHMubSAmJiBbJ21tJywgbWludXRlc10pIHx8XG4gICAgICAgICAgICAgICAgKGhvdXJzIDw9IDEgJiYgWydoJ10pIHx8XG4gICAgICAgICAgICAgICAgKGhvdXJzIDwgdGhyZXNob2xkcy5oICYmIFsnaGgnLCBob3Vyc10pIHx8XG4gICAgICAgICAgICAgICAgKGRheXMgPD0gMSAmJiBbJ2QnXSkgfHxcbiAgICAgICAgICAgICAgICAoZGF5cyA8IHRocmVzaG9sZHMuZCAmJiBbJ2RkJywgZGF5c10pO1xuXG4gICAgICAgIGlmICh0aHJlc2hvbGRzLncgIT0gbnVsbCkge1xuICAgICAgICAgICAgYSA9XG4gICAgICAgICAgICAgICAgYSB8fFxuICAgICAgICAgICAgICAgICh3ZWVrcyA8PSAxICYmIFsndyddKSB8fFxuICAgICAgICAgICAgICAgICh3ZWVrcyA8IHRocmVzaG9sZHMudyAmJiBbJ3d3Jywgd2Vla3NdKTtcbiAgICAgICAgfVxuICAgICAgICBhID0gYSB8fFxuICAgICAgICAgICAgKG1vbnRocyA8PSAxICYmIFsnTSddKSB8fFxuICAgICAgICAgICAgKG1vbnRocyA8IHRocmVzaG9sZHMuTSAmJiBbJ01NJywgbW9udGhzXSkgfHxcbiAgICAgICAgICAgICh5ZWFycyA8PSAxICYmIFsneSddKSB8fCBbJ3l5JywgeWVhcnNdO1xuXG4gICAgICAgIGFbMl0gPSB3aXRob3V0U3VmZml4O1xuICAgICAgICBhWzNdID0gK3Bvc05lZ0R1cmF0aW9uID4gMDtcbiAgICAgICAgYVs0XSA9IGxvY2FsZTtcbiAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVUaW1lQWdvLmFwcGx5KG51bGwsIGEpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgdGhlIHJvdW5kaW5nIGZ1bmN0aW9uIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbiAgICBmdW5jdGlvbiBnZXRTZXRSZWxhdGl2ZVRpbWVSb3VuZGluZyhyb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmIChyb3VuZGluZ0Z1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByb3VuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJvdW5kaW5nRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJvdW5kID0gcm91bmRpbmdGdW5jdGlvbjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbiAgICBmdW5jdGlvbiBnZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQodGhyZXNob2xkLCBsaW1pdCkge1xuICAgICAgICBpZiAodGhyZXNob2xkc1t0aHJlc2hvbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRocmVzaG9sZHNbdGhyZXNob2xkXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJlc2hvbGRzW3RocmVzaG9sZF0gPSBsaW1pdDtcbiAgICAgICAgaWYgKHRocmVzaG9sZCA9PT0gJ3MnKSB7XG4gICAgICAgICAgICB0aHJlc2hvbGRzLnNzID0gbGltaXQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGh1bWFuaXplKGFyZ1dpdGhTdWZmaXgsIGFyZ1RocmVzaG9sZHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd2l0aFN1ZmZpeCA9IGZhbHNlLFxuICAgICAgICAgICAgdGggPSB0aHJlc2hvbGRzLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgICAgb3V0cHV0O1xuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnV2l0aFN1ZmZpeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGFyZ1RocmVzaG9sZHMgPSBhcmdXaXRoU3VmZml4O1xuICAgICAgICAgICAgYXJnV2l0aFN1ZmZpeCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYXJnV2l0aFN1ZmZpeCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB3aXRoU3VmZml4ID0gYXJnV2l0aFN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFyZ1RocmVzaG9sZHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aCA9IE9iamVjdC5hc3NpZ24oe30sIHRocmVzaG9sZHMsIGFyZ1RocmVzaG9sZHMpO1xuICAgICAgICAgICAgaWYgKGFyZ1RocmVzaG9sZHMucyAhPSBudWxsICYmIGFyZ1RocmVzaG9sZHMuc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoLnNzID0gYXJnVGhyZXNob2xkcy5zIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsZSA9IHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICBvdXRwdXQgPSByZWxhdGl2ZVRpbWUkMSh0aGlzLCAhd2l0aFN1ZmZpeCwgdGgsIGxvY2FsZSk7XG5cbiAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IGxvY2FsZS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsZS5wb3N0Zm9ybWF0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgdmFyIGFicyQxID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBzaWduKHgpIHtcbiAgICAgICAgcmV0dXJuICh4ID4gMCkgLSAoeCA8IDApIHx8ICt4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSVNPU3RyaW5nJDEoKSB7XG4gICAgICAgIC8vIGZvciBJU08gc3RyaW5ncyB3ZSBkbyBub3QgdXNlIHRoZSBub3JtYWwgYnViYmxpbmcgcnVsZXM6XG4gICAgICAgIC8vICAqIG1pbGxpc2Vjb25kcyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgaG91cnNcbiAgICAgICAgLy8gICogZGF5cyBkbyBub3QgYnViYmxlIGF0IGFsbFxuICAgICAgICAvLyAgKiBtb250aHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIHllYXJzXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGVyZSBpcyBubyBjb250ZXh0LWZyZWUgY29udmVyc2lvbiBiZXR3ZWVuIGhvdXJzIGFuZCBkYXlzXG4gICAgICAgIC8vICh0aGluayBvZiBjbG9jayBjaGFuZ2VzKVxuICAgICAgICAvLyBhbmQgYWxzbyBub3QgYmV0d2VlbiBkYXlzIGFuZCBtb250aHMgKDI4LTMxIGRheXMgcGVyIG1vbnRoKVxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWNvbmRzID0gYWJzJDEodGhpcy5fbWlsbGlzZWNvbmRzKSAvIDEwMDAsXG4gICAgICAgICAgICBkYXlzID0gYWJzJDEodGhpcy5fZGF5cyksXG4gICAgICAgICAgICBtb250aHMgPSBhYnMkMSh0aGlzLl9tb250aHMpLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgeWVhcnMsXG4gICAgICAgICAgICBzLFxuICAgICAgICAgICAgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpLFxuICAgICAgICAgICAgdG90YWxTaWduLFxuICAgICAgICAgICAgeW1TaWduLFxuICAgICAgICAgICAgZGF5c1NpZ24sXG4gICAgICAgICAgICBobXNTaWduO1xuXG4gICAgICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDM2MDAgc2Vjb25kcyAtPiA2MCBtaW51dGVzIC0+IDEgaG91clxuICAgICAgICBtaW51dGVzID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICAgICAgaG91cnMgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xuICAgICAgICBzZWNvbmRzICU9IDYwO1xuICAgICAgICBtaW51dGVzICU9IDYwO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICAvLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZG9yZGlsbGUvbW9tZW50LWlzb2R1cmF0aW9uL2Jsb2IvbWFzdGVyL21vbWVudC5pc29kdXJhdGlvbi5qc1xuICAgICAgICBzID0gc2Vjb25kcyA/IHNlY29uZHMudG9GaXhlZCgzKS5yZXBsYWNlKC9cXC4/MCskLywgJycpIDogJyc7XG5cbiAgICAgICAgdG90YWxTaWduID0gdG90YWwgPCAwID8gJy0nIDogJyc7XG4gICAgICAgIHltU2lnbiA9IHNpZ24odGhpcy5fbW9udGhzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcbiAgICAgICAgZGF5c1NpZ24gPSBzaWduKHRoaXMuX2RheXMpICE9PSBzaWduKHRvdGFsKSA/ICctJyA6ICcnO1xuICAgICAgICBobXNTaWduID0gc2lnbih0aGlzLl9taWxsaXNlY29uZHMpICE9PSBzaWduKHRvdGFsKSA/ICctJyA6ICcnO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0b3RhbFNpZ24gK1xuICAgICAgICAgICAgJ1AnICtcbiAgICAgICAgICAgICh5ZWFycyA/IHltU2lnbiArIHllYXJzICsgJ1knIDogJycpICtcbiAgICAgICAgICAgIChtb250aHMgPyB5bVNpZ24gKyBtb250aHMgKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgKGRheXMgPyBkYXlzU2lnbiArIGRheXMgKyAnRCcgOiAnJykgK1xuICAgICAgICAgICAgKGhvdXJzIHx8IG1pbnV0ZXMgfHwgc2Vjb25kcyA/ICdUJyA6ICcnKSArXG4gICAgICAgICAgICAoaG91cnMgPyBobXNTaWduICsgaG91cnMgKyAnSCcgOiAnJykgK1xuICAgICAgICAgICAgKG1pbnV0ZXMgPyBobXNTaWduICsgbWludXRlcyArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAoc2Vjb25kcyA/IGhtc1NpZ24gKyBzICsgJ1MnIDogJycpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvJDIgPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5cbiAgICBwcm90byQyLmlzVmFsaWQgPSBpc1ZhbGlkJDE7XG4gICAgcHJvdG8kMi5hYnMgPSBhYnM7XG4gICAgcHJvdG8kMi5hZGQgPSBhZGQkMTtcbiAgICBwcm90byQyLnN1YnRyYWN0ID0gc3VidHJhY3QkMTtcbiAgICBwcm90byQyLmFzID0gYXM7XG4gICAgcHJvdG8kMi5hc01pbGxpc2Vjb25kcyA9IGFzTWlsbGlzZWNvbmRzO1xuICAgIHByb3RvJDIuYXNTZWNvbmRzID0gYXNTZWNvbmRzO1xuICAgIHByb3RvJDIuYXNNaW51dGVzID0gYXNNaW51dGVzO1xuICAgIHByb3RvJDIuYXNIb3VycyA9IGFzSG91cnM7XG4gICAgcHJvdG8kMi5hc0RheXMgPSBhc0RheXM7XG4gICAgcHJvdG8kMi5hc1dlZWtzID0gYXNXZWVrcztcbiAgICBwcm90byQyLmFzTW9udGhzID0gYXNNb250aHM7XG4gICAgcHJvdG8kMi5hc1F1YXJ0ZXJzID0gYXNRdWFydGVycztcbiAgICBwcm90byQyLmFzWWVhcnMgPSBhc1llYXJzO1xuICAgIHByb3RvJDIudmFsdWVPZiA9IHZhbHVlT2YkMTtcbiAgICBwcm90byQyLl9idWJibGUgPSBidWJibGU7XG4gICAgcHJvdG8kMi5jbG9uZSA9IGNsb25lJDE7XG4gICAgcHJvdG8kMi5nZXQgPSBnZXQkMjtcbiAgICBwcm90byQyLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgICBwcm90byQyLnNlY29uZHMgPSBzZWNvbmRzO1xuICAgIHByb3RvJDIubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgcHJvdG8kMi5ob3VycyA9IGhvdXJzO1xuICAgIHByb3RvJDIuZGF5cyA9IGRheXM7XG4gICAgcHJvdG8kMi53ZWVrcyA9IHdlZWtzO1xuICAgIHByb3RvJDIubW9udGhzID0gbW9udGhzO1xuICAgIHByb3RvJDIueWVhcnMgPSB5ZWFycztcbiAgICBwcm90byQyLmh1bWFuaXplID0gaHVtYW5pemU7XG4gICAgcHJvdG8kMi50b0lTT1N0cmluZyA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi50b1N0cmluZyA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi50b0pTT04gPSB0b0lTT1N0cmluZyQxO1xuICAgIHByb3RvJDIubG9jYWxlID0gbG9jYWxlO1xuICAgIHByb3RvJDIubG9jYWxlRGF0YSA9IGxvY2FsZURhdGE7XG5cbiAgICBwcm90byQyLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLFxuICAgICAgICB0b0lTT1N0cmluZyQxXG4gICAgKTtcbiAgICBwcm90byQyLmxhbmcgPSBsYW5nO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1gnLCAwLCAwLCAndW5peCcpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3gnLCBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWCcsIG1hdGNoVGltZXN0YW1wKTtcbiAgICBhZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoaW5wdXQpICogMTAwMCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbigneCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xuICAgIH0pO1xuXG4gICAgLy8hIG1vbWVudC5qc1xuXG4gICAgaG9va3MudmVyc2lvbiA9ICcyLjMwLjEnO1xuXG4gICAgc2V0SG9va0NhbGxiYWNrKGNyZWF0ZUxvY2FsKTtcblxuICAgIGhvb2tzLmZuID0gcHJvdG87XG4gICAgaG9va3MubWluID0gbWluO1xuICAgIGhvb2tzLm1heCA9IG1heDtcbiAgICBob29rcy5ub3cgPSBub3c7XG4gICAgaG9va3MudXRjID0gY3JlYXRlVVRDO1xuICAgIGhvb2tzLnVuaXggPSBjcmVhdGVVbml4O1xuICAgIGhvb2tzLm1vbnRocyA9IGxpc3RNb250aHM7XG4gICAgaG9va3MuaXNEYXRlID0gaXNEYXRlO1xuICAgIGhvb2tzLmxvY2FsZSA9IGdldFNldEdsb2JhbExvY2FsZTtcbiAgICBob29rcy5pbnZhbGlkID0gY3JlYXRlSW52YWxpZDtcbiAgICBob29rcy5kdXJhdGlvbiA9IGNyZWF0ZUR1cmF0aW9uO1xuICAgIGhvb2tzLmlzTW9tZW50ID0gaXNNb21lbnQ7XG4gICAgaG9va3Mud2Vla2RheXMgPSBsaXN0V2Vla2RheXM7XG4gICAgaG9va3MucGFyc2Vab25lID0gY3JlYXRlSW5ab25lO1xuICAgIGhvb2tzLmxvY2FsZURhdGEgPSBnZXRMb2NhbGU7XG4gICAgaG9va3MuaXNEdXJhdGlvbiA9IGlzRHVyYXRpb247XG4gICAgaG9va3MubW9udGhzU2hvcnQgPSBsaXN0TW9udGhzU2hvcnQ7XG4gICAgaG9va3Mud2Vla2RheXNNaW4gPSBsaXN0V2Vla2RheXNNaW47XG4gICAgaG9va3MuZGVmaW5lTG9jYWxlID0gZGVmaW5lTG9jYWxlO1xuICAgIGhvb2tzLnVwZGF0ZUxvY2FsZSA9IHVwZGF0ZUxvY2FsZTtcbiAgICBob29rcy5sb2NhbGVzID0gbGlzdExvY2FsZXM7XG4gICAgaG9va3Mud2Vla2RheXNTaG9ydCA9IGxpc3RXZWVrZGF5c1Nob3J0O1xuICAgIGhvb2tzLm5vcm1hbGl6ZVVuaXRzID0gbm9ybWFsaXplVW5pdHM7XG4gICAgaG9va3MucmVsYXRpdmVUaW1lUm91bmRpbmcgPSBnZXRTZXRSZWxhdGl2ZVRpbWVSb3VuZGluZztcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBnZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XG4gICAgaG9va3MuY2FsZW5kYXJGb3JtYXQgPSBnZXRDYWxlbmRhckZvcm1hdDtcbiAgICBob29rcy5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIGN1cnJlbnRseSBIVE1MNSBpbnB1dCB0eXBlIG9ubHkgc3VwcG9ydHMgMjQtaG91ciBmb3JtYXRzXG4gICAgaG9va3MuSFRNTDVfRk1UID0ge1xuICAgICAgICBEQVRFVElNRV9MT0NBTDogJ1lZWVktTU0tRERUSEg6bW0nLCAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgLz5cbiAgICAgICAgREFURVRJTUVfTE9DQUxfU0VDT05EUzogJ1lZWVktTU0tRERUSEg6bW06c3MnLCAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjFcIiAvPlxuICAgICAgICBEQVRFVElNRV9MT0NBTF9NUzogJ1lZWVktTU0tRERUSEg6bW06c3MuU1NTJywgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHN0ZXA9XCIwLjAwMVwiIC8+XG4gICAgICAgIERBVEU6ICdZWVlZLU1NLUREJywgLy8gPGlucHV0IHR5cGU9XCJkYXRlXCIgLz5cbiAgICAgICAgVElNRTogJ0hIOm1tJywgLy8gPGlucHV0IHR5cGU9XCJ0aW1lXCIgLz5cbiAgICAgICAgVElNRV9TRUNPTkRTOiAnSEg6bW06c3MnLCAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiBzdGVwPVwiMVwiIC8+XG4gICAgICAgIFRJTUVfTVM6ICdISDptbTpzcy5TU1MnLCAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiBzdGVwPVwiMC4wMDFcIiAvPlxuICAgICAgICBXRUVLOiAnR0dHRy1bV11XVycsIC8vIDxpbnB1dCB0eXBlPVwid2Vla1wiIC8+XG4gICAgICAgIE1PTlRIOiAnWVlZWS1NTScsIC8vIDxpbnB1dCB0eXBlPVwibW9udGhcIiAvPlxuICAgIH07XG5cbiAgICByZXR1cm4gaG9va3M7XG5cbn0pKSk7XG4iLCAiaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcclxuaW1wb3J0IHV0YyBmcm9tICdkYXlqcy9wbHVnaW4vdXRjJztcclxuaW1wb3J0IHRpbWV6b25lIGZyb20gJ2RheWpzL3BsdWdpbi90aW1lem9uZSc7XHJcbmltcG9ydCBjdXN0b21QYXJzZUZvcm1hdCBmcm9tICdkYXlqcy9wbHVnaW4vY3VzdG9tUGFyc2VGb3JtYXQnO1xyXG5pbXBvcnQgaXNTYW1lT3JBZnRlciBmcm9tICdkYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlcic7XHJcbmltcG9ydCBpc1NhbWVPckJlZm9yZSBmcm9tICdkYXlqcy9wbHVnaW4vaXNTYW1lT3JCZWZvcmUnO1xyXG5pbXBvcnQgRGF0ZVJhbmdlUGlja2VyIGZyb20gJy4vcGx1Z2luLmNqcyc7XHJcblxyXG5kYXlqcy5leHRlbmQodXRjKTtcclxuZGF5anMuZXh0ZW5kKHRpbWV6b25lKTtcclxuZGF5anMuZXh0ZW5kKGN1c3RvbVBhcnNlRm9ybWF0KTtcclxuZGF5anMuZXh0ZW5kKGlzU2FtZU9yQWZ0ZXIpO1xyXG5kYXlqcy5leHRlbmQoaXNTYW1lT3JCZWZvcmUpO1xyXG5cclxud2luZG93LkRhdGVSYW5nZVBpY2tlciA9IERhdGVSYW5nZVBpY2tlcjtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0ZVJhbmdlQ29tcG9uZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGFsd2F5c1Nob3dDYWxlbmRhcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYXV0b0FwcGx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGxpbmtlZENhbGVuZGFycyxcclxuICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVDYWxlbmRhcixcclxuICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlcixcclxuICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGlja2VyMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGlja2VySW5jcmVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG9MYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVDdXN0b21SYW5nZSxcclxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZERhdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRyb3BzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9wZW5zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHN1bmRheSxcclxuICAgICAgICAgICAgICAgICAgICAgICBtb25kYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdHVlc2RheSxcclxuICAgICAgICAgICAgICAgICAgICAgICB3ZWRuZXNkYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1cnNkYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZnJpZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHNhdHVyZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGphbnVhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZmVicnVhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbWFyY2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYXByaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbWF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGp1bmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAganVseSxcclxuICAgICAgICAgICAgICAgICAgICAgICBhdWd1c3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgc2VwdGVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9jdG9iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbm92ZW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGVjZW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG1heFNwYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVJhbmdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcixcclxuICAgICAgICAgICAgICAgICAgICAgICB1c2VSYW5nZUxhYmVscyxcclxuICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVWYWx1ZUNoYW5nZVVzaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICBzaG93SVNPV2Vla051bWJlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgd2Vla0xhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHNob3dEcm9wZG93bnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbWluWWVhcixcclxuICAgICAgICAgICAgICAgICAgICAgICBtYXhZZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpbWV6b25lXHJcbiAgIH0pIHtcclxuXHJcbiAgICB2YXIgZGF5anNSYW5nZXMgPSB7fTtcclxuICAgIGZvciAodmFyIGtleSBpbiByYW5nZXMpIHtcclxuICAgICAgICB2YXIgZGF0ZVJhbmdlID0gcmFuZ2VzW2tleV07XHJcbiAgICAgICAgZGF5anNSYW5nZXNba2V5XSA9IGRhdGVSYW5nZS5tYXAoKGRhdGVTdHJpbmcpID0+IGRheWpzKGRhdGVTdHJpbmcsIGRpc3BsYXlGb3JtYXQpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGVSYW5nZVBpY2tlcjogbnVsbCxcclxuICAgICAgICBzdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgZ2V0UmFuZ2VMYWJlbDogZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUgfHwgIXVzZVJhbmdlTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtmcm9tLCB0b10gPSBzdGF0ZS5zcGxpdChzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tRGF0ZSA9IGRheWpzKGZyb20sIGRpc3BsYXlGb3JtYXQpO1xyXG4gICAgICAgICAgICBjb25zdCB0b0RhdGUgPSBkYXlqcyh0bywgZGlzcGxheUZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtsYWJlbCwgW3JhbmdlRnJvbSwgcmFuZ2VUb11dIG9mIE9iamVjdC5lbnRyaWVzKGRheWpzUmFuZ2VzKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyb21EYXRlLmlzU2FtZShyYW5nZUZyb20pICYmIHRvRGF0ZS5pc1NhbWUocmFuZ2VUbykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRpbWV6b25lKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlqcy50ei5zZXREZWZhdWx0KHRpbWV6b25lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRheWpzRGF0ZXNBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoZGlzYWJsZWREYXRlcyAhPT0gdW5kZWZpbmVkICYmIGRpc2FibGVkRGF0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF5anNEYXRlc0FycmF5ID0gZGlzYWJsZWREYXRlcy5tYXAoZGF0ZVN0cmluZyA9PiBkYXlqcyhkYXRlU3RyaW5nLCBkaXNwbGF5Rm9ybWF0KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVJhbmdlUGlja2VyID0gbmV3IERhdGVSYW5nZVBpY2tlcihcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZGF0ZXJhbmdlLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLm90aGVyIG9wdGlvbnMuLi5cclxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSAhPSBudWxsID8gZGF5anMoc3RhcnREYXRlLCBkaXNwbGF5Rm9ybWF0KSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlICE9IG51bGwgPyBkYXlqcyhlbmREYXRlLCBkaXNwbGF5Rm9ybWF0KSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlICE9IG51bGwgPyBkYXlqcyhtYXhEYXRlLCBkaXNwbGF5Rm9ybWF0KSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlICE9IG51bGwgPyBkYXlqcyhtaW5EYXRlLCBkaXNwbGF5Rm9ybWF0KSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi5vdGhlciBvcHRpb25zLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2VzOiBkaXNhYmxlUmFuZ2UgPyB1bmRlZmluZWQgOiBkYXlqc1JhbmdlcyxcclxuICAgICAgICAgICAgICAgICAgICBpc0ludmFsaWREYXRlOiAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF5anNEYXRlc0FycmF5ICE9IG51bGwgJiYgZGF5anNEYXRlc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlqc0RhdGVzQXJyYXkuc29tZShkaXNhYmxlZERhdGUgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZERhdGUudXRjKCkuc3RhcnRPZignZGF5JykuaXNTYW1lKGRhdGUudXRjKCkuc3RhcnRPZignZGF5JyksICdkYXknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9IGV2LmRldGFpbC5waWNrZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2luZ2xlQ2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVWYWx1ZUNoYW5nZVVzaW5nKHBpY2tlci5zdGFydERhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlVmFsdWVDaGFuZ2VVc2luZyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCkgKyBzZXBhcmF0b3IgKyBwaWNrZXIuZW5kRGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUZyb21TdGF0ZSh0aGlzLmRhdGVSYW5nZVBpY2tlciwgdGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudC4kcmVmcy5kYXRlcmFuZ2UudmFsdWUgPSBwYXJlbnQuZ2V0UmFuZ2VMYWJlbChwYXJlbnQuc3RhdGUpO1xyXG4gICAgICAgICAgICB9LCAyMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnc3RhdGUnLCBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jbGVhcihwYXJlbnQuZGF0ZVJhbmdlUGlja2VyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmRhdGVGcm9tU3RhdGUocGFyZW50LmRhdGVSYW5nZVBpY2tlciwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFyZW50LiRyZWZzLmRhdGVyYW5nZS52YWx1ZSA9IHBhcmVudC5nZXRSYW5nZUxhYmVsKHZhbHVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoZGF0ZVJhbmdlUGlja2VyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRlUmFuZ2VQaWNrZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRTdGFydERhdGUoZGF5anMoKSk7XHJcbiAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRFbmREYXRlKGRheWpzKCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGVGcm9tU3RhdGU6IGZ1bmN0aW9uIChkYXRlUmFuZ2VQaWNrZXIsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKGRhdGVSYW5nZVBpY2tlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gc3RhdGUuc3BsaXQoc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMiAmJiBkYXRlUmFuZ2VQaWNrZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVJhbmdlUGlja2VyLnNldFN0YXJ0RGF0ZShkYXlqcyhkYXRlc1swXSwgZGlzcGxheUZvcm1hdCkpO1xyXG4gICAgICAgICAgICAgICAgZGF0ZVJhbmdlUGlja2VyLnNldEVuZERhdGUoZGF5anMoZGF0ZXNbMV0sIGRpc3BsYXlGb3JtYXQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoZGF0ZVJhbmdlUGlja2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCAiLyoqXHJcbiAqIEBhdXRob3I6IEFsdW11a28gaHR0cHM6Ly9naXRodWIuY29tL2FsdW11a28vYWx1bXVrb1xyXG4gKiBAY29weXJpZ2h0OiBDb3B5cmlnaHQgKGMpIDIwMjEgQWx1bXVrby4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogQGxpY2Vuc2U6IExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcbiAqIEB3ZWJzaXRlOiBodHRwczovL2dpdGh1Yi5jb20vYWx1bXVrby92YW5pbGxhLWRhdGV0aW1lcmFuZ2UtcGlja2VyXHJcbiAqXHJcbiAqIFNwZWNpYWwgdGhhbmtzIHRvIERhbiBHcm9zc21hbi5cclxuICogVGhpcyBwcm9ncmFtIGlzIGJhc2Ugb24gRGFuIEdyb3NzbWFuJ3MgYm9vdHN0cmFwLWRhdGVyYW5nZXBpY2tlciAodmVyc2lvbiAzLjEpXHJcbiAqIEkganVzdCBjaGFuZ2VkIHRoZSBjb2RlIGEgYml0IHRvIG5vdCBuZWVkIGpxdWVyeS5cclxuICovXHJcblxyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUmFuZ2VQaWNrZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMsIGNiKSB7XHJcblxyXG4gICAgICAgIC8vZGVmYXVsdCBzZXR0aW5ncyBmb3Igb3B0aW9uc1xyXG4gICAgICAgIHRoaXMucGFyZW50RWwgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcclxuICAgICAgICB0aGlzLm1pbkRhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1heERhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1heFNwYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9BcHBseSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRGF0ZVBpY2tlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3ducyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWluWWVhciA9IG1vbWVudCgpLnN1YnRyYWN0KDEwMCwgJ3llYXInKS5mb3JtYXQoJ1lZWVknKTtcclxuICAgICAgICB0aGlzLm1heFllYXIgPSBtb21lbnQoKS5hZGQoMTAwLCAneWVhcicpLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgIHRoaXMuc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93SVNPV2Vla051bWJlcnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQgPSAxO1xyXG4gICAgICAgIHRoaXMudGltZVBpY2tlclNlY29uZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpbmtlZENhbGVuZGFycyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlSW5wdXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmFuZ2VzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMub3BlbnMgPSAncmlnaHQnO1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwdWxsLXJpZ2h0JykpXHJcbiAgICAgICAgICAgIHRoaXMub3BlbnMgPSAnbGVmdCc7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcHMgPSAnZG93bic7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B1cCcpKVxyXG4gICAgICAgICAgICB0aGlzLmRyb3BzID0gJ3VwJztcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25DbGFzc2VzID0gJ2J0biBidG4tc20nO1xyXG4gICAgICAgIHRoaXMuYXBwbHlCdXR0b25DbGFzc2VzID0gJ2J0bi1wcmltYXJ5JztcclxuICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbkNsYXNzZXMgPSAnYnRuLWRlZmF1bHQnO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2FsZSA9IHtcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJyxcclxuICAgICAgICAgICAgZm9ybWF0OiBtb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyksXHJcbiAgICAgICAgICAgIHNlcGFyYXRvcjogJyAtICcsXHJcbiAgICAgICAgICAgIGFwcGx5TGFiZWw6ICdBcHBseScsXHJcbiAgICAgICAgICAgIGNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxuICAgICAgICAgICAgd2Vla0xhYmVsOiAnVycsXHJcbiAgICAgICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICdDdXN0b20gUmFuZ2UnLFxyXG4gICAgICAgICAgICBkYXlzT2ZXZWVrOiBtb21lbnQud2Vla2RheXNNaW4oKSxcclxuICAgICAgICAgICAgbW9udGhOYW1lczogbW9tZW50Lm1vbnRoc1Nob3J0KCksXHJcbiAgICAgICAgICAgIGZpcnN0RGF5OiBtb21lbnQubG9jYWxlRGF0YSgpLmZpcnN0RGF5T2ZXZWVrKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gZnVuY3Rpb24oKSB7IH07XHJcblxyXG4gICAgICAgIC8vc29tZSBzdGF0ZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIgPSB7fTtcclxuICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIgPSB7fTtcclxuXHJcbiAgICAgICAgLy9jdXN0b20gb3B0aW9ucyBmcm9tIHVzZXJcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy9hbGxvdyBzZXR0aW5nIG9wdGlvbnMgd2l0aCBkYXRhIGF0dHJpYnV0ZXNcclxuICAgICAgICAvL2RhdGEtYXBpIG9wdGlvbnMgd2lsbCBiZSBvdmVyd3JpdHRlbiB3aXRoIGN1c3RvbSBqYXZhc2NyaXB0IG9wdGlvbnNcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmVsZW1lbnQuZGF0YXNldCksIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvL2h0bWwgdGVtcGxhdGUgZm9yIHRoZSBwaWNrZXIgVUlcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGVtcGxhdGUgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlID1cclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZXJhbmdlcGlja2VyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJhbmdlc1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkcnAtY2FsZW5kYXIgbGVmdFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYWxlbmRhci10aW1lXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRycC1jYWxlbmRhciByaWdodFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYWxlbmRhci10aW1lXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRycC1idXR0b25zXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkcnAtc2VsZWN0ZWRcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImNhbmNlbEJ0blwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYXBwbHlCdG5cIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPiAnICtcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudEVsID0gb3B0aW9ucy5wYXJlbnRFbCA/IG9wdGlvbnMucGFyZW50RWwgOiB0aGlzLnBhcmVudEVsO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZVdyYXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRlbXBsYXRlV3JhcEVsLmlubmVySFRNTCA9IG9wdGlvbnMudGVtcGxhdGUudHJpbSgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGVtcGxhdGVXcmFwRWwuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZUVuZCcsIHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBoYW5kbGUgYWxsIHRoZSBwb3NzaWJsZSBvcHRpb25zIG92ZXJyaWRpbmcgZGVmYXVsdHNcclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5kaXJlY3Rpb24gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZGlyZWN0aW9uID0gb3B0aW9ucy5sb2NhbGUuZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5mb3JtYXQgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZm9ybWF0ID0gb3B0aW9ucy5sb2NhbGUuZm9ybWF0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5zZXBhcmF0b3IgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuc2VwYXJhdG9yID0gb3B0aW9ucy5sb2NhbGUuc2VwYXJhdG9yO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5kYXlzT2ZXZWVrID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmRheXNPZldlZWsgPSBvcHRpb25zLmxvY2FsZS5kYXlzT2ZXZWVrLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLm1vbnRoTmFtZXMgPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUubW9udGhOYW1lcyA9IG9wdGlvbnMubG9jYWxlLm1vbnRoTmFtZXMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZmlyc3REYXkgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZmlyc3REYXkgPSBvcHRpb25zLmxvY2FsZS5maXJzdERheTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuYXBwbHlMYWJlbCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5hcHBseUxhYmVsID0gb3B0aW9ucy5sb2NhbGUuYXBwbHlMYWJlbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuY2FuY2VsTGFiZWwgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuY2FuY2VsTGFiZWwgPSBvcHRpb25zLmxvY2FsZS5jYW5jZWxMYWJlbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUud2Vla0xhYmVsID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLndlZWtMYWJlbCA9IG9wdGlvbnMubG9jYWxlLndlZWtMYWJlbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgLy9TdXBwb3J0IFVuaWNvZGUgY2hhcnMgaW4gdGhlIGN1c3RvbSByYW5nZSBuYW1lLlxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBvcHRpb25zLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCA9IGVsZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmxvY2FsZS5kaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3RhcnREYXRlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQob3B0aW9ucy5zdGFydERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lbmREYXRlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbW9tZW50KG9wdGlvbnMuZW5kRGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1pbkRhdGUgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSBtb21lbnQob3B0aW9ucy5taW5EYXRlLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4RGF0ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IG1vbWVudChvcHRpb25zLm1heERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdGFydERhdGUgPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudChvcHRpb25zLnN0YXJ0RGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lbmREYXRlID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbW9tZW50KG9wdGlvbnMuZW5kRGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5EYXRlID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5taW5EYXRlID0gbW9tZW50KG9wdGlvbnMubWluRGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhEYXRlID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5tYXhEYXRlID0gbW9tZW50KG9wdGlvbnMubWF4RGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIHNhbml0eSBjaGVjayBmb3IgYmFkIG9wdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRoaXMuc3RhcnREYXRlLmlzQmVmb3JlKHRoaXMubWluRGF0ZSkpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5taW5EYXRlLmNsb25lKCk7XHJcblxyXG4gICAgICAgIC8vIHNhbml0eSBjaGVjayBmb3IgYmFkIG9wdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMuZW5kRGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpXHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYXBwbHlCdXR0b25DbGFzc2VzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5hcHBseUJ1dHRvbkNsYXNzZXMgPSBvcHRpb25zLmFwcGx5QnV0dG9uQ2xhc3NlcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmFwcGx5Q2xhc3MgPT09ICdzdHJpbmcnKSAvL2JhY2t3YXJkcyBjb21wYXRcclxuICAgICAgICAgICAgdGhpcy5hcHBseUJ1dHRvbkNsYXNzZXMgPSBvcHRpb25zLmFwcGx5Q2xhc3M7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYW5jZWxCdXR0b25DbGFzc2VzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxCdXR0b25DbGFzc2VzID0gb3B0aW9ucy5jYW5jZWxCdXR0b25DbGFzc2VzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FuY2VsQ2xhc3MgPT09ICdzdHJpbmcnKSAvL2JhY2t3YXJkcyBjb21wYXRcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxCdXR0b25DbGFzc2VzID0gb3B0aW9ucy5jYW5jZWxDbGFzcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1heFNwYW4gPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICB0aGlzLm1heFNwYW4gPSBvcHRpb25zLm1heFNwYW47XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kYXRlTGltaXQgPT09ICdvYmplY3QnKSAvL2JhY2t3YXJkcyBjb21wYXRcclxuICAgICAgICAgICAgdGhpcy5tYXhTcGFuID0gb3B0aW9ucy5kYXRlTGltaXQ7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vcGVucyA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMub3BlbnMgPSBvcHRpb25zLm9wZW5zO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZHJvcHMgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aGlzLmRyb3BzID0gb3B0aW9ucy5kcm9wcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNob3dXZWVrTnVtYmVycyA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLnNob3dXZWVrTnVtYmVycyA9IG9wdGlvbnMuc2hvd1dlZWtOdW1iZXJzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2hvd0lTT1dlZWtOdW1iZXJzID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzID0gb3B0aW9ucy5zaG93SVNPV2Vla051bWJlcnM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5idXR0b25DbGFzc2VzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzc2VzID0gb3B0aW9ucy5idXR0b25DbGFzc2VzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYnV0dG9uQ2xhc3NlcyA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3NlcyA9IG9wdGlvbnMuYnV0dG9uQ2xhc3Nlcy5qb2luKCcgJyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaG93RHJvcGRvd25zID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3ducyA9IG9wdGlvbnMuc2hvd0Ryb3Bkb3ducztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1pblllYXIgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICB0aGlzLm1pblllYXIgPSBvcHRpb25zLm1pblllYXI7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhZZWFyID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgdGhpcy5tYXhZZWFyID0gb3B0aW9ucy5tYXhZZWFyO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2hvd0N1c3RvbVJhbmdlTGFiZWwgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5zaG93Q3VzdG9tUmFuZ2VMYWJlbCA9IG9wdGlvbnMuc2hvd0N1c3RvbVJhbmdlTGFiZWw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGVEYXRlUGlja2VyID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaW5nbGVEYXRlUGlja2VyID0gb3B0aW9ucy5zaW5nbGVEYXRlUGlja2VyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VyID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlciA9IG9wdGlvbnMudGltZVBpY2tlcjtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRpbWVQaWNrZXJTZWNvbmRzID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlclNlY29uZHMgPSBvcHRpb25zLnRpbWVQaWNrZXJTZWNvbmRzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGltZVBpY2tlckluY3JlbWVudCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlckluY3JlbWVudCA9IG9wdGlvbnMudGltZVBpY2tlckluY3JlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy50aW1lUGlja2VyMjRIb3VyID0gb3B0aW9ucy50aW1lUGlja2VyMjRIb3VyO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0FwcGx5ID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0FwcGx5ID0gb3B0aW9ucy5hdXRvQXBwbHk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5hdXRvVXBkYXRlSW5wdXQgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5hdXRvVXBkYXRlSW5wdXQgPSBvcHRpb25zLmF1dG9VcGRhdGVJbnB1dDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbmtlZENhbGVuZGFycyA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLmxpbmtlZENhbGVuZGFycyA9IG9wdGlvbnMubGlua2VkQ2FsZW5kYXJzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuaXNJbnZhbGlkRGF0ZSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlID0gb3B0aW9ucy5pc0ludmFsaWREYXRlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuaXNDdXN0b21EYXRlID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZSA9IG9wdGlvbnMuaXNDdXN0b21EYXRlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYWx3YXlzU2hvd0NhbGVuZGFycyA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMgPSBvcHRpb25zLmFsd2F5c1Nob3dDYWxlbmRhcnM7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBkYXkgbmFtZXMgb3JkZXIgdG8gZmlyc3REYXlcclxuICAgICAgICBpZiAodGhpcy5sb2NhbGUuZmlyc3REYXkgIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5sb2NhbGUuZmlyc3REYXk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpdGVyYXRvciA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmRheXNPZldlZWsucHVzaCh0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0b3ItLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0LCBlbmQsIHJhbmdlO1xyXG5cclxuICAgICAgICAvL2lmIG5vIHN0YXJ0L2VuZCBkYXRlcyBzZXQsIGNoZWNrIGlmIGFuIGlucHV0IGVsZW1lbnQgY29udGFpbnMgaW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3RhcnREYXRlID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3B0aW9ucy5lbmREYXRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZih0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiB0aGlzLmVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKXtcclxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BsaXQgPSB2YWwuc3BsaXQodGhpcy5sb2NhbGUuc2VwYXJhdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KHNwbGl0WzBdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChzcGxpdFsxXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyICYmIHZhbCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KHZhbCwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQodmFsLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9PSBudWxsICYmIGVuZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoZW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnJhbmdlcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHJhbmdlc0tleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLnJhbmdlcyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByYW5nZXNLZXlzLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IHJhbmdlc0tleXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KG9wdGlvbnMucmFuZ2VzW3JhbmdlXVswXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yYW5nZXNbcmFuZ2VdWzFdID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQob3B0aW9ucy5yYW5nZXNbcmFuZ2VdWzFdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChvcHRpb25zLnJhbmdlc1tyYW5nZV1bMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBvciBlbmQgZGF0ZSBleGNlZWQgdGhvc2UgYWxsb3dlZCBieSB0aGUgbWluRGF0ZSBvciBtYXhTcGFuXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25zLCBzaG9ydGVuIHRoZSByYW5nZSB0byB0aGUgYWxsb3dhYmxlIHBlcmlvZC5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4U3BhbiAmJiBtYXhEYXRlICYmIHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMubWF4U3BhbikuaXNBZnRlcihtYXhEYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlID0gc3RhcnQuY2xvbmUoKS5hZGQodGhpcy5tYXhTcGFuKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIGVuZC5pc0FmdGVyKG1heERhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1heERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZW5kIG9mIHRoZSByYW5nZSBpcyBiZWZvcmUgdGhlIG1pbmltdW0gb3IgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBpc1xyXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIG1heGltdW0sIGRvbid0IGRpc3BsYXkgdGhpcyByYW5nZSBvcHRpb24gYXQgYWxsLlxyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLm1pbkRhdGUgJiYgZW5kLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgdGhpcy50aW1lcGlja2VyID8gJ21pbnV0ZScgOiAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKG1heERhdGUgJiYgc3RhcnQuaXNBZnRlcihtYXhEYXRlLCB0aGlzLnRpbWVwaWNrZXIgPyAnbWludXRlJyA6ICdkYXknKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9TdXBwb3J0IHVuaWNvZGUgY2hhcnMgaW4gdGhlIHJhbmdlIG5hbWVzLlxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSByYW5nZTtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZUh0bWwgPSBlbGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzW3JhbmdlSHRtbF0gPSBbc3RhcnQsIGVuZF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gJzx1bD4nO1xyXG4gICAgICAgICAgICBmb3IgKHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ICs9ICc8bGkgZGF0YS1yYW5nZS1rZXk9XCInICsgcmFuZ2UgKyAnXCI+JyArIHJhbmdlICsgJzwvbGk+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93Q3VzdG9tUmFuZ2VMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdCArPSAnPGxpIGRhdGEtcmFuZ2Uta2V5PVwiJyArIHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwgKyAnXCI+JyArIHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3QgKz0gJzwvdWw+JztcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJhbmdlcycpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGxpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLmVuZERhdGUuZW5kT2YoJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItdGltZScpLmRpc3BsYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2Nhbid0IGJlIHVzZWQgdG9nZXRoZXIgZm9yIG5vd1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy5hdXRvQXBwbHkpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0FwcGx5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhdXRvLWFwcGx5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMucmFuZ2VzID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdy1yYW5nZXMnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaW5nbGUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtY2FsZW5kYXIubGVmdCcpLmNsYXNzTGlzdC5hZGQoJ3NpbmdsZScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZHJwLWNhbGVuZGFyLmxlZnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1jYWxlbmRhci5yaWdodCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyICYmIHRoaXMuYXV0b0FwcGx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhdXRvLWFwcGx5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgodHlwZW9mIG9wdGlvbnMucmFuZ2VzID09PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5zaW5nbGVEYXRlUGlja2VyKSB8fCB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdy1jYWxlbmRhcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3BlbnMnICsgdGhpcy5vcGVucyk7XHJcblxyXG4gICAgICAgIC8vYXBwbHkgQ1NTIGNsYXNzZXMgYW5kIGxhYmVscyB0byBidXR0b25zXHJcbiAgICAgICAgbGV0IGFwcGx5QnRuRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYXBwbHlCdG4nKTtcclxuICAgICAgICBsZXQgY2FuY2VsQnRuRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsQnRuJyk7XHJcbiAgICAgICAganEuYWRkQ2xhc3MoYXBwbHlCdG5FbCwgdGhpcy5idXR0b25DbGFzc2VzKTtcclxuICAgICAgICBqcS5hZGRDbGFzcyhjYW5jZWxCdG5FbCwgdGhpcy5idXR0b25DbGFzc2VzKTtcclxuICAgICAgICBpZiAodGhpcy5hcHBseUJ1dHRvbkNsYXNzZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhhcHBseUJ0bkVsLCB0aGlzLmFwcGx5QnV0dG9uQ2xhc3Nlcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsQnV0dG9uQ2xhc3Nlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGNhbmNlbEJ0bkVsLCB0aGlzLmNhbmNlbEJ1dHRvbkNsYXNzZXMpO1xyXG4gICAgICAgIGpxLmh0bWwoYXBwbHlCdG5FbCwgdGhpcy5sb2NhbGUuYXBwbHlMYWJlbCk7XHJcbiAgICAgICAganEuaHRtbChjYW5jZWxCdG5FbCwgdGhpcy5sb2NhbGUuY2FuY2VsTGFiZWwpO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLypcclxuICAgICAgICAtLSBOb3RlOiBqcXVlcnkgY2FuIHNldCBldmVudCBsaXN0bmVyIGJlZm9yZSB0aGUgdGFyZ2V0IGVsZW1lbnQgaGFzIG5vdCBiZWVuIGJ1aWxkLiBWYW5pbGxhLUpTIHNldCBldmVudCBsaXN0bmVyIExBVEVSLi0tXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmRycC1jYWxlbmRhcicpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5wcmV2JywgJC5wcm94eSh0aGlzLmNsaWNrUHJldiwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5uZXh0JywgJC5wcm94eSh0aGlzLmNsaWNrTmV4dCwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmRhdGVyYW5nZXBpY2tlcicsICd0ZC5hdmFpbGFibGUnLCAkLnByb3h5KHRoaXMuY2xpY2tEYXRlLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLmRhdGVyYW5nZXBpY2tlcicsICd0ZC5hdmFpbGFibGUnLCAkLnByb3h5KHRoaXMuaG92ZXJEYXRlLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC55ZWFyc2VsZWN0JywgJC5wcm94eSh0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZCwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignY2hhbmdlLmRhdGVyYW5nZXBpY2tlcicsICdzZWxlY3QubW9udGhzZWxlY3QnLCAkLnByb3h5KHRoaXMubW9udGhPclllYXJDaGFuZ2VkLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC5ob3Vyc2VsZWN0LHNlbGVjdC5taW51dGVzZWxlY3Qsc2VsZWN0LnNlY29uZHNlbGVjdCxzZWxlY3QuYW1wbXNlbGVjdCcsICQucHJveHkodGhpcy50aW1lQ2hhbmdlZCwgdGhpcykpO1xyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdGhpcy5jbGlja1JhbmdlUHJveHkgPSBmdW5jdGlvbiAoZSkgeyB0aGlzLmNsaWNrUmFuZ2UoZSk7IH0uYmluZCh0aGlzKTtcclxuICAgICAgICBqcS5vbih0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmFuZ2VzJyksICdjbGljaycsICdsaScsIHRoaXMuY2xpY2tSYW5nZVByb3h5KTtcclxuXHJcbiAgICAgICAgbGV0IGRycEJ1dHRvbnNFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtYnV0dG9ucycpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tBcHBseVByb3h5ID0gZnVuY3Rpb24gKGUpIHsgdGhpcy5jbGlja0FwcGx5KGUpOyB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAganEub24oZHJwQnV0dG9uc0VsLCAnY2xpY2snLCAnYnV0dG9uLmFwcGx5QnRuJywgdGhpcy5jbGlja0FwcGx5UHJveHkpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tDYW5jZWxQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMuY2xpY2tDYW5jZWwoZSk7IH0uYmluZCh0aGlzKTtcclxuICAgICAgICBqcS5vbihkcnBCdXR0b25zRWwsICdjbGljaycsICdidXR0b24uY2FuY2VsQnRuJywgdGhpcy5jbGlja0NhbmNlbFByb3h5KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnIHx8IHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMuc2hvdyhlKTsgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBqcS5vbih0aGlzLmVsZW1lbnQsICdjbGljaycsIHRoaXMuc2hvd1Byb3h5KTtcclxuICAgICAgICAgICAganEub24odGhpcy5lbGVtZW50LCAnZm9jdXMnLCB0aGlzLnNob3dQcm94eSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudENoYW5nZWRQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMuZWxlbWVudENoYW5nZWQoZSk7IH0uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAganEub24odGhpcy5lbGVtZW50LCAna2V5dXAnLCB0aGlzLmVsZW1lbnRDaGFuZ2VkUHJveHkpO1xyXG4gICAgICAgICAgICB0aGlzLmtleWRvd25Qcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMua2V5ZG93bihlKTsgfS5iaW5kKHRoaXMpOyAgLy9JRSAxMSBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgICAgIGpxLm9uKHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLmtleWRvd25Qcm94eSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMudG9nZ2xlKGUpOyB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGpxLm9uKHRoaXMuZWxlbWVudCwgJ2NsaWNrJywgdGhpcy50b2dnbGVQcm94eSk7XHJcbiAgICAgICAgICAgIGpxLm9uKHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLnRvZ2dsZVByb3h5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gaWYgYXR0YWNoZWQgdG8gYSB0ZXh0IGlucHV0LCBzZXQgdGhlIGluaXRpYWwgdmFsdWVcclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnREYXRlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQoc3RhcnREYXRlLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0RGF0ZSA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudClcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5zdGFydERhdGUubWludXRlKCkgLyB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpICogdGhpcy50aW1lUGlja2VySW5jcmVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5taW5EYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5zdGFydERhdGUubWludXRlKCkgLyB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpICogdGhpcy50aW1lUGlja2VySW5jcmVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5zdGFydERhdGUuaXNBZnRlcih0aGlzLm1heERhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5tYXhEYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUubWludXRlKE1hdGguZmxvb3IodGhpcy5zdGFydERhdGUubWludXRlKCkgLyB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpICogdGhpcy50aW1lUGlja2VySW5jcmVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dpbmcpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZERhdGUoZW5kRGF0ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kRGF0ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudChlbmREYXRlLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZERhdGUgPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBtb21lbnQoZW5kRGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKVxyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLmVuZERhdGUuZW5kT2YoJ2RheScpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudClcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLm1pbnV0ZShNYXRoLnJvdW5kKHRoaXMuZW5kRGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSlcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLmVuZERhdGUuaXNBZnRlcih0aGlzLm1heERhdGUpKVxyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1heERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWF4U3BhbiAmJiB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh0aGlzLm1heFNwYW4pLmlzQmVmb3JlKHRoaXMuZW5kRGF0ZSkpXHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuYWRkKHRoaXMubWF4U3Bhbik7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNSaWdodFRpbWUgPSB0aGlzLmVuZERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAganEuaHRtbCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZHJwLXNlbGVjdGVkJyksIHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpICsgdGhpcy5sb2NhbGUuc2VwYXJhdG9yICsgdGhpcy5lbmREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd2luZylcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbnZhbGlkRGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDdXN0b21EYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWaWV3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcigncmlnaHQnKTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdEVsTGlzdCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWdodCAuY2FsZW5kYXItdGltZSBzZWxlY3QnKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0RWxMaXN0Lmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RFbExpc3RbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEVsTGlzdFtpXS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RFbExpc3QubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEVsTGlzdFtpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEVsTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUpXHJcbiAgICAgICAgICAgIGpxLmh0bWwodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1zZWxlY3RlZCcpLCB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KSArIHRoaXMubG9jYWxlLnNlcGFyYXRvciArIHRoaXMuZW5kRGF0ZS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNb250aHNJblZpZXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybUlucHV0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1vbnRoc0luVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAvL2lmIGJvdGggZGF0ZXMgYXJlIHZpc2libGUgYWxyZWFkeSwgZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLmxlZnRDYWxlbmRhci5tb250aCAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggJiZcclxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgfHwgdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSlcclxuICAgICAgICAgICAgICAgICYmXHJcbiAgICAgICAgICAgICAgICAodGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09PSB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSB8fCB0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzICYmICh0aGlzLmVuZERhdGUubW9udGgoKSAhPT0gdGhpcy5zdGFydERhdGUubW9udGgoKSB8fCB0aGlzLmVuZERhdGUueWVhcigpICE9PSB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLmVuZERhdGUuY2xvbmUoKS5kYXRlKDIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgIT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpICYmIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSAhPT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMubGlua2VkQ2FsZW5kYXJzICYmICF0aGlzLnNpbmdsZURhdGVQaWNrZXIgJiYgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID4gdGhpcy5tYXhEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpLmRhdGUoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5tYXhEYXRlLmNsb25lKCkuZGF0ZSgyKS5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2FsZW5kYXJzKCkge1xyXG5cclxuICAgICAgICBpZighdGhpcy5jbGlja1ByZXZQcm94eSlcclxuICAgICAgICAgICAgdGhpcy5jbGlja1ByZXZQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMuY2xpY2tQcmV2KGUpOyB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgaWYoIXRoaXMuY2xpY2tOZXh0UHJveHkpXHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tOZXh0UHJveHkgPSBmdW5jdGlvbiAoZSkgeyB0aGlzLmNsaWNrTmV4dChlKTsgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGlmKCF0aGlzLmNsaWNrRGF0ZVByb3h5KVxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRGF0ZVByb3h5ID0gZnVuY3Rpb24gKGUpIHsgdGhpcy5jbGlja0RhdGUoZSk7IH0uYmluZCh0aGlzKTtcclxuICAgICAgICBpZighdGhpcy5ob3ZlckRhdGVQcm94eSlcclxuICAgICAgICAgICAgdGhpcy5ob3ZlckRhdGVQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMuaG92ZXJEYXRlKGUpOyB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgaWYoIXRoaXMubW9udGhPclllYXJDaGFuZ2VkUHJveHkpXHJcbiAgICAgICAgICAgIHRoaXMubW9udGhPclllYXJDaGFuZ2VkUHJveHkgPSBmdW5jdGlvbiAoZSkgeyB0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZChlKTsgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGlmKCF0aGlzLnRpbWVDaGFuZ2VkUHJveHkpXHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWRQcm94eSA9IGZ1bmN0aW9uIChlKSB7IHRoaXMudGltZUNoYW5nZWQoZSk7IH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAtLSBOb3RlOiBieSBqcXVlcnksIHdlIGNhbiBzZXQgZXZlbnQgbGlzdGVuZXIgYmVmb3JlIHRoZSB0YXJnZXQgZWxlbWVudCBoYXMgbm90IGJlZW4gYnVpbGQuIGJ1dCB3ZSBtdXN0IHJlbW92ZSBldmVudCBsaXN0ZW5lciBIRVJFIGJ5IFZhbmlsbGEtSlMuIC0tXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmRycC1jYWxlbmRhcicpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5wcmV2JywgJC5wcm94eSh0aGlzLmNsaWNrUHJldiwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5uZXh0JywgJC5wcm94eSh0aGlzLmNsaWNrTmV4dCwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmRhdGVyYW5nZXBpY2tlcicsICd0ZC5hdmFpbGFibGUnLCAkLnByb3h5KHRoaXMuY2xpY2tEYXRlLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLmRhdGVyYW5nZXBpY2tlcicsICd0ZC5hdmFpbGFibGUnLCAkLnByb3h5KHRoaXMuaG92ZXJEYXRlLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC55ZWFyc2VsZWN0JywgJC5wcm94eSh0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZCwgdGhpcykpXHJcbiAgICAgICAgICAgIC5vbignY2hhbmdlLmRhdGVyYW5nZXBpY2tlcicsICdzZWxlY3QubW9udGhzZWxlY3QnLCAkLnByb3h5KHRoaXMubW9udGhPclllYXJDaGFuZ2VkLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC5ob3Vyc2VsZWN0LHNlbGVjdC5taW51dGVzZWxlY3Qsc2VsZWN0LnNlY29uZHNlbGVjdCxzZWxlY3QuYW1wbXNlbGVjdCcsICQucHJveHkodGhpcy50aW1lQ2hhbmdlZCwgdGhpcykpO1xyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgZHJwQ2FsZW5kYXJFbExpc3QgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZHJwLWNhbGVuZGFyJyk7XHJcbiAgICAgICAganEub2ZmKGRycENhbGVuZGFyRWxMaXN0LCAnY2xpY2snLCAnLnByZXYnLCB0aGlzLmNsaWNrUHJldlByb3h5KTtcclxuICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdjbGljaycsICcubmV4dCcsIHRoaXMuY2xpY2tOZXh0UHJveHkpO1xyXG4gICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ21vdXNlZG93bicsICd0ZC5hdmFpbGFibGUnLCB0aGlzLmNsaWNrRGF0ZVByb3h5KTtcclxuICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdtb3VzZWVudGVyJywgJ3RkLmF2YWlsYWJsZScsIHRoaXMuaG92ZXJEYXRlUHJveHkpO1xyXG4gICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ2NoYW5nZScsICdzZWxlY3QueWVhcnNlbGVjdCcsIHRoaXMubW9udGhPclllYXJDaGFuZ2VkUHJveHkpO1xyXG4gICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ2NoYW5nZScsICdzZWxlY3QubW9udGhzZWxlY3QnLCB0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZFByb3h5KTtcclxuICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdjaGFuZ2UnLCAnc2VsZWN0LmhvdXJzZWxlY3Qsc2VsZWN0Lm1pbnV0ZXNlbGVjdCxzZWxlY3Quc2Vjb25kc2VsZWN0LHNlbGVjdC5hbXBtc2VsZWN0JywgdGhpcy50aW1lQ2hhbmdlZFByb3h5KTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgbGV0IGhvdXIsIG1pbnV0ZSwgc2Vjb25kO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLmhvdXJzZWxlY3QnKS52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLm1pbnV0ZXNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KGpxLmZpbmRMYXN0KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5taW51dGVzZWxlY3QnKSkudmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuc2Vjb25kc2VsZWN0JykudmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbXBtID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLmFtcG1zZWxlY3QnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaG91ciA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAuaG91cnNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLm1pbnV0ZXNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KGpxLmZpbmRMYXN0KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAubWludXRlc2VsZWN0JykpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5zZWNvbmRzZWxlY3QnKS52YWx1ZSwgMTApIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFtcG0gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLmFtcG1zZWxlY3QnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5ob3VyKGhvdXIpLm1pbnV0ZShtaW51dGUpLnNlY29uZChzZWNvbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcignbGVmdCcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoJ3JpZ2h0Jyk7XHJcblxyXG4gICAgICAgIC8vaGlnaGxpZ2h0IGFueSBwcmVkZWZpbmVkIHJhbmdlIG1hdGNoaW5nIHRoZSBjdXJyZW50IHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuICAgICAgICBsZXQgcmFuZ2VzTGlFbExpc3QgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2VzIGxpJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJhbmdlc0xpRWxMaXN0Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICByYW5nZXNMaUVsTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIC0tIE5vdGU6IGJ5IGpxdWVyeSwgd2UgY2FuIHNldCBldmVudCBsaXN0ZW5lciBiZWZvcmUgdGhlIHRhcmdldCBlbGVtZW50IGhhcyBub3QgYmVlbiBidWlsZC4gYnV0IHdlIG11c3Qgc2V0IGV2ZW50IGxpc3RlbmVyIEhFUkUgYnkgVmFuaWxsYS1KUy4gLS1cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuZHJwLWNhbGVuZGFyJylcclxuICAgICAgICAgICAgLm9uKCdjbGljay5kYXRlcmFuZ2VwaWNrZXInLCAnLnByZXYnLCAkLnByb3h5KHRoaXMuY2xpY2tQcmV2LCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjbGljay5kYXRlcmFuZ2VwaWNrZXInLCAnLm5leHQnLCAkLnByb3h5KHRoaXMuY2xpY2tOZXh0LCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uZGF0ZXJhbmdlcGlja2VyJywgJ3RkLmF2YWlsYWJsZScsICQucHJveHkodGhpcy5jbGlja0RhdGUsIHRoaXMpKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXIuZGF0ZXJhbmdlcGlja2VyJywgJ3RkLmF2YWlsYWJsZScsICQucHJveHkodGhpcy5ob3ZlckRhdGUsIHRoaXMpKVxyXG4gICAgICAgICAgICAub24oJ2NoYW5nZS5kYXRlcmFuZ2VwaWNrZXInLCAnc2VsZWN0LnllYXJzZWxlY3QnLCAkLnByb3h5KHRoaXMubW9udGhPclllYXJDaGFuZ2VkLCB0aGlzKSlcclxuICAgICAgICAgICAgLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC5tb250aHNlbGVjdCcsICQucHJveHkodGhpcy5tb250aE9yWWVhckNoYW5nZWQsIHRoaXMpKVxyXG4gICAgICAgICAgICAub24oJ2NoYW5nZS5kYXRlcmFuZ2VwaWNrZXInLCAnc2VsZWN0LmhvdXJzZWxlY3Qsc2VsZWN0Lm1pbnV0ZXNlbGVjdCxzZWxlY3Quc2Vjb25kc2VsZWN0LHNlbGVjdC5hbXBtc2VsZWN0JywgJC5wcm94eSh0aGlzLnRpbWVDaGFuZ2VkLCB0aGlzKSk7XHJcbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGpxLm9uKGRycENhbGVuZGFyRWxMaXN0LCAnY2xpY2snLCAnLnByZXYnLCB0aGlzLmNsaWNrUHJldlByb3h5KTtcclxuICAgICAgICBqcS5vbihkcnBDYWxlbmRhckVsTGlzdCwgJ2NsaWNrJywgJy5uZXh0JywgdGhpcy5jbGlja05leHRQcm94eSk7XHJcbiAgICAgICAganEub24oZHJwQ2FsZW5kYXJFbExpc3QsICdtb3VzZWRvd24nLCAndGQuYXZhaWxhYmxlJywgdGhpcy5jbGlja0RhdGVQcm94eSk7XHJcbiAgICAgICAganEub24oZHJwQ2FsZW5kYXJFbExpc3QsICdtb3VzZWVudGVyJywgJ3RkLmF2YWlsYWJsZScsIHRoaXMuaG92ZXJEYXRlUHJveHkpO1xyXG4gICAgICAgIGpxLm9uKGRycENhbGVuZGFyRWxMaXN0LCAnY2hhbmdlJywgJ3NlbGVjdC55ZWFyc2VsZWN0JywgdGhpcy5tb250aE9yWWVhckNoYW5nZWRQcm94eSk7XHJcbiAgICAgICAganEub24oZHJwQ2FsZW5kYXJFbExpc3QsICdjaGFuZ2UnLCAnc2VsZWN0Lm1vbnRoc2VsZWN0JywgdGhpcy5tb250aE9yWWVhckNoYW5nZWRQcm94eSk7XHJcbiAgICAgICAganEub24oZHJwQ2FsZW5kYXJFbExpc3QsICdjaGFuZ2UnLCAnc2VsZWN0LmhvdXJzZWxlY3Qsc2VsZWN0Lm1pbnV0ZXNlbGVjdCxzZWxlY3Quc2Vjb25kc2VsZWN0LHNlbGVjdC5hbXBtc2VsZWN0JywgdGhpcy50aW1lQ2hhbmdlZFByb3h5KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ2FsZW5kYXIoc2lkZSkge1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIEJ1aWxkIHRoZSBtYXRyaXggb2YgZGF0ZXMgdGhhdCB3aWxsIHBvcHVsYXRlIHRoZSBjYWxlbmRhclxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIGxldCBjYWxlbmRhck9iaiA9IHNpZGUgPT09ICdsZWZ0JyA/IHRoaXMubGVmdENhbGVuZGFyIDogdGhpcy5yaWdodENhbGVuZGFyO1xyXG4gICAgICAgIGxldCBtb250aCA9IGNhbGVuZGFyT2JqLm1vbnRoLm1vbnRoKCk7XHJcbiAgICAgICAgbGV0IHllYXIgPSBjYWxlbmRhck9iai5tb250aC55ZWFyKCk7XHJcbiAgICAgICAgbGV0IGhvdXIgPSBjYWxlbmRhck9iai5tb250aC5ob3VyKCk7XHJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IGNhbGVuZGFyT2JqLm1vbnRoLm1pbnV0ZSgpO1xyXG4gICAgICAgIGxldCBzZWNvbmQgPSBjYWxlbmRhck9iai5tb250aC5zZWNvbmQoKTtcclxuICAgICAgICBsZXQgZGF5c0luTW9udGggPSBtb21lbnQoW3llYXIsIG1vbnRoXSkuZGF5c0luTW9udGgoKTtcclxuICAgICAgICBsZXQgZmlyc3REYXkgPSBtb21lbnQoW3llYXIsIG1vbnRoLCAxXSk7XHJcbiAgICAgICAgbGV0IGxhc3REYXkgPSBtb21lbnQoW3llYXIsIG1vbnRoLCBkYXlzSW5Nb250aF0pO1xyXG4gICAgICAgIGxldCBsYXN0TW9udGggPSBtb21lbnQoZmlyc3REYXkpLnN1YnRyYWN0KDEsICdtb250aCcpLm1vbnRoKCk7XHJcbiAgICAgICAgbGV0IGxhc3RZZWFyID0gbW9tZW50KGZpcnN0RGF5KS5zdWJ0cmFjdCgxLCAnbW9udGgnKS55ZWFyKCk7XHJcbiAgICAgICAgbGV0IGRheXNJbkxhc3RNb250aCA9IG1vbWVudChbbGFzdFllYXIsIGxhc3RNb250aF0pLmRheXNJbk1vbnRoKCk7XHJcbiAgICAgICAgbGV0IGRheU9mV2VlayA9IGZpcnN0RGF5LmRheSgpO1xyXG5cclxuICAgICAgICAvL2luaXRpYWxpemUgYSA2IHJvd3MgeCA3IGNvbHVtbnMgYXJyYXkgZm9yIHRoZSBjYWxlbmRhclxyXG4gICAgICAgIGxldCBjYWxlbmRhck1hdHJpeCA9IFtdO1xyXG4gICAgICAgIGNhbGVuZGFyTWF0cml4LmZpcnN0RGF5ID0gZmlyc3REYXk7XHJcbiAgICAgICAgY2FsZW5kYXJNYXRyaXgubGFzdERheSA9IGxhc3REYXk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W2ldID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BvcHVsYXRlIHRoZSBjYWxlbmRhciB3aXRoIGRhdGUgb2JqZWN0c1xyXG4gICAgICAgIGxldCBzdGFydERheSA9IGRheXNJbkxhc3RNb250aCAtIGRheU9mV2VlayArIHRoaXMubG9jYWxlLmZpcnN0RGF5ICsgMTtcclxuICAgICAgICBpZiAoc3RhcnREYXkgPiBkYXlzSW5MYXN0TW9udGgpXHJcbiAgICAgICAgICAgIHN0YXJ0RGF5IC09IDc7XHJcblxyXG4gICAgICAgIGlmIChkYXlPZldlZWsgPT09IHRoaXMubG9jYWxlLmZpcnN0RGF5KVxyXG4gICAgICAgICAgICBzdGFydERheSA9IGRheXNJbkxhc3RNb250aCAtIDY7XHJcblxyXG4gICAgICAgIGxldCBjdXJEYXRlID0gbW9tZW50KFtsYXN0WWVhciwgbGFzdE1vbnRoLCBzdGFydERheSwgMTIsIG1pbnV0ZSwgc2Vjb25kXSk7XHJcblxyXG4gICAgICAgIGxldCBjb2wsIHJvdztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgY29sID0gMCwgcm93ID0gMDsgaSA8IDQyOyBpKyssIGNvbCsrLCBjdXJEYXRlID0gbW9tZW50KGN1ckRhdGUpLmFkZCgyNCwgJ2hvdXInKSkge1xyXG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgY29sICUgNyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXSA9IGN1ckRhdGUuY2xvbmUoKS5ob3VyKGhvdXIpLm1pbnV0ZShtaW51dGUpLnNlY29uZChzZWNvbmQpO1xyXG4gICAgICAgICAgICBjdXJEYXRlLmhvdXIoMTIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMubWluRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJiBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlKSAmJiBzaWRlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXSA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5tYXhEYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkgJiYgc2lkZSA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJNYXRyaXhbcm93XVtjb2xdID0gdGhpcy5tYXhEYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL21ha2UgdGhlIGNhbGVuZGFyIG9iamVjdCBhdmFpbGFibGUgdG8gaG92ZXJEYXRlL2NsaWNrRGF0ZVxyXG4gICAgICAgIGlmIChzaWRlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIuY2FsZW5kYXIgPSBjYWxlbmRhck1hdHJpeDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIuY2FsZW5kYXIgPSBjYWxlbmRhck1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gRGlzcGxheSB0aGUgY2FsZW5kYXJcclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICBsZXQgbWluRGF0ZSA9IHNpZGUgPT09ICdsZWZ0JyA/IHRoaXMubWluRGF0ZSA6IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNpZGUgPT09ICdsZWZ0JyA/IHRoaXMuc3RhcnREYXRlIDogdGhpcy5lbmREYXRlO1xyXG4gICAgICAgIGxldCBhcnJvdyA9IHRoaXMubG9jYWxlLmRpcmVjdGlvbiA9PT0gJ2x0cicgPyB7bGVmdDogJ2NoZXZyb24tbGVmdCcsIHJpZ2h0OiAnY2hldnJvbi1yaWdodCd9IDoge2xlZnQ6ICdjaGV2cm9uLXJpZ2h0JywgcmlnaHQ6ICdjaGV2cm9uLWxlZnQnfTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+JztcclxuICAgICAgICBodG1sICs9ICc8dGhlYWQ+JztcclxuICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgLy8gYWRkIGVtcHR5IGNlbGwgZm9yIHdlZWsgbnVtYmVyXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtOdW1iZXJzIHx8IHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzKVxyXG4gICAgICAgICAgICBodG1sICs9ICc8dGg+PC90aD4nO1xyXG5cclxuICAgICAgICBpZiAoKCFtaW5EYXRlIHx8IG1pbkRhdGUuaXNCZWZvcmUoY2FsZW5kYXJNYXRyaXguZmlyc3REYXkpKSAmJiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzIHx8IHNpZGUgPT09ICdsZWZ0JykpIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHRoIGNsYXNzPVwicHJldiBhdmFpbGFibGVcIj48c3Bhbj48L3NwYW4+PC90aD4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aD48L3RoPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0ZUh0bWwgPSB0aGlzLmxvY2FsZS5tb250aE5hbWVzW2NhbGVuZGFyTWF0cml4WzFdWzFdLm1vbnRoKCldICsgY2FsZW5kYXJNYXRyaXhbMV1bMV0uZm9ybWF0KFwiIFlZWVlcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNob3dEcm9wZG93bnMpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IGNhbGVuZGFyTWF0cml4WzFdWzFdLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50WWVhciA9IGNhbGVuZGFyTWF0cml4WzFdWzFdLnllYXIoKTtcclxuICAgICAgICAgICAgbGV0IG1heFllYXIgPSAobWF4RGF0ZSAmJiBtYXhEYXRlLnllYXIoKSkgfHwgKHRoaXMubWF4WWVhcik7XHJcbiAgICAgICAgICAgIGxldCBtaW5ZZWFyID0gKG1pbkRhdGUgJiYgbWluRGF0ZS55ZWFyKCkpIHx8ICh0aGlzLm1pblllYXIpO1xyXG4gICAgICAgICAgICBsZXQgaW5NaW5ZZWFyID0gY3VycmVudFllYXIgPT09IG1pblllYXI7XHJcbiAgICAgICAgICAgIGxldCBpbk1heFllYXIgPSBjdXJyZW50WWVhciA9PT0gbWF4WWVhcjtcclxuXHJcbiAgICAgICAgICAgIGxldCBtb250aEh0bWwgPSAnPHNlbGVjdCBjbGFzcz1cIm1vbnRoc2VsZWN0XCI+JztcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCFpbk1pblllYXIgfHwgKG1pbkRhdGUgJiYgbSA+PSBtaW5EYXRlLm1vbnRoKCkpKSAmJiAoIWluTWF4WWVhciB8fCAobWF4RGF0ZSAmJiBtIDw9IG1heERhdGUubW9udGgoKSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhIdG1sICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBtICsgXCInXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAobSA9PT0gY3VycmVudE1vbnRoID8gXCIgc2VsZWN0ZWQ9J3NlbGVjdGVkJ1wiIDogXCJcIikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIj5cIiArIHRoaXMubG9jYWxlLm1vbnRoTmFtZXNbbV0gKyBcIjwvb3B0aW9uPlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb250aEh0bWwgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIG0gKyBcIidcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtID09PSBjdXJyZW50TW9udGggPyBcIiBzZWxlY3RlZD0nc2VsZWN0ZWQnXCIgOiBcIlwiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIGRpc2FibGVkPSdkaXNhYmxlZCc+XCIgKyB0aGlzLmxvY2FsZS5tb250aE5hbWVzW21dICsgXCI8L29wdGlvbj5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb250aEh0bWwgKz0gXCI8L3NlbGVjdD5cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCB5ZWFySHRtbCA9ICc8c2VsZWN0IGNsYXNzPVwieWVhcnNlbGVjdFwiPic7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSBtaW5ZZWFyOyB5IDw9IG1heFllYXI7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgeWVhckh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgeSArICdcIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICh5ID09PSBjdXJyZW50WWVhciA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgJz4nICsgeSArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHllYXJIdG1sICs9ICc8L3NlbGVjdD4nO1xyXG5cclxuICAgICAgICAgICAgZGF0ZUh0bWwgPSBtb250aEh0bWwgKyB5ZWFySHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzx0aCBjb2xzcGFuPVwiNVwiIGNsYXNzPVwibW9udGhcIj4nICsgZGF0ZUh0bWwgKyAnPC90aD4nO1xyXG4gICAgICAgIGlmICgoIW1heERhdGUgfHwgbWF4RGF0ZS5pc0FmdGVyKGNhbGVuZGFyTWF0cml4Lmxhc3REYXkpKSAmJiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzIHx8IHNpZGUgPT09ICdyaWdodCcgfHwgdGhpcy5zaW5nbGVEYXRlUGlja2VyKSkge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8dGggY2xhc3M9XCJuZXh0IGF2YWlsYWJsZVwiPjxzcGFuPjwvc3Bhbj48L3RoPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHRoPjwvdGg+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzwvdHI+JztcclxuICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgLy8gYWRkIHdlZWsgbnVtYmVyIGxhYmVsXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtOdW1iZXJzIHx8IHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzKVxyXG4gICAgICAgICAgICBodG1sICs9ICc8dGggY2xhc3M9XCJ3ZWVrXCI+JyArIHRoaXMubG9jYWxlLndlZWtMYWJlbCArICc8L3RoPic7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicgKyB0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrW2ldICsgJzwvdGg+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzwvdHI+JztcclxuICAgICAgICBodG1sICs9ICc8L3RoZWFkPic7XHJcbiAgICAgICAgaHRtbCArPSAnPHRib2R5Pic7XHJcblxyXG4gICAgICAgIC8vYWRqdXN0IG1heERhdGUgdG8gcmVmbGVjdCB0aGUgbWF4U3BhbiBzZXR0aW5nIGluIG9yZGVyIHRvXHJcbiAgICAgICAgLy9ncmV5IG91dCBlbmQgZGF0ZXMgYmV5b25kIHRoZSBtYXhTcGFuXHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSA9PT0gbnVsbCAmJiB0aGlzLm1heFNwYW4pIHtcclxuICAgICAgICAgICAgbGV0IG1heExpbWl0ID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5tYXhTcGFuKS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgIGlmICghbWF4RGF0ZSB8fCBtYXhMaW1pdC5pc0JlZm9yZShtYXhEYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgbWF4RGF0ZSA9IG1heExpbWl0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA2OyByb3crKykge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB3ZWVrIG51bWJlclxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93V2Vla051bWJlcnMpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY2xhc3M9XCJ3ZWVrXCI+JyArIGNhbGVuZGFyTWF0cml4W3Jvd11bMF0ud2VlaygpICsgJzwvdGQ+JztcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zaG93SVNPV2Vla051bWJlcnMpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY2xhc3M9XCJ3ZWVrXCI+JyArIGNhbGVuZGFyTWF0cml4W3Jvd11bMF0uaXNvV2VlaygpICsgJzwvdGQ+JztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDc7IGNvbCsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsYXNzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCB0b2RheSdzIGRhdGVcclxuICAgICAgICAgICAgICAgIGlmIChjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNTYW1lKG5ldyBEYXRlKCksIFwiZGF5XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgndG9kYXknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCB3ZWVrZW5kc1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5pc29XZWVrZGF5KCkgPiA1KVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnd2Vla2VuZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZ3JleSBvdXQgdGhlIGRhdGVzIGluIG90aGVyIG1vbnRocyBkaXNwbGF5ZWQgYXQgYmVnaW5uaW5nIGFuZCBlbmQgb2YgdGhpcyBjYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5tb250aCgpICE9PSBjYWxlbmRhck1hdHJpeFsxXVsxXS5tb250aCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2VuZHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2Rvbid0IGFsbG93IHNlbGVjdGlvbiBvZiBkYXRlcyBiZWZvcmUgdGhlIG1pbmltdW0gZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2Rvbid0IGFsbG93IHNlbGVjdGlvbiBvZiBkYXRlcyBhZnRlciB0aGUgbWF4aW11bSBkYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNBZnRlcihtYXhEYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2Rvbid0IGFsbG93IHNlbGVjdGlvbiBvZiBkYXRlIGlmIGEgY3VzdG9tIGZ1bmN0aW9uIGRlY2lkZXMgaXQncyBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ludmFsaWREYXRlKGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHN0YXJ0IGRhdGVcclxuICAgICAgICAgICAgICAgIGlmIChjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ3N0YXJ0LWRhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVuZCBkYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlICE9PSBudWxsICYmIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ2VuZC1kYXRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9oaWdobGlnaHQgZGF0ZXMgaW4tYmV0d2VlbiB0aGUgc2VsZWN0ZWQgZGF0ZXNcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgIT09IG51bGwgJiYgY2FsZW5kYXJNYXRyaXhbcm93XVtjb2xdID4gdGhpcy5zdGFydERhdGUgJiYgY2FsZW5kYXJNYXRyaXhbcm93XVtjb2xdIDwgdGhpcy5lbmREYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnaW4tcmFuZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2FwcGx5IGN1c3RvbSBjbGFzc2VzIGZvciB0aGlzIGRhdGVcclxuICAgICAgICAgICAgICAgIGxldCBpc0N1c3RvbSA9IHRoaXMuaXNDdXN0b21EYXRlKGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDdXN0b20gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpc0N1c3RvbSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChpc0N1c3RvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjbGFzc2VzLCBpc0N1c3RvbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNuYW1lID0gJycsIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjbmFtZSArPSBjbGFzc2VzW2ldICsgJyAnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzW2ldID09PSAnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIGNuYW1lICs9ICdhdmFpbGFibGUnO1xyXG5cclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjbGFzcz1cIicgKyBjbmFtZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgKyAnXCIgZGF0YS10aXRsZT1cIicgKyAncicgKyByb3cgKyAnYycgKyBjb2wgKyAnXCI+JyArIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5kYXRlKCkgKyAnPC90ZD4nO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9ICc8L3Rib2R5Pic7XHJcbiAgICAgICAgaHRtbCArPSAnPC90YWJsZT4nO1xyXG5cclxuICAgICAgICBqcS5odG1sKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtY2FsZW5kYXIuJyArIHNpZGUgKyAnIC5jYWxlbmRhci10YWJsZScpLCBodG1sKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVGltZVBpY2tlcihzaWRlKSB7XHJcblxyXG4gICAgICAgIC8vIERvbid0IGJvdGhlciB1cGRhdGluZyB0aGUgdGltZSBwaWNrZXIgaWYgaXQncyBjdXJyZW50bHkgZGlzYWJsZWRcclxuICAgICAgICAvLyBiZWNhdXNlIGFuIGVuZCBkYXRlIGhhc24ndCBiZWVuIGNsaWNrZWQgeWV0XHJcbiAgICAgICAgaWYgKHNpZGUgPT09ICdyaWdodCcgJiYgIXRoaXMuZW5kRGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCwgc2VsZWN0ZWQsIG1pbkRhdGUsIG1heERhdGUgPSB0aGlzLm1heERhdGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heFNwYW4gJiYgKCF0aGlzLm1heERhdGUgfHwgdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5tYXhTcGFuKS5pc0JlZm9yZSh0aGlzLm1heERhdGUpKSlcclxuICAgICAgICAgICAgbWF4RGF0ZSA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuYWRkKHRoaXMubWF4U3Bhbik7XHJcblxyXG4gICAgICAgIGlmIChzaWRlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBtaW5EYXRlID0gdGhpcy5taW5EYXRlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBtaW5EYXRlID0gdGhpcy5zdGFydERhdGU7XHJcblxyXG4gICAgICAgICAgICAvL1ByZXNlcnZlIHRoZSB0aW1lIGFscmVhZHkgc2VsZWN0ZWRcclxuICAgICAgICAgICAgbGV0IHRpbWVTZWxlY3RvciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtY2FsZW5kYXIucmlnaHQgLmNhbGVuZGFyLXRpbWUnKTtcclxuICAgICAgICAgICAgaWYgKHRpbWVTZWxlY3Rvci5pbm5lckhUTUwgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZC5ob3VyKCFpc05hTihzZWxlY3RlZC5ob3VyKCkpID8gc2VsZWN0ZWQuaG91cigpIDogIGpxLmZpbmRTZWxlY3RlZE9wdGlvbih0aW1lU2VsZWN0b3IucXVlcnlTZWxlY3RvcignLmhvdXJzZWxlY3QnKSkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQubWludXRlKCFpc05hTihzZWxlY3RlZC5taW51dGUoKSkgPyBzZWxlY3RlZC5taW51dGUoKSA6IGpxLmZpbmRTZWxlY3RlZE9wdGlvbih0aW1lU2VsZWN0b3IucXVlcnlTZWxlY3RvcignLm1pbnV0ZXNlbGVjdCcpKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZC5zZWNvbmQoIWlzTmFOKHNlbGVjdGVkLnNlY29uZCgpKSA/IHNlbGVjdGVkLnNlY29uZCgpIDoganEuZmluZFNlbGVjdGVkT3B0aW9uKHRpbWVTZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuc2Vjb25kc2VsZWN0JykpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFtcG0gPSBqcS5maW5kU2VsZWN0ZWRPcHRpb24odGltZVNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5hbXBtc2VsZWN0JykpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIHNlbGVjdGVkLmhvdXIoKSA8IDEyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5ob3VyKHNlbGVjdGVkLmhvdXIoKSArIDEyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBzZWxlY3RlZC5ob3VyKCkgPT09IDEyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5ob3VyKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSlcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHNlbGVjdGVkLmlzQWZ0ZXIobWF4RGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IG1heERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGhvdXJzXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgaHRtbCA9ICc8c2VsZWN0IGNsYXNzPVwiaG91cnNlbGVjdFwiPic7XHJcblxyXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMudGltZVBpY2tlcjI0SG91ciA/IDAgOiAxO1xyXG4gICAgICAgIGxldCBlbmQgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPyAyMyA6IDEyO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlfaW5fMjQgPSBpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cilcclxuICAgICAgICAgICAgICAgIGlfaW5fMjQgPSBzZWxlY3RlZC5ob3VyKCkgPj0gMTIgPyAoaSA9PT0gMTIgPyAxMiA6IGkgKyAxMikgOiAoaSA9PT0gMTIgPyAwIDogaSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGltZSA9IHNlbGVjdGVkLmNsb25lKCkuaG91cihpX2luXzI0KTtcclxuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHRpbWUubWludXRlKDU5KS5pc0JlZm9yZShtaW5EYXRlKSlcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgdGltZS5taW51dGUoMCkuaXNBZnRlcihtYXhEYXRlKSlcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpX2luXzI0ID09PSBzZWxlY3RlZC5ob3VyKCkgJiYgIWRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBpICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiPicgKyBpICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCI+JyArIGkgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gbWludXRlc1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzogPHNlbGVjdCBjbGFzcz1cIm1pbnV0ZXNlbGVjdFwiPic7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBwYWRkZWQgPSBpIDwgMTAgPyAnMCcgKyBpIDogaTtcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSBzZWxlY3RlZC5jbG9uZSgpLm1pbnV0ZShpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLnNlY29uZCg1OSkuaXNCZWZvcmUobWluRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHRpbWUuc2Vjb25kKDApLmlzQWZ0ZXIobWF4RGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQubWludXRlKCkgPT09IGkgJiYgIWRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiIGRpc2FibGVkPVwiZGlzYWJsZWRcIiBjbGFzcz1cImRpc2FibGVkXCI+JyArIHBhZGRlZCArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gc2Vjb25kc1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXJTZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzogPHNlbGVjdCBjbGFzcz1cInNlY29uZHNlbGVjdFwiPic7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYWRkZWQgPSBpIDwgMTAgPyAnMCcgKyBpIDogaTtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZWN0ZWQuY2xvbmUoKS5zZWNvbmQoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLmlzQmVmb3JlKG1pbkRhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHRpbWUuaXNBZnRlcihtYXhEYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnNlY29uZCgpID09PSBpICYmICFkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIHBhZGRlZCArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIEFNL1BNXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHNlbGVjdCBjbGFzcz1cImFtcG1zZWxlY3RcIj4nO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFtX2h0bWwgPSAnJztcclxuICAgICAgICAgICAgbGV0IHBtX2h0bWwgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHNlbGVjdGVkLmNsb25lKCkuaG91cigxMikubWludXRlKDApLnNlY29uZCgwKS5pc0JlZm9yZShtaW5EYXRlKSlcclxuICAgICAgICAgICAgICAgIGFtX2h0bWwgPSAnIGRpc2FibGVkPVwiZGlzYWJsZWRcIiBjbGFzcz1cImRpc2FibGVkXCInO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgc2VsZWN0ZWQuY2xvbmUoKS5ob3VyKDApLm1pbnV0ZSgwKS5zZWNvbmQoMCkuaXNBZnRlcihtYXhEYXRlKSlcclxuICAgICAgICAgICAgICAgIHBtX2h0bWwgPSAnIGRpc2FibGVkPVwiZGlzYWJsZWRcIiBjbGFzcz1cImRpc2FibGVkXCInO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmhvdXIoKSA+PSAxMikge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIkFNXCInICsgYW1faHRtbCArICc+QU08L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiUE1cIiBzZWxlY3RlZD1cInNlbGVjdGVkXCInICsgcG1faHRtbCArICc+UE08L29wdGlvbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIkFNXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyArIGFtX2h0bWwgKyAnPkFNPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cIlBNXCInICsgcG1faHRtbCArICc+UE08L29wdGlvbj4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBodG1sICs9ICc8L3NlbGVjdD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAganEuaHRtbCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZHJwLWNhbGVuZGFyLicgKyBzaWRlICsgJyAuY2FsZW5kYXItdGltZScpLCBodG1sKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRm9ybUlucHV0cygpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCAodGhpcy5lbmREYXRlICYmICh0aGlzLnN0YXJ0RGF0ZS5pc0JlZm9yZSh0aGlzLmVuZERhdGUpIHx8IHRoaXMuc3RhcnREYXRlLmlzU2FtZSh0aGlzLmVuZERhdGUpKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignYnV0dG9uLmFwcGx5QnRuJykuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdidXR0b24uYXBwbHlCdG4nKS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIGxldCBwYXJlbnRPZmZzZXQgPSB7IHRvcDogMCwgbGVmdDogMCB9LFxyXG4gICAgICAgICAgICBjb250YWluZXJUb3AsXHJcbiAgICAgICAgICAgIGRyb3BzID0gdGhpcy5kcm9wcztcclxuXHJcbiAgICAgICAgbGV0IHBhcmVudFJpZ2h0RWRnZSA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGlmICghKHRoaXMucGFyZW50RWwudGFnTmFtZSA9PT0gJ0JPRFknKSkge1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50RWxPZmZzZXQgPSBqcS5vZmZzZXQodGhpcy5wYXJlbnRFbCk7XHJcbiAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IHtcclxuICAgICAgICAgICAgICAgIHRvcDogcGFyZW50RWxPZmZzZXQudG9wIC0gdGhpcy5wYXJlbnRFbC5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwYXJlbnRFbE9mZnNldC5sZWZ0IC0gdGhpcy5wYXJlbnRFbC5zY3JvbGxMZWZ0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBhcmVudFJpZ2h0RWRnZSA9IHRoaXMucGFyZW50RWwuY2xpZW50V2lkdGggKyBwYXJlbnRFbE9mZnNldC5sZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogTm90ZToganF1ZXJ5IHRoaXMuY29udGFpbmVyLm91dGVySGVpZ2h0KCkgcmV0dXJucyBub24gMCBldmVuIGlmIG5vdCBzaG93aW5nLCBidXQgVmFuaWxsYS1KUyB0aGlzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQoKSByZXR1cm5zIDAgKi9cclxuICAgICAgICBsZXQgZWxlbWVudE9mZnNldCA9IGpxLm9mZnNldCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHN3aXRjaCAoZHJvcHMpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXV0byc6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBlbGVtZW50T2Zmc2V0LnRvcCArIHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lclRvcCArIHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodCA+PSB0aGlzLnBhcmVudEVsLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclRvcCA9IGVsZW1lbnRPZmZzZXQudG9wIC0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0IC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wcyA9ICd1cCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyVG9wID0gZWxlbWVudE9mZnNldC50b3AgLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBlbGVtZW50T2Zmc2V0LnRvcCArIHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGb3JjZSB0aGUgY29udGFpbmVyIHRvIGl0J3MgYWN0dWFsIHdpZHRoXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucmlnaHQgPSAnYXV0byc7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChkcm9wcyA9PT0gJ3VwJylcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZHJvcC11cCcpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC11cCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcGVucyA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJSaWdodCA9IHBhcmVudFJpZ2h0RWRnZSAtIGVsZW1lbnRPZmZzZXQubGVmdCAtIHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcldpZHRoICsgY29udGFpbmVyUmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gY29udGFpbmVyVG9wICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICc5cHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gY29udGFpbmVyVG9wICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gY29udGFpbmVyUmlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICdhdXRvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckxlZnQgPSBlbGVtZW50T2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCArIHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAvIDJcclxuICAgICAgICAgICAgICAgIC0gY29udGFpbmVyV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyTGVmdCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IGNvbnRhaW5lclRvcCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICdhdXRvJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnOXB4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXJMZWZ0ICsgY29udGFpbmVyV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gY29udGFpbmVyVG9wICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IGNvbnRhaW5lclRvcCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gY29udGFpbmVyTGVmdCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICdhdXRvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gZWxlbWVudE9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXJMZWZ0ICsgY29udGFpbmVyV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gY29udGFpbmVyVG9wICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IGNvbnRhaW5lclRvcCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gY29udGFpbmVyTGVmdCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICdhdXRvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2xpY2sgcHJveHkgdGhhdCBpcyBwcml2YXRlIHRvIHRoaXMgaW5zdGFuY2Ugb2YgZGF0ZXBpY2tlciwgZm9yIHVuYmluZGluZ1xyXG4gICAgICAgIGlmKCF0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSlcclxuICAgICAgICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkgPSBmdW5jdGlvbiAoZSkgeyB0aGlzLm91dHNpZGVDbGljayhlKTsgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBCaW5kIGdsb2JhbCBkYXRlcGlja2VyIG1vdXNlZG93biBmb3IgaGlkaW5nIGFuZFxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICAvLyBhbHNvIHN1cHBvcnQgbW9iaWxlIGRldmljZXNcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICBqcS5vbihkb2N1bWVudCwgJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZT1kcm9wZG93bl0nLCB0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSk7XHJcbiAgICAgICAgLy8gYW5kIGFsc28gY2xvc2Ugd2hlbiBmb2N1cyBjaGFuZ2VzIHRvIG91dHNpZGUgdGhlIHBpY2tlciAoZWcuIHRhYmJpbmcgYmV0d2VlbiBjb250cm9scylcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG5cclxuICAgICAgICAvLyBSZXBvc2l0aW9uIHRoZSBwaWNrZXIgaWYgdGhlIHdpbmRvdyBpcyByZXNpemVkIHdoaWxlIGl0J3Mgb3BlblxyXG4gICAgICAgIGlmKCF0aGlzLm1vdmVQcm94eSlcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUHJveHkgPSBmdW5jdGlvbiAoZSkgeyB0aGlzLm1vdmUoZSk7IH0uYmluZCh0aGlzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlUHJveHkpO1xyXG5cclxuICAgICAgICB0aGlzLm9sZFN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5vbGRFbmREYXRlID0gdGhpcy5lbmREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1JpZ2h0VGltZSA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Nob3cuZGF0ZXJhbmdlcGlja2VyJywge2J1YmJsZXM6IHRydWUsIGRldGFpbDogdGhpc30pKTtcclxuICAgICAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZShlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd2luZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL2luY29tcGxldGUgZGF0ZSBzZWxlY3Rpb24sIHJldmVydCB0byBsYXN0IHZhbHVlc1xyXG4gICAgICAgIGlmICghdGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5vbGRTdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5vbGRFbmREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIGEgbmV3IGRhdGUgcmFuZ2Ugd2FzIHNlbGVjdGVkLCBpbnZva2UgdGhlIHVzZXIgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIXRoaXMuc3RhcnREYXRlLmlzU2FtZSh0aGlzLm9sZFN0YXJ0RGF0ZSkgfHwgIXRoaXMuZW5kRGF0ZS5pc1NhbWUodGhpcy5vbGRFbmREYXRlKSlcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLCB0aGlzLmVuZERhdGUuY2xvbmUoKSwgdGhpcy5jaG9zZW5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vaWYgcGlja2VyIGlzIGF0dGFjaGVkIHRvIGEgdGV4dCBpbnB1dCwgdXBkYXRlIGl0XHJcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX291dHNpZGVDbGlja1Byb3h5KXtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICAgICAganEub2ZmKGRvY3VtZW50LCAnY2xpY2snLCAnW2RhdGEtdG9nZ2xlPWRyb3Bkb3duXScsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW92ZVByb3h5KVxyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlUHJveHkpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaGlkZS5kYXRlcmFuZ2VwaWNrZXInLCB7YnViYmxlczogdHJ1ZSwgZGV0YWlsOiB0aGlzfSkpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dHNpZGVDbGljayhlKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIC8vIGlmIHRoZSBwYWdlIGlzIGNsaWNrZWQgYW55d2hlcmUgZXhjZXB0IHdpdGhpbiB0aGUgZGF0ZXJhbmdlcnBpY2tlci9idXR0b25cclxuICAgICAgICAvLyBpdHNlbGYgdGhlbiBjYWxsIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAvLyBpZSBtb2RhbCBkaWFsb2cgZml4XHJcbiAgICAgICAgICAgIGUudHlwZSA9PT0gXCJmb2N1c2luXCIgfHxcclxuICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoanEuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQpKSB8fFxyXG4gICAgICAgICAgICB0YXJnZXQuY2xvc2VzdChqcS5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMuY29udGFpbmVyKSkgfHxcclxuICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5jYWxlbmRhci10YWJsZScpXHJcbiAgICAgICAgKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvdXRzaWRlQ2xpY2suZGF0ZXJhbmdlcGlja2VyJywge2J1YmJsZXM6IHRydWUsIGRldGFpbDogdGhpc30pKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FsZW5kYXJzKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3ctY2FsZW5kYXInKTtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Nob3dDYWxlbmRhci5kYXRlcmFuZ2VwaWNrZXInLCB7YnViYmxlczogdHJ1ZSwgZGV0YWlsOiB0aGlzfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVDYWxlbmRhcnMoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1jYWxlbmRhcicpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaGlkZUNhbGVuZGFyLmRhdGVyYW5nZXBpY2tlcicsIHtidWJibGVzOiB0cnVlLCBkZXRhaWw6IHRoaXN9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tSYW5nZShlKSB7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGUudGFyZ2V0LmRhdGFzZXQucmFuZ2VLZXk7XHJcbiAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIGlmIChsYWJlbCA9PT0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDYWxlbmRhcnMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZXMgPSB0aGlzLnJhbmdlc1tsYWJlbF07XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gZGF0ZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRhdGVzWzFdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlLmVuZE9mKCdkYXknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDYWxlbmRhcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja1ByZXYoZSkge1xyXG4gICAgICAgIGxldCBjYWwgPSBlLnRhcmdldC5jbG9zZXN0KCcuZHJwLWNhbGVuZGFyJyk7IC8vIE5vdGU6IG9yaWdpbmFsIHVzZSBwYXJlbnRzIG5vdCBjbG9zZXN0LlxyXG4gICAgICAgIGlmIChjYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguc3VidHJhY3QoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycylcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguc3VidHJhY3QoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tOZXh0KGUpIHtcclxuICAgICAgICBsZXQgY2FsID0gZS50YXJnZXQuY2xvc2VzdCgnLmRycC1jYWxlbmRhcicpOyAvLyBOb3RlOiBvcmlnaW5hbCB1c2UgcGFyZW50cyBub3QgY2xvc2VzdC5cclxuICAgICAgICBpZiAoY2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5hZGQoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaG92ZXJEYXRlKGUpIHtcclxuXHJcbiAgICAgICAgLy9pZ25vcmUgZGF0ZXMgdGhhdCBjYW4ndCBiZSBzZWxlY3RlZFxyXG4gICAgICAgIGlmKCEoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdmFpbGFibGUnKSkpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gZS50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgICBsZXQgcm93ID0gdGl0bGUuc3Vic3RyKDEsIDEpO1xyXG4gICAgICAgIGxldCBjb2wgPSB0aXRsZS5zdWJzdHIoMywgMSk7XHJcbiAgICAgICAgbGV0IGNhbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKTsgLy8gTm90ZTogb3JpZ2luYWwgdXNlIHBhcmVudHMgbm90IGNsb3Nlc3QuXHJcbiAgICAgICAgbGV0IGRhdGUgPSBjYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JykgPyB0aGlzLmxlZnRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF0gOiB0aGlzLnJpZ2h0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdO1xyXG5cclxuICAgICAgICAvL2hpZ2hsaWdodCB0aGUgZGF0ZXMgYmV0d2VlbiB0aGUgc3RhcnQgZGF0ZSBhbmQgdGhlIGRhdGUgYmVpbmcgaG92ZXJlZCBhcyBhIHBvdGVudGlhbCBlbmQgZGF0ZVxyXG4gICAgICAgIGxldCBsZWZ0Q2FsZW5kYXIgPSB0aGlzLmxlZnRDYWxlbmRhcjtcclxuICAgICAgICBsZXQgcmlnaHRDYWxlbmRhciA9IHRoaXMucmlnaHRDYWxlbmRhcjtcclxuICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgbGV0IHRkRWxMaXN0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRycC1jYWxlbmRhciB0Ym9keSB0ZCcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRkRWxMaXN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAvL3NraXAgd2VlayBudW1iZXJzLCBvbmx5IGxvb2sgYXQgZGF0ZXNcclxuICAgICAgICAgICAgICAgIGlmKHRkRWxMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucygnd2VlaycpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlID0gdGRFbExpc3RbaV0uZGF0YXNldC50aXRsZTtcclxuICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aXRsZS5zdWJzdHIoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gdGl0bGUuc3Vic3RyKDMsIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbCA9IHRkRWxMaXN0W2ldLmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKTsgLy8gTm90ZTogb3JpZ2luYWwgdXNlIHBhcmVudHMgbm90IGNsb3Nlc3QuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHQgPSBjYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JykgPyBsZWZ0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdIDogcmlnaHRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGR0LmlzQWZ0ZXIoc3RhcnREYXRlKSAmJiBkdC5pc0JlZm9yZShkYXRlKSkgfHwgZHQuaXNTYW1lKGRhdGUsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRkRWxMaXN0W2ldLmNsYXNzTGlzdC5hZGQoJ2luLXJhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRkRWxMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2luLXJhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEYXRlKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2F2YWlsYWJsZScpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IGUudGFyZ2V0LmRhdGFzZXQudGl0bGU7XHJcblxyXG4gICAgICAgIGxldCByb3cgPSB0aXRsZS5zdWJzdHIoMSwgMSk7XHJcbiAgICAgICAgbGV0IGNvbCA9IHRpdGxlLnN1YnN0cigzLCAxKTtcclxuICAgICAgICBsZXQgY2FsID0gZS50YXJnZXQuY2xvc2VzdCgnLmRycC1jYWxlbmRhcicpOyAgLy8gTm90ZTogb3JpZ2luYWwgdXNlIHBhcmVudHMgbm90IGNsb3Nlc3QuXHJcbiAgICAgICAgbGV0IGRhdGUgPSBjYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JykgPyB0aGlzLmxlZnRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF0gOiB0aGlzLnJpZ2h0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gZG8gYSBmZXcgdGhpbmdzOlxyXG4gICAgICAgIC8vICogYWx0ZXJuYXRlIGJldHdlZW4gc2VsZWN0aW5nIGEgc3RhcnQgYW5kIGVuZCBkYXRlIGZvciB0aGUgcmFuZ2UsXHJcbiAgICAgICAgLy8gKiBpZiB0aGUgdGltZSBwaWNrZXIgaXMgZW5hYmxlZCwgYXBwbHkgdGhlIGhvdXIvbWludXRlL3NlY29uZCBmcm9tIHRoZSBzZWxlY3QgYm94ZXMgdG8gdGhlIGNsaWNrZWQgZGF0ZVxyXG4gICAgICAgIC8vICogaWYgYXV0b2FwcGx5IGlzIGVuYWJsZWQsIGFuZCBhbiBlbmQgZGF0ZSB3YXMgY2hvc2VuLCBhcHBseSB0aGUgc2VsZWN0aW9uXHJcbiAgICAgICAgLy8gKiBpZiBzaW5nbGUgZGF0ZSBwaWNrZXIgbW9kZSwgYW5kIHRpbWUgcGlja2VyIGlzbid0IGVuYWJsZWQsIGFwcGx5IHRoZSBzZWxlY3Rpb24gaW1tZWRpYXRlbHlcclxuICAgICAgICAvLyAqIGlmIG9uZSBvZiB0aGUgaW5wdXRzIGFib3ZlIHRoZSBjYWxlbmRhcnMgd2FzIGZvY3VzZWQsIGNhbmNlbCB0aGF0IG1hbnVhbCBpbnB1dFxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgfHwgZGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSwgJ2RheScpKSB7IC8vcGlja2luZyBzdGFydFxyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5ob3Vyc2VsZWN0JykudmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFtcG0gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuYW1wbXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLm1pbnV0ZXNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5taW51dGVzZWxlY3Qgb3B0aW9uOmxhc3QtY2hpbGQnKS52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuc2Vjb25kc2VsZWN0JykudmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZS5jbG9uZSgpLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUoZGF0ZS5jbG9uZSgpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVuZERhdGUgJiYgZGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHtcclxuICAgICAgICAgICAgLy9zcGVjaWFsIGNhc2U6IGNsaWNraW5nIHRoZSBzYW1lIGRhdGUgZm9yIHN0YXJ0L2VuZCxcclxuICAgICAgICAgICAgLy9idXQgdGhlIHRpbWUgb2YgdGhlIGVuZCBkYXRlIGlzIGJlZm9yZSB0aGUgc3RhcnQgZGF0ZVxyXG4gICAgICAgICAgICB0aGlzLnNldEVuZERhdGUodGhpcy5zdGFydERhdGUuY2xvbmUoKSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gcGlja2luZyBlbmRcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLmhvdXJzZWxlY3QnKS52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW1wbSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAuYW1wbXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5taW51dGVzZWxlY3QnKS52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1pbnV0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLm1pbnV0ZXNlbGVjdCBvcHRpb246bGFzdC1jaGlsZCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcyA/IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAuc2Vjb25kc2VsZWN0JykudmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZS5jbG9uZSgpLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGRhdGUuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyICYmIHRoaXMuYXV0b0FwcGx5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcblxyXG4gICAgICAgIC8vVGhpcyBpcyB0byBjYW5jZWwgdGhlIGJsdXIgZXZlbnQgaGFuZGxlciBpZiB0aGUgbW91c2Ugd2FzIGluIG9uZSBvZiB0aGUgaW5wdXRzXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKSB7XHJcbiAgICAgICAgbGV0IGN1c3RvbVJhbmdlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcmFuZ2VzS2V5ID0gT2JqZWN0LmtleXModGhpcy5yYW5nZXMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzS2V5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCByYW5nZSA9IHRoaXMucmFuZ2VzW3Jhbmdlc0tleVtpXV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtYXQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIgOiBcIllZWVktTU0tREQgSEg6bW1cIjtcclxuICAgICAgICAgICAgICAgIC8vaWdub3JlIHRpbWVzIHdoZW4gY29tcGFyaW5nIGRhdGVzIGlmIHRpbWUgcGlja2VyIHNlY29uZHMgaXMgbm90IGVuYWJsZWRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSA9PT0gcmFuZ2VbMF0uZm9ybWF0KGZvcm1hdCkgJiYgdGhpcy5lbmREYXRlLmZvcm1hdChmb3JtYXQpID09PSByYW5nZVsxXS5mb3JtYXQoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmdlc0xpTGlzdCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZXMgbGknKTtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZXNMaUxpc3RbaV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IHJhbmdlc0xpTGlzdFtpXS5kYXRhc2V0LnJhbmdlS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9pZ25vcmUgdGltZXMgd2hlbiBjb21wYXJpbmcgZGF0ZXMgaWYgdGltZSBwaWNrZXIgaXMgbm90IGVuYWJsZWRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gcmFuZ2VbMF0uZm9ybWF0KCdZWVlZLU1NLUREJykgJiYgdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSByYW5nZVsxXS5mb3JtYXQoJ1lZWVktTU0tREQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmdlc0xpTGlzdCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZXMgbGknKTtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZXNMaUxpc3RbaV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IHJhbmdlc0xpTGlzdFtpXS5kYXRhc2V0LnJhbmdlS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXN0b21SYW5nZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93Q3VzdG9tUmFuZ2VMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlc0xpTGFzdEVsID0ganEuZmluZExhc3QodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJhbmdlcyBsaScpKTtcclxuICAgICAgICAgICAgICAgIGlmIChyYW5nZXNMaUxhc3RFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlc0xpTGFzdEVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSByYW5nZXNMaUxhc3RFbC5kYXRhc2V0LnJhbmdlS2V5O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob3NlbkxhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbGVuZGFycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0FwcGx5KGUpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywge2J1YmJsZXM6IHRydWUsIGRldGFpbDoge3BpY2tlcjogdGhpc319KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDYW5jZWwoZSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5vbGRTdGFydERhdGU7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5vbGRFbmREYXRlO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjYW5jZWwuZGF0ZXJhbmdlcGlja2VyJywge2J1YmJsZXM6IHRydWUsIGRldGFpbDogdGhpc30pKTtcclxuICAgIH1cclxuXHJcbiAgICBtb250aE9yWWVhckNoYW5nZWQoZSkge1xyXG4gICAgICAgIGxldCBpc0xlZnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuZHJwLWNhbGVuZGFyJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JyksXHJcbiAgICAgICAgICAgIGxlZnRPclJpZ2h0ID0gaXNMZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgY2FsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1jYWxlbmRhci4nK2xlZnRPclJpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gTW9udGggbXVzdCBiZSBOdW1iZXIgZm9yIG5ldyBtb21lbnQgdmVyc2lvbnNcclxuICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludChjYWwucXVlcnlTZWxlY3RvcignLm1vbnRoc2VsZWN0JykudmFsdWUsIDEwKTtcclxuICAgICAgICBsZXQgeWVhciA9IGNhbC5xdWVyeVNlbGVjdG9yKCcueWVhcnNlbGVjdCcpLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIWlzTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoeWVhciA8IHRoaXMuc3RhcnREYXRlLnllYXIoKSB8fCAoeWVhciA9PT0gdGhpcy5zdGFydERhdGUueWVhcigpICYmIG1vbnRoIDwgdGhpcy5zdGFydERhdGUubW9udGgoKSkpIHtcclxuICAgICAgICAgICAgICAgIG1vbnRoID0gdGhpcy5zdGFydERhdGUubW9udGgoKTtcclxuICAgICAgICAgICAgICAgIHllYXIgPSB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgPCB0aGlzLm1pbkRhdGUueWVhcigpIHx8ICh5ZWFyID09PSB0aGlzLm1pbkRhdGUueWVhcigpICYmIG1vbnRoIDwgdGhpcy5taW5EYXRlLm1vbnRoKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IHRoaXMubWluRGF0ZS5tb250aCgpO1xyXG4gICAgICAgICAgICAgICAgeWVhciA9IHRoaXMubWluRGF0ZS55ZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgPiB0aGlzLm1heERhdGUueWVhcigpIHx8ICh5ZWFyID09PSB0aGlzLm1heERhdGUueWVhcigpICYmIG1vbnRoID4gdGhpcy5tYXhEYXRlLm1vbnRoKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IHRoaXMubWF4RGF0ZS5tb250aCgpO1xyXG4gICAgICAgICAgICAgICAgeWVhciA9IHRoaXMubWF4RGF0ZS55ZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0xlZnQpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGgubW9udGgobW9udGgpLnllYXIoeWVhcik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycylcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmNsb25lKCkuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5tb250aChtb250aCkueWVhcih5ZWFyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlua2VkQ2FsZW5kYXJzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQ2hhbmdlZChlKSB7XHJcbiAgICAgICAgbGV0IGNhbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKSxcclxuICAgICAgICAgICAgaXNMZWZ0ID0gY2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpO1xyXG5cclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KGNhbC5xdWVyeVNlbGVjdG9yKCcuaG91cnNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IHBhcnNlSW50KGNhbC5xdWVyeVNlbGVjdG9yKCcubWludXRlc2VsZWN0JykudmFsdWUsIDEwKTtcclxuICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xyXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChqcS5maW5kTGFzdChjYWwucXVlcnlTZWxlY3RvckFsbCgnLm1pbnV0ZXNlbGVjdCBvcHRpb24nKSkudmFsdWUsIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludChjYWwucXVlcnlTZWxlY3RvcignLnNlY29uZHNlbGVjdCcpLnZhbHVlLCAxMCkgOiAwO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xyXG4gICAgICAgICAgICBsZXQgYW1wbSA9IGNhbC5xdWVyeVNlbGVjdG9yKCcuYW1wbXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpXHJcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMilcclxuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTGVmdCkge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBzdGFydC5ob3VyKGhvdXIpO1xyXG4gICAgICAgICAgICBzdGFydC5taW51dGUobWludXRlKTtcclxuICAgICAgICAgICAgc3RhcnQuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZERhdGUgJiYgdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSBzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJiB0aGlzLmVuZERhdGUuaXNCZWZvcmUoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoc3RhcnQuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgZW5kID0gdGhpcy5lbmREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGVuZC5ob3VyKGhvdXIpO1xyXG4gICAgICAgICAgICBlbmQubWludXRlKG1pbnV0ZSk7XHJcbiAgICAgICAgICAgIGVuZC5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3VwZGF0ZSB0aGUgY2FsZW5kYXJzIHNvIGFsbCBjbGlja2FibGUgZGF0ZXMgcmVmbGVjdCB0aGUgbmV3IHRpbWUgY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgdGhlIGZvcm0gaW5wdXRzIGFib3ZlIHRoZSBjYWxlbmRhcnMgd2l0aCB0aGUgbmV3IHRpbWVcclxuICAgICAgICB0aGlzLnVwZGF0ZUZvcm1JbnB1dHMoKTtcclxuXHJcbiAgICAgICAgLy9yZS1yZW5kZXIgdGhlIHRpbWUgcGlja2VycyBiZWNhdXNlIGNoYW5naW5nIG9uZSBzZWxlY3Rpb24gY2FuIGFmZmVjdCB3aGF0J3MgZW5hYmxlZCBpbiBhbm90aGVyXHJcbiAgICAgICAgbGV0IGRycENhbGVuZGFyRWxMaXN0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRycC1jYWxlbmRhcicpO1xyXG4gICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ2NoYW5nZScsICdzZWxlY3QuaG91cnNlbGVjdCxzZWxlY3QubWludXRlc2VsZWN0LHNlbGVjdC5zZWNvbmRzZWxlY3Qsc2VsZWN0LmFtcG1zZWxlY3QnLCB0aGlzLnRpbWVDaGFuZ2VkUHJveHkpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ2xlZnQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ3JpZ2h0Jyk7XHJcblxyXG4gICAgICAgIGpxLm9uKGRycENhbGVuZGFyRWxMaXN0LCAnY2hhbmdlJywgJ3NlbGVjdC5ob3Vyc2VsZWN0LHNlbGVjdC5taW51dGVzZWxlY3Qsc2VsZWN0LnNlY29uZHNlbGVjdCxzZWxlY3QuYW1wbXNlbGVjdCcsIHRoaXMudGltZUNoYW5nZWRQcm94eSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudENoYW5nZWQoKSB7XHJcbiAgICAgICAgaWYoISh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykpIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5lbGVtZW50LnZhbHVlIHx8ICF0aGlzLmVsZW1lbnQudmFsdWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBkYXRlU3RyaW5nID0gdGhpcy5lbGVtZW50LnZhbHVlLnNwbGl0KHRoaXMubG9jYWxlLnNlcGFyYXRvciksXHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbnVsbCxcclxuICAgICAgICAgICAgZW5kID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGVTdHJpbmcubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KGRhdGVTdHJpbmdbMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIGVuZCA9IG1vbWVudChkYXRlU3RyaW5nWzFdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQodGhpcy5lbGVtZW50LnZhbHVlLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICBlbmQgPSBzdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc3RhcnQuaXNWYWxpZCgpIHx8ICFlbmQuaXNWYWxpZCgpKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgICB0aGlzLnNldEVuZERhdGUoZW5kKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlkb3duKGUpIHtcclxuICAgICAgICAvL2hpZGUgb24gdGFiIG9yIGVudGVyXHJcbiAgICAgICAgaWYgKChlLmtleUNvZGUgPT09IDkpIHx8IChlLmtleUNvZGUgPT09IDEzKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaGlkZSBvbiBlc2MgYW5kIHByZXZlbnQgcHJvcGFnYXRpb25cclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRWxlbWVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5zdGFydERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVEYXRlUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSArPSB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgKyB0aGlzLmVuZERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmVsZW1lbnQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLyogdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7IE5vdGU6IFx1MzBBNFx1MzBEOVx1MzBGM1x1MzBDOFx1RkYxRiAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX291dHNpZGVDbGlja1Byb3h5KSB7XHJcbiAgICAgICAgICAgIC8vIEJpbmQgZ2xvYmFsIGRhdGVwaWNrZXIgbW91c2Vkb3duIGZvciBoaWRpbmcgYW5kXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICAgICAgLy8gYWxzbyBzdXBwb3J0IG1vYmlsZSBkZXZpY2VzXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICBqcS5vZmYoZG9jdW1lbnQsICdjbGljaycsICdbZGF0YS10b2dnbGU9ZHJvcGRvd25dJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICAvLyBhbmQgYWxzbyBjbG9zZSB3aGVuIGZvY3VzIGNoYW5nZXMgdG8gb3V0c2lkZSB0aGUgcGlja2VyIChlZy4gdGFiYmluZyBiZXR3ZWVuIGNvbnRyb2xzKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubW92ZVByb3h5KXtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMubW92ZVByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubW92ZVByb3h5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNsaWNrUmFuZ2VQcm94eSl7XHJcbiAgICAgICAgICAgIGpxLm9mZih0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmFuZ2VzJyksICdjbGljaycsICdsaScsIHRoaXMuY2xpY2tSYW5nZVByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2xpY2tSYW5nZVByb3h5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHJwQnV0dG9uc0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1idXR0b25zJyk7XHJcbiAgICAgICAgaWYodGhpcy5jbGlja0FwcGx5UHJveHkpe1xyXG4gICAgICAgICAgICBqcS5vZmYoZHJwQnV0dG9uc0VsLCAnY2xpY2snLCAnYnV0dG9uLmFwcGx5QnRuJywgdGhpcy5jbGlja0FwcGx5UHJveHkpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jbGlja0FwcGx5UHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tDYW5jZWxQcm94eSl7XHJcbiAgICAgICAgICAgIGpxLm9mZihkcnBCdXR0b25zRWwsICdjbGljaycsICdidXR0b24uY2FuY2VsQnRuJywgdGhpcy5jbGlja0NhbmNlbFByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2xpY2tDYW5jZWxQcm94eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnIHx8IHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dQcm94eSl7XHJcbiAgICAgICAgICAgICAgICBqcS5vZmYodGhpcy5lbGVtZW50LCAnY2xpY2snLCB0aGlzLnNob3dQcm94eSk7XHJcbiAgICAgICAgICAgICAgICBqcS5vZmYodGhpcy5lbGVtZW50LCAnZm9jdXMnLCB0aGlzLnNob3dQcm94eSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zaG93UHJveHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5lbGVtZW50Q2hhbmdlZFByb3h5KXtcclxuICAgICAgICAgICAgICAgIGpxLm9mZih0aGlzLmVsZW1lbnQsICdrZXl1cCcsIHRoaXMuZWxlbWVudENoYW5nZWRQcm94eSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5lbGVtZW50Q2hhbmdlZFByb3h5O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZih0aGlzLmtleWRvd25Qcm94eSl7XHJcbiAgICAgICAgICAgICAgICBqcS5vZmYodGhpcy5lbGVtZW50LCAna2V5ZG93bicsIHRoaXMua2V5ZG93blByb3h5KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleWRvd25Qcm94eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudG9nZ2xlUHJveHkpe1xyXG4gICAgICAgICAgICAgICAganEub2ZmKHRoaXMuZWxlbWVudCwgJ2NsaWNrJywgdGhpcy50b2dnbGVQcm94eSk7XHJcbiAgICAgICAgICAgICAgICBqcS5vZmYodGhpcy5lbGVtZW50LCAna2V5ZG93bicsIHRoaXMudG9nZ2xlUHJveHkpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMudG9nZ2xlUHJveHk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcnBDYWxlbmRhckVsTGlzdCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcnAtY2FsZW5kYXInKTtcclxuICAgICAgICBpZih0aGlzLmNsaWNrUHJldlByb3h5KXtcclxuICAgICAgICAgICAganEub2ZmKGRycENhbGVuZGFyRWxMaXN0LCAnY2xpY2snLCAnLnByZXYnLCB0aGlzLmNsaWNrUHJldlByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2xpY2tQcmV2UHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tOZXh0UHJveHkpe1xyXG4gICAgICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdjbGljaycsICcubmV4dCcsIHRoaXMuY2xpY2tOZXh0UHJveHkpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jbGlja05leHRQcm94eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbGlja0RhdGVQcm94eSl7XHJcbiAgICAgICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ21vdXNlZG93bicsICd0ZC5hdmFpbGFibGUnLCB0aGlzLmNsaWNrRGF0ZVByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2xpY2tEYXRlUHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaG92ZXJEYXRlUHJveHkpe1xyXG4gICAgICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdtb3VzZWVudGVyJywgJ3RkLmF2YWlsYWJsZScsIHRoaXMuaG92ZXJEYXRlUHJveHkpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5ob3ZlckRhdGVQcm94eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tb250aE9yWWVhckNoYW5nZWRQcm94eSl7XHJcbiAgICAgICAgICAgIGpxLm9mZihkcnBDYWxlbmRhckVsTGlzdCwgJ2NoYW5nZScsICdzZWxlY3QueWVhcnNlbGVjdCcsIHRoaXMubW9udGhPclllYXJDaGFuZ2VkUHJveHkpO1xyXG4gICAgICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdjaGFuZ2UnLCAnc2VsZWN0Lm1vbnRoc2VsZWN0JywgdGhpcy5tb250aE9yWWVhckNoYW5nZWRQcm94eSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZFByb3h5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnRpbWVDaGFuZ2VkUHJveHkpe1xyXG4gICAgICAgICAgICBqcS5vZmYoZHJwQ2FsZW5kYXJFbExpc3QsICdjaGFuZ2UnLCAnc2VsZWN0LmhvdXJzZWxlY3Qsc2VsZWN0Lm1pbnV0ZXNlbGVjdCxzZWxlY3Quc2Vjb25kc2VsZWN0LHNlbGVjdC5hbXBtc2VsZWN0JywgdGhpcy50aW1lQ2hhbmdlZFByb3h5KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGltZUNoYW5nZWRQcm94eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YXNldDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSYW5nZXMobmV3UmFuZ2VzKXtcclxuICAgICAgICBpZiAodHlwZW9mIG5ld1JhbmdlcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAganEub2ZmKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yYW5nZXMnKSwgJ2NsaWNrJywgJ2xpJywgdGhpcy5jbGlja1JhbmdlUHJveHkpO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcmFuZ2VzS2V5cyA9IE9iamVjdC5rZXlzKG5ld1Jhbmdlcyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByYW5nZXNLZXlzLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IHJhbmdlc0tleXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQsIGVuZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdSYW5nZXNbcmFuZ2VdWzBdID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChuZXdSYW5nZXNbcmFuZ2VdWzBdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbW9tZW50KG5ld1Jhbmdlc1tyYW5nZV1bMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3UmFuZ2VzW3JhbmdlXVsxXSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KG5ld1Jhbmdlc1tyYW5nZV1bMV0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KG5ld1Jhbmdlc1tyYW5nZV1bMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBvciBlbmQgZGF0ZSBleGNlZWQgdGhvc2UgYWxsb3dlZCBieSB0aGUgbWluRGF0ZSBvciBtYXhTcGFuXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25zLCBzaG9ydGVuIHRoZSByYW5nZSB0byB0aGUgYWxsb3dhYmxlIHBlcmlvZC5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4U3BhbiAmJiBtYXhEYXRlICYmIHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMubWF4U3BhbikuaXNBZnRlcihtYXhEYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlID0gc3RhcnQuY2xvbmUoKS5hZGQodGhpcy5tYXhTcGFuKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIGVuZC5pc0FmdGVyKG1heERhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1heERhdGUuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZW5kIG9mIHRoZSByYW5nZSBpcyBiZWZvcmUgdGhlIG1pbmltdW0gb3IgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZSBpc1xyXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIG1heGltdW0sIGRvbid0IGRpc3BsYXkgdGhpcyByYW5nZSBvcHRpb24gYXQgYWxsLlxyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLm1pbkRhdGUgJiYgZW5kLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgdGhpcy50aW1lcGlja2VyID8gJ21pbnV0ZScgOiAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKG1heERhdGUgJiYgc3RhcnQuaXNBZnRlcihtYXhEYXRlLCB0aGlzLnRpbWVwaWNrZXIgPyAnbWludXRlJyA6ICdkYXknKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9TdXBwb3J0IHVuaWNvZGUgY2hhcnMgaW4gdGhlIHJhbmdlIG5hbWVzLlxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSByYW5nZTtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZUh0bWwgPSBlbGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzW3JhbmdlSHRtbF0gPSBbc3RhcnQsIGVuZF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gJzx1bD4nO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xyXG4gICAgICAgICAgICAgICAgbGlzdCArPSAnPGxpIGRhdGEtcmFuZ2Uta2V5PVwiJyArIHJhbmdlICsgJ1wiPicgKyByYW5nZSArICc8L2xpPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QgKz0gJzxsaSBkYXRhLXJhbmdlLWtleT1cIicgKyB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsICsgJ1wiPicgKyB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsICsgJzwvbGk+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0ICs9ICc8L3VsPic7XHJcbiAgICAgICAgICAgIGxldCByYW5nZU5vZGUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmFuZ2VzJyk7XHJcbiAgICAgICAgICAgIHJhbmdlTm9kZS5yZW1vdmVDaGlsZChyYW5nZU5vZGUuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIHJhbmdlTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBsaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xpY2tSYW5nZVByb3h5ID0gZnVuY3Rpb24gKGUpIHsgdGhpcy5jbGlja1JhbmdlKGUpOyB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAganEub24odGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJhbmdlcycpLCAnY2xpY2snLCAnbGknLCB0aGlzLmNsaWNrUmFuZ2VQcm94eSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBhbHRlcm5hdGUganF1ZXJ5IGZ1bmN0aW9uIChzdWJzZXQpXHJcbmxldCBqcSA9IHtcclxuICAgIGFkZENsYXNzU3ViOiBmdW5jdGlvbiAoZWwsIGNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgY2xhc3NMaXN0ID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0W2ldLnRyaW0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoZWwsIGNsYXNzZXMpIHtcclxuICAgICAgICBpZiAoIWVsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbC5sZW5ndGggPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAganEuYWRkQ2xhc3NTdWIoZWxbaV0sIGNsYXNzZXMpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAganEuYWRkQ2xhc3NTdWIoZWwsIGNsYXNzZXMpO1xyXG4gICAgfSxcclxuICAgIGZpbmRMYXN0KGVsKSB7XHJcbiAgICAgICAgaWYoIWVsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodHlwZW9mIGVsLmxlbmd0aCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgIGlmKGVsLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxbZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfSxcclxuICAgIGZpbmRTZWxlY3RlZE9wdGlvbihlbCkge1xyXG4gICAgICAgIGlmKCFlbCB8fCAhZWwub3B0aW9ucyB8fCAhZWwub3B0aW9ucy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5vcHRpb25zLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgaWYoZWwub3B0aW9uc1tpXS5zZWxlY3RlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbC5vcHRpb25zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXRTZWxlY3RvckZyb21FbGVtZW50OiBmdW5jdGlvbiAoZWwpIHsgLy8gbm8gb3JpZ2luYWwganF1ZXJ5LCB0aW55IGltcGxlbWVudHMgZm9yIGNsb3Nlc3QoKSBmdW5jdGlvbi5cclxuICAgICAgICBpZiAoIWVsIHx8ICEoZWwgaW5zdGFuY2VvZiBFbGVtZW50KSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IHNlbGVjdG9yID0gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoZWwuaWQpXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvciArICcjJyArIGVsLmlkO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWwuY2xhc3NMaXN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yICs9ICcuJyArIGVsLmNsYXNzTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xyXG4gICAgfSxcclxuICAgIGh0bWw6IGZ1bmN0aW9uIChlbCwgaHRtbCkge1xyXG4gICAgICAgIGlmIChlbClcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH0sXHJcbiAgICBvZmZzZXQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGlmICghZWwpXHJcbiAgICAgICAgICAgIHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9O1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gemVyb3MgZm9yIGRpc2Nvbm5lY3RlZCBhbmQgaGlkZGVuIChkaXNwbGF5OiBub25lKSBlbGVtZW50cyAoZ2gtMjMxMClcclxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcclxuICAgICAgICAvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhXHJcbiAgICAgICAgLy8gZGlzY29ubmVjdGVkIG5vZGUgaW4gSUUgdGhyb3dzIGFuIGVycm9yXHJcbiAgICAgICAgaWYgKCFlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XHJcblxyXG4gICAgICAgIC8vIEdldCBkb2N1bWVudC1yZWxhdGl2ZSBwb3NpdGlvbiBieSBhZGRpbmcgdmlld3BvcnQgc2Nyb2xsIHRvIHZpZXdwb3J0LXJlbGF0aXZlIGdCQ1JcclxuICAgICAgICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCB3aW4gPSBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb2ZmU3ViOiBmdW5jdGlvbiAoZWwsIGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWwubGVuZ3RoID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgIGVsW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcclxuICAgIH0sXHJcbiAgICBvZmY6IGZ1bmN0aW9uIChlbCwgZXZlbnQsIHBhcmFtMSwgcGFyYW0yKSB7XHJcbiAgICAgICAgaWYgKCFlbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW0xID09PSAnZnVuY3Rpb24nKSB7IC8vIHBhcmFtIGlzIGxpc3RlbmVyXHJcbiAgICAgICAgICAgIGpxLm9mZlN1YihlbCwgZXZlbnQsIHBhcmFtMSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gcGFyYW0gaXMgc2VsZWN0b3JcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbC5sZW5ndGggPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGpxLm9mZlN1YihlbFtpXS5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtMSksIGV2ZW50LCBwYXJhbTIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBqcS5vZmZTdWIoZWwucXVlcnlTZWxlY3RvckFsbChwYXJhbTEpLCBldmVudCwgcGFyYW0yKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25TdWI6IGZ1bmN0aW9uIChlbCwgZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbC5sZW5ndGggPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgZWxbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xyXG4gICAgfSxcclxuICAgIG9uOiBmdW5jdGlvbiAoZWwsIGV2ZW50LCBwYXJhbTEsIHBhcmFtMikge1xyXG4gICAgICAgIGlmICghZWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtMSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBwYXJhbTEgaXMgbGlzdGVuZXJcclxuICAgICAgICAgICAganEub25TdWIoZWwsIGV2ZW50LCBwYXJhbTEpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIHBhcmFtMSBpcyBzZWxlY3RvclxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsLmxlbmd0aCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWwubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAganEub25TdWIoZWxbaV0ucXVlcnlTZWxlY3RvckFsbChwYXJhbTEpLCBldmVudCwgcGFyYW0yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAganEub25TdWIoZWwucXVlcnlTZWxlY3RvckFsbChwYXJhbTEpLCBldmVudCwgcGFyYW0yKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsS0FBQyxTQUFTLEdBQUUsR0FBRTtBQUFDLGtCQUFVLE9BQU8sV0FBUyxlQUFhLE9BQU8sU0FBTyxPQUFPLFVBQVEsRUFBRSxJQUFFLGNBQVksT0FBTyxVQUFRLE9BQU8sTUFBSSxPQUFPLENBQUMsS0FBRyxJQUFFLGVBQWEsT0FBTyxhQUFXLGFBQVcsS0FBRyxNQUFNLFFBQU0sRUFBRTtBQUFBLElBQUMsRUFBRSxTQUFNLFdBQVU7QUFBQztBQUFhLFVBQUksSUFBRSxLQUFJLElBQUUsS0FBSSxJQUFFLE1BQUssSUFBRSxlQUFjLElBQUUsVUFBUyxJQUFFLFVBQVMsSUFBRSxRQUFPLElBQUUsT0FBTSxJQUFFLFFBQU8sSUFBRSxTQUFRLElBQUUsV0FBVSxJQUFFLFFBQU8sSUFBRSxRQUFPLElBQUUsZ0JBQWUsSUFBRSw4RkFBNkYsSUFBRSx1RkFBc0YsSUFBRSxFQUFDLE1BQUssTUFBSyxVQUFTLDJEQUEyRCxNQUFNLEdBQUcsR0FBRSxRQUFPLHdGQUF3RixNQUFNLEdBQUcsR0FBRSxTQUFRLFNBQVNBLElBQUU7QUFBQyxZQUFJQyxLQUFFLENBQUMsTUFBSyxNQUFLLE1BQUssSUFBSSxHQUFFQyxLQUFFRixLQUFFO0FBQUksZUFBTSxNQUFJQSxNQUFHQyxJQUFHQyxLQUFFLE1BQUksRUFBRSxLQUFHRCxHQUFFQyxFQUFDLEtBQUdELEdBQUUsQ0FBQyxLQUFHO0FBQUEsTUFBRyxFQUFDLEdBQUUsSUFBRSxTQUFTRCxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsWUFBSUMsS0FBRSxPQUFPSCxFQUFDO0FBQUUsZUFBTSxDQUFDRyxNQUFHQSxHQUFFLFVBQVFGLEtBQUVELEtBQUUsS0FBRyxNQUFNQyxLQUFFLElBQUVFLEdBQUUsTUFBTSxFQUFFLEtBQUtELEVBQUMsSUFBRUY7QUFBQSxNQUFDLEdBQUUsSUFBRSxFQUFDLEdBQUUsR0FBRSxHQUFFLFNBQVNBLElBQUU7QUFBQyxZQUFJQyxLQUFFLENBQUNELEdBQUUsVUFBVSxHQUFFRSxLQUFFLEtBQUssSUFBSUQsRUFBQyxHQUFFRSxLQUFFLEtBQUssTUFBTUQsS0FBRSxFQUFFLEdBQUVFLEtBQUVGLEtBQUU7QUFBRyxnQkFBT0QsTUFBRyxJQUFFLE1BQUksT0FBSyxFQUFFRSxJQUFFLEdBQUUsR0FBRyxJQUFFLE1BQUksRUFBRUMsSUFBRSxHQUFFLEdBQUc7QUFBQSxNQUFDLEdBQUUsR0FBRSxTQUFTSixHQUFFQyxJQUFFQyxJQUFFO0FBQUMsWUFBR0QsR0FBRSxLQUFLLElBQUVDLEdBQUUsS0FBSyxFQUFFLFFBQU0sQ0FBQ0YsR0FBRUUsSUFBRUQsRUFBQztBQUFFLFlBQUlFLEtBQUUsTUFBSUQsR0FBRSxLQUFLLElBQUVELEdBQUUsS0FBSyxNQUFJQyxHQUFFLE1BQU0sSUFBRUQsR0FBRSxNQUFNLElBQUdHLEtBQUVILEdBQUUsTUFBTSxFQUFFLElBQUlFLElBQUUsQ0FBQyxHQUFFRSxLQUFFSCxLQUFFRSxLQUFFLEdBQUVFLEtBQUVMLEdBQUUsTUFBTSxFQUFFLElBQUlFLE1BQUdFLEtBQUUsS0FBRyxJQUFHLENBQUM7QUFBRSxlQUFNLEVBQUUsRUFBRUYsTUFBR0QsS0FBRUUsT0FBSUMsS0FBRUQsS0FBRUUsS0FBRUEsS0FBRUYsUUFBSztBQUFBLE1BQUUsR0FBRSxHQUFFLFNBQVNKLElBQUU7QUFBQyxlQUFPQSxLQUFFLElBQUUsS0FBSyxLQUFLQSxFQUFDLEtBQUcsSUFBRSxLQUFLLE1BQU1BLEVBQUM7QUFBQSxNQUFDLEdBQUUsR0FBRSxTQUFT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QUFRQSxLQUFFQSxHQUFFLEVBQUUsT0FBT0EsR0FBRSxDQUFDO0FBQUEsTUFBRSxHQUFFLElBQUUsU0FBU0QsSUFBRUMsSUFBRTtBQUFDLFlBQUlDLElBQUVDLEtBQUUsRUFBRTtBQUFTLFlBQUdBLElBQUU7QUFBQyxtQkFBUUMsS0FBRSxHQUFFQSxNQUFHLElBQUdBLE1BQUcsRUFBRSxLQUFHSixHQUFFLFFBQVFHLEdBQUVDLElBQUUsR0FBRUgsRUFBQyxDQUFDLElBQUUsSUFBRztBQUFDLFlBQUFDLEtBQUVFLEtBQUU7QUFBRztBQUFBLFVBQUs7QUFBQSxRQUFDLE1BQU0sQ0FBQUYsS0FBRUYsUUFBS0MsS0FBRSxPQUFLO0FBQU0sZUFBT0M7QUFBQSxNQUFDLEdBQUUsSUFBRSxFQUFDLEdBQUUsQ0FBQyxHQUFFLFNBQVNGLElBQUU7QUFBQyxhQUFLLFlBQVUsRUFBRUEsSUFBRSxLQUFFO0FBQUEsTUFBQyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsU0FBU0EsSUFBRTtBQUFDLGFBQUssWUFBVSxFQUFFQSxJQUFFLElBQUU7QUFBQSxNQUFDLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxTQUFTQSxJQUFFO0FBQUMsYUFBSyxRQUFNLEtBQUdBLEtBQUUsS0FBRztBQUFBLE1BQUMsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLFNBQVNBLElBQUU7QUFBQyxhQUFLLGVBQWEsTUFBSSxDQUFDQTtBQUFBLE1BQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxHQUFFLFNBQVNBLElBQUU7QUFBQyxhQUFLLGVBQWEsS0FBRyxDQUFDQTtBQUFBLE1BQUMsQ0FBQyxHQUFFLEtBQUksQ0FBQyxTQUFRLFNBQVNBLElBQUU7QUFBQyxhQUFLLGVBQWEsQ0FBQ0E7QUFBQSxNQUFDLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLFNBQVMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxHQUFFLEVBQUUsU0FBUyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxTQUFTLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLFNBQVMsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxPQUFPLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLE9BQU8sQ0FBQyxHQUFFLElBQUcsQ0FBQyxHQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLEtBQUssQ0FBQyxHQUFFLElBQUcsQ0FBQyxHQUFFLFNBQVNBLElBQUU7QUFBQyxZQUFJQyxLQUFFLEVBQUUsU0FBUUMsS0FBRUYsR0FBRSxNQUFNLEtBQUs7QUFBRSxZQUFHLEtBQUssTUFBSUUsR0FBRSxDQUFDLEdBQUVELEdBQUUsVUFBUUUsS0FBRSxHQUFFQSxNQUFHLElBQUdBLE1BQUcsRUFBRSxDQUFBRixHQUFFRSxFQUFDLEVBQUUsUUFBUSxVQUFTLEVBQUUsTUFBSUgsT0FBSSxLQUFLLE1BQUlHO0FBQUEsTUFBRSxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRSxPQUFPLENBQUMsR0FBRSxLQUFJLENBQUMsR0FBRSxTQUFTSCxJQUFFO0FBQUMsWUFBSUMsS0FBRSxFQUFFLFFBQVEsR0FBRUMsTUFBRyxFQUFFLGFBQWEsS0FBR0QsR0FBRSxJQUFLLFNBQVNELElBQUU7QUFBQyxpQkFBT0EsR0FBRSxNQUFNLEdBQUUsQ0FBQztBQUFBLFFBQUMsQ0FBRSxHQUFHLFFBQVFBLEVBQUMsSUFBRTtBQUFFLFlBQUdFLEtBQUUsRUFBRSxPQUFNLElBQUk7QUFBTSxhQUFLLFFBQU1BLEtBQUUsTUFBSUE7QUFBQSxNQUFDLENBQUMsR0FBRSxNQUFLLENBQUMsR0FBRSxTQUFTRixJQUFFO0FBQUMsWUFBSUMsS0FBRSxFQUFFLFFBQVEsRUFBRSxRQUFRRCxFQUFDLElBQUU7QUFBRSxZQUFHQyxLQUFFLEVBQUUsT0FBTSxJQUFJO0FBQU0sYUFBSyxRQUFNQSxLQUFFLE1BQUlBO0FBQUEsTUFBQyxDQUFDLEdBQUUsR0FBRSxDQUFDLFlBQVcsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxTQUFTRCxJQUFFO0FBQUMsYUFBSyxPQUFLLEVBQUVBLEVBQUM7QUFBQSxNQUFDLENBQUMsR0FBRSxNQUFLLENBQUMsU0FBUSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEdBQUUsR0FBRSxJQUFHLEVBQUM7QUFBRSxlQUFTLEVBQUVFLElBQUU7QUFBQyxZQUFJQyxJQUFFQztBQUFFLFFBQUFELEtBQUVELElBQUVFLEtBQUUsS0FBRyxFQUFFO0FBQVEsaUJBQVFDLE1BQUdILEtBQUVDLEdBQUUsUUFBUSxxQ0FBcUMsU0FBU0YsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGNBQUlFLEtBQUVGLE1BQUdBLEdBQUUsWUFBWTtBQUFFLGlCQUFPRCxNQUFHRSxHQUFFRCxFQUFDLEtBQUcsRUFBRUEsRUFBQyxLQUFHQyxHQUFFQyxFQUFDLEVBQUUsUUFBUSxrQ0FBa0MsU0FBU0wsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLG1CQUFPRCxNQUFHQyxHQUFFLE1BQU0sQ0FBQztBQUFBLFVBQUMsQ0FBRTtBQUFBLFFBQUMsQ0FBRSxHQUFHLE1BQU0sQ0FBQyxHQUFFSSxLQUFFRCxHQUFFLFFBQU9FLEtBQUUsR0FBRUEsS0FBRUQsSUFBRUMsTUFBRyxHQUFFO0FBQUMsY0FBSUMsS0FBRUgsR0FBRUUsRUFBQyxHQUFFRSxLQUFFLEVBQUVELEVBQUMsR0FBRUUsS0FBRUQsTUFBR0EsR0FBRSxDQUFDLEdBQUVFLEtBQUVGLE1BQUdBLEdBQUUsQ0FBQztBQUFFLFVBQUFKLEdBQUVFLEVBQUMsSUFBRUksS0FBRSxFQUFDLE9BQU1ELElBQUUsUUFBT0MsR0FBQyxJQUFFSCxHQUFFLFFBQVEsWUFBVyxFQUFFO0FBQUEsUUFBQztBQUFDLGVBQU8sU0FBU1IsSUFBRTtBQUFDLG1CQUFRQyxLQUFFLENBQUMsR0FBRUMsS0FBRSxHQUFFQyxLQUFFLEdBQUVELEtBQUVJLElBQUVKLE1BQUcsR0FBRTtBQUFDLGdCQUFJRSxLQUFFQyxHQUFFSCxFQUFDO0FBQUUsZ0JBQUcsWUFBVSxPQUFPRSxHQUFFLENBQUFELE1BQUdDLEdBQUU7QUFBQSxpQkFBVztBQUFDLGtCQUFJUSxLQUFFUixHQUFFLE9BQU1HLEtBQUVILEdBQUUsUUFBT0ksS0FBRVIsR0FBRSxNQUFNRyxFQUFDLEdBQUVNLEtBQUVHLEdBQUUsS0FBS0osRUFBQyxFQUFFLENBQUM7QUFBRSxjQUFBRCxHQUFFLEtBQUtOLElBQUVRLEVBQUMsR0FBRVQsS0FBRUEsR0FBRSxRQUFRUyxJQUFFLEVBQUU7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLFNBQVNULElBQUU7QUFBQyxnQkFBSUMsS0FBRUQsR0FBRTtBQUFVLGdCQUFHLFdBQVNDLElBQUU7QUFBQyxrQkFBSUMsS0FBRUYsR0FBRTtBQUFNLGNBQUFDLEtBQUVDLEtBQUUsT0FBS0YsR0FBRSxTQUFPLE1BQUksT0FBS0UsT0FBSUYsR0FBRSxRQUFNLElBQUcsT0FBT0EsR0FBRTtBQUFBLFlBQVM7QUFBQSxVQUFDLEVBQUVDLEVBQUMsR0FBRUE7QUFBQSxRQUFDO0FBQUEsTUFBQztBQUFDLGFBQU8sU0FBU0QsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLFFBQUFBLEdBQUUsRUFBRSxvQkFBa0IsTUFBR0YsTUFBR0EsR0FBRSxzQkFBb0IsSUFBRUEsR0FBRTtBQUFtQixZQUFJRyxLQUFFRixHQUFFLFdBQVVHLEtBQUVELEdBQUU7QUFBTSxRQUFBQSxHQUFFLFFBQU0sU0FBU0gsSUFBRTtBQUFDLGNBQUlDLEtBQUVELEdBQUUsTUFBS0csS0FBRUgsR0FBRSxLQUFJSyxLQUFFTCxHQUFFO0FBQUssZUFBSyxLQUFHRztBQUFFLGNBQUlHLEtBQUVELEdBQUUsQ0FBQztBQUFFLGNBQUcsWUFBVSxPQUFPQyxJQUFFO0FBQUMsZ0JBQUlDLEtBQUUsU0FBS0YsR0FBRSxDQUFDLEdBQUVHLEtBQUUsU0FBS0gsR0FBRSxDQUFDLEdBQUVJLEtBQUVGLE1BQUdDLElBQUVFLEtBQUVMLEdBQUUsQ0FBQztBQUFFLFlBQUFHLE9BQUlFLEtBQUVMLEdBQUUsQ0FBQyxJQUFHLElBQUUsS0FBSyxRQUFRLEdBQUUsQ0FBQ0UsTUFBR0csT0FBSSxJQUFFUixHQUFFLEdBQUdRLEVBQUMsSUFBRyxLQUFLLEtBQUcsU0FBU1YsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGtCQUFHO0FBQUMsb0JBQUcsQ0FBQyxLQUFJLEdBQUcsRUFBRSxRQUFRRixFQUFDLElBQUUsR0FBRyxRQUFPLElBQUksTUFBTSxRQUFNQSxLQUFFLE1BQUksS0FBR0QsRUFBQztBQUFFLG9CQUFJSSxLQUFFLEVBQUVILEVBQUMsRUFBRUQsRUFBQyxHQUFFSyxLQUFFRCxHQUFFLE1BQUtRLEtBQUVSLEdBQUUsT0FBTUUsS0FBRUYsR0FBRSxLQUFJRyxLQUFFSCxHQUFFLE9BQU1JLEtBQUVKLEdBQUUsU0FBUUssS0FBRUwsR0FBRSxTQUFRTSxLQUFFTixHQUFFLGNBQWFTLEtBQUVULEdBQUUsTUFBS1UsS0FBRVYsR0FBRSxNQUFLVyxLQUFFLG9CQUFJLFFBQUssSUFBRVQsT0FBSUQsTUFBR08sS0FBRSxJQUFFRyxHQUFFLFFBQVEsSUFBRyxJQUFFVixNQUFHVSxHQUFFLFlBQVksR0FBRSxJQUFFO0FBQUUsZ0JBQUFWLE1BQUcsQ0FBQ08sT0FBSSxJQUFFQSxLQUFFLElBQUVBLEtBQUUsSUFBRUcsR0FBRSxTQUFTO0FBQUcsb0JBQUksR0FBRSxJQUFFUixNQUFHLEdBQUUsSUFBRUMsTUFBRyxHQUFFLElBQUVDLE1BQUcsR0FBRSxJQUFFQyxNQUFHO0FBQUUsdUJBQU9HLEtBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUdBLEdBQUUsU0FBTyxHQUFHLENBQUMsSUFBRVgsS0FBRSxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxLQUFHLElBQUUsSUFBSSxLQUFLLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRVksT0FBSSxJQUFFWCxHQUFFLENBQUMsRUFBRSxLQUFLVyxFQUFDLEVBQUUsT0FBTyxJQUFHO0FBQUEsY0FBRSxTQUFPZCxJQUFFO0FBQUMsdUJBQU8sb0JBQUksS0FBSyxFQUFFO0FBQUEsY0FBQztBQUFBLFlBQUMsRUFBRUMsSUFBRUssSUFBRUgsSUFBRUQsRUFBQyxHQUFFLEtBQUssS0FBSyxHQUFFUSxNQUFHLFNBQUtBLE9BQUksS0FBSyxLQUFHLEtBQUssT0FBT0EsRUFBQyxFQUFFLEtBQUlELE1BQUdSLE1BQUcsS0FBSyxPQUFPSyxFQUFDLE1BQUksS0FBSyxLQUFHLG9CQUFJLEtBQUssRUFBRSxJQUFHLElBQUUsQ0FBQztBQUFBLFVBQUMsV0FBU0EsY0FBYSxNQUFNLFVBQVFPLEtBQUVQLEdBQUUsUUFBTyxJQUFFLEdBQUUsS0FBR08sSUFBRSxLQUFHLEdBQUU7QUFBQyxZQUFBUixHQUFFLENBQUMsSUFBRUMsR0FBRSxJQUFFLENBQUM7QUFBRSxnQkFBSSxJQUFFSixHQUFFLE1BQU0sTUFBS0csRUFBQztBQUFFLGdCQUFHLEVBQUUsUUFBUSxHQUFFO0FBQUMsbUJBQUssS0FBRyxFQUFFLElBQUcsS0FBSyxLQUFHLEVBQUUsSUFBRyxLQUFLLEtBQUs7QUFBRTtBQUFBLFlBQUs7QUFBQyxrQkFBSVEsT0FBSSxLQUFLLEtBQUcsb0JBQUksS0FBSyxFQUFFO0FBQUEsVUFBRTtBQUFBLGNBQU0sQ0FBQVQsR0FBRSxLQUFLLE1BQUtKLEVBQUM7QUFBQSxRQUFDO0FBQUEsTUFBQztBQUFBLElBQUMsQ0FBRTtBQUFBO0FBQUE7OztBQ0FyeUg7QUFBQTtBQUFBLEtBQUMsU0FBUyxHQUFFLEdBQUU7QUFBQyxrQkFBVSxPQUFPLFdBQVMsZUFBYSxPQUFPLFNBQU8sT0FBTyxVQUFRLEVBQUUsSUFBRSxjQUFZLE9BQU8sVUFBUSxPQUFPLE1BQUksT0FBTyxDQUFDLEtBQUcsSUFBRSxlQUFhLE9BQU8sYUFBVyxhQUFXLEtBQUcsTUFBTSw2QkFBMkIsRUFBRTtBQUFBLElBQUMsRUFBRSxTQUFNLFdBQVU7QUFBQztBQUFhLGFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFFLFVBQVUsZ0JBQWMsU0FBU2dCLElBQUVDLElBQUU7QUFBQyxpQkFBTyxLQUFLLE9BQU9ELElBQUVDLEVBQUMsS0FBRyxLQUFLLFFBQVFELElBQUVDLEVBQUM7QUFBQSxRQUFDO0FBQUEsTUFBQztBQUFBLElBQUMsQ0FBRTtBQUFBO0FBQUE7OztBQ0F0VztBQUFBO0FBQUEsS0FBQyxTQUFTLEdBQUUsR0FBRTtBQUFDLGtCQUFVLE9BQU8sV0FBUyxlQUFhLE9BQU8sU0FBTyxPQUFPLFVBQVEsRUFBRSxJQUFFLGNBQVksT0FBTyxVQUFRLE9BQU8sTUFBSSxPQUFPLENBQUMsS0FBRyxJQUFFLGVBQWEsT0FBTyxhQUFXLGFBQVcsS0FBRyxNQUFNLDhCQUE0QixFQUFFO0FBQUEsSUFBQyxFQUFFLFNBQU0sV0FBVTtBQUFDO0FBQWEsYUFBTyxTQUFTLEdBQUUsR0FBRTtBQUFDLFVBQUUsVUFBVSxpQkFBZSxTQUFTQyxJQUFFQyxJQUFFO0FBQUMsaUJBQU8sS0FBSyxPQUFPRCxJQUFFQyxFQUFDLEtBQUcsS0FBSyxTQUFTRCxJQUFFQyxFQUFDO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBQSxJQUFDLENBQUU7QUFBQTtBQUFBOzs7QUNBelc7QUFBQTtBQU1DLEtBQUMsU0FBVSxRQUFRLFNBQVM7QUFDekIsYUFBTyxZQUFZLFlBQVksT0FBTyxXQUFXLGNBQWMsT0FBTyxVQUFVLFFBQVEsSUFDeEYsT0FBTyxXQUFXLGNBQWMsT0FBTyxNQUFNLE9BQU8sT0FBTyxJQUMzRCxPQUFPLFNBQVMsUUFBUTtBQUFBLElBQzVCLEdBQUUsU0FBTyxXQUFZO0FBQUU7QUFFbkIsVUFBSTtBQUVKLGVBQVMsUUFBUTtBQUNiLGVBQU8sYUFBYSxNQUFNLE1BQU0sU0FBUztBQUFBLE1BQzdDO0FBSUEsZUFBUyxnQkFBZ0IsVUFBVTtBQUMvQix1QkFBZTtBQUFBLE1BQ25CO0FBRUEsZUFBUyxRQUFRLE9BQU87QUFDcEIsZUFDSSxpQkFBaUIsU0FDakIsT0FBTyxVQUFVLFNBQVMsS0FBSyxLQUFLLE1BQU07QUFBQSxNQUVsRDtBQUVBLGVBQVMsU0FBUyxPQUFPO0FBR3JCLGVBQ0ksU0FBUyxRQUNULE9BQU8sVUFBVSxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQUEsTUFFbEQ7QUFFQSxlQUFTLFdBQVcsR0FBRyxHQUFHO0FBQ3RCLGVBQU8sT0FBTyxVQUFVLGVBQWUsS0FBSyxHQUFHLENBQUM7QUFBQSxNQUNwRDtBQUVBLGVBQVMsY0FBYyxLQUFLO0FBQ3hCLFlBQUksT0FBTyxxQkFBcUI7QUFDNUIsaUJBQU8sT0FBTyxvQkFBb0IsR0FBRyxFQUFFLFdBQVc7QUFBQSxRQUN0RCxPQUFPO0FBQ0gsY0FBSTtBQUNKLGVBQUssS0FBSyxLQUFLO0FBQ1gsZ0JBQUksV0FBVyxLQUFLLENBQUMsR0FBRztBQUNwQixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKO0FBQ0EsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUVBLGVBQVMsWUFBWSxPQUFPO0FBQ3hCLGVBQU8sVUFBVTtBQUFBLE1BQ3JCO0FBRUEsZUFBUyxTQUFTLE9BQU87QUFDckIsZUFDSSxPQUFPLFVBQVUsWUFDakIsT0FBTyxVQUFVLFNBQVMsS0FBSyxLQUFLLE1BQU07QUFBQSxNQUVsRDtBQUVBLGVBQVMsT0FBTyxPQUFPO0FBQ25CLGVBQ0ksaUJBQWlCLFFBQ2pCLE9BQU8sVUFBVSxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQUEsTUFFbEQ7QUFFQSxlQUFTLElBQUksS0FBSyxJQUFJO0FBQ2xCLFlBQUksTUFBTSxDQUFDLEdBQ1AsR0FDQSxTQUFTLElBQUk7QUFDakIsYUFBSyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsR0FBRztBQUN6QixjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFBQSxRQUMxQjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxPQUFPLEdBQUcsR0FBRztBQUNsQixpQkFBUyxLQUFLLEdBQUc7QUFDYixjQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUc7QUFDbEIsY0FBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQUEsVUFDZDtBQUFBLFFBQ0o7QUFFQSxZQUFJLFdBQVcsR0FBRyxVQUFVLEdBQUc7QUFDM0IsWUFBRSxXQUFXLEVBQUU7QUFBQSxRQUNuQjtBQUVBLFlBQUksV0FBVyxHQUFHLFNBQVMsR0FBRztBQUMxQixZQUFFLFVBQVUsRUFBRTtBQUFBLFFBQ2xCO0FBRUEsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLFVBQVUsT0FBT0MsU0FBUUMsU0FBUSxRQUFRO0FBQzlDLGVBQU8saUJBQWlCLE9BQU9ELFNBQVFDLFNBQVEsUUFBUSxJQUFJLEVBQUUsSUFBSTtBQUFBLE1BQ3JFO0FBRUEsZUFBUyxzQkFBc0I7QUFFM0IsZUFBTztBQUFBLFVBQ0gsT0FBTztBQUFBLFVBQ1AsY0FBYyxDQUFDO0FBQUEsVUFDZixhQUFhLENBQUM7QUFBQSxVQUNkLFVBQVU7QUFBQSxVQUNWLGVBQWU7QUFBQSxVQUNmLFdBQVc7QUFBQSxVQUNYLFlBQVk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxVQUNmLGlCQUFpQjtBQUFBLFVBQ2pCLEtBQUs7QUFBQSxVQUNMLGlCQUFpQixDQUFDO0FBQUEsVUFDbEIsS0FBSztBQUFBLFVBQ0wsVUFBVTtBQUFBLFVBQ1YsU0FBUztBQUFBLFVBQ1QsaUJBQWlCO0FBQUEsUUFDckI7QUFBQSxNQUNKO0FBRUEsZUFBUyxnQkFBZ0IsR0FBRztBQUN4QixZQUFJLEVBQUUsT0FBTyxNQUFNO0FBQ2YsWUFBRSxNQUFNLG9CQUFvQjtBQUFBLFFBQ2hDO0FBQ0EsZUFBTyxFQUFFO0FBQUEsTUFDYjtBQUVBLFVBQUk7QUFDSixVQUFJLE1BQU0sVUFBVSxNQUFNO0FBQ3RCLGVBQU8sTUFBTSxVQUFVO0FBQUEsTUFDM0IsT0FBTztBQUNILGVBQU8sU0FBVSxLQUFLO0FBQ2xCLGNBQUksSUFBSSxPQUFPLElBQUksR0FDZixNQUFNLEVBQUUsV0FBVyxHQUNuQjtBQUVKLGVBQUssSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQ3RCLGdCQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRztBQUN0QyxxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKO0FBRUEsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUVBLGVBQVMsUUFBUSxHQUFHO0FBQ2hCLFlBQUksUUFBUSxNQUNSLGNBQWMsT0FDZCxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUM5QyxZQUFJLFlBQVk7QUFDWixrQkFBUSxnQkFBZ0IsQ0FBQztBQUN6Qix3QkFBYyxLQUFLLEtBQUssTUFBTSxpQkFBaUIsU0FBVSxHQUFHO0FBQ3hELG1CQUFPLEtBQUs7QUFBQSxVQUNoQixDQUFDO0FBQ0QsdUJBQ0ksTUFBTSxXQUFXLEtBQ2pCLENBQUMsTUFBTSxTQUNQLENBQUMsTUFBTSxjQUNQLENBQUMsTUFBTSxnQkFDUCxDQUFDLE1BQU0sa0JBQ1AsQ0FBQyxNQUFNLG1CQUNQLENBQUMsTUFBTSxhQUNQLENBQUMsTUFBTSxpQkFDUCxDQUFDLE1BQU0sb0JBQ04sQ0FBQyxNQUFNLFlBQWEsTUFBTSxZQUFZO0FBQzNDLGNBQUksRUFBRSxTQUFTO0FBQ1gseUJBQ0ksY0FDQSxNQUFNLGtCQUFrQixLQUN4QixNQUFNLGFBQWEsV0FBVyxLQUM5QixNQUFNLFlBQVk7QUFBQSxVQUMxQjtBQUFBLFFBQ0o7QUFDQSxZQUFJLE9BQU8sWUFBWSxRQUFRLENBQUMsT0FBTyxTQUFTLENBQUMsR0FBRztBQUNoRCxZQUFFLFdBQVc7QUFBQSxRQUNqQixPQUFPO0FBQ0gsaUJBQU87QUFBQSxRQUNYO0FBQ0EsZUFBTyxFQUFFO0FBQUEsTUFDYjtBQUVBLGVBQVMsY0FBYyxPQUFPO0FBQzFCLFlBQUksSUFBSSxVQUFVLEdBQUc7QUFDckIsWUFBSSxTQUFTLE1BQU07QUFDZixpQkFBTyxnQkFBZ0IsQ0FBQyxHQUFHLEtBQUs7QUFBQSxRQUNwQyxPQUFPO0FBQ0gsMEJBQWdCLENBQUMsRUFBRSxrQkFBa0I7QUFBQSxRQUN6QztBQUVBLGVBQU87QUFBQSxNQUNYO0FBSUEsVUFBSSxtQkFBb0IsTUFBTSxtQkFBbUIsQ0FBQyxHQUM5QyxtQkFBbUI7QUFFdkIsZUFBUyxXQUFXQyxLQUFJQyxPQUFNO0FBQzFCLFlBQUksR0FDQSxNQUNBLEtBQ0Esc0JBQXNCLGlCQUFpQjtBQUUzQyxZQUFJLENBQUMsWUFBWUEsTUFBSyxnQkFBZ0IsR0FBRztBQUNyQyxVQUFBRCxJQUFHLG1CQUFtQkMsTUFBSztBQUFBLFFBQy9CO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssRUFBRSxHQUFHO0FBQ3ZCLFVBQUFELElBQUcsS0FBS0MsTUFBSztBQUFBLFFBQ2pCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssRUFBRSxHQUFHO0FBQ3ZCLFVBQUFELElBQUcsS0FBS0MsTUFBSztBQUFBLFFBQ2pCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssRUFBRSxHQUFHO0FBQ3ZCLFVBQUFELElBQUcsS0FBS0MsTUFBSztBQUFBLFFBQ2pCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssT0FBTyxHQUFHO0FBQzVCLFVBQUFELElBQUcsVUFBVUMsTUFBSztBQUFBLFFBQ3RCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssSUFBSSxHQUFHO0FBQ3pCLFVBQUFELElBQUcsT0FBT0MsTUFBSztBQUFBLFFBQ25CO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssTUFBTSxHQUFHO0FBQzNCLFVBQUFELElBQUcsU0FBU0MsTUFBSztBQUFBLFFBQ3JCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssT0FBTyxHQUFHO0FBQzVCLFVBQUFELElBQUcsVUFBVUMsTUFBSztBQUFBLFFBQ3RCO0FBQ0EsWUFBSSxDQUFDLFlBQVlBLE1BQUssR0FBRyxHQUFHO0FBQ3hCLFVBQUFELElBQUcsTUFBTSxnQkFBZ0JDLEtBQUk7QUFBQSxRQUNqQztBQUNBLFlBQUksQ0FBQyxZQUFZQSxNQUFLLE9BQU8sR0FBRztBQUM1QixVQUFBRCxJQUFHLFVBQVVDLE1BQUs7QUFBQSxRQUN0QjtBQUVBLFlBQUksc0JBQXNCLEdBQUc7QUFDekIsZUFBSyxJQUFJLEdBQUcsSUFBSSxxQkFBcUIsS0FBSztBQUN0QyxtQkFBTyxpQkFBaUIsQ0FBQztBQUN6QixrQkFBTUEsTUFBSyxJQUFJO0FBQ2YsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRztBQUNuQixjQUFBRCxJQUFHLElBQUksSUFBSTtBQUFBLFlBQ2Y7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUVBLGVBQU9BO0FBQUEsTUFDWDtBQUdBLGVBQVMsT0FBTyxRQUFRO0FBQ3BCLG1CQUFXLE1BQU0sTUFBTTtBQUN2QixhQUFLLEtBQUssSUFBSSxLQUFLLE9BQU8sTUFBTSxPQUFPLE9BQU8sR0FBRyxRQUFRLElBQUksR0FBRztBQUNoRSxZQUFJLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDakIsZUFBSyxLQUFLLG9CQUFJLEtBQUssR0FBRztBQUFBLFFBQzFCO0FBR0EsWUFBSSxxQkFBcUIsT0FBTztBQUM1Qiw2QkFBbUI7QUFDbkIsZ0JBQU0sYUFBYSxJQUFJO0FBQ3ZCLDZCQUFtQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDSjtBQUVBLGVBQVMsU0FBUyxLQUFLO0FBQ25CLGVBQ0ksZUFBZSxVQUFXLE9BQU8sUUFBUSxJQUFJLG9CQUFvQjtBQUFBLE1BRXpFO0FBRUEsZUFBUyxLQUFLLEtBQUs7QUFDZixZQUNJLE1BQU0sZ0NBQWdDLFNBQ3RDLE9BQU8sWUFBWSxlQUNuQixRQUFRLE1BQ1Y7QUFDRSxrQkFBUSxLQUFLLDBCQUEwQixHQUFHO0FBQUEsUUFDOUM7QUFBQSxNQUNKO0FBRUEsZUFBUyxVQUFVLEtBQUssSUFBSTtBQUN4QixZQUFJLFlBQVk7QUFFaEIsZUFBTyxPQUFPLFdBQVk7QUFDdEIsY0FBSSxNQUFNLHNCQUFzQixNQUFNO0FBQ2xDLGtCQUFNLG1CQUFtQixNQUFNLEdBQUc7QUFBQSxVQUN0QztBQUNBLGNBQUksV0FBVztBQUNYLGdCQUFJLE9BQU8sQ0FBQyxHQUNSLEtBQ0EsR0FDQSxLQUNBLFNBQVMsVUFBVTtBQUN2QixpQkFBSyxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUs7QUFDekIsb0JBQU07QUFDTixrQkFBSSxPQUFPLFVBQVUsQ0FBQyxNQUFNLFVBQVU7QUFDbEMsdUJBQU8sUUFBUSxJQUFJO0FBQ25CLHFCQUFLLE9BQU8sVUFBVSxDQUFDLEdBQUc7QUFDdEIsc0JBQUksV0FBVyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDL0IsMkJBQU8sTUFBTSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSTtBQUFBLGtCQUM1QztBQUFBLGdCQUNKO0FBQ0Esc0JBQU0sSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUFBLGNBQ3pCLE9BQU87QUFDSCxzQkFBTSxVQUFVLENBQUM7QUFBQSxjQUNyQjtBQUNBLG1CQUFLLEtBQUssR0FBRztBQUFBLFlBQ2pCO0FBQ0E7QUFBQSxjQUNJLE1BQ0ksa0JBQ0EsTUFBTSxVQUFVLE1BQU0sS0FBSyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQ3hDLE9BQ0EsSUFBSSxNQUFNLEVBQUU7QUFBQSxZQUNwQjtBQUNBLHdCQUFZO0FBQUEsVUFDaEI7QUFDQSxpQkFBTyxHQUFHLE1BQU0sTUFBTSxTQUFTO0FBQUEsUUFDbkMsR0FBRyxFQUFFO0FBQUEsTUFDVDtBQUVBLFVBQUksZUFBZSxDQUFDO0FBRXBCLGVBQVMsZ0JBQWdCLE1BQU0sS0FBSztBQUNoQyxZQUFJLE1BQU0sc0JBQXNCLE1BQU07QUFDbEMsZ0JBQU0sbUJBQW1CLE1BQU0sR0FBRztBQUFBLFFBQ3RDO0FBQ0EsWUFBSSxDQUFDLGFBQWEsSUFBSSxHQUFHO0FBQ3JCLGVBQUssR0FBRztBQUNSLHVCQUFhLElBQUksSUFBSTtBQUFBLFFBQ3pCO0FBQUEsTUFDSjtBQUVBLFlBQU0sOEJBQThCO0FBQ3BDLFlBQU0scUJBQXFCO0FBRTNCLGVBQVMsV0FBVyxPQUFPO0FBQ3ZCLGVBQ0ssT0FBTyxhQUFhLGVBQWUsaUJBQWlCLFlBQ3JELE9BQU8sVUFBVSxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQUEsTUFFbEQ7QUFFQSxlQUFTLElBQUksUUFBUTtBQUNqQixZQUFJLE1BQU07QUFDVixhQUFLLEtBQUssUUFBUTtBQUNkLGNBQUksV0FBVyxRQUFRLENBQUMsR0FBRztBQUN2QixtQkFBTyxPQUFPLENBQUM7QUFDZixnQkFBSSxXQUFXLElBQUksR0FBRztBQUNsQixtQkFBSyxDQUFDLElBQUk7QUFBQSxZQUNkLE9BQU87QUFDSCxtQkFBSyxNQUFNLENBQUMsSUFBSTtBQUFBLFlBQ3BCO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFDQSxhQUFLLFVBQVU7QUFJZixhQUFLLGlDQUFpQyxJQUFJO0FBQUEsV0FDckMsS0FBSyx3QkFBd0IsVUFBVSxLQUFLLGNBQWMsVUFDdkQsTUFDQSxVQUFVO0FBQUEsUUFDbEI7QUFBQSxNQUNKO0FBRUEsZUFBUyxhQUFhLGNBQWMsYUFBYTtBQUM3QyxZQUFJLE1BQU0sT0FBTyxDQUFDLEdBQUcsWUFBWSxHQUM3QjtBQUNKLGFBQUssUUFBUSxhQUFhO0FBQ3RCLGNBQUksV0FBVyxhQUFhLElBQUksR0FBRztBQUMvQixnQkFBSSxTQUFTLGFBQWEsSUFBSSxDQUFDLEtBQUssU0FBUyxZQUFZLElBQUksQ0FBQyxHQUFHO0FBQzdELGtCQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IscUJBQU8sSUFBSSxJQUFJLEdBQUcsYUFBYSxJQUFJLENBQUM7QUFDcEMscUJBQU8sSUFBSSxJQUFJLEdBQUcsWUFBWSxJQUFJLENBQUM7QUFBQSxZQUN2QyxXQUFXLFlBQVksSUFBSSxLQUFLLE1BQU07QUFDbEMsa0JBQUksSUFBSSxJQUFJLFlBQVksSUFBSTtBQUFBLFlBQ2hDLE9BQU87QUFDSCxxQkFBTyxJQUFJLElBQUk7QUFBQSxZQUNuQjtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQ0EsYUFBSyxRQUFRLGNBQWM7QUFDdkIsY0FDSSxXQUFXLGNBQWMsSUFBSSxLQUM3QixDQUFDLFdBQVcsYUFBYSxJQUFJLEtBQzdCLFNBQVMsYUFBYSxJQUFJLENBQUMsR0FDN0I7QUFFRSxnQkFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7QUFBQSxVQUNwQztBQUFBLFFBQ0o7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsT0FBTyxRQUFRO0FBQ3BCLFlBQUksVUFBVSxNQUFNO0FBQ2hCLGVBQUssSUFBSSxNQUFNO0FBQUEsUUFDbkI7QUFBQSxNQUNKO0FBRUEsVUFBSTtBQUVKLFVBQUksT0FBTyxNQUFNO0FBQ2IsZUFBTyxPQUFPO0FBQUEsTUFDbEIsT0FBTztBQUNILGVBQU8sU0FBVSxLQUFLO0FBQ2xCLGNBQUksR0FDQSxNQUFNLENBQUM7QUFDWCxlQUFLLEtBQUssS0FBSztBQUNYLGdCQUFJLFdBQVcsS0FBSyxDQUFDLEdBQUc7QUFDcEIsa0JBQUksS0FBSyxDQUFDO0FBQUEsWUFDZDtBQUFBLFVBQ0o7QUFDQSxpQkFBTztBQUFBLFFBQ1g7QUFBQSxNQUNKO0FBRUEsVUFBSSxrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsTUFDZDtBQUVBLGVBQVMsU0FBUyxLQUFLLEtBQUtFLE1BQUs7QUFDN0IsWUFBSSxTQUFTLEtBQUssVUFBVSxHQUFHLEtBQUssS0FBSyxVQUFVLFVBQVU7QUFDN0QsZUFBTyxXQUFXLE1BQU0sSUFBSSxPQUFPLEtBQUssS0FBS0EsSUFBRyxJQUFJO0FBQUEsTUFDeEQ7QUFFQSxlQUFTLFNBQVMsUUFBUSxjQUFjLFdBQVc7QUFDL0MsWUFBSSxZQUFZLEtBQUssS0FBSyxJQUFJLE1BQU0sR0FDaEMsY0FBYyxlQUFlLFVBQVUsUUFDdkNDLFFBQU8sVUFBVTtBQUNyQixnQkFDS0EsUUFBUSxZQUFZLE1BQU0sS0FBTSxPQUNqQyxLQUFLLElBQUksSUFBSSxLQUFLLElBQUksR0FBRyxXQUFXLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQzFEO0FBQUEsTUFFUjtBQUVBLFVBQUksbUJBQ0ksME1BQ0osd0JBQXdCLDhDQUN4QixrQkFBa0IsQ0FBQyxHQUNuQix1QkFBdUIsQ0FBQztBQU01QixlQUFTLGVBQWVDLFFBQU8sUUFBUUMsVUFBUyxVQUFVO0FBQ3RELFlBQUksT0FBTztBQUNYLFlBQUksT0FBTyxhQUFhLFVBQVU7QUFDOUIsaUJBQU8sV0FBWTtBQUNmLG1CQUFPLEtBQUssUUFBUSxFQUFFO0FBQUEsVUFDMUI7QUFBQSxRQUNKO0FBQ0EsWUFBSUQsUUFBTztBQUNQLCtCQUFxQkEsTUFBSyxJQUFJO0FBQUEsUUFDbEM7QUFDQSxZQUFJLFFBQVE7QUFDUiwrQkFBcUIsT0FBTyxDQUFDLENBQUMsSUFBSSxXQUFZO0FBQzFDLG1CQUFPLFNBQVMsS0FBSyxNQUFNLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQUEsVUFDckU7QUFBQSxRQUNKO0FBQ0EsWUFBSUMsVUFBUztBQUNULCtCQUFxQkEsUUFBTyxJQUFJLFdBQVk7QUFDeEMsbUJBQU8sS0FBSyxXQUFXLEVBQUU7QUFBQSxjQUNyQixLQUFLLE1BQU0sTUFBTSxTQUFTO0FBQUEsY0FDMUJEO0FBQUEsWUFDSjtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUVBLGVBQVMsdUJBQXVCLE9BQU87QUFDbkMsWUFBSSxNQUFNLE1BQU0sVUFBVSxHQUFHO0FBQ3pCLGlCQUFPLE1BQU0sUUFBUSxZQUFZLEVBQUU7QUFBQSxRQUN2QztBQUNBLGVBQU8sTUFBTSxRQUFRLE9BQU8sRUFBRTtBQUFBLE1BQ2xDO0FBRUEsZUFBUyxtQkFBbUJOLFNBQVE7QUFDaEMsWUFBSSxRQUFRQSxRQUFPLE1BQU0sZ0JBQWdCLEdBQ3JDLEdBQ0E7QUFFSixhQUFLLElBQUksR0FBRyxTQUFTLE1BQU0sUUFBUSxJQUFJLFFBQVEsS0FBSztBQUNoRCxjQUFJLHFCQUFxQixNQUFNLENBQUMsQ0FBQyxHQUFHO0FBQ2hDLGtCQUFNLENBQUMsSUFBSSxxQkFBcUIsTUFBTSxDQUFDLENBQUM7QUFBQSxVQUM1QyxPQUFPO0FBQ0gsa0JBQU0sQ0FBQyxJQUFJLHVCQUF1QixNQUFNLENBQUMsQ0FBQztBQUFBLFVBQzlDO0FBQUEsUUFDSjtBQUVBLGVBQU8sU0FBVSxLQUFLO0FBQ2xCLGNBQUksU0FBUyxJQUNUUTtBQUNKLGVBQUtBLEtBQUksR0FBR0EsS0FBSSxRQUFRQSxNQUFLO0FBQ3pCLHNCQUFVLFdBQVcsTUFBTUEsRUFBQyxDQUFDLElBQ3ZCLE1BQU1BLEVBQUMsRUFBRSxLQUFLLEtBQUtSLE9BQU0sSUFDekIsTUFBTVEsRUFBQztBQUFBLFVBQ2pCO0FBQ0EsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUdBLGVBQVMsYUFBYSxHQUFHUixTQUFRO0FBQzdCLFlBQUksQ0FBQyxFQUFFLFFBQVEsR0FBRztBQUNkLGlCQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVk7QUFBQSxRQUN0QztBQUVBLFFBQUFBLFVBQVMsYUFBYUEsU0FBUSxFQUFFLFdBQVcsQ0FBQztBQUM1Qyx3QkFBZ0JBLE9BQU0sSUFDbEIsZ0JBQWdCQSxPQUFNLEtBQUssbUJBQW1CQSxPQUFNO0FBRXhELGVBQU8sZ0JBQWdCQSxPQUFNLEVBQUUsQ0FBQztBQUFBLE1BQ3BDO0FBRUEsZUFBUyxhQUFhQSxTQUFRQyxTQUFRO0FBQ2xDLFlBQUksSUFBSTtBQUVSLGlCQUFTLDRCQUE0QixPQUFPO0FBQ3hDLGlCQUFPQSxRQUFPLGVBQWUsS0FBSyxLQUFLO0FBQUEsUUFDM0M7QUFFQSw4QkFBc0IsWUFBWTtBQUNsQyxlQUFPLEtBQUssS0FBSyxzQkFBc0IsS0FBS0QsT0FBTSxHQUFHO0FBQ2pELFVBQUFBLFVBQVNBLFFBQU87QUFBQSxZQUNaO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFDQSxnQ0FBc0IsWUFBWTtBQUNsQyxlQUFLO0FBQUEsUUFDVDtBQUVBLGVBQU9BO0FBQUEsTUFDWDtBQUVBLFVBQUksd0JBQXdCO0FBQUEsUUFDeEIsS0FBSztBQUFBLFFBQ0wsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLE1BQ1Y7QUFFQSxlQUFTLGVBQWUsS0FBSztBQUN6QixZQUFJQSxVQUFTLEtBQUssZ0JBQWdCLEdBQUcsR0FDakMsY0FBYyxLQUFLLGdCQUFnQixJQUFJLFlBQVksQ0FBQztBQUV4RCxZQUFJQSxXQUFVLENBQUMsYUFBYTtBQUN4QixpQkFBT0E7QUFBQSxRQUNYO0FBRUEsYUFBSyxnQkFBZ0IsR0FBRyxJQUFJLFlBQ3ZCLE1BQU0sZ0JBQWdCLEVBQ3RCLElBQUksU0FBVSxLQUFLO0FBQ2hCLGNBQ0ksUUFBUSxVQUNSLFFBQVEsUUFDUixRQUFRLFFBQ1IsUUFBUSxRQUNWO0FBQ0UsbUJBQU8sSUFBSSxNQUFNLENBQUM7QUFBQSxVQUN0QjtBQUNBLGlCQUFPO0FBQUEsUUFDWCxDQUFDLEVBQ0EsS0FBSyxFQUFFO0FBRVosZUFBTyxLQUFLLGdCQUFnQixHQUFHO0FBQUEsTUFDbkM7QUFFQSxVQUFJLHFCQUFxQjtBQUV6QixlQUFTLGNBQWM7QUFDbkIsZUFBTyxLQUFLO0FBQUEsTUFDaEI7QUFFQSxVQUFJLGlCQUFpQixNQUNqQixnQ0FBZ0M7QUFFcEMsZUFBUyxRQUFRLFFBQVE7QUFDckIsZUFBTyxLQUFLLFNBQVMsUUFBUSxNQUFNLE1BQU07QUFBQSxNQUM3QztBQUVBLFVBQUksc0JBQXNCO0FBQUEsUUFDdEIsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLFFBQ0osR0FBRztBQUFBLFFBQ0gsSUFBSTtBQUFBLE1BQ1I7QUFFQSxlQUFTLGFBQWEsUUFBUSxlQUFlLFFBQVEsVUFBVTtBQUMzRCxZQUFJLFNBQVMsS0FBSyxjQUFjLE1BQU07QUFDdEMsZUFBTyxXQUFXLE1BQU0sSUFDbEIsT0FBTyxRQUFRLGVBQWUsUUFBUSxRQUFRLElBQzlDLE9BQU8sUUFBUSxPQUFPLE1BQU07QUFBQSxNQUN0QztBQUVBLGVBQVMsV0FBV1MsT0FBTSxRQUFRO0FBQzlCLFlBQUlULFVBQVMsS0FBSyxjQUFjUyxRQUFPLElBQUksV0FBVyxNQUFNO0FBQzVELGVBQU8sV0FBV1QsT0FBTSxJQUFJQSxRQUFPLE1BQU0sSUFBSUEsUUFBTyxRQUFRLE9BQU8sTUFBTTtBQUFBLE1BQzdFO0FBRUEsVUFBSSxVQUFVO0FBQUEsUUFDVixHQUFHO0FBQUEsUUFDSCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsUUFDSCxNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFDSCxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxHQUFHO0FBQUEsUUFDSCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixLQUFLO0FBQUEsUUFDTCxZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxHQUFHO0FBQUEsUUFDSCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsUUFDYixHQUFHO0FBQUEsUUFDSCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixHQUFHO0FBQUEsUUFDSCxRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxHQUFHO0FBQUEsUUFDSCxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxHQUFHO0FBQUEsUUFDSCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsUUFDSixXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsUUFDVixJQUFJO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsUUFDYixHQUFHO0FBQUEsUUFDSCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsUUFDSCxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxHQUFHO0FBQUEsUUFDSCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUVBLGVBQVMsZUFBZSxPQUFPO0FBQzNCLGVBQU8sT0FBTyxVQUFVLFdBQ2xCLFFBQVEsS0FBSyxLQUFLLFFBQVEsTUFBTSxZQUFZLENBQUMsSUFDN0M7QUFBQSxNQUNWO0FBRUEsZUFBUyxxQkFBcUIsYUFBYTtBQUN2QyxZQUFJLGtCQUFrQixDQUFDLEdBQ25CLGdCQUNBO0FBRUosYUFBSyxRQUFRLGFBQWE7QUFDdEIsY0FBSSxXQUFXLGFBQWEsSUFBSSxHQUFHO0FBQy9CLDZCQUFpQixlQUFlLElBQUk7QUFDcEMsZ0JBQUksZ0JBQWdCO0FBQ2hCLDhCQUFnQixjQUFjLElBQUksWUFBWSxJQUFJO0FBQUEsWUFDdEQ7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsVUFBSSxhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDVjtBQUVBLGVBQVMsb0JBQW9CLFVBQVU7QUFDbkMsWUFBSSxRQUFRLENBQUMsR0FDVDtBQUNKLGFBQUssS0FBSyxVQUFVO0FBQ2hCLGNBQUksV0FBVyxVQUFVLENBQUMsR0FBRztBQUN6QixrQkFBTSxLQUFLLEVBQUUsTUFBTSxHQUFHLFVBQVUsV0FBVyxDQUFDLEVBQUUsQ0FBQztBQUFBLFVBQ25EO0FBQUEsUUFDSjtBQUNBLGNBQU0sS0FBSyxTQUFVLEdBQUcsR0FBRztBQUN2QixpQkFBTyxFQUFFLFdBQVcsRUFBRTtBQUFBLFFBQzFCLENBQUM7QUFDRCxlQUFPO0FBQUEsTUFDWDtBQUVBLFVBQUksU0FBUyxNQUNULFNBQVMsUUFDVCxTQUFTLFNBQ1QsU0FBUyxTQUNULFNBQVMsY0FDVCxZQUFZLFNBQ1osWUFBWSxhQUNaLFlBQVksaUJBQ1osWUFBWSxXQUNaLFlBQVksV0FDWixZQUFZLGdCQUNaLGdCQUFnQixPQUNoQixjQUFjLFlBQ2QsY0FBYyxzQkFDZCxtQkFBbUIsMkJBQ25CLGlCQUFpQix3QkFHakIsWUFDSSx5SkFDSix5QkFBeUIsYUFDekIsbUJBQW1CLGlCQUNuQjtBQUVKLGdCQUFVLENBQUM7QUFFWCxlQUFTLGNBQWNNLFFBQU8sT0FBTyxhQUFhO0FBQzlDLGdCQUFRQSxNQUFLLElBQUksV0FBVyxLQUFLLElBQzNCLFFBQ0EsU0FBVSxVQUFVSSxhQUFZO0FBQzVCLGlCQUFPLFlBQVksY0FBYyxjQUFjO0FBQUEsUUFDbkQ7QUFBQSxNQUNWO0FBRUEsZUFBUyxzQkFBc0JKLFFBQU8sUUFBUTtBQUMxQyxZQUFJLENBQUMsV0FBVyxTQUFTQSxNQUFLLEdBQUc7QUFDN0IsaUJBQU8sSUFBSSxPQUFPLGVBQWVBLE1BQUssQ0FBQztBQUFBLFFBQzNDO0FBRUEsZUFBTyxRQUFRQSxNQUFLLEVBQUUsT0FBTyxTQUFTLE9BQU8sT0FBTztBQUFBLE1BQ3hEO0FBR0EsZUFBUyxlQUFlLEdBQUc7QUFDdkIsZUFBTztBQUFBLFVBQ0gsRUFDSyxRQUFRLE1BQU0sRUFBRSxFQUNoQjtBQUFBLFlBQ0c7QUFBQSxZQUNBLFNBQVUsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJO0FBQy9CLHFCQUFPLE1BQU0sTUFBTSxNQUFNO0FBQUEsWUFDN0I7QUFBQSxVQUNKO0FBQUEsUUFDUjtBQUFBLE1BQ0o7QUFFQSxlQUFTLFlBQVksR0FBRztBQUNwQixlQUFPLEVBQUUsUUFBUSwwQkFBMEIsTUFBTTtBQUFBLE1BQ3JEO0FBRUEsZUFBUyxTQUFTLFFBQVE7QUFDdEIsWUFBSSxTQUFTLEdBQUc7QUFFWixpQkFBTyxLQUFLLEtBQUssTUFBTSxLQUFLO0FBQUEsUUFDaEMsT0FBTztBQUNILGlCQUFPLEtBQUssTUFBTSxNQUFNO0FBQUEsUUFDNUI7QUFBQSxNQUNKO0FBRUEsZUFBUyxNQUFNLHFCQUFxQjtBQUNoQyxZQUFJLGdCQUFnQixDQUFDLHFCQUNqQixRQUFRO0FBRVosWUFBSSxrQkFBa0IsS0FBSyxTQUFTLGFBQWEsR0FBRztBQUNoRCxrQkFBUSxTQUFTLGFBQWE7QUFBQSxRQUNsQztBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsVUFBSSxTQUFTLENBQUM7QUFFZCxlQUFTLGNBQWNBLFFBQU8sVUFBVTtBQUNwQyxZQUFJLEdBQ0EsT0FBTyxVQUNQO0FBQ0osWUFBSSxPQUFPQSxXQUFVLFVBQVU7QUFDM0IsVUFBQUEsU0FBUSxDQUFDQSxNQUFLO0FBQUEsUUFDbEI7QUFDQSxZQUFJLFNBQVMsUUFBUSxHQUFHO0FBQ3BCLGlCQUFPLFNBQVUsT0FBTyxPQUFPO0FBQzNCLGtCQUFNLFFBQVEsSUFBSSxNQUFNLEtBQUs7QUFBQSxVQUNqQztBQUFBLFFBQ0o7QUFDQSxtQkFBV0EsT0FBTTtBQUNqQixhQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsS0FBSztBQUMzQixpQkFBT0EsT0FBTSxDQUFDLENBQUMsSUFBSTtBQUFBLFFBQ3ZCO0FBQUEsTUFDSjtBQUVBLGVBQVMsa0JBQWtCQSxRQUFPLFVBQVU7QUFDeEMsc0JBQWNBLFFBQU8sU0FBVSxPQUFPLE9BQU8sUUFBUUEsUUFBTztBQUN4RCxpQkFBTyxLQUFLLE9BQU8sTUFBTSxDQUFDO0FBQzFCLG1CQUFTLE9BQU8sT0FBTyxJQUFJLFFBQVFBLE1BQUs7QUFBQSxRQUM1QyxDQUFDO0FBQUEsTUFDTDtBQUVBLGVBQVMsd0JBQXdCQSxRQUFPLE9BQU8sUUFBUTtBQUNuRCxZQUFJLFNBQVMsUUFBUSxXQUFXLFFBQVFBLE1BQUssR0FBRztBQUM1QyxpQkFBT0EsTUFBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLFFBQVFBLE1BQUs7QUFBQSxRQUNqRDtBQUFBLE1BQ0o7QUFFQSxlQUFTLFdBQVcsTUFBTTtBQUN0QixlQUFRLE9BQU8sTUFBTSxLQUFLLE9BQU8sUUFBUSxLQUFNLE9BQU8sUUFBUTtBQUFBLE1BQ2xFO0FBRUEsVUFBSSxPQUFPLEdBQ1AsUUFBUSxHQUNSLE9BQU8sR0FDUCxPQUFPLEdBQ1AsU0FBUyxHQUNULFNBQVMsR0FDVCxjQUFjLEdBQ2QsT0FBTyxHQUNQLFVBQVU7QUFJZCxxQkFBZSxLQUFLLEdBQUcsR0FBRyxXQUFZO0FBQ2xDLFlBQUksSUFBSSxLQUFLLEtBQUs7QUFDbEIsZUFBTyxLQUFLLE9BQU8sU0FBUyxHQUFHLENBQUMsSUFBSSxNQUFNO0FBQUEsTUFDOUMsQ0FBQztBQUVELHFCQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQVk7QUFDeEMsZUFBTyxLQUFLLEtBQUssSUFBSTtBQUFBLE1BQ3pCLENBQUM7QUFFRCxxQkFBZSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNO0FBQ3hDLHFCQUFlLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLE1BQU07QUFDekMscUJBQWUsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsR0FBRyxNQUFNO0FBSWhELG9CQUFjLEtBQUssV0FBVztBQUM5QixvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUNyQyxvQkFBYyxRQUFRLFdBQVcsTUFBTTtBQUN2QyxvQkFBYyxTQUFTLFdBQVcsTUFBTTtBQUN4QyxvQkFBYyxVQUFVLFdBQVcsTUFBTTtBQUV6QyxvQkFBYyxDQUFDLFNBQVMsUUFBUSxHQUFHLElBQUk7QUFDdkMsb0JBQWMsUUFBUSxTQUFVLE9BQU8sT0FBTztBQUMxQyxjQUFNLElBQUksSUFDTixNQUFNLFdBQVcsSUFBSSxNQUFNLGtCQUFrQixLQUFLLElBQUksTUFBTSxLQUFLO0FBQUEsTUFDekUsQ0FBQztBQUNELG9CQUFjLE1BQU0sU0FBVSxPQUFPLE9BQU87QUFDeEMsY0FBTSxJQUFJLElBQUksTUFBTSxrQkFBa0IsS0FBSztBQUFBLE1BQy9DLENBQUM7QUFDRCxvQkFBYyxLQUFLLFNBQVUsT0FBTyxPQUFPO0FBQ3ZDLGNBQU0sSUFBSSxJQUFJLFNBQVMsT0FBTyxFQUFFO0FBQUEsTUFDcEMsQ0FBQztBQUlELGVBQVMsV0FBVyxNQUFNO0FBQ3RCLGVBQU8sV0FBVyxJQUFJLElBQUksTUFBTTtBQUFBLE1BQ3BDO0FBSUEsWUFBTSxvQkFBb0IsU0FBVSxPQUFPO0FBQ3ZDLGVBQU8sTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxPQUFPO0FBQUEsTUFDdEQ7QUFJQSxVQUFJLGFBQWEsV0FBVyxZQUFZLElBQUk7QUFFNUMsZUFBUyxnQkFBZ0I7QUFDckIsZUFBTyxXQUFXLEtBQUssS0FBSyxDQUFDO0FBQUEsTUFDakM7QUFFQSxlQUFTLFdBQVcsTUFBTSxVQUFVO0FBQ2hDLGVBQU8sU0FBVSxPQUFPO0FBQ3BCLGNBQUksU0FBUyxNQUFNO0FBQ2Ysa0JBQU0sTUFBTSxNQUFNLEtBQUs7QUFDdkIsa0JBQU0sYUFBYSxNQUFNLFFBQVE7QUFDakMsbUJBQU87QUFBQSxVQUNYLE9BQU87QUFDSCxtQkFBTyxJQUFJLE1BQU0sSUFBSTtBQUFBLFVBQ3pCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxlQUFTLElBQUksS0FBSyxNQUFNO0FBQ3BCLFlBQUksQ0FBQyxJQUFJLFFBQVEsR0FBRztBQUNoQixpQkFBTztBQUFBLFFBQ1g7QUFFQSxZQUFJLElBQUksSUFBSSxJQUNSLFFBQVEsSUFBSTtBQUVoQixnQkFBUSxNQUFNO0FBQUEsVUFDVixLQUFLO0FBQ0QsbUJBQU8sUUFBUSxFQUFFLG1CQUFtQixJQUFJLEVBQUUsZ0JBQWdCO0FBQUEsVUFDOUQsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxjQUFjLElBQUksRUFBRSxXQUFXO0FBQUEsVUFDcEQsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxjQUFjLElBQUksRUFBRSxXQUFXO0FBQUEsVUFDcEQsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxZQUFZLElBQUksRUFBRSxTQUFTO0FBQUEsVUFDaEQsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxXQUFXLElBQUksRUFBRSxRQUFRO0FBQUEsVUFDOUMsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxVQUFVLElBQUksRUFBRSxPQUFPO0FBQUEsVUFDNUMsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxZQUFZLElBQUksRUFBRSxTQUFTO0FBQUEsVUFDaEQsS0FBSztBQUNELG1CQUFPLFFBQVEsRUFBRSxlQUFlLElBQUksRUFBRSxZQUFZO0FBQUEsVUFDdEQ7QUFDSSxtQkFBTztBQUFBLFFBQ2Y7QUFBQSxNQUNKO0FBRUEsZUFBUyxNQUFNLEtBQUssTUFBTSxPQUFPO0FBQzdCLFlBQUksR0FBRyxPQUFPLE1BQU0sT0FBTztBQUUzQixZQUFJLENBQUMsSUFBSSxRQUFRLEtBQUssTUFBTSxLQUFLLEdBQUc7QUFDaEM7QUFBQSxRQUNKO0FBRUEsWUFBSSxJQUFJO0FBQ1IsZ0JBQVEsSUFBSTtBQUVaLGdCQUFRLE1BQU07QUFBQSxVQUNWLEtBQUs7QUFDRCxtQkFBTyxNQUFNLFFBQ1AsRUFBRSxtQkFBbUIsS0FBSyxJQUMxQixFQUFFLGdCQUFnQixLQUFLO0FBQUEsVUFDakMsS0FBSztBQUNELG1CQUFPLE1BQU0sUUFBUSxFQUFFLGNBQWMsS0FBSyxJQUFJLEVBQUUsV0FBVyxLQUFLO0FBQUEsVUFDcEUsS0FBSztBQUNELG1CQUFPLE1BQU0sUUFBUSxFQUFFLGNBQWMsS0FBSyxJQUFJLEVBQUUsV0FBVyxLQUFLO0FBQUEsVUFDcEUsS0FBSztBQUNELG1CQUFPLE1BQU0sUUFBUSxFQUFFLFlBQVksS0FBSyxJQUFJLEVBQUUsU0FBUyxLQUFLO0FBQUEsVUFDaEUsS0FBSztBQUNELG1CQUFPLE1BQU0sUUFBUSxFQUFFLFdBQVcsS0FBSyxJQUFJLEVBQUUsUUFBUSxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUs5RCxLQUFLO0FBQ0Q7QUFBQTtBQUFBLFVBQ0o7QUFDSTtBQUFBLFFBQ1I7QUFFQSxlQUFPO0FBQ1AsZ0JBQVEsSUFBSSxNQUFNO0FBQ2xCLGVBQU8sSUFBSSxLQUFLO0FBQ2hCLGVBQU8sU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUs7QUFDOUQsY0FBTSxRQUNBLEVBQUUsZUFBZSxNQUFNLE9BQU8sSUFBSSxJQUNsQyxFQUFFLFlBQVksTUFBTSxPQUFPLElBQUk7QUFBQSxNQUN6QztBQUlBLGVBQVMsVUFBVSxPQUFPO0FBQ3RCLGdCQUFRLGVBQWUsS0FBSztBQUM1QixZQUFJLFdBQVcsS0FBSyxLQUFLLENBQUMsR0FBRztBQUN6QixpQkFBTyxLQUFLLEtBQUssRUFBRTtBQUFBLFFBQ3ZCO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLFVBQVUsT0FBTyxPQUFPO0FBQzdCLFlBQUksT0FBTyxVQUFVLFVBQVU7QUFDM0Isa0JBQVEscUJBQXFCLEtBQUs7QUFDbEMsY0FBSSxjQUFjLG9CQUFvQixLQUFLLEdBQ3ZDLEdBQ0EsaUJBQWlCLFlBQVk7QUFDakMsZUFBSyxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsS0FBSztBQUNqQyxpQkFBSyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUM7QUFBQSxVQUN4RDtBQUFBLFFBQ0osT0FBTztBQUNILGtCQUFRLGVBQWUsS0FBSztBQUM1QixjQUFJLFdBQVcsS0FBSyxLQUFLLENBQUMsR0FBRztBQUN6QixtQkFBTyxLQUFLLEtBQUssRUFBRSxLQUFLO0FBQUEsVUFDNUI7QUFBQSxRQUNKO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLElBQUksR0FBRyxHQUFHO0FBQ2YsZ0JBQVMsSUFBSSxJQUFLLEtBQUs7QUFBQSxNQUMzQjtBQUVBLFVBQUk7QUFFSixVQUFJLE1BQU0sVUFBVSxTQUFTO0FBQ3pCLGtCQUFVLE1BQU0sVUFBVTtBQUFBLE1BQzlCLE9BQU87QUFDSCxrQkFBVSxTQUFVLEdBQUc7QUFFbkIsY0FBSTtBQUNKLGVBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEVBQUUsR0FBRztBQUM5QixnQkFBSSxLQUFLLENBQUMsTUFBTSxHQUFHO0FBQ2YscUJBQU87QUFBQSxZQUNYO0FBQUEsVUFDSjtBQUNBLGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFFQSxlQUFTLFlBQVksTUFBTSxPQUFPO0FBQzlCLFlBQUksTUFBTSxJQUFJLEtBQUssTUFBTSxLQUFLLEdBQUc7QUFDN0IsaUJBQU87QUFBQSxRQUNYO0FBQ0EsWUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO0FBQzVCLGlCQUFTLFFBQVEsWUFBWTtBQUM3QixlQUFPLGFBQWEsSUFDZCxXQUFXLElBQUksSUFDWCxLQUNBLEtBQ0osS0FBTyxXQUFXLElBQUs7QUFBQSxNQUNqQztBQUlBLHFCQUFlLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLFdBQVk7QUFDN0MsZUFBTyxLQUFLLE1BQU0sSUFBSTtBQUFBLE1BQzFCLENBQUM7QUFFRCxxQkFBZSxPQUFPLEdBQUcsR0FBRyxTQUFVTixTQUFRO0FBQzFDLGVBQU8sS0FBSyxXQUFXLEVBQUUsWUFBWSxNQUFNQSxPQUFNO0FBQUEsTUFDckQsQ0FBQztBQUVELHFCQUFlLFFBQVEsR0FBRyxHQUFHLFNBQVVBLFNBQVE7QUFDM0MsZUFBTyxLQUFLLFdBQVcsRUFBRSxPQUFPLE1BQU1BLE9BQU07QUFBQSxNQUNoRCxDQUFDO0FBSUQsb0JBQWMsS0FBSyxXQUFXLHNCQUFzQjtBQUNwRCxvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUNyQyxvQkFBYyxPQUFPLFNBQVUsVUFBVUMsU0FBUTtBQUM3QyxlQUFPQSxRQUFPLGlCQUFpQixRQUFRO0FBQUEsTUFDM0MsQ0FBQztBQUNELG9CQUFjLFFBQVEsU0FBVSxVQUFVQSxTQUFRO0FBQzlDLGVBQU9BLFFBQU8sWUFBWSxRQUFRO0FBQUEsTUFDdEMsQ0FBQztBQUVELG9CQUFjLENBQUMsS0FBSyxJQUFJLEdBQUcsU0FBVSxPQUFPLE9BQU87QUFDL0MsY0FBTSxLQUFLLElBQUksTUFBTSxLQUFLLElBQUk7QUFBQSxNQUNsQyxDQUFDO0FBRUQsb0JBQWMsQ0FBQyxPQUFPLE1BQU0sR0FBRyxTQUFVLE9BQU8sT0FBTyxRQUFRSyxRQUFPO0FBQ2xFLFlBQUksUUFBUSxPQUFPLFFBQVEsWUFBWSxPQUFPQSxRQUFPLE9BQU8sT0FBTztBQUVuRSxZQUFJLFNBQVMsTUFBTTtBQUNmLGdCQUFNLEtBQUssSUFBSTtBQUFBLFFBQ25CLE9BQU87QUFDSCwwQkFBZ0IsTUFBTSxFQUFFLGVBQWU7QUFBQSxRQUMzQztBQUFBLE1BQ0osQ0FBQztBQUlELFVBQUksc0JBQ0ksd0ZBQXdGO0FBQUEsUUFDcEY7QUFBQSxNQUNKLEdBQ0osMkJBQ0ksa0RBQWtELE1BQU0sR0FBRyxHQUMvRCxtQkFBbUIsaUNBQ25CLDBCQUEwQixXQUMxQixxQkFBcUI7QUFFekIsZUFBUyxhQUFhLEdBQUdOLFNBQVE7QUFDN0IsWUFBSSxDQUFDLEdBQUc7QUFDSixpQkFBTyxRQUFRLEtBQUssT0FBTyxJQUNyQixLQUFLLFVBQ0wsS0FBSyxRQUFRLFlBQVk7QUFBQSxRQUNuQztBQUNBLGVBQU8sUUFBUSxLQUFLLE9BQU8sSUFDckIsS0FBSyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQ3RCLEtBQUssU0FDQSxLQUFLLFFBQVEsWUFBWSxrQkFBa0IsS0FBS0EsT0FBTSxJQUNqRCxXQUNBLFlBQ1YsRUFBRSxFQUFFLE1BQU0sQ0FBQztBQUFBLE1BQ3JCO0FBRUEsZUFBUyxrQkFBa0IsR0FBR0EsU0FBUTtBQUNsQyxZQUFJLENBQUMsR0FBRztBQUNKLGlCQUFPLFFBQVEsS0FBSyxZQUFZLElBQzFCLEtBQUssZUFDTCxLQUFLLGFBQWEsWUFBWTtBQUFBLFFBQ3hDO0FBQ0EsZUFBTyxRQUFRLEtBQUssWUFBWSxJQUMxQixLQUFLLGFBQWEsRUFBRSxNQUFNLENBQUMsSUFDM0IsS0FBSyxhQUNELGlCQUFpQixLQUFLQSxPQUFNLElBQUksV0FBVyxZQUMvQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0FBQUEsTUFDckI7QUFFQSxlQUFTLGtCQUFrQixXQUFXQSxTQUFRLFFBQVE7QUFDbEQsWUFBSSxHQUNBLElBQ0EsS0FDQSxNQUFNLFVBQVUsa0JBQWtCO0FBQ3RDLFlBQUksQ0FBQyxLQUFLLGNBQWM7QUFFcEIsZUFBSyxlQUFlLENBQUM7QUFDckIsZUFBSyxtQkFBbUIsQ0FBQztBQUN6QixlQUFLLG9CQUFvQixDQUFDO0FBQzFCLGVBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUc7QUFDckIsa0JBQU0sVUFBVSxDQUFDLEtBQU0sQ0FBQyxDQUFDO0FBQ3pCLGlCQUFLLGtCQUFrQixDQUFDLElBQUksS0FBSztBQUFBLGNBQzdCO0FBQUEsY0FDQTtBQUFBLFlBQ0osRUFBRSxrQkFBa0I7QUFDcEIsaUJBQUssaUJBQWlCLENBQUMsSUFBSSxLQUFLLE9BQU8sS0FBSyxFQUFFLEVBQUUsa0JBQWtCO0FBQUEsVUFDdEU7QUFBQSxRQUNKO0FBRUEsWUFBSSxRQUFRO0FBQ1IsY0FBSUEsWUFBVyxPQUFPO0FBQ2xCLGlCQUFLLFFBQVEsS0FBSyxLQUFLLG1CQUFtQixHQUFHO0FBQzdDLG1CQUFPLE9BQU8sS0FBSyxLQUFLO0FBQUEsVUFDNUIsT0FBTztBQUNILGlCQUFLLFFBQVEsS0FBSyxLQUFLLGtCQUFrQixHQUFHO0FBQzVDLG1CQUFPLE9BQU8sS0FBSyxLQUFLO0FBQUEsVUFDNUI7QUFBQSxRQUNKLE9BQU87QUFDSCxjQUFJQSxZQUFXLE9BQU87QUFDbEIsaUJBQUssUUFBUSxLQUFLLEtBQUssbUJBQW1CLEdBQUc7QUFDN0MsZ0JBQUksT0FBTyxJQUFJO0FBQ1gscUJBQU87QUFBQSxZQUNYO0FBQ0EsaUJBQUssUUFBUSxLQUFLLEtBQUssa0JBQWtCLEdBQUc7QUFDNUMsbUJBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUM1QixPQUFPO0FBQ0gsaUJBQUssUUFBUSxLQUFLLEtBQUssa0JBQWtCLEdBQUc7QUFDNUMsZ0JBQUksT0FBTyxJQUFJO0FBQ1gscUJBQU87QUFBQSxZQUNYO0FBQ0EsaUJBQUssUUFBUSxLQUFLLEtBQUssbUJBQW1CLEdBQUc7QUFDN0MsbUJBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUM1QjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsZUFBUyxrQkFBa0IsV0FBV0EsU0FBUSxRQUFRO0FBQ2xELFlBQUksR0FBRyxLQUFLO0FBRVosWUFBSSxLQUFLLG1CQUFtQjtBQUN4QixpQkFBTyxrQkFBa0IsS0FBSyxNQUFNLFdBQVdBLFNBQVEsTUFBTTtBQUFBLFFBQ2pFO0FBRUEsWUFBSSxDQUFDLEtBQUssY0FBYztBQUNwQixlQUFLLGVBQWUsQ0FBQztBQUNyQixlQUFLLG1CQUFtQixDQUFDO0FBQ3pCLGVBQUssb0JBQW9CLENBQUM7QUFBQSxRQUM5QjtBQUtBLGFBQUssSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBRXJCLGdCQUFNLFVBQVUsQ0FBQyxLQUFNLENBQUMsQ0FBQztBQUN6QixjQUFJLFVBQVUsQ0FBQyxLQUFLLGlCQUFpQixDQUFDLEdBQUc7QUFDckMsaUJBQUssaUJBQWlCLENBQUMsSUFBSSxJQUFJO0FBQUEsY0FDM0IsTUFBTSxLQUFLLE9BQU8sS0FBSyxFQUFFLEVBQUUsUUFBUSxLQUFLLEVBQUUsSUFBSTtBQUFBLGNBQzlDO0FBQUEsWUFDSjtBQUNBLGlCQUFLLGtCQUFrQixDQUFDLElBQUksSUFBSTtBQUFBLGNBQzVCLE1BQU0sS0FBSyxZQUFZLEtBQUssRUFBRSxFQUFFLFFBQVEsS0FBSyxFQUFFLElBQUk7QUFBQSxjQUNuRDtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQ0EsY0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxHQUFHO0FBQ2xDLG9CQUNJLE1BQU0sS0FBSyxPQUFPLEtBQUssRUFBRSxJQUFJLE9BQU8sS0FBSyxZQUFZLEtBQUssRUFBRTtBQUNoRSxpQkFBSyxhQUFhLENBQUMsSUFBSSxJQUFJLE9BQU8sTUFBTSxRQUFRLEtBQUssRUFBRSxHQUFHLEdBQUc7QUFBQSxVQUNqRTtBQUVBLGNBQ0ksVUFDQUEsWUFBVyxVQUNYLEtBQUssaUJBQWlCLENBQUMsRUFBRSxLQUFLLFNBQVMsR0FDekM7QUFDRSxtQkFBTztBQUFBLFVBQ1gsV0FDSSxVQUNBQSxZQUFXLFNBQ1gsS0FBSyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssU0FBUyxHQUMxQztBQUNFLG1CQUFPO0FBQUEsVUFDWCxXQUFXLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxHQUFHO0FBQ3hELG1CQUFPO0FBQUEsVUFDWDtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBSUEsZUFBUyxTQUFTLEtBQUssT0FBTztBQUMxQixZQUFJLENBQUMsSUFBSSxRQUFRLEdBQUc7QUFFaEIsaUJBQU87QUFBQSxRQUNYO0FBRUEsWUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixjQUFJLFFBQVEsS0FBSyxLQUFLLEdBQUc7QUFDckIsb0JBQVEsTUFBTSxLQUFLO0FBQUEsVUFDdkIsT0FBTztBQUNILG9CQUFRLElBQUksV0FBVyxFQUFFLFlBQVksS0FBSztBQUUxQyxnQkFBSSxDQUFDLFNBQVMsS0FBSyxHQUFHO0FBQ2xCLHFCQUFPO0FBQUEsWUFDWDtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBRUEsWUFBSSxRQUFRLE9BQ1IsT0FBTyxJQUFJLEtBQUs7QUFFcEIsZUFBTyxPQUFPLEtBQUssT0FBTyxLQUFLLElBQUksTUFBTSxZQUFZLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN2RSxjQUFNLElBQUksU0FDSixJQUFJLEdBQUcsWUFBWSxPQUFPLElBQUksSUFDOUIsSUFBSSxHQUFHLFNBQVMsT0FBTyxJQUFJO0FBQ2pDLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxZQUFZLE9BQU87QUFDeEIsWUFBSSxTQUFTLE1BQU07QUFDZixtQkFBUyxNQUFNLEtBQUs7QUFDcEIsZ0JBQU0sYUFBYSxNQUFNLElBQUk7QUFDN0IsaUJBQU87QUFBQSxRQUNYLE9BQU87QUFDSCxpQkFBTyxJQUFJLE1BQU0sT0FBTztBQUFBLFFBQzVCO0FBQUEsTUFDSjtBQUVBLGVBQVMsaUJBQWlCO0FBQ3RCLGVBQU8sWUFBWSxLQUFLLEtBQUssR0FBRyxLQUFLLE1BQU0sQ0FBQztBQUFBLE1BQ2hEO0FBRUEsZUFBUyxpQkFBaUIsVUFBVTtBQUNoQyxZQUFJLEtBQUssbUJBQW1CO0FBQ3hCLGNBQUksQ0FBQyxXQUFXLE1BQU0sY0FBYyxHQUFHO0FBQ25DLCtCQUFtQixLQUFLLElBQUk7QUFBQSxVQUNoQztBQUNBLGNBQUksVUFBVTtBQUNWLG1CQUFPLEtBQUs7QUFBQSxVQUNoQixPQUFPO0FBQ0gsbUJBQU8sS0FBSztBQUFBLFVBQ2hCO0FBQUEsUUFDSixPQUFPO0FBQ0gsY0FBSSxDQUFDLFdBQVcsTUFBTSxtQkFBbUIsR0FBRztBQUN4QyxpQkFBSyxvQkFBb0I7QUFBQSxVQUM3QjtBQUNBLGlCQUFPLEtBQUssMkJBQTJCLFdBQ2pDLEtBQUssMEJBQ0wsS0FBSztBQUFBLFFBQ2Y7QUFBQSxNQUNKO0FBRUEsZUFBUyxZQUFZLFVBQVU7QUFDM0IsWUFBSSxLQUFLLG1CQUFtQjtBQUN4QixjQUFJLENBQUMsV0FBVyxNQUFNLGNBQWMsR0FBRztBQUNuQywrQkFBbUIsS0FBSyxJQUFJO0FBQUEsVUFDaEM7QUFDQSxjQUFJLFVBQVU7QUFDVixtQkFBTyxLQUFLO0FBQUEsVUFDaEIsT0FBTztBQUNILG1CQUFPLEtBQUs7QUFBQSxVQUNoQjtBQUFBLFFBQ0osT0FBTztBQUNILGNBQUksQ0FBQyxXQUFXLE1BQU0sY0FBYyxHQUFHO0FBQ25DLGlCQUFLLGVBQWU7QUFBQSxVQUN4QjtBQUNBLGlCQUFPLEtBQUssc0JBQXNCLFdBQzVCLEtBQUsscUJBQ0wsS0FBSztBQUFBLFFBQ2Y7QUFBQSxNQUNKO0FBRUEsZUFBUyxxQkFBcUI7QUFDMUIsaUJBQVMsVUFBVSxHQUFHLEdBQUc7QUFDckIsaUJBQU8sRUFBRSxTQUFTLEVBQUU7QUFBQSxRQUN4QjtBQUVBLFlBQUksY0FBYyxDQUFDLEdBQ2YsYUFBYSxDQUFDLEdBQ2QsY0FBYyxDQUFDLEdBQ2YsR0FDQSxLQUNBLFFBQ0E7QUFDSixhQUFLLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUVyQixnQkFBTSxVQUFVLENBQUMsS0FBTSxDQUFDLENBQUM7QUFDekIsbUJBQVMsWUFBWSxLQUFLLFlBQVksS0FBSyxFQUFFLENBQUM7QUFDOUMsa0JBQVEsWUFBWSxLQUFLLE9BQU8sS0FBSyxFQUFFLENBQUM7QUFDeEMsc0JBQVksS0FBSyxNQUFNO0FBQ3ZCLHFCQUFXLEtBQUssS0FBSztBQUNyQixzQkFBWSxLQUFLLEtBQUs7QUFDdEIsc0JBQVksS0FBSyxNQUFNO0FBQUEsUUFDM0I7QUFHQSxvQkFBWSxLQUFLLFNBQVM7QUFDMUIsbUJBQVcsS0FBSyxTQUFTO0FBQ3pCLG9CQUFZLEtBQUssU0FBUztBQUUxQixhQUFLLGVBQWUsSUFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFDdEUsYUFBSyxvQkFBb0IsS0FBSztBQUM5QixhQUFLLHFCQUFxQixJQUFJO0FBQUEsVUFDMUIsT0FBTyxXQUFXLEtBQUssR0FBRyxJQUFJO0FBQUEsVUFDOUI7QUFBQSxRQUNKO0FBQ0EsYUFBSywwQkFBMEIsSUFBSTtBQUFBLFVBQy9CLE9BQU8sWUFBWSxLQUFLLEdBQUcsSUFBSTtBQUFBLFVBQy9CO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxlQUFTLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUd0QyxZQUFJO0FBRUosWUFBSSxJQUFJLE9BQU8sS0FBSyxHQUFHO0FBRW5CLGlCQUFPLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7QUFDMUMsY0FBSSxTQUFTLEtBQUssWUFBWSxDQUFDLEdBQUc7QUFDOUIsaUJBQUssWUFBWSxDQUFDO0FBQUEsVUFDdEI7QUFBQSxRQUNKLE9BQU87QUFDSCxpQkFBTyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTtBQUFBLFFBQ3hDO0FBRUEsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLGNBQWMsR0FBRztBQUN0QixZQUFJLE1BQU07QUFFVixZQUFJLElBQUksT0FBTyxLQUFLLEdBQUc7QUFDbkIsaUJBQU8sTUFBTSxVQUFVLE1BQU0sS0FBSyxTQUFTO0FBRTNDLGVBQUssQ0FBQyxJQUFJLElBQUk7QUFDZCxpQkFBTyxJQUFJLEtBQUssS0FBSyxJQUFJLE1BQU0sTUFBTSxJQUFJLENBQUM7QUFDMUMsY0FBSSxTQUFTLEtBQUssZUFBZSxDQUFDLEdBQUc7QUFDakMsaUJBQUssZUFBZSxDQUFDO0FBQUEsVUFDekI7QUFBQSxRQUNKLE9BQU87QUFDSCxpQkFBTyxJQUFJLEtBQUssS0FBSyxJQUFJLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFBQSxRQUNuRDtBQUVBLGVBQU87QUFBQSxNQUNYO0FBR0EsZUFBUyxnQkFBZ0IsTUFBTSxLQUFLLEtBQUs7QUFDckMsWUFDSSxNQUFNLElBQUksTUFBTSxLQUVoQixTQUFTLElBQUksY0FBYyxNQUFNLEdBQUcsR0FBRyxFQUFFLFVBQVUsSUFBSSxPQUFPO0FBRWxFLGVBQU8sQ0FBQyxRQUFRLE1BQU07QUFBQSxNQUMxQjtBQUdBLGVBQVMsbUJBQW1CLE1BQU0sTUFBTSxTQUFTLEtBQUssS0FBSztBQUN2RCxZQUFJLGdCQUFnQixJQUFJLFVBQVUsT0FBTyxHQUNyQyxhQUFhLGdCQUFnQixNQUFNLEtBQUssR0FBRyxHQUMzQyxZQUFZLElBQUksS0FBSyxPQUFPLEtBQUssZUFBZSxZQUNoRCxTQUNBO0FBRUosWUFBSSxhQUFhLEdBQUc7QUFDaEIsb0JBQVUsT0FBTztBQUNqQix5QkFBZSxXQUFXLE9BQU8sSUFBSTtBQUFBLFFBQ3pDLFdBQVcsWUFBWSxXQUFXLElBQUksR0FBRztBQUNyQyxvQkFBVSxPQUFPO0FBQ2pCLHlCQUFlLFlBQVksV0FBVyxJQUFJO0FBQUEsUUFDOUMsT0FBTztBQUNILG9CQUFVO0FBQ1YseUJBQWU7QUFBQSxRQUNuQjtBQUVBLGVBQU87QUFBQSxVQUNILE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxRQUNmO0FBQUEsTUFDSjtBQUVBLGVBQVMsV0FBVyxLQUFLLEtBQUssS0FBSztBQUMvQixZQUFJLGFBQWEsZ0JBQWdCLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxHQUNqRCxPQUFPLEtBQUssT0FBTyxJQUFJLFVBQVUsSUFBSSxhQUFhLEtBQUssQ0FBQyxJQUFJLEdBQzVELFNBQ0E7QUFFSixZQUFJLE9BQU8sR0FBRztBQUNWLG9CQUFVLElBQUksS0FBSyxJQUFJO0FBQ3ZCLG9CQUFVLE9BQU8sWUFBWSxTQUFTLEtBQUssR0FBRztBQUFBLFFBQ2xELFdBQVcsT0FBTyxZQUFZLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQ2pELG9CQUFVLE9BQU8sWUFBWSxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFDakQsb0JBQVUsSUFBSSxLQUFLLElBQUk7QUFBQSxRQUMzQixPQUFPO0FBQ0gsb0JBQVUsSUFBSSxLQUFLO0FBQ25CLG9CQUFVO0FBQUEsUUFDZDtBQUVBLGVBQU87QUFBQSxVQUNILE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNWO0FBQUEsTUFDSjtBQUVBLGVBQVMsWUFBWSxNQUFNLEtBQUssS0FBSztBQUNqQyxZQUFJLGFBQWEsZ0JBQWdCLE1BQU0sS0FBSyxHQUFHLEdBQzNDLGlCQUFpQixnQkFBZ0IsT0FBTyxHQUFHLEtBQUssR0FBRztBQUN2RCxnQkFBUSxXQUFXLElBQUksSUFBSSxhQUFhLGtCQUFrQjtBQUFBLE1BQzlEO0FBSUEscUJBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sTUFBTTtBQUMzQyxxQkFBZSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxTQUFTO0FBSTlDLG9CQUFjLEtBQUssV0FBVyxzQkFBc0I7QUFDcEQsb0JBQWMsTUFBTSxXQUFXLE1BQU07QUFDckMsb0JBQWMsS0FBSyxXQUFXLHNCQUFzQjtBQUNwRCxvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUVyQztBQUFBLFFBQ0ksQ0FBQyxLQUFLLE1BQU0sS0FBSyxJQUFJO0FBQUEsUUFDckIsU0FBVSxPQUFPLE1BQU0sUUFBUU0sUUFBTztBQUNsQyxlQUFLQSxPQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLEtBQUs7QUFBQSxRQUMxQztBQUFBLE1BQ0o7QUFNQSxlQUFTLFdBQVcsS0FBSztBQUNyQixlQUFPLFdBQVcsS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sR0FBRyxFQUFFO0FBQUEsTUFDM0Q7QUFFQSxVQUFJLG9CQUFvQjtBQUFBLFFBQ3BCLEtBQUs7QUFBQTtBQUFBLFFBQ0wsS0FBSztBQUFBO0FBQUEsTUFDVDtBQUVBLGVBQVMsdUJBQXVCO0FBQzVCLGVBQU8sS0FBSyxNQUFNO0FBQUEsTUFDdEI7QUFFQSxlQUFTLHVCQUF1QjtBQUM1QixlQUFPLEtBQUssTUFBTTtBQUFBLE1BQ3RCO0FBSUEsZUFBUyxXQUFXLE9BQU87QUFDdkIsWUFBSSxPQUFPLEtBQUssV0FBVyxFQUFFLEtBQUssSUFBSTtBQUN0QyxlQUFPLFNBQVMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLFFBQVEsR0FBRyxHQUFHO0FBQUEsTUFDbEU7QUFFQSxlQUFTLGNBQWMsT0FBTztBQUMxQixZQUFJLE9BQU8sV0FBVyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2xDLGVBQU8sU0FBUyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsUUFBUSxHQUFHLEdBQUc7QUFBQSxNQUNsRTtBQUlBLHFCQUFlLEtBQUssR0FBRyxNQUFNLEtBQUs7QUFFbEMscUJBQWUsTUFBTSxHQUFHLEdBQUcsU0FBVU4sU0FBUTtBQUN6QyxlQUFPLEtBQUssV0FBVyxFQUFFLFlBQVksTUFBTUEsT0FBTTtBQUFBLE1BQ3JELENBQUM7QUFFRCxxQkFBZSxPQUFPLEdBQUcsR0FBRyxTQUFVQSxTQUFRO0FBQzFDLGVBQU8sS0FBSyxXQUFXLEVBQUUsY0FBYyxNQUFNQSxPQUFNO0FBQUEsTUFDdkQsQ0FBQztBQUVELHFCQUFlLFFBQVEsR0FBRyxHQUFHLFNBQVVBLFNBQVE7QUFDM0MsZUFBTyxLQUFLLFdBQVcsRUFBRSxTQUFTLE1BQU1BLE9BQU07QUFBQSxNQUNsRCxDQUFDO0FBRUQscUJBQWUsS0FBSyxHQUFHLEdBQUcsU0FBUztBQUNuQyxxQkFBZSxLQUFLLEdBQUcsR0FBRyxZQUFZO0FBSXRDLG9CQUFjLEtBQUssU0FBUztBQUM1QixvQkFBYyxLQUFLLFNBQVM7QUFDNUIsb0JBQWMsS0FBSyxTQUFTO0FBQzVCLG9CQUFjLE1BQU0sU0FBVSxVQUFVQyxTQUFRO0FBQzVDLGVBQU9BLFFBQU8saUJBQWlCLFFBQVE7QUFBQSxNQUMzQyxDQUFDO0FBQ0Qsb0JBQWMsT0FBTyxTQUFVLFVBQVVBLFNBQVE7QUFDN0MsZUFBT0EsUUFBTyxtQkFBbUIsUUFBUTtBQUFBLE1BQzdDLENBQUM7QUFDRCxvQkFBYyxRQUFRLFNBQVUsVUFBVUEsU0FBUTtBQUM5QyxlQUFPQSxRQUFPLGNBQWMsUUFBUTtBQUFBLE1BQ3hDLENBQUM7QUFFRCx3QkFBa0IsQ0FBQyxNQUFNLE9BQU8sTUFBTSxHQUFHLFNBQVUsT0FBTyxNQUFNLFFBQVFLLFFBQU87QUFDM0UsWUFBSSxVQUFVLE9BQU8sUUFBUSxjQUFjLE9BQU9BLFFBQU8sT0FBTyxPQUFPO0FBRXZFLFlBQUksV0FBVyxNQUFNO0FBQ2pCLGVBQUssSUFBSTtBQUFBLFFBQ2IsT0FBTztBQUNILDBCQUFnQixNQUFNLEVBQUUsaUJBQWlCO0FBQUEsUUFDN0M7QUFBQSxNQUNKLENBQUM7QUFFRCx3QkFBa0IsQ0FBQyxLQUFLLEtBQUssR0FBRyxHQUFHLFNBQVUsT0FBTyxNQUFNLFFBQVFBLFFBQU87QUFDckUsYUFBS0EsTUFBSyxJQUFJLE1BQU0sS0FBSztBQUFBLE1BQzdCLENBQUM7QUFJRCxlQUFTLGFBQWEsT0FBT0wsU0FBUTtBQUNqQyxZQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzNCLGlCQUFPO0FBQUEsUUFDWDtBQUVBLFlBQUksQ0FBQyxNQUFNLEtBQUssR0FBRztBQUNmLGlCQUFPLFNBQVMsT0FBTyxFQUFFO0FBQUEsUUFDN0I7QUFFQSxnQkFBUUEsUUFBTyxjQUFjLEtBQUs7QUFDbEMsWUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixpQkFBTztBQUFBLFFBQ1g7QUFFQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsZ0JBQWdCLE9BQU9BLFNBQVE7QUFDcEMsWUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixpQkFBT0EsUUFBTyxjQUFjLEtBQUssSUFBSSxLQUFLO0FBQUEsUUFDOUM7QUFDQSxlQUFPLE1BQU0sS0FBSyxJQUFJLE9BQU87QUFBQSxNQUNqQztBQUdBLGVBQVMsY0FBYyxJQUFJLEdBQUc7QUFDMUIsZUFBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFBQSxNQUMvQztBQUVBLFVBQUksd0JBQ0ksMkRBQTJELE1BQU0sR0FBRyxHQUN4RSw2QkFBNkIsOEJBQThCLE1BQU0sR0FBRyxHQUNwRSwyQkFBMkIsdUJBQXVCLE1BQU0sR0FBRyxHQUMzRCx1QkFBdUIsV0FDdkIsNEJBQTRCLFdBQzVCLDBCQUEwQjtBQUU5QixlQUFTLGVBQWUsR0FBR0QsU0FBUTtBQUMvQixZQUFJLFdBQVcsUUFBUSxLQUFLLFNBQVMsSUFDL0IsS0FBSyxZQUNMLEtBQUssVUFDRCxLQUFLLE1BQU0sUUFBUSxLQUFLLFVBQVUsU0FBUyxLQUFLQSxPQUFNLElBQ2hELFdBQ0EsWUFDVjtBQUNOLGVBQU8sTUFBTSxPQUNQLGNBQWMsVUFBVSxLQUFLLE1BQU0sR0FBRyxJQUN0QyxJQUNFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFDaEI7QUFBQSxNQUNaO0FBRUEsZUFBUyxvQkFBb0IsR0FBRztBQUM1QixlQUFPLE1BQU0sT0FDUCxjQUFjLEtBQUssZ0JBQWdCLEtBQUssTUFBTSxHQUFHLElBQ2pELElBQ0UsS0FBSyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQzNCLEtBQUs7QUFBQSxNQUNqQjtBQUVBLGVBQVMsa0JBQWtCLEdBQUc7QUFDMUIsZUFBTyxNQUFNLE9BQ1AsY0FBYyxLQUFLLGNBQWMsS0FBSyxNQUFNLEdBQUcsSUFDL0MsSUFDRSxLQUFLLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFDekIsS0FBSztBQUFBLE1BQ2pCO0FBRUEsZUFBUyxvQkFBb0IsYUFBYUEsU0FBUSxRQUFRO0FBQ3RELFlBQUksR0FDQSxJQUNBLEtBQ0EsTUFBTSxZQUFZLGtCQUFrQjtBQUN4QyxZQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDdEIsZUFBSyxpQkFBaUIsQ0FBQztBQUN2QixlQUFLLHNCQUFzQixDQUFDO0FBQzVCLGVBQUssb0JBQW9CLENBQUM7QUFFMUIsZUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRztBQUNwQixrQkFBTSxVQUFVLENBQUMsS0FBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7QUFDaEMsaUJBQUssa0JBQWtCLENBQUMsSUFBSSxLQUFLO0FBQUEsY0FDN0I7QUFBQSxjQUNBO0FBQUEsWUFDSixFQUFFLGtCQUFrQjtBQUNwQixpQkFBSyxvQkFBb0IsQ0FBQyxJQUFJLEtBQUs7QUFBQSxjQUMvQjtBQUFBLGNBQ0E7QUFBQSxZQUNKLEVBQUUsa0JBQWtCO0FBQ3BCLGlCQUFLLGVBQWUsQ0FBQyxJQUFJLEtBQUssU0FBUyxLQUFLLEVBQUUsRUFBRSxrQkFBa0I7QUFBQSxVQUN0RTtBQUFBLFFBQ0o7QUFFQSxZQUFJLFFBQVE7QUFDUixjQUFJQSxZQUFXLFFBQVE7QUFDbkIsaUJBQUssUUFBUSxLQUFLLEtBQUssZ0JBQWdCLEdBQUc7QUFDMUMsbUJBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUM1QixXQUFXQSxZQUFXLE9BQU87QUFDekIsaUJBQUssUUFBUSxLQUFLLEtBQUsscUJBQXFCLEdBQUc7QUFDL0MsbUJBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUM1QixPQUFPO0FBQ0gsaUJBQUssUUFBUSxLQUFLLEtBQUssbUJBQW1CLEdBQUc7QUFDN0MsbUJBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUM1QjtBQUFBLFFBQ0osT0FBTztBQUNILGNBQUlBLFlBQVcsUUFBUTtBQUNuQixpQkFBSyxRQUFRLEtBQUssS0FBSyxnQkFBZ0IsR0FBRztBQUMxQyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxxQkFBcUIsR0FBRztBQUMvQyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxtQkFBbUIsR0FBRztBQUM3QyxtQkFBTyxPQUFPLEtBQUssS0FBSztBQUFBLFVBQzVCLFdBQVdBLFlBQVcsT0FBTztBQUN6QixpQkFBSyxRQUFRLEtBQUssS0FBSyxxQkFBcUIsR0FBRztBQUMvQyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxnQkFBZ0IsR0FBRztBQUMxQyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxtQkFBbUIsR0FBRztBQUM3QyxtQkFBTyxPQUFPLEtBQUssS0FBSztBQUFBLFVBQzVCLE9BQU87QUFDSCxpQkFBSyxRQUFRLEtBQUssS0FBSyxtQkFBbUIsR0FBRztBQUM3QyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxnQkFBZ0IsR0FBRztBQUMxQyxnQkFBSSxPQUFPLElBQUk7QUFDWCxxQkFBTztBQUFBLFlBQ1g7QUFDQSxpQkFBSyxRQUFRLEtBQUssS0FBSyxxQkFBcUIsR0FBRztBQUMvQyxtQkFBTyxPQUFPLEtBQUssS0FBSztBQUFBLFVBQzVCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxlQUFTLG9CQUFvQixhQUFhQSxTQUFRLFFBQVE7QUFDdEQsWUFBSSxHQUFHLEtBQUs7QUFFWixZQUFJLEtBQUsscUJBQXFCO0FBQzFCLGlCQUFPLG9CQUFvQixLQUFLLE1BQU0sYUFBYUEsU0FBUSxNQUFNO0FBQUEsUUFDckU7QUFFQSxZQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDdEIsZUFBSyxpQkFBaUIsQ0FBQztBQUN2QixlQUFLLG9CQUFvQixDQUFDO0FBQzFCLGVBQUssc0JBQXNCLENBQUM7QUFDNUIsZUFBSyxxQkFBcUIsQ0FBQztBQUFBLFFBQy9CO0FBRUEsYUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFHcEIsZ0JBQU0sVUFBVSxDQUFDLEtBQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBQ2hDLGNBQUksVUFBVSxDQUFDLEtBQUssbUJBQW1CLENBQUMsR0FBRztBQUN2QyxpQkFBSyxtQkFBbUIsQ0FBQyxJQUFJLElBQUk7QUFBQSxjQUM3QixNQUFNLEtBQUssU0FBUyxLQUFLLEVBQUUsRUFBRSxRQUFRLEtBQUssTUFBTSxJQUFJO0FBQUEsY0FDcEQ7QUFBQSxZQUNKO0FBQ0EsaUJBQUssb0JBQW9CLENBQUMsSUFBSSxJQUFJO0FBQUEsY0FDOUIsTUFBTSxLQUFLLGNBQWMsS0FBSyxFQUFFLEVBQUUsUUFBUSxLQUFLLE1BQU0sSUFBSTtBQUFBLGNBQ3pEO0FBQUEsWUFDSjtBQUNBLGlCQUFLLGtCQUFrQixDQUFDLElBQUksSUFBSTtBQUFBLGNBQzVCLE1BQU0sS0FBSyxZQUFZLEtBQUssRUFBRSxFQUFFLFFBQVEsS0FBSyxNQUFNLElBQUk7QUFBQSxjQUN2RDtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQ0EsY0FBSSxDQUFDLEtBQUssZUFBZSxDQUFDLEdBQUc7QUFDekIsb0JBQ0ksTUFDQSxLQUFLLFNBQVMsS0FBSyxFQUFFLElBQ3JCLE9BQ0EsS0FBSyxjQUFjLEtBQUssRUFBRSxJQUMxQixPQUNBLEtBQUssWUFBWSxLQUFLLEVBQUU7QUFDNUIsaUJBQUssZUFBZSxDQUFDLElBQUksSUFBSSxPQUFPLE1BQU0sUUFBUSxLQUFLLEVBQUUsR0FBRyxHQUFHO0FBQUEsVUFDbkU7QUFFQSxjQUNJLFVBQ0FBLFlBQVcsVUFDWCxLQUFLLG1CQUFtQixDQUFDLEVBQUUsS0FBSyxXQUFXLEdBQzdDO0FBQ0UsbUJBQU87QUFBQSxVQUNYLFdBQ0ksVUFDQUEsWUFBVyxTQUNYLEtBQUssb0JBQW9CLENBQUMsRUFBRSxLQUFLLFdBQVcsR0FDOUM7QUFDRSxtQkFBTztBQUFBLFVBQ1gsV0FDSSxVQUNBQSxZQUFXLFFBQ1gsS0FBSyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssV0FBVyxHQUM1QztBQUNFLG1CQUFPO0FBQUEsVUFDWCxXQUFXLENBQUMsVUFBVSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEtBQUssV0FBVyxHQUFHO0FBQzVELG1CQUFPO0FBQUEsVUFDWDtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBSUEsZUFBUyxnQkFBZ0IsT0FBTztBQUM1QixZQUFJLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDakIsaUJBQU8sU0FBUyxPQUFPLE9BQU87QUFBQSxRQUNsQztBQUVBLFlBQUksTUFBTSxJQUFJLE1BQU0sS0FBSztBQUN6QixZQUFJLFNBQVMsTUFBTTtBQUNmLGtCQUFRLGFBQWEsT0FBTyxLQUFLLFdBQVcsQ0FBQztBQUM3QyxpQkFBTyxLQUFLLElBQUksUUFBUSxLQUFLLEdBQUc7QUFBQSxRQUNwQyxPQUFPO0FBQ0gsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUVBLGVBQVMsc0JBQXNCLE9BQU87QUFDbEMsWUFBSSxDQUFDLEtBQUssUUFBUSxHQUFHO0FBQ2pCLGlCQUFPLFNBQVMsT0FBTyxPQUFPO0FBQUEsUUFDbEM7QUFDQSxZQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRSxNQUFNLE9BQU87QUFDL0QsZUFBTyxTQUFTLE9BQU8sVUFBVSxLQUFLLElBQUksUUFBUSxTQUFTLEdBQUc7QUFBQSxNQUNsRTtBQUVBLGVBQVMsbUJBQW1CLE9BQU87QUFDL0IsWUFBSSxDQUFDLEtBQUssUUFBUSxHQUFHO0FBQ2pCLGlCQUFPLFNBQVMsT0FBTyxPQUFPO0FBQUEsUUFDbEM7QUFNQSxZQUFJLFNBQVMsTUFBTTtBQUNmLGNBQUksVUFBVSxnQkFBZ0IsT0FBTyxLQUFLLFdBQVcsQ0FBQztBQUN0RCxpQkFBTyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLFVBQVUsQ0FBQztBQUFBLFFBQzFELE9BQU87QUFDSCxpQkFBTyxLQUFLLElBQUksS0FBSztBQUFBLFFBQ3pCO0FBQUEsTUFDSjtBQUVBLGVBQVMsY0FBYyxVQUFVO0FBQzdCLFlBQUksS0FBSyxxQkFBcUI7QUFDMUIsY0FBSSxDQUFDLFdBQVcsTUFBTSxnQkFBZ0IsR0FBRztBQUNyQyxpQ0FBcUIsS0FBSyxJQUFJO0FBQUEsVUFDbEM7QUFDQSxjQUFJLFVBQVU7QUFDVixtQkFBTyxLQUFLO0FBQUEsVUFDaEIsT0FBTztBQUNILG1CQUFPLEtBQUs7QUFBQSxVQUNoQjtBQUFBLFFBQ0osT0FBTztBQUNILGNBQUksQ0FBQyxXQUFXLE1BQU0sZ0JBQWdCLEdBQUc7QUFDckMsaUJBQUssaUJBQWlCO0FBQUEsVUFDMUI7QUFDQSxpQkFBTyxLQUFLLHdCQUF3QixXQUM5QixLQUFLLHVCQUNMLEtBQUs7QUFBQSxRQUNmO0FBQUEsTUFDSjtBQUVBLGVBQVMsbUJBQW1CLFVBQVU7QUFDbEMsWUFBSSxLQUFLLHFCQUFxQjtBQUMxQixjQUFJLENBQUMsV0FBVyxNQUFNLGdCQUFnQixHQUFHO0FBQ3JDLGlDQUFxQixLQUFLLElBQUk7QUFBQSxVQUNsQztBQUNBLGNBQUksVUFBVTtBQUNWLG1CQUFPLEtBQUs7QUFBQSxVQUNoQixPQUFPO0FBQ0gsbUJBQU8sS0FBSztBQUFBLFVBQ2hCO0FBQUEsUUFDSixPQUFPO0FBQ0gsY0FBSSxDQUFDLFdBQVcsTUFBTSxxQkFBcUIsR0FBRztBQUMxQyxpQkFBSyxzQkFBc0I7QUFBQSxVQUMvQjtBQUNBLGlCQUFPLEtBQUssNkJBQTZCLFdBQ25DLEtBQUssNEJBQ0wsS0FBSztBQUFBLFFBQ2Y7QUFBQSxNQUNKO0FBRUEsZUFBUyxpQkFBaUIsVUFBVTtBQUNoQyxZQUFJLEtBQUsscUJBQXFCO0FBQzFCLGNBQUksQ0FBQyxXQUFXLE1BQU0sZ0JBQWdCLEdBQUc7QUFDckMsaUNBQXFCLEtBQUssSUFBSTtBQUFBLFVBQ2xDO0FBQ0EsY0FBSSxVQUFVO0FBQ1YsbUJBQU8sS0FBSztBQUFBLFVBQ2hCLE9BQU87QUFDSCxtQkFBTyxLQUFLO0FBQUEsVUFDaEI7QUFBQSxRQUNKLE9BQU87QUFDSCxjQUFJLENBQUMsV0FBVyxNQUFNLG1CQUFtQixHQUFHO0FBQ3hDLGlCQUFLLG9CQUFvQjtBQUFBLFVBQzdCO0FBQ0EsaUJBQU8sS0FBSywyQkFBMkIsV0FDakMsS0FBSywwQkFDTCxLQUFLO0FBQUEsUUFDZjtBQUFBLE1BQ0o7QUFFQSxlQUFTLHVCQUF1QjtBQUM1QixpQkFBUyxVQUFVLEdBQUcsR0FBRztBQUNyQixpQkFBTyxFQUFFLFNBQVMsRUFBRTtBQUFBLFFBQ3hCO0FBRUEsWUFBSSxZQUFZLENBQUMsR0FDYixjQUFjLENBQUMsR0FDZixhQUFhLENBQUMsR0FDZCxjQUFjLENBQUMsR0FDZixHQUNBLEtBQ0EsTUFDQSxRQUNBO0FBQ0osYUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFFcEIsZ0JBQU0sVUFBVSxDQUFDLEtBQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBQ2hDLGlCQUFPLFlBQVksS0FBSyxZQUFZLEtBQUssRUFBRSxDQUFDO0FBQzVDLG1CQUFTLFlBQVksS0FBSyxjQUFjLEtBQUssRUFBRSxDQUFDO0FBQ2hELGtCQUFRLFlBQVksS0FBSyxTQUFTLEtBQUssRUFBRSxDQUFDO0FBQzFDLG9CQUFVLEtBQUssSUFBSTtBQUNuQixzQkFBWSxLQUFLLE1BQU07QUFDdkIscUJBQVcsS0FBSyxLQUFLO0FBQ3JCLHNCQUFZLEtBQUssSUFBSTtBQUNyQixzQkFBWSxLQUFLLE1BQU07QUFDdkIsc0JBQVksS0FBSyxLQUFLO0FBQUEsUUFDMUI7QUFHQSxrQkFBVSxLQUFLLFNBQVM7QUFDeEIsb0JBQVksS0FBSyxTQUFTO0FBQzFCLG1CQUFXLEtBQUssU0FBUztBQUN6QixvQkFBWSxLQUFLLFNBQVM7QUFFMUIsYUFBSyxpQkFBaUIsSUFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFDeEUsYUFBSyxzQkFBc0IsS0FBSztBQUNoQyxhQUFLLG9CQUFvQixLQUFLO0FBRTlCLGFBQUssdUJBQXVCLElBQUk7QUFBQSxVQUM1QixPQUFPLFdBQVcsS0FBSyxHQUFHLElBQUk7QUFBQSxVQUM5QjtBQUFBLFFBQ0o7QUFDQSxhQUFLLDRCQUE0QixJQUFJO0FBQUEsVUFDakMsT0FBTyxZQUFZLEtBQUssR0FBRyxJQUFJO0FBQUEsVUFDL0I7QUFBQSxRQUNKO0FBQ0EsYUFBSywwQkFBMEIsSUFBSTtBQUFBLFVBQy9CLE9BQU8sVUFBVSxLQUFLLEdBQUcsSUFBSTtBQUFBLFVBQzdCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFJQSxlQUFTLFVBQVU7QUFDZixlQUFPLEtBQUssTUFBTSxJQUFJLE1BQU07QUFBQSxNQUNoQztBQUVBLGVBQVMsVUFBVTtBQUNmLGVBQU8sS0FBSyxNQUFNLEtBQUs7QUFBQSxNQUMzQjtBQUVBLHFCQUFlLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU07QUFDeEMscUJBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTztBQUN6QyxxQkFBZSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPO0FBRXpDLHFCQUFlLE9BQU8sR0FBRyxHQUFHLFdBQVk7QUFDcEMsZUFBTyxLQUFLLFFBQVEsTUFBTSxJQUFJLElBQUksU0FBUyxLQUFLLFFBQVEsR0FBRyxDQUFDO0FBQUEsTUFDaEUsQ0FBQztBQUVELHFCQUFlLFNBQVMsR0FBRyxHQUFHLFdBQVk7QUFDdEMsZUFDSSxLQUNBLFFBQVEsTUFBTSxJQUFJLElBQ2xCLFNBQVMsS0FBSyxRQUFRLEdBQUcsQ0FBQyxJQUMxQixTQUFTLEtBQUssUUFBUSxHQUFHLENBQUM7QUFBQSxNQUVsQyxDQUFDO0FBRUQscUJBQWUsT0FBTyxHQUFHLEdBQUcsV0FBWTtBQUNwQyxlQUFPLEtBQUssS0FBSyxNQUFNLElBQUksU0FBUyxLQUFLLFFBQVEsR0FBRyxDQUFDO0FBQUEsTUFDekQsQ0FBQztBQUVELHFCQUFlLFNBQVMsR0FBRyxHQUFHLFdBQVk7QUFDdEMsZUFDSSxLQUNBLEtBQUssTUFBTSxJQUNYLFNBQVMsS0FBSyxRQUFRLEdBQUcsQ0FBQyxJQUMxQixTQUFTLEtBQUssUUFBUSxHQUFHLENBQUM7QUFBQSxNQUVsQyxDQUFDO0FBRUQsZUFBUyxTQUFTTSxRQUFPLFdBQVc7QUFDaEMsdUJBQWVBLFFBQU8sR0FBRyxHQUFHLFdBQVk7QUFDcEMsaUJBQU8sS0FBSyxXQUFXLEVBQUU7QUFBQSxZQUNyQixLQUFLLE1BQU07QUFBQSxZQUNYLEtBQUssUUFBUTtBQUFBLFlBQ2I7QUFBQSxVQUNKO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUVBLGVBQVMsS0FBSyxJQUFJO0FBQ2xCLGVBQVMsS0FBSyxLQUFLO0FBSW5CLGVBQVMsY0FBYyxVQUFVTCxTQUFRO0FBQ3JDLGVBQU9BLFFBQU87QUFBQSxNQUNsQjtBQUVBLG9CQUFjLEtBQUssYUFBYTtBQUNoQyxvQkFBYyxLQUFLLGFBQWE7QUFDaEMsb0JBQWMsS0FBSyxXQUFXLGdCQUFnQjtBQUM5QyxvQkFBYyxLQUFLLFdBQVcsc0JBQXNCO0FBQ3BELG9CQUFjLEtBQUssV0FBVyxzQkFBc0I7QUFDcEQsb0JBQWMsTUFBTSxXQUFXLE1BQU07QUFDckMsb0JBQWMsTUFBTSxXQUFXLE1BQU07QUFDckMsb0JBQWMsTUFBTSxXQUFXLE1BQU07QUFFckMsb0JBQWMsT0FBTyxTQUFTO0FBQzlCLG9CQUFjLFNBQVMsU0FBUztBQUNoQyxvQkFBYyxPQUFPLFNBQVM7QUFDOUIsb0JBQWMsU0FBUyxTQUFTO0FBRWhDLG9CQUFjLENBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSTtBQUMvQixvQkFBYyxDQUFDLEtBQUssSUFBSSxHQUFHLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDdkQsWUFBSSxTQUFTLE1BQU0sS0FBSztBQUN4QixjQUFNLElBQUksSUFBSSxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RDLENBQUM7QUFDRCxvQkFBYyxDQUFDLEtBQUssR0FBRyxHQUFHLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDdEQsZUFBTyxRQUFRLE9BQU8sUUFBUSxLQUFLLEtBQUs7QUFDeEMsZUFBTyxZQUFZO0FBQUEsTUFDdkIsQ0FBQztBQUNELG9CQUFjLENBQUMsS0FBSyxJQUFJLEdBQUcsU0FBVSxPQUFPLE9BQU8sUUFBUTtBQUN2RCxjQUFNLElBQUksSUFBSSxNQUFNLEtBQUs7QUFDekIsd0JBQWdCLE1BQU0sRUFBRSxVQUFVO0FBQUEsTUFDdEMsQ0FBQztBQUNELG9CQUFjLE9BQU8sU0FBVSxPQUFPLE9BQU8sUUFBUTtBQUNqRCxZQUFJLE1BQU0sTUFBTSxTQUFTO0FBQ3pCLGNBQU0sSUFBSSxJQUFJLE1BQU0sTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ3hDLGNBQU0sTUFBTSxJQUFJLE1BQU0sTUFBTSxPQUFPLEdBQUcsQ0FBQztBQUN2Qyx3QkFBZ0IsTUFBTSxFQUFFLFVBQVU7QUFBQSxNQUN0QyxDQUFDO0FBQ0Qsb0JBQWMsU0FBUyxTQUFVLE9BQU8sT0FBTyxRQUFRO0FBQ25ELFlBQUksT0FBTyxNQUFNLFNBQVMsR0FDdEIsT0FBTyxNQUFNLFNBQVM7QUFDMUIsY0FBTSxJQUFJLElBQUksTUFBTSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDekMsY0FBTSxNQUFNLElBQUksTUFBTSxNQUFNLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFDM0MsY0FBTSxNQUFNLElBQUksTUFBTSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ3hDLHdCQUFnQixNQUFNLEVBQUUsVUFBVTtBQUFBLE1BQ3RDLENBQUM7QUFDRCxvQkFBYyxPQUFPLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDakQsWUFBSSxNQUFNLE1BQU0sU0FBUztBQUN6QixjQUFNLElBQUksSUFBSSxNQUFNLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUN4QyxjQUFNLE1BQU0sSUFBSSxNQUFNLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFBQSxNQUMzQyxDQUFDO0FBQ0Qsb0JBQWMsU0FBUyxTQUFVLE9BQU8sT0FBTyxRQUFRO0FBQ25ELFlBQUksT0FBTyxNQUFNLFNBQVMsR0FDdEIsT0FBTyxNQUFNLFNBQVM7QUFDMUIsY0FBTSxJQUFJLElBQUksTUFBTSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDekMsY0FBTSxNQUFNLElBQUksTUFBTSxNQUFNLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFDM0MsY0FBTSxNQUFNLElBQUksTUFBTSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQUEsTUFDNUMsQ0FBQztBQUlELGVBQVMsV0FBVyxPQUFPO0FBR3ZCLGdCQUFRLFFBQVEsSUFBSSxZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU07QUFBQSxNQUNwRDtBQUVBLFVBQUksNkJBQTZCLGlCQUs3QixhQUFhLFdBQVcsU0FBUyxJQUFJO0FBRXpDLGVBQVMsZUFBZVUsUUFBT0MsVUFBUyxTQUFTO0FBQzdDLFlBQUlELFNBQVEsSUFBSTtBQUNaLGlCQUFPLFVBQVUsT0FBTztBQUFBLFFBQzVCLE9BQU87QUFDSCxpQkFBTyxVQUFVLE9BQU87QUFBQSxRQUM1QjtBQUFBLE1BQ0o7QUFFQSxVQUFJLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxRQUNULHdCQUF3QjtBQUFBLFFBQ3hCLGNBQWM7QUFBQSxRQUVkLFFBQVE7QUFBQSxRQUNSLGFBQWE7QUFBQSxRQUViLE1BQU07QUFBQSxRQUVOLFVBQVU7QUFBQSxRQUNWLGFBQWE7QUFBQSxRQUNiLGVBQWU7QUFBQSxRQUVmLGVBQWU7QUFBQSxNQUNuQjtBQUdBLFVBQUksVUFBVSxDQUFDLEdBQ1gsaUJBQWlCLENBQUMsR0FDbEI7QUFFSixlQUFTLGFBQWEsTUFBTSxNQUFNO0FBQzlCLFlBQUksR0FDQSxPQUFPLEtBQUssSUFBSSxLQUFLLFFBQVEsS0FBSyxNQUFNO0FBQzVDLGFBQUssSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLLEdBQUc7QUFDMUIsY0FBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRztBQUNyQixtQkFBTztBQUFBLFVBQ1g7QUFBQSxRQUNKO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLGdCQUFnQixLQUFLO0FBQzFCLGVBQU8sTUFBTSxJQUFJLFlBQVksRUFBRSxRQUFRLEtBQUssR0FBRyxJQUFJO0FBQUEsTUFDdkQ7QUFLQSxlQUFTLGFBQWEsT0FBTztBQUN6QixZQUFJLElBQUksR0FDSixHQUNBLE1BQ0FWLFNBQ0E7QUFFSixlQUFPLElBQUksTUFBTSxRQUFRO0FBQ3JCLGtCQUFRLGdCQUFnQixNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRztBQUMzQyxjQUFJLE1BQU07QUFDVixpQkFBTyxnQkFBZ0IsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUNuQyxpQkFBTyxPQUFPLEtBQUssTUFBTSxHQUFHLElBQUk7QUFDaEMsaUJBQU8sSUFBSSxHQUFHO0FBQ1YsWUFBQUEsVUFBUyxXQUFXLE1BQU0sTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQztBQUMvQyxnQkFBSUEsU0FBUTtBQUNSLHFCQUFPQTtBQUFBLFlBQ1g7QUFDQSxnQkFDSSxRQUNBLEtBQUssVUFBVSxLQUNmLGFBQWEsT0FBTyxJQUFJLEtBQUssSUFBSSxHQUNuQztBQUVFO0FBQUEsWUFDSjtBQUNBO0FBQUEsVUFDSjtBQUNBO0FBQUEsUUFDSjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxpQkFBaUIsTUFBTTtBQUc1QixlQUFPLENBQUMsRUFBRSxRQUFRLEtBQUssTUFBTSxhQUFhO0FBQUEsTUFDOUM7QUFFQSxlQUFTLFdBQVcsTUFBTTtBQUN0QixZQUFJLFlBQVksTUFDWjtBQUVKLFlBQ0ksUUFBUSxJQUFJLE1BQU0sVUFDbEIsT0FBTyxXQUFXLGVBQ2xCLFVBQ0EsT0FBTyxXQUNQLGlCQUFpQixJQUFJLEdBQ3ZCO0FBQ0UsY0FBSTtBQUNBLHdCQUFZLGFBQWE7QUFDekIsNkJBQWlCO0FBQ2pCLDJCQUFlLGNBQWMsSUFBSTtBQUNqQywrQkFBbUIsU0FBUztBQUFBLFVBQ2hDLFNBQVMsR0FBRztBQUdSLG9CQUFRLElBQUksSUFBSTtBQUFBLFVBQ3BCO0FBQUEsUUFDSjtBQUNBLGVBQU8sUUFBUSxJQUFJO0FBQUEsTUFDdkI7QUFLQSxlQUFTLG1CQUFtQixLQUFLLFFBQVE7QUFDckMsWUFBSTtBQUNKLFlBQUksS0FBSztBQUNMLGNBQUksWUFBWSxNQUFNLEdBQUc7QUFDckIsbUJBQU8sVUFBVSxHQUFHO0FBQUEsVUFDeEIsT0FBTztBQUNILG1CQUFPLGFBQWEsS0FBSyxNQUFNO0FBQUEsVUFDbkM7QUFFQSxjQUFJLE1BQU07QUFFTiwyQkFBZTtBQUFBLFVBQ25CLE9BQU87QUFDSCxnQkFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLE1BQU07QUFFaEQsc0JBQVE7QUFBQSxnQkFDSixZQUFZLE1BQU07QUFBQSxjQUN0QjtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUVBLGVBQU8sYUFBYTtBQUFBLE1BQ3hCO0FBRUEsZUFBUyxhQUFhLE1BQU0sUUFBUTtBQUNoQyxZQUFJLFdBQVcsTUFBTTtBQUNqQixjQUFJQSxTQUNBLGVBQWU7QUFDbkIsaUJBQU8sT0FBTztBQUNkLGNBQUksUUFBUSxJQUFJLEtBQUssTUFBTTtBQUN2QjtBQUFBLGNBQ0k7QUFBQSxjQUNBO0FBQUEsWUFJSjtBQUNBLDJCQUFlLFFBQVEsSUFBSSxFQUFFO0FBQUEsVUFDakMsV0FBVyxPQUFPLGdCQUFnQixNQUFNO0FBQ3BDLGdCQUFJLFFBQVEsT0FBTyxZQUFZLEtBQUssTUFBTTtBQUN0Qyw2QkFBZSxRQUFRLE9BQU8sWUFBWSxFQUFFO0FBQUEsWUFDaEQsT0FBTztBQUNILGNBQUFBLFVBQVMsV0FBVyxPQUFPLFlBQVk7QUFDdkMsa0JBQUlBLFdBQVUsTUFBTTtBQUNoQiwrQkFBZUEsUUFBTztBQUFBLGNBQzFCLE9BQU87QUFDSCxvQkFBSSxDQUFDLGVBQWUsT0FBTyxZQUFZLEdBQUc7QUFDdEMsaUNBQWUsT0FBTyxZQUFZLElBQUksQ0FBQztBQUFBLGdCQUMzQztBQUNBLCtCQUFlLE9BQU8sWUFBWSxFQUFFLEtBQUs7QUFBQSxrQkFDckM7QUFBQSxrQkFDQTtBQUFBLGdCQUNKLENBQUM7QUFDRCx1QkFBTztBQUFBLGNBQ1g7QUFBQSxZQUNKO0FBQUEsVUFDSjtBQUNBLGtCQUFRLElBQUksSUFBSSxJQUFJLE9BQU8sYUFBYSxjQUFjLE1BQU0sQ0FBQztBQUU3RCxjQUFJLGVBQWUsSUFBSSxHQUFHO0FBQ3RCLDJCQUFlLElBQUksRUFBRSxRQUFRLFNBQVUsR0FBRztBQUN0QywyQkFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQUEsWUFDakMsQ0FBQztBQUFBLFVBQ0w7QUFLQSw2QkFBbUIsSUFBSTtBQUV2QixpQkFBTyxRQUFRLElBQUk7QUFBQSxRQUN2QixPQUFPO0FBRUgsaUJBQU8sUUFBUSxJQUFJO0FBQ25CLGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFFQSxlQUFTLGFBQWEsTUFBTSxRQUFRO0FBQ2hDLFlBQUksVUFBVSxNQUFNO0FBQ2hCLGNBQUlBLFNBQ0EsV0FDQSxlQUFlO0FBRW5CLGNBQUksUUFBUSxJQUFJLEtBQUssUUFBUSxRQUFRLElBQUksRUFBRSxnQkFBZ0IsTUFBTTtBQUU3RCxvQkFBUSxJQUFJLEVBQUUsSUFBSSxhQUFhLFFBQVEsSUFBSSxFQUFFLFNBQVMsTUFBTSxDQUFDO0FBQUEsVUFDakUsT0FBTztBQUVILHdCQUFZLFdBQVcsSUFBSTtBQUMzQixnQkFBSSxhQUFhLE1BQU07QUFDbkIsNkJBQWUsVUFBVTtBQUFBLFlBQzdCO0FBQ0EscUJBQVMsYUFBYSxjQUFjLE1BQU07QUFDMUMsZ0JBQUksYUFBYSxNQUFNO0FBSW5CLHFCQUFPLE9BQU87QUFBQSxZQUNsQjtBQUNBLFlBQUFBLFVBQVMsSUFBSSxPQUFPLE1BQU07QUFDMUIsWUFBQUEsUUFBTyxlQUFlLFFBQVEsSUFBSTtBQUNsQyxvQkFBUSxJQUFJLElBQUlBO0FBQUEsVUFDcEI7QUFHQSw2QkFBbUIsSUFBSTtBQUFBLFFBQzNCLE9BQU87QUFFSCxjQUFJLFFBQVEsSUFBSSxLQUFLLE1BQU07QUFDdkIsZ0JBQUksUUFBUSxJQUFJLEVBQUUsZ0JBQWdCLE1BQU07QUFDcEMsc0JBQVEsSUFBSSxJQUFJLFFBQVEsSUFBSSxFQUFFO0FBQzlCLGtCQUFJLFNBQVMsbUJBQW1CLEdBQUc7QUFDL0IsbUNBQW1CLElBQUk7QUFBQSxjQUMzQjtBQUFBLFlBQ0osV0FBVyxRQUFRLElBQUksS0FBSyxNQUFNO0FBQzlCLHFCQUFPLFFBQVEsSUFBSTtBQUFBLFlBQ3ZCO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFDQSxlQUFPLFFBQVEsSUFBSTtBQUFBLE1BQ3ZCO0FBR0EsZUFBUyxVQUFVLEtBQUs7QUFDcEIsWUFBSUE7QUFFSixZQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksUUFBUSxPQUFPO0FBQ3pDLGdCQUFNLElBQUksUUFBUTtBQUFBLFFBQ3RCO0FBRUEsWUFBSSxDQUFDLEtBQUs7QUFDTixpQkFBTztBQUFBLFFBQ1g7QUFFQSxZQUFJLENBQUMsUUFBUSxHQUFHLEdBQUc7QUFFZixVQUFBQSxVQUFTLFdBQVcsR0FBRztBQUN2QixjQUFJQSxTQUFRO0FBQ1IsbUJBQU9BO0FBQUEsVUFDWDtBQUNBLGdCQUFNLENBQUMsR0FBRztBQUFBLFFBQ2Q7QUFFQSxlQUFPLGFBQWEsR0FBRztBQUFBLE1BQzNCO0FBRUEsZUFBUyxjQUFjO0FBQ25CLGVBQU8sS0FBSyxPQUFPO0FBQUEsTUFDdkI7QUFFQSxlQUFTLGNBQWMsR0FBRztBQUN0QixZQUFJLFVBQ0EsSUFBSSxFQUFFO0FBRVYsWUFBSSxLQUFLLGdCQUFnQixDQUFDLEVBQUUsYUFBYSxJQUFJO0FBQ3pDLHFCQUNJLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxLQUFLLElBQUksS0FDckIsUUFDQSxFQUFFLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLFlBQVksRUFBRSxJQUFJLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFDcEQsT0FDQSxFQUFFLElBQUksSUFBSSxLQUNSLEVBQUUsSUFBSSxJQUFJLE1BQ1QsRUFBRSxJQUFJLE1BQU0sT0FDUixFQUFFLE1BQU0sTUFBTSxLQUNYLEVBQUUsTUFBTSxNQUFNLEtBQ2QsRUFBRSxXQUFXLE1BQU0sS0FDM0IsT0FDQSxFQUFFLE1BQU0sSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLEtBQzNCLFNBQ0EsRUFBRSxNQUFNLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxLQUMzQixTQUNBLEVBQUUsV0FBVyxJQUFJLEtBQUssRUFBRSxXQUFXLElBQUksTUFDckMsY0FDQTtBQUVwQixjQUNJLGdCQUFnQixDQUFDLEVBQUUsdUJBQ2xCLFdBQVcsUUFBUSxXQUFXLE9BQ2pDO0FBQ0UsdUJBQVc7QUFBQSxVQUNmO0FBQ0EsY0FBSSxnQkFBZ0IsQ0FBQyxFQUFFLGtCQUFrQixhQUFhLElBQUk7QUFDdEQsdUJBQVc7QUFBQSxVQUNmO0FBQ0EsY0FBSSxnQkFBZ0IsQ0FBQyxFQUFFLG9CQUFvQixhQUFhLElBQUk7QUFDeEQsdUJBQVc7QUFBQSxVQUNmO0FBRUEsMEJBQWdCLENBQUMsRUFBRSxXQUFXO0FBQUEsUUFDbEM7QUFFQSxlQUFPO0FBQUEsTUFDWDtBQUlBLFVBQUksbUJBQ0ksa0pBQ0osZ0JBQ0ksOElBQ0osVUFBVSx5QkFDVixXQUFXO0FBQUEsUUFDUCxDQUFDLGdCQUFnQixxQkFBcUI7QUFBQSxRQUN0QyxDQUFDLGNBQWMsaUJBQWlCO0FBQUEsUUFDaEMsQ0FBQyxnQkFBZ0IsZ0JBQWdCO0FBQUEsUUFDakMsQ0FBQyxjQUFjLGVBQWUsS0FBSztBQUFBLFFBQ25DLENBQUMsWUFBWSxhQUFhO0FBQUEsUUFDMUIsQ0FBQyxXQUFXLGNBQWMsS0FBSztBQUFBLFFBQy9CLENBQUMsY0FBYyxZQUFZO0FBQUEsUUFDM0IsQ0FBQyxZQUFZLE9BQU87QUFBQSxRQUNwQixDQUFDLGNBQWMsYUFBYTtBQUFBLFFBQzVCLENBQUMsYUFBYSxlQUFlLEtBQUs7QUFBQSxRQUNsQyxDQUFDLFdBQVcsT0FBTztBQUFBLFFBQ25CLENBQUMsVUFBVSxTQUFTLEtBQUs7QUFBQSxRQUN6QixDQUFDLFFBQVEsU0FBUyxLQUFLO0FBQUEsTUFDM0IsR0FFQSxXQUFXO0FBQUEsUUFDUCxDQUFDLGlCQUFpQixxQkFBcUI7QUFBQSxRQUN2QyxDQUFDLGlCQUFpQixvQkFBb0I7QUFBQSxRQUN0QyxDQUFDLFlBQVksZ0JBQWdCO0FBQUEsUUFDN0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxRQUNyQixDQUFDLGVBQWUsbUJBQW1CO0FBQUEsUUFDbkMsQ0FBQyxlQUFlLGtCQUFrQjtBQUFBLFFBQ2xDLENBQUMsVUFBVSxjQUFjO0FBQUEsUUFDekIsQ0FBQyxRQUFRLFVBQVU7QUFBQSxRQUNuQixDQUFDLE1BQU0sTUFBTTtBQUFBLE1BQ2pCLEdBQ0Esa0JBQWtCLHNCQUVsQixVQUNJLDJMQUNKLGFBQWE7QUFBQSxRQUNULElBQUk7QUFBQSxRQUNKLEtBQUs7QUFBQSxRQUNMLEtBQUssS0FBSztBQUFBLFFBQ1YsS0FBSyxLQUFLO0FBQUEsUUFDVixLQUFLLEtBQUs7QUFBQSxRQUNWLEtBQUssS0FBSztBQUFBLFFBQ1YsS0FBSyxLQUFLO0FBQUEsUUFDVixLQUFLLEtBQUs7QUFBQSxRQUNWLEtBQUssS0FBSztBQUFBLFFBQ1YsS0FBSyxLQUFLO0FBQUEsTUFDZDtBQUdKLGVBQVMsY0FBYyxRQUFRO0FBQzNCLFlBQUksR0FDQSxHQUNBLFNBQVMsT0FBTyxJQUNoQixRQUFRLGlCQUFpQixLQUFLLE1BQU0sS0FBSyxjQUFjLEtBQUssTUFBTSxHQUNsRSxXQUNBLFlBQ0EsWUFDQSxVQUNBLGNBQWMsU0FBUyxRQUN2QixjQUFjLFNBQVM7QUFFM0IsWUFBSSxPQUFPO0FBQ1AsMEJBQWdCLE1BQU0sRUFBRSxNQUFNO0FBQzlCLGVBQUssSUFBSSxHQUFHLElBQUksYUFBYSxJQUFJLEdBQUcsS0FBSztBQUNyQyxnQkFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxHQUFHO0FBQy9CLDJCQUFhLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDMUIsMEJBQVksU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNO0FBQy9CO0FBQUEsWUFDSjtBQUFBLFVBQ0o7QUFDQSxjQUFJLGNBQWMsTUFBTTtBQUNwQixtQkFBTyxXQUFXO0FBQ2xCO0FBQUEsVUFDSjtBQUNBLGNBQUksTUFBTSxDQUFDLEdBQUc7QUFDVixpQkFBSyxJQUFJLEdBQUcsSUFBSSxhQUFhLElBQUksR0FBRyxLQUFLO0FBQ3JDLGtCQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEdBQUc7QUFFL0IsOEJBQWMsTUFBTSxDQUFDLEtBQUssT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQzlDO0FBQUEsY0FDSjtBQUFBLFlBQ0o7QUFDQSxnQkFBSSxjQUFjLE1BQU07QUFDcEIscUJBQU8sV0FBVztBQUNsQjtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQ0EsY0FBSSxDQUFDLGFBQWEsY0FBYyxNQUFNO0FBQ2xDLG1CQUFPLFdBQVc7QUFDbEI7QUFBQSxVQUNKO0FBQ0EsY0FBSSxNQUFNLENBQUMsR0FBRztBQUNWLGdCQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxHQUFHO0FBQ3hCLHlCQUFXO0FBQUEsWUFDZixPQUFPO0FBQ0gscUJBQU8sV0FBVztBQUNsQjtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQ0EsaUJBQU8sS0FBSyxjQUFjLGNBQWMsT0FBTyxZQUFZO0FBQzNELG9DQUEwQixNQUFNO0FBQUEsUUFDcEMsT0FBTztBQUNILGlCQUFPLFdBQVc7QUFBQSxRQUN0QjtBQUFBLE1BQ0o7QUFFQSxlQUFTLDBCQUNMLFNBQ0EsVUFDQSxRQUNBLFNBQ0EsV0FDQSxXQUNGO0FBQ0UsWUFBSSxTQUFTO0FBQUEsVUFDVCxlQUFlLE9BQU87QUFBQSxVQUN0Qix5QkFBeUIsUUFBUSxRQUFRO0FBQUEsVUFDekMsU0FBUyxRQUFRLEVBQUU7QUFBQSxVQUNuQixTQUFTLFNBQVMsRUFBRTtBQUFBLFVBQ3BCLFNBQVMsV0FBVyxFQUFFO0FBQUEsUUFDMUI7QUFFQSxZQUFJLFdBQVc7QUFDWCxpQkFBTyxLQUFLLFNBQVMsV0FBVyxFQUFFLENBQUM7QUFBQSxRQUN2QztBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxlQUFlLFNBQVM7QUFDN0IsWUFBSSxPQUFPLFNBQVMsU0FBUyxFQUFFO0FBQy9CLFlBQUksUUFBUSxJQUFJO0FBQ1osaUJBQU8sTUFBTztBQUFBLFFBQ2xCLFdBQVcsUUFBUSxLQUFLO0FBQ3BCLGlCQUFPLE9BQU87QUFBQSxRQUNsQjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxrQkFBa0IsR0FBRztBQUUxQixlQUFPLEVBQ0YsUUFBUSxzQkFBc0IsR0FBRyxFQUNqQyxRQUFRLFlBQVksR0FBRyxFQUN2QixRQUFRLFVBQVUsRUFBRSxFQUNwQixRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzdCO0FBRUEsZUFBUyxhQUFhLFlBQVksYUFBYSxRQUFRO0FBQ25ELFlBQUksWUFBWTtBQUVaLGNBQUksa0JBQWtCLDJCQUEyQixRQUFRLFVBQVUsR0FDL0QsZ0JBQWdCLElBQUk7QUFBQSxZQUNoQixZQUFZLENBQUM7QUFBQSxZQUNiLFlBQVksQ0FBQztBQUFBLFlBQ2IsWUFBWSxDQUFDO0FBQUEsVUFDakIsRUFBRSxPQUFPO0FBQ2IsY0FBSSxvQkFBb0IsZUFBZTtBQUNuQyw0QkFBZ0IsTUFBTSxFQUFFLGtCQUFrQjtBQUMxQyxtQkFBTyxXQUFXO0FBQ2xCLG1CQUFPO0FBQUEsVUFDWDtBQUFBLFFBQ0o7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsZ0JBQWdCLFdBQVcsZ0JBQWdCLFdBQVc7QUFDM0QsWUFBSSxXQUFXO0FBQ1gsaUJBQU8sV0FBVyxTQUFTO0FBQUEsUUFDL0IsV0FBVyxnQkFBZ0I7QUFFdkIsaUJBQU87QUFBQSxRQUNYLE9BQU87QUFDSCxjQUFJLEtBQUssU0FBUyxXQUFXLEVBQUUsR0FDM0IsSUFBSSxLQUFLLEtBQ1QsS0FBSyxLQUFLLEtBQUs7QUFDbkIsaUJBQU8sSUFBSSxLQUFLO0FBQUEsUUFDcEI7QUFBQSxNQUNKO0FBR0EsZUFBUyxrQkFBa0IsUUFBUTtBQUMvQixZQUFJLFFBQVEsUUFBUSxLQUFLLGtCQUFrQixPQUFPLEVBQUUsQ0FBQyxHQUNqRDtBQUNKLFlBQUksT0FBTztBQUNQLHdCQUFjO0FBQUEsWUFDVixNQUFNLENBQUM7QUFBQSxZQUNQLE1BQU0sQ0FBQztBQUFBLFlBQ1AsTUFBTSxDQUFDO0FBQUEsWUFDUCxNQUFNLENBQUM7QUFBQSxZQUNQLE1BQU0sQ0FBQztBQUFBLFlBQ1AsTUFBTSxDQUFDO0FBQUEsVUFDWDtBQUNBLGNBQUksQ0FBQyxhQUFhLE1BQU0sQ0FBQyxHQUFHLGFBQWEsTUFBTSxHQUFHO0FBQzlDO0FBQUEsVUFDSjtBQUVBLGlCQUFPLEtBQUs7QUFDWixpQkFBTyxPQUFPLGdCQUFnQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUUzRCxpQkFBTyxLQUFLLGNBQWMsTUFBTSxNQUFNLE9BQU8sRUFBRTtBQUMvQyxpQkFBTyxHQUFHLGNBQWMsT0FBTyxHQUFHLGNBQWMsSUFBSSxPQUFPLElBQUk7QUFFL0QsMEJBQWdCLE1BQU0sRUFBRSxVQUFVO0FBQUEsUUFDdEMsT0FBTztBQUNILGlCQUFPLFdBQVc7QUFBQSxRQUN0QjtBQUFBLE1BQ0o7QUFHQSxlQUFTLGlCQUFpQixRQUFRO0FBQzlCLFlBQUksVUFBVSxnQkFBZ0IsS0FBSyxPQUFPLEVBQUU7QUFDNUMsWUFBSSxZQUFZLE1BQU07QUFDbEIsaUJBQU8sS0FBSyxvQkFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEM7QUFBQSxRQUNKO0FBRUEsc0JBQWMsTUFBTTtBQUNwQixZQUFJLE9BQU8sYUFBYSxPQUFPO0FBQzNCLGlCQUFPLE9BQU87QUFBQSxRQUNsQixPQUFPO0FBQ0g7QUFBQSxRQUNKO0FBRUEsMEJBQWtCLE1BQU07QUFDeEIsWUFBSSxPQUFPLGFBQWEsT0FBTztBQUMzQixpQkFBTyxPQUFPO0FBQUEsUUFDbEIsT0FBTztBQUNIO0FBQUEsUUFDSjtBQUVBLFlBQUksT0FBTyxTQUFTO0FBQ2hCLGlCQUFPLFdBQVc7QUFBQSxRQUN0QixPQUFPO0FBRUgsZ0JBQU0sd0JBQXdCLE1BQU07QUFBQSxRQUN4QztBQUFBLE1BQ0o7QUFFQSxZQUFNLDBCQUEwQjtBQUFBLFFBQzVCO0FBQUEsUUFHQSxTQUFVLFFBQVE7QUFDZCxpQkFBTyxLQUFLLG9CQUFJLEtBQUssT0FBTyxNQUFNLE9BQU8sVUFBVSxTQUFTLEdBQUc7QUFBQSxRQUNuRTtBQUFBLE1BQ0o7QUFHQSxlQUFTLFNBQVMsR0FBRyxHQUFHLEdBQUc7QUFDdkIsWUFBSSxLQUFLLE1BQU07QUFDWCxpQkFBTztBQUFBLFFBQ1g7QUFDQSxZQUFJLEtBQUssTUFBTTtBQUNYLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxpQkFBaUIsUUFBUTtBQUU5QixZQUFJLFdBQVcsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDO0FBQ25DLFlBQUksT0FBTyxTQUFTO0FBQ2hCLGlCQUFPO0FBQUEsWUFDSCxTQUFTLGVBQWU7QUFBQSxZQUN4QixTQUFTLFlBQVk7QUFBQSxZQUNyQixTQUFTLFdBQVc7QUFBQSxVQUN4QjtBQUFBLFFBQ0o7QUFDQSxlQUFPLENBQUMsU0FBUyxZQUFZLEdBQUcsU0FBUyxTQUFTLEdBQUcsU0FBUyxRQUFRLENBQUM7QUFBQSxNQUMzRTtBQU1BLGVBQVMsZ0JBQWdCLFFBQVE7QUFDN0IsWUFBSSxHQUNBLE1BQ0EsUUFBUSxDQUFDLEdBQ1QsYUFDQSxpQkFDQTtBQUVKLFlBQUksT0FBTyxJQUFJO0FBQ1g7QUFBQSxRQUNKO0FBRUEsc0JBQWMsaUJBQWlCLE1BQU07QUFHckMsWUFBSSxPQUFPLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxRQUFRLE9BQU8sR0FBRyxLQUFLLEtBQUssTUFBTTtBQUNsRSxnQ0FBc0IsTUFBTTtBQUFBLFFBQ2hDO0FBR0EsWUFBSSxPQUFPLGNBQWMsTUFBTTtBQUMzQixzQkFBWSxTQUFTLE9BQU8sR0FBRyxJQUFJLEdBQUcsWUFBWSxJQUFJLENBQUM7QUFFdkQsY0FDSSxPQUFPLGFBQWEsV0FBVyxTQUFTLEtBQ3hDLE9BQU8sZUFBZSxHQUN4QjtBQUNFLDRCQUFnQixNQUFNLEVBQUUscUJBQXFCO0FBQUEsVUFDakQ7QUFFQSxpQkFBTyxjQUFjLFdBQVcsR0FBRyxPQUFPLFVBQVU7QUFDcEQsaUJBQU8sR0FBRyxLQUFLLElBQUksS0FBSyxZQUFZO0FBQ3BDLGlCQUFPLEdBQUcsSUFBSSxJQUFJLEtBQUssV0FBVztBQUFBLFFBQ3RDO0FBT0EsYUFBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssTUFBTSxFQUFFLEdBQUc7QUFDNUMsaUJBQU8sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDO0FBQUEsUUFDM0M7QUFHQSxlQUFPLElBQUksR0FBRyxLQUFLO0FBQ2YsaUJBQU8sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQ2xCLE9BQU8sR0FBRyxDQUFDLEtBQUssT0FBUSxNQUFNLElBQUksSUFBSSxJQUFLLE9BQU8sR0FBRyxDQUFDO0FBQUEsUUFDOUQ7QUFHQSxZQUNJLE9BQU8sR0FBRyxJQUFJLE1BQU0sTUFDcEIsT0FBTyxHQUFHLE1BQU0sTUFBTSxLQUN0QixPQUFPLEdBQUcsTUFBTSxNQUFNLEtBQ3RCLE9BQU8sR0FBRyxXQUFXLE1BQU0sR0FDN0I7QUFDRSxpQkFBTyxXQUFXO0FBQ2xCLGlCQUFPLEdBQUcsSUFBSSxJQUFJO0FBQUEsUUFDdEI7QUFFQSxlQUFPLE1BQU0sT0FBTyxVQUFVLGdCQUFnQixZQUFZO0FBQUEsVUFDdEQ7QUFBQSxVQUNBO0FBQUEsUUFDSjtBQUNBLDBCQUFrQixPQUFPLFVBQ25CLE9BQU8sR0FBRyxVQUFVLElBQ3BCLE9BQU8sR0FBRyxPQUFPO0FBSXZCLFlBQUksT0FBTyxRQUFRLE1BQU07QUFDckIsaUJBQU8sR0FBRyxjQUFjLE9BQU8sR0FBRyxjQUFjLElBQUksT0FBTyxJQUFJO0FBQUEsUUFDbkU7QUFFQSxZQUFJLE9BQU8sVUFBVTtBQUNqQixpQkFBTyxHQUFHLElBQUksSUFBSTtBQUFBLFFBQ3RCO0FBR0EsWUFDSSxPQUFPLE1BQ1AsT0FBTyxPQUFPLEdBQUcsTUFBTSxlQUN2QixPQUFPLEdBQUcsTUFBTSxpQkFDbEI7QUFDRSwwQkFBZ0IsTUFBTSxFQUFFLGtCQUFrQjtBQUFBLFFBQzlDO0FBQUEsTUFDSjtBQUVBLGVBQVMsc0JBQXNCLFFBQVE7QUFDbkMsWUFBSSxHQUFHLFVBQVUsTUFBTSxTQUFTLEtBQUssS0FBSyxNQUFNLGlCQUFpQjtBQUVqRSxZQUFJLE9BQU87QUFDWCxZQUFJLEVBQUUsTUFBTSxRQUFRLEVBQUUsS0FBSyxRQUFRLEVBQUUsS0FBSyxNQUFNO0FBQzVDLGdCQUFNO0FBQ04sZ0JBQU07QUFNTixxQkFBVztBQUFBLFlBQ1AsRUFBRTtBQUFBLFlBQ0YsT0FBTyxHQUFHLElBQUk7QUFBQSxZQUNkLFdBQVcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFO0FBQUEsVUFDcEM7QUFDQSxpQkFBTyxTQUFTLEVBQUUsR0FBRyxDQUFDO0FBQ3RCLG9CQUFVLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekIsY0FBSSxVQUFVLEtBQUssVUFBVSxHQUFHO0FBQzVCLDhCQUFrQjtBQUFBLFVBQ3RCO0FBQUEsUUFDSixPQUFPO0FBQ0gsZ0JBQU0sT0FBTyxRQUFRLE1BQU07QUFDM0IsZ0JBQU0sT0FBTyxRQUFRLE1BQU07QUFFM0Isb0JBQVUsV0FBVyxZQUFZLEdBQUcsS0FBSyxHQUFHO0FBRTVDLHFCQUFXLFNBQVMsRUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsUUFBUSxJQUFJO0FBR3ZELGlCQUFPLFNBQVMsRUFBRSxHQUFHLFFBQVEsSUFBSTtBQUVqQyxjQUFJLEVBQUUsS0FBSyxNQUFNO0FBRWIsc0JBQVUsRUFBRTtBQUNaLGdCQUFJLFVBQVUsS0FBSyxVQUFVLEdBQUc7QUFDNUIsZ0NBQWtCO0FBQUEsWUFDdEI7QUFBQSxVQUNKLFdBQVcsRUFBRSxLQUFLLE1BQU07QUFFcEIsc0JBQVUsRUFBRSxJQUFJO0FBQ2hCLGdCQUFJLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSSxHQUFHO0FBQ3BCLGdDQUFrQjtBQUFBLFlBQ3RCO0FBQUEsVUFDSixPQUFPO0FBRUgsc0JBQVU7QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUNBLFlBQUksT0FBTyxLQUFLLE9BQU8sWUFBWSxVQUFVLEtBQUssR0FBRyxHQUFHO0FBQ3BELDBCQUFnQixNQUFNLEVBQUUsaUJBQWlCO0FBQUEsUUFDN0MsV0FBVyxtQkFBbUIsTUFBTTtBQUNoQywwQkFBZ0IsTUFBTSxFQUFFLG1CQUFtQjtBQUFBLFFBQy9DLE9BQU87QUFDSCxpQkFBTyxtQkFBbUIsVUFBVSxNQUFNLFNBQVMsS0FBSyxHQUFHO0FBQzNELGlCQUFPLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDdkIsaUJBQU8sYUFBYSxLQUFLO0FBQUEsUUFDN0I7QUFBQSxNQUNKO0FBR0EsWUFBTSxXQUFXLFdBQVk7QUFBQSxNQUFDO0FBRzlCLFlBQU0sV0FBVyxXQUFZO0FBQUEsTUFBQztBQUc5QixlQUFTLDBCQUEwQixRQUFRO0FBRXZDLFlBQUksT0FBTyxPQUFPLE1BQU0sVUFBVTtBQUM5Qix3QkFBYyxNQUFNO0FBQ3BCO0FBQUEsUUFDSjtBQUNBLFlBQUksT0FBTyxPQUFPLE1BQU0sVUFBVTtBQUM5Qiw0QkFBa0IsTUFBTTtBQUN4QjtBQUFBLFFBQ0o7QUFDQSxlQUFPLEtBQUssQ0FBQztBQUNiLHdCQUFnQixNQUFNLEVBQUUsUUFBUTtBQUdoQyxZQUFJLFNBQVMsS0FBSyxPQUFPLElBQ3JCLEdBQ0EsYUFDQVksU0FDQVAsUUFDQSxTQUNBLGVBQWUsT0FBTyxRQUN0Qix5QkFBeUIsR0FDekIsS0FDQTtBQUVKLFFBQUFPLFVBQ0ksYUFBYSxPQUFPLElBQUksT0FBTyxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsS0FBSyxDQUFDO0FBQ3hFLG1CQUFXQSxRQUFPO0FBQ2xCLGFBQUssSUFBSSxHQUFHLElBQUksVUFBVSxLQUFLO0FBQzNCLFVBQUFQLFNBQVFPLFFBQU8sQ0FBQztBQUNoQix5QkFBZSxPQUFPLE1BQU0sc0JBQXNCUCxRQUFPLE1BQU0sQ0FBQyxLQUM1RCxDQUFDLEdBQUcsQ0FBQztBQUNULGNBQUksYUFBYTtBQUNiLHNCQUFVLE9BQU8sT0FBTyxHQUFHLE9BQU8sUUFBUSxXQUFXLENBQUM7QUFDdEQsZ0JBQUksUUFBUSxTQUFTLEdBQUc7QUFDcEIsOEJBQWdCLE1BQU0sRUFBRSxZQUFZLEtBQUssT0FBTztBQUFBLFlBQ3BEO0FBQ0EscUJBQVMsT0FBTztBQUFBLGNBQ1osT0FBTyxRQUFRLFdBQVcsSUFBSSxZQUFZO0FBQUEsWUFDOUM7QUFDQSxzQ0FBMEIsWUFBWTtBQUFBLFVBQzFDO0FBRUEsY0FBSSxxQkFBcUJBLE1BQUssR0FBRztBQUM3QixnQkFBSSxhQUFhO0FBQ2IsOEJBQWdCLE1BQU0sRUFBRSxRQUFRO0FBQUEsWUFDcEMsT0FBTztBQUNILDhCQUFnQixNQUFNLEVBQUUsYUFBYSxLQUFLQSxNQUFLO0FBQUEsWUFDbkQ7QUFDQSxvQ0FBd0JBLFFBQU8sYUFBYSxNQUFNO0FBQUEsVUFDdEQsV0FBVyxPQUFPLFdBQVcsQ0FBQyxhQUFhO0FBQ3ZDLDRCQUFnQixNQUFNLEVBQUUsYUFBYSxLQUFLQSxNQUFLO0FBQUEsVUFDbkQ7QUFBQSxRQUNKO0FBR0Esd0JBQWdCLE1BQU0sRUFBRSxnQkFDcEIsZUFBZTtBQUNuQixZQUFJLE9BQU8sU0FBUyxHQUFHO0FBQ25CLDBCQUFnQixNQUFNLEVBQUUsWUFBWSxLQUFLLE1BQU07QUFBQSxRQUNuRDtBQUdBLFlBQ0ksT0FBTyxHQUFHLElBQUksS0FBSyxNQUNuQixnQkFBZ0IsTUFBTSxFQUFFLFlBQVksUUFDcEMsT0FBTyxHQUFHLElBQUksSUFBSSxHQUNwQjtBQUNFLDBCQUFnQixNQUFNLEVBQUUsVUFBVTtBQUFBLFFBQ3RDO0FBRUEsd0JBQWdCLE1BQU0sRUFBRSxrQkFBa0IsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUMzRCx3QkFBZ0IsTUFBTSxFQUFFLFdBQVcsT0FBTztBQUUxQyxlQUFPLEdBQUcsSUFBSSxJQUFJO0FBQUEsVUFDZCxPQUFPO0FBQUEsVUFDUCxPQUFPLEdBQUcsSUFBSTtBQUFBLFVBQ2QsT0FBTztBQUFBLFFBQ1g7QUFHQSxjQUFNLGdCQUFnQixNQUFNLEVBQUU7QUFDOUIsWUFBSSxRQUFRLE1BQU07QUFDZCxpQkFBTyxHQUFHLElBQUksSUFBSSxPQUFPLFFBQVEsZ0JBQWdCLEtBQUssT0FBTyxHQUFHLElBQUksQ0FBQztBQUFBLFFBQ3pFO0FBRUEsd0JBQWdCLE1BQU07QUFDdEIsc0JBQWMsTUFBTTtBQUFBLE1BQ3hCO0FBRUEsZUFBUyxnQkFBZ0JMLFNBQVEsTUFBTWEsV0FBVTtBQUM3QyxZQUFJO0FBRUosWUFBSUEsYUFBWSxNQUFNO0FBRWxCLGlCQUFPO0FBQUEsUUFDWDtBQUNBLFlBQUliLFFBQU8sZ0JBQWdCLE1BQU07QUFDN0IsaUJBQU9BLFFBQU8sYUFBYSxNQUFNYSxTQUFRO0FBQUEsUUFDN0MsV0FBV2IsUUFBTyxRQUFRLE1BQU07QUFFNUIsaUJBQU9BLFFBQU8sS0FBS2EsU0FBUTtBQUMzQixjQUFJLFFBQVEsT0FBTyxJQUFJO0FBQ25CLG9CQUFRO0FBQUEsVUFDWjtBQUNBLGNBQUksQ0FBQyxRQUFRLFNBQVMsSUFBSTtBQUN0QixtQkFBTztBQUFBLFVBQ1g7QUFDQSxpQkFBTztBQUFBLFFBQ1gsT0FBTztBQUVILGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFHQSxlQUFTLHlCQUF5QixRQUFRO0FBQ3RDLFlBQUksWUFDQSxZQUNBLGFBQ0EsR0FDQSxjQUNBLGtCQUNBLG9CQUFvQixPQUNwQixhQUFhLE9BQU8sR0FBRztBQUUzQixZQUFJLGVBQWUsR0FBRztBQUNsQiwwQkFBZ0IsTUFBTSxFQUFFLGdCQUFnQjtBQUN4QyxpQkFBTyxLQUFLLG9CQUFJLEtBQUssR0FBRztBQUN4QjtBQUFBLFFBQ0o7QUFFQSxhQUFLLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSztBQUM3Qix5QkFBZTtBQUNmLDZCQUFtQjtBQUNuQix1QkFBYSxXQUFXLENBQUMsR0FBRyxNQUFNO0FBQ2xDLGNBQUksT0FBTyxXQUFXLE1BQU07QUFDeEIsdUJBQVcsVUFBVSxPQUFPO0FBQUEsVUFDaEM7QUFDQSxxQkFBVyxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBQzNCLG9DQUEwQixVQUFVO0FBRXBDLGNBQUksUUFBUSxVQUFVLEdBQUc7QUFDckIsK0JBQW1CO0FBQUEsVUFDdkI7QUFHQSwwQkFBZ0IsZ0JBQWdCLFVBQVUsRUFBRTtBQUc1QywwQkFBZ0IsZ0JBQWdCLFVBQVUsRUFBRSxhQUFhLFNBQVM7QUFFbEUsMEJBQWdCLFVBQVUsRUFBRSxRQUFRO0FBRXBDLGNBQUksQ0FBQyxtQkFBbUI7QUFDcEIsZ0JBQ0ksZUFBZSxRQUNmLGVBQWUsZUFDZixrQkFDRjtBQUNFLDRCQUFjO0FBQ2QsMkJBQWE7QUFDYixrQkFBSSxrQkFBa0I7QUFDbEIsb0NBQW9CO0FBQUEsY0FDeEI7QUFBQSxZQUNKO0FBQUEsVUFDSixPQUFPO0FBQ0gsZ0JBQUksZUFBZSxhQUFhO0FBQzVCLDRCQUFjO0FBQ2QsMkJBQWE7QUFBQSxZQUNqQjtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBRUEsZUFBTyxRQUFRLGNBQWMsVUFBVTtBQUFBLE1BQzNDO0FBRUEsZUFBUyxpQkFBaUIsUUFBUTtBQUM5QixZQUFJLE9BQU8sSUFBSTtBQUNYO0FBQUEsUUFDSjtBQUVBLFlBQUksSUFBSSxxQkFBcUIsT0FBTyxFQUFFLEdBQ2xDLFlBQVksRUFBRSxRQUFRLFNBQVksRUFBRSxPQUFPLEVBQUU7QUFDakQsZUFBTyxLQUFLO0FBQUEsVUFDUixDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVc7QUFBQSxVQUN0RSxTQUFVLEtBQUs7QUFDWCxtQkFBTyxPQUFPLFNBQVMsS0FBSyxFQUFFO0FBQUEsVUFDbEM7QUFBQSxRQUNKO0FBRUEsd0JBQWdCLE1BQU07QUFBQSxNQUMxQjtBQUVBLGVBQVMsaUJBQWlCLFFBQVE7QUFDOUIsWUFBSSxNQUFNLElBQUksT0FBTyxjQUFjLGNBQWMsTUFBTSxDQUFDLENBQUM7QUFDekQsWUFBSSxJQUFJLFVBQVU7QUFFZCxjQUFJLElBQUksR0FBRyxHQUFHO0FBQ2QsY0FBSSxXQUFXO0FBQUEsUUFDbkI7QUFFQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsY0FBYyxRQUFRO0FBQzNCLFlBQUksUUFBUSxPQUFPLElBQ2ZkLFVBQVMsT0FBTztBQUVwQixlQUFPLFVBQVUsT0FBTyxXQUFXLFVBQVUsT0FBTyxFQUFFO0FBRXRELFlBQUksVUFBVSxRQUFTQSxZQUFXLFVBQWEsVUFBVSxJQUFLO0FBQzFELGlCQUFPLGNBQWMsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUFBLFFBQzVDO0FBRUEsWUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixpQkFBTyxLQUFLLFFBQVEsT0FBTyxRQUFRLFNBQVMsS0FBSztBQUFBLFFBQ3JEO0FBRUEsWUFBSSxTQUFTLEtBQUssR0FBRztBQUNqQixpQkFBTyxJQUFJLE9BQU8sY0FBYyxLQUFLLENBQUM7QUFBQSxRQUMxQyxXQUFXLE9BQU8sS0FBSyxHQUFHO0FBQ3RCLGlCQUFPLEtBQUs7QUFBQSxRQUNoQixXQUFXLFFBQVFBLE9BQU0sR0FBRztBQUN4QixtQ0FBeUIsTUFBTTtBQUFBLFFBQ25DLFdBQVdBLFNBQVE7QUFDZixvQ0FBMEIsTUFBTTtBQUFBLFFBQ3BDLE9BQU87QUFDSCwwQkFBZ0IsTUFBTTtBQUFBLFFBQzFCO0FBRUEsWUFBSSxDQUFDLFFBQVEsTUFBTSxHQUFHO0FBQ2xCLGlCQUFPLEtBQUs7QUFBQSxRQUNoQjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxnQkFBZ0IsUUFBUTtBQUM3QixZQUFJLFFBQVEsT0FBTztBQUNuQixZQUFJLFlBQVksS0FBSyxHQUFHO0FBQ3BCLGlCQUFPLEtBQUssSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDO0FBQUEsUUFDcEMsV0FBVyxPQUFPLEtBQUssR0FBRztBQUN0QixpQkFBTyxLQUFLLElBQUksS0FBSyxNQUFNLFFBQVEsQ0FBQztBQUFBLFFBQ3hDLFdBQVcsT0FBTyxVQUFVLFVBQVU7QUFDbEMsMkJBQWlCLE1BQU07QUFBQSxRQUMzQixXQUFXLFFBQVEsS0FBSyxHQUFHO0FBQ3ZCLGlCQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQyxHQUFHLFNBQVUsS0FBSztBQUMzQyxtQkFBTyxTQUFTLEtBQUssRUFBRTtBQUFBLFVBQzNCLENBQUM7QUFDRCwwQkFBZ0IsTUFBTTtBQUFBLFFBQzFCLFdBQVcsU0FBUyxLQUFLLEdBQUc7QUFDeEIsMkJBQWlCLE1BQU07QUFBQSxRQUMzQixXQUFXLFNBQVMsS0FBSyxHQUFHO0FBRXhCLGlCQUFPLEtBQUssSUFBSSxLQUFLLEtBQUs7QUFBQSxRQUM5QixPQUFPO0FBQ0gsZ0JBQU0sd0JBQXdCLE1BQU07QUFBQSxRQUN4QztBQUFBLE1BQ0o7QUFFQSxlQUFTLGlCQUFpQixPQUFPQSxTQUFRQyxTQUFRLFFBQVEsT0FBTztBQUM1RCxZQUFJLElBQUksQ0FBQztBQUVULFlBQUlELFlBQVcsUUFBUUEsWUFBVyxPQUFPO0FBQ3JDLG1CQUFTQTtBQUNULFVBQUFBLFVBQVM7QUFBQSxRQUNiO0FBRUEsWUFBSUMsWUFBVyxRQUFRQSxZQUFXLE9BQU87QUFDckMsbUJBQVNBO0FBQ1QsVUFBQUEsVUFBUztBQUFBLFFBQ2I7QUFFQSxZQUNLLFNBQVMsS0FBSyxLQUFLLGNBQWMsS0FBSyxLQUN0QyxRQUFRLEtBQUssS0FBSyxNQUFNLFdBQVcsR0FDdEM7QUFDRSxrQkFBUTtBQUFBLFFBQ1o7QUFHQSxVQUFFLG1CQUFtQjtBQUNyQixVQUFFLFVBQVUsRUFBRSxTQUFTO0FBQ3ZCLFVBQUUsS0FBS0E7QUFDUCxVQUFFLEtBQUs7QUFDUCxVQUFFLEtBQUtEO0FBQ1AsVUFBRSxVQUFVO0FBRVosZUFBTyxpQkFBaUIsQ0FBQztBQUFBLE1BQzdCO0FBRUEsZUFBUyxZQUFZLE9BQU9BLFNBQVFDLFNBQVEsUUFBUTtBQUNoRCxlQUFPLGlCQUFpQixPQUFPRCxTQUFRQyxTQUFRLFFBQVEsS0FBSztBQUFBLE1BQ2hFO0FBRUEsVUFBSSxlQUFlO0FBQUEsUUFDWDtBQUFBLFFBQ0EsV0FBWTtBQUNSLGNBQUksUUFBUSxZQUFZLE1BQU0sTUFBTSxTQUFTO0FBQzdDLGNBQUksS0FBSyxRQUFRLEtBQUssTUFBTSxRQUFRLEdBQUc7QUFDbkMsbUJBQU8sUUFBUSxPQUFPLE9BQU87QUFBQSxVQUNqQyxPQUFPO0FBQ0gsbUJBQU8sY0FBYztBQUFBLFVBQ3pCO0FBQUEsUUFDSjtBQUFBLE1BQ0osR0FDQSxlQUFlO0FBQUEsUUFDWDtBQUFBLFFBQ0EsV0FBWTtBQUNSLGNBQUksUUFBUSxZQUFZLE1BQU0sTUFBTSxTQUFTO0FBQzdDLGNBQUksS0FBSyxRQUFRLEtBQUssTUFBTSxRQUFRLEdBQUc7QUFDbkMsbUJBQU8sUUFBUSxPQUFPLE9BQU87QUFBQSxVQUNqQyxPQUFPO0FBQ0gsbUJBQU8sY0FBYztBQUFBLFVBQ3pCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFPSixlQUFTLE9BQU8sSUFBSSxTQUFTO0FBQ3pCLFlBQUksS0FBSztBQUNULFlBQUksUUFBUSxXQUFXLEtBQUssUUFBUSxRQUFRLENBQUMsQ0FBQyxHQUFHO0FBQzdDLG9CQUFVLFFBQVEsQ0FBQztBQUFBLFFBQ3ZCO0FBQ0EsWUFBSSxDQUFDLFFBQVEsUUFBUTtBQUNqQixpQkFBTyxZQUFZO0FBQUEsUUFDdkI7QUFDQSxjQUFNLFFBQVEsQ0FBQztBQUNmLGFBQUssSUFBSSxHQUFHLElBQUksUUFBUSxRQUFRLEVBQUUsR0FBRztBQUNqQyxjQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUc7QUFDOUMsa0JBQU0sUUFBUSxDQUFDO0FBQUEsVUFDbkI7QUFBQSxRQUNKO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFHQSxlQUFTLE1BQU07QUFDWCxZQUFJLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFFckMsZUFBTyxPQUFPLFlBQVksSUFBSTtBQUFBLE1BQ2xDO0FBRUEsZUFBUyxNQUFNO0FBQ1gsWUFBSSxPQUFPLENBQUMsRUFBRSxNQUFNLEtBQUssV0FBVyxDQUFDO0FBRXJDLGVBQU8sT0FBTyxXQUFXLElBQUk7QUFBQSxNQUNqQztBQUVBLFVBQUksTUFBTSxXQUFZO0FBQ2xCLGVBQU8sS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsb0JBQUksS0FBSztBQUFBLE1BQzdDO0FBRUEsVUFBSSxXQUFXO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUVBLGVBQVMsZ0JBQWdCLEdBQUc7QUFDeEIsWUFBSSxLQUNBLGlCQUFpQixPQUNqQixHQUNBLFdBQVcsU0FBUztBQUN4QixhQUFLLE9BQU8sR0FBRztBQUNYLGNBQ0ksV0FBVyxHQUFHLEdBQUcsS0FDakIsRUFDSSxRQUFRLEtBQUssVUFBVSxHQUFHLE1BQU0sT0FDL0IsRUFBRSxHQUFHLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FFdEM7QUFDRSxtQkFBTztBQUFBLFVBQ1g7QUFBQSxRQUNKO0FBRUEsYUFBSyxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUUsR0FBRztBQUMzQixjQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRztBQUNoQixnQkFBSSxnQkFBZ0I7QUFDaEIscUJBQU87QUFBQSxZQUNYO0FBQ0EsZ0JBQUksV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHO0FBQ3RELCtCQUFpQjtBQUFBLFlBQ3JCO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFFQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsWUFBWTtBQUNqQixlQUFPLEtBQUs7QUFBQSxNQUNoQjtBQUVBLGVBQVMsa0JBQWtCO0FBQ3ZCLGVBQU8sZUFBZSxHQUFHO0FBQUEsTUFDN0I7QUFFQSxlQUFTLFNBQVMsVUFBVTtBQUN4QixZQUFJLGtCQUFrQixxQkFBcUIsUUFBUSxHQUMvQ2MsU0FBUSxnQkFBZ0IsUUFBUSxHQUNoQyxXQUFXLGdCQUFnQixXQUFXLEdBQ3RDQyxVQUFTLGdCQUFnQixTQUFTLEdBQ2xDQyxTQUFRLGdCQUFnQixRQUFRLGdCQUFnQixXQUFXLEdBQzNEQyxRQUFPLGdCQUFnQixPQUFPLEdBQzlCUCxTQUFRLGdCQUFnQixRQUFRLEdBQ2hDQyxXQUFVLGdCQUFnQixVQUFVLEdBQ3BDTyxXQUFVLGdCQUFnQixVQUFVLEdBQ3BDQyxnQkFBZSxnQkFBZ0IsZUFBZTtBQUVsRCxhQUFLLFdBQVcsZ0JBQWdCLGVBQWU7QUFHL0MsYUFBSyxnQkFDRCxDQUFDQSxnQkFDREQsV0FBVTtBQUFBLFFBQ1ZQLFdBQVU7QUFBQSxRQUNWRCxTQUFRLE1BQU8sS0FBSztBQUd4QixhQUFLLFFBQVEsQ0FBQ08sUUFBT0QsU0FBUTtBQUk3QixhQUFLLFVBQVUsQ0FBQ0QsVUFBUyxXQUFXLElBQUlELFNBQVE7QUFFaEQsYUFBSyxRQUFRLENBQUM7QUFFZCxhQUFLLFVBQVUsVUFBVTtBQUV6QixhQUFLLFFBQVE7QUFBQSxNQUNqQjtBQUVBLGVBQVMsV0FBVyxLQUFLO0FBQ3JCLGVBQU8sZUFBZTtBQUFBLE1BQzFCO0FBRUEsZUFBUyxTQUFTLFFBQVE7QUFDdEIsWUFBSSxTQUFTLEdBQUc7QUFDWixpQkFBTyxLQUFLLE1BQU0sS0FBSyxNQUFNLElBQUk7QUFBQSxRQUNyQyxPQUFPO0FBQ0gsaUJBQU8sS0FBSyxNQUFNLE1BQU07QUFBQSxRQUM1QjtBQUFBLE1BQ0o7QUFHQSxlQUFTLGNBQWMsUUFBUSxRQUFRLGFBQWE7QUFDaEQsWUFBSSxNQUFNLEtBQUssSUFBSSxPQUFPLFFBQVEsT0FBTyxNQUFNLEdBQzNDLGFBQWEsS0FBSyxJQUFJLE9BQU8sU0FBUyxPQUFPLE1BQU0sR0FDbkQsUUFBUSxHQUNSO0FBQ0osYUFBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDdEIsY0FDSyxlQUFlLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxLQUNyQyxDQUFDLGVBQWUsTUFBTSxPQUFPLENBQUMsQ0FBQyxNQUFNLE1BQU0sT0FBTyxDQUFDLENBQUMsR0FDdkQ7QUFDRTtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQ0EsZUFBTyxRQUFRO0FBQUEsTUFDbkI7QUFJQSxlQUFTLE9BQU9ULFFBQU8sV0FBVztBQUM5Qix1QkFBZUEsUUFBTyxHQUFHLEdBQUcsV0FBWTtBQUNwQyxjQUFJZSxVQUFTLEtBQUssVUFBVSxHQUN4QmhCLFFBQU87QUFDWCxjQUFJZ0IsVUFBUyxHQUFHO0FBQ1osWUFBQUEsVUFBUyxDQUFDQTtBQUNWLFlBQUFoQixRQUFPO0FBQUEsVUFDWDtBQUNBLGlCQUNJQSxRQUNBLFNBQVMsQ0FBQyxFQUFFZ0IsVUFBUyxLQUFLLENBQUMsSUFDM0IsWUFDQSxTQUFTLENBQUMsQ0FBQ0EsVUFBUyxJQUFJLENBQUM7QUFBQSxRQUVqQyxDQUFDO0FBQUEsTUFDTDtBQUVBLGFBQU8sS0FBSyxHQUFHO0FBQ2YsYUFBTyxNQUFNLEVBQUU7QUFJZixvQkFBYyxLQUFLLGdCQUFnQjtBQUNuQyxvQkFBYyxNQUFNLGdCQUFnQjtBQUNwQyxvQkFBYyxDQUFDLEtBQUssSUFBSSxHQUFHLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDdkQsZUFBTyxVQUFVO0FBQ2pCLGVBQU8sT0FBTyxpQkFBaUIsa0JBQWtCLEtBQUs7QUFBQSxNQUMxRCxDQUFDO0FBT0QsVUFBSSxjQUFjO0FBRWxCLGVBQVMsaUJBQWlCLFNBQVMsUUFBUTtBQUN2QyxZQUFJLFdBQVcsVUFBVSxJQUFJLE1BQU0sT0FBTyxHQUN0QyxPQUNBLE9BQ0FUO0FBRUosWUFBSSxZQUFZLE1BQU07QUFDbEIsaUJBQU87QUFBQSxRQUNYO0FBRUEsZ0JBQVEsUUFBUSxRQUFRLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDeEMsaUJBQVMsUUFBUSxJQUFJLE1BQU0sV0FBVyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDckQsUUFBQUEsV0FBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sTUFBTSxNQUFNLENBQUMsQ0FBQztBQUUzQyxlQUFPQSxhQUFZLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxNQUFNQSxXQUFVLENBQUNBO0FBQUEsTUFDN0Q7QUFHQSxlQUFTLGdCQUFnQixPQUFPLE9BQU87QUFDbkMsWUFBSSxLQUFLSDtBQUNULFlBQUksTUFBTSxRQUFRO0FBQ2QsZ0JBQU0sTUFBTSxNQUFNO0FBQ2xCLFVBQUFBLFNBQ0ssU0FBUyxLQUFLLEtBQUssT0FBTyxLQUFLLElBQzFCLE1BQU0sUUFBUSxJQUNkLFlBQVksS0FBSyxFQUFFLFFBQVEsS0FBSyxJQUFJLFFBQVE7QUFFdEQsY0FBSSxHQUFHLFFBQVEsSUFBSSxHQUFHLFFBQVEsSUFBSUEsS0FBSTtBQUN0QyxnQkFBTSxhQUFhLEtBQUssS0FBSztBQUM3QixpQkFBTztBQUFBLFFBQ1gsT0FBTztBQUNILGlCQUFPLFlBQVksS0FBSyxFQUFFLE1BQU07QUFBQSxRQUNwQztBQUFBLE1BQ0o7QUFFQSxlQUFTLGNBQWMsR0FBRztBQUd0QixlQUFPLENBQUMsS0FBSyxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQztBQUFBLE1BQy9DO0FBTUEsWUFBTSxlQUFlLFdBQVk7QUFBQSxNQUFDO0FBY2xDLGVBQVMsYUFBYSxPQUFPLGVBQWUsYUFBYTtBQUNyRCxZQUFJWSxVQUFTLEtBQUssV0FBVyxHQUN6QjtBQUNKLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTyxTQUFTLE9BQU8sT0FBTztBQUFBLFFBQ2xDO0FBQ0EsWUFBSSxTQUFTLE1BQU07QUFDZixjQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzNCLG9CQUFRLGlCQUFpQixrQkFBa0IsS0FBSztBQUNoRCxnQkFBSSxVQUFVLE1BQU07QUFDaEIscUJBQU87QUFBQSxZQUNYO0FBQUEsVUFDSixXQUFXLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLGFBQWE7QUFDN0Msb0JBQVEsUUFBUTtBQUFBLFVBQ3BCO0FBQ0EsY0FBSSxDQUFDLEtBQUssVUFBVSxlQUFlO0FBQy9CLDBCQUFjLGNBQWMsSUFBSTtBQUFBLFVBQ3BDO0FBQ0EsZUFBSyxVQUFVO0FBQ2YsZUFBSyxTQUFTO0FBQ2QsY0FBSSxlQUFlLE1BQU07QUFDckIsaUJBQUssSUFBSSxhQUFhLEdBQUc7QUFBQSxVQUM3QjtBQUNBLGNBQUlBLFlBQVcsT0FBTztBQUNsQixnQkFBSSxDQUFDLGlCQUFpQixLQUFLLG1CQUFtQjtBQUMxQztBQUFBLGdCQUNJO0FBQUEsZ0JBQ0EsZUFBZSxRQUFRQSxTQUFRLEdBQUc7QUFBQSxnQkFDbEM7QUFBQSxnQkFDQTtBQUFBLGNBQ0o7QUFBQSxZQUNKLFdBQVcsQ0FBQyxLQUFLLG1CQUFtQjtBQUNoQyxtQkFBSyxvQkFBb0I7QUFDekIsb0JBQU0sYUFBYSxNQUFNLElBQUk7QUFDN0IsbUJBQUssb0JBQW9CO0FBQUEsWUFDN0I7QUFBQSxVQUNKO0FBQ0EsaUJBQU87QUFBQSxRQUNYLE9BQU87QUFDSCxpQkFBTyxLQUFLLFNBQVNBLFVBQVMsY0FBYyxJQUFJO0FBQUEsUUFDcEQ7QUFBQSxNQUNKO0FBRUEsZUFBUyxXQUFXLE9BQU8sZUFBZTtBQUN0QyxZQUFJLFNBQVMsTUFBTTtBQUNmLGNBQUksT0FBTyxVQUFVLFVBQVU7QUFDM0Isb0JBQVEsQ0FBQztBQUFBLFVBQ2I7QUFFQSxlQUFLLFVBQVUsT0FBTyxhQUFhO0FBRW5DLGlCQUFPO0FBQUEsUUFDWCxPQUFPO0FBQ0gsaUJBQU8sQ0FBQyxLQUFLLFVBQVU7QUFBQSxRQUMzQjtBQUFBLE1BQ0o7QUFFQSxlQUFTLGVBQWUsZUFBZTtBQUNuQyxlQUFPLEtBQUssVUFBVSxHQUFHLGFBQWE7QUFBQSxNQUMxQztBQUVBLGVBQVMsaUJBQWlCLGVBQWU7QUFDckMsWUFBSSxLQUFLLFFBQVE7QUFDYixlQUFLLFVBQVUsR0FBRyxhQUFhO0FBQy9CLGVBQUssU0FBUztBQUVkLGNBQUksZUFBZTtBQUNmLGlCQUFLLFNBQVMsY0FBYyxJQUFJLEdBQUcsR0FBRztBQUFBLFVBQzFDO0FBQUEsUUFDSjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUywwQkFBMEI7QUFDL0IsWUFBSSxLQUFLLFFBQVEsTUFBTTtBQUNuQixlQUFLLFVBQVUsS0FBSyxNQUFNLE9BQU8sSUFBSTtBQUFBLFFBQ3pDLFdBQVcsT0FBTyxLQUFLLE9BQU8sVUFBVTtBQUNwQyxjQUFJLFFBQVEsaUJBQWlCLGFBQWEsS0FBSyxFQUFFO0FBQ2pELGNBQUksU0FBUyxNQUFNO0FBQ2YsaUJBQUssVUFBVSxLQUFLO0FBQUEsVUFDeEIsT0FBTztBQUNILGlCQUFLLFVBQVUsR0FBRyxJQUFJO0FBQUEsVUFDMUI7QUFBQSxRQUNKO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLHFCQUFxQixPQUFPO0FBQ2pDLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTztBQUFBLFFBQ1g7QUFDQSxnQkFBUSxRQUFRLFlBQVksS0FBSyxFQUFFLFVBQVUsSUFBSTtBQUVqRCxnQkFBUSxLQUFLLFVBQVUsSUFBSSxTQUFTLE9BQU87QUFBQSxNQUMvQztBQUVBLGVBQVMsdUJBQXVCO0FBQzVCLGVBQ0ksS0FBSyxVQUFVLElBQUksS0FBSyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBVSxLQUNuRCxLQUFLLFVBQVUsSUFBSSxLQUFLLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFVO0FBQUEsTUFFM0Q7QUFFQSxlQUFTLDhCQUE4QjtBQUNuQyxZQUFJLENBQUMsWUFBWSxLQUFLLGFBQWEsR0FBRztBQUNsQyxpQkFBTyxLQUFLO0FBQUEsUUFDaEI7QUFFQSxZQUFJLElBQUksQ0FBQyxHQUNMO0FBRUosbUJBQVcsR0FBRyxJQUFJO0FBQ2xCLFlBQUksY0FBYyxDQUFDO0FBRW5CLFlBQUksRUFBRSxJQUFJO0FBQ04sa0JBQVEsRUFBRSxTQUFTLFVBQVUsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLEVBQUU7QUFDckQsZUFBSyxnQkFDRCxLQUFLLFFBQVEsS0FBSyxjQUFjLEVBQUUsSUFBSSxNQUFNLFFBQVEsQ0FBQyxJQUFJO0FBQUEsUUFDakUsT0FBTztBQUNILGVBQUssZ0JBQWdCO0FBQUEsUUFDekI7QUFFQSxlQUFPLEtBQUs7QUFBQSxNQUNoQjtBQUVBLGVBQVMsVUFBVTtBQUNmLGVBQU8sS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLFNBQVM7QUFBQSxNQUMzQztBQUVBLGVBQVMsY0FBYztBQUNuQixlQUFPLEtBQUssUUFBUSxJQUFJLEtBQUssU0FBUztBQUFBLE1BQzFDO0FBRUEsZUFBUyxRQUFRO0FBQ2IsZUFBTyxLQUFLLFFBQVEsSUFBSSxLQUFLLFVBQVUsS0FBSyxZQUFZLElBQUk7QUFBQSxNQUNoRTtBQUdBLFVBQUksY0FBYyx5REFJZCxXQUNJO0FBRVIsZUFBUyxlQUFlLE9BQU8sS0FBSztBQUNoQyxZQUFJLFdBQVcsT0FFWCxRQUFRLE1BQ1JoQixPQUNBLEtBQ0E7QUFFSixZQUFJLFdBQVcsS0FBSyxHQUFHO0FBQ25CLHFCQUFXO0FBQUEsWUFDUCxJQUFJLE1BQU07QUFBQSxZQUNWLEdBQUcsTUFBTTtBQUFBLFlBQ1QsR0FBRyxNQUFNO0FBQUEsVUFDYjtBQUFBLFFBQ0osV0FBVyxTQUFTLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUc7QUFDMUMscUJBQVcsQ0FBQztBQUNaLGNBQUksS0FBSztBQUNMLHFCQUFTLEdBQUcsSUFBSSxDQUFDO0FBQUEsVUFDckIsT0FBTztBQUNILHFCQUFTLGVBQWUsQ0FBQztBQUFBLFVBQzdCO0FBQUEsUUFDSixXQUFZLFFBQVEsWUFBWSxLQUFLLEtBQUssR0FBSTtBQUMxQyxVQUFBQSxRQUFPLE1BQU0sQ0FBQyxNQUFNLE1BQU0sS0FBSztBQUMvQixxQkFBVztBQUFBLFlBQ1AsR0FBRztBQUFBLFlBQ0gsR0FBRyxNQUFNLE1BQU0sSUFBSSxDQUFDLElBQUlBO0FBQUEsWUFDeEIsR0FBRyxNQUFNLE1BQU0sSUFBSSxDQUFDLElBQUlBO0FBQUEsWUFDeEIsR0FBRyxNQUFNLE1BQU0sTUFBTSxDQUFDLElBQUlBO0FBQUEsWUFDMUIsR0FBRyxNQUFNLE1BQU0sTUFBTSxDQUFDLElBQUlBO0FBQUEsWUFDMUIsSUFBSSxNQUFNLFNBQVMsTUFBTSxXQUFXLElBQUksR0FBSSxDQUFDLElBQUlBO0FBQUE7QUFBQSxVQUNyRDtBQUFBLFFBQ0osV0FBWSxRQUFRLFNBQVMsS0FBSyxLQUFLLEdBQUk7QUFDdkMsVUFBQUEsUUFBTyxNQUFNLENBQUMsTUFBTSxNQUFNLEtBQUs7QUFDL0IscUJBQVc7QUFBQSxZQUNQLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFlBQzFCLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBR0EsS0FBSTtBQUFBLFVBQzlCO0FBQUEsUUFDSixXQUFXLFlBQVksTUFBTTtBQUV6QixxQkFBVyxDQUFDO0FBQUEsUUFDaEIsV0FDSSxPQUFPLGFBQWEsYUFDbkIsVUFBVSxZQUFZLFFBQVEsV0FDakM7QUFDRSxvQkFBVTtBQUFBLFlBQ04sWUFBWSxTQUFTLElBQUk7QUFBQSxZQUN6QixZQUFZLFNBQVMsRUFBRTtBQUFBLFVBQzNCO0FBRUEscUJBQVcsQ0FBQztBQUNaLG1CQUFTLEtBQUssUUFBUTtBQUN0QixtQkFBUyxJQUFJLFFBQVE7QUFBQSxRQUN6QjtBQUVBLGNBQU0sSUFBSSxTQUFTLFFBQVE7QUFFM0IsWUFBSSxXQUFXLEtBQUssS0FBSyxXQUFXLE9BQU8sU0FBUyxHQUFHO0FBQ25ELGNBQUksVUFBVSxNQUFNO0FBQUEsUUFDeEI7QUFFQSxZQUFJLFdBQVcsS0FBSyxLQUFLLFdBQVcsT0FBTyxVQUFVLEdBQUc7QUFDcEQsY0FBSSxXQUFXLE1BQU07QUFBQSxRQUN6QjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEscUJBQWUsS0FBSyxTQUFTO0FBQzdCLHFCQUFlLFVBQVU7QUFFekIsZUFBUyxTQUFTLEtBQUtBLE9BQU07QUFJekIsWUFBSSxNQUFNLE9BQU8sV0FBVyxJQUFJLFFBQVEsS0FBSyxHQUFHLENBQUM7QUFFakQsZ0JBQVEsTUFBTSxHQUFHLElBQUksSUFBSSxPQUFPQTtBQUFBLE1BQ3BDO0FBRUEsZUFBUywwQkFBMEIsTUFBTSxPQUFPO0FBQzVDLFlBQUksTUFBTSxDQUFDO0FBRVgsWUFBSSxTQUNBLE1BQU0sTUFBTSxJQUFJLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQ2xFLFlBQUksS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLFFBQVEsR0FBRyxFQUFFLFFBQVEsS0FBSyxHQUFHO0FBQ2xELFlBQUUsSUFBSTtBQUFBLFFBQ1Y7QUFFQSxZQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLFFBQVEsR0FBRztBQUU3RCxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsa0JBQWtCLE1BQU0sT0FBTztBQUNwQyxZQUFJO0FBQ0osWUFBSSxFQUFFLEtBQUssUUFBUSxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ3RDLGlCQUFPLEVBQUUsY0FBYyxHQUFHLFFBQVEsRUFBRTtBQUFBLFFBQ3hDO0FBRUEsZ0JBQVEsZ0JBQWdCLE9BQU8sSUFBSTtBQUNuQyxZQUFJLEtBQUssU0FBUyxLQUFLLEdBQUc7QUFDdEIsZ0JBQU0sMEJBQTBCLE1BQU0sS0FBSztBQUFBLFFBQy9DLE9BQU87QUFDSCxnQkFBTSwwQkFBMEIsT0FBTyxJQUFJO0FBQzNDLGNBQUksZUFBZSxDQUFDLElBQUk7QUFDeEIsY0FBSSxTQUFTLENBQUMsSUFBSTtBQUFBLFFBQ3RCO0FBRUEsZUFBTztBQUFBLE1BQ1g7QUFHQSxlQUFTLFlBQVksV0FBVyxNQUFNO0FBQ2xDLGVBQU8sU0FBVSxLQUFLLFFBQVE7QUFDMUIsY0FBSSxLQUFLO0FBRVQsY0FBSSxXQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHO0FBQ3BDO0FBQUEsY0FDSTtBQUFBLGNBQ0EsY0FDSSxPQUNBLHlEQUNBLE9BQ0E7QUFBQSxZQUVSO0FBQ0Esa0JBQU07QUFDTixrQkFBTTtBQUNOLHFCQUFTO0FBQUEsVUFDYjtBQUVBLGdCQUFNLGVBQWUsS0FBSyxNQUFNO0FBQ2hDLHNCQUFZLE1BQU0sS0FBSyxTQUFTO0FBQ2hDLGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFFQSxlQUFTLFlBQVksS0FBSyxVQUFVLFVBQVUsY0FBYztBQUN4RCxZQUFJZSxnQkFBZSxTQUFTLGVBQ3hCRixRQUFPLFNBQVMsU0FBUyxLQUFLLEdBQzlCRixVQUFTLFNBQVMsU0FBUyxPQUFPO0FBRXRDLFlBQUksQ0FBQyxJQUFJLFFBQVEsR0FBRztBQUVoQjtBQUFBLFFBQ0o7QUFFQSx1QkFBZSxnQkFBZ0IsT0FBTyxPQUFPO0FBRTdDLFlBQUlBLFNBQVE7QUFDUixtQkFBUyxLQUFLLElBQUksS0FBSyxPQUFPLElBQUlBLFVBQVMsUUFBUTtBQUFBLFFBQ3ZEO0FBQ0EsWUFBSUUsT0FBTTtBQUNOLGdCQUFNLEtBQUssUUFBUSxJQUFJLEtBQUssTUFBTSxJQUFJQSxRQUFPLFFBQVE7QUFBQSxRQUN6RDtBQUNBLFlBQUlFLGVBQWM7QUFDZCxjQUFJLEdBQUcsUUFBUSxJQUFJLEdBQUcsUUFBUSxJQUFJQSxnQkFBZSxRQUFRO0FBQUEsUUFDN0Q7QUFDQSxZQUFJLGNBQWM7QUFDZCxnQkFBTSxhQUFhLEtBQUtGLFNBQVFGLE9BQU07QUFBQSxRQUMxQztBQUFBLE1BQ0o7QUFFQSxVQUFJLE1BQU0sWUFBWSxHQUFHLEtBQUssR0FDMUIsV0FBVyxZQUFZLElBQUksVUFBVTtBQUV6QyxlQUFTLFNBQVMsT0FBTztBQUNyQixlQUFPLE9BQU8sVUFBVSxZQUFZLGlCQUFpQjtBQUFBLE1BQ3pEO0FBR0EsZUFBUyxjQUFjLE9BQU87QUFDMUIsZUFDSSxTQUFTLEtBQUssS0FDZCxPQUFPLEtBQUssS0FDWixTQUFTLEtBQUssS0FDZCxTQUFTLEtBQUssS0FDZCxzQkFBc0IsS0FBSyxLQUMzQixvQkFBb0IsS0FBSyxLQUN6QixVQUFVLFFBQ1YsVUFBVTtBQUFBLE1BRWxCO0FBRUEsZUFBUyxvQkFBb0IsT0FBTztBQUNoQyxZQUFJLGFBQWEsU0FBUyxLQUFLLEtBQUssQ0FBQyxjQUFjLEtBQUssR0FDcEQsZUFBZSxPQUNmLGFBQWE7QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNKLEdBQ0EsR0FDQSxVQUNBLGNBQWMsV0FBVztBQUU3QixhQUFLLElBQUksR0FBRyxJQUFJLGFBQWEsS0FBSyxHQUFHO0FBQ2pDLHFCQUFXLFdBQVcsQ0FBQztBQUN2Qix5QkFBZSxnQkFBZ0IsV0FBVyxPQUFPLFFBQVE7QUFBQSxRQUM3RDtBQUVBLGVBQU8sY0FBYztBQUFBLE1BQ3pCO0FBRUEsZUFBUyxzQkFBc0IsT0FBTztBQUNsQyxZQUFJLFlBQVksUUFBUSxLQUFLLEdBQ3pCLGVBQWU7QUFDbkIsWUFBSSxXQUFXO0FBQ1gseUJBQ0ksTUFBTSxPQUFPLFNBQVUsTUFBTTtBQUN6QixtQkFBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLFNBQVMsS0FBSztBQUFBLFVBQzVDLENBQUMsRUFBRSxXQUFXO0FBQUEsUUFDdEI7QUFDQSxlQUFPLGFBQWE7QUFBQSxNQUN4QjtBQUVBLGVBQVMsZUFBZSxPQUFPO0FBQzNCLFlBQUksYUFBYSxTQUFTLEtBQUssS0FBSyxDQUFDLGNBQWMsS0FBSyxHQUNwRCxlQUFlLE9BQ2YsYUFBYTtBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0osR0FDQSxHQUNBO0FBRUosYUFBSyxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsS0FBSyxHQUFHO0FBQ3ZDLHFCQUFXLFdBQVcsQ0FBQztBQUN2Qix5QkFBZSxnQkFBZ0IsV0FBVyxPQUFPLFFBQVE7QUFBQSxRQUM3RDtBQUVBLGVBQU8sY0FBYztBQUFBLE1BQ3pCO0FBRUEsZUFBUyxrQkFBa0IsVUFBVVosTUFBSztBQUN0QyxZQUFJSyxRQUFPLFNBQVMsS0FBS0wsTUFBSyxRQUFRLElBQUk7QUFDMUMsZUFBT0ssUUFBTyxLQUNSLGFBQ0FBLFFBQU8sS0FDTCxhQUNBQSxRQUFPLElBQ0wsWUFDQUEsUUFBTyxJQUNMLFlBQ0FBLFFBQU8sSUFDTCxZQUNBQSxRQUFPLElBQ0wsYUFDQTtBQUFBLE1BQ3BCO0FBRUEsZUFBUyxXQUFXLE1BQU0sU0FBUztBQUUvQixZQUFJLFVBQVUsV0FBVyxHQUFHO0FBQ3hCLGNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztBQUNmLG1CQUFPO0FBQ1Asc0JBQVU7QUFBQSxVQUNkLFdBQVcsY0FBYyxVQUFVLENBQUMsQ0FBQyxHQUFHO0FBQ3BDLG1CQUFPLFVBQVUsQ0FBQztBQUNsQixzQkFBVTtBQUFBLFVBQ2QsV0FBVyxlQUFlLFVBQVUsQ0FBQyxDQUFDLEdBQUc7QUFDckMsc0JBQVUsVUFBVSxDQUFDO0FBQ3JCLG1CQUFPO0FBQUEsVUFDWDtBQUFBLFFBQ0o7QUFHQSxZQUFJTCxPQUFNLFFBQVEsWUFBWSxHQUMxQixNQUFNLGdCQUFnQkEsTUFBSyxJQUFJLEVBQUUsUUFBUSxLQUFLLEdBQzlDSixVQUFTLE1BQU0sZUFBZSxNQUFNLEdBQUcsS0FBSyxZQUM1QyxTQUNJLFlBQ0MsV0FBVyxRQUFRQSxPQUFNLENBQUMsSUFDckIsUUFBUUEsT0FBTSxFQUFFLEtBQUssTUFBTUksSUFBRyxJQUM5QixRQUFRSixPQUFNO0FBRTVCLGVBQU8sS0FBSztBQUFBLFVBQ1IsVUFBVSxLQUFLLFdBQVcsRUFBRSxTQUFTQSxTQUFRLE1BQU0sWUFBWUksSUFBRyxDQUFDO0FBQUEsUUFDdkU7QUFBQSxNQUNKO0FBRUEsZUFBUyxRQUFRO0FBQ2IsZUFBTyxJQUFJLE9BQU8sSUFBSTtBQUFBLE1BQzFCO0FBRUEsZUFBUyxRQUFRLE9BQU8sT0FBTztBQUMzQixZQUFJLGFBQWEsU0FBUyxLQUFLLElBQUksUUFBUSxZQUFZLEtBQUs7QUFDNUQsWUFBSSxFQUFFLEtBQUssUUFBUSxLQUFLLFdBQVcsUUFBUSxJQUFJO0FBQzNDLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGdCQUFRLGVBQWUsS0FBSyxLQUFLO0FBQ2pDLFlBQUksVUFBVSxlQUFlO0FBQ3pCLGlCQUFPLEtBQUssUUFBUSxJQUFJLFdBQVcsUUFBUTtBQUFBLFFBQy9DLE9BQU87QUFDSCxpQkFBTyxXQUFXLFFBQVEsSUFBSSxLQUFLLE1BQU0sRUFBRSxRQUFRLEtBQUssRUFBRSxRQUFRO0FBQUEsUUFDdEU7QUFBQSxNQUNKO0FBRUEsZUFBUyxTQUFTLE9BQU8sT0FBTztBQUM1QixZQUFJLGFBQWEsU0FBUyxLQUFLLElBQUksUUFBUSxZQUFZLEtBQUs7QUFDNUQsWUFBSSxFQUFFLEtBQUssUUFBUSxLQUFLLFdBQVcsUUFBUSxJQUFJO0FBQzNDLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGdCQUFRLGVBQWUsS0FBSyxLQUFLO0FBQ2pDLFlBQUksVUFBVSxlQUFlO0FBQ3pCLGlCQUFPLEtBQUssUUFBUSxJQUFJLFdBQVcsUUFBUTtBQUFBLFFBQy9DLE9BQU87QUFDSCxpQkFBTyxLQUFLLE1BQU0sRUFBRSxNQUFNLEtBQUssRUFBRSxRQUFRLElBQUksV0FBVyxRQUFRO0FBQUEsUUFDcEU7QUFBQSxNQUNKO0FBRUEsZUFBUyxVQUFVRCxPQUFNRCxLQUFJLE9BQU8sYUFBYTtBQUM3QyxZQUFJLFlBQVksU0FBU0MsS0FBSSxJQUFJQSxRQUFPLFlBQVlBLEtBQUksR0FDcEQsVUFBVSxTQUFTRCxHQUFFLElBQUlBLE1BQUssWUFBWUEsR0FBRTtBQUNoRCxZQUFJLEVBQUUsS0FBSyxRQUFRLEtBQUssVUFBVSxRQUFRLEtBQUssUUFBUSxRQUFRLElBQUk7QUFDL0QsaUJBQU87QUFBQSxRQUNYO0FBQ0Esc0JBQWMsZUFBZTtBQUM3QixnQkFDSyxZQUFZLENBQUMsTUFBTSxNQUNkLEtBQUssUUFBUSxXQUFXLEtBQUssSUFDN0IsQ0FBQyxLQUFLLFNBQVMsV0FBVyxLQUFLLE9BQ3BDLFlBQVksQ0FBQyxNQUFNLE1BQ2QsS0FBSyxTQUFTLFNBQVMsS0FBSyxJQUM1QixDQUFDLEtBQUssUUFBUSxTQUFTLEtBQUs7QUFBQSxNQUUxQztBQUVBLGVBQVMsT0FBTyxPQUFPLE9BQU87QUFDMUIsWUFBSSxhQUFhLFNBQVMsS0FBSyxJQUFJLFFBQVEsWUFBWSxLQUFLLEdBQ3hEO0FBQ0osWUFBSSxFQUFFLEtBQUssUUFBUSxLQUFLLFdBQVcsUUFBUSxJQUFJO0FBQzNDLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGdCQUFRLGVBQWUsS0FBSyxLQUFLO0FBQ2pDLFlBQUksVUFBVSxlQUFlO0FBQ3pCLGlCQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsUUFBUTtBQUFBLFFBQ2pELE9BQU87QUFDSCxvQkFBVSxXQUFXLFFBQVE7QUFDN0IsaUJBQ0ksS0FBSyxNQUFNLEVBQUUsUUFBUSxLQUFLLEVBQUUsUUFBUSxLQUFLLFdBQ3pDLFdBQVcsS0FBSyxNQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsUUFBUTtBQUFBLFFBRXJEO0FBQUEsTUFDSjtBQUVBLGVBQVNvQixlQUFjLE9BQU8sT0FBTztBQUNqQyxlQUFPLEtBQUssT0FBTyxPQUFPLEtBQUssS0FBSyxLQUFLLFFBQVEsT0FBTyxLQUFLO0FBQUEsTUFDakU7QUFFQSxlQUFTQyxnQkFBZSxPQUFPLE9BQU87QUFDbEMsZUFBTyxLQUFLLE9BQU8sT0FBTyxLQUFLLEtBQUssS0FBSyxTQUFTLE9BQU8sS0FBSztBQUFBLE1BQ2xFO0FBRUEsZUFBUyxLQUFLLE9BQU8sT0FBTyxTQUFTO0FBQ2pDLFlBQUksTUFBTSxXQUFXO0FBRXJCLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTztBQUFBLFFBQ1g7QUFFQSxlQUFPLGdCQUFnQixPQUFPLElBQUk7QUFFbEMsWUFBSSxDQUFDLEtBQUssUUFBUSxHQUFHO0FBQ2pCLGlCQUFPO0FBQUEsUUFDWDtBQUVBLHFCQUFhLEtBQUssVUFBVSxJQUFJLEtBQUssVUFBVSxLQUFLO0FBRXBELGdCQUFRLGVBQWUsS0FBSztBQUU1QixnQkFBUSxPQUFPO0FBQUEsVUFDWCxLQUFLO0FBQ0QscUJBQVMsVUFBVSxNQUFNLElBQUksSUFBSTtBQUNqQztBQUFBLFVBQ0osS0FBSztBQUNELHFCQUFTLFVBQVUsTUFBTSxJQUFJO0FBQzdCO0FBQUEsVUFDSixLQUFLO0FBQ0QscUJBQVMsVUFBVSxNQUFNLElBQUksSUFBSTtBQUNqQztBQUFBLFVBQ0osS0FBSztBQUNELHNCQUFVLE9BQU8sUUFBUTtBQUN6QjtBQUFBO0FBQUEsVUFDSixLQUFLO0FBQ0Qsc0JBQVUsT0FBTyxRQUFRO0FBQ3pCO0FBQUE7QUFBQSxVQUNKLEtBQUs7QUFDRCxzQkFBVSxPQUFPLFFBQVE7QUFDekI7QUFBQTtBQUFBLFVBQ0osS0FBSztBQUNELHNCQUFVLE9BQU8sT0FBTyxhQUFhO0FBQ3JDO0FBQUE7QUFBQSxVQUNKLEtBQUs7QUFDRCxzQkFBVSxPQUFPLE9BQU8sYUFBYTtBQUNyQztBQUFBO0FBQUEsVUFDSjtBQUNJLHFCQUFTLE9BQU87QUFBQSxRQUN4QjtBQUVBLGVBQU8sVUFBVSxTQUFTLFNBQVMsTUFBTTtBQUFBLE1BQzdDO0FBRUEsZUFBUyxVQUFVLEdBQUcsR0FBRztBQUNyQixZQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxHQUFHO0FBR3JCLGlCQUFPLENBQUMsVUFBVSxHQUFHLENBQUM7QUFBQSxRQUMxQjtBQUVBLFlBQUksa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxLQUFLLE1BQU0sRUFBRSxNQUFNLElBQUksRUFBRSxNQUFNLElBRW5FLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxnQkFBZ0IsUUFBUSxHQUMvQyxTQUNBO0FBRUosWUFBSSxJQUFJLFNBQVMsR0FBRztBQUNoQixvQkFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLGlCQUFpQixHQUFHLFFBQVE7QUFFcEQsb0JBQVUsSUFBSSxXQUFXLFNBQVM7QUFBQSxRQUN0QyxPQUFPO0FBQ0gsb0JBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxRQUFRO0FBRXBELG9CQUFVLElBQUksV0FBVyxVQUFVO0FBQUEsUUFDdkM7QUFHQSxlQUFPLEVBQUUsaUJBQWlCLFdBQVc7QUFBQSxNQUN6QztBQUVBLFlBQU0sZ0JBQWdCO0FBQ3RCLFlBQU0sbUJBQW1CO0FBRXpCLGVBQVMsV0FBVztBQUNoQixlQUFPLEtBQUssTUFBTSxFQUFFLE9BQU8sSUFBSSxFQUFFLE9BQU8sa0NBQWtDO0FBQUEsTUFDOUU7QUFFQSxlQUFTLFlBQVksWUFBWTtBQUM3QixZQUFJLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDakIsaUJBQU87QUFBQSxRQUNYO0FBQ0EsWUFBSUMsT0FBTSxlQUFlLE1BQ3JCLElBQUlBLE9BQU0sS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJO0FBQ25DLFlBQUksRUFBRSxLQUFLLElBQUksS0FBSyxFQUFFLEtBQUssSUFBSSxNQUFNO0FBQ2pDLGlCQUFPO0FBQUEsWUFDSDtBQUFBLFlBQ0FBLE9BQ00sbUNBQ0E7QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUNBLFlBQUksV0FBVyxLQUFLLFVBQVUsV0FBVyxHQUFHO0FBRXhDLGNBQUlBLE1BQUs7QUFDTCxtQkFBTyxLQUFLLE9BQU8sRUFBRSxZQUFZO0FBQUEsVUFDckMsT0FBTztBQUNILG1CQUFPLElBQUksS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLEdBQUksRUFDeEQsWUFBWSxFQUNaLFFBQVEsS0FBSyxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQUEsVUFDMUM7QUFBQSxRQUNKO0FBQ0EsZUFBTztBQUFBLFVBQ0g7QUFBQSxVQUNBQSxPQUFNLGlDQUFpQztBQUFBLFFBQzNDO0FBQUEsTUFDSjtBQVFBLGVBQVMsVUFBVTtBQUNmLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTyx1QkFBdUIsS0FBSyxLQUFLO0FBQUEsUUFDNUM7QUFDQSxZQUFJLE9BQU8sVUFDUCxPQUFPLElBQ1AsUUFDQSxNQUNBLFVBQ0E7QUFDSixZQUFJLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDakIsaUJBQU8sS0FBSyxVQUFVLE1BQU0sSUFBSSxlQUFlO0FBQy9DLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGlCQUFTLE1BQU0sT0FBTztBQUN0QixlQUFPLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssT0FBTyxTQUFTO0FBQzFELG1CQUFXO0FBQ1gsaUJBQVMsT0FBTztBQUVoQixlQUFPLEtBQUssT0FBTyxTQUFTLE9BQU8sV0FBVyxNQUFNO0FBQUEsTUFDeEQ7QUFFQSxlQUFTLE9BQU8sYUFBYTtBQUN6QixZQUFJLENBQUMsYUFBYTtBQUNkLHdCQUFjLEtBQUssTUFBTSxJQUNuQixNQUFNLG1CQUNOLE1BQU07QUFBQSxRQUNoQjtBQUNBLFlBQUksU0FBUyxhQUFhLE1BQU0sV0FBVztBQUMzQyxlQUFPLEtBQUssV0FBVyxFQUFFLFdBQVcsTUFBTTtBQUFBLE1BQzlDO0FBRUEsZUFBUyxLQUFLLE1BQU0sZUFBZTtBQUMvQixZQUNJLEtBQUssUUFBUSxNQUNYLFNBQVMsSUFBSSxLQUFLLEtBQUssUUFBUSxLQUFNLFlBQVksSUFBSSxFQUFFLFFBQVEsSUFDbkU7QUFDRSxpQkFBTyxlQUFlLEVBQUUsSUFBSSxNQUFNLE1BQU0sS0FBSyxDQUFDLEVBQ3pDLE9BQU8sS0FBSyxPQUFPLENBQUMsRUFDcEIsU0FBUyxDQUFDLGFBQWE7QUFBQSxRQUNoQyxPQUFPO0FBQ0gsaUJBQU8sS0FBSyxXQUFXLEVBQUUsWUFBWTtBQUFBLFFBQ3pDO0FBQUEsTUFDSjtBQUVBLGVBQVMsUUFBUSxlQUFlO0FBQzVCLGVBQU8sS0FBSyxLQUFLLFlBQVksR0FBRyxhQUFhO0FBQUEsTUFDakQ7QUFFQSxlQUFTLEdBQUcsTUFBTSxlQUFlO0FBQzdCLFlBQ0ksS0FBSyxRQUFRLE1BQ1gsU0FBUyxJQUFJLEtBQUssS0FBSyxRQUFRLEtBQU0sWUFBWSxJQUFJLEVBQUUsUUFBUSxJQUNuRTtBQUNFLGlCQUFPLGVBQWUsRUFBRSxNQUFNLE1BQU0sSUFBSSxLQUFLLENBQUMsRUFDekMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxFQUNwQixTQUFTLENBQUMsYUFBYTtBQUFBLFFBQ2hDLE9BQU87QUFDSCxpQkFBTyxLQUFLLFdBQVcsRUFBRSxZQUFZO0FBQUEsUUFDekM7QUFBQSxNQUNKO0FBRUEsZUFBUyxNQUFNLGVBQWU7QUFDMUIsZUFBTyxLQUFLLEdBQUcsWUFBWSxHQUFHLGFBQWE7QUFBQSxNQUMvQztBQUtBLGVBQVMsT0FBTyxLQUFLO0FBQ2pCLFlBQUk7QUFFSixZQUFJLFFBQVEsUUFBVztBQUNuQixpQkFBTyxLQUFLLFFBQVE7QUFBQSxRQUN4QixPQUFPO0FBQ0gsMEJBQWdCLFVBQVUsR0FBRztBQUM3QixjQUFJLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFLLFVBQVU7QUFBQSxVQUNuQjtBQUNBLGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFFQSxVQUFJLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxTQUFVLEtBQUs7QUFDWCxjQUFJLFFBQVEsUUFBVztBQUNuQixtQkFBTyxLQUFLLFdBQVc7QUFBQSxVQUMzQixPQUFPO0FBQ0gsbUJBQU8sS0FBSyxPQUFPLEdBQUc7QUFBQSxVQUMxQjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsZUFBUyxhQUFhO0FBQ2xCLGVBQU8sS0FBSztBQUFBLE1BQ2hCO0FBRUEsVUFBSSxnQkFBZ0IsS0FDaEIsZ0JBQWdCLEtBQUssZUFDckIsY0FBYyxLQUFLLGVBQ25CLG9CQUFvQixNQUFNLE1BQU0sTUFBTSxLQUFLO0FBRy9DLGVBQVMsTUFBTSxVQUFVLFNBQVM7QUFDOUIsZ0JBQVMsV0FBVyxVQUFXLFdBQVc7QUFBQSxNQUM5QztBQUVBLGVBQVMsaUJBQWlCLEdBQUcsR0FBRyxHQUFHO0FBRS9CLFlBQUksSUFBSSxPQUFPLEtBQUssR0FBRztBQUVuQixpQkFBTyxJQUFJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJO0FBQUEsUUFDckMsT0FBTztBQUNILGlCQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLFFBQVE7QUFBQSxRQUNyQztBQUFBLE1BQ0o7QUFFQSxlQUFTLGVBQWUsR0FBRyxHQUFHLEdBQUc7QUFFN0IsWUFBSSxJQUFJLE9BQU8sS0FBSyxHQUFHO0FBRW5CLGlCQUFPLEtBQUssSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUk7QUFBQSxRQUNyQyxPQUFPO0FBQ0gsaUJBQU8sS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQUEsUUFDM0I7QUFBQSxNQUNKO0FBRUEsZUFBUyxRQUFRLE9BQU87QUFDcEIsWUFBSSxNQUFNO0FBQ1YsZ0JBQVEsZUFBZSxLQUFLO0FBQzVCLFlBQUksVUFBVSxVQUFhLFVBQVUsaUJBQWlCLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDbkUsaUJBQU87QUFBQSxRQUNYO0FBRUEsc0JBQWMsS0FBSyxTQUFTLGlCQUFpQjtBQUU3QyxnQkFBUSxPQUFPO0FBQUEsVUFDWCxLQUFLO0FBQ0QsbUJBQU8sWUFBWSxLQUFLLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDcEM7QUFBQSxVQUNKLEtBQUs7QUFDRCxtQkFBTztBQUFBLGNBQ0gsS0FBSyxLQUFLO0FBQUEsY0FDVixLQUFLLE1BQU0sSUFBSyxLQUFLLE1BQU0sSUFBSTtBQUFBLGNBQy9CO0FBQUEsWUFDSjtBQUNBO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU8sWUFBWSxLQUFLLEtBQUssR0FBRyxLQUFLLE1BQU0sR0FBRyxDQUFDO0FBQy9DO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU87QUFBQSxjQUNILEtBQUssS0FBSztBQUFBLGNBQ1YsS0FBSyxNQUFNO0FBQUEsY0FDWCxLQUFLLEtBQUssSUFBSSxLQUFLLFFBQVE7QUFBQSxZQUMvQjtBQUNBO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU87QUFBQSxjQUNILEtBQUssS0FBSztBQUFBLGNBQ1YsS0FBSyxNQUFNO0FBQUEsY0FDWCxLQUFLLEtBQUssS0FBSyxLQUFLLFdBQVcsSUFBSTtBQUFBLFlBQ3ZDO0FBQ0E7QUFBQSxVQUNKLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFDRCxtQkFBTyxZQUFZLEtBQUssS0FBSyxHQUFHLEtBQUssTUFBTSxHQUFHLEtBQUssS0FBSyxDQUFDO0FBQ3pEO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU8sS0FBSyxHQUFHLFFBQVE7QUFDdkIsb0JBQVE7QUFBQSxjQUNKLFFBQVEsS0FBSyxTQUFTLElBQUksS0FBSyxVQUFVLElBQUk7QUFBQSxjQUM3QztBQUFBLFlBQ0o7QUFDQTtBQUFBLFVBQ0osS0FBSztBQUNELG1CQUFPLEtBQUssR0FBRyxRQUFRO0FBQ3ZCLG9CQUFRLE1BQU0sTUFBTSxhQUFhO0FBQ2pDO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU8sS0FBSyxHQUFHLFFBQVE7QUFDdkIsb0JBQVEsTUFBTSxNQUFNLGFBQWE7QUFDakM7QUFBQSxRQUNSO0FBRUEsYUFBSyxHQUFHLFFBQVEsSUFBSTtBQUNwQixjQUFNLGFBQWEsTUFBTSxJQUFJO0FBQzdCLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxNQUFNLE9BQU87QUFDbEIsWUFBSSxNQUFNO0FBQ1YsZ0JBQVEsZUFBZSxLQUFLO0FBQzVCLFlBQUksVUFBVSxVQUFhLFVBQVUsaUJBQWlCLENBQUMsS0FBSyxRQUFRLEdBQUc7QUFDbkUsaUJBQU87QUFBQSxRQUNYO0FBRUEsc0JBQWMsS0FBSyxTQUFTLGlCQUFpQjtBQUU3QyxnQkFBUSxPQUFPO0FBQUEsVUFDWCxLQUFLO0FBQ0QsbUJBQU8sWUFBWSxLQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJO0FBQzVDO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQ0k7QUFBQSxjQUNJLEtBQUssS0FBSztBQUFBLGNBQ1YsS0FBSyxNQUFNLElBQUssS0FBSyxNQUFNLElBQUksSUFBSztBQUFBLGNBQ3BDO0FBQUEsWUFDSixJQUFJO0FBQ1I7QUFBQSxVQUNKLEtBQUs7QUFDRCxtQkFBTyxZQUFZLEtBQUssS0FBSyxHQUFHLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJO0FBQ3ZEO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQ0k7QUFBQSxjQUNJLEtBQUssS0FBSztBQUFBLGNBQ1YsS0FBSyxNQUFNO0FBQUEsY0FDWCxLQUFLLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSTtBQUFBLFlBQ25DLElBQUk7QUFDUjtBQUFBLFVBQ0osS0FBSztBQUNELG1CQUNJO0FBQUEsY0FDSSxLQUFLLEtBQUs7QUFBQSxjQUNWLEtBQUssTUFBTTtBQUFBLGNBQ1gsS0FBSyxLQUFLLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSztBQUFBLFlBQzVDLElBQUk7QUFDUjtBQUFBLFVBQ0osS0FBSztBQUFBLFVBQ0wsS0FBSztBQUNELG1CQUFPLFlBQVksS0FBSyxLQUFLLEdBQUcsS0FBSyxNQUFNLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJO0FBQ2pFO0FBQUEsVUFDSixLQUFLO0FBQ0QsbUJBQU8sS0FBSyxHQUFHLFFBQVE7QUFDdkIsb0JBQ0ksY0FDQTtBQUFBLGNBQ0ksUUFBUSxLQUFLLFNBQVMsSUFBSSxLQUFLLFVBQVUsSUFBSTtBQUFBLGNBQzdDO0FBQUEsWUFDSixJQUNBO0FBQ0o7QUFBQSxVQUNKLEtBQUs7QUFDRCxtQkFBTyxLQUFLLEdBQUcsUUFBUTtBQUN2QixvQkFBUSxnQkFBZ0IsTUFBTSxNQUFNLGFBQWEsSUFBSTtBQUNyRDtBQUFBLFVBQ0osS0FBSztBQUNELG1CQUFPLEtBQUssR0FBRyxRQUFRO0FBQ3ZCLG9CQUFRLGdCQUFnQixNQUFNLE1BQU0sYUFBYSxJQUFJO0FBQ3JEO0FBQUEsUUFDUjtBQUVBLGFBQUssR0FBRyxRQUFRLElBQUk7QUFDcEIsY0FBTSxhQUFhLE1BQU0sSUFBSTtBQUM3QixlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsVUFBVTtBQUNmLGVBQU8sS0FBSyxHQUFHLFFBQVEsS0FBSyxLQUFLLFdBQVcsS0FBSztBQUFBLE1BQ3JEO0FBRUEsZUFBUyxPQUFPO0FBQ1osZUFBTyxLQUFLLE1BQU0sS0FBSyxRQUFRLElBQUksR0FBSTtBQUFBLE1BQzNDO0FBRUEsZUFBUyxTQUFTO0FBQ2QsZUFBTyxJQUFJLEtBQUssS0FBSyxRQUFRLENBQUM7QUFBQSxNQUNsQztBQUVBLGVBQVMsVUFBVTtBQUNmLFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxVQUNILEVBQUUsS0FBSztBQUFBLFVBQ1AsRUFBRSxNQUFNO0FBQUEsVUFDUixFQUFFLEtBQUs7QUFBQSxVQUNQLEVBQUUsS0FBSztBQUFBLFVBQ1AsRUFBRSxPQUFPO0FBQUEsVUFDVCxFQUFFLE9BQU87QUFBQSxVQUNULEVBQUUsWUFBWTtBQUFBLFFBQ2xCO0FBQUEsTUFDSjtBQUVBLGVBQVMsV0FBVztBQUNoQixZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsVUFDSCxPQUFPLEVBQUUsS0FBSztBQUFBLFVBQ2QsUUFBUSxFQUFFLE1BQU07QUFBQSxVQUNoQixNQUFNLEVBQUUsS0FBSztBQUFBLFVBQ2IsT0FBTyxFQUFFLE1BQU07QUFBQSxVQUNmLFNBQVMsRUFBRSxRQUFRO0FBQUEsVUFDbkIsU0FBUyxFQUFFLFFBQVE7QUFBQSxVQUNuQixjQUFjLEVBQUUsYUFBYTtBQUFBLFFBQ2pDO0FBQUEsTUFDSjtBQUVBLGVBQVMsU0FBUztBQUVkLGVBQU8sS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLElBQUk7QUFBQSxNQUNqRDtBQUVBLGVBQVMsWUFBWTtBQUNqQixlQUFPLFFBQVEsSUFBSTtBQUFBLE1BQ3ZCO0FBRUEsZUFBUyxlQUFlO0FBQ3BCLGVBQU8sT0FBTyxDQUFDLEdBQUcsZ0JBQWdCLElBQUksQ0FBQztBQUFBLE1BQzNDO0FBRUEsZUFBUyxZQUFZO0FBQ2pCLGVBQU8sZ0JBQWdCLElBQUksRUFBRTtBQUFBLE1BQ2pDO0FBRUEsZUFBUyxlQUFlO0FBQ3BCLGVBQU87QUFBQSxVQUNILE9BQU8sS0FBSztBQUFBLFVBQ1osUUFBUSxLQUFLO0FBQUEsVUFDYixRQUFRLEtBQUs7QUFBQSxVQUNiLE9BQU8sS0FBSztBQUFBLFVBQ1osUUFBUSxLQUFLO0FBQUEsUUFDakI7QUFBQSxNQUNKO0FBRUEscUJBQWUsS0FBSyxHQUFHLEdBQUcsU0FBUztBQUNuQyxxQkFBZSxNQUFNLEdBQUcsR0FBRyxTQUFTO0FBQ3BDLHFCQUFlLE9BQU8sR0FBRyxHQUFHLFNBQVM7QUFDckMscUJBQWUsUUFBUSxHQUFHLEdBQUcsU0FBUztBQUN0QyxxQkFBZSxTQUFTLEdBQUcsR0FBRyxXQUFXO0FBRXpDLHFCQUFlLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLFNBQVM7QUFDN0MscUJBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUztBQUMzQyxxQkFBZSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTO0FBQzVDLHFCQUFlLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFNBQVM7QUFFN0Msb0JBQWMsS0FBSyxZQUFZO0FBQy9CLG9CQUFjLE1BQU0sWUFBWTtBQUNoQyxvQkFBYyxPQUFPLFlBQVk7QUFDakMsb0JBQWMsUUFBUSxZQUFZO0FBQ2xDLG9CQUFjLFNBQVMsY0FBYztBQUVyQztBQUFBLFFBQ0ksQ0FBQyxLQUFLLE1BQU0sT0FBTyxRQUFRLE9BQU87QUFBQSxRQUNsQyxTQUFVLE9BQU8sT0FBTyxRQUFRbEIsUUFBTztBQUNuQyxjQUFJLE1BQU0sT0FBTyxRQUFRLFVBQVUsT0FBT0EsUUFBTyxPQUFPLE9BQU87QUFDL0QsY0FBSSxLQUFLO0FBQ0wsNEJBQWdCLE1BQU0sRUFBRSxNQUFNO0FBQUEsVUFDbEMsT0FBTztBQUNILDRCQUFnQixNQUFNLEVBQUUsYUFBYTtBQUFBLFVBQ3pDO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxvQkFBYyxLQUFLLGFBQWE7QUFDaEMsb0JBQWMsTUFBTSxhQUFhO0FBQ2pDLG9CQUFjLE9BQU8sYUFBYTtBQUNsQyxvQkFBYyxRQUFRLGFBQWE7QUFDbkMsb0JBQWMsTUFBTSxtQkFBbUI7QUFFdkMsb0JBQWMsQ0FBQyxLQUFLLE1BQU0sT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUM5QyxvQkFBYyxDQUFDLElBQUksR0FBRyxTQUFVLE9BQU8sT0FBTyxRQUFRQSxRQUFPO0FBQ3pELFlBQUk7QUFDSixZQUFJLE9BQU8sUUFBUSxzQkFBc0I7QUFDckMsa0JBQVEsTUFBTSxNQUFNLE9BQU8sUUFBUSxvQkFBb0I7QUFBQSxRQUMzRDtBQUVBLFlBQUksT0FBTyxRQUFRLHFCQUFxQjtBQUNwQyxnQkFBTSxJQUFJLElBQUksT0FBTyxRQUFRLG9CQUFvQixPQUFPLEtBQUs7QUFBQSxRQUNqRSxPQUFPO0FBQ0gsZ0JBQU0sSUFBSSxJQUFJLFNBQVMsT0FBTyxFQUFFO0FBQUEsUUFDcEM7QUFBQSxNQUNKLENBQUM7QUFFRCxlQUFTLFdBQVcsR0FBR04sU0FBUTtBQUMzQixZQUFJLEdBQ0EsR0FDQSxNQUNBLE9BQU8sS0FBSyxTQUFTLFVBQVUsSUFBSSxFQUFFO0FBQ3pDLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxFQUFFLEdBQUc7QUFDckMsa0JBQVEsT0FBTyxLQUFLLENBQUMsRUFBRSxPQUFPO0FBQUEsWUFDMUIsS0FBSztBQUVELHFCQUFPLE1BQU0sS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsS0FBSztBQUN6QyxtQkFBSyxDQUFDLEVBQUUsUUFBUSxLQUFLLFFBQVE7QUFDN0I7QUFBQSxVQUNSO0FBRUEsa0JBQVEsT0FBTyxLQUFLLENBQUMsRUFBRSxPQUFPO0FBQUEsWUFDMUIsS0FBSztBQUNELG1CQUFLLENBQUMsRUFBRSxRQUFRO0FBQ2hCO0FBQUEsWUFDSixLQUFLO0FBRUQscUJBQU8sTUFBTSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxLQUFLLEVBQUUsUUFBUTtBQUNuRCxtQkFBSyxDQUFDLEVBQUUsUUFBUSxLQUFLLFFBQVE7QUFDN0I7QUFBQSxVQUNSO0FBQUEsUUFDSjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxnQkFBZ0IsU0FBU0EsU0FBUSxRQUFRO0FBQzlDLFlBQUksR0FDQSxHQUNBLE9BQU8sS0FBSyxLQUFLLEdBQ2pCLE1BQ0EsTUFDQTtBQUNKLGtCQUFVLFFBQVEsWUFBWTtBQUU5QixhQUFLLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxJQUFJLEdBQUcsRUFBRSxHQUFHO0FBQ3JDLGlCQUFPLEtBQUssQ0FBQyxFQUFFLEtBQUssWUFBWTtBQUNoQyxpQkFBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFlBQVk7QUFDaEMsbUJBQVMsS0FBSyxDQUFDLEVBQUUsT0FBTyxZQUFZO0FBRXBDLGNBQUksUUFBUTtBQUNSLG9CQUFRQSxTQUFRO0FBQUEsY0FDWixLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQ0Qsb0JBQUksU0FBUyxTQUFTO0FBQ2xCLHlCQUFPLEtBQUssQ0FBQztBQUFBLGdCQUNqQjtBQUNBO0FBQUEsY0FFSixLQUFLO0FBQ0Qsb0JBQUksU0FBUyxTQUFTO0FBQ2xCLHlCQUFPLEtBQUssQ0FBQztBQUFBLGdCQUNqQjtBQUNBO0FBQUEsY0FFSixLQUFLO0FBQ0Qsb0JBQUksV0FBVyxTQUFTO0FBQ3BCLHlCQUFPLEtBQUssQ0FBQztBQUFBLGdCQUNqQjtBQUNBO0FBQUEsWUFDUjtBQUFBLFVBQ0osV0FBVyxDQUFDLE1BQU0sTUFBTSxNQUFNLEVBQUUsUUFBUSxPQUFPLEtBQUssR0FBRztBQUNuRCxtQkFBTyxLQUFLLENBQUM7QUFBQSxVQUNqQjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsZUFBUyxzQkFBc0IsS0FBSyxNQUFNO0FBQ3RDLFlBQUksTUFBTSxJQUFJLFNBQVMsSUFBSSxRQUFRLElBQUs7QUFDeEMsWUFBSSxTQUFTLFFBQVc7QUFDcEIsaUJBQU8sTUFBTSxJQUFJLEtBQUssRUFBRSxLQUFLO0FBQUEsUUFDakMsT0FBTztBQUNILGlCQUFPLE1BQU0sSUFBSSxLQUFLLEVBQUUsS0FBSyxLQUFLLE9BQU8sSUFBSSxVQUFVO0FBQUEsUUFDM0Q7QUFBQSxNQUNKO0FBRUEsZUFBUyxhQUFhO0FBQ2xCLFlBQUksR0FDQSxHQUNBLEtBQ0EsT0FBTyxLQUFLLFdBQVcsRUFBRSxLQUFLO0FBQ2xDLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxFQUFFLEdBQUc7QUFFckMsZ0JBQU0sS0FBSyxNQUFNLEVBQUUsUUFBUSxLQUFLLEVBQUUsUUFBUTtBQUUxQyxjQUFJLEtBQUssQ0FBQyxFQUFFLFNBQVMsT0FBTyxPQUFPLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDOUMsbUJBQU8sS0FBSyxDQUFDLEVBQUU7QUFBQSxVQUNuQjtBQUNBLGNBQUksS0FBSyxDQUFDLEVBQUUsU0FBUyxPQUFPLE9BQU8sS0FBSyxDQUFDLEVBQUUsT0FBTztBQUM5QyxtQkFBTyxLQUFLLENBQUMsRUFBRTtBQUFBLFVBQ25CO0FBQUEsUUFDSjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxlQUFlO0FBQ3BCLFlBQUksR0FDQSxHQUNBLEtBQ0EsT0FBTyxLQUFLLFdBQVcsRUFBRSxLQUFLO0FBQ2xDLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxFQUFFLEdBQUc7QUFFckMsZ0JBQU0sS0FBSyxNQUFNLEVBQUUsUUFBUSxLQUFLLEVBQUUsUUFBUTtBQUUxQyxjQUFJLEtBQUssQ0FBQyxFQUFFLFNBQVMsT0FBTyxPQUFPLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDOUMsbUJBQU8sS0FBSyxDQUFDLEVBQUU7QUFBQSxVQUNuQjtBQUNBLGNBQUksS0FBSyxDQUFDLEVBQUUsU0FBUyxPQUFPLE9BQU8sS0FBSyxDQUFDLEVBQUUsT0FBTztBQUM5QyxtQkFBTyxLQUFLLENBQUMsRUFBRTtBQUFBLFVBQ25CO0FBQUEsUUFDSjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxhQUFhO0FBQ2xCLFlBQUksR0FDQSxHQUNBLEtBQ0EsT0FBTyxLQUFLLFdBQVcsRUFBRSxLQUFLO0FBQ2xDLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxFQUFFLEdBQUc7QUFFckMsZ0JBQU0sS0FBSyxNQUFNLEVBQUUsUUFBUSxLQUFLLEVBQUUsUUFBUTtBQUUxQyxjQUFJLEtBQUssQ0FBQyxFQUFFLFNBQVMsT0FBTyxPQUFPLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDOUMsbUJBQU8sS0FBSyxDQUFDLEVBQUU7QUFBQSxVQUNuQjtBQUNBLGNBQUksS0FBSyxDQUFDLEVBQUUsU0FBUyxPQUFPLE9BQU8sS0FBSyxDQUFDLEVBQUUsT0FBTztBQUM5QyxtQkFBTyxLQUFLLENBQUMsRUFBRTtBQUFBLFVBQ25CO0FBQUEsUUFDSjtBQUVBLGVBQU87QUFBQSxNQUNYO0FBRUEsZUFBUyxhQUFhO0FBQ2xCLFlBQUksR0FDQSxHQUNBLEtBQ0EsS0FDQSxPQUFPLEtBQUssV0FBVyxFQUFFLEtBQUs7QUFDbEMsYUFBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsSUFBSSxHQUFHLEVBQUUsR0FBRztBQUNyQyxnQkFBTSxLQUFLLENBQUMsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLFFBQVEsSUFBSztBQUc1QyxnQkFBTSxLQUFLLE1BQU0sRUFBRSxRQUFRLEtBQUssRUFBRSxRQUFRO0FBRTFDLGNBQ0ssS0FBSyxDQUFDLEVBQUUsU0FBUyxPQUFPLE9BQU8sS0FBSyxDQUFDLEVBQUUsU0FDdkMsS0FBSyxDQUFDLEVBQUUsU0FBUyxPQUFPLE9BQU8sS0FBSyxDQUFDLEVBQUUsT0FDMUM7QUFDRSxvQkFDSyxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEtBQUssTUFDOUMsS0FBSyxDQUFDLEVBQUU7QUFBQSxVQUVoQjtBQUFBLFFBQ0o7QUFFQSxlQUFPLEtBQUssS0FBSztBQUFBLE1BQ3JCO0FBRUEsZUFBUyxjQUFjLFVBQVU7QUFDN0IsWUFBSSxDQUFDLFdBQVcsTUFBTSxnQkFBZ0IsR0FBRztBQUNyQywyQkFBaUIsS0FBSyxJQUFJO0FBQUEsUUFDOUI7QUFDQSxlQUFPLFdBQVcsS0FBSyxpQkFBaUIsS0FBSztBQUFBLE1BQ2pEO0FBRUEsZUFBUyxjQUFjLFVBQVU7QUFDN0IsWUFBSSxDQUFDLFdBQVcsTUFBTSxnQkFBZ0IsR0FBRztBQUNyQywyQkFBaUIsS0FBSyxJQUFJO0FBQUEsUUFDOUI7QUFDQSxlQUFPLFdBQVcsS0FBSyxpQkFBaUIsS0FBSztBQUFBLE1BQ2pEO0FBRUEsZUFBUyxnQkFBZ0IsVUFBVTtBQUMvQixZQUFJLENBQUMsV0FBVyxNQUFNLGtCQUFrQixHQUFHO0FBQ3ZDLDJCQUFpQixLQUFLLElBQUk7QUFBQSxRQUM5QjtBQUNBLGVBQU8sV0FBVyxLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDbkQ7QUFFQSxlQUFTLGFBQWEsVUFBVUMsU0FBUTtBQUNwQyxlQUFPQSxRQUFPLGNBQWMsUUFBUTtBQUFBLE1BQ3hDO0FBRUEsZUFBUyxhQUFhLFVBQVVBLFNBQVE7QUFDcEMsZUFBT0EsUUFBTyxjQUFjLFFBQVE7QUFBQSxNQUN4QztBQUVBLGVBQVMsZUFBZSxVQUFVQSxTQUFRO0FBQ3RDLGVBQU9BLFFBQU8sZ0JBQWdCLFFBQVE7QUFBQSxNQUMxQztBQUVBLGVBQVMsb0JBQW9CLFVBQVVBLFNBQVE7QUFDM0MsZUFBT0EsUUFBTyx3QkFBd0I7QUFBQSxNQUMxQztBQUVBLGVBQVMsbUJBQW1CO0FBQ3hCLFlBQUksYUFBYSxDQUFDLEdBQ2QsYUFBYSxDQUFDLEdBQ2QsZUFBZSxDQUFDLEdBQ2hCLGNBQWMsQ0FBQyxHQUNmLEdBQ0EsR0FDQSxVQUNBLFVBQ0EsWUFDQSxPQUFPLEtBQUssS0FBSztBQUVyQixhQUFLLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxJQUFJLEdBQUcsRUFBRSxHQUFHO0FBQ3JDLHFCQUFXLFlBQVksS0FBSyxDQUFDLEVBQUUsSUFBSTtBQUNuQyxxQkFBVyxZQUFZLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDbkMsdUJBQWEsWUFBWSxLQUFLLENBQUMsRUFBRSxNQUFNO0FBRXZDLHFCQUFXLEtBQUssUUFBUTtBQUN4QixxQkFBVyxLQUFLLFFBQVE7QUFDeEIsdUJBQWEsS0FBSyxVQUFVO0FBQzVCLHNCQUFZLEtBQUssUUFBUTtBQUN6QixzQkFBWSxLQUFLLFFBQVE7QUFDekIsc0JBQVksS0FBSyxVQUFVO0FBQUEsUUFDL0I7QUFFQSxhQUFLLGFBQWEsSUFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFDcEUsYUFBSyxpQkFBaUIsSUFBSSxPQUFPLE9BQU8sV0FBVyxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFDdkUsYUFBSyxpQkFBaUIsSUFBSSxPQUFPLE9BQU8sV0FBVyxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUc7QUFDdkUsYUFBSyxtQkFBbUIsSUFBSTtBQUFBLFVBQ3hCLE9BQU8sYUFBYSxLQUFLLEdBQUcsSUFBSTtBQUFBLFVBQ2hDO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFJQSxxQkFBZSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxXQUFZO0FBQ3hDLGVBQU8sS0FBSyxTQUFTLElBQUk7QUFBQSxNQUM3QixDQUFDO0FBRUQscUJBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBWTtBQUN4QyxlQUFPLEtBQUssWUFBWSxJQUFJO0FBQUEsTUFDaEMsQ0FBQztBQUVELGVBQVMsdUJBQXVCSyxRQUFPLFFBQVE7QUFDM0MsdUJBQWUsR0FBRyxDQUFDQSxRQUFPQSxPQUFNLE1BQU0sR0FBRyxHQUFHLE1BQU07QUFBQSxNQUN0RDtBQUVBLDZCQUF1QixRQUFRLFVBQVU7QUFDekMsNkJBQXVCLFNBQVMsVUFBVTtBQUMxQyw2QkFBdUIsUUFBUSxhQUFhO0FBQzVDLDZCQUF1QixTQUFTLGFBQWE7QUFNN0Msb0JBQWMsS0FBSyxXQUFXO0FBQzlCLG9CQUFjLEtBQUssV0FBVztBQUM5QixvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUNyQyxvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUNyQyxvQkFBYyxRQUFRLFdBQVcsTUFBTTtBQUN2QyxvQkFBYyxRQUFRLFdBQVcsTUFBTTtBQUN2QyxvQkFBYyxTQUFTLFdBQVcsTUFBTTtBQUN4QyxvQkFBYyxTQUFTLFdBQVcsTUFBTTtBQUV4QztBQUFBLFFBQ0ksQ0FBQyxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDakMsU0FBVSxPQUFPLE1BQU0sUUFBUUEsUUFBTztBQUNsQyxlQUFLQSxPQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLEtBQUs7QUFBQSxRQUMxQztBQUFBLE1BQ0o7QUFFQSx3QkFBa0IsQ0FBQyxNQUFNLElBQUksR0FBRyxTQUFVLE9BQU8sTUFBTSxRQUFRQSxRQUFPO0FBQ2xFLGFBQUtBLE1BQUssSUFBSSxNQUFNLGtCQUFrQixLQUFLO0FBQUEsTUFDL0MsQ0FBQztBQUlELGVBQVMsZUFBZSxPQUFPO0FBQzNCLGVBQU8scUJBQXFCO0FBQUEsVUFDeEI7QUFBQSxVQUNBO0FBQUEsVUFDQSxLQUFLLEtBQUs7QUFBQSxVQUNWLEtBQUssUUFBUSxJQUFJLEtBQUssV0FBVyxFQUFFLE1BQU07QUFBQSxVQUN6QyxLQUFLLFdBQVcsRUFBRSxNQUFNO0FBQUEsVUFDeEIsS0FBSyxXQUFXLEVBQUUsTUFBTTtBQUFBLFFBQzVCO0FBQUEsTUFDSjtBQUVBLGVBQVMsa0JBQWtCLE9BQU87QUFDOUIsZUFBTyxxQkFBcUI7QUFBQSxVQUN4QjtBQUFBLFVBQ0E7QUFBQSxVQUNBLEtBQUssUUFBUTtBQUFBLFVBQ2IsS0FBSyxXQUFXO0FBQUEsVUFDaEI7QUFBQSxVQUNBO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxlQUFTLG9CQUFvQjtBQUN6QixlQUFPLFlBQVksS0FBSyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDeEM7QUFFQSxlQUFTLDJCQUEyQjtBQUNoQyxlQUFPLFlBQVksS0FBSyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDL0M7QUFFQSxlQUFTLGlCQUFpQjtBQUN0QixZQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUU7QUFDakMsZUFBTyxZQUFZLEtBQUssS0FBSyxHQUFHLFNBQVMsS0FBSyxTQUFTLEdBQUc7QUFBQSxNQUM5RDtBQUVBLGVBQVMscUJBQXFCO0FBQzFCLFlBQUksV0FBVyxLQUFLLFdBQVcsRUFBRTtBQUNqQyxlQUFPLFlBQVksS0FBSyxTQUFTLEdBQUcsU0FBUyxLQUFLLFNBQVMsR0FBRztBQUFBLE1BQ2xFO0FBRUEsZUFBUyxxQkFBcUIsT0FBTyxNQUFNLFNBQVMsS0FBSyxLQUFLO0FBQzFELFlBQUk7QUFDSixZQUFJLFNBQVMsTUFBTTtBQUNmLGlCQUFPLFdBQVcsTUFBTSxLQUFLLEdBQUcsRUFBRTtBQUFBLFFBQ3RDLE9BQU87QUFDSCx3QkFBYyxZQUFZLE9BQU8sS0FBSyxHQUFHO0FBQ3pDLGNBQUksT0FBTyxhQUFhO0FBQ3BCLG1CQUFPO0FBQUEsVUFDWDtBQUNBLGlCQUFPLFdBQVcsS0FBSyxNQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUssR0FBRztBQUFBLFFBQy9EO0FBQUEsTUFDSjtBQUVBLGVBQVMsV0FBVyxVQUFVLE1BQU0sU0FBUyxLQUFLLEtBQUs7QUFDbkQsWUFBSSxnQkFBZ0IsbUJBQW1CLFVBQVUsTUFBTSxTQUFTLEtBQUssR0FBRyxHQUNwRSxPQUFPLGNBQWMsY0FBYyxNQUFNLEdBQUcsY0FBYyxTQUFTO0FBRXZFLGFBQUssS0FBSyxLQUFLLGVBQWUsQ0FBQztBQUMvQixhQUFLLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFDN0IsYUFBSyxLQUFLLEtBQUssV0FBVyxDQUFDO0FBQzNCLGVBQU87QUFBQSxNQUNYO0FBSUEscUJBQWUsS0FBSyxHQUFHLE1BQU0sU0FBUztBQUl0QyxvQkFBYyxLQUFLLE1BQU07QUFDekIsb0JBQWMsS0FBSyxTQUFVLE9BQU8sT0FBTztBQUN2QyxjQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBSSxLQUFLO0FBQUEsTUFDeEMsQ0FBQztBQUlELGVBQVMsY0FBYyxPQUFPO0FBQzFCLGVBQU8sU0FBUyxPQUNWLEtBQUssTUFBTSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFDaEMsS0FBSyxPQUFPLFFBQVEsS0FBSyxJQUFLLEtBQUssTUFBTSxJQUFJLENBQUU7QUFBQSxNQUN6RDtBQUlBLHFCQUFlLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLE1BQU07QUFJM0Msb0JBQWMsS0FBSyxXQUFXLHNCQUFzQjtBQUNwRCxvQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUNyQyxvQkFBYyxNQUFNLFNBQVUsVUFBVUwsU0FBUTtBQUU1QyxlQUFPLFdBQ0RBLFFBQU8sMkJBQTJCQSxRQUFPLGdCQUN6Q0EsUUFBTztBQUFBLE1BQ2pCLENBQUM7QUFFRCxvQkFBYyxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUk7QUFDL0Isb0JBQWMsTUFBTSxTQUFVLE9BQU8sT0FBTztBQUN4QyxjQUFNLElBQUksSUFBSSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQUEsTUFDakQsQ0FBQztBQUlELFVBQUksbUJBQW1CLFdBQVcsUUFBUSxJQUFJO0FBSTlDLHFCQUFlLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLFdBQVc7QUFJdEQsb0JBQWMsT0FBTyxTQUFTO0FBQzlCLG9CQUFjLFFBQVEsTUFBTTtBQUM1QixvQkFBYyxDQUFDLE9BQU8sTUFBTSxHQUFHLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDM0QsZUFBTyxhQUFhLE1BQU0sS0FBSztBQUFBLE1BQ25DLENBQUM7QUFNRCxlQUFTLGdCQUFnQixPQUFPO0FBQzVCLFlBQUksWUFDQSxLQUFLO0FBQUEsV0FDQSxLQUFLLE1BQU0sRUFBRSxRQUFRLEtBQUssSUFBSSxLQUFLLE1BQU0sRUFBRSxRQUFRLE1BQU0sS0FBSztBQUFBLFFBQ25FLElBQUk7QUFDUixlQUFPLFNBQVMsT0FBTyxZQUFZLEtBQUssSUFBSSxRQUFRLFdBQVcsR0FBRztBQUFBLE1BQ3RFO0FBSUEscUJBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsUUFBUTtBQUkxQyxvQkFBYyxLQUFLLFdBQVcsZ0JBQWdCO0FBQzlDLG9CQUFjLE1BQU0sV0FBVyxNQUFNO0FBQ3JDLG9CQUFjLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTTtBQUlqQyxVQUFJLGVBQWUsV0FBVyxXQUFXLEtBQUs7QUFJOUMscUJBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsUUFBUTtBQUkxQyxvQkFBYyxLQUFLLFdBQVcsZ0JBQWdCO0FBQzlDLG9CQUFjLE1BQU0sV0FBVyxNQUFNO0FBQ3JDLG9CQUFjLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTTtBQUlqQyxVQUFJLGVBQWUsV0FBVyxXQUFXLEtBQUs7QUFJOUMscUJBQWUsS0FBSyxHQUFHLEdBQUcsV0FBWTtBQUNsQyxlQUFPLENBQUMsRUFBRSxLQUFLLFlBQVksSUFBSTtBQUFBLE1BQ25DLENBQUM7QUFFRCxxQkFBZSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxXQUFZO0FBQ3hDLGVBQU8sQ0FBQyxFQUFFLEtBQUssWUFBWSxJQUFJO0FBQUEsTUFDbkMsQ0FBQztBQUVELHFCQUFlLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLGFBQWE7QUFDOUMscUJBQWUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsV0FBWTtBQUMxQyxlQUFPLEtBQUssWUFBWSxJQUFJO0FBQUEsTUFDaEMsQ0FBQztBQUNELHFCQUFlLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFdBQVk7QUFDM0MsZUFBTyxLQUFLLFlBQVksSUFBSTtBQUFBLE1BQ2hDLENBQUM7QUFDRCxxQkFBZSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxXQUFZO0FBQzVDLGVBQU8sS0FBSyxZQUFZLElBQUk7QUFBQSxNQUNoQyxDQUFDO0FBQ0QscUJBQWUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsV0FBWTtBQUM3QyxlQUFPLEtBQUssWUFBWSxJQUFJO0FBQUEsTUFDaEMsQ0FBQztBQUNELHFCQUFlLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLFdBQVk7QUFDOUMsZUFBTyxLQUFLLFlBQVksSUFBSTtBQUFBLE1BQ2hDLENBQUM7QUFDRCxxQkFBZSxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxXQUFZO0FBQy9DLGVBQU8sS0FBSyxZQUFZLElBQUk7QUFBQSxNQUNoQyxDQUFDO0FBSUQsb0JBQWMsS0FBSyxXQUFXLE1BQU07QUFDcEMsb0JBQWMsTUFBTSxXQUFXLE1BQU07QUFDckMsb0JBQWMsT0FBTyxXQUFXLE1BQU07QUFFdEMsVUFBSSxPQUFPO0FBQ1gsV0FBSyxRQUFRLFFBQVEsTUFBTSxVQUFVLEdBQUcsU0FBUyxLQUFLO0FBQ2xELHNCQUFjLE9BQU8sYUFBYTtBQUFBLE1BQ3RDO0FBRUEsZUFBUyxRQUFRLE9BQU8sT0FBTztBQUMzQixjQUFNLFdBQVcsSUFBSSxPQUFPLE9BQU8sU0FBUyxHQUFJO0FBQUEsTUFDcEQ7QUFFQSxXQUFLLFFBQVEsS0FBSyxNQUFNLFVBQVUsR0FBRyxTQUFTLEtBQUs7QUFDL0Msc0JBQWMsT0FBTyxPQUFPO0FBQUEsTUFDaEM7QUFFQSwwQkFBb0IsV0FBVyxnQkFBZ0IsS0FBSztBQUlwRCxxQkFBZSxLQUFLLEdBQUcsR0FBRyxVQUFVO0FBQ3BDLHFCQUFlLE1BQU0sR0FBRyxHQUFHLFVBQVU7QUFJckMsZUFBUyxjQUFjO0FBQ25CLGVBQU8sS0FBSyxTQUFTLFFBQVE7QUFBQSxNQUNqQztBQUVBLGVBQVMsY0FBYztBQUNuQixlQUFPLEtBQUssU0FBUywrQkFBK0I7QUFBQSxNQUN4RDtBQUVBLFVBQUksUUFBUSxPQUFPO0FBRW5CLFlBQU0sTUFBTTtBQUNaLFlBQU0sV0FBVztBQUNqQixZQUFNLFFBQVE7QUFDZCxZQUFNLE9BQU87QUFDYixZQUFNLFFBQVE7QUFDZCxZQUFNLFNBQVM7QUFDZixZQUFNLE9BQU87QUFDYixZQUFNLFVBQVU7QUFDaEIsWUFBTSxLQUFLO0FBQ1gsWUFBTSxRQUFRO0FBQ2QsWUFBTSxNQUFNO0FBQ1osWUFBTSxZQUFZO0FBQ2xCLFlBQU0sVUFBVTtBQUNoQixZQUFNLFdBQVc7QUFDakIsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sU0FBUztBQUNmLFlBQU0sZ0JBQWdCcUI7QUFDdEIsWUFBTSxpQkFBaUJDO0FBQ3ZCLFlBQU0sVUFBVTtBQUNoQixZQUFNLE9BQU87QUFDYixZQUFNLFNBQVM7QUFDZixZQUFNLGFBQWE7QUFDbkIsWUFBTSxNQUFNO0FBQ1osWUFBTSxNQUFNO0FBQ1osWUFBTSxlQUFlO0FBQ3JCLFlBQU0sTUFBTTtBQUNaLFlBQU0sVUFBVTtBQUNoQixZQUFNLFdBQVc7QUFDakIsWUFBTSxVQUFVO0FBQ2hCLFlBQU0sV0FBVztBQUNqQixZQUFNLFNBQVM7QUFDZixZQUFNLGNBQWM7QUFDcEIsWUFBTSxVQUFVO0FBQ2hCLFVBQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxPQUFPLE1BQU07QUFDckQsY0FBTSxPQUFPLElBQUksNEJBQTRCLENBQUMsSUFBSSxXQUFZO0FBQzFELGlCQUFPLFlBQVksS0FBSyxPQUFPLElBQUk7QUFBQSxRQUN2QztBQUFBLE1BQ0o7QUFDQSxZQUFNLFNBQVM7QUFDZixZQUFNLFdBQVc7QUFDakIsWUFBTSxPQUFPO0FBQ2IsWUFBTSxVQUFVO0FBQ2hCLFlBQU0sZUFBZTtBQUNyQixZQUFNLFVBQVU7QUFDaEIsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sVUFBVTtBQUNoQixZQUFNLFVBQVU7QUFDaEIsWUFBTSxPQUFPO0FBQ2IsWUFBTSxhQUFhO0FBQ25CLFlBQU0sV0FBVztBQUNqQixZQUFNLGNBQWM7QUFDcEIsWUFBTSxVQUFVLE1BQU0sV0FBVztBQUNqQyxZQUFNLFFBQVE7QUFDZCxZQUFNLGNBQWM7QUFDcEIsWUFBTSxPQUFPLE1BQU0sUUFBUTtBQUMzQixZQUFNLFVBQVUsTUFBTSxXQUFXO0FBQ2pDLFlBQU0sY0FBYztBQUNwQixZQUFNLGtCQUFrQjtBQUN4QixZQUFNLGlCQUFpQjtBQUN2QixZQUFNLHdCQUF3QjtBQUM5QixZQUFNLE9BQU87QUFDYixZQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ3pCLFlBQU0sVUFBVTtBQUNoQixZQUFNLGFBQWE7QUFDbkIsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sT0FBTyxNQUFNLFFBQVE7QUFDM0IsWUFBTSxTQUFTLE1BQU0sVUFBVTtBQUMvQixZQUFNLFNBQVMsTUFBTSxVQUFVO0FBQy9CLFlBQU0sY0FBYyxNQUFNLGVBQWU7QUFDekMsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sTUFBTTtBQUNaLFlBQU0sUUFBUTtBQUNkLFlBQU0sWUFBWTtBQUNsQixZQUFNLHVCQUF1QjtBQUM3QixZQUFNLFFBQVE7QUFDZCxZQUFNLFVBQVU7QUFDaEIsWUFBTSxjQUFjO0FBQ3BCLFlBQU0sUUFBUTtBQUNkLFlBQU0sUUFBUTtBQUNkLFlBQU0sV0FBVztBQUNqQixZQUFNLFdBQVc7QUFDakIsWUFBTSxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQ0EsWUFBTSxTQUFTO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQ0EsWUFBTSxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQ0EsWUFBTSxPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQ0EsWUFBTSxlQUFlO0FBQUEsUUFDakI7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUVBLGVBQVMsV0FBVyxPQUFPO0FBQ3ZCLGVBQU8sWUFBWSxRQUFRLEdBQUk7QUFBQSxNQUNuQztBQUVBLGVBQVMsZUFBZTtBQUNwQixlQUFPLFlBQVksTUFBTSxNQUFNLFNBQVMsRUFBRSxVQUFVO0FBQUEsTUFDeEQ7QUFFQSxlQUFTLG1CQUFtQixRQUFRO0FBQ2hDLGVBQU87QUFBQSxNQUNYO0FBRUEsVUFBSSxVQUFVLE9BQU87QUFFckIsY0FBUSxXQUFXO0FBQ25CLGNBQVEsaUJBQWlCO0FBQ3pCLGNBQVEsY0FBYztBQUN0QixjQUFRLFVBQVU7QUFDbEIsY0FBUSxXQUFXO0FBQ25CLGNBQVEsYUFBYTtBQUNyQixjQUFRLGVBQWU7QUFDdkIsY0FBUSxhQUFhO0FBQ3JCLGNBQVEsTUFBTTtBQUNkLGNBQVEsT0FBTztBQUNmLGNBQVEsWUFBWTtBQUNwQixjQUFRLGtCQUFrQjtBQUMxQixjQUFRLGdCQUFnQjtBQUN4QixjQUFRLGdCQUFnQjtBQUN4QixjQUFRLGtCQUFrQjtBQUUxQixjQUFRLFNBQVM7QUFDakIsY0FBUSxjQUFjO0FBQ3RCLGNBQVEsY0FBYztBQUN0QixjQUFRLGNBQWM7QUFDdEIsY0FBUSxtQkFBbUI7QUFDM0IsY0FBUSxPQUFPO0FBQ2YsY0FBUSxpQkFBaUI7QUFDekIsY0FBUSxpQkFBaUI7QUFFekIsY0FBUSxXQUFXO0FBQ25CLGNBQVEsY0FBYztBQUN0QixjQUFRLGdCQUFnQjtBQUN4QixjQUFRLGdCQUFnQjtBQUV4QixjQUFRLGdCQUFnQjtBQUN4QixjQUFRLHFCQUFxQjtBQUM3QixjQUFRLG1CQUFtQjtBQUUzQixjQUFRLE9BQU87QUFDZixjQUFRLFdBQVc7QUFFbkIsZUFBUyxNQUFNdkIsU0FBUSxPQUFPLE9BQU8sUUFBUTtBQUN6QyxZQUFJQyxVQUFTLFVBQVUsR0FDbkJ1QixPQUFNLFVBQVUsRUFBRSxJQUFJLFFBQVEsS0FBSztBQUN2QyxlQUFPdkIsUUFBTyxLQUFLLEVBQUV1QixNQUFLeEIsT0FBTTtBQUFBLE1BQ3BDO0FBRUEsZUFBUyxlQUFlQSxTQUFRLE9BQU8sT0FBTztBQUMxQyxZQUFJLFNBQVNBLE9BQU0sR0FBRztBQUNsQixrQkFBUUE7QUFDUixVQUFBQSxVQUFTO0FBQUEsUUFDYjtBQUVBLFFBQUFBLFVBQVNBLFdBQVU7QUFFbkIsWUFBSSxTQUFTLE1BQU07QUFDZixpQkFBTyxNQUFNQSxTQUFRLE9BQU8sT0FBTyxPQUFPO0FBQUEsUUFDOUM7QUFFQSxZQUFJLEdBQ0EsTUFBTSxDQUFDO0FBQ1gsYUFBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDckIsY0FBSSxDQUFDLElBQUksTUFBTUEsU0FBUSxHQUFHLE9BQU8sT0FBTztBQUFBLFFBQzVDO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFVQSxlQUFTLGlCQUFpQixjQUFjQSxTQUFRLE9BQU8sT0FBTztBQUMxRCxZQUFJLE9BQU8saUJBQWlCLFdBQVc7QUFDbkMsY0FBSSxTQUFTQSxPQUFNLEdBQUc7QUFDbEIsb0JBQVFBO0FBQ1IsWUFBQUEsVUFBUztBQUFBLFVBQ2I7QUFFQSxVQUFBQSxVQUFTQSxXQUFVO0FBQUEsUUFDdkIsT0FBTztBQUNILFVBQUFBLFVBQVM7QUFDVCxrQkFBUUE7QUFDUix5QkFBZTtBQUVmLGNBQUksU0FBU0EsT0FBTSxHQUFHO0FBQ2xCLG9CQUFRQTtBQUNSLFlBQUFBLFVBQVM7QUFBQSxVQUNiO0FBRUEsVUFBQUEsVUFBU0EsV0FBVTtBQUFBLFFBQ3ZCO0FBRUEsWUFBSUMsVUFBUyxVQUFVLEdBQ25CLFFBQVEsZUFBZUEsUUFBTyxNQUFNLE1BQU0sR0FDMUMsR0FDQSxNQUFNLENBQUM7QUFFWCxZQUFJLFNBQVMsTUFBTTtBQUNmLGlCQUFPLE1BQU1ELFVBQVMsUUFBUSxTQUFTLEdBQUcsT0FBTyxLQUFLO0FBQUEsUUFDMUQ7QUFFQSxhQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUNwQixjQUFJLENBQUMsSUFBSSxNQUFNQSxVQUFTLElBQUksU0FBUyxHQUFHLE9BQU8sS0FBSztBQUFBLFFBQ3hEO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLFdBQVdBLFNBQVEsT0FBTztBQUMvQixlQUFPLGVBQWVBLFNBQVEsT0FBTyxRQUFRO0FBQUEsTUFDakQ7QUFFQSxlQUFTLGdCQUFnQkEsU0FBUSxPQUFPO0FBQ3BDLGVBQU8sZUFBZUEsU0FBUSxPQUFPLGFBQWE7QUFBQSxNQUN0RDtBQUVBLGVBQVMsYUFBYSxjQUFjQSxTQUFRLE9BQU87QUFDL0MsZUFBTyxpQkFBaUIsY0FBY0EsU0FBUSxPQUFPLFVBQVU7QUFBQSxNQUNuRTtBQUVBLGVBQVMsa0JBQWtCLGNBQWNBLFNBQVEsT0FBTztBQUNwRCxlQUFPLGlCQUFpQixjQUFjQSxTQUFRLE9BQU8sZUFBZTtBQUFBLE1BQ3hFO0FBRUEsZUFBUyxnQkFBZ0IsY0FBY0EsU0FBUSxPQUFPO0FBQ2xELGVBQU8saUJBQWlCLGNBQWNBLFNBQVEsT0FBTyxhQUFhO0FBQUEsTUFDdEU7QUFFQSx5QkFBbUIsTUFBTTtBQUFBLFFBQ3JCLE1BQU07QUFBQSxVQUNGO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxRQUFRO0FBQUEsWUFDUixNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsWUFDUixNQUFNO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNJLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFFBQVE7QUFBQSxZQUNSLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxZQUNSLE1BQU07QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUFBLFFBQ0Esd0JBQXdCO0FBQUEsUUFDeEIsU0FBUyxTQUFVLFFBQVE7QUFDdkIsY0FBSSxJQUFJLFNBQVMsSUFDYixTQUNJLE1BQU8sU0FBUyxNQUFPLEVBQUUsTUFBTSxJQUN6QixPQUNBLE1BQU0sSUFDSixPQUNBLE1BQU0sSUFDSixPQUNBLE1BQU0sSUFDSixPQUNBO0FBQ3BCLGlCQUFPLFNBQVM7QUFBQSxRQUNwQjtBQUFBLE1BQ0osQ0FBQztBQUlELFlBQU0sT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUNBLFlBQU0sV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUVBLFVBQUksVUFBVSxLQUFLO0FBRW5CLGVBQVMsTUFBTTtBQUNYLFlBQUksT0FBTyxLQUFLO0FBRWhCLGFBQUssZ0JBQWdCLFFBQVEsS0FBSyxhQUFhO0FBQy9DLGFBQUssUUFBUSxRQUFRLEtBQUssS0FBSztBQUMvQixhQUFLLFVBQVUsUUFBUSxLQUFLLE9BQU87QUFFbkMsYUFBSyxlQUFlLFFBQVEsS0FBSyxZQUFZO0FBQzdDLGFBQUssVUFBVSxRQUFRLEtBQUssT0FBTztBQUNuQyxhQUFLLFVBQVUsUUFBUSxLQUFLLE9BQU87QUFDbkMsYUFBSyxRQUFRLFFBQVEsS0FBSyxLQUFLO0FBQy9CLGFBQUssU0FBUyxRQUFRLEtBQUssTUFBTTtBQUNqQyxhQUFLLFFBQVEsUUFBUSxLQUFLLEtBQUs7QUFFL0IsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLGNBQWMsVUFBVSxPQUFPLE9BQU8sV0FBVztBQUN0RCxZQUFJLFFBQVEsZUFBZSxPQUFPLEtBQUs7QUFFdkMsaUJBQVMsaUJBQWlCLFlBQVksTUFBTTtBQUM1QyxpQkFBUyxTQUFTLFlBQVksTUFBTTtBQUNwQyxpQkFBUyxXQUFXLFlBQVksTUFBTTtBQUV0QyxlQUFPLFNBQVMsUUFBUTtBQUFBLE1BQzVCO0FBR0EsZUFBUyxNQUFNLE9BQU8sT0FBTztBQUN6QixlQUFPLGNBQWMsTUFBTSxPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQzlDO0FBR0EsZUFBUyxXQUFXLE9BQU8sT0FBTztBQUM5QixlQUFPLGNBQWMsTUFBTSxPQUFPLE9BQU8sRUFBRTtBQUFBLE1BQy9DO0FBRUEsZUFBUyxRQUFRLFFBQVE7QUFDckIsWUFBSSxTQUFTLEdBQUc7QUFDWixpQkFBTyxLQUFLLE1BQU0sTUFBTTtBQUFBLFFBQzVCLE9BQU87QUFDSCxpQkFBTyxLQUFLLEtBQUssTUFBTTtBQUFBLFFBQzNCO0FBQUEsTUFDSjtBQUVBLGVBQVMsU0FBUztBQUNkLFlBQUlvQixnQkFBZSxLQUFLLGVBQ3BCRixRQUFPLEtBQUssT0FDWkYsVUFBUyxLQUFLLFNBQ2QsT0FBTyxLQUFLLE9BQ1pHLFVBQ0FQLFVBQ0FELFFBQ0FJLFFBQ0E7QUFJSixZQUNJLEVBQ0tLLGlCQUFnQixLQUFLRixTQUFRLEtBQUtGLFdBQVUsS0FDNUNJLGlCQUFnQixLQUFLRixTQUFRLEtBQUtGLFdBQVUsSUFFbkQ7QUFDRSxVQUFBSSxpQkFBZ0IsUUFBUSxhQUFhSixPQUFNLElBQUlFLEtBQUksSUFBSTtBQUN2RCxVQUFBQSxRQUFPO0FBQ1AsVUFBQUYsVUFBUztBQUFBLFFBQ2I7QUFJQSxhQUFLLGVBQWVJLGdCQUFlO0FBRW5DLFFBQUFELFdBQVUsU0FBU0MsZ0JBQWUsR0FBSTtBQUN0QyxhQUFLLFVBQVVELFdBQVU7QUFFekIsUUFBQVAsV0FBVSxTQUFTTyxXQUFVLEVBQUU7QUFDL0IsYUFBSyxVQUFVUCxXQUFVO0FBRXpCLFFBQUFELFNBQVEsU0FBU0MsV0FBVSxFQUFFO0FBQzdCLGFBQUssUUFBUUQsU0FBUTtBQUVyQixRQUFBTyxTQUFRLFNBQVNQLFNBQVEsRUFBRTtBQUczQix5QkFBaUIsU0FBUyxhQUFhTyxLQUFJLENBQUM7QUFDNUMsUUFBQUYsV0FBVTtBQUNWLFFBQUFFLFNBQVEsUUFBUSxhQUFhLGNBQWMsQ0FBQztBQUc1QyxRQUFBSCxTQUFRLFNBQVNDLFVBQVMsRUFBRTtBQUM1QixRQUFBQSxXQUFVO0FBRVYsYUFBSyxPQUFPRTtBQUNaLGFBQUssU0FBU0Y7QUFDZCxhQUFLLFFBQVFEO0FBRWIsZUFBTztBQUFBLE1BQ1g7QUFFQSxlQUFTLGFBQWFHLE9BQU07QUFHeEIsZUFBUUEsUUFBTyxPQUFRO0FBQUEsTUFDM0I7QUFFQSxlQUFTLGFBQWFGLFNBQVE7QUFFMUIsZUFBUUEsVUFBUyxTQUFVO0FBQUEsTUFDL0I7QUFFQSxlQUFTLEdBQUcsT0FBTztBQUNmLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTztBQUFBLFFBQ1g7QUFDQSxZQUFJRSxPQUNBRixTQUNBSSxnQkFBZSxLQUFLO0FBRXhCLGdCQUFRLGVBQWUsS0FBSztBQUU1QixZQUFJLFVBQVUsV0FBVyxVQUFVLGFBQWEsVUFBVSxRQUFRO0FBQzlELFVBQUFGLFFBQU8sS0FBSyxRQUFRRSxnQkFBZTtBQUNuQyxVQUFBSixVQUFTLEtBQUssVUFBVSxhQUFhRSxLQUFJO0FBQ3pDLGtCQUFRLE9BQU87QUFBQSxZQUNYLEtBQUs7QUFDRCxxQkFBT0Y7QUFBQSxZQUNYLEtBQUs7QUFDRCxxQkFBT0EsVUFBUztBQUFBLFlBQ3BCLEtBQUs7QUFDRCxxQkFBT0EsVUFBUztBQUFBLFVBQ3hCO0FBQUEsUUFDSixPQUFPO0FBRUgsVUFBQUUsUUFBTyxLQUFLLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSyxPQUFPLENBQUM7QUFDekQsa0JBQVEsT0FBTztBQUFBLFlBQ1gsS0FBSztBQUNELHFCQUFPQSxRQUFPLElBQUlFLGdCQUFlO0FBQUEsWUFDckMsS0FBSztBQUNELHFCQUFPRixRQUFPRSxnQkFBZTtBQUFBLFlBQ2pDLEtBQUs7QUFDRCxxQkFBT0YsUUFBTyxLQUFLRSxnQkFBZTtBQUFBLFlBQ3RDLEtBQUs7QUFDRCxxQkFBT0YsUUFBTyxPQUFPRSxnQkFBZTtBQUFBLFlBQ3hDLEtBQUs7QUFDRCxxQkFBT0YsUUFBTyxRQUFRRSxnQkFBZTtBQUFBO0FBQUEsWUFFekMsS0FBSztBQUNELHFCQUFPLEtBQUssTUFBTUYsUUFBTyxLQUFLLElBQUlFO0FBQUEsWUFDdEM7QUFDSSxvQkFBTSxJQUFJLE1BQU0sa0JBQWtCLEtBQUs7QUFBQSxVQUMvQztBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsZUFBUyxPQUFPLE9BQU87QUFDbkIsZUFBTyxXQUFZO0FBQ2YsaUJBQU8sS0FBSyxHQUFHLEtBQUs7QUFBQSxRQUN4QjtBQUFBLE1BQ0o7QUFFQSxVQUFJLGlCQUFpQixPQUFPLElBQUksR0FDNUIsWUFBWSxPQUFPLEdBQUcsR0FDdEIsWUFBWSxPQUFPLEdBQUcsR0FDdEIsVUFBVSxPQUFPLEdBQUcsR0FDcEIsU0FBUyxPQUFPLEdBQUcsR0FDbkIsVUFBVSxPQUFPLEdBQUcsR0FDcEIsV0FBVyxPQUFPLEdBQUcsR0FDckIsYUFBYSxPQUFPLEdBQUcsR0FDdkIsVUFBVSxPQUFPLEdBQUcsR0FDcEIsWUFBWTtBQUVoQixlQUFTLFVBQVU7QUFDZixlQUFPLGVBQWUsSUFBSTtBQUFBLE1BQzlCO0FBRUEsZUFBUyxNQUFNLE9BQU87QUFDbEIsZ0JBQVEsZUFBZSxLQUFLO0FBQzVCLGVBQU8sS0FBSyxRQUFRLElBQUksS0FBSyxRQUFRLEdBQUcsRUFBRSxJQUFJO0FBQUEsTUFDbEQ7QUFFQSxlQUFTLFdBQVcsTUFBTTtBQUN0QixlQUFPLFdBQVk7QUFDZixpQkFBTyxLQUFLLFFBQVEsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQUEsUUFDL0M7QUFBQSxNQUNKO0FBRUEsVUFBSSxlQUFlLFdBQVcsY0FBYyxHQUN4QyxVQUFVLFdBQVcsU0FBUyxHQUM5QixVQUFVLFdBQVcsU0FBUyxHQUM5QixRQUFRLFdBQVcsT0FBTyxHQUMxQixPQUFPLFdBQVcsTUFBTSxHQUN4QixTQUFTLFdBQVcsUUFBUSxHQUM1QixRQUFRLFdBQVcsT0FBTztBQUU5QixlQUFTLFFBQVE7QUFDYixlQUFPLFNBQVMsS0FBSyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ25DO0FBRUEsVUFBSSxRQUFRLEtBQUssT0FDYixhQUFhO0FBQUEsUUFDVCxJQUFJO0FBQUE7QUFBQSxRQUNKLEdBQUc7QUFBQTtBQUFBLFFBQ0gsR0FBRztBQUFBO0FBQUEsUUFDSCxHQUFHO0FBQUE7QUFBQSxRQUNILEdBQUc7QUFBQTtBQUFBLFFBQ0gsR0FBRztBQUFBO0FBQUEsUUFDSCxHQUFHO0FBQUE7QUFBQSxNQUNQO0FBR0osZUFBUyxrQkFBa0IsUUFBUSxRQUFRLGVBQWUsVUFBVW5CLFNBQVE7QUFDeEUsZUFBT0EsUUFBTyxhQUFhLFVBQVUsR0FBRyxDQUFDLENBQUMsZUFBZSxRQUFRLFFBQVE7QUFBQSxNQUM3RTtBQUVBLGVBQVMsZUFBZSxnQkFBZ0IsZUFBZXdCLGFBQVl4QixTQUFRO0FBQ3ZFLFlBQUksV0FBVyxlQUFlLGNBQWMsRUFBRSxJQUFJLEdBQzlDa0IsV0FBVSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FDaENQLFdBQVUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQ2hDRCxTQUFRLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUM5Qk8sUUFBTyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FDN0JGLFVBQVMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQy9CQyxTQUFRLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUM5QkYsU0FBUSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FDOUIsSUFDS0ksWUFBV00sWUFBVyxNQUFNLENBQUMsS0FBS04sUUFBTyxLQUN6Q0EsV0FBVU0sWUFBVyxLQUFLLENBQUMsTUFBTU4sUUFBTyxLQUN4Q1AsWUFBVyxLQUFLLENBQUMsR0FBRyxLQUNwQkEsV0FBVWEsWUFBVyxLQUFLLENBQUMsTUFBTWIsUUFBTyxLQUN4Q0QsVUFBUyxLQUFLLENBQUMsR0FBRyxLQUNsQkEsU0FBUWMsWUFBVyxLQUFLLENBQUMsTUFBTWQsTUFBSyxLQUNwQ08sU0FBUSxLQUFLLENBQUMsR0FBRyxLQUNqQkEsUUFBT08sWUFBVyxLQUFLLENBQUMsTUFBTVAsS0FBSTtBQUUzQyxZQUFJTyxZQUFXLEtBQUssTUFBTTtBQUN0QixjQUNJLEtBQ0NSLFVBQVMsS0FBSyxDQUFDLEdBQUcsS0FDbEJBLFNBQVFRLFlBQVcsS0FBSyxDQUFDLE1BQU1SLE1BQUs7QUFBQSxRQUM3QztBQUNBLFlBQUksS0FDQ0QsV0FBVSxLQUFLLENBQUMsR0FBRyxLQUNuQkEsVUFBU1MsWUFBVyxLQUFLLENBQUMsTUFBTVQsT0FBTSxLQUN0Q0QsVUFBUyxLQUFLLENBQUMsR0FBRyxLQUFNLENBQUMsTUFBTUEsTUFBSztBQUV6QyxVQUFFLENBQUMsSUFBSTtBQUNQLFVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCO0FBQ3pCLFVBQUUsQ0FBQyxJQUFJZDtBQUNQLGVBQU8sa0JBQWtCLE1BQU0sTUFBTSxDQUFDO0FBQUEsTUFDMUM7QUFHQSxlQUFTLDJCQUEyQixrQkFBa0I7QUFDbEQsWUFBSSxxQkFBcUIsUUFBVztBQUNoQyxpQkFBTztBQUFBLFFBQ1g7QUFDQSxZQUFJLE9BQU8scUJBQXFCLFlBQVk7QUFDeEMsa0JBQVE7QUFDUixpQkFBTztBQUFBLFFBQ1g7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUdBLGVBQVMsNEJBQTRCLFdBQVcsT0FBTztBQUNuRCxZQUFJLFdBQVcsU0FBUyxNQUFNLFFBQVc7QUFDckMsaUJBQU87QUFBQSxRQUNYO0FBQ0EsWUFBSSxVQUFVLFFBQVc7QUFDckIsaUJBQU8sV0FBVyxTQUFTO0FBQUEsUUFDL0I7QUFDQSxtQkFBVyxTQUFTLElBQUk7QUFDeEIsWUFBSSxjQUFjLEtBQUs7QUFDbkIscUJBQVcsS0FBSyxRQUFRO0FBQUEsUUFDNUI7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsU0FBUyxlQUFlLGVBQWU7QUFDNUMsWUFBSSxDQUFDLEtBQUssUUFBUSxHQUFHO0FBQ2pCLGlCQUFPLEtBQUssV0FBVyxFQUFFLFlBQVk7QUFBQSxRQUN6QztBQUVBLFlBQUksYUFBYSxPQUNiLEtBQUssWUFDTEEsU0FDQTtBQUVKLFlBQUksT0FBTyxrQkFBa0IsVUFBVTtBQUNuQywwQkFBZ0I7QUFDaEIsMEJBQWdCO0FBQUEsUUFDcEI7QUFDQSxZQUFJLE9BQU8sa0JBQWtCLFdBQVc7QUFDcEMsdUJBQWE7QUFBQSxRQUNqQjtBQUNBLFlBQUksT0FBTyxrQkFBa0IsVUFBVTtBQUNuQyxlQUFLLE9BQU8sT0FBTyxDQUFDLEdBQUcsWUFBWSxhQUFhO0FBQ2hELGNBQUksY0FBYyxLQUFLLFFBQVEsY0FBYyxNQUFNLE1BQU07QUFDckQsZUFBRyxLQUFLLGNBQWMsSUFBSTtBQUFBLFVBQzlCO0FBQUEsUUFDSjtBQUVBLFFBQUFBLFVBQVMsS0FBSyxXQUFXO0FBQ3pCLGlCQUFTLGVBQWUsTUFBTSxDQUFDLFlBQVksSUFBSUEsT0FBTTtBQUVyRCxZQUFJLFlBQVk7QUFDWixtQkFBU0EsUUFBTyxXQUFXLENBQUMsTUFBTSxNQUFNO0FBQUEsUUFDNUM7QUFFQSxlQUFPQSxRQUFPLFdBQVcsTUFBTTtBQUFBLE1BQ25DO0FBRUEsVUFBSSxRQUFRLEtBQUs7QUFFakIsZUFBUyxLQUFLLEdBQUc7QUFDYixnQkFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFBQSxNQUNqQztBQUVBLGVBQVMsZ0JBQWdCO0FBUXJCLFlBQUksQ0FBQyxLQUFLLFFBQVEsR0FBRztBQUNqQixpQkFBTyxLQUFLLFdBQVcsRUFBRSxZQUFZO0FBQUEsUUFDekM7QUFFQSxZQUFJa0IsV0FBVSxNQUFNLEtBQUssYUFBYSxJQUFJLEtBQ3RDRCxRQUFPLE1BQU0sS0FBSyxLQUFLLEdBQ3ZCRixVQUFTLE1BQU0sS0FBSyxPQUFPLEdBQzNCSixVQUNBRCxRQUNBSSxRQUNBLEdBQ0EsUUFBUSxLQUFLLFVBQVUsR0FDdkIsV0FDQSxRQUNBLFVBQ0E7QUFFSixZQUFJLENBQUMsT0FBTztBQUdSLGlCQUFPO0FBQUEsUUFDWDtBQUdBLFFBQUFILFdBQVUsU0FBU08sV0FBVSxFQUFFO0FBQy9CLFFBQUFSLFNBQVEsU0FBU0MsV0FBVSxFQUFFO0FBQzdCLFFBQUFPLFlBQVc7QUFDWCxRQUFBUCxZQUFXO0FBR1gsUUFBQUcsU0FBUSxTQUFTQyxVQUFTLEVBQUU7QUFDNUIsUUFBQUEsV0FBVTtBQUdWLFlBQUlHLFdBQVVBLFNBQVEsUUFBUSxDQUFDLEVBQUUsUUFBUSxVQUFVLEVBQUUsSUFBSTtBQUV6RCxvQkFBWSxRQUFRLElBQUksTUFBTTtBQUM5QixpQkFBUyxLQUFLLEtBQUssT0FBTyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU07QUFDcEQsbUJBQVcsS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNO0FBQ3BELGtCQUFVLEtBQUssS0FBSyxhQUFhLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTTtBQUUzRCxlQUNJLFlBQ0EsT0FDQ0osU0FBUSxTQUFTQSxTQUFRLE1BQU0sT0FDL0JDLFVBQVMsU0FBU0EsVUFBUyxNQUFNLE9BQ2pDRSxRQUFPLFdBQVdBLFFBQU8sTUFBTSxPQUMvQlAsVUFBU0MsWUFBV08sV0FBVSxNQUFNLE9BQ3BDUixTQUFRLFVBQVVBLFNBQVEsTUFBTSxPQUNoQ0MsV0FBVSxVQUFVQSxXQUFVLE1BQU0sT0FDcENPLFdBQVUsVUFBVSxJQUFJLE1BQU07QUFBQSxNQUV2QztBQUVBLFVBQUksVUFBVSxTQUFTO0FBRXZCLGNBQVEsVUFBVTtBQUNsQixjQUFRLE1BQU07QUFDZCxjQUFRLE1BQU07QUFDZCxjQUFRLFdBQVc7QUFDbkIsY0FBUSxLQUFLO0FBQ2IsY0FBUSxpQkFBaUI7QUFDekIsY0FBUSxZQUFZO0FBQ3BCLGNBQVEsWUFBWTtBQUNwQixjQUFRLFVBQVU7QUFDbEIsY0FBUSxTQUFTO0FBQ2pCLGNBQVEsVUFBVTtBQUNsQixjQUFRLFdBQVc7QUFDbkIsY0FBUSxhQUFhO0FBQ3JCLGNBQVEsVUFBVTtBQUNsQixjQUFRLFVBQVU7QUFDbEIsY0FBUSxVQUFVO0FBQ2xCLGNBQVEsUUFBUTtBQUNoQixjQUFRLE1BQU07QUFDZCxjQUFRLGVBQWU7QUFDdkIsY0FBUSxVQUFVO0FBQ2xCLGNBQVEsVUFBVTtBQUNsQixjQUFRLFFBQVE7QUFDaEIsY0FBUSxPQUFPO0FBQ2YsY0FBUSxRQUFRO0FBQ2hCLGNBQVEsU0FBUztBQUNqQixjQUFRLFFBQVE7QUFDaEIsY0FBUSxXQUFXO0FBQ25CLGNBQVEsY0FBYztBQUN0QixjQUFRLFdBQVc7QUFDbkIsY0FBUSxTQUFTO0FBQ2pCLGNBQVEsU0FBUztBQUNqQixjQUFRLGFBQWE7QUFFckIsY0FBUSxjQUFjO0FBQUEsUUFDbEI7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUNBLGNBQVEsT0FBTztBQUlmLHFCQUFlLEtBQUssR0FBRyxHQUFHLE1BQU07QUFDaEMscUJBQWUsS0FBSyxHQUFHLEdBQUcsU0FBUztBQUluQyxvQkFBYyxLQUFLLFdBQVc7QUFDOUIsb0JBQWMsS0FBSyxjQUFjO0FBQ2pDLG9CQUFjLEtBQUssU0FBVSxPQUFPLE9BQU8sUUFBUTtBQUMvQyxlQUFPLEtBQUssSUFBSSxLQUFLLFdBQVcsS0FBSyxJQUFJLEdBQUk7QUFBQSxNQUNqRCxDQUFDO0FBQ0Qsb0JBQWMsS0FBSyxTQUFVLE9BQU8sT0FBTyxRQUFRO0FBQy9DLGVBQU8sS0FBSyxJQUFJLEtBQUssTUFBTSxLQUFLLENBQUM7QUFBQSxNQUNyQyxDQUFDO0FBSUQsWUFBTSxVQUFVO0FBRWhCLHNCQUFnQixXQUFXO0FBRTNCLFlBQU0sS0FBSztBQUNYLFlBQU0sTUFBTTtBQUNaLFlBQU0sTUFBTTtBQUNaLFlBQU0sTUFBTTtBQUNaLFlBQU0sTUFBTTtBQUNaLFlBQU0sT0FBTztBQUNiLFlBQU0sU0FBUztBQUNmLFlBQU0sU0FBUztBQUNmLFlBQU0sU0FBUztBQUNmLFlBQU0sVUFBVTtBQUNoQixZQUFNLFdBQVc7QUFDakIsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sV0FBVztBQUNqQixZQUFNLFlBQVk7QUFDbEIsWUFBTSxhQUFhO0FBQ25CLFlBQU0sYUFBYTtBQUNuQixZQUFNLGNBQWM7QUFDcEIsWUFBTSxjQUFjO0FBQ3BCLFlBQU0sZUFBZTtBQUNyQixZQUFNLGVBQWU7QUFDckIsWUFBTSxVQUFVO0FBQ2hCLFlBQU0sZ0JBQWdCO0FBQ3RCLFlBQU0saUJBQWlCO0FBQ3ZCLFlBQU0sdUJBQXVCO0FBQzdCLFlBQU0sd0JBQXdCO0FBQzlCLFlBQU0saUJBQWlCO0FBQ3ZCLFlBQU0sWUFBWTtBQUdsQixZQUFNLFlBQVk7QUFBQSxRQUNkLGdCQUFnQjtBQUFBO0FBQUEsUUFDaEIsd0JBQXdCO0FBQUE7QUFBQSxRQUN4QixtQkFBbUI7QUFBQTtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBLFFBQ04sTUFBTTtBQUFBO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxRQUNkLFNBQVM7QUFBQTtBQUFBLFFBQ1QsTUFBTTtBQUFBO0FBQUEsUUFDTixPQUFPO0FBQUE7QUFBQSxNQUNYO0FBRUEsYUFBTztBQUFBLElBRVgsQ0FBRTtBQUFBO0FBQUE7OztBQ3ZqTEYsbUJBQWtCO0FBQ2xCLGlCQUFnQjtBQUNoQixzQkFBcUI7QUFDckIsK0JBQThCO0FBQzlCLDJCQUEwQjtBQUMxQiw0QkFBMkI7OztBQ00zQixvQkFBbUI7QUFFbkIsSUFBcUIsa0JBQXJCLE1BQXFDO0FBQUEsRUFFakMsWUFBWSxTQUFTLFNBQVMsSUFBSTtBQUc5QixTQUFLLFdBQVcsU0FBUztBQUN6QixRQUFJLE9BQU8sWUFBWTtBQUNuQixXQUFLLFVBQVUsU0FBUyxlQUFlLE9BQU87QUFBQTtBQUU5QyxXQUFLLFVBQVU7QUFDbkIsU0FBSyxnQkFBWSxjQUFBTyxTQUFPLEVBQUUsUUFBUSxLQUFLO0FBQ3ZDLFNBQUssY0FBVSxjQUFBQSxTQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ25DLFNBQUssVUFBVTtBQUNmLFNBQUssVUFBVTtBQUNmLFNBQUssVUFBVTtBQUNmLFNBQUssWUFBWTtBQUNqQixTQUFLLG1CQUFtQjtBQUN4QixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGNBQVUsY0FBQUEsU0FBTyxFQUFFLFNBQVMsS0FBSyxNQUFNLEVBQUUsT0FBTyxNQUFNO0FBQzNELFNBQUssY0FBVSxjQUFBQSxTQUFPLEVBQUUsSUFBSSxLQUFLLE1BQU0sRUFBRSxPQUFPLE1BQU07QUFDdEQsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxhQUFhO0FBQ2xCLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssc0JBQXNCO0FBQzNCLFNBQUssb0JBQW9CO0FBQ3pCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssc0JBQXNCO0FBQzNCLFNBQUssU0FBUyxDQUFDO0FBRWYsU0FBSyxRQUFRO0FBQ2IsUUFBSSxLQUFLLFFBQVEsVUFBVSxTQUFTLFlBQVk7QUFDNUMsV0FBSyxRQUFRO0FBRWpCLFNBQUssUUFBUTtBQUNiLFFBQUksS0FBSyxRQUFRLFVBQVUsU0FBUyxRQUFRO0FBQ3hDLFdBQUssUUFBUTtBQUVqQixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLHFCQUFxQjtBQUMxQixTQUFLLHNCQUFzQjtBQUUzQixTQUFLLFNBQVM7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFFBQVEsY0FBQUEsUUFBTyxXQUFXLEVBQUUsZUFBZSxHQUFHO0FBQUEsTUFDOUMsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsWUFBWSxjQUFBQSxRQUFPLFlBQVk7QUFBQSxNQUMvQixZQUFZLGNBQUFBLFFBQU8sWUFBWTtBQUFBLE1BQy9CLFVBQVUsY0FBQUEsUUFBTyxXQUFXLEVBQUUsZUFBZTtBQUFBLElBQ2pEO0FBRUEsU0FBSyxXQUFXLFdBQVc7QUFBQSxJQUFFO0FBRzdCLFNBQUssWUFBWTtBQUNqQixTQUFLLGVBQWUsQ0FBQztBQUNyQixTQUFLLGdCQUFnQixDQUFDO0FBR3RCLFFBQUksT0FBTyxZQUFZLFlBQVksWUFBWTtBQUMzQyxnQkFBVSxDQUFDO0FBSWYsY0FBVSxPQUFPLE9BQU8sT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVEsT0FBTyxHQUFHLE9BQU87QUFHeEUsUUFBSSxPQUFPLFFBQVEsYUFBYTtBQUM1QixjQUFRLFdBQ0o7QUFpQlIsU0FBSyxXQUFXLFFBQVEsV0FBVyxRQUFRLFdBQVcsS0FBSztBQUMzRCxRQUFJLGlCQUFpQixTQUFTLGNBQWMsS0FBSztBQUNqRCxtQkFBZSxZQUFZLFFBQVEsU0FBUyxLQUFLO0FBQ2pELFNBQUssWUFBWSxlQUFlO0FBQ2hDLFNBQUssU0FBUyxzQkFBc0IsYUFBYSxLQUFLLFNBQVM7QUFNL0QsUUFBSSxPQUFPLFFBQVEsV0FBVyxVQUFVO0FBRXBDLFVBQUksT0FBTyxRQUFRLE9BQU8sY0FBYztBQUNwQyxhQUFLLE9BQU8sWUFBWSxRQUFRLE9BQU87QUFFM0MsVUFBSSxPQUFPLFFBQVEsT0FBTyxXQUFXO0FBQ2pDLGFBQUssT0FBTyxTQUFTLFFBQVEsT0FBTztBQUV4QyxVQUFJLE9BQU8sUUFBUSxPQUFPLGNBQWM7QUFDcEMsYUFBSyxPQUFPLFlBQVksUUFBUSxPQUFPO0FBRTNDLFVBQUksT0FBTyxRQUFRLE9BQU8sZUFBZTtBQUNyQyxhQUFLLE9BQU8sYUFBYSxRQUFRLE9BQU8sV0FBVyxNQUFNO0FBRTdELFVBQUksT0FBTyxRQUFRLE9BQU8sZUFBZTtBQUNyQyxhQUFLLE9BQU8sYUFBYSxRQUFRLE9BQU8sV0FBVyxNQUFNO0FBRTdELFVBQUksT0FBTyxRQUFRLE9BQU8sYUFBYTtBQUNuQyxhQUFLLE9BQU8sV0FBVyxRQUFRLE9BQU87QUFFMUMsVUFBSSxPQUFPLFFBQVEsT0FBTyxlQUFlO0FBQ3JDLGFBQUssT0FBTyxhQUFhLFFBQVEsT0FBTztBQUU1QyxVQUFJLE9BQU8sUUFBUSxPQUFPLGdCQUFnQjtBQUN0QyxhQUFLLE9BQU8sY0FBYyxRQUFRLE9BQU87QUFFN0MsVUFBSSxPQUFPLFFBQVEsT0FBTyxjQUFjO0FBQ3BDLGFBQUssT0FBTyxZQUFZLFFBQVEsT0FBTztBQUUzQyxVQUFJLE9BQU8sUUFBUSxPQUFPLHFCQUFxQixVQUFTO0FBRXBELFlBQUksT0FBTyxTQUFTLGNBQWMsVUFBVTtBQUM1QyxhQUFLLFlBQVksUUFBUSxPQUFPO0FBQ2hDLGFBQUssT0FBTyxtQkFBbUIsS0FBSztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUNBLFNBQUssVUFBVSxVQUFVLElBQUksS0FBSyxPQUFPLFNBQVM7QUFFbEQsUUFBSSxPQUFPLFFBQVEsY0FBYztBQUM3QixXQUFLLGdCQUFZLGNBQUFBLFNBQU8sUUFBUSxXQUFXLEtBQUssT0FBTyxNQUFNO0FBRWpFLFFBQUksT0FBTyxRQUFRLFlBQVk7QUFDM0IsV0FBSyxjQUFVLGNBQUFBLFNBQU8sUUFBUSxTQUFTLEtBQUssT0FBTyxNQUFNO0FBRTdELFFBQUksT0FBTyxRQUFRLFlBQVk7QUFDM0IsV0FBSyxjQUFVLGNBQUFBLFNBQU8sUUFBUSxTQUFTLEtBQUssT0FBTyxNQUFNO0FBRTdELFFBQUksT0FBTyxRQUFRLFlBQVk7QUFDM0IsV0FBSyxjQUFVLGNBQUFBLFNBQU8sUUFBUSxTQUFTLEtBQUssT0FBTyxNQUFNO0FBRTdELFFBQUksT0FBTyxRQUFRLGNBQWM7QUFDN0IsV0FBSyxnQkFBWSxjQUFBQSxTQUFPLFFBQVEsU0FBUztBQUU3QyxRQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzNCLFdBQUssY0FBVSxjQUFBQSxTQUFPLFFBQVEsT0FBTztBQUV6QyxRQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzNCLFdBQUssY0FBVSxjQUFBQSxTQUFPLFFBQVEsT0FBTztBQUV6QyxRQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzNCLFdBQUssY0FBVSxjQUFBQSxTQUFPLFFBQVEsT0FBTztBQUd6QyxRQUFJLEtBQUssV0FBVyxLQUFLLFVBQVUsU0FBUyxLQUFLLE9BQU87QUFDcEQsV0FBSyxZQUFZLEtBQUssUUFBUSxNQUFNO0FBR3hDLFFBQUksS0FBSyxXQUFXLEtBQUssUUFBUSxRQUFRLEtBQUssT0FBTztBQUNqRCxXQUFLLFVBQVUsS0FBSyxRQUFRLE1BQU07QUFFdEMsUUFBSSxPQUFPLFFBQVEsdUJBQXVCO0FBQ3RDLFdBQUsscUJBQXFCLFFBQVE7QUFFdEMsUUFBSSxPQUFPLFFBQVEsZUFBZTtBQUM5QixXQUFLLHFCQUFxQixRQUFRO0FBRXRDLFFBQUksT0FBTyxRQUFRLHdCQUF3QjtBQUN2QyxXQUFLLHNCQUFzQixRQUFRO0FBRXZDLFFBQUksT0FBTyxRQUFRLGdCQUFnQjtBQUMvQixXQUFLLHNCQUFzQixRQUFRO0FBRXZDLFFBQUksT0FBTyxRQUFRLFlBQVk7QUFDM0IsV0FBSyxVQUFVLFFBQVE7QUFFM0IsUUFBSSxPQUFPLFFBQVEsY0FBYztBQUM3QixXQUFLLFVBQVUsUUFBUTtBQUUzQixRQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFdBQUssUUFBUSxRQUFRO0FBRXpCLFFBQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsV0FBSyxRQUFRLFFBQVE7QUFFekIsUUFBSSxPQUFPLFFBQVEsb0JBQW9CO0FBQ25DLFdBQUssa0JBQWtCLFFBQVE7QUFFbkMsUUFBSSxPQUFPLFFBQVEsdUJBQXVCO0FBQ3RDLFdBQUsscUJBQXFCLFFBQVE7QUFFdEMsUUFBSSxPQUFPLFFBQVEsa0JBQWtCO0FBQ2pDLFdBQUssZ0JBQWdCLFFBQVE7QUFFakMsUUFBSSxPQUFPLFFBQVEsa0JBQWtCO0FBQ2pDLFdBQUssZ0JBQWdCLFFBQVEsY0FBYyxLQUFLLEdBQUc7QUFFdkQsUUFBSSxPQUFPLFFBQVEsa0JBQWtCO0FBQ2pDLFdBQUssZ0JBQWdCLFFBQVE7QUFFakMsUUFBSSxPQUFPLFFBQVEsWUFBWTtBQUMzQixXQUFLLFVBQVUsUUFBUTtBQUUzQixRQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzNCLFdBQUssVUFBVSxRQUFRO0FBRTNCLFFBQUksT0FBTyxRQUFRLHlCQUF5QjtBQUN4QyxXQUFLLHVCQUF1QixRQUFRO0FBRXhDLFFBQUksT0FBTyxRQUFRLHFCQUFxQixXQUFXO0FBQy9DLFdBQUssbUJBQW1CLFFBQVE7QUFDaEMsVUFBSSxLQUFLO0FBQ0wsYUFBSyxVQUFVLEtBQUssVUFBVSxNQUFNO0FBQUEsSUFDNUM7QUFFQSxRQUFJLE9BQU8sUUFBUSxlQUFlO0FBQzlCLFdBQUssYUFBYSxRQUFRO0FBRTlCLFFBQUksT0FBTyxRQUFRLHNCQUFzQjtBQUNyQyxXQUFLLG9CQUFvQixRQUFRO0FBRXJDLFFBQUksT0FBTyxRQUFRLHdCQUF3QjtBQUN2QyxXQUFLLHNCQUFzQixRQUFRO0FBRXZDLFFBQUksT0FBTyxRQUFRLHFCQUFxQjtBQUNwQyxXQUFLLG1CQUFtQixRQUFRO0FBRXBDLFFBQUksT0FBTyxRQUFRLGNBQWM7QUFDN0IsV0FBSyxZQUFZLFFBQVE7QUFFN0IsUUFBSSxPQUFPLFFBQVEsb0JBQW9CO0FBQ25DLFdBQUssa0JBQWtCLFFBQVE7QUFFbkMsUUFBSSxPQUFPLFFBQVEsb0JBQW9CO0FBQ25DLFdBQUssa0JBQWtCLFFBQVE7QUFFbkMsUUFBSSxPQUFPLFFBQVEsa0JBQWtCO0FBQ2pDLFdBQUssZ0JBQWdCLFFBQVE7QUFFakMsUUFBSSxPQUFPLFFBQVEsaUJBQWlCO0FBQ2hDLFdBQUssZUFBZSxRQUFRO0FBRWhDLFFBQUksT0FBTyxRQUFRLHdCQUF3QjtBQUN2QyxXQUFLLHNCQUFzQixRQUFRO0FBR3ZDLFFBQUksS0FBSyxPQUFPLGFBQWEsR0FBRztBQUM1QixVQUFJLFdBQVcsS0FBSyxPQUFPO0FBQzNCLGFBQU8sV0FBVyxHQUFHO0FBQ2pCLGFBQUssT0FBTyxXQUFXLEtBQUssS0FBSyxPQUFPLFdBQVcsTUFBTSxDQUFDO0FBQzFEO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFFQSxRQUFJLE9BQU8sS0FBSztBQUdoQixRQUFJLE9BQU8sUUFBUSxjQUFjLGVBQWUsT0FBTyxRQUFRLFlBQVksYUFBYTtBQUNwRixVQUFHLEtBQUssUUFBUSxZQUFZLFdBQVcsS0FBSyxRQUFRLFNBQVMsUUFBTztBQUNoRSxZQUFJLE1BQU0sS0FBSyxRQUFRLE9BQ25CLFFBQVEsSUFBSSxNQUFNLEtBQUssT0FBTyxTQUFTO0FBRTNDLGdCQUFRLE1BQU07QUFFZCxZQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3BCLHNCQUFRLGNBQUFBLFNBQU8sTUFBTSxDQUFDLEdBQUcsS0FBSyxPQUFPLE1BQU07QUFDM0Msb0JBQU0sY0FBQUEsU0FBTyxNQUFNLENBQUMsR0FBRyxLQUFLLE9BQU8sTUFBTTtBQUFBLFFBQzdDLFdBQVcsS0FBSyxvQkFBb0IsUUFBUSxJQUFJO0FBQzVDLHNCQUFRLGNBQUFBLFNBQU8sS0FBSyxLQUFLLE9BQU8sTUFBTTtBQUN0QyxvQkFBTSxjQUFBQSxTQUFPLEtBQUssS0FBSyxPQUFPLE1BQU07QUFBQSxRQUN4QztBQUNBLFlBQUksVUFBVSxRQUFRLFFBQVEsTUFBTTtBQUNoQyxlQUFLLGFBQWEsS0FBSztBQUN2QixlQUFLLFdBQVcsR0FBRztBQUFBLFFBQ3ZCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFFQSxRQUFJLE9BQU8sUUFBUSxXQUFXLFVBQVU7QUFDcEMsVUFBSSxhQUFhLE9BQU8sS0FBSyxRQUFRLE1BQU07QUFDM0MsZUFBUSxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsRUFBRSxHQUFFO0FBQ3RDLFlBQUlDLFNBQVEsV0FBVyxDQUFDO0FBRXhCLFlBQUksT0FBTyxRQUFRLE9BQU9BLE1BQUssRUFBRSxDQUFDLE1BQU07QUFDcEMsc0JBQVEsY0FBQUQsU0FBTyxRQUFRLE9BQU9DLE1BQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLE1BQU07QUFBQTtBQUUzRCxzQkFBUSxjQUFBRCxTQUFPLFFBQVEsT0FBT0MsTUFBSyxFQUFFLENBQUMsQ0FBQztBQUUzQyxZQUFJLE9BQU8sUUFBUSxPQUFPQSxNQUFLLEVBQUUsQ0FBQyxNQUFNO0FBQ3BDLG9CQUFNLGNBQUFELFNBQU8sUUFBUSxPQUFPQyxNQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssT0FBTyxNQUFNO0FBQUE7QUFFekQsb0JBQU0sY0FBQUQsU0FBTyxRQUFRLE9BQU9DLE1BQUssRUFBRSxDQUFDLENBQUM7QUFJekMsWUFBSSxLQUFLLFdBQVcsTUFBTSxTQUFTLEtBQUssT0FBTztBQUMzQyxrQkFBUSxLQUFLLFFBQVEsTUFBTTtBQUUvQixZQUFJLFVBQVUsS0FBSztBQUNuQixZQUFJLEtBQUssV0FBVyxXQUFXLE1BQU0sTUFBTSxFQUFFLElBQUksS0FBSyxPQUFPLEVBQUUsUUFBUSxPQUFPO0FBQzFFLG9CQUFVLE1BQU0sTUFBTSxFQUFFLElBQUksS0FBSyxPQUFPO0FBQzVDLFlBQUksV0FBVyxJQUFJLFFBQVEsT0FBTztBQUM5QixnQkFBTSxRQUFRLE1BQU07QUFJeEIsWUFBSyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssU0FBUyxLQUFLLGFBQWEsV0FBVyxLQUFLLEtBQzFFLFdBQVcsTUFBTSxRQUFRLFNBQVMsS0FBSyxhQUFhLFdBQVcsS0FBSztBQUN4RTtBQUdKLFlBQUksT0FBTyxTQUFTLGNBQWMsVUFBVTtBQUM1QyxhQUFLLFlBQVlBO0FBQ2pCLFlBQUksWUFBWSxLQUFLO0FBRXJCLGFBQUssT0FBTyxTQUFTLElBQUksQ0FBQyxPQUFPLEdBQUc7QUFBQSxNQUN4QztBQUVBLFVBQUksT0FBTztBQUNYLFdBQUssU0FBUyxLQUFLLFFBQVE7QUFDdkIsZ0JBQVEseUJBQXlCLFFBQVEsT0FBTyxRQUFRO0FBQUEsTUFDNUQ7QUFDQSxVQUFJLEtBQUssc0JBQXNCO0FBQzNCLGdCQUFRLHlCQUF5QixLQUFLLE9BQU8sbUJBQW1CLE9BQU8sS0FBSyxPQUFPLG1CQUFtQjtBQUFBLE1BQzFHO0FBQ0EsY0FBUTtBQUNSLFdBQUssVUFBVSxjQUFjLFNBQVMsRUFBRSxtQkFBbUIsY0FBYyxJQUFJO0FBQUEsSUFDakY7QUFFQSxRQUFJLE9BQU8sT0FBTyxZQUFZO0FBQzFCLFdBQUssV0FBVztBQUFBLElBQ3BCO0FBRUEsUUFBSSxDQUFDLEtBQUssWUFBWTtBQUNsQixXQUFLLFlBQVksS0FBSyxVQUFVLFFBQVEsS0FBSztBQUM3QyxXQUFLLFVBQVUsS0FBSyxRQUFRLE1BQU0sS0FBSztBQUN2QyxXQUFLLFVBQVUsTUFBTSxVQUFVO0FBQy9CLFdBQUssVUFBVSxjQUFjLGdCQUFnQixFQUFFO0FBQUEsSUFDbkQ7QUFHQSxRQUFJLEtBQUssY0FBYyxLQUFLO0FBQ3hCLFdBQUssWUFBWTtBQUVyQixRQUFJLEtBQUssV0FBVztBQUNoQixXQUFLLFVBQVUsVUFBVSxJQUFJLFlBQVk7QUFBQSxJQUM3QztBQUVBLFFBQUksT0FBTyxRQUFRLFdBQVc7QUFDMUIsV0FBSyxVQUFVLFVBQVUsSUFBSSxhQUFhO0FBRTlDLFFBQUksS0FBSyxrQkFBa0I7QUFDdkIsV0FBSyxVQUFVLFVBQVUsSUFBSSxRQUFRO0FBRXJDLFdBQUssVUFBVSxjQUFjLG9CQUFvQixFQUFFLFVBQVUsSUFBSSxRQUFRO0FBQ3pFLFdBQUssVUFBVSxjQUFjLG9CQUFvQixFQUFFLE1BQU0sVUFBVTtBQUNuRSxXQUFLLFVBQVUsY0FBYyxxQkFBcUIsRUFBRSxNQUFNLFVBQVU7QUFDcEUsVUFBSSxDQUFDLEtBQUssY0FBYyxLQUFLLFdBQVc7QUFDcEMsYUFBSyxVQUFVLFVBQVUsSUFBSSxZQUFZO0FBQUEsTUFDN0M7QUFBQSxJQUNKO0FBRUEsUUFBSyxPQUFPLFFBQVEsV0FBVyxlQUFlLENBQUMsS0FBSyxvQkFBcUIsS0FBSyxxQkFBcUI7QUFDL0YsV0FBSyxVQUFVLFVBQVUsSUFBSSxlQUFlO0FBQUEsSUFDaEQ7QUFFQSxTQUFLLFVBQVUsVUFBVSxJQUFJLFVBQVUsS0FBSyxLQUFLO0FBR2pELFFBQUksYUFBYSxLQUFLLFVBQVUsY0FBYyxXQUFXO0FBQ3pELFFBQUksY0FBYyxLQUFLLFVBQVUsY0FBYyxZQUFZO0FBQzNELE9BQUcsU0FBUyxZQUFZLEtBQUssYUFBYTtBQUMxQyxPQUFHLFNBQVMsYUFBYSxLQUFLLGFBQWE7QUFDM0MsUUFBSSxLQUFLLG1CQUFtQjtBQUN4QixTQUFHLFNBQVMsWUFBWSxLQUFLLGtCQUFrQjtBQUNuRCxRQUFJLEtBQUssb0JBQW9CO0FBQ3pCLFNBQUcsU0FBUyxhQUFhLEtBQUssbUJBQW1CO0FBQ3JELE9BQUcsS0FBSyxZQUFZLEtBQUssT0FBTyxVQUFVO0FBQzFDLE9BQUcsS0FBSyxhQUFhLEtBQUssT0FBTyxXQUFXO0FBa0I1QyxTQUFLLGtCQUFrQixTQUFVLEdBQUc7QUFBRSxXQUFLLFdBQVcsQ0FBQztBQUFBLElBQUcsRUFBRSxLQUFLLElBQUk7QUFDckUsT0FBRyxHQUFHLEtBQUssVUFBVSxjQUFjLFNBQVMsR0FBRyxTQUFTLE1BQU0sS0FBSyxlQUFlO0FBRWxGLFFBQUksZUFBZSxLQUFLLFVBQVUsY0FBYyxjQUFjO0FBQzlELFNBQUssa0JBQWtCLFNBQVUsR0FBRztBQUFFLFdBQUssV0FBVyxDQUFDO0FBQUEsSUFBRyxFQUFFLEtBQUssSUFBSTtBQUNyRSxPQUFHLEdBQUcsY0FBYyxTQUFTLG1CQUFtQixLQUFLLGVBQWU7QUFDcEUsU0FBSyxtQkFBbUIsU0FBVSxHQUFHO0FBQUUsV0FBSyxZQUFZLENBQUM7QUFBQSxJQUFHLEVBQUUsS0FBSyxJQUFJO0FBQ3ZFLE9BQUcsR0FBRyxjQUFjLFNBQVMsb0JBQW9CLEtBQUssZ0JBQWdCO0FBRXRFLFFBQUksS0FBSyxRQUFRLFlBQVksV0FBVyxLQUFLLFFBQVEsWUFBWSxVQUFVO0FBQ3ZFLFdBQUssWUFBWSxTQUFVLEdBQUc7QUFBRSxhQUFLLEtBQUssQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDekQsU0FBRyxHQUFHLEtBQUssU0FBUyxTQUFTLEtBQUssU0FBUztBQUMzQyxTQUFHLEdBQUcsS0FBSyxTQUFTLFNBQVMsS0FBSyxTQUFTO0FBQzNDLFdBQUssc0JBQXNCLFNBQVUsR0FBRztBQUFFLGFBQUssZUFBZSxDQUFDO0FBQUEsTUFBRyxFQUFFLEtBQUssSUFBSTtBQUM3RSxTQUFHLEdBQUcsS0FBSyxTQUFTLFNBQVMsS0FBSyxtQkFBbUI7QUFDckQsV0FBSyxlQUFlLFNBQVUsR0FBRztBQUFFLGFBQUssUUFBUSxDQUFDO0FBQUEsTUFBRyxFQUFFLEtBQUssSUFBSTtBQUMvRCxTQUFHLEdBQUcsS0FBSyxTQUFTLFdBQVcsS0FBSyxZQUFZO0FBQUEsSUFDcEQsT0FBTztBQUNILFdBQUssY0FBYyxTQUFVLEdBQUc7QUFBRSxhQUFLLE9BQU8sQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDN0QsU0FBRyxHQUFHLEtBQUssU0FBUyxTQUFTLEtBQUssV0FBVztBQUM3QyxTQUFHLEdBQUcsS0FBSyxTQUFTLFdBQVcsS0FBSyxXQUFXO0FBQUEsSUFDbkQ7QUFNQSxTQUFLLGNBQWM7QUFBQSxFQUV2QjtBQUFBLEVBRUEsYUFBYSxXQUFXO0FBQ3BCLFFBQUksT0FBTyxjQUFjO0FBQ3JCLFdBQUssZ0JBQVksY0FBQUQsU0FBTyxXQUFXLEtBQUssT0FBTyxNQUFNO0FBRXpELFFBQUksT0FBTyxjQUFjO0FBQ3JCLFdBQUssZ0JBQVksY0FBQUEsU0FBTyxTQUFTO0FBRXJDLFFBQUksQ0FBQyxLQUFLO0FBQ04sV0FBSyxZQUFZLEtBQUssVUFBVSxRQUFRLEtBQUs7QUFFakQsUUFBSSxLQUFLLGNBQWMsS0FBSztBQUN4QixXQUFLLFVBQVUsT0FBTyxLQUFLLE1BQU0sS0FBSyxVQUFVLE9BQU8sSUFBSSxLQUFLLG1CQUFtQixJQUFJLEtBQUssbUJBQW1CO0FBRW5ILFFBQUksS0FBSyxXQUFXLEtBQUssVUFBVSxTQUFTLEtBQUssT0FBTyxHQUFHO0FBQ3ZELFdBQUssWUFBWSxLQUFLLFFBQVEsTUFBTTtBQUNwQyxVQUFJLEtBQUssY0FBYyxLQUFLO0FBQ3hCLGFBQUssVUFBVSxPQUFPLEtBQUssTUFBTSxLQUFLLFVBQVUsT0FBTyxJQUFJLEtBQUssbUJBQW1CLElBQUksS0FBSyxtQkFBbUI7QUFBQSxJQUN2SDtBQUVBLFFBQUksS0FBSyxXQUFXLEtBQUssVUFBVSxRQUFRLEtBQUssT0FBTyxHQUFHO0FBQ3RELFdBQUssWUFBWSxLQUFLLFFBQVEsTUFBTTtBQUNwQyxVQUFJLEtBQUssY0FBYyxLQUFLO0FBQ3hCLGFBQUssVUFBVSxPQUFPLEtBQUssTUFBTSxLQUFLLFVBQVUsT0FBTyxJQUFJLEtBQUssbUJBQW1CLElBQUksS0FBSyxtQkFBbUI7QUFBQSxJQUN2SDtBQUVBLFFBQUksQ0FBQyxLQUFLO0FBQ04sV0FBSyxjQUFjO0FBRXZCLFNBQUssbUJBQW1CO0FBQUEsRUFDNUI7QUFBQSxFQUVBLFdBQVcsU0FBUztBQUNoQixRQUFJLE9BQU8sWUFBWTtBQUNuQixXQUFLLGNBQVUsY0FBQUEsU0FBTyxTQUFTLEtBQUssT0FBTyxNQUFNO0FBRXJELFFBQUksT0FBTyxZQUFZO0FBQ25CLFdBQUssY0FBVSxjQUFBQSxTQUFPLE9BQU87QUFFakMsUUFBSSxDQUFDLEtBQUs7QUFDTixXQUFLLFVBQVUsS0FBSyxRQUFRLE1BQU0sS0FBSztBQUUzQyxRQUFJLEtBQUssY0FBYyxLQUFLO0FBQ3hCLFdBQUssUUFBUSxPQUFPLEtBQUssTUFBTSxLQUFLLFFBQVEsT0FBTyxJQUFJLEtBQUssbUJBQW1CLElBQUksS0FBSyxtQkFBbUI7QUFFL0csUUFBSSxLQUFLLFFBQVEsU0FBUyxLQUFLLFNBQVM7QUFDcEMsV0FBSyxVQUFVLEtBQUssVUFBVSxNQUFNO0FBRXhDLFFBQUksS0FBSyxXQUFXLEtBQUssUUFBUSxRQUFRLEtBQUssT0FBTztBQUNqRCxXQUFLLFVBQVUsS0FBSyxRQUFRLE1BQU07QUFFdEMsUUFBSSxLQUFLLFdBQVcsS0FBSyxVQUFVLE1BQU0sRUFBRSxJQUFJLEtBQUssT0FBTyxFQUFFLFNBQVMsS0FBSyxPQUFPO0FBQzlFLFdBQUssVUFBVSxLQUFLLFVBQVUsTUFBTSxFQUFFLElBQUksS0FBSyxPQUFPO0FBRTFELFNBQUssb0JBQW9CLEtBQUssUUFBUSxNQUFNO0FBRTVDLE9BQUcsS0FBSyxLQUFLLFVBQVUsY0FBYyxlQUFlLEdBQUcsS0FBSyxVQUFVLE9BQU8sS0FBSyxPQUFPLE1BQU0sSUFBSSxLQUFLLE9BQU8sWUFBWSxLQUFLLFFBQVEsT0FBTyxLQUFLLE9BQU8sTUFBTSxDQUFDO0FBRWxLLFFBQUksQ0FBQyxLQUFLO0FBQ04sV0FBSyxjQUFjO0FBRXZCLFNBQUssbUJBQW1CO0FBQUEsRUFDNUI7QUFBQSxFQUVBLGdCQUFnQjtBQUNaLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxlQUFlO0FBQ1gsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLGFBQWE7QUFDVCxRQUFJLEtBQUssWUFBWTtBQUNqQixXQUFLLGlCQUFpQixNQUFNO0FBQzVCLFdBQUssaUJBQWlCLE9BQU87QUFDN0IsVUFBSSxlQUFlLEtBQUssVUFBVSxpQkFBaUIsOEJBQThCO0FBQ2pGLFVBQUksQ0FBQyxLQUFLLFNBQVM7QUFDZixpQkFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLFFBQVEsRUFBRSxHQUFFO0FBQ3pDLHVCQUFhLENBQUMsRUFBRSxXQUFXO0FBQzNCLHVCQUFhLENBQUMsRUFBRSxVQUFVLElBQUksVUFBVTtBQUFBLFFBQzVDO0FBQUEsTUFDSixPQUFPO0FBQ0gsaUJBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxRQUFRLEVBQUUsR0FBRTtBQUN6Qyx1QkFBYSxDQUFDLEVBQUUsV0FBVztBQUMzQix1QkFBYSxDQUFDLEVBQUUsVUFBVSxPQUFPLFVBQVU7QUFBQSxRQUMvQztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQ0EsUUFBSSxLQUFLO0FBQ0wsU0FBRyxLQUFLLEtBQUssVUFBVSxjQUFjLGVBQWUsR0FBRyxLQUFLLFVBQVUsT0FBTyxLQUFLLE9BQU8sTUFBTSxJQUFJLEtBQUssT0FBTyxZQUFZLEtBQUssUUFBUSxPQUFPLEtBQUssT0FBTyxNQUFNLENBQUM7QUFDdEssU0FBSyxtQkFBbUI7QUFDeEIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxpQkFBaUI7QUFBQSxFQUMxQjtBQUFBLEVBRUEscUJBQXFCO0FBQ2pCLFFBQUksS0FBSyxTQUFTO0FBR2QsVUFBSSxDQUFDLEtBQUssb0JBQW9CLEtBQUssYUFBYSxTQUFTLEtBQUssY0FBYyxVQUN2RSxLQUFLLFVBQVUsT0FBTyxTQUFTLE1BQU0sS0FBSyxhQUFhLE1BQU0sT0FBTyxTQUFTLEtBQUssS0FBSyxVQUFVLE9BQU8sU0FBUyxNQUFNLEtBQUssY0FBYyxNQUFNLE9BQU8sU0FBUyxPQUVoSyxLQUFLLFFBQVEsT0FBTyxTQUFTLE1BQU0sS0FBSyxhQUFhLE1BQU0sT0FBTyxTQUFTLEtBQUssS0FBSyxRQUFRLE9BQU8sU0FBUyxNQUFNLEtBQUssY0FBYyxNQUFNLE9BQU8sU0FBUyxJQUMvSjtBQUNFO0FBQUEsTUFDSjtBQUVBLFdBQUssYUFBYSxRQUFRLEtBQUssVUFBVSxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQ3ZELFVBQUksQ0FBQyxLQUFLLG9CQUFvQixLQUFLLFFBQVEsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssS0FBSyxRQUFRLEtBQUssTUFBTSxLQUFLLFVBQVUsS0FBSyxJQUFJO0FBQzdILGFBQUssY0FBYyxRQUFRLEtBQUssUUFBUSxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQUEsTUFDMUQsT0FBTztBQUNILGFBQUssY0FBYyxRQUFRLEtBQUssVUFBVSxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxHQUFHLE9BQU87QUFBQSxNQUM1RTtBQUFBLElBRUosT0FBTztBQUNILFVBQUksS0FBSyxhQUFhLE1BQU0sT0FBTyxTQUFTLE1BQU0sS0FBSyxVQUFVLE9BQU8sU0FBUyxLQUFLLEtBQUssY0FBYyxNQUFNLE9BQU8sU0FBUyxNQUFNLEtBQUssVUFBVSxPQUFPLFNBQVMsR0FBRztBQUNuSyxhQUFLLGFBQWEsUUFBUSxLQUFLLFVBQVUsTUFBTSxFQUFFLEtBQUssQ0FBQztBQUN2RCxhQUFLLGNBQWMsUUFBUSxLQUFLLFVBQVUsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksR0FBRyxPQUFPO0FBQUEsTUFDNUU7QUFBQSxJQUNKO0FBQ0EsUUFBSSxLQUFLLFdBQVcsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLG9CQUFvQixLQUFLLGNBQWMsUUFBUSxLQUFLLFNBQVM7QUFDM0csV0FBSyxjQUFjLFFBQVEsS0FBSyxRQUFRLE1BQU0sRUFBRSxLQUFLLENBQUM7QUFDdEQsV0FBSyxhQUFhLFFBQVEsS0FBSyxRQUFRLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEdBQUcsT0FBTztBQUFBLElBQzlFO0FBQUEsRUFDSjtBQUFBLEVBRUEsa0JBQWtCO0FBRWQsUUFBRyxDQUFDLEtBQUs7QUFDTCxXQUFLLGlCQUFpQixTQUFVLEdBQUc7QUFBRSxhQUFLLFVBQVUsQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDdkUsUUFBRyxDQUFDLEtBQUs7QUFDTCxXQUFLLGlCQUFpQixTQUFVLEdBQUc7QUFBRSxhQUFLLFVBQVUsQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDdkUsUUFBRyxDQUFDLEtBQUs7QUFDTCxXQUFLLGlCQUFpQixTQUFVLEdBQUc7QUFBRSxhQUFLLFVBQVUsQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDdkUsUUFBRyxDQUFDLEtBQUs7QUFDTCxXQUFLLGlCQUFpQixTQUFVLEdBQUc7QUFBRSxhQUFLLFVBQVUsQ0FBQztBQUFBLE1BQUcsRUFBRSxLQUFLLElBQUk7QUFDdkUsUUFBRyxDQUFDLEtBQUs7QUFDTCxXQUFLLDBCQUEwQixTQUFVLEdBQUc7QUFBRSxhQUFLLG1CQUFtQixDQUFDO0FBQUEsTUFBRyxFQUFFLEtBQUssSUFBSTtBQUN6RixRQUFHLENBQUMsS0FBSztBQUNMLFdBQUssbUJBQW1CLFNBQVUsR0FBRztBQUFFLGFBQUssWUFBWSxDQUFDO0FBQUEsTUFBRyxFQUFFLEtBQUssSUFBSTtBQWMzRSxRQUFJLG9CQUFvQixLQUFLLFVBQVUsaUJBQWlCLGVBQWU7QUFDdkUsT0FBRyxJQUFJLG1CQUFtQixTQUFTLFNBQVMsS0FBSyxjQUFjO0FBQy9ELE9BQUcsSUFBSSxtQkFBbUIsU0FBUyxTQUFTLEtBQUssY0FBYztBQUMvRCxPQUFHLElBQUksbUJBQW1CLGFBQWEsZ0JBQWdCLEtBQUssY0FBYztBQUMxRSxPQUFHLElBQUksbUJBQW1CLGNBQWMsZ0JBQWdCLEtBQUssY0FBYztBQUMzRSxPQUFHLElBQUksbUJBQW1CLFVBQVUscUJBQXFCLEtBQUssdUJBQXVCO0FBQ3JGLE9BQUcsSUFBSSxtQkFBbUIsVUFBVSxzQkFBc0IsS0FBSyx1QkFBdUI7QUFDdEYsT0FBRyxJQUFJLG1CQUFtQixVQUFVLCtFQUErRSxLQUFLLGdCQUFnQjtBQUd4SSxRQUFJLEtBQUssWUFBWTtBQUNqQixVQUFJLE1BQU0sUUFBUTtBQUNsQixVQUFJLEtBQUssU0FBUztBQUNkLGVBQU8sU0FBUyxLQUFLLFVBQVUsY0FBYyxtQkFBbUIsRUFBRSxPQUFPLEVBQUU7QUFDM0UsaUJBQVMsU0FBUyxLQUFLLFVBQVUsY0FBYyxxQkFBcUIsRUFBRSxPQUFPLEVBQUU7QUFDL0UsWUFBSSxNQUFNLE1BQU0sR0FBRztBQUNmLG1CQUFTLFNBQVMsR0FBRyxTQUFTLEtBQUssVUFBVSxjQUFjLHFCQUFxQixDQUFDLEVBQUUsT0FBTyxFQUFFO0FBQUEsUUFDaEc7QUFDQSxpQkFBUyxLQUFLLG9CQUFvQixTQUFTLEtBQUssVUFBVSxjQUFjLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxJQUFJO0FBQzVHLFlBQUksQ0FBQyxLQUFLLGtCQUFrQjtBQUN4QixjQUFJLE9BQU8sS0FBSyxVQUFVLGNBQWMsbUJBQW1CLEVBQUU7QUFDN0QsY0FBSSxTQUFTLFFBQVEsT0FBTztBQUN4QixvQkFBUTtBQUNaLGNBQUksU0FBUyxRQUFRLFNBQVM7QUFDMUIsbUJBQU87QUFBQSxRQUNmO0FBQUEsTUFDSixPQUFPO0FBQ0gsZUFBTyxTQUFTLEtBQUssVUFBVSxjQUFjLG9CQUFvQixFQUFFLE9BQU8sRUFBRTtBQUM1RSxpQkFBUyxTQUFTLEtBQUssVUFBVSxjQUFjLHNCQUFzQixFQUFFLE9BQU8sRUFBRTtBQUNoRixZQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2YsbUJBQVMsU0FBUyxHQUFHLFNBQVMsS0FBSyxVQUFVLGNBQWMsc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUU7QUFBQSxRQUNqRztBQUNBLGlCQUFTLEtBQUssb0JBQW9CLFNBQVMsS0FBSyxVQUFVLGNBQWMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLElBQUk7QUFDN0csWUFBSSxDQUFDLEtBQUssa0JBQWtCO0FBQ3hCLGNBQUksT0FBTyxLQUFLLFVBQVUsY0FBYyxvQkFBb0IsRUFBRTtBQUM5RCxjQUFJLFNBQVMsUUFBUSxPQUFPO0FBQ3hCLG9CQUFRO0FBQ1osY0FBSSxTQUFTLFFBQVEsU0FBUztBQUMxQixtQkFBTztBQUFBLFFBQ2Y7QUFBQSxNQUNKO0FBQ0EsV0FBSyxhQUFhLE1BQU0sS0FBSyxJQUFJLEVBQUUsT0FBTyxNQUFNLEVBQUUsT0FBTyxNQUFNO0FBQy9ELFdBQUssY0FBYyxNQUFNLEtBQUssSUFBSSxFQUFFLE9BQU8sTUFBTSxFQUFFLE9BQU8sTUFBTTtBQUFBLElBQ3BFO0FBRUEsU0FBSyxlQUFlLE1BQU07QUFDMUIsU0FBSyxlQUFlLE9BQU87QUFHM0IsUUFBSSxpQkFBaUIsS0FBSyxVQUFVLGlCQUFpQixZQUFZO0FBQ2pFLGFBQVEsSUFBSSxHQUFHLElBQUksZUFBZSxRQUFRLEVBQUU7QUFDeEMscUJBQWUsQ0FBQyxFQUFFLFVBQVUsT0FBTyxRQUFRO0FBRS9DLFFBQUksS0FBSyxZQUFZO0FBQ2pCLFdBQUsscUJBQXFCO0FBYzlCLE9BQUcsR0FBRyxtQkFBbUIsU0FBUyxTQUFTLEtBQUssY0FBYztBQUM5RCxPQUFHLEdBQUcsbUJBQW1CLFNBQVMsU0FBUyxLQUFLLGNBQWM7QUFDOUQsT0FBRyxHQUFHLG1CQUFtQixhQUFhLGdCQUFnQixLQUFLLGNBQWM7QUFDekUsT0FBRyxHQUFHLG1CQUFtQixjQUFjLGdCQUFnQixLQUFLLGNBQWM7QUFDMUUsT0FBRyxHQUFHLG1CQUFtQixVQUFVLHFCQUFxQixLQUFLLHVCQUF1QjtBQUNwRixPQUFHLEdBQUcsbUJBQW1CLFVBQVUsc0JBQXNCLEtBQUssdUJBQXVCO0FBQ3JGLE9BQUcsR0FBRyxtQkFBbUIsVUFBVSwrRUFBK0UsS0FBSyxnQkFBZ0I7QUFBQSxFQUUzSTtBQUFBLEVBRUEsZUFBZSxNQUFNO0FBTWpCLFFBQUksY0FBYyxTQUFTLFNBQVMsS0FBSyxlQUFlLEtBQUs7QUFDN0QsUUFBSSxRQUFRLFlBQVksTUFBTSxNQUFNO0FBQ3BDLFFBQUksT0FBTyxZQUFZLE1BQU0sS0FBSztBQUNsQyxRQUFJLE9BQU8sWUFBWSxNQUFNLEtBQUs7QUFDbEMsUUFBSSxTQUFTLFlBQVksTUFBTSxPQUFPO0FBQ3RDLFFBQUksU0FBUyxZQUFZLE1BQU0sT0FBTztBQUN0QyxRQUFJLGtCQUFjLGNBQUFBLFNBQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLFlBQVk7QUFDcEQsUUFBSSxlQUFXLGNBQUFBLFNBQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLFFBQUksY0FBVSxjQUFBQSxTQUFPLENBQUMsTUFBTSxPQUFPLFdBQVcsQ0FBQztBQUMvQyxRQUFJLGdCQUFZLGNBQUFBLFNBQU8sUUFBUSxFQUFFLFNBQVMsR0FBRyxPQUFPLEVBQUUsTUFBTTtBQUM1RCxRQUFJLGVBQVcsY0FBQUEsU0FBTyxRQUFRLEVBQUUsU0FBUyxHQUFHLE9BQU8sRUFBRSxLQUFLO0FBQzFELFFBQUksc0JBQWtCLGNBQUFBLFNBQU8sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxFQUFFLFlBQVk7QUFDaEUsUUFBSSxZQUFZLFNBQVMsSUFBSTtBQUc3QixRQUFJLGlCQUFpQixDQUFDO0FBQ3RCLG1CQUFlLFdBQVc7QUFDMUIsbUJBQWUsVUFBVTtBQUV6QixhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixxQkFBZSxDQUFDLElBQUksQ0FBQztBQUFBLElBQ3pCO0FBR0EsUUFBSSxXQUFXLGtCQUFrQixZQUFZLEtBQUssT0FBTyxXQUFXO0FBQ3BFLFFBQUksV0FBVztBQUNYLGtCQUFZO0FBRWhCLFFBQUksY0FBYyxLQUFLLE9BQU87QUFDMUIsaUJBQVcsa0JBQWtCO0FBRWpDLFFBQUksY0FBVSxjQUFBQSxTQUFPLENBQUMsVUFBVSxXQUFXLFVBQVUsSUFBSSxRQUFRLE1BQU0sQ0FBQztBQUV4RSxRQUFJLEtBQUs7QUFDVCxhQUFTLElBQUksR0FBR0UsT0FBTSxHQUFHQyxPQUFNLEdBQUcsSUFBSSxJQUFJLEtBQUtELFFBQU8sY0FBVSxjQUFBRixTQUFPLE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxHQUFHO0FBQzdGLFVBQUksSUFBSSxLQUFLRSxPQUFNLE1BQU0sR0FBRztBQUN4QixRQUFBQSxPQUFNO0FBQ04sUUFBQUM7QUFBQSxNQUNKO0FBQ0EscUJBQWVBLElBQUcsRUFBRUQsSUFBRyxJQUFJLFFBQVEsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLE9BQU8sTUFBTSxFQUFFLE9BQU8sTUFBTTtBQUNsRixjQUFRLEtBQUssRUFBRTtBQUVmLFVBQUksS0FBSyxXQUFXLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxFQUFFLE9BQU8sWUFBWSxNQUFNLEtBQUssUUFBUSxPQUFPLFlBQVksS0FBSyxlQUFlQyxJQUFHLEVBQUVELElBQUcsRUFBRSxTQUFTLEtBQUssT0FBTyxLQUFLLFNBQVMsUUFBUTtBQUMzSyx1QkFBZUMsSUFBRyxFQUFFRCxJQUFHLElBQUksS0FBSyxRQUFRLE1BQU07QUFBQSxNQUNsRDtBQUVBLFVBQUksS0FBSyxXQUFXLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxFQUFFLE9BQU8sWUFBWSxNQUFNLEtBQUssUUFBUSxPQUFPLFlBQVksS0FBSyxlQUFlQyxJQUFHLEVBQUVELElBQUcsRUFBRSxRQUFRLEtBQUssT0FBTyxLQUFLLFNBQVMsU0FBUztBQUMzSyx1QkFBZUMsSUFBRyxFQUFFRCxJQUFHLElBQUksS0FBSyxRQUFRLE1BQU07QUFBQSxNQUNsRDtBQUFBLElBRUo7QUFHQSxRQUFJLFNBQVMsUUFBUTtBQUNqQixXQUFLLGFBQWEsV0FBVztBQUFBLElBQ2pDLE9BQU87QUFDSCxXQUFLLGNBQWMsV0FBVztBQUFBLElBQ2xDO0FBTUEsUUFBSSxVQUFVLFNBQVMsU0FBUyxLQUFLLFVBQVUsS0FBSztBQUNwRCxRQUFJLFVBQVUsS0FBSztBQUNuQixRQUFJLFdBQVcsU0FBUyxTQUFTLEtBQUssWUFBWSxLQUFLO0FBQ3ZELFFBQUksUUFBUSxLQUFLLE9BQU8sY0FBYyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsT0FBTyxnQkFBZSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsT0FBTyxlQUFjO0FBRTVJLFFBQUksT0FBTztBQUNYLFlBQVE7QUFDUixZQUFRO0FBR1IsUUFBSSxLQUFLLG1CQUFtQixLQUFLO0FBQzdCLGNBQVE7QUFFWixTQUFLLENBQUMsV0FBVyxRQUFRLFNBQVMsZUFBZSxRQUFRLE9BQU8sQ0FBQyxLQUFLLG1CQUFtQixTQUFTLFNBQVM7QUFDdkcsY0FBUTtBQUFBLElBQ1osT0FBTztBQUNILGNBQVE7QUFBQSxJQUNaO0FBRUEsUUFBSSxXQUFXLEtBQUssT0FBTyxXQUFXLGVBQWUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxPQUFPO0FBRXpHLFFBQUksS0FBSyxlQUFlO0FBQ3BCLFVBQUksZUFBZSxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTTtBQUM5QyxVQUFJLGNBQWMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUs7QUFDNUMsVUFBSSxVQUFXLFdBQVcsUUFBUSxLQUFLLEtBQU8sS0FBSztBQUNuRCxVQUFJLFVBQVcsV0FBVyxRQUFRLEtBQUssS0FBTyxLQUFLO0FBQ25ELFVBQUksWUFBWSxnQkFBZ0I7QUFDaEMsVUFBSSxZQUFZLGdCQUFnQjtBQUVoQyxVQUFJLFlBQVk7QUFDaEIsZUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDekIsYUFBSyxDQUFDLGFBQWMsV0FBVyxLQUFLLFFBQVEsTUFBTSxPQUFRLENBQUMsYUFBYyxXQUFXLEtBQUssUUFBUSxNQUFNLElBQUs7QUFDeEcsdUJBQWEsb0JBQW9CLElBQUksT0FDaEMsTUFBTSxlQUFlLHlCQUF5QixNQUMvQyxNQUFNLEtBQUssT0FBTyxXQUFXLENBQUMsSUFBSTtBQUFBLFFBQzFDLE9BQU87QUFDSCx1QkFBYSxvQkFBb0IsSUFBSSxPQUNoQyxNQUFNLGVBQWUseUJBQXlCLE1BQy9DLDBCQUEwQixLQUFLLE9BQU8sV0FBVyxDQUFDLElBQUk7QUFBQSxRQUM5RDtBQUFBLE1BQ0o7QUFDQSxtQkFBYTtBQUViLFVBQUksV0FBVztBQUNmLGVBQVMsSUFBSSxTQUFTLEtBQUssU0FBUyxLQUFLO0FBQ3JDLG9CQUFZLG9CQUFvQixJQUFJLE9BQy9CLE1BQU0sY0FBYyx5QkFBeUIsTUFDOUMsTUFBTSxJQUFJO0FBQUEsTUFDbEI7QUFDQSxrQkFBWTtBQUVaLGlCQUFXLFlBQVk7QUFBQSxJQUMzQjtBQUVBLFlBQVEsbUNBQW1DLFdBQVc7QUFDdEQsU0FBSyxDQUFDLFdBQVcsUUFBUSxRQUFRLGVBQWUsT0FBTyxPQUFPLENBQUMsS0FBSyxtQkFBbUIsU0FBUyxXQUFXLEtBQUssbUJBQW1CO0FBQy9ILGNBQVE7QUFBQSxJQUNaLE9BQU87QUFDSCxjQUFRO0FBQUEsSUFDWjtBQUVBLFlBQVE7QUFDUixZQUFRO0FBR1IsUUFBSSxLQUFLLG1CQUFtQixLQUFLO0FBQzdCLGNBQVEsc0JBQXNCLEtBQUssT0FBTyxZQUFZO0FBRTFELGFBQVEsSUFBSSxHQUFHLElBQUksS0FBSyxPQUFPLFdBQVcsUUFBUSxFQUFFLEdBQUU7QUFDbEQsY0FBUSxTQUFTLEtBQUssT0FBTyxXQUFXLENBQUMsSUFBSTtBQUFBLElBQ2pEO0FBRUEsWUFBUTtBQUNSLFlBQVE7QUFDUixZQUFRO0FBSVIsUUFBSSxLQUFLLFlBQVksUUFBUSxLQUFLLFNBQVM7QUFDdkMsVUFBSSxXQUFXLEtBQUssVUFBVSxNQUFNLEVBQUUsSUFBSSxLQUFLLE9BQU8sRUFBRSxNQUFNLEtBQUs7QUFDbkUsVUFBSSxDQUFDLFdBQVcsU0FBUyxTQUFTLE9BQU8sR0FBRztBQUN4QyxrQkFBVTtBQUFBLE1BQ2Q7QUFBQSxJQUNKO0FBRUEsYUFBU0MsT0FBTSxHQUFHQSxPQUFNLEdBQUdBLFFBQU87QUFDOUIsY0FBUTtBQUdSLFVBQUksS0FBSztBQUNMLGdCQUFRLHNCQUFzQixlQUFlQSxJQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUFBLGVBQ3pELEtBQUs7QUFDVixnQkFBUSxzQkFBc0IsZUFBZUEsSUFBRyxFQUFFLENBQUMsRUFBRSxRQUFRLElBQUk7QUFFckUsZUFBU0QsT0FBTSxHQUFHQSxPQUFNLEdBQUdBLFFBQU87QUFFOUIsWUFBSSxVQUFVLENBQUM7QUFHZixZQUFJLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxFQUFFLE9BQU8sb0JBQUksS0FBSyxHQUFHLEtBQUs7QUFDakQsa0JBQVEsS0FBSyxPQUFPO0FBR3hCLFlBQUksZUFBZUMsSUFBRyxFQUFFRCxJQUFHLEVBQUUsV0FBVyxJQUFJO0FBQ3hDLGtCQUFRLEtBQUssU0FBUztBQUcxQixZQUFJLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxFQUFFLE1BQU0sTUFBTSxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTTtBQUNoRSxrQkFBUSxLQUFLLE9BQU8sTUFBTTtBQUc5QixZQUFJLEtBQUssV0FBVyxlQUFlQyxJQUFHLEVBQUVELElBQUcsRUFBRSxTQUFTLEtBQUssU0FBUyxLQUFLO0FBQ3JFLGtCQUFRLEtBQUssT0FBTyxVQUFVO0FBR2xDLFlBQUksV0FBVyxlQUFlQyxJQUFHLEVBQUVELElBQUcsRUFBRSxRQUFRLFNBQVMsS0FBSztBQUMxRCxrQkFBUSxLQUFLLE9BQU8sVUFBVTtBQUdsQyxZQUFJLEtBQUssY0FBYyxlQUFlQyxJQUFHLEVBQUVELElBQUcsQ0FBQztBQUMzQyxrQkFBUSxLQUFLLE9BQU8sVUFBVTtBQUdsQyxZQUFJLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxFQUFFLE9BQU8sWUFBWSxNQUFNLEtBQUssVUFBVSxPQUFPLFlBQVk7QUFDcEYsa0JBQVEsS0FBSyxVQUFVLFlBQVk7QUFHdkMsWUFBSSxLQUFLLFlBQVksUUFBUSxlQUFlQyxJQUFHLEVBQUVELElBQUcsRUFBRSxPQUFPLFlBQVksTUFBTSxLQUFLLFFBQVEsT0FBTyxZQUFZO0FBQzNHLGtCQUFRLEtBQUssVUFBVSxVQUFVO0FBR3JDLFlBQUksS0FBSyxZQUFZLFFBQVEsZUFBZUMsSUFBRyxFQUFFRCxJQUFHLElBQUksS0FBSyxhQUFhLGVBQWVDLElBQUcsRUFBRUQsSUFBRyxJQUFJLEtBQUs7QUFDdEcsa0JBQVEsS0FBSyxVQUFVO0FBRzNCLFlBQUksV0FBVyxLQUFLLGFBQWEsZUFBZUMsSUFBRyxFQUFFRCxJQUFHLENBQUM7QUFDekQsWUFBSSxhQUFhLE9BQU87QUFDcEIsY0FBSSxPQUFPLGFBQWE7QUFDcEIsb0JBQVEsS0FBSyxRQUFRO0FBQUE7QUFFckIsa0JBQU0sVUFBVSxLQUFLLE1BQU0sU0FBUyxRQUFRO0FBQUEsUUFDcEQ7QUFFQSxZQUFJLFFBQVEsSUFBSSxXQUFXO0FBQzNCLGlCQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3JDLG1CQUFTLFFBQVEsQ0FBQyxJQUFJO0FBQ3RCLGNBQUksUUFBUSxDQUFDLE1BQU07QUFDZix1QkFBVztBQUFBLFFBQ25CO0FBQ0EsWUFBSSxDQUFDO0FBQ0QsbUJBQVM7QUFFYixnQkFBUSxnQkFBZ0IsTUFBTSxRQUFRLGNBQWMsRUFBRSxJQUFJLG9CQUF5QkMsT0FBTSxNQUFNRCxPQUFNLE9BQU8sZUFBZUMsSUFBRyxFQUFFRCxJQUFHLEVBQUUsS0FBSyxJQUFJO0FBQUEsTUFFbEo7QUFDQSxjQUFRO0FBQUEsSUFDWjtBQUVBLFlBQVE7QUFDUixZQUFRO0FBRVIsT0FBRyxLQUFLLEtBQUssVUFBVSxjQUFjLG1CQUFtQixPQUFPLGtCQUFrQixHQUFHLElBQUk7QUFBQSxFQUU1RjtBQUFBLEVBRUEsaUJBQWlCLE1BQU07QUFJbkIsUUFBSSxTQUFTLFdBQVcsQ0FBQyxLQUFLLFFBQVM7QUFFdkMsUUFBSSxNQUFNLFVBQVUsU0FBUyxVQUFVLEtBQUs7QUFFNUMsUUFBSSxLQUFLLFlBQVksQ0FBQyxLQUFLLFdBQVcsS0FBSyxVQUFVLE1BQU0sRUFBRSxJQUFJLEtBQUssT0FBTyxFQUFFLFNBQVMsS0FBSyxPQUFPO0FBQ2hHLGdCQUFVLEtBQUssVUFBVSxNQUFNLEVBQUUsSUFBSSxLQUFLLE9BQU87QUFFckQsUUFBSSxTQUFTLFFBQVE7QUFDakIsaUJBQVcsS0FBSyxVQUFVLE1BQU07QUFDaEMsZ0JBQVUsS0FBSztBQUFBLElBQ25CLFdBQVcsU0FBUyxTQUFTO0FBQ3pCLGlCQUFXLEtBQUssUUFBUSxNQUFNO0FBQzlCLGdCQUFVLEtBQUs7QUFHZixVQUFJLGVBQWUsS0FBSyxVQUFVLGNBQWMsb0NBQW9DO0FBQ3BGLFVBQUksYUFBYSxjQUFjLElBQUk7QUFDL0IsaUJBQVMsS0FBSyxDQUFDLE1BQU0sU0FBUyxLQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssSUFBSyxHQUFHLG1CQUFtQixhQUFhLGNBQWMsYUFBYSxDQUFDLEVBQUUsS0FBSztBQUNqSSxpQkFBUyxPQUFPLENBQUMsTUFBTSxTQUFTLE9BQU8sQ0FBQyxJQUFJLFNBQVMsT0FBTyxJQUFJLEdBQUcsbUJBQW1CLGFBQWEsY0FBYyxlQUFlLENBQUMsRUFBRSxLQUFLO0FBQ3hJLGlCQUFTLE9BQU8sQ0FBQyxNQUFNLFNBQVMsT0FBTyxDQUFDLElBQUksU0FBUyxPQUFPLElBQUksR0FBRyxtQkFBbUIsYUFBYSxjQUFjLGVBQWUsQ0FBQyxFQUFFLEtBQUs7QUFDeEksWUFBSSxDQUFDLEtBQUssa0JBQWtCO0FBQ3hCLGNBQUksT0FBTyxHQUFHLG1CQUFtQixhQUFhLGNBQWMsYUFBYSxDQUFDLEVBQUU7QUFDNUUsY0FBSSxTQUFTLFFBQVEsU0FBUyxLQUFLLElBQUk7QUFDbkMscUJBQVMsS0FBSyxTQUFTLEtBQUssSUFBSSxFQUFFO0FBQ3RDLGNBQUksU0FBUyxRQUFRLFNBQVMsS0FBSyxNQUFNO0FBQ3JDLHFCQUFTLEtBQUssQ0FBQztBQUFBLFFBQ3ZCO0FBQUEsTUFFSjtBQUVBLFVBQUksU0FBUyxTQUFTLEtBQUssU0FBUztBQUNoQyxtQkFBVyxLQUFLLFVBQVUsTUFBTTtBQUVwQyxVQUFJLFdBQVcsU0FBUyxRQUFRLE9BQU87QUFDbkMsbUJBQVcsUUFBUSxNQUFNO0FBQUEsSUFFakM7QUFNQSxXQUFPO0FBRVAsUUFBSSxRQUFRLEtBQUssbUJBQW1CLElBQUk7QUFDeEMsUUFBSSxNQUFNLEtBQUssbUJBQW1CLEtBQUs7QUFFdkMsYUFBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLEtBQUs7QUFDL0IsVUFBSSxVQUFVO0FBQ2QsVUFBSSxDQUFDLEtBQUs7QUFDTixrQkFBVSxTQUFTLEtBQUssS0FBSyxLQUFNLE1BQU0sS0FBSyxLQUFLLElBQUksS0FBTyxNQUFNLEtBQUssSUFBSTtBQUVqRixVQUFJLE9BQU8sU0FBUyxNQUFNLEVBQUUsS0FBSyxPQUFPO0FBQ3hDLFVBQUksV0FBVztBQUNmLFVBQUksV0FBVyxLQUFLLE9BQU8sRUFBRSxFQUFFLFNBQVMsT0FBTztBQUMzQyxtQkFBVztBQUNmLFVBQUksV0FBVyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFFBQVEsT0FBTztBQUN6QyxtQkFBVztBQUVmLFVBQUksWUFBWSxTQUFTLEtBQUssS0FBSyxDQUFDLFVBQVU7QUFDMUMsZ0JBQVEsb0JBQW9CLElBQUksMkJBQTJCLElBQUk7QUFBQSxNQUNuRSxXQUFXLFVBQVU7QUFDakIsZ0JBQVEsb0JBQW9CLElBQUksNENBQTRDLElBQUk7QUFBQSxNQUNwRixPQUFPO0FBQ0gsZ0JBQVEsb0JBQW9CLElBQUksT0FBTyxJQUFJO0FBQUEsTUFDL0M7QUFBQSxJQUNKO0FBRUEsWUFBUTtBQU1SLFlBQVE7QUFFUixhQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxLQUFLLHFCQUFxQjtBQUNuRCxVQUFJLFNBQVMsSUFBSSxLQUFLLE1BQU0sSUFBSTtBQUNoQyxVQUFJLE9BQU8sU0FBUyxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBRXBDLFVBQUksV0FBVztBQUNmLFVBQUksV0FBVyxLQUFLLE9BQU8sRUFBRSxFQUFFLFNBQVMsT0FBTztBQUMzQyxtQkFBVztBQUNmLFVBQUksV0FBVyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFFBQVEsT0FBTztBQUN6QyxtQkFBVztBQUVmLFVBQUksU0FBUyxPQUFPLE1BQU0sS0FBSyxDQUFDLFVBQVU7QUFDdEMsZ0JBQVEsb0JBQW9CLElBQUksMkJBQTJCLFNBQVM7QUFBQSxNQUN4RSxXQUFXLFVBQVU7QUFDakIsZ0JBQVEsb0JBQW9CLElBQUksNENBQTRDLFNBQVM7QUFBQSxNQUN6RixPQUFPO0FBQ0gsZ0JBQVEsb0JBQW9CLElBQUksT0FBTyxTQUFTO0FBQUEsTUFDcEQ7QUFBQSxJQUNKO0FBRUEsWUFBUTtBQU1SLFFBQUksS0FBSyxtQkFBbUI7QUFDeEIsY0FBUTtBQUVSLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLFlBQUksU0FBUyxJQUFJLEtBQUssTUFBTSxJQUFJO0FBQ2hDLFlBQUksT0FBTyxTQUFTLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFcEMsWUFBSSxXQUFXO0FBQ2YsWUFBSSxXQUFXLEtBQUssU0FBUyxPQUFPO0FBQ2hDLHFCQUFXO0FBQ2YsWUFBSSxXQUFXLEtBQUssUUFBUSxPQUFPO0FBQy9CLHFCQUFXO0FBRWYsWUFBSSxTQUFTLE9BQU8sTUFBTSxLQUFLLENBQUMsVUFBVTtBQUN0QyxrQkFBUSxvQkFBb0IsSUFBSSwyQkFBMkIsU0FBUztBQUFBLFFBQ3hFLFdBQVcsVUFBVTtBQUNqQixrQkFBUSxvQkFBb0IsSUFBSSw0Q0FBNEMsU0FBUztBQUFBLFFBQ3pGLE9BQU87QUFDSCxrQkFBUSxvQkFBb0IsSUFBSSxPQUFPLFNBQVM7QUFBQSxRQUNwRDtBQUFBLE1BQ0o7QUFFQSxjQUFRO0FBQUEsSUFDWjtBQU1BLFFBQUksQ0FBQyxLQUFLLGtCQUFrQjtBQUN4QixjQUFRO0FBRVIsVUFBSSxVQUFVO0FBQ2QsVUFBSSxVQUFVO0FBRWQsVUFBSSxXQUFXLFNBQVMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLFNBQVMsT0FBTztBQUN6RSxrQkFBVTtBQUVkLFVBQUksV0FBVyxTQUFTLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxRQUFRLE9BQU87QUFDdkUsa0JBQVU7QUFFZCxVQUFJLFNBQVMsS0FBSyxLQUFLLElBQUk7QUFDdkIsZ0JBQVEsdUJBQXVCLFVBQVUsdURBQXVELFVBQVU7QUFBQSxNQUM5RyxPQUFPO0FBQ0gsZ0JBQVEsMkNBQTJDLFVBQVUsbUNBQW1DLFVBQVU7QUFBQSxNQUM5RztBQUVBLGNBQVE7QUFBQSxJQUNaO0FBRUEsT0FBRyxLQUFLLEtBQUssVUFBVSxjQUFjLG1CQUFtQixPQUFPLGlCQUFpQixHQUFHLElBQUk7QUFBQSxFQUUzRjtBQUFBLEVBRUEsbUJBQW1CO0FBRWYsUUFBSSxLQUFLLG9CQUFxQixLQUFLLFlBQVksS0FBSyxVQUFVLFNBQVMsS0FBSyxPQUFPLEtBQUssS0FBSyxVQUFVLE9BQU8sS0FBSyxPQUFPLElBQUs7QUFDM0gsV0FBSyxVQUFVLGNBQWMsaUJBQWlCLEVBQUUsV0FBVztBQUFBLElBQy9ELE9BQU87QUFDSCxXQUFLLFVBQVUsY0FBYyxpQkFBaUIsRUFBRSxXQUFXO0FBQUEsSUFDL0Q7QUFBQSxFQUVKO0FBQUEsRUFFQSxPQUFPO0FBQ0gsUUFBSSxlQUFlLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxHQUNqQyxjQUNBLFFBQVEsS0FBSztBQUVqQixRQUFJLGtCQUFrQixPQUFPO0FBQzdCLFFBQUksRUFBRSxLQUFLLFNBQVMsWUFBWSxTQUFTO0FBQ3JDLFVBQUksaUJBQWlCLEdBQUcsT0FBTyxLQUFLLFFBQVE7QUFDNUMscUJBQWU7QUFBQSxRQUNYLEtBQUssZUFBZSxNQUFNLEtBQUssU0FBUztBQUFBLFFBQ3hDLE1BQU0sZUFBZSxPQUFPLEtBQUssU0FBUztBQUFBLE1BQzlDO0FBQ0Esd0JBQWtCLEtBQUssU0FBUyxjQUFjLGVBQWU7QUFBQSxJQUNqRTtBQUdBLFFBQUksZ0JBQWdCLEdBQUcsT0FBTyxLQUFLLE9BQU87QUFDMUMsWUFBUSxPQUFPO0FBQUEsTUFDWCxLQUFLO0FBQ0QsdUJBQWUsY0FBYyxNQUFNLEtBQUssUUFBUSxlQUFlLGFBQWE7QUFDNUUsWUFBSSxlQUFlLEtBQUssVUFBVSxnQkFBZ0IsS0FBSyxTQUFTLGNBQWM7QUFDMUUseUJBQWUsY0FBYyxNQUFNLEtBQUssVUFBVSxlQUFlLGFBQWE7QUFDOUUsa0JBQVE7QUFBQSxRQUNaO0FBQ0E7QUFBQSxNQUNKLEtBQUs7QUFDRCx1QkFBZSxjQUFjLE1BQU0sS0FBSyxVQUFVLGVBQWUsYUFBYTtBQUM5RTtBQUFBLE1BQ0o7QUFDSSx1QkFBZSxjQUFjLE1BQU0sS0FBSyxRQUFRLGVBQWUsYUFBYTtBQUM1RTtBQUFBLElBQ1I7QUFHQSxTQUFLLFVBQVUsTUFBTSxNQUFNO0FBQzNCLFNBQUssVUFBVSxNQUFNLE9BQU87QUFDNUIsU0FBSyxVQUFVLE1BQU0sUUFBUTtBQUM3QixRQUFJLGlCQUFpQixLQUFLLFVBQVU7QUFFcEMsUUFBSSxVQUFVO0FBQ1YsV0FBSyxVQUFVLFVBQVUsSUFBSSxTQUFTO0FBQUE7QUFFdEMsV0FBSyxVQUFVLFVBQVUsT0FBTyxTQUFTO0FBRTdDLFFBQUksS0FBSyxVQUFVLFFBQVE7QUFDdkIsVUFBSSxpQkFBaUIsa0JBQWtCLGNBQWMsT0FBTyxLQUFLLFFBQVE7QUFDekUsVUFBSSxpQkFBaUIsaUJBQWlCLE9BQU8sWUFBWTtBQUNyRCxhQUFLLFVBQVUsTUFBTSxNQUFNLGVBQWU7QUFDMUMsYUFBSyxVQUFVLE1BQU0sUUFBUTtBQUM3QixhQUFLLFVBQVUsTUFBTSxPQUFPO0FBQUEsTUFDaEMsT0FBTztBQUNILGFBQUssVUFBVSxNQUFNLE1BQU0sZUFBZTtBQUMxQyxhQUFLLFVBQVUsTUFBTSxRQUFRLGlCQUFpQjtBQUM5QyxhQUFLLFVBQVUsTUFBTSxPQUFPO0FBQUEsTUFDaEM7QUFBQSxJQUNKLFdBQVcsS0FBSyxVQUFVLFVBQVU7QUFDaEMsVUFBSSxnQkFBZ0IsY0FBYyxPQUFPLGFBQWEsT0FBTyxLQUFLLFFBQVEsY0FBYyxJQUNsRixpQkFBaUI7QUFDdkIsVUFBSSxnQkFBZ0IsR0FBRztBQUNuQixhQUFLLFVBQVUsTUFBTSxNQUFNLGVBQWU7QUFDMUMsYUFBSyxVQUFVLE1BQU0sUUFBUTtBQUM3QixhQUFLLFVBQVUsTUFBTSxPQUFPO0FBQUEsTUFDaEMsV0FBVyxnQkFBZ0IsaUJBQWlCLE9BQU8sWUFBWTtBQUMzRCxhQUFLLFVBQVUsTUFBTSxNQUFNLGVBQWU7QUFDMUMsYUFBSyxVQUFVLE1BQU0sT0FBTztBQUM1QixhQUFLLFVBQVUsTUFBTSxRQUFRO0FBQUEsTUFDakMsT0FBTztBQUNILGFBQUssVUFBVSxNQUFNLE1BQU0sZUFBZTtBQUMxQyxhQUFLLFVBQVUsTUFBTSxPQUFPLGdCQUFnQjtBQUM1QyxhQUFLLFVBQVUsTUFBTSxRQUFRO0FBQUEsTUFDakM7QUFBQSxJQUNKLE9BQU87QUFDSCxVQUFJLGdCQUFnQixjQUFjLE9BQU8sYUFBYTtBQUN0RCxVQUFJLGdCQUFnQixpQkFBaUIsT0FBTyxZQUFZO0FBQ3BELGFBQUssVUFBVSxNQUFNLE1BQU0sZUFBZTtBQUMxQyxhQUFLLFVBQVUsTUFBTSxPQUFPO0FBQzVCLGFBQUssVUFBVSxNQUFNLFFBQVE7QUFBQSxNQUNqQyxPQUFPO0FBQ0gsYUFBSyxVQUFVLE1BQU0sTUFBTSxlQUFlO0FBQzFDLGFBQUssVUFBVSxNQUFNLE9BQU8sZ0JBQWdCO0FBQzVDLGFBQUssVUFBVSxNQUFNLFFBQVE7QUFBQSxNQUNqQztBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFFQSxLQUFLLEdBQUc7QUFDSixRQUFJLEtBQUssVUFBVztBQUdwQixRQUFHLENBQUMsS0FBSztBQUNMLFdBQUsscUJBQXFCLFNBQVVFLElBQUc7QUFBRSxhQUFLLGFBQWFBLEVBQUM7QUFBQSxNQUFHLEVBQUUsS0FBSyxJQUFJO0FBRzlFLGFBQVMsaUJBQWlCLGFBQWEsS0FBSyxrQkFBa0I7QUFFOUQsYUFBUyxpQkFBaUIsWUFBWSxLQUFLLGtCQUFrQjtBQUM3RCxPQUFHLEdBQUcsVUFBVSxTQUFTLDBCQUEwQixLQUFLLGtCQUFrQjtBQUUxRSxhQUFTLGlCQUFpQixXQUFXLEtBQUssa0JBQWtCO0FBRzVELFFBQUcsQ0FBQyxLQUFLO0FBQ0wsV0FBSyxZQUFZLFNBQVVBLElBQUc7QUFBRSxhQUFLLEtBQUtBLEVBQUM7QUFBQSxNQUFHLEVBQUUsS0FBSyxJQUFJO0FBQzdELFdBQU8saUJBQWlCLFVBQVUsS0FBSyxTQUFTO0FBRWhELFNBQUssZUFBZSxLQUFLLFVBQVUsTUFBTTtBQUN6QyxTQUFLLGFBQWEsS0FBSyxRQUFRLE1BQU07QUFDckMsU0FBSyxvQkFBb0IsS0FBSyxRQUFRLE1BQU07QUFFNUMsU0FBSyxXQUFXO0FBQ2hCLFNBQUssVUFBVSxNQUFNLFVBQVU7QUFDL0IsU0FBSyxLQUFLO0FBQ1YsU0FBSyxRQUFRLGNBQWMsSUFBSSxZQUFZLHdCQUF3QixFQUFDLFNBQVMsTUFBTSxRQUFRLEtBQUksQ0FBQyxDQUFDO0FBQ2pHLFNBQUssWUFBWTtBQUFBLEVBQ3JCO0FBQUEsRUFFQSxLQUFLLEdBQUc7QUFDSixRQUFJLENBQUMsS0FBSyxVQUFXO0FBR3JCLFFBQUksQ0FBQyxLQUFLLFNBQVM7QUFDZixXQUFLLFlBQVksS0FBSyxhQUFhLE1BQU07QUFDekMsV0FBSyxVQUFVLEtBQUssV0FBVyxNQUFNO0FBQUEsSUFDekM7QUFHQSxRQUFJLENBQUMsS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLEtBQUssQ0FBQyxLQUFLLFFBQVEsT0FBTyxLQUFLLFVBQVU7QUFDakYsV0FBSyxTQUFTLEtBQUssVUFBVSxNQUFNLEdBQUcsS0FBSyxRQUFRLE1BQU0sR0FBRyxLQUFLLFdBQVc7QUFHaEYsU0FBSyxjQUFjO0FBRW5CLFFBQUcsS0FBSyxvQkFBbUI7QUFDdkIsZUFBUyxvQkFBb0IsYUFBYSxLQUFLLGtCQUFrQjtBQUNqRSxlQUFTLG9CQUFvQixZQUFZLEtBQUssa0JBQWtCO0FBQ2hFLFNBQUcsSUFBSSxVQUFVLFNBQVMsMEJBQTBCLEtBQUssa0JBQWtCO0FBQzNFLGVBQVMsb0JBQW9CLFdBQVcsS0FBSyxrQkFBa0I7QUFBQSxJQUNuRTtBQUVBLFFBQUcsS0FBSztBQUNKLGFBQU8sb0JBQW9CLFVBQVUsS0FBSyxTQUFTO0FBRXZELFNBQUssVUFBVSxNQUFNLFVBQVU7QUFDL0IsU0FBSyxRQUFRLGNBQWMsSUFBSSxZQUFZLHdCQUF3QixFQUFDLFNBQVMsTUFBTSxRQUFRLEtBQUksQ0FBQyxDQUFDO0FBQ2pHLFNBQUssWUFBWTtBQUFBLEVBQ3JCO0FBQUEsRUFFQSxPQUFPLEdBQUc7QUFDTixRQUFJLEtBQUssV0FBVztBQUNoQixXQUFLLEtBQUs7QUFBQSxJQUNkLE9BQU87QUFDSCxXQUFLLEtBQUs7QUFBQSxJQUNkO0FBQUEsRUFDSjtBQUFBLEVBRUEsYUFBYSxHQUFHO0FBQ1osUUFBSSxTQUFTLEVBQUU7QUFHZjtBQUFBO0FBQUEsTUFFSSxFQUFFLFNBQVMsYUFDWCxPQUFPLFFBQVEsR0FBRyx1QkFBdUIsS0FBSyxPQUFPLENBQUMsS0FDdEQsT0FBTyxRQUFRLEdBQUcsdUJBQXVCLEtBQUssU0FBUyxDQUFDLEtBQ3hELE9BQU8sUUFBUSxpQkFBaUI7QUFBQSxLQUNsQztBQUNGLFNBQUssS0FBSztBQUNWLFNBQUssUUFBUSxjQUFjLElBQUksWUFBWSxnQ0FBZ0MsRUFBQyxTQUFTLE1BQU0sUUFBUSxLQUFJLENBQUMsQ0FBQztBQUFBLEVBQzdHO0FBQUEsRUFFQSxnQkFBZ0I7QUFDWixTQUFLLFVBQVUsVUFBVSxJQUFJLGVBQWU7QUFDNUMsU0FBSyxLQUFLO0FBQ1YsU0FBSyxRQUFRLGNBQWMsSUFBSSxZQUFZLGdDQUFnQyxFQUFDLFNBQVMsTUFBTSxRQUFRLEtBQUksQ0FBQyxDQUFDO0FBQUEsRUFDN0c7QUFBQSxFQUVBLGdCQUFnQjtBQUNaLFNBQUssVUFBVSxVQUFVLE9BQU8sZUFBZTtBQUMvQyxTQUFLLFFBQVEsY0FBYyxJQUFJLFlBQVksZ0NBQWdDLEVBQUMsU0FBUyxNQUFNLFFBQVEsS0FBSSxDQUFDLENBQUM7QUFBQSxFQUM3RztBQUFBLEVBRUEsV0FBVyxHQUFHO0FBRVYsUUFBSSxRQUFRLEVBQUUsT0FBTyxRQUFRO0FBQzdCLFNBQUssY0FBYztBQUNuQixRQUFJLFVBQVUsS0FBSyxPQUFPLGtCQUFrQjtBQUN4QyxXQUFLLGNBQWM7QUFBQSxJQUN2QixPQUFPO0FBQ0gsVUFBSSxRQUFRLEtBQUssT0FBTyxLQUFLO0FBQzdCLFdBQUssWUFBWSxNQUFNLENBQUM7QUFDeEIsV0FBSyxVQUFVLE1BQU0sQ0FBQztBQUV0QixVQUFJLENBQUMsS0FBSyxZQUFZO0FBQ2xCLGFBQUssVUFBVSxRQUFRLEtBQUs7QUFDNUIsYUFBSyxRQUFRLE1BQU0sS0FBSztBQUFBLE1BQzVCO0FBRUEsVUFBSSxDQUFDLEtBQUs7QUFDTixhQUFLLGNBQWM7QUFDdkIsV0FBSyxXQUFXLENBQUM7QUFBQSxJQUNyQjtBQUFBLEVBQ0o7QUFBQSxFQUVBLFVBQVUsR0FBRztBQUNULFFBQUksTUFBTSxFQUFFLE9BQU8sUUFBUSxlQUFlO0FBQzFDLFFBQUksSUFBSSxVQUFVLFNBQVMsTUFBTSxHQUFHO0FBQ2hDLFdBQUssYUFBYSxNQUFNLFNBQVMsR0FBRyxPQUFPO0FBQzNDLFVBQUksS0FBSztBQUNMLGFBQUssY0FBYyxNQUFNLFNBQVMsR0FBRyxPQUFPO0FBQUEsSUFDcEQsT0FBTztBQUNILFdBQUssY0FBYyxNQUFNLFNBQVMsR0FBRyxPQUFPO0FBQUEsSUFDaEQ7QUFDQSxTQUFLLGdCQUFnQjtBQUFBLEVBQ3pCO0FBQUEsRUFFQSxVQUFVLEdBQUc7QUFDVCxRQUFJLE1BQU0sRUFBRSxPQUFPLFFBQVEsZUFBZTtBQUMxQyxRQUFJLElBQUksVUFBVSxTQUFTLE1BQU0sR0FBRztBQUNoQyxXQUFLLGFBQWEsTUFBTSxJQUFJLEdBQUcsT0FBTztBQUFBLElBQzFDLE9BQU87QUFDSCxXQUFLLGNBQWMsTUFBTSxJQUFJLEdBQUcsT0FBTztBQUN2QyxVQUFJLEtBQUs7QUFDTCxhQUFLLGFBQWEsTUFBTSxJQUFJLEdBQUcsT0FBTztBQUFBLElBQzlDO0FBQ0EsU0FBSyxnQkFBZ0I7QUFBQSxFQUN6QjtBQUFBLEVBRUEsVUFBVSxHQUFHO0FBR1QsUUFBRyxDQUFFLEVBQUUsT0FBTyxVQUFVLFNBQVMsV0FBVyxFQUFJO0FBRWhELFFBQUksUUFBUSxFQUFFLE9BQU8sUUFBUTtBQUM3QixRQUFJLE1BQU0sTUFBTSxPQUFPLEdBQUcsQ0FBQztBQUMzQixRQUFJLE1BQU0sTUFBTSxPQUFPLEdBQUcsQ0FBQztBQUMzQixRQUFJLE1BQU0sRUFBRSxPQUFPLFFBQVEsZUFBZTtBQUMxQyxRQUFJLE9BQU8sSUFBSSxVQUFVLFNBQVMsTUFBTSxJQUFJLEtBQUssYUFBYSxTQUFTLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSyxjQUFjLFNBQVMsR0FBRyxFQUFFLEdBQUc7QUFHdkgsUUFBSSxlQUFlLEtBQUs7QUFDeEIsUUFBSSxnQkFBZ0IsS0FBSztBQUN6QixRQUFJLFlBQVksS0FBSztBQUNyQixRQUFJLENBQUMsS0FBSyxTQUFTO0FBQ2YsVUFBSSxXQUFXLEtBQUssVUFBVSxpQkFBaUIsd0JBQXdCO0FBQ3ZFLGVBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEVBQUUsR0FBRztBQUV0QyxZQUFHLFNBQVMsQ0FBQyxFQUFFLFVBQVUsU0FBUyxNQUFNLEVBQUc7QUFFM0MsWUFBSUMsU0FBUSxTQUFTLENBQUMsRUFBRSxRQUFRO0FBQ2hDLFlBQUlGLE9BQU1FLE9BQU0sT0FBTyxHQUFHLENBQUM7QUFDM0IsWUFBSUgsT0FBTUcsT0FBTSxPQUFPLEdBQUcsQ0FBQztBQUMzQixZQUFJQyxPQUFNLFNBQVMsQ0FBQyxFQUFFLFFBQVEsZUFBZTtBQUM3QyxZQUFJLEtBQUtBLEtBQUksVUFBVSxTQUFTLE1BQU0sSUFBSSxhQUFhLFNBQVNILElBQUcsRUFBRUQsSUFBRyxJQUFJLGNBQWMsU0FBU0MsSUFBRyxFQUFFRCxJQUFHO0FBQzNHLFlBQUssR0FBRyxRQUFRLFNBQVMsS0FBSyxHQUFHLFNBQVMsSUFBSSxLQUFNLEdBQUcsT0FBTyxNQUFNLEtBQUssR0FBRztBQUN4RSxtQkFBUyxDQUFDLEVBQUUsVUFBVSxJQUFJLFVBQVU7QUFBQSxRQUN4QyxPQUFPO0FBQ0gsbUJBQVMsQ0FBQyxFQUFFLFVBQVUsT0FBTyxVQUFVO0FBQUEsUUFDM0M7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUVBLFVBQVUsR0FBRztBQUVULFFBQUksQ0FBQyxFQUFFLE9BQU8sVUFBVSxTQUFTLFdBQVcsRUFBRztBQUUvQyxRQUFJLFFBQVEsRUFBRSxPQUFPLFFBQVE7QUFFN0IsUUFBSSxNQUFNLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFDM0IsUUFBSSxNQUFNLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFDM0IsUUFBSSxNQUFNLEVBQUUsT0FBTyxRQUFRLGVBQWU7QUFDMUMsUUFBSSxPQUFPLElBQUksVUFBVSxTQUFTLE1BQU0sSUFBSSxLQUFLLGFBQWEsU0FBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLEtBQUssY0FBYyxTQUFTLEdBQUcsRUFBRSxHQUFHO0FBV3ZILFFBQUksS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFdBQVcsS0FBSyxHQUFHO0FBQ3RELFVBQUksS0FBSyxZQUFZO0FBQ2pCLFlBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxjQUFjLG1CQUFtQixFQUFFLE9BQU8sRUFBRTtBQUMvRSxZQUFJLENBQUMsS0FBSyxrQkFBa0I7QUFDeEIsY0FBSSxPQUFPLEtBQUssVUFBVSxjQUFjLG1CQUFtQixFQUFFO0FBQzdELGNBQUksU0FBUyxRQUFRLE9BQU87QUFDeEIsb0JBQVE7QUFDWixjQUFJLFNBQVMsUUFBUSxTQUFTO0FBQzFCLG1CQUFPO0FBQUEsUUFDZjtBQUNBLFlBQUksU0FBUyxTQUFTLEtBQUssVUFBVSxjQUFjLHFCQUFxQixFQUFFLE9BQU8sRUFBRTtBQUNuRixZQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2YsbUJBQVMsU0FBUyxLQUFLLFVBQVUsY0FBYyx1Q0FBdUMsRUFBRSxPQUFPLEVBQUU7QUFBQSxRQUNyRztBQUNBLFlBQUksU0FBUyxLQUFLLG9CQUFvQixTQUFTLEtBQUssVUFBVSxjQUFjLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxJQUFJO0FBQ2hILGVBQU8sS0FBSyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsT0FBTyxNQUFNLEVBQUUsT0FBTyxNQUFNO0FBQUEsTUFDL0Q7QUFDQSxXQUFLLFVBQVU7QUFDZixXQUFLLGFBQWEsS0FBSyxNQUFNLENBQUM7QUFBQSxJQUNsQyxXQUFXLENBQUMsS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFNBQVMsR0FBRztBQUd2RCxXQUFLLFdBQVcsS0FBSyxVQUFVLE1BQU0sQ0FBQztBQUFBLElBQzFDLE9BQU87QUFDSCxVQUFJLEtBQUssWUFBWTtBQUNqQixZQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsY0FBYyxvQkFBb0IsRUFBRSxPQUFPLEVBQUU7QUFDaEYsWUFBSSxDQUFDLEtBQUssa0JBQWtCO0FBQ3hCLGNBQUksT0FBTyxLQUFLLFVBQVUsY0FBYyxvQkFBb0IsRUFBRTtBQUM5RCxjQUFJLFNBQVMsUUFBUSxPQUFPO0FBQ3hCLG9CQUFRO0FBQ1osY0FBSSxTQUFTLFFBQVEsU0FBUztBQUMxQixtQkFBTztBQUFBLFFBQ2Y7QUFDQSxZQUFJLFNBQVMsU0FBUyxLQUFLLFVBQVUsY0FBYyxzQkFBc0IsRUFBRSxPQUFPLEVBQUU7QUFDcEYsWUFBSSxNQUFNLE1BQU0sR0FBRztBQUNmLG1CQUFTLFNBQVMsS0FBSyxVQUFVLGNBQWMsd0NBQXdDLEVBQUUsT0FBTyxFQUFFO0FBQUEsUUFDdEc7QUFDQSxZQUFJLFNBQVMsS0FBSyxvQkFBb0IsU0FBUyxLQUFLLFVBQVUsY0FBYyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUNqSCxlQUFPLEtBQUssTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLE9BQU8sTUFBTSxFQUFFLE9BQU8sTUFBTTtBQUFBLE1BQy9EO0FBQ0EsV0FBSyxXQUFXLEtBQUssTUFBTSxDQUFDO0FBQzVCLFVBQUksS0FBSyxXQUFXO0FBQ2hCLGFBQUsscUJBQXFCO0FBQzFCLGFBQUssV0FBVyxDQUFDO0FBQUEsTUFDckI7QUFBQSxJQUNKO0FBRUEsUUFBSSxLQUFLLGtCQUFrQjtBQUN2QixXQUFLLFdBQVcsS0FBSyxTQUFTO0FBQzlCLFVBQUksQ0FBQyxLQUFLLGNBQWMsS0FBSztBQUN6QixhQUFLLFdBQVcsQ0FBQztBQUFBLElBQ3pCO0FBRUEsU0FBSyxXQUFXO0FBR2hCLE1BQUUsZ0JBQWdCO0FBQUEsRUFFdEI7QUFBQSxFQUVBLHVCQUF1QjtBQUNuQixRQUFJLGNBQWM7QUFDbEIsUUFBSSxZQUFZLE9BQU8sS0FBSyxLQUFLLE1BQU07QUFDdkMsYUFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVEsRUFBRSxHQUFHO0FBQ3ZDLFVBQUksUUFBUSxLQUFLLE9BQU8sVUFBVSxDQUFDLENBQUM7QUFDcEMsVUFBSSxLQUFLLFlBQVk7QUFDakIsWUFBSSxTQUFTLEtBQUssb0JBQW9CLHdCQUF3QjtBQUU5RCxZQUFJLEtBQUssVUFBVSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUMsRUFBRSxPQUFPLE1BQU0sS0FBSyxLQUFLLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDLEVBQUUsT0FBTyxNQUFNLEdBQUc7QUFDdEgsd0JBQWM7QUFDZCxjQUFJLGVBQWUsS0FBSyxVQUFVLGlCQUFpQixZQUFZO0FBQy9ELHVCQUFhLENBQUMsRUFBRSxVQUFVLElBQUksUUFBUTtBQUN0QyxlQUFLLGNBQWMsYUFBYSxDQUFDLEVBQUUsUUFBUTtBQUMzQztBQUFBLFFBQ0o7QUFBQSxNQUNKLE9BQU87QUFFSCxZQUFJLEtBQUssVUFBVSxPQUFPLFlBQVksTUFBTSxNQUFNLENBQUMsRUFBRSxPQUFPLFlBQVksS0FBSyxLQUFLLFFBQVEsT0FBTyxZQUFZLE1BQU0sTUFBTSxDQUFDLEVBQUUsT0FBTyxZQUFZLEdBQUc7QUFDOUksd0JBQWM7QUFDZCxjQUFJLGVBQWUsS0FBSyxVQUFVLGlCQUFpQixZQUFZO0FBQy9ELHVCQUFhLENBQUMsRUFBRSxVQUFVLElBQUksUUFBUTtBQUN0QyxlQUFLLGNBQWMsYUFBYSxDQUFDLEVBQUUsUUFBUTtBQUMzQztBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUNBLFFBQUksYUFBYTtBQUNiLFVBQUksS0FBSyxzQkFBc0I7QUFDM0IsWUFBSSxpQkFBaUIsR0FBRyxTQUFTLEtBQUssVUFBVSxpQkFBaUIsWUFBWSxDQUFDO0FBQzlFLFlBQUksZ0JBQWdCO0FBQ2hCLHlCQUFlLFVBQVUsSUFBSSxRQUFRO0FBQ3JDLGVBQUssY0FBYyxlQUFlLFFBQVE7QUFBQSxRQUM5QyxPQUFPO0FBQ0gsZUFBSyxjQUFjO0FBQUEsUUFDdkI7QUFBQSxNQUNKLE9BQU87QUFDSCxhQUFLLGNBQWM7QUFBQSxNQUN2QjtBQUNBLFdBQUssY0FBYztBQUFBLElBQ3ZCO0FBQUEsRUFDSjtBQUFBLEVBRUEsV0FBVyxHQUFHO0FBQ1YsU0FBSyxLQUFLO0FBQ1YsTUFBRSxPQUFPLGNBQWMsSUFBSSxZQUFZLHlCQUF5QixFQUFDLFNBQVMsTUFBTSxRQUFRLEVBQUMsUUFBUSxLQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDNUc7QUFBQSxFQUVBLFlBQVksR0FBRztBQUNYLFNBQUssWUFBWSxLQUFLO0FBQ3RCLFNBQUssVUFBVSxLQUFLO0FBQ3BCLFNBQUssS0FBSztBQUNWLE1BQUUsT0FBTyxjQUFjLElBQUksWUFBWSwwQkFBMEIsRUFBQyxTQUFTLE1BQU0sUUFBUSxLQUFJLENBQUMsQ0FBQztBQUFBLEVBQ25HO0FBQUEsRUFFQSxtQkFBbUIsR0FBRztBQUNsQixRQUFJLFNBQVMsRUFBRSxPQUFPLFFBQVEsZUFBZSxFQUFFLFVBQVUsU0FBUyxNQUFNLEdBQ3BFLGNBQWMsU0FBUyxTQUFTLFNBQ2hDLE1BQU0sS0FBSyxVQUFVLGNBQWMsbUJBQWlCLFdBQVc7QUFHbkUsUUFBSSxRQUFRLFNBQVMsSUFBSSxjQUFjLGNBQWMsRUFBRSxPQUFPLEVBQUU7QUFDaEUsUUFBSSxPQUFPLElBQUksY0FBYyxhQUFhLEVBQUU7QUFFNUMsUUFBSSxDQUFDLFFBQVE7QUFDVCxVQUFJLE9BQU8sS0FBSyxVQUFVLEtBQUssS0FBTSxTQUFTLEtBQUssVUFBVSxLQUFLLEtBQUssUUFBUSxLQUFLLFVBQVUsTUFBTSxHQUFJO0FBQ3BHLGdCQUFRLEtBQUssVUFBVSxNQUFNO0FBQzdCLGVBQU8sS0FBSyxVQUFVLEtBQUs7QUFBQSxNQUMvQjtBQUFBLElBQ0o7QUFFQSxRQUFJLEtBQUssU0FBUztBQUNkLFVBQUksT0FBTyxLQUFLLFFBQVEsS0FBSyxLQUFNLFNBQVMsS0FBSyxRQUFRLEtBQUssS0FBSyxRQUFRLEtBQUssUUFBUSxNQUFNLEdBQUk7QUFDOUYsZ0JBQVEsS0FBSyxRQUFRLE1BQU07QUFDM0IsZUFBTyxLQUFLLFFBQVEsS0FBSztBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUVBLFFBQUksS0FBSyxTQUFTO0FBQ2QsVUFBSSxPQUFPLEtBQUssUUFBUSxLQUFLLEtBQU0sU0FBUyxLQUFLLFFBQVEsS0FBSyxLQUFLLFFBQVEsS0FBSyxRQUFRLE1BQU0sR0FBSTtBQUM5RixnQkFBUSxLQUFLLFFBQVEsTUFBTTtBQUMzQixlQUFPLEtBQUssUUFBUSxLQUFLO0FBQUEsTUFDN0I7QUFBQSxJQUNKO0FBRUEsUUFBSSxRQUFRO0FBQ1IsV0FBSyxhQUFhLE1BQU0sTUFBTSxLQUFLLEVBQUUsS0FBSyxJQUFJO0FBQzlDLFVBQUksS0FBSztBQUNMLGFBQUssY0FBYyxRQUFRLEtBQUssYUFBYSxNQUFNLE1BQU0sRUFBRSxJQUFJLEdBQUcsT0FBTztBQUFBLElBQ2pGLE9BQU87QUFDSCxXQUFLLGNBQWMsTUFBTSxNQUFNLEtBQUssRUFBRSxLQUFLLElBQUk7QUFDL0MsVUFBSSxLQUFLO0FBQ0wsYUFBSyxhQUFhLFFBQVEsS0FBSyxjQUFjLE1BQU0sTUFBTSxFQUFFLFNBQVMsR0FBRyxPQUFPO0FBQUEsSUFDdEY7QUFDQSxTQUFLLGdCQUFnQjtBQUFBLEVBQ3pCO0FBQUEsRUFFQSxZQUFZLEdBQUc7QUFDWCxRQUFJLE1BQU0sRUFBRSxPQUFPLFFBQVEsZUFBZSxHQUN0QyxTQUFTLElBQUksVUFBVSxTQUFTLE1BQU07QUFFMUMsUUFBSSxPQUFPLFNBQVMsSUFBSSxjQUFjLGFBQWEsRUFBRSxPQUFPLEVBQUU7QUFDOUQsUUFBSSxTQUFTLFNBQVMsSUFBSSxjQUFjLGVBQWUsRUFBRSxPQUFPLEVBQUU7QUFDbEUsUUFBSSxNQUFNLE1BQU0sR0FBRztBQUNmLGVBQVMsU0FBUyxHQUFHLFNBQVMsSUFBSSxpQkFBaUIsc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUU7QUFBQSxJQUN6RjtBQUNBLFFBQUksU0FBUyxLQUFLLG9CQUFvQixTQUFTLElBQUksY0FBYyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUk7QUFFL0YsUUFBSSxDQUFDLEtBQUssa0JBQWtCO0FBQ3hCLFVBQUksT0FBTyxJQUFJLGNBQWMsYUFBYSxFQUFFO0FBQzVDLFVBQUksU0FBUyxRQUFRLE9BQU87QUFDeEIsZ0JBQVE7QUFDWixVQUFJLFNBQVMsUUFBUSxTQUFTO0FBQzFCLGVBQU87QUFBQSxJQUNmO0FBRUEsUUFBSSxRQUFRO0FBQ1IsVUFBSSxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQ2pDLFlBQU0sS0FBSyxJQUFJO0FBQ2YsWUFBTSxPQUFPLE1BQU07QUFDbkIsWUFBTSxPQUFPLE1BQU07QUFDbkIsV0FBSyxhQUFhLEtBQUs7QUFDdkIsVUFBSSxLQUFLLGtCQUFrQjtBQUN2QixhQUFLLFVBQVUsS0FBSyxVQUFVLE1BQU07QUFBQSxNQUN4QyxXQUFXLEtBQUssV0FBVyxLQUFLLFFBQVEsT0FBTyxZQUFZLE1BQU0sTUFBTSxPQUFPLFlBQVksS0FBSyxLQUFLLFFBQVEsU0FBUyxLQUFLLEdBQUc7QUFDekgsYUFBSyxXQUFXLE1BQU0sTUFBTSxDQUFDO0FBQUEsTUFDakM7QUFBQSxJQUNKLFdBQVcsS0FBSyxTQUFTO0FBQ3JCLFVBQUksTUFBTSxLQUFLLFFBQVEsTUFBTTtBQUM3QixVQUFJLEtBQUssSUFBSTtBQUNiLFVBQUksT0FBTyxNQUFNO0FBQ2pCLFVBQUksT0FBTyxNQUFNO0FBQ2pCLFdBQUssV0FBVyxHQUFHO0FBQUEsSUFDdkI7QUFHQSxTQUFLLGdCQUFnQjtBQUdyQixTQUFLLGlCQUFpQjtBQUd0QixRQUFJLG9CQUFvQixLQUFLLFVBQVUsaUJBQWlCLGVBQWU7QUFDdkUsT0FBRyxJQUFJLG1CQUFtQixVQUFVLCtFQUErRSxLQUFLLGdCQUFnQjtBQUV4SSxTQUFLLGlCQUFpQixNQUFNO0FBQzVCLFNBQUssaUJBQWlCLE9BQU87QUFFN0IsT0FBRyxHQUFHLG1CQUFtQixVQUFVLCtFQUErRSxLQUFLLGdCQUFnQjtBQUFBLEVBQzNJO0FBQUEsRUFFQSxpQkFBaUI7QUFDYixRQUFHLEVBQUUsS0FBSyxRQUFRLFlBQVksU0FBVTtBQUN4QyxRQUFHLENBQUMsS0FBSyxRQUFRLFNBQVMsQ0FBQyxLQUFLLFFBQVEsTUFBTSxPQUFRO0FBRXRELFFBQUksYUFBYSxLQUFLLFFBQVEsTUFBTSxNQUFNLEtBQUssT0FBTyxTQUFTLEdBQzNELFFBQVEsTUFDUixNQUFNO0FBRVYsUUFBSSxXQUFXLFdBQVcsR0FBRztBQUN6QixrQkFBUSxjQUFBRixTQUFPLFdBQVcsQ0FBQyxHQUFHLEtBQUssT0FBTyxNQUFNO0FBQ2hELGdCQUFNLGNBQUFBLFNBQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLE1BQU07QUFBQSxJQUNsRDtBQUVBLFFBQUksS0FBSyxvQkFBb0IsVUFBVSxRQUFRLFFBQVEsTUFBTTtBQUN6RCxrQkFBUSxjQUFBQSxTQUFPLEtBQUssUUFBUSxPQUFPLEtBQUssT0FBTyxNQUFNO0FBQ3JELFlBQU07QUFBQSxJQUNWO0FBRUEsUUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUc7QUFFeEMsU0FBSyxhQUFhLEtBQUs7QUFDdkIsU0FBSyxXQUFXLEdBQUc7QUFDbkIsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQUVBLFFBQVEsR0FBRztBQUVQLFFBQUssRUFBRSxZQUFZLEtBQU8sRUFBRSxZQUFZLElBQUs7QUFDekMsV0FBSyxLQUFLO0FBQUEsSUFDZDtBQUdBLFFBQUksRUFBRSxZQUFZLElBQUk7QUFDbEIsUUFBRSxlQUFlO0FBQ2pCLFFBQUUsZ0JBQWdCO0FBRWxCLFdBQUssS0FBSztBQUFBLElBQ2Q7QUFBQSxFQUNKO0FBQUEsRUFFQSxnQkFBZ0I7QUFDWixRQUFJLEtBQUssUUFBUSxZQUFZLFdBQVcsS0FBSyxpQkFBaUI7QUFDMUQsVUFBSSxXQUFXLEtBQUssVUFBVSxPQUFPLEtBQUssT0FBTyxNQUFNO0FBQ3ZELFVBQUksQ0FBQyxLQUFLLGtCQUFrQjtBQUN4QixvQkFBWSxLQUFLLE9BQU8sWUFBWSxLQUFLLFFBQVEsT0FBTyxLQUFLLE9BQU8sTUFBTTtBQUFBLE1BQzlFO0FBQ0EsVUFBSSxhQUFhLEtBQUssUUFBUSxPQUFPO0FBQ2pDLGFBQUssUUFBUSxRQUFRO0FBQUEsTUFFekI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBRUEsU0FBUztBQUVMLFFBQUksS0FBSyxvQkFBb0I7QUFFekIsZUFBUyxvQkFBb0IsYUFBYSxLQUFLLGtCQUFrQjtBQUVqRSxlQUFTLG9CQUFvQixZQUFZLEtBQUssa0JBQWtCO0FBQ2hFLFNBQUcsSUFBSSxVQUFVLFNBQVMsMEJBQTBCLEtBQUssa0JBQWtCO0FBRTNFLGVBQVMsb0JBQW9CLFdBQVcsS0FBSyxrQkFBa0I7QUFDL0QsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxRQUFHLEtBQUssV0FBVTtBQUNkLGFBQU8saUJBQWlCLFVBQVUsS0FBSyxTQUFTO0FBQ2hELGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQ0EsUUFBRyxLQUFLLGlCQUFnQjtBQUNwQixTQUFHLElBQUksS0FBSyxVQUFVLGNBQWMsU0FBUyxHQUFHLFNBQVMsTUFBTSxLQUFLLGVBQWU7QUFDbkYsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxRQUFJLGVBQWUsS0FBSyxVQUFVLGNBQWMsY0FBYztBQUM5RCxRQUFHLEtBQUssaUJBQWdCO0FBQ3BCLFNBQUcsSUFBSSxjQUFjLFNBQVMsbUJBQW1CLEtBQUssZUFBZTtBQUNyRSxhQUFPLEtBQUs7QUFBQSxJQUNoQjtBQUNBLFFBQUcsS0FBSyxrQkFBaUI7QUFDckIsU0FBRyxJQUFJLGNBQWMsU0FBUyxvQkFBb0IsS0FBSyxnQkFBZ0I7QUFDdkUsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxRQUFJLEtBQUssUUFBUSxZQUFZLFdBQVcsS0FBSyxRQUFRLFlBQVksVUFBVTtBQUN2RSxVQUFHLEtBQUssV0FBVTtBQUNkLFdBQUcsSUFBSSxLQUFLLFNBQVMsU0FBUyxLQUFLLFNBQVM7QUFDNUMsV0FBRyxJQUFJLEtBQUssU0FBUyxTQUFTLEtBQUssU0FBUztBQUM1QyxlQUFPLEtBQUs7QUFBQSxNQUNoQjtBQUNBLFVBQUcsS0FBSyxxQkFBb0I7QUFDeEIsV0FBRyxJQUFJLEtBQUssU0FBUyxTQUFTLEtBQUssbUJBQW1CO0FBQ3RELGVBQU8sS0FBSztBQUFBLE1BQ2hCO0FBQUM7QUFDRCxVQUFHLEtBQUssY0FBYTtBQUNqQixXQUFHLElBQUksS0FBSyxTQUFTLFdBQVcsS0FBSyxZQUFZO0FBQ2pELGVBQU8sS0FBSztBQUFBLE1BQ2hCO0FBQUEsSUFDSixPQUFPO0FBQ0gsVUFBRyxLQUFLLGFBQVk7QUFDaEIsV0FBRyxJQUFJLEtBQUssU0FBUyxTQUFTLEtBQUssV0FBVztBQUM5QyxXQUFHLElBQUksS0FBSyxTQUFTLFdBQVcsS0FBSyxXQUFXO0FBQ2hELGVBQU8sS0FBSztBQUFBLE1BQ2hCO0FBQUM7QUFBQSxJQUNMO0FBQ0EsUUFBSSxvQkFBb0IsS0FBSyxVQUFVLGlCQUFpQixlQUFlO0FBQ3ZFLFFBQUcsS0FBSyxnQkFBZTtBQUNuQixTQUFHLElBQUksbUJBQW1CLFNBQVMsU0FBUyxLQUFLLGNBQWM7QUFDL0QsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxRQUFHLEtBQUssZ0JBQWU7QUFDbkIsU0FBRyxJQUFJLG1CQUFtQixTQUFTLFNBQVMsS0FBSyxjQUFjO0FBQy9ELGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQ0EsUUFBRyxLQUFLLGdCQUFlO0FBQ25CLFNBQUcsSUFBSSxtQkFBbUIsYUFBYSxnQkFBZ0IsS0FBSyxjQUFjO0FBQzFFLGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQ0EsUUFBRyxLQUFLLGdCQUFlO0FBQ25CLFNBQUcsSUFBSSxtQkFBbUIsY0FBYyxnQkFBZ0IsS0FBSyxjQUFjO0FBQzNFLGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQ0EsUUFBRyxLQUFLLHlCQUF3QjtBQUM1QixTQUFHLElBQUksbUJBQW1CLFVBQVUscUJBQXFCLEtBQUssdUJBQXVCO0FBQ3JGLFNBQUcsSUFBSSxtQkFBbUIsVUFBVSxzQkFBc0IsS0FBSyx1QkFBdUI7QUFDdEYsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxRQUFHLEtBQUssa0JBQWlCO0FBQ3JCLFNBQUcsSUFBSSxtQkFBbUIsVUFBVSwrRUFBK0UsS0FBSyxnQkFBZ0I7QUFDeEksYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFDQSxXQUFPLEtBQUs7QUFDWixXQUFPLEtBQUssUUFBUTtBQUFBLEVBQ3hCO0FBQUEsRUFFQSxhQUFhLFdBQVU7QUFDbkIsUUFBSSxPQUFPLGNBQWMsVUFBVTtBQUMvQixTQUFHLElBQUksS0FBSyxVQUFVLGNBQWMsU0FBUyxHQUFHLFNBQVMsTUFBTSxLQUFLLGVBQWU7QUFDbkYsV0FBSyxTQUFTLENBQUM7QUFDZixVQUFJLGFBQWEsT0FBTyxLQUFLLFNBQVM7QUFDdEMsZUFBUSxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsRUFBRSxHQUFFO0FBQ3RDLFlBQUksUUFBUSxXQUFXLENBQUM7QUFDeEIsWUFBSSxPQUFPLE1BQU07QUFFakIsWUFBSSxPQUFPLFVBQVUsS0FBSyxFQUFFLENBQUMsTUFBTTtBQUMvQixzQkFBUSxjQUFBQSxTQUFPLFVBQVUsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLE9BQU8sTUFBTTtBQUFBO0FBRXRELHNCQUFRLGNBQUFBLFNBQU8sVUFBVSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBRXRDLFlBQUksT0FBTyxVQUFVLEtBQUssRUFBRSxDQUFDLE1BQU07QUFDL0Isb0JBQU0sY0FBQUEsU0FBTyxVQUFVLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLE1BQU07QUFBQTtBQUVwRCxvQkFBTSxjQUFBQSxTQUFPLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUlwQyxZQUFJLEtBQUssV0FBVyxNQUFNLFNBQVMsS0FBSyxPQUFPO0FBQzNDLGtCQUFRLEtBQUssUUFBUSxNQUFNO0FBRS9CLFlBQUksVUFBVSxLQUFLO0FBQ25CLFlBQUksS0FBSyxXQUFXLFdBQVcsTUFBTSxNQUFNLEVBQUUsSUFBSSxLQUFLLE9BQU8sRUFBRSxRQUFRLE9BQU87QUFDMUUsb0JBQVUsTUFBTSxNQUFNLEVBQUUsSUFBSSxLQUFLLE9BQU87QUFDNUMsWUFBSSxXQUFXLElBQUksUUFBUSxPQUFPO0FBQzlCLGdCQUFNLFFBQVEsTUFBTTtBQUl4QixZQUFLLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxTQUFTLEtBQUssYUFBYSxXQUFXLEtBQUssS0FDMUUsV0FBVyxNQUFNLFFBQVEsU0FBUyxLQUFLLGFBQWEsV0FBVyxLQUFLO0FBQ3hFO0FBR0osWUFBSSxPQUFPLFNBQVMsY0FBYyxVQUFVO0FBQzVDLGFBQUssWUFBWTtBQUNqQixZQUFJLFlBQVksS0FBSztBQUVyQixhQUFLLE9BQU8sU0FBUyxJQUFJLENBQUMsT0FBTyxHQUFHO0FBQUEsTUFDeEM7QUFFQSxVQUFJLE9BQU87QUFDWCxlQUFTLFNBQVMsS0FBSyxRQUFRO0FBQzNCLGdCQUFRLHlCQUF5QixRQUFRLE9BQU8sUUFBUTtBQUFBLE1BQzVEO0FBQ0EsVUFBSSxLQUFLLHNCQUFzQjtBQUMzQixnQkFBUSx5QkFBeUIsS0FBSyxPQUFPLG1CQUFtQixPQUFPLEtBQUssT0FBTyxtQkFBbUI7QUFBQSxNQUMxRztBQUNBLGNBQVE7QUFDUixVQUFJLFlBQVksS0FBSyxVQUFVLGNBQWMsU0FBUztBQUN0RCxnQkFBVSxZQUFZLFVBQVUsVUFBVTtBQUMxQyxnQkFBVSxtQkFBbUIsY0FBYyxJQUFJO0FBQUEsSUFDbkQ7QUFFQSxTQUFLLGtCQUFrQixTQUFVLEdBQUc7QUFBRSxXQUFLLFdBQVcsQ0FBQztBQUFBLElBQUcsRUFBRSxLQUFLLElBQUk7QUFDckUsT0FBRyxHQUFHLEtBQUssVUFBVSxjQUFjLFNBQVMsR0FBRyxTQUFTLE1BQU0sS0FBSyxlQUFlO0FBQUEsRUFDdEY7QUFDSjtBQUdBLElBQUksS0FBSztBQUFBLEVBQ0wsYUFBYSxTQUFVLElBQUksU0FBUztBQUNoQyxRQUFJLFlBQVksUUFBUSxNQUFNLEdBQUc7QUFDakMsYUFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVEsRUFBRSxHQUFHO0FBQ3ZDLFNBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsVUFBVSxTQUFVLElBQUksU0FBUztBQUM3QixRQUFJLENBQUM7QUFDRDtBQUNKLFFBQUksT0FBTyxHQUFHLFdBQVc7QUFDckIsZUFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsRUFBRTtBQUM3QixXQUFHLFlBQVksR0FBRyxDQUFDLEdBQUcsT0FBTztBQUFBO0FBRWpDLFNBQUcsWUFBWSxJQUFJLE9BQU87QUFBQSxFQUNsQztBQUFBLEVBQ0EsU0FBUyxJQUFJO0FBQ1QsUUFBRyxDQUFDO0FBQ0EsYUFBTztBQUNYLFFBQUksT0FBTyxHQUFHLFdBQVc7QUFDckIsVUFBRyxHQUFHLFNBQVM7QUFDWCxlQUFPLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFBQTtBQUV2QixlQUFPO0FBQUE7QUFFWCxhQUFPO0FBQUEsRUFDZjtBQUFBLEVBQ0EsbUJBQW1CLElBQUk7QUFDbkIsUUFBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLFFBQVE7QUFDakMsYUFBTztBQUNYLGFBQVEsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLFFBQVEsRUFBRSxHQUFFO0FBQ3RDLFVBQUcsR0FBRyxRQUFRLENBQUMsRUFBRTtBQUNiLGVBQU8sR0FBRyxRQUFRLENBQUM7QUFBQSxJQUMzQjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFDQSx3QkFBd0IsU0FBVSxJQUFJO0FBQ2xDLFFBQUksQ0FBQyxNQUFNLEVBQUUsY0FBYztBQUN2QixhQUFPO0FBQ1gsUUFBSSxXQUFXLEdBQUcsU0FBUyxZQUFZO0FBQ3ZDLFFBQUksR0FBRztBQUNILGFBQU8sV0FBVyxNQUFNLEdBQUc7QUFDL0IsYUFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLFVBQVUsUUFBUSxFQUFFLEdBQUc7QUFDMUMsa0JBQVksTUFBTSxHQUFHLFVBQVUsQ0FBQztBQUFBLElBQ3BDO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLE1BQU0sU0FBVSxJQUFJLE1BQU07QUFDdEIsUUFBSTtBQUNBLFNBQUcsWUFBWTtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxRQUFRLFNBQVUsSUFBSTtBQUNsQixRQUFJLENBQUM7QUFDRCxhQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtBQU03QixRQUFJLENBQUMsR0FBRyxlQUFlLEVBQUU7QUFDckIsYUFBTyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7QUFHN0IsUUFBSSxPQUFPLEdBQUcsc0JBQXNCO0FBQ3BDLFFBQUksTUFBTSxHQUFHLGNBQWM7QUFDM0IsV0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLE1BQU0sSUFBSTtBQUFBLE1BQ3BCLE1BQU0sS0FBSyxPQUFPLElBQUk7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVEsU0FBVSxJQUFJLE9BQU8sVUFBVTtBQUNuQyxRQUFJLE9BQU8sR0FBRyxXQUFXO0FBQ3JCLGVBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7QUFDN0IsV0FBRyxDQUFDLEVBQUUsb0JBQW9CLE9BQU8sUUFBUTtBQUFBO0FBRTdDLFNBQUcsb0JBQW9CLE9BQU8sUUFBUTtBQUFBLEVBQzlDO0FBQUEsRUFDQSxLQUFLLFNBQVUsSUFBSSxPQUFPLFFBQVEsUUFBUTtBQUN0QyxRQUFJLENBQUM7QUFDRDtBQUNKLFFBQUksT0FBTyxXQUFXLFlBQVk7QUFDOUIsU0FBRyxPQUFPLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDL0IsT0FBTztBQUNILFVBQUksT0FBTyxHQUFHLFdBQVc7QUFDckIsaUJBQVEsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7QUFDNUIsYUFBRyxPQUFPLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixNQUFNLEdBQUcsT0FBTyxNQUFNO0FBQUE7QUFFM0QsV0FBRyxPQUFPLEdBQUcsaUJBQWlCLE1BQU0sR0FBRyxPQUFPLE1BQU07QUFBQSxJQUM1RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU8sU0FBVSxJQUFJLE9BQU8sVUFBVTtBQUNsQyxRQUFJLE9BQU8sR0FBRyxXQUFXO0FBQ3JCLGVBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7QUFDN0IsV0FBRyxDQUFDLEVBQUUsaUJBQWlCLE9BQU8sUUFBUTtBQUFBO0FBRTFDLFNBQUcsaUJBQWlCLE9BQU8sUUFBUTtBQUFBLEVBQzNDO0FBQUEsRUFDQSxJQUFJLFNBQVUsSUFBSSxPQUFPLFFBQVEsUUFBUTtBQUNyQyxRQUFJLENBQUM7QUFDRDtBQUNKLFFBQUksT0FBTyxXQUFXLFlBQVk7QUFDOUIsU0FBRyxNQUFNLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDOUIsT0FBTztBQUNILFVBQUksT0FBTyxHQUFHLFdBQVc7QUFDckIsaUJBQVEsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7QUFDNUIsYUFBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixNQUFNLEdBQUcsT0FBTyxNQUFNO0FBQUE7QUFFMUQsV0FBRyxNQUFNLEdBQUcsaUJBQWlCLE1BQU0sR0FBRyxPQUFPLE1BQU07QUFBQSxJQUMzRDtBQUFBLEVBQ0o7QUFDSjs7O0FEbjFEQSxhQUFBTyxRQUFNLE9BQU8sV0FBQUMsT0FBRztBQUNoQixhQUFBRCxRQUFNLE9BQU8sZ0JBQUFFLE9BQVE7QUFDckIsYUFBQUYsUUFBTSxPQUFPLHlCQUFBRyxPQUFpQjtBQUM5QixhQUFBSCxRQUFNLE9BQU8scUJBQUFJLE9BQWE7QUFDMUIsYUFBQUosUUFBTSxPQUFPLHNCQUFBSyxPQUFjO0FBRTNCLE9BQU8sa0JBQWtCO0FBQ1YsU0FBUixtQkFBb0M7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFVBQUFIO0FBQ3BCLEdBQUc7QUFFRixNQUFJLGNBQWMsQ0FBQztBQUNuQixXQUFTLE9BQU8sUUFBUTtBQUNwQixRQUFJLFlBQVksT0FBTyxHQUFHO0FBQzFCLGdCQUFZLEdBQUcsSUFBSSxVQUFVLElBQUksQ0FBQyxtQkFBZSxhQUFBRixTQUFNLFlBQVksYUFBYSxDQUFDO0FBQUEsRUFDckY7QUFFQSxTQUFPO0FBQUEsSUFDSCxpQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZSxTQUFVTSxRQUFPO0FBQzVCLFVBQUksQ0FBQ0EsVUFBUyxDQUFDLGdCQUFnQjtBQUMzQixlQUFPQTtBQUFBLE1BQ1g7QUFFQSxZQUFNLENBQUMsTUFBTSxFQUFFLElBQUlBLE9BQU0sTUFBTSxTQUFTO0FBQ3hDLFlBQU0sZUFBVyxhQUFBTixTQUFNLE1BQU0sYUFBYTtBQUMxQyxZQUFNLGFBQVMsYUFBQUEsU0FBTSxJQUFJLGFBQWE7QUFFdEMsaUJBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxPQUFPLENBQUMsS0FBSyxPQUFPLFFBQVEsV0FBVyxHQUFHO0FBQ3JFLFlBQUksU0FBUyxPQUFPLFNBQVMsS0FBSyxPQUFPLE9BQU8sT0FBTyxHQUFHO0FBQ3RELGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFFQSxhQUFPTTtBQUFBLElBQ1g7QUFBQSxJQUNBLE1BQU0sV0FBWTtBQUNkLFVBQUlKLFdBQVU7QUFDVixxQkFBQUYsUUFBTSxHQUFHLFdBQVdFLFNBQVE7QUFBQSxNQUNoQztBQUVBLFVBQUksa0JBQWtCLENBQUM7QUFDdkIsVUFBSSxrQkFBa0IsVUFBYSxjQUFjLFNBQVMsR0FBRztBQUN6RCwwQkFBa0IsY0FBYyxJQUFJLG9CQUFjLGFBQUFGLFNBQU0sWUFBWSxhQUFhLENBQUM7QUFBQSxNQUN0RjtBQUVBLFdBQUssa0JBQWtCLElBQUk7QUFBQSxRQUN2QixLQUFLLE1BQU07QUFBQSxRQUNYO0FBQUE7QUFBQSxVQUVJLFdBQVcsYUFBYSxXQUFPLGFBQUFBLFNBQU0sV0FBVyxhQUFhLElBQUk7QUFBQSxVQUNqRSxTQUFTLFdBQVcsV0FBTyxhQUFBQSxTQUFNLFNBQVMsYUFBYSxJQUFJO0FBQUEsVUFDM0QsU0FBUyxXQUFXLFdBQU8sYUFBQUEsU0FBTSxTQUFTLGFBQWEsSUFBSTtBQUFBLFVBQzNELFNBQVMsV0FBVyxXQUFPLGFBQUFBLFNBQU0sU0FBUyxhQUFhLElBQUk7QUFBQTtBQUFBLFVBRTNELFFBQVEsZUFBZSxTQUFZO0FBQUEsVUFDbkMsZUFBZSxDQUFDLFNBQVM7QUFDckIsZ0JBQUksbUJBQW1CLFFBQVEsZ0JBQWdCLFNBQVMsR0FBRztBQUN2RCxxQkFBTyxnQkFBZ0I7QUFBQSxnQkFBSyxrQkFDeEIsYUFBYSxJQUFJLEVBQUUsUUFBUSxLQUFLLEVBQUUsT0FBTyxLQUFLLElBQUksRUFBRSxRQUFRLEtBQUssR0FBRyxLQUFLO0FBQUEsY0FDN0U7QUFBQSxZQUNKLE9BQU87QUFDSCxxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxhQUFPLGlCQUFpQix5QkFBeUIsU0FBUyxJQUFJO0FBQzFELGNBQU0sU0FBUyxHQUFHLE9BQU87QUFDekIsWUFBSSxnQkFBZ0I7QUFDaEIsaUNBQXVCLE9BQU8sVUFBVSxPQUFPLGFBQWEsR0FBRyxJQUFJO0FBQUEsUUFDdkUsT0FBTztBQUNIO0FBQUEsWUFDSSxPQUFPLFVBQVUsT0FBTyxhQUFhLElBQUksWUFBWSxPQUFPLFFBQVEsT0FBTyxhQUFhO0FBQUEsWUFDeEY7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUVELFdBQUssY0FBYyxLQUFLLGlCQUFpQixLQUFLLEtBQUs7QUFFbkQsVUFBSSxTQUFTO0FBQ2IsaUJBQVcsV0FBVztBQUNsQixlQUFPLE1BQU0sVUFBVSxRQUFRLE9BQU8sY0FBYyxPQUFPLEtBQUs7QUFBQSxNQUNwRSxHQUFHLEVBQUU7QUFFTCxXQUFLLE9BQU8sU0FBUyxTQUFTLE9BQU87QUFDakMsWUFBSSxTQUFTLE1BQU07QUFDZixrQkFBUTtBQUNSLGlCQUFPLE1BQU0sT0FBTyxlQUFlO0FBQUEsUUFDdkMsT0FBTztBQUNILGlCQUFPLGNBQWMsT0FBTyxpQkFBaUIsS0FBSztBQUFBLFFBQ3REO0FBQ0EsZUFBTyxNQUFNLFVBQVUsUUFBUSxPQUFPLGNBQWMsS0FBSztBQUFBLE1BQzdELENBQUM7QUFBQSxJQUNMO0FBQUEsSUFDQSxPQUFPLFNBQVUsaUJBQWlCO0FBQzlCLFVBQUksbUJBQW1CLE1BQU07QUFDekI7QUFBQSxNQUNKO0FBQ0Esc0JBQWdCLGlCQUFhLGFBQUFBLFNBQU0sQ0FBQztBQUNwQyxzQkFBZ0IsZUFBVyxhQUFBQSxTQUFNLENBQUM7QUFBQSxJQUN0QztBQUFBLElBRUEsZUFBZSxTQUFVLGlCQUFpQk0sUUFBTztBQUM3QyxVQUFJQSxVQUFTLE1BQU07QUFDZixhQUFLLE1BQU0sZUFBZTtBQUMxQjtBQUFBLE1BQ0o7QUFFQSxZQUFNLFFBQVFBLE9BQU0sTUFBTSxTQUFTO0FBQ25DLFVBQUksTUFBTSxXQUFXLEtBQUssbUJBQW1CLE1BQU07QUFDL0Msd0JBQWdCLGlCQUFhLGFBQUFOLFNBQU0sTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQzNELHdCQUFnQixlQUFXLGFBQUFBLFNBQU0sTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQUEsTUFDN0QsT0FBTztBQUNILGFBQUssTUFBTSxlQUFlO0FBQUEsTUFDOUI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKOyIsCiAgIm5hbWVzIjogWyJ0IiwgImUiLCAibiIsICJyIiwgImkiLCAicyIsICJ1IiwgImEiLCAiTSIsICJtIiwgImYiLCAibCIsICIkIiwgInkiLCAidiIsICJnIiwgIkQiLCAibyIsICJkIiwgImMiLCAiaCIsICJ0IiwgImkiLCAiZSIsICJzIiwgImYiLCAibiIsICJ1IiwgIm8iLCAiciIsICJ0IiwgIm4iLCAiaSIsICJvIiwgInIiLCAiZSIsICJ1IiwgImYiLCAicyIsICJhIiwgImUiLCAidCIsICJuIiwgInIiLCAiaSIsICJvIiwgImEiLCAiZiIsICJoIiwgInUiLCAiZCIsICJsIiwgInMiLCAiYyIsICJtIiwgIk0iLCAiZSIsICJ0IiwgImUiLCAiaSIsICJmb3JtYXQiLCAibG9jYWxlIiwgInRvIiwgImZyb20iLCAibm93IiwgInNpZ24iLCAidG9rZW4iLCAib3JkaW5hbCIsICJpIiwgImRpZmYiLCAibG9jYWxlRGF0YSIsICJob3VycyIsICJtaW51dGVzIiwgInRva2VucyIsICJtZXJpZGllbSIsICJ5ZWFycyIsICJtb250aHMiLCAid2Vla3MiLCAiZGF5cyIsICJzZWNvbmRzIiwgIm1pbGxpc2Vjb25kcyIsICJvZmZzZXQiLCAiaXNTYW1lT3JBZnRlciIsICJpc1NhbWVPckJlZm9yZSIsICJ1dGMiLCAidGhyZXNob2xkcyIsICJtb21lbnQiLCAicmFuZ2UiLCAiY29sIiwgInJvdyIsICJlIiwgInRpdGxlIiwgImNhbCIsICJkYXlqcyIsICJ1dGMiLCAidGltZXpvbmUiLCAiY3VzdG9tUGFyc2VGb3JtYXQiLCAiaXNTYW1lT3JBZnRlciIsICJpc1NhbWVPckJlZm9yZSIsICJzdGF0ZSJdCn0K

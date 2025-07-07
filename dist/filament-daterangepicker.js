var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// node_modules/dayjs/plugin/localizedFormat.js
var require_localizedFormat = __commonJS({
  "node_modules/dayjs/plugin/localizedFormat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_localizedFormat = t();
    }(exports, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t, o, n) {
        var r = o.prototype, i = r.format;
        n.en.formats = e, r.format = function(t2) {
          void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
          var o2 = this.$locale().formats, n2 = function(t3, o3) {
            return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n3, r2) {
              var i2 = r2 && r2.toUpperCase();
              return n3 || o3[r2] || e[r2] || o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t5, o4) {
                return t5 || o4.slice(1);
              });
            });
          }(t2, void 0 === o2 ? {} : o2);
          return i.call(this, n2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/localeData.js
var require_localeData = __commonJS({
  "node_modules/dayjs/plugin/localeData.js"(exports, module) {
    !function(n, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
    }(exports, function() {
      "use strict";
      return function(n, e, t) {
        var r = e.prototype, o = function(n2) {
          return n2 && (n2.indexOf ? n2 : n2.s);
        }, u = function(n2, e2, t2, r2, u2) {
          var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map(function(n3) {
            return n3.slice(0, r2);
          });
          if (!u2) return f;
          var d = i2.weekStart;
          return f.map(function(n3, e3) {
            return f[(e3 + (d || 0)) % 7];
          });
        }, i = function() {
          return t.Ls[t.locale()];
        }, a = function(n2, e2) {
          return n2.formats[e2] || function(n3) {
            return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n4, e3, t2) {
              return e3 || t2.slice(1);
            });
          }(n2.formats[e2.toUpperCase()]);
        }, s = function() {
          var n2 = this;
          return { months: function(e2) {
            return e2 ? e2.format("MMMM") : u(n2, "months");
          }, monthsShort: function(e2) {
            return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return n2.$locale().weekStart || 0;
          }, weekdays: function(e2) {
            return e2 ? e2.format("dddd") : u(n2, "weekdays");
          }, weekdaysMin: function(e2) {
            return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(e2) {
            return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(e2) {
            return a(n2.$locale(), e2);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        r.localeData = function() {
          return s.bind(this)();
        }, t.localeData = function() {
          var n2 = i();
          return { firstDayOfWeek: function() {
            return n2.weekStart || 0;
          }, weekdays: function() {
            return t.weekdays();
          }, weekdaysShort: function() {
            return t.weekdaysShort();
          }, weekdaysMin: function() {
            return t.weekdaysMin();
          }, months: function() {
            return t.months();
          }, monthsShort: function() {
            return t.monthsShort();
          }, longDateFormat: function(e2) {
            return a(n2, e2);
          }, meridiem: n2.meridiem, ordinal: n2.ordinal };
        }, t.months = function() {
          return u(i(), "months");
        }, t.monthsShort = function() {
          return u(i(), "monthsShort", "months", 3);
        }, t.weekdays = function(n2) {
          return u(i(), "weekdays", null, null, n2);
        }, t.weekdaysShort = function(n2) {
          return u(i(), "weekdaysShort", "weekdays", 3, n2);
        }, t.weekdaysMin = function(n2) {
          return u(i(), "weekdaysMin", "weekdays", 2, n2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/weekOfYear.js
var require_weekOfYear = __commonJS({
  "node_modules/dayjs/plugin/weekOfYear.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekOfYear = t();
    }(exports, function() {
      "use strict";
      var e = "week", t = "year";
      return function(i, n, r) {
        var f = n.prototype;
        f.week = function(i2) {
          if (void 0 === i2 && (i2 = null), null !== i2) return this.add(7 * (i2 - this.week()), "day");
          var n2 = this.$locale().yearStart || 1;
          if (11 === this.month() && this.date() > 25) {
            var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
            if (f2.isBefore(s)) return 1;
          }
          var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
          return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
        }, f.weeks = function(e2) {
          return void 0 === e2 && (e2 = null), this.week(e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isoWeek.js
var require_isoWeek = __commonJS({
  "node_modules/dayjs/plugin/isoWeek.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isoWeek = t();
    }(exports, function() {
      "use strict";
      var e = "day";
      return function(t, i, s) {
        var a = function(t2) {
          return t2.add(4 - t2.isoWeekday(), e);
        }, d = i.prototype;
        d.isoWeekYear = function() {
          return a(this).year();
        }, d.isoWeek = function(t2) {
          if (!this.$utils().u(t2)) return this.add(7 * (t2 - this.isoWeek()), e);
          var i2, d2, n2, o, r = a(this), u = (i2 = this.isoWeekYear(), d2 = this.$u, n2 = (d2 ? s.utc : s)().year(i2).startOf("year"), o = 4 - n2.isoWeekday(), n2.isoWeekday() > 4 && (o += 7), n2.add(o, e));
          return r.diff(u, "week") + 1;
        }, d.isoWeekday = function(e2) {
          return this.$utils().u(e2) ? this.day() || 7 : this.day(this.day() % 7 ? e2 : e2 - 7);
        };
        var n = d.startOf;
        d.startOf = function(e2, t2) {
          var i2 = this.$utils(), s2 = !!i2.u(t2) || t2;
          return "isoweek" === i2.p(e2) ? s2 ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : n.bind(this)(e2, t2);
        };
      };
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

// resources/js/plugin.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_customParseFormat = __toESM(require_customParseFormat(), 1);
var import_localizedFormat = __toESM(require_localizedFormat(), 1);
var import_localeData = __toESM(require_localeData(), 1);
var import_weekOfYear = __toESM(require_weekOfYear(), 1);
var import_isoWeek = __toESM(require_isoWeek(), 1);
import_dayjs.default.extend(import_customParseFormat.default);
import_dayjs.default.extend(import_localizedFormat.default);
import_dayjs.default.extend(import_localeData.default);
import_dayjs.default.extend(import_weekOfYear.default);
import_dayjs.default.extend(import_isoWeek.default);
var DateRangePicker = class {
  constructor(element, options = {}, cb = () => {
  }) {
    this.parentEl = options.parentEl ? typeof options.parentEl === "string" ? document.querySelector(options.parentEl) : options.parentEl : document.body;
    this.element = typeof element === "string" ? document.querySelector(element) : element;
    this.startDate = (0, import_dayjs.default)().startOf("day");
    this.endDate = (0, import_dayjs.default)().endOf("day");
    this.minDate = null;
    this.maxDate = null;
    this.maxSpan = null;
    this.autoApply = false;
    this.singleDatePicker = false;
    this.showDropdowns = false;
    this.minYear = (0, import_dayjs.default)().subtract(100, "year").format("YYYY");
    this.maxYear = (0, import_dayjs.default)().add(100, "year").format("YYYY");
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
    this._outsideClickProxy = null;
    this._resizeProxy = null;
    this.previousRightTime = null;
    this.isShowing = false;
    this.leftCalendar = {};
    this.rightCalendar = {};
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
      format: import_dayjs.default.localeData().longDateFormat("L"),
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      weekLabel: "W",
      customRangeLabel: "Custom Range",
      daysOfWeek: import_dayjs.default.weekdaysMin(),
      monthNames: import_dayjs.default.monthsShort(),
      firstDay: import_dayjs.default.localeData().firstDayOfWeek()
    };
    if (typeof cb === "function") {
      this.callback = cb;
    }
    this.applyOptions(options);
    if (this.element._daterangepicker) {
      this.element._daterangepicker.destroy();
    }
    this.element._daterangepicker = this;
    this.renderRanges(options);
    this.container.classList.add(this.locale.direction);
    if (!this.timePicker) {
      this.startDate = this.startDate.startOf("day");
      this.endDate = this.endDate.endOf("day");
      this.container.querySelectorAll(".calendar-time").forEach((el) => el.style.display = "none");
    }
    if (this.timePicker && this.autoApply) {
      this.autoApply = false;
    }
    if (this.autoApply) {
      this.container.classList.add("auto-apply");
    }
    if (typeof options.ranges === "object") {
      this.container.classList.add("show-ranges");
    }
    if (this.singleDatePicker) {
      this.container.classList.add("single");
      const leftCal = this.container.querySelector(".drp-calendar.left");
      const rightCal = this.container.querySelector(".drp-calendar.right");
      if (leftCal) leftCal.classList.add("single");
      if (leftCal) leftCal.style.display = "";
      if (rightCal) rightCal.style.display = "none";
      if (!this.timePicker && this.autoApply) {
        this.container.classList.add("auto-apply");
      }
    }
    if (typeof options.ranges === "undefined" && !this.singleDatePicker || this.alwaysShowCalendars) {
      this.container.classList.add("show-calendar");
    }
    this.container.classList.add("opens" + this.opens);
    const applyBtn = this.container.querySelector(".applyBtn");
    const cancelBtn = this.container.querySelector(".cancelBtn");
    if (applyBtn) {
      applyBtn.className += " " + this.buttonClasses + " " + this.applyButtonClasses;
      applyBtn.innerHTML = this.locale.applyLabel;
    }
    if (cancelBtn) {
      cancelBtn.className += " " + this.buttonClasses + " " + this.cancelButtonClasses;
      cancelBtn.innerHTML = this.locale.cancelLabel;
    }
    if (typeof options.startDate === "undefined" && typeof options.endDate === "undefined") {
      this.parseInputValueForDates();
    }
    this._attachEvents();
    this.updateElement();
  }
  // --- Helper for custom template support ---
  _createContainer(options) {
    let template = options && options.template ? options.template : `
           <div class="daterangepicker">
               <div class="ranges"></div>
               <div class="drp-calendar left">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-calendar right">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-buttons">
                   <span class="drp-selected"></span>
                   <button class="cancelBtn" type="button"></button>
                   <button class="applyBtn" disabled="disabled" type="button"></button>
               </div>
           </div>
        `;
    let container;
    if (typeof template === "string") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = template.trim();
      container = tempDiv.firstElementChild && tempDiv.firstElementChild.classList.contains("daterangepicker") ? tempDiv.firstElementChild : tempDiv;
    } else if (template instanceof HTMLElement) {
      container = template;
    } else {
      throw new Error("Invalid template for DateRangePicker");
    }
    return container;
  }
  // --- Add this method to your class ---
  applyOptions(options) {
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
        const elem = document.createElement("textarea");
        elem.innerHTML = options.locale.customRangeLabel;
        this.locale.customRangeLabel = elem.value;
      }
    }
    if (this.container) {
      this.container.classList.add(this.locale.direction);
    }
    if (typeof options.startDate === "string")
      this.startDate = (0, import_dayjs.default)(options.startDate, this.locale.format);
    if (typeof options.endDate === "string")
      this.endDate = (0, import_dayjs.default)(options.endDate, this.locale.format);
    if (typeof options.minDate === "string")
      this.minDate = (0, import_dayjs.default)(options.minDate, this.locale.format);
    if (typeof options.maxDate === "string")
      this.maxDate = (0, import_dayjs.default)(options.maxDate, this.locale.format);
    if (typeof options.startDate === "object")
      this.startDate = (0, import_dayjs.default)(options.startDate);
    if (typeof options.endDate === "object")
      this.endDate = (0, import_dayjs.default)(options.endDate);
    if (typeof options.minDate === "object")
      this.minDate = (0, import_dayjs.default)(options.minDate);
    if (typeof options.maxDate === "object")
      this.maxDate = (0, import_dayjs.default)(options.maxDate);
    if (this.minDate && this.startDate.isBefore(this.minDate))
      this.startDate = this.minDate;
    if (this.maxDate && this.endDate.isAfter(this.maxDate))
      this.endDate = this.maxDate;
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
        this.endDate = this.startDate;
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
    this.parentEl = options.parentEl ? typeof options.parentEl === "string" ? document.querySelector(options.parentEl) : options.parentEl : document.body;
    let template = options && options.template ? options.template : `
           <div class="daterangepicker">
               <div class="ranges"></div>
               <div class="drp-calendar left">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-calendar right">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-buttons">
                   <span class="drp-selected"></span>
                   <button class="cancelBtn" type="button"></button>
                   <button class="applyBtn" disabled="disabled" type="button"></button>
               </div>
           </div>
        `;
    let container;
    if (typeof template === "string") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = template.trim();
      container = tempDiv.firstElementChild && tempDiv.firstElementChild.classList.contains("daterangepicker") ? tempDiv.firstElementChild : tempDiv;
    } else if (template instanceof HTMLElement) {
      container = template;
    } else {
      throw new Error("Invalid template for DateRangePicker");
    }
    this.container = container;
    this.parentEl.appendChild(this.container);
  }
  parseInputValueForDates() {
    if (this.element.tagName === "INPUT" && (this.element.type === "text" || this.element.type === "search")) {
      const val = this.element.value;
      const split = val.split(this.locale.separator);
      let start = null, end = null;
      if (split.length === 2) {
        start = (0, import_dayjs.default)(split[0], this.locale.format);
        end = (0, import_dayjs.default)(split[1], this.locale.format);
      } else if (this.singleDatePicker && val !== "") {
        start = (0, import_dayjs.default)(val, this.locale.format);
        end = (0, import_dayjs.default)(val, this.locale.format);
      }
      if (start !== null && end !== null) {
        this.setStartDate(start);
        this.setEndDate(end);
      }
    }
  }
  _attachEvents() {
    this._calendarClickHandler = (e) => {
      if (e.target.closest(".prev")) this.clickPrev(e);
      if (e.target.closest(".next")) this.clickNext(e);
    };
    this._calendarMousedownHandler = (e) => {
      if (e.target.matches("td.available")) this.clickDate(e);
    };
    this._calendarMouseenterHandler = (e) => {
      if (e.target.matches("td.available")) this.hoverDate(e);
    };
    this._calendarChangeHandler = (e) => {
      if (e.target.matches("select.yearselect") || e.target.matches("select.monthselect")) {
        this.monthOrYearChanged(e);
      }
      if (e.target.matches("select.hourselect") || e.target.matches("select.minuteselect") || e.target.matches("select.secondselect") || e.target.matches("select.ampmselect")) {
        this.timeChanged(e);
      }
    };
    this._rangesClickHandler = (e) => {
      if (e.target.matches("li")) this.clickRange(e);
    };
    this._buttonsClickHandler = (e) => {
      if (e.target.matches("button.applyBtn")) this.clickApply(e);
      if (e.target.matches("button.cancelBtn")) this.clickCancel(e);
    };
    this._inputClickHandler = (e) => this.show(e);
    this._inputFocusHandler = (e) => this.show(e);
    this._inputKeyupHandler = (e) => this.elementChanged(e);
    this._inputKeydownHandler = (e) => this.keydown(e);
    this._toggleHandler = (e) => this.toggle(e);
    this._drpCalendars = Array.from(this.container.querySelectorAll(".drp-calendar"));
    this._drpCalendars.forEach((calendar) => {
      calendar.addEventListener("click", this._calendarClickHandler);
      calendar.addEventListener("mousedown", this._calendarMousedownHandler);
      calendar.addEventListener("mouseenter", this._calendarMouseenterHandler, true);
      calendar.addEventListener("change", this._calendarChangeHandler);
    });
    this._ranges = this.container.querySelector(".ranges");
    if (this._ranges) {
      this._ranges.addEventListener("click", this._rangesClickHandler);
    }
    this._drpButtons = this.container.querySelector(".drp-buttons");
    if (this._drpButtons) {
      this._drpButtons.addEventListener("click", this._buttonsClickHandler);
    }
    if (this.element.tagName === "INPUT" || this.element.tagName === "BUTTON") {
      this.element.addEventListener("click", this._inputClickHandler);
      this.element.addEventListener("focus", this._inputFocusHandler);
      this.element.addEventListener("keyup", this._inputKeyupHandler);
      this.element.addEventListener("keydown", this._inputKeydownHandler);
    } else {
      this.element.addEventListener("click", this._toggleHandler);
      this.element.addEventListener("keydown", this._toggleHandler);
    }
  }
  show() {
    if (this.isShowing) return;
    this._outsideClickProxy = (e) => this.outsideClick(e);
    this._resizeProxy = (e) => this.onResize(e);
    document.addEventListener("mousedown", this._outsideClickProxy);
    document.addEventListener("touchend", this._outsideClickProxy);
    document.addEventListener("click", function(event2) {
      if (event2.target.matches("[data-toggle=dropdown]")) {
        this._outsideClickProxy(event2);
      }
    }.bind(this));
    document.addEventListener("focusin", this._outsideClickProxy);
    window.addEventListener("resize", this._resizeProxy);
    this.oldStartDate = this.startDate;
    this.oldEndDate = this.endDate;
    this.previousRightTime = this.endDate;
    this.updateView();
    this.container.style.display = "block";
    this.move();
    const event = new CustomEvent("show", {
      detail: this
      // pass the instance as event.detail
    });
    this.element.dispatchEvent(event);
    this.isShowing = true;
  }
  hide() {
    if (!this.isShowing) return;
    if (!this.endDate) {
      this.startDate = this.oldStartDate;
      this.endDate = this.oldEndDate;
    }
    if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
      this.callback(this.startDate, this.endDate, this.chosenLabel);
    this.updateElement();
    document.removeEventListener("mousedown", this._outsideClickProxy);
    document.removeEventListener("touchend", this._outsideClickProxy);
    document.removeEventListener("focusin", this._outsideClickProxy);
    document.removeEventListener("click", this._outsideClickProxy);
    window.removeEventListener("resize", this._resizeProxy);
    this.container.style.display = "none";
    const event = new CustomEvent("hide", {
      detail: this
      // pass the instance as event.detail
    });
    this.element.dispatchEvent(event);
    this.isShowing = false;
  }
  toggle(e) {
    if (this.isShowing) {
      this.hide();
    } else {
      this.show();
    }
  }
  updateElement() {
    if (!this.element) return;
    if (this.element.tagName === "INPUT" && this.autoUpdateInput) {
      let newValue = this.startDate.format(this.locale.format);
      if (!this.singleDatePicker) {
        newValue += this.locale.separator + this.endDate.format(this.locale.format);
      }
      if (newValue !== this.element.value) {
        this.element.value = newValue;
        this.element.dispatchEvent(new Event("change"));
      }
    }
  }
  clickApply() {
    this.hide();
    this.element.dispatchEvent(new CustomEvent("apply", { detail: this }));
  }
  clickCancel() {
    this.startDate = this.oldStartDate;
    this.endDate = this.oldEndDate;
    this.hide();
    this.element.dispatchEvent(new CustomEvent("cancel", { detail: this }));
  }
  onResize(e) {
    this.move();
  }
  outsideClick(e) {
    const target = e.target;
    const isWithin = (selectorOrElement) => {
      if (typeof selectorOrElement === "string") {
        return target.closest(selectorOrElement) !== null;
      } else if (selectorOrElement instanceof Element) {
        return selectorOrElement.contains(target);
      }
      return false;
    };
    if (e.type === "focusin" || isWithin(this.element) || isWithin(this.container) || isWithin(".calendar-table")) return;
    this.hide();
    const event = new CustomEvent("outsideClick", { detail: this });
    this.element.dispatchEvent(event);
  }
  move() {
    function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      };
    }
    function outerWidth(el) {
      const style = getComputedStyle(el);
      return el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    function outerHeight(el) {
      const style = getComputedStyle(el);
      return el.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }
    function toggleClass(el, className, condition) {
      if (condition) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
    let parentOffset = { top: 0, left: 0 }, containerTop, drops = this.drops;
    let parentRightEdge = window.innerWidth;
    if (this.parentEl.tagName.toLowerCase() !== "body") {
      const parentRect = getOffset(this.parentEl);
      parentOffset = {
        top: parentRect.top - this.parentEl.scrollTop,
        left: parentRect.left - this.parentEl.scrollLeft
      };
      parentRightEdge = this.parentEl.clientWidth + parentRect.left;
    }
    switch (drops) {
      case "auto":
        containerTop = getOffset(this.element).top + outerHeight(this.element) - parentOffset.top;
        if (containerTop + outerHeight(this.container) >= this.parentEl.scrollHeight) {
          containerTop = getOffset(this.element).top - outerHeight(this.container) - parentOffset.top;
          drops = "up";
        }
        break;
      case "up":
        containerTop = getOffset(this.element).top - outerHeight(this.container) - parentOffset.top;
        break;
      default:
        containerTop = getOffset(this.element).top + outerHeight(this.element) - parentOffset.top;
        break;
    }
    Object.assign(this.container.style, {
      top: "0",
      left: "0",
      right: "auto"
    });
    let containerWidth = outerWidth(this.container);
    toggleClass(this.container, "drop-up", drops === "up");
    if (this.opens === "left") {
      let containerRight = parentRightEdge - getOffset(this.element).left - outerWidth(this.element);
      if (containerWidth + containerRight > window.innerWidth) {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          right: "auto",
          left: "9px"
        });
      } else {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          right: containerRight + "px",
          left: "auto"
        });
      }
    } else if (this.opens === "center") {
      let containerLeft = getOffset(this.element).left - parentOffset.left + outerWidth(this.element) / 2 - containerWidth / 2;
      if (containerLeft < 0) {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          right: "auto",
          left: "9px"
        });
      } else if (containerLeft + containerWidth > window.innerWidth) {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          left: "auto",
          right: "0"
        });
      } else {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          left: containerLeft + "px",
          right: "auto"
        });
      }
    } else {
      let containerLeft = getOffset(this.element).left - parentOffset.left;
      if (containerLeft + containerWidth > window.innerWidth) {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          left: "auto",
          right: "0"
        });
      } else {
        Object.assign(this.container.style, {
          top: containerTop + "px",
          left: containerLeft + "px",
          right: "auto"
        });
      }
    }
  }
  updateView() {
    if (this.timePicker) {
      this.renderTimePicker("left");
      this.renderTimePicker("right");
      const selects = this.container.querySelectorAll(".right .calendar-time select");
      if (!this.endDate) {
        selects.forEach((select) => {
          select.disabled = true;
          select.classList.add("disabled");
        });
      } else {
        selects.forEach((select) => {
          select.disabled = false;
          select.classList.remove("disabled");
        });
      }
    }
    if (this.endDate) {
      const selected = this.container.querySelector(".drp-selected");
      if (selected) {
        selected.innerHTML = this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format);
      }
    }
    this.updateMonthsInView();
    this.updateCalendars();
    this.updateFormInputs();
  }
  updateMonthsInView() {
    if (this.endDate) {
      if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM"))) {
        return;
      }
      this.leftCalendar.month = this.startDate.date(2);
      if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() || this.endDate.year() !== this.startDate.year())) {
        this.rightCalendar.month = this.endDate.date(2);
      } else {
        this.rightCalendar.month = this.startDate.date(2).add(1, "month");
      }
    } else if (this.leftCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM")) {
      this.leftCalendar.month = this.startDate.date(2);
      this.rightCalendar.month = this.startDate.date(2).add(1, "month");
    }
    if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
      this.rightCalendar.month = this.maxDate.date(2);
      this.leftCalendar.month = this.maxDate.date(2).subtract(1, "month");
    }
  }
  updateCalendars() {
    if (this.timePicker) {
      let hour, minute, second;
      if (this.endDate) {
        const leftHour = this.container.querySelector(".left .hourselect");
        const leftMinute = this.container.querySelector(".left .minuteselect");
        const leftSecond = this.container.querySelector(".left .secondselect");
        const leftAmpm = this.container.querySelector(".left .ampmselect");
        hour = leftHour ? parseInt(leftHour.value, 10) : 0;
        minute = leftMinute ? parseInt(leftMinute.value, 10) : 0;
        if (isNaN(minute) && leftMinute) {
          const lastMinuteOption = leftMinute.querySelector("option:last-child");
          minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
        }
        second = this.timePickerSeconds && leftSecond ? parseInt(leftSecond.value, 10) : 0;
        if (!this.timePicker24Hour && leftAmpm) {
          const ampm = leftAmpm.value;
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
        }
      } else {
        const rightHour = this.container.querySelector(".right .hourselect");
        const rightMinute = this.container.querySelector(".right .minuteselect");
        const rightSecond = this.container.querySelector(".right .secondselect");
        const rightAmpm = this.container.querySelector(".right .ampmselect");
        hour = rightHour ? parseInt(rightHour.value, 10) : 0;
        minute = rightMinute ? parseInt(rightMinute.value, 10) : 0;
        if (isNaN(minute) && rightMinute) {
          const lastMinuteOption = rightMinute.querySelector("option:last-child");
          minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
        }
        second = this.timePickerSeconds && rightSecond ? parseInt(rightSecond.value, 10) : 0;
        if (!this.timePicker24Hour && rightAmpm) {
          const ampm = rightAmpm.value;
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
        }
      }
      this.leftCalendar.month.hour(hour).minute(minute).second(second);
      this.rightCalendar.month.hour(hour).minute(minute).second(second);
    }
    this.renderCalendar("left");
    this.renderCalendar("right");
    const rangeLis = this.container.querySelectorAll(".ranges li");
    rangeLis.forEach((li) => li.classList.remove("active"));
    if (this.endDate === null) return;
    this.calculateChosenLabel();
  }
  calculateChosenLabel() {
    let customRange = true;
    let i = 0;
    const rangeListItems = this.container.querySelectorAll(".ranges li");
    for (let range in this.ranges) {
      if (this.timePicker) {
        const format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
        if (this.startDate.format(format) === this.ranges[range][0].format(format) && this.endDate.format(format) === this.ranges[range][1].format(format)) {
          customRange = false;
          rangeListItems.forEach((li2) => li2.classList.remove("active"));
          const li = rangeListItems[i];
          if (li) li.classList.add("active");
          this.chosenLabel = li ? li.getAttribute("data-range-key") : null;
          break;
        }
      } else if (this.startDate.format("YYYY-MM-DD") === this.ranges[range][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") === this.ranges[range][1].format("YYYY-MM-DD")) {
        customRange = false;
        rangeListItems.forEach((li2) => li2.classList.remove("active"));
        const li = rangeListItems[i];
        if (li) li.classList.add("active");
        this.chosenLabel = li ? li.getAttribute("data-range-key") : null;
        break;
      }
      i++;
    }
    if (!customRange) return;
    if (this.showCustomRangeLabel) {
      rangeListItems.forEach((li2) => li2.classList.remove("active"));
      const li = rangeListItems[rangeListItems.length - 1];
      if (li) li.classList.add("active");
      this.chosenLabel = li ? li.getAttribute("data-range-key") : null;
    } else {
      this.chosenLabel = null;
    }
    this.showCalendars();
  }
  showCalendars() {
    this.container.classList.add("show-calendar");
    this.move();
    const event = new CustomEvent("showCalendar", { detail: this });
    this.element.dispatchEvent(event);
  }
  hideCalendars() {
    this.container.classList.remove("show-calendar");
    const event = new CustomEvent("hideCalendar", { detail: this });
    this.element.dispatchEvent(event);
  }
  clickRange(e) {
    const label = e.target.getAttribute("data-range-key");
    this.chosenLabel = label;
    if (label === this.locale.customRangeLabel) {
      this.showCalendars();
    } else {
      const dates = this.ranges[label];
      this.startDate = (0, import_dayjs.default)(dates[0]);
      this.endDate = (0, import_dayjs.default)(dates[1]);
      if (!this.timePicker) {
        this.startDate = this.startDate.startOf("day");
        this.endDate = this.endDate.endOf("day");
      }
      if (!this.alwaysShowCalendars) {
        this.hideCalendars();
      }
      this.clickApply();
    }
  }
  clickPrev(e) {
    const cal = e.target.closest(".drp-calendar");
    if (cal && cal.classList.contains("left")) {
      this.leftCalendar.month = this.leftCalendar.month.subtract(1, "month");
      if (this.linkedCalendars) {
        this.rightCalendar.month = this.rightCalendar.month.subtract(1, "month");
      }
    } else {
      this.rightCalendar.month = this.rightCalendar.month.subtract(1, "month");
    }
    this.updateCalendars();
  }
  clickNext(e) {
    const cal = e.target.closest(".drp-calendar");
    if (cal && cal.classList.contains("left")) {
      this.leftCalendar.month = this.leftCalendar.month.add(1, "month");
    } else {
      this.rightCalendar.month = this.rightCalendar.month.add(1, "month");
      if (this.linkedCalendars) {
        this.leftCalendar.month = this.leftCalendar.month.add(1, "month");
      }
    }
    this.updateCalendars();
  }
  hoverDate(e) {
    if (!e.target.classList.contains("available")) return;
    const title = e.target.getAttribute("data-title");
    const row = title.substr(1, 1);
    const col = title.substr(3, 1);
    const cal = e.target.closest(".drp-calendar");
    const date = cal.classList.contains("left") ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    const leftCalendar = this.leftCalendar;
    const rightCalendar = this.rightCalendar;
    const startDate = this.startDate;
    if (!this.endDate) {
      const tds = this.container.querySelectorAll(".drp-calendar tbody td");
      tds.forEach((el) => {
        if (el.classList.contains("week")) return;
        const title2 = el.getAttribute("data-title");
        const row2 = title2.substr(1, 1);
        const col2 = title2.substr(3, 1);
        const cal2 = el.closest(".drp-calendar");
        const dt = cal2.classList.contains("left") ? leftCalendar.calendar[row2][col2] : rightCalendar.calendar[row2][col2];
        if (dt.isAfter(startDate) && dt.isBefore(date) || dt.isSame(date, "day")) {
          el.classList.add("in-range");
        } else {
          el.classList.remove("in-range");
        }
      });
    }
  }
  clickDate(e) {
    if (!e.target.classList.contains("available")) return;
    const title = e.target.getAttribute("data-title");
    const row = title.substr(1, 1);
    const col = title.substr(3, 1);
    const cal = e.target.closest(".drp-calendar");
    let date = cal.classList.contains("left") ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    if (this.endDate || date.isBefore(this.startDate, "day")) {
      if (this.timePicker) {
        let hour = parseInt(
          this.container.querySelector(".left .hourselect").value,
          10
        );
        if (!this.timePicker24Hour) {
          const ampm = this.container.querySelector(".left .ampmselect").value;
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
        }
        let minute = parseInt(
          this.container.querySelector(".left .minuteselect").value,
          10
        );
        if (isNaN(minute)) {
          const lastMinuteOption = this.container.querySelector(".left .minuteselect option:last-child");
          minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
        }
        let second = this.timePickerSeconds ? parseInt(this.container.querySelector(".left .secondselect").value, 10) : 0;
        date = date.hour(hour).minute(minute).second(second);
      }
      this.endDate = null;
      this.setStartDate(date);
    } else if (!this.endDate && date.isBefore(this.startDate)) {
      this.setEndDate(this.startDate);
    } else {
      if (this.timePicker) {
        let hour = parseInt(
          this.container.querySelector(".right .hourselect").value,
          10
        );
        if (!this.timePicker24Hour) {
          const ampm = this.container.querySelector(".right .ampmselect").value;
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
        }
        let minute = parseInt(
          this.container.querySelector(".right .minuteselect").value,
          10
        );
        if (isNaN(minute)) {
          const lastMinuteOption = this.container.querySelector(".right .minuteselect option:last-child");
          minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
        }
        let second = this.timePickerSeconds ? parseInt(this.container.querySelector(".right .secondselect").value, 10) : 0;
        date = date.hour(hour).minute(minute).second(second);
      }
      this.setEndDate(date);
      if (this.autoApply) {
        this.calculateChosenLabel();
        this.clickApply();
      }
    }
    if (this.singleDatePicker) {
      this.setEndDate(this.startDate);
      if (!this.timePicker && this.autoApply) this.clickApply();
    }
    this.updateView();
    e.stopPropagation();
  }
  elementChanged() {
    if (this.element.tagName !== "INPUT" && this.element.tagName !== "TEXTAREA") return;
    if (!this.element.value.length) return;
    const dateString = this.element.value.split(this.locale.separator);
    let start = null, end = null;
    if (dateString.length === 2) {
      start = (0, import_dayjs.default)(dateString[0], this.locale.format);
      end = (0, import_dayjs.default)(dateString[1], this.locale.format);
    }
    if (this.singleDatePicker || start === null || end === null) {
      start = (0, import_dayjs.default)(this.element.value, this.locale.format);
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
  monthOrYearChanged(e) {
    const drpCal = e.target.closest(".drp-calendar");
    const isLeft = drpCal.classList.contains("left");
    const leftOrRight = isLeft ? "left" : "right";
    const cal = this.container.querySelector(`.drp-calendar.${leftOrRight}`);
    const month = parseInt(cal.querySelector(".monthselect").value, 10);
    let year = parseInt(cal.querySelector(".yearselect").value, 10);
    let newMonth = month;
    let newYear = year;
    if (!isLeft) {
      if (year < this.startDate.year() || year === this.startDate.year() && month < this.startDate.month()) {
        newMonth = this.startDate.month();
        newYear = this.startDate.year();
      }
    }
    if (this.minDate) {
      if (year < this.minDate.year() || year === this.minDate.year() && month < this.minDate.month()) {
        newMonth = this.minDate.month();
        newYear = this.minDate.year();
      }
    }
    if (this.maxDate) {
      if (year > this.maxDate.year() || year === this.maxDate.year() && month > this.maxDate.month()) {
        newMonth = this.maxDate.month();
        newYear = this.maxDate.year();
      }
    }
    if (isLeft) {
      this.leftCalendar.month.month(newMonth).year(newYear);
      if (this.linkedCalendars) {
        this.rightCalendar.month = this.leftCalendar.month.add(1, "month");
      }
    } else {
      this.rightCalendar.month.month(newMonth).year(newYear);
      if (this.linkedCalendars) {
        this.leftCalendar.month = this.rightCalendar.month.subtract(1, "month");
      }
    }
    this.updateCalendars();
  }
  timeChanged(e) {
    const cal = e.target.closest(".drp-calendar");
    const isLeft = cal.classList.contains("left");
    let hour = parseInt(cal.querySelector(".hourselect").value, 10);
    let minute = parseInt(cal.querySelector(".minuteselect").value, 10);
    if (isNaN(minute)) {
      const lastMinuteOption = cal.querySelector(".minuteselect option:last-child");
      minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
    }
    let second = this.timePickerSeconds ? parseInt(cal.querySelector(".secondselect").value, 10) : 0;
    if (!this.timePicker24Hour) {
      const ampm = cal.querySelector(".ampmselect")?.value;
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
    }
    if (isLeft) {
      let start = this.startDate;
      start.hour(hour);
      start.minute(minute);
      start.second(second);
      this.setStartDate(start);
      if (this.singleDatePicker) {
        this.endDate = this.startDate;
      } else if (this.endDate && this.endDate.format("YYYY-MM-DD") === start.format("YYYY-MM-DD") && this.endDate.isBefore(start)) {
        this.setEndDate(start);
      }
    } else if (this.endDate) {
      let end = this.endDate;
      end.hour(hour);
      end.minute(minute);
      end.second(second);
      this.setEndDate(end);
    }
    this.updateCalendars();
    this.updateFormInputs();
    this.renderTimePicker("left");
    this.renderTimePicker("right");
  }
  updateFormInputs() {
    const applyBtn = this.container.querySelector("button.applyBtn");
    if (!applyBtn) return;
    applyBtn.disabled = !(this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)));
  }
  isCustomDate(date) {
    return false;
  }
  isInvalidDate(date) {
    return false;
  }
  setStartDate(startDate) {
    if (typeof startDate === "string") {
      this.startDate = (0, import_dayjs.default)(startDate, this.locale.format);
    } else if (typeof startDate === "object") {
      this.startDate = (0, import_dayjs.default)(startDate);
    }
    if (!this.timePicker) {
      this.startDate = this.startDate.startOf("day");
    }
    if (this.timePicker && this.timePickerIncrement) {
      this.startDate.minute(
        Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
      );
    }
    if (this.minDate && this.startDate.isBefore(this.minDate)) {
      this.startDate = this.minDate;
      if (this.timePicker && this.timePickerIncrement) {
        this.startDate.minute(
          Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
        );
      }
    }
    if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
      this.startDate = this.maxDate;
      if (this.timePicker && this.timePickerIncrement) {
        this.startDate.minute(
          Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
        );
      }
    }
    if (!this.isShowing) {
      this.updateElement();
    }
    this.updateMonthsInView();
  }
  setEndDate(endDate) {
    if (typeof endDate === "string") {
      this.endDate = (0, import_dayjs.default)(endDate, this.locale.format);
    } else if (typeof endDate === "object") {
      this.endDate = (0, import_dayjs.default)(endDate);
    }
    if (!this.timePicker) {
      this.endDate = this.endDate.endOf("day");
    }
    if (this.timePicker && this.timePickerIncrement) {
      this.endDate.minute(
        Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
      );
    }
    if (this.endDate.isBefore(this.startDate)) {
      this.endDate = this.startDate;
    }
    if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
      this.endDate = this.maxDate;
    }
    if (this.maxSpan && this.startDate.add(this.maxSpan).isBefore(this.endDate)) {
      this.endDate = this.startDate.add(this.maxSpan);
    }
    this.previousRightTime = this.endDate;
    if (this.container) {
      const drpSelected = this.container.querySelector(".drp-selected");
      if (drpSelected) {
        drpSelected.innerHTML = this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format);
      }
    }
    if (!this.isShowing) {
      this.updateElement();
    }
    this.updateMonthsInView();
  }
  renderCalendar(side) {
    const calendarState = side === "left" ? this.leftCalendar : this.rightCalendar;
    const month = calendarState.month.month();
    const year = calendarState.month.year();
    const hour = calendarState.month.hour();
    const minute = calendarState.month.minute();
    const second = calendarState.month.second();
    const daysInMonth = (0, import_dayjs.default)(new Date(year, month)).daysInMonth();
    const firstDay = (0, import_dayjs.default)(new Date(year, month, 1));
    const lastDay = (0, import_dayjs.default)(new Date(year, month, daysInMonth));
    const lastMonth = firstDay.subtract(1, "month").month();
    const lastYear = firstDay.subtract(1, "month").year();
    const daysInLastMonth = (0, import_dayjs.default)(new Date(lastYear, lastMonth)).daysInMonth();
    const dayOfWeek = firstDay.day();
    const calendarMatrix = [];
    calendarMatrix.firstDay = firstDay;
    calendarMatrix.lastDay = lastDay;
    for (let i = 0; i < 6; i++) {
      calendarMatrix[i] = [];
    }
    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) startDay -= 7;
    if (dayOfWeek === this.locale.firstDay) startDay = daysInLastMonth - 6;
    let curDate = (0, import_dayjs.default)(new Date(lastYear, lastMonth, startDay, 12, minute, second));
    for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = curDate.add(1, "day")) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      calendarMatrix[row][col] = curDate.hour(hour).minute(minute).second(second);
      curDate = curDate.hour(12);
      if (this.minDate && calendarMatrix[row][col].format("YYYY-MM-DD") === this.minDate.format("YYYY-MM-DD") && calendarMatrix[row][col].isBefore(this.minDate) && side === "left") {
        calendarMatrix[row][col] = this.minDate;
      }
      if (this.maxDate && calendarMatrix[row][col].format("YYYY-MM-DD") === this.maxDate.format("YYYY-MM-DD") && calendarMatrix[row][col].isAfter(this.maxDate) && side === "right") {
        calendarMatrix[row][col] = this.maxDate;
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
    const arrow = this.locale.direction === "ltr" ? { left: "chevron-left", right: "chevron-right" } : { left: "chevron-right", right: "chevron-left" };
    let html = '<table class="table-condensed">';
    html += "<thead>";
    html += "<tr>";
    if (this.showWeekNumbers || this.showISOWeekNumbers) html += "<th></th>";
    if ((!minDate || minDate.isBefore(calendarMatrix.firstDay)) && (!this.linkedCalendars || side === "left")) {
      html += '<th class="prev available"><span></span></th>';
    } else {
      html += "<th></th>";
    }
    let dateHtml = this.locale.monthNames[calendarMatrix[1][1].month()] + calendarMatrix[1][1].format(" YYYY");
    if (this.showDropdowns) {
      const currentMonth = calendarMatrix[1][1].month();
      const currentYear = calendarMatrix[1][1].year();
      const maxYear = maxDate && maxDate.year() || this.maxYear;
      const minYear = minDate && minDate.year() || this.minYear;
      const inMinYear = currentYear === minYear;
      const inMaxYear = currentYear === maxYear;
      let monthHtml = '<select class="monthselect">';
      for (let m = 0; m < 12; m++) {
        if ((!inMinYear || minDate && m >= minDate.month()) && (!inMaxYear || maxDate && m <= maxDate.month())) {
          monthHtml += `<option value="${m}"${m === currentMonth ? " selected" : ""}>${this.locale.monthNames[m]}</option>`;
        } else {
          monthHtml += `<option value="${m}"${m === currentMonth ? " selected" : ""} disabled>${this.locale.monthNames[m]}</option>`;
        }
      }
      monthHtml += "</select>";
      let yearHtml = '<select class="yearselect">';
      for (let y = minYear; y <= maxYear; y++) {
        yearHtml += `<option value="${y}"${y === currentYear ? " selected" : ""}>${y}</option>`;
      }
      yearHtml += "</select>";
      dateHtml = monthHtml + yearHtml;
    }
    html += `<th colspan="5" class="month">${dateHtml}</th>`;
    if ((!maxDate || maxDate.isAfter(calendarMatrix.lastDay)) && (!this.linkedCalendars || side === "right" || this.singleDatePicker)) {
      html += '<th class="next available"><span></span></th>';
    } else {
      html += "<th></th>";
    }
    html += "</tr>";
    html += "<tr>";
    if (this.showWeekNumbers || this.showISOWeekNumbers) html += `<th class="week">${this.locale.weekLabel}</th>`;
    this.locale.daysOfWeek.forEach((dayOfWeek2) => {
      html += `<th>${dayOfWeek2}</th>`;
    });
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    if (this.endDate === null && this.maxSpan) {
      const maxLimit = this.startDate.add(this.maxSpan).endOf("day");
      if (!maxDate || maxLimit.isBefore(maxDate)) {
        maxDate = maxLimit;
      }
    }
    for (let row = 0; row < 6; row++) {
      html += "<tr>";
      if (this.showWeekNumbers)
        html += `<td class="week">${calendarMatrix[row][0].week()}</td>`;
      else if (this.showISOWeekNumbers)
        html += `<td class="week">${calendarMatrix[row][0].isoWeek()}</td>`;
      for (let col = 0; col < 7; col++) {
        const cellDate = calendarMatrix[row][col];
        let classes = [];
        if (cellDate.isSame(/* @__PURE__ */ new Date(), "day"))
          classes.push("today");
        if (cellDate.isoWeekday() > 5)
          classes.push("weekend");
        if (cellDate.month() !== calendarMatrix[1][1].month())
          classes.push("off", "ends");
        if (this.minDate && cellDate.isBefore(this.minDate, "day"))
          classes.push("off", "disabled");
        if (maxDate && cellDate.isAfter(maxDate, "day"))
          classes.push("off", "disabled");
        if (this.isInvalidDate(cellDate))
          classes.push("off", "disabled");
        if (cellDate.format("YYYY-MM-DD") === this.startDate.format("YYYY-MM-DD"))
          classes.push("active", "start-date");
        if (this.endDate !== null && cellDate.format("YYYY-MM-DD") === this.endDate.format("YYYY-MM-DD"))
          classes.push("active", "end-date");
        if (this.endDate !== null && cellDate > this.startDate && cellDate < this.endDate)
          classes.push("in-range");
        const isCustom = this.isCustomDate(cellDate);
        if (isCustom !== false) {
          if (typeof isCustom === "string") classes.push(isCustom);
          else classes.push(...isCustom);
        }
        let cname = "";
        let disabled = false;
        for (let i = 0; i < classes.length; i++) {
          cname += classes[i] + " ";
          if (classes[i] === "disabled") disabled = true;
        }
        if (!disabled) cname += "available";
        html += `<td class="${cname.trim()}" data-title="r${row}c${col}">${cellDate.date()}</td>`;
      }
      html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    const calendarTable = this.container.querySelector(`.drp-calendar.${side} .calendar-table`);
    if (calendarTable) {
      calendarTable.innerHTML = html;
    }
  }
  renderTimePicker(side) {
    if (side === "right" && !this.endDate) return;
    let html, selected, minDate, maxDate = this.maxDate;
    if (this.maxSpan && (!this.maxDate || this.startDate.add(this.maxSpan).isBefore(this.maxDate))) {
      maxDate = this.startDate.add(this.maxSpan);
    }
    if (side === "left") {
      selected = this.startDate;
      minDate = this.minDate;
    } else if (side === "right") {
      selected = this.endDate;
      minDate = this.startDate;
      const timeSelector = this.container.querySelector(".drp-calendar.right .calendar-time");
      if (timeSelector && timeSelector.innerHTML.trim() !== "") {
        const hourSelect = timeSelector.querySelector(".hourselect");
        const minuteSelect = timeSelector.querySelector(".minuteselect");
        const secondSelect = timeSelector.querySelector(".secondselect");
        const ampmSelect = timeSelector.querySelector(".ampmselect");
        if (hourSelect) {
          const hourVal = parseInt(hourSelect.value, 10);
          selected.hour(!isNaN(selected.hour()) ? selected.hour() : hourVal);
        }
        if (minuteSelect) {
          const minuteVal = parseInt(minuteSelect.value, 10);
          selected.minute(!isNaN(selected.minute()) ? selected.minute() : minuteVal);
        }
        if (secondSelect) {
          const secondVal = parseInt(secondSelect.value, 10);
          selected.second(!isNaN(selected.second()) ? selected.second() : secondVal);
        }
        if (!this.timePicker24Hour && ampmSelect) {
          const ampm = ampmSelect.value;
          if (ampm === "PM" && selected.hour() < 12) selected.hour(selected.hour() + 12);
          if (ampm === "AM" && selected.hour() === 12) selected.hour(0);
        }
      }
      if (selected.isBefore(this.startDate)) selected = this.startDate;
      if (maxDate && selected.isAfter(maxDate)) selected = maxDate;
    }
    html = '<select class="hourselect">';
    let start = this.timePicker24Hour ? 0 : 1;
    let end = this.timePicker24Hour ? 23 : 12;
    for (let i = start; i <= end; i++) {
      let i_in_24 = i;
      if (!this.timePicker24Hour)
        i_in_24 = selected.hour() >= 12 ? i === 12 ? 12 : i + 12 : i === 12 ? 0 : i;
      let time = selected.hour(i_in_24);
      let disabled = false;
      if (minDate && time.minute(59).isBefore(minDate)) disabled = true;
      if (maxDate && time.minute(0).isAfter(maxDate)) disabled = true;
      if (i_in_24 === selected.hour() && !disabled) {
        html += `<option value="${i}" selected="selected">${i}</option>`;
      } else if (disabled) {
        html += `<option value="${i}" disabled="disabled" class="disabled">${i}</option>`;
      } else {
        html += `<option value="${i}">${i}</option>`;
      }
    }
    html += "</select> ";
    html += ': <select class="minuteselect">';
    for (let i = 0; i < 60; i += this.timePickerIncrement) {
      let padded = i < 10 ? "0" + i : i;
      let time = selected.minute(i);
      let disabled = false;
      if (minDate && time.second(59).isBefore(minDate)) disabled = true;
      if (maxDate && time.second(0).isAfter(maxDate)) disabled = true;
      if (selected.minute() === i && !disabled) {
        html += `<option value="${i}" selected="selected">${padded}</option>`;
      } else if (disabled) {
        html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
      } else {
        html += `<option value="${i}">${padded}</option>`;
      }
    }
    html += "</select> ";
    if (this.timePickerSeconds) {
      html += ': <select class="secondselect">';
      for (let i = 0; i < 60; i++) {
        let padded = i < 10 ? "0" + i : i;
        let time = selected.second(i);
        let disabled = false;
        if (minDate && time.isBefore(minDate)) disabled = true;
        if (maxDate && time.isAfter(maxDate)) disabled = true;
        if (selected.second() === i && !disabled) {
          html += `<option value="${i}" selected="selected">${padded}</option>`;
        } else if (disabled) {
          html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
        } else {
          html += `<option value="${i}">${padded}</option>`;
        }
      }
      html += "</select> ";
    }
    if (!this.timePicker24Hour) {
      html += '<select class="ampmselect">';
      let am_html = "";
      let pm_html = "";
      if (minDate && selected.hour(12).minute(0).second(0).isBefore(minDate))
        am_html = ' disabled="disabled" class="disabled"';
      if (maxDate && selected.hour(0).minute(0).second(0).isAfter(maxDate))
        pm_html = ' disabled="disabled" class="disabled"';
      if (selected.hour() >= 12) {
        html += `<option value="AM"${am_html}>AM</option><option value="PM" selected="selected"${pm_html}>PM</option>`;
      } else {
        html += `<option value="AM" selected="selected"${am_html}>AM</option><option value="PM"${pm_html}>PM</option>`;
      }
      html += "</select>";
    }
    const calendarTime = this.container.querySelector(`.drp-calendar.${side} .calendar-time`);
    if (calendarTime) {
      calendarTime.innerHTML = html;
    }
  }
  renderRanges(options) {
    if (typeof options.ranges !== "object" || !this.container) return;
    this.ranges = {};
    let start, end;
    for (let range in options.ranges) {
      if (!options.ranges.hasOwnProperty(range)) continue;
      if (typeof options.ranges[range][0] === "string")
        start = (0, import_dayjs.default)(options.ranges[range][0], this.locale.format);
      else
        start = (0, import_dayjs.default)(options.ranges[range][0]);
      if (typeof options.ranges[range][1] === "string")
        end = (0, import_dayjs.default)(options.ranges[range][1], this.locale.format);
      else
        end = (0, import_dayjs.default)(options.ranges[range][1]);
      if (this.minDate && start.isBefore(this.minDate))
        start = this.minDate;
      let maxDate = this.maxDate;
      if (this.maxSpan && maxDate && start.add(this.maxSpan).isAfter(maxDate))
        maxDate = start.add(this.maxSpan);
      if (maxDate && end.isAfter(maxDate))
        end = maxDate;
      if (this.minDate && end.isBefore(this.minDate, this.timePicker ? "minute" : "day") || maxDate && start.isAfter(maxDate, this.timePicker ? "minute" : "day"))
        continue;
      const elem = document.createElement("textarea");
      elem.innerHTML = range;
      const rangeHtml = elem.value;
      this.ranges[rangeHtml] = [start, end];
    }
    let list = "<ul>";
    for (let range in this.ranges) {
      list += `<li data-range-key="${range}">${range}</li>`;
    }
    if (this.showCustomRangeLabel) {
      list += `<li data-range-key="${this.locale.customRangeLabel}">${this.locale.customRangeLabel}</li>`;
    }
    list += "</ul>";
    const rangesDiv = this.container.querySelector(".ranges");
    if (rangesDiv) {
      rangesDiv.innerHTML = list;
    }
  }
  _removeEventListenners() {
    if (this._drpCalendars) {
      this._drpCalendars.forEach((calendar) => {
        calendar.removeEventListener("click", this._calendarClickHandler);
        calendar.removeEventListener("mousedown", this._calendarMousedownHandler);
        calendar.removeEventListener("mouseenter", this._calendarMouseenterHandler, true);
        calendar.removeEventListener("change", this._calendarChangeHandler);
      });
    }
    if (this._ranges) {
      this._ranges.removeEventListener("click", this._rangesClickHandler);
    }
    if (this._drpButtons) {
      this._drpButtons.removeEventListener("click", this._buttonsClickHandler);
    }
    if (this.element.tagName === "INPUT" || this.element.tagName === "BUTTON") {
      this.element.removeEventListener("click", this._inputClickHandler);
      this.element.removeEventListener("focus", this._inputFocusHandler);
      this.element.removeEventListener("keyup", this._inputKeyupHandler);
      this.element.removeEventListener("keydown", this._inputKeydownHandler);
    } else {
      this.element.removeEventListener("click", this._toggleHandler);
      this.element.removeEventListener("keydown", this._toggleHandler);
    }
    if (this._outsideClickProxy) {
      document.removeEventListener("mousedown", this._outsideClickProxy);
      document.removeEventListener("touchend", this._outsideClickProxy);
      document.removeEventListener("focusin", this._outsideClickProxy);
      document.removeEventListener("click", this._outsideClickProxy);
    }
    if (this._resizeProxy) {
      window.removeEventListener("resize", this._resizeProxy);
    }
  }
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this._removeEventListenners();
    this.container = null;
    this.element = null;
    this._outsideClickProxy = null;
    this._resizeProxy = null;
  }
};

// resources/js/filament-daterangepicker.js
var import_dayjs2 = __toESM(require_dayjs_min(), 1);
var import_utc = __toESM(require_utc(), 1);
var import_timezone = __toESM(require_timezone(), 1);
var import_isSameOrAfter = __toESM(require_isSameOrAfter(), 1);
var import_customParseFormat2 = __toESM(require_customParseFormat(), 1);
import_dayjs2.default.extend(import_utc.default);
import_dayjs2.default.extend(import_timezone.default);
import_dayjs2.default.extend(import_customParseFormat2.default);
import_dayjs2.default.extend(import_isSameOrAfter.default);
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
  let dayjsRanges = {};
  for (let key in ranges) {
    let dateRange = ranges[key];
    dayjsRanges[key] = dateRange.map((dateString) => (0, import_dayjs2.default)(dateString));
  }
  return {
    dateRangePicker: null,
    state,
    getRangeLabel: function(state2) {
      if (!state2 || !useRangeLabels) {
        return state2;
      }
      const [from, to] = state2.split(separator);
      const fromDate = (0, import_dayjs2.default)(from, displayFormat);
      const toDate = (0, import_dayjs2.default)(to, displayFormat);
      for (const [label, [rangeFrom, rangeTo]] of Object.entries(dayjsRanges)) {
        if (fromDate.isSame(rangeFrom) && toDate.isSame(rangeTo)) {
          return label;
        }
      }
      return state2;
    },
    init: function() {
      import_dayjs2.default.tz.setDefault(timezone2);
      let dayjsDatesArray = [];
      if (disabledDates !== void 0 && disabledDates.length > 0) {
        dayjsDatesArray = disabledDates.map((dateString) => (0, import_dayjs2.default)(dateString));
      }
      this.dateRangePicker = new DateRangePicker(
        this.$refs.daterange,
        {
          name,
          alwaysShowCalendars,
          autoApply,
          linkedCalendars,
          singleDatePicker: singleCalendar,
          autoUpdateInput: false,
          drops,
          opens,
          startDate: startDate !== null ? (0, import_dayjs2.default)(startDate) : void 0,
          endDate: endDate !== null ? (0, import_dayjs2.default)(endDate) : void 0,
          maxDate: maxDate !== null ? (0, import_dayjs2.default)(maxDate) : void 0,
          minDate: minDate !== null ? (0, import_dayjs2.default)(minDate) : void 0,
          timePicker,
          timePicker24Hour: timePicker24,
          timePickerSeconds: timePickerSecond,
          timePickerIncrement,
          showCustomRangeLabel: !disableCustomRange,
          locale: {
            format: displayFormat,
            separator,
            applyLabel,
            cancelLabel,
            fromLabel,
            toLabel,
            customRangeLabel,
            weekLabel,
            daysOfWeek: [
              sunday,
              monday,
              tuesday,
              wednesday,
              thursday,
              friday,
              saturday
            ],
            monthNames: [
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
              december
            ],
            firstDay
          },
          ranges: disableRange ? void 0 : dayjsRanges,
          maxSpan,
          showWeekNumbers,
          showISOWeekNumbers,
          showDropdowns,
          minYear,
          maxYear,
          isInvalidDate: (date) => {
            if (dayjsDatesArray !== null && dayjsDatesArray.length > 0) {
              return dayjsDatesArray.some(
                (disabledDate) => disabledDate.utc().startOf("day").isSame(date.utc().startOf("day"), "day")
              );
            } else {
              return false;
            }
          }
        }
      );
      this.dateRangePicker.element.addEventListener("apply", function(ev) {
        const picker = ev.detail;
        if (singleCalendar) {
          handleValueChangeUsing(picker.startDate.format(displayFormat), name);
        } else {
          handleValueChangeUsing(picker.startDate.format(displayFormat) + separator + picker.endDate.format(displayFormat), name);
        }
      });
      this.dateFromState(this.dateRangePicker, this.state);
      let parent = this;
      setTimeout(function() {
        parent.$refs.daterange.value = parent.getRangeLabel(parent.state);
      }, 20);
      this.$watch("state", function(value) {
        if (value === null) {
          value = "";
          parent.clear(parent.dateRangePicker);
        } else {
          parent.dateFromState(parent.dateRangePicker, value);
        }
        parent.$refs.daterange.value = parent.getRangeLabel(value);
      });
    },
    clear: function(dateRangePicker) {
      if (dateRangePicker === null) {
        return;
      }
      dateRangePicker.setStartDate((0, import_dayjs2.default)());
      dateRangePicker.setEndDate((0, import_dayjs2.default)());
    },
    dateFromState: function(dateRangePicker, state2) {
      if (state2 === null) {
        this.clear(dateRangePicker);
        return;
      }
      const dates = state2.split(separator);
      if (dates.length === 2 && dateRangePicker !== null) {
        dateRangePicker.setStartDate((0, import_dayjs2.default)(dates[0], displayFormat));
        dateRangePicker.setEndDate((0, import_dayjs2.default)(dates[1], displayFormat));
      } else {
        this.clear(dateRangePicker);
      }
    }
  };
}
export {
  dateRangeComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2RheWpzL2RheWpzLm1pbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2N1c3RvbVBhcnNlRm9ybWF0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vbG9jYWxpemVkRm9ybWF0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vbG9jYWxlRGF0YS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3dlZWtPZlllYXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc29XZWVrLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vdXRjLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vdGltZXpvbmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyLmpzIiwgIi4uL3Jlc291cmNlcy9qcy9wbHVnaW4uanMiLCAiLi4vcmVzb3VyY2VzL2pzL2ZpbGFtZW50LWRhdGVyYW5nZXBpY2tlci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqcz1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9MWUzLGU9NmU0LG49MzZlNSxyPVwibWlsbGlzZWNvbmRcIixpPVwic2Vjb25kXCIscz1cIm1pbnV0ZVwiLHU9XCJob3VyXCIsYT1cImRheVwiLG89XCJ3ZWVrXCIsYz1cIm1vbnRoXCIsZj1cInF1YXJ0ZXJcIixoPVwieWVhclwiLGQ9XCJkYXRlXCIsbD1cIkludmFsaWQgRGF0ZVwiLCQ9L14oXFxkezR9KVstL10/KFxcZHsxLDJ9KT9bLS9dPyhcXGR7MCwyfSlbVHRcXHNdKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT9bLjpdPyhcXGQrKT8kLyx5PS9cXFsoW15cXF1dKyldfFl7MSw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxNPXtuYW1lOlwiZW5cIix3ZWVrZGF5czpcIlN1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5XCIuc3BsaXQoXCJfXCIpLG1vbnRoczpcIkphbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXJcIi5zcGxpdChcIl9cIiksb3JkaW5hbDpmdW5jdGlvbih0KXt2YXIgZT1bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXSxuPXQlMTAwO3JldHVyblwiW1wiK3QrKGVbKG4tMjApJTEwXXx8ZVtuXXx8ZVswXSkrXCJdXCJ9fSxtPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1lP3Q6XCJcIitBcnJheShlKzEtci5sZW5ndGgpLmpvaW4obikrdH0sdj17czptLHo6ZnVuY3Rpb24odCl7dmFyIGU9LXQudXRjT2Zmc2V0KCksbj1NYXRoLmFicyhlKSxyPU1hdGguZmxvb3Iobi82MCksaT1uJTYwO3JldHVybihlPD0wP1wiK1wiOlwiLVwiKSttKHIsMixcIjBcIikrXCI6XCIrbShpLDIsXCIwXCIpfSxtOmZ1bmN0aW9uIHQoZSxuKXtpZihlLmRhdGUoKTxuLmRhdGUoKSlyZXR1cm4tdChuLGUpO3ZhciByPTEyKihuLnllYXIoKS1lLnllYXIoKSkrKG4ubW9udGgoKS1lLm1vbnRoKCkpLGk9ZS5jbG9uZSgpLmFkZChyLGMpLHM9bi1pPDAsdT1lLmNsb25lKCkuYWRkKHIrKHM/LTE6MSksYyk7cmV0dXJuKygtKHIrKG4taSkvKHM/aS11OnUtaSkpfHwwKX0sYTpmdW5jdGlvbih0KXtyZXR1cm4gdDwwP01hdGguY2VpbCh0KXx8MDpNYXRoLmZsb29yKHQpfSxwOmZ1bmN0aW9uKHQpe3JldHVybntNOmMseTpoLHc6byxkOmEsRDpkLGg6dSxtOnMsczppLG1zOnIsUTpmfVt0XXx8U3RyaW5nKHR8fFwiXCIpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvcyQvLFwiXCIpfSx1OmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sZz1cImVuXCIsRD17fTtEW2ddPU07dmFyIHA9XCIkaXNEYXlqc09iamVjdFwiLFM9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBffHwhKCF0fHwhdFtwXSl9LHc9ZnVuY3Rpb24gdChlLG4scil7dmFyIGk7aWYoIWUpcmV0dXJuIGc7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe3ZhciBzPWUudG9Mb3dlckNhc2UoKTtEW3NdJiYoaT1zKSxuJiYoRFtzXT1uLGk9cyk7dmFyIHU9ZS5zcGxpdChcIi1cIik7aWYoIWkmJnUubGVuZ3RoPjEpcmV0dXJuIHQodVswXSl9ZWxzZXt2YXIgYT1lLm5hbWU7RFthXT1lLGk9YX1yZXR1cm4hciYmaSYmKGc9aSksaXx8IXImJmd9LE89ZnVuY3Rpb24odCxlKXtpZihTKHQpKXJldHVybiB0LmNsb25lKCk7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIGU/ZTp7fTtyZXR1cm4gbi5kYXRlPXQsbi5hcmdzPWFyZ3VtZW50cyxuZXcgXyhuKX0sYj12O2IubD13LGIuaT1TLGIudz1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQse2xvY2FsZTplLiRMLHV0YzplLiR1LHg6ZS4keCwkb2Zmc2V0OmUuJG9mZnNldH0pfTt2YXIgXz1mdW5jdGlvbigpe2Z1bmN0aW9uIE0odCl7dGhpcy4kTD13KHQubG9jYWxlLG51bGwsITApLHRoaXMucGFyc2UodCksdGhpcy4keD10aGlzLiR4fHx0Lnh8fHt9LHRoaXNbcF09ITB9dmFyIG09TS5wcm90b3R5cGU7cmV0dXJuIG0ucGFyc2U9ZnVuY3Rpb24odCl7dGhpcy4kZD1mdW5jdGlvbih0KXt2YXIgZT10LmRhdGUsbj10LnV0YztpZihudWxsPT09ZSlyZXR1cm4gbmV3IERhdGUoTmFOKTtpZihiLnUoZSkpcmV0dXJuIG5ldyBEYXRlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBuZXcgRGF0ZShlKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmIS9aJC9pLnRlc3QoZSkpe3ZhciByPWUubWF0Y2goJCk7aWYocil7dmFyIGk9clsyXS0xfHwwLHM9KHJbN118fFwiMFwiKS5zdWJzdHJpbmcoMCwzKTtyZXR1cm4gbj9uZXcgRGF0ZShEYXRlLlVUQyhyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKSk6bmV3IERhdGUoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscyl9fXJldHVybiBuZXcgRGF0ZShlKX0odCksdGhpcy5pbml0KCl9LG0uaW5pdD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuJGQ7dGhpcy4keT10LmdldEZ1bGxZZWFyKCksdGhpcy4kTT10LmdldE1vbnRoKCksdGhpcy4kRD10LmdldERhdGUoKSx0aGlzLiRXPXQuZ2V0RGF5KCksdGhpcy4kSD10LmdldEhvdXJzKCksdGhpcy4kbT10LmdldE1pbnV0ZXMoKSx0aGlzLiRzPXQuZ2V0U2Vjb25kcygpLHRoaXMuJG1zPXQuZ2V0TWlsbGlzZWNvbmRzKCl9LG0uJHV0aWxzPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9LG0uaXNWYWxpZD1mdW5jdGlvbigpe3JldHVybiEodGhpcy4kZC50b1N0cmluZygpPT09bCl9LG0uaXNTYW1lPWZ1bmN0aW9uKHQsZSl7dmFyIG49Tyh0KTtyZXR1cm4gdGhpcy5zdGFydE9mKGUpPD1uJiZuPD10aGlzLmVuZE9mKGUpfSxtLmlzQWZ0ZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTyh0KTx0aGlzLnN0YXJ0T2YoZSl9LG0uaXNCZWZvcmU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5lbmRPZihlKTxPKHQpfSxtLiRnPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gYi51KHQpP3RoaXNbZV06dGhpcy5zZXQobix0KX0sbS51bml4PWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkvMWUzKX0sbS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQuZ2V0VGltZSgpfSxtLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLHI9ISFiLnUoZSl8fGUsZj1iLnAodCksbD1mdW5jdGlvbih0LGUpe3ZhciBpPWIudyhuLiR1P0RhdGUuVVRDKG4uJHksZSx0KTpuZXcgRGF0ZShuLiR5LGUsdCksbik7cmV0dXJuIHI/aTppLmVuZE9mKGEpfSwkPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGIudyhuLnRvRGF0ZSgpW3RdLmFwcGx5KG4udG9EYXRlKFwic1wiKSwocj9bMCwwLDAsMF06WzIzLDU5LDU5LDk5OV0pLnNsaWNlKGUpKSxuKX0seT10aGlzLiRXLE09dGhpcy4kTSxtPXRoaXMuJEQsdj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIik7c3dpdGNoKGYpe2Nhc2UgaDpyZXR1cm4gcj9sKDEsMCk6bCgzMSwxMSk7Y2FzZSBjOnJldHVybiByP2woMSxNKTpsKDAsTSsxKTtjYXNlIG86dmFyIGc9dGhpcy4kbG9jYWxlKCkud2Vla1N0YXJ0fHwwLEQ9KHk8Zz95Kzc6eSktZztyZXR1cm4gbChyP20tRDptKyg2LUQpLE0pO2Nhc2UgYTpjYXNlIGQ6cmV0dXJuICQoditcIkhvdXJzXCIsMCk7Y2FzZSB1OnJldHVybiAkKHYrXCJNaW51dGVzXCIsMSk7Y2FzZSBzOnJldHVybiAkKHYrXCJTZWNvbmRzXCIsMik7Y2FzZSBpOnJldHVybiAkKHYrXCJNaWxsaXNlY29uZHNcIiwzKTtkZWZhdWx0OnJldHVybiB0aGlzLmNsb25lKCl9fSxtLmVuZE9mPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnN0YXJ0T2YodCwhMSl9LG0uJHNldD1mdW5jdGlvbih0LGUpe3ZhciBuLG89Yi5wKHQpLGY9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpLGw9KG49e30sblthXT1mK1wiRGF0ZVwiLG5bZF09ZitcIkRhdGVcIixuW2NdPWYrXCJNb250aFwiLG5baF09ZitcIkZ1bGxZZWFyXCIsblt1XT1mK1wiSG91cnNcIixuW3NdPWYrXCJNaW51dGVzXCIsbltpXT1mK1wiU2Vjb25kc1wiLG5bcl09ZitcIk1pbGxpc2Vjb25kc1wiLG4pW29dLCQ9bz09PWE/dGhpcy4kRCsoZS10aGlzLiRXKTplO2lmKG89PT1jfHxvPT09aCl7dmFyIHk9dGhpcy5jbG9uZSgpLnNldChkLDEpO3kuJGRbbF0oJCkseS5pbml0KCksdGhpcy4kZD15LnNldChkLE1hdGgubWluKHRoaXMuJEQseS5kYXlzSW5Nb250aCgpKSkuJGR9ZWxzZSBsJiZ0aGlzLiRkW2xdKCQpO3JldHVybiB0aGlzLmluaXQoKSx0aGlzfSxtLnNldD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmNsb25lKCkuJHNldCh0LGUpfSxtLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1tiLnAodCldKCl9LG0uYWRkPWZ1bmN0aW9uKHIsZil7dmFyIGQsbD10aGlzO3I9TnVtYmVyKHIpO3ZhciAkPWIucChmKSx5PWZ1bmN0aW9uKHQpe3ZhciBlPU8obCk7cmV0dXJuIGIudyhlLmRhdGUoZS5kYXRlKCkrTWF0aC5yb3VuZCh0KnIpKSxsKX07aWYoJD09PWMpcmV0dXJuIHRoaXMuc2V0KGMsdGhpcy4kTStyKTtpZigkPT09aClyZXR1cm4gdGhpcy5zZXQoaCx0aGlzLiR5K3IpO2lmKCQ9PT1hKXJldHVybiB5KDEpO2lmKCQ9PT1vKXJldHVybiB5KDcpO3ZhciBNPShkPXt9LGRbc109ZSxkW3VdPW4sZFtpXT10LGQpWyRdfHwxLG09dGhpcy4kZC5nZXRUaW1lKCkrcipNO3JldHVybiBiLncobSx0aGlzKX0sbS5zdWJ0cmFjdD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmFkZCgtMSp0LGUpfSxtLmZvcm1hdD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy4kbG9jYWxlKCk7aWYoIXRoaXMuaXNWYWxpZCgpKXJldHVybiBuLmludmFsaWREYXRlfHxsO3ZhciByPXR8fFwiWVlZWS1NTS1ERFRISDptbTpzc1pcIixpPWIueih0aGlzKSxzPXRoaXMuJEgsdT10aGlzLiRtLGE9dGhpcy4kTSxvPW4ud2Vla2RheXMsYz1uLm1vbnRocyxmPW4ubWVyaWRpZW0saD1mdW5jdGlvbih0LG4saSxzKXtyZXR1cm4gdCYmKHRbbl18fHQoZSxyKSl8fGlbbl0uc2xpY2UoMCxzKX0sZD1mdW5jdGlvbih0KXtyZXR1cm4gYi5zKHMlMTJ8fDEyLHQsXCIwXCIpfSwkPWZ8fGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10PDEyP1wiQU1cIjpcIlBNXCI7cmV0dXJuIG4/ci50b0xvd2VyQ2FzZSgpOnJ9O3JldHVybiByLnJlcGxhY2UoeSwoZnVuY3Rpb24odCxyKXtyZXR1cm4gcnx8ZnVuY3Rpb24odCl7c3dpdGNoKHQpe2Nhc2VcIllZXCI6cmV0dXJuIFN0cmluZyhlLiR5KS5zbGljZSgtMik7Y2FzZVwiWVlZWVwiOnJldHVybiBiLnMoZS4keSw0LFwiMFwiKTtjYXNlXCJNXCI6cmV0dXJuIGErMTtjYXNlXCJNTVwiOnJldHVybiBiLnMoYSsxLDIsXCIwXCIpO2Nhc2VcIk1NTVwiOnJldHVybiBoKG4ubW9udGhzU2hvcnQsYSxjLDMpO2Nhc2VcIk1NTU1cIjpyZXR1cm4gaChjLGEpO2Nhc2VcIkRcIjpyZXR1cm4gZS4kRDtjYXNlXCJERFwiOnJldHVybiBiLnMoZS4kRCwyLFwiMFwiKTtjYXNlXCJkXCI6cmV0dXJuIFN0cmluZyhlLiRXKTtjYXNlXCJkZFwiOnJldHVybiBoKG4ud2Vla2RheXNNaW4sZS4kVyxvLDIpO2Nhc2VcImRkZFwiOnJldHVybiBoKG4ud2Vla2RheXNTaG9ydCxlLiRXLG8sMyk7Y2FzZVwiZGRkZFwiOnJldHVybiBvW2UuJFddO2Nhc2VcIkhcIjpyZXR1cm4gU3RyaW5nKHMpO2Nhc2VcIkhIXCI6cmV0dXJuIGIucyhzLDIsXCIwXCIpO2Nhc2VcImhcIjpyZXR1cm4gZCgxKTtjYXNlXCJoaFwiOnJldHVybiBkKDIpO2Nhc2VcImFcIjpyZXR1cm4gJChzLHUsITApO2Nhc2VcIkFcIjpyZXR1cm4gJChzLHUsITEpO2Nhc2VcIm1cIjpyZXR1cm4gU3RyaW5nKHUpO2Nhc2VcIm1tXCI6cmV0dXJuIGIucyh1LDIsXCIwXCIpO2Nhc2VcInNcIjpyZXR1cm4gU3RyaW5nKGUuJHMpO2Nhc2VcInNzXCI6cmV0dXJuIGIucyhlLiRzLDIsXCIwXCIpO2Nhc2VcIlNTU1wiOnJldHVybiBiLnMoZS4kbXMsMyxcIjBcIik7Y2FzZVwiWlwiOnJldHVybiBpfXJldHVybiBudWxsfSh0KXx8aS5yZXBsYWNlKFwiOlwiLFwiXCIpfSkpfSxtLnV0Y09mZnNldD1mdW5jdGlvbigpe3JldHVybiAxNSotTWF0aC5yb3VuZCh0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpfSxtLmRpZmY9ZnVuY3Rpb24ocixkLGwpe3ZhciAkLHk9dGhpcyxNPWIucChkKSxtPU8ociksdj0obS51dGNPZmZzZXQoKS10aGlzLnV0Y09mZnNldCgpKSplLGc9dGhpcy1tLEQ9ZnVuY3Rpb24oKXtyZXR1cm4gYi5tKHksbSl9O3N3aXRjaChNKXtjYXNlIGg6JD1EKCkvMTI7YnJlYWs7Y2FzZSBjOiQ9RCgpO2JyZWFrO2Nhc2UgZjokPUQoKS8zO2JyZWFrO2Nhc2UgbzokPShnLXYpLzYwNDhlNTticmVhaztjYXNlIGE6JD0oZy12KS84NjRlNTticmVhaztjYXNlIHU6JD1nL247YnJlYWs7Y2FzZSBzOiQ9Zy9lO2JyZWFrO2Nhc2UgaTokPWcvdDticmVhaztkZWZhdWx0OiQ9Z31yZXR1cm4gbD8kOmIuYSgkKX0sbS5kYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuZE9mKGMpLiREfSxtLiRsb2NhbGU9ZnVuY3Rpb24oKXtyZXR1cm4gRFt0aGlzLiRMXX0sbS5sb2NhbGU9ZnVuY3Rpb24odCxlKXtpZighdClyZXR1cm4gdGhpcy4kTDt2YXIgbj10aGlzLmNsb25lKCkscj13KHQsZSwhMCk7cmV0dXJuIHImJihuLiRMPXIpLG59LG0uY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gYi53KHRoaXMuJGQsdGhpcyl9LG0udG9EYXRlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKX0sbS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc1ZhbGlkKCk/dGhpcy50b0lTT1N0cmluZygpOm51bGx9LG0udG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b0lTT1N0cmluZygpfSxtLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9VVENTdHJpbmcoKX0sTX0oKSxrPV8ucHJvdG90eXBlO3JldHVybiBPLnByb3RvdHlwZT1rLFtbXCIkbXNcIixyXSxbXCIkc1wiLGldLFtcIiRtXCIsc10sW1wiJEhcIix1XSxbXCIkV1wiLGFdLFtcIiRNXCIsY10sW1wiJHlcIixoXSxbXCIkRFwiLGRdXS5mb3JFYWNoKChmdW5jdGlvbih0KXtrW3RbMV1dPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLiRnKGUsdFswXSx0WzFdKX19KSksTy5leHRlbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC4kaXx8KHQoZSxfLE8pLHQuJGk9ITApLE99LE8ubG9jYWxlPXcsTy5pc0RheWpzPVMsTy51bml4PWZ1bmN0aW9uKHQpe3JldHVybiBPKDFlMyp0KX0sTy5lbj1EW2ddLE8uTHM9RCxPLnA9e30sT30pKTsiLCAiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5fY3VzdG9tUGFyc2VGb3JtYXQ9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPXtMVFM6XCJoOm1tOnNzIEFcIixMVDpcImg6bW0gQVwiLEw6XCJNTS9ERC9ZWVlZXCIsTEw6XCJNTU1NIEQsIFlZWVlcIixMTEw6XCJNTU1NIEQsIFlZWVkgaDptbSBBXCIsTExMTDpcImRkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEFcIn0sdD0vKFxcW1teW10qXFxdKXwoWy1fOi8uLCgpXFxzXSspfChBfGF8UXxZWVlZfFlZP3x3dz98TU0/TT9NP3xEb3xERD98aGg/fEhIP3xtbT98c3M/fFN7MSwzfXx6fFpaPykvZyxuPS9cXGQvLHI9L1xcZFxcZC8saT0vXFxkXFxkPy8sbz0vXFxkKlteLV86LywoKVxcc1xcZF0rLyxzPXt9LGE9ZnVuY3Rpb24oZSl7cmV0dXJuKGU9K2UpKyhlPjY4PzE5MDA6MmUzKX07dmFyIGY9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3RoaXNbZV09K3R9fSxoPVsvWystXVxcZFxcZDo/KFxcZFxcZCk/fFovLGZ1bmN0aW9uKGUpeyh0aGlzLnpvbmV8fCh0aGlzLnpvbmU9e30pKS5vZmZzZXQ9ZnVuY3Rpb24oZSl7aWYoIWUpcmV0dXJuIDA7aWYoXCJaXCI9PT1lKXJldHVybiAwO3ZhciB0PWUubWF0Y2goLyhbKy1dfFxcZFxcZCkvZyksbj02MCp0WzFdKygrdFsyXXx8MCk7cmV0dXJuIDA9PT1uPzA6XCIrXCI9PT10WzBdPy1uOm59KGUpfV0sdT1mdW5jdGlvbihlKXt2YXIgdD1zW2VdO3JldHVybiB0JiYodC5pbmRleE9mP3Q6dC5zLmNvbmNhdCh0LmYpKX0sZD1mdW5jdGlvbihlLHQpe3ZhciBuLHI9cy5tZXJpZGllbTtpZihyKXtmb3IodmFyIGk9MTtpPD0yNDtpKz0xKWlmKGUuaW5kZXhPZihyKGksMCx0KSk+LTEpe249aT4xMjticmVha319ZWxzZSBuPWU9PT0odD9cInBtXCI6XCJQTVwiKTtyZXR1cm4gbn0sYz17QTpbbyxmdW5jdGlvbihlKXt0aGlzLmFmdGVybm9vbj1kKGUsITEpfV0sYTpbbyxmdW5jdGlvbihlKXt0aGlzLmFmdGVybm9vbj1kKGUsITApfV0sUTpbbixmdW5jdGlvbihlKXt0aGlzLm1vbnRoPTMqKGUtMSkrMX1dLFM6W24sZnVuY3Rpb24oZSl7dGhpcy5taWxsaXNlY29uZHM9MTAwKitlfV0sU1M6W3IsZnVuY3Rpb24oZSl7dGhpcy5taWxsaXNlY29uZHM9MTAqK2V9XSxTU1M6Wy9cXGR7M30vLGZ1bmN0aW9uKGUpe3RoaXMubWlsbGlzZWNvbmRzPStlfV0sczpbaSxmKFwic2Vjb25kc1wiKV0sc3M6W2ksZihcInNlY29uZHNcIildLG06W2ksZihcIm1pbnV0ZXNcIildLG1tOltpLGYoXCJtaW51dGVzXCIpXSxIOltpLGYoXCJob3Vyc1wiKV0saDpbaSxmKFwiaG91cnNcIildLEhIOltpLGYoXCJob3Vyc1wiKV0saGg6W2ksZihcImhvdXJzXCIpXSxEOltpLGYoXCJkYXlcIildLEREOltyLGYoXCJkYXlcIildLERvOltvLGZ1bmN0aW9uKGUpe3ZhciB0PXMub3JkaW5hbCxuPWUubWF0Y2goL1xcZCsvKTtpZih0aGlzLmRheT1uWzBdLHQpZm9yKHZhciByPTE7cjw9MzE7cis9MSl0KHIpLnJlcGxhY2UoL1xcW3xcXF0vZyxcIlwiKT09PWUmJih0aGlzLmRheT1yKX1dLHc6W2ksZihcIndlZWtcIildLHd3OltyLGYoXCJ3ZWVrXCIpXSxNOltpLGYoXCJtb250aFwiKV0sTU06W3IsZihcIm1vbnRoXCIpXSxNTU06W28sZnVuY3Rpb24oZSl7dmFyIHQ9dShcIm1vbnRoc1wiKSxuPSh1KFwibW9udGhzU2hvcnRcIil8fHQubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS5zbGljZSgwLDMpfSkpKS5pbmRleE9mKGUpKzE7aWYobjwxKXRocm93IG5ldyBFcnJvcjt0aGlzLm1vbnRoPW4lMTJ8fG59XSxNTU1NOltvLGZ1bmN0aW9uKGUpe3ZhciB0PXUoXCJtb250aHNcIikuaW5kZXhPZihlKSsxO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3I7dGhpcy5tb250aD10JTEyfHx0fV0sWTpbL1srLV0/XFxkKy8sZihcInllYXJcIildLFlZOltyLGZ1bmN0aW9uKGUpe3RoaXMueWVhcj1hKGUpfV0sWVlZWTpbL1xcZHs0fS8sZihcInllYXJcIildLFo6aCxaWjpofTtmdW5jdGlvbiBsKG4pe3ZhciByLGk7cj1uLGk9cyYmcy5mb3JtYXRzO2Zvcih2YXIgbz0obj1yLnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywoZnVuY3Rpb24odCxuLHIpe3ZhciBvPXImJnIudG9VcHBlckNhc2UoKTtyZXR1cm4gbnx8aVtyXXx8ZVtyXXx8aVtvXS5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdHx8bi5zbGljZSgxKX0pKX0pKSkubWF0Y2godCksYT1vLmxlbmd0aCxmPTA7ZjxhO2YrPTEpe3ZhciBoPW9bZl0sdT1jW2hdLGQ9dSYmdVswXSxsPXUmJnVbMV07b1tmXT1sP3tyZWdleDpkLHBhcnNlcjpsfTpoLnJlcGxhY2UoL15cXFt8XFxdJC9nLFwiXCIpfXJldHVybiBmdW5jdGlvbihlKXtmb3IodmFyIHQ9e30sbj0wLHI9MDtuPGE7bis9MSl7dmFyIGk9b1tuXTtpZihcInN0cmluZ1wiPT10eXBlb2YgaSlyKz1pLmxlbmd0aDtlbHNle3ZhciBzPWkucmVnZXgsZj1pLnBhcnNlcixoPWUuc2xpY2UociksdT1zLmV4ZWMoaClbMF07Zi5jYWxsKHQsdSksZT1lLnJlcGxhY2UodSxcIlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PWUuYWZ0ZXJub29uO2lmKHZvaWQgMCE9PXQpe3ZhciBuPWUuaG91cnM7dD9uPDEyJiYoZS5ob3Vycys9MTIpOjEyPT09biYmKGUuaG91cnM9MCksZGVsZXRlIGUuYWZ0ZXJub29ufX0odCksdH19cmV0dXJuIGZ1bmN0aW9uKGUsdCxuKXtuLnAuY3VzdG9tUGFyc2VGb3JtYXQ9ITAsZSYmZS5wYXJzZVR3b0RpZ2l0WWVhciYmKGE9ZS5wYXJzZVR3b0RpZ2l0WWVhcik7dmFyIHI9dC5wcm90b3R5cGUsaT1yLnBhcnNlO3IucGFyc2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRlLHI9ZS51dGMsbz1lLmFyZ3M7dGhpcy4kdT1yO3ZhciBhPW9bMV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEpe3ZhciBmPSEwPT09b1syXSxoPSEwPT09b1szXSx1PWZ8fGgsZD1vWzJdO2gmJihkPW9bMl0pLHM9dGhpcy4kbG9jYWxlKCksIWYmJmQmJihzPW4uTHNbZF0pLHRoaXMuJGQ9ZnVuY3Rpb24oZSx0LG4scil7dHJ5e2lmKFtcInhcIixcIlhcIl0uaW5kZXhPZih0KT4tMSlyZXR1cm4gbmV3IERhdGUoKFwiWFwiPT09dD8xZTM6MSkqZSk7dmFyIGk9bCh0KShlKSxvPWkueWVhcixzPWkubW9udGgsYT1pLmRheSxmPWkuaG91cnMsaD1pLm1pbnV0ZXMsdT1pLnNlY29uZHMsZD1pLm1pbGxpc2Vjb25kcyxjPWkuem9uZSxtPWkud2VlayxNPW5ldyBEYXRlLFk9YXx8KG98fHM/MTpNLmdldERhdGUoKSkscD1vfHxNLmdldEZ1bGxZZWFyKCksdj0wO28mJiFzfHwodj1zPjA/cy0xOk0uZ2V0TW9udGgoKSk7dmFyIEQsdz1mfHwwLGc9aHx8MCx5PXV8fDAsTD1kfHwwO3JldHVybiBjP25ldyBEYXRlKERhdGUuVVRDKHAsdixZLHcsZyx5LEwrNjAqYy5vZmZzZXQqMWUzKSk6bj9uZXcgRGF0ZShEYXRlLlVUQyhwLHYsWSx3LGcseSxMKSk6KEQ9bmV3IERhdGUocCx2LFksdyxnLHksTCksbSYmKEQ9cihEKS53ZWVrKG0pLnRvRGF0ZSgpKSxEKX1jYXRjaChlKXtyZXR1cm4gbmV3IERhdGUoXCJcIil9fSh0LGEscixuKSx0aGlzLmluaXQoKSxkJiYhMCE9PWQmJih0aGlzLiRMPXRoaXMubG9jYWxlKGQpLiRMKSx1JiZ0IT10aGlzLmZvcm1hdChhKSYmKHRoaXMuJGQ9bmV3IERhdGUoXCJcIikpLHM9e319ZWxzZSBpZihhIGluc3RhbmNlb2YgQXJyYXkpZm9yKHZhciBjPWEubGVuZ3RoLG09MTttPD1jO20rPTEpe29bMV09YVttLTFdO3ZhciBNPW4uYXBwbHkodGhpcyxvKTtpZihNLmlzVmFsaWQoKSl7dGhpcy4kZD1NLiRkLHRoaXMuJEw9TS4kTCx0aGlzLmluaXQoKTticmVha31tPT09YyYmKHRoaXMuJGQ9bmV3IERhdGUoXCJcIikpfWVsc2UgaS5jYWxsKHRoaXMsZSl9fX0pKTsiLCAiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5fbG9jYWxpemVkRm9ybWF0PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT17TFRTOlwiaDptbTpzcyBBXCIsTFQ6XCJoOm1tIEFcIixMOlwiTU0vREQvWVlZWVwiLExMOlwiTU1NTSBELCBZWVlZXCIsTExMOlwiTU1NTSBELCBZWVlZIGg6bW0gQVwiLExMTEw6XCJkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBXCJ9O3JldHVybiBmdW5jdGlvbih0LG8sbil7dmFyIHI9by5wcm90b3R5cGUsaT1yLmZvcm1hdDtuLmVuLmZvcm1hdHM9ZSxyLmZvcm1hdD1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD1cIllZWVktTU0tRERUSEg6bW06c3NaXCIpO3ZhciBvPXRoaXMuJGxvY2FsZSgpLmZvcm1hdHMsbj1mdW5jdGlvbih0LG8pe3JldHVybiB0LnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywoZnVuY3Rpb24odCxuLHIpe3ZhciBpPXImJnIudG9VcHBlckNhc2UoKTtyZXR1cm4gbnx8b1tyXXx8ZVtyXXx8b1tpXS5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKGUsdCxvKXtyZXR1cm4gdHx8by5zbGljZSgxKX0pKX0pKX0odCx2b2lkIDA9PT1vP3t9Om8pO3JldHVybiBpLmNhbGwodGhpcyxuKX19fSkpOyIsICIhZnVuY3Rpb24obixlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToobj1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOm58fHNlbGYpLmRheWpzX3BsdWdpbl9sb2NhbGVEYXRhPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24obixlLHQpe3ZhciByPWUucHJvdG90eXBlLG89ZnVuY3Rpb24obil7cmV0dXJuIG4mJihuLmluZGV4T2Y/bjpuLnMpfSx1PWZ1bmN0aW9uKG4sZSx0LHIsdSl7dmFyIGk9bi5uYW1lP246bi4kbG9jYWxlKCksYT1vKGlbZV0pLHM9byhpW3RdKSxmPWF8fHMubWFwKChmdW5jdGlvbihuKXtyZXR1cm4gbi5zbGljZSgwLHIpfSkpO2lmKCF1KXJldHVybiBmO3ZhciBkPWkud2Vla1N0YXJ0O3JldHVybiBmLm1hcCgoZnVuY3Rpb24obixlKXtyZXR1cm4gZlsoZSsoZHx8MCkpJTddfSkpfSxpPWZ1bmN0aW9uKCl7cmV0dXJuIHQuTHNbdC5sb2NhbGUoKV19LGE9ZnVuY3Rpb24obixlKXtyZXR1cm4gbi5mb3JtYXRzW2VdfHxmdW5jdGlvbihuKXtyZXR1cm4gbi5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKG4sZSx0KXtyZXR1cm4gZXx8dC5zbGljZSgxKX0pKX0obi5mb3JtYXRzW2UudG9VcHBlckNhc2UoKV0pfSxzPWZ1bmN0aW9uKCl7dmFyIG49dGhpcztyZXR1cm57bW9udGhzOmZ1bmN0aW9uKGUpe3JldHVybiBlP2UuZm9ybWF0KFwiTU1NTVwiKTp1KG4sXCJtb250aHNcIil9LG1vbnRoc1Nob3J0OmZ1bmN0aW9uKGUpe3JldHVybiBlP2UuZm9ybWF0KFwiTU1NXCIpOnUobixcIm1vbnRoc1Nob3J0XCIsXCJtb250aHNcIiwzKX0sZmlyc3REYXlPZldlZWs6ZnVuY3Rpb24oKXtyZXR1cm4gbi4kbG9jYWxlKCkud2Vla1N0YXJ0fHwwfSx3ZWVrZGF5czpmdW5jdGlvbihlKXtyZXR1cm4gZT9lLmZvcm1hdChcImRkZGRcIik6dShuLFwid2Vla2RheXNcIil9LHdlZWtkYXlzTWluOmZ1bmN0aW9uKGUpe3JldHVybiBlP2UuZm9ybWF0KFwiZGRcIik6dShuLFwid2Vla2RheXNNaW5cIixcIndlZWtkYXlzXCIsMil9LHdlZWtkYXlzU2hvcnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGU/ZS5mb3JtYXQoXCJkZGRcIik6dShuLFwid2Vla2RheXNTaG9ydFwiLFwid2Vla2RheXNcIiwzKX0sbG9uZ0RhdGVGb3JtYXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGEobi4kbG9jYWxlKCksZSl9LG1lcmlkaWVtOnRoaXMuJGxvY2FsZSgpLm1lcmlkaWVtLG9yZGluYWw6dGhpcy4kbG9jYWxlKCkub3JkaW5hbH19O3IubG9jYWxlRGF0YT1mdW5jdGlvbigpe3JldHVybiBzLmJpbmQodGhpcykoKX0sdC5sb2NhbGVEYXRhPWZ1bmN0aW9uKCl7dmFyIG49aSgpO3JldHVybntmaXJzdERheU9mV2VlazpmdW5jdGlvbigpe3JldHVybiBuLndlZWtTdGFydHx8MH0sd2Vla2RheXM6ZnVuY3Rpb24oKXtyZXR1cm4gdC53ZWVrZGF5cygpfSx3ZWVrZGF5c1Nob3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHQud2Vla2RheXNTaG9ydCgpfSx3ZWVrZGF5c01pbjpmdW5jdGlvbigpe3JldHVybiB0LndlZWtkYXlzTWluKCl9LG1vbnRoczpmdW5jdGlvbigpe3JldHVybiB0Lm1vbnRocygpfSxtb250aHNTaG9ydDpmdW5jdGlvbigpe3JldHVybiB0Lm1vbnRoc1Nob3J0KCl9LGxvbmdEYXRlRm9ybWF0OmZ1bmN0aW9uKGUpe3JldHVybiBhKG4sZSl9LG1lcmlkaWVtOm4ubWVyaWRpZW0sb3JkaW5hbDpuLm9yZGluYWx9fSx0Lm1vbnRocz1mdW5jdGlvbigpe3JldHVybiB1KGkoKSxcIm1vbnRoc1wiKX0sdC5tb250aHNTaG9ydD1mdW5jdGlvbigpe3JldHVybiB1KGkoKSxcIm1vbnRoc1Nob3J0XCIsXCJtb250aHNcIiwzKX0sdC53ZWVrZGF5cz1mdW5jdGlvbihuKXtyZXR1cm4gdShpKCksXCJ3ZWVrZGF5c1wiLG51bGwsbnVsbCxuKX0sdC53ZWVrZGF5c1Nob3J0PWZ1bmN0aW9uKG4pe3JldHVybiB1KGkoKSxcIndlZWtkYXlzU2hvcnRcIixcIndlZWtkYXlzXCIsMyxuKX0sdC53ZWVrZGF5c01pbj1mdW5jdGlvbihuKXtyZXR1cm4gdShpKCksXCJ3ZWVrZGF5c01pblwiLFwid2Vla2RheXNcIiwyLG4pfX19KSk7IiwgIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX3dlZWtPZlllYXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPVwid2Vla1wiLHQ9XCJ5ZWFyXCI7cmV0dXJuIGZ1bmN0aW9uKGksbixyKXt2YXIgZj1uLnByb3RvdHlwZTtmLndlZWs9ZnVuY3Rpb24oaSl7aWYodm9pZCAwPT09aSYmKGk9bnVsbCksbnVsbCE9PWkpcmV0dXJuIHRoaXMuYWRkKDcqKGktdGhpcy53ZWVrKCkpLFwiZGF5XCIpO3ZhciBuPXRoaXMuJGxvY2FsZSgpLnllYXJTdGFydHx8MTtpZigxMT09PXRoaXMubW9udGgoKSYmdGhpcy5kYXRlKCk+MjUpe3ZhciBmPXIodGhpcykuc3RhcnRPZih0KS5hZGQoMSx0KS5kYXRlKG4pLHM9cih0aGlzKS5lbmRPZihlKTtpZihmLmlzQmVmb3JlKHMpKXJldHVybiAxfXZhciBhPXIodGhpcykuc3RhcnRPZih0KS5kYXRlKG4pLnN0YXJ0T2YoZSkuc3VidHJhY3QoMSxcIm1pbGxpc2Vjb25kXCIpLG89dGhpcy5kaWZmKGEsZSwhMCk7cmV0dXJuIG88MD9yKHRoaXMpLnN0YXJ0T2YoXCJ3ZWVrXCIpLndlZWsoKTpNYXRoLmNlaWwobyl9LGYud2Vla3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHZvaWQgMD09PWUmJihlPW51bGwpLHRoaXMud2VlayhlKX19fSkpOyIsICIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc29XZWVrPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1cImRheVwiO3JldHVybiBmdW5jdGlvbih0LGkscyl7dmFyIGE9ZnVuY3Rpb24odCl7cmV0dXJuIHQuYWRkKDQtdC5pc29XZWVrZGF5KCksZSl9LGQ9aS5wcm90b3R5cGU7ZC5pc29XZWVrWWVhcj1mdW5jdGlvbigpe3JldHVybiBhKHRoaXMpLnllYXIoKX0sZC5pc29XZWVrPWZ1bmN0aW9uKHQpe2lmKCF0aGlzLiR1dGlscygpLnUodCkpcmV0dXJuIHRoaXMuYWRkKDcqKHQtdGhpcy5pc29XZWVrKCkpLGUpO3ZhciBpLGQsbixvLHI9YSh0aGlzKSx1PShpPXRoaXMuaXNvV2Vla1llYXIoKSxkPXRoaXMuJHUsbj0oZD9zLnV0YzpzKSgpLnllYXIoaSkuc3RhcnRPZihcInllYXJcIiksbz00LW4uaXNvV2Vla2RheSgpLG4uaXNvV2Vla2RheSgpPjQmJihvKz03KSxuLmFkZChvLGUpKTtyZXR1cm4gci5kaWZmKHUsXCJ3ZWVrXCIpKzF9LGQuaXNvV2Vla2RheT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kdXRpbHMoKS51KGUpP3RoaXMuZGF5KCl8fDc6dGhpcy5kYXkodGhpcy5kYXkoKSU3P2U6ZS03KX07dmFyIG49ZC5zdGFydE9mO2Quc3RhcnRPZj1mdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMuJHV0aWxzKCkscz0hIWkudSh0KXx8dDtyZXR1cm5cImlzb3dlZWtcIj09PWkucChlKT9zP3RoaXMuZGF0ZSh0aGlzLmRhdGUoKS0odGhpcy5pc29XZWVrZGF5KCktMSkpLnN0YXJ0T2YoXCJkYXlcIik6dGhpcy5kYXRlKHRoaXMuZGF0ZSgpLTEtKHRoaXMuaXNvV2Vla2RheSgpLTEpKzcpLmVuZE9mKFwiZGF5XCIpOm4uYmluZCh0aGlzKShlLHQpfX19KSk7IiwgIiFmdW5jdGlvbih0LGkpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWkoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGkpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3V0Yz1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9XCJtaW51dGVcIixpPS9bKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9nLGU9LyhbKy1dfFxcZFxcZCkvZztyZXR1cm4gZnVuY3Rpb24ocyxmLG4pe3ZhciB1PWYucHJvdG90eXBlO24udXRjPWZ1bmN0aW9uKHQpe3ZhciBpPXtkYXRlOnQsdXRjOiEwLGFyZ3M6YXJndW1lbnRzfTtyZXR1cm4gbmV3IGYoaSl9LHUudXRjPWZ1bmN0aW9uKGkpe3ZhciBlPW4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiEwfSk7cmV0dXJuIGk/ZS5hZGQodGhpcy51dGNPZmZzZXQoKSx0KTplfSx1LmxvY2FsPWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiExfSl9O3ZhciBvPXUucGFyc2U7dS5wYXJzZT1mdW5jdGlvbih0KXt0LnV0YyYmKHRoaXMuJHU9ITApLHRoaXMuJHV0aWxzKCkudSh0LiRvZmZzZXQpfHwodGhpcy4kb2Zmc2V0PXQuJG9mZnNldCksby5jYWxsKHRoaXMsdCl9O3ZhciByPXUuaW5pdDt1LmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLiR1KXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRVVENGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRVVENNb250aCgpLHRoaXMuJEQ9dC5nZXRVVENEYXRlKCksdGhpcy4kVz10LmdldFVUQ0RheSgpLHRoaXMuJEg9dC5nZXRVVENIb3VycygpLHRoaXMuJG09dC5nZXRVVENNaW51dGVzKCksdGhpcy4kcz10LmdldFVUQ1NlY29uZHMoKSx0aGlzLiRtcz10LmdldFVUQ01pbGxpc2Vjb25kcygpfWVsc2Ugci5jYWxsKHRoaXMpfTt2YXIgYT11LnV0Y09mZnNldDt1LnV0Y09mZnNldD1mdW5jdGlvbihzLGYpe3ZhciBuPXRoaXMuJHV0aWxzKCkudTtpZihuKHMpKXJldHVybiB0aGlzLiR1PzA6bih0aGlzLiRvZmZzZXQpP2EuY2FsbCh0aGlzKTp0aGlzLiRvZmZzZXQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHMmJihzPWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiXCIpO3ZhciBzPXQubWF0Y2goaSk7aWYoIXMpcmV0dXJuIG51bGw7dmFyIGY9KFwiXCIrc1swXSkubWF0Y2goZSl8fFtcIi1cIiwwLDBdLG49ZlswXSx1PTYwKitmWzFdKyArZlsyXTtyZXR1cm4gMD09PXU/MDpcIitcIj09PW4/dTotdX0ocyksbnVsbD09PXMpKXJldHVybiB0aGlzO3ZhciB1PU1hdGguYWJzKHMpPD0xNj82MCpzOnMsbz10aGlzO2lmKGYpcmV0dXJuIG8uJG9mZnNldD11LG8uJHU9MD09PXMsbztpZigwIT09cyl7dmFyIHI9dGhpcy4kdT90aGlzLnRvRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk6LTEqdGhpcy51dGNPZmZzZXQoKTsobz10aGlzLmxvY2FsKCkuYWRkKHUrcix0KSkuJG9mZnNldD11LG8uJHguJGxvY2FsT2Zmc2V0PXJ9ZWxzZSBvPXRoaXMudXRjKCk7cmV0dXJuIG99O3ZhciBoPXUuZm9ybWF0O3UuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBpPXR8fCh0aGlzLiR1P1wiWVlZWS1NTS1ERFRISDptbTpzc1taXVwiOlwiXCIpO3JldHVybiBoLmNhbGwodGhpcyxpKX0sdS52YWx1ZU9mPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kdXRpbHMoKS51KHRoaXMuJG9mZnNldCk/MDp0aGlzLiRvZmZzZXQrKHRoaXMuJHguJGxvY2FsT2Zmc2V0fHx0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkpO3JldHVybiB0aGlzLiRkLnZhbHVlT2YoKS02ZTQqdH0sdS5pc1VUQz1mdW5jdGlvbigpe3JldHVybiEhdGhpcy4kdX0sdS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LHUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0RhdGUoKS50b1VUQ1N0cmluZygpfTt2YXIgbD11LnRvRGF0ZTt1LnRvRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm5cInNcIj09PXQmJnRoaXMuJG9mZnNldD9uKHRoaXMuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzczpTU1NcIikpLnRvRGF0ZSgpOmwuY2FsbCh0aGlzKX07dmFyIGM9dS5kaWZmO3UuZGlmZj1mdW5jdGlvbih0LGksZSl7aWYodCYmdGhpcy4kdT09PXQuJHUpcmV0dXJuIGMuY2FsbCh0aGlzLHQsaSxlKTt2YXIgcz10aGlzLmxvY2FsKCksZj1uKHQpLmxvY2FsKCk7cmV0dXJuIGMuY2FsbChzLGYsaSxlKX19fSkpOyIsICIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl90aW1lem9uZT1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9e3llYXI6MCxtb250aDoxLGRheToyLGhvdXI6MyxtaW51dGU6NCxzZWNvbmQ6NX0sZT17fTtyZXR1cm4gZnVuY3Rpb24obixpLG8pe3ZhciByLGE9ZnVuY3Rpb24odCxuLGkpe3ZvaWQgMD09PWkmJihpPXt9KTt2YXIgbz1uZXcgRGF0ZSh0KSxyPWZ1bmN0aW9uKHQsbil7dm9pZCAwPT09biYmKG49e30pO3ZhciBpPW4udGltZVpvbmVOYW1lfHxcInNob3J0XCIsbz10K1wifFwiK2kscj1lW29dO3JldHVybiByfHwocj1uZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIse2hvdXIxMjohMSx0aW1lWm9uZTp0LHllYXI6XCJudW1lcmljXCIsbW9udGg6XCIyLWRpZ2l0XCIsZGF5OlwiMi1kaWdpdFwiLGhvdXI6XCIyLWRpZ2l0XCIsbWludXRlOlwiMi1kaWdpdFwiLHNlY29uZDpcIjItZGlnaXRcIix0aW1lWm9uZU5hbWU6aX0pLGVbb109cikscn0obixpKTtyZXR1cm4gci5mb3JtYXRUb1BhcnRzKG8pfSx1PWZ1bmN0aW9uKGUsbil7Zm9yKHZhciBpPWEoZSxuKSxyPVtdLHU9MDt1PGkubGVuZ3RoO3UrPTEpe3ZhciBmPWlbdV0scz1mLnR5cGUsbT1mLnZhbHVlLGM9dFtzXTtjPj0wJiYocltjXT1wYXJzZUludChtLDEwKSl9dmFyIGQ9clszXSxsPTI0PT09ZD8wOmQsaD1yWzBdK1wiLVwiK3JbMV0rXCItXCIrclsyXStcIiBcIitsK1wiOlwiK3JbNF0rXCI6XCIrcls1XStcIjowMDBcIix2PStlO3JldHVybihvLnV0YyhoKS52YWx1ZU9mKCktKHYtPXYlMWUzKSkvNmU0fSxmPWkucHJvdG90eXBlO2YudHo9ZnVuY3Rpb24odCxlKXt2b2lkIDA9PT10JiYodD1yKTt2YXIgbixpPXRoaXMudXRjT2Zmc2V0KCksYT10aGlzLnRvRGF0ZSgpLHU9YS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIse3RpbWVab25lOnR9KSxmPU1hdGgucm91bmQoKGEtbmV3IERhdGUodSkpLzFlMy82MCkscz0xNSotTWF0aC5yb3VuZChhLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpLWY7aWYoIU51bWJlcihzKSluPXRoaXMudXRjT2Zmc2V0KDAsZSk7ZWxzZSBpZihuPW8odSx7bG9jYWxlOnRoaXMuJEx9KS4kc2V0KFwibWlsbGlzZWNvbmRcIix0aGlzLiRtcykudXRjT2Zmc2V0KHMsITApLGUpe3ZhciBtPW4udXRjT2Zmc2V0KCk7bj1uLmFkZChpLW0sXCJtaW51dGVcIil9cmV0dXJuIG4uJHguJHRpbWV6b25lPXQsbn0sZi5vZmZzZXROYW1lPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuJHguJHRpbWV6b25lfHxvLnR6Lmd1ZXNzKCksbj1hKHRoaXMudmFsdWVPZigpLGUse3RpbWVab25lTmFtZTp0fSkuZmluZCgoZnVuY3Rpb24odCl7cmV0dXJuXCJ0aW1lem9uZW5hbWVcIj09PXQudHlwZS50b0xvd2VyQ2FzZSgpfSkpO3JldHVybiBuJiZuLnZhbHVlfTt2YXIgcz1mLnN0YXJ0T2Y7Zi5zdGFydE9mPWZ1bmN0aW9uKHQsZSl7aWYoIXRoaXMuJHh8fCF0aGlzLiR4LiR0aW1lem9uZSlyZXR1cm4gcy5jYWxsKHRoaXMsdCxlKTt2YXIgbj1vKHRoaXMuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzczpTU1NcIikse2xvY2FsZTp0aGlzLiRMfSk7cmV0dXJuIHMuY2FsbChuLHQsZSkudHoodGhpcy4keC4kdGltZXpvbmUsITApfSxvLnR6PWZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uJiZlLGE9bnx8ZXx8cixmPXUoK28oKSxhKTtpZihcInN0cmluZ1wiIT10eXBlb2YgdClyZXR1cm4gbyh0KS50eihhKTt2YXIgcz1mdW5jdGlvbih0LGUsbil7dmFyIGk9dC02MCplKjFlMyxvPXUoaSxuKTtpZihlPT09bylyZXR1cm5baSxlXTt2YXIgcj11KGktPTYwKihvLWUpKjFlMyxuKTtyZXR1cm4gbz09PXI/W2ksb106W3QtNjAqTWF0aC5taW4obyxyKSoxZTMsTWF0aC5tYXgobyxyKV19KG8udXRjKHQsaSkudmFsdWVPZigpLGYsYSksbT1zWzBdLGM9c1sxXSxkPW8obSkudXRjT2Zmc2V0KGMpO3JldHVybiBkLiR4LiR0aW1lem9uZT1hLGR9LG8udHouZ3Vlc3M9ZnVuY3Rpb24oKXtyZXR1cm4gSW50bC5EYXRlVGltZUZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lfSxvLnR6LnNldERlZmF1bHQ9ZnVuY3Rpb24odCl7cj10fX19KSk7IiwgIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2lzU2FtZU9yQWZ0ZXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihlLHQpe3QucHJvdG90eXBlLmlzU2FtZU9yQWZ0ZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pc1NhbWUoZSx0KXx8dGhpcy5pc0FmdGVyKGUsdCl9fX0pKTsiLCAiaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcclxuaW1wb3J0IGN1c3RvbVBhcnNlRm9ybWF0IGZyb20gJ2RheWpzL3BsdWdpbi9jdXN0b21QYXJzZUZvcm1hdCc7XHJcbmltcG9ydCBsb2NhbGl6ZWRGb3JtYXQgZnJvbSAnZGF5anMvcGx1Z2luL2xvY2FsaXplZEZvcm1hdCc7XHJcbmltcG9ydCBsb2NhbGVEYXRhIGZyb20gJ2RheWpzL3BsdWdpbi9sb2NhbGVEYXRhJztcclxuaW1wb3J0IHdlZWtPZlllYXIgZnJvbSAnZGF5anMvcGx1Z2luL3dlZWtPZlllYXInO1xyXG5pbXBvcnQgaXNvV2VlayBmcm9tICdkYXlqcy9wbHVnaW4vaXNvV2Vlayc7XHJcblxyXG5kYXlqcy5leHRlbmQoY3VzdG9tUGFyc2VGb3JtYXQpO1xyXG5kYXlqcy5leHRlbmQobG9jYWxpemVkRm9ybWF0KTtcclxuZGF5anMuZXh0ZW5kKGxvY2FsZURhdGEpO1xyXG5kYXlqcy5leHRlbmQod2Vla09mWWVhcik7XHJcbmRheWpzLmV4dGVuZChpc29XZWVrKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVSYW5nZVBpY2tlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30sIGNiID0gKCkgPT4ge30pIHtcclxuICAgICAgICAvLyB0aGlzLm9wdGlvbnMgPSBvcHRpb25zOyAvLyBTdG9yZSBvcHRpb25zIGZvciBsYXRlciB1c2VcclxuICAgICAgICB0aGlzLnBhcmVudEVsID0gb3B0aW9ucy5wYXJlbnRFbFxyXG4gICAgICAgICAgICA/ICh0eXBlb2Ygb3B0aW9ucy5wYXJlbnRFbCA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnBhcmVudEVsKVxyXG4gICAgICAgICAgICAgICAgOiBvcHRpb25zLnBhcmVudEVsKVxyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9ICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXlqcygpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRheWpzKCkuZW5kT2YoJ2RheScpO1xyXG4gICAgICAgIHRoaXMubWluRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXhEYXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1heFNwYW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYXV0b0FwcGx5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVEYXRlUGlja2VyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93RHJvcGRvd25zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5taW5ZZWFyID0gZGF5anMoKS5zdWJ0cmFjdCgxMDAsICd5ZWFyJykuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gZGF5anMoKS5hZGQoMTAwLCAneWVhcicpLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgIHRoaXMuc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93SVNPV2Vla051bWJlcnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQgPSAxO1xyXG4gICAgICAgIHRoaXMudGltZVBpY2tlclNlY29uZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpbmtlZENhbGVuZGFycyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlSW5wdXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmFuZ2VzID0ge307XHJcblxyXG4gICAgICAgIC8vIEludGVybmFsIG9wdGlvbnMgYW5kIHN0YXRlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZVByb3h5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUmlnaHRUaW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGVmdENhbGVuZGFyID0ge307XHJcbiAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyID0ge307XHJcblxyXG4gICAgICAgIHRoaXMub3BlbnMgPSAncmlnaHQnO1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwdWxsLXJpZ2h0JykpXHJcbiAgICAgICAgICAgIHRoaXMub3BlbnMgPSAnbGVmdCc7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcHMgPSAnZG93bic7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B1cCcpKVxyXG4gICAgICAgICAgICB0aGlzLmRyb3BzID0gJ3VwJztcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25DbGFzc2VzID0gJ2J0biBidG4tc20nO1xyXG4gICAgICAgIHRoaXMuYXBwbHlCdXR0b25DbGFzc2VzID0gJ2J0bi1wcmltYXJ5JztcclxuICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbkNsYXNzZXMgPSAnYnRuLWRlZmF1bHQnO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2FsZSA9IHtcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJyxcclxuICAgICAgICAgICAgZm9ybWF0OiBkYXlqcy5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoJ0wnKSxcclxuICAgICAgICAgICAgc2VwYXJhdG9yOiAnIC0gJyxcclxuICAgICAgICAgICAgYXBwbHlMYWJlbDogJ0FwcGx5JyxcclxuICAgICAgICAgICAgY2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG4gICAgICAgICAgICB3ZWVrTGFiZWw6ICdXJyxcclxuICAgICAgICAgICAgY3VzdG9tUmFuZ2VMYWJlbDogJ0N1c3RvbSBSYW5nZScsXHJcbiAgICAgICAgICAgIGRheXNPZldlZWs6IGRheWpzLndlZWtkYXlzTWluKCksXHJcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IGRheWpzLm1vbnRoc1Nob3J0KCksXHJcbiAgICAgICAgICAgIGZpcnN0RGF5OiBkYXlqcy5sb2NhbGVEYXRhKCkuZmlyc3REYXlPZldlZWsoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXBwbHkgYWxsIG9wdGlvbnMgYW5kIGxvY2FsZSBvdmVycmlkZXMgKHNldHMgdGhpcy5sb2NhbGUsIGV0Yy4pXHJcbiAgICAgICAgdGhpcy5hcHBseU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBjb250YWluZXIgKHdpdGggY3VzdG9tIHRlbXBsYXRlIHN1cHBvcnQpXHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5fZGF0ZXJhbmdlcGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5fZGF0ZXJhbmdlcGlja2VyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50Ll9kYXRlcmFuZ2VwaWNrZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclJhbmdlcyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGRpcmVjdGlvbiBjbGFzcyBhZnRlciBsb2NhbGUgaXMgc2V0XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmxvY2FsZS5kaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBVSSBsb2dpYyAoY2xhc3MgYWRkaXRpb25zLCBzaG93L2hpZGUsIGV0Yy4pXHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5lbmREYXRlLmVuZE9mKCdkYXknKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyLXRpbWUnKS5mb3JFYWNoKGVsID0+IGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlciAmJiB0aGlzLmF1dG9BcHBseSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9BcHBseSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0FwcGx5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2F1dG8tYXBwbHknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yYW5nZXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3ctcmFuZ2VzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NpbmdsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0Q2FsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1jYWxlbmRhci5sZWZ0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0Q2FsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmRycC1jYWxlbmRhci5yaWdodCcpO1xyXG4gICAgICAgICAgICBpZiAobGVmdENhbCkgbGVmdENhbC5jbGFzc0xpc3QuYWRkKCdzaW5nbGUnKTtcclxuICAgICAgICAgICAgaWYgKGxlZnRDYWwpIGxlZnRDYWwuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICBpZiAocmlnaHRDYWwpIHJpZ2h0Q2FsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyICYmIHRoaXMuYXV0b0FwcGx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhdXRvLWFwcGx5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgodHlwZW9mIG9wdGlvbnMucmFuZ2VzID09PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5zaW5nbGVEYXRlUGlja2VyKSB8fCB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdy1jYWxlbmRhcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3BlbnMnICsgdGhpcy5vcGVucyk7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IENTUyBjbGFzc2VzIGFuZCBsYWJlbHMgdG8gYnV0dG9uc1xyXG4gICAgICAgIGNvbnN0IGFwcGx5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmFwcGx5QnRuJyk7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmNhbmNlbEJ0bicpO1xyXG4gICAgICAgIGlmIChhcHBseUJ0bikge1xyXG4gICAgICAgICAgICBhcHBseUJ0bi5jbGFzc05hbWUgKz0gJyAnICsgdGhpcy5idXR0b25DbGFzc2VzICsgJyAnICsgdGhpcy5hcHBseUJ1dHRvbkNsYXNzZXM7XHJcbiAgICAgICAgICAgIGFwcGx5QnRuLmlubmVySFRNTCA9IHRoaXMubG9jYWxlLmFwcGx5TGFiZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYW5jZWxCdG4pIHtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTmFtZSArPSAnICcgKyB0aGlzLmJ1dHRvbkNsYXNzZXMgKyAnICcgKyB0aGlzLmNhbmNlbEJ1dHRvbkNsYXNzZXM7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSB0aGlzLmxvY2FsZS5jYW5jZWxMYWJlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN0YXJ0L2VuZCBkYXRlcyBzZXQsIHRyeSB0byBwYXJzZSBmcm9tIGlucHV0IHZhbHVlXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5zdGFydERhdGUgPT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmVuZERhdGUgPT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyc2VJbnB1dFZhbHVlRm9yRGF0ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBldmVudHNcclxuICAgICAgICB0aGlzLl9hdHRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVcclxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0gSGVscGVyIGZvciBjdXN0b20gdGVtcGxhdGUgc3VwcG9ydCAtLS1cclxuICAgIF9jcmVhdGVDb250YWluZXIob3B0aW9ucykge1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMudGVtcGxhdGVcclxuICAgICAgICAgICAgOiBgXHJcbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVyYW5nZXBpY2tlclwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFuZ2VzXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcnAtY2FsZW5kYXIgbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRhYmxlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGltZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRycC1jYWxlbmRhciByaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRhYmxlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGltZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRycC1idXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRycC1zZWxlY3RlZFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWxCdG5cIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYXBwbHlCdG5cIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSB0ZW1wbGF0ZS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRlbXBEaXYuZmlyc3RFbGVtZW50Q2hpbGQgJiYgdGVtcERpdi5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGVyYW5nZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICA/IHRlbXBEaXYuZmlyc3RFbGVtZW50Q2hpbGRcclxuICAgICAgICAgICAgICAgIDogdGVtcERpdjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGVtcGxhdGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRlbXBsYXRlIGZvciBEYXRlUmFuZ2VQaWNrZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0gQWRkIHRoaXMgbWV0aG9kIHRvIHlvdXIgY2xhc3MgLS0tXHJcbiAgICBhcHBseU9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgICAgIC8vIExvY2FsZVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZGlyZWN0aW9uID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmRpcmVjdGlvbiA9IG9wdGlvbnMubG9jYWxlLmRpcmVjdGlvbjtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5mb3JtYXQgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZm9ybWF0ID0gb3B0aW9ucy5sb2NhbGUuZm9ybWF0O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLnNlcGFyYXRvciA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgPSBvcHRpb25zLmxvY2FsZS5zZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZGF5c09mV2VlayA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrID0gb3B0aW9ucy5sb2NhbGUuZGF5c09mV2Vlay5zbGljZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLm1vbnRoTmFtZXMgPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUubW9udGhOYW1lcyA9IG9wdGlvbnMubG9jYWxlLm1vbnRoTmFtZXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5maXJzdERheSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5maXJzdERheSA9IG9wdGlvbnMubG9jYWxlLmZpcnN0RGF5O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLmFwcGx5TGFiZWwgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuYXBwbHlMYWJlbCA9IG9wdGlvbnMubG9jYWxlLmFwcGx5TGFiZWw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuY2FuY2VsTGFiZWwgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuY2FuY2VsTGFiZWwgPSBvcHRpb25zLmxvY2FsZS5jYW5jZWxMYWJlbDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS53ZWVrTGFiZWwgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUud2Vla0xhYmVsID0gb3B0aW9ucy5sb2NhbGUud2Vla0xhYmVsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0IHVuaWNvZGUgY2hhcnMgaW4gdGhlIGN1c3RvbSByYW5nZSBuYW1lLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IG9wdGlvbnMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsID0gZWxlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGRpcmVjdGlvbiBjbGFzcyB0byBjb250YWluZXIgKGlmIGFscmVhZHkgY3JlYXRlZClcclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmxvY2FsZS5kaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGF0ZXNcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3RhcnREYXRlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXlqcyhvcHRpb25zLnN0YXJ0RGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZW5kRGF0ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRheWpzKG9wdGlvbnMuZW5kRGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWluRGF0ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IGRheWpzKG9wdGlvbnMubWluRGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4RGF0ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IGRheWpzKG9wdGlvbnMubWF4RGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnN0YXJ0RGF0ZSA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gZGF5anMob3B0aW9ucy5zdGFydERhdGUpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lbmREYXRlID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZGF5anMob3B0aW9ucy5lbmREYXRlKTtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWluRGF0ZSA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IGRheWpzKG9wdGlvbnMubWluRGF0ZSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1heERhdGUgPT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICB0aGlzLm1heERhdGUgPSBkYXlqcyhvcHRpb25zLm1heERhdGUpO1xyXG5cclxuICAgICAgICAvLyBTYW5pdHkgY2hlY2tzXHJcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMuZW5kRGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpXHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMubWF4RGF0ZTtcclxuXHJcbiAgICAgICAgLy8gT3RoZXIgb3B0aW9uc1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5hcHBseUJ1dHRvbkNsYXNzZXMgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aGlzLmFwcGx5QnV0dG9uQ2xhc3NlcyA9IG9wdGlvbnMuYXBwbHlCdXR0b25DbGFzc2VzO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5hcHBseUNsYXNzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5hcHBseUJ1dHRvbkNsYXNzZXMgPSBvcHRpb25zLmFwcGx5Q2xhc3M7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbmNlbEJ1dHRvbkNsYXNzZXMgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbkNsYXNzZXMgPSBvcHRpb25zLmNhbmNlbEJ1dHRvbkNsYXNzZXM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbmNlbENsYXNzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxCdXR0b25DbGFzc2VzID0gb3B0aW9ucy5jYW5jZWxDbGFzcztcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4U3BhbiA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMubWF4U3BhbiA9IG9wdGlvbnMubWF4U3BhbjtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGF0ZUxpbWl0ID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5tYXhTcGFuID0gb3B0aW9ucy5kYXRlTGltaXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm9wZW5zID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5vcGVucyA9IG9wdGlvbnMub3BlbnM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmRyb3BzID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhpcy5kcm9wcyA9IG9wdGlvbnMuZHJvcHM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNob3dXZWVrTnVtYmVycyA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLnNob3dXZWVrTnVtYmVycyA9IG9wdGlvbnMuc2hvd1dlZWtOdW1iZXJzO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaG93SVNPV2Vla051bWJlcnMgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5zaG93SVNPV2Vla051bWJlcnMgPSBvcHRpb25zLnNob3dJU09XZWVrTnVtYmVycztcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYnV0dG9uQ2xhc3NlcyA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3NlcyA9IG9wdGlvbnMuYnV0dG9uQ2xhc3NlcztcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYnV0dG9uQ2xhc3NlcyA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3NlcyA9IG9wdGlvbnMuYnV0dG9uQ2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNob3dEcm9wZG93bnMgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd25zID0gb3B0aW9ucy5zaG93RHJvcGRvd25zO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5ZZWFyID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgdGhpcy5taW5ZZWFyID0gb3B0aW9ucy5taW5ZZWFyO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhZZWFyID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgdGhpcy5tYXhZZWFyID0gb3B0aW9ucy5tYXhZZWFyO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaG93Q3VzdG9tUmFuZ2VMYWJlbCA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsID0gb3B0aW9ucy5zaG93Q3VzdG9tUmFuZ2VMYWJlbDtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xlRGF0ZVBpY2tlciA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlRGF0ZVBpY2tlciA9IG9wdGlvbnMuc2luZ2xlRGF0ZVBpY2tlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcilcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGltZVBpY2tlciA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVQaWNrZXIgPSBvcHRpb25zLnRpbWVQaWNrZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRpbWVQaWNrZXJTZWNvbmRzID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlclNlY29uZHMgPSBvcHRpb25zLnRpbWVQaWNrZXJTZWNvbmRzO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VySW5jcmVtZW50ID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgdGhpcy50aW1lUGlja2VySW5jcmVtZW50ID0gb3B0aW9ucy50aW1lUGlja2VySW5jcmVtZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VyMjRIb3VyID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlcjI0SG91ciA9IG9wdGlvbnMudGltZVBpY2tlcjI0SG91cjtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0FwcGx5ID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0FwcGx5ID0gb3B0aW9ucy5hdXRvQXBwbHk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1dG9VcGRhdGVJbnB1dCA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICB0aGlzLmF1dG9VcGRhdGVJbnB1dCA9IG9wdGlvbnMuYXV0b1VwZGF0ZUlucHV0O1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5saW5rZWRDYWxlbmRhcnMgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5saW5rZWRDYWxlbmRhcnMgPSBvcHRpb25zLmxpbmtlZENhbGVuZGFycztcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuaXNJbnZhbGlkRGF0ZSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlID0gb3B0aW9ucy5pc0ludmFsaWREYXRlO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pc0N1c3RvbURhdGUgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXN0b21EYXRlID0gb3B0aW9ucy5pc0N1c3RvbURhdGU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmFsd2F5c1Nob3dDYWxlbmRhcnMgPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzID0gb3B0aW9ucy5hbHdheXNTaG93Q2FsZW5kYXJzO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgZGF5IG5hbWVzIG9yZGVyIHRvIGZpcnN0RGF5XHJcbiAgICAgICAgaWYgKHRoaXMubG9jYWxlLmZpcnN0RGF5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMubG9jYWxlLmZpcnN0RGF5O1xyXG4gICAgICAgICAgICB3aGlsZSAoaXRlcmF0b3IgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5kYXlzT2ZXZWVrLnB1c2godGhpcy5sb2NhbGUuZGF5c09mV2Vlay5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50RWwgPSBvcHRpb25zLnBhcmVudEVsXHJcbiAgICAgICAgICAgID8gKHR5cGVvZiBvcHRpb25zLnBhcmVudEVsID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMucGFyZW50RWwpXHJcbiAgICAgICAgICAgICAgICA6IG9wdGlvbnMucGFyZW50RWwpXHJcbiAgICAgICAgICAgIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgLy8gVXNlIHRoZSBjdXN0b20gdGVtcGxhdGUgaWYgcHJvdmlkZWQsIG90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHRcclxuICAgICAgICBsZXQgdGVtcGxhdGUgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVcclxuICAgICAgICAgICAgPyBvcHRpb25zLnRlbXBsYXRlXHJcbiAgICAgICAgICAgIDogYFxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcmFuZ2VwaWNrZXJcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlc1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJwLWNhbGVuZGFyIGxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRpbWVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcnAtY2FsZW5kYXIgcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRpbWVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcnAtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkcnAtc2VsZWN0ZWRcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsQnRuXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFwcGx5QnRuXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHRlbXBsYXRlIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGEgRE9NIGVsZW1lbnRcclxuICAgICAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSB0ZW1wbGF0ZS50cmltKCk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0ZW1wbGF0ZSBzdHJpbmcgc3RhcnRzIHdpdGggPGRpdiBjbGFzcz1cImRhdGVyYW5nZXBpY2tlclwiPiwgdXNlIHRoYXQgZGl2XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgdXNlIHRoZSBmaXJzdCBjaGlsZFxyXG4gICAgICAgICAgICBjb250YWluZXIgPSB0ZW1wRGl2LmZpcnN0RWxlbWVudENoaWxkICYmIHRlbXBEaXYuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXRlcmFuZ2VwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgPyB0ZW1wRGl2LmZpcnN0RWxlbWVudENoaWxkXHJcbiAgICAgICAgICAgICAgICA6IHRlbXBEaXY7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0ZW1wbGF0ZSBpcyBhbHJlYWR5IGEgRE9NIGVsZW1lbnRcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGVtcGxhdGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRlbXBsYXRlIGZvciBEYXRlUmFuZ2VQaWNrZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUlucHV0VmFsdWVGb3JEYXRlcygpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnICYmXHJcbiAgICAgICAgICAgICh0aGlzLmVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IHRoaXMuZWxlbWVudC50eXBlID09PSAnc2VhcmNoJylcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5lbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBzcGxpdCA9IHZhbC5zcGxpdCh0aGlzLmxvY2FsZS5zZXBhcmF0b3IpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbnVsbCwgZW5kID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZGF5anMoc3BsaXRbMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkYXlqcyhzcGxpdFsxXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIgJiYgdmFsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGRheWpzKHZhbCwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIGVuZCA9IGRheWpzKHZhbCwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhcnQgIT09IG51bGwgJiYgZW5kICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoZW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXR0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIC8vIFN0b3JlIHJlZmVyZW5jZXMgZm9yIHJlbW92YWxcclxuICAgICAgICB0aGlzLl9jYWxlbmRhckNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcucHJldicpKSB0aGlzLmNsaWNrUHJldihlKTtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5uZXh0JykpIHRoaXMuY2xpY2tOZXh0KGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fY2FsZW5kYXJNb3VzZWRvd25IYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJ3RkLmF2YWlsYWJsZScpKSB0aGlzLmNsaWNrRGF0ZShlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2NhbGVuZGFyTW91c2VlbnRlckhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcygndGQuYXZhaWxhYmxlJykpIHRoaXMuaG92ZXJEYXRlKGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fY2FsZW5kYXJDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJ3NlbGVjdC55ZWFyc2VsZWN0JykgfHwgZS50YXJnZXQubWF0Y2hlcygnc2VsZWN0Lm1vbnRoc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9udGhPclllYXJDaGFuZ2VkKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm1hdGNoZXMoJ3NlbGVjdC5ob3Vyc2VsZWN0JykgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm1hdGNoZXMoJ3NlbGVjdC5taW51dGVzZWxlY3QnKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubWF0Y2hlcygnc2VsZWN0LnNlY29uZHNlbGVjdCcpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5tYXRjaGVzKCdzZWxlY3QuYW1wbXNlbGVjdCcpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3Jhbmdlc0NsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKCdsaScpKSB0aGlzLmNsaWNrUmFuZ2UoZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uc0NsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKCdidXR0b24uYXBwbHlCdG4nKSkgdGhpcy5jbGlja0FwcGx5KGUpO1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcygnYnV0dG9uLmNhbmNlbEJ0bicpKSB0aGlzLmNsaWNrQ2FuY2VsKGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX2lucHV0Q2xpY2tIYW5kbGVyID0gKGUpID0+IHRoaXMuc2hvdyhlKTtcclxuICAgICAgICB0aGlzLl9pbnB1dEZvY3VzSGFuZGxlciA9IChlKSA9PiB0aGlzLnNob3coZSk7XHJcbiAgICAgICAgdGhpcy5faW5wdXRLZXl1cEhhbmRsZXIgPSAoZSkgPT4gdGhpcy5lbGVtZW50Q2hhbmdlZChlKTtcclxuICAgICAgICB0aGlzLl9pbnB1dEtleWRvd25IYW5kbGVyID0gKGUpID0+IHRoaXMua2V5ZG93bihlKTtcclxuICAgICAgICB0aGlzLl90b2dnbGVIYW5kbGVyID0gKGUpID0+IHRoaXMudG9nZ2xlKGUpO1xyXG5cclxuICAgICAgICAvLyBDYWxlbmRhciBFdmVudHNcclxuICAgICAgICB0aGlzLl9kcnBDYWxlbmRhcnMgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcnAtY2FsZW5kYXInKSk7XHJcbiAgICAgICAgdGhpcy5fZHJwQ2FsZW5kYXJzLmZvckVhY2goY2FsZW5kYXIgPT4ge1xyXG4gICAgICAgICAgICBjYWxlbmRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NhbGVuZGFyQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgY2FsZW5kYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fY2FsZW5kYXJNb3VzZWRvd25IYW5kbGVyKTtcclxuICAgICAgICAgICAgY2FsZW5kYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2NhbGVuZGFyTW91c2VlbnRlckhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICBjYWxlbmRhci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9jYWxlbmRhckNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSYW5nZXMgRXZlbnRzXHJcbiAgICAgICAgdGhpcy5fcmFuZ2VzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJhbmdlcycpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yYW5nZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fcmFuZ2VzQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEJ1dHRvbnMgRXZlbnRzXHJcbiAgICAgICAgdGhpcy5fZHJwQnV0dG9ucyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtYnV0dG9ucycpO1xyXG4gICAgICAgIGlmICh0aGlzLl9kcnBCdXR0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RycEJ1dHRvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9idXR0b25zQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElucHV0L0VsZW1lbnQgRXZlbnRzXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0JVVFRPTidcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faW5wdXRDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9pbnB1dEZvY3VzSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2lucHV0S2V5dXBIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9pbnB1dEtleWRvd25IYW5kbGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGVIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl90b2dnbGVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2xpY2sgcHJveHkgdGhhdCBpcyBwcml2YXRlIHRvIHRoaXMgaW5zdGFuY2Ugb2YgZGF0ZXBpY2tlciwgZm9yIHVuYmluZGluZ1xyXG4gICAgICAgIHRoaXMuX291dHNpZGVDbGlja1Byb3h5ID0gKGUpID0+IHRoaXMub3V0c2lkZUNsaWNrKGUpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZVByb3h5ID0gKGUpID0+IHRoaXMub25SZXNpemUoZSk7XHJcblxyXG4gICAgICAgIC8vIEJpbmQgZ2xvYmFsIGRhdGVwaWNrZXIgbW91c2Vkb3duIGZvciBoaWRpbmcgYW5kXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgIC8vIGFsc28gc3VwcG9ydCBtb2JpbGUgZGV2aWNlc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgIC8vIGFsc28gZXhwbGljaXRseSBwbGF5IG5pY2Ugd2l0aCBCb290c3RyYXAgZHJvcGRvd25zLCB3aGljaCBzdG9wUHJvcGFnYXRpb24gd2hlbiBjbGlja2luZyB0aGVtXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoJ1tkYXRhLXRvZ2dsZT1kcm9wZG93bl0nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvLyBhbmQgYWxzbyBjbG9zZSB3aGVuIGZvY3VzIGNoYW5nZXMgdG8gb3V0c2lkZSB0aGUgcGlja2VyIChlZy4gdGFiYmluZyBiZXR3ZWVuIGNvbnRyb2xzKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSk7XHJcblxyXG4gICAgICAgIC8vIFJlcG9zaXRpb24gdGhlIHBpY2tlciBpZiB0aGUgd2luZG93IGlzIHJlc2l6ZWQgd2hpbGUgaXQncyBvcGVuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZVByb3h5KTtcclxuXHJcbiAgICAgICAgdGhpcy5vbGRTdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgICB0aGlzLm9sZEVuZERhdGUgPSB0aGlzLmVuZERhdGU7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1JpZ2h0VGltZSA9IHRoaXMuZW5kRGF0ZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgdGhpcy5tb3ZlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzaG93Jywge1xyXG4gICAgICAgICAgICBkZXRhaWw6IHRoaXMgLy8gcGFzcyB0aGUgaW5zdGFuY2UgYXMgZXZlbnQuZGV0YWlsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTaG93aW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vaW5jb21wbGV0ZSBkYXRlIHNlbGVjdGlvbiwgcmV2ZXJ0IHRvIGxhc3QgdmFsdWVzXHJcbiAgICAgICAgaWYgKCF0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLm9sZFN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5vbGRFbmREYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiBhIG5ldyBkYXRlIHJhbmdlIHdhcyBzZWxlY3RlZCwgaW52b2tlIHRoZSB1c2VyIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0RGF0ZS5pc1NhbWUodGhpcy5vbGRTdGFydERhdGUpIHx8ICF0aGlzLmVuZERhdGUuaXNTYW1lKHRoaXMub2xkRW5kRGF0ZSkpXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5zdGFydERhdGUsIHRoaXMuZW5kRGF0ZSwgdGhpcy5jaG9zZW5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vaWYgcGlja2VyIGlzIGF0dGFjaGVkIHRvIGEgdGV4dCBpbnB1dCwgdXBkYXRlIGl0XHJcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTsgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyB3b3JrcyBjb3JyZWN0bHlcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTsgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyB3b3JrcyBjb3JyZWN0bHlcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpOyAvLyBUT0RPOiBjaGVjayBpZiB0aGlzIHdvcmtzIGNvcnJlY3RseVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpOyAvLyBUT0RPOiBjaGVjayBpZiB0aGlzIHdvcmtzIGNvcnJlY3RseVxyXG5cclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplUHJveHkpOyAvLyBUT0RPOiBjaGVjayBpZiB0aGlzIHdvcmtzIGNvcnJlY3RseVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdoaWRlJywge1xyXG4gICAgICAgICAgICBkZXRhaWw6IHRoaXMgLy8gcGFzcyB0aGUgaW5zdGFuY2UgYXMgZXZlbnQuZGV0YWlsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5zdGFydERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVEYXRlUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSArPSB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgKyB0aGlzLmVuZERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmVsZW1lbnQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tBcHBseSgpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2FwcGx5JywgeyBkZXRhaWw6IHRoaXMgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5vbGRTdGFydERhdGU7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5vbGRFbmREYXRlO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2FuY2VsJywgeyBkZXRhaWw6IHRoaXMgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKGUpIHtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXRzaWRlQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgICBjb25zdCBpc1dpdGhpbiA9IChzZWxlY3Rvck9yRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5jbG9zZXN0KHNlbGVjdG9yT3JFbGVtZW50KSAhPT0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck9yRWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rvck9yRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGUudHlwZSA9PT0gXCJmb2N1c2luXCIgfHxcclxuICAgICAgICAgICAgaXNXaXRoaW4odGhpcy5lbGVtZW50KSB8fFxyXG4gICAgICAgICAgICBpc1dpdGhpbih0aGlzLmNvbnRhaW5lcikgfHxcclxuICAgICAgICAgICAgaXNXaXRoaW4oJy5jYWxlbmRhci10YWJsZScpXHJcbiAgICAgICAgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG5cclxuICAgICAgICAvLyBEaXNwYXRjaCBhIGN1c3RvbSBldmVudFxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvdXRzaWRlQ2xpY2snLCB7IGRldGFpbDogdGhpcyB9KTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpIHtcclxuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb25zIHRvIG1pbWljIGpRdWVyeSdzIG9mZnNldCwgb3V0ZXJXaWR0aCwgb3V0ZXJIZWlnaHQsIGFuZCB0b2dnbGVDbGFzc1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE9mZnNldChlbCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93LnNjcm9sbFksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3cuc2Nyb2xsWFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3V0ZXJXaWR0aChlbCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZWwub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkxlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5SaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvdXRlckhlaWdodChlbCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZWwub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5Ub3ApICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5Cb3R0b20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbCwgY2xhc3NOYW1lLCBjb25kaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfSxcclxuICAgICAgICAgICAgY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgICBkcm9wcyA9IHRoaXMuZHJvcHM7XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnRSaWdodEVkZ2UgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnRFbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdib2R5Jykge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSZWN0ID0gZ2V0T2Zmc2V0KHRoaXMucGFyZW50RWwpO1xyXG4gICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHBhcmVudFJlY3QudG9wIC0gdGhpcy5wYXJlbnRFbC5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwYXJlbnRSZWN0LmxlZnQgLSB0aGlzLnBhcmVudEVsLnNjcm9sbExlZnRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGFyZW50UmlnaHRFZGdlID0gdGhpcy5wYXJlbnRFbC5jbGllbnRXaWR0aCArIHBhcmVudFJlY3QubGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZHJvcHMpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXV0byc6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS50b3AgKyBvdXRlckhlaWdodCh0aGlzLmVsZW1lbnQpIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJUb3AgKyBvdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikgPj0gdGhpcy5wYXJlbnRFbC5zY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS50b3AgLSBvdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BzID0gJ3VwJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS50b3AgLSBvdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS50b3AgKyBvdXRlckhlaWdodCh0aGlzLmVsZW1lbnQpIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIGNvbnRhaW5lciB0byBpdHMgYWN0dWFsIHdpZHRoXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICAgICAgbGVmdDogJzAnLFxyXG4gICAgICAgICAgICByaWdodDogJ2F1dG8nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gb3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuY29udGFpbmVyLCAnZHJvcC11cCcsIGRyb3BzID09PSAndXAnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3BlbnMgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyUmlnaHQgPSBwYXJlbnRSaWdodEVkZ2UgLSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS5sZWZ0IC0gb3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyV2lkdGggKyBjb250YWluZXJSaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBjb250YWluZXJUb3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzlweCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogY29udGFpbmVyUmlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlbnMgPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gZ2V0T2Zmc2V0KHRoaXMuZWxlbWVudCkubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0ICtcclxuICAgICAgICAgICAgICAgIG91dGVyV2lkdGgodGhpcy5lbGVtZW50KSAvIDIgLSBjb250YWluZXJXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXJMZWZ0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXJMZWZ0ICsgY29udGFpbmVyV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBjb250YWluZXJUb3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGNvbnRhaW5lckxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckxlZnQgPSBnZXRPZmZzZXQodGhpcy5lbGVtZW50KS5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXJMZWZ0ICsgY29udGFpbmVyV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBjb250YWluZXJUb3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGNvbnRhaW5lckxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKCdyaWdodCcpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJpZ2h0IC5jYWxlbmRhci10aW1lIHNlbGVjdCcpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0cy5mb3JFYWNoKHNlbGVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0cy5mb3JFYWNoKHNlbGVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZC5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVNb250aHNJblZpZXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybUlucHV0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1vbnRoc0luVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAvL2lmIGJvdGggZGF0ZXMgYXJlIHZpc2libGUgYWxyZWFkeSwgZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLmxlZnRDYWxlbmRhci5tb250aCAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggJiZcclxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgfHwgdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSlcclxuICAgICAgICAgICAgICAgICYmICh0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpIHx8IHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5kYXRlKDIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzICYmICh0aGlzLmVuZERhdGUubW9udGgoKSAhPT0gdGhpcy5zdGFydERhdGUubW9udGgoKSB8fCB0aGlzLmVuZERhdGUueWVhcigpICE9PSB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLmVuZERhdGUuZGF0ZSgyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMuc3RhcnREYXRlLmRhdGUoMikuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgIT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpICYmIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSAhPT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5kYXRlKDIpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5kYXRlKDIpLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5saW5rZWRDYWxlbmRhcnMgJiYgIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPiB0aGlzLm1heERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5tYXhEYXRlLmRhdGUoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5tYXhEYXRlLmRhdGUoMikuc3VidHJhY3QoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNhbGVuZGFycygpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgIGxldCBob3VyLCBtaW51dGUsIHNlY29uZDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTEVGVCBjYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdEhvdXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuaG91cnNlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdE1pbnV0ZSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5taW51dGVzZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRTZWNvbmQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuc2Vjb25kc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0QW1wbSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5hbXBtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaG91ciA9IGxlZnRIb3VyID8gcGFyc2VJbnQobGVmdEhvdXIudmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBsZWZ0TWludXRlID8gcGFyc2VJbnQobGVmdE1pbnV0ZS52YWx1ZSwgMTApIDogMDtcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW51dGUpICYmIGxlZnRNaW51dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGxhc3Qgb3B0aW9uJ3MgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWludXRlT3B0aW9uID0gbGVmdE1pbnV0ZS5xdWVyeVNlbGVjdG9yKCdvcHRpb246bGFzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IGxhc3RNaW51dGVPcHRpb24gPyBwYXJzZUludChsYXN0TWludXRlT3B0aW9uLnZhbHVlLCAxMCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2Vjb25kID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcyAmJiBsZWZ0U2Vjb25kID8gcGFyc2VJbnQobGVmdFNlY29uZC52YWx1ZSwgMTApIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyICYmIGxlZnRBbXBtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1wbSA9IGxlZnRBbXBtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSSUdIVCBjYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmlnaHRIb3VyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5ob3Vyc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodE1pbnV0ZSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAubWludXRlc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFNlY29uZCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAuc2Vjb25kc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodEFtcG0gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLmFtcG1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBob3VyID0gcmlnaHRIb3VyID8gcGFyc2VJbnQocmlnaHRIb3VyLnZhbHVlLCAxMCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgbWludXRlID0gcmlnaHRNaW51dGUgPyBwYXJzZUludChyaWdodE1pbnV0ZS52YWx1ZSwgMTApIDogMDtcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW51dGUpICYmIHJpZ2h0TWludXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1pbnV0ZU9wdGlvbiA9IHJpZ2h0TWludXRlLnF1ZXJ5U2VsZWN0b3IoJ29wdGlvbjpsYXN0LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gbGFzdE1pbnV0ZU9wdGlvbiA/IHBhcnNlSW50KGxhc3RNaW51dGVPcHRpb24udmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzICYmIHJpZ2h0U2Vjb25kID8gcGFyc2VJbnQocmlnaHRTZWNvbmQudmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91ciAmJiByaWdodEFtcG0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbXBtID0gcmlnaHRBbXBtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKCdsZWZ0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcigncmlnaHQnKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlICdhY3RpdmUnIGNsYXNzIGZyb20gYWxsIHJhbmdlIDxsaT5zXHJcbiAgICAgICAgY29uc3QgcmFuZ2VMaXMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2VzIGxpJyk7XHJcbiAgICAgICAgcmFuZ2VMaXMuZm9yRWFjaChsaSA9PiBsaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUNob3NlbkxhYmVsKCkge1xyXG4gICAgICAgIGxldCBjdXN0b21SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlTGlzdEl0ZW1zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJhbmdlcyBsaScpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIgOiBcIllZWVktTU0tREQgSEg6bW1cIjtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzBdLmZvcm1hdChmb3JtYXQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlLmZvcm1hdChmb3JtYXQpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMV0uZm9ybWF0KGZvcm1hdClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlICdhY3RpdmUnIGZyb20gYWxsLCB0aGVuIGFkZCB0byB0aGUgbWF0Y2hlZCBvbmVcclxuICAgICAgICAgICAgICAgICAgICByYW5nZUxpc3RJdGVtcy5mb3JFYWNoKGxpID0+IGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaSA9IHJhbmdlTGlzdEl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaSkgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IGxpID8gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLXJhbmdlLWtleScpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMF0uZm9ybWF0KCdZWVlZLU1NLUREJykgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzFdLmZvcm1hdCgnWVlZWS1NTS1ERCcpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJhbmdlTGlzdEl0ZW1zLmZvckVhY2gobGkgPT4gbGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSByYW5nZUxpc3RJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaSkgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNob3NlbkxhYmVsID0gbGkgPyBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFuZ2Uta2V5JykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEgY3VzdG9tUmFuZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgcmFuZ2VMaXN0SXRlbXMuZm9yRWFjaChsaSA9PiBsaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpID0gcmFuZ2VMaXN0SXRlbXNbcmFuZ2VMaXN0SXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGlmIChsaSkgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBsaSA/IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1yYW5nZS1rZXknKSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FsZW5kYXJzKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3ctY2FsZW5kYXInKTtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnc2hvd0NhbGVuZGFyJywgeyBkZXRhaWw6IHRoaXMgfSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVDYWxlbmRhcnMoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1jYWxlbmRhcicpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdoaWRlQ2FsZW5kYXInLCB7IGRldGFpbDogdGhpcyB9KTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tSYW5nZShlKSB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFuZ2Uta2V5Jyk7XHJcbiAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IGxhYmVsO1xyXG5cclxuICAgICAgICBpZiAobGFiZWwgPT09IHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2FsZW5kYXJzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZXMgPSB0aGlzLnJhbmdlc1tsYWJlbF07XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gZGF5anMoZGF0ZXNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBkYXlqcyhkYXRlc1sxXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDYWxlbmRhcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tQcmV2KGUpIHtcclxuICAgICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCB3aXRoIGNsYXNzICdkcnAtY2FsZW5kYXInXHJcbiAgICAgICAgY29uc3QgY2FsID0gZS50YXJnZXQuY2xvc2VzdCgnLmRycC1jYWxlbmRhcicpO1xyXG4gICAgICAgIGlmIChjYWwgJiYgY2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguc3VidHJhY3QoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrTmV4dChlKSB7XHJcbiAgICAgICAgLy8gRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgd2l0aCBjbGFzcyAnZHJwLWNhbGVuZGFyJ1xyXG4gICAgICAgIGNvbnN0IGNhbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKTtcclxuICAgICAgICBpZiAoY2FsICYmIGNhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aCA9IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaG92ZXJEYXRlKGUpIHtcclxuICAgICAgICAvLyBJZ25vcmUgZGF0ZXMgdGhhdCBjYW4ndCBiZSBzZWxlY3RlZFxyXG4gICAgICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdmFpbGFibGUnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHRpdGxlLnN1YnN0cigxLCAxKTtcclxuICAgICAgICBjb25zdCBjb2wgPSB0aXRsZS5zdWJzdHIoMywgMSk7XHJcbiAgICAgICAgY29uc3QgY2FsID0gZS50YXJnZXQuY2xvc2VzdCgnLmRycC1jYWxlbmRhcicpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBjYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdsZWZ0JylcclxuICAgICAgICAgICAgPyB0aGlzLmxlZnRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF1cclxuICAgICAgICAgICAgOiB0aGlzLnJpZ2h0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdO1xyXG5cclxuICAgICAgICBjb25zdCBsZWZ0Q2FsZW5kYXIgPSB0aGlzLmxlZnRDYWxlbmRhcjtcclxuICAgICAgICBjb25zdCByaWdodENhbGVuZGFyID0gdGhpcy5yaWdodENhbGVuZGFyO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgYWxsIGRhdGUgY2VsbHMgaW4gYm90aCBjYWxlbmRhcnNcclxuICAgICAgICAgICAgY29uc3QgdGRzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRycC1jYWxlbmRhciB0Ym9keSB0ZCcpO1xyXG4gICAgICAgICAgICB0ZHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHdlZWsgbnVtYmVyc1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnd2VlaycpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRpdGxlLnN1YnN0cigxLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRpdGxlLnN1YnN0cigzLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbCA9IGVsLmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR0ID0gY2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBsZWZ0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdXHJcbiAgICAgICAgICAgICAgICAgICAgOiByaWdodENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKGR0LmlzQWZ0ZXIoc3RhcnREYXRlKSAmJiBkdC5pc0JlZm9yZShkYXRlKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICBkdC5pc1NhbWUoZGF0ZSwgJ2RheScpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdpbi1yYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpbi1yYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEYXRlKGUpIHtcclxuICAgICAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXZhaWxhYmxlJykpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKTtcclxuICAgICAgICBjb25zdCByb3cgPSB0aXRsZS5zdWJzdHIoMSwgMSk7XHJcbiAgICAgICAgY29uc3QgY29sID0gdGl0bGUuc3Vic3RyKDMsIDEpO1xyXG4gICAgICAgIGNvbnN0IGNhbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5kcnAtY2FsZW5kYXInKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IGNhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2xlZnQnKVxyXG4gICAgICAgICAgICA/IHRoaXMubGVmdENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXVxyXG4gICAgICAgICAgICA6IHRoaXMucmlnaHRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF07XHJcblxyXG4gICAgICAgIC8vIFBpY2tpbmcgc3RhcnRcclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlIHx8IGRhdGUuaXNCZWZvcmUodGhpcy5zdGFydERhdGUsICdkYXknKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5ob3Vyc2VsZWN0JykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgMTBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtcG0gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGVmdCAuYW1wbXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlID0gcGFyc2VJbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLm1pbnV0ZXNlbGVjdCcpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIDEwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1pbnV0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWludXRlT3B0aW9uID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxlZnQgLm1pbnV0ZXNlbGVjdCBvcHRpb246bGFzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IGxhc3RNaW51dGVPcHRpb24gPyBwYXJzZUludChsYXN0TWludXRlT3B0aW9uLnZhbHVlLCAxMCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0IC5zZWNvbmRzZWxlY3QnKS52YWx1ZSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGUuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShkYXRlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVuZERhdGUgJiYgZGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHtcclxuICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBjbGlja2luZyB0aGUgc2FtZSBkYXRlIGZvciBzdGFydC9lbmQsXHJcbiAgICAgICAgICAgIC8vIGJ1dCB0aGUgdGltZSBvZiB0aGUgZW5kIGRhdGUgaXMgYmVmb3JlIHRoZSBzdGFydCBkYXRlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUGlja2luZyBlbmRcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBwYXJzZUludChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmlnaHQgLmhvdXJzZWxlY3QnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAxMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1wbSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAuYW1wbXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikgaG91ciA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlID0gcGFyc2VJbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5taW51dGVzZWxlY3QnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAxMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW51dGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1pbnV0ZU9wdGlvbiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCAubWludXRlc2VsZWN0IG9wdGlvbjpsYXN0LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gbGFzdE1pbnV0ZU9wdGlvbiA/IHBhcnNlSW50KGxhc3RNaW51dGVPcHRpb24udmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kID0gdGhpcy50aW1lUGlja2VyU2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJpZ2h0IC5zZWNvbmRzZWxlY3QnKS52YWx1ZSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGUuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy5hdXRvQXBwbHkpIHRoaXMuY2xpY2tBcHBseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcblxyXG4gICAgICAgIC8vIENhbmNlbCB0aGUgYmx1ciBldmVudCBoYW5kbGVyIGlmIHRoZSBtb3VzZSB3YXMgaW4gb25lIG9mIHRoZSBpbnB1dHNcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhZ05hbWUgIT09ICdJTlBVVCcgJiZcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhZ05hbWUgIT09ICdURVhUQVJFQSdcclxuICAgICAgICApIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZWxlbWVudC52YWx1ZS5zcGxpdCh0aGlzLmxvY2FsZS5zZXBhcmF0b3IpO1xyXG4gICAgICAgIGxldCBzdGFydCA9IG51bGwsIGVuZCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzdGFydCA9IGRheWpzKGRhdGVTdHJpbmdbMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIGVuZCA9IGRheWpzKGRhdGVTdHJpbmdbMV0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zaW5nbGVEYXRlUGlja2VyIHx8IHN0YXJ0ID09PSBudWxsIHx8IGVuZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdGFydCA9IGRheWpzKHRoaXMuZWxlbWVudC52YWx1ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgZW5kID0gc3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5ZG93bihlKSB7XHJcbiAgICAgICAgLy8gSGlkZSBvbiB0YWIgKDkpIG9yIGVudGVyICgxMylcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSA5IHx8IGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWRlIG9uIGVzY2FwZSAoMjcpIGFuZCBwcmV2ZW50IHByb3BhZ2F0aW9uXHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9udGhPclllYXJDaGFuZ2VkKGUpIHtcclxuICAgICAgICBjb25zdCBkcnBDYWwgPSBlLnRhcmdldC5jbG9zZXN0KCcuZHJwLWNhbGVuZGFyJyk7XHJcbiAgICAgICAgY29uc3QgaXNMZWZ0ID0gZHJwQ2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpO1xyXG4gICAgICAgIGNvbnN0IGxlZnRPclJpZ2h0ID0gaXNMZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JztcclxuICAgICAgICBjb25zdCBjYWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuZHJwLWNhbGVuZGFyLiR7bGVmdE9yUmlnaHR9YCk7XHJcblxyXG4gICAgICAgIC8vIE1vbnRoIG11c3QgYmUgTnVtYmVyIGZvciBuZXcgbW9tZW50IHZlcnNpb25zXHJcbiAgICAgICAgY29uc3QgbW9udGggPSBwYXJzZUludChjYWwucXVlcnlTZWxlY3RvcignLm1vbnRoc2VsZWN0JykudmFsdWUsIDEwKTtcclxuICAgICAgICBsZXQgeWVhciA9IHBhcnNlSW50KGNhbC5xdWVyeVNlbGVjdG9yKCcueWVhcnNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcblxyXG4gICAgICAgIGxldCBuZXdNb250aCA9IG1vbnRoO1xyXG4gICAgICAgIGxldCBuZXdZZWFyID0geWVhcjtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xlZnQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgeWVhciA8IHRoaXMuc3RhcnREYXRlLnllYXIoKSB8fFxyXG4gICAgICAgICAgICAgICAgKHllYXIgPT09IHRoaXMuc3RhcnREYXRlLnllYXIoKSAmJiBtb250aCA8IHRoaXMuc3RhcnREYXRlLm1vbnRoKCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmV3TW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5tb250aCgpO1xyXG4gICAgICAgICAgICAgICAgbmV3WWVhciA9IHRoaXMuc3RhcnREYXRlLnllYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB5ZWFyIDwgdGhpcy5taW5EYXRlLnllYXIoKSB8fFxyXG4gICAgICAgICAgICAgICAgKHllYXIgPT09IHRoaXMubWluRGF0ZS55ZWFyKCkgJiYgbW9udGggPCB0aGlzLm1pbkRhdGUubW9udGgoKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdNb250aCA9IHRoaXMubWluRGF0ZS5tb250aCgpO1xyXG4gICAgICAgICAgICAgICAgbmV3WWVhciA9IHRoaXMubWluRGF0ZS55ZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgeWVhciA+IHRoaXMubWF4RGF0ZS55ZWFyKCkgfHxcclxuICAgICAgICAgICAgICAgICh5ZWFyID09PSB0aGlzLm1heERhdGUueWVhcigpICYmIG1vbnRoID4gdGhpcy5tYXhEYXRlLm1vbnRoKCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmV3TW9udGggPSB0aGlzLm1heERhdGUubW9udGgoKTtcclxuICAgICAgICAgICAgICAgIG5ld1llYXIgPSB0aGlzLm1heERhdGUueWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNMZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLm1vbnRoKG5ld01vbnRoKS55ZWFyKG5ld1llYXIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5tb250aChuZXdNb250aCkueWVhcihuZXdZZWFyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlua2VkQ2FsZW5kYXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aCA9IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpbWVDaGFuZ2VkKGUpIHtcclxuICAgICAgICBjb25zdCBjYWwgPSBlLnRhcmdldC5jbG9zZXN0KCcuZHJwLWNhbGVuZGFyJyk7XHJcbiAgICAgICAgY29uc3QgaXNMZWZ0ID0gY2FsLmNsYXNzTGlzdC5jb250YWlucygnbGVmdCcpO1xyXG5cclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KGNhbC5xdWVyeVNlbGVjdG9yKCcuaG91cnNlbGVjdCcpLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IHBhcnNlSW50KGNhbC5xdWVyeVNlbGVjdG9yKCcubWludXRlc2VsZWN0JykudmFsdWUsIDEwKTtcclxuICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0TWludXRlT3B0aW9uID0gY2FsLnF1ZXJ5U2VsZWN0b3IoJy5taW51dGVzZWxlY3Qgb3B0aW9uOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgbWludXRlID0gbGFzdE1pbnV0ZU9wdGlvbiA/IHBhcnNlSW50KGxhc3RNaW51dGVPcHRpb24udmFsdWUsIDEwKSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzXHJcbiAgICAgICAgICAgID8gcGFyc2VJbnQoY2FsLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRzZWxlY3QnKS52YWx1ZSwgMTApXHJcbiAgICAgICAgICAgIDogMDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuICAgICAgICAgICAgY29uc3QgYW1wbSA9IGNhbC5xdWVyeVNlbGVjdG9yKCcuYW1wbXNlbGVjdCcpPy52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgaG91ciA8IDEyKSBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMikgaG91ciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNMZWZ0KSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICAgICAgICBzdGFydC5ob3VyKGhvdXIpO1xyXG4gICAgICAgICAgICBzdGFydC5taW51dGUobWludXRlKTtcclxuICAgICAgICAgICAgc3RhcnQuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJykgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5pc0JlZm9yZShzdGFydClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMuZW5kRGF0ZTtcclxuICAgICAgICAgICAgZW5kLmhvdXIoaG91cik7XHJcbiAgICAgICAgICAgIGVuZC5taW51dGUobWludXRlKTtcclxuICAgICAgICAgICAgZW5kLnNlY29uZChzZWNvbmQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY2FsZW5kYXJzIHNvIGFsbCBjbGlja2FibGUgZGF0ZXMgcmVmbGVjdCB0aGUgbmV3IHRpbWUgY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBmb3JtIGlucHV0cyBhYm92ZSB0aGUgY2FsZW5kYXJzIHdpdGggdGhlIG5ldyB0aW1lXHJcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtSW5wdXRzKCk7XHJcblxyXG4gICAgICAgIC8vIFJlLXJlbmRlciB0aGUgdGltZSBwaWNrZXJzIGJlY2F1c2UgY2hhbmdpbmcgb25lIHNlbGVjdGlvbiBjYW4gYWZmZWN0IHdoYXQncyBlbmFibGVkIGluIGFub3RoZXJcclxuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ2xlZnQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ3JpZ2h0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRm9ybUlucHV0cygpIHtcclxuICAgICAgICBjb25zdCBhcHBseUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hcHBseUJ0bicpO1xyXG4gICAgICAgIGlmICghYXBwbHlCdG4pIHJldHVybjtcclxuXHJcbiAgICAgICAgYXBwbHlCdG4uZGlzYWJsZWQgPSAhKFxyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZURhdGVQaWNrZXIgfHxcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlICYmXHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUuaXNCZWZvcmUodGhpcy5lbmREYXRlKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLmlzU2FtZSh0aGlzLmVuZERhdGUpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ3VzdG9tRGF0ZShkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBUT0RPOiBJbXBsZW1lbnQgY3VzdG9tIGRhdGUgdmVyaWZpY2F0aW9uIGxvZ2ljXHJcbiAgICB9XHJcblxyXG4gICAgaXNJbnZhbGlkRGF0ZShkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXJ0RGF0ZShzdGFydERhdGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0RGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXlqcyhzdGFydERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhcnREYXRlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRheWpzKHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlciAmJiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUubWludXRlKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZCh0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5zdGFydERhdGUuaXNCZWZvcmUodGhpcy5taW5EYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlciAmJiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLm1pbnV0ZShcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHRoaXMuc3RhcnREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLm1heERhdGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZERhdGUoZW5kRGF0ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kRGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZGF5anMoZW5kRGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmREYXRlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBkYXlqcyhlbmREYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUubWludXRlKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZCh0aGlzLmVuZERhdGUubWludXRlKCkgLyB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpICogdGhpcy50aW1lUGlja2VySW5jcmVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5lbmREYXRlLmlzQWZ0ZXIodGhpcy5tYXhEYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1heERhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYXhTcGFuICYmIHRoaXMuc3RhcnREYXRlLmFkZCh0aGlzLm1heFNwYW4pLmlzQmVmb3JlKHRoaXMuZW5kRGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuYWRkKHRoaXMubWF4U3Bhbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzUmlnaHRUaW1lID0gdGhpcy5lbmREYXRlO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGVkIHJhbmdlIGRpc3BsYXlcclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHsgLy8gPC0tIEFkZCB0aGlzIGNoZWNrIVxyXG4gICAgICAgICAgICBjb25zdCBkcnBTZWxlY3RlZCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgaWYgKGRycFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBkcnBTZWxlY3RlZC5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5zZXBhcmF0b3IgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ2FsZW5kYXIoc2lkZSkge1xyXG4gICAgICAgIC8vIDEuIEdldCB0aGUgY2FsZW5kYXIgc3RhdGUgb2JqZWN0IChsZWZ0IG9yIHJpZ2h0KVxyXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyU3RhdGUgPSBzaWRlID09PSAnbGVmdCcgPyB0aGlzLmxlZnRDYWxlbmRhciA6IHRoaXMucmlnaHRDYWxlbmRhcjtcclxuICAgICAgICBjb25zdCBtb250aCA9IGNhbGVuZGFyU3RhdGUubW9udGgubW9udGgoKTtcclxuICAgICAgICBjb25zdCB5ZWFyID0gY2FsZW5kYXJTdGF0ZS5tb250aC55ZWFyKCk7XHJcbiAgICAgICAgY29uc3QgaG91ciA9IGNhbGVuZGFyU3RhdGUubW9udGguaG91cigpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9IGNhbGVuZGFyU3RhdGUubW9udGgubWludXRlKCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kID0gY2FsZW5kYXJTdGF0ZS5tb250aC5zZWNvbmQoKTtcclxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IGRheWpzKG5ldyBEYXRlKHllYXIsIG1vbnRoKSkuZGF5c0luTW9udGgoKTtcclxuICAgICAgICBjb25zdCBmaXJzdERheSA9IGRheWpzKG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKSk7XHJcbiAgICAgICAgY29uc3QgbGFzdERheSA9IGRheWpzKG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXlzSW5Nb250aCkpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RNb250aCA9IGZpcnN0RGF5LnN1YnRyYWN0KDEsICdtb250aCcpLm1vbnRoKCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFllYXIgPSBmaXJzdERheS5zdWJ0cmFjdCgxLCAnbW9udGgnKS55ZWFyKCk7XHJcbiAgICAgICAgY29uc3QgZGF5c0luTGFzdE1vbnRoID0gZGF5anMobmV3IERhdGUobGFzdFllYXIsIGxhc3RNb250aCkpLmRheXNJbk1vbnRoKCk7XHJcbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gZmlyc3REYXkuZGF5KCk7XHJcblxyXG4gICAgICAgIC8vIDIuIEJ1aWxkIHRoZSA2eDcgbWF0cml4IG9mIGRhdGVzXHJcbiAgICAgICAgY29uc3QgY2FsZW5kYXJNYXRyaXggPSBbXTtcclxuICAgICAgICBjYWxlbmRhck1hdHJpeC5maXJzdERheSA9IGZpcnN0RGF5O1xyXG4gICAgICAgIGNhbGVuZGFyTWF0cml4Lmxhc3REYXkgPSBsYXN0RGF5O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBjYWxlbmRhck1hdHJpeFtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0RGF5ID0gZGF5c0luTGFzdE1vbnRoIC0gZGF5T2ZXZWVrICsgdGhpcy5sb2NhbGUuZmlyc3REYXkgKyAxO1xyXG4gICAgICAgIGlmIChzdGFydERheSA+IGRheXNJbkxhc3RNb250aCkgc3RhcnREYXkgLT0gNztcclxuICAgICAgICBpZiAoZGF5T2ZXZWVrID09PSB0aGlzLmxvY2FsZS5maXJzdERheSkgc3RhcnREYXkgPSBkYXlzSW5MYXN0TW9udGggLSA2O1xyXG5cclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IGRheWpzKG5ldyBEYXRlKGxhc3RZZWFyLCBsYXN0TW9udGgsIHN0YXJ0RGF5LCAxMiwgbWludXRlLCBzZWNvbmQpKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvbCA9IDAsIHJvdyA9IDA7IGkgPCA0MjsgaSsrLCBjb2wrKywgY3VyRGF0ZSA9IGN1ckRhdGUuYWRkKDEsICdkYXknKSkge1xyXG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgY29sICUgNyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXSA9IGN1ckRhdGUuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgY3VyRGF0ZSA9IGN1ckRhdGUuaG91cigxMik7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pbkRhdGUgJiZcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5taW5EYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlKSAmJlxyXG4gICAgICAgICAgICAgICAgc2lkZSA9PT0gJ2xlZnQnXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJNYXRyaXhbcm93XVtjb2xdID0gdGhpcy5taW5EYXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1heERhdGUgJiZcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyTWF0cml4W3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5tYXhEYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF0uaXNBZnRlcih0aGlzLm1heERhdGUpICYmXHJcbiAgICAgICAgICAgICAgICBzaWRlID09PSAncmlnaHQnXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJNYXRyaXhbcm93XVtjb2xdID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAzLiBTdG9yZSB0aGUgbWF0cml4IGluIHRoZSBzdGF0ZSBvYmplY3RcclxuICAgICAgICBpZiAoc2lkZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLmNhbGVuZGFyID0gY2FsZW5kYXJNYXRyaXg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLmNhbGVuZGFyID0gY2FsZW5kYXJNYXRyaXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyA0LiBCdWlsZCB0aGUgSFRNTCBzdHJpbmdcclxuICAgICAgICBsZXQgbWluRGF0ZSA9IHNpZGUgPT09ICdsZWZ0JyA/IHRoaXMubWluRGF0ZSA6IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNpZGUgPT09ICdsZWZ0JyA/IHRoaXMuc3RhcnREYXRlIDogdGhpcy5lbmREYXRlO1xyXG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5sb2NhbGUuZGlyZWN0aW9uID09PSAnbHRyJ1xyXG4gICAgICAgICAgICA/IHsgbGVmdDogJ2NoZXZyb24tbGVmdCcsIHJpZ2h0OiAnY2hldnJvbi1yaWdodCcgfVxyXG4gICAgICAgICAgICA6IHsgbGVmdDogJ2NoZXZyb24tcmlnaHQnLCByaWdodDogJ2NoZXZyb24tbGVmdCcgfTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+JztcclxuICAgICAgICBodG1sICs9ICc8dGhlYWQ+JztcclxuICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgLy8gV2VlayBudW1iZXIgY2VsbFxyXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrTnVtYmVycyB8fCB0aGlzLnNob3dJU09XZWVrTnVtYmVycykgaHRtbCArPSAnPHRoPjwvdGg+JztcclxuXHJcbiAgICAgICAgaWYgKCghbWluRGF0ZSB8fCBtaW5EYXRlLmlzQmVmb3JlKGNhbGVuZGFyTWF0cml4LmZpcnN0RGF5KSkgJiYgKCF0aGlzLmxpbmtlZENhbGVuZGFycyB8fCBzaWRlID09PSAnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aCBjbGFzcz1cInByZXYgYXZhaWxhYmxlXCI+PHNwYW4+PC9zcGFuPjwvdGg+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8dGg+PC90aD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGVIdG1sID0gdGhpcy5sb2NhbGUubW9udGhOYW1lc1tjYWxlbmRhck1hdHJpeFsxXVsxXS5tb250aCgpXSArIGNhbGVuZGFyTWF0cml4WzFdWzFdLmZvcm1hdChcIiBZWVlZXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaG93RHJvcGRvd25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IGNhbGVuZGFyTWF0cml4WzFdWzFdLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gY2FsZW5kYXJNYXRyaXhbMV1bMV0ueWVhcigpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhZZWFyID0gKG1heERhdGUgJiYgbWF4RGF0ZS55ZWFyKCkpIHx8IHRoaXMubWF4WWVhcjtcclxuICAgICAgICAgICAgY29uc3QgbWluWWVhciA9IChtaW5EYXRlICYmIG1pbkRhdGUueWVhcigpKSB8fCB0aGlzLm1pblllYXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGluTWluWWVhciA9IGN1cnJlbnRZZWFyID09PSBtaW5ZZWFyO1xyXG4gICAgICAgICAgICBjb25zdCBpbk1heFllYXIgPSBjdXJyZW50WWVhciA9PT0gbWF4WWVhcjtcclxuXHJcbiAgICAgICAgICAgIGxldCBtb250aEh0bWwgPSAnPHNlbGVjdCBjbGFzcz1cIm1vbnRoc2VsZWN0XCI+JztcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCFpbk1pblllYXIgfHwgKG1pbkRhdGUgJiYgbSA+PSBtaW5EYXRlLm1vbnRoKCkpKSAmJiAoIWluTWF4WWVhciB8fCAobWF4RGF0ZSAmJiBtIDw9IG1heERhdGUubW9udGgoKSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhIdG1sICs9IGA8b3B0aW9uIHZhbHVlPVwiJHttfVwiJHttID09PSBjdXJyZW50TW9udGggPyBcIiBzZWxlY3RlZFwiIDogXCJcIn0+JHt0aGlzLmxvY2FsZS5tb250aE5hbWVzW21dfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoSHRtbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7bX1cIiR7bSA9PT0gY3VycmVudE1vbnRoID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCJ9IGRpc2FibGVkPiR7dGhpcy5sb2NhbGUubW9udGhOYW1lc1ttXX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vbnRoSHRtbCArPSBcIjwvc2VsZWN0PlwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHllYXJIdG1sID0gJzxzZWxlY3QgY2xhc3M9XCJ5ZWFyc2VsZWN0XCI+JztcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IG1pblllYXI7IHkgPD0gbWF4WWVhcjsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICB5ZWFySHRtbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7eX1cIiR7eSA9PT0gY3VycmVudFllYXIgPyBcIiBzZWxlY3RlZFwiIDogXCJcIn0+JHt5fTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeWVhckh0bWwgKz0gJzwvc2VsZWN0Pic7XHJcblxyXG4gICAgICAgICAgICBkYXRlSHRtbCA9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgPHRoIGNvbHNwYW49XCI1XCIgY2xhc3M9XCJtb250aFwiPiR7ZGF0ZUh0bWx9PC90aD5gO1xyXG4gICAgICAgIGlmICgoIW1heERhdGUgfHwgbWF4RGF0ZS5pc0FmdGVyKGNhbGVuZGFyTWF0cml4Lmxhc3REYXkpKSAmJiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzIHx8IHNpZGUgPT09ICdyaWdodCcgfHwgdGhpcy5zaW5nbGVEYXRlUGlja2VyKSkge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8dGggY2xhc3M9XCJuZXh0IGF2YWlsYWJsZVwiPjxzcGFuPjwvc3Bhbj48L3RoPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHRoPjwvdGg+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzwvdHI+JztcclxuICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgLy8gV2VlayBsYWJlbFxyXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrTnVtYmVycyB8fCB0aGlzLnNob3dJU09XZWVrTnVtYmVycykgaHRtbCArPSBgPHRoIGNsYXNzPVwid2Vla1wiPiR7dGhpcy5sb2NhbGUud2Vla0xhYmVsfTwvdGg+YDtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhbGUuZGF5c09mV2Vlay5mb3JFYWNoKGRheU9mV2VlayA9PiB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDx0aD4ke2RheU9mV2Vla308L3RoPmA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzwvdHI+JztcclxuICAgICAgICBodG1sICs9ICc8L3RoZWFkPic7XHJcbiAgICAgICAgaHRtbCArPSAnPHRib2R5Pic7XHJcblxyXG4gICAgICAgIC8vIEFkanVzdCBtYXhEYXRlIGZvciBtYXhTcGFuXHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSA9PT0gbnVsbCAmJiB0aGlzLm1heFNwYW4pIHtcclxuICAgICAgICAgICAgY29uc3QgbWF4TGltaXQgPSB0aGlzLnN0YXJ0RGF0ZS5hZGQodGhpcy5tYXhTcGFuKS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgIGlmICghbWF4RGF0ZSB8fCBtYXhMaW1pdC5pc0JlZm9yZShtYXhEYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgbWF4RGF0ZSA9IG1heExpbWl0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA2OyByb3crKykge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+JztcclxuXHJcbiAgICAgICAgICAgIC8vIFdlZWsgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXZWVrTnVtYmVycylcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDx0ZCBjbGFzcz1cIndlZWtcIj4ke2NhbGVuZGFyTWF0cml4W3Jvd11bMF0ud2VlaygpfTwvdGQ+YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zaG93SVNPV2Vla051bWJlcnMpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8dGQgY2xhc3M9XCJ3ZWVrXCI+JHtjYWxlbmRhck1hdHJpeFtyb3ddWzBdLmlzb1dlZWsoKX08L3RkPmA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA3OyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbERhdGUgPSBjYWxlbmRhck1hdHJpeFtyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRvZGF5J3MgZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxEYXRlLmlzU2FtZShuZXcgRGF0ZSgpLCBcImRheVwiKSlcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ3RvZGF5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2Vla2VuZHNcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsRGF0ZS5pc29XZWVrZGF5KCkgPiA1KVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnd2Vla2VuZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE9mZi1tb250aFxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxEYXRlLm1vbnRoKCkgIT09IGNhbGVuZGFyTWF0cml4WzFdWzFdLm1vbnRoKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZW5kcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJlZm9yZSBtaW5EYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIGNlbGxEYXRlLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgbWF4RGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgY2VsbERhdGUuaXNBZnRlcihtYXhEYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDdXN0b20gaW52YWxpZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkRGF0ZShjZWxsRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFydCBkYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ3N0YXJ0LWRhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSAhPT0gbnVsbCAmJiBjZWxsRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ2VuZC1kYXRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW4gcmFuZ2VcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgIT09IG51bGwgJiYgY2VsbERhdGUgPiB0aGlzLnN0YXJ0RGF0ZSAmJiBjZWxsRGF0ZSA8IHRoaXMuZW5kRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2luLXJhbmdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3VzdG9tIGNsYXNzZXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ3VzdG9tID0gdGhpcy5pc0N1c3RvbURhdGUoY2VsbERhdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3VzdG9tICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXNDdXN0b20gPT09ICdzdHJpbmcnKSBjbGFzc2VzLnB1c2goaXNDdXN0b20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY2xhc3Nlcy5wdXNoKC4uLmlzQ3VzdG9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY25hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY25hbWUgKz0gY2xhc3Nlc1tpXSArICcgJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlc1tpXSA9PT0gJ2Rpc2FibGVkJykgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgY25hbWUgKz0gJ2F2YWlsYWJsZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHRkIGNsYXNzPVwiJHtjbmFtZS50cmltKCl9XCIgZGF0YS10aXRsZT1cInIke3Jvd31jJHtjb2x9XCI+JHtjZWxsRGF0ZS5kYXRlKCl9PC90ZD5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gJzwvdGJvZHk+JztcclxuICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XHJcblxyXG4gICAgICAgIC8vIDUuIEluamVjdCB0aGUgSFRNTCBpbnRvIHRoZSBjYWxlbmRhciB0YWJsZVxyXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyVGFibGUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuZHJwLWNhbGVuZGFyLiR7c2lkZX0gLmNhbGVuZGFyLXRhYmxlYCk7XHJcbiAgICAgICAgaWYgKGNhbGVuZGFyVGFibGUpIHtcclxuICAgICAgICAgICAgY2FsZW5kYXJUYWJsZS5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJUaW1lUGlja2VyKHNpZGUpIHtcclxuICAgICAgICAvLyBEb24ndCBib3RoZXIgdXBkYXRpbmcgdGhlIHRpbWUgcGlja2VyIGlmIGl0J3MgY3VycmVudGx5IGRpc2FibGVkXHJcbiAgICAgICAgLy8gYmVjYXVzZSBhbiBlbmQgZGF0ZSBoYXNuJ3QgYmVlbiBjbGlja2VkIHlldFxyXG4gICAgICAgIGlmIChzaWRlID09PSAncmlnaHQnICYmICF0aGlzLmVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwsIHNlbGVjdGVkLCBtaW5EYXRlLCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMubWF4U3BhbiAmJlxyXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLnN0YXJ0RGF0ZS5hZGQodGhpcy5tYXhTcGFuKS5pc0JlZm9yZSh0aGlzLm1heERhdGUpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBtYXhEYXRlID0gdGhpcy5zdGFydERhdGUuYWRkKHRoaXMubWF4U3Bhbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2lkZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgICAgIG1pbkRhdGUgPSB0aGlzLm1pbkRhdGU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaWRlID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5lbmREYXRlO1xyXG4gICAgICAgICAgICBtaW5EYXRlID0gdGhpcy5zdGFydERhdGU7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmVzZXJ2ZSB0aGUgdGltZSBhbHJlYWR5IHNlbGVjdGVkXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTZWxlY3RvciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kcnAtY2FsZW5kYXIucmlnaHQgLmNhbGVuZGFyLXRpbWUnKTtcclxuICAgICAgICAgICAgaWYgKHRpbWVTZWxlY3RvciAmJiB0aW1lU2VsZWN0b3IuaW5uZXJIVE1MLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvdXJTZWxlY3QgPSB0aW1lU2VsZWN0b3IucXVlcnlTZWxlY3RvcignLmhvdXJzZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbnV0ZVNlbGVjdCA9IHRpbWVTZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcubWludXRlc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRTZWxlY3QgPSB0aW1lU2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlY29uZHNlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1wbVNlbGVjdCA9IHRpbWVTZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuYW1wbXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChob3VyU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaG91clZhbCA9IHBhcnNlSW50KGhvdXJTZWxlY3QudmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5ob3VyKCFpc05hTihzZWxlY3RlZC5ob3VyKCkpID8gc2VsZWN0ZWQuaG91cigpIDogaG91clZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZVNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbnV0ZVZhbCA9IHBhcnNlSW50KG1pbnV0ZVNlbGVjdC52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLm1pbnV0ZSghaXNOYU4oc2VsZWN0ZWQubWludXRlKCkpID8gc2VsZWN0ZWQubWludXRlKCkgOiBtaW51dGVWYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRWYWwgPSBwYXJzZUludChzZWNvbmRTZWxlY3QudmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5zZWNvbmQoIWlzTmFOKHNlbGVjdGVkLnNlY29uZCgpKSA/IHNlbGVjdGVkLnNlY29uZCgpIDogc2Vjb25kVmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91ciAmJiBhbXBtU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1wbSA9IGFtcG1TZWxlY3QudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgc2VsZWN0ZWQuaG91cigpIDwgMTIpIHNlbGVjdGVkLmhvdXIoc2VsZWN0ZWQuaG91cigpICsgMTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnQU0nICYmIHNlbGVjdGVkLmhvdXIoKSA9PT0gMTIpIHNlbGVjdGVkLmhvdXIoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHNlbGVjdGVkLmlzQWZ0ZXIobWF4RGF0ZSkpIHNlbGVjdGVkID0gbWF4RGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhvdXJzXHJcbiAgICAgICAgaHRtbCA9ICc8c2VsZWN0IGNsYXNzPVwiaG91cnNlbGVjdFwiPic7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy50aW1lUGlja2VyMjRIb3VyID8gMCA6IDE7XHJcbiAgICAgICAgbGV0IGVuZCA9IHRoaXMudGltZVBpY2tlcjI0SG91ciA/IDIzIDogMTI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaV9pbl8yNCA9IGk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKVxyXG4gICAgICAgICAgICAgICAgaV9pbl8yNCA9IHNlbGVjdGVkLmhvdXIoKSA+PSAxMiA/IChpID09PSAxMiA/IDEyIDogaSArIDEyKSA6IChpID09PSAxMiA/IDAgOiBpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZWN0ZWQuaG91cihpX2luXzI0KTtcclxuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHRpbWUubWludXRlKDU5KS5pc0JlZm9yZShtaW5EYXRlKSkgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLm1pbnV0ZSgwKS5pc0FmdGVyKG1heERhdGUpKSBkaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoaV9pbl8yNCA9PT0gc2VsZWN0ZWQuaG91cigpICYmICFkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7aX1cIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JHtpfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke2l9XCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZGlzYWJsZWRcIj4ke2l9PC9vcHRpb24+YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke2l9XCI+JHtpfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XHJcblxyXG4gICAgICAgIC8vIE1pbnV0ZXNcclxuICAgICAgICBodG1sICs9ICc6IDxzZWxlY3QgY2xhc3M9XCJtaW51dGVzZWxlY3RcIj4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBwYWRkZWQgPSBpIDwgMTAgPyAnMCcgKyBpIDogaTtcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSBzZWxlY3RlZC5taW51dGUoaSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgdGltZS5zZWNvbmQoNTkpLmlzQmVmb3JlKG1pbkRhdGUpKSBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHRpbWUuc2Vjb25kKDApLmlzQWZ0ZXIobWF4RGF0ZSkpIGRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5taW51dGUoKSA9PT0gaSAmJiAhZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke2l9XCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPiR7cGFkZGVkfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke2l9XCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZGlzYWJsZWRcIj4ke3BhZGRlZH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7aX1cIj4ke3BhZGRlZH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0PiAnO1xyXG5cclxuICAgICAgICAvLyBTZWNvbmRzXHJcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlclNlY29uZHMpIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnOiA8c2VsZWN0IGNsYXNzPVwic2Vjb25kc2VsZWN0XCI+JztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFkZGVkID0gaSA8IDEwID8gJzAnICsgaSA6IGk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IHNlbGVjdGVkLnNlY29uZChpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHRpbWUuaXNCZWZvcmUobWluRGF0ZSkpIGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHRpbWUuaXNBZnRlcihtYXhEYXRlKSkgZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5zZWNvbmQoKSA9PT0gaSAmJiAhZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtpfVwiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4ke3BhZGRlZH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke2l9XCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZGlzYWJsZWRcIj4ke3BhZGRlZH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtpfVwiPiR7cGFkZGVkfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBTS9QTVxyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxzZWxlY3QgY2xhc3M9XCJhbXBtc2VsZWN0XCI+JztcclxuICAgICAgICAgICAgbGV0IGFtX2h0bWwgPSAnJztcclxuICAgICAgICAgICAgbGV0IHBtX2h0bWwgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHNlbGVjdGVkLmhvdXIoMTIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkuaXNCZWZvcmUobWluRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBhbV9odG1sID0gJyBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiJztcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHNlbGVjdGVkLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5pc0FmdGVyKG1heERhdGUpKVxyXG4gICAgICAgICAgICAgICAgcG1faHRtbCA9ICcgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZGlzYWJsZWRcIic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQuaG91cigpID49IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8b3B0aW9uIHZhbHVlPVwiQU1cIiR7YW1faHRtbH0+QU08L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiUE1cIiBzZWxlY3RlZD1cInNlbGVjdGVkXCIke3BtX2h0bWx9PlBNPC9vcHRpb24+YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCJBTVwiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIiR7YW1faHRtbH0+QU08L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiUE1cIiR7cG1faHRtbH0+UE08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0Pic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIEhUTUxcclxuICAgICAgICBjb25zdCBjYWxlbmRhclRpbWUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuZHJwLWNhbGVuZGFyLiR7c2lkZX0gLmNhbGVuZGFyLXRpbWVgKTtcclxuICAgICAgICBpZiAoY2FsZW5kYXJUaW1lKSB7XHJcbiAgICAgICAgICAgIGNhbGVuZGFyVGltZS5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSYW5nZXMob3B0aW9ucykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yYW5nZXMgIT09ICdvYmplY3QnIHx8ICF0aGlzLmNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnJhbmdlcyA9IHt9OyAvLyBSZXNldFxyXG5cclxuICAgICAgICBsZXQgc3RhcnQsIGVuZDtcclxuICAgICAgICBmb3IgKGxldCByYW5nZSBpbiBvcHRpb25zLnJhbmdlcykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2VzLmhhc093blByb3BlcnR5KHJhbmdlKSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMucmFuZ2VzW3JhbmdlXVswXSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGRheWpzKG9wdGlvbnMucmFuZ2VzW3JhbmdlXVswXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBkYXlqcyhvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnJhbmdlc1tyYW5nZV1bMV0gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgZW5kID0gZGF5anMob3B0aW9ucy5yYW5nZXNbcmFuZ2VdWzFdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkYXlqcyhvcHRpb25zLnJhbmdlc1tyYW5nZV1bMV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0YXJ0IG9yIGVuZCBkYXRlIGV4Y2VlZCB0aG9zZSBhbGxvd2VkIGJ5IHRoZSBtaW5EYXRlIG9yIG1heFNwYW5cclxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBzdGFydC5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKVxyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLm1pbkRhdGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWF4U3BhbiAmJiBtYXhEYXRlICYmIHN0YXJ0LmFkZCh0aGlzLm1heFNwYW4pLmlzQWZ0ZXIobWF4RGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBtYXhEYXRlID0gc3RhcnQuYWRkKHRoaXMubWF4U3Bhbik7XHJcbiAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIGVuZC5pc0FmdGVyKG1heERhdGUpKVxyXG4gICAgICAgICAgICAgICAgZW5kID0gbWF4RGF0ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBlbmQgb2YgdGhlIHJhbmdlIGlzIGJlZm9yZSB0aGUgbWluaW11bSBvciB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlIGlzIGFmdGVyIHRoZSBtYXhpbXVtLCBza2lwXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5taW5EYXRlICYmIGVuZC5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsIHRoaXMudGltZVBpY2tlciA/ICdtaW51dGUnIDogJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgfHwgKG1heERhdGUgJiYgc3RhcnQuaXNBZnRlcihtYXhEYXRlLCB0aGlzLnRpbWVQaWNrZXIgPyAnbWludXRlJyA6ICdkYXknKSkpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQgdW5pY29kZSBjaGFycyBpbiB0aGUgcmFuZ2UgbmFtZXNcclxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gcmFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlSHRtbCA9IGVsZW0udmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJhbmdlc1tyYW5nZUh0bWxdID0gW3N0YXJ0LCBlbmRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQnVpbGQgdGhlIGxpc3QgSFRNTFxyXG4gICAgICAgIGxldCBsaXN0ID0gJzx1bD4nO1xyXG4gICAgICAgIGZvciAobGV0IHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGxpc3QgKz0gYDxsaSBkYXRhLXJhbmdlLWtleT1cIiR7cmFuZ2V9XCI+JHtyYW5nZX08L2xpPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsKSB7XHJcbiAgICAgICAgICAgIGxpc3QgKz0gYDxsaSBkYXRhLXJhbmdlLWtleT1cIiR7dGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbH1cIj4ke3RoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWx9PC9saT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0ICs9ICc8L3VsPic7XHJcblxyXG4gICAgICAgIC8vIEluc2VydCBpbnRvIHRoZSAucmFuZ2VzIGNvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IHJhbmdlc0RpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yYW5nZXMnKTtcclxuICAgICAgICBpZiAocmFuZ2VzRGl2KSB7XHJcbiAgICAgICAgICAgIHJhbmdlc0Rpdi5pbm5lckhUTUwgPSBsaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5uZXJzKCkge1xyXG4gICAgICAgIC8vIENhbGVuZGFyIEV2ZW50c1xyXG4gICAgICAgIGlmICh0aGlzLl9kcnBDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fZHJwQ2FsZW5kYXJzLmZvckVhY2goY2FsZW5kYXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jYWxlbmRhckNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9jYWxlbmRhck1vdXNlZG93bkhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2NhbGVuZGFyTW91c2VlbnRlckhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fY2FsZW5kYXJDaGFuZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZXMgRXZlbnRzXHJcbiAgICAgICAgaWYgKHRoaXMuX3Jhbmdlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9yYW5nZXNDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQnV0dG9ucyBFdmVudHNcclxuICAgICAgICBpZiAodGhpcy5fZHJwQnV0dG9ucykge1xyXG4gICAgICAgICAgICB0aGlzLl9kcnBCdXR0b25zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fYnV0dG9uc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbnB1dC9FbGVtZW50IEV2ZW50c1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgfHxcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdCVVRUT04nXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2lucHV0Q2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5faW5wdXRGb2N1c0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9pbnB1dEtleXVwSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faW5wdXRLZXlkb3duSGFuZGxlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdG9nZ2xlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fdG9nZ2xlSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZ2xvYmFsIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIGlmICh0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVQcm94eSkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplUHJveHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGlja2VyIGNvbnRhaW5lciBmcm9tIHRoZSBET01cclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50TGlzdGVubmVycygpO1xyXG5cclxuICAgICAgICAvLyBOdWxsIG91dCByZWZlcmVuY2VzXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZVByb3h5ID0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCAiaW1wb3J0IERhdGVSYW5nZVBpY2tlciAgZnJvbSAnLi9wbHVnaW4uanMnO1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xyXG5pbXBvcnQgdXRjIGZyb20gJ2RheWpzL3BsdWdpbi91dGMnO1xyXG5pbXBvcnQgdGltZXpvbmUgZnJvbSAnZGF5anMvcGx1Z2luL3RpbWV6b25lJztcclxuaW1wb3J0IGlzU2FtZSBmcm9tICdkYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlcic7XHJcbmltcG9ydCBjdXN0b21QYXJzZUZvcm1hdCBmcm9tICdkYXlqcy9wbHVnaW4vY3VzdG9tUGFyc2VGb3JtYXQnO1xyXG5cclxuZGF5anMuZXh0ZW5kKHV0Yyk7XHJcbmRheWpzLmV4dGVuZCh0aW1lem9uZSk7XHJcbmRheWpzLmV4dGVuZChjdXN0b21QYXJzZUZvcm1hdCk7XHJcbmRheWpzLmV4dGVuZChpc1NhbWUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0ZVJhbmdlQ29tcG9uZW50KHtcclxuICAgICAgIG5hbWUsXHJcbiAgICAgICBzdGF0ZSxcclxuICAgICAgIGFsd2F5c1Nob3dDYWxlbmRhcnMsXHJcbiAgICAgICBhdXRvQXBwbHksXHJcbiAgICAgICBsaW5rZWRDYWxlbmRhcnMsXHJcbiAgICAgICBzaW5nbGVDYWxlbmRhcixcclxuICAgICAgIHN0YXJ0RGF0ZSxcclxuICAgICAgIGVuZERhdGUsXHJcbiAgICAgICBtYXhEYXRlLFxyXG4gICAgICAgbWluRGF0ZSxcclxuICAgICAgIHRpbWVQaWNrZXIsXHJcbiAgICAgICB0aW1lUGlja2VyMjQsXHJcbiAgICAgICB0aW1lUGlja2VyU2Vjb25kLFxyXG4gICAgICAgdGltZVBpY2tlckluY3JlbWVudCxcclxuICAgICAgIGRpc3BsYXlGb3JtYXQsXHJcbiAgICAgICBhcHBseUxhYmVsLFxyXG4gICAgICAgY2FuY2VsTGFiZWwsXHJcbiAgICAgICBmcm9tTGFiZWwsXHJcbiAgICAgICB0b0xhYmVsLFxyXG4gICAgICAgY3VzdG9tUmFuZ2VMYWJlbCxcclxuICAgICAgIGRpc2FibGVDdXN0b21SYW5nZSxcclxuICAgICAgIGRpc2FibGVkRGF0ZXMsXHJcbiAgICAgICBkcm9wcyxcclxuICAgICAgIG9wZW5zLFxyXG4gICAgICAgc3VuZGF5LFxyXG4gICAgICAgbW9uZGF5LFxyXG4gICAgICAgdHVlc2RheSxcclxuICAgICAgIHdlZG5lc2RheSxcclxuICAgICAgIHRodXJzZGF5LFxyXG4gICAgICAgZnJpZGF5LFxyXG4gICAgICAgc2F0dXJkYXksXHJcbiAgICAgICBqYW51YXJ5LFxyXG4gICAgICAgZmVicnVhcnksXHJcbiAgICAgICBtYXJjaCxcclxuICAgICAgIGFwcmlsLFxyXG4gICAgICAgbWF5LFxyXG4gICAgICAganVuZSxcclxuICAgICAgIGp1bHksXHJcbiAgICAgICBhdWd1c3QsXHJcbiAgICAgICBzZXB0ZW1iZXIsXHJcbiAgICAgICBvY3RvYmVyLFxyXG4gICAgICAgbm92ZW1iZXIsXHJcbiAgICAgICBkZWNlbWJlcixcclxuICAgICAgIGZpcnN0RGF5LFxyXG4gICAgICAgcmFuZ2VzLFxyXG4gICAgICAgbWF4U3BhbixcclxuICAgICAgIGRpc2FibGVSYW5nZSxcclxuICAgICAgIHNlcGFyYXRvcixcclxuICAgICAgIHVzZVJhbmdlTGFiZWxzLFxyXG4gICAgICAgaGFuZGxlVmFsdWVDaGFuZ2VVc2luZyxcclxuICAgICAgIHNob3dXZWVrTnVtYmVycyxcclxuICAgICAgIHNob3dJU09XZWVrTnVtYmVycyxcclxuICAgICAgIHdlZWtMYWJlbCxcclxuICAgICAgIHNob3dEcm9wZG93bnMsXHJcbiAgICAgICBtaW5ZZWFyLFxyXG4gICAgICAgbWF4WWVhcixcclxuICAgICAgIHRpbWV6b25lXHJcbiAgICB9KSB7XHJcblxyXG4gICAgbGV0IGRheWpzUmFuZ2VzID0ge307XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gcmFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGRhdGVSYW5nZSA9IHJhbmdlc1trZXldO1xyXG4gICAgICAgIGRheWpzUmFuZ2VzW2tleV0gPSBkYXRlUmFuZ2UubWFwKChkYXRlU3RyaW5nKSA9PiBkYXlqcyhkYXRlU3RyaW5nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgZGF0ZVJhbmdlUGlja2VyOiBudWxsLFxyXG4gICAgICAgIHN0YXRlOiBzdGF0ZSxcclxuICAgICAgICBnZXRSYW5nZUxhYmVsOiBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZSB8fCAhdXNlUmFuZ2VMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgW2Zyb20sIHRvXSA9IHN0YXRlLnNwbGl0KHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb21EYXRlID0gZGF5anMoZnJvbSwgZGlzcGxheUZvcm1hdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvRGF0ZSA9IGRheWpzKHRvLCBkaXNwbGF5Rm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2xhYmVsLCBbcmFuZ2VGcm9tLCByYW5nZVRvXV0gb2YgT2JqZWN0LmVudHJpZXMoZGF5anNSYW5nZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJvbURhdGUuaXNTYW1lKHJhbmdlRnJvbSkgJiYgdG9EYXRlLmlzU2FtZShyYW5nZVRvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZGF5anMudHouc2V0RGVmYXVsdCh0aW1lem9uZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF5anNEYXRlc0FycmF5ID0gW107XHJcblxyXG4gICAgICAgICAgICBpZihkaXNhYmxlZERhdGVzICE9PSB1bmRlZmluZWQgJiYgZGlzYWJsZWREYXRlcy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICAgICAgZGF5anNEYXRlc0FycmF5ID0gZGlzYWJsZWREYXRlcy5tYXAoZGF0ZVN0cmluZyA9PiBkYXlqcyhkYXRlU3RyaW5nKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVJhbmdlUGlja2VyID0gbmV3IERhdGVSYW5nZVBpY2tlcihcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZGF0ZXJhbmdlLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWx3YXlzU2hvd0NhbGVuZGFyczogYWx3YXlzU2hvd0NhbGVuZGFycyxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQXBwbHk6IGF1dG9BcHBseSxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rZWRDYWxlbmRhcnM6IGxpbmtlZENhbGVuZGFycyxcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVEYXRlUGlja2VyOiBzaW5nbGVDYWxlbmRhcixcclxuICAgICAgICAgICAgICAgICAgICBhdXRvVXBkYXRlSW5wdXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BzOiBkcm9wcyxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuczogb3BlbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUgIT09IG51bGwgPyBkYXlqcyhzdGFydERhdGUpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUgIT09IG51bGwgPyBkYXlqcyhlbmREYXRlKSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlICE9PSBudWxsID8gZGF5anMobWF4RGF0ZSkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogbWluRGF0ZSAhPT0gbnVsbCA/IGRheWpzKG1pbkRhdGUpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVQaWNrZXI6IHRpbWVQaWNrZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlcjI0SG91cjogdGltZVBpY2tlcjI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVQaWNrZXJTZWNvbmRzOiB0aW1lUGlja2VyU2Vjb25kLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IHRpbWVQaWNrZXJJbmNyZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0N1c3RvbVJhbmdlTGFiZWw6ICEgZGlzYWJsZUN1c3RvbVJhbmdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRpc3BsYXlGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseUxhYmVsOiBhcHBseUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxMYWJlbDogY2FuY2VsTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21MYWJlbDogZnJvbUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0xhYmVsOiB0b0xhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SYW5nZUxhYmVsOiBjdXN0b21SYW5nZUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrTGFiZWw6IHdlZWtMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5c09mV2VlazogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VuZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVlc2RheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZG5lc2RheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodXJzZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJpZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F0dXJkYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGphbnVhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWJydWFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXByaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVseSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1Z3VzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcHRlbWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9jdG9iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZlbWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2VtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogZmlyc3REYXlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlczogZGlzYWJsZVJhbmdlID8gdW5kZWZpbmVkIDogZGF5anNSYW5nZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4U3BhbjogbWF4U3BhbixcclxuICAgICAgICAgICAgICAgICAgICBzaG93V2Vla051bWJlcnM6IHNob3dXZWVrTnVtYmVycyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SVNPV2Vla051bWJlcnM6IHNob3dJU09XZWVrTnVtYmVycyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93RHJvcGRvd25zOiBzaG93RHJvcGRvd25zLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblllYXI6IG1pblllYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WWVhcjogbWF4WWVhcixcclxuICAgICAgICAgICAgICAgICAgICBpc0ludmFsaWREYXRlOiAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXlqc0RhdGVzQXJyYXkgIT09IG51bGwgJiYgZGF5anNEYXRlc0FycmF5Lmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5anNEYXRlc0FycmF5LnNvbWUoZGlzYWJsZWREYXRlID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWREYXRlLnV0YygpLnN0YXJ0T2YoJ2RheScpLmlzU2FtZShkYXRlLnV0YygpLnN0YXJ0T2YoJ2RheScpLCAnZGF5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5kYXRlUmFuZ2VQaWNrZXIgPSAkKHRoaXMuJHJlZnMuZGF0ZXJhbmdlKS5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyB3b3JrcyB3aXRoIHRoZSBuZXcgRGF0ZVJhbmdlUGlja2VyXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVJhbmdlUGlja2VyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYXBwbHknLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGlja2VyID0gZXYuZGV0YWlsO1xyXG4gICAgICAgICAgICAgICAgaWYoc2luZ2xlQ2FsZW5kYXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVZhbHVlQ2hhbmdlVXNpbmcocGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCksIG5hbWUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVWYWx1ZUNoYW5nZVVzaW5nKHBpY2tlci5zdGFydERhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpICsgc2VwYXJhdG9yICsgcGlja2VyLmVuZERhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpLCBuYW1lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUZyb21TdGF0ZSh0aGlzLmRhdGVSYW5nZVBpY2tlciwgdGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuJHJlZnMuZGF0ZXJhbmdlLnZhbHVlID0gcGFyZW50LmdldFJhbmdlTGFiZWwocGFyZW50LnN0YXRlKTtcclxuICAgICAgICAgICAgfSwgMjApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3N0YXRlJywgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsZWFyKHBhcmVudC5kYXRlUmFuZ2VQaWNrZXIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmRhdGVGcm9tU3RhdGUocGFyZW50LmRhdGVSYW5nZVBpY2tlciwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBhcmVudC4kcmVmcy5kYXRlcmFuZ2UudmFsdWUgPSBwYXJlbnQuZ2V0UmFuZ2VMYWJlbCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIChkYXRlUmFuZ2VQaWNrZXIpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGVSYW5nZVBpY2tlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRTdGFydERhdGUoZGF5anMoKSk7XHJcbiAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRFbmREYXRlKGRheWpzKCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGVGcm9tU3RhdGU6IGZ1bmN0aW9uIChkYXRlUmFuZ2VQaWNrZXIsc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKGRhdGVSYW5nZVBpY2tlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gc3RhdGUuc3BsaXQoc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMiAmJiBkYXRlUmFuZ2VQaWNrZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRTdGFydERhdGUoZGF5anMoZGF0ZXNbMF0sIGRpc3BsYXlGb3JtYXQpKTtcclxuICAgICAgICAgICAgICAgIGRhdGVSYW5nZVBpY2tlci5zZXRFbmREYXRlKGRheWpzKGRhdGVzWzFdLCBkaXNwbGF5Rm9ybWF0KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKGRhdGVSYW5nZVBpY2tlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLEtBQUMsU0FBUyxHQUFFLEdBQUU7QUFBQyxrQkFBVSxPQUFPLFdBQVMsZUFBYSxPQUFPLFNBQU8sT0FBTyxVQUFRLEVBQUUsSUFBRSxjQUFZLE9BQU8sVUFBUSxPQUFPLE1BQUksT0FBTyxDQUFDLEtBQUcsSUFBRSxlQUFhLE9BQU8sYUFBVyxhQUFXLEtBQUcsTUFBTSxRQUFNLEVBQUU7QUFBQSxJQUFDLEVBQUUsU0FBTSxXQUFVO0FBQUM7QUFBYSxVQUFJLElBQUUsS0FBSSxJQUFFLEtBQUksSUFBRSxNQUFLLElBQUUsZUFBYyxJQUFFLFVBQVMsSUFBRSxVQUFTLElBQUUsUUFBTyxJQUFFLE9BQU0sSUFBRSxRQUFPLElBQUUsU0FBUSxJQUFFLFdBQVUsSUFBRSxRQUFPLElBQUUsUUFBTyxJQUFFLGdCQUFlLElBQUUsOEZBQTZGLElBQUUsdUZBQXNGLElBQUUsRUFBQyxNQUFLLE1BQUssVUFBUywyREFBMkQsTUFBTSxHQUFHLEdBQUUsUUFBTyx3RkFBd0YsTUFBTSxHQUFHLEdBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsWUFBSUMsS0FBRSxDQUFDLE1BQUssTUFBSyxNQUFLLElBQUksR0FBRUMsS0FBRUYsS0FBRTtBQUFJLGVBQU0sTUFBSUEsTUFBR0MsSUFBR0MsS0FBRSxNQUFJLEVBQUUsS0FBR0QsR0FBRUMsRUFBQyxLQUFHRCxHQUFFLENBQUMsS0FBRztBQUFBLE1BQUcsRUFBQyxHQUFFLElBQUUsU0FBU0QsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLFlBQUlDLEtBQUUsT0FBT0gsRUFBQztBQUFFLGVBQU0sQ0FBQ0csTUFBR0EsR0FBRSxVQUFRRixLQUFFRCxLQUFFLEtBQUcsTUFBTUMsS0FBRSxJQUFFRSxHQUFFLE1BQU0sRUFBRSxLQUFLRCxFQUFDLElBQUVGO0FBQUEsTUFBQyxHQUFFLElBQUUsRUFBQyxHQUFFLEdBQUUsR0FBRSxTQUFTQSxJQUFFO0FBQUMsWUFBSUMsS0FBRSxDQUFDRCxHQUFFLFVBQVUsR0FBRUUsS0FBRSxLQUFLLElBQUlELEVBQUMsR0FBRUUsS0FBRSxLQUFLLE1BQU1ELEtBQUUsRUFBRSxHQUFFRSxLQUFFRixLQUFFO0FBQUcsZ0JBQU9ELE1BQUcsSUFBRSxNQUFJLE9BQUssRUFBRUUsSUFBRSxHQUFFLEdBQUcsSUFBRSxNQUFJLEVBQUVDLElBQUUsR0FBRSxHQUFHO0FBQUEsTUFBQyxHQUFFLEdBQUUsU0FBU0osR0FBRUMsSUFBRUMsSUFBRTtBQUFDLFlBQUdELEdBQUUsS0FBSyxJQUFFQyxHQUFFLEtBQUssRUFBRSxRQUFNLENBQUNGLEdBQUVFLElBQUVELEVBQUM7QUFBRSxZQUFJRSxLQUFFLE1BQUlELEdBQUUsS0FBSyxJQUFFRCxHQUFFLEtBQUssTUFBSUMsR0FBRSxNQUFNLElBQUVELEdBQUUsTUFBTSxJQUFHRyxLQUFFSCxHQUFFLE1BQU0sRUFBRSxJQUFJRSxJQUFFLENBQUMsR0FBRUUsS0FBRUgsS0FBRUUsS0FBRSxHQUFFRSxLQUFFTCxHQUFFLE1BQU0sRUFBRSxJQUFJRSxNQUFHRSxLQUFFLEtBQUcsSUFBRyxDQUFDO0FBQUUsZUFBTSxFQUFFLEVBQUVGLE1BQUdELEtBQUVFLE9BQUlDLEtBQUVELEtBQUVFLEtBQUVBLEtBQUVGLFFBQUs7QUFBQSxNQUFFLEdBQUUsR0FBRSxTQUFTSixJQUFFO0FBQUMsZUFBT0EsS0FB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QUFNRCxHQUFFLENBQUMsSUFBRSxDQUFDQyxLQUFFQTtBQUFBLFFBQUMsRUFBRUYsRUFBQztBQUFBLE1BQUMsQ0FBQyxHQUFFLElBQUUsU0FBU0EsSUFBRTtBQUFDLFlBQUlDLEtBQUUsRUFBRUQsRUFBQztBQUFFLGVBQU9DLE9BQUlBLEdBQUUsVUFBUUEsS0FBRUEsR0FBRSxFQUFFLE9BQU9BLEdBQUUsQ0FBQztBQUFBLE1BQUUsR0FBRSxJQUFFLFNBQVNELElBQUVDLElBQUU7QUFBQyxZQUFJQyxJQUFFQyxLQUFFLEVBQUU7QUFBUyxZQUFHQSxJQUFFO0FBQUMsbUJBQVFDLEtBQUUsR0FBRUEsTUFBRyxJQUFHQSxNQUFHLEVBQUUsS0FBR0osR0FBRSxRQUFRRyxHQUFFQyxJQUFFLEdBQUVILEVBQUMsQ0FBQyxJQUFFLElBQUc7QUFBQyxZQUFBQyxLQUFFRSxLQUFFO0FBQUc7QUFBQSxVQUFLO0FBQUEsUUFBQyxNQUFNLENBQUFGLEtBQUVGLFFBQUtDLEtBQUUsT0FBSztBQUFNLGVBQU9DO0FBQUEsTUFBQyxHQUFFLElBQUUsRUFBQyxHQUFFLENBQUMsR0FBRSxTQUFTRixJQUFFO0FBQUMsYUFBSyxZQUFVLEVBQUVBLElBQUUsS0FBRTtBQUFBLE1BQUMsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLFNBQVNBLElBQUU7QUFBQyxhQUFLLFlBQVUsRUFBRUEsSUFBRSxJQUFFO0FBQUEsTUFBQyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsU0FBU0EsSUFBRTtBQUFDLGFBQUssUUFBTSxLQUFHQSxLQUFFLEtBQUc7QUFBQSxNQUFDLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxTQUFTQSxJQUFFO0FBQUMsYUFBSyxlQUFhLE1BQUksQ0FBQ0E7QUFBQSxNQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxTQUFTQSxJQUFFO0FBQUMsYUFBSyxlQUFhLEtBQUcsQ0FBQ0E7QUFBQSxNQUFDLENBQUMsR0FBRSxLQUFJLENBQUMsU0FBUSxTQUFTQSxJQUFFO0FBQUMsYUFBSyxlQUFhLENBQUNBO0FBQUEsTUFBQyxDQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxTQUFTLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLFNBQVMsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUyxDQUFDLEdBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRSxTQUFTLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRSxPQUFPLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsR0FBRSxJQUFHLENBQUMsR0FBRSxTQUFTQSxJQUFFO0FBQUMsWUFBSUMsS0FBRSxFQUFFLFNBQVFDLEtBQUVGLEdBQUUsTUFBTSxLQUFLO0FBQUUsWUFBRyxLQUFLLE1BQUlFLEdBQUUsQ0FBQyxHQUFFRCxHQUFFLFVBQVFFLEtBQUUsR0FBRUEsTUFBRyxJQUFHQSxNQUFHLEVBQUUsQ0FBQUYsR0FBRUUsRUFBQyxFQUFFLFFBQVEsVUFBUyxFQUFFLE1BQUlILE9BQUksS0FBSyxNQUFJRztBQUFBLE1BQUUsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE9BQU8sQ0FBQyxHQUFFLElBQUcsQ0FBQyxHQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUUsS0FBSSxDQUFDLEdBQUUsU0FBU0gsSUFBRTtBQUFDLFlBQUlDLEtBQUUsRUFBRSxRQUFRLEdBQUVDLE1BQUcsRUFBRSxhQUFhLEtBQUdELEdBQUUsSUFBSyxTQUFTRCxJQUFFO0FBQUMsaUJBQU9BLEdBQUUsTUFBTSxHQUFFLENBQUM7QUFBQSxRQUFDLENBQUUsR0FBRyxRQUFRQSxFQUFDLElB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LFVBQVUsUUFBUSxPQUFPLGNBQWMsS0FBSztBQUFBLE1BQzdELENBQUM7QUFBQSxJQUNMO0FBQUEsSUFFQSxPQUFPLFNBQVUsaUJBQWlCO0FBQzlCLFVBQUksb0JBQW9CLE1BQU07QUFDMUI7QUFBQSxNQUNKO0FBQ0Esc0JBQWdCLGlCQUFhLGNBQUFBLFNBQU0sQ0FBQztBQUNwQyxzQkFBZ0IsZUFBVyxjQUFBQSxTQUFNLENBQUM7QUFBQSxJQUN0QztBQUFBLElBRUEsZUFBZSxTQUFVLGlCQUFnQkssUUFBTztBQUM1QyxVQUFJQSxXQUFVLE1BQU07QUFDaEIsYUFBSyxNQUFNLGVBQWU7QUFDMUI7QUFBQSxNQUNKO0FBRUEsWUFBTSxRQUFRQSxPQUFNLE1BQU0sU0FBUztBQUNuQyxVQUFJLE1BQU0sV0FBVyxLQUFLLG9CQUFvQixNQUFNO0FBQ2hELHdCQUFnQixpQkFBYSxjQUFBTCxTQUFNLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUMzRCx3QkFBZ0IsZUFBVyxjQUFBQSxTQUFNLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUFBLE1BQzdELE9BQU87QUFDSCxhQUFLLE1BQU0sZUFBZTtBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFsidCIsICJlIiwgIm4iLCAiciIsICJpIiwgInMiLCAidSIsICJhIiwgIk0iLCAibSIsICJmIiwgImwiLCAiJCIsICJ5IiwgInYiLCAiZyIsICJEIiwgIm8iLCAiZCIsICJjIiwgImgiLCAiZSIsICJ0IiwgIm4iLCAiciIsICJpIiwgIm8iLCAiYSIsICJmIiwgImgiLCAidSIsICJkIiwgImwiLCAicyIsICJjIiwgIm0iLCAiTSIsICJ0IiwgIm8iLCAibiIsICJyIiwgImkiLCAiZSIsICJuIiwgImUiLCAidCIsICJyIiwgInUiLCAiaSIsICJhIiwgInMiLCAiaSIsICJuIiwgImYiLCAiZSIsICJ0IiwgImkiLCAiZCIsICJuIiwgImUiLCAicyIsICJ0IiwgImkiLCAiZSIsICJzIiwgImYiLCAibiIsICJ1IiwgIm8iLCAiciIsICJ0IiwgIm4iLCAiaSIsICJvIiwgInIiLCAiZSIsICJ1IiwgImYiLCAicyIsICJhIiwgImUiLCAidCIsICJkYXlqcyIsICJjdXN0b21QYXJzZUZvcm1hdCIsICJsb2NhbGl6ZWRGb3JtYXQiLCAibG9jYWxlRGF0YSIsICJ3ZWVrT2ZZZWFyIiwgImlzb1dlZWsiLCAiZXZlbnQiLCAibGkiLCAidGl0bGUiLCAicm93IiwgImNvbCIsICJjYWwiLCAiZGF5T2ZXZWVrIiwgImltcG9ydF9kYXlqcyIsICJpbXBvcnRfY3VzdG9tUGFyc2VGb3JtYXQiLCAiZGF5anMiLCAidXRjIiwgInRpbWV6b25lIiwgImN1c3RvbVBhcnNlRm9ybWF0IiwgImlzU2FtZSIsICJzdGF0ZSJdCn0K

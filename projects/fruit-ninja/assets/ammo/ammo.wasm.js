// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

var Ammo = (function() {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    return (
        function(Ammo) {
            Ammo = Ammo || {};

            var b;
            var g;
            g || (g = typeof Ammo !== 'undefined' ? Ammo : {});
            var aa = {},
                ca;
            for (ca in g) g.hasOwnProperty(ca) && (aa[ca] = g[ca]);
            var da = !1,
                ea = !1,
                fa = !1,
                ha = !1,
                ia = !1;
            da = "object" === typeof window;
            ea = "function" === typeof importScripts;
            fa = (ha = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node) && !da && !ea;
            ia = !da && !fa && !ea;
            var ja = "",
                ka, la, ma, na;
            if (fa) ja = __dirname + "/", ka = function(a, c) {
                ma || (ma = require("fs"));
                na || (na = require("path"));
                a = na.normalize(a);
                return ma.readFileSync(a, c ? null : "utf8")
            }, la = function(a) {
                a = ka(a, !0);
                a.buffer || (a = new Uint8Array(a));
                assert(a.buffer);
                return a
            }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function(a) {
                throw a;
            }), process.on("unhandledRejection", oa), g.inspect = function() {
                return "[Emscripten Module object]"
            };
            else if (ia) "undefined" != typeof read && (ka = function(a) {
                    return read(a)
                }),
                la = function(a) {
                    if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
                    a = read(a, "binary");
                    assert("object" === typeof a);
                    return a
                }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
            else if (da || ea) ea ? ja = self.location.href : document.currentScript && (ja = document.currentScript.src), _scriptDir && (ja = _scriptDir), ja = 0 !== ja.indexOf("blob:") ? ja.substr(0, ja.lastIndexOf("/") + 1) : "", ka = function(a) {
                var c =
                    new XMLHttpRequest;
                c.open("GET", a, !1);
                c.send(null);
                return c.responseText
            }, ea && (la = function(a) {
                var c = new XMLHttpRequest;
                c.open("GET", a, !1);
                c.responseType = "arraybuffer";
                c.send(null);
                return new Uint8Array(c.response)
            });
            var pa = g.print || console.log.bind(console),
                qa = g.printErr || console.warn.bind(console);
            for (ca in aa) aa.hasOwnProperty(ca) && (g[ca] = aa[ca]);
            aa = null;
            var ra = {
                    "f64-rem": function(a, c) {
                        return a % c
                    },
                    "debugger": function() {}
                },
                sa;
            g.wasmBinary && (sa = g.wasmBinary);
            "object" !== typeof WebAssembly && qa("no native wasm support detected");
            var ta, ua = new WebAssembly.Table({
                    initial: 1832,
                    maximum: 1832,
                    element: "anyfunc"
                }),
                wa = !1;

            function assert(a, c) {
                a || oa("Assertion failed: " + c)
            }
            var xa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

            function ya(a, c, d) {
                var e = c + d;
                for (d = c; a[d] && !(d >= e);) ++d;
                if (16 < d - c && a.subarray && xa) return xa.decode(a.subarray(c, d));
                for (e = ""; c < d;) {
                    var f = a[c++];
                    if (f & 128) {
                        var n = a[c++] & 63;
                        if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | n);
                        else {
                            var r = a[c++] & 63;
                            f = 224 == (f & 240) ? (f & 15) << 12 | n << 6 | r : (f & 7) << 18 | n << 12 | r << 6 | a[c++] & 63;
                            65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                        }
                    } else e += String.fromCharCode(f)
                }
                return e
            }

            function za(a, c) {
                return a ? ya(Aa, a, c) : ""
            }

            function Ba(a, c, d, e) {
                if (!(0 < e)) return 0;
                var f = d;
                e = d + e - 1;
                for (var n = 0; n < a.length; ++n) {
                    var r = a.charCodeAt(n);
                    if (55296 <= r && 57343 >= r) {
                        var N = a.charCodeAt(++n);
                        r = 65536 + ((r & 1023) << 10) | N & 1023
                    }
                    if (127 >= r) {
                        if (d >= e) break;
                        c[d++] = r
                    } else {
                        if (2047 >= r) {
                            if (d + 1 >= e) break;
                            c[d++] = 192 | r >> 6
                        } else {
                            if (65535 >= r) {
                                if (d + 2 >= e) break;
                                c[d++] = 224 | r >> 12
                            } else {
                                if (d + 3 >= e) break;
                                c[d++] = 240 | r >> 18;
                                c[d++] = 128 | r >> 12 & 63
                            }
                            c[d++] = 128 | r >> 6 & 63
                        }
                        c[d++] = 128 | r & 63
                    }
                }
                c[d] = 0;
                return d - f
            }

            function Ca(a) {
                for (var c = 0, d = 0; d < a.length; ++d) {
                    var e = a.charCodeAt(d);
                    55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
                    127 >= e ? ++c : c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4
                }
                return c
            }
            "undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");

            function Da(a) {
                0 < a % 65536 && (a += 65536 - a % 65536);
                return a
            }
            var buffer, Ea, Aa, h, Fa, Ga;

            function Ha(a) {
                buffer = a;
                g.HEAP8 = Ea = new Int8Array(a);
                g.HEAP16 = new Int16Array(a);
                g.HEAP32 = h = new Int32Array(a);
                g.HEAPU8 = Aa = new Uint8Array(a);
                g.HEAPU16 = new Uint16Array(a);
                g.HEAPU32 = new Uint32Array(a);
                g.HEAPF32 = Fa = new Float32Array(a);
                g.HEAPF64 = Ga = new Float64Array(a)
            }
            var Ja = g.TOTAL_MEMORY || 67108864;
            if (ta = g.wasmMemory ? g.wasmMemory : new WebAssembly.Memory({
                    initial: Ja / 65536
                })) buffer = ta.buffer;
            Ja = buffer.byteLength;
            Ha(buffer);
            h[11868] = 5290544;

            function Ka(a) {
                for (; 0 < a.length;) {
                    var c = a.shift();
                    if ("function" == typeof c) c();
                    else {
                        var d = c.it;
                        "number" === typeof d ? void 0 === c.$s ? g.dynCall_v(d) : g.dynCall_vi(d, c.$s) : d(void 0 === c.$s ? null : c.$s)
                    }
                }
            }
            var La = [],
                Ma = [],
                Na = [],
                Oa = [],
                Pa = !1;

            function Qa() {
                var a = g.preRun.shift();
                La.unshift(a)
            }
            var Ra = Math.cos,
                Sa = Math.sin,
                Ta = 0,
                Ua = null,
                Va = null;
            g.preloadedImages = {};
            g.preloadedAudios = {};

            function oa(a) {
                if (g.onAbort) g.onAbort(a);
                a += "";
                pa(a);
                qa(a);
                wa = !0;
                throw new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
            }

            function Wa() {
                var a = Xa;
                return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,")
            }
            var Xa = "ammo.wasm.wasm";
            if (!Wa()) {
                var Ya = Xa;
                Xa = g.locateFile ? g.locateFile(Ya, ja) : ja + Ya
            }

            function Za() {
                try {
                    if (sa) return new Uint8Array(sa);
                    if (la) return la(Xa);
                    throw "both async and sync fetching of the wasm failed";
                } catch (a) {
                    oa(a)
                }
            }

            function $a() {
                return sa || !da && !ea || "function" !== typeof fetch ? new Promise(function(a) {
                    a(Za())
                }) : fetch(Xa, {
                    credentials: "same-origin"
                }).then(function(a) {
                    if (!a.ok) throw "failed to load wasm binary file at '" + Xa + "'";
                    return a.arrayBuffer()
                }).catch(function() {
                    return Za()
                })
            }
            g.asm = function() {
                function a(a) {
                    g.asm = a.exports;
                    Ta--;
                    g.monitorRunDependencies && g.monitorRunDependencies(Ta);
                    0 == Ta && (null !== Ua && (clearInterval(Ua), Ua = null), Va && (a = Va, Va = null, a()))
                }

                function c(c) {
                    a(c.instance)
                }

                function d(a) {
                    return $a().then(function(a) {
                        return WebAssembly.instantiate(a, e)
                    }).then(a, function(a) {
                        qa("failed to asynchronously prepare wasm: " + a);
                        oa(a)
                    })
                }
                var e = {
                    env: ab,
                    wasi_unstable: ab,
                    global: {
                        NaN: NaN,
                        Infinity: Infinity
                    },
                    "global.Math": Math,
                    asm2wasm: ra
                };
                Ta++;
                g.monitorRunDependencies && g.monitorRunDependencies(Ta);
                if (g.instantiateWasm) try {
                    return g.instantiateWasm(e, a)
                } catch (f) {
                    return qa("Module.instantiateWasm callback failed with error: " + f), !1
                }(function() {
                    if (sa || "function" !== typeof WebAssembly.instantiateStreaming || Wa() || "function" !== typeof fetch) return d(c);
                    fetch(Xa, {
                        credentials: "same-origin"
                    }).then(function(a) {
                        return WebAssembly.instantiateStreaming(a, e).then(c, function(a) {
                            qa("wasm streaming compile failed: " + a);
                            qa("falling back to ArrayBuffer instantiation");
                            d(c)
                        })
                    })
                })();
                return {}
            };
            var bb = [function(a, c, d, e, f, n, r, N) {
                a = g.getCache(g.ConcreteContactResultCallback)[a];
                if (!a.hasOwnProperty("addSingleResult")) throw "a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
                return a.addSingleResult(c, d, e, f, n, r, N)
            }, function(a, c, d, e) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("drawLine")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
                a.drawLine(c, d, e)
            }, function(a, c, d, e, f, n) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("drawContactPoint")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
                a.drawContactPoint(c, d, e, f, n)
            }, function(a, c) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("reportErrorWarning")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
                a.reportErrorWarning(c)
            }, function(a, c, d) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("draw3dText")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
                a.draw3dText(c, d)
            }, function(a, c) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("setDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
                a.setDebugMode(c)
            }, function(a) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("getDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
                return a.getDebugMode()
            }];
            Ma.push({
                it: function() {
                    cb()
                }
            });

            function db(a) {
                g.___errno_location && (h[g.___errno_location() >> 2] = a)
            }
            var eb = [null, [],
                    []
                ],
                fb = 0;

            function gb() {
                fb += 4;
                return h[fb - 4 >> 2]
            }
            var hb = {};

            function ib() {
                return 0
            }

            function jb(a, c, d, e) {
                try {
                    var f = hb.Zv(a),
                        n = hb.Xv(f, c, d);
                    h[e >> 2] = n;
                    return 0
                } catch (r) {
                    return oa(r), r.gt
                }
            }

            function kb() {
                return 0
            }

            function lb(a, c, d, e) {
                try {
                    for (var f = 0, n = 0; n < d; n++) {
                        for (var r = h[c + 8 * n >> 2], N = h[c + (8 * n + 4) >> 2], ba = 0; ba < N; ba++) {
                            var Ia = Aa[r + ba],
                                va = eb[a];
                            0 === Ia || 10 === Ia ? ((1 === a ? pa : qa)(ya(va, 0)), va.length = 0) : va.push(Ia)
                        }
                        f += N
                    }
                    h[e >> 2] = f;
                    return 0
                } catch (Jb) {
                    return oa(Jb), Jb.gt
                }
            }

            function mb() {
                oa()
            }

            function nb() {
                return Ea.length
            }
            var ob = {};

            function pb(a) {
                if (0 === a) return 0;
                a = za(a);
                if (!ob.hasOwnProperty(a)) return 0;
                pb.dt && qb(pb.dt);
                a = ob[a];
                var c = Ca(a) + 1,
                    d = rb(c);
                d && Ba(a, Ea, d, c);
                pb.dt = d;
                return pb.dt
            }

            function sb() {
                sb.Ls || (sb.Ls = []);
                sb.Ls.push(tb());
                return sb.Ls.length - 1
            }

            function ub(a) {
                return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
            }

            function vb(a, c) {
                for (var d = 0, e = 0; e <= c; d += a[e++]);
                return d
            }
            var wb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                xb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function yb(a, c) {
                for (a = new Date(a.getTime()); 0 < c;) {
                    var d = a.getMonth(),
                        e = (ub(a.getFullYear()) ? wb : xb)[d];
                    if (c > e - a.getDate()) c -= e - a.getDate() + 1, a.setDate(1), 11 > d ? a.setMonth(d + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
                    else {
                        a.setDate(a.getDate() + c);
                        break
                    }
                }
                return a
            }

            function zb(a, c, d, e) {
                function f(a, c, d) {
                    for (a = "number" === typeof a ? a.toString() : a || ""; a.length < c;) a = d[0] + a;
                    return a
                }

                function n(a, c) {
                    return f(a, c, "0")
                }

                function r(a, c) {
                    function d(a) {
                        return 0 > a ? -1 : 0 < a ? 1 : 0
                    }
                    var e;
                    0 === (e = d(a.getFullYear() - c.getFullYear())) && 0 === (e = d(a.getMonth() - c.getMonth())) && (e = d(a.getDate() - c.getDate()));
                    return e
                }

                function N(a) {
                    switch (a.getDay()) {
                        case 0:
                            return new Date(a.getFullYear() - 1, 11, 29);
                        case 1:
                            return a;
                        case 2:
                            return new Date(a.getFullYear(), 0, 3);
                        case 3:
                            return new Date(a.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(a.getFullYear(), 0, 1);
                        case 5:
                            return new Date(a.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(a.getFullYear() - 1, 11, 30)
                    }
                }

                function ba(a) {
                    a = yb(new Date(a.Cs + 1900, 0, 1), a.Zs);
                    var c = N(new Date(a.getFullYear() + 1, 0, 4));
                    return 0 >= r(N(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= r(c, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
                }
                var Ia = h[e + 40 >> 2];
                e = {
                    Sv: h[e >> 2],
                    Rv: h[e + 4 >> 2],
                    Xs: h[e + 8 >> 2],
                    Us: h[e + 12 >> 2],
                    Ks: h[e + 16 >> 2],
                    Cs: h[e + 20 >> 2],
                    Ys: h[e + 24 >> 2],
                    Zs: h[e + 28 >> 2],
                    cw: h[e + 32 >> 2],
                    Qv: h[e + 36 >> 2],
                    Tv: Ia ? za(Ia) : ""
                };
                d = za(d);
                Ia = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var va in Ia) d = d.replace(new RegExp(va, "g"), Ia[va]);
                var Jb = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    Ec = "January February March April May June July August September October November December".split(" ");
                Ia = {
                    "%a": function(a) {
                        return Jb[a.Ys].substring(0, 3)
                    },
                    "%A": function(a) {
                        return Jb[a.Ys]
                    },
                    "%b": function(a) {
                        return Ec[a.Ks].substring(0, 3)
                    },
                    "%B": function(a) {
                        return Ec[a.Ks]
                    },
                    "%C": function(a) {
                        return n((a.Cs + 1900) / 100 | 0, 2)
                    },
                    "%d": function(a) {
                        return n(a.Us, 2)
                    },
                    "%e": function(a) {
                        return f(a.Us, 2, " ")
                    },
                    "%g": function(a) {
                        return ba(a).toString().substring(2)
                    },
                    "%G": function(a) {
                        return ba(a)
                    },
                    "%H": function(a) {
                        return n(a.Xs,
                            2)
                    },
                    "%I": function(a) {
                        a = a.Xs;
                        0 == a ? a = 12 : 12 < a && (a -= 12);
                        return n(a, 2)
                    },
                    "%j": function(a) {
                        return n(a.Us + vb(ub(a.Cs + 1900) ? wb : xb, a.Ks - 1), 3)
                    },
                    "%m": function(a) {
                        return n(a.Ks + 1, 2)
                    },
                    "%M": function(a) {
                        return n(a.Rv, 2)
                    },
                    "%n": function() {
                        return "\n"
                    },
                    "%p": function(a) {
                        return 0 <= a.Xs && 12 > a.Xs ? "AM" : "PM"
                    },
                    "%S": function(a) {
                        return n(a.Sv, 2)
                    },
                    "%t": function() {
                        return "\t"
                    },
                    "%u": function(a) {
                        return a.Ys || 7
                    },
                    "%U": function(a) {
                        var c = new Date(a.Cs + 1900, 0, 1),
                            d = 0 === c.getDay() ? c : yb(c, 7 - c.getDay());
                        a = new Date(a.Cs + 1900, a.Ks, a.Us);
                        return 0 >
                            r(d, a) ? n(Math.ceil((31 - d.getDate() + (vb(ub(a.getFullYear()) ? wb : xb, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === r(d, c) ? "01" : "00"
                    },
                    "%V": function(a) {
                        var c = N(new Date(a.Cs + 1900, 0, 4)),
                            d = N(new Date(a.Cs + 1901, 0, 4)),
                            e = yb(new Date(a.Cs + 1900, 0, 1), a.Zs);
                        return 0 > r(e, c) ? "53" : 0 >= r(d, e) ? "01" : n(Math.ceil((c.getFullYear() < a.Cs + 1900 ? a.Zs + 32 - c.getDate() : a.Zs + 1 - c.getDate()) / 7), 2)
                    },
                    "%w": function(a) {
                        return a.Ys
                    },
                    "%W": function(a) {
                        var c = new Date(a.Cs, 0, 1),
                            d = 1 === c.getDay() ? c : yb(c, 0 === c.getDay() ? 1 : 7 - c.getDay() + 1);
                        a = new Date(a.Cs +
                            1900, a.Ks, a.Us);
                        return 0 > r(d, a) ? n(Math.ceil((31 - d.getDate() + (vb(ub(a.getFullYear()) ? wb : xb, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === r(d, c) ? "01" : "00"
                    },
                    "%y": function(a) {
                        return (a.Cs + 1900).toString().substring(2)
                    },
                    "%Y": function(a) {
                        return a.Cs + 1900
                    },
                    "%z": function(a) {
                        a = a.Qv;
                        var c = 0 <= a;
                        a = Math.abs(a) / 60;
                        return (c ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
                    },
                    "%Z": function(a) {
                        return a.Tv
                    },
                    "%%": function() {
                        return "%"
                    }
                };
                for (va in Ia) 0 <= d.indexOf(va) && (d = d.replace(new RegExp(va, "g"), Ia[va](e)));
                va = Ab(d, !1);
                if (va.length > c) return 0;
                Ea.set(va, a);
                return va.length - 1
            }
            mb = fa ? function() {
                var a = process.hrtime();
                return 1E3 * a[0] + a[1] / 1E6
            } : "undefined" !== typeof dateNow ? dateNow : "object" === typeof performance && performance && "function" === typeof performance.now ? function() {
                return performance.now()
            } : Date.now;

            function Ab(a, c) {
                var d = Array(Ca(a) + 1);
                a = Ba(a, d, 0, d.length);
                c && (d.length = a);
                return d
            }
            var ab = {
                    f: function(a) {
                        return rb(a)
                    },
                    d: function(a) {
                        "uncaught_exception" in Bb ? Bb.Uv++ : Bb.Uv = 1;
                        throw a;
                    },
                    m: function() {},
                    t: function() {
                        db(63);
                        return -1
                    },
                    s: function(a, c) {
                        fb = c;
                        try {
                            var d = gb();
                            var e = gb();
                            if (-1 === d || 0 === e) var f = -28;
                            else {
                                var n = hb.Bu[d];
                                if (n && e === n.$v) {
                                    var r = (void 0).Yv(n.fd);
                                    hb.Wv(d, r, e, n.flags);
                                    (void 0).bw(r);
                                    hb.Bu[d] = null;
                                    n.Vv && qb(n.aw)
                                }
                                f = 0
                            }
                            return f
                        } catch (N) {
                            return oa(N), -N.gt
                        }
                    },
                    l: function() {},
                    r: function() {
                        return ib.apply(null, arguments)
                    },
                    q: function() {
                        return jb.apply(null, arguments)
                    },
                    u: function() {
                        return kb.apply(null,
                            arguments)
                    },
                    p: function() {
                        return lb.apply(null, arguments)
                    },
                    __memory_base: 1024,
                    __table_base: 0,
                    a: function() {
                        oa()
                    },
                    e: function(a, c) {
                        if (0 === a) a = Date.now();
                        else if (1 === a && (fa || "undefined" !== typeof dateNow || "object" === typeof performance && performance && "function" === typeof performance.now)) a = mb();
                        else return db(28), -1;
                        h[c >> 2] = a / 1E3 | 0;
                        h[c + 4 >> 2] = a % 1E3 * 1E6 | 0;
                        return 0
                    },
                    D: function(a, c, d, e, f, n, r, N, ba) {
                        return bb[a](c, d, e, f, n, r, N, ba)
                    },
                    C: function(a, c) {
                        return bb[a](c)
                    },
                    o: function(a, c, d) {
                        return bb[a](c, d)
                    },
                    B: function(a,
                        c, d, e) {
                        return bb[a](c, d, e)
                    },
                    A: function(a, c, d, e, f, n, r) {
                        return bb[a](c, d, e, f, n, r)
                    },
                    z: function(a, c, d, e, f) {
                        return bb[a](c, d, e, f)
                    },
                    j: nb,
                    y: function(a, c, d) {
                        Aa.set(Aa.subarray(c, c + d), a)
                    },
                    i: function(a) {
                        if (2147418112 < a) return !1;
                        for (var c = Math.max(nb(), 16777216); c < a;) c = 536870912 >= c ? Da(2 * c) : Math.min(Da((3 * c + 2147483648) / 4), 2147418112);
                        a: {
                            try {
                                ta.grow(c - buffer.byteLength + 65535 >> 16);
                                Ha(ta.buffer);
                                var d = 1;
                                break a
                            } catch (e) {}
                            d = void 0
                        }
                        return d ? !0 : !1
                    },
                    k: pb,
                    c: function(a) {
                        var c = Date.now();
                        h[a >> 2] = c / 1E3 | 0;
                        h[a + 4 >> 2] = c % 1E3 *
                            1E3 | 0;
                        return 0
                    },
                    x: Ra,
                    w: Sa,
                    h: function(a) {
                        var c = sb.Ls[a];
                        sb.Ls.splice(a, 1);
                        Cb(c)
                    },
                    g: sb,
                    n: function() {
                        oa("trap!")
                    },
                    v: function(a, c, d, e) {
                        return zb(a, c, d, e)
                    },
                    b: oa,
                    memory: ta,
                    table: ua
                },
                Db = g.asm({}, ab, buffer);
            g.asm = Db;
            var Bb = g.__ZSt18uncaught_exceptionv = function() {
                    return g.asm.E.apply(null, arguments)
                },
                Eb = g._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function() {
                    return g.asm.F.apply(null, arguments)
                },
                Fb = g._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function() {
                    return g.asm.G.apply(null, arguments)
                },
                Gb = g._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.H.apply(null, arguments)
                },
                Hb = g._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 =
                function() {
                    return g.asm.I.apply(null, arguments)
                },
                Ib = g._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.J.apply(null, arguments)
                },
                Kb = g._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function() {
                    return g.asm.K.apply(null, arguments)
                },
                Lb = g._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function() {
                    return g.asm.L.apply(null, arguments)
                },
                Mb = g._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function() {
                    return g.asm.M.apply(null,
                        arguments)
                },
                Nb = g._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function() {
                    return g.asm.N.apply(null, arguments)
                },
                Ob = g._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function() {
                    return g.asm.O.apply(null, arguments)
                },
                Pb = g._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function() {
                    return g.asm.P.apply(null, arguments)
                },
                Qb = g._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function() {
                    return g.asm.Q.apply(null, arguments)
                },
                Rb = g._emscripten_bind_AllHitsRayResultCallback_hasHit_0 =
                function() {
                    return g.asm.R.apply(null, arguments)
                },
                Sb = g._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.S.apply(null, arguments)
                },
                Tb = g._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.T.apply(null, arguments)
                },
                Ub = g._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.U.apply(null, arguments)
                },
                Vb = g._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function() {
                    return g.asm.V.apply(null,
                        arguments)
                },
                Wb = g._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function() {
                    return g.asm.W.apply(null, arguments)
                },
                Xb = g._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function() {
                    return g.asm.X.apply(null, arguments)
                },
                Yb = g._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function() {
                    return g.asm.Y.apply(null, arguments)
                },
                Zb = g._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function() {
                    return g.asm.Z.apply(null, arguments)
                },
                $b = g._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 =
                function() {
                    return g.asm._.apply(null, arguments)
                },
                ac = g._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function() {
                    return g.asm.$.apply(null, arguments)
                },
                bc = g._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = function() {
                    return g.asm.aa.apply(null, arguments)
                },
                cc = g._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function() {
                    return g.asm.ba.apply(null, arguments)
                },
                dc = g._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.ca.apply(null,
                        arguments)
                },
                ec = g._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.da.apply(null, arguments)
                },
                fc = g._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.ea.apply(null, arguments)
                },
                hc = g._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function() {
                    return g.asm.fa.apply(null, arguments)
                },
                ic = g._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function() {
                    return g.asm.ga.apply(null,
                        arguments)
                },
                jc = g._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function() {
                    return g.asm.ha.apply(null, arguments)
                },
                kc = g._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function() {
                    return g.asm.ia.apply(null, arguments)
                },
                lc = g._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function() {
                    return g.asm.ja.apply(null, arguments)
                },
                mc = g._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.ka.apply(null, arguments)
                },
                nc = g._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 =
                function() {
                    return g.asm.la.apply(null, arguments)
                },
                oc = g._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.ma.apply(null, arguments)
                },
                pc = g._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function() {
                    return g.asm.na.apply(null, arguments)
                },
                qc = g._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function() {
                    return g.asm.oa.apply(null, arguments)
                },
                rc = g._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function() {
                    return g.asm.pa.apply(null,
                        arguments)
                },
                sc = g._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function() {
                    return g.asm.qa.apply(null, arguments)
                },
                tc = g._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function() {
                    return g.asm.ra.apply(null, arguments)
                },
                uc = g._emscripten_bind_ClosestRayResultCallback___destroy___0 = function() {
                    return g.asm.sa.apply(null, arguments)
                },
                vc = g._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.ta.apply(null, arguments)
                },
                wc = g._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 =
                function() {
                    return g.asm.ua.apply(null, arguments)
                },
                xc = g._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.va.apply(null, arguments)
                },
                yc = g._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function() {
                    return g.asm.wa.apply(null, arguments)
                },
                zc = g._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function() {
                    return g.asm.xa.apply(null, arguments)
                },
                Ac = g._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function() {
                    return g.asm.ya.apply(null,
                        arguments)
                },
                Bc = g._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function() {
                    return g.asm.za.apply(null, arguments)
                },
                Cc = g._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function() {
                    return g.asm.Aa.apply(null, arguments)
                },
                Dc = g._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function() {
                    return g.asm.Ba.apply(null, arguments)
                },
                Fc = g._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.Ca.apply(null, arguments)
                },
                Gc = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 =
                function() {
                    return g.asm.Da.apply(null, arguments)
                },
                Hc = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.Ea.apply(null, arguments)
                },
                Ic = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function() {
                    return g.asm.Fa.apply(null, arguments)
                },
                Jc = g._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function() {
                    return g.asm.Ga.apply(null, arguments)
                },
                Kc = g._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function() {
                    return g.asm.Ha.apply(null,
                        arguments)
                },
                Lc = g._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function() {
                    return g.asm.Ia.apply(null, arguments)
                },
                Mc = g._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function() {
                    return g.asm.Ja.apply(null, arguments)
                },
                Nc = g._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function() {
                    return g.asm.Ka.apply(null, arguments)
                },
                Oc = g._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function() {
                    return g.asm.La.apply(null, arguments)
                },
                Pc = g._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 =
                function() {
                    return g.asm.Ma.apply(null, arguments)
                },
                Qc = g._emscripten_bind_ContactResultCallback___destroy___0 = function() {
                    return g.asm.Na.apply(null, arguments)
                },
                Rc = g._emscripten_bind_ContactResultCallback_addSingleResult_7 = function() {
                    return g.asm.Oa.apply(null, arguments)
                },
                Sc = g._emscripten_bind_ConvexHull_ConvexHull_0 = function() {
                    return g.asm.Pa.apply(null, arguments)
                },
                Tc = g._emscripten_bind_ConvexHull___destroy___0 = function() {
                    return g.asm.Qa.apply(null, arguments)
                },
                Uc = g._emscripten_bind_ConvexHull_get_m_nPoints_0 =
                function() {
                    return g.asm.Ra.apply(null, arguments)
                },
                Vc = g._emscripten_bind_ConvexHull_get_m_nTriangles_0 = function() {
                    return g.asm.Sa.apply(null, arguments)
                },
                Wc = g._emscripten_bind_ConvexHull_get_m_points_1 = function() {
                    return g.asm.Ta.apply(null, arguments)
                },
                Xc = g._emscripten_bind_ConvexHull_get_m_triangles_1 = function() {
                    return g.asm.Ua.apply(null, arguments)
                },
                Yc = g._emscripten_bind_ConvexResultCallback___destroy___0 = function() {
                    return g.asm.Va.apply(null, arguments)
                },
                Zc = g._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 =
                function() {
                    return g.asm.Wa.apply(null, arguments)
                },
                $c = g._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.Xa.apply(null, arguments)
                },
                ad = g._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.Ya.apply(null, arguments)
                },
                bd = g._emscripten_bind_ConvexResultCallback_hasHit_0 = function() {
                    return g.asm.Za.apply(null, arguments)
                },
                cd = g._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm._a.apply(null,
                        arguments)
                },
                dd = g._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.$a.apply(null, arguments)
                },
                ed = g._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.ab.apply(null, arguments)
                },
                fd = g._emscripten_bind_DebugDrawer_DebugDrawer_0 = function() {
                    return g.asm.bb.apply(null, arguments)
                },
                gd = g._emscripten_bind_DebugDrawer___destroy___0 = function() {
                    return g.asm.cb.apply(null, arguments)
                },
                hd = g._emscripten_bind_DebugDrawer_draw3dText_2 = function() {
                    return g.asm.db.apply(null,
                        arguments)
                },
                id = g._emscripten_bind_DebugDrawer_drawContactPoint_5 = function() {
                    return g.asm.eb.apply(null, arguments)
                },
                jd = g._emscripten_bind_DebugDrawer_drawLine_3 = function() {
                    return g.asm.fb.apply(null, arguments)
                },
                kd = g._emscripten_bind_DebugDrawer_getDebugMode_0 = function() {
                    return g.asm.gb.apply(null, arguments)
                },
                ld = g._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function() {
                    return g.asm.hb.apply(null, arguments)
                },
                md = g._emscripten_bind_DebugDrawer_setDebugMode_1 = function() {
                    return g.asm.ib.apply(null,
                        arguments)
                },
                nd = g._emscripten_bind_HACD_Compute_0 = function() {
                    return g.asm.jb.apply(null, arguments)
                },
                od = g._emscripten_bind_HACD_GetCH_3 = function() {
                    return g.asm.kb.apply(null, arguments)
                },
                pd = g._emscripten_bind_HACD_GetNClusters_0 = function() {
                    return g.asm.lb.apply(null, arguments)
                },
                qd = g._emscripten_bind_HACD_GetNPointsCH_1 = function() {
                    return g.asm.mb.apply(null, arguments)
                },
                rd = g._emscripten_bind_HACD_GetNTrianglesCH_1 = function() {
                    return g.asm.nb.apply(null, arguments)
                },
                sd = g._emscripten_bind_HACD_HACD_0 = function() {
                    return g.asm.ob.apply(null,
                        arguments)
                },
                td = g._emscripten_bind_HACD_SetCompacityWeight_1 = function() {
                    return g.asm.pb.apply(null, arguments)
                },
                ud = g._emscripten_bind_HACD_SetConcavity_1 = function() {
                    return g.asm.qb.apply(null, arguments)
                },
                vd = g._emscripten_bind_HACD_SetNClusters_1 = function() {
                    return g.asm.rb.apply(null, arguments)
                },
                wd = g._emscripten_bind_HACD_SetNPoints_1 = function() {
                    return g.asm.sb.apply(null, arguments)
                },
                xd = g._emscripten_bind_HACD_SetNTriangles_1 = function() {
                    return g.asm.tb.apply(null, arguments)
                },
                yd = g._emscripten_bind_HACD_SetNVerticesPerCH_1 =
                function() {
                    return g.asm.ub.apply(null, arguments)
                },
                zd = g._emscripten_bind_HACD_SetPoints_1 = function() {
                    return g.asm.vb.apply(null, arguments)
                },
                Ad = g._emscripten_bind_HACD_SetTriangles_1 = function() {
                    return g.asm.wb.apply(null, arguments)
                },
                Bd = g._emscripten_bind_HACD_SetVolumeWeight_1 = function() {
                    return g.asm.xb.apply(null, arguments)
                },
                Cd = g._emscripten_bind_HACD___destroy___0 = function() {
                    return g.asm.yb.apply(null, arguments)
                },
                Dd = g._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function() {
                    return g.asm.zb.apply(null,
                        arguments)
                },
                Ed = g._emscripten_bind_LocalConvexResult___destroy___0 = function() {
                    return g.asm.Ab.apply(null, arguments)
                },
                Fd = g._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function() {
                    return g.asm.Bb.apply(null, arguments)
                },
                Gd = g._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function() {
                    return g.asm.Cb.apply(null, arguments)
                },
                Hd = g._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function() {
                    return g.asm.Db.apply(null, arguments)
                },
                Id = g._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 =
                function() {
                    return g.asm.Eb.apply(null, arguments)
                },
                Jd = g._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function() {
                    return g.asm.Fb.apply(null, arguments)
                },
                Kd = g._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function() {
                    return g.asm.Gb.apply(null, arguments)
                },
                Ld = g._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function() {
                    return g.asm.Hb.apply(null, arguments)
                },
                Md = g._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function() {
                    return g.asm.Ib.apply(null, arguments)
                },
                Nd = g._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function() {
                    return g.asm.Jb.apply(null, arguments)
                },
                Od = g._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function() {
                    return g.asm.Kb.apply(null, arguments)
                },
                Pd = g._emscripten_bind_LocalShapeInfo___destroy___0 = function() {
                    return g.asm.Lb.apply(null, arguments)
                },
                Qd = g._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function() {
                    return g.asm.Mb.apply(null, arguments)
                },
                Rd = g._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function() {
                    return g.asm.Nb.apply(null,
                        arguments)
                },
                Sd = g._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function() {
                    return g.asm.Ob.apply(null, arguments)
                },
                Td = g._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function() {
                    return g.asm.Pb.apply(null, arguments)
                },
                Ud = g._emscripten_bind_Parameters_Parameters_0 = function() {
                    return g.asm.Qb.apply(null, arguments)
                },
                Vd = g._emscripten_bind_Parameters___destroy___0 = function() {
                    return g.asm.Rb.apply(null, arguments)
                },
                Wd = g._emscripten_bind_Parameters_get_m_alpha_0 = function() {
                    return g.asm.Sb.apply(null,
                        arguments)
                },
                Xd = g._emscripten_bind_Parameters_get_m_beta_0 = function() {
                    return g.asm.Tb.apply(null, arguments)
                },
                Yd = g._emscripten_bind_Parameters_get_m_concavity_0 = function() {
                    return g.asm.Ub.apply(null, arguments)
                },
                Zd = g._emscripten_bind_Parameters_get_m_convexhullApproximation_0 = function() {
                    return g.asm.Vb.apply(null, arguments)
                },
                $d = g._emscripten_bind_Parameters_get_m_convexhullDownsampling_0 = function() {
                    return g.asm.Wb.apply(null, arguments)
                },
                ae = g._emscripten_bind_Parameters_get_m_depth_0 = function() {
                    return g.asm.Xb.apply(null,
                        arguments)
                },
                be = g._emscripten_bind_Parameters_get_m_gamma_0 = function() {
                    return g.asm.Yb.apply(null, arguments)
                },
                ce = g._emscripten_bind_Parameters_get_m_maxNumVerticesPerCH_0 = function() {
                    return g.asm.Zb.apply(null, arguments)
                },
                de = g._emscripten_bind_Parameters_get_m_minVolumePerCH_0 = function() {
                    return g.asm._b.apply(null, arguments)
                },
                ee = g._emscripten_bind_Parameters_get_m_mode_0 = function() {
                    return g.asm.$b.apply(null, arguments)
                },
                fe = g._emscripten_bind_Parameters_get_m_oclAcceleration_0 = function() {
                    return g.asm.ac.apply(null,
                        arguments)
                },
                ge = g._emscripten_bind_Parameters_get_m_pca_0 = function() {
                    return g.asm.bc.apply(null, arguments)
                },
                he = g._emscripten_bind_Parameters_get_m_planeDownsampling_0 = function() {
                    return g.asm.cc.apply(null, arguments)
                },
                ie = g._emscripten_bind_Parameters_get_m_resolution_0 = function() {
                    return g.asm.dc.apply(null, arguments)
                },
                je = g._emscripten_bind_Parameters_set_m_alpha_1 = function() {
                    return g.asm.ec.apply(null, arguments)
                },
                ke = g._emscripten_bind_Parameters_set_m_beta_1 = function() {
                    return g.asm.fc.apply(null, arguments)
                },
                le = g._emscripten_bind_Parameters_set_m_concavity_1 = function() {
                    return g.asm.gc.apply(null, arguments)
                },
                me = g._emscripten_bind_Parameters_set_m_convexhullApproximation_1 = function() {
                    return g.asm.hc.apply(null, arguments)
                },
                ne = g._emscripten_bind_Parameters_set_m_convexhullDownsampling_1 = function() {
                    return g.asm.ic.apply(null, arguments)
                },
                oe = g._emscripten_bind_Parameters_set_m_depth_1 = function() {
                    return g.asm.jc.apply(null, arguments)
                },
                pe = g._emscripten_bind_Parameters_set_m_gamma_1 = function() {
                    return g.asm.kc.apply(null,
                        arguments)
                },
                qe = g._emscripten_bind_Parameters_set_m_maxNumVerticesPerCH_1 = function() {
                    return g.asm.lc.apply(null, arguments)
                },
                re = g._emscripten_bind_Parameters_set_m_minVolumePerCH_1 = function() {
                    return g.asm.mc.apply(null, arguments)
                },
                se = g._emscripten_bind_Parameters_set_m_mode_1 = function() {
                    return g.asm.nc.apply(null, arguments)
                },
                te = g._emscripten_bind_Parameters_set_m_oclAcceleration_1 = function() {
                    return g.asm.oc.apply(null, arguments)
                },
                ue = g._emscripten_bind_Parameters_set_m_pca_1 = function() {
                    return g.asm.pc.apply(null,
                        arguments)
                },
                ve = g._emscripten_bind_Parameters_set_m_planeDownsampling_1 = function() {
                    return g.asm.qc.apply(null, arguments)
                },
                we = g._emscripten_bind_Parameters_set_m_resolution_1 = function() {
                    return g.asm.rc.apply(null, arguments)
                },
                xe = g._emscripten_bind_RayResultCallback___destroy___0 = function() {
                    return g.asm.sc.apply(null, arguments)
                },
                ye = g._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.tc.apply(null, arguments)
                },
                ze = g._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 =
                function() {
                    return g.asm.uc.apply(null, arguments)
                },
                Ae = g._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.vc.apply(null, arguments)
                },
                Be = g._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function() {
                    return g.asm.wc.apply(null, arguments)
                },
                Ce = g._emscripten_bind_RayResultCallback_hasHit_0 = function() {
                    return g.asm.xc.apply(null, arguments)
                },
                De = g._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.yc.apply(null, arguments)
                },
                Ee =
                g._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.zc.apply(null, arguments)
                },
                Fe = g._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.Ac.apply(null, arguments)
                },
                Ge = g._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function() {
                    return g.asm.Bc.apply(null, arguments)
                },
                He = g._emscripten_bind_VHACD_Cancel_0 = function() {
                    return g.asm.Cc.apply(null, arguments)
                },
                Ie = g._emscripten_bind_VHACD_Clean_0 = function() {
                    return g.asm.Dc.apply(null,
                        arguments)
                },
                Je = g._emscripten_bind_VHACD_Compute_7 = function() {
                    return g.asm.Ec.apply(null, arguments)
                },
                Ke = g._emscripten_bind_VHACD_GetConvexHull_2 = function() {
                    return g.asm.Fc.apply(null, arguments)
                },
                Le = g._emscripten_bind_VHACD_GetNConvexHulls_0 = function() {
                    return g.asm.Gc.apply(null, arguments)
                },
                Me = g._emscripten_bind_VHACD_Release_0 = function() {
                    return g.asm.Hc.apply(null, arguments)
                },
                Ne = g._emscripten_bind_VHACD_VHACD_0 = function() {
                    return g.asm.Ic.apply(null, arguments)
                },
                Oe = g._emscripten_bind_VHACD___destroy___0 =
                function() {
                    return g.asm.Jc.apply(null, arguments)
                },
                Pe = g._emscripten_bind_Vec3Long_Vec3Long_3 = function() {
                    return g.asm.Kc.apply(null, arguments)
                },
                Qe = g._emscripten_bind_Vec3Long_X_0 = function() {
                    return g.asm.Lc.apply(null, arguments)
                },
                Re = g._emscripten_bind_Vec3Long_Y_0 = function() {
                    return g.asm.Mc.apply(null, arguments)
                },
                Se = g._emscripten_bind_Vec3Long_Z_0 = function() {
                    return g.asm.Nc.apply(null, arguments)
                },
                Te = g._emscripten_bind_Vec3Long___destroy___0 = function() {
                    return g.asm.Oc.apply(null, arguments)
                },
                Ue = g._emscripten_bind_Vec3Real_Vec3Real_3 =
                function() {
                    return g.asm.Pc.apply(null, arguments)
                },
                Ve = g._emscripten_bind_Vec3Real_X_0 = function() {
                    return g.asm.Qc.apply(null, arguments)
                },
                We = g._emscripten_bind_Vec3Real_Y_0 = function() {
                    return g.asm.Rc.apply(null, arguments)
                },
                Xe = g._emscripten_bind_Vec3Real_Z_0 = function() {
                    return g.asm.Sc.apply(null, arguments)
                },
                Ye = g._emscripten_bind_Vec3Real___destroy___0 = function() {
                    return g.asm.Tc.apply(null, arguments)
                },
                Ze = g._emscripten_bind_VoidPtr___destroy___0 = function() {
                    return g.asm.Uc.apply(null, arguments)
                },
                $e = g._emscripten_bind_btActionInterface___destroy___0 =
                function() {
                    return g.asm.Vc.apply(null, arguments)
                },
                af = g._emscripten_bind_btActionInterface_updateAction_2 = function() {
                    return g.asm.Wc.apply(null, arguments)
                },
                bf = g._emscripten_bind_btAxisSweep3___destroy___0 = function() {
                    return g.asm.Xc.apply(null, arguments)
                },
                cf = g._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function() {
                    return g.asm.Yc.apply(null, arguments)
                },
                df = g._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function() {
                    return g.asm.Zc.apply(null, arguments)
                },
                ef = g._emscripten_bind_btAxisSweep3_btAxisSweep3_4 =
                function() {
                    return g.asm._c.apply(null, arguments)
                },
                ff = g._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function() {
                    return g.asm.$c.apply(null, arguments)
                },
                gf = g._emscripten_bind_btBoxShape___destroy___0 = function() {
                    return g.asm.ad.apply(null, arguments)
                },
                hf = g._emscripten_bind_btBoxShape_btBoxShape_1 = function() {
                    return g.asm.bd.apply(null, arguments)
                },
                jf = g._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function() {
                    return g.asm.cd.apply(null, arguments)
                },
                kf = g._emscripten_bind_btBoxShape_getLocalScaling_0 =
                function() {
                    return g.asm.dd.apply(null, arguments)
                },
                lf = g._emscripten_bind_btBoxShape_getMargin_0 = function() {
                    return g.asm.ed.apply(null, arguments)
                },
                mf = g._emscripten_bind_btBoxShape_setLocalScaling_1 = function() {
                    return g.asm.fd.apply(null, arguments)
                },
                nf = g._emscripten_bind_btBoxShape_setMargin_1 = function() {
                    return g.asm.gd.apply(null, arguments)
                },
                of = g._emscripten_bind_btBroadphaseInterface___destroy___0 = function() {
                    return g.asm.hd.apply(null, arguments)
                },
                pf = g._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 =
                function() {
                    return g.asm.id.apply(null, arguments)
                },
                qf = g._emscripten_bind_btBroadphaseProxy___destroy___0 = function() {
                    return g.asm.jd.apply(null, arguments)
                },
                rf = g._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.kd.apply(null, arguments)
                },
                sf = g._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function() {
                    return g.asm.ld.apply(null, arguments)
                },
                tf = g._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.md.apply(null, arguments)
                },
                uf = g._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function() {
                    return g.asm.nd.apply(null, arguments)
                },
                vf = g._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function() {
                    return g.asm.od.apply(null, arguments)
                },
                wf = g._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function() {
                    return g.asm.pd.apply(null, arguments)
                },
                xf = g._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function() {
                    return g.asm.qd.apply(null, arguments)
                },
                yf = g._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 =
                function() {
                    return g.asm.rd.apply(null, arguments)
                },
                zf = g._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.sd.apply(null, arguments)
                },
                Af = g._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.td.apply(null, arguments)
                },
                Bf = g._emscripten_bind_btCapsuleShapeX___destroy___0 = function() {
                    return g.asm.ud.apply(null, arguments)
                },
                Cf = g._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function() {
                    return g.asm.vd.apply(null, arguments)
                },
                Df = g._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 =
                function() {
                    return g.asm.wd.apply(null, arguments)
                },
                Ef = g._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function() {
                    return g.asm.xd.apply(null, arguments)
                },
                Ff = g._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function() {
                    return g.asm.yd.apply(null, arguments)
                },
                Gf = g._emscripten_bind_btCapsuleShapeX_getMargin_0 = function() {
                    return g.asm.zd.apply(null, arguments)
                },
                Hf = g._emscripten_bind_btCapsuleShapeX_getRadius_0 = function() {
                    return g.asm.Ad.apply(null, arguments)
                },
                If = g._emscripten_bind_btCapsuleShapeX_getUpAxis_0 =
                function() {
                    return g.asm.Bd.apply(null, arguments)
                },
                Jf = g._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function() {
                    return g.asm.Cd.apply(null, arguments)
                },
                Kf = g._emscripten_bind_btCapsuleShapeX_setMargin_1 = function() {
                    return g.asm.Dd.apply(null, arguments)
                },
                Lf = g._emscripten_bind_btCapsuleShapeZ___destroy___0 = function() {
                    return g.asm.Ed.apply(null, arguments)
                },
                Mf = g._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function() {
                    return g.asm.Fd.apply(null, arguments)
                },
                Nf = g._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 =
                function() {
                    return g.asm.Gd.apply(null, arguments)
                },
                Of = g._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function() {
                    return g.asm.Hd.apply(null, arguments)
                },
                Pf = g._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function() {
                    return g.asm.Id.apply(null, arguments)
                },
                Qf = g._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function() {
                    return g.asm.Jd.apply(null, arguments)
                },
                Rf = g._emscripten_bind_btCapsuleShapeZ_getRadius_0 = function() {
                    return g.asm.Kd.apply(null, arguments)
                },
                Sf = g._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 =
                function() {
                    return g.asm.Ld.apply(null, arguments)
                },
                Tf = g._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function() {
                    return g.asm.Md.apply(null, arguments)
                },
                Uf = g._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function() {
                    return g.asm.Nd.apply(null, arguments)
                },
                Vf = g._emscripten_bind_btCapsuleShape___destroy___0 = function() {
                    return g.asm.Od.apply(null, arguments)
                },
                Wf = g._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function() {
                    return g.asm.Pd.apply(null, arguments)
                },
                Xf = g._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 =
                function() {
                    return g.asm.Qd.apply(null, arguments)
                },
                Yf = g._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function() {
                    return g.asm.Rd.apply(null, arguments)
                },
                Zf = g._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function() {
                    return g.asm.Sd.apply(null, arguments)
                },
                $f = g._emscripten_bind_btCapsuleShape_getMargin_0 = function() {
                    return g.asm.Td.apply(null, arguments)
                },
                ag = g._emscripten_bind_btCapsuleShape_getRadius_0 = function() {
                    return g.asm.Ud.apply(null, arguments)
                },
                bg = g._emscripten_bind_btCapsuleShape_getUpAxis_0 =
                function() {
                    return g.asm.Vd.apply(null, arguments)
                },
                cg = g._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function() {
                    return g.asm.Wd.apply(null, arguments)
                },
                dg = g._emscripten_bind_btCapsuleShape_setMargin_1 = function() {
                    return g.asm.Xd.apply(null, arguments)
                },
                eg = g._emscripten_bind_btCollisionConfiguration___destroy___0 = function() {
                    return g.asm.Yd.apply(null, arguments)
                },
                fg = g._emscripten_bind_btCollisionDispatcher___destroy___0 = function() {
                    return g.asm.Zd.apply(null, arguments)
                },
                gg = g._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 =
                function() {
                    return g.asm._d.apply(null, arguments)
                },
                hg = g._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function() {
                    return g.asm.$d.apply(null, arguments)
                },
                ig = g._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function() {
                    return g.asm.ae.apply(null, arguments)
                },
                jg = g._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function() {
                    return g.asm.be.apply(null, arguments)
                },
                kg = g._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function() {
                    return g.asm.ce.apply(null,
                        arguments)
                },
                lg = g._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function() {
                    return g.asm.de.apply(null, arguments)
                },
                mg = g._emscripten_bind_btCollisionObject___destroy___0 = function() {
                    return g.asm.ee.apply(null, arguments)
                },
                ng = g._emscripten_bind_btCollisionObject_activate_0 = function() {
                    return g.asm.fe.apply(null, arguments)
                },
                og = g._emscripten_bind_btCollisionObject_activate_1 = function() {
                    return g.asm.ge.apply(null, arguments)
                },
                pg = g._emscripten_bind_btCollisionObject_forceActivationState_1 = function() {
                    return g.asm.he.apply(null,
                        arguments)
                },
                qg = g._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function() {
                    return g.asm.ie.apply(null, arguments)
                },
                rg = g._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function() {
                    return g.asm.je.apply(null, arguments)
                },
                sg = g._emscripten_bind_btCollisionObject_getCollisionShape_0 = function() {
                    return g.asm.ke.apply(null, arguments)
                },
                tg = g._emscripten_bind_btCollisionObject_getFriction_0 = function() {
                    return g.asm.le.apply(null, arguments)
                },
                ug = g._emscripten_bind_btCollisionObject_getRestitution_0 =
                function() {
                    return g.asm.me.apply(null, arguments)
                },
                vg = g._emscripten_bind_btCollisionObject_getRollingFriction_0 = function() {
                    return g.asm.ne.apply(null, arguments)
                },
                wg = g._emscripten_bind_btCollisionObject_getUserIndex_0 = function() {
                    return g.asm.oe.apply(null, arguments)
                },
                xg = g._emscripten_bind_btCollisionObject_getUserPointer_0 = function() {
                    return g.asm.pe.apply(null, arguments)
                },
                yg = g._emscripten_bind_btCollisionObject_getWorldTransform_0 = function() {
                    return g.asm.qe.apply(null, arguments)
                },
                zg = g._emscripten_bind_btCollisionObject_isActive_0 =
                function() {
                    return g.asm.re.apply(null, arguments)
                },
                Ag = g._emscripten_bind_btCollisionObject_isKinematicObject_0 = function() {
                    return g.asm.se.apply(null, arguments)
                },
                Bg = g._emscripten_bind_btCollisionObject_isStaticObject_0 = function() {
                    return g.asm.te.apply(null, arguments)
                },
                Cg = g._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function() {
                    return g.asm.ue.apply(null, arguments)
                },
                Dg = g._emscripten_bind_btCollisionObject_setActivationState_1 = function() {
                    return g.asm.ve.apply(null, arguments)
                },
                Eg = g._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 =
                function() {
                    return g.asm.we.apply(null, arguments)
                },
                Fg = g._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function() {
                    return g.asm.xe.apply(null, arguments)
                },
                Gg = g._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.ye.apply(null, arguments)
                },
                Hg = g._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function() {
                    return g.asm.ze.apply(null, arguments)
                },
                Ig = g._emscripten_bind_btCollisionObject_setCollisionShape_1 = function() {
                    return g.asm.Ae.apply(null, arguments)
                },
                Jg =
                g._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.Be.apply(null, arguments)
                },
                Kg = g._emscripten_bind_btCollisionObject_setFriction_1 = function() {
                    return g.asm.Ce.apply(null, arguments)
                },
                Lg = g._emscripten_bind_btCollisionObject_setRestitution_1 = function() {
                    return g.asm.De.apply(null, arguments)
                },
                Mg = g._emscripten_bind_btCollisionObject_setRollingFriction_1 = function() {
                    return g.asm.Ee.apply(null, arguments)
                },
                Ng = g._emscripten_bind_btCollisionObject_setUserIndex_1 = function() {
                    return g.asm.Fe.apply(null,
                        arguments)
                },
                Og = g._emscripten_bind_btCollisionObject_setUserPointer_1 = function() {
                    return g.asm.Ge.apply(null, arguments)
                },
                Pg = g._emscripten_bind_btCollisionObject_setWorldTransform_1 = function() {
                    return g.asm.He.apply(null, arguments)
                },
                Qg = g._emscripten_bind_btCollisionShape___destroy___0 = function() {
                    return g.asm.Ie.apply(null, arguments)
                },
                Rg = g._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function() {
                    return g.asm.Je.apply(null, arguments)
                },
                Sg = g._emscripten_bind_btCollisionShape_getLocalScaling_0 =
                function() {
                    return g.asm.Ke.apply(null, arguments)
                },
                Tg = g._emscripten_bind_btCollisionShape_getMargin_0 = function() {
                    return g.asm.Le.apply(null, arguments)
                },
                Ug = g._emscripten_bind_btCollisionShape_setLocalScaling_1 = function() {
                    return g.asm.Me.apply(null, arguments)
                },
                Vg = g._emscripten_bind_btCollisionShape_setMargin_1 = function() {
                    return g.asm.Ne.apply(null, arguments)
                },
                Wg = g._emscripten_bind_btCollisionWorld___destroy___0 = function() {
                    return g.asm.Oe.apply(null, arguments)
                },
                Xg = g._emscripten_bind_btCollisionWorld_addCollisionObject_1 =
                function() {
                    return g.asm.Pe.apply(null, arguments)
                },
                Yg = g._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function() {
                    return g.asm.Qe.apply(null, arguments)
                },
                Zg = g._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function() {
                    return g.asm.Re.apply(null, arguments)
                },
                $g = g._emscripten_bind_btCollisionWorld_contactPairTest_3 = function() {
                    return g.asm.Se.apply(null, arguments)
                },
                ah = g._emscripten_bind_btCollisionWorld_contactTest_2 = function() {
                    return g.asm.Te.apply(null, arguments)
                },
                bh = g._emscripten_bind_btCollisionWorld_convexSweepTest_5 =
                function() {
                    return g.asm.Ue.apply(null, arguments)
                },
                ch = g._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function() {
                    return g.asm.Ve.apply(null, arguments)
                },
                dh = g._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function() {
                    return g.asm.We.apply(null, arguments)
                },
                eh = g._emscripten_bind_btCollisionWorld_getBroadphase_0 = function() {
                    return g.asm.Xe.apply(null, arguments)
                },
                fh = g._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function() {
                    return g.asm.Ye.apply(null, arguments)
                },
                gh = g._emscripten_bind_btCollisionWorld_getDispatchInfo_0 =
                function() {
                    return g.asm.Ze.apply(null, arguments)
                },
                hh = g._emscripten_bind_btCollisionWorld_getDispatcher_0 = function() {
                    return g.asm._e.apply(null, arguments)
                },
                ih = g._emscripten_bind_btCollisionWorld_getPairCache_0 = function() {
                    return g.asm.$e.apply(null, arguments)
                },
                jh = g._emscripten_bind_btCollisionWorld_rayTest_3 = function() {
                    return g.asm.af.apply(null, arguments)
                },
                kh = g._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function() {
                    return g.asm.bf.apply(null, arguments)
                },
                lh = g._emscripten_bind_btCollisionWorld_setDebugDrawer_1 =
                function() {
                    return g.asm.cf.apply(null, arguments)
                },
                mh = g._emscripten_bind_btCollisionWorld_setForceUpdateAllAabbs_1 = function() {
                    return g.asm.df.apply(null, arguments)
                },
                nh = g._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function() {
                    return g.asm.ef.apply(null, arguments)
                },
                oh = g._emscripten_bind_btCompoundShape___destroy___0 = function() {
                    return g.asm.ff.apply(null, arguments)
                },
                ph = g._emscripten_bind_btCompoundShape_addChildShape_2 = function() {
                    return g.asm.gf.apply(null, arguments)
                },
                qh = g._emscripten_bind_btCompoundShape_btCompoundShape_0 =
                function() {
                    return g.asm.hf.apply(null, arguments)
                },
                rh = g._emscripten_bind_btCompoundShape_btCompoundShape_1 = function() {
                    return g.asm.jf.apply(null, arguments)
                },
                sh = g._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function() {
                    return g.asm.kf.apply(null, arguments)
                },
                th = g._emscripten_bind_btCompoundShape_getChildShape_1 = function() {
                    return g.asm.lf.apply(null, arguments)
                },
                uh = g._emscripten_bind_btCompoundShape_getLocalScaling_0 = function() {
                    return g.asm.mf.apply(null, arguments)
                },
                vh = g._emscripten_bind_btCompoundShape_getMargin_0 =
                function() {
                    return g.asm.nf.apply(null, arguments)
                },
                wh = g._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function() {
                    return g.asm.of.apply(null, arguments)
                },
                xh = g._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function() {
                    return g.asm.pf.apply(null, arguments)
                },
                yh = g._emscripten_bind_btCompoundShape_removeChildShape_1 = function() {
                    return g.asm.qf.apply(null, arguments)
                },
                zh = g._emscripten_bind_btCompoundShape_setLocalScaling_1 = function() {
                    return g.asm.rf.apply(null, arguments)
                },
                Ah = g._emscripten_bind_btCompoundShape_setMargin_1 =
                function() {
                    return g.asm.sf.apply(null, arguments)
                },
                Bh = g._emscripten_bind_btCompoundShape_updateChildTransform_2 = function() {
                    return g.asm.tf.apply(null, arguments)
                },
                Ch = g._emscripten_bind_btCompoundShape_updateChildTransform_3 = function() {
                    return g.asm.uf.apply(null, arguments)
                },
                Dh = g._emscripten_bind_btConcaveShape___destroy___0 = function() {
                    return g.asm.vf.apply(null, arguments)
                },
                Eh = g._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function() {
                    return g.asm.wf.apply(null, arguments)
                },
                Fh = g._emscripten_bind_btConcaveShape_getLocalScaling_0 =
                function() {
                    return g.asm.xf.apply(null, arguments)
                },
                Gh = g._emscripten_bind_btConcaveShape_setLocalScaling_1 = function() {
                    return g.asm.yf.apply(null, arguments)
                },
                Hh = g._emscripten_bind_btConeShapeX___destroy___0 = function() {
                    return g.asm.zf.apply(null, arguments)
                },
                Ih = g._emscripten_bind_btConeShapeX_btConeShapeX_2 = function() {
                    return g.asm.Af.apply(null, arguments)
                },
                Jh = g._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function() {
                    return g.asm.Bf.apply(null, arguments)
                },
                Kh = g._emscripten_bind_btConeShapeX_getLocalScaling_0 =
                function() {
                    return g.asm.Cf.apply(null, arguments)
                },
                Lh = g._emscripten_bind_btConeShapeX_setLocalScaling_1 = function() {
                    return g.asm.Df.apply(null, arguments)
                },
                Mh = g._emscripten_bind_btConeShapeZ___destroy___0 = function() {
                    return g.asm.Ef.apply(null, arguments)
                },
                Nh = g._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function() {
                    return g.asm.Ff.apply(null, arguments)
                },
                Oh = g._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function() {
                    return g.asm.Gf.apply(null, arguments)
                },
                Ph = g._emscripten_bind_btConeShapeZ_getLocalScaling_0 =
                function() {
                    return g.asm.Hf.apply(null, arguments)
                },
                Qh = g._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function() {
                    return g.asm.If.apply(null, arguments)
                },
                Rh = g._emscripten_bind_btConeShape___destroy___0 = function() {
                    return g.asm.Jf.apply(null, arguments)
                },
                Sh = g._emscripten_bind_btConeShape_btConeShape_2 = function() {
                    return g.asm.Kf.apply(null, arguments)
                },
                Th = g._emscripten_bind_btConeShape_calculateLocalInertia_2 = function() {
                    return g.asm.Lf.apply(null, arguments)
                },
                Uh = g._emscripten_bind_btConeShape_getLocalScaling_0 =
                function() {
                    return g.asm.Mf.apply(null, arguments)
                },
                Vh = g._emscripten_bind_btConeShape_setLocalScaling_1 = function() {
                    return g.asm.Nf.apply(null, arguments)
                },
                Wh = g._emscripten_bind_btConeTwistConstraint___destroy___0 = function() {
                    return g.asm.Of.apply(null, arguments)
                },
                Xh = g._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function() {
                    return g.asm.Pf.apply(null, arguments)
                },
                Yh = g._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function() {
                    return g.asm.Qf.apply(null, arguments)
                },
                Zh = g._emscripten_bind_btConeTwistConstraint_enableFeedback_1 =
                function() {
                    return g.asm.Rf.apply(null, arguments)
                },
                $h = g._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function() {
                    return g.asm.Sf.apply(null, arguments)
                },
                ai = g._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Tf.apply(null, arguments)
                },
                bi = g._emscripten_bind_btConeTwistConstraint_getParam_2 = function() {
                    return g.asm.Uf.apply(null, arguments)
                },
                ci = g._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function() {
                    return g.asm.Vf.apply(null, arguments)
                },
                di =
                g._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Wf.apply(null, arguments)
                },
                ei = g._emscripten_bind_btConeTwistConstraint_setDamping_1 = function() {
                    return g.asm.Xf.apply(null, arguments)
                },
                fi = g._emscripten_bind_btConeTwistConstraint_setLimit_2 = function() {
                    return g.asm.Yf.apply(null, arguments)
                },
                gi = g._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function() {
                    return g.asm.Zf.apply(null, arguments)
                },
                hi = g._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 =
                function() {
                    return g.asm._f.apply(null, arguments)
                },
                ii = g._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function() {
                    return g.asm.$f.apply(null, arguments)
                },
                ji = g._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function() {
                    return g.asm.ag.apply(null, arguments)
                },
                ki = g._emscripten_bind_btConeTwistConstraint_setParam_3 = function() {
                    return g.asm.bg.apply(null, arguments)
                },
                li = g._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function() {
                    return g.asm.cg.apply(null, arguments)
                },
                mi = g._emscripten_bind_btConstCollisionObjectArray_at_1 = function() {
                    return g.asm.dg.apply(null, arguments)
                },
                ni = g._emscripten_bind_btConstCollisionObjectArray_size_0 = function() {
                    return g.asm.eg.apply(null, arguments)
                },
                oi = g._emscripten_bind_btConstraintSetting___destroy___0 = function() {
                    return g.asm.fg.apply(null, arguments)
                },
                pi = g._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function() {
                    return g.asm.gg.apply(null, arguments)
                },
                qi = g._emscripten_bind_btConstraintSetting_get_m_damping_0 = function() {
                    return g.asm.hg.apply(null,
                        arguments)
                },
                ri = g._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function() {
                    return g.asm.ig.apply(null, arguments)
                },
                si = g._emscripten_bind_btConstraintSetting_get_m_tau_0 = function() {
                    return g.asm.jg.apply(null, arguments)
                },
                ti = g._emscripten_bind_btConstraintSetting_set_m_damping_1 = function() {
                    return g.asm.kg.apply(null, arguments)
                },
                ui = g._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function() {
                    return g.asm.lg.apply(null, arguments)
                },
                vi = g._emscripten_bind_btConstraintSetting_set_m_tau_1 =
                function() {
                    return g.asm.mg.apply(null, arguments)
                },
                wi = g._emscripten_bind_btConstraintSolver___destroy___0 = function() {
                    return g.asm.ng.apply(null, arguments)
                },
                xi = g._emscripten_bind_btContactSolverInfo___destroy___0 = function() {
                    return g.asm.og.apply(null, arguments)
                },
                yi = g._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function() {
                    return g.asm.pg.apply(null, arguments)
                },
                zi = g._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function() {
                    return g.asm.qg.apply(null, arguments)
                },
                Ai = g._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function() {
                    return g.asm.rg.apply(null, arguments)
                },
                Bi = g._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function() {
                    return g.asm.sg.apply(null, arguments)
                },
                Ci = g._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = function() {
                    return g.asm.tg.apply(null, arguments)
                },
                Di = g._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function() {
                    return g.asm.ug.apply(null, arguments)
                },
                Ei = g._emscripten_bind_btConvexHullShape___destroy___0 =
                function() {
                    return g.asm.vg.apply(null, arguments)
                },
                Fi = g._emscripten_bind_btConvexHullShape_addPoint_1 = function() {
                    return g.asm.wg.apply(null, arguments)
                },
                Gi = g._emscripten_bind_btConvexHullShape_addPoint_2 = function() {
                    return g.asm.xg.apply(null, arguments)
                },
                Hi = g._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function() {
                    return g.asm.yg.apply(null, arguments)
                },
                Ii = g._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function() {
                    return g.asm.zg.apply(null, arguments)
                },
                Ji = g._emscripten_bind_btConvexHullShape_btConvexHullShape_2 =
                function() {
                    return g.asm.Ag.apply(null, arguments)
                },
                Ki = g._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function() {
                    return g.asm.Bg.apply(null, arguments)
                },
                Li = g._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function() {
                    return g.asm.Cg.apply(null, arguments)
                },
                Mi = g._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function() {
                    return g.asm.Dg.apply(null, arguments)
                },
                Ni = g._emscripten_bind_btConvexHullShape_getMargin_0 = function() {
                    return g.asm.Eg.apply(null, arguments)
                },
                Oi = g._emscripten_bind_btConvexHullShape_getNumVertices_0 =
                function() {
                    return g.asm.Fg.apply(null, arguments)
                },
                Pi = g._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function() {
                    return g.asm.Gg.apply(null, arguments)
                },
                Qi = g._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function() {
                    return g.asm.Hg.apply(null, arguments)
                },
                Ri = g._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function() {
                    return g.asm.Ig.apply(null, arguments)
                },
                Si = g._emscripten_bind_btConvexHullShape_setMargin_1 = function() {
                    return g.asm.Jg.apply(null, arguments)
                },
                Ti = g._emscripten_bind_btConvexPolyhedron___destroy___0 =
                function() {
                    return g.asm.Kg.apply(null, arguments)
                },
                Ui = g._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function() {
                    return g.asm.Lg.apply(null, arguments)
                },
                Vi = g._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function() {
                    return g.asm.Mg.apply(null, arguments)
                },
                Wi = g._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function() {
                    return g.asm.Ng.apply(null, arguments)
                },
                Xi = g._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function() {
                    return g.asm.Og.apply(null, arguments)
                },
                Yi = g._emscripten_bind_btConvexShape___destroy___0 =
                function() {
                    return g.asm.Pg.apply(null, arguments)
                },
                Zi = g._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function() {
                    return g.asm.Qg.apply(null, arguments)
                },
                $i = g._emscripten_bind_btConvexShape_getLocalScaling_0 = function() {
                    return g.asm.Rg.apply(null, arguments)
                },
                aj = g._emscripten_bind_btConvexShape_getMargin_0 = function() {
                    return g.asm.Sg.apply(null, arguments)
                },
                bj = g._emscripten_bind_btConvexShape_setLocalScaling_1 = function() {
                    return g.asm.Tg.apply(null, arguments)
                },
                cj = g._emscripten_bind_btConvexShape_setMargin_1 =
                function() {
                    return g.asm.Ug.apply(null, arguments)
                },
                dj = g._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function() {
                    return g.asm.Vg.apply(null, arguments)
                },
                ej = g._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function() {
                    return g.asm.Wg.apply(null, arguments)
                },
                fj = g._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function() {
                    return g.asm.Xg.apply(null, arguments)
                },
                gj = g._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function() {
                    return g.asm.Yg.apply(null,
                        arguments)
                },
                hj = g._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.Zg.apply(null, arguments)
                },
                ij = g._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function() {
                    return g.asm._g.apply(null, arguments)
                },
                jj = g._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.$g.apply(null, arguments)
                },
                kj = g._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function() {
                    return g.asm.ah.apply(null, arguments)
                },
                lj = g._emscripten_bind_btCylinderShapeX___destroy___0 =
                function() {
                    return g.asm.bh.apply(null, arguments)
                },
                mj = g._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function() {
                    return g.asm.ch.apply(null, arguments)
                },
                nj = g._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function() {
                    return g.asm.dh.apply(null, arguments)
                },
                oj = g._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = function() {
                    return g.asm.eh.apply(null, arguments)
                },
                pj = g._emscripten_bind_btCylinderShapeX_getMargin_0 = function() {
                    return g.asm.fh.apply(null, arguments)
                },
                qj = g._emscripten_bind_btCylinderShapeX_setLocalScaling_1 =
                function() {
                    return g.asm.gh.apply(null, arguments)
                },
                rj = g._emscripten_bind_btCylinderShapeX_setMargin_1 = function() {
                    return g.asm.hh.apply(null, arguments)
                },
                sj = g._emscripten_bind_btCylinderShapeZ___destroy___0 = function() {
                    return g.asm.ih.apply(null, arguments)
                },
                tj = g._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function() {
                    return g.asm.jh.apply(null, arguments)
                },
                uj = g._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function() {
                    return g.asm.kh.apply(null, arguments)
                },
                vj = g._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 =
                function() {
                    return g.asm.lh.apply(null, arguments)
                },
                wj = g._emscripten_bind_btCylinderShapeZ_getMargin_0 = function() {
                    return g.asm.mh.apply(null, arguments)
                },
                xj = g._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function() {
                    return g.asm.nh.apply(null, arguments)
                },
                yj = g._emscripten_bind_btCylinderShapeZ_setMargin_1 = function() {
                    return g.asm.oh.apply(null, arguments)
                },
                zj = g._emscripten_bind_btCylinderShape___destroy___0 = function() {
                    return g.asm.ph.apply(null, arguments)
                },
                Aj = g._emscripten_bind_btCylinderShape_btCylinderShape_1 =
                function() {
                    return g.asm.qh.apply(null, arguments)
                },
                Bj = g._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function() {
                    return g.asm.rh.apply(null, arguments)
                },
                Cj = g._emscripten_bind_btCylinderShape_getLocalScaling_0 = function() {
                    return g.asm.sh.apply(null, arguments)
                },
                Dj = g._emscripten_bind_btCylinderShape_getMargin_0 = function() {
                    return g.asm.th.apply(null, arguments)
                },
                Ej = g._emscripten_bind_btCylinderShape_setLocalScaling_1 = function() {
                    return g.asm.uh.apply(null, arguments)
                },
                Fj = g._emscripten_bind_btCylinderShape_setMargin_1 =
                function() {
                    return g.asm.vh.apply(null, arguments)
                },
                Gj = g._emscripten_bind_btDbvtBroadphase___destroy___0 = function() {
                    return g.asm.wh.apply(null, arguments)
                },
                Hj = g._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function() {
                    return g.asm.xh.apply(null, arguments)
                },
                Ij = g._emscripten_bind_btDbvtBroadphase_getOverlappingPairCache_0 = function() {
                    return g.asm.yh.apply(null, arguments)
                },
                Jj = g._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function() {
                    return g.asm.zh.apply(null, arguments)
                },
                Kj = g._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 =
                function() {
                    return g.asm.Ah.apply(null, arguments)
                },
                Lj = g._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function() {
                    return g.asm.Bh.apply(null, arguments)
                },
                Mj = g._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function() {
                    return g.asm.Ch.apply(null, arguments)
                },
                Nj = g._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = function() {
                    return g.asm.Dh.apply(null, arguments)
                },
                Oj = g._emscripten_bind_btDefaultMotionState___destroy___0 =
                function() {
                    return g.asm.Eh.apply(null, arguments)
                },
                Pj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function() {
                    return g.asm.Fh.apply(null, arguments)
                },
                Qj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function() {
                    return g.asm.Gh.apply(null, arguments)
                },
                Rj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function() {
                    return g.asm.Hh.apply(null, arguments)
                },
                Sj = g._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function() {
                    return g.asm.Ih.apply(null, arguments)
                },
                Tj = g._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function() {
                    return g.asm.Jh.apply(null, arguments)
                },
                Uj = g._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function() {
                    return g.asm.Kh.apply(null, arguments)
                },
                Vj = g._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function() {
                    return g.asm.Lh.apply(null, arguments)
                },
                Wj = g._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function() {
                    return g.asm.Mh.apply(null, arguments)
                },
                Xj = g._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 =
                function() {
                    return g.asm.Nh.apply(null, arguments)
                },
                Yj = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function() {
                    return g.asm.Oh.apply(null, arguments)
                },
                Zj = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function() {
                    return g.asm.Ph.apply(null, arguments)
                },
                ak = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function() {
                    return g.asm.Qh.apply(null, arguments)
                },
                bk = g._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function() {
                    return g.asm.Rh.apply(null,
                        arguments)
                },
                ck = g._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function() {
                    return g.asm.Sh.apply(null, arguments)
                },
                dk = g._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function() {
                    return g.asm.Th.apply(null, arguments)
                },
                ek = g._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function() {
                    return g.asm.Uh.apply(null, arguments)
                },
                fk = g._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function() {
                    return g.asm.Vh.apply(null, arguments)
                },
                gk = g._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 =
                function() {
                    return g.asm.Wh.apply(null, arguments)
                },
                hk = g._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function() {
                    return g.asm.Xh.apply(null, arguments)
                },
                ik = g._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function() {
                    return g.asm.Yh.apply(null, arguments)
                },
                jk = g._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function() {
                    return g.asm.Zh.apply(null, arguments)
                },
                kk = g._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function() {
                    return g.asm._h.apply(null, arguments)
                },
                lk = g._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function() {
                    return g.asm.$h.apply(null, arguments)
                },
                mk = g._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function() {
                    return g.asm.ai.apply(null, arguments)
                },
                nk = g._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function() {
                    return g.asm.bi.apply(null, arguments)
                },
                ok = g._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function() {
                    return g.asm.ci.apply(null, arguments)
                },
                pk = g._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 =
                function() {
                    return g.asm.di.apply(null, arguments)
                },
                qk = g._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function() {
                    return g.asm.ei.apply(null, arguments)
                },
                rk = g._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function() {
                    return g.asm.fi.apply(null, arguments)
                },
                sk = g._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function() {
                    return g.asm.gi.apply(null, arguments)
                },
                tk = g._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function() {
                    return g.asm.hi.apply(null, arguments)
                },
                uk = g._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 =
                function() {
                    return g.asm.ii.apply(null, arguments)
                },
                vk = g._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function() {
                    return g.asm.ji.apply(null, arguments)
                },
                wk = g._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function() {
                    return g.asm.ki.apply(null, arguments)
                },
                xk = g._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function() {
                    return g.asm.li.apply(null, arguments)
                },
                yk = g._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function() {
                    return g.asm.mi.apply(null,
                        arguments)
                },
                zk = g._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function() {
                    return g.asm.ni.apply(null, arguments)
                },
                Ak = g._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function() {
                    return g.asm.oi.apply(null, arguments)
                },
                Bk = g._emscripten_bind_btDiscreteDynamicsWorld_setForceUpdateAllAabbs_1 = function() {
                    return g.asm.pi.apply(null, arguments)
                },
                Ck = g._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function() {
                    return g.asm.qi.apply(null, arguments)
                },
                Dk = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 =
                function() {
                    return g.asm.ri.apply(null, arguments)
                },
                Ek = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function() {
                    return g.asm.si.apply(null, arguments)
                },
                Fk = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function() {
                    return g.asm.ti.apply(null, arguments)
                },
                Gk = g._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function() {
                    return g.asm.ui.apply(null, arguments)
                },
                Hk = g._emscripten_bind_btDispatcherInfo___destroy___0 = function() {
                    return g.asm.vi.apply(null, arguments)
                },
                Ik = g._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 =
                function() {
                    return g.asm.wi.apply(null, arguments)
                },
                Jk = g._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function() {
                    return g.asm.xi.apply(null, arguments)
                },
                Kk = g._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function() {
                    return g.asm.yi.apply(null, arguments)
                },
                Lk = g._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function() {
                    return g.asm.zi.apply(null, arguments)
                },
                Mk = g._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function() {
                    return g.asm.Ai.apply(null,
                        arguments)
                },
                Nk = g._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function() {
                    return g.asm.Bi.apply(null, arguments)
                },
                Ok = g._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function() {
                    return g.asm.Ci.apply(null, arguments)
                },
                Pk = g._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function() {
                    return g.asm.Di.apply(null, arguments)
                },
                Qk = g._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function() {
                    return g.asm.Ei.apply(null, arguments)
                },
                Rk = g._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 =
                function() {
                    return g.asm.Fi.apply(null, arguments)
                },
                Sk = g._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function() {
                    return g.asm.Gi.apply(null, arguments)
                },
                Tk = g._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function() {
                    return g.asm.Hi.apply(null, arguments)
                },
                Uk = g._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function() {
                    return g.asm.Ii.apply(null, arguments)
                },
                Vk = g._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function() {
                    return g.asm.Ji.apply(null,
                        arguments)
                },
                Wk = g._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function() {
                    return g.asm.Ki.apply(null, arguments)
                },
                Xk = g._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function() {
                    return g.asm.Li.apply(null, arguments)
                },
                Yk = g._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function() {
                    return g.asm.Mi.apply(null, arguments)
                },
                Zk = g._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function() {
                    return g.asm.Ni.apply(null, arguments)
                },
                $k = g._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 =
                function() {
                    return g.asm.Oi.apply(null, arguments)
                },
                al = g._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function() {
                    return g.asm.Pi.apply(null, arguments)
                },
                bl = g._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = function() {
                    return g.asm.Qi.apply(null, arguments)
                },
                cl = g._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function() {
                    return g.asm.Ri.apply(null, arguments)
                },
                dl = g._emscripten_bind_btDispatcher___destroy___0 = function() {
                    return g.asm.Si.apply(null, arguments)
                },
                el = g._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 =
                function() {
                    return g.asm.Ti.apply(null, arguments)
                },
                fl = g._emscripten_bind_btDispatcher_getNumManifolds_0 = function() {
                    return g.asm.Ui.apply(null, arguments)
                },
                gl = g._emscripten_bind_btDynamicsWorld___destroy___0 = function() {
                    return g.asm.Vi.apply(null, arguments)
                },
                hl = g._emscripten_bind_btDynamicsWorld_addAction_1 = function() {
                    return g.asm.Wi.apply(null, arguments)
                },
                il = g._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function() {
                    return g.asm.Xi.apply(null, arguments)
                },
                jl = g._emscripten_bind_btDynamicsWorld_addCollisionObject_2 =
                function() {
                    return g.asm.Yi.apply(null, arguments)
                },
                kl = g._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function() {
                    return g.asm.Zi.apply(null, arguments)
                },
                ll = g._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function() {
                    return g.asm._i.apply(null, arguments)
                },
                ml = g._emscripten_bind_btDynamicsWorld_contactTest_2 = function() {
                    return g.asm.$i.apply(null, arguments)
                },
                nl = g._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function() {
                    return g.asm.aj.apply(null, arguments)
                },
                ol = g._emscripten_bind_btDynamicsWorld_debugDrawObject_3 =
                function() {
                    return g.asm.bj.apply(null, arguments)
                },
                pl = g._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function() {
                    return g.asm.cj.apply(null, arguments)
                },
                ql = g._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function() {
                    return g.asm.dj.apply(null, arguments)
                },
                rl = g._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function() {
                    return g.asm.ej.apply(null, arguments)
                },
                sl = g._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function() {
                    return g.asm.fj.apply(null, arguments)
                },
                tl = g._emscripten_bind_btDynamicsWorld_getDispatcher_0 =
                function() {
                    return g.asm.gj.apply(null, arguments)
                },
                ul = g._emscripten_bind_btDynamicsWorld_getPairCache_0 = function() {
                    return g.asm.hj.apply(null, arguments)
                },
                vl = g._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function() {
                    return g.asm.ij.apply(null, arguments)
                },
                wl = g._emscripten_bind_btDynamicsWorld_rayTest_3 = function() {
                    return g.asm.jj.apply(null, arguments)
                },
                xl = g._emscripten_bind_btDynamicsWorld_removeAction_1 = function() {
                    return g.asm.kj.apply(null, arguments)
                },
                yl = g._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 =
                function() {
                    return g.asm.lj.apply(null, arguments)
                },
                zl = g._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function() {
                    return g.asm.mj.apply(null, arguments)
                },
                Al = g._emscripten_bind_btDynamicsWorld_setForceUpdateAllAabbs_1 = function() {
                    return g.asm.nj.apply(null, arguments)
                },
                Bl = g._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function() {
                    return g.asm.oj.apply(null, arguments)
                },
                Cl = g._emscripten_bind_btEmptyShape___destroy___0 = function() {
                    return g.asm.pj.apply(null, arguments)
                },
                Dl = g._emscripten_bind_btEmptyShape_btEmptyShape_0 =
                function() {
                    return g.asm.qj.apply(null, arguments)
                },
                El = g._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function() {
                    return g.asm.rj.apply(null, arguments)
                },
                Fl = g._emscripten_bind_btEmptyShape_getLocalScaling_0 = function() {
                    return g.asm.sj.apply(null, arguments)
                },
                Gl = g._emscripten_bind_btEmptyShape_setLocalScaling_1 = function() {
                    return g.asm.tj.apply(null, arguments)
                },
                Hl = g._emscripten_bind_btFaceArray___destroy___0 = function() {
                    return g.asm.uj.apply(null, arguments)
                },
                Il = g._emscripten_bind_btFaceArray_at_1 =
                function() {
                    return g.asm.vj.apply(null, arguments)
                },
                Jl = g._emscripten_bind_btFaceArray_size_0 = function() {
                    return g.asm.wj.apply(null, arguments)
                },
                Kl = g._emscripten_bind_btFace___destroy___0 = function() {
                    return g.asm.xj.apply(null, arguments)
                },
                Ll = g._emscripten_bind_btFace_get_m_indices_0 = function() {
                    return g.asm.yj.apply(null, arguments)
                },
                Ml = g._emscripten_bind_btFace_get_m_plane_1 = function() {
                    return g.asm.zj.apply(null, arguments)
                },
                Nl = g._emscripten_bind_btFace_set_m_indices_1 = function() {
                    return g.asm.Aj.apply(null,
                        arguments)
                },
                Ol = g._emscripten_bind_btFace_set_m_plane_2 = function() {
                    return g.asm.Bj.apply(null, arguments)
                },
                Pl = g._emscripten_bind_btFixedConstraint___destroy___0 = function() {
                    return g.asm.Cj.apply(null, arguments)
                },
                Ql = g._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function() {
                    return g.asm.Dj.apply(null, arguments)
                },
                Rl = g._emscripten_bind_btFixedConstraint_enableFeedback_1 = function() {
                    return g.asm.Ej.apply(null, arguments)
                },
                Sl = g._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Fj.apply(null,
                        arguments)
                },
                Tl = g._emscripten_bind_btFixedConstraint_getParam_2 = function() {
                    return g.asm.Gj.apply(null, arguments)
                },
                Ul = g._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Hj.apply(null, arguments)
                },
                Vl = g._emscripten_bind_btFixedConstraint_setParam_3 = function() {
                    return g.asm.Ij.apply(null, arguments)
                },
                Wl = g._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function() {
                    return g.asm.Jj.apply(null, arguments)
                },
                Xl = g._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 =
                function() {
                    return g.asm.Kj.apply(null, arguments)
                },
                Yl = g._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function() {
                    return g.asm.Lj.apply(null, arguments)
                },
                Zl = g._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function() {
                    return g.asm.Mj.apply(null, arguments)
                },
                $l = g._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Nj.apply(null, arguments)
                },
                am = g._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function() {
                    return g.asm.Oj.apply(null,
                        arguments)
                },
                bm = g._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function() {
                    return g.asm.Pj.apply(null, arguments)
                },
                cm = g._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function() {
                    return g.asm.Qj.apply(null, arguments)
                },
                dm = g._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function() {
                    return g.asm.Rj.apply(null, arguments)
                },
                em = g._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Sj.apply(null, arguments)
                },
                fm = g._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 =
                function() {
                    return g.asm.Tj.apply(null, arguments)
                },
                gm = g._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function() {
                    return g.asm.Uj.apply(null, arguments)
                },
                hm = g._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function() {
                    return g.asm.Vj.apply(null, arguments)
                },
                im = g._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function() {
                    return g.asm.Wj.apply(null, arguments)
                },
                jm = g._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = function() {
                    return g.asm.Xj.apply(null,
                        arguments)
                },
                km = g._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function() {
                    return g.asm.Yj.apply(null, arguments)
                },
                lm = g._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function() {
                    return g.asm.Zj.apply(null, arguments)
                },
                mm = g._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function() {
                    return g.asm._j.apply(null, arguments)
                },
                nm = g._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.$j.apply(null,
                        arguments)
                },
                om = g._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function() {
                    return g.asm.ak.apply(null, arguments)
                },
                pm = g._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = function() {
                    return g.asm.bk.apply(null, arguments)
                },
                qm = g._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function() {
                    return g.asm.ck.apply(null, arguments)
                },
                rm = g._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function() {
                    return g.asm.dk.apply(null, arguments)
                },
                sm = g._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.ek.apply(null, arguments)
                },
                tm = g._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function() {
                    return g.asm.fk.apply(null, arguments)
                },
                um = g._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function() {
                    return g.asm.gk.apply(null, arguments)
                },
                wm = g._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function() {
                    return g.asm.hk.apply(null, arguments)
                },
                xm = g._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function() {
                    return g.asm.ik.apply(null,
                        arguments)
                },
                ym = g._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function() {
                    return g.asm.jk.apply(null, arguments)
                },
                zm = g._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function() {
                    return g.asm.kk.apply(null, arguments)
                },
                Am = g._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function() {
                    return g.asm.lk.apply(null, arguments)
                },
                Bm = g._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function() {
                    return g.asm.mk.apply(null, arguments)
                },
                Cm = g._emscripten_bind_btGhostObject___destroy___0 =
                function() {
                    return g.asm.nk.apply(null, arguments)
                },
                Dm = g._emscripten_bind_btGhostObject_activate_0 = function() {
                    return g.asm.ok.apply(null, arguments)
                },
                Em = g._emscripten_bind_btGhostObject_activate_1 = function() {
                    return g.asm.pk.apply(null, arguments)
                },
                Fm = g._emscripten_bind_btGhostObject_btGhostObject_0 = function() {
                    return g.asm.qk.apply(null, arguments)
                },
                Gm = g._emscripten_bind_btGhostObject_forceActivationState_1 = function() {
                    return g.asm.rk.apply(null, arguments)
                },
                Hm = g._emscripten_bind_btGhostObject_getBroadphaseHandle_0 =
                function() {
                    return g.asm.sk.apply(null, arguments)
                },
                Im = g._emscripten_bind_btGhostObject_getCollisionFlags_0 = function() {
                    return g.asm.tk.apply(null, arguments)
                },
                Jm = g._emscripten_bind_btGhostObject_getCollisionShape_0 = function() {
                    return g.asm.uk.apply(null, arguments)
                },
                Km = g._emscripten_bind_btGhostObject_getFriction_0 = function() {
                    return g.asm.vk.apply(null, arguments)
                },
                Lm = g._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function() {
                    return g.asm.wk.apply(null, arguments)
                },
                Mm = g._emscripten_bind_btGhostObject_getOverlappingObject_1 =
                function() {
                    return g.asm.xk.apply(null, arguments)
                },
                Nm = g._emscripten_bind_btGhostObject_getRestitution_0 = function() {
                    return g.asm.yk.apply(null, arguments)
                },
                Om = g._emscripten_bind_btGhostObject_getRollingFriction_0 = function() {
                    return g.asm.zk.apply(null, arguments)
                },
                Pm = g._emscripten_bind_btGhostObject_getUserIndex_0 = function() {
                    return g.asm.Ak.apply(null, arguments)
                },
                Qm = g._emscripten_bind_btGhostObject_getUserPointer_0 = function() {
                    return g.asm.Bk.apply(null, arguments)
                },
                Rm = g._emscripten_bind_btGhostObject_getWorldTransform_0 =
                function() {
                    return g.asm.Ck.apply(null, arguments)
                },
                Sm = g._emscripten_bind_btGhostObject_isActive_0 = function() {
                    return g.asm.Dk.apply(null, arguments)
                },
                Tm = g._emscripten_bind_btGhostObject_isKinematicObject_0 = function() {
                    return g.asm.Ek.apply(null, arguments)
                },
                Um = g._emscripten_bind_btGhostObject_isStaticObject_0 = function() {
                    return g.asm.Fk.apply(null, arguments)
                },
                Vm = g._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function() {
                    return g.asm.Gk.apply(null, arguments)
                },
                Wm = g._emscripten_bind_btGhostObject_setActivationState_1 =
                function() {
                    return g.asm.Hk.apply(null, arguments)
                },
                Xm = g._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function() {
                    return g.asm.Ik.apply(null, arguments)
                },
                Ym = g._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function() {
                    return g.asm.Jk.apply(null, arguments)
                },
                Zm = g._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.Kk.apply(null, arguments)
                },
                $m = g._emscripten_bind_btGhostObject_setCollisionFlags_1 = function() {
                    return g.asm.Lk.apply(null, arguments)
                },
                an = g._emscripten_bind_btGhostObject_setCollisionShape_1 =
                function() {
                    return g.asm.Mk.apply(null, arguments)
                },
                bn = g._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.Nk.apply(null, arguments)
                },
                cn = g._emscripten_bind_btGhostObject_setFriction_1 = function() {
                    return g.asm.Ok.apply(null, arguments)
                },
                dn = g._emscripten_bind_btGhostObject_setRestitution_1 = function() {
                    return g.asm.Pk.apply(null, arguments)
                },
                en = g._emscripten_bind_btGhostObject_setRollingFriction_1 = function() {
                    return g.asm.Qk.apply(null, arguments)
                },
                fn = g._emscripten_bind_btGhostObject_setUserIndex_1 =
                function() {
                    return g.asm.Rk.apply(null, arguments)
                },
                gn = g._emscripten_bind_btGhostObject_setUserPointer_1 = function() {
                    return g.asm.Sk.apply(null, arguments)
                },
                hn = g._emscripten_bind_btGhostObject_setWorldTransform_1 = function() {
                    return g.asm.Tk.apply(null, arguments)
                },
                jn = g._emscripten_bind_btGhostPairCallback___destroy___0 = function() {
                    return g.asm.Uk.apply(null, arguments)
                },
                kn = g._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function() {
                    return g.asm.Vk.apply(null, arguments)
                },
                ln = g._emscripten_bind_btHeightfieldTerrainShape___destroy___0 =
                function() {
                    return g.asm.Wk.apply(null, arguments)
                },
                mn = g._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function() {
                    return g.asm.Xk.apply(null, arguments)
                },
                nn = g._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function() {
                    return g.asm.Yk.apply(null, arguments)
                },
                on = g._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function() {
                    return g.asm.Zk.apply(null, arguments)
                },
                pn = g._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function() {
                    return g.asm._k.apply(null,
                        arguments)
                },
                qn = g._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function() {
                    return g.asm.$k.apply(null, arguments)
                },
                rn = g._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function() {
                    return g.asm.al.apply(null, arguments)
                },
                sn = g._emscripten_bind_btHingeConstraint___destroy___0 = function() {
                    return g.asm.bl.apply(null, arguments)
                },
                tn = g._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function() {
                    return g.asm.cl.apply(null, arguments)
                },
                un = g._emscripten_bind_btHingeConstraint_btHingeConstraint_3 =
                function() {
                    return g.asm.dl.apply(null, arguments)
                },
                vn = g._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function() {
                    return g.asm.el.apply(null, arguments)
                },
                wn = g._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function() {
                    return g.asm.fl.apply(null, arguments)
                },
                xn = g._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function() {
                    return g.asm.gl.apply(null, arguments)
                },
                yn = g._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function() {
                    return g.asm.hl.apply(null, arguments)
                },
                zn = g._emscripten_bind_btHingeConstraint_enableAngularMotor_3 =
                function() {
                    return g.asm.il.apply(null, arguments)
                },
                An = g._emscripten_bind_btHingeConstraint_enableFeedback_1 = function() {
                    return g.asm.jl.apply(null, arguments)
                },
                Bn = g._emscripten_bind_btHingeConstraint_enableMotor_1 = function() {
                    return g.asm.kl.apply(null, arguments)
                },
                Cn = g._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.ll.apply(null, arguments)
                },
                Dn = g._emscripten_bind_btHingeConstraint_getParam_2 = function() {
                    return g.asm.ml.apply(null, arguments)
                },
                En = g._emscripten_bind_btHingeConstraint_setAngularOnly_1 =
                function() {
                    return g.asm.nl.apply(null, arguments)
                },
                Fn = g._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.ol.apply(null, arguments)
                },
                Gn = g._emscripten_bind_btHingeConstraint_setLimit_4 = function() {
                    return g.asm.pl.apply(null, arguments)
                },
                Hn = g._emscripten_bind_btHingeConstraint_setLimit_5 = function() {
                    return g.asm.ql.apply(null, arguments)
                },
                In = g._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function() {
                    return g.asm.rl.apply(null, arguments)
                },
                Jn = g._emscripten_bind_btHingeConstraint_setMotorTarget_2 =
                function() {
                    return g.asm.sl.apply(null, arguments)
                },
                Kn = g._emscripten_bind_btHingeConstraint_setParam_3 = function() {
                    return g.asm.tl.apply(null, arguments)
                },
                Ln = g._emscripten_bind_btIDebugDraw___destroy___0 = function() {
                    return g.asm.ul.apply(null, arguments)
                },
                Mn = g._emscripten_bind_btIDebugDraw_draw3dText_2 = function() {
                    return g.asm.vl.apply(null, arguments)
                },
                Nn = g._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function() {
                    return g.asm.wl.apply(null, arguments)
                },
                On = g._emscripten_bind_btIDebugDraw_drawLine_3 = function() {
                    return g.asm.xl.apply(null,
                        arguments)
                },
                Pn = g._emscripten_bind_btIDebugDraw_getDebugMode_0 = function() {
                    return g.asm.yl.apply(null, arguments)
                },
                Qn = g._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function() {
                    return g.asm.zl.apply(null, arguments)
                },
                Rn = g._emscripten_bind_btIDebugDraw_setDebugMode_1 = function() {
                    return g.asm.Al.apply(null, arguments)
                },
                Sn = g._emscripten_bind_btIndexedMeshArray___destroy___0 = function() {
                    return g.asm.Bl.apply(null, arguments)
                },
                Tn = g._emscripten_bind_btIndexedMeshArray_at_1 = function() {
                    return g.asm.Cl.apply(null,
                        arguments)
                },
                Un = g._emscripten_bind_btIndexedMeshArray_size_0 = function() {
                    return g.asm.Dl.apply(null, arguments)
                },
                Vn = g._emscripten_bind_btIndexedMesh___destroy___0 = function() {
                    return g.asm.El.apply(null, arguments)
                },
                Wn = g._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function() {
                    return g.asm.Fl.apply(null, arguments)
                },
                Xn = g._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function() {
                    return g.asm.Gl.apply(null, arguments)
                },
                Yn = g._emscripten_bind_btIntArray___destroy___0 = function() {
                    return g.asm.Hl.apply(null,
                        arguments)
                },
                Zn = g._emscripten_bind_btIntArray_at_1 = function() {
                    return g.asm.Il.apply(null, arguments)
                },
                $n = g._emscripten_bind_btIntArray_size_0 = function() {
                    return g.asm.Jl.apply(null, arguments)
                },
                ao = g._emscripten_bind_btKinematicCharacterController___destroy___0 = function() {
                    return g.asm.Kl.apply(null, arguments)
                },
                bo = g._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function() {
                    return g.asm.Ll.apply(null, arguments)
                },
                co = g._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 =
                function() {
                    return g.asm.Ml.apply(null, arguments)
                },
                eo = g._emscripten_bind_btKinematicCharacterController_canJump_0 = function() {
                    return g.asm.Nl.apply(null, arguments)
                },
                fo = g._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function() {
                    return g.asm.Ol.apply(null, arguments)
                },
                go = g._emscripten_bind_btKinematicCharacterController_getGravity_0 = function() {
                    return g.asm.Pl.apply(null, arguments)
                },
                ho = g._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function() {
                    return g.asm.Ql.apply(null,
                        arguments)
                },
                io = g._emscripten_bind_btKinematicCharacterController_jump_0 = function() {
                    return g.asm.Rl.apply(null, arguments)
                },
                jo = g._emscripten_bind_btKinematicCharacterController_onGround_0 = function() {
                    return g.asm.Sl.apply(null, arguments)
                },
                ko = g._emscripten_bind_btKinematicCharacterController_playerStep_2 = function() {
                    return g.asm.Tl.apply(null, arguments)
                },
                lo = g._emscripten_bind_btKinematicCharacterController_preStep_1 = function() {
                    return g.asm.Ul.apply(null, arguments)
                },
                mo = g._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 =
                function() {
                    return g.asm.Vl.apply(null, arguments)
                },
                no = g._emscripten_bind_btKinematicCharacterController_setGravity_1 = function() {
                    return g.asm.Wl.apply(null, arguments)
                },
                oo = g._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function() {
                    return g.asm.Xl.apply(null, arguments)
                },
                po = g._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function() {
                    return g.asm.Yl.apply(null, arguments)
                },
                qo = g._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function() {
                    return g.asm.Zl.apply(null,
                        arguments)
                },
                ro = g._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function() {
                    return g.asm._l.apply(null, arguments)
                },
                so = g._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function() {
                    return g.asm.$l.apply(null, arguments)
                },
                to = g._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function() {
                    return g.asm.am.apply(null, arguments)
                },
                uo = g._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function() {
                    return g.asm.bm.apply(null, arguments)
                },
                vo = g._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function() {
                    return g.asm.cm.apply(null, arguments)
                },
                wo = g._emscripten_bind_btKinematicCharacterController_updateAction_2 = function() {
                    return g.asm.dm.apply(null, arguments)
                },
                xo = g._emscripten_bind_btKinematicCharacterController_warp_1 = function() {
                    return g.asm.em.apply(null, arguments)
                },
                yo = g._emscripten_bind_btManifoldPoint___destroy___0 = function() {
                    return g.asm.fm.apply(null, arguments)
                },
                zo = g._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 =
                function() {
                    return g.asm.gm.apply(null, arguments)
                },
                Ao = g._emscripten_bind_btManifoldPoint_getDistance_0 = function() {
                    return g.asm.hm.apply(null, arguments)
                },
                Bo = g._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function() {
                    return g.asm.im.apply(null, arguments)
                },
                Co = g._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function() {
                    return g.asm.jm.apply(null, arguments)
                },
                Do = g._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function() {
                    return g.asm.km.apply(null, arguments)
                },
                Eo = g._emscripten_bind_btManifoldPoint_get_m_localPointB_0 =
                function() {
                    return g.asm.lm.apply(null, arguments)
                },
                Fo = g._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function() {
                    return g.asm.mm.apply(null, arguments)
                },
                Go = g._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function() {
                    return g.asm.nm.apply(null, arguments)
                },
                Ho = g._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function() {
                    return g.asm.om.apply(null, arguments)
                },
                Io = g._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function() {
                    return g.asm.pm.apply(null, arguments)
                },
                Jo = g._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function() {
                    return g.asm.qm.apply(null, arguments)
                },
                Ko = g._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function() {
                    return g.asm.rm.apply(null, arguments)
                },
                Lo = g._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function() {
                    return g.asm.sm.apply(null, arguments)
                },
                Mo = g._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function() {
                    return g.asm.tm.apply(null, arguments)
                },
                No = g._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 =
                function() {
                    return g.asm.um.apply(null, arguments)
                },
                Oo = g._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function() {
                    return g.asm.vm.apply(null, arguments)
                },
                Po = g._emscripten_bind_btMatrix3x3___destroy___0 = function() {
                    return g.asm.wm.apply(null, arguments)
                },
                Qo = g._emscripten_bind_btMatrix3x3_getRotation_1 = function() {
                    return g.asm.xm.apply(null, arguments)
                },
                Ro = g._emscripten_bind_btMatrix3x3_getRow_1 = function() {
                    return g.asm.ym.apply(null, arguments)
                },
                So = g._emscripten_bind_btMatrix3x3_setEulerZYX_3 =
                function() {
                    return g.asm.zm.apply(null, arguments)
                },
                To = g._emscripten_bind_btMotionState___destroy___0 = function() {
                    return g.asm.Am.apply(null, arguments)
                },
                Uo = g._emscripten_bind_btMotionState_getWorldTransform_1 = function() {
                    return g.asm.Bm.apply(null, arguments)
                },
                Vo = g._emscripten_bind_btMotionState_setWorldTransform_1 = function() {
                    return g.asm.Cm.apply(null, arguments)
                },
                Wo = g._emscripten_bind_btMultiSphereShape___destroy___0 = function() {
                    return g.asm.Dm.apply(null, arguments)
                },
                Xo = g._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 =
                function() {
                    return g.asm.Em.apply(null, arguments)
                },
                Yo = g._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function() {
                    return g.asm.Fm.apply(null, arguments)
                },
                Zo = g._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function() {
                    return g.asm.Gm.apply(null, arguments)
                },
                $o = g._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function() {
                    return g.asm.Hm.apply(null, arguments)
                },
                ap = g._emscripten_bind_btOverlappingPairCache___destroy___0 = function() {
                    return g.asm.Im.apply(null, arguments)
                },
                bp = g._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 =
                function() {
                    return g.asm.Jm.apply(null, arguments)
                },
                cp = g._emscripten_bind_btOverlappingPairCache_removeOverlappingPairsContainingProxy_2 = function() {
                    return g.asm.Km.apply(null, arguments)
                },
                dp = g._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function() {
                    return g.asm.Lm.apply(null, arguments)
                },
                ep = g._emscripten_bind_btOverlappingPairCallback___destroy___0 = function() {
                    return g.asm.Mm.apply(null, arguments)
                },
                fp = g._emscripten_bind_btPairCachingGhostObject___destroy___0 = function() {
                    return g.asm.Nm.apply(null,
                        arguments)
                },
                gp = g._emscripten_bind_btPairCachingGhostObject_activate_0 = function() {
                    return g.asm.Om.apply(null, arguments)
                },
                hp = g._emscripten_bind_btPairCachingGhostObject_activate_1 = function() {
                    return g.asm.Pm.apply(null, arguments)
                },
                ip = g._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function() {
                    return g.asm.Qm.apply(null, arguments)
                },
                jp = g._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function() {
                    return g.asm.Rm.apply(null, arguments)
                },
                kp = g._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 =
                function() {
                    return g.asm.Sm.apply(null, arguments)
                },
                lp = g._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function() {
                    return g.asm.Tm.apply(null, arguments)
                },
                mp = g._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function() {
                    return g.asm.Um.apply(null, arguments)
                },
                np = g._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function() {
                    return g.asm.Vm.apply(null, arguments)
                },
                op = g._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function() {
                    return g.asm.Wm.apply(null,
                        arguments)
                },
                pp = g._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function() {
                    return g.asm.Xm.apply(null, arguments)
                },
                qp = g._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function() {
                    return g.asm.Ym.apply(null, arguments)
                },
                rp = g._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function() {
                    return g.asm.Zm.apply(null, arguments)
                },
                sp = g._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function() {
                    return g.asm._m.apply(null, arguments)
                },
                tp = g._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 =
                function() {
                    return g.asm.$m.apply(null, arguments)
                },
                up = g._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function() {
                    return g.asm.an.apply(null, arguments)
                },
                vp = g._emscripten_bind_btPairCachingGhostObject_isActive_0 = function() {
                    return g.asm.bn.apply(null, arguments)
                },
                wp = g._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function() {
                    return g.asm.cn.apply(null, arguments)
                },
                xp = g._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function() {
                    return g.asm.dn.apply(null, arguments)
                },
                yp = g._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function() {
                    return g.asm.en.apply(null, arguments)
                },
                zp = g._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function() {
                    return g.asm.fn.apply(null, arguments)
                },
                Ap = g._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function() {
                    return g.asm.gn.apply(null, arguments)
                },
                Bp = g._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function() {
                    return g.asm.hn.apply(null, arguments)
                },
                Cp = g._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 =
                function() {
                    return g.asm.jn.apply(null, arguments)
                },
                Dp = g._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function() {
                    return g.asm.kn.apply(null, arguments)
                },
                Ep = g._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function() {
                    return g.asm.ln.apply(null, arguments)
                },
                Fp = g._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.mn.apply(null, arguments)
                },
                Gp = g._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function() {
                    return g.asm.nn.apply(null,
                        arguments)
                },
                Hp = g._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function() {
                    return g.asm.on.apply(null, arguments)
                },
                Ip = g._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function() {
                    return g.asm.pn.apply(null, arguments)
                },
                Jp = g._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function() {
                    return g.asm.qn.apply(null, arguments)
                },
                Kp = g._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function() {
                    return g.asm.rn.apply(null, arguments)
                },
                Lp = g._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 =
                function() {
                    return g.asm.sn.apply(null, arguments)
                },
                Mp = g._emscripten_bind_btPersistentManifold___destroy___0 = function() {
                    return g.asm.tn.apply(null, arguments)
                },
                Np = g._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function() {
                    return g.asm.un.apply(null, arguments)
                },
                Op = g._emscripten_bind_btPersistentManifold_getBody0_0 = function() {
                    return g.asm.vn.apply(null, arguments)
                },
                Pp = g._emscripten_bind_btPersistentManifold_getBody1_0 = function() {
                    return g.asm.wn.apply(null, arguments)
                },
                Qp = g._emscripten_bind_btPersistentManifold_getContactPoint_1 =
                function() {
                    return g.asm.xn.apply(null, arguments)
                },
                Rp = g._emscripten_bind_btPersistentManifold_getNumContacts_0 = function() {
                    return g.asm.yn.apply(null, arguments)
                },
                Sp = g._emscripten_bind_btPoint2PointConstraint___destroy___0 = function() {
                    return g.asm.zn.apply(null, arguments)
                },
                Tp = g._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function() {
                    return g.asm.An.apply(null, arguments)
                },
                Up = g._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function() {
                    return g.asm.Bn.apply(null,
                        arguments)
                },
                Vp = g._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function() {
                    return g.asm.Cn.apply(null, arguments)
                },
                Wp = g._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Dn.apply(null, arguments)
                },
                Xp = g._emscripten_bind_btPoint2PointConstraint_getParam_2 = function() {
                    return g.asm.En.apply(null, arguments)
                },
                Yp = g._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function() {
                    return g.asm.Fn.apply(null, arguments)
                },
                Zp = g._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 =
                function() {
                    return g.asm.Gn.apply(null, arguments)
                },
                $p = g._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function() {
                    return g.asm.Hn.apply(null, arguments)
                },
                aq = g._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.In.apply(null, arguments)
                },
                bq = g._emscripten_bind_btPoint2PointConstraint_setParam_3 = function() {
                    return g.asm.Jn.apply(null, arguments)
                },
                cq = g._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function() {
                    return g.asm.Kn.apply(null, arguments)
                },
                dq = g._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function() {
                    return g.asm.Ln.apply(null, arguments)
                },
                eq = g._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function() {
                    return g.asm.Mn.apply(null, arguments)
                },
                fq = g._emscripten_bind_btQuadWord___destroy___0 = function() {
                    return g.asm.Nn.apply(null, arguments)
                },
                gq = g._emscripten_bind_btQuadWord_setW_1 = function() {
                    return g.asm.On.apply(null, arguments)
                },
                hq = g._emscripten_bind_btQuadWord_setX_1 = function() {
                    return g.asm.Pn.apply(null, arguments)
                },
                iq = g._emscripten_bind_btQuadWord_setY_1 =
                function() {
                    return g.asm.Qn.apply(null, arguments)
                },
                jq = g._emscripten_bind_btQuadWord_setZ_1 = function() {
                    return g.asm.Rn.apply(null, arguments)
                },
                kq = g._emscripten_bind_btQuadWord_w_0 = function() {
                    return g.asm.Sn.apply(null, arguments)
                },
                lq = g._emscripten_bind_btQuadWord_x_0 = function() {
                    return g.asm.Tn.apply(null, arguments)
                },
                mq = g._emscripten_bind_btQuadWord_y_0 = function() {
                    return g.asm.Un.apply(null, arguments)
                },
                nq = g._emscripten_bind_btQuadWord_z_0 = function() {
                    return g.asm.Vn.apply(null, arguments)
                },
                oq = g._emscripten_bind_btQuaternion___destroy___0 =
                function() {
                    return g.asm.Wn.apply(null, arguments)
                },
                pq = g._emscripten_bind_btQuaternion_angleShortestPath_1 = function() {
                    return g.asm.Xn.apply(null, arguments)
                },
                qq = g._emscripten_bind_btQuaternion_angle_1 = function() {
                    return g.asm.Yn.apply(null, arguments)
                },
                rq = g._emscripten_bind_btQuaternion_btQuaternion_4 = function() {
                    return g.asm.Zn.apply(null, arguments)
                },
                sq = g._emscripten_bind_btQuaternion_dot_1 = function() {
                    return g.asm._n.apply(null, arguments)
                },
                tq = g._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function() {
                    return g.asm.$n.apply(null,
                        arguments)
                },
                uq = g._emscripten_bind_btQuaternion_getAngle_0 = function() {
                    return g.asm.ao.apply(null, arguments)
                },
                vq = g._emscripten_bind_btQuaternion_getAxis_0 = function() {
                    return g.asm.bo.apply(null, arguments)
                },
                wq = g._emscripten_bind_btQuaternion_inverse_0 = function() {
                    return g.asm.co.apply(null, arguments)
                },
                xq = g._emscripten_bind_btQuaternion_length2_0 = function() {
                    return g.asm.eo.apply(null, arguments)
                },
                yq = g._emscripten_bind_btQuaternion_length_0 = function() {
                    return g.asm.fo.apply(null, arguments)
                },
                zq = g._emscripten_bind_btQuaternion_normalize_0 =
                function() {
                    return g.asm.go.apply(null, arguments)
                },
                Aq = g._emscripten_bind_btQuaternion_normalized_0 = function() {
                    return g.asm.ho.apply(null, arguments)
                },
                Bq = g._emscripten_bind_btQuaternion_op_add_1 = function() {
                    return g.asm.io.apply(null, arguments)
                },
                Cq = g._emscripten_bind_btQuaternion_op_div_1 = function() {
                    return g.asm.jo.apply(null, arguments)
                },
                Dq = g._emscripten_bind_btQuaternion_op_mul_1 = function() {
                    return g.asm.ko.apply(null, arguments)
                },
                Eq = g._emscripten_bind_btQuaternion_op_mulq_1 = function() {
                    return g.asm.lo.apply(null,
                        arguments)
                },
                Fq = g._emscripten_bind_btQuaternion_op_sub_1 = function() {
                    return g.asm.mo.apply(null, arguments)
                },
                Gq = g._emscripten_bind_btQuaternion_setEulerZYX_3 = function() {
                    return g.asm.no.apply(null, arguments)
                },
                Hq = g._emscripten_bind_btQuaternion_setRotation_2 = function() {
                    return g.asm.oo.apply(null, arguments)
                },
                Iq = g._emscripten_bind_btQuaternion_setValue_4 = function() {
                    return g.asm.po.apply(null, arguments)
                },
                Jq = g._emscripten_bind_btQuaternion_setW_1 = function() {
                    return g.asm.qo.apply(null, arguments)
                },
                Kq = g._emscripten_bind_btQuaternion_setX_1 =
                function() {
                    return g.asm.ro.apply(null, arguments)
                },
                Lq = g._emscripten_bind_btQuaternion_setY_1 = function() {
                    return g.asm.so.apply(null, arguments)
                },
                Mq = g._emscripten_bind_btQuaternion_setZ_1 = function() {
                    return g.asm.to.apply(null, arguments)
                },
                Nq = g._emscripten_bind_btQuaternion_w_0 = function() {
                    return g.asm.uo.apply(null, arguments)
                },
                Oq = g._emscripten_bind_btQuaternion_x_0 = function() {
                    return g.asm.vo.apply(null, arguments)
                },
                Pq = g._emscripten_bind_btQuaternion_y_0 = function() {
                    return g.asm.wo.apply(null, arguments)
                },
                Qq = g._emscripten_bind_btQuaternion_z_0 = function() {
                    return g.asm.xo.apply(null, arguments)
                },
                Rq = g._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function() {
                    return g.asm.yo.apply(null, arguments)
                },
                Sq = g._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function() {
                    return g.asm.zo.apply(null, arguments)
                },
                Tq = g._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function() {
                    return g.asm.Ao.apply(null, arguments)
                },
                Uq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 =
                function() {
                    return g.asm.Bo.apply(null, arguments)
                },
                Vq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function() {
                    return g.asm.Co.apply(null, arguments)
                },
                Wq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function() {
                    return g.asm.Do.apply(null, arguments)
                },
                Xq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function() {
                    return g.asm.Eo.apply(null, arguments)
                },
                Yq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 =
                function() {
                    return g.asm.Fo.apply(null, arguments)
                },
                Zq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function() {
                    return g.asm.Go.apply(null, arguments)
                },
                $q = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function() {
                    return g.asm.Ho.apply(null, arguments)
                },
                ar = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function() {
                    return g.asm.Io.apply(null, arguments)
                },
                br = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function() {
                    return g.asm.Jo.apply(null,
                        arguments)
                },
                cr = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function() {
                    return g.asm.Ko.apply(null, arguments)
                },
                dr = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function() {
                    return g.asm.Lo.apply(null, arguments)
                },
                er = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function() {
                    return g.asm.Mo.apply(null, arguments)
                },
                fr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function() {
                    return g.asm.No.apply(null,
                        arguments)
                },
                gr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function() {
                    return g.asm.Oo.apply(null, arguments)
                },
                hr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function() {
                    return g.asm.Po.apply(null, arguments)
                },
                ir = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function() {
                    return g.asm.Qo.apply(null, arguments)
                },
                jr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 =
                function() {
                    return g.asm.Ro.apply(null, arguments)
                },
                kr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function() {
                    return g.asm.So.apply(null, arguments)
                },
                lr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = function() {
                    return g.asm.To.apply(null, arguments)
                },
                mr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function() {
                    return g.asm.Uo.apply(null, arguments)
                },
                nr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function() {
                    return g.asm.Vo.apply(null,
                        arguments)
                },
                or = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function() {
                    return g.asm.Wo.apply(null, arguments)
                },
                pr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function() {
                    return g.asm.Xo.apply(null, arguments)
                },
                qr = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function() {
                    return g.asm.Yo.apply(null, arguments)
                },
                rr = g._emscripten_bind_btRigidBody___destroy___0 = function() {
                    return g.asm.Zo.apply(null, arguments)
                },
                sr = g._emscripten_bind_btRigidBody_activate_0 =
                function() {
                    return g.asm._o.apply(null, arguments)
                },
                tr = g._emscripten_bind_btRigidBody_activate_1 = function() {
                    return g.asm.$o.apply(null, arguments)
                },
                ur = g._emscripten_bind_btRigidBody_applyCentralForce_1 = function() {
                    return g.asm.ap.apply(null, arguments)
                },
                vr = g._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function() {
                    return g.asm.bp.apply(null, arguments)
                },
                wr = g._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function() {
                    return g.asm.cp.apply(null, arguments)
                },
                xr = g._emscripten_bind_btRigidBody_applyForce_2 =
                function() {
                    return g.asm.dp.apply(null, arguments)
                },
                yr = g._emscripten_bind_btRigidBody_applyGravity_0 = function() {
                    return g.asm.ep.apply(null, arguments)
                },
                zr = g._emscripten_bind_btRigidBody_applyImpulse_2 = function() {
                    return g.asm.fp.apply(null, arguments)
                },
                Ar = g._emscripten_bind_btRigidBody_applyLocalTorque_1 = function() {
                    return g.asm.gp.apply(null, arguments)
                },
                Br = g._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function() {
                    return g.asm.hp.apply(null, arguments)
                },
                Cr = g._emscripten_bind_btRigidBody_applyTorque_1 =
                function() {
                    return g.asm.ip.apply(null, arguments)
                },
                Dr = g._emscripten_bind_btRigidBody_btRigidBody_1 = function() {
                    return g.asm.jp.apply(null, arguments)
                },
                Er = g._emscripten_bind_btRigidBody_forceActivationState_1 = function() {
                    return g.asm.kp.apply(null, arguments)
                },
                Fr = g._emscripten_bind_btRigidBody_getAabb_2 = function() {
                    return g.asm.lp.apply(null, arguments)
                },
                Gr = g._emscripten_bind_btRigidBody_getAngularDamping_0 = function() {
                    return g.asm.mp.apply(null, arguments)
                },
                Hr = g._emscripten_bind_btRigidBody_getAngularFactor_0 =
                function() {
                    return g.asm.np.apply(null, arguments)
                },
                Ir = g._emscripten_bind_btRigidBody_getAngularVelocity_0 = function() {
                    return g.asm.op.apply(null, arguments)
                },
                Jr = g._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function() {
                    return g.asm.pp.apply(null, arguments)
                },
                Kr = g._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function() {
                    return g.asm.qp.apply(null, arguments)
                },
                Lr = g._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function() {
                    return g.asm.rp.apply(null, arguments)
                },
                Mr = g._emscripten_bind_btRigidBody_getCollisionFlags_0 =
                function() {
                    return g.asm.sp.apply(null, arguments)
                },
                Nr = g._emscripten_bind_btRigidBody_getCollisionShape_0 = function() {
                    return g.asm.tp.apply(null, arguments)
                },
                Or = g._emscripten_bind_btRigidBody_getFlags_0 = function() {
                    return g.asm.up.apply(null, arguments)
                },
                Pr = g._emscripten_bind_btRigidBody_getFriction_0 = function() {
                    return g.asm.vp.apply(null, arguments)
                },
                Qr = g._emscripten_bind_btRigidBody_getGravity_0 = function() {
                    return g.asm.wp.apply(null, arguments)
                },
                Rr = g._emscripten_bind_btRigidBody_getLinearDamping_0 = function() {
                    return g.asm.xp.apply(null,
                        arguments)
                },
                Sr = g._emscripten_bind_btRigidBody_getLinearFactor_0 = function() {
                    return g.asm.yp.apply(null, arguments)
                },
                Tr = g._emscripten_bind_btRigidBody_getLinearVelocity_0 = function() {
                    return g.asm.zp.apply(null, arguments)
                },
                Ur = g._emscripten_bind_btRigidBody_getMotionState_0 = function() {
                    return g.asm.Ap.apply(null, arguments)
                },
                Vr = g._emscripten_bind_btRigidBody_getRestitution_0 = function() {
                    return g.asm.Bp.apply(null, arguments)
                },
                Wr = g._emscripten_bind_btRigidBody_getRollingFriction_0 = function() {
                    return g.asm.Cp.apply(null,
                        arguments)
                },
                Xr = g._emscripten_bind_btRigidBody_getUserIndex_0 = function() {
                    return g.asm.Dp.apply(null, arguments)
                },
                Yr = g._emscripten_bind_btRigidBody_getUserPointer_0 = function() {
                    return g.asm.Ep.apply(null, arguments)
                },
                Zr = g._emscripten_bind_btRigidBody_getWorldTransform_0 = function() {
                    return g.asm.Fp.apply(null, arguments)
                },
                $r = g._emscripten_bind_btRigidBody_isActive_0 = function() {
                    return g.asm.Gp.apply(null, arguments)
                },
                as = g._emscripten_bind_btRigidBody_isKinematicObject_0 = function() {
                    return g.asm.Hp.apply(null,
                        arguments)
                },
                bs = g._emscripten_bind_btRigidBody_isStaticObject_0 = function() {
                    return g.asm.Ip.apply(null, arguments)
                },
                cs = g._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function() {
                    return g.asm.Jp.apply(null, arguments)
                },
                ds = g._emscripten_bind_btRigidBody_setActivationState_1 = function() {
                    return g.asm.Kp.apply(null, arguments)
                },
                es = g._emscripten_bind_btRigidBody_setAngularFactor_1 = function() {
                    return g.asm.Lp.apply(null, arguments)
                },
                gs = g._emscripten_bind_btRigidBody_setAngularVelocity_1 = function() {
                    return g.asm.Mp.apply(null,
                        arguments)
                },
                hs = g._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function() {
                    return g.asm.Np.apply(null, arguments)
                },
                is = g._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function() {
                    return g.asm.Op.apply(null, arguments)
                },
                js = g._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.Pp.apply(null, arguments)
                },
                ks = g._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function() {
                    return g.asm.Qp.apply(null, arguments)
                },
                ls = g._emscripten_bind_btRigidBody_setCollisionFlags_1 =
                function() {
                    return g.asm.Rp.apply(null, arguments)
                },
                ms = g._emscripten_bind_btRigidBody_setCollisionShape_1 = function() {
                    return g.asm.Sp.apply(null, arguments)
                },
                ns = g._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function() {
                    return g.asm.Tp.apply(null, arguments)
                },
                ps = g._emscripten_bind_btRigidBody_setDamping_2 = function() {
                    return g.asm.Up.apply(null, arguments)
                },
                qs = g._emscripten_bind_btRigidBody_setFlags_1 = function() {
                    return g.asm.Vp.apply(null, arguments)
                },
                rs = g._emscripten_bind_btRigidBody_setFriction_1 =
                function() {
                    return g.asm.Wp.apply(null, arguments)
                },
                ss = g._emscripten_bind_btRigidBody_setGravity_1 = function() {
                    return g.asm.Xp.apply(null, arguments)
                },
                ts = g._emscripten_bind_btRigidBody_setLinearFactor_1 = function() {
                    return g.asm.Yp.apply(null, arguments)
                },
                us = g._emscripten_bind_btRigidBody_setLinearVelocity_1 = function() {
                    return g.asm.Zp.apply(null, arguments)
                },
                vs = g._emscripten_bind_btRigidBody_setMassProps_2 = function() {
                    return g.asm._p.apply(null, arguments)
                },
                xs = g._emscripten_bind_btRigidBody_setMotionState_1 =
                function() {
                    return g.asm.$p.apply(null, arguments)
                },
                ys = g._emscripten_bind_btRigidBody_setRestitution_1 = function() {
                    return g.asm.aq.apply(null, arguments)
                },
                zs = g._emscripten_bind_btRigidBody_setRollingFriction_1 = function() {
                    return g.asm.bq.apply(null, arguments)
                },
                As = g._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function() {
                    return g.asm.cq.apply(null, arguments)
                },
                Bs = g._emscripten_bind_btRigidBody_setUserIndex_1 = function() {
                    return g.asm.dq.apply(null, arguments)
                },
                Cs = g._emscripten_bind_btRigidBody_setUserPointer_1 =
                function() {
                    return g.asm.eq.apply(null, arguments)
                },
                Ds = g._emscripten_bind_btRigidBody_setWorldTransform_1 = function() {
                    return g.asm.fq.apply(null, arguments)
                },
                Es = g._emscripten_bind_btRigidBody_upcast_1 = function() {
                    return g.asm.gq.apply(null, arguments)
                },
                Fs = g._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function() {
                    return g.asm.hq.apply(null, arguments)
                },
                Gs = g._emscripten_bind_btScalarArray___destroy___0 = function() {
                    return g.asm.iq.apply(null, arguments)
                },
                Hs = g._emscripten_bind_btScalarArray_at_1 = function() {
                    return g.asm.jq.apply(null,
                        arguments)
                },
                Is = g._emscripten_bind_btScalarArray_size_0 = function() {
                    return g.asm.kq.apply(null, arguments)
                },
                Js = g._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function() {
                    return g.asm.lq.apply(null, arguments)
                },
                Ks = g._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = function() {
                    return g.asm.mq.apply(null, arguments)
                },
                Ls = g._emscripten_bind_btShapeHull___destroy___0 = function() {
                    return g.asm.nq.apply(null, arguments)
                },
                Ms = g._emscripten_bind_btShapeHull_btShapeHull_1 =
                function() {
                    return g.asm.oq.apply(null, arguments)
                },
                Ns = g._emscripten_bind_btShapeHull_buildHull_1 = function() {
                    return g.asm.pq.apply(null, arguments)
                },
                Os = g._emscripten_bind_btShapeHull_getVertexPointer_0 = function() {
                    return g.asm.qq.apply(null, arguments)
                },
                Ps = g._emscripten_bind_btShapeHull_numVertices_0 = function() {
                    return g.asm.rq.apply(null, arguments)
                },
                Qs = g._emscripten_bind_btSliderConstraint___destroy___0 = function() {
                    return g.asm.sq.apply(null, arguments)
                },
                Rs = g._emscripten_bind_btSliderConstraint_btSliderConstraint_3 =
                function() {
                    return g.asm.tq.apply(null, arguments)
                },
                Ss = g._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function() {
                    return g.asm.uq.apply(null, arguments)
                },
                Ts = g._emscripten_bind_btSliderConstraint_enableFeedback_1 = function() {
                    return g.asm.vq.apply(null, arguments)
                },
                Us = g._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.wq.apply(null, arguments)
                },
                Vs = g._emscripten_bind_btSliderConstraint_getParam_2 = function() {
                    return g.asm.xq.apply(null, arguments)
                },
                Ws = g._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.yq.apply(null, arguments)
                },
                Xs = g._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function() {
                    return g.asm.zq.apply(null, arguments)
                },
                Ys = g._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function() {
                    return g.asm.Aq.apply(null, arguments)
                },
                Zs = g._emscripten_bind_btSliderConstraint_setParam_3 = function() {
                    return g.asm.Bq.apply(null, arguments)
                },
                $s = g._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function() {
                    return g.asm.Cq.apply(null, arguments)
                },
                at = g._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 =
                function() {
                    return g.asm.Dq.apply(null, arguments)
                },
                bt = g._emscripten_bind_btSphereShape___destroy___0 = function() {
                    return g.asm.Eq.apply(null, arguments)
                },
                ct = g._emscripten_bind_btSphereShape_btSphereShape_1 = function() {
                    return g.asm.Fq.apply(null, arguments)
                },
                dt = g._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function() {
                    return g.asm.Gq.apply(null, arguments)
                },
                et = g._emscripten_bind_btSphereShape_getLocalScaling_0 = function() {
                    return g.asm.Hq.apply(null, arguments)
                },
                ft = g._emscripten_bind_btSphereShape_getMargin_0 =
                function() {
                    return g.asm.Iq.apply(null, arguments)
                },
                gt = g._emscripten_bind_btSphereShape_setLocalScaling_1 = function() {
                    return g.asm.Jq.apply(null, arguments)
                },
                ht = g._emscripten_bind_btSphereShape_setMargin_1 = function() {
                    return g.asm.Kq.apply(null, arguments)
                },
                it = g._emscripten_bind_btStaticPlaneShape___destroy___0 = function() {
                    return g.asm.Lq.apply(null, arguments)
                },
                jt = g._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function() {
                    return g.asm.Mq.apply(null, arguments)
                },
                kt = g._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 =
                function() {
                    return g.asm.Nq.apply(null, arguments)
                },
                lt = g._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function() {
                    return g.asm.Oq.apply(null, arguments)
                },
                mt = g._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function() {
                    return g.asm.Pq.apply(null, arguments)
                },
                nt = g._emscripten_bind_btStridingMeshInterface___destroy___0 = function() {
                    return g.asm.Qq.apply(null, arguments)
                },
                ot = g._emscripten_bind_btStridingMeshInterface_setScaling_1 = function() {
                    return g.asm.Rq.apply(null, arguments)
                },
                pt = g._emscripten_bind_btTransform___destroy___0 =
                function() {
                    return g.asm.Sq.apply(null, arguments)
                },
                qt = g._emscripten_bind_btTransform_btTransform_0 = function() {
                    return g.asm.Tq.apply(null, arguments)
                },
                rt = g._emscripten_bind_btTransform_btTransform_2 = function() {
                    return g.asm.Uq.apply(null, arguments)
                },
                st = g._emscripten_bind_btTransform_getBasis_0 = function() {
                    return g.asm.Vq.apply(null, arguments)
                },
                tt = g._emscripten_bind_btTransform_getOrigin_0 = function() {
                    return g.asm.Wq.apply(null, arguments)
                },
                ut = g._emscripten_bind_btTransform_getRotation_0 = function() {
                    return g.asm.Xq.apply(null,
                        arguments)
                },
                vt = g._emscripten_bind_btTransform_inverse_0 = function() {
                    return g.asm.Yq.apply(null, arguments)
                },
                wt = g._emscripten_bind_btTransform_op_mul_1 = function() {
                    return g.asm.Zq.apply(null, arguments)
                },
                xt = g._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function() {
                    return g.asm._q.apply(null, arguments)
                },
                yt = g._emscripten_bind_btTransform_setIdentity_0 = function() {
                    return g.asm.$q.apply(null, arguments)
                },
                zt = g._emscripten_bind_btTransform_setOrigin_1 = function() {
                    return g.asm.ar.apply(null, arguments)
                },
                At =
                g._emscripten_bind_btTransform_setRotation_1 = function() {
                    return g.asm.br.apply(null, arguments)
                },
                Bt = g._emscripten_bind_btTriangleMeshShape___destroy___0 = function() {
                    return g.asm.cr.apply(null, arguments)
                },
                Ct = g._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function() {
                    return g.asm.dr.apply(null, arguments)
                },
                Dt = g._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.er.apply(null, arguments)
                },
                Et = g._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.fr.apply(null,
                        arguments)
                },
                Ft = g._emscripten_bind_btTriangleMesh___destroy___0 = function() {
                    return g.asm.gr.apply(null, arguments)
                },
                Gt = g._emscripten_bind_btTriangleMesh_addIndex_1 = function() {
                    return g.asm.hr.apply(null, arguments)
                },
                Ht = g._emscripten_bind_btTriangleMesh_addTriangle_3 = function() {
                    return g.asm.ir.apply(null, arguments)
                },
                It = g._emscripten_bind_btTriangleMesh_addTriangle_4 = function() {
                    return g.asm.jr.apply(null, arguments)
                },
                Jt = g._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function() {
                    return g.asm.kr.apply(null,
                        arguments)
                },
                Kt = g._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function() {
                    return g.asm.lr.apply(null, arguments)
                },
                Lt = g._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function() {
                    return g.asm.mr.apply(null, arguments)
                },
                Mt = g._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function() {
                    return g.asm.nr.apply(null, arguments)
                },
                Nt = g._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = function() {
                    return g.asm.or.apply(null, arguments)
                },
                Ot = g._emscripten_bind_btTriangleMesh_setScaling_1 = function() {
                    return g.asm.pr.apply(null,
                        arguments)
                },
                Pt = g._emscripten_bind_btTypedConstraint___destroy___0 = function() {
                    return g.asm.qr.apply(null, arguments)
                },
                Qt = g._emscripten_bind_btTypedConstraint_enableFeedback_1 = function() {
                    return g.asm.rr.apply(null, arguments)
                },
                Rt = g._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.sr.apply(null, arguments)
                },
                St = g._emscripten_bind_btTypedConstraint_getParam_2 = function() {
                    return g.asm.tr.apply(null, arguments)
                },
                Tt = g._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.ur.apply(null, arguments)
                },
                Ut = g._emscripten_bind_btTypedConstraint_setParam_3 = function() {
                    return g.asm.vr.apply(null, arguments)
                },
                Vt = g._emscripten_bind_btVector3Array___destroy___0 = function() {
                    return g.asm.wr.apply(null, arguments)
                },
                Wt = g._emscripten_bind_btVector3Array_at_1 = function() {
                    return g.asm.xr.apply(null, arguments)
                },
                Xt = g._emscripten_bind_btVector3Array_size_0 = function() {
                    return g.asm.yr.apply(null, arguments)
                },
                Yt = g._emscripten_bind_btVector3___destroy___0 = function() {
                    return g.asm.zr.apply(null,
                        arguments)
                },
                Zt = g._emscripten_bind_btVector3_btVector3_0 = function() {
                    return g.asm.Ar.apply(null, arguments)
                },
                $t = g._emscripten_bind_btVector3_btVector3_3 = function() {
                    return g.asm.Br.apply(null, arguments)
                },
                au = g._emscripten_bind_btVector3_dot_1 = function() {
                    return g.asm.Cr.apply(null, arguments)
                },
                bu = g._emscripten_bind_btVector3_length2_0 = function() {
                    return g.asm.Dr.apply(null, arguments)
                },
                cu = g._emscripten_bind_btVector3_length_0 = function() {
                    return g.asm.Er.apply(null, arguments)
                },
                du = g._emscripten_bind_btVector3_normalize_0 =
                function() {
                    return g.asm.Fr.apply(null, arguments)
                },
                eu = g._emscripten_bind_btVector3_op_add_1 = function() {
                    return g.asm.Gr.apply(null, arguments)
                },
                fu = g._emscripten_bind_btVector3_op_mul_1 = function() {
                    return g.asm.Hr.apply(null, arguments)
                },
                gu = g._emscripten_bind_btVector3_op_sub_1 = function() {
                    return g.asm.Ir.apply(null, arguments)
                },
                hu = g._emscripten_bind_btVector3_rotate_2 = function() {
                    return g.asm.Jr.apply(null, arguments)
                },
                iu = g._emscripten_bind_btVector3_setValue_3 = function() {
                    return g.asm.Kr.apply(null, arguments)
                },
                ju = g._emscripten_bind_btVector3_setX_1 = function() {
                    return g.asm.Lr.apply(null, arguments)
                },
                ku = g._emscripten_bind_btVector3_setY_1 = function() {
                    return g.asm.Mr.apply(null, arguments)
                },
                lu = g._emscripten_bind_btVector3_setZ_1 = function() {
                    return g.asm.Nr.apply(null, arguments)
                },
                mu = g._emscripten_bind_btVector3_x_0 = function() {
                    return g.asm.Or.apply(null, arguments)
                },
                nu = g._emscripten_bind_btVector3_y_0 = function() {
                    return g.asm.Pr.apply(null, arguments)
                },
                ou = g._emscripten_bind_btVector3_z_0 = function() {
                    return g.asm.Qr.apply(null,
                        arguments)
                },
                pu = g._emscripten_bind_btVector4___destroy___0 = function() {
                    return g.asm.Rr.apply(null, arguments)
                },
                qu = g._emscripten_bind_btVector4_btVector4_0 = function() {
                    return g.asm.Sr.apply(null, arguments)
                },
                ru = g._emscripten_bind_btVector4_btVector4_4 = function() {
                    return g.asm.Tr.apply(null, arguments)
                },
                su = g._emscripten_bind_btVector4_dot_1 = function() {
                    return g.asm.Ur.apply(null, arguments)
                },
                tu = g._emscripten_bind_btVector4_length2_0 = function() {
                    return g.asm.Vr.apply(null, arguments)
                },
                uu = g._emscripten_bind_btVector4_length_0 =
                function() {
                    return g.asm.Wr.apply(null, arguments)
                },
                vu = g._emscripten_bind_btVector4_normalize_0 = function() {
                    return g.asm.Xr.apply(null, arguments)
                },
                wu = g._emscripten_bind_btVector4_op_add_1 = function() {
                    return g.asm.Yr.apply(null, arguments)
                },
                xu = g._emscripten_bind_btVector4_op_mul_1 = function() {
                    return g.asm.Zr.apply(null, arguments)
                },
                yu = g._emscripten_bind_btVector4_op_sub_1 = function() {
                    return g.asm._r.apply(null, arguments)
                },
                zu = g._emscripten_bind_btVector4_rotate_2 = function() {
                    return g.asm.$r.apply(null, arguments)
                },
                Au = g._emscripten_bind_btVector4_setValue_4 = function() {
                    return g.asm.as.apply(null, arguments)
                },
                Bu = g._emscripten_bind_btVector4_setX_1 = function() {
                    return g.asm.bs.apply(null, arguments)
                },
                Cu = g._emscripten_bind_btVector4_setY_1 = function() {
                    return g.asm.cs.apply(null, arguments)
                },
                Du = g._emscripten_bind_btVector4_setZ_1 = function() {
                    return g.asm.ds.apply(null, arguments)
                },
                Eu = g._emscripten_bind_btVector4_w_0 = function() {
                    return g.asm.es.apply(null, arguments)
                },
                Fu = g._emscripten_bind_btVector4_x_0 = function() {
                    return g.asm.fs.apply(null,
                        arguments)
                },
                Gu = g._emscripten_bind_btVector4_y_0 = function() {
                    return g.asm.gs.apply(null, arguments)
                },
                Hu = g._emscripten_bind_btVector4_z_0 = function() {
                    return g.asm.hs.apply(null, arguments)
                },
                Iu = g._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function() {
                    return g.asm.is.apply(null, arguments)
                },
                Ju = g._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function() {
                    return g.asm.js.apply(null, arguments)
                },
                Ku = g._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function() {
                    return g.asm.ks.apply(null, arguments)
                },
                Lu = g._emscripten_enum_PHY_ScalarType_PHY_INTEGER =
                function() {
                    return g.asm.ls.apply(null, arguments)
                },
                Mu = g._emscripten_enum_PHY_ScalarType_PHY_SHORT = function() {
                    return g.asm.ms.apply(null, arguments)
                },
                Nu = g._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function() {
                    return g.asm.ns.apply(null, arguments)
                },
                Ou = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function() {
                    return g.asm.os.apply(null, arguments)
                },
                Pu = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function() {
                    return g.asm.ps.apply(null, arguments)
                },
                Qu = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM =
                function() {
                    return g.asm.qs.apply(null, arguments)
                },
                Ru = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function() {
                    return g.asm.rs.apply(null, arguments)
                },
                qb = g._free = function() {
                    return g.asm.ss.apply(null, arguments)
                },
                rb = g._malloc = function() {
                    return g.asm.ts.apply(null, arguments)
                },
                cb = g.globalCtors = function() {
                    return g.asm.ws.apply(null, arguments)
                },
                Cb = g.stackRestore = function() {
                    return g.asm.xs.apply(null, arguments)
                },
                tb = g.stackSave = function() {
                    return g.asm.ys.apply(null, arguments)
                };
            g.dynCall_v = function() {
                return g.asm.us.apply(null, arguments)
            };
            g.dynCall_vi = function() {
                return g.asm.vs.apply(null, arguments)
            };
            g.asm = Db;
            g.UTF8ToString = za;
            var Su;
            g.then = function(a) {
                if (Su) a(g);
                else {
                    var c = g.onRuntimeInitialized;
                    g.onRuntimeInitialized = function() {
                        c && c();
                        a(g)
                    }
                }
                return g
            };
            Va = function Tu() {
                Su || Uu();
                Su || (Va = Tu)
            };

            function Uu() {
                function a() {
                    if (!Su && (Su = !0, !wa)) {
                        Pa = !0;
                        Ka(Ma);
                        Ka(Na);
                        if (g.onRuntimeInitialized) g.onRuntimeInitialized();
                        if (g.postRun)
                            for ("function" == typeof g.postRun && (g.postRun = [g.postRun]); g.postRun.length;) {
                                var a = g.postRun.shift();
                                Oa.unshift(a)
                            }
                        Ka(Oa)
                    }
                }
                if (!(0 < Ta)) {
                    if (g.preRun)
                        for ("function" == typeof g.preRun && (g.preRun = [g.preRun]); g.preRun.length;) Qa();
                    Ka(La);
                    0 < Ta || (g.setStatus ? (g.setStatus("Running..."), setTimeout(function() {
                        setTimeout(function() {
                            g.setStatus("")
                        }, 1);
                        a()
                    }, 1)) : a())
                }
            }
            g.run = Uu;
            if (g.preInit)
                for ("function" == typeof g.preInit && (g.preInit = [g.preInit]); 0 < g.preInit.length;) g.preInit.pop()();
            Uu();

            function k() {}
            k.prototype = Object.create(k.prototype);
            k.prototype.constructor = k;
            k.prototype.As = k;
            k.Bs = {};
            g.WrapperObject = k;

            function l(a) {
                return (a || k).Bs
            }
            g.getCache = l;

            function m(a, c) {
                var d = l(c),
                    e = d[a];
                if (e) return e;
                e = Object.create((c || k).prototype);
                e.zs = a;
                return d[a] = e
            }
            g.wrapPointer = m;
            g.castObject = function(a, c) {
                return m(a.zs, c)
            };
            g.NULL = m(0);
            g.destroy = function(a) {
                if (!a.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
                a.__destroy__();
                delete l(a.As)[a.zs]
            };
            g.compare = function(a, c) {
                return a.zs === c.zs
            };
            g.getPointer = function(a) {
                return a.zs
            };
            g.getClass = function(a) {
                return a.As
            };
            b = {
                buffer: 0,
                size: 0,
                Qs: 0,
                Ws: [],
                Ps: 0,
                Is: function() {
                    if (b.Ps) {
                        for (var a = 0; a < b.Ws.length; a++) g._free(b.Ws[a]);
                        b.Ws.length = 0;
                        g._free(b.buffer);
                        b.buffer = 0;
                        b.size += b.Ps;
                        b.Ps = 0
                    }
                    b.buffer || (b.size += 128, b.buffer = g._malloc(b.size), assert(b.buffer));
                    b.Qs = 0
                },
                Vs: function(a, c) {
                    assert(b.buffer);
                    a = a.length * c.BYTES_PER_ELEMENT;
                    a = a + 7 & -8;
                    b.Qs + a >= b.size ? (assert(0 < a), b.Ps += a, c = g._malloc(a), b.Ws.push(c)) : (c = b.buffer + b.Qs, b.Qs += a);
                    return c
                },
                copy: function(a, c, d) {
                    switch (c.BYTES_PER_ELEMENT) {
                        case 2:
                            d >>= 1;
                            break;
                        case 4:
                            d >>= 2;
                            break;
                        case 8:
                            d >>= 3
                    }
                    for (var e = 0; e < a.length; e++) c[d + e] = a[e]
                }
            };

            function Vu(a) {
                if ("string" === typeof a) {
                    a = Ab(a);
                    var c = b.Vs(a, Ea);
                    b.copy(a, Ea, c);
                    return c
                }
                return a
            }

            function Wu(a) {
                if ("object" === typeof a) {
                    var c = b.Vs(a, Fa);
                    b.copy(a, Fa, c);
                    return c
                }
                return a
            }

            function p() {
                throw "cannot construct a btCollisionShape, no constructor in IDL";
            }
            p.prototype = Object.create(k.prototype);
            p.prototype.constructor = p;
            p.prototype.As = p;
            p.Bs = {};
            g.btCollisionShape = p;
            p.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ug(c, a)
            };
            p.prototype.getLocalScaling = function() {
                return m(Sg(this.zs), q)
            };
            p.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Rg(d, a, c)
            };
            p.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vg(c, a)
            };
            p.prototype.getMargin = function() {
                return Tg(this.zs)
            };
            p.prototype.__destroy__ = function() {
                Qg(this.zs)
            };

            function t() {
                throw "cannot construct a btCollisionObject, no constructor in IDL";
            }
            t.prototype = Object.create(k.prototype);
            t.prototype.constructor = t;
            t.prototype.As = t;
            t.Bs = {};
            g.btCollisionObject = t;
            t.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Eg(d, a, c)
            };
            t.prototype.getCollisionShape = function() {
                return m(sg(this.zs), p)
            };
            t.prototype.setContactProcessingThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jg(c, a)
            };
            t.prototype.setActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Dg(c, a)
            };
            t.prototype.forceActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                pg(c, a)
            };
            t.prototype.activate = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                void 0 === a ? ng(c) : og(c, a)
            };
            t.prototype.isActive = function() {
                return !!zg(this.zs)
            };
            t.prototype.isKinematicObject = function() {
                return !!Ag(this.zs)
            };
            t.prototype.isStaticObject = function() {
                return !!Bg(this.zs)
            };
            t.prototype.isStaticOrKinematicObject = function() {
                return !!Cg(this.zs)
            };
            t.prototype.getRestitution = function() {
                return ug(this.zs)
            };
            t.prototype.getFriction = function() {
                return tg(this.zs)
            };
            t.prototype.getRollingFriction = function() {
                return vg(this.zs)
            };
            t.prototype.setRestitution = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lg(c, a)
            };
            t.prototype.setFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kg(c, a)
            };
            t.prototype.setRollingFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Mg(c, a)
            };
            t.prototype.getWorldTransform = function() {
                return m(yg(this.zs), u)
            };
            t.prototype.getCollisionFlags = function() {
                return rg(this.zs)
            };
            t.prototype.setCollisionFlags = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Hg(c, a)
            };
            t.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Pg(c, a)
            };
            t.prototype.setCollisionShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ig(c, a)
            };
            t.prototype.setCcdMotionThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fg(c, a)
            };
            t.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gg(c, a)
            };
            t.prototype.getUserIndex = function() {
                return wg(this.zs)
            };
            t.prototype.setUserIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ng(c, a)
            };
            t.prototype.getUserPointer = function() {
                return m(xg(this.zs), Xu)
            };
            t.prototype.setUserPointer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Og(c, a)
            };
            t.prototype.getBroadphaseHandle = function() {
                return m(qg(this.zs), v)
            };
            t.prototype.__destroy__ = function() {
                mg(this.zs)
            };

            function Yu() {
                throw "cannot construct a btTypedConstraint, no constructor in IDL";
            }
            Yu.prototype = Object.create(k.prototype);
            Yu.prototype.constructor = Yu;
            Yu.prototype.As = Yu;
            Yu.Bs = {};
            g.btTypedConstraint = Yu;
            Yu.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Qt(c, a)
            };
            Yu.prototype.getBreakingImpulseThreshold = function() {
                return Rt(this.zs)
            };
            Yu.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Tt(c, a)
            };
            Yu.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return St(d, a, c)
            };
            Yu.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Ut(e, a, c, d)
            };
            Yu.prototype.__destroy__ = function() {
                Pt(this.zs)
            };

            function w() {
                throw "cannot construct a btCollisionWorld, no constructor in IDL";
            }
            w.prototype = Object.create(k.prototype);
            w.prototype.constructor = w;
            w.prototype.As = w;
            w.Bs = {};
            g.btCollisionWorld = w;
            w.prototype.getDispatcher = function() {
                return m(hh(this.zs), Zu)
            };
            w.prototype.rayTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                jh(e, a, c, d)
            };
            w.prototype.getPairCache = function() {
                return m(ih(this.zs), $u)
            };
            w.prototype.getDispatchInfo = function() {
                return m(gh(this.zs), x)
            };
            w.prototype.addCollisionObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                void 0 === c ? Xg(e, a) : void 0 === d ? Yg(e, a, c) : Zg(e, a, c, d)
            };
            w.prototype.removeCollisionObject = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                kh(c, a)
            };
            w.prototype.getBroadphase = function() {
                return m(eh(this.zs), av)
            };
            w.prototype.convexSweepTest = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                bh(n, a, c, d, e, f)
            };
            w.prototype.contactPairTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                $g(e, a, c, d)
            };
            w.prototype.contactTest = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                ah(d, a, c)
            };
            w.prototype.setForceUpdateAllAabbs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mh(c, a)
            };
            w.prototype.updateSingleAabb = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                nh(c, a)
            };
            w.prototype.setDebugDrawer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                lh(c, a)
            };
            w.prototype.getDebugDrawer = function() {
                return m(fh(this.zs), bv)
            };
            w.prototype.debugDrawWorld = function() {
                dh(this.zs)
            };
            w.prototype.debugDrawObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                ch(e, a, c, d)
            };
            w.prototype.__destroy__ = function() {
                Wg(this.zs)
            };

            function cv() {
                throw "cannot construct a btConcaveShape, no constructor in IDL";
            }
            cv.prototype = Object.create(p.prototype);
            cv.prototype.constructor = cv;
            cv.prototype.As = cv;
            cv.Bs = {};
            g.btConcaveShape = cv;
            cv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gh(c, a)
            };
            cv.prototype.getLocalScaling = function() {
                return m(Fh(this.zs), q)
            };
            cv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Eh(d, a, c)
            };
            cv.prototype.__destroy__ = function() {
                Dh(this.zs)
            };

            function dv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Wf(a, c);
                l(dv)[this.zs] = this
            }
            dv.prototype = Object.create(p.prototype);
            dv.prototype.constructor = dv;
            dv.prototype.As = dv;
            dv.Bs = {};
            g.btCapsuleShape = dv;
            dv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dg(c, a)
            };
            dv.prototype.getMargin = function() {
                return $f(this.zs)
            };
            dv.prototype.getUpAxis = function() {
                return bg(this.zs)
            };
            dv.prototype.getRadius = function() {
                return ag(this.zs)
            };
            dv.prototype.getHalfHeight = function() {
                return Yf(this.zs)
            };
            dv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cg(c, a)
            };
            dv.prototype.getLocalScaling = function() {
                return m(Zf(this.zs), q)
            };
            dv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Xf(d, a, c)
            };
            dv.prototype.__destroy__ = function() {
                Vf(this.zs)
            };

            function bv() {
                throw "cannot construct a btIDebugDraw, no constructor in IDL";
            }
            bv.prototype = Object.create(k.prototype);
            bv.prototype.constructor = bv;
            bv.prototype.As = bv;
            bv.Bs = {};
            g.btIDebugDraw = bv;
            bv.prototype.drawLine = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                On(e, a, c, d)
            };
            bv.prototype.drawContactPoint = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                Nn(n, a, c, d, e, f)
            };
            bv.prototype.reportErrorWarning = function(a) {
                var c = this.zs;
                b.Is();
                a = a && "object" === typeof a ? a.zs : Vu(a);
                Qn(c, a)
            };
            bv.prototype.draw3dText = function(a, c) {
                var d = this.zs;
                b.Is();
                a && "object" === typeof a && (a = a.zs);
                c = c && "object" === typeof c ? c.zs : Vu(c);
                Mn(d, a, c)
            };
            bv.prototype.setDebugMode = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Rn(c, a)
            };
            bv.prototype.getDebugMode = function() {
                return Pn(this.zs)
            };
            bv.prototype.__destroy__ = function() {
                Ln(this.zs)
            };

            function y() {
                throw "cannot construct a btDynamicsWorld, no constructor in IDL";
            }
            y.prototype = Object.create(w.prototype);
            y.prototype.constructor = y;
            y.prototype.As = y;
            y.Bs = {};
            g.btDynamicsWorld = y;
            y.prototype.addAction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                hl(c, a)
            };
            y.prototype.removeAction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xl(c, a)
            };
            y.prototype.getSolverInfo = function() {
                return m(vl(this.zs), z)
            };
            y.prototype.getDispatcher = function() {
                return m(tl(this.zs), Zu)
            };
            y.prototype.rayTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                wl(e, a, c, d)
            };
            y.prototype.getPairCache = function() {
                return m(ul(this.zs), $u)
            };
            y.prototype.getDispatchInfo = function() {
                return m(sl(this.zs), x)
            };
            y.prototype.addCollisionObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                void 0 === c ? il(e, a) : void 0 === d ? jl(e, a, c) : kl(e, a, c, d)
            };
            y.prototype.removeCollisionObject = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                yl(c, a)
            };
            y.prototype.getBroadphase = function() {
                return m(ql(this.zs), av)
            };
            y.prototype.convexSweepTest = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                nl(n, a, c, d, e, f)
            };
            y.prototype.contactPairTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                ll(e, a, c, d)
            };
            y.prototype.contactTest = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                ml(d, a, c)
            };
            y.prototype.setForceUpdateAllAabbs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Al(c, a)
            };
            y.prototype.updateSingleAabb = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bl(c, a)
            };
            y.prototype.setDebugDrawer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zl(c, a)
            };
            y.prototype.getDebugDrawer = function() {
                return m(rl(this.zs), bv)
            };
            y.prototype.debugDrawWorld = function() {
                pl(this.zs)
            };
            y.prototype.debugDrawObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                ol(e, a, c, d)
            };
            y.prototype.__destroy__ = function() {
                gl(this.zs)
            };

            function ev() {
                throw "cannot construct a btTriangleMeshShape, no constructor in IDL";
            }
            ev.prototype = Object.create(cv.prototype);
            ev.prototype.constructor = ev;
            ev.prototype.As = ev;
            ev.Bs = {};
            g.btTriangleMeshShape = ev;
            ev.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Et(c, a)
            };
            ev.prototype.getLocalScaling = function() {
                return m(Dt(this.zs), q)
            };
            ev.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Ct(d, a, c)
            };
            ev.prototype.__destroy__ = function() {
                Bt(this.zs)
            };

            function A() {
                this.zs = Fm();
                l(A)[this.zs] = this
            }
            A.prototype = Object.create(t.prototype);
            A.prototype.constructor = A;
            A.prototype.As = A;
            A.Bs = {};
            g.btGhostObject = A;
            A.prototype.getNumOverlappingObjects = function() {
                return Lm(this.zs)
            };
            A.prototype.getOverlappingObject = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Mm(c, a), t)
            };
            A.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Xm(d, a, c)
            };
            A.prototype.getCollisionShape = function() {
                return m(Jm(this.zs), p)
            };
            A.prototype.setContactProcessingThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                bn(c, a)
            };
            A.prototype.setActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Wm(c, a)
            };
            A.prototype.forceActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gm(c, a)
            };
            A.prototype.activate = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                void 0 === a ? Dm(c) : Em(c, a)
            };
            A.prototype.isActive = function() {
                return !!Sm(this.zs)
            };
            A.prototype.isKinematicObject = function() {
                return !!Tm(this.zs)
            };
            A.prototype.isStaticObject = function() {
                return !!Um(this.zs)
            };
            A.prototype.isStaticOrKinematicObject = function() {
                return !!Vm(this.zs)
            };
            A.prototype.getRestitution = function() {
                return Nm(this.zs)
            };
            A.prototype.getFriction = function() {
                return Km(this.zs)
            };
            A.prototype.getRollingFriction = function() {
                return Om(this.zs)
            };
            A.prototype.setRestitution = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dn(c, a)
            };
            A.prototype.setFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cn(c, a)
            };
            A.prototype.setRollingFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                en(c, a)
            };
            A.prototype.getWorldTransform = function() {
                return m(Rm(this.zs), u)
            };
            A.prototype.getCollisionFlags = function() {
                return Im(this.zs)
            };
            A.prototype.setCollisionFlags = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $m(c, a)
            };
            A.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                hn(c, a)
            };
            A.prototype.setCollisionShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                an(c, a)
            };
            A.prototype.setCcdMotionThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ym(c, a)
            };
            A.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Zm(c, a)
            };
            A.prototype.getUserIndex = function() {
                return Pm(this.zs)
            };
            A.prototype.setUserIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                fn(c, a)
            };
            A.prototype.getUserPointer = function() {
                return m(Qm(this.zs), Xu)
            };
            A.prototype.setUserPointer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gn(c, a)
            };
            A.prototype.getBroadphaseHandle = function() {
                return m(Hm(this.zs), v)
            };
            A.prototype.__destroy__ = function() {
                Cm(this.zs)
            };

            function fv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Sh(a, c);
                l(fv)[this.zs] = this
            }
            fv.prototype = Object.create(p.prototype);
            fv.prototype.constructor = fv;
            fv.prototype.As = fv;
            fv.Bs = {};
            g.btConeShape = fv;
            fv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vh(c, a)
            };
            fv.prototype.getLocalScaling = function() {
                return m(Uh(this.zs), q)
            };
            fv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Th(d, a, c)
            };
            fv.prototype.__destroy__ = function() {
                Rh(this.zs)
            };

            function gv() {
                throw "cannot construct a btActionInterface, no constructor in IDL";
            }
            gv.prototype = Object.create(k.prototype);
            gv.prototype.constructor = gv;
            gv.prototype.As = gv;
            gv.Bs = {};
            g.btActionInterface = gv;
            gv.prototype.updateAction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                af(d, a, c)
            };
            gv.prototype.__destroy__ = function() {
                $e(this.zs)
            };

            function q(a, c, d) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                this.zs = void 0 === a ? Zt() : void 0 === c ? _emscripten_bind_btVector3_btVector3_1(a) : void 0 === d ? _emscripten_bind_btVector3_btVector3_2(a, c) : $t(a, c, d);
                l(q)[this.zs] = this
            }
            q.prototype = Object.create(k.prototype);
            q.prototype.constructor = q;
            q.prototype.As = q;
            q.Bs = {};
            g.btVector3 = q;
            q.prototype.length = q.prototype.length = function() {
                return cu(this.zs)
            };
            q.prototype.length2 = function() {
                return bu(this.zs)
            };
            q.prototype.x = q.prototype.x = function() {
                return mu(this.zs)
            };
            q.prototype.y = q.prototype.y = function() {
                return nu(this.zs)
            };
            q.prototype.z = q.prototype.z = function() {
                return ou(this.zs)
            };
            q.prototype.setX = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ju(c, a)
            };
            q.prototype.setY = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ku(c, a)
            };
            q.prototype.setZ = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                lu(c, a)
            };
            q.prototype.setValue = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                iu(e, a, c, d)
            };
            q.prototype.normalize = q.prototype.normalize = function() {
                du(this.zs)
            };
            q.prototype.rotate = q.prototype.rotate = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return m(hu(d, a, c), q)
            };
            q.prototype.dot = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return au(c, a)
            };
            q.prototype.op_mul = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(fu(c, a), q)
            };
            q.prototype.op_add = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(eu(c, a), q)
            };
            q.prototype.op_sub = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(gu(c, a), q)
            };
            q.prototype.__destroy__ = function() {
                Yt(this.zs)
            };

            function hv() {
                throw "cannot construct a btQuadWord, no constructor in IDL";
            }
            hv.prototype = Object.create(k.prototype);
            hv.prototype.constructor = hv;
            hv.prototype.As = hv;
            hv.Bs = {};
            g.btQuadWord = hv;
            hv.prototype.x = hv.prototype.x = function() {
                return lq(this.zs)
            };
            hv.prototype.y = hv.prototype.y = function() {
                return mq(this.zs)
            };
            hv.prototype.z = hv.prototype.z = function() {
                return nq(this.zs)
            };
            hv.prototype.w = hv.prototype.ht = function() {
                return kq(this.zs)
            };
            hv.prototype.setX = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                hq(c, a)
            };
            hv.prototype.setY = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                iq(c, a)
            };
            hv.prototype.setZ = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                jq(c, a)
            };
            hv.prototype.setW = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gq(c, a)
            };
            hv.prototype.__destroy__ = function() {
                fq(this.zs)
            };

            function iv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = Aj(a);
                l(iv)[this.zs] = this
            }
            iv.prototype = Object.create(p.prototype);
            iv.prototype.constructor = iv;
            iv.prototype.As = iv;
            iv.Bs = {};
            g.btCylinderShape = iv;
            iv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fj(c, a)
            };
            iv.prototype.getMargin = function() {
                return Dj(this.zs)
            };
            iv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ej(c, a)
            };
            iv.prototype.getLocalScaling = function() {
                return m(Cj(this.zs), q)
            };
            iv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Bj(d, a, c)
            };
            iv.prototype.__destroy__ = function() {
                zj(this.zs)
            };

            function jv() {
                throw "cannot construct a btConvexShape, no constructor in IDL";
            }
            jv.prototype = Object.create(p.prototype);
            jv.prototype.constructor = jv;
            jv.prototype.As = jv;
            jv.Bs = {};
            g.btConvexShape = jv;
            jv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                bj(c, a)
            };
            jv.prototype.getLocalScaling = function() {
                return m($i(this.zs), q)
            };
            jv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Zi(d, a, c)
            };
            jv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cj(c, a)
            };
            jv.prototype.getMargin = function() {
                return aj(this.zs)
            };
            jv.prototype.__destroy__ = function() {
                Yi(this.zs)
            };

            function Zu() {
                throw "cannot construct a btDispatcher, no constructor in IDL";
            }
            Zu.prototype = Object.create(k.prototype);
            Zu.prototype.constructor = Zu;
            Zu.prototype.As = Zu;
            Zu.Bs = {};
            g.btDispatcher = Zu;
            Zu.prototype.getNumManifolds = function() {
                return fl(this.zs)
            };
            Zu.prototype.getManifoldByIndexInternal = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(el(c, a), kv)
            };
            Zu.prototype.__destroy__ = function() {
                dl(this.zs)
            };

            function lv(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                this.zs = void 0 === e ? Xl(a, c, d) : void 0 === f ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(a, c, d, e) : Yl(a, c, d, e, f);
                l(lv)[this.zs] = this
            }
            lv.prototype = Object.create(Yu.prototype);
            lv.prototype.constructor = lv;
            lv.prototype.As = lv;
            lv.Bs = {};
            g.btGeneric6DofConstraint = lv;
            lv.prototype.setLinearLowerLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                fm(c, a)
            };
            lv.prototype.setLinearUpperLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gm(c, a)
            };
            lv.prototype.setAngularLowerLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cm(c, a)
            };
            lv.prototype.setAngularUpperLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dm(c, a)
            };
            lv.prototype.getFrameOffsetA = function() {
                return m(am(this.zs), u)
            };
            lv.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Zl(c, a)
            };
            lv.prototype.getBreakingImpulseThreshold = function() {
                return $l(this.zs)
            };
            lv.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                em(c, a)
            };
            lv.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return bm(d, a, c)
            };
            lv.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                hm(e, a, c, d)
            };
            lv.prototype.__destroy__ = function() {
                Wl(this.zs)
            };

            function mv() {
                throw "cannot construct a btStridingMeshInterface, no constructor in IDL";
            }
            mv.prototype = Object.create(k.prototype);
            mv.prototype.constructor = mv;
            mv.prototype.As = mv;
            mv.Bs = {};
            g.btStridingMeshInterface = mv;
            mv.prototype.setScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ot(c, a)
            };
            mv.prototype.__destroy__ = function() {
                nt(this.zs)
            };

            function nv() {
                throw "cannot construct a btMotionState, no constructor in IDL";
            }
            nv.prototype = Object.create(k.prototype);
            nv.prototype.constructor = nv;
            nv.prototype.As = nv;
            nv.Bs = {};
            g.btMotionState = nv;
            nv.prototype.getWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Uo(c, a)
            };
            nv.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vo(c, a)
            };
            nv.prototype.__destroy__ = function() {
                To(this.zs)
            };

            function B() {
                throw "cannot construct a ConvexResultCallback, no constructor in IDL";
            }
            B.prototype = Object.create(k.prototype);
            B.prototype.constructor = B;
            B.prototype.As = B;
            B.Bs = {};
            g.ConvexResultCallback = B;
            B.prototype.hasHit = function() {
                return !!bd(this.zs)
            };
            B.prototype.get_m_collisionFilterGroup = B.prototype.Ds = function() {
                return $c(this.zs)
            };
            B.prototype.set_m_collisionFilterGroup = B.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dd(c, a)
            };
            Object.defineProperty(B.prototype, "m_collisionFilterGroup", {
                get: B.prototype.Ds,
                set: B.prototype.Fs
            });
            B.prototype.get_m_collisionFilterMask = B.prototype.Es = function() {
                return ad(this.zs)
            };
            B.prototype.set_m_collisionFilterMask = B.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ed(c, a)
            };
            Object.defineProperty(B.prototype, "m_collisionFilterMask", {
                get: B.prototype.Es,
                set: B.prototype.Gs
            });
            B.prototype.get_m_closestHitFraction = B.prototype.Hs = function() {
                return Zc(this.zs)
            };
            B.prototype.set_m_closestHitFraction = B.prototype.Js = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cd(c, a)
            };
            Object.defineProperty(B.prototype, "m_closestHitFraction", {
                get: B.prototype.Hs,
                set: B.prototype.Js
            });
            B.prototype.__destroy__ = function() {
                Yc(this.zs)
            };

            function ov() {
                throw "cannot construct a ContactResultCallback, no constructor in IDL";
            }
            ov.prototype = Object.create(k.prototype);
            ov.prototype.constructor = ov;
            ov.prototype.As = ov;
            ov.Bs = {};
            g.ContactResultCallback = ov;
            ov.prototype.addSingleResult = function(a, c, d, e, f, n, r) {
                var N = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                n && "object" === typeof n && (n = n.zs);
                r && "object" === typeof r && (r = r.zs);
                return Rc(N, a, c, d, e, f, n, r)
            };
            ov.prototype.__destroy__ = function() {
                Qc(this.zs)
            };

            function C() {
                throw "cannot construct a RayResultCallback, no constructor in IDL";
            }
            C.prototype = Object.create(k.prototype);
            C.prototype.constructor = C;
            C.prototype.As = C;
            C.Bs = {};
            g.RayResultCallback = C;
            C.prototype.hasHit = function() {
                return !!Ce(this.zs)
            };
            C.prototype.get_m_collisionFilterGroup = C.prototype.Ds = function() {
                return ze(this.zs)
            };
            C.prototype.set_m_collisionFilterGroup = C.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ee(c, a)
            };
            Object.defineProperty(C.prototype, "m_collisionFilterGroup", {
                get: C.prototype.Ds,
                set: C.prototype.Fs
            });
            C.prototype.get_m_collisionFilterMask = C.prototype.Es = function() {
                return Ae(this.zs)
            };
            C.prototype.set_m_collisionFilterMask = C.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fe(c, a)
            };
            Object.defineProperty(C.prototype, "m_collisionFilterMask", {
                get: C.prototype.Es,
                set: C.prototype.Gs
            });
            C.prototype.get_m_closestHitFraction = C.prototype.Hs = function() {
                return ye(this.zs)
            };
            C.prototype.set_m_closestHitFraction = C.prototype.Js = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                De(c, a)
            };
            Object.defineProperty(C.prototype, "m_closestHitFraction", {
                get: C.prototype.Hs,
                set: C.prototype.Js
            });
            C.prototype.get_m_collisionObject = C.prototype.Ms = function() {
                return m(Be(this.zs), t)
            };
            C.prototype.set_m_collisionObject = C.prototype.Rs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ge(c, a)
            };
            Object.defineProperty(C.prototype, "m_collisionObject", {
                get: C.prototype.Ms,
                set: C.prototype.Rs
            });
            C.prototype.__destroy__ = function() {
                xe(this.zs)
            };

            function pv() {
                throw "cannot construct a btMatrix3x3, no constructor in IDL";
            }
            pv.prototype = Object.create(k.prototype);
            pv.prototype.constructor = pv;
            pv.prototype.As = pv;
            pv.Bs = {};
            g.btMatrix3x3 = pv;
            pv.prototype.setEulerZYX = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                So(e, a, c, d)
            };
            pv.prototype.getRotation = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Qo(c, a)
            };
            pv.prototype.getRow = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Ro(c, a), q)
            };
            pv.prototype.__destroy__ = function() {
                Po(this.zs)
            };

            function qv() {
                throw "cannot construct a btScalarArray, no constructor in IDL";
            }
            qv.prototype = Object.create(k.prototype);
            qv.prototype.constructor = qv;
            qv.prototype.As = qv;
            qv.Bs = {};
            g.btScalarArray = qv;
            qv.prototype.size = qv.prototype.size = function() {
                return Is(this.zs)
            };
            qv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return Hs(c, a)
            };
            qv.prototype.__destroy__ = function() {
                Gs(this.zs)
            };

            function x() {
                throw "cannot construct a btDispatcherInfo, no constructor in IDL";
            }
            x.prototype = Object.create(k.prototype);
            x.prototype.constructor = x;
            x.prototype.As = x;
            x.Bs = {};
            g.btDispatcherInfo = x;
            x.prototype.get_m_timeStep = x.prototype.tu = function() {
                return Pk(this.zs)
            };
            x.prototype.set_m_timeStep = x.prototype.Jv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $k(c, a)
            };
            Object.defineProperty(x.prototype, "m_timeStep", {
                get: x.prototype.tu,
                set: x.prototype.Jv
            });
            x.prototype.get_m_stepCount = x.prototype.qu = function() {
                return Nk(this.zs)
            };
            x.prototype.set_m_stepCount = x.prototype.Gv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Yk(c, a)
            };
            Object.defineProperty(x.prototype, "m_stepCount", {
                get: x.prototype.qu,
                set: x.prototype.Gv
            });
            x.prototype.get_m_dispatchFunc = x.prototype.Ct = function() {
                return Kk(this.zs)
            };
            x.prototype.set_m_dispatchFunc = x.prototype.Vu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vk(c, a)
            };
            Object.defineProperty(x.prototype, "m_dispatchFunc", {
                get: x.prototype.Ct,
                set: x.prototype.Vu
            });
            x.prototype.get_m_timeOfImpact = x.prototype.su = function() {
                return Ok(this.zs)
            };
            x.prototype.set_m_timeOfImpact = x.prototype.Iv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Zk(c, a)
            };
            Object.defineProperty(x.prototype, "m_timeOfImpact", {
                get: x.prototype.su,
                set: x.prototype.Iv
            });
            x.prototype.get_m_useContinuous = x.prototype.wu = function() {
                return !!Qk(this.zs)
            };
            x.prototype.set_m_useContinuous = x.prototype.Lv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                al(c, a)
            };
            Object.defineProperty(x.prototype, "m_useContinuous", {
                get: x.prototype.wu,
                set: x.prototype.Lv
            });
            x.prototype.get_m_enableSatConvex = x.prototype.Et = function() {
                return !!Mk(this.zs)
            };
            x.prototype.set_m_enableSatConvex = x.prototype.Xu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xk(c, a)
            };
            Object.defineProperty(x.prototype, "m_enableSatConvex", {
                get: x.prototype.Et,
                set: x.prototype.Xu
            });
            x.prototype.get_m_enableSPU = x.prototype.Dt = function() {
                return !!Lk(this.zs)
            };
            x.prototype.set_m_enableSPU = x.prototype.Wu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Wk(c, a)
            };
            Object.defineProperty(x.prototype, "m_enableSPU", {
                get: x.prototype.Dt,
                set: x.prototype.Wu
            });
            x.prototype.get_m_useEpa = x.prototype.yu = function() {
                return !!Sk(this.zs)
            };
            x.prototype.set_m_useEpa = x.prototype.Nv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cl(c, a)
            };
            Object.defineProperty(x.prototype, "m_useEpa", {
                get: x.prototype.yu,
                set: x.prototype.Nv
            });
            x.prototype.get_m_allowedCcdPenetration = x.prototype.ot = function() {
                return Ik(this.zs)
            };
            x.prototype.set_m_allowedCcdPenetration = x.prototype.Hu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Tk(c, a)
            };
            Object.defineProperty(x.prototype, "m_allowedCcdPenetration", {
                get: x.prototype.ot,
                set: x.prototype.Hu
            });
            x.prototype.get_m_useConvexConservativeDistanceUtil = x.prototype.xu = function() {
                return !!Rk(this.zs)
            };
            x.prototype.set_m_useConvexConservativeDistanceUtil = x.prototype.Mv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                bl(c, a)
            };
            Object.defineProperty(x.prototype, "m_useConvexConservativeDistanceUtil", {
                get: x.prototype.xu,
                set: x.prototype.Mv
            });
            x.prototype.get_m_convexConservativeDistanceThreshold = x.prototype.vt = function() {
                return Jk(this.zs)
            };
            x.prototype.set_m_convexConservativeDistanceThreshold = x.prototype.Ou = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Uk(c, a)
            };
            Object.defineProperty(x.prototype, "m_convexConservativeDistanceThreshold", {
                get: x.prototype.vt,
                set: x.prototype.Ou
            });
            x.prototype.__destroy__ = function() {
                Hk(this.zs)
            };

            function rv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = void 0 === c ? ej(a) : fj(a, c);
                l(rv)[this.zs] = this
            }
            rv.prototype = Object.create(jv.prototype);
            rv.prototype.constructor = rv;
            rv.prototype.As = rv;
            rv.Bs = {};
            g.btConvexTriangleMeshShape = rv;
            rv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                jj(c, a)
            };
            rv.prototype.getLocalScaling = function() {
                return m(hj(this.zs), q)
            };
            rv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                gj(d, a, c)
            };
            rv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                kj(c, a)
            };
            rv.prototype.getMargin = function() {
                return ij(this.zs)
            };
            rv.prototype.__destroy__ = function() {
                dj(this.zs)
            };

            function av() {
                throw "cannot construct a btBroadphaseInterface, no constructor in IDL";
            }
            av.prototype = Object.create(k.prototype);
            av.prototype.constructor = av;
            av.prototype.As = av;
            av.Bs = {};
            g.btBroadphaseInterface = av;
            av.prototype.getOverlappingPairCache = function() {
                return m(pf(this.zs), $u)
            };
            av.prototype.__destroy__ = function() { of (this.zs)
            };

            function sv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = void 0 === a ? Kj() : Lj(a);
                l(sv)[this.zs] = this
            }
            sv.prototype = Object.create(k.prototype);
            sv.prototype.constructor = sv;
            sv.prototype.As = sv;
            sv.Bs = {};
            g.btDefaultCollisionConfiguration = sv;
            sv.prototype.__destroy__ = function() {
                Jj(this.zs)
            };

            function D(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = void 0 === e ? Sq(a, c, d) : Tq(a, c, d, e);
                l(D)[this.zs] = this
            }
            D.prototype = Object.create(k.prototype);
            D.prototype.constructor = D;
            D.prototype.As = D;
            D.Bs = {};
            g.btRigidBodyConstructionInfo = D;
            D.prototype.get_m_linearDamping = D.prototype.Qt = function() {
                return br(this.zs)
            };
            D.prototype.set_m_linearDamping = D.prototype.iv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                nr(c, a)
            };
            Object.defineProperty(D.prototype, "m_linearDamping", {
                get: D.prototype.Qt,
                set: D.prototype.iv
            });
            D.prototype.get_m_angularDamping = D.prototype.qt = function() {
                return Zq(this.zs)
            };
            D.prototype.set_m_angularDamping = D.prototype.Ju = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                kr(c, a)
            };
            Object.defineProperty(D.prototype, "m_angularDamping", {
                get: D.prototype.qt,
                set: D.prototype.Ju
            });
            D.prototype.get_m_friction = D.prototype.Gt = function() {
                return ar(this.zs)
            };
            D.prototype.set_m_friction = D.prototype.Zu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mr(c, a)
            };
            Object.defineProperty(D.prototype, "m_friction", {
                get: D.prototype.Gt,
                set: D.prototype.Zu
            });
            D.prototype.get_m_rollingFriction = D.prototype.lu = function() {
                return er(this.zs)
            };
            D.prototype.set_m_rollingFriction = D.prototype.Bv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qr(c, a)
            };
            Object.defineProperty(D.prototype, "m_rollingFriction", {
                get: D.prototype.lu,
                set: D.prototype.Bv
            });
            D.prototype.get_m_restitution = D.prototype.ku = function() {
                return dr(this.zs)
            };
            D.prototype.set_m_restitution = D.prototype.Av = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                pr(c, a)
            };
            Object.defineProperty(D.prototype, "m_restitution", {
                get: D.prototype.ku,
                set: D.prototype.Av
            });
            D.prototype.get_m_linearSleepingThreshold = D.prototype.Rt = function() {
                return cr(this.zs)
            };
            D.prototype.set_m_linearSleepingThreshold = D.prototype.jv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                or(c, a)
            };
            Object.defineProperty(D.prototype, "m_linearSleepingThreshold", {
                get: D.prototype.Rt,
                set: D.prototype.jv
            });
            D.prototype.get_m_angularSleepingThreshold = D.prototype.rt = function() {
                return $q(this.zs)
            };
            D.prototype.set_m_angularSleepingThreshold = D.prototype.Ku = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                lr(c, a)
            };
            Object.defineProperty(D.prototype, "m_angularSleepingThreshold", {
                get: D.prototype.rt,
                set: D.prototype.Ku
            });
            D.prototype.get_m_additionalDamping = D.prototype.lt = function() {
                return !!Xq(this.zs)
            };
            D.prototype.set_m_additionalDamping = D.prototype.Eu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ir(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalDamping", {
                get: D.prototype.lt,
                set: D.prototype.Eu
            });
            D.prototype.get_m_additionalDampingFactor = D.prototype.mt = function() {
                return Wq(this.zs)
            };
            D.prototype.set_m_additionalDampingFactor = D.prototype.Fu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                hr(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalDampingFactor", {
                get: D.prototype.mt,
                set: D.prototype.Fu
            });
            D.prototype.get_m_additionalLinearDampingThresholdSqr = D.prototype.nt = function() {
                return Yq(this.zs)
            };
            D.prototype.set_m_additionalLinearDampingThresholdSqr = D.prototype.Gu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                jr(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalLinearDampingThresholdSqr", {
                get: D.prototype.nt,
                set: D.prototype.Gu
            });
            D.prototype.get_m_additionalAngularDampingThresholdSqr = D.prototype.kt = function() {
                return Vq(this.zs)
            };
            D.prototype.set_m_additionalAngularDampingThresholdSqr = D.prototype.Du = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gr(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalAngularDampingThresholdSqr", {
                get: D.prototype.kt,
                set: D.prototype.Du
            });
            D.prototype.get_m_additionalAngularDampingFactor = D.prototype.jt = function() {
                return Uq(this.zs)
            };
            D.prototype.set_m_additionalAngularDampingFactor = D.prototype.Cu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                fr(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalAngularDampingFactor", {
                get: D.prototype.jt,
                set: D.prototype.Cu
            });
            D.prototype.__destroy__ = function() {
                Rq(this.zs)
            };

            function tv() {
                throw "cannot construct a btCollisionConfiguration, no constructor in IDL";
            }
            tv.prototype = Object.create(k.prototype);
            tv.prototype.constructor = tv;
            tv.prototype.As = tv;
            tv.Bs = {};
            g.btCollisionConfiguration = tv;
            tv.prototype.__destroy__ = function() {
                eg(this.zs)
            };

            function kv() {
                this.zs = Np();
                l(kv)[this.zs] = this
            }
            kv.prototype = Object.create(k.prototype);
            kv.prototype.constructor = kv;
            kv.prototype.As = kv;
            kv.Bs = {};
            g.btPersistentManifold = kv;
            kv.prototype.getBody0 = function() {
                return m(Op(this.zs), t)
            };
            kv.prototype.getBody1 = function() {
                return m(Pp(this.zs), t)
            };
            kv.prototype.getNumContacts = function() {
                return Rp(this.zs)
            };
            kv.prototype.getContactPoint = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Qp(c, a), E)
            };
            kv.prototype.__destroy__ = function() {
                Mp(this.zs)
            };

            function uv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = void 0 === a ? qh() : rh(a);
                l(uv)[this.zs] = this
            }
            uv.prototype = Object.create(p.prototype);
            uv.prototype.constructor = uv;
            uv.prototype.As = uv;
            uv.Bs = {};
            g.btCompoundShape = uv;
            uv.prototype.addChildShape = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                ph(d, a, c)
            };
            uv.prototype.removeChildShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                yh(c, a)
            };
            uv.prototype.removeChildShapeByIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xh(c, a)
            };
            uv.prototype.getNumChildShapes = function() {
                return wh(this.zs)
            };
            uv.prototype.getChildShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(th(c, a), p)
            };
            uv.prototype.updateChildTransform = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                void 0 === d ? Bh(e, a, c) : Ch(e, a, c, d)
            };
            uv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ah(c, a)
            };
            uv.prototype.getMargin = function() {
                return vh(this.zs)
            };
            uv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zh(c, a)
            };
            uv.prototype.getLocalScaling = function() {
                return m(uh(this.zs), q)
            };
            uv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                sh(d, a, c)
            };
            uv.prototype.__destroy__ = function() {
                oh(this.zs)
            };

            function F(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = bc(a, c);
                l(F)[this.zs] = this
            }
            F.prototype = Object.create(B.prototype);
            F.prototype.constructor = F;
            F.prototype.As = F;
            F.Bs = {};
            g.ClosestConvexResultCallback = F;
            F.prototype.hasHit = function() {
                return !!lc(this.zs)
            };
            F.prototype.get_m_convexFromWorld = F.prototype.wt = function() {
                return m(hc(this.zs), q)
            };
            F.prototype.set_m_convexFromWorld = F.prototype.Pu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                pc(c, a)
            };
            Object.defineProperty(F.prototype, "m_convexFromWorld", {
                get: F.prototype.wt,
                set: F.prototype.Pu
            });
            F.prototype.get_m_convexToWorld = F.prototype.xt = function() {
                return m(ic(this.zs), q)
            };
            F.prototype.set_m_convexToWorld = F.prototype.Qu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qc(c, a)
            };
            Object.defineProperty(F.prototype, "m_convexToWorld", {
                get: F.prototype.xt,
                set: F.prototype.Qu
            });
            F.prototype.get_m_hitNormalWorld = F.prototype.Ns = function() {
                return m(jc(this.zs), q)
            };
            F.prototype.set_m_hitNormalWorld = F.prototype.Ss = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                rc(c, a)
            };
            Object.defineProperty(F.prototype, "m_hitNormalWorld", {
                get: F.prototype.Ns,
                set: F.prototype.Ss
            });
            F.prototype.get_m_hitPointWorld = F.prototype.Os = function() {
                return m(kc(this.zs), q)
            };
            F.prototype.set_m_hitPointWorld = F.prototype.Ts = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                sc(c, a)
            };
            Object.defineProperty(F.prototype, "m_hitPointWorld", {
                get: F.prototype.Os,
                set: F.prototype.Ts
            });
            F.prototype.get_m_collisionFilterGroup = F.prototype.Ds = function() {
                return ec(this.zs)
            };
            F.prototype.set_m_collisionFilterGroup = F.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                nc(c, a)
            };
            Object.defineProperty(F.prototype, "m_collisionFilterGroup", {
                get: F.prototype.Ds,
                set: F.prototype.Fs
            });
            F.prototype.get_m_collisionFilterMask = F.prototype.Es = function() {
                return fc(this.zs)
            };
            F.prototype.set_m_collisionFilterMask = F.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                oc(c, a)
            };
            Object.defineProperty(F.prototype, "m_collisionFilterMask", {
                get: F.prototype.Es,
                set: F.prototype.Gs
            });
            F.prototype.get_m_closestHitFraction = F.prototype.Hs = function() {
                return dc(this.zs)
            };
            F.prototype.set_m_closestHitFraction = F.prototype.Js = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mc(c, a)
            };
            Object.defineProperty(F.prototype, "m_closestHitFraction", {
                get: F.prototype.Hs,
                set: F.prototype.Js
            });
            F.prototype.__destroy__ = function() {
                cc(this.zs)
            };

            function G(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Eb(a, c);
                l(G)[this.zs] = this
            }
            G.prototype = Object.create(C.prototype);
            G.prototype.constructor = G;
            G.prototype.As = G;
            G.Bs = {};
            g.AllHitsRayResultCallback = G;
            G.prototype.hasHit = function() {
                return !!Rb(this.zs)
            };
            G.prototype.get_m_collisionObjects = G.prototype.tt = function() {
                return m(Lb(this.zs), vv)
            };
            G.prototype.set_m_collisionObjects = G.prototype.Mu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Wb(c, a)
            };
            Object.defineProperty(G.prototype, "m_collisionObjects", {
                get: G.prototype.tt,
                set: G.prototype.Mu
            });
            G.prototype.get_m_rayFromWorld = G.prototype.bt = function() {
                return m(Pb(this.zs), q)
            };
            G.prototype.set_m_rayFromWorld = G.prototype.et = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $b(c, a)
            };
            Object.defineProperty(G.prototype, "m_rayFromWorld", {
                get: G.prototype.bt,
                set: G.prototype.et
            });
            G.prototype.get_m_rayToWorld = G.prototype.ct = function() {
                return m(Qb(this.zs), q)
            };
            G.prototype.set_m_rayToWorld = G.prototype.ft = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ac(c, a)
            };
            Object.defineProperty(G.prototype, "m_rayToWorld", {
                get: G.prototype.ct,
                set: G.prototype.ft
            });
            G.prototype.get_m_hitNormalWorld = G.prototype.Ns = function() {
                return m(Nb(this.zs), wv)
            };
            G.prototype.set_m_hitNormalWorld = G.prototype.Ss = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Yb(c, a)
            };
            Object.defineProperty(G.prototype, "m_hitNormalWorld", {
                get: G.prototype.Ns,
                set: G.prototype.Ss
            });
            G.prototype.get_m_hitPointWorld = G.prototype.Os = function() {
                return m(Ob(this.zs), wv)
            };
            G.prototype.set_m_hitPointWorld = G.prototype.Ts = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Zb(c, a)
            };
            Object.defineProperty(G.prototype, "m_hitPointWorld", {
                get: G.prototype.Os,
                set: G.prototype.Ts
            });
            G.prototype.get_m_hitFractions = G.prototype.Lt = function() {
                return m(Mb(this.zs), qv)
            };
            G.prototype.set_m_hitFractions = G.prototype.dv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xb(c, a)
            };
            Object.defineProperty(G.prototype, "m_hitFractions", {
                get: G.prototype.Lt,
                set: G.prototype.dv
            });
            G.prototype.get_m_collisionFilterGroup = G.prototype.Ds = function() {
                return Hb(this.zs)
            };
            G.prototype.set_m_collisionFilterGroup = G.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Tb(c, a)
            };
            Object.defineProperty(G.prototype, "m_collisionFilterGroup", {
                get: G.prototype.Ds,
                set: G.prototype.Fs
            });
            G.prototype.get_m_collisionFilterMask = G.prototype.Es = function() {
                return Ib(this.zs)
            };
            G.prototype.set_m_collisionFilterMask = G.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ub(c, a)
            };
            Object.defineProperty(G.prototype, "m_collisionFilterMask", {
                get: G.prototype.Es,
                set: G.prototype.Gs
            });
            G.prototype.get_m_closestHitFraction = G.prototype.Hs = function() {
                return Gb(this.zs)
            };
            G.prototype.set_m_closestHitFraction = G.prototype.Js = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Sb(c, a)
            };
            Object.defineProperty(G.prototype, "m_closestHitFraction", {
                get: G.prototype.Hs,
                set: G.prototype.Js
            });
            G.prototype.get_m_collisionObject = G.prototype.Ms = function() {
                return m(Kb(this.zs), t)
            };
            G.prototype.set_m_collisionObject = G.prototype.Rs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vb(c, a)
            };
            Object.defineProperty(G.prototype, "m_collisionObject", {
                get: G.prototype.Ms,
                set: G.prototype.Rs
            });
            G.prototype.__destroy__ = function() {
                Fb(this.zs)
            };

            function xv() {
                this.zs = Ne();
                l(xv)[this.zs] = this
            }
            xv.prototype = Object.create(k.prototype);
            xv.prototype.constructor = xv;
            xv.prototype.As = xv;
            xv.Bs = {};
            g.VHACD = xv;
            xv.prototype.Compute = function(a, c, d, e, f, n, r) {
                var N = this.zs;
                b.Is();
                if ("object" == typeof a && "object" === typeof a) {
                    var ba = b.Vs(a, Ga);
                    b.copy(a, Ga, ba);
                    a = ba
                }
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                "object" == typeof e && "object" === typeof e && (ba = b.Vs(e, h), b.copy(e, h, ba), e = ba);
                f && "object" === typeof f && (f = f.zs);
                n && "object" === typeof n && (n = n.zs);
                r && "object" === typeof r && (r = r.zs);
                return !!Je(N, a, c, d, e, f, n, r)
            };
            xv.prototype.GetNConvexHulls = function() {
                return Le(this.zs)
            };
            xv.prototype.GetConvexHull = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Ke(d, a, c)
            };
            xv.prototype.Cancel = function() {
                He(this.zs)
            };
            xv.prototype.Clean = function() {
                Ie(this.zs)
            };
            xv.prototype.Release = function() {
                Me(this.zs)
            };
            xv.prototype.__destroy__ = function() {
                Oe(this.zs)
            };

            function yv() {
                this.zs = Dl();
                l(yv)[this.zs] = this
            }
            yv.prototype = Object.create(cv.prototype);
            yv.prototype.constructor = yv;
            yv.prototype.As = yv;
            yv.Bs = {};
            g.btEmptyShape = yv;
            yv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gl(c, a)
            };
            yv.prototype.getLocalScaling = function() {
                return m(Fl(this.zs), q)
            };
            yv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                El(d, a, c)
            };
            yv.prototype.__destroy__ = function() {
                Cl(this.zs)
            };

            function H() {
                this.zs = pi();
                l(H)[this.zs] = this
            }
            H.prototype = Object.create(k.prototype);
            H.prototype.constructor = H;
            H.prototype.As = H;
            H.Bs = {};
            g.btConstraintSetting = H;
            H.prototype.get_m_tau = H.prototype.ru = function() {
                return si(this.zs)
            };
            H.prototype.set_m_tau = H.prototype.Hv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                vi(c, a)
            };
            Object.defineProperty(H.prototype, "m_tau", {
                get: H.prototype.ru,
                set: H.prototype.Hv
            });
            H.prototype.get_m_damping = H.prototype.At = function() {
                return qi(this.zs)
            };
            H.prototype.set_m_damping = H.prototype.Tu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ti(c, a)
            };
            Object.defineProperty(H.prototype, "m_damping", {
                get: H.prototype.At,
                set: H.prototype.Tu
            });
            H.prototype.get_m_impulseClamp = H.prototype.Ot = function() {
                return ri(this.zs)
            };
            H.prototype.set_m_impulseClamp = H.prototype.gv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ui(c, a)
            };
            Object.defineProperty(H.prototype, "m_impulseClamp", {
                get: H.prototype.Ot,
                set: H.prototype.gv
            });
            H.prototype.__destroy__ = function() {
                oi(this.zs)
            };

            function I() {
                throw "cannot construct a LocalShapeInfo, no constructor in IDL";
            }
            I.prototype = Object.create(k.prototype);
            I.prototype.constructor = I;
            I.prototype.As = I;
            I.Bs = {};
            g.LocalShapeInfo = I;
            I.prototype.get_m_shapePart = I.prototype.nu = function() {
                return Qd(this.zs)
            };
            I.prototype.set_m_shapePart = I.prototype.Dv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Sd(c, a)
            };
            Object.defineProperty(I.prototype, "m_shapePart", {
                get: I.prototype.nu,
                set: I.prototype.Dv
            });
            I.prototype.get_m_triangleIndex = I.prototype.uu = function() {
                return Rd(this.zs)
            };
            I.prototype.set_m_triangleIndex = I.prototype.Kv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Td(c, a)
            };
            Object.defineProperty(I.prototype, "m_triangleIndex", {
                get: I.prototype.uu,
                set: I.prototype.Kv
            });
            I.prototype.__destroy__ = function() {
                Pd(this.zs)
            };

            function J(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = Dr(a);
                l(J)[this.zs] = this
            }
            J.prototype = Object.create(t.prototype);
            J.prototype.constructor = J;
            J.prototype.As = J;
            J.Bs = {};
            g.btRigidBody = J;
            J.prototype.getCenterOfMassTransform = function() {
                return m(Lr(this.zs), u)
            };
            J.prototype.setCenterOfMassTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ks(c, a)
            };
            J.prototype.setSleepingThresholds = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                As(d, a, c)
            };
            J.prototype.getLinearDamping = function() {
                return Rr(this.zs)
            };
            J.prototype.getAngularDamping = function() {
                return Gr(this.zs)
            };
            J.prototype.setDamping = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                ps(d, a, c)
            };
            J.prototype.setMassProps = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                vs(d, a, c)
            };
            J.prototype.getLinearFactor = function() {
                return m(Sr(this.zs), q)
            };
            J.prototype.setLinearFactor = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ts(c, a)
            };
            J.prototype.applyTorque = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Cr(c, a)
            };
            J.prototype.applyLocalTorque = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ar(c, a)
            };
            J.prototype.applyForce = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                xr(d, a, c)
            };
            J.prototype.applyCentralForce = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ur(c, a)
            };
            J.prototype.applyCentralLocalForce = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                wr(c, a)
            };
            J.prototype.applyTorqueImpulse = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Br(c, a)
            };
            J.prototype.applyImpulse = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                zr(d, a, c)
            };
            J.prototype.applyCentralImpulse = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                vr(c, a)
            };
            J.prototype.updateInertiaTensor = function() {
                Fs(this.zs)
            };
            J.prototype.getLinearVelocity = function() {
                return m(Tr(this.zs), q)
            };
            J.prototype.getAngularVelocity = function() {
                return m(Ir(this.zs), q)
            };
            J.prototype.setLinearVelocity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                us(c, a)
            };
            J.prototype.setAngularVelocity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gs(c, a)
            };
            J.prototype.getMotionState = function() {
                return m(Ur(this.zs), nv)
            };
            J.prototype.setMotionState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xs(c, a)
            };
            J.prototype.getAngularFactor = function() {
                return m(Hr(this.zs), q)
            };
            J.prototype.setAngularFactor = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                es(c, a)
            };
            J.prototype.upcast = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Es(c, a), J)
            };
            J.prototype.getAabb = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Fr(d, a, c)
            };
            J.prototype.applyGravity = function() {
                yr(this.zs)
            };
            J.prototype.getGravity = function() {
                return m(Qr(this.zs), q)
            };
            J.prototype.setGravity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ss(c, a)
            };
            J.prototype.getBroadphaseProxy = function() {
                return m(Kr(this.zs), v)
            };
            J.prototype.getFlags = function() {
                return Or(this.zs)
            };
            J.prototype.setFlags = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qs(c, a)
            };
            J.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                hs(d, a, c)
            };
            J.prototype.getCollisionShape = function() {
                return m(Nr(this.zs), p)
            };
            J.prototype.setContactProcessingThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ns(c, a)
            };
            J.prototype.setActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ds(c, a)
            };
            J.prototype.forceActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Er(c, a)
            };
            J.prototype.activate = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                void 0 === a ? sr(c) : tr(c, a)
            };
            J.prototype.isActive = function() {
                return !!$r(this.zs)
            };
            J.prototype.isKinematicObject = function() {
                return !!as(this.zs)
            };
            J.prototype.isStaticObject = function() {
                return !!bs(this.zs)
            };
            J.prototype.isStaticOrKinematicObject = function() {
                return !!cs(this.zs)
            };
            J.prototype.getRestitution = function() {
                return Vr(this.zs)
            };
            J.prototype.getFriction = function() {
                return Pr(this.zs)
            };
            J.prototype.getRollingFriction = function() {
                return Wr(this.zs)
            };
            J.prototype.setRestitution = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ys(c, a)
            };
            J.prototype.setFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                rs(c, a)
            };
            J.prototype.setRollingFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zs(c, a)
            };
            J.prototype.getWorldTransform = function() {
                return m(Zr(this.zs), u)
            };
            J.prototype.getCollisionFlags = function() {
                return Mr(this.zs)
            };
            J.prototype.setCollisionFlags = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ls(c, a)
            };
            J.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ds(c, a)
            };
            J.prototype.setCollisionShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ms(c, a)
            };
            J.prototype.setCcdMotionThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                is(c, a)
            };
            J.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                js(c, a)
            };
            J.prototype.getUserIndex = function() {
                return Xr(this.zs)
            };
            J.prototype.setUserIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bs(c, a)
            };
            J.prototype.getUserPointer = function() {
                return m(Yr(this.zs), Xu)
            };
            J.prototype.setUserPointer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Cs(c, a)
            };
            J.prototype.getBroadphaseHandle = function() {
                return m(Jr(this.zs), v)
            };
            J.prototype.__destroy__ = function() {
                rr(this.zs)
            };

            function zv() {
                throw "cannot construct a btIndexedMeshArray, no constructor in IDL";
            }
            zv.prototype = Object.create(k.prototype);
            zv.prototype.constructor = zv;
            zv.prototype.As = zv;
            zv.Bs = {};
            g.btIndexedMeshArray = zv;
            zv.prototype.size = zv.prototype.size = function() {
                return Un(this.zs)
            };
            zv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Tn(c, a), Av)
            };
            zv.prototype.__destroy__ = function() {
                Sn(this.zs)
            };

            function Bv() {
                this.zs = Hj();
                l(Bv)[this.zs] = this
            }
            Bv.prototype = Object.create(k.prototype);
            Bv.prototype.constructor = Bv;
            Bv.prototype.As = Bv;
            Bv.Bs = {};
            g.btDbvtBroadphase = Bv;
            Bv.prototype.getOverlappingPairCache = function() {
                return m(Ij(this.zs), $u)
            };
            Bv.prototype.__destroy__ = function() {
                Gj(this.zs)
            };

            function Cv(a, c, d, e, f, n, r, N, ba) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                n && "object" === typeof n && (n = n.zs);
                r && "object" === typeof r && (r = r.zs);
                N && "object" === typeof N && (N = N.zs);
                ba && "object" === typeof ba && (ba = ba.zs);
                this.zs = mn(a, c, d, e, f, n, r, N, ba);
                l(Cv)[this.zs] = this
            }
            Cv.prototype = Object.create(cv.prototype);
            Cv.prototype.constructor = Cv;
            Cv.prototype.As = Cv;
            Cv.Bs = {};
            g.btHeightfieldTerrainShape = Cv;
            Cv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                rn(c, a)
            };
            Cv.prototype.getMargin = function() {
                return pn(this.zs)
            };
            Cv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qn(c, a)
            };
            Cv.prototype.getLocalScaling = function() {
                return m(on(this.zs), q)
            };
            Cv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                nn(d, a, c)
            };
            Cv.prototype.__destroy__ = function() {
                ln(this.zs)
            };

            function K() {
                this.zs = Ud();
                l(K)[this.zs] = this
            }
            K.prototype = Object.create(k.prototype);
            K.prototype.constructor = K;
            K.prototype.As = K;
            K.Bs = {};
            g.Parameters = K;
            K.prototype.get_m_concavity = K.prototype.ut = function() {
                return Yd(this.zs)
            };
            K.prototype.set_m_concavity = K.prototype.Nu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                le(c, a)
            };
            Object.defineProperty(K.prototype, "m_concavity", {
                get: K.prototype.ut,
                set: K.prototype.Nu
            });
            K.prototype.get_m_alpha = K.prototype.pt = function() {
                return Wd(this.zs)
            };
            K.prototype.set_m_alpha = K.prototype.Iu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                je(c, a)
            };
            Object.defineProperty(K.prototype, "m_alpha", {
                get: K.prototype.pt,
                set: K.prototype.Iu
            });
            K.prototype.get_m_beta = K.prototype.st = function() {
                return Xd(this.zs)
            };
            K.prototype.set_m_beta = K.prototype.Lu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ke(c, a)
            };
            Object.defineProperty(K.prototype, "m_beta", {
                get: K.prototype.st,
                set: K.prototype.Lu
            });
            K.prototype.get_m_gamma = K.prototype.Ht = function() {
                return be(this.zs)
            };
            K.prototype.set_m_gamma = K.prototype.$u = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                pe(c, a)
            };
            Object.defineProperty(K.prototype, "m_gamma", {
                get: K.prototype.Ht,
                set: K.prototype.$u
            });
            K.prototype.get_m_minVolumePerCH = K.prototype.Wt = function() {
                return de(this.zs)
            };
            K.prototype.set_m_minVolumePerCH = K.prototype.ov = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                re(c, a)
            };
            Object.defineProperty(K.prototype, "m_minVolumePerCH", {
                get: K.prototype.Wt,
                set: K.prototype.ov
            });
            K.prototype.get_m_resolution = K.prototype.ju = function() {
                return ie(this.zs)
            };
            K.prototype.set_m_resolution = K.prototype.zv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                we(c, a)
            };
            Object.defineProperty(K.prototype, "m_resolution", {
                get: K.prototype.ju,
                set: K.prototype.zv
            });
            K.prototype.get_m_maxNumVerticesPerCH = K.prototype.Vt = function() {
                return ce(this.zs)
            };
            K.prototype.set_m_maxNumVerticesPerCH = K.prototype.nv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qe(c, a)
            };
            Object.defineProperty(K.prototype, "m_maxNumVerticesPerCH", {
                get: K.prototype.Vt,
                set: K.prototype.nv
            });
            K.prototype.get_m_depth = K.prototype.Bt = function() {
                return ae(this.zs)
            };
            K.prototype.set_m_depth = K.prototype.Uu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                oe(c, a)
            };
            Object.defineProperty(K.prototype, "m_depth", {
                get: K.prototype.Bt,
                set: K.prototype.Uu
            });
            K.prototype.get_m_planeDownsampling = K.prototype.fu = function() {
                return he(this.zs)
            };
            K.prototype.set_m_planeDownsampling = K.prototype.wv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ve(c, a)
            };
            Object.defineProperty(K.prototype, "m_planeDownsampling", {
                get: K.prototype.fu,
                set: K.prototype.wv
            });
            K.prototype.get_m_convexhullDownsampling = K.prototype.zt = function() {
                return $d(this.zs)
            };
            K.prototype.set_m_convexhullDownsampling = K.prototype.Su = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ne(c, a)
            };
            Object.defineProperty(K.prototype, "m_convexhullDownsampling", {
                get: K.prototype.zt,
                set: K.prototype.Su
            });
            K.prototype.get_m_pca = K.prototype.du = function() {
                return ge(this.zs)
            };
            K.prototype.set_m_pca = K.prototype.uv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ue(c, a)
            };
            Object.defineProperty(K.prototype, "m_pca", {
                get: K.prototype.du,
                set: K.prototype.uv
            });
            K.prototype.get_m_mode = K.prototype.Xt = function() {
                return ee(this.zs)
            };
            K.prototype.set_m_mode = K.prototype.pv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                se(c, a)
            };
            Object.defineProperty(K.prototype, "m_mode", {
                get: K.prototype.Xt,
                set: K.prototype.pv
            });
            K.prototype.get_m_convexhullApproximation = K.prototype.yt = function() {
                return Zd(this.zs)
            };
            K.prototype.set_m_convexhullApproximation = K.prototype.Ru = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                me(c, a)
            };
            Object.defineProperty(K.prototype, "m_convexhullApproximation", {
                get: K.prototype.yt,
                set: K.prototype.Ru
            });
            K.prototype.get_m_oclAcceleration = K.prototype.cu = function() {
                return fe(this.zs)
            };
            K.prototype.set_m_oclAcceleration = K.prototype.tv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                te(c, a)
            };
            Object.defineProperty(K.prototype, "m_oclAcceleration", {
                get: K.prototype.cu,
                set: K.prototype.tv
            });
            K.prototype.__destroy__ = function() {
                Vd(this.zs)
            };

            function Dv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = gg(a);
                l(Dv)[this.zs] = this
            }
            Dv.prototype = Object.create(Zu.prototype);
            Dv.prototype.constructor = Dv;
            Dv.prototype.As = Dv;
            Dv.Bs = {};
            g.btCollisionDispatcher = Dv;
            Dv.prototype.getNumManifolds = function() {
                return ig(this.zs)
            };
            Dv.prototype.getManifoldByIndexInternal = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(hg(c, a), kv)
            };
            Dv.prototype.__destroy__ = function() {
                fg(this.zs)
            };

            function Ev(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                this.zs = void 0 === d ? cf(a, c) : void 0 === e ? df(a, c, d) : void 0 === f ? ef(a, c, d, e) : ff(a, c, d, e, f);
                l(Ev)[this.zs] = this
            }
            Ev.prototype = Object.create(k.prototype);
            Ev.prototype.constructor = Ev;
            Ev.prototype.As = Ev;
            Ev.Bs = {};
            g.btAxisSweep3 = Ev;
            Ev.prototype.__destroy__ = function() {
                bf(this.zs)
            };

            function L() {
                this.zs = sd();
                l(L)[this.zs] = this
            }
            L.prototype = Object.create(k.prototype);
            L.prototype.constructor = L;
            L.prototype.As = L;
            L.Bs = {};
            g.HACD = L;
            L.prototype.SetCompacityWeight = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                td(c, a)
            };
            L.prototype.SetVolumeWeight = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bd(c, a)
            };
            L.prototype.SetConcavity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ud(c, a)
            };
            L.prototype.SetNClusters = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                vd(c, a)
            };
            L.prototype.SetNVerticesPerCH = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                yd(c, a)
            };
            L.prototype.SetPoints = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zd(c, a)
            };
            L.prototype.SetNPoints = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                wd(c, a)
            };
            L.prototype.SetTriangles = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ad(c, a)
            };
            L.prototype.SetNTriangles = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xd(c, a)
            };
            L.prototype.Compute = function() {
                nd(this.zs)
            };
            L.prototype.GetNClusters = function() {
                return pd(this.zs)
            };
            L.prototype.GetNPointsCH = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return qd(c, a)
            };
            L.prototype.GetNTrianglesCH = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return rd(c, a)
            };
            L.prototype.GetCH = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                return od(e, a, c, d)
            };
            L.prototype.__destroy__ = function() {
                Cd(this.zs)
            };

            function Xu() {
                throw "cannot construct a VoidPtr, no constructor in IDL";
            }
            Xu.prototype = Object.create(k.prototype);
            Xu.prototype.constructor = Xu;
            Xu.prototype.As = Xu;
            Xu.Bs = {};
            g.VoidPtr = Xu;
            Xu.prototype.__destroy__ = function() {
                Ze(this.zs)
            };

            function M(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = void 0 === d ? Xh(a, c) : void 0 === e ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(a, c, d) : Yh(a, c, d, e);
                l(M)[this.zs] = this
            }
            M.prototype = Object.create(Yu.prototype);
            M.prototype.constructor = M;
            M.prototype.As = M;
            M.Bs = {};
            g.btConeTwistConstraint = M;
            M.prototype.setLimit = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                fi(d, a, c)
            };
            M.prototype.setAngularOnly = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ci(c, a)
            };
            M.prototype.setDamping = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ei(c, a)
            };
            M.prototype.enableMotor = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $h(c, a)
            };
            M.prototype.setMaxMotorImpulse = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                hi(c, a)
            };
            M.prototype.setMaxMotorImpulseNormalized = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gi(c, a)
            };
            M.prototype.setMotorTarget = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ji(c, a)
            };
            M.prototype.setMotorTargetInConstraintSpace = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ii(c, a)
            };
            M.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Zh(c, a)
            };
            M.prototype.getBreakingImpulseThreshold = function() {
                return ai(this.zs)
            };
            M.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                di(c, a)
            };
            M.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return bi(d, a, c)
            };
            M.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                ki(e, a, c, d)
            };
            M.prototype.__destroy__ = function() {
                Wh(this.zs)
            };

            function Fv(a, c, d, e, f, n, r) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                n && "object" === typeof n && (n = n.zs);
                r && "object" === typeof r && (r = r.zs);
                this.zs = void 0 === d ? tn(a, c) : void 0 === e ? un(a, c, d) : void 0 === f ? vn(a, c, d, e) : void 0 === n ? wn(a, c, d, e, f) : void 0 === r ? xn(a, c, d, e, f, n) : yn(a, c, d, e, f, n, r);
                l(Fv)[this.zs] = this
            }
            Fv.prototype = Object.create(Yu.prototype);
            Fv.prototype.constructor = Fv;
            Fv.prototype.As = Fv;
            Fv.Bs = {};
            g.btHingeConstraint = Fv;
            Fv.prototype.setLimit = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                void 0 === f ? Gn(n, a, c, d, e) : Hn(n, a, c, d, e, f)
            };
            Fv.prototype.enableAngularMotor = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                zn(e, a, c, d)
            };
            Fv.prototype.setAngularOnly = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                En(c, a)
            };
            Fv.prototype.enableMotor = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bn(c, a)
            };
            Fv.prototype.setMaxMotorImpulse = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                In(c, a)
            };
            Fv.prototype.setMotorTarget = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Jn(d, a, c)
            };
            Fv.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                An(c, a)
            };
            Fv.prototype.getBreakingImpulseThreshold = function() {
                return Cn(this.zs)
            };
            Fv.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fn(c, a)
            };
            Fv.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return Dn(d, a, c)
            };
            Fv.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Kn(e, a, c, d)
            };
            Fv.prototype.__destroy__ = function() {
                sn(this.zs)
            };

            function Gv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Nh(a, c);
                l(Gv)[this.zs] = this
            }
            Gv.prototype = Object.create(fv.prototype);
            Gv.prototype.constructor = Gv;
            Gv.prototype.As = Gv;
            Gv.Bs = {};
            g.btConeShapeZ = Gv;
            Gv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Qh(c, a)
            };
            Gv.prototype.getLocalScaling = function() {
                return m(Ph(this.zs), q)
            };
            Gv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Oh(d, a, c)
            };
            Gv.prototype.__destroy__ = function() {
                Mh(this.zs)
            };

            function Hv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Ih(a, c);
                l(Hv)[this.zs] = this
            }
            Hv.prototype = Object.create(fv.prototype);
            Hv.prototype.constructor = Hv;
            Hv.prototype.As = Hv;
            Hv.Bs = {};
            g.btConeShapeX = Hv;
            Hv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lh(c, a)
            };
            Hv.prototype.getLocalScaling = function() {
                return m(Kh(this.zs), q)
            };
            Hv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Jh(d, a, c)
            };
            Hv.prototype.__destroy__ = function() {
                Hh(this.zs)
            };

            function Iv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = void 0 === a ? Jt() : void 0 === c ? Kt(a) : Lt(a, c);
                l(Iv)[this.zs] = this
            }
            Iv.prototype = Object.create(mv.prototype);
            Iv.prototype.constructor = Iv;
            Iv.prototype.As = Iv;
            Iv.Bs = {};
            g.btTriangleMesh = Iv;
            Iv.prototype.addTriangle = function(a, c, d, e) {
                var f = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                void 0 === e ? Ht(f, a, c, d) : It(f, a, c, d, e)
            };
            Iv.prototype.findOrAddVertex = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return Mt(d, a, c)
            };
            Iv.prototype.addIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gt(c, a)
            };
            Iv.prototype.getIndexedMeshArray = function() {
                return m(Nt(this.zs), zv)
            };
            Iv.prototype.setScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ot(c, a)
            };
            Iv.prototype.__destroy__ = function() {
                Ft(this.zs)
            };

            function Jv(a, c) {
                b.Is();
                "object" == typeof a && (a = Wu(a));
                c && "object" === typeof c && (c = c.zs);
                this.zs = void 0 === a ? Hi() : void 0 === c ? Ii(a) : Ji(a, c);
                l(Jv)[this.zs] = this
            }
            Jv.prototype = Object.create(p.prototype);
            Jv.prototype.constructor = Jv;
            Jv.prototype.As = Jv;
            Jv.Bs = {};
            g.btConvexHullShape = Jv;
            Jv.prototype.addPoint = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                void 0 === c ? Fi(d, a) : Gi(d, a, c)
            };
            Jv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Si(c, a)
            };
            Jv.prototype.getMargin = function() {
                return Ni(this.zs)
            };
            Jv.prototype.getNumVertices = function() {
                return Oi(this.zs)
            };
            Jv.prototype.initializePolyhedralFeatures = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return !!Pi(c, a)
            };
            Jv.prototype.recalcLocalAabb = function() {
                Qi(this.zs)
            };
            Jv.prototype.getConvexPolyhedron = function() {
                return m(Li(this.zs), O)
            };
            Jv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ri(c, a)
            };
            Jv.prototype.getLocalScaling = function() {
                return m(Mi(this.zs), q)
            };
            Jv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Ki(d, a, c)
            };
            Jv.prototype.__destroy__ = function() {
                Ei(this.zs)
            };

            function Kv() {
                throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL";
            }
            Kv.prototype = Object.create(k.prototype);
            Kv.prototype.constructor = Kv;
            Kv.prototype.As = Kv;
            Kv.Bs = {};
            g.btCollisionObjectWrapper = Kv;
            Kv.prototype.getWorldTransform = function() {
                return m(lg(this.zs), u)
            };
            Kv.prototype.getCollisionObject = function() {
                return m(jg(this.zs), t)
            };
            Kv.prototype.getCollisionShape = function() {
                return m(kg(this.zs), p)
            };

            function Lv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = Ms(a);
                l(Lv)[this.zs] = this
            }
            Lv.prototype = Object.create(k.prototype);
            Lv.prototype.constructor = Lv;
            Lv.prototype.As = Lv;
            Lv.Bs = {};
            g.btShapeHull = Lv;
            Lv.prototype.buildHull = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return !!Ns(c, a)
            };
            Lv.prototype.numVertices = function() {
                return Ps(this.zs)
            };
            Lv.prototype.getVertexPointer = function() {
                return m(Os(this.zs), q)
            };
            Lv.prototype.__destroy__ = function() {
                Ls(this.zs)
            };

            function Mv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = void 0 === a ? Pj() : void 0 === c ? Qj(a) : Rj(a, c);
                l(Mv)[this.zs] = this
            }
            Mv.prototype = Object.create(nv.prototype);
            Mv.prototype.constructor = Mv;
            Mv.prototype.As = Mv;
            Mv.Bs = {};
            g.btDefaultMotionState = Mv;
            Mv.prototype.getWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Sj(c, a)
            };
            Mv.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Uj(c, a)
            };
            Mv.prototype.get_m_graphicsWorldTrans = Mv.prototype.It = function() {
                return m(Tj(this.zs), u)
            };
            Mv.prototype.set_m_graphicsWorldTrans = Mv.prototype.av = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vj(c, a)
            };
            Object.defineProperty(Mv.prototype, "m_graphicsWorldTrans", {
                get: Mv.prototype.It,
                set: Mv.prototype.av
            });
            Mv.prototype.__destroy__ = function() {
                Oj(this.zs)
            };

            function P(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = void 0 === a ? qu() : void 0 === c ? _emscripten_bind_btVector4_btVector4_1(a) : void 0 === d ? _emscripten_bind_btVector4_btVector4_2(a, c) : void 0 === e ? _emscripten_bind_btVector4_btVector4_3(a, c, d) : ru(a, c, d, e);
                l(P)[this.zs] = this
            }
            P.prototype = Object.create(q.prototype);
            P.prototype.constructor = P;
            P.prototype.As = P;
            P.Bs = {};
            g.btVector4 = P;
            P.prototype.w = P.prototype.ht = function() {
                return Eu(this.zs)
            };
            P.prototype.setValue = function(a, c, d, e) {
                var f = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                Au(f, a, c, d, e)
            };
            P.prototype.length = P.prototype.length = function() {
                return uu(this.zs)
            };
            P.prototype.length2 = function() {
                return tu(this.zs)
            };
            P.prototype.x = P.prototype.x = function() {
                return Fu(this.zs)
            };
            P.prototype.y = P.prototype.y = function() {
                return Gu(this.zs)
            };
            P.prototype.z = P.prototype.z = function() {
                return Hu(this.zs)
            };
            P.prototype.setX = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bu(c, a)
            };
            P.prototype.setY = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Cu(c, a)
            };
            P.prototype.setZ = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Du(c, a)
            };
            P.prototype.normalize = P.prototype.normalize = function() {
                vu(this.zs)
            };
            P.prototype.rotate = P.prototype.rotate = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return m(zu(d, a, c), q)
            };
            P.prototype.dot = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return su(c, a)
            };
            P.prototype.op_mul = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(xu(c, a), q)
            };
            P.prototype.op_add = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(wu(c, a), q)
            };
            P.prototype.op_sub = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(yu(c, a), q)
            };
            P.prototype.__destroy__ = function() {
                pu(this.zs)
            };

            function Nv() {
                this.zs = Nj();
                l(Nv)[this.zs] = this
            }
            Nv.prototype = Object.create(k.prototype);
            Nv.prototype.constructor = Nv;
            Nv.prototype.As = Nv;
            Nv.Bs = {};
            g.btDefaultCollisionConstructionInfo = Nv;
            Nv.prototype.__destroy__ = function() {
                Mj(this.zs)
            };

            function wv() {
                throw "cannot construct a btVector3Array, no constructor in IDL";
            }
            wv.prototype = Object.create(k.prototype);
            wv.prototype.constructor = wv;
            wv.prototype.As = wv;
            wv.Bs = {};
            g.btVector3Array = wv;
            wv.prototype.size = wv.prototype.size = function() {
                return Xt(this.zs)
            };
            wv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Wt(c, a), q)
            };
            wv.prototype.__destroy__ = function() {
                Vt(this.zs)
            };

            function Ov() {
                throw "cannot construct a btConstraintSolver, no constructor in IDL";
            }
            Ov.prototype = Object.create(k.prototype);
            Ov.prototype.constructor = Ov;
            Ov.prototype.As = Ov;
            Ov.Bs = {};
            g.btConstraintSolver = Ov;
            Ov.prototype.__destroy__ = function() {
                wi(this.zs)
            };

            function Pv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = mj(a);
                l(Pv)[this.zs] = this
            }
            Pv.prototype = Object.create(iv.prototype);
            Pv.prototype.constructor = Pv;
            Pv.prototype.As = Pv;
            Pv.Bs = {};
            g.btCylinderShapeX = Pv;
            Pv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                rj(c, a)
            };
            Pv.prototype.getMargin = function() {
                return pj(this.zs)
            };
            Pv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qj(c, a)
            };
            Pv.prototype.getLocalScaling = function() {
                return m(oj(this.zs), q)
            };
            Pv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                nj(d, a, c)
            };
            Pv.prototype.__destroy__ = function() {
                lj(this.zs)
            };

            function Qv(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = tj(a);
                l(Qv)[this.zs] = this
            }
            Qv.prototype = Object.create(iv.prototype);
            Qv.prototype.constructor = Qv;
            Qv.prototype.As = Qv;
            Qv.Bs = {};
            g.btCylinderShapeZ = Qv;
            Qv.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                yj(c, a)
            };
            Qv.prototype.getMargin = function() {
                return wj(this.zs)
            };
            Qv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xj(c, a)
            };
            Qv.prototype.getLocalScaling = function() {
                return m(vj(this.zs), q)
            };
            Qv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                uj(d, a, c)
            };
            Qv.prototype.__destroy__ = function() {
                sj(this.zs)
            };

            function O() {
                throw "cannot construct a btConvexPolyhedron, no constructor in IDL";
            }
            O.prototype = Object.create(k.prototype);
            O.prototype.constructor = O;
            O.prototype.As = O;
            O.Bs = {};
            g.btConvexPolyhedron = O;
            O.prototype.get_m_vertices = O.prototype.Au = function() {
                return m(Vi(this.zs), wv)
            };
            O.prototype.set_m_vertices = O.prototype.Pv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xi(c, a)
            };
            Object.defineProperty(O.prototype, "m_vertices", {
                get: O.prototype.Au,
                set: O.prototype.Pv
            });
            O.prototype.get_m_faces = O.prototype.Ft = function() {
                return m(Ui(this.zs), Rv)
            };
            O.prototype.set_m_faces = O.prototype.Yu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Wi(c, a)
            };
            Object.defineProperty(O.prototype, "m_faces", {
                get: O.prototype.Ft,
                set: O.prototype.Yu
            });
            O.prototype.__destroy__ = function() {
                Ti(this.zs)
            };

            function Sv() {
                this.zs = Ks();
                l(Sv)[this.zs] = this
            }
            Sv.prototype = Object.create(k.prototype);
            Sv.prototype.constructor = Sv;
            Sv.prototype.As = Sv;
            Sv.Bs = {};
            g.btSequentialImpulseConstraintSolver = Sv;
            Sv.prototype.__destroy__ = function() {
                Js(this.zs)
            };

            function Tv(a, c, d) {
                b.Is();
                a && "object" === typeof a && (a = a.zs);
                "object" == typeof c && (c = Wu(c));
                d && "object" === typeof d && (d = d.zs);
                this.zs = Xo(a, c, d);
                l(Tv)[this.zs] = this
            }
            Tv.prototype = Object.create(p.prototype);
            Tv.prototype.constructor = Tv;
            Tv.prototype.As = Tv;
            Tv.Bs = {};
            g.btMultiSphereShape = Tv;
            Tv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $o(c, a)
            };
            Tv.prototype.getLocalScaling = function() {
                return m(Zo(this.zs), q)
            };
            Tv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Yo(d, a, c)
            };
            Tv.prototype.__destroy__ = function() {
                Wo(this.zs)
            };

            function Uv() {
                throw "cannot construct a btIntArray, no constructor in IDL";
            }
            Uv.prototype = Object.create(k.prototype);
            Uv.prototype.constructor = Uv;
            Uv.prototype.As = Uv;
            Uv.Bs = {};
            g.btIntArray = Uv;
            Uv.prototype.size = Uv.prototype.size = function() {
                return $n(this.zs)
            };
            Uv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return Zn(c, a)
            };
            Uv.prototype.__destroy__ = function() {
                Yn(this.zs)
            };

            function Q(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = fk(a, c, d, e);
                l(Q)[this.zs] = this
            }
            Q.prototype = Object.create(y.prototype);
            Q.prototype.constructor = Q;
            Q.prototype.As = Q;
            Q.Bs = {};
            g.btDiscreteDynamicsWorld = Q;
            Q.prototype.setGravity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ck(c, a)
            };
            Q.prototype.getGravity = function() {
                return m(pk(this.zs), q)
            };
            Q.prototype.addRigidBody = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                void 0 === c ? dk(e, a) : void 0 === d ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(e, a, c) : ek(e, a, c, d)
            };
            Q.prototype.removeRigidBody = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                wk(c, a)
            };
            Q.prototype.addConstraint = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                void 0 === c ? bk(d, a) : ck(d, a, c)
            };
            Q.prototype.removeConstraint = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                vk(c, a)
            };
            Q.prototype.stepSimulation = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                return void 0 === c ? Dk(e, a) : void 0 === d ? Ek(e, a, c) : Fk(e, a, c, d)
            };
            Q.prototype.setContactAddedCallback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xk(c, a)
            };
            Q.prototype.setContactProcessedCallback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zk(c, a)
            };
            Q.prototype.setContactDestroyedCallback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                yk(c, a)
            };
            Q.prototype.getDispatcher = function() {
                return m(ok(this.zs), Zu)
            };
            Q.prototype.rayTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                sk(e, a, c, d)
            };
            Q.prototype.getPairCache = function() {
                return m(qk(this.zs), $u)
            };
            Q.prototype.getDispatchInfo = function() {
                return m(nk(this.zs), x)
            };
            Q.prototype.addCollisionObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                void 0 === c ? Yj(e, a) : void 0 === d ? Zj(e, a, c) : ak(e, a, c, d)
            };
            Q.prototype.removeCollisionObject = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                uk(c, a)
            };
            Q.prototype.getBroadphase = function() {
                return m(lk(this.zs), av)
            };
            Q.prototype.convexSweepTest = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                ik(n, a, c, d, e, f)
            };
            Q.prototype.contactPairTest = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                gk(e, a, c, d)
            };
            Q.prototype.contactTest = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                hk(d, a, c)
            };
            Q.prototype.setForceUpdateAllAabbs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bk(c, a)
            };
            Q.prototype.updateSingleAabb = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gk(c, a)
            };
            Q.prototype.setDebugDrawer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ak(c, a)
            };
            Q.prototype.getDebugDrawer = function() {
                return m(mk(this.zs), bv)
            };
            Q.prototype.debugDrawWorld = function() {
                kk(this.zs)
            };
            Q.prototype.debugDrawObject = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                jk(e, a, c, d)
            };
            Q.prototype.addAction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xj(c, a)
            };
            Q.prototype.removeAction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                tk(c, a)
            };
            Q.prototype.getSolverInfo = function() {
                return m(rk(this.zs), z)
            };
            Q.prototype.__destroy__ = function() {
                Wj(this.zs)
            };

            function Vv() {
                this.zs = kn();
                l(Vv)[this.zs] = this
            }
            Vv.prototype = Object.create(k.prototype);
            Vv.prototype.constructor = Vv;
            Vv.prototype.As = Vv;
            Vv.Bs = {};
            g.btGhostPairCallback = Vv;
            Vv.prototype.__destroy__ = function() {
                jn(this.zs)
            };

            function Wv() {
                throw "cannot construct a btOverlappingPairCallback, no constructor in IDL";
            }
            Wv.prototype = Object.create(k.prototype);
            Wv.prototype.constructor = Wv;
            Wv.prototype.As = Wv;
            Wv.Bs = {};
            g.btOverlappingPairCallback = Wv;
            Wv.prototype.__destroy__ = function() {
                ep(this.zs)
            };

            function R(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = void 0 === e ? bo(a, c, d) : co(a, c, d, e);
                l(R)[this.zs] = this
            }
            R.prototype = Object.create(gv.prototype);
            R.prototype.constructor = R;
            R.prototype.As = R;
            R.Bs = {};
            g.btKinematicCharacterController = R;
            R.prototype.setUpAxis = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ro(c, a)
            };
            R.prototype.setWalkDirection = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                vo(c, a)
            };
            R.prototype.setVelocityForTimeInterval = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                uo(d, a, c)
            };
            R.prototype.warp = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                xo(c, a)
            };
            R.prototype.preStep = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                lo(c, a)
            };
            R.prototype.playerStep = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                ko(d, a, c)
            };
            R.prototype.setFallSpeed = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mo(c, a)
            };
            R.prototype.setJumpSpeed = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                oo(c, a)
            };
            R.prototype.setMaxJumpHeight = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                po(c, a)
            };
            R.prototype.canJump = function() {
                return !!eo(this.zs)
            };
            R.prototype.jump = function() {
                io(this.zs)
            };
            R.prototype.setGravity = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                no(c, a)
            };
            R.prototype.getGravity = function() {
                return go(this.zs)
            };
            R.prototype.setMaxSlope = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qo(c, a)
            };
            R.prototype.getMaxSlope = function() {
                return ho(this.zs)
            };
            R.prototype.getGhostObject = function() {
                return m(fo(this.zs), S)
            };
            R.prototype.setUseGhostSweepTest = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                to(c, a)
            };
            R.prototype.onGround = function() {
                return !!jo(this.zs)
            };
            R.prototype.setUpInterpolate = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                so(c, a)
            };
            R.prototype.updateAction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                wo(d, a, c)
            };
            R.prototype.__destroy__ = function() {
                ao(this.zs)
            };

            function Rv() {
                throw "cannot construct a btFaceArray, no constructor in IDL";
            }
            Rv.prototype = Object.create(k.prototype);
            Rv.prototype.constructor = Rv;
            Rv.prototype.As = Rv;
            Rv.Bs = {};
            g.btFaceArray = Rv;
            Rv.prototype.size = Rv.prototype.size = function() {
                return Jl(this.zs)
            };
            Rv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Il(c, a), T)
            };
            Rv.prototype.__destroy__ = function() {
                Hl(this.zs)
            };

            function Xv(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = jt(a, c);
                l(Xv)[this.zs] = this
            }
            Xv.prototype = Object.create(cv.prototype);
            Xv.prototype.constructor = Xv;
            Xv.prototype.As = Xv;
            Xv.Bs = {};
            g.btStaticPlaneShape = Xv;
            Xv.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mt(c, a)
            };
            Xv.prototype.getLocalScaling = function() {
                return m(lt(this.zs), q)
            };
            Xv.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                kt(d, a, c)
            };
            Xv.prototype.__destroy__ = function() {
                it(this.zs)
            };

            function $u() {
                throw "cannot construct a btOverlappingPairCache, no constructor in IDL";
            }
            $u.prototype = Object.create(k.prototype);
            $u.prototype.constructor = $u;
            $u.prototype.As = $u;
            $u.Bs = {};
            g.btOverlappingPairCache = $u;
            $u.prototype.setInternalGhostPairCallback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dp(c, a)
            };
            $u.prototype.removeOverlappingPairsContainingProxy = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                cp(d, a, c)
            };
            $u.prototype.getNumOverlappingPairs = function() {
                return bp(this.zs)
            };
            $u.prototype.__destroy__ = function() {
                ap(this.zs)
            };

            function Av() {
                throw "cannot construct a btIndexedMesh, no constructor in IDL";
            }
            Av.prototype = Object.create(k.prototype);
            Av.prototype.constructor = Av;
            Av.prototype.As = Av;
            Av.Bs = {};
            g.btIndexedMesh = Av;
            Av.prototype.get_m_numTriangles = Av.prototype.bu = function() {
                return Wn(this.zs)
            };
            Av.prototype.set_m_numTriangles = Av.prototype.sv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xn(c, a)
            };
            Object.defineProperty(Av.prototype, "m_numTriangles", {
                get: Av.prototype.bu,
                set: Av.prototype.sv
            });
            Av.prototype.__destroy__ = function() {
                Vn(this.zs)
            };

            function Yv(a, c, d) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                this.zs = Ue(a, c, d);
                l(Yv)[this.zs] = this
            }
            Yv.prototype = Object.create(k.prototype);
            Yv.prototype.constructor = Yv;
            Yv.prototype.As = Yv;
            Yv.Bs = {};
            g.Vec3Real = Yv;
            Yv.prototype.X = function() {
                return Ve(this.zs)
            };
            Yv.prototype.Y = function() {
                return We(this.zs)
            };
            Yv.prototype.Z = function() {
                return Xe(this.zs)
            };
            Yv.prototype.__destroy__ = function() {
                Ye(this.zs)
            };

            function Zv(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = Ql(a, c, d, e);
                l(Zv)[this.zs] = this
            }
            Zv.prototype = Object.create(Yu.prototype);
            Zv.prototype.constructor = Zv;
            Zv.prototype.As = Zv;
            Zv.Bs = {};
            g.btFixedConstraint = Zv;
            Zv.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Rl(c, a)
            };
            Zv.prototype.getBreakingImpulseThreshold = function() {
                return Sl(this.zs)
            };
            Zv.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ul(c, a)
            };
            Zv.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return Tl(d, a, c)
            };
            Zv.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Vl(e, a, c, d)
            };
            Zv.prototype.__destroy__ = function() {
                Pl(this.zs)
            };

            function u(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = void 0 === a ? qt() : void 0 === c ? _emscripten_bind_btTransform_btTransform_1(a) : rt(a, c);
                l(u)[this.zs] = this
            }
            u.prototype = Object.create(k.prototype);
            u.prototype.constructor = u;
            u.prototype.As = u;
            u.Bs = {};
            g.btTransform = u;
            u.prototype.setIdentity = function() {
                yt(this.zs)
            };
            u.prototype.setOrigin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zt(c, a)
            };
            u.prototype.setRotation = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                At(c, a)
            };
            u.prototype.getOrigin = function() {
                return m(tt(this.zs), q)
            };
            u.prototype.getRotation = function() {
                return m(ut(this.zs), U)
            };
            u.prototype.getBasis = function() {
                return m(st(this.zs), pv)
            };
            u.prototype.setFromOpenGLMatrix = function(a) {
                var c = this.zs;
                b.Is();
                "object" == typeof a && (a = Wu(a));
                xt(c, a)
            };
            u.prototype.inverse = u.prototype.inverse = function() {
                return m(vt(this.zs), u)
            };
            u.prototype.op_mul = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(wt(c, a), u)
            };
            u.prototype.__destroy__ = function() {
                pt(this.zs)
            };

            function V(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = tc(a, c);
                l(V)[this.zs] = this
            }
            V.prototype = Object.create(C.prototype);
            V.prototype.constructor = V;
            V.prototype.As = V;
            V.Bs = {};
            g.ClosestRayResultCallback = V;
            V.prototype.hasHit = function() {
                return !!Dc(this.zs)
            };
            V.prototype.get_m_rayFromWorld = V.prototype.bt = function() {
                return m(Bc(this.zs), q)
            };
            V.prototype.set_m_rayFromWorld = V.prototype.et = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lc(c, a)
            };
            Object.defineProperty(V.prototype, "m_rayFromWorld", {
                get: V.prototype.bt,
                set: V.prototype.et
            });
            V.prototype.get_m_rayToWorld = V.prototype.ct = function() {
                return m(Cc(this.zs), q)
            };
            V.prototype.set_m_rayToWorld = V.prototype.ft = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Mc(c, a)
            };
            Object.defineProperty(V.prototype, "m_rayToWorld", {
                get: V.prototype.ct,
                set: V.prototype.ft
            });
            V.prototype.get_m_hitNormalWorld = V.prototype.Ns = function() {
                return m(zc(this.zs), q)
            };
            V.prototype.set_m_hitNormalWorld = V.prototype.Ss = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jc(c, a)
            };
            Object.defineProperty(V.prototype, "m_hitNormalWorld", {
                get: V.prototype.Ns,
                set: V.prototype.Ss
            });
            V.prototype.get_m_hitPointWorld = V.prototype.Os = function() {
                return m(Ac(this.zs), q)
            };
            V.prototype.set_m_hitPointWorld = V.prototype.Ts = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kc(c, a)
            };
            Object.defineProperty(V.prototype, "m_hitPointWorld", {
                get: V.prototype.Os,
                set: V.prototype.Ts
            });
            V.prototype.get_m_collisionFilterGroup = V.prototype.Ds = function() {
                return wc(this.zs)
            };
            V.prototype.set_m_collisionFilterGroup = V.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gc(c, a)
            };
            Object.defineProperty(V.prototype, "m_collisionFilterGroup", {
                get: V.prototype.Ds,
                set: V.prototype.Fs
            });
            V.prototype.get_m_collisionFilterMask = V.prototype.Es = function() {
                return xc(this.zs)
            };
            V.prototype.set_m_collisionFilterMask = V.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Hc(c, a)
            };
            Object.defineProperty(V.prototype, "m_collisionFilterMask", {
                get: V.prototype.Es,
                set: V.prototype.Gs
            });
            V.prototype.get_m_closestHitFraction = V.prototype.Hs = function() {
                return vc(this.zs)
            };
            V.prototype.set_m_closestHitFraction = V.prototype.Js = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fc(c, a)
            };
            Object.defineProperty(V.prototype, "m_closestHitFraction", {
                get: V.prototype.Hs,
                set: V.prototype.Js
            });
            V.prototype.get_m_collisionObject = V.prototype.Ms = function() {
                return m(yc(this.zs), t)
            };
            V.prototype.set_m_collisionObject = V.prototype.Rs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ic(c, a)
            };
            Object.defineProperty(V.prototype, "m_collisionObject", {
                get: V.prototype.Ms,
                set: V.prototype.Rs
            });
            V.prototype.__destroy__ = function() {
                uc(this.zs)
            };

            function $v() {
                this.zs = Nc();
                l($v)[this.zs] = this
            }
            $v.prototype = Object.create(ov.prototype);
            $v.prototype.constructor = $v;
            $v.prototype.As = $v;
            $v.Bs = {};
            g.ConcreteContactResultCallback = $v;
            $v.prototype.addSingleResult = function(a, c, d, e, f, n, r) {
                var N = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                n && "object" === typeof n && (n = n.zs);
                r && "object" === typeof r && (r = r.zs);
                return Pc(N, a, c, d, e, f, n, r)
            };
            $v.prototype.__destroy__ = function() {
                Oc(this.zs)
            };

            function aw(a, c, d) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                this.zs = void 0 === d ? wf(a, c) : xf(a, c, d);
                l(aw)[this.zs] = this
            }
            aw.prototype = Object.create(ev.prototype);
            aw.prototype.constructor = aw;
            aw.prototype.As = aw;
            aw.Bs = {};
            g.btBvhTriangleMeshShape = aw;
            aw.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Af(c, a)
            };
            aw.prototype.getLocalScaling = function() {
                return m(zf(this.zs), q)
            };
            aw.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                yf(d, a, c)
            };
            aw.prototype.__destroy__ = function() {
                vf(this.zs)
            };

            function bw(a, c, d) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                this.zs = Pe(a, c, d);
                l(bw)[this.zs] = this
            }
            bw.prototype = Object.create(k.prototype);
            bw.prototype.constructor = bw;
            bw.prototype.As = bw;
            bw.Bs = {};
            g.Vec3Long = bw;
            bw.prototype.X = function() {
                return Qe(this.zs)
            };
            bw.prototype.Y = function() {
                return Re(this.zs)
            };
            bw.prototype.Z = function() {
                return Se(this.zs)
            };
            bw.prototype.__destroy__ = function() {
                Te(this.zs)
            };

            function vv() {
                throw "cannot construct a btConstCollisionObjectArray, no constructor in IDL";
            }
            vv.prototype = Object.create(k.prototype);
            vv.prototype.constructor = vv;
            vv.prototype.As = vv;
            vv.Bs = {};
            g.btConstCollisionObjectArray = vv;
            vv.prototype.size = vv.prototype.size = function() {
                return ni(this.zs)
            };
            vv.prototype.at = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(mi(c, a), t)
            };
            vv.prototype.__destroy__ = function() {
                li(this.zs)
            };

            function cw(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                this.zs = void 0 === e ? Rs(a, c, d) : void 0 === f ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(a, c, d, e) : Ss(a, c, d, e, f);
                l(cw)[this.zs] = this
            }
            cw.prototype = Object.create(Yu.prototype);
            cw.prototype.constructor = cw;
            cw.prototype.As = cw;
            cw.Bs = {};
            g.btSliderConstraint = cw;
            cw.prototype.setLowerLinLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ys(c, a)
            };
            cw.prototype.setUpperLinLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                at(c, a)
            };
            cw.prototype.setLowerAngLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Xs(c, a)
            };
            cw.prototype.setUpperAngLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                $s(c, a)
            };
            cw.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ts(c, a)
            };
            cw.prototype.getBreakingImpulseThreshold = function() {
                return Us(this.zs)
            };
            cw.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ws(c, a)
            };
            cw.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return Vs(d, a, c)
            };
            cw.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Zs(e, a, c, d)
            };
            cw.prototype.__destroy__ = function() {
                Qs(this.zs)
            };

            function S() {
                this.zs = ip();
                l(S)[this.zs] = this
            }
            S.prototype = Object.create(A.prototype);
            S.prototype.constructor = S;
            S.prototype.As = S;
            S.Bs = {};
            g.btPairCachingGhostObject = S;
            S.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Ap(d, a, c)
            };
            S.prototype.getCollisionShape = function() {
                return m(mp(this.zs), p)
            };
            S.prototype.setContactProcessingThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Fp(c, a)
            };
            S.prototype.setActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zp(c, a)
            };
            S.prototype.forceActivationState = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                jp(c, a)
            };
            S.prototype.activate = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                void 0 === a ? gp(c) : hp(c, a)
            };
            S.prototype.isActive = function() {
                return !!vp(this.zs)
            };
            S.prototype.isKinematicObject = function() {
                return !!wp(this.zs)
            };
            S.prototype.isStaticObject = function() {
                return !!xp(this.zs)
            };
            S.prototype.isStaticOrKinematicObject = function() {
                return !!yp(this.zs)
            };
            S.prototype.getRestitution = function() {
                return qp(this.zs)
            };
            S.prototype.getFriction = function() {
                return np(this.zs)
            };
            S.prototype.getRollingFriction = function() {
                return rp(this.zs)
            };
            S.prototype.setRestitution = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Hp(c, a)
            };
            S.prototype.setFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Gp(c, a)
            };
            S.prototype.setRollingFriction = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ip(c, a)
            };
            S.prototype.getWorldTransform = function() {
                return m(up(this.zs), u)
            };
            S.prototype.getCollisionFlags = function() {
                return lp(this.zs)
            };
            S.prototype.setCollisionFlags = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Dp(c, a)
            };
            S.prototype.setWorldTransform = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lp(c, a)
            };
            S.prototype.setCollisionShape = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ep(c, a)
            };
            S.prototype.setCcdMotionThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bp(c, a)
            };
            S.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Cp(c, a)
            };
            S.prototype.getUserIndex = function() {
                return sp(this.zs)
            };
            S.prototype.setUserIndex = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jp(c, a)
            };
            S.prototype.getUserPointer = function() {
                return m(tp(this.zs), Xu)
            };
            S.prototype.setUserPointer = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kp(c, a)
            };
            S.prototype.getBroadphaseHandle = function() {
                return m(kp(this.zs), v)
            };
            S.prototype.getNumOverlappingObjects = function() {
                return op(this.zs)
            };
            S.prototype.getOverlappingObject = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(pp(c, a), t)
            };
            S.prototype.__destroy__ = function() {
                fp(this.zs)
            };

            function E() {
                throw "cannot construct a btManifoldPoint, no constructor in IDL";
            }
            E.prototype = Object.create(k.prototype);
            E.prototype.constructor = E;
            E.prototype.As = E;
            E.Bs = {};
            g.btManifoldPoint = E;
            E.prototype.getPositionWorldOnA = function() {
                return m(Bo(this.zs), q)
            };
            E.prototype.getPositionWorldOnB = function() {
                return m(Co(this.zs), q)
            };
            E.prototype.getAppliedImpulse = function() {
                return zo(this.zs)
            };
            E.prototype.getDistance = function() {
                return Ao(this.zs)
            };
            E.prototype.get_m_localPointA = E.prototype.St = function() {
                return m(Do(this.zs), q)
            };
            E.prototype.set_m_localPointA = E.prototype.kv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jo(c, a)
            };
            Object.defineProperty(E.prototype, "m_localPointA", {
                get: E.prototype.St,
                set: E.prototype.kv
            });
            E.prototype.get_m_localPointB = E.prototype.Tt = function() {
                return m(Eo(this.zs), q)
            };
            E.prototype.set_m_localPointB = E.prototype.lv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ko(c, a)
            };
            Object.defineProperty(E.prototype, "m_localPointB", {
                get: E.prototype.Tt,
                set: E.prototype.lv
            });
            E.prototype.get_m_positionWorldOnB = E.prototype.iu = function() {
                return m(Ho(this.zs), q)
            };
            E.prototype.set_m_positionWorldOnB = E.prototype.yv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                No(c, a)
            };
            Object.defineProperty(E.prototype, "m_positionWorldOnB", {
                get: E.prototype.iu,
                set: E.prototype.yv
            });
            E.prototype.get_m_positionWorldOnA = E.prototype.hu = function() {
                return m(Go(this.zs), q)
            };
            E.prototype.set_m_positionWorldOnA = E.prototype.xv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Mo(c, a)
            };
            Object.defineProperty(E.prototype, "m_positionWorldOnA", {
                get: E.prototype.hu,
                set: E.prototype.xv
            });
            E.prototype.get_m_normalWorldOnB = E.prototype.$t = function() {
                return m(Fo(this.zs), q)
            };
            E.prototype.set_m_normalWorldOnB = E.prototype.qv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lo(c, a)
            };
            Object.defineProperty(E.prototype, "m_normalWorldOnB", {
                get: E.prototype.$t,
                set: E.prototype.qv
            });
            E.prototype.get_m_userPersistentData = E.prototype.zu = function() {
                return Io(this.zs)
            };
            E.prototype.set_m_userPersistentData = E.prototype.Ov = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Oo(c, a)
            };
            Object.defineProperty(E.prototype, "m_userPersistentData", {
                get: E.prototype.zu,
                set: E.prototype.Ov
            });
            E.prototype.__destroy__ = function() {
                yo(this.zs)
            };

            function W(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = void 0 === d ? Tp(a, c) : void 0 === e ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(a, c, d) : Up(a, c, d, e);
                l(W)[this.zs] = this
            }
            W.prototype = Object.create(Yu.prototype);
            W.prototype.constructor = W;
            W.prototype.As = W;
            W.Bs = {};
            g.btPoint2PointConstraint = W;
            W.prototype.setPivotA = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                cq(c, a)
            };
            W.prototype.setPivotB = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                dq(c, a)
            };
            W.prototype.getPivotInA = function() {
                return m(Yp(this.zs), q)
            };
            W.prototype.getPivotInB = function() {
                return m(Zp(this.zs), q)
            };
            W.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Vp(c, a)
            };
            W.prototype.getBreakingImpulseThreshold = function() {
                return Wp(this.zs)
            };
            W.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                aq(c, a)
            };
            W.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return Xp(d, a, c)
            };
            W.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                bq(e, a, c, d)
            };
            W.prototype.get_m_setting = W.prototype.mu = function() {
                return m($p(this.zs), H)
            };
            W.prototype.set_m_setting = W.prototype.Cv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                eq(c, a)
            };
            Object.defineProperty(W.prototype, "m_setting", {
                get: W.prototype.mu,
                set: W.prototype.Cv
            });
            W.prototype.__destroy__ = function() {
                Sp(this.zs)
            };

            function v() {
                throw "cannot construct a btBroadphaseProxy, no constructor in IDL";
            }
            v.prototype = Object.create(k.prototype);
            v.prototype.constructor = v;
            v.prototype.As = v;
            v.Bs = {};
            g.btBroadphaseProxy = v;
            v.prototype.get_m_collisionFilterGroup = v.prototype.Ds = function() {
                return rf(this.zs)
            };
            v.prototype.set_m_collisionFilterGroup = v.prototype.Fs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                tf(c, a)
            };
            Object.defineProperty(v.prototype, "m_collisionFilterGroup", {
                get: v.prototype.Ds,
                set: v.prototype.Fs
            });
            v.prototype.get_m_collisionFilterMask = v.prototype.Es = function() {
                return sf(this.zs)
            };
            v.prototype.set_m_collisionFilterMask = v.prototype.Gs = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                uf(c, a)
            };
            Object.defineProperty(v.prototype, "m_collisionFilterMask", {
                get: v.prototype.Es,
                set: v.prototype.Gs
            });
            v.prototype.__destroy__ = function() {
                qf(this.zs)
            };

            function dw(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = hf(a);
                l(dw)[this.zs] = this
            }
            dw.prototype = Object.create(p.prototype);
            dw.prototype.constructor = dw;
            dw.prototype.As = dw;
            dw.Bs = {};
            g.btBoxShape = dw;
            dw.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                nf(c, a)
            };
            dw.prototype.getMargin = function() {
                return lf(this.zs)
            };
            dw.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                mf(c, a)
            };
            dw.prototype.getLocalScaling = function() {
                return m(kf(this.zs), q)
            };
            dw.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                jf(d, a, c)
            };
            dw.prototype.__destroy__ = function() {
                gf(this.zs)
            };

            function T() {
                throw "cannot construct a btFace, no constructor in IDL";
            }
            T.prototype = Object.create(k.prototype);
            T.prototype.constructor = T;
            T.prototype.As = T;
            T.Bs = {};
            g.btFace = T;
            T.prototype.get_m_indices = T.prototype.Pt = function() {
                return m(Ll(this.zs), Uv)
            };
            T.prototype.set_m_indices = T.prototype.hv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Nl(c, a)
            };
            Object.defineProperty(T.prototype, "m_indices", {
                get: T.prototype.Pt,
                set: T.prototype.hv
            });
            T.prototype.get_m_plane = T.prototype.eu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return Ml(c, a)
            };
            T.prototype.set_m_plane = T.prototype.vv = function(a, c) {
                var d = this.zs;
                b.Is();
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Ol(d, a, c)
            };
            Object.defineProperty(T.prototype, "m_plane", {
                get: T.prototype.eu,
                set: T.prototype.vv
            });
            T.prototype.__destroy__ = function() {
                Kl(this.zs)
            };

            function ew() {
                this.zs = fd();
                l(ew)[this.zs] = this
            }
            ew.prototype = Object.create(bv.prototype);
            ew.prototype.constructor = ew;
            ew.prototype.As = ew;
            ew.Bs = {};
            g.DebugDrawer = ew;
            ew.prototype.drawLine = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                jd(e, a, c, d)
            };
            ew.prototype.drawContactPoint = function(a, c, d, e, f) {
                var n = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                id(n, a, c, d, e, f)
            };
            ew.prototype.reportErrorWarning = function(a) {
                var c = this.zs;
                b.Is();
                a = a && "object" === typeof a ? a.zs : Vu(a);
                ld(c, a)
            };
            ew.prototype.draw3dText = function(a, c) {
                var d = this.zs;
                b.Is();
                a && "object" === typeof a && (a = a.zs);
                c = c && "object" === typeof c ? c.zs : Vu(c);
                hd(d, a, c)
            };
            ew.prototype.setDebugMode = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                md(c, a)
            };
            ew.prototype.getDebugMode = function() {
                return kd(this.zs)
            };
            ew.prototype.__destroy__ = function() {
                gd(this.zs)
            };

            function fw(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Cf(a, c);
                l(fw)[this.zs] = this
            }
            fw.prototype = Object.create(dv.prototype);
            fw.prototype.constructor = fw;
            fw.prototype.As = fw;
            fw.Bs = {};
            g.btCapsuleShapeX = fw;
            fw.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kf(c, a)
            };
            fw.prototype.getMargin = function() {
                return Gf(this.zs)
            };
            fw.prototype.getUpAxis = function() {
                return If(this.zs)
            };
            fw.prototype.getRadius = function() {
                return Hf(this.zs)
            };
            fw.prototype.getHalfHeight = function() {
                return Ef(this.zs)
            };
            fw.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jf(c, a)
            };
            fw.prototype.getLocalScaling = function() {
                return m(Ff(this.zs), q)
            };
            fw.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Df(d, a, c)
            };
            fw.prototype.__destroy__ = function() {
                Bf(this.zs)
            };

            function U(a, c, d, e) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                this.zs = rq(a, c, d, e);
                l(U)[this.zs] = this
            }
            U.prototype = Object.create(hv.prototype);
            U.prototype.constructor = U;
            U.prototype.As = U;
            U.Bs = {};
            g.btQuaternion = U;
            U.prototype.setValue = function(a, c, d, e) {
                var f = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                Iq(f, a, c, d, e)
            };
            U.prototype.setEulerZYX = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Gq(e, a, c, d)
            };
            U.prototype.setRotation = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Hq(d, a, c)
            };
            U.prototype.normalize = U.prototype.normalize = function() {
                zq(this.zs)
            };
            U.prototype.length2 = function() {
                return xq(this.zs)
            };
            U.prototype.length = U.prototype.length = function() {
                return yq(this.zs)
            };
            U.prototype.dot = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return sq(c, a)
            };
            U.prototype.normalized = function() {
                return m(Aq(this.zs), U)
            };
            U.prototype.getAxis = function() {
                return m(vq(this.zs), q)
            };
            U.prototype.inverse = U.prototype.inverse = function() {
                return m(wq(this.zs), U)
            };
            U.prototype.getAngle = function() {
                return uq(this.zs)
            };
            U.prototype.getAngleShortestPath = function() {
                return tq(this.zs)
            };
            U.prototype.angle = U.prototype.angle = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return qq(c, a)
            };
            U.prototype.angleShortestPath = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return pq(c, a)
            };
            U.prototype.op_add = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Bq(c, a), U)
            };
            U.prototype.op_sub = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Fq(c, a), U)
            };
            U.prototype.op_mul = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Dq(c, a), U)
            };
            U.prototype.op_mulq = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Eq(c, a), U)
            };
            U.prototype.op_div = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return m(Cq(c, a), U)
            };
            U.prototype.x = U.prototype.x = function() {
                return Oq(this.zs)
            };
            U.prototype.y = U.prototype.y = function() {
                return Pq(this.zs)
            };
            U.prototype.z = U.prototype.z = function() {
                return Qq(this.zs)
            };
            U.prototype.w = U.prototype.ht = function() {
                return Nq(this.zs)
            };
            U.prototype.setX = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kq(c, a)
            };
            U.prototype.setY = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Lq(c, a)
            };
            U.prototype.setZ = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Mq(c, a)
            };
            U.prototype.setW = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Jq(c, a)
            };
            U.prototype.__destroy__ = function() {
                oq(this.zs)
            };

            function gw(a, c) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                this.zs = Mf(a, c);
                l(gw)[this.zs] = this
            }
            gw.prototype = Object.create(dv.prototype);
            gw.prototype.constructor = gw;
            gw.prototype.As = gw;
            gw.Bs = {};
            g.btCapsuleShapeZ = gw;
            gw.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Uf(c, a)
            };
            gw.prototype.getMargin = function() {
                return Qf(this.zs)
            };
            gw.prototype.getUpAxis = function() {
                return Sf(this.zs)
            };
            gw.prototype.getRadius = function() {
                return Rf(this.zs)
            };
            gw.prototype.getHalfHeight = function() {
                return Of(this.zs)
            };
            gw.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Tf(c, a)
            };
            gw.prototype.getLocalScaling = function() {
                return m(Pf(this.zs), q)
            };
            gw.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Nf(d, a, c)
            };
            gw.prototype.__destroy__ = function() {
                Lf(this.zs)
            };

            function z() {
                throw "cannot construct a btContactSolverInfo, no constructor in IDL";
            }
            z.prototype = Object.create(k.prototype);
            z.prototype.constructor = z;
            z.prototype.As = z;
            z.Bs = {};
            g.btContactSolverInfo = z;
            z.prototype.get_m_splitImpulse = z.prototype.ou = function() {
                return !!Ai(this.zs)
            };
            z.prototype.set_m_splitImpulse = z.prototype.Ev = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Di(c, a)
            };
            Object.defineProperty(z.prototype, "m_splitImpulse", {
                get: z.prototype.ou,
                set: z.prototype.Ev
            });
            z.prototype.get_m_splitImpulsePenetrationThreshold = z.prototype.pu = function() {
                return zi(this.zs)
            };
            z.prototype.set_m_splitImpulsePenetrationThreshold = z.prototype.Fv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ci(c, a)
            };
            Object.defineProperty(z.prototype, "m_splitImpulsePenetrationThreshold", {
                get: z.prototype.pu,
                set: z.prototype.Fv
            });
            z.prototype.get_m_numIterations = z.prototype.au = function() {
                return yi(this.zs)
            };
            z.prototype.set_m_numIterations = z.prototype.rv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Bi(c, a)
            };
            Object.defineProperty(z.prototype, "m_numIterations", {
                get: z.prototype.au,
                set: z.prototype.rv
            });
            z.prototype.__destroy__ = function() {
                xi(this.zs)
            };

            function X(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                this.zs = void 0 === e ? jm(a, c, d) : void 0 === f ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(a, c, d, e) : km(a, c, d, e, f);
                l(X)[this.zs] = this
            }
            X.prototype = Object.create(lv.prototype);
            X.prototype.constructor = X;
            X.prototype.As = X;
            X.Bs = {};
            g.btGeneric6DofSpringConstraint = X;
            X.prototype.enableSpring = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                mm(d, a, c)
            };
            X.prototype.setStiffness = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                Bm(d, a, c)
            };
            X.prototype.setDamping = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                tm(d, a, c)
            };
            X.prototype.setEquilibriumPoint = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                void 0 === a ? um(d) : void 0 === c ? wm(d, a) : xm(d, a, c)
            };
            X.prototype.setLinearLowerLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ym(c, a)
            };
            X.prototype.setLinearUpperLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                zm(c, a)
            };
            X.prototype.setAngularLowerLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                qm(c, a)
            };
            X.prototype.setAngularUpperLimit = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                rm(c, a)
            };
            X.prototype.getFrameOffsetA = function() {
                return m(om(this.zs), u)
            };
            X.prototype.enableFeedback = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                lm(c, a)
            };
            X.prototype.getBreakingImpulseThreshold = function() {
                return nm(this.zs)
            };
            X.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                sm(c, a)
            };
            X.prototype.getParam = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                return pm(d, a, c)
            };
            X.prototype.setParam = function(a, c, d) {
                var e = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                Am(e, a, c, d)
            };
            X.prototype.__destroy__ = function() {
                im(this.zs)
            };

            function hw(a) {
                a && "object" === typeof a && (a = a.zs);
                this.zs = ct(a);
                l(hw)[this.zs] = this
            }
            hw.prototype = Object.create(p.prototype);
            hw.prototype.constructor = hw;
            hw.prototype.As = hw;
            hw.Bs = {};
            g.btSphereShape = hw;
            hw.prototype.setMargin = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                ht(c, a)
            };
            hw.prototype.getMargin = function() {
                return ft(this.zs)
            };
            hw.prototype.setLocalScaling = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                gt(c, a)
            };
            hw.prototype.getLocalScaling = function() {
                return m(et(this.zs), q)
            };
            hw.prototype.calculateLocalInertia = function(a, c) {
                var d = this.zs;
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                dt(d, a, c)
            };
            hw.prototype.__destroy__ = function() {
                bt(this.zs)
            };

            function Y() {
                this.zs = Sc();
                l(Y)[this.zs] = this
            }
            Y.prototype = Object.create(k.prototype);
            Y.prototype.constructor = Y;
            Y.prototype.As = Y;
            Y.Bs = {};
            g.ConvexHull = Y;
            Y.prototype.get_m_points = Y.prototype.gu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return Wc(c, a)
            };
            Object.defineProperty(Y.prototype, "m_points", {
                get: Y.prototype.gu
            });
            Y.prototype.get_m_triangles = Y.prototype.vu = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                return Xc(c, a)
            };
            Object.defineProperty(Y.prototype, "m_triangles", {
                get: Y.prototype.vu
            });
            Y.prototype.get_m_nPoints = Y.prototype.Yt = function() {
                return Uc(this.zs)
            };
            Object.defineProperty(Y.prototype, "m_nPoints", {
                get: Y.prototype.Yt
            });
            Y.prototype.get_m_nTriangles = Y.prototype.Zt = function() {
                return Vc(this.zs)
            };
            Object.defineProperty(Y.prototype, "m_nTriangles", {
                get: Y.prototype.Zt
            });
            Y.prototype.__destroy__ = function() {
                Tc(this.zs)
            };

            function Z(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.zs);
                c && "object" === typeof c && (c = c.zs);
                d && "object" === typeof d && (d = d.zs);
                e && "object" === typeof e && (e = e.zs);
                f && "object" === typeof f && (f = f.zs);
                this.zs = Dd(a, c, d, e, f);
                l(Z)[this.zs] = this
            }
            Z.prototype = Object.create(k.prototype);
            Z.prototype.constructor = Z;
            Z.prototype.As = Z;
            Z.Bs = {};
            g.LocalConvexResult = Z;
            Z.prototype.get_m_hitCollisionObject = Z.prototype.Jt = function() {
                return m(Fd(this.zs), t)
            };
            Z.prototype.set_m_hitCollisionObject = Z.prototype.bv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Kd(c, a)
            };
            Object.defineProperty(Z.prototype, "m_hitCollisionObject", {
                get: Z.prototype.Jt,
                set: Z.prototype.bv
            });
            Z.prototype.get_m_localShapeInfo = Z.prototype.Ut = function() {
                return m(Jd(this.zs), I)
            };
            Z.prototype.set_m_localShapeInfo = Z.prototype.mv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Od(c, a)
            };
            Object.defineProperty(Z.prototype, "m_localShapeInfo", {
                get: Z.prototype.Ut,
                set: Z.prototype.mv
            });
            Z.prototype.get_m_hitNormalLocal = Z.prototype.Mt = function() {
                return m(Hd(this.zs), q)
            };
            Z.prototype.set_m_hitNormalLocal = Z.prototype.ev = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Md(c, a)
            };
            Object.defineProperty(Z.prototype, "m_hitNormalLocal", {
                get: Z.prototype.Mt,
                set: Z.prototype.ev
            });
            Z.prototype.get_m_hitPointLocal = Z.prototype.Nt = function() {
                return m(Id(this.zs), q)
            };
            Z.prototype.set_m_hitPointLocal = Z.prototype.fv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Nd(c, a)
            };
            Object.defineProperty(Z.prototype, "m_hitPointLocal", {
                get: Z.prototype.Nt,
                set: Z.prototype.fv
            });
            Z.prototype.get_m_hitFraction = Z.prototype.Kt = function() {
                return Gd(this.zs)
            };
            Z.prototype.set_m_hitFraction = Z.prototype.cv = function(a) {
                var c = this.zs;
                a && "object" === typeof a && (a = a.zs);
                Ld(c, a)
            };
            Object.defineProperty(Z.prototype, "m_hitFraction", {
                get: Z.prototype.Kt,
                set: Z.prototype.cv
            });
            Z.prototype.__destroy__ = function() {
                Ed(this.zs)
            };
            (function() {
                function a() {
                    g.BT_CONSTRAINT_ERP = Pu();
                    g.BT_CONSTRAINT_STOP_ERP = Ru();
                    g.BT_CONSTRAINT_CFM = Ou();
                    g.BT_CONSTRAINT_STOP_CFM = Qu();
                    g.PHY_FLOAT = Ku();
                    g.PHY_DOUBLE = Iu();
                    g.PHY_INTEGER = Lu();
                    g.PHY_SHORT = Mu();
                    g.PHY_FIXEDPOINT88 = Ju();
                    g.PHY_UCHAR = Nu()
                }
                Pa ? a() : Na.unshift(a)
            })();
            this.Ammo = g;


            return Ammo
        }
    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = Ammo;
else if (typeof define === 'function' && define['amd'])
    define([], function() {
        return Ammo;
    });
else if (typeof exports === 'object')
    exports["Ammo"] = Ammo;
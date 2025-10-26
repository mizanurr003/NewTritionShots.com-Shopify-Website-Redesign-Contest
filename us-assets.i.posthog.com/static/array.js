! function() {
    try {
        var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && (e._posthogChunkIds = e._posthogChunkIds || {}, e._posthogChunkIds[n] = "019a18e8-d92f-7f13-863e-bd9950ac3798")
    } catch (e) {}
}();
! function() {
    "use strict";
    var t = "undefined" != typeof window ? window : void 0,
        i = "undefined" != typeof globalThis ? globalThis : t,
        e = Array.prototype,
        r = e.forEach,
        s = e.indexOf,
        n = null == i ? void 0 : i.navigator,
        o = null == i ? void 0 : i.document,
        a = null == i ? void 0 : i.location,
        l = null == i ? void 0 : i.fetch,
        u = null != i && i.XMLHttpRequest && "withCredentials" in new i.XMLHttpRequest ? i.XMLHttpRequest : void 0,
        h = null == i ? void 0 : i.AbortController,
        v = null == n ? void 0 : n.userAgent,
        d = null != t ? t : {},
        c = {
            DEBUG: !1,
            LIB_VERSION: "1.280.1"
        };

    function f(t, i, e, r, s, n, o) {
        try {
            var a = t[n](o),
                l = a.value
        } catch (t) {
            return void e(t)
        }
        a.done ? i(l) : Promise.resolve(l).then(r, s)
    }

    function p(t) {
        return function() {
            var i = this,
                e = arguments;
            return new Promise((function(r, s) {
                var n = t.apply(i, e);

                function o(t) {
                    f(n, r, s, o, a, "next", t)
                }

                function a(t) {
                    f(n, r, s, o, a, "throw", t)
                }
                o(void 0)
            }))
        }
    }

    function g() {
        return g = Object.assign ? Object.assign.bind() : function(t) {
            for (var i = 1; i < arguments.length; i++) {
                var e = arguments[i];
                for (var r in e)({}).hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
        }, g.apply(null, arguments)
    }

    function _(t, i) {
        if (null == t) return {};
        var e = {};
        for (var r in t)
            if ({}.hasOwnProperty.call(t, r)) {
                if (-1 !== i.indexOf(r)) continue;
                e[r] = t[r]
            }
        return e
    }
    var m = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];

    function y(t, i) {
        return -1 !== t.indexOf(i)
    }
    var b = function(t) {
            return t.trim()
        },
        w = function(t) {
            return t.replace(/^\$/, "")
        };
    var S = Array.isArray,
        x = Object.prototype,
        E = x.hasOwnProperty,
        k = x.toString,
        P = S || function(t) {
            return "[object Array]" === k.call(t)
        },
        T = t => "function" == typeof t,
        I = t => t === Object(t) && !P(t),
        R = t => {
            if (I(t)) {
                for (var i in t)
                    if (E.call(t, i)) return !1;
                return !0
            }
            return !1
        },
        C = t => void 0 === t,
        O = t => "[object String]" == k.call(t),
        F = t => O(t) && 0 === t.trim().length,
        M = t => null === t,
        A = t => C(t) || M(t),
        j = t => "[object Number]" == k.call(t),
        D = t => "[object Boolean]" === k.call(t),
        L = t => t instanceof FormData,
        N = t => y(m, t);

    function U(t) {
        return null === t || "object" != typeof t
    }

    function z(t, i) {
        return Object.prototype.toString.call(t) === "[object " + i + "]"
    }

    function H(t) {
        return !C(Event) && function(t, i) {
            try {
                return t instanceof i
            } catch (t) {
                return !1
            }
        }(t, Event)
    }
    var B = [!0, "true", 1, "1", "yes"],
        q = t => y(B, t),
        W = [!1, "false", 0, "0", "no"];

    function G(t, i, e, r, s) {
        return i > e && (r.warn("min cannot be greater than max."), i = e), j(t) ? t > e ? (r.warn(" cannot be  greater than max: " + e + ". Using max value instead."), e) : t < i ? (r.warn(" cannot be less than min: " + i + ". Using min value instead."), i) : t : (r.warn(" must be a number. using max or fallback. max: " + e + ", fallback: " + s), G(s || e, i, e, r))
    }
    class V {
        constructor(t) {
            this.t = t, this.i = {}, this.o = () => {
                Object.keys(this.i).forEach((t => {
                    var i = this.h(t) + this.m;
                    i >= this.S ? delete this.i[t] : this.$(t, i)
                }))
            }, this.h = t => this.i[String(t)], this.$ = (t, i) => {
                this.i[String(t)] = i
            }, this.consumeRateLimit = t => {
                var i, e, r = null !== (i = this.h(t)) && void 0 !== i ? i : this.S;
                if (0 === (r = Math.max(r - 1, 0))) return !0;
                this.$(t, r);
                var s = 0 === r;
                return s && (null == (e = this.k) || e.call(this, t)), s
            }, this.k = this.t.k, this.S = G(this.t.bucketSize, 0, 100, this.t.P), this.m = G(this.t.refillRate, 0, this.S, this.t.P), this.T = G(this.t.refillInterval, 0, 864e5, this.t.P), this.I = setInterval((() => {
                this.o()
            }), this.T)
        }
        stop() {
            this.I && (clearInterval(this.I), this.I = void 0)
        }
    }
    var J, K, Y, X = t => t instanceof Error;

    function Q(t) {
        var i = globalThis._posthogChunkIds;
        if (i) {
            var e = Object.keys(i);
            return Y && e.length === K || (K = e.length, Y = e.reduce(((e, r) => {
                J || (J = {});
                var s = J[r];
                if (s) e[s[0]] = s[1];
                else
                    for (var n = t(r), o = n.length - 1; o >= 0; o--) {
                        var a = n[o],
                            l = null == a ? void 0 : a.filename,
                            u = i[r];
                        if (l && u) {
                            e[l] = u, J[r] = [l, u];
                            break
                        }
                    }
                return e
            }), {})), Y
        }
    }
    var Z = "?";

    function tt(t, i, e, r) {
        var s = {
            platform: "web:javascript",
            filename: t,
            function: "<anonymous>" === i ? Z : i,
            in_app: !0
        };
        return C(e) || (s.lineno = e), C(r) || (s.colno = r), s
    }
    var it = (t, i) => {
            var e = -1 !== t.indexOf("safari-extension"),
                r = -1 !== t.indexOf("safari-web-extension");
            return e || r ? [-1 !== t.indexOf("@") ? t.split("@")[0] : Z, e ? "safari-extension:" + i : "safari-web-extension:" + i] : [t, i]
        },
        et = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
        rt = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        st = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        nt = t => {
            var i = et.exec(t);
            if (i) {
                var [, e, r, s] = i;
                return tt(e, Z, +r, +s)
            }
            var n = rt.exec(t);
            if (n) {
                if (n[2] && 0 === n[2].indexOf("eval")) {
                    var o = st.exec(n[2]);
                    o && (n[2] = o[1], n[3] = o[2], n[4] = o[3])
                }
                var [a, l] = it(n[1] || Z, n[2]);
                return tt(l, a, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0)
            }
        },
        ot = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
        at = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        lt = t => {
            var i = ot.exec(t);
            if (i) {
                if (i[3] && i[3].indexOf(" > eval") > -1) {
                    var e = at.exec(i[3]);
                    e && (i[1] = i[1] || "eval", i[3] = e[1], i[4] = e[2], i[5] = "")
                }
                var r = i[3],
                    s = i[1] || Z;
                return [s, r] = it(s, r), tt(r, s, i[4] ? +i[4] : void 0, i[5] ? +i[5] : void 0)
            }
        },
        ut = /\(error: (.*)\)/,
        ht = 50;

    function vt() {
        for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
        return function(t, e) {
            void 0 === e && (e = 0);
            for (var r = [], s = t.split("\n"), n = e; n < s.length; n++) {
                var o = s[n];
                if (!(o.length > 1024)) {
                    var a = ut.test(o) ? o.replace(ut, "$1") : o;
                    if (!a.match(/\S*Error: /)) {
                        for (var l of i) {
                            var u = l(a);
                            if (u) {
                                r.push(u);
                                break
                            }
                        }
                        if (r.length >= ht) break
                    }
                }
            }
            return function(t) {
                if (!t.length) return [];
                var i = Array.from(t);
                return i.reverse(), i.slice(0, ht).map((t => {
                    return g({}, t, {
                        filename: t.filename || (e = i, e[e.length - 1] || {}).filename,
                        function: t.function || Z
                    });
                    var e
                }))
            }(r)
        }
    }
    class dt {
        constructor(t, i, e) {
            void 0 === t && (t = []), void 0 === i && (i = []), void 0 === e && (e = []), this.coercers = t, this.modifiers = e, this.stackParser = vt(...i)
        }
        buildFromUnknown(t, i) {
            void 0 === i && (i = {});
            var e = i && i.mechanism || {
                    handled: !0,
                    type: "generic"
                },
                r = this.buildCoercingContext(e, i, 0).apply(t),
                s = this.buildParsingContext(),
                n = this.parseStacktrace(r, s);
            return {
                $exception_list: this.convertToExceptionList(n, e),
                $exception_level: "error"
            }
        }
        modifyFrames(t) {
            var i = this;
            return p((function*() {
                for (var e of t) e.stacktrace && e.stacktrace.frames && P(e.stacktrace.frames) && (e.stacktrace.frames = yield i.applyModifiers(e.stacktrace.frames));
                return t
            }))()
        }
        coerceFallback(t) {
            var i;
            return {
                type: "Error",
                value: "Unknown error",
                stack: null == (i = t.syntheticException) ? void 0 : i.stack,
                synthetic: !0
            }
        }
        parseStacktrace(t, i) {
            var e, r;
            return null != t.cause && (e = this.parseStacktrace(t.cause, i)), "" != t.stack && null != t.stack && (r = this.applyChunkIds(this.stackParser(t.stack, t.synthetic ? 1 : 0), i.chunkIdMap)), g({}, t, {
                cause: e,
                stack: r
            })
        }
        applyChunkIds(t, i) {
            return t.map((t => (t.filename && i && (t.chunk_id = i[t.filename]), t)))
        }
        applyCoercers(t, i) {
            for (var e of this.coercers)
                if (e.match(t)) return e.coerce(t, i);
            return this.coerceFallback(i)
        }
        applyModifiers(t) {
            var i = this;
            return p((function*() {
                var e = t;
                for (var r of i.modifiers) e = yield r(e);
                return e
            }))()
        }
        convertToExceptionList(t, i) {
            var e, r, s, n = {
                type: t.type,
                value: t.value,
                mechanism: {
                    type: null !== (e = i.type) && void 0 !== e ? e : "generic",
                    handled: null === (r = i.handled) || void 0 === r || r,
                    synthetic: null !== (s = t.synthetic) && void 0 !== s && s
                }
            };
            t.stack && (n.stacktrace = {
                type: "raw",
                frames: t.stack
            });
            var o = [n];
            return null != t.cause && o.push(...this.convertToExceptionList(t.cause, g({}, i, {
                handled: !0
            }))), o
        }
        buildParsingContext() {
            return {
                chunkIdMap: Q(this.stackParser)
            }
        }
        buildCoercingContext(t, i, e) {
            void 0 === e && (e = 0);
            var r = (e, r) => {
                if (r <= 4) {
                    var s = this.buildCoercingContext(t, i, r);
                    return this.applyCoercers(e, s)
                }
            };
            return g({}, i, {
                syntheticException: 0 == e ? i.syntheticException : void 0,
                mechanism: t,
                apply: t => r(t, e),
                next: t => r(t, e + 1)
            })
        }
    }
    class ct {
        match(t) {
            return this.isDOMException(t) || this.isDOMError(t)
        }
        coerce(t, i) {
            var e = O(t.stack);
            return {
                type: this.getType(t),
                value: this.getValue(t),
                stack: e ? t.stack : void 0,
                cause: t.cause ? i.next(t.cause) : void 0,
                synthetic: !1
            }
        }
        getType(t) {
            return this.isDOMError(t) ? "DOMError" : "DOMException"
        }
        getValue(t) {
            var i = t.name || (this.isDOMError(t) ? "DOMError" : "DOMException");
            return t.message ? i + ": " + t.message : i
        }
        isDOMException(t) {
            return z(t, "DOMException")
        }
        isDOMError(t) {
            return z(t, "DOMError")
        }
    }
    class ft {
        match(t) {
            return (t => t instanceof Error)(t)
        }
        coerce(t, i) {
            return {
                type: this.getType(t),
                value: this.getMessage(t, i),
                stack: this.getStack(t),
                cause: t.cause ? i.next(t.cause) : void 0,
                synthetic: !1
            }
        }
        getType(t) {
            return t.name || t.constructor.name
        }
        getMessage(t, i) {
            var e = t.message;
            return e.error && "string" == typeof e.error.message ? String(e.error.message) : String(e)
        }
        getStack(t) {
            return t.stacktrace || t.stack || void 0
        }
    }
    class pt {
        constructor() {}
        match(t) {
            return z(t, "ErrorEvent") && null != t.error
        }
        coerce(t, i) {
            var e, r = i.apply(t.error);
            return r || {
                type: "ErrorEvent",
                value: t.message,
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                synthetic: !0
            }
        }
    }
    var gt = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
    class _t {
        match(t) {
            return "string" == typeof t
        }
        coerce(t, i) {
            var e, [r, s] = this.getInfos(t);
            return {
                type: null != r ? r : "Error",
                value: null != s ? s : t,
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                synthetic: !0
            }
        }
        getInfos(t) {
            var i = "Error",
                e = t,
                r = t.match(gt);
            return r && (i = r[1], e = r[2]), [i, e]
        }
    }
    var mt = ["fatal", "error", "warning", "log", "info", "debug"];

    function yt(t, i) {
        void 0 === i && (i = 40);
        var e = Object.keys(t);
        if (e.sort(), !e.length) return "[object has no keys]";
        for (var r = e.length; r > 0; r--) {
            var s = e.slice(0, r).join(", ");
            if (!(s.length > i)) return r === e.length || s.length <= i ? s : s.slice(0, i) + "..."
        }
        return ""
    }
    class bt {
        match(t) {
            return "object" == typeof t && null !== t
        }
        coerce(t, i) {
            var e, r = this.getErrorPropertyFromObject(t);
            return r ? i.apply(r) : {
                type: this.getType(t),
                value: this.getValue(t),
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                level: this.isSeverityLevel(t.level) ? t.level : "error",
                synthetic: !0
            }
        }
        getType(t) {
            return H(t) ? t.constructor.name : "Error"
        }
        getValue(t) {
            if ("name" in t && "string" == typeof t.name) {
                var i = "'" + t.name + "' captured as exception";
                return "message" in t && "string" == typeof t.message && (i += " with message: '" + t.message + "'"), i
            }
            if ("message" in t && "string" == typeof t.message) return t.message;
            var e = this.getObjectClassName(t);
            return (e && "Object" !== e ? "'" + e + "'" : "Object") + " captured as exception with keys: " + yt(t)
        }
        isSeverityLevel(t) {
            return O(t) && !F(t) && mt.indexOf(t) >= 0
        }
        getErrorPropertyFromObject(t) {
            for (var i in t)
                if (Object.prototype.hasOwnProperty.call(t, i)) {
                    var e = t[i];
                    if (X(e)) return e
                }
        }
        getObjectClassName(t) {
            try {
                var i = Object.getPrototypeOf(t);
                return i ? i.constructor.name : void 0
            } catch (t) {
                return
            }
        }
    }
    class wt {
        match(t) {
            return H(t)
        }
        coerce(t, i) {
            var e, r = t.constructor.name;
            return {
                type: r,
                value: r + " captured as exception with keys: " + yt(t),
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                synthetic: !0
            }
        }
    }
    class St {
        match(t) {
            return U(t)
        }
        coerce(t, i) {
            var e;
            return {
                type: "Error",
                value: "Primitive value captured as exception: " + String(t),
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                synthetic: !0
            }
        }
    }
    class xt {
        match(t) {
            return z(t, "PromiseRejectionEvent")
        }
        coerce(t, i) {
            var e, r = this.getUnhandledRejectionReason(t);
            return U(r) ? {
                type: "UnhandledRejection",
                value: "Non-Error promise rejection captured with value: " + String(r),
                stack: null == (e = i.syntheticException) ? void 0 : e.stack,
                synthetic: !0
            } : i.apply(r)
        }
        getUnhandledRejectionReason(t) {
            if (U(t)) return t;
            try {
                if ("reason" in t) return t.reason;
                if ("detail" in t && "reason" in t.detail) return t.detail.reason
            } catch (t) {}
            return t
        }
    }
    var Et = i => {
            var e = {
                R: function(e) {
                    if (t && (c.DEBUG || d.POSTHOG_DEBUG) && !C(t.console) && t.console) {
                        for (var r = ("__rrweb_original__" in t.console[e] ? t.console[e].__rrweb_original__ : t.console[e]), s = arguments.length, n = new Array(s > 1 ? s - 1 : 0), o = 1; o < s; o++) n[o - 1] = arguments[o];
                        r(i, ...n)
                    }
                },
                info: function() {
                    for (var t = arguments.length, i = new Array(t), r = 0; r < t; r++) i[r] = arguments[r];
                    e.R("log", ...i)
                },
                warn: function() {
                    for (var t = arguments.length, i = new Array(t), r = 0; r < t; r++) i[r] = arguments[r];
                    e.R("warn", ...i)
                },
                error: function() {
                    for (var t = arguments.length, i = new Array(t), r = 0; r < t; r++) i[r] = arguments[r];
                    e.R("error", ...i)
                },
                critical: function() {
                    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                    console.error(i, ...e)
                },
                uninitializedWarning: t => {
                    e.error("You must initialize PostHog before calling " + t)
                },
                createLogger: t => Et(i + " " + t)
            };
            return e
        },
        $t = Et("[PostHog.js]"),
        kt = $t.createLogger,
        Pt = kt("[ExternalScriptsLoader]"),
        Tt = (t, i, e) => {
            if (t.config.disable_external_dependency_loading) return Pt.warn(i + " was requested but loading of external scripts is disabled."), e("Loading of external scripts is disabled");
            var r = null == o ? void 0 : o.querySelectorAll("script");
            if (r)
                for (var s, n = function() {
                        if (r[a].src === i) {
                            var t = r[a];
                            return t.__posthog_loading_callback_fired ? {
                                v: e()
                            } : (t.addEventListener("load", (i => {
                                t.__posthog_loading_callback_fired = !0, e(void 0, i)
                            })), t.onerror = t => e(t), {
                                v: void 0
                            })
                        }
                    }, a = 0; a < r.length; a++)
                    if (s = n()) return s.v;
            var l = () => {
                if (!o) return e("document not found");
                var r = o.createElement("script");
                if (r.type = "text/javascript", r.crossOrigin = "anonymous", r.src = i, r.onload = t => {
                        r.__posthog_loading_callback_fired = !0, e(void 0, t)
                    }, r.onerror = t => e(t), t.config.prepare_external_dependency_script && (r = t.config.prepare_external_dependency_script(r)), !r) return e("prepare_external_dependency_script returned null");
                var s, n = o.querySelectorAll("body > script");
                n.length > 0 ? null == (s = n[0].parentNode) || s.insertBefore(r, n[0]) : o.body.appendChild(r)
            };
            null != o && o.body ? l() : null == o || o.addEventListener("DOMContentLoaded", l)
        };
    d.__PosthogExtensions__ = d.__PosthogExtensions__ || {}, d.__PosthogExtensions__.loadExternalDependency = (t, i, e) => {
        var r = "/static/" + i + ".js?v=" + t.version;
        if ("remote-config" === i && (r = "/array/" + t.config.token + "/config.js"), "toolbar" === i) {
            var s = 3e5;
            r = r + "&t=" + Math.floor(Date.now() / s) * s
        }
        var n = t.requestRouter.endpointFor("assets", r);
        Tt(t, n, e)
    }, d.__PosthogExtensions__.loadSiteApp = (t, i, e) => {
        var r = t.requestRouter.endpointFor("api", i);
        Tt(t, r, e)
    };
    var It = {};

    function Rt(t, i, e) {
        if (P(t))
            if (r && t.forEach === r) t.forEach(i, e);
            else if ("length" in t && t.length === +t.length)
            for (var s = 0, n = t.length; s < n; s++)
                if (s in t && i.call(e, t[s], s) === It) return
    }

    function Ct(t, i, e) {
        if (!A(t)) {
            if (P(t)) return Rt(t, i, e);
            if (L(t)) {
                for (var r of t.entries())
                    if (i.call(e, r[1], r[0]) === It) return
            } else
                for (var s in t)
                    if (E.call(t, s) && i.call(e, t[s], s) === It) return
        }
    }
    var Ot = function(t) {
            for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) e[r - 1] = arguments[r];
            return Rt(e, (function(i) {
                for (var e in i) void 0 !== i[e] && (t[e] = i[e])
            })), t
        },
        Ft = function(t) {
            for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) e[r - 1] = arguments[r];
            return Rt(e, (function(i) {
                Rt(i, (function(i) {
                    t.push(i)
                }))
            })), t
        };

    function Mt(t) {
        for (var i = Object.keys(t), e = i.length, r = new Array(e); e--;) r[e] = [i[e], t[i[e]]];
        return r
    }
    var At = function(t) {
            try {
                return t()
            } catch (t) {
                return
            }
        },
        jt = function(t) {
            return function() {
                try {
                    for (var i = arguments.length, e = new Array(i), r = 0; r < i; r++) e[r] = arguments[r];
                    return t.apply(this, e)
                } catch (t) {
                    $t.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), $t.critical(t)
                }
            }
        },
        Dt = function(t) {
            var i = {};
            return Ct(t, (function(t, e) {
                (O(t) && t.length > 0 || j(t)) && (i[e] = t)
            })), i
        };

    function Lt(t, i) {
        return e = t, r = t => O(t) && !M(i) ? t.slice(0, i) : t, s = new Set,
            function t(i, e) {
                return i !== Object(i) ? r ? r(i, e) : i : s.has(i) ? void 0 : (s.add(i), P(i) ? (n = [], Rt(i, (i => {
                    n.push(t(i))
                }))) : (n = {}, Ct(i, ((i, e) => {
                    s.has(i) || (n[e] = t(i, e))
                }))), n);
                var n
            }(e);
        var e, r, s
    }
    var Nt = ["herokuapp.com", "vercel.app", "netlify.app"];

    function Ut(t) {
        var i = null == t ? void 0 : t.hostname;
        if (!O(i)) return !1;
        var e = i.split(".").slice(-2).join(".");
        for (var r of Nt)
            if (e === r) return !1;
        return !0
    }

    function zt(t, i) {
        for (var e = 0; e < t.length; e++)
            if (i(t[e])) return t[e]
    }

    function Ht(t, i, e, r) {
        var {
            capture: s = !1,
            passive: n = !0
        } = null != r ? r : {};
        null == t || t.addEventListener(i, e, {
            capture: s,
            passive: n
        })
    }
    var Bt = "$people_distinct_id",
        qt = "__alias",
        Wt = "__timers",
        Gt = "$autocapture_disabled_server_side",
        Vt = "$heatmaps_enabled_server_side",
        Jt = "$exception_capture_enabled_server_side",
        Kt = "$error_tracking_suppression_rules",
        Yt = "$error_tracking_capture_extension_exceptions",
        Xt = "$web_vitals_enabled_server_side",
        Qt = "$dead_clicks_enabled_server_side",
        Zt = "$web_vitals_allowed_metrics",
        ti = "$session_recording_remote_config",
        ii = "$sesid",
        ei = "$session_is_sampled",
        ri = "$enabled_feature_flags",
        si = "$early_access_features",
        ni = "$feature_flag_details",
        oi = "$stored_person_properties",
        ai = "$stored_group_properties",
        li = "$surveys",
        ui = "$surveys_activated",
        hi = "$flag_call_reported",
        vi = "$user_state",
        di = "$client_session_props",
        ci = "$capture_rate_limit",
        fi = "$initial_campaign_params",
        pi = "$initial_referrer_info",
        gi = "$initial_person_info",
        _i = "$epp",
        mi = "__POSTHOG_TOOLBAR__",
        yi = "$posthog_cookieless",
        bi = [Bt, qt, "__cmpns", Wt, "$session_recording_enabled_server_side", Vt, ii, ri, Kt, vi, si, ni, ai, oi, li, hi, di, ci, fi, pi, _i, gi];

    function wi(t) {
        return t instanceof Element && (t.id === mi || !(null == t.closest || !t.closest(".toolbar-global-fade-container")))
    }

    function Si(t) {
        return !!t && 1 === t.nodeType
    }

    function xi(t, i) {
        return !!t && !!t.tagName && t.tagName.toLowerCase() === i.toLowerCase()
    }

    function Ei(t) {
        return !!t && 3 === t.nodeType
    }

    function $i(t) {
        return !!t && 11 === t.nodeType
    }

    function ki(t) {
        return t ? b(t).split(/\s+/) : []
    }

    function Pi(i) {
        var e = null == t ? void 0 : t.location.href;
        return !!(e && i && i.some((t => e.match(t))))
    }

    function Ti(t) {
        var i = "";
        switch (typeof t.className) {
            case "string":
                i = t.className;
                break;
            case "object":
                i = (t.className && "baseVal" in t.className ? t.className.baseVal : null) || t.getAttribute("class") || "";
                break;
            default:
                i = ""
        }
        return ki(i)
    }

    function Ii(t) {
        return A(t) ? null : b(t).split(/(\s+)/).filter((t => Vi(t))).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)
    }

    function Ri(t) {
        var i = "";
        return Ni(t) && !Ui(t) && t.childNodes && t.childNodes.length && Ct(t.childNodes, (function(t) {
            var e;
            Ei(t) && t.textContent && (i += null !== (e = Ii(t.textContent)) && void 0 !== e ? e : "")
        })), b(i)
    }

    function Ci(t) {
        return C(t.target) ? t.srcElement || null : null != (i = t.target) && i.shadowRoot ? t.composedPath()[0] || null : t.target || null;
        var i
    }
    var Oi = ["a", "button", "form", "input", "select", "textarea", "label"];

    function Fi(t, i) {
        if (C(i)) return !0;
        var e, r = function(t) {
            if (i.some((i => t.matches(i)))) return {
                v: !0
            }
        };
        for (var s of t)
            if (e = r(s)) return e.v;
        return !1
    }

    function Mi(t) {
        var i = t.parentNode;
        return !(!i || !Si(i)) && i
    }
    var Ai = [".ph-no-rageclick", ".ph-no-capture"];
    var ji = t => !t || xi(t, "html") || !Si(t),
        Di = (i, e) => {
            if (!t || ji(i)) return {
                parentIsUsefulElement: !1,
                targetElementList: []
            };
            for (var r = !1, s = [i], n = i; n.parentNode && !xi(n, "body");)
                if ($i(n.parentNode)) s.push(n.parentNode.host), n = n.parentNode.host;
                else {
                    var o = Mi(n);
                    if (!o) break;
                    if (e || Oi.indexOf(o.tagName.toLowerCase()) > -1) r = !0;
                    else {
                        var a = t.getComputedStyle(o);
                        a && "pointer" === a.getPropertyValue("cursor") && (r = !0)
                    }
                    s.push(o), n = o
                }
            return {
                parentIsUsefulElement: r,
                targetElementList: s
            }
        };

    function Li(i, e, r, s, n) {
        var o, a, l, u;
        if (void 0 === r && (r = void 0), !t || ji(i)) return !1;
        if (null != (o = r) && o.url_allowlist && !Pi(r.url_allowlist)) return !1;
        if (null != (a = r) && a.url_ignorelist && Pi(r.url_ignorelist)) return !1;
        if (null != (l = r) && l.dom_event_allowlist) {
            var h = r.dom_event_allowlist;
            if (h && !h.some((t => e.type === t))) return !1
        }
        var {
            parentIsUsefulElement: v,
            targetElementList: d
        } = Di(i, s);
        if (! function(t, i) {
                var e = null == i ? void 0 : i.element_allowlist;
                if (C(e)) return !0;
                var r, s = function(t) {
                    if (e.some((i => t.tagName.toLowerCase() === i))) return {
                        v: !0
                    }
                };
                for (var n of t)
                    if (r = s(n)) return r.v;
                return !1
            }(d, r)) return !1;
        if (!Fi(d, null == (u = r) ? void 0 : u.css_selector_allowlist)) return !1;
        var c = t.getComputedStyle(i);
        if (c && "pointer" === c.getPropertyValue("cursor") && "click" === e.type) return !0;
        var f = i.tagName.toLowerCase();
        switch (f) {
            case "html":
                return !1;
            case "form":
                return (n || ["submit"]).indexOf(e.type) >= 0;
            case "input":
            case "select":
            case "textarea":
                return (n || ["change", "click"]).indexOf(e.type) >= 0;
            default:
                return v ? (n || ["click"]).indexOf(e.type) >= 0 : (n || ["click"]).indexOf(e.type) >= 0 && (Oi.indexOf(f) > -1 || "true" === i.getAttribute("contenteditable"))
        }
    }

    function Ni(t) {
        for (var i = t; i.parentNode && !xi(i, "body"); i = i.parentNode) {
            var e = Ti(i);
            if (y(e, "ph-sensitive") || y(e, "ph-no-capture")) return !1
        }
        if (y(Ti(t), "ph-include")) return !0;
        var r = t.type || "";
        if (O(r)) switch (r.toLowerCase()) {
            case "hidden":
            case "password":
                return !1
        }
        var s = t.name || t.id || "";
        if (O(s)) {
            if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(s.replace(/[^a-zA-Z0-9]/g, ""))) return !1
        }
        return !0
    }

    function Ui(t) {
        return !!(xi(t, "input") && !["button", "checkbox", "submit", "reset"].includes(t.type) || xi(t, "select") || xi(t, "textarea") || "true" === t.getAttribute("contenteditable"))
    }
    var zi = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})",
        Hi = new RegExp("^(?:" + zi + ")$"),
        Bi = new RegExp(zi),
        qi = "\\d{3}-?\\d{2}-?\\d{4}",
        Wi = new RegExp("^(" + qi + ")$"),
        Gi = new RegExp("(" + qi + ")");

    function Vi(t, i) {
        if (void 0 === i && (i = !0), A(t)) return !1;
        if (O(t)) {
            if (t = b(t), (i ? Hi : Bi).test((t || "").replace(/[- ]/g, ""))) return !1;
            if ((i ? Wi : Gi).test(t)) return !1
        }
        return !0
    }

    function Ji(t) {
        var i = Ri(t);
        return Vi(i = (i + " " + Ki(t)).trim()) ? i : ""
    }

    function Ki(t) {
        var i = "";
        return t && t.childNodes && t.childNodes.length && Ct(t.childNodes, (function(t) {
            var e;
            if (t && "span" === (null == (e = t.tagName) ? void 0 : e.toLowerCase())) try {
                var r = Ri(t);
                i = (i + " " + r).trim(), t.childNodes && t.childNodes.length && (i = (i + " " + Ki(t)).trim())
            } catch (t) {
                $t.error("[AutoCapture]", t)
            }
        })), i
    }

    function Yi(t) {
        return function(t) {
            var i = t.map((t => {
                var i, e, r = "";
                if (t.tag_name && (r += t.tag_name), t.attr_class)
                    for (var s of (t.attr_class.sort(), t.attr_class)) r += "." + s.replace(/"/g, "");
                var n = g({}, t.text ? {
                        text: t.text
                    } : {}, {
                        "nth-child": null !== (i = t.nth_child) && void 0 !== i ? i : 0,
                        "nth-of-type": null !== (e = t.nth_of_type) && void 0 !== e ? e : 0
                    }, t.href ? {
                        href: t.href
                    } : {}, t.attr_id ? {
                        attr_id: t.attr_id
                    } : {}, t.attributes),
                    o = {};
                return Mt(n).sort(((t, i) => {
                    var [e] = t, [r] = i;
                    return e.localeCompare(r)
                })).forEach((t => {
                    var [i, e] = t;
                    return o[Xi(i.toString())] = Xi(e.toString())
                })), r += ":", r += Mt(o).map((t => {
                    var [i, e] = t;
                    return i + '="' + e + '"'
                })).join("")
            }));
            return i.join(";")
        }(function(t) {
            return t.map((t => {
                var i, e, r = {
                    text: null == (i = t.$el_text) ? void 0 : i.slice(0, 400),
                    tag_name: t.tag_name,
                    href: null == (e = t.attr__href) ? void 0 : e.slice(0, 2048),
                    attr_class: Qi(t),
                    attr_id: t.attr__id,
                    nth_child: t.nth_child,
                    nth_of_type: t.nth_of_type,
                    attributes: {}
                };
                return Mt(t).filter((t => {
                    var [i] = t;
                    return 0 === i.indexOf("attr__")
                })).forEach((t => {
                    var [i, e] = t;
                    return r.attributes[i] = e
                })), r
            }))
        }(t))
    }

    function Xi(t) {
        return t.replace(/"|\\"/g, '\\"')
    }

    function Qi(t) {
        var i = t.attr__class;
        return i ? P(i) ? i : ki(i) : void 0
    }
    class Zi {
        constructor() {
            this.clicks = []
        }
        isRageClick(t, i, e) {
            var r = this.clicks[this.clicks.length - 1];
            if (r && Math.abs(t - r.x) + Math.abs(i - r.y) < 30 && e - r.timestamp < 1e3) {
                if (this.clicks.push({
                        x: t,
                        y: i,
                        timestamp: e
                    }), 3 === this.clicks.length) return !0
            } else this.clicks = [{
                x: t,
                y: i,
                timestamp: e
            }];
            return !1
        }
    }
    var te = "$copy_autocapture",
        ie = function(t) {
            return t.GZipJS = "gzip-js", t.Base64 = "base64", t
        }({}),
        ee = t => {
            var i = null == o ? void 0 : o.createElement("a");
            return C(i) ? null : (i.href = t, i)
        },
        re = function(t, i) {
            var e, r;
            void 0 === i && (i = "&");
            var s = [];
            return Ct(t, (function(t, i) {
                C(t) || C(i) || "undefined" === i || (e = encodeURIComponent((t => t instanceof File)(t) ? t.name : t.toString()), r = encodeURIComponent(i), s[s.length] = r + "=" + e)
            })), s.join(i)
        },
        se = function(t, i) {
            for (var e, r = ((t.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), s = 0; s < r.length; s++) {
                var n = r[s].split("=");
                if (n[0] === i) {
                    e = n;
                    break
                }
            }
            if (!P(e) || e.length < 2) return "";
            var o = e[1];
            try {
                o = decodeURIComponent(o)
            } catch (t) {
                $t.error("Skipping decoding for malformed query param: " + o)
            }
            return o.replace(/\+/g, " ")
        },
        ne = function(t, i, e) {
            if (!t || !i || !i.length) return t;
            for (var r = t.split("#"), s = r[0] || "", n = r[1], o = s.split("?"), a = o[1], l = o[0], u = (a || "").split("&"), h = [], v = 0; v < u.length; v++) {
                var d = u[v].split("=");
                P(d) && (i.includes(d[0]) ? h.push(d[0] + "=" + e) : h.push(u[v]))
            }
            var c = l;
            return null != a && (c += "?" + h.join("&")), null != n && (c += "#" + n), c
        },
        oe = function(t, i) {
            var e = t.match(new RegExp(i + "=([^&]*)"));
            return e ? e[1] : null
        },
        ae = kt("[AutoCapture]");

    function le(t, i) {
        return i.length > t ? i.slice(0, t) + "..." : i
    }

    function ue(t) {
        if (t.previousElementSibling) return t.previousElementSibling;
        var i = t;
        do {
            i = i.previousSibling
        } while (i && !Si(i));
        return i
    }

    function he(t, i, e, r) {
        var s = t.tagName.toLowerCase(),
            n = {
                tag_name: s
            };
        Oi.indexOf(s) > -1 && !e && ("a" === s.toLowerCase() || "button" === s.toLowerCase() ? n.$el_text = le(1024, Ji(t)) : n.$el_text = le(1024, Ri(t)));
        var o = Ti(t);
        o.length > 0 && (n.classes = o.filter((function(t) {
            return "" !== t
        }))), Ct(t.attributes, (function(e) {
            var s;
            if ((!Ui(t) || -1 !== ["name", "id", "class", "aria-label"].indexOf(e.name)) && ((null == r || !r.includes(e.name)) && !i && Vi(e.value) && (s = e.name, !O(s) || "_ngcontent" !== s.substring(0, 10) && "_nghost" !== s.substring(0, 7)))) {
                var o = e.value;
                "class" === e.name && (o = ki(o).join(" ")), n["attr__" + e.name] = le(1024, o)
            }
        }));
        for (var a = 1, l = 1, u = t; u = ue(u);) a++, u.tagName === t.tagName && l++;
        return n.nth_child = a, n.nth_of_type = l, n
    }

    function ve(i, e) {
        for (var r, s, {
                e: n,
                maskAllElementAttributes: o,
                maskAllText: a,
                elementAttributeIgnoreList: l,
                elementsChainAsString: u
            } = e, h = [i], v = i; v.parentNode && !xi(v, "body");) $i(v.parentNode) ? (h.push(v.parentNode.host), v = v.parentNode.host) : (h.push(v.parentNode), v = v.parentNode);
        var d, c = [],
            f = {},
            p = !1,
            g = !1;
        if (Ct(h, (t => {
                var i = Ni(t);
                "a" === t.tagName.toLowerCase() && (p = t.getAttribute("href"), p = i && p && Vi(p) && p), y(Ti(t), "ph-no-capture") && (g = !0), c.push(he(t, o, a, l));
                var e = function(t) {
                    if (!Ni(t)) return {};
                    var i = {};
                    return Ct(t.attributes, (function(t) {
                        if (t.name && 0 === t.name.indexOf("data-ph-capture-attribute")) {
                            var e = t.name.replace("data-ph-capture-attribute-", ""),
                                r = t.value;
                            e && r && Vi(r) && (i[e] = r)
                        }
                    })), i
                }(t);
                Ot(f, e)
            })), g) return {
            props: {},
            explicitNoCapture: g
        };
        if (a || ("a" === i.tagName.toLowerCase() || "button" === i.tagName.toLowerCase() ? c[0].$el_text = Ji(i) : c[0].$el_text = Ri(i)), p) {
            var _, m;
            c[0].attr__href = p;
            var b = null == (_ = ee(p)) ? void 0 : _.host,
                w = null == t || null == (m = t.location) ? void 0 : m.host;
            b && w && b !== w && (d = p)
        }
        return {
            props: Ot({
                $event_type: n.type,
                $ce_version: 1
            }, u ? {} : {
                $elements: c
            }, {
                $elements_chain: Yi(c)
            }, null != (r = c[0]) && r.$el_text ? {
                $el_text: null == (s = c[0]) ? void 0 : s.$el_text
            } : {}, d && "click" === n.type ? {
                $external_click_url: d
            } : {}, f)
        }
    }
    class de {
        constructor(t) {
            this.C = !1, this.O = null, this.rageclicks = new Zi, this.F = !1, this.instance = t, this.M = null
        }
        get A() {
            var t, i, e = I(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
            return e.url_allowlist = null == (t = e.url_allowlist) ? void 0 : t.map((t => new RegExp(t))), e.url_ignorelist = null == (i = e.url_ignorelist) ? void 0 : i.map((t => new RegExp(t))), e
        }
        j() {
            if (this.isBrowserSupported()) {
                if (t && o) {
                    var i = i => {
                        i = i || (null == t ? void 0 : t.event);
                        try {
                            this.D(i)
                        } catch (t) {
                            ae.error("Failed to capture event", t)
                        }
                    };
                    if (Ht(o, "submit", i, {
                            capture: !0
                        }), Ht(o, "change", i, {
                            capture: !0
                        }), Ht(o, "click", i, {
                            capture: !0
                        }), this.A.capture_copied_text) {
                        var e = i => {
                            i = i || (null == t ? void 0 : t.event), this.D(i, te)
                        };
                        Ht(o, "copy", e, {
                            capture: !0
                        }), Ht(o, "cut", e, {
                            capture: !0
                        })
                    }
                }
            } else ae.info("Disabling Automatic Event Collection because this browser is not supported")
        }
        startIfEnabled() {
            this.isEnabled && !this.C && (this.j(), this.C = !0)
        }
        onRemoteConfig(t) {
            t.elementsChainAsString && (this.F = t.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({
                [Gt]: !!t.autocapture_opt_out
            }), this.O = !!t.autocapture_opt_out, this.startIfEnabled()
        }
        setElementSelectors(t) {
            this.M = t
        }
        getElementSelectors(t) {
            var i, e = [];
            return null == (i = this.M) || i.forEach((i => {
                var r = null == o ? void 0 : o.querySelectorAll(i);
                null == r || r.forEach((r => {
                    t === r && e.push(i)
                }))
            })), e
        }
        get isEnabled() {
            var t, i, e = null == (t = this.instance.persistence) ? void 0 : t.props[Gt],
                r = this.O;
            if (M(r) && !D(e) && !this.instance.L()) return !1;
            var s = null !== (i = this.O) && void 0 !== i ? i : !!e;
            return !!this.instance.config.autocapture && !s
        }
        D(i, e) {
            if (void 0 === e && (e = "$autocapture"), this.isEnabled) {
                var r, s = Ci(i);
                if (Ei(s) && (s = s.parentNode || null), "$autocapture" === e && "click" === i.type && i instanceof MouseEvent) this.instance.config.rageclick && null != (r = this.rageclicks) && r.isRageClick(i.clientX, i.clientY, (new Date).getTime()) && function(i, e) {
                    if (!t || ji(i)) return !1;
                    var r, s;
                    if (!1 === (r = D(e) ? !!e && Ai : null !== (s = null == e ? void 0 : e.css_selector_ignorelist) && void 0 !== s ? s : Ai)) return !1;
                    var {
                        targetElementList: n
                    } = Di(i, !1);
                    return !Fi(n, r)
                }(s, this.instance.config.rageclick) && this.D(i, "$rageclick");
                var n = e === te;
                if (s && Li(s, i, this.A, n, n ? ["copy", "cut"] : void 0)) {
                    var {
                        props: o,
                        explicitNoCapture: a
                    } = ve(s, {
                        e: i,
                        maskAllElementAttributes: this.instance.config.mask_all_element_attributes,
                        maskAllText: this.instance.config.mask_all_text,
                        elementAttributeIgnoreList: this.A.element_attribute_ignorelist,
                        elementsChainAsString: this.F
                    });
                    if (a) return !1;
                    var l = this.getElementSelectors(s);
                    if (l && l.length > 0 && (o.$element_selectors = l), e === te) {
                        var u, h = Ii(null == t || null == (u = t.getSelection()) ? void 0 : u.toString()),
                            v = i.type || "clipboard";
                        if (!h) return !1;
                        o.$selected_content = h, o.$copy_type = v
                    }
                    return this.instance.capture(e, o), !0
                }
            }
        }
        isBrowserSupported() {
            return T(null == o ? void 0 : o.querySelectorAll)
        }
    }
    Math.trunc || (Math.trunc = function(t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t)
    }), Number.isInteger || (Number.isInteger = function(t) {
        return j(t) && isFinite(t) && Math.floor(t) === t
    });
    var ce = "0123456789abcdef";
    class fe {
        constructor(t) {
            if (this.bytes = t, 16 !== t.length) throw new TypeError("not 128-bit length")
        }
        static fromFieldsV7(t, i, e, r) {
            if (!Number.isInteger(t) || !Number.isInteger(i) || !Number.isInteger(e) || !Number.isInteger(r) || t < 0 || i < 0 || e < 0 || r < 0 || t > 0xffffffffffff || i > 4095 || e > 1073741823 || r > 4294967295) throw new RangeError("invalid field value");
            var s = new Uint8Array(16);
            return s[0] = t / Math.pow(2, 40), s[1] = t / Math.pow(2, 32), s[2] = t / Math.pow(2, 24), s[3] = t / Math.pow(2, 16), s[4] = t / Math.pow(2, 8), s[5] = t, s[6] = 112 | i >>> 8, s[7] = i, s[8] = 128 | e >>> 24, s[9] = e >>> 16, s[10] = e >>> 8, s[11] = e, s[12] = r >>> 24, s[13] = r >>> 16, s[14] = r >>> 8, s[15] = r, new fe(s)
        }
        toString() {
            for (var t = "", i = 0; i < this.bytes.length; i++) t = t + ce.charAt(this.bytes[i] >>> 4) + ce.charAt(15 & this.bytes[i]), 3 !== i && 5 !== i && 7 !== i && 9 !== i || (t += "-");
            if (36 !== t.length) throw new Error("Invalid UUIDv7 was generated");
            return t
        }
        clone() {
            return new fe(this.bytes.slice(0))
        }
        equals(t) {
            return 0 === this.compareTo(t)
        }
        compareTo(t) {
            for (var i = 0; i < 16; i++) {
                var e = this.bytes[i] - t.bytes[i];
                if (0 !== e) return Math.sign(e)
            }
            return 0
        }
    }
    class pe {
        constructor() {
            this.N = 0, this.U = 0, this.H = new me
        }
        generate() {
            var t = this.generateOrAbort();
            if (C(t)) {
                this.N = 0;
                var i = this.generateOrAbort();
                if (C(i)) throw new Error("Could not generate UUID after timestamp reset");
                return i
            }
            return t
        }
        generateOrAbort() {
            var t = Date.now();
            if (t > this.N) this.N = t, this.B();
            else {
                if (!(t + 1e4 > this.N)) return;
                this.U++, this.U > 4398046511103 && (this.N++, this.B())
            }
            return fe.fromFieldsV7(this.N, Math.trunc(this.U / Math.pow(2, 30)), this.U & Math.pow(2, 30) - 1, this.H.nextUint32())
        }
        B() {
            this.U = 1024 * this.H.nextUint32() + (1023 & this.H.nextUint32())
        }
    }
    var ge, _e = t => {
        if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
        for (var i = 0; i < t.length; i++) t[i] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
        return t
    };
    t && !C(t.crypto) && crypto.getRandomValues && (_e = t => crypto.getRandomValues(t));
    class me {
        constructor() {
            this.q = new Uint32Array(8), this.W = 1 / 0
        }
        nextUint32() {
            return this.W >= this.q.length && (_e(this.q), this.W = 0), this.q[this.W++]
        }
    }
    var ye = () => be().toString(),
        be = () => (ge || (ge = new pe)).generate(),
        we = "";
    var Se = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;

    function xe(t, i) {
        if (i) {
            var e = function(t, i) {
                if (void 0 === i && (i = o), we) return we;
                if (!i) return "";
                if (["localhost", "127.0.0.1"].includes(t)) return "";
                for (var e = t.split("."), r = Math.min(e.length, 8), s = "dmn_chk_" + ye(); !we && r--;) {
                    var n = e.slice(r).join("."),
                        a = s + "=1;domain=." + n + ";path=/";
                    i.cookie = a + ";max-age=3", i.cookie.includes(s) && (i.cookie = a + ";max-age=0", we = n)
                }
                return we
            }(t);
            if (!e) {
                var r = (t => {
                    var i = t.match(Se);
                    return i ? i[0] : ""
                })(t);
                r !== e && $t.info("Warning: cookie subdomain discovery mismatch", r, e), e = r
            }
            return e ? "; domain=." + e : ""
        }
        return ""
    }
    var Ee = {
            G: () => !!o,
            V: function(t) {
                $t.error("cookieStore error: " + t)
            },
            J: function(t) {
                if (o) {
                    try {
                        for (var i = t + "=", e = o.cookie.split(";").filter((t => t.length)), r = 0; r < e.length; r++) {
                            for (var s = e[r];
                                " " == s.charAt(0);) s = s.substring(1, s.length);
                            if (0 === s.indexOf(i)) return decodeURIComponent(s.substring(i.length, s.length))
                        }
                    } catch (t) {}
                    return null
                }
            },
            K: function(t) {
                var i;
                try {
                    i = JSON.parse(Ee.J(t)) || {}
                } catch (t) {}
                return i
            },
            Y: function(t, i, e, r, s) {
                if (o) try {
                    var n = "",
                        a = "",
                        l = xe(o.location.hostname, r);
                    if (e) {
                        var u = new Date;
                        u.setTime(u.getTime() + 24 * e * 60 * 60 * 1e3), n = "; expires=" + u.toUTCString()
                    }
                    s && (a = "; secure");
                    var h = t + "=" + encodeURIComponent(JSON.stringify(i)) + n + "; SameSite=Lax; path=/" + l + a;
                    return h.length > 3686.4 && $t.warn("cookieStore warning: large cookie, len=" + h.length), o.cookie = h, h
                } catch (t) {
                    return
                }
            },
            X: function(t, i) {
                if (null != o && o.cookie) try {
                    Ee.Y(t, "", -1, i)
                } catch (t) {
                    return
                }
            }
        },
        $e = null,
        ke = {
            G: function() {
                if (!M($e)) return $e;
                var i = !0;
                if (C(t)) i = !1;
                else try {
                    var e = "__mplssupport__";
                    ke.Y(e, "xyz"), '"xyz"' !== ke.J(e) && (i = !1), ke.X(e)
                } catch (t) {
                    i = !1
                }
                return i || $t.error("localStorage unsupported; falling back to cookie store"), $e = i, i
            },
            V: function(t) {
                $t.error("localStorage error: " + t)
            },
            J: function(i) {
                try {
                    return null == t ? void 0 : t.localStorage.getItem(i)
                } catch (t) {
                    ke.V(t)
                }
                return null
            },
            K: function(t) {
                try {
                    return JSON.parse(ke.J(t)) || {}
                } catch (t) {}
                return null
            },
            Y: function(i, e) {
                try {
                    null == t || t.localStorage.setItem(i, JSON.stringify(e))
                } catch (t) {
                    ke.V(t)
                }
            },
            X: function(i) {
                try {
                    null == t || t.localStorage.removeItem(i)
                } catch (t) {
                    ke.V(t)
                }
            }
        },
        Pe = ["distinct_id", ii, ei, _i, gi],
        Te = g({}, ke, {
            K: function(t) {
                try {
                    var i = {};
                    try {
                        i = Ee.K(t) || {}
                    } catch (t) {}
                    var e = Ot(i, JSON.parse(ke.J(t) || "{}"));
                    return ke.Y(t, e), e
                } catch (t) {}
                return null
            },
            Y: function(t, i, e, r, s, n) {
                try {
                    ke.Y(t, i, void 0, void 0, n);
                    var o = {};
                    Pe.forEach((t => {
                        i[t] && (o[t] = i[t])
                    })), Object.keys(o).length && Ee.Y(t, o, e, r, s, n)
                } catch (t) {
                    ke.V(t)
                }
            },
            X: function(i, e) {
                try {
                    null == t || t.localStorage.removeItem(i), Ee.X(i, e)
                } catch (t) {
                    ke.V(t)
                }
            }
        }),
        Ie = {},
        Re = {
            G: function() {
                return !0
            },
            V: function(t) {
                $t.error("memoryStorage error: " + t)
            },
            J: function(t) {
                return Ie[t] || null
            },
            K: function(t) {
                return Ie[t] || null
            },
            Y: function(t, i) {
                Ie[t] = i
            },
            X: function(t) {
                delete Ie[t]
            }
        },
        Ce = null,
        Oe = {
            G: function() {
                if (!M(Ce)) return Ce;
                if (Ce = !0, C(t)) Ce = !1;
                else try {
                    var i = "__support__";
                    Oe.Y(i, "xyz"), '"xyz"' !== Oe.J(i) && (Ce = !1), Oe.X(i)
                } catch (t) {
                    Ce = !1
                }
                return Ce
            },
            V: function(t) {
                $t.error("sessionStorage error: ", t)
            },
            J: function(i) {
                try {
                    return null == t ? void 0 : t.sessionStorage.getItem(i)
                } catch (t) {
                    Oe.V(t)
                }
                return null
            },
            K: function(t) {
                try {
                    return JSON.parse(Oe.J(t)) || null
                } catch (t) {}
                return null
            },
            Y: function(i, e) {
                try {
                    null == t || t.sessionStorage.setItem(i, JSON.stringify(e))
                } catch (t) {
                    Oe.V(t)
                }
            },
            X: function(i) {
                try {
                    null == t || t.sessionStorage.removeItem(i)
                } catch (t) {
                    Oe.V(t)
                }
            }
        },
        Fe = function(t) {
            return t[t.PENDING = -1] = "PENDING", t[t.DENIED = 0] = "DENIED", t[t.GRANTED = 1] = "GRANTED", t
        }({});
    class Me {
        constructor(t) {
            this._instance = t
        }
        get A() {
            return this._instance.config
        }
        get consent() {
            return this.Z() ? Fe.DENIED : this.tt
        }
        isOptedOut() {
            return "always" === this.A.cookieless_mode || (this.consent === Fe.DENIED || this.consent === Fe.PENDING && (this.A.opt_out_capturing_by_default || "on_reject" === this.A.cookieless_mode))
        }
        isOptedIn() {
            return !this.isOptedOut()
        }
        isExplicitlyOptedOut() {
            return this.consent === Fe.DENIED
        }
        optInOut(t) {
            this.it.Y(this.et, t ? 1 : 0, this.A.cookie_expiration, this.A.cross_subdomain_cookie, this.A.secure_cookie)
        }
        reset() {
            this.it.X(this.et, this.A.cross_subdomain_cookie)
        }
        get et() {
            var {
                token: t,
                opt_out_capturing_cookie_prefix: i,
                consent_persistence_name: e
            } = this._instance.config;
            return e || (i ? i + t : "__ph_opt_in_out_" + t)
        }
        get tt() {
            var t = this.it.J(this.et);
            return q(t) ? Fe.GRANTED : y(W, t) ? Fe.DENIED : Fe.PENDING
        }
        get it() {
            if (!this.rt) {
                var t = this.A.opt_out_capturing_persistence_type;
                this.rt = "localStorage" === t ? ke : Ee;
                var i = "localStorage" === t ? Ee : ke;
                i.J(this.et) && (this.rt.J(this.et) || this.optInOut(q(i.J(this.et))), i.X(this.et, this.A.cross_subdomain_cookie))
            }
            return this.rt
        }
        Z() {
            return !!this.A.respect_dnt && !!zt([null == n ? void 0 : n.doNotTrack, null == n ? void 0 : n.msDoNotTrack, d.doNotTrack], (t => q(t)))
        }
    }
    var Ae = kt("[Dead Clicks]"),
        je = () => !0,
        De = t => {
            var i, e = !(null == (i = t.instance.persistence) || !i.get_property(Qt)),
                r = t.instance.config.capture_dead_clicks;
            return D(r) ? r : e
        };
    class Le {
        get lazyLoadedDeadClicksAutocapture() {
            return this.st
        }
        constructor(t, i, e) {
            this.instance = t, this.isEnabled = i, this.onCapture = e, this.startIfEnabled()
        }
        onRemoteConfig(t) {
            this.instance.persistence && this.instance.persistence.register({
                [Qt]: null == t ? void 0 : t.captureDeadClicks
            }), this.startIfEnabled()
        }
        startIfEnabled() {
            this.isEnabled(this) && this.nt((() => {
                this.ot()
            }))
        }
        nt(t) {
            var i, e;
            null != (i = d.__PosthogExtensions__) && i.initDeadClicksAutocapture && t(), null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this.instance, "dead-clicks-autocapture", (i => {
                i ? Ae.error("failed to load script", i) : t()
            }))
        }
        ot() {
            var t;
            if (o) {
                if (!this.st && null != (t = d.__PosthogExtensions__) && t.initDeadClicksAutocapture) {
                    var i = I(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
                    i.__onCapture = this.onCapture, this.st = d.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, i), this.st.start(o), Ae.info("starting...")
                }
            } else Ae.error("`document` not found. Cannot start.")
        }
        stop() {
            this.st && (this.st.stop(), this.st = void 0, Ae.info("stopping..."))
        }
    }
    var Ne = kt("[ExceptionAutocapture]");
    class Ue {
        constructor(i) {
            var e, r, s;
            this.lt = () => {
                var i;
                if (t && this.isEnabled && null != (i = d.__PosthogExtensions__) && i.errorWrappingFunctions) {
                    var e = d.__PosthogExtensions__.errorWrappingFunctions.wrapOnError,
                        r = d.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection,
                        s = d.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
                    try {
                        !this.ut && this.A.capture_unhandled_errors && (this.ut = e(this.captureException.bind(this))), !this.ht && this.A.capture_unhandled_rejections && (this.ht = r(this.captureException.bind(this))), !this.vt && this.A.capture_console_errors && (this.vt = s(this.captureException.bind(this)))
                    } catch (t) {
                        Ne.error("failed to start", t), this.dt()
                    }
                }
            }, this._instance = i, this.ct = !(null == (e = this._instance.persistence) || !e.props[Jt]), this.A = this.ft(), this.gt = new V({
                refillRate: null !== (r = this._instance.config.error_tracking.__exceptionRateLimiterRefillRate) && void 0 !== r ? r : 1,
                bucketSize: null !== (s = this._instance.config.error_tracking.__exceptionRateLimiterBucketSize) && void 0 !== s ? s : 10,
                refillInterval: 1e4,
                P: Ne
            }), this.startIfEnabled()
        }
        ft() {
            var t = this._instance.config.capture_exceptions,
                i = {
                    capture_unhandled_errors: !1,
                    capture_unhandled_rejections: !1,
                    capture_console_errors: !1
                };
            return I(t) ? i = g({}, i, t) : (C(t) ? this.ct : t) && (i = g({}, i, {
                capture_unhandled_errors: !0,
                capture_unhandled_rejections: !0
            })), i
        }
        get isEnabled() {
            return this.A.capture_console_errors || this.A.capture_unhandled_errors || this.A.capture_unhandled_rejections
        }
        startIfEnabled() {
            this.isEnabled && (Ne.info("enabled"), this.nt(this.lt))
        }
        nt(t) {
            var i, e;
            null != (i = d.__PosthogExtensions__) && i.errorWrappingFunctions && t(), null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this._instance, "exception-autocapture", (i => {
                if (i) return Ne.error("failed to load script", i);
                t()
            }))
        }
        dt() {
            var t, i, e;
            null == (t = this.ut) || t.call(this), this.ut = void 0, null == (i = this.ht) || i.call(this), this.ht = void 0, null == (e = this.vt) || e.call(this), this.vt = void 0
        }
        onRemoteConfig(t) {
            var i = t.autocaptureExceptions;
            this.ct = !!i || !1, this.A = this.ft(), this._instance.persistence && this._instance.persistence.register({
                [Jt]: this.ct
            }), this.startIfEnabled()
        }
        captureException(t) {
            var i, e, r = null !== (i = null == t || null == (e = t.$exception_list) || null == (e = e[0]) ? void 0 : e.type) && void 0 !== i ? i : "Exception";
            this.gt.consumeRateLimit(r) ? Ne.info("Skipping exception capture because of client rate limiting.", {
                exception: r
            }) : this._instance.exceptions.sendExceptionEvent(t)
        }
    }

    function ze(t, i, e) {
        try {
            if (!(i in t)) return () => {};
            var r = t[i],
                s = e(r);
            return T(s) && (s.prototype = s.prototype || {}, Object.defineProperties(s, {
                __posthog_wrapped__: {
                    enumerable: !1,
                    value: !0
                }
            })), t[i] = s, () => {
                t[i] = r
            }
        } catch (t) {
            return () => {}
        }
    }
    class He {
        constructor(i) {
            var e;
            this._instance = i, this._t = (null == t || null == (e = t.location) ? void 0 : e.pathname) || ""
        }
        get isEnabled() {
            return "history_change" === this._instance.config.capture_pageview
        }
        startIfEnabled() {
            this.isEnabled && ($t.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges())
        }
        stop() {
            this.yt && this.yt(), this.yt = void 0, $t.info("History API monitoring stopped")
        }
        monitorHistoryChanges() {
            var i, e;
            if (t && t.history) {
                var r = this;
                null != (i = t.history.pushState) && i.__posthog_wrapped__ || ze(t.history, "pushState", (t => function(i, e, s) {
                    t.call(this, i, e, s), r.bt("pushState")
                })), null != (e = t.history.replaceState) && e.__posthog_wrapped__ || ze(t.history, "replaceState", (t => function(i, e, s) {
                    t.call(this, i, e, s), r.bt("replaceState")
                })), this.wt()
            }
        }
        bt(i) {
            try {
                var e, r = null == t || null == (e = t.location) ? void 0 : e.pathname;
                if (!r) return;
                r !== this._t && this.isEnabled && this._instance.capture("$pageview", {
                    navigation_type: i
                }), this._t = r
            } catch (t) {
                $t.error("Error capturing " + i + " pageview", t)
            }
        }
        wt() {
            if (!this.yt) {
                var i = () => {
                    this.bt("popstate")
                };
                Ht(t, "popstate", i), this.yt = () => {
                    t && t.removeEventListener("popstate", i)
                }
            }
        }
    }
    var Be = kt("[SegmentIntegration]");

    function qe(t, i) {
        var e = t.config.segment;
        if (!e) return i();
        ! function(t, i) {
            var e = t.config.segment;
            if (!e) return i();
            var r = e => {
                    var r = () => e.anonymousId() || ye();
                    t.config.get_device_id = r, e.id() && (t.register({
                        distinct_id: e.id(),
                        $device_id: r()
                    }), t.persistence.set_property(vi, "identified")), i()
                },
                s = e.user();
            "then" in s && T(s.then) ? s.then((t => r(t))) : r(s)
        }(t, (() => {
            e.register((t => {
                Promise && Promise.resolve || Be.warn("This browser does not have Promise support, and can not use the segment integration");
                var i = (i, e) => {
                    if (!e) return i;
                    i.event.userId || i.event.anonymousId === t.get_distinct_id() || (Be.info("No userId set, resetting PostHog"), t.reset()), i.event.userId && i.event.userId !== t.get_distinct_id() && (Be.info("UserId set, identifying with PostHog"), t.identify(i.event.userId));
                    var r = t.calculateEventProperties(e, i.event.properties);
                    return i.event.properties = Object.assign({}, r, i.event.properties), i
                };
                return {
                    name: "PostHog JS",
                    type: "enrichment",
                    version: "1.0.0",
                    isLoaded: () => !0,
                    load: () => Promise.resolve(),
                    track: t => i(t, t.event.event),
                    page: t => i(t, "$pageview"),
                    identify: t => i(t, "$identify"),
                    screen: t => i(t, "$screen")
                }
            })(t)).then((() => {
                i()
            }))
        }))
    }
    var We = "posthog-js";

    function Ge(t, i) {
        var {
            organization: e,
            projectId: r,
            prefix: s,
            severityAllowList: n = ["error"],
            sendExceptionsToPostHog: o = !0
        } = void 0 === i ? {} : i;
        return i => {
            var a, l, u, h, v;
            if (!("*" === n || n.includes(i.level)) || !t.__loaded) return i;
            i.tags || (i.tags = {});
            var d = t.requestRouter.endpointFor("ui", "/project/" + t.config.token + "/person/" + t.get_distinct_id());
            i.tags["PostHog Person URL"] = d, t.sessionRecordingStarted() && (i.tags["PostHog Recording URL"] = t.get_session_replay_url({
                withTimestamp: !0
            }));
            var c = (null == (a = i.exception) ? void 0 : a.values) || [],
                f = c.map((t => g({}, t, {
                    stacktrace: t.stacktrace ? g({}, t.stacktrace, {
                        type: "raw",
                        frames: (t.stacktrace.frames || []).map((t => g({}, t, {
                            platform: "web:javascript"
                        })))
                    }) : void 0
                }))),
                p = {
                    $exception_message: (null == (l = c[0]) ? void 0 : l.value) || i.message,
                    $exception_type: null == (u = c[0]) ? void 0 : u.type,
                    $exception_level: i.level,
                    $exception_list: f,
                    $sentry_event_id: i.event_id,
                    $sentry_exception: i.exception,
                    $sentry_exception_message: (null == (h = c[0]) ? void 0 : h.value) || i.message,
                    $sentry_exception_type: null == (v = c[0]) ? void 0 : v.type,
                    $sentry_tags: i.tags
                };
            return e && r && (p.$sentry_url = (s || "https://sentry.io/organizations/") + e + "/issues/?project=" + r + "&query=" + i.event_id), o && t.exceptions.sendExceptionEvent(p), i
        }
    }
    class Ve {
        constructor(t, i, e, r, s, n) {
            this.name = We, this.setupOnce = function(o) {
                o(Ge(t, {
                    organization: i,
                    projectId: e,
                    prefix: r,
                    severityAllowList: s,
                    sendExceptionsToPostHog: null == n || n
                }))
            }
        }
    }
    var Je = null != t && t.location ? oe(t.location.hash, "__posthog") || oe(location.hash, "state") : null,
        Ke = "_postHogToolbarParams",
        Ye = kt("[Toolbar]"),
        Xe = function(t) {
            return t[t.UNINITIALIZED = 0] = "UNINITIALIZED", t[t.LOADING = 1] = "LOADING", t[t.LOADED = 2] = "LOADED", t
        }(Xe || {});
    class Qe {
        constructor(t) {
            this.instance = t
        }
        St(t) {
            d.ph_toolbar_state = t
        }
        xt() {
            var t;
            return null !== (t = d.ph_toolbar_state) && void 0 !== t ? t : Xe.UNINITIALIZED
        }
        maybeLoadToolbar(i, e, r) {
            if (void 0 === i && (i = void 0), void 0 === e && (e = void 0), void 0 === r && (r = void 0), !t || !o) return !1;
            i = null != i ? i : t.location, r = null != r ? r : t.history;
            try {
                if (!e) {
                    try {
                        t.localStorage.setItem("test", "test"), t.localStorage.removeItem("test")
                    } catch (t) {
                        return !1
                    }
                    e = null == t ? void 0 : t.localStorage
                }
                var s, n = Je || oe(i.hash, "__posthog") || oe(i.hash, "state"),
                    a = n ? At((() => JSON.parse(atob(decodeURIComponent(n))))) || At((() => JSON.parse(decodeURIComponent(n)))) : null;
                return a && "ph_authorize" === a.action ? ((s = a).source = "url", s && Object.keys(s).length > 0 && (a.desiredHash ? i.hash = a.desiredHash : r ? r.replaceState(r.state, "", i.pathname + i.search) : i.hash = "")) : ((s = JSON.parse(e.getItem(Ke) || "{}")).source = "localstorage", delete s.userIntent), !(!s.token || this.instance.config.token !== s.token) && (this.loadToolbar(s), !0)
            } catch (t) {
                return !1
            }
        }
        Et(t) {
            var i = d.ph_load_toolbar || d.ph_load_editor;
            !A(i) && T(i) ? i(t, this.instance) : Ye.warn("No toolbar load function found")
        }
        loadToolbar(i) {
            var e = !(null == o || !o.getElementById(mi));
            if (!t || e) return !1;
            var r = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics,
                s = g({
                    token: this.instance.config.token
                }, i, {
                    apiURL: this.instance.requestRouter.endpointFor("ui")
                }, r ? {
                    instrument: !1
                } : {});
            if (t.localStorage.setItem(Ke, JSON.stringify(g({}, s, {
                    source: void 0
                }))), this.xt() === Xe.LOADED) this.Et(s);
            else if (this.xt() === Xe.UNINITIALIZED) {
                var n;
                this.St(Xe.LOADING), null == (n = d.__PosthogExtensions__) || null == n.loadExternalDependency || n.loadExternalDependency(this.instance, "toolbar", (t => {
                    if (t) return Ye.error("[Toolbar] Failed to load", t), void this.St(Xe.UNINITIALIZED);
                    this.St(Xe.LOADED), this.Et(s)
                })), Ht(t, "turbolinks:load", (() => {
                    this.St(Xe.UNINITIALIZED), this.loadToolbar(s)
                }))
            }
            return !0
        }
        $t(t) {
            return this.loadToolbar(t)
        }
        maybeLoadEditor(t, i, e) {
            return void 0 === t && (t = void 0), void 0 === i && (i = void 0), void 0 === e && (e = void 0), this.maybeLoadToolbar(t, i, e)
        }
    }
    var Ze = kt("[TracingHeaders]");
    class tr {
        constructor(t) {
            this.kt = void 0, this.Pt = void 0, this.lt = () => {
                var t, i;
                C(this.kt) && (null == (t = d.__PosthogExtensions__) || null == (t = t.tracingHeadersPatchFns) || t._patchXHR(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager));
                C(this.Pt) && (null == (i = d.__PosthogExtensions__) || null == (i = i.tracingHeadersPatchFns) || i._patchFetch(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager))
            }, this._instance = t
        }
        nt(t) {
            var i, e;
            null != (i = d.__PosthogExtensions__) && i.tracingHeadersPatchFns && t(), null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this._instance, "tracing-headers", (i => {
                if (i) return Ze.error("failed to load script", i);
                t()
            }))
        }
        startIfEnabledOrStop() {
            var t, i;
            this._instance.config.__add_tracing_headers ? this.nt(this.lt) : (null == (t = this.kt) || t.call(this), null == (i = this.Pt) || i.call(this), this.kt = void 0, this.Pt = void 0)
        }
    }
    var ir = "Mobile",
        er = "iOS",
        rr = "Android",
        sr = "Tablet",
        nr = rr + " " + sr,
        or = "iPad",
        ar = "Apple",
        lr = ar + " Watch",
        ur = "Safari",
        hr = "BlackBerry",
        vr = "Samsung",
        dr = vr + "Browser",
        cr = vr + " Internet",
        fr = "Chrome",
        pr = fr + " OS",
        gr = fr + " " + er,
        _r = "Internet Explorer",
        mr = _r + " " + ir,
        yr = "Opera",
        br = yr + " Mini",
        wr = "Edge",
        Sr = "Microsoft " + wr,
        xr = "Firefox",
        Er = xr + " " + er,
        $r = "Nintendo",
        kr = "PlayStation",
        Pr = "Xbox",
        Tr = rr + " " + ir,
        Ir = ir + " " + ur,
        Rr = "Windows",
        Cr = Rr + " Phone",
        Or = "Nokia",
        Fr = "Ouya",
        Mr = "Generic",
        Ar = Mr + " " + ir.toLowerCase(),
        jr = Mr + " " + sr.toLowerCase(),
        Dr = "Konqueror",
        Lr = "(\\d+(\\.\\d+)?)",
        Nr = new RegExp("Version/" + Lr),
        Ur = new RegExp(Pr, "i"),
        zr = new RegExp(kr + " \\w+", "i"),
        Hr = new RegExp($r + " \\w+", "i"),
        Br = new RegExp(hr + "|PlayBook|BB10", "i"),
        qr = {
            "NT3.51": "NT 3.11",
            "NT4.0": "NT 4.0",
            "5.0": "2000",
            5.1: "XP",
            5.2: "XP",
            "6.0": "Vista",
            6.1: "7",
            6.2: "8",
            6.3: "8.1",
            6.4: "10",
            "10.0": "10"
        };
    var Wr = (t, i) => i && y(i, ar) || function(t) {
            return y(t, ur) && !y(t, fr) && !y(t, rr)
        }(t),
        Gr = function(t, i) {
            return i = i || "", y(t, " OPR/") && y(t, "Mini") ? br : y(t, " OPR/") ? yr : Br.test(t) ? hr : y(t, "IE" + ir) || y(t, "WPDesktop") ? mr : y(t, dr) ? cr : y(t, wr) || y(t, "Edg/") ? Sr : y(t, "FBIOS") ? "Facebook " + ir : y(t, "UCWEB") || y(t, "UCBrowser") ? "UC Browser" : y(t, "CriOS") ? gr : y(t, "CrMo") || y(t, fr) ? fr : y(t, rr) && y(t, ur) ? Tr : y(t, "FxiOS") ? Er : y(t.toLowerCase(), Dr.toLowerCase()) ? Dr : Wr(t, i) ? y(t, ir) ? Ir : ur : y(t, xr) ? xr : y(t, "MSIE") || y(t, "Trident/") ? _r : y(t, "Gecko") ? xr : ""
        },
        Vr = {
            [mr]: [new RegExp("rv:" + Lr)],
            [Sr]: [new RegExp(wr + "?\\/" + Lr)],
            [fr]: [new RegExp("(" + fr + "|CrMo)\\/" + Lr)],
            [gr]: [new RegExp("CriOS\\/" + Lr)],
            "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Lr)],
            [ur]: [Nr],
            [Ir]: [Nr],
            [yr]: [new RegExp("(Opera|OPR)\\/" + Lr)],
            [xr]: [new RegExp(xr + "\\/" + Lr)],
            [Er]: [new RegExp("FxiOS\\/" + Lr)],
            [Dr]: [new RegExp("Konqueror[:/]?" + Lr, "i")],
            [hr]: [new RegExp(hr + " " + Lr), Nr],
            [Tr]: [new RegExp("android\\s" + Lr, "i")],
            [cr]: [new RegExp(dr + "\\/" + Lr)],
            [_r]: [new RegExp("(rv:|MSIE )" + Lr)],
            Mozilla: [new RegExp("rv:" + Lr)]
        },
        Jr = function(t, i) {
            var e = Gr(t, i),
                r = Vr[e];
            if (C(r)) return null;
            for (var s = 0; s < r.length; s++) {
                var n = r[s],
                    o = t.match(n);
                if (o) return parseFloat(o[o.length - 2])
            }
            return null
        },
        Kr = [
            [new RegExp(Pr + "; " + Pr + " (.*?)[);]", "i"), t => [Pr, t && t[1] || ""]],
            [new RegExp($r, "i"), [$r, ""]],
            [new RegExp(kr, "i"), [kr, ""]],
            [Br, [hr, ""]],
            [new RegExp(Rr, "i"), (t, i) => {
                if (/Phone/.test(i) || /WPDesktop/.test(i)) return [Cr, ""];
                if (new RegExp(ir).test(i) && !/IEMobile\b/.test(i)) return [Rr + " " + ir, ""];
                var e = /Windows NT ([0-9.]+)/i.exec(i);
                if (e && e[1]) {
                    var r = e[1],
                        s = qr[r] || "";
                    return /arm/i.test(i) && (s = "RT"), [Rr, s]
                }
                return [Rr, ""]
            }],
            [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, t => {
                if (t && t[3]) {
                    var i = [t[3], t[4], t[5] || "0"];
                    return [er, i.join(".")]
                }
                return [er, ""]
            }],
            [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, t => {
                var i = "";
                return t && t.length >= 3 && (i = C(t[2]) ? t[3] : t[2]), ["watchOS", i]
            }],
            [new RegExp("(" + rr + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + rr + ")", "i"), t => {
                if (t && t[2]) {
                    var i = [t[2], t[3], t[4] || "0"];
                    return [rr, i.join(".")]
                }
                return [rr, ""]
            }],
            [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, t => {
                var i = ["Mac OS X", ""];
                if (t && t[1]) {
                    var e = [t[1], t[2], t[3] || "0"];
                    i[1] = e.join(".")
                }
                return i
            }],
            [/Mac/i, ["Mac OS X", ""]],
            [/CrOS/, [pr, ""]],
            [/Linux|debian/i, ["Linux", ""]]
        ],
        Yr = function(t) {
            return Hr.test(t) ? $r : zr.test(t) ? kr : Ur.test(t) ? Pr : new RegExp(Fr, "i").test(t) ? Fr : new RegExp("(" + Cr + "|WPDesktop)", "i").test(t) ? Cr : /iPad/.test(t) ? or : /iPod/.test(t) ? "iPod Touch" : /iPhone/.test(t) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t) ? lr : Br.test(t) ? hr : /(kobo)\s(ereader|touch)/i.test(t) ? "Kobo" : new RegExp(Or, "i").test(t) ? Or : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t) || /(kf[a-z]+)( bui|\)).+silk\//i.test(t) ? "Kindle Fire" : /(Android|ZTE)/i.test(t) ? !new RegExp(ir).test(t) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(t) ? /pixel[\daxl ]{1,6}/i.test(t) && !/pixel c/i.test(t) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(t) || /lmy47v/i.test(t) && !/QTAQZ3/i.test(t) ? rr : nr : rr : new RegExp("(pda|" + ir + ")", "i").test(t) ? Ar : new RegExp(sr, "i").test(t) && !new RegExp(sr + " pc", "i").test(t) ? jr : ""
        },
        Xr = "https?://(.*)",
        Qr = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "irclid", "_kx"],
        Zr = Ft(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], Qr),
        ts = "<masked>",
        is = ["li_fat_id"];

    function es(t, i, e) {
        if (!o) return {};
        var r, s = i ? Ft([], Qr, e || []) : [],
            n = rs(ne(o.URL, s, ts), t),
            a = (r = {}, Ct(is, (function(t) {
                var i = Ee.J(t);
                r[t] = i || null
            })), r);
        return Ot(a, n)
    }

    function rs(t, i) {
        var e = Zr.concat(i || []),
            r = {};
        return Ct(e, (function(i) {
            var e = se(t, i);
            r[i] = e || null
        })), r
    }

    function ss(t) {
        var i = function(t) {
                return t ? 0 === t.search(Xr + "google.([^/?]*)") ? "google" : 0 === t.search(Xr + "bing.com") ? "bing" : 0 === t.search(Xr + "yahoo.com") ? "yahoo" : 0 === t.search(Xr + "duckduckgo.com") ? "duckduckgo" : null : null
            }(t),
            e = "yahoo" != i ? "q" : "p",
            r = {};
        if (!M(i)) {
            r.$search_engine = i;
            var s = o ? se(o.referrer, e) : "";
            s.length && (r.ph_keyword = s)
        }
        return r
    }

    function ns() {
        return navigator.language || navigator.userLanguage
    }

    function os() {
        return (null == o ? void 0 : o.referrer) || "$direct"
    }

    function as(t, i) {
        var e = t ? Ft([], Qr, i || []) : [],
            r = null == a ? void 0 : a.href.substring(0, 1e3);
        return {
            r: os().substring(0, 1e3),
            u: r ? ne(r, e, ts) : void 0
        }
    }

    function ls(t) {
        var i, {
                r: e,
                u: r
            } = t,
            s = {
                $referrer: e,
                $referring_domain: null == e ? void 0 : "$direct" == e ? "$direct" : null == (i = ee(e)) ? void 0 : i.host
            };
        if (r) {
            s.$current_url = r;
            var n = ee(r);
            s.$host = null == n ? void 0 : n.host, s.$pathname = null == n ? void 0 : n.pathname;
            var o = rs(r);
            Ot(s, o)
        }
        if (e) {
            var a = ss(e);
            Ot(s, a)
        }
        return s
    }

    function us() {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        } catch (t) {
            return
        }
    }

    function hs() {
        try {
            return (new Date).getTimezoneOffset()
        } catch (t) {
            return
        }
    }

    function vs(i, e) {
        if (!v) return {};
        var r, s, n, o = i ? Ft([], Qr, e || []) : [],
            [l, u] = function(t) {
                for (var i = 0; i < Kr.length; i++) {
                    var [e, r] = Kr[i], s = e.exec(t), n = s && (T(r) ? r(s, t) : r);
                    if (n) return n
                }
                return ["", ""]
            }(v);
        return Ot(Dt({
            $os: l,
            $os_version: u,
            $browser: Gr(v, navigator.vendor),
            $device: Yr(v),
            $device_type: (s = v, n = Yr(s), n === or || n === nr || "Kobo" === n || "Kindle Fire" === n || n === jr ? sr : n === $r || n === Pr || n === kr || n === Fr ? "Console" : n === lr ? "Wearable" : n ? ir : "Desktop"),
            $timezone: us(),
            $timezone_offset: hs()
        }), {
            $current_url: ne(null == a ? void 0 : a.href, o, ts),
            $host: null == a ? void 0 : a.host,
            $pathname: null == a ? void 0 : a.pathname,
            $raw_user_agent: v.length > 1e3 ? v.substring(0, 997) + "..." : v,
            $browser_version: Jr(v, navigator.vendor),
            $browser_language: ns(),
            $browser_language_prefix: (r = ns(), "string" == typeof r ? r.split("-")[0] : void 0),
            $screen_height: null == t ? void 0 : t.screen.height,
            $screen_width: null == t ? void 0 : t.screen.width,
            $viewport_height: null == t ? void 0 : t.innerHeight,
            $viewport_width: null == t ? void 0 : t.innerWidth,
            $lib: "web",
            $lib_version: c.LIB_VERSION,
            $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
            $time: Date.now() / 1e3
        })
    }
    var ds = kt("[Web Vitals]"),
        cs = 9e5;
    class fs {
        constructor(t) {
            var i;
            this.Tt = !1, this.C = !1, this.q = {
                url: void 0,
                metrics: [],
                firstMetricTimestamp: void 0
            }, this.It = () => {
                clearTimeout(this.Rt), 0 !== this.q.metrics.length && (this._instance.capture("$web_vitals", this.q.metrics.reduce(((t, i) => g({}, t, {
                    ["$web_vitals_" + i.name + "_event"]: g({}, i),
                    ["$web_vitals_" + i.name + "_value"]: i.value
                })), {})), this.q = {
                    url: void 0,
                    metrics: [],
                    firstMetricTimestamp: void 0
                })
            }, this.Ct = t => {
                var i, e = null == (i = this._instance.sessionManager) ? void 0 : i.checkAndGetSessionAndWindowId(!0);
                if (C(e)) ds.error("Could not read session ID. Dropping metrics!");
                else {
                    this.q = this.q || {
                        url: void 0,
                        metrics: [],
                        firstMetricTimestamp: void 0
                    };
                    var r = this.Ot();
                    if (!C(r))
                        if (A(null == t ? void 0 : t.name) || A(null == t ? void 0 : t.value)) ds.error("Invalid metric received", t);
                        else if (this.Ft && t.value >= this.Ft) ds.error("Ignoring metric with value >= " + this.Ft, t);
                    else this.q.url !== r && (this.It(), this.Rt = setTimeout(this.It, this.flushToCaptureTimeoutMs)), C(this.q.url) && (this.q.url = r), this.q.firstMetricTimestamp = C(this.q.firstMetricTimestamp) ? Date.now() : this.q.firstMetricTimestamp, t.attribution && t.attribution.interactionTargetElement && (t.attribution.interactionTargetElement = void 0), this.q.metrics.push(g({}, t, {
                        $current_url: r,
                        $session_id: e.sessionId,
                        $window_id: e.windowId,
                        timestamp: Date.now()
                    })), this.q.metrics.length === this.allowedMetrics.length && this.It()
                }
            }, this.lt = () => {
                var t, i, e, r, s = d.__PosthogExtensions__;
                C(s) || C(s.postHogWebVitalsCallbacks) || ({
                    onLCP: t,
                    onCLS: i,
                    onFCP: e,
                    onINP: r
                } = s.postHogWebVitalsCallbacks), t && i && e && r ? (this.allowedMetrics.indexOf("LCP") > -1 && t(this.Ct.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && i(this.Ct.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && e(this.Ct.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && r(this.Ct.bind(this)), this.C = !0) : ds.error("web vitals callbacks not loaded - not starting")
            }, this._instance = t, this.Tt = !(null == (i = this._instance.persistence) || !i.props[Xt]), this.startIfEnabled()
        }
        get allowedMetrics() {
            var t, i, e = I(this._instance.config.capture_performance) ? null == (t = this._instance.config.capture_performance) ? void 0 : t.web_vitals_allowed_metrics : void 0;
            return C(e) ? (null == (i = this._instance.persistence) ? void 0 : i.props[Zt]) || ["CLS", "FCP", "INP", "LCP"] : e
        }
        get flushToCaptureTimeoutMs() {
            return (I(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3
        }
        get Ft() {
            var t = I(this._instance.config.capture_performance) && j(this._instance.config.capture_performance.__web_vitals_max_value) ? this._instance.config.capture_performance.__web_vitals_max_value : cs;
            return 0 < t && t <= 6e4 ? cs : t
        }
        get isEnabled() {
            var t = null == a ? void 0 : a.protocol;
            if ("http:" !== t && "https:" !== t) return ds.info("Web Vitals are disabled on non-http/https protocols"), !1;
            var i = I(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals : D(this._instance.config.capture_performance) ? this._instance.config.capture_performance : void 0;
            return D(i) ? i : this.Tt
        }
        startIfEnabled() {
            this.isEnabled && !this.C && (ds.info("enabled, starting..."), this.nt(this.lt))
        }
        onRemoteConfig(t) {
            var i = I(t.capturePerformance) && !!t.capturePerformance.web_vitals,
                e = I(t.capturePerformance) ? t.capturePerformance.web_vitals_allowed_metrics : void 0;
            this._instance.persistence && (this._instance.persistence.register({
                [Xt]: i
            }), this._instance.persistence.register({
                [Zt]: e
            })), this.Tt = i, this.startIfEnabled()
        }
        nt(t) {
            var i, e;
            null != (i = d.__PosthogExtensions__) && i.postHogWebVitalsCallbacks && t(), null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this._instance, "web-vitals", (i => {
                i ? ds.error("failed to load script", i) : t()
            }))
        }
        Ot() {
            var i = t ? t.location.href : void 0;
            if (i) {
                var e = this._instance.config.mask_personal_data_properties,
                    r = this._instance.config.custom_personal_data_properties,
                    s = e ? Ft([], Qr, r || []) : [];
                return ne(i, s, ts)
            }
            ds.error("Could not determine current URL")
        }
    }
    var ps = kt("[Heatmaps]");

    function gs(t) {
        return I(t) && "clientX" in t && "clientY" in t && j(t.clientX) && j(t.clientY)
    }
    class _s {
        constructor(t) {
            var i;
            this.rageclicks = new Zi, this.Tt = !1, this.C = !1, this.Mt = null, this.instance = t, this.Tt = !(null == (i = this.instance.persistence) || !i.props[Vt])
        }
        get flushIntervalMilliseconds() {
            var t = 5e3;
            return I(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (t = this.instance.config.capture_heatmaps.flush_interval_milliseconds), t
        }
        get isEnabled() {
            return C(this.instance.config.capture_heatmaps) ? C(this.instance.config.enable_heatmaps) ? this.Tt : this.instance.config.enable_heatmaps : !1 !== this.instance.config.capture_heatmaps
        }
        startIfEnabled() {
            if (this.isEnabled) {
                if (this.C) return;
                ps.info("starting..."), this.At(), this.jt()
            } else {
                var t;
                clearInterval(null !== (t = this.Mt) && void 0 !== t ? t : void 0), this.Dt(), this.getAndClearBuffer()
            }
        }
        onRemoteConfig(t) {
            var i = !!t.heatmaps;
            this.instance.persistence && this.instance.persistence.register({
                [Vt]: i
            }), this.Tt = i, this.startIfEnabled()
        }
        getAndClearBuffer() {
            var t = this.q;
            return this.q = void 0, t
        }
        Lt(t) {
            this.Nt(t.originalEvent, "deadclick")
        }
        jt() {
            this.Mt && clearInterval(this.Mt), this.Mt = function(t) {
                return "visible" === (null == t ? void 0 : t.visibilityState)
            }(o) ? setInterval(this.Ut.bind(this), this.flushIntervalMilliseconds) : null
        }
        At() {
            t && o && (this.zt = this.Ut.bind(this), Ht(t, "beforeunload", this.zt), this.Ht = i => this.Nt(i || (null == t ? void 0 : t.event)), Ht(o, "click", this.Ht, {
                capture: !0
            }), this.Bt = i => this.qt(i || (null == t ? void 0 : t.event)), Ht(o, "mousemove", this.Bt, {
                capture: !0
            }), this.Wt = new Le(this.instance, je, this.Lt.bind(this)), this.Wt.startIfEnabled(), this.Gt = this.jt.bind(this), Ht(o, "visibilitychange", this.Gt), this.C = !0)
        }
        Dt() {
            var i;
            t && o && (this.zt && t.removeEventListener("beforeunload", this.zt), this.Ht && o.removeEventListener("click", this.Ht, {
                capture: !0
            }), this.Bt && o.removeEventListener("mousemove", this.Bt, {
                capture: !0
            }), this.Gt && o.removeEventListener("visibilitychange", this.Gt), clearTimeout(this.Vt), null == (i = this.Wt) || i.stop(), this.C = !1)
        }
        Jt(i, e) {
            var r = this.instance.scrollManager.scrollY(),
                s = this.instance.scrollManager.scrollX(),
                n = this.instance.scrollManager.scrollElement(),
                o = function(i, e, r) {
                    for (var s = i; s && Si(s) && !xi(s, "body");) {
                        if (s === r) return !1;
                        if (y(e, null == t ? void 0 : t.getComputedStyle(s).position)) return !0;
                        s = Mi(s)
                    }
                    return !1
                }(Ci(i), ["fixed", "sticky"], n);
            return {
                x: i.clientX + (o ? 0 : s),
                y: i.clientY + (o ? 0 : r),
                target_fixed: o,
                type: e
            }
        }
        Nt(t, i) {
            var e;
            if (void 0 === i && (i = "click"), !wi(t.target) && gs(t)) {
                var r = this.Jt(t, i);
                null != (e = this.rageclicks) && e.isRageClick(t.clientX, t.clientY, (new Date).getTime()) && this.Kt(g({}, r, {
                    type: "rageclick"
                })), this.Kt(r)
            }
        }
        qt(t) {
            !wi(t.target) && gs(t) && (clearTimeout(this.Vt), this.Vt = setTimeout((() => {
                this.Kt(this.Jt(t, "mousemove"))
            }), 500))
        }
        Kt(i) {
            if (t) {
                var e = t.location.href,
                    r = this.instance.config.mask_personal_data_properties,
                    s = this.instance.config.custom_personal_data_properties,
                    n = r ? Ft([], Qr, s || []) : [],
                    o = ne(e, n, ts);
                this.q = this.q || {}, this.q[o] || (this.q[o] = []), this.q[o].push(i)
            }
        }
        Ut() {
            this.q && !R(this.q) && this.instance.capture("$$heatmap", {
                $heatmap_data: this.getAndClearBuffer()
            })
        }
    }
    class ms {
        constructor(t) {
            this._instance = t
        }
        doPageView(i, e) {
            var r, s = this.Yt(i, e);
            return this.Xt = {
                pathname: null !== (r = null == t ? void 0 : t.location.pathname) && void 0 !== r ? r : "",
                pageViewId: e,
                timestamp: i
            }, this._instance.scrollManager.resetContext(), s
        }
        doPageLeave(t) {
            var i;
            return this.Yt(t, null == (i = this.Xt) ? void 0 : i.pageViewId)
        }
        doEvent() {
            var t;
            return {
                $pageview_id: null == (t = this.Xt) ? void 0 : t.pageViewId
            }
        }
        Yt(t, i) {
            var e = this.Xt;
            if (!e) return {
                $pageview_id: i
            };
            var r = {
                    $pageview_id: i,
                    $prev_pageview_id: e.pageViewId
                },
                s = this._instance.scrollManager.getContext();
            if (s && !this._instance.config.disable_scroll_properties) {
                var {
                    maxScrollHeight: n,
                    lastScrollY: o,
                    maxScrollY: a,
                    maxContentHeight: l,
                    lastContentY: u,
                    maxContentY: h
                } = s;
                if (!(C(n) || C(o) || C(a) || C(l) || C(u) || C(h))) {
                    n = Math.ceil(n), o = Math.ceil(o), a = Math.ceil(a), l = Math.ceil(l), u = Math.ceil(u), h = Math.ceil(h);
                    var v = n <= 1 ? 1 : G(o / n, 0, 1, $t),
                        d = n <= 1 ? 1 : G(a / n, 0, 1, $t),
                        c = l <= 1 ? 1 : G(u / l, 0, 1, $t),
                        f = l <= 1 ? 1 : G(h / l, 0, 1, $t);
                    r = Ot(r, {
                        $prev_pageview_last_scroll: o,
                        $prev_pageview_last_scroll_percentage: v,
                        $prev_pageview_max_scroll: a,
                        $prev_pageview_max_scroll_percentage: d,
                        $prev_pageview_last_content: u,
                        $prev_pageview_last_content_percentage: c,
                        $prev_pageview_max_content: h,
                        $prev_pageview_max_content_percentage: f
                    })
                }
            }
            return e.pathname && (r.$prev_pageview_pathname = e.pathname), e.timestamp && (r.$prev_pageview_duration = (t.getTime() - e.timestamp.getTime()) / 1e3), r
        }
    }
    var ys = Uint8Array,
        bs = Uint16Array,
        ws = Uint32Array,
        Ss = new ys([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
        xs = new ys([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
        Es = new ys([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
        $s = function(t, i) {
            for (var e = new bs(31), r = 0; r < 31; ++r) e[r] = i += 1 << t[r - 1];
            var s = new ws(e[30]);
            for (r = 1; r < 30; ++r)
                for (var n = e[r]; n < e[r + 1]; ++n) s[n] = n - e[r] << 5 | r;
            return [e, s]
        },
        ks = $s(Ss, 2),
        Ps = ks[0],
        Ts = ks[1];
    Ps[28] = 258, Ts[258] = 28;
    for (var Is = $s(xs, 0)[1], Rs = new bs(32768), Cs = 0; Cs < 32768; ++Cs) {
        var Os = (43690 & Cs) >>> 1 | (21845 & Cs) << 1;
        Os = (61680 & (Os = (52428 & Os) >>> 2 | (13107 & Os) << 2)) >>> 4 | (3855 & Os) << 4, Rs[Cs] = ((65280 & Os) >>> 8 | (255 & Os) << 8) >>> 1
    }
    var Fs = function(t, i, e) {
            for (var r = t.length, s = 0, n = new bs(i); s < r; ++s) ++n[t[s] - 1];
            var o, a = new bs(i);
            for (s = 0; s < i; ++s) a[s] = a[s - 1] + n[s - 1] << 1;
            if (e) {
                o = new bs(1 << i);
                var l = 15 - i;
                for (s = 0; s < r; ++s)
                    if (t[s])
                        for (var u = s << 4 | t[s], h = i - t[s], v = a[t[s] - 1]++ << h, d = v | (1 << h) - 1; v <= d; ++v) o[Rs[v] >>> l] = u
            } else
                for (o = new bs(r), s = 0; s < r; ++s) o[s] = Rs[a[t[s] - 1]++] >>> 15 - t[s];
            return o
        },
        Ms = new ys(288);
    for (Cs = 0; Cs < 144; ++Cs) Ms[Cs] = 8;
    for (Cs = 144; Cs < 256; ++Cs) Ms[Cs] = 9;
    for (Cs = 256; Cs < 280; ++Cs) Ms[Cs] = 7;
    for (Cs = 280; Cs < 288; ++Cs) Ms[Cs] = 8;
    var As = new ys(32);
    for (Cs = 0; Cs < 32; ++Cs) As[Cs] = 5;
    var js = Fs(Ms, 9, 0),
        Ds = Fs(As, 5, 0),
        Ls = function(t) {
            return (t / 8 >> 0) + (7 & t && 1)
        },
        Ns = function(t, i, e) {
            (null == e || e > t.length) && (e = t.length);
            var r = new(t instanceof bs ? bs : t instanceof ws ? ws : ys)(e - i);
            return r.set(t.subarray(i, e)), r
        },
        Us = function(t, i, e) {
            e <<= 7 & i;
            var r = i / 8 >> 0;
            t[r] |= e, t[r + 1] |= e >>> 8
        },
        zs = function(t, i, e) {
            e <<= 7 & i;
            var r = i / 8 >> 0;
            t[r] |= e, t[r + 1] |= e >>> 8, t[r + 2] |= e >>> 16
        },
        Hs = function(t, i) {
            for (var e = [], r = 0; r < t.length; ++r) t[r] && e.push({
                s: r,
                f: t[r]
            });
            var s = e.length,
                n = e.slice();
            if (!s) return [new ys(0), 0];
            if (1 == s) {
                var o = new ys(e[0].s + 1);
                return o[e[0].s] = 1, [o, 1]
            }
            e.sort((function(t, i) {
                return t.f - i.f
            })), e.push({
                s: -1,
                f: 25001
            });
            var a = e[0],
                l = e[1],
                u = 0,
                h = 1,
                v = 2;
            for (e[0] = {
                    s: -1,
                    f: a.f + l.f,
                    l: a,
                    r: l
                }; h != s - 1;) a = e[e[u].f < e[v].f ? u++ : v++], l = e[u != h && e[u].f < e[v].f ? u++ : v++], e[h++] = {
                s: -1,
                f: a.f + l.f,
                l: a,
                r: l
            };
            var d = n[0].s;
            for (r = 1; r < s; ++r) n[r].s > d && (d = n[r].s);
            var c = new bs(d + 1),
                f = Bs(e[h - 1], c, 0);
            if (f > i) {
                r = 0;
                var p = 0,
                    g = f - i,
                    _ = 1 << g;
                for (n.sort((function(t, i) {
                        return c[i.s] - c[t.s] || t.f - i.f
                    })); r < s; ++r) {
                    var m = n[r].s;
                    if (!(c[m] > i)) break;
                    p += _ - (1 << f - c[m]), c[m] = i
                }
                for (p >>>= g; p > 0;) {
                    var y = n[r].s;
                    c[y] < i ? p -= 1 << i - c[y]++ - 1 : ++r
                }
                for (; r >= 0 && p; --r) {
                    var b = n[r].s;
                    c[b] == i && (--c[b], ++p)
                }
                f = i
            }
            return [new ys(c), f]
        },
        Bs = function(t, i, e) {
            return -1 == t.s ? Math.max(Bs(t.l, i, e + 1), Bs(t.r, i, e + 1)) : i[t.s] = e
        },
        qs = function(t) {
            for (var i = t.length; i && !t[--i];);
            for (var e = new bs(++i), r = 0, s = t[0], n = 1, o = function(t) {
                    e[r++] = t
                }, a = 1; a <= i; ++a)
                if (t[a] == s && a != i) ++n;
                else {
                    if (!s && n > 2) {
                        for (; n > 138; n -= 138) o(32754);
                        n > 2 && (o(n > 10 ? n - 11 << 5 | 28690 : n - 3 << 5 | 12305), n = 0)
                    } else if (n > 3) {
                        for (o(s), --n; n > 6; n -= 6) o(8304);
                        n > 2 && (o(n - 3 << 5 | 8208), n = 0)
                    }
                    for (; n--;) o(s);
                    n = 1, s = t[a]
                }
            return [e.subarray(0, r), i]
        },
        Ws = function(t, i) {
            for (var e = 0, r = 0; r < i.length; ++r) e += t[r] * i[r];
            return e
        },
        Gs = function(t, i, e) {
            var r = e.length,
                s = Ls(i + 2);
            t[s] = 255 & r, t[s + 1] = r >>> 8, t[s + 2] = 255 ^ t[s], t[s + 3] = 255 ^ t[s + 1];
            for (var n = 0; n < r; ++n) t[s + n + 4] = e[n];
            return 8 * (s + 4 + r)
        },
        Vs = function(t, i, e, r, s, n, o, a, l, u, h) {
            Us(i, h++, e), ++s[256];
            for (var v = Hs(s, 15), d = v[0], c = v[1], f = Hs(n, 15), p = f[0], g = f[1], _ = qs(d), m = _[0], y = _[1], b = qs(p), w = b[0], S = b[1], x = new bs(19), E = 0; E < m.length; ++E) x[31 & m[E]]++;
            for (E = 0; E < w.length; ++E) x[31 & w[E]]++;
            for (var k = Hs(x, 7), P = k[0], T = k[1], I = 19; I > 4 && !P[Es[I - 1]]; --I);
            var R, C, O, F, M = u + 5 << 3,
                A = Ws(s, Ms) + Ws(n, As) + o,
                j = Ws(s, d) + Ws(n, p) + o + 14 + 3 * I + Ws(x, P) + (2 * x[16] + 3 * x[17] + 7 * x[18]);
            if (M <= A && M <= j) return Gs(i, h, t.subarray(l, l + u));
            if (Us(i, h, 1 + (j < A)), h += 2, j < A) {
                R = Fs(d, c, 0), C = d, O = Fs(p, g, 0), F = p;
                var D = Fs(P, T, 0);
                Us(i, h, y - 257), Us(i, h + 5, S - 1), Us(i, h + 10, I - 4), h += 14;
                for (E = 0; E < I; ++E) Us(i, h + 3 * E, P[Es[E]]);
                h += 3 * I;
                for (var L = [m, w], N = 0; N < 2; ++N) {
                    var U = L[N];
                    for (E = 0; E < U.length; ++E) {
                        var z = 31 & U[E];
                        Us(i, h, D[z]), h += P[z], z > 15 && (Us(i, h, U[E] >>> 5 & 127), h += U[E] >>> 12)
                    }
                }
            } else R = js, C = Ms, O = Ds, F = As;
            for (E = 0; E < a; ++E)
                if (r[E] > 255) {
                    z = r[E] >>> 18 & 31;
                    zs(i, h, R[z + 257]), h += C[z + 257], z > 7 && (Us(i, h, r[E] >>> 23 & 31), h += Ss[z]);
                    var H = 31 & r[E];
                    zs(i, h, O[H]), h += F[H], H > 3 && (zs(i, h, r[E] >>> 5 & 8191), h += xs[H])
                } else zs(i, h, R[r[E]]), h += C[r[E]];
            return zs(i, h, R[256]), h + C[256]
        },
        Js = new ws([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
        Ks = function() {
            for (var t = new ws(256), i = 0; i < 256; ++i) {
                for (var e = i, r = 9; --r;) e = (1 & e && 3988292384) ^ e >>> 1;
                t[i] = e
            }
            return t
        }(),
        Ys = function(t, i, e, r, s) {
            return function(t, i, e, r, s, n) {
                var o = t.length,
                    a = new ys(r + o + 5 * (1 + Math.floor(o / 7e3)) + s),
                    l = a.subarray(r, a.length - s),
                    u = 0;
                if (!i || o < 8)
                    for (var h = 0; h <= o; h += 65535) {
                        var v = h + 65535;
                        v < o ? u = Gs(l, u, t.subarray(h, v)) : (l[h] = n, u = Gs(l, u, t.subarray(h, o)))
                    } else {
                        for (var d = Js[i - 1], c = d >>> 13, f = 8191 & d, p = (1 << e) - 1, g = new bs(32768), _ = new bs(p + 1), m = Math.ceil(e / 3), y = 2 * m, b = function(i) {
                                return (t[i] ^ t[i + 1] << m ^ t[i + 2] << y) & p
                            }, w = new ws(25e3), S = new bs(288), x = new bs(32), E = 0, k = 0, P = (h = 0, 0), T = 0, I = 0; h < o; ++h) {
                            var R = b(h),
                                C = 32767 & h,
                                O = _[R];
                            if (g[C] = O, _[R] = C, T <= h) {
                                var F = o - h;
                                if ((E > 7e3 || P > 24576) && F > 423) {
                                    u = Vs(t, l, 0, w, S, x, k, P, I, h - I, u), P = E = k = 0, I = h;
                                    for (var M = 0; M < 286; ++M) S[M] = 0;
                                    for (M = 0; M < 30; ++M) x[M] = 0
                                }
                                var A = 2,
                                    j = 0,
                                    D = f,
                                    L = C - O & 32767;
                                if (F > 2 && R == b(h - L))
                                    for (var N = Math.min(c, F) - 1, U = Math.min(32767, h), z = Math.min(258, F); L <= U && --D && C != O;) {
                                        if (t[h + A] == t[h + A - L]) {
                                            for (var H = 0; H < z && t[h + H] == t[h + H - L]; ++H);
                                            if (H > A) {
                                                if (A = H, j = L, H > N) break;
                                                var B = Math.min(L, H - 2),
                                                    q = 0;
                                                for (M = 0; M < B; ++M) {
                                                    var W = h - L + M + 32768 & 32767,
                                                        G = W - g[W] + 32768 & 32767;
                                                    G > q && (q = G, O = W)
                                                }
                                            }
                                        }
                                        L += (C = O) - (O = g[C]) + 32768 & 32767
                                    }
                                if (j) {
                                    w[P++] = 268435456 | Ts[A] << 18 | Is[j];
                                    var V = 31 & Ts[A],
                                        J = 31 & Is[j];
                                    k += Ss[V] + xs[J], ++S[257 + V], ++x[J], T = h + A, ++E
                                } else w[P++] = t[h], ++S[t[h]]
                            }
                        }
                        u = Vs(t, l, n, w, S, x, k, P, I, h - I, u)
                    }
                return Ns(a, 0, r + Ls(u) + s)
            }(t, null == i.level ? 6 : i.level, null == i.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t.length)))) : 12 + i.mem, e, r, !0)
        },
        Xs = function(t, i, e) {
            for (; e; ++i) t[i] = e, e >>>= 8
        };

    function Qs(t, i) {
        void 0 === i && (i = {});
        var e = function() {
                var t = 4294967295;
                return {
                    p: function(i) {
                        for (var e = t, r = 0; r < i.length; ++r) e = Ks[255 & e ^ i[r]] ^ e >>> 8;
                        t = e
                    },
                    d: function() {
                        return 4294967295 ^ t
                    }
                }
            }(),
            r = t.length;
        e.p(t);
        var s, n = Ys(t, i, 10 + ((s = i).filename && s.filename.length + 1 || 0), 8),
            o = n.length;
        return function(t, i) {
            var e = i.filename;
            if (t[0] = 31, t[1] = 139, t[2] = 8, t[8] = i.level < 2 ? 4 : 9 == i.level ? 2 : 0, t[9] = 3, 0 != i.mtime && Xs(t, 4, Math.floor(new Date(i.mtime || Date.now()) / 1e3)), e) {
                t[3] = 8;
                for (var r = 0; r <= e.length; ++r) t[r + 10] = e.charCodeAt(r)
            }
        }(n, i), Xs(n, o - 8, e.d()), Xs(n, o - 4, r), n
    }
    var Zs = function(t) {
            var i, e, r, s, n = "";
            for (i = e = 0, r = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, s = 0; s < r; s++) {
                var o = t.charCodeAt(s),
                    a = null;
                o < 128 ? e++ : a = o > 127 && o < 2048 ? String.fromCharCode(o >> 6 | 192, 63 & o | 128) : String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, 63 & o | 128), M(a) || (e > i && (n += t.substring(i, e)), n += a, i = e = s + 1)
            }
            return e > i && (n += t.substring(i, t.length)), n
        },
        tn = !!u || !!l,
        en = "text/plain",
        rn = function(t, i, e) {
            var r;
            void 0 === e && (e = !0);
            var [s, n] = t.split("?"), o = g({}, i), a = null !== (r = null == n ? void 0 : n.split("&").map((t => {
                var i, [r, s] = t.split("="),
                    n = e && null !== (i = o[r]) && void 0 !== i ? i : s;
                return delete o[r], r + "=" + n
            }))) && void 0 !== r ? r : [], l = re(o);
            return l && a.push(l), s + "?" + a.join("&")
        },
        sn = (t, i) => JSON.stringify(t, ((t, i) => "bigint" == typeof i ? i.toString() : i), i),
        nn = t => {
            var {
                data: i,
                compression: e
            } = t;
            if (i) {
                if (e === ie.GZipJS) {
                    var r = Qs(function(t, i) {
                            var e = t.length;
                            if ("undefined" != typeof TextEncoder) return (new TextEncoder).encode(t);
                            for (var r = new ys(t.length + (t.length >>> 1)), s = 0, n = function(t) {
                                    r[s++] = t
                                }, o = 0; o < e; ++o) {
                                if (s + 5 > r.length) {
                                    var a = new ys(s + 8 + (e - o << 1));
                                    a.set(r), r = a
                                }
                                var l = t.charCodeAt(o);
                                l < 128 || i ? n(l) : l < 2048 ? (n(192 | l >>> 6), n(128 | 63 & l)) : l > 55295 && l < 57344 ? (n(240 | (l = 65536 + (1047552 & l) | 1023 & t.charCodeAt(++o)) >>> 18), n(128 | l >>> 12 & 63), n(128 | l >>> 6 & 63), n(128 | 63 & l)) : (n(224 | l >>> 12), n(128 | l >>> 6 & 63), n(128 | 63 & l))
                            }
                            return Ns(r, 0, s)
                        }(sn(i)), {
                            mtime: 0
                        }),
                        s = new Blob([r], {
                            type: en
                        });
                    return {
                        contentType: en,
                        body: s,
                        estimatedSize: s.size
                    }
                }
                if (e === ie.Base64) {
                    var n = function(t) {
                            var i, e, r, s, n, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                a = 0,
                                l = 0,
                                u = "",
                                h = [];
                            if (!t) return t;
                            t = Zs(t);
                            do {
                                i = (n = t.charCodeAt(a++) << 16 | t.charCodeAt(a++) << 8 | t.charCodeAt(a++)) >> 18 & 63, e = n >> 12 & 63, r = n >> 6 & 63, s = 63 & n, h[l++] = o.charAt(i) + o.charAt(e) + o.charAt(r) + o.charAt(s)
                            } while (a < t.length);
                            switch (u = h.join(""), t.length % 3) {
                                case 1:
                                    u = u.slice(0, -2) + "==";
                                    break;
                                case 2:
                                    u = u.slice(0, -1) + "="
                            }
                            return u
                        }(sn(i)),
                        o = (t => "data=" + encodeURIComponent("string" == typeof t ? t : sn(t)))(n);
                    return {
                        contentType: "application/x-www-form-urlencoded",
                        body: o,
                        estimatedSize: new Blob([o]).size
                    }
                }
                var a = sn(i);
                return {
                    contentType: "application/json",
                    body: a,
                    estimatedSize: new Blob([a]).size
                }
            }
        },
        on = [];
    l && on.push({
        transport: "fetch",
        method: t => {
            var i, e, {
                    contentType: r,
                    body: s,
                    estimatedSize: n
                } = null !== (i = nn(t)) && void 0 !== i ? i : {},
                o = new Headers;
            Ct(t.headers, (function(t, i) {
                o.append(i, t)
            })), r && o.append("Content-Type", r);
            var a = t.url,
                u = null;
            if (h) {
                var v = new h;
                u = {
                    signal: v.signal,
                    timeout: setTimeout((() => v.abort()), t.timeout)
                }
            }
            l(a, g({
                method: (null == t ? void 0 : t.method) || "GET",
                headers: o,
                keepalive: "POST" === t.method && (n || 0) < 52428.8,
                body: s,
                signal: null == (e = u) ? void 0 : e.signal
            }, t.fetchOptions)).then((i => i.text().then((e => {
                var r = {
                    statusCode: i.status,
                    text: e
                };
                if (200 === i.status) try {
                    r.json = JSON.parse(e)
                } catch (t) {
                    $t.error(t)
                }
                null == t.callback || t.callback(r)
            })))).catch((i => {
                $t.error(i), null == t.callback || t.callback({
                    statusCode: 0,
                    text: i
                })
            })).finally((() => u ? clearTimeout(u.timeout) : null))
        }
    }), u && on.push({
        transport: "XHR",
        method: t => {
            var i, e = new u;
            e.open(t.method || "GET", t.url, !0);
            var {
                contentType: r,
                body: s
            } = null !== (i = nn(t)) && void 0 !== i ? i : {};
            Ct(t.headers, (function(t, i) {
                e.setRequestHeader(i, t)
            })), r && e.setRequestHeader("Content-Type", r), t.timeout && (e.timeout = t.timeout), t.disableXHRCredentials || (e.withCredentials = !0), e.onreadystatechange = () => {
                if (4 === e.readyState) {
                    var i = {
                        statusCode: e.status,
                        text: e.responseText
                    };
                    if (200 === e.status) try {
                        i.json = JSON.parse(e.responseText)
                    } catch (t) {}
                    null == t.callback || t.callback(i)
                }
            }, e.send(s)
        }
    }), null != n && n.sendBeacon && on.push({
        transport: "sendBeacon",
        method: t => {
            var i = rn(t.url, {
                beacon: "1"
            });
            try {
                var e, {
                        contentType: r,
                        body: s
                    } = null !== (e = nn(t)) && void 0 !== e ? e : {},
                    o = "string" == typeof s ? new Blob([s], {
                        type: r
                    }) : s;
                n.sendBeacon(i, o)
            } catch (t) {}
        }
    });
    var an = function(t, i) {
        if (! function(t) {
                try {
                    new RegExp(t)
                } catch (t) {
                    return !1
                }
                return !0
            }(i)) return !1;
        try {
            return new RegExp(i).test(t)
        } catch (t) {
            return !1
        }
    };

    function ln(t, i, e) {
        return sn({
            distinct_id: t,
            userPropertiesToSet: i,
            userPropertiesToSetOnce: e
        })
    }
    var un = {
            exact: (t, i) => i.some((i => t.some((t => i === t)))),
            is_not: (t, i) => i.every((i => t.every((t => i !== t)))),
            regex: (t, i) => i.some((i => t.some((t => an(i, t))))),
            not_regex: (t, i) => i.every((i => t.every((t => !an(i, t))))),
            icontains: (t, i) => i.map(hn).some((i => t.map(hn).some((t => i.includes(t))))),
            not_icontains: (t, i) => i.map(hn).every((i => t.map(hn).every((t => !i.includes(t)))))
        },
        hn = t => t.toLowerCase(),
        vn = kt("[Error tracking]");
    class dn {
        constructor(t) {
            var i, e;
            this.Qt = [], this.Zt = new dt([new ct, new xt, new pt, new ft, new wt, new bt, new _t, new St], [nt, lt]), this._instance = t, this.Qt = null !== (i = null == (e = this._instance.persistence) ? void 0 : e.get_property(Kt)) && void 0 !== i ? i : []
        }
        onRemoteConfig(t) {
            var i, e, r, s = null !== (i = null == (e = t.errorTracking) ? void 0 : e.suppressionRules) && void 0 !== i ? i : [],
                n = null == (r = t.errorTracking) ? void 0 : r.captureExtensionExceptions;
            this.Qt = s, this._instance.persistence && this._instance.persistence.register({
                [Kt]: this.Qt,
                [Yt]: n
            })
        }
        get ti() {
            var t, i = !!this._instance.get_property(Yt),
                e = this._instance.config.error_tracking.captureExtensionExceptions;
            return null !== (t = null != e ? e : i) && void 0 !== t && t
        }
        buildProperties(t, i) {
            return this.Zt.buildFromUnknown(t, {
                syntheticException: null == i ? void 0 : i.syntheticException,
                mechanism: {
                    handled: null == i ? void 0 : i.handled
                }
            })
        }
        sendExceptionEvent(t) {
            var i = t.$exception_list;
            if (this.ii(i)) {
                if (this.ei(i)) return void vn.info("Skipping exception capture because a suppression rule matched");
                if (!this.ti && this.ri(i)) return void vn.info("Skipping exception capture because it was thrown by an extension");
                if (!this._instance.config.error_tracking.__capturePostHogExceptions && this.si(i)) return void vn.info("Skipping exception capture because it was thrown by the PostHog SDK")
            }
            return this._instance.capture("$exception", t, {
                _noTruncate: !0,
                _batchKey: "exceptionEvent"
            })
        }
        ei(t) {
            if (0 === t.length) return !1;
            var i = t.reduce(((t, i) => {
                var {
                    type: e,
                    value: r
                } = i;
                return O(e) && e.length > 0 && t.$exception_types.push(e), O(r) && r.length > 0 && t.$exception_values.push(r), t
            }), {
                $exception_types: [],
                $exception_values: []
            });
            return this.Qt.some((t => {
                var e = t.values.map((t => {
                    var e, r = un[t.operator],
                        s = P(t.value) ? t.value : [t.value],
                        n = null !== (e = i[t.key]) && void 0 !== e ? e : [];
                    return s.length > 0 && r(s, n)
                }));
                return "OR" === t.type ? e.some(Boolean) : e.every(Boolean)
            }))
        }
        ri(t) {
            return t.flatMap((t => {
                var i, e;
                return null !== (i = null == (e = t.stacktrace) ? void 0 : e.frames) && void 0 !== i ? i : []
            })).some((t => t.filename && t.filename.startsWith("chrome-extension://")))
        }
        si(t) {
            if (t.length > 0) {
                var i, e, r, s, n = null !== (i = null == (e = t[0].stacktrace) ? void 0 : e.frames) && void 0 !== i ? i : [],
                    o = n[n.length - 1];
                return null !== (r = null == o || null == (s = o.filename) ? void 0 : s.includes("posthog.com/static")) && void 0 !== r && r
            }
            return !1
        }
        ii(t) {
            return !A(t) && P(t)
        }
    }
    var cn = kt("[FeatureFlags]"),
        fn = "$active_feature_flags",
        pn = "$override_feature_flags",
        gn = "$feature_flag_payloads",
        _n = "$override_feature_flag_payloads",
        mn = "$feature_flag_request_id",
        yn = t => {
            var i = {};
            for (var [e, r] of Mt(t || {})) r && (i[e] = r);
            return i
        },
        bn = t => {
            var i = t.flags;
            return i ? (t.featureFlags = Object.fromEntries(Object.keys(i).map((t => {
                var e;
                return [t, null !== (e = i[t].variant) && void 0 !== e ? e : i[t].enabled]
            }))), t.featureFlagPayloads = Object.fromEntries(Object.keys(i).filter((t => i[t].enabled)).filter((t => {
                var e;
                return null == (e = i[t].metadata) ? void 0 : e.payload
            })).map((t => {
                var e;
                return [t, null == (e = i[t].metadata) ? void 0 : e.payload]
            })))) : cn.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), t
        },
        wn = function(t) {
            return t.FeatureFlags = "feature_flags", t.Recordings = "recordings", t
        }({});
    class Sn {
        constructor(t) {
            this.ni = !1, this.oi = !1, this.ai = !1, this.li = !1, this.ui = !1, this.hi = !1, this.vi = !1, this._instance = t, this.featureFlagEventHandlers = []
        }
        di() {
            var t = this._instance.config.evaluation_environments;
            return null != t && t.length ? t.filter((t => {
                var i = t && "string" == typeof t && t.trim().length > 0;
                return i || cn.error("Invalid evaluation environment found:", t, "Expected non-empty string"), i
            })) : []
        }
        ci() {
            return this.di().length > 0
        }
        flags() {
            if (this._instance.config.__preview_remote_config) this.hi = !0;
            else {
                var t = !this.fi && (this._instance.config.advanced_disable_feature_flags || this._instance.config.advanced_disable_feature_flags_on_first_load);
                this.pi({
                    disableFlags: t
                })
            }
        }
        get hasLoadedFlags() {
            return this.oi
        }
        getFlags() {
            return Object.keys(this.getFlagVariants())
        }
        getFlagsWithDetails() {
            var t = this._instance.get_property(ni),
                i = this._instance.get_property(pn),
                e = this._instance.get_property(_n);
            if (!e && !i) return t || {};
            var r = Ot({}, t || {}),
                s = [...new Set([...Object.keys(e || {}), ...Object.keys(i || {})])];
            for (var n of s) {
                var o, a, l = r[n],
                    u = null == i ? void 0 : i[n],
                    h = C(u) ? null !== (o = null == l ? void 0 : l.enabled) && void 0 !== o && o : !!u,
                    v = C(u) ? l.variant : "string" == typeof u ? u : void 0,
                    d = null == e ? void 0 : e[n],
                    c = g({}, l, {
                        enabled: h,
                        variant: h ? null != v ? v : null == l ? void 0 : l.variant : void 0
                    });
                if (h !== (null == l ? void 0 : l.enabled) && (c.original_enabled = null == l ? void 0 : l.enabled), v !== (null == l ? void 0 : l.variant) && (c.original_variant = null == l ? void 0 : l.variant), d) c.metadata = g({}, null == l ? void 0 : l.metadata, {
                    payload: d,
                    original_payload: null == l || null == (a = l.metadata) ? void 0 : a.payload
                });
                r[n] = c
            }
            return this.ni || (cn.warn(" Overriding feature flag details!", {
                flagDetails: t,
                overriddenPayloads: e,
                finalDetails: r
            }), this.ni = !0), r
        }
        getFlagVariants() {
            var t = this._instance.get_property(ri),
                i = this._instance.get_property(pn);
            if (!i) return t || {};
            for (var e = Ot({}, t), r = Object.keys(i), s = 0; s < r.length; s++) e[r[s]] = i[r[s]];
            return this.ni || (cn.warn(" Overriding feature flags!", {
                enabledFlags: t,
                overriddenFlags: i,
                finalFlags: e
            }), this.ni = !0), e
        }
        getFlagPayloads() {
            var t = this._instance.get_property(gn),
                i = this._instance.get_property(_n);
            if (!i) return t || {};
            for (var e = Ot({}, t || {}), r = Object.keys(i), s = 0; s < r.length; s++) e[r[s]] = i[r[s]];
            return this.ni || (cn.warn(" Overriding feature flag payloads!", {
                flagPayloads: t,
                overriddenPayloads: i,
                finalPayloads: e
            }), this.ni = !0), e
        }
        reloadFeatureFlags() {
            this.li || this._instance.config.advanced_disable_feature_flags || this.fi || (this.fi = setTimeout((() => {
                this.pi()
            }), 5))
        }
        gi() {
            clearTimeout(this.fi), this.fi = void 0
        }
        ensureFlagsLoaded() {
            this.oi || this.ai || this.fi || this.reloadFeatureFlags()
        }
        setAnonymousDistinctId(t) {
            this.$anon_distinct_id = t
        }
        setReloadingPaused(t) {
            this.li = t
        }
        pi(t) {
            var i;
            if (this.gi(), !this._instance.L())
                if (this.ai) this.ui = !0;
                else {
                    var e = {
                        token: this._instance.config.token,
                        distinct_id: this._instance.get_distinct_id(),
                        groups: this._instance.getGroups(),
                        $anon_distinct_id: this.$anon_distinct_id,
                        person_properties: g({}, (null == (i = this._instance.persistence) ? void 0 : i.get_initial_props()) || {}, this._instance.get_property(oi) || {}),
                        group_properties: this._instance.get_property(ai)
                    };
                    (null != t && t.disableFlags || this._instance.config.advanced_disable_feature_flags) && (e.disable_flags = !0), this.ci() && (e.evaluation_environments = this.di());
                    var r = this._instance.config.__preview_remote_config,
                        s = r ? "/flags/?v=2" : "/flags/?v=2&config=true",
                        n = this._instance.config.advanced_only_evaluate_survey_feature_flags ? "&only_evaluate_survey_feature_flags=true" : "",
                        o = this._instance.requestRouter.endpointFor("api", s + n);
                    r && (e.timezone = us()), this.ai = !0, this._instance.mi({
                        method: "POST",
                        url: o,
                        data: e,
                        compression: this._instance.config.disable_compression ? void 0 : ie.Base64,
                        timeout: this._instance.config.feature_flag_request_timeout_ms,
                        callback: t => {
                            var i, r, s = !0;
                            (200 === t.statusCode && (this.ui || (this.$anon_distinct_id = void 0), s = !1), this.ai = !1, this.hi) || (this.hi = !0, this._instance.yi(null !== (r = t.json) && void 0 !== r ? r : {}));
                            if (!e.disable_flags || this.ui)
                                if (this.vi = !s, t.json && null != (i = t.json.quotaLimited) && i.includes(wn.FeatureFlags)) cn.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.");
                                else {
                                    var n;
                                    if (!e.disable_flags) this.receivedFeatureFlags(null !== (n = t.json) && void 0 !== n ? n : {}, s);
                                    this.ui && (this.ui = !1, this.pi())
                                }
                        }
                    })
                }
        }
        getFeatureFlag(t, i) {
            if (void 0 === i && (i = {}), this.oi || this.getFlags() && this.getFlags().length > 0) {
                var e = this.getFlagVariants()[t],
                    r = "" + e,
                    s = this._instance.get_property(mn) || void 0,
                    n = this._instance.get_property(hi) || {};
                if ((i.send_event || !("send_event" in i)) && (!(t in n) || !n[t].includes(r))) {
                    var o, a, l, u, h, v, d, c, f;
                    P(n[t]) ? n[t].push(r) : n[t] = [r], null == (o = this._instance.persistence) || o.register({
                        [hi]: n
                    });
                    var p = this.getFeatureFlagDetails(t),
                        g = {
                            $feature_flag: t,
                            $feature_flag_response: e,
                            $feature_flag_payload: this.getFeatureFlagPayload(t) || null,
                            $feature_flag_request_id: s,
                            $feature_flag_bootstrapped_response: (null == (a = this._instance.config.bootstrap) || null == (a = a.featureFlags) ? void 0 : a[t]) || null,
                            $feature_flag_bootstrapped_payload: (null == (l = this._instance.config.bootstrap) || null == (l = l.featureFlagPayloads) ? void 0 : l[t]) || null,
                            $used_bootstrap_value: !this.vi
                        };
                    C(null == p || null == (u = p.metadata) ? void 0 : u.version) || (g.$feature_flag_version = p.metadata.version);
                    var _, m = null !== (h = null == p || null == (v = p.reason) ? void 0 : v.description) && void 0 !== h ? h : null == p || null == (d = p.reason) ? void 0 : d.code;
                    if (m && (g.$feature_flag_reason = m), null != p && null != (c = p.metadata) && c.id && (g.$feature_flag_id = p.metadata.id), C(null == p ? void 0 : p.original_variant) && C(null == p ? void 0 : p.original_enabled) || (g.$feature_flag_original_response = C(p.original_variant) ? p.original_enabled : p.original_variant), null != p && null != (f = p.metadata) && f.original_payload) g.$feature_flag_original_payload = null == p || null == (_ = p.metadata) ? void 0 : _.original_payload;
                    this._instance.capture("$feature_flag_called", g)
                }
                return e
            }
            cn.warn('getFeatureFlag for key "' + t + "\" failed. Feature flags didn't load in time.")
        }
        getFeatureFlagDetails(t) {
            return this.getFlagsWithDetails()[t]
        }
        getFeatureFlagPayload(t) {
            return this.getFlagPayloads()[t]
        }
        getRemoteConfigPayload(t, i) {
            var e = this._instance.config.token,
                r = {
                    distinct_id: this._instance.get_distinct_id(),
                    token: e
                };
            this.ci() && (r.evaluation_environments = this.di()), this._instance.mi({
                method: "POST",
                url: this._instance.requestRouter.endpointFor("api", "/flags/?v=2&config=true"),
                data: r,
                compression: this._instance.config.disable_compression ? void 0 : ie.Base64,
                timeout: this._instance.config.feature_flag_request_timeout_ms,
                callback: e => {
                    var r, s = null == (r = e.json) ? void 0 : r.featureFlagPayloads;
                    i((null == s ? void 0 : s[t]) || void 0)
                }
            })
        }
        isFeatureEnabled(t, i) {
            if (void 0 === i && (i = {}), this.oi || this.getFlags() && this.getFlags().length > 0) {
                var e = this.getFeatureFlag(t, i);
                return C(e) ? void 0 : !!e
            }
            cn.warn('isFeatureEnabled for key "' + t + "\" failed. Feature flags didn't load in time.")
        }
        addFeatureFlagsHandler(t) {
            this.featureFlagEventHandlers.push(t)
        }
        removeFeatureFlagsHandler(t) {
            this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((i => i !== t))
        }
        receivedFeatureFlags(t, i) {
            if (this._instance.persistence) {
                this.oi = !0;
                var e = this.getFlagVariants(),
                    r = this.getFlagPayloads(),
                    s = this.getFlagsWithDetails();
                ! function(t, i, e, r, s) {
                    void 0 === e && (e = {}), void 0 === r && (r = {}), void 0 === s && (s = {});
                    var n = bn(t),
                        o = n.flags,
                        a = n.featureFlags,
                        l = n.featureFlagPayloads;
                    if (a) {
                        var u = t.requestId;
                        if (P(a)) {
                            cn.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
                            var h = {};
                            if (a)
                                for (var v = 0; v < a.length; v++) h[a[v]] = !0;
                            i && i.register({
                                [fn]: a,
                                [ri]: h
                            })
                        } else {
                            var d = a,
                                c = l,
                                f = o;
                            t.errorsWhileComputingFlags && (d = g({}, e, d), c = g({}, r, c), f = g({}, s, f)), i && i.register(g({
                                [fn]: Object.keys(yn(d)),
                                [ri]: d || {},
                                [gn]: c || {},
                                [ni]: f || {}
                            }, u ? {
                                [mn]: u
                            } : {}))
                        }
                    }
                }(t, this._instance.persistence, e, r, s), this.bi(i)
            }
        }
        override(t, i) {
            void 0 === i && (i = !1), cn.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({
                flags: t,
                suppressWarning: i
            })
        }
        overrideFeatureFlags(t) {
            if (!this._instance.__loaded || !this._instance.persistence) return cn.uninitializedWarning("posthog.featureFlags.overrideFeatureFlags");
            if (!1 === t) return this._instance.persistence.unregister(pn), this._instance.persistence.unregister(_n), void this.bi();
            if (t && "object" == typeof t && ("flags" in t || "payloads" in t)) {
                var i, e = t;
                if (this.ni = Boolean(null !== (i = e.suppressWarning) && void 0 !== i && i), "flags" in e)
                    if (!1 === e.flags) this._instance.persistence.unregister(pn);
                    else if (e.flags)
                    if (P(e.flags)) {
                        for (var r = {}, s = 0; s < e.flags.length; s++) r[e.flags[s]] = !0;
                        this._instance.persistence.register({
                            [pn]: r
                        })
                    } else this._instance.persistence.register({
                        [pn]: e.flags
                    });
                return "payloads" in e && (!1 === e.payloads ? this._instance.persistence.unregister(_n) : e.payloads && this._instance.persistence.register({
                    [_n]: e.payloads
                })), void this.bi()
            }
            this.bi()
        }
        onFeatureFlags(t) {
            if (this.addFeatureFlagsHandler(t), this.oi) {
                var {
                    flags: i,
                    flagVariants: e
                } = this.wi();
                t(i, e)
            }
            return () => this.removeFeatureFlagsHandler(t)
        }
        updateEarlyAccessFeatureEnrollment(t, i, e) {
            var r, s = (this._instance.get_property(si) || []).find((i => i.flagKey === t)),
                n = {
                    ["$feature_enrollment/" + t]: i
                },
                o = {
                    $feature_flag: t,
                    $feature_enrollment: i,
                    $set: n
                };
            s && (o.$early_access_feature_name = s.name), e && (o.$feature_enrollment_stage = e), this._instance.capture("$feature_enrollment_update", o), this.setPersonPropertiesForFlags(n, !1);
            var a = g({}, this.getFlagVariants(), {
                [t]: i
            });
            null == (r = this._instance.persistence) || r.register({
                [fn]: Object.keys(yn(a)),
                [ri]: a
            }), this.bi()
        }
        getEarlyAccessFeatures(t, i, e) {
            void 0 === i && (i = !1);
            var r = this._instance.get_property(si),
                s = e ? "&" + e.map((t => "stage=" + t)).join("&") : "";
            if (r && !i) return t(r);
            this._instance.mi({
                url: this._instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=" + this._instance.config.token + s),
                method: "GET",
                callback: i => {
                    var e, r;
                    if (i.json) {
                        var s = i.json.earlyAccessFeatures;
                        return null == (e = this._instance.persistence) || e.unregister(si), null == (r = this._instance.persistence) || r.register({
                            [si]: s
                        }), t(s)
                    }
                }
            })
        }
        wi() {
            var t = this.getFlags(),
                i = this.getFlagVariants();
            return {
                flags: t.filter((t => i[t])),
                flagVariants: Object.keys(i).filter((t => i[t])).reduce(((t, e) => (t[e] = i[e], t)), {})
            }
        }
        bi(t) {
            var {
                flags: i,
                flagVariants: e
            } = this.wi();
            this.featureFlagEventHandlers.forEach((r => r(i, e, {
                errorsLoading: t
            })))
        }
        setPersonPropertiesForFlags(t, i) {
            void 0 === i && (i = !0);
            var e = this._instance.get_property(oi) || {};
            this._instance.register({
                [oi]: g({}, e, t)
            }), i && this._instance.reloadFeatureFlags()
        }
        resetPersonPropertiesForFlags() {
            this._instance.unregister(oi)
        }
        setGroupPropertiesForFlags(t, i) {
            void 0 === i && (i = !0);
            var e = this._instance.get_property(ai) || {};
            0 !== Object.keys(e).length && Object.keys(e).forEach((i => {
                e[i] = g({}, e[i], t[i]), delete t[i]
            })), this._instance.register({
                [ai]: g({}, e, t)
            }), i && this._instance.reloadFeatureFlags()
        }
        resetGroupPropertiesForFlags(t) {
            if (t) {
                var i = this._instance.get_property(ai) || {};
                this._instance.register({
                    [ai]: g({}, i, {
                        [t]: {}
                    })
                })
            } else this._instance.unregister(ai)
        }
        reset() {
            this.oi = !1, this.ai = !1, this.li = !1, this.ui = !1, this.hi = !1, this.vi = !1, this.$anon_distinct_id = void 0, this.gi(), this.ni = !1
        }
    }
    var xn = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
    class En {
        constructor(t, i) {
            this.A = t, this.props = {}, this.Si = !1, this.xi = (t => {
                var i = "";
                return t.token && (i = t.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), t.persistence_name ? "ph_" + t.persistence_name : "ph_" + i + "_posthog"
            })(t), this.it = this.Ei(t), this.load(), t.debug && $t.info("Persistence loaded", t.persistence, g({}, this.props)), this.update_config(t, t, i), this.save()
        }
        isDisabled() {
            return !!this.$i
        }
        Ei(t) {
            -1 === xn.indexOf(t.persistence.toLowerCase()) && ($t.critical("Unknown persistence type " + t.persistence + "; falling back to localStorage+cookie"), t.persistence = "localStorage+cookie");
            var i = t.persistence.toLowerCase();
            return "localstorage" === i && ke.G() ? ke : "localstorage+cookie" === i && Te.G() ? Te : "sessionstorage" === i && Oe.G() ? Oe : "memory" === i ? Re : "cookie" === i ? Ee : Te.G() ? Te : Ee
        }
        properties() {
            var t = {};
            return Ct(this.props, (function(i, e) {
                if (e === ri && I(i))
                    for (var r = Object.keys(i), n = 0; n < r.length; n++) t["$feature/" + r[n]] = i[r[n]];
                else a = e, l = !1, (M(o = bi) ? l : s && o.indexOf === s ? -1 != o.indexOf(a) : (Ct(o, (function(t) {
                    if (l || (l = t === a)) return It
                })), l)) || (t[e] = i);
                var o, a, l
            })), t
        }
        load() {
            if (!this.$i) {
                var t = this.it.K(this.xi);
                t && (this.props = Ot({}, t))
            }
        }
        save() {
            this.$i || this.it.Y(this.xi, this.props, this.ki, this.Pi, this.Ti, this.A.debug)
        }
        remove() {
            this.it.X(this.xi, !1), this.it.X(this.xi, !0)
        }
        clear() {
            this.remove(), this.props = {}
        }
        register_once(t, i, e) {
            if (I(t)) {
                C(i) && (i = "None"), this.ki = C(e) ? this.Ii : e;
                var r = !1;
                if (Ct(t, ((t, e) => {
                        this.props.hasOwnProperty(e) && this.props[e] !== i || (this.props[e] = t, r = !0)
                    })), r) return this.save(), !0
            }
            return !1
        }
        register(t, i) {
            if (I(t)) {
                this.ki = C(i) ? this.Ii : i;
                var e = !1;
                if (Ct(t, ((i, r) => {
                        t.hasOwnProperty(r) && this.props[r] !== i && (this.props[r] = i, e = !0)
                    })), e) return this.save(), !0
            }
            return !1
        }
        unregister(t) {
            t in this.props && (delete this.props[t], this.save())
        }
        update_campaign_params() {
            if (!this.Si) {
                var t = es(this.A.custom_campaign_params, this.A.mask_personal_data_properties, this.A.custom_personal_data_properties);
                R(Dt(t)) || this.register(t), this.Si = !0
            }
        }
        update_search_keyword() {
            var t;
            this.register((t = null == o ? void 0 : o.referrer) ? ss(t) : {})
        }
        update_referrer_info() {
            var t;
            this.register_once({
                $referrer: os(),
                $referring_domain: null != o && o.referrer && (null == (t = ee(o.referrer)) ? void 0 : t.host) || "$direct"
            }, void 0)
        }
        set_initial_person_info() {
            this.props[fi] || this.props[pi] || this.register_once({
                [gi]: as(this.A.mask_personal_data_properties, this.A.custom_personal_data_properties)
            }, void 0)
        }
        get_initial_props() {
            var t = {};
            Ct([pi, fi], (i => {
                var e = this.props[i];
                e && Ct(e, (function(i, e) {
                    t["$initial_" + w(e)] = i
                }))
            }));
            var i, e, r = this.props[gi];
            if (r) {
                var s = (i = ls(r), e = {}, Ct(i, (function(t, i) {
                    e["$initial_" + w(i)] = t
                })), e);
                Ot(t, s)
            }
            return t
        }
        safe_merge(t) {
            return Ct(this.props, (function(i, e) {
                e in t || (t[e] = i)
            })), t
        }
        update_config(t, i, e) {
            if (this.Ii = this.ki = t.cookie_expiration, this.set_disabled(t.disable_persistence || !!e), this.set_cross_subdomain(t.cross_subdomain_cookie), this.set_secure(t.secure_cookie), t.persistence !== i.persistence) {
                var r = this.Ei(t),
                    s = this.props;
                this.clear(), this.it = r, this.props = s, this.save()
            }
        }
        set_disabled(t) {
            this.$i = t, this.$i ? this.remove() : this.save()
        }
        set_cross_subdomain(t) {
            t !== this.Pi && (this.Pi = t, this.remove(), this.save())
        }
        set_secure(t) {
            t !== this.Ti && (this.Ti = t, this.remove(), this.save())
        }
        set_event_timer(t, i) {
            var e = this.props[Wt] || {};
            e[t] = i, this.props[Wt] = e, this.save()
        }
        remove_event_timer(t) {
            var i = (this.props[Wt] || {})[t];
            return C(i) || (delete this.props[Wt][t], this.save()), i
        }
        get_property(t) {
            return this.props[t]
        }
        set_property(t, i) {
            this.props[t] = i, this.save()
        }
    }
    var $n = function(t) {
            return t.Popover = "popover", t.API = "api", t.Widget = "widget", t.ExternalSurvey = "external_survey", t
        }({}),
        kn = function(t) {
            return t.SHOWN = "survey shown", t.DISMISSED = "survey dismissed", t.SENT = "survey sent", t
        }({}),
        Pn = function(t) {
            return t.SURVEY_ID = "$survey_id", t.SURVEY_NAME = "$survey_name", t.SURVEY_RESPONSE = "$survey_response", t.SURVEY_ITERATION = "$survey_iteration", t.SURVEY_ITERATION_START_DATE = "$survey_iteration_start_date", t.SURVEY_PARTIALLY_COMPLETED = "$survey_partially_completed", t.SURVEY_SUBMISSION_ID = "$survey_submission_id", t.SURVEY_QUESTIONS = "$survey_questions", t.SURVEY_COMPLETED = "$survey_completed", t
        }({}),
        Tn = function(t) {
            return t.Popover = "popover", t.Inline = "inline", t
        }({});
    class In {
        constructor() {
            this.Ri = {}, this.Ri = {}
        }
        on(t, i) {
            return this.Ri[t] || (this.Ri[t] = []), this.Ri[t].push(i), () => {
                this.Ri[t] = this.Ri[t].filter((t => t !== i))
            }
        }
        emit(t, i) {
            for (var e of this.Ri[t] || []) e(i);
            for (var r of this.Ri["*"] || []) r(t, i)
        }
    }
    class Rn {
        constructor(t) {
            this.Ci = new In, this.Oi = (t, i) => this.Fi(t, i) && this.Mi(t, i) && this.Ai(t, i), this.Fi = (t, i) => null == i || !i.event || (null == t ? void 0 : t.event) === (null == i ? void 0 : i.event), this._instance = t, this.ji = new Set, this.Di = new Set
        }
        init() {
            var t;
            if (!C(null == (t = this._instance) ? void 0 : t.Li)) {
                var i;
                null == (i = this._instance) || i.Li(((t, i) => {
                    this.on(t, i)
                }))
            }
        }
        register(t) {
            var i, e;
            if (!C(null == (i = this._instance) ? void 0 : i.Li) && (t.forEach((t => {
                    var i, e;
                    null == (i = this.Di) || i.add(t), null == (e = t.steps) || e.forEach((t => {
                        var i;
                        null == (i = this.ji) || i.add((null == t ? void 0 : t.event) || "")
                    }))
                })), null != (e = this._instance) && e.autocapture)) {
                var r, s = new Set;
                t.forEach((t => {
                    var i;
                    null == (i = t.steps) || i.forEach((t => {
                        null != t && t.selector && s.add(null == t ? void 0 : t.selector)
                    }))
                })), null == (r = this._instance) || r.autocapture.setElementSelectors(s)
            }
        }
        on(t, i) {
            var e;
            null != i && 0 != t.length && (this.ji.has(t) || this.ji.has(null == i ? void 0 : i.event)) && this.Di && (null == (e = this.Di) ? void 0 : e.size) > 0 && this.Di.forEach((t => {
                this.Ni(i, t) && this.Ci.emit("actionCaptured", t.name)
            }))
        }
        Ui(t) {
            this.onAction("actionCaptured", (i => t(i)))
        }
        Ni(t, i) {
            if (null == (null == i ? void 0 : i.steps)) return !1;
            for (var e of i.steps)
                if (this.Oi(t, e)) return !0;
            return !1
        }
        onAction(t, i) {
            return this.Ci.on(t, i)
        }
        Mi(t, i) {
            if (null != i && i.url) {
                var e, r = null == t || null == (e = t.properties) ? void 0 : e.$current_url;
                if (!r || "string" != typeof r) return !1;
                if (!Rn.zi(r, null == i ? void 0 : i.url, (null == i ? void 0 : i.url_matching) || "contains")) return !1
            }
            return !0
        }
        static zi(i, e, r) {
            switch (r) {
                case "regex":
                    return !!t && an(i, e);
                case "exact":
                    return e === i;
                case "contains":
                    var s = Rn.Hi(e).replace(/_/g, ".").replace(/%/g, ".*");
                    return an(i, s);
                default:
                    return !1
            }
        }
        static Hi(t) {
            return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
        }
        Ai(t, i) {
            if ((null != i && i.href || null != i && i.tag_name || null != i && i.text) && !this.Bi(t).some((t => !(null != i && i.href && !Rn.zi(t.href || "", null == i ? void 0 : i.href, (null == i ? void 0 : i.href_matching) || "exact")) && ((null == i || !i.tag_name || t.tag_name === (null == i ? void 0 : i.tag_name)) && !(null != i && i.text && !Rn.zi(t.text || "", null == i ? void 0 : i.text, (null == i ? void 0 : i.text_matching) || "exact") && !Rn.zi(t.$el_text || "", null == i ? void 0 : i.text, (null == i ? void 0 : i.text_matching) || "exact")))))) return !1;
            if (null != i && i.selector) {
                var e, r = null == t || null == (e = t.properties) ? void 0 : e.$element_selectors;
                if (!r) return !1;
                if (!r.includes(null == i ? void 0 : i.selector)) return !1
            }
            return !0
        }
        Bi(t) {
            return null == (null == t ? void 0 : t.properties.$elements) ? [] : null == t ? void 0 : t.properties.$elements
        }
    }
    var Cn = kt("[Surveys]");
    var On = "seenSurvey_",
        Fn = (t, i) => {
            var e = "$survey_" + i + "/" + t.id;
            return t.current_iteration && t.current_iteration > 0 && (e = "$survey_" + i + "/" + t.id + "/" + t.current_iteration), e
        },
        Mn = t => {
            var i = "" + On + t.id;
            return t.current_iteration && t.current_iteration > 0 && (i = "" + On + t.id + "_" + t.current_iteration), i
        },
        An = [$n.Popover, $n.Widget, $n.API],
        jn = {
            ignoreConditions: !1,
            ignoreDelay: !1,
            displayType: Tn.Popover
        };
    class Dn {
        constructor(t) {
            this._instance = t, this.qi = new Map, this.Wi = new Map
        }
        register(t) {
            var i;
            C(null == (i = this._instance) ? void 0 : i.Li) || (this.Gi(t), this.Vi(t))
        }
        Vi(t) {
            var i = t.filter((t => {
                var i, e;
                return (null == (i = t.conditions) ? void 0 : i.actions) && (null == (e = t.conditions) || null == (e = e.actions) || null == (e = e.values) ? void 0 : e.length) > 0
            }));
            if (0 !== i.length) {
                if (null == this.Ji) {
                    this.Ji = new Rn(this._instance), this.Ji.init();
                    this.Ji.Ui((t => {
                        this.onAction(t)
                    }))
                }
                i.forEach((t => {
                    var i, e, r, s, n;
                    t.conditions && null != (i = t.conditions) && i.actions && null != (e = t.conditions) && null != (e = e.actions) && e.values && (null == (r = t.conditions) || null == (r = r.actions) || null == (r = r.values) ? void 0 : r.length) > 0 && (null == (s = this.Ji) || s.register(t.conditions.actions.values), null == (n = t.conditions) || null == (n = n.actions) || null == (n = n.values) || n.forEach((i => {
                        if (i && i.name) {
                            var e = this.Wi.get(i.name);
                            e && e.push(t.id), this.Wi.set(i.name, e || [t.id])
                        }
                    })))
                }))
            }
        }
        Gi(t) {
            var i;
            if (0 !== t.filter((t => {
                    var i, e;
                    return (null == (i = t.conditions) ? void 0 : i.events) && (null == (e = t.conditions) || null == (e = e.events) || null == (e = e.values) ? void 0 : e.length) > 0
                })).length) {
                null == (i = this._instance) || i.Li(((t, i) => {
                    this.onEvent(t, i)
                })), t.forEach((t => {
                    var i;
                    null == (i = t.conditions) || null == (i = i.events) || null == (i = i.values) || i.forEach((i => {
                        if (i && i.name) {
                            var e = this.qi.get(i.name);
                            e && e.push(t.id), this.qi.set(i.name, e || [t.id])
                        }
                    }))
                }))
            }
        }
        onEvent(t, i) {
            var e, r, s = (null == (e = this._instance) || null == (e = e.persistence) ? void 0 : e.props[ui]) || [];
            if (kn.SHOWN === t && i && s.length > 0) {
                var n;
                Cn.info("survey event matched, removing survey from activated surveys", {
                    event: t,
                    eventPayload: i,
                    existingActivatedSurveys: s
                });
                var o = null == i || null == (n = i.properties) ? void 0 : n.$survey_id;
                if (o) {
                    var a = s.indexOf(o);
                    a >= 0 && (s.splice(a, 1), this.Ki(s))
                }
            } else if (this.qi.has(t)) {
                Cn.info("survey event name matched", {
                    event: t,
                    eventPayload: i,
                    surveys: this.qi.get(t)
                });
                var l = [];
                null == (r = this._instance) || r.getSurveys((i => {
                    l = i.filter((i => {
                        var e;
                        return null == (e = this.qi.get(t)) ? void 0 : e.includes(i.id)
                    }))
                }));
                var u = l.filter((e => {
                    var r, s = null == (r = e.conditions) || null == (r = r.events) || null == (r = r.values) ? void 0 : r.find((i => i.name === t));
                    return !!s && (!s.propertyFilters || Object.entries(s.propertyFilters).every((t => {
                        var e, [r, s] = t,
                            n = null == i || null == (e = i.properties) ? void 0 : e[r];
                        if (C(n) || M(n)) return !1;
                        var o = [String(n)],
                            a = un[s.operator];
                        return a ? a(s.values, o) : (Cn.warn("Unknown property comparison operator: " + s.operator), !1)
                    })))
                }));
                this.Ki(s.concat(u.map((t => t.id)) || []))
            }
        }
        onAction(t) {
            var i, e = (null == (i = this._instance) || null == (i = i.persistence) ? void 0 : i.props[ui]) || [];
            this.Wi.has(t) && this.Ki(e.concat(this.Wi.get(t) || []))
        }
        Ki(t) {
            var i;
            Cn.info("updating activated surveys", {
                activatedSurveys: t
            }), null == (i = this._instance) || null == (i = i.persistence) || i.register({
                [ui]: [...new Set(t)]
            })
        }
        getSurveys() {
            var t, i = null == (t = this._instance) || null == (t = t.persistence) ? void 0 : t.props[ui];
            return i || []
        }
        getEventToSurveys() {
            return this.qi
        }
        Yi() {
            return this.Ji
        }
    }
    class Ln {
        constructor(t) {
            this.Xi = void 0, this._surveyManager = null, this.Qi = !1, this.Zi = !1, this.te = [], this._instance = t, this._surveyEventReceiver = null
        }
        onRemoteConfig(t) {
            if (!this._instance.config.disable_surveys) {
                var i = t.surveys;
                if (A(i)) return Cn.warn("Flags not loaded yet. Not loading surveys.");
                var e = P(i);
                this.Xi = e ? i.length > 0 : i, Cn.info("flags response received, isSurveysEnabled: " + this.Xi), this.loadIfEnabled()
            }
        }
        reset() {
            localStorage.removeItem("lastSeenSurveyDate");
            for (var t = [], i = 0; i < localStorage.length; i++) {
                var e = localStorage.key(i);
                (null != e && e.startsWith(On) || null != e && e.startsWith("inProgressSurvey_")) && t.push(e)
            }
            t.forEach((t => localStorage.removeItem(t)))
        }
        loadIfEnabled() {
            if (!this._surveyManager)
                if (this.Zi) Cn.info("Already initializing surveys, skipping...");
                else if (this._instance.config.disable_surveys) Cn.info("Disabled. Not loading surveys.");
            else if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) Cn.info("Not loading surveys in cookieless mode without consent.");
            else {
                var t = null == d ? void 0 : d.__PosthogExtensions__;
                if (t) {
                    if (!C(this.Xi) || this._instance.config.advanced_enable_surveys) {
                        var i = this.Xi || this._instance.config.advanced_enable_surveys;
                        this.Zi = !0;
                        try {
                            var e = t.generateSurveys;
                            if (e) return void this.ie(e, i);
                            var r = t.loadExternalDependency;
                            if (!r) return void this.ee("PostHog loadExternalDependency extension not found.");
                            r(this._instance, "surveys", (e => {
                                e || !t.generateSurveys ? this.ee("Could not load surveys script", e) : this.ie(t.generateSurveys, i)
                            }))
                        } catch (t) {
                            throw this.ee("Error initializing surveys", t), t
                        } finally {
                            this.Zi = !1
                        }
                    }
                } else Cn.error("PostHog Extensions not found.")
            }
        }
        ie(t, i) {
            this._surveyManager = t(this._instance, i), this._surveyEventReceiver = new Dn(this._instance), Cn.info("Surveys loaded successfully"), this.re({
                isLoaded: !0
            })
        }
        ee(t, i) {
            Cn.error(t, i), this.re({
                isLoaded: !1,
                error: t
            })
        }
        onSurveysLoaded(t) {
            return this.te.push(t), this._surveyManager && this.re({
                isLoaded: !0
            }), () => {
                this.te = this.te.filter((i => i !== t))
            }
        }
        getSurveys(t, i) {
            if (void 0 === i && (i = !1), this._instance.config.disable_surveys) return Cn.info("Disabled. Not loading surveys."), t([]);
            var e = this._instance.get_property(li);
            if (e && !i) return t(e, {
                isLoaded: !0
            });
            if (this.Qi) return t([], {
                isLoaded: !1,
                error: "Surveys are already being loaded"
            });
            try {
                this.Qi = !0, this._instance.mi({
                    url: this._instance.requestRouter.endpointFor("api", "/api/surveys/?token=" + this._instance.config.token),
                    method: "GET",
                    timeout: this._instance.config.surveys_request_timeout_ms,
                    callback: i => {
                        var e;
                        this.Qi = !1;
                        var r = i.statusCode;
                        if (200 !== r || !i.json) {
                            var s = "Surveys API could not be loaded, status: " + r;
                            return Cn.error(s), t([], {
                                isLoaded: !1,
                                error: s
                            })
                        }
                        var n, o = i.json.surveys || [],
                            a = o.filter((t => function(t) {
                                return !(!t.start_date || t.end_date)
                            }(t) && (function(t) {
                                var i;
                                return !(null == (i = t.conditions) || null == (i = i.events) || null == (i = i.values) || !i.length)
                            }(t) || function(t) {
                                var i;
                                return !(null == (i = t.conditions) || null == (i = i.actions) || null == (i = i.values) || !i.length)
                            }(t))));
                        a.length > 0 && (null == (n = this._surveyEventReceiver) || n.register(a));
                        return null == (e = this._instance.persistence) || e.register({
                            [li]: o
                        }), t(o, {
                            isLoaded: !0
                        })
                    }
                })
            } catch (t) {
                throw this.Qi = !1, t
            }
        }
        re(t) {
            for (var i of this.te) try {
                if (!t.isLoaded) return i([], t);
                this.getSurveys(i)
            } catch (t) {
                Cn.error("Error in survey callback", t)
            }
        }
        getActiveMatchingSurveys(t, i) {
            if (void 0 === i && (i = !1), !A(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(t, i);
            Cn.warn("init was not called")
        }
        se(t) {
            var i = null;
            return this.getSurveys((e => {
                var r;
                i = null !== (r = e.find((i => i.id === t))) && void 0 !== r ? r : null
            })), i
        }
        ne(t) {
            if (A(this._surveyManager)) return {
                eligible: !1,
                reason: "SDK is not enabled or survey functionality is not yet loaded"
            };
            var i = "string" == typeof t ? this.se(t) : t;
            return i ? this._surveyManager.checkSurveyEligibility(i) : {
                eligible: !1,
                reason: "Survey not found"
            }
        }
        canRenderSurvey(t) {
            if (A(this._surveyManager)) return Cn.warn("init was not called"), {
                visible: !1,
                disabledReason: "SDK is not enabled or survey functionality is not yet loaded"
            };
            var i = this.ne(t);
            return {
                visible: i.eligible,
                disabledReason: i.reason
            }
        }
        canRenderSurveyAsync(t, i) {
            return A(this._surveyManager) ? (Cn.warn("init was not called"), Promise.resolve({
                visible: !1,
                disabledReason: "SDK is not enabled or survey functionality is not yet loaded"
            })) : new Promise((e => {
                this.getSurveys((i => {
                    var r, s = null !== (r = i.find((i => i.id === t))) && void 0 !== r ? r : null;
                    if (s) {
                        var n = this.ne(s);
                        e({
                            visible: n.eligible,
                            disabledReason: n.reason
                        })
                    } else e({
                        visible: !1,
                        disabledReason: "Survey not found"
                    })
                }), i)
            }))
        }
        renderSurvey(t, i) {
            var e;
            if (A(this._surveyManager)) Cn.warn("init was not called");
            else {
                var r = "string" == typeof t ? this.se(t) : t;
                if (null != r && r.id)
                    if (An.includes(r.type)) {
                        var s = null == o ? void 0 : o.querySelector(i);
                        if (s) return null != (e = r.appearance) && e.surveyPopupDelaySeconds ? (Cn.info("Rendering survey " + r.id + " with delay of " + r.appearance.surveyPopupDelaySeconds + " seconds"), void setTimeout((() => {
                            var t, i;
                            Cn.info("Rendering survey " + r.id + " with delay of " + (null == (t = r.appearance) ? void 0 : t.surveyPopupDelaySeconds) + " seconds"), null == (i = this._surveyManager) || i.renderSurvey(r, s), Cn.info("Survey " + r.id + " rendered")
                        }), 1e3 * r.appearance.surveyPopupDelaySeconds)) : void this._surveyManager.renderSurvey(r, s);
                        Cn.warn("Survey element not found")
                    } else Cn.warn("Surveys of type " + r.type + " cannot be rendered in the app");
                else Cn.warn("Survey not found")
            }
        }
        displaySurvey(t, i) {
            var e;
            if (A(this._surveyManager)) Cn.warn("init was not called");
            else {
                var r = this.se(t);
                if (r) {
                    var s = r;
                    if (null != (e = r.appearance) && e.surveyPopupDelaySeconds && i.ignoreDelay && (s = g({}, r, {
                            appearance: g({}, r.appearance, {
                                surveyPopupDelaySeconds: 0
                            })
                        })), !1 === i.ignoreConditions) {
                        var n = this.canRenderSurvey(r);
                        if (!n.visible) return void Cn.warn("Survey is not eligible to be displayed: ", n.disabledReason)
                    }
                    i.displayType !== Tn.Inline ? this._surveyManager.handlePopoverSurvey(s) : this.renderSurvey(s, i.selector)
                } else Cn.warn("Survey not found")
            }
        }
    }
    var Nn = kt("[RateLimiter]");
    class Un {
        constructor(t) {
            var i, e;
            this.serverLimits = {}, this.lastEventRateLimited = !1, this.checkForLimiting = t => {
                var i = t.text;
                if (i && i.length) try {
                    (JSON.parse(i).quota_limited || []).forEach((t => {
                        Nn.info((t || "events") + " is quota limited."), this.serverLimits[t] = (new Date).getTime() + 6e4
                    }))
                } catch (t) {
                    return void Nn.warn('could not rate limit - continuing. Error: "' + (null == t ? void 0 : t.message) + '"', {
                        text: i
                    })
                }
            }, this.instance = t, this.captureEventsPerSecond = (null == (i = t.config.rate_limiting) ? void 0 : i.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null == (e = t.config.rate_limiting) ? void 0 : e.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(!0).isRateLimited
        }
        clientRateLimitContext(t) {
            var i, e, r;
            void 0 === t && (t = !1);
            var s = (new Date).getTime(),
                n = null !== (i = null == (e = this.instance.persistence) ? void 0 : e.get_property(ci)) && void 0 !== i ? i : {
                    tokens: this.captureEventsBurstLimit,
                    last: s
                };
            n.tokens += (s - n.last) / 1e3 * this.captureEventsPerSecond, n.last = s, n.tokens > this.captureEventsBurstLimit && (n.tokens = this.captureEventsBurstLimit);
            var o = n.tokens < 1;
            return o || t || (n.tokens = Math.max(0, n.tokens - 1)), !o || this.lastEventRateLimited || t || this.instance.capture("$$client_ingestion_warning", {
                $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to " + this.captureEventsPerSecond + " events per second and " + this.captureEventsBurstLimit + " events burst limit."
            }, {
                skip_client_rate_limiting: !0
            }), this.lastEventRateLimited = o, null == (r = this.instance.persistence) || r.set_property(ci, n), {
                isRateLimited: o,
                remainingTokens: n.tokens
            }
        }
        isServerRateLimited(t) {
            var i = this.serverLimits[t || "events"] || !1;
            return !1 !== i && (new Date).getTime() < i
        }
    }
    var zn = kt("[RemoteConfig]");
    class Hn {
        constructor(t) {
            this._instance = t
        }
        get remoteConfig() {
            var t;
            return null == (t = d._POSTHOG_REMOTE_CONFIG) || null == (t = t[this._instance.config.token]) ? void 0 : t.config
        }
        oe(t) {
            var i, e;
            null != (i = d.__PosthogExtensions__) && i.loadExternalDependency ? null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this._instance, "remote-config", (() => t(this.remoteConfig))) : (zn.error("PostHog Extensions not found. Cannot load remote config."), t())
        }
        ae(t) {
            this._instance.mi({
                method: "GET",
                url: this._instance.requestRouter.endpointFor("assets", "/array/" + this._instance.config.token + "/config"),
                callback: i => {
                    t(i.json)
                }
            })
        }
        load() {
            try {
                if (this.remoteConfig) return zn.info("Using preloaded remote config", this.remoteConfig), void this.yi(this.remoteConfig);
                if (this._instance.L()) return void zn.warn("Remote config is disabled. Falling back to local config.");
                this.oe((t => {
                    if (!t) return zn.info("No config found after loading remote JS config. Falling back to JSON."), void this.ae((t => {
                        this.yi(t)
                    }));
                    this.yi(t)
                }))
            } catch (t) {
                zn.error("Error loading remote config", t)
            }
        }
        yi(t) {
            t ? this._instance.config.__preview_remote_config ? (this._instance.yi(t), !1 !== t.hasFeatureFlags && this._instance.featureFlags.ensureFlagsLoaded()) : zn.info("__preview_remote_config is disabled. Logging config instead", t) : zn.error("Failed to fetch remote config from PostHog.")
        }
    }
    var Bn = 3e3;
    class qn {
        constructor(t, i) {
            this.le = !0, this.ue = [], this.he = G((null == i ? void 0 : i.flush_interval_ms) || Bn, 250, 5e3, $t.createLogger("flush interval"), Bn), this.ve = t
        }
        enqueue(t) {
            this.ue.push(t), this.de || this.ce()
        }
        unload() {
            this.fe();
            var t = this.ue.length > 0 ? this.pe() : {},
                i = Object.values(t);
            [...i.filter((t => 0 === t.url.indexOf("/e"))), ...i.filter((t => 0 !== t.url.indexOf("/e")))].map((t => {
                this.ve(g({}, t, {
                    transport: "sendBeacon"
                }))
            }))
        }
        enable() {
            this.le = !1, this.ce()
        }
        ce() {
            var t = this;
            this.le || (this.de = setTimeout((() => {
                if (this.fe(), this.ue.length > 0) {
                    var i = this.pe(),
                        e = function() {
                            var e = i[r],
                                s = (new Date).getTime();
                            e.data && P(e.data) && Ct(e.data, (t => {
                                t.offset = Math.abs(t.timestamp - s), delete t.timestamp
                            })), t.ve(e)
                        };
                    for (var r in i) e()
                }
            }), this.he))
        }
        fe() {
            clearTimeout(this.de), this.de = void 0
        }
        pe() {
            var t = {};
            return Ct(this.ue, (i => {
                var e, r = i,
                    s = (r ? r.batchKey : null) || r.url;
                C(t[s]) && (t[s] = g({}, r, {
                    data: []
                })), null == (e = t[s].data) || e.push(r.data)
            })), this.ue = [], t
        }
    }
    var Wn = ["retriesPerformedSoFar"];
    class Gn {
        constructor(i) {
            this.ge = !1, this._e = 3e3, this.ue = [], this._instance = i, this.ue = [], this.me = !0, !C(t) && "onLine" in t.navigator && (this.me = t.navigator.onLine, this.ye = () => {
                this.me = !0, this.Ut()
            }, this.be = () => {
                this.me = !1
            }, Ht(t, "online", this.ye), Ht(t, "offline", this.be))
        }
        get length() {
            return this.ue.length
        }
        retriableRequest(t) {
            var {
                retriesPerformedSoFar: i
            } = t, e = _(t, Wn);
            j(i) && i > 0 && (e.url = rn(e.url, {
                retry_count: i
            })), this._instance.mi(g({}, e, {
                callback: t => {
                    200 !== t.statusCode && (t.statusCode < 400 || t.statusCode >= 500) && (null != i ? i : 0) < 10 ? this.we(g({
                        retriesPerformedSoFar: i
                    }, e)) : null == e.callback || e.callback(t)
                }
            }))
        }
        we(t) {
            var i = t.retriesPerformedSoFar || 0;
            t.retriesPerformedSoFar = i + 1;
            var e = function(t) {
                    var i = 3e3 * Math.pow(2, t),
                        e = i / 2,
                        r = Math.min(18e5, i),
                        s = (Math.random() - .5) * (r - e);
                    return Math.ceil(r + s)
                }(i),
                r = Date.now() + e;
            this.ue.push({
                retryAt: r,
                requestOptions: t
            });
            var s = "Enqueued failed request for retry in " + e;
            navigator.onLine || (s += " (Browser is offline)"), $t.warn(s), this.ge || (this.ge = !0, this.Se())
        }
        Se() {
            if (this.xe && clearTimeout(this.xe), 0 === this.ue.length) return this.ge = !1, void(this.xe = void 0);
            this.xe = setTimeout((() => {
                this.me && this.ue.length > 0 && this.Ut(), this.Se()
            }), this._e)
        }
        Ut() {
            var t = Date.now(),
                i = [],
                e = this.ue.filter((e => e.retryAt < t || (i.push(e), !1)));
            if (this.ue = i, e.length > 0)
                for (var {
                        requestOptions: r
                    } of e) this.retriableRequest(r)
        }
        unload() {
            for (var {
                    requestOptions: i
                } of (this.xe && (clearTimeout(this.xe), this.xe = void 0), this.ge = !1, C(t) || (this.ye && (t.removeEventListener("online", this.ye), this.ye = void 0), this.be && (t.removeEventListener("offline", this.be), this.be = void 0)), this.ue)) try {
                this._instance.mi(g({}, i, {
                    transport: "sendBeacon"
                }))
            } catch (t) {
                $t.error(t)
            }
            this.ue = []
        }
    }
    class Vn {
        constructor(t) {
            this.Ee = () => {
                var t, i, e, r;
                this.$e || (this.$e = {});
                var s = this.scrollElement(),
                    n = this.scrollY(),
                    o = s ? Math.max(0, s.scrollHeight - s.clientHeight) : 0,
                    a = n + ((null == s ? void 0 : s.clientHeight) || 0),
                    l = (null == s ? void 0 : s.scrollHeight) || 0;
                this.$e.lastScrollY = Math.ceil(n), this.$e.maxScrollY = Math.max(n, null !== (t = this.$e.maxScrollY) && void 0 !== t ? t : 0), this.$e.maxScrollHeight = Math.max(o, null !== (i = this.$e.maxScrollHeight) && void 0 !== i ? i : 0), this.$e.lastContentY = a, this.$e.maxContentY = Math.max(a, null !== (e = this.$e.maxContentY) && void 0 !== e ? e : 0), this.$e.maxContentHeight = Math.max(l, null !== (r = this.$e.maxContentHeight) && void 0 !== r ? r : 0)
            }, this._instance = t
        }
        getContext() {
            return this.$e
        }
        resetContext() {
            var t = this.$e;
            return setTimeout(this.Ee, 0), t
        }
        startMeasuringScrollPosition() {
            Ht(t, "scroll", this.Ee, {
                capture: !0
            }), Ht(t, "scrollend", this.Ee, {
                capture: !0
            }), Ht(t, "resize", this.Ee)
        }
        scrollElement() {
            if (!this._instance.config.scroll_root_selector) return null == t ? void 0 : t.document.documentElement;
            var i = P(this._instance.config.scroll_root_selector) ? this._instance.config.scroll_root_selector : [this._instance.config.scroll_root_selector];
            for (var e of i) {
                var r = null == t ? void 0 : t.document.querySelector(e);
                if (r) return r
            }
        }
        scrollY() {
            if (this._instance.config.scroll_root_selector) {
                var i = this.scrollElement();
                return i && i.scrollTop || 0
            }
            return t && (t.scrollY || t.pageYOffset || t.document.documentElement.scrollTop) || 0
        }
        scrollX() {
            if (this._instance.config.scroll_root_selector) {
                var i = this.scrollElement();
                return i && i.scrollLeft || 0
            }
            return t && (t.scrollX || t.pageXOffset || t.document.documentElement.scrollLeft) || 0
        }
    }
    var Jn = t => as(null == t ? void 0 : t.config.mask_personal_data_properties, null == t ? void 0 : t.config.custom_personal_data_properties);
    class Kn {
        constructor(t, i, e, r) {
            this.ke = t => {
                var i = this.Pe();
                if (!i || i.sessionId !== t) {
                    var e = {
                        sessionId: t,
                        props: this.Te(this._instance)
                    };
                    this.Ie.register({
                        [di]: e
                    })
                }
            }, this._instance = t, this.Re = i, this.Ie = e, this.Te = r || Jn, this.Re.onSessionId(this.ke)
        }
        Pe() {
            return this.Ie.props[di]
        }
        getSetOnceProps() {
            var t, i = null == (t = this.Pe()) ? void 0 : t.props;
            return i ? "r" in i ? ls(i) : {
                $referring_domain: i.referringDomain,
                $pathname: i.initialPathName,
                utm_source: i.utm_source,
                utm_campaign: i.utm_campaign,
                utm_medium: i.utm_medium,
                utm_content: i.utm_content,
                utm_term: i.utm_term
            } : {}
        }
        getSessionProps() {
            var t = {};
            return Ct(Dt(this.getSetOnceProps()), ((i, e) => {
                "$current_url" === e && (e = "url"), t["$session_entry_" + w(e)] = i
            })), t
        }
    }
    var Yn = kt("[SessionId]");
    class Xn {
        on(t, i) {
            return this.Ce.on(t, i)
        }
        constructor(t, i, e) {
            var r;
            if (this.Oe = [], this.Fe = void 0, this.Ce = new In, this.Me = (t, i) => Math.abs(t - i) > this.sessionTimeoutMs, !t.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
            if ("always" === t.config.cookieless_mode) throw new Error('SessionIdManager cannot be used with cookieless_mode="always"');
            this.A = t.config, this.Ie = t.persistence, this.Ae = void 0, this.je = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this.De = i || ye, this.Le = e || ye;
            var s = this.A.persistence_name || this.A.token,
                n = this.A.session_idle_timeout_seconds || 1800;
            if (this._sessionTimeoutMs = 1e3 * G(n, 60, 36e3, Yn.createLogger("session_idle_timeout_seconds"), 1800), t.register({
                    $configured_session_timeout_ms: this._sessionTimeoutMs
                }), this.Ne(), this.Ue = "ph_" + s + "_window_id", this.ze = "ph_" + s + "_primary_window_exists", this.He()) {
                var o = Oe.K(this.Ue),
                    a = Oe.K(this.ze);
                o && !a ? this.Ae = o : Oe.X(this.Ue), Oe.Y(this.ze, !0)
            }
            if (null != (r = this.A.bootstrap) && r.sessionID) try {
                var l = (t => {
                    var i = t.replace(/-/g, "");
                    if (32 !== i.length) throw new Error("Not a valid UUID");
                    if ("7" !== i[12]) throw new Error("Not a UUIDv7");
                    return parseInt(i.substring(0, 12), 16)
                })(this.A.bootstrap.sessionID);
                this.Be(this.A.bootstrap.sessionID, (new Date).getTime(), l)
            } catch (t) {
                Yn.error("Invalid sessionID in bootstrap", t)
            }
            this.qe()
        }
        get sessionTimeoutMs() {
            return this._sessionTimeoutMs
        }
        onSessionId(t) {
            return C(this.Oe) && (this.Oe = []), this.Oe.push(t), this.je && t(this.je, this.Ae), () => {
                this.Oe = this.Oe.filter((i => i !== t))
            }
        }
        He() {
            return "memory" !== this.A.persistence && !this.Ie.$i && Oe.G()
        }
        We(t) {
            t !== this.Ae && (this.Ae = t, this.He() && Oe.Y(this.Ue, t))
        }
        Ge() {
            return this.Ae ? this.Ae : this.He() ? Oe.K(this.Ue) : null
        }
        Be(t, i, e) {
            t === this.je && i === this._sessionActivityTimestamp && e === this._sessionStartTimestamp || (this._sessionStartTimestamp = e, this._sessionActivityTimestamp = i, this.je = t, this.Ie.register({
                [ii]: [i, t, e]
            }))
        }
        Ve() {
            if (this.je && this._sessionActivityTimestamp && this._sessionStartTimestamp) return [this._sessionActivityTimestamp, this.je, this._sessionStartTimestamp];
            var t = this.Ie.props[ii];
            return P(t) && 2 === t.length && t.push(t[0]), t || [0, null, 0]
        }
        resetSessionId() {
            this.Be(null, null, null)
        }
        destroy() {
            clearTimeout(this.Je), this.Je = void 0, this.Fe && t && (t.removeEventListener("beforeunload", this.Fe, {
                capture: !1
            }), this.Fe = void 0), this.Oe = []
        }
        qe() {
            this.Fe = () => {
                this.He() && Oe.X(this.ze)
            }, Ht(t, "beforeunload", this.Fe, {
                capture: !1
            })
        }
        checkAndGetSessionAndWindowId(t, i) {
            if (void 0 === t && (t = !1), void 0 === i && (i = null), "always" === this.A.cookieless_mode) throw new Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
            var e = i || (new Date).getTime(),
                [r, s, n] = this.Ve(),
                o = this.Ge(),
                a = j(n) && n > 0 && Math.abs(e - n) > 864e5,
                l = !1,
                u = !s,
                h = !t && this.Me(e, r);
            u || h || a ? (s = this.De(), o = this.Le(), Yn.info("new session ID generated", {
                sessionId: s,
                windowId: o,
                changeReason: {
                    noSessionId: u,
                    activityTimeout: h,
                    sessionPastMaximumLength: a
                }
            }), n = e, l = !0) : o || (o = this.Le(), l = !0);
            var v = 0 === r || !t || a ? e : r,
                d = 0 === n ? (new Date).getTime() : n;
            return this.We(o), this.Be(s, v, d), t || this.Ne(), l && this.Oe.forEach((t => t(s, o, l ? {
                noSessionId: u,
                activityTimeout: h,
                sessionPastMaximumLength: a
            } : void 0))), {
                sessionId: s,
                windowId: o,
                sessionStartTimestamp: d,
                changeReason: l ? {
                    noSessionId: u,
                    activityTimeout: h,
                    sessionPastMaximumLength: a
                } : void 0,
                lastActivityTimestamp: r
            }
        }
        Ne() {
            clearTimeout(this.Je), this.Je = setTimeout((() => {
                var [t] = this.Ve();
                if (this.Me((new Date).getTime(), t)) {
                    var i = this.je;
                    this.resetSessionId(), this.Ce.emit("forcedIdleReset", {
                        idleSessionId: i
                    })
                }
            }), 1.1 * this.sessionTimeoutMs)
        }
    }
    var Qn = ["$set_once", "$set"],
        Zn = kt("[SiteApps]");
    class to {
        constructor(t) {
            this._instance = t, this.Ke = [], this.apps = {}
        }
        get isEnabled() {
            return !!this._instance.config.opt_in_site_apps
        }
        Ye(t, i) {
            if (i) {
                var e = this.globalsForEvent(i);
                this.Ke.push(e), this.Ke.length > 1e3 && (this.Ke = this.Ke.slice(10))
            }
        }
        get siteAppLoaders() {
            var t;
            return null == (t = d._POSTHOG_REMOTE_CONFIG) || null == (t = t[this._instance.config.token]) ? void 0 : t.siteApps
        }
        init() {
            if (this.isEnabled) {
                var t = this._instance.Li(this.Ye.bind(this));
                this.Xe = () => {
                    t(), this.Ke = [], this.Xe = void 0
                }
            }
        }
        globalsForEvent(t) {
            var i, e, r, s, n, o, a;
            if (!t) throw new Error("Event payload is required");
            var l = {},
                u = this._instance.get_property("$groups") || [],
                h = this._instance.get_property("$stored_group_properties") || {};
            for (var [v, d] of Object.entries(h)) l[v] = {
                id: u[v],
                type: v,
                properties: d
            };
            var {
                $set_once: c,
                $set: f
            } = t;
            return {
                event: g({}, _(t, Qn), {
                    properties: g({}, t.properties, f ? {
                        $set: g({}, null !== (i = null == (e = t.properties) ? void 0 : e.$set) && void 0 !== i ? i : {}, f)
                    } : {}, c ? {
                        $set_once: g({}, null !== (r = null == (s = t.properties) ? void 0 : s.$set_once) && void 0 !== r ? r : {}, c)
                    } : {}),
                    elements_chain: null !== (n = null == (o = t.properties) ? void 0 : o.$elements_chain) && void 0 !== n ? n : "",
                    distinct_id: null == (a = t.properties) ? void 0 : a.distinct_id
                }),
                person: {
                    properties: this._instance.get_property("$stored_person_properties")
                },
                groups: l
            }
        }
        setupSiteApp(t) {
            var i = this.apps[t.id],
                e = () => {
                    var e;
                    (!i.errored && this.Ke.length && (Zn.info("Processing " + this.Ke.length + " events for site app with id " + t.id), this.Ke.forEach((t => null == i.processEvent ? void 0 : i.processEvent(t))), i.processedBuffer = !0), Object.values(this.apps).every((t => t.processedBuffer || t.errored))) && (null == (e = this.Xe) || e.call(this))
                },
                r = !1,
                s = s => {
                    i.errored = !s, i.loaded = !0, Zn.info("Site app with id " + t.id + " " + (s ? "loaded" : "errored")), r && e()
                };
            try {
                var {
                    processEvent: n
                } = t.init({
                    posthog: this._instance,
                    callback: t => {
                        s(t)
                    }
                });
                n && (i.processEvent = n), r = !0
            } catch (i) {
                Zn.error("Error while initializing PostHog app with config id " + t.id, i), s(!1)
            }
            if (r && i.loaded) try {
                e()
            } catch (e) {
                Zn.error("Error while processing buffered events PostHog app with config id " + t.id, e), i.errored = !0
            }
        }
        Qe() {
            var t = this.siteAppLoaders || [];
            for (var i of t) this.apps[i.id] = {
                id: i.id,
                loaded: !1,
                errored: !1,
                processedBuffer: !1
            };
            for (var e of t) this.setupSiteApp(e)
        }
        Ze(t) {
            if (0 !== Object.keys(this.apps).length) {
                var i = this.globalsForEvent(t);
                for (var e of Object.values(this.apps)) try {
                    null == e.processEvent || e.processEvent(i)
                } catch (i) {
                    Zn.error("Error while processing event " + t.event + " for site app " + e.id, i)
                }
            }
        }
        onRemoteConfig(t) {
            var i, e, r, s = this;
            if (null != (i = this.siteAppLoaders) && i.length) return this.isEnabled ? (this.Qe(), void this._instance.on("eventCaptured", (t => this.Ze(t)))) : void Zn.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
            if (null == (e = this.Xe) || e.call(this), null != (r = t.siteApps) && r.length)
                if (this.isEnabled) {
                    var n = function(t) {
                        var i;
                        d["__$$ph_site_app_" + t] = s._instance, null == (i = d.__PosthogExtensions__) || null == i.loadSiteApp || i.loadSiteApp(s._instance, a, (i => {
                            if (i) return Zn.error("Error while initializing PostHog app with config id " + t, i)
                        }))
                    };
                    for (var {
                            id: o,
                            url: a
                        } of t.siteApps) n(o)
                } else Zn.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.')
        }
    }
    var io = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"],
        eo = function(t, i) {
            if (!t) return !1;
            var e = t.toLowerCase();
            return io.concat(i || []).some((t => {
                var i = t.toLowerCase();
                return -1 !== e.indexOf(i)
            }))
        },
        ro = function(t, i) {
            if (!t) return !1;
            var e = t.userAgent;
            if (e && eo(e, i)) return !0;
            try {
                var r = null == t ? void 0 : t.userAgentData;
                if (null != r && r.brands && r.brands.some((t => eo(null == t ? void 0 : t.brand, i)))) return !0
            } catch (t) {}
            return !!t.webdriver
        },
        so = function(t) {
            return t.US = "us", t.EU = "eu", t.CUSTOM = "custom", t
        }({}),
        no = "i.posthog.com";
    class oo {
        constructor(t) {
            this.tr = {}, this.instance = t
        }
        get apiHost() {
            var t = this.instance.config.api_host.trim().replace(/\/$/, "");
            return "https://app.posthog.com" === t ? "https://us.i.posthog.com" : t
        }
        get uiHost() {
            var t, i = null == (t = this.instance.config.ui_host) ? void 0 : t.replace(/\/$/, "");
            return i || (i = this.apiHost.replace("." + no, ".posthog.com")), "https://app.posthog.com" === i ? "https://us.posthog.com" : i
        }
        get region() {
            return this.tr[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.tr[this.apiHost] = so.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.tr[this.apiHost] = so.EU : this.tr[this.apiHost] = so.CUSTOM), this.tr[this.apiHost]
        }
        endpointFor(t, i) {
            if (void 0 === i && (i = ""), i && (i = "/" === i[0] ? i : "/" + i), "ui" === t) return this.uiHost + i;
            if (this.region === so.CUSTOM) return this.apiHost + i;
            var e = no + i;
            switch (t) {
                case "assets":
                    return "https://" + this.region + "-assets." + e;
                case "api":
                    return "https://" + this.region + "." + e
            }
        }
    }
    var ao = {
        icontains: (i, e) => !!t && e.href.toLowerCase().indexOf(i.toLowerCase()) > -1,
        not_icontains: (i, e) => !!t && -1 === e.href.toLowerCase().indexOf(i.toLowerCase()),
        regex: (i, e) => !!t && an(e.href, i),
        not_regex: (i, e) => !!t && !an(e.href, i),
        exact: (t, i) => i.href === t,
        is_not: (t, i) => i.href !== t
    };
    class lo {
        constructor(t) {
            var i = this;
            this.getWebExperimentsAndEvaluateDisplayLogic = function(t) {
                void 0 === t && (t = !1), i.getWebExperiments((t => {
                    lo.ir("retrieved web experiments from the server"), i.er = new Map, t.forEach((t => {
                        if (t.feature_flag_key) {
                            var e;
                            if (i.er) lo.ir("setting flag key ", t.feature_flag_key, " to web experiment ", t), null == (e = i.er) || e.set(t.feature_flag_key, t);
                            var r = i._instance.getFeatureFlag(t.feature_flag_key);
                            O(r) && t.variants[r] && i.rr(t.name, r, t.variants[r].transforms)
                        } else if (t.variants)
                            for (var s in t.variants) {
                                var n = t.variants[s];
                                lo.sr(n) && i.rr(t.name, s, n.transforms)
                            }
                    }))
                }), t)
            }, this._instance = t, this._instance.onFeatureFlags((t => {
                this.onFeatureFlags(t)
            }))
        }
        onFeatureFlags(t) {
            if (this._is_bot()) lo.ir("Refusing to render web experiment since the viewer is a likely bot");
            else if (!this._instance.config.disable_web_experiments) {
                if (A(this.er)) return this.er = new Map, this.loadIfEnabled(), void this.previewWebExperiment();
                lo.ir("applying feature flags", t), t.forEach((t => {
                    var i;
                    if (this.er && null != (i = this.er) && i.has(t)) {
                        var e, r = this._instance.getFeatureFlag(t),
                            s = null == (e = this.er) ? void 0 : e.get(t);
                        r && null != s && s.variants[r] && this.rr(s.name, r, s.variants[r].transforms)
                    }
                }))
            }
        }
        previewWebExperiment() {
            var t = lo.getWindowLocation();
            if (null != t && t.search) {
                var i = se(null == t ? void 0 : t.search, "__experiment_id"),
                    e = se(null == t ? void 0 : t.search, "__experiment_variant");
                i && e && (lo.ir("previewing web experiments " + i + " && " + e), this.getWebExperiments((t => {
                    this.nr(parseInt(i), e, t)
                }), !1, !0))
            }
        }
        loadIfEnabled() {
            this._instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic()
        }
        getWebExperiments(t, i, e) {
            if (this._instance.config.disable_web_experiments && !e) return t([]);
            var r = this._instance.get_property("$web_experiments");
            if (r && !i) return t(r);
            this._instance.mi({
                url: this._instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=" + this._instance.config.token),
                method: "GET",
                callback: i => {
                    if (200 !== i.statusCode || !i.json) return t([]);
                    var e = i.json.experiments || [];
                    return t(e)
                }
            })
        }
        nr(t, i, e) {
            var r = e.filter((i => i.id === t));
            r && r.length > 0 && (lo.ir("Previewing web experiment [" + r[0].name + "] with variant [" + i + "]"), this.rr(r[0].name, i, r[0].variants[i].transforms))
        }
        static sr(t) {
            return !A(t.conditions) && (lo.ar(t) && lo.lr(t))
        }
        static ar(t) {
            var i;
            if (A(t.conditions) || A(null == (i = t.conditions) ? void 0 : i.url)) return !0;
            var e, r, s, n = lo.getWindowLocation();
            return !!n && (null == (e = t.conditions) || !e.url || ao[null !== (r = null == (s = t.conditions) ? void 0 : s.urlMatchType) && void 0 !== r ? r : "icontains"](t.conditions.url, n))
        }
        static getWindowLocation() {
            return null == t ? void 0 : t.location
        }
        static lr(t) {
            var i;
            if (A(t.conditions) || A(null == (i = t.conditions) ? void 0 : i.utm)) return !0;
            var e = es();
            if (e.utm_source) {
                var r, s, n, o, a, l, u, h, v = null == (r = t.conditions) || null == (r = r.utm) || !r.utm_campaign || (null == (s = t.conditions) || null == (s = s.utm) ? void 0 : s.utm_campaign) == e.utm_campaign,
                    d = null == (n = t.conditions) || null == (n = n.utm) || !n.utm_source || (null == (o = t.conditions) || null == (o = o.utm) ? void 0 : o.utm_source) == e.utm_source,
                    c = null == (a = t.conditions) || null == (a = a.utm) || !a.utm_medium || (null == (l = t.conditions) || null == (l = l.utm) ? void 0 : l.utm_medium) == e.utm_medium,
                    f = null == (u = t.conditions) || null == (u = u.utm) || !u.utm_term || (null == (h = t.conditions) || null == (h = h.utm) ? void 0 : h.utm_term) == e.utm_term;
                return v && c && f && d
            }
            return !1
        }
        static ir(t) {
            for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) e[r - 1] = arguments[r];
            $t.info("[WebExperiments] " + t, e)
        }
        rr(t, i, e) {
            this._is_bot() ? lo.ir("Refusing to render web experiment since the viewer is a likely bot") : "control" !== i ? e.forEach((e => {
                if (e.selector) {
                    var r;
                    lo.ir("applying transform of variant " + i + " for experiment " + t + " ", e);
                    var s = null == (r = document) ? void 0 : r.querySelectorAll(e.selector);
                    null == s || s.forEach((t => {
                        var i = t;
                        e.html && (i.innerHTML = e.html), e.css && i.setAttribute("style", e.css)
                    }))
                }
            })) : lo.ir("Control variants leave the page unmodified.")
        }
        _is_bot() {
            return n && this._instance ? ro(n, this._instance.config.custom_blocked_useragents) : void 0
        }
    }
    var uo = kt("[PostHog ExternalIntegrations]"),
        ho = {
            intercom: "intercom-integration",
            crispChat: "crisp-chat-integration"
        };
    class vo {
        constructor(t) {
            this._instance = t
        }
        nt(t, i) {
            var e;
            null == (e = d.__PosthogExtensions__) || null == e.loadExternalDependency || e.loadExternalDependency(this._instance, t, (t => {
                if (t) return uo.error("failed to load script", t);
                i()
            }))
        }
        startIfEnabledOrStop() {
            var t = this,
                i = function(i) {
                    var e, s, n;
                    (!r || null != (e = d.__PosthogExtensions__) && null != (e = e.integrations) && e[i] || t.nt(ho[i], (() => {
                        var e;
                        null == (e = d.__PosthogExtensions__) || null == (e = e.integrations) || null == (e = e[i]) || e.start(t._instance)
                    })), !r && null != (s = d.__PosthogExtensions__) && null != (s = s.integrations) && s[i]) && (null == (n = d.__PosthogExtensions__) || null == (n = n.integrations) || null == (n = n[i]) || n.stop())
                };
            for (var [e, r] of Object.entries(null !== (s = this._instance.config.integrations) && void 0 !== s ? s : {})) {
                var s;
                i(e)
            }
        }
    }
    var co = "[SessionRecording]",
        fo = kt(co);
    class po {
        get started() {
            var t;
            return !(null == (t = this.ur) || !t.isStarted)
        }
        get status() {
            return this.ur ? this.ur.status : this.hr && !this.vr ? "disabled" : "lazy_loading"
        }
        constructor(t) {
            if (this._forceAllowLocalhostNetworkCapture = !1, this.hr = !1, this.dr = void 0, this._instance = t, !this._instance.sessionManager) throw fo.error("started without valid sessionManager"), new Error(co + " started without valid sessionManager. This is a bug.");
            if ("always" === this._instance.config.cookieless_mode) throw new Error(co + ' cannot be used with cookieless_mode="always"')
        }
        get vr() {
            var i, e = !(null == (i = this._instance.get_property(ti)) || !i.enabled),
                r = !this._instance.config.disable_session_recording,
                s = this._instance.config.disable_session_recording || this._instance.consent.isOptedOut();
            return t && e && r && !s
        }
        startIfEnabledOrStop(t) {
            var i;
            if (!this.vr || null == (i = this.ur) || !i.isStarted) {
                var e = !C(Object.assign) && !C(Array.from);
                this.vr && e ? (this.cr(t), fo.info("starting")) : this.stopRecording()
            }
        }
        cr(t) {
            var i, e, r;
            this.vr && (null != d && null != (i = d.__PosthogExtensions__) && null != (i = i.rrweb) && i.record && null != (e = d.__PosthogExtensions__) && e.initSessionRecording ? this.pr(t) : null == (r = d.__PosthogExtensions__) || null == r.loadExternalDependency || r.loadExternalDependency(this._instance, this.gr, (i => {
                if (i) return fo.error("could not load recorder", i);
                this.pr(t)
            })))
        }
        stopRecording() {
            var t, i;
            null == (t = this.dr) || t.call(this), this.dr = void 0, null == (i = this.ur) || i.stop()
        }
        _r() {
            var t;
            null == (t = this._instance.persistence) || t.unregister(ei)
        }
        mr(t) {
            if (this._instance.persistence) {
                var i, e, r = this._instance.persistence,
                    s = () => {
                        var i = !1 === t.sessionRecording ? void 0 : t.sessionRecording,
                            e = null == i ? void 0 : i.sampleRate,
                            s = A(e) ? null : parseFloat(e);
                        A(s) && this._r();
                        var n = null == i ? void 0 : i.minimumDurationMilliseconds;
                        r.register({
                            [ti]: g({
                                enabled: !!i
                            }, i, {
                                networkPayloadCapture: g({
                                    capturePerformance: t.capturePerformance
                                }, null == i ? void 0 : i.networkPayloadCapture),
                                canvasRecording: {
                                    enabled: null == i ? void 0 : i.recordCanvas,
                                    fps: null == i ? void 0 : i.canvasFps,
                                    quality: null == i ? void 0 : i.canvasQuality
                                },
                                sampleRate: s,
                                minimumDurationMilliseconds: C(n) ? null : n,
                                endpoint: null == i ? void 0 : i.endpoint,
                                triggerMatchType: null == i ? void 0 : i.triggerMatchType,
                                masking: null == i ? void 0 : i.masking,
                                urlTriggers: null == i ? void 0 : i.urlTriggers
                            })
                        })
                    };
                s(), null == (i = this.dr) || i.call(this), this.dr = null == (e = this._instance.sessionManager) ? void 0 : e.onSessionId(s)
            }
        }
        onRemoteConfig(t) {
            "sessionRecording" in t ? !1 !== t.sessionRecording ? (this.mr(t), this.hr = !0, this.startIfEnabledOrStop()) : this.hr = !0 : fo.info("skipping remote config with no sessionRecording", t)
        }
        log(t, i) {
            var e;
            void 0 === i && (i = "log"), null != (e = this.ur) && e.log ? this.ur.log(t, i) : fo.warn("log called before recorder was ready")
        }
        get gr() {
            var t, i, e = null == (t = this._instance) || null == (t = t.persistence) ? void 0 : t.get_property(ti);
            return (null == e || null == (i = e.scriptConfig) ? void 0 : i.script) || "lazy-recorder"
        }
        pr(t) {
            var i, e;
            if (null == (i = d.__PosthogExtensions__) || !i.initSessionRecording) throw Error("Called on script loaded before session recording is available");
            this.ur || (this.ur = null == (e = d.__PosthogExtensions__) ? void 0 : e.initSessionRecording(this._instance), this.ur._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture);
            this.ur.start(t)
        }
        onRRwebEmit(t) {
            var i;
            null == (i = this.ur) || null == i.onRRwebEmit || i.onRRwebEmit(t)
        }
        overrideLinkedFlag() {
            var t;
            null == (t = this.ur) || t.overrideLinkedFlag()
        }
        overrideSampling() {
            var t;
            null == (t = this.ur) || t.overrideSampling()
        }
        overrideTrigger(t) {
            var i;
            null == (i = this.ur) || i.overrideTrigger(t)
        }
        get sdkDebugProperties() {
            var t;
            return (null == (t = this.ur) ? void 0 : t.sdkDebugProperties) || {
                $recording_status: this.status
            }
        }
        tryAddCustomEvent(t, i) {
            var e;
            return !(null == (e = this.ur) || !e.tryAddCustomEvent(t, i))
        }
    }
    var go = {},
        _o = () => {},
        mo = "posthog",
        yo = !tn && -1 === (null == v ? void 0 : v.indexOf("MSIE")) && -1 === (null == v ? void 0 : v.indexOf("Mozilla")),
        bo = i => {
            var e;
            return {
                api_host: "https://us.i.posthog.com",
                ui_host: null,
                token: "",
                autocapture: !0,
                rageclick: !0,
                cross_subdomain_cookie: Ut(null == o ? void 0 : o.location),
                persistence: "localStorage+cookie",
                persistence_name: "",
                loaded: _o,
                save_campaign_params: !0,
                custom_campaign_params: [],
                custom_blocked_useragents: [],
                save_referrer: !0,
                capture_pageview: "2025-05-24" !== i || "history_change",
                capture_pageleave: "if_capture_pageview",
                defaults: null != i ? i : "unset",
                debug: a && O(null == a ? void 0 : a.search) && -1 !== a.search.indexOf("__posthog_debug=true") || !1,
                cookie_expiration: 365,
                upgrade: !1,
                disable_session_recording: !1,
                disable_persistence: !1,
                disable_web_experiments: !0,
                disable_surveys: !1,
                disable_surveys_automatic_display: !1,
                disable_external_dependency_loading: !1,
                enable_recording_console_log: void 0,
                secure_cookie: "https:" === (null == t || null == (e = t.location) ? void 0 : e.protocol),
                ip: !1,
                opt_out_capturing_by_default: !1,
                opt_out_persistence_by_default: !1,
                opt_out_useragent_filter: !1,
                opt_out_capturing_persistence_type: "localStorage",
                consent_persistence_name: null,
                opt_out_capturing_cookie_prefix: null,
                opt_in_site_apps: !1,
                property_denylist: [],
                respect_dnt: !1,
                sanitize_properties: null,
                request_headers: {},
                request_batching: !0,
                properties_string_max_length: 65535,
                session_recording: {},
                mask_all_element_attributes: !1,
                mask_all_text: !1,
                mask_personal_data_properties: !1,
                custom_personal_data_properties: [],
                advanced_disable_flags: !1,
                advanced_disable_decide: !1,
                advanced_disable_feature_flags: !1,
                advanced_disable_feature_flags_on_first_load: !1,
                advanced_only_evaluate_survey_feature_flags: !1,
                advanced_enable_surveys: !1,
                advanced_disable_toolbar_metrics: !1,
                feature_flag_request_timeout_ms: 3e3,
                surveys_request_timeout_ms: 1e4,
                on_request_error: t => {
                    var i = "Bad HTTP status: " + t.statusCode + " " + t.text;
                    $t.error(i)
                },
                get_device_id: t => t,
                capture_performance: void 0,
                name: "posthog",
                bootstrap: {},
                disable_compression: !1,
                session_idle_timeout_seconds: 1800,
                person_profiles: "identified_only",
                before_send: void 0,
                request_queue_config: {
                    flush_interval_ms: Bn
                },
                error_tracking: {},
                _onCapture: _o,
                __preview_eager_load_replay: !1
            }
        },
        wo = t => {
            var i = {};
            C(t.process_person) || (i.person_profiles = t.process_person), C(t.xhr_headers) || (i.request_headers = t.xhr_headers), C(t.cookie_name) || (i.persistence_name = t.cookie_name), C(t.disable_cookie) || (i.disable_persistence = t.disable_cookie), C(t.store_google) || (i.save_campaign_params = t.store_google), C(t.verbose) || (i.debug = t.verbose);
            var e = Ot({}, i, t);
            return P(t.property_blacklist) && (C(t.property_denylist) ? e.property_denylist = t.property_blacklist : P(t.property_denylist) ? e.property_denylist = [...t.property_blacklist, ...t.property_denylist] : $t.error("Invalid value for property_denylist config: " + t.property_denylist)), e
        };
    class So {
        constructor() {
            this.__forceAllowLocalhost = !1
        }
        get yr() {
            return this.__forceAllowLocalhost
        }
        set yr(t) {
            $t.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = t
        }
    }
    class xo {
        get decideEndpointWasHit() {
            var t, i;
            return null !== (t = null == (i = this.featureFlags) ? void 0 : i.hasLoadedFlags) && void 0 !== t && t
        }
        get flagsEndpointWasHit() {
            var t, i;
            return null !== (t = null == (i = this.featureFlags) ? void 0 : i.hasLoadedFlags) && void 0 !== t && t
        }
        constructor() {
            this.webPerformance = new So, this.br = !1, this.version = c.LIB_VERSION, this.wr = new In, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = bo(), this.SentryIntegration = Ve, this.sentryIntegration = t => function(t, i) {
                var e = Ge(t, i);
                return {
                    name: We,
                    processEvent: t => e(t)
                }
            }(this, t), this.__request_queue = [], this.__loaded = !1, this.analyticsDefaultEndpoint = "/e/", this.Sr = !1, this.Er = null, this.$r = null, this.kr = null, this.featureFlags = new Sn(this), this.toolbar = new Qe(this), this.scrollManager = new Vn(this), this.pageViewManager = new ms(this), this.surveys = new Ln(this), this.experiments = new lo(this), this.exceptions = new dn(this), this.rateLimiter = new Un(this), this.requestRouter = new oo(this), this.consent = new Me(this), this.externalIntegrations = new vo(this), this.people = {
                set: (t, i, e) => {
                    var r = O(t) ? {
                        [t]: i
                    } : t;
                    this.setPersonProperties(r), null == e || e({})
                },
                set_once: (t, i, e) => {
                    var r = O(t) ? {
                        [t]: i
                    } : t;
                    this.setPersonProperties(void 0, r), null == e || e({})
                }
            }, this.on("eventCaptured", (t => $t.info('send "' + (null == t ? void 0 : t.event) + '"', t)))
        }
        init(t, i, e) {
            if (e && e !== mo) {
                var r, s = null !== (r = go[e]) && void 0 !== r ? r : new xo;
                return s._init(t, i, e), go[e] = s, go[mo][e] = s, s
            }
            return this._init(t, i, e)
        }
        _init(i, e, r) {
            var s, n;
            if (void 0 === e && (e = {}), C(i) || F(i)) return $t.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
            if (this.__loaded) return console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
            this.__loaded = !0, this.config = {}, e.debug = this.Pr(e.debug), this.Tr = e, this.Ir = [], e.person_profiles && (this.$r = e.person_profiles), this.set_config(Ot({}, bo(e.defaults), wo(e), {
                name: r,
                token: i
            })), this.config.on_xhr_error && $t.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = e.disable_compression ? void 0 : ie.GZipJS;
            var o = this.Rr();
            this.persistence = new En(this.config, o), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new En(g({}, this.config, {
                persistence: "sessionStorage"
            }), o);
            var a = g({}, this.persistence.props),
                l = g({}, this.sessionPersistence.props);
            this.register({
                $initialization_time: (new Date).toISOString()
            }), this.Cr = new qn((t => this.Or(t)), this.config.request_queue_config), this.Fr = new Gn(this), this.__request_queue = [];
            var u = "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut();
            if (u || (this.sessionManager = new Xn(this), this.sessionPropsManager = new Kn(this, this.sessionManager, this.persistence)), new tr(this).startIfEnabledOrStop(), this.siteApps = new to(this), null == (s = this.siteApps) || s.init(), u || (this.sessionRecording = new po(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new de(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new _s(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new fs(this), this.exceptionObserver = new Ue(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new Le(this, De), this.deadClicksAutocapture.startIfEnabled(), this.historyAutocapture = new He(this), this.historyAutocapture.startIfEnabled(), c.DEBUG = c.DEBUG || this.config.debug, c.DEBUG && $t.info("Starting in debug mode", {
                    this: this,
                    config: e,
                    thisC: g({}, this.config),
                    p: a,
                    s: l
                }), void 0 !== (null == (n = e.bootstrap) ? void 0 : n.distinctID)) {
                var h, v, d = this.config.get_device_id(ye()),
                    f = null != (h = e.bootstrap) && h.isIdentifiedID ? d : e.bootstrap.distinctID;
                this.persistence.set_property(vi, null != (v = e.bootstrap) && v.isIdentifiedID ? "identified" : "anonymous"), this.register({
                    distinct_id: e.bootstrap.distinctID,
                    $device_id: f
                })
            }
            if (this.Mr()) {
                var p, _, m = Object.keys((null == (p = e.bootstrap) ? void 0 : p.featureFlags) || {}).filter((t => {
                        var i;
                        return !(null == (i = e.bootstrap) || null == (i = i.featureFlags) || !i[t])
                    })).reduce(((t, i) => {
                        var r;
                        return t[i] = (null == (r = e.bootstrap) || null == (r = r.featureFlags) ? void 0 : r[i]) || !1, t
                    }), {}),
                    y = Object.keys((null == (_ = e.bootstrap) ? void 0 : _.featureFlagPayloads) || {}).filter((t => m[t])).reduce(((t, i) => {
                        var r, s;
                        null != (r = e.bootstrap) && null != (r = r.featureFlagPayloads) && r[i] && (t[i] = null == (s = e.bootstrap) || null == (s = s.featureFlagPayloads) ? void 0 : s[i]);
                        return t
                    }), {});
                this.featureFlags.receivedFeatureFlags({
                    featureFlags: m,
                    featureFlagPayloads: y
                })
            }
            if (u) this.register_once({
                distinct_id: yi,
                $device_id: null
            }, "");
            else if (!this.get_distinct_id()) {
                var b = this.config.get_device_id(ye());
                this.register_once({
                    distinct_id: b,
                    $device_id: b
                }, ""), this.persistence.set_property(vi, "anonymous")
            }
            return Ht(t, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), {
                passive: !1
            }), this.toolbar.maybeLoadToolbar(), e.segment ? qe(this, (() => this.Ar())) : this.Ar(), T(this.config._onCapture) && this.config._onCapture !== _o && ($t.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (t => this.config._onCapture(t.event, t)))), this.config.ip && $t.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this
        }
        yi(t) {
            var i, e, r, s, n, a, l, u;
            if (!o || !o.body) return $t.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout((() => {
                this.yi(t)
            }), 500);
            this.compression = void 0, t.supportedCompression && !this.config.disable_compression && (this.compression = y(t.supportedCompression, ie.GZipJS) ? ie.GZipJS : y(t.supportedCompression, ie.Base64) ? ie.Base64 : void 0), null != (i = t.analytics) && i.endpoint && (this.analyticsDefaultEndpoint = t.analytics.endpoint), this.set_config({
                person_profiles: this.$r ? this.$r : "identified_only"
            }), null == (e = this.siteApps) || e.onRemoteConfig(t), null == (r = this.sessionRecording) || r.onRemoteConfig(t), null == (s = this.autocapture) || s.onRemoteConfig(t), null == (n = this.heatmaps) || n.onRemoteConfig(t), this.surveys.onRemoteConfig(t), null == (a = this.webVitalsAutocapture) || a.onRemoteConfig(t), null == (l = this.exceptionObserver) || l.onRemoteConfig(t), this.exceptions.onRemoteConfig(t), null == (u = this.deadClicksAutocapture) || u.onRemoteConfig(t)
        }
        Ar() {
            try {
                this.config.loaded(this)
            } catch (t) {
                $t.critical("`loaded` function failed", t)
            }
            this.jr(), this.config.capture_pageview && setTimeout((() => {
                (this.consent.isOptedIn() || "always" === this.config.cookieless_mode) && this.Dr()
            }), 1), new Hn(this).load(), this.featureFlags.flags()
        }
        jr() {
            var t;
            this.is_capturing() && (this.config.request_batching && (null == (t = this.Cr) || t.enable()))
        }
        _dom_loaded() {
            this.is_capturing() && Rt(this.__request_queue, (t => this.Or(t))), this.__request_queue = [], this.jr()
        }
        _handle_unload() {
            var t, i;
            this.config.request_batching ? (this.Lr() && this.capture("$pageleave"), null == (t = this.Cr) || t.unload(), null == (i = this.Fr) || i.unload()) : this.Lr() && this.capture("$pageleave", null, {
                transport: "sendBeacon"
            })
        }
        mi(t) {
            this.__loaded && (yo ? this.__request_queue.push(t) : this.rateLimiter.isServerRateLimited(t.batchKey) || (t.transport = t.transport || this.config.api_transport, t.url = rn(t.url, {
                ip: this.config.ip ? 1 : 0
            }), t.headers = g({}, this.config.request_headers), t.compression = "best-available" === t.compression ? this.compression : t.compression, t.disableXHRCredentials = this.config.__preview_disable_xhr_credentials, this.config.__preview_disable_beacon && (t.disableTransport = ["sendBeacon"]), t.fetchOptions = t.fetchOptions || this.config.fetch_options, (t => {
                var i, e, r, s = g({}, t);
                s.timeout = s.timeout || 6e4, s.url = rn(s.url, {
                    _: (new Date).getTime().toString(),
                    ver: c.LIB_VERSION,
                    compression: s.compression
                });
                var n = null !== (i = s.transport) && void 0 !== i ? i : "fetch",
                    o = on.filter((t => !s.disableTransport || !t.transport || !s.disableTransport.includes(t.transport))),
                    a = null !== (e = null == (r = zt(o, (t => t.transport === n))) ? void 0 : r.method) && void 0 !== e ? e : o[0].method;
                if (!a) throw new Error("No available transport method");
                a(s)
            })(g({}, t, {
                callback: i => {
                    var e, r;
                    (this.rateLimiter.checkForLimiting(i), i.statusCode >= 400) && (null == (e = (r = this.config).on_request_error) || e.call(r, i));
                    null == t.callback || t.callback(i)
                }
            }))))
        }
        Or(t) {
            this.Fr ? this.Fr.retriableRequest(t) : this.mi(t)
        }
        _execute_array(t) {
            var i, e = [],
                r = [],
                s = [];
            Rt(t, (t => {
                t && (i = t[0], P(i) ? s.push(t) : T(t) ? t.call(this) : P(t) && "alias" === i ? e.push(t) : P(t) && -1 !== i.indexOf("capture") && T(this[i]) ? s.push(t) : r.push(t))
            }));
            var n = function(t, i) {
                Rt(t, (function(t) {
                    if (P(t[0])) {
                        var e = i;
                        Ct(t, (function(t) {
                            e = e[t[0]].apply(e, t.slice(1))
                        }))
                    } else this[t[0]].apply(this, t.slice(1))
                }), i)
            };
            n(e, this), n(r, this), n(s, this)
        }
        Mr() {
            var t, i;
            return (null == (t = this.config.bootstrap) ? void 0 : t.featureFlags) && Object.keys(null == (i = this.config.bootstrap) ? void 0 : i.featureFlags).length > 0 || !1
        }
        push(t) {
            this._execute_array([t])
        }
        capture(t, i, e) {
            var r;
            if (this.__loaded && this.persistence && this.sessionPersistence && this.Cr) {
                if (this.is_capturing())
                    if (!C(t) && O(t)) {
                        if (this.config.opt_out_useragent_filter || !this._is_bot()) {
                            var s = null != e && e.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
                            if (null == s || !s.isRateLimited) {
                                null != i && i.$current_url && !O(null == i ? void 0 : i.$current_url) && ($t.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == i || delete i.$current_url), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
                                var n = new Date,
                                    o = (null == e ? void 0 : e.timestamp) || n,
                                    a = ye(),
                                    l = {
                                        uuid: a,
                                        event: t,
                                        properties: this.calculateEventProperties(t, i || {}, o, a)
                                    };
                                s && (l.properties.$lib_rate_limit_remaining_tokens = s.remainingTokens), (null == e ? void 0 : e.$set) && (l.$set = null == e ? void 0 : e.$set);
                                var u, h = this.Nr(null == e ? void 0 : e.$set_once);
                                if (h && (l.$set_once = h), (l = Lt(l, null != e && e._noTruncate ? null : this.config.properties_string_max_length)).timestamp = o, C(null == e ? void 0 : e.timestamp) || (l.properties.$event_time_override_provided = !0, l.properties.$event_time_override_system_time = n), t === kn.DISMISSED || t === kn.SENT) {
                                    var v = null == i ? void 0 : i[Pn.SURVEY_ID],
                                        d = null == i ? void 0 : i[Pn.SURVEY_ITERATION];
                                    u = {
                                        id: v,
                                        current_iteration: d
                                    }, localStorage.getItem(Mn(u)) || localStorage.setItem(Mn(u), "true"), l.$set = g({}, l.$set, {
                                        [Fn({
                                            id: v,
                                            current_iteration: d
                                        }, t === kn.SENT ? "responded" : "dismissed")]: !0
                                    })
                                }
                                var c = g({}, l.properties.$set, l.$set);
                                if (R(c) || this.setPersonPropertiesForFlags(c), !A(this.config.before_send)) {
                                    var f = this.Ur(l);
                                    if (!f) return;
                                    l = f
                                }
                                this.wr.emit("eventCaptured", l);
                                var p = {
                                    method: "POST",
                                    url: null !== (r = null == e ? void 0 : e._url) && void 0 !== r ? r : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint),
                                    data: l,
                                    compression: "best-available",
                                    batchKey: null == e ? void 0 : e._batchKey
                                };
                                return !this.config.request_batching || e && (null == e || !e._batchKey) || null != e && e.send_instantly ? this.Or(p) : this.Cr.enqueue(p), l
                            }
                            $t.critical("This capture call is ignored due to client rate limiting.")
                        }
                    } else $t.error("No event name provided to posthog.capture")
            } else $t.uninitializedWarning("posthog.capture")
        }
        Li(t) {
            return this.on("eventCaptured", (i => t(i.event, i)))
        }
        calculateEventProperties(t, i, e, r, s) {
            if (e = e || new Date, !this.persistence || !this.sessionPersistence) return i;
            var n = s ? void 0 : this.persistence.remove_event_timer(t),
                a = g({}, i);
            if (a.token = this.config.token, a.$config_defaults = this.config.defaults, ("always" == this.config.cookieless_mode || "on_reject" == this.config.cookieless_mode && this.consent.isExplicitlyOptedOut()) && (a.$cookieless_mode = !0), "$snapshot" === t) {
                var l = g({}, this.persistence.properties(), this.sessionPersistence.properties());
                return a.distinct_id = l.distinct_id, (!O(a.distinct_id) && !j(a.distinct_id) || F(a.distinct_id)) && $t.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), a
            }
            var u, h = vs(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties);
            if (this.sessionManager) {
                var {
                    sessionId: d,
                    windowId: c
                } = this.sessionManager.checkAndGetSessionAndWindowId(s, e.getTime());
                a.$session_id = d, a.$window_id = c
            }
            this.sessionPropsManager && Ot(a, this.sessionPropsManager.getSessionProps());
            try {
                var f;
                this.sessionRecording && Ot(a, this.sessionRecording.sdkDebugProperties), a.$sdk_debug_retry_queue_size = null == (f = this.Fr) ? void 0 : f.length
            } catch (t) {
                a.$sdk_debug_error_capturing_properties = String(t)
            }
            if (this.requestRouter.region === so.CUSTOM && (a.$lib_custom_api_host = this.config.api_host), u = "$pageview" !== t || s ? "$pageleave" !== t || s ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(e) : this.pageViewManager.doPageView(e, r), a = Ot(a, u), "$pageview" === t && o && (a.title = o.title), !C(n)) {
                var p = e.getTime() - n;
                a.$duration = parseFloat((p / 1e3).toFixed(3))
            }
            v && this.config.opt_out_useragent_filter && (a.$browser_type = this._is_bot() ? "bot" : "browser"), (a = Ot({}, h, this.persistence.properties(), this.sessionPersistence.properties(), a)).$is_identified = this._isIdentified(), P(this.config.property_denylist) ? Ct(this.config.property_denylist, (function(t) {
                delete a[t]
            })) : $t.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
            var _ = this.config.sanitize_properties;
            _ && ($t.error("sanitize_properties is deprecated. Use before_send instead"), a = _(a, t));
            var m = this.zr();
            return a.$process_person_profile = m, m && !s && this.Hr("_calculate_event_properties"), a
        }
        Nr(t) {
            var i;
            if (!this.persistence || !this.zr()) return t;
            if (this.br) return t;
            var e = this.persistence.get_initial_props(),
                r = null == (i = this.sessionPropsManager) ? void 0 : i.getSetOnceProps(),
                s = Ot({}, e, r || {}, t || {}),
                n = this.config.sanitize_properties;
            return n && ($t.error("sanitize_properties is deprecated. Use before_send instead"), s = n(s, "$set_once")), this.br = !0, R(s) ? void 0 : s
        }
        register(t, i) {
            var e;
            null == (e = this.persistence) || e.register(t, i)
        }
        register_once(t, i, e) {
            var r;
            null == (r = this.persistence) || r.register_once(t, i, e)
        }
        register_for_session(t) {
            var i;
            null == (i = this.sessionPersistence) || i.register(t)
        }
        unregister(t) {
            var i;
            null == (i = this.persistence) || i.unregister(t)
        }
        unregister_for_session(t) {
            var i;
            null == (i = this.sessionPersistence) || i.unregister(t)
        }
        Br(t, i) {
            this.register({
                [t]: i
            })
        }
        getFeatureFlag(t, i) {
            return this.featureFlags.getFeatureFlag(t, i)
        }
        getFeatureFlagPayload(t) {
            var i = this.featureFlags.getFeatureFlagPayload(t);
            try {
                return JSON.parse(i)
            } catch (t) {
                return i
            }
        }
        isFeatureEnabled(t, i) {
            return this.featureFlags.isFeatureEnabled(t, i)
        }
        reloadFeatureFlags() {
            this.featureFlags.reloadFeatureFlags()
        }
        updateEarlyAccessFeatureEnrollment(t, i, e) {
            this.featureFlags.updateEarlyAccessFeatureEnrollment(t, i, e)
        }
        getEarlyAccessFeatures(t, i, e) {
            return void 0 === i && (i = !1), this.featureFlags.getEarlyAccessFeatures(t, i, e)
        }
        on(t, i) {
            return this.wr.on(t, i)
        }
        onFeatureFlags(t) {
            return this.featureFlags.onFeatureFlags(t)
        }
        onSurveysLoaded(t) {
            return this.surveys.onSurveysLoaded(t)
        }
        onSessionId(t) {
            var i, e;
            return null !== (i = null == (e = this.sessionManager) ? void 0 : e.onSessionId(t)) && void 0 !== i ? i : () => {}
        }
        getSurveys(t, i) {
            void 0 === i && (i = !1), this.surveys.getSurveys(t, i)
        }
        getActiveMatchingSurveys(t, i) {
            void 0 === i && (i = !1), this.surveys.getActiveMatchingSurveys(t, i)
        }
        renderSurvey(t, i) {
            this.surveys.renderSurvey(t, i)
        }
        displaySurvey(t, i) {
            void 0 === i && (i = jn), this.surveys.displaySurvey(t, i)
        }
        canRenderSurvey(t) {
            return this.surveys.canRenderSurvey(t)
        }
        canRenderSurveyAsync(t, i) {
            return void 0 === i && (i = !1), this.surveys.canRenderSurveyAsync(t, i)
        }
        identify(t, i, e) {
            if (!this.__loaded || !this.persistence) return $t.uninitializedWarning("posthog.identify");
            if (j(t) && (t = t.toString(), $t.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), t)
                if (["distinct_id", "distinctid"].includes(t.toLowerCase())) $t.critical('The string "' + t + '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.');
                else if (t !== yi) {
                if (this.Hr("posthog.identify")) {
                    var r = this.get_distinct_id();
                    if (this.register({
                            $user_id: t
                        }), !this.get_property("$device_id")) {
                        var s = r;
                        this.register_once({
                            $had_persisted_distinct_id: !0,
                            $device_id: s
                        }, "")
                    }
                    t !== r && t !== this.get_property(qt) && (this.unregister(qt), this.register({
                        distinct_id: t
                    }));
                    var n = "anonymous" === (this.persistence.get_property(vi) || "anonymous");
                    t !== r && n ? (this.persistence.set_property(vi, "identified"), this.setPersonPropertiesForFlags(g({}, e || {}, i || {}), !1), this.capture("$identify", {
                        distinct_id: t,
                        $anon_distinct_id: r
                    }, {
                        $set: i || {},
                        $set_once: e || {}
                    }), this.kr = ln(t, i, e), this.featureFlags.setAnonymousDistinctId(r)) : (i || e) && this.setPersonProperties(i, e), t !== r && (this.reloadFeatureFlags(), this.unregister(hi))
                }
            } else $t.critical('The string "' + yi + '" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.');
            else $t.error("Unique user id has not been set in posthog.identify")
        }
        setPersonProperties(t, i) {
            if ((t || i) && this.Hr("posthog.setPersonProperties")) {
                var e = ln(this.get_distinct_id(), t, i);
                this.kr !== e ? (this.setPersonPropertiesForFlags(g({}, i || {}, t || {})), this.capture("$set", {
                    $set: t || {},
                    $set_once: i || {}
                }), this.kr = e) : $t.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.")
            }
        }
        group(t, i, e) {
            if (t && i) {
                if (this.Hr("posthog.group")) {
                    var r = this.getGroups();
                    r[t] !== i && this.resetGroupPropertiesForFlags(t), this.register({
                        $groups: g({}, r, {
                            [t]: i
                        })
                    }), e && (this.capture("$groupidentify", {
                        $group_type: t,
                        $group_key: i,
                        $group_set: e
                    }), this.setGroupPropertiesForFlags({
                        [t]: e
                    })), r[t] === i || e || this.reloadFeatureFlags()
                }
            } else $t.error("posthog.group requires a group type and group key")
        }
        resetGroups() {
            this.register({
                $groups: {}
            }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags()
        }
        setPersonPropertiesForFlags(t, i) {
            void 0 === i && (i = !0), this.featureFlags.setPersonPropertiesForFlags(t, i)
        }
        resetPersonPropertiesForFlags() {
            this.featureFlags.resetPersonPropertiesForFlags()
        }
        setGroupPropertiesForFlags(t, i) {
            void 0 === i && (i = !0), this.Hr("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(t, i)
        }
        resetGroupPropertiesForFlags(t) {
            this.featureFlags.resetGroupPropertiesForFlags(t)
        }
        reset(t) {
            var i, e, r, s;
            if ($t.info("reset"), !this.__loaded) return $t.uninitializedWarning("posthog.reset");
            var n = this.get_property("$device_id");
            if (this.consent.reset(), null == (i = this.persistence) || i.clear(), null == (e = this.sessionPersistence) || e.clear(), this.surveys.reset(), this.featureFlags.reset(), null == (r = this.persistence) || r.set_property(vi, "anonymous"), null == (s = this.sessionManager) || s.resetSessionId(), this.kr = null, "always" === this.config.cookieless_mode) this.register_once({
                distinct_id: yi,
                $device_id: null
            }, "");
            else {
                var o = this.config.get_device_id(ye());
                this.register_once({
                    distinct_id: o,
                    $device_id: t ? o : n
                }, "")
            }
            this.register({
                $last_posthog_reset: (new Date).toISOString()
            }, 1)
        }
        get_distinct_id() {
            return this.get_property("distinct_id")
        }
        getGroups() {
            return this.get_property("$groups") || {}
        }
        get_session_id() {
            var t, i;
            return null !== (t = null == (i = this.sessionManager) ? void 0 : i.checkAndGetSessionAndWindowId(!0).sessionId) && void 0 !== t ? t : ""
        }
        get_session_replay_url(t) {
            if (!this.sessionManager) return "";
            var {
                sessionId: i,
                sessionStartTimestamp: e
            } = this.sessionManager.checkAndGetSessionAndWindowId(!0), r = this.requestRouter.endpointFor("ui", "/project/" + this.config.token + "/replay/" + i);
            if (null != t && t.withTimestamp && e) {
                var s, n = null !== (s = t.timestampLookBack) && void 0 !== s ? s : 10;
                if (!e) return r;
                r += "?t=" + Math.max(Math.floor(((new Date).getTime() - e) / 1e3) - n, 0)
            }
            return r
        }
        alias(t, i) {
            return t === this.get_property(Bt) ? ($t.critical("Attempting to create alias for existing People user - aborting."), -2) : this.Hr("posthog.alias") ? (C(i) && (i = this.get_distinct_id()), t !== i ? (this.Br(qt, t), this.capture("$create_alias", {
                alias: t,
                distinct_id: i
            })) : ($t.warn("alias matches current distinct_id - skipping api call."), this.identify(t), -1)) : void 0
        }
        set_config(t) {
            var i = g({}, this.config);
            if (I(t)) {
                var e, r, s, n, o;
                Ot(this.config, wo(t));
                var a = this.Rr();
                null == (e = this.persistence) || e.update_config(this.config, i, a), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new En(g({}, this.config, {
                    persistence: "sessionStorage"
                }), a);
                var l = this.Pr(this.config.debug);
                D(l) && (this.config.debug = l), D(this.config.debug) && (this.config.debug ? (c.DEBUG = !0, ke.G() && ke.Y("ph_debug", "true"), $t.info("set_config", {
                    config: t,
                    oldConfig: i,
                    newConfig: g({}, this.config)
                })) : (c.DEBUG = !1, ke.G() && ke.X("ph_debug"))), null == (r = this.sessionRecording) || r.startIfEnabledOrStop(), null == (s = this.autocapture) || s.startIfEnabled(), null == (n = this.heatmaps) || n.startIfEnabled(), this.surveys.loadIfEnabled(), this.qr(), null == (o = this.externalIntegrations) || o.startIfEnabledOrStop()
            }
        }
        startSessionRecording(t) {
            var i = !0 === t,
                e = {
                    sampling: i || !(null == t || !t.sampling),
                    linked_flag: i || !(null == t || !t.linked_flag),
                    url_trigger: i || !(null == t || !t.url_trigger),
                    event_trigger: i || !(null == t || !t.event_trigger)
                };
            if (Object.values(e).some(Boolean)) {
                var r, s, n, o, a;
                if (null == (r = this.sessionManager) || r.checkAndGetSessionAndWindowId(), e.sampling) null == (s = this.sessionRecording) || s.overrideSampling();
                if (e.linked_flag) null == (n = this.sessionRecording) || n.overrideLinkedFlag();
                if (e.url_trigger) null == (o = this.sessionRecording) || o.overrideTrigger("url");
                if (e.event_trigger) null == (a = this.sessionRecording) || a.overrideTrigger("event")
            }
            this.set_config({
                disable_session_recording: !1
            })
        }
        stopSessionRecording() {
            this.set_config({
                disable_session_recording: !0
            })
        }
        sessionRecordingStarted() {
            var t;
            return !(null == (t = this.sessionRecording) || !t.started)
        }
        captureException(t, i) {
            var e = new Error("PostHog syntheticException"),
                r = this.exceptions.buildProperties(t, {
                    handled: !0,
                    syntheticException: e
                });
            return this.exceptions.sendExceptionEvent(g({}, r, i))
        }
        loadToolbar(t) {
            return this.toolbar.loadToolbar(t)
        }
        get_property(t) {
            var i;
            return null == (i = this.persistence) ? void 0 : i.props[t]
        }
        getSessionProperty(t) {
            var i;
            return null == (i = this.sessionPersistence) ? void 0 : i.props[t]
        }
        toString() {
            var t, i = null !== (t = this.config.name) && void 0 !== t ? t : mo;
            return i !== mo && (i = mo + "." + i), i
        }
        _isIdentified() {
            var t, i;
            return "identified" === (null == (t = this.persistence) ? void 0 : t.get_property(vi)) || "identified" === (null == (i = this.sessionPersistence) ? void 0 : i.get_property(vi))
        }
        zr() {
            var t, i;
            return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && R(this.getGroups()) && (null == (t = this.persistence) || null == (t = t.props) || !t[qt]) && (null == (i = this.persistence) || null == (i = i.props) || !i[_i]))
        }
        Lr() {
            return !0 === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && (!0 === this.config.capture_pageview || "history_change" === this.config.capture_pageview)
        }
        createPersonProfile() {
            this.zr() || this.Hr("posthog.createPersonProfile") && this.setPersonProperties({}, {})
        }
        Hr(t) {
            return "never" === this.config.person_profiles ? ($t.error(t + ' was called, but process_person is set to "never". This call will be ignored.'), !1) : (this.Br(_i, !0), !0)
        }
        Rr() {
            if ("always" === this.config.cookieless_mode) return !0;
            var t = this.consent.isOptedOut(),
                i = this.config.opt_out_persistence_by_default || "on_reject" === this.config.cookieless_mode;
            return this.config.disable_persistence || t && !!i
        }
        qr() {
            var t, i, e, r, s = this.Rr();
            (null == (t = this.persistence) ? void 0 : t.$i) !== s && (null == (e = this.persistence) || e.set_disabled(s));
            (null == (i = this.sessionPersistence) ? void 0 : i.$i) !== s && (null == (r = this.sessionPersistence) || r.set_disabled(s));
            return s
        }
        opt_in_capturing(t) {
            if ("always" !== this.config.cookieless_mode) {
                var i, e;
                if ("on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut()) this.reset(!0), null == (i = this.sessionManager) || i.destroy(), this.sessionManager = new Xn(this), this.persistence && (this.sessionPropsManager = new Kn(this, this.sessionManager, this.persistence)), this.sessionRecording = new po(this), this.sessionRecording.startIfEnabledOrStop();
                if (this.consent.optInOut(!0), this.qr(), this.jr(), "on_reject" == this.config.cookieless_mode && this.surveys.loadIfEnabled(), C(null == t ? void 0 : t.captureEventName) || null != t && t.captureEventName) this.capture(null !== (e = null == t ? void 0 : t.captureEventName) && void 0 !== e ? e : "$opt_in", null == t ? void 0 : t.captureProperties, {
                    send_instantly: !0
                });
                this.config.capture_pageview && this.Dr()
            } else $t.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored')
        }
        opt_out_capturing() {
            var t, i;
            "always" !== this.config.cookieless_mode ? ("on_reject" === this.config.cookieless_mode && this.consent.isOptedIn() && this.reset(!0), this.consent.optInOut(!1), this.qr(), "on_reject" === this.config.cookieless_mode && (this.register({
                distinct_id: yi,
                $device_id: null
            }), null == (t = this.sessionManager) || t.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, null == (i = this.sessionRecording) || i.stopRecording(), this.sessionRecording = void 0, this.Dr())) : $t.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored')
        }
        has_opted_in_capturing() {
            return this.consent.isOptedIn()
        }
        has_opted_out_capturing() {
            return this.consent.isOptedOut()
        }
        get_explicit_consent_status() {
            var t = this.consent.consent;
            return t === Fe.GRANTED ? "granted" : t === Fe.DENIED ? "denied" : "pending"
        }
        is_capturing() {
            return "always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isExplicitlyOptedOut() || this.consent.isOptedIn() : !this.has_opted_out_capturing())
        }
        clear_opt_in_out_capturing() {
            this.consent.reset(), this.qr()
        }
        _is_bot() {
            return n ? ro(n, this.config.custom_blocked_useragents) : void 0
        }
        Dr() {
            o && ("visible" === o.visibilityState ? this.Sr || (this.Sr = !0, this.capture("$pageview", {
                title: o.title
            }, {
                send_instantly: !0
            }), this.Er && (o.removeEventListener("visibilitychange", this.Er), this.Er = null)) : this.Er || (this.Er = this.Dr.bind(this), Ht(o, "visibilitychange", this.Er)))
        }
        debug(i) {
            !1 === i ? (null == t || t.console.log("You've disabled debug mode."), this.set_config({
                debug: !1
            })) : (null == t || t.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({
                debug: !0
            }))
        }
        L() {
            var t, i, e, r, s, n, o, a = this.Tr || {};
            return "advanced_disable_flags" in a ? !!a.advanced_disable_flags : !1 !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : !0 === this.config.advanced_disable_decide ? ($t.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), !0) : (e = "advanced_disable_decide", r = !1, s = $t, n = (i = "advanced_disable_flags") in (t = a) && !C(t[i]), o = e in t && !C(t[e]), n ? t[i] : o ? (s && s.warn("Config field '" + e + "' is deprecated. Please use '" + i + "' instead. The old field will be removed in a future major version."), t[e]) : r)
        }
        Ur(t) {
            if (A(this.config.before_send)) return t;
            var i = P(this.config.before_send) ? this.config.before_send : [this.config.before_send],
                e = t;
            for (var r of i) {
                if (e = r(e), A(e)) {
                    var s = "Event '" + t.event + "' was rejected in beforeSend function";
                    return N(t.event) ? $t.warn(s + ". This can cause unexpected behavior.") : $t.info(s), null
                }
                e.properties && !R(e.properties) || $t.warn("Event '" + t.event + "' has no properties after beforeSend function, this is likely an error.")
            }
            return e
        }
        getPageViewId() {
            var t;
            return null == (t = this.pageViewManager.Xt) ? void 0 : t.pageViewId
        }
        captureTraceFeedback(t, i) {
            this.capture("$ai_feedback", {
                $ai_trace_id: String(t),
                $ai_feedback_text: i
            })
        }
        captureTraceMetric(t, i, e) {
            this.capture("$ai_metric", {
                $ai_trace_id: String(t),
                $ai_metric_name: i,
                $ai_metric_value: String(e)
            })
        }
        Pr(t) {
            var i = D(t) && !t,
                e = ke.G() && "true" === ke.J("ph_debug");
            return !i && (!!e || t)
        }
    }! function(t, i) {
        for (var e = 0; e < i.length; e++) t.prototype[i[e]] = jt(t.prototype[i[e]])
    }(xo, ["identify"]);
    var Eo, $o;
    Eo = go[mo] = new xo, ($o = d.posthog) && Ct($o._i, (function(t) {
            if (t && P(t)) {
                var i = Eo.init(t[0], t[1], t[2]),
                    e = $o[t[2]] || $o;
                i && (i._execute_array.call(i.people, e.people), i._execute_array(e))
            }
        })), d.posthog = Eo,
        function() {
            function i() {
                i.done || (i.done = !0, yo = !1, Ct(go, (function(t) {
                    t._dom_loaded()
                })))
            }
            null != o && o.addEventListener ? "complete" === o.readyState ? i() : Ht(o, "DOMContentLoaded", i, {
                capture: !1
            }) : t && $t.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized")
        }()
}();
//# sourceMappingURL=array.js.map

//# chunkId=019a18e8-d92f-7f13-863e-bd9950ac3798
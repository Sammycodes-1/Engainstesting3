//Properjs
/**
 * @popperjs/core v2.11.8 - MIT License
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Popper =
          {})
      );
})(this, function (e) {
  "use strict";
  function t(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function n(e) {
    return e instanceof t(e).Element || e instanceof Element;
  }
  function r(e) {
    return e instanceof t(e).HTMLElement || e instanceof HTMLElement;
  }
  function o(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var i = Math.max,
    a = Math.min,
    s = Math.round;
  function f() {
    var e = navigator.userAgentData;
    return null != e && e.brands && Array.isArray(e.brands)
      ? e.brands
          .map(function (e) {
            return e.brand + "/" + e.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function c() {
    return !/^((?!chrome|android).)*safari/i.test(f());
  }
  function p(e, o, i) {
    void 0 === o && (o = !1), void 0 === i && (i = !1);
    var a = e.getBoundingClientRect(),
      f = 1,
      p = 1;
    o &&
      r(e) &&
      ((f = (e.offsetWidth > 0 && s(a.width) / e.offsetWidth) || 1),
      (p = (e.offsetHeight > 0 && s(a.height) / e.offsetHeight) || 1));
    var u = (n(e) ? t(e) : window).visualViewport,
      l = !c() && i,
      d = (a.left + (l && u ? u.offsetLeft : 0)) / f,
      h = (a.top + (l && u ? u.offsetTop : 0)) / p,
      m = a.width / f,
      v = a.height / p;
    return {
      width: m,
      height: v,
      top: h,
      right: d + m,
      bottom: h + v,
      left: d,
      x: d,
      y: h,
    };
  }
  function u(e) {
    var n = t(e);
    return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
  }
  function l(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function d(e) {
    return (
      (n(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement;
  }
  function h(e) {
    return p(d(e)).left + u(e).scrollLeft;
  }
  function m(e) {
    return t(e).getComputedStyle(e);
  }
  function v(e) {
    var t = m(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function y(e, n, o) {
    void 0 === o && (o = !1);
    var i,
      a,
      f = r(n),
      c =
        r(n) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = s(t.width) / e.offsetWidth || 1,
            r = s(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(n),
      m = d(n),
      y = p(e, c, o),
      g = { scrollLeft: 0, scrollTop: 0 },
      b = { x: 0, y: 0 };
    return (
      (f || (!f && !o)) &&
        (("body" !== l(n) || v(m)) &&
          (g =
            (i = n) !== t(i) && r(i)
              ? { scrollLeft: (a = i).scrollLeft, scrollTop: a.scrollTop }
              : u(i)),
        r(n)
          ? (((b = p(n, !0)).x += n.clientLeft), (b.y += n.clientTop))
          : m && (b.x = h(m))),
      {
        x: y.left + g.scrollLeft - b.x,
        y: y.top + g.scrollTop - b.y,
        width: y.width,
        height: y.height,
      }
    );
  }
  function g(e) {
    var t = p(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function b(e) {
    return "html" === l(e)
      ? e
      : e.assignedSlot || e.parentNode || (o(e) ? e.host : null) || d(e);
  }
  function x(e) {
    return ["html", "body", "#document"].indexOf(l(e)) >= 0
      ? e.ownerDocument.body
      : r(e) && v(e)
      ? e
      : x(b(e));
  }
  function w(e, n) {
    var r;
    void 0 === n && (n = []);
    var o = x(e),
      i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
      a = t(o),
      s = i ? [a].concat(a.visualViewport || [], v(o) ? o : []) : o,
      f = n.concat(s);
    return i ? f : f.concat(w(b(s)));
  }
  function O(e) {
    return ["table", "td", "th"].indexOf(l(e)) >= 0;
  }
  function j(e) {
    return r(e) && "fixed" !== m(e).position ? e.offsetParent : null;
  }
  function E(e) {
    for (var n = t(e), i = j(e); i && O(i) && "static" === m(i).position; )
      i = j(i);
    return i &&
      ("html" === l(i) || ("body" === l(i) && "static" === m(i).position))
      ? n
      : i ||
          (function (e) {
            var t = /firefox/i.test(f());
            if (/Trident/i.test(f()) && r(e) && "fixed" === m(e).position)
              return null;
            var n = b(e);
            for (
              o(n) && (n = n.host);
              r(n) && ["html", "body"].indexOf(l(n)) < 0;

            ) {
              var i = m(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          n;
  }
  var D = "top",
    A = "bottom",
    L = "right",
    P = "left",
    M = "auto",
    k = [D, A, L, P],
    W = "start",
    B = "end",
    H = "viewport",
    T = "popper",
    R = k.reduce(function (e, t) {
      return e.concat([t + "-" + W, t + "-" + B]);
    }, []),
    S = [].concat(k, [M]).reduce(function (e, t) {
      return e.concat([t, t + "-" + W, t + "-" + B]);
    }, []),
    V = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function q(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function o(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && o(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || o(e);
      }),
      r
    );
  }
  function C(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && o(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function N(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function I(e, r, o) {
    return r === H
      ? N(
          (function (e, n) {
            var r = t(e),
              o = d(e),
              i = r.visualViewport,
              a = o.clientWidth,
              s = o.clientHeight,
              f = 0,
              p = 0;
            if (i) {
              (a = i.width), (s = i.height);
              var u = c();
              (u || (!u && "fixed" === n)) &&
                ((f = i.offsetLeft), (p = i.offsetTop));
            }
            return { width: a, height: s, x: f + h(e), y: p };
          })(e, o)
        )
      : n(r)
      ? (function (e, t) {
          var n = p(e, !1, "fixed" === t);
          return (
            (n.top = n.top + e.clientTop),
            (n.left = n.left + e.clientLeft),
            (n.bottom = n.top + e.clientHeight),
            (n.right = n.left + e.clientWidth),
            (n.width = e.clientWidth),
            (n.height = e.clientHeight),
            (n.x = n.left),
            (n.y = n.top),
            n
          );
        })(r, o)
      : N(
          (function (e) {
            var t,
              n = d(e),
              r = u(e),
              o = null == (t = e.ownerDocument) ? void 0 : t.body,
              a = i(
                n.scrollWidth,
                n.clientWidth,
                o ? o.scrollWidth : 0,
                o ? o.clientWidth : 0
              ),
              s = i(
                n.scrollHeight,
                n.clientHeight,
                o ? o.scrollHeight : 0,
                o ? o.clientHeight : 0
              ),
              f = -r.scrollLeft + h(e),
              c = -r.scrollTop;
            return (
              "rtl" === m(o || n).direction &&
                (f += i(n.clientWidth, o ? o.clientWidth : 0) - a),
              { width: a, height: s, x: f, y: c }
            );
          })(d(e))
        );
  }
  function _(e, t, o, s) {
    var f =
        "clippingParents" === t
          ? (function (e) {
              var t = w(b(e)),
                o =
                  ["absolute", "fixed"].indexOf(m(e).position) >= 0 && r(e)
                    ? E(e)
                    : e;
              return n(o)
                ? t.filter(function (e) {
                    return n(e) && C(e, o) && "body" !== l(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      c = [].concat(f, [o]),
      p = c[0],
      u = c.reduce(function (t, n) {
        var r = I(e, n, s);
        return (
          (t.top = i(r.top, t.top)),
          (t.right = a(r.right, t.right)),
          (t.bottom = a(r.bottom, t.bottom)),
          (t.left = i(r.left, t.left)),
          t
        );
      }, I(e, p, s));
    return (
      (u.width = u.right - u.left),
      (u.height = u.bottom - u.top),
      (u.x = u.left),
      (u.y = u.top),
      u
    );
  }
  function F(e) {
    return e.split("-")[0];
  }
  function U(e) {
    return e.split("-")[1];
  }
  function z(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function X(e) {
    var t,
      n = e.reference,
      r = e.element,
      o = e.placement,
      i = o ? F(o) : null,
      a = o ? U(o) : null,
      s = n.x + n.width / 2 - r.width / 2,
      f = n.y + n.height / 2 - r.height / 2;
    switch (i) {
      case D:
        t = { x: s, y: n.y - r.height };
        break;
      case A:
        t = { x: s, y: n.y + n.height };
        break;
      case L:
        t = { x: n.x + n.width, y: f };
        break;
      case P:
        t = { x: n.x - r.width, y: f };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = i ? z(i) : null;
    if (null != c) {
      var p = "y" === c ? "height" : "width";
      switch (a) {
        case W:
          t[c] = t[c] - (n[p] / 2 - r[p] / 2);
          break;
        case B:
          t[c] = t[c] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  function Y(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function G(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function J(e, t) {
    void 0 === t && (t = {});
    var r = t,
      o = r.placement,
      i = void 0 === o ? e.placement : o,
      a = r.strategy,
      s = void 0 === a ? e.strategy : a,
      f = r.boundary,
      c = void 0 === f ? "clippingParents" : f,
      u = r.rootBoundary,
      l = void 0 === u ? H : u,
      h = r.elementContext,
      m = void 0 === h ? T : h,
      v = r.altBoundary,
      y = void 0 !== v && v,
      g = r.padding,
      b = void 0 === g ? 0 : g,
      x = Y("number" != typeof b ? b : G(b, k)),
      w = m === T ? "reference" : T,
      O = e.rects.popper,
      j = e.elements[y ? w : m],
      E = _(n(j) ? j : j.contextElement || d(e.elements.popper), c, l, s),
      P = p(e.elements.reference),
      M = X({ reference: P, element: O, strategy: "absolute", placement: i }),
      W = N(Object.assign({}, O, M)),
      B = m === T ? W : P,
      R = {
        top: E.top - B.top + x.top,
        bottom: B.bottom - E.bottom + x.bottom,
        left: E.left - B.left + x.left,
        right: B.right - E.right + x.right,
      },
      S = e.modifiersData.offset;
    if (m === T && S) {
      var V = S[i];
      Object.keys(R).forEach(function (e) {
        var t = [L, A].indexOf(e) >= 0 ? 1 : -1,
          n = [D, A].indexOf(e) >= 0 ? "y" : "x";
        R[e] += V[n] * t;
      });
    }
    return R;
  }
  var K = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Q() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function Z(e) {
    void 0 === e && (e = {});
    var t = e,
      r = t.defaultModifiers,
      o = void 0 === r ? [] : r,
      i = t.defaultOptions,
      a = void 0 === i ? K : i;
    return function (e, t, r) {
      void 0 === r && (r = a);
      var i,
        s,
        f = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, K, a),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        p = !1,
        u = {
          state: f,
          setOptions: function (r) {
            var i = "function" == typeof r ? r(f.options) : r;
            l(),
              (f.options = Object.assign({}, a, f.options, i)),
              (f.scrollParents = {
                reference: n(e)
                  ? w(e)
                  : e.contextElement
                  ? w(e.contextElement)
                  : [],
                popper: w(t),
              });
            var s,
              p,
              d = (function (e) {
                var t = q(e);
                return V.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(o, f.options.modifiers)),
                (p = s.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(p).map(function (e) {
                  return p[e];
                }))
              );
            return (
              (f.orderedModifiers = d.filter(function (e) {
                return e.enabled;
              })),
              f.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect;
                if ("function" == typeof o) {
                  var i = o({ state: f, name: t, instance: u, options: r }),
                    a = function () {};
                  c.push(i || a);
                }
              }),
              u.update()
            );
          },
          forceUpdate: function () {
            if (!p) {
              var e = f.elements,
                t = e.reference,
                n = e.popper;
              if (Q(t, n)) {
                (f.rects = {
                  reference: y(t, E(n), "fixed" === f.options.strategy),
                  popper: g(n),
                }),
                  (f.reset = !1),
                  (f.placement = f.options.placement),
                  f.orderedModifiers.forEach(function (e) {
                    return (f.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < f.orderedModifiers.length; r++)
                  if (!0 !== f.reset) {
                    var o = f.orderedModifiers[r],
                      i = o.fn,
                      a = o.options,
                      s = void 0 === a ? {} : a,
                      c = o.name;
                    "function" == typeof i &&
                      (f =
                        i({ state: f, options: s, name: c, instance: u }) || f);
                  } else (f.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(f);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            l(), (p = !0);
          },
        };
      if (!Q(e, t)) return u;
      function l() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        u.setOptions(r).then(function (e) {
          !p && r.onFirstUpdate && r.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  var $ = { passive: !0 };
  var ee = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var n = e.state,
        r = e.instance,
        o = e.options,
        i = o.scroll,
        a = void 0 === i || i,
        s = o.resize,
        f = void 0 === s || s,
        c = t(n.elements.popper),
        p = [].concat(n.scrollParents.reference, n.scrollParents.popper);
      return (
        a &&
          p.forEach(function (e) {
            e.addEventListener("scroll", r.update, $);
          }),
        f && c.addEventListener("resize", r.update, $),
        function () {
          a &&
            p.forEach(function (e) {
              e.removeEventListener("scroll", r.update, $);
            }),
            f && c.removeEventListener("resize", r.update, $);
        }
      );
    },
    data: {},
  };
  var te = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (e) {
        var t = e.state,
          n = e.name;
        t.modifiersData[n] = X({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement,
        });
      },
      data: {},
    },
    ne = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function re(e) {
    var n,
      r = e.popper,
      o = e.popperRect,
      i = e.placement,
      a = e.variation,
      f = e.offsets,
      c = e.position,
      p = e.gpuAcceleration,
      u = e.adaptive,
      l = e.roundOffsets,
      h = e.isFixed,
      v = f.x,
      y = void 0 === v ? 0 : v,
      g = f.y,
      b = void 0 === g ? 0 : g,
      x = "function" == typeof l ? l({ x: y, y: b }) : { x: y, y: b };
    (y = x.x), (b = x.y);
    var w = f.hasOwnProperty("x"),
      O = f.hasOwnProperty("y"),
      j = P,
      M = D,
      k = window;
    if (u) {
      var W = E(r),
        H = "clientHeight",
        T = "clientWidth";
      if (
        (W === t(r) &&
          "static" !== m((W = d(r))).position &&
          "absolute" === c &&
          ((H = "scrollHeight"), (T = "scrollWidth")),
        (W = W),
        i === D || ((i === P || i === L) && a === B))
      )
        (M = A),
          (b -=
            (h && W === k && k.visualViewport
              ? k.visualViewport.height
              : W[H]) - o.height),
          (b *= p ? 1 : -1);
      if (i === P || ((i === D || i === A) && a === B))
        (j = L),
          (y -=
            (h && W === k && k.visualViewport ? k.visualViewport.width : W[T]) -
            o.width),
          (y *= p ? 1 : -1);
    }
    var R,
      S = Object.assign({ position: c }, u && ne),
      V =
        !0 === l
          ? (function (e, t) {
              var n = e.x,
                r = e.y,
                o = t.devicePixelRatio || 1;
              return { x: s(n * o) / o || 0, y: s(r * o) / o || 0 };
            })({ x: y, y: b }, t(r))
          : { x: y, y: b };
    return (
      (y = V.x),
      (b = V.y),
      p
        ? Object.assign(
            {},
            S,
            (((R = {})[M] = O ? "0" : ""),
            (R[j] = w ? "0" : ""),
            (R.transform =
              (k.devicePixelRatio || 1) <= 1
                ? "translate(" + y + "px, " + b + "px)"
                : "translate3d(" + y + "px, " + b + "px, 0)"),
            R)
          )
        : Object.assign(
            {},
            S,
            (((n = {})[M] = O ? b + "px" : ""),
            (n[j] = w ? y + "px" : ""),
            (n.transform = ""),
            n)
          )
    );
  }
  var oe = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        o = void 0 === r || r,
        i = n.adaptive,
        a = void 0 === i || i,
        s = n.roundOffsets,
        f = void 0 === s || s,
        c = {
          placement: F(t.placement),
          variation: U(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: o,
          isFixed: "fixed" === t.options.strategy,
        };
      null != t.modifiersData.popperOffsets &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          re(
            Object.assign({}, c, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: a,
              roundOffsets: f,
            })
          )
        )),
        null != t.modifiersData.arrow &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            re(
              Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: f,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement,
        }));
    },
    data: {},
  };
  var ie = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          o = t.attributes[e] || {},
          i = t.elements[e];
        r(i) &&
          l(i) &&
          (Object.assign(i.style, n),
          Object.keys(o).forEach(function (e) {
            var t = o[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var o = t.elements[e],
              i = t.attributes[e] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            r(o) &&
              l(o) &&
              (Object.assign(o.style, a),
              Object.keys(i).forEach(function (e) {
                o.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  var ae = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.offset,
          i = void 0 === o ? [0, 0] : o,
          a = S.reduce(function (e, n) {
            return (
              (e[n] = (function (e, t, n) {
                var r = F(e),
                  o = [P, D].indexOf(r) >= 0 ? -1 : 1,
                  i =
                    "function" == typeof n
                      ? n(Object.assign({}, t, { placement: e }))
                      : n,
                  a = i[0],
                  s = i[1];
                return (
                  (a = a || 0),
                  (s = (s || 0) * o),
                  [P, L].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
                );
              })(n, t.rects, i)),
              e
            );
          }, {}),
          s = a[t.placement],
          f = s.x,
          c = s.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += f),
          (t.modifiersData.popperOffsets.y += c)),
          (t.modifiersData[r] = a);
      },
    },
    se = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function fe(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return se[e];
    });
  }
  var ce = { start: "end", end: "start" };
  function pe(e) {
    return e.replace(/start|end/g, function (e) {
      return ce[e];
    });
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      o = n.boundary,
      i = n.rootBoundary,
      a = n.padding,
      s = n.flipVariations,
      f = n.allowedAutoPlacements,
      c = void 0 === f ? S : f,
      p = U(r),
      u = p
        ? s
          ? R
          : R.filter(function (e) {
              return U(e) === p;
            })
        : k,
      l = u.filter(function (e) {
        return c.indexOf(e) >= 0;
      });
    0 === l.length && (l = u);
    var d = l.reduce(function (t, n) {
      return (
        (t[n] = J(e, {
          placement: n,
          boundary: o,
          rootBoundary: i,
          padding: a,
        })[F(n)]),
        t
      );
    }, {});
    return Object.keys(d).sort(function (e, t) {
      return d[e] - d[t];
    });
  }
  var le = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 === a || a,
            f = n.fallbackPlacements,
            c = n.padding,
            p = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.flipVariations,
            h = void 0 === d || d,
            m = n.allowedAutoPlacements,
            v = t.options.placement,
            y = F(v),
            g =
              f ||
              (y === v || !h
                ? [fe(v)]
                : (function (e) {
                    if (F(e) === M) return [];
                    var t = fe(e);
                    return [pe(e), t, pe(t)];
                  })(v)),
            b = [v].concat(g).reduce(function (e, n) {
              return e.concat(
                F(n) === M
                  ? ue(t, {
                      placement: n,
                      boundary: p,
                      rootBoundary: u,
                      padding: c,
                      flipVariations: h,
                      allowedAutoPlacements: m,
                    })
                  : n
              );
            }, []),
            x = t.rects.reference,
            w = t.rects.popper,
            O = new Map(),
            j = !0,
            E = b[0],
            k = 0;
          k < b.length;
          k++
        ) {
          var B = b[k],
            H = F(B),
            T = U(B) === W,
            R = [D, A].indexOf(H) >= 0,
            S = R ? "width" : "height",
            V = J(t, {
              placement: B,
              boundary: p,
              rootBoundary: u,
              altBoundary: l,
              padding: c,
            }),
            q = R ? (T ? L : P) : T ? A : D;
          x[S] > w[S] && (q = fe(q));
          var C = fe(q),
            N = [];
          if (
            (i && N.push(V[H] <= 0),
            s && N.push(V[q] <= 0, V[C] <= 0),
            N.every(function (e) {
              return e;
            }))
          ) {
            (E = B), (j = !1);
            break;
          }
          O.set(B, N);
        }
        if (j)
          for (
            var I = function (e) {
                var t = b.find(function (t) {
                  var n = O.get(t);
                  if (n)
                    return n.slice(0, e).every(function (e) {
                      return e;
                    });
                });
                if (t) return (E = t), "break";
              },
              _ = h ? 3 : 1;
            _ > 0;
            _--
          ) {
            if ("break" === I(_)) break;
          }
        t.placement !== E &&
          ((t.modifiersData[r]._skip = !0), (t.placement = E), (t.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function de(e, t, n) {
    return i(e, a(t, n));
  }
  var he = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        o = n.mainAxis,
        s = void 0 === o || o,
        f = n.altAxis,
        c = void 0 !== f && f,
        p = n.boundary,
        u = n.rootBoundary,
        l = n.altBoundary,
        d = n.padding,
        h = n.tether,
        m = void 0 === h || h,
        v = n.tetherOffset,
        y = void 0 === v ? 0 : v,
        b = J(t, { boundary: p, rootBoundary: u, padding: d, altBoundary: l }),
        x = F(t.placement),
        w = U(t.placement),
        O = !w,
        j = z(x),
        M = "x" === j ? "y" : "x",
        k = t.modifiersData.popperOffsets,
        B = t.rects.reference,
        H = t.rects.popper,
        T =
          "function" == typeof y
            ? y(Object.assign({}, t.rects, { placement: t.placement }))
            : y,
        R =
          "number" == typeof T
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        V = { x: 0, y: 0 };
      if (k) {
        if (s) {
          var q,
            C = "y" === j ? D : P,
            N = "y" === j ? A : L,
            I = "y" === j ? "height" : "width",
            _ = k[j],
            X = _ + b[C],
            Y = _ - b[N],
            G = m ? -H[I] / 2 : 0,
            K = w === W ? B[I] : H[I],
            Q = w === W ? -H[I] : -B[I],
            Z = t.elements.arrow,
            $ = m && Z ? g(Z) : { width: 0, height: 0 },
            ee = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            te = ee[C],
            ne = ee[N],
            re = de(0, B[I], $[I]),
            oe = O
              ? B[I] / 2 - G - re - te - R.mainAxis
              : K - re - te - R.mainAxis,
            ie = O
              ? -B[I] / 2 + G + re + ne + R.mainAxis
              : Q + re + ne + R.mainAxis,
            ae = t.elements.arrow && E(t.elements.arrow),
            se = ae ? ("y" === j ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
            fe = null != (q = null == S ? void 0 : S[j]) ? q : 0,
            ce = _ + ie - fe,
            pe = de(m ? a(X, _ + oe - fe - se) : X, _, m ? i(Y, ce) : Y);
          (k[j] = pe), (V[j] = pe - _);
        }
        if (c) {
          var ue,
            le = "x" === j ? D : P,
            he = "x" === j ? A : L,
            me = k[M],
            ve = "y" === M ? "height" : "width",
            ye = me + b[le],
            ge = me - b[he],
            be = -1 !== [D, P].indexOf(x),
            xe = null != (ue = null == S ? void 0 : S[M]) ? ue : 0,
            we = be ? ye : me - B[ve] - H[ve] - xe + R.altAxis,
            Oe = be ? me + B[ve] + H[ve] - xe - R.altAxis : ge,
            je =
              m && be
                ? (function (e, t, n) {
                    var r = de(e, t, n);
                    return r > n ? n : r;
                  })(we, me, Oe)
                : de(m ? we : ye, me, m ? Oe : ge);
          (k[M] = je), (V[M] = je - me);
        }
        t.modifiersData[r] = V;
      }
    },
    requiresIfExists: ["offset"],
  };
  var me = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        r = e.name,
        o = e.options,
        i = n.elements.arrow,
        a = n.modifiersData.popperOffsets,
        s = F(n.placement),
        f = z(s),
        c = [P, L].indexOf(s) >= 0 ? "height" : "width";
      if (i && a) {
        var p = (function (e, t) {
            return Y(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : G(e, k)
            );
          })(o.padding, n),
          u = g(i),
          l = "y" === f ? D : P,
          d = "y" === f ? A : L,
          h =
            n.rects.reference[c] +
            n.rects.reference[f] -
            a[f] -
            n.rects.popper[c],
          m = a[f] - n.rects.reference[f],
          v = E(i),
          y = v ? ("y" === f ? v.clientHeight || 0 : v.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          x = p[l],
          w = y - u[c] - p[d],
          O = y / 2 - u[c] / 2 + b,
          j = de(x, O, w),
          M = f;
        n.modifiersData[r] = (((t = {})[M] = j), (t.centerOffset = j - O), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        r = void 0 === n ? "[data-popper-arrow]" : n;
      null != r &&
        ("string" != typeof r || (r = t.elements.popper.querySelector(r))) &&
        C(t.elements.popper, r) &&
        (t.elements.arrow = r);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function ve(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function ye(e) {
    return [D, L, A, P].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ge = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (e) {
        var t = e.state,
          n = e.name,
          r = t.rects.reference,
          o = t.rects.popper,
          i = t.modifiersData.preventOverflow,
          a = J(t, { elementContext: "reference" }),
          s = J(t, { altBoundary: !0 }),
          f = ve(a, r),
          c = ve(s, o, i),
          p = ye(f),
          u = ye(c);
        (t.modifiersData[n] = {
          referenceClippingOffsets: f,
          popperEscapeOffsets: c,
          isReferenceHidden: p,
          hasPopperEscaped: u,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": p,
            "data-popper-escaped": u,
          }));
      },
    },
    be = Z({ defaultModifiers: [ee, te, oe, ie] }),
    xe = [ee, te, oe, ie, ae, le, he, me, ge],
    we = Z({ defaultModifiers: xe });
  (e.applyStyles = ie),
    (e.arrow = me),
    (e.computeStyles = oe),
    (e.createPopper = we),
    (e.createPopperLite = be),
    (e.defaultModifiers = xe),
    (e.detectOverflow = J),
    (e.eventListeners = ee),
    (e.flip = le),
    (e.hide = ge),
    (e.offset = ae),
    (e.popperGenerator = Z),
    (e.popperOffsets = te),
    (e.preventOverflow = he),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=popper.min.js.map

// Bootstrap
/*!
 * Bootstrap v5.3.0 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
        e(t.Popper));
})(this, function (t) {
  "use strict";
  function e(t) {
    const e = Object.create(null, {
      [Symbol.toStringTag]: { value: "Module" },
    });
    if (t)
      for (const s in t)
        if ("default" !== s) {
          const i = Object.getOwnPropertyDescriptor(t, s);
          Object.defineProperty(
            e,
            s,
            i.get ? i : { enumerable: !0, get: () => t[s] }
          );
        }
    return (e.default = t), Object.freeze(e);
  }
  const s = e(t),
    i = new Map(),
    n = {
      set(t, e, s) {
        i.has(t) || i.set(t, new Map());
        const n = i.get(t);
        n.has(e) || 0 === n.size
          ? n.set(e, s)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(n.keys())[0]
              }.`
            );
      },
      get: (t, e) => (i.has(t) && i.get(t).get(e)) || null,
      remove(t, e) {
        if (!i.has(t)) return;
        const s = i.get(t);
        s.delete(e), 0 === s.size && i.delete(t);
      },
    },
    o = "transitionend",
    r = (t) => (
      t &&
        window.CSS &&
        window.CSS.escape &&
        (t = t.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)),
      t
    ),
    a = (t) => {
      t.dispatchEvent(new Event(o));
    },
    l = (t) =>
      !(!t || "object" != typeof t) &&
      (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
    c = (t) =>
      l(t)
        ? t.jquery
          ? t[0]
          : t
        : "string" == typeof t && t.length > 0
        ? document.querySelector(r(t))
        : null,
    h = (t) => {
      if (!l(t) || 0 === t.getClientRects().length) return !1;
      const e =
          "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        s = t.closest("details:not([open])");
      if (!s) return e;
      if (s !== t) {
        const e = t.closest("summary");
        if (e && e.parentNode !== s) return !1;
        if (null === e) return !1;
      }
      return e;
    },
    d = (t) =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains("disabled") ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
    u = (t) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? u(t.parentNode)
        : null;
    },
    _ = () => {},
    g = (t) => {
      t.offsetHeight;
    },
    f = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    m = [],
    p = () => "rtl" === document.documentElement.dir,
    b = (t) => {
      var e;
      (e = () => {
        const e = f();
        if (e) {
          const s = t.NAME,
            i = e.fn[s];
          (e.fn[s] = t.jQueryInterface),
            (e.fn[s].Constructor = t),
            (e.fn[s].noConflict = () => ((e.fn[s] = i), t.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? (m.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const t of m) t();
              }),
            m.push(e))
          : e();
    },
    v = (t, e = [], s = t) => ("function" == typeof t ? t(...e) : s),
    y = (t, e, s = !0) => {
      if (!s) return void v(t);
      const i =
        ((t) => {
          if (!t) return 0;
          let { transitionDuration: e, transitionDelay: s } =
            window.getComputedStyle(t);
          const i = Number.parseFloat(e),
            n = Number.parseFloat(s);
          return i || n
            ? ((e = e.split(",")[0]),
              (s = s.split(",")[0]),
              1e3 * (Number.parseFloat(e) + Number.parseFloat(s)))
            : 0;
        })(e) + 5;
      let n = !1;
      const r = ({ target: s }) => {
        s === e && ((n = !0), e.removeEventListener(o, r), v(t));
      };
      e.addEventListener(o, r),
        setTimeout(() => {
          n || a(e);
        }, i);
    },
    w = (t, e, s, i) => {
      const n = t.length;
      let o = t.indexOf(e);
      return -1 === o
        ? !s && i
          ? t[n - 1]
          : t[0]
        : ((o += s ? 1 : -1),
          i && (o = (o + n) % n),
          t[Math.max(0, Math.min(o, n - 1))]);
    },
    A = /[^.]*(?=\..*)\.|.*/,
    E = /\..*/,
    C = /::\d+$/,
    T = {};
  let k = 1;
  const S = { mouseenter: "mouseover", mouseleave: "mouseout" },
    L = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function O(t, e) {
    return (e && `${e}::${k++}`) || t.uidEvent || k++;
  }
  function I(t) {
    const e = O(t);
    return (t.uidEvent = e), (T[e] = T[e] || {}), T[e];
  }
  function D(t, e, s = null) {
    return Object.values(t).find(
      (t) => t.callable === e && t.delegationSelector === s
    );
  }
  function N(t, e, s) {
    const i = "string" == typeof e,
      n = i ? s : e || s;
    let o = j(t);
    return L.has(o) || (o = t), [i, n, o];
  }
  function P(t, e, s, i, n) {
    if ("string" != typeof e || !t) return;
    let [o, r, a] = N(e, s, i);
    if (e in S) {
      const t = (t) =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      r = t(r);
    }
    const l = I(t),
      c = l[a] || (l[a] = {}),
      h = D(c, r, o ? s : null);
    if (h) return void (h.oneOff = h.oneOff && n);
    const d = O(r, e.replace(A, "")),
      u = o
        ? (function (t, e, s) {
            return function i(n) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = n; r && r !== this; r = r.parentNode)
                for (const a of o)
                  if (a === r)
                    return (
                      $(n, { delegateTarget: r }),
                      i.oneOff && F.off(t, n.type, e, s),
                      s.apply(r, [n])
                    );
            };
          })(t, s, r)
        : (function (t, e) {
            return function s(i) {
              return (
                $(i, { delegateTarget: t }),
                s.oneOff && F.off(t, i.type, e),
                e.apply(t, [i])
              );
            };
          })(t, r);
    (u.delegationSelector = o ? s : null),
      (u.callable = r),
      (u.oneOff = n),
      (u.uidEvent = d),
      (c[d] = u),
      t.addEventListener(a, u, o);
  }
  function x(t, e, s, i, n) {
    const o = D(e[s], i, n);
    o && (t.removeEventListener(s, o, Boolean(n)), delete e[s][o.uidEvent]);
  }
  function M(t, e, s, i) {
    const n = e[s] || {};
    for (const [o, r] of Object.entries(n))
      o.includes(i) && x(t, e, s, r.callable, r.delegationSelector);
  }
  function j(t) {
    return (t = t.replace(E, "")), S[t] || t;
  }
  const F = {
    on(t, e, s, i) {
      P(t, e, s, i, !1);
    },
    one(t, e, s, i) {
      P(t, e, s, i, !0);
    },
    off(t, e, s, i) {
      if ("string" != typeof e || !t) return;
      const [n, o, r] = N(e, s, i),
        a = r !== e,
        l = I(t),
        c = l[r] || {},
        h = e.startsWith(".");
      if (void 0 === o) {
        if (h) for (const s of Object.keys(l)) M(t, l, s, e.slice(1));
        for (const [s, i] of Object.entries(c)) {
          const n = s.replace(C, "");
          (a && !e.includes(n)) || x(t, l, r, i.callable, i.delegationSelector);
        }
      } else {
        if (!Object.keys(c).length) return;
        x(t, l, r, o, n ? s : null);
      }
    },
    trigger(t, e, s) {
      if ("string" != typeof e || !t) return null;
      const i = f();
      let n = null,
        o = !0,
        r = !0,
        a = !1;
      e !== j(e) &&
        i &&
        ((n = i.Event(e, s)),
        i(t).trigger(n),
        (o = !n.isPropagationStopped()),
        (r = !n.isImmediatePropagationStopped()),
        (a = n.isDefaultPrevented()));
      const l = $(new Event(e, { bubbles: o, cancelable: !0 }), s);
      return (
        a && l.preventDefault(),
        r && t.dispatchEvent(l),
        l.defaultPrevented && n && n.preventDefault(),
        l
      );
    },
  };
  function $(t, e = {}) {
    for (const [s, i] of Object.entries(e))
      try {
        t[s] = i;
      } catch (e) {
        Object.defineProperty(t, s, { configurable: !0, get: () => i });
      }
    return t;
  }
  function z(t) {
    if ("true" === t) return !0;
    if ("false" === t) return !1;
    if (t === Number(t).toString()) return Number(t);
    if ("" === t || "null" === t) return null;
    if ("string" != typeof t) return t;
    try {
      return JSON.parse(decodeURIComponent(t));
    } catch (e) {
      return t;
    }
  }
  function H(t) {
    return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
  }
  const B = {
    setDataAttribute(t, e, s) {
      t.setAttribute(`data-bs-${H(e)}`, s);
    },
    removeDataAttribute(t, e) {
      t.removeAttribute(`data-bs-${H(e)}`);
    },
    getDataAttributes(t) {
      if (!t) return {};
      const e = {},
        s = Object.keys(t.dataset).filter(
          (t) => t.startsWith("bs") && !t.startsWith("bsConfig")
        );
      for (const i of s) {
        let s = i.replace(/^bs/, "");
        (s = s.charAt(0).toLowerCase() + s.slice(1, s.length)),
          (e[s] = z(t.dataset[i]));
      }
      return e;
    },
    getDataAttribute: (t, e) => z(t.getAttribute(`data-bs-${H(e)}`)),
  };
  class q {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return t;
    }
    _mergeConfigObj(t, e) {
      const s = l(e) ? B.getDataAttribute(e, "config") : {};
      return {
        ...this.constructor.Default,
        ...("object" == typeof s ? s : {}),
        ...(l(e) ? B.getDataAttributes(e) : {}),
        ...("object" == typeof t ? t : {}),
      };
    }
    _typeCheckConfig(t, e = this.constructor.DefaultType) {
      for (const [i, n] of Object.entries(e)) {
        const e = t[i],
          o = l(e)
            ? "element"
            : null == (s = e)
            ? `${s}`
            : Object.prototype.toString
                .call(s)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(n).test(o))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${n}".`
          );
      }
      var s;
    }
  }
  class W extends q {
    constructor(t, e) {
      super(),
        (t = c(t)) &&
          ((this._element = t),
          (this._config = this._getConfig(e)),
          n.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      n.remove(this._element, this.constructor.DATA_KEY),
        F.off(this._element, this.constructor.EVENT_KEY);
      for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
    }
    _queueCallback(t, e, s = !0) {
      y(t, e, s);
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t, this._element)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    static getInstance(t) {
      return n.get(c(t), this.DATA_KEY);
    }
    static getOrCreateInstance(t, e = {}) {
      return (
        this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
      );
    }
    static get VERSION() {
      return "5.3.0";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t) {
      return `${t}${this.EVENT_KEY}`;
    }
  }
  const R = (t) => {
      let e = t.getAttribute("data-bs-target");
      if (!e || "#" === e) {
        let s = t.getAttribute("href");
        if (!s || (!s.includes("#") && !s.startsWith("."))) return null;
        s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`),
          (e = s && "#" !== s ? s.trim() : null);
      }
      return r(e);
    },
    K = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
      parents(t, e) {
        const s = [];
        let i = t.parentNode.closest(e);
        for (; i; ) s.push(i), (i = i.parentNode.closest(e));
        return s;
      },
      prev(t, e) {
        let s = t.previousElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let s = t.nextElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.nextElementSibling;
        }
        return [];
      },
      focusableChildren(t) {
        const e = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((t) => `${t}:not([tabindex^="-"])`)
          .join(",");
        return this.find(e, t).filter((t) => !d(t) && h(t));
      },
      getSelectorFromElement(t) {
        const e = R(t);
        return e && K.findOne(e) ? e : null;
      },
      getElementFromSelector(t) {
        const e = R(t);
        return e ? K.findOne(e) : null;
      },
      getMultipleElementsFromSelector(t) {
        const e = R(t);
        return e ? K.find(e) : [];
      },
    },
    V = (t, e = "hide") => {
      const s = `click.dismiss${t.EVENT_KEY}`,
        i = t.NAME;
      F.on(document, s, `[data-bs-dismiss="${i}"]`, function (s) {
        if (
          (["A", "AREA"].includes(this.tagName) && s.preventDefault(), d(this))
        )
          return;
        const n = K.getElementFromSelector(this) || this.closest(`.${i}`);
        t.getOrCreateInstance(n)[e]();
      });
    };
  class Q extends W {
    static get NAME() {
      return "alert";
    }
    close() {
      if (F.trigger(this._element, "close.bs.alert").defaultPrevented) return;
      this._element.classList.remove("show");
      const t = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, t);
    }
    _destroyElement() {
      this._element.remove(),
        F.trigger(this._element, "closed.bs.alert"),
        this.dispose();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Q.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  V(Q, "close"), b(Q);
  const X = '[data-bs-toggle="button"]';
  class Y extends W {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Y.getOrCreateInstance(this);
        "toggle" === t && e[t]();
      });
    }
  }
  F.on(document, "click.bs.button.data-api", X, (t) => {
    t.preventDefault();
    const e = t.target.closest(X);
    Y.getOrCreateInstance(e).toggle();
  }),
    b(Y);
  const U = { endCallback: null, leftCallback: null, rightCallback: null },
    G = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class J extends q {
    constructor(t, e) {
      super(),
        (this._element = t),
        t &&
          J.isSupported() &&
          ((this._config = this._getConfig(e)),
          (this._deltaX = 0),
          (this._supportPointerEvents = Boolean(window.PointerEvent)),
          this._initEvents());
    }
    static get Default() {
      return U;
    }
    static get DefaultType() {
      return G;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      F.off(this._element, ".bs.swipe");
    }
    _start(t) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
        : (this._deltaX = t.touches[0].clientX);
    }
    _end(t) {
      this._eventIsPointerPenTouch(t) &&
        (this._deltaX = t.clientX - this._deltaX),
        this._handleSwipe(),
        v(this._config.endCallback);
    }
    _move(t) {
      this._deltaX =
        t.touches && t.touches.length > 1
          ? 0
          : t.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t = Math.abs(this._deltaX);
      if (t <= 40) return;
      const e = t / this._deltaX;
      (this._deltaX = 0),
        e && v(e > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (F.on(this._element, "pointerdown.bs.swipe", (t) => this._start(t)),
          F.on(this._element, "pointerup.bs.swipe", (t) => this._end(t)),
          this._element.classList.add("pointer-event"))
        : (F.on(this._element, "touchstart.bs.swipe", (t) => this._start(t)),
          F.on(this._element, "touchmove.bs.swipe", (t) => this._move(t)),
          F.on(this._element, "touchend.bs.swipe", (t) => this._end(t)));
    }
    _eventIsPointerPenTouch(t) {
      return (
        this._supportPointerEvents &&
        ("pen" === t.pointerType || "touch" === t.pointerType)
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const Z = "next",
    tt = "prev",
    et = "left",
    st = "right",
    it = "slid.bs.carousel",
    nt = "carousel",
    ot = "active",
    rt = { ArrowLeft: st, ArrowRight: et },
    at = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    lt = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class ct extends W {
    constructor(t, e) {
      super(t, e),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = K.findOne(
          ".carousel-indicators",
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === nt && this.cycle();
    }
    static get Default() {
      return at;
    }
    static get DefaultType() {
      return lt;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(Z);
    }
    nextWhenVisible() {
      !document.hidden && h(this._element) && this.next();
    }
    prev() {
      this._slide(tt);
    }
    pause() {
      this._isSliding && a(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      this._config.ride &&
        (this._isSliding
          ? F.one(this._element, it, () => this.cycle())
          : this.cycle());
    }
    to(t) {
      const e = this._getItems();
      if (t > e.length - 1 || t < 0) return;
      if (this._isSliding)
        return void F.one(this._element, it, () => this.to(t));
      const s = this._getItemIndex(this._getActive());
      if (s === t) return;
      const i = t > s ? Z : tt;
      this._slide(i, e[t]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t) {
      return (t.defaultInterval = t.interval), t;
    }
    _addEventListeners() {
      this._config.keyboard &&
        F.on(this._element, "keydown.bs.carousel", (t) => this._keydown(t)),
        "hover" === this._config.pause &&
          (F.on(this._element, "mouseenter.bs.carousel", () => this.pause()),
          F.on(this._element, "mouseleave.bs.carousel", () =>
            this._maybeEnableCycle()
          )),
        this._config.touch && J.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t of K.find(".carousel-item img", this._element))
        F.on(t, "dragstart.bs.carousel", (t) => t.preventDefault());
      const t = {
        leftCallback: () => this._slide(this._directionToOrder(et)),
        rightCallback: () => this._slide(this._directionToOrder(st)),
        endCallback: () => {
          "hover" === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      };
      this._swipeHelper = new J(this._element, t);
    }
    _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return;
      const e = rt[t.key];
      e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
    }
    _getItemIndex(t) {
      return this._getItems().indexOf(t);
    }
    _setActiveIndicatorElement(t) {
      if (!this._indicatorsElement) return;
      const e = K.findOne(".active", this._indicatorsElement);
      e.classList.remove(ot), e.removeAttribute("aria-current");
      const s = K.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
      s && (s.classList.add(ot), s.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t = this._activeElement || this._getActive();
      if (!t) return;
      const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
      this._config.interval = e || this._config.defaultInterval;
    }
    _slide(t, e = null) {
      if (this._isSliding) return;
      const s = this._getActive(),
        i = t === Z,
        n = e || w(this._getItems(), s, i, this._config.wrap);
      if (n === s) return;
      const o = this._getItemIndex(n),
        r = (e) =>
          F.trigger(this._element, e, {
            relatedTarget: n,
            direction: this._orderToDirection(t),
            from: this._getItemIndex(s),
            to: o,
          });
      if (r("slide.bs.carousel").defaultPrevented) return;
      if (!s || !n) return;
      const a = Boolean(this._interval);
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(o),
        (this._activeElement = n);
      const l = i ? "carousel-item-start" : "carousel-item-end",
        c = i ? "carousel-item-next" : "carousel-item-prev";
      n.classList.add(c),
        g(n),
        s.classList.add(l),
        n.classList.add(l),
        this._queueCallback(
          () => {
            n.classList.remove(l, c),
              n.classList.add(ot),
              s.classList.remove(ot, c, l),
              (this._isSliding = !1),
              r(it);
          },
          s,
          this._isAnimated()
        ),
        a && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return K.findOne(".active.carousel-item", this._element);
    }
    _getItems() {
      return K.find(".carousel-item", this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(t) {
      return p() ? (t === et ? tt : Z) : t === et ? Z : tt;
    }
    _orderToDirection(t) {
      return p() ? (t === tt ? et : st) : t === tt ? st : et;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ct.getOrCreateInstance(this, t);
        if ("number" != typeof t) {
          if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
              throw new TypeError(`No method named "${t}"`);
            e[t]();
          }
        } else e.to(t);
      });
    }
  }
  F.on(
    document,
    "click.bs.carousel.data-api",
    "[data-bs-slide], [data-bs-slide-to]",
    function (t) {
      const e = K.getElementFromSelector(this);
      if (!e || !e.classList.contains(nt)) return;
      t.preventDefault();
      const s = ct.getOrCreateInstance(e),
        i = this.getAttribute("data-bs-slide-to");
      return i
        ? (s.to(i), void s._maybeEnableCycle())
        : "next" === B.getDataAttribute(this, "slide")
        ? (s.next(), void s._maybeEnableCycle())
        : (s.prev(), void s._maybeEnableCycle());
    }
  ),
    F.on(window, "load.bs.carousel.data-api", () => {
      const t = K.find('[data-bs-ride="carousel"]');
      for (const e of t) ct.getOrCreateInstance(e);
    }),
    b(ct);
  const ht = "show",
    dt = "collapse",
    ut = "collapsing",
    _t = '[data-bs-toggle="collapse"]',
    gt = { parent: null, toggle: !0 },
    ft = { parent: "(null|element)", toggle: "boolean" };
  class mt extends W {
    constructor(t, e) {
      super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
      const s = K.find(_t);
      for (const t of s) {
        const e = K.getSelectorFromElement(t),
          s = K.find(e).filter((t) => t === this._element);
        null !== e && s.length && this._triggerArray.push(t);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return gt;
    }
    static get DefaultType() {
      return ft;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t = [];
      if (
        (this._config.parent &&
          (t = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing"
          )
            .filter((t) => t !== this._element)
            .map((t) => mt.getOrCreateInstance(t, { toggle: !1 }))),
        t.length && t[0]._isTransitioning)
      )
        return;
      if (F.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
      for (const e of t) e.hide();
      const e = this._getDimension();
      this._element.classList.remove(dt),
        this._element.classList.add(ut),
        (this._element.style[e] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const s = `scroll${e[0].toUpperCase() + e.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(ut),
            this._element.classList.add(dt, ht),
            (this._element.style[e] = ""),
            F.trigger(this._element, "shown.bs.collapse");
        },
        this._element,
        !0
      ),
        (this._element.style[e] = `${this._element[s]}px`);
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if (F.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] = `${
        this._element.getBoundingClientRect()[t]
      }px`),
        g(this._element),
        this._element.classList.add(ut),
        this._element.classList.remove(dt, ht);
      for (const t of this._triggerArray) {
        const e = K.getElementFromSelector(t);
        e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[t] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(ut),
              this._element.classList.add(dt),
              F.trigger(this._element, "hidden.bs.collapse");
          },
          this._element,
          !0
        );
    }
    _isShown(t = this._element) {
      return t.classList.contains(ht);
    }
    _configAfterMerge(t) {
      return (t.toggle = Boolean(t.toggle)), (t.parent = c(t.parent)), t;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t = this._getFirstLevelChildren(_t);
      for (const e of t) {
        const t = K.getElementFromSelector(e);
        t && this._addAriaAndCollapsedClass([e], this._isShown(t));
      }
    }
    _getFirstLevelChildren(t) {
      const e = K.find(":scope .collapse .collapse", this._config.parent);
      return K.find(t, this._config.parent).filter((t) => !e.includes(t));
    }
    _addAriaAndCollapsedClass(t, e) {
      if (t.length)
        for (const s of t)
          s.classList.toggle("collapsed", !e),
            s.setAttribute("aria-expanded", e);
    }
    static jQueryInterface(t) {
      const e = {};
      return (
        "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1),
        this.each(function () {
          const s = mt.getOrCreateInstance(this, e);
          if ("string" == typeof t) {
            if (void 0 === s[t]) throw new TypeError(`No method named "${t}"`);
            s[t]();
          }
        })
      );
    }
  }
  F.on(document, "click.bs.collapse.data-api", _t, function (t) {
    ("A" === t.target.tagName ||
      (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
      t.preventDefault();
    for (const t of K.getMultipleElementsFromSelector(this))
      mt.getOrCreateInstance(t, { toggle: !1 }).toggle();
  }),
    b(mt);
  const pt = "dropdown",
    bt = "ArrowUp",
    vt = "ArrowDown",
    yt = "click.bs.dropdown.data-api",
    wt = "keydown.bs.dropdown.data-api",
    At = "show",
    Et = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Ct = `${Et}.show`,
    Tt = ".dropdown-menu",
    kt = p() ? "top-end" : "top-start",
    St = p() ? "top-start" : "top-end",
    Lt = p() ? "bottom-end" : "bottom-start",
    Ot = p() ? "bottom-start" : "bottom-end",
    It = p() ? "left-start" : "right-start",
    Dt = p() ? "right-start" : "left-start",
    Nt = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    Pt = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class xt extends W {
    constructor(t, e) {
      super(t, e),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          K.next(this._element, Tt)[0] ||
          K.prev(this._element, Tt)[0] ||
          K.findOne(Tt, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return Nt;
    }
    static get DefaultType() {
      return Pt;
    }
    static get NAME() {
      return pt;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (d(this._element) || this._isShown()) return;
      const t = { relatedTarget: this._element };
      if (!F.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const t of [].concat(...document.body.children))
            F.on(t, "mouseover", _);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(At),
          this._element.classList.add(At),
          F.trigger(this._element, "shown.bs.dropdown", t);
      }
    }
    hide() {
      if (d(this._element) || !this._isShown()) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(t) {
      if (!F.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const t of [].concat(...document.body.children))
            F.off(t, "mouseover", _);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(At),
          this._element.classList.remove(At),
          this._element.setAttribute("aria-expanded", "false"),
          B.removeDataAttribute(this._menu, "popper"),
          F.trigger(this._element, "hidden.bs.dropdown", t);
      }
    }
    _getConfig(t) {
      if (
        "object" == typeof (t = super._getConfig(t)).reference &&
        !l(t.reference) &&
        "function" != typeof t.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${pt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return t;
    }
    _createPopper() {
      if (void 0 === s)
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let t = this._element;
      "parent" === this._config.reference
        ? (t = this._parent)
        : l(this._config.reference)
        ? (t = c(this._config.reference))
        : "object" == typeof this._config.reference &&
          (t = this._config.reference);
      const e = this._getPopperConfig();
      this._popper = s.createPopper(t, this._menu, e);
    }
    _isShown() {
      return this._menu.classList.contains(At);
    }
    _getPlacement() {
      const t = this._parent;
      if (t.classList.contains("dropend")) return It;
      if (t.classList.contains("dropstart")) return Dt;
      if (t.classList.contains("dropup-center")) return "top";
      if (t.classList.contains("dropdown-center")) return "bottom";
      const e =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t.classList.contains("dropup") ? (e ? St : kt) : e ? Ot : Lt;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || "static" === this._config.display) &&
          (B.setDataAttribute(this._menu, "popper", "static"),
          (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...t, ...v(this._config.popperConfig, [t]) }
      );
    }
    _selectMenuItem({ key: t, target: e }) {
      const s = K.find(
        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        this._menu
      ).filter((t) => h(t));
      s.length && w(s, e, t === vt, !s.includes(e)).focus();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = xt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
    static clearMenus(t) {
      if (2 === t.button || ("keyup" === t.type && "Tab" !== t.key)) return;
      const e = K.find(Ct);
      for (const s of e) {
        const e = xt.getInstance(s);
        if (!e || !1 === e._config.autoClose) continue;
        const i = t.composedPath(),
          n = i.includes(e._menu);
        if (
          i.includes(e._element) ||
          ("inside" === e._config.autoClose && !n) ||
          ("outside" === e._config.autoClose && n)
        )
          continue;
        if (
          e._menu.contains(t.target) &&
          (("keyup" === t.type && "Tab" === t.key) ||
            /input|select|option|textarea|form/i.test(t.target.tagName))
        )
          continue;
        const o = { relatedTarget: e._element };
        "click" === t.type && (o.clickEvent = t), e._completeHide(o);
      }
    }
    static dataApiKeydownHandler(t) {
      const e = /input|textarea/i.test(t.target.tagName),
        s = "Escape" === t.key,
        i = [bt, vt].includes(t.key);
      if (!i && !s) return;
      if (e && !s) return;
      t.preventDefault();
      const n = this.matches(Et)
          ? this
          : K.prev(this, Et)[0] ||
            K.next(this, Et)[0] ||
            K.findOne(Et, t.delegateTarget.parentNode),
        o = xt.getOrCreateInstance(n);
      if (i) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
      o._isShown() && (t.stopPropagation(), o.hide(), n.focus());
    }
  }
  F.on(document, wt, Et, xt.dataApiKeydownHandler),
    F.on(document, wt, Tt, xt.dataApiKeydownHandler),
    F.on(document, yt, xt.clearMenus),
    F.on(document, "keyup.bs.dropdown.data-api", xt.clearMenus),
    F.on(document, yt, Et, function (t) {
      t.preventDefault(), xt.getOrCreateInstance(this).toggle();
    }),
    b(xt);
  const Mt = "show",
    jt = "mousedown.bs.backdrop",
    Ft = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    $t = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class zt extends q {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return Ft;
    }
    static get DefaultType() {
      return $t;
    }
    static get NAME() {
      return "backdrop";
    }
    show(t) {
      if (!this._config.isVisible) return void v(t);
      this._append();
      const e = this._getElement();
      this._config.isAnimated && g(e),
        e.classList.add(Mt),
        this._emulateAnimation(() => {
          v(t);
        });
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove(Mt),
          this._emulateAnimation(() => {
            this.dispose(), v(t);
          }))
        : v(t);
    }
    dispose() {
      this._isAppended &&
        (F.off(this._element, jt),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement("div");
        (t.className = this._config.className),
          this._config.isAnimated && t.classList.add("fade"),
          (this._element = t);
      }
      return this._element;
    }
    _configAfterMerge(t) {
      return (t.rootElement = c(t.rootElement)), t;
    }
    _append() {
      if (this._isAppended) return;
      const t = this._getElement();
      this._config.rootElement.append(t),
        F.on(t, jt, () => {
          v(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(t) {
      y(t, this._getElement(), this._config.isAnimated);
    }
  }
  const Ht = ".bs.focustrap",
    Bt = "backward",
    qt = { autofocus: !0, trapElement: null },
    Wt = { autofocus: "boolean", trapElement: "element" };
  class Rt extends q {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return qt;
    }
    static get DefaultType() {
      return Wt;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        F.off(document, Ht),
        F.on(document, "focusin.bs.focustrap", (t) => this._handleFocusin(t)),
        F.on(document, "keydown.tab.bs.focustrap", (t) =>
          this._handleKeydown(t)
        ),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), F.off(document, Ht));
    }
    _handleFocusin(t) {
      const { trapElement: e } = this._config;
      if (t.target === document || t.target === e || e.contains(t.target))
        return;
      const s = K.focusableChildren(e);
      0 === s.length
        ? e.focus()
        : this._lastTabNavDirection === Bt
        ? s[s.length - 1].focus()
        : s[0].focus();
    }
    _handleKeydown(t) {
      "Tab" === t.key &&
        (this._lastTabNavDirection = t.shiftKey ? Bt : "forward");
    }
  }
  const Kt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Vt = ".sticky-top",
    Qt = "padding-right",
    Xt = "margin-right";
  class Yt {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, Qt, (e) => e + t),
        this._setElementAttributes(Kt, Qt, (e) => e + t),
        this._setElementAttributes(Vt, Xt, (e) => e - t);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, Qt),
        this._resetElementAttributes(Kt, Qt),
        this._resetElementAttributes(Vt, Xt);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(t, e, s) {
      const i = this.getWidth();
      this._applyManipulationCallback(t, (t) => {
        if (t !== this._element && window.innerWidth > t.clientWidth + i)
          return;
        this._saveInitialAttribute(t, e);
        const n = window.getComputedStyle(t).getPropertyValue(e);
        t.style.setProperty(e, `${s(Number.parseFloat(n))}px`);
      });
    }
    _saveInitialAttribute(t, e) {
      const s = t.style.getPropertyValue(e);
      s && B.setDataAttribute(t, e, s);
    }
    _resetElementAttributes(t, e) {
      this._applyManipulationCallback(t, (t) => {
        const s = B.getDataAttribute(t, e);
        null !== s
          ? (B.removeDataAttribute(t, e), t.style.setProperty(e, s))
          : t.style.removeProperty(e);
      });
    }
    _applyManipulationCallback(t, e) {
      if (l(t)) e(t);
      else for (const s of K.find(t, this._element)) e(s);
    }
  }
  const Ut = ".bs.modal",
    Gt = "hidden.bs.modal",
    Jt = "show.bs.modal",
    Zt = "modal-open",
    te = "show",
    ee = "modal-static",
    se = { backdrop: !0, focus: !0, keyboard: !0 },
    ie = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class ne extends W {
    constructor(t, e) {
      super(t, e),
        (this._dialog = K.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new Yt()),
        this._addEventListeners();
    }
    static get Default() {
      return se;
    }
    static get DefaultType() {
      return ie;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        this._isTransitioning ||
        F.trigger(this._element, Jt, { relatedTarget: t }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(Zt),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(t)));
    }
    hide() {
      this._isShown &&
        !this._isTransitioning &&
        (F.trigger(this._element, "hide.bs.modal").defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove(te),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
          )));
    }
    dispose() {
      F.off(window, Ut),
        F.off(this._dialog, Ut),
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new zt({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new Rt({ trapElement: this._element });
    }
    _showElement(t) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const e = K.findOne(".modal-body", this._dialog);
      e && (e.scrollTop = 0),
        g(this._element),
        this._element.classList.add(te),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              F.trigger(this._element, "shown.bs.modal", { relatedTarget: t });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      F.on(this._element, "keydown.dismiss.bs.modal", (t) => {
        "Escape" === t.key &&
          (this._config.keyboard
            ? this.hide()
            : this._triggerBackdropTransition());
      }),
        F.on(window, "resize.bs.modal", () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        F.on(this._element, "mousedown.dismiss.bs.modal", (t) => {
          F.one(this._element, "click.dismiss.bs.modal", (e) => {
            this._element === t.target &&
              this._element === e.target &&
              ("static" !== this._config.backdrop
                ? this._config.backdrop && this.hide()
                : this._triggerBackdropTransition());
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(Zt),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            F.trigger(this._element, Gt);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (F.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
        return;
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._element.style.overflowY;
      "hidden" === e ||
        this._element.classList.contains(ee) ||
        (t || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(ee),
        this._queueCallback(() => {
          this._element.classList.remove(ee),
            this._queueCallback(() => {
              this._element.style.overflowY = e;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._scrollBar.getWidth(),
        s = e > 0;
      if (s && !t) {
        const t = p() ? "paddingLeft" : "paddingRight";
        this._element.style[t] = `${e}px`;
      }
      if (!s && t) {
        const t = p() ? "paddingRight" : "paddingLeft";
        this._element.style[t] = `${e}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const s = ne.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === s[t]) throw new TypeError(`No method named "${t}"`);
          s[t](e);
        }
      });
    }
  }
  F.on(
    document,
    "click.bs.modal.data-api",
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = K.getElementFromSelector(this);
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        F.one(e, Jt, (t) => {
          t.defaultPrevented ||
            F.one(e, Gt, () => {
              h(this) && this.focus();
            });
        });
      const s = K.findOne(".modal.show");
      s && ne.getInstance(s).hide(), ne.getOrCreateInstance(e).toggle(this);
    }
  ),
    V(ne),
    b(ne);
  const oe = "show",
    re = "showing",
    ae = "hiding",
    le = ".offcanvas.show",
    ce = "hidePrevented.bs.offcanvas",
    he = "hidden.bs.offcanvas",
    de = { backdrop: !0, keyboard: !0, scroll: !1 },
    ue = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class _e extends W {
    constructor(t, e) {
      super(t, e),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return de;
    }
    static get DefaultType() {
      return ue;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        F.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new Yt().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(re),
        this._queueCallback(
          () => {
            (this._config.scroll && !this._config.backdrop) ||
              this._focustrap.activate(),
              this._element.classList.add(oe),
              this._element.classList.remove(re),
              F.trigger(this._element, "shown.bs.offcanvas", {
                relatedTarget: t,
              });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        (F.trigger(this._element, "hide.bs.offcanvas").defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add(ae),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.classList.remove(oe, ae),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || new Yt().reset(),
                F.trigger(this._element, he);
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t = Boolean(this._config.backdrop);
      return new zt({
        className: "offcanvas-backdrop",
        isVisible: t,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: t
          ? () => {
              "static" !== this._config.backdrop
                ? this.hide()
                : F.trigger(this._element, ce);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new Rt({ trapElement: this._element });
    }
    _addEventListeners() {
      F.on(this._element, "keydown.dismiss.bs.offcanvas", (t) => {
        "Escape" === t.key &&
          (this._config.keyboard ? this.hide() : F.trigger(this._element, ce));
      });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = _e.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  F.on(
    document,
    "click.bs.offcanvas.data-api",
    '[data-bs-toggle="offcanvas"]',
    function (t) {
      const e = K.getElementFromSelector(this);
      if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this)))
        return;
      F.one(e, he, () => {
        h(this) && this.focus();
      });
      const s = K.findOne(le);
      s && s !== e && _e.getInstance(s).hide(),
        _e.getOrCreateInstance(e).toggle(this);
    }
  ),
    F.on(window, "load.bs.offcanvas.data-api", () => {
      for (const t of K.find(le)) _e.getOrCreateInstance(t).show();
    }),
    F.on(window, "resize.bs.offcanvas", () => {
      for (const t of K.find("[aria-modal][class*=show][class*=offcanvas-]"))
        "fixed" !== getComputedStyle(t).position &&
          _e.getOrCreateInstance(t).hide();
    }),
    V(_e),
    b(_e);
  const ge = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    fe = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    me = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    pe = (t, e) => {
      const s = t.nodeName.toLowerCase();
      return e.includes(s)
        ? !fe.has(s) || Boolean(me.test(t.nodeValue))
        : e.filter((t) => t instanceof RegExp).some((t) => t.test(s));
    },
    be = {
      allowList: ge,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    ve = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    ye = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class we extends q {
    constructor(t) {
      super(), (this._config = this._getConfig(t));
    }
    static get Default() {
      return be;
    }
    static get DefaultType() {
      return ve;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((t) => this._resolvePossibleFunction(t))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t) {
      return (
        this._checkContent(t),
        (this._config.content = { ...this._config.content, ...t }),
        this
      );
    }
    toHtml() {
      const t = document.createElement("div");
      t.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e, s] of Object.entries(this._config.content))
        this._setContent(t, s, e);
      const e = t.children[0],
        s = this._resolvePossibleFunction(this._config.extraClass);
      return s && e.classList.add(...s.split(" ")), e;
    }
    _typeCheckConfig(t) {
      super._typeCheckConfig(t), this._checkContent(t.content);
    }
    _checkContent(t) {
      for (const [e, s] of Object.entries(t))
        super._typeCheckConfig({ selector: e, entry: s }, ye);
    }
    _setContent(t, e, s) {
      const i = K.findOne(s, t);
      i &&
        ((e = this._resolvePossibleFunction(e))
          ? l(e)
            ? this._putElementInTemplate(c(e), i)
            : this._config.html
            ? (i.innerHTML = this._maybeSanitize(e))
            : (i.textContent = e)
          : i.remove());
    }
    _maybeSanitize(t) {
      return this._config.sanitize
        ? (function (t, e, s) {
            if (!t.length) return t;
            if (s && "function" == typeof s) return s(t);
            const i = new window.DOMParser().parseFromString(t, "text/html"),
              n = [].concat(...i.body.querySelectorAll("*"));
            for (const t of n) {
              const s = t.nodeName.toLowerCase();
              if (!Object.keys(e).includes(s)) {
                t.remove();
                continue;
              }
              const i = [].concat(...t.attributes),
                n = [].concat(e["*"] || [], e[s] || []);
              for (const e of i) pe(e, n) || t.removeAttribute(e.nodeName);
            }
            return i.body.innerHTML;
          })(t, this._config.allowList, this._config.sanitizeFn)
        : t;
    }
    _resolvePossibleFunction(t) {
      return v(t, [this]);
    }
    _putElementInTemplate(t, e) {
      if (this._config.html) return (e.innerHTML = ""), void e.append(t);
      e.textContent = t.textContent;
    }
  }
  const Ae = new Set(["sanitize", "allowList", "sanitizeFn"]),
    Ee = "fade",
    Ce = "show",
    Te = ".modal",
    ke = "hide.bs.modal",
    Se = "hover",
    Le = "focus",
    Oe = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: p() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: p() ? "right" : "left",
    },
    Ie = {
      allowList: ge,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 6],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    De = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class Ne extends W {
    constructor(t, e) {
      if (void 0 === s)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t, e),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return Ie;
    }
    static get DefaultType() {
      return De;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled &&
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout),
        F.off(this._element.closest(Te), ke, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title")
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const t = F.trigger(this._element, this.constructor.eventName("show")),
        e = (
          u(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (t.defaultPrevented || !e) return;
      this._disposePopper();
      const s = this._getTipElement();
      this._element.setAttribute("aria-describedby", s.getAttribute("id"));
      const { container: i } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (i.append(s),
          F.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(s)),
        s.classList.add(Ce),
        "ontouchstart" in document.documentElement)
      )
        for (const t of [].concat(...document.body.children))
          F.on(t, "mouseover", _);
      this._queueCallback(
        () => {
          F.trigger(this._element, this.constructor.eventName("shown")),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !F.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(Ce),
          "ontouchstart" in document.documentElement)
        )
          for (const t of [].concat(...document.body.children))
            F.off(t, "mouseover", _);
        (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                F.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(t) {
      const e = this._getTemplateFactory(t).toHtml();
      if (!e) return null;
      e.classList.remove(Ee, Ce),
        e.classList.add(`bs-${this.constructor.NAME}-auto`);
      const s = ((t) => {
        do {
          t += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t));
        return t;
      })(this.constructor.NAME).toString();
      return (
        e.setAttribute("id", s), this._isAnimated() && e.classList.add(Ee), e
      );
    }
    setContent(t) {
      (this._newContent = t),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(t)
          : (this._templateFactory = new we({
              ...this._config,
              content: t,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(t) {
      return this.constructor.getOrCreateInstance(
        t.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(Ee))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(Ce);
    }
    _createPopper(t) {
      const e = v(this._config.placement, [this, t, this._element]),
        i = Oe[e.toUpperCase()];
      return s.createPopper(this._element, t, this._getPopperConfig(i));
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _resolvePossibleFunction(t) {
      return v(t, [this._element]);
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (t) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                t.state.placement
              );
            },
          },
        ],
      };
      return { ...e, ...v(this._config.popperConfig, [e]) };
    }
    _setListeners() {
      const t = this._config.trigger.split(" ");
      for (const e of t)
        if ("click" === e)
          F.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (t) => {
              this._initializeOnDelegatedTarget(t).toggle();
            }
          );
        else if ("manual" !== e) {
          const t =
              e === Se
                ? this.constructor.eventName("mouseenter")
                : this.constructor.eventName("focusin"),
            s =
              e === Se
                ? this.constructor.eventName("mouseleave")
                : this.constructor.eventName("focusout");
          F.on(this._element, t, this._config.selector, (t) => {
            const e = this._initializeOnDelegatedTarget(t);
            (e._activeTrigger["focusin" === t.type ? Le : Se] = !0), e._enter();
          }),
            F.on(this._element, s, this._config.selector, (t) => {
              const e = this._initializeOnDelegatedTarget(t);
              (e._activeTrigger["focusout" === t.type ? Le : Se] =
                e._element.contains(t.relatedTarget)),
                e._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        F.on(this._element.closest(Te), ke, this._hideModalHandler);
    }
    _fixTitle() {
      const t = this._element.getAttribute("title");
      t &&
        (this._element.getAttribute("aria-label") ||
          this._element.textContent.trim() ||
          this._element.setAttribute("aria-label", t),
        this._element.setAttribute("data-bs-original-title", t),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(t, e) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(t) {
      const e = B.getDataAttributes(this._element);
      for (const t of Object.keys(e)) Ae.has(t) && delete e[t];
      return (
        (t = { ...e, ...("object" == typeof t && t ? t : {}) }),
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return (
        (t.container = !1 === t.container ? document.body : c(t.container)),
        "number" == typeof t.delay &&
          (t.delay = { show: t.delay, hide: t.delay }),
        "number" == typeof t.title && (t.title = t.title.toString()),
        "number" == typeof t.content && (t.content = t.content.toString()),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      for (const [e, s] of Object.entries(this._config))
        this.constructor.Default[e] !== s && (t[e] = s);
      return (t.selector = !1), (t.trigger = "manual"), t;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ne.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  b(Ne);
  const Pe = {
      ...Ne.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    xe = { ...Ne.DefaultType, content: "(null|string|element|function)" };
  class Me extends Ne {
    static get Default() {
      return Pe;
    }
    static get DefaultType() {
      return xe;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Me.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  b(Me);
  const je = "click.bs.scrollspy",
    Fe = "active",
    $e = "[href]",
    ze = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    He = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class Be extends W {
    constructor(t, e) {
      super(t, e),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          "visible" === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return ze;
    }
    static get DefaultType() {
      return He;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const t of this._observableSections.values())
        this._observer.observe(t);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t) {
      return (
        (t.target = c(t.target) || document.body),
        (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
        "string" == typeof t.threshold &&
          (t.threshold = t.threshold
            .split(",")
            .map((t) => Number.parseFloat(t))),
        t
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (F.off(this._config.target, je),
        F.on(this._config.target, je, $e, (t) => {
          const e = this._observableSections.get(t.target.hash);
          if (e) {
            t.preventDefault();
            const s = this._rootElement || window,
              i = e.offsetTop - this._element.offsetTop;
            if (s.scrollTo)
              return void s.scrollTo({ top: i, behavior: "smooth" });
            s.scrollTop = i;
          }
        }));
    }
    _getNewObserver() {
      const t = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      };
      return new IntersectionObserver((t) => this._observerCallback(t), t);
    }
    _observerCallback(t) {
      const e = (t) => this._targetLinks.get(`#${t.target.id}`),
        s = (t) => {
          (this._previousScrollData.visibleEntryTop = t.target.offsetTop),
            this._process(e(t));
        },
        i = (this._rootElement || document.documentElement).scrollTop,
        n = i >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = i;
      for (const o of t) {
        if (!o.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(e(o));
          continue;
        }
        const t =
          o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (n && t) {
          if ((s(o), !i)) return;
        } else n || t || s(o);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const t = K.find($e, this._config.target);
      for (const e of t) {
        if (!e.hash || d(e)) continue;
        const t = K.findOne(decodeURI(e.hash), this._element);
        h(t) &&
          (this._targetLinks.set(decodeURI(e.hash), e),
          this._observableSections.set(e.hash, t));
      }
    }
    _process(t) {
      this._activeTarget !== t &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = t),
        t.classList.add(Fe),
        this._activateParents(t),
        F.trigger(this._element, "activate.bs.scrollspy", {
          relatedTarget: t,
        }));
    }
    _activateParents(t) {
      if (t.classList.contains("dropdown-item"))
        K.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(Fe);
      else
        for (const e of K.parents(t, ".nav, .list-group"))
          for (const t of K.prev(
            e,
            ".nav-link, .nav-item > .nav-link, .list-group-item"
          ))
            t.classList.add(Fe);
    }
    _clearActiveClass(t) {
      t.classList.remove(Fe);
      const e = K.find("[href].active", t);
      for (const t of e) t.classList.remove(Fe);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Be.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  F.on(window, "load.bs.scrollspy.data-api", () => {
    for (const t of K.find('[data-bs-spy="scroll"]')) Be.getOrCreateInstance(t);
  }),
    b(Be);
  const qe = "ArrowLeft",
    We = "ArrowRight",
    Re = "ArrowUp",
    Ke = "ArrowDown",
    Ve = "active",
    Qe = "fade",
    Xe = "show",
    Ye =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Ue = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Ye}`;
  class Ge extends W {
    constructor(t) {
      super(t),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          F.on(this._element, "keydown.bs.tab", (t) => this._keydown(t)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t = this._element;
      if (this._elemIsActive(t)) return;
      const e = this._getActiveElem(),
        s = e ? F.trigger(e, "hide.bs.tab", { relatedTarget: t }) : null;
      F.trigger(t, "show.bs.tab", { relatedTarget: e }).defaultPrevented ||
        (s && s.defaultPrevented) ||
        (this._deactivate(e, t), this._activate(t, e));
    }
    _activate(t, e) {
      t &&
        (t.classList.add(Ve),
        this._activate(K.getElementFromSelector(t)),
        this._queueCallback(
          () => {
            "tab" === t.getAttribute("role")
              ? (t.removeAttribute("tabindex"),
                t.setAttribute("aria-selected", !0),
                this._toggleDropDown(t, !0),
                F.trigger(t, "shown.bs.tab", { relatedTarget: e }))
              : t.classList.add(Xe);
          },
          t,
          t.classList.contains(Qe)
        ));
    }
    _deactivate(t, e) {
      t &&
        (t.classList.remove(Ve),
        t.blur(),
        this._deactivate(K.getElementFromSelector(t)),
        this._queueCallback(
          () => {
            "tab" === t.getAttribute("role")
              ? (t.setAttribute("aria-selected", !1),
                t.setAttribute("tabindex", "-1"),
                this._toggleDropDown(t, !1),
                F.trigger(t, "hidden.bs.tab", { relatedTarget: e }))
              : t.classList.remove(Xe);
          },
          t,
          t.classList.contains(Qe)
        ));
    }
    _keydown(t) {
      if (![qe, We, Re, Ke].includes(t.key)) return;
      t.stopPropagation(), t.preventDefault();
      const e = [We, Ke].includes(t.key),
        s = w(
          this._getChildren().filter((t) => !d(t)),
          t.target,
          e,
          !0
        );
      s && (s.focus({ preventScroll: !0 }), Ge.getOrCreateInstance(s).show());
    }
    _getChildren() {
      return K.find(Ue, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t) => this._elemIsActive(t)) || null;
    }
    _setInitialAttributes(t, e) {
      this._setAttributeIfNotExists(t, "role", "tablist");
      for (const t of e) this._setInitialAttributesOnChild(t);
    }
    _setInitialAttributesOnChild(t) {
      t = this._getInnerElement(t);
      const e = this._elemIsActive(t),
        s = this._getOuterElement(t);
      t.setAttribute("aria-selected", e),
        s !== t && this._setAttributeIfNotExists(s, "role", "presentation"),
        e || t.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(t, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(t);
    }
    _setInitialAttributesOnTargetPanel(t) {
      const e = K.getElementFromSelector(t);
      e &&
        (this._setAttributeIfNotExists(e, "role", "tabpanel"),
        t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
    }
    _toggleDropDown(t, e) {
      const s = this._getOuterElement(t);
      if (!s.classList.contains("dropdown")) return;
      const i = (t, i) => {
        const n = K.findOne(t, s);
        n && n.classList.toggle(i, e);
      };
      i(".dropdown-toggle", Ve),
        i(".dropdown-menu", Xe),
        s.setAttribute("aria-expanded", e);
    }
    _setAttributeIfNotExists(t, e, s) {
      t.hasAttribute(e) || t.setAttribute(e, s);
    }
    _elemIsActive(t) {
      return t.classList.contains(Ve);
    }
    _getInnerElement(t) {
      return t.matches(Ue) ? t : K.findOne(Ue, t);
    }
    _getOuterElement(t) {
      return t.closest(".nav-item, .list-group-item") || t;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ge.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  F.on(document, "click.bs.tab", Ye, function (t) {
    ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
      d(this) || Ge.getOrCreateInstance(this).show();
  }),
    F.on(window, "load.bs.tab", () => {
      for (const t of K.find(
        '.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'
      ))
        Ge.getOrCreateInstance(t);
    }),
    b(Ge);
  const Je = "hide",
    Ze = "show",
    ts = "showing",
    es = { animation: "boolean", autohide: "boolean", delay: "number" },
    ss = { animation: !0, autohide: !0, delay: 5e3 };
  class is extends W {
    constructor(t, e) {
      super(t, e),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return ss;
    }
    static get DefaultType() {
      return es;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      F.trigger(this._element, "show.bs.toast").defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove(Je),
        g(this._element),
        this._element.classList.add(Ze, ts),
        this._queueCallback(
          () => {
            this._element.classList.remove(ts),
              F.trigger(this._element, "shown.bs.toast"),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        (F.trigger(this._element, "hide.bs.toast").defaultPrevented ||
          (this._element.classList.add(ts),
          this._queueCallback(
            () => {
              this._element.classList.add(Je),
                this._element.classList.remove(ts, Ze),
                F.trigger(this._element, "hidden.bs.toast");
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(Ze),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(Ze);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(t, e) {
      switch (t.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e;
      }
      if (e) return void this._clearTimeout();
      const s = t.relatedTarget;
      this._element === s ||
        this._element.contains(s) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      F.on(this._element, "mouseover.bs.toast", (t) =>
        this._onInteraction(t, !0)
      ),
        F.on(this._element, "mouseout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        ),
        F.on(this._element, "focusin.bs.toast", (t) =>
          this._onInteraction(t, !0)
        ),
        F.on(this._element, "focusout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = is.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    V(is),
    b(is),
    {
      Alert: Q,
      Button: Y,
      Carousel: ct,
      Collapse: mt,
      Dropdown: xt,
      Modal: ne,
      Offcanvas: _e,
      Popover: Me,
      ScrollSpy: Be,
      Tab: Ge,
      Toast: is,
      Tooltip: Ne,
    }
  );
});
//# sourceMappingURL=bootstrap.min.js.map

// Swiper
/**
 * Swiper 8.4.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 30, 2023
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper =
        t());
})(this, function () {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s, a) {
    void 0 === s && (s = {}),
      void 0 === a && (a = {}),
      Object.keys(a).forEach((i) => {
        void 0 === s[i]
          ? (s[i] = a[i])
          : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]);
      });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function a() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  const i = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, i), e;
  }
  class n extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function l(e) {
    void 0 === e && (e = []);
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...l(e)) : t.push(e);
      }),
      t
    );
  }
  function o(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function d(e, t) {
    const s = r(),
      i = a();
    let l = [];
    if (!t && e instanceof n) return e;
    if (!e) return new n(l);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          l.push(t.childNodes[e]);
      } else
        l = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            a = t.querySelectorAll(e);
          for (let e = 0; e < a.length; e += 1) s.push(a[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) l.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof n) return e;
      l = e;
    }
    return new n(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(l)
    );
  }
  d.fn = n.prototype;
  const c = {
    addClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...a);
        }),
        this
      );
    },
    removeClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...a);
        }),
        this
      );
    },
    hasClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(" ")));
      return (
        o(this, (e) => a.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(" ")));
      this.forEach((e) => {
        a.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      let [a, i, r, n] = t;
      function l(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), d(t).is(i))) r.apply(t, s);
        else {
          const e = d(t).parents();
          for (let t = 0; t < e.length; t += 1)
            d(e[t]).is(i) && r.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
      }
      "function" == typeof t[1] && (([a, r, n] = t), (i = void 0)),
        n || (n = !1);
      const c = a.split(" ");
      let p;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (p = 0; p < c.length; p += 1) {
            const e = c[p];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: r, proxyListener: l }),
              t.addEventListener(e, l, n);
          }
        else
          for (p = 0; p < c.length; p += 1) {
            const e = c[p];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: r, proxyListener: o }),
              t.addEventListener(e, o, n);
          }
      }
      return this;
    },
    off: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      let [a, i, r, n] = t;
      "function" == typeof t[1] && (([a, r, n] = t), (i = void 0)),
        n || (n = !1);
      const l = a.split(" ");
      for (let e = 0; e < l.length; e += 1) {
        const t = l[e];
        for (let e = 0; e < this.length; e += 1) {
          const s = this[e];
          let a;
          if (
            (!i && s.dom7Listeners
              ? (a = s.dom7Listeners[t])
              : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
            a && a.length)
          )
            for (let e = a.length - 1; e >= 0; e -= 1) {
              const i = a[e];
              (r && i.listener === r) ||
              (r &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === r)
                ? (s.removeEventListener(t, i.proxyListener, n), a.splice(e, 1))
                : r ||
                  (s.removeEventListener(t, i.proxyListener, n),
                  a.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function () {
      const e = r();
      for (var t = arguments.length, s = new Array(t), a = 0; a < t; a++)
        s[a] = arguments[a];
      const i = s[0].split(" "),
        n = s[1];
      for (let t = 0; t < i.length; t += 1) {
        const a = i[t];
        for (let t = 0; t < this.length; t += 1) {
          const i = this[t];
          if (e.CustomEvent) {
            const t = new e.CustomEvent(a, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (i.dom7EventData = s.filter((e, t) => t > 0)),
              i.dispatchEvent(t),
              (i.dom7EventData = []),
              delete i.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(a) {
            a.target === this && (e.call(this, a), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = r();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = r(),
          t = a(),
          s = this[0],
          i = s.getBoundingClientRect(),
          n = t.body,
          l = s.clientTop || n.clientTop || 0,
          o = s.clientLeft || n.clientLeft || 0,
          d = s === e ? e.scrollY : s.scrollTop,
          c = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + d - l, left: i.left + c - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = r();
      let a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = r(),
        s = a(),
        i = this[0];
      let l, o;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (l = d(e), o = 0; o < l.length; o += 1) if (l[o] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof n) {
        for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
          if (l[o] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return d([]);
      if (e < 0) {
        const s = t + e;
        return d(s < 0 ? [] : [this[s]]);
      }
      return d([this[e]]);
    },
    append: function () {
      let e;
      const t = a();
      for (let s = 0; s < arguments.length; s += 1) {
        e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        for (let s = 0; s < this.length; s += 1)
          if ("string" == typeof e) {
            const a = t.createElement("div");
            for (a.innerHTML = e; a.firstChild; )
              this[s].appendChild(a.firstChild);
          } else if (e instanceof n)
            for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
          else this[s].appendChild(e);
      }
      return this;
    },
    prepend: function (e) {
      const t = a();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const a = t.createElement("div");
          for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(a.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof n)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
            ? d([this[0].nextElementSibling])
            : d([])
          : this[0].nextElementSibling
          ? d([this[0].nextElementSibling])
          : d([])
        : d([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && d(t.previousElementSibling).is(e)
            ? d([t.previousElementSibling])
            : d([])
          : t.previousElementSibling
          ? d([t.previousElementSibling])
          : d([]);
      }
      return d([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return d(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? d(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
      }
      return d(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
      }
      return d(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1)
          (e && !d(a[s]).is(e)) || t.push(a[s]);
      }
      return d(t);
    },
    filter: function (e) {
      return d(o(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  function p(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function u() {
    return Date.now();
  }
  function h(e, t) {
    void 0 === t && (t = "x");
    const s = r();
    let a, i, n;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (a = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      i || 0
    );
  }
  function m(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function f(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function g() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != a && !f(a)) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            r = Object.getOwnPropertyDescriptor(a, i);
          void 0 !== r &&
            r.enumerable &&
            (m(e[i]) && m(a[i])
              ? a[i].__swiper__
                ? (e[i] = a[i])
                : g(e[i], a[i])
              : !m(e[i]) && m(a[i])
              ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : g(e[i], a[i]))
              : (e[i] = a[i]));
        }
      }
    }
    return e;
  }
  function v(e, t, s) {
    e.style.setProperty(t, s);
  }
  function w(e) {
    let { swiper: t, targetPosition: s, side: a } = e;
    const i = r(),
      n = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > n ? "next" : "prev",
      p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (l = new Date().getTime()), null === o && (o = l);
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          r = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = n + r * (s - n);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [a]: c });
            }),
            void i.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = i.requestAnimationFrame(u);
      };
    u();
  }
  let b, x, y;
  function E() {
    return (
      b ||
        (b = (function () {
          const e = r(),
            t = a();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      b
    );
  }
  function C(e) {
    return (
      void 0 === e && (e = {}),
      x ||
        (x = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = E(),
            a = r(),
            i = a.navigator.platform,
            n = t || a.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = a.screen.width,
            d = a.screen.height,
            c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = n.match(/(iPad).*OS\s([\d_]+)/);
          const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            h = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            m = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !p &&
              f &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = n.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (f = !1)),
            c && !m && ((l.os = "android"), (l.android = !0)),
            (p || h || u) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      x
    );
  }
  function T() {
    return (
      y ||
        (y = (function () {
          const e = r();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      y
    );
  }
  Object.keys(c).forEach((e) => {
    Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
  });
  var $ = {
    on(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][i](t);
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      function i() {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
          r[n] = arguments[n];
        t.apply(a, r);
      }
      return (i.__emitterProxy = t), a.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((a, i) => {
                  (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, a;
      for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
        r[n] = arguments[n];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
        : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
        s.unshift(a);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(a, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(a, s);
              });
        }),
        e
      );
    },
  };
  var S = {
    updateSize: function () {
      const e = this;
      let t, s;
      const a = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : a[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : a[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(a.css("padding-left") || 0, 10) -
            parseInt(a.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(a.css("padding-top") || 0, 10) -
            parseInt(a.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const a = e.params,
        { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e,
        o = e.virtual && a.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = i.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : c.length;
      let u = [];
      const h = [],
        m = [];
      let f = a.slidesOffsetBefore;
      "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
      let g = a.slidesOffsetAfter;
      "function" == typeof g && (g = a.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        b = e.slidesGrid.length;
      let x = a.spaceBetween,
        y = -f,
        E = 0,
        C = 0;
      if (void 0 === r) return;
      "string" == typeof x &&
        x.indexOf("%") >= 0 &&
        (x = (parseFloat(x.replace("%", "")) / 100) * r),
        (e.virtualSize = -x),
        n
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        a.centeredSlides &&
          a.cssMode &&
          (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
          v(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = a.grid && a.grid.rows > 1 && e.grid;
      let $;
      T && e.grid.initSlides(p);
      const S =
        "auto" === a.slidesPerView &&
        a.breakpoints &&
        Object.keys(a.breakpoints).filter(
          (e) => void 0 !== a.breakpoints[e].slidesPerView
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        $ = 0;
        const n = c.eq(i);
        if (
          (T && e.grid.updateSlide(i, n, p, t), "none" !== n.css("display"))
        ) {
          if ("auto" === a.slidesPerView) {
            S && (c[i].style[t("width")] = "");
            const r = getComputedStyle(n[0]),
              l = n[0].style.transform,
              o = n[0].style.webkitTransform;
            if (
              (l && (n[0].style.transform = "none"),
              o && (n[0].style.webkitTransform = "none"),
              a.roundLengths)
            )
              $ = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
            else {
              const e = s(r, "width"),
                t = s(r, "padding-left"),
                a = s(r, "padding-right"),
                i = s(r, "margin-left"),
                l = s(r, "margin-right"),
                o = r.getPropertyValue("box-sizing");
              if (o && "border-box" === o) $ = e + i + l;
              else {
                const { clientWidth: s, offsetWidth: r } = n[0];
                $ = e + t + a + i + l + (r - s);
              }
            }
            l && (n[0].style.transform = l),
              o && (n[0].style.webkitTransform = o),
              a.roundLengths && ($ = Math.floor($));
          } else
            ($ = (r - (a.slidesPerView - 1) * x) / a.slidesPerView),
              a.roundLengths && ($ = Math.floor($)),
              c[i] && (c[i].style[t("width")] = `${$}px`);
          c[i] && (c[i].swiperSlideSize = $),
            m.push($),
            a.centeredSlides
              ? ((y = y + $ / 2 + E / 2 + x),
                0 === E && 0 !== i && (y = y - r / 2 - x),
                0 === i && (y = y - r / 2 - x),
                Math.abs(y) < 0.001 && (y = 0),
                a.roundLengths && (y = Math.floor(y)),
                C % a.slidesPerGroup == 0 && u.push(y),
                h.push(y))
              : (a.roundLengths && (y = Math.floor(y)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(y),
                h.push(y),
                (y = y + $ + x)),
            (e.virtualSize += $ + x),
            (E = $),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        n &&
          l &&
          ("slide" === a.effect || "coverflow" === a.effect) &&
          i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
        a.setWrapperSize &&
          i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
        T && e.grid.updateWrapperSize($, u, t),
        !a.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let i = u[s];
          a.roundLengths && (i = Math.floor(i)),
            u[s] <= e.virtualSize - r && t.push(i);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
        const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !a.cssMode || t !== c.length - 1).css({
          [s]: `${x}px`,
        });
      }
      if (a.centeredSlides && a.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (a.spaceBetween ? a.spaceBetween : 0);
        }),
          (e -= a.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
      }
      if (a.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (a.spaceBetween ? a.spaceBetween : 0);
          }),
          (e -= a.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
      ) {
        v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          v(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        u.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== b && e.emit("slidesGridLengthChange"),
        a.watchSlidesProgress && e.updateSlidesOffset(),
        !(o || a.cssMode || ("slide" !== a.effect && "fade" !== a.effect)))
      ) {
        const t = `${a.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        p <= a.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
      let i,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) =>
        a
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || d([])).each((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !a) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: a, rtlTranslate: i, snapGrid: r } = t;
      if (0 === a.length) return;
      void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      i && (n = e),
        a.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < a.length; e += 1) {
        const l = a[e];
        let o = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
        const d =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          c =
            (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          p = -(n - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          a.eq(e).addClass(s.slideVisibleClass)),
          (l.progress = i ? -d : d),
          (l.originalProgress = i ? -c : c);
      }
      t.visibleSlides = d(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: r, isEnd: n } = t;
      const l = r,
        o = n;
      0 === a
        ? ((i = 0), (r = !0), (n = !0))
        : ((i = (e - t.minTranslate()) / a), (r = i <= 0), (n = i >= 1)),
        Object.assign(t, { progress: i, isBeginning: r, isEnd: n }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !l && t.emit("reachBeginning toEdge"),
        n && !o && t.emit("reachEnd toEdge"),
        ((l && !r) || (o && !n)) && t.emit("fromEdge"),
        t.emit("progress", i);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: a,
          activeIndex: i,
          realIndex: r,
        } = e,
        n = e.virtual && s.virtual.enabled;
      let l;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (l = n
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${i}"]`
            )
          : t.eq(i)),
        l.addClass(s.slideActiveClass),
        s.loop &&
          (l.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : a
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          d.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: a,
          snapGrid: i,
          params: r,
          activeIndex: n,
          realIndex: l,
          snapIndex: o,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < a.length; e += 1)
          void 0 !== a[e + 1]
            ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
              ? (c = e)
              : s >= a[e] && s < a[e + 1] && (c = e + 1)
            : s >= a[e] && (c = e);
        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (i.indexOf(s) >= 0) d = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / r.slidesPerGroup);
      }
      if ((d >= i.length && (d = i.length - 1), c === n))
        return void (d !== o && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: p,
        previousIndex: n,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        l !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        a = d(e).closest(`.${s.slideClass}`)[0];
      let i,
        r = !1;
      if (a)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === a) {
            (r = !0), (i = e);
            break;
          }
      if (!a || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = a),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              d(a).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = i),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  var M = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -a : a;
      if (t.cssMode) return a;
      let r = h(i[0], e);
      return s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: a,
          params: i,
          $wrapperEl: r,
          wrapperEl: n,
          progress: l,
        } = s;
      let o,
        d = 0,
        c = 0;
      s.isHorizontal() ? (d = a ? -e : e) : (c = e),
        i.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        i.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -d
              : -c)
          : i.virtualTranslate ||
            r.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? d : c);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== l && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === a && (a = !0);
      const r = this,
        { params: n, wrapperEl: l } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const o = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = a && e > o ? o : a && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              w({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, i),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit("transitionEnd"));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function P(e) {
    let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let l = a;
    if (
      (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
      t.emit(`transition${i}`),
      s && r !== n)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
      t.emit(`slideChangeTransition${i}`),
        "next" === l
          ? t.emit(`slideNextTransition${i}`)
          : t.emit(`slidePrevTransition${i}`);
    }
  }
  var k = {
    slideTo: function (e, t, s, a, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = r;
      if ((r.animating && l.preventInteractionOnTransition) || (!m && !a && !i))
        return !1;
      const f = Math.min(r.params.slidesPerGroupSkip, n);
      let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const v = -o[g];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            a = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < a - (a - s) / 2
              ? (n = e)
              : t >= s && t < a && (n = e + 1)
            : t >= s && (n = e);
        }
      if (r.initialized && n !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      if (
        (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
        r.updateProgress(v),
        (b = n > p ? "next" : n < p ? "prev" : "reset"),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(n),
          l.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== l.effect && r.setTranslate(v),
          "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = r.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              w({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, a),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.$wrapperEl[0].addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, a) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const i = this;
      let r = e;
      return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        { animating: i, enabled: r, params: n } = a;
      if (!r) return a;
      let l = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
      const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
      if (n.loop) {
        if (i && n.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      return n.rewind && a.isEnd
        ? a.slideTo(0, e, t, s)
        : a.slideTo(a.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        {
          params: i,
          animating: r,
          snapGrid: n,
          slidesGrid: l,
          rtlTranslate: o,
          enabled: d,
        } = a;
      if (!d) return a;
      if (i.loop) {
        if (r && i.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = c(o ? a.translate : -a.translate),
        u = n.map((e) => c(e));
      let h = n[u.indexOf(p) - 1];
      if (void 0 === h && i.cssMode) {
        let e;
        n.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== h &&
          ((m = l.indexOf(h)),
          m < 0 && (m = a.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((m = m - a.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        i.rewind && a.isBeginning)
      ) {
        const i =
          a.params.virtual && a.params.virtual.enabled && a.virtual
            ? a.virtual.slides.length - 1
            : a.slides.length - 1;
        return a.slideTo(i, e, t, s);
      }
      return a.slideTo(m, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, a) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === a && (a = 0.5);
      const i = this;
      let r = i.activeIndex;
      const n = Math.min(i.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
      if (o >= i.snapGrid[l]) {
        const e = i.snapGrid[l];
        o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[l - 1];
        o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, i.slidesGrid.length - 1)),
        i.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        a =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - a / 2 ||
              r > e.slides.length - e.loopedSlides + a / 2
              ? (e.loopFix(),
                (r = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                p(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - a
            ? (e.loopFix(),
              (r = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              p(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var z = {
    loopCreate: function () {
      const e = this,
        t = a(),
        { params: s, $wrapperEl: i } = e,
        r = i.children().length > 0 ? d(i.children()[0].parentNode) : i;
      r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let n = r.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (n.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let a = 0; a < e; a += 1) {
            const e = d(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            r.append(e);
          }
          n = r.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = n.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > n.length &&
          e.params.loopedSlidesLimit &&
          (e.loopedSlides = n.length);
      const l = [],
        o = [];
      n.each((e, t) => {
        d(e).attr("data-swiper-slide-index", t);
      });
      for (let t = 0; t < e.loopedSlides; t += 1) {
        const e = t - Math.floor(t / n.length) * n.length;
        o.push(n.eq(e)[0]), l.unshift(n.eq(n.length - e - 1)[0]);
      }
      for (let e = 0; e < o.length; e += 1)
        r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = l.length - 1; e >= 0; e -= 1)
        r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: a,
        allowSlidePrev: i,
        allowSlideNext: r,
        snapGrid: n,
        rtlTranslate: l,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -n[t] - e.getTranslate();
      if (t < a) {
        (o = s.length - 3 * a + t), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      } else if (t >= s.length - a) {
        (o = -s.length + t + a), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function L(e) {
    const t = this,
      s = a(),
      i = r(),
      n = t.touchEventsData,
      { params: l, touches: o, enabled: c } = t;
    if (!c) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let p = e;
    p.originalEvent && (p = p.originalEvent);
    let h = d(p.target);
    if ("wrapper" === l.touchEventsTarget && !h.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = "touchstart" === p.type),
      !n.isTouchEvent && "which" in p && 3 === p.which)
    )
      return;
    if (!n.isTouchEvent && "button" in p && p.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const m = !!l.noSwipingClass && "" !== l.noSwipingClass,
      f = e.composedPath ? e.composedPath() : e.path;
    m && p.target && p.target.shadowRoot && f && (h = d(f[0]));
    const g = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      v = !(!p.target || !p.target.shadowRoot);
    if (
      l.noSwiping &&
      (v
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === a() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(g, h[0])
        : h.closest(g)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !h.closest(l.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX),
      (o.currentY =
        "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY);
    const w = o.currentX,
      b = o.currentY,
      x = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      y = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (x && (w <= y || w >= i.innerWidth - y)) {
      if ("prevent" !== x) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = w),
      (o.startY = b),
      (n.touchStartTime = u()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1),
      "touchstart" !== p.type)
    ) {
      let e = !0;
      h.is(n.focusableElements) &&
        ((e = !1), "SELECT" === h[0].nodeName && (n.isTouched = !1)),
        s.activeElement &&
          d(s.activeElement).is(n.focusableElements) &&
          s.activeElement !== h[0] &&
          s.activeElement.blur();
      const a = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !a) ||
        h[0].isContentEditable ||
        p.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", p);
  }
  function O(e) {
    const t = a(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: l, enabled: o } = s;
    if (!o) return;
    let c = e;
    if ((c.originalEvent && (c = c.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", c)
      );
    if (i.isTouchEvent && "touchmove" !== c.type) return;
    const p =
        "touchmove" === c.type &&
        c.targetTouches &&
        (c.targetTouches[0] || c.changedTouches[0]),
      h = "touchmove" === c.type ? p.pageX : c.pageX,
      m = "touchmove" === c.type ? p.pageY : c.pageY;
    if (c.preventedByNestedSwiper) return (n.startX = h), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        d(c.target).is(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, { startX: h, startY: m, currentX: h, currentY: m }),
          (i.touchStartTime = u()))
        )
      );
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (h < n.startX && s.translate <= s.maxTranslate()) ||
        (h > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      c.target === t.activeElement &&
      d(c.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", c),
      c.targetTouches && c.targetTouches.length > 1)
    )
      return;
    (n.currentX = h), (n.currentY = m);
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : f * f + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", c),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && c.cancelable && c.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && c.stopPropagation(),
      i.isMoved ||
        (r.loop && !r.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c)),
      s.emit("sliderMove", c),
      (i.isMoved = !0);
    let v = s.isHorizontal() ? f : g;
    (n.diff = v),
      (v *= r.touchRatio),
      l && (v = -v),
      (s.swipeDirection = v > 0 ? "prev" : "next"),
      (i.currentTranslate = v + i.startTranslate);
    let w = !0,
      b = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (b = 0),
      v > 0 && i.currentTranslate > s.minTranslate()
        ? ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + v) ** b))
        : v < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - v) ** b)),
      w && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function I(e) {
    const t = this,
      s = t.touchEventsData,
      { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
    if (!l) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = u(),
      c = d - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        c < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = u()),
      p(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === i.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = a.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (t.params.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    let m = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < n.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== n[e + t]
        ? h >= n[e] && h < n[e + t] && ((m = e), (f = n[e + t] - n[e]))
        : h >= n[e] && ((m = e), (f = n[n.length - 1] - n[n.length - 2]));
    }
    let g = null,
      v = null;
    a.rewind &&
      (t.isBeginning
        ? (v =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const w = (h - n[m]) / f,
      b = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (c > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (w >= a.longSwipesRatio
          ? t.slideTo(a.rewind && t.isEnd ? g : m + b)
          : t.slideTo(m)),
        "prev" === t.swipeDirection &&
          (w > 1 - a.longSwipesRatio
            ? t.slideTo(m + b)
            : null !== v && w < 0 && Math.abs(w) > a.longSwipesRatio
            ? t.slideTo(v)
            : t.slideTo(m));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(m + b)
          : t.slideTo(m)
        : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + b),
          "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m));
    }
  }
  function A() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = a),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function D(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function G() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let N = !1;
  function B() {}
  const H = (e, t) => {
    const s = a(),
      {
        params: i,
        touchEvents: r,
        el: n,
        wrapperEl: l,
        device: o,
        support: d,
      } = e,
      c = !!i.nested,
      p = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (d.touch) {
      const t = !(
        "touchstart" !== r.start ||
        !d.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      n[p](r.start, e.onTouchStart, t),
        n[p](
          r.move,
          e.onTouchMove,
          d.passiveListener ? { passive: !1, capture: c } : c
        ),
        n[p](r.end, e.onTouchEnd, t),
        r.cancel && n[p](r.cancel, e.onTouchEnd, t);
    } else
      n[p](r.start, e.onTouchStart, !1),
        s[p](r.move, e.onTouchMove, c),
        s[p](r.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      n[p]("click", e.onClick, !0),
      i.cssMode && l[p]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[u](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            A,
            !0
          )
        : e[u]("observerUpdate", A, !0);
  };
  var X = {
    attachEvents: function () {
      const e = this,
        t = a(),
        { params: s, support: i } = e;
      (e.onTouchStart = L.bind(e)),
        (e.onTouchMove = O.bind(e)),
        (e.onTouchEnd = I.bind(e)),
        s.cssMode && (e.onScroll = G.bind(e)),
        (e.onClick = D.bind(e)),
        i.touch && !N && (t.addEventListener("touchstart", B), (N = !0)),
        H(e, "on");
    },
    detachEvents: function () {
      H(this, "off");
    },
  };
  const Y = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var R = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: a, $el: i, device: r, support: n } = e,
        l = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((a) => {
                    e[a] && s.push(t + a);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !n.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: a },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { "watch-progress": s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  var W = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: !0,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function q(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const a = Object.keys(s)[0],
        i = s[a];
      "object" == typeof i && null !== i
        ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
            !0 === e[a] &&
            (e[a] = { auto: !0 }),
          a in e && "enabled" in i
            ? (!0 === e[a] && (e[a] = { enabled: !0 }),
              "object" != typeof e[a] ||
                "enabled" in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              g(t, s))
            : g(t, s))
        : g(t, s);
    };
  }
  const j = {
      eventsEmitter: $,
      update: S,
      translate: M,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            P({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          (s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              P({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: k,
      loop: z,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: X,
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: a = 0,
              params: i,
              $el: r,
            } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!l || e.currentBreakpoint === l) return;
          const o = (l in n ? n[l] : void 0) || e.originalParams,
            d = Y(e, i),
            c = Y(e, o),
            p = i.enabled;
          d && !c
            ? (r.removeClass(
                `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              c &&
              (r.addClass(`${i.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === i.grid.fill)) &&
                r.addClass(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              const s = i[t] && i[t].enabled,
                a = o[t] && o[t].enabled;
              s && !a && e[t].disable(), !s && a && e[t].enable();
            });
          const u = o.direction && o.direction !== i.direction,
            h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
          u && s && e.changeDirection(), g(e.params, o);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            p && !m ? e.disable() : !p && m && e.enable(),
            (e.currentBreakpoint = l),
            e.emit("_beforeBreakpoint", o),
            h &&
              s &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - a + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let a = !1;
          const i = r(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: r, value: n } = l[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r)
              : n <= s.clientWidth && (a = r);
          }
          return a || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: R,
      images: {
        loadImage: function (e, t, s, a, i, n) {
          const l = r();
          let o;
          function c() {
            n && n();
          }
          d(e).parent("picture")[0] || (e.complete && i)
            ? c()
            : t
            ? ((o = new l.Image()),
              (o.onload = c),
              (o.onerror = c),
              a && (o.sizes = a),
              s && (o.srcset = s),
              t && (o.src = t))
            : c();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute("src"),
              a.srcset || a.getAttribute("srcset"),
              a.sizes || a.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    _ = {};
  class V {
    constructor() {
      let e, t;
      for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++)
        a[i] = arguments[i];
      if (
        (1 === a.length &&
        a[0].constructor &&
        "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
          ? (t = a[0])
          : ([e, t] = a),
        t || (t = {}),
        (t = g({}, t)),
        e && !t.el && (t.el = e),
        t.el && d(t.el).length > 1)
      ) {
        const e = [];
        return (
          d(t.el).each((s) => {
            const a = g({}, t, { el: s });
            e.push(new V(a));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = E()),
        (r.device = C({ userAgent: t.userAgent })),
        (r.browser = T()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const n = {};
      r.modules.forEach((e) => {
        e({
          swiper: r,
          extendParams: q(t, n),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const l = g({}, W, n);
      return (
        (r.params = g({}, l, _, t)),
        (r.originalParams = g({}, r.params)),
        (r.passedParams = g({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        (r.$ = d),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: d(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (r.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              r.support.touch || !r.params.simulateTouch
                ? r.touchEventsTouch
                : r.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: u(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const a = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = a[l].swiperSlideSize;
        for (let s = l + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < a.length; e += 1) {
          (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          i[l] - i[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (a(), e.params.autoHeight && e.updateAutoHeight())
          : ((i =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            i || a()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        a = s.params.direction;
      return (
        e || (e = "horizontal" === a ? "vertical" : "horizontal"),
        e === a ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${a}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = d(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = d(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children ? s.children(i()) : d(s).children(i());
      })();
      if (0 === r.length && t.params.createElements) {
        const e = a().createElement("div");
        (r = d(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            r.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: r,
          wrapperEl: r[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === r.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: a, $el: i, $wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttr("style"),
            r.removeAttr("style"),
            n &&
              n.length &&
              n
                .removeClass(
                  [
                    a.slideVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      g(_, e);
    }
    static get extendedDefaults() {
      return _;
    }
    static get defaults() {
      return W;
    }
    static installModule(e) {
      V.prototype.__modules__ || (V.prototype.__modules__ = []);
      const t = V.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => V.installModule(e)), V)
        : (V.installModule(e), V);
    }
  }
  function F(e, t, s, i) {
    const r = a();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let n = e.$el.children(`.${i[a]}`)[0];
            n ||
              ((n = r.createElement("div")),
              (n.className = i[a]),
              e.$el.append(n)),
              (s[a] = n),
              (t[a] = n);
          }
        }),
      s
    );
  }
  function U(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function K(e) {
    const t = this,
      { $wrapperEl: s, params: a } = t;
    if ((a.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
      for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
    else s.append(e);
    a.loop && t.loopCreate(), a.observer || t.update();
  }
  function Z(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    if ("object" == typeof e && "length" in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
      r = i + e.length;
    } else a.prepend(e);
    s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1);
  }
  function Q(e, t) {
    const s = this,
      { $wrapperEl: a, params: i, activeIndex: r } = s;
    let n = r;
    i.loop &&
      ((n -= s.loopedSlides),
      s.loopDestroy(),
      (s.slides = a.children(`.${i.slideClass}`)));
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides.eq(t);
      e.remove(), d.unshift(e);
    }
    if ("object" == typeof t && "length" in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
      o = n > e ? n + t.length : n;
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    i.loop && s.loopCreate(),
      i.observer || s.update(),
      i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
  }
  function J(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    let r = i;
    s.loop &&
      ((r -= t.loopedSlides),
      t.loopDestroy(),
      (t.slides = a.children(`.${s.slideClass}`)));
    let n,
      l = r;
    if ("object" == typeof e && "length" in e) {
      for (let s = 0; s < e.length; s += 1)
        (n = e[s]), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
      l = Math.max(l, 0);
    } else (n = e), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), (l = Math.max(l, 0));
    s.loop && t.loopCreate(),
      s.observer || t.update(),
      s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
  }
  function ee() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function te(e) {
    const {
      effect: t,
      swiper: s,
      on: a,
      setTranslate: i,
      setTransition: r,
      overwriteParams: n,
      perspective: l,
      recreateShadows: o,
      getEffectParams: d,
    } = e;
    let c;
    a("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      a("setTranslate", () => {
        s.params.effect === t && i();
      }),
      a("setTransition", (e, a) => {
        s.params.effect === t && r(a);
      }),
      a("transitionEnd", () => {
        if (s.params.effect === t && o) {
          if (!d || !d().slideShadows) return;
          s.slides.each((e) => {
            s.$(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .remove();
          }),
            o();
        }
      }),
      a("virtualUpdate", () => {
        s.params.effect === t &&
          (s.slides.length || (c = !0),
          requestAnimationFrame(() => {
            c && s.slides && s.slides.length && (i(), (c = !1));
          }));
      });
  }
  function se(e, t) {
    return e.transformEl
      ? t
          .find(e.transformEl)
          .css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden",
          })
      : t;
  }
  function ae(e) {
    let { swiper: t, duration: s, transformEl: a, allSlides: i } = e;
    const { slides: r, activeIndex: n, $wrapperEl: l } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let e,
        s = !1;
      (e = i ? (a ? r.find(a) : r) : a ? r.eq(n).find(a) : r.eq(n)),
        e.transitionEnd(() => {
          if (s) return;
          if (!t || t.destroyed) return;
          (s = !0), (t.animating = !1);
          const e = ["webkitTransitionEnd", "transitionend"];
          for (let t = 0; t < e.length; t += 1) l.trigger(e[t]);
        });
    }
  }
  function ie(e, t, s) {
    const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
      i = e.transformEl ? t.find(e.transformEl) : t;
    let r = i.children(`.${a}`);
    return (
      r.length ||
        ((r = d(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`)),
        i.append(r)),
      r
    );
  }
  Object.keys(j).forEach((e) => {
    Object.keys(j[e]).forEach((t) => {
      V.prototype[t] = j[e][t];
    });
  }),
    V.use([
      function (e) {
        let { swiper: t, on: s, emit: a } = e;
        const i = r();
        let n = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (a("beforeResize"), a("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && a("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== i.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                l = i.requestAnimationFrame(() => {
                  const { width: s, height: a } = t;
                  let i = s,
                    r = a;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: a, target: n } = e;
                    (n && n !== t.el) ||
                      ((i = a ? a.width : (s[0] || s).inlineSize),
                      (r = a ? a.height : (s[0] || s).blockSize));
                  }),
                    (i === s && r === a) || o();
                });
              })),
              n.observe(t.el))
            : (i.addEventListener("resize", o),
              i.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            l && i.cancelAnimationFrame(l),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              i.removeEventListener("resize", o),
              i.removeEventListener("orientationchange", d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const n = [],
          l = r(),
          o = function (e, t) {
            void 0 === t && (t = {});
            const s = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void i("observerUpdate", e[0]);
                const t = function () {
                  i("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(t)
                  : l.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              n.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          a("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.$el[0], { childList: t.params.observeSlideChildren }),
                o(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          a("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]);
  const re = [
    function (e) {
      let t,
        { swiper: s, extendParams: a, on: i, emit: r } = e;
      function n(e, t) {
        const a = s.params.virtual;
        if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
        const i = a.renderSlide
          ? d(a.renderSlide.call(s, e, t))
          : d(
              `<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
            );
        return (
          i.attr("data-swiper-slide-index") ||
            i.attr("data-swiper-slide-index", t),
          a.cache && (s.virtual.cache[t] = i),
          i
        );
      }
      function l(e) {
        const {
            slidesPerView: t,
            slidesPerGroup: a,
            centeredSlides: i,
          } = s.params,
          { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual,
          { from: d, to: c, slides: p, slidesGrid: u, offset: h } = s.virtual;
        s.params.cssMode || s.updateActiveIndex();
        const m = s.activeIndex || 0;
        let f, g, v;
        (f = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
          i
            ? ((g = Math.floor(t / 2) + a + o), (v = Math.floor(t / 2) + a + l))
            : ((g = t + (a - 1) + o), (v = a + l));
        const w = Math.max((m || 0) - v, 0),
          b = Math.min((m || 0) + g, p.length - 1),
          x = (s.slidesGrid[w] || 0) - (s.slidesGrid[0] || 0);
        function y() {
          s.updateSlides(),
            s.updateProgress(),
            s.updateSlidesClasses(),
            s.lazy && s.params.lazy.enabled && s.lazy.load(),
            r("virtualUpdate");
        }
        if (
          (Object.assign(s.virtual, {
            from: w,
            to: b,
            offset: x,
            slidesGrid: s.slidesGrid,
          }),
          d === w && c === b && !e)
        )
          return (
            s.slidesGrid !== u && x !== h && s.slides.css(f, `${x}px`),
            s.updateProgress(),
            void r("virtualUpdate")
          );
        if (s.params.virtual.renderExternal)
          return (
            s.params.virtual.renderExternal.call(s, {
              offset: x,
              from: w,
              to: b,
              slides: (function () {
                const e = [];
                for (let t = w; t <= b; t += 1) e.push(p[t]);
                return e;
              })(),
            }),
            void (s.params.virtual.renderExternalUpdate
              ? y()
              : r("virtualUpdate"))
          );
        const E = [],
          C = [];
        if (e) s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
        else
          for (let e = d; e <= c; e += 1)
            (e < w || e > b) &&
              s.$wrapperEl
                .find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`)
                .remove();
        for (let t = 0; t < p.length; t += 1)
          t >= w &&
            t <= b &&
            (void 0 === c || e
              ? C.push(t)
              : (t > c && C.push(t), t < d && E.push(t)));
        C.forEach((e) => {
          s.$wrapperEl.append(n(p[e], e));
        }),
          E.sort((e, t) => t - e).forEach((e) => {
            s.$wrapperEl.prepend(n(p[e], e));
          }),
          s.$wrapperEl.children(".swiper-slide").css(f, `${x}px`),
          y();
      }
      a({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      }),
        (s.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: [],
        }),
        i("beforeInit", () => {
          s.params.virtual.enabled &&
            ((s.virtual.slides = s.params.virtual.slides),
            s.classNames.push(`${s.params.containerModifierClass}virtual`),
            (s.params.watchSlidesProgress = !0),
            (s.originalParams.watchSlidesProgress = !0),
            s.params.initialSlide || l());
        }),
        i("setTranslate", () => {
          s.params.virtual.enabled &&
            (s.params.cssMode && !s._immediateVirtual
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  l();
                }, 100)))
              : l());
        }),
        i("init update resize", () => {
          s.params.virtual.enabled &&
            s.params.cssMode &&
            v(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
        }),
        Object.assign(s.virtual, {
          appendSlide: function (e) {
            if ("object" == typeof e && "length" in e)
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.push(e[t]);
            else s.virtual.slides.push(e);
            l(!0);
          },
          prependSlide: function (e) {
            const t = s.activeIndex;
            let a = t + 1,
              i = 1;
            if (Array.isArray(e)) {
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.unshift(e[t]);
              (a = t + e.length), (i = e.length);
            } else s.virtual.slides.unshift(e);
            if (s.params.virtual.cache) {
              const e = s.virtual.cache,
                t = {};
              Object.keys(e).forEach((s) => {
                const a = e[s],
                  r = a.attr("data-swiper-slide-index");
                r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i),
                  (t[parseInt(s, 10) + i] = a);
              }),
                (s.virtual.cache = t);
            }
            l(!0), s.slideTo(a, 0);
          },
          removeSlide: function (e) {
            if (null == e) return;
            let t = s.activeIndex;
            if (Array.isArray(e))
              for (let a = e.length - 1; a >= 0; a -= 1)
                s.virtual.slides.splice(e[a], 1),
                  s.params.virtual.cache && delete s.virtual.cache[e[a]],
                  e[a] < t && (t -= 1),
                  (t = Math.max(t, 0));
            else
              s.virtual.slides.splice(e, 1),
                s.params.virtual.cache && delete s.virtual.cache[e],
                e < t && (t -= 1),
                (t = Math.max(t, 0));
            l(!0), s.slideTo(t, 0);
          },
          removeAllSlides: function () {
            (s.virtual.slides = []),
              s.params.virtual.cache && (s.virtual.cache = {}),
              l(!0),
              s.slideTo(0, 0);
          },
          update: l,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      const l = a(),
        o = r();
      function c(e) {
        if (!t.enabled) return;
        const { rtlTranslate: s } = t;
        let a = e;
        a.originalEvent && (a = a.originalEvent);
        const i = a.keyCode || a.charCode,
          r = t.params.keyboard.pageUpDown,
          d = r && 33 === i,
          c = r && 34 === i,
          p = 37 === i,
          u = 39 === i,
          h = 38 === i,
          m = 40 === i;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && u) || (t.isVertical() && m) || c)
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && p) || (t.isVertical() && h) || d)
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (l.activeElement &&
              l.activeElement.nodeName &&
              ("input" === l.activeElement.nodeName.toLowerCase() ||
                "textarea" === l.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (d || c || p || u || h || m)
          ) {
            let e = !1;
            if (
              t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
              0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
            )
              return;
            const a = t.$el,
              i = a[0].clientWidth,
              r = a[0].clientHeight,
              n = o.innerWidth,
              l = o.innerHeight,
              d = t.$el.offset();
            s && (d.left -= t.$el[0].scrollLeft);
            const c = [
              [d.left, d.top],
              [d.left + i, d.top],
              [d.left, d.top + r],
              [d.left + i, d.top + r],
            ];
            for (let t = 0; t < c.length; t += 1) {
              const s = c[t];
              if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                if (0 === s[0] && 0 === s[1]) continue;
                e = !0;
              }
            }
            if (!e) return;
          }
          t.isHorizontal()
            ? ((d || c || p || u) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
              (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
            : ((d || c || h || m) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (c || m) && t.slideNext(),
              (d || h) && t.slidePrev()),
            n("keyPress", i);
        }
      }
      function p() {
        t.keyboard.enabled ||
          (d(l).on("keydown", c), (t.keyboard.enabled = !0));
      }
      function u() {
        t.keyboard.enabled &&
          (d(l).off("keydown", c), (t.keyboard.enabled = !1));
      }
      (t.keyboard = { enabled: !1 }),
        s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        i("init", () => {
          t.params.keyboard.enabled && p();
        }),
        i("destroy", () => {
          t.keyboard.enabled && u();
        }),
        Object.assign(t.keyboard, { enable: p, disable: u });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      let l;
      s({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: "container",
          thresholdDelta: null,
          thresholdTime: null,
        },
      }),
        (t.mousewheel = { enabled: !1 });
      let o,
        c = u();
      const h = [];
      function m() {
        t.enabled && (t.mouseEntered = !0);
      }
      function f() {
        t.enabled && (t.mouseEntered = !1);
      }
      function g(e) {
        return (
          !(
            t.params.mousewheel.thresholdDelta &&
            e.delta < t.params.mousewheel.thresholdDelta
          ) &&
          !(
            t.params.mousewheel.thresholdTime &&
            u() - c < t.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && u() - c < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), i("scroll", e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), i("scroll", e.raw)),
            (c = new n.Date().getTime()),
            !1))
        );
      }
      function v(e) {
        let s = e,
          a = !0;
        if (!t.enabled) return;
        const r = t.params.mousewheel;
        t.params.cssMode && s.preventDefault();
        let n = t.$el;
        if (
          ("container" !== t.params.mousewheel.eventsTarget &&
            (n = d(t.params.mousewheel.eventsTarget)),
          !t.mouseEntered && !n[0].contains(s.target) && !r.releaseOnEdges)
        )
          return !0;
        s.originalEvent && (s = s.originalEvent);
        let c = 0;
        const m = t.rtlTranslate ? -1 : 1,
          f = (function (e) {
            let t = 0,
              s = 0,
              a = 0,
              i = 0;
            return (
              "detail" in e && (s = e.detail),
              "wheelDelta" in e && (s = -e.wheelDelta / 120),
              "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
              "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
              "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
              (a = 10 * t),
              (i = 10 * s),
              "deltaY" in e && (i = e.deltaY),
              "deltaX" in e && (a = e.deltaX),
              e.shiftKey && !a && ((a = i), (i = 0)),
              (a || i) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((a *= 40), (i *= 40))
                  : ((a *= 800), (i *= 800))),
              a && !t && (t = a < 1 ? -1 : 1),
              i && !s && (s = i < 1 ? -1 : 1),
              { spinX: t, spinY: s, pixelX: a, pixelY: i }
            );
          })(s);
        if (r.forceToAxis)
          if (t.isHorizontal()) {
            if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY))) return !0;
            c = -f.pixelX * m;
          } else {
            if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX))) return !0;
            c = -f.pixelY;
          }
        else
          c =
            Math.abs(f.pixelX) > Math.abs(f.pixelY) ? -f.pixelX * m : -f.pixelY;
        if (0 === c) return !0;
        r.invert && (c = -c);
        let v = t.getTranslate() + c * r.sensitivity;
        if (
          (v >= t.minTranslate() && (v = t.minTranslate()),
          v <= t.maxTranslate() && (v = t.maxTranslate()),
          (a =
            !!t.params.loop ||
            !(v === t.minTranslate() || v === t.maxTranslate())),
          a && t.params.nested && s.stopPropagation(),
          t.params.freeMode && t.params.freeMode.enabled)
        ) {
          const e = { time: u(), delta: Math.abs(c), direction: Math.sign(c) },
            a =
              o &&
              e.time < o.time + 500 &&
              e.delta <= o.delta &&
              e.direction === o.direction;
          if (!a) {
            (o = void 0), t.params.loop && t.loopFix();
            let n = t.getTranslate() + c * r.sensitivity;
            const d = t.isBeginning,
              u = t.isEnd;
            if (
              (n >= t.minTranslate() && (n = t.minTranslate()),
              n <= t.maxTranslate() && (n = t.maxTranslate()),
              t.setTransition(0),
              t.setTranslate(n),
              t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses(),
              ((!d && t.isBeginning) || (!u && t.isEnd)) &&
                t.updateSlidesClasses(),
              t.params.freeMode.sticky)
            ) {
              clearTimeout(l), (l = void 0), h.length >= 15 && h.shift();
              const s = h.length ? h[h.length - 1] : void 0,
                a = h[0];
              if (
                (h.push(e),
                s && (e.delta > s.delta || e.direction !== s.direction))
              )
                h.splice(0);
              else if (
                h.length >= 15 &&
                e.time - a.time < 500 &&
                a.delta - e.delta >= 1 &&
                e.delta <= 6
              ) {
                const s = c > 0 ? 0.8 : 0.2;
                (o = e),
                  h.splice(0),
                  (l = p(() => {
                    t.slideToClosest(t.params.speed, !0, void 0, s);
                  }, 0));
              }
              l ||
                (l = p(() => {
                  (o = e),
                    h.splice(0),
                    t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                }, 500));
            }
            if (
              (a || i("scroll", s),
              t.params.autoplay &&
                t.params.autoplayDisableOnInteraction &&
                t.autoplay.stop(),
              n === t.minTranslate() || n === t.maxTranslate())
            )
              return !0;
          }
        } else {
          const s = {
            time: u(),
            delta: Math.abs(c),
            direction: Math.sign(c),
            raw: e,
          };
          h.length >= 2 && h.shift();
          const a = h.length ? h[h.length - 1] : void 0;
          if (
            (h.push(s),
            a
              ? (s.direction !== a.direction ||
                  s.delta > a.delta ||
                  s.time > a.time + 150) &&
                g(s)
              : g(s),
            (function (e) {
              const s = t.params.mousewheel;
              if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
              } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(s))
          )
            return !0;
        }
        return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
      }
      function w(e) {
        let s = t.$el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (s = d(t.params.mousewheel.eventsTarget)),
          s[e]("mouseenter", m),
          s[e]("mouseleave", f),
          s[e]("wheel", v);
      }
      function b() {
        return t.params.cssMode
          ? (t.wrapperEl.removeEventListener("wheel", v), !0)
          : !t.mousewheel.enabled && (w("on"), (t.mousewheel.enabled = !0), !0);
      }
      function x() {
        return t.params.cssMode
          ? (t.wrapperEl.addEventListener(event, v), !0)
          : !!t.mousewheel.enabled &&
              (w("off"), (t.mousewheel.enabled = !1), !0);
      }
      a("init", () => {
        !t.params.mousewheel.enabled && t.params.cssMode && x(),
          t.params.mousewheel.enabled && b();
      }),
        a("destroy", () => {
          t.params.cssMode && b(), t.mousewheel.enabled && x();
        }),
        Object.assign(t.mousewheel, { enable: b, disable: x });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      function r(e) {
        let s;
        return (
          e &&
            ((s = d(e)),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.$el.find(e).length &&
              (s = t.$el.find(e))),
          s
        );
      }
      function n(e, s) {
        const a = t.params.navigation;
        e &&
          e.length > 0 &&
          (e[s ? "addClass" : "removeClass"](a.disabledClass),
          e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e[t.isLocked ? "addClass" : "removeClass"](a.lockClass));
      }
      function l() {
        if (t.params.loop) return;
        const { $nextEl: e, $prevEl: s } = t.navigation;
        n(s, t.isBeginning && !t.params.rewind),
          n(e, t.isEnd && !t.params.rewind);
      }
      function o(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), i("navigationPrev"));
      }
      function c(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), i("navigationNext"));
      }
      function p() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = F(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        const s = r(e.nextEl),
          a = r(e.prevEl);
        s && s.length > 0 && s.on("click", c),
          a && a.length > 0 && a.on("click", o),
          Object.assign(t.navigation, {
            $nextEl: s,
            nextEl: s && s[0],
            $prevEl: a,
            prevEl: a && a[0],
          }),
          t.enabled ||
            (s && s.addClass(e.lockClass), a && a.addClass(e.lockClass));
      }
      function u() {
        const { $nextEl: e, $prevEl: s } = t.navigation;
        e &&
          e.length &&
          (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
          s &&
            s.length &&
            (s.off("click", o),
            s.removeClass(t.params.navigation.disabledClass));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        a("init", () => {
          !1 === t.params.navigation.enabled ? h() : (p(), l());
        }),
        a("toEdge fromEdge lock unlock", () => {
          l();
        }),
        a("destroy", () => {
          u();
        }),
        a("enable disable", () => {
          const { $nextEl: e, $prevEl: s } = t.navigation;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            ),
            s &&
              s[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              );
        }),
        a("click", (e, s) => {
          const { $nextEl: a, $prevEl: r } = t.navigation,
            n = s.target;
          if (t.params.navigation.hideOnClick && !d(n).is(r) && !d(n).is(a)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === n || t.pagination.el.contains(n))
            )
              return;
            let e;
            a
              ? (e = a.hasClass(t.params.navigation.hiddenClass))
              : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
              i(!0 === e ? "navigationShow" : "navigationHide"),
              a && a.toggleClass(t.params.navigation.hiddenClass),
              r && r.toggleClass(t.params.navigation.hiddenClass);
          }
        });
      const h = () => {
        t.$el.addClass(t.params.navigation.navigationDisabledClass), u();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.$el.removeClass(t.params.navigation.navigationDisabledClass),
            p(),
            l();
        },
        disable: h,
        update: l,
        init: p,
        destroy: u,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const r = "swiper-pagination";
      let n;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, $el: null, bullets: [] });
      let l = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          !t.pagination.$el ||
          0 === t.pagination.$el.length
        );
      }
      function c(e, s) {
        const { bulletActiveClass: a } = t.params.pagination;
        e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
      }
      function p() {
        const e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        const a =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          r = t.pagination.$el;
        let p;
        const u = t.params.loop
          ? Math.ceil((a - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((p = Math.ceil(
                (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
              )),
              p > a - 1 - 2 * t.loopedSlides && (p -= a - 2 * t.loopedSlides),
              p > u - 1 && (p -= u),
              p < 0 && "bullets" !== t.params.paginationType && (p = u + p))
            : (p = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const a = t.pagination.bullets;
          let i, o, u;
          if (
            (s.dynamicBullets &&
              ((n = a
                .eq(0)
                [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              r.css(
                t.isHorizontal() ? "width" : "height",
                n * (s.dynamicMainBullets + 4) + "px"
              ),
              s.dynamicMainBullets > 1 &&
                void 0 !== t.previousIndex &&
                ((l += p - (t.previousIndex - t.loopedSlides || 0)),
                l > s.dynamicMainBullets - 1
                  ? (l = s.dynamicMainBullets - 1)
                  : l < 0 && (l = 0)),
              (i = Math.max(p - l, 0)),
              (o = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
              (u = (o + i) / 2)),
            a.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${s.bulletActiveClass}${e}`)
                .join(" ")
            ),
            r.length > 1)
          )
            a.each((e) => {
              const t = d(e),
                a = t.index();
              a === p && t.addClass(s.bulletActiveClass),
                s.dynamicBullets &&
                  (a >= i &&
                    a <= o &&
                    t.addClass(`${s.bulletActiveClass}-main`),
                  a === i && c(t, "prev"),
                  a === o && c(t, "next"));
            });
          else {
            const e = a.eq(p),
              r = e.index();
            if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
              const e = a.eq(i),
                n = a.eq(o);
              for (let e = i; e <= o; e += 1)
                a.eq(e).addClass(`${s.bulletActiveClass}-main`);
              if (t.params.loop)
                if (r >= a.length) {
                  for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                    a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                  a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                    `${s.bulletActiveClass}-prev`
                  );
                } else c(e, "prev"), c(n, "next");
              else c(e, "prev"), c(n, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(a.length, s.dynamicMainBullets + 4),
              r = (n * i - n) / 2 - u * n,
              l = e ? "right" : "left";
            a.css(t.isHorizontal() ? l : "top", `${r}px`);
          }
        }
        if (
          ("fraction" === s.type &&
            (r.find(U(s.currentClass)).text(s.formatFractionCurrent(p + 1)),
            r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),
          "progressbar" === s.type)
        ) {
          let e;
          e = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const a = (p + 1) / u;
          let i = 1,
            n = 1;
          "horizontal" === e ? (i = a) : (n = a),
            r
              .find(U(s.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`)
              .transition(t.params.speed);
        }
        "custom" === s.type && s.renderCustom
          ? (r.html(s.renderCustom(t, p + 1, u)), i("paginationRender", r[0]))
          : i("paginationUpdate", r[0]),
          t.params.watchOverflow &&
            t.enabled &&
            r[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
      }
      function u() {
        const e = t.params.pagination;
        if (o()) return;
        const s =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          a = t.pagination.$el;
        let r = "";
        if ("bullets" === e.type) {
          let i = t.params.loop
            ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.loop &&
            i > s &&
            (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, s, e.bulletClass))
              : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
          a.html(r), (t.pagination.bullets = a.find(U(e.bulletClass)));
        }
        "fraction" === e.type &&
          ((r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          a.html(r)),
          "progressbar" === e.type &&
            ((r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
            a.html(r)),
          "custom" !== e.type && i("paginationRender", t.pagination.$el[0]);
      }
      function h() {
        t.params.pagination = F(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" }
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s = d(e.el);
        0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            s.length > 1 &&
            ((s = t.$el.find(e.el)),
            s.length > 1 &&
              (s = s.filter((e) => d(e).parents(".swiper")[0] === t.el))),
          "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
          s.addClass(e.modifierClass + e.type),
          s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          "bullets" === e.type &&
            e.dynamicBullets &&
            (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
            (l = 0),
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
          "progressbar" === e.type &&
            e.progressbarOpposite &&
            s.addClass(e.progressbarOppositeClass),
          e.clickable &&
            s.on("click", U(e.bulletClass), function (e) {
              e.preventDefault();
              let s = d(this).index() * t.params.slidesPerGroup;
              t.params.loop && (s += t.loopedSlides), t.slideTo(s);
            }),
          Object.assign(t.pagination, { $el: s, el: s[0] }),
          t.enabled || s.addClass(e.lockClass));
      }
      function m() {
        const e = t.params.pagination;
        if (o()) return;
        const s = t.pagination.$el;
        s.removeClass(e.hiddenClass),
          s.removeClass(e.modifierClass + e.type),
          s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.pagination.bullets &&
            t.pagination.bullets.removeClass &&
            t.pagination.bullets.removeClass(e.bulletActiveClass),
          e.clickable && s.off("click", U(e.bulletClass));
      }
      a("init", () => {
        !1 === t.params.pagination.enabled ? f() : (h(), u(), p());
      }),
        a("activeIndexChange", () => {
          (t.params.loop || void 0 === t.snapIndex) && p();
        }),
        a("snapIndexChange", () => {
          t.params.loop || p();
        }),
        a("slidesLengthChange", () => {
          t.params.loop && (u(), p());
        }),
        a("snapGridLengthChange", () => {
          t.params.loop || (u(), p());
        }),
        a("destroy", () => {
          m();
        }),
        a("enable disable", () => {
          const { $el: e } = t.pagination;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.pagination.lockClass
            );
        }),
        a("lock unlock", () => {
          p();
        }),
        a("click", (e, s) => {
          const a = s.target,
            { $el: r } = t.pagination;
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !d(a).hasClass(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && a === t.navigation.nextEl) ||
                (t.navigation.prevEl && a === t.navigation.prevEl))
            )
              return;
            const e = r.hasClass(t.params.pagination.hiddenClass);
            i(!0 === e ? "paginationShow" : "paginationHide"),
              r.toggleClass(t.params.pagination.hiddenClass);
          }
        });
      const f = () => {
        t.$el.addClass(t.params.pagination.paginationDisabledClass),
          t.pagination.$el &&
            t.pagination.$el.addClass(
              t.params.pagination.paginationDisabledClass
            ),
          m();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.$el.removeClass(t.params.pagination.paginationDisabledClass),
            t.pagination.$el &&
              t.pagination.$el.removeClass(
                t.params.pagination.paginationDisabledClass
              ),
            h(),
            u(),
            p();
        },
        disable: f,
        render: u,
        update: p,
        init: h,
        destroy: m,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const n = a();
      let l,
        o,
        c,
        u,
        h = !1,
        m = null,
        f = null;
      function g() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e, rtlTranslate: s, progress: a } = t,
          { $dragEl: i, $el: r } = e,
          n = t.params.scrollbar;
        let l = o,
          d = (c - o) * a;
        s
          ? ((d = -d),
            d > 0 ? ((l = o - d), (d = 0)) : -d + o > c && (l = c + d))
          : d < 0
          ? ((l = o + d), (d = 0))
          : d + o > c && (l = c - d),
          t.isHorizontal()
            ? (i.transform(`translate3d(${d}px, 0, 0)`),
              (i[0].style.width = `${l}px`))
            : (i.transform(`translate3d(0px, ${d}px, 0)`),
              (i[0].style.height = `${l}px`)),
          n.hide &&
            (clearTimeout(m),
            (r[0].style.opacity = 1),
            (m = setTimeout(() => {
              (r[0].style.opacity = 0), r.transition(400);
            }, 1e3)));
      }
      function v() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e } = t,
          { $dragEl: s, $el: a } = e;
        (s[0].style.width = ""),
          (s[0].style.height = ""),
          (c = t.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
          (u =
            t.size /
            (t.virtualSize +
              t.params.slidesOffsetBefore -
              (t.params.centeredSlides ? t.snapGrid[0] : 0))),
          (o =
            "auto" === t.params.scrollbar.dragSize
              ? c * u
              : parseInt(t.params.scrollbar.dragSize, 10)),
          t.isHorizontal()
            ? (s[0].style.width = `${o}px`)
            : (s[0].style.height = `${o}px`),
          (a[0].style.display = u >= 1 ? "none" : ""),
          t.params.scrollbar.hide && (a[0].style.opacity = 0),
          t.params.watchOverflow &&
            t.enabled &&
            e.$el[t.isLocked ? "addClass" : "removeClass"](
              t.params.scrollbar.lockClass
            );
      }
      function w(e) {
        return t.isHorizontal()
          ? "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].clientX
            : e.clientX
          : "touchstart" === e.type || "touchmove" === e.type
          ? e.targetTouches[0].clientY
          : e.clientY;
      }
      function b(e) {
        const { scrollbar: s, rtlTranslate: a } = t,
          { $el: i } = s;
        let r;
        (r =
          (w(e) -
            i.offset()[t.isHorizontal() ? "left" : "top"] -
            (null !== l ? l : o / 2)) /
          (c - o)),
          (r = Math.max(Math.min(r, 1), 0)),
          a && (r = 1 - r);
        const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
        t.updateProgress(n),
          t.setTranslate(n),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
      }
      function x(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, $wrapperEl: i } = t,
          { $el: n, $dragEl: o } = a;
        (h = !0),
          (l =
            e.target === o[0] || e.target === o
              ? w(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          i.transition(100),
          o.transition(100),
          b(e),
          clearTimeout(f),
          n.transition(0),
          s.hide && n.css("opacity", 1),
          t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
          r("scrollbarDragStart", e);
      }
      function y(e) {
        const { scrollbar: s, $wrapperEl: a } = t,
          { $el: i, $dragEl: n } = s;
        h &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          b(e),
          a.transition(0),
          i.transition(0),
          n.transition(0),
          r("scrollbarDragMove", e));
      }
      function E(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, $wrapperEl: i } = t,
          { $el: n } = a;
        h &&
          ((h = !1),
          t.params.cssMode &&
            (t.$wrapperEl.css("scroll-snap-type", ""), i.transition("")),
          s.hide &&
            (clearTimeout(f),
            (f = p(() => {
              n.css("opacity", 0), n.transition(400);
            }, 1e3))),
          r("scrollbarDragEnd", e),
          s.snapOnRelease && t.slideToClosest());
      }
      function C(e) {
        const {
            scrollbar: s,
            touchEventsTouch: a,
            touchEventsDesktop: i,
            params: r,
            support: l,
          } = t,
          o = s.$el;
        if (!o) return;
        const d = o[0],
          c = !(!l.passiveListener || !r.passiveListeners) && {
            passive: !1,
            capture: !1,
          },
          p = !(!l.passiveListener || !r.passiveListeners) && {
            passive: !0,
            capture: !1,
          };
        if (!d) return;
        const u = "on" === e ? "addEventListener" : "removeEventListener";
        l.touch
          ? (d[u](a.start, x, c), d[u](a.move, y, c), d[u](a.end, E, p))
          : (d[u](i.start, x, c), n[u](i.move, y, c), n[u](i.end, E, p));
      }
      function T() {
        const { scrollbar: e, $el: s } = t;
        t.params.scrollbar = F(
          t,
          t.originalParams.scrollbar,
          t.params.scrollbar,
          { el: "swiper-scrollbar" }
        );
        const a = t.params.scrollbar;
        if (!a.el) return;
        let i = d(a.el);
        t.params.uniqueNavElements &&
          "string" == typeof a.el &&
          i.length > 1 &&
          1 === s.find(a.el).length &&
          (i = s.find(a.el)),
          i.addClass(t.isHorizontal() ? a.horizontalClass : a.verticalClass);
        let r = i.find(`.${t.params.scrollbar.dragClass}`);
        0 === r.length &&
          ((r = d(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
          i.append(r)),
          Object.assign(e, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
          a.draggable && t.params.scrollbar.el && t.scrollbar.el && C("on"),
          i &&
            i[t.enabled ? "removeClass" : "addClass"](
              t.params.scrollbar.lockClass
            );
      }
      function $() {
        const e = t.params.scrollbar,
          s = t.scrollbar.$el;
        s &&
          s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.params.scrollbar.el && t.scrollbar.el && C("off");
      }
      s({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
          scrollbarDisabledClass: "swiper-scrollbar-disabled",
          horizontalClass: "swiper-scrollbar-horizontal",
          verticalClass: "swiper-scrollbar-vertical",
        },
      }),
        (t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
        i("init", () => {
          !1 === t.params.scrollbar.enabled ? S() : (T(), v(), g());
        }),
        i("update resize observerUpdate lock unlock", () => {
          v();
        }),
        i("setTranslate", () => {
          g();
        }),
        i("setTransition", (e, s) => {
          !(function (e) {
            t.params.scrollbar.el &&
              t.scrollbar.el &&
              t.scrollbar.$dragEl.transition(e);
          })(s);
        }),
        i("enable disable", () => {
          const { $el: e } = t.scrollbar;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.scrollbar.lockClass
            );
        }),
        i("destroy", () => {
          $();
        });
      const S = () => {
        t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
          t.scrollbar.$el &&
            t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
          $();
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
            t.scrollbar.$el &&
              t.scrollbar.$el.removeClass(
                t.params.scrollbar.scrollbarDisabledClass
              ),
            T(),
            v(),
            g();
        },
        disable: S,
        updateSize: v,
        setTranslate: g,
        init: T,
        destroy: $,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ parallax: { enabled: !1 } });
      const i = (e, s) => {
          const { rtl: a } = t,
            i = d(e),
            r = a ? -1 : 1,
            n = i.attr("data-swiper-parallax") || "0";
          let l = i.attr("data-swiper-parallax-x"),
            o = i.attr("data-swiper-parallax-y");
          const c = i.attr("data-swiper-parallax-scale"),
            p = i.attr("data-swiper-parallax-opacity");
          if (
            (l || o
              ? ((l = l || "0"), (o = o || "0"))
              : t.isHorizontal()
              ? ((l = n), (o = "0"))
              : ((o = n), (l = "0")),
            (l =
              l.indexOf("%") >= 0
                ? parseInt(l, 10) * s * r + "%"
                : l * s * r + "px"),
            (o =
              o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px"),
            null != p)
          ) {
            const e = p - (p - 1) * (1 - Math.abs(s));
            i[0].style.opacity = e;
          }
          if (null == c) i.transform(`translate3d(${l}, ${o}, 0px)`);
          else {
            const e = c - (c - 1) * (1 - Math.abs(s));
            i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
          }
        },
        r = () => {
          const { $el: e, slides: s, progress: a, snapGrid: r } = t;
          e
            .children(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            )
            .each((e) => {
              i(e, a);
            }),
            s.each((e, s) => {
              let n = e.progress;
              t.params.slidesPerGroup > 1 &&
                "auto" !== t.params.slidesPerView &&
                (n += Math.ceil(s / 2) - a * (r.length - 1)),
                (n = Math.min(Math.max(n, -1), 1)),
                d(e)
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  )
                  .each((e) => {
                    i(e, n);
                  });
            });
        };
      a("beforeInit", () => {
        t.params.parallax.enabled &&
          ((t.params.watchSlidesProgress = !0),
          (t.originalParams.watchSlidesProgress = !0));
      }),
        a("init", () => {
          t.params.parallax.enabled && r();
        }),
        a("setTranslate", () => {
          t.params.parallax.enabled && r();
        }),
        a("setTransition", (e, s) => {
          t.params.parallax.enabled &&
            (function (e) {
              void 0 === e && (e = t.params.speed);
              const { $el: s } = t;
              s.find(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
              ).each((t) => {
                const s = d(t);
                let a =
                  parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (a = 0), s.transition(a);
              });
            })(s);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      s({
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (t.zoom = { enabled: !1 });
      let l,
        o,
        c,
        p = 1,
        u = !1;
      const m = {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3,
        },
        f = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        g = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let v = 1;
      function w(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX,
          s = e.targetTouches[0].pageY,
          a = e.targetTouches[1].pageX,
          i = e.targetTouches[1].pageY;
        return Math.sqrt((a - t) ** 2 + (i - s) ** 2);
      }
      function b(e) {
        const s = t.support,
          a = t.params.zoom;
        if (((o = !1), (c = !1), !s.gestures)) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (o = !0), (m.scaleStart = w(e));
        }
        (m.$slideEl && m.$slideEl.length) ||
        ((m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
        0 === m.$slideEl.length && (m.$slideEl = t.slides.eq(t.activeIndex)),
        (m.$imageEl = m.$slideEl
          .find(`.${a.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0)),
        (m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`)),
        (m.maxRatio = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
        0 !== m.$imageWrapEl.length)
          ? (m.$imageEl && m.$imageEl.transition(0), (u = !0))
          : (m.$imageEl = void 0);
      }
      function x(e) {
        const s = t.support,
          a = t.params.zoom,
          i = t.zoom;
        if (!s.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (c = !0), (m.scaleMove = w(e));
        }
        m.$imageEl && 0 !== m.$imageEl.length
          ? (s.gestures
              ? (i.scale = e.scale * p)
              : (i.scale = (m.scaleMove / m.scaleStart) * p),
            i.scale > m.maxRatio &&
              (i.scale = m.maxRatio - 1 + (i.scale - m.maxRatio + 1) ** 0.5),
            i.scale < a.minRatio &&
              (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** 0.5),
            m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
          : "gesturechange" === e.type && b(e);
      }
      function y(e) {
        const s = t.device,
          a = t.support,
          i = t.params.zoom,
          r = t.zoom;
        if (!a.gestures) {
          if (!o || !c) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !s.android)
          )
            return;
          (o = !1), (c = !1);
        }
        m.$imageEl &&
          0 !== m.$imageEl.length &&
          ((r.scale = Math.max(Math.min(r.scale, m.maxRatio), i.minRatio)),
          m.$imageEl
            .transition(t.params.speed)
            .transform(`translate3d(0,0,0) scale(${r.scale})`),
          (p = r.scale),
          (u = !1),
          1 === r.scale && (m.$slideEl = void 0));
      }
      function E(e) {
        const s = t.zoom;
        if (!m.$imageEl || 0 === m.$imageEl.length) return;
        if (((t.allowClick = !1), !f.isTouched || !m.$slideEl)) return;
        f.isMoved ||
          ((f.width = m.$imageEl[0].offsetWidth),
          (f.height = m.$imageEl[0].offsetHeight),
          (f.startX = h(m.$imageWrapEl[0], "x") || 0),
          (f.startY = h(m.$imageWrapEl[0], "y") || 0),
          (m.slideWidth = m.$slideEl[0].offsetWidth),
          (m.slideHeight = m.$slideEl[0].offsetHeight),
          m.$imageWrapEl.transition(0));
        const a = f.width * s.scale,
          i = f.height * s.scale;
        if (!(a < m.slideWidth && i < m.slideHeight)) {
          if (
            ((f.minX = Math.min(m.slideWidth / 2 - a / 2, 0)),
            (f.maxX = -f.minX),
            (f.minY = Math.min(m.slideHeight / 2 - i / 2, 0)),
            (f.maxY = -f.minY),
            (f.touchesCurrent.x =
              "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (f.touchesCurrent.y =
              "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
            !f.isMoved && !u)
          ) {
            if (
              t.isHorizontal() &&
              ((Math.floor(f.minX) === Math.floor(f.startX) &&
                f.touchesCurrent.x < f.touchesStart.x) ||
                (Math.floor(f.maxX) === Math.floor(f.startX) &&
                  f.touchesCurrent.x > f.touchesStart.x))
            )
              return void (f.isTouched = !1);
            if (
              !t.isHorizontal() &&
              ((Math.floor(f.minY) === Math.floor(f.startY) &&
                f.touchesCurrent.y < f.touchesStart.y) ||
                (Math.floor(f.maxY) === Math.floor(f.startY) &&
                  f.touchesCurrent.y > f.touchesStart.y))
            )
              return void (f.isTouched = !1);
          }
          e.cancelable && e.preventDefault(),
            e.stopPropagation(),
            (f.isMoved = !0),
            (f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX),
            (f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY),
            f.currentX < f.minX &&
              (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** 0.8),
            f.currentX > f.maxX &&
              (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** 0.8),
            f.currentY < f.minY &&
              (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** 0.8),
            f.currentY > f.maxY &&
              (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** 0.8),
            g.prevPositionX || (g.prevPositionX = f.touchesCurrent.x),
            g.prevPositionY || (g.prevPositionY = f.touchesCurrent.y),
            g.prevTime || (g.prevTime = Date.now()),
            (g.x =
              (f.touchesCurrent.x - g.prevPositionX) /
              (Date.now() - g.prevTime) /
              2),
            (g.y =
              (f.touchesCurrent.y - g.prevPositionY) /
              (Date.now() - g.prevTime) /
              2),
            Math.abs(f.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
            Math.abs(f.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
            (g.prevPositionX = f.touchesCurrent.x),
            (g.prevPositionY = f.touchesCurrent.y),
            (g.prevTime = Date.now()),
            m.$imageWrapEl.transform(
              `translate3d(${f.currentX}px, ${f.currentY}px,0)`
            );
        }
      }
      function C() {
        const e = t.zoom;
        m.$slideEl &&
          t.previousIndex !== t.activeIndex &&
          (m.$imageEl && m.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          m.$imageWrapEl && m.$imageWrapEl.transform("translate3d(0,0,0)"),
          (e.scale = 1),
          (p = 1),
          (m.$slideEl = void 0),
          (m.$imageEl = void 0),
          (m.$imageWrapEl = void 0));
      }
      function T(e) {
        const s = t.zoom,
          a = t.params.zoom;
        if (
          (m.$slideEl ||
            (e &&
              e.target &&
              (m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
            m.$slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (m.$slideEl = t.$wrapperEl.children(
                    `.${t.params.slideActiveClass}`
                  ))
                : (m.$slideEl = t.slides.eq(t.activeIndex))),
            (m.$imageEl = m.$slideEl
              .find(`.${a.containerClass}`)
              .eq(0)
              .find("picture, img, svg, canvas, .swiper-zoom-target")
              .eq(0)),
            (m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`))),
          !m.$imageEl ||
            0 === m.$imageEl.length ||
            !m.$imageWrapEl ||
            0 === m.$imageWrapEl.length)
        )
          return;
        let i, r, l, o, c, u, h, g, v, w, b, x, y, E, C, T, $, S;
        t.params.cssMode &&
          ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.touchAction = "none")),
          m.$slideEl.addClass(`${a.zoomedSlideClass}`),
          void 0 === f.touchesStart.x && e
            ? ((i =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (r = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((i = f.touchesStart.x), (r = f.touchesStart.y)),
          (s.scale = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
          (p = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
          e
            ? (($ = m.$slideEl[0].offsetWidth),
              (S = m.$slideEl[0].offsetHeight),
              (l = m.$slideEl.offset().left + n.scrollX),
              (o = m.$slideEl.offset().top + n.scrollY),
              (c = l + $ / 2 - i),
              (u = o + S / 2 - r),
              (v = m.$imageEl[0].offsetWidth),
              (w = m.$imageEl[0].offsetHeight),
              (b = v * s.scale),
              (x = w * s.scale),
              (y = Math.min($ / 2 - b / 2, 0)),
              (E = Math.min(S / 2 - x / 2, 0)),
              (C = -y),
              (T = -E),
              (h = c * s.scale),
              (g = u * s.scale),
              h < y && (h = y),
              h > C && (h = C),
              g < E && (g = E),
              g > T && (g = T))
            : ((h = 0), (g = 0)),
          m.$imageWrapEl
            .transition(300)
            .transform(`translate3d(${h}px, ${g}px,0)`),
          m.$imageEl
            .transition(300)
            .transform(`translate3d(0,0,0) scale(${s.scale})`);
      }
      function $() {
        const e = t.zoom,
          s = t.params.zoom;
        m.$slideEl ||
          (t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (m.$slideEl = t.$wrapperEl.children(
                `.${t.params.slideActiveClass}`
              ))
            : (m.$slideEl = t.slides.eq(t.activeIndex)),
          (m.$imageEl = m.$slideEl
            .find(`.${s.containerClass}`)
            .eq(0)
            .find("picture, img, svg, canvas, .swiper-zoom-target")
            .eq(0)),
          (m.$imageWrapEl = m.$imageEl.parent(`.${s.containerClass}`))),
          m.$imageEl &&
            0 !== m.$imageEl.length &&
            m.$imageWrapEl &&
            0 !== m.$imageWrapEl.length &&
            (t.params.cssMode &&
              ((t.wrapperEl.style.overflow = ""),
              (t.wrapperEl.style.touchAction = "")),
            (e.scale = 1),
            (p = 1),
            m.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            m.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            m.$slideEl.removeClass(`${s.zoomedSlideClass}`),
            (m.$slideEl = void 0));
      }
      function S(e) {
        const s = t.zoom;
        s.scale && 1 !== s.scale ? $() : T(e);
      }
      function M() {
        const e = t.support;
        return {
          passiveListener: !(
            "touchstart" !== t.touchEvents.start ||
            !e.passiveListener ||
            !t.params.passiveListeners
          ) && { passive: !0, capture: !1 },
          activeListenerWithCapture: !e.passiveListener || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function P() {
        return `.${t.params.slideClass}`;
      }
      function k(e) {
        const { passiveListener: s } = M(),
          a = P();
        t.$wrapperEl[e]("gesturestart", a, b, s),
          t.$wrapperEl[e]("gesturechange", a, x, s),
          t.$wrapperEl[e]("gestureend", a, y, s);
      }
      function z() {
        l || ((l = !0), k("on"));
      }
      function L() {
        l && ((l = !1), k("off"));
      }
      function O() {
        const e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        const s = t.support,
          { passiveListener: a, activeListenerWithCapture: i } = M(),
          r = P();
        s.gestures
          ? (t.$wrapperEl.on(t.touchEvents.start, z, a),
            t.$wrapperEl.on(t.touchEvents.end, L, a))
          : "touchstart" === t.touchEvents.start &&
            (t.$wrapperEl.on(t.touchEvents.start, r, b, a),
            t.$wrapperEl.on(t.touchEvents.move, r, x, i),
            t.$wrapperEl.on(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel &&
              t.$wrapperEl.on(t.touchEvents.cancel, r, y, a)),
          t.$wrapperEl.on(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            E,
            i
          );
      }
      function I() {
        const e = t.zoom;
        if (!e.enabled) return;
        const s = t.support;
        e.enabled = !1;
        const { passiveListener: a, activeListenerWithCapture: i } = M(),
          r = P();
        s.gestures
          ? (t.$wrapperEl.off(t.touchEvents.start, z, a),
            t.$wrapperEl.off(t.touchEvents.end, L, a))
          : "touchstart" === t.touchEvents.start &&
            (t.$wrapperEl.off(t.touchEvents.start, r, b, a),
            t.$wrapperEl.off(t.touchEvents.move, r, x, i),
            t.$wrapperEl.off(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel &&
              t.$wrapperEl.off(t.touchEvents.cancel, r, y, a)),
          t.$wrapperEl.off(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            E,
            i
          );
      }
      Object.defineProperty(t.zoom, "scale", {
        get: () => v,
        set(e) {
          if (v !== e) {
            const t = m.$imageEl ? m.$imageEl[0] : void 0,
              s = m.$slideEl ? m.$slideEl[0] : void 0;
            i("zoomChange", e, t, s);
          }
          v = e;
        },
      }),
        a("init", () => {
          t.params.zoom.enabled && O();
        }),
        a("destroy", () => {
          I();
        }),
        a("touchStart", (e, s) => {
          t.zoom.enabled &&
            (function (e) {
              const s = t.device;
              m.$imageEl &&
                0 !== m.$imageEl.length &&
                (f.isTouched ||
                  (s.android && e.cancelable && e.preventDefault(),
                  (f.isTouched = !0),
                  (f.touchesStart.x =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (f.touchesStart.y =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY)));
            })(s);
        }),
        a("touchEnd", (e, s) => {
          t.zoom.enabled &&
            (function () {
              const e = t.zoom;
              if (!m.$imageEl || 0 === m.$imageEl.length) return;
              if (!f.isTouched || !f.isMoved)
                return (f.isTouched = !1), void (f.isMoved = !1);
              (f.isTouched = !1), (f.isMoved = !1);
              let s = 300,
                a = 300;
              const i = g.x * s,
                r = f.currentX + i,
                n = g.y * a,
                l = f.currentY + n;
              0 !== g.x && (s = Math.abs((r - f.currentX) / g.x)),
                0 !== g.y && (a = Math.abs((l - f.currentY) / g.y));
              const o = Math.max(s, a);
              (f.currentX = r), (f.currentY = l);
              const d = f.width * e.scale,
                c = f.height * e.scale;
              (f.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                (f.maxX = -f.minX),
                (f.minY = Math.min(m.slideHeight / 2 - c / 2, 0)),
                (f.maxY = -f.minY),
                (f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX)),
                (f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY)),
                m.$imageWrapEl
                  .transition(o)
                  .transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`);
            })();
        }),
        a("doubleTap", (e, s) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            S(s);
        }),
        a("transitionEnd", () => {
          t.zoom.enabled && t.params.zoom.enabled && C();
        }),
        a("slideChange", () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C();
        }),
        Object.assign(t.zoom, {
          enable: O,
          disable: I,
          in: T,
          out: $,
          toggle: S,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      s({
        lazy: {
          checkInView: !1,
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          scrollingElement: "",
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader",
        },
      }),
        (t.lazy = {});
      let n = !1,
        l = !1;
      function o(e, s) {
        void 0 === s && (s = !0);
        const a = t.params.lazy;
        if (void 0 === e) return;
        if (0 === t.slides.length) return;
        const r =
            t.virtual && t.params.virtual.enabled
              ? t.$wrapperEl.children(
                  `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                )
              : t.slides.eq(e),
          n = r.find(
            `.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`
          );
        !r.hasClass(a.elementClass) ||
          r.hasClass(a.loadedClass) ||
          r.hasClass(a.loadingClass) ||
          n.push(r[0]),
          0 !== n.length &&
            n.each((e) => {
              const n = d(e);
              n.addClass(a.loadingClass);
              const l = n.attr("data-background"),
                c = n.attr("data-src"),
                p = n.attr("data-srcset"),
                u = n.attr("data-sizes"),
                h = n.parent("picture");
              t.loadImage(n[0], c || l, p, u, !1, () => {
                if (null != t && t && (!t || t.params) && !t.destroyed) {
                  if (
                    (l
                      ? (n.css("background-image", `url("${l}")`),
                        n.removeAttr("data-background"))
                      : (p &&
                          (n.attr("srcset", p), n.removeAttr("data-srcset")),
                        u && (n.attr("sizes", u), n.removeAttr("data-sizes")),
                        h.length &&
                          h.children("source").each((e) => {
                            const t = d(e);
                            t.attr("data-srcset") &&
                              (t.attr("srcset", t.attr("data-srcset")),
                              t.removeAttr("data-srcset"));
                          }),
                        c && (n.attr("src", c), n.removeAttr("data-src"))),
                    n.addClass(a.loadedClass).removeClass(a.loadingClass),
                    r.find(`.${a.preloaderClass}`).remove(),
                    t.params.loop && s)
                  ) {
                    const e = r.attr("data-swiper-slide-index");
                    if (r.hasClass(t.params.slideDuplicateClass)) {
                      o(
                        t.$wrapperEl
                          .children(
                            `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                          )
                          .index(),
                        !1
                      );
                    } else {
                      o(
                        t.$wrapperEl
                          .children(
                            `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                          )
                          .index(),
                        !1
                      );
                    }
                  }
                  i("lazyImageReady", r[0], n[0]),
                    t.params.autoHeight && t.updateAutoHeight();
                }
              }),
                i("lazyImageLoad", r[0], n[0]);
            });
      }
      function c() {
        const { $wrapperEl: e, params: s, slides: a, activeIndex: i } = t,
          r = t.virtual && s.virtual.enabled,
          n = s.lazy;
        let c = s.slidesPerView;
        function p(t) {
          if (r) {
            if (
              e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`)
                .length
            )
              return !0;
          } else if (a[t]) return !0;
          return !1;
        }
        function u(e) {
          return r ? d(e).attr("data-swiper-slide-index") : d(e).index();
        }
        if (
          ("auto" === c && (c = 0), l || (l = !0), t.params.watchSlidesProgress)
        )
          e.children(`.${s.slideVisibleClass}`).each((e) => {
            o(r ? d(e).attr("data-swiper-slide-index") : d(e).index());
          });
        else if (c > 1) for (let e = i; e < i + c; e += 1) p(e) && o(e);
        else o(i);
        if (n.loadPrevNext)
          if (c > 1 || (n.loadPrevNextAmount && n.loadPrevNextAmount > 1)) {
            const e = n.loadPrevNextAmount,
              t = Math.ceil(c),
              s = Math.min(i + t + Math.max(e, t), a.length),
              r = Math.max(i - Math.max(t, e), 0);
            for (let e = i + t; e < s; e += 1) p(e) && o(e);
            for (let e = r; e < i; e += 1) p(e) && o(e);
          } else {
            const t = e.children(`.${s.slideNextClass}`);
            t.length > 0 && o(u(t));
            const a = e.children(`.${s.slidePrevClass}`);
            a.length > 0 && o(u(a));
          }
      }
      function p() {
        const e = r();
        if (!t || t.destroyed) return;
        const s = t.params.lazy.scrollingElement
            ? d(t.params.lazy.scrollingElement)
            : d(e),
          a = s[0] === e,
          i = a ? e.innerWidth : s[0].offsetWidth,
          l = a ? e.innerHeight : s[0].offsetHeight,
          o = t.$el.offset(),
          { rtlTranslate: u } = t;
        let h = !1;
        u && (o.left -= t.$el[0].scrollLeft);
        const m = [
          [o.left, o.top],
          [o.left + t.width, o.top],
          [o.left, o.top + t.height],
          [o.left + t.width, o.top + t.height],
        ];
        for (let e = 0; e < m.length; e += 1) {
          const t = m[e];
          if (t[0] >= 0 && t[0] <= i && t[1] >= 0 && t[1] <= l) {
            if (0 === t[0] && 0 === t[1]) continue;
            h = !0;
          }
        }
        const f = !(
          "touchstart" !== t.touchEvents.start ||
          !t.support.passiveListener ||
          !t.params.passiveListeners
        ) && { passive: !0, capture: !1 };
        h
          ? (c(), s.off("scroll", p, f))
          : n || ((n = !0), s.on("scroll", p, f));
      }
      a("beforeInit", () => {
        t.params.lazy.enabled &&
          t.params.preloadImages &&
          (t.params.preloadImages = !1);
      }),
        a("init", () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
        }),
        a("scroll", () => {
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.freeMode.sticky &&
            c();
        }),
        a("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
        }),
        a("transitionStart", () => {
          t.params.lazy.enabled &&
            (t.params.lazy.loadOnTransitionStart ||
              (!t.params.lazy.loadOnTransitionStart && !l)) &&
            (t.params.lazy.checkInView ? p() : c());
        }),
        a("transitionEnd", () => {
          t.params.lazy.enabled &&
            !t.params.lazy.loadOnTransitionStart &&
            (t.params.lazy.checkInView ? p() : c());
        }),
        a("slideChange", () => {
          const {
            lazy: e,
            cssMode: s,
            watchSlidesProgress: a,
            touchReleaseOnEdges: i,
            resistanceRatio: r,
          } = t.params;
          e.enabled && (s || (a && (i || 0 === r))) && c();
        }),
        a("destroy", () => {
          t.$el &&
            t.$el
              .find(`.${t.params.lazy.loadingClass}`)
              .removeClass(t.params.lazy.loadingClass);
        }),
        Object.assign(t.lazy, { load: c, loadInSlide: o });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      function i(e, t) {
        const s = (function () {
          let e, t, s;
          return (a, i) => {
            for (t = -1, e = a.length; e - t > 1; )
              (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
            return e;
          };
        })();
        let a, i;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((i = s(this.x, e)),
                (a = i - 1),
                ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                  (this.x[i] - this.x[a]) +
                  this.y[a])
              : 0;
          }),
          this
        );
      }
      function r() {
        t.controller.control &&
          t.controller.spline &&
          ((t.controller.spline = void 0), delete t.controller.spline);
      }
      s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (t.controller = { control: void 0 }),
        a("beforeInit", () => {
          t.controller.control = t.params.controller.control;
        }),
        a("update", () => {
          r();
        }),
        a("resize", () => {
          r();
        }),
        a("observerUpdate", () => {
          r();
        }),
        a("setTranslate", (e, s, a) => {
          t.controller.control && t.controller.setTranslate(s, a);
        }),
        a("setTransition", (e, s, a) => {
          t.controller.control && t.controller.setTransition(s, a);
        }),
        Object.assign(t.controller, {
          setTranslate: function (e, s) {
            const a = t.controller.control;
            let r, n;
            const l = t.constructor;
            function o(e) {
              const s = t.rtlTranslate ? -t.translate : t.translate;
              "slide" === t.params.controller.by &&
                (!(function (e) {
                  t.controller.spline ||
                    (t.controller.spline = t.params.loop
                      ? new i(t.slidesGrid, e.slidesGrid)
                      : new i(t.snapGrid, e.snapGrid));
                })(e),
                (n = -t.controller.spline.interpolate(-s))),
                (n && "container" !== t.params.controller.by) ||
                  ((r =
                    (e.maxTranslate() - e.minTranslate()) /
                    (t.maxTranslate() - t.minTranslate())),
                  (n = (s - t.minTranslate()) * r + e.minTranslate())),
                t.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, t),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
            }
            if (Array.isArray(a))
              for (let e = 0; e < a.length; e += 1)
                a[e] !== s && a[e] instanceof l && o(a[e]);
            else a instanceof l && s !== a && o(a);
          },
          setTransition: function (e, s) {
            const a = t.constructor,
              i = t.controller.control;
            let r;
            function n(s) {
              s.setTransition(e, t),
                0 !== e &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    p(() => {
                      s.updateAutoHeight();
                    }),
                  s.$wrapperEl.transitionEnd(() => {
                    i &&
                      (s.params.loop &&
                        "slide" === t.params.controller.by &&
                        s.loopFix(),
                      s.transitionEnd());
                  }));
            }
            if (Array.isArray(i))
              for (r = 0; r < i.length; r += 1)
                i[r] !== s && i[r] instanceof a && n(i[r]);
            else i instanceof a && s !== i && n(i);
          },
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          itemRoleDescriptionMessage: null,
          slideRole: "group",
          id: null,
        },
      }),
        (t.a11y = { clicked: !1 });
      let i = null;
      function r(e) {
        const t = i;
        0 !== t.length && (t.html(""), t.html(e));
      }
      function n(e) {
        e.attr("tabIndex", "0");
      }
      function l(e) {
        e.attr("tabIndex", "-1");
      }
      function o(e, t) {
        e.attr("role", t);
      }
      function c(e, t) {
        e.attr("aria-roledescription", t);
      }
      function p(e, t) {
        e.attr("aria-label", t);
      }
      function u(e) {
        e.attr("aria-disabled", !0);
      }
      function h(e) {
        e.attr("aria-disabled", !1);
      }
      function m(e) {
        if (13 !== e.keyCode && 32 !== e.keyCode) return;
        const s = t.params.a11y,
          a = d(e.target);
        t.navigation &&
          t.navigation.$nextEl &&
          a.is(t.navigation.$nextEl) &&
          ((t.isEnd && !t.params.loop) || t.slideNext(),
          t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
          t.navigation &&
            t.navigation.$prevEl &&
            a.is(t.navigation.$prevEl) &&
            ((t.isBeginning && !t.params.loop) || t.slidePrev(),
            t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
          t.pagination &&
            a.is(U(t.params.pagination.bulletClass)) &&
            a[0].click();
      }
      function f() {
        return (
          t.pagination && t.pagination.bullets && t.pagination.bullets.length
        );
      }
      function g() {
        return f() && t.params.pagination.clickable;
      }
      const v = (e, t, s) => {
          n(e),
            "BUTTON" !== e[0].tagName && (o(e, "button"), e.on("keydown", m)),
            p(e, s),
            (function (e, t) {
              e.attr("aria-controls", t);
            })(e, t);
        },
        w = () => {
          t.a11y.clicked = !0;
        },
        b = () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              t.destroyed || (t.a11y.clicked = !1);
            });
          });
        },
        x = (e) => {
          if (t.a11y.clicked) return;
          const s = e.target.closest(`.${t.params.slideClass}`);
          if (!s || !t.slides.includes(s)) return;
          const a = t.slides.indexOf(s) === t.activeIndex,
            i =
              t.params.watchSlidesProgress &&
              t.visibleSlides &&
              t.visibleSlides.includes(s);
          a ||
            i ||
            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
            (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
            t.slideTo(t.slides.indexOf(s), 0));
        },
        y = () => {
          const e = t.params.a11y;
          e.itemRoleDescriptionMessage &&
            c(d(t.slides), e.itemRoleDescriptionMessage),
            e.slideRole && o(d(t.slides), e.slideRole);
          const s = t.params.loop
            ? t.slides.filter(
                (e) => !e.classList.contains(t.params.slideDuplicateClass)
              ).length
            : t.slides.length;
          e.slideLabelMessage &&
            t.slides.each((a, i) => {
              const r = d(a),
                n = t.params.loop
                  ? parseInt(r.attr("data-swiper-slide-index"), 10)
                  : i;
              p(
                r,
                e.slideLabelMessage
                  .replace(/\{\{index\}\}/, n + 1)
                  .replace(/\{\{slidesLength\}\}/, s)
              );
            });
        },
        E = () => {
          const e = t.params.a11y;
          t.$el.append(i);
          const s = t.$el;
          e.containerRoleDescriptionMessage &&
            c(s, e.containerRoleDescriptionMessage),
            e.containerMessage && p(s, e.containerMessage);
          const a = t.$wrapperEl,
            r =
              e.id ||
              a.attr("id") ||
              `swiper-wrapper-${
                ((n = 16),
                void 0 === n && (n = 16),
                "x"
                  .repeat(n)
                  .replace(/x/g, () =>
                    Math.round(16 * Math.random()).toString(16)
                  ))
              }`;
          var n;
          const l =
            t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
          var o;
          let d, u;
          (o = r),
            a.attr("id", o),
            (function (e, t) {
              e.attr("aria-live", t);
            })(a, l),
            y(),
            t.navigation && t.navigation.$nextEl && (d = t.navigation.$nextEl),
            t.navigation && t.navigation.$prevEl && (u = t.navigation.$prevEl),
            d && d.length && v(d, r, e.nextSlideMessage),
            u && u.length && v(u, r, e.prevSlideMessage),
            g() &&
              t.pagination.$el.on(
                "keydown",
                U(t.params.pagination.bulletClass),
                m
              ),
            t.$el.on("focus", x, !0),
            t.$el.on("pointerdown", w, !0),
            t.$el.on("pointerup", b, !0);
        };
      a("beforeInit", () => {
        i = d(
          `<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
        );
      }),
        a("afterInit", () => {
          t.params.a11y.enabled && E();
        }),
        a(
          "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
          () => {
            t.params.a11y.enabled && y();
          }
        ),
        a("fromEdge toEdge afterInit lock unlock", () => {
          t.params.a11y.enabled &&
            (function () {
              if (t.params.loop || t.params.rewind || !t.navigation) return;
              const { $nextEl: e, $prevEl: s } = t.navigation;
              s &&
                s.length > 0 &&
                (t.isBeginning ? (u(s), l(s)) : (h(s), n(s))),
                e && e.length > 0 && (t.isEnd ? (u(e), l(e)) : (h(e), n(e)));
            })();
        }),
        a("paginationUpdate", () => {
          t.params.a11y.enabled &&
            (function () {
              const e = t.params.a11y;
              f() &&
                t.pagination.bullets.each((s) => {
                  const a = d(s);
                  t.params.pagination.clickable &&
                    (n(a),
                    t.params.pagination.renderBullet ||
                      (o(a, "button"),
                      p(
                        a,
                        e.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          a.index() + 1
                        )
                      ))),
                    a.is(`.${t.params.pagination.bulletActiveClass}`)
                      ? a.attr("aria-current", "true")
                      : a.removeAttr("aria-current");
                });
            })();
        }),
        a("destroy", () => {
          t.params.a11y.enabled &&
            (function () {
              let e, s;
              i && i.length > 0 && i.remove(),
                t.navigation &&
                  t.navigation.$nextEl &&
                  (e = t.navigation.$nextEl),
                t.navigation &&
                  t.navigation.$prevEl &&
                  (s = t.navigation.$prevEl),
                e && e.off("keydown", m),
                s && s.off("keydown", m),
                g() &&
                  t.pagination.$el.off(
                    "keydown",
                    U(t.params.pagination.bulletClass),
                    m
                  ),
                t.$el.off("focus", x, !0),
                t.$el.off("pointerdown", w, !0),
                t.$el.off("pointerup", b, !0);
            })();
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        history: {
          enabled: !1,
          root: "",
          replaceState: !1,
          key: "slides",
          keepQuery: !1,
        },
      });
      let i = !1,
        n = {};
      const l = (e) =>
          e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        o = (e) => {
          const t = r();
          let s;
          s = e ? new URL(e) : t.location;
          const a = s.pathname
              .slice(1)
              .split("/")
              .filter((e) => "" !== e),
            i = a.length;
          return { key: a[i - 2], value: a[i - 1] };
        },
        d = (e, s) => {
          const a = r();
          if (!i || !t.params.history.enabled) return;
          let n;
          n = t.params.url ? new URL(t.params.url) : a.location;
          const o = t.slides.eq(s);
          let d = l(o.attr("data-history"));
          if (t.params.history.root.length > 0) {
            let s = t.params.history.root;
            "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
              (d = `${s}/${e}/${d}`);
          } else n.pathname.includes(e) || (d = `${e}/${d}`);
          t.params.history.keepQuery && (d += n.search);
          const c = a.history.state;
          (c && c.value === d) ||
            (t.params.history.replaceState
              ? a.history.replaceState({ value: d }, null, d)
              : a.history.pushState({ value: d }, null, d));
        },
        c = (e, s, a) => {
          if (s)
            for (let i = 0, r = t.slides.length; i < r; i += 1) {
              const r = t.slides.eq(i);
              if (
                l(r.attr("data-history")) === s &&
                !r.hasClass(t.params.slideDuplicateClass)
              ) {
                const s = r.index();
                t.slideTo(s, e, a);
              }
            }
          else t.slideTo(0, e, a);
        },
        p = () => {
          (n = o(t.params.url)), c(t.params.speed, n.value, !1);
        };
      a("init", () => {
        t.params.history.enabled &&
          (() => {
            const e = r();
            if (t.params.history) {
              if (!e.history || !e.history.pushState)
                return (
                  (t.params.history.enabled = !1),
                  void (t.params.hashNavigation.enabled = !0)
                );
              (i = !0),
                (n = o(t.params.url)),
                (n.key || n.value) &&
                  (c(0, n.value, t.params.runCallbacksOnInit),
                  t.params.history.replaceState ||
                    e.addEventListener("popstate", p));
            }
          })();
      }),
        a("destroy", () => {
          t.params.history.enabled &&
            (() => {
              const e = r();
              t.params.history.replaceState ||
                e.removeEventListener("popstate", p);
            })();
        }),
        a("transitionEnd _freeModeNoMomentumRelease", () => {
          i && d(t.params.history.key, t.activeIndex);
        }),
        a("slideChange", () => {
          i && t.params.cssMode && d(t.params.history.key, t.activeIndex);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: i, on: n } = e,
        l = !1;
      const o = a(),
        c = r();
      s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
      const p = () => {
          i("hashChange");
          const e = o.location.hash.replace("#", "");
          if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
            const s = t.$wrapperEl
              .children(`.${t.params.slideClass}[data-hash="${e}"]`)
              .index();
            if (void 0 === s) return;
            t.slideTo(s);
          }
        },
        u = () => {
          if (l && t.params.hashNavigation.enabled)
            if (
              t.params.hashNavigation.replaceState &&
              c.history &&
              c.history.replaceState
            )
              c.history.replaceState(
                null,
                null,
                `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""
              ),
                i("hashSet");
            else {
              const e = t.slides.eq(t.activeIndex),
                s = e.attr("data-hash") || e.attr("data-history");
              (o.location.hash = s || ""), i("hashSet");
            }
        };
      n("init", () => {
        t.params.hashNavigation.enabled &&
          (() => {
            if (
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
              return;
            l = !0;
            const e = o.location.hash.replace("#", "");
            if (e) {
              const s = 0;
              for (let a = 0, i = t.slides.length; a < i; a += 1) {
                const i = t.slides.eq(a);
                if (
                  (i.attr("data-hash") || i.attr("data-history")) === e &&
                  !i.hasClass(t.params.slideDuplicateClass)
                ) {
                  const e = i.index();
                  t.slideTo(e, s, t.params.runCallbacksOnInit, !0);
                }
              }
            }
            t.params.hashNavigation.watchState && d(c).on("hashchange", p);
          })();
      }),
        n("destroy", () => {
          t.params.hashNavigation.enabled &&
            t.params.hashNavigation.watchState &&
            d(c).off("hashchange", p);
        }),
        n("transitionEnd _freeModeNoMomentumRelease", () => {
          l && u();
        }),
        n("slideChange", () => {
          l && t.params.cssMode && u();
        });
    },
    function (e) {
      let t,
        { swiper: s, extendParams: i, on: r, emit: n } = e;
      function l() {
        if (!s.size)
          return (s.autoplay.running = !1), void (s.autoplay.paused = !1);
        const e = s.slides.eq(s.activeIndex);
        let a = s.params.autoplay.delay;
        e.attr("data-swiper-autoplay") &&
          (a = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
          clearTimeout(t),
          (t = p(() => {
            let e;
            s.params.autoplay.reverseDirection
              ? s.params.loop
                ? (s.loopFix(),
                  (e = s.slidePrev(s.params.speed, !0, !0)),
                  n("autoplay"))
                : s.isBeginning
                ? s.params.autoplay.stopOnLastSlide
                  ? d()
                  : ((e = s.slideTo(
                      s.slides.length - 1,
                      s.params.speed,
                      !0,
                      !0
                    )),
                    n("autoplay"))
                : ((e = s.slidePrev(s.params.speed, !0, !0)), n("autoplay"))
              : s.params.loop
              ? (s.loopFix(),
                (e = s.slideNext(s.params.speed, !0, !0)),
                n("autoplay"))
              : s.isEnd
              ? s.params.autoplay.stopOnLastSlide
                ? d()
                : ((e = s.slideTo(0, s.params.speed, !0, !0)), n("autoplay"))
              : ((e = s.slideNext(s.params.speed, !0, !0)), n("autoplay")),
              ((s.params.cssMode && s.autoplay.running) || !1 === e) && l();
          }, a));
      }
      function o() {
        return (
          void 0 === t &&
          !s.autoplay.running &&
          ((s.autoplay.running = !0), n("autoplayStart"), l(), !0)
        );
      }
      function d() {
        return (
          !!s.autoplay.running &&
          void 0 !== t &&
          (t && (clearTimeout(t), (t = void 0)),
          (s.autoplay.running = !1),
          n("autoplayStop"),
          !0)
        );
      }
      function c(e) {
        s.autoplay.running &&
          (s.autoplay.paused ||
            (t && clearTimeout(t),
            (s.autoplay.paused = !0),
            0 !== e && s.params.autoplay.waitForTransition
              ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                  s.$wrapperEl[0].addEventListener(e, h);
                })
              : ((s.autoplay.paused = !1), l())));
      }
      function u() {
        const e = a();
        "hidden" === e.visibilityState && s.autoplay.running && c(),
          "visible" === e.visibilityState &&
            s.autoplay.paused &&
            (l(), (s.autoplay.paused = !1));
      }
      function h(e) {
        s &&
          !s.destroyed &&
          s.$wrapperEl &&
          e.target === s.$wrapperEl[0] &&
          (["transitionend", "webkitTransitionEnd"].forEach((e) => {
            s.$wrapperEl[0].removeEventListener(e, h);
          }),
          (s.autoplay.paused = !1),
          s.autoplay.running ? l() : d());
      }
      function m() {
        s.params.autoplay.disableOnInteraction
          ? d()
          : (n("autoplayPause"), c()),
          ["transitionend", "webkitTransitionEnd"].forEach((e) => {
            s.$wrapperEl[0].removeEventListener(e, h);
          });
      }
      function f() {
        s.params.autoplay.disableOnInteraction ||
          ((s.autoplay.paused = !1), n("autoplayResume"), l());
      }
      (s.autoplay = { running: !1, paused: !1 }),
        i({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        r("init", () => {
          if (s.params.autoplay.enabled) {
            o();
            a().addEventListener("visibilitychange", u),
              s.params.autoplay.pauseOnMouseEnter &&
                (s.$el.on("mouseenter", m), s.$el.on("mouseleave", f));
          }
        }),
        r("beforeTransitionStart", (e, t, a) => {
          s.autoplay.running &&
            (a || !s.params.autoplay.disableOnInteraction
              ? s.autoplay.pause(t)
              : d());
        }),
        r("sliderFirstMove", () => {
          s.autoplay.running &&
            (s.params.autoplay.disableOnInteraction ? d() : c());
        }),
        r("touchEnd", () => {
          s.params.cssMode &&
            s.autoplay.paused &&
            !s.params.autoplay.disableOnInteraction &&
            l();
        }),
        r("destroy", () => {
          s.$el.off("mouseenter", m),
            s.$el.off("mouseleave", f),
            s.autoplay.running && d();
          a().removeEventListener("visibilitychange", u);
        }),
        Object.assign(s.autoplay, { pause: c, run: l, start: o, stop: d });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let i = !1,
        r = !1;
      function n() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const s = e.clickedIndex,
          a = e.clickedSlide;
        if (a && d(a).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
        if (null == s) return;
        let i;
        if (
          ((i = e.params.loop
            ? parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10)
            : s),
          t.params.loop)
        ) {
          let e = t.activeIndex;
          t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
            (t.loopFix(),
            (t._clientLeft = t.$wrapperEl[0].clientLeft),
            (e = t.activeIndex));
          const s = t.slides
              .eq(e)
              .prevAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index(),
            a = t.slides
              .eq(e)
              .nextAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index();
          i = void 0 === s ? a : void 0 === a ? s : a - e < e - s ? a : s;
        }
        t.slideTo(i);
      }
      function l() {
        const { thumbs: e } = t.params;
        if (i) return !1;
        i = !0;
        const s = t.constructor;
        if (e.swiper instanceof s)
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (m(e.swiper)) {
          const a = Object.assign({}, e.swiper);
          Object.assign(a, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(a)),
            (r = !0);
        }
        return (
          t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
          t.thumbs.swiper.on("tap", n),
          !0
        );
      }
      function o(e) {
        const s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        const a =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView;
        let i = 1;
        const r = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (i = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (i = 1),
          (i = Math.floor(i)),
          s.slides.removeClass(r),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let e = 0; e < i; e += 1)
            s.$wrapperEl
              .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
              .addClass(r);
        else
          for (let e = 0; e < i; e += 1)
            s.slides.eq(t.realIndex + e).addClass(r);
        const n = t.params.thumbs.autoScrollOffset,
          l = n && !s.params.loop;
        if (t.realIndex !== s.realIndex || l) {
          let i,
            r,
            o = s.activeIndex;
          if (s.params.loop) {
            s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
              (s.loopFix(),
              (s._clientLeft = s.$wrapperEl[0].clientLeft),
              (o = s.activeIndex));
            const e = s.slides
                .eq(o)
                .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index(),
              a = s.slides
                .eq(o)
                .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index();
            (i =
              void 0 === e
                ? a
                : void 0 === a
                ? e
                : a - o == o - e
                ? s.params.slidesPerGroup > 1
                  ? a
                  : o
                : a - o < o - e
                ? a
                : e),
              (r = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else (i = t.realIndex), (r = i > t.previousIndex ? "next" : "prev");
          l && (i += "next" === r ? n : -1 * n),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(i) < 0 &&
              (s.params.centeredSlides
                ? (i =
                    i > o
                      ? i - Math.floor(a / 2) + 1
                      : i + Math.floor(a / 2) - 1)
                : i > o && s.params.slidesPerGroup,
              s.slideTo(i, e ? 0 : void 0));
        }
      }
      (t.thumbs = { swiper: null }),
        a("beforeInit", () => {
          const { thumbs: e } = t.params;
          e && e.swiper && (l(), o(!0));
        }),
        a("slideChange update resize observerUpdate", () => {
          o();
        }),
        a("setTransition", (e, s) => {
          const a = t.thumbs.swiper;
          a && !a.destroyed && a.setTransition(s);
        }),
        a("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && r && e.destroy();
        }),
        Object.assign(t.thumbs, { init: l, update: o });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: a, once: i } = e;
      s({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(t, {
          freeMode: {
            onTouchStart: function () {
              const e = t.getTranslate();
              t.setTranslate(e),
                t.setTransition(0),
                (t.touchEventsData.velocities.length = 0),
                t.freeMode.onTouchEnd({
                  currentPos: t.rtl ? t.translate : -t.translate,
                });
            },
            onTouchMove: function () {
              const { touchEventsData: e, touches: s } = t;
              0 === e.velocities.length &&
                e.velocities.push({
                  position: s[t.isHorizontal() ? "startX" : "startY"],
                  time: e.touchStartTime,
                }),
                e.velocities.push({
                  position: s[t.isHorizontal() ? "currentX" : "currentY"],
                  time: u(),
                });
            },
            onTouchEnd: function (e) {
              let { currentPos: s } = e;
              const {
                  params: r,
                  $wrapperEl: n,
                  rtlTranslate: l,
                  snapGrid: o,
                  touchEventsData: d,
                } = t,
                c = u() - d.touchStartTime;
              if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
              else if (s > -t.maxTranslate())
                t.slides.length < o.length
                  ? t.slideTo(o.length - 1)
                  : t.slideTo(t.slides.length - 1);
              else {
                if (r.freeMode.momentum) {
                  if (d.velocities.length > 1) {
                    const e = d.velocities.pop(),
                      s = d.velocities.pop(),
                      a = e.position - s.position,
                      i = e.time - s.time;
                    (t.velocity = a / i),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                        (t.velocity = 0),
                      (i > 150 || u() - e.time > 300) && (t.velocity = 0);
                  } else t.velocity = 0;
                  (t.velocity *= r.freeMode.momentumVelocityRatio),
                    (d.velocities.length = 0);
                  let e = 1e3 * r.freeMode.momentumRatio;
                  const s = t.velocity * e;
                  let c = t.translate + s;
                  l && (c = -c);
                  let p,
                    h = !1;
                  const m =
                    20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                  let f;
                  if (c < t.maxTranslate())
                    r.freeMode.momentumBounce
                      ? (c + t.maxTranslate() < -m &&
                          (c = t.maxTranslate() - m),
                        (p = t.maxTranslate()),
                        (h = !0),
                        (d.allowMomentumBounce = !0))
                      : (c = t.maxTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (c > t.minTranslate())
                    r.freeMode.momentumBounce
                      ? (c - t.minTranslate() > m && (c = t.minTranslate() + m),
                        (p = t.minTranslate()),
                        (h = !0),
                        (d.allowMomentumBounce = !0))
                      : (c = t.minTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (r.freeMode.sticky) {
                    let e;
                    for (let t = 0; t < o.length; t += 1)
                      if (o[t] > -c) {
                        e = t;
                        break;
                      }
                    (c =
                      Math.abs(o[e] - c) < Math.abs(o[e - 1] - c) ||
                      "next" === t.swipeDirection
                        ? o[e]
                        : o[e - 1]),
                      (c = -c);
                  }
                  if (
                    (f &&
                      i("transitionEnd", () => {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  ) {
                    if (
                      ((e = l
                        ? Math.abs((-c - t.translate) / t.velocity)
                        : Math.abs((c - t.translate) / t.velocity)),
                      r.freeMode.sticky)
                    ) {
                      const s = Math.abs((l ? -c : c) - t.translate),
                        a = t.slidesSizesGrid[t.activeIndex];
                      e =
                        s < a
                          ? r.speed
                          : s < 2 * a
                          ? 1.5 * r.speed
                          : 2.5 * r.speed;
                    }
                  } else if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode.momentumBounce && h
                    ? (t.updateProgress(p),
                      t.setTransition(e),
                      t.setTranslate(c),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      n.transitionEnd(() => {
                        t &&
                          !t.destroyed &&
                          d.allowMomentumBounce &&
                          (a("momentumBounce"),
                          t.setTransition(r.speed),
                          setTimeout(() => {
                            t.setTranslate(p),
                              n.transitionEnd(() => {
                                t && !t.destroyed && t.transitionEnd();
                              });
                          }, 0));
                      }))
                    : t.velocity
                    ? (a("_freeModeNoMomentumRelease"),
                      t.updateProgress(c),
                      t.setTransition(e),
                      t.setTranslate(c),
                      t.transitionStart(!0, t.swipeDirection),
                      t.animating ||
                        ((t.animating = !0),
                        n.transitionEnd(() => {
                          t && !t.destroyed && t.transitionEnd();
                        })))
                    : t.updateProgress(c),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
                } else {
                  if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode && a("_freeModeNoMomentumRelease");
                }
                (!r.freeMode.momentum || c >= r.longSwipesMs) &&
                  (t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              }
            },
          },
        });
    },
    function (e) {
      let t,
        s,
        a,
        { swiper: i, extendParams: r } = e;
      r({ grid: { rows: 1, fill: "column" } }),
        (i.grid = {
          initSlides: (e) => {
            const { slidesPerView: r } = i.params,
              { rows: n, fill: l } = i.params.grid;
            (s = t / n),
              (a = Math.floor(e / n)),
              (t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n),
              "auto" !== r && "row" === l && (t = Math.max(t, r * n));
          },
          updateSlide: (e, r, n, l) => {
            const { slidesPerGroup: o, spaceBetween: d } = i.params,
              { rows: c, fill: p } = i.params.grid;
            let u, h, m;
            if ("row" === p && o > 1) {
              const s = Math.floor(e / (o * c)),
                a = e - c * o * s,
                i = 0 === s ? o : Math.min(Math.ceil((n - s * c * o) / c), o);
              (m = Math.floor(a / i)),
                (h = a - m * i + s * o),
                (u = h + (m * t) / c),
                r.css({ "-webkit-order": u, order: u });
            } else
              "column" === p
                ? ((h = Math.floor(e / c)),
                  (m = e - h * c),
                  (h > a || (h === a && m === c - 1)) &&
                    ((m += 1), m >= c && ((m = 0), (h += 1))))
                : ((m = Math.floor(e / s)), (h = e - m * s));
            r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "");
          },
          updateWrapperSize: (e, s, a) => {
            const {
                spaceBetween: r,
                centeredSlides: n,
                roundLengths: l,
              } = i.params,
              { rows: o } = i.params.grid;
            if (
              ((i.virtualSize = (e + r) * t),
              (i.virtualSize = Math.ceil(i.virtualSize / o) - r),
              i.$wrapperEl.css({ [a("width")]: `${i.virtualSize + r}px` }),
              n)
            ) {
              s.splice(0, s.length);
              const e = [];
              for (let t = 0; t < s.length; t += 1) {
                let a = s[t];
                l && (a = Math.floor(a)),
                  s[t] < i.virtualSize + s[0] && e.push(a);
              }
              s.push(...e);
            }
          },
        });
    },
    function (e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: K.bind(t),
        prependSlide: Z.bind(t),
        addSlide: Q.bind(t),
        removeSlide: J.bind(t),
        removeAllSlides: ee.bind(t),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ fadeEffect: { crossFade: !1, transformEl: null } }),
        te({
          effect: "fade",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e } = t,
              s = t.params.fadeEffect;
            for (let a = 0; a < e.length; a += 1) {
              const e = t.slides.eq(a);
              let i = -e[0].swiperSlideOffset;
              t.params.virtualTranslate || (i -= t.translate);
              let r = 0;
              t.isHorizontal() || ((r = i), (i = 0));
              const n = t.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(e[0].progress), 0)
                : 1 + Math.min(Math.max(e[0].progress, -1), 0);
              se(s, e)
                .css({ opacity: n })
                .transform(`translate3d(${i}px, ${r}px, 0px)`);
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.fadeEffect;
            (s ? t.slides.find(s) : t.slides).transition(e),
              ae({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
      const i = (e, t, s) => {
        let a = s
            ? e.find(".swiper-slide-shadow-left")
            : e.find(".swiper-slide-shadow-top"),
          i = s
            ? e.find(".swiper-slide-shadow-right")
            : e.find(".swiper-slide-shadow-bottom");
        0 === a.length &&
          ((a = d(
            `<div class="swiper-slide-shadow-${s ? "left" : "top"}"></div>`
          )),
          e.append(a)),
          0 === i.length &&
            ((i = d(
              `<div class="swiper-slide-shadow-${
                s ? "right" : "bottom"
              }"></div>`
            )),
            e.append(i)),
          a.length && (a[0].style.opacity = Math.max(-t, 0)),
          i.length && (i[0].style.opacity = Math.max(t, 0));
      };
      te({
        effect: "cube",
        swiper: t,
        on: a,
        setTranslate: () => {
          const {
              $el: e,
              $wrapperEl: s,
              slides: a,
              width: r,
              height: n,
              rtlTranslate: l,
              size: o,
              browser: c,
            } = t,
            p = t.params.cubeEffect,
            u = t.isHorizontal(),
            h = t.virtual && t.params.virtual.enabled;
          let m,
            f = 0;
          p.shadow &&
            (u
              ? ((m = s.find(".swiper-cube-shadow")),
                0 === m.length &&
                  ((m = d('<div class="swiper-cube-shadow"></div>')),
                  s.append(m)),
                m.css({ height: `${r}px` }))
              : ((m = e.find(".swiper-cube-shadow")),
                0 === m.length &&
                  ((m = d('<div class="swiper-cube-shadow"></div>')),
                  e.append(m))));
          for (let e = 0; e < a.length; e += 1) {
            const t = a.eq(e);
            let s = e;
            h && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
            let r = 90 * s,
              n = Math.floor(r / 360);
            l && ((r = -r), (n = Math.floor(-r / 360)));
            const d = Math.max(Math.min(t[0].progress, 1), -1);
            let c = 0,
              m = 0,
              g = 0;
            s % 4 == 0
              ? ((c = 4 * -n * o), (g = 0))
              : (s - 1) % 4 == 0
              ? ((c = 0), (g = 4 * -n * o))
              : (s - 2) % 4 == 0
              ? ((c = o + 4 * n * o), (g = o))
              : (s - 3) % 4 == 0 && ((c = -o), (g = 3 * o + 4 * o * n)),
              l && (c = -c),
              u || ((m = c), (c = 0));
            const v = `rotateX(${u ? 0 : -r}deg) rotateY(${
              u ? r : 0
            }deg) translate3d(${c}px, ${m}px, ${g}px)`;
            d <= 1 &&
              d > -1 &&
              ((f = 90 * s + 90 * d), l && (f = 90 * -s - 90 * d)),
              t.transform(v),
              p.slideShadows && i(t, d, u);
          }
          if (
            (s.css({
              "-webkit-transform-origin": `50% 50% -${o / 2}px`,
              "transform-origin": `50% 50% -${o / 2}px`,
            }),
            p.shadow)
          )
            if (u)
              m.transform(
                `translate3d(0px, ${r / 2 + p.shadowOffset}px, ${
                  -r / 2
                }px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`
              );
            else {
              const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                t =
                  1.5 -
                  (Math.sin((2 * e * Math.PI) / 360) / 2 +
                    Math.cos((2 * e * Math.PI) / 360) / 2),
                s = p.shadowScale,
                a = p.shadowScale / t,
                i = p.shadowOffset;
              m.transform(
                `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${
                  -n / 2 / a
                }px) rotateX(-90deg)`
              );
            }
          const g = c.isSafari || c.isWebView ? -o / 2 : 0;
          s.transform(
            `translate3d(0px,0,${g}px) rotateX(${
              t.isHorizontal() ? 0 : f
            }deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`
          ),
            s[0].style.setProperty("--swiper-cube-translate-z", `${g}px`);
        },
        setTransition: (e) => {
          const { $el: s, slides: a } = t;
          a
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
            t.params.cubeEffect.shadow &&
              !t.isHorizontal() &&
              s.find(".swiper-cube-shadow").transition(e);
        },
        recreateShadows: () => {
          const e = t.isHorizontal();
          t.slides.each((t) => {
            const s = Math.max(Math.min(t.progress, 1), -1);
            i(d(t), s, e);
          });
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null },
      });
      const i = (e, s, a) => {
        let i = t.isHorizontal()
            ? e.find(".swiper-slide-shadow-left")
            : e.find(".swiper-slide-shadow-top"),
          r = t.isHorizontal()
            ? e.find(".swiper-slide-shadow-right")
            : e.find(".swiper-slide-shadow-bottom");
        0 === i.length && (i = ie(a, e, t.isHorizontal() ? "left" : "top")),
          0 === r.length &&
            (r = ie(a, e, t.isHorizontal() ? "right" : "bottom")),
          i.length && (i[0].style.opacity = Math.max(-s, 0)),
          r.length && (r[0].style.opacity = Math.max(s, 0));
      };
      te({
        effect: "flip",
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, rtlTranslate: s } = t,
            a = t.params.flipEffect;
          for (let r = 0; r < e.length; r += 1) {
            const n = e.eq(r);
            let l = n[0].progress;
            t.params.flipEffect.limitRotation &&
              (l = Math.max(Math.min(n[0].progress, 1), -1));
            const o = n[0].swiperSlideOffset;
            let d = -180 * l,
              c = 0,
              p = t.params.cssMode ? -o - t.translate : -o,
              u = 0;
            t.isHorizontal()
              ? s && (d = -d)
              : ((u = p), (p = 0), (c = -d), (d = 0)),
              (n[0].style.zIndex = -Math.abs(Math.round(l)) + e.length),
              a.slideShadows && i(n, l, a);
            const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
            se(a, n).transform(h);
          }
        },
        setTransition: (e) => {
          const { transformEl: s } = t.params.flipEffect;
          (s ? t.slides.find(s) : t.slides)
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
            ae({ swiper: t, duration: e, transformEl: s });
        },
        recreateShadows: () => {
          const e = t.params.flipEffect;
          t.slides.each((s) => {
            const a = d(s);
            let r = a[0].progress;
            t.params.flipEffect.limitRotation &&
              (r = Math.max(Math.min(s.progress, 1), -1)),
              i(a, r, e);
          });
        },
        getEffectParams: () => t.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
          transformEl: null,
        },
      }),
        te({
          effect: "coverflow",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { width: e, height: s, slides: a, slidesSizesGrid: i } = t,
              r = t.params.coverflowEffect,
              n = t.isHorizontal(),
              l = t.translate,
              o = n ? e / 2 - l : s / 2 - l,
              d = n ? r.rotate : -r.rotate,
              c = r.depth;
            for (let e = 0, t = a.length; e < t; e += 1) {
              const t = a.eq(e),
                s = i[e],
                l = (o - t[0].swiperSlideOffset - s / 2) / s,
                p =
                  "function" == typeof r.modifier
                    ? r.modifier(l)
                    : l * r.modifier;
              let u = n ? d * p : 0,
                h = n ? 0 : d * p,
                m = -c * Math.abs(p),
                f = r.stretch;
              "string" == typeof f &&
                -1 !== f.indexOf("%") &&
                (f = (parseFloat(r.stretch) / 100) * s);
              let g = n ? 0 : f * p,
                v = n ? f * p : 0,
                w = 1 - (1 - r.scale) * Math.abs(p);
              Math.abs(v) < 0.001 && (v = 0),
                Math.abs(g) < 0.001 && (g = 0),
                Math.abs(m) < 0.001 && (m = 0),
                Math.abs(u) < 0.001 && (u = 0),
                Math.abs(h) < 0.001 && (h = 0),
                Math.abs(w) < 0.001 && (w = 0);
              const b = `translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;
              if (
                (se(r, t).transform(b),
                (t[0].style.zIndex = 1 - Math.abs(Math.round(p))),
                r.slideShadows)
              ) {
                let e = n
                    ? t.find(".swiper-slide-shadow-left")
                    : t.find(".swiper-slide-shadow-top"),
                  s = n
                    ? t.find(".swiper-slide-shadow-right")
                    : t.find(".swiper-slide-shadow-bottom");
                0 === e.length && (e = ie(r, t, n ? "left" : "top")),
                  0 === s.length && (s = ie(r, t, n ? "right" : "bottom")),
                  e.length && (e[0].style.opacity = p > 0 ? p : 0),
                  s.length && (s[0].style.opacity = -p > 0 ? -p : 0);
              }
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.coverflowEffect;
            (s ? t.slides.find(s) : t.slides)
              .transition(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(e);
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        creativeEffect: {
          transformEl: null,
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      const i = (e) => ("string" == typeof e ? e : `${e}px`);
      te({
        effect: "creative",
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, $wrapperEl: s, slidesSizesGrid: a } = t,
            r = t.params.creativeEffect,
            { progressMultiplier: n } = r,
            l = t.params.centeredSlides;
          if (l) {
            const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
            s.transform(`translateX(calc(50% - ${e}px))`);
          }
          for (let s = 0; s < e.length; s += 1) {
            const a = e.eq(s),
              o = a[0].progress,
              d = Math.min(
                Math.max(a[0].progress, -r.limitProgress),
                r.limitProgress
              );
            let c = d;
            l ||
              (c = Math.min(
                Math.max(a[0].originalProgress, -r.limitProgress),
                r.limitProgress
              ));
            const p = a[0].swiperSlideOffset,
              u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
              h = [0, 0, 0];
            let m = !1;
            t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
            let f = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            d < 0
              ? ((f = r.next), (m = !0))
              : d > 0 && ((f = r.prev), (m = !0)),
              u.forEach((e, t) => {
                u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(
                  d * n
                )}))`;
              }),
              h.forEach((e, t) => {
                h[t] = f.rotate[t] * Math.abs(d * n);
              }),
              (a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length);
            const g = u.join(", "),
              v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
              w =
                c < 0
                  ? `scale(${1 + (1 - f.scale) * c * n})`
                  : `scale(${1 - (1 - f.scale) * c * n})`,
              b =
                c < 0
                  ? 1 + (1 - f.opacity) * c * n
                  : 1 - (1 - f.opacity) * c * n,
              x = `translate3d(${g}) ${v} ${w}`;
            if ((m && f.shadow) || !m) {
              let e = a.children(".swiper-slide-shadow");
              if ((0 === e.length && f.shadow && (e = ie(r, a)), e.length)) {
                const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
              }
            }
            const y = se(r, a);
            y.transform(x).css({ opacity: b }),
              f.origin && y.css("transform-origin", f.origin);
          }
        },
        setTransition: (e) => {
          const { transformEl: s } = t.params.creativeEffect;
          (s ? t.slides.find(s) : t.slides)
            .transition(e)
            .find(".swiper-slide-shadow")
            .transition(e),
            ae({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
        },
        perspective: () => t.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        cardsEffect: {
          slideShadows: !0,
          transformEl: null,
          rotate: !0,
          perSlideRotate: 2,
          perSlideOffset: 8,
        },
      }),
        te({
          effect: "cards",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e, activeIndex: s } = t,
              a = t.params.cardsEffect,
              { startTranslate: i, isTouched: r } = t.touchEventsData,
              n = t.translate;
            for (let l = 0; l < e.length; l += 1) {
              const o = e.eq(l),
                d = o[0].progress,
                c = Math.min(Math.max(d, -4), 4);
              let p = o[0].swiperSlideOffset;
              t.params.centeredSlides &&
                !t.params.cssMode &&
                t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
                t.params.centeredSlides &&
                  t.params.cssMode &&
                  (p -= e[0].swiperSlideOffset);
              let u = t.params.cssMode ? -p - t.translate : -p,
                h = 0;
              const m = -100 * Math.abs(c);
              let f = 1,
                g = -a.perSlideRotate * c,
                v = a.perSlideOffset - 0.75 * Math.abs(c);
              const w =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.from + l
                    : l,
                b =
                  (w === s || w === s - 1) &&
                  c > 0 &&
                  c < 1 &&
                  (r || t.params.cssMode) &&
                  n < i,
                x =
                  (w === s || w === s + 1) &&
                  c < 0 &&
                  c > -1 &&
                  (r || t.params.cssMode) &&
                  n > i;
              if (b || x) {
                const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                (g += -28 * c * e),
                  (f += -0.5 * e),
                  (v += 96 * e),
                  (h = -25 * e * Math.abs(c) + "%");
              }
              if (
                ((u =
                  c < 0
                    ? `calc(${u}px + (${v * Math.abs(c)}%))`
                    : c > 0
                    ? `calc(${u}px + (-${v * Math.abs(c)}%))`
                    : `${u}px`),
                !t.isHorizontal())
              ) {
                const e = h;
                (h = u), (u = e);
              }
              const y = c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c),
                E = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${
                  a.rotate ? g : 0
                }deg)\n        scale(${y})\n      `;
              if (a.slideShadows) {
                let e = o.find(".swiper-slide-shadow");
                0 === e.length && (e = ie(a, o)),
                  e.length &&
                    (e[0].style.opacity = Math.min(
                      Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                      1
                    ));
              }
              o[0].style.zIndex = -Math.abs(Math.round(d)) + e.length;
              se(a, o).transform(E);
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.cardsEffect;
            (s ? t.slides.find(s) : t.slides)
              .transition(e)
              .find(".swiper-slide-shadow")
              .transition(e),
              ae({ swiper: t, duration: e, transformEl: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
  ];
  return V.use(re), V;
});
//# sourceMappingURL=swiper-bundle.min.js.map

// Scroll-Carousel
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define("ScrollCarousel", [], e)
    : "object" == typeof exports
    ? (exports.ScrollCarousel = e())
    : (t.ScrollCarousel = e());
})(this, function () {
  return (function () {
    "use strict";
    var t = {
        d: function (e, n) {
          for (var r in n)
            t.o(n, r) &&
              !t.o(e, r) &&
              Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
        },
        o: function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        },
      },
      e = {};
    t.d(e, {
      default: function () {
        return C;
      },
    });
    var n = "rtl",
      r = "ltr";
    function i(t) {
      return (
        (i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        i(t)
      );
    }
    function o(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return s(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        (function (t, e) {
          if (!t) return;
          if ("string" == typeof t) return s(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === n && t.constructor && (n = t.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(t);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return s(t, e);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function l(t) {
      return "string" == typeof t ? document.querySelector(t) : t;
    }
    function a(t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == i(t) && "number" == typeof t.length
        ? o(t)
        : [t];
    }
    function c(t) {
      return (
        Object.keys(t).includes("speed") && !Number(t.speed) && (t.speed = 7),
        Number(t.speed) <= 0 && (t.speed = 1),
        Object.keys(t).includes("margin") &&
          !Number(t.margin) &&
          0 !== Number(t.margin) &&
          (t.margin = 10),
        Object.keys(t).includes("direction") &&
          (t.direction = t.direction.toLowerCase()),
        Object.keys(t).includes("direction") &&
          t.direction !== n &&
          t.direction !== r &&
          (t.direction = n),
        Object.keys(t).includes("autoplaySpeed") &&
          !Number(t.autoplaySpeed) &&
          (t.autoplaySpeed = 5),
        Number(t.autoplaySpeed) <= 0 && (t.autoplaySpeed = 1),
        t
      );
    }
    function u(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return d(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return d(t, e);
          })(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e: function (t) {
              throw t;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        s = !0,
        l = !1;
      return {
        s: function () {
          n = n.call(t);
        },
        n: function () {
          var t = n.next();
          return (s = t.done), t;
        },
        e: function (t) {
          (l = !0), (o = t);
        },
        f: function () {
          try {
            s || null == n.return || n.return();
          } finally {
            if (l) throw o;
          }
        },
      };
    }
    function d(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function h() {}
    var p = h.prototype;
    function f(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return m(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        (function (t, e) {
          if (!t) return;
          if ("string" == typeof t) return m(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === n && t.constructor && (n = t.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(t);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return m(t, e);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function m(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function y(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function v(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? y(Object(n), !0).forEach(function (e) {
              b(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : y(Object(n)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    function b(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    (p.on = function (t, e) {
      if (!t || !e) return this;
      var n = (this._events = this._events || {}),
        r = (n[t] = n[t] || []);
      return r.includes(e) || r.push(e), this;
    }),
      (p.once = function (t, e) {
        if (!t || !e) return this;
        this.on(t, e);
        var n = (this._onceEvents = this._onceEvents || {});
        return ((n[t] = n[t] || {})[e] = !0), this;
      }),
      (p.off = function (t, e) {
        var n = this._events && this._events[t];
        if (!n || !n.length) return this;
        var r = n.indexOf(e);
        return -1 != r && n.splice(r, 1), this;
      }),
      (p.emitEvent = function (t, e) {
        var n = this._events && this._events[t];
        if (!n || !n.length) return this;
        (n = n.slice(0)), (e = e || []);
        var r,
          i = this._onceEvents && this._onceEvents[t],
          o = u(n);
        try {
          for (o.s(); !(r = o.n()).done; ) {
            var s = r.value;
            i && i[s] && (this.off(t, s), delete i[s]), s.apply(this, e);
          }
        } catch (t) {
          o.e(t);
        } finally {
          o.f();
        }
        return this;
      }),
      (p.allOff = function () {
        return delete this._events, delete this._onceEvents, this;
      });
    var g = 0,
      S = {};
    function w(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = l(t);
      if (n) {
        if (((this.element = n), this.element.scrollCarouselGUID)) {
          var r = S[this.element.scrollCarouselGUID];
          return r && r.option(e), r;
        }
        (this.baseOption = e),
          (this.options = v({}, this.constructor.defaults));
        var i = c(e);
        this.option(i), this._create();
      } else console && console.error("Bad element for Scroll Carousel: ".concat(n || t));
    }
    w.defaults = {
      speed: 7,
      smartSpeed: !1,
      margin: 10,
      autoplay: !1,
      autoplaySpeed: 5,
      slideSelector: null,
      direction: n,
    };
    var E,
      O,
      _,
      j,
      A = w.prototype;
    Object.assign(A, h.prototype),
      (A._create = function () {
        var t = (this.guid = ++g);
        for (var e in ((this.element.scrollCarouselGUID = t),
        (S[t] = this),
        this._createViewport(),
        this._createSlider(),
        this.options.on)) {
          var n = this.options.on[e];
          this.on(e, n);
        }
        this.activate();
      }),
      (A.option = function (t) {
        Object.assign(this.options, t);
      }),
      (A.activate = function () {
        var t,
          e = this;
        if (!this.isActive) {
          (this.isActive = !0),
            (this.translate = 0),
            (this.displacement = 0),
            (this.isScrolling = !0),
            (this.prevPosition =
              document.body.scrollTop || document.documentElement.scrollTop),
            (this.baseElems = a(this.element.children));
          var n = this._filterFindSlideElements(this.element.children);
          (this.slideElems = this._makeSlides(n)),
            this.options.direction === r &&
              (this.slideElems = this.slideElems.reverse());
          var i = this.slideElems.map(function (t) {
            return t.cloneNode(!0);
          });
          (t = this.slider).append.apply(t, f(this.slideElems).concat(f(i))),
            this.viewport.append(this.slider),
            this.element.append(this.viewport),
            this.options.direction === r && this._supportLtr(),
            this.options.autoplay && this._autoplay(),
            this.emitEvent("ready"),
            window.addEventListener("scroll", function () {
              return e._transform();
            });
        }
      }),
      (A._autoplay = function () {
        var t = this;
        this.interval = setInterval(function () {
          t._transform();
        }, 10);
      }),
      (A._transform = function () {
        (function (t) {
          if (!t) return !1;
          var e = t.getBoundingClientRect(),
            n = window.innerHeight || document.documentElement.clientHeight,
            r = window.innerWidth || document.documentElement.clientWidth,
            i = e.top <= n && e.top + e.height >= 0,
            o = e.left <= r && e.left + e.width >= 0;
          return i && o;
        })(this.element) &&
          (this.options.autoplay && this._setIsScrolling(),
          this.options.smartSpeed
            ? this._calcSmartSpeed()
            : this._calcRegularSpeed(),
          this.emitEvent("move", [this.progress]));
      }),
      (A._calcRegularSpeed = function () {
        var t = this.slider.getBoundingClientRect();
        this.slider.style.transform = "translateX(".concat(
          this.translate,
          "px)"
        );
        var e = this.isScrolling ? this.options.speed : 1.2;
        this.options.direction === n && (this.translate -= e),
          this.options.direction === r && (this.translate += e),
          this.options.direction === n &&
            this.translate <= -t.width / 2 &&
            (this.translate = 0),
          this.options.direction === r &&
            this.translate >= 0 &&
            (this.translate = -t.width / 2),
          (this.progress = ((100 * -this.translate) / t.width) * 2);
      }),
      (A._calcSmartSpeed = function () {
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        (this.displacement -= this.isScrolling
          ? Math.abs(this.prevPosition - t)
          : 1.2),
          this.options.direction === r &&
            this.displacement < 0 &&
            (this.displacement =
              50 / (((10 * this.options.speed) / 5500) % 50));
        var e,
          i = ((this.displacement / 5500) * (10 * this.options.speed)) % 50;
        (this.progress = 2 * -i),
          this.options.direction === n && (e = i),
          this.options.direction === r && (e = -i),
          (this.slider.style.transform = "translateX(".concat(e, "%)")),
          (this.prevPosition = t);
      }),
      (A._supportLtr = function () {
        var t = this.slider.getBoundingClientRect();
        this.translate =
          -t.width +
          Math.min(document.documentElement.clientWidth, window.innerWidth);
        var e = (100 * this.translate) / t.width;
        (this.displacement = -e / (((10 * this.options.speed) / 5500) % 50)),
          this.options.smartSpeed
            ? (this.slider.style.transform = "translateX(".concat(e, "%)"))
            : (this.slider.style.transform = "translateX(".concat(
                this.translate,
                "px)"
              ));
      }),
      (A._setIsScrolling = function () {
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        (this.isScrolling = !0),
          this.prevPosition !== t
            ? this.options.smartSpeed || (this.prevPosition = t)
            : (this.isScrolling = !1);
      }),
      (A._makeSlide = function (t) {
        var e = document.createElement("div");
        return (
          (e.style.marginRight = this.options.margin + "px"),
          (e.className = "sc-slide"),
          (this.slideElem = e),
          this.slideElem.append(t),
          this.slideElem
        );
      }),
      (A._makeSlides = function (t) {
        var e = this;
        return t.map(function (t) {
          return e._makeSlide(t);
        });
      }),
      (A._createSlider = function () {
        var t = document.createElement("div");
        (t.className = "scroll-carousel-slider"), (this.slider = t);
      }),
      (A._createViewport = function () {
        (this.viewport = document.createElement("div")),
          (this.viewport.className = "scroll-carousel-viewport");
      }),
      (A._filterFindSlideElements = function (t) {
        return (function (t, e) {
          return (t = a(t))
            .filter(function (t) {
              return t instanceof HTMLElement;
            })
            .reduce(function (t, n) {
              var r;
              if (!e) return t.push(n), t;
              n.matches(e) && t.push(n);
              var i = n.querySelectorAll(e);
              return (r = t).concat.apply(r, o(i));
            }, []);
        })(t, this.options.slideSelector);
      }),
      (A.destroy = function () {
        var t;
        this.isActive &&
          (this.viewport.remove(),
          (t = this.element).append.apply(t, f(this.baseElems)),
          (this.isActive = !1),
          clearInterval(this.interval),
          window.removeEventListener("scroll", this),
          this.emitEvent("destroy"),
          this.allOff(),
          delete this.element.scrollCarouselGUID,
          delete S[this.guid]);
      }),
      (A.reinit = function () {
        return new w(this.element, this.baseOption);
      }),
      (w.data = function (t) {
        if ((t = l(t))) return S[t.scrollCarouselGUID];
      }),
      (E = w),
      (O = "carousel"),
      (_ = function () {
        var t =
          "data-" +
          O.replace(/(.)([A-Z])/g, function (t, e, n) {
            return e + "-" + n;
          }).toLowerCase();
        o(document.querySelectorAll("[".concat(t, "]"))).forEach(function (e) {
          var n,
            r = e.getAttribute(t);
          try {
            n = r && JSON.parse(r);
          } catch (n) {
            return void (
              console &&
              console.error(
                "Error parsing "
                  .concat(t, " on ")
                  .concat(e.className, ": ")
                  .concat(n)
              )
            );
          }
          new E(e, n);
        });
      }),
      "complete" == (j = document.readyState) || "interactive" == j
        ? setTimeout(_)
        : document.addEventListener("DOMContentLoaded", _);
    var C = w;
    return (e = e.default);
  })();
});
//# sourceMappingURL=scroll.carousel.min.js.map

// fsLightbox
!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n) ("object" == typeof exports ? exports : e)[o] = n[o];
  }
})(window, function () {
  return (function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var i = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var i in e)
            n.d(
              o,
              i,
              function (t) {
                return e[t];
              }.bind(null, i)
            );
        return o;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 0))
    );
  })([
    function (e, t, n) {
      "use strict";
      n.r(t);
      var o,
        i = "fslightbox-",
        r = "".concat(i, "styles"),
        s = "".concat(i, "cursor-grabbing"),
        a = "".concat(i, "full-dimension"),
        c = "".concat(i, "flex-centered"),
        l = "".concat(i, "open"),
        u = "".concat(i, "transform-transition"),
        d = "".concat(i, "absoluted"),
        f = "".concat(i, "slide-btn"),
        p = "".concat(f, "-container"),
        h = "".concat(i, "fade-in"),
        m = "".concat(i, "fade-out"),
        g = h + "-strong",
        v = m + "-strong",
        b = "".concat(i, "opacity-"),
        x = "".concat(b, "1"),
        y = "".concat(i, "source");
      function w(e) {
        return (w =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function S(e) {
        var t = e.stageIndexes,
          n = e.core.stageManager,
          o = e.props.sources.length - 1;
        (n.getPreviousSlideIndex = function () {
          return 0 === t.current ? o : t.current - 1;
        }),
          (n.getNextSlideIndex = function () {
            return t.current === o ? 0 : t.current + 1;
          }),
          (n.updateStageIndexes =
            0 === o
              ? function () {}
              : 1 === o
              ? function () {
                  0 === t.current
                    ? ((t.next = 1), delete t.previous)
                    : ((t.previous = 0), delete t.next);
                }
              : function () {
                  (t.previous = n.getPreviousSlideIndex()),
                    (t.next = n.getNextSlideIndex());
                }),
          (n.i =
            o <= 2
              ? function () {
                  return !0;
                }
              : function (e) {
                  var n = t.current;
                  if ((0 === n && e === o) || (n === o && 0 === e)) return !0;
                  var i = n - e;
                  return -1 === i || 0 === i || 1 === i;
                });
      }
      "object" ===
        ("undefined" == typeof document ? "undefined" : w(document)) &&
        (((o = document.createElement("style")).className = r),
        o.appendChild(
          document.createTextNode(
            ".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}"
          )
        ),
        document.head.appendChild(o));
      function L(e) {
        var t,
          n = e.props,
          o = 0,
          i = {};
        (this.getSourceTypeFromLocalStorageByUrl = function (e) {
          return t[e] ? t[e] : r(e);
        }),
          (this.handleReceivedSourceTypeForUrl = function (e, n) {
            if (
              !1 === i[n] &&
              (o--, "invalid" !== e ? (i[n] = e) : delete i[n], 0 === o)
            ) {
              !(function (e, t) {
                for (var n in t) e[n] = t[n];
              })(t, i);
              try {
                localStorage.setItem("fslightbox-types", JSON.stringify(t));
              } catch (e) {}
            }
          });
        var r = function (e) {
          o++, (i[e] = !1);
        };
        if (n.disableLocalStorage)
          (this.getSourceTypeFromLocalStorageByUrl = function () {}),
            (this.handleReceivedSourceTypeForUrl = function () {});
        else {
          try {
            t = JSON.parse(localStorage.getItem("fslightbox-types"));
          } catch (e) {}
          t || ((t = {}), (this.getSourceTypeFromLocalStorageByUrl = r));
        }
      }
      function A(e, t, n, o) {
        var i = e.data,
          r = e.elements.sources,
          s = n / o,
          a = 0;
        this.adjustSize = function () {
          if ((a = i.maxSourceWidth / s) < i.maxSourceHeight)
            return n < i.maxSourceWidth && (a = o), c();
          (a = o > i.maxSourceHeight ? i.maxSourceHeight : o), c();
        };
        var c = function () {
          (r[t].style.width = a * s + "px"), (r[t].style.height = a + "px");
        };
      }
      function C(e, t) {
        var n = this,
          o = e.collections.sourceSizers,
          i = e.elements,
          r = i.sourceAnimationWrappers,
          s = i.sources,
          a = e.isl,
          c = e.resolve;
        function l(e, n) {
          (o[t] = c(A, [t, e, n])), o[t].adjustSize();
        }
        this.runActions = function (e, o) {
          (a[t] = !0),
            s[t].classList.add(x),
            r[t].classList.add(g),
            r[t].removeChild(r[t].firstChild),
            l(e, o),
            (n.runActions = l);
        };
      }
      function E(e, t) {
        var n,
          o = this,
          i = e.elements.sources,
          r = e.props,
          s = (0, e.resolve)(C, [t]);
        (this.handleImageLoad = function (e) {
          var t = e.target,
            n = t.naturalWidth,
            o = t.naturalHeight;
          s.runActions(n, o);
        }),
          (this.handleVideoLoad = function (e) {
            var t = e.target,
              o = t.videoWidth,
              i = t.videoHeight;
            (n = !0), s.runActions(o, i);
          }),
          (this.handleNotMetaDatedVideoLoad = function () {
            n || o.handleYoutubeLoad();
          }),
          (this.handleYoutubeLoad = function () {
            var e = 1920,
              t = 1080;
            r.maxYoutubeDimensions &&
              ((e = r.maxYoutubeDimensions.width),
              (t = r.maxYoutubeDimensions.height)),
              s.runActions(e, t);
          }),
          (this.handleCustomLoad = function () {
            var e = i[t],
              n = e.offsetWidth,
              r = e.offsetHeight;
            n && r ? s.runActions(n, r) : setTimeout(o.handleCustomLoad);
          });
      }
      function F(e, t, n) {
        var o = e.elements.sources,
          i = e.props.customClasses,
          r = i[t] ? i[t] : "";
        o[t].className = n + " " + r;
      }
      function I(e, t) {
        var n = e.elements.sources,
          o = e.props.customAttributes;
        for (var i in o[t]) n[t].setAttribute(i, o[t][i]);
      }
      function T(e, t) {
        var n = e.collections.sourceLoadHandlers,
          o = e.elements,
          i = o.sources,
          r = o.sourceAnimationWrappers,
          s = e.props.sources;
        (i[t] = document.createElement("img")),
          F(e, t, y),
          (i[t].src = s[t]),
          (i[t].onload = n[t].handleImageLoad),
          I(e, t),
          r[t].appendChild(i[t]);
      }
      function N(e, t) {
        var n = e.collections.sourceLoadHandlers,
          o = e.elements,
          i = o.sources,
          r = o.sourceAnimationWrappers,
          s = e.props,
          a = s.sources,
          c = s.videosPosters;
        (i[t] = document.createElement("video")),
          F(e, t, y),
          (i[t].src = a[t]),
          (i[t].onloadedmetadata = function (e) {
            n[t].handleVideoLoad(e);
          }),
          (i[t].controls = !0),
          I(e, t),
          c[t] && (i[t].poster = c[t]);
        var l = document.createElement("source");
        (l.src = a[t]),
          i[t].appendChild(l),
          setTimeout(n[t].handleNotMetaDatedVideoLoad, 3e3),
          r[t].appendChild(i[t]);
      }
      function z(e, t) {
        var n = e.collections.sourceLoadHandlers,
          o = e.elements,
          r = o.sources,
          s = o.sourceAnimationWrappers,
          a = e.props.sources;
        (r[t] = document.createElement("iframe")),
          F(e, t, "".concat(y, " ").concat(i, "youtube-iframe"));
        var c = a[t],
          l = c.split("?")[1];
        (r[t].src = "https://www.youtube.com/embed/"
          .concat(
            c.match(
              /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
            )[2],
            "?"
          )
          .concat(l || "")),
          (r[t].allowFullscreen = !0),
          I(e, t),
          s[t].appendChild(r[t]),
          n[t].handleYoutubeLoad();
      }
      function P(e, t) {
        var n = e.collections.sourceLoadHandlers,
          o = e.elements,
          i = o.sources,
          r = o.sourceAnimationWrappers,
          s = e.props.sources;
        (i[t] = s[t]),
          F(e, t, "".concat(i[t].className, " ").concat(y)),
          r[t].appendChild(i[t]),
          n[t].handleCustomLoad();
      }
      function k(e, t) {
        var n = e.elements,
          o = n.sources,
          r = n.sourceAnimationWrappers;
        e.props.sources;
        (o[t] = document.createElement("div")),
          (o[t].className = "".concat(i, "invalid-file-wrapper ").concat(c)),
          (o[t].innerHTML = "Invalid source"),
          r[t].classList.add(g),
          r[t].removeChild(r[t].firstChild),
          r[t].appendChild(o[t]);
      }
      function H(e) {
        var t = e.collections,
          n = t.sourceLoadHandlers,
          o = t.sourcesRenderFunctions,
          i = e.core.sourceDisplayFacade,
          r = e.resolve;
        this.runActionsForSourceTypeAndIndex = function (t, s) {
          var a;
          switch (("invalid" !== t && (n[s] = r(E, [s])), t)) {
            case "image":
              a = T;
              break;
            case "video":
              a = N;
              break;
            case "youtube":
              a = z;
              break;
            case "custom":
              a = P;
              break;
            default:
              a = k;
          }
          (o[s] = function () {
            return a(e, s);
          }),
            i.displaySourcesWhichShouldBeDisplayed();
        };
      }
      function W() {
        var e,
          t,
          n,
          o = {
            isUrlYoutubeOne: function (e) {
              var t = document.createElement("a");
              return (
                (t.href = e),
                "www.youtube.com" === t.hostname || "youtu.be" === t.hostname
              );
            },
            getTypeFromResponseContentType: function (e) {
              return e.slice(0, e.indexOf("/"));
            },
          };
        function i() {
          if (4 !== n.readyState) {
            if (2 === n.readyState) {
              var e;
              switch (
                o.getTypeFromResponseContentType(
                  n.getResponseHeader("content-type")
                )
              ) {
                case "image":
                  e = "image";
                  break;
                case "video":
                  e = "video";
                  break;
                default:
                  e = "invalid";
              }
              (n.onreadystatechange = null), n.abort(), t(e);
            }
          } else t("invalid");
        }
        (this.setUrlToCheck = function (t) {
          e = t;
        }),
          (this.getSourceType = function (r) {
            if (o.isUrlYoutubeOne(e)) return r("youtube");
            (t = r),
              ((n = new XMLHttpRequest()).onreadystatechange = i),
              n.open("GET", e, !0),
              n.send();
          });
      }
      function R(e, t, n) {
        var o = e.props,
          i = o.types,
          r = o.type,
          s = o.sources,
          a = e.resolve;
        (this.getTypeSetByClientForIndex = function (e) {
          var t;
          return i && i[e] ? (t = i[e]) : r && (t = r), t;
        }),
          (this.retrieveTypeWithXhrForIndex = function (e) {
            var o = a(W);
            o.setUrlToCheck(s[e]),
              o.getSourceType(function (o) {
                t.handleReceivedSourceTypeForUrl(o, s[e]),
                  n.runActionsForSourceTypeAndIndex(o, e);
              });
          });
      }
      function D(e, t) {
        var n = e.core.stageManager,
          o = e.elements,
          i = o.smw,
          r = o.sourceWrappersContainer,
          s = e.props,
          l = 0,
          f = document.createElement("div");
        function p(e) {
          (f.style.transform = "translateX(".concat(e + l, "px)")), (l = 0);
        }
        function h() {
          return (1 + s.slideDistance) * innerWidth;
        }
        (f.className = "".concat(d, " ").concat(a, " ").concat(c)),
          (f.s = function () {
            f.style.display = "flex";
          }),
          (f.h = function () {
            f.style.display = "none";
          }),
          (f.a = function () {
            f.classList.add(u);
          }),
          (f.d = function () {
            f.classList.remove(u);
          }),
          (f.n = function () {
            f.style.removeProperty("transform");
          }),
          (f.v = function (e) {
            return (l = e), f;
          }),
          (f.ne = function () {
            p(-h());
          }),
          (f.z = function () {
            p(0);
          }),
          (f.p = function () {
            p(h());
          }),
          n.i(t) || f.h(),
          (i[t] = f),
          r.appendChild(f),
          (function (e, t) {
            var n = e.elements,
              o = n.smw,
              i = n.sourceAnimationWrappers,
              r = document.createElement("div"),
              s = document.createElement("div");
            s.className = "fslightboxl";
            for (var a = 0; a < 3; a++) {
              var c = document.createElement("div");
              s.appendChild(c);
            }
            r.appendChild(s), o[t].appendChild(r), (i[t] = r);
          })(e, t);
      }
      function O(e, t, n, o) {
        var r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        r.setAttributeNS(null, "width", t),
          r.setAttributeNS(null, "height", t),
          r.setAttributeNS(null, "viewBox", n);
        var s = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return (
          s.setAttributeNS(null, "class", "".concat(i, "svg-path")),
          s.setAttributeNS(null, "d", o),
          r.appendChild(s),
          e.appendChild(r),
          r
        );
      }
      function M(e, t) {
        var n = document.createElement("div");
        return (
          (n.className = "".concat(i, "toolbar-button ").concat(c)),
          (n.title = t),
          e.appendChild(n),
          n
        );
      }
      function j(e, t) {
        var n = document.createElement("div");
        (n.className = "".concat(i, "toolbar")),
          t.appendChild(n),
          (function (e, t) {
            var n = e.componentsServices,
              o = e.data,
              i = e.fs,
              r =
                "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",
              s = M(t);
            s.title = "Enter fullscreen";
            var a = O(s, "20px", "0 0 18 18", r);
            (n.ofs = function () {
              (o.ifs = !0),
                (s.title = "Exit fullscreen"),
                a.setAttributeNS(null, "width", "24px"),
                a.setAttributeNS(null, "height", "24px"),
                a.setAttributeNS(null, "viewBox", "0 0 950 1024"),
                a.firstChild.setAttributeNS(
                  null,
                  "d",
                  "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z"
                );
            }),
              (n.xfs = function () {
                (o.ifs = !1),
                  (s.title = "Enter fullscreen"),
                  a.setAttributeNS(null, "width", "20px"),
                  a.setAttributeNS(null, "height", "20px"),
                  a.setAttributeNS(null, "viewBox", "0 0 18 18"),
                  a.firstChild.setAttributeNS(null, "d", r);
              }),
              (s.onclick = i.t);
          })(e, n),
          (function (e, t) {
            var n = M(t, "Close");
            (n.onclick = e.core.lightboxCloser.closeLightbox),
              O(
                n,
                "20px",
                "0 0 24 24",
                "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
              );
          })(e, n);
      }
      function X(e) {
        var t = e.props.sources,
          n = e.elements.container,
          o = document.createElement("div");
        (o.className = "".concat(i, "nav")),
          n.appendChild(o),
          j(e, o),
          t.length > 1 &&
            (function (e, t) {
              var n = e.componentsServices,
                o = e.props.sources,
                r = (e.stageIndexes, document.createElement("div"));
              r.className = "".concat(i, "slide-number-container");
              var s = document.createElement("div");
              s.className = c;
              var a = document.createElement("span");
              n.setSlideNumber = function (e) {
                return (a.innerHTML = e);
              };
              var l = document.createElement("span");
              l.className = "".concat(i, "slash");
              var u = document.createElement("div");
              (u.innerHTML = o.length),
                r.appendChild(s),
                s.appendChild(a),
                s.appendChild(l),
                s.appendChild(u),
                t.appendChild(r),
                setTimeout(function () {
                  s.offsetWidth > 55 && (r.style.justifyContent = "flex-start");
                });
            })(e, o);
      }
      function B(e, t, n, o) {
        var i = e.elements.container,
          r = n.charAt(0).toUpperCase() + n.slice(1),
          s = document.createElement("div");
        (s.className = "".concat(p, " ").concat(p, "-").concat(n)),
          (s.title = "".concat(r, " slide")),
          (s.onclick = t),
          (function (e, t) {
            var n = document.createElement("div");
            (n.className = "".concat(f, " ").concat(c)),
              O(n, "20px", "0 0 20 20", t),
              e.appendChild(n);
          })(s, o),
          i.appendChild(s);
      }
      function U(e) {
        var t = e.core,
          n = t.lightboxCloser,
          o = t.slideChangeFacade,
          i = e.fs;
        this.listener = function (e) {
          switch (e.key) {
            case "Escape":
              n.closeLightbox();
              break;
            case "ArrowLeft":
              o.changeToPrevious();
              break;
            case "ArrowRight":
              o.changeToNext();
              break;
            case "F11":
              e.preventDefault(), i.t();
          }
        };
      }
      function q(e) {
        var t = e.elements,
          n = e.sourcePointerProps,
          o = e.stageIndexes;
        function i(e, o) {
          t.smw[e].v(n.swipedX)[o]();
        }
        this.runActionsForEvent = function (e) {
          var r, a, c;
          t.container.contains(t.slideSwipingHoverer) ||
            t.container.appendChild(t.slideSwipingHoverer),
            (r = t.container),
            (a = s),
            (c = r.classList).contains(a) || c.add(a),
            (n.swipedX = e.screenX - n.downScreenX);
          var l = o.previous,
            u = o.next;
          i(o.current, "z"),
            void 0 !== l && n.swipedX > 0
              ? i(l, "ne")
              : void 0 !== u && n.swipedX < 0 && i(u, "p");
        };
      }
      function V(e) {
        var t = e.props.sources,
          n = e.resolve,
          o = e.sourcePointerProps,
          i = n(q);
        1 === t.length
          ? (this.listener = function () {
              o.swipedX = 1;
            })
          : (this.listener = function (e) {
              o.isPointering && i.runActionsForEvent(e);
            });
      }
      function _(e) {
        var t = e.core.slideIndexChanger,
          n = e.elements.smw,
          o = e.stageIndexes,
          i = e.sws;
        function r(e) {
          var t = n[o.current];
          t.a(), t[e]();
        }
        function s(e, t) {
          void 0 !== e && (n[e].s(), n[e][t]());
        }
        (this.runPositiveSwipedXActions = function () {
          var e = o.previous;
          if (void 0 === e) r("z");
          else {
            r("p");
            var n = o.next;
            t.changeTo(e);
            var a = o.previous;
            i.d(a), i.b(n), r("z"), s(a, "ne");
          }
        }),
          (this.runNegativeSwipedXActions = function () {
            var e = o.next;
            if (void 0 === e) r("z");
            else {
              r("ne");
              var n = o.previous;
              t.changeTo(e);
              var a = o.next;
              i.d(a), i.b(n), r("z"), s(a, "p");
            }
          });
      }
      function Y(e, t) {
        e.contains(t) && e.removeChild(t);
      }
      function J(e) {
        var t = e.core.lightboxCloser,
          n = e.elements,
          o = e.resolve,
          i = e.sourcePointerProps,
          r = o(_);
        (this.runNoSwipeActions = function () {
          Y(n.container, n.slideSwipingHoverer),
            i.isSourceDownEventTarget || t.closeLightbox(),
            (i.isPointering = !1);
        }),
          (this.runActions = function () {
            i.swipedX > 0
              ? r.runPositiveSwipedXActions()
              : r.runNegativeSwipedXActions(),
              Y(n.container, n.slideSwipingHoverer),
              n.container.classList.remove(s),
              (i.isPointering = !1);
          });
      }
      function G(e) {
        var t = e.resolve,
          n = e.sourcePointerProps,
          o = t(J);
        this.listener = function () {
          n.isPointering &&
            (n.swipedX ? o.runActions() : o.runNoSwipeActions());
        };
      }
      function $(e) {
        var t = this,
          n = e.core,
          o = n.eventsDispatcher,
          i = n.globalEventsController,
          r = n.scrollbarRecompensor,
          s = e.data,
          a = e.elements,
          c = e.fs,
          u = e.props,
          d = e.sourcePointerProps;
        (this.isLightboxFadingOut = !1),
          (this.runActions = function () {
            (t.isLightboxFadingOut = !0),
              a.container.classList.add(v),
              i.removeListeners(),
              u.exitFullscreenOnClose && s.ifs && c.x(),
              setTimeout(function () {
                (t.isLightboxFadingOut = !1),
                  (d.isPointering = !1),
                  a.container.classList.remove(v),
                  document.documentElement.classList.remove(l),
                  r.removeRecompense(),
                  document.body.removeChild(a.container),
                  o.dispatch("onClose");
              }, 270);
          });
      }
      function K(e, t) {
        var n = e.classList;
        n.contains(t) && n.remove(t);
      }
      function Q(e) {
        var t, n, o;
        (n = (t = e).core.eventsDispatcher),
          (o = t.props),
          (n.dispatch = function (e) {
            o[e] && o[e]();
          }),
          (function (e) {
            var t = e.componentsServices,
              n = e.data,
              o = e.fs,
              i = [
                "fullscreenchange",
                "webkitfullscreenchange",
                "mozfullscreenchange",
                "MSFullscreenChange",
              ];
            function r(e) {
              for (var t = 0; t < i.length; t++) document[e](i[t], s);
            }
            function s() {
              document.fullscreenElement ||
              document.webkitIsFullScreen ||
              document.mozFullScreen ||
              document.msFullscreenElement
                ? t.ofs()
                : t.xfs();
            }
            (o.o = function () {
              t.ofs();
              var e = document.documentElement;
              e.requestFullscreen
                ? e.requestFullscreen()
                : e.mozRequestFullScreen
                ? e.mozRequestFullScreen()
                : e.webkitRequestFullscreen
                ? e.webkitRequestFullscreen()
                : e.msRequestFullscreen && e.msRequestFullscreen();
            }),
              (o.x = function () {
                t.xfs(),
                  document.exitFullscreen
                    ? document.exitFullscreen()
                    : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitExitFullscreen
                    ? document.webkitExitFullscreen()
                    : document.msExitFullscreen && document.msExitFullscreen();
              }),
              (o.t = function () {
                n.ifs ? o.x() : o.o();
              }),
              (o.l = function () {
                r("addEventListener");
              }),
              (o.q = function () {
                r("removeEventListener");
              });
          })(e),
          (function (e) {
            var t = e.core,
              n = t.globalEventsController,
              o = t.windowResizeActioner,
              i = e.fs,
              r = e.resolve,
              s = r(U),
              a = r(V),
              c = r(G);
            (n.attachListeners = function () {
              document.addEventListener("pointermove", a.listener),
                document.addEventListener("pointerup", c.listener),
                addEventListener("resize", o.runActions),
                document.addEventListener("keydown", s.listener),
                i.l();
            }),
              (n.removeListeners = function () {
                document.removeEventListener("pointermove", a.listener),
                  document.removeEventListener("pointerup", c.listener),
                  removeEventListener("resize", o.runActions),
                  document.removeEventListener("keydown", s.listener),
                  i.q();
              });
          })(e),
          (function (e) {
            var t = e.core.lightboxCloser,
              n = (0, e.resolve)($);
            t.closeLightbox = function () {
              n.isLightboxFadingOut || n.runActions();
            };
          })(e),
          (function (e) {
            var t = e.data,
              n = e.core.scrollbarRecompensor;
            function o() {
              document.body.offsetHeight > innerHeight &&
                (document.body.style.marginRight = t.scrollbarWidth + "px");
            }
            (n.addRecompense = function () {
              "complete" === document.readyState
                ? o()
                : addEventListener("load", function () {
                    o(), (n.addRecompense = o);
                  });
            }),
              (n.removeRecompense = function () {
                document.body.style.removeProperty("margin-right");
              });
          })(e),
          (function (e) {
            var t = e.core,
              n = t.slideChangeFacade,
              o = t.slideIndexChanger,
              i = t.stageManager;
            e.props.sources.length > 1
              ? ((n.changeToPrevious = function () {
                  o.jumpTo(i.getPreviousSlideIndex());
                }),
                (n.changeToNext = function () {
                  o.jumpTo(i.getNextSlideIndex());
                }))
              : ((n.changeToPrevious = function () {}),
                (n.changeToNext = function () {}));
          })(e),
          (function (e) {
            var t = e.componentsServices,
              n = e.core,
              o = n.slideIndexChanger,
              i = n.sourceDisplayFacade,
              r = n.stageManager,
              s = e.elements,
              a = s.smw,
              c = s.sourceAnimationWrappers,
              l = e.isl,
              u = e.stageIndexes,
              d = e.sws;
            (o.changeTo = function (e) {
              (u.current = e),
                r.updateStageIndexes(),
                t.setSlideNumber(e + 1),
                i.displaySourcesWhichShouldBeDisplayed();
            }),
              (o.jumpTo = function (e) {
                var t = u.previous,
                  n = u.current,
                  i = u.next,
                  s = l[n],
                  f = l[e];
                o.changeTo(e);
                for (var p = 0; p < a.length; p++) a[p].d();
                d.d(n),
                  d.c(),
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      var e = u.previous,
                        o = u.next;
                      function p() {
                        r.i(n)
                          ? n === u.previous
                            ? a[n].ne()
                            : n === u.next && a[n].p()
                          : (a[n].h(), a[n].n());
                      }
                      s && c[n].classList.add(m),
                        f && c[u.current].classList.add(h),
                        d.a(),
                        void 0 !== e && e !== n && a[e].ne(),
                        a[u.current].n(),
                        void 0 !== o && o !== n && a[o].p(),
                        d.b(t),
                        d.b(i),
                        l[n] ? setTimeout(p, 260) : p();
                    });
                  });
              });
          })(e),
          (function (e) {
            var t = e.core.sourcesPointerDown,
              n = e.elements,
              o = n.smw,
              i = n.sources,
              r = e.sourcePointerProps,
              s = e.stageIndexes;
            t.listener = function (e) {
              "VIDEO" !== e.target.tagName && e.preventDefault(),
                (r.isPointering = !0),
                (r.downScreenX = e.screenX),
                (r.swipedX = 0);
              var t = i[s.current];
              t && t.contains(e.target)
                ? (r.isSourceDownEventTarget = !0)
                : (r.isSourceDownEventTarget = !1);
              for (var n = 0; n < o.length; n++) o[n].d();
            };
          })(e),
          (function (e) {
            var t = e.collections.sourcesRenderFunctions,
              n = e.core.sourceDisplayFacade,
              o = e.props,
              i = e.stageIndexes;
            function r(e) {
              t[e] && (t[e](), delete t[e]);
            }
            n.displaySourcesWhichShouldBeDisplayed = function () {
              if (o.loadOnlyCurrentSource) r(i.current);
              else for (var e in i) r(i[e]);
            };
          })(e),
          (function (e) {
            var t = e.core.stageManager,
              n = e.elements,
              o = n.smw,
              i = n.sourceAnimationWrappers,
              r = e.isl,
              s = e.stageIndexes,
              a = e.sws;
            (a.a = function () {
              for (var e in s) o[s[e]].s();
            }),
              (a.b = function (e) {
                void 0 === e || t.i(e) || (o[e].h(), o[e].n());
              }),
              (a.c = function () {
                for (var e in s) a.d(s[e]);
              }),
              (a.d = function (e) {
                if (r[e]) {
                  var t = i[e];
                  K(t, g), K(t, h), K(t, m);
                }
              });
          })(e),
          (function (e) {
            var t = e.collections.sourceSizers,
              n = e.core.windowResizeActioner,
              o = e.data,
              i = e.elements.smw,
              r = e.stageIndexes;
            n.runActions = function () {
              innerWidth < 992
                ? (o.maxSourceWidth = innerWidth)
                : (o.maxSourceWidth = 0.9 * innerWidth),
                (o.maxSourceHeight = 0.9 * innerHeight);
              for (var e = 0; e < i.length; e++)
                i[e].d(), t[e] && t[e].adjustSize();
              var n = r.previous,
                s = r.next;
              void 0 !== n && i[n].ne(), void 0 !== s && i[s].p();
            };
          })(e);
      }
      function Z(e) {
        var t = e.componentsServices,
          n = e.core,
          o = n.eventsDispatcher,
          r = n.globalEventsController,
          s = n.scrollbarRecompensor,
          c = n.sourceDisplayFacade,
          u = n.stageManager,
          f = n.windowResizeActioner,
          p = e.data,
          h = e.elements,
          m = (e.props, e.stageIndexes),
          v = e.sws;
        function b() {
          var t, n;
          (p.i = !0),
            (p.scrollbarWidth = (function () {
              var e = document.createElement("div"),
                t = e.style,
                n = document.createElement("div");
              (t.visibility = "hidden"),
                (t.width = "100px"),
                (t.msOverflowStyle = "scrollbar"),
                (t.overflow = "scroll"),
                (n.style.width = "100%"),
                document.body.appendChild(e);
              var o = e.offsetWidth;
              e.appendChild(n);
              var i = n.offsetWidth;
              return document.body.removeChild(e), o - i;
            })()),
            Q(e),
            (h.container = document.createElement("div")),
            (h.container.className = ""
              .concat(i, "container ")
              .concat(a, " ")
              .concat(g)),
            (function (e) {
              var t = e.elements;
              (t.slideSwipingHoverer = document.createElement("div")),
                (t.slideSwipingHoverer.className = ""
                  .concat(i, "slide-swiping-hoverer ")
                  .concat(a, " ")
                  .concat(d));
            })(e),
            X(e),
            (function (e) {
              var t = e.core.sourcesPointerDown,
                n = e.elements,
                o = e.props.sources,
                i = document.createElement("div");
              (i.className = "".concat(d, " ").concat(a)),
                n.container.appendChild(i),
                i.addEventListener("pointerdown", t.listener),
                (n.sourceWrappersContainer = i);
              for (var r = 0; r < o.length; r++) D(e, r);
            })(e),
            e.props.sources.length > 1 &&
              ((n = (t = e).core.slideChangeFacade),
              B(
                t,
                n.changeToPrevious,
                "previous",
                "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"
              ),
              B(
                t,
                n.changeToNext,
                "next",
                "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z"
              )),
            (function (e) {
              for (
                var t = e.props.sources,
                  n = e.resolve,
                  o = n(L),
                  i = n(H),
                  r = n(R, [o, i]),
                  s = 0;
                s < t.length;
                s++
              )
                if ("string" == typeof t[s]) {
                  var a = r.getTypeSetByClientForIndex(s);
                  if (a) i.runActionsForSourceTypeAndIndex(a, s);
                  else {
                    var c = o.getSourceTypeFromLocalStorageByUrl(t[s]);
                    c
                      ? i.runActionsForSourceTypeAndIndex(c, s)
                      : r.retrieveTypeWithXhrForIndex(s);
                  }
                } else i.runActionsForSourceTypeAndIndex("custom", s);
            })(e),
            o.dispatch("onInit");
        }
        e.open = function () {
          var n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 0,
            i = m.previous,
            a = m.current,
            d = m.next;
          (m.current = n),
            p.i || S(e),
            u.updateStageIndexes(),
            p.i
              ? (v.c(), v.a(), v.b(i), v.b(a), v.b(d), o.dispatch("onShow"))
              : b(),
            c.displaySourcesWhichShouldBeDisplayed(),
            t.setSlideNumber(n + 1),
            document.body.appendChild(h.container),
            document.documentElement.classList.add(l),
            s.addRecompense(),
            r.attachListeners(),
            f.runActions(),
            h.smw[m.current].n(),
            o.dispatch("onOpen");
        };
      }
      function ee(e, t, n) {
        return (ee = te()
          ? Reflect.construct.bind()
          : function (e, t, n) {
              var o = [null];
              o.push.apply(o, t);
              var i = new (Function.bind.apply(e, o))();
              return n && ne(i, n.prototype), i;
            }).apply(null, arguments);
      }
      function te() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function ne(e, t) {
        return (ne = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function oe(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return ie(e);
          })(e) ||
          (function (e) {
            if (
              ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e["@@iterator"]
            )
              return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return ie(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return ie(e, t);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function ie(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      function re() {
        for (
          var e = document.getElementsByTagName("a"),
            t = function (t) {
              if (!e[t].hasAttribute("data-fslightbox")) return "continue";
              var n = e[t].hasAttribute("data-href")
                ? e[t].getAttribute("data-href")
                : e[t].getAttribute("href");
              if (!n)
                return (
                  console.warn(
                    'The "data-fslightbox" attribute was set without the "href" attribute.'
                  ),
                  "continue"
                );
              var o = e[t].getAttribute("data-fslightbox");
              fsLightboxInstances[o] ||
                (fsLightboxInstances[o] = new FsLightbox());
              var i = null;
              "#" === n.charAt(0)
                ? (i = document
                    .getElementById(n.substring(1))
                    .cloneNode(!0)).removeAttribute("id")
                : (i = n),
                fsLightboxInstances[o].props.sources.push(i),
                fsLightboxInstances[o].elements.a.push(e[t]);
              var r = fsLightboxInstances[o].props.sources.length - 1;
              (e[t].onclick = function (e) {
                e.preventDefault(), fsLightboxInstances[o].open(r);
              }),
                d("types", "data-type"),
                d("videosPosters", "data-video-poster"),
                d("customClasses", "data-class"),
                d("customClasses", "data-custom-class");
              for (
                var s = [
                    "href",
                    "data-fslightbox",
                    "data-href",
                    "data-type",
                    "data-video-poster",
                    "data-class",
                    "data-custom-class",
                  ],
                  a = e[t].attributes,
                  c = fsLightboxInstances[o].props.customAttributes,
                  l = 0;
                l < a.length;
                l++
              )
                if (
                  -1 === s.indexOf(a[l].name) &&
                  "data-" === a[l].name.substr(0, 5)
                ) {
                  c[r] || (c[r] = {});
                  var u = a[l].name.substr(5);
                  c[r][u] = a[l].value;
                }
              function d(n, i) {
                e[t].hasAttribute(i) &&
                  (fsLightboxInstances[o].props[n][r] = e[t].getAttribute(i));
              }
            },
            n = 0;
          n < e.length;
          n++
        )
          t(n);
        var o = Object.keys(fsLightboxInstances);
        window.fsLightbox = fsLightboxInstances[o[o.length - 1]];
      }
      (window.FsLightbox = function () {
        var e = this;
        (this.props = {
          sources: [],
          customAttributes: [],
          customClasses: [],
          types: [],
          videosPosters: [],
          slideDistance: 0.3,
        }),
          (this.data = {
            isFullscreenOpen: !1,
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            scrollbarWidth: 0,
          }),
          (this.isl = []),
          (this.sourcePointerProps = {
            downScreenX: null,
            isPointering: !1,
            isSourceDownEventTarget: !1,
            swipedX: 0,
          }),
          (this.stageIndexes = {}),
          (this.elements = {
            a: [],
            container: null,
            slideSwipingHoverer: null,
            smw: [],
            sourceWrappersContainer: null,
            sources: [],
            sourceAnimationWrappers: [],
          }),
          (this.componentsServices = { setSlideNumber: function () {} }),
          (this.resolve = function (t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [];
            return n.unshift(e), ee(t, oe(n));
          }),
          (this.collections = {
            sourceLoadHandlers: [],
            sourcesRenderFunctions: [],
            sourceSizers: [],
          }),
          (this.core = {
            eventsDispatcher: {},
            globalEventsController: {},
            lightboxCloser: {},
            lightboxUpdater: {},
            scrollbarRecompensor: {},
            slideChangeFacade: {},
            slideIndexChanger: {},
            sourcesPointerDown: {},
            sourceDisplayFacade: {},
            stageManager: {},
            windowResizeActioner: {},
          }),
          (this.fs = {}),
          (this.sws = {}),
          Z(this),
          (this.close = function () {
            return e.core.lightboxCloser.closeLightbox();
          });
      }),
        (window.fsLightboxInstances = {}),
        re(),
        (window.refreshFsLightbox = function () {
          for (var e in fsLightboxInstances) {
            var t = fsLightboxInstances[e].props;
            (fsLightboxInstances[e] = new FsLightbox()),
              (fsLightboxInstances[e].props = t),
              (fsLightboxInstances[e].props.sources = []),
              (fsLightboxInstances[e].elements.a = []);
          }
          re();
        });
    },
  ]);
});

// Simple-parallax
/*!
 * simpleParallax.min - simpleParallax is a simple JavaScript library that gives your website parallax animations on any images or videos,
 * @date: 20-08-2020 14:0:14,
 * @version: 5.6.2,
 * @link: https://simpleparallax.com/
 */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define("simpleParallax", [], e)
    : "object" == typeof exports
    ? (exports.simpleParallax = e())
    : (t.simpleParallax = e());
})(window, function () {
  return (function (t) {
    var e = {};
    function n(i) {
      if (e[i]) return e[i].exports;
      var r = (e[i] = { i: i, l: !1, exports: {} });
      return t[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (
          (n.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            n.d(
              i,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return i;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 0))
    );
  })([
    function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "default", function () {
          return x;
        });
      var i = function () {
        return Element.prototype.closest && "IntersectionObserver" in window;
      };
      function r(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var s = new ((function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.positions = { top: 0, bottom: 0, height: 0 });
          }
          var e, n, i;
          return (
            (e = t),
            (n = [
              {
                key: "setViewportTop",
                value: function (t) {
                  return (
                    (this.positions.top = t ? t.scrollTop : window.pageYOffset),
                    this.positions
                  );
                },
              },
              {
                key: "setViewportBottom",
                value: function () {
                  return (
                    (this.positions.bottom =
                      this.positions.top + this.positions.height),
                    this.positions
                  );
                },
              },
              {
                key: "setViewportAll",
                value: function (t) {
                  return (
                    (this.positions.top = t ? t.scrollTop : window.pageYOffset),
                    (this.positions.height = t
                      ? t.clientHeight
                      : document.documentElement.clientHeight),
                    (this.positions.bottom =
                      this.positions.top + this.positions.height),
                    this.positions
                  );
                },
              },
            ]) && r(e.prototype, n),
            i && r(e, i),
            t
          );
        })())(),
        o = function (t) {
          return NodeList.prototype.isPrototypeOf(t) ||
            HTMLCollection.prototype.isPrototypeOf(t)
            ? Array.from(t)
            : "string" == typeof t || t instanceof String
            ? document.querySelectorAll(t)
            : [t];
        },
        a = (function () {
          for (
            var t,
              e =
                "transform webkitTransform mozTransform oTransform msTransform".split(
                  " "
                ),
              n = 0;
            void 0 === t;

          )
            (t =
              void 0 !== document.createElement("div").style[e[n]]
                ? e[n]
                : void 0),
              (n += 1);
          return t;
        })(),
        l = function (t) {
          return (
            ("img" !== t.tagName.toLowerCase() &&
              "picture" !== t.tagName.toLowerCase()) ||
            (!!t &&
              !!t.complete &&
              (void 0 === t.naturalWidth || 0 !== t.naturalWidth))
          );
        };
      function u(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return c(t);
          })(t) ||
          (function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
              return Array.from(t);
          })(t) ||
          (function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return c(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return c(t, e);
          })(t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function c(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
        return i;
      }
      function h(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var f = (function () {
        function t(e, n) {
          var i = this;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.element = e),
            (this.elementContainer = e),
            (this.settings = n),
            (this.isVisible = !0),
            (this.isInit = !1),
            (this.oldTranslateValue = -1),
            (this.init = this.init.bind(this)),
            (this.customWrapper =
              this.settings.customWrapper &&
              this.element.closest(this.settings.customWrapper)
                ? this.element.closest(this.settings.customWrapper)
                : null),
            l(e)
              ? this.init()
              : this.element.addEventListener("load", function () {
                  setTimeout(function () {
                    i.init(!0);
                  }, 50);
                });
        }
        var e, n, i;
        return (
          (e = t),
          (n = [
            {
              key: "init",
              value: function (t) {
                var e = this;
                this.isInit ||
                  (t && (this.rangeMax = null),
                  this.element.closest(".simpleParallax") ||
                    (!1 === this.settings.overflow &&
                      this.wrapElement(this.element),
                    this.setTransformCSS(),
                    this.getElementOffset(),
                    this.intersectionObserver(),
                    this.getTranslateValue(),
                    this.animate(),
                    this.settings.delay > 0
                      ? setTimeout(function () {
                          e.setTransitionCSS(),
                            e.elementContainer.classList.add(
                              "simple-parallax-initialized"
                            );
                        }, 10)
                      : this.elementContainer.classList.add(
                          "simple-parallax-initialized"
                        ),
                    (this.isInit = !0)));
              },
            },
            {
              key: "wrapElement",
              value: function () {
                var t = this.element.closest("picture") || this.element,
                  e = this.customWrapper || document.createElement("div");
                e.classList.add("simpleParallax"),
                  (e.style.overflow = "hidden"),
                  this.customWrapper ||
                    (t.parentNode.insertBefore(e, t), e.appendChild(t)),
                  (this.elementContainer = e);
              },
            },
            {
              key: "unWrapElement",
              value: function () {
                var t = this.elementContainer;
                this.customWrapper
                  ? (t.classList.remove("simpleParallax"),
                    (t.style.overflow = ""))
                  : t.replaceWith.apply(t, u(t.childNodes));
              },
            },
            {
              key: "setTransformCSS",
              value: function () {
                !1 === this.settings.overflow &&
                  (this.element.style[a] = "scale(".concat(
                    this.settings.scale,
                    ")"
                  )),
                  (this.element.style.willChange = "transform");
              },
            },
            {
              key: "setTransitionCSS",
              value: function () {
                this.element.style.transition = "transform "
                  .concat(this.settings.delay, "s ")
                  .concat(this.settings.transition);
              },
            },
            {
              key: "unSetStyle",
              value: function () {
                (this.element.style.willChange = ""),
                  (this.element.style[a] = ""),
                  (this.element.style.transition = "");
              },
            },
            {
              key: "getElementOffset",
              value: function () {
                var t = this.elementContainer.getBoundingClientRect();
                if (
                  ((this.elementHeight = t.height),
                  (this.elementTop = t.top + s.positions.top),
                  this.settings.customContainer)
                ) {
                  var e = this.settings.customContainer.getBoundingClientRect();
                  this.elementTop = t.top - e.top + s.positions.top;
                }
                this.elementBottom = this.elementHeight + this.elementTop;
              },
            },
            {
              key: "buildThresholdList",
              value: function () {
                for (var t = [], e = 1; e <= this.elementHeight; e++) {
                  var n = e / this.elementHeight;
                  t.push(n);
                }
                return t;
              },
            },
            {
              key: "intersectionObserver",
              value: function () {
                var t = { root: null, threshold: this.buildThresholdList() };
                (this.observer = new IntersectionObserver(
                  this.intersectionObserverCallback.bind(this),
                  t
                )),
                  this.observer.observe(this.element);
              },
            },
            {
              key: "intersectionObserverCallback",
              value: function (t) {
                var e = this;
                t.forEach(function (t) {
                  t.isIntersecting ? (e.isVisible = !0) : (e.isVisible = !1);
                });
              },
            },
            {
              key: "checkIfVisible",
              value: function () {
                return (
                  this.elementBottom > s.positions.top &&
                  this.elementTop < s.positions.bottom
                );
              },
            },
            {
              key: "getRangeMax",
              value: function () {
                var t = this.element.clientHeight;
                this.rangeMax = t * this.settings.scale - t;
              },
            },
            {
              key: "getTranslateValue",
              value: function () {
                var t = (
                  (s.positions.bottom - this.elementTop) /
                  ((s.positions.height + this.elementHeight) / 100)
                ).toFixed(1);
                return (
                  (t = Math.min(100, Math.max(0, t))),
                  0 !== this.settings.maxTransition &&
                    t > this.settings.maxTransition &&
                    (t = this.settings.maxTransition),
                  this.oldPercentage !== t &&
                    (this.rangeMax || this.getRangeMax(),
                    (this.translateValue = (
                      (t / 100) * this.rangeMax -
                      this.rangeMax / 2
                    ).toFixed(0)),
                    this.oldTranslateValue !== this.translateValue &&
                      ((this.oldPercentage = t),
                      (this.oldTranslateValue = this.translateValue),
                      !0))
                );
              },
            },
            {
              key: "animate",
              value: function () {
                var t,
                  e = 0,
                  n = 0;
                (this.settings.orientation.includes("left") ||
                  this.settings.orientation.includes("right")) &&
                  (n = "".concat(
                    this.settings.orientation.includes("left")
                      ? -1 * this.translateValue
                      : this.translateValue,
                    "px"
                  )),
                  (this.settings.orientation.includes("up") ||
                    this.settings.orientation.includes("down")) &&
                    (e = "".concat(
                      this.settings.orientation.includes("up")
                        ? -1 * this.translateValue
                        : this.translateValue,
                      "px"
                    )),
                  (t =
                    !1 === this.settings.overflow
                      ? "translate3d("
                          .concat(n, ", ")
                          .concat(e, ", 0) scale(")
                          .concat(this.settings.scale, ")")
                      : "translate3d(".concat(n, ", ").concat(e, ", 0)")),
                  (this.element.style[a] = t);
              },
            },
          ]) && h(e.prototype, n),
          i && h(e, i),
          t
        );
      })();
      function m(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return y(t);
          })(t) ||
          (function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
              return Array.from(t);
          })(t) ||
          d(t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function p(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
              return;
            var n = [],
              i = !0,
              r = !1,
              s = void 0;
            try {
              for (
                var o, a = t[Symbol.iterator]();
                !(i = (o = a.next()).done) &&
                (n.push(o.value), !e || n.length !== e);
                i = !0
              );
            } catch (t) {
              (r = !0), (s = t);
            } finally {
              try {
                i || null == a.return || a.return();
              } finally {
                if (r) throw s;
              }
            }
            return n;
          })(t, e) ||
          d(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function d(t, e) {
        if (t) {
          if ("string" == typeof t) return y(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return (
            "Object" === n && t.constructor && (n = t.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(t)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? y(t, e)
              : void 0
          );
        }
      }
      function y(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
        return i;
      }
      function v(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var g,
        b,
        w = !1,
        T = [],
        x = (function () {
          function t(e, n) {
            if (
              ((function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              e && i())
            ) {
              if (
                ((this.elements = o(e)),
                (this.defaults = {
                  delay: 0,
                  orientation: "up",
                  scale: 1.3,
                  overflow: !1,
                  transition: "cubic-bezier(0,0,0,1)",
                  customContainer: "",
                  customWrapper: "",
                  maxTransition: 0,
                }),
                (this.settings = Object.assign(this.defaults, n)),
                this.settings.customContainer)
              ) {
                var r = p(o(this.settings.customContainer), 1);
                this.customContainer = r[0];
              }
              (this.lastPosition = -1),
                (this.resizeIsDone = this.resizeIsDone.bind(this)),
                (this.refresh = this.refresh.bind(this)),
                (this.proceedRequestAnimationFrame =
                  this.proceedRequestAnimationFrame.bind(this)),
                this.init();
            }
          }
          var e, n, r;
          return (
            (e = t),
            (n = [
              {
                key: "init",
                value: function () {
                  var t = this;
                  s.setViewportAll(this.customContainer),
                    (T = [].concat(
                      m(
                        this.elements.map(function (e) {
                          return new f(e, t.settings);
                        })
                      ),
                      m(T)
                    )),
                    w ||
                      (this.proceedRequestAnimationFrame(),
                      window.addEventListener("resize", this.resizeIsDone),
                      (w = !0));
                },
              },
              {
                key: "resizeIsDone",
                value: function () {
                  clearTimeout(b), (b = setTimeout(this.refresh, 200));
                },
              },
              {
                key: "proceedRequestAnimationFrame",
                value: function () {
                  var t = this;
                  s.setViewportTop(this.customContainer),
                    this.lastPosition !== s.positions.top
                      ? (s.setViewportBottom(),
                        T.forEach(function (e) {
                          t.proceedElement(e);
                        }),
                        (g = window.requestAnimationFrame(
                          this.proceedRequestAnimationFrame
                        )),
                        (this.lastPosition = s.positions.top))
                      : (g = window.requestAnimationFrame(
                          this.proceedRequestAnimationFrame
                        ));
                },
              },
              {
                key: "proceedElement",
                value: function (t) {
                  (this.customContainer ? t.checkIfVisible() : t.isVisible) &&
                    t.getTranslateValue() &&
                    t.animate();
                },
              },
              {
                key: "refresh",
                value: function () {
                  s.setViewportAll(this.customContainer),
                    T.forEach(function (t) {
                      t.getElementOffset(), t.getRangeMax();
                    }),
                    (this.lastPosition = -1);
                },
              },
              {
                key: "destroy",
                value: function () {
                  var t = this,
                    e = [];
                  (T = T.filter(function (n) {
                    return t.elements.includes(n.element) ? (e.push(n), !1) : n;
                  })),
                    e.forEach(function (e) {
                      e.unSetStyle(),
                        !1 === t.settings.overflow && e.unWrapElement();
                    }),
                    T.length ||
                      (window.cancelAnimationFrame(g),
                      window.removeEventListener("resize", this.refresh),
                      (w = !1));
                },
              },
            ]) && v(e.prototype, n),
            r && v(e, r),
            t
          );
        })();
    },
  ]).default;
});

// Pristine
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.Pristine = factory()));
})(this, function () {
  "use strict";

  var lang = {
    required: "This field is required",
    email: "This field requires a valid e-mail address",
    number: "This field requires a number",
    integer: "This field requires an integer value",
    url: "This field requires a valid website URL",
    tel: "This field requires a valid telephone number",
    maxlength: "This fields length must be < ${1}",
    minlength: "This fields length must be > ${1}",
    min: "Minimum value for this field is ${1}",
    max: "Maximum value for this field is ${1}",
    pattern: "Please match the requested format",
  };

  function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
  }

  function tmpl(o) {
    var _arguments = arguments;

    return this.replace(/\${([^{}]*)}/g, function (a, b) {
      return _arguments[b];
    });
  }

  function groupedElemCount(input) {
    return input.pristine.self.form.querySelectorAll(
      'input[name="' + input.getAttribute("name") + '"]:checked'
    ).length;
  }

  function mergeConfig(obj1, obj2) {
    for (var attr in obj2) {
      if (!(attr in obj1)) {
        obj1[attr] = obj2[attr];
      }
    }
    return obj1;
  }

  function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  var defaultConfig = {
    classTo: "form-group",
    errorClass: "has-danger",
    successClass: "has-success",
    errorTextParent: "form-group",
    errorTextTag: "div",
    errorTextClass: "text-help",
  };

  var PRISTINE_ERROR = "pristine-error";
  var SELECTOR =
    "input:not([type^=hidden]):not([type^=submit]), select, textarea";
  var ALLOWED_ATTRIBUTES = [
    "required",
    "min",
    "max",
    "minlength",
    "maxlength",
    "pattern",
  ];
  var EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var validators = {};

  var _ = function _(name, validator) {
    validator.name = name;
    if (!validator.msg) validator.msg = lang[name];
    if (validator.priority === undefined) validator.priority = 1;
    validators[name] = validator;
  };

  _("text", {
    fn: function fn(val) {
      return true;
    },
    priority: 0,
  });
  _("required", {
    fn: function fn(val) {
      return this.type === "radio" || this.type === "checkbox"
        ? groupedElemCount(this)
        : val !== undefined && val !== "";
    },
    priority: 99,
    halt: true,
  });
  _("email", {
    fn: function fn(val) {
      return !val || EMAIL_REGEX.test(val);
    },
  });
  _("number", {
    fn: function fn(val) {
      return !val || !isNaN(parseFloat(val));
    },
    priority: 2,
  });
  _("integer", {
    fn: function fn(val) {
      return !val || /^\d+$/.test(val);
    },
  });
  _("minlength", {
    fn: function fn(val, length) {
      return !val || val.length >= parseInt(length);
    },
  });
  _("maxlength", {
    fn: function fn(val, length) {
      return !val || val.length <= parseInt(length);
    },
  });
  _("min", {
    fn: function fn(val, limit) {
      return (
        !val ||
        (this.type === "checkbox"
          ? groupedElemCount(this) >= parseInt(limit)
          : parseFloat(val) >= parseFloat(limit))
      );
    },
  });
  _("max", {
    fn: function fn(val, limit) {
      return (
        !val ||
        (this.type === "checkbox"
          ? groupedElemCount(this) <= parseInt(limit)
          : parseFloat(val) <= parseFloat(limit))
      );
    },
  });
  _("pattern", {
    fn: function fn(val, pattern) {
      var m = pattern.match(new RegExp("^/(.*?)/([gimy]*)$"));
      return !val || new RegExp(m[1], m[2]).test(val);
    },
  });

  function Pristine(form, config, live) {
    var self = this;

    init(form, config, live);

    function init(form, config, live) {
      form.setAttribute("novalidate", "true");

      self.form = form;
      self.config = mergeConfig(config || {}, defaultConfig);
      self.live = !(live === false);
      self.fields = Array.from(form.querySelectorAll(SELECTOR)).map(
        function (input) {
          var fns = [];
          var params = {};
          var messages = {};

          [].forEach.call(input.attributes, function (attr) {
            if (/^data-pristine-/.test(attr.name)) {
              var name = attr.name.substr(14);
              if (name.endsWith("-message")) {
                messages[name.slice(0, name.length - 8)] = attr.value;
                return;
              }
              if (name === "type") name = attr.value;
              _addValidatorToField(fns, params, name, attr.value);
            } else if (~ALLOWED_ATTRIBUTES.indexOf(attr.name)) {
              _addValidatorToField(fns, params, attr.name, attr.value);
            } else if (attr.name === "type") {
              _addValidatorToField(fns, params, attr.value);
            }
          });

          fns.sort(function (a, b) {
            return b.priority - a.priority;
          });

          self.live &&
            input.addEventListener(
              !~["radio", "checkbox"].indexOf(input.getAttribute("type"))
                ? "input"
                : "change",
              function (e) {
                self.validate(e.target);
              }.bind(self)
            );

          return (input.pristine = {
            input: input,
            validators: fns,
            params: params,
            messages: messages,
            self: self,
          });
        }.bind(self)
      );
    }

    function _addValidatorToField(fns, params, name, value) {
      var validator = validators[name];
      if (validator) {
        fns.push(validator);
        if (value) {
          var valueParams = value.split(",");
          valueParams.unshift(null); // placeholder for input's value
          params[name] = valueParams;
        }
      }
    }

    /***
     * Checks whether the form/input elements are valid
     * @param input => input element(s) or a jquery selector, null for full form validation
     * @param silent => do not show error messages, just return true/false
     * @returns {boolean} return true when valid false otherwise
     */
    self.validate = function (input, silent) {
      silent = (input && silent === true) || input === true;
      var fields = self.fields;
      if (input !== true && input !== false) {
        if (input instanceof HTMLElement) {
          fields = [input.pristine];
        } else if (
          input instanceof NodeList ||
          input instanceof (window.$ || Array) ||
          input instanceof Array
        ) {
          fields = Array.from(input).map(function (el) {
            return el.pristine;
          });
        }
      }

      var valid = true;

      for (var i = 0; fields[i]; i++) {
        var field = fields[i];
        if (_validateField(field)) {
          !silent && _showSuccess(field);
        } else {
          valid = false;
          !silent && _showError(field);
        }
      }
      return valid;
    };

    /***
     * Get errors of a specific field or the whole form
     * @param input
     * @returns {Array|*}
     */
    self.getErrors = function (input) {
      if (!input) {
        var erroneousFields = [];
        for (var i = 0; i < self.fields.length; i++) {
          var field = self.fields[i];
          if (field.errors.length) {
            erroneousFields.push({ input: field.input, errors: field.errors });
          }
        }
        return erroneousFields;
      }
      if (input.tagName && input.tagName.toLowerCase() === "select") {
        return input.pristine.errors;
      }
      return input.length ? input[0].pristine.errors : input.pristine.errors;
    };

    /***
     * Validates a single field, all validator functions are called and error messages are generated
     * when a validator fails
     * @param field
     * @returns {boolean}
     * @private
     */
    function _validateField(field) {
      var errors = [];
      var valid = true;
      for (var i = 0; field.validators[i]; i++) {
        var validator = field.validators[i];
        var params = field.params[validator.name]
          ? field.params[validator.name]
          : [];
        params[0] = field.input.value;
        if (!validator.fn.apply(field.input, params)) {
          valid = false;

          if (isFunction(validator.msg)) {
            errors.push(validator.msg(field.input.value, params));
          } else {
            var error = field.messages[validator.name] || validator.msg;
            errors.push(tmpl.apply(error, params));
          }

          if (validator.halt === true) {
            break;
          }
        }
      }
      field.errors = errors;
      return valid;
    }

    /***
     *
     * @param elem => The dom element where the validator is applied to
     * @param fn => validator function
     * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
     * so on are for the attribute values
     * @param priority => priority of the validator function, higher valued function gets called first.
     * @param halt => whether validation should stop for this field after current validation function
     */
    self.addValidator = function (elem, fn, msg, priority, halt) {
      if (elem instanceof HTMLElement) {
        elem.pristine.validators.push({
          fn: fn,
          msg: msg,
          priority: priority,
          halt: halt,
        });
        elem.pristine.validators.sort(function (a, b) {
          return b.priority - a.priority;
        });
      } else {
        console.warn("The parameter elem must be a dom element");
      }
    };

    /***
     * An utility function that returns a 2-element array, first one is the element where error/success class is
     * applied. 2nd one is the element where error message is displayed. 2nd element is created if doesn't exist and cached.
     * @param field
     * @returns {*}
     * @private
     */
    function _getErrorElements(field) {
      if (field.errorElements) {
        return field.errorElements;
      }
      var errorClassElement = findAncestor(field.input, self.config.classTo);
      var errorTextParent = null,
        errorTextElement = null;
      if (self.config.classTo === self.config.errorTextParent) {
        errorTextParent = errorClassElement;
      } else {
        errorTextParent = errorClassElement.querySelector(
          "." + self.config.errorTextParent
        );
      }
      if (errorTextParent) {
        errorTextElement = errorTextParent.querySelector("." + PRISTINE_ERROR);
        if (!errorTextElement) {
          errorTextElement = document.createElement(self.config.errorTextTag);
          errorTextElement.className =
            PRISTINE_ERROR + " " + self.config.errorTextClass;
          errorTextParent.appendChild(errorTextElement);
          errorTextElement.pristineDisplay = errorTextElement.style.display;
        }
      }
      return (field.errorElements = [errorClassElement, errorTextElement]);
    }

    function _showError(field) {
      var errorElements = _getErrorElements(field);
      var errorClassElement = errorElements[0],
        errorTextElement = errorElements[1];

      if (errorClassElement) {
        errorClassElement.classList.remove(self.config.successClass);
        errorClassElement.classList.add(self.config.errorClass);
      }
      if (errorTextElement) {
        errorTextElement.innerHTML = field.errors.join("<br/>");
        errorTextElement.style.display = errorTextElement.pristineDisplay || "";
      }
    }

    /***
     * Adds error to a specific field
     * @param input
     * @param error
     */
    self.addError = function (input, error) {
      input = input.length ? input[0] : input;
      input.pristine.errors.push(error);
      _showError(input.pristine);
    };

    function _removeError(field) {
      var errorElements = _getErrorElements(field);
      var errorClassElement = errorElements[0],
        errorTextElement = errorElements[1];
      if (errorClassElement) {
        // IE > 9 doesn't support multiple class removal
        errorClassElement.classList.remove(self.config.errorClass);
        errorClassElement.classList.remove(self.config.successClass);
      }
      if (errorTextElement) {
        errorTextElement.innerHTML = "";
        errorTextElement.style.display = "none";
      }
      return errorElements;
    }

    function _showSuccess(field) {
      var errorClassElement = _removeError(field)[0];
      errorClassElement &&
        errorClassElement.classList.add(self.config.successClass);
    }

    /***
     * Resets the errors
     */
    self.reset = function () {
      for (var i = 0; self.fields[i]; i++) {
        self.fields[i].errorElements = null;
      }
      Array.from(self.form.querySelectorAll("." + PRISTINE_ERROR)).map(
        function (elem) {
          elem.parentNode.removeChild(elem);
        }
      );
      Array.from(self.form.querySelectorAll("." + self.config.classTo)).map(
        function (elem) {
          elem.classList.remove(self.config.successClass);
          elem.classList.remove(self.config.errorClass);
        }
      );
    };

    /***
     * Resets the errors and deletes all pristine fields
     */
    self.destroy = function () {
      self.reset();
      self.fields.forEach(function (field) {
        delete field.input.pristine;
      });
      self.fields = [];
    };

    self.setGlobalConfig = function (config) {
      defaultConfig = config;
    };

    return self;
  }

  /***
   *
   * @param name => Name of the global validator
   * @param fn => validator function
   * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
   * so on are for the attribute values
   * @param priority => priority of the validator function, higher valued function gets called first.
   * @param halt => whether validation should stop for this field after current validation function
   */
  Pristine.addValidator = function (name, fn, msg, priority, halt) {
    _(name, { fn: fn, msg: msg, priority: priority, halt: halt });
  };

  return Pristine;
});

// FilterizR
var Filterizr = (function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  return (
    (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 5))
  );
})([
  function (t, e, n) {
    "use strict";
    var r = {
        IDLE: "IDLE",
        FILTERING: "FILTERING",
        SORTING: "SORTING",
        SHUFFLING: "SHUFFLING",
      },
      i = {
        SAME_SIZE: "sameSize",
        SAME_HEIGHT: "sameHeight",
        SAME_WIDTH: "sameWidth",
        PACKED: "packed",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
      },
      o =
        /(^linear$)|(^ease-in-out$)|(^ease-in$)|(^ease-out$)|(^ease$)|(^step-start$)|(^step-end$)|(^steps\(\d\s*,\s*(end|start)\))$|(^cubic-bezier\((\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\))$/,
      s = function (t, e, n, r, i) {
        if (void 0 !== e) {
          var o = new Error(
              'Filterizr: expected type of option "' +
                t +
                '" to be "' +
                n +
                '", but its type is: "' +
                typeof e +
                '"'
            ),
            s = !1,
            a = !1,
            u = n.includes("array");
          if (
            ((typeof e).match(n) ? (s = !0) : !s && u && (a = Array.isArray(e)),
            !s && !u)
          )
            throw o;
          if (!s && u && !a) throw o;
          var c = function (t) {
            return t ? " For further help read here: " + t : "";
          };
          if (Array.isArray(r)) {
            var l = !1;
            if (
              (r.forEach(function (t) {
                t === e && (l = !0);
              }),
              !l)
            )
              throw new Error(
                'Filterizr: allowed values for option "' +
                  t +
                  '" are: ' +
                  r
                    .map(function (t) {
                      return '"' + t + '"';
                    })
                    .join(", ") +
                  '. Value received: "' +
                  e +
                  '".' +
                  c(i)
              );
          } else if ("string" == typeof e && r instanceof RegExp) {
            if (!e.match(r))
              throw new Error(
                'Filterizr: invalid value "' +
                  e +
                  '" for option "' +
                  t +
                  '" received.' +
                  c(i)
              );
          }
        }
      },
      a = function (t, e, n) {
        var r;
        return function () {
          var i = this,
            o = arguments;
          clearTimeout(r),
            (r = window.setTimeout(function () {
              (r = null), n || t.apply(i, o);
            }, e)),
            n && !r && t.apply(i, o);
        };
      },
      u = function (t, e) {
        return (
          t.length === e.length &&
          t.reduce(function (t, n, r) {
            var i = n.getSortAttribute("index"),
              o = e[r].getSortAttribute("index");
            return t && i === o;
          }, !0)
        );
      };
    var c = function (t) {
      return "string" == typeof t ? document.querySelector(t) : t;
    };
    function l(t) {
      return t && "object" == typeof t && !Array.isArray(t);
    }
    function f(t) {
      for (var e, n, r = [], i = 1; i < arguments.length; i++)
        r[i - 1] = arguments[i];
      if (!r.length) return t;
      var o = r.shift();
      if (l(t) && l(o))
        for (var s in o)
          l(o[s])
            ? (t[s] || Object.assign(t, (((e = {})[s] = {}), e)), f(t[s], o[s]))
            : Object.assign(t, (((n = {})[s] = o[s]), n));
      return f.apply(void 0, [t].concat(r));
    }
    var h = function () {};
    function p(t, e) {
      Object.entries(e).forEach(function (e) {
        var n = e[0],
          r = e[1];
        t.style[n] = r;
      });
    }
    var d = function (t) {
        for (var e = t.slice(0), n = []; 0 !== e.length; ) {
          var r = Math.floor(e.length * Math.random());
          n.push(e[r]), e.splice(r, 1);
        }
        return n;
      },
      y = (function () {
        function t(t) {
          (this.receiver = t), (this.eventDictionary = {});
        }
        return (
          (t.prototype.on = function (t, e) {
            var n = this.receiver,
              r = n instanceof NodeList;
            !!this.eventDictionary[t] && delete this.eventDictionary[t],
              r && n.length
                ? ((this.eventDictionary[t] = e),
                  Array.from(n).forEach(function (n) {
                    n.addEventListener(t, e);
                  }))
                : !r &&
                  n &&
                  ((this.eventDictionary[t] = e), n.addEventListener(t, e));
          }),
          (t.prototype.off = function (t) {
            var e = this.receiver,
              n = this.eventDictionary[t],
              r = e instanceof NodeList;
            r && e.length
              ? Array.from(e).forEach(function (e) {
                  e.removeEventListener(t, n);
                })
              : !r && e && e.removeEventListener(t, n),
              delete this.eventDictionary[t];
          }),
          (t.prototype.destroy = function () {
            var t = this,
              e = this.receiver,
              n = e instanceof NodeList;
            n && e.length
              ? Array.from(e).forEach(function (e) {
                  return t.removeAllEvents(e);
                })
              : !n && e && this.removeAllEvents(e);
          }),
          (t.prototype.removeAllEvents = function (t) {
            var e = this;
            Object.keys(this.eventDictionary).forEach(function (n) {
              t.removeEventListener(n, e.eventDictionary[n]),
                delete e.eventDictionary[n];
            });
          }),
          t
        );
      })(),
      v = {
        animationDuration: 0.5,
        callbacks: {
          onInit: h,
          onFilteringStart: h,
          onFilteringEnd: h,
          onShufflingStart: h,
          onShufflingEnd: h,
          onSortingStart: h,
          onSortingEnd: h,
        },
        controlsSelector: "",
        delay: 0,
        delayMode: "progressive",
        easing: "ease-out",
        filter: "all",
        filterOutCss: { opacity: 0, transform: "scale(0.5)" },
        filterInCss: { opacity: 1, transform: "scale(1)" },
        gridItemsSelector: ".filtr-item",
        gutterPixels: 0,
        layout: i.SAME_SIZE,
        multifilterLogicalOperator: "or",
        searchTerm: "",
        setupControls: !0,
        spinner: {
          enabled: !1,
          fillColor: "#2184D0",
          styles: {
            height: "75px",
            margin: "0 auto",
            width: "75px",
            "z-index": 2,
          },
        },
      },
      g = (function () {
        function t(t) {
          this.filter = t;
        }
        return (
          (t.prototype.get = function () {
            return this.filter;
          }),
          (t.prototype.set = function (t) {
            this.filter = t;
          }),
          (t.prototype.toggle = function (t) {
            this.filter = this.toggleFilter(this.filter, t);
          }),
          (t.prototype.toggleFilter = function (t, e) {
            if ("all" === t) return e;
            if (Array.isArray(t)) {
              if (t.includes(e)) {
                var n = t.filter(function (t) {
                  return t !== e;
                });
                return 1 === n.length ? n[0] : n;
              }
              return t.concat([e]);
            }
            return t === e ? "all" : [t, e];
          }),
          t
        );
      })(),
      m = function () {
        return (m =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      b = (function () {
        function t(t) {
          var e = f({}, v, this.validate(t));
          this.options = this.convertToFilterizrOptions(e);
        }
        return (
          Object.defineProperty(t.prototype, "isSpinnerEnabled", {
            get: function () {
              return this.options.spinner.enabled;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "areControlsEnabled", {
            get: function () {
              return this.options.setupControls;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "controlsSelector", {
            get: function () {
              return this.options.controlsSelector;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "filter", {
            get: function () {
              return this.options.filter.get();
            },
            set: function (t) {
              this.options.filter.set(t);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.toggleFilter = function (t) {
            this.options.filter.toggle(t);
          }),
          Object.defineProperty(t.prototype, "searchTerm", {
            get: function () {
              return this.options.searchTerm;
            },
            set: function (t) {
              this.options.searchTerm = t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.get = function () {
            return this.options;
          }),
          (t.prototype.getRaw = function () {
            return this.convertToOptions(this.options);
          }),
          (t.prototype.set = function (t) {
            var e = f(
              {},
              this.convertToOptions(this.options),
              this.validate(t)
            );
            this.options = this.convertToFilterizrOptions(e);
          }),
          (t.prototype.convertToFilterizrOptions = function (t) {
            return m({}, t, { filter: new g(t.filter) });
          }),
          (t.prototype.convertToOptions = function (t) {
            return m({}, t, { filter: t.filter.get() });
          }),
          (t.prototype.validate = function (t) {
            return (
              s("animationDuration", t.animationDuration, "number"),
              s("callbacks", t.callbacks, "object"),
              s("controlsSelector", t.controlsSelector, "string"),
              s("delay", t.delay, "number"),
              s(
                "easing",
                t.easing,
                "string",
                o,
                "https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp"
              ),
              s("delayMode", t.delayMode, "string", [
                "progressive",
                "alternate",
              ]),
              s("filter", t.filter, "string|number|array"),
              s("filterOutCss", t.filterOutCss, "object"),
              s("filterInCss", t.filterOutCss, "object"),
              s("gridItemsSelector", t.gridItemsSelector, "string"),
              s("gutterPixels", t.gutterPixels, "number"),
              s("layout", t.layout, "string", Object.values(i)),
              s(
                "multifilterLogicalOperator",
                t.multifilterLogicalOperator,
                "string",
                ["and", "or"]
              ),
              s("searchTerm", t.searchTerm, "string"),
              s("setupControls", t.setupControls, "boolean"),
              t
            );
          }),
          t
        );
      })(),
      w = (function () {
        function t(t, e) {
          void 0 === e && (e = ""),
            (this.filterizr = t),
            (this.selector = e),
            (this.filterControls = new y(
              document.querySelectorAll(e + "[data-filter]")
            )),
            (this.multiFilterControls = new y(
              document.querySelectorAll(e + "[data-multifilter]")
            )),
            (this.shuffleControls = new y(
              document.querySelectorAll(e + "[data-shuffle]")
            )),
            (this.searchControls = new y(
              document.querySelectorAll(e + "[data-search]")
            )),
            (this.sortAscControls = new y(
              document.querySelectorAll(e + "[data-sortAsc]")
            )),
            (this.sortDescControls = new y(
              document.querySelectorAll(e + "[data-sortDesc]")
            )),
            this.initialize();
        }
        return (
          (t.prototype.destroy = function () {
            this.filterControls.destroy(),
              this.multiFilterControls.destroy(),
              this.shuffleControls.destroy(),
              this.searchControls.destroy(),
              this.sortAscControls.destroy(),
              this.sortDescControls.destroy();
          }),
          (t.prototype.initialize = function () {
            var t = this.filterizr,
              e = this.selector;
            this.filterControls.on("click", function (e) {
              var n = e.currentTarget.getAttribute("data-filter");
              t.filter(n);
            }),
              this.multiFilterControls.on("click", function (e) {
                var n = e.target.getAttribute("data-multifilter");
                t.toggleFilter(n);
              }),
              this.shuffleControls.on("click", t.shuffle.bind(t)),
              this.searchControls.on(
                "keyup",
                a(
                  function (e) {
                    var n = e.target.value;
                    t.search(n);
                  },
                  250,
                  !1
                )
              ),
              this.sortAscControls.on("click", function () {
                var n = document.querySelector(e + "[data-sortOrder]").value;
                t.sort(n, "asc");
              }),
              this.sortDescControls.on("click", function () {
                var n = document.querySelector(e + "[data-sortOrder]").value;
                t.sort(n, "desc");
              });
          }),
          t
        );
      })(),
      E = (function () {
        function t(t, e) {
          (this.node = t),
            (this.options = e),
            (this.eventReceiver = new y(this.node));
        }
        return (
          Object.defineProperty(t.prototype, "dimensions", {
            get: function () {
              return {
                width: this.node.clientWidth,
                height: this.node.clientHeight,
              };
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.destroy = function () {
            this.styles.destroy();
          }),
          (t.prototype.trigger = function (t) {
            var e = new Event(t);
            this.node.dispatchEvent(e);
          }),
          t
        );
      })();
    function I(t, e) {
      var n = e.get(),
        r = n.delay;
      return "progressive" === n.delayMode ? r * t : t % 2 == 0 ? r : 0;
    }
    var S,
      O = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      x = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      _ = (function () {
        function t() {}
        return (
          (t.animate = function (e, n) {
            return O(this, void 0, void 0, function () {
              return x(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      t.process({
                        node: e,
                        targetStyles: n,
                        eventReceiver: new y(e),
                      }),
                    ];
                  case 1:
                    return r.sent(), [2];
                }
              });
            });
          }),
          (t.process = function (t) {
            return O(this, void 0, void 0, function () {
              return x(this, function (e) {
                return [
                  2,
                  new Promise(function (e) {
                    t.eventReceiver.on("transitionend", function () {
                      t.eventReceiver.destroy(), e();
                    }),
                      setTimeout(function () {
                        p(t.node, t.targetStyles);
                      }, 10);
                  }),
                ];
              });
            });
          }),
          t
        );
      })().animate,
      k = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      C = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      A = (function () {
        function t(t, e) {
          (this.node = t), (this.options = e);
        }
        return (
          (t.prototype.destroy = function () {
            this.node.removeAttribute("style");
          }),
          (t.prototype.animate = function (t) {
            return k(this, void 0, void 0, function () {
              return C(this, function (e) {
                return _(this.node, t), [2];
              });
            });
          }),
          (t.prototype.set = function (t) {
            p(this.node, t);
          }),
          (t.prototype.remove = function (t) {
            this.node.style.removeProperty(t);
          }),
          t
        );
      })(),
      T =
        ((S = function (t, e) {
          return (S =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(t, e);
        }),
        function (t, e) {
          function n() {
            this.constructor = t;
          }
          S(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((n.prototype = e.prototype), new n()));
        }),
      j = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      P = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      F = n(1),
      L = (function (t) {
        function e(e, n, r) {
          var i = t.call(this, e, r) || this;
          return (i._index = n), i;
        }
        return (
          T(e, t),
          (e.prototype.initialize = function () {
            var t;
            this.set(
              ((t = this.options),
              Object.assign({}, t.get().filterOutCss, {
                "-webkit-backface-visibility": "hidden",
                perspective: "1000px",
                "-webkit-perspective": "1000px",
                "-webkit-transform-style": "preserve-3d",
                position: "absolute",
              }))
            );
          }),
          (e.prototype.setFilteredStyles = function (t, e) {
            this.set(
              (function (t, e) {
                return Object.assign({}, e, {
                  transform:
                    (e.transform || "") +
                    " translate3d(" +
                    t.left +
                    "px, " +
                    t.top +
                    "px, 0)",
                });
              })(t, e)
            );
          }),
          (e.prototype.updateTransitionStyle = function () {
            var t, e, n;
            this.set(
              ((t = this._index),
              (e = this.options),
              {
                transition:
                  "all " +
                  (n = e.get()).animationDuration +
                  "s " +
                  n.easing +
                  " " +
                  I(t, e) +
                  "ms, width 1ms",
              })
            );
          }),
          (e.prototype.updateWidth = function () {
            var t = this.options.get().gutterPixels,
              e = this.node.parentElement.clientWidth,
              n = this.node.clientWidth,
              r = n - t * (1 / Math.floor(e / n) + 1) + "px";
            this.set({ width: r });
          }),
          (e.prototype.enableTransitions = function () {
            return j(this, void 0, void 0, function () {
              var t = this;
              return P(this, function (e) {
                return [
                  2,
                  new Promise(function (e) {
                    !!t.node.querySelectorAll("img").length
                      ? F(t.node, function () {
                          setTimeout(function () {
                            t.updateTransitionStyle(), e();
                          }, 10);
                        })
                      : setTimeout(function () {
                          t.updateTransitionStyle(), e();
                        }, 10);
                  }),
                ];
              });
            });
          }),
          (e.prototype.disableTransitions = function () {
            this.remove("transition");
          }),
          (e.prototype.setZIndex = function (t) {
            this.set({ "z-index": t });
          }),
          (e.prototype.removeZIndex = function () {
            this.remove("z-index");
          }),
          (e.prototype.removeWidth = function () {
            this.remove("width");
          }),
          (e.prototype.setHidden = function () {
            this.set({ display: "none" });
          }),
          (e.prototype.setVisible = function () {
            this.remove("display");
          }),
          e
        );
      })(A),
      z = (function () {
        var t = function (e, n) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(e, n);
        };
        return function (e, n) {
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      D = function () {
        return (D =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      N = (function (t) {
        function e(e, n, r) {
          var i = t.call(this, e, r) || this;
          return (
            (i.filteredOut = !1),
            (i.lastPosition = { left: 0, top: 0 }),
            (i.sortData = D(
              {},
              (function (t) {
                for (
                  var e = { category: "", sort: "" },
                    n = 0,
                    r = t.attributes,
                    i = r.length;
                  n < i;
                  n++
                ) {
                  var o = r[n],
                    s = o.nodeName,
                    a = o.nodeValue;
                  s.includes("data") && (e[s.slice(5, s.length)] = a);
                }
                return delete e.category, delete e.sort, e;
              })(e),
              { index: n, sortData: e.getAttribute("data-sort") }
            )),
            (i.styledNode = new L(e, n, r)),
            i.styles.initialize(),
            i.bindEvents(),
            i
          );
        }
        return (
          z(e, t),
          Object.defineProperty(e.prototype, "styles", {
            get: function () {
              return this.styledNode;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.destroy = function () {
            t.prototype.destroy.call(this), this.unbindEvents();
          }),
          (e.prototype.filterIn = function (t) {
            var e = this.options.get().filterInCss;
            this.styles.setFilteredStyles(t, e),
              (this.lastPosition = t),
              (this.filteredOut = !1);
          }),
          (e.prototype.filterOut = function () {
            var t = this.options.get().filterOutCss;
            this.styles.setFilteredStyles(this.lastPosition, t),
              (this.filteredOut = !0);
          }),
          (e.prototype.contentsMatchSearch = function (t) {
            return this.node.textContent.toLowerCase().includes(t);
          }),
          (e.prototype.getCategories = function () {
            return this.node.getAttribute("data-category").split(/\s*,\s*/g);
          }),
          (e.prototype.getSortAttribute = function (t) {
            return this.sortData[t];
          }),
          (e.prototype.bindEvents = function () {
            var t = this;
            this.eventReceiver.on("transitionend", function () {
              t.filteredOut
                ? (t.node.classList.add("filteredOut"),
                  t.styles.setZIndex(-1e3),
                  t.styles.setHidden())
                : (t.node.classList.remove("filteredOut"),
                  t.styles.removeZIndex());
            });
          }),
          (e.prototype.unbindEvents = function () {
            this.eventReceiver.off("transitionend");
          }),
          e
        );
      })(E),
      M = function () {},
      R = (function () {
        var t = function (e, n) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(e, n);
        };
        return function (e, n) {
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      H = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      W = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      q = (function (t) {
        function e(e) {
          var n = t.call(this) || this;
          return (
            (n._filterItems = e.map(function (t) {
              return t.styles;
            })),
            n
          );
        }
        return (
          R(e, t),
          (e.prototype.resetDisplay = function () {
            this._filterItems.forEach(function (t) {
              return t.setVisible();
            });
          }),
          (e.prototype.removeWidth = function () {
            this._filterItems.forEach(function (t) {
              return t.removeWidth();
            });
          }),
          (e.prototype.updateWidth = function () {
            this._filterItems.forEach(function (t) {
              return t.updateWidth();
            });
          }),
          (e.prototype.updateTransitionStyle = function () {
            this._filterItems.forEach(function (t) {
              return t.updateTransitionStyle();
            });
          }),
          (e.prototype.disableTransitions = function () {
            this._filterItems.forEach(function (t) {
              return t.disableTransitions();
            });
          }),
          (e.prototype.enableTransitions = function () {
            return H(this, void 0, void 0, function () {
              var t = this;
              return W(this, function (e) {
                return (
                  this._filterItems.forEach(function (e) {
                    return H(t, void 0, void 0, function () {
                      return W(this, function (t) {
                        switch (t.label) {
                          case 0:
                            return [4, e.enableTransitions()];
                          case 1:
                            return [2, t.sent()];
                        }
                      });
                    });
                  }),
                  [2]
                );
              });
            });
          }),
          (e.prototype.updateWidthWithTransitionsDisabled = function () {
            this.disableTransitions(),
              this.removeWidth(),
              this.updateWidth(),
              this.enableTransitions();
          }),
          e
        );
      })(M),
      G = (function () {
        function t(t, e) {
          (this.filterItems = t),
            (this.styledFilterItems = new q(t)),
            (this.options = e);
        }
        return (
          Object.defineProperty(t.prototype, "styles", {
            get: function () {
              return this.styledFilterItems;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "length", {
            get: function () {
              return this.filterItems.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.getItem = function (t) {
            return this.filterItems[t];
          }),
          (t.prototype.destroy = function () {
            this.filterItems.forEach(function (t) {
              return t.destroy();
            });
          }),
          (t.prototype.push = function (t) {
            return this.filterItems.push(t);
          }),
          (t.prototype.remove = function (t) {
            this.filterItems = this.filterItems.filter(function (e) {
              return e.node !== t;
            });
          }),
          (t.prototype.getFiltered = function (t) {
            var e = this,
              n = this.options.searchTerm,
              r = this.search(this.filterItems, n);
            return "all" === t
              ? r
              : r.filter(function (n) {
                  return e.shouldBeFiltered(n.getCategories(), t);
                });
          }),
          (t.prototype.getFilteredOut = function (t) {
            var e = this,
              n = this.options.searchTerm;
            return this.filterItems.filter(function (r) {
              var i = r.getCategories(),
                o = e.shouldBeFiltered(i, t),
                s = r.contentsMatchSearch(n);
              return !o || !s;
            });
          }),
          (t.prototype.sort = function (t, e) {
            void 0 === t && (t = "index"), void 0 === e && (e = "asc");
            var n,
              r,
              i =
                ((n = this.filterItems),
                (r = function (e) {
                  return e.getSortAttribute(t);
                }),
                n.slice(0).sort(
                  (function (t) {
                    return function (e, n) {
                      var r = t(e),
                        i = t(n);
                      return r < i ? -1 : r > i ? 1 : 0;
                    };
                  })(r)
                )),
              o = "asc" === e ? i : i.reverse();
            this.filterItems = o;
          }),
          (t.prototype.shuffle = function () {
            var t = this,
              e = this.getFiltered(this.options.filter);
            if (e.length > 1) {
              var n = this.getFiltered(this.options.filter)
                  .map(function (e) {
                    return t.filterItems.indexOf(e);
                  })
                  .slice(),
                r = void 0;
              do {
                r = d(e);
              } while (u(e, r));
              (r = d(e)).forEach(function (e, r) {
                var i,
                  o = n[r];
                t.filterItems = Object.assign(
                  [],
                  t.filterItems,
                  (((i = {})[o] = e), i)
                );
              });
            }
          }),
          (t.prototype.search = function (t, e) {
            return e
              ? t.filter(function (t) {
                  return t.contentsMatchSearch(e);
                })
              : t;
          }),
          (t.prototype.shouldBeFiltered = function (t, e) {
            var n,
              r,
              i = this.options.getRaw().multifilterLogicalOperator;
            return Array.isArray(e)
              ? "or" === i
                ? !!((n = t),
                  (r = e),
                  Array.prototype.filter.call(n, function (t) {
                    return r.includes(t);
                  })).length
                : (function (t, e) {
                    return t.reduce(function (t, n) {
                      return t && e.includes(n);
                    }, !0);
                  })(e, t)
              : t.includes(e);
          }),
          t
        );
      })(),
      B = function () {
        return (B =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      Z = function (t) {
        return { padding: t.get().gutterPixels + "px" };
      },
      $ = (function () {
        var t = function (e, n) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(e, n);
        };
        return function (e, n) {
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      Q = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          $(e, t),
          (e.prototype.initialize = function () {
            var t;
            this.set(
              ((t = this.options),
              B({}, Z(t), {
                position: "relative",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
              }))
            );
          }),
          (e.prototype.updatePaddings = function () {
            this.set(Z(this.options));
          }),
          (e.prototype.setHeight = function (t) {
            this.set({ height: t + "px" });
          }),
          e
        );
      })(A),
      V = (function () {
        var t = function (e, n) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(e, n);
        };
        return function (e, n) {
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      J = (function (t) {
        function e(e, n) {
          var i = this;
          if (!e)
            throw new Error(
              "Filterizr: could not initialize container, check the selector or node you passed to the constructor exists."
            );
          return (
            ((i = t.call(this, e, n) || this).styledNode = new Q(e, n)),
            (i._filterizrState = r.IDLE),
            i.styles.initialize(),
            (i.filterItems = i.makeFilterItems(i.options)),
            i.bindEvents(),
            i
          );
        }
        return (
          V(e, t),
          Object.defineProperty(e.prototype, "styles", {
            get: function () {
              return this.styledNode;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "filterizrState", {
            set: function (t) {
              this._filterizrState = t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.destroy = function () {
            t.prototype.destroy.call(this),
              this.unbindEvents(),
              this.filterItems.destroy();
          }),
          (e.prototype.makeFilterItems = function (t) {
            var e = Array.from(
                this.node.querySelectorAll(t.get().gridItemsSelector)
              ).map(function (e, n) {
                return new N(e, n, t);
              }),
              n = new G(e, t);
            if (!n.length)
              throw new Error(
                "Filterizr: cannot initialize empty container. Make sure the gridItemsSelector option corresponds to the selector of your grid's items"
              );
            return n.styles.updateWidth(), n;
          }),
          (e.prototype.insertItem = function (t) {
            var e = t.cloneNode(!0);
            e.removeAttribute("style"), this.node.appendChild(e);
            var n = new N(e, this.filterItems.length, this.options);
            n.styles.enableTransitions(),
              n.styles.updateWidth(),
              this.filterItems.push(n);
          }),
          (e.prototype.removeItem = function (t) {
            this.filterItems.remove(t), this.node.removeChild(t);
          }),
          (e.prototype.setHeight = function (t) {
            (this.dimensions.height = t), this.styles.setHeight(t);
          }),
          (e.prototype.bindEvents = function () {
            var t = this,
              e = this.options.get(),
              n = e.animationDuration,
              i = e.callbacks,
              o = e.delay,
              s = e.delayMode,
              u = e.gridItemsSelector,
              c = "progressive" === s ? o * this.filterItems.length : o;
            this.eventReceiver.on(
              "transitionend",
              a(
                function (e) {
                  if (
                    Array.from(e.target.classList).reduce(function (t, e) {
                      return t || u.includes(e);
                    }, !1)
                  ) {
                    switch (t._filterizrState) {
                      case r.FILTERING:
                        t.trigger("filteringEnd");
                        break;
                      case r.SORTING:
                        t.trigger("sortingEnd");
                        break;
                      case r.SHUFFLING:
                        t.trigger("shufflingEnd");
                    }
                    t.filterizrState = r.IDLE;
                  }
                },
                100 * n + c,
                !1
              )
            ),
              this.eventReceiver.on("init", i.onInit),
              this.eventReceiver.on("filteringStart", i.onFilteringStart),
              this.eventReceiver.on("filteringEnd", i.onFilteringEnd),
              this.eventReceiver.on("shufflingStart", i.onShufflingStart),
              this.eventReceiver.on("shufflingEnd", i.onShufflingEnd),
              this.eventReceiver.on("sortingStart", i.onSortingStart),
              this.eventReceiver.on("sortingEnd", i.onSortingEnd);
          }),
          (e.prototype.unbindEvents = function () {
            this.eventReceiver.off("transitionend"),
              this.eventReceiver.off("init"),
              this.eventReceiver.off("filteringStart"),
              this.eventReceiver.off("filteringEnd"),
              this.eventReceiver.off("shufflingStart"),
              this.eventReceiver.off("shufflingEnd"),
              this.eventReceiver.off("sortingStart"),
              this.eventReceiver.off("sortingEnd");
          }),
          e
        );
      })(E);
    var U = (function () {
        var t = function (e, n) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(e, n);
        };
        return function (e, n) {
          function r() {
            this.constructor = e;
          }
          t(e, n),
            (e.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      K = function () {
        return (K =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      X = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      Y = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      tt = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          U(e, t),
          (e.prototype.initialize = function () {
            var t = this.options.get().spinner.styles;
            this.set(
              K({}, t, { opacity: 1, transition: "all ease-out 500ms" })
            );
          }),
          (e.prototype.fadeOut = function () {
            return X(this, void 0, void 0, function () {
              return Y(this, function (t) {
                switch (t.label) {
                  case 0:
                    return [4, this.animate({ opacity: 0 })];
                  case 1:
                    return t.sent(), [2];
                }
              });
            });
          }),
          e
        );
      })(A),
      et = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      nt = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      rt = (function () {
        function t(t, e) {
          var n, r, i;
          (this.filterContainer = t),
            (this.node =
              ((n = e.get().spinner),
              (r =
                '<?xml version="1.0" encoding="UTF-8"?><svg stroke="' +
                n.fillColor +
                '" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>'),
              (i = document.createElement("img")).classList.add(
                "Filterizr__spinner"
              ),
              (i.src = "data:image/svg+xml;base64," + window.btoa(r)),
              (i.alt = "Spinner"),
              i)),
            (this.styledNode = new tt(this.node, e)),
            this.initialize();
        }
        return (
          Object.defineProperty(t.prototype, "styles", {
            get: function () {
              return this.styledNode;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.destroy = function () {
            return et(this, void 0, void 0, function () {
              return nt(this, function (t) {
                switch (t.label) {
                  case 0:
                    return [4, this.styles.fadeOut()];
                  case 1:
                    return (
                      t.sent(),
                      this.filterContainer.node.removeChild(this.node),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.initialize = function () {
            this.styles.initialize(),
              this.filterContainer.node.appendChild(this.node);
          }),
          t
        );
      })(),
      it = n(2),
      ot = n.n(it);
    function st(t, e) {
      return t.reduce(function (t, n) {
        return t + n.width + e;
      }, 0);
    }
    function at(t, e) {
      return t.length
        ? t.reduce(function (t, n) {
            return t + n.height + e;
          }, 0)
        : 0;
    }
    var ut = function () {
        return (ut =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      ct = (function () {
        function t(t) {
          this.init(t);
        }
        return (
          (t.prototype.init = function (t) {
            this.root = { x: 0, y: 0, w: t };
          }),
          (t.prototype.fit = function (t) {
            var e,
              n,
              r,
              i = t.length,
              o = i > 0 ? t[0].h : 0;
            for (this.root.h = o, e = 0; e < i; e++)
              (r = t[e]),
                (n = this.findNode(this.root, r.w, r.h))
                  ? (r.fit = this.splitNode(n, r.w, r.h))
                  : (r.fit = this.growDown(r.w, r.h));
          }),
          (t.prototype.findNode = function (t, e, n) {
            return t.used
              ? this.findNode(t.right, e, n) || this.findNode(t.down, e, n)
              : e <= t.w && n <= t.h
              ? t
              : null;
          }),
          (t.prototype.splitNode = function (t, e, n) {
            return (
              (t.used = !0),
              (t.down = { x: t.x, y: t.y + n, w: t.w, h: t.h - n }),
              (t.right = { x: t.x + e, y: t.y, w: t.w - e, h: n }),
              t
            );
          }),
          (t.prototype.growDown = function (t, e) {
            var n;
            return (
              (this.root = {
                used: !0,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + e,
                down: { x: 0, y: this.root.h, w: this.root.w, h: e },
                right: this.root,
              }),
              (n = this.findNode(this.root, t, e))
                ? this.splitNode(n, t, e)
                : null
            );
          }),
          t
        );
      })(),
      lt = ot()(function (t, e, n) {
        var r = n.gutterPixels,
          o = n.layout;
        if (!e.length) return { containerHeight: 0, itemsPositions: [] };
        switch (o) {
          case i.HORIZONTAL:
            return (function (t, e) {
              return {
                containerHeight:
                  Math.max.apply(
                    Math,
                    t.map(function (t) {
                      return t.height;
                    })
                  ) +
                  2 * e,
                itemsPositions: t.map(function (n, r) {
                  return { left: st(t.slice(0, r), e), top: 0 };
                }),
              };
            })(e, r);
          case i.VERTICAL:
            return (function (t, e) {
              return {
                containerHeight: at(t, e) + e,
                itemsPositions: t.map(function (n, r) {
                  return { left: 0, top: at(t.slice(0, r), e) };
                }),
              };
            })(e, r);
          case i.SAME_HEIGHT:
            return (function (t, e, n) {
              var r = e.map(function (t, r) {
                  var i = t.width;
                  return (
                    e.slice(0, r).reduce(function (t, e) {
                      return t + e.width + 2 * n;
                    }, 0) +
                    i +
                    n
                  );
                }),
                i = r.reduce(
                  function (e, n, r) {
                    var i,
                      o = Object.keys(e).length;
                    return ut({}, e, n > t * o && (((i = {})[o] = r), i));
                  },
                  { 0: 0 }
                ),
                o = e.map(function (o, s) {
                  var a = o.height,
                    u = Math.floor(r[s] / t);
                  return {
                    left: e.slice(i[u], s).reduce(function (t, e) {
                      return t + e.width + n;
                    }, 0),
                    top: (a + n) * u,
                  };
                });
              return {
                containerHeight: Object.keys(i).length * (e[0].height + n) + n,
                itemsPositions: o,
              };
            })(t, e, r);
          case i.SAME_WIDTH:
            return (function (t, e, n) {
              var r = Math.floor(t / (e[0].width + n)),
                i = e.map(function (t, i) {
                  var o = t.width,
                    s = Math.floor(i / r);
                  return {
                    left: (i - r * s) * (o + n),
                    top: e
                      .slice(0, i)
                      .filter(function (t, e) {
                        return (i - e) % r == 0;
                      })
                      .reduce(function (t, e) {
                        return t + e.height + n;
                      }, 0),
                  };
                }),
                o = e.reduce(function (t, e, i) {
                  var o = e.height,
                    s = Math.floor(i / r);
                  return (t[i - r * s] += o + n), t;
                }, Array.apply(null, Array(r)).map(
                  Number.prototype.valueOf,
                  0
                ));
              return {
                containerHeight: Math.max.apply(Math, o) + n,
                itemsPositions: i,
              };
            })(t, e, r);
          case i.PACKED:
            return (function (t, e, n) {
              var r = new ct(t),
                i = e.map(function (t) {
                  var e = t.width,
                    r = t.height;
                  return { w: e + n, h: r + n };
                });
              r.fit(i);
              var o = i.map(function (t) {
                var e = t.fit;
                return { left: e.x, top: e.y };
              });
              return { containerHeight: r.root.h + n, itemsPositions: o };
            })(t, e, r);
          case i.SAME_SIZE:
          default:
            return (function (t, e, n) {
              var r = Math.floor(t / (e[0].width + n)),
                i = e.map(function (t, e) {
                  var i = t.width,
                    o = t.height,
                    s = Math.floor(e / r);
                  return { left: (e - r * s) * (i + n), top: s * (o + n) };
                });
              return {
                containerHeight:
                  Math.ceil(e.length / r) * (e[0].height + n) + n,
                itemsPositions: i,
              };
            })(t, e, r);
        }
      });
    function ft(t) {
      if (!t)
        throw new Error(
          "Filterizr as a jQuery plugin, requires jQuery to work. If you would prefer to use the vanilla JS version, please use the correct bundle file."
        );
      t.fn.filterizr = function () {
        var e = "." + t.trim(this.get(0).className).replace(/\s+/g, "."),
          n = arguments;
        if (
          (!this._fltr && 0 === n.length) ||
          (1 === n.length && "object" == typeof n[0])
        ) {
          var r = n.length > 0 ? n[0] : v;
          this._fltr = new yt(e, r);
        } else if (n.length >= 1 && "string" == typeof n[0]) {
          var i = n[0],
            o = Array.prototype.slice.call(n, 1),
            s = this._fltr;
          switch (i) {
            case "filter":
              return s.filter.apply(s, o), this;
            case "insertItem":
              return s.insertItem.apply(s, o), this;
            case "removeItem":
              return s.removeItem.apply(s, o), this;
            case "toggleFilter":
              return s.toggleFilter.apply(s, o), this;
            case "sort":
              return s.sort.apply(s, o), this;
            case "shuffle":
              return s.shuffle.apply(s, o), this;
            case "search":
              return s.search.apply(s, o), this;
            case "setOptions":
              return s.setOptions.apply(s, o), this;
            case "destroy":
              return s.destroy.apply(s, o), delete this._fltr, this;
            default:
              throw new Error(
                "Filterizr: " +
                  i +
                  " is not part of the Filterizr API. Please refer to the docs for more information."
              );
          }
        }
        return this;
      };
    }
    var ht = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            t.done
              ? i(t.value)
              : new n(function (e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      },
      pt = function (t, e) {
        var n,
          r,
          i,
          o,
          s = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          "function" == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return s.label++, { value: o[1], done: !1 };
                    case 5:
                      s.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        s.label = o[1];
                        break;
                      }
                      if (6 === o[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = o);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(o);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  o = e.call(t, s);
                } catch (t) {
                  (o = [6, t]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      },
      dt = n(1),
      yt = (function () {
        function t(t, e) {
          void 0 === t && (t = ".filtr-container"),
            void 0 === e && (e = {}),
            (this.options = new b(e));
          var n = this.options,
            r = n.areControlsEnabled,
            i = n.controlsSelector,
            o = n.isSpinnerEnabled;
          (this.windowEventReceiver = new y(window)),
            (this.filterContainer = new J(c(t), this.options)),
            (this.imagesHaveLoaded =
              !this.filterContainer.node.querySelectorAll("img").length),
            r && (this.filterControls = new w(this, i)),
            o && (this.spinner = new rt(this.filterContainer, this.options)),
            this.initialize();
        }
        return (
          Object.defineProperty(t.prototype, "filterItems", {
            get: function () {
              return this.filterContainer.filterItems;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.filter = function (t) {
            var e = this.filterContainer;
            e.trigger("filteringStart"),
              (e.filterizrState = r.FILTERING),
              (t = Array.isArray(t)
                ? t.map(function (t) {
                    return t.toString();
                  })
                : t.toString()),
              (this.options.filter = t),
              this.render();
          }),
          (t.prototype.destroy = function () {
            var t = this.windowEventReceiver,
              e = this.filterControls;
            this.filterContainer.destroy(),
              t.destroy(),
              this.options.areControlsEnabled && e && e.destroy();
          }),
          (t.prototype.insertItem = function (t) {
            return ht(this, void 0, void 0, function () {
              return pt(this, function (e) {
                switch (e.label) {
                  case 0:
                    return (
                      this.filterContainer.insertItem(t),
                      [4, this.waitForImagesToLoad()]
                    );
                  case 1:
                    return e.sent(), this.render(), [2];
                }
              });
            });
          }),
          (t.prototype.removeItem = function (t) {
            this.filterContainer.removeItem(t), this.render();
          }),
          (t.prototype.sort = function (t, e) {
            void 0 === t && (t = "index"), void 0 === e && (e = "asc");
            var n = this.filterContainer,
              i = this.filterItems;
            n.trigger("sortingStart"),
              (n.filterizrState = r.SORTING),
              i.sort(t, e),
              this.render();
          }),
          (t.prototype.search = function (t) {
            void 0 === t && (t = this.options.get().searchTerm),
              (this.options.searchTerm = t.toLowerCase()),
              this.render();
          }),
          (t.prototype.shuffle = function () {
            var t = this.filterContainer,
              e = this.filterItems;
            t.trigger("shufflingStart"),
              (t.filterizrState = r.SHUFFLING),
              e.shuffle(),
              this.render();
          }),
          (t.prototype.setOptions = function (t) {
            var e = this.filterContainer,
              n = this.filterItems,
              r = "animationDuration" in t || "delay" in t || "delayMode" in t;
            (t.callbacks || r) && e.unbindEvents(),
              this.options.set(t),
              (t.easing || r) && n.styles.updateTransitionStyle(),
              (t.callbacks || r) && e.bindEvents(),
              "searchTerm" in t && this.search(t.searchTerm),
              ("filter" in t ||
                "multifilterLomultifilterLogicalOperator" in t) &&
                this.filter(this.options.filter),
              "gutterPixels" in t &&
                (this.filterContainer.styles.updatePaddings(),
                this.filterItems.styles.updateWidthWithTransitionsDisabled(),
                this.render());
          }),
          (t.prototype.toggleFilter = function (t) {
            this.options.toggleFilter(t), this.filter(this.options.filter);
          }),
          (t.prototype.render = function () {
            var t = this.filterContainer,
              e = this.filterItems,
              n = this.options,
              r = e.getFiltered(n.filter);
            e.styles.resetDisplay(),
              e.getFilteredOut(n.filter).forEach(function (t) {
                t.filterOut();
              });
            var i = lt(
                t.dimensions.width,
                r.map(function (t) {
                  return t.dimensions;
                }),
                this.options.get()
              ),
              o = i.containerHeight,
              s = i.itemsPositions;
            t.setHeight(o),
              r.forEach(function (t, e) {
                t.filterIn(s[e]);
              });
          }),
          (t.prototype.initialize = function () {
            return ht(this, void 0, void 0, function () {
              var t, e, n, r;
              return pt(this, function (i) {
                switch (i.label) {
                  case 0:
                    return (
                      (e = (t = this).filterContainer),
                      (n = t.filterItems),
                      (r = t.spinner),
                      this.bindEvents(),
                      [4, this.waitForImagesToLoad()]
                    );
                  case 1:
                    return (
                      i.sent(),
                      this.options.isSpinnerEnabled ? [4, r.destroy()] : [3, 3]
                    );
                  case 2:
                    i.sent(), (i.label = 3);
                  case 3:
                    return this.render(), [4, n.styles.enableTransitions()];
                  case 4:
                    return i.sent(), e.trigger("init"), [2];
                }
              });
            });
          }),
          (t.prototype.bindEvents = function () {
            var t = this,
              e = this.filterItems;
            this.windowEventReceiver.on(
              "resize",
              a(
                function () {
                  e.styles.updateWidthWithTransitionsDisabled(), t.render();
                },
                50,
                !1
              )
            );
          }),
          (t.prototype.waitForImagesToLoad = function () {
            return ht(this, void 0, void 0, function () {
              var t,
                e,
                n,
                r = this;
              return pt(this, function (i) {
                return (
                  (e = (t = this).imagesHaveLoaded),
                  (n = t.filterContainer),
                  e
                    ? [2, Promise.resolve()]
                    : [
                        2,
                        new Promise(function (t) {
                          dt(n.node, function () {
                            (r.imagesHaveLoaded = !0), t();
                          });
                        }),
                      ]
                );
              });
            });
          }),
          (t.FilterContainer = J),
          (t.FilterItem = N),
          (t.defaultOptions = v),
          (t.installAsJQueryPlugin = ft),
          t
        );
      })();
    n.d(e, "a", function () {
      return yt;
    });
  },
  function (t, e, n) {
    var r, i;
    /*!
     * imagesLoaded v4.1.4
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    /*!
     * imagesLoaded v4.1.4
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    !(function (o, s) {
      "use strict";
      (r = [n(3)]),
        void 0 ===
          (i = function (t) {
            return (function (t, e) {
              var n = t.jQuery,
                r = t.console;
              function i(t, e) {
                for (var n in e) t[n] = e[n];
                return t;
              }
              var o = Array.prototype.slice;
              function s(t, e, a) {
                if (!(this instanceof s)) return new s(t, e, a);
                var u = t;
                "string" == typeof t && (u = document.querySelectorAll(t)),
                  u
                    ? ((this.elements = (function (t) {
                        if (Array.isArray(t)) return t;
                        if ("object" == typeof t && "number" == typeof t.length)
                          return o.call(t);
                        return [t];
                      })(u)),
                      (this.options = i({}, this.options)),
                      "function" == typeof e ? (a = e) : i(this.options, e),
                      a && this.on("always", a),
                      this.getImages(),
                      n && (this.jqDeferred = new n.Deferred()),
                      setTimeout(this.check.bind(this)))
                    : r.error("Bad element for imagesLoaded " + (u || t));
              }
              (s.prototype = Object.create(e.prototype)),
                (s.prototype.options = {}),
                (s.prototype.getImages = function () {
                  (this.images = []),
                    this.elements.forEach(this.addElementImages, this);
                }),
                (s.prototype.addElementImages = function (t) {
                  "IMG" == t.nodeName && this.addImage(t),
                    !0 === this.options.background &&
                      this.addElementBackgroundImages(t);
                  var e = t.nodeType;
                  if (e && a[e]) {
                    for (
                      var n = t.querySelectorAll("img"), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var i = n[r];
                      this.addImage(i);
                    }
                    if ("string" == typeof this.options.background) {
                      var o = t.querySelectorAll(this.options.background);
                      for (r = 0; r < o.length; r++) {
                        var s = o[r];
                        this.addElementBackgroundImages(s);
                      }
                    }
                  }
                });
              var a = { 1: !0, 9: !0, 11: !0 };
              function u(t) {
                this.img = t;
              }
              function c(t, e) {
                (this.url = t), (this.element = e), (this.img = new Image());
              }
              return (
                (s.prototype.addElementBackgroundImages = function (t) {
                  var e = getComputedStyle(t);
                  if (e)
                    for (
                      var n = /url\((['"])?(.*?)\1\)/gi,
                        r = n.exec(e.backgroundImage);
                      null !== r;

                    ) {
                      var i = r && r[2];
                      i && this.addBackground(i, t),
                        (r = n.exec(e.backgroundImage));
                    }
                }),
                (s.prototype.addImage = function (t) {
                  var e = new u(t);
                  this.images.push(e);
                }),
                (s.prototype.addBackground = function (t, e) {
                  var n = new c(t, e);
                  this.images.push(n);
                }),
                (s.prototype.check = function () {
                  var t = this;
                  function e(e, n, r) {
                    setTimeout(function () {
                      t.progress(e, n, r);
                    });
                  }
                  (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                      ? this.images.forEach(function (t) {
                          t.once("progress", e), t.check();
                        })
                      : this.complete();
                }),
                (s.prototype.progress = function (t, e, n) {
                  this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred &&
                      this.jqDeferred.notify &&
                      this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length &&
                      this.complete(),
                    this.options.debug && r && r.log("progress: " + n, t, e);
                }),
                (s.prototype.complete = function () {
                  var t = this.hasAnyBroken ? "fail" : "done";
                  if (
                    ((this.isComplete = !0),
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred)
                  ) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                  }
                }),
                (u.prototype = Object.create(e.prototype)),
                (u.prototype.check = function () {
                  this.getIsImageComplete()
                    ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      (this.proxyImage.src = this.img.src));
                }),
                (u.prototype.getIsImageComplete = function () {
                  return this.img.complete && this.img.naturalWidth;
                }),
                (u.prototype.confirm = function (t, e) {
                  (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.img, e]);
                }),
                (u.prototype.handleEvent = function (t) {
                  var e = "on" + t.type;
                  this[e] && this[e](t);
                }),
                (u.prototype.onload = function () {
                  this.confirm(!0, "onload"), this.unbindEvents();
                }),
                (u.prototype.onerror = function () {
                  this.confirm(!1, "onerror"), this.unbindEvents();
                }),
                (u.prototype.unbindEvents = function () {
                  this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
                }),
                (c.prototype = Object.create(u.prototype)),
                (c.prototype.check = function () {
                  this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    (this.img.src = this.url),
                    this.getIsImageComplete() &&
                      (this.confirm(
                        0 !== this.img.naturalWidth,
                        "naturalWidth"
                      ),
                      this.unbindEvents());
                }),
                (c.prototype.unbindEvents = function () {
                  this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
                }),
                (c.prototype.confirm = function (t, e) {
                  (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.element, e]);
                }),
                (s.makeJQueryPlugin = function (e) {
                  (e = e || t.jQuery) &&
                    ((n = e).fn.imagesLoaded = function (t, e) {
                      return new s(this, t, e).jqDeferred.promise(n(this));
                    });
                }),
                s.makeJQueryPlugin(),
                s
              );
            })(o, t);
          }.apply(e, r)) || (t.exports = i);
    })("undefined" != typeof window ? window : this);
  },
  function (t, e) {
    function n(t, e, n, r) {
      var i,
        o =
          null == (i = r) || "number" == typeof i || "boolean" == typeof i
            ? r
            : n(r),
        s = e.get(o);
      return void 0 === s && ((s = t.call(this, r)), e.set(o, s)), s;
    }
    function r(t, e, n) {
      var r = Array.prototype.slice.call(arguments, 3),
        i = n(r),
        o = e.get(i);
      return void 0 === o && ((o = t.apply(this, r)), e.set(i, o)), o;
    }
    function i(t, e, n, r, i) {
      return n.bind(e, t, r, i);
    }
    function o(t, e) {
      return i(t, this, 1 === t.length ? n : r, e.cache.create(), e.serializer);
    }
    function s() {
      return JSON.stringify(arguments);
    }
    function a() {
      this.cache = Object.create(null);
    }
    (a.prototype.has = function (t) {
      return t in this.cache;
    }),
      (a.prototype.get = function (t) {
        return this.cache[t];
      }),
      (a.prototype.set = function (t, e) {
        this.cache[t] = e;
      });
    var u = {
      create: function () {
        return new a();
      },
    };
    (t.exports = function (t, e) {
      var n = e && e.cache ? e.cache : u,
        r = e && e.serializer ? e.serializer : s;
      return (e && e.strategy ? e.strategy : o)(t, { cache: n, serializer: r });
    }),
      (t.exports.strategies = {
        variadic: function (t, e) {
          return i(t, this, r, e.cache.create(), e.serializer);
        },
        monadic: function (t, e) {
          return i(t, this, n, e.cache.create(), e.serializer);
        },
      });
  },
  function (t, e, n) {
    var r, i;
    "undefined" != typeof window && window,
      void 0 ===
        (i =
          "function" ==
          typeof (r = function () {
            "use strict";
            function t() {}
            var e = t.prototype;
            return (
              (e.on = function (t, e) {
                if (t && e) {
                  var n = (this._events = this._events || {}),
                    r = (n[t] = n[t] || []);
                  return -1 == r.indexOf(e) && r.push(e), this;
                }
              }),
              (e.once = function (t, e) {
                if (t && e) {
                  this.on(t, e);
                  var n = (this._onceEvents = this._onceEvents || {});
                  return ((n[t] = n[t] || {})[e] = !0), this;
                }
              }),
              (e.off = function (t, e) {
                var n = this._events && this._events[t];
                if (n && n.length) {
                  var r = n.indexOf(e);
                  return -1 != r && n.splice(r, 1), this;
                }
              }),
              (e.emitEvent = function (t, e) {
                var n = this._events && this._events[t];
                if (n && n.length) {
                  (n = n.slice(0)), (e = e || []);
                  for (
                    var r = this._onceEvents && this._onceEvents[t], i = 0;
                    i < n.length;
                    i++
                  ) {
                    var o = n[i];
                    r && r[o] && (this.off(t, o), delete r[o]),
                      o.apply(this, e);
                  }
                  return this;
                }
              }),
              (e.allOff = function () {
                delete this._events, delete this._onceEvents;
              }),
              t
            );
          })
            ? r.call(e, n, e, t)
            : r) || (t.exports = i);
  },
  ,
  function (t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0);
    n.d(e, "default", function () {
      return r.a;
    });
  },
]).default;

// Clipboard
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT Â© Zeno Rocha
 */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.ClipboardJS = e())
    : (t.ClipboardJS = e());
})(this, function () {
  return (
    (n = {
      686: function (t, e, n) {
        "use strict";
        n.d(e, {
          default: function () {
            return b;
          },
        });
        var e = n(279),
          i = n.n(e),
          e = n(370),
          u = n.n(e),
          e = n(817),
          r = n.n(e);
        function c(t) {
          try {
            return document.execCommand(t);
          } catch (t) {
            return;
          }
        }
        var a = function (t) {
          t = r()(t);
          return c("cut"), t;
        };
        function o(t, e) {
          var n,
            o,
            t =
              ((n = t),
              (o = "rtl" === document.documentElement.getAttribute("dir")),
              ((t = document.createElement("textarea")).style.fontSize =
                "12pt"),
              (t.style.border = "0"),
              (t.style.padding = "0"),
              (t.style.margin = "0"),
              (t.style.position = "absolute"),
              (t.style[o ? "right" : "left"] = "-9999px"),
              (o = window.pageYOffset || document.documentElement.scrollTop),
              (t.style.top = "".concat(o, "px")),
              t.setAttribute("readonly", ""),
              (t.value = n),
              t);
          return (
            e.container.appendChild(t), (e = r()(t)), c("copy"), t.remove(), e
          );
        }
        var f = function (t) {
          var e =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : { container: document.body },
            n = "";
          return (
            "string" == typeof t
              ? (n = o(t, e))
              : t instanceof HTMLInputElement &&
                !["text", "search", "url", "tel", "password"].includes(
                  null == t ? void 0 : t.type
                )
              ? (n = o(t.value, e))
              : ((n = r()(t)), c("copy")),
            n
          );
        };
        function l(t) {
          return (l =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var s = function () {
          var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            e = t.action,
            n = void 0 === e ? "copy" : e,
            o = t.container,
            e = t.target,
            t = t.text;
          if ("copy" !== n && "cut" !== n)
            throw new Error(
              'Invalid "action" value, use either "copy" or "cut"'
            );
          if (void 0 !== e) {
            if (!e || "object" !== l(e) || 1 !== e.nodeType)
              throw new Error('Invalid "target" value, use a valid Element');
            if ("copy" === n && e.hasAttribute("disabled"))
              throw new Error(
                'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
              );
            if (
              "cut" === n &&
              (e.hasAttribute("readonly") || e.hasAttribute("disabled"))
            )
              throw new Error(
                'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
              );
          }
          return t
            ? f(t, { container: o })
            : e
            ? "cut" === n
              ? a(e)
              : f(e, { container: o })
            : void 0;
        };
        function p(t) {
          return (p =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function d(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        function y(t, e) {
          return (y =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            })(t, e);
        }
        function h(n) {
          var o = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Date.prototype.toString.call(
                  Reflect.construct(Date, [], function () {})
                ),
                !0
              );
            } catch (t) {
              return !1;
            }
          })();
          return function () {
            var t,
              e = v(n);
            return (
              (t = o
                ? ((t = v(this).constructor),
                  Reflect.construct(e, arguments, t))
                : e.apply(this, arguments)),
              (e = this),
              !(t = t) || ("object" !== p(t) && "function" != typeof t)
                ? (function (t) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  })(e)
                : t
            );
          };
        }
        function v(t) {
          return (v = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function m(t, e) {
          t = "data-clipboard-".concat(t);
          if (e.hasAttribute(t)) return e.getAttribute(t);
        }
        var b = (function () {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && y(t, e);
          })(r, i());
          var t,
            e,
            n,
            o = h(r);
          function r(t, e) {
            var n;
            return (
              (function (t) {
                if (!(t instanceof r))
                  throw new TypeError("Cannot call a class as a function");
              })(this),
              (n = o.call(this)).resolveOptions(e),
              n.listenClick(t),
              n
            );
          }
          return (
            (t = r),
            (n = [
              {
                key: "copy",
                value: function (t) {
                  var e =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : { container: document.body };
                  return f(t, e);
                },
              },
              {
                key: "cut",
                value: function (t) {
                  return a(t);
                },
              },
              {
                key: "isSupported",
                value: function () {
                  var t =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : ["copy", "cut"],
                    t = "string" == typeof t ? [t] : t,
                    e = !!document.queryCommandSupported;
                  return (
                    t.forEach(function (t) {
                      e = e && !!document.queryCommandSupported(t);
                    }),
                    e
                  );
                },
              },
            ]),
            (e = [
              {
                key: "resolveOptions",
                value: function () {
                  var t =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  (this.action =
                    "function" == typeof t.action
                      ? t.action
                      : this.defaultAction),
                    (this.target =
                      "function" == typeof t.target
                        ? t.target
                        : this.defaultTarget),
                    (this.text =
                      "function" == typeof t.text ? t.text : this.defaultText),
                    (this.container =
                      "object" === p(t.container)
                        ? t.container
                        : document.body);
                },
              },
              {
                key: "listenClick",
                value: function (t) {
                  var e = this;
                  this.listener = u()(t, "click", function (t) {
                    return e.onClick(t);
                  });
                },
              },
              {
                key: "onClick",
                value: function (t) {
                  var e = t.delegateTarget || t.currentTarget,
                    n = this.action(e) || "copy",
                    t = s({
                      action: n,
                      container: this.container,
                      target: this.target(e),
                      text: this.text(e),
                    });
                  this.emit(t ? "success" : "error", {
                    action: n,
                    text: t,
                    trigger: e,
                    clearSelection: function () {
                      e && e.focus(), window.getSelection().removeAllRanges();
                    },
                  });
                },
              },
              {
                key: "defaultAction",
                value: function (t) {
                  return m("action", t);
                },
              },
              {
                key: "defaultTarget",
                value: function (t) {
                  t = m("target", t);
                  if (t) return document.querySelector(t);
                },
              },
              {
                key: "defaultText",
                value: function (t) {
                  return m("text", t);
                },
              },
              {
                key: "destroy",
                value: function () {
                  this.listener.destroy();
                },
              },
            ]) && d(t.prototype, e),
            n && d(t, n),
            r
          );
        })();
      },
      828: function (t) {
        var e;
        "undefined" == typeof Element ||
          Element.prototype.matches ||
          ((e = Element.prototype).matches =
            e.matchesSelector ||
            e.mozMatchesSelector ||
            e.msMatchesSelector ||
            e.oMatchesSelector ||
            e.webkitMatchesSelector),
          (t.exports = function (t, e) {
            for (; t && 9 !== t.nodeType; ) {
              if ("function" == typeof t.matches && t.matches(e)) return t;
              t = t.parentNode;
            }
          });
      },
      438: function (t, e, n) {
        var u = n(828);
        function i(t, e, n, o, r) {
          var i = function (e, n, t, o) {
            return function (t) {
              (t.delegateTarget = u(t.target, n)),
                t.delegateTarget && o.call(e, t);
            };
          }.apply(this, arguments);
          return (
            t.addEventListener(n, i, r),
            {
              destroy: function () {
                t.removeEventListener(n, i, r);
              },
            }
          );
        }
        t.exports = function (t, e, n, o, r) {
          return "function" == typeof t.addEventListener
            ? i.apply(null, arguments)
            : "function" == typeof n
            ? i.bind(null, document).apply(null, arguments)
            : ("string" == typeof t && (t = document.querySelectorAll(t)),
              Array.prototype.map.call(t, function (t) {
                return i(t, e, n, o, r);
              }));
        };
      },
      879: function (t, n) {
        (n.node = function (t) {
          return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
        }),
          (n.nodeList = function (t) {
            var e = Object.prototype.toString.call(t);
            return (
              void 0 !== t &&
              ("[object NodeList]" === e || "[object HTMLCollection]" === e) &&
              "length" in t &&
              (0 === t.length || n.node(t[0]))
            );
          }),
          (n.string = function (t) {
            return "string" == typeof t || t instanceof String;
          }),
          (n.fn = function (t) {
            return "[object Function]" === Object.prototype.toString.call(t);
          });
      },
      370: function (t, e, n) {
        var f = n(879),
          l = n(438);
        t.exports = function (t, e, n) {
          if (!t && !e && !n) throw new Error("Missing required arguments");
          if (!f.string(e))
            throw new TypeError("Second argument must be a String");
          if (!f.fn(n))
            throw new TypeError("Third argument must be a Function");
          if (f.node(t))
            return (
              (c = e),
              (a = n),
              (u = t).addEventListener(c, a),
              {
                destroy: function () {
                  u.removeEventListener(c, a);
                },
              }
            );
          if (f.nodeList(t))
            return (
              (o = t),
              (r = e),
              (i = n),
              Array.prototype.forEach.call(o, function (t) {
                t.addEventListener(r, i);
              }),
              {
                destroy: function () {
                  Array.prototype.forEach.call(o, function (t) {
                    t.removeEventListener(r, i);
                  });
                },
              }
            );
          if (f.string(t))
            return (t = t), (e = e), (n = n), l(document.body, t, e, n);
          throw new TypeError(
            "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
          );
          var o, r, i, u, c, a;
        };
      },
      817: function (t) {
        t.exports = function (t) {
          var e,
            n =
              "SELECT" === t.nodeName
                ? (t.focus(), t.value)
                : "INPUT" === t.nodeName || "TEXTAREA" === t.nodeName
                ? ((e = t.hasAttribute("readonly")) ||
                    t.setAttribute("readonly", ""),
                  t.select(),
                  t.setSelectionRange(0, t.value.length),
                  e || t.removeAttribute("readonly"),
                  t.value)
                : (t.hasAttribute("contenteditable") && t.focus(),
                  (n = window.getSelection()),
                  (e = document.createRange()).selectNodeContents(t),
                  n.removeAllRanges(),
                  n.addRange(e),
                  n.toString());
          return n;
        };
      },
      279: function (t) {
        function e() {}
        (e.prototype = {
          on: function (t, e, n) {
            var o = this.e || (this.e = {});
            return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this;
          },
          once: function (t, e, n) {
            var o = this;
            function r() {
              o.off(t, r), e.apply(n, arguments);
            }
            return (r._ = e), this.on(t, r, n);
          },
          emit: function (t) {
            for (
              var e = [].slice.call(arguments, 1),
                n = ((this.e || (this.e = {}))[t] || []).slice(),
                o = 0,
                r = n.length;
              o < r;
              o++
            )
              n[o].fn.apply(n[o].ctx, e);
            return this;
          },
          off: function (t, e) {
            var n = this.e || (this.e = {}),
              o = n[t],
              r = [];
            if (o && e)
              for (var i = 0, u = o.length; i < u; i++)
                o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
            return r.length ? (n[t] = r) : delete n[t], this;
          },
        }),
          (t.exports = e),
          (t.exports.TinyEmitter = e);
      },
    }),
    (r = {}),
    (o.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return o.d(e, { a: e }), e;
    }),
    (o.d = function (t, e) {
      for (var n in e)
        o.o(e, n) &&
          !o.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (o.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    o(686).default
  );
  function o(t) {
    if (r[t]) return r[t].exports;
    var e = (r[t] = { exports: {} });
    return n[t](e, e.exports, o), e.exports;
  }
  var n, r;
});

const addZero = (x) => (x < 10 && x >= 0 ? "0" + x : x);

// AOS
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AOS = t())
    : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        s = o(c),
        f = n(8),
        d = o(f),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        j = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, x)), (0, b.default)(w, x.once), w;
        },
        O = function () {
          (w = (0, h.default)()), j();
        },
        M = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        S = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        _ = function (e) {
          (x = i(x, e)), (w = (0, h.default)());
          var t = document.all && !window.atob;
          return S(x.disable) || t
            ? M()
            : (x.disableMutationObserver ||
                d.default.isSupported() ||
                (console.info(
                  '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                ),
                (x.disableMutationObserver = !0)),
              document
                .querySelector("body")
                .setAttribute("data-aos-easing", x.easing),
              document
                .querySelector("body")
                .setAttribute("data-aos-duration", x.duration),
              document
                .querySelector("body")
                .setAttribute("data-aos-delay", x.delay),
              "DOMContentLoaded" === x.startEvent &&
              ["complete", "interactive"].indexOf(document.readyState) > -1
                ? j(!0)
                : "load" === x.startEvent
                ? window.addEventListener(x.startEvent, function () {
                    j(!0);
                  })
                : document.addEventListener(x.startEvent, function () {
                    j(!0);
                  }),
              window.addEventListener(
                "resize",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "orientationchange",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "scroll",
                (0, u.default)(function () {
                  (0, b.default)(w, x.once);
                }, x.throttleDelay)
              ),
              x.disableMutationObserver || d.default.ready("[data-aos]", O),
              w);
        };
      e.exports = { init: _, refresh: j, refreshHard: O };
    },
    function (e, t) {},
    ,
    ,
    ,
    ,
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function o(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (k = e), (h = setTimeout(f, t)), M ? o(e) : g;
          }
          function a(e) {
            var n = e - w,
              o = e - k,
              i = t - n;
            return S ? j(i, y - o) : i;
          }
          function c(e) {
            var n = e - w,
              o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = O();
            return c(e) ? d(e) : void (h = setTimeout(f, a(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? o(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(O());
          }
          function m() {
            var e = O(),
              n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            (t = u(t) || 0),
            i(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e, t, o) {
          var r = !0,
            a = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            i(o) &&
              ((r = "leading" in o ? !!o.leading : r),
              (a = "trailing" in o ? !!o.trailing : a)),
            n(e, t, { leading: r, maxWait: t, trailing: a })
          );
        }
        function i(e) {
          var t = "undefined" == typeof e ? "undefined" : c(e);
          return !!e && ("object" == t || "function" == t);
        }
        function r(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
          );
        }
        function a(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }
        function u(e) {
          if ("number" == typeof e) return e;
          if (a(e)) return f;
          if (i(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, "");
          var n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? f : +e;
        }
        var c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          s = "Expected a function",
          f = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y =
            "object" == ("undefined" == typeof t ? "undefined" : c(t)) &&
            t &&
            t.Object === Object &&
            t,
          g =
            "object" == ("undefined" == typeof self ? "undefined" : c(self)) &&
            self &&
            self.Object === Object &&
            self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function () {
            return h.Date.now();
          };
        e.exports = o;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function i(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (O = e), (h = setTimeout(f, t)), M ? i(e) : g;
          }
          function u(e) {
            var n = e - w,
              o = e - O,
              i = t - n;
            return S ? x(i, y - o) : i;
          }
          function s(e) {
            var n = e - w,
              o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = j();
            return s(e) ? d(e) : void (h = setTimeout(f, u(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? i(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(j());
          }
          function m() {
            var e = j(),
              n = s(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e) {
          var t = "undefined" == typeof e ? "undefined" : u(e);
          return !!e && ("object" == t || "function" == t);
        }
        function i(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
          );
        }
        function r(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
            (i(e) && w.call(e) == f)
          );
        }
        function a(e) {
          if ("number" == typeof e) return e;
          if (r(e)) return s;
          if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, "");
          var n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? s : +e;
        }
        var u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          c = "Expected a function",
          s = NaN,
          f = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v =
            "object" == ("undefined" == typeof t ? "undefined" : u(t)) &&
            t &&
            t.Object === Object &&
            t,
          y =
            "object" == ("undefined" == typeof self ? "undefined" : u(self)) &&
            self &&
            self.Object === Object &&
            self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function () {
            return g.Date.now();
          };
        e.exports = n;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      "use strict";
      function n(e) {
        var t = void 0,
          o = void 0,
          i = void 0;
        for (t = 0; t < e.length; t += 1) {
          if (((o = e[t]), o.dataset && o.dataset.aos)) return !0;
          if ((i = o.children && n(o.children))) return !0;
        }
        return !1;
      }
      function o() {
        return (
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        );
      }
      function i() {
        return !!o();
      }
      function r(e, t) {
        var n = window.document,
          i = o(),
          r = new i(a);
        (u = t),
          r.observe(n.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0,
          });
      }
      function a(e) {
        e &&
          e.forEach(function (e) {
            var t = Array.prototype.slice.call(e.addedNodes),
              o = Array.prototype.slice.call(e.removedNodes),
              i = t.concat(o);
            if (n(i)) return u();
          });
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = function () {};
      t.default = { isSupported: i, ready: r };
    },
    function (e, t) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        s = (function () {
          function e() {
            n(this, e);
          }
          return (
            i(e, [
              {
                key: "phone",
                value: function () {
                  var e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new s();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e, t, n) {
          var o = e.node.getAttribute("data-aos-once");
          t > e.position
            ? e.node.classList.add("aos-animate")
            : "undefined" != typeof o &&
              ("false" === o || (!n && "true" !== o)) &&
              e.node.classList.remove("aos-animate");
        },
        o = function (e, t) {
          var o = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(12),
        r = o(i),
        a = function (e, t) {
          return (
            e.forEach(function (e, n) {
              e.node.classList.add("aos-init"),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(13),
        r = o(i),
        a = function (e, t) {
          var n = 0,
            o = 0,
            i = window.innerHeight,
            a = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
            a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
            (n = (0, r.default)(e).top),
            a.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              n += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              n += e.offsetHeight;
              break;
            case "top-center":
              n += i / 2;
              break;
            case "bottom-center":
              n += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              n += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              n += i;
              break;
            case "bottom-top":
              n += e.offsetHeight + i;
              break;
            case "center-top":
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
            (n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
        return { top: n, left: t };
      };
      t.default = n;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        return (
          (e = e || document.querySelectorAll("[data-aos]")),
          Array.prototype.map.call(e, function (e) {
            return { node: e };
          })
        );
      };
      t.default = n;
    },
  ]);
});

// Functions
/*!
 * NioApp v1.0.0 (https://softnio.com/)
 * Developed by Softnio Team.
 * Copyright by Softnio.
 */
var NioApp = (function (win, doc) {
  "use strict";
  var NioApp = {
    AppInfo: {
      name: "NioApp",
      version: "1.0.0",
      author: "Softnio",
    },
    Package: {
      name: "NioLand",
      version: "1.0",
    },
  };

  function docReady(callback) {
    document.addEventListener("DOMContentLoaded", callback, false);
  }

  function winLoad(callback) {
    window.addEventListener("load", callback, false);
  }

  function onResize(callback, selector) {
    selector = typeof selector === typeof undefined ? window : selector;
    selector.addEventListener("resize", callback);
  }

  NioApp.docReady = docReady;
  NioApp.winLoad = winLoad;
  NioApp.onResize = onResize;

  return NioApp;
})(window, document);

NioApp = (function (NioApp) {
  "use strict";

  //Get Value For Custom PropertyValue  @v1.0

  // Global Uses @v1.0
  /////////////////////////////
  NioApp.BS = {};
  NioApp.Addons = {};
  NioApp.Custom = {};
  NioApp.Toggle = {};
  NioApp.body = document.querySelector("body");
  NioApp.Win = { height: window.innerHeight, width: window.innerWidth };
  NioApp.Break = {
    mb: 420,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    any: Infinity,
  };

  // State @v1.0
  NioApp.State = {
    isRTL:
      NioApp.body.classList.contains("has-rtl") ||
      NioApp.body.getAttribute("dir") === "rtl"
        ? true
        : false,
    isTouch: "ontouchstart" in document.documentElement ? true : false,
    isMobile: navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i
    )
      ? true
      : false,
    asMobile: NioApp.Win.width < NioApp.Break.md ? true : false,
  };

  // State Update @v1.1
  NioApp.StateUpdate = function () {
    NioApp.Win = { height: window.innerHeight, width: window.innerWidth };
    NioApp.State.asMobile = NioApp.Win.width < NioApp.Break.md ? true : false;
  };

  ///////////////////////////////
  //Functions 1.0
  /////////////////////////////

  //slide up
  NioApp.SlideUp = function (target, duration = 500) {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  };

  //side down
  NioApp.SlideDown = function (target, duration = 500) {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "block";
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  };

  //slide toggle
  NioApp.SlideToggle = function (target, duration = 500) {
    if (window.getComputedStyle(target).display === "none") {
      return NioApp.SlideDown(target, duration);
    } else {
      return NioApp.SlideUp(target, duration);
    }
  };

  //Extend Object
  NioApp.extendObject = function (obj, ext) {
    Object.keys(ext).forEach(function (key) {
      obj[key] = ext[key];
    });
    return obj;
  };

  ///////////////////////////////
  // Initial by default
  /////////////////////////////
  NioApp.onResize(NioApp.StateUpdate);

  return NioApp;
})(NioApp);

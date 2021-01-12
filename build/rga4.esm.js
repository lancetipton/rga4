import t, {
  createContext as e,
  useState as n,
  useEffect as r,
  useContext as i,
} from 'react'
function asyncGeneratorStep(t, e, n, r, i, o, a) {
  try {
    var c = t[o](a),
      u = c.value
  } catch (t) {
    return void n(t)
  }
  c.done ? e(u) : Promise.resolve(u).then(r, i)
}
function _classCallCheck(t, e) {
  if (!(t instanceof e))
    throw new TypeError('Cannot call a class as a function')
}
function _extends() {
  return (_extends =
    Object.assign ||
    function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e]
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
      }
      return t
    }).apply(this, arguments)
}
function _objectWithoutProperties(t, e) {
  if (null == t) return {}
  var n,
    r,
    i = (function (t, e) {
      if (null == t) return {}
      var n,
        r,
        i = {},
        o = Object.keys(t)
      for (r = 0; r < o.length; r++)
        (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n])
      return i
    })(t, e)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t)
    for (r = 0; r < o.length; r++)
      (n = o[r]),
        e.indexOf(n) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(t, n) && (i[n] = t[n]))
  }
  return i
}
function _slicedToArray(t, e) {
  return (
    (function (t) {
      if (Array.isArray(t)) return t
    })(t) ||
    (function (t, e) {
      if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t)))
        return
      var n = [],
        r = !0,
        i = !1,
        o = void 0
      try {
        for (
          var a, c = t[Symbol.iterator]();
          !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
          r = !0
        );
      } catch (t) {
        ;(i = !0), (o = t)
      } finally {
        try {
          r || null == c.return || c.return()
        } finally {
          if (i) throw o
        }
      }
      return n
    })(t, e) ||
    (function (t, e) {
      if (!t) return
      if ('string' == typeof t) return _arrayLikeToArray(t, e)
      var n = Object.prototype.toString.call(t).slice(8, -1)
      'Object' === n && t.constructor && (n = t.constructor.name)
      if ('Map' === n || 'Set' === n) return Array.from(t)
      if (
        'Arguments' === n ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return _arrayLikeToArray(t, e)
    })(t, e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    })()
  )
}
function _arrayLikeToArray(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
  return r
}
var o = e(null),
  buildScriptContent = function (t) {
    var e = (function (t) {
      return "\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '"
        .concat(t.gaCode, "', ")
        .concat(JSON.stringify(t.config), ');\n')
    })(t)
    return t.extraGaCodes
      ? t.extraGaCodes.reduce(function (t, e) {
          return t + "gtag('config', '".concat(e, "');\n")
        }, e)
      : e
  },
  buildOnloadEvent = function (t, e, n) {
    return function () {
      !(function (t, e) {
        var n = document.createElement('script')
        ;(n.innerHTML = buildScriptContent(t)), e.appendChild(n)
      })(t, e)
      var r = t.setSingleton()
      window.ga && Object.assign(r, { ga: t.ga }), n(r)
    }
  },
  addScriptEvents = function (t, e, n, r, i) {
    return (
      (e.onload = buildOnloadEvent(t, n, r)),
      (e.onerror = (function (t) {
        return function () {
          t(new Error('Google Analytics failed to initialize!'))
        }
      })(i)),
      e
    )
  },
  isDocReady = function () {
    return (
      'complete' === document.readyState ||
      'interactive' === document.readyState
    )
  },
  buildScriptTags = function (t, e, n) {
    var r = document.getElementsByTagName('head')[0],
      i = (function (t) {
        var e = document.createElement('script')
        return (
          e.setAttribute('async', ''),
          e.setAttribute(
            'src',
            'https://www.googletagmanager.com/gtag/js?id='.concat(t)
          ),
          e
        )
      })(t.gaCode)
    addScriptEvents(t, i, r, e, n),
      (function (t, e) {
        isDocReady()
          ? e.appendChild(t)
          : (document.onreadystatechange = function () {
              isDocReady() && e.appendChild(t)
            })
      })(i, r)
  },
  a = {
    PAGE_VIEW: Object.freeze({
      page_location: 'location',
      page_title: 'title',
    }),
    UA_EVENT_PROPS: Object.freeze({
      value: 'value',
      action: 'action',
      label: 'event_label',
      category: 'event_category',
      nonInteraction: 'non_interaction',
    }),
  },
  getEventMap = function () {
    return Object.freeze(a)
  },
  mapEventKeys = function (t, e) {
    var n = (function (t) {
      var e = getEventMap()
      return 'string' == typeof t ? e[t] : t
    })(e)
    return Object.entries(n).reduce(function (e, n) {
      var r = _slicedToArray(n, 2),
        i = r[0],
        o = r[1]
      return ('value' === i && t[i] < 0) || (t[i] && (e[o] = t[i])), e
    }, {})
  },
  noOpOverride = function (t) {
    return function () {
      console.error(
        'Method '.concat(
          t,
          ' should be overwritten with GAController instance method!'
        )
      )
    }
  },
  c = {
    initialized: !1,
    gtag: noOpOverride('GAController#gtag'),
    uaEvent: noOpOverride('GAController#uaEvent'),
    pageView: noOpOverride('GAController#pageView'),
    event: noOpOverride('GAController#event'),
  },
  u = function GAController(t) {
    var e = this,
      n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
    _classCallCheck(this, GAController),
      (this.setSingleton = function () {
        return (
          Object.assign(c, {
            initialized: !0,
            pageView: e.pageView.bind(e),
            uaEvent: e.uaEvent.bind(e),
            event: e.event.bind(e),
            gtag: e.gtag.bind(e),
          }),
          c
        )
      }),
      (this.initialize = function () {
        return new Promise(function (t, n) {
          GAController.isInitialized()
            ? n(new Error('Google Analytics has already been initialized!'))
            : buildScriptTags(e, t, n)
        })
      }),
      (this.pageView = function (t) {
        var n = t.location,
          r = void 0 === n ? window.location : n,
          i = t.title,
          o = void 0 === i ? document.title : i,
          a = mapEventKeys({ location: r, title: o }, 'PAGE_VIEW')
        return e.gtag('event', 'page_view', a)
      }),
      (this.uaEvent = function (t) {
        var n = t.action,
          r = _objectWithoutProperties(t, ['action']),
          i = mapEventKeys(r, 'UA_EVENT_PROPS')
        return e.gtag('event', n, i)
      }),
      (this.event = function (t, n) {
        return (
          'string' == typeof t || n || ((t = (n = t).name), delete n.name),
          t && 'string' == typeof t
            ? e.gtag('event', t, n)
            : console.warn(
                'Invalid event arguments. Action name and properties are required!'
              )
        )
      }),
      (this.ga = function () {
        var t
        return (t = window).ga.apply(t, arguments)
      }),
      (this.gtag = function () {
        var t
        return (t = window).gtag.apply(t, arguments)
      })
    var r = n.gaCodes,
      i = _objectWithoutProperties(n, ['gaCodes'])
    ;(this.config = i),
      (this.gaCode = t),
      (this.extraGaCodes = r || []),
      (this.initialized = !1)
  }
;(u.isInitialized = function () {
  return c.initialized
}),
  (u.getInstance = function (t) {
    return u.isInitialized()
      ? c
      : t && console.warn('Google Analytics is not initialized')
  })
var l,
  s,
  f =
    ((l = regeneratorRuntime.mark(function _callee(t, e) {
      var n, r, i, o, a
      return regeneratorRuntime.wrap(function (c) {
        for (;;)
          switch ((c.prev = c.next)) {
            case 0:
              return (
                (n = t.code),
                (r = t.config),
                (i = t.gaCodes),
                (o = new u(''.concat(n), r, i)),
                (c.next = 4),
                o.initialize()
              )
            case 4:
              ;(a = c.sent), e(a)
            case 6:
            case 'end':
              return c.stop()
          }
      }, _callee)
    })),
    (s = function () {
      var t = this,
        e = arguments
      return new Promise(function (n, r) {
        var i = l.apply(t, e)
        function _next(t) {
          asyncGeneratorStep(i, n, r, _next, _throw, 'next', t)
        }
        function _throw(t) {
          asyncGeneratorStep(i, n, r, _next, _throw, 'throw', t)
        }
        _next(void 0)
      })
    }),
    function (t, e) {
      return s.apply(this, arguments)
    }),
  RGA4Provider = function (e) {
    var i = e.children,
      a = _objectWithoutProperties(e, ['children']),
      c = _slicedToArray(n(u.getInstance()), 2),
      l = c[0],
      s = c[1]
    return (
      r(
        function () {
          !u.isInitialized() && f(a, s)
        },
        [a, l, s]
      ),
      t.createElement(o.Provider, { value: l }, i)
    )
  },
  useRGA4 = function () {
    return i(o)
  },
  withRGA4 = function (e) {
    var RGA4Hoc = function (n) {
        var r = useRGA4()
        return t.createElement(e, _extends({}, n, { rga4: r }))
      },
      n = e.displayName || e.name || 'Component'
    return (RGA4Hoc.displayName = 'WithRGA4('.concat(n, ')')), RGA4Hoc
  }
export { RGA4Provider, useRGA4, withRGA4 }
//# sourceMappingURL=rga4.esm.js.map

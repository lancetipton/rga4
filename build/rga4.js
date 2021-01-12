'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var e,
  t = require('react'),
  n = (e = t) && 'object' == typeof e && 'default' in e ? e.default : e
function asyncGeneratorStep(e, t, n, r, o, i, a) {
  try {
    var c = e[i](a),
      u = c.value
  } catch (e) {
    return void n(e)
  }
  c.done ? t(u) : Promise.resolve(u).then(r, o)
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function _extends() {
  return (_extends =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    }).apply(this, arguments)
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {}
  var n,
    r,
    o = (function (e, t) {
      if (null == e) return {}
      var n,
        r,
        o = {},
        i = Object.keys(e)
      for (r = 0; r < i.length; r++)
        (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
      return o
    })(e, t)
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e)
    for (r = 0; r < i.length; r++)
      (n = i[r]),
        t.indexOf(n) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]))
  }
  return o
}
function _slicedToArray(e, t) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e
    })(e) ||
    (function (e, t) {
      if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
        return
      var n = [],
        r = !0,
        o = !1,
        i = void 0
      try {
        for (
          var a, c = e[Symbol.iterator]();
          !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
          r = !0
        );
      } catch (e) {
        ;(o = !0), (i = e)
      } finally {
        try {
          r || null == c.return || c.return()
        } finally {
          if (o) throw i
        }
      }
      return n
    })(e, t) ||
    (function (e, t) {
      if (!e) return
      if ('string' == typeof e) return _arrayLikeToArray(e, t)
      var n = Object.prototype.toString.call(e).slice(8, -1)
      'Object' === n && e.constructor && (n = e.constructor.name)
      if ('Map' === n || 'Set' === n) return Array.from(e)
      if (
        'Arguments' === n ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return _arrayLikeToArray(e, t)
    })(e, t) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    })()
  )
}
function _arrayLikeToArray(e, t) {
  ;(null == t || t > e.length) && (t = e.length)
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
  return r
}
var r = t.createContext(null),
  buildScriptContent = function (e) {
    var t = (function (e) {
      return "\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '"
        .concat(e.gaCode, "', ")
        .concat(JSON.stringify(e.config), ');\n')
    })(e)
    return e.extraGaCodes
      ? e.extraGaCodes.reduce(function (e, t) {
          return e + "gtag('config', '".concat(t, "');\n")
        }, t)
      : t
  },
  buildOnloadEvent = function (e, t, n) {
    return function () {
      !(function (e, t) {
        var n = document.createElement('script')
        ;(n.innerHTML = buildScriptContent(e)), t.appendChild(n)
      })(e, t)
      var r = e.setSingleton()
      window.ga && Object.assign(r, { ga: e.ga }), n(r)
    }
  },
  addScriptEvents = function (e, t, n, r, o) {
    return (
      (t.onload = buildOnloadEvent(e, n, r)),
      (t.onerror = (function (e) {
        return function () {
          e(new Error('Google Analytics failed to initialize!'))
        }
      })(o)),
      t
    )
  },
  isDocReady = function () {
    return (
      'complete' === document.readyState ||
      'interactive' === document.readyState
    )
  },
  buildScriptTags = function (e, t, n) {
    var r = document.getElementsByTagName('head')[0],
      o = (function (e) {
        var t = document.createElement('script')
        return (
          t.setAttribute('async', ''),
          t.setAttribute(
            'src',
            'https://www.googletagmanager.com/gtag/js?id='.concat(e)
          ),
          t
        )
      })(e.gaCode)
    addScriptEvents(e, o, r, t, n),
      (function (e, t) {
        isDocReady()
          ? t.appendChild(e)
          : (document.onreadystatechange = function () {
              isDocReady() && t.appendChild(e)
            })
      })(o, r)
  },
  o = {
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
    return Object.freeze(o)
  },
  mapEventKeys = function (e, t) {
    var n = (function (e) {
      var t = getEventMap()
      return 'string' == typeof e ? t[e] : e
    })(t)
    return Object.entries(n).reduce(function (t, n) {
      var r = _slicedToArray(n, 2),
        o = r[0],
        i = r[1]
      return ('value' === o && e[o] < 0) || (e[o] && (t[i] = e[o])), t
    }, {})
  },
  noOpOverride = function (e) {
    return function () {
      console.error(
        'Method '.concat(
          e,
          ' should be overwritten with GAController instance method!'
        )
      )
    }
  },
  i = {
    initialized: !1,
    gtag: noOpOverride('GAController#gtag'),
    uaEvent: noOpOverride('GAController#uaEvent'),
    pageView: noOpOverride('GAController#pageView'),
    event: noOpOverride('GAController#event'),
  },
  a = function GAController(e) {
    var t = this,
      n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
    _classCallCheck(this, GAController),
      (this.setSingleton = function () {
        return (
          Object.assign(i, {
            initialized: !0,
            pageView: t.pageView.bind(t),
            uaEvent: t.uaEvent.bind(t),
            event: t.event.bind(t),
            gtag: t.gtag.bind(t),
          }),
          i
        )
      }),
      (this.initialize = function () {
        return new Promise(function (e, n) {
          GAController.isInitialized()
            ? n(new Error('Google Analytics has already been initialized!'))
            : buildScriptTags(t, e, n)
        })
      }),
      (this.pageView = function (e) {
        var n = e.location,
          r = void 0 === n ? window.location : n,
          o = e.title,
          i = void 0 === o ? document.title : o,
          a = mapEventKeys({ location: r, title: i }, 'PAGE_VIEW')
        return t.gtag('event', 'page_view', a)
      }),
      (this.uaEvent = function (e) {
        var n = e.action,
          r = _objectWithoutProperties(e, ['action']),
          o = mapEventKeys(r, 'UA_EVENT_PROPS')
        return t.gtag('event', n, o)
      }),
      (this.event = function (e, n) {
        return (
          'string' == typeof e || n || ((e = (n = e).name), delete n.name),
          e && 'string' == typeof e
            ? t.gtag('event', e, n)
            : console.warn(
                'Invalid event arguments. Action name and properties are required!'
              )
        )
      }),
      (this.ga = function () {
        var e
        return (e = window).ga.apply(e, arguments)
      }),
      (this.gtag = function () {
        var e
        return (e = window).gtag.apply(e, arguments)
      })
    var r = n.gaCodes,
      o = _objectWithoutProperties(n, ['gaCodes'])
    ;(this.config = o),
      (this.gaCode = e),
      (this.extraGaCodes = r || []),
      (this.initialized = !1)
  }
;(a.isInitialized = function () {
  return i.initialized
}),
  (a.getInstance = function (e) {
    return a.isInitialized()
      ? i
      : e && console.warn('Google Analytics is not initialized')
  })
var c,
  u,
  l =
    ((c = regeneratorRuntime.mark(function _callee(e, t) {
      var n, r, o, i, c
      return regeneratorRuntime.wrap(function (u) {
        for (;;)
          switch ((u.prev = u.next)) {
            case 0:
              return (
                (n = e.code),
                (r = e.config),
                (o = e.gaCodes),
                (i = new a(''.concat(n), r, o)),
                (u.next = 4),
                i.initialize()
              )
            case 4:
              ;(c = u.sent), t(c)
            case 6:
            case 'end':
              return u.stop()
          }
      }, _callee)
    })),
    (u = function () {
      var e = this,
        t = arguments
      return new Promise(function (n, r) {
        var o = c.apply(e, t)
        function _next(e) {
          asyncGeneratorStep(o, n, r, _next, _throw, 'next', e)
        }
        function _throw(e) {
          asyncGeneratorStep(o, n, r, _next, _throw, 'throw', e)
        }
        _next(void 0)
      })
    }),
    function (e, t) {
      return u.apply(this, arguments)
    }),
  useRGA4 = function () {
    return t.useContext(r)
  }
;(exports.RGA4Provider = function (e) {
  var o = e.children,
    i = _objectWithoutProperties(e, ['children']),
    c = _slicedToArray(t.useState(a.getInstance()), 2),
    u = c[0],
    s = c[1]
  return (
    t.useEffect(
      function () {
        !a.isInitialized() && l(i, s)
      },
      [i, u, s]
    ),
    n.createElement(r.Provider, { value: u }, o)
  )
}),
  (exports.useRGA4 = useRGA4),
  (exports.withRGA4 = function (e) {
    var RGA4Hoc = function (t) {
        var r = useRGA4()
        return n.createElement(e, _extends({}, t, { rga4: r }))
      },
      t = e.displayName || e.name || 'Component'
    return (RGA4Hoc.displayName = 'WithRGA4('.concat(t, ')')), RGA4Hoc
  })
//# sourceMappingURL=rga4.js.map

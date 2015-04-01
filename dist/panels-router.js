(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PanelsRouter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Constants = _interopRequire(require("./constants"));

var Marty = _interopRequire(require("marty"));

var RouterActionCreators = (function (_Marty$ActionCreators) {
  function RouterActionCreators() {
    _classCallCheck(this, RouterActionCreators);

    if (_Marty$ActionCreators != null) {
      _Marty$ActionCreators.apply(this, arguments);
    }
  }

  _inherits(RouterActionCreators, _Marty$ActionCreators);

  _createClass(RouterActionCreators, {
    navigate: {
      value: function navigate(uri) {
        this.dispatch(Constants.ROUTER_NAVIGATE, uri);
      }
    }
  });

  return RouterActionCreators;
})(Marty.ActionCreators);

module.exports = Marty.register(RouterActionCreators);

},{"./constants":2,"marty":undefined}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Marty = _interopRequire(require("marty"));

module.exports = Marty.createConstants(["ROUTER_NAVIGATE"]);

},{"marty":undefined}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = history;

var ActionCreators = _interopRequire(require("./action-creators"));

var Store = _interopRequire(require("./store"));

function history() {
  window.addEventListener("popstate", function () {
    return ActionCreators.navigate(location.href);
  });

  Store.addChangeListener(function () {
    return Store.uri !== window.location.href && window.history.pushState(null, null, Store.uri);
  });
}

},{"./action-creators":1,"./store":7}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionCreators = _interopRequire(require("./action-creators"));
exports.Constants = _interopRequire(require("./constants"));
exports.history = _interopRequire(require("./history"));
exports.Parser = _interopRequire(require("./parser"));
exports.Store = _interopRequire(require("./store"));

},{"./action-creators":1,"./constants":2,"./history":3,"./parser":6,"./store":7}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = parserWorker;

var XRegExp = _interopRequire(require("xregexp"));

var SCHEMA_REGEX = /https?:\/\//;
// TODO Simplify regex and remove XRegExp dependency
var URI_REGEX = XRegExp("^(?<schema> [^:/?]+ ) ://   # aka protocol   \n    (?<host>   [^/?]+  )       # domain name/IP \n    (?<path>   [^?]*   ) \\??  # optional path  \n    (?<query>  .*      )       # optional query", "x");

function parserWorker(self) {
  function parse(uri) {
    var keys = [];
    var nextUri = uri;

    do {
      (function () {
        var parsed = XRegExp.exec(nextUri, URI_REGEX);

        if (parsed && parsed.schema && parsed.host) {
          var path = parsed.path;

          if (SCHEMA_REGEX.test(parsed.path)) {
            path = parsed.path.split(SCHEMA_REGEX)[0];
            nextUri = parsed.path.replace(path, "");
          } else {
            nextUri = undefined;
          }

          // Get every path 'bit' which is indeed every panel we need to load
          var pathBits = [];
          do {
            path = path.split("/");
            path = path.slice(0, path.length - 1).join("/");
            pathBits.push(path || "/");
          } while (path.length);
          var uniquePathBits = new Set(pathBits.sort());
          // TODO Should we bring the query bit in?
          uniquePathBits.forEach(function (bit) {
            return keys.push("" + parsed.schema + "://" + parsed.host + "" + bit);
          });
        } else {
          nextUri = undefined;
        }
      })();
    } while (nextUri);

    return keys;
  }

  if (self) {
    self.addEventListener("message", function (event) {
      return self.postMessage(parse(event.data));
    });
  }

  return parse;
}

},{"xregexp":undefined}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ActionCreators = _interopRequire(require("./action-creators"));

var Immutable = _interopRequire(require("immutable"));

var parser = _interopRequire(require("./parser-worker"));

var TRAILING_SLASH_REGEX = /\/$/;

var Parser = (function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.parsed = Immutable.Map();
    this.parser = parser();
  }

  _createClass(Parser, {
    parse: {
      value: function parse(uri) {
        // Make sure we always have a trailing slash on the URI
        uri = TRAILING_SLASH_REGEX.test(uri) ? uri : "" + uri + "/";

        var keys = this.parsed.get(uri);
        if (!keys) {
          keys = Immutable.fromJS(this.parser(uri));
          this.parsed = this.parsed.set(uri, keys);
        }

        return keys;
      }
    }
  });

  return Parser;
})();

module.exports = Parser;

},{"./action-creators":1,"./parser-worker":5,"immutable":undefined}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Constants = _interopRequire(require("./constants"));

var Immutable = _interopRequire(require("immutable"));

var Marty = _interopRequire(require("marty"));

var Parser = _interopRequire(require("./parser"));

var RouterStore = (function (_Marty$Store) {
  function RouterStore(options) {
    _classCallCheck(this, RouterStore);

    _get(Object.getPrototypeOf(RouterStore.prototype), "constructor", this).call(this, options);
    this.handlers = {
      navigate: Constants.ROUTER_NAVIGATE
    };
    this.parser = new Parser();
    this.state = Immutable.fromJS({
      keys: [],
      uri: ""
    });
  }

  _inherits(RouterStore, _Marty$Store);

  _createClass(RouterStore, {
    keys: {
      get: function () {
        return this.state.get("keys");
      }
    },
    uri: {
      get: function () {
        return this.state.get("uri");
      }
    },
    navigate: {
      value: function navigate(toUri) {
        this.state = this.state.merge({
          uri: toUri,
          keys: this.parser.parse(toUri)
        });
      }
    }
  });

  return RouterStore;
})(Marty.Store);

module.exports = Marty.register(RouterStore);

},{"./constants":2,"./parser":6,"immutable":undefined,"marty":undefined}]},{},[4])(4)
});
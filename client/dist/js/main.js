webpackJsonp([0],{

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLocations = fetchLocations;

var _axios = __webpack_require__(130);

var _axios2 = _interopRequireDefault(_axios);

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchLocations(params) {
  var loc = window.location;
  return {
    type: _ActionTypes2.default.FETCH_LOCATIONS,
    payload: _axios2.default.get(loc.protocol + '//' + loc.host + loc.pathname + '/json', {
      params: params
    })
  };
}

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openMarker = openMarker;
exports.highlightLocation = highlightLocation;
exports.closeMarker = closeMarker;

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openMarker(target) {
  return {
    type: _ActionTypes2.default.MARKER_CLICK,
    payload: {
      key: target
    }
  };
}

function highlightLocation(target) {
  return {
    type: _ActionTypes2.default.MARKER_CLICK,
    payload: target
  };
}

function closeMarker(target) {
  return {
    type: _ActionTypes2.default.MARKER_CLOSE,
    payload: target
  };
}

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(31);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(75);

var _reactRedux = __webpack_require__(32);

var _reduxThunk = __webpack_require__(253);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(254);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = __webpack_require__(256);

var _reducers2 = _interopRequireDefault(_reducers);

var _Locator = __webpack_require__(268);

var _Locator2 = _interopRequireDefault(_Locator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.querySelector('.locator');

function composedMiddleware() {
  return (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  }), _reduxThunk2.default), typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
  });
}

var store = (0, _redux.createStore)(_reducers2.default, composedMiddleware());

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_Locator2.default, null)
  ), container);
});

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ActionTypes = {
  FETCH_LOCATIONS: 'FETCH_LOCATIONS',

  FETCH_INFO_WINDOW: 'FETCH_INFO_WINDOW',
  FETCH_LIST: 'FETCH_LIST',

  SEARCH: 'SEARCH',

  MARKER_CLICK: 'MARKER_CLICK',
  MARKER_CLOSE: 'MARKER_CLOSE'
};

ActionTypes.FETCH_LOCATIONS_LOADING = ActionTypes.FETCH_LOCATIONS + '_LOADING';
ActionTypes.FETCH_LOCATIONS_SUCCESS = ActionTypes.FETCH_LOCATIONS + '_SUCCESS';
ActionTypes.FETCH_LOCATIONS_ERROR = ActionTypes.FETCH_LOCATIONS + '_ERROR';

ActionTypes.FETCH_INFO_WINDOW_LOADING = ActionTypes.FETCH_INFO_WINDOW + '_LOADING';
ActionTypes.FETCH_INFO_WINDOW_SUCCESS = ActionTypes.FETCH_INFO_WINDOW + '_SUCCESS';
ActionTypes.FETCH_INFO_WINDOW_ERROR = ActionTypes.FETCH_INFO_WINDOW + '_ERROR';

ActionTypes.FETCH_LIST_LOADING = ActionTypes.FETCH_LIST + '_LOADING';
ActionTypes.FETCH_LIST_SUCCESS = ActionTypes.FETCH_LIST + '_SUCCESS';
ActionTypes.FETCH_LIST_ERROR = ActionTypes.FETCH_LIST + '_ERROR';

exports.default = ActionTypes;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(75);

var _searchReducer = __webpack_require__(257);

var _searchReducer2 = _interopRequireDefault(_searchReducer);

var _mapReducer = __webpack_require__(264);

var _mapReducer2 = _interopRequireDefault(_mapReducer);

var _settingsReducer = __webpack_require__(265);

var _settingsReducer2 = _interopRequireDefault(_settingsReducer);

var _locationReducer = __webpack_require__(267);

var _locationReducer2 = _interopRequireDefault(_locationReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
  search: _searchReducer2.default,
  map: _mapReducer2.default,
  settings: _settingsReducer2.default,
  locations: _locationReducer2.default
});

exports.default = reducers;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _url = __webpack_require__(258);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = Object.assign({
  address: '',
  radius: -1,
  category: ''
}, _url2.default.parse(window.location.href, true).query);

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.SEARCH:
      return _extends({}, state, {
        address: action.payload.address,
        radius: action.payload.radius,
        category: action.payload.category
      });

    default:
      return state;
  }
}

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  current: -1,
  showCurrent: false,
  isLoading: true
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.MARKER_CLICK:
      return _extends({}, state, {
        current: action.payload.key,
        showCurrent: true
      });

    case _ActionTypes2.default.MARKER_CLOSE:
      return _extends({}, state, {
        showCurrent: false
      });

    case _ActionTypes2.default.SEARCH:
      return _extends({}, state, {
        current: -1,
        showCurrent: false
      });

    case _ActionTypes2.default.FETCH_LOCATIONS_LOADING:
      return _extends({}, state, {
        isLoading: true
      });

    case _ActionTypes2.default.FETCH_LOCATIONS_SUCCESS:
      return _extends({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _handlebars = __webpack_require__(266);

var _handlebars2 = _interopRequireDefault(_handlebars);

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  loadedSettings: false,
  loadedWindowTemplate: false,
  loadedListTemplate: false,

  infoWindowTemplate: null,
  listTemplate: null,

  unit: 'm'
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.FETCH_INFO_WINDOW_SUCCESS:
      {
        var data = action.payload.data;

        var loaded = state.loadedSettings;
        if (state.loadedListTemplate === true) {
          loaded = true;
        }

        return _extends({}, state, {
          loadedSettings: loaded,
          loadedWindowTemplate: true,
          infoWindowTemplate: _handlebars2.default.compile(data),

          unit: dynamic_locator.unit,
          clusters: dynamic_locator.clusters,
          limit: dynamic_locator.limit,
          radii: dynamic_locator.radii,
          categories: dynamic_locator.categories
        });
      }

    case _ActionTypes2.default.FETCH_LIST_SUCCESS:
      {
        var _data = action.payload.data;

        var _loaded = state.loadedSettings;
        if (state.loadedWindowTemplate === true) {
          _loaded = true;
        }

        return _extends({}, state, {
          loadedSettings: _loaded,
          loadedListTemplate: true,
          listTemplate: _handlebars2.default.compile(_data),

          unit: dynamic_locator.unit,
          clusters: dynamic_locator.clusters,
          limit: dynamic_locator.limit,
          radii: dynamic_locator.radii,
          categories: dynamic_locator.categories
        });
      }

    default:
      return state;
  }
}

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  locations: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.FETCH_LOCATIONS_SUCCESS:
      return _extends({}, state, {
        locations: action.payload.data.locations
      });

    default:
      return state;
  }
}

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

var _locationActions = __webpack_require__(129);

var _settingsActions = __webpack_require__(288);

var _SearchBar = __webpack_require__(289);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _MapContainer = __webpack_require__(292);

var _MapContainer2 = _interopRequireDefault(_MapContainer);

var _List = __webpack_require__(537);

var _List2 = _interopRequireDefault(_List);

var _Loading = __webpack_require__(593);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Locator = exports.Locator = function (_Component) {
  _inherits(Locator, _Component);

  function Locator() {
    _classCallCheck(this, Locator);

    return _possibleConstructorReturn(this, (Locator.__proto__ || Object.getPrototypeOf(Locator)).apply(this, arguments));
  }

  _createClass(Locator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _settingsActions.fetchInfoWindow)());
      dispatch((0, _settingsActions.fetchList)());
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var loadedSettings = this.props.loadedSettings;

      return loadedSettings !== nextProps.loadedSettings;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var dispatch = nextProps.dispatch,
          unit = nextProps.unit,
          address = nextProps.address,
          radius = nextProps.radius,
          category = nextProps.category;

      dispatch((0, _locationActions.fetchLocations)({
        unit: unit,
        address: address,
        radius: radius,
        category: category
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var loadedSettings = this.props.loadedSettings;

      if (loadedSettings === false) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SearchBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'map-area' },
          _react2.default.createElement(_MapContainer2.default, null),
          _react2.default.createElement(_List2.default, null),
          _react2.default.createElement(_Loading2.default, null)
        )
      );
    }
  }]);

  return Locator;
}(_react.Component);

Locator.propTypes = {
  loadedSettings: _propTypes2.default.bool.isRequired,
  unit: _propTypes2.default.string.isRequired,
  address: _propTypes2.default.string.isRequired,
  radius: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  category: _propTypes2.default.string.isRequired,
  dispatch: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  return {
    loadedSettings: state.settings.loadedSettings,

    unit: state.settings.unit,
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Locator);

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchInfoWindow = fetchInfoWindow;
exports.fetchList = fetchList;

var _axios = __webpack_require__(130);

var _axios2 = _interopRequireDefault(_axios);

var _ActionTypes = __webpack_require__(24);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchInfoWindow() {
  var loc = window.location;
  var path = dynamic_locator.infoWindowTemplatePath;

  return {
    type: _ActionTypes2.default.FETCH_INFO_WINDOW,
    payload: _axios2.default.get(loc.protocol + '//' + loc.host + path)
  };
}

function fetchList() {
  var loc = window.location;
  var path = dynamic_locator.listTemplatePath;

  return {
    type: _ActionTypes2.default.FETCH_LIST,
    payload: _axios2.default.get(loc.protocol + '//' + loc.host + path)
  };
}

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

var _locationActions = __webpack_require__(129);

var _RadiusDropDown = __webpack_require__(290);

var _RadiusDropDown2 = _interopRequireDefault(_RadiusDropDown);

var _CategoryDropDown = __webpack_require__(291);

var _CategoryDropDown2 = _interopRequireDefault(_CategoryDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = exports.SearchBar = function (_Component) {
  _inherits(SearchBar, _Component);

  _createClass(SearchBar, null, [{
    key: 'objToUrl',
    value: function objToUrl(obj) {
      var vars = '';

      Object.keys(obj).forEach(function (key) {
        var value = obj[key];

        if (value !== undefined && value !== null && value !== '') {
          vars += key + '=' + value + '&';
        }
      });

      return vars.replace(/([&\s]+$)/g, '').replace(/(\s)/g, '+');
    }
  }]);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var address = document.getElementsByName('address')[0].value;

      var radius = '';
      if (document.getElementsByName('radius')[0] !== undefined) {
        radius = document.getElementsByName('radius')[0].value;
      }

      var category = '';
      if (document.getElementsByName('category')[0] !== undefined) {
        category = document.getElementsByName('category')[0].value;
      }

      var params = {
        address: address,
        radius: radius,
        category: category
      };

      var _props = this.props,
          dispatch = _props.dispatch,
          unit = _props.unit;

      dispatch((0, _locationActions.fetchLocations)(_extends({}, params, {
        unit: unit
      })));

      var loc = window.location;
      var newurl = loc.protocol + '//' + loc.host + loc.pathname + '?' + SearchBar.objToUrl(params);
      window.history.pushState({
        path: newurl
      }, '', newurl);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          address = _props2.address,
          category = _props2.category,
          radii = _props2.radii,
          categories = _props2.categories,
          unit = _props2.unit;
      var radius = this.props.radius;

      if (typeof radius === 'string') {
        radius = Number(radius);
      }
      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'locator-search' },
        _react2.default.createElement(
          'div',
          { className: 'fieldset' },
          _react2.default.createElement(
            'div',
            { className: 'address-input form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'address', className: 'sr-only' },
              'Address or zip code'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              name: 'address',
              className: 'form-control',
              placeholder: 'address or zip code',
              defaultValue: address
            })
          ),
          _react2.default.createElement(_RadiusDropDown2.default, { radii: radii, radius: radius, unit: unit }),
          _react2.default.createElement(_CategoryDropDown2.default, { categories: categories, category: category })
        ),
        _react2.default.createElement(
          'div',
          { className: 'fieldset actions' },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', {
              type: 'submit',
              value: 'Search',
              className: 'btn'
            })
          )
        )
      );
    }
  }]);

  return SearchBar;
}(_react.Component);

SearchBar.propTypes = {
  address: _propTypes2.default.string.isRequired,
  radius: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  category: _propTypes2.default.string.isRequired,

  radii: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,

  categories: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
  unit: _propTypes2.default.string.isRequired,
  dispatch: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  return {
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category,

    radii: state.settings.radii,
    categories: state.settings.categories,

    unit: state.settings.unit
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SearchBar);

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadiusDropDown = function (_React$Component) {
  _inherits(RadiusDropDown, _React$Component);

  function RadiusDropDown() {
    _classCallCheck(this, RadiusDropDown);

    return _possibleConstructorReturn(this, (RadiusDropDown.__proto__ || Object.getPrototypeOf(RadiusDropDown)).apply(this, arguments));
  }

  _createClass(RadiusDropDown, [{
    key: 'mappedRadii',
    value: function mappedRadii() {
      var _props = this.props,
          radii = _props.radii,
          unit = _props.unit;


      return Object.keys(radii).map(function (key) {
        return _react2.default.createElement(
          'option',
          {
            value: radii[key],
            key: key
          },
          radii[key],
          ' ',
          unit
        );
      });
    }
  }, {
    key: 'defaultValue',
    value: function defaultValue() {
      var _props2 = this.props,
          radius = _props2.radius,
          radii = _props2.radii;

      var values = Object.keys(radii).map(function (key) {
        return radii[key];
      });
      if (values.indexOf(radius) > -1) {
        return radius;
      }
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var radii = this.props.radii;

      if (radii !== undefined && Object.keys(radii).length !== 0) {
        return _react2.default.createElement(
          'div',
          { className: 'radius-dropdown form-group' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'radius', className: 'sr-only' },
            'Radius'
          ),
          _react2.default.createElement(
            'select',
            {
              name: 'radius',
              className: 'form-control',
              defaultValue: this.defaultValue()
            },
            _react2.default.createElement(
              'option',
              { value: '' },
              'radius'
            ),
            this.mappedRadii()
          )
        );
      }
      return null;
    }
  }]);

  return RadiusDropDown;
}(_react2.default.Component);

RadiusDropDown.propTypes = {
  radius: _propTypes2.default.number.isRequired,

  radii: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
  unit: _propTypes2.default.string.isRequired
};

exports.default = RadiusDropDown;

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoryDropDown = function (_Component) {
  _inherits(CategoryDropDown, _Component);

  function CategoryDropDown() {
    _classCallCheck(this, CategoryDropDown);

    return _possibleConstructorReturn(this, (CategoryDropDown.__proto__ || Object.getPrototypeOf(CategoryDropDown)).apply(this, arguments));
  }

  _createClass(CategoryDropDown, [{
    key: 'mappedCategories',
    value: function mappedCategories() {
      var categories = this.props.categories;


      return categories.map(function (category) {
        return _react2.default.createElement(
          'option',
          {
            value: category.ID,
            key: category.ID
          },
          category.Name
        );
      });
    }
  }, {
    key: 'defaultValue',
    value: function defaultValue() {
      var _props = this.props,
          category = _props.category,
          categories = _props.categories;

      if (categories.filter(function (cat) {
        return cat.ID === Number(category);
      }).length) {
        return category.toString();
      }
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var categories = this.props.categories;

      if (categories !== undefined && Object.keys(categories).length !== 0) {
        return _react2.default.createElement(
          'div',
          { className: 'category-dropdown form-group' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'category', className: 'sr-only' },
            'Category'
          ),
          _react2.default.createElement(
            'select',
            {
              name: 'category',
              className: 'form-control',
              defaultValue: this.defaultValue()
            },
            _react2.default.createElement(
              'option',
              { value: '' },
              'category'
            ),
            this.mappedCategories()
          )
        );
      }
      return null;
    }
  }]);

  return CategoryDropDown;
}(_react.Component);

CategoryDropDown.propTypes = {
  category: _propTypes2.default.string.isRequired,

  categories: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired
};

exports.default = CategoryDropDown;

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

var _htmlToReact = __webpack_require__(136);

var _mapActions = __webpack_require__(146);

var _Map = __webpack_require__(342);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapContainer = exports.MapContainer = function (_Component) {
  _inherits(MapContainer, _Component);

  function MapContainer(props) {
    _classCallCheck(this, MapContainer);

    var _this = _possibleConstructorReturn(this, (MapContainer.__proto__ || Object.getPrototypeOf(MapContainer)).call(this, props));

    _this.handleMarkerClick = _this.handleMarkerClick.bind(_this);
    _this.handleMarkerClose = _this.handleMarkerClose.bind(_this);
    return _this;
  }

  _createClass(MapContainer, [{
    key: 'getMarkers',
    value: function getMarkers() {
      var _props = this.props,
          locations = _props.locations,
          template = _props.template;

      var markers = [];

      var htmlToReactParser = new _htmlToReact.Parser();

      var i = void 0;

      for (i = 0; i < locations.length; i++) {
        var loc = locations[i];
        var Lat = loc.Lat,
            Lng = loc.Lng;

        markers[markers.length] = {
          position: {
            lat: Number(Lat),
            lng: Number(Lng)
          },
          key: loc.ID,
          defaultAnimation: 2,
          infoContent: _react2.default.createElement(
            'div',
            null,
            htmlToReactParser.parse(template(loc))
          )
        };
      }
      return markers;
    }
  }, {
    key: 'handleMarkerClick',
    value: function handleMarkerClick(target) {
      var dispatch = this.props.dispatch;

      dispatch((0, _mapActions.highlightLocation)(target));
    }
  }, {
    key: 'handleMarkerClose',
    value: function handleMarkerClose(target) {
      var dispatch = this.props.dispatch;

      dispatch((0, _mapActions.closeMarker)(target));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          current = _props2.current,
          showCurrent = _props2.showCurrent,
          clusters = _props2.clusters;

      return _react2.default.createElement(
        'div',
        { className: 'map-container' },
        _react2.default.createElement(_Map2.default, {
          containerElement: _react2.default.createElement('div', { className: 'map' }),
          mapElement: _react2.default.createElement('div', { style: { height: '100%' } }),
          markers: this.getMarkers(),
          onMarkerClick: this.handleMarkerClick,
          onMarkerClose: this.handleMarkerClose,
          current: current,
          showCurrent: showCurrent,
          clusters: clusters
        })
      );
    }
  }]);

  return MapContainer;
}(_react.Component);

MapContainer.propTypes = {
  locations: _propTypes2.default.array,
  dispatch: _propTypes2.default.func.isRequired,
  current: _propTypes2.default.number.isRequired,
  showCurrent: _propTypes2.default.bool.isRequired,
  clusters: _propTypes2.default.bool.isRequired,
  template: _propTypes2.default.func.isRequired
};

MapContainer.defaultProps = {
  locations: []
};

function mapStateToProps(state) {
  return {
    current: state.map.current,
    showCurrent: state.map.showCurrent,
    clusters: state.settings.clusters,
    template: state.settings.infoWindowTemplate,
    locations: state.locations.locations
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MapContainer);

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markers = markers;
exports.Map = Map;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGoogleMaps = __webpack_require__(343);

var _MarkerClusterer = __webpack_require__(535);

var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function markers(props) {
  return props.markers.map(function (marker) {
    return _react2.default.createElement(
      _reactGoogleMaps.Marker,
      {
        key: marker.key,
        position: marker.position,
        defaultAnimation: marker.defaultAnimation,
        onClick: function onClick() {
          return props.onMarkerClick(marker);
        }
      },
      props.current === marker.key && props.showCurrent && _react2.default.createElement(
        _reactGoogleMaps.InfoWindow,
        { onCloseClick: function onCloseClick() {
            return props.onMarkerClose(marker);
          } },
        _react2.default.createElement(
          'div',
          { className: 'marker-content' },
          marker.infoContent
        )
      )
    );
  });
}

function Map(props) {
  return _react2.default.createElement(
    _reactGoogleMaps.GoogleMap,
    {
      defaultZoom: 9,
      defaultCenter: { lat: 43.8483258, lng: -87.7709294 }

    },
    props.clusters === true ? _react2.default.createElement(
      _MarkerClusterer2.default,
      {
        averageCenter: true,
        enableRetinaIcons: true,
        gridSize: 60
      },
      markers(props)
    ) : markers(props)
  );
}

Map.propTypes = {
  clusters: _propTypes2.default.bool.isRequired
};

exports.default = (0, _reactGoogleMaps.withGoogleMap)(Map);

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

var _reactVirtualized = __webpack_require__(538);

var _mapActions = __webpack_require__(146);

var _Location = __webpack_require__(592);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = exports.List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    _this.handleLocationClick = _this.handleLocationClick.bind(_this);
    _this.renderRow = _this.renderRow.bind(_this);
    _this.resizeAll = _this.resizeAll.bind(_this);

    _this.cache = new _reactVirtualized.CellMeasurerCache({ defaultHeight: 85, fixedWidth: true });
    _this.mostRecentWidth = 0;
    _this.lastDistance = -1;
    _this.resizeAllFlag = false;
    return _this;
  }

  _createClass(List, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var locations = this.props.locations;

      if (this.resizeAllFlag) {
        this.resizeAllFlag = false;
        this.cache.clearAll();
        if (this.list) {
          this.list.recomputeRowHeights();
        }
      } else if (locations !== prevProps.locations) {
        var index = prevProps.locations.length;
        this.cache.clear(index, 0);
        if (this.list) {
          this.list.recomputeRowHeights(index);
        }
      }
      this.scrollToCurrentIndex();
    }
  }, {
    key: 'resizeAll',
    value: function resizeAll() {
      this.resizeAllFlag = false;
      this.cache.clearAll();
      if (this.list) {
        this.list.recomputeRowHeights();
      }

      var locations = this.props.locations;

      if (locations.length > 0) {
        this.lastDistance = locations[0].Distance;
      }
    }
  }, {
    key: 'scrollToCurrentIndex',
    value: function scrollToCurrentIndex() {
      var _props = this.props,
          locations = _props.locations,
          current = _props.current;

      var index = locations.findIndex(function (l) {
        return l.ID === current;
      });
      if (index === -1) {
        index = 0;
      }
      this.list.scrollToRow(index);
    }
  }, {
    key: 'handleLocationClick',
    value: function handleLocationClick(target) {
      var dispatch = this.props.dispatch;

      dispatch((0, _mapActions.openMarker)(target));
    }
  }, {
    key: 'renderRow',
    value: function renderRow(_ref) {
      var index = _ref.index,
          key = _ref.key,
          style = _ref.style,
          parent = _ref.parent;
      var _props2 = this.props,
          current = _props2.current,
          search = _props2.search,
          unit = _props2.unit,
          template = _props2.template,
          locations = _props2.locations;

      var location = locations[index];
      return _react2.default.createElement(
        _reactVirtualized.CellMeasurer,
        {
          cache: this.cache,
          columnIndex: 0,
          key: key,
          parent: parent,
          rowIndex: index
        },
        _react2.default.createElement(_Location2.default, {
          key: key,
          style: style,
          location: location,
          index: index,
          current: current === location.ID,
          search: search.length > 0,
          unit: unit,
          onClick: this.handleLocationClick,
          template: template
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          locations = _props3.locations,
          current = _props3.current;

      return _react2.default.createElement(
        'div',
        { className: 'loc-list', role: 'list' },
        _react2.default.createElement(
          _reactVirtualized.AutoSizer,
          null,
          function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;

            if (_this2.mostRecentWidth && _this2.mostRecentWidth !== width || locations.length > 0 && _this2.lastDistance !== locations[0].Distance) {
              _this2.resizeAllFlag = true;
              setTimeout(_this2.resizeAll, 0);
            }

            _this2.mostRecentWidth = width;

            return _react2.default.createElement(_reactVirtualized.List, {
              ref: function ref(list) {
                _this2.list = list;
              },
              current: current,
              deferredMeasurementCache: _this2.cache,
              width: width,
              height: height,
              rowCount: locations.length,
              rowHeight: _this2.cache.rowHeight,
              rowRenderer: _this2.renderRow,
              scrollToAlignment: 'start'
            });
          }
        )
      );
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  locations: _propTypes2.default.array,
  current: _propTypes2.default.number,
  search: _propTypes2.default.string,
  unit: _propTypes2.default.string.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  template: _propTypes2.default.func.isRequired
};

List.defaultProps = {
  locations: [],
  current: -1,
  search: ''
};

function mapStateToProps(state) {
  return {
    current: state.map.current,
    search: state.search.address,
    unit: state.settings.unit,
    template: state.settings.listTemplate,
    locations: state.locations.locations
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(List);

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _htmlToReact = __webpack_require__(136);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = function (_Component) {
  _inherits(Location, _Component);

  function Location() {
    _classCallCheck(this, Location);

    return _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).apply(this, arguments));
  }

  _createClass(Location, [{
    key: 'getDistance',
    value: function getDistance() {
      var location = this.props.location;

      var distance = location.Distance;

      if (distance === -1) {
        return false;
      }

      return distance.toFixed(2);
    }
  }, {
    key: 'getDaddr',
    value: function getDaddr() {
      var location = this.props.location;

      var daddr = '';

      if (location.Address) {
        daddr += location.Address + '+';
      }

      if (location.Address2) {
        daddr += location.Address2 + '+';
      }

      if (location.City) {
        daddr += location.City + '+';
      }

      if (location.State) {
        daddr += location.State + '+';
      }

      if (location.PostalCode) {
        daddr += location.PostalCode;
      }

      return Location.cleanAddress(daddr);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          location = _props.location,
          index = _props.index,
          current = _props.current,
          search = _props.search,
          template = _props.template,
          unit = _props.unit,
          _onClick = _props.onClick,
          style = _props.style;

      var htmlToReactParser = new _htmlToReact.Parser();

      var loc = _extends({}, location, {
        Distance: this.getDistance(),
        DirectionsLink: 'http://maps.google.com/maps?saddr=' + Location.cleanAddress(search) + '&daddr=' + this.getDaddr(),
        Unit: unit,
        Number: index + 1
      });

      var id = 'loc-' + location.ID;

      var className = 'list-location';

      if (current) {
        className += ' focus';
      }

      if (index % 2 === 0) {
        className += ' even';
      }

      if (index === 0) {
        className += ' first';
      }
      return _react2.default.createElement(
        'div',
        {
          id: id,
          'data-markerid': index,
          className: className,
          onClick: function onClick() {
            return _onClick(location.ID);
          },
          style: style,
          role: 'listitem'
        },
        htmlToReactParser.parse(template(loc))
      );
    }
  }], [{
    key: 'cleanAddress',
    value: function cleanAddress(address) {
      if (address) {
        if (typeof address === 'string') {
          return address.replace(/([+\s]+$)/g, '').replace(/(\s)/g, '+');
        }
      }
      return '';
    }
  }]);

  return Location;
}(_react.Component);

Location.propTypes = {
  location: _propTypes2.default.shape({
    Title: _propTypes2.default.string,
    Address: _propTypes2.default.string,
    Address2: _propTypes2.default.string,
    City: _propTypes2.default.string,
    State: _propTypes2.default.string,
    PostalCode: _propTypes2.default.string,
    Website: _propTypes2.default.string,
    Phone: _propTypes2.default.string,
    Email: _propTypes2.default.string,
    Distance: _propTypes2.default.number
  }).isRequired,
  index: _propTypes2.default.number.isRequired,
  current: _propTypes2.default.bool.isRequired,
  search: _propTypes2.default.bool.isRequired,
  unit: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  template: _propTypes2.default.func.isRequired,

  style: _propTypes2.default.object.isRequired
};

exports.default = Location;

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = exports.Loading = function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: 'render',
    value: function render() {
      var isLoading = this.props.isLoading;

      if (isLoading) {
        return _react2.default.createElement(
          'div',
          { className: 'loading show' },
          _react2.default.createElement(
            'div',
            { className: 'loading-content' },
            _react2.default.createElement('div', { className: 'spinner' }),
            _react2.default.createElement(
              'span',
              null,
              'Loading'
            )
          )
        );
      }
      return _react2.default.createElement('div', { className: 'loading' });
    }
  }]);

  return Loading;
}(_react.Component);

Loading.propTypes = {
  isLoading: _propTypes2.default.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoading: state.map.isLoading
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Loading);

/***/ })

},[216]);
//# sourceMappingURL=main.js.map
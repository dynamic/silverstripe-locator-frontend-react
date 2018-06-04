webpackJsonp([0],{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderComponent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(23);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderComponent(component, store, selector) {
  var element = document.querySelector(selector);
  if (element) {
    _reactDom2.default.render(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      component
    ), element);
  }
}

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLocations = fetchLocations;

var _axios = __webpack_require__(134);

var _axios2 = _interopRequireDefault(_axios);

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchLocations(params) {
  var loc = window.location;

  if (params.address === '') {
    delete params.address;
  }

  if (params.radius === -1) {
    delete params.radius;
  }

  if (params.category === '') {
    delete params.category;
  }

  return {
    type: _ActionTypes2.default.FETCH_LOCATIONS,
    payload: _axios2.default.get(loc.protocol + '//' + loc.host + loc.pathname + '/json', {
      params: params
    })
  };
}

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openMarker = openMarker;
exports.closeMarker = closeMarker;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openMarker(target) {
  return {
    type: _ActionTypes2.default.MARKER_CLICK,
    payload: target
  };
}

function closeMarker() {
  return {
    type: _ActionTypes2.default.MARKER_CLOSE
  };
}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ActionTypes = {
  FETCH_LOCATIONS: 'FETCH_LOCATIONS',

  FETCH_INFO_WINDOW: 'FETCH_INFO_WINDOW',
  FETCH_LIST: 'FETCH_LIST',
  FETCH_MAP_STYLE: 'FETCH_MAP_STYLE',

  SEARCH: 'SEARCH',

  MARKER_CLICK: 'MARKER_CLICK',
  MARKER_CLOSE: 'MARKER_CLOSE',

  PAGE_CHANGE: 'PAGE_CHANGE'
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

ActionTypes.FETCH_MAP_STYLE_LOADING = ActionTypes.FETCH_MAP_STYLE + '_LOADING';
ActionTypes.FETCH_MAP_STYLE_SUCCESS = ActionTypes.FETCH_MAP_STYLE + '_SUCCESS';
ActionTypes.FETCH_MAP_STYLE_ERROR = ActionTypes.FETCH_MAP_STYLE + '_ERROR';

exports.default = ActionTypes;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(23);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(77);

var _reactRedux = __webpack_require__(33);

var _reduxThunk = __webpack_require__(260);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(261);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = __webpack_require__(263);

var _reducers2 = _interopRequireDefault(_reducers);

var _renderComponent = __webpack_require__(132);

var _renderComponent2 = _interopRequireDefault(_renderComponent);

var _Loading = __webpack_require__(275);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composedMiddleware() {
  return (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  }), _reduxThunk2.default), typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
  });
}

var store = (0, _redux.createStore)(_reducers2.default, composedMiddleware());

document.addEventListener('DOMContentLoaded', function () {
  (0, _renderComponent2.default)(_react2.default.createElement(_Loading2.default, { store: store }), store, '.locator .loading');
});

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(77);

var _searchReducer = __webpack_require__(264);

var _searchReducer2 = _interopRequireDefault(_searchReducer);

var _mapReducer = __webpack_require__(270);

var _mapReducer2 = _interopRequireDefault(_mapReducer);

var _settingsReducer = __webpack_require__(271);

var _settingsReducer2 = _interopRequireDefault(_settingsReducer);

var _locationReducer = __webpack_require__(273);

var _locationReducer2 = _interopRequireDefault(_locationReducer);

var _listReducer = __webpack_require__(274);

var _listReducer2 = _interopRequireDefault(_listReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
  search: _searchReducer2.default,
  map: _mapReducer2.default,
  settings: _settingsReducer2.default,
  locations: _locationReducer2.default,
  list: _listReducer2.default
});

exports.default = reducers;

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _url = __webpack_require__(131);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = Object.assign({
  address: '',
  radius: -1,
  category: ''
}, _url2.default.parse(window.location.href, true).query);

delete defaultState.page;

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

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  current: -1,
  showCurrent: false,
  isLoading: true,

  center: {
    Lat: 91.0,
    Lng: 181.0
  }
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.MARKER_CLICK:
      return _extends({}, state, {
        current: action.payload.ID,
        showCurrent: true,
        center: {
          Lat: action.payload.Lat,
          Lng: action.payload.Lng
        }
      });

    case _ActionTypes2.default.MARKER_CLOSE:
      return _extends({}, state, {
        showCurrent: false,
        center: defaultState.center
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
      {
        var center = action.payload !== undefined && action.payload.data.center !== undefined ? action.payload.data.center : defaultState.center;
        return _extends({}, state, {
          isLoading: false,
          center: center
        });
      }

    default:
      return state;
  }
}

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _handlebars = __webpack_require__(272);

var _handlebars2 = _interopRequireDefault(_handlebars);

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  loadedSettings: false,
  loadedWindowTemplate: false,
  loadedListTemplate: false,
  loadedMapStyle: false,

  infoWindowTemplate: null,
  listTemplate: null,
  mapStyle: null,
  markerImagePath: false,

  unit: 'm',

  defaultCenter: {
    lat: 0,
    lng: 0
  },
  autocomplete: false,
  defaultLimit: 20,

  emailText: ss.i18n._t('Locator.EMAIL_TEXT', 'Email'),

  websiteText: ss.i18n._t('Locator.WEBSITE_TEXT', 'Website'),

  directionsText: ss.i18n._t('Locator.DIRECTIONS_TEXT', 'Directions')
};

defaultState.unitText = ss.i18n._t('Locator.UNIT.' + defaultState.unit, 'mi');

function settings() {
  return {
    unit: dynamic_locator.unit,
    clusters: dynamic_locator.clusters,
    limit: dynamic_locator.limit,
    radii: dynamic_locator.radii,
    categories: dynamic_locator.categories,
    defaultCenter: {
      lat: dynamic_locator.defaultCenter.lat,
      lng: dynamic_locator.defaultCenter.lng
    },
    autocomplete: dynamic_locator.autocomplete,
    markerImagePath: dynamic_locator.markerImagePath
  };
}

function didSettingsLoad() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var loadedListTemplate = state.loadedListTemplate,
      loadedWindowTemplate = state.loadedWindowTemplate,
      loadedMapStyle = state.loadedMapStyle;

  return loadedListTemplate === true && loadedWindowTemplate === true && loadedMapStyle === true;
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.FETCH_INFO_WINDOW_SUCCESS:
      {
        var data = action.payload.data;

        var loaded = didSettingsLoad(_extends({}, state, {
          loadedWindowTemplate: true
        }));

        return _extends({}, state, settings(), {
          loadedSettings: loaded,
          loadedWindowTemplate: true,
          infoWindowTemplate: _handlebars2.default.compile(data)
        });
      }

    case _ActionTypes2.default.FETCH_LIST_SUCCESS:
      {
        var _data = action.payload.data;

        var _loaded = didSettingsLoad(_extends({}, state, {
          loadedListTemplate: true
        }));

        return _extends({}, state, settings(), {
          loadedSettings: _loaded,
          loadedListTemplate: true,
          listTemplate: _handlebars2.default.compile(_data)
        });
      }

    case _ActionTypes2.default.FETCH_MAP_STYLE_SUCCESS:
      {
        var _data2 = action.payload.data;

        var _loaded2 = didSettingsLoad(_extends({}, state, {
          loadedMapStyle: true
        }));

        return _extends({}, state, settings(), {
          loadedSettings: _loaded2,
          loadedMapStyle: true,
          mapStyle: _data2
        });
      }

    case _ActionTypes2.default.FETCH_MAP_STYLE_ERROR:
      {
        if (action.payload === _ActionTypes2.default.FETCH_MAP_STYLE_ERROR) {
          var _loaded3 = didSettingsLoad(_extends({}, state, {
            loadedMapStyle: true
          }));

          return _extends({}, state, settings(), {
            loadedSettings: _loaded3,
            loadedMapStyle: true
          });
        }
        return state;
      }

    default:
      return state;
  }
}

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(18);

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

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _url = __webpack_require__(131);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var page = _url2.default.parse(window.location.href, true).query.page;

var defaultState = {
  page: Number.isNaN(Number(page)) ? 1 : Number(page)
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2.default.PAGE_CHANGE:
      return _extends({}, state, {
        page: action.payload
      });

    default:
      return state;
  }
}

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(33);

var _renderComponent = __webpack_require__(132);

var _renderComponent2 = _interopRequireDefault(_renderComponent);

var _locationActions = __webpack_require__(133);

var _settingsActions = __webpack_require__(295);

var _SearchBar = __webpack_require__(296);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _MapContainer = __webpack_require__(308);

var _MapContainer2 = _interopRequireDefault(_MapContainer);

var _List = __webpack_require__(551);

var _List2 = _interopRequireDefault(_List);

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _settingsActions.fetchInfoWindow)());
      dispatch((0, _settingsActions.fetchList)());
      dispatch((0, _settingsActions.fetchMapStyle)());
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          loadedSettings = _props.loadedSettings,
          isLoading = _props.isLoading;

      return loadedSettings !== nextProps.loadedSettings || isLoading !== nextProps.isLoading;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      var _props2 = this.props,
          loadedSettings = _props2.loadedSettings,
          store = _props2.store;

      if (loadedSettings !== nextProps.loadedSettings) {
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

      (0, _renderComponent2.default)(_react2.default.createElement(_SearchBar2.default, null), store, '.locator .search');
      (0, _renderComponent2.default)(_react2.default.createElement(_List2.default, null), store, '.locator .list');
      (0, _renderComponent2.default)(_react2.default.createElement(_MapContainer2.default, null), store, '.locator .map');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          isLoading = _props3.isLoading,
          loadedSettings = _props3.loadedSettings;

      if (isLoading || !loadedSettings) {
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
    isLoading: state.map.isLoading,

    loadedSettings: state.settings.loadedSettings,
    unit: state.settings.unit,
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Loading);

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchInfoWindow = fetchInfoWindow;
exports.fetchList = fetchList;
exports.fetchMapStyle = fetchMapStyle;

var _axios = __webpack_require__(134);

var _axios2 = _interopRequireDefault(_axios);

var _ActionTypes = __webpack_require__(18);

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

function fetchMapStyle() {
  var loc = window.location;
  var path = dynamic_locator.mapStylePath;

  if (path === '') {
    return {
      type: _ActionTypes2.default.FETCH_MAP_STYLE_ERROR,
      payload: _ActionTypes2.default.FETCH_MAP_STYLE_ERROR
    };
  }

  return {
    type: _ActionTypes2.default.FETCH_MAP_STYLE,
    payload: _axios2.default.get(loc.protocol + '//' + loc.host + '/' + path)
  };
}

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(33);

var _reactFontawesome = __webpack_require__(297);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _fontawesomeFreeSolid = __webpack_require__(299);

var _reactPlacesAutocomplete = __webpack_require__(300);

var _reactPlacesAutocomplete2 = _interopRequireDefault(_reactPlacesAutocomplete);

var _locationActions = __webpack_require__(133);

var _searchActions = __webpack_require__(305);

var _listActions = __webpack_require__(82);

var _RadiusDropDown = __webpack_require__(306);

var _RadiusDropDown2 = _interopRequireDefault(_RadiusDropDown);

var _CategoryDropDown = __webpack_require__(307);

var _CategoryDropDown2 = _interopRequireDefault(_CategoryDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  }, {
    key: 'getDropdownValue',
    value: function getDropdownValue(name) {
      if (document.getElementsByName(name)[0] !== undefined) {
        return document.getElementsByName(name)[0].value;
      }
      return '';
    }
  }]);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.state = {
      showFilter: false
    };
    _this.searchAddress = props.address;

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleFilter = _this.handleFilter.bind(_this);
    _this.handleAddressChange = _this.handleAddressChange.bind(_this);
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (typeof event === 'string' || event instanceof String) {
        this.searchAddress = event;
        document.getElementsByName('address')[0].value = event;
      } else {
        event.preventDefault();
      }

      var address = document.getElementsByName('address')[0].value;
      var radius = SearchBar.getDropdownValue('radius');
      var category = SearchBar.getDropdownValue('category');

      var params = {
        address: address,
        radius: radius,
        category: category
      };

      var _props = this.props,
          dispatch = _props.dispatch,
          unit = _props.unit;

      dispatch((0, _searchActions.search)({
        address: address,
        radius: radius,
        category: category
      }));

      dispatch((0, _locationActions.fetchLocations)(_extends({}, params, {
        unit: unit
      })));

      dispatch((0, _listActions.changePage)(1));

      var loc = window.location;
      var newurl = loc.protocol + '//' + loc.host + loc.pathname + '?' + SearchBar.objToUrl(params);
      window.history.pushState({
        path: newurl
      }, '', newurl);
    }
  }, {
    key: 'handleFilter',
    value: function handleFilter(event) {
      this.setState({
        showFilter: !this.state.showFilter
      });
    }
  }, {
    key: 'handleAddressChange',
    value: function handleAddressChange(searchAddress) {
      this.searchAddress = searchAddress;
    }
  }, {
    key: 'getAddressInput',
    value: function getAddressInput() {
      var _props2 = this.props,
          address = _props2.address,
          radii = _props2.radii,
          center = _props2.center,
          autocomplete = _props2.autocomplete;

      if (autocomplete === true) {
        var inputProps = {
          value: this.searchAddress,
          onChange: this.handleAddressChange,
          placeholder: ss.i18n._t('Locator.ADDRESS_FIELD', 'Address or zip code'),
          name: 'address'
        };
        var cssClasses = {
          root: 'form-control autocomplete-root',
          input: 'form-control'
        };
        var options = {
          location: new google.maps.LatLng(center.lat, center.lng),
          radius: Math.max.apply(Math, _toConsumableArray(radii))
        };
        return _react2.default.createElement(_reactPlacesAutocomplete2.default, {
          inputProps: inputProps,
          classNames: cssClasses,
          onSelect: this.handleSubmit,
          onEnterKeyDown: this.handleSubmit,
          options: options
        });
      }
      return _react2.default.createElement('input', {
        type: 'text',
        name: 'address',
        className: 'form-control',
        placeholder: ss.i18n._t('Locator.ADDRESS_FIELD', 'Address or zip code'),
        defaultValue: address
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          address = _props3.address,
          category = _props3.category,
          radii = _props3.radii,
          categories = _props3.categories,
          unit = _props3.unit,
          autocomplete = _props3.autocomplete;
      var radius = this.props.radius;

      if (typeof radius === 'string') {
        radius = Number(radius);
      }

      var hasFilter = category !== '' || !(radius === '' || radius < 1);

      var filterIndicatorClass = hasFilter ? 'filter-icon' : 'filter-icon no-show';
      var filterClasses = this.state.showFilter ? 'filter open' : 'filter closed';

      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'locator-search' },
        _react2.default.createElement(
          'div',
          { className: 'fieldset' },
          _react2.default.createElement(
            'div',
            { className: 'always-shown' },
            _react2.default.createElement(
              'div',
              { className: 'address-input input-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'address', className: 'sr-only' },
                ss.i18n._t('Locator.ADDRESS_FIELD', 'Address or zip code')
              ),
              this.getAddressInput(),
              _react2.default.createElement(
                'span',
                { className: 'input-group-btn' },
                _react2.default.createElement(
                  'button',
                  _defineProperty({
                    className: 'btn btn-secondary',
                    type: 'button'
                  }, 'type', 'submit'),
                  _react2.default.createElement(_reactFontawesome2.default, { icon: _fontawesomeFreeSolid.faSearch }),
                  _react2.default.createElement(
                    'span',
                    { className: 'sr-only sr-only-focusable' },
                    ss.i18n._t('Locator.SEARCH_BUTTON', 'Search')
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'filter-button' },
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-link', onClick: this.handleFilter },
                ss.i18n._t('Locator.FILTER_BUTTON', 'Filter'),
                _react2.default.createElement(_reactFontawesome2.default, { icon: _fontawesomeFreeSolid.faCheckCircle, className: filterIndicatorClass })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: filterClasses },
            _react2.default.createElement(_CategoryDropDown2.default, { categories: categories, category: category }),
            _react2.default.createElement(_RadiusDropDown2.default, { radii: radii, radius: radius, unit: unit })
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
  autocomplete: _propTypes2.default.bool.isRequired,
  center: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }).isRequired,
  dispatch: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  return {
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category,

    radii: state.settings.radii,
    categories: state.settings.categories,

    unit: state.settings.unit,
    autocomplete: state.settings.autocomplete,
    center: state.settings.defaultCenter
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SearchBar);

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function search() {
  var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    type: _ActionTypes2.default.SEARCH,
    payload: inputs
  };
}

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

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
            ss.i18n._t('Locator.RADIUS_FIELD', 'Radius')
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
              ss.i18n._t('Locator.RADIUS_FIELD', 'Radius')
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

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

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
            ss.i18n._t('Locator.CATEGORY_FIELD', 'Category')
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
              ss.i18n._t('Locator.CATEGORY_FIELD', 'Category')
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

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(33);

var _htmlToReact = __webpack_require__(140);

var _animatedScrollTo = __webpack_require__(150);

var _animatedScrollTo2 = _interopRequireDefault(_animatedScrollTo);

var _mapActions = __webpack_require__(151);

var _listActions = __webpack_require__(82);

var _Map = __webpack_require__(358);

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
          template = _props.template,
          emailText = _props.emailText,
          websiteText = _props.websiteText,
          markerImagePath = _props.markerImagePath;

      var markers = [];

      var htmlToReactParser = new _htmlToReact.Parser();

      var i = void 0;

      for (i = 0; i < locations.length; i++) {
        var location = locations[i];
        var Lat = location.Lat,
            Lng = location.Lng;

        var loc = _extends({}, location, {
          EmailText: emailText,
          WebsiteText: websiteText
        });
        markers[markers.length] = {
          position: {
            lat: Number(Lat),
            lng: Number(Lng)
          },
          key: location.ID,
          defaultAnimation: 2,
          defaultIcon: markerImagePath,
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
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          locations = _props2.locations,
          defaultLimit = _props2.defaultLimit;

      var location = locations.find(function (loc) {
        return loc.ID === target.key;
      });
      dispatch((0, _mapActions.openMarker)(location));

      var index = locations.findIndex(function (l) {
        return l.ID === target.key;
      }) + 1;
      var page = Math.ceil(index / defaultLimit);

      dispatch((0, _listActions.changePage)(page));

      var element = document.getElementById('loc-' + target.key);
      if (element !== null) {
        var scrollContainer = document.getElementsByClassName('loc-list-inner')[0];
        (0, _animatedScrollTo2.default)(element, {
          element: scrollContainer,
          minDuration: 500,
          maxDuration: 750,
          cancelOnUserAction: false
        });
      }
    }
  }, {
    key: 'handleMarkerClose',
    value: function handleMarkerClose() {
      var dispatch = this.props.dispatch;

      dispatch((0, _mapActions.closeMarker)());
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          current = _props3.current,
          showCurrent = _props3.showCurrent,
          clusters = _props3.clusters,
          center = _props3.center,
          defaultCenter = _props3.defaultCenter,
          mapStyle = _props3.mapStyle;

      return _react2.default.createElement(
        'div',
        { className: 'map-container' },
        _react2.default.createElement(_Map2.default, {
          containerElement: _react2.default.createElement('div', { className: 'map' }),
          mapElement: _react2.default.createElement('div', { style: { height: '100%' } }),
          mapStyle: mapStyle,
          markers: this.getMarkers(),
          onMarkerClick: this.handleMarkerClick,
          onMarkerClose: this.handleMarkerClose,
          current: current,
          showCurrent: showCurrent,
          clusters: clusters,
          center: center,
          defaultCenter: defaultCenter
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
  template: _propTypes2.default.func.isRequired,
  mapStyle: _propTypes2.default.oneOfType([function () {
    return null;
  }, _propTypes2.default.object]),
  markerImagePath: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]).isRequired,
  center: _propTypes2.default.shape({
    Lat: _propTypes2.default.number.isRequired,
    Lng: _propTypes2.default.number.isRequired
  }).isRequired,
  defaultCenter: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }).isRequired
};

MapContainer.defaultProps = {
  locations: [],
  mapStyle: null
};

function mapStateToProps(state) {
  return {
    current: state.map.current,
    showCurrent: state.map.showCurrent,
    clusters: state.settings.clusters,
    template: state.settings.infoWindowTemplate,
    mapStyle: state.settings.mapStyle,
    markerImagePath: state.settings.markerImagePath,
    locations: state.locations.locations,
    center: state.map.center,
    defaultCenter: state.settings.defaultCenter,

    defaultLimit: state.settings.defaultLimit,
    emailText: state.settings.emailText,
    websiteText: state.settings.websiteText
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MapContainer);

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.markers = markers;
exports.Map = Map;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGoogleMaps = __webpack_require__(359);

var _MarkerClusterer = __webpack_require__(549);

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
        defaultIcon: marker.defaultIcon,
        onClick: function onClick() {
          return props.onMarkerClick(marker);
        }
      },
      props.current === marker.key && props.showCurrent && _react2.default.createElement(
        _reactGoogleMaps.InfoWindow,
        { onCloseClick: function onCloseClick() {
            return props.onMarkerClose();
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
  var opts = {};
  if (props.center.Lat !== 91 && props.center.Lng !== 181) {
    opts.center = {
      lat: props.center.Lat,
      lng: props.center.Lng
    };
  }

  var defaultOptions = {};
  if (props.mapStyle !== null) {
    defaultOptions.styles = props.mapStyle;
  }

  return _react2.default.createElement(
    _reactGoogleMaps.GoogleMap,
    _extends({
      defaultZoom: 9,
      defaultCenter: { lat: props.defaultCenter.lat, lng: props.defaultCenter.lng },
      defaultOptions: defaultOptions
    }, opts),
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
  clusters: _propTypes2.default.bool.isRequired,
  mapStyle: _propTypes2.default.oneOfType([function () {
    return null;
  }, _propTypes2.default.object]),
  center: _propTypes2.default.shape({
    Lat: _propTypes2.default.number.isRequired,
    Lng: _propTypes2.default.number.isRequired
  }).isRequired,
  defaultCenter: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }).isRequired
};

Map.defaultProps = {
  mapStyle: null
};

exports.default = (0, _reactGoogleMaps.withGoogleMap)(Map);

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(33);

var _reactVirtualized = __webpack_require__(552);

var _animatedScrollTo = __webpack_require__(150);

var _animatedScrollTo2 = _interopRequireDefault(_animatedScrollTo);

var _mapActions = __webpack_require__(151);

var _listActions = __webpack_require__(82);

var _Location = __webpack_require__(604);

var _Location2 = _interopRequireDefault(_Location);

var _Pagination = __webpack_require__(605);

var _Pagination2 = _interopRequireDefault(_Pagination);

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
    _this.handlePaginateClick = _this.handlePaginateClick.bind(_this);
    return _this;
  }

  _createClass(List, [{
    key: 'handleLocationClick',
    value: function handleLocationClick(target) {
      var _props = this.props,
          dispatch = _props.dispatch,
          locations = _props.locations;

      var location = locations.find(function (loc) {
        return loc.ID === target;
      });
      dispatch((0, _mapActions.openMarker)(location));

      var element = document.getElementById('loc-' + target);
      if (element !== null) {
        var scrollContainer = document.getElementsByClassName('loc-list-inner')[0];
        (0, _animatedScrollTo2.default)(element, {
          element: scrollContainer,
          minDuration: 500,
          maxDuration: 750,
          cancelOnUserAction: false
        });
      }
    }
  }, {
    key: 'handlePaginateClick',
    value: function handlePaginateClick(page) {
      var dispatch = this.props.dispatch;

      dispatch((0, _listActions.changePage)(page));
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      var _this2 = this;

      var _props2 = this.props,
          page = _props2.page,
          defaultLimit = _props2.defaultLimit,
          locations = _props2.locations,
          current = _props2.current,
          search = _props2.search,
          unit = _props2.unit,
          unitText = _props2.unitText,
          emailText = _props2.emailText,
          websiteText = _props2.websiteText,
          directionsText = _props2.directionsText,
          template = _props2.template;

      var realPage = page - 1 ? page - 1 : 0;

      var lim = defaultLimit;

      return locations.slice(realPage * lim, page * lim).map(function (location, index) {
        return _react2.default.createElement(_Location2.default, {
          key: location.ID,
          location: location,
          index: realPage * lim + index,
          current: current === location.ID,
          search: search.length > 0,
          unit: unitText,
          websiteText: websiteText,
          directionsText: directionsText,
          emailText: emailText,
          onClick: _this2.handleLocationClick,
          template: template
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          locations = _props3.locations,
          current = _props3.current,
          page = _props3.page,
          defaultLimit = _props3.defaultLimit;

      return _react2.default.createElement(
        'div',
        { className: 'loc-list', role: 'list' },
        _react2.default.createElement(
          'div',
          { className: 'loc-list-container' },
          _react2.default.createElement(
            _reactVirtualized.AutoSizer,
            null,
            function (_ref) {
              var width = _ref.width,
                  height = _ref.height;
              return _react2.default.createElement(
                'div',
                { className: 'loc-list-inner', style: { width: width, height: height } },
                _this3.renderList()
              );
            }
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'list-pagination' },
          _react2.default.createElement(_Pagination2.default, {
            page: page,
            count: locations.length,
            defaultLimit: defaultLimit,
            goToPage: this.handlePaginateClick
          })
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
  template: _propTypes2.default.func.isRequired,
  defaultLimit: _propTypes2.default.number.isRequired,
  page: _propTypes2.default.number.isRequired,
  unitText: _propTypes2.default.string.isRequired,
  directionsText: _propTypes2.default.string.isRequired,
  emailText: _propTypes2.default.string.isRequired,
  websiteText: _propTypes2.default.string.isRequired
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
    unitText: state.settings.unitText,
    directionsText: state.settings.directionsText,
    emailText: state.settings.emailText,
    websiteText: state.settings.websiteText,
    template: state.settings.listTemplate,
    locations: state.locations.locations,
    defaultLimit: state.settings.defaultLimit,
    page: state.list.page
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(List);

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _htmlToReact = __webpack_require__(140);

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
    key: 'getClassName',
    value: function getClassName() {
      var _props = this.props,
          index = _props.index,
          current = _props.current;

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
      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          location = _props2.location,
          index = _props2.index,
          search = _props2.search,
          template = _props2.template,
          unit = _props2.unit,
          directionsText = _props2.directionsText,
          emailText = _props2.emailText,
          websiteText = _props2.websiteText,
          _onClick = _props2.onClick;

      var htmlToReactParser = new _htmlToReact.Parser();

      var loc = _extends({}, location, {
        Distance: this.getDistance(),
        DirectionsLink: 'http://maps.google.com/maps?saddr=' + Location.cleanAddress(search) + '&daddr=' + this.getDaddr(),
        DirectionsText: directionsText,
        EmailText: emailText,
        WebsiteText: websiteText,
        Unit: unit,
        Number: index + 1
      });

      var id = 'loc-' + location.ID;
      var className = this.getClassName();

      return _react2.default.createElement(
        'div',
        {
          id: id,
          'data-markerid': index,
          className: className,
          onClick: function onClick() {
            return _onClick(location.ID);
          },
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
  template: _propTypes2.default.func.isRequired
};

exports.default = Location;

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PaginationEnd = __webpack_require__(606);

var _PaginationEnd2 = _interopRequireDefault(_PaginationEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'getLastPage',
    value: function getLastPage() {
      var _props = this.props,
          count = _props.count,
          defaultLimit = _props.defaultLimit;

      var lim = defaultLimit;

      return Math.ceil(count / defaultLimit);
    }
  }, {
    key: 'getPageNumbers',
    value: function getPageNumbers() {
      var page = this.props.page;

      var lastPage = this.getLastPage();
      var range = 2;

      var rangeStart = page - range;
      var rangeEnd = page + range;

      if (rangeEnd > lastPage) {
        rangeEnd = lastPage;
        rangeStart = lastPage - range * 2;
        rangeStart = rangeStart < 1 ? 1 : rangeStart;
      }

      if (rangeStart <= 1) {
        rangeStart = 1;
        rangeEnd = Math.min(range * 2 + 1, lastPage);
      }

      return Array(rangeEnd - rangeStart + 1).fill().map(function (_, index) {
        return rangeStart + index;
      });
    }
  }, {
    key: 'renderPageLinks',
    value: function renderPageLinks() {
      var _props2 = this.props,
          page = _props2.page,
          goToPage = _props2.goToPage;

      var numbers = this.getPageNumbers();

      return numbers.map(function (num) {
        if (page === num) {
          return _react2.default.createElement(
            'li',
            { className: 'page-item active', key: num },
            _react2.default.createElement(
              'span',
              { className: 'page-link' },
              num,
              _react2.default.createElement(
                'span',
                { className: 'sr-only' },
                '(',
                ss.i18n._t('Locator.CURRENT', 'Current'),
                ')'
              )
            )
          );
        } else {
          return _react2.default.createElement(
            'li',
            { className: 'page-item', key: num, onClick: function onClick() {
                return goToPage(num);
              } },
            _react2.default.createElement(
              'a',
              { className: 'page-link' },
              num
            )
          );
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          count = _props3.count,
          page = _props3.page,
          goToPage = _props3.goToPage;

      var previousClasses = page <= 1 ? "page-item disabled" : "page-item";
      var previousAction = page <= 1 ? function () {} : function () {
        return goToPage(page - 1);
      };

      var nextClasses = page >= this.getLastPage() ? "page-item disabled" : "page-item";
      var nextAction = page >= this.getLastPage() ? function () {} : function () {
        return goToPage(page + 1);
      };

      if (this.getPageNumbers().length > 1) {
        return _react2.default.createElement(
          'ul',
          { className: 'pagination' },
          _react2.default.createElement(_PaginationEnd2.default, {
            text: String.fromCharCode(171),
            label: ss.i18n._t('Locator.PREVIOUS_PAGE', 'Previous'),
            classes: previousClasses,
            action: previousAction
          }),
          this.renderPageLinks(),
          _react2.default.createElement(_PaginationEnd2.default, {
            text: String.fromCharCode(187),
            label: ss.i18n._t('Locator.NEXT_PAGE', 'Next'),
            classes: nextClasses,
            action: nextAction
          })
        );
      }
      return null;
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  page: _propTypes2.default.number.isRequired,
  count: _propTypes2.default.number.isRequired,
  defaultLimit: _propTypes2.default.number.isRequired,
  goToPage: _propTypes2.default.func.isRequired
};

exports.default = Pagination;

/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationEnd = function (_Component) {
  _inherits(PaginationEnd, _Component);

  function PaginationEnd() {
    _classCallCheck(this, PaginationEnd);

    return _possibleConstructorReturn(this, (PaginationEnd.__proto__ || Object.getPrototypeOf(PaginationEnd)).apply(this, arguments));
  }

  _createClass(PaginationEnd, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          label = _props.label,
          classes = _props.classes,
          action = _props.action;

      return _react2.default.createElement(
        'li',
        { className: classes },
        _react2.default.createElement(
          'a',
          { className: 'page-link', 'aria-label': label, onClick: action },
          _react2.default.createElement(
            'span',
            { 'aria-hidden': 'true' },
            text
          ),
          _react2.default.createElement(
            'span',
            { className: 'sr-only' },
            label
          )
        )
      );
    }
  }]);

  return PaginationEnd;
}(_react.Component);

PaginationEnd.propTypes = {
  text: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  classes: _propTypes2.default.string.isRequired,
  action: _propTypes2.default.func.isRequired
};

exports.default = PaginationEnd;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePage = changePage;

var _ActionTypes = __webpack_require__(18);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function changePage(page) {
  return {
    type: _ActionTypes2.default.PAGE_CHANGE,
    payload: page
  };
}

/***/ })

},[225]);
//# sourceMappingURL=main.js.map
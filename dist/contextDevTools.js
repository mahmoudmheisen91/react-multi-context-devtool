"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevContext = exports.DevToolProvider = exports.devToolExtension = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _jsxRuntime = require("react/jsx-runtime");

var _window;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const devToolExtension = typeof window === "object" && ((_window = window) === null || _window === void 0 ? void 0 : _window.__REDUX_DEVTOOLS_EXTENSION__);
exports.devToolExtension = devToolExtension;
const initialState = {
  globalState: {}
};

const devToolReducer = function devToolReducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  const {
    type,
    payload
  } = action;
  return _objectSpread(_objectSpread({}, state), {}, {
    globalState: _objectSpread(_objectSpread({}, state.globalState), {}, {
      [type]: payload
    })
  });
};

const DevToolProvider = _ref => {
  let {
    devToolConfig = {},
    children
  } = _ref;
  const [type, setType] = (0, _react.useState)("INIT");
  const [isDevelopment, setIsDevelopment] = (0, _react.useState)(true);
  const [devToolOptions, setDevToolOptions] = (0, _react.useState)({});
  const [devToolState, dispatch] = (0, _react.useReducer)(devToolReducer, initialState);
  const devTool = (0, _react.useRef)(null); // create devtool with options

  const createDevTool = (0, _react.useCallback)(() => {
    if (isDevelopment && devToolExtension) {
      return devToolExtension.connect(devToolOptions);
    } else {
      return f => f;
    }
  }, [isDevelopment, devToolOptions]);
  const devToolDispatch = (0, _react.useCallback)((action, type) => {
    dispatch(action);
    setType(type);
  }, [dispatch]);
  (0, _react.useEffect)(() => {
    let isDev = false;

    if (!(devToolConfig !== null && devToolConfig !== void 0 && devToolConfig.env)) {
      isDev = process.env.NODE_ENV === "development";
    } else if (typeof devToolConfig.env === "string") {
      isDev = process.env.NODE_ENV === devToolConfig.env;
    } else if (Array.isArray(devToolConfig.env)) {
      devToolConfig.env.map(item => {
        isDev = isDev || process.env.NODE_ENV === item;
        return item;
      });
    } else {
      isDev = process.env.NODE_ENV === "development";
    }

    setIsDevelopment(isDev);
    setDevToolOptions(devToolConfig === null || devToolConfig === void 0 ? void 0 : devToolConfig.reduxDevToolOptions);
  }, [devToolConfig]);
  (0, _react.useEffect)(() => {
    devTool.current = createDevTool();
    isDevelopment && devTool.current.send({
      type: "INIT"
    }, _objectSpread({}, initialState));
  }, [createDevTool, isDevelopment]);
  (0, _react.useEffect)(() => {
    isDevelopment && devTool.current.send({
      type
    }, _objectSpread({}, devToolState));
  }, [devToolState, type, devTool, isDevelopment]);
  const values = (0, _react.useMemo)(() => {
    return {
      devToolState,
      isDevelopment,
      devToolDispatch
    };
  }, [devToolState, isDevelopment, devToolDispatch]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DevContext.Provider, {
    value: values,
    children: children
  });
};

exports.DevToolProvider = DevToolProvider;
const DevContext = /*#__PURE__*/(0, _react.createContext)(initialState);
exports.DevContext = DevContext;
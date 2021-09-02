"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDevToolDispatch = useDevToolDispatch;

var _react = require("react");

var _contextDevTools = require("./contextDevTools");

function useDevToolDispatch(dispatch, state, reducer, contextName) {
  const {
    devToolDispatch,
    isDevelopment
  } = (0, _react.useContext)(_contextDevTools.DevContext);

  const _dispatch = (0, _react.useCallback)((dispatch, state, reducer, contextName, action) => {
    if (isDevelopment && _contextDevTools.devToolExtension) {
      const newState = reducer(state, action);
      devToolDispatch({
        type: contextName,
        payload: newState
      }, action.type);
    }

    return dispatch(action);
  }, [devToolDispatch, isDevelopment]);

  return _dispatch.bind(this, dispatch, state, reducer, contextName);
}
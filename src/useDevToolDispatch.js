import { useContext, useCallback } from "react";
import { DevContext, devToolExtension } from "./contextDevTools";

export function useDevToolDispatch(dispatch, state, reducer, contextName) {
  const { devToolDispatch, isDevelopment } = useContext(DevContext);

  const _dispatch = useCallback(
    (dispatch, state, reducer, contextName, action) => {
      if (isDevelopment && devToolExtension) {
        const newState = reducer(state, action);
        devToolDispatch({ type: contextName, payload: newState }, action.type);
      }
      return dispatch(action);
    },
    [devToolDispatch, isDevelopment]
  );

  return _dispatch.bind(this, dispatch, state, reducer, contextName);
}

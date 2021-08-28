import { useReducer as useReactReducer } from "react";
import {
  initialState as context_0_state,
  reducer as context_0_reducer,
} from "./context_0";

// only for development purposes
const isDevelopment = process.env.NODE_ENV === "development";
const devToolExtension = window?.__REDUX_DEVTOOLS_EXTENSION__;

// devtool extension options
const devToolOptions = {
  name: "My-Context",
  trace: true,
};

// create devtool with options
const createDevTool = (options) => {
  if (isDevelopment && typeof window === "object" && devToolExtension) {
    return devToolExtension.connect(options);
  } else {
    return (f) => f;
  }
};

const devTool = createDevTool(devToolOptions);

export const useReducer = (reducer, initialState) => {
  const [state, dispatch] = useReactReducer(reducer, initialState);

  let oldState = context_0_state;

  function newDispatch(action) {
    if (isDevelopment && typeof window === "object" && devToolExtension) {
      const newState = context_0_reducer(oldState, action);
      oldState = newState;
      devTool.send({ ...action }, { context_0: newState });
    }
    return dispatch(action);
  }

  return [state, newDispatch];
};

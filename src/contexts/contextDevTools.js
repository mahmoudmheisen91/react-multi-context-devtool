import {
  useReducer,
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
  useContext,
} from "react";

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

const initialState = {
  globalState: {},
};

const devToolReducer = (state = initialState, action) => {
  const { type, payload } = action;

  return {
    ...state,
    globalState: {
      ...state.globalState,
      [type]: payload,
    },
  };
};

export const DevContextProvider = ({ children }) => {
  const [type, setType] = useState("INIT");

  const [devToolState, dispatch] = useReducer(devToolReducer, initialState);

  const devToolDispatch = useCallback(
    (action, type) => {
      dispatch(action);
      setType(type);
    },
    [dispatch]
  );

  useEffect(() => {
    devTool.send({ type }, { ...devToolState });
  }, [devToolState, type]);

  const values = useMemo(() => {
    return {
      devToolState,
      devToolDispatch,
    };
  }, [devToolState, devToolDispatch]);

  return <DevContext.Provider value={values}>{children}</DevContext.Provider>;
};

export function useDevDispatch(dispatch, state, reducer, contextName) {
  const { devToolDispatch } = useContext(DevContext);

  const _dispatch = useCallback(
    (dispatch, state, reducer, contextName, action) => {
      if (isDevelopment && typeof window === "object" && devToolExtension) {
        const newState = reducer(state, action);
        devToolDispatch({ type: contextName, payload: newState }, action.type);
      }
      return dispatch(action);
    },
    [devToolDispatch]
  );

  return _dispatch.bind(this, dispatch, state, reducer, contextName);
}

export const DevContext = createContext(initialState);

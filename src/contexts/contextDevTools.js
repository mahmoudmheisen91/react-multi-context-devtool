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

const rootReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "SET_CONTEXT_0":
      return {
        ...state,
        globalState: {
          ...state.globalState,
          context_0: payload,
        },
      };

    case "SET_CONTEXT_1":
      return {
        ...state,
        globalState: {
          ...state.globalState,
          context_1: payload,
        },
      };

    default:
      return state;
  }
};

export const DevContextProvider = ({ contexts, children }) => {
  const [type, setType] = useState("INIT");
  const [devToolState, dispatch] = useReducer(rootReducer, initialState);

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

export function useDevDispatch(dispatch, state, reducer, type) {
  const { devToolDispatch } = useContext(DevContext);

  const _dispatch = useCallback(
    (dispatch, state, reducer, type, action) => {
      if (isDevelopment && typeof window === "object" && devToolExtension) {
        const newState = reducer(state, action);
        devToolDispatch({ type, payload: newState }, action.type);
      }
      return dispatch(action);
    },
    [devToolDispatch]
  );

  return _dispatch.bind(this, dispatch, state, reducer, type);
}

export const DevContext = createContext(initialState);

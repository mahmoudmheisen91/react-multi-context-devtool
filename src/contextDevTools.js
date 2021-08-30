import {
  useReducer,
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
  useRef,
} from "react";

export const devToolExtension =
  typeof window === "object" && window?.__REDUX_DEVTOOLS_EXTENSION__;

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

export const DevToolProvider = ({ devToolConfig = {}, children }) => {
  const [type, setType] = useState("INIT");
  const [isDevelopment, setIsDevelopment] = useState(true);
  const [devToolOptions, setDevToolOptions] = useState({});
  const [devToolState, dispatch] = useReducer(devToolReducer, initialState);
  const devTool = useRef(null);

  // create devtool with options
  const createDevTool = useCallback(() => {
    if (isDevelopment && devToolExtension) {
      return devToolExtension.connect(devToolOptions);
    } else {
      return (f) => f;
    }
  }, [isDevelopment, devToolOptions]);

  const devToolDispatch = useCallback(
    (action, type) => {
      dispatch(action);
      setType(type);
    },
    [dispatch]
  );

  useEffect(() => {
    let isDev = false;
    if (!devToolConfig?.env) {
      isDev = process.env.NODE_ENV === "development";
    } else if (typeof devToolConfig.env === "string") {
      isDev = process.env.NODE_ENV === devToolConfig.env;
    } else if (Array.isArray(devToolConfig.env)) {
      devToolConfig.env.map((item) => {
        isDev = isDev || process.env.NODE_ENV === item;
        return item;
      });
    } else {
      isDev = process.env.NODE_ENV === "development";
    }
    setIsDevelopment(isDev);
    setDevToolOptions(devToolConfig?.reduxDevToolOptions);
  }, [devToolConfig]);

  useEffect(() => {
    devTool.current = createDevTool();
    isDevelopment &&
      devTool.current.send({ type: "INIT" }, { ...initialState });
  }, [createDevTool, isDevelopment]);

  useEffect(() => {
    isDevelopment && devTool.current.send({ type }, { ...devToolState });
  }, [devToolState, type, devTool, isDevelopment]);

  const values = useMemo(() => {
    return {
      devToolState,
      isDevelopment,
      devToolDispatch,
    };
  }, [devToolState, isDevelopment, devToolDispatch]);

  return <DevContext.Provider value={values}>{children}</DevContext.Provider>;
};



export const DevContext = createContext(initialState);

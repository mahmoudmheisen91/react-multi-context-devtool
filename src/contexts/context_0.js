import React, { useCallback, createContext, useMemo } from "react";
import { useReducer } from "./contextDevTools";

const SET_DATA_00 = "SET_DATA_00";
const SET_DATA_01 = "SET_DATA_01";

const initialState = {
  data_00: {},
  data_01: 0,
};

const reducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_DATA_00:
      return {
        ...state,
        data_00: {
          ...state.data_00,
          count: state.data_00?.count + 1 || 1,
        },
      };

    case SET_DATA_01:
      return {
        ...state,
        data_01: state.data_01 + 1,
      };

    default:
      return state;
  }
};

const Context0Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData00 = useCallback(() => {
    dispatch({ type: SET_DATA_00 });
  }, []);

  const setData01 = useCallback(() => {
    dispatch({ type: SET_DATA_01 });
  }, []);

  const context_0_value = useMemo(() => {
    return {
      state,
      setData00,
      setData01,
    };
  }, [state, setData00, setData01]);

  return (
    <Context0.Provider value={context_0_value}>{children}</Context0.Provider>
  );
};

export const Context0 = createContext(initialState);

export default Context0Provider;

export { initialState, reducer };

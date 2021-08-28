import React, { useCallback, useReducer, createContext, useMemo } from "react";
// import { useReducer } from "./contextDevTools";

const SET_DATA_10 = "SET_DATA_10";
const SET_DATA_11 = "SET_DATA_11";

const initialState = {
  data_10: false,
  data_11: 0,
};

const reducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_DATA_10:
      return {
        ...state,
        data_10: !state.data_10,
      };

    case SET_DATA_11:
      return {
        ...state,
        data_11: payload.data,
      };

    default:
      return state;
  }
};

const Context1Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData10 = useCallback(() => {
    dispatch({ type: SET_DATA_10 });
  }, []);

  const setData11 = useCallback((payload) => {
    dispatch({ type: SET_DATA_11, payload });
  }, []);

  const context_1_value = useMemo(() => {
    return {
      state,
      setData10,
      setData11,
    };
  }, [state, setData10, setData11]);

  return (
    <Context1.Provider value={context_1_value}>{children}</Context1.Provider>
  );
};

export const Context1 = createContext(initialState);

export default Context1Provider;

export { initialState, reducer };

import React, { useContext, useCallback } from "react";
import { Context0 } from "./contexts/context_0";

import "./App.scss";

function Comp0() {
  const { state, setData00, setData01 } = useContext(Context0);

  const handleData00 = useCallback(() => {
    setData00();
  }, [setData00]);

  const handleData01 = useCallback(() => {
    setData01();
  }, [setData01]);

  return (
    <div className="comp0">
      <div style={{ fontWeight: "bold" }}>Comp 0</div>
      <div>{state.data_00?.count || 0}</div>
      <button onClick={handleData00}>set data_00</button>

      <div>{state.data_01}</div>
      <button onClick={handleData01}>set data_01</button>
    </div>
  );
}

export default Comp0;

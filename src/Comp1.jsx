import React, { useContext, useCallback } from "react";
import { Context1 } from "./contexts/context_1";

import "./App.scss";

function Comp1() {
  const { state, setData10, setData11 } = useContext(Context1);

  const handleData10 = useCallback(() => {
    setData10();
  }, [setData10]);

  const handleData11 = useCallback(() => {
    setData11({data: Math.random().toFixed(2)});
  }, [setData11]);

  return (
    <div className="comp">
      <div style={{ fontWeight: "bold" }}>Comp 1</div>
      <div>{+state.data_10}</div>
      <button onClick={handleData10}>set data_10</button>

      <div>{state.data_11}</div>
      <button onClick={handleData11}>set data_11</button>
    </div>
  );
}

export default Comp1;

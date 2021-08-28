import React from "react";
import Context0Provider from "./contexts/context_0";

import Comp0 from "./Comp0";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Context0Provider>
        <Comp0 />
      </Context0Provider>
    </div>
  );
}

export default App;

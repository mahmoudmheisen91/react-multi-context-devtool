import React from "react";
import Context0Provider from "./contexts/context_0";
import Context1Provider from "./contexts/context_1";
import { DevContextProvider } from "./contexts/contextDevTools";

import Comp0 from "./Comp0";
import Comp1 from "./Comp1";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <DevContextProvider>
        <Context0Provider>
          <Comp0 />
        </Context0Provider>
        <Context1Provider>
          <Comp1 />
        </Context1Provider>
      </DevContextProvider>
    </div>
  );
}

export default App;

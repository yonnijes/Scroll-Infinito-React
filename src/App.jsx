import React from "react";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

import Photos from "./components/photo";

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
  
      <Photos />
    </Provider>
  );
}

export default App;

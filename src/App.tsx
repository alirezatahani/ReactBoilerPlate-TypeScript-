import React from "react";
import createStore from "./store/createStore";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./App.css";

const { store, persistor } = createStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;

import React from "react";
import createStore from "./store/createStore";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./App.css";
import ApiClient from "./api/apiClient";

const { store, persistor } = createStore();

function App() {
  const api = new ApiClient();

  console.log(api, "api");
  console.log(
    // @ts-ignore

    api.post("this", {
      body: { this: "that" },
      headers: {
        this: "fhjhsdf"
      }
    }),
    "api"
  );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;

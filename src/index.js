import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Added import
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./router/Routes";
import store from "./store/redux/store/store";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

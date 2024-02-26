import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Added import
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./router/Routes";
import store from "./store/redux/store/store";
import ReactModal from "react-modal";
// import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <RouterProvider router={routes} />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

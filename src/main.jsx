import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routers";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider
      store={store}
      /* The provider is a React component that wraps your entire application
      and provides access to the store. It does this by passing the store down
      to all of your components as a prop. */
    >
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

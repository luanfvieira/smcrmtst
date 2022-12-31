// import ReactDOM from "react-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "src/mocks";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ScrollTop from "src/hooks/useScrollTop";

import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import store from "src/store";
import App from "src/App";
import { SidebarProvider } from "src/contexts/SidebarContext";
import * as serviceWorker from "src/serviceWorker";
import { AuthProvider } from "src/contexts/JWTAuthContext";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <SidebarProvider>
          <BrowserRouter>
            <ScrollTop />
            <AuthProvider>
              <App />
              <ToastContainer />
            </AuthProvider>
          </BrowserRouter>
        </SidebarProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorker.unregister();

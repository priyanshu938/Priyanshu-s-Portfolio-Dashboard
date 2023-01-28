import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  process.env.REACT_APP_SYNC_FUSION_LICENSE_KEY,
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
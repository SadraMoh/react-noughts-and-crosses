import React from "react";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.scss";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root") as HTMLDivElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

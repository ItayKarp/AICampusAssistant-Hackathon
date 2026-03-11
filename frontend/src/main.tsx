import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import "./app/styles/index.css";

const baseUrl = import.meta.env.BASE_URL;
const routerBasename =
    baseUrl && baseUrl !== "/" ? baseUrl.replace(/\/$/, "") : undefined;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter basename={routerBasename}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initPostHog } from "./services/posthog";

// Инициализация PostHog
initPostHog();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
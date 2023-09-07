import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

(async () => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mock");
    worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: {
          scope: "/",
        },
      },
    });
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();

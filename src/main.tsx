import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextProvider } from "./presentations/contexts";
import { repositoryComposition } from "./repositoryComposition";
import { App } from "./presentations/App";
import "./global.css";

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

  const client = new QueryClient();
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <RepositoryContextProvider
          repositoryComposition={repositoryComposition}
        >
          <App />
        </RepositoryContextProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
})();

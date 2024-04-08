import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";

import {
  createRouter,
  RouterProvider,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: () => <CircularProgress />,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AppWrapper>
//       <App />
//     </AppWrapper>
//   </React.StrictMode>,
// );

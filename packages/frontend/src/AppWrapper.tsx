import {
  dehydrate,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CustomThemeProvider from "./theme/Provider.tsx";
import { RecoilRoot } from "recoil";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CustomThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools position="bottom-left" />
          <CssBaseline />
          {children}
        </CustomThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

// Listen for the unload event
window.addEventListener("unload", () => {
  // Dehydrate the query data and save it to the session storage
  const dehydratedState = dehydrate(queryClient);
  sessionStorage.setItem("queryData", JSON.stringify(dehydratedState));
});

// Get the dehydrated state from the session storage
const dehydratedState = sessionStorage.getItem("queryData");

if (dehydratedState) {
  // Hydrate the query data
  hydrate(queryClient, JSON.parse(dehydratedState));
}

export default AppWrapper;

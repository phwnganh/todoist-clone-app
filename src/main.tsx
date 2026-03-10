import {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "react-day-picker/dist/style.css"
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000
        }
    }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
      </QueryClientProvider>

  </StrictMode>
);

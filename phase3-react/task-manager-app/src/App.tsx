import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Set up routing using the browser's history API */}
      <BrowserRouter>
        {/* Provide React Query context to the app using the initialized query client */}
        <QueryClientProvider client={queryClient}>
          {/* Define application routes */}
          <AppRoutes />
          {/* Include the toaster UI component to display toast notifications globally */}
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

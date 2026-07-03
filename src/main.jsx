import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./provider/AuthProvider.jsx";

// Aos.init();
Aos.init({
  duration: 1000,
  once: true,
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-center"
      autoClose={800}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
    />
  </StrictMode>,
);

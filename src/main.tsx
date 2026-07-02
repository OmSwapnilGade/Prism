import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/Toast/Toast";
import { DocsLayout } from "@/layouts/DocsLayout";
import { HomePage } from "@/pages/HomePage";
import { DocsIndexPage } from "@/pages/DocsIndexPage";
import { ComponentDocPage } from "@/pages/ComponentDocPage";
import { PlaygroundPage } from "@/pages/PlaygroundPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/docs",
    element: <DocsLayout />,
    children: [
      {
        index: true,
        element: <DocsIndexPage />,
      },
      {
        path: ":slug",
        element: <ComponentDocPage />,
      },
    ],
  },
  {
    path: "/playground",
    element: <DocsLayout />,
    children: [
      {
        index: true,
        element: <PlaygroundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);

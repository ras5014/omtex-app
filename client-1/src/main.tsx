import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from "./pages/login.tsx";
import DashboardLayout from "./layouts/dashboard-layout.tsx";
import AuthLayout from "./layouts/auth-layout.tsx";
import Sales from "./pages/invoice/sales.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sales",
        element: <Sales />,
      }
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

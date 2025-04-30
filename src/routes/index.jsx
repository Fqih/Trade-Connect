import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Main Pages
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Overview from "../pages/Overview";
import Documents from "../pages/Documents";
import Assistant from "../pages/Assistant";
import Recommendation from "../pages/Recommendation";

// Layout
import MainLayout from "../components/layout/MainLayout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const routes = [
  // Auth Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Protected Routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product",
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: "/overview",
    element: (
      <ProtectedRoute>
        <Overview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/documents",
    element: (
      <ProtectedRoute>
        <Documents />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assistant",
    element: (
      <ProtectedRoute>
        <Assistant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recommendation",
    element: (
      <ProtectedRoute>
        <Recommendation />
      </ProtectedRoute>
    ),
  },

  // Fallback Route
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;

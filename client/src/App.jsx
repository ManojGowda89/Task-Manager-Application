import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useRouteError } from "react-router-dom";
import { useFirestore } from './Store/FireStore.jsx';
import Signup from './Auth/Signup.jsx';
import Login from './Auth/Login.jsx';
import Home from './Pages/Home.jsx';
import ResetPassword from "./Auth/ResetPassword.jsx";

function App() {
  const { user } = useFirestore();

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const GuestRoute = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  const ErrorPage = () => {
    const error = useRouteError();

    return user ? <Navigate to="/" /> : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: (
        <GuestRoute>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <GuestRoute>
          <ResetPassword />
        </GuestRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <GuestRoute>
          <Signup />
        </GuestRoute>
      ),
    },
    // {
    //   path: "/home",
    //   element: (
    //     <ProtectedRoute>
    //       <Home />
    //     </ProtectedRoute>
    //   ),
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

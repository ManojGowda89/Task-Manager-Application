
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useFirestore } from './Store/FireStore.jsx';
import Signup from './Auth/Signup.jsx';
import Login from './Auth/Login.jsx';
import Home from './Pages/Home.jsx';
import ResetPassword from "./Auth/ResetPassword.jsx"
function App() {
  const { user } = useFirestore();


  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };


  const GuestRoute = ({ children }) => {
    return user ? <Navigate to="/home" /> : children;
  };

  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      errorElement:<h1>Page Not Found</h1>
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
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

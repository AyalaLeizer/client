import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import SignupPage from './pages/signup/SignupPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import MoviesPage from './pages/movies/MoviesPage.jsx';
import AllMembersPage from './pages/members/AllMembersPage.jsx';
import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx';
import AuthProvider from './context/authContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/members",
        element: (
          <ProtectedRoute>
            <AllMembersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <ProtectedRoute>
            <SubscriptionPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

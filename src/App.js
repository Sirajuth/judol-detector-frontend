// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Stats from './pages/Stats';
import TransferPage from './pages/TransferPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/login'];

  return (
    <>
      {!hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <Stats />
            </PrivateRoute>
          }
        />
        <Route
          path="/transferpage"
          element={
            <PrivateRoute>
              <TransferPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

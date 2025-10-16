import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Pods from '../pages/Pods';
import PodDetails from '../pages/PodDetails';
import Rides from '../pages/Rides';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'pods', element: <Pods /> },
      { path: 'pods/:id', element: <PodDetails /> },
      { path: 'rides', element: <Rides /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;

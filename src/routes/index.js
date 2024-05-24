import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import UserPage from '../pages/users';
//import LoginPage from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/users',
        element: <UserPage />,
      },
    ],
  },
  /*{
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <div>register</div>,
  },*/
]);

export default function Routes() {
  return (
    <RouterProvider router={router} />
  );
}
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import PrivateRoute from './utils/PrivateRoute';
import UploadFile from './pages/UploadFile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
      children: [
        { path: 'app', element: <PrivateRoute> <DashboardApp /></PrivateRoute> },
        { path: 'user', element: <PrivateRoute> <User /> </PrivateRoute> },
        { path: 'products', element: <PrivateRoute> <Products /> </PrivateRoute> },
        { path: 'blog', element: <PrivateRoute> <Blog /> </PrivateRoute> },
        { path: 'file', element: <PrivateRoute> <UploadFile /> </PrivateRoute> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="login" /> },
      ],
    },
    { path: '*', element: <Navigate to="login" replace /> },
  ]);
}

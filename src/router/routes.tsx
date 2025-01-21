import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const App = lazy(() => import('../app'));
const Home = lazy(() => import('../pages/home'));
const Users = lazy(() => import('../pages/users'));
const Product = lazy(() => import('../pages/product'));
const Signin = lazy(() => import('../pages/signin'));
const Signup = lazy(() => import('../pages/signup'));

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/product',
        element: <Product />,
      },
    ],
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default routes;

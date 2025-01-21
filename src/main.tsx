// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import routes from './router/routes';
import axios from 'axios';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_REST_HOST;

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={routes} />
  </RecoilRoot>,
);

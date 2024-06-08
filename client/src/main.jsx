import React from 'react'
import ReactDOM from 'react-dom/client'
import SwrConfigProvider from "@contexts/SwrConfigProvider";
import { RouterProvider } from 'react-router-dom';
import routes from '@routes/router';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const ToastifyContainer = (
  <ToastContainer
    position="top-center"
    theme='dark'
    autoClose={3000}
    hideProgressBar
  />
)

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <>
    {ToastifyContainer}
    <SwrConfigProvider>
      <RouterProvider router={routes}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RouterProvider>
    </SwrConfigProvider>
  </>
)
import { createBrowserRouter } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';

import App from '@src/App'

import Authenticated from './Authenticated';
import Protected from './Protected';
import Private from './Private';

import ErrorPage from '@pages/Error'
import NotFoundPage from '@pages/NotFound'
import Spinner from '@components/Spinner'

const Home = lazy(() => import('@pages/Home'))
const Cart = lazy(() => import('@pages/Cart'))
const Favorites = lazy(() => import('@pages/Favorites'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Shop = lazy(() => import('@pages/Shop/Shop'))
// FORM ACTION
const Logout = lazy(() => import('@pages/Logout'))
const Login = lazy(() => import('@components/Forms/Login'))
const Register = lazy(() => import('@components/Forms/Register'))
// SINGLE PRODUCT
const SingleProduct = lazy(() => import('@pages/SingleProduct/SingleProduct'))
import { Description } from '@pages/SingleProduct/SingleProduct' // becasue index : true
const Comments = lazy(() => import('@pages//SingleProduct/Comments/Layout'))
const Related = lazy(() => import('@pages/SingleProduct/Related'))
// PAYMENT ACTION
const PaymentSuccess = lazy(() => import('@pages/Payment/Success'))
const PaymentError = lazy(() => import('@pages/Payment/Error'))
// ADD STORY
const AddStory = lazy(() => import('@pages/AddStory/AddStory'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "shop",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Spinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Authenticated>
            <Suspense fallback={<Spinner />}>
              <Favorites />
            </Suspense>
          </Authenticated>
        ),
      },
      {
        path: "login",
        element: (
          <Protected>
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: "register",
        element: (
          <Protected>
            <Suspense fallback={<Spinner />}>
              <Register />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: "logout",
        element: (
          <Suspense fallback={<Spinner />}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Private>
            <Suspense fallback={<Spinner />}>
              <Dashboard />
            </Suspense>
          </Private>
        ),
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
      {
        path : 'payment',
        children : [
          {
            path : 'success',
            element : (
              <Suspense>
                <PaymentSuccess />
              </Suspense>
            )
          },
          {
            path : 'error',
            element : (
              <Suspense>
                <PaymentError />
              </Suspense>
            )
          },
          {
            path : '*',
            element : <NotFoundPage />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<Spinner />}>
                <SingleProduct />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <Description />,
              },
              {
                path: 'desc',
                element: <Description />,
              },
              {
                path: 'comments',
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Comments />
                  </Suspense>
                ),
              },
              {
                path: 'related',
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Related />
                  </Suspense>
                ),
              },
            ]
          }
        ]
      },
      {
        path : 'stories',
        children : [
          {
            path : 'new',
            element : (
              <Suspense>
                <AddStory />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },

])

export default router;
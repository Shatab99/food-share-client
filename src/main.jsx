import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Root';
import Home from './Components/Home/Home';
import LogIn from './Components/LogInfo/LogIn';
import SignUp from './Components/LogInfo/SignUp';
import AuthProvider from './SecretLayouts/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import Error from './Error/Error';
import AvailableFoods from './Components/AllPrivateRoute/AvailableFoods';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AddFoods from './Components/AllPrivateRoute/AddFoods';
import PrivateRoute from './SecretLayouts/PrivateRoute';
import ManageFoods from './Components/AllPrivateRoute/ManageFoods';
import FoodDetails from './Components/AllPrivateRoute/FoodDetails';
import RequestedFoods from './Components/AllPrivateRoute/RequestedFoods';
import ManageFoodDetails from './Components/AllPrivateRoute/ManageFoodDetails';
import EditManageFoodDetails from './Components/AllPrivateRoute/EditManageFoodDetails';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/availablefoods',
        element: <AvailableFoods />
      },
      {
        path: '/addfoods',
        element: <PrivateRoute><AddFoods/></PrivateRoute>
      },
      {
        path: '/managefood',
        element: <PrivateRoute><ManageFoods/></PrivateRoute>
      },
      {
        path:'/availablefoods/:id',
        element:<PrivateRoute><FoodDetails/></PrivateRoute>,
        loader: ({params})=> fetch(`https://food-share-server.vercel.app/availablefoods/${params.id}`)
      },
      {
        path : '/requestedfoods',
        element:<PrivateRoute><RequestedFoods/></PrivateRoute>
      },
      {
        path:'/managefoodsdetails/:id',
        element:<PrivateRoute><ManageFoodDetails/></PrivateRoute>,
        loader:({params})=> fetch(`https://food-share-server.vercel.app/requestedfoods/${params.id}`)
      },
      {
        path:'/edit/:id',
        element:<PrivateRoute><EditManageFoodDetails/></PrivateRoute>,
        loader: ({params})=> fetch(`https://food-share-server.vercel.app/availablefoods/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

import { createBrowserRouter, Navigate } from 'react-router-dom';

// Pages
import { AdditionalInfo } from './pages/AdditionalInfo';
import { Confirmation } from './pages/Confirmation';
import { Error } from './pages/Error';
import { SignUp } from './pages/SignUp';
import { Success } from './pages/Success';

export const router = createBrowserRouter([
  {
    path: '/',
    // Sign-Up default page for this app
    element: <Navigate replace to="/sign-up" />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/additional-info',
    element: <AdditionalInfo />
  },
  {
    path: '/confirmation',
    element: <Confirmation />
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '/error',
    element: <Error />
  }
]);
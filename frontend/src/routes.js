import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Policy from './pages/policy/Policy'
import Document from './pages/documents/Documents';
import Email from './pages/email/Email'
import Payments from './pages/payment/Payments';
import Claims from './pages/claims/Claims';
import UserView from './pages/user/View'
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
         {  element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user/view/:id', element: <UserView /> },
        { path: 'claims', element: <Claims /> },
        { path: 'policy', element: <Policy /> },
        { path: 'document', element: <Document /> },
        { path: 'email', element: <Email /> },
		{ path: 'payment', element: <Payments /> },
        { path: '*', element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        // { path: 'history', element: <History /> },
        
        // { path: '*', element: <Navigate to="/dashboard/app" /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        {path: '*', element: <Navigate to="/dashboard/app" />, index: true },
        // { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}

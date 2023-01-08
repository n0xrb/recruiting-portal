import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import BodyLayout from '../layouts/BodyLayout';
import NotFound from '../pages/NotFound';
import { loaderHome } from '../pages/Home';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <BodyLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home />, loader: loaderHome },
            { path: '/userCodeAppPanel', element: <Home />, loader: loaderHome },
        ],
    },
]);

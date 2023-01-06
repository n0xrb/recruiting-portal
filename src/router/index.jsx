import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import BodyLayout from '../layouts/BodyLayout';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <BodyLayout />,
        children: [{ index: true, element: <Home /> }],
    },
]);

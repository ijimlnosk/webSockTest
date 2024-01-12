import Chat from 'components/Chat';
import MainPage from 'main_page';

const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/chat',
        element: <Chat />,
    },
]);
export default router;

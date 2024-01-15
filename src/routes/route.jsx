import Chat from 'components/Chat';
import RoomSelectionPage from 'components/RoomSelectionPage';
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
    {
        path: '/Room',
        element: <RoomSelectionPage />,
    },
]);
export default router;

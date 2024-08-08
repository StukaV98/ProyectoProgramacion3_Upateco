import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Songs from "../Songs";
import Album from "../Album";
import Contacto from "../Contacto";
import Login from "../Login";
import Profile from "../Profile";
// import ProtectedRoute from './ProtectedRoute';

/* enrutador version 1 */
const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/contacto",
                element: <Contacto/>
            },
            {
                path: "/Songs",
                element: <Songs/>
            },
            {
                path: "/Album",
                element: <Album/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/Profile",
                element: <Profile/>
            },
        ]
    },
    {
    path: "*",
    element: <h2>Pagina no encontrada</h2>
    },
]);

export default Router;

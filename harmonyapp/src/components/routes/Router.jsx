import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Songs from "../Songs";
import Album from "../Album";
import Contacto from "../Contacto";
import Login from "../Auth/Login";
import Profile from "../Profile";
import Artista from "../Artista";
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
                path: "/songs",
                element: <Songs/>
            },
            {
                path: "/artista",
                element: <Artista/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/album",
                element: <Album/>
            },
        ]
    },
    {
    path: "*",
    element: <h2>Pagina no encontrada</h2>
    },
]);

export default Router;

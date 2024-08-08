import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Artista from "../Artist";
import Contacto from "../Contacto";
import Login from "../Login";

/* enrutador version 1 */
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/contacto",
        element: <Contacto/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <h2>Pagina no encontrada</h2>
    },
])

export default Router;

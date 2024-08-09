import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Artista from "../Artista";
import Contacto from "../Contacto";
import Profile from "../Profile";
import Login from "../Login";
import Layout from "./Layout";
import ProtectedRoute from './ProtectedRoute'
import Playlists from "../Playlists";
import Songs from "../Songs";
import SongCreate from "../SongCreate";


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                ]
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/contacto",
                element: <Contacto />,
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/playlists",
                element: (
                    <ProtectedRoute>
                        <Playlists />
                    </ProtectedRoute>
                )
            },
            {
                path: "/artistas",
                element: (
                    <ProtectedRoute>
                        <Artista />
                    </ProtectedRoute>
                )
            },
            {
                path: "/songs",
                children: [
                    {
                        index: true,
                        element: (
                            (
                                <ProtectedRoute>
                                    <Songs />
                                </ProtectedRoute>
                            )
                        ),
                    },
                    {
                        path: "new",
                        element: (
                                <ProtectedRoute>
                                    <SongCreate />
                                </ProtectedRoute>
                        )
                    },
                ],
            },

        ]
    },
    {
        path: "*",
        element: <h2>Pagina no encontrada</h2>,
    },
])

export default Router;
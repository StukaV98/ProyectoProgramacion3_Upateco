import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Artista from "../Artists";
import Contacto from "../Contacto";
import Profile from "../Profile";
import Login from "../Login";
import Layout from "./Layout";
import ProtectedRoute from './ProtectedRoute'
import Playlists from "../Playlists";
import Songs from "../Songs";
import SongCreate from "../SongCreate";
import Artists from "../Artists";
import ArtistCreate from "../ArtistCreate";


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
            //  {
            //      path: "/artistas",
            //      element: (
            //          <ProtectedRoute>
            //              <Artists />
            //          </ProtectedRoute>
            //      )
            //  },
            //  {
            //      path: "/artistas/new",
            //      element: (
            //          <ProtectedRoute>
            //              <ArtistCreate />
            //          </ProtectedRoute>
            //      )
            //  },
              {
                  path: "/artistas",
                  children: [
                      {
                          index: true,
                          element: (
                              (
                                  <ProtectedRoute>
                                      <Artists />
                                  </ProtectedRoute>
                              )
                          ),
                      },
                      {
                          path: "/artistas/new",
                          element: (
                                  <ProtectedRoute>
                                      <ArtistCreate />
                                  </ProtectedRoute>
                          )
                      },
                  ],
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
                        path: "/songs/new",
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
import React from 'react'
import Componente from './Componente'
import Footer from './Footer';
import { useAuth } from './contexts/AuthContext';

function Home() {

    return (
        <div>
            <header>
                <Componente />

            </header>
            <h1>Welcome to music app</h1>
            
            <div>
                <h3>En esta aplicacion se encuentran Playlists, Artistas y Canciones</h3>
                <p>Para crear artistas y canciones deberás iniciar sesión</p>
                <p>Navega libremente por la web</p>
                <div>
                    <a href="/playlists">Ir a Playlists</a>
                    <a href="/artistas">Ir a Artistas</a>
                    <a href="/songs">Ir a Canciones</a>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
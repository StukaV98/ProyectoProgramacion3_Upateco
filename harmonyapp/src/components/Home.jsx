import React from 'react';
import Componente from './Componente';
import Footer from './Footer';
import { useAuth } from './contexts/AuthContext';

function Home() {
    return (
        <div className="container">
            <header className="box has-background-primary-light has-text-centered">
                <Componente />
            </header>

            <section className="section has-text-centered">
                <h1 className="title has-text-primary-white">Welcome to music app</h1>
                
                <div className="content">
                    <h3 className="subtitle has-text-info-light">En esta aplicación se encuentran Playlists, Artistas y Canciones</h3>
                    <p className="has-text-grey-light">Para crear artistas y canciones deberás iniciar sesión</p>
                    <p className="has-text-grey-light">Navega libremente por la web</p>
                </div>

                <div className="buttons is-centered mt-5">
                    <a href="/playlists" className="button is-info">Ir a Playlists</a>
                    <a href="/artistas" className="button is-primary">Ir a Artistas</a>
                    <a href="/songs" className="button is-success">Ir a Canciones</a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
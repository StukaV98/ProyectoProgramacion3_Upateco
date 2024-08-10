import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { ArtistCard } from './ArtistCard';
import { useAuth } from './contexts/AuthContext';

export default function Artists() {
    const [artists, setArtists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [pagina, setPagina] = useState(1);

    const { token, user__id } = useAuth("state");

    let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/artists/?page=${pagina}`;

    const doFetch = async () => {
        setIsLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Solicitud a los artistas erronea');
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setArtists((prevArtists) => [...prevArtists, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch((error) => {
                setIsError(true);
                console.error(error, 'Error con el Data.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleCargar() {
        if (nextURL) {
            setPagina((currentPage) => currentPage + 1);
        }
    }

    useEffect(() => {
        doFetch();
    }, [pagina]);

    return (
        <div>
            <header>
                <a href="/profile">Mi perfil</a>
                <a href="/playlists">Playlists</a>
                <a href="/songs">Canciones</a>
            </header>
            <h1>Artistas</h1>
            <ul>
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} userId={user__id} />
                ))}
            </ul>
            <div>
                {isLoading && <p>Cargando más artistas...</p>}
                {nextURL && !isLoading && (
                    <button onClick={handleCargar}>
                        Cargar más
                    </button>
                )}

                <div>
                    <a href="/artistas/new/">Crear artista</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
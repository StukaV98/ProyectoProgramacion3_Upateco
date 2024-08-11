import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { PlaylistCard } from './PlaylistCard';
import { useAuth } from './contexts/AuthContext';

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pagina, setPagina] = useState(1);

    const { token, user__id } = useAuth("state");

    let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/?page=${pagina}`;
    let paginaOwner = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/?owner=${user__id}`;

    /*
        Funcion asincrona que 
    */

    const doFetch = async () => {
        setIsLoading(true);
        fetch(url, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Solicitud a las playlists errónea');
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.results]);
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

    function handleMyPlaylists() {
        setPlaylists([]);
        setIsLoading(true);
        fetch(paginaOwner, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Solicitud a las playlists errónea');
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setPlaylists(data.results);
                }
            })
            .catch((error) => {
                setIsError(true);
                console.error(error, 'Error con mis playlists.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

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
                <a href="/songs">Canciones</a>
                <a href="/artistas">Artistas</a>
            </header>
            <h1>Playlists</h1>

            {isLoading && <p>Cargando playlists...</p>}
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <PlaylistCard playlist={playlist} userId={user__id} />
                    </li>
                ))}
            </ul>
            <div>
                {isLoading && <p>Cargando más playlists...</p>}
                {nextURL && !isLoading && (
                    <button onClick={handleCargar}>
                        Cargar más
                    </button>
                )}
            </div>
            <Footer />
        </div>
    );
}
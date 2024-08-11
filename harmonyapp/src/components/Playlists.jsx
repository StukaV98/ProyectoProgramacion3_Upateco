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
    <div className="section">
      <div className="container">
        <header className="navigation is-horizontal">
          <a href="/profile" className="navigation-item has-text-black">
            Mi perfil
          </a>
          <a href="/songs" className="navigation-item has-text-black">
            Canciones
          </a>
          <a href="/artistas" className="navigation-item has-text-black">
            Artistas
          </a>
        </header>
        <h1 className="title is-2">Playlists</h1>

        {isLoading && <p className="has-text-centered">Cargando playlists...</p>}
        <ul className="list">
          {playlists.map((playlist) => (
            <li key={playlist.id} className="list-item">
              <PlaylistCard playlist={playlist} userId={user__id} />
            </li>
          ))}
        </ul>
        <div className="has-text-centered">
          {isLoading && <p>Cargando más playlists...</p>}
          {nextURL && !isLoading && (
            <button onClick={handleCargar} className="button is-primary">
              Cargar más
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
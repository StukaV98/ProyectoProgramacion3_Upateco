import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { SongCard } from './SongCard';
import { useAuth } from './contexts/AuthContext';

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [nextURL, setNextURL] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [pagina, setPagina] = useState(1);

  const { token, user__id } = useAuth("state");

  let url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?page=${pagina}`;
  let paginaOwner = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?owner=${user__id}`;

  /* 
      Funcion asincrona doFetch que realiza una solicitud a la API
      incorporando paginacion
      Setteando pagina y utilizando estados para mejorar funcionalidad
  */
  const doFetch = async () => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Solicitud a las canciones errónea');
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setSongs((prevSongs) => [...prevSongs, ...data.results]);
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

  /* handle que maneja el boton 'Mis canciones' para la eliminacion o edicion */
  const handleMySongs = () => {
    setSongs([]);
    setIsLoading(true);
    fetch(paginaOwner)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Solicitud a las canciones errónea');
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setSongs(data.results);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.error(error, 'Error con mis canciones.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /* funcion handleLoadMore implementada en clases */
  const handleCargar = () => {
    if (nextURL) {
      setPagina((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {
    doFetch();
  }, [pagina]);

  return (
    <div className="container">
      <header className="navbar is-light mb-5">
        <div className="navbar-brand">
          <a href="/profile" className="navbar-item has-text-info">Mi perfil</a>
          <a href="/playlists" className="navbar-item has-text-info">Playlists</a>
          <a href="/artistas" className="navbar-item has-text-info">Artistas</a>
        </div>
      </header>
      
      <h1 className="title is-3 has-text-centered has-text-info">Canciones</h1>

      {/* Mostrar mensaje de carga si isLoading es true */}
      {isLoading ? (
        <p className="has-text-centered">Cargando canciones...</p>
      ) : null}

      {/* Botón para mostrar "Mis canciones" */}
      <div className="buttons is-centered mb-5">
        <button className="button is-warning" onClick={handleMySongs}>Mis canciones</button>
      </div>

      {/* Mostrar lista de canciones */}
      <ul className="song-list">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} userId={user__id} />
        ))}
      </ul>

      <div className="buttons is-centered">
        {isLoading && <p className="has-text-centered">Cargando más canciones...</p>}
        {nextURL && !isLoading && (
          <button
            className="button is-info"
            onClick={handleCargar}
          >
            Cargar más
          </button>
        )}
      </div>

      <div className="has-text-centered mt-5">
        <a href="/songs/new/" className="button is-primary">Crear canción</a>
      </div>

      <Footer />
    </div>
  );
}
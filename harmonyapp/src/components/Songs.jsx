import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { SongCard } from './SongCard';
import { useAuth } from './contexts/AuthContext';


export default function Songs() {

    const [songs, setSongs] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [pagina, setPagina] = useState(1);

    const { token , user__id } = useAuth("state");


    let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/?page=${pagina}`

    /* 
        Funcion asincrona doFetch que realiza una solicitud a la API
        incorporando paginacion
        Setteando pagina y utilizando estados para mejorar funcionalidad
    */

    const doFetch = async () => {
        setIsLoading(true)
        fetch(url)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a las canciones erronea')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch((error) => {
                setIsError(true)
                console.error(error, 'Error con el Data.')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }
    
    /* funcion handleLoadMore implementada en clases */
    function handleCargar(){

        if(nextURL){
            setPagina((currentPage) => currentPage + 1)
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
                <a href="/artistas">Artistas</a>
            </header>
            <h1>Canciones</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        
                        <SongCard song={song} userId={user__id} />
                       
                        {/* <div className="track">
                            <audio controls>
                                <source src={song.song_file} type="audio/mpeg" />
                            </audio>
                        </div> */}
                        
                    </li>
                ))}
            </ul>
            <div>
                {isLoading && <p>Cargando más canciones...</p>}
                {nextURL && !isLoading && (
                    <button
                        className=""
                        onClick={handleCargar}
                    >
                        Cargar más
                    </button>
                )}

                <div>
                    <a href="/songs/new/">Crear canción</a>
                </div>
            </div>

            
            
            {/*  Paginador de prueba
            <div>
                <a href="#">Volver a {pagina-1}</a>
                <a href="#" >Siguiente página - {pagina+1}</a>
            </div> */}
            <Footer/>

        </div>
    )
}

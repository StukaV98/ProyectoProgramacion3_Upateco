import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';
import { ArtistaCard } from './ArtistaCard';

function Artista() {
    const [artists, setArtists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [ultimosArtistas, setUltimosArtistas] = useState([]);

    const { token , user__id } = useAuth("state");


    let url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?page=${pagina}`

    const doFetch = async () => {
        setIsLoading(true)
        fetch(url)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a los artistas erroneo')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setArtists((prevArtists) => [...prevArtists, ...data.results]);
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

    function handleCargar() {
        if (nextURL) {
            setPagina((currentPage) => currentPage + 1);
        }
    }

    function handleOrder(e) {
        e.preventDefault();
        setIsLoading(true);
        const consulta = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?ordering=-created_at`
        fetch(consulta)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a los artistas erroneo')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setUltimosArtistas(data.results)
                }
            })
            .catch((error) => {
                console.error(error, 'Error con el Data.')
            })
            .finally(() => {
                return setIsLoading(false)
            })
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
            <div>
                <a href="/artistas/new">Crear artista</a>
            </div>
            <div>
                <button onClick={handleOrder}>Ver ultimos artistas creados</button>
                {ultimosArtistas ? (                    
                    <div>
                        <ul>
                            {ultimosArtistas.map((lastArtist) => (
                                <ArtistaCard key={lastArtist.id} artist={lastArtist} userId={user__id} />
                            ))}
                        </ul>
                        <h4>Ultima actualizacion</h4>
                        <p>{new Date().toLocaleString("es-ES")}</p>
                        <p>Sigue navegando en nuestra web disfrutando de todos nuestros artistas</p>
                    </div>
                ) : null}
            </div>
            <div>
                <ul>
                    {artists.map((artist) => (
                        <ArtistaCard key={artist.id} artist={artist} userId={user__id} />
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={handleCargar}>Cargar artistas</button>
            </div>

        </div>
    )
}

export default Artista
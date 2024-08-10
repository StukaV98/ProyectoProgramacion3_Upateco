import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';

export default function SongEdit({ isOpen, onClose, song_id  }) {

    let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`

    const { token } = useAuth("state");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [cancion, setCancion] = useState({})
    const [cancionEdit, setCancionEdit] = useState({
        title: "",
        year: 0
    })

    const doFetch = async () => {
        setIsLoading(true)
        fetch(url,{
            method: "GET",
            headers: {
                Authorization: `Token ${token}`
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a la cancion a editar erronea')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                if(data){
                    setCancion(data);
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

    useEffect(() => {
        doFetch();
    }, [cancion]);

    if (!isOpen) return null;

    return (
        <div>
            <div>
                <p>Editar cancion</p>
                <form>
                    <label htmlFor="title">Titulo: {cancion.title} </label>
                </form>
                <button
                    className=""
                    onClick={onClose}
                >Cancelar</button>
            </div>

        </div>
    )
}

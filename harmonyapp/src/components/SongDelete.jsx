import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';

export default function SongDelete({ isOpen, onClose, song_id }) {

    const { token } = useAuth("state");
    const [isLoading, setIsLoading] = useState(false);
    const [dataDelete, setDataDelete] = useState(false);

    function handleConfirmDelete(e){
        e.preventDefault();
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`,{
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`
            },
        })
            .then((respDelete) => {
                if(!respDelete.ok){
                    console.log("error respDelete")
                }
                return respDelete.json();
            })
            .then((data) => {
                setDataDelete(true)
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    location.reload()
                }, 500);
            })
    }

    useEffect(() => {
        if(dataDelete){
            onClose();
        }
    },[dataDelete])


    if (!isOpen) return null;

    return (
        <div>
            <p>Eliminarás la canción para siempre. ¿Deseas continuar?</p>
            <button
                className=""
                onClick={onClose}
            >Cancelar</button>
            <form onSubmit={handleConfirmDelete}>
                <button
                    className=""
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Eliminando..." : "Eliminar"}
                </button>
            </form>
        </div>
    )
}

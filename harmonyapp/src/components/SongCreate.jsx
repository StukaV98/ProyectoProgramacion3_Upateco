import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'

function SongCreate() {

    const { token } = useAuth("state");


    const [cancion, setCancion] = useState({
        title: "",
        year: 0
    })

    const [cancionCreada, setCancionCreada] = useState(null)

    /* estado para no enviar multiples peticiones a la API y comprobar campos */
    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event){
        setCancion({
            ...cancion,
            [event.target.name] : event.target.value,
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!submitting){
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", cancion.title);
            newForm.append("year", cancion.year);

            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`,{
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: newForm,
            })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("No se pudo crear la cancion")
                    }
                    return response.json();
                })
                .then((data) => {
                    setCancionCreada(data)
                })
                .catch((error) => {
                    console.error("Error al cargar la cancion", error)
                })
                .finally(() => {
                    return setSubmitting(false)
                })

        }
        
    }


    return (
        <div>
            <h3>Crear cancion</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titulo:</label>
                        <input 
                            type="text"
                            min="3"
                            max="255"
                            name='title'
                            value={cancion.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Año:</label>
                        <input 
                            type="number"
                            min="0"
                            max="2024"
                            name='year'
                            value={cancion.year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                        >
                                Crear cancion
                        </button>
                    </div>
                </form>
            </div>
            {cancionCreada ? (
                <div>
                    <h3>¡Cancion creada con exito!</h3>
                    <p>Titulo: <span>{cancionCreada.title}</span></p>
                    <p>Año: <span>{cancionCreada.year}</span></p>
                    <p>ID Creador: <span>{cancionCreada.owner}</span></p>
                    <p>Fecha de creacion: <span>{cancionCreada.created_at}</span></p>
                </div>
            ) : null }
            <a href="/songs">Volver</a>
        </div>
    )
}

export default SongCreate
import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';

export default function ArtistaCreate() {

    const { token } = useAuth("state");

    const [artista, setArtista] = useState({
        name: "",
        bio: "",
        website: ""
    })

    const [artistCreated, setArtistCreated] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event) {
        setArtista({
            ...artista,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", artista.name);
            newForm.append("bio", artista.bio);
            newForm.append("website", artista.website);

            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/artists/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear el artista");
                    }
                    return response.json();
                })
                .then((data) => {
                    setArtistCreated(data);
                })
                .catch((error) => {
                    console.error("Error al crear el artista", error);
                })
                .finally(() => {
                    return setSubmitting(false);
                });
        }
    }


    return (
        <div>
            <div>
                <h3>Crea tu propio artista</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name="name"
                            value={artista.name}
                            onChange={handleInputChange}
                            minLength="1"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <label>Biografía:</label>
                        <textarea
                            name="bio"
                            value={artista.bio}
                            onChange={handleInputChange}
                            maxLength="500"
                        />
                    </div>
                    <div>
                        <label>Página Web:</label>
                        <input 
                            type="url"
                            name="website"
                            value={artista.website}
                            onChange={handleInputChange}
                            maxLength="200"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                        >
                            Crear Artista
                        </button>
                    </div>
                </form>
            </div>
            {artistCreated ? (
                <div>
                    <h3>¡Artista creado con éxito!</h3>
                    <p>Nombre: <span>{artistCreated.name}</span></p>
                    <p>Biografía: <span>{artistCreated.bio}</span></p>
                    <p>Página Web: <span>{artistCreated.website}</span></p>
                </div>
            ) : null }
            <div>
                <a href="/artistas">Volver</a>
            </div>
        </div>
    )

}

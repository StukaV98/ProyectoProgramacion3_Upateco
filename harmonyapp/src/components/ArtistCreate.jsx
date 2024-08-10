import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'

function ArtistCreate() {

    const { token } = useAuth("state");

    const [artist, setArtist] = useState({
        name: "",
        bio: "",
        website: ""
    });

    const [artistCreated, setArtistCreated] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event) {
        setArtist({
            ...artist,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", artist.name);
            newForm.append("bio", artist.bio);
            newForm.append("website", artist.website);

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
            <h3>Crear Artista</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name="name"
                            value={artist.name}
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
                            value={artist.bio}
                            onChange={handleInputChange}
                            maxLength="500"
                        />
                    </div>
                    <div>
                        <label>Página Web:</label>
                        <input 
                            type="url"
                            name="website"
                            value={artist.website}
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
                    {/* <p>ID Creador: <span>{artistCreated.id.owner}</span></p> */}
                    <p>Fecha de creación: <span>{artistCreated.created_at}</span></p>
                </div>
            ) : null }
            <a href="/">Volver</a>
        </div>
    );
}

export default ArtistCreate;
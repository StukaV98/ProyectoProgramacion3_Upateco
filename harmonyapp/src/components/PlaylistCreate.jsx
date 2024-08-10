import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

function PlaylistCreate() {
    const { token } = useAuth("state");

    const [playlist, setPlaylist] = useState({
        name: "",
        description: "",
        public: false,
    });

    const [playlistCreada, setPlaylistCreada] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event) {
        const { name, value, type, checked } = event.target;
        setPlaylist({
            ...playlist,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", playlist.name);
            newForm.append("description", playlist.description);
            newForm.append("public", playlist.public);

            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear la playlist");
                    }
                    return response.json();
                })
                .then((data) => {
                    setPlaylistCreada(data);
                })
                .catch((error) => {
                    console.error("Error al cargar la playlist", error);
                })
                .finally(() => {
                    return setSubmitting(false);
                });
        }
    }

    return (
        <div>
            <h3>Crear playlist</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            minLength="3"
                            maxLength="255"
                            name="name"
                            value={playlist.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={playlist.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="public"
                                checked={playlist.public}
                                onChange={handleInputChange}
                            />
                            Pública
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                        >
                            Crear playlist
                        </button>
                    </div>
                </form>
            </div>
            {playlistCreada ? (
                <div>
                    <h3>¡Playlist creada con éxito!</h3>
                    <p>Nombre: <span>{playlistCreada.name}</span></p>
                    <p>Descripción: <span>{playlistCreada.description}</span></p>
                    <p>ID Creador: <span>{playlistCreada.owner}</span></p>
                    <p>Fecha de creación: <span>{playlistCreada.created_at}</span></p>
                </div>
            ) : null}
            <a href="/playlists">Volver</a>
        </div>
    );
}

export default PlaylistCreate;
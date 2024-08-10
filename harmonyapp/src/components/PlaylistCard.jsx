import React from 'react';

export const PlaylistCard = ({ playlist, userId }) => {
    const { name, description, public: isPublic, entries, owner } = playlist;

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <p>Descripción: <span>{description ? description : "No especificada"}</span></p>
                <p>Pública: <span>{isPublic ? "Sí" : "No"}</span></p>
                <p>Canciones: <span>{entries ? entries : "No especificado"}</span></p>
            </div>
            <div>
                {owner === userId ? <button>Eliminar</button> : null}
            </div>
        </div>
    );
};
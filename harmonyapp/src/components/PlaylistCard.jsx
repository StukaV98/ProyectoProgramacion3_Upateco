import React from 'react';

export const PlaylistCard = ({ playlist, userId }) => {
  const { name, description, public: isPublic, entries, owner } = playlist;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
      </header>
      <div className="card-content">
        <div className="content">   

          <p><strong>Descripción:</strong> {description || "No especificada"}</p>
          <p><strong>Pública:</strong> {isPublic ? "Sí" : "No"}</p>
          <p><strong>Canciones:</strong> {entries || "No especificadas"}</p>
          {userId === owner && (
            <button className="button is-small is-primary">Editar</button>
          )}
        </div>
      </div>
    </div>
  );
};
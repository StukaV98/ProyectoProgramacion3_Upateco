import React, { useState } from 'react';
import SongDelete from './SongDelete';
import SongEdit from './SongEdit';

export const SongCard = ({ song, userId }) => {
  const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const { title, duration, year, view_count } = song;

  return (
    <div className="box has-background-light p-4">
      <div className="content">
        <h3 className="title is-4 has-text-info">{title}</h3>
        <p>Duración: <span>{duration ? `${duration} segundos` : "Sin especificación"}</span></p>
        <p>Año: <span>{year ? year : "No especificado"}</span></p>
        <p>{view_count} <span>vistas</span></p>
        <audio controls className="mt-3">
          <source src={song.song_file} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
      <div className="buttons are-small mt-4">
        {song.owner === userId && (
          <>
            <button className="button is-danger mr-2" onClick={() => setModalDeleteOpen(true)}>Eliminar</button>
            {ModalDeleteOpen && (
              <SongDelete
                isOpen={ModalDeleteOpen}
                onClose={() => setModalDeleteOpen(false)}
                song_id={song.id}
              />
            )}
            <button className="button is-warning" onClick={() => setModalEditOpen(true)}>Editar</button>
            {modalEditOpen && (
              <SongEdit
                isOpen={modalEditOpen}
                onClose={() => setModalEditOpen(false)}
                song_id={song.id}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
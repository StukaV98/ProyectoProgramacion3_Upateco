import React, { useState } from 'react'
import SongDelete from './SongDelete';
import SongEdit from './SongEdit';

export const SongCard = ({ song, userId }) => {

    const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const { title, duration, year, view_count } = song;


    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>Duración: <span> { duration ? duration + " segundos" : "Sin especificacion" }</span></p>
                <p>Año: <span> { year ? year : "No especificado" }</span></p>
                <p> { view_count } <span>vistas</span></p>
                <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
            <div>
                {/* 
                    Dentro de este div se comprueba al creador de la cancion con el ID de usuario
                    luego de comprobar tendra permisos de Eliminar o Editar respectivamente

                */}

                { song.owner == userId ? (
                    <div className="" onClick={() => setModalDeleteOpen(true)}>
                        <button className="">Eliminar</button>
                    </div>                    
                ) : null }
                { ModalDeleteOpen ?
                    <SongDelete
                        isOpen={ModalDeleteOpen}
                        onClose={() => setModalDeleteOpen(false)}
                        song_id={song.id}
                    />
                : null }
                { song.owner == userId ? (
                    <div className="" onClick={() => setModalEditOpen(true)}>
                        <button className="">Editar</button>
                    </div>                    
                ) : null }
                { modalEditOpen ? <SongEdit 
                    isOpen={modalEditOpen}
                    onClose={() => setModalEditOpen(false)}
                    song_id={song.id}
                    
                    />
                : null }
            </div>

        </div>
        
    )
}

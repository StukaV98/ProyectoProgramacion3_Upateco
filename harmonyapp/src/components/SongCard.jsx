import React from 'react'

export const SongCard = ({ song, userId }) => {

    const { title, duration, year, view_count } = song;

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>Duración: <span> { duration ? duration + " segundos" : "Sin especificacion" }</span></p>
                <p>Año: <span> { year ? year : "No especificado" }</span></p>
                <p> { view_count } <span>vistas</span></p>
            </div>
            <div>
                {
                    song.owner == userId ? <button>Eliminar</button> : null
                }
            </div>

        </div>
        
    )
}

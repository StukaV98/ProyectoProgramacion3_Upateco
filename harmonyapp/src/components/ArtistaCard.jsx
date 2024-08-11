import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';
import ArtistDelete from './ArtistaDelete';


export const ArtistaCard = ({ artist, userId }) => {

    const { user__id } = useAuth("state");

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const { name, bio, website, created_at, updated_at } = artist;

    return (
        <div>
            <div>
                <h2> {name} </h2>
                <div>
                    <p>Biografía: <span> {bio ? bio : "Sin datos."} </span></p>
                    <p>Página web: <span>{website ? <a href={website} target="_blank" rel="noopener noreferrer">{website}</a> : "No especificada"}</span></p>
                    <p>Creado: <span> { new Date(created_at).toLocaleDateString("es-ES") } </span></p>
                </div>
            </div>
            <div>
                {artist.owner == userId ? (
                    <>
                        <div className="" onClick={() => setModalDeleteOpen(true)}>
                            <button className="">Eliminar</button>
                        </div>
                        {modalDeleteOpen ? (
                            <ArtistDelete
                                isOpen={modalDeleteOpen}
                                onClose={() => setModalDeleteOpen(false)}
                                artist_id={artist.id}
                            />
                        ) : null}
                    </>
                ) : null}
            </div>
        </div>
    )

}

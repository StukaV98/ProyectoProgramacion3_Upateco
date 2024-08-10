import React, { useState } from 'react';
import ArtistDelete from './ArtistDelete';

export const ArtistCard = ({ artist, userId }) => {
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const { name, bio, website } = artist;

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <p>Biografía: <span>{bio ? bio : "No disponible"}</span></p>
                <p>Página web: <span>{website ? <a href={website} target="_blank" rel="noopener noreferrer">{website}</a> : "No especificada"}</span></p>
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
    );
};
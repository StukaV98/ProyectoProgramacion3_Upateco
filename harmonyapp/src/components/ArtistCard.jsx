 import React from 'react';

 export const ArtistCard = ({ artist, userId }) => {
     const { name, bio, website, created_at, updated_at } = artist;

     return (
         <div>
             <div>
                 <h3>{name}</h3>
                 <p>Biografía: <span>{bio ? bio : "No disponible"}</span></p>
                 <p>Página web: <span>{website ? <a href={website} target="_blank" rel="noopener noreferrer">{website}</a> : "No especificada"}</span></p>
                 <p>Creado: <span>{created_at ? created_at : "Fecha no disponible"}</span></p>
                 <p>Actualizado: <span>{updated_at ? updated_at : "Fecha no disponible"}</span></p>
             </div>
             <div>
                 {
                     artist.owner == userId ? <button>Eliminar</button> : null
                 }
             </div>
         </div>
     );
 };
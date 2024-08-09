import React, { useEffect, useState } from 'react'

function Artista() {
    const [artista, setArtista] = useState([])


    useEffect(() => {
      fetch('https://sandbox.academiadevelopers.com/harmonyhub/artists/13')
       .then((response) => {
         if(!response.ok){
            throw new Error("Error")
         }
         return response.json()
       })
        .then((data) => {
            setArtista(data)
        })}, [artista])
    
        

    return (
        <div>
            <h1>{artista.name}</h1>
            <h3>{artista.bio}</h3>
            <a href="#">Ver Más sobre {artista.name}</a>
        </div>
    )
}

export default Artista
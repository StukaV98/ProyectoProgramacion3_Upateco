import React from 'react'
//import '../styles/componente.css'

const Navbar  = () => {
  return (
    <div>
        <nav>
            <ul>
                <li><a href="/songs">Canciones</a></li>
                <li><a href="/artista">Artista</a></li>
                <li><a href="/login">Iniciar sesion</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar

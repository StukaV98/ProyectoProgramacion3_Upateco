import React from 'react'
// import '../styles/componente.css'

const urlApi = `${import.meta.env.VITE_API_BASE_URL}/docs/`

const Componente = () => {
  return (
    <div>
        <nav>
            <ul>
                <li><a href={urlApi}>Api</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="/login">Iniciar sesion</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Componente
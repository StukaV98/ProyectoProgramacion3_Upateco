import React from 'react';

const urlApi = `${import.meta.env.VITE_API_BASE_URL}/docs/`;

const Componente = () => {
  return (
    <div className="navbar is-primary">
        <nav className="navbar-menu is-active">
            <ul className="navbar-start">
                <li className="navbar-item">
                    <a href={urlApi} className="has-text-white">API</a>
                </li>
                <li className="navbar-item">
                    <a href="/contacto" className="has-text-white">Contacto</a>
                </li>
                <li className="navbar-item">
                    <a href="/login" className="has-text-white">Iniciar sesión</a>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Componente;
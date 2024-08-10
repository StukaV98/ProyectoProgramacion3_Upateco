import React from 'react';

function Contacto() {
    return (
        <div className="box">
            <h1 className="title is-2">Contacto</h1>
            <p className="is-size-5">
               ¡Seguinos en nuestras redes!
            </p>
            <div className="social-media">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    className="button is-light is-large"
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    className="button is-light is-large"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
            </div>
        </div>
    );
}

export default Contacto;
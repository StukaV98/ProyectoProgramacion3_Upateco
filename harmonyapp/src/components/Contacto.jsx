import React from 'react';

function Contacto() {
    return (
        <div className="box has-text-centered has-background-primary-light">
            <h1 className="title is-2 has-text-info">Contacto</h1>
            <p className="is-size-5 has-text-warning-dark">
               ¡Seguinos en nuestras redes!
            </p>
            <div className="buttons is-centered mt-4">
                <a
                    href="https://www.facebook.com/UPATECOSalta"
                    target="_blank"
                    className="button is-link has-text-white-bis has-background-info-dark"
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a
                    href="https://www.instagram.com/upateco_universidad/"
                    target="_blank"
                    className="button has-text-white-bis has-background-success-dark"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
            </div>
        </div>
    );
}

export default Contacto;
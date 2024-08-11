import React from 'react';

function Footer() {
    return (
        <footer className="footer has-background-primary-light has-text-centered py-4">
            <p className="has-text-primary-dark is-size-5">
                Todos los derechos reservados - Grupo 18 Upateco {new Date().getFullYear()}
            </p>
        </footer>
    );
}

export default Footer;
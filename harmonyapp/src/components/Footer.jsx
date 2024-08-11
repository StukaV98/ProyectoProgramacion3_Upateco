import React from 'react'

function Footer() {

  return(
    <footer className="footer has-background-link-dark has-text-centered p-4">
      <p className="has-text-warning is-size-5 is-uppercase has-text-weight-bold">Todos los derechos reservados - Grupo 25 Programacion {new Date().getFullYear()}</p>
    </footer>
  )

}

export default Footer

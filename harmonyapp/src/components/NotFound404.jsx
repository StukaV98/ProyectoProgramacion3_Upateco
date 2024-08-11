import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container has-text-centered mt-6">
      <h1 className="title has-text-danger">Página no encontrada</h1>
      <p className="subtitle has-text-white">Lo sentimos, no se encntruentra la pagina.</p>
      <button onClick={handleGoHome} className="button is-info mt-4">
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
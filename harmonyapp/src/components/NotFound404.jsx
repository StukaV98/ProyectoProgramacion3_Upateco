import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-text">Página no encontrada</h1>
      <button onClick={handleGoHome} className="not-found-button">
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
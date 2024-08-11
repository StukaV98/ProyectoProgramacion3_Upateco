import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';

export default function SongEdit({ isOpen, onClose, song_id }) {

  let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`;

  const { token } = useAuth("state");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cancion, setCancion] = useState({});
  const [cancionEdit, setCancionEdit] = useState({
    title: "",
    year: 0,
  });

  /* Estado para no enviar múltiples peticiones a la API y comprobar campos */
  const [submitting, setSubmitting] = useState(false);

  const doFetch = async () => {
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Solicitud a la canción a editar errónea');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCancion(data);
        }
      })
      .catch((error) => {
        console.error(error, 'Error con el Data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleInputChange(e) {
    setCancionEdit({
      ...cancionEdit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!submitting) {
      setSubmitting(true);
      const newForm = new FormData();
      newForm.append("title", cancionEdit.title);
      newForm.append("year", cancionEdit.year);

      fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: newForm,
      })
        .then((response) => {
          if (!response.ok) {
            setIsError(true);
            throw new Error("No se pudo editar la canción");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error al editar la canción", error);
        })
        .finally(() => {
          return setSubmitting(false);
        });
    }
  }

  useEffect(() => {
    doFetch();
  }, [url]);

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Canción</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <p>Editar canción</p>
          {isLoading ? <h3>Cargando...</h3> : null}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="title">Título: {cancion.title}</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  minLength="3"
                  maxLength="255"
                  name="title"
                  value={cancionEdit.title}
                  onChange={handleInputChange}
                  placeholder="Nuevo título"
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="year">Año: {cancion.year}</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="2024"
                  name="year"
                  value={cancionEdit.year}
                  onChange={handleInputChange}
                  placeholder="Cambiar año"
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className={`button is-link ${submitting ? "is-loading" : ""}`} type="submit" disabled={submitting}>
                  Confirmar edición
                </button>
              </div>
              {isError && <p className="help is-danger">Error al editar</p>}
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={onClose}>Cancelar</button>
        </footer>
      </div>
    </div>
  );
}
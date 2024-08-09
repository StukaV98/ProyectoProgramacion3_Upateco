import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'

function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`https://sandbox.academiadevelopers.com/api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    /* obtengo el token de este response Data */
                    login(responseData.token);
                    if(responseData.token){
                        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data`,{
                            method: "GET",
                            headers: {
                                Authorization: `Token ${responseData.token}`,
                                "Content-Type": "application/json",
                            },
                        })
                            .then((responsePerfil) => {
                                if(!responsePerfil.ok){
                                    throw new Error("error al obtener ID de usuario");
                                }
                                return responsePerfil.json()
                            })
                            .then((dataPerfil) => {
                                /* 
                                obtengo el userID desde el 
                                dataProfile o DataPerfil en este caso 
                                */
                                login(responseData.token, dataPerfil.user__id)
                            })
                            .catch((error) => {
                                console.error(error);
                                setIsError(true);
                            })
                        
                    }
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <section className="">
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <div className="">
                                <input
                                    className=""
                                    type="text"
                                    id="username"
                                    name="username"
                                    ref={usernameRef}
                                />
                                <span className="">
                                    <i className=""></i>
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="password">Contraseña:</label>
                            <div className="">
                                <input
                                    className=""
                                    type="password"
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                />
                                <span className="">
                                    <i className=""></i>
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <button
                                    type="submit"
                                    className=""
                                >
                                    Enviar
                                </button>
                                {isLoading && <p>Cargando...</p>}
                                {isError && <p>Error al cargar los datos.</p>}
                            </div>
                        </div>
                        <a href="/">Inicio</a>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
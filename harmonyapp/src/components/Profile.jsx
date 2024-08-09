import { useState, useEffect, useRef } from "react";
import { useAuth } from "./contexts/AuthContext";
import useFetch from "./hooks/useFetch";


function Profile() {
    const [userData, setUserData] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [iserror, setIsError] = useState(null);

    const { token, user__id } = useAuth("state");
    const { logout } = useAuth("actions");


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data`,{
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error("Falló al hacer fetch del usuario");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setIsError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[])


    return(
        <div>
            {userData ? (
                <div>
                    <h2>Datos de usuario</h2>
                    <form>
                        <h2>Perfil de <span>{userData.first_name}</span></h2>
                        <label>Usuario: </label>
                        <input 
                            type="text"
                            disabled={true}
                            value={userData.username}
                         />
                        <label>Nombre: </label>
                        <input 
                            type="text"
                            disabled={true}
                            value={userData.first_name}
                         />
                        <label>Apellido: </label>
                        <input 
                            type="text"
                            disabled={true}
                            value={userData.last_name}
                         />
                        <label>Email: </label>
                        <input 
                            type="text"
                            disabled={true}
                            value={userData.email}
                         />
                        <br />
                        <label>ID de usuario: </label>
                        <input 
                            type="text"
                            disabled={true}
                            value={userData.user__id}
                         />

                    </form>
                    <p> {userData.bio || "Biografia no disponible"} </p>
                    <a href="/">Inicio</a>
                    <button onClick={()=>logout()}>Cerrar sesion</button>
                </div>

            ) : (
                <p>No se encontraron datos</p>
            )}
        </div>
    )

}


export default Profile;
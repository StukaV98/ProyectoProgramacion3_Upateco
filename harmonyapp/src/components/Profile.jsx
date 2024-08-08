import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
// import "../components/Profile.css";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdating, setErrorUpdating] = useState(false);

    const { token } = useAuth("state");

    const doFetch = async (data) => {
        setLoadingUpdate(true);
        setErrorUpdating(false);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo actualizar el usuario");
            }

            const result = await response.json();
            setUserData(result);
        } catch (error) {
            setErrorUpdating(true);
        } finally {
            setLoadingUpdate(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleEditMode = () => setEditMode(!editMode);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            dob: userData.dob,
            bio: userData.bio,
        };

        doFetch(data);
    };

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            {userData && (
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4 pb-2">
                                {userData.first_name} {userData.last_name}
                            </p>
                            <div
                                className="subtitle is-6"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                {userData.state.name}
                            </div>
                        </div>
                        <button
                            className="button is-primary"
                            onClick={handleEditMode}
                        >
                            {editMode ? "Salir" : "Editar"}
                        </button>
                    </div>
    
                    <form className="content" onSubmit={handleSubmit}>
                        {['email', 'dob', 'bio'].map((field, idx) => (
                            <div className="field" key={idx}>
                                <label className="label">
                                    {field === 'dob' ? 'Fecha de Nacimiento:' : field.charAt(0).toUpperCase() + field.slice(1) + ':'}
                                </label>
                                <div className="control">
                                    {field === 'bio' ? (
                                        <textarea
                                            className="textarea"
                                            id={field}
                                            name={field}
                                            value={userData[field] || "No disponible"}
                                            onChange={(e) =>
                                                setUserData((prev) => ({
                                                    ...prev,
                                                    [field]: e.target.value,
                                                }))
                                            }
                                            disabled={!editMode}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="input"
                                            id={field}
                                            name={field}
                                            value={userData[field]}
                                            onChange={(e) =>
                                                setUserData((prev) => ({
                                                    ...prev,
                                                    [field]: e.target.value,
                                                }))
                                            }
                                            disabled={!editMode}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        {editMode && (
                            <div className="field">
                                <button
                                    className="button is-primary is-fullwidth"
                                    type="submit"
                                >
                                    {loadingUpdate ? "Enviando..." : "Enviar"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Profile;
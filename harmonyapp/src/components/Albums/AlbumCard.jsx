import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumCard({ album, artistName, onDelete }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/albums/editar/${album.id}`);
    };

    const handleDeleteClick = async () => {
        if (window.confirm("Are you sure you want to delete this album?")) {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${album.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    alert("Album successfully deleted");
                    if (onDelete) onDelete();
                    navigate("/albums");
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
            } catch (error) {
                console.error("Failed to delete album:", error);
                alert("Failed to delete album");
            }
        }
    };

    return (
        <div className='album-card'>
            <div className='album-cover'>
                <img src={album.cover || require('../../assets/album.jpg').default} alt={album.title} />
            </div>
            <div className='album-info'>
                <h3>{album.title}</h3>
                <p>{artistName}</p>
                <p>{album.year}</p>
                <p>#{album.id}</p>
            </div>
            <div className='button-options'>
                <button className='edit-button' onClick={handleEditClick}>
                    Edit
                </button>
                <button className='delete-button' onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    );
}
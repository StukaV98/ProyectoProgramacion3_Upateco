import React, { useEffect, useState, useRef } from "react";
import SongCard from "./SongCard";

const ITEMS_PER_PAGE = 5;

const SongList = () => {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const fetchSongs = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: ITEMS_PER_PAGE,
            ordering: '-created_at',
            ...filters,
        }).toString();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`);
            const data = await response.json();
            if (data.results) {
                setSongs(prevSongs => [...prevSongs, ...data.results]);
                setNextUrl(data.next);
                setIsError(false);
            }
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextUrl) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current);
        }
    }, [isLoading, nextUrl]);

    const handleSearch = async (event) => {
        event.preventDefault();

        const searchForm = new FormData(event.target);
        const newFilters = {};

        searchForm.forEach((value, key) => {
            if (value) newFilters[key] = value;
        });

        setFilters(newFilters);
        setSongs([]);
        setPage(1);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchResult(null);
        setErrorMessage('');
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResult(null);
        setErrorMessage('');
        setPage(1);
    };

    const songsToShow = searchResult ? [searchResult] : songs;

    if (isError) return <p>Error loading songs.</p>;
    if (!songs.length && !isLoading) return <p>No hay cancones disponible</p>;

    return (
        <div className="song-list">
            <div className='top-bar'>
                <div className="add-song">
                    <button className="add-button">Agregar cancion</button>
                </div>
                <div className='search-container'>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder='Ingresar el ID de una Cancion'
                        className='search-input'
                    />
                    <button type='submit' className="search-button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <form className="box" onSubmit={handleSearch}>
                <div className="field">
                    <label className="label">Titulo:</label>
                    <div className="control">
                        <input className="input" type="text" name="title" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Artista:</label>
                    <div className="control">
                        <input className="input" type="number" name="artists" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Fecha de inicio:</label>
                    <div className="control">
                        <input className="input" type="datetime-local" name="created_at_min" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Fecha de finalizacion:</label>
                    <div className="control">
                        <input className="input" type="datetime-local" name="created_at_max" />
                    </div>
                </div>
                <div className="field">
                    <button className="button is-primary" type="submit">Busqueda</button>
                </div>
            </form>
            {errorMessage || searchResult ? (
                <div className="not-found">
                    {errorMessage ? (
                        <div className="not-found-message">
                            <p>{errorMessage}</p>
                        </div>
                    ) : (
                        <SongCard key={searchResult.id} song={searchResult} />
                    )}
                    <button className="pagination-button" onClick={handleClearSearch}>Volver</button>
                </div>
            ) : songsToShow.length > 0 ? (
                <>
                    <ul>
                        {songsToShow.map((song, index) => {
                            if (songsToShow.length === index + 1) {
                                return (
                                    <div key={song.id} ref={lastSongElementRef} className="column is-two-thirds">
                                        <SongCard song={song} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={song.id} className="column is-two-thirds">
                                        <SongCard song={song} />
                                    </div>
                                );
                            }
                        })}
                    </ul>
                    {isLoading && <p>Cargando mas canciones...</p>}
                </>
            ) : (
                <div className="not-found">
                    <div className="not-found-message">No se encontro mas resultados</div>
                    <button className="pagination-button" onClick={handleClearSearch}>Volver</button>
                </div>
            )}
        </div>
    );
};

export default SongList;
import React, { useState, useEffect } from 'react';
import Album from './AlbumCard';

const ITEMS_PER_PAGE = 6;

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/albums?page=${currentPage}&page_size=${ITEMS_PER_PAGE}`);
                const data = await response.json();
                setAlbums(data.results);
                setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
                setErrorMessage('');
            } catch (error) {
                console.error("Error fetching albums: ", error);
                setErrorMessage('Error al cargar albums.');
            }
        };

        if (!searchResult) {
            fetchAlbums();
        }
    }, [currentPage, searchResult]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums?title=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                if (data.results.length > 0) {
                    setSearchResult(data.results[0]);
                    setErrorMessage('');
                    setTotalPages(1);
                    setCurrentPage(1);
                } else {
                    setSearchResult(null);
                    setErrorMessage('No se encontraron resultados.');
                }
            } else {
                setSearchResult(null);
                setErrorMessage('Error al buscar albums.');
            }
        } catch (error) {
            console.error("Error al buscar albums: ", error);
            setSearchResult(null);
            setErrorMessage('Error al buscar albums.');
        }
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
        setCurrentPage(1);
    };

    const getAlbumsToShow = () => {
        if (searchResult) {
            return [searchResult];
        }
        return albums;
    };

    const albumsToShow = getAlbumsToShow();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                        + Agregar
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder='Enter title to search for an album'
                        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
                    />
                    <button
                        type='submit'
                        onClick={handleSearch}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                    >
                        🔍 Buscar
                    </button>
                </div>
            </div>
            {errorMessage || searchResult ? (
                <div style={{ textAlign: 'center', color: '#ff0000' }}>
                    {errorMessage ? (
                        <>
                            <div style={{ fontSize: '18px', marginBottom: '20px' }}>{errorMessage}</div>
                        </>
                    ) : (
                        <Album key={searchResult.id} album={searchResult} />
                    )}
                    <button
                        onClick={handleClearSearch}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
                    >
                        Volver
                    </button>
                </div>
            ) : albumsToShow.length > 0 ? (
                <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {albumsToShow.map((album) => (
                            <div key={album.id} style={{ width: 'calc(33.333% - 20px)', boxSizing: 'border-box' }}>
                                <Album album={album} />
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                            >
                                ◀ Anterior
                            </button>
                            <span style={{ padding: '10px 20px', fontSize: '16px' }}>{currentPage}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                            >
                                Siguiente ▶
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div style={{ textAlign: 'center', color: '#ff0000' }}>
                    <div style={{ fontSize: '18px', marginBottom: '20px' }}>No se encontraron resultados</div>
                    <button
                        onClick={handleClearSearch}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
                    >
                        Volver
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlbumList;
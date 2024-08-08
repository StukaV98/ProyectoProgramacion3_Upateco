function AlbumCard({album}) {

    return(
        <div className='album-card'>
            <div className='album-cover'>
                <img src={coverImage} alt={album.title} />
            </div>
            <div className='album-info'>
                <h3>{album.title}</h3>
                <p>{album.artist}</p>
                <p>{album.year}</p>
                <p>#{album.id}</p>
            </div>
        </div>
    );
}

export default AlbumCard;
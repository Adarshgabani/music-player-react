import React from 'react';


const LibrarySong = ({ activeLibraryHandler, song, setCurrentSong, audioRef, isPlaying, setSongs, songs }) => {
    //Event Handler
    const songSelectHandler = async () => {


        await setCurrentSong(song);
        activeLibraryHandler(song)


    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;
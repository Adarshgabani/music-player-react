import React from 'react';
import { playAudio } from '../util'
const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying, setSongs, songs }) => {
    //Event Handler
    const songSelectHandler = () => {


        setCurrentSong(song);
        //set Song State
        const newSongs = songs.map((songState) => {
            if (songState.id === song.id) {
                return {
                    ...songState,
                    active: true,
                }
            } else {
                return {
                    ...songState,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        playAudio(isPlaying, audioRef);


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
import React from 'react';
import LibrarySong from './LibrarySong';
const Library = ({ activeLibraryHandler, songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(song => <LibrarySong activeLibraryHandler={activeLibraryHandler} songs={songs} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} song={song} key={song.id} />)
                }
            </div>
        </div>
    )
}

export default Library;
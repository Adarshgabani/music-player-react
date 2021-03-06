import React, { useState, useRef } from 'react';
// Importing Styles

import './styles/app.scss'

// Importing Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// importing util
import data from './data'


function App() {
  //Ref
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPercentage: 0 })
  const [libraryStatus, setLibraryStatus] = useState(false)
  //Event Handler
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage..
    const roundedCurrentTime = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrentTime / roundedDuration) * 100);
    setSongInfo({
      ...songInfo, currentTime, duration, animationPercentage
    })
  }


  const activeLibraryHandler = (nextprev) => {
    const newSongs = songs.map((songState) => {
      if (songState.id === nextprev.id) {
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
    if (isPlaying) audioRef.current.play()
  }
  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((songState) => songState.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length])

  }
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player activeLibraryHandler={activeLibraryHandler} songs={songs} setSongs={setSongs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Library activeLibraryHandler={activeLibraryHandler} libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler} ></audio>

    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
// Importing Styles

import './styles/app.scss'

// Importing Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library'

// importing util
import data from './util'


function App() {
  //Ref
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 })
  //Event Handler
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      currentTime, duration
    })


  }
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;

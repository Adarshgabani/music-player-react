import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../util';
const Player = ({ currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setSongs }) => {
    //useEffect
    useEffect(() => {
        //set Song State
        const newSongs = songs.map((songState) => {
            if (songState.id === currentSong.id) {
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
        playAudio(isPlaying, audioRef)
    }, [currentSong])
    //Event /Handlers
    const playSongHandler = () => {

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }


    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })

    }
    const skipHandler = (direction) => {
        const currentIndex = songs.findIndex((songState) => songState.id === currentSong.id)
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1)])
        }
    }
    //add  Styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return (
        <div className="player-container">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime || 0)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})` }} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"

                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipHandler('skip-back')}
                    className='skip-back'
                    size='2x'
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='2x'
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipHandler('skip-forward')}
                    className='skip-forword'
                    size='2x'
                    icon={faAngleRight}
                />

            </div>
        </div>
    )
}

export default Player;
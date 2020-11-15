export const playAudio = (isPlaying, audioRef) => {
    //to play audio
    if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
            playPromise.then((audio) => {
                audioRef.current.play()
            })
        }
    }
}
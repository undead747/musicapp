import { useEffect, useRef } from "react"
import TrackPlayer, { RepeatMode } from "react-native-track-player"

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    })

    await TrackPlayer.setVolume(0.03)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue) 
}

const useSetupTrackPlayer = ({onload}: {onload?: () => void}) => {
    const isInitialize = useRef(false)
  
    useEffect(() => {
        setupPlayer().then(()=> {
            isInitialize.current = true
            onload?.()
        }).catch((error)=>{
             isInitialize.current = false
             console.error(error)    
        })        
    }, [onload]) 
}

export default useSetupTrackPlayer
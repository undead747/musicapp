import { useLocalSearchParams, useRouter } from "expo-router"
import TrackPlayer, { Track } from "react-native-track-player"
import { usePlaylists, useTracks } from "../store/library"
import { useQueue } from "../store/queue"
import { Playlist } from "@/helper/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { PlaylistsList } from "@/components/PlaylistsList"
import { defaultStyles } from "@/styles"
import { StyleSheet } from 'react-native'
import { screenPadding } from "@/constants/tokens"
import { useHeaderHeight } from '@react-navigation/elements'

export const addToPlaylistModal = () => {
   const router = useRouter()
   const {activeQueueId} = useQueue()
   const headerHeight = useHeaderHeight()


    const {trackUrl} = useLocalSearchParams<{trackUrl: Track['url']}>()

    const tracks = useTracks()

    const {playlists, addToPlaylist} = usePlaylists()

    const track = tracks.find(track => track.url === trackUrl)

    if(!track) return 

    const availablePlaylists = playlists.filter(
		(playlist) => !playlist.track.some((playlistTrack) => playlistTrack.url === track.url),
	)
    
    const handlePlaylistPress = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)

        router.dismiss()

        if(activeQueueId?.startsWith(playlist.name)){
            await TrackPlayer.add(track)
        }
    }

    return(
        <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
            <PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default addToPlaylistModal
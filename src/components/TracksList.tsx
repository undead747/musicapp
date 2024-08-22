import { FlatList, FlatListProps, Text, View } from 'react-native'
import library from '@/assets/data/library.json'
import TracksListItem from './TracksListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknowTrackImageUri } from '@/constants/image'
import { useRef } from 'react'
import { useQueue } from '@/app/store/queue'
import { QueueControl } from './QueueControl'

export type TracksListProps = Partial<FlatListProps<Track>> & {
    id: string,
    tracks: Track[]
}

const ItemDevider = () => (
    <View style={{ ...utilsStyles.itemSeperator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ id, tracks, ...flatListProps }: TracksListProps) => {
    const queueOffset = useRef(0)
    const { activeQueueId, setActiveQueueId } = useQueue()

    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

        if (trackIndex === -1) return

        const isChangingQueue = id !== activeQueueId

        if (isChangingQueue) {
            const beforeTracks = tracks.slice(0, trackIndex)
            const afterTracks = tracks.slice(trackIndex + 1)

            await TrackPlayer.reset()

            await TrackPlayer.add(selectedTrack)
            await TrackPlayer.add(afterTracks)
            await TrackPlayer.add(beforeTracks)

            await TrackPlayer.play()

            queueOffset.current = trackIndex
            setActiveQueueId(id)
        } else {
            const nextTrackIndex = trackIndex - queueOffset.current < 0 ? tracks.length + trackIndex - queueOffset.current
                : trackIndex - queueOffset.current

            await TrackPlayer.skip(nextTrackIndex)

            TrackPlayer.play()
        }
    }

    return <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
        ListHeaderComponent={<QueueControl tracks={tracks} style={{ paddingBottom: 20 }} />}
        ListFooterComponent={ItemDevider}
        data={tracks}
        ItemSeparatorComponent={ItemDevider}
        ListEmptyComponent={<View>
            <Text style={utilsStyles.emptyComponentText}>No songs found</Text>
            <FastImage
                source={{ uri: unknowTrackImageUri, priority: FastImage.priority.normal }}
            />
        </View>}
        renderItem={({ item: track }) => (
            <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
        )}
        {...flatListProps}
    />
}
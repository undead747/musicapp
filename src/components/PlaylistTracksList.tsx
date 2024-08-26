import { trackTitleFilter } from "@/helper/filter"
import { Playlist } from "@/helper/types"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import React, { useMemo } from "react"
import { TracksList } from "./TracksList"
import { generateTracksListId } from "@/helper/misellaneous"
import {StyleSheet, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { QueueControl } from "./QueueControl"
import { defaultStyles } from "@/styles"
import { fontSize } from "@/constants/tokens"

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const filteredPlaylistTracks = useMemo(() => {
		return playlist.track.filter(trackTitleFilter(search))
	}, [playlist.track, search])

	return (
		<TracksList
			id={generateTracksListId(playlist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.playlistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: playlist.artworkPreview,
								priority: FastImage.priority.high,
							}}
							style={styles.artworkImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.playlistNameText}>
						{playlist.name}
					</Text>

					{search.length === 0 && (
						<QueueControl style={{ paddingTop: 24 }} tracks={playlist.tracks} />
					)}
				</View>
			}
			tracks={filteredPlaylistTracks}
		/>
	)
}

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
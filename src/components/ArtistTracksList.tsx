import { unknowArtistImageUri } from "@/constants/image"
import { generateTracksListId } from "@/helper/misellaneous"
import FastImage from "react-native-fast-image"
import { QueueControl } from "./QueueControl"
import {StyleSheet, View, Text } from "react-native"
import { defaultStyles } from "@/styles"
import { fontSize } from "@/constants/tokens"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { trackTitleFilter } from "@/helper/filter"
import { useMemo } from "react"
import { TracksList } from "./TracksList"

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<TracksList
			id={generateTracksListId(artist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.artistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: unknowArtistImageUri,
								priority: FastImage.priority.high,
							}}
							style={styles.artistImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>

					{search.length === 0 && (
						<QueueControl tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
			tracks={filteredArtistTracks}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
import MovingText from "@/components/MovingText"
import { unknowTrackImageUri } from "@/constants/image"
import { colors, fontSize, screenPadding } from "@/constants/tokens"
import { defaultStyles, utilsStyles } from "@/styles"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useActiveTrack } from "react-native-track-player"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { PlayerControls } from "@/components/PlayerControls"
import { PlayerProgessBar } from "@/components/PlayerProgessBar"
import { PlayVolumeBar } from "@/components/PlayVolumnBar"
import PlayerRepeatToggle from "@/components/PlayerRepeatToggle"
import { usePlayerBackground } from "@/hooks/usePlayerBackground"
import { LinearGradient } from "expo-linear-gradient"

const PlayerScreen = () => {
}

const DismissPlayerSymbol = () => {
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export default PlayerScreen
import MovingText from "@/components/MovingText"
import { colors, fontSize, screenPadding } from "@/constants/tokens"
import { defaultStyles, utilsStyles } from "@/styles"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useActiveTrack } from "react-native-track-player"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { PlayerControls } from "@/components/PlayerControls"
import { PlayerProgessBar } from "@/components/PlayerProgessBar"
import { PlayerVolumeBar } from "@/components/PlayVolumnBar"
import PlayerRepeatToggle from "@/components/PlayerRepeatToggle"
import { usePlayerBackground } from "@/hooks/usePlayerBackground"
import { LinearGradient } from "expo-linear-gradient"
import { unknowTrackImageUri } from '@/constants/image'

const PlayerScreen = () => {
    const activeTrack = useActiveTrack()
    const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknowTrackImageUri)

    const { top, bottom } = useSafeAreaInsets()
    const isFavorite = false
    const toggleFavorite = () => { }

    if (!activeTrack) {
        return (
            <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator color={colors.icon} />
            </View>
        )
    }

    return (
        <LinearGradient style={{ flex: 1 }} colors={imageColors ? [imageColors.background, imageColors.primary] : [colors.background]} >
            <View style={styles.overlayContainer}>
                <DismissPlayerSymbol />

                <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
                    <View style={styles.artworkImageContainer}>
                        <FastImage
                            source={{
                                uri: activeTrack.artwork ?? unknowTrackImageUri,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode="cover"
                            style={styles.artworkImage}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 'auto' }}>
                            <View style={{ height: 60 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Track title */}
                                    <View style={styles.trackTitleContainer}>
                                        <MovingText
                                            text={activeTrack.title ?? ''}
                                            animationThreshold={30}
                                            style={styles.trackTitleText}
                                        />
                                    </View>

                                    {/* Favorite button icon */}
                                    <FontAwesome
                                        name={isFavorite ? 'heart' : 'heart-o'}
                                        size={20}
                                        color={isFavorite ? colors.primary : colors.icon}
                                        style={{ marginHorizontal: 14 }}
                                        onPress={toggleFavorite}
                                    />
                                </View>

                                {/* Track artist */}
                                {activeTrack.artist && (
                                    <Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
                                        {activeTrack.artist}
                                    </Text>
                                )}
                            </View>

                            <PlayerProgessBar style={{ marginTop: 32 }} />

                            <PlayerControls style={{ marginTop: 40 }} />
                        </View>

                        <PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />

                        <View style={utilsStyles.centeredRow}>
                            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={{
            position: 'absolute',
            top: top + 8,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <View accessible={false} style={{
                width: 50,
                height: 8,
                borderRadius: 8,
                backgroundColor: '#fff',
                opacity: 0.7
            }} />
        </View>
    )
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

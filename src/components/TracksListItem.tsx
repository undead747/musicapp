import { unknowTrackImageUri } from '@/constants/image'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'

export type TracksListItemProps = {
    track: Track,
    onTrackSelect: (track: Track) => void
}

const TracksListItem = ({ track, onTrackSelect: handleTrackSelect }: TracksListItemProps) => {
    const playing = useIsPlaying()
    const isActiveTrack = useActiveTrack()?.url === track.url;
 
    return (
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View style={styles.trackItemContainer}>
                <View>
                    <FastImage
                        source={{
                            uri: track.artwork ?? unknowTrackImageUri,
                            priority: FastImage.priority.normal
                        }}
                        style={{
                            ...styles.trackArtworkImage,
                            opacity: isActiveTrack ? 0.6 : 1,
                        }}
                    />
                    {
                        isActiveTrack && 
                        (playing.playing ? ( <LoaderKit style={styles.trackPlayingIconIndicator} name='LineScaleParty' color={colors.icon} /> ) : (
                            <Ionicons style={styles.trackPausedIndicator} name='play' size={24} color={colors.icon} />   
                        ))

                    }
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <Text numberOfLines={1}
                            style={{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text
                            }}
                        >{track.title}</Text>
                        <Text numberOfLines={1}
                            style={{
                                ...styles.trackArtistText,
                                color: isActiveTrack ? colors.primary : colors.text
                            }}
                        >{track.artist}</Text>
                    </View>

                    <Entypo name='dots-three-horizontal' size={18} color={colors.icon} />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20
    },
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistText: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4
    },
    trackPlayingIconIndicator: {
         position: 'absolute',
         top: 10,
         left: 16,
         width: 16, 
         height: 16

    },
    trackPausedIndicator: {
        position: 'absolute',
        top: 14,
        left: 14
    }
})

export default TracksListItem
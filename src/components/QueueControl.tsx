import React from 'react'
import { StyleSheet, Text, Touchable, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TrackPlayer, { Track } from 'react-native-track-player'
import {Ionicons} from '@expo/vector-icons'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'

type QueueControlProps = {
    tracks: Track[]
} & ViewProps

export const QueueControl = ({tracks, style, ...viewProps}: QueueControlProps) => {
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks)
    await TrackPlayer.play()
  } 


  const handleShuffePlay = async () => {
    const shuffeTrack = [...tracks].sort(() => Math.random() - 0.5)

    await TrackPlayer.setQueue(shuffeTrack)
    await TrackPlayer.play()
  }

  return (
        <View style={[{flexDirection: 'row', columnGap: 16}, style]} {...viewProps}>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
                        <Ionicons name="play" size={22} color={colors.primary} />
                        <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
            </View>


            <View style={{flex: 1}}>
                <TouchableOpacity
                    onPress={handleShuffePlay}
                    activeOpacity={0.8}
                    style={styles.button}
                    >
                        <Ionicons name={'shuffle-sharp'} size={24} color={colors.primary} />
                        <Text style={styles.buttonText}>Shuffe</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: 'rgba(47, 47, 47, 0.5)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 8
    },
    buttonText: {
        ...defaultStyles.text,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center'
    }
})
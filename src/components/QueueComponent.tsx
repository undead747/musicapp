import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Track } from 'react-native-track-player'

type QueueControlProps = {
    tracks: Track[]
} & ViewProps

export const QueueComponent = ({tracks, style, ...viewProps}: QueueControlProps) => {
  return (
    <View>
        <View style={{flex: 1}}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>

            </TouchableOpacity>
        </View>

        <View style={{flex: 1}}></View>
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
        alignItems: 'center',
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
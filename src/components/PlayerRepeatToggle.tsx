import React, { ComponentProps } from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { RepeatMode } from 'react-native-track-player'
import { match } from 'ts-pattern'
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode'
import { colors } from '@/constants/tokens'

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const

const PlayerRepeatToggle = ({...iconProps}: IconProps) => {
  const {repeatMode, changeRepeatMode} = useTrackPlayerRepeatMode()

  const toggleRepeatMode = () => {
    if(repeatMode == null) return

    const currIndex = repeatOrder.indexOf(repeatMode)
    const nextIndex = (currIndex + 1) % repeatOrder.length

    changeRepeatMode(repeatOrder[nextIndex])
  }

  const icon = match(repeatMode).returnType<IconName>()
  .with(RepeatMode.Off, () => 'repeat-off')
  .with(RepeatMode.Track, () => 'repeat-once')
  .with(RepeatMode.Queue, () => 'repeat')
  .otherwise(() => 'repeat-off')

    return (
     <MaterialCommunityIcons 
        name={icon}
        onPress={toggleRepeatMode}
        color={colors.icon}
        {...iconProps }
     />
  )
}

export default PlayerRepeatToggle
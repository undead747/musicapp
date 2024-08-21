import { View, ViewProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSharedValue } from "react-native-reanimated"
import { colors } from "@/constants/tokens"
import { Slider } from "react-native-awesome-slider"
import { utilsStyles } from "@/styles"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"
import { useTrackPlayerVolumn } from "@/hooks/useTrackPlayerVolumn"

export const PlayVolumeBar = ({style}: ViewProps) => {
    const {volume, updateVolume} = useTrackPlayerVolumn()

    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    progress.value = volume ?? 0

    return (
        <View style={style}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="volume-low-outline" size={20} color={colors.icon} style={{opacity: 0.8}} />
                </View>

                <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                containerStyle={utilsStyles.slider}
                theme={{
                    minimumTrackTintColor: colors.minimumTrackTintColor,
                    maximumTrackTintColor: colors.maximumTrackTintColor
                }}
                onValueChange={(value) => {
                    updateVolume(value)
                }}  
            />

            <Ionicons name="volume-high-outline" size={20} color={colors.icon} style={{opacity: 0.8}} />
        </View>
  )
}

import { View, ViewProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSharedValue } from "react-native-reanimated"
import { colors } from "@/constants/tokens"
import { Slider } from "react-native-awesome-slider"
import { utilsStyles } from "@/styles"
import { useTrackPlayerVolumn } from "@/hooks/useTrackPlayerVolumn"

export const PlayerVolumeBar = ({ style }: ViewProps) => {
	const { volume, updateVolume } = useTrackPlayerVolumn()

	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	progress.value = volume ?? 0

	return (
		<View style={style}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />

				<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}>
					<Slider
						progress={progress}
						minimumValue={min}
						containerStyle={utilsStyles.slider}
						onValueChange={(value) => {
							updateVolume(value)
						}}
						renderBubble={() => null}
						theme={{
							maximumTrackTintColor: colors.maximumTrackTintColor,
							minimumTrackTintColor: colors.minimumTrackTintColor,
						}}
						thumbWidth={0}
						maximumValue={max}
					/>
				</View>

				<Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
			</View>
		</View>
	)
}
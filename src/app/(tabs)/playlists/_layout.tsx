import { defaultStyles } from "@/styles"
import { StackScreenWithSearchBar } from "@/constants/layout"
import { Stack } from "expo-router"
import { View } from "react-native"
import { colors } from "@/constants/tokens"

const PlaylistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						headerTitle: 'Playlists',
					}}
				/>

				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
					}}
				/>

				<Stack.Screen
					name="(modals)/addToPlaylist"
					options={{
						presentation: 'modal',
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTitle: 'Add to playlist',
						headerTitleStyle: {
							color: colors.text,
						},
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlaylistsScreenLayout
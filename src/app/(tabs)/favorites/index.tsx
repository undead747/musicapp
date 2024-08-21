import { defaultStyles } from "@/styles"
import { useMemo } from "react"
import { Text, View } from "react-native"
import library from "@/assets/data/library.json"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { ScrollView } from "react-native-gesture-handler"
import { screenPadding } from "@/constants/tokens"
import { TracksList } from "@/components/TracksList"
import { useFavorites } from "@/app/store/library"
import { trackTitleFilter } from "@/helper/filter"

const FavoritesScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'find a songs'
        }
    })

    const favoritesTracks = useFavorites().favorites

    const filteredFavoritesTracks = useMemo(() => {
        if(!search) return favoritesTracks

        return favoritesTracks.filter(trackTitleFilter(search))
    }, [search, favoritesTracks])

    return (
        <View style={defaultStyles.container}>
          <ScrollView
            style={{paddingHorizontal: screenPadding.horizontal}}
            contentInsetAdjustmentBehavior="automatic"
          >
            <TracksList scrollEnabled={false} tracks={favoritesTracks} />
          </ScrollView>
        </View>
    )
}

export default FavoritesScreen; 
import { TracksList } from "@/components/TracksList";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles"
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native"
import library from '@/assets/data/library.json'
import { trackTitleFilter } from "@/helper/filter";
import { generateTracksListId } from "@/helper/misellaneous";

const SongsScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs'
        }
    })

    const filteredSongs = useMemo(() => {
          if(!search) return library;

          return library.filter(trackTitleFilter(search)); 
    }, [search])

    return (
        <View style={defaultStyles.container}>
            <ScrollView 
              contentInsetAdjustmentBehavior="automatic"
              style={{paddingHorizontal: screenPadding.horizontal}}
            >
                <TracksList id={generateTracksListId('favorites', search)} tracks={filteredSongs} scrollEnabled={false} />
            </ScrollView>
        </View>
    )
}

export default SongsScreen;
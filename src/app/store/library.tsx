import { Artist, TrackWithPlaylist } from "@/helper/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from '@/assets/data/library.json'

interface LibraryState {
    tracks: TrackWithPlaylist[],
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playListName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: library,
    toggleTrackFavorite: (track) =>
    set((state) => ({
        tracks: state.tracks.map((currentTrack) => {
            if (currentTrack.url === track.url) {
                return {
                    ...currentTrack,
                    rating: currentTrack.rating === 1 ? 0 : 1,
                }
            }

            return currentTrack
        }),
    })),
    addToPlaylist: () => {}
})) 

export const useTracks = () => useLibraryStore(state => state.tracks)

export const useFavorites = () => {
    const favorites = useLibraryStore(state => state.tracks.filter(track => track.rating === 1))

    const toggleTrackFavorite = useLibraryStore(state => state.toggleTrackFavorite)

    return {
        favorites,
        toggleTrackFavorite
    }
}

export const useArtists = () => {
    const artists = useLibraryStore(state => {
        return state.tracks.reduce((acc, track) => {
            const existedArtist = acc.find(artist => artist.name === track.artist)

            if(!existedArtist){
                acc.push({
                    name: track.artist ?? "unknown", 
                    tracks: [track]
                })
            }else{
                acc.tracks.push(track)
            }

            return acc
        }, [] as Artist[])
    })

    return artists
}

export const usePlaylists = () => {
    const playlists = useLibraryStore(state => {
        return state.tracks.reduce((acc, track) => {
            const existedArtist = acc.find(artist => artist.name === track.artist)

            if(!existedArtist){
                acc.push({
                    name: track.artist ?? "unknown", 
                    tracks: [track]
                })
            }else{
                acc.tracks.push(track)
            }

            return acc
        })
    })

    const addToPlaylist = useLibraryStore(state => state.addToPlaylist)

    return {playlists, addToPlaylist}
}


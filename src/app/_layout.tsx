import { playbackService } from '@/constants/playbackService';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import useSetupTrackPlayer from '@/hooks/useSetupTrackPlayer';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync()
    }, []) 

    useSetupTrackPlayer({
        onload: handleTrackPlayerLoaded
    })

    useLogTrackPlayerState()

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <RootNavigation />
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

const RootNavigation = () => {
    return <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
            name="player"
            options={{
                presentation: 'card',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationDuration: 400,
                headerShown: false,
            }}
        />
    </Stack>
}

export default App;
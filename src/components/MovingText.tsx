import { useEffect } from 'react'
import Animated, {Easing, StyleProps, cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming} from 'react-native-reanimated'

export type MovingTextProps = {
    text: string,
    animationThreshold: number,
    style?: StyleProps
}

const MovingText = ({text, animationThreshold, style}: MovingTextProps) => {
     const translateX = useSharedValue(0)
     const shouldAnimate = text.length >= animationThreshold
    const textLength = text.length * 3;

    useEffect(() => {
        if(!shouldAnimate) return
        
        translateX.value = withDelay(
            1000,
            withRepeat(
                withTiming(-textLength, {
                    duration: 5000,
                    easing: Easing.linear
                })
            )
        )

        return () => {
            cancelAnimation(translateX)
            translateX.value = 0
        }
    }, [translateX, text, animationThreshold, shouldAnimate, textLength])

     const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]
        }
     })

    return (
        <Animated.Text numberOfLines={1} style={[style, animatedStyle,
        shouldAnimate && {
            width: 9999,
            paddingLeft: 16,
        }]}>
            {text}
        </Animated.Text>
  )
}

export default MovingText
import { PropsWithChildren } from "react"
import { View } from "react-native-reanimated/lib/typescript/Animated"

export const StopPropagation = ({children}: PropsWithChildren) => {
  return (
    <View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()}>
        {children} 
    </View>
  )
}

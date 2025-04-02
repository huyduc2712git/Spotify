import { ImageStyle, StyleProp, View } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder-expo"

interface Props {
  style?: StyleProp<ImageStyle>
}

export const SkeletonImage = ({ style }: Props) => {
  return (
    <SkeletonPlaceholder>
      <View style={style}>
        <SkeletonPlaceholder.Item width={"100%"} height={"100%"} borderRadius={10} />
      </View>
    </SkeletonPlaceholder>
  )
}

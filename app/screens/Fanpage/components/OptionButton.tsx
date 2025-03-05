import { Text } from "@/components"
import normalize, { normalizeText } from "@/utils/normalize"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

interface Props {
  title: string
  disabled?: boolean
  onPress: () => void
  backgroundColor?: string
  titleColor?: string
}

export const OptionButton = ({ title, disabled, onPress, backgroundColor = "#F5F6F8", titleColor = "#6E6D7A" }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!!disabled}>
      <View style={[$container, { backgroundColor }]}>
        <Text text={title} style={[$title, { color: titleColor }]} weight="semiBold" />
      </View>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  borderRadius: normalize(12),
  marginVertical: normalize(8),
  paddingVertical: normalize(12),
  marginHorizontal: normalize(16),
}

const $title: TextStyle = {
  fontSize: normalizeText(16),
  lineHeight: normalizeText(22.4),
}

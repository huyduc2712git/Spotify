import { Text } from "@/components"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

interface Props {
  title: string
  disabled?: boolean
  onPress: () => void
}

export const OptionButton = ({ title, disabled, onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!!disabled}>
      <View style={$container}>
        <Text text={title} style={$title} weight="semiBold" />
      </View>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  backgroundColor: "#F9474E",
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
  color: colors.palette.neutral100,
}

import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { Image, ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native"

export const SearchChannel = () => {
  return (
    <View style={$container}>
      <View style={$boxInput}>
        <Image source={Icons.ic_search} style={$icon} />
        <TextInput
          placeholder="Nhập ID hoặc nội dung..."
          placeholderTextColor={"#6E6D7A"}
          style={$input}
        />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: normalize(16),
  paddingVertical: normalize(8),
}

const $icon: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

const $boxInput: ViewStyle = {
  backgroundColor: "#F5F6F7",
  paddingVertical: normalize(10),
  paddingHorizontal: normalize(12),
  borderRadius: normalize(8),
  alignItems: "center",
  flexDirection: "row",
  gap: normalize(8),
}

const $input: TextStyle = {
  flex: 1,
  marginLeft: 8,
  fontSize: normalizeText(16),
  lineHeight: normalizeText(19.36),
}

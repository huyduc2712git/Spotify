import { Text } from "@/components"
import { navigationRef } from "@/navigators"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"

export const Header = () => {
  return (
    <View style={$container}>
      <View style={$contentLeft}>
        <Pressable onPress={() => navigationRef.goBack()}>
          <Image source={Icons.ic_back} style={$icon} />
        </Pressable>

        <Text text="Tất cả page" weight="semiBold" style={$title} />
      </View>
      <View style={$contentRight}>
        <Image source={Icons.ic_arrange} style={$icon} />
        <Image source={Icons.ic_option} style={$icon} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: normalize(16),
  paddingVertical: normalize(12),
}

const $title: TextStyle = {
  fontSize: normalizeText(22),
  lineHeight: normalizeText(22),
  color: colors.palette.neutral800,
}

const $icon: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

const $contentLeft: ViewStyle = { flexDirection: "row", alignItems: "center", gap: normalize(16) }
const $contentRight: ViewStyle = { flexDirection: "row", alignItems: "center", gap: normalize(16) }

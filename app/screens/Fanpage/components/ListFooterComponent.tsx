import { Text } from "@/components"
import SmartImage from "@/components/SmartImage/SmartImage"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"

export const ListFooterComponent = ({ onPressModal }: { onPressModal: () => void }) => {
  return (
    <Pressable style={$pageItem} onPress={onPressModal}>
      <View style={$addImage}>
        <SmartImage source={Icons.ic_add} style={$iconAdd} />
      </View>
      <Text text="Thêm fanpage mới" style={$titleItem} weight="medium" />
    </Pressable>
  )
}

const $pageItem: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: normalize(12),
  alignItems: "center",
  flexDirection: "row",
  gap: normalize(12),
  borderRadius: normalize(12),
}

const $titleItem: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalizeText(19.36),
  color: colors.palette.neutral800,
}

const $addImage: ViewStyle = {
  width: normalize(54),
  height: normalize(54),
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F5F6F8",
  borderRadius: normalize(16),
}

const $iconAdd: ImageStyle = {
  width: normalize(14),
  height: normalize(14),
  resizeMode: "contain",
}

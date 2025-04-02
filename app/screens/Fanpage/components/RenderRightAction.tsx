import { Text } from "@/components"
import SmartImage from "@/components/SmartImage/SmartImage"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { ImageStyle, Pressable, TextStyle, ViewStyle } from "react-native"

export const RenderRightAction = ({ id, onDeleted }: { id: string; onDeleted: () => void }) => {
  return (
    <Pressable style={$containerRenderAction} onPress={onDeleted}>
      <SmartImage source={Icons.ic_delete} style={$iconDelete} />
      <Text text="Xóa" weight="regular" style={$textDelete} />
    </Pressable>
  )
}

const $containerRenderAction: ViewStyle = {
  backgroundColor: "#F9474E",
  borderTopRightRadius: normalize(12),
  borderBottomRightRadius: normalize(12),
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: normalize(22),
  gap: normalize(4),
}

const $iconDelete: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

const $textDelete: TextStyle = {
  fontSize: normalizeText(13),
  color: "white",
}

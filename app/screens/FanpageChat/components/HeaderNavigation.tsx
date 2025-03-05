import { Text } from "@/components"
import { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { RefObject } from "react"
import { Pressable, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

interface HeaderNavigationProps {
  onMessagesPress: () => void
  onCommentsPress: () => void
  isMessagesActive: boolean
  modalRef: RefObject<BottomSheetMethods>
}

export const HeaderNavigation = ({
  onMessagesPress,
  onCommentsPress,
  isMessagesActive,
  modalRef,
}: HeaderNavigationProps) => {
  const dataHeaderNavigation = [
    {
      title: "Tin nhắn",
      onPress: () => onMessagesPress(),
    },
    {
      title: "Bình luận",
      onPress: () => onCommentsPress(),
    },
  ]
  return (
    <View style={$headerContainer}>
      <View style={$buttonContainer}>
        {dataHeaderNavigation.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={[
              $button,
              item.title === "Tin nhắn"
                ? isMessagesActive
                  ? $buttonActive
                  : $buttonInactive
                : !isMessagesActive
                  ? $buttonActive
                  : $buttonInactive,
            ]}
          >
            <Text
              text={item.title}
              style={[
                item.title === "Tin nhắn"
                  ? isMessagesActive
                    ? $buttonTextActive
                    : $buttonTextInactive
                  : !isMessagesActive
                    ? $buttonTextActive
                    : $buttonTextInactive,
              ]}
              weight="medium"
            />
          </Pressable>
        ))}
      </View>
      <View style={$iconContainer}>
        <Pressable onPress={() => modalRef.current?.expand()}>
          <Image source={Icons.ic_tag} style={$icon} />
        </Pressable>
        <Pressable>
          <Image source={Icons.ic_menu} style={$icon} />
        </Pressable>
      </View>
    </View>
  )
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: normalize(16),
  paddingVertical: normalize(8),
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  gap: normalize(8),
}

const $button: ViewStyle = {
  paddingVertical: normalize(6),
  paddingHorizontal: normalize(12),
  borderRadius: normalize(8),
}

const $buttonActive: ViewStyle = {
  backgroundColor: "#242424",
}

const $buttonInactive: ViewStyle = {
  backgroundColor: "#F5F6F8",
}

const $buttonTextInactive: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalizeText(19.6),
  color: "#242424",
}

const $buttonTextActive: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalizeText(19.6),
  color: "#FFFFFF",
}

const $iconContainer: ViewStyle = {
  flexDirection: "row",
  gap: normalize(16),
}

const $icon: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

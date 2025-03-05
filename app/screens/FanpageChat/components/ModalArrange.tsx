import { Text } from "@/components"
import BottomSheet, { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { RefObject, useState } from "react"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"

interface Props {
  modalRef: RefObject<BottomSheetMethods>
}

interface IDataArrange {
  id: number
  name: string
  description: string
}

const dataArrange: IDataArrange[] = [
  {
    id: 1,
    name: "Mặc định (Mới nhất)",
    description: "Tin nhắn/ bình luận mới nhất sẽ xếp lên đầu danh sách",
  },
  {
    id: 2,
    name: "Tin nhắn/ bình luận chưa đọc",
    description: "Tin nhắn/ bình luận chưa đọc sẽ xếp lên đầu danh sách",
  },
]

export const ModalArrange = ({ modalRef }: Props) => {
  const [selectedId, setSelectedId] = useState<number>(dataArrange[0].id)

  const handleSelect = (id: number) => {
    setSelectedId(id)
    modalRef.current?.close()
  }

  return (
    <BottomSheet
      style={$container}
      ref={modalRef}
      snapTo={"32.5%"}
      backgroundColor={"white"}
      backDropColor={"#242424"}
    >
      <View style={$header}>
        <Text text="Sắp xếp" style={$title} weight="semiBold" />
      </View>
      <View style={$content}>
        {dataArrange.map((item) => (
          <Pressable key={item.id} onPress={() => handleSelect(item.id)} style={$rowContent}>
            <View style={$item}>
              <Text text={item.name} style={$itemName} weight="medium" />
              <Text text={item.description} style={$itemDescription} weight="regular" />
            </View>
            <Image
              source={Icons.ic_tick}
              style={[$icon, { opacity: selectedId === item.id ? 1 : 0 }]}
            />
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $header: ViewStyle = {
  paddingHorizontal: normalize(14),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: normalize(12),
}

const $title: TextStyle = {
  fontSize: normalizeText(20),
  lineHeight: normalizeText(27),
  color: colors.palette.neutral800,
}

const $content: ViewStyle = {}

const $rowContent: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: normalize(12),
  paddingHorizontal: normalize(16),
}

const $item: ViewStyle = {
  flex: 1,
  paddingRight: normalize(4),
}

const $itemName: TextStyle = {
  fontSize: normalizeText(16),
  lineHeight: normalizeText(21.6),
  color: "#242424",
}

const $itemDescription: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalizeText(18.9),
  color: "#6E6D7A",
}

const $itemSeparator: ViewStyle = {}

const $icon: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

import { Text } from "@/components"
import BottomSheet, { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { RefObject, useState } from "react"
import { FlatList, Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { OptionButton } from "./OptionButton"

interface Fanpage {
  id: string
  name: string
  isConnected: boolean
  avatar?: string
  isTicked?: boolean
}

const fanpageData: Fanpage[] = [
  {
    id: "1",
    name: "Trang test",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
    isTicked: false,
  },
  {
    id: "2",
    name: "Mỹ Phẩm Nhất Chạc Tay",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/006/541/188/non_2x/bearded-male-cartoon-character-with-sunglasses-minimalist-cartoon-avatar-profile-illustration-free-vector.jpg",
    isConnected: true,
    isTicked: false,
  },
  {
    id: "3",
    name: "Mỹ Phẩm Xách Tay",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/043/050/977/small_2x/man-with-glasses-cartoon-style-profile-avatar-picture-vector.jpg",
    isConnected: true,
    isTicked: false,
  },
  {
    id: "4",
    name: "Nói Thật Elemental",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVWdpSX0xv-SPTJEGBorXQzdtwZuCh-XdyA&s",
    isConnected: true,
    isTicked: false,
  },
  {
    id: "5",
    name: "Laptop Già Rè",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
    isTicked: false,
  },
]

interface Props {
  modalRef: RefObject<BottomSheetMethods>
}

export const ModalAddPage = ({ modalRef }: Props) => {
  const [fanpages, setFanpages] = useState<Fanpage[]>(fanpageData)

  const handleTick = (id: string) => {
    setFanpages((prevFanpages) =>
      prevFanpages.map((fanpage) =>
        fanpage.id === id ? { ...fanpage, isTicked: !fanpage.isTicked } : fanpage,
      ),
    )
  }

  const renderPage = ({ item }: { item: Fanpage }) => {
    return (
      <Pressable onPress={() => handleTick(item.id)} style={$pageItem}>
        <Image source={{ uri: item.avatar }} style={$avatar} />
        <View style={$contentPageItem}>
          <Text text={item.name} style={$titleItem} weight="medium" />
          {item.isTicked ? (
            <Image source={Icons.ic_tick} style={$icon} />
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    )
  }

  return (
    <BottomSheet
      style={$container}
      ref={modalRef}
      snapTo={"82.5%"}
      backgroundColor={"white"}
      backDropColor={"#242424"}
    >
      <View style={$header}>
        <Text text="Thêm fanpage" style={$title} weight="semiBold" />
        <Pressable onPress={() => modalRef.current?.close()}>
          <Image source={Icons.ic_closed} style={$icon} />
        </Pressable>
      </View>
      <FlatList
        data={fanpages}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={$contentContainerStyle}
      />
      <OptionButton
        title="Kết nối"
        onPress={() => {
          const selectedFanpages = fanpages.filter((fanpage) => fanpage.isTicked)
          console.log("Fanpages đã chọn:", selectedFanpages)
          if (selectedFanpages.length > 0) {
            modalRef.current?.close()
          }
        }}
      />
    </BottomSheet>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainerStyle: ViewStyle = {
  gap: normalize(8),
  paddingVertical: normalize(8),
  paddingHorizontal: normalize(16),
}

const $header: ViewStyle = {
  paddingHorizontal: normalize(14),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: normalize(12),
}

const $pageItem: ViewStyle = {
  backgroundColor: "#F5F6F8",
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

const $avatar: ImageStyle = {
  width: normalize(54),
  height: normalize(54),
  borderRadius: normalize(16),
}

const $contentPageItem: ViewStyle = {
  gap: normalize(4),
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $title: TextStyle = {
  fontSize: normalizeText(20),
  lineHeight: normalizeText(27),
  color: colors.palette.neutral800,
}

const $icon: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
}

const $untickedIcon: ViewStyle = {
  width: normalize(24),
  height: normalize(24),
  borderRadius: normalize(12),
  borderWidth: 1,
  borderColor: colors.palette.neutral400, // Màu viền khi không chọn
}

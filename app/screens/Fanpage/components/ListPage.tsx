import { Text } from "@/components"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { RefObject } from "react"
import { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"
import SwipeListView from "@/components/SwipeListView/SwipeListView"
import { RenderRightAction } from "./RenderRightAction"
import { ListFooterComponent } from "./ListFooterComponent"

interface Fanpage {
  id: string
  name: string
  isConnected: boolean
  avatar?: string
}

const fanpageData: Fanpage[] = [
  {
    id: "1",
    name: "Trang test",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
  },
  {
    id: "2",
    name: "Mỹ Phẩm Nhất Chạc Tay",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/006/541/188/non_2x/bearded-male-cartoon-character-with-sunglasses-minimalist-cartoon-avatar-profile-illustration-free-vector.jpg",
    isConnected: true,
  },
  {
    id: "3",
    name: "Mỹ Phẩm Xách Tay",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/043/050/977/small_2x/man-with-glasses-cartoon-style-profile-avatar-picture-vector.jpg",
    isConnected: true,
  },
  {
    id: "4",
    name: "Nói Thật Elemental",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVWdpSX0xv-SPTJEGBorXQzdtwZuCh-XdyA&s",
    isConnected: true,
  },
  {
    id: "5",
    name: "Laptop Già Rè",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
  },
  {
    id: "6",
    name: "Laptop Già Rè",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
  },
  {
    id: "7",
    name: "Laptop Già Rè",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
  },
  {
    id: "8",
    name: "Laptop Già Rè",
    avatar: "https://i.pinimg.com/1200x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg",
    isConnected: true,
  },
]

interface Props {
  data?: Fanpage[]
  modalRef: RefObject<BottomSheetMethods>
}

export const ListPage = ({ data = fanpageData, modalRef }: Props) => {
  const onPressModal = () => {
    modalRef.current?.expand()
  }

  const renderPage = ({ item, isRadius }: { item: Fanpage; isRadius: boolean }) => {
    return (
      <View style={[$pageItem, isRadius && $pageItemRadius]}>
        <Image source={{ uri: item.avatar }} style={$avatar} />
        <View style={$contentPageItem}>
          <Text text={item.name} style={$titleItem} weight="medium" />
          <Text
            text={item.isConnected ? "Đã kết nối" : "Chưa kết nối"}
            style={$titleConnect}
            weight="regular"
          />
        </View>
      </View>
    )
  }

  return (
    <View style={$container}>
      <SwipeListView
        data={data}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={$contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<ListFooterComponent onPressModal={onPressModal} />}
        renderRightActions={(id) => <RenderRightAction id={id} onDeleted={() => {}} />}
      />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $contentContainerStyle: ViewStyle = {
  gap: normalize(8),
  paddingVertical: normalize(16),
}

const $pageItem: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: normalize(12),
  alignItems: "center",
  flexDirection: "row",
  gap: normalize(12),
  borderRadius: normalize(12),
}

const $pageItemRadius: ViewStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  ...$pageItem,
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
}

const $titleConnect: TextStyle = {
  color: "#6E6D7A",
  fontSize: normalizeText(13),
  lineHeight: normalizeText(15.73),
  marginTop: normalize(4),
}

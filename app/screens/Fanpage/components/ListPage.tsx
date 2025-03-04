import { Text } from "@/components"
import { colors } from "@/theme"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"
import { useState } from "react"

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
]

interface Props {
  data?: Fanpage[]
}

export const ListPage = ({ data = fanpageData }: Props) => {
  const [fanpages, setFanpages] = useState<Fanpage[]>(data)

  const renderItem = ({ item }: { item: Fanpage }) => (
    <View style={$pageItem}>
      <Image source={{ uri: item.avatar }} style={$avatar} />
      <View style={$contentPageItem}>
        <Text text={item.name} style={$titleItem} weight="semiBold" />
        <Text text={item.isConnected ? "Đã kết nối" : "Chưa kết nối"} style={$titleConnect} />
      </View>
    </View>
  )

  const renderHiddenItem = ({ item }: { item: Fanpage }) => (
    <View style={$rowBack}>
      <TouchableOpacity style={$backRightBtn} onPress={() => handleDelete(item.id)}>
        <Text style={$backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </View>
  )

  const handleDelete = (id: string) => {
    setFanpages(fanpages.filter((item) => item.id !== id))
  }

  return (
    <View style={$container}>
      <SwipeListView
        data={fanpages}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0} // Disable left swipe
        rightOpenValue={normalize(-68)} // Width of the swipe area for delete
        onRowOpen={(rowKey, rowMap) => {
          setTimeout(() => {
            rowMap[rowKey]?.closeRow()
          }, 2000)
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={$contentContainerStyle}
        ListFooterComponent={
          <TouchableOpacity style={$pageItem} onPress={() => {}}>
            <View style={$addImage}>
              <Image source={Icons.ic_add} style={$iconAdd} />
            </View>
            <Text text="Thêm fanpage mới" style={$titleItem} weight="semiBold" />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

const $container: ViewStyle = {
  marginTop: normalize(16),
  height: Dimensions.get("window").height - normalize(160),
}

const $contentContainerStyle: ViewStyle = {
  gap: normalize(8),
}

const $pageItem: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: normalize(12),
  alignItems: "center",
  flexDirection: "row",
  gap: normalize(12),
  borderRadius: normalize(12),
  position: "relative",
}

const $titleItem: TextStyle = {
  fontSize: normalizeText(16),
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

// Styles for swipe-to-delete
const $rowBack: ViewStyle = {
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-end",
  flexDirection: "row",
}

const $backRightBtn: ViewStyle = {
  alignItems: "center",
  bottom: 0,
  justifyContent: "center",
  position: "absolute",
  top: 0,
  width: 68,
  backgroundColor: "#F9474E",
  right: 0,
  borderRadius: normalize(16)
}

const $backTextWhite: TextStyle = {
  color: "#FFF",
  fontSize: normalizeText(16),
  fontWeight: "bold",
}

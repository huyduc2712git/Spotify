import { Text } from "@/components"
import normalize, { normalizeText } from "@/utils/normalize"
import { Icons } from "assets/icons"
import { FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

interface IDataChannel {
  id: string
  name?: string
  message?: string
  time?: string
  avatar?: string
  tags?: string[]
  phone?: string
}

const dataChannelList: IDataChannel[] = [
  {
    id: "1",
    name: "Quỳnh Anh Shyn",
    message: "Cho mình xin thêm hình với ạ!",
    time: "11:37",
    avatar: "https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Behance-64.png",
    tags: ["Boom hàng", "Checking in"],
    phone: "0987654321",
  },
  {
    id: "2",
    name: "Uyên Phương",
    message: "Quận 9 - Hồ Chí Minh",
    time: "10:24",
    avatar:
      "https://stickerly.pstatic.net/resource/user/e29b66c3-6960-11eb-9eb0-48df379490d0/profile_EAzZ4maf.jpeg",
    tags: [],
    phone: "0987654321",
  },
  {
    id: "3",
    name: "Độ Tộc 2",
    message: "Chào bạn!",
    time: "30/12/2024",
    avatar:
      "https://ih1.redbubble.net/image.4986147503.9840/st,small,507x507-pad,600x600,f8f8f8.jpg",
    tags: ["Boom hàng", "Checking in"],
  },
]

export const ChannelList = () => {
  const ChannelListItem = ({ item }: { item: IDataChannel }) => (
    <View style={$itemContainer}>
      <View style={$boxAvatar}>
        <View style={$boxAbsolute}>
          <Image source={{ uri: item.avatar }} style={$avatarAbsolute} />
        </View>

        <Image source={{ uri: item.avatar }} style={$avatar} />
      </View>

      <View style={$contentItem}>
        <Text text={item?.name} style={$nameItem} weight="semiBold" />
        <Text text={item?.message} style={$messageItem} weight="regular" />
        <View style={$rowTag}>
          {item?.tags?.map((tag: string, index: number) => (
            <View
              key={index}
              style={[
                $tagContainer,
                {
                  backgroundColor: tag === "Boom hàng" ? "#15D6CF" : "#F1B1E7",
                },
              ]}
            >
              <Text text={tag} style={$tag} />
            </View>
          ))}
        </View>
      </View>
      <View style={$contentItemRight}>
        <Text text={item?.time} style={$timeItem} weight="regular" />
        {item?.phone && <Image source={Icons.ic_phone} style={$iconPhone} />}
      </View>
    </View>
  )

  return (
    <View style={$container}>
      <FlatList
        data={dataChannelList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChannelListItem item={item} />}
      />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: normalize(16),
}

const $itemContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 0.5,
  borderColor: "#E9EBED",
  paddingVertical: normalize(12),
  gap: normalize(12),
}

const $boxAvatar: ViewStyle = {
  width: normalize(54),
  height: normalize(54),
  borderRadius: normalize(27),
  overflow: "hidden",
}

const $avatar: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "contain",
}

const $nameItem: TextStyle = {
  fontSize: normalizeText(15),
  lineHeight: normalizeText(18.15),
  color: "#242424",
}

const $messageItem: TextStyle = {
  fontSize: normalizeText(15),
  lineHeight: normalizeText(18.15),
  color: "#6E6D7A",
}

const $contentItem: ViewStyle = {
  flex: 1,
  gap: normalize(4),
}

const $contentItemRight: ViewStyle = {
  gap: normalize(4),
  alignItems: "flex-end",
  justifyContent: "flex-start",
  alignSelf: "flex-start",
}

const $boxAbsolute: ViewStyle = {
  position: "absolute",
  zIndex: 1,
  bottom: 0,
  right: 0,
  borderRadius: normalize(999),
  backgroundColor: "white",
  padding: normalize(3),
  alignItems: "center",
  justifyContent: "center",
}

const $avatarAbsolute: ImageStyle = {
  width: normalize(24),
  height: normalize(24),
  resizeMode: "contain",
  borderRadius: normalize(999),
}

const $rowTag: ViewStyle = {
  flexDirection: "row",
  gap: normalize(4),
}

const $tagContainer: ViewStyle = {
  paddingHorizontal: normalize(6),
  paddingVertical: normalize(2),
  borderRadius: normalize(4),
}

const $tag: TextStyle = {
  fontSize: normalizeText(13),
  lineHeight: normalizeText(15.73),
  color: "white",
}

const $iconPhone: ImageStyle = {
  width: normalize(18),
  height: normalize(18),
  resizeMode: "contain",
}

const $timeItem: TextStyle = {
  fontSize: normalizeText(12),
  lineHeight: normalizeText(14.52),
  color: "#8E94A0",
}

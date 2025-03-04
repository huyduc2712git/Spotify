import React, { FC } from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "@/components"
import { $styles, colors } from "@/theme"
import { Header } from "./components/Header"
import { OptionButton } from "./components/OptionButton"
import { ListPage } from "./components/ListPage"
import normalize, { normalizeText } from "@/utils/normalize"

interface FanpageScreenProps extends AppStackScreenProps<"Fanpage"> {}

export const FanpageScreen: FC<FanpageScreenProps> = observer(function FanpageScreen(_props) {
  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.background}
      style={$container}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header />
      <Screen backgroundColor={colors.background} preset="auto" contentContainerStyle={$content}>
        <Text
          text="Vuốt sang trái để xóa fanpage đã chọn ra khỏi danh sách đã kết nối"
          style={$waningText}
          weight="regular"
        />
        <ListPage />
      </Screen>
      <OptionButton title="Truy Cập" onPress={() => {}} />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
    flex: 1,
  paddingHorizontal: normalize(16),
}

const $waningText: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalize(16.94),
  color: colors.text,
}

import React, { FC, useRef } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "@/components"
import { colors } from "@/theme"
import { Header } from "./components/Header"
import { OptionButton } from "./components/OptionButton"
import { ListPage } from "./components/ListPage"
import normalize, { normalizeText } from "@/utils/normalize"
import { ModalAddPage } from "./components/ModalAddPage"
import { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"

interface FanpageScreenProps extends AppStackScreenProps<"Fanpage"> {}

export const FanpageScreen: FC<FanpageScreenProps> = observer(function FanpageScreen(_props) {
  const modalRef = useRef<BottomSheetMethods>(null)

  return (
    <>
      <Screen
        preset="fixed"
        backgroundColor={"#F5F6F8"}
        contentContainerStyle={$container}
        safeAreaEdges={["top", "bottom"]}
      >
        <Header />
        <View style={$content}>
          <Text
            text="Vuốt sang trái để xóa fanpage đã chọn ra khỏi danh sách đã kết nối"
            style={$waningText}
            weight="regular"
          />
          <ListPage modalRef={modalRef} />
        </View>
        <OptionButton
          backgroundColor="#F9474E"
          titleColor={colors.palette.neutral100}
          title="Truy Cập"
          onPress={() => {}}
        />
      </Screen>
      <ModalAddPage modalRef={modalRef} />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  flex: 1,
  padding: normalize(16),
}

const $waningText: TextStyle = {
  fontSize: normalizeText(14),
  lineHeight: normalize(16.94),
  color: colors.text,
}

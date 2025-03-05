import { Screen, Text } from "@/components"
import { colors } from "@/theme"
import { observer } from "mobx-react-lite"
import { FC, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import { ChannelList } from "./components/ChannelList"
import { Header } from "./components/Header"
import { SearchChannel } from "./components/SearchChannel"
import { HeaderNavigation } from "./components/HeaderNavigation"
import { BottomSheetMethods } from "@/components/BottomSheet/BottomSheet"
import { ModalArrange } from "./components/ModalArrange"

interface FanpageChatScreenProps {}

export const FanpageChatScreen: FC<FanpageChatScreenProps> = observer(
  function FanpageChatScreen(_props) {
    const [isMessagesActive, setIsMessagesActive] = useState(true)
    const modalRef = useRef<BottomSheetMethods>(null)

    return (
      <>
        <Screen
          preset="fixed"
          backgroundColor={colors.palette.neutral100}
          contentContainerStyle={$container}
          safeAreaEdges={["top", "bottom"]}
        >
          <Header />
          <SearchChannel />
          <HeaderNavigation
            isMessagesActive={isMessagesActive}
            onMessagesPress={() => setIsMessagesActive(true)}
            onCommentsPress={() => setIsMessagesActive(false)}
            modalRef={modalRef}
          />
          <ChannelList />
        </Screen>
        <ModalArrange modalRef={modalRef} />
      </>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
}

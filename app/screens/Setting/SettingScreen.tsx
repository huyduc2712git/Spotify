import { Screen, Text } from "@/components"
import { navigate } from "@/navigators"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { FC } from "react"
import { Pressable, View } from "react-native"

export const SettingScreen: FC<DemoTabScreenProps<"SettingScreen">> = function SettingScreen(
  _props,
) {

const goFanpage = () => {
  navigate("Fanpage")
}

const goFanpageChat = () => {
  navigate("FanpageChat")
}

  return (
    <Screen  safeAreaEdges={["top", "bottom"]}>
      <View style={{ gap: 10 }}> 
        <Pressable onPress={goFanpage}>
          <Text text="Fanpage" />
        </Pressable>
        <Pressable onPress={goFanpageChat}>
          <Text text="FanpageChat" />
        </Pressable>
        <Text>SettingScreen</Text>
      </View>
    </Screen>
  )
}

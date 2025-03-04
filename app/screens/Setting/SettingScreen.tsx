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

  return (
    <Screen  safeAreaEdges={["top", "left", "right"]}>
      <View>
        <Pressable onPress={goFanpage}>
          <Text text="Fanpage" />
        </Pressable>
        <Text>SettingScreen</Text>
      </View>
    </Screen>
  )
}

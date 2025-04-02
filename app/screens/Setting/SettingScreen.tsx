import { Screen, Text } from "@/components"
import { navigate } from "@/navigators"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { FC } from "react"
import { Pressable, View } from "react-native"
import { ExpenseManagement } from "./Components/ExpenseManagement"
import { colors } from "@/theme"

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
    <Screen style={{flex: 1}} contentContainerStyle={{ flex: 1, backgroundColor: colors.background }} safeAreaEdges={["top", "bottom"]}>
      <View style={{ gap: 10 }}>
        <Pressable onPress={goFanpage}>
          <Text style={{color: colors.text}} text="Fanpage" />
        </Pressable>
        <Pressable onPress={goFanpageChat}>
          <Text style={{color: colors.text}} text="FanpageChat" />
        </Pressable>
        <ExpenseManagement />
      </View>
    </Screen>
  )
}

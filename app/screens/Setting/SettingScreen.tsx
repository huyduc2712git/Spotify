import { Screen, Text } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { FC } from "react"
import { View } from "react-native"

export const SettingScreen: FC<DemoTabScreenProps<"SettingScreen">> = function SettingScreen(
  _props,
) {
  return (
    <Screen>
      <View>
        <Text>SettingScreen</Text>
      </View>
    </Screen>
  )
}

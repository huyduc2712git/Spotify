import { Screen, Text } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import SearchBar from "./components/SearchBar"
import BannerSlider from "./components/BannerSlider"
import { colors } from "@/theme"

export const HomeScreen: FC<DemoTabScreenProps<"HomeScreen">> = function HomeScreen(_props) {
  return (
    <Screen safeAreaEdges={["top"]} style={$container}>
        <SearchBar />
        <BannerSlider />
    </Screen>
  )
}

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
}

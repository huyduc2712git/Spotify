import SmartImage from "@/components/SmartImage/SmartImage"
import React, { useState, useRef, useEffect } from "react"
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  ImageStyle,
} from "react-native"

interface BannerItem {
  id: number
  imageUrl: string
}

interface Props {
  data?: BannerItem[]
}

const dataFake: BannerItem[] = [
  {
    id: 1,
    imageUrl: "https://d3design.vn/uploads/5495874fhgtrty567.jpg",
  },
  {
    id: 2,
    imageUrl: "https://d3design.vn/uploads/5495874gh6y5356.jpg",
  },
  {
    id: 3,
    imageUrl: "https://d3design.vn/uploads/00901.jpg",
  },
]

export const BannerSlider = ({ data = dataFake }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const { width: screenWidth } = Dimensions.get("window")

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % data.length
      setActiveSlide(nextSlide)
      scrollViewRef.current?.scrollTo({
        x: nextSlide * screenWidth,
        animated: true,
      })
    }, 3000) // Auto-slide every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [activeSlide, data.length, screenWidth])

  // Handle manual scrolling
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / screenWidth)
    setActiveSlide(newIndex)
  }

  const renderItem = (item: BannerItem, index: number) => (
    <View key={item.id} style={$slide}>
      <SmartImage source={{ uri: item.imageUrl }} style={$bannerImage} />
    </View>
  )

  return (
    <View style={$container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={$scrollView}
      >
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
      <View style={$paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[$dot, activeSlide === index && $activeDot]}
            onPress={() => {
              setActiveSlide(index)
              scrollViewRef.current?.scrollTo({
                x: index * screenWidth,
                animated: true,
              })
            }}
          />
        ))}
      </View>
    </View>
  )
}

// Styles as const declarations with ViewStyle
const $container: ViewStyle = {
  alignItems: "center",
}

const $scrollView: ViewStyle = {
  width: "100%",
}

const $slide: ViewStyle = {
  width: Dimensions.get("window").width,
  backgroundColor: "#ff4500",
  overflow: "hidden",
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
}

const $bannerImage: ImageStyle = {
  width: "100%",
  height: 200,
  resizeMode: "cover",
}

const $paginationContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 8,
}

const $dot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#fff",
  marginHorizontal: 4,
  opacity: 0.4,
}

const $activeDot: ViewStyle = {
  ...$dot,
  opacity: 1,
  width: 10,
  height: 10,
}

export default BannerSlider

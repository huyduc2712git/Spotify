import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  initialValue?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Bạn muốn tìm gì",
  initialValue = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  const handleSearch = () => {
    onSearch?.(searchQuery)
  }

  return (
    <BlurView
      tint="light" // You can change to 'dark' or 'default' based on your design
      intensity={40} // Adjust blur intensity (0-100)
      style={$blurContainer}
    >
      <View style={$searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={$searchIcon} />
        <TextInput
          style={$input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleSearch} style={$heartButton}>
          <Ionicons name="heart-outline" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </BlurView>
  )
}

const $blurContainer: ViewStyle = {
  padding: 10,
//   borderRadius: 10,
  overflow: "hidden",
//   marginHorizontal: 10,
//   marginVertical: 10,
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight opacity for better visibility
  borderRadius: 8,
  paddingHorizontal: 10,
  height: 50,
}

const $searchIcon: ViewStyle = {
  marginRight: 10,
}

const $input: TextStyle = {
  flex: 1,
  fontSize: 16,
  color: "#333",
}

const $heartButton: ViewStyle = {
  padding: 5,
}

export default SearchBar

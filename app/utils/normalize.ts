import { Dimensions, Platform, PixelRatio } from "react-native"
import * as Device from "expo-device"

// Lấy kích thước màn hình
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Lấy mật độ pixel của màn hình
const SCREEN_PIXEL_RATIO = PixelRatio.get()

// Hàm kiểm tra thiết bị là tablet hay phone
const isTablet = () => {
  // Kiểm tra dựa trên Device từ Expo (ưu tiên nhất)
  if (Device.deviceType === Device.DeviceType.TABLET) return true
  // Kiểm tra kích thước màn hình: nếu chiều rộng >= 768 và chiều cao >= 1024, coi là tablet
  const physicalWidth = SCREEN_WIDTH / SCREEN_PIXEL_RATIO
  const physicalHeight = SCREEN_HEIGHT / SCREEN_PIXEL_RATIO
  return physicalWidth >= 768 && physicalHeight >= 1024
}

// Hàm lấy base width dựa trên loại thiết bị
const getBaseWidth = () => {
  if (isTablet()) {
    // Sử dụng 1024 cho tablet (giả định tablet lớn nhất)
    return 1024
  }
  // Sử dụng 375 cho phone (iPhone 6/7/8 kích thước tiêu chuẩn)
  return 375
}

// Hàm normalize kích thước cho mọi thiết bị, tối ưu cho View, Image, v.v.
const normalize = (size: number): number => {
  // Lấy base width phù hợp với thiết bị
  const baseWidth = getBaseWidth()

  // Tính tỷ lệ scale dựa trên chiều rộng màn hình so với base width
  const scale = SCREEN_WIDTH / baseWidth

  // Nếu là desktop (Device.deviceType === 2), trả về kích thước gốc (không scale)
  if (Device.deviceType === Device.DeviceType.DESKTOP) {
    return size
  }

  // Tính kích thước mới sau khi scale
  let newSize = size * scale

  // Điều chỉnh cho iOS và Android:
  // - Trên iOS, sử dụng PixelRatio.roundToNearestPixel để làm trơn kích thước
  // - Trên Android, giảm nhẹ để tránh kích thước quá lớn, nhưng đảm bảo không nhỏ hơn 1
  if (Platform.OS === "ios") {
    newSize = Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    newSize = Math.max(
      1, // Đảm bảo kích thước không nhỏ hơn 1
      Math.round(PixelRatio.roundToNearestPixel(newSize)) - (newSize > 1 ? 1 : 0),
    )
    // Điều chỉnh thêm nếu mật độ pixel cao (PixelRatio > 2.0)
    if (SCREEN_PIXEL_RATIO > 2.0) {
      newSize = Math.round(newSize * 0.95) // Giảm 5% để tránh quá lớn
    }
  }

  return newSize
}

// Hàm normalize đặc biệt cho Text, đảm bảo font size luôn dễ đọc trên mọi thiết bị
export const normalizeText = (size: number): number => {
  const normalizedSize = normalize(size)

  // Đảm bảo font size nằm trong khoảng hợp lý cho cả Android và iOS
  const minFontSize = 10 // Kích thước font tối thiểu
  const maxFontSize = 48 // Kích thước font tối đa

  let finalSize = Math.min(Math.max(normalizedSize, minFontSize), maxFontSize)

  // Điều chỉnh cho từng nền tảng và loại thiết bị
  if (Platform.OS === "android") {
    // Giảm nhẹ font size trên Android để tránh quá lớn
    finalSize = Math.round(finalSize * 0.95)
    // Tăng nhẹ cho tablet Android
    if (isTablet()) {
      finalSize = Math.round(finalSize * 1.05) // Tăng 5% cho tablet, nhẹ nhàng hơn
    }
  } else if (Platform.OS === "ios") {
    // Giữ nguyên trên iOS phone, tăng nhẹ cho iPad
    if (isTablet()) {
      finalSize = Math.round(finalSize * 1.1) // Tăng 10% cho iPad, đơn giản hơn
    }
  }

  // Điều chỉnh thêm nếu mật độ pixel cao (PixelRatio > 2.0)
  if (SCREEN_PIXEL_RATIO > 2.0) {
    finalSize = Math.round(finalSize * 0.98) // Giảm nhẹ 2% để tránh font quá lớn
  }

  return finalSize
}

export default normalize

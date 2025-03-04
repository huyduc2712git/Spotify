import { Dimensions, Platform, StatusBar, PixelRatio } from "react-native"
import * as Device from "expo-device"

// Lấy kích thước màn hình (chỉ khu vực ứng dụng, không bao gồm thanh trạng thái/thanh điều hướng)
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window")

// Lấy mật độ pixel của màn hình
const SCREEN_PIXEL_RATIO = PixelRatio.get()

// Lấy chiều cao thanh trạng thái
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24

// Hàm lấy kích thước thực tế (sau khi tính toán mật độ pixel)
const getPhysicalSize = (dimension: number) => {
  return dimension / SCREEN_PIXEL_RATIO
}

// Hàm kiểm tra thiết bị là tablet (bao gồm cả iPad và Android tablet)
export function isTablet() {
  // Kiểm tra dựa trên Device từ Expo (ưu tiên nhất)
  if (Device.deviceType === Device.DeviceType.TABLET) return true
  // Kiểm tra iPad dựa trên Platform và kích thước (cho iOS)
  if (Platform.OS === "ios") {
    const physicalWidth = getPhysicalSize(WINDOW_WIDTH)
    const physicalHeight = getPhysicalSize(WINDOW_HEIGHT)
    return physicalWidth >= 768 && physicalHeight >= 1024 // Kích thước tối thiểu cho tablet
  }
  // Kiểm tra Android tablet dựa trên kích thước (nếu cần bổ sung)
  const physicalWidth = getPhysicalSize(WINDOW_WIDTH)
  const physicalHeight = getPhysicalSize(WINDOW_HEIGHT)
  return physicalWidth >= 768 && physicalHeight >= 1024 // Kích thước tối thiểu cho tablet Android
}

// Hàm kiểm tra thiết bị là phone
export function isPhone() {
  return Device.deviceType === Device.DeviceType.PHONE
}

// Hàm kiểm tra iPad (cụ thể cho iOS)
export function isIPad() {
  return Platform.OS === "ios" && isTablet()
}

// Hàm kiểm tra thiết bị có notch (chỉ cho iOS, vì Android notch phức tạp hơn)
export function hasNotch() {
  if (Platform.OS !== "ios") return false
  const physicalHeight = getPhysicalSize(WINDOW_HEIGHT)
  const physicalWidth = getPhysicalSize(WINDOW_WIDTH)
  const isPortrait = physicalHeight > physicalWidth

  // Kiểm tra các kích thước iPhone có notch (dựa trên chiều cao hoặc chiều rộng thực tế)
  const size = isPortrait ? physicalHeight : physicalWidth
  return (
    Math.abs(size - 812 / SCREEN_PIXEL_RATIO) < 1 || // iPhone X, XS, 11 Pro, 12 Mini, 13 Mini
    Math.abs(size - 896 / SCREEN_PIXEL_RATIO) < 1 || // iPhone XS Max, XR, 11, 11 Pro Max
    Math.abs(size - 844 / SCREEN_PIXEL_RATIO) < 1 || // iPhone 12, 12 Pro, 13, 13 Pro, 14
    Math.abs(size - 926 / SCREEN_PIXEL_RATIO) < 1 || // iPhone 12 Pro Max, 13 Pro Max, 14 Plus
    Math.abs(size - 852 / SCREEN_PIXEL_RATIO) < 1 || // iPhone 14 Pro
    Math.abs(size - 932 / SCREEN_PIXEL_RATIO) < 1 || // iPhone 14 Pro Max
    Math.abs(size - 956 / SCREEN_PIXEL_RATIO) < 1 // iPhone 16 Pro Max (giả định)
  )
}

// Chiều cao notch trên iOS (tùy thuộc vào thiết bị)
export const heightNotchIOS = hasNotch() ? 50 : 44

// Kiểm tra iPhone có notch (dựa trên hasNotch)
export function isIPhoneX() {
  return Platform.OS === "ios" && hasNotch()
}

// Kiểm tra iPad hoặc tablet (chỉ dành cho mobile app, không bao gồm web)
export function isIPadOrTablet() {
  return isIPad() || isTablet()
}

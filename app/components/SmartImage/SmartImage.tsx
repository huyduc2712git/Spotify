import { useEffect, useRef, useState } from "react"
import { Image, StyleProp, ImageStyle, Platform } from "react-native"
import * as FileSystem from "expo-file-system"
import * as Crypto from "expo-crypto"
import LottieNativeView from "lottie-react-native"
import { SkeletonImage } from "./SkeletonImage"

let WebLottiePlayer: React.FC<any> | null = null

// if (Platform.OS === "web") {
//   WebLottiePlayer = require("./RemoteLottie").default // Import động cho web
// }

// Props type for SmartImage
interface SmartImageProps {
  source: { uri: string } | number
  cacheKey?: string
  style?: StyleProp<ImageStyle>
  placeholderImage?: any
  lottieRef?: any
  lottieProps?: any
}

// Hàm tạo cache key bằng SHA-1
async function getHashedCacheKey(uri: string): Promise<string> {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, uri)
}

// Lấy phần mở rộng file từ URI
function extractFileExtension(uri: string): string | undefined {
  const basename = uri.split(/[\\/]/).pop()
  return basename?.split(".").pop()
}

// Kiểm tra file có trong cache không (Native)
async function checkFileExistsInCache(uri: string) {
  try {
    const info = await FileSystem.getInfoAsync(uri)
    return { exists: info.exists, err: false }
  } catch (error) {
    return { exists: false, err: true, msg: error }
  }
}

// Tải và cache file (Native)
async function downloadAndCacheFile(
  uri: string,
  cacheUri: string,
  callback: FileSystem.DownloadProgressCallback
) {
  try {
    const downloadResumable = FileSystem.createDownloadResumable(uri, cacheUri, {}, callback)
    const downloaded = await downloadResumable.downloadAsync()
    return { cached: !!downloaded?.uri, err: false, path: downloaded?.uri }
  } catch (error) {
    return { cached: false, err: true, msg: error }
  }
}

// Component chính SmartImage
const SmartImage = (props: SmartImageProps) => {
  const { source, cacheKey, style, placeholderImage, lottieRef, lottieProps } = props
  const isMounted = useRef<boolean>(true)
  const [cachedFileUri, setCachedFileUri] = useState<string | null>(null)
  const [isLoadError, setIsLoadError] = useState<boolean>(false)

  const uri = typeof source === "object" && "uri" in source ? source.uri : null
  const isLottieAnimation = typeof uri === "string" && uri.endsWith(".json")

  useEffect(() => {
    if (!uri) return

    async function loadFile() {
      if (!uri) {
        console.warn("Empty URI provided, loading placeholder...")
        setIsLoadError(true)
        return
      }

      if (Platform.OS === "web") {
        setCachedFileUri(uri)
      } else {
        const fileExt = extractFileExtension(uri)
        if (!fileExt) {
          console.warn("Invalid file extension, loading placeholder...")
          setIsLoadError(true)
          return
        }

        const generatedKey = cacheKey || (await getHashedCacheKey(uri))
        const cacheFilePath = `${FileSystem.cacheDirectory}${generatedKey}.${fileExt}`
        const fileInCache = await checkFileExistsInCache(cacheFilePath)

        if (fileInCache.exists) {
          if (isMounted.current) setCachedFileUri(cacheFilePath)
        } else {
          const cached = await downloadAndCacheFile(uri, cacheFilePath, () => {})
          if (cached.cached && cached.path) {
            if (isMounted.current) setCachedFileUri(cached.path)
          } else {
            console.warn("Failed to cache file, loading placeholder...")
            if (isMounted.current) setIsLoadError(true)
          }
        }
      }
    }

    loadFile()
    return () => {
      isMounted.current = false
    }
  }, [uri, cacheKey])

  return (
    <>
      {/* Nếu là hình ảnh từ local (require), render trực tiếp */}
      {typeof source === "number" ? (
        <Image source={source} style={style} />

      ) : isLoadError || !cachedFileUri ? (
        placeholderImage ? (
          <Image source={placeholderImage} style={style} />
        ) : (
          <SkeletonImage style={style} />
        )

      ) : isLottieAnimation ? (
        Platform.OS === "web" && WebLottiePlayer ? (
          <></>
          // <WebLottiePlayer uri={cachedFileUri} loop autoplay style={style} />
        ) : (
          <LottieNativeView ref={lottieRef} source={{ uri: cachedFileUri }} style={style} {...lottieProps} />
        )

      ) : (
        <Image source={{ uri: cachedFileUri }} style={style} />
      )}
    </>
  )
}

export default SmartImage
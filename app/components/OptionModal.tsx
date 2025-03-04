import React, { forwardRef, useImperativeHandle, useState } from "react"
import { Modal, Text, TouchableOpacity, Dimensions, ViewStyle, TextStyle } from "react-native"
import { BlurView } from "expo-blur"
import { colors } from "@/theme"

const { height, width } = Dimensions.get("window")

interface OptionModalProps {
  onClose: () => void
  children: React.ReactNode
  title?: string
  position?: "top" | "bottom" | "center"
}

export interface OptionModalRef {
  show: () => void
  hide: () => void
}

export const OptionModal = forwardRef<OptionModalRef, OptionModalProps>(
  ({ onClose, children, title, position = "bottom" }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }))

    const animationType = position === "center" ? "fade" : "slide"

    const getModalContainerStyle = () => {
      switch (position) {
        case "top":
          return $topModalContainer
        case "center":
          return $centerModalContainer
        case "bottom":
        default:
          return $bottomModalContainer
      }
    }

    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={isVisible}
        supportedOrientations={["portrait", "landscape"]}
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={$modalOverlayTouchable}
          onPress={() => {
            setIsVisible(false)
            onClose()
          }}
          activeOpacity={1}
        >
          <BlurView style={$modalOverlay} intensity={20} tint="dark">
            <TouchableOpacity
              style={getModalContainerStyle()}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {title && <Text style={$modalTitle}>{title}</Text>}
              {children}
              <TouchableOpacity
                style={$closeButton}
                onPress={() => {
                  setIsVisible(false)
                  onClose()
                }}
              >
                <Text style={$closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    )
  },
)

const $modalOverlayTouchable: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $bottomModalContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  marginTop: "auto",
  width: "100%",
  maxHeight: height * 0.7,
}

const $centerModalContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 20,
  padding: 20,
  width: width * 0.8,
  alignSelf: "center",
  maxHeight: height * 0.7,
}

const $topModalContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  padding: 20,
  marginBottom: "auto",
  width: "100%",
  maxHeight: height * 0.7,
}

const $modalTitle: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
  textAlign: "center",
}

const $closeButton: ViewStyle = {
  marginTop: 15,
  padding: 10,
  backgroundColor: "#007AFF",
  borderRadius: 10,
  alignItems: "center",
}

const $closeButtonText: TextStyle = {
  color: colors.background,
  fontWeight: "bold",
}

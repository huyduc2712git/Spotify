import React, { useRef, forwardRef, useImperativeHandle, useState } from "react"
import { View, FlatList, ViewStyle, FlatListProps } from "react-native"
import { Swipeable, SwipeableProps } from "react-native-gesture-handler"

interface Item {
  id: string
  [key: string]: any
}

// Define a custom renderItem type that includes isRadius
interface RenderItemInfo<T> {
  item: T
  index: number
  separators: any
  isRadius: boolean
}

interface SwipeListViewProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  renderItem?: (info: RenderItemInfo<T>) => React.ReactNode
  renderRightActions?: (id: string) => React.ReactNode
  renderLeftActions?: (id: string) => React.ReactNode
  swipeableProps?: SwipeableProps
}

export interface SwipeListViewRef {
  scrollToItem: (index: number) => void
  closeAllSwipes: () => void
  openSwipeRight: (id: string) => void
  openSwipeLeft: (id: string) => void
}

const SwipeListView = forwardRef<SwipeListViewRef, SwipeListViewProps<any>>(
  (
    {
      data,
      renderItem,
      renderRightActions,
      renderLeftActions,
      keyExtractor,
      swipeableProps,
      ...flatListProps
    },
    ref,
  ) => {
    const flatListRef = useRef<FlatList>(null)
    const swipeableRefs = useRef<Map<string, Swipeable>>(new Map())
    const [radiusStates, setRadiusStates] = useState<Record<string, boolean>>({})

    useImperativeHandle(ref, () => ({
      scrollToItem: (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true })
      },
      closeAllSwipes: () => {
        swipeableRefs.current.forEach((swipeable) => swipeable.close())
        setRadiusStates({})
      },
      openSwipeRight: (id: string) => {
        swipeableRefs.current.get(id)?.openRight()
        console.log("openSwipeRight", id)
        setRadiusStates((prev) => ({ ...prev, [id]: true }))
      },
      openSwipeLeft: (id: string) => {
        console.log("openSwipeLeft", id)
        swipeableRefs.current.get(id)?.openLeft()
        setRadiusStates((prev) => ({ ...prev, [id]: true }))
      },
    }))

    const renderSwipeableItem = ({
      item,
      index,
      separators,
    }: {
      item: Item
      index: number
      separators: any
    }) => {
      const swipeableRef = (ref: Swipeable | null) => {
        const key = keyExtractor?.(item, index) || item.id
        if (ref) {
          swipeableRefs.current.set(key, ref)
        } else {
          swipeableRefs.current.delete(key)
        }
      }

      const itemId = keyExtractor?.(item, index) || item.id
      const isItemRadius = radiusStates[itemId] || false

      return (
        <Swipeable
          ref={swipeableRef}
          friction={2}
          onSwipeableOpenStartDrag={(direction) => {
            setRadiusStates((prev) => ({ ...prev, [itemId]: true }))
            swipeableProps?.onSwipeableOpenStartDrag?.(direction) // Pass only direction
          }}
          onSwipeableCloseStartDrag={(direction) => {
            setRadiusStates((prev) => ({ ...prev, [itemId]: false }))
            swipeableProps?.onSwipeableCloseStartDrag?.(direction) // Pass only direction
          }}
          renderRightActions={() => (
            <View style={$rightActionsContainer}>
              {renderRightActions ? renderRightActions(item.id) : null}
            </View>
          )}
          renderLeftActions={() => (
            <View style={$rightActionsContainer}>
              {renderLeftActions ? renderLeftActions(item.id) : null}
            </View>
          )}
          {...swipeableProps}
        >
          {renderItem && renderItem({ item, index, separators, isRadius: isItemRadius })}
        </Swipeable>
      )
    }

    return (
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderSwipeableItem}
        keyExtractor={keyExtractor || ((item: Item) => item.id)}
        {...flatListProps}
      />
    )
  },
)

export default SwipeListView

const $rightActionsContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: "100%",
}

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing, Image } from 'react-native';

const ContinuousRotation = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000, // Tốc độ xoay
        useNativeDriver: true,
        easing: Easing.linear
      })
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ rotate }],
          },
        ]}
      >
        <Image source={{uri: "https://i.ibb.co/MD5GQvx0/bg-glow-star-win.png"}} style={{width:"100%", height:"100%", resizeMode: "cover", borderRadius: 100 }}/>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  box: {
    width: 100,
    height: 100,
    // backgroundColor: 'blue',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
});

export default ContinuousRotation;
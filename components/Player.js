import React, { useState } from "react";
import Animated from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  RectButton
} from "react-native-gesture-handler";
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import { View, Text, TouchableOpacity, Dimensions, Image,
  SafeAreaView,
  StyleSheet, } from "react-native";
import { AntDesign, Feather, Ionicons as Icon } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { getBottomSpace } from "react-native-iphone-x-helper";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
const MINIMIZED_PLAYER_HEIGHT = 50;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - MINIMIZED_PLAYER_HEIGHT;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};
const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolate,
  diffClamp,
  Extrapolate
} = Animated;

const Player = () => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(SNAP_BOTTOM);
  const [goUp, setGoUp] = useState(new Value(0));
  const [goDown, setGoDown] = useState(new Value(0));
  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY
  });
  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config
  });
  const opacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const opacity2 = interpolate(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const clock = new Clock();
  useCode(
    block([
      cond(goUp, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_TOP
          })
        ),
        cond(not(clockRunning(clock)), [set(goUp, 0)])
      ]),
      cond(goDown, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_BOTTOM
          })
        ),
        cond(not(clockRunning(clock)), [set(goDown, 0)])
      ])
    ]),
    []
  );

  const handlPressRelease = () => {
    goDown.setValue(1)
    console.log('I am from Parent n 1')
  }

  const handlPress2 = () => {
    console.log('I am from Parent n 2')
  }

  return (
    <>
      <PanGestureHandler
        onHandlerStateChange={gestureHandler.onHandlerStateChange}
        onGestureEvent={gestureHandler.onGestureEvent}
      >
        <Animated.View
          style={[Styles.container, { transform: [{ translateY }] }]}
        >
         <SafeAreaView style={Styles.root}>
            <LinearGradient
                colors={["#0b3057", "#051c30"]}
                style={StyleSheet.absoluteFill}
            />
            <View style={{flex:1}}>
                <View style={Styles.header}>
                    <RectButton style={Styles.button} onPress={() => goDown.setValue(1)}>
                        <Image source={require('../assets/arrow.png')} style={Styles.downIcons} />
                    </RectButton>
                    <Text style={Styles.title}>The Bay</Text>
                    <RectButton style={Styles.button} onPress={()=> handlPressRelease()}>
                        <Icon name="more-horizontal" color="#8e44ad" size={24} />
                    </RectButton>
                </View>
                <Image source={require("../assets/album_cover.png")} style={Styles.cover} />
                <View style={Styles.metadata}>
                    <View>
                        <Text style={Styles.song}>The Bay</Text>
                        <Text style={Styles.artist}>Metronomy</Text>
                    </View>
                    <AntDesign name="heart" size={24} color="#55b661" />
                </View>
                <View style={Styles.slider} />
                <View style={Styles.controls}>
                    <Icon name="shuffle" color="rgba(255, 255, 255, 0.5)" size={24} />
                    <AntDesign name="stepbackward" color="white" size={32} />
                    <AntDesign name="play" color="white" size={48} />
                    <AntDesign name="stepforward" color="white" size={32} />
                    <Icon name="repeat" color="rgba(255, 255, 255, 0.5)" size={24} />
                </View>
            </View>
        </SafeAreaView>
        <Animated.View
                pointerEvents="none"
                style={{
                  opacity: opacity2,
                  backgroundColor: "#272829",
                  flex:1,
                  height: MINIMIZED_PLAYER_HEIGHT
                }}
              />
          <Animated.View
            style={{
              opacity: opacity,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: MINIMIZED_PLAYER_HEIGHT,
              width: width
            }}
          >
            <RectButton
              onPress={() => {goUp.setValue(1); console.log('Mini Player pressed')}}
              style={Styles.miniPlayer}
            >
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                MINI PLAYER CONTAINER
              </Text>
            </RectButton>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Player;

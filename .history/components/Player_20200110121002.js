import React, { useState } from "react";
import Animated from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  RectButton
} from "react-native-gesture-handler";
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
const { height } = Dimensions.get("window");
import { getBottomSpace } from "react-native-iphone-x-helper";
import Styles from "./Styles";
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

  return (
    <>
      <PanGestureHandler
        onHandlerStateChange={gestureHandler.onHandlerStateChange}
        onGestureEvent={gestureHandler.onGestureEvent}
      >
      <Animated.View style={[Styles.container,{ transform: [{ translateY }]}]}>
      <Animated.View style={Styles.miniPlayer}>
        <TouchableOpacity onPress={() => setGoUp(1)} style={{flex: 1}}>
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            MINI PLAYER CONTAINER
          </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
       
      </PanGestureHandler>
    </>
  );
};

export default Player;

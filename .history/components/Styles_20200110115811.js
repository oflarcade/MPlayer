import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  miniPlayer: {
    position: "absolute",
    bottom:50,
    right: 0,
    left:0,
    width: width,
    height: 50,
    backgroundColor: "#2c3e50"
  }
})

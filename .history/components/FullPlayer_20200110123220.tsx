import React from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign, Feather as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        width: width,
        height: 50,
    },
    button: {
        padding: 16
    },
    title: {
        color: "#8e44ad",
        padding: 16
    },
    downIcons: {
        width: 25,
        height: 25,
    },
    cover: {
        marginVertical: 16,
        width: width - 32,
        height: width - 32
    },
    metadata: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    song: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#8e44ad"
    },
    artist: {
        color: "#8e44ad"
    },
    slider: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: width - 32,
        borderRadius: 2,
        height: 4,
        marginVertical: 16
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});

interface PlayerProps {
    onPress: () => void;
}

export default ({ onPress }: PlayerProps) => {
    return (
        <SafeAreaView style={styles.root}>
            <LinearGradient
                colors={["#0b3057", "#051c30"]}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <RectButton style={styles.button} {...{ onPress }}>
                        <Image source={require('../assets/arrow.png')} style={styles.downIcons} />
                    </RectButton>
                    <Text style={styles.title}>The Bay</Text>
                    <RectButton style={styles.button} {...{ onPress }}>
                        <Icon name="more-horizontal" color="#8e44ad" size={24} />
                    </RectButton>
                </View>
                <Image source={require("../assets/album_cover.png")} style={styles.cover} />
                <View style={styles.metadata}>
                    <View>
                        <Text style={styles.song}>The Bay</Text>
                        <Text style={styles.artist}>Metronomy</Text>
                    </View>
                    <AntDesign name="heart" size={24} color="#55b661" />
                </View>
                <View style={styles.slider} />
                <View style={styles.controls}>
                    <Icon name="shuffle" color="rgba(255, 255, 255, 0.5)" size={24} />
                    <AntDesign name="stepbackward" color="white" size={32} />
                    <AntDesign name="play" color="white" size={48} />
                    <AntDesign name="stepforward" color="white" size={32} />
                    <Icon name="repeat" color="rgba(255, 255, 255, 0.5)" size={24} />
                </View>
            </View>
        </SafeAreaView>
    );
};

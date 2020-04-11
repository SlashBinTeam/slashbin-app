import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "./assets/logo.png";
import { useFonts } from "@use-expo/font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Rubik": require("./assets/fonts/Rubik/Rubik-Bold.ttf"),
  });
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 200, height: 128 }} />
     { fontsLoaded ? <Text
        style={{ color: "#000", fontSize: 52, fontFamily: "Rubik" }}
      >
        ./bin
      </Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
});

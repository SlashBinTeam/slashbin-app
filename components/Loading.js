import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: 200, height: 128, marginTop: -100 }}
      />

      <Text style={{ color: "#000", fontSize: 52, fontFamily: "rubik-bold" }}>
        ./bin
      </Text>

      <Text style={styles.button}>
        {" "}
        Creata da: {"\n"} Bruno Morelli, Alberto Mosconi, Matteo Oldani
      </Text>
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

  button: {
    textAlign: "center",
    position: "absolute",
    bottom: 50,
  },
});

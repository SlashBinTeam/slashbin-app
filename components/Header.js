import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

export default Header = () => {
  return (
    <LinearGradient
      colors={[
        "rgba(0,0,0,0.8)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "transparent",
      ]}
      style={styles.title}
    >
      <View>
        <Text style={styles.text}>./bin</Text>
      </View>
      <TouchableOpacity onPress={() => alert("INFO")}>
        <Icon name="info" family="fontawesome" color="white" size={35} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    paddingVertical: 50,
    paddingHorizontal: "5%",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: -1,
  },
  text: {
    fontSize: 35,
    fontFamily: "rubik-bold",
    color: "white",
    backgroundColor: "transparent",
  },
});

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

export default Header = ({ setInfo }) => {
  return (
    <LinearGradient
      colors={[
        "rgba(0,0,0,1)",
        // "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "transparent",
      ]}
      style={styles.title}
    >
      <View>
        <Text style={styles.text}>./bin</Text>
      </View>
      <TouchableOpacity onPress={() => setInfo(1)}>
        <Icon name="info" family="fontawesome" color="white" size={30} />
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
  },
  text: {
    fontSize: 30,
    fontFamily: "rubik-bold",
    color: "white",
    backgroundColor: "transparent",
  },
});

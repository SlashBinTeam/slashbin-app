import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "galio-framework";

export default Header = () => {
  return (
    <View style={styles.title}>
      <View stlye={{ width: "50%" }}>
        <Text style={styles.text}>
          ./<Text style={{ color: "#fff" }}>bin</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => alert("INFO")}>
        <Icon name="info" family="fontawesome" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    paddingTop: 40,
    paddingHorizontal: 10,
    width: "90%",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#27ae60",
    borderBottomWidth: 3,
  },
  text: {
    fontSize: 30,
    fontFamily: "rubik-bold",
    color: "white",
  },
});

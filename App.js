import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Loading from "./components/Loading"

export default function App() {
 
  return (
    <View style={styles.container}>
     <Loading></Loading>
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
    position: 'absolute',
    bottom:25
  }
});

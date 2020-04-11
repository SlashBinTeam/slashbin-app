import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Loading from "./components/Loading";
import ScanPage from "./components/ScanPage";

export default function App() {
  const [ready, setReady] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setReady(0);
    }, 2000);
  });

  return (
    <View style={styles.container}>{ready ? <Loading /> : <ScanPage />}</View>
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
    bottom: 1000,
  },
});

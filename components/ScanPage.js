import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Button, Text } from "galio-framework";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, width: "150%" }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <Button
            style={{
              flex: 1,
              alignSelf: "flex-end",
              marginLeft: 200,
              marginRight: 200,
              marginBottom: 50,
              alignItems: "center",
            }}
            color="#27ae60"
            round
            size="small"
          >
            <Text h5 bold color="white">
              SCAN
            </Text>
          </Button>
        </View>
      </Camera>
    </View>
  );
}

// import React from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// export default function ScanPage() {
//   return <Text style={styles.container}>scan</Text>;
// }

const styles = StyleSheet.create({
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});

import { Camera } from "expo-camera";
import { Button, Text, Icon } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default Scanning = () => {
  const [hasPermission, setHasPermission] = useState(null);

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
    <View style={styles.container}>
      <Camera style={styles.camera} ratio="1:1" />
      <Icon
        style={styles.icon}
        name="center-focus-weak"
        family="materialicons"
        color="red"
        // size={300}
      />
      <Button
        onlyIcon
        icon="camera-alt"
        iconFamily="materialicons"
        iconSize={30}
        color="#27ae60"
        iconColor="#fff"
        style={styles.button}
      >
        warning
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: (Dimensions.get("screen").height * 3) / 4,
    height: Dimensions.get("screen").height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    marginHorizontal: Dimensions.get("screen").width / 2 - 40,
    width: 80,
    height: 60,
  },
  icon: {
    position: "absolute",
    top: Dimensions.get("screen").height / 2 - 150,
    fontSize: 300,
    color: "white",
    opacity: 0.2,
  },
});

import { Camera } from "expo-camera";
import { Button, Text, Icon } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";

export default Scanning = () => {
  const [hasPermission, setHasPermission] = useState(null);
  let camera = null;

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

  const sendImage = (photo) => {
    //GET request
    fetch("http://192.168.0.3:5010/", {
      method: "POST",
      headers: {
        "content-type": "image/jpg",
      },
      body: photo,
      //Request Type
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error("no");
      });
  };

  const takePicture = async () => {
    if (Camera) {
      let photo = await camera.takePictureAsync({ base64: true, quality: 0.5 });
      console.log(Object.keys(photo));
      //   FileSystem.moveAsync({
      //     from: photo["uri"],
      //     to: "",
      //   }).then((uri) => {
      //     console.log("Finished downloading to ");
      //   });

      sendImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ratio="18:9"
        ref={(cam) => (camera = cam)}
      />
      {/* <Icon
        style={styles.icon}
        name="crosshairs"
        family="materialicons"
        color="red"
        // size={300}
      /> */}
      <View style={styles.overlay}></View>
      <Button
        onlyIcon
        icon="camera-alt"
        iconFamily="materialicons"
        iconSize={30}
        color="#27ae60"
        iconColor="#fff"
        style={styles.button}
        onPress={takePicture}
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
    width: (Dimensions.get("screen").height * 9) / 18,
    height: Dimensions.get("screen").height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    marginHorizontal: Dimensions.get("screen").width / 2 - 40,
    width: 80,
    height: 60,
  },
  overlay: {
    position: "absolute",
    top: Dimensions.get("screen").height / 2 - 180,
    width: "90%",
    height: Dimensions.get("screen").width * 0.9,
    opacity: 0.3,
    borderColor: "white",
    borderStyle: "dashed",
    borderRadius: 20,
    borderWidth: 5,
  },
  icon: {
    position: "absolute",
    top: Dimensions.get("screen").height / 2 - 150,
    fontSize: 300,
    color: "white",
    opacity: 0.2,
  },
});

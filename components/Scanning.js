import { Camera } from "expo-camera";
import { Button, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const url = "http://192.168.0.5:5010/";

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
    // POST request to flask api with the image taken from the camera
    let prediction;

    const data = new FormData();
    data.append("height", photo.height);
    data.append("width", photo.width);
    data.append("photo", {
      uri: photo.uri,
      type: "image/jpeg", // or photo.type
      name: "testPhotoName",
    });
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((response) => {
        console.log(Object.keys(response));
        return response.json();
      })
      .then((responseJson) => {
        prediction = JSON.parse(responseJson);
        console.log(prediction, typeof prediction.result);
        switch (prediction.result) {
          case "0":
            prediction = "cardboard";
            break;
          case "1":
            prediction = "glass";
            break;
          case "2":
            prediction = "metal";
            break;
          case "3":
            prediction = "paper";
            break;
          case "4":
            prediction = "plastic";
            break;
          case "5":
            prediction = "trash";
            break;
          default:
            prediction = "error in classifying";
        }
        alert(prediction);
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  const takePicture = async () => {
    // snap picture and call function to send it to server
    if (Camera) {
      let photo = await camera.takePictureAsync({ base64: true, quality: 0.4 });
      console.log(Object.keys(photo));

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
});

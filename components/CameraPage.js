import { Camera } from "expo-camera";
import { Button, Text, Block } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import Header from "./Header";
import Result from "./Result";
import overlay from "../assets/overlay.png";

export default CameraPage = () => {
  let camera = null;
  const [hasPermission, setHasPermission] = useState(null);

  const url = "http://192.168.0.12:5010/";
  const [analyzing, setAnalyzing] = useState(0);
  const [result, setResult] = useState("");

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
      type: "image/jpeg",
      name: "photo",
    });
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        prediction = JSON.parse(responseJson);
        console.log(prediction, typeof prediction.result);
        setResult(prediction.result);
        setAnalyzing(0);
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  const takePicture = async () => {
    // snap picture and call function to send it to server
    if (Camera) {
      setAnalyzing(1);
      let photo = await camera.takePictureAsync({ base64: true, quality: 0.4 });
      console.log(Object.keys(photo));
      sendImage(photo);
    }
  };

  return (
    <Camera style={styles.camera} ratio="18:9" ref={(cam) => (camera = cam)}>
      <Header />
      <Image source={overlay} style={styles.overlay}></Image>
      {/* <Text style={styles.overlay}></Text> */}
      <Result result={result} analyzing={analyzing} takePicture={takePicture} />
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top:
      Dimensions.get("screen").height / 2 -
      (Dimensions.get("screen").width * 0.9) / 2,
    width: "90%",
    height: Dimensions.get("screen").width * 0.9,
    opacity: 0.2,
    // borderColor: "white",
    // borderStyle: "dashed",
    // borderRadius: 20,
    // borderWidth: 5,
  },
});

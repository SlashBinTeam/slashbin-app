import { Camera } from "expo-camera";
import { Button, Text, Block } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import Header from "./Header";
import Result from "./Result";
import overlay from "../assets/overlay.png";
import Info from "./Info";

export default CameraPage = () => {
  let camera = null;
  const [hasPermission, setHasPermission] = useState(null);

  const url = "http://35.242.176.203:2000/";
  const [analyzing, setAnalyzing] = useState(0);
  const [displayResult, setDisplayResult] = useState(0);
  const [result, setResult] = useState("");
  const [info, setInfo] = useState(0);
  const [photo, setPhoto] = useState({});
  const [label, setLabel] = useState("");

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
    return <Text>Accesso alla fotocamera negato</Text>;
  }

  const storeImage = () => {
    // console.log(photo);
    const data = new FormData();
    data.append("label", label);
    data.append("width", photo.width);
    data.append("photo", {
      uri: photo.uri,
      type: "image/jpeg",
      name: "photo",
    });

    fetch(url + "store", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let finalMsg = JSON.parse(responseJson);
        alert(finalMsg.message);
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  const sendImage = (image) => {
    // POST request to flask api with the image taken from the camera
    let prediction;

    const data = new FormData();
    data.append("height", image.height);
    data.append("width", image.width);
    data.append("photo", {
      uri: image.uri,
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
      let image = await camera.takePictureAsync({ base64: true, quality: 0.4 });
      setPhoto(image);
      sendImage(image);
    }
  };

  return (
    <>
      <Header setInfo={setInfo} />
      <Camera
        style={{ ...styles.camera, opacity: displayResult ? 0.2 : 1 }}
        ratio="18:9"
        ref={(cam) => (camera = cam)}
      >
        <Image source={overlay} style={styles.overlay}></Image>
      </Camera>
      <Result
        result={result}
        analyzing={analyzing}
        displayResult={displayResult}
        setDisplayResult={setDisplayResult}
        takePicture={takePicture}
        storeImage={storeImage}
        label={label}
        setLabel={setLabel}
      />
      {info ? <Info setInfo={setInfo} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    top:
      Dimensions.get("screen").height / 2 -
      (Dimensions.get("screen").width * 0.8) / 2,
    width: "80%",
    height: Dimensions.get("screen").width * 0.8,
    opacity: 0.2,
  },
});

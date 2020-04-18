import { Camera } from "expo-camera";
import { Button, Text, Block } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const url = "http://192.168.0.12:5010/";

export default Scanning = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [analyizing, setAnalyzing] = useState(0);
  const [displayResult, setDisplayResult] = useState(0);
  const [result, setResult] = useState("");

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
      type: "image/jpeg",
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
        setAnalyzing(0);
        setResult(prediction.result);
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
      setDisplayResult(1);
      let photo = await camera.takePictureAsync({ base64: true, quality: 0.4 });
      console.log(Object.keys(photo));
      sendImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={{ ...styles.camera, opacity: displayResult ? 0.3 : 1 }}
        ratio="18:9"
        ref={(cam) => (camera = cam)}
      >
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
          take picture
        </Button>

        <View style={styles.overlay}></View>
      </Camera>

      {displayResult ? (
        <View style={styles.result}>
          <Button
            color="#27ae60"
            size="small"
            onPress={() => setDisplayResult(0)}
          >
            Scan Again
          </Button>
          {analyizing ? (
            <Text>{"\n"}Analyzing image...</Text>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>
                {"\n"}
                The item has to be recycled as:
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>{result}</Text>
            </View>
          )}
        </View>
      ) : null}
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
    flex: 1,
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 80,
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
  result: {
    flex: 1,
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    borderRadius: 20,
  },
});

import { Camera } from "expo-camera";
import { Button, Text, Icon } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";

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

  /**
   * Convert a base64 string in a Blob according to the data and contentType.
   *
   * @param b64Data {String} Pure base64 string without contentType
   * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
   * @param sliceSize {Int} SliceSize to process the byteCharacters
   * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
   * @return Blob
   */

  const b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const sendImage = (photo) => {
    //GET request

    // const blob = b64toBlob(photo.base64, "image/jpg");
    // const data = new FormData();
    // data.append("image", blob);
    // data.append("photo", {
    //   uri: photo.uri,
    //   type: "image/jpg", // or photo.type
    //   name: "testPhotoName",
    // });
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: data,
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     alert(responseJson);
    //     console.log(responseJson);
    //   })
    //   .catch((error) => {
    //     // alert(JSON.stringify(error));
    //     console.log("error");
    //     console.error(error);
    //   });

    let prediction;

    const data = new FormData();
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
        switch (prediction.result) {
          case "0":
            prediction = "cardboard";
          case "1":
            prediction = "glass";
          case "2":
            prediction = "metal";
          case "3":
            prediction = "paper";
          case "4":
            prediction = "plastic";
          case "5":
            prediction = "trash";
          default:
        }
        alert(prediction);
      })
      .catch((error) => {
        // alert(JSON.stringify(error));
        console.log("error");
        console.error(error);
      });
  };

  const takePicture = async () => {
    if (Camera) {
      let photo = await camera.takePictureAsync({ base64: true, quality: 1 });
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

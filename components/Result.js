import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  Easing,
  //   Image,
} from "react-native";
import { Button } from "galio-framework";
// import ClipLoader from "react-spinners/ClipLoader";
// import { css } from "@emotion/core";
import Analyzing from "./Analyzing";

export default Result = ({
  result,
  displayResult,
  setDisplayResult,
  analyzing,
  takePicture,
}) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("screen").height - 120)
  ).current;

  //   const [displayResult, setDisplayResult] = useState(0);

  const handlePress = () => {
    if (!displayResult) {
      setDisplayResult(1);
      takePicture();
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("screen").height * 0.15,
        easing: Easing.back(),
        duration: 600,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("screen").height - 120,
        easing: Easing.bounce,
        duration: 900,
      }).start();
      setDisplayResult(0);
    }
  };

  return (
    <Animated.View style={{ ...styles.resultContainer, marginTop: slideAnim }}>
      <Button
        // onlyIcon
        // icon="camera-alt"
        // iconFamily="materialicons"
        // iconSize={30}
        color="#27ae60"
        iconColor="#fff"
        style={styles.button}
        onPress={handlePress}
      >
        <Text
          style={{ fontFamily: "rubik-bold", fontSize: 20, color: "white" }}
        >
          {displayResult ? <>try again</> : <>scan image</>}
        </Text>
      </Button>
      <View style={styles.resultInfo}>
        <View style={{ alignItems: "center" }}>
          {analyzing ? (
            <Analyzing />
          ) : (
            <Text style={{ fontFamily: "rubik-regular" }}>
              <Text style={{ fontSize: 18 }}>
                The item has to be recycled as:
              </Text>
              {"\n"}
              <Text style={{ fontSize: 20, fontFamily: "rubik-bold" }}>
                {result}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    position: "absolute",
    alignItems: "center",
    height: Dimensions.get("screen").height * 0.85,
    width: "100%",
    zIndex: 1,
    paddingTop: 30,
  },
  resultInfo: {
    flex: 1,
    paddingTop: 60,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  button: {
    position: "relative",
    zIndex: 2,
    marginBottom: -30,
    height: 60,
    width: "60%",
    borderRadius: 30,
    elevation: 6,
    shadowOffset: {
      height: 13,
      width: 1,
    },
  },
});

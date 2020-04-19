import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, Animated, View, Text } from "react-native";
import { Button } from "galio-framework";

export default Result = ({ result, analyzing, takePicture }) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("screen").height - 120)
  ).current;
  const [displayResult, setDisplayResult] = useState(0);

  const handlePress = () => {
    if (!displayResult) {
      setDisplayResult(1);
      takePicture();
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("screen").height * 0.15,
        duration: 300,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("screen").height - 120,
        duration: 300,
      }).start();
      setDisplayResult(0);
    }
  };

  return (
    <Animated.View style={{ ...styles.resultContainer, marginTop: slideAnim }}>
      <Button
        onlyIcon
        icon="camera-alt"
        iconFamily="materialicons"
        iconSize={30}
        color="#27ae60"
        iconColor="#fff"
        style={styles.button}
        onPress={handlePress}
        title="take picture"
      ></Button>
      <View style={styles.resultInfo}>
        <View style={{ alignItems: "center" }}>
          {analyzing ? (
            <Text style={{ fontFamily: "rubik-regular" }}>
              {"\n"}Analyzing image...
            </Text>
          ) : (
            <Text style={{ fontFamily: "rubik-regular" }}>
              <Text style={{ fontSize: 18 }}>
                The item has to be recycled as:
              </Text>
              {"\n"}
              <Text style={{ fontSize: 25, fontFamily: "rubik-bold" }}>
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
    width: "90%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  button: {
    position: "relative",
    zIndex: 2,
    marginBottom: -30,
    height: 60,
    width: 80,
  },
});

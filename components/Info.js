import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Button } from "galio-framework";

export default Info = ({ setInfo }) => {
  const infoAnim = useRef(new Animated.Value(Dimensions.get("screen").width))
    .current;

  useEffect(() => {
    Animated.timing(infoAnim, {
      toValue: 0,
      easing: Easing.bounce,
      duration: 800,
    }).start();
  }, []);

  const goBack = () => {
    Animated.timing(infoAnim, {
      toValue: Dimensions.get("screen").width,
      easing: Easing.bounce,
      duration: 800,
    }).start(() => setInfo(0));
    // setInfo(0);
  };
  return (
    <Animated.View
      style={{
        ...styles.container,
        // transform: [{ scaleY: infoAnim }, { scaleX: infoAnim }],
        marginLeft: infoAnim,
      }}
    >
      <Text>Hello world</Text>
      <Button onPress={goBack}>prova</Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

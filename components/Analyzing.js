import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, Dimensions, Easing } from "react-native";
import illustration from "../assets/loading.png";

export default Analyzing = () => {
  const imageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(imageAnim, {
        toValue: 0.7,
        easing: Easing.bounce,
        duration: 900,
      }),
    ]).start();
  }, []);

  return (
    <>
      <Text style={{ fontFamily: "rubik-regular", fontSize: 18 }}>
      Sto analizzando la foto....
        {"\n"}
        Per favore attendi.
        {"\n"}
      </Text>
      <Animated.Image
        source={illustration}
        style={{
          transform: [{ scaleY: imageAnim }, { scaleX: imageAnim }],
        }}
      />
    </>
  );
};

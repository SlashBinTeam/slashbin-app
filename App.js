import { useFonts } from "@use-expo/font";
import React, { useEffect, useState } from "react";
import CameraPage from "./components/CameraPage";
import Loading from "./components/Loading";
import { AppLoading } from "expo";

export default function App() {
  const [fontsLoaded] = useFonts({
    "rubik-regular": require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik/Rubik-Bold.ttf"),
    "rubik-black": require("./assets/fonts/Rubik/Rubik-Black.ttf"),
  });
  const [ready, setReady] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setReady(1);
    }, 2000);
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return ready ? <CameraPage /> : <Loading />;
}

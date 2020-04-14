import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Loading from "./components/Loading";
import ScanPage from "./components/ScanPage";
import Scanning from "./components/Scanning";

export default function App() {
  const [ready, setReady] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setReady(0);
    }, 2000);
  });

  return <View style={{ flex: 1 }}>{ready ? <Loading /> : <Scanning />}</View>;
}

import React from "react";
import { Text, View, Dimensions, Picker } from "react-native";
import { Button } from "galio-framework";

export default Complete = ({ result, storeImage, setLabel, label }) => {
  return (
    <View style={{ marginHorizontal: "10%" }}>
      <Text style={{ fontFamily: "rubik-regular", fontSize: 18 }}>
        The item has to be recycled as:
      </Text>
      <Text style={{ fontSize: 23, fontFamily: "rubik-bold" }}>{result}</Text>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.8,
          height: 2,
          backgroundColor: "lightgray",
          marginVertical: 30,
        }}
      ></View>
      <Text style={{ fontFamily: "rubik-bold", fontSize: 20 }}>
        Help us Improve!
        {"\n"}
      </Text>
      <Text style={{ fontFamily: "rubik-regular", fontSize: 18 }}>
        Was the correction correct? If not, please correct us! By doing this our
        service will keep improving.
        {"\n"}
        {"\n"}
        {/* </Text> */}
        {/* <Text> */}
        Please select the correct category and press the button, thank you!
        {"\n"}
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Picker
          selectedValue={label}
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue, itemIndex) => setLabel(itemValue)}
        >
          <Picker.Item label="cardboard" value="cardboard" />
          <Picker.Item label="glass" value="glass" />
          <Picker.Item label="paper" value="paper" />
          <Picker.Item label="metal" value="metal" />
          <Picker.Item label="trash" value="trash" />
          <Picker.Item label="plastic" value="plastic" />
        </Picker>
        <Button
          round
          color="#27ae60"
          onPress={storeImage}
          style={{ width: "80%" }}
        >
          Send to database
        </Button>
      </View>
    </View>
  );
};

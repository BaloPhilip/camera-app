import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const Scanner = ({ navigation: { navigate } }) => (
  <View>
    <Button
      onPress={() => navigate("Main")}
      title="Main screen"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);

Scanner.navigationOptions = {
  title: "Back to Main"
};

export default Scanner;

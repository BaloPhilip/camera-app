import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const Main = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Button
        onPress={() => navigate("Scanner")}
        title="Camera screen"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Main;

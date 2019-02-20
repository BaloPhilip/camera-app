import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const Main = ({ navigation }) => {
  const data = navigation.getParam("data", null);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("Camera")}
        title="Open camera"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {data && (
        <View style={styles.content}>
          <Text>{data}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 20
  }
});

export default Main;

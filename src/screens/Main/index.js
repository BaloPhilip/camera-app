import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Main = ({ navigation }) => {
  const data = navigation.getParam("data", null);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={{ alignSelf: "center" }}
        >
          <Ionicons name="md-camera" size={70} color="black" />
        </TouchableOpacity>
      </View>
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

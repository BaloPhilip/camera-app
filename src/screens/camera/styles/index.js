import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  notificationWrapper: {
    flex: 0.2,
    backgroundColor: "transparent"
  },
  notificationBody: {
    backgroundColor: "rgba(128, 128, 128, .6)",
    padding: 10
  },
  notifacationText: {
    fontSize: 18,
    color: "white",
    textAlign: "center"
  },
  bottomBar: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 15,
    top: "40%"
  }
});

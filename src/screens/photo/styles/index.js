import { StyleSheet } from "react-native";
import { Constants } from "expo";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  buttomBar: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight / 2
  },
  button: {
    flex: 0.25,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  imageWrapper: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "contain"
  }
});

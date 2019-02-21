import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { ImageManipulator, MediaLibrary, Constants } from "expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default class ImageManipulatorSample extends React.Component {
  state = {
    ready: false,
    image: null
  };

  componentDidMount() {
    const image = this.props.navigation.getParam("photo", null);
    this.setState({
      ready: true,
      image
    });
  }

  rotate = async degree => {
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.image.localUri || this.state.image.uri,
      [{ rotate: degree }],
      { format: "jpeg" }
    );
    this.setState({ image: manipResult });
  };

  flip = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.image.localUri || this.state.image.uri,
      [{ flip: { horizontal: true } }],
      { format: "jpeg" }
    );
    this.setState({ image: manipResult });
  };

  save = async () => {
    const { image } = this.state;
    try {
      await MediaLibrary.createAssetAsync(image.uri);
      alert("Successfully saved photos to user's gallery!");
    } catch (e) {
      alert("No photos to save!");
      console.log("ERROR", e);
    }
  };

  renderImage = () => {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Image
          source={{ uri: this.state.image.localUri || this.state.image.uri }}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
    );
  };

  renderBottomBar = () => (
    <View
      style={{
        flex: 0.2,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: Constants.statusBarHeight / 2
      }}
    >
      <TouchableOpacity onPress={() => this.rotate(90)} style={styles.button}>
        <MaterialIcons name="rotate-right" size={50} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.rotate(-90)} style={styles.button}>
        <MaterialIcons name="rotate-left" size={50} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.flip} style={styles.button}>
        <MaterialIcons name="flip" size={50} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.save} style={styles.button}>
        <MaterialIcons name="save" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 10
        }}
      >
        {this.state.ready && this.renderImage()}
        {this.renderBottomBar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 0.25,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

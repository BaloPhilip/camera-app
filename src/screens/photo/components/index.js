import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { ImageManipulator, MediaLibrary } from "expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { styles } from "../styles";

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
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: this.state.image.localUri || this.state.image.uri }}
          style={styles.image}
        />
      </View>
    );
  };

  renderBottomBar = () => (
    <View style={styles.buttomBar}>
      <TouchableOpacity onPress={() => this.rotate(90)} style={styles.button}>
        <MaterialIcons name="rotate-right" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.rotate(-90)} style={styles.button}>
        <MaterialIcons name="rotate-left" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.flip} style={styles.button}>
        <MaterialIcons name="flip" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.save} style={styles.button}>
        <MaterialIcons name="save" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Main")}
        style={styles.button}
      >
        <MaterialIcons name="home" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.ready && this.renderImage()}
        {this.renderBottomBar()}
      </View>
    );
  }
}

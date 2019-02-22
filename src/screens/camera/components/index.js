import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera as CameraExpo,
  Permissions,
  BarCodeScanner,
  MediaLibrary
} from "expo";

import { styles } from "../styles";

export default class Camera extends React.Component {
  state = {
    hasCameraPermission: null,
    isPortrait: true,
    isPhoto: true
  };

  componentDidMount() {
    this.requestCameraPermission();
    Dimensions.addEventListener("change", this.handleEventDimensions);
    const { height, width } = Dimensions.get("screen");
    this.setState({ isPortrait: height > width });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.handleEventDimensions);
  }

  handleEventDimensions = ({ screen: { height, width } }) => {
    this.setState({ isPortrait: height > width });
  };

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  handleBarCodeRead = ({ data }) => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Main", { data });
  };

  takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      await this.saveToGallery(photo);
    }
  };

  saveToGallery = async photo => {
    const {
      navigation: { navigate }
    } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      alert("Denied CAMERA_ROLL permissions!");
    } else {
      try {
        this.setState({ isPhoto: false });
        await MediaLibrary.createAssetAsync(photo.uri);
        navigate("Photo", { photo });
        this.setState({ isPhoto: true });
      } catch (e) {
        console.log("error", e);
        this.setState({ isPhoto: true });
      }
    }
  };

  renderBottomBar = () => (
    <View style={{ flex: 0.4 }}>
      <TouchableOpacity
        onPress={this.takePicture}
        style={{ alignSelf: "center" }}
      >
        <Ionicons name="ios-radio-button-on" size={70} color="white" />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { hasCameraPermission, isPortrait, isPhoto } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <CameraExpo
            ref={ref => {
              this.camera = ref;
            }}
            style={[
              styles.camera,
              { justifyContent: isPortrait ? "center" : "space-between" }
            ]}
            type={CameraExpo.Constants.Type.back}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={!isPortrait ? this.handleBarCodeRead : null}
          >
            <View style={styles.notificationWrapper}>
              {isPortrait && (
                <View style={styles.notificationBody}>
                  <Text style={styles.notifacationText}>
                    Please rotate device into landscape orientation
                  </Text>
                </View>
              )}
            </View>
            <View
              style={[
                styles.bottomBar,
                { paddingBottom: !this.state.isPortrait ? 50 : 5 }
              ]}
            >
              {!isPortrait && isPhoto && this.renderBottomBar()}
            </View>
          </CameraExpo>
        </View>
      );
    }
  }
}

import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera as CameraExpo,
  Permissions,
  BarCodeScanner,
  MediaLibrary
} from "expo";

export default class Camera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: CameraExpo.Constants.Type.back,
    isPortrait: true
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      throw new Error("Denied CAMERA_ROLL permissions!");
    }
    await MediaLibrary.createAssetAsync(photo.uri);
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
    const { hasCameraPermission, isPortrait } = this.state;
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
            type={this.state.type}
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
              {!isPortrait && this.renderBottomBar()}
            </View>
          </CameraExpo>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
    // justifyContent: "space-between"
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
    alignSelf: "center",
    justifyContent: "space-between",
    flex: 0.12,
    flexDirection: "row"
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: "center",
    alignItems: "center"
  }
});

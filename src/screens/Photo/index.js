import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { Camera as CameraExpo, Permissions, BarCodeScanner } from "expo";

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
            style={styles.camera}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  }
});

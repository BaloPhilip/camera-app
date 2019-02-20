import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Camera as CameraExpo, Permissions, BarCodeScanner } from "expo";

export default class Camera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: CameraExpo.Constants.Type.back,
    isPortrait: true
  };

  componentDidMount() {
    this.requestCameraPermission();
    Dimensions.addEventListener("change", e => {
      const {
        screen: { height, width }
      } = e;
      this.handleEventDimensions(height, width);
    });
    const { height, width } = Dimensions.get("screen");

    this.handleEventDimensions(height, width);
  }

  handleEventDimensions = (height, width) => {
    this.setState({
      isPortrait: height > width
    });
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", e => {
      this.handleEventDimensions;
    });
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  handleBarCodeRead = ({ data }) => {
    // console.log("1111111 --->", 1111111);
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Main", { data });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <CameraExpo
            style={{ flex: 1 }}
            type={this.state.type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={this.handleBarCodeRead}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === CameraExpo.Constants.Type.back
                        ? CameraExpo.Constants.Type.front
                        : CameraExpo.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  TEST{" "}
                </Text>
                {this.state.isPortrait && (
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    isPortrait
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </CameraExpo>
        </View>
      );
    }
  }
}

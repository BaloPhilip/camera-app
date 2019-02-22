import * as Expo from "expo";
import React from "react";
import { View } from "react-native";
import App from "./App";

// we don't want this to require transformation
class AwakeInDevApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }

  async componentDidMount() {
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <App {...this.props} />
        {process.env.NODE_ENV === "development" ? <Expo.KeepAwake /> : <View />}
      </View>
    );
  }
}

Expo.registerRootComponent(AwakeInDevApp);

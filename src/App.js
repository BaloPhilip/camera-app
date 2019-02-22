import * as React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Main, Camera, Photo } from "./screens";

const AppNavigator = createStackNavigator(
  {
    Main: { screen: Main },
    Camera: { screen: Camera },
    Photo: { screen: Photo }
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer {...this.props} />;
  }
}

import * as React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Main, Scanner } from "./screens";

const AppNavigator = createStackNavigator(
  {
    Main: { screen: Main },
    Scanner: { screen: Scanner }
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = props => <AppContainer {...props} />;

export default App;

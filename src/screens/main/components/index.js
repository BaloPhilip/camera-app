import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

export default class Main extends React.Component {
  state = {
    data: null
  };

  componentDidUpdate() {
    const data = this.props.navigation.getParam("data", null);
    if (data !== this.state.data) {
      this.setState({ data });
    }
  }

  handleNavigate = () => {
    const { navigation } = this.props;
    this.props.navigation.setParams({ data: null });
    navigation.navigate("Camera");
  };

  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={this.handleNavigate}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="md-camera" size={70} color="black" />
          </TouchableOpacity>
        </View>
        {data && (
          <View style={styles.content}>
            <Text>{data}</Text>
          </View>
        )}
      </View>
    );
  }
}

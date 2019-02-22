import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

export default class Main extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    const data = this.props.navigation.getParam("data", null);
    this.setState({ data });
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
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

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Button = props => {
  return (
    <View>
      <Text>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {

  },
  icon: {

  }
})

export default Button
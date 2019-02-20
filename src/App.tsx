import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text>Welcome to your own GraphQL mobile front end!</Text>
    <Button
      onPress={() => console.log('PRESS')}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App;

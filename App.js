import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Player from './components/Player';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Player />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
});

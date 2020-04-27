/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

function Greeting(props) {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}

function LotsOfGreetings() {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='World' />
      
    </View>
  );
}

export default LotsOfGreetings;
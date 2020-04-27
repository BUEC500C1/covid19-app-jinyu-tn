/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

 
export default class App extends React.Component {
  onRegionChange(region) {
    this.setState({ region });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40,
            longitude: -90,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 40,
              longitude: -90,
            }}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
});
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import covidApi from './api/covid';
import Geocoder from 'react-native-geocoding';


const CovidMapScreen = () => {

    useEffect(() => {
        Geocoder.init("Your apikey", { language: "en" })
    }, [])

    const [markers, setMarkers] = useState([]);

    const prepare_Name = (country) => {
        return country.toLowerCase().replace(' ', '-');
    };

    const getData = async (country, coordinate) => {
        const response = await covidApi.get(`/total/country/${country}`);
        let data = response.data[response.data.length - 1];
        data.Lat = coordinate.latitude;
        data.Lon = coordinate.longitude;
        data.key = markers.length;
        setMarkers([...markers, data]);
    }

    const getCountry = (coordinate) => {
        Geocoder.from(coordinate).then(json => {
            let country = json.results[0].address_components[json.results[0].address_components.length - 1].long_name;
            if (json.results[0].address_components[json.results[0].address_components.length - 1].types.includes("postal_code")) {
                country = json.results[0].address_components[json.results[0].address_components.length - 2].long_name;
            }
            else if (json.results[0].address_components[json.results[0].address_components.length - 1].types.includes("postal_code_suffix")) {
                country = json.results[0].address_components[json.results[0].address_components.length - 3].long_name;
            }
            getData(prepare_Name(country), coordinate);

        }).catch(() => { });
    };

    return (
        <MapView
            style={styles.map}
            onPress={(e) => getCountry(e.nativeEvent.coordinate)}
        >
            {markers.map(marker => (
                <Marker
                    key={marker.key.toString()}
                    coordinate={{
                        longitude: marker.Lon,
                        latitude: marker.Lat,
                    }}
                    title={marker.Country}
                    description={`Confirmed: ${marker.Confirmed} Deaths: ${marker.Deaths} Recovered: ${marker.Recovered}`}
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
    map: {
        flex: 1
    }
});

export default CovidMapScreen;
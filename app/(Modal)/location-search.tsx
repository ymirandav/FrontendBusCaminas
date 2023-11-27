import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const LocationSearch = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState({
    latitude: -16.423399904631825,
    longitude: -71.55657756931967,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState({
    latitude: -16.423399904631825,
    longitude: -71.55657756931967,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef<MapView | null>(null);

  const [busRoutes, setBusRoutes] = useState([
    { id: '1', name: 'Bus 101', origin: 'Terminal A', destination: 'Station X' },
    { id: '2', name: 'Bus 202', origin: 'Station B', destination: 'Station Y' },
    // Agrega más rutas de autobús según sea necesario
  ]);

  const handleOriginSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setOrigin({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      zoomToLocation(lat, lng);
    }
  };

  const handleDestinationSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setDestination({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      zoomToLocation(lat, lng);
    }
  };

  const zoomToLocation = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Origen'
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={handleOriginSelect}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
              language: 'es',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Destino'
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={handleDestinationSelect}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
              language: 'es',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
      </View>

      <MapView
        ref={(map) => (mapRef.current = map)}
        showsUserLocation={true}
        style={styles.map}
        region={origin}>
        <Marker coordinate={origin} pinColor="blue" />
        <Marker coordinate={destination} pinColor="red" />
        <Polyline
          coordinates={[origin, destination]}
          strokeColor="green"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.busRoutesContainer}>
        <Text style={styles.busRoutesTitle}>Rutas de Autobús</Text>
        <FlatList
          data={busRoutes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.busRouteItem}>
              <Text style={styles.busRouteName}>{item.name}</Text>
              <Text>{`${item.origin} - ${item.destination}`}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.blue,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchBox: {
    flex: 1,
    marginRight: 8,
  },
  busRoutesContainer: {
    flex: 1,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  busRoutesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  busRouteItem: {
    marginBottom: 8,
  },
  busRouteName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationSearch;

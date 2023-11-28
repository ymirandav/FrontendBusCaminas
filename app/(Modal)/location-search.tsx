import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const LocationSearch = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({
    latitude: -16.423399904631825,
    longitude: -71.55657756931967,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [origin, setOrigin] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

  const [destination, setDestination] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

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

  // Actualiza la región del mapa al cambiar el origen o el destino
  useEffect(() => {
    if (origin) {
      mapRef.current?.animateToRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: origin.latitudeDelta,
        longitudeDelta: origin.longitudeDelta,
      });
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      mapRef.current?.animateToRegion({
        latitude: destination.latitude,
        longitude: destination.longitude,
        latitudeDelta: destination.latitudeDelta,
        longitudeDelta: destination.longitudeDelta,
      });
    }
  }, [destination]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Origen'
            styles={{
              container: {
                position: 'absolute', // Hace que el componente se superponga
                left: 0,
                right: 0,
                zIndex: 1, // Asegura que el componente esté sobre otros elementos
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
                position: 'absolute',
                left: 0,
                right: 0,
                zIndex: 1,
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
        region={location}>
        {origin && <Marker coordinate={origin} pinColor="blue" />}
        {destination && <Marker coordinate={destination} pinColor="red" />}
        {origin && destination && (
          <Polyline coordinates={[origin, destination]} strokeColor="purple" strokeWidth={4} />
        )}
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
    bottom: 0,
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
    flexDirection: 'column',
    // width: 390,
    height: 100,
    // display: 'flex',

    paddingHorizontal: 20,
    marginTop: 8,
  },
  searchBox: {
    flex: 1,
    marginRight: 0,
  },
  busRoutesContainer: {
    flex: 0.5,
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

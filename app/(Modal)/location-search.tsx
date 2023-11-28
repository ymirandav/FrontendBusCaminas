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
  
  
  const [selectedOrigin, setSelectedOrigin] = useState<null | string>(null);
  const [selectedDestination, setSelectedDestination] = useState<null | string>(null);


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

  const handleOriginSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setOrigin({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setSelectedOrigin(data.description); // Guarda el nombre del origen      
      zoomToLocation(lat, lng);
      console.log("lat ori: " + lat);
      console.log("lng ori: " + lng);
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
      setSelectedDestination(data.description); // Guarda el nombre del destino
      zoomToLocation(lat, lng);
      console.log("lat des: " + lat);
      console.log("lng des: " + lng);
    }
  };

  // useEffect(() => {
  //   console.log("Origen:", selectedOrigin);
  // }, [selectedOrigin]);
  
  // useEffect(() => {
  //   console.log("Destino:", selectedDestination);
  // }, [selectedDestination]);

  const [busRoutes, setBusRoutes] = useState([
    { id: '1', name: 'Arias 13', origin: selectedOrigin, destination: selectedDestination },
    
  ]);

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

      {selectedOrigin && selectedDestination && (
        <View style={styles.busRoutesContainer}>
          <Text style={styles.busRoutesTitle}>Puedes tomar los siguientes autobuses:</Text>
          <FlatList
            data={busRoutes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const arias13Coords = {
                origin: { latitude: -16.4083849, longitude: -71.5422737 },
                destination: { latitude: -16.42432609999999, longitude: -71.55666339999999 },
              };

              const arias33Coords = {
                origin: { latitude: -16.42432609999999, longitude: -71.55666339999999 },
                destination: { latitude: -16.4083849, longitude: -71.5422737 },
              };

              const CGRAMPOCoords = {
                origin: { latitude: -16.42770209999999, longitude: -71.5168211 },
                destination: { latitude: -16.4034579,  longitude: -71.5484707 },
              };

              const originCoords = {
                latitude: origin?.latitude || 0,
                longitude: origin?.longitude || 0,
              };

              const destinationCoords = {
                latitude: destination?.latitude || 0,
                longitude: destination?.longitude || 0,
              };

              let busesToShow: string[] = [];

              if (
                JSON.stringify(originCoords) === JSON.stringify(arias13Coords.origin) &&
                JSON.stringify(destinationCoords) === JSON.stringify(arias13Coords.destination)
              ) {
                busesToShow.push('Arias 13');
                busesToShow.push('Segrampo');
              }

              if (
                JSON.stringify(originCoords) === JSON.stringify(arias33Coords.origin) &&
                JSON.stringify(destinationCoords) === JSON.stringify(arias33Coords.destination)
              ) {
                busesToShow.push('Arias 33');
                busesToShow.push('COTUM');
              }

              if (
                JSON.stringify(originCoords) === JSON.stringify(CGRAMPOCoords.origin) &&
                JSON.stringify(destinationCoords) === JSON.stringify(CGRAMPOCoords.destination)
              ) {
                busesToShow.push('C-GRAMPO');
                busesToShow.push('COTUM');
              }

              return busesToShow.length > 0 ? (
                <View style={styles.busRouteItem}>
                  {busesToShow.map((bus) => (
                    <Text style={styles.busRouteName} key={bus}>
                      + {bus}
                    </Text>
                  ))}
                </View>
              ) : null;
            }}
          />
        </View>
      )}

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
    // fontWeight: 'bold',
  },
});

export default LocationSearch;

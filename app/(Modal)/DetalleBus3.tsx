import React, { useState } from 'react';
import { TouchableOpacity, Modal, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';

const DetalleBus = () => {
  const navigation = useNavigation();

  const origin = {
    latitude: -16.426890262861,
    longitude:  -71.60707640759757, 
  };

  const destination = {
    latitude: -16.422281157493607,
    longitude:  -71.54026921976525
  };

  const coordinates = [origin, destination];

  const [rutaIdaModalVisible, setRutaIdaModalVisible] = useState(false);
  const [rutaVueltaModalVisible, setRutaVueltaModalVisible] = useState(false);

  const handleRutaIdaPress = () => {
    setRutaIdaModalVisible(true);
  };

  const handleRutaVueltaPress = () => {
    setRutaVueltaModalVisible(true);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>C-GRAMPO</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.column}>Horarios</Text>
          <Text style={styles.column}>06:00 AM a 09:00 PM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Inicio</Text>
          <Text style={styles.column}>Terminal Megabus AQP S.A.C. (Pampas Nuevas)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Fin</Text>
          <Text style={styles.column}>Gratersa</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Precio</Text>
          <Text style={styles.column}>S/ 1.00</Text>
        </View>
      </View>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: -16.42886256931967,
          longitude: -71.55518309999999,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker coordinate={origin} title="Inicio" description="Transportes Hagemsa" pinColor="green" />
        <Marker coordinate={destination} title="Fin" description="Cementerio La Apacheta" pinColor="red" />
        <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={2} />
      </MapView>

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={[styles.boton, styles.primerBoton]} onPress={handleRutaIdaPress}>
          <Text style={styles.textoBoton}>RUTA IDA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, styles.segundoBoton]} onPress={handleRutaVueltaPress}>
          <Text style={styles.textoBoton}>RUTA VUELTA</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={rutaIdaModalVisible}
        onRequestClose={() => {
          setRutaIdaModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Terminal Megabus AQP S.A.C. (Antes Empresa de Transportes N&C Tiabaya S.A.). – Pampas Nuevas – Av. Víctor A. Belaunde – Ca. S/N – (Alt. Parque Miguel Grau) – Av. Arequipa – Ca. Atahualpa – Ca. Ballón – Av. Panamericana – Av. Arancota – Puente Tingo – Av. Alfonso Ugarte – Av. Miguel Forga – Av. Los Incas – Ca. Zegarra Ballón.</Text>
            <TouchableOpacity onPress={() => setRutaIdaModalVisible(false)}>
                <Text style={styles.cerrarText}>CERRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={rutaVueltaModalVisible}
        onRequestClose={() => {
          setRutaVueltaModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Av. Andrés A. Cáceres – Av. Miguel Forga – Psje. San Isidro – Av. Parra – Av. Alfonso Ugarte – Av. Alfonso Ugarte – Puente Tingo – Av. Arancota – Av. Panamericana – Av. Arequipa – Parque Miguel Grau – Av. Víctor A. Belaunde – Pampas Nuevas – Terminal Megabus AQP S.A.C. (Antes Empresa de Transportes N&C Tiabaya S.A.).</Text>
            <TouchableOpacity onPress={() => setRutaVueltaModalVisible(false)}>
              <Text style={styles.cerrarText}>CERRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    width: '100%',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    fontSize: 16,
    marginRight: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  mapa: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  boton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
  },
  primerBoton: {
    marginRight: 5,
  },
  segundoBoton: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  cerrarText: {
    color: 'red',
    fontWeight: 'bold',
  },
  textoBoton: {
    color: 'white',
  },
});

export default DetalleBus;

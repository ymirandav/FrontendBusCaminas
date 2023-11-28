import React, { useState } from 'react';
import { TouchableOpacity, Modal, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';

const DetalleBus = () => {
  const navigation = useNavigation();

  const origin = {
    latitude: -16.448740049561476,
    longitude:   -71.52117954596845,
  };

  const destination = {
    latitude: -16.40177279988988,
    longitude:   -71.51794772883588
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
    <Text style={styles.title}>COTASPA</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.column}>Horarios</Text>
          <Text style={styles.column}>06:00 AM a 09:00 PM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Inicio</Text>
          <Text style={styles.column}>Tigers Gas</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Fin</Text>
          <Text style={styles.column}>Producto avana de Perú S.A.S.</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Precio</Text>
          <Text style={styles.column}>S/ 1.00</Text>
        </View>
      </View>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: -16.42015368260059, 
          longitude: -71.51970797210375,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker coordinate={origin} title="Inicio" description="Tigers Gas" pinColor="green" />
        <Marker coordinate={destination} title="Fin" description="Producto avana de Perú S.A.S." pinColor="red" />
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
            <Text>AV MARISCAL CASTILLA - AV INDEPENDENCIA - MA SOCABAYA - AV DANIEL ALCIDES CARRION(URB PABLO VI) - AV DANIEL ALCIDES CARRION(URB LOS VILCOS) - AV CEMENTERIO(URB PUERTA VERDE) - AV CEMENTERIO(URB VILLA ELECTRICA) - AV GARCILAZO DE LA VEGA(URB SATELITE) - AV GARCILAZO DE LA VEGA(URB EL PORVENIR) - AV SOCABAYA(URB SAN MARTIN DE SOCABAYA) - CL LA OROYA(URB SAN MARTIN DE SOCABAYA) - CL HUAMACHUCO(URB SAN MARTIN DE SOCABAYA) - AV UNION(URB SAN MARTIN DE SOCABAYA) - CL ZELA(URB CORAZON DE JESUS) - AV CESAR VALLEJO(URB 4 DE OCTUBRE) - AV JOSE MARIA ARGUEDAS(URB 4 DE OCTUBRE) - COMITE 3(URB 4 DE OCTUBRE) - CL JOSE CARLOS MARIATEGUI(URB 4 DE OCTUBRE) - VIA 4 DE OCTUBRE - TERMINAL.</Text>
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
            <Text>TERMINAL - MZ H-12(PJ SAN AGUSTIN) - AV LAS AMERICAS(VI EL GOLF) - CL JOSE GALVEZ(URB 4 DE OCTUBRE) - 4 DE OCTUBRE(URB 4 DE OCTUBRE) - COMITE 3(URB 4 DE OCTUBRE) - CL JOSE CARLOS MARIATEGUI(URB 4 DE OCTUBRE) - AV JOSE MARIA ARGUEDAS(URB 4 DE OCTUBRE) - AV CESAR VALLEJO(URB 4 DE OCTUBRE) - PQ ALTO ALIANZA(URB 4 DE OCTUBRE) - LOCAL SOCIAL CORAZON DE JESUS-MZS. I, C, E(URB CORAZON DE JESUS) - ASOCIACION DE VIVIENDA JORGE CHAVEZ(AS JORGE CHAVEZ) - AV CARACAS(URB VILLA LOS FRANCOS) - AV UNION(URB SAN MARTIN DE SOCABAYA) - CL HUAMACHUCO(URB TASAHUAYO) - CL LA OROYA(URB TASAHUAYO) - CL LA OROYA(URB SAN MARTIN DE SOCABAYA) - AV SOCABAYA(URB SAN MARTIN DE SOCABAYA) - AV GARCILAZO DE LA VEGA(URB EL PORVENIR) - AV GARCILAZO DE LA VEGA(URB 13 DE ENERO) - AV GARCILAZO DE LA VEGA(URB SATELITE) - AV PERU(URB FECIA) - AV DANIEL ALCIDES CARRION(URB PABLO VI) - AV DANIEL ALCIDES CARRION(URB LOS VILCOS) - AV VIRGEN DEL PILAR(URB FRANCISCO MOSTAJO) - AV VENEZUELA(URB IV CENTENARIO) - AV VENEZUELA (VOLTEA A LA DERECHA) - AV DOLORES(URB CABAÑA MARIA) - AV DOLORES (VOLTEA A LA IZQUIERDA) - AV DOLORES(URB ALVAREZ THOMAS) - PR VIRGEN DEL PILAR(URB ALVAREZ THOMAS) - AV VENEZUELA(URB LA NEGRITA) - CL JUAN DE DIOS SALAZAR(URB CONTADORES) - AV INDEPENDENCIA(URB MUNICIPAL) - CL MIGUEL DE CERVANTES(URB LA VICTORIA) - CL REPUBLICA DE CHILE(URB LA NEGRITA) - AV MARISCAL CASTILLA - CL TENIENTE PALACIOS - CL ELIAS AGUIRRE - CL TENIENTE FERRE..</Text>
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
  textoBoton: {
    color: 'white',
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
});

export default DetalleBus;

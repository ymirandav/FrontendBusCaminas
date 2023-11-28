import React, { useState } from 'react';
import { TouchableOpacity, Modal, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';

const DetalleBus = () => {
  const navigation = useNavigation();

  const origin = {
    latitude: -16.386334513350477,
    longitude: -71.57495602146196,
  };

  const destination = {
    latitude: -16.429201404273403,
    longitude: -71.5341734687623,
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
    <Text style={styles.title}>C.O.T.U.M</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.column}>Horarios</Text>
          <Text style={styles.column}>06:00 AM a 10:00 PM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Inicio</Text>
          <Text style={styles.column}>Transportes Hagemsa</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.column}>Fin</Text>
          <Text style={styles.column}>Cementerio La Apacheta</Text>
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
            <Text>TERMINAL AA.HH. ARTEMPA CALLE 8 LT. 20 MZ. B - AV LIMA(AH SEMI RURAL PACHACUTEC) - CL 02 DE MAYO - AV PERU(AH SEMI RURAL PACHACUTEC) - AV MIGUEL GRAU(AH SEMI RURAL PACHACUTEC) - AV LIMA(AH SEMI RURAL PACHACUTEC) - VIA DE EVITAMIENTO - CA VARIANTE DE UCHUMAYO(AH SEMI RURAL PACHACUTEC) - AV JOSE SANTOS ATAHUALPA(AH JOSE SANTOS ATAHUALPA) - PR BUENOS AIRES(AH JOSE SANTOS ATAHUALPA) - JR MANTARO(AH JOSE SANTOS ATAHUALPA) - JR PUNO(AH JOSE SANTOS ATAHUALPA) - CL CONFRATERNIDAD(AH JOSE SANTOS ATAHUALPA) - CL MANUEL GONZALES PRADA(AH MARISCAL CASTILLA) - AV GARCILAZO DE LA VEGA(AH MARISCAL CASTILLA) - CL LIBERTAD(AH MARISCAL CASTILLA) - VILLA SAN JUAN(URB VILLA SAN JUAN) - CL LOS CLAVELES(AH PACHACUTEC ) - AV LIMA(AH SEMI RURAL PACHACUTEC) - CL CHALLAPAMPA(AH 12 DE OCTUBRE) - MZ H, E, F, A(AH 12 DE OCTUBRE) - PJ SAN JOSE(AH CERRITO LOS ALVAREZ) - PR AV. EJERCITO - CL LOS ARCES(URB LOS ARCES) - AV TRINIDAD MORAN(URB LOS ARCES) - J. A. QUIÑONES(AS JOSE ABELARDO QUIÑONES) - CL CHULLO(URB ENTEL) - AV ZAMACOLA(URB LOS CEDROS) - AV EMMEL - AV RICARDO PALMA(URB UMACOLLO) - CL MARIA NIEVES Y BUSTAMANTE(URB UMACOLLO) - PT SAN MARTIN - OV VALLECITO(URB VALLECITO) - AV ANDRES MARTINEZ(URB VALLECITO) - PQ MELGAR(URB MARIA ISABEL) - AV TACNA Y ARICA(URB MARIA ISABEL) - AV SALAVERRY(URB MARIA ISABEL) - MA SOCABAYA - AV DANIEL ALCIDES CARRION(URB PABLO VI) - OV ANDRES AVELINO CACERES - AV LIMA(AH SEMI RURAL PACHACUTEC).</Text>
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
            <Text>OV ANDRES AVELINO CACERES - AV CEMENTERIO(URB VILLA ELECTRICA) - AV ESTADOS UNIDOS(URB SATELITE) - AV HARTLEY - AV PIZARRO - AV PORONGOCHE - CL JOSE CARLOS MARIATEGUI - AV JOHN F. KENNEDY - AV JESUS - AV LIMA - AV MARISCAL CASTILLA - AV MANUEL MUÑOZ NAJAR - AV LA PAZ - CL DON BOSCO - PR AYACUCHO( CERCADO) - CL AYACUCHO( CERCADO) - PT GRAU( CERCADO) - AV EJERCITO - PJ SAN JOSE(AH CERRITO LOS ALVAREZ) - AV CHACHANI(AH CERRITO LOS ALVAREZ) - LAS MALVINAS - CL CHALLAPAMPA(AH 12 DE OCTUBRE) - AV LIMA(AH SEMI RURAL PACHACUTEC) - CL 4 DE FEBRERO(AH PACHACUTEC ) - CL CLAVELES(AH PACHACUTEC ) - VILLA SAN JUAN(URB VILLA SAN JUAN) - CL LIBERTAD(AH MARISCAL CASTILLA) - AV GARCILAZO DE LA VEGA(AH MARISCAL CASTILLA) - CL MANUEL GONZALES PRADA(AH MARISCAL CASTILLA) - CL CONFRATERNIDAD(AH JOSE SANTOS ATAHUALPA) - JR PUNO(AH JOSE SANTOS ATAHUALPA) - JR MANTARO(AH JOSE SANTOS ATAHUALPA) - PR BUENOS AIRES(AH JOSE SANTOS ATAHUALPA) - AV JOSE SANTOS ATAHUALPA(AH JOSE SANTOS ATAHUALPA) - CA VARIANTE DE UCHUMAYO(AH SEMI RURAL PACHACUTEC) - VIA DE EVITAMIENTO - AV LIMA(AH SEMI RURAL PACHACUTEC) - AV MIGUEL GRAU(AH SEMI RURAL PACHACUTEC) - AV PERU(AH SEMI RURAL PACHACUTEC) - CL 02 DE MAYO - AV LIMA(AH SEMI RURAL PACHACUTEC) - TERMINAL AA.HH. ARTEMPA CALLE 8 LT. 20 MZ. B.</Text>
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
  textoBoton: {
    color: 'white',
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

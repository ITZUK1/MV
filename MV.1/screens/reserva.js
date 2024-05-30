import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Modal as NativeModal, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNModal from 'react-native-modal';

const MotoScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMoto, setSelectedMoto] = useState(null);
  const [reservedMoto, setReservedMoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParqueadero, setSelectedParqueadero] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [vehiculoType, setVehiculoType] = useState('Moto'); // Nuevo estado para el tipo de vehículo

  const parqueaderos = [
    { id: 1, latitude: 4.480180, longitude: -74.124700, title: 'Parqueadero Usme 1', description: 'Parqueadero en la zona de Usme' },
    { id: 2, latitude: 4.482810, longitude: -74.126270, title: 'Parqueadero Usme 2', description: 'Parqueadero en la zona de Usme' },
    { id: 3, latitude: 4.484300, longitude: -74.128120, title: 'Parqueadero Usme 3', description: 'Parqueadero en la zona de Usme' },
    { id: 4, latitude: 4.478870, longitude: -74.122490, title: 'Parqueadero Usme 4', description: 'Parqueadero en la zona de Usme' },
  ];

  const vehiculos = [
    {
      nombre: 'Duke',
      descripcion: 'Moto naked de alta velocidad y gran potencia, diseñada para carreras y conducción deportiva.',
      foto: require('./img/duke.webp'),
      placa: 'ABC123',
      matricula: 'DUK123',
      bastidor: 'BAS001',
      color: 'Naranja',
      marca: 'KTM',
      modelo: '2023',
      id_garaje: 'G001',
      fecha_estacionamiento: '2024-05-01',
      id_agencia: 'A001',
      tipo: 'Moto' // Nuevo campo para indicar el tipo de vehículo
    },
    // Añade más vehículos aquí
  ];

  const handleMarkerPress = (parqueadero) => {
    setSelectedParqueadero(parqueadero);
    setModalVisible(true);
  };

  const handleReserva = () => {
    // Lógica para manejar la reserva
    Alert.alert('Reserva creada', 'La reserva ha sido creada satisfactoriamente.');
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>¡Reserva tu nueva aventura!</Text>
      
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Usar proveedor de Google Maps
        initialRegion={{
          latitude: 4.481680,
          longitude: -74.124230,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {parqueaderos.map((parqueadero) => (
          <Marker
            key={parqueadero.id}
            coordinate={{ latitude: parqueadero.latitude, longitude: parqueadero.longitude }}
            title={parqueadero.title}
            description={parqueadero.description}
            onPress={() => handleMarkerPress(parqueadero)}
          />
        ))}
      </MapView>

      <RNModal isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Crear Reserva</Text>
          <TextInput placeholder="Nombre Cliente" style={styles.input} />
          <TextInput placeholder="Matrícula Vehículo" style={styles.input} />
          <TextInput placeholder="ID Agencia" value={selectedParqueadero ? selectedParqueadero.title : ''} style={styles.input} />
          <TextInput placeholder="Fecha Inicio (YYYY-MM-DD)" value={fechaInicio} onChangeText={setFechaInicio} style={styles.input} />
          <TextInput placeholder="Fecha Fin (YYYY-MM-DD)" style={styles.input} />
          <TouchableOpacity style={styles.reserveButton} onPress={handleReserva}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </RNModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#ff9933',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MotoScreen;

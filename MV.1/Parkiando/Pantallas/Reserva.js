import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Button, ImageBackground } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNModal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios';
import styles from '../GlobalStyles/ReservaStyles';

const MotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParqueadero, setSelectedParqueadero] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);  // Añadido para fecha fin
  const [nombreCliente, setNombreCliente] = useState('');
  const [matriculaVehiculo, setMatriculaVehiculo] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Permiso para acceder a la ubicación ha sido denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const parqueaderos = [
    { id: 2, latitude: 4.636194, longitude: -74.098059, title: 'Parqueadero Motos y Carros', description: 'Parqueadero en la zona de Usme' },
    // Agrega los otros parqueaderos aquí
  ];

  const handleMarkerPress = (parqueadero) => {
    setSelectedParqueadero(parqueadero);
    setModalVisible(true);
  };

  const handleReserva = async () => {
    if (!nombreCliente || !matriculaVehiculo || !selectedParqueadero) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevaReserva = {
      id_cliente: nombreCliente,
      matricula_vehiculo: matriculaVehiculo,
      nombre_parking: selectedParqueadero.title,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    try {
      await axios.post('http://192.168.1.7:3000/Reserva', nuevaReserva);  // Ajusta la URL según sea necesario
      Alert.alert('Reserva creada', 'La reserva ha sido creada satisfactoriamente.');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al crear la reserva');
    }
  };

  return (
    <ImageBackground source={require('../../assets/morado.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Reserva tu nueva aventura</Text>

        {userLocation && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Tu ubicación"
              pinColor="blue"
            />
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
        )}

        <RNModal isVisible={modalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crear Reserva</Text>
            <TextInput
              placeholder="Nombre Cliente"
              style={styles.input}
              value={nombreCliente}
              onChangeText={setNombreCliente}
            />
            <TextInput
              placeholder="Matrícula Vehículo"
              style={styles.input}
              value={matriculaVehiculo}
              onChangeText={setMatriculaVehiculo}
            />
            <TextInput
              placeholder="ID Agencia"
              value={selectedParqueadero ? selectedParqueadero.title : ''}
              style={styles.input}
              editable={false}
            />
            <TextInput
              placeholder="Fecha Inicio (YYYY-MM-DD)"
              value={fechaInicio}
              onChangeText={setFechaInicio}
              style={styles.input}
            />
            <TextInput
              placeholder="Fecha Fin (YYYY-MM-DD)"
              value={fechaFin}
              onChangeText={setFechaFin}
              style={styles.input}
            />
            <TouchableOpacity style={styles.reserveButton} onPress={handleReserva}>
              <Text style={styles.reserveButtonText}>Reservar</Text>
            </TouchableOpacity>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </RNModal>
      </ScrollView>
    </ImageBackground>
  );
};

export default MotoScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Button, ImageBackground } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import RNModal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios';
import styles from '../GlobalStyles/ReservaStyles';

const MotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParqueadero, setSelectedParqueadero] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [matriculaVehiculo, setMatriculaVehiculo] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Permiso para acceder a la ubicación ha sido denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const parqueaderos = [
    { id: 2, latitude: 4.636194, longitude: -74.098059, title: 'Parqueadero Motos y Carros', description: 'Parqueadero en la zona de Usme' },
    { id: 4, latitude: 4.478870, longitude: -74.122490, title: 'Parqueadero Usme 4', description: 'Parqueadero en la zona de Usme' },
    { id: 5, latitude: 4.513140687036615, longitude: -74.1152407233761, title: 'Nuevo Parqueadero 1', description: 'Descripción del nuevo parqueadero 1' },
    { id: 6, latitude: 4.509095076672661, longitude: -74.11546468783, title: 'Nuevo Parqueadero 2', description: 'Descripción del nuevo parqueadero 2' },
    { id: 7, latitude: 4.507298208810172, longitude: -74.11419868510754, title: 'Nuevo Parqueadero 3', description: 'Descripción del nuevo parqueadero 3' },
    { id: 8, latitude: 4.497589925191344, longitude: -74.10693771633768, title: 'Nuevo Parqueadero 4', description: 'Descripción del nuevo parqueadero 4' },
    { id: 9, latitude: 4.497934752065181, longitude: -74.10678398652774, title: 'Nuevo Parqueadero 5', description: 'Descripción del nuevo parqueadero 5' },
    { id: 10, latitude: 4.5023781907080185, longitude: -74.1061078501598, title: 'Nuevo Parqueadero 6', description: 'Descripción del nuevo parqueadero 6' },
    { id: 11, latitude: 4.502100101740342, longitude: -74.10692324165689, title: 'Nuevo Parqueadero 7', description: 'Descripción del nuevo parqueadero 7' },
    { id: 12, latitude: 4.508232741083661, longitude: -74.1193445032203, title: 'Nuevo Parqueadero 8', description: 'Descripción del nuevo parqueadero 8' },
    { id: 13, latitude: 4.517025857613381, longitude: -74.12418571348256, title: 'Nuevo Parqueadero 9', description: 'Descripción del nuevo parqueadero 9' },
    { id: 14, latitude: 4.519708973584316, longitude: -74.11688026600258, title: 'Nuevo Parqueadero 10', description: 'Descripción del nuevo parqueadero 10' },
    { id: 15, latitude: 4.519969587859241, longitude: -74.11863316270434, title: 'Nuevo Parqueadero 11', description: 'Descripción del nuevo parqueadero 11' },
    { id: 16, latitude: 4.52197345324146, longitude: -74.119312257305, title: 'Nuevo Parqueadero 12', description: 'Descripción del nuevo parqueadero 12' },
    { id: 17, latitude: 4.520484094404108, longitude: -74.12352264305774, title: 'Nuevo Parqueadero 13', description: 'Descripción del nuevo parqueadero 13' },
    { id: 18, latitude: 4.521729740186653, longitude: -74.12403875485968, title: 'Nuevo Parqueadero 14', description: 'Descripción del nuevo parqueadero 14' },
    { id: 19, latitude: 4.521372381298283, longitude: -74.12404925014094, title: 'Nuevo Parqueadero 15', description: 'Descripción del nuevo parqueadero 15' },
    { id: 20, latitude: 4.523360815140545, longitude: -74.11985315114079, title: 'Nuevo Parqueadero 16', description: 'Descripción del nuevo parqueadero 16' },
    { id: 21, latitude: 4.521843244292218, longitude: -74.11945693308323, title: 'Nuevo Parqueadero 17', description: 'Descripción del nuevo parqueadero 17' },
];

  const handleMarkerPress = (parqueadero) => {
    setSelectedParqueadero(parqueadero);
    setModalVisible(true);
    fetchRoute(parqueadero);
  };

  const fetchRoute = async (parqueadero) => {
    if (!userLocation) return;

    const start = `${userLocation.longitude},${userLocation.latitude}`;
    const end = `${parqueadero.longitude},${parqueadero.latitude}`;

    try {
      const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`);
      const coords = response.data.routes[0].geometry.coordinates.map(coord => ({
        latitude: coord[1],
        longitude: coord[0]
      }));
      setRouteCoords(coords);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
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

            {routeCoords.length > 0 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor="hotpink"
                strokeWidth={3}
              />
            )}
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

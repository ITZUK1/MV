import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../GlobalStyles/HomeStyles';

const parqueaderos = [
  { 
    imagen: require('../../assets/parqueadero1.jpg'),
    descripcion: 'Parqueadero carros y motos - Ubicado en la Calle 76sur 1262 barrio Andrea. Teléfono: +573115510800. Administrador: Adriana gilen  Horario: Lunes a domingo de 5:30 am a 9:30 PM.'
  },
  { 
    imagen: require('../../assets/parqueadero2.jpg'),
    descripcion: 'Parqueadero junior  - Ubicado en la calle 84 sur no 14-55. Teléfono: +573006929521. Horario: 24/7'
  },
];

const ubicacionesParqueaderos = [
  { latitude: 4.480180, longitude: -74.124700, title: 'Parqueadero Usme 1', description: 'Parqueadero en la Calle 45 #5D Este.' },
  { latitude: 4.482810, longitude: -74.126270, title: 'Parqueadero Usme 2', description: 'Parqueadero en la Calle 50 #7E Este.' },
  { latitude: 4.484300, longitude: -74.128120, title: 'Parqueadero Usme 3', description: 'Parqueadero en la Calle 55 #10F Este.' },
  { latitude: 4.478870, longitude: -74.122490, title: 'Parqueadero Usme 4', description: 'Parqueadero en la Calle 40 #3G Este.' },
];

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido a PARKI ANDO</Text>
        <Text style={styles.intro}>
          Gestiona tus reservas de parqueaderos en la zona de Usme, Bogotá, con nuestra aplicación facil y a tu mano 
        </Text>
      </View>
      
      <Text style={styles.sectionTitle}>Nuestra Empresa</Text>
      <Text style={styles.text}>
        Parki Ando es líder en la gestión de reservas de parqueaderos en Usme. Ofrecemos una variedad de opciones de parqueo seguras y accesibles, gestionadas por personal especializado.
      </Text>

      <Text style={styles.sectionTitle}>Información de Parqueaderos</Text>
      {parqueaderos.map((parqueadero, index) => (
        <View key={index} style={styles.card}>
          <Image source={parqueadero.imagen} style={styles.cardImage} />
          <Text style={styles.cardDescription}>{parqueadero.descripcion}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Ubicación</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Mi Ubicación"
            description="Estás aquí"
          />
          {ubicacionesParqueaderos.map((parqueadero, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: parqueadero.latitude, longitude: parqueadero.longitude }}
              title={parqueadero.title}
              description={parqueadero.description}
            />
          ))}
        </MapView>
      )}
    </ScrollView>
  );
};

export default Home; 
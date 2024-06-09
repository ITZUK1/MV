import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const parqueaderos = [
  { 
    imagen: require('./img/bomber.jpg'),
    descripcion: 'Parqueadero Usmes 1 - Ubicado en la Calle 45 #5D Este. Teléfono: +571234567890. Horario: Lunes a Jueves de 4 PM a 6 PM.'
  },
  { 
    imagen: require('./img/bomber.jpg'),
    descripcion: 'Parqueadero Usme 2 - Ubicado en la Calle 50 #7E Este. Teléfono: +571098765432. Horario: Viernes a Domingo de 2 PM a 5 PM.'
  },
  { 
    imagen: require('./img/bomber.jpg'),
    descripcion: 'Parqueadero Usme 3 - Ubicado en la Calle 55 #10F Este. Teléfono: +571112233445. Horario: Lunes a Viernes de 8 AM a 12 PM.'
  },
];

const ubicacionesParqueaderos = [
  { latitude: 4.480180, longitude: -74.124700, title: 'Parqueadero Usme 1', description: 'Parqueadero en la Calle 45 #5D Este.' },
  { latitude: 4.482810, longitude: -74.126270, title: 'Parqueadero Usme 2', description: 'Parqueadero en la Calle 50 #7E Este.' },
  { latitude: 4.484300, longitude: -74.128120, title: 'Parqueadero Usme 3', description: 'Parqueadero en la Calle 55 #10F Este.' },
  { latitude: 4.478870, longitude: -74.122490, title: 'Parqueadero Usme 4', description: 'Parqueadero en la Calle 40 #3G Este.' },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido a PARKI ANDO</Text>
        <Text style={styles.intro}>
          Gestiona tus reservas de parqueaderos en la zona de Usme, Bogotá, con nuestra aplicación.
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 4.481680,  // Coordenadas centrales de Usme, Bogotá
          longitude: -74.124230,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {ubicacionesParqueaderos.map((parqueadero, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: parqueadero.latitude, longitude: parqueadero.longitude }}
            title={parqueadero.title}
            description={parqueadero.description}
          />
        ))}
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default Home;

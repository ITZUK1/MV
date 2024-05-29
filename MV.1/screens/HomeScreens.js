import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const motos = [
  { 
    imagen: require('./img/duke.webp'),
    descripcion: 'La KTM Duke 200 es una motocicleta de estilo naked, reconocida por su agilidad, rendimiento y diseño deportivo.'
  },
  { 
    imagen: require('./img/enduro.jpg'),
    descripcion: 'La KTM Enduro 690 es una motocicleta diseñada específicamente para aventuras off-road y enduro. Es parte de la línea de motocicletas off-road de KTM, conocida por su rendimiento excepcional en terrenos difíciles y su durabilidad '
  },
  { 
    imagen: require('./img/rodo-1.png'),
    descripcion: 'RODO 1   CALLE 45 #5D ESTE  TELEFONO: +568128371389  PERSONA ENCARGADA:JAVIER DIAS DE ATENCION:DE LUNEAS A JUEVES 4 PM A 6 PM '
  },
];

const parqueaderos = [
  { latitude: 4.480180, longitude: -74.124700, title: 'Parqueadero Usme 1', description: 'Parqueadero en la zona de Usme' },
  { latitude: 4.482810, longitude: -74.126270, title: 'Parqueadero Usme 2', description: 'Parqueadero en la zona de Usme' },
  { latitude: 4.484300, longitude: -74.128120, title: 'Parqueadero Usme 3', description: 'Parqueadero en la zona de Usme' },
  { latitude: 4.478870, longitude: -74.122490, title: 'Parqueadero Usme 4', description: 'Parqueadero en la zona de Usme' },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido a MotoRent</Text>
        <Text style={styles.intro}>
          Gestiona tus reservas de alquiler de motocicletas de competición con nuestra aplicación.
        </Text>
      </View>
      
      <Text style={styles.sectionTitle}>Nuestra Empresa</Text>
      <Text style={styles.text}>
        MotoRent es líder en el alquiler de motocicletas de competición. Ofrecemos una amplia gama de motos de alta gama, 
        almacenadas en garajes propios y gestionadas por agencias especializadas.
      </Text>

      <Text style={styles.sectionTitle}>Información de Motos</Text>
      {motos.map((moto, index) => (
        <View key={index} style={styles.card}>
          <Image source={moto.imagen} style={styles.cardImage} />
          <Text style={styles.cardDescription}>{moto.descripcion}</Text>
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
        {parqueaderos.map((parqueadero, index) => (
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

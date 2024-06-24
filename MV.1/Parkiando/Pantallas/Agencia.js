import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import { Rating } from 'react-native-ratings';

const windowWidth = Dimensions.get('window').width;

const parqueaderos = [
  { 
    imagen: require('../../assets/parqueadero1.jpg'),
    nombre: 'Parqueadero carros y motos'
  },
  { 
    imagen: require('../../assets/parqueadero2.jpg'),
    nombre: 'Parqueadero junior'
  },
  { 
    imagen: require('../../assets/parqueadero1.jpg'),
    nombre: 'Parqueadero carros y motos'
  },
  { 
    imagen: require('../../assets/parqueadero2.jpg'),
    nombre: 'Parqueadero junior'
  },
];

const ParqueaderosScreen = () => {
  const [votaciones, setVotaciones] = useState({});
  const [opinionVisible, setOpinionVisible] = useState(false);
  const [selectedParqueadero, setSelectedParqueadero] = useState(null);
  const [opinion, setOpinion] = useState('');
  const [rating, setRating] = useState(0);

  const handleOpinion = () => {
    if (selectedParqueadero !== null) {
      setVotaciones(prevVotaciones => {
        const newVotaciones = { ...prevVotaciones };
        newVotaciones[selectedParqueadero.nombre] = (newVotaciones[selectedParqueadero.nombre] || 0) + 1;
        return newVotaciones;
      });
      console.log(`Opinión sobre ${selectedParqueadero.nombre}: ${opinion} - Calificación: ${rating}`);
      setOpinionVisible(false);
      setOpinion('');
      setRating(0);
    }
  };

  const renderParqueadero = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedParqueadero(item);
      setOpinionVisible(true);
    }}>
      <View style={styles.parqueaderoItem}>
        <Text style={styles.nombreParqueadero}>{item.nombre}</Text>
        <Text style={styles.votosText}>Votos: {votaciones[item.nombre] || 0}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={parqueaderos}
        renderItem={renderParqueadero}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <Modal
        visible={opinionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpinionVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <View style={styles.opinionModal}>
            <Image source={selectedParqueadero?.imagen} style={styles.modalImagen} />
            <Text style={styles.opinionModalTitle}>{selectedParqueadero?.nombre}</Text>
            <TextInput
              style={styles.opinionInput}
              placeholder="Escribe tu opinión aquí..."
              value={opinion}
              onChangeText={text => setOpinion(text)}
              multiline={true}
            />
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={rating}
              imageSize={30}
              onFinishRating={value => setRating(value)}
              style={{ paddingVertical: 10 }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setOpinionVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar Opinión</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.opinionButton} onPress={handleOpinion}>
                <Text style={styles.opinionButtonText}>Enviar Opinión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  flatListContent: {
    alignItems: 'center',
  },
  parqueaderoItem: {
    width: windowWidth - 20, // Ancho del elemento con margen
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  nombreParqueadero: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  votosText: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  opinionModal: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalImagen: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  opinionModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  opinionInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  opinionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  opinionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ParqueaderosScreen;

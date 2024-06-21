import { StyleSheet } from "react-native";
const HomeStyles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    header: {
      backgroundColor: '#6A1B9A', // Morado oscuro
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
      borderBottomColor: '#6A1B9A', // Morado oscuro
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
  
  
  export default HomeStyles;
  
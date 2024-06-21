import { StyleSheet } from "react-native";
const ReservaStyles = StyleSheet.create({

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#fff',
      textAlign: 'center',
    },
    map: {
      width: '100%',
      height: 500,
      borderRadius: 10,
      marginVertical: 20,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
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
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  export default ReservaStyles;
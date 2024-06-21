import { StyleSheet } from "react-native";
const UsuarioStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6A1B9A', // Morado oscuro
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 5,  // Adds shadow for Android
        shadowColor: '#000',  // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },  // Adds shadow for iOS
        shadowOpacity: 0.2,  // Adds shadow for iOS
        shadowRadius: 2,  // Adds shadow for iOS
    },
    cliente: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,  // Adds shadow for Android
        shadowColor: '#000',  // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },  // Adds shadow for iOS
        shadowOpacity: 0.1,  // Adds shadow for iOS
        shadowRadius: 1,  // Adds shadow for iOS
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    perfilLabel: {
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    modalHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6A1B9A', // Morado oscuro
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#6A1B9A', // Morado oscuro
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default UsuarioStyles;
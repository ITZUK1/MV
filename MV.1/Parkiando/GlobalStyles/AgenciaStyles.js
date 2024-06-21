import { StyleSheet } from "react-native";
const AgenciaStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f5',
        paddingHorizontal: 20,
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
    navButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    navButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#6A1B9A', // Cambiado a morado oscuro
    },
    activeNavButton: {
        backgroundColor: '#5A1A88', // Cambiado a morado oscuro más oscuro
    },
    navButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#ecf0f1',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: '#6A1B9A', // Cambiado a morado oscuro
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sedeInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    noSedeText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    sedeItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    sedeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sedeDetails: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});

export default AgenciaStyles;
import { StyleSheet } from "react-native";
const LoginStyles = StyleSheet.create({

    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loginHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6A1B9A',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 5,  // Sombra para Android
        shadowColor: '#000',  // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
        shadowOpacity: 0.2,  // Sombra para iOS
        shadowRadius: 2,  // Sombra para iOS
    },
    button: {
        backgroundColor: '#6A1B9A',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginStyles;
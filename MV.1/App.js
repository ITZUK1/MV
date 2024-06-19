import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registering, setRegistering] = useState(false); // Estado para el modo de registro
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');

    const handleLogin = () => {
        // Lógica de autenticación aquí
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.1.7:3000/cliente', {
                dni,
                nombre,
                primer_apellido: primerApellido,
                segundo_apellido: segundoApellido,
                calle,
                numero,
                id_ciudad: ciudad,
                contraseña: password,
            });
            console.log('Registro exitoso:', response.data);
            alert('Cliente registrado correctamente');
            setRegistering(false); // Cambiar al modo de inicio de sesión después del registro
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            alert('Error al registrar cliente');
        }
    };

    const toggleRegister = () => {
        setRegistering(!registering);
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginHeading}>{registering ? 'Registro' : 'Inicio de Sesión'}</Text>
            
            {!registering && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </>
            )}

            {registering && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="DNI"
                        value={dni}
                        onChangeText={setDni}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Primer Apellido"
                        value={primerApellido}
                        onChangeText={setPrimerApellido}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Segundo Apellido"
                        value={segundoApellido}
                        onChangeText={setSegundoApellido}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Calle"
                        value={calle}
                        onChangeText={setCalle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número"
                        value={numero}
                        onChangeText={setNumero}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        value={telefono}
                        onChangeText={setTelefono}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ciudad"
                        value={ciudad}
                        onChangeText={setCiudad}
                    />
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={registering ? handleRegister : handleLogin}>
                <Text style={styles.buttonText}>{registering ? 'Registrar' : 'Iniciar Sesión'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleRegister}>
                <Text style={{ color: '#6A1B9A' }}>
                    {registering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default LoginScreen;

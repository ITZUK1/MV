import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from '../GlobalStyles/LoginStyles';

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
    const [ciudad, setCiudad] = useState('1'); // Asignar el ID de Bogotá por defecto

    const handleLogin = async () => {
        try {
            console.log('Datos enviados para el inicio de sesión:', { username, password });
            const response = await axios.post('http://192.168.1.7:3000/login', {
                username,
                password,
            });

            console.log('Inicio de sesión exitoso:', response.data);
            alert('Inicio de sesión exitoso');
            if (onLogin) {
                onLogin(response.data.cliente); // Llama al callback `onLogin` con los datos del cliente
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
            alert('Error al iniciar sesión');
        }
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
                contraseña: password, // Usamos el estado de 'password' para el campo de contraseña
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
                        placeholder="Cedula"
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
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {/* Input de la ciudad deshabilitado, con valor predeterminado de Bogotá */}
                    <TextInput
                        style={styles.input}
                        placeholder="Ciudad"
                        value="Bogotá"
                        editable={false}
                        selectTextOnFocus={false}
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

export default LoginScreen;
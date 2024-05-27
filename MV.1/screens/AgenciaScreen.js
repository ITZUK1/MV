import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

const serverUrl = 'http://192.168.224.119:3000'; // Tu IP local

const AgenciaScreen = () => {
    const [selectedSede, setSelectedSede] = useState(null);
    const [sedes, setSedes] = useState([]);
    const [form, setForm] = useState({ nombre: '', calle: '', numero: '', poblacion: '' });
    const [view, setView] = useState('list'); // 'list' o 'form'

    useEffect(() => {
        fetchSedes();
    }, []);

    const fetchSedes = async () => {
        try {
            const response = await axios.get(`${serverUrl}/agencias`);
            setSedes(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo obtener las agencias');
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post(`${serverUrl}/agencia`, form);
            Alert.alert('Éxito', 'Agencia creada correctamente');
            setForm({ nombre: '', calle: '', numero: '', poblacion: '' });
            fetchSedes();
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la agencia');
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedSede) return;

        try {
            await axios.put(`${serverUrl}/agencia/${selectedSede.id_agencia}`, form);
            Alert.alert('Éxito', 'Agencia actualizada correctamente');
            setSelectedSede(null);
            setForm({ nombre: '', calle: '', numero: '', poblacion: '' });
            fetchSedes();
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la agencia');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!selectedSede) return;

        try {
            await axios.delete(`${serverUrl}/agencia/${selectedSede.id_agencia}`);
            Alert.alert('Éxito', 'Agencia eliminada correctamente');
            setSelectedSede(null);
            fetchSedes();
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la agencia');
            console.error(error);
        }
    };

    const renderForm = () => (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={form.nombre}
                onChangeText={value => setForm({ ...form, nombre: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Calle"
                value={form.calle}
                onChangeText={value => setForm({ ...form, calle: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Número"
                value={form.numero}
                onChangeText={value => setForm({ ...form, numero: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Población"
                value={form.poblacion}
                onChangeText={value => setForm({ ...form, poblacion: value })}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={selectedSede ? handleUpdate : handleCreate}>
                    <Text style={styles.buttonText}>{selectedSede ? 'Actualizar' : 'Crear'}</Text>
                </TouchableOpacity>
                {selectedSede && (
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const renderList = () => (
        <FlatList
            data={sedes}
            keyExtractor={(item) => item.id_agencia.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                    setSelectedSede(item);
                    setForm(item);
                    setView('form');
                }}>
                    <View style={styles.sedeItem}>
                        <Text style={styles.sedeName}>{item.nombre}</Text>
                    </View>
                </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noSedeText}>No se ha seleccionado ninguna Agencia</Text>}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>SEDES</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, view === 'form' && styles.activeButton]} onPress={() => setView('form')}>
                    <Text style={styles.buttonText}>Registrar Agencia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, view === 'list' && styles.activeButton]} onPress={() => setView('list')}>
                    <Text style={styles.buttonText}>Ver Agencias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={fetchSedes}>
                    <Text style={styles.buttonText}>Actualizar Lista</Text>
                </TouchableOpacity>
            </View>
            {view === 'form' ? renderForm() : renderList()}
            {selectedSede && view === 'form' && (
                <View style={styles.sedeInfoContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.text}>{selectedSede.nombre}</Text>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.text}>{selectedSede.calle}</Text>
                    <Text style={styles.label}>Número:</Text>
                    <Text style={styles.text}>{selectedSede.numero}</Text>
                    <Text style={styles.label}>Población:</Text>
                    <Text style={styles.text}>{selectedSede.poblacion}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#007BFF',
    },
    confirmButton: {
        backgroundColor: '#007BFF',
    },
    activeButton: {
        backgroundColor: '#0056b3',
    },
    deleteButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sedeInfoContainer: {
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    noSedeText: {
        fontSize: 18,
        color: '#666',
    },
    sedeItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sedeName: {
        fontSize: 16,
        color: '#333',
    },
});

export default AgenciaScreen;

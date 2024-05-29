import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';

const App = () => {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({
        dni: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        calle: '',
        numero: '',
        id_ciudad: '',
        telefono: '',
    });
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const serverUrl = 'http://192.168.137.1:3000';

    const fetchClientes = async () => {
        try {
            const response = await axios.get(`${serverUrl}/clientes`);
            setClientes(response.data);
        } catch (error) {
            console.error('Network Error:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            if (editing) {
                await axios.put(`${serverUrl}/cliente/${selectedId}`, form);
                Alert.alert('Éxito', 'Cliente actualizado correctamente.');
            } else {
                await axios.post(`${serverUrl}/cliente`, form);
                Alert.alert('Éxito', 'Cliente guardado correctamente.');
            }
            setForm({
                dni: '',
                nombre: '',
                primer_apellido: '',
                segundo_apellido: '',
                calle: '',
                numero: '',
                id_ciudad: '',
                telefono: '',
            });
            setEditing(false);
            setSelectedId(null);
            setModalVisible(false);
            fetchClientes();
        } catch (error) {
            console.error('Network Error:', error);
            Alert.alert('Error', 'Hubo un error al guardar los datos.');
        }
    };

    const handleEdit = (cliente) => {
        setForm(cliente);
        setEditing(true);
        setSelectedId(cliente.id_cliente);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${serverUrl}/cliente/${id}`);
            fetchClientes();
            Alert.alert('Éxito', 'Cliente eliminado correctamente.');
        } catch (error) {
            console.error('Network Error:', error);
            Alert.alert('Error', 'Hubo un error al eliminar el cliente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>REGISTRO</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setForm({
                        dni: '',
                        nombre: '',
                        primer_apellido: '',
                        segundo_apellido: '',
                        calle: '',
                        numero: '',
                        id_ciudad: '',
                        telefono: '',
                    });
                    setEditing(false);
                    setModalVisible(true);
                }}
            >
                <Text style={styles.addButtonText}>Añadir Cliente</Text>
            </TouchableOpacity>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id_cliente.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cliente}>
                        <Text>{item.nombre} {item.primer_apellido} {item.segundo_apellido}</Text>
                        <Text>{item.dni}</Text>
                        <Text>{item.calle}, {item.numero}</Text>
                        <Text>{item.telefono}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Editar" onPress={() => handleEdit(item)} />
                            <Button title="Eliminar" onPress={() => handleDelete(item.id_cliente)} />
                        </View>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>{editing ? "Editar Cliente" : "Añadir Cliente"}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DNI"
                            value={form.dni}
                            onChangeText={(text) => handleChange('dni', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={form.nombre}
                            onChangeText={(text) => handleChange('nombre', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Primer Apellido"
                            value={form.primer_apellido}
                            onChangeText={(text) => handleChange('primer_apellido', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Segundo Apellido"
                            value={form.segundo_apellido}
                            onChangeText={(text) => handleChange('segundo_apellido', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Calle"
                            value={form.calle}
                            onChangeText={(text) => handleChange('calle', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Número"
                            value={form.numero}
                            onChangeText={(text) => handleChange('numero', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="ID Ciudad"
                            value={form.id_ciudad}
                            onChangeText={(text) => handleChange('id_ciudad', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={form.telefono}
                            onChangeText={(text) => handleChange('telefono', text)}
                        />
                        <Button
                            title={editing ? "Actualizar Cliente" : "Guardar Cliente"}
                            onPress={handleSave}
                        />
                        <Button
                            title="Cancelar"
                            color="red"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
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
    },
});

export default App;

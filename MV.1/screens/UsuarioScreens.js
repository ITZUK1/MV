import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useClientes } from '../screens/logic/useClientes';

const App = () => {
    const {
        clientes,
        form,
        editing,
        modalVisible,
        setModalVisible,
        handleChange,
        handleSave,
        handleEdit,
        handleDelete,
        setForm,
        setEditing,
    } = useClientes();

    const [perfilVisible, setPerfilVisible] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);

    const handleSaveCliente = () => {
        handleSave();
        setModalVisible(false);
        setPerfilVisible(true);
        setSelectedCliente(form);
    };

    const handleViewProfile = (cliente) => {
        setSelectedCliente(cliente);
        setPerfilVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>PERFIL</Text>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id_cliente.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cliente}>
                        <Text>{item.nombre} {item.primer_apellido} {item.segundo_apellido}</Text>
                        <Text>{item.dni}</Text>
                        <Text>{item.calle}, {item.numero}</Text>
                        <Text>{'*'.repeat(item.contraseña.length)}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleViewProfile(item)}
                            >
                                <Text style={styles.buttonText}>Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleEdit(item)}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDelete(item.id_cliente)}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={perfilVisible}
                onRequestClose={() => {
                    setPerfilVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Perfil del Cliente</Text>
                        {selectedCliente && (
                            <>
                                <Text><Text style={styles.perfilLabel}>Nombre:</Text> {selectedCliente.nombre} {selectedCliente.primer_apellido} {selectedCliente.segundo_apellido}</Text>
                                <Text><Text style={styles.perfilLabel}>Cédula:</Text> {selectedCliente.dni}</Text>
                                <Text><Text style={styles.perfilLabel}>Dirección:</Text> {selectedCliente.calle}, {selectedCliente.numero}</Text>
                                <Text><Text style={styles.perfilLabel}>Contraseña:</Text> {'*'.repeat(selectedCliente.contraseña.length)}</Text>
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setPerfilVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cerrar Perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                            placeholder="Cédula"
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
                        <Picker
                            selectedValue={form.id_ciudad}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleChange('id_ciudad', itemValue)}
                        >
                            <Picker.Item label="Seleccione una ciudad" value="" />
                            <Picker.Item label="Bogotá" value="1" />
                            <Picker.Item label="Cali" value="2" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            value={form.contraseña}
                            onChangeText={(text) => handleChange('contraseña', text)}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#6A1B9A' }]} // Morado oscuro
                            onPress={handleSaveCliente}
                        >
                            <Text style={styles.buttonText}>{editing ? "Actualizar Cliente" : "Guardar Cliente"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: 'red' }]} // Color rojo para cancelar
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
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

export default App;

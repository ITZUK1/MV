import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useAgencias } from '../screens/logic/useAgencias';

const AgenciaScreen = () => {
    const {
        selectedSede,
        setSelectedSede,
        sedes,
        form,
        setForm,
        view,
        setView,
        fetchSedes,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useAgencias();

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
                        <Text style={styles.sedeDetails}>{item.calle}, {item.numero}, {item.poblacion}</Text>
                    </View>
                </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noSedeText}>No hay agencias registradas</Text>}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sedes</Text>
            <View style={styles.navButtonContainer}>
                <TouchableOpacity style={[styles.navButton, view === 'form' && styles.activeNavButton]} onPress={() => setView('form')}>
                    <Text style={styles.navButtonText}>Registrar Agencia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton, view === 'list' && styles.activeNavButton]} onPress={() => setView('list')}>
                    <Text style={styles.navButtonText}>Ver Agencias</Text>
                </TouchableOpacity>
            </View>
            {view === 'form' ? renderForm() : renderList()}
            {selectedSede && view === 'form' && (
                <View style={styles.sedeInfoContainer}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoText}>{selectedSede.nombre}</Text>
                    <Text style={styles.infoLabel}>Dirección:</Text>
                    <Text style={styles.infoText}>{selectedSede.calle}</Text>
                    <Text style={styles.infoLabel}>Número:</Text>
                    <Text style={styles.infoText}>{selectedSede.numero}</Text>
                    <Text style={styles.infoLabel}>Población:</Text>
                    <Text style={styles.infoText}>{selectedSede.poblacion}</Text>
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

export default AgenciaScreen;

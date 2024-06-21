import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useAgencias } from '../Logica/UseAgencias';
import styles from '../GlobalStyles/AgenciaStyles';

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

export default AgenciaScreen; 
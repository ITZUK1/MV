import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const serverUrl = 'http://192.168.1.6:3000'; // Tu IP local

export const useAgencias = () => {
    const [selectedSede, setSelectedSede] = useState(null);
    const [sedes, setSedes] = useState([]);
    const [form, setForm] = useState({ nombre: '', calle: '', numero: '', poblacion: '' });
    const [view, setView] = useState('list'); // 'list' o 'form'

    useEffect(() => {
        fetchSedes();
    }, []);

    const fetchSedes = async () => {
        try {
            const response = await axios.get(`${serverUrl}/agencia`);
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
            setView('list');
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
            setView('list');
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
            setView('list');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la agencia');
            console.error(error);
        }
    };

    return {
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
    };
};

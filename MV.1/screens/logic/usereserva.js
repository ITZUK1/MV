import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const serverUrl = 'http://192.168.1.7:3000'; // Tu IP local

export const useReservas = () => {
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [form, setForm] = useState({ id_cliente: '', matricula_vehiculo: '', nombre_parking: '', fecha_inicio: '', fecha_fin: '', latitude: null, longitude: null });
    const [view, setView] = useState('list'); // 'list' o 'form'

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const response = await axios.get(`${serverUrl}/reserva`);
            setReservas(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo obtener las reservas');
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post(`${serverUrl}/reserva`, form);
            Alert.alert('Éxito', 'Reserva creada correctamente');
            setForm({ id_cliente: '', matricula_vehiculo: '', nombre_parking: '', fecha_inicio: '', fecha_fin: '', latitude: null, longitude: null });
            fetchReservas();
            setView('list');
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la reserva');
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedReserva) return;

        try {
            await axios.put(`${serverUrl}/reserva/${selectedReserva.id_reserva}`, form);
            Alert.alert('Éxito', 'Reserva actualizada correctamente');
            setSelectedReserva(null);
            setForm({ id_cliente: '', matricula_vehiculo: '', nombre_parking: '', fecha_inicio: '', fecha_fin: '', latitude: null, longitude: null });
            fetchReservas();
            setView('list');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la reserva');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!selectedReserva) return;

        try {
            await axios.delete(`${serverUrl}/reserva/${selectedReserva.id_reserva}`);
            Alert.alert('Éxito', 'Reserva eliminada correctamente');
            setSelectedReserva(null);
            fetchReservas();
            setView('list');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la reserva');
            console.error(error);
        }
    };

    return {
        selectedReserva,
        setSelectedReserva,
        reservas,
        form,
        setForm,
        view,
        setView,
        fetchReservas,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};

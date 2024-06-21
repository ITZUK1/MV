import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const serverUrl = 'http://192.168.1.7:3000';

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({
        dni: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        calle: '',
        numero: '',
        id_ciudad: '',
        contraseña: '',
    });
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchClientes = async () => {
        try {
            const response = await axios.get(`${serverUrl}/cliente`);
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
                contraseña: '',
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

    return {
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
    };
};

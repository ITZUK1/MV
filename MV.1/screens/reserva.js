import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';

const MotoScreen = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedMoto, setSelectedMoto] = useState(null);
    const [reservedMoto, setReservedMoto] = useState(null);

    const motos = [
        {
            nombre: 'Duke',
            descripcion: 'Moto naked de alta velocidad y gran potencia, diseñada para carreras y conducción deportiva.',
            foto: require('./img/duke.webp'),
            placa: 'ABC123',
            matricula: 'DUK123',
            bastidor: 'BAS001',
            color: 'Naranja',
            marca: 'KTM',
            modelo: '2023',
            id_garaje: 'G001',
            fecha_estacionamiento: '2024-05-01',
            id_agencia: 'A001'
        },
        {
            nombre: 'Scooter',
            descripcion: 'Moto ligera y ágil, ideal para desplazamientos urbanos y cortas distancias.',
            foto: require('./img/scooter.jpg'),
            placa: 'XYZ456',
            matricula: 'SCO456',
            bastidor: 'BAS002',
            color: 'Blanco',
            marca: 'Honda',
            modelo: '2022',
            id_garaje: 'G002',
            fecha_estacionamiento: '2024-04-15',
            id_agencia: 'A002'
        },
        {
            nombre: 'Motocicleta',
            descripcion: 'Moto sin carenado, con un estilo más agresivo y una posición de conducción erguida.',
            foto: require('./img/motocicleta.jpg'),
            placa: 'DEF789',
            matricula: 'MOT789',
            bastidor: 'BAS003',
            color: 'Negro',
            marca: 'Yamaha',
            modelo: '2021',
            id_garaje: 'G003',
            fecha_estacionamiento: '2024-03-20',
            id_agencia: 'A003'
        },
        {
            nombre: 'Enduro',
            descripcion: 'Moto diseñada para todo tipo de terrenos, desde carreteras asfaltadas hasta caminos off-road.',
            foto: require('./img/enduro.jpg'),
            placa: 'GHI012',
            matricula: 'END012',
            bastidor: 'BAS004',
            color: 'Verde',
            marca: 'Kawasaki',
            modelo: '2020',
            id_garaje: 'G004',
            fecha_estacionamiento: '2024-02-10',
            id_agencia: 'A004'
        },
        {
            nombre: 'Supermoto',
            descripcion: 'Moto versátil que combina características de motocross y motos de carretera, ideal para conducción mixta.',
            foto: require('./img/supermoto.jpg'),
            placa: 'JKL345',
            matricula: 'SUP345',
            bastidor: 'BAS005',
            color: 'Rojo',
            marca: 'Suzuki',
            modelo: '2019',
            id_garaje: 'G005',
            fecha_estacionamiento: '2024-01-30',
            id_agencia: 'A005'
        },
        {
            nombre: 'Deportiva',
            descripcion: 'Moto deportiva de alto rendimiento, diseñada para circuitos y conducción agresiva.',
            foto: require('./img/deportiva.webp'),
            placa: 'MNO678',
            matricula: 'DEP678',
            bastidor: 'BAS006',
            color: 'Azul',
            marca: 'BMW',
            modelo: '2018',
            id_garaje: 'G006',
            fecha_estacionamiento: '2024-01-15',
            id_agencia: 'A006'
        },
        {
            nombre: 'NKD125',
            descripcion: 'Moto naked versátil y económica, perfecta para uso diario y viajes cortos.',
            foto: require('./img/img-1.jpeg'),
            placa: 'PQR901',
            matricula: 'NKD901',
            bastidor: 'BAS007',
            color: 'Amarillo',
            marca: 'Bajaj',
            modelo: '2017',
            id_garaje: 'G007',
            fecha_estacionamiento: '2023-12-20',
            id_agencia: 'A007'
        },
        {
            nombre: 'Bomber 150',
            descripcion: 'Moto estilo cruiser con un diseño clásico y cómodo, ideal para paseos largos.',
            foto: require('./img/bomber.jpg'),
            placa: 'STU234',
            matricula: 'BOM234',
            bastidor: 'BAS008',
            color: 'Gris',
            marca: 'Harley-Davidson',
            modelo: '2016',
            id_garaje: 'G008',
            fecha_estacionamiento: '2023-11-25',
            id_agencia: 'A008'
        },
        {
            nombre: 'S1000RR',
            descripcion: 'Moto deportiva de altas prestaciones, equipada con tecnología de vanguardia para competición.',
            foto: require('./img/s1000rr.webp'),
            placa: 'VWX567',
            matricula: 'S100567',
            bastidor: 'BAS009',
            color: 'Negro',
            marca: 'BMW',
            modelo: '2015',
            id_garaje: 'G009',
            fecha_estacionamiento: '2023-10-30',
            id_agencia: 'A009'
        }
    ];

    const handleSearch = () => {
        const motoEncontrada = motos.find(moto => moto.nombre.toLowerCase() === searchInput.toLowerCase());
        setSelectedMoto(motoEncontrada);
        setSearchInput('');
    };

    const handleReserva = () => {
        if (selectedMoto) {
            setReservedMoto(selectedMoto);
            Alert.alert('Moto reservada', 'La moto ha sido reservada satisfactoriamente.');
        } else {
            Alert.alert('Error', 'Por favor selecciona una moto antes de reservar.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}> reserva tu nueva aventura!!!</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar tipo de moto..."
                    value={searchInput}
                    onChangeText={setSearchInput}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            {selectedMoto ? (
                <View style={styles.motoInfoContainer}>
                    <Image source={selectedMoto.foto} style={styles.image} />
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.text}>{selectedMoto.nombre}</Text>
                    <Text style={styles.label}>Descripción:</Text>
                    <Text style={styles.text}>{selectedMoto.descripcion}</Text>
                    <Text style={styles.label}>Matrícula:</Text>
                    <Text style={styles.text}>{selectedMoto.matricula}</Text>
                    <Text style={styles.label}>Bastidor:</Text>
                    <Text style={styles.text}>{selectedMoto.bastidor}</Text>
                    <Text style={styles.label}>Color:</Text>
                    <Text style={styles.text}>{selectedMoto.color}</Text>
                    <Text style={styles.label}>Marca:</Text>
                    <Text style={styles.text}>{selectedMoto.marca}</Text>
                    <Text style={styles.label}>Modelo:</Text>
                    <Text style={styles.text}>{selectedMoto.modelo}</Text>
                    <Text style={styles.label}>ID Garaje:</Text>
                    <Text style={styles.text}>{selectedMoto.id_garaje}</Text>
                    <Text style={styles.label}>Fecha de Estacionamiento:</Text>
                    <Text style={styles.text}>{selectedMoto.fecha_estacionamiento}</Text>
                    <Text style={styles.label}>ID Agencia:</Text>
                    <Text style={styles.text}>{selectedMoto.id_agencia}</Text>
                    <TouchableOpacity style={styles.reserveButton} onPress={handleReserva}>
                        <Text style={styles.reserveButtonText}>Reservar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.noMotoText}>No se ha seleccionado ningún tipo de moto</Text>
                    <Text style={styles.noMotoText}>Tipos disponibles: Duke, Scooter, Motocicleta, Enduro, Supermoto, Deportiva, NKD125, Bomber 150, S1000RR</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 20,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        backgroundColor: '#3366ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    motoInfoContainer: {
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 5,
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    noMotoText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 10,
    },
    reserveButton: {
        backgroundColor: '#ff9933',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MotoScreen;

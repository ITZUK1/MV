-- Creación de la base de datos
CREATE DATABASE MotoCompeticion;
USE MotoCompeticion;

-- Tabla de Ciudades
CREATE TABLE Ciudad (
    id_ciudad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    num_habitantes INT NOT NULL
); 

-- Tabla de Garajes
CREATE TABLE Garaje (
    id_garaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    calle VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    id_ciudad INT,
    FOREIGN KEY (id_ciudad) REFERENCES Ciudad(id_ciudad)
);

-- Tabla de Agencias
CREATE TABLE Agencia (
    id_agencia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    calle VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    poblacion VARCHAR(100) NOT NULL
);

-- Tabla de Teléfonos de Agencia
CREATE TABLE TelefonoAgencia (
    id_telefono INT AUTO_INCREMENT PRIMARY KEY,
    telefono VARCHAR(15) NOT NULL,
    id_agencia INT,
    FOREIGN KEY (id_agencia) REFERENCES Agencia(id_agencia)
);

-- Tabla de Motocicletas
CREATE TABLE Motocicleta (
    matricula VARCHAR(15) PRIMARY KEY,
    bastidor VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    id_garaje INT,
    fecha_estacionamiento DATE NOT NULL,
    id_agencia INT,
    FOREIGN KEY (id_garaje) REFERENCES Garaje(id_garaje),
    FOREIGN KEY (id_agencia) REFERENCES Agencia(id_agencia)
);

-- Tabla de Clientes
CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    primer_apellido VARCHAR(100) NOT NULL,
    segundo_apellido VARCHAR(100) NOT NULL,
    calle VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    id_ciudad INT,
    telefono VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_ciudad) REFERENCES Ciudad(id_ciudad)
);

CREATE TABLE Reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    matricula_vehiculo VARCHAR(15),
    nombre_parking VARCHAR(255),
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);


use motocompeticion;
ALTER TABLE Cliente CHANGE COLUMN telefono contraseña VARCHAR(255) NOT NULL;

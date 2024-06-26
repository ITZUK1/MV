import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import HomeScreens from "./Parkiando/Pantallas/Home";
import UsuarioScreens from "./Parkiando/Pantallas/Cliente";
import AgenciaScreens from "./Parkiando/Pantallas/Agencia";
import ReservaScreens from "./Parkiando/Pantallas/Reserva";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Usuario':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        case 'Calificación y Comentarios':
                            iconName = focused ? 'business' : 'business-outline';
                            break;
                        case 'Reserva':
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            break;
                        default:
                            iconName = 'help-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6A1B9A',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#f8f9fa',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreens} options={{ tabBarLabel: 'Inicio' }} />
            <Tab.Screen name="Usuario" component={UsuarioScreens} options={{ tabBarLabel: 'Usuario' }} />
            <Tab.Screen name="Calificación y Comentarios" component={AgenciaScreens} options={{ tabBarLabel: 'Calificación y Comentarios' }} />
            <Tab.Screen name="Reserva" component={ReservaScreens} options={{ tabBarLabel: 'Reservas' }} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import HomeScreens from "./screens/HomeScreens";
import SettingsScreens from "./screens/SettingsScreens";
import AgenciaScreens from "./screens/AgenciaScreen";
import ReservaScreens from "./screens/reserva";

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
                        case 'Agencia':
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
                tabBarActiveTintColor: '#007BFF',
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
            <Tab.Screen name="Usuario" component={SettingsScreens} options={{ tabBarLabel: 'Usuario' }} />
            <Tab.Screen name="Agencia" component={AgenciaScreens} options={{ tabBarLabel: 'Agencia' }} />
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

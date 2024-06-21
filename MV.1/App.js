import React, { useState } from "react";
import Navigation from "./Navigation";
import LoginScreen from "./Parkiando/Pantallas/Login"; // Asumiendo que así se llama tu archivo LoginScreen

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Para almacenar los datos del usuario

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return isLoggedIn ? <Navigation user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
}

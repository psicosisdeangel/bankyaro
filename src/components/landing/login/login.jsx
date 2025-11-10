import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

/**
 * Componente de Login
 * Permite al usuario iniciar sesión en la aplicación.
 * Funcionalidades:
 * - Ingreso de nombre de usuario y contraseña
 * - Validación básica de campos requeridos
 * - Comunicación con el backend para autenticación
 * - Almacena el ID del usuario en localStorage al iniciar sesión
 * - Redirige al dashboard en caso de éxito
 */
export default function Login() {
  // Estado para almacenar el nombre de usuario ingresado
  const [nombre, setNombre] = useState("");
  // Estado para almacenar la contraseña ingresada
  const [contrasena, setContrasena] = useState("");
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  /**
   * Función para manejar el login
   * Realiza una petición POST al backend con nombre y contraseña
   * Guarda el ID del usuario en localStorage y navega al dashboard
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del form

    try {
      // Petición al backend
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contrasena }),
      });

      const data = await res.json();

      // Manejo de errores
      if (!res.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardar ID del usuario en localStorage para usarlo en otras vistas
      localStorage.setItem("usuarioId", data.user.numeroId);

      alert("Inicio de sesión exitoso");
      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Fetch login error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header del login */}
        <div className="login-header">
          <h2 className="bank-name">BANKYARO</h2>
        </div>

        <h3 className="welcome">Bienvenido de nuevo</h3>

        {/* Formulario de inicio de sesión */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Campo de nombre de usuario */}
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          {/* Botón de login */}
          <button type="submit" className="login-btn">LOGIN</button>
        </form>

        {/* Enlace a registro */}
        <p className="signup-text">
          ¿No tienes una cuenta? <Link to="/register">Registrarme</Link>
        </p>
      </div>
    </div>
  );
}

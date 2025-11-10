import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [numeroId, setNumeroId] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [balance, setBalance] = useState("0");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeroId, nombre, edad, correo, ciudad, balance, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al registrarse ");
        return;
      }

      alert("Usuario registrado con éxito ");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al conectar con el servidor ");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>BANKYARO</h2>
          <p>Crea tu cuenta, baka boy</p>
        </div>

        <form className="register-body" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Número de identificación"
            value={numeroId}
            onChange={(e) => setNumeroId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="username"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            required
          />

           <input
            type="text"
            placeholder="contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <button className="register-button" type="submit">
            REGISTRARME
          </button>

          <p className="register-footer">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

/**
 * Componente principal del Dashboard.
 * Permite al usuario:
 * - Ver su balance
 * - Solicitar un préstamo
 * - Transferir saldo a otro usuario
 * - Cerrar sesión
 */
export default function Dashboard() {
  // Estado para el monto ingresado al solicitar un préstamo
  const [monto, setMonto] = useState("");
  // Estado para mostrar mensajes de éxito o error
  const [mensaje, setMensaje] = useState("");
  // Estado para almacenar el balance del usuario
  const [balance, setBalance] = useState(0);
  // Estado para indicar si se están cargando los datos
  const [loading, setLoading] = useState(true);

  // Para transferencia de saldo
  const [usuarioDestino, setUsuarioDestino] = useState("");
  const [montoTransfer, setMontoTransfer] = useState("");

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Obtener ID del usuario almacenado en localStorage
  const usuarioIdString = localStorage.getItem("usuarioId");
  const usuarioId = usuarioIdString ? parseInt(usuarioIdString) : null;

  // Validar si el usuario existe; si no, mostrar mensaje
  if (!usuarioId) {
    return (
      <div className="dashboard-container">
        <p>Usuario no válido. Por favor inicia sesión.</p>
      </div>
    );
  }

  /**
   * useEffect para obtener el balance del usuario al cargar la página
   */
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/usuarios/${usuarioId}`);
        const data = await res.json();

        if (res.ok) {
          // Manejar si la respuesta es un array o un objeto
          const balanceNum = Array.isArray(data)
            ? Number(data[0]?.balance || 0)
            : Number(data.balance || 0);
          setBalance(balanceNum);
        } else {
          setMensaje(`Error al obtener balance: ${data.message}`);
        }
      } catch (error) {
        console.error("Error al obtener balance:", error);
        setMensaje("No se pudo obtener el balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [usuarioId]);

  /**
   * Función para solicitar un préstamo
   * Valida el monto ingresado y realiza la petición POST al backend
   */
  const handleSolicitar = async (e) => {
    e.preventDefault();
    const montoNumber = parseFloat(monto);

    if (!montoNumber || montoNumber <= 0) {
      setMensaje("Por favor, ingresa un monto válido");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId, monto: montoNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message);
        setMonto("");
        // Actualizar balance localmente sumando el préstamo
        setBalance((prevBalance) => prevBalance + montoNumber);
      } else {
        setMensaje(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al solicitar préstamo:", error);
      setMensaje("Error al solicitar préstamo. Intenta nuevamente");
    }
  };

  /**
   * Función para realizar una transferencia de saldo a otro usuario
   */
  const handleTransfer = async (e) => {
    e.preventDefault();

    const montoNum = parseFloat(montoTransfer);
    const destinoNum = parseInt(usuarioDestino);

    // Validar datos ingresados
    if (!montoNum || montoNum <= 0 || !destinoNum) {
      setMensaje("Ingresa datos válidos para la transferencia");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/transferencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deUsuarioId: usuarioId,
          aUsuarioId: destinoNum,
          monto: montoNum,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message);
        // Restar el monto transferido del balance local
        setBalance((prev) => prev - montoNum);
        setUsuarioDestino("");
      } else {
        setMensaje(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en la transferencia. Intenta nuevamente.");
    }
  };

  // Mostrar loading mientras se obtiene el balance
  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header del dashboard */}
      <header className="dashboard-header">
        <h1>BANKYARO</h1>
        <p>Tu banca moderna y segura</p>
      </header>

      <div className="dashboard-content">
        {/* Tarjeta de saldo */}
        <div className="saldo-card">
          <h2>Saldo actual</h2>
          <p className="saldo-valor">
            ${typeof balance === "number" ? balance.toFixed(2) : "0.00"}
          </p>
        </div>

        {/* Solicitar préstamo */}
        <div className="loan-card">
          <h2>Solicitar préstamo</h2>
          <form onSubmit={handleSolicitar}>
            <input
              type="number"
              placeholder="Monto solicitado"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <button type="submit">Enviar solicitud</button>
          </form>
        </div>

        {/* Transferir saldo */}
        <div className="transfer-card">
          <h2>Transferir saldo</h2>
          <form onSubmit={handleTransfer}>
            <input
              type="number"
              placeholder="ID del usuario receptor"
              value={usuarioDestino}
              onChange={(e) => setUsuarioDestino(e.target.value)}
            />
            <input
              type="number"
              placeholder="Monto a transferir"
              value={montoTransfer}
              onChange={(e) => setMontoTransfer(e.target.value)}
            />
            <button type="submit">Transferir</button>
          </form>
        </div>

        {/* Mostrar mensajes de error o éxito */}
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>

      {/* Botón de cerrar sesión */}
      <div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#9CA986",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

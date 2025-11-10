// controllers/transferencias.controller.js
import { getConnection } from "../database.js";

export const transferirSaldo = async (req, res) => {
  try {
    const { deUsuarioId, aUsuarioId, monto } = req.body;

    if (!deUsuarioId || !aUsuarioId || !monto || monto <= 0) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const connection = await getConnection();
    await connection.query("START TRANSACTION");

    // Verificar saldo del remitente
    const [remitente] = await connection.query(
      "SELECT balance FROM usuarios WHERE numeroId = ? FOR UPDATE",
      [deUsuarioId]
    );

    if (!remitente[0] || remitente[0].balance < monto) {
      await connection.query("ROLLBACK");
      return res.status(400).json({ message: "Saldo insuficiente" });
    }

    // Restar del remitente
    await connection.query(
      "UPDATE usuarios SET balance = balance - ? WHERE numeroId = ?",
      [monto, deUsuarioId]
    );

    // Sumar al receptor
    const [receptor] = await connection.query(
      "UPDATE usuarios SET balance = balance + ? WHERE numeroId = ?",
      [monto, aUsuarioId]
    );

    if (receptor.affectedRows === 0) {
      await connection.query("ROLLBACK");
      return res.status(404).json({ message: "Usuario receptor no encontrado" });
    }

    await connection.query("COMMIT");
    res.json({ message: `Transferencia de $${monto} exitosa` });
  } catch (error) {
    console.error("Error en la transferencia:", error);
    await getConnection().query("ROLLBACK");
    res.status(500).json({ message: "Error al realizar la transferencia" });
  }
};

import { getConnection } from "../database.js";

export const crearPrestamo = async (req, res) => {
    try {
        const { usuarioId, monto } = req.body;
        console.log("Datos recibidos:", { usuarioId, monto });

        if (!usuarioId || !monto || isNaN(usuarioId) || isNaN(monto) || monto <= 0) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const connection = await getConnection();

        await connection.query(
            "INSERT INTO prestamos (usuarioId, monto, fecha) VALUES (?, ?, NOW())",
            [usuarioId, monto]
        );

        const [updateResult] = await connection.query(
            "UPDATE usuarios SET balance = balance + ? WHERE numeroId = ?",
            [monto, usuarioId]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(201).json({ message: "Préstamo otorgado exitosamente" });
    } catch (error) {
        console.error("Error al crear préstamo:", error);
        res.status(500).json({ message: "Error al solicitar préstamo" });
    }
};
export const obtenerPrestamos = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM prestamos WHERE usuarioId = ? ORDER BY fecha DESC",
            [usuarioId]
        );
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener préstamos:", error);
        res.status(500).json({ message: "Error al obtener préstamos" });
    }
}

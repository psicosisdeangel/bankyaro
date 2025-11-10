import { getConnection } from "../database.js";

export const loginUser = async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;

    if (!nombre || !contrasena) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?",
      [nombre, contrasena]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Nombre o contraseña incorrectos " });
    }

    const user = rows[0];
    res.status(200).json({ message: "Login exitoso ", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

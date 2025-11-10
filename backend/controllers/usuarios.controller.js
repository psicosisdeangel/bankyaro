import { getConnection } from "../database.js";

// Crear usuario
const createUser = async (req, res) => {
  try {
    const { numeroId, nombre, edad, correo, ciudad, balance, contrasena } = req.body;
    const data = { numeroId, nombre, edad, correo, ciudad, balance, contrasena };
    const connection = await getConnection();
    await connection.query("INSERT INTO usuarios SET ?", [data]);
    res.status(201).json({ message: "Usuario creado correctamente ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT numeroId, nombre, edad, correo, ciudad, balance FROM usuarios"
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// obtener usuario por ID (incluye balance)
const getUsuarioById = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT numeroId, nombre, balance FROM usuarios WHERE numeroId = ?",
      [usuarioId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]); // aquí regresa {numeroId, nombre, balance}
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const obtenerBalance = async (req, res) => {
  try {
    const { numeroid } = req.params;
    const connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT balance FROM usuarios WHERE numeroId = ? ",
      [numeroid]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ message: "Error al obtener préstamos" });
  }
}
export const methodsUsers = { createUser, getUsuarios, getUsuarioById, obtenerBalance};

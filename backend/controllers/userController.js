import db from "../db.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Faltan campos" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO usuarios (username, password) VALUES (?, ?)", [username, hashedPassword]);
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "El usuario ya existe" });
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Faltan campos" });

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ? LIMIT 1", [username]);
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    res.json({
      message: "Login exitoso",
      user: { username: user.username, balance: user.balance }
    });
  } catch (err) {
    console.error("Error loginUser:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

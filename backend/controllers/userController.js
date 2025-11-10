import db from "../db.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Faltan campos" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password, balance) VALUES (?, ?, 0.00)";
    db.query(sql, [username, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(400).json({ message: "El usuario ya existe" });
        console.error("Error MySQL insert:", err);
        return res.status(500).json({ message: "Error al registrar usuario" });
      }
      res.status(201).json({ message: "Usuario registrado correctamente" });
    });
  } catch (error) {
    console.error("Error registerUser:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const registerUser1 = async (req, res)=> {
    try{
        const{username,password,balance} = req.body;
        const data = {username,password,balance}
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO usuarios SET ?', [data]);
        res.json({message:"Usuario, creado"})

    }
    catch(err){
        console.log(err);
    }
}
export const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Faltan campos" });

  const sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Error MySQL select:", err);
      return res.status(500).json({ message: "Error al buscar usuario" });
    }

    if (results.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const user = results[0];
    try {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: "Contraseña incorrecta" });

      res.json({
        message: "Login exitoso",
        user: {
          id: user.id,
          username: user.username,
          balance: user.balance ?? 0,
        },
      });
    } catch (compareErr) {
      console.error("Error bcrypt compare:", compareErr);
      res.status(500).json({ message: "Error en autenticación" });
    }
  });
  console.log("conexion ")


};

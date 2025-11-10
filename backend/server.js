// Importación de librerías necesarias
import express from "express"; // Framework para crear el servidor y manejar rutas
import cors from "cors";       // Middleware para habilitar CORS (compartir recursos entre dominios)
import dotenv from "dotenv";   // Para manejar variables de entorno

// Importación de rutas de la aplicación
import usuariosRoutes from "./routes/usuarios.routes.js";        // Rutas relacionadas con usuarios
import authRoutes from "./routes/auth.routes.js";                // Rutas de autenticación (login, registro)
import prestamosRoutes from "./routes/prestamos.routes.js";      // Rutas para préstamos
import transferenciasRoutes from "./routes/transferencias.routes.js"; // Rutas para transferencias

// Configuración de variables de entorno desde el archivo .env
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Configuración de CORS (Cross-Origin Resource Sharing)
// Esto permite que el frontend en http://localhost:5173 pueda hacer peticiones al backend
app.use(cors({
  origin: "http://localhost:5173",          // Origen permitido
  methods: ["GET", "POST"],                 // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type"],         // Encabezados permitidos
}));

// Middleware para que el servidor pueda recibir datos en formato JSON
app.use(express.json());

// Configuración de rutas de la API
app.use("/api/usuarios", usuariosRoutes);         // Rutas de usuarios: /api/usuarios/...
app.use("/api/auth", authRoutes);                 // Rutas de autenticación: /api/auth/...
app.use("/api/prestamos", prestamosRoutes);       // Rutas de préstamos: /api/prestamos/...
app.use("/api/transferencias", transferenciasRoutes); // Rutas de transferencias: /api/transferencias/...

// Ruta principal del servidor (para pruebas rápidas)
app.get("/", (req, res) => res.send("Servidor funcionando correctamente"));

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3001; // Si no hay variable de entorno, usa el puerto 3001

// Iniciar el servidor y mostrar mensaje en consola
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


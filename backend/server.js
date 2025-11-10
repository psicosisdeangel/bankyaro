import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Servidor funcionando"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));

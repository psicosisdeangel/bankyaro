import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Servidor funcionando"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));

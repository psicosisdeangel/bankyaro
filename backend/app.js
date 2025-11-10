import express from "express";
import router from "./routes/userRoutes.js";

const app = express();


app.set("port", 5000);

app.use(express.json());

app.use(router);

export default app;
import express from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "3000";

// middleware cors
app.use(cors({
  origin: "*"
}))

// Middleware para leer JSON
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API OK");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// Rutas de la API
app.use("/api", routes);


app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

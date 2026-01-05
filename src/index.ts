import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || "3000";

// Middleware para leer JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// 👉 LISTENER
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 

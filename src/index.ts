import express from "express";
import "dotenv/config";
import routes from "./routes";

console.log("DATABASE_URL REAL:", process.env.DATABASE_URL);

console.log("🔥 index.ts principal cargado");

const app = express();
const PORT = process.env.PORT || "3000";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("PORT:", process.env.PORT);

app.use((req, res, next) => {
  console.log("REQUEST DESDE:", req.headers.host);
  next();
});

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

// // 👉 LISTENER
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en puerto ${PORT}`);
// }); 

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

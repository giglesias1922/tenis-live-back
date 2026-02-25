import express from "express";
import "dotenv/config";
import routes from "./routes";
import { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || "3000";


// app.use((req, res, next) => {
//   console.log("REQUEST DESDE:", req.headers.host);
//   next();
// });

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

import {config} from 'dotenv'
import express from 'express'
import routerEventType from '../src/routes/eventType.routes.js';
import mongoose from "mongoose";

config();

const app = express();

const port =  process.env.PORT || 3000;
const connString = process.env.CONNECTIONSTRING;

console.log("connString",connString)

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

  // Usar tus rutas bajo un prefijo (ej: /api/eventtypes)
app.use("/api/eventtypes", routerEventType);

app.listen(port, () =>
{
    console.log(`Servidor iniciado en el puerto: ${port}`)
})
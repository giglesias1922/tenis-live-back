import mongoose from "mongoose";

// Definís el esquema
const eventTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      }
});

// Creás el modelo basado en ese esquema
const EventType = mongoose.model("EventType", eventTypeSchema);

// Lo exportás
export default EventType;

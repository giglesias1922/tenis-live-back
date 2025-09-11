import express from "express";
import EventType from '../models/eventType.models.js'

const routerEventType = express.Router();

// 🔹 Ruta GET: obtener todos los EventType
routerEventType.get("/", async (req, res) => {
  try {
    const data = await EventType.find(); // consulta todos los documentos

    if(data.length === 0)
    {
        return res.status(204).json([]);
    }
    
    res.json(data); // devuelve JSON al cliente
  } catch (err) {
    res.status(500).json({ message: `Error Get all EventType ${err.message}` });
  }
});

//Post
routerEventType.post("/", async(req,res) =>
{  
    const {name} = req?.body;

    if(!name)
    {
        res.status(400).json({ message: "Name can not be empty" });
    }

    const data = new EventType(
        {
            name
        }
    )
    
    try {
        const newData = await data.save();  
        
        res.status(201).json(newData)

    } catch (err) {
        res.status(400).json({ message: `Error Post EventType ${err.message}` });
    }
});

// 🔹 Ruta GET: obtener todos los EventType
routerEventType.get("/:id", async (req, res) => {
    try 
    {
    const {id} = req.params;

    if(!id)
        return res.status(400).json({ message: "Id can not be empty" });

    const data = await EventType.findById(id);

    if(!data)
        return res.status(404).json({ message: "Not found" });        
      
      res.json(data); // devuelve JSON al cliente
    } catch (err) {
      res.status(500).json({ message: `Error GetById EventType ${err.message}` });
    }
  });

  // PUT - actualizar por id
  routerEventType.put('/:id', async (req, res) => {
    try {
      const updated = await EventType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // retorna el documento actualizado
      );
      if (!updated) {
        return res.status(404).json({ message: 'EventType no encontrado' });
      }
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE - eliminar por id
  routerEventType.delete('/:id', async (req, res) => {
    try {
      const deleted = await EventType.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'EventType no encontrado' });
      }
      res.json({ message: 'EventType eliminado correctamente' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  export default routerEventType;
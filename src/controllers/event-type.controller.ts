import { Request, Response } from "express";
import * as eventTypeService from "../services/event-type.service";
import {GetByEventType}  from "../services/match-event.service";


export const get = async (req: Request, res: Response) => {
  try {
    const eventTypes = await eventTypeService.GetAll();
    res.status(200).json(eventTypes);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los tipos de evento " + error  });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { code, description } = req.body;

    if (!code || !description) {
      return res.status(400).json({
        message: "code y description son obligatorios"
      });
    }
    const eventType = await eventTypeService.Add({
      code: code,
      description
    });

    res.status(200).json(eventType);
  } catch (error) {
    res.status(500).json({ message: "Error creando el tipo de evento: " + error  });
  }
};

export const put = async (req:Request, res: Response ) =>
{
  try{

    const {id} = req.params;
    const {description} = req.body;

    if(!id || !description)
    {
      return res.status(400).json({
        message: "id y description son obligatorios"
      });
    }
 
    const oldEventType = await eventTypeService.GetById(Number(id));

    if(!oldEventType)
    {
      return res.status(404).json({message:"No se encontró el tipo de evento con id:" + id});
    } 

    
    const eventType = await eventTypeService.Update(Number(id),{description: description});

    res.status(200).json(eventType);
  }
  catch(error)
  {
    res.status(500).json({message: "Error actualizando el tipo de evento. Error: " + error})
  }
};

export const del = async(req:Request, res:Response) =>
{
  try{
    const {id} = req.params;

    const eventType = await eventTypeService.GetById(Number(id));

    if(!eventType)
    {
      return res.status(404).json({message:"No se encontró el tipo de evento con id:" + id});
    } 


    //Buscar en match event si existe para ese id, deshabilitar y sino eliinar
    const matches = await GetByEventType(Number(id));

    if(!matches)
      await eventTypeService.Delete(Number(id));
    else
      await eventTypeService.Deactivate(Number(id));

    res.sendStatus(200);
  }
  catch(error)
  {
    res.status(500).json({message: "Error eliminando el tipo de evento. Error: " + error})
  }
};
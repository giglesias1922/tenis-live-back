import { Request, Response } from "express";
import * as eventTypeService from "../services/event-type.service";
import {getByEventType}  from "../services/match-event.service";
import { EventCode } from "../generated/prisma";


export const get = async (req: Request, res: Response) => {
  try {
    const eventTypes = await eventTypeService.getEventTypes();
    res.status(200).json(eventTypes);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los tipos de evento" });
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

    // Validar enum
    if (!Object.values(EventCode).includes(code)) {
      return res.status(400).json({
        message: "EventCode inválido"
      });
    }

    const eventType = await eventTypeService.addEventType({
      code: code as EventCode,
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

    const {id, description} = req.body;

    const oldEventType = await eventTypeService.getEventType(id);

    if(!oldEventType)
    {
      return res.status(404).json({message:"No se encontró el tipo de evento con id:" + id});
    } 

    if(!id || !description)
    {
      return res.status(400).json({
        message: "id y description son obligatorios"
      });
    }

    const eventType = await eventTypeService.updateEventType(id,{description: description});

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
    const {id} = req.body;

    const eventType = await eventTypeService.getEventType(id);

    if(!eventType)
    {
      return res.status(404).json({message:"No se encontró el tipo de evento con id:" + id});
    } 


    //Buscar en match event si existe para ese id, deshabilitar y sino eliinar
    const matches = await getByEventType(id);

    if(!matches)
      await eventTypeService.deleteEventType(id);
    else
      await eventTypeService.deactivateEventType(id);

    return res.status(200);
  }
  catch(error)
  {
    res.status(500).json({message: "Error eliminando el tipo de evento. Error: " + error})
  }
};
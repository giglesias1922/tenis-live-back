import { Request,Response } from "express"
import * as MatchEventService from "../services/match-event.service"

export const post = async(req:Request,res:Response)=>
{
    try {
        const {matchId,setId,eventTypeId} = req.body;

        if(!matchId || !setId || !eventTypeId)
            return res.status(404).json({message:"matchId, setId yeventTypeId son obligatorios"})

        const data: MatchEventService.CreateMatchEventInput = {matchId,setId,eventTypeId}

        const obj = await MatchEventService.CreateMatchEvent(data);

        res.status(200).json(obj)

    } catch (error) {
        res.status(500).json({message:"Error al registrar el evento " + error  });
    } 
}

export const getSummary = async(req:Request,res:Response)=>
  {
      try {
          const {matchId} = req.params;
          

          if(!matchId)
              return res.status(404).json({message:"matchId es obligatorio"})
  
          const obj = await MatchEventService.GetSummary(Number(matchId));
  
          res.status(200).json(obj)
  
      } catch (error) {
          res.status(500).json({message:"Error al obtener las estadisticas " + error  });
      } 
  }
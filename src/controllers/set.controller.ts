import { Request, Response } from "express";
import * as setService from "../services/set.service"

export const startSet = async (req:Request,res:Response)=>
{
    try {
        const {matchId,setNumber} = req.body;

        if(!matchId || !setNumber)
            {
                return res.status(404).json({message:"matchId y setNumber son obligatorios"})   
            }

        const data: setService.StartSetInput= {
            matchId,setNumber
          }

        const newSet = await setService.StartSet(data);

        res.status(200).json(newSet);
    } catch (error) {
        res.status(500).json({message:"Error al registrar el set " + error  });
    }
}

export const endSet = async (req:Request,res:Response)=>
{
    try {
        const {id} = req.params;
        const {playerGames,opponentGames} = req.body;

        if(!id || (playerGames==null) || (opponentGames==null))
        {
            return res.status(404).json({message:"id, playerGames y opponentGames son obligatorios"})   
        }

        const data: setService.EndSetInput= {
            playerGames: Number(playerGames),
            opponentGames: Number(opponentGames),
            }

        const newSet = await setService.EndSet(Number(id),data);

        res.status(200).json(newSet);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
              message: error.message
            });
          }
        
          return res.status(500).json({
            message: "Error interno del servidor"
          });
    }
}
import { Request, Response } from "express";
import * as clubService from "../services/club.service";

export const get = async (req:Request, res:Response)=>{
    try{
        var list = await clubService.getClubs();
        res.status(200).json(list);
    }
    catch(error)
    {
        res.status(500).json({message: "Error obteniendo los clubes"});
    }
}

export const post = async (req:Request, res:Response)=>{
    try {
        const {name, city} = req.body;

        if(!name || !city)
            return res.status(400).json({message: "name y city son obligatorios"});

        const newClub = await clubService.addClub({name,city});

        res.status(200).json(newClub);
    } catch (error) {
        res.status(500).json({message: "Error creando el club"});
    }
}

export const put = async (req:Request, res:Response)=>{
    try {
        const {id, name, city} = req.body;

        if(!name || !city)
            return res.status(400).json({message: "name y city son obligatorios"});

        const oldRecord = await clubService.getClub(id);

        if(!oldRecord)
            return res.status(404).json({message: "No se encontró el registro con id:" + id});

        const newRecord = await clubService.updateClub(id,{name,city});

        res.status(200).json(newRecord);
    } catch (error) {
        res.status(500).json({message: "Error actualizando el club"});
    }
}

export const del = async (req:Request, res:Response)=>
{
    try {
        const {id} = req.body;

        const hasMatches = await clubService.hasMatches(id);

        if (hasMatches) {
            return res.status(400).json({
                message: "No se puede eliminar el club porque tiene partidos asociados"
            });
        }


        await clubService.deleteClub(id);

        res.status(200)
    } catch (error) {
        res.status(500).json({message: "Error eliminando el club"});       
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
      const {id} = req.body;
  
      const match = await clubService.getClub(id));
      res.status(200).json(match);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo el club" });
    }
  };
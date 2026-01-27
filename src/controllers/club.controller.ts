import { Request, Response } from "express";
import * as clubService from "../services/club.service";

export const get = async (req:Request, res:Response)=>{
    try{
        var list = await clubService.GetAll();
        res.status(200).json(list);
    }
    catch(error)
    {
        res.status(500).json({message: "Error obteniendo los clubes " + error  });
    }
}

export const post = async (req:Request, res:Response)=>{
    try {
        const {name, city} = req.body;

        if(!name || !city)
            return res.status(400).json({message: "name y city son obligatorios"});

        const newClub = await clubService.Add({name,city});

        res.status(200).json(newClub);
    } catch (error) {
        res.status(500).json({message: "Error creando el club " + error  });
    }
}

export const put = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const {name, city} = req.body;

        if(!name || !city)
            return res.status(400).json({message: "name y city son obligatorios"});

        const oldRecord = await clubService.GetById(Number(id));

        if(!oldRecord)
            return res.status(404).json({message: "No se encontró el registro con id:" + id});

        const newRecord = await clubService.Update(Number(id),{name,city});

        res.status(200).json(newRecord);
    } catch (error) {
        res.status(500).json({message: "Error actualizando el club " + error  });
    }
}

export const del = async (req:Request, res:Response)=>
{
    try {
        const {id} = req.params;

        const obj = await clubService.GetById(Number(id));

        if(!obj)
            return res.status(404).json({message: "No se encontró el registro con id:" + id});

        const hasMatches = await clubService.HasMatches(Number(id));
        
        if (hasMatches) {
            return res.status(400).json({
                message: "No se puede eliminar el club porque tiene partidos asociados"
            });
        }


        await clubService.Delete(Number(id));

        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message: "Error eliminando el club " + error  });    
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
  
      const match = await clubService.GetById(Number(id));
      res.status(200).json(match);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo el club " + error  });
    }
  };
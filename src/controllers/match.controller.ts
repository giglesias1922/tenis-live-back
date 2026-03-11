import { Request, Response } from "express";
import * as matchService from "../services/match.service";

export const get = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.GetAll();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo matches" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const match = await matchService.GetById(Number(id));
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match " + error  });
  }
};

export const startMatch = async (req: Request, res: Response) => {
  try {
    const {clubId,opponentName,round,notes,supertiebreak} = req.body;

    const data: matchService.StartMatchObject= {
      clubId,opponentName,round, notes,supertiebreak
    }

    if(!clubId || !opponentName || !round)
      return res.status(400).json({message: "clubId, opponentName y round son obligatorios"});

    const matchActive = await matchService.GetActiveMatch();

    if(matchActive)
      return res.status(400).json({message: "Ya hay un match activo."});    

    const match = await matchService.StartMatch(data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error creando el match " + error  });
  }
};

export const endMatch = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {won, notes} = req.body;

    const data: matchService.EndMatchObject= {
      won,notes
    }

    if(!id || won===undefined)
      return res.status(400).json({message: "id y won son obligatorios"});

    const match = await matchService.EndMatch(Number(id),data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error finalizando el match " + error  });
  }
};


export const getActive = async (req: Request, res: Response) => {
  try {
    const match = await matchService.GetActiveMatch();

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match activo" + error  });
  }
};

export const getClosed = async (req: Request, res: Response) => {
  try {
    const {clubId,fromDate,opponent} = req.query;


    const matches = await matchService.GetClosedMatches(
      {
        clubId: clubId ? Number(clubId) : undefined, 
        fromDate: fromDate ? new Date(fromDate.toString()) : undefined, 
        opponent: opponent ? String(opponent) : undefined,
      }
    );

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los match cerrados" + error  });
  }
};


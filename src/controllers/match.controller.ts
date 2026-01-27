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
    const {clubId,opponentName,round} = req.body;

    const data: matchService.StartMatchObject= {
      clubId,opponentName,round
    }

    if(!clubId || !opponentName || round)
      return res.status(400).json({message: "clubId, opponentName y round son obligatorios"});

    const match = await matchService.StartMatch(data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match " + error  });
  }
};

export const endMatch = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {won, notes} = req.body;

    const data: matchService.EndMatchObject= {
      won,notes
    }

    if(!id || !won)
      return res.status(400).json({message: "id y won son obligatorios"});

    const match = await matchService.EndMatch(Number(id),data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match " + error  });
  }
};
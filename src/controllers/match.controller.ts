import { Request, Response } from "express";
import * as matchService from "../services/match.service";

export const get = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getMatches();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo matches" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const {id} = req.body;

    const match = await matchService.getMatch(id);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match" });
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

    const match = await matchService.startMatch(data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match" });
  }
};

export const endMatch = async (req: Request, res: Response) => {
  try {
    const {id, won, notes} = req.body;

    const data: matchService.EndMatchObject= {
      won,notes
    }

    if(!id || !won)
      return res.status(400).json({message: "id y won son obligatorios"});

    const match = await matchService.endMatch(id,data);

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el match" });
  }
};
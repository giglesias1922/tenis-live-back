import { Request, Response } from "express";
import * as matchService from "../services/match.service";

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getAllMatches();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo matches" });
  }
};

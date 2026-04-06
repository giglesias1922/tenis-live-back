import { Request, Response } from "express";
import * as eventGroupService from "../services/event-group.service";


export const get = async (req: Request, res: Response) => {
  try {
    const response = await eventGroupService.GetAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los grupos de evento " + error  });
  }
};
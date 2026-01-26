import { Router } from "express";
import * as matchEventController from "../controllers/match-event.controller"

const router = Router()

router.post("/",matchEventController.post)

export default router;
import { Router } from "express";
import * as eventGroupController from "../controllers/event-group.controller"

const router = Router()

router.get("/",eventGroupController.get)

export default router;
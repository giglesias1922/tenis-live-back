import * as controllerSet from "../controllers/set.controller"
import { Router } from "express"

const router = Router();

router.post("/start",controllerSet.startSet)
router.put("/end",controllerSet.endSet)

export default router;
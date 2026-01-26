import { Router } from "express";
import * as matchController from "../controllers/match.controller";

const router = Router();

router.get("/", matchController.get);
router.get("/{id}", matchController.getOne);
router.post("/", matchController.startMatch);
router.put("/", matchController.endMatch);


export default router;

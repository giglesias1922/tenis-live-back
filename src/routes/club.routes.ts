import { Router } from "express";
import * as clubController from "../controllers/club.controller";

const router = Router();

router.get("/", clubController.get);
router.get("/{id}", clubController.getOne);
router.post("/", clubController.post);
router.put("/", clubController.put);
router.delete("/", clubController.del);

export default router;
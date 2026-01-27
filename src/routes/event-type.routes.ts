import { Router } from "express";
import { get, post, put, del } from "../controllers/event-type.controller";

const router = Router();

router.get("/", get);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", del);

export default router;

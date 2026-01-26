import { Router } from "express";
import eventTypeRoutes  from "./event-type.routes";
import matchRoutes from "./match.routes";

const router = Router();

router.use("/event-types", eventTypeRoutes );
router.use("/matches", matchRoutes);

export default router;

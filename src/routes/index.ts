import { Router } from "express";
import eventTypeRoutes  from "./event-type.routes";
import clubRoutes from "./club.routes";
import matchRoutes from "./match.routes";
import matchEventRoutes from "./match-event.routes";
import setRoutes from "./set.routes";

const router = Router();

router.use("/event-types", eventTypeRoutes );
router.use("/match", matchRoutes);
router.use("/club", clubRoutes);
router.use("/match-event", matchEventRoutes);
router.use("/set", setRoutes);

export default router;

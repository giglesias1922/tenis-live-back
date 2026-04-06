import { Router } from "express";
import eventTypeRoutes  from "./event-type.routes";
import clubRoutes from "./club.routes";
import matchRoutes from "./match.routes";
import matchEventRoutes from "./match-event.routes";
import setRoutes from "./set.routes";
import eventGroupRoutes  from "./event-group.routes";

const router = Router();

router.use("/event-types", eventTypeRoutes );
router.use("/match", matchRoutes);
router.use("/club", clubRoutes);
router.use("/match-event", matchEventRoutes);
router.use("/set", setRoutes);
router.use("/event-groups", eventGroupRoutes );

export default router;

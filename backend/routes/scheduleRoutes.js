import { Router } from "express";
const router = Router();
import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

router.post("/create", createSchedule);
router.get("/get", getSchedules);
router.get("/get/:id", getScheduleById);
router.put("/update/:id", updateSchedule);
router.delete("/delete/:id", deleteSchedule);

export default router;

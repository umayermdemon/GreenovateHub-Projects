import { Router } from "express";
import { ideaControllers } from "./idea.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ideaValidationSchemas } from "./idea.validation";

const router = Router();

router.post(
  "/create-idea",
  validateRequest(ideaValidationSchemas.createIdeaValidationSchema),
  ideaControllers.createIdeaIntoDb
);
export const ideaRouter = router;

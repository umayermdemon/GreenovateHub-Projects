import { Router } from "express";
import { ideaControllers } from "./idea.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ideaValidationSchemas } from "./idea.validation";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";

const router = Router();

router.post(
  "/create-idea",
  auth(userRole.member),
  validateRequest(ideaValidationSchemas.createIdeaValidationSchema),
  ideaControllers.createIdeaIntoDb
);
router.get("/", ideaControllers.getAllIdeasFromDb);
router.get("/:id", ideaControllers.getSingleIdeaFromDb);
router.put("/:id", auth(userRole.member), ideaControllers.updateIdeaIntoDb);
router.get(
  "/all-ideas/me",
  auth(userRole.member),
  ideaControllers.getAllIdeasForMemberFromDb
);

export const ideaRouter = router;

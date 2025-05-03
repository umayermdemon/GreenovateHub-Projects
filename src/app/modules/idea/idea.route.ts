import { Router } from "express";
import { ideaControllers } from "./idea.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ideaValidationSchemas } from "./idea.validation";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";

const router = Router();

router.post(
  "/create-idea",
  validateRequest(ideaValidationSchemas.createIdeaValidationSchema),
  ideaControllers.createIdeaIntoDb
);
router.get("/", auth(userRole.admin), ideaControllers.getAllIdeasFromDb);
router.get(
  "/:id",
  auth(userRole.admin, userRole.member),
  ideaControllers.getSingleIdeaFromDb
);
router.get(
  "/all-ideas/me",
  auth(userRole.member),
  ideaControllers.getAllIdeasForMemberFromDb
);

// router.get("/get-all-idea", ideaControllers.getAllIdea);
export const ideaRouter = router;

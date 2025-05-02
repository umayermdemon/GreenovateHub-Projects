import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryControllers } from "./category.controller";
import { categoryValidationSchemas } from "./category.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-category",
  auth("admin"),
  validateRequest(categoryValidationSchemas.createCategoryValidationSchema),
  categoryControllers.createCategoryIntoDb
);
export const categoryRouter = router;

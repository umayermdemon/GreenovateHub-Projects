import { z } from "zod";

export const categoryNameEnum = z.enum(["energy", "waste", "transportation"]);

export const createCategoryValidationSchema = z.object({
  name: categoryNameEnum,
});

export const updateCategoryValidationSchema = z.object({
  name: categoryNameEnum.optional(),
});

export const categoryValidationSchemas = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationSchemas = exports.updateCategoryValidationSchema = exports.createCategoryValidationSchema = exports.categoryNameEnum = void 0;
const zod_1 = require("zod");
exports.categoryNameEnum = zod_1.z.enum(["energy", "waste", "transportation"]);
exports.createCategoryValidationSchema = zod_1.z.object({
    name: exports.categoryNameEnum,
});
exports.updateCategoryValidationSchema = zod_1.z.object({
    name: exports.categoryNameEnum.optional(),
});
exports.categoryValidationSchemas = {
    createCategoryValidationSchema: exports.createCategoryValidationSchema,
    updateCategoryValidationSchema: exports.updateCategoryValidationSchema,
};

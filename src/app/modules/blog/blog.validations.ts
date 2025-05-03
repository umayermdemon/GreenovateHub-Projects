import { z } from "zod";

export const createBlogValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    images: z.array(z.string().url("Each image must be a valid URL")),
    description: z.string().min(1, "Description is required"),
    authorId: z.string().uuid("Author ID must be a valid UUID"),
    categoryId: z.string().uuid("Category ID must be a valid UUID"),
});

export const updateBlogValidationSchema = createBlogValidationSchema.partial();
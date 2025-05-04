import { categoryName } from "../../../../generated/prisma";

export interface IBlog {
    title: string,
    images: string[],
    description: string,
    authorId: string,
    categoryId: string
}

export type TBlogFilterRequest = {
    searchTerm?: string | undefined;
    title?: string | undefined;
    category?: categoryName | undefined;
    status?: string | undefined;
    up_votes?: string | undefined;
    down_votes?: string | undefined;
    author?: string | undefined;
};
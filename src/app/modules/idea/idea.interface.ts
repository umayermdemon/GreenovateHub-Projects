import { categoryName } from "../../../../generated/prisma";


export type TIdeaFilterRequest = {
    searchTerm?: string | undefined;
    title?: string | undefined;
    category?: categoryName | undefined;
    status?: string | undefined;
    up_votes?: string | undefined;
    down_votes?: string | undefined;
    author?: string | undefined;
};
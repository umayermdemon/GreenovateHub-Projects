import { prisma } from "../../utils/prisma"
import { IAuthUser } from "../user/user.interface"
import { IComment } from "./comment.interface"



const createComment = async (payload: IComment, user: IAuthUser) => {
    const result = prisma.comment.create({
        data: {
            ...payload,
            commentorId: user.userId
        }
    })
    return result
}


export const commentService = {
    createComment
}
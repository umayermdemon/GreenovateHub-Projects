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

const editComment = async (comment_id: string, payload: { content: string }) => {

    const result = await prisma.comment.update({
        where: {
            comment_id
        },
        data: {
            content: payload.content
        }
    })
    return result
}
const deleteComment = async (comment_id: string, user: IAuthUser) => {
    const commentData = await prisma.comment.findUnique({
        where: {
            comment_id
        }
    })
    if (commentData?.commentorId !== user.userId) {
        throw new Error('You cannot delete this comment')
    }
    const result = await prisma.comment.delete({
        where: {
            comment_id
        }
    })
    return result
}
export const commentService = {
    createComment,
    editComment,
    deleteComment
}
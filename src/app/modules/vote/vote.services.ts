import { prisma } from "../../utils/prisma"
import { IAuthUser } from "../user/user.interface";
import { IVote } from "./vote.interface";


const createVote = async (payload: IVote, user: IAuthUser) => {
    let isVoteExists;
    if (payload.ideaId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_ideaId: {
                    voterId: user.userId,
                    ideaId: payload.ideaId
                }
            }
        })
    }
    if (payload.blogId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_blogId: {
                    voterId: user.userId,
                    blogId: payload.blogId

                }
            }
        })
    }
    let result;

    if (isVoteExists) {
        if (isVoteExists.isDeleted === true) {
            result = await prisma.vote.update({
                where: {
                    id: isVoteExists?.id
                },
                data: {
                    isDeleted: false
                }
            })
        }
        else if ((isVoteExists.blogId === payload.blogId && isVoteExists.voterId === user.userId) || (isVoteExists.ideaId === payload.ideaId && isVoteExists.voterId === user.userId)) {
            result = await prisma.vote.update({
                where: {
                    id: isVoteExists.id
                },
                data: {
                    value: payload.value
                }
            })
        }

    }
    else {
        result = await prisma.vote.create({
            data: {
                ...payload,
                voterId: user.userId
            }
        })
    }
    return result
}
const removeVote = async (payload: Partial<IVote>, user: IAuthUser) => {

    let isVoteExists
    if (payload.ideaId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_ideaId: {
                    voterId: user.userId,
                    ideaId: payload.ideaId
                }
            }
        })
    } else if (payload.blogId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_blogId: {
                    voterId: user.userId,
                    blogId: payload.blogId
                }
            }
        })
    }
    if (!isVoteExists) {
        throw new Error("Vote is not found")
    }
    const result = await prisma.vote.update({
        where: {
            id: isVoteExists.id
        },
        data: {
            isDeleted: true
        }
    })
    return result
}
export const voteServices = {
    createVote,
    removeVote
}
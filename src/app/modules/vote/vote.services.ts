import { prisma } from "../../utils/prisma"

interface IVote {
    voterId: string,
    value: "up" | "down",
    ideaId: string | undefined,
    blogId: string | undefined,
    isDeleted?: boolean
}
const createVote = async (payload: IVote) => {
    let isVoteExists;
    if (payload.ideaId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_ideaId: {
                    voterId: payload.voterId,
                    ideaId: payload.ideaId
                }
            }
        })
    }
    if (payload.blogId) {
        isVoteExists = await prisma.vote.findUnique({
            where: {
                voterId_blogId: {
                    voterId: payload.voterId,
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
                    vote_id: isVoteExists?.vote_id
                },
                data: {
                    isDeleted: false
                }
            })
        }
        else if ((isVoteExists.blogId === payload.blogId && isVoteExists.voterId === payload.voterId) || (isVoteExists.ideaId === payload.ideaId && isVoteExists.voterId === payload.voterId)) {
            result = await prisma.vote.update({
                where: {
                    vote_id: isVoteExists.vote_id
                },
                data: {
                    value: payload.value
                }
            })
        }

    }
    else {
        result = await prisma.vote.create({
            data: payload
        })
    }


    return result
}
const removeVote = async (payload: Partial<IVote>) => {
    let result;
    if (payload.ideaId) {
        result = await prisma.vote.update({
            where: {
                voterId_ideaId: {
                    voterId: payload.voterId!,
                    ideaId: payload.ideaId
                }
            },
            data: {
                isDeleted: true
            }
        })
    } else if (payload.blogId) {
        result = await prisma.vote.update({
            where: {
                voterId_blogId: {
                    voterId: payload.voterId!,
                    blogId: payload.blogId
                }
            },
            data: {
                isDeleted: true
            }
        })
    }
    return result
}
export const voteServices = {
    createVote,
    removeVote
}
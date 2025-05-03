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
        isVoteExists = await prisma.vote.findFirst({
            where: {
                voterId: payload.voterId,
                ideaId: payload.ideaId,
            }
        })
    }
    if (payload.blogId) {
        isVoteExists = await prisma.vote.findFirst({
            where: {
                voterId: payload.voterId,
                blogId: payload.blogId,
            }
        })
    }
    let result;

    if (isVoteExists?.isDeleted === true) {
        result = await prisma.vote.update({
            where: {
                vote_id: isVoteExists?.vote_id
            },
            data: {
                isDeleted: false
            }
        })
    } else {
        result = await prisma.vote.create({
            data: payload
        })
    }


    return result
}

export const voteServices = {
    createVote
}
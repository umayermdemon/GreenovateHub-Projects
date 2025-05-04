<<<<<<< HEAD
import { Vote } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";

interface IVote {
  voterId: string;
  value: "up" | "down";
  ideaId: string | undefined;
  blogId: string | undefined;
  isDeleted?: boolean;
}
const createVote = async (payload: Vote) => {
  console.log(payload);
  let isVoteExists;
  if (payload.ideaId) {
    isVoteExists = await prisma.vote.findUnique({
      where: {
        voterId_ideaId: {
          voterId: payload.voterId,
          ideaId: payload.ideaId,
        },
      },
    });
  }
  console.log({ isVoteExists });
  if (payload.blogId) {
    isVoteExists = await prisma.vote.findUnique({
      where: {
        voterId_blogId: {
          voterId: payload.voterId,
          blogId: payload.blogId,
        },
      },
    });
  }
  //   let result;
=======
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
>>>>>>> 26c995b7d2424d17ce1ac81b13a6360ed007efdf

  //   if (isVoteExists) {
  //     if (isVoteExists.isDeleted === true) {
  //       result = await prisma.vote.update({
  //         where: {
  //           vote_id: isVoteExists?.vote_id,
  //         },
  //         data: {
  //           isDeleted: false,
  //         },
  //       });
  //     } else if (
  //       (isVoteExists.blogId === payload.blogId &&
  //         isVoteExists.voterId === payload.voterId) ||
  //       (isVoteExists.ideaId === payload.ideaId &&
  //         isVoteExists.voterId === payload.voterId)
  //     ) {
  //       result = await prisma.vote.update({
  //         where: {
  //           vote_id: isVoteExists.vote_id,
  //         },
  //         data: {
  //           value: payload.value,
  //         },
  //       });
  //     }
  //   } else {
  //     result = await prisma.vote.create({
  //       data: payload,
  //     });
  //   }

<<<<<<< HEAD
  //   return result;
  return null;
};
const removeVote = async (payload: Partial<IVote>) => {
  let result;
  if (payload.ideaId) {
    result = await prisma.vote.update({
      where: {
        voterId_ideaId: {
          voterId: payload.voterId!,
          ideaId: payload.ideaId,
        },
      },
      data: {
        isDeleted: true,
      },
    });
  } else if (payload.blogId) {
    result = await prisma.vote.update({
      where: {
        voterId_blogId: {
          voterId: payload.voterId!,
          blogId: payload.blogId,
        },
      },
      data: {
        isDeleted: true,
      },
    });
  }
  return result;
};
=======
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
            vote_id: isVoteExists.vote_id
        },
        data: {
            isDeleted: true
        }
    })
    return result
}
>>>>>>> 26c995b7d2424d17ce1ac81b13a6360ed007efdf
export const voteServices = {
  createVote,
  removeVote,
};

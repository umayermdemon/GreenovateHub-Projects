import { prisma } from "../../utils/prisma"
import { IAuthUser } from "../user/user.interface"


const createBlog = async (payload: any, user: IAuthUser) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    const result = await prisma.blog.create({
        data: {
            ...payload,
            authorId: userData.id
        }
    })
    return result
}


export const blogServices = {
    createBlog
}
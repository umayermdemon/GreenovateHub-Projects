import { Category } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";

const createCategoryIntoDb = async (payload: Category) => {
  const result = await prisma.category.create({
    data: {
      name: payload.name,
    },
  });
  return result;
};

export const categoryServices = {
  createCategoryIntoDb,
};

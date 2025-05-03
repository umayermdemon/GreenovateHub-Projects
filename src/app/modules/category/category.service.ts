import { Category } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";

const createCategoryIntoDb = async (payload: Category) => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      name: payload.name,
    },
  });
  if (isCategoryExist) {
    throw new Error("Category already exists");
  }
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

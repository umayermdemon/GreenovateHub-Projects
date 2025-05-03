import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";
import { ideaRouter } from "../modules/idea/idea.route";
import { categoryRouter } from "../modules/category/category.route";
import { blogRouter } from "../modules/blog/blog.route";
import { voteRouter } from "../modules/vote/vote.route";

const router = Router();

const moduleRoutes: any = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/ideas",
    route: ideaRouter,
  },
  {
    path: "/categories",
    route: categoryRouter,
  },
  {
    path:"/blog",
    route:blogRouter
  },
  {
    path:"/vote",
    route:voteRouter
  }
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;

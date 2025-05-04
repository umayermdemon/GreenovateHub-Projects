import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";
import { ideaRouter } from "../modules/idea/idea.route";
import { categoryRouter } from "../modules/category/category.route";
import { blogRouter } from "../modules/blog/blog.route";
import { voteRouter } from "../modules/vote/vote.route";
import { commentRouter } from "../modules/comment/comment.route";

const router = Router();

const moduleRoutes: any = [
  {
    path: "/users",
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
    path: "/blogs",
    route: blogRouter
  },
  {
    path: "/votes",
    route: voteRouter
  },
  {
    path: '/comments',
    route: commentRouter
  }
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;

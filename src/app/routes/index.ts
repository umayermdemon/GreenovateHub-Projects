import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes: any = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path:'/auth',
        route:AuthRouter
    }
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router
import { Router } from "express";
import { voteController } from "./vote.controller";



const router = Router();

router.post("/create-vote",voteController.createVote)

export const voteRouter = router;
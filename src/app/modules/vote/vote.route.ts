import { Router } from "express";
import { voteController } from "./vote.controller";



const router = Router();

router.post("/create-vote",voteController.createVote);
router.patch("/remove-vote",voteController.removeVote)

export const voteRouter = router;
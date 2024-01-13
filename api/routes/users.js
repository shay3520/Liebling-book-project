import express from "express";
import { getUser } from "../controllers/user.js";
//ROTUTES//

const router = express.Router();

router.get("/find/:userId" , getUser)


export default router;
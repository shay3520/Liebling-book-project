import express from "express";
import {login,register,logout  } from "../controllers/auth.js";
//ROTUTES//

const router = express.Router();

router.post("/login" , login)
router.post("/register" , register)
router.post("/logout" , logout)



export default router;
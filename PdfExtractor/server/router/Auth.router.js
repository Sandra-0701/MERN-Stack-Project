import express from "express";
import { register,login } from "../controller/Auth.controller.js";


const router = express.Router()

router.post('/Register',register);
router.post('/Login',login);

export default router;
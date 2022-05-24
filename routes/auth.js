import { Router } from "express";
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the appropriate functions
import {
    register,
    login,
    logout
} from '../controllers/auth.js';

//Routes that are mapped to the functions above
router.post("/register", register)
router.post('/login', login)
router.post('/logout', logout)

export default router;
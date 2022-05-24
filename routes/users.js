import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getUsers,
    createUser,
    updateUsers,
    deleteUser
} from "../controllers/users.js";

//Four routes that are mapped to the functions above
router.route("/").get(getUsers);
router.route("/").post(createUser);

router.route("/:id").put(updateUsers);
router.route("/id").delete(deleteUser);

export default router;
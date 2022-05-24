import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getClasses,
    createClass,
    updateClass,
    deleteClass
} from "../controllers/classes.js";

//Four routes that are mapped to the functions above
router.route("/").get(getClasses);
router.route("/").post(createClass);

router.route("/:id").put(updateClass);
router.route("/id").delete(deleteClass);

export default router;
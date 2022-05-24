import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getLecturers,
    createLecturer,
    updateLecturers,
    deleteLecturer
} from "../controllers/lecturers.js";

//Four routes that are mapped to the functions above
router.route("/").get(getLecturers);
router.route("/").post(updateLecturers);

router.route("/:id").put(updateLecturers);
router.route("/id").delete(deleteLecturer);

export default router;
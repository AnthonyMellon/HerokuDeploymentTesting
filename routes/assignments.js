import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from "../controllers/assignments.js";

//Four routes that are mapped to the functions above
router.route("/").get(getAssignments);
router.route("/").post(createAssignment);

router.route("/:id").put(updateAssignment);
router.route("/id").delete(deleteAssignment);

export default router;
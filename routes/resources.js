import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getResources,
    createResource,
    updateResource,
    deleteResource
} from "../controllers/resources.js";

//Four routes that are mapped to the functions above
router.route("/").get(getResources);
router.route("/").post(createResource);

router.route("/:id").put(updateResource);
router.route("/id").delete(deleteResource);

export default router;
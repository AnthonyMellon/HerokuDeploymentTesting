import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument
} from "../controllers/documents.js";

//Four routes that are mapped to the functions above
router.route("/").get(getDocuments);
router.route("/").post(createDocument);

router.route("/:id").put(updateDocument);
router.route("/id").delete(deleteDocument);

export default router;
import { Router } from 'express';
const router = Router(); //Create a new router object, this allows to handle various requests

//Import the four functions
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../controllers/todo.js";

//Four routes that are mapped to the functions above
router.route("/").get(getTodos);
router.route("/").post(createTodo);

router.route("/:id").put(updateTodo);
router.route("/id").delete(deleteTodo);

export default router;
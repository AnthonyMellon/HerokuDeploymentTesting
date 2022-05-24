import todo from '../models/todo.js';
import Todo from '../models/todo.js';

/**
 * This function is used to get the todos
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns todos data, or no content when status is 200. Error when status is 500
 */
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        if (todo.length != 0) return res.status(200).json({ sucess: true, data: todos });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all todos',
        });
    }   
};

/**
 * This function is used to create todos
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns todos data when status is 201. error when status is 500
 */
const createTodo = async (req, res) => {
    try {
        await Todo.create(req.body);
        const newTodos = await Todo.find({});
        return res.status(201).json({ success: true, data: newTodos });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating a todo',
        });
    }
}

/**
 * This function is used to update a todo
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no todo found. todos data when status is 200. error when status is 500
 */
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);

        if(!todo) {
            return res.status(404).json({
                success: false,
                msg: `No todo with the id ${id}`,
            });
        }

        const newTodos = await Todo.find({});
        return res.status(200).json({ success: true, data: newTodos });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a todo',
        });
    }
}

/**
 * This function is used to delete a todo
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when todo not found. todos data when status is 200. error when status is 500
 */
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndRemove(id);

        if(!todo) {
            return res.status(404).json({
                success: false,
                msg: `No todo with the id ${id}`,
            });
        }

        const newTodos = await Todo.find({});
        return res.status(200).json({ success: true, data: newTodos });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a todo'
        });
    }
}

export {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}
import dotenv from 'dotenv';

import Todo from '../models/todo.js';
import { todos } from '../data/todo.js';

import conn from './connection.js';
import todo from '../models/todo.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//ToDos
const createTodos = async () => {
    try {
        await todo.deleteMany(); //Delete all the documents in the todos collection
        await todo.insertMany(todos); //Insert documents into the todos collection

        console.log('Todos data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteTodos = async () => {
    try {
        await todo.deleteMany(); //Delete all documents in the todos collection

        console.log('Todos data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteTodos();
        break;
    }
    default: {
        createTodos();
    }
}
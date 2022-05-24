import dotenv from 'dotenv';

import Assignment from '../models/assignments.js';
import { assignments } from '../data/assignments.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Assignments
const createAssignments = async () => {
    try {
        await Assignment.deleteMany(); //Delete all the documents in the assignments collection
        await Assignment.insertMany(assignments); //Insert documents into the assignments collection

        console.log('Assignments data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteAssignments = async () => {
    try {
        await Assignment.deleteMany(); //Delete all documents in the assignments collection

        console.log('Assignment data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteAssignments();
        break;
    }
    default: {
        createAssignments();
    }
}
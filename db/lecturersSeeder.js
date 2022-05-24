import dotenv from 'dotenv';

import Lecturers from '../models/lecturer.js';
import { lecturers } from '../data/lecturers.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Lecturers
const createLecturers = async () => {
    try {
        await Lecturers.deleteMany(); //Delete all the documents in the lecturers collection
        await Lecturers.insertMany(lecturers); //Insert documents into the lecturers collection

        console.log('Lecturers data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteLecturers = async () => {
    try {
        await Lecturers.deleteMany(); //Delete all documents in the lecturers collection

        console.log('Lecturer data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteLecturers();
        break;
    }
    default: {
        createLecturers();
    }
}
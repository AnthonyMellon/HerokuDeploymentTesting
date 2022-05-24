import dotenv from 'dotenv';

import Class from '../models/class.js';
import { classes } from '../data/classes.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Classes
const createClasses = async () => {
    try {
        await Class.deleteMany(); //Delete all the documents in the classes collection
        await Class.insertMany(classes); //Insert documents into the classes collection

        console.log('Classes data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteClasses = async () => {
    try {
        await Class.deleteMany(); //Delete all documents in the classes collection

        console.log('Classes data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteClasses();
        break;
    }
    default: {
        createClasses();
    }
}
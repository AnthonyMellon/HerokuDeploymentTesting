import dotenv from 'dotenv';

import Resources from '../models/resources.js';
import { resources } from '../data/resources.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Resources
const createResources = async () => {
    try {
        await Resources.deleteMany(); //Delete all the documents in the resources collection
        await Resources.insertMany(resources); //Insert documents into the resources collection

        console.log('Resource data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteResources = async () => {
    try {
        await Resources.deleteMany(); //Delete all documents in the resources collection

        console.log('Resource data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteResources();
        break;
    }
    default: {
        createResources();
    }
}
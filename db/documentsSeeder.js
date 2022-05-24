import dotenv from 'dotenv';

import Document from '../models/documents.js';
import { documents } from '../data/documents.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Documents
const createDocuments = async () => {
    try {
        await Document.deleteMany(); //Delete all the documents in the documents collection
        await Document.insertMany(documents); //Insert documents into the documents collection

        console.log('Documents data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteDocuments = async () => {
    try {
        await Document.deleteMany(); //Delete all documents in the documents collection

        console.log('Document data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteDocuments();
        break;
    }
    default: {
        createDocuments();
    }
}